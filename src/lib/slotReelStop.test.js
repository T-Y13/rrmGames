import { describe, expect, it } from "vitest";
import {
  buildSlotSpinVisualPlan,
  estimateSkillStopRatePerSpin,
  isGaseReachVisual,
  resolveSlotSkillStopContext,
  SLOT_SKILL_STOP_MODE,
} from "./slotReelStop";

describe("slotReelStop", () => {
  it("isGaseReachVisual detects miss-tier two-match tease", () => {
    expect(isGaseReachVisual(["🍒", "🍒", "🔔"], "miss")).toBe(true);
    expect(isGaseReachVisual(["🍒", "🍒", "🍒"], "miss")).toBe(false);
    expect(isGaseReachVisual(["🍒", "🍒", "🔔"], "atari")).toBe(false);
    expect(isGaseReachVisual(["🍒", "🔔", "🍒"], "miss")).toBe(false);
  });

  it("resolveSlotSkillStopContext rolls skill stop on gase reach", () => {
    const ctx = resolveSlotSkillStopContext({
      visualReels: ["⭐", "⭐", "🍒"],
      tier: "miss",
      rng: () => 0.1,
    });
    expect(ctx.eligible).toBe(true);
    expect(ctx.active).toBe(true);
    expect(ctx.pattern).toBe("gaseReach");
    expect(ctx.mode).toBe(SLOT_SKILL_STOP_MODE.full);
  });

  it("resolveSlotSkillStopContext rolls skill stop on bell gase reach", () => {
    const ctx = resolveSlotSkillStopContext({
      visualReels: ["🔔", "🔔", "🍒"],
      tier: "miss",
      rng: () => 0.1,
    });
    expect(ctx.eligible).toBe(true);
    expect(ctx.active).toBe(true);
    expect(ctx.mode).toBe(SLOT_SKILL_STOP_MODE.full);
  });

  it("resolveSlotSkillStopContext skips non-allowed gase reach", () => {
    const ctx = resolveSlotSkillStopContext({
      visualReels: ["💰", "💰", "🔔"],
      tier: "miss",
      rng: () => 0.1,
    });
    expect(ctx.eligible).toBe(false);
    expect(ctx.active).toBe(false);
    expect(ctx.reason).toBe("skill_stop_symbol_not_allowed");
  });

  it("resolveSlotSkillStopContext skips when rng above chance", () => {
    const ctx = resolveSlotSkillStopContext({
      visualReels: ["⭐", "⭐", "🍒"],
      tier: "miss",
      rng: () => 0.99,
    });
    expect(ctx.eligible).toBe(true);
    expect(ctx.active).toBe(false);
    expect(ctx.reason).toBe("gase_reach_skill_skip");
  });

  it("buildSlotSpinVisualPlan keeps cherry gase reach eligible for skill stop", () => {
    const plan = buildSlotSpinVisualPlan(
      { tier: "miss", reels: ["🍒", "🍒", "🔔"] },
      "standard",
      { rng: () => 0.99 },
    );
    expect(plan.visualReels).toEqual(["🍒", "🍒", "🔔"]);
    expect(plan.reachPossible).toBe(true);
    expect(plan.skillStop.eligible).toBe(true);
  });

  it("estimateSkillStopRatePerSpin matches default constants (18% gase × 70% skill)", () => {
    const { pGaseReach, pSkillStop } = estimateSkillStopRatePerSpin();
    expect(pGaseReach).toBeCloseTo(0.85 * 0.18);
    expect(pSkillStop).toBeCloseTo(0.85 * 0.18 * 0.7);
    expect(pSkillStop).toBeCloseTo(0.1071, 3);
  });
});
