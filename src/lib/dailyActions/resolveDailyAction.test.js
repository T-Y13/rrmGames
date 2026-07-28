import { describe, expect, it } from "vitest";
import { CHARACTERS } from "../../constants/gameBalance";
import { resolveDailyAction, resolveWorkDailyAction } from "./resolveDailyAction";

function baseGs(overrides = {}) {
  return {
    gamePhase: "playing",
    subPhase: "daily",
    currentDay: 3,
    currentPlayerIdx: 0,
    players: [
      {
        id: "p1",
        name: "太郎",
        characterType: "salaryman",
        amulets: 0,
        stats: { money: 5000, virtue: 30, luck: 10, skill: 40, pon: 5, livingCost: 500 },
        streamMultiplier: CHARACTERS.salaryman.streamMultiplier,
      },
    ],
    ...overrides,
  };
}

describe("resolveDailyAction", () => {
  it("returns null for unknown action", () => {
    expect(resolveDailyAction(baseGs(), "shrine")).toBeNull();
  });

  it("returns null when not daily subPhase", () => {
    expect(resolveDailyAction(baseGs({ subPhase: "day8" }), "work")).toBeNull();
  });
});

describe("resolveWorkDailyAction", () => {
  it("advances turn and applies work income with living cost and pon", () => {
    const gs = baseGs();
    const next = resolveWorkDailyAction(gs, { buildDailyActionFx: false });
    expect(next).not.toBeNull();
    expect(next.players[0].stats.money).toBeGreaterThan(5000);
    expect(next.players[0].stats.pon).toBeGreaterThan(5);
    expect(next.players[0].stats.virtue).toBeGreaterThan(30);
  });

  it("includes dailyActionFx by default", () => {
    const next = resolveWorkDailyAction(baseGs());
    expect(next.dailyActionFx).toBeDefined();
    expect(next.dailyActionFx.actionType).toBe("work");
  });

  it("applies amulet luck before work", () => {
    const gs = baseGs({
      players: [
        {
          ...baseGs().players[0],
          amulets: 2,
          stats: { money: 5000, virtue: 30, luck: 10, skill: 40, pon: 5, livingCost: 500 },
        },
      ],
    });
    const next = resolveWorkDailyAction(gs, { buildDailyActionFx: false });
    expect(next.players[0].stats.luck).toBe(14);
  });
});
