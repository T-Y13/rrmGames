import {
  BAL,
  LAST_DAILY_DAY,
  DAY8_MAX_TURNS,
} from "../constants/gameBalance";

export const ASSET_HISTORY_VERSION = 1;

const clampMoney = (v) => Math.round(Math.max(-999999999, Math.min(999999999, v)));

/**
 * @typedef {{ seq: number, turn: number, kind: 'move'|'slot'|'final', money: Record<string, number> }} Day8TimelineEntry
 * @typedef {{ v: 1, daily: Record<string, Record<string, number>>, day8: Record<string, Record<string, number>>, day8Timeline?: Day8TimelineEntry[] }} PlayerAssetHistory
 */

export function createEmptyAssetHistory(playerIds = []) {
  /** @type {PlayerAssetHistory} */
  const hist = { v: ASSET_HISTORY_VERSION, daily: {}, day8: {}, day8Timeline: [] };
  for (const id of playerIds) {
    if (typeof id === "string" && id) {
      hist.daily[id] = {};
      hist.day8[id] = {};
    }
  }
  return hist;
}

function normalizeDay8Timeline(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((e) => e && typeof e.seq === "number" && e.seq >= 1 && e.money && typeof e.money === "object")
    .map((e) => ({
      seq: Math.floor(e.seq),
      turn: Math.floor(Number(e.turn) || 0),
      kind: e.kind === "slot" || e.kind === "final" ? e.kind : "move",
      money: { ...e.money },
    }))
    .sort((a, b) => a.seq - b.seq);
}

export function mergeDay8Timelines(live = [], next = []) {
  const bySeq = new Map();
  for (const e of normalizeDay8Timeline(live)) bySeq.set(e.seq, e);
  for (const e of normalizeDay8Timeline(next)) bySeq.set(e.seq, e);
  return [...bySeq.values()].sort((a, b) => a.seq - b.seq);
}

export function normalizeAssetHistory(gs) {
  const ids = (gs?.players ?? []).map((p) => p.id).filter(Boolean);
  const raw = gs?.assetHistory;
  if (!raw || raw.v !== ASSET_HISTORY_VERSION) {
    return createEmptyAssetHistory(ids);
  }
  const daily = { ...(raw.daily ?? {}) };
  const day8 = { ...(raw.day8 ?? {}) };
  for (const id of ids) {
    if (!daily[id]) daily[id] = {};
    if (!day8[id]) day8[id] = {};
  }
  return {
    v: ASSET_HISTORY_VERSION,
    daily,
    day8,
    day8Timeline: normalizeDay8Timeline(raw.day8Timeline),
  };
}

export function mergeAssetHistoryBuckets(liveGs, nextGs) {
  const ids = [
    ...new Set(
      [...(liveGs?.players ?? []), ...(nextGs?.players ?? [])]
        .map((p) => p?.id)
        .filter(Boolean),
    ),
  ];
  const live = normalizeAssetHistory(liveGs ?? { players: liveGs?.players ?? [] });
  const next = normalizeAssetHistory(nextGs ?? { players: nextGs?.players ?? [] });
  /** @type {PlayerAssetHistory} */
  const merged = {
    v: ASSET_HISTORY_VERSION,
    daily: {},
    day8: {},
    day8Timeline: mergeDay8Timelines(live.day8Timeline, next.day8Timeline),
  };
  for (const id of ids) {
    merged.daily[id] = { ...(live.daily[id] ?? {}), ...(next.daily[id] ?? {}) };
    merged.day8[id] = { ...(live.day8[id] ?? {}), ...(next.day8[id] ?? {}) };
  }
  return merged;
}

export function recordDailyMoney(gs, playerId, day, money) {
  if (!gs || !playerId || day < 1 || day > LAST_DAILY_DAY) return gs;
  if (typeof money !== "number" || !Number.isFinite(money)) return gs;
  const hist = normalizeAssetHistory(gs);
  const m = clampMoney(money);
  return {
    ...gs,
    assetHistory: {
      ...hist,
      daily: {
        ...hist.daily,
        [playerId]: { ...hist.daily[playerId], [String(day)]: m },
      },
    },
  };
}

export function snapshotDailyEndAllPlayers(gs, day, players) {
  if (!gs || day < 1 || day > LAST_DAILY_DAY) return gs;
  let next = gs;
  for (const p of players ?? []) {
    if (p?.id && typeof p.stats?.money === "number") {
      next = recordDailyMoney(next, p.id, day, p.stats.money);
    }
  }
  return next;
}

export function recordDay8TurnMoney(gs, playerId, turn, money) {
  if (!gs || !playerId || turn < 1 || turn > DAY8_MAX_TURNS) return gs;
  if (typeof money !== "number" || !Number.isFinite(money)) return gs;
  const hist = normalizeAssetHistory(gs);
  const m = clampMoney(money);
  return {
    ...gs,
    assetHistory: {
      ...hist,
      day8: {
        ...hist.day8,
        [playerId]: { ...hist.day8[playerId], [String(turn)]: m },
      },
    },
  };
}

/** 8日目：手番終了時に outgoing プレイヤーの Tn 終了資金を記録 */
export function recordDay8TurnEndForPlayer(gs, playerIdx, players) {
  const p = players?.[playerIdx];
  if (!p?.id || typeof p.stats?.money !== "number") return gs;
  const turn = Math.floor(Number(p.moveTurns) || 0);
  if (turn < 1) return gs;
  return recordDay8TurnMoney(gs, p.id, Math.min(turn, DAY8_MAX_TURNS), p.stats.money);
}

function recordDay8TurnMoneyForAll(gs, turn, players) {
  if (!gs || turn < 1 || turn > DAY8_MAX_TURNS) return gs;
  let next = gs;
  for (const p of players ?? []) {
    if (p?.id && typeof p.stats?.money === "number") {
      next = recordDay8TurnMoney(next, p.id, turn, p.stats.money);
    }
  }
  return next;
}

/** 8日目グラフ用：移動・スロットごとに全員の資金スナップショットを時系列へ追加 */
export function appendDay8TimelineSnapshot(gs, players, kind) {
  if (!gs) return gs;
  const hist = normalizeAssetHistory(gs);
  const timeline = [...(hist.day8Timeline ?? [])];
  const turn = resolveDay8HistoryTurn(players) ?? 0;
  /** @type {Record<string, number>} */
  const money = {};
  for (const p of players ?? []) {
    if (p?.id && typeof p.stats?.money === "number") {
      money[p.id] = clampMoney(p.stats.money);
    }
  }
  if (Object.keys(money).length === 0) return gs;

  const last = timeline[timeline.length - 1];
  const sameAsLast =
    last &&
    last.kind === kind &&
    last.turn === turn &&
    Object.keys(money).every((id) => last.money[id] === money[id]);
  if (sameAsLast) return gs;

  const seq = timeline.length > 0 ? Math.max(...timeline.map((e) => e.seq)) + 1 : 1;
  return {
    ...gs,
    assetHistory: {
      ...hist,
      day8Timeline: [...timeline, { seq, turn, kind, money }],
    },
  };
}

/** 8日目：手番終了時に全員の Tn 資金を記録（代理スロット等で他プレイヤーの資金が変わる場合に対応） */
export function snapshotDay8TurnEndAllPlayers(gs, turn, players, kind = "move") {
  if (!gs || turn < 1 || turn > DAY8_MAX_TURNS) return gs;
  let next = recordDay8TurnMoneyForAll(gs, turn, players);
  const timelineKind = kind === "slot" || kind === "final" ? kind : "move";
  return appendDay8TimelineSnapshot(next, players, timelineKind);
}

/** 8日目グラフ用：全員の moveTurns から現在ラウンド T を推定（スロット専用手番でも正しい T に載せる） */
export function resolveDay8HistoryTurn(players) {
  const turns = (players ?? [])
    .map((p) => Math.floor(Number(p?.moveTurns) || 0))
    .filter((n) => n >= 1);
  if (turns.length === 0) return null;
  return Math.min(DAY8_MAX_TURNS, Math.max(...turns));
}

/** 結果確定時：全員の最終 T を現在資金で埋める */
export function finalizeDay8AssetHistory(gs, players) {
  let next = gs;
  for (const p of players ?? []) {
    if (!p?.id || typeof p.stats?.money !== "number") continue;
    let turn = Math.floor(Number(p.moveTurns) || 0);
    if (turn <= 0) {
      const logged = Object.keys(normalizeAssetHistory(gs).day8[p.id] ?? {})
        .map(Number)
        .filter((n) => n >= 1);
      turn = logged.length > 0 ? Math.max(...logged) : DAY8_MAX_TURNS;
    }
    turn = Math.min(DAY8_MAX_TURNS, Math.max(1, turn));
    next = recordDay8TurnMoney(next, p.id, turn, p.stats.money);
  }
  return appendDay8TimelineSnapshot(next, players, "final");
}

export function assetHistoryHasChartData(gs) {
  const hist = normalizeAssetHistory(gs);
  for (const bucket of [hist.daily, hist.day8]) {
    for (const id of Object.keys(bucket)) {
      if (Object.keys(bucket[id] ?? {}).length > 0) return true;
    }
  }
  return false;
}

export function readDailyMoney(hist, playerId, day) {
  const v = hist?.daily?.[playerId]?.[String(day)];
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

export function readDay8TurnMoney(hist, playerId, turn) {
  const v = hist?.day8?.[playerId]?.[String(turn)];
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}
