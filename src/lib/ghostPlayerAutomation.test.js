import { describe, expect, it } from "vitest";
import { runGhostAutomationStep, resolveGhostSlotSpinBlocked } from "./ghostPlayerAutomation";

describe("runGhostAutomationStep eliminated disconnect", () => {
  const stalePlayers = { dead: { updatedAt: { toMillis: () => Date.now() - 120_000 } } };

  it("picks proxy target for stale eliminated player at ghostPickTarget", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      players: [
        {
          id: "alive",
          name: "A",
          alive: true,
          movePhase: "moving",
          moveTurns: 3,
          position: 5,
          stats: { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
        {
          id: "dead",
          name: "B",
          alive: false,
          movePhase: "ghostPickTarget",
          ghostActedThisRound: false,
          stats: { money: 0, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
      ],
      log: [],
    };
    const next = runGhostAutomationStep(gs, { roomPlayers: stalePlayers });
    expect(next?.players[1].movePhase).toBe("arrived");
    expect(next?.proxySlotTargetIdx).toBe(0);
  });

  it("advances turn when ghost slot burst finished but slotPhase is completed", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      slotPhase: "completed",
      proxySlotTargetIdx: 0,
      players: [
        {
          id: "alive",
          name: "A",
          alive: true,
          movePhase: "moving",
          moveTurns: 1,
          position: 5,
          stats: { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
        {
          id: "dead",
          name: "B",
          alive: false,
          movePhase: "arrived",
          slotTurnsLeft: 0,
          slotPullsThisSeat: 3,
          isGhost: true,
          stats: { money: 0, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
      ],
      log: [],
    };
    const stalePlayers = { dead: { updatedAt: { toMillis: () => Date.now() - 120_000 } } };
    const next = runGhostAutomationStep(gs, { roomPlayers: stalePlayers });
    expect(next?.currentPlayerIdx).toBe(0);
    expect(next?.players[1].movePhase).toBe("spectating");
    expect(next?.players[1].ghostActedThisRound).toBe(true);
  });

  it("skips ghost pick when no pickable proxy target on board", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      players: [
        {
          id: "alive",
          name: "A",
          alive: true,
          movePhase: "moving",
          moveTurns: 3,
          position: 5,
          stats: { money: 100, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
        {
          id: "dead",
          name: "B",
          alive: false,
          movePhase: "ghostPickTarget",
          ghostActedThisRound: false,
          stats: { money: 0, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
      ],
      log: [],
    };
    const next = runGhostAutomationStep(gs, { roomPlayers: stalePlayers });
    expect(next?.currentPlayerIdx).toBe(0);
    expect(next?.players[1].movePhase).toBe("spectating");
  });

  it("resolveGhostSlotSpinBlocked advances when proxy broke and actor broke", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      slotPhase: "idle",
      proxySlotTargetIdx: 0,
      players: [
        {
          id: "alive",
          name: "A",
          alive: true,
          movePhase: "moving",
          position: 5,
          stats: { money: 50, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
        {
          id: "dead",
          name: "B",
          alive: false,
          movePhase: "arrived",
          slotTurnsLeft: 3,
          slotPullsThisSeat: 0,
          stats: { money: 0, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
      ],
      log: [],
    };
    const blocked = resolveGhostSlotSpinBlocked(gs);
    expect(blocked?.type).toBe("reassign");
    expect(blocked?.gameState?.proxySlotTargetIdx).toBeNull();
  });
});
