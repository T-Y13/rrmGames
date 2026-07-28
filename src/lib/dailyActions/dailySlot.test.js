import { describe, expect, it } from "vitest";
import { BAL } from "../../constants/gameBalance";
import {
  applyDailySlotSpinsToStats,
  computeDailySlotSkillGainTotal,
  resolveDailySlotPityCounter,
  validateDailySlotSpinResults,
} from "./dailySlot";

describe("validateDailySlotSpinResults", () => {
  it("accepts correct spin count", () => {
    const spins = Array(BAL.dailySlot.spins).fill({ bet: 100, payout: 0, tier: "miss" });
    expect(validateDailySlotSpinResults(spins)).toBe(true);
  });

  it("rejects wrong length", () => {
    expect(validateDailySlotSpinResults([{ bet: 100 }])).toBe(false);
  });
});

describe("applyDailySlotSpinsToStats", () => {
  const stats = { money: 5000, skill: 10, virtue: 0, luck: 0, pon: 0 };

  it("applies bet, payout, and skill per spin", () => {
    const spinResults = [
      { bet: BAL.dailySlot.spinBet, payout: 200, tier: "small", message: "小役" },
      { bet: BAL.dailySlot.spinBet, payout: 0, tier: "miss", message: "ハズレ" },
      { bet: BAL.dailySlot.spinBet, payout: 0, tier: "miss", message: "ハズレ" },
    ];
    const { stats: next, totalNet, spinDetails } = applyDailySlotSpinsToStats(stats, spinResults, {});
    expect(spinDetails).toHaveLength(3);
    expect(totalNet).toBe(200 - BAL.dailySlot.spinBet * 3);
    expect(next.money).toBe(5000 + totalNet);
    const expectedSkill =
      10 +
      (BAL.dailySlot.skillGainEverySpin + BAL.dailySlot.skillGainOnRole) +
      BAL.dailySlot.skillGainEverySpin * 2;
    expect(next.skill).toBe(expectedSkill);
  });
});

describe("resolveDailySlotPityCounter", () => {
  it("reads pityCounterAfter from last spin", () => {
    expect(resolveDailySlotPityCounter([{ pityCounterAfter: 2 }, { pityCounterAfter: 5 }], 0)).toBe(5);
  });

  it("falls back when missing", () => {
    expect(resolveDailySlotPityCounter([{}], 3)).toBe(3);
  });
});

describe("computeDailySlotSkillGainTotal", () => {
  it("sums skill gains with role bonus", () => {
    const spinResults = [{ tier: "small" }, { tier: "miss" }];
    expect(computeDailySlotSkillGainTotal(spinResults, {})).toBe(
      BAL.dailySlot.skillGainEverySpin + BAL.dailySlot.skillGainOnRole + BAL.dailySlot.skillGainEverySpin,
    );
  });
});
