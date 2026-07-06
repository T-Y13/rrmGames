import { BAL, LAST_DAILY_DAY, DAY8_MAX_TURNS } from "../constants/gameBalance";
import { normalizeAssetHistory, readDailyMoney, readDay8TurnMoney } from "../lib/playerAssetHistory";

/** BoardViewport と揃えた折れ線色 */
export const PLAYER_CHART_COLORS = ["#ef4444", "#3b82f6", "#facc15", "#22c55e"];

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

function emptyDayEndSnapshots() {
  return Object.fromEntries(Array.from({ length: LAST_DAILY_DAY }, (_, i) => [i + 1, {}]));
}

function emptyDay8ByTurn(playerIds) {
  return Object.fromEntries(playerIds.map((id) => [id, {}]));
}

function applyFinalPlayerMoneyToDay8(players, day8ByTurn) {
  const out = { ...day8ByTurn };
  for (const p of players) {
    if (typeof p.stats?.money !== "number") continue;
    const turnMap = { ...(out[p.id] ?? {}) };
    const loggedTurns = Object.keys(turnMap)
      .map(Number)
      .filter((n) => Number.isFinite(n) && n >= 1);
    let finalTurn = Number(p.moveTurns) || 0;
    if (finalTurn <= 0 && loggedTurns.length > 0) {
      finalTurn = Math.max(...loggedTurns);
    }
    if (finalTurn <= 0) finalTurn = DAY8_MAX_TURNS;
    finalTurn = Math.min(DAY8_MAX_TURNS, Math.max(1, finalTurn));
    turnMap[finalTurn] = p.stats.money;
    out[p.id] = turnMap;
  }
  return out;
}

/** gameState.assetHistory のみから日次・8日目スナップショットを読む */
function collectAssetSnapshotsFromStored(gameState) {
  const players = Array.isArray(gameState?.players) ? gameState.players : [];
  const hist = normalizeAssetHistory(gameState);
  const dayEndSnapshots = emptyDayEndSnapshots();

  for (let day = 1; day <= LAST_DAILY_DAY; day++) {
    for (const p of players) {
      const money = readDailyMoney(hist, p.id, day);
      if (money != null) dayEndSnapshots[day][p.id] = money;
    }
  }

  const day8ByTurn = emptyDay8ByTurn(players.map((p) => p.id));
  for (let turn = 1; turn <= DAY8_MAX_TURNS; turn++) {
    for (const p of players) {
      const money = readDay8TurnMoney(hist, p.id, turn);
      if (money != null) day8ByTurn[p.id][turn] = money;
    }
  }

  return {
    dayEndSnapshots,
    day8ByTurn,
    day8Timeline: hist.day8Timeline ?? [],
  };
}

function buildDay8TimelineRows(timeline, players, playerKeys, day7End, lastValues) {
  /** @type {Array<Record<string, string|number>>} */
  const rows = [];
  for (const entry of timeline) {
    const row = { time: `8-${entry.seq}`, order: LAST_DAILY_DAY + entry.seq };
    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      const val = entry.money?.[p.id];
      if (typeof val === "number") row[playerKeys[i]] = val;
      else if (typeof day7End[p.id] === "number") row[playerKeys[i]] = day7End[p.id];
    }
    rows.push(forwardFillRow(row, playerKeys, lastValues));
  }
  return rows;
}

function buildDay8TurnRows(players, playerKeys, day7End, day8ByTurn, lastValues) {
  /** @type {Array<Record<string, string|number>>} */
  const rows = [];
  for (let turn = 1; turn <= DAY8_MAX_TURNS; turn++) {
    const row = { time: `8/${turn}`, order: LAST_DAILY_DAY + turn };
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
      if (typeof val !== "number" && typeof day7End[p.id] === "number") {
        val = day7End[p.id];
      }
      if (typeof val === "number") row[playerKeys[i]] = val;
    }
    rows.push(forwardFillRow(row, playerKeys, lastValues));
  }
  return rows;
}

function buildChartFromSnapshots(gameState, dayEndSnapshots, day8ByTurn, day8Timeline = []) {
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
    const row = { time: `${day}日`, order: day };
    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      const val = dayEndSnapshots[day]?.[p.id];
      if (typeof val === "number") row[playerKeys[i]] = val;
    }
    chartData.push(forwardFillRow(row, playerKeys, lastValues));
  }

  const day7End = dayEndSnapshots[LAST_DAILY_DAY] ?? {};
  const timeline = Array.isArray(day8Timeline) ? day8Timeline : [];
  const day8Rows =
    timeline.length > 0
      ? buildDay8TimelineRows(timeline, players, playerKeys, day7End, lastValues)
      : buildDay8TurnRows(players, playerKeys, day7End, day8ByTurn, lastValues);
  chartData.push(...day8Rows);

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
    day8TransitionKey: timeline.length > 0 ? "8-1" : "8/1",
    yDomain,
  };
}

/**
 * gameState から Recharts 用の資産推移データを生成。
 * gameState.assetHistory のみを参照（log は使わない）。
 */
export function buildAssetHistoryChartData(gameState) {
  const players = Array.isArray(gameState?.players) ? gameState.players : [];
  if (players.length === 0) {
    return { chartData: [], playerSeries: [], day8TransitionKey: "8T1", yDomain: [0, 1000] };
  }

  const fromStored = collectAssetSnapshotsFromStored(gameState);
  const day8ByTurn = applyFinalPlayerMoneyToDay8(players, fromStored.day8ByTurn);

  return buildChartFromSnapshots(
    gameState,
    fromStored.dayEndSnapshots,
    day8ByTurn,
    fromStored.day8Timeline,
  );
}
