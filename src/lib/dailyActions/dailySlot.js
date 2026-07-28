import { BAL } from "../../constants/gameBalance";
import { applyCharacterStatGain } from "../characterEffects";
import { clamp, clampMoney } from "../../utils/gameLogic";

export function validateDailySlotSpinResults(spinResults, expectedSpins = BAL.dailySlot.spins) {
  return Array.isArray(spinResults) && spinResults.length === expectedSpins;
}

export function resolveDailySlotPityCounter(spinResults, fallback = 0) {
  const last = spinResults?.[spinResults.length - 1];
  return typeof last?.pityCounterAfter === "number" ? last.pityCounterAfter : fallback;
}

/** デイリースロット結果を stats に反映 */
export function applyDailySlotSpinsToStats(stats, spinResults, char, ds = BAL.dailySlot) {
  let s = stats;
  let totalNet = 0;
  const spinDetails = [];

  spinResults.forEach((res, i) => {
    const betAmt = Number(res?.bet ?? ds.spinBet);
    const pay = Number(res?.payout ?? 0);
    const net = pay - betAmt;
    totalNet += net;
    s = { ...s, money: clampMoney(s.money - betAmt + pay) };

    const skBase = applyCharacterStatGain(char, "skill", ds.skillGainEverySpin);
    const skRoleRaw = res?.tier && res.tier !== "miss" ? ds.skillGainOnRole : 0;
    const skRole = applyCharacterStatGain(char, "skill", skRoleRaw);
    s = { ...s, skill: clamp(s.skill + skBase + skRole) };

    spinDetails.push({
      index: i + 1,
      bet: betAmt,
      message: res?.message ?? "？",
      net,
      moneyAfterSpin: s.money,
      skillAfterSpin: s.skill,
    });
  });

  return { stats: s, spinDetails, totalNet };
}

/** 盤面 FX 用：キャラ補正込みの技量獲得合計 */
export function computeDailySlotSkillGainTotal(spinResults, char, ds = BAL.dailySlot) {
  return spinResults.reduce((sum, res) => {
    const skBase = applyCharacterStatGain(char, "skill", ds.skillGainEverySpin);
    const skRoleRaw = res?.tier && res.tier !== "miss" ? ds.skillGainOnRole : 0;
    const skRole = applyCharacterStatGain(char, "skill", skRoleRaw);
    return sum + skBase + skRole;
  }, 0);
}
