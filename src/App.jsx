import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { db } from "./lib/firebase";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  limit,
  getDocs,
  runTransaction,
} from "firebase/firestore";
import { Loader2, TrendingUp, TrendingDown, Trophy, Users } from "lucide-react";

import { CharacterIcon } from "./components/CharacterPieces";
import BoardGamePhase from "./components/BoardGamePhase";
import SoundSettingsControl from "./components/SoundSettingsControl";
import PonCutin from "./components/PonCutin";
import TaxiTrafficJamCutin from "./components/TaxiTrafficJamCutin";
import DailyActionPhase from "./components/DailyActionPhase";
import DailyActionSpectatorMirror from "./components/DailyActionSpectatorMirror";
import DailySlotTrainingModal from "./components/DailySlotTrainingModal";
import FinalBattleStage from "./components/FinalBattleStage";
import Lobby from "./components/Lobby";
import SSRainParticles from "./components/SSRainParticles";
import SlotContainer from "./components/SlotContainer";
import SlotSpinBroadcastOverlay from "./components/SlotSpinBroadcastOverlay";
import Day8SlotSpectatorMirror from "./components/Day8SlotSpectatorMirror";
import ProgressivePotDisplay from "./components/ProgressivePotDisplay";
import TurnManager from "./components/TurnManager";
import WaitingRoom from "./components/WaitingRoom";
import TopRightHud from "./components/TopRightHud";
import CopyClipboardButton from "./components/CopyClipboardButton";
import PlayingPlayerSidebar from "./components/PlayingPlayerSidebar";
import ResultsRoomActions from "./components/ResultsRoomActions";
import AssetHistoryChart from "./components/AssetHistoryChart";
import StreamTypeCutin from "./components/StreamTypeCutin";
import WorkCutin from "./components/WorkCutin";
import { GAME_STYLES } from "./constants/gameAnimationsCss";
import {
  BAL,
  BOARD_GOAL,
  CHARACTERS,
  FINAL_BATTLE_HOST_DELAY_LEGACY_MS,
  FINAL_BATTLE_HOST_PRE_DAY8_MS,
  FINAL_BATTLE_SPLASH_MS,
  INITIAL_PROGRESSGRESSIVE_POT,
  LAST_DAILY_DAY,
  SECRET_RIRIMU_CHARACTER_KEY,
  SECRET_RIRIMU_UNLOCK_PLAYER_NAME,
  STAT_META,
  TILE_EFFECT_KIND,
  isSecretRirimuUnlockedByTrimmedPlayerName,
} from "./constants/gameBalance";
import { STATUS_OVERVIEW_HINTS } from "./constants/statusOverviewHints";
import {
  GAME_TITLE_FULL,
  GAME_TITLE_SHORT,
  GAME_TITLE_WITH_ACRONYM,
  SOLO_PRERELEASE_NOTICE,
  TITLE_LOGO_PATH,
} from "./constants/branding";
import { useFirebaseGame } from "./hooks/useFirebaseGame";
import { useDailyCutinSpectatorSync } from "./hooks/useDailyCutinSpectatorSync";
import {
  buildDailyCutinSessionId,
  DAILY_CUTIN_PHASE,
  DAILY_CUTIN_SYNC_DEFAULTS,
  dailyCutinSpectatorStatusLabel,
  localDailyCutinSpectatorLabel,
  mergeDailyCutinFieldsIntoGameState,
  pickDailyCutinBroadcastFields,
  readDailyCutinBroadcast,
  isDailyCutinBroadcastStale,
  isDailyCutinPhaseOverdue,
  shouldEnableDailyCutinSpectatorSync,
} from "./lib/dailyCutinSync";
import {
  backfillInvitedAuthUids,
  buildCancelInvitePatch,
  buildInviteRoomPatch,
  fetchInviteInboxRoomIds,
  pushInviteInbox,
  registerFullIdIndex,
  removeInviteFromInbox,
  resolveInviteeUid,
} from "./lib/inviteDiscovery";
import useSugorokuMovementFx from "./hooks/useSugorokuMovementFx";
import { applyWorkIncomeToStats } from "./lib/dailyActions/work";
import {
  GAME_PHASE,
  MOVE_PHASE,
  SUB_PHASE,
} from "./constants/gamePhases";
import { applyShrineToStats, rollShrineAmuletDrop } from "./lib/dailyActions/shrine";
import { rollAndApplyStream } from "./lib/dailyActions/stream";
import {
  applyDailySlotSpinsToStats,
  computeDailySlotSkillGainTotal,
  resolveDailySlotPityCounter,
  validateDailySlotSpinResults,
} from "./lib/dailyActions/dailySlot";
import { buildDailyActionFx, DAILY_ACTION_FX_CLEAR_MS, attachDailyActionFxForDailyPhase, clearDailyActionFx } from "./lib/dailyActionFx";
import { buildMovementFx, buildPonVisualPayload, buildTaxiTrafficWaitVisualPayload, buildTaxiVisualPayload, holdMoverForMovementFx, buildOrphanedMovementFxPatch, isMovementFxForPlayer, isTaxiDeferredMovementFx, runTileEffectPresentation, tileEffectExplainDurationMs } from "./lib/sugorokuMovementFx";
import {
  amuletPreActionLine,
  buildDailyActionLogEntry,
  legacyExtrasLine,
  livingExpenseLines,
  ponFireLines,
  ponGainLine,
  ponNoFireLine,
  shrineActionLines,
  slotActionLines,
  streamActionLines,
  workActionLines,
} from "./lib/dailyActionLog";
import { mergeAssetHistoryBuckets } from "./lib/playerAssetHistory";
import {
  canWriteGoalLandingConfirm,
  isActorTurnOnGameState,
  isRoomHost,
  isHostFinalBattleScheduledWrite,
} from "./lib/multiplayerGameStateAuth";
import { createSlotSoundManager } from "./lib/slotSound";
import {
  applyGoalLandingConfirm,
  applyGoalArrivalToPlayer,
  buildNextGsAfterGoalArrival,
  applyRimiruDailyEnd,
  applySplashDamage,
  applyVirtueWave,
  applyDay8SlotSpinToFreshGameState,
  buildDay8SlotSpinningGs,
  buildDay8SlotReloadRecoveryPatch,
  resolveDay8SlotBurstAdvance,
  clamp,
  clampMoney,
  computeAdvanceDaily,
  applyDay8ActorMoveCommit,
  applyDay8LandingStateToLive,
  applyDay8TaxiIntermediateCommit,
  beginDay8SlotSeatForPlayer,
  computeAdvanceDay8Turn,
  computeTaxiCongestedLegDurations,
  computeSugorokuHopDurationMs,
  computeTaxiDriveDurationMs,
  day8SlotMajorWinAdvanceRemainingMs,
  eliminateDay8Player,
  enterDay8AfterFinalBattleCue,
  finalizeToResults,
  genQuickName,
  isGhostPickTargetPhase,
  genRoomId,
  initialGameState,
  isDay8SlotBurstFinishedOnGameState,
  allLobbyMembersReady,
  isLobbySlotConfigured,
  livingCostForPlayer,
  mergeDay8SlotIdleSync,
  normalizeSlotInitialRolls,
  slotSyncReel3StopMs,
  prependLogs,
  rankLabel,
  resolveDay8LandingWithTiles,
  resolveDebtTrapTriggered,
  rollDie,
  toEpochMsMaybe,
  rand,
  DAILY_SLOT_SYNC_DEFAULTS,
} from "./utils/gameLogic";
import { publicAssetUrl } from "./lib/publicAssetUrl";
import { formatFriendlyError } from "./lib/formatFriendlyError";
import {
  buildHostContinueToLobbyPatch,
  buildKickPlayerPatch,
  buildLeaveRoomPatch,
} from "./lib/roomLifecycle";
import { runGhostAutomationStep, finishGhostSlotBurst } from "./lib/ghostPlayerAutomation";
import { tryAcquireGhostAutomationLease } from "./lib/ghostAutomationLease";
import { commitMarkNetworkGhostPatch } from "./lib/markNetworkGhost";
import { applyDay8MoveStepBonus, buildDay8CardMoveEffectMeta } from "./lib/day8ItemEffects";
import { useDay8ItemOnGameState } from "./lib/day8Items";
import { BOARD_DEATH_FADE_MS, delayMs } from "./lib/boardDeathPresentation";
import {
  computeProgressivePotDelta,
  readRoomTotalPot,
  rollInitialProgressivePot,
} from "./lib/progressivePot";
import {
  buildClearSelfPresencePatch,
  buildGracefulLeavePatch,
  clearRoomSession,
  GHOST_AUTOMATION_POLL_MS,
  HEARTBEAT_INTERVAL_MS,
  isTurnAutomatable,
  persistRoomSession,
  PRESENCE_STALE_CHECK_MS,
  readStoredRoomSession,
  shouldRunGhostAutomationController,
} from "./lib/playerPresence";
import {
  applyDay8RoundTracking,
  normalizeCompletedPlayers,
  resolveDay8IsMyTurn,
  shouldMarkDay8TurnComplete,
} from "./lib/day8RoundTracking";
import {
  computeDay7TransitionFxHoldMs,
  DAILY_STREAM_CUTIN_MS,
  DAILY_STREAM_PON_OVERLAY_MS,
  DAILY_STREAM_FAIL_HOLD_MS,
  DAILY_WORK_CUTIN_MS,
  DAILY_WORK_PON_OVERLAY_MS,
  isDailyOutgoingFxActive,
} from "./lib/day7TransitionFx";
import { GAME_ASSET_PRELOAD_PATHS, preloadImages } from "./utils/assetLoader";
/* 筐体が消えない組み合わせ: PNG は SlotMachine import、マスクは index.css の data URL、
   drop-shadow／オーラは .slot-cabinet-img-wrap の filter のみ（img に mask+filter 併用しない） */

const LS_SE_VOL = "pons_se_vol";
const LS_BGM_VOL = "pons_bgm_vol";
const DEFAULT_SE_VOL = 0.82;
const DEFAULT_BGM_VOL = 0.08;
const RIRIMU_UNLOCK_VOICE_FILES = [
  "/sounds/ohayo.mp3",
  "/sounds/yumemitano.mp3",
  "/sounds/full_name.mp3",
];
const RIRIMU_SELECT_SE_FILE = "/sounds/start_rrm.mp3";
const PLAYER_FRAME_COLORS = [
  { border: "border-rose-500/70", activeBorder: "border-rose-400", activeBg: "bg-rose-500/10" },   // red
  { border: "border-sky-500/70", activeBorder: "border-sky-400", activeBg: "bg-sky-500/10" },      // blue
  { border: "border-amber-500/75", activeBorder: "border-amber-400", activeBg: "bg-amber-500/10" }, // yellow
  { border: "border-emerald-500/70", activeBorder: "border-emerald-400", activeBg: "bg-emerald-500/10" }, // green
];

function loadSoundVolume(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    const n = parseFloat(raw);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(0, Math.min(1, n));
  } catch {
    return fallback;
  }
}

function applyFxMoneyRevealToPlayers(players, reveal) {
  if (!reveal || !Array.isArray(players)) return players;
  return players.map((p) =>
    p.id === reveal.playerId ? { ...p, stats: { ...p.stats, money: reveal.moneyAfter } } : p,
  );
}

function isFirestoreAlreadyExistsError(e) {
  return (
    e?.code === "already-exists" ||
    (typeof e?.message === "string" && e.message.toLowerCase().includes("already exists"))
  );
}

/** 6桁IDの衝突時は自動で別IDを再試行 */
async function createRoomWithRetry(createRoomFn, payload, maxAttempts = 8) {
  let lastErr = null;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const rid = genRoomId();
    try {
      await createRoomFn(rid, payload);
      return rid;
    } catch (e) {
      if (isFirestoreAlreadyExistsError(e)) {
        lastErr = e;
        continue;
      }
      throw e;
    }
  }
  throw lastErr ?? new Error("ルームIDの採番に失敗しました");
}

/** 「進む／戻る」マス効果の中間マス（Firestore 先行書き込み用）：go/miss 確定前は移動中で統一 */
function buildDay8TileSlideMidpointPlayers(playersArr, moverIdx, midPos) {
  return playersArr.map((pl, i) =>
    i !== moverIdx
      ? pl
      : {
          ...pl,
          position: midPos,
          movePhase: MOVE_PHASE.moving,
          slotTurnsLeft: 0,
          slotPullsGranted: 0,
          slotPullsThisSeat: 0,
        },
  );
}

const GHOST_SLOT_ADVANCE_COOLDOWN_MS = 3_000;
const RETURN_TO_LOBBY_LABEL = "タイトル画面へ";
const RETURN_TO_LOBBY_HINT =
  "ゲームはルーム内で続行されます（退室ボタンとは異なります）";

/** 7日目ラスト→決戦直前：書き込み前に育成画面のままステータス・ログだけ反映（決戦UIへは即切り替えない） */
function buildDay7DailyOptimisticGs(nextGs, sourceGs, advancesToSugoroku) {
  if (!advancesToSugoroku) return nextGs;
  const o = { ...nextGs };
  delete o.finalBattleStartedAt;
  delete o.finalBattleEntry;
  return {
    ...o,
    gamePhase: GAME_PHASE.playing,
    subPhase: SUB_PHASE.daily,
    currentDay: LAST_DAILY_DAY,
    currentPlayerIdx: sourceGs.currentPlayerIdx,
  };
}

export default function App() {
  // ─── 識別子・ルーム ────────────────────────────────────────────────────
  const [uiError, setUiError]   = useState("");
  const {
    myId,
    authReady,
    roomId,
    setRoomId,
    roomData,
    roomPlayers,
    updateRoom,
    updateRoomById,
    createRoom,
    fetchRoom,
    updateCurrentAction,
  } = useFirebaseGame(setUiError);
  const roomDataRef = useRef(null);
  /** タクシー／決戦ホスト等、定義より前に登録された effect から gameState 更新へ */
  const performGameStateUpdateRef = useRef(async () => false);
  const [myName, setMyName]     = useState("");
  // 4桁タグ（アプリ起動ごとに生成、セッション中は固定）
  const [myTag]                 = useState(() => String(Math.floor(1000 + Math.random() * 9000)));
  const [joinInput, setJoinInput] = useState("");
  const [screen, setScreen]     = useState("entry"); // entry|lobby|waiting|playing|gameover|results
  /** 待機室へ入るたびに増やし、ステータス抽選UIのローカル表示とグラフをリセットする */
  const [waitingSessionKey, setWaitingSessionKey] = useState(0);
  const [loading, setLoading]   = useState(false);
  /** ロビー／開始系ボタンの二重送信防止（loading state は非同期反映なので ref で同期ガード） */
  const lobbyActionBusyRef = useRef(false);
  /** ゲーム中アクションの連打・描画反映前の二重クリック防止（直近操作からの最小間隔） */
  const lastTurnActionAtRef = useRef(0);
  const [invitesLoading, setInvitesLoading] = useState(false);
  const [invitesProbeReady, setInvitesProbeReady] = useState(false);
  const [invitesPanelOpen, setInvitesPanelOpen] = useState(false);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [resultsRoomActionLoading, setResultsRoomActionLoading] = useState(false);
  const [kickLoading, setKickLoading] = useState(false);
  const [cancelInviteLoading, setCancelInviteLoading] = useState(null);
  const [leaveGameLoading, setLeaveGameLoading] = useState(false);
  const [leaveGameConfirmOpen, setLeaveGameConfirmOpen] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const hadRoomDataRef = useRef(false);
  /** hadRoomDataRef が立った roomId（別ルーム作成中の一瞬 null と区別する） */
  const roomIdWithDataRef = useRef(null);
  const wasLobbyPlayerRef = useRef(false);
  const lobbyInviteAutoProbeDoneRef = useRef(false);
  const ghostAutomationBusyRef = useRef(false);
  const ghostSlotAdvanceCooldownRef = useRef(0);
  const leaveInFlightRef = useRef(false);
  const reconnectAttemptedRef = useRef(false);
  // 招待制ルーム関連
  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [inviteInput, setInviteInput]     = useState("");
  const [inviteError, setInviteError]     = useState("");
  const [copied, setCopied]               = useState(false);
  const [seVolume, setSeVolume]           = useState(() => loadSoundVolume(LS_SE_VOL, DEFAULT_SE_VOL));
  const [bgmVolume, setBgmVolume]         = useState(() => loadSoundVolume(LS_BGM_VOL, DEFAULT_BGM_VOL));
  // モード選択画面
  const [multiAction, setMultiAction]     = useState(null); // null|"create"|"join"
  const [assetsReady, setAssetsReady] = useState(false);
  const [assetsProgress, setAssetsProgress] = useState({ loaded: 0, total: GAME_ASSET_PRELOAD_PATHS.length });

  useEffect(() => {
    let cancelled = false;
    void preloadImages(GAME_ASSET_PRELOAD_PATHS, ({ loaded, total }) => {
      if (cancelled) return;
      setAssetsProgress({ loaded, total });
    }).finally(() => {
      if (cancelled) return;
      setAssetsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // ─── アニメーション（ローカルのみ）────────────────────────────────────
  const [isDiceRolling, setIsDiceRolling] = useState(false);
  const [localDice, setLocalDice]         = useState([]);
  const [diceShuffleValues, setDiceShuffleValues] = useState([]); // シャッフル中の仮表示値
  const [diceConfirmed,  setDiceConfirmed]  = useState([]);        // 各ダイスの確定フラグ
  const [isLuckyRoll,   setIsLuckyRoll]    = useState(false);      // アドバンテージロール判定
  const [showDiceTotal, setShowDiceTotal]  = useState(false);      // 合計表示フラグ
  const soundRef           = useRef(null);
  const managedAudioRef = useRef({ unlock: null, select: null });
  const ririmuUnlockVoicePlayedRef = useRef(false);
  const [taxiPhase, setTaxiPhase] = useState(null); // null|"taxiHail"|"enter"|"boarding"|"ride"|"driveBeforeJam"|"trafficJam"|"driveAfterJam"|"drive"|"arrive"
  /** 渋滞カットイン直後の「のろのろドライブ」で背景・演出を遅くする */
  const [taxiDriveCongested, setTaxiDriveCongested] = useState(false);
  const [shakeScreen,  setShakeScreen]  = useState(false);
  const [pieceHopping, setPieceHopping] = useState(false);
  const [shrinePhase,  setShrinePhase]  = useState(null); // null|"in"|"out"
  const [showLuckyDice, setShowLuckyDice] = useState(false);
  const taxiGSRef = useRef(null); // タクシー確定後に drive 終了時に書き込む gameState
  /** タクシー drive 完了時に liveGs へ載せる移動コミット（手番進行はここで1回だけ） */
  const taxiDay8CommitRef = useRef(null);
  /** 借金トラップ脱落前に載せる移動結果（drive／ホップ完了後） */
  const movementDay8DeathCommitRef = useRef(null);
  /** マス効果追いマス：1回目書き込み後に最終 gameState を送る */
  const taxiGSFollowUpRef = useRef(null);
  const taxiDriveDurationMsRef = useRef(2600);
  /** タクシー drive 中のカメラ終点（Firestore 反映前の視覚用） */
  const [taxiDriveEndPos, setTaxiDriveEndPos] = useState(null);
  const [taxiDriveDurationMs, setTaxiDriveDurationMs] = useState(2600);
  /** 渋滞分割時のワールド中点（smoothPos）。null で単一路線 drive */
  const [taxiJamMidPos, setTaxiJamMidPos] = useState(null);
  /** enter/boarding/ride 以外の時間指定フェーズ用の現在 ms（drive*  Leg） */
  const [taxiDriveActiveMs, setTaxiDriveActiveMs] = useState(2600);
  const taxiSecondLegMsRef = useRef(0);
  /** 今回のタクシー操作で渋滞2ターン化したか（ride→trafficJam→drive の分岐用） */
  const pendingTaxiCongestionRef = useRef(false);
  /** 今回のタクシー演出の操作者（drive 完了書き込みで手番が進んだら arrive を出さない判定用） */
  const taxiActorPlayerIdRef = useRef(null);
  const [taxiActorPlayerId, setTaxiActorPlayerId] = useState(null);
  /** 観戦側：タクシー1区画 drive 後のマス効果追いマス（Firestore 書き込みなし） */
  const taxiSpectatorTileFollowUpRef = useRef(null);
  /** 観戦側 PON カットイン（Firestore 書き込みなし） */
  const ponSpectatorOnlyRef = useRef(false);
  const pendingSpectatorPonVisualRef = useRef(null);
  const lastSpectatorMovementFxFollowUpIdRef = useRef(null);
  /** PON転倒カットイン後に書き込む gameState（転倒時のみ） */
  const ponCutinCommitRef = useRef(null);
  const ponCutinFinalizeRef = useRef(async () => {});
  /** Firestore 反映前のすごろく表示マス（転倒ストップ地点） */
  const [boardViewPosOverride, setBoardViewPosOverride] = useState(null);
  /** { characterType } — 非 null でカットイン表示 */
  const [ponCutin, setPonCutin] = useState(null);
  /** { title, lines } — すごろくマス効果の短いポップアップ */
  const [sugorokuTileFxToast, setSugorokuTileFxToast] = useState(null);
  /** マス効果のお金±表示後、Firestore 反映前に UI だけ資金を更新 */
  const [fxMoneyReveal, setFxMoneyReveal] = useState(null);
  /** タクシー追いマス等 movementFx 外での盤面 ±G 浮動表示 */
  const [boardMoneyFloatDelta, setBoardMoneyFloatDelta] = useState(null);
  const movementFxFinalMoneyRef = useRef(null);
  /** PON転倒：マスホップ完了後にのみ BoardViewport からコールバックを受ける */
  const [ponHopCompleteEnabled, setPonHopCompleteEnabled] = useState(false);
  const ponHopGateRef = useRef(false);
  /** PON転倒＋「進む／戻る」マス効果：第2ホップ前に解除 */
  const ponTileSlideTimerRef = useRef(null);
  /** movementFx 完了後に手番プレイヤーだけが実行する Firestore コミット */
  const movementFxPendingCommitRef = useRef(null);
  const movementFxRecoveryKeyRef = useRef(null);
  /** タクシー書き込み直後にマス効果トーストを表示 */
  const pendingSugorokuTileFxToastRef = useRef(null);
  const pendingTileEffectMetaRef = useRef(null);
  const sugorokuTileFxToastTimerRef = useRef(null);
  /** 7日目デイリー：Firestore 同期前に一覧・ログへ結果を反映（仕事・配信・神社・デイリースロット） */
  const [day7DailyOptimisticGs, setDay7DailyOptimisticGs] = useState(null);
  /** 8日目アイテムゲート：Firestore 同期前にゲートを閉じて操作可能にする */
  const [day8ItemOptimisticGs, setDay8ItemOptimisticGs] = useState(null);
  /** 配信失敗（日常）全画面カットイン */
  const [streamFailOverlay, setStreamFailOverlay] = useState(false);
  const streamFailOverlayTimerRef = useRef(null);
  /** 仕事・PON発火（弁償）カットイン＋収支テキスト（null で非表示） */
  const [workPonHud, setWorkPonHud] = useState(null);
  const workPonFireOverlayTimerRef = useRef(null);
  /** 配信・PON発火（大炎上）カットイン */
  const [streamPonFireOverlay, setStreamPonFireOverlay] = useState(false);
  const streamPonFireOverlayTimerRef = useRef(null);
  /** 日常配信・雑談／ゲーム種別決定後の画像カットイン — { mode, gold, stat? } */
  const [streamTypeCutin, setStreamTypeCutin] = useState(null);
  const streamCutinTimerRef = useRef(null);
  /** 配信：カットイン→PON→失敗の順用の遅延キュー */
  const streamFxChainTimeoutsRef = useRef([]);
  /** 日常仕事：カットイン→PON の順 — { gold, stat? } */
  const [workCutin, setWorkCutin] = useState(null);
  const workCutinTimerRef = useRef(null);
  const workFxChainTimeoutsRef = useRef([]);
  const dailyCutinSessionIdRef = useRef(null);
  const pendingDailyCutinBroadcastRef = useRef(null);
  /** マルチ日常：カットイン終了後にターン進行 writeGS を送る */
  const pendingDailyTurnWriteRef = useRef(null);
  const dailyTurnWriteTimerRef = useRef(null);
  const lastSelfGhostClearAttemptRef = useRef(0);
  const [turnChangeBannerTurns, setTurnChangeBannerTurns] = useState(null);
  const [pendingTurnBannerTurns, setPendingTurnBannerTurns] = useState(null);
  const [dailySlotOpen, setDailySlotOpen] = useState(false);
  const [dailySlotSyncSessionId, setDailySlotSyncSessionId] = useState(null);
  /** 8日目：残りラウンド（room.remainingTurns）が減ったときにターン変更カットインを予約（ソロ・マルチ共通） */
  const prevDay8RemainingTurnsRef = useRef(null);
  const turnChangeBannerTimerRef = useRef(null);
  const turnChangeBannerDelayTimerRef = useRef(null);
  /** 8日目：移動／タクシー／PON など視覚演出中はターン切替カットインを出さない（同期 ref） */
  const day8VisualActionLockRef = useRef(false);
  const deferredTurnBannerTurnsRef = useRef(null);
  const taxiVisualActiveRef = useRef(false);
  const [day8VisualActionLocked, setDay8VisualActionLocked] = useState(false);
  const [turnBannerFlushEpoch, setTurnBannerFlushEpoch] = useState(0);
  const pieceHoppingClearTimerRef = useRef(null);
  const [gameOverSplashMsg, setGameOverSplashMsg] = useState(null);
  const gameOverSplashTimerRef = useRef(null);
  /** 盤上死亡演出（人助けダイアログ → フェード → 墓標のあと Firestore 反映） */
  const [boardDeathPresentation, setBoardDeathPresentation] = useState(null);
  const [deathFadeHandledIds, setDeathFadeHandledIds] = useState([]);
  const pendingBoardDeathCommitRef = useRef(null);
  const boardDeathConfirmBusyRef = useRef(false);

  const stopManagedAudio = useCallback((key) => {
    const audio = managedAudioRef.current[key];
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    managedAudioRef.current[key] = null;
  }, []);

  const playManagedAudio = useCallback(
    (key, src) => {
      stopManagedAudio(key);
      const audio = new Audio(publicAssetUrl(src));
      audio.preload = "auto";
      audio.volume = Math.max(0, Math.min(1, seVolume));
      audio.onended = () => {
        if (managedAudioRef.current[key] === audio) managedAudioRef.current[key] = null;
      };
      audio.onerror = () => {
        if (managedAudioRef.current[key] === audio) managedAudioRef.current[key] = null;
      };
      managedAudioRef.current[key] = audio;
      void audio.play().catch(() => {
        if (managedAudioRef.current[key] === audio) managedAudioRef.current[key] = null;
      });
    },
    [seVolume, stopManagedAudio],
  );

  const playRirimuSelectionSe = useCallback(() => {
    playManagedAudio("select", RIRIMU_SELECT_SE_FILE);
  }, [playManagedAudio]);

  /** メニューBGM 等の自動再生解除を、ボタン操作と同じクリックで済ませる */
  const resumeSoundFromUserGesture = useCallback(() => {
    soundRef.current?.resumeFromUserGesture?.();
  }, []);

  /** すごろく駒ホップ中はターン変更カットイン等を抑止する（所要は gameLogic のホップ時間に合わせる） */
  const schedulePieceHopBlockingMs = useCallback((ms) => {
    if (pieceHoppingClearTimerRef.current) {
      clearTimeout(pieceHoppingClearTimerRef.current);
      pieceHoppingClearTimerRef.current = null;
    }
    setPieceHopping(true);
    const safe = Math.max(80, Math.ceil(Number(ms) || 0));
    pieceHoppingClearTimerRef.current = setTimeout(() => {
      pieceHoppingClearTimerRef.current = null;
      setPieceHopping(false);
    }, safe);
  }, []);

  const queueDay8TurnChangeBanner = useCallback((turnsLeft) => {
    if (typeof turnsLeft !== "number" || !Number.isFinite(turnsLeft)) return;
    const v = Math.max(0, Math.floor(turnsLeft));
    if (day8VisualActionLockRef.current) {
      deferredTurnBannerTurnsRef.current = v;
      return;
    }
    setPendingTurnBannerTurns(v);
  }, []);

  const beginDay8VisualAction = useCallback(() => {
    day8VisualActionLockRef.current = true;
    setDay8VisualActionLocked(true);
    if (turnChangeBannerDelayTimerRef.current) {
      clearTimeout(turnChangeBannerDelayTimerRef.current);
      turnChangeBannerDelayTimerRef.current = null;
    }
    if (turnChangeBannerTimerRef.current) {
      clearTimeout(turnChangeBannerTimerRef.current);
      turnChangeBannerTimerRef.current = null;
    }
    setTurnChangeBannerTurns(null);
  }, []);

  const releaseDay8VisualActionLock = useCallback(() => {
    const hadDeferred = deferredTurnBannerTurnsRef.current != null;
    day8VisualActionLockRef.current = false;
    setDay8VisualActionLocked(false);
    if (hadDeferred) {
      setPendingTurnBannerTurns(deferredTurnBannerTurnsRef.current);
      deferredTurnBannerTurnsRef.current = null;
    }
    if (hadDeferred) setTurnBannerFlushEpoch((n) => n + 1);
  }, []);

  useEffect(() => {
    const isUnlockedNow = isSecretRirimuUnlockedByTrimmedPlayerName(myName);
    if (!isUnlockedNow || ririmuUnlockVoicePlayedRef.current) return;
    const idx = Math.floor(Math.random() * RIRIMU_UNLOCK_VOICE_FILES.length);
    const pick = RIRIMU_UNLOCK_VOICE_FILES[idx] ?? RIRIMU_UNLOCK_VOICE_FILES[0];
    ririmuUnlockVoicePlayedRef.current = true;
    playManagedAudio("unlock", pick);
  }, [myName, playManagedAudio]);

  useEffect(
    () => () => {
      stopManagedAudio("unlock");
      stopManagedAudio("select");
    },
    [stopManagedAudio],
  );

  // ─── 派生値 ──────────────────────────────────────────────────────────
  const myFullId    = myName.trim() ? `${myName.trim()}#${myTag}` : "";  // Name#1234 形式
  const roomGs      = roomData?.gameState ?? null;
  const dailyOutgoingFxActive = isDailyOutgoingFxActive({
    streamTypeCutin,
    streamPonFireOverlay,
    streamFailOverlay,
    workCutin,
    workPonHud,
    shrinePhase,
  });
  const day7DailyOptimisticActive =
    day7DailyOptimisticGs != null && roomGs?.subPhase === SUB_PHASE.daily;
  const day8ItemOptimisticActive =
    day8ItemOptimisticGs != null && roomGs?.subPhase === SUB_PHASE.day8;
  const gs =
    day7DailyOptimisticActive && day7DailyOptimisticGs
      ? day7DailyOptimisticGs
      : day8ItemOptimisticActive && day8ItemOptimisticGs
        ? day8ItemOptimisticGs
        : roomGs;
  const playerSlots = roomData?.playerSlots ?? [];
  const isHost      = roomData?.hostId === myId;
  const day7DailyWritePending = day7DailyOptimisticActive;
  roomDataRef.current = roomData;
  const rawIsMyTurn =
    !!roomGs &&
    roomGs.players?.[roomGs.currentPlayerIdx]?.id === myId &&
    !day7DailyWritePending;
  const roomCompletedPlayers = normalizeCompletedPlayers(roomData?.completedPlayers);
  const myPlayerAlive = roomGs?.players?.find((p) => p.id === myId)?.alive !== false;
  const isMyDay8RoundCompleted =
    roomGs?.gamePhase === GAME_PHASE.playing &&
    roomGs?.subPhase === SUB_PHASE.day8 &&
    !!myId &&
    myPlayerAlive &&
    roomCompletedPlayers.includes(myId);
  const cpFromRoom = roomGs?.players?.[roomGs?.currentPlayerIdx];
  const roomDay8Active =
    roomGs?.gamePhase === GAME_PHASE.playing && roomGs?.subPhase === SUB_PHASE.day8;
  const playingMainRoom = roomGs?.gamePhase === GAME_PHASE.playing;
  const isMyTurn = resolveDay8IsMyTurn({
    rawIsMyTurn,
    isMyDay8RoundCompleted,
    cpIsSlot: playingMainRoom && roomGs?.subPhase === SUB_PHASE.day8 && cpFromRoom?.movePhase === MOVE_PHASE.arrived,
    cpIsWaitingSlot:
      playingMainRoom && roomGs?.subPhase === SUB_PHASE.day8 && cpFromRoom?.movePhase === MOVE_PHASE.waitingSlot,
    cpIsGhostPick:
      playingMainRoom && roomGs?.subPhase === SUB_PHASE.day8 && isGhostPickTargetPhase(cpFromRoom),
    cpIsMoving:
      playingMainRoom && roomGs?.subPhase === SUB_PHASE.day8 && cpFromRoom?.movePhase === MOVE_PHASE.moving && cpFromRoom?.alive !== false,
    cpIsGoalLanding:
      playingMainRoom && roomGs?.subPhase === SUB_PHASE.day8 && cpFromRoom?.movePhase === MOVE_PHASE.goalLanding,
  });
  const ghostPickIsMyTurn =
    rawIsMyTurn && roomDay8Active && isGhostPickTargetPhase(cpFromRoom);
  const cpGs = useMemo(() => {
    const src =
      roomGs?.subPhase === SUB_PHASE.day8 && roomGs?.gamePhase === GAME_PHASE.playing ? roomGs : gs;
    if (!src) return null;
    const players = applyFxMoneyRevealToPlayers(src.players, fxMoneyReveal);
    return players[src.currentPlayerIdx] ?? null;
  }, [gs, roomGs, fxMoneyReveal]);
  const gsPlayersForUi = useMemo(
    () => applyFxMoneyRevealToPlayers(gs?.players, fxMoneyReveal) ?? [],
    [gs?.players, fxMoneyReveal],
  );
  const day8RemainingTurns =
    Number.isFinite(Number(roomData?.remainingTurns)) && Number(roomData?.remainingTurns) >= 0
      ? Math.floor(Number(roomData?.remainingTurns))
      : Math.max(0, BAL.dice.maxTurns - Number(cpGs?.moveTurns ?? 0));
  const gsRef       = useRef(roomGs);
  gsRef.current     = roomGs;
  const displayDice  = isDiceRolling ? localDice : (gs?.lastDiceRolls ?? []);
  const playingMain = gs?.gamePhase === GAME_PHASE.playing;
  const isMultiplayerRoom = (gs?.players?.length ?? 0) > 1 && !roomData?.isSolo;
  /** gamePhase だけ欠けた古いスナップショットでも演出を出す */
  const isFinalBattleUIMode =
    (gs?.gamePhase === GAME_PHASE.finalBattle || gs?.subPhase === SUB_PHASE.finalBattle) && !dailyOutgoingFxActive;
  const showSugorokuBoard =
    !dailyOutgoingFxActive && (roomGs?.subPhase ?? gs?.subPhase) !== "daily";
  const cpIsWaitingSlot =
    roomDay8Active
      ? cpFromRoom?.movePhase === MOVE_PHASE.waitingSlot
      : playingMain && gs?.subPhase === SUB_PHASE.day8 && cpGs?.movePhase === MOVE_PHASE.waitingSlot;
  /** 手番が別プレイヤーでも、自分が goalLanding なら GOAL 確認 UI を出す（ソロのみ） */
  const goalLandingSelf =
    playingMain && gs?.subPhase === SUB_PHASE.day8 && myId && !isMultiplayerRoom
      ? gs.players?.find((pl) => pl.id === myId && pl.movePhase === MOVE_PHASE.goalLanding) ?? null
      : null;
  const anyGoalLandingPlayer =
    playingMain && gs?.subPhase === SUB_PHASE.day8 && !isMultiplayerRoom
      ? gs.players?.find((pl) => pl.movePhase === MOVE_PHASE.goalLanding) ?? null
      : null;
  const cpIsSlot =
    roomDay8Active
      ? cpFromRoom?.movePhase === MOVE_PHASE.arrived
      : playingMain && gs?.subPhase === SUB_PHASE.day8 && cpGs?.movePhase === MOVE_PHASE.arrived;
  const cpIsNetworkAutomatedTurn =
    !!cpGs &&
    (cpGs.isGameOver === true || (cpGs.isGhost === true && cpGs.alive !== false));
  const cpIsSpectatorSlotMirrorExcluded = cpGs?.isGameOver === true;
  const slotPhase = gs?.slotPhase ?? "idle";
  /** 8日目スロット：手番以外に idle〜結果まで共有表示（マルチのみ） */
  const showDay8SlotSpectatorMirror =
    playingMain &&
    gs?.subPhase === SUB_PHASE.day8 &&
    isMultiplayerRoom &&
    !rawIsMyTurn &&
    !isMyTurn &&
    cpIsSlot &&
    !cpIsSpectatorSlotMirrorExcluded;
  const showSlotSpinBroadcastMirror =
    playingMain &&
    gs?.subPhase === SUB_PHASE.day8 &&
    (slotPhase === "spinning" || slotPhase === "completed") &&
    !(isMyTurn && cpIsSlot && !cpIsNetworkAutomatedTurn) &&
    !showDay8SlotSpectatorMirror;
  const showProgressivePotHud =
    playingMain &&
    gs?.subPhase === SUB_PHASE.day8 &&
    (gs?.players?.length ?? 0) > 1 &&
    !roomData?.isSolo;
  const cpIsGhostPick =
    roomDay8Active
      ? isGhostPickTargetPhase(cpFromRoom)
      : playingMain && gs?.subPhase === SUB_PHASE.day8 && isGhostPickTargetPhase(cpGs);
  const isDay8Moving =
    roomDay8Active
      ? cpFromRoom?.movePhase === MOVE_PHASE.moving && cpFromRoom?.alive !== false
      : playingMain && gs?.subPhase === SUB_PHASE.day8 && cpGs?.movePhase === MOVE_PHASE.moving && cpGs?.alive !== false;
  const boardProgress = cpGs ? Math.min(100, (cpGs.position / BOARD_GOAL) * 100) : 0;
  const day8DiceRollCount = Array.isArray(gs?.lastDiceRolls) ? gs.lastDiceRolls.length : 0;

  const handleMovementFxSequenceCompleteRef = useRef(async () => {});

  const showTileEffectExplain = useCallback((tileEffect) => {
    const lines = (tileEffect?.titles ?? []).filter(
      (line) => typeof line === "string" && !/^[+-]\d+G$/.test(line.trim()),
    );
    if (!lines.length) return;
    if (sugorokuTileFxToastTimerRef.current) clearTimeout(sugorokuTileFxToastTimerRef.current);
    setSugorokuTileFxToast({ lines, kind: tileEffect?.kind ?? null });
    sugorokuTileFxToastTimerRef.current = setTimeout(() => {
      setSugorokuTileFxToast(null);
      sugorokuTileFxToastTimerRef.current = null;
    }, tileEffectExplainDurationMs(tileEffect) + 300);
  }, []);

  const handleTileEffectMoneyApplied = useCallback((fx) => {
    const moneyAfter = movementFxFinalMoneyRef.current?.moneyAfter;
    if (!fx?.playerId || moneyAfter == null) return;
    setFxMoneyReveal({ playerId: fx.playerId, moneyAfter });
  }, []);

  const movementFxSync = useSugorokuMovementFx({
    movementFx: roomGs?.movementFx ?? null,
    currentPlayerId: cpGs?.id ?? null,
    currentPlayerPosition: cpGs?.position ?? null,
    schedulePieceHopBlockingMs,
    onSequenceComplete: (fx) => handleMovementFxSequenceCompleteRef.current(fx),
    onTileExplain: showTileEffectExplain,
    onMoneyApplied: handleTileEffectMoneyApplied,
  });

  /** 8日目移動中は観戦者にも盤面を見せ、フルスクリーン待ち UI は出さない */
  const isDay8SharedMoveWatch =
    isDay8Moving && !isMyTurn && !goalLandingSelf;
  const isDailyPhase = playingMain && gs?.subPhase === SUB_PHASE.daily;
  const dailySlotPhase = roomGs?.dailySlotPhase ?? "idle";
  const dailyCutinBroadcast = useMemo(
    () => readDailyCutinBroadcast(roomData, roomGs),
    [
      roomData?.dailyCutinPhase,
      roomData?.dailyCutinSessionId,
      roomData?.dailyCutinPayload,
      roomGs?.dailyCutinPhase,
      roomGs?.dailyCutinSessionId,
      roomGs?.dailyCutinPayload,
    ],
  );
  const dailyCutinPhase = dailyCutinBroadcast.phase;
  /** 1〜7日目：他プレイヤーのデイリースロット筐体を同期表示 */
  const showDailySlotSpectatorMirror =
    isDailyPhase && isMultiplayerRoom && !isMyTurn && !!cpGs && dailySlotPhase !== "idle";
  /** 最終育成日の楽観 write 待ち中は操作者側の観戦同期を止める（idle がローカル cutin を消す） */
  const operatorPendingDailyCutinSession =
    day7DailyWritePending && dailyCutinSessionIdRef.current != null;
  const spectatorCutinSyncEnabled = shouldEnableDailyCutinSpectatorSync({
    isDailyPhase,
    isMultiplayerRoom,
    isMyTurn,
    showDailySlotSpectatorMirror,
    operatorPendingDailyCutinSession,
  });
  /** 1〜7日目：仕事・配信・神社カットイン観戦 */
  const spectatorDailyCutinUiActive =
    isDailyPhase &&
    isMultiplayerRoom &&
    !isMyTurn &&
    !showDailySlotSpectatorMirror &&
    (dailyCutinPhase !== "idle" ||
      workCutin != null ||
      streamTypeCutin != null ||
      shrinePhase != null ||
      workPonHud != null ||
      streamPonFireOverlay ||
      streamFailOverlay);
  const showDailyCutinSpectator = spectatorDailyCutinUiActive;
  const dailyCutinSpectatorBannerLabel =
    dailyCutinSpectatorStatusLabel(dailyCutinPhase, cpGs?.name) ??
    localDailyCutinSpectatorLabel(cpGs?.name, {
      workCutin,
      streamTypeCutin,
      shrinePhase,
      workPonHud,
      streamPonFireOverlay,
      streamFailOverlay,
    });
  /** 1〜7日目：手番以外に行動選択 UI をミラー表示（マルチのみ） */
  const showDailyActionSpectatorMirror =
    isDailyPhase &&
    isMultiplayerRoom &&
    !isMyTurn &&
    !!cpGs &&
    !goalLandingSelf;
  const hideBlockingObserverWait =
    isDay8SharedMoveWatch ||
    showDailyActionSpectatorMirror ||
    showDailySlotSpectatorMirror ||
    showDay8SlotSpectatorMirror;

  const clearDailyCutinLocalState = useCallback(() => {
    setStreamTypeCutin(null);
    setWorkCutin(null);
    setWorkPonHud(null);
    setStreamPonFireOverlay(false);
    setStreamFailOverlay(false);
    setShrinePhase(null);
  }, []);

  /** 1〜7日目のカットイン・タイマーを全解除（8日目以降へ進む前に必須） */
  const resetDailyOutgoingFxState = useCallback(() => {
    streamFxChainTimeoutsRef.current.forEach(clearTimeout);
    streamFxChainTimeoutsRef.current = [];
    workFxChainTimeoutsRef.current.forEach(clearTimeout);
    workFxChainTimeoutsRef.current = [];
    if (streamCutinTimerRef.current) {
      clearTimeout(streamCutinTimerRef.current);
      streamCutinTimerRef.current = null;
    }
    if (workCutinTimerRef.current) {
      clearTimeout(workCutinTimerRef.current);
      workCutinTimerRef.current = null;
    }
    if (streamPonFireOverlayTimerRef.current) {
      clearTimeout(streamPonFireOverlayTimerRef.current);
      streamPonFireOverlayTimerRef.current = null;
    }
    if (streamFailOverlayTimerRef.current) {
      clearTimeout(streamFailOverlayTimerRef.current);
      streamFailOverlayTimerRef.current = null;
    }
    if (workPonFireOverlayTimerRef.current) {
      clearTimeout(workPonFireOverlayTimerRef.current);
      workPonFireOverlayTimerRef.current = null;
    }
    if (dailyTurnWriteTimerRef.current) {
      clearTimeout(dailyTurnWriteTimerRef.current);
      dailyTurnWriteTimerRef.current = null;
    }
    pendingDailyTurnWriteRef.current = null;
    dailyCutinSessionIdRef.current = null;
    pendingDailyCutinBroadcastRef.current = null;
    clearDailyCutinLocalState();
  }, [clearDailyCutinLocalState]);

  useDailyCutinSpectatorSync({
    enabled: spectatorCutinSyncEnabled,
    cutinBroadcast: dailyCutinBroadcast,
    soundRef,
    setWorkCutin,
    setWorkPonHud,
    setStreamTypeCutin,
    setStreamPonFireOverlay,
    setStreamFailOverlay,
    setShrinePhase,
    setShakeScreen,
    onClearLocalCutins: clearDailyCutinLocalState,
  });

  /** 手番外でも movementFx / ホップ / タクシー中はカメラを共有（view-only） */
  const day8SharedCameraActive =
    isDay8Moving &&
    (movementFxSync.isRunning ||
      isMovementFxForPlayer(roomGs?.movementFx, cpGs) ||
      pieceHopping ||
      taxiPhase != null);

  const day8FxLocked =
    isDiceRolling ||
    movementFxSync.isRunning ||
    taxiPhase != null ||
    pieceHopping ||
    !!ponCutin ||
    !!sugorokuTileFxToast ||
    turnChangeBannerTurns != null ||
    pendingTurnBannerTurns != null ||
    day8VisualActionLocked;

  const day8ActionLocked = day8FxLocked;

  const sugorokuBoardViewPos = useMemo(() => {
    const canUseLocalViewOverride = isMyTurn || goalLandingSelf || day8SharedCameraActive;
    if (taxiPhase != null) {
      if (typeof boardViewPosOverride === "number" && canUseLocalViewOverride) {
        return boardViewPosOverride;
      }
      return null;
    }
    if (
      typeof movementFxSync.viewPosOverride === "number" &&
      movementFxSync.viewPosOverridePlayerId === cpGs?.id
    ) {
      return movementFxSync.viewPosOverride;
    }
    if (typeof boardViewPosOverride === "number" && canUseLocalViewOverride) {
      return boardViewPosOverride;
    }
    return null;
  }, [
    taxiPhase,
    movementFxSync.viewPosOverride,
    movementFxSync.viewPosOverridePlayerId,
    movementFxSync.isRunning,
    roomGs?.movementFx,
    cpGs,
    boardViewPosOverride,
    isMyTurn,
    goalLandingSelf,
    day8SharedCameraActive,
  ]);

  /** ターン操作系ボタンの連打／描画反映前の二重発火を無視（true=受理） */
  const TURN_ACTION_DEBOUNCE_MS = 500;
  const acceptTurnAction = () => {
    const now = Date.now();
    if (now - lastTurnActionAtRef.current < TURN_ACTION_DEBOUNCE_MS) return false;
    lastTurnActionAtRef.current = now;
    return true;
  };

  useEffect(() => {
    if (!gs || gs.gamePhase !== GAME_PHASE.playing || gs.subPhase !== SUB_PHASE.day8 || !Array.isArray(gs.players)) {
      prevDay8RemainingTurnsRef.current = null;
      setPendingTurnBannerTurns(null);
      return;
    }

    const raw = roomData?.remainingTurns;
    const rem = Number(raw);
    if (Number.isFinite(rem) && rem >= 0) {
      const remaining = Math.floor(rem);
      const prevRem = prevDay8RemainingTurnsRef.current;
      prevDay8RemainingTurnsRef.current = remaining;
      if (prevRem != null && remaining < prevRem && !gs?.movementFx?.id) {
        queueDay8TurnChangeBanner(Math.max(0, remaining));
      }
      return;
    }
  }, [gs?.gamePhase, gs?.subPhase, gs?.movementFx?.id, roomData?.remainingTurns, queueDay8TurnChangeBanner]);

  useEffect(() => {
    if (pendingTurnBannerTurns == null) return;
    if (day8VisualActionLockRef.current) return;
    /** ラウンド開始後に表示（ゴール確認・幽霊標的選びも含む。移動ホップ中は pieceHopping で抑止） */
    const mp = cpGs?.movePhase;
    const bannerReadyMovePhase =
      mp === "moving" ||
      mp === "goalLanding" ||
      mp === "waitingSlot" ||
      mp === "arrived" ||
      mp === "ghostPickTarget";
    const turnStarted =
      gs?.gamePhase === GAME_PHASE.playing && gs?.subPhase === SUB_PHASE.day8 && bannerReadyMovePhase;
    if (!turnStarted) return;
    const idleNow =
      !movementFxSync.isRunning &&
      !roomGs?.movementFx?.id &&
      !isDiceRolling &&
      taxiPhase == null &&
      !pieceHopping &&
      !ponCutin &&
      !sugorokuTileFxToast &&
      shrinePhase == null &&
      !streamFailOverlay &&
      !streamPonFireOverlay &&
      !streamTypeCutin &&
      !workCutin &&
      !workPonHud &&
      (gs?.slotPhase ?? "idle") === "idle";
    if (!idleNow) return;

    const showTurnBanner = () => {
      setTurnChangeBannerTurns(pendingTurnBannerTurns);
      setPendingTurnBannerTurns(null);
      if (turnChangeBannerTimerRef.current) {
        clearTimeout(turnChangeBannerTimerRef.current);
      }
      turnChangeBannerTimerRef.current = setTimeout(() => {
        setTurnChangeBannerTurns(null);
        turnChangeBannerTimerRef.current = null;
      }, 2000);
    };

    const currentPos = Number(cpGs?.position ?? -1);
    const tileFx =
      Array.isArray(gs?.sugorokuTileEffects) && currentPos >= 0 && currentPos <= BOARD_GOAL
        ? gs.sugorokuTileEffects[currentPos]
        : null;
    const noEffectTile = !tileFx || tileFx.kind === TILE_EFFECT_KIND.NEUTRAL;
    const isInnerTile = currentPos > 0 && currentPos < BOARD_GOAL;
    if (noEffectTile && isInnerTile) {
      if (turnChangeBannerDelayTimerRef.current) return;
      turnChangeBannerDelayTimerRef.current = setTimeout(() => {
        turnChangeBannerDelayTimerRef.current = null;
        showTurnBanner();
      }, 1000);
      return;
    }
    showTurnBanner();
  }, [
    pendingTurnBannerTurns,
    gs?.gamePhase,
    gs?.subPhase,
    gs?.slotPhase,
    cpGs?.movePhase,
    isDiceRolling,
    taxiPhase,
    pieceHopping,
    ponCutin,
    sugorokuTileFxToast,
    shrinePhase,
    streamFailOverlay,
    streamPonFireOverlay,
    streamTypeCutin,
    workCutin,
    workPonHud,
    cpGs?.position,
    gs?.sugorokuTileEffects,
    movementFxSync.isRunning,
    roomGs?.movementFx?.id,
    turnBannerFlushEpoch,
  ]);

  useEffect(() => () => {
    if (turnChangeBannerTimerRef.current) {
      clearTimeout(turnChangeBannerTimerRef.current);
      turnChangeBannerTimerRef.current = null;
    }
    if (turnChangeBannerDelayTimerRef.current) {
      clearTimeout(turnChangeBannerDelayTimerRef.current);
      turnChangeBannerDelayTimerRef.current = null;
    }
    if (pieceHoppingClearTimerRef.current) {
      clearTimeout(pieceHoppingClearTimerRef.current);
      pieceHoppingClearTimerRef.current = null;
    }
  }, []);

  const handleSeVolumeChange = useCallback((v) => {
    const n = Math.max(0, Math.min(1, Number(v)));
    setSeVolume(n);
    try {
      localStorage.setItem(LS_SE_VOL, String(n));
    } catch (_) {}
    soundRef.current?.setSeVolume?.(n);
  }, []);

  const handleBgmVolumeChange = useCallback((v) => {
    const n = Math.max(0, Math.min(1, Number(v)));
    setBgmVolume(n);
    try {
      localStorage.setItem(LS_BGM_VOL, String(n));
    } catch (_) {}
    soundRef.current?.setBgmVolume?.(n);
  }, []);

  const dailyBgmShouldPlay = useMemo(() => {
    if (screen !== "playing") return false;
    if (!gs || gs.gamePhase !== GAME_PHASE.playing) return false;
    const d = Number(gs.currentDay);
    return gs.subPhase === SUB_PHASE.daily && d >= 1 && d <= LAST_DAILY_DAY;
  }, [screen, gs?.gamePhase, gs?.subPhase, gs?.currentDay]);

  const day8BgmShouldPlay = useMemo(() => {
    if (screen !== "playing") return false;
    if (!gs || gs.gamePhase !== GAME_PHASE.playing) return false;
    return gs.subPhase === SUB_PHASE.day8;
  }, [screen, gs?.gamePhase, gs?.subPhase]);

  /** タイトル入力〜モード選択〜キャラ選択待機（認証完了後のみ） */
  const menuBgmShouldPlay = useMemo(
    () => authReady && (screen === "entry" || screen === "lobby" || screen === "waiting"),
    [authReady, screen],
  );

  // ─── サウンドマネージャー初期化 ──────────────────────────────────────────
  useEffect(() => {
    const sm = createSlotSoundManager();
    soundRef.current = sm;
    sm.setSeVolume(loadSoundVolume(LS_SE_VOL, DEFAULT_SE_VOL));
    sm.setBgmVolume(loadSoundVolume(LS_BGM_VOL, DEFAULT_BGM_VOL));
    void sm.init(); // MP3プリロード（失敗しても無害）
  }, []);

  useEffect(() => {
    document.title = `${GAME_TITLE_SHORT} — ${GAME_TITLE_FULL}`;
  }, []);

  // roomData の変化からscreen自動切替
  useEffect(() => {
    if (!roomData) return;
    if ((roomData.status === "playing" || roomData.status === "FINAL_BATTLE") && screen === "waiting") setScreen("playing");
  }, [roomData?.status]); // eslint-disable-line

  useEffect(() => {
    if (roomId && roomData) {
      hadRoomDataRef.current = true;
      roomIdWithDataRef.current = roomId;
    }
    if (
      roomId &&
      !roomData &&
      hadRoomDataRef.current &&
      roomIdWithDataRef.current === roomId
    ) {
      hadRoomDataRef.current = false;
      roomIdWithDataRef.current = null;
      setRoomId(null);
      setScreen("lobby");
      setUiError("");
    }
  }, [roomId, roomData, setRoomId]);

  useEffect(() => {
    if (roomData?.status !== "lobby") return;
    if (screen === "results" || screen === "gameover" || screen === "playing") {
      setScreen("waiting");
      setWaitingSessionKey((k) => k + 1);
    }
  }, [roomData?.status, screen]);

  useEffect(() => {
    if (!roomGs?.gamePhase) return;
    if (roomGs.gamePhase === GAME_PHASE.results  && screen !== "results")  setScreen("results");
    if (roomGs.gamePhase === GAME_PHASE.gameOver && screen !== "gameover" && !gameOverSplashMsg) {
      setGameOverSplashMsg(roomGs.gameOverMsg ?? "ゲームオーバー");
      if (gameOverSplashTimerRef.current) clearTimeout(gameOverSplashTimerRef.current);
      gameOverSplashTimerRef.current = setTimeout(() => {
        setGameOverSplashMsg(null);
        setScreen("gameover");
        gameOverSplashTimerRef.current = null;
      }, 1800);
    }
  }, [roomGs?.gamePhase]); // eslint-disable-line

  useEffect(() => {
    const sm = soundRef.current;
    if (!sm || !roomGs?.gamePhase) return;
    const inFinalBattle =
      roomGs.gamePhase === GAME_PHASE.finalBattle || roomGs.subPhase === SUB_PHASE.finalBattle;
    if (!inFinalBattle) {
      sm.stopFinalBattleAmbient();
      return;
    }
    if (roomGs.finalBattleEntry === "preDay8") return;
    sm.startFinalBattleAmbient();
  }, [roomGs?.gamePhase, roomGs?.subPhase, roomGs?.finalBattleEntry]);

  useEffect(() => {
    const sm = soundRef.current;
    if (!sm) return;
    if (dailyBgmShouldPlay) sm.startDailyBgm?.();
    else sm.stopDailyBgm?.();
  }, [dailyBgmShouldPlay]);

  useEffect(() => {
    const sm = soundRef.current;
    if (!sm) return;
    if (day8BgmShouldPlay) sm.startDay8Bgm?.();
    else sm.stopDay8Bgm?.();
  }, [day8BgmShouldPlay]);

  useEffect(() => {
    const sm = soundRef.current;
    if (!sm) return;
    if (menuBgmShouldPlay) sm.startMenuBgm?.();
    else sm.stopMenuBgm?.();
  }, [menuBgmShouldPlay]);

  /** ホスト:「決戦の日」経由は preDay8 なら8日目盤開始、それ以外（旧データ）は結果へ（楽観表示は無視し実データのみ） */
  useEffect(() => {
    if (!isHost || !roomId || !roomGs || roomGs.gamePhase !== GAME_PHASE.finalBattle) return;
    const startedMs = toEpochMsMaybe(roomGs.finalBattleStartedAt);
    if (!Number.isFinite(startedMs)) return;
    const totalMs =
      roomGs.finalBattleEntry === "preDay8"
        ? FINAL_BATTLE_HOST_PRE_DAY8_MS + 200
        : FINAL_BATTLE_HOST_DELAY_LEGACY_MS + 350;
    const target = startedMs + totalMs;
    const delay = Math.max(0, target - Date.now());
    const tid = setTimeout(async () => {
      try {
        const snap = await fetchRoom(roomId);
        const rdSnap = snap.data();
        const cur = rdSnap?.gameState;
        if (!cur || cur.gamePhase !== GAME_PHASE.finalBattle) return;
        if (cur.finalBattleEntry === "preDay8") {
          const next = enterDay8AfterFinalBattleCue(cur);
          await performGameStateUpdateRef.current(next, "hostFinalBattle", {
            gameState: cur,
            roomData: rdSnap,
            setStatus: "playing",
          });
        } else {
          const next = finalizeToResults(cur, cur.players);
          await performGameStateUpdateRef.current(next, "hostFinalBattle", {
            gameState: cur,
            roomData: rdSnap,
            setStatus: "completed",
          });
        }
      } catch (e) { setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。")); }
    }, delay);
    return () => clearTimeout(tid);
  }, [isHost, roomId, roomGs?.gamePhase, roomGs?.finalBattleStartedAt, roomGs?.finalBattleEntry]);

  /** 7日目楽観状態：日常フェーズを抜けたら即破棄。ログが Firestore 側で進んだら同期完了とみなす */
  useEffect(() => {
    if (!day8ItemOptimisticGs || !roomGs) return;
    const idx = day8ItemOptimisticGs.currentPlayerIdx;
    const optUsed = day8ItemOptimisticGs.players?.[idx]?.day8ItemUsedThisSeat;
    const liveUsed = roomGs.players?.[idx]?.day8ItemUsedThisSeat;
    if (optUsed && liveUsed) {
      setDay8ItemOptimisticGs(null);
    }
  }, [roomGs, day8ItemOptimisticGs]);

  useEffect(() => {
    if (!day7DailyOptimisticGs) return;
    if (roomGs?.subPhase !== SUB_PHASE.daily) {
      setDay7DailyOptimisticGs(null);
      return;
    }
    if (!roomGs?.log?.length) return;
    if (roomGs.log[0] !== day7DailyOptimisticGs.log[0]) {
      if (!dailyOutgoingFxActive) setDay7DailyOptimisticGs(null);
      return;
    }
    if (dailyOutgoingFxActive) return;
    setDay7DailyOptimisticGs(null);
  }, [roomGs, day7DailyOptimisticGs, dailyOutgoingFxActive]);

  useEffect(
    () => () => {
      if (streamFailOverlayTimerRef.current) {
        clearTimeout(streamFailOverlayTimerRef.current);
        streamFailOverlayTimerRef.current = null;
      }
      if (workPonFireOverlayTimerRef.current) {
        clearTimeout(workPonFireOverlayTimerRef.current);
        workPonFireOverlayTimerRef.current = null;
      }
      if (streamPonFireOverlayTimerRef.current) {
        clearTimeout(streamPonFireOverlayTimerRef.current);
        streamPonFireOverlayTimerRef.current = null;
      }
      if (streamCutinTimerRef.current) {
        clearTimeout(streamCutinTimerRef.current);
        streamCutinTimerRef.current = null;
      }
      streamFxChainTimeoutsRef.current.forEach(clearTimeout);
      streamFxChainTimeoutsRef.current = [];
      workFxChainTimeoutsRef.current.forEach(clearTimeout);
      workFxChainTimeoutsRef.current = [];
      if (workCutinTimerRef.current) {
        clearTimeout(workCutinTimerRef.current);
        workCutinTimerRef.current = null;
      }
      if (gameOverSplashTimerRef.current) {
        clearTimeout(gameOverSplashTimerRef.current);
        gameOverSplashTimerRef.current = null;
      }
      setStreamTypeCutin(null);
      setWorkCutin(null);
      setWorkPonHud(null);
    },
    [],
  );

  useEffect(
    () => () => {
      if (ponTileSlideTimerRef.current) {
        clearTimeout(ponTileSlideTimerRef.current);
        ponTileSlideTimerRef.current = null;
      }
    },
    [],
  );

  useEffect(() => {
    if (!roomGs) setDay7DailyOptimisticGs(null);
  }, [roomGs]);

  // ─── マルチ観戦側: movementFx 完了後のタクシー / PON フォローアップ演出 ─────────────────
  const beginSpectatorTaxiVisual = useCallback(
    (taxiVisual, actorPlayerId) => {
      if (!taxiVisual) return;
      pendingTaxiCongestionRef.current = !!taxiVisual.congested;
      taxiSpectatorTileFollowUpRef.current = null;
      if (taxiVisual.congested) {
        setTaxiDriveEndPos(taxiVisual.driveEndPos);
        setTaxiJamMidPos(taxiVisual.jamMidPos ?? null);
        taxiSecondLegMsRef.current = taxiVisual.secondLegMs ?? 0;
        setTaxiDriveActiveMs(taxiVisual.firstLegMs);
        taxiDriveDurationMsRef.current = taxiVisual.fullDriveMs;
        setTaxiDriveDurationMs(taxiVisual.fullDriveMs);
      } else if (taxiVisual.needsTileSlide) {
        setTaxiDriveEndPos(taxiVisual.driveEndPos);
        setTaxiJamMidPos(null);
        taxiSecondLegMsRef.current = 0;
        setTaxiDriveActiveMs(taxiVisual.firstLegMs);
        taxiDriveDurationMsRef.current = taxiVisual.fullDriveMs;
        setTaxiDriveDurationMs(taxiVisual.firstLegMs);
        taxiSpectatorTileFollowUpRef.current = {
          fromPos: taxiVisual.tileSlideFromPos,
          toPos: taxiVisual.tileSlideToPos,
          tileEffectMeta: taxiVisual.tileEffectMeta ?? null,
        };
      } else {
        setTaxiDriveEndPos(taxiVisual.driveEndPos);
        setTaxiJamMidPos(null);
        taxiSecondLegMsRef.current = 0;
        setTaxiDriveActiveMs(taxiVisual.firstLegMs);
        taxiDriveDurationMsRef.current = taxiVisual.firstLegMs;
        setTaxiDriveDurationMs(taxiVisual.firstLegMs);
      }
      let taxiPieceBlockMs = 900;
      if (taxiVisual.congested) {
        taxiPieceBlockMs = (taxiVisual.firstLegMs ?? 0) + (taxiVisual.secondLegMs ?? 0) + 200;
      } else if (taxiVisual.needsTileSlide) {
        taxiPieceBlockMs =
          (taxiVisual.firstLegMs ?? 0) +
          computeTaxiDriveDurationMs(
            Math.abs((taxiVisual.tileSlideToPos ?? 0) - (taxiVisual.tileSlideFromPos ?? 0)),
          ) +
          200;
      } else {
        taxiPieceBlockMs = (taxiVisual.firstLegMs ?? 0) + 200;
      }
      schedulePieceHopBlockingMs(Math.max(700, taxiPieceBlockMs));
      taxiActorPlayerIdRef.current = actorPlayerId ?? null;
      setTaxiActorPlayerId(actorPlayerId ?? null);
      taxiVisualActiveRef.current = true;
      setTaxiDriveCongested(false);
      setTaxiPhase("enter");
    },
    [schedulePieceHopBlockingMs],
  );

  /** 観戦側：渋滞2ターン目は enter 省略で drive のみ（のろのろ） */
  const beginSpectatorTaxiTrafficWaitDrive = useCallback(
    (taxiVisual, actorPlayerId) => {
      if (!taxiVisual) return;
      pendingTaxiCongestionRef.current = false;
      taxiSpectatorTileFollowUpRef.current = null;
      const driveMs = taxiVisual.driveMs ?? 2600;
      setTaxiDriveEndPos(taxiVisual.driveEndPos);
      setTaxiJamMidPos(null);
      taxiSecondLegMsRef.current = 0;
      setTaxiDriveActiveMs(driveMs);
      taxiDriveDurationMsRef.current = driveMs;
      setTaxiDriveDurationMs(driveMs);
      if (taxiVisual.needsTileSlide) {
        taxiSpectatorTileFollowUpRef.current = {
          fromPos: taxiVisual.tileSlideFromPos,
          toPos: taxiVisual.tileSlideToPos,
          tileEffectMeta: taxiVisual.tileEffectMeta ?? null,
        };
      }
      schedulePieceHopBlockingMs(Math.max(700, driveMs + 120));
      taxiActorPlayerIdRef.current = actorPlayerId ?? null;
      setTaxiActorPlayerId(actorPlayerId ?? null);
      taxiVisualActiveRef.current = true;
      setTaxiDriveCongested(true);
      setTaxiPhase("drive");
    },
    [schedulePieceHopBlockingMs],
  );

  const applySpectatorPonVisual = useCallback((ponVisual) => {
    if (!ponVisual) return;
    ponSpectatorOnlyRef.current = true;
    pendingSpectatorPonVisualRef.current = ponVisual;
    if (typeof ponVisual.stopPos === "number") {
      setBoardViewPosOverride(ponVisual.stopPos);
    }
    setPonCutin({ characterType: ponVisual.characterType ?? "salaryman" });
  }, []);

  const applySpectatorMovementFxFollowUp = useCallback(
    (fx) => {
      if (isMyTurn || !fx?.id || !fx?.playerId) return;
      const cp = gsRef.current?.players?.[gsRef.current?.currentPlayerIdx ?? -1];
      if (!cp || cp.id !== fx.playerId) return;
      if (lastSpectatorMovementFxFollowUpIdRef.current === fx.id) return;
      lastSpectatorMovementFxFollowUpIdRef.current = fx.id;

      if (fx.followUp === "taxiTrafficWait" && fx.taxiVisual) {
        beginSpectatorTaxiTrafficWaitDrive(fx.taxiVisual, fx.playerId);
      } else if (fx.followUp === "taxi" && fx.taxiVisual) {
        beginSpectatorTaxiVisual(fx.taxiVisual, fx.playerId);
      } else if (fx.followUp === "pon" && fx.ponVisual) {
        applySpectatorPonVisual(fx.ponVisual);
      }
    },
    [isMyTurn, beginSpectatorTaxiVisual, beginSpectatorTaxiTrafficWaitDrive, applySpectatorPonVisual],
  );

  // ─── タクシーカットイン アニメーション シーケンス ────────────────────
  useEffect(() => {
    if (!taxiPhase) return;
    if (taxiPhase === "taxiHail") return;
    const congest = pendingTaxiCongestionRef.current;
    const TIMING = {
      enter: 900,
      boarding: 500,
      ride: 450,
      trafficJam: 2600,
      /** drive* の長さは taxiDriveActiveMs（BoardViewport と同期） */
      arrive:
        1800 /* 0.4s 停車 + 0.5s 駒フェード(0.4s遅延) + 0.9s 退場 — gameAnimationsCss .anim-taxi-arrive-park-inner / .anim-taxi-arrive-exit-wrapper / .taxi-piece-arrive-fadein と同期 */,
    };
    const duration =
      taxiPhase === "drive" ||
      taxiPhase === "driveBeforeJam" ||
      taxiPhase === "driveAfterJam"
        ? taxiDriveActiveMs
        : TIMING[taxiPhase];
    if (duration == null) return;

    const getNext = (phase) => {
      if (phase === "enter") return "boarding";
      if (phase === "boarding") return "ride";
      if (phase === "ride") return congest ? "driveBeforeJam" : "drive";
      if (phase === "driveBeforeJam") return "trafficJam";
      if (phase === "trafficJam") {
        if (taxiSecondLegMsRef.current <= 0) return "arrive";
        return "driveAfterJam";
      }
      if (phase === "driveAfterJam") return "arrive";
      if (phase === "drive") return "arrive";
      if (phase === "arrive") return null;
      return null;
    };

    const t = setTimeout(async () => {
      const tentativeNext = getNext(taxiPhase);
      const writeDriveDone =
        (taxiPhase === "drive" ||
          taxiPhase === "driveAfterJam" ||
          (taxiPhase === "trafficJam" && tentativeNext === "arrive")) &&
        taxiGSRef.current &&
        roomId;

      let skipArriveForPendingTaxi = pendingTaxiCongestionRef.current;
      if (writeDriveDone && taxiGSRef.current) {
        const g = taxiGSRef.current;
        const actorId = taxiActorPlayerIdRef.current;
        const actor = actorId ? g.players?.find((pl) => pl.id === actorId) : null;
        skipArriveForPendingTaxi =
          skipArriveForPendingTaxi || (actor?.pendingTaxiSteps ?? 0) > 0;
      }

      let taxiWriteOk = false;
      let writtenCurPlayerId = null;
      if (writeDriveDone) {
        const tgSnap = taxiGSRef.current;
        writtenCurPlayerId = tgSnap?.players?.[tgSnap.currentPlayerIdx]?.id ?? null;
        const followUp = taxiGSFollowUpRef.current;
        const commit = taxiDay8CommitRef.current;
        try {
          if (commit?.actorId) {
            if (followUp) {
              taxiWriteOk = await performGameStateUpdateRef.current(null, "actorTurn", {
                markDay8TurnComplete: false,
                liveMutator: (liveGs) => applyDay8TaxiIntermediateCommit(liveGs, commit),
              });
            } else {
              taxiWriteOk = await performGameStateUpdateRef.current(null, "actorTurn", {
                markDay8TurnComplete: commit.arrived ? commit.isMultiplayerRoom : true,
                turnCompletePlayerId: commit.actorId,
                liveMutator: (liveGs) => applyDay8ActorMoveCommit(liveGs, commit),
              });
            }
          } else {
            const tg = taxiGSRef.current;
            taxiWriteOk = await performGameStateUpdateRef.current(tg, "actorTurn", {
              markDay8TurnComplete: "auto",
            });
          }
        } catch (e) {
          setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        }
        taxiGSRef.current = null;
        taxiDay8CommitRef.current = null;
        taxiGSFollowUpRef.current = null;

        if (!taxiWriteOk) {
          setTaxiPhase(null);
          taxiActorPlayerIdRef.current = null;
          setTaxiActorPlayerId(null);
          setPieceHopping(false);
          if (pieceHoppingClearTimerRef.current) {
            clearTimeout(pieceHoppingClearTimerRef.current);
            pieceHoppingClearTimerRef.current = null;
          }
        } else if (taxiWriteOk) {
          const applySugorokuTileFollowUp = async (followUp, tileMeta) => {
            if (
              tileMeta &&
              ((tileMeta.titles?.length ?? 0) > 0 || (tileMeta.moneyDelta ?? 0) !== 0)
            ) {
              await runTileEffectPresentation(tileMeta, {
                onExplain: showTileEffectExplain,
                onMoneyFloat: (delta) => {
                  setBoardMoneyFloatDelta(delta);
                },
                onMoneyApplied: () => {
                  const fin = movementFxFinalMoneyRef.current;
                  if (fin?.playerId) {
                    setFxMoneyReveal({ playerId: fin.playerId, moneyAfter: fin.moneyAfter });
                  }
                  setBoardMoneyFloatDelta(null);
                },
              });
            }
            const hopMs = computeSugorokuHopDurationMs(followUp.fromPos, followUp.toPos);
            setBoardViewPosOverride(followUp.toPos);
            await new Promise((r) => setTimeout(r, hopMs));
            await performGameStateUpdateRef.current(null, "actorTurn", {
              markDay8TurnComplete: true,
              turnCompletePlayerId: taxiDay8CommitRef.current?.actorId ?? null,
              liveMutator: (liveGs) => {
                const pendingCommit = taxiDay8CommitRef.current;
                if (!pendingCommit) return null;
                return applyDay8ActorMoveCommit(liveGs, pendingCommit);
              },
            });
            taxiDay8CommitRef.current = null;
            setBoardViewPosOverride(null);
            setFxMoneyReveal(null);
            setBoardMoneyFloatDelta(null);
            movementFxFinalMoneyRef.current = null;
          };

          if (followUp) {
            const tileMeta = pendingTileEffectMetaRef.current;
            pendingTileEffectMetaRef.current = null;
            pendingSugorokuTileFxToastRef.current = null;
            void applySugorokuTileFollowUp(followUp, tileMeta).catch((e) => {
              setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
            });
          } else {
            pendingTileEffectMetaRef.current = null;
            pendingSugorokuTileFxToastRef.current = null;
          }
        }

        setShakeScreen(true);
        setTimeout(() => setShakeScreen(false), 500);
      }

      if (
        !writeDriveDone &&
        taxiPhase === "drive" &&
        tentativeNext === "arrive" &&
        taxiSpectatorTileFollowUpRef.current
      ) {
        const fu = taxiSpectatorTileFollowUpRef.current;
        taxiSpectatorTileFollowUpRef.current = null;
        try {
          const tileMeta = fu.tileEffectMeta;
          if (
            tileMeta &&
            ((tileMeta.titles?.length ?? 0) > 0 || (tileMeta.moneyDelta ?? 0) !== 0)
          ) {
            await runTileEffectPresentation(tileMeta, {
              onExplain: showTileEffectExplain,
              onMoneyFloat: (delta) => {
                setBoardMoneyFloatDelta(delta);
              },
              onMoneyApplied: () => {
                setBoardMoneyFloatDelta(null);
              },
            });
          }
          if (typeof fu.toPos === "number") {
            const hopMs = computeSugorokuHopDurationMs(fu.fromPos ?? fu.toPos, fu.toPos);
            setBoardViewPosOverride(fu.toPos);
            await new Promise((r) => setTimeout(r, hopMs));
            setBoardViewPosOverride(null);
          }
        } catch (e) {
          setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        }
        setBoardMoneyFloatDelta(null);
      }

      let next = tentativeNext;
      if (tentativeNext === "arrive" && skipArriveForPendingTaxi) {
        next = null;
      }
      // drive 完了の書き込みで手番が進んでいるのに arrive を出すと、BoardViewport は「今手番の人」基準のため
      // 次プレイヤーの盤面に退場タクシーが載る。ゴール等で手番が残る場合は id が一致するので arrive は維持。
      const arriveAfterDriveWrite =
        writeDriveDone &&
        taxiWriteOk &&
        tentativeNext === "arrive" &&
        (taxiPhase === "drive" ||
          taxiPhase === "driveAfterJam" ||
          (taxiPhase === "trafficJam" && tentativeNext === "arrive"));
      if (
        arriveAfterDriveWrite &&
        writtenCurPlayerId &&
        taxiActorPlayerIdRef.current &&
        writtenCurPlayerId !== taxiActorPlayerIdRef.current
      ) {
        next = null;
      }

      if (next === "driveAfterJam") {
        setTaxiDriveActiveMs(taxiSecondLegMsRef.current);
        setTaxiDriveCongested(true);
      } else if (next === "drive" || next === "driveBeforeJam") {
        setTaxiDriveCongested(false);
      } else if (taxiPhase === "trafficJam" && next !== "driveAfterJam") {
        setTaxiDriveCongested(false);
      }
      if (next === "arrive") setTaxiDriveCongested(false);
      if (next === null) {
        taxiActorPlayerIdRef.current = null;
        setTaxiActorPlayerId(null);
        pendingTaxiCongestionRef.current = false;
        setTaxiDriveCongested(false);
        setTaxiDriveEndPos(null);
        setTaxiJamMidPos(null);
        if (pieceHoppingClearTimerRef.current) {
          clearTimeout(pieceHoppingClearTimerRef.current);
          pieceHoppingClearTimerRef.current = null;
        }
        setPieceHopping(false);
        taxiVisualActiveRef.current = false;
        releaseDay8VisualActionLock();
      }
      setTaxiPhase(next);
    }, duration);
    return () => clearTimeout(t);
  }, [taxiPhase, roomId, taxiDriveActiveMs]);

  /** Firestore で手番が先に進んだあと、操作者以外の盤面にタクシー演出が残らないよう消す */
  useEffect(() => {
    if (!taxiPhase || !taxiActorPlayerId || !cpGs?.id) return;
    if (cpGs.id === taxiActorPlayerId) return;
    taxiActorPlayerIdRef.current = null;
    setTaxiActorPlayerId(null);
    pendingTaxiCongestionRef.current = false;
    setTaxiDriveCongested(false);
    setTaxiDriveEndPos(null);
    setTaxiJamMidPos(null);
    if (pieceHoppingClearTimerRef.current) {
      clearTimeout(pieceHoppingClearTimerRef.current);
      pieceHoppingClearTimerRef.current = null;
    }
    setPieceHopping(false);
    taxiVisualActiveRef.current = false;
    setTaxiPhase(null);
    releaseDay8VisualActionLock();
  }, [gs?.currentPlayerIdx, cpGs?.id, taxiPhase, taxiActorPlayerId, releaseDay8VisualActionLock]);

  // ─── 1回休みの自動スキップ ───────────────────────────────────────────
  useEffect(() => {
    const liveGs = gsRef.current;
    if (!isMyTurn || !liveGs || liveGs.subPhase !== SUB_PHASE.day8 || liveGs.gamePhase !== GAME_PHASE.playing) return;
    const idx = liveGs.currentPlayerIdx;
    const p = liveGs.players?.[idx];
    if (!p || p.skipTurns <= 0 || p.movePhase !== MOVE_PHASE.moving) return;
    if ((p.pendingTaxiSteps ?? 0) > 0) return;
    const newPlayers = liveGs.players.map((pl, i) =>
      i === idx ? { ...pl, skipTurns: pl.skipTurns - 1 } : pl,
    );
    const logs = [`💤 ${p.name} 1回休み（炎上の巻き添え）`];
    void performGameStateUpdateRef.current?.(computeAdvanceDay8Turn(liveGs, newPlayers, logs), "actorTurn", {
      markDay8TurnComplete: true,
    });
  }, [isMyTurn, gs?.currentPlayerIdx]);

  /** PON用オーバーライド解除：Firestore の自分の position が表示マスに追いついた後だけ null にする（解除が早いと古いマスへ戻り二次ホップする） */
  useEffect(() => {
    if (typeof boardViewPosOverride !== "number" || !roomGs || !myId) return;
    const mine = roomGs.players?.find((pl) => pl.id === myId);
    if (mine && mine.position === boardViewPosOverride) {
      setBoardViewPosOverride(null);
    }
  }, [roomGs, boardViewPosOverride, myId]);

  /** リロード後に movementFx だけ残った gameState を修復（移動者本人のみ — 観戦側の誤修復で演出・手番が止まるのを防ぐ） */
  useEffect(() => {
    const fx = roomGs?.movementFx;
    if (!roomId || !fx || movementFxPendingCommitRef.current) return;
    if (taxiPhase != null) return;
    if (movementFxSync.isRunning) return;
    if (isTaxiDeferredMovementFx(fx)) return;
    if (fx.playerId !== myId) return;
    const key = `${roomId}:${fx.id ?? ""}:${fx.playerId ?? ""}`;
    if (movementFxRecoveryKeyRef.current === key) return;
    const patch = buildOrphanedMovementFxPatch(roomGs);
    if (!patch) return;
    movementFxRecoveryKeyRef.current = key;
    void updateRoom(patch).catch((e) => {
      console.warn("[movementFx] recovery failed", e);
      movementFxRecoveryKeyRef.current = null;
    });
  }, [roomId, roomGs, updateRoom, taxiPhase, myId, movementFxSync.isRunning]);

  // ─── Firestore gameState 書き込み（手番ガード／ホスト決戦進行） ─────────────────
  const performGameStateUpdate = useCallback(
    async (newGS, writeMode = "actorTurn", authCtx = {}) => {
      const {
        gameState: authGOverride,
        roomData: authRdOverride,
        setStatus,
        markDay8TurnComplete = false,
        turnCompletePlayerId = null,
        deathCommitPlayerId = null,
        liveMutator = null,
      } = authCtx;
      const authG = authGOverride ?? gsRef.current;
      const authRd = authRdOverride ?? roomDataRef.current;
      if (writeMode === "actorTurn") {
        if (deathCommitPlayerId) {
          if (deathCommitPlayerId !== myId) {
            setUiError("手番が変わったため、同期を送信できませんでした。最新の状態を確認してください。");
            return false;
          }
          const dieIdx = authG?.players?.findIndex((pl) => pl.id === deathCommitPlayerId);
          if (dieIdx < 0) {
            setUiError("脱落処理を同期できませんでした。最新の状態を確認してください。");
            return false;
          }
          const stillActor =
            authG.currentPlayerIdx === dieIdx || authG.movementFx?.playerId === deathCommitPlayerId;
          if (!stillActor) {
            setUiError("手番が変わったため、同期を送信できませんでした。最新の状態を確認してください。");
            return false;
          }
        } else if (!isActorTurnOnGameState(authG, myId)) {
          setUiError("手番が変わったため、同期を送信できませんでした。最新の状態を確認してください。");
          return false;
        }
      } else if (writeMode === "goalLandingConfirm") {
        if (!canWriteGoalLandingConfirm(authG, myId)) {
          setUiError("ゴール確認を送信できませんでした。最新の状態を確認してください。");
          return false;
        }
      } else if (writeMode === "hostFinalBattle") {
        if (!isHostFinalBattleScheduledWrite(authRd, authG, myId)) {
          setUiError("この更新はホストのみが実行できます。");
          return false;
        }
      } else if (writeMode === "ghostAutomation") {
        const cp = authG?.players?.[authG?.currentPlayerIdx];
        if (!isTurnAutomatable(cp, roomPlayers)) return false;
        if (cp?.id === myId) return false;
      } else if (writeMode === "dailyFxClear") {
        const fxOwner = authG?.dailyActionFx?.playerId;
        if (!authG?.dailyActionFx?.id) return false;
        if (!isRoomHost(authRd, myId) && myId !== fxOwner) return false;
      }
      try {
        if (
          (writeMode === "actorTurn" ||
            writeMode === "goalLandingConfirm" ||
            writeMode === "ghostAutomation" ||
            writeMode === "dailyFxClear") &&
          roomId &&
          authG?.gamePhase === GAME_PHASE.playing &&
          (authG?.subPhase === SUB_PHASE.day8 || authG?.subPhase === SUB_PHASE.daily)
        ) {
          const ref = doc(db, "rooms", roomId);
          await runTransaction(db, async (transaction) => {
            const snap = await transaction.get(ref);
            if (!snap.exists()) throw new Error("ROOM_MISSING");
            const liveRoom = snap.data();
            const liveGs = liveRoom?.gameState;
            if (writeMode === "goalLandingConfirm") {
              if (!canWriteGoalLandingConfirm(liveGs, myId)) throw new Error("GOAL_CONFIRM_DENIED");
            } else if (writeMode === "ghostAutomation") {
              const liveCp = liveGs?.players?.[liveGs?.currentPlayerIdx];
              if (!isTurnAutomatable(liveCp, roomPlayers)) throw new Error("GHOST_AUTO_DENIED");
              if (liveCp?.id === myId) throw new Error("GHOST_AUTO_DENIED");
            } else if (writeMode === "dailyFxClear") {
              const fxOwner = liveGs?.dailyActionFx?.playerId;
              if (!liveGs?.dailyActionFx?.id) throw new Error("FX_ALREADY_CLEAR");
              if (!isRoomHost(liveRoom, myId) && myId !== fxOwner) throw new Error("FX_CLEAR_DENIED");
            } else if (deathCommitPlayerId) {
              const dieIdx = liveGs?.players?.findIndex((pl) => pl.id === deathCommitPlayerId);
              if (dieIdx < 0) throw new Error("DEATH_ACTOR_MISSING");
              const stillActor =
                liveGs.currentPlayerIdx === dieIdx ||
                liveGs.movementFx?.playerId === deathCommitPlayerId;
              if (!stillActor || deathCommitPlayerId !== myId) throw new Error("DEATH_COMMIT_DENIED");
            } else if (!isActorTurnOnGameState(liveGs, myId)) {
              throw new Error("TURN_CHANGED");
            }
            let resolvedGS = newGS;
            if (typeof liveMutator === "function") {
              resolvedGS = liveMutator(liveGs);
              if (!resolvedGS) throw new Error("LIVE_MUTATOR_NULL");
            } else if (!resolvedGS) {
              throw new Error("NO_GAME_STATE");
            } else if (
              liveGs?.subPhase === SUB_PHASE.day8 &&
              resolvedGS.subPhase !== SUB_PHASE.day8 &&
              resolvedGS.gamePhase === GAME_PHASE.playing
            ) {
              throw new Error("PHASE_REGRESSION");
            }
            resolvedGS = {
              ...resolvedGS,
              assetHistory: mergeAssetHistoryBuckets(liveGs, resolvedGS),
            };
            if (liveGs?.subPhase === SUB_PHASE.day8) {
              let markTurnCompleteFor = null;
              if (markDay8TurnComplete === true) {
                markTurnCompleteFor =
                  turnCompletePlayerId ?? liveGs?.players?.[liveGs?.currentPlayerIdx]?.id ?? null;
              } else if (markDay8TurnComplete === "auto") {
                markTurnCompleteFor = shouldMarkDay8TurnComplete(liveGs, resolvedGS)
                  ? turnCompletePlayerId ?? liveGs?.players?.[liveGs?.currentPlayerIdx]?.id ?? null
                  : null;
              }
              const tracked = applyDay8RoundTracking(liveRoom, resolvedGS, { markTurnCompleteFor });
              const updates = {
                gameState: tracked.gameState,
                remainingTurns: tracked.remainingTurns,
                completedPlayers: tracked.completedPlayers,
                totalPot: tracked.totalPot,
              };
              if (typeof setStatus === "string") updates.status = setStatus;
              else if (tracked.gameState.gamePhase === GAME_PHASE.finalBattle) updates.status = "FINAL_BATTLE";
              else if (tracked.gameState.gamePhase === GAME_PHASE.results) updates.status = "completed";
              transaction.update(ref, updates);
              return;
            }
            const updates = { gameState: resolvedGS };
            if (typeof setStatus === "string") updates.status = setStatus;
            else if (resolvedGS.gamePhase === GAME_PHASE.finalBattle) updates.status = "FINAL_BATTLE";
            else if (resolvedGS.gamePhase === GAME_PHASE.results) updates.status = "completed";
            transaction.update(ref, updates);
          });
          return true;
        }
        const pendingCutin = pickDailyCutinBroadcastFields(pendingDailyCutinBroadcastRef.current);
        const clearsCutinFields =
          (newGS.dailyCutinPhase ?? DAILY_CUTIN_PHASE.idle) === DAILY_CUTIN_PHASE.idle &&
          (newGS.dailyCutinSessionId ?? null) === null;
        const mergedGS =
          pendingCutin && !clearsCutinFields
            ? mergeDailyCutinFieldsIntoGameState(newGS, pendingCutin)
            : newGS;
        let updates = { gameState: mergedGS };
        if (
          roomId &&
          mergedGS?.gamePhase === GAME_PHASE.playing &&
          mergedGS?.subPhase === SUB_PHASE.day8
        ) {
          const roomDoc = authRd ?? roomDataRef.current;
          const tracked = applyDay8RoundTracking(roomDoc, mergedGS, {});
          updates = {
            gameState: tracked.gameState,
            remainingTurns: tracked.remainingTurns,
            completedPlayers: tracked.completedPlayers,
            totalPot: tracked.totalPot,
          };
        }
        if (typeof setStatus === "string") updates.status = setStatus;
        else if (mergedGS.gamePhase === GAME_PHASE.finalBattle) updates.status = "FINAL_BATTLE";
        else if (mergedGS.gamePhase === GAME_PHASE.results) updates.status = "completed";
        await updateRoom(updates);
        return true;
      } catch (e) {
        setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        return false;
      }
    },
    [updateRoom, myId, roomId, roomPlayers],
  );
  performGameStateUpdateRef.current = performGameStateUpdate;

  const writeGS = async (newGS, opts = {}) =>
    performGameStateUpdate(newGS, "actorTurn", {
      markDay8TurnComplete: opts.markDay8TurnComplete ?? false,
      turnCompletePlayerId: opts.turnCompletePlayerId ?? null,
    });

  const commitDay8ItemGate = useCallback(
    async (mutator) => {
      const live = gsRef.current;
      if (!live || live.subPhase !== SUB_PHASE.day8) return false;
      const optimistic = mutator(live);
      if (!optimistic) return false;
      setDay8ItemOptimisticGs(optimistic);
      setUiError("");
      const ok = await performGameStateUpdate(null, "actorTurn", {
        liveMutator: (liveGs) => mutator(liveGs),
      });
      if (!ok) setDay8ItemOptimisticGs(null);
      return ok;
    },
    [performGameStateUpdate],
  );

  /** 日常行動ラベル（dailyActionFx）を一定時間後にクリア。フェーズ外に残っていれば即消す */
  const commitClearDailyActionFxFromLive = useCallback(
    () =>
      performGameStateUpdate(null, "dailyFxClear", {
        markDay8TurnComplete: false,
        liveMutator: (liveGs) => clearDailyActionFx(liveGs),
      }),
    [performGameStateUpdate],
  );

  useEffect(() => {
    const fx = roomGs?.dailyActionFx;
    if (!fx?.id || !roomId) return undefined;
    const staleDailyFx =
      roomGs?.gamePhase === GAME_PHASE.finalBattle ||
      roomGs?.subPhase === SUB_PHASE.day8 ||
      (roomGs?.gamePhase === GAME_PHASE.playing && roomGs?.subPhase !== SUB_PHASE.daily);
    const mayClear = myId === fx.playerId || isHost;
    const clearFxFromLive = () => {
      if (!mayClear) return;
      void commitClearDailyActionFxFromLive().catch(() => {});
    };
    if (staleDailyFx) {
      if (roomGs?.dailyActionFx?.id === fx.id) clearFxFromLive();
      return undefined;
    }
    const timer = setTimeout(() => {
      const live = gsRef.current;
      if (live?.subPhase !== SUB_PHASE.daily) return;
      if (!live?.dailyActionFx || live.dailyActionFx.id !== fx.id) return;
      clearFxFromLive();
    }, DAILY_ACTION_FX_CLEAR_MS);
    return () => clearTimeout(timer);
  }, [
    roomGs?.dailyActionFx?.id,
    roomGs?.subPhase,
    roomGs?.gamePhase,
    roomId,
    myId,
    isHost,
    commitClearDailyActionFxFromLive,
  ]);

  const writeGhostAutomationGS = async (newGS, opts = {}) =>
    performGameStateUpdate(newGS, "ghostAutomation", { markDay8TurnComplete: opts.markDay8TurnComplete ?? false });

  const writeGoalLandingConfirm = async (newGS, opts = {}) =>
    performGameStateUpdate(newGS, "goalLandingConfirm", {
      markDay8TurnComplete: opts.markDay8TurnComplete ?? false,
    });

  const runBoardDeathFadeThenCommit = useCallback(
    async (presentation, resolveDeathOnLive) => {
      let deathResult = null;
      try {
        setBoardDeathPresentation({ ...presentation, phase: "fade" });
        await delayMs(BOARD_DEATH_FADE_MS);
        setDeathFadeHandledIds((prev) =>
          prev.includes(presentation.playerId) ? prev : [...prev, presentation.playerId],
        );
        const ok = await performGameStateUpdate(null, "actorTurn", {
          deathCommitPlayerId: presentation.playerId,
          markDay8TurnComplete: false,
          turnCompletePlayerId: presentation.playerId,
          liveMutator: (liveGs) => {
            const idx = liveGs.players?.findIndex((pl) => pl.id === presentation.playerId);
            if (idx < 0) return null;
            if (liveGs.players[idx]?.alive === false) return null;
            const death = resolveDeathOnLive(liveGs, idx);
            if (!death?.gs) return null;
            deathResult = death;
            const nextGs = death.gs;
            return nextGs.movementFx ? { ...nextGs, movementFx: null } : nextGs;
          },
        });
        if (!ok) {
          setUiError("脱落処理を同期できませんでした。最新の状態を確認してください。");
        }
      } finally {
        setBoardDeathPresentation(null);
        releaseDay8VisualActionLock();
      }
      return deathResult;
    },
    [performGameStateUpdate, releaseDay8VisualActionLock],
  );

  const handleBoardHelpDeathConfirm = useCallback(async () => {
    if (boardDeathConfirmBusyRef.current) return;
    const pending = pendingBoardDeathCommitRef.current;
    if (!pending?.presentation || pending.type !== "help") return;
    boardDeathConfirmBusyRef.current = true;
    pendingBoardDeathCommitRef.current = null;
    try {
      beginDay8VisualAction();
      await runBoardDeathFadeThenCommit(pending.presentation, (liveGs, idx) =>
        eliminateDay8Player(liveGs, idx, pending.logLine),
      );
    } finally {
      boardDeathConfirmBusyRef.current = false;
    }
  }, [runBoardDeathFadeThenCommit, beginDay8VisualAction]);

  ponCutinFinalizeRef.current = async () => {
    if (ponSpectatorOnlyRef.current) {
      ponSpectatorOnlyRef.current = false;
      const pv = pendingSpectatorPonVisualRef.current;
      pendingSpectatorPonVisualRef.current = null;
      setPonCutin(null);
      try {
        if (pv?.needsTileSlide && typeof pv.tileSlideToPos === "number") {
          const from =
            typeof pv.tileSlideFromPos === "number" ? pv.tileSlideFromPos : pv.stopPos;
          setBoardViewPosOverride(pv.tileSlideToPos);
          await new Promise((r) =>
            setTimeout(r, computeSugorokuHopDurationMs(from ?? pv.tileSlideToPos, pv.tileSlideToPos)),
          );
        }
      } finally {
        setBoardViewPosOverride(null);
      }
      return;
    }

    const pending = ponCutinCommitRef.current;
    ponCutinCommitRef.current = null;
    ponHopGateRef.current = false;
    setPonHopCompleteEnabled(false);
    setPonCutin(null);
    if (pending?.nextGS) {
      try {
        const tileMeta = pending.tileEffectMeta;
        if (
          tileMeta &&
          ((tileMeta.titles?.length ?? 0) > 0 || (tileMeta.moneyDelta ?? 0) !== 0)
        ) {
          await runTileEffectPresentation(tileMeta, {
            onExplain: showTileEffectExplain,
            onMoneyFloat: (delta) => {
              setBoardMoneyFloatDelta(delta);
            },
            onMoneyApplied: () => {
              const fin = movementFxFinalMoneyRef.current;
              if (fin?.playerId) {
                setFxMoneyReveal({ playerId: fin.playerId, moneyAfter: fin.moneyAfter });
              }
              setBoardMoneyFloatDelta(null);
            },
          });
        }

        if (pending.intermediateGS && pending.tileSlideToPos != null) {
          const midGS = pending.intermediateGS;
          const okMid = await performGameStateUpdate(midGS, "actorTurn");
          if (!okMid) {
            setBoardViewPosOverride(null);
            setIsDiceRolling(false);
            releaseDay8VisualActionLock();
            return;
          }

          setBoardViewPosOverride(pending.tileSlideToPos);
          await new Promise((r) =>
            setTimeout(r, computeSugorokuHopDurationMs(pending.tileSlideFromPos ?? pending.tileSlideToPos, pending.tileSlideToPos)),
          );
        }

        const okFin = await performGameStateUpdate(pending.nextGS, "actorTurn", {
          markDay8TurnComplete: true,
        });
        if (!okFin) {
          setBoardViewPosOverride(null);
          setIsDiceRolling(false);
          releaseDay8VisualActionLock();
          return;
        }
        setBoardViewPosOverride(null);
        setFxMoneyReveal(null);
        setBoardMoneyFloatDelta(null);
        movementFxFinalMoneyRef.current = null;
      } catch (e) {
        setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        setBoardViewPosOverride(null);
        setIsDiceRolling(false);
        if (ponTileSlideTimerRef.current) {
          clearTimeout(ponTileSlideTimerRef.current);
          ponTileSlideTimerRef.current = null;
        }
        releaseDay8VisualActionLock();
        return;
      }
    }
    setIsDiceRolling(false);
    releaseDay8VisualActionLock();
  };

  const handleSugorokuHopComplete = useCallback(() => {
    if (!ponHopGateRef.current) return;
    ponHopGateRef.current = false;
    setPonHopCompleteEnabled(false);
    const pending = ponCutinCommitRef.current;
    if (!pending?.nextGS) return;
    setPonCutin({ characterType: pending.characterType ?? "salaryman" });
  }, []);

  handleMovementFxSequenceCompleteRef.current = async (fx) => {
    const pending = movementFxPendingCommitRef.current;
    if (pending && pending.fxId === fx.id) {
      if (pending.actorId !== myId) {
        pending.syncAfterMovementFx?.();
        return;
      }

      movementFxPendingCommitRef.current = null;
      setFxMoneyReveal(null);
      try {
        await pending.run();
      } catch (e) {
        setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        setIsDiceRolling(false);
        setTaxiPhase(null);
        setPieceHopping(false);
        taxiGSRef.current = null;
        taxiDay8CommitRef.current = null;
        taxiGSFollowUpRef.current = null;
        releaseDay8VisualActionLock();
      } finally {
        if (!ponCutinCommitRef.current && !taxiVisualActiveRef.current) {
          movementFxFinalMoneyRef.current = null;
          releaseDay8VisualActionLock();
        }
      }
      return;
    }

    applySpectatorMovementFxFollowUp(fx);
  };

  const commitPendingGameState = useCallback(
    async (pending, opts = {}) => {
      await performGameStateUpdate(pending, "actorTurn", {
        markDay8TurnComplete: opts.markDay8TurnComplete ?? false,
      });
    },
    [performGameStateUpdate],
  );

  /** 8日目スロット：Firestore 上の最新 gs を基準に idle 同期のみ（バースト継続時） */
  const syncDay8SlotIdleFromLive = useCallback(
    (displayPreferGs = null) =>
      performGameStateUpdate(null, "actorTurn", {
        markDay8TurnComplete: false,
        liveMutator: (liveGs) => mergeDay8SlotIdleSync(liveGs, displayPreferGs),
      }),
    [performGameStateUpdate],
  );

  /** 8日目スロット：Firestore 上の最新 gs を基準に復旧（リロード復旧・スピン中断・手番進行） */
  const commitDay8SlotLivePatch = useCallback(
    async (expectedKind, opts = {}) => {
      const writeMode = opts.writeMode ?? "actorTurn";
      const markDay8TurnComplete =
        opts.markDay8TurnComplete ?? (expectedKind === "advanceTurn");
      return performGameStateUpdate(null, writeMode, {
        markDay8TurnComplete,
        turnCompletePlayerId: opts.turnCompletePlayerId ?? null,
        liveMutator: (liveGs) => {
          const patch = buildDay8SlotReloadRecoveryPatch(liveGs);
          if (patch) {
            if (expectedKind && patch.kind !== expectedKind) {
              if (expectedKind === "advanceTurn" && patch.kind === "deferAdvance") return null;
              if (expectedKind !== patch.kind) return null;
            }
            if (patch.kind === "resetSync") return mergeDay8SlotIdleSync(liveGs);
            if (patch.kind === "advanceTurn") return patch.gs;
          }
          if (expectedKind === "advanceTurn") {
            return resolveDay8SlotBurstAdvance(liveGs);
          }
          return null;
        },
      });
    },
    [performGameStateUpdate],
  );

  /** マルチ代理スロット：最新 gameState を読んでからマージ（金額レース回避） */
  const commitGameStateTransaction = useCallback(
    async (mutator) => {
      if (!roomId) return null;
      const ref = doc(db, "rooms", roomId);
      try {
        return await runTransaction(db, async (transaction) => {
          const snap = await transaction.get(ref);
          if (!snap.exists()) return null;
          const prevGs = snap.data().gameState;
          if (!isActorTurnOnGameState(prevGs, myId)) return null;
          const next = mutator(prevGs);
          if (!next) return null;
          const resolved = {
            ...next,
            assetHistory: mergeAssetHistoryBuckets(prevGs, next),
          };
          const tracked = applyDay8RoundTracking(snap.data(), resolved, {});
          const updates = {
            gameState: tracked.gameState,
            remainingTurns: tracked.remainingTurns,
            completedPlayers: tracked.completedPlayers,
            totalPot: tracked.totalPot,
          };
          if (tracked.gameState.gamePhase === GAME_PHASE.finalBattle) updates.status = "FINAL_BATTLE";
          if (tracked.gameState.gamePhase === GAME_PHASE.results) updates.status = "completed";
          transaction.update(ref, updates);
          return tracked.gameState;
        });
      } catch (e) {
        setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        return null;
      }
    },
    [roomId, myId],
  );

  /** マルチ8日目スロット：gameState + totalPot を同一トランザクションで更新 */
  const commitDay8SlotSpin = useCallback(
    async (ctx, writeMode = "actorTurn") => {
      if (!roomId || !ctx) return null;
      const ref = doc(db, "rooms", roomId);
      try {
        return await runTransaction(db, async (transaction) => {
          const snap = await transaction.get(ref);
          if (!snap.exists()) return null;
          const liveRoom = snap.data();
          const liveGs = liveRoom?.gameState;
          if (writeMode === "ghostAutomation") {
            const liveCp = liveGs?.players?.[liveGs?.currentPlayerIdx];
            if (!isTurnAutomatable(liveCp, roomPlayers)) return null;
            if (liveCp?.id === myId) return null;
          } else if (!isActorTurnOnGameState(liveGs, myId)) {
            return null;
          }

          const triggersPotPayout = ctx.res?.tier === "potJackpot";
          const prevPot = readRoomTotalPot(liveRoom);
          const potDelta = computeProgressivePotDelta(prevPot, ctx.bet, triggersPotPayout);
          const nextGs = applyDay8SlotSpinToFreshGameState(liveGs, {
            ...ctx,
            potPayout: potDelta.potPayout,
            potContribution: potDelta.contribution,
          });
          if (!nextGs) return null;
          const resolvedGS = {
            ...nextGs,
            assetHistory: mergeAssetHistoryBuckets(liveGs, nextGs),
          };

          const tracked = applyDay8RoundTracking(liveRoom, resolvedGS, {});
          const turnAdd = Math.max(0, tracked.totalPot - prevPot);
          const totalPot = triggersPotPayout ? potDelta.totalPot : potDelta.totalPot + turnAdd;
          const trackedWithPot = { ...tracked, totalPot };
          const updates = {
            gameState: trackedWithPot.gameState,
            remainingTurns: trackedWithPot.remainingTurns,
            completedPlayers: trackedWithPot.completedPlayers,
            totalPot: trackedWithPot.totalPot,
          };
          if (trackedWithPot.gameState.gamePhase === GAME_PHASE.finalBattle) updates.status = "FINAL_BATTLE";
          if (trackedWithPot.gameState.gamePhase === GAME_PHASE.results) updates.status = "completed";
          transaction.update(ref, updates);
          return trackedWithPot.gameState;
        });
      } catch (e) {
        setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        return null;
      }
    },
    [roomId, myId, roomPlayers],
  );

  /** マルチ8日目スロット：spinning フェーズのみ書き込み（観戦同期用） */
  const commitDay8SlotSpinStart = useCallback(
    async (ctx, writeMode = "actorTurn") => {
      if (!roomId || !ctx) return null;
      const ref = doc(db, "rooms", roomId);
      try {
        return await runTransaction(db, async (transaction) => {
          const snap = await transaction.get(ref);
          if (!snap.exists()) return null;
          const liveRoom = snap.data();
          const liveGs = liveRoom?.gameState;
          if (writeMode === "ghostAutomation") {
            const liveCp = liveGs?.players?.[liveGs?.currentPlayerIdx];
            if (!isTurnAutomatable(liveCp, roomPlayers)) return null;
            if (liveCp?.id === myId) return null;
          } else if (!isActorTurnOnGameState(liveGs, myId)) {
            return null;
          }
          const nextGs = buildDay8SlotSpinningGs(liveGs, ctx);
          if (!nextGs) return null;
          const resolvedGS = {
            ...nextGs,
            assetHistory: mergeAssetHistoryBuckets(liveGs, nextGs),
          };
          const tracked = applyDay8RoundTracking(liveRoom, resolvedGS, {});
          const updates = {
            gameState: tracked.gameState,
            remainingTurns: tracked.remainingTurns,
            completedPlayers: tracked.completedPlayers,
            totalPot: tracked.totalPot,
          };
          if (tracked.gameState.gamePhase === GAME_PHASE.finalBattle) updates.status = "FINAL_BATTLE";
          if (tracked.gameState.gamePhase === GAME_PHASE.results) updates.status = "completed";
          transaction.update(ref, updates);
          return tracked.gameState;
        });
      } catch (e) {
        setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        return null;
      }
    },
    [roomId, myId, roomPlayers],
  );

  // ─── ロビー操作 ──────────────────────────────────────────────────────
  const handleCreateRoom = async () => {
    resumeSoundFromUserGesture();
    if (lobbyActionBusyRef.current) return;
    if (!myId) {
      setUiError("接続中です。少し待ってから再度お試しください。");
      return;
    }
    const useName = myName.trim() || genQuickName();
    if (!myName.trim()) setMyName(useName);
    const useFullId = `${useName}#${myTag}`;
    lobbyActionBusyRef.current = true;
    setLoading(true);
    setUiError("");
    const roomPayload = {
      hostId: myId,
      status: "lobby",
      playerSlots: [{ id: myId, name: useName, fullId: useFullId }],
      playerIds: [myId],
      completedPlayers: [],
      remainingTurns: BAL.dice.maxTurns,
      totalPot: INITIAL_PROGRESSGRESSIVE_POT,
      gameState: null,
      isPrivate: isPrivateRoom,
      allowedPlayers: isPrivateRoom ? [useFullId] : [],
      invitedAuthUids: isPrivateRoom ? [myId] : [],
      createdAt: new Date().toISOString(),
    };
    try {
      const rid = await createRoomWithRetry(createRoom, roomPayload);
      setRoomId(rid);
      persistRoomSession(rid, useName);
      setWaitingSessionKey((n) => n + 1);
      setScreen("waiting");
    } catch (e) {
      setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
    } finally {
      lobbyActionBusyRef.current = false;
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    resumeSoundFromUserGesture();
    if (lobbyActionBusyRef.current) return;
    if (!joinInput.trim()) { setUiError("ルームIDを入力してください"); return; }
    const useName = myName.trim() || genQuickName();
    if (!myName.trim()) setMyName(useName);
    const useFullId = `${useName}#${myTag}`;
    lobbyActionBusyRef.current = true;
    setLoading(true); setUiError("");
    try {
      const rid  = joinInput.trim().toUpperCase();
      const snap = await fetchRoom(rid);
      if (!snap.exists())                  { setUiError("ルームが見つかりません"); lobbyActionBusyRef.current = false; setLoading(false); return; }
      const data = snap.data();
      const alreadyMember = (data.playerIds ?? []).includes(myId);
      if (data.status !== "lobby" && !alreadyMember) {
        setUiError("このルームはすでに開始されています");
        lobbyActionBusyRef.current = false;
        setLoading(false);
        return;
      }
      if (data.status === "lobby") {
      if (data.playerSlots.length >= 4)    { setUiError("ルームが満員です"); lobbyActionBusyRef.current = false; setLoading(false); return; }
      // 招待制チェック
      if (data.isPrivate && !data.allowedPlayers?.includes(useFullId)) {
        setUiError(`招待されていません。ホストに「${useFullId}」を共有して招待してもらってください`);
        lobbyActionBusyRef.current = false;
        setLoading(false);
        return;
      }
      if (!data.playerSlots.find(s => s.id === myId)) {
        await updateRoomById(rid, {
          playerSlots: arrayUnion({ id: myId, name: useName, fullId: useFullId }),
          playerIds:   arrayUnion(myId),
        });
      }
      }
      setRoomId(rid);
      persistRoomSession(rid, useName);
      if (data.status === "lobby") {
        setWaitingSessionKey((n) => n + 1);
        setScreen("waiting");
      } else {
        restoreScreenFromRoom(data);
      }
    } catch (e) { setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。")); }
    lobbyActionBusyRef.current = false;
    setLoading(false);
  };

  const handleStartGame = async () => {
    if (lobbyActionBusyRef.current) return;
    if (!isHost || !roomId || !myId || playerSlots.length < 1) return;
    const missingCharacter = playerSlots.some((s) => !s.character);
    if (missingCharacter) {
      setUiError("全員がキャラクターを選択してから開始してください");
      return;
    }
    const missingInitialRolls = playerSlots.some((s) => !normalizeSlotInitialRolls(s.initialRolls));
    if (missingInitialRolls) {
      setUiError("全員がステータス抽選を確定（同期）してから開始してください");
      return;
    }
    if (!allLobbyMembersReady(playerSlots, myId)) {
      setUiError("全員が準備完了するまで開始できません");
      return;
    }
    lobbyActionBusyRef.current = true;
    setLoading(true);
    setUiError("");
    try {
      const ref = doc(db, "rooms", roomId);
      await runTransaction(db, async (tx) => {
        const snap = await tx.get(ref);
        if (!snap.exists()) throw new Error("ROOM_MISSING");
        const d = snap.data();
        if (d.hostId !== myId) throw new Error("NOT_HOST");
        if (d.status !== "lobby") throw new Error("ALREADY_STARTED");
        const slots = d.playerSlots ?? [];
        if (slots.length < 1) throw new Error("NO_PLAYERS");
        if (slots.some((s) => !s.character)) throw new Error("MISSING_CHAR");
        if (slots.some((s) => !normalizeSlotInitialRolls(s.initialRolls))) throw new Error("MISSING_ROLLS");
        if (!allLobbyMembersReady(slots, d.hostId)) throw new Error("NOT_ALL_READY");
        const initGS = initialGameState(slots);
        const startPot = rollInitialProgressivePot();
        tx.update(ref, {
          status: "playing",
          gameState: initGS,
          completedPlayers: [],
          remainingTurns: BAL.dice.maxTurns,
          totalPot: startPot,
        });
      });
    } catch (e) {
      const code = e?.message;
      if (code === "ALREADY_STARTED") setUiError("このルームはすでに開始されています。");
      else if (code === "NOT_HOST") setUiError("ホストのみがゲームを開始できます。");
      else if (code === "ROOM_MISSING") setUiError("ルームが見つかりません。");
      else if (code === "NO_PLAYERS" || code === "MISSING_CHAR" || code === "MISSING_ROLLS") {
        setUiError("開始条件を満たしていません。全員のキャラとステータス抽選を確認してください。");
      } else if (code === "NOT_ALL_READY") {
        setUiError("全員が準備完了するまで開始できません。");
      } else {
        setUiError(formatFriendlyError(e, "ゲーム開始に失敗しました。しばらくしてから再度お試しください。"));
      }
    }
    lobbyActionBusyRef.current = false;
    setLoading(false);
  };

  /** raw ダイス 0〜5 のみ Firestore に書く。最終ステータスは initialGameState で算出 */
  const handleCommitInitialRolls = useCallback(async ({ luck, skill, virtue, pon }) => {
    if (!roomId || !myId) return false;
    try {
      const payload = normalizeSlotInitialRolls({ luck, skill, virtue, pon });
      if (!payload) throw new Error("ダイス値が不正です");
      const newSlots = playerSlots.map((s) => {
        if (s.id !== myId) return s;
        const next = { ...s, initialRolls: payload, lobbyReady: false };
        delete next.initialStats;
        return next;
      });
      await updateRoom({ playerSlots: newSlots });
      return true;
    } catch (e) {
      setUiError(formatFriendlyError(e, "ステータス抽選の保存に失敗しました。しばらくしてから再度お試しください。"));
      return false;
    }
  }, [roomId, myId, playerSlots, updateRoom]);

  const handleSetLobbyReady = useCallback(
    async (ready) => {
      if (!roomId || !myId || isHost) return;
      const mySlot = playerSlots.find((s) => s.id === myId);
      if (ready && !isLobbySlotConfigured(mySlot)) {
        setUiError("キャラクターとステータス抽選を確定してから準備完了してください");
        return;
      }
      try {
        const newSlots = playerSlots.map((s) =>
          s.id === myId ? { ...s, lobbyReady: !!ready } : s,
        );
        await updateRoom({ playerSlots: newSlots });
        setUiError("");
      } catch (e) {
        setUiError(formatFriendlyError(e, "準備状態の更新に失敗しました。しばらくしてから再度お試しください。"));
      }
    },
    [roomId, myId, isHost, playerSlots, updateRoom],
  );

  // ─── キャラクター選択（待機室） ──────────────────────────────────────
  const handleSelectCharacter = useCallback(
    async (charKey, initialDiceDraft = null) => {
      if (!roomId || !myId) return;
      if (
        charKey === SECRET_RIRIMU_CHARACTER_KEY &&
        !isSecretRirimuUnlockedByTrimmedPlayerName(myName)
      ) {
        setUiError(
          `シークレットキャラは、プレイヤー名が「${SECRET_RIRIMU_UNLOCK_PLAYER_NAME}」と一致するときのみ選べます（前後の空白は無視）。`,
        );
        return;
      }
      const newSlots = playerSlots.map((s) => {
        if (s.id !== myId) return s;
        let next = { ...s, character: charKey, lobbyReady: false };
        if (initialDiceDraft != null && typeof initialDiceDraft === "object") {
          const payload = normalizeSlotInitialRolls(initialDiceDraft);
          if (payload) {
            next = { ...next, initialRolls: payload };
            delete next.initialStats;
          }
        }
        return next;
      });
      try {
        await updateRoom({ playerSlots: newSlots });
      } catch (e) {
        setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
      }
    },
    [roomId, myId, myName, playerSlots, updateRoom],
  );

  useEffect(() => {
    if (screen !== "waiting" || !roomId || !myId) return;
    if (isSecretRirimuUnlockedByTrimmedPlayerName(myName)) return;
    const slot = playerSlots.find((s) => s.id === myId);
    if (!slot || slot.character !== SECRET_RIRIMU_CHARACTER_KEY) return;
    void handleSelectCharacter("salaryman");
  }, [screen, myName, playerSlots, myId, roomId, handleSelectCharacter]);

  const handleReturnToLobby = () => {
    clearRoomSession();
    lobbyActionBusyRef.current = false;
    hadRoomDataRef.current = false;
    roomIdWithDataRef.current = null;
    setLoading(false);
    setInvitesLoading(false);
    setMultiAction(null);
    setInvitesPanelOpen(false);
    setScreen("lobby");
    setRoomId(null);
    setUiError("");
  };

  const exitRoomToMainMenu = useCallback((message = "") => {
    hadRoomDataRef.current = false;
    roomIdWithDataRef.current = null;
    wasLobbyPlayerRef.current = false;
    clearRoomSession();
    setRoomId(null);
    setScreen("lobby");
    setUiError(message);
  }, [setRoomId]);

  const restoreScreenFromRoom = useCallback((data) => {
    const gsPhase = data?.gameState?.gamePhase;
    if (data?.status === "lobby") {
      setScreen("waiting");
      setWaitingSessionKey((n) => n + 1);
      return;
    }
    if (data?.status === "completed" || gsPhase === "results") {
      setScreen("results");
      return;
    }
    if (gsPhase === "gameOver") {
      setScreen("gameover");
      return;
    }
    setScreen("playing");
  }, []);

  const handleGracefulLeaveGame = useCallback(async () => {
    if (!roomId || !myId || leaveGameLoading) return false;
    if (!roomGs) {
      setUiError("ゲーム状態の読み込み中です。少し待ってから再度お試しください。");
      return false;
    }
    const patch = buildGracefulLeavePatch(roomGs, myId);
    if (!patch) {
      setUiError("退室できません。プレイヤー情報が見つかりません。");
      return false;
    }
    if (patch.localOnly) {
      setLeaveGameConfirmOpen(false);
      exitRoomToMainMenu("ルームから退室しました。他のプレイヤーは自動操作でゲームが続行されます。");
      return true;
    }
    setLeaveGameLoading(true);
    setUiError("");
    leaveInFlightRef.current = true;
    try {
      await updateRoom(patch);
      try {
        await updateCurrentAction("leave");
      } catch {
        /* presence doc is optional for leaving */
      }
      setLeaveGameConfirmOpen(false);
      exitRoomToMainMenu("ルームから退室しました。他のプレイヤーは自動操作でゲームが続行されます。");
      return true;
    } catch (e) {
      setUiError(formatFriendlyError(e, "退室処理に失敗しました。しばらくしてから再度お試しください。"));
      return false;
    } finally {
      leaveInFlightRef.current = false;
      setLeaveGameLoading(false);
    }
  }, [roomId, myId, roomGs, leaveGameLoading, updateCurrentAction, updateRoom, exitRoomToMainMenu]);

  const handleHostDisbandRoom = useCallback(async () => {
    if (!roomId || !isHost || !myId) return;
    setResultsRoomActionLoading(true);
    setUiError("");
    try {
      await deleteDoc(doc(db, "rooms", roomId));
      exitRoomToMainMenu();
    } catch (e) {
      setUiError(formatFriendlyError(e, "ルームの解散に失敗しました。しばらくしてから再度お試しください。"));
    }
    setResultsRoomActionLoading(false);
  }, [roomId, isHost, myId, exitRoomToMainMenu]);

  const handleHostContinueToLobby = useCallback(async () => {
    if (!roomId || !isHost || !roomData) return;
    setResultsRoomActionLoading(true);
    setUiError("");
    try {
      await updateRoom(buildHostContinueToLobbyPatch(roomData));
    } catch (e) {
      setUiError(formatFriendlyError(e, "待機室への戻しに失敗しました。しばらくしてから再度お試しください。"));
    }
    setResultsRoomActionLoading(false);
  }, [roomId, isHost, roomData, updateRoom]);

  const handleLeaveRoomFromResults = useCallback(async () => {
    if (!roomId || !myId || !roomData || isHost) return;
    setResultsRoomActionLoading(true);
    setUiError("");
    try {
      const patch = buildLeaveRoomPatch(roomData, myId);
      if ((patch.playerIds?.length ?? 0) < 1) {
        setUiError("参加者がいないため抜けられません。ホストに解散を依頼してください。");
        setResultsRoomActionLoading(false);
        return;
      }
      await updateRoom(patch);
      try {
        await deleteDoc(doc(db, "rooms", roomId, "players", myId));
      } catch {
        /* presence doc optional */
      }
      exitRoomToMainMenu();
    } catch (e) {
      setUiError(formatFriendlyError(e, "ルームからの退出に失敗しました。しばらくしてから再度お試しください。"));
    }
    setResultsRoomActionLoading(false);
  }, [roomId, myId, roomData, isHost, updateRoom, exitRoomToMainMenu]);

  // ─── 招待（ホワイトリスト）追加 ──────────────────────────────────────
  const handleInvitePlayer = async () => {
    const inv = inviteInput.trim();
    if (!inv || !inv.match(/^.+#\d{4}$/)) {
      setInviteError("「Name#ID」の形式（例: 闇月リリム#1234）で入力してください。# を含めた全文を入力してください");
      return;
    }
    if (roomData?.allowedPlayers?.includes(inv)) {
      setInviteError("すでに招待済みです");
      return;
    }
    if (lobbyActionBusyRef.current) return;
    lobbyActionBusyRef.current = true;
    try {
      const inviteeUid = await resolveInviteeUid(inv);
      await updateRoom(buildInviteRoomPatch(inv, inviteeUid));
      if (inviteeUid && roomId) {
        await pushInviteInbox(inviteeUid, roomId);
      }
      setInviteInput("");
      if (!inviteeUid) {
        setInviteError(
          "ホワイトリストに追加しました。相手が一度STARTしてから「招待を確認」できるようになります（未起動の場合はルームID共有でも参加可）。",
        );
      } else {
        setInviteError("");
      }
    } catch (e) {
      setInviteError(formatFriendlyError(e, "招待の追加に失敗しました。しばらくしてから再度お試しください。"));
    } finally {
      lobbyActionBusyRef.current = false;
    }
  };

  const handleCancelInvite = useCallback(
    async (cancelFullId) => {
      if (!cancelFullId || !roomId || !isHost || !roomData || roomData.status !== "lobby") return false;
      if (lobbyActionBusyRef.current || kickLoading || cancelInviteLoading) return false;
      const hostSlot = roomData.playerSlots?.find((s) => s.id === roomData.hostId);
      if (cancelFullId === hostSlot?.fullId) return false;
      const pendingSlot = roomData.playerSlots?.find((s) => s.fullId === cancelFullId);
      if (pendingSlot) return false;

      lobbyActionBusyRef.current = true;
      setCancelInviteLoading(cancelFullId);
      setInviteError("");
      try {
        const built = await buildCancelInvitePatch(roomData, cancelFullId);
        if (!built?.patch) return false;
        await updateRoom(built.patch);
        if (built.inviteeUid) {
          await removeInviteFromInbox(built.inviteeUid, roomId);
        }
        return true;
      } catch (e) {
        setInviteError(formatFriendlyError(e, "招待の取り消しに失敗しました。しばらくしてから再度お試しください。"));
        return false;
      } finally {
        lobbyActionBusyRef.current = false;
        setCancelInviteLoading(null);
      }
    },
    [roomId, isHost, roomData, kickLoading, cancelInviteLoading, updateRoom],
  );

  const handleHostKickPlayer = useCallback(async (targetUid) => {
    if (lobbyActionBusyRef.current || kickLoading) return false;
    if (!roomId || !isHost || !roomData || roomData.status !== "lobby") return false;
    if (!targetUid || targetUid === myId || targetUid === roomData.hostId) return false;

    const patch = buildKickPlayerPatch(roomData, targetUid);
    if (!patch) return false;

    lobbyActionBusyRef.current = true;
    setKickLoading(true);
    setUiError("");
    try {
      await updateRoom(patch);
      lobbyActionBusyRef.current = false;
      setKickLoading(false);
      return true;
    } catch (e) {
      setUiError(formatFriendlyError(e, "プレイヤーの退室処理に失敗しました。しばらくしてから再度お試しください。"));
      lobbyActionBusyRef.current = false;
      setKickLoading(false);
      return false;
    }
  }, [roomId, isHost, roomData, myId, kickLoading, updateRoom]);

  // ─── クリップボードにコピー ────────────────────────────────────────
  const flashCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyMyId = () => {
    if (!myFullId) return;
    navigator.clipboard.writeText(myFullId).then(flashCopied).catch(() => {});
  };

  const handleCopyRoomId = () => {
    if (!roomId) return;
    navigator.clipboard.writeText(roomId).then(flashCopied).catch(() => {});
  };

  // ─── エントリー確定（名前確定→モード選択へ） ─────────────────────
  const handleConfirmEntry = () => {
    resumeSoundFromUserGesture();
    const useName = myName.trim() || genQuickName();
    if (!myName.trim()) setMyName(useName);
    persistRoomSession(null, useName);
    setMultiAction(null);
    setUiError("");
    setScreen("lobby");
    const useFullId = `${useName}#${myTag}`;
    if (myId && useFullId) {
      void registerFullIdIndex(useFullId, myId).catch((e) => console.warn("[fullIdIndex] register failed", e));
    }
  };

  // ─── ひとりで遊ぶ（ソロプレイ） ──────────────────────────────────
  const handleSoloPlay = async () => {
    resumeSoundFromUserGesture();
    if (lobbyActionBusyRef.current) return;
    if (!myId) {
      setUiError("接続中です。少し待ってから再度お試しください。");
      return;
    }
    const useName = myName.trim() || genQuickName();
    if (!myName.trim()) setMyName(useName);
    const useFullId = `${useName}#${myTag}`;
    lobbyActionBusyRef.current = true;
    setLoading(true);
    setUiError("");
    const roomPayload = {
      hostId: myId,
      status: "lobby",
      playerSlots: [{ id: myId, name: useName, fullId: useFullId }],
      playerIds: [myId],
      completedPlayers: [],
      remainingTurns: BAL.dice.maxTurns,
      totalPot: INITIAL_PROGRESSGRESSIVE_POT,
      gameState: null,
      isPrivate: true,
      isSolo: true,
      allowedPlayers: [useFullId],
      invitedAuthUids: [myId],
      createdAt: new Date().toISOString(),
    };
    try {
      const rid = await createRoomWithRetry(createRoom, roomPayload);
      setRoomId(rid);
      persistRoomSession(rid, useName);
      setWaitingSessionKey((n) => n + 1);
      setScreen("waiting");
    } catch (e) {
      setUiError(formatFriendlyError(e, "一人プレイ用のルームを作成できませんでした。ネットワークを確認のうえ、再度お試しください。"));
    } finally {
      lobbyActionBusyRef.current = false;
      setLoading(false);
    }
  };

  const queryPendingInvites = useCallback(async () => {
    if (!myFullId || !myId) return [];
    const roomIds = [...new Set(await fetchInviteInboxRoomIds(myId))].slice(0, 20);
    const invites = await Promise.all(
      roomIds.map(async (rid) => {
        const snap = await fetchRoom(rid);
        if (!snap.exists()) return null;
        const data = snap.data();
        if (data.status !== "lobby") return null;
        if (data.isPrivate && !data.allowedPlayers?.includes(myFullId)) return null;
        const slots = data.playerSlots ?? [];
        if (slots.length >= 4) return null;
        if (slots.some((s) => s.id === myId)) return null;
        const hostSlot = slots.find((s) => s.id === data.hostId);
        return {
          roomId: rid,
          hostName: hostSlot?.name?.trim() || "ホスト",
        };
      }),
    );
    return invites.filter(Boolean);
  }, [myFullId, myId, fetchRoom]);

  useEffect(() => {
    if (!authReady || !myId || roomId || reconnectAttemptedRef.current) return;
    reconnectAttemptedRef.current = true;
    const { roomId: storedId, playerName } = readStoredRoomSession();
    if (!storedId) return;
    if (playerName) setMyName(playerName);
    let cancelled = false;
    setReconnecting(true);
    (async () => {
      try {
        const snap = await fetchRoom(storedId);
        if (cancelled) return;
        if (!snap.exists()) {
          clearRoomSession();
          return;
        }
        const data = snap.data();
        if (!(data.playerIds ?? []).includes(myId)) {
          clearRoomSession();
          return;
        }
        const inGamePlayers = data.gameState?.players ?? [];
        const meInGame = inGamePlayers.find((p) => p.id === myId);
        if (
          (data.status === "playing" || data.status === "FINAL_BATTLE") &&
          inGamePlayers.length > 0 &&
          meInGame?.isGameOver
        ) {
          clearRoomSession();
          return;
        }
        if (
          (data.status === "playing" || data.status === "FINAL_BATTLE") &&
          inGamePlayers.length > 0 &&
          !inGamePlayers.some((p) => p.id === myId)
        ) {
          clearRoomSession();
          return;
        }
        setRoomId(storedId);
        restoreScreenFromRoom(data);
      } catch (e) {
        console.warn("[reconnect] failed", e);
      } finally {
        if (!cancelled) setReconnecting(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authReady, myId, roomId, fetchRoom, restoreScreenFromRoom]);

  useEffect(() => {
    if (roomId && myName) persistRoomSession(roomId, myName);
  }, [roomId, myName]);

  useEffect(() => {
    if (!myFullId || !myId) return;
    void registerFullIdIndex(myFullId, myId).catch((e) => console.warn("[fullIdIndex] register failed", e));
  }, [myFullId, myId]);

  useEffect(() => {
    if (!roomId || !roomData || roomData.status !== "lobby" || roomData.hostId !== myId) return undefined;
    let cancelled = false;
    const run = async () => {
      if (cancelled) return;
      try {
        const data = roomDataRef.current ?? roomData;
        const { patch, uidsToAdd } = await backfillInvitedAuthUids(data, roomId);
        if (patch && !cancelled) await updateRoom(patch);
        const inboxTargets = new Set(uidsToAdd);
        for (const fullId of data?.allowedPlayers ?? []) {
          const uid = await resolveInviteeUid(fullId);
          if (uid) inboxTargets.add(uid);
        }
        if (!cancelled) {
          await Promise.all([...inboxTargets].map((uid) => pushInviteInbox(uid, roomId)));
        }
      } catch (e) {
        console.warn("[invites] backfill failed", e);
      }
    };
    void run();
    const id = setInterval(run, 20000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [roomId, roomData?.status, roomData?.hostId, roomData?.allowedPlayers, myId, updateRoom, roomData]);

  useEffect(() => {
    if (!roomId || !myId) return undefined;
    const tick = () => {
      void updateCurrentAction("heartbeat").catch(() => {});
    };
    tick();
    const id = setInterval(tick, HEARTBEAT_INTERVAL_MS);
    return () => clearInterval(id);
  }, [roomId, myId, updateCurrentAction]);

  useEffect(() => {
    if (!roomId || !myId || !roomGs || roomData?.isSolo || leaveInFlightRef.current) return;
    const me = roomGs.players?.find((p) => p.id === myId);
    if (!me?.isGhost || me?.isGameOver) return;
    const now = Date.now();
    if (now - lastSelfGhostClearAttemptRef.current < 10_000) return;
    lastSelfGhostClearAttemptRef.current = now;
    const patch = buildClearSelfPresencePatch(roomGs, myId);
    if (!patch) return;
    void updateRoom(patch).catch(() => {});
  }, [roomId, myId, roomGs, roomData?.isSolo, updateRoom]);

  useEffect(() => {
    if (!roomId || !roomData || roomData.isSolo) return undefined;
    if (!shouldRunGhostAutomationController({ roomData, myId, roomPlayers, isHost })) return undefined;

    const markStale = () => {
      void commitMarkNetworkGhostPatch(db, roomId, roomPlayers).catch(() => {});
    };

    markStale();
    const id = setInterval(markStale, PRESENCE_STALE_CHECK_MS);
    return () => clearInterval(id);
  }, [roomId, roomData, myId, roomPlayers, isHost]);

  useEffect(() => {
    if (!roomId || !roomData || roomData.isSolo) return undefined;
    if (!shouldRunGhostAutomationController({ roomData, myId, roomPlayers, isHost })) return undefined;

    const tick = async () => {
      if (ghostAutomationBusyRef.current) return;
      const gs = gsRef.current;
      if (!gs || gs.gamePhase !== GAME_PHASE.playing) return;
      const cp = gs.players?.[gs.currentPlayerIdx];
      if (!isTurnAutomatable(cp, roomPlayers)) return;

      const leased = await tryAcquireGhostAutomationLease(db, roomId, myId);
      if (!leased) return;

      if (cp.id === myId) {
        if (cp.alive !== false || !isDay8SlotBurstFinishedOnGameState(gs)) return;
        const phase = gs.slotPhase ?? "idle";
        if (phase === "spinning") return;
        const now = Date.now();
        if (now - ghostSlotAdvanceCooldownRef.current < GHOST_SLOT_ADVANCE_COOLDOWN_MS) return;
        ghostSlotAdvanceCooldownRef.current = now;
        ghostAutomationBusyRef.current = true;
        try {
          await commitDay8SlotLivePatch("advanceTurn", {
            markDay8TurnComplete: true,
            turnCompletePlayerId: cp.id,
          });
        } finally {
          ghostAutomationBusyRef.current = false;
        }
        return;
      }

      const step = runGhostAutomationStep(gs, {
        roomPlayers,
        day8RemainingTurns:
          Number.isFinite(Number(roomData?.remainingTurns)) && Number(roomData?.remainingTurns) >= 0
            ? Math.floor(Number(roomData.remainingTurns))
            : BAL.dice.maxTurns,
      });
      if (!step) return;

      ghostAutomationBusyRef.current = true;
      try {
        if (step.type === "slotSpin") {
          const spinStartCtx = {
            ...step.ctx,
            res: step.ctx.spinStartRes ?? step.ctx.res,
            visualReels: step.ctx.spinStartVisualReels ?? step.ctx.visualReels,
          };
          const spinningGs = await commitDay8SlotSpinStart(spinStartCtx, "ghostAutomation");
          if (!spinningGs) return;
          const waitMs = slotSyncReel3StopMs(!!spinningGs.isReach, false);
          await new Promise((resolve) => setTimeout(resolve, waitMs));
          const resultGS = await commitDay8SlotSpin(step.ctx, "ghostAutomation");
          if (resultGS) {
            const afterBurst = finishGhostSlotBurst(resultGS);
            if (afterBurst && afterBurst !== resultGS) {
              const jpWait = day8SlotMajorWinAdvanceRemainingMs(resultGS);
              if (jpWait > 0) {
                await new Promise((resolve) => setTimeout(resolve, jpWait));
              }
              const now = Date.now();
              if (now - ghostSlotAdvanceCooldownRef.current >= GHOST_SLOT_ADVANCE_COOLDOWN_MS) {
                ghostSlotAdvanceCooldownRef.current = now;
                await commitDay8SlotLivePatch("advanceTurn", {
                  markDay8TurnComplete: "auto",
                  turnCompletePlayerId: cp?.id ?? null,
                  writeMode: "ghostAutomation",
                });
              }
            }
          }
        } else if (step.type === "reassign") {
          await writeGhostAutomationGS(step.gameState);
        } else if (step.type === "advance") {
          await writeGhostAutomationGS(step.gameState, { markDay8TurnComplete: "auto" });
        } else {
          await writeGhostAutomationGS(step, { markDay8TurnComplete: "auto" });
        }
      } finally {
        ghostAutomationBusyRef.current = false;
      }
    };

    void tick();
    const id = setInterval(() => void tick(), GHOST_AUTOMATION_POLL_MS);
    return () => clearInterval(id);
  }, [
    roomId,
    roomData,
    myId,
    roomPlayers,
    isHost,
    writeGhostAutomationGS,
    commitDay8SlotSpin,
    commitDay8SlotSpinStart,
    commitDay8SlotLivePatch,
  ]);

  useEffect(() => {
    if (!roomId) {
      wasLobbyPlayerRef.current = false;
      return;
    }
    if (!roomData || !myId) return;

    const inRoom = (roomData.playerIds ?? []).includes(myId);
    if (inRoom) {
      wasLobbyPlayerRef.current = true;
      return;
    }

    if (
      wasLobbyPlayerRef.current &&
      roomData.status === "lobby" &&
      screen === "waiting" &&
      !roomData.isSolo
    ) {
      exitRoomToMainMenu("ホストによりルームから退室させられました。");
    }
  }, [roomId, roomData, myId, screen, exitRoomToMainMenu]);

  useEffect(() => {
    if (screen !== "lobby" || !myFullId || !myId) return undefined;
    let cancelled = false;

    const refreshInvites = async () => {
      try {
        const list = await queryPendingInvites();
        if (cancelled) return;
        setPendingInvites(list);
        setInvitesProbeReady(true);
        // 背景取得で招待パネルを勝手に開かない（レイアウト変動でクリックが落ちるのを防ぐ）
      } catch (e) {
        if (cancelled) return;
        setPendingInvites([]);
        setInvitesProbeReady(true);
        console.warn("[invites] query failed", e);
      }
    };

    const isFirstLobbyProbe = !lobbyInviteAutoProbeDoneRef.current;
    let probeDelay = null;
    if (isFirstLobbyProbe) {
      lobbyInviteAutoProbeDoneRef.current = true;
      setInvitesLoading(true);
      probeDelay = setTimeout(() => {
        if (cancelled) return;
        void refreshInvites().finally(() => {
          if (!cancelled) setInvitesLoading(false);
        });
      }, 800);
    } else {
      void refreshInvites();
    }

    const interval = setInterval(() => {
      void refreshInvites();
    }, 20000);

    return () => {
      cancelled = true;
      if (probeDelay) clearTimeout(probeDelay);
      clearInterval(interval);
    };
  }, [screen, myFullId, myId, queryPendingInvites]);

  const handleFetchInvites = useCallback(async () => {
    if (lobbyActionBusyRef.current) return;
    if (!myFullId || !myId) return;
    lobbyActionBusyRef.current = true;
    setInvitesPanelOpen(true);
    setInvitesLoading(true);
    setUiError("");
    try {
      const list = await queryPendingInvites();
      setPendingInvites(list);
      setInvitesProbeReady(true);
      if (list.length > 0) {
        setInvitesPanelOpen(true);
        setUiError("");
      } else {
        setUiError("招待されているルームが見つかりませんでした。ホストにあなたの ID（Name#1234）を共有してもらってください。");
      }
    } catch (e) {
      setPendingInvites([]);
      setInvitesProbeReady(true);
      setUiError(formatFriendlyError(e, "招待の取得に失敗しました。しばらくしてから再度お試しください。"));
    }
    lobbyActionBusyRef.current = false;
    setInvitesLoading(false);
  }, [myFullId, myId, queryPendingInvites]);

  const handleJoinInvite = useCallback(
    async (rid) => {
      if (lobbyActionBusyRef.current) return;
      if (!rid || !myId || !myFullId) return;
      const useName = myName.trim() || genQuickName();
      if (!myName.trim()) setMyName(useName);
      lobbyActionBusyRef.current = true;
      setLoading(true);
      setUiError("");
      try {
        const snap = await fetchRoom(rid);
        if (!snap.exists()) {
          setUiError("ルームが見つかりません");
          lobbyActionBusyRef.current = false;
          setLoading(false);
          return;
        }
        const data = snap.data();
        const alreadyMember = (data.playerIds ?? []).includes(myId);
        if (data.status !== "lobby" && !alreadyMember) {
          setUiError("このルームはすでに開始されています");
          lobbyActionBusyRef.current = false;
          setLoading(false);
          return;
        }
        if (data.status === "lobby") {
        if ((data.playerSlots?.length ?? 0) >= 4) {
          setUiError("ルームが満員です");
          lobbyActionBusyRef.current = false;
          setLoading(false);
          return;
        }
        if (data.isPrivate && !data.allowedPlayers?.includes(myFullId)) {
          setUiError(`招待されていません。ホストに「${myFullId}」を共有してもらってください`);
          lobbyActionBusyRef.current = false;
          setLoading(false);
          return;
        }
        if (!data.playerSlots?.find((s) => s.id === myId)) {
          await updateRoomById(rid, {
            playerSlots: arrayUnion({ id: myId, name: useName, fullId: myFullId }),
            playerIds: arrayUnion(myId),
          });
        }
        }
        setRoomId(rid);
        persistRoomSession(rid, useName);
        if (data.status === "lobby") {
          setWaitingSessionKey((n) => n + 1);
          setScreen("waiting");
        } else {
          restoreScreenFromRoom(data);
        }
        setInvitesPanelOpen(false);
        setPendingInvites([]);
        await removeInviteFromInbox(myId, rid);
      } catch (e) {
        setUiError(formatFriendlyError(e, "ルームへの参加に失敗しました。しばらくしてから再度お試しください。"));
      }
      lobbyActionBusyRef.current = false;
      setLoading(false);
    },
    [myId, myFullId, myName, fetchRoom, updateRoomById, setRoomId, restoreScreenFromRoom],
  );

  /** ゴール直後ターン終了 → waitingSlot（または権利0ならその場で終了処理）へ（ソロのみ手動） */
  const handleGoalLandingConfirm = async () => {
    if (!gs || !myId || isMultiplayerRoom) return;
    if (!acceptTurnAction()) return;
    const confirmed = applyGoalLandingConfirm(gs, myId);
    if (!confirmed) return;
    const advanced = computeAdvanceDay8Turn(confirmed, confirmed.players, []);
    await writeGoalLandingConfirm(advanced, { markDay8TurnComplete: true });
  };

  /** 権利適用済みステータスでスロット筐体へ移行（この時点のアイテム・効果後の運・技量が反映される） */
  const handleBeginSlotPhase = async () => {
    if (!gs || !isMyTurn) return;
    const p = gs.players[gs.currentPlayerIdx];
    if (p.movePhase !== MOVE_PHASE.waitingSlot) return;
    const began = beginDay8SlotSeatForPlayer(p);
    if (!began) return;
    const logs = [`${p.name}: スロット開始`];
    const newPlayers = gs.players.map((pl, i) => (i !== gs.currentPlayerIdx ? pl : began));
    await writeGS({ ...gs, players: newPlayers, log: prependLogs(logs, gs.log) });
  };

  const autoBeginWaitingSlotRef = useRef(false);
  const autoGoalLandingConfirmRef = useRef(false);
  /** マルチ：古い save 等で goalLanding が残った場合は自動で確認相当へ進める */
  useEffect(() => {
    if (!isMultiplayerRoom || !myId || !roomGs) {
      autoGoalLandingConfirmRef.current = false;
      return;
    }
    const me = roomGs.players?.find((pl) => pl.id === myId);
    if (me?.movePhase !== MOVE_PHASE.goalLanding) {
      autoGoalLandingConfirmRef.current = false;
      return;
    }
    if (autoGoalLandingConfirmRef.current) return;
    autoGoalLandingConfirmRef.current = true;
    const confirmed = applyGoalLandingConfirm(roomGs, myId);
    if (!confirmed) {
      autoGoalLandingConfirmRef.current = false;
      return;
    }
    const advanced = computeAdvanceDay8Turn(confirmed, confirmed.players, []);
    void writeGoalLandingConfirm(advanced, { markDay8TurnComplete: true }).finally(() => {
      autoGoalLandingConfirmRef.current = false;
    });
  }, [isMultiplayerRoom, myId, roomGs, writeGoalLandingConfirm]);

  useEffect(() => {
    if (!isMyTurn || !cpIsWaitingSlot) {
      autoBeginWaitingSlotRef.current = false;
      return;
    }
    if (autoBeginWaitingSlotRef.current) return;
    autoBeginWaitingSlotRef.current = true;
    void handleBeginSlotPhase().finally(() => {
      autoBeginWaitingSlotRef.current = false;
    });
  }, [isMyTurn, cpIsWaitingSlot, gs]);

  const dailySlotSpinStats = useMemo(() => {
    if (!cpGs) return null;
    const s = { ...cpGs.stats };
    const n = cpGs.amulets ?? 0;
    if (n > 0) s.luck = clamp(s.luck + n * 2);
    return s;
  }, [cpGs]);

  const patchDailyCutinBroadcast = useCallback(
    async (patch) => {
      if (!roomId || roomData?.isSolo) return false;
      if (gsRef.current?.subPhase !== SUB_PHASE.daily) return false;
      try {
        await updateRoom({
          dailyCutinPhase: patch.dailyCutinPhase,
          dailyCutinSessionId: patch.dailyCutinSessionId ?? null,
          dailyCutinPayload: patch.dailyCutinPayload ?? null,
        });
        return true;
      } catch (_) {
        const g = gsRef.current;
        if (!g || !isActorTurnOnGameState(g, myId)) return false;
        try {
          return await writeGS(mergeDailyCutinFieldsIntoGameState(g, patch));
        } catch (_) {
          return false;
        }
      }
    },
    [roomId, roomData?.isSolo, updateRoom, writeGS, myId],
  );

  const clearDailyCutinBroadcast = useCallback(async () => {
    if (!roomId || roomData?.isSolo) return true;
    const roomPhase = roomDataRef.current?.dailyCutinPhase ?? "idle";
    const gsPhase = gsRef.current?.dailyCutinPhase ?? "idle";
    if (roomPhase === "idle" && gsPhase === "idle") return true;
    try {
      await updateRoom(DAILY_CUTIN_SYNC_DEFAULTS);
      return true;
    } catch (_) {
      const g = gsRef.current;
      if (!g) return false;
      try {
        return await writeGS({ ...g, ...DAILY_CUTIN_SYNC_DEFAULTS });
      } catch (_) {
        return false;
      }
    }
  }, [roomId, roomData?.isSolo, updateRoom, writeGS]);

  const dismissStuckDailyCutin = useCallback(() => {
    resetDailyOutgoingFxState();
    setUiError("");
    if (roomId && !roomData?.isSolo) {
      void clearDailyCutinBroadcast();
    }
  }, [resetDailyOutgoingFxState, roomId, roomData?.isSolo, clearDailyCutinBroadcast]);

  const beginDailyCutinSession = useCallback(() => {
    const sid = buildDailyCutinSessionId();
    dailyCutinSessionIdRef.current = sid;
    return sid;
  }, []);

  const emitDailyCutin = useCallback(
    (phase, payload = null) => {
      if (!isMultiplayerRoom) return;
      if (!dailyCutinSessionIdRef.current) beginDailyCutinSession();
      const broadcast = {
        dailyCutinPhase: phase,
        dailyCutinSessionId: dailyCutinSessionIdRef.current,
        dailyCutinPayload: payload,
      };
      pendingDailyCutinBroadcastRef.current = broadcast;
      void patchDailyCutinBroadcast(broadcast);
    },
    [isMultiplayerRoom, patchDailyCutinBroadcast, beginDailyCutinSession],
  );

  const finishDailyCutinSession = useCallback(() => {
    dailyCutinSessionIdRef.current = null;
    pendingDailyCutinBroadcastRef.current = null;
    if (!isMultiplayerRoom) return;
    void clearDailyCutinBroadcast();
  }, [isMultiplayerRoom, clearDailyCutinBroadcast]);

  const flushPendingDailyTurnWrite = useCallback(async () => {
    const pending = pendingDailyTurnWriteRef.current;
    pendingDailyTurnWriteRef.current = null;
    if (!pending) return;
    if (gsRef.current?.subPhase !== SUB_PHASE.daily) return;
    finishDailyCutinSession();
    const ok = await writeGS({
      ...pending.nextGsWithFx,
      ...pending.cutinClearPatch,
      ...DAILY_CUTIN_SYNC_DEFAULTS,
    });
    if (!ok) {
      setDay7DailyOptimisticGs(null);
      resetDailyOutgoingFxState();
      finishDailyCutinSession();
    }
  }, [writeGS, finishDailyCutinSession, resetDailyOutgoingFxState]);

  /** 8日目以降：日常カットイン state が残ると盤面が出ず移動不能になるため強制解除 */
  useEffect(() => {
    if (!roomGs) return;
    const leftDaily =
      roomGs.subPhase === SUB_PHASE.day8 ||
      roomGs.subPhase === SUB_PHASE.finalBattle ||
      roomGs.gamePhase === GAME_PHASE.finalBattle;
    if (!leftDaily) return;
    resetDailyOutgoingFxState();
    setDay7DailyOptimisticGs(null);
    if ((roomData?.dailyCutinPhase ?? "idle") !== "idle") {
      void clearDailyCutinBroadcast();
    }
  }, [
    roomGs?.subPhase,
    roomGs?.gamePhase,
    roomData?.dailyCutinPhase,
    resetDailyOutgoingFxState,
    clearDailyCutinBroadcast,
  ]);

  /** Firestore に残った stale 日常カットイン同期を自動解除（リロード後の固まり対策） */
  useEffect(() => {
    if (!roomId || !roomGs) return;
    const broadcast = readDailyCutinBroadcast(roomData, roomGs);
    if ((broadcast.phase ?? "idle") === "idle") return;
    if (!isDailyCutinBroadcastStale(broadcast) && !isDailyCutinPhaseOverdue(broadcast)) return;
    dismissStuckDailyCutin();
  }, [
    roomId,
    roomGs,
    roomData?.dailyCutinPhase,
    roomData?.dailyCutinSessionId,
    dismissStuckDailyCutin,
  ]);

  const patchDailySlotBroadcast = useCallback(
    async (patch) => {
      if (!roomId || roomData?.isSolo) return false;
      const g = gsRef.current;
      if (!g || g.subPhase !== SUB_PHASE.daily) return false;
      return writeGS({ ...g, ...patch });
    },
    [roomId, roomData?.isSolo, writeGS],
  );

  const clearDailySlotBroadcast = useCallback(async () => {
    if (!roomId || roomData?.isSolo) return true;
    const g = gsRef.current;
    if (!g) return false;
    return writeGS({ ...g, ...DAILY_SLOT_SYNC_DEFAULTS });
  }, [roomId, roomData?.isSolo, writeGS]);

  const dailySlotSyncBroadcast = useMemo(
    () =>
      isMultiplayerRoom
        ? { patch: patchDailySlotBroadcast, clear: clearDailySlotBroadcast }
        : null,
    [isMultiplayerRoom, patchDailySlotBroadcast, clearDailySlotBroadcast],
  );

  const handleOpenDailySlot = useCallback(() => {
    if (!isMyTurn || !roomGs || roomGs.subPhase !== SUB_PHASE.daily) return;
    if (
      workCutin != null ||
      streamTypeCutin != null ||
      shrinePhase != null ||
      streamPonFireOverlay ||
      workPonHud != null ||
      streamFailOverlay
    )
      return;
    const p = roomGs.players[roomGs.currentPlayerIdx];
    const money = p?.stats?.money;
    if (!p || typeof money !== "number" || money < BAL.dailySlot.spinBet * BAL.dailySlot.spins) return;
    const sid = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    setDailySlotSyncSessionId(sid);
    setDailySlotOpen(true);
    if (isMultiplayerRoom) {
      void clearDailyCutinBroadcast();
      void patchDailySlotBroadcast({
        ...DAILY_SLOT_SYNC_DEFAULTS,
        dailySlotPhase: "open",
        dailySlotSessionId: sid,
        dailySlotRoundTotal: BAL.dailySlot.spins,
      });
    }
  }, [
    isMyTurn,
    roomGs,
    workCutin,
    streamTypeCutin,
    shrinePhase,
    streamPonFireOverlay,
    workPonHud,
    streamFailOverlay,
    isMultiplayerRoom,
    patchDailySlotBroadcast,
    clearDailyCutinBroadcast,
  ]);

  const handleDailySlotClose = useCallback(() => {
    setDailySlotOpen(false);
    setDailySlotSyncSessionId(null);
  }, []);

  const finalizeDailySlotTraining = useCallback(
    async (spinResults) => {
      const g = gsRef.current;
      if (!g || g.subPhase !== SUB_PHASE.daily) return;
      try {
        await updateCurrentAction("dailySlot");
      } catch (_) {}
      const idx = g.currentPlayerIdx;
      const p = g.players[idx];
      let s = { ...p.stats };
      const pre = [];
      const actionLines = [];
      const statusLines = [];
      const logExtras = [];
      const virtueBefore = s.virtue;
      const moneyBeforeSlot = s.money;
      const skillBeforeSlot = s.skill;
      const char = CHARACTERS[p.characterType] ?? CHARACTERS.salaryman;
      const ponMultiplier = char.ponMultiplier;
      let streamMult = p.streamMultiplier ?? char.streamMultiplier;
      let newAmulets = p.amulets ?? 0;

      if (newAmulets > 0) {
        const luckBonus = newAmulets * 2;
        const luckBeforeAmulet = s.luck;
        s.luck = clamp(s.luck + luckBonus);
        pre.push(amuletPreActionLine(newAmulets, luckBeforeAmulet, s.luck));
      }

      const ds = BAL.dailySlot;
      if (!validateDailySlotSpinResults(spinResults, ds.spins)) {
        setUiError("デイリースロットの結果データが不正です");
        return;
      }

      const slotPityCounter = resolveDailySlotPityCounter(spinResults, p.slotPityCounter ?? 0);

      const slotApplied = applyDailySlotSpinsToStats(s, spinResults, char, ds);
      s = slotApplied.stats;
      const { spinDetails, totalNet } = slotApplied;

      const slotBuilt = slotActionLines({
        spinCount: spinResults.length,
        betPerSpin: ds.spinBet,
        spinDetails,
        totalNet,
        moneyBefore: moneyBeforeSlot,
        moneyAfter: s.money,
        skillBefore: skillBeforeSlot,
        skillAfter: s.skill,
      });
      actionLines.push(...slotBuilt.lines);

      const actionType = "dailySlot";

      if (g.subPhase === SUB_PHASE.daily) {
        const lc = livingCostForPlayer(p);
        const moneyBeforeLiving = s.money;
        s.money = clampMoney(s.money - lc);
        statusLines.push(...livingExpenseLines(moneyBeforeLiving, s.money, lc, s.money < 0));
      }

      const ponGain = Math.ceil(BAL.pon.dailyGain * ponMultiplier);
      const ponBeforeGain = s.pon;
      s.pon = clamp(s.pon + ponGain);
      statusLines.push(ponGainLine(ponBeforeGain, s.pon));

      const ponEvent = null;
      const newStreamMult = streamMult;

      let newPlayers = g.players.map((pl, i) =>
        i === idx
          ? { ...pl, stats: s, streamMultiplier: newStreamMult, amulets: newAmulets, slotPityCounter }
          : pl,
      );

      const virtueLogs = [];
      newPlayers = applyVirtueWave(p, virtueBefore, s.virtue, newPlayers, virtueLogs);
      virtueLogs.forEach((line) => logExtras.push(legacyExtrasLine(line)));

      if (g.subPhase === SUB_PHASE.daily) {
        const rimiruLogs = [];
        newPlayers = newPlayers.map((pl, i) => (i !== idx ? pl : applyRimiruDailyEnd(pl, rimiruLogs)));
        rimiruLogs.forEach((line) => logExtras.push(legacyExtrasLine(line)));
      }

      const logs = [
        buildDailyActionLogEntry({
          day: g.currentDay,
          playerId: p.id,
          playerName: p.name,
          actionType,
          actionLabel: slotBuilt.label,
          pre,
          actionLines,
          statusLines,
          extras: logExtras,
          endMoney: newPlayers[idx].stats.money,
        }),
      ];

      const baseGs = { ...g, recentPonEvent: ponEvent ? { player: p.name, msg: ponEvent } : null };
      const nextGs = computeAdvanceDaily(baseGs, newPlayers, logs);
      const skillGainTotal = computeDailySlotSkillGainTotal(spinResults, char, ds);
      const dailyActionFx = buildDailyActionFx({
        playerId: p.id,
        actionType: "dailySlot",
        detail: { skill: skillGainTotal },
      });
      let nextGsWithFx = dailyActionFx ? { ...nextGs, dailyActionFx } : nextGs;
      const advancesToSugoroku =
        g.currentDay === LAST_DAILY_DAY && idx === g.players.length - 1;
      if (advancesToSugoroku) {
        nextGsWithFx = clearDailyActionFx(nextGsWithFx);
        setShrinePhase(null);
      }
      if (g.currentDay === LAST_DAILY_DAY && g.subPhase === SUB_PHASE.daily) {
        setDay7DailyOptimisticGs(buildDay7DailyOptimisticGs(nextGsWithFx, g, advancesToSugoroku));
      }
      if (advancesToSugoroku) {
        const fxHoldMs = computeDay7TransitionFxHoldMs("dailySlot");
        await new Promise((r) => setTimeout(r, Math.max(FINAL_BATTLE_SPLASH_MS, fxHoldMs)));
      }
      const ok = await writeGS({ ...nextGsWithFx, ...DAILY_SLOT_SYNC_DEFAULTS, ...DAILY_CUTIN_SYNC_DEFAULTS });
      if (!ok) setDay7DailyOptimisticGs(null);
    },
    [writeGS, updateCurrentAction],
  );

  // ─── 1〜7日目行動 ────────────────────────────────────────────────────
  const handleDailyAction = async (actionType) => {
    if (!isMyTurn || !roomGs) return;
    try {
      await updateCurrentAction(actionType);
    } catch (_) {}
    if (
      workCutin != null ||
      streamTypeCutin != null ||
      shrinePhase != null ||
      streamPonFireOverlay ||
      workPonHud != null ||
      streamFailOverlay
    )
      return;
    if (!acceptTurnAction()) return;
    if (actionType !== "stream") {
      streamFxChainTimeoutsRef.current.forEach(clearTimeout);
      streamFxChainTimeoutsRef.current = [];
      if (streamCutinTimerRef.current) {
        clearTimeout(streamCutinTimerRef.current);
        streamCutinTimerRef.current = null;
      }
      setStreamTypeCutin(null);
    }
    if (actionType !== "work") {
      workFxChainTimeoutsRef.current.forEach(clearTimeout);
      workFxChainTimeoutsRef.current = [];
      if (workCutinTimerRef.current) {
        clearTimeout(workCutinTimerRef.current);
        workCutinTimerRef.current = null;
      }
      if (workPonFireOverlayTimerRef.current) {
        clearTimeout(workPonFireOverlayTimerRef.current);
        workPonFireOverlayTimerRef.current = null;
      }
      setWorkCutin(null);
      setWorkPonHud(null);
    }
    const gs = roomGs;
    const p    = gs.players[gs.currentPlayerIdx];
    const moneyBeforeAction = p.stats.money;
    let s      = { ...p.stats };
    const pre = [];
    const actionLines = [];
    const statusLines = [];
    const logExtras = [];
    let actionLabel = null;
    let outcome = null;

    /** 日常「配信」オーバーレイ順序（handleDailyAction 末尾でキュー実行） */
    let streamRollFailed = false;
    let deferStreamPonOverlay = false;
    let deferWorkPonOverlay = false;
    let workIncomeForHud = 0;
    let livingCostForHud = 0;
    let workPenaltyForHud = 0;
    /** 盤面フロートラベル用（日常行動同期） */
    let dailyFxDetail = null;

    const virtueBefore = s.virtue; // 善行波及用（行動前）

    // ─ キャラクター固有倍率を取得
    const char          = CHARACTERS[p.characterType] ?? CHARACTERS.salaryman;
    const ponMultiplier = char.ponMultiplier;
    let   streamMult    = p.streamMultiplier ?? char.streamMultiplier; // 可変（vtuber大炎上で上昇）

    // ─ お守り効果（ターン開始時：所持数×2 だけ運が上昇）
    let newAmulets = p.amulets ?? 0;
    if (newAmulets > 0) {
      const luckBonus = newAmulets * 2;
      const luckBeforeAmulet = s.luck;
      s.luck = clamp(s.luck + luckBonus);
      pre.push(amuletPreActionLine(newAmulets, luckBeforeAmulet, s.luck));
    }

    if (actionType === "shrine") {
      const virtueBeforeShrine = s.virtue;
      const moneyBeforeShrine = s.money;
      const luckBeforeShrine = s.luck;
      const ponBeforeShrine = s.pon;
      const shrineApplied = applyShrineToStats(s, char);
      s = shrineApplied.stats;
      actionLabel = "神社 · 二礼二拍手一礼";
      const amuletRoll = rollShrineAmuletDrop(virtueBeforeShrine);
      let gotAmulet = false;
      if (amuletRoll.gotAmulet) {
        newAmulets++;
        gotAmulet = true;
      }
      actionLines.push(
        ...shrineActionLines({
          moneyBefore: moneyBeforeShrine,
          moneyAfter: s.money,
          luckBefore: luckBeforeShrine,
          luckAfter: s.luck,
          virtueBefore: virtueBeforeShrine,
          virtueAfter: s.virtue,
          ponBefore: ponBeforeShrine,
          ponAfter: s.pon,
          gotAmulet,
        }),
      );
      // 神社カットイン演出（自分のターンのみ）
      beginDailyCutinSession();
      emitDailyCutin(DAILY_CUTIN_PHASE.shrine, { subPhase: "in" });
      setShrinePhase("in");
      setTimeout(() => setShrinePhase("out"), 1700);
      setTimeout(() => setShrinePhase(null), 2700);
      dailyFxDetail = {};
    } else if (actionType === "work") {
      workFxChainTimeoutsRef.current.forEach(clearTimeout);
      workFxChainTimeoutsRef.current = [];
      if (workCutinTimerRef.current) {
        clearTimeout(workCutinTimerRef.current);
        workCutinTimerRef.current = null;
      }
      if (workPonFireOverlayTimerRef.current) {
        clearTimeout(workPonFireOverlayTimerRef.current);
        workPonFireOverlayTimerRef.current = null;
      }
      setWorkPonHud(null);

      const workApplied = applyWorkIncomeToStats(s, char);
      s = workApplied.stats;
      const workTotal = workApplied.workTotal;
      const workVirtueGain = workApplied.workVirtueGain;
      setWorkCutin({
        gold: workTotal,
        stat: workVirtueGain ? { label: "善行", delta: workVirtueGain } : null,
        characterType: p.characterType,
      });
      beginDailyCutinSession();
      emitDailyCutin(DAILY_CUTIN_PHASE.work, {
        gold: workTotal,
        stat: workVirtueGain ? { label: "善行", delta: workVirtueGain } : null,
        characterType: p.characterType,
      });
      workCutinTimerRef.current = window.setTimeout(() => {
        setWorkCutin(null);
        workCutinTimerRef.current = null;
      }, DAILY_WORK_CUTIN_MS);
      actionLabel = "仕事";
      actionLines.push(
        ...workActionLines({
          virtueBefore,
          virtueAfter: s.virtue,
          moneyBefore: moneyBeforeAction,
          moneyAfter: s.money,
        }),
      );
      workIncomeForHud = workTotal;
      dailyFxDetail = { money: workTotal };
    } else if (actionType === "stream") {
      streamFxChainTimeoutsRef.current.forEach(clearTimeout);
      streamFxChainTimeoutsRef.current = [];

      if (streamCutinTimerRef.current) {
        clearTimeout(streamCutinTimerRef.current);
        streamCutinTimerRef.current = null;
      }

      const streamResult = rollAndApplyStream(s, char, streamMult);
      s = streamResult.stats;
      streamRollFailed = streamResult.failed;
      const streamType = streamResult.streamType;
      const streamLabel = streamResult.streamLabel;
      const streamCutinGold = streamResult.streamCutinGold;
      const streamCutinStat = streamResult.streamCutinStat;
      outcome = streamResult.outcome;
      const moneyBeforeStream = streamResult.moneyBefore;
      const virtueBeforeStream = streamResult.virtueBefore;
      const skillBeforeStream = streamResult.skillBefore;

      if (streamResult.failed) {
        const { lines, label } = streamActionLines({
          streamLabel,
          failed: true,
          moneyBefore: moneyBeforeStream,
          moneyAfter: s.money,
        });
        actionLines.push(...lines);
        actionLabel = label;
      } else if (streamType === "chat") {
        const { lines, label } = streamActionLines({
          streamLabel,
          failed: false,
          moneyBefore: moneyBeforeStream,
          moneyAfter: s.money,
          statLabel: "善行",
          statBefore: virtueBeforeStream,
          statAfter: s.virtue,
        });
        actionLines.push(...lines);
        actionLabel = label;
      } else {
        const { lines, label } = streamActionLines({
          streamLabel,
          failed: false,
          moneyBefore: moneyBeforeStream,
          moneyAfter: s.money,
          statLabel: "技量",
          statBefore: skillBeforeStream,
          statAfter: s.skill,
        });
        actionLines.push(...lines);
        actionLabel = label;
      }
      setStreamTypeCutin({
        mode: streamType,
        gold: streamCutinGold,
        stat: streamCutinStat,
      });
      beginDailyCutinSession();
      emitDailyCutin(DAILY_CUTIN_PHASE.stream, {
        mode: streamType,
        gold: streamCutinGold,
        stat: streamCutinStat,
      });
      streamCutinTimerRef.current = setTimeout(() => {
        setStreamTypeCutin(null);
        streamCutinTimerRef.current = null;
      }, DAILY_STREAM_CUTIN_MS);
    } else {
      return;
    }

    // ─ 生活費（1〜7日目毎日）：マイナスになっても借金として続行
    if (gs.subPhase === SUB_PHASE.daily) {
      const lc = livingCostForPlayer(p);
      const moneyBeforeLiving = s.money;
      s.money = clampMoney(s.money - lc);
      statusLines.push(...livingExpenseLines(moneyBeforeLiving, s.money, lc, s.money < 0));
      if (actionType === "work") livingCostForHud = lc;
    }

    const ponGain = Math.ceil(BAL.pon.dailyGain * ponMultiplier);
    const ponBeforeGain = s.pon;
    s.pon = clamp(s.pon + ponGain);
    statusLines.push(ponGainLine(ponBeforeGain, s.pon));

    let ponEvent    = null;
    let newStreamMult = streamMult; // vtuber大炎上で更新される
    const penMoneyMul = char.ponFireMoneyPenaltyMultiplier ?? 1;
    if (
      (actionType === "stream" || actionType === "work") &&
      s.pon >= BAL.pon.fireThreshold &&
      Math.random() < s.pon / 100
    ) {
      const ponBefore2 = s.pon;
      if (actionType === "stream") {
        const gain = rand(BAL.pon.stream.moneyMin, BAL.pon.stream.moneyMax);
        s.money = clampMoney(s.money + gain);
        s.skill = clamp(s.skill - BAL.pon.stream.skillLoss, 0);
        ponEvent = `🔥 失言がバズった！資金+${gain}G / 技量-${BAL.pon.stream.skillLoss}`;
        // vtuber特殊効果：大炎上のたびにstreamMultiplier+0.5（永続）
        if (p.characterType === "vtuber") {
          newStreamMult = +(streamMult + 0.5).toFixed(1);
          ponEvent += ` / 🎭リリム効果：配信倍率 ×${streamMult.toFixed(1)}→×${newStreamMult.toFixed(1)}（永続UP！）`;
        }
        deferStreamPonOverlay = true;
      } else {
        const pen = Math.max(
          1,
          Math.round(rand(BAL.pon.work.penaltyMin, BAL.pon.work.penaltyMax) * penMoneyMul),
        );
        s.money = clampMoney(s.money - pen);
        ponEvent = `⚠️ 弁償！資金-${pen}G`;
        deferWorkPonOverlay = true;
        workPenaltyForHud = pen;
      }
      s.pon = Math.floor(ponBefore2 / 2);
      statusLines.push(...ponFireLines(ponEvent));
    } else if (actionType === "stream" || actionType === "work") {
      statusLines.push(ponNoFireLine(s.pon, BAL.pon.fireThreshold));
    }

    // 配信：カットイン終了後 → PON発火（時）→ 失敗（時）の順でオーバーレイを並べる
    if (actionType === "stream") {
      streamFxChainTimeoutsRef.current.forEach(clearTimeout);
      streamFxChainTimeoutsRef.current = [];
      let overlayCursorMs = DAILY_STREAM_CUTIN_MS;
      let streamChainTotalMs = DAILY_STREAM_CUTIN_MS;
      if (deferStreamPonOverlay) {
        const idPon = window.setTimeout(() => {
          emitDailyCutin(DAILY_CUTIN_PHASE.streamPon, null);
          setStreamPonFireOverlay(true);
          setShakeScreen(true);
          window.setTimeout(() => setShakeScreen(false), 500);
          try {
            soundRef.current?.playStreamPonBurn?.();
          } catch (_) {}
          if (streamPonFireOverlayTimerRef.current) clearTimeout(streamPonFireOverlayTimerRef.current);
          streamPonFireOverlayTimerRef.current = window.setTimeout(() => {
            setStreamPonFireOverlay(false);
            streamPonFireOverlayTimerRef.current = null;
          }, DAILY_STREAM_PON_OVERLAY_MS);
        }, overlayCursorMs);
        streamFxChainTimeoutsRef.current.push(idPon);
        overlayCursorMs += DAILY_STREAM_PON_OVERLAY_MS;
        streamChainTotalMs += DAILY_STREAM_PON_OVERLAY_MS;
      }
      if (streamRollFailed) {
        const idFail = window.setTimeout(() => {
          emitDailyCutin(DAILY_CUTIN_PHASE.streamFail, null);
          setStreamFailOverlay(true);
          try {
            soundRef.current?.playStreamFailGaan?.();
          } catch (_) {}
          if (streamFailOverlayTimerRef.current) clearTimeout(streamFailOverlayTimerRef.current);
          streamFailOverlayTimerRef.current = window.setTimeout(() => {
            setStreamFailOverlay(false);
            streamFailOverlayTimerRef.current = null;
          }, DAILY_STREAM_FAIL_HOLD_MS);
        }, overlayCursorMs);
        streamFxChainTimeoutsRef.current.push(idFail);
        streamChainTotalMs += DAILY_STREAM_FAIL_HOLD_MS;
      }
    }

    if (actionType === "work") {
      workFxChainTimeoutsRef.current.forEach(clearTimeout);
      workFxChainTimeoutsRef.current = [];
      if (deferWorkPonOverlay) {
        const turnDelta =
          workIncomeForHud - workPenaltyForHud;
        const hudPayload = {
          penalty: workPenaltyForHud,
          workIncome: workIncomeForHud,
          balanceAfter: s.money,
          turnDelta,
          moneyBefore: moneyBeforeAction,
        };
        const idWorkPon = window.setTimeout(() => {
          emitDailyCutin(DAILY_CUTIN_PHASE.workPon, hudPayload);
          setWorkPonHud(hudPayload);
          try {
            soundRef.current?.playWorkPonPlateBreak?.();
          } catch (_) {}
          if (workPonFireOverlayTimerRef.current) clearTimeout(workPonFireOverlayTimerRef.current);
          workPonFireOverlayTimerRef.current = window.setTimeout(() => {
            setWorkPonHud(null);
            workPonFireOverlayTimerRef.current = null;
          }, DAILY_WORK_PON_OVERLAY_MS);
        }, DAILY_WORK_CUTIN_MS);
        workFxChainTimeoutsRef.current.push(idWorkPon);
      }
    }

    let newPlayers = gs.players.map((pl, i) =>
      i === gs.currentPlayerIdx ? { ...pl, stats: s, streamMultiplier: newStreamMult, amulets: newAmulets } : pl
    );

    const virtueLogs = [];
    newPlayers = applyVirtueWave(p, virtueBefore, s.virtue, newPlayers, virtueLogs);
    virtueLogs.forEach((line) => logExtras.push(legacyExtrasLine(line)));

    if (ponEvent && actionType === "stream" && gs.subPhase === SUB_PHASE.day8) {
      newPlayers = applySplashDamage(gs.currentPlayerIdx, newPlayers, virtueLogs);
    }

    if (gs.subPhase === SUB_PHASE.daily) {
      const idx = gs.currentPlayerIdx;
      const rimiruLogs = [];
      newPlayers = newPlayers.map((pl, i) =>
        i !== idx ? pl : applyRimiruDailyEnd(pl, rimiruLogs),
      );
      rimiruLogs.forEach((line) => logExtras.push(legacyExtrasLine(line)));
    }

    const logs = [
      buildDailyActionLogEntry({
        day: gs.currentDay,
        playerId: p.id,
        playerName: p.name,
        actionType,
        actionLabel,
        outcome,
        pre,
        actionLines,
        statusLines,
        extras: logExtras,
        endMoney: newPlayers[gs.currentPlayerIdx].stats.money,
      }),
    ];

    const baseGs = { ...gs, recentPonEvent: ponEvent ? { player: p.name, msg: ponEvent } : null };
    const nextGs = computeAdvanceDaily(baseGs, newPlayers, logs);
    const advancesToSugoroku =
      gs.currentDay === LAST_DAILY_DAY && gs.currentPlayerIdx === gs.players.length - 1;
    let nextGsWithFx = attachDailyActionFxForDailyPhase(nextGs, {
      playerId: p.id,
      actionType,
      detail: dailyFxDetail ?? {},
    });
    if (advancesToSugoroku) {
      setShrinePhase(null);
    }
    if (gs.currentDay === LAST_DAILY_DAY && gs.subPhase === SUB_PHASE.daily) {
      setDay7DailyOptimisticGs(buildDay7DailyOptimisticGs(nextGsWithFx, gs, advancesToSugoroku));
    }
    if (advancesToSugoroku) {
      const fxHoldMs = computeDay7TransitionFxHoldMs(actionType, {
        deferStreamPonOverlay,
        streamRollFailed,
        deferWorkPonOverlay,
      });
      await new Promise((r) => setTimeout(r, Math.max(FINAL_BATTLE_SPLASH_MS, fxHoldMs)));
      resetDailyOutgoingFxState();
      finishDailyCutinSession();
    }
    const cutinClearPatch =
      nextGsWithFx.subPhase !== SUB_PHASE.daily ? DAILY_CUTIN_SYNC_DEFAULTS : {};
    const cutinPreserve =
      nextGsWithFx.subPhase === SUB_PHASE.daily
        ? pickDailyCutinBroadcastFields(pendingDailyCutinBroadcastRef.current)
        : null;
    if (isMultiplayerRoom && cutinPreserve) {
      void patchDailyCutinBroadcast(cutinPreserve);
    }

    /** マルチ日常：カットイン中に手番を進めると観戦側が stale cutin で止まるため、演出後に writeGS */
    if (isMultiplayerRoom && gs.subPhase === SUB_PHASE.daily && !advancesToSugoroku) {
      const holdMs = computeDay7TransitionFxHoldMs(actionType, {
        deferStreamPonOverlay,
        streamRollFailed,
        deferWorkPonOverlay,
      });
      if (dailyTurnWriteTimerRef.current) {
        clearTimeout(dailyTurnWriteTimerRef.current);
      }
      pendingDailyTurnWriteRef.current = { nextGsWithFx, cutinClearPatch };
      dailyTurnWriteTimerRef.current = window.setTimeout(() => {
        dailyTurnWriteTimerRef.current = null;
        void flushPendingDailyTurnWrite();
      }, holdMs);
      return;
    }

    const ok = await writeGS({
      ...nextGsWithFx,
      ...cutinClearPatch,
      ...(cutinPreserve ?? {}),
    });
    if (!ok) {
      setDay7DailyOptimisticGs(null);
      resetDailyOutgoingFxState();
      finishDailyCutinSession();
    }
  };

  // ─── 8日目：移動行動 ─────────────────────────────────────────────────
  const handleUseDay8Item = async (itemId) => {
    if (!isMyTurn || !gs || day8FxLocked) return;
    if (!acceptTurnAction()) return;
    await commitDay8ItemGate((liveGs) =>
      useDay8ItemOnGameState(liveGs, liveGs.currentPlayerIdx, itemId),
    );
  };

  const handleMoveAction = async (actionType) => {
    if (!isMyTurn || !gs) return;
    if (day8ActionLocked || boardDeathPresentation) return;
    const idx = gs.currentPlayerIdx;
    const p = gs.players[idx];
    if (p.movePhase !== MOVE_PHASE.moving) return;

    if (!acceptTurnAction()) return;

    const pendingTraffic = p.pendingTaxiSteps ?? 0;

    /** 渋滞2ターン目：前半で止まっている残りマスだけ進んでターン終了 */
    if (pendingTraffic > 0) {
      beginDay8VisualAction();
      if (isDiceRolling) return;
      if (actionType !== "taxiTrafficWait") return;
      if (ponTileSlideTimerRef.current) {
        clearTimeout(ponTileSlideTimerRef.current);
        ponTileSlideTimerRef.current = null;
      }
      ponHopGateRef.current = false;
      setPonHopCompleteEnabled(false);
      setBoardViewPosOverride(null);
      taxiGSFollowUpRef.current = null;

      const sWait = { ...p.stats };
      const ponBeforeWait = sWait.pon;
      const virtueBeforeWait = sWait.virtue;
      sWait.pon = clamp(sWait.pon + pendingTraffic);

      const landedDiceWait = Math.min(BOARD_GOAL, p.position + pendingTraffic);
      const roundsUsedNow = Math.max(0, BAL.dice.maxTurns - day8RemainingTurns);
      const newTurnsWait = roundsUsedNow + 1;

      const logsWait = [];
      if (p.characterType === "vtuber") {
        logsWait.push(`🎭 ${p.name}: "Ugh, this traffic is the worst! My stream is going to be late!"`);
      }

      const rrWait = resolveDay8LandingWithTiles(gs, idx, landedDiceWait, sWait, logsWait, {
        ponSplashDamage: false,
        skipTileEffects: true,
      });
      const moverWait = rrWait.players[idx];
      const newPosFinal = moverWait.position;
      const statsFinal = moverWait.stats;
      const arrivedWait = newPosFinal >= BOARD_GOAL;
      const timedOutWait = !arrivedWait && newTurnsWait >= BAL.dice.maxTurns;

      let fullMsgWait = `🚗 渋滞を待つ（Wait in Traffic）⋯ 残り${pendingTraffic}マス進行 → ${newPosFinal}/${BOARD_GOAL}マス / PON${ponBeforeWait}+${pendingTraffic}→${statsFinal.pon}`;
      if (newPosFinal !== landedDiceWait) {
        fullMsgWait += `（マス効果:${landedDiceWait}→${newPosFinal}）`;
      }
      logsWait.push(`${p.name} T${newTurnsWait}: ${fullMsgWait}`);
      if (arrivedWait) {
        logsWait.push(`🎯 ${p.name} がゴールへ到着！`);
      }
      if (timedOutWait) {
        logsWait.push(`⏰ ${p.name} タイムアップ（${BAL.dice.maxTurns}ターン消費）`);
      }

      let newPlayersWait = applyVirtueWave(
        p,
        virtueBeforeWait,
        statsFinal.virtue,
        rrWait.players,
        logsWait,
      ).map((pl, i) => {
        if (i !== idx) return pl;
        const base = {
          ...pl,
          moveTurns: newTurnsWait,
          lastMoveEvent: fullMsgWait,
          pendingTaxiSteps: 0,
        };
        if (arrivedWait) {
          const { player, extraLogs } = applyGoalArrivalToPlayer(base, isMultiplayerRoom);
          extraLogs.forEach((line) => logsWait.push(line));
          return player;
        }
        if (timedOutWait) {
          return { ...base, movePhase: MOVE_PHASE.missed, slotTurnsLeft: 0, slotPullsGranted: 0, slotPullsThisSeat: 0 };
        }
        return { ...base, movePhase: MOVE_PHASE.moving, slotTurnsLeft: 0, slotPullsGranted: 0, slotPullsThisSeat: 0 };
      });

      const gsWithDiceWait = { ...rrWait.gsWithTiles, lastDiceRolls: [] };
      const nextGSWait = arrivedWait
        ? buildNextGsAfterGoalArrival(gsWithDiceWait, newPlayersWait, logsWait, isMultiplayerRoom)
        : computeAdvanceDay8Turn(gsWithDiceWait, newPlayersWait, logsWait);

      const needsTileSlideWait = newPosFinal !== landedDiceWait;
      const intermediatePlayersWait = needsTileSlideWait
        ? buildDay8TileSlideMidpointPlayers(newPlayersWait, idx, landedDiceWait)
        : null;
      const intermediateGSWait = intermediatePlayersWait
        ? { ...gsWithDiceWait, players: intermediatePlayersWait }
        : null;
      const taxiEndPosWait = needsTileSlideWait ? landedDiceWait : newPosFinal;

      /** 渋滞2ターン目：移動距離は残りマスだが、速度は「通常1ターン目のドライブ」の半分（所要2倍） */
      const baseDriveMs = computeTaxiDriveDurationMs(Math.abs(taxiEndPosWait - p.position));
      const driveMsWait = baseDriveMs * 2;

      const taxiVisualWait = buildTaxiTrafficWaitVisualPayload({
        fromPos: p.position,
        driveEndPos: taxiEndPosWait,
        driveMs: driveMsWait,
        needsTileSlide: needsTileSlideWait,
        tileSlideFromPos: landedDiceWait,
        tileSlideToPos: newPosFinal,
        tileEffectMeta: rrWait.tileEffectMeta,
      });

      const movementFxWait = buildMovementFx({
        playerId: p.id,
        fromPos: p.position,
        landedPos: p.position,
        finalPos: p.position,
        stepDelta: pendingTraffic,
        diceRolls: [],
        followUp: "taxiTrafficWait",
        taxiVisual: taxiVisualWait,
      });

      taxiGSRef.current = needsTileSlideWait && intermediateGSWait ? intermediateGSWait : nextGSWait;
      taxiDay8CommitRef.current = {
        actorId: p.id,
        arrived: arrivedWait,
        isMultiplayerRoom,
        gsWithDice: { lastDiceRolls: [] },
        newPlayers: newPlayersWait,
        actionLogs: logsWait,
        ...(needsTileSlideWait ? { tileSlide: { landedDice: landedDiceWait } } : {}),
      };
      taxiGSFollowUpRef.current =
        needsTileSlideWait && intermediateGSWait
          ? { finalGS: nextGSWait, fromPos: landedDiceWait, toPos: newPosFinal }
          : null;
      pendingTaxiCongestionRef.current = false;
      pendingSugorokuTileFxToastRef.current = rrWait.tileToast;
      pendingTileEffectMetaRef.current = rrWait.tileEffectMeta;

      const beginTaxiTrafficWaitDrive = () => {
        schedulePieceHopBlockingMs(Math.max(700, driveMsWait + 120));
        taxiDriveDurationMsRef.current = driveMsWait;
        setTaxiDriveDurationMs(driveMsWait);
        setTaxiDriveEndPos(taxiEndPosWait);
        setTaxiJamMidPos(null);
        taxiSecondLegMsRef.current = 0;
        setTaxiDriveActiveMs(driveMsWait);
        setTaxiDriveCongested(true);
        taxiActorPlayerIdRef.current = p.id;
        setTaxiActorPlayerId(p.id);
        taxiVisualActiveRef.current = true;
        setTaxiPhase("drive");
      };

      movementFxPendingCommitRef.current = {
        fxId: movementFxWait.id,
        actorId: p.id,
        run: async () => {
          beginTaxiTrafficWaitDrive();
          const live = gsRef.current;
          if (live?.movementFx?.id === movementFxWait.id) {
            await writeGS({ ...live, movementFx: null });
          }
        },
      };

      const animStartGsWait = {
        ...gs,
        movementFx: movementFxWait,
        players: holdMoverForMovementFx(gs.players, idx, p),
      };
      const okTraffic = await writeGS(animStartGsWait);
      if (!okTraffic) {
        movementFxPendingCommitRef.current = null;
        releaseDay8VisualActionLock();
      }
      return;
    }

    // PON≥deathThreshold + 人助け → 50%即死（すごろく）— 視覚ロック前に判定（ダイアログ中にボタンが暗くならない）
    if (actionType === "help" && p.stats.pon >= BAL.pon.deathThreshold) {
      if (Math.random() < BAL.pon.deathChance) {
        pendingBoardDeathCommitRef.current = {
          type: "help",
          gs,
          idx,
          logLine: `💀 ${p.name} / PON${p.stats.pon}で人助け失敗！（脱落 — 代理スロットで他プレイヤーに干渉可能）`,
          presentation: {
            playerId: p.id,
            position: p.position,
            characterType: p.characterType,
            name: p.name,
          },
        };
        setBoardDeathPresentation({
          phase: "helpDialog",
          playerId: p.id,
          position: p.position,
          characterType: p.characterType,
          name: p.name,
        });
        return;
      }
    }

    beginDay8VisualAction();

    if (isDiceRolling) return;
    if (ponTileSlideTimerRef.current) {
      clearTimeout(ponTileSlideTimerRef.current);
      ponTileSlideTimerRef.current = null;
    }
    ponHopGateRef.current = false;
    setPonHopCompleteEnabled(false);
    setBoardViewPosOverride(null);
    taxiGSFollowUpRef.current = null;

    let step = 0, diceRolls = [], eventMsg = "", advantageRoll = false;
    let extraTurns = 0; // タクシーの追加消費ターン
    /** タクシー渋滞2ターン化（遅延コールバックで pendingTaxiSteps に残マス保存） */
    let taxiCongestionSplit = false;
    let remainingAfterCongest = 0;
    let s = { ...p.stats };
    const logs = [];
    const virtueBefore = s.virtue;

    if (actionType === "help") {
      step = 1;
      const vg = rand(BAL.dice.helpVirtueMin, BAL.dice.helpVirtueMax);
      s.virtue = clamp(s.virtue + vg);
      eventMsg = `人助け！1マス前進 / 善行+${vg}（→${s.virtue}）`;
      diceRolls = [1];
    } else if (actionType === "taxi") {
      if (s.money < BAL.dice.taxiCost) return;
      s.money   = clampMoney(s.money - BAL.dice.taxiCost);
      const taxiRollStep = rand(BAL.dice.taxiMoveMin, BAL.dice.taxiMoveMax);
      extraTurns = BAL.dice.taxiBaseTurns - 1; // 1 なら 0（通常移動と同じく今回の操作で moveTurns は +1 のみ）
      diceRolls  = [taxiRollStep];
      step       = taxiRollStep;
      eventMsg   = `タクシー！${taxiRollStep}マス予定 / 資金-${BAL.dice.taxiCost}G`;
      // 渋滞：今ターンは前半のみ進行・残マスは次の自分ターンで継続（firstHalf + remaining === taxiRollStep）
      // 前半だけでゴールに届く場合は渋滞演出・2ターン化しない（そのままゴール）
      const taxiCongestBaseChance = Math.max(0, Math.min(1, BAL.dice.taxiCongestChance));
      const taxiCongestDynChance =
        s.virtue >= BAL.dice.taxiCongestThresh
          ? 0
          : taxiCongestBaseChance * ((BAL.dice.taxiCongestThresh - s.virtue) / BAL.dice.taxiCongestThresh);
      if (Math.random() < taxiCongestDynChance) {
        const firstHalf = Math.ceil(taxiRollStep / 2);
        if (p.position + firstHalf >= BOARD_GOAL) {
          /* step は既に taxiRollStep のまま */
        } else {
          remainingAfterCongest = taxiRollStep - firstHalf;
          step = firstHalf;
          taxiCongestionSplit = true;
          s.pon = clamp(s.pon + BAL.dice.taxiCongestPon);
          eventMsg += ` / 🚗渋滞！まず ${firstHalf} マスのみ進行／残り ${remainingAfterCongest} マスは次の自分ターンで完了（試行+PON+${BAL.dice.taxiCongestPon}）`;
        }
      }
    } else {
      const d1     = rollDie(p.stats);
      step         = d1.value;
      diceRolls    = [...d1.rolls];
      advantageRoll = d1.advantage;
      const advTxt = d1.advantage ? `（運アドバンテージ：合計${d1.value}マス）` : "";
      if (actionType === "shop") {
        if (s.money < BAL.dice.shopCost) return;
        const d2  = rand(1, 4);
        step     += d2;
        diceRolls = [...d1.rolls, d2];
        s.money   = clampMoney(s.money - BAL.dice.shopCost);
        eventMsg  = `コンビニ！🎲${d1.rolls.join(", ")}${advTxt} + 店舗🎲${d2} = ${step}マス / -${BAL.dice.shopCost}G`;
      } else {
        eventMsg = `🎲 ダイスの出目: ${d1.rolls.join(", ")}${advTxt} (合計${step}マス)`;
      }
    }

    // PON発火：転倒（タクシーには適用しない）
    let ponFired = false;
    const origStep = step;
    if (actionType !== "taxi" && s.pon >= BAL.pon.fireThreshold && Math.random() < s.pon / 100) {
      ponFired = true;
      step = Math.ceil(step / 2);
    }
    const ponBefore = s.pon;
    s.pon = clamp(s.pon + step);
    if (ponFired) s.pon = Math.floor(s.pon / 2);

    if (advantageRoll) {
      setIsLuckyRoll(true);
      setShowLuckyDice(true);
      setTimeout(() => setShowLuckyDice(false), 1900);
    }

    const stumbleCellsBase = ponFired ? Math.ceil(origStep / 2) : step;
    let stumbleCells = stumbleCellsBase;
    let moveBuffPlayer = p;
    let day8CardMoveEffect = null;
    if (actionType !== "taxi") {
      const moveBonus = applyDay8MoveStepBonus(p, stumbleCells);
      stumbleCells = moveBonus.stepCells;
      moveBuffPlayer = moveBonus.player;
      if (moveBonus.consumed && moveBonus.bonus !== 0) {
        day8CardMoveEffect = buildDay8CardMoveEffectMeta(moveBonus.bonus);
        logs.push(`  🎒 ${p.name}: アイテム +${moveBonus.bonus}マス（合計${stumbleCells}マス）`);
      }
    }

    const landedDice = Math.min(BOARD_GOAL, p.position + stumbleCells);
    const roundsUsedNow = Math.max(0, BAL.dice.maxTurns - day8RemainingTurns);
    const newTurns = roundsUsedNow + 1 + extraTurns;

    const rr = resolveDay8LandingWithTiles(gs, idx, landedDice, s, logs, {
      ponSplashDamage: ponFired,
      skipTileEffects: actionType === "taxi",
    });
    const debtTrapTriggered = !!rr.gameOverByDebt?.triggered;
    const moverOut = rr.players[idx];
    const newPosFinal = moverOut.position;
    const statsFinal = moverOut.stats;

    const arrived = newPosFinal >= BOARD_GOAL;
    const timedOut = !arrived && newTurns >= BAL.dice.maxTurns;

    const ponLog = ponFired
      ? ` ⚡転倒(${ponBefore}%) ${origStep}→${step}マス / PON→半減→${statsFinal.pon}`
      : ` / PON${ponBefore}+${step}→${statsFinal.pon}`;
    let fullMsg = `${eventMsg} → ${newPosFinal}/${BOARD_GOAL}マス${ponLog}`;
    if (newPosFinal !== landedDice) {
      fullMsg += `（マス効果:${landedDice}→${newPosFinal}）`;
    }

    if (diceRolls.length > 1) {
      logs.push(`  ダイスの出目: ${diceRolls.join(", ")} (合計${origStep}${ponFired ? `→転倒で${step}` : ""}マス)`);
    }
    if (ponFired) logs.push(`  ⚡転倒！${origStep}マス→${step}マス / PON半減`);
    if (arrived) {
      logs.push(`🎯 ${p.name} がゴールへ到着！`);
    }
    if (timedOut) logs.push(`⏰ ${p.name} タイムアップ（${BAL.dice.maxTurns}ターン消費）`);

    logs.push(`${p.name} T${newTurns}: ${fullMsg}`);

    const pendingStepsNext =
      !timedOut && !arrived && taxiCongestionSplit ? remainingAfterCongest : 0;

    let newPlayers = applyVirtueWave(
      p,
      virtueBefore,
      rr.players[idx].stats.virtue,
      rr.players,
      logs,
    ).map((pl, i) => {
      if (i !== gs.currentPlayerIdx) return pl;
      const base = {
        ...pl,
        day8SeatEffects: moveBuffPlayer.day8SeatEffects,
        moveTurns: newTurns,
        lastMoveEvent: fullMsg,
        pendingTaxiSteps: pendingStepsNext,
      };
      if (arrived) {
        const { player, extraLogs } = applyGoalArrivalToPlayer(base, isMultiplayerRoom);
        extraLogs.forEach((line) => logs.push(line));
        return player;
      }
      if (timedOut) {
        return { ...base, movePhase: MOVE_PHASE.missed, slotTurnsLeft: 0, slotPullsGranted: 0, slotPullsThisSeat: 0 };
      }
      return { ...base, movePhase: MOVE_PHASE.moving, slotTurnsLeft: 0, slotPullsGranted: 0, slotPullsThisSeat: 0 };
    });

    const gsWithDice = { ...rr.gsWithTiles, lastDiceRolls: diceRolls };
    const nextGS = arrived
      ? buildNextGsAfterGoalArrival(gsWithDice, newPlayers, logs, isMultiplayerRoom)
      : computeAdvanceDay8Turn(gsWithDice, newPlayers, logs);

    const needsSugorokuTileSlide = newPosFinal !== landedDice;
    const clearMovementFx = (state) => ({ ...state, movementFx: null });

    movementFxFinalMoneyRef.current = { playerId: p.id, moneyAfter: statsFinal.money };
    setFxMoneyReveal(null);

    const landingPlayers = rr.playersAtLanding ?? newPlayers;
    const playersForAnim = landingPlayers.map((pl, i) => {
      if (i !== idx) return pl;
      const final = newPlayers[i];
      return {
        ...pl,
        moveTurns: final.moveTurns,
        movePhase: final.movePhase,
        lastMoveEvent: final.lastMoveEvent,
        pendingTaxiSteps: final.pendingTaxiSteps,
        slotTurnsLeft: final.slotTurnsLeft,
        slotPullsGranted: final.slotPullsGranted,
        slotPullsThisSeat: final.slotPullsThisSeat,
        day8SeatEffects: final.day8SeatEffects,
      };
    });

    const fxLandedPos = actionType === "taxi" ? p.position : landedDice;
    const fxFinalPos =
      actionType === "taxi"
        ? p.position
        : ponFired && needsSugorokuTileSlide
          ? landedDice
          : newPosFinal;
    const movementFx = buildMovementFx({
      playerId: p.id,
      fromPos: p.position,
      landedPos: fxLandedPos,
      finalPos: fxFinalPos,
      stepDelta: actionType === "taxi" ? step : fxLandedPos - p.position,
      diceRolls,
      preMoveEffect: day8CardMoveEffect,
      tileEffect: actionType === "taxi" || (ponFired && !debtTrapTriggered) ? null : rr.tileEffectMeta,
      ...(actionType === "taxi"
        ? {
            followUp: "taxi",
            taxiVisual: buildTaxiVisualPayload({
              fromPos: p.position,
              newPosFinal,
              landedDice,
              needsTileSlide: needsSugorokuTileSlide,
              congested: taxiCongestionSplit,
              diceRollStep: diceRolls[0] ?? step,
              tileEffectMeta: rr.tileEffectMeta,
            }),
          }
        : {}),
      ...(ponFired
        ? {
            followUp: "pon",
            ponVisual: buildPonVisualPayload({
              characterType: p.characterType,
              stopPos: needsSugorokuTileSlide ? landedDice : newPosFinal,
              needsTileSlide: needsSugorokuTileSlide,
              tileSlideFromPos: landedDice,
              tileSlideToPos: needsSugorokuTileSlide ? newPosFinal : null,
            }),
          }
        : {}),
    });

    const animStartGs = {
      ...gsWithDice,
      movementFx,
      players: holdMoverForMovementFx(playersForAnim, idx, p),
      log: prependLogs(logs, rr.gsWithTiles.log),
    };

    const commitDebtTrapAfterMovement = async () => {
      await runBoardDeathFadeThenCommit(
        {
          playerId: p.id,
          position: rr.players[idx]?.position ?? newPosFinal,
          characterType: p.characterType,
          name: p.name,
        },
        (liveGs, dieIdx) => {
          const commit = movementDay8DeathCommitRef.current;
          const gsForDeath =
            commit?.actorId === liveGs.players?.[dieIdx]?.id
              ? applyDay8LandingStateToLive(liveGs, commit)
              : liveGs;
          if (!gsForDeath) return null;
          return resolveDebtTrapTriggered(gsForDeath, dieIdx);
        },
      );
      movementDay8DeathCommitRef.current = null;
    };

    if (debtTrapTriggered) {
      movementDay8DeathCommitRef.current = {
        actorId: p.id,
        newPlayers,
        gsWithDice: { lastDiceRolls: diceRolls },
        actionLogs: logs,
        logsAlreadyWritten: true,
      };
      movementFxPendingCommitRef.current = {
        fxId: movementFx.id,
        actorId: p.id,
        run: commitDebtTrapAfterMovement,
      };
      const okDebt = await writeGS(animStartGs);
      if (!okDebt) {
        movementFxPendingCommitRef.current = null;
        movementDay8DeathCommitRef.current = null;
        releaseDay8VisualActionLock();
      }
      return;
    }

    if (actionType === "taxi") {
      pendingTaxiCongestionRef.current = taxiCongestionSplit;
      pendingSugorokuTileFxToastRef.current = rr.tileToast;
      pendingTileEffectMetaRef.current = rr.tileEffectMeta;
      taxiDay8CommitRef.current = {
        actorId: p.id,
        arrived,
        isMultiplayerRoom,
        gsWithDice: { lastDiceRolls: diceRolls },
        newPlayers,
        actionLogs: logs,
        logsAlreadyWritten: true,
        ...(needsSugorokuTileSlide ? { tileSlide: { landedDice } } : {}),
      };

      const beginTaxiVisualSequence = () => {
        if (taxiCongestionSplit) {
          taxiGSRef.current = clearMovementFx(nextGS);
          taxiGSFollowUpRef.current = null;
          const driveMs = computeTaxiDriveDurationMs(Math.abs(newPosFinal - p.position));
          taxiDriveDurationMsRef.current = driveMs;
          setTaxiDriveDurationMs(driveMs);
          setTaxiDriveEndPos(newPosFinal);
          const { jamMid, firstLegMs, secondLegMs } = computeTaxiCongestedLegDurations(
            p.position,
            newPosFinal,
            diceRolls[0],
            driveMs,
          );
          setTaxiJamMidPos(jamMid);
          taxiSecondLegMsRef.current = secondLegMs;
          setTaxiDriveActiveMs(firstLegMs);
        } else if (needsSugorokuTileSlide) {
          const intermediatePlayers = landingPlayers.map((pl, i) =>
            i === idx ? { ...newPlayers[i], stats: pl.stats, position: landedDice } : pl,
          );
          taxiGSRef.current = clearMovementFx({ ...gsWithDice, players: intermediatePlayers });
          taxiGSFollowUpRef.current = { finalGS: clearMovementFx(nextGS), fromPos: landedDice, toPos: newPosFinal };
          const driveMs = computeTaxiDriveDurationMs(Math.abs(landedDice - p.position));
          taxiDriveDurationMsRef.current = driveMs;
          setTaxiDriveDurationMs(driveMs);
          setTaxiDriveEndPos(landedDice);
          setTaxiJamMidPos(null);
          taxiSecondLegMsRef.current = 0;
          setTaxiDriveActiveMs(driveMs);
        } else {
          taxiGSRef.current = clearMovementFx(nextGS);
          taxiGSFollowUpRef.current = null;
          const driveMs = computeTaxiDriveDurationMs(Math.abs(newPosFinal - p.position));
          taxiDriveDurationMsRef.current = driveMs;
          setTaxiDriveDurationMs(driveMs);
          setTaxiDriveEndPos(newPosFinal);
          setTaxiJamMidPos(null);
          taxiSecondLegMsRef.current = 0;
          setTaxiDriveActiveMs(driveMs);
        }
        let taxiPieceBlockMs = 900;
        if (taxiCongestionSplit) {
          const driveMsFull = computeTaxiDriveDurationMs(Math.abs(newPosFinal - p.position));
          const { firstLegMs, secondLegMs } = computeTaxiCongestedLegDurations(
            p.position,
            newPosFinal,
            diceRolls[0],
            driveMsFull,
          );
          taxiPieceBlockMs = firstLegMs + secondLegMs + 200;
        } else if (needsSugorokuTileSlide) {
          taxiPieceBlockMs =
            computeTaxiDriveDurationMs(Math.abs(landedDice - p.position)) +
            computeTaxiDriveDurationMs(Math.abs(newPosFinal - landedDice)) +
            200;
        } else {
          taxiPieceBlockMs = computeTaxiDriveDurationMs(Math.abs(newPosFinal - p.position)) + 200;
        }
        schedulePieceHopBlockingMs(Math.max(700, taxiPieceBlockMs));
        taxiActorPlayerIdRef.current = p.id;
        setTaxiActorPlayerId(p.id);
        setTaxiDriveCongested(false);
        taxiVisualActiveRef.current = true;
        setTaxiPhase("enter");
      };

      movementFxPendingCommitRef.current = {
        fxId: movementFx.id,
        actorId: p.id,
        syncAfterMovementFx: beginTaxiVisualSequence,
        run: async () => {
          beginTaxiVisualSequence();
          const live = gsRef.current;
          if (live?.movementFx?.id === movementFx.id) {
            await writeGS(clearMovementFx(live));
          }
        },
      };
      const okTaxi = await writeGS(animStartGs);
      if (!okTaxi) {
        movementFxPendingCommitRef.current = null;
        releaseDay8VisualActionLock();
      }
      return;
    }

    if (ponFired) {
      const ponStopPos = needsSugorokuTileSlide ? landedDice : newPosFinal;
      const intermediatePlayers = needsSugorokuTileSlide
        ? buildDay8TileSlideMidpointPlayers(newPlayers, idx, landedDice)
        : null;
      movementFxPendingCommitRef.current = {
        fxId: movementFx.id,
        actorId: p.id,
        run: async () => {
          ponCutinCommitRef.current = {
            nextGS: clearMovementFx(nextGS),
            characterType: p.characterType ?? "salaryman",
            tileFxToast: rr.tileToast,
            tileEffectMeta: rr.tileEffectMeta,
            intermediateGS: intermediatePlayers
              ? clearMovementFx({ ...gsWithDice, players: intermediatePlayers })
              : null,
            tileSlideFromPos: landedDice,
            tileSlideToPos: needsSugorokuTileSlide ? newPosFinal : null,
          };
          if (ponTileSlideTimerRef.current) {
            clearTimeout(ponTileSlideTimerRef.current);
            ponTileSlideTimerRef.current = null;
          }
          setBoardViewPosOverride(ponStopPos);
          setPonCutin({ characterType: p.characterType ?? "salaryman" });
        },
      };
      const okPon = await writeGS(animStartGs);
      if (!okPon) {
        movementFxPendingCommitRef.current = null;
        releaseDay8VisualActionLock();
      }
      return;
    }

    movementFxPendingCommitRef.current = {
      fxId: movementFx.id,
      actorId: p.id,
      run: async () => {
        if (arrived) {
          const ok = await writeGS(clearMovementFx(nextGS), {
            markDay8TurnComplete: isMultiplayerRoom,
            turnCompletePlayerId: p.id,
          });
          if (!ok) return;
        } else {
          const ok = await writeGS(clearMovementFx(nextGS), {
            markDay8TurnComplete: true,
            turnCompletePlayerId: p.id,
          });
          if (!ok) return;
        }
      },
    };
    const okMove = await writeGS(animStartGs);
    if (!okMove) {
      movementFxPendingCommitRef.current = null;
      releaseDay8VisualActionLock();
    }
  };

  // ════════════════════════════════════════════════════════════════════════
  // アセット読み込み待ち
  // ════════════════════════════════════════════════════════════════════════
  if (!assetsReady) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-300 px-6">
      <Loader2 size={32} className="animate-spin text-cyan-400" />
      <p className="text-sm font-semibold">Loading Assets...</p>
      <div className="w-full max-w-sm rounded-full bg-slate-800 h-2 overflow-hidden">
        <div
          className="h-full bg-cyan-400 transition-all duration-200"
          style={{ width: `${assetsProgress.total > 0 ? (assetsProgress.loaded / assetsProgress.total) * 100 : 0}%` }}
        />
      </div>
      <p className="text-xs text-slate-400 tabular-nums">
        {assetsProgress.loaded} / {assetsProgress.total}
      </p>
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════
  // 認証待ち
  // ════════════════════════════════════════════════════════════════════════
  if (!authReady) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-400">
      <Loader2 size={32} className="animate-spin text-cyan-400" />
      <p className="text-sm">接続中…</p>
    </div>
  );

  if (gameOverSplashMsg) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center anim-fadein">
      <p className="text-[min(18vw,7rem)] font-black tracking-tight text-rose-200 drop-shadow-[0_0_30px_rgba(244,63,94,0.65)]">
        ゲームオーバー
      </p>
      <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">{gameOverSplashMsg}</p>
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════
  // エントリー画面（初期ページ）
  // ════════════════════════════════════════════════════════════════════════
  if (reconnecting) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 p-8 text-slate-200">
        <Loader2 size={36} className="animate-spin text-cyan-400" aria-hidden />
        <p className="text-sm text-slate-400" role="status">ルームに再接続中…</p>
      </div>
    );
  }

  if (screen === "entry") return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 pb-12 text-slate-100">
      <SoundSettingsControl
        seVolume={seVolume}
        bgmVolume={bgmVolume}
        onSeVolumeChange={handleSeVolumeChange}
        onBgmVolumeChange={handleBgmVolumeChange}
        className="fixed top-3 right-3 z-[200]"
      />
      <div className="w-full max-w-6xl flex flex-col items-center text-center space-y-10">
        <div className="flex flex-col items-center gap-5 w-full">
          <img
            src={publicAssetUrl(TITLE_LOGO_PATH)}
            alt={GAME_TITLE_WITH_ACRONYM}
            className="w-full max-w-[min(100%,1020px)] h-auto object-contain select-none drop-shadow-[0_0_40px_rgba(34,211,238,0.12)]"
          />
          <div className="space-y-3 px-1 max-w-3xl">
            <h1 className="text-xl sm:text-2xl md:text-[1.65rem] font-bold text-slate-50 leading-snug tracking-tight font-[Rajdhani]">
              {GAME_TITLE_WITH_ACRONYM}
            </h1>
            <p className="text-[11px] font-semibold tracking-[0.32em] text-cyan-400/90 uppercase">
              {GAME_TITLE_SHORT} · {GAME_TITLE_FULL}
            </p>
            <div className="rounded-xl border border-slate-700/80 bg-slate-900/50 px-3 py-2.5 text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400/90 mb-1">News · ひとこと</p>
              <p className="text-xs text-slate-400 leading-relaxed">{SOLO_PRERELEASE_NOTICE}</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2 text-left">
            <label className="text-sm text-slate-300 font-semibold block">プレイヤー名</label>
            <input
              value={myName}
              onChange={e => setMyName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleConfirmEntry()}
              maxLength={12}
              autoFocus
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-base text-center focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-colors"
              placeholder="例: 闇月リリム"
            />
            <p className="text-xs text-slate-500 text-center">空欄の場合はランダムな名前が割り当てられます</p>
          </div>
          <button
            type="button"
            onClick={handleConfirmEntry}
            className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] py-4 font-bold text-slate-950 transition-all shadow-lg shadow-cyan-900/35 border border-cyan-400/30"
          >
            <span className="block text-xl tracking-[0.2em] font-black">START</span>
            <span className="block text-xs font-semibold text-slate-900/75 mt-1">遊ぶ</span>
          </button>
        </div>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════
  // モード選択画面（旧ロビー）
  // ════════════════════════════════════════════════════════════════════════
  if (screen === "lobby") return (
    <Lobby
      myFullId={myFullId}
      copied={copied}
      onCopyMyId={handleCopyMyId}
      loading={loading}
      onSoloPlay={handleSoloPlay}
      multiAction={multiAction}
      onSetMultiAction={(updater) => {
        resumeSoundFromUserGesture();
        setMultiAction(updater);
      }}
      isPrivateRoom={isPrivateRoom}
      onSetPrivateRoom={setIsPrivateRoom}
      onCreateRoom={handleCreateRoom}
      joinInput={joinInput}
      onJoinInputChange={setJoinInput}
      onJoinRoom={handleJoinRoom}
      invitesPanelOpen={invitesPanelOpen}
      pendingInvites={pendingInvites}
      invitesLoading={invitesLoading}
      invitesProbeReady={invitesProbeReady}
      onFetchInvites={handleFetchInvites}
      onJoinInvite={handleJoinInvite}
      uiError={uiError}
      onClearUiError={() => setUiError("")}
      seVolume={seVolume}
      bgmVolume={bgmVolume}
      onSeVolumeChange={handleSeVolumeChange}
      onBgmVolumeChange={handleBgmVolumeChange}
    />
  );

  // ════════════════════════════════════════════════════════════════════════
  // 待機室
  // ════════════════════════════════════════════════════════════════════════
  if (screen === "waiting") return (
    <WaitingRoom
      waitingSessionKey={waitingSessionKey}
      myFullId={myFullId}
      copied={copied}
      onCopyRoomId={handleCopyRoomId}
      roomData={roomData}
      roomId={roomId}
      playerSlots={playerSlots}
      myId={myId}
      isHost={isHost}
      onReturnToLobby={handleReturnToLobby}
      onSelectCharacter={handleSelectCharacter}
      onCommitInitialRolls={handleCommitInitialRolls}
      soundRef={soundRef}
      onStartGame={handleStartGame}
      onSetLobbyReady={handleSetLobbyReady}
      loading={loading}
      uiError={uiError}
      inviteInput={inviteInput}
      onInviteInputChange={setInviteInput}
      inviteError={inviteError}
      onInvitePlayer={handleInvitePlayer}
      onCancelInvite={handleCancelInvite}
      cancelInviteLoading={cancelInviteLoading}
      onKickPlayer={handleHostKickPlayer}
      kickLoading={kickLoading}
      seVolume={seVolume}
      bgmVolume={bgmVolume}
      onSeVolumeChange={handleSeVolumeChange}
      onBgmVolumeChange={handleBgmVolumeChange}
      unlockPlayerNameForSecret={myName}
      onSecretCharacterSelected={playRirimuSelectionSe}
    />
  );

  // ════════════════════════════════════════════════════════════════════════
  // ゲームオーバー
  // ════════════════════════════════════════════════════════════════════════
  if (screen === "gameover") return (
    <div className="min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center">
      <TopRightHud
        myFullId={myFullId}
        seVolume={seVolume}
        bgmVolume={bgmVolume}
        onSeVolumeChange={handleSeVolumeChange}
        onBgmVolumeChange={handleBgmVolumeChange}
        onReturnToLobby={handleReturnToLobby}
        returnToLobbyLabel={RETURN_TO_LOBBY_LABEL}
        returnToLobbyHint={RETURN_TO_LOBBY_HINT}
      />
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="text-7xl">💀</div>
        <h2 className="text-3xl font-bold text-rose-400">GAME OVER</h2>
        <p className="text-slate-300 text-sm leading-relaxed">{gs?.gameOverMsg}</p>
        {gs?.players?.some(p => p.alive) && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-left space-y-2">
            <p className="text-xs text-slate-400 mb-2">生き残ったプレイヤー</p>
            {(gs.players ?? []).filter(p => p.alive).map(p => (
              <div key={p.id} className="flex justify-between text-sm">
                <span>{p.name}{p.id === myId && " (YOU)"}</span>
                <span className="text-yellow-300">{p.stats.money}G / {rankLabel(p.stats.money)}ランク</span>
              </div>
            ))}
          </div>
        )}
        <button onClick={handleReturnToLobby}
          className="rounded-xl bg-cyan-500 px-8 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors">
          {RETURN_TO_LOBBY_LABEL}
        </button>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════
  // 結果画面
  // ════════════════════════════════════════════════════════════════════════
  if (screen === "results") {
    const sorted   = [...(gs?.players ?? [])].sort((a, b) => b.stats.money - a.stats.money);
    const medals   = ["🥇","🥈","🥉",""];
    const ssTop     = sorted.length > 0 ? sorted[0] : null;
    const hasSSWinner = ssTop != null && rankLabel(ssTop.stats.money) === "SS";
    const ssHeadline  = hasSSWinner
      ? (ssTop.characterType === "vtuber" ? "✦ 伝説のリリム ✦" : "✦ 伝説のスター ✦")
      : "最終結果";
    return (
      <div className="relative min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8 overflow-hidden">
        <style>{GAME_STYLES}</style>
        <TopRightHud
          myFullId={myFullId}
          seVolume={seVolume}
          bgmVolume={bgmVolume}
          onSeVolumeChange={handleSeVolumeChange}
          onBgmVolumeChange={handleBgmVolumeChange}
        onReturnToLobby={handleReturnToLobby}
        returnToLobbyLabel={RETURN_TO_LOBBY_LABEL}
        returnToLobbyHint={RETURN_TO_LOBBY_HINT}
      />
        {/* SSランク パーティクル雨 */}
        {hasSSWinner && <SSRainParticles />}
        <div className="mx-auto max-w-4xl space-y-5 relative z-10">
          <div className="text-center space-y-2">
            {hasSSWinner
              ? <div className="text-5xl leading-none select-none anim-fadein">👑</div>
              : <Trophy size={52} className="mx-auto text-amber-400" />}
            <h2 className={`text-3xl font-bold ${hasSSWinner ? "text-yellow-300" : ""}`}>
              {ssHeadline}
            </h2>
            {hasSSWinner && (
              <p className="text-amber-300/80 text-sm tracking-wider">スーパースター達成！おめでとう！</p>
            )}
          </div>
          <AssetHistoryChart gameState={gs} />
          <div className="space-y-3">
            {sorted.map((p, rank) => {
              const rl = rankLabel(p.stats.money);
              const isSSPlayer = rl === "SS";
              return (
                <div key={p.id}
                  className={`rounded-xl border p-4 ${rank === 0 && isSSPlayer ? "border-yellow-400/80 bg-yellow-400/10 shadow-[0_0_24px_rgba(251,191,36,0.25)]" : rank === 0 ? "border-amber-400/60 bg-amber-400/10" : "border-slate-800 bg-slate-900"}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{isSSPlayer && rank === 0 ? "👑" : (medals[rank] ?? "")}</span>
                    <div className="flex-1">
                      <div className="font-semibold flex items-center gap-2 flex-wrap">
                        <span className={isSSPlayer ? "text-yellow-200" : ""}>{p.name}</span>
                        <CharacterIcon
                          characterType={p.characterType}
                          imgClassName="h-8 w-8 shrink-0 object-contain"
                          spanClassName="text-xl leading-none"
                        />
                        {p.id === myId && <span className="text-xs text-cyan-400 border border-cyan-400/40 rounded px-1">YOU</span>}
                        {(p.amulets ?? 0) > 0 && <span className="text-xs text-amber-400">🧿×{p.amulets}</span>}
                      </div>
                      <div className="text-xs text-slate-400">スロット{p.spinCount}回 / 移動{p.moveTurns}T / 技量{p.stats.skill} / 善行{p.stats.virtue}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${isSSPlayer ? "text-yellow-300" : "text-yellow-300"}`}>{p.stats.money}G</div>
                      <div className="text-xs text-slate-400">
                        スロット収支: <span className={p.slotNet >= 0 ? "text-emerald-400" : "text-rose-400"}>{p.slotNet >= 0 ? "+" : ""}{p.slotNet}G</span>
                      </div>
                      <div className={`text-sm font-black ${isSSPlayer ? "text-yellow-300" : rl === "S" ? "text-amber-400" : "text-slate-400"}`}>
                        {isSSPlayer && "✦ "}ランク {rl}{isSSPlayer && " ✦"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {roomId ? (
            <ResultsRoomActions
              isHost={isHost}
              waitingForHost={roomData?.status === "completed"}
              loading={resultsRoomActionLoading}
              onDisband={handleHostDisbandRoom}
              onContinue={handleHostContinueToLobby}
              onLeave={handleLeaveRoomFromResults}
            />
          ) : (
            <button
              type="button"
              onClick={handleReturnToLobby}
              className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
            >
              {RETURN_TO_LOBBY_LABEL}
            </button>
          )}
          {uiError && (
            <p className="text-center text-sm text-rose-400" role="alert">
              {uiError}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // ゲーム中（gamePhase === GAME_PHASE.playing）
  // ════════════════════════════════════════════════════════════════════════
  const hasRenderableGameState =
    gs && Array.isArray(gs.players) && gs.players.length > 0;
  const awaitingPeerStateSync =
    screen === "playing" &&
    authReady &&
    roomId &&
    roomData &&
    ["playing", "FINAL_BATTLE"].includes(roomData.status) &&
    !hasRenderableGameState;

  if (!hasRenderableGameState) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 p-8 text-slate-200">
        <Loader2 size={36} className="animate-spin text-cyan-400" aria-hidden />
        <p className="text-center text-sm sm:text-base max-w-md leading-relaxed" role="status">
          {awaitingPeerStateSync ? "Waiting for other players..." : "読み込み中…"}
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8 ${shakeScreen ? "anim-shake" : ""}`}>
      {/* CSS keyframes 注入 */}
      <style>{GAME_STYLES}</style>

      <TopRightHud
        myFullId={myFullId}
        seVolume={seVolume}
        bgmVolume={bgmVolume}
        onSeVolumeChange={handleSeVolumeChange}
        onBgmVolumeChange={handleBgmVolumeChange}
        onReturnToLobby={handleReturnToLobby}
        returnToLobbyLabel={RETURN_TO_LOBBY_LABEL}
        returnToLobbyHint={RETURN_TO_LOBBY_HINT}
      />

      {uiError ? (
        <div
          className="fixed bottom-4 left-1/2 z-[250] w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-rose-500/40 bg-rose-950/90 px-4 py-3 text-sm text-rose-100 shadow-lg"
          role="alert"
        >
          {uiError}
        </div>
      ) : null}

      {/* SP/すごろく中: POT は BoardGamePhase ヘッダー inline（sugorokuMobileLayout.js 参照） */}
      <ProgressivePotDisplay
        totalPot={roomData?.totalPot ?? 0}
        visible={showProgressivePotHud && !cpIsSlot && !showSugorokuBoard}
      />

      {/* ── PON炎上シェイク警告テロップ ── */}
      {shakeScreen && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <span className="bg-rose-600/90 text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg anim-fadein tracking-wide">
            ⚡ 転倒 / 炎上！
          </span>
        </div>
      )}

      {/* ── PON転倒カットイン（手番・観戦とも movementFx 同期） ── */}
      {ponCutin && (
        <PonCutin
          active
          characterType={ponCutin.characterType}
          onFallLand={() => {
            setShakeScreen(true);
            setTimeout(() => setShakeScreen(false), 420);
          }}
          onComplete={() => {
            void ponCutinFinalizeRef.current();
          }}
        />
      )}

      {taxiPhase === "trafficJam" && <TaxiTrafficJamCutin />}

      {streamTypeCutin && (
        <StreamTypeCutin
          mode={streamTypeCutin.mode}
          gold={streamTypeCutin.gold}
          stat={streamTypeCutin.stat}
        />
      )}
      {workCutin && (
        <WorkCutin
          gold={workCutin.gold}
          stat={workCutin.stat}
          characterType={workCutin.characterType}
          onDismiss={dismissStuckDailyCutin}
        />
      )}

      {showDailyCutinSpectator && dailyCutinSpectatorBannerLabel && (
        <div
          className="fixed inset-x-0 top-[min(10vh,4.5rem)] z-[220] pointer-events-none flex justify-center px-4"
          role="status"
          aria-live="polite"
        >
          <div className="rounded-2xl border border-violet-400/55 bg-slate-950/92 px-5 py-2.5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
            <p className="text-sm font-bold text-violet-100 sm:text-base">{dailyCutinSpectatorBannerLabel}</p>
          </div>
        </div>
      )}

      {turnChangeBannerTurns != null && (
        <div
          className="fixed inset-0 z-[260] flex items-center justify-center pointer-events-none bg-black/55 anim-fadein overflow-hidden"
          role="status"
          aria-live="polite"
        >
          <div className="absolute inset-0 anim-stream-cutin-lines opacity-40" aria-hidden />
          <div
            className="pointer-events-none absolute inset-y-[-15%] left-[-45%] w-[190%] bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent opacity-90 anim-stream-cutin-sweep"
            aria-hidden
          />
          <div className="relative rounded-2xl border-2 border-cyan-300/80 bg-slate-950/95 px-12 py-8 text-center shadow-[0_18px_70px_rgba(0,0,0,0.78)] anim-pon-burst-impact">
            <p className="text-cyan-200 text-2xl sm:text-3xl font-black tracking-wide">ーーーーーーーーー</p>
            <p className="mt-3 text-white text-4xl sm:text-5xl font-black tracking-tight tabular-nums drop-shadow-[0_0_18px_rgba(125,211,252,0.6)] anim-stream-pon-text">
              残り{turnChangeBannerTurns}ターン
            </p>
            <p className="mt-3 text-cyan-200 text-2xl sm:text-3xl font-black tracking-wide">ーーーーーーーーー</p>
          </div>
        </div>
      )}

      {streamPonFireOverlay && (
        <div
          className="fixed inset-0 z-[230] cursor-default overflow-hidden bg-black/0 anim-fadein pointer-events-auto"
          role="status"
          aria-live="assertive"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-red-950/85 to-orange-950/75 anim-stream-pon-burn-veil" aria-hidden />
          <div
            className="absolute -bottom-[18%] left-[-20%] right-[-20%] h-[72%] rounded-[50%] bg-gradient-to-t from-orange-500/60 via-red-600/40 to-transparent blur-[90px] anim-stream-pon-flame"
            aria-hidden
          />
          <div
            className="absolute bottom-0 left-[12%] w-[76%] h-[48%] rounded-full bg-amber-300/25 blur-[80px] anim-stream-pon-flame opacity-95"
            style={{ animationDelay: "0.12s" }}
            aria-hidden
          />
          <div className="absolute top-[28%] left-[8%] h-40 w-40 rounded-full bg-orange-400/35 blur-[48px] anim-stream-pon-flame" aria-hidden />
          <div
            className="absolute top-[32%] right-[10%] h-48 w-48 rounded-full bg-red-500/30 blur-[56px] anim-stream-pon-flame"
            style={{ animationDelay: "0.2s" }}
            aria-hidden
          />
          <div className="relative z-[1] flex min-h-full flex-col items-center justify-center px-5 pt-8">
            <p
              className="text-[min(20vw,7rem)] sm:text-[min(16vw,7.5rem)] font-black tracking-tight leading-none anim-stream-pon-text text-amber-100"
              style={{
                textShadow:
                  "0 0 52px rgba(251,146,60,1), 0 0 100px rgba(239,68,68,0.85), 0 6px 0 rgb(124,45,18), 0 -4px 28px rgba(254,243,199,0.65)",
                fontFamily: '"Noto Sans JP","Yu Gothic UI",sans-serif',
              }}
            >
              PON！！
            </p>
          </div>
        </div>
      )}

      {workPonHud && (
        <div
          className="fixed inset-0 z-[230] flex cursor-default flex-col items-center justify-center px-5 bg-black/70 pointer-events-auto anim-fadein"
          role="status"
          aria-live="assertive"
        >
          <p
            className="text-[min(20vw,7rem)] sm:text-[min(16vw,7.5rem)] font-black tracking-tight text-fuchsia-100 leading-none"
            style={{
              textShadow: "0 0 56px rgba(232,121,249,0.65), 0 5px 0 rgb(109,40,217), 0 0 2px #fff",
              fontFamily: '"Noto Sans JP","Yu Gothic UI",sans-serif',
            }}
          >
            PON！！
          </p>
          <div className="mt-6 max-w-lg space-y-4 text-center text-sm sm:text-base text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            <p>
              PONでの弁償{" "}
              <span className="font-bold tabular-nums text-rose-300">-{workPonHud.penalty}G</span>
            </p>
            <p>
              このターンの収支（仕事 − 弁償）{" "}
              <span
                className={`font-bold tabular-nums ${workPonHud.turnDelta >= 0 ? "text-cyan-300" : "text-rose-300"}`}
              >
                {workPonHud.turnDelta >= 0 ? "+" : ""}
                {workPonHud.turnDelta}G
              </span>
            </p>
          </div>
        </div>
      )}

      {/* ── 配信失敗カットイン（日常・自分ターンのみ） ── */}
      {streamFailOverlay && (
        <div
          className="fixed inset-0 z-[230] flex cursor-default flex-col items-center justify-center px-5 bg-black/75 pointer-events-auto anim-fadein"
          role="status"
          aria-live="assertive"
        >
          <p
            className="text-[min(22vw,7.5rem)] sm:text-[min(18vw,8rem)] font-black tracking-tighter text-white leading-none mb-6"
            style={{
              textShadow: "0 0 48px rgba(248,113,113,0.55), 0 4px 0 rgb(127,29,29)",
              fontFamily: '"Noto Sans JP","Yu Gothic UI",sans-serif',
            }}
          >
            失敗
          </p>
          <p className="max-w-lg text-center text-base sm:text-lg font-semibold text-slate-200 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            OBSトラブルで少ししか配信ができなかった
          </p>
        </div>
      )}

      {/* ── 神社カットインオーバーレイ ── */}
      {shrinePhase && (
        <div className={`fixed inset-0 z-[210] flex cursor-default flex-col items-center justify-center bg-black/65 pointer-events-auto ${shrinePhase === "in" ? "anim-shrine-in" : "anim-shrine-out"}`}>
          <span className="text-[100px] leading-none select-none"
                style={{ filter: "drop-shadow(0 0 30px rgba(251,191,36,0.7))" }}>⛩</span>
          <p className="mt-4 text-xl font-semibold text-amber-200 tracking-[0.25em]">二礼二拍手一礼</p>
          <p className="text-sm text-amber-300/70 mt-1">運気が上がった気がする…</p>
        </div>
      )}

      {showDailySlotSpectatorMirror && cpGs && roomGs && dailySlotSpinStats && (
        <DailySlotTrainingModal
          open
          spectatorMode
          broadcastGs={roomGs}
          statsForSpin={dailySlotSpinStats}
          characterType={cpGs.characterType}
          playerName={cpGs.name}
          soundRef={soundRef}
          onClose={() => {}}
          onFinished={() => {}}
        />
      )}

      {/* ── 幸運のダイスフラッシュ ── */}
      {showLuckyDice && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <span className="text-3xl font-black text-amber-300 tracking-wide anim-lucky-pop"
                style={{ textShadow: "0 0 24px rgba(251,191,36,0.9), 0 0 8px rgba(251,191,36,0.7)" }}>
            幸運のダイス！🎲🎲
          </span>
        </div>
      )}

      {isFinalBattleUIMode && (
        <FinalBattleStage gameState={gs} soundRef={soundRef} />
      )}

      {!isFinalBattleUIMode ? (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 lg:flex-row lg:items-start">
        <PlayingPlayerSidebar
          className="order-2 w-full shrink-0 lg:order-1 lg:sticky lg:top-6 lg:w-[min(100%,320px)] lg:self-start"
          players={gsPlayersForUi}
          log={gs.log}
          seatOrderIds={playerSlots.map((s) => s.id)}
          currentPlayerIdx={gs.currentPlayerIdx}
          myId={myId}
          subPhase={gs.subPhase}
          proxySlotTargetIdx={gs.proxySlotTargetIdx}
          showStatLegend={gs.players.length > 1}
        />

        <div className="order-1 min-w-0 flex-1 space-y-5 lg:order-2">
        {/* ── ヘッダー ──────────────────────────────────────────────── */}
        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-lg font-bold md:text-xl font-[Rajdhani] tracking-wide text-white">{GAME_TITLE_SHORT}</h1>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight uppercase tracking-wide max-w-md">
                {GAME_TITLE_FULL}
              </p>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed space-y-0.5">
                {gs?.subPhase === SUB_PHASE.daily && `${gs.currentDay}日目 / ${cpGs?.name}のターン`}
                {gs?.subPhase === SUB_PHASE.day8 && cpGs && (
                  <>
                    <span className="block">
                      {cpGs.movePhase === MOVE_PHASE.missed &&
                        `【8日目・決戦】タイムアウト／${cpGs.name}`}
                      {anyGoalLandingPlayer &&
                        `【8日目・決戦】ゴール到着処理中／${anyGoalLandingPlayer.name}`}
                      {cpIsWaitingSlot &&
                        `【8日目・決戦】ゴール済／${cpGs.name}（次の自分ターンからスロット）`}
                      {cpIsSlot && `【8日目・決戦】スロット／${cpGs.name}`}
                    </span>
                    <span className="block tabular-nums font-semibold text-amber-200/90 mt-1 sm:mt-0.5">
                      残りラウンド{" "}
                      <strong>{day8RemainingTurns}</strong>
                      {" / "}
                      {BAL.dice.maxTurns}ターン{" "}
                      <span className="hidden md:inline font-normal text-slate-500">（すごろく／スロット共通）</span>
                    </span>
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {/* 8日目：補助HUD（PCのみ） */}
              {gs?.subPhase === SUB_PHASE.day8 && cpGs && (
                <div className="hidden md:flex flex-col items-end gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-amber-400/90 leading-none">8日目 HUD</span>
                  <span className="text-xs font-bold text-slate-200 tabular-nums leading-none">
                    {(cpGs.movePhase === MOVE_PHASE.goalLanding || cpGs.movePhase === MOVE_PHASE.waitingSlot) ? (
                      <>ゴール済・スロット待ち</>
                    ) : cpGs.movePhase === MOVE_PHASE.arrived ? (
                      <>🎰 スロット</>
                    ) : cpGs.movePhase === MOVE_PHASE.moving ? (
                      <>移動手番 <strong>{BAL.dice.maxTurns - day8RemainingTurns}</strong><span className="text-slate-600">/</span><strong>{BAL.dice.maxTurns}</strong></>
                    ) : (
                      <>{cpGs.movePhase === MOVE_PHASE.missed ? "すごろくタイムアウト済" : "—"}</>
                    )}
                  </span>
                </div>
              )}
              <div className="hidden md:flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-mono border border-slate-700 rounded px-2 py-0.5 select-all">
                  {roomId}
                </span>
                <CopyClipboardButton copied={copied} onCopy={handleCopyRoomId} size="sm" />
              </div>
              {gs.players.length > 1 && !roomData?.isSolo && (
                <button
                  type="button"
                  onClick={() => setLeaveGameConfirmOpen(true)}
                  disabled={leaveGameLoading}
                  className="hidden md:inline-flex rounded-lg border border-rose-500/40 bg-rose-950/30 px-2.5 py-1 text-[11px] font-bold text-rose-200 hover:bg-rose-900/40 transition-colors disabled:opacity-50"
                >
                  退室
                </button>
              )}
              <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
                <Users size={12} className="text-cyan-400 shrink-0" />
                <span>
                  {(roomGs ?? gs).players.map((p, i) => (
                    <span key={p.id}>
                      {i > 0 ? " · " : ""}
                      {p.name}
                      <span className="inline-block w-[1.1em] text-center" aria-hidden={!(p.isGhost || p.isGameOver)}>
                        {p.isGhost || p.isGameOver ? "👻" : ""}
                      </span>
                    </span>
                  ))}
                </span>
              </div>
              {!isMyTurn && (
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                    isDay8SharedMoveWatch
                      ? "border border-cyan-500/35 bg-cyan-950/40 text-cyan-200"
                      : isDailyPhase
                        ? "border border-violet-500/30 bg-violet-950/35 text-violet-200"
                        : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {isDay8SharedMoveWatch ? (
                    <>
                      <span className="text-[10px] leading-none" aria-hidden>
                        🎲
                      </span>
                      {cpGs?.name}が移動中…
                    </>
                  ) : isDailyPhase ? (
                    showDailySlotSpectatorMirror ? (
                      <>{cpGs?.name}がスロット操作中</>
                    ) : showDailyCutinSpectator ? (
                      <>{dailyCutinSpectatorBannerLabel ?? `${cpGs?.name}が操作中`}</>
                    ) : showDailyActionSpectatorMirror ? (
                      <>{cpGs?.name}が操作中</>
                    ) : (
                      <>Waiting for others to act…</>
                    )
                  ) : showDay8SlotSpectatorMirror ? (
                    <>{cpGs?.name}がスロット操作中</>
                  ) : (
                    <>
                      <Loader2 size={10} className="animate-spin" />
                      {isMyDay8RoundCompleted
                        ? "Waiting for others..."
                        : `${cpGs?.name}のターン待ち`}
                    </>
                  )}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* ── 現在プレイヤーのステータス（ソロのみ。マルチはサイドバーに集約） ── */}
        {cpGs && gs.players.length <= 1 && (
          <section className="rounded-2xl border border-cyan-800/50 bg-slate-900 p-4 anim-turn-status-aura">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="font-semibold text-cyan-400 text-sm anim-turn-active-name">{cpGs.name}のステータス</span>
              {cpGs.id === myId && <span className="text-xs text-cyan-400 border border-cyan-400/40 rounded px-1.5 py-0.5">YOU</span>}
              {cpGs.stats.pon >= BAL.pon.deathThreshold && (
                <span className="animate-pulse rounded-full border border-rose-500/60 bg-rose-500/15 px-2 py-0.5 text-xs text-rose-300">
                  💀 PON危険域 ({cpGs.stats.pon})
                </span>
              )}
              {cpGs.stats.pon >= BAL.pon.fireThreshold && cpGs.stats.pon < BAL.pon.deathThreshold && (
                <span className="rounded-full border border-orange-500/50 bg-orange-500/15 px-2 py-0.5 text-xs text-orange-300">
                  🔥 PON発火域 ({cpGs.stats.pon})
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {STAT_META.map(({ key, label, color }) => {
                const livingCostDisplayed = livingCostForPlayer(cpGs);
                const isLivingCost = key === "livingCost";
                const rawVal = isLivingCost ? livingCostDisplayed : cpGs.stats[key];
                const negMoney = key === "money" && cpGs.stats.money < 0;
                const sizeCls = key === "money" ? "text-lg" : "text-2xl";
                return (
                  <div key={key} className="group/status-hint relative rounded-lg bg-slate-800 p-2.5 text-center anim-turn-active-stat-cell">
                    <div className="text-xs text-slate-400 leading-tight">
                      {label}
                      {isLivingCost && (
                        <span className="text-slate-500 text-[10px]">／日<span className="sr-only">（1〜7日目の行動後）</span></span>
                      )}
                    </div>
                    <div className={`mt-0.5 font-bold tabular-nums inline-flex items-baseline justify-center gap-0.5 ${negMoney ? "text-rose-400" : color} ${sizeCls}`}>
                      <span>{rawVal}</span>
                      {isLivingCost && <span className="text-xs font-semibold opacity-75">G</span>}
                    </div>
                    <div
                      role="tooltip"
                      className="pointer-events-none absolute left-1/2 top-full z-[120] mt-1 w-max max-w-[min(288px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-left text-[11px] leading-snug text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)] opacity-0 transition-opacity duration-150 delay-75 invisible group-hover/status-hint:opacity-100 group-hover/status-hint:visible group-hover/status-hint:delay-0"
                    >
                      {STATUS_OVERVIEW_HINTS[key] ?? ""}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* お守りカウント */}
            {(cpGs.amulets ?? 0) > 0 && (
              <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-sm">
                <span className="text-base leading-none">🧿</span>
                <span className="text-amber-300 font-semibold">お守り ×{cpGs.amulets}</span>
                <span className="text-amber-400/60 text-xs ml-auto">毎ターン 運+{cpGs.amulets * 2}</span>
              </div>
            )}
            {gs.subPhase === SUB_PHASE.day8 && cpGs.spinCount > 0 && (
              <div className="mt-2 flex items-center justify-end gap-2">
                {cpGs.slotNet >= 0 ? <TrendingUp size={14} className="text-emerald-400" /> : <TrendingDown size={14} className="text-rose-400" />}
                <span className="text-xs text-slate-400">スロット収支:</span>
                <span className={`text-sm font-bold ${cpGs.slotNet >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {cpGs.slotNet >= 0 ? "+" : ""}{cpGs.slotNet}G
                </span>
                <span className="text-xs text-slate-500">（{cpGs.spinCount}回）</span>
              </div>
            )}
            {cpGs.stats.money < 0 && (
              <div className="mt-2 rounded-lg border border-violet-500/45 bg-gradient-to-r from-violet-950/50 to-slate-900/80 px-3 py-2 space-y-0.5">
                <span className="text-violet-200 text-xs font-bold tracking-wide flex items-center gap-1.5">
                  <span>🩻</span> 闇金リリムから高利子で借金中
                </span>
                <span className="block text-[11px] text-rose-300/90">現在の赤字: {cpGs.stats.money}G（連続赤字が{BAL.rimiru.dailyGracesBefore}ターン／{BAL.rimiru.day8TurnsBefore}手番ごとに+{BAL.rimiru.interestPercent}%）</span>
              </div>
            )}
            {gs.recentPonEvent && (
              <div className="mt-3 rounded-lg border border-orange-500/40 bg-orange-500/10 p-2.5 text-sm text-orange-200">
                【PONイベント / {gs.recentPonEvent.player}】{gs.recentPonEvent.msg}
              </div>
            )}
          </section>
        )}

        {/* ── アクションエリア ──────────────────────────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">

          {/* 相手のターン待ち（8日目移動中は盤面表示のため非表示） */}
          {!isMyTurn && !goalLandingSelf && !hideBlockingObserverWait && (
            <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-5 text-center space-y-2">
              <Loader2 size={24} className="animate-spin text-slate-500 mx-auto" />
              <p className="text-slate-400 text-sm">
                {isDailyPhase
                  ? `${cpGs?.name} の行動選択を待っています…`
                  : isMyDay8RoundCompleted
                  ? "Waiting for others..."
                  : anyGoalLandingPlayer && anyGoalLandingPlayer.id !== myId
                  ? `${anyGoalLandingPlayer.name} がゴール到着！終了確認を待っています…`
                  : cpIsWaitingSlot
                    ? `${cpGs?.name} のゴール後ターン／スロット開始を待っています…`
                    : `${cpGs?.name} のターン操作を待っています…`}
              </p>
            </div>
          )}

          {/* ── 1〜7日目（自分のターン） ── */}
          {isMyTurn && gs.subPhase === SUB_PHASE.daily && cpGs && (
            <DailyActionPhase
              gs={gs}
              cpGs={cpGs}
              onDailyAction={handleDailyAction}
              onOpenDailySlot={handleOpenDailySlot}
              interactionLocked={
                workCutin != null ||
                streamTypeCutin != null ||
                shrinePhase != null ||
                streamPonFireOverlay ||
                workPonHud != null ||
                streamFailOverlay
              }
            />
          )}

          {/* ── 1〜7日目（他プレイヤー観戦ミラー） ── */}
          {showDailyActionSpectatorMirror && (
            <DailyActionSpectatorMirror gs={gs} cpGs={cpGs} />
          )}

          {showDay8SlotSpectatorMirror && cpGs && (
            <Day8SlotSpectatorMirror
              gs={gs}
              cpGs={cpGs}
              soundRef={soundRef}
              myId={myId}
              totalPot={roomData?.totalPot ?? 0}
              showProgressivePot={showProgressivePotHud}
            />
          )}

          {isMyTurn && dailySlotOpen && dailySlotSpinStats && cpGs && (
            <DailySlotTrainingModal
              open={dailySlotOpen}
              statsForSpin={dailySlotSpinStats}
              characterType={cpGs.characterType}
              playerName={cpGs.name}
              initialSlotPityCounter={cpGs.slotPityCounter ?? 0}
              externalSyncSessionId={dailySlotSyncSessionId}
              soundRef={soundRef}
              onClose={handleDailySlotClose}
              onFinished={finalizeDailySlotTraining}
              syncBroadcast={dailySlotSyncBroadcast}
            />
          )}

          {showSugorokuBoard && (
          <BoardGamePhase
            gs={gs}
            cpGs={cpGs}
            boardViewPos={sugorokuBoardViewPos}
            reportSugorokuHopComplete={isMyTurn && ponHopCompleteEnabled}
            onSugorokuHopComplete={handleSugorokuHopComplete}
            isMyTurn={isMyTurn}
            dailyActionFx={
              gs.subPhase === SUB_PHASE.daily ? roomGs?.dailyActionFx ?? null : null
            }
            cpIsWaitingSlot={cpIsWaitingSlot}
            isDay8Moving={isDay8Moving}
            isDiceRolling={isDiceRolling}
            localDice={localDice}
            diceShuffleValues={diceShuffleValues}
            diceConfirmed={diceConfirmed}
            isLuckyRoll={isLuckyRoll}
            showDiceTotal={showDiceTotal}
            displayDice={displayDice}
            taxiPhase={taxiPhase}
            taxiActorPlayerId={taxiActorPlayerId}
            taxiDriveCongested={taxiDriveCongested}
            taxiDriveEndPos={taxiDriveEndPos}
            taxiDriveDurationMs={taxiDriveDurationMs}
            taxiDriveSegmentMs={taxiDriveActiveMs}
            taxiJamMidPos={taxiJamMidPos}
            pieceHopping={pieceHopping}
            movementFxDiceActive={movementFxSync.diceActive}
            movementFxRunning={movementFxSync.isRunning}
            movementFxDiceRolls={movementFxSync.diceRolls}
            movementFxFloatDelta={
              boardMoneyFloatDelta ?? movementFxSync.floatDelta
            }
            movementFxLabelActive={
              boardMoneyFloatDelta != null ? true : movementFxSync.labelActive
            }
            movementFxFloatLabelMode={
              boardMoneyFloatDelta != null ? "money" : movementFxSync.floatLabelMode
            }
            interactionLocked={day8ActionLocked}
            onMoveAction={handleMoveAction}
            onUseDay8Item={handleUseDay8Item}
            onGoalLandingConfirm={handleGoalLandingConfirm}
            goalLandingSelf={goalLandingSelf}
            tileEffectLines={sugorokuTileFxToast?.lines ?? null}
            tileEffectKind={sugorokuTileFxToast?.kind ?? null}
            boardDeathPresentation={boardDeathPresentation}
            deathFadeHandledIds={deathFadeHandledIds}
            onBoardHelpDeathConfirm={handleBoardHelpDeathConfirm}
            totalPot={roomData?.totalPot ?? 0}
            showProgressivePot={showProgressivePotHud}
          />
          )}

          {ghostPickIsMyTurn && cpIsGhostPick && cpGs && (
            <TurnManager
              gs={roomDay8Active ? roomGs : gs}
              cpGs={cpGs}
              isMyTurn={ghostPickIsMyTurn}
              writeGS={writeGS}
              interactionLocked={day8ActionLocked}
            />
          )}

          {isMyTurn && cpIsSlot && cpGs && !cpIsNetworkAutomatedTurn && (
            <SlotContainer
              gs={gs}
              cpGs={cpGs}
              isMyTurn={isMyTurn}
              writeGS={writeGS}
              commitPendingGameState={commitPendingGameState}
              commitDay8SlotLivePatch={commitDay8SlotLivePatch}
              syncDay8SlotIdleFromLive={syncDay8SlotIdleFromLive}
              commitGameStateTransaction={commitGameStateTransaction}
              commitDay8SlotSpin={commitDay8SlotSpin}
              soundRef={soundRef}
              roomId={roomId}
              interactionLocked={day8ActionLocked}
              myId={myId}
              onUseDay8Item={handleUseDay8Item}
              totalPot={roomData?.totalPot ?? 0}
              showProgressivePot={showProgressivePotHud}
            />
          )}

          {showSlotSpinBroadcastMirror && (
            <SlotSpinBroadcastOverlay gs={gs} soundRef={soundRef} myId={myId} />
          )}

        </section>

        <button onClick={handleReturnToLobby}
          className="text-xs text-slate-600 underline hover:text-slate-400"
          title={RETURN_TO_LOBBY_HINT}>
          {RETURN_TO_LOBBY_LABEL}（ゲーム続行）
        </button>
        </div>
      </div>
      ) : null}

      {leaveGameConfirmOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leave-game-title"
        >
          <div className="w-full max-w-sm rounded-2xl border border-rose-500/35 bg-slate-900 p-5 shadow-2xl space-y-4">
            <div className="space-y-2">
              <p id="leave-game-title" className="text-base font-bold text-slate-100">
                ルームから退室しますか？
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                退室後は自動操作（ゴースト）でゲームが続行されます。再接続する場合は同じブラウザから再度入場してください。
                「タイトル画面へ」とは異なり、ルームから正式に抜けます。
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLeaveGameConfirmOpen(false)}
                disabled={leaveGameLoading}
                className="flex-1 rounded-xl border border-slate-600 bg-slate-800 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={() => void handleGracefulLeaveGame()}
                disabled={leaveGameLoading}
                className="flex-1 rounded-xl bg-rose-600 py-2.5 text-sm font-bold text-white hover:bg-rose-500 transition-colors disabled:opacity-50"
              >
                {leaveGameLoading ? "処理中…" : "退室する"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
