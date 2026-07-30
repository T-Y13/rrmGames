import { describe, expect, it } from "vitest";
import {
  activeManualStopReelIndex,
  canManualStopReel,
  isFirstReelManualStopReady,
  nextManualStopReelIndex,
  SLOT_REEL_MANUAL_STOP_MIN_MS,
} from "./slotReelStopSequence";

describe("slotReelStopSequence", () => {
  it("nextManualStopReelIndex returns leftmost spinning reel", () => {
    expect(nextManualStopReelIndex([false, false, false])).toBe(0);
    expect(nextManualStopReelIndex([true, false, false])).toBe(1);
    expect(nextManualStopReelIndex([true, true, false])).toBe(2);
    expect(nextManualStopReelIndex([true, true, true])).toBe(-1);
  });

  it("canManualStopReel enforces left-to-right order", () => {
    expect(canManualStopReel([false, false, false], 0)).toBe(true);
    expect(canManualStopReel([false, false, false], 1)).toBe(false);
    expect(canManualStopReel([true, false, false], 1)).toBe(true);
    expect(canManualStopReel([true, true, false], 2)).toBe(true);
    expect(canManualStopReel([true, false, false], 2)).toBe(false);
  });

  it("isFirstReelManualStopReady respects min delay", () => {
    const t0 = 1000;
    expect(isFirstReelManualStopReady(t0, t0 + SLOT_REEL_MANUAL_STOP_MIN_MS - 1)).toBe(false);
    expect(isFirstReelManualStopReady(t0, t0 + SLOT_REEL_MANUAL_STOP_MIN_MS)).toBe(true);
  });

  it("activeManualStopReelIndex waits for reel 0 min delay", () => {
    const t0 = 1000;
    expect(activeManualStopReelIndex([false, false, false], t0, t0 + 100)).toBe(-1);
    expect(activeManualStopReelIndex([false, false, false], t0, t0 + SLOT_REEL_MANUAL_STOP_MIN_MS)).toBe(0);
    expect(activeManualStopReelIndex([true, false, false], t0, t0 + SLOT_REEL_MANUAL_STOP_MIN_MS)).toBe(1);
  });
});
