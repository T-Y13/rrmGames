import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { runMovementFxSequence, isTaxiDeferredMovementFx } from "../lib/sugorokuMovementFx";

/**
 * gameState.movementFx を全クライアントで再生し、表示用 viewPos / フェーズを返す。
 * Firestore スナップショットで movementFx オブジェクト参照だけが変わっても、
 * 同一 id の演出を最初からやり直さない（deps は id 等の安定キーのみ）。
 */
export default function useSugorokuMovementFx({
  movementFx,
  currentPlayerId,
  /** Firestore 上の現在表示プレイヤー position（viewPos 解除の同期用） */
  currentPlayerPosition = null,
  schedulePieceHopBlockingMs,
  onSequenceComplete,
  onTileExplain,
  onMoneyApplied,
}) {
  const [phase, setPhase] = useState(null);
  const [viewPosOverride, setViewPosOverride] = useState(null);
  const [viewPosOverridePlayerId, setViewPosOverridePlayerId] = useState(null);
  const [floatDelta, setFloatDelta] = useState(null);
  const [floatLabelMode, setFloatLabelMode] = useState("steps");
  const lastPlayedIdRef = useRef(null);
  const runningIdRef = useRef(null);
  const movementFxRef = useRef(movementFx);
  movementFxRef.current = movementFx;
  const onCompleteRef = useRef(onSequenceComplete);
  onCompleteRef.current = onSequenceComplete;
  const onTileExplainRef = useRef(onTileExplain);
  onTileExplainRef.current = onTileExplain;
  const onMoneyAppliedRef = useRef(onMoneyApplied);
  onMoneyAppliedRef.current = onMoneyApplied;

  const movementFxId = movementFx?.id ?? null;
  const movementFxPlayerId = movementFx?.playerId ?? null;
  const movementFxFromPos =
    typeof movementFx?.fromPos === "number" ? movementFx.fromPos : null;

  const clearViewPosOverride = useCallback(() => {
    setViewPosOverride(null);
    setViewPosOverridePlayerId(null);
  }, []);

  const applyViewPosOverride = useCallback((pos, playerId) => {
    if (typeof pos !== "number") {
      clearViewPosOverride();
      return;
    }
    setViewPosOverride(pos);
    setViewPosOverridePlayerId(playerId ?? null);
  }, [clearViewPosOverride]);

  const resetFxState = useCallback(({ clearViewPos = true } = {}) => {
    setPhase(null);
    setFloatDelta(null);
    setFloatLabelMode("steps");
    if (clearViewPos) clearViewPosOverride();
  }, [clearViewPosOverride]);

  /** 手番プレイヤーが変わったら前プレイヤーの override を捨てる（効果なしマスで手番進行後の巻き戻り防止） */
  useEffect(() => {
    if (viewPosOverridePlayerId == null) return;
    if (!currentPlayerId || viewPosOverridePlayerId === currentPlayerId) return;
    clearViewPosOverride();
  }, [currentPlayerId, viewPosOverridePlayerId, clearViewPosOverride]);

  /** Firestore コミット前に viewPos を finalPos で維持（観戦側のカメラ巻き戻り防止） */
  const holdViewAtFinalPos = useCallback(
    (fx) => {
      setPhase(null);
      setFloatDelta(null);
      setFloatLabelMode("steps");
      if (isTaxiDeferredMovementFx(fx)) {
        clearViewPosOverride();
        return;
      }
      const hold =
        typeof fx?.finalPos === "number"
          ? fx.finalPos
          : typeof fx?.landedPos === "number"
            ? fx.landedPos
            : null;
      if (typeof hold === "number") applyViewPosOverride(hold, fx.playerId);
    },
    [applyViewPosOverride, clearViewPosOverride],
  );

  /** Firestore 反映〜effect 起動の隙間で駒が先に飛ばないよう開始マスに固定 */
  useLayoutEffect(() => {
    const fx = movementFxRef.current;
    if (!fx?.id || !fx?.playerId || typeof fx.fromPos !== "number") return;
    if (!currentPlayerId || fx.playerId !== currentPlayerId) return;
    if (lastPlayedIdRef.current === fx.id) return;
    applyViewPosOverride(fx.fromPos, fx.playerId);
  }, [movementFxId, movementFxFromPos, movementFxPlayerId, currentPlayerId, applyViewPosOverride]);

  /** movementFx 終了後も position が追いつくまで viewPos を保持（早解除で古いマスへ戻るのを防ぐ） */
  useEffect(() => {
    if (viewPosOverride == null || typeof currentPlayerPosition !== "number") return;
    if (currentPlayerPosition !== viewPosOverride) return;
    if (runningIdRef.current != null) return;
    if (movementFxId && lastPlayedIdRef.current !== movementFxId) return;
    clearViewPosOverride();
  }, [currentPlayerPosition, viewPosOverride, movementFxId, clearViewPosOverride]);

  useEffect(() => {
    const fx = movementFxRef.current;
    if (!fx?.id || !fx?.playerId || typeof fx.fromPos !== "number") {
      lastPlayedIdRef.current = null;
      if (runningIdRef.current == null) resetFxState({ clearViewPos: false });
      return undefined;
    }

    if (!currentPlayerId || fx.playerId !== currentPlayerId) {
      resetFxState();
      return undefined;
    }

    if (lastPlayedIdRef.current === fx.id) return undefined;
    if (runningIdRef.current === fx.id) return undefined;

    let cancelled = false;
    runningIdRef.current = fx.id;

    const run = async () => {
      try {
        await runMovementFxSequence(fx, {
          onPhase: (nextPhase) => {
            if (cancelled) return;
            setPhase(nextPhase);
            if (nextPhase === "tileMoney") {
              setFloatLabelMode("money");
              setFloatDelta(fx.tileEffect?.moneyDelta ?? 0);
            } else if (nextPhase !== "tileMoney") {
              setFloatDelta(null);
              if (nextPhase !== "tileExplain") setFloatLabelMode("steps");
            }
          },
          onViewPos: (pos) => {
            if (!cancelled) applyViewPosOverride(pos, fx.playerId);
          },
          onPieceHopping: (active, ms) => {
            if (cancelled || !schedulePieceHopBlockingMs) return;
            if (active && ms > 0) schedulePieceHopBlockingMs(ms);
          },
          onTileExplain: (tileEffect) => {
            if (!cancelled) onTileExplainRef.current?.(tileEffect);
          },
          onMoneyApplied: () => {
            if (!cancelled) onMoneyAppliedRef.current?.(fx);
          },
        });
        if (!cancelled) {
          lastPlayedIdRef.current = fx.id;
          holdViewAtFinalPos(fx);
          onCompleteRef.current?.(fx);
        }
      } finally {
        if (runningIdRef.current === fx.id) {
          runningIdRef.current = null;
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [
    movementFxId,
    movementFxFromPos,
    movementFxPlayerId,
    currentPlayerId,
    schedulePieceHopBlockingMs,
    resetFxState,
    holdViewAtFinalPos,
    applyViewPosOverride,
  ]);

  const diceActive = phase === "dice";
  const labelActive = phase === "tileMoney";
  const isRunning = phase != null;

  return {
    phase,
    viewPosOverride,
    viewPosOverridePlayerId,
    floatDelta,
    floatLabelMode,
    diceActive,
    labelActive,
    isRunning,
    diceRolls: movementFx?.diceRolls ?? [],
  };
}
