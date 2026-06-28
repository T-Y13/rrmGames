import { describe, expect, it } from "vitest";
import { computeDay7TransitionFxHoldMs } from "./day7TransitionFx.js";

describe("computeDay7TransitionFxHoldMs", () => {
  it("配信: カットインのみ", () => {
    expect(computeDay7TransitionFxHoldMs("stream")).toBe(2000);
  });

  it("配信: PON + 失敗", () => {
    expect(
      computeDay7TransitionFxHoldMs("stream", {
        deferStreamPonOverlay: true,
        streamRollFailed: true,
      }),
    ).toBe(2000 + 3300 + 3200);
  });

  it("仕事: PON発火", () => {
    expect(computeDay7TransitionFxHoldMs("work", { deferWorkPonOverlay: true })).toBe(5100);
  });

  it("神社", () => {
    expect(computeDay7TransitionFxHoldMs("shrine")).toBe(2700);
  });
});
