import { describe, it, expect } from "vitest";
import {
  resolveSlotBroadcastSpinContext,
  resolveSlotBroadcastWinFx,
  isLastSpinResultAuthoritative,
  pickDisplayReelsFromGameState,
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
  it("keys by current player index and spinCount", () => {
    expect(
      slotBroadcastSpinAnimKey({
        currentPlayerIdx: 1,
        players: [
          { spinCount: 2, lastSpinResult: { spin: 0 } },
          { spinCount: 3, lastSpinResult: { spin: 2 } },
        ],
      }),
    ).toBe("1:3");
  });
});

describe("resolveSlotBroadcastWinFx", () => {
  it("uses grossPayout when spinCount matches lastSpinResult.spin", () => {
    const gs = {
      slotPhase: "completed",
      currentPlayerIdx: 0,
      lastPayout: -200,
      displayReels: ["🍒", "🍒", "🍒"],
      players: [
        {
          spinCount: 2,
          lastSpinResult: {
            spin: 2,
            tier: "small",
            net: -200,
            payout: 800,
            grossPayout: 800,
            visualReels: ["🍒", "🍒", "🍒"],
          },
        },
      ],
    };
    expect(resolveSlotBroadcastWinFx(gs)).toEqual({
      tier: "small",
      settledNet: -200,
      payout: 800,
      potPayout: 0,
    });
  });

  it("rejects stale lastSpinResult from previous spin (big payout vs cherry reels)", () => {
    const gs = {
      slotPhase: "completed",
      currentPlayerIdx: 0,
      lastPayout: -200,
      displayReels: ["🍒", "🍒", "🍒"],
      players: [
        {
          spinCount: 3,
          lastSpinResult: {
            spin: 2,
            tier: "big",
            net: 9000,
            payout: 10000,
            grossPayout: 10000,
            visualReels: ["BAR", "BAR", "BAR"],
          },
        },
      ],
    };
    expect(isLastSpinResultAuthoritative(gs.players[0], gs.players[0].lastSpinResult, gs)).toBe(false);
    expect(resolveSlotBroadcastWinFx(gs)).toBeNull();
  });

  it("resolveSlotBroadcastWinFx returns miss tier for gase reach", () => {
    const gs = {
      slotPhase: "completed",
      currentPlayerIdx: 0,
      lastPayout: -1000,
      displayReels: ["BAR", "BAR", "🍒"],
      players: [
        {
          spinCount: 4,
          lastSpinResult: {
            spin: 4,
            tier: "miss",
            net: -1000,
            payout: 0,
            grossPayout: 0,
            visualReels: ["BAR", "BAR", "🍒"],
          },
        },
      ],
    };
    expect(resolveSlotBroadcastWinFx(gs)).toEqual({
      tier: "miss",
      settledNet: -1000,
      payout: 0,
      potPayout: 0,
    });
  });

  it("pickDisplayReelsFromGameState prefers displayReels when completed", () => {
    const gs = {
      slotPhase: "completed",
      displayReels: ["BAR", "BAR", "🍒"],
      slotVisualReels: ["BAR", "BAR", "BAR"],
    };
    expect(pickDisplayReelsFromGameState(gs)).toEqual(["BAR", "BAR", "🍒"]);
  });
});
