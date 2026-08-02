import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRight, Dice5, Volume2, VolumeX } from "lucide-react";
import { CharacterIcon } from "./CharacterPieces";
import SlotReelCanvasView from "./SlotReelCanvasView";
import { BAL, SLOT_BETS, SLOT_COST, SLOT_MACHINES } from "../constants/gameBalance";
import { SLOT_CABINET_VARIANT } from "../constants/slotCabinetLayout";
import SlotCabinetShell from "./SlotCabinetShell";
import SlotProxyAccountability from "./SlotProxyAccountability";
import Day8ItemBar from "./Day8ItemBar";
import JackpotCelebration from "./JackpotCelebration";
import ProgressivePotDisplay from "./ProgressivePotDisplay";
import SlotPayoutAmountLabel from "./SlotPayoutAmountLabel";
import { buildSlotSpinVisualPlan, SLOT_SKILL_STOP_MODE } from "../lib/slotReelStop";
import { resolveSkillStopSpin } from "../lib/slotSkillStopResolve";
import { pickSlotSpinBaseSnapshot } from "../lib/slotSkillStopAuthority";
import {
  canManualStopReel,
  isFirstReelManualStopReady,
  nextManualStopReelIndex,
  SLOT_REEL_MANUAL_STOP_MIN_MS,
} from "../lib/slotReelStopSequence";
import {
  PROXY_SLOT_RULES_LINES,
  buildProxySlotSpinStats,
  canProxySlotBetAt,
  computeProxySlotMaxBet,
  getProxySlotAllowedBets,
  isLocalPlayerProxyTarget,
} from "../lib/slotProxyTarget";
import {
  advanceDay8AfterSlotSpinShow,
  applyDay8SlotSpinToFreshGameState,
  buildDay8SlotReloadRecoveryPatch,
  buildColumnReelStrips,
  calcSlotRates,
  day8SlotMajorWinCelebrationHoldMs,
  getSlotTierReelSymbols,
  isDay8SlotBurstFinishedOnGameState,
  mergeDay8SlotIdleSync,
  pickDisplayReelsFromGameState,
  pickWrongSymbol,
  randomStripTriple,
  rollReachCutInDisplay,
  spinSlot,
  slotMachineForReels,
  slotPaylineMiddlesToTargetIndices,
  SLOT_TIER_LABELS,
  stripLegacySlotFirestoreFields,
  stripTripleForMiddleColumn,
  SLOT_RESULT_END_BURST_GRACE_MS,
  SLOT_JACKPOT_CELEBRATION_MS,
  SLOT_JACKPOT_WIN_FX_CLEAR_MS,
  SLOT_SYNC_DEFAULTS,
} from "../utils/gameLogic";

/** リーチ演出×実結果に応じたセリフ（ログ用）。characterType で切替（ririm は vtuber 扱い） */
function buildSlotReachEmotionLine(characterType, cutInShown, won) {
  const ct = characterType === "ririm" ? "vtuber" : characterType ?? "salaryman";
  if (cutInShown && won) {
    if (ct === "vtuber") return "Jackpot! My fans are gonna love this clip! ✨";
    if (ct === "student") return "Whoa, it actually worked! Beginner's luck is real! 🎓";
    return null;
  }
  if (cutInShown && !won) {
    if (ct === "vtuber") return "Whaat?! It looked so hot! This game is rigged! 💢";
    if (ct === "student") return "Wait, that was a miss? But the effect was so flashy...";
    return null;
  }
  if (!cutInShown && won) {
    if (ct === "salaryman") return "Calculated. Visual flair isn't everything. 💼";
    if (ct === "student") return "Huh? I wasn't even watching and I won!";
    return null;
  }
  return null;
}

/**
 * 【カットイン前】リーチ時のタイムライン基準 `t2Base` を過ぎてから、さらに何 ms 経ってからオーバーを出すか。
 * ここを上げると「カットインはまだ」のテンションだけ伸びます（画面上の滞留時間とは別）。
 */
const REACH_CUTIN_SPIN_PAD_BEFORE_REVEAL_MS = 0;
/**
 * 【カットイン本体】オーバー表示開始〜閉じ始め（dismiss）までの最短 ms。
 * 演出の長さは主にこれで調整（旧 REACH_CUTIN_REEL_HOLD_EXTRA で伸びなかった理由は、この値が固定だったためではなく
 * 「reel3StopAt と tCutinReveal が連動して差が約680ms固定」だったため。今は離してある）。
 */
const REACH_CUTIN_ON_SCREEN_MS = 2000;
/** カットイン発動と同時：全リールのシャッフル更新を止める時間（ストップモーション） */
const REACH_CUTIN_ALL_REELS_FREEZE_MS = 600;
/** カットインが消えたあと、この分だけ待ってから第3リールを止める */
const REACH_CUTIN_AFTER_DISMISS_MS = 1000;

/** リーチカットイン中央画像：リリムは専用アート、その他は一覧アイコン */
const REACH_CUTIN_RIMIRU_TYPES = new Set(["vtuber", "ririm"]);

/** 8日目スロット本体UI・リール制御・確認カウントダウン */
export default function SlotMachine({
  gs,
  cpGs,
  isMyTurn,
  writeGS,
  commitPendingGameState,
  commitDay8SlotLivePatch,
  syncDay8SlotIdleFromLive,
  commitGameStateTransaction,
  commitDay8SlotSpin,
  soundRef,
  roomId,
  interactionLocked = false,
  myId,
  onUseDay8Item,
  spectatorMode = false,
  totalPot = 0,
  showProgressivePot = false,
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [localReels, setLocalReels] = useState(["?", "?", "?"]);
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);
  const [confirmCountdown, setConfirmCountdown] = useState(5);
  const [selectedMachineKey, setSelectedMachineKey] = useState("standard");
  const [reelColumns, setReelColumns] = useState([
    ["🎰", "🎰", "🎰"],
    ["🎰", "🎰", "🎰"],
    ["🎰", "🎰", "🎰"],
  ]);
  const [slipAnimCols, setSlipAnimCols] = useState([false, false, false]);
  const [bouncingReel, setBouncingReel] = useState(-1);
  const [isReach, setIsReach] = useState(false);
  const [showReachCutin, setShowReachCutin] = useState(false);
  const [reachCutinGasing, setReachCutinGasing] = useState(false);
  const [reachCutinFlash, setReachCutinFlash] = useState(false);
  const [showWinEffect, setShowWinEffect] = useState(null);
  const [charReaction, setCharReaction] = useState("idle");
  const [cabinetRecoil, setCabinetRecoil] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(0);
  const [showPayout, setShowPayout] = useState(false);
  const [showJackpotCelebration, setShowJackpotCelebration] = useState(false);
  const [jackpotCelebrationPayout, setJackpotCelebrationPayout] = useState(0);
  const [jackpotCelebrationVariant, setJackpotCelebrationVariant] = useState("jackpot");
  const [reelsCanvasSettled, setReelsCanvasSettled] = useState(true);
  const [postSpinPending, setPostSpinPending] = useState(false);
  const [reelStoppedFlags, setReelStoppedFlags] = useState([false, false, false]);
  const [manualStopUiEpoch, setManualStopUiEpoch] = useState(0);
  const [spinStartedAtUi, setSpinStartedAtUi] = useState(0);
  const [selectedBet, setSelectedBet] = useState(SLOT_COST);
  const [skillStopChanseActive, setSkillStopChanseActive] = useState(false);
  const [spinColumnStrips, setSpinColumnStrips] = useState(null);
  const spinColumnStripsRef = useRef(null);

  const shuffleIntervalRef = useRef(null);
  const pendingWinFxRef = useRef(null);
  const postSpinResultRef = useRef(null);
  const postSpinFlushTimerRef = useRef(null);
  const stoppedReelsRef = useRef([false, false, false]);
  const pendingGSRef = useRef(null);
  const reachCutInTimerRef = useRef(null);
  const spinFreezeCutinUntilRef = useRef(0);
  const slotPostResultGraceTimerRef = useRef(null);
  const spinTimersRef = useRef([]);
  const reelAutoStopTimerRef = useRef([null, null, null]);
  const reel3CompleteTimerRef = useRef(null);
  const activeSpinSessionRef = useRef(null);
  const spinCompletingRef = useRef(false);
  const reachCutinShownRef = useRef(false);
  /** スピン確定絵柄：Firestore 反映前の古い displayReels で上書きしない */
  const spinDisplayLockRef = useRef(null);
  const slotReloadRecoveryKeyRef = useRef(null);
  const slotReloadRecoveryBusyRef = useRef(false);
  const slotMajorWinDeferTimerRef = useRef(null);
  const reelCanvasRef = useRef(null);

  const clearSpinTimers = useCallback(() => {
    for (const id of spinTimersRef.current) {
      clearTimeout(id);
    }
    spinTimersRef.current = [];
    for (let i = 0; i < 3; i++) {
      if (reelAutoStopTimerRef.current[i] != null) {
        clearTimeout(reelAutoStopTimerRef.current[i]);
        reelAutoStopTimerRef.current[i] = null;
      }
    }
    if (reel3CompleteTimerRef.current != null) {
      clearTimeout(reel3CompleteTimerRef.current);
      reel3CompleteTimerRef.current = null;
    }
    if (shuffleIntervalRef.current) {
      clearInterval(shuffleIntervalRef.current);
      shuffleIntervalRef.current = null;
    }
    if (reachCutInTimerRef.current) {
      clearTimeout(reachCutInTimerRef.current);
      reachCutInTimerRef.current = null;
    }
    activeSpinSessionRef.current = null;
    spinColumnStripsRef.current = null;
    setSpinColumnStrips(null);
    spinCompletingRef.current = false;
    reachCutinShownRef.current = false;
    setReelStoppedFlags([false, false, false]);
    setSpinStartedAtUi(0);
  }, []);

  const scheduleSpinTimer = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    spinTimersRef.current.push(id);
    return id;
  }, []);

  const clearPostSpinFlushTimer = useCallback(() => {
    if (postSpinFlushTimerRef.current) {
      clearTimeout(postSpinFlushTimerRef.current);
      postSpinFlushTimerRef.current = null;
    }
  }, []);

  const commitPendingAdvance = useCallback(
    async (pending, opts = {}) => {
      const actorId =
        opts.turnCompletePlayerId ??
        pending?.players?.[pending?.currentPlayerIdx]?.id ??
        gs?.players?.[gs?.currentPlayerIdx]?.id ??
        null;
      const markOpts = {
        markDay8TurnComplete: opts.markDay8TurnComplete ?? true,
        turnCompletePlayerId: actorId,
      };
      if (roomId && typeof commitDay8SlotLivePatch === "function") {
        return commitDay8SlotLivePatch("advanceTurn", markOpts);
      }
      if (!pending) return false;
      return writeGS(pending, markOpts);
    },
    [roomId, commitDay8SlotLivePatch, writeGS, gs],
  );

  const finalizePostSpinResult = useCallback(
    (resultGS) => {
      if (!postSpinResultRef.current) return;
      postSpinResultRef.current = null;
      clearPostSpinFlushTimer();

      const actor = resultGS.players?.[resultGS.currentPlayerIdx];
      const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
      const slotLeft = actor?.slotTurnsLeft ?? 0;
      const pullsSeat = actor?.slotPullsThisSeat ?? 0;
      const canContinueBurst = actor?.movePhase === "arrived" && slotLeft > 0 && pullsSeat < burst;

      if (canContinueBurst) {
        if (slotPostResultGraceTimerRef.current) {
          clearTimeout(slotPostResultGraceTimerRef.current);
          slotPostResultGraceTimerRef.current = null;
        }
        const lastTier = actor?.lastSpinResult?.tier;
        const isMajorWin = lastTier === "potJackpot" || lastTier === "jackpot";
        const syncIdle = () => {
          if (roomId && typeof syncDay8SlotIdleFromLive === "function") {
            void syncDay8SlotIdleFromLive(resultGS);
          } else {
            void writeGS(mergeDay8SlotIdleSync(resultGS));
          }
        };
        if (isMajorWin) {
          slotPostResultGraceTimerRef.current = setTimeout(() => {
            slotPostResultGraceTimerRef.current = null;
            setPostSpinPending(false);
            syncIdle();
          }, SLOT_JACKPOT_CELEBRATION_MS + 150);
        } else {
          setPostSpinPending(false);
          syncIdle();
        }
        return;
      }

      if (slotPostResultGraceTimerRef.current) {
        clearTimeout(slotPostResultGraceTimerRef.current);
      }
      const lastTier = actor?.lastSpinResult?.tier;
      const isMajorWin = lastTier === "potJackpot" || lastTier === "jackpot";
      const graceMs = isMajorWin ? day8SlotMajorWinCelebrationHoldMs() : SLOT_RESULT_END_BURST_GRACE_MS;
      slotPostResultGraceTimerRef.current = setTimeout(() => {
        slotPostResultGraceTimerRef.current = null;
        setPostSpinPending(false);
        pendingGSRef.current = advanceDay8AfterSlotSpinShow(resultGS);
        setAwaitingConfirm(true);
        setConfirmCountdown(5);
      }, graceMs);
    },
    [clearPostSpinFlushTimer, writeGS, roomId, syncDay8SlotIdleFromLive],
  );

  const schedulePostSpinResult = useCallback(
    (resultGS) => {
      postSpinResultRef.current = resultGS;
      setPostSpinPending(true);
      clearPostSpinFlushTimer();
      postSpinFlushTimerRef.current = setTimeout(() => {
        finalizePostSpinResult(resultGS);
      }, 3200);
    },
    [clearPostSpinFlushTimer, finalizePostSpinResult],
  );

  const cpIsSlot =
    gs?.gamePhase === "playing" && gs?.subPhase === "day8" && cpGs?.movePhase === "arrived";

  const proxySlotTargetIdx =
    typeof gs?.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0 ? gs.proxySlotTargetIdx : null;
  const targetGs =
    proxySlotTargetIdx != null && gs?.players?.[proxySlotTargetIdx] ? gs.players[proxySlotTargetIdx] : null;
  const moneyGs = targetGs ?? cpGs;
  const isProxyPull = proxySlotTargetIdx != null && targetGs != null;
  const proxyMaxBet = isProxyPull ? computeProxySlotMaxBet(moneyGs.stats?.money ?? 0) : null;
  const betsForUi = isProxyPull
    ? getProxySlotAllowedBets(moneyGs.stats?.money ?? 0)
    : SLOT_BETS;
  const slotRateStats =
    isProxyPull && cpGs?.stats && moneyGs?.stats
      ? buildProxySlotSpinStats(cpGs.stats, moneyGs.stats)
      : cpGs?.stats;

  const displayReelsKey = gs?.displayReels?.join?.(",") ?? "";

  useEffect(
    () => () => {
      if (slotPostResultGraceTimerRef.current) {
        clearTimeout(slotPostResultGraceTimerRef.current);
        slotPostResultGraceTimerRef.current = null;
      }
      if (slotMajorWinDeferTimerRef.current) {
        clearTimeout(slotMajorWinDeferTimerRef.current);
        slotMajorWinDeferTimerRef.current = null;
      }
      clearPostSpinFlushTimer();
      clearSpinTimers();
    },
    [clearPostSpinFlushTimer, clearSpinTimers],
  );

  useEffect(() => {
    if (!reelsCanvasSettled || !pendingWinFxRef.current) return;
    const { tier, payout } = pendingWinFxRef.current;
    pendingWinFxRef.current = null;
    setPayoutAmount(payout);
    setShowPayout(true);
    setShowWinEffect(tier);
    setCharReaction("win");
    setTimeout(() => soundRef.current?.playWin?.(tier), 80);
    if (tier === "jackpot" || tier === "potJackpot") {
      const gross = payout ?? 0;
      setJackpotCelebrationVariant(tier === "potJackpot" ? "pot" : "jackpot");
      setJackpotCelebrationPayout(gross);
      setShowJackpotCelebration(true);
    }
    const clearMs = tier === "jackpot" || tier === "potJackpot" ? SLOT_JACKPOT_WIN_FX_CLEAR_MS : 4000;
    const clearFx = setTimeout(() => setShowWinEffect(null), clearMs);
    return () => clearTimeout(clearFx);
  }, [reelsCanvasSettled, soundRef]);

  /** リール完全停止後：バースト継続なら即 idle、終了時は猶予→確認（canvas 未通知時は schedule 側のフォールバック） */
  useEffect(() => {
    if (!reelsCanvasSettled || !postSpinResultRef.current) return;
    finalizePostSpinResult(postSpinResultRef.current);
  }, [reelsCanvasSettled, finalizePostSpinResult]);

  /** Firestore は completed なのにローカル isSpinning が残ったときの復旧（completeAfterReel3 中断など） */
  useEffect(() => {
    if (spectatorMode || !isMyTurn || !gs || !cpIsSlot) return;
    if ((gs.slotPhase ?? "idle") !== "completed") return;
    if (!isSpinning) return;
    setIsSpinning(false);
    spinCompletingRef.current = false;
    if (!postSpinPending && !postSpinResultRef.current) {
      schedulePostSpinResult(gs);
    }
  }, [
    spectatorMode,
    isMyTurn,
    gs,
    cpIsSlot,
    gs?.slotPhase,
    isSpinning,
    postSpinPending,
    schedulePostSpinResult,
  ]);

  const slotPhaseIdle = (gs?.slotPhase ?? "idle") === "idle";

  const canSpin =
    gs?.gamePhase === "playing" &&
    isMyTurn &&
    cpIsSlot &&
    !!(cpGs?.slotTurnsLeft > 0) &&
    !interactionLocked &&
    !isSpinning &&
    !awaitingConfirm &&
    slotPhaseIdle;

  const canSelectBet =
    !spectatorMode &&
    isMyTurn &&
    cpIsSlot &&
    !!(cpGs?.slotTurnsLeft > 0) &&
    !interactionLocked &&
    !isSpinning &&
    !awaitingConfirm &&
    slotPhaseIdle;

  const canSpinWithSelectedBet =
    canSpin && (isProxyPull ? betsForUi.includes(selectedBet) : true);

  useEffect(() => {
    if (betsForUi.length === 0) return;
    if (!betsForUi.includes(selectedBet)) {
      setSelectedBet(betsForUi.includes(SLOT_COST) ? SLOT_COST : betsForUi[betsForUi.length - 1]);
    }
  }, [betsForUi, selectedBet]);

  useEffect(() => {
    if (!cpIsSlot || isSpinning) return;
    if (postSpinPending || showPayout || showWinEffect) return;

    const dr = pickDisplayReelsFromGameState(gs);
    if (!dr) return;

    if (spinDisplayLockRef.current) {
      const lockedKey = spinDisplayLockRef.current.join(",");
      const incomingKey = dr.join(",");
      if (incomingKey !== lockedKey) return;
      spinDisplayLockRef.current = null;
    }

    const machineKey = gs?.slotMirrorMachineKey ?? selectedMachineKey;
    const m = slotMachineForReels(
      SLOT_MACHINES[machineKey] ?? SLOT_MACHINES.standard,
      (gs?.players?.length ?? 0) > 1,
    );
    setReelColumns(dr.map((mid, ci) => stripTripleForMiddleColumn(mid, m, ci)));
  }, [
    cpIsSlot,
    isSpinning,
    postSpinPending,
    showPayout,
    showWinEffect,
    displayReelsKey,
    selectedMachineKey,
    gs?.displayReels,
    gs?.slotMirrorMachineKey,
  ]);

  useEffect(() => {
    if (!spectatorMode) return;
    const mk = gs?.slotMirrorMachineKey ?? "standard";
    setSelectedMachineKey(mk);
  }, [spectatorMode, gs?.slotMirrorMachineKey]);

  /** リロードで確認 UI が消えたとき、Firestore の slotPhase から手番を復旧 */
  useEffect(() => {
    if (spectatorMode || !isMyTurn || !gs || interactionLocked) return;
    if (!cpIsSlot || isSpinning || awaitingConfirm || postSpinPending) return;
    if (showJackpotCelebration || showPayout || showWinEffect) return;

    const recovery = buildDay8SlotReloadRecoveryPatch(gs);
    const burstFinished = isDay8SlotBurstFinishedOnGameState(gs);
    if (!recovery && !burstFinished) return;

    const phase = gs.slotPhase ?? "idle";
    const pullsSeat = cpGs?.slotPullsThisSeat ?? 0;
    const slotLeft = cpGs?.slotTurnsLeft ?? 0;
    const recoveryKey = recovery
      ? `${recovery.kind}|${phase}|${slotLeft}|${pullsSeat}|${gs.slotResultSettledAt ?? ""}`
      : `forceAdvance|${phase}|${slotLeft}|${pullsSeat}|${gs.slotResultSettledAt ?? ""}`;
    if (slotReloadRecoveryKeyRef.current === recoveryKey) return;
    if (slotReloadRecoveryBusyRef.current) return;
    slotReloadRecoveryKeyRef.current = recoveryKey;
    slotReloadRecoveryBusyRef.current = true;

    const finishRecovery = (ok = true) => {
      slotReloadRecoveryBusyRef.current = false;
      if (!ok) slotReloadRecoveryKeyRef.current = null;
    };

    if (recovery?.kind === "deferAdvance") {
      const waitMs = Math.max(0, recovery.retryAfterMs ?? 0);
      const deferKey = `defer|${gs.slotResultSettledAt ?? ""}|${waitMs}`;
      if (slotMajorWinDeferTimerRef.current) {
        finishRecovery();
        return;
      }
      slotReloadRecoveryKeyRef.current = deferKey;
      slotMajorWinDeferTimerRef.current = setTimeout(() => {
        slotMajorWinDeferTimerRef.current = null;
        slotReloadRecoveryKeyRef.current = null;
        finishRecovery();
        void commitDay8SlotLivePatch("advanceTurn", {
          markDay8TurnComplete: true,
          turnCompletePlayerId: cpGs?.id ?? null,
        }).then((ok) => {
          if (!ok) slotReloadRecoveryKeyRef.current = null;
        });
      }, waitMs);
      return;
    }

    const actorId = cpGs?.id ?? gs?.players?.[gs?.currentPlayerIdx]?.id ?? null;
    if (recovery?.kind === "advanceTurn" || (!recovery && burstFinished)) {
      if (roomId && typeof commitDay8SlotLivePatch === "function") {
        void commitDay8SlotLivePatch("advanceTurn", {
          markDay8TurnComplete: true,
          turnCompletePlayerId: actorId,
        }).then((ok) => finishRecovery(ok));
      } else {
        void commitPendingAdvance(recovery.gs, {
          markDay8TurnComplete: true,
          turnCompletePlayerId: actorId,
        }).then((ok) => finishRecovery(ok));
      }
      return;
    }
    if (!recovery) {
      finishRecovery(false);
      return;
    }
    if (roomId && typeof commitDay8SlotLivePatch === "function") {
      void commitDay8SlotLivePatch("resetSync", { markDay8TurnComplete: false }).finally(() =>
        finishRecovery(true),
      );
    } else {
      void writeGS(recovery.gs).finally(() => finishRecovery(true));
    }
  }, [
    spectatorMode,
    isMyTurn,
    gs,
    cpIsSlot,
    cpGs?.slotPullsThisSeat,
    cpGs?.slotTurnsLeft,
    cpGs?.id,
    isSpinning,
    awaitingConfirm,
    postSpinPending,
    interactionLocked,
    commitPendingAdvance,
    commitDay8SlotLivePatch,
    roomId,
    writeGS,
    showJackpotCelebration,
    showPayout,
    showWinEffect,
  ]);

  useEffect(() => {
    if (spectatorMode || !awaitingConfirm) return;
    if (confirmCountdown <= 0) {
      const pending = pendingGSRef.current;
      pendingGSRef.current = null;
      setAwaitingConfirm(false);
      setConfirmCountdown(5);
      if (pending) void commitPendingAdvance(pending);
      return;
    }
    const t = setTimeout(() => setConfirmCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [spectatorMode, awaitingConfirm, confirmCountdown, commitPendingAdvance]);

  const handleConfirm = async () => {
    if (spectatorMode || interactionLocked) return;
    if (slotPostResultGraceTimerRef.current) return;
    const pending = pendingGSRef.current;
    pendingGSRef.current = null;
    setAwaitingConfirm(false);
    setConfirmCountdown(5);
    setPostSpinPending(false);
    await commitPendingAdvance(pending);
  };

  const handleSpin = async (bet = SLOT_COST) => {
    if (isSpinning || !isMyTurn || !gs || interactionLocked) return;
    if ((gs?.slotPhase ?? "idle") !== "idle") return;
    if (slotPostResultGraceTimerRef.current) {
      clearTimeout(slotPostResultGraceTimerRef.current);
      slotPostResultGraceTimerRef.current = null;
    }
    const p = gs.players[gs.currentPlayerIdx];
    if (p.slotTurnsLeft <= 0) return;
    const machine = SLOT_MACHINES[selectedMachineKey] ?? SLOT_MACHINES.standard;
    const potJackpotEnabled = (gs?.players?.length ?? 0) > 1;
    const reelMachine = slotMachineForReels(machine, potJackpotEnabled);

    const proxyIdx =
      typeof gs.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0 ? gs.proxySlotTargetIdx : null;
    const statsForSpin =
      proxyIdx != null && gs.players[proxyIdx]
        ? buildProxySlotSpinStats(p.stats, gs.players[proxyIdx].stats)
        : p.stats;

    if (proxyIdx != null && !canProxySlotBetAt(statsForSpin.money, bet)) return;

    const heat = p.slotHeat ?? 0;
    const pityBefore = p.slotPityCounter ?? 0;
    const slotTurnsBefore = p.slotTurnsLeft;
    const res = spinSlot(statsForSpin, bet, selectedMachineKey, heat, p.characterType, {
      pityCounter: pityBefore,
      potJackpotEnabled,
    });

    const visualPlan = buildSlotSpinVisualPlan(res, selectedMachineKey);
    const visualReels = visualPlan.visualReels;
    const { reachPossible, skillStop } = visualPlan;
    const columnStrips = buildColumnReelStrips(reelMachine, 3);
    spinColumnStripsRef.current = columnStrips;
    const skillScrollStripForSpin =
      skillStop.active && skillStop.mode === SLOT_SKILL_STOP_MODE.full ? columnStrips[2] : null;
    const spinState = {
      res,
      visualReels,
      skillStop,
      skillScrollStrip: skillScrollStripForSpin,
      columnScrollStrips: columnStrips,
      bet,
      machineKey: selectedMachineKey,
      reelMachine,
    };
    const shouldShowReachCutin = reachPossible && rollReachCutInDisplay();

    const lkEx = Math.max(0, statsForSpin.luck - BAL.slot.luckBaseline);
    const skEx = Math.max(0, statsForSpin.skill - BAL.slot.skillBaseline);
    const slipEligible = res.tier !== "miss" && (lkEx >= 10 || skEx >= 10);
    const finalStrips = visualReels.map((mid, ci) =>
      stripTripleForMiddleColumn(mid, reelMachine, ci, spinColumnStripsRef.current?.[ci]),
    );

    clearSpinTimers();

    spinDisplayLockRef.current = null;
    if (roomId) {
      const targetResult = slotPaylineMiddlesToTargetIndices(visualReels, reelMachine);
      const slotSpinSessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      const spinningOk = await writeGS(
        stripLegacySlotFirestoreFields({
          ...gs,
          slotPhase: "spinning",
          activeBet: bet,
          targetResult,
          slotSpinSessionId,
          slotMirrorMachineKey: selectedMachineKey,
          isReach: reachPossible,
          slotReachCutin: shouldShowReachCutin,
          slotVisualReels: visualReels,
          slotSkillStopActive: skillStop.active,
          slotSkillStopMode: skillStop.mode,
          slotSpinBaseResult: pickSlotSpinBaseSnapshot(res),
          slotSkillStopScrollRows: null,
          slotColumnScrollStrips: skillStop.active ? columnStrips : null,
        }),
      );
      if (spinningOk === false) {
        return;
      }
    }

    setCabinetRecoil(true);
    scheduleSpinTimer(() => setCabinetRecoil(false), 340);
    setIsSpinning(true);
    setReelsCanvasSettled(false);
    pendingWinFxRef.current = null;
    postSpinResultRef.current = null;
    setPostSpinPending(false);
    clearPostSpinFlushTimer();
    setIsReach(false);
    setShowReachCutin(false);
    setReachCutinGasing(false);
    setReachCutinFlash(false);
    spinFreezeCutinUntilRef.current = 0;
    if (reachCutInTimerRef.current) {
      clearTimeout(reachCutInTimerRef.current);
      reachCutInTimerRef.current = null;
    }
    setShowWinEffect(null);
    setShowPayout(false);
    setPayoutAmount(0);
    setShowJackpotCelebration(false);
    setCharReaction("spinning");
    setSkillStopChanseActive(skillStop.active);
    setSpinColumnStrips(columnStrips);
    stoppedReelsRef.current = [false, false, false];
    setReelStoppedFlags([false, false, false]);
    spinCompletingRef.current = false;
    reachCutinShownRef.current = false;
    const spinStartedAt = performance.now();
    setSpinStartedAtUi(spinStartedAt);
    scheduleSpinTimer(() => setManualStopUiEpoch((n) => n + 1), SLOT_REEL_MANUAL_STOP_MIN_MS);
    setSlipAnimCols([false, false, false]);
    setReelColumns([
      ["🎰", "🎰", "🎰"],
      ["🎰", "🎰", "🎰"],
      ["🎰", "🎰", "🎰"],
    ]);
    setBouncingReel(-1);
    setLocalReels(visualReels);

    const sm = soundRef.current;
    sm?.playStart();
    scheduleSpinTimer(() => sm?.startSpin(), 200);

    shuffleIntervalRef.current = setInterval(() => {
      if (performance.now() < spinFreezeCutinUntilRef.current) return;
      const stopped = stoppedReelsRef.current;
      setReelColumns((prev) => prev.map((col, i) => (stopped[i] ? col : randomStripTriple(reelMachine))));
    }, 80);

    const markReelStopped = (idx) => {
      stoppedReelsRef.current[idx] = true;
      setReelStoppedFlags((prev) => {
        if (prev[idx]) return prev;
        const next = [...prev];
        next[idx] = true;
        return next;
      });
      setManualStopUiEpoch((n) => n + 1);
    };

    const onReelStoppedEffects = (idx) => {
      if (idx === 1 && reachPossible) {
        setIsReach(true);
        setCharReaction("reach");
        scheduleSpinTimer(() => sm?.playReach(), 150);
      }
      if (idx === 1 && shouldShowReachCutin && !reachCutinShownRef.current) {
        reachCutInTimerRef.current = scheduleSpinTimer(() => {
          reachCutInTimerRef.current = null;
          spinFreezeCutinUntilRef.current = performance.now() + REACH_CUTIN_ALL_REELS_FREEZE_MS;
          setReachCutinFlash(true);
          scheduleSpinTimer(() => setReachCutinFlash(false), 110);
          reachCutinShownRef.current = true;
          setShowReachCutin(true);
          scheduleSpinTimer(() => {
            setShowReachCutin(false);
          }, REACH_CUTIN_ON_SCREEN_MS);
        }, 400);
      }
    };

    const finalizeColumn = (idx, targetStrip, allowSlip) => {
      const doSlip = allowSlip && slipEligible && Math.random() < 0.5;
      if (doSlip) {
        const wm = pickWrongSymbol(targetStrip[1], reelMachine);
        const faux = [targetStrip[0], wm, targetStrip[2]];
        reelCanvasRef.current?.requestColumnStop?.(idx, faux);
        markReelStopped(idx);
        onReelStoppedEffects(idx);
        setReelColumns((prev) => {
          const n = [...prev];
          n[idx] = faux;
          return n;
        });
        setBouncingReel(idx);
        sm?.playStop(idx);
        scheduleSpinTimer(() => setBouncingReel(-1), 430);
        scheduleSpinTimer(() => {
          setReelColumns((prev) => {
            const n = [...prev];
            n[idx] = targetStrip;
            return n;
          });
          reelCanvasRef.current?.requestColumnStop?.(idx, targetStrip);
          setSlipAnimCols((prev) => {
            const n = [...prev];
            n[idx] = true;
            return n;
          });
          scheduleSpinTimer(() => {
            setSlipAnimCols((prev) => {
              const nn = [...prev];
              nn[idx] = false;
              return nn;
            });
          }, 560);
        }, 380);
      } else {
        reelCanvasRef.current?.requestColumnStop?.(idx, targetStrip);
        markReelStopped(idx);
        onReelStoppedEffects(idx);
        setReelColumns((prev) => {
          const n = [...prev];
          n[idx] = targetStrip;
          return n;
        });
        setBouncingReel(idx);
        sm?.playStop(idx);
        scheduleSpinTimer(() => setBouncingReel(-1), 430);
      }
    };

    const dismissReachCutin = () =>
      new Promise((resolve) => {
        if (!shouldShowReachCutin) {
          setShowReachCutin(false);
          setReachCutinGasing(false);
          resolve();
          return;
        }
        if (spinState.res.tier === "miss") {
          setReachCutinGasing(true);
          sm?.playReachGaseSting();
          scheduleSpinTimer(() => {
            setShowReachCutin(false);
            setReachCutinGasing(false);
            resolve();
          }, 720);
          return;
        }
        scheduleSpinTimer(() => {
          setShowReachCutin(false);
          setReachCutinGasing(false);
          resolve();
        }, 200);
      });

    const completeAfterReel3 = async () => {
      if (spinCompletingRef.current) return;
      spinCompletingRef.current = true;
      activeSpinSessionRef.current = null;

      if (reel3CompleteTimerRef.current != null) {
        clearTimeout(reel3CompleteTimerRef.current);
        reel3CompleteTimerRef.current = null;
      }
      if (reachCutInTimerRef.current) {
        clearTimeout(reachCutInTimerRef.current);
        reachCutInTimerRef.current = null;
      }

      let reel3AllowSlip = true;
      if (!stoppedReelsRef.current[2]) {
        const { skillStop: skillCtx } = spinState;
        if (skillCtx?.active && skillCtx.mode === SLOT_SKILL_STOP_MODE.full) {
          const scrollRows = reelCanvasRef.current?.getColumnScrollRows?.(2);
          spinState.skillStopScrollRows = scrollRows;
          const resolved = resolveSkillStopSpin({
            scrollRows,
            visualReels: spinState.visualReels,
            baseRes: spinState.res,
            reelMachine: spinState.reelMachine,
            bet: spinState.bet,
            machineKey: spinState.machineKey,
            scrollStrip: spinState.skillScrollStrip,
          });
          spinState.res = resolved.res;
          spinState.visualReels = resolved.visualReels;
          finalStrips[2] = resolved.reel3Strip;
          reel3AllowSlip = false;
          if (resolved.won) {
            setCharReaction("win");
          }
        }
      }

      if (shouldShowReachCutin && reachCutinShownRef.current) {
        setShowReachCutin(false);
        setReachCutinGasing(false);
      }

      clearInterval(shuffleIntervalRef.current);
      shuffleIntervalRef.current = null;
      sm?.stopSpin();
      if (!stoppedReelsRef.current[2]) {
        finalizeColumn(2, finalStrips[2], reel3AllowSlip);
      }
      setIsReach(false);

      const newLeft = p.slotTurnsLeft - 1;
      const newPullsSeat = (p.slotPullsThisSeat ?? 0) + 1;
      const newSpins = p.spinCount + 1;
      const newHeat = heat + 1;

      const emotionLine = buildSlotReachEmotionLine(
        p.characterType,
        shouldShowReachCutin && reachCutinShownRef.current,
        spinState.res.tier !== "miss",
      );
      const usePotTx =
        !!roomId && gs.players.length > 1 && typeof commitDay8SlotSpin === "function";
      const useMoneyTx =
        !usePotTx &&
        !!roomId &&
        gs.players.length > 1 &&
        typeof commitGameStateTransaction === "function";

      const ctx = {
        actorIdx: gs.currentPlayerIdx,
        proxyTargetIdx: proxyIdx,
        bet,
        res: spinState.res,
        newLeft,
        newPullsSeat,
        newSpins,
        newHeat,
        pityAfter: spinState.res.pityCounterAfter,
        visualReels: spinState.visualReels,
        emotionLine,
        machine,
        reelMachine,
        slotTurnsBefore,
        skillStopScrollRows: spinState.skillStopScrollRows ?? null,
      };

      let resultGS = null;
      if (usePotTx) {
        resultGS = await commitDay8SlotSpin(ctx);
        if (!resultGS && spinState.res.tier === "potJackpot") {
          resultGS = await commitDay8SlotSpin(ctx);
        }
      } else if (useMoneyTx) {
        resultGS = await commitGameStateTransaction((g0) => applyDay8SlotSpinToFreshGameState(g0, ctx));
      } else {
        resultGS = applyDay8SlotSpinToFreshGameState(gs, ctx);
        if (resultGS) await writeGS(resultGS);
      }

      if (spinState.res.tier !== "miss") {
        const grossPayout =
          resultGS?.players?.[gs.currentPlayerIdx]?.lastSpinResult?.grossPayout ?? spinState.res.payout;
        pendingWinFxRef.current = { tier: spinState.res.tier, payout: grossPayout };
      } else {
        pendingWinFxRef.current = null;
        setCharReaction("miss");
      }

      if (!resultGS) {
        if (roomId) {
          if (typeof syncDay8SlotIdleFromLive === "function") {
            await syncDay8SlotIdleFromLive();
          } else if (typeof commitDay8SlotLivePatch === "function") {
            await commitDay8SlotLivePatch("resetSync", { markDay8TurnComplete: false });
          } else {
            await writeGS(mergeDay8SlotIdleSync(gs));
          }
        }
        setSkillStopChanseActive(false);
        spinColumnStripsRef.current = null;
        setSpinColumnStrips(null);
        setIsSpinning(false);
        spinCompletingRef.current = false;
        return;
      }

      if (slotPostResultGraceTimerRef.current) {
        clearTimeout(slotPostResultGraceTimerRef.current);
        slotPostResultGraceTimerRef.current = null;
      }
      spinDisplayLockRef.current = spinState.visualReels;
      setSkillStopChanseActive(false);
      spinColumnStripsRef.current = null;
      setSpinColumnStrips(null);
      setIsSpinning(false);
      setLocalReels(spinState.res.reels);
      schedulePostSpinResult(resultGS);
      spinCompletingRef.current = false;
    };

    activeSpinSessionRef.current = {
      startedAt: spinStartedAt,
      spinState,
      finalizeColumn,
      finalStrips,
      completeAfterReel3,
    };

    // Phase A: 操作者は STOP ボタンのみで停止（自動タイマーなし）。観戦は SlotSpinBroadcastOverlay の従来タイマー。
  };

  const handleManualReelStop = useCallback(
    (reelIdx) => {
      if (!isSpinning || spectatorMode || showReachCutin) return;
      const session = activeSpinSessionRef.current;
      if (!session) return;
      if (!canManualStopReel(stoppedReelsRef.current, reelIdx)) return;
      if (reelIdx !== nextManualStopReelIndex(stoppedReelsRef.current)) return;
      if (reelIdx === 0 && !isFirstReelManualStopReady(session.startedAt)) return;

      if (reelIdx < 2) {
        if (reelAutoStopTimerRef.current[reelIdx] != null) {
          clearTimeout(reelAutoStopTimerRef.current[reelIdx]);
          reelAutoStopTimerRef.current[reelIdx] = null;
        }
        if (!stoppedReelsRef.current[reelIdx]) {
          session.finalizeColumn(reelIdx, session.finalStrips[reelIdx], true);
        }
        return;
      }

      void session.completeAfterReel3();
    },
    [isSpinning, spectatorMode, showReachCutin],
  );

  void manualStopUiEpoch;

  if (!cpGs || !cpIsSlot) return null;

  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const pullsSeat = cpGs.slotPullsThisSeat ?? 0;
  const remainingThisBurst = Math.min(
    cpGs.slotTurnsLeft ?? 0,
    Math.max(0, burst - pullsSeat),
  );

  const publicAssetBase = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  const spectatorBtn =
    "bg-slate-700/95 text-slate-100 border border-slate-500/55 shadow-none hover:bg-slate-700/95 disabled:opacity-100 disabled:cursor-not-allowed";
  const visibleMachineKey = spectatorMode ? (gs?.slotMirrorMachineKey ?? "standard") : selectedMachineKey;

  return (
    <>
      <JackpotCelebration
        show={showJackpotCelebration}
        variant={jackpotCelebrationVariant}
        actorName={cpGs?.name?.trim() || ""}
        payout={jackpotCelebrationPayout}
        durationMs={SLOT_JACKPOT_CELEBRATION_MS}
        onComplete={() => setShowJackpotCelebration(false)}
      />
      <div className={showReachCutin ? "anim-slot-reach-machine-shake" : ""}>
        <div
          className="sticky top-0 z-[199] -mx-1 mb-3 border-b border-slate-800/80 bg-slate-950/95 px-1 py-2 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/85"
          style={{ top: "max(0px, env(safe-area-inset-top))" }}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 gap-y-1">
            <p className="min-w-0 truncate text-left text-xs font-semibold text-slate-200 sm:text-sm">
              8日目 スロットターン
            </p>
            <ProgressivePotDisplay
              variant="inline"
              totalPot={totalPot}
              visible={showProgressivePot}
            />
            <div className="flex min-w-0 items-center justify-end gap-1.5">
              <span className="truncate text-right text-xs font-semibold text-slate-100 sm:text-sm">
                {cpGs.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (spectatorMode) return;
                  const next = !isMuted;
                  setIsMuted(next);
                  soundRef.current?.setMuted(next);
                }}
                disabled={spectatorMode}
                title={spectatorMode ? "他プレイヤーの画面です" : isMuted ? "ミュート解除" : "ミュート"}
                className={
                  spectatorMode
                    ? `flex shrink-0 items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-semibold sm:px-2.5 sm:py-1.5 sm:text-xs ${spectatorBtn}`
                    : `flex shrink-0 items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-semibold transition-colors sm:px-2.5 sm:py-1.5 sm:text-xs ${isMuted ? "border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500" : "border-cyan-500/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"}`
                }
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {isMuted ? "OFF" : "ON"}
              </button>
            </div>
          </div>
          {proxySlotTargetIdx != null && targetGs && (
            <p className="mt-1 truncate text-center text-[10px] font-bold text-violet-300 sm:text-xs">
              資金は {targetGs.name} のもの
            </p>
          )}
        </div>
      {cpGs.slotTurnsLeft > 0 || awaitingConfirm || postSpinPending ? (
        <div className={`space-y-4${spectatorMode ? " relative min-h-[360px]" : ""}`}>
          {spectatorMode && (
            <div
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
              aria-live="polite"
              aria-label={`${cpGs.name}が操作中`}
            >
              <div className="mx-4 rounded-2xl border border-violet-400/55 bg-slate-950/95 px-8 py-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
                <p className="text-lg font-bold tracking-wide text-violet-100 sm:text-xl">
                  {cpGs.name} が操作中
                </p>
              </div>
            </div>
          )}
          {(() => {
            const activeMachine = SLOT_MACHINES[visibleMachineKey] ?? SLOT_MACHINES.standard;
            const heat = cpGs.slotHeat ?? 0;
            const potJackpotEnabled = (gs?.players?.length ?? 0) > 1;
            const r = calcSlotRates(slotRateStats, activeMachine, heat, cpGs.characterType, { potJackpotEnabled });
            const missRed = (r.heatMissReduced * 100).toFixed(1);
            const isBurning = heat >= 10;
            const isWarm = heat >= 6;
            const heatColor = isBurning ? "text-red-400" : isWarm ? "text-orange-400" : heat >= 3 ? "text-yellow-400" : "text-slate-400";
            const heatLabel = isBurning ? "🔥 BURNING!!" : isWarm ? "🌡️ 熱い！" : heat >= 3 ? "🌀 温まってきた" : "❄️ 冷";
            const heatPct = Math.min(100, (heat / 15) * 100);
            const heatBarColor = isBurning ? "bg-red-500" : isWarm ? "bg-orange-500" : heat >= 3 ? "bg-yellow-500" : "bg-slate-600";
            const tierSy = getSlotTierReelSymbols(activeMachine);
            const symClass = "font-bold text-sm leading-none";
            return (
              <div className="rounded-lg bg-slate-800/50 p-3 text-xs space-y-2">
                {((isMyTurn && !awaitingConfirm) || spectatorMode) && (
                  <div className="flex gap-2 flex-wrap pb-1 border-b border-slate-700">
                    {Object.values(SLOT_MACHINES).map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        disabled={spectatorMode}
                        onClick={() => {
                          if (spectatorMode) return;
                          setSelectedMachineKey(m.key);
                        }}
                        className={
                          spectatorMode
                            ? `flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold border ${visibleMachineKey === m.key ? `${spectatorBtn} ring-1 ring-slate-400/70` : `${spectatorBtn} opacity-75`}`
                            : `flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors border ${selectedMachineKey === m.key ? `${m.border} ${m.color}` : "border-slate-700 text-slate-400 hover:border-slate-500"}`
                        }
                      >
                        {m.emoji} {m.label}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`rounded-lg border px-3 py-2 space-y-1.5 ${isBurning ? "border-red-500/60 bg-red-500/10" : isWarm ? "border-orange-500/50 bg-orange-500/8" : "border-slate-700 bg-slate-900/40"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-black text-sm tracking-wide ${heatColor}`}>LUCKY LEVEL {heat}</span>
                    <span className={`text-xs font-bold ${heatColor}`}>{heatLabel}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${heatBarColor} ${isBurning ? "animate-pulse" : ""}`}
                      style={{ width: `${heatPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-slate-500" style={{ fontSize: "10px" }}>
                    <span>熟成でハズレから {missRed}% を上位4役へ配分（内訳は右）</span>
                    <span>
                      <span className={`${symClass} text-yellow-300`} title={SLOT_TIER_LABELS.jackpot}>
                        {tierSy.jackpot}
                      </span>
                      +{(heat * 0.1).toFixed(1)}% /{" "}
                      <span className={symClass} title={SLOT_TIER_LABELS.big}>
                        {tierSy.big}
                      </span>
                      +{(heat * 0.3).toFixed(1)}% /{" "}
                      <span className={symClass} title={SLOT_TIER_LABELS.mid}>
                        {tierSy.mid}
                      </span>
                      +{(heat * 0.5).toFixed(1)}% /{" "}
                      <span className={symClass} title={SLOT_TIER_LABELS.atari}>
                        {tierSy.atari}
                      </span>
                      +{(heat * 0.6).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <p className="text-slate-300">
                  現資金（{proxySlotTargetIdx != null ? `${targetGs?.name ?? "標的"}の所持` : "自分"}）{" "}
                  <span className="font-bold text-white text-base">{moneyGs.stats.money}</span>G
                  {isProxyPull && proxyMaxBet != null && (
                    <span className="ml-2 font-semibold text-violet-300">
                      このスピン最大 {proxyMaxBet}G（所持の30%・切捨て）
                    </span>
                  )}
                  {isProxyPull && (
                    <span className="ml-2 font-semibold text-violet-300/90">
                      運・技量は操作者の半分で反映
                    </span>
                  )}
                  {cpGs.spinCount > 0 && (
                    <span className={`ml-2 font-semibold ${cpGs.slotNet >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      スロット収支: {cpGs.slotNet >= 0 ? "+" : ""}
                      {cpGs.slotNet}G
                    </span>
                  )}
                </p>
                {isProxyPull && (
                  <div className="rounded-lg border border-violet-500/35 bg-violet-950/25 px-3 py-2 text-[11px] text-slate-300 space-y-0.5 leading-relaxed">
                    <p className="font-semibold text-violet-200/95">代理スロット</p>
                    <ul className="list-disc list-inside">
                      {PROXY_SLOT_RULES_LINES.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(() => {
                  const lk = Math.max(0, (slotRateStats?.luck ?? 0) - BAL.slot.luckBaseline);
                  const skEx = Math.max(0, (slotRateStats?.skill ?? 0) - BAL.slot.skillBaseline);
                  const skBlocks = skEx >= BAL.slot.skillBlockSize ? Math.floor(skEx / BAL.slot.skillBlockSize) : 0;
                  const hasLuck = lk > 0;
                  const hasSkill = skBlocks > 0;
                  return hasLuck || hasSkill ? (
                    <div className="flex gap-1.5 flex-wrap">
                      {hasLuck && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 px-2 py-0.5 text-[10px] font-bold text-yellow-300">
                          ✨ 運：運100で当−2%・小−3%→JP・大（現在+{lk}点 → 当最大−
                          {((BAL.slot.luckAtariDrainAtLuck100 * 100) * lk / BAL.slot.luckRefSpan).toFixed(1)}%・小最大−
                          {((BAL.slot.luckSmallDrainAtLuck100 * 100) * lk / BAL.slot.luckRefSpan).toFixed(1)}%）
                        </span>
                      )}
                      {hasSkill && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/20 border border-sky-500/40 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                          ⚙️ 技量：満{BAL.slot.skillBlockSize}点ごとハズレ{(BAL.slot.skillMissReducePerBlock * 100).toFixed(1)}%→中
                          {(BAL.slot.skillToMid * 100).toFixed(0)}%・当{(BAL.slot.skillToAtari * 100).toFixed(0)}%・小
                          {(BAL.slot.skillToSmall * 100).toFixed(0)}%（{skBlocks}段 × {(BAL.slot.skillMissReducePerBlock * 100).toFixed(1)}%＝最大
                          {((skBlocks * BAL.slot.skillMissReducePerBlock) * 100).toFixed(1)}%）
                        </span>
                      )}
                    </div>
                  ) : null;
                })()}
                <p className="text-slate-500 flex flex-wrap items-center gap-x-1 gap-y-0.5" style={{ fontSize: "10px" }}>
                  <span>
                    [{activeMachine.emoji}
                    {activeMachine.label}]
                  </span>
                  {potJackpotEnabled && (
                    <>
                      <span className={`${symClass} text-lime-300`} title={SLOT_TIER_LABELS.potJackpot}>
                        {tierSy.potJackpot}
                      </span>
                      <span className="text-lime-400 font-semibold">{(r.potJp * 100).toFixed(2)}%</span>
                      <span className="text-slate-600">/</span>
                    </>
                  )}
                  <span className={`${symClass} text-yellow-300`} title={SLOT_TIER_LABELS.jackpot}>
                    {tierSy.jackpot}
                  </span>
                  <span className="text-yellow-400 font-semibold">{(r.jp * 100).toFixed(2)}%</span>
                  <span className="text-slate-600">/</span>
                  <span className={symClass} title={SLOT_TIER_LABELS.big}>
                    {tierSy.big}
                  </span>
                  <span className="text-amber-400 font-semibold">{(r.big * 100).toFixed(2)}%</span>
                  <span className="text-slate-600">/</span>
                  <span className={symClass} title={SLOT_TIER_LABELS.mid}>
                    {tierSy.mid}
                  </span>
                  <span className="text-emerald-400 font-semibold">{(r.mid * 100).toFixed(2)}%</span>
                  <span className="text-slate-600">/</span>
                  <span className={symClass} title={SLOT_TIER_LABELS.atari}>
                    {tierSy.atari}
                  </span>
                  <span className="text-cyan-400 font-semibold">{(r.atari * 100).toFixed(2)}%</span>
                  <span className="text-slate-600">/</span>
                  <span className={symClass} title={SLOT_TIER_LABELS.small}>
                    {tierSy.small}
                  </span>
                  <span className="text-slate-300 font-semibold">{(r.small * 100).toFixed(2)}%</span>
                  <span className="text-slate-600">/</span>
                  <span>ハズレ</span>
                  <span className="text-rose-400 font-semibold">{(r.miss * 100).toFixed(1)}%</span>
                </p>
                <p className="text-slate-500 border-t border-slate-700/80 pt-1.5 mt-1" style={{ fontSize: "10px" }}>
                  再配分内訳：技量でハズレ <span className="text-sky-400 font-semibold">−{(r.skillMissReduced * 100).toFixed(2)}%</span>
                  {" · "}運で小役→上位 <span className="text-yellow-400 font-semibold">{(r.luckConverted * 100).toFixed(2)}%</span>
                  {" · "}熟成でハズレ <span className="text-orange-400 font-semibold">−{(r.heatMissReduced * 100).toFixed(2)}%</span>
                </p>
              </div>
            );
          })()}

          {(() => {
            const heat = cpGs.slotHeat ?? 0;
            const outerClass = heat >= 10 ? "anim-heat-burning" : heat >= 6 ? "anim-heat-warm" : "";
            const charType = cpGs.characterType ?? "salaryman";
            const charClass =
              charReaction === "win"
                ? "anim-char-bounce"
                : charReaction === "reach"
                  ? "anim-char-pray"
                  : charReaction === "spinning"
                    ? "anim-char-wobble"
                    : charReaction === "miss"
                      ? "anim-char-sad"
                      : "";
            const lkEx = Math.max(0, (slotRateStats?.luck ?? 0) - BAL.slot.luckBaseline);
            const skEx = Math.max(0, (slotRateStats?.skill ?? 0) - BAL.slot.skillBaseline);
            const luckTier = lkEx >= 50 ? 3 : lkEx >= 30 ? 2 : lkEx >= 10 ? 1 : 0;
            const skillTier = skEx >= 30 ? 2 : skEx >= 10 ? 1 : 0;
            const comboHigh = luckTier >= 1 && skillTier >= 1;
            const spinAuraActive = isSpinning && (luckTier > 0 || skillTier > 0);
            let stageAuraClass = "";
            if (spinAuraActive) {
              if (comboHigh) stageAuraClass = "slot-cabinet-stage--aura-combo";
              else if (luckTier >= 3) stageAuraClass = "slot-cabinet-stage--aura-luck3";
              else if (luckTier === 2) stageAuraClass = "slot-cabinet-stage--aura-luck2";
              else if (luckTier === 1) stageAuraClass = "slot-cabinet-stage--aura-luck1";
              else if (skillTier >= 2) stageAuraClass = "slot-cabinet-stage--aura-skill2";
              else if (skillTier === 1) stageAuraClass = "slot-cabinet-stage--aura-skill1";
            }
            const paylineWinFx = Boolean(showWinEffect);
            const slotSpinActive = isSpinning;
            const displayReelsMatch =
              Array.isArray(gs?.displayReels) &&
              gs.displayReels.length === 3 &&
              gs.displayReels[0] === gs.displayReels[1] &&
              gs.displayReels[0] === gs.displayReels[2];
            const paylineWinPulse =
              !slotSpinActive &&
              reelsCanvasSettled &&
              (paylineWinFx ||
                (gs?.slotPhase === "completed" && displayReelsMatch && (gs?.lastPayout ?? 0) > 0));
            const columnSpinning = [0, 1, 2].map((i) => isSpinning && !reelStoppedFlags[i]);
            const activeMachine = SLOT_MACHINES[visibleMachineKey] ?? SLOT_MACHINES.standard;
            const reelMachineView = slotMachineForReels(activeMachine, (gs?.players?.length ?? 0) > 1);
            const showPayoutNow = reelsCanvasSettled && showPayout && payoutAmount > 0;
            const showWinFxNow = reelsCanvasSettled && showWinEffect && showWinEffect !== "miss";
            const isMajorWinFx = showWinEffect === "jackpot" || showWinEffect === "potJackpot";
            const slotSpinning = isSpinning || (gs?.slotPhase ?? "idle") === "spinning";
            const isVictim = slotSpinning && isLocalPlayerProxyTarget(gs, myId);
            const skillStopHint =
              (skillStopChanseActive || gs?.slotSkillStopActive) &&
              isSpinning &&
              reelStoppedFlags[0] &&
              reelStoppedFlags[1] &&
              !reelStoppedFlags[2];
            const skillAimSymbol = skillStopHint
              ? localReels?.[0] ?? gs?.slotVisualReels?.[0] ?? null
              : null;
            const reelStack = (
              <>
                <div
                  className="absolute inset-0 z-0 rounded-sm bg-[#0a0d14] pointer-events-none slot-cabinet-vector__reel-bg"
                  aria-hidden
                />
                <div className="slot-reel-window absolute inset-0 z-[1] overflow-hidden rounded-sm pointer-events-none">
                  <SlotReelCanvasView
                    ref={reelCanvasRef}
                    reelColumns={reelColumns}
                    columnScrollStrips={spinColumnStrips}
                    columnSkillAimSymbols={
                      skillAimSymbol ? [null, null, skillAimSymbol] : null
                    }
                    columnSpinning={columnSpinning}
                    slipCols={slipAnimCols}
                    bouncingCol={bouncingReel}
                    paylineWinFx={paylineWinPulse}
                    reachCol={isReach ? 2 : -1}
                    machine={reelMachineView}
                    isSpinFrozenRef={spinFreezeCutinUntilRef}
                    spinSessionActive={slotSpinActive}
                    onReelsSettledChange={setReelsCanvasSettled}
                    className="h-full w-full"
                  />
                </div>

                {showPayoutNow && (
                  <div
                    className="pointer-events-none absolute inset-x-0 top-2 z-[15] flex justify-center px-2"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <SlotPayoutAmountLabel
                      amount={payoutAmount}
                      compact
                      onAnimationEnd={() => {
                        setShowPayout(false);
                        setPayoutAmount(0);
                      }}
                    />
                  </div>
                )}

                {spinAuraActive && (
                  <div
                    className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen overflow-hidden rounded-sm"
                    aria-hidden
                  >
                    {(luckTier >= 2 || comboHigh) &&
                      Array.from({ length: comboHigh ? 14 : 10 }, (_, i) => (
                        <span
                          key={`cab-spark-${i}`}
                          className="absolute text-[11px]"
                          style={{
                            left: `${(i * 71 + 13) % 94}%`,
                            top: `${(i * 47 + 11) % 88}%`,
                            opacity: comboHigh ? 0.5 : 0.45,
                            animation: `sparkle ${0.42 + (i % 3) * 0.08}s ease-in-out ${(i % 6) * 0.06}s infinite`,
                            filter: comboHigh ? "drop-shadow(0 0 4px #fde047)" : "drop-shadow(0 0 3px rgba(253,224,71,0.8))",
                          }}
                        >
                          {comboHigh && i % 3 === 0 ? "✨" : "✦"}
                        </span>
                      ))}
                    {skillTier >= 1 && !comboHigh && luckTier === 0 &&
                      Array.from({ length: 8 }, (_, i) => (
                        <span
                          key={`cab-sk-${i}`}
                          className="absolute text-[10px] text-emerald-200/90"
                          style={{
                            left: `${(i * 83 + 19) % 92}%`,
                            top: `${(i * 59) % 86}%`,
                            opacity: 0.4,
                            animation: `auraSparkFloat ${2 + (i % 4) * 0.15}s linear ${i * 0.12}s infinite`,
                          }}
                        >
                          ✦
                        </span>
                      ))}
                  </div>
                )}
              </>
            );
            return (
              <div
                className={`relative rounded-xl border border-amber-400/30 bg-slate-950/60 p-4 isolate overflow-visible ${outerClass} ${showWinFxNow && isMajorWinFx ? "anim-jp-rainbow" : ""} ${isVictim ? "anim-slot-victim-frame" : ""}`}
              >
                {showWinFxNow && (
                  <div className="absolute inset-0 z-[25] pointer-events-none overflow-hidden rounded-xl">
                    {Array.from({ length: isMajorWinFx ? 28 : showWinEffect === "big" ? 16 : 8 }, (_, i) => (
                      <span
                        key={i}
                        style={{
                          position: "absolute",
                          left: `${(i * 97 + 11) % 100}%`,
                          top: "-30px",
                          fontSize: isMajorWinFx ? "1.6rem" : "1.2rem",
                          animation: `coinDrop ${1.4 + ((i * 0.11) % 1.2)}s ${((i * 0.07) % 1.1)}s ease-in forwards`,
                        }}
                      >
                        {isMajorWinFx ? (showWinEffect === "potJackpot" ? ["💰", "🏆", "✨", "🪙"][i % 4] : ["🪙", "⭐", "💎", "✨"][i % 4]) : "🪙"}
                      </span>
                    ))}
                  </div>
                )}

                <div className="relative z-[8] flex flex-col items-center gap-3 w-full">
                  <SlotProxyAccountability gs={gs} myId={myId} isSpinning={isSpinning} variant="inline" />
                  <SlotCabinetShell
                    variant={SLOT_CABINET_VARIANT.VECTOR}
                    cabinetRecoil={cabinetRecoil}
                    stageAuraClass={stageAuraClass}
                    isReach={isReach}
                    skillStopHint={skillStopHint}
                    reelStack={reelStack}
                    spinButton={{
                      title: `スタート（${selectedBet}G）`,
                      "aria-label": `スロットを回す（${selectedBet}G）`,
                      disabled: spectatorMode || !canSpinWithSelectedBet,
                      spectatorMode,
                      onClick: () => handleSpin(selectedBet),
                      label: "START",
                    }}
                    stopButtons={{
                      spinActive: isSpinning,
                      stoppedFlags: reelStoppedFlags,
                      spinStartedAt: spinStartedAtUi,
                      onStopReel: handleManualReelStop,
                      spectatorMode,
                      buttonsLocked: showReachCutin,
                    }}
                  />
                </div>

                <div className="relative z-[12] flex justify-center pointer-events-none mt-2">
                  <CharacterIcon
                    characterType={charType}
                    imgClassName={`h-14 w-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)] ${charClass}`}
                    spanClassName={`text-5xl leading-none inline-block ${charClass}`}
                  />
                </div>

                {showWinFxNow && showWinEffect === "jackpot" && (
                  <p
                    className="relative z-[26] mt-2 text-center text-lg font-black text-amber-300 animate-pulse"
                    style={{ textShadow: "0 0 20px #fbbf24, 0 0 40px #f59e0b" }}
                  >
                    🎰 超大当たり!! 🎰
                  </p>
                )}
                {showWinFxNow && showWinEffect === "potJackpot" && (
                  <p
                    className="relative z-[26] mt-2 text-center text-lg font-black text-lime-300 animate-pulse"
                    style={{ textShadow: "0 0 20px #84cc16, 0 0 40px #65a30d" }}
                  >
                    🏆 POT JACKPOT!! 🏆
                  </p>
                )}
              </div>
            );
          })()}
          <div className="flex flex-col gap-1.5">
            {(cpGs.slotTurnsLeft > 0 || awaitingConfirm) && (
              <div className="w-full rounded-lg bg-amber-500/15 border border-amber-400/35 px-3 py-1.5 text-center">
                <span className="text-lg font-black tabular-nums text-amber-100">
                  残り {remainingThisBurst}/{burst}
                </span>
              </div>
            )}
            <div className="flex gap-3 flex-wrap">
            {awaitingConfirm ? (
              <button
                type="button"
                onClick={handleConfirm}
                disabled={spectatorMode || interactionLocked}
                className={
                  spectatorMode
                    ? `inline-flex items-center gap-2 rounded-xl px-6 py-2.5 font-bold ${spectatorBtn}`
                    : "inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 font-bold text-slate-950 hover:bg-cyan-400 animate-pulse"
                }
              >
                <ChevronRight size={18} />
                確認（{confirmCountdown}秒で自動進行）
              </button>
            ) : (
              <>
                {SLOT_BETS.map((bet) => {
                  const overProxyCap = isProxyPull && !betsForUi.includes(bet);
                  const isSelected = selectedBet === bet;
                  const disabled = !canSelectBet || overProxyCap;
                  const colors = spectatorMode
                    ? spectatorBtn
                    : bet === 100
                      ? "bg-cyan-600 hover:bg-cyan-500"
                      : bet === 300
                        ? "bg-violet-600 hover:bg-violet-500"
                        : bet === 500
                          ? "bg-amber-500 hover:bg-amber-400"
                          : "bg-rose-600 hover:bg-rose-500";
                  const brightnessClass = spectatorMode
                    ? ""
                    : isSelected
                      ? "slot-bet-btn slot-bet-btn--selected opacity-100 brightness-110"
                      : "slot-bet-btn opacity-50 brightness-[0.72] hover:opacity-65 hover:brightness-[0.85]";
                  return (
                    <button
                      key={bet}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedBet(bet)}
                      disabled={disabled}
                      title={
                        overProxyCap && proxyMaxBet != null
                          ? `最大掛け金${proxyMaxBet}Gを超えるため不可`
                          : isSelected
                            ? `掛け金 ${bet}G（選択中）`
                            : `掛け金 ${bet}G に設定`
                      }
                      className={`inline-flex items-center gap-1.5 rounded-xl ${colors} px-4 py-2.5 font-semibold text-white transition-all duration-150 ${brightnessClass} ${spectatorMode ? "" : "disabled:opacity-35"}`}
                    >
                      <Dice5 size={16} />
                      <span className="flex flex-col items-start leading-tight">
                        <span>{bet}G</span>
                        {overProxyCap && (
                          <span className="text-[9px] font-normal opacity-80">上限超過</span>
                        )}
                        {!isProxyPull && moneyGs.stats.money < bet && (
                          <span className="text-[9px] font-normal opacity-80">←借金プレイ</span>
                        )}
                      </span>
                    </button>
                  );
                })}
                {isProxyPull && betsForUi.length === 0 && (
                  <p className="text-xs text-rose-300/90 w-full">
                    標的の所持金が少なすぎてスピンできません（30%上限で100G未満）。
                  </p>
                )}
              </>
            )}
          </div>
          {!spectatorMode && isMyTurn && (
            <Day8ItemBar
              player={cpGs}
              gs={gs}
              isMyTurn={isMyTurn}
              interactionLocked={
                interactionLocked ||
                isSpinning ||
                awaitingConfirm ||
                postSpinPending ||
                !["idle", "completed"].includes(gs?.slotPhase ?? "idle")
              }
              onUseItem={onUseDay8Item}
            />
          )}
        </div>
        </div>
      ) : (
        <div className={`space-y-3${spectatorMode ? " relative min-h-[120px]" : ""}`}>
          {spectatorMode && (
            <div
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
              aria-live="polite"
              aria-label={`${cpGs.name}が操作中`}
            >
              <div className="mx-4 rounded-2xl border border-violet-400/55 bg-slate-950/95 px-8 py-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
                <p className="text-lg font-bold tracking-wide text-violet-100 sm:text-xl">
                  {cpGs.name} が操作中
                </p>
              </div>
            </div>
          )}
          <p className="text-sm text-slate-400">スロット回数を全て使いました。</p>
          {awaitingConfirm && (
            <button
              type="button"
              onClick={handleConfirm}
              disabled={spectatorMode || interactionLocked || !!slotPostResultGraceTimerRef.current}
              className={
                spectatorMode
                  ? `inline-flex items-center gap-2 rounded-xl px-6 py-2.5 font-bold ${spectatorBtn}`
                  : "inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-40"
              }
            >
              <ChevronRight size={18} />
              確認して進む（{confirmCountdown}秒）
            </button>
          )}
        </div>
      )}
      </div>

      {showReachCutin && (
        <div
          className={[
            "slot-reach-cutin-full",
            reachCutinGasing ? "slot-reach-cutin-full--gase" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden
        >
          <div className="slot-reach-cutin-full-speed" />
          <div className="slot-reach-cutin-full-dim" />
          <div className="slot-reach-cutin-full-vignette" />
          <div className="slot-reach-cutin-full-scan slot-reach-cutin-full-scan--top" />
          <div className="slot-reach-cutin-full-scan slot-reach-cutin-full-scan--bottom" />
          <div className="slot-reach-cutin-full-frame" />
          <div className="slot-reach-cutin-full-center">
            <div className="slot-reach-cutin-hero">
              <div className="slot-reach-cutin-hero-bar" aria-hidden />
              {REACH_CUTIN_RIMIRU_TYPES.has(cpGs?.characterType) ? (
                <img
                  alt=""
                  decoding="async"
                  draggable={false}
                  src={`${publicAssetBase}images/chance_rrm.png`}
                  className="select-none"
                  onError={(e) => {
                    const el = e.currentTarget;
                    const step = el.dataset.chanceCutinTry ?? "0";
                    if (step === "0") {
                      el.dataset.chanceCutinTry = "1";
                      el.src = `${publicAssetBase}assets/images/chance_rrm.png`;
                    }
                  }}
                />
              ) : (
                <CharacterIcon
                  characterType={cpGs?.characterType ?? "salaryman"}
                  imgClassName=""
                  spanClassName="select-none block mx-auto text-[clamp(4rem,18vw,8rem)] leading-none drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)]"
                />
              )}
              <div className="slot-reach-cutin-hero-bar slot-reach-cutin-hero-bar--bottom" aria-hidden />
            </div>
            <p className="slot-reach-cutin-full-chance-tag font-black">チャンス！！</p>
          </div>
        </div>
      )}

      {reachCutinFlash && (
        <div className="fixed inset-0 z-[10060] pointer-events-none anim-slot-reach-cutin-white-flash" aria-hidden />
      )}
    </>
  );
}
