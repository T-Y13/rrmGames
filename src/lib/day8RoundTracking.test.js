import { describe, expect, it } from "vitest";
import { BAL } from "../constants/gameBalance";
import { advanceDay8AfterSlotSpinShow, computeAdvanceDay8Turn } from "../utils/gameLogic";
import {
  applyDay8RoundTracking,
  completeDay8TurnAction,
  resolveDay8IsMyTurn,
  shouldMarkDay8TurnComplete,
} from "./day8RoundTracking";

describe("completeDay8TurnAction", () => {
  const baseGs = {
    gamePhase: "playing",
    subPhase: "day8",
    players: [
      { id: "a", alive: true, moveTurns: 0 },
      { id: "b", alive: true, moveTurns: 0 },
    ],
  };

  it("adds player to completedPlayers without decrementing until all done", () => {
    const r = completeDay8TurnAction({
      remainingTurns: BAL.dice.maxTurns,
      completedPlayers: [],
      gameState: baseGs,
      playerId: "a",
    });
    expect(r.completedPlayers).toEqual(["a"]);
    expect(r.remainingTurns).toBe(BAL.dice.maxTurns);
  });

  it("decrements remainingTurns when all alive players completed", () => {
    const r = completeDay8TurnAction({
      remainingTurns: BAL.dice.maxTurns,
      completedPlayers: ["a"],
      gameState: baseGs,
      playerId: "b",
    });
    expect(r.remainingTurns).toBe(BAL.dice.maxTurns - 1);
    expect(r.completedPlayers).toEqual([]);
    expect(r.gameState.players[0].moveTurns).toBe(1);
    expect(r.gameState.players[1].moveTurns).toBe(1);
  });

  it("solo: one completion decrements round", () => {
    const soloGs = {
      gamePhase: "playing",
      subPhase: "day8",
      players: [{ id: "solo", alive: true, moveTurns: 0 }],
    };
    const r = completeDay8TurnAction({
      remainingTurns: 10,
      completedPlayers: [],
      gameState: soloGs,
      playerId: "solo",
    });
    expect(r.remainingTurns).toBe(9);
    expect(r.completedPlayers).toEqual([]);
  });

  it("waits for dead ghost before decrementing round", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      players: [
        { id: "a", alive: true, moveTurns: 0, movePhase: "moving", position: 1 },
        { id: "b", alive: false, movePhase: "spectating", ghostActedThisRound: false, position: 0 },
      ],
    };
    const afterAlive = completeDay8TurnAction({
      remainingTurns: BAL.dice.maxTurns,
      completedPlayers: [],
      gameState: gs,
      playerId: "a",
    });
    expect(afterAlive.remainingTurns).toBe(BAL.dice.maxTurns);
    expect(afterAlive.completedPlayers).toEqual(["a"]);

    const afterDead = completeDay8TurnAction({
      remainingTurns: afterAlive.remainingTurns,
      completedPlayers: afterAlive.completedPlayers,
      gameState: afterAlive.gameState,
      playerId: "b",
    });
    expect(afterDead.remainingTurns).toBe(BAL.dice.maxTurns - 1);
    expect(afterDead.completedPlayers).toEqual([]);
    expect(afterDead.gameState.players[1].ghostActedThisRound).toBe(false);
    expect(afterDead.gameState.players[0].roundHandoffDone).toBe(false);
  });

  it("sets roundHandoffDone when one player completes mid-round", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      players: [
        { id: "a", alive: true, moveTurns: 0, movePhase: "moving", position: 1 },
        { id: "b", alive: true, moveTurns: 0, movePhase: "moving", position: 2 },
      ],
    };
    const r = completeDay8TurnAction({
      remainingTurns: BAL.dice.maxTurns,
      completedPlayers: [],
      gameState: gs,
      playerId: "a",
    });
    expect(r.completedPlayers).toEqual(["a"]);
    expect(r.remainingTurns).toBe(BAL.dice.maxTurns);
    expect(r.gameState.players[0].roundHandoffDone).toBe(true);
    expect(r.gameState.players[1].roundHandoffDone).toBeFalsy();
  });
});

describe("applyDay8RoundTracking dead player handoff", () => {
  it("full round with dead ghost decrements remainingTurns after ghost completes", () => {
    const players = [
      { id: "a", alive: true, moveTurns: 0, movePhase: "moving", position: 1 },
      { id: "b", alive: false, movePhase: "spectating", ghostActedThisRound: false, position: 0 },
    ];
    const room = {
      remainingTurns: BAL.dice.maxTurns,
      completedPlayers: ["a"],
      gameState: {
        gamePhase: "playing",
        subPhase: "day8",
        currentPlayerIdx: 1,
        players: [
          { ...players[0], roundHandoffDone: true },
          { ...players[1], movePhase: "ghostPickTarget" },
        ],
        log: [],
      },
    };
    const afterGhost = {
      ...room.gameState,
      players: [
        { ...room.gameState.players[0] },
        {
          ...room.gameState.players[1],
          movePhase: "spectating",
          ghostActedThisRound: true,
          slotTurnsLeft: 0,
        },
      ],
    };
    const tracked = applyDay8RoundTracking(room, afterGhost, { markTurnCompleteFor: "b" });
    expect(tracked.remainingTurns).toBe(BAL.dice.maxTurns - 1);
    expect(tracked.completedPlayers).toEqual([]);
    expect(tracked.gameState.players[1].ghostActedThisRound).toBe(false);
  });

  it("skip ghost marks dead complete so round can finish", () => {
    const players = [
      {
        id: "a",
        name: "A",
        alive: true,
        movePhase: "waitingSlot",
        moveTurns: 12,
        position: 20,
        reservedSlotTurns: 2,
        stats: { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 },
        roundHandoffDone: true,
      },
      {
        id: "b",
        name: "B",
        alive: false,
        movePhase: "spectating",
        ghostActedThisRound: true,
        position: 0,
        stats: { money: 0, pon: 0, luck: 50, skill: 50, virtue: 50 },
      },
    ];
    const room = {
      remainingTurns: 10,
      completedPlayers: ["a"],
      gameState: {
        gamePhase: "playing",
        subPhase: "day8",
        currentPlayerIdx: 0,
        players,
        log: [],
      },
    };
    const tracked = applyDay8RoundTracking(room, room.gameState, { markTurnCompleteFor: "b" });
    expect(tracked.remainingTurns).toBe(9);
    expect(tracked.completedPlayers).toEqual([]);
  });

  it("after proxy slot mark, handoff leaves eliminated player when others pending", () => {
    const stats = { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 };
    const prevGs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      proxySlotTargetIdx: 0,
      log: [],
      players: [
        {
          id: "a",
          name: "A",
          alive: true,
          movePhase: "moving",
          moveTurns: 1,
          position: 5,
          roundHandoffDone: true,
          stats,
          slotPullsThisSeat: 0,
        },
        {
          id: "b",
          name: "B",
          alive: false,
          movePhase: "arrived",
          slotTurnsLeft: 0,
          slotPullsThisSeat: 3,
          ghostActedThisRound: false,
          stats,
        },
        {
          id: "c",
          name: "C",
          alive: true,
          movePhase: "moving",
          moveTurns: 1,
          position: 8,
          stats,
          slotPullsThisSeat: 0,
        },
      ],
    };
    const room = {
      remainingTurns: 10,
      completedPlayers: ["a"],
      gameState: prevGs,
    };
    const advanced = advanceDay8AfterSlotSpinShow(prevGs);
    expect(advanced.currentPlayerIdx).toBe(2);

    const tracked = applyDay8RoundTracking(room, advanced, { markTurnCompleteFor: "b" });
    expect(tracked.gameState.currentPlayerIdx).toBe(2);
    expect(tracked.completedPlayers).toEqual(["a", "b"]);
    expect(tracked.gameState.players[1].ghostActedThisRound).toBe(true);
  });

  it("does not finalize day8 when eliminated proxy slot completes the round", () => {
    const stats = { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 };
    const prevGs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      proxySlotTargetIdx: 0,
      log: [],
      players: [
        {
          id: "a",
          name: "A",
          alive: true,
          movePhase: "moving",
          moveTurns: 1,
          position: 5,
          roundHandoffDone: true,
          stats,
          slotPullsThisSeat: 0,
        },
        {
          id: "b",
          name: "B",
          alive: false,
          movePhase: "arrived",
          slotTurnsLeft: 0,
          slotPullsThisSeat: 3,
          ghostActedThisRound: false,
          stats,
        },
        {
          id: "c",
          name: "C",
          alive: true,
          movePhase: "moving",
          moveTurns: 1,
          position: 8,
          roundHandoffDone: true,
          stats,
          slotPullsThisSeat: 0,
        },
      ],
    };
    const room = {
      remainingTurns: 5,
      completedPlayers: ["a", "c"],
      gameState: prevGs,
    };
    const advanced = advanceDay8AfterSlotSpinShow(prevGs);
    expect(advanced.gamePhase).toBe("playing");

    const tracked = applyDay8RoundTracking(room, advanced, { markTurnCompleteFor: "b" });
    expect(tracked.gameState.gamePhase).toBe("playing");
    expect(tracked.remainingTurns).toBe(4);
    expect(tracked.completedPlayers).toEqual([]);
    expect(tracked.gameState.currentPlayerIdx).not.toBe(1);
  });

  it("3-player move: marking mover advances to next player (not same player T2)", () => {
    const stats = { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 };
    const players = [
      { id: "a", name: "A", alive: true, movePhase: "moving", moveTurns: 0, position: 0, stats },
      { id: "b", name: "B", alive: true, movePhase: "moving", moveTurns: 0, position: 0, stats },
      { id: "c", name: "C", alive: true, movePhase: "moving", moveTurns: 0, position: 0, stats },
    ];
    const room = {
      remainingTurns: BAL.dice.maxTurns,
      completedPlayers: [],
      gameState: {
        gamePhase: "playing",
        subPhase: "day8",
        currentPlayerIdx: 0,
        log: [],
        players,
      },
    };
    const movedPlayers = players.map((pl, i) =>
      i === 0 ? { ...pl, moveTurns: 1, position: 4 } : pl,
    );
    const advanced = computeAdvanceDay8Turn(room.gameState, movedPlayers, ["A T1: dice"]);
    expect(advanced.currentPlayerIdx).toBe(1);
    const tracked = applyDay8RoundTracking(room, advanced, { markTurnCompleteFor: "a" });
    expect(tracked.gameState.currentPlayerIdx).toBe(1);
    expect(tracked.completedPlayers).toEqual(["a"]);
    expect(tracked.gameState.players[0].roundHandoffDone).toBe(true);
    expect(tracked.gameState.log[0]).toContain("B");
    expect(tracked.gameState.log[0]).not.toContain("T2");
  });

  it("does not skip-advance again when payload already rotated to next player", () => {
    const stats = { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 };
    const players = [
      {
        id: "a",
        name: "A",
        alive: true,
        movePhase: "moving",
        moveTurns: 1,
        position: 3,
        stats,
        roundHandoffDone: true,
      },
      {
        id: "b",
        name: "B",
        alive: true,
        movePhase: "moving",
        moveTurns: 1,
        position: 11,
        stats,
        roundHandoffDone: true,
      },
      {
        id: "c",
        name: "C",
        alive: true,
        movePhase: "moving",
        moveTurns: 0,
        position: 0,
        stats,
      },
    ];
    const room = {
      remainingTurns: BAL.dice.maxTurns,
      completedPlayers: ["a", "b"],
      gameState: {
        gamePhase: "playing",
        subPhase: "day8",
        currentPlayerIdx: 2,
        log: [],
        players,
      },
    };
    const movedC = players.map((pl, i) =>
      i === 2 ? { ...pl, moveTurns: 1, position: 12 } : pl,
    );
    const advanced = computeAdvanceDay8Turn(room.gameState, movedC, ["C taxi"]);
    expect(advanced.currentPlayerIdx).toBe(0);

    const tracked = applyDay8RoundTracking(room, advanced, { markTurnCompleteFor: "c" });
    expect(tracked.gameState.currentPlayerIdx).toBe(0);
    expect(tracked.completedPlayers).toEqual([]);
    const newestLog = tracked.gameState.log[0] ?? "";
    expect(newestLog).toContain("A");
    expect(newestLog).toContain("T2");
    expect(newestLog).not.toMatch(/\bC.*T2/);
  });
});

describe("applyDay8RoundTracking explicit mark", () => {
  it("only marks when markTurnCompleteFor is set", () => {
    const room = {
      remainingTurns: 15,
      completedPlayers: [],
      gameState: {
        gamePhase: "playing",
        subPhase: "day8",
        currentPlayerIdx: 0,
        players: [
          { id: "a", alive: true, moveTurns: 0, movePhase: "moving" },
          { id: "b", alive: true, moveTurns: 0, movePhase: "moving" },
        ],
      },
    };
    const nextGs = { ...room.gameState, lastDiceRolls: [3] };
    const noMark = applyDay8RoundTracking(room, nextGs, {});
    expect(noMark.remainingTurns).toBe(15);
    expect(noMark.completedPlayers).toEqual([]);

    const marked = applyDay8RoundTracking(room, nextGs, { markTurnCompleteFor: "a" });
    expect(marked.completedPlayers).toEqual(["a"]);
    expect(marked.remainingTurns).toBe(15);
  });

  it("solo: remainingTurns 0 after last round finalizes to results when still moving", () => {
    const room = {
      remainingTurns: 1,
      completedPlayers: [],
      gameState: {
        gamePhase: "playing",
        subPhase: "day8",
        currentPlayerIdx: 0,
        log: [],
        players: [
          {
            id: "solo",
            name: "Solo",
            alive: true,
            moveTurns: 14,
            movePhase: "moving",
            stats: { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 },
            slotTurnsLeft: 0,
            reservedSlotTurns: 0,
            slotPullsThisSeat: 0,
          },
        ],
      },
    };
    const nextGs = {
      ...room.gameState,
      players: [{ ...room.gameState.players[0], moveTurns: 15 }],
    };
    const tracked = applyDay8RoundTracking(room, nextGs, { markTurnCompleteFor: "solo" });
    expect(tracked.remainingTurns).toBe(0);
    expect(tracked.gameState.gamePhase).toBe("results");
    expect(tracked.gameState.players[0].movePhase).toBe("missed");
  });

  it("marks turn complete even when next gameState is already results", () => {
    const room = {
      remainingTurns: 1,
      completedPlayers: [],
      gameState: {
        gamePhase: "playing",
        subPhase: "day8",
        currentPlayerIdx: 0,
        log: [],
        players: [
          {
            id: "solo",
            name: "Solo",
            alive: true,
            moveTurns: 15,
            movePhase: "missed",
            stats: { money: 1000 },
          },
        ],
      },
    };
    const nextGs = {
      ...room.gameState,
      gamePhase: "results",
      subPhase: "daily",
      players: room.gameState.players,
    };
    const tracked = applyDay8RoundTracking(room, nextGs, { markTurnCompleteFor: "solo" });
    expect(tracked.remainingTurns).toBe(0);
    expect(tracked.gameState.gamePhase).toBe("results");
  });
});

describe("shouldMarkDay8TurnComplete", () => {
  const mk = (overrides) => ({
    gamePhase: "playing",
    subPhase: "day8",
    currentPlayerIdx: 0,
    players: [{ id: "a", alive: true, moveTurns: 0, movePhase: "moving", slotPullsThisSeat: 0 }],
    ...overrides,
  });

  it("true when hand advances to next player", () => {
    const prev = mk({});
    const next = mk({ currentPlayerIdx: 1, players: [{ id: "a" }, { id: "b", movePhase: "moving" }] });
    expect(shouldMarkDay8TurnComplete(prev, next)).toBe(true);
  });

  it("true when solo moveTurns increases", () => {
    const prev = mk({});
    const next = mk({
      players: [{ id: "a", alive: true, moveTurns: 1, movePhase: "moving", slotPullsThisSeat: 0 }],
    });
    expect(shouldMarkDay8TurnComplete(prev, next)).toBe(true);
  });

  it("false for slot burst continuation", () => {
    const prev = mk({
      players: [
        {
          id: "a",
          alive: true,
          moveTurns: 1,
          movePhase: "arrived",
          slotTurnsLeft: 6,
          slotPullsThisSeat: 1,
        },
      ],
    });
    const next = mk({
      players: [
        {
          id: "a",
          alive: true,
          moveTurns: 1,
          movePhase: "arrived",
          slotTurnsLeft: 5,
          slotPullsThisSeat: 2,
        },
      ],
    });
    expect(shouldMarkDay8TurnComplete(prev, next)).toBe(false);
  });
});

describe("resolveDay8IsMyTurn", () => {
  it("keeps operator turn during slot even if round marked complete", () => {
    expect(
      resolveDay8IsMyTurn({
        rawIsMyTurn: true,
        isMyDay8RoundCompleted: true,
        cpIsSlot: true,
      }),
    ).toBe(true);
  });

  it("keeps operator turn while waiting to begin slot", () => {
    expect(
      resolveDay8IsMyTurn({
        rawIsMyTurn: true,
        isMyDay8RoundCompleted: true,
        cpIsWaitingSlot: true,
      }),
    ).toBe(true);
  });

  it("allows move turn when round marked complete but player is current mover", () => {
    expect(
      resolveDay8IsMyTurn({
        rawIsMyTurn: true,
        isMyDay8RoundCompleted: true,
        cpIsMoving: true,
      }),
    ).toBe(true);
  });

  it("blocks turn when round complete and not in an actionable phase", () => {
    expect(
      resolveDay8IsMyTurn({
        rawIsMyTurn: true,
        isMyDay8RoundCompleted: true,
        cpIsSlot: false,
        cpIsWaitingSlot: false,
        cpIsGhostPick: false,
        cpIsMoving: false,
      }),
    ).toBe(false);
  });
});
