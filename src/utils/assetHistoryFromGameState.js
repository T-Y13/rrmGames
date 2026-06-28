import { BAL, LAST_DAILY_DAY, DAY8_MAX_TURNS, FINAL_GAME_DAY } from "../constants/gameBalance";
import { extractExplicitDayFromEntry } from "./sidebarLogDailyTiles";
import { findPlayerForLogEntry } from "./sidebarLogPlayerColors";

/** BoardViewport と揃えた折れ線色 */
export const PLAYER_CHART_COLORS = ["#ef4444", "#3b82f6", "#facc15", "#22c55e"];

const MONEY_EXTRACTORS = [
  (line) => line.match(/→\s*資金\s*(-?\d+)G/i)?.[1],
  (line) => line.match(/→資金(-?\d+)G/i)?.[1],
  (line) => line.match(/最終資金\s*(-?\d+)G/i)?.[1],
  (line) => line.match(/(?:^|\s)資金(-?\d+)G/i)?.[1],
  (line) => line.match(/→(-?\d+)G(?:\s|$|（|・)/)?.[1],
  (line) => line.match(/\d+G → (-?\d+)G/)?.[1],
];

function parseMoneyFromLine(line) {
  if (!line) return null;
  for (const extract of MONEY_EXTRACTORS) {
    const raw = extract(line);
    if (raw != null && Number.isFinite(Number(raw))) return Number(raw);
  }
  return null;
}

function parseDay8TurnFromLine(line, playerName) {
  if (!line || !playerName) return null;
  const esc = playerName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = line.match(new RegExp(`^${esc}\\s+T(\\d+):`));
  return m ? Number(m[1]) : null;
}

function isDay8ContextEntry(entry) {
  if (!entry || typeof entry !== "string") return false;
  if (extractExplicitDayFromEntry(entry) != null) return false;
  return /T\d+:|のスロットターン|の移動ターン|スロット開始|スロット終了|ゴール到着|代理スロット|👻|渋滞|タクシー|🎲|🚗|タイムアップ|8日目/.test(
    entry,
  );
}

function seriesKeyForPlayer(player, index) {
  return player?.name?.trim() || `Player ${index + 1}`;
}

function forwardFillRow(row, playerKeys, lastValues) {
  const out = { ...row };
  for (const key of playerKeys) {
    if (typeof out[key] === "number") {
      lastValues[key] = out[key];
    } else if (typeof lastValues[key] === "number") {
      out[key] = lastValues[key];
    }
  }
  return out;
}

/**
 * gameState.log から Recharts 用の資産推移データを生成。
 * @returns {{
 *   chartData: Array<Record<string, string|number>>,
 *   playerSeries: Array<{ key: string, id: string, color: string, gameIdx: number }>,
 *   day8TransitionKey: string,
 *   yDomain: [number, number],
 * }}
 */
export function buildAssetHistoryChartData(gameState) {
  const players = Array.isArray(gameState?.players) ? gameState.players : [];
  if (players.length === 0) {
    return { chartData: [], playerSeries: [], day8TransitionKey: "8T1", yDomain: [0, 1000] };
  }

  const playerKeys = players.map((p, i) => seriesKeyForPlayer(p, i));
  const playerSeries = players.map((p, i) => ({
    key: playerKeys[i],
    id: p.id,
    color: PLAYER_CHART_COLORS[i % PLAYER_CHART_COLORS.length],
    gameIdx: i,
  }));

  const startMoney = BAL.startingMoney ?? 600;
  const balances = Object.fromEntries(players.map((p) => [p.id, startMoney]));
  const dayEndSnapshots = Object.fromEntries(
    Array.from({ length: LAST_DAILY_DAY }, (_, i) => [i + 1, {}]),
  );
  /** @type {Record<string, Record<number, number>>} playerId -> turn -> money */
  const day8ByTurn = Object.fromEntries(players.map((p) => [p.id, {}]));

  let runningDay = 1;
  const entries = [...(gameState.log ?? [])].reverse();

  const snapshotDayEnd = (day) => {
    if (day < 1 || day > LAST_DAILY_DAY) return;
    for (const p of players) {
      dayEndSnapshots[day][p.id] = balances[p.id];
    }
  };

  for (const entry of entries) {
    const explicitDay = extractExplicitDayFromEntry(entry);
    if (explicitDay != null && explicitDay >= 2 && explicitDay <= LAST_DAILY_DAY) {
      snapshotDayEnd(explicitDay - 1);
      runningDay = explicitDay;
    } else if (explicitDay === LAST_DAILY_DAY + 1 || /8日目！全員|全員で交互に移動/.test(entry)) {
      snapshotDayEnd(LAST_DAILY_DAY);
      runningDay = FINAL_GAME_DAY;
    } else if (isDay8ContextEntry(entry) && runningDay >= LAST_DAILY_DAY) {
      runningDay = FINAL_GAME_DAY;
    }

    const matched = findPlayerForLogEntry(entry, players);
    const money = parseMoneyFromLine(entry);
    if (matched && money != null) {
      balances[matched.id] = money;
      if (runningDay >= FINAL_GAME_DAY) {
        const turn = parseDay8TurnFromLine(entry, matched.name);
        if (turn != null && turn >= 1 && turn <= DAY8_MAX_TURNS) {
          day8ByTurn[matched.id][turn] = money;
        }
      }
    }

    if (runningDay >= FINAL_GAME_DAY && matched && /スロット終了/.test(entry) && money != null) {
      const turns = Object.keys(day8ByTurn[matched.id] ?? {})
        .map(Number)
        .filter((n) => Number.isFinite(n));
      const nextTurn = turns.length > 0 ? Math.max(...turns) + 1 : 1;
      if (nextTurn <= DAY8_MAX_TURNS) {
        day8ByTurn[matched.id][nextTurn] = money;
      }
    }
  }

  snapshotDayEnd(runningDay >= FINAL_GAME_DAY ? LAST_DAILY_DAY : Math.min(runningDay, LAST_DAILY_DAY));

  for (const p of players) {
    if (typeof p.stats?.money === "number") {
      balances[p.id] = p.stats.money;
      const turns = day8ByTurn[p.id] ?? {};
      const maxTurn = Math.max(0, ...Object.keys(turns).map(Number));
      const finalTurn = Math.min(DAY8_MAX_TURNS, Math.max(maxTurn, Number(p.moveTurns) || 0, 1));
      day8ByTurn[p.id][finalTurn] = p.stats.money;
    }
  }

  /** @type {Array<Record<string, string|number>>} */
  const chartData = [];
  const lastValues = Object.fromEntries(playerKeys.map((k) => [k, startMoney]));

  const startRow = { time: "Start", order: 0 };
  for (let i = 0; i < players.length; i++) {
    startRow[playerKeys[i]] = startMoney;
    lastValues[playerKeys[i]] = startMoney;
  }
  chartData.push(startRow);

  for (let day = 1; day <= LAST_DAILY_DAY; day++) {
    const row = { time: `${day}D`, order: day };
    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      const val =
        typeof dayEndSnapshots[day][p.id] === "number"
          ? dayEndSnapshots[day][p.id]
          : balances[p.id];
      row[playerKeys[i]] = val;
    }
    chartData.push(forwardFillRow(row, playerKeys, lastValues));
  }

  for (let turn = 1; turn <= DAY8_MAX_TURNS; turn++) {
    const row = { time: `8T${turn}`, order: LAST_DAILY_DAY + turn };
    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      const turnMap = day8ByTurn[p.id] ?? {};
      let val = turnMap[turn];
      if (typeof val !== "number") {
        const priorTurns = Object.keys(turnMap)
          .map(Number)
          .filter((t) => t <= turn)
          .sort((a, b) => b - a);
        val = priorTurns.length > 0 ? turnMap[priorTurns[0]] : undefined;
      }
      if (typeof val !== "number" && typeof dayEndSnapshots[LAST_DAILY_DAY][p.id] === "number") {
        val = dayEndSnapshots[LAST_DAILY_DAY][p.id];
      }
      if (typeof val === "number") row[playerKeys[i]] = val;
    }
    chartData.push(forwardFillRow(row, playerKeys, lastValues));
  }

  const allValues = chartData.flatMap((row) =>
    playerKeys.map((k) => row[k]).filter((v) => typeof v === "number"),
  );
  const minVal = allValues.length ? Math.min(...allValues) : -1000;
  const maxVal = allValues.length ? Math.max(...allValues) : 10000;
  const pad = Math.max(500, Math.round((maxVal - minVal) * 0.08));
  const yDomain = [Math.floor(minVal - pad), Math.ceil(maxVal + pad)];

  return {
    chartData,
    playerSeries,
    day8TransitionKey: "8T1",
    yDomain,
  };
}
