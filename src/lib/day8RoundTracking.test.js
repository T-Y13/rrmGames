import { describe, expect, it } from "vitest";
import {
  completeDay8TurnAction,
  shouldMarkDay8TurnComplete,
  applyDay8RoundTracking,
} from "./day8RoundTracking";
import { BAL } from "../constants/gameBalance";

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
