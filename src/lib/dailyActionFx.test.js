import { describe, expect, it } from "vitest";
import {
  attachDailyActionFxForDailyPhase,
  buildDailyActionFx,
  formatDailyActionLabel,
  shouldAttachDailyActionFx,
} from "./dailyActionFx";

describe("dailyActionFx", () => {
  it("builds work label with money", () => {
    const fx = buildDailyActionFx({ playerId: "a", actionType: "work", detail: { money: 120 } });
    expect(fx.label).toBe("💼 +120G");
    expect(fx.playerId).toBe("a");
  });

  it("formats stream failure", () => {
    expect(formatDailyActionLabel("stream", { success: false })).toBe("📺 配信失敗");
  });

  it("skips shrine board label", () => {
    expect(shouldAttachDailyActionFx("shrine")).toBe(false);
    const gs = attachDailyActionFxForDailyPhase(
      { subPhase: "daily", gamePhase: "playing" },
      { playerId: "a", actionType: "shrine" },
    );
    expect(gs.dailyActionFx).toBeUndefined();
  });

  it("clears label when advancing to final battle", () => {
    const gs = attachDailyActionFxForDailyPhase(
      { subPhase: "finalBattle", gamePhase: "finalBattle" },
      { playerId: "a", actionType: "work", detail: { money: 100 } },
    );
    expect(gs.dailyActionFx).toBeUndefined();
  });
});
