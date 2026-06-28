/** Firestore gs.log 用：構造化ログのシリアライズ接頭辞 */
export const LOG_PREFIX = "⌁";

/** @typedef {"action"|"status"|"system"|"header"|"divider"} LogSection */
/** @typedef {"money"|"pon"|"living"|"stat"|"amulet"|"virtue"|"system"} LogLineCat */

/**
 * @typedef {object} StructuredLogLine
 * @property {LogLineCat} [cat]
 * @property {string} [icon]
 * @property {string} text
 */

/**
 * @typedef {object} DailyActionBlock
 * @property {1} v
 * @property {"dailyBlock"} t
 * @property {number} day
 * @property {string} playerId
 * @property {string} playerName
 * @property {"work"|"stream"|"shrine"|"slot"} actionType
 * @property {string} actionLabel
 * @property {string} [actionIcon]
 * @property {"success"|"failure"|null} [outcome]
 * @property {StructuredLogLine[]} [pre]
 * @property {StructuredLogLine[]} actionLines
 * @property {StructuredLogLine[]} statusLines
 * @property {StructuredLogLine[]} [extras]
 */

/**
 * @typedef {object} DayHeaderEntry
 * @property {1} v
 * @property {"dayHeader"} t
 * @property {number} day
 */

/**
 * @typedef {object} DayDividerEntry
 * @property {1} v
 * @property {"dayDivider"} t
 * @property {number} [day]
 */

/**
 * @typedef {object} TurnHandoffEntry
 * @property {1} v
 * @property {"turnHandoff"} t
 * @property {string} playerName
 * @property {number} day
 */

export const LOG_ICONS = {
  money: "💰",
  pon: "📈",
  living: "🏠",
  work: "💼",
  stream: "📺",
  slot: "🎰",
  shrine: "⛩",
  amulet: "🧿",
  success: "✅",
  failure: "💥",
  calendar: "📅",
};

/** ログ表示用：変更前 → 変更後のみ（差分括弧なし） */
export function formatStatBrief(before, after, opts = {}) {
  const { unit = "", label = "値" } = opts;
  return `${label}: ${before}${unit} → ${after}${unit}`;
}

/** @param {number} before @param {number} after @param {{ unit?: string, label?: string, delta?: boolean }} [opts] */
export function formatStatChange(before, after, opts = {}) {
  const { unit = "", label = "値", delta = false } = opts;
  const base = formatStatBrief(before, after, { unit, label });
  if (!delta) return base;
  const diff = after - before;
  const sign = diff >= 0 ? "+" : "";
  const deltaStr = diff !== 0 ? ` (${sign}${diff}${unit})` : "";
  return `${base}${deltaStr}`;
}

export function serializeLogEntry(entry) {
  if (entry == null) return "";
  if (typeof entry === "string") return entry;
  return `${LOG_PREFIX}${JSON.stringify(entry)}`;
}

/** @returns {object|string|null} */
export function parseLogEntry(entry) {
  if (entry == null) return null;
  if (typeof entry !== "string") return entry;
  if (!entry.startsWith(LOG_PREFIX)) {
    return { v: 0, t: "legacy", text: entry };
  }
  try {
    return JSON.parse(entry.slice(LOG_PREFIX.length));
  } catch {
    return { v: 0, t: "legacy", text: entry };
  }
}

export function isStructuredLogEntry(entry) {
  const p = parseLogEntry(entry);
  return p != null && typeof p === "object" && p.v === 1 && p.t !== "legacy";
}

/** @param {number} day */
export function buildDayHeaderEntry(day) {
  return /** @type {DayHeaderEntry} */ ({ v: 1, t: "dayHeader", day });
}

/** @param {number} [day] */
export function buildDayDividerEntry(day) {
  return /** @type {DayDividerEntry} */ ({ v: 1, t: "dayDivider", day });
}

/** @param {string} playerName @param {number} day */
export function buildTurnHandoffEntry(playerName, day) {
  return /** @type {TurnHandoffEntry} */ ({ v: 1, t: "turnHandoff", playerName, day });
}
