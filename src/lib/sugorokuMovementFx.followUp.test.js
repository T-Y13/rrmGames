import { describe, expect, it } from "vitest";
import {
  buildMovementFx,
  buildPonVisualPayload,
  buildTaxiTrafficWaitVisualPayload,
  buildTaxiVisualPayload,
  isInstantMovementFx,
  isTaxiDeferredMovementFx,
} from "./sugorokuMovementFx";

describe("movementFx followUp payloads", () => {
  it("embeds taxi visual params for spectators", () => {
    const fx = buildMovementFx({
      playerId: "p1",
      fromPos: 2,
      landedPos: 2,
      finalPos: 2,
      stepDelta: 5,
      diceRolls: [5],
      followUp: "taxi",
      taxiVisual: buildTaxiVisualPayload({
        fromPos: 2,
        newPosFinal: 7,
        landedDice: 7,
        needsTileSlide: false,
        congested: false,
        diceRollStep: 5,
      }),
    });
    expect(fx.followUp).toBe("taxi");
    expect(isTaxiDeferredMovementFx(fx)).toBe(true);
    expect(fx.taxiVisual?.driveEndPos).toBe(7);
  });

  it("embeds pon visual params for spectators", () => {
    const fx = buildMovementFx({
      playerId: "p1",
      fromPos: 4,
      landedPos: 7,
      finalPos: 7,
      stepDelta: 3,
      diceRolls: [6],
      followUp: "pon",
      ponVisual: buildPonVisualPayload({
        characterType: "salaryman",
        stopPos: 7,
        needsTileSlide: false,
      }),
    });
    expect(fx.followUp).toBe("pon");
    expect(fx.ponVisual?.characterType).toBe("salaryman");
  });

  it("marks taxi traffic wait as instant movementFx for spectators", () => {
    const fx = buildMovementFx({
      playerId: "p1",
      fromPos: 5,
      landedPos: 5,
      finalPos: 5,
      stepDelta: 3,
      diceRolls: [],
      followUp: "taxiTrafficWait",
      taxiVisual: buildTaxiTrafficWaitVisualPayload({
        fromPos: 5,
        driveEndPos: 8,
        driveMs: 5200,
        needsTileSlide: false,
      }),
    });
    expect(isInstantMovementFx(fx)).toBe(true);
    expect(isTaxiDeferredMovementFx(fx)).toBe(true);
    expect(fx.taxiVisual?.trafficWaitLeg).toBe(true);
  });
});
