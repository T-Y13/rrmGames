import { BAL } from "../../constants/gameBalance";
import { applyCharacterStatGain } from "../characterEffects";
import { applyVirtueIncomeBoost, clamp, clampMoney } from "../../utils/gameLogic";

/**
 * 仕事報酬の見積もり（UI 表示・実処理共通）。
 * @returns {{ workBase: number, workTotal: number, workVirtueGain: number }}
 */
export function computeWorkPayout(char, virtue) {
  const workBonus = char?.workRewardBonus ?? 0;
  const wm = char?.workRewardMultiplier ?? 1;
  const workBase = Math.floor((BAL.work.reward + workBonus) * wm);
  const workTotal = applyVirtueIncomeBoost(workBase, virtue);
  const workVirtueGain = applyCharacterStatGain(char, "virtue", BAL.work.virtueGain);
  return { workBase, workTotal, workVirtueGain };
}

/** 仕事報酬を stats に反映 */
export function applyWorkIncomeToStats(stats, char) {
  const { workBase, workTotal, workVirtueGain } = computeWorkPayout(char, stats.virtue);
  return {
    stats: {
      ...stats,
      money: clampMoney(stats.money + workTotal),
      virtue: clamp(stats.virtue + workVirtueGain),
    },
    workBase,
    workTotal,
    workVirtueGain,
  };
}
