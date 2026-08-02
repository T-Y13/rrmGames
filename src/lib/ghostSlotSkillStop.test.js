import { describe, expect, it } from "vitest";
import { buildGhostSlotSpinResultCtx, rollGhostSkillStopOutcome } from "./ghostSlotSkillStop";
import { SLOT_SKILL_STOP_MODE } from "./slotReelStop";

const reelMachine = {
  symbols: ["7", "BAR", "⭐", "🔔", "🍒"],
};

describe("ghostSlotSkillStop", () => {
  it("rollGhostSkillStopOutcome wins with low scrollRows", () => {
    const out = rollGhostSkillStopOutcome({
      visualReels: ["🍒", "🍒", "🔔"],
      baseRes: { tier: "miss", payout: 0 },
      reelMachine,
      bet: 100,
      machineKey: "standard",
      columnScrollStrip: ["7", "BAR", "🍒", "⭐", "🔔"],
      rng: () => 1 / 3,
    });
    expect(out.won).toBe(true);
    expect(out.res.tier).toBe("small");
  });

  it("buildGhostSlotSpinResultCtx leaves non-skill spins unchanged", () => {
    const res = { tier: "small", payout: 80, reels: ["🍒", "🍒", "🍒"] };
    const ctx = buildGhostSlotSpinResultCtx({
      res,
      machineKey: "standard",
      reelMachine,
      bet: 100,
      rng: () => 0.99,
    });
    expect(ctx.skillStop.active).toBe(false);
    expect(ctx.res.tier).toBe("small");
  });

  it("buildGhostSlotSpinResultCtx resolves skill when gase reach skill triggers", () => {
    const res = { tier: "miss", payout: 0, reels: ["🍒", "🍒", "🔔"] };
    let n = 0;
    const ctx = buildGhostSlotSpinResultCtx({
      res,
      machineKey: "standard",
      reelMachine,
      bet: 100,
      columnScrollStrips: [
        ["7", "BAR", "🍒", "⭐", "🔔"],
        ["BAR", "🍒", "⭐", "🔔", "7"],
        ["7", "BAR", "🍒", "⭐", "🔔"],
      ],
      rng: () => {
        n += 1;
        if (n === 1) return 0.99;
        if (n === 2) return 0.1;
        return 1 / 3;
      },
    });
    expect(ctx.skillStop.active).toBe(true);
    expect(ctx.skillStop.mode).toBe(SLOT_SKILL_STOP_MODE.full);
    expect(ctx.res.tier).toBe("small");
    expect(ctx.visualReels).toEqual(["🍒", "🍒", "🔔"]);
    expect(ctx.commitVisualReels).toEqual(["🍒", "🍒", "🍒"]);
    expect(typeof ctx.skillStopScrollRows).toBe("number");
  });

  it("buildGhostSlotSpinResultCtx skips skill stop for disallowed gase symbols", () => {
    const res = { tier: "miss", payout: 0, reels: ["7", "7", "🔔"] };
    const ctx = buildGhostSlotSpinResultCtx({
      res,
      machineKey: "standard",
      reelMachine,
      bet: 100,
      rng: () => 0.99,
    });
    expect(ctx.skillStop.active).toBe(false);
    expect(ctx.res.tier).toBe("miss");
  });
});
