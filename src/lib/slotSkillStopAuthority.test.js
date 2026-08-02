import { describe, expect, it } from "vitest";
import { SLOT_SKILL_STOP_MODE } from "./slotReelStop";
import { pickSlotSpinBaseSnapshot, reconcileSkillStopSpinCommit } from "./slotSkillStopAuthority";

const reelMachine = { symbols: ["7", "BAR", "⭐", "🔔", "🍒"] };
const columnScrollStrips = [["7", "BAR", "🍒", "⭐", "🔔"], ["BAR", "🍒", "⭐", "🔔", "7"], ["7", "BAR", "🍒", "⭐", "🔔"]];
const baseRes = {
  tier: "miss",
  payout: 0,
  message: "ハズレ",
  reels: ["🍒", "🍒", "🔔"],
  pityCounterAfter: 2,
};

describe("slotSkillStopAuthority", () => {
  it("pickSlotSpinBaseSnapshot only keeps miss tier", () => {
    expect(pickSlotSpinBaseSnapshot(baseRes)?.tier).toBe("miss");
    expect(pickSlotSpinBaseSnapshot({ tier: "small", payout: 50 })).toBeNull();
  });

  it("passes through when skill stop inactive", () => {
    const out = reconcileSkillStopSpinCommit({
      freshGs: { slotSkillStopActive: false },
      clientRes: { tier: "big", payout: 500 },
      clientVisualReels: ["7", "7", "7"],
      skillStopScrollRows: null,
      bet: 100,
      machineKey: "standard",
      reelMachine,
    });
    expect(out.ok).toBe(true);
    expect(out.res.tier).toBe("big");
  });

  it("rejects impossible tier during skill stop", () => {
    const out = reconcileSkillStopSpinCommit({
      freshGs: {
        slotSkillStopActive: true,
        slotSkillStopMode: SLOT_SKILL_STOP_MODE.full,
        slotSpinBaseResult: pickSlotSpinBaseSnapshot(baseRes),
        slotVisualReels: ["🍒", "🍒", "🔔"],
      },
      clientRes: { tier: "jackpot", payout: 9999 },
      clientVisualReels: ["7", "7", "7"],
      skillStopScrollRows: 0,
      bet: 100,
      machineKey: "standard",
      reelMachine,
    });
    expect(out.ok).toBe(false);
  });

  it("authoritative win from scrollRows", () => {
    const out = reconcileSkillStopSpinCommit({
      freshGs: {
        slotSkillStopActive: true,
        slotSkillStopMode: SLOT_SKILL_STOP_MODE.full,
        slotSpinBaseResult: pickSlotSpinBaseSnapshot(baseRes),
        slotVisualReels: ["🍒", "🍒", "🔔"],
        slotColumnScrollStrips: columnScrollStrips,
      },
      clientRes: { tier: "miss", payout: 0, pityCounterAfter: 2 },
      clientVisualReels: ["🍒", "🍒", "🔔"],
      skillStopScrollRows: 1,
      bet: 100,
      machineKey: "standard",
      reelMachine,
    });
    expect(out.ok).toBe(true);
    expect(out.res.tier).toBe("small");
    expect(out.visualReels).toEqual(["🍒", "🍒", "🍒"]);
  });

  it("rejects client small win when scroll misses", () => {
    const out = reconcileSkillStopSpinCommit({
      freshGs: {
        slotSkillStopActive: true,
        slotSkillStopMode: SLOT_SKILL_STOP_MODE.full,
        slotSpinBaseResult: pickSlotSpinBaseSnapshot(baseRes),
        slotVisualReels: ["🍒", "🍒", "🔔"],
        slotColumnScrollStrips: columnScrollStrips,
      },
      clientRes: { tier: "small", payout: 50, pityCounterAfter: 2 },
      clientVisualReels: ["🍒", "🍒", "🍒"],
      skillStopScrollRows: 0,
      bet: 100,
      machineKey: "standard",
      reelMachine,
    });
    expect(out.ok).toBe(true);
    expect(out.res.tier).toBe("miss");
  });
});
