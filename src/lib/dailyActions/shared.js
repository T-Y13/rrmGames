import { BAL } from "../../constants/gameBalance";
import { clamp, clampMoney, livingCostForPlayer } from "../../utils/gameLogic";

/** ターン開始時のお守り運補正 */
export function applyAmuletLuckBoost(stats, amuletCount) {
  const count = Math.max(0, Math.floor(Number(amuletCount) || 0));
  if (count <= 0) return { stats, luckBonus: 0 };
  const luckBonus = count * 2;
  return {
    stats: { ...stats, luck: clamp(stats.luck + luckBonus) },
    luckBonus,
  };
}

/** 1〜7日目：生活費控除 + 日常 PON 加算（ゴースト自動仕事と同じ） */
export function applyDailyLivingCostAndPon(stats, player, char, gs) {
  const logs = [];
  let s = stats;

  if (gs?.subPhase === "daily") {
    const lc = livingCostForPlayer(player);
    s = { ...s, money: clampMoney(s.money - lc) };
    logs.push(`  生活費 -${lc}G → 資金 ${s.money}G`);

    const ponMultiplier = char?.ponMultiplier ?? 1;
    const ponGain = Math.ceil(BAL.pon.dailyGain * ponMultiplier);
    s = { ...s, pon: clamp(s.pon + ponGain) };
    logs.push(`  PON: +${ponGain} → ${s.pon}`);

    return { stats: s, logs, livingCost: lc, ponGain };
  }

  return { stats: s, logs, livingCost: 0, ponGain: 0 };
}
