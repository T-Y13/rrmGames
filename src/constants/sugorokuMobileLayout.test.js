import { describe, expect, it } from "vitest";
import { resolveSugorokuTravelStepsRemaining } from "../constants/sugorokuMobileLayout";

describe("resolveSugorokuTravelStepsRemaining", () => {
  it("counts down during taxi drive segment using smoothPos", () => {
    expect(
      resolveSugorokuTravelStepsRemaining({
        taxiPhase: "drive",
        taxiDriveEndPos: 12,
        taxiJamMidPos: null,
        smoothPos: 8.2,
        viewPos: 5,
        traveling: true,
        remainingSteps: 7,
      }),
    ).toBe(4);
  });

  it("uses jam midpoint for driveBeforeJam", () => {
    expect(
      resolveSugorokuTravelStepsRemaining({
        taxiPhase: "driveBeforeJam",
        taxiDriveEndPos: 12,
        taxiJamMidPos: 9,
        smoothPos: 7.1,
        viewPos: 5,
        traveling: true,
        remainingSteps: 7,
      }),
    ).toBe(2);
  });

  it("falls back to normal hop remaining when not in taxi", () => {
    expect(
      resolveSugorokuTravelStepsRemaining({
        taxiPhase: null,
        taxiDriveEndPos: null,
        taxiJamMidPos: null,
        smoothPos: 3.2,
        viewPos: 6,
        traveling: true,
        remainingSteps: 3,
      }),
    ).toBe(3);
  });

  it("returns null during taxi non-drive phases", () => {
    expect(
      resolveSugorokuTravelStepsRemaining({
        taxiPhase: "boarding",
        taxiDriveEndPos: 12,
        taxiJamMidPos: null,
        smoothPos: 5,
        viewPos: 5,
        traveling: false,
        remainingSteps: 0,
      }),
    ).toBeNull();
  });
});
