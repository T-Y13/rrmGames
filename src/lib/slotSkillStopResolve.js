import { BAL, SLOT_COST, SLOT_MACHINES } from "../constants/gameBalance";
import { getSlotTierReelSymbols, SLOT_TIER_LABELS, stripTripleForMiddleColumn } from "../utils/gameLogic";
import { isSkillStopMatchSymbol } from "./slotReelStop";

function normalizeScrollFrac(scrollRows) {
  let f = scrollRows - Math.floor(scrollRows);
  if (f < 0) f += 1;
  if (f > 0.5) f -= 1;
  return f;
}

/**
 * 目押し第3リール用の循環ストリップ（奇数 index = match / 偶数 = miss）。
 * drawColumn と getPaylineSymbolFromScrollStrip で同じ index 式を使う。
 */
export function buildSkillStopScrollStrip({ matchSymbol, missSymbol, length = 32 }) {
  const strip = [];
  for (let i = 0; i < length; i += 1) {
    strip.push(i % 2 === 1 ? matchSymbol : missSymbol);
  }
  return strip;
}

/** drawColumn と同じ式：ペイライン（中央段）に来る絵柄 */
export function getPaylineSymbolFromScrollStrip(scrollRows, strip) {
  if (!strip?.length || !Number.isFinite(scrollRows)) return null;
  const len = strip.length;
  const ri = Math.floor(scrollRows + 1);
  return strip[((ri % len) + len) % len];
}

/** drawColumn の symAt(rowIdx) と同じ index（スピン中の実ストリップ列） */
export function getStripSymbolAtRowIndex(rowIdx, strip) {
  if (!strip?.length) return null;
  const len = strip.length;
  return strip[((Math.floor(rowIdx) % len) + len) % len];
}

/**
 * 第3リール回転中の scrollRows から、ペイライン付近か（目押し成功窓）を判定。
 * @deprecated 実ストリップ判定には isSkillStopScrollWin を使用
 */
export function isScrollInSkillWinWindow(scrollRows, windowHalf = BAL.slot.skillStopWinWindowHalf ?? 0.14) {
  if (!Number.isFinite(scrollRows)) return false;
  const frac = scrollRows - Math.floor(scrollRows);
  const dist = Math.min(frac, 1 - frac);
  return dist <= windowHalf;
}

/**
 * 実ストリップ上でペイラインが matchSymbol か（±windowHalf で行境界付近を許容）。
 */
export function isSkillStopScrollWin(
  scrollRows,
  strip,
  matchSymbol,
  windowHalf = BAL.slot.skillStopWinWindowHalf ?? 0.14,
) {
  if (!strip?.length || !Number.isFinite(scrollRows)) return false;
  if (getPaylineSymbolFromScrollStrip(scrollRows, strip) === matchSymbol) return true;
  if (windowHalf <= 0) return false;
  const rowFrac = normalizeScrollFrac(scrollRows + 1);
  const dist = Math.min(rowFrac, 1 - rowFrac);
  if (dist > windowHalf) return false;
  const roundedRi = Math.round(scrollRows + 1);
  const len = strip.length;
  return strip[((roundedRi % len) + len) % len] === matchSymbol;
}

/**
 * ガセリーチ目押し：第3リール停止位置で小当たりに昇格するか。
 * @returns {{ won: boolean, matchSymbol: string, reel3Middle: string, reel3Strip: string[], scrollStrip: string[] }}
 */
export function resolveGaseReachSkillStopOutcome({
  scrollRows,
  visualReels,
  reelMachine,
  scrollStrip,
  windowHalf,
}) {
  const matchSymbol = visualReels?.[0] ?? "?";
  const missSymbol = visualReels?.[2] ?? matchSymbol;
  const strip =
    scrollStrip?.length > 0
      ? scrollStrip
      : Array.isArray(reelMachine?.symbols) && reelMachine.symbols.length
        ? reelMachine.symbols
        : null;
  if (!strip?.length) {
    const reel3Strip = stripTripleForMiddleColumn(missSymbol, reelMachine, 2);
    return { won: false, matchSymbol, reel3Middle: missSymbol, reel3Strip, scrollStrip: strip ?? [] };
  }
  const won = isSkillStopScrollWin(scrollRows, strip, matchSymbol, windowHalf);
  const reel3Middle = won ? matchSymbol : missSymbol;
  const reel3Strip = stripTripleForMiddleColumn(reel3Middle, reelMachine, 2);
  return { won, matchSymbol, reel3Middle, reel3Strip, scrollStrip: strip };
}

/** 目押し成功時の tier（🍒=小 / ⭐=中 / 🔔=当たり） */
export function resolveSkillStopWinTier(matchSymbol, machineKey = "standard") {
  const machine = SLOT_MACHINES[machineKey] ?? SLOT_MACHINES.standard;
  const tierSy = getSlotTierReelSymbols(machine);
  if (matchSymbol === tierSy.small) return "small";
  if (matchSymbol === tierSy.mid) return "mid";
  if (matchSymbol === tierSy.atari) return "atari";
  return null;
}

/** 目押し成功時：miss 確定スピンを matchSymbol に応じた tier へ上書き */
export function applySkillStopWinToSpinResult(res, { matchSymbol, bet, machineKey = "standard" }) {
  const machine = SLOT_MACHINES[machineKey] ?? SLOT_MACHINES.standard;
  const tier = resolveSkillStopWinTier(matchSymbol, machineKey);
  if (!tier) return res;
  const scale = (bet ?? SLOT_COST) / SLOT_COST;
  const pay = (base) => Math.round(base * scale);
  const sym = matchSymbol;
  const label = SLOT_TIER_LABELS[tier] ?? tier;
  return {
    ...res,
    tier,
    payout: pay(machine.basePayout[tier]),
    message: `${sym} 目押し成功！${label}`,
    reels: [sym, sym, sym],
  };
}

/**
 * 目押しスピン全体の解決（純関数）。
 * scrollRows が null / 非有限のときは失敗扱い。
 */
export function resolveSkillStopSpin({
  scrollRows,
  visualReels,
  baseRes,
  reelMachine,
  bet,
  machineKey,
  scrollStrip,
  windowHalf,
}) {
  const safeScroll = Number.isFinite(scrollRows) ? scrollRows : null;
  const outcome = resolveGaseReachSkillStopOutcome({
    scrollRows: safeScroll ?? -999,
    visualReels,
    reelMachine,
    scrollStrip,
    windowHalf,
  });
  const matchSymbol = visualReels?.[0];
  if (
    !Number.isFinite(safeScroll) ||
    !outcome.won ||
    !isSkillStopMatchSymbol(matchSymbol)
  ) {
    return {
      won: false,
      res: baseRes,
      visualReels: [...visualReels],
      reel3Strip: outcome.reel3Strip,
      scrollStrip: outcome.scrollStrip,
    };
  }
  const res = applySkillStopWinToSpinResult(baseRes, {
    matchSymbol: outcome.matchSymbol,
    bet,
    machineKey,
  });
  const nextVisual = [outcome.matchSymbol, outcome.matchSymbol, outcome.matchSymbol];
  return {
    won: true,
    res,
    visualReels: nextVisual,
    reel3Strip: outcome.reel3Strip,
    scrollStrip: outcome.scrollStrip,
  };
}
