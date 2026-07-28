import { describe, expect, it } from "vitest";
import { BAL } from "../../constants/gameBalance";
import { applyShrineToStats, rollShrineAmuletDrop } from "./shrine";

describe("applyShrineToStats", () => {
  it("applies shrine cost and stat changes", () => {
    const stats = { money: 1000, luck: 10, virtue: 20, pon: 30, skill: 0 };
    const { stats: next, cost, luckGain, virtueGain, ponReduce } = applyShrineToStats(stats, {});
    expect(cost).toBe(BAL.shrine.cost);
    expect(next.money).toBe(1000 - BAL.shrine.cost);
    expect(next.luck).toBe(10 + luckGain);
    expect(next.virtue).toBe(20 + virtueGain);
    expect(next.pon).toBe(30 - ponReduce);
  });

  it("applies statGainMultiplier to luck and virtue", () => {
    const char = { statGainMultiplier: 0.8 };
    const { stats: next } = applyShrineToStats({ money: 1000, luck: 0, virtue: 0, pon: 20, skill: 0 }, char);
    expect(next.luck).toBe(Math.floor(BAL.shrine.luckGain * 0.8));
    expect(next.virtue).toBe(Math.floor(BAL.shrine.virtueGain * 0.8));
  });

  it("does not reduce pon below zero", () => {
    const { stats: next } = applyShrineToStats({ money: 1000, luck: 0, virtue: 0, pon: 5, skill: 0 }, {});
    expect(next.pon).toBe(0);
  });
});

describe("rollShrineAmuletDrop", () => {
  it("always drops when random is below probability", () => {
    expect(rollShrineAmuletDrop(100, () => 0).gotAmulet).toBe(true);
  });

  it("never drops when random is above probability", () => {
    expect(rollShrineAmuletDrop(0, () => 1).gotAmulet).toBe(false);
  });
});
