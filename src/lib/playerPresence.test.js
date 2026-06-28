import { describe, expect, it } from "vitest";
import {
  buildClearSelfPresencePatch,
  buildGracefulLeavePatch,
  buildMarkNetworkGhostPatch,
} from "./playerPresence";

const gs = (players) => ({ gamePhase: "playing", players, currentPlayerIdx: 0 });

describe("buildGracefulLeavePatch", () => {
  it("marks active player as ghost and game over", () => {
    const gameState = gs([
      { id: "a", isGhost: false, isGameOver: false },
      { id: "b", isGhost: false, isGameOver: false },
    ]);
    const patch = buildGracefulLeavePatch(gameState, "a");
    expect(patch).toEqual({
      gameState: {
        ...gameState,
        players: [
          { id: "a", isGhost: true, isGameOver: true },
          { id: "b", isGhost: false, isGameOver: false },
        ],
      },
    });
  });

  it("only sets isGameOver when already network ghost", () => {
    const gameState = gs([{ id: "a", isGhost: true, isGameOver: false }]);
    const patch = buildGracefulLeavePatch(gameState, "a");
    expect(patch.gameState.players[0]).toEqual({
      id: "a",
      isGhost: true,
      isGameOver: true,
    });
  });

  it("returns localOnly when already left on server", () => {
    const gameState = gs([{ id: "a", isGhost: true, isGameOver: true }]);
    expect(buildGracefulLeavePatch(gameState, "a")).toEqual({ localOnly: true });
  });
});

describe("buildMarkNetworkGhostPatch", () => {
  const freshPlayers = { a: { updatedAt: { toMillis: () => Date.now() } } };
  const stalePlayers = { a: { updatedAt: { toMillis: () => Date.now() - 120_000 } } };

  it("marks stale players as network ghost", () => {
    const gameState = gs([{ id: "a", isGhost: false, isGameOver: false }]);
    const patch = buildMarkNetworkGhostPatch(gameState, stalePlayers);
    expect(patch?.gameState.players[0].isGhost).toBe(true);
  });

  it("clears network ghost when heartbeat is fresh again", () => {
    const gameState = gs([{ id: "a", isGhost: true, isGameOver: false }]);
    const patch = buildMarkNetworkGhostPatch(gameState, freshPlayers);
    expect(patch?.gameState.players[0].isGhost).toBe(false);
  });

  it("does not clear voluntary leave ghost", () => {
    const gameState = gs([{ id: "a", isGhost: true, isGameOver: true }]);
    expect(buildMarkNetworkGhostPatch(gameState, freshPlayers)).toBeNull();
  });
});

describe("buildClearSelfPresencePatch", () => {
  it("clears network ghost but not voluntary leave", () => {
    const ghostOnly = gs([{ id: "a", isGhost: true, isGameOver: false }]);
    expect(buildClearSelfPresencePatch(ghostOnly, "a")).toEqual({
      gameState: {
        ...ghostOnly,
        players: [{ id: "a", isGhost: false, isGameOver: false }],
      },
    });

    const left = gs([{ id: "a", isGhost: true, isGameOver: true }]);
    expect(buildClearSelfPresencePatch(left, "a")).toBeNull();
  });
});
