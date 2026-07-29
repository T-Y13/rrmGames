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

  it("buildSlotSpinVisualPlan can force near-miss layout", () => {
    let call = 0;
    const plan = buildSlotSpinVisualPlan(
      { tier: "miss", reels: ["?", "?", "?"] },
      "standard",
      {
        rng: () => {
          call += 1;
          return call === 1 ? 0.05 : 0.99;
        },
      },
    );
    expect(plan.visualReels[0]).toBe(plan.visualReels[1]);
    expect(plan.visualReels[0]).not.toBe(plan.visualReels[2]);
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
