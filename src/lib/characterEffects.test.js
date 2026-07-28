import { describe, expect, it } from "vitest";
import {
  applyCharacterStatGain,
  computePassiveRentIncome,
  luckGaugeRangeForCharacter,
  resolveInitialLuck,
} from "./characterEffects";
import { CHARACTERS } from "../constants/gameBalance";

describe("resolveInitialLuck", () => {
  it("salaryman uses roll*2 without bonus", () => {
    expect(resolveInitialLuck(CHARACTERS.salaryman, 3)).toBe(6);
  });

  it("student adds luckBonus on top of roll", () => {
    expect(resolveInitialLuck(CHARACTERS.student, 2)).toBe(4 + 20);
  });

  it("luckFixed ignores roll and bonus", () => {
    const mock = { luckFixed: 3, luckBonus: 20 };
    expect(resolveInitialLuck(mock, 5)).toBe(3);
    expect(resolveInitialLuck(mock, 0)).toBe(3);
  });
});

describe("applyCharacterStatGain", () => {
  it("returns delta unchanged when multiplier omitted", () => {
    expect(applyCharacterStatGain(CHARACTERS.salaryman, "skill", 10)).toBe(10);
    expect(applyCharacterStatGain(CHARACTERS.salaryman, "virtue", -5)).toBe(-5);
  });

  it("applies statGainMultiplier when set", () => {
    const debuffed = { statGainMultiplier: 0.8 };
    expect(applyCharacterStatGain(debuffed, "luck", 20)).toBe(16);
    expect(applyCharacterStatGain(debuffed, "skill", 10)).toBe(8);
  });
});

describe("computePassiveRentIncome", () => {
  const players = [
    { id: "landlord", alive: true, stats: { livingCost: 100 }, characterType: "salaryman" },
    { id: "a", alive: true, stats: { livingCost: 500 }, characterType: "salaryman" },
    { id: "b", alive: true, stats: { livingCost: 300 }, characterType: "student" },
    { id: "dead", alive: false, stats: { livingCost: 999 }, characterType: "salaryman" },
  ];

  it("returns zero when rentIncomeRate is unset", () => {
    expect(computePassiveRentIncome(players, "landlord", CHARACTERS.salaryman)).toEqual({
      amount: 0,
      sourceLivingCostSum: 0,
      otherCount: 0,
    });
  });

  it("sums other alive players living cost and applies rate", () => {
    const char = { rentIncomeRate: 0.7 };
    expect(computePassiveRentIncome(players, "landlord", char)).toEqual({
      amount: Math.floor(800 * 0.7),
      sourceLivingCostSum: 800,
      otherCount: 2,
    });
  });
});

describe("luckGaugeRangeForCharacter", () => {
  it("uses luckFixed range when set", () => {
    expect(luckGaugeRangeForCharacter({ luckFixed: 3 })).toEqual({ min: 3, max: 3 });
  });

  it("uses bonus spread for normal characters", () => {
    expect(luckGaugeRangeForCharacter(CHARACTERS.student)).toEqual({ min: 20, max: 30 });
  });
});
