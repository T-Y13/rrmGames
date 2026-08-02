import { describe, it, expect, vi } from "vitest";
import {
  POT_INIT_MIN,
  POT_TURN_STACK_TOTAL,
  computeProgressivePotDelta,
  potFromTurnGrowthOnly,
  potTurnIncrementPerRound,
  rollInitialProgressivePot,
  rollPotJackpotResetPool,
  resolveTotalPotAfterRoomTracking,
  readRoomTotalPot,
} from "./progressivePot.js";
import { BAL } from "../constants/gameBalance.js";

describe("rollInitialProgressivePot", () => {
  it("returns fixed 15,000", () => {
    expect(rollInitialProgressivePot()).toBe(15000);
    expect(rollInitialProgressivePot(() => 0.9999)).toBe(15000);
  });
});

describe("potFromTurnGrowthOnly", () => {
  it("adds 15,000 total over 12 completed rounds (turn adds only)", () => {
    expect(potFromTurnGrowthOnly(0)).toBe(0);
    expect(potFromTurnGrowthOnly(1)).toBe(potTurnIncrementPerRound());
    expect(potFromTurnGrowthOnly(12)).toBe(15000);
    expect(potFromTurnGrowthOnly(15)).toBe(15000);
    expect(potTurnIncrementPerRound() * 12).toBe(15000);
  });
});

describe("computeProgressivePotDelta", () => {
  it("adds 30% of bet on top of current pot", () => {
    expect(computeProgressivePotDelta(18000, 1000, false)).toEqual({
      totalPot: 18300,
      potPayout: 0,
      contribution: 300,
    });
  });

  it("pays pool plus this spin contribution on pot jackpot and resets to 15,000", () => {
    const randomFn = vi.fn().mockReturnValue(0.5);
    const result = computeProgressivePotDelta(22000, 1000, true, randomFn);
    expect(result.potPayout).toBe(22300);
    expect(result.contribution).toBe(300);
    expect(result.totalPot).toBe(POT_INIT_MIN);
  });
});

describe("resolveTotalPotAfterRoomTracking", () => {
  it("sets fixed initial pot when entering day 8", () => {
    expect(
      resolveTotalPotAfterRoomTracking({
        prevRemaining: BAL.dice.maxTurns,
        nextRemaining: BAL.dice.maxTurns,
        prevGs: { gamePhase: "playing", subPhase: "daily" },
        nextGs: { gamePhase: "playing", subPhase: "day8" },
        prevTotalPot: 25000,
      }),
    ).toBe(15000);
  });

  it("adds turn increment on each completed round (stacks with prior bet growth)", () => {
    const inc = potTurnIncrementPerRound();
    const nextRemaining = BAL.dice.maxTurns - 1;
    expect(
      resolveTotalPotAfterRoomTracking({
        prevRemaining: BAL.dice.maxTurns,
        nextRemaining,
        prevGs: { gamePhase: "playing", subPhase: "day8" },
        nextGs: { gamePhase: "playing", subPhase: "day8" },
        prevTotalPot: 17000,
      }),
    ).toBe(17000 + inc);
  });

  it("does not add turn increment after 12 rounds", () => {
    const nextRemaining = BAL.dice.maxTurns - 13;
    expect(
      resolveTotalPotAfterRoomTracking({
        prevRemaining: BAL.dice.maxTurns - 12,
        nextRemaining,
        prevGs: { gamePhase: "playing", subPhase: "day8" },
        nextGs: { gamePhase: "playing", subPhase: "day8" },
        prevTotalPot: 35000,
      }),
    ).toBe(35000);
  });
});

describe("both growth paths stack", () => {
  it("initial random plus turn adds reach initial + 15k without bets", () => {
    const randomFn = vi.fn().mockReturnValue(0);
    let pot = resolveTotalPotAfterRoomTracking({
      prevRemaining: BAL.dice.maxTurns,
      nextRemaining: BAL.dice.maxTurns,
      prevGs: { gamePhase: "playing", subPhase: "daily" },
      nextGs: { gamePhase: "playing", subPhase: "day8" },
      prevTotalPot: 0,
      randomFn,
    });
    expect(pot).toBe(15000);
    for (let r = 1; r <= 12; r += 1) {
      pot = resolveTotalPotAfterRoomTracking({
        prevRemaining: BAL.dice.maxTurns - (r - 1),
        nextRemaining: BAL.dice.maxTurns - r,
        prevGs: { gamePhase: "playing", subPhase: "day8" },
        nextGs: { gamePhase: "playing", subPhase: "day8" },
        prevTotalPot: pot,
      });
    }
    expect(pot).toBe(15000 + POT_TURN_STACK_TOTAL);
  });

  it("turn adds then bet adds exceed turn-only ceiling", () => {
    const inc = potTurnIncrementPerRound();
    let pot = 15000;
    pot = resolveTotalPotAfterRoomTracking({
      prevRemaining: BAL.dice.maxTurns,
      nextRemaining: BAL.dice.maxTurns - 1,
      prevGs: { gamePhase: "playing", subPhase: "day8" },
      nextGs: { gamePhase: "playing", subPhase: "day8" },
      prevTotalPot: pot,
    });
    expect(pot).toBe(15000 + inc);
    const afterSpin = computeProgressivePotDelta(pot, 1000, false);
    expect(afterSpin.totalPot).toBe(pot + 300);
    expect(afterSpin.totalPot).toBeGreaterThan(potFromTurnGrowthOnly(1));
  });
});

describe("readRoomTotalPot", () => {
  it("defaults to POT_INIT_MIN when missing", () => {
    expect(readRoomTotalPot({})).toBe(POT_INIT_MIN);
  });
});

describe("rollPotJackpotResetPool", () => {
  it("always returns 15,000", () => {
    expect(rollPotJackpotResetPool(() => 0)).toBe(POT_INIT_MIN);
    expect(rollPotJackpotResetPool(() => 0.9999)).toBe(POT_INIT_MIN);
  });
});
