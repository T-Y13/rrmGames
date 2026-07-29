import { BAL } from "../../constants/gameBalance";
import { MOVE_PHASE } from "../../constants/gamePhases";
import { clamp } from "./core.js";

export function virtueMinRoll(virtue) {
  if (virtue >= 100) return 4;
  if (virtue >= 70) return 3;
  if (virtue >= 50) return 2;
  return 1;
}

/** 善行に応じたスロット天井（当たり/ハズレ問わず同一回数到達で次スピン強制救済） */
export function slotPityMaxThreshold(virtue) {
  const v = Number(virtue) || 0;
  return Math.max(10, 15 - Math.floor(v / 20));
}

/** 仕事・配信の資金へ掛ける倍率: 1 + virtue×0.2/100（スロット配当には非適用） */
export function virtueIncomeMult(virtue) {
  return 1 + ((Number(virtue) || 0) * 0.2) / 100;
}

export function applyVirtueIncomeBoost(baseReward, virtue) {
  return Math.round(Number(baseReward) * virtueIncomeMult(virtue));
}

/** 神社お守り抽選: baseRate × (1 + virtue/100)、上限1 */
export function shrineAmuletDropChance(virtue, baseRate) {
  const b = Number(baseRate);
  if (!(b > 0)) return 0;
  return Math.min(1, b * (1 + (Number(virtue) || 0) / 100));
}

export function applyVirtueWave(actingPlayer, virtueBefore, virtueAfter, players, logs) {
  const thresh = BAL.dice.virtueWaveThresh;
  if (virtueBefore < thresh && virtueAfter >= thresh) {
    const delta = BAL.dice.virtueWavePonDelta;
    const updatedPlayers = players.map((pl) => ({
      ...pl,
      stats: { ...pl.stats, pon: clamp(pl.stats.pon + delta, 0) },
    }));
    logs.push(`🌟 ${actingPlayer.name}の徳が高すぎて全員の心が洗われた！全員PON${delta}`);
    return updatedPlayers;
  }
  return players;
}

export function applySplashDamage(triggerIdx, players, logs) {
  const origin = players[triggerIdx];
  const radius = BAL.dice.splashRadius;
  return players.map((pl, i) => {
    if (i === triggerIdx) return pl;
    if (!pl.alive) return pl;
    if (pl.movePhase !== MOVE_PHASE.moving) return pl;
    if (Math.abs(pl.position - origin.position) > radius) return pl;
    logs.push(`💥 巻き添え！${pl.name}（${pl.position}マス付近）→ 次ターン1回休み`);
    return { ...pl, skipTurns: (pl.skipTurns || 0) + 1 };
  });
}
