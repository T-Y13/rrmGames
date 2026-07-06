/** マルチ8日目：共有プログレッシブポット（ターン加算＋ベット30%の両方で積み上げ） */

import { BAL, PROGRESSIVE_POT_RATE } from "../constants/gameBalance";

/** 8日目突入・POT当選後リセットの初期プール（ランダム） */
export const POT_INIT_MIN = 15000;
export const POT_INIT_MAX = 20000;
/** 1〜12R のターン加算のみの合計（掛け金なし）。12R目以降は加算なし */
export const POT_TURN_STACK_TOTAL = 15000;
export const POT_GROWTH_TURNS = 12;

/** @deprecated 互換用（旧 POT_BASE） */
export const POT_BASE = POT_INIT_MIN;
/** @deprecated 互換用（旧 POT_MAX 相当は初期＋ターン加算の目安） */
export const POT_MAX = POT_INIT_MAX + POT_TURN_STACK_TOTAL;

export function rollInitialProgressivePot(randomFn = Math.random) {
  const span = POT_INIT_MAX - POT_INIT_MIN + 1;
  const roll = Math.floor(randomFn() * span);
  return POT_INIT_MIN + Math.min(span - 1, Math.max(0, roll));
}

/** ターン加算のみの累計（ベット上乗せなし）。0R=0 / 12R=15000 */
export function potFromTurnGrowthOnly(completedRounds) {
  const n = Math.max(0, Math.min(Math.floor(Number(completedRounds) || 0), POT_GROWTH_TURNS));
  if (n <= 0) return 0;
  if (n >= POT_GROWTH_TURNS) return POT_TURN_STACK_TOTAL;
  return Math.round((n / POT_GROWTH_TURNS) * POT_TURN_STACK_TOTAL);
}

/** @deprecated 互換用エイリアス */
export function potTargetForCompletedRounds(completedRounds) {
  return potFromTurnGrowthOnly(completedRounds);
}

/** 8日目：remainingTurns から完了ラウンド数 */
export function day8CompletedRounds(remainingTurns) {
  const maxTurns = BAL.dice.maxTurns;
  const rem =
    Number.isFinite(Number(remainingTurns)) && Number(remainingTurns) >= 0
      ? Math.floor(Number(remainingTurns))
      : maxTurns;
  return Math.max(0, maxTurns - rem);
}

/** ラウンド完了時に加算するターン分（13R目以降は0） */
export function potTurnIncrementForCompletedRound(completedRoundsAfterAdvance) {
  const n = Math.floor(Number(completedRoundsAfterAdvance) || 0);
  if (n <= 0 || n > POT_GROWTH_TURNS) return 0;
  return potFromTurnGrowthOnly(n) - potFromTurnGrowthOnly(n - 1);
}

/** 8日目ラウンド1回完了ごとのターン加算額（参考・1R目） */
export function potTurnIncrementPerRound() {
  return potTurnIncrementForCompletedRound(1);
}

/** POT当選後のプール再設定（15,000〜20,000G） */
export function rollPotJackpotResetPool(randomFn = Math.random) {
  return rollInitialProgressivePot(randomFn);
}

/**
 * スピン結果に伴う POT 変動（ベットの30%を現在プールに加算）
 */
export function computeProgressivePotDelta(
  currentPot,
  betAmount,
  triggersPotPayout,
  randomFn = Math.random,
) {
  const bet = Math.max(0, Math.floor(Number(betAmount) || 0));
  const contribution = Math.round(bet * PROGRESSIVE_POT_RATE);
  const pot = Math.max(0, Math.floor(Number(currentPot) || 0));
  const potAfterContrib = pot + contribution;
  if (triggersPotPayout) {
    return {
      totalPot: rollPotJackpotResetPool(randomFn),
      potPayout: potAfterContrib,
      contribution,
    };
  }
  return { totalPot: potAfterContrib, potPayout: 0, contribution };
}

/**
 * 8日目ラウンド進行に伴う totalPot 更新（ターン完了分を加算）
 */
export function resolveTotalPotAfterRoomTracking({
  prevRemaining,
  nextRemaining,
  prevGs,
  nextGs,
  prevTotalPot,
  randomFn = Math.random,
}) {
  const prevPot = Math.max(0, Math.floor(Number(prevTotalPot) || 0));
  const entersDay8 =
    nextGs?.gamePhase === "playing" &&
    nextGs?.subPhase === "day8" &&
    !(prevGs?.gamePhase === "playing" && prevGs?.subPhase === "day8");
  if (entersDay8) return rollInitialProgressivePot(randomFn);

  if (nextGs?.subPhase === "day8" && nextRemaining < prevRemaining) {
    const completedRounds = day8CompletedRounds(nextRemaining);
    const turnAdd = potTurnIncrementForCompletedRound(completedRounds);
    return prevPot + turnAdd;
  }
  return prevPot;
}

export function readRoomTotalPot(roomData) {
  const v = roomData?.totalPot;
  if (Number.isFinite(Number(v)) && Number(v) >= 0) return Math.floor(Number(v));
  return POT_INIT_MIN;
}
