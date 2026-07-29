import { describe, expect, it } from "vitest";
import {
  applyCharacterStatGain,
  applyDailyRentForAllEligible,
  applyTurnStartRentToPlayer,
  computePassiveRentIncome,
  isCharacterSelectableInLobby,
  luckGaugeRangeForCharacter,
  resolveInitialLuck,
} from "./characterEffects";
import { CHARACTERS } from "../constants/gameBalance";
import { SUB_PHASE } from "../constants/gamePhases";

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

  it("isCharacterSelectableInLobby blocks multiplayerOnly when solo", () => {
    expect(isCharacterSelectableInLobby(CHARACTERS.landlord, 1)).toBe(false);
    expect(isCharacterSelectableInLobby(CHARACTERS.landlord, 2)).toBe(true);
    expect(isCharacterSelectableInLobby(CHARACTERS.salaryman, 1)).toBe(true);
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

describe("applyTurnStartRentToPlayer", () => {
  const players = [
    { id: "p0", characterType: "salaryman", stats: { money: 1000, livingCost: 500 } },
    {
      id: "p1",
      characterType: "landlord",
      stats: { money: 2000, livingCost: 150 },
    },
  ];

  it("collects rent once per in-game day", () => {
    const first = applyTurnStartRentToPlayer(players, 1, SUB_PHASE.daily, 1);
    expect(first.rentIncome).toBe(Math.floor(500 * 0.7));
    expect(first.players[1].lastRentCollectedDay).toBe(1);

    const second = applyTurnStartRentToPlayer(first.players, 1, SUB_PHASE.daily, 1);
    expect(second.rentIncome).toBe(0);
    expect(second.players[1].stats.money).toBe(first.players[1].stats.money);
  });

  it("collects again on the next day", () => {
    const day1 = applyTurnStartRentToPlayer(players, 1, SUB_PHASE.daily, 1);
    const day2 = applyTurnStartRentToPlayer(day1.players, 1, SUB_PHASE.daily, 2);
    expect(day2.rentIncome).toBe(Math.floor(500 * 0.7));
    expect(day2.players[1].lastRentCollectedDay).toBe(2);
  });

  it("skips rent on day 8", () => {
    const r = applyTurnStartRentToPlayer(players, 1, SUB_PHASE.day8, 8);
    expect(r.rentIncome).toBe(0);
  });
});

describe("applyDailyRentForAllEligible", () => {
  it("applies rent to every landlord at day start", () => {
    const players = [
      { id: "p0", characterType: "salaryman", stats: { money: 1000, livingCost: 500 } },
      { id: "p1", characterType: "landlord", stats: { money: 2000, livingCost: 150 } },
    ];
    const { players: next, rentLogs } = applyDailyRentForAllEligible(players, 1, SUB_PHASE.daily);
    expect(rentLogs).toHaveLength(1);
    expect(next[1].stats.money).toBe(2000 + Math.floor(500 * 0.7));
    expect(next[0].lastRentCollectedDay).toBeUndefined();
  });
});
