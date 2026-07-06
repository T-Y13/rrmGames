import {
  computeSugorokuHopDurationMs,
  computeTaxiCongestedLegDurations,
  computeTaxiDriveDurationMs,
} from "../utils/gameLogic";
import { TILE_EFFECT_KIND } from "../constants/gameBalance";

export const MOVEMENT_FX_DICE_SHUFFLE_MS = 650;
export const MOVEMENT_FX_DICE_HOLD_MS = 900;
export const MOVEMENT_FX_DICE_MS = MOVEMENT_FX_DICE_SHUFFLE_MS + MOVEMENT_FX_DICE_HOLD_MS;
/** 演出開始直後（fromPos 固定中）は orphan 修復で位置スナップしない */
export const MOVEMENT_FX_ORPHAN_MIN_AGE_MS = 15000;
export const MOVEMENT_FX_TILE_EXPLAIN_MS = 2400;
/** お金増減マス：説明吹き出しを長めに */
export const MOVEMENT_FX_TILE_EXPLAIN_MONEY_MS = 3400;
export const MOVEMENT_FX_MONEY_FLOAT_MS = 1800;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function isMoneyTileEffect(tileEffect) {
  const moneyDelta = tileEffect?.moneyDelta ?? 0;
  const kind = tileEffect?.kind;
  return (
    moneyDelta !== 0 ||
    kind === TILE_EFFECT_KIND.GAIN_MONEY ||
    kind === TILE_EFFECT_KIND.LOSE_MONEY
  );
}

export function tileEffectExplainDurationMs(tileEffect) {
  return isMoneyTileEffect(tileEffect)
    ? MOVEMENT_FX_TILE_EXPLAIN_MONEY_MS
    : MOVEMENT_FX_TILE_EXPLAIN_MS;
}

/**
 * マス効果：説明→（お金なら±表示）→移動前の待機。タクシー追いマス等でも共用。
 * @param {{ titles?: string[], moneyDelta?: number }} tileEffect
 * @param {{ onExplain?: (tileEffect: object) => void, onMoneyFloat?: (delta: number) => void, onMoneyApplied?: () => void }} handlers
 */
export async function runTileEffectPresentation(tileEffect, handlers = {}) {
  const { onExplain, onMoneyFloat, onMoneyApplied } = handlers;
  const moneyDelta = tileEffect?.moneyDelta ?? 0;
  const hasExplain = (tileEffect?.titles?.length ?? 0) > 0;
  if (!hasExplain && moneyDelta === 0) return;

  if (hasExplain) {
    onExplain?.(tileEffect);
    await delay(tileEffectExplainDurationMs(tileEffect));
  }
  if (moneyDelta !== 0) {
    onMoneyFloat?.(moneyDelta);
    await delay(MOVEMENT_FX_MONEY_FLOAT_MS);
    onMoneyApplied?.();
    await delay(120);
  }
}

/**
 * @param {{
 *   playerId: string;
 *   fromPos: number;
 *   landedPos: number;
 *   finalPos: number;
 *   stepDelta: number;
 *   diceRolls: number[];
 *   diceRolls: number[];
 *   followUp?: "taxi"|"pon"|null;
 *   taxiVisual?: object|null;
 *   ponVisual?: object|null;
 *   id?: number;
 * }} params
 */
export function buildMovementFx({
  playerId,
  fromPos,
  landedPos,
  finalPos,
  stepDelta,
  diceRolls,
  tileEffect = null,
  followUp = null,
  taxiVisual = null,
  ponVisual = null,
  id,
}) {
  const tileSlide = finalPos !== landedPos;
  return {
    id: id ?? Date.now(),
    playerId,
    fromPos,
    landedPos,
    finalPos,
    stepDelta,
    tileStepDelta: tileSlide ? finalPos - landedPos : 0,
    tileSlide,
    tileEffect,
    diceRolls: Array.isArray(diceRolls) ? [...diceRolls] : [],
    ...(followUp ? { followUp } : {}),
    ...(taxiVisual ? { taxiVisual } : {}),
    ...(ponVisual ? { ponVisual } : {}),
  };
}

/**
 * 観戦側タクシー演出用：手番側 beginTaxiVisualSequence と同じタイミングパラメータを Firestore に載せる。
 */
export function buildTaxiVisualPayload({
  fromPos,
  newPosFinal,
  landedDice,
  needsTileSlide,
  congested,
  diceRollStep,
  tileEffectMeta = null,
}) {
  const fullDriveMs = computeTaxiDriveDurationMs(Math.abs(newPosFinal - fromPos));
  if (congested) {
    const { jamMid, firstLegMs, secondLegMs } = computeTaxiCongestedLegDurations(
      fromPos,
      newPosFinal,
      diceRollStep,
      fullDriveMs,
    );
    return {
      congested: true,
      fromPos,
      driveEndPos: newPosFinal,
      jamMidPos: jamMid,
      firstLegMs,
      secondLegMs,
      fullDriveMs,
      needsTileSlide: false,
    };
  }
  if (needsTileSlide) {
    const firstLegMs = computeTaxiDriveDurationMs(Math.abs(landedDice - fromPos));
    return {
      congested: false,
      fromPos,
      driveEndPos: landedDice,
      jamMidPos: null,
      firstLegMs,
      secondLegMs: 0,
      fullDriveMs,
      needsTileSlide: true,
      tileSlideFromPos: landedDice,
      tileSlideToPos: newPosFinal,
      tileEffectMeta,
    };
  }
  const firstLegMs = computeTaxiDriveDurationMs(Math.abs(newPosFinal - fromPos));
  return {
    congested: false,
    fromPos,
    driveEndPos: newPosFinal,
    jamMidPos: null,
    firstLegMs,
    secondLegMs: 0,
    fullDriveMs,
    needsTileSlide: false,
  };
}

/** 観戦側：渋滞2ターン目（drive のみ・のろのろ） */
export function buildTaxiTrafficWaitVisualPayload({
  fromPos,
  driveEndPos,
  driveMs,
  needsTileSlide,
  tileSlideFromPos,
  tileSlideToPos,
  tileEffectMeta = null,
}) {
  return {
    trafficWaitLeg: true,
    fromPos,
    driveEndPos,
    driveMs,
    needsTileSlide: !!needsTileSlide,
    tileSlideFromPos: tileSlideFromPos ?? null,
    tileSlideToPos: tileSlideToPos ?? null,
    tileEffectMeta,
  };
}

/** ダイス／ホップ演出を省略して即 followUp へ進む movementFx */
export function isInstantMovementFx(fx) {
  return fx?.followUp === "taxiTrafficWait";
}

/** 観戦側 PON 転倒カットイン用 */
export function buildPonVisualPayload({
  characterType,
  stopPos,
  needsTileSlide,
  tileSlideFromPos,
  tileSlideToPos,
}) {
  return {
    characterType: characterType ?? "salaryman",
    stopPos,
    needsTileSlide: !!needsTileSlide,
    tileSlideFromPos: tileSlideFromPos ?? null,
    tileSlideToPos: tileSlideToPos ?? null,
  };
}

/** movementFx が現在の手番プレイヤー向けか（null/undefined 同士の誤一致を防ぐ） */
export function isMovementFxForPlayer(fx, player) {
  return !!(fx && player && fx.playerId && player.id && fx.playerId === player.id);
}

/** タクシー：ダイス演出のみで駒移動は drive フェーズに委譲する movementFx */
export function isTaxiDeferredMovementFx(fx) {
  if (!fx || typeof fx.fromPos !== "number") return false;
  const finalPos =
    typeof fx.finalPos === "number" ? fx.finalPos : fx.landedPos;
  return typeof finalPos === "number" && finalPos === fx.fromPos && (fx.stepDelta ?? 0) > 0;
}

/**
 * リロード等で movementFx だけ残った gameState を修復するパッチ。
 * @returns {{ gameState: object } | null}
 */
export function buildOrphanedMovementFxPatch(gs) {
  const fx = gs?.movementFx;
  if (!fx) return null;

  if (!fx.playerId || typeof fx.fromPos !== "number") {
    return { gameState: { ...gs, movementFx: null } };
  }

  const players = Array.isArray(gs.players) ? gs.players : [];
  const idx = players.findIndex((p) => p.id === fx.playerId);
  if (idx < 0) {
    return { gameState: { ...gs, movementFx: null } };
  }

  const mover = players[idx];
  const finalPos =
    typeof fx.finalPos === "number"
      ? fx.finalPos
      : typeof fx.landedPos === "number"
        ? fx.landedPos
        : null;
  const cp = players[gs.currentPlayerIdx];

  if (cp?.id && cp.id !== fx.playerId) {
    return { gameState: { ...gs, movementFx: null } };
  }

  if (typeof finalPos === "number" && mover.position === finalPos) {
    return { gameState: { ...gs, movementFx: null } };
  }

  /** タクシー：位置確定後に movementFx だけ残った場合 */
  if (
    isTaxiDeferredMovementFx(fx) &&
    typeof finalPos === "number" &&
    mover.position !== fx.fromPos
  ) {
    return { gameState: { ...gs, movementFx: null } };
  }

  if (
    mover.position === fx.fromPos &&
    typeof finalPos === "number" &&
    finalPos !== fx.fromPos
  ) {
    const fxAgeMs =
      typeof fx.id === "number" && Number.isFinite(fx.id) ? Date.now() - fx.id : Infinity;
    if (fxAgeMs < MOVEMENT_FX_ORPHAN_MIN_AGE_MS) {
      return null;
    }
    const newPlayers = players.map((pl, i) =>
      i === idx ? { ...pl, position: finalPos } : pl,
    );
    return { gameState: { ...gs, movementFx: null, players: newPlayers } };
  }

  return null;
}

/** Firestore 反映前に駒を開始マスに留める */
export function holdMoverAtPosition(players, playerIdx, fromPos) {
  if (!Array.isArray(players) || playerIdx < 0) return players;
  return players.map((pl, i) => (i === playerIdx ? { ...pl, position: fromPos } : pl));
}

/** movementFx 再生中はターン進行フィールドを書き込み前スナップショットに留める（カットイン誤発火防止） */
export function holdMoverForMovementFx(players, playerIdx, snapshot) {
  if (!Array.isArray(players) || playerIdx < 0 || !snapshot) return players;
  return players.map((pl, i) =>
    i === playerIdx
      ? {
          ...pl,
          position: snapshot.position,
          moveTurns: snapshot.moveTurns,
          movePhase: snapshot.movePhase,
          pendingTaxiSteps: snapshot.pendingTaxiSteps ?? 0,
        }
      : pl,
  );
}

/**
 * ダイス → 移動（タイル追いマスは第2ホップ）の Promise チェーン。
 * @param {object} fx — buildMovementFx の戻り値
 * @param {{
 *   onPhase?: (phase: 'dice'|'move'|'tileExplain'|'tileMoney'|'tileMove'|null) => void;
 *   onViewPos?: (pos: number) => void;
 *   onPieceHopping?: (active: boolean, ms?: number) => void;
 * }} handlers
 */
export async function runMovementFxSequence(fx, handlers = {}) {
  const {
    onPhase,
    onViewPos,
    onPieceHopping,
    onTileExplain,
    onMoneyFloat,
    onMoneyApplied,
  } = handlers;
  const fromPos = fx.fromPos;
  const landedPos = fx.landedPos;
  const finalPos = fx.finalPos;

  onViewPos?.(fromPos);

  onPhase?.("dice");
  await delay(MOVEMENT_FX_DICE_MS);

  const firstTarget = landedPos;
  onPhase?.("move");
  onPieceHopping?.(true, computeSugorokuHopDurationMs(fromPos, firstTarget));
  onViewPos?.(firstTarget);
  await delay(computeSugorokuHopDurationMs(fromPos, firstTarget));
  onPieceHopping?.(false);

  if (fx.tileEffect && ((fx.tileEffect.titles?.length ?? 0) > 0 || (fx.tileEffect.moneyDelta ?? 0) !== 0)) {
    onPhase?.("tileExplain");
    await runTileEffectPresentation(fx.tileEffect, {
      onExplain: onTileExplain,
      onMoneyFloat: (delta) => {
        onPhase?.("tileMoney");
        onMoneyFloat?.(delta);
      },
      onMoneyApplied: () => {
        onMoneyApplied?.();
        onPhase?.(null);
      },
    });
  }

  if (fx.tileSlide && finalPos !== landedPos) {
    onPhase?.("tileMove");
    onPieceHopping?.(true, computeSugorokuHopDurationMs(landedPos, finalPos));
    onViewPos?.(finalPos);
    await delay(computeSugorokuHopDurationMs(landedPos, finalPos));
  }

  onPieceHopping?.(false);
  onPhase?.(null);
}
