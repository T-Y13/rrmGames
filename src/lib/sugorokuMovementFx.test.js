import { describe, expect, it } from "vitest";
import {
  MOVEMENT_FX_ORPHAN_MIN_AGE_MS,
  buildOrphanedMovementFxPatch,
} from "./sugorokuMovementFx";

describe("buildOrphanedMovementFxPatch", () => {
  const baseGs = {
    currentPlayerIdx: 0,
    players: [
      {
        id: "p1",
        position: 3,
        movePhase: "moving",
      },
    ],
    movementFx: {
      id: Date.now(),
      playerId: "p1",
      fromPos: 3,
      landedPos: 9,
      finalPos: 9,
      stepDelta: 6,
      diceRolls: [6],
    },
  };

  it("does not snap position while movementFx is still fresh (live animation)", () => {
    expect(buildOrphanedMovementFxPatch(baseGs)).toBeNull();
  });

  it("snaps stale movementFx when mover is still at fromPos", () => {
    const stale = {
      ...baseGs,
      movementFx: {
        ...baseGs.movementFx,
        id: Date.now() - MOVEMENT_FX_ORPHAN_MIN_AGE_MS - 1000,
      },
    };
    const patch = buildOrphanedMovementFxPatch(stale);
    expect(patch?.gameState?.movementFx).toBeNull();
    expect(patch?.gameState?.players?.[0]?.position).toBe(9);
  });

  it("clears movementFx when turn already advanced", () => {
    const advanced = {
      ...baseGs,
      currentPlayerIdx: 1,
      players: [
        { id: "p1", position: 3, movePhase: "moving" },
        { id: "p2", position: 0, movePhase: "moving" },
      ],
      movementFx: {
        ...baseGs.movementFx,
        id: Date.now() - MOVEMENT_FX_ORPHAN_MIN_AGE_MS - 1000,
      },
    };
    const patch = buildOrphanedMovementFxPatch(advanced);
    expect(patch?.gameState?.movementFx).toBeNull();
    expect(patch?.gameState?.players?.[0]?.position).toBe(3);
  });
});
