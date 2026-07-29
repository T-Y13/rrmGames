import { describe, expect, it } from "vitest";
import { CHARACTERS } from "../../constants/gameBalance";
import { applyDailyRentIncome } from "./shared";

describe("applyDailyRentIncome", () => {
  const landlordChar = CHARACTERS.landlord;
  const gs = {
    subPhase: "daily",
    players: [
      { id: "landlord", alive: true, stats: { livingCost: 100, money: 1000 } },
      { id: "a", alive: true, stats: { livingCost: 500 } },
      { id: "b", alive: true, stats: { livingCost: 300 } },
    ],
  };

  it("adds rent after living cost for landlord", () => {
    const player = gs.players[0];
    const stats = { money: 900, virtue: 0, luck: 3, skill: 0, pon: 0 };
    const result = applyDailyRentIncome(stats, player, landlordChar, gs);
    expect(result.rentIncome).toBe(Math.floor(800 * 0.7));
    expect(result.stats.money).toBe(900 + result.rentIncome);
    expect(result.rentLog).toContain("家賃収入");
  });

  it("returns zero for non-landlord characters", () => {
    const result = applyDailyRentIncome(
      { money: 1000 },
      { id: "a" },
      CHARACTERS.salaryman,
      gs,
    );
    expect(result.rentIncome).toBe(0);
  });
});
