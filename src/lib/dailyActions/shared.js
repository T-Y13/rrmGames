import { BAL } from "../../constants/gameBalance";
import { SUB_PHASE } from "../../constants/gamePhases";
import { computePassiveRentIncome } from "../characterEffects";
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

/** 大家等：家賃収入（stats 単体・テスト／互換用。本番はターン開始時 applyTurnStartRentToPlayer） */
export function applyDailyRentIncome(stats, player, char, gs) {
  const rate = Number(char?.rentIncomeRate);
  if (!Number.isFinite(rate) || rate <= 0 || gs?.subPhase !== SUB_PHASE.daily) {
    return { stats, rentIncome: 0, rentMeta: null, rentLog: null };
  }
  const rentMeta = computePassiveRentIncome(gs.players, player.id, char);
  if (rentMeta.amount <= 0) {
    return { stats, rentIncome: 0, rentMeta, rentLog: null };
  }
  const pct = Math.round(rate * 100);
  return {
    stats: { ...stats, money: clampMoney(stats.money + rentMeta.amount) },
    rentIncome: rentMeta.amount,
    rentMeta,
    rentLog: `🏠 家賃収入 +${rentMeta.amount}G（他プレイヤー生活費合計${rentMeta.sourceLivingCostSum}Gの${pct}%）`,
  };
}

/** 1〜7日目：生活費控除 + 日常 PON 加算（ゴースト自動仕事と同じ。家賃はターン開始時） */
export function applyDailyLivingCostAndPon(stats, player, char, gs) {
  const logs = [];
  let s = stats;

  if (gs?.subPhase === SUB_PHASE.daily) {
    const lc = livingCostForPlayer(player);
    s = { ...s, money: clampMoney(s.money - lc) };
    logs.push(`  生活費 -${lc}G → 資金 ${s.money}G`);

    const ponMultiplier = char?.ponMultiplier ?? 1;
    const ponGain = Math.ceil(BAL.pon.dailyGain * ponMultiplier);
    s = { ...s, pon: clamp(s.pon + ponGain) };
    logs.push(`  PON: +${ponGain} → ${s.pon}`);

    return { stats: s, logs, livingCost: lc, ponGain, rentIncome: 0 };
  }

  return { stats: s, logs, livingCost: 0, ponGain: 0, rentIncome: 0 };
}
