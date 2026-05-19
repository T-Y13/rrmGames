import { describe, it, expect, vi, afterEach } from "vitest";
import {
  VIRTUE_BY_INITIAL_ROLL,
  virtueMinRoll,
  rollDie,
  applyGoalLandingConfirm,
  computeFinalStatsFromInitialRolls,
  livingRollFromInitialRolls,
} from "./gameLogic.js";

describe("virtueMinRoll", () => {
  it("returns the minimum d6 face for each virtue band", () => {
    expect(virtueMinRoll(0)).toBe(1);
    expect(virtueMinRoll(49)).toBe(1);
    expect(virtueMinRoll(50)).toBe(2);
    expect(virtueMinRoll(69)).toBe(2);
    expect(virtueMinRoll(70)).toBe(3);
    expect(virtueMinRoll(99)).toBe(3);
    expect(virtueMinRoll(100)).toBe(4);
    expect(virtueMinRoll(500)).toBe(4);
  });
});

describe("initial rolls → final virtue", () => {
  it("uses VIRTUE_BY_INITIAL_ROLL for the virtue die (salaryman, no extra bonus)", () => {
    const rolls = { luck: 0, skill: 0, virtue: 3, pon: 0 };
    const { virtue } = computeFinalStatsFromInitialRolls(rolls, "salaryman");
    expect(virtue).toBe(20 + VIRTUE_BY_INITIAL_ROLL[3]);
  });

  it("derives living roll from the mean of luck, skill, virtue dice", () => {
    expect(livingRollFromInitialRolls({ luck: 0, skill: 0, virtue: 0, pon: 0 })).toBe(0);
    expect(livingRollFromInitialRolls({ luck: 2, skill: 3, virtue: 4, pon: 0 })).toBe(3);
  });
});

describe("applyGoalLandingConfirm", () => {
  it("updates only the goal lander without changing currentPlayerIdx", () => {
    const gs = {
      subPhase: "day8",
      gamePhase: "playing",
      currentPlayerIdx: 1,
      log: [],
      players: [
        { id: "a", name: "A", movePhase: "arrived", reservedSlotTurns: 0 },
        { id: "b", name: "B", movePhase: "goalLanding", reservedSlotTurns: 2 },
      ],
    };
    const next = applyGoalLandingConfirm(gs, "b");
    expect(next.currentPlayerIdx).toBe(1);
    expect(next.players[1].movePhase).toBe("waitingSlot");
    expect(next.players[0].movePhase).toBe("arrived");
  });
});

describe("rollDie", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rolls one d6 bounded by virtueMinRoll when luck < 80", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const out = rollDie({ virtue: 30, luck: 50 });

    expect(out.advantage).toBe(false);
    expect(out.rolls).toEqual([1]);
    expect(out.value).toBe(1);
  });

  it("rolls twice and sums when luck >= 80 (advantage)", () => {
    let i = 0;
    vi.spyOn(Math, "random").mockImplementation(() => {
      const seq = [0, 0.999];
      return seq[Math.min(i++, seq.length - 1)];
    });

    const out = rollDie({ virtue: 10, luck: 80 });

    expect(out.advantage).toBe(true);
    expect(out.rolls).toHaveLength(2);
    expect(out.value).toBe(out.rolls[0] + out.rolls[1]);
  });

  it("uses a higher minimum face for high virtue", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const low = rollDie({ virtue: 50, luck: 50 });
    const high = rollDie({ virtue: 100, luck: 50 });

    expect(virtueMinRoll(50)).toBe(2);
    expect(virtueMinRoll(100)).toBe(4);
    expect(low.rolls[0]).toBe(2);
    expect(high.rolls[0]).toBe(4);
  });
});
