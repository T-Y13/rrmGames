import { useEffect, useRef } from "react";
import {
  DAILY_CUTIN_PHASE,
  dailyCutinPhaseDurationMs,
} from "../lib/dailyCutinSync";
import { DAILY_SHRINE_CUTIN_MS } from "../lib/day7TransitionFx";

/**
 * 1〜7日目マルチ：手番以外のクライアントが Firestore ルーム直下の dailyCutin* を追い、
 * 仕事・配信・神社カットインを操作者と同じ順序・同じ表示時間で再生する。
 */
export function useDailyCutinSpectatorSync({
  enabled,
  cutinBroadcast,
  soundRef,
  setWorkCutin,
  setWorkPonHud,
  setStreamTypeCutin,
  setStreamPonFireOverlay,
  setStreamFailOverlay,
  setShrinePhase,
  setShakeScreen,
  onClearLocalCutins,
}) {
  const lastKeyRef = useRef("");
  const prevEnabledRef = useRef(false);
  const shrineTimersRef = useRef([]);
  const idleClearTimerRef = useRef(null);
  const phaseClearTimerRef = useRef(null);
  const sessionEndAtRef = useRef(0);
  const activeSessionIdRef = useRef(null);

  useEffect(() => {
    const clearShrineTimers = () => {
      shrineTimersRef.current.forEach(clearTimeout);
      shrineTimersRef.current = [];
    };

    const clearPhaseClearTimer = () => {
      if (phaseClearTimerRef.current) {
        clearTimeout(phaseClearTimerRef.current);
        phaseClearTimerRef.current = null;
      }
    };

    const clearIdleClearTimer = () => {
      if (idleClearTimerRef.current) {
        clearTimeout(idleClearTimerRef.current);
        idleClearTimerRef.current = null;
      }
    };

    const scheduleIdleClear = () => {
      clearIdleClearTimer();
      const waitMs = Math.max(0, sessionEndAtRef.current - Date.now());
      idleClearTimerRef.current = window.setTimeout(() => {
        idleClearTimerRef.current = null;
        sessionEndAtRef.current = 0;
        activeSessionIdRef.current = null;
        lastKeyRef.current = "";
        clearShrineTimers();
        onClearLocalCutins?.();
      }, waitMs);
    };

    if (!enabled) {
      if (prevEnabledRef.current) {
        if (sessionEndAtRef.current > Date.now()) {
          scheduleIdleClear();
        } else {
          lastKeyRef.current = "";
          sessionEndAtRef.current = 0;
          activeSessionIdRef.current = null;
          clearIdleClearTimer();
          clearShrineTimers();
          onClearLocalCutins?.();
        }
      }
      prevEnabledRef.current = false;
      return clearIdleClearTimer;
    }
    prevEnabledRef.current = true;

    const phase = cutinBroadcast?.phase ?? DAILY_CUTIN_PHASE.idle;
    const sid = cutinBroadcast?.sessionId ?? "";
    const payload = cutinBroadcast?.payload ?? null;
    const key = `${sid}:${phase}`;

    if (phase === DAILY_CUTIN_PHASE.idle) {
      if (sessionEndAtRef.current > Date.now()) {
        if (!idleClearTimerRef.current) scheduleIdleClear();
        return () => clearShrineTimers();
      }
      if (lastKeyRef.current !== key) {
        clearIdleClearTimer();
        clearShrineTimers();
        onClearLocalCutins?.();
        lastKeyRef.current = key;
      }
      return () => clearShrineTimers();
    }

    if (lastKeyRef.current === key) return () => clearShrineTimers();

    const isNewSession = !!sid && sid !== activeSessionIdRef.current;
    lastKeyRef.current = key;
    clearIdleClearTimer();

    if (isNewSession) {
      activeSessionIdRef.current = sid;
      sessionEndAtRef.current = Date.now();
      onClearLocalCutins?.();
    }

    sessionEndAtRef.current = Math.max(
      sessionEndAtRef.current,
      Date.now() + dailyCutinPhaseDurationMs(phase),
    );

    clearPhaseClearTimer();
    const phaseMs = dailyCutinPhaseDurationMs(phase);
    // 仕事／配信は画像 ready 後にコンポーネント側で visibleMs 計測するため、ここでは自動クリアしない
    const imageGatedPhase =
      phase === DAILY_CUTIN_PHASE.work || phase === DAILY_CUTIN_PHASE.stream;
    if (phaseMs > 0 && !imageGatedPhase) {
      phaseClearTimerRef.current = window.setTimeout(() => {
        phaseClearTimerRef.current = null;
        if (phase === DAILY_CUTIN_PHASE.workPon) setWorkPonHud(null);
        if (phase === DAILY_CUTIN_PHASE.streamPon) setStreamPonFireOverlay(false);
        if (phase === DAILY_CUTIN_PHASE.streamFail) setStreamFailOverlay(false);
      }, phaseMs);
    }

    switch (phase) {
      case DAILY_CUTIN_PHASE.work:
        if (payload) setWorkCutin(payload);
        break;
      case DAILY_CUTIN_PHASE.workPon:
        setWorkCutin(null);
        if (payload) setWorkPonHud(payload);
        try {
          soundRef?.current?.playWorkPonPlateBreak?.();
        } catch (_) {}
        break;
      case DAILY_CUTIN_PHASE.stream:
        if (payload) setStreamTypeCutin(payload);
        break;
      case DAILY_CUTIN_PHASE.streamPon:
        setStreamTypeCutin(null);
        setStreamFailOverlay(false);
        setStreamPonFireOverlay(true);
        setShakeScreen(true);
        window.setTimeout(() => setShakeScreen(false), 500);
        try {
          soundRef?.current?.playStreamPonBurn?.();
        } catch (_) {}
        break;
      case DAILY_CUTIN_PHASE.streamFail:
        setStreamTypeCutin(null);
        setStreamPonFireOverlay(false);
        setStreamFailOverlay(true);
        try {
          soundRef?.current?.playStreamFailGaan?.();
        } catch (_) {}
        break;
      case DAILY_CUTIN_PHASE.shrine:
        setStreamTypeCutin(null);
        setWorkCutin(null);
        setShrinePhase("in");
        clearShrineTimers();
        shrineTimersRef.current.push(
          window.setTimeout(() => setShrinePhase("out"), 1700),
          window.setTimeout(() => setShrinePhase(null), DAILY_SHRINE_CUTIN_MS),
        );
        break;
      default:
        break;
    }

    return () => {
      clearShrineTimers();
      clearPhaseClearTimer();
    };
  }, [
    enabled,
    cutinBroadcast?.phase,
    cutinBroadcast?.sessionId,
    cutinBroadcast?.payload,
    setWorkCutin,
    setWorkPonHud,
    setStreamTypeCutin,
    setStreamPonFireOverlay,
    setStreamFailOverlay,
    setShrinePhase,
    setShakeScreen,
    onClearLocalCutins,
    soundRef,
    cutinBroadcast,
  ]);
}
