/** ゲーム全体フェーズ（gameState.gamePhase） */
export const GAME_PHASE = Object.freeze({
  playing: "playing",
  finalBattle: "finalBattle",
  results: "results",
  gameOver: "gameOver",
});

/** サブフェーズ（gameState.subPhase） */
export const SUB_PHASE = Object.freeze({
  daily: "daily",
  day8: "day8",
  finalBattle: "finalBattle",
});

/** 8日目プレイヤー移動フェーズ（player.movePhase） */
export const MOVE_PHASE = Object.freeze({
  moving: "moving",
  arrived: "arrived",
  waitingSlot: "waitingSlot",
  goalLanding: "goalLanding",
  missed: "missed",
  spectating: "spectating",
  ghostPickTarget: "ghostPickTarget",
});

export function isPlayingPhase(gs) {
  return gs?.gamePhase === GAME_PHASE.playing;
}

export function isDailySubPhase(gs) {
  return gs?.subPhase === SUB_PHASE.daily;
}

export function isDay8SubPhase(gs) {
  return gs?.subPhase === SUB_PHASE.day8;
}

export function isFinalBattlePhase(gs) {
  return gs?.gamePhase === GAME_PHASE.finalBattle || gs?.subPhase === SUB_PHASE.finalBattle;
}

export function isResultsPhase(gs) {
  return gs?.gamePhase === GAME_PHASE.results;
}

export function isGameOverPhase(gs) {
  return gs?.gamePhase === GAME_PHASE.gameOver;
}
