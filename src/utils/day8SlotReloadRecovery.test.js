import { describe, it, expect } from "vitest";
import {
  buildDay8SlotReloadRecoveryPatch,
  advanceDay8AfterSlotSpinShow,
  isDay8SlotBurstFinishedOnGameState,
  resolveDay8SlotBurstAdvance,
  mergeDay8SlotIdleSync,
  isPlaceholderDisplayReels,
  defaultIdleDisplayReels,
  pickDisplayReelsFromGameState,
  stripTripleForMiddleColumn,
  buildColumnReelStrips,
  shouldDeferDay8SlotTurnAdvanceForMajorWin,
  day8SlotMajorWinCelebrationHoldMs,
} from "./gameLogic.js";
import { SLOT_MACHINES } from "../constants/gameBalance.js";

function slotGs(overrides = {}) {
  return {
    gamePhase: "playing",
    subPhase: "day8",
    currentPlayerIdx: 0,
    slotPhase: "idle",
    players: [
      {
        id: "a",
        name: "A",
        movePhase: "arrived",
        slotTurnsLeft: 3,
        slotPullsThisSeat: 0,
        stats: { money: 1000 },
      },
      {
        id: "b",
        name: "B",
        movePhase: "moving",
        slotTurnsLeft: 0,
        slotPullsThisSeat: 0,
        stats: { money: 1000 },
        position: 0,
        moveTurns: 0,
        alive: true,
      },
    ],
    ...overrides,
  };
}

describe("buildDay8SlotReloadRecoveryPatch", () => {
  it("resets abandoned spinning state", () => {
    const gs = slotGs({ slotPhase: "spinning", slotSpinSessionId: "s1" });
    const patch = buildDay8SlotReloadRecoveryPatch(gs);
    expect(patch?.kind).toBe("resetSync");
    expect(patch?.gs.slotPhase).toBe("idle");
    expect(patch?.gs.slotSpinSessionId).toBeNull();
  });

  it("advances when burst is done but slotPhase stayed completed", () => {
    const gs = slotGs({
      slotPhase: "completed",
      slotResultSettledAt: 123,
      players: [
        {
          id: "a",
          name: "A",
          movePhase: "arrived",
          slotTurnsLeft: 2,
          slotPullsThisSeat: 3,
          stats: { money: 1000 },
        },
        {
          id: "b",
          name: "B",
          movePhase: "moving",
          slotTurnsLeft: 0,
          slotPullsThisSeat: 0,
          stats: { money: 1000 },
          position: 0,
          moveTurns: 0,
          alive: true,
        },
      ],
    });
    const patch = buildDay8SlotReloadRecoveryPatch(gs);
    expect(patch?.kind).toBe("advanceTurn");
    expect(patch?.gs.currentPlayerIdx).toBe(1);
  });

  it("resets completed state when burst can continue", () => {
    const gs = slotGs({
      slotPhase: "completed",
      players: [
        {
          id: "a",
          name: "A",
          movePhase: "arrived",
          slotTurnsLeft: 2,
          slotPullsThisSeat: 1,
          stats: { money: 1000 },
        },
      ],
    });
    const patch = buildDay8SlotReloadRecoveryPatch(gs);
    expect(patch?.kind).toBe("resetSync");
    expect(patch?.gs.slotPhase).toBe("idle");
  });

  it("mergeDay8SlotIdleSync preserves decremented pull counts", () => {
    const live = slotGs({
      slotPhase: "completed",
      slotResultSettledAt: 999,
      displayReels: ["🍒", "⭐", "🔔"],
      players: [
        {
          id: "a",
          name: "A",
          movePhase: "arrived",
          slotTurnsLeft: 2,
          slotPullsThisSeat: 1,
          stats: { money: 1000 },
        },
      ],
    });
    const merged = mergeDay8SlotIdleSync(live);
    expect(merged.slotPhase).toBe("idle");
    expect(merged.slotResultSettledAt).toBeNull();
    expect(merged.players[0].slotTurnsLeft).toBe(2);
    expect(merged.players[0].slotPullsThisSeat).toBe(1);
    expect(merged.displayReels).toEqual(["🍒", "⭐", "🔔"]);
  });

  it("mergeDay8SlotIdleSync prefers fresh spin reels when live Firestore is stale", () => {
    const live = slotGs({
      slotPhase: "spinning",
      displayReels: ["?", "?", "?"],
      players: [
        {
          id: "a",
          name: "A",
          movePhase: "arrived",
          slotTurnsLeft: 2,
          slotPullsThisSeat: 1,
          stats: { money: 900 },
        },
      ],
    });
    const prefer = {
      ...live,
      slotPhase: "completed",
      displayReels: ["🍒", "⭐", "🔔"],
      slotVisualReels: ["🍒", "⭐", "🔔"],
    };
    const merged = mergeDay8SlotIdleSync(live, prefer);
    expect(merged.slotPhase).toBe("idle");
    expect(merged.displayReels).toEqual(["🍒", "⭐", "🔔"]);
  });

  it("pickDisplayReelsFromGameState falls back to slotVisualReels and lastSpinResult.visualReels", () => {
    expect(
      pickDisplayReelsFromGameState({
        currentPlayerIdx: 0,
        slotVisualReels: ["🔔", "🔔", "🍒"],
        players: [{ id: "a", lastSpinResult: null }],
      }),
    ).toEqual(["🔔", "🔔", "🍒"]);
    expect(
      pickDisplayReelsFromGameState({
        currentPlayerIdx: 0,
        displayReels: ["?", "?", "?"],
        players: [
          {
            id: "a",
            lastSpinResult: { visualReels: ["BAR", "BAR", "⭐"], reels: ["7", "7", "7"] },
          },
        ],
      }),
    ).toEqual(["BAR", "BAR", "⭐"]);
  });

  it("defers advanceTurn while major-win celebration is in progress", () => {
    const gs = slotGs({
      slotPhase: "completed",
      slotResultSettledAt: Date.now() - 500,
      players: [
        {
          id: "a",
          name: "A",
          movePhase: "arrived",
          slotTurnsLeft: 0,
          slotPullsThisSeat: 3,
          stats: { money: 1000 },
          lastSpinResult: { tier: "potJackpot", spin: 3 },
        },
      ],
    });
    const patch = buildDay8SlotReloadRecoveryPatch(gs);
    expect(patch?.kind).toBe("deferAdvance");
    expect(patch?.retryAfterMs).toBeGreaterThan(0);
    expect(shouldDeferDay8SlotTurnAdvanceForMajorWin(gs)).toBe(true);
  });

  it("allows advanceTurn after major-win celebration hold elapsed", () => {
    const settledAt = Date.now() - day8SlotMajorWinCelebrationHoldMs() - 100;
    const gs = slotGs({
      slotPhase: "completed",
      slotResultSettledAt: settledAt,
      players: [
        {
          id: "a",
          name: "A",
          movePhase: "arrived",
          slotTurnsLeft: 0,
          slotPullsThisSeat: 3,
          stats: { money: 1000 },
          lastSpinResult: { tier: "jackpot", spin: 3 },
        },
      ],
    });
    expect(shouldDeferDay8SlotTurnAdvanceForMajorWin(gs)).toBe(false);
    const patch = buildDay8SlotReloadRecoveryPatch(gs);
    expect(patch?.kind).toBe("advanceTurn");
  });

  it("matches advanceDay8AfterSlotSpinShow for completed burst end", () => {
    const gs = slotGs({
      slotPhase: "completed",
      players: [
        {
          id: "a",
          name: "A",
          movePhase: "arrived",
          slotTurnsLeft: 0,
          slotPullsThisSeat: 3,
          stats: { money: 1000 },
        },
        {
          id: "b",
          name: "B",
          movePhase: "moving",
          slotTurnsLeft: 0,
          slotPullsThisSeat: 0,
          stats: { money: 1000 },
          position: 0,
          moveTurns: 0,
          alive: true,
        },
      ],
    });
    const patch = buildDay8SlotReloadRecoveryPatch(gs);
    expect(patch?.gs.currentPlayerIdx).toBe(advanceDay8AfterSlotSpinShow(gs).currentPlayerIdx);
  });

  it("resolveDay8SlotBurstAdvance advances eliminated proxy slot", () => {
    const stats = { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 };
    const gs = slotGs({
      slotPhase: "idle",
      proxySlotTargetIdx: 1,
      players: [
        {
          id: "ghost",
          name: "Ghost",
          alive: false,
          movePhase: "arrived",
          slotTurnsLeft: 0,
          slotPullsThisSeat: 3,
          ghostActedThisRound: false,
          stats,
        },
        {
          id: "b",
          name: "B",
          alive: true,
          movePhase: "moving",
          slotTurnsLeft: 0,
          slotPullsThisSeat: 0,
          stats,
          position: 5,
          moveTurns: 1,
        },
      ],
    });
    expect(isDay8SlotBurstFinishedOnGameState(gs)).toBe(true);
    const advanced = resolveDay8SlotBurstAdvance(gs);
    expect(advanced?.currentPlayerIdx).toBe(1);
    expect(advanced?.players[0].ghostActedThisRound).toBe(true);
    expect(advanced?.players[0].movePhase).toBe("spectating");
  });
});

describe("idle display reels", () => {
  it("detects placeholder reels", () => {
    expect(isPlaceholderDisplayReels(["?", "?", "?"])).toBe(true);
    expect(isPlaceholderDisplayReels(["7", "7", "7"])).toBe(false);
  });

  it("defaultIdleDisplayReels avoids triple match", () => {
    const mids = defaultIdleDisplayReels("standard", false);
    expect(mids).toHaveLength(3);
    expect(mids.every((s) => typeof s === "string" && s !== "?")).toBe(true);
    expect(mids[0] === mids[1] && mids[1] === mids[2]).toBe(false);
  });

  it("stripTripleForMiddleColumn does not map ? to 7", () => {
    const machine = SLOT_MACHINES.standard;
    const strip = stripTripleForMiddleColumn("?", machine, 0);
    expect(strip).toHaveLength(3);
    expect(strip.every((s) => s !== "?")).toBe(true);
  });

  it("buildColumnReelStrips shuffles symbol order per column", () => {
    const machine = { symbols: ["7", "BAR", "🍒", "⭐", "🔔"] };
    const strips = buildColumnReelStrips(machine, 3);
    expect(strips).toHaveLength(3);
    const sortedBase = machine.symbols.slice().sort().join(",");
    strips.forEach((strip) => {
      expect(strip.slice().sort().join(",")).toBe(sortedBase);
    });
    expect(strips[0].join()).not.toBe(strips[1].join());
    expect(strips[1].join()).not.toBe(strips[2].join());
  });
});
