import { describe, expect, it } from "vitest";
import {
  applySkillStopWinToSpinResult,
  buildSkillStopScrollStrip,
  getPaylineSymbolFromScrollStrip,
  getStripSymbolAtRowIndex,
  isScrollInSkillWinWindow,
  isSkillStopScrollWin,
  resolveGaseReachSkillStopOutcome,
  resolveSkillStopSpin,
} from "./slotSkillStopResolve";

const reelMachine = {
  symbols: ["7", "BAR", "🍒", "⭐", "🔔"],
};
const fullStrip = ["7", "BAR", "🍒", "⭐", "🔔"];

describe("slotSkillStopResolve", () => {
  it("buildSkillStopScrollStrip alternates match on odd indices", () => {
    const strip = buildSkillStopScrollStrip({ matchSymbol: "🍒", missSymbol: "🔔", length: 6 });
    expect(strip).toEqual(["🔔", "🍒", "🔔", "🍒", "🔔", "🍒"]);
    expect(getPaylineSymbolFromScrollStrip(0, strip)).toBe("🍒");
    expect(getPaylineSymbolFromScrollStrip(1, strip)).toBe("🔔");
  });

  it("getStripSymbolAtRowIndex matches payline formula at scroll=0", () => {
    const strip = buildSkillStopScrollStrip({ matchSymbol: "🍒", missSymbol: "🔔" });
    expect(getStripSymbolAtRowIndex(1, strip)).toBe(getPaylineSymbolFromScrollStrip(0, strip));
  });

  it("isSkillStopScrollWin true when payline shows match on full strip", () => {
    expect(isSkillStopScrollWin(1, fullStrip, "🍒", 0)).toBe(true);
    expect(isSkillStopScrollWin(0, fullStrip, "🍒", 0)).toBe(false);
  });

  it("isScrollInSkillWinWindow true near integer alignment", () => {
    expect(isScrollInSkillWinWindow(2.02, 0.14)).toBe(true);
    expect(isScrollInSkillWinWindow(2.5, 0.14)).toBe(false);
  });

  it("resolveGaseReachSkillStopOutcome wins when payline is match on full strip", () => {
    const out = resolveGaseReachSkillStopOutcome({
      scrollRows: 1,
      visualReels: ["🍒", "🍒", "🔔"],
      reelMachine,
      scrollStrip: fullStrip,
    });
    expect(out.won).toBe(true);
    expect(out.reel3Middle).toBe("🍒");
  });

  it("resolveGaseReachSkillStopOutcome loses when payline is miss on full strip", () => {
    const out = resolveGaseReachSkillStopOutcome({
      scrollRows: 0,
      visualReels: ["🍒", "🍒", "🔔"],
      reelMachine,
      scrollStrip: fullStrip,
    });
    expect(out.won).toBe(false);
    expect(out.reel3Middle).toBe("🔔");
  });

  it("applySkillStopWinToSpinResult upgrades miss to tier by symbol", () => {
    const miss = { tier: "miss", payout: 0, reels: ["🍒", "🍒", "🔔"] };
    const small = applySkillStopWinToSpinResult(miss, {
      matchSymbol: "🍒",
      bet: 100,
      machineKey: "standard",
    });
    expect(small.tier).toBe("small");
    expect(small.payout).toBe(80);
    expect(small.message).toContain("小当たり");

    const mid = applySkillStopWinToSpinResult(miss, {
      matchSymbol: "⭐",
      bet: 100,
      machineKey: "standard",
    });
    expect(mid.tier).toBe("mid");
    expect(mid.payout).toBe(300);
    expect(mid.message).toContain("中当たり");

    const atari = applySkillStopWinToSpinResult(miss, {
      matchSymbol: "🔔",
      bet: 100,
      machineKey: "standard",
    });
    expect(atari.tier).toBe("atari");
    expect(atari.payout).toBe(150);
    expect(atari.message).toContain("当たり");
  });

  it("resolveSkillStopSpin returns upgraded result when won", () => {
    const base = { tier: "miss", payout: 0, reels: ["🍒", "🍒", "🔔"] };
    const resolved = resolveSkillStopSpin({
      scrollRows: 1,
      visualReels: ["🍒", "🍒", "🔔"],
      baseRes: base,
      reelMachine,
      bet: 100,
      machineKey: "standard",
      scrollStrip: fullStrip,
    });
    expect(resolved.won).toBe(true);
    expect(resolved.res.tier).toBe("small");
    expect(resolved.visualReels).toEqual(["🍒", "🍒", "🍒"]);
  });

  it("resolveSkillStopSpin fails on null scrollRows (no auto-win)", () => {
    const base = { tier: "miss", payout: 0, reels: ["🍒", "🍒", "🔔"] };
    const resolved = resolveSkillStopSpin({
      scrollRows: null,
      visualReels: ["🍒", "🍒", "🔔"],
      baseRes: base,
      reelMachine,
      bet: 100,
      machineKey: "standard",
      scrollStrip: fullStrip,
    });
    expect(resolved.won).toBe(false);
    expect(resolved.res.tier).toBe("miss");
  });

  it("resolveSkillStopSpin rejects win for disallowed match symbols", () => {
    const base = { tier: "miss", payout: 0, reels: ["BAR", "BAR", "🔔"] };
    const resolved = resolveSkillStopSpin({
      scrollRows: 1,
      visualReels: ["BAR", "BAR", "🔔"],
      baseRes: base,
      reelMachine,
      bet: 100,
      machineKey: "standard",
      scrollStrip: fullStrip,
    });
    expect(resolved.won).toBe(false);
    expect(resolved.res.tier).toBe("miss");
  });
});
