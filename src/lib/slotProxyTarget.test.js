import { describe, expect, it } from "vitest";
import {
  buildProxySlotSpinStats,
  canProxySlotBetAt,
  canSelectAsProxySlotTarget,
  computeProxySlotMaxBet,
  getProxySlotAllowedBets,
  halveActorStatsForSlot,
} from "./slotProxyTarget";

describe("proxy slot bet cap", () => {
  const moving = (money) => ({
    id: "p",
    alive: true,
    movePhase: "moving",
    stats: { money },
  });

  it("computes 30% max bet floored", () => {
    expect(computeProxySlotMaxBet(3000)).toBe(900);
    expect(computeProxySlotMaxBet(3333)).toBe(999);
  });

  it("excludes 1000G bet when max is 900G", () => {
    expect(getProxySlotAllowedBets(3000)).toEqual([100, 300, 500]);
  });

  it("rejects selection at 500G or below", () => {
    expect(canSelectAsProxySlotTarget(moving(500))).toBe(false);
    expect(canSelectAsProxySlotTarget(moving(501))).toBe(true);
  });

  it("recalculates allowed bets after money drops", () => {
    expect(getProxySlotAllowedBets(2000)).toEqual([100, 300, 500]);
    expect(getProxySlotAllowedBets(1200)).toEqual([100, 300]);
    expect(getProxySlotAllowedBets(250)).toEqual([]);
  });

  it("validates bet against per-spin cap", () => {
    expect(canProxySlotBetAt(3000, 900)).toBe(true);
    expect(canProxySlotBetAt(3000, 1000)).toBe(false);
    expect(canProxySlotBetAt(1200, 500)).toBe(false);
    expect(canProxySlotBetAt(1200, 360)).toBe(true);
  });

  it("halves actor stats for proxy slot rates", () => {
    expect(halveActorStatsForSlot({ luck: 80, skill: 51, virtue: 99, money: 0 })).toEqual({
      luck: 40,
      skill: 25,
      virtue: 49,
      money: 0,
    });
  });

  it("builds proxy spin stats from actor half + target money", () => {
    expect(
      buildProxySlotSpinStats(
        { luck: 100, skill: 60, virtue: 40, pon: 5 },
        { money: 3000, pon: 10 },
      ),
    ).toMatchObject({
      luck: 50,
      skill: 30,
      virtue: 20,
      money: 3000,
      pon: 10,
    });
  });
});
