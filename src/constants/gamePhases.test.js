import { describe, expect, it } from "vitest";
import {
  GAME_PHASE,
  MOVE_PHASE,
  SUB_PHASE,
  isDailySubPhase,
  isDay8SubPhase,
  isFinalBattlePhase,
  isPlayingPhase,
} from "./gamePhases";

describe("gamePhases helpers", () => {
  it("detects playing daily", () => {
    const gs = { gamePhase: GAME_PHASE.playing, subPhase: SUB_PHASE.daily };
    expect(isPlayingPhase(gs)).toBe(true);
    expect(isDailySubPhase(gs)).toBe(true);
    expect(isDay8SubPhase(gs)).toBe(false);
  });

  it("detects day8 sub phase", () => {
    const gs = { gamePhase: GAME_PHASE.playing, subPhase: SUB_PHASE.day8 };
    expect(isDay8SubPhase(gs)).toBe(true);
  });

  it("detects final battle", () => {
    expect(isFinalBattlePhase({ gamePhase: GAME_PHASE.finalBattle })).toBe(true);
    expect(isFinalBattlePhase({ subPhase: SUB_PHASE.finalBattle })).toBe(true);
  });
});

describe("phase constants", () => {
  it("exports move phases used in day8", () => {
    expect(MOVE_PHASE.moving).toBe("moving");
    expect(MOVE_PHASE.ghostPickTarget).toBe("ghostPickTarget");
  });
});
