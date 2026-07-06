import { describe, it, expect } from "vitest";
import {
  resolveSlotBroadcastSpinContext,
  slotBroadcastSpinAnimKey,
} from "./gameLogic.js";

describe("resolveSlotBroadcastSpinContext", () => {
  it("uses targetResult and slotSpinSessionId when present", () => {
    const ctx = resolveSlotBroadcastSpinContext({
      slotMirrorMachineKey: "standard",
      slotSpinSessionId: "sess-1",
      targetResult: [0, 1, 2],
      players: [{ lastSpinResult: { spin: 1 } }],
      currentPlayerIdx: 0,
    });
    expect(ctx).toEqual({ sessionId: "sess-1", targetResult: [0, 1, 2] });
  });

  it("derives targetResult from displayReels when targetResult is missing", () => {
    const ctx = resolveSlotBroadcastSpinContext({
      slotMirrorMachineKey: "standard",
      displayReels: ["🍒", "🍒", "🍒"],
      players: [{ lastSpinResult: { spin: 2 } }],
      currentPlayerIdx: 0,
    });
    expect(ctx?.targetResult).toEqual([2, 2, 2]);
    expect(ctx?.sessionId).toBe("catchup-0-2");
  });

  it("returns null when neither targetResult nor displayReels exist", () => {
    expect(
      resolveSlotBroadcastSpinContext({
        slotMirrorMachineKey: "standard",
        players: [{ lastSpinResult: { spin: 1 } }],
        currentPlayerIdx: 0,
      }),
    ).toBeNull();
  });
});

describe("slotBroadcastSpinAnimKey", () => {
  it("keys by current player index and spin number", () => {
    expect(
      slotBroadcastSpinAnimKey({
        currentPlayerIdx: 1,
        players: [{ lastSpinResult: { spin: 0 } }, { lastSpinResult: { spin: 3 } }],
      }),
    ).toBe("1:3");
  });
});
