import { describe, expect, it } from "vitest";
import { BAL, CHARACTERS } from "../../constants/gameBalance";
import { applyCharacterStatGain } from "../characterEffects";
import { applyVirtueIncomeBoost } from "../../utils/gameLogic";
import { applyWorkIncomeToStats, computeWorkPayout } from "./work";

describe("computeWorkPayout", () => {
  it("salaryman base reward with virtue boost", () => {
    const { workTotal, workVirtueGain, workBase } = computeWorkPayout(CHARACTERS.salaryman, 50);
    expect(workBase).toBe(Math.floor((BAL.work.reward + 200) * 1));
    expect(workTotal).toBe(applyVirtueIncomeBoost(workBase, 50));
    expect(workVirtueGain).toBe(BAL.work.virtueGain);
  });

  it("applies workRewardBonus and multiplier", () => {
    const char = { workRewardBonus: 100, workRewardMultiplier: 1.5 };
    const { workBase } = computeWorkPayout(char, 0);
    expect(workBase).toBe(Math.floor((BAL.work.reward + 100) * 1.5));
  });

  it("applies statGainMultiplier to virtue gain", () => {
    const char = { statGainMultiplier: 0.8 };
    const { workVirtueGain } = computeWorkPayout(char, 0);
    expect(workVirtueGain).toBe(applyCharacterStatGain(char, "virtue", BAL.work.virtueGain));
    expect(workVirtueGain).toBe(8);
  });
});

describe("applyWorkIncomeToStats", () => {
  it("updates money and virtue", () => {
    const stats = { money: 1000, virtue: 20, luck: 0, skill: 0, pon: 0 };
    const { stats: next, workTotal, workVirtueGain } = applyWorkIncomeToStats(stats, CHARACTERS.salaryman);
    expect(next.money).toBe(1000 + workTotal);
    expect(next.virtue).toBe(20 + workVirtueGain);
  });
});
