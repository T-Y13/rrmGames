import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { db } from "./lib/firebase";
import { arrayUnion, collection, doc, query, where, limit, getDocs, runTransaction } from "firebase/firestore";
import { Loader2, TrendingUp, TrendingDown, Trophy, Users } from "lucide-react";

import { CharacterIcon } from "./components/CharacterPieces";
import BoardGamePhase from "./components/BoardGamePhase";
import PonCutin from "./components/PonCutin";
import TaxiTrafficJamCutin from "./components/TaxiTrafficJamCutin";
import DailyActionPhase from "./components/DailyActionPhase";
import DailySlotTrainingModal from "./components/DailySlotTrainingModal";
import FinalBattleStage from "./components/FinalBattleStage";
import Lobby from "./components/Lobby";
import SSRainParticles from "./components/SSRainParticles";
import SlotContainer from "./components/SlotContainer";
import SlotSpinBroadcastOverlay from "./components/SlotSpinBroadcastOverlay";
import TurnManager from "./components/TurnManager";
import WaitingRoom from "./components/WaitingRoom";
import TopRightHud from "./components/TopRightHud";
import PlayingPlayerSidebar from "./components/PlayingPlayerSidebar";
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
import {
  canWriteGoalLandingConfirm,
  isActorTurnOnGameState,
  isHostFinalBattleScheduledWrite,
} from "./lib/multiplayerGameStateAuth";
import { createSlotSoundManager } from "./lib/slotSound";
import {
  applyGoalLandingConfirm,
  applyRimiruDailyEnd,
  applySplashDamage,
  applyVirtueIncomeBoost,
  applyVirtueWave,
  clamp,
  clampMoney,
  computeAdvanceDaily,
  computeAdvanceDay8Turn,
  computeTaxiCongestedLegDurations,
  computeSugorokuHopDurationMs,
  computeTaxiDriveDurationMs,
  enterDay8AfterFinalBattleCue,
  finalizeToResults,
  genQuickName,
  isGhostPickTargetPhase,
  genRoomId,
  initialGameState,
  livingCostForPlayer,
  normalizeSlotInitialRolls,
  prependLogs,
  rankLabel,
  resolveDay8LandingWithTiles,
  rollDie,
  shrineAmuletDropChance,
  toEpochMsMaybe,
  rand,
  virtueIncomeMult,
} from "./utils/gameLogic";
import { publicAssetUrl } from "./lib/publicAssetUrl";
import { formatFriendlyError } from "./lib/formatFriendlyError";
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

/** 「進む／戻る」マス効果の中間マス（Firestore 先行書き込み用）：go/miss 確定前は移動中で統一 */
function buildDay8TileSlideMidpointPlayers(playersArr, moverIdx, midPos) {
  return playersArr.map((pl, i) =>
    i !== moverIdx
      ? pl
      : {
          ...pl,
          position: midPos,
          movePhase: "moving",
          slotTurnsLeft: 0,
          reservedSlotTurns: 0,
          slotPullsGranted: 0,
          slotPullsThisSeat: 0,
        },
  );
}

function normalizeCompletedPlayers(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((id) => typeof id === "string" && id.length > 0);
}

function deriveDay8RoundStateFromRoom(roomDoc) {
  const remainingRaw = Number(roomDoc?.remainingTurns);
  const remaining =
    Number.isFinite(remainingRaw) && remainingRaw >= 0
      ? Math.floor(remainingRaw)
      : BAL.dice.maxTurns;
  return {
    remainingTurns: remaining,
    completedPlayers: normalizeCompletedPlayers(roomDoc?.completedPlayers),
  };
}

function applyDay8RoundTracking(roomDoc, nextGs, actorUid) {
  const prevGs = roomDoc?.gameState;
  let trackedGs = nextGs;
  let { remainingTurns, completedPlayers } = deriveDay8RoundStateFromRoom(roomDoc);

  const entersDay8 =
    nextGs?.gamePhase === "playing" &&
    nextGs?.subPhase === "day8" &&
    !(prevGs?.gamePhase === "playing" && prevGs?.subPhase === "day8");
  if (entersDay8) {
    remainingTurns = BAL.dice.maxTurns;
    completedPlayers = [];
  }

  const inDay8Before = prevGs?.gamePhase === "playing" && prevGs?.subPhase === "day8";
  const actorIdx = prevGs?.currentPlayerIdx;
  const actorIdBefore =
    Number.isInteger(actorIdx) && Array.isArray(prevGs?.players) ? prevGs.players[actorIdx]?.id : null;
  const actorPrev =
    Number.isInteger(actorIdx) && Array.isArray(prevGs?.players) ? prevGs.players[actorIdx] : null;
  const actorNext =
    Number.isInteger(actorIdx) && Array.isArray(nextGs?.players) ? nextGs.players[actorIdx] : null;
  const actorMoveTurnsIncreased =
    Number(actorNext?.moveTurns ?? -1) > Number(actorPrev?.moveTurns ?? -1);
  const turnAdvanced =
    inDay8Before &&
    ((nextGs?.gamePhase !== "playing" || nextGs?.subPhase !== "day8") ||
      Number(nextGs?.currentPlayerIdx) !== Number(prevGs?.currentPlayerIdx));
  /** 手番 index が変わらないソロ等：スロット1席終了で slotPullsThisSeat がアウトゴーイングにより 0 に戻る */
  const day8SlotSeatClosedSameIdx =
    inDay8Before &&
    Number(prevGs?.currentPlayerIdx) === Number(nextGs?.currentPlayerIdx) &&
    actorPrev?.movePhase === "arrived" &&
    Number(actorPrev?.slotPullsThisSeat ?? 0) > 0 &&
    Number(actorNext?.slotPullsThisSeat ?? 0) === 0;
  const actionCompleted = turnAdvanced || actorMoveTurnsIncreased || day8SlotSeatClosedSameIdx;

  if (
    inDay8Before &&
    actionCompleted &&
    actorIdBefore &&
    actorIdBefore === actorUid &&
    actorPrev?.alive !== false
  ) {
    if (!completedPlayers.includes(actorUid)) completedPlayers = [...completedPlayers, actorUid];
    const aliveIds = (prevGs.players ?? [])
      .filter((p) => p?.alive !== false && typeof p?.id === "string")
      .map((p) => p.id);
    const completedAliveCount = aliveIds.filter((id) => completedPlayers.includes(id)).length;
    if (aliveIds.length > 0 && completedAliveCount >= aliveIds.length) {
      remainingTurns = Math.max(0, remainingTurns - 1);
      completedPlayers = [];
      const roundsUsed = Math.max(0, BAL.dice.maxTurns - remainingTurns);
      if (Array.isArray(trackedGs?.players)) {
        trackedGs = {
          ...trackedGs,
          players: trackedGs.players.map((pl) =>
            pl?.alive !== false ? { ...pl, moveTurns: Math.max(Number(pl.moveTurns) || 0, roundsUsed) } : pl,
          ),
        };
      }
    }
  }

  return {
    gameState: trackedGs,
    remainingTurns,
    completedPlayers,
  };
}

/** 7日目ラスト→決戦直前：書き込み前に育成画面のままステータス・ログだけ反映（決戦UIへは即切り替えない） */
function buildDay7DailyOptimisticGs(nextGs, sourceGs, advancesToSugoroku) {
  if (!advancesToSugoroku) return nextGs;
  const o = { ...nextGs };
  delete o.finalBattleStartedAt;
  delete o.finalBattleEntry;
  return {
    ...o,
    gamePhase: "playing",
    subPhase: "daily",
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
  // 招待制ルーム関連
  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [inviteInput, setInviteInput]     = useState("");
  const [inviteError, setInviteError]     = useState("");
  const [copied, setCopied]               = useState(false);
  const [seVolume, setSeVolume]           = useState(() => loadSoundVolume(LS_SE_VOL, DEFAULT_SE_VOL));
  const [bgmVolume, setBgmVolume]         = useState(() => loadSoundVolume(LS_BGM_VOL, DEFAULT_BGM_VOL));
  // モード選択画面
  const [multiOpen, setMultiOpen]         = useState(false);
  const [multiAction, setMultiAction]     = useState(null); // null|"create"|"join"
  const [allowQuickMatch, setAllowQuickMatch] = useState(true); // 公開ルームでクイックマッチを受け入れるか
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
  const prevRoomGsForTaxiSyncRef = useRef(null);
  /** 今回のタクシー演出の操作者（drive 完了書き込みで手番が進んだら arrive を出さない判定用） */
  const taxiActorPlayerIdRef = useRef(null);
  /** PON転倒カットイン後に書き込む gameState（転倒時のみ） */
  const ponCutinCommitRef = useRef(null);
  const ponCutinFinalizeRef = useRef(async () => {});
  /** Firestore 反映前のすごろく表示マス（転倒ストップ地点） */
  const [boardViewPosOverride, setBoardViewPosOverride] = useState(null);
  /** { characterType } — 非 null でカットイン表示 */
  const [ponCutin, setPonCutin] = useState(null);
  /** { title, lines } — すごろくマス効果の短いポップアップ */
  const [sugorokuTileFxToast, setSugorokuTileFxToast] = useState(null);
  /** PON転倒：マスホップ完了後にのみ BoardViewport からコールバックを受ける */
  const [ponHopCompleteEnabled, setPonHopCompleteEnabled] = useState(false);
  const ponHopGateRef = useRef(false);
  /** PON転倒＋「進む／戻る」マス効果：第2ホップ前に解除 */
  const ponTileSlideTimerRef = useRef(null);
  /** タクシー書き込み直後にマス効果トーストを表示 */
  const pendingSugorokuTileFxToastRef = useRef(null);
  const sugorokuTileFxToastTimerRef = useRef(null);
  /** 7日目デイリー：Firestore 同期前に一覧・ログへ結果を反映（仕事・配信・神社・デイリースロット） */
  const [day7DailyOptimisticGs, setDay7DailyOptimisticGs] = useState(null);
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
  const [turnChangeBannerTurns, setTurnChangeBannerTurns] = useState(null);
  const [pendingTurnBannerTurns, setPendingTurnBannerTurns] = useState(null);
  const prevDay8TurnKeyRef = useRef(null);
  /** 8日目：残りラウンド（room.remainingTurns）が減ったときにターン変更カットインを予約（ソロ・マルチ共通） */
  const prevDay8RemainingTurnsRef = useRef(null);
  const turnChangeBannerTimerRef = useRef(null);
  const turnChangeBannerDelayTimerRef = useRef(null);
  const pieceHoppingClearTimerRef = useRef(null);
  const [gameOverSplashMsg, setGameOverSplashMsg] = useState(null);
  const gameOverSplashTimerRef = useRef(null);

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
  const gs          = day7DailyOptimisticGs ?? roomGs;
  const playerSlots = roomData?.playerSlots ?? [];
  const isHost      = roomData?.hostId === myId;
  const day7DailyWritePending = day7DailyOptimisticGs != null;
  roomDataRef.current = roomData;
  const rawIsMyTurn =
    !!roomGs &&
    roomGs.players?.[roomGs.currentPlayerIdx]?.id === myId &&
    !day7DailyWritePending;
  const roomCompletedPlayers = normalizeCompletedPlayers(roomData?.completedPlayers);
  const myPlayerAlive = roomGs?.players?.find((p) => p.id === myId)?.alive !== false;
  const isMyDay8RoundCompleted =
    roomGs?.gamePhase === "playing" &&
    roomGs?.subPhase === "day8" &&
    !!myId &&
    myPlayerAlive &&
    roomCompletedPlayers.includes(myId);
  const isMyTurn = rawIsMyTurn && !isMyDay8RoundCompleted;
  const cpGs        = gs?.players?.[gs?.currentPlayerIdx] ?? null;
  const day8RemainingTurns =
    Number.isFinite(Number(roomData?.remainingTurns)) && Number(roomData?.remainingTurns) >= 0
      ? Math.floor(Number(roomData?.remainingTurns))
      : Math.max(0, BAL.dice.maxTurns - Number(cpGs?.moveTurns ?? 0));
  const gsRef       = useRef(roomGs);
  gsRef.current     = roomGs;
  const displayDice  = isDiceRolling ? localDice : (gs?.lastDiceRolls ?? []);
  const playingMain = gs?.gamePhase === "playing";
  /** gamePhase だけ欠けた古いスナップショットでも演出を出す */
  const isFinalBattleUIMode = gs?.gamePhase === "finalBattle" || gs?.subPhase === "finalBattle";
  const cpIsWaitingSlot = playingMain && gs?.subPhase === "day8" && cpGs?.movePhase === "waitingSlot";
  /** 手番が別プレイヤーでも、自分が goalLanding なら GOAL 確認 UI を出す */
  const goalLandingSelf =
    playingMain && gs?.subPhase === "day8" && myId
      ? gs.players?.find((pl) => pl.id === myId && pl.movePhase === "goalLanding") ?? null
      : null;
  const anyGoalLandingPlayer =
    playingMain && gs?.subPhase === "day8"
      ? gs.players?.find((pl) => pl.movePhase === "goalLanding") ?? null
      : null;
  const cpIsSlot     = playingMain && gs?.subPhase === "day8" && cpGs?.movePhase === "arrived";
  const slotPhase = gs?.slotPhase ?? "idle";
  const showSlotSpinBroadcastMirror =
    playingMain &&
    gs?.subPhase === "day8" &&
    (slotPhase === "spinning" || slotPhase === "completed") &&
    !(isMyTurn && cpIsSlot);
  const cpIsGhostPick = playingMain && gs?.subPhase === "day8" && isGhostPickTargetPhase(cpGs);
  const isDay8Moving =
    playingMain && gs?.subPhase === "day8" && cpGs?.movePhase === "moving" && cpGs?.alive !== false;
  const boardProgress = cpGs ? Math.min(100, (cpGs.position / BOARD_GOAL) * 100) : 0;
  const day8DiceRollCount = Array.isArray(gs?.lastDiceRolls) ? gs.lastDiceRolls.length : 0;
  const day8ActionLocked =
    isDiceRolling ||
    taxiPhase != null ||
    pieceHopping ||
    !!ponCutin ||
    !!sugorokuTileFxToast ||
    turnChangeBannerTurns != null ||
    pendingTurnBannerTurns != null;

  useEffect(() => {
    if (!gs || gs.gamePhase !== "playing" || gs.subPhase !== "day8" || !Array.isArray(gs.players)) {
      prevDay8TurnKeyRef.current = null;
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
      if (prevRem != null && remaining < prevRem) {
        setPendingTurnBannerTurns(Math.max(0, remaining));
      }
      return;
    }

    // ルームに remainingTurns が無い古いデータ用フォールバック（主にソロ想定）
    const idx = gs.currentPlayerIdx;
    if (!Number.isInteger(idx) || idx < 0 || idx >= gs.players.length) return;
    const p = gs.players[idx];
    const turnKey = `${idx}:${p?.id ?? ""}:${p?.moveTurns ?? -1}`;
    const prevKey = prevDay8TurnKeyRef.current;
    prevDay8TurnKeyRef.current = turnKey;
    if (prevKey == null || prevKey === turnKey) return;
    const [, , prevMoveTurnsRaw] = String(prevKey).split(":");
    const prevMoveTurns = Number(prevMoveTurnsRaw);
    const nowMoveTurns = Number(p?.moveTurns ?? 0);

    const isSoloTurnSwitch = Number.isFinite(prevMoveTurns) && nowMoveTurns > prevMoveTurns;
    if (!isSoloTurnSwitch) return;

    const turnsLeft = Math.max(0, BAL.dice.maxTurns - Number(p?.moveTurns ?? 0));
    setPendingTurnBannerTurns(turnsLeft);
  }, [gs?.gamePhase, gs?.subPhase, gs?.currentPlayerIdx, gs?.players, roomData?.remainingTurns]);

  useEffect(() => {
    if (pendingTurnBannerTurns == null) return;
    /** ラウンド開始後に表示（ゴール確認・幽霊標的選びも含む。移動ホップ中は pieceHopping で抑止） */
    const mp = cpGs?.movePhase;
    const bannerReadyMovePhase =
      mp === "moving" ||
      mp === "goalLanding" ||
      mp === "waitingSlot" ||
      mp === "arrived" ||
      mp === "ghostPickTarget";
    const turnStarted =
      gs?.gamePhase === "playing" && gs?.subPhase === "day8" && bannerReadyMovePhase;
    if (!turnStarted) return;
    const idleNow =
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
      !workPonHud;
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
    if (!gs || gs.gamePhase !== "playing") return false;
    const d = Number(gs.currentDay);
    return gs.subPhase === "daily" && d >= 1 && d <= LAST_DAILY_DAY;
  }, [screen, gs?.gamePhase, gs?.subPhase, gs?.currentDay]);

  const day8BgmShouldPlay = useMemo(() => {
    if (screen !== "playing") return false;
    if (!gs || gs.gamePhase !== "playing") return false;
    return gs.subPhase === "day8";
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
    if (!roomGs?.gamePhase) return;
    if (roomGs.gamePhase === "results"  && screen !== "results")  setScreen("results");
    if (roomGs.gamePhase === "gameOver" && screen !== "gameover" && !gameOverSplashMsg) {
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
      roomGs.gamePhase === "finalBattle" || roomGs.subPhase === "finalBattle";
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
    if (!isHost || !roomId || !roomGs || roomGs.gamePhase !== "finalBattle") return;
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
        if (!cur || cur.gamePhase !== "finalBattle") return;
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

  /** 7日目楽観状態は Firestore の最新ログ先頭と一致したら破棄 */
  useEffect(() => {
    if (!day7DailyOptimisticGs || !roomGs?.log?.length) return;
    if (roomGs.log[0] === day7DailyOptimisticGs.log[0]) {
      setDay7DailyOptimisticGs(null);
    }
  }, [roomGs, day7DailyOptimisticGs]);

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

  // ─── マルチ観戦側: タクシー演出同期（スナップ差分からローカル再生） ─────────────────
  useEffect(() => {
    const prev = prevRoomGsForTaxiSyncRef.current;
    prevRoomGsForTaxiSyncRef.current = roomGs;
    if (!roomGs || !prev) return;
    if (isMyTurn) return;
    if (taxiPhase != null) return;
    if (roomGs.gamePhase !== "playing" || roomGs.subPhase !== "day8") return;
    if (prev.gamePhase !== "playing" || prev.subPhase !== "day8") return;

    const prevIdx = prev.currentPlayerIdx;
    const roomIdx = roomGs.currentPlayerIdx;
    // 手番が変わったフレームでは「新しい手番の人」の lastMoveEvent（過去にタクシーを使った記録など）で誤検知し、
    // 次プレイヤーのターン開始時にタクシー drive が走ることがある。
    if (prevIdx !== roomIdx) return;

    const cur = roomGs.players?.[roomIdx];
    const prevCur = prev.players?.[prevIdx];
    if (!cur || !prevCur || cur.id !== prevCur.id) return;

    const moved = Math.abs((cur.position ?? 0) - (prevCur.position ?? 0)) > 0;
    const looksTaxi = String(cur.lastMoveEvent ?? "").includes("タクシー");
    if (!moved || !looksTaxi) return;

    const driveMs = computeTaxiDriveDurationMs(Math.abs((cur.position ?? 0) - (prevCur.position ?? 0)));
    taxiDriveDurationMsRef.current = driveMs;
    setTaxiDriveDurationMs(driveMs);
    setTaxiDriveEndPos(cur.position ?? null);
    setTaxiJamMidPos(null);
    taxiSecondLegMsRef.current = 0;
    setTaxiDriveActiveMs(driveMs);
    pendingTaxiCongestionRef.current = false;
    setTaxiDriveCongested(false);
    setTaxiPhase("drive");
  }, [roomGs, isMyTurn, taxiPhase]);

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

      let skipArriveForPendingTaxi = false;
      if (writeDriveDone && taxiGSRef.current) {
        const g = taxiGSRef.current;
        const cp = g.players[g.currentPlayerIdx];
        skipArriveForPendingTaxi = (cp?.pendingTaxiSteps ?? 0) > 0;
      }

      let taxiWriteOk = false;
      let writtenCurPlayerId = null;
      if (writeDriveDone) {
        const tgSnap = taxiGSRef.current;
        writtenCurPlayerId = tgSnap?.players?.[tgSnap.currentPlayerIdx]?.id ?? null;
        const followUp = taxiGSFollowUpRef.current;
        try {
          const tg = taxiGSRef.current;
          taxiWriteOk = await performGameStateUpdateRef.current(tg, "actorTurn");
        } catch (e) {
          setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        }
        taxiGSRef.current = null;
        taxiGSFollowUpRef.current = null;

        if (taxiWriteOk) {
          const applySugorokuToast = (toastPending) => {
            if (!toastPending?.lines?.length) return;
            if (sugorokuTileFxToastTimerRef.current) clearTimeout(sugorokuTileFxToastTimerRef.current);
            setSugorokuTileFxToast(toastPending);
            sugorokuTileFxToastTimerRef.current = setTimeout(() => {
              setSugorokuTileFxToast(null);
              sugorokuTileFxToastTimerRef.current = null;
            }, 2800);
          };

          if (followUp) {
            const ms = computeSugorokuHopDurationMs(followUp.fromPos, followUp.toPos);
            setTimeout(async () => {
              try {
                const fg = followUp.finalGS;
                await performGameStateUpdateRef.current(fg, "actorTurn");
                const toastPending = pendingSugorokuTileFxToastRef.current;
                pendingSugorokuTileFxToastRef.current = null;
                applySugorokuToast(toastPending);
              } catch (e) {
                setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
              }
            }, ms);
          } else {
            const toastPending = pendingSugorokuTileFxToastRef.current;
            pendingSugorokuTileFxToastRef.current = null;
            applySugorokuToast(toastPending);
          }
        }

        setShakeScreen(true);
        setTimeout(() => setShakeScreen(false), 500);
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
        pendingTaxiCongestionRef.current = false;
        setTaxiDriveCongested(false);
        setTaxiDriveEndPos(null);
        setTaxiJamMidPos(null);
      }
      setTaxiPhase(next);
    }, duration);
    return () => clearTimeout(t);
  }, [taxiPhase, roomId, taxiDriveActiveMs]);

  // ─── 1回休みの自動スキップ ───────────────────────────────────────────
  useEffect(() => {
    const liveGs = gsRef.current;
    if (!isMyTurn || !liveGs || liveGs.subPhase !== "day8" || liveGs.gamePhase !== "playing") return;
    const idx = liveGs.currentPlayerIdx;
    const p = liveGs.players?.[idx];
    if (!p || p.skipTurns <= 0 || p.movePhase !== "moving") return;
    if ((p.pendingTaxiSteps ?? 0) > 0) return;
    const newPlayers = liveGs.players.map((pl, i) =>
      i === idx ? { ...pl, skipTurns: pl.skipTurns - 1 } : pl,
    );
    const logs = [`💤 ${p.name} 1回休み（炎上の巻き添え）`];
    void performGameStateUpdateRef.current?.(computeAdvanceDay8Turn(liveGs, newPlayers, logs), "actorTurn");
  }, [isMyTurn, gs?.currentPlayerIdx]);

  /** PON用オーバーライド解除：Firestore の自分の position が表示マスに追いついた後だけ null にする（解除が早いと古いマスへ戻り二次ホップする） */
  useEffect(() => {
    if (typeof boardViewPosOverride !== "number" || !roomGs || !myId) return;
    const mine = roomGs.players?.find((pl) => pl.id === myId);
    if (mine && mine.position === boardViewPosOverride) {
      setBoardViewPosOverride(null);
    }
  }, [roomGs, boardViewPosOverride, myId]);

  // ─── Firestore gameState 書き込み（手番ガード／ホスト決戦進行） ─────────────────
  const performGameStateUpdate = useCallback(
    async (newGS, writeMode = "actorTurn", authCtx = {}) => {
      const { gameState: authGOverride, roomData: authRdOverride, setStatus } = authCtx;
      const authG = authGOverride ?? gsRef.current;
      const authRd = authRdOverride ?? roomDataRef.current;
      if (writeMode === "actorTurn") {
        if (!isActorTurnOnGameState(authG, myId)) {
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
      }
      try {
        if (
          (writeMode === "actorTurn" || writeMode === "goalLandingConfirm") &&
          roomId &&
          authG?.gamePhase === "playing" &&
          authG?.subPhase === "day8"
        ) {
          const ref = doc(db, "rooms", roomId);
          await runTransaction(db, async (transaction) => {
            const snap = await transaction.get(ref);
            if (!snap.exists()) throw new Error("ROOM_MISSING");
            const liveRoom = snap.data();
            const liveGs = liveRoom?.gameState;
            if (writeMode === "goalLandingConfirm") {
              if (!canWriteGoalLandingConfirm(liveGs, myId)) throw new Error("GOAL_CONFIRM_DENIED");
            } else if (!isActorTurnOnGameState(liveGs, myId)) {
              throw new Error("TURN_CHANGED");
            }
            const tracked = applyDay8RoundTracking(liveRoom, newGS, myId);
            const updates = {
              gameState: tracked.gameState,
              remainingTurns: tracked.remainingTurns,
              completedPlayers: tracked.completedPlayers,
            };
            if (typeof setStatus === "string") updates.status = setStatus;
            else if (tracked.gameState.gamePhase === "finalBattle") updates.status = "FINAL_BATTLE";
            else if (tracked.gameState.gamePhase === "results") updates.status = "completed";
            transaction.update(ref, updates);
          });
          return true;
        }
        const updates = { gameState: newGS };
        if (typeof setStatus === "string") updates.status = setStatus;
        else if (newGS.gamePhase === "finalBattle") updates.status = "FINAL_BATTLE";
        else if (newGS.gamePhase === "results") updates.status = "completed";
        await updateRoom(updates);
        return true;
      } catch (e) {
        setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        return false;
      }
    },
    [updateRoom, myId, roomId],
  );
  performGameStateUpdateRef.current = performGameStateUpdate;

  const writeGS = async (newGS) => performGameStateUpdate(newGS, "actorTurn");

  const writeGoalLandingConfirm = async (newGS) => performGameStateUpdate(newGS, "goalLandingConfirm");

  ponCutinFinalizeRef.current = async () => {
    const pending = ponCutinCommitRef.current;
    ponCutinCommitRef.current = null;
    ponHopGateRef.current = false;
    setPonHopCompleteEnabled(false);
    setPonCutin(null);
    const tileToast = pending?.tileFxToast ?? null;
    // boardViewPosOverride は書き込み反映まで維持（先に null にすると viewPos が旧マスに戻り、同期後に再度ホップする）
    if (pending?.nextGS) {
      try {
        if (pending.intermediateGS && pending.tileSlideToPos != null) {
          const midGS = pending.intermediateGS;
          const okMid = await performGameStateUpdate(midGS, "actorTurn");
          if (!okMid) {
            setBoardViewPosOverride(null);
            setIsDiceRolling(false);
            return;
          }

          setBoardViewPosOverride(pending.tileSlideToPos);
          await new Promise((r) =>
            setTimeout(r, computeSugorokuHopDurationMs(pending.tileSlideFromPos ?? pending.tileSlideToPos, pending.tileSlideToPos)),
          );
        }

        const newGS = pending.nextGS;
        const okFin = await performGameStateUpdate(newGS, "actorTurn");
        if (!okFin) {
          setBoardViewPosOverride(null);
          setIsDiceRolling(false);
          return;
        }
        if (tileToast?.lines?.length) {
          if (sugorokuTileFxToastTimerRef.current) clearTimeout(sugorokuTileFxToastTimerRef.current);
          setSugorokuTileFxToast(tileToast);
          sugorokuTileFxToastTimerRef.current = setTimeout(() => {
            setSugorokuTileFxToast(null);
            sugorokuTileFxToastTimerRef.current = null;
          }, 2800);
        }
      } catch (e) {
        setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。"));
        setBoardViewPosOverride(null);
        setIsDiceRolling(false);
        if (ponTileSlideTimerRef.current) {
          clearTimeout(ponTileSlideTimerRef.current);
          ponTileSlideTimerRef.current = null;
        }
        return;
      }
    }
    setIsDiceRolling(false);
  };

  const handleSugorokuHopComplete = useCallback(() => {
    if (!ponHopGateRef.current) return;
    ponHopGateRef.current = false;
    setPonHopCompleteEnabled(false);
    const pending = ponCutinCommitRef.current;
    if (!pending?.nextGS) return;
    setPonCutin({ characterType: pending.characterType ?? "salaryman" });
  }, []);

  const commitPendingGameState = useCallback(
    async (pending) => {
      await performGameStateUpdate(pending, "actorTurn");
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
          const tracked = applyDay8RoundTracking(snap.data(), next, myId);
          const updates = {
            gameState: tracked.gameState,
            remainingTurns: tracked.remainingTurns,
            completedPlayers: tracked.completedPlayers,
          };
          if (tracked.gameState.gamePhase === "finalBattle") updates.status = "FINAL_BATTLE";
          if (tracked.gameState.gamePhase === "results") updates.status = "completed";
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

  // ─── ロビー操作 ──────────────────────────────────────────────────────
  const handleCreateRoom = async () => {
    const useName = myName.trim() || genQuickName();
    if (!myName.trim()) setMyName(useName);
    const useFullId = `${useName}#${myTag}`;
    setLoading(true); setUiError("");
    try {
      const rid = genRoomId();
      await createRoom(rid, {
        hostId: myId,
        status: "lobby",
        playerSlots: [{ id: myId, name: useName, fullId: useFullId }],
        playerIds: [myId],
        completedPlayers: [],
        remainingTurns: BAL.dice.maxTurns,
        gameState: null,
        isPrivate: isPrivateRoom,
        allowedPlayers: isPrivateRoom ? [useFullId] : [],
        acceptQuickMatch: !isPrivateRoom && allowQuickMatch,
        createdAt: new Date().toISOString(),
      });
      setRoomId(rid);
      setWaitingSessionKey((n) => n + 1);
      setScreen("waiting");
    } catch (e) { setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。")); }
    setLoading(false);
  };

  const handleJoinRoom = async () => {
    if (!joinInput.trim()) { setUiError("ルームIDを入力してください"); return; }
    const useName = myName.trim() || genQuickName();
    if (!myName.trim()) setMyName(useName);
    const useFullId = `${useName}#${myTag}`;
    setLoading(true); setUiError("");
    try {
      const rid  = joinInput.trim().toUpperCase();
      const snap = await fetchRoom(rid);
      if (!snap.exists())                  { setUiError("ルームが見つかりません"); setLoading(false); return; }
      const data = snap.data();
      if (data.status !== "lobby")         { setUiError("このルームはすでに開始されています"); setLoading(false); return; }
      if (data.playerSlots.length >= 4)    { setUiError("ルームが満員です"); setLoading(false); return; }
      // 招待制チェック
      if (data.isPrivate && !data.allowedPlayers?.includes(useFullId)) {
        setUiError(`招待されていません。ホストに「${useFullId}」を共有して招待してもらってください`);
        setLoading(false);
        return;
      }
      if (!data.playerSlots.find(s => s.id === myId)) {
        await updateRoomById(rid, {
          playerSlots: arrayUnion({ id: myId, name: useName, fullId: useFullId }),
          playerIds:   arrayUnion(myId),
        });
      }
      setRoomId(rid);
      setWaitingSessionKey((n) => n + 1);
      setScreen("waiting");
    } catch (e) { setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。")); }
    setLoading(false);
  };

  const handleStartGame = async () => {
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
        const initGS = initialGameState(slots);
        tx.update(ref, {
          status: "playing",
          gameState: initGS,
          completedPlayers: [],
          remainingTurns: BAL.dice.maxTurns,
        });
      });
    } catch (e) {
      const code = e?.message;
      if (code === "ALREADY_STARTED") setUiError("このルームはすでに開始されています。");
      else if (code === "NOT_HOST") setUiError("ホストのみがゲームを開始できます。");
      else if (code === "ROOM_MISSING") setUiError("ルームが見つかりません。");
      else if (code === "NO_PLAYERS" || code === "MISSING_CHAR" || code === "MISSING_ROLLS") {
        setUiError("開始条件を満たしていません。全員のキャラとステータス抽選を確認してください。");
      } else {
        setUiError(formatFriendlyError(e, "ゲーム開始に失敗しました。しばらくしてから再度お試しください。"));
      }
    }
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
        const next = { ...s, initialRolls: payload };
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
        let next = { ...s, character: charKey };
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
    setScreen("lobby"); setRoomId(null); setUiError("");
  };

  // ─── クイックマッチ ──────────────────────────────────────────────────
  const handleQuickMatch = async () => {
    setLoading(true); setUiError("");

    // 名前が未入力ならランダム生成
    const useName = myName.trim() || genQuickName();
    if (!myName.trim()) setMyName(useName);
    const useFullId = `${useName}#${myTag}`;

    try {
      // 公開 & lobby 状態のルームを最大10件取得してクライアントでフィルタ
      const q    = query(collection(db, "rooms"), where("status", "==", "lobby"), limit(10));
      const snap = await getDocs(q);
      const available = snap.docs.find(d => {
        const data = d.data();
        return !data.isPrivate && data.acceptQuickMatch !== false && (data.playerSlots?.length ?? 0) < 4;
      });

      if (available) {
        // ── 既存ルームに参加 ──
        const rid  = available.id;
        const data = available.data();
        if (!data.playerSlots.find(s => s.id === myId)) {
          await updateRoomById(rid, {
            playerSlots: arrayUnion({ id: myId, name: useName, fullId: useFullId }),
            playerIds:   arrayUnion(myId),
          });
        }
        setRoomId(rid);
        setWaitingSessionKey((n) => n + 1);
        setScreen("waiting");
      } else {
        // ── 新規ルーム作成（公開） ──
        const rid = genRoomId();
        await createRoom(rid, {
          hostId: myId,
          status: "lobby",
          playerSlots: [{ id: myId, name: useName, fullId: useFullId }],
          playerIds: [myId],
          completedPlayers: [],
          remainingTurns: BAL.dice.maxTurns,
          gameState: null,
          isPrivate: false,
          allowedPlayers: [],
          createdAt: new Date().toISOString(),
        });
        setRoomId(rid);
        setWaitingSessionKey((n) => n + 1);
        setScreen("waiting");
      }
    } catch (e) { setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。")); }
    setLoading(false);
  };

  // ─── 招待（ホワイトリスト）追加 ──────────────────────────────────────
  const handleInvitePlayer = async () => {
    const inv = inviteInput.trim();
    if (!inv || !inv.match(/^.+#\d{4}$/)) { setInviteError("「Name#ID」の形式（例: 闇月リリム#1234）で入力してください。# を含めた全文を入力してください"); return; }
    if (roomData?.allowedPlayers?.includes(inv)) { setInviteError("すでに招待済みです"); return; }
    try {
      await updateRoom({ allowedPlayers: arrayUnion(inv) });
      setInviteInput(""); setInviteError("");
    } catch (e) { setInviteError(formatFriendlyError(e, "招待の追加に失敗しました。しばらくしてから再度お試しください。")); }
  };

  // ─── 自分のIDをクリップボードにコピー ──────────────────────────────
  const handleCopyMyId = () => {
    if (!myFullId) return;
    navigator.clipboard.writeText(myFullId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ─── エントリー確定（名前確定→モード選択へ） ─────────────────────
  const handleConfirmEntry = () => {
    const useName = myName.trim() || genQuickName();
    if (!myName.trim()) setMyName(useName);
    setMultiOpen(false);
    setMultiAction(null);
    setUiError("");
    setScreen("lobby");
  };

  // ─── ひとりで遊ぶ（ソロプレイ） ──────────────────────────────────
  const handleSoloPlay = async () => {
    const useName = myName.trim() || genQuickName();
    if (!myName.trim()) setMyName(useName);
    const useFullId = `${useName}#${myTag}`;
    setLoading(true); setUiError("");
    try {
      const rid = genRoomId();
      await createRoom(rid, {
        hostId: myId,
        status: "lobby",
        playerSlots: [{ id: myId, name: useName, fullId: useFullId }],
        playerIds: [myId],
        completedPlayers: [],
        remainingTurns: BAL.dice.maxTurns,
        gameState: null,
        isPrivate: true,
        isSolo: true,
        allowedPlayers: [useFullId],
        acceptQuickMatch: false,
        createdAt: new Date().toISOString(),
      });
      setRoomId(rid);
      setWaitingSessionKey((n) => n + 1);
      setScreen("waiting");
    } catch (e) { setUiError(formatFriendlyError(e, "一人プレイ用のルームを作成できませんでした。ネットワークを確認のうえ、再度お試しください。")); }
    setLoading(false);
  };

  const handleCheckInvites = async () => {
    if (!myFullId) return;
    setLoading(true); setUiError("");
    try {
      const q    = query(
        collection(db, "rooms"),
        where("status", "==", "lobby"),
        where("allowedPlayers", "array-contains", myFullId),
        limit(5)
      );
      const snap = await getDocs(q);
      const available = snap.docs.find(d => {
        const data = d.data();
        return (data.playerSlots?.length ?? 0) < 4 &&
               !data.playerSlots?.find(s => s.id === myId);
      });
      if (!available) {
        setUiError("招待されているルームが見つかりませんでした");
        setLoading(false);
        return;
      }
      const rid      = available.id;
      const useName  = myName.trim();
      await updateRoomById(rid, {
        playerSlots: arrayUnion({ id: myId, name: useName, fullId: myFullId }),
        playerIds:   arrayUnion(myId),
      });
      setRoomId(rid);
      setWaitingSessionKey((n) => n + 1);
      setScreen("waiting");
    } catch (e) { setUiError(formatFriendlyError(e, "処理に失敗しました。しばらくしてから再度お試しください。")); }
    setLoading(false);
  };

  /** ゴール直後ターン終了 → waitingSlot（または権利0ならその場で終了処理）へ */
  const handleGoalLandingConfirm = async () => {
    if (!gs || !myId) return;
    const nextGs = applyGoalLandingConfirm(gs, myId);
    if (!nextGs) return;
    await writeGoalLandingConfirm(nextGs);
  };

  /** 権利適用済みステータスでスロット筐体へ移行（この時点のアイテム・効果後の運・技量が反映される） */
  const handleBeginSlotPhase = async () => {
    if (!gs || !isMyTurn) return;
    const p = gs.players[gs.currentPlayerIdx];
    if (p.movePhase !== "waitingSlot") return;
    const r = p.reservedSlotTurns ?? 0;
    if (r <= 0) return;
    const pulls = Math.max(0, r * BAL.dice.slotsPerSugorokuTurn);
    const logs = [`${p.name}: スロット開始（${r}ターンブン・計${pulls}回）`];
    const newPlayers = gs.players.map((pl, i) =>
      i !== gs.currentPlayerIdx
        ? pl
        : { ...pl, movePhase: "arrived", slotTurnsLeft: pulls, reservedSlotTurns: 0, slotPullsGranted: pulls, slotPullsThisSeat: 0 },
    );
    await writeGS({ ...gs, players: newPlayers, log: prependLogs(logs, gs.log) });
  };

  const autoBeginWaitingSlotRef = useRef(false);
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

  const [dailySlotOpen, setDailySlotOpen] = useState(false);

  const handleOpenDailySlot = () => {
    if (!isMyTurn || !roomGs || roomGs.subPhase !== "daily") return;
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
    if (!p || p.stats.money < BAL.dailySlot.spinBet * BAL.dailySlot.spins) return;
    setDailySlotOpen(true);
  };

  const finalizeDailySlotTraining = useCallback(
    async (spinResults) => {
      const g = gsRef.current;
      if (!g || g.subPhase !== "daily") return;
      try {
        await updateCurrentAction("dailySlot");
      } catch (_) {}
      const idx = g.currentPlayerIdx;
      const p = g.players[idx];
      let s = { ...p.stats };
      const logs = [];
      const virtueBefore = s.virtue;
      const char = CHARACTERS[p.characterType] ?? CHARACTERS.salaryman;
      const ponMultiplier = char.ponMultiplier;
      let streamMult = p.streamMultiplier ?? char.streamMultiplier;
      let newAmulets = p.amulets ?? 0;

      if (newAmulets > 0) {
        const luckBonus = newAmulets * 2;
        s.luck = clamp(s.luck + luckBonus);
        logs.push(`🧿 お守り効果（${newAmulets}個）: 運+${luckBonus}→${s.luck}`);
      }

      const ds = BAL.dailySlot;
      if (!Array.isArray(spinResults) || spinResults.length !== ds.spins) {
        setUiError("デイリースロットの結果データが不正です");
        return;
      }

      logs.push(
        `${p.name} ${g.currentDay}日目【デイリースロット・技能練習】${spinResults.length}回（各${ds.spinBet}Gベット／8日目スロットと同じ役配当テーブル）`,
      );

      const slotPityCounter =
        typeof spinResults[spinResults.length - 1]?.pityCounterAfter === "number"
          ? spinResults[spinResults.length - 1].pityCounterAfter
          : (p.slotPityCounter ?? 0);

      let totalNet = 0;
      spinResults.forEach((res, i) => {
        const betAmt = Number(res?.bet ?? ds.spinBet);
        const pay = Number(res?.payout ?? 0);
        const net = pay - betAmt;
        totalNet += net;
        s.money = clampMoney(s.money - betAmt + pay);
        const skBase = ds.skillGainEverySpin;
        const skRole = res?.tier && res.tier !== "miss" ? ds.skillGainOnRole : 0;
        s.skill = clamp(s.skill + skBase + skRole);
        logs.push(
          `  ${i + 1}回目 [${betAmt}G]: ${res?.message ?? "？"} / 収支${net >= 0 ? "+" : ""}${net}G → 資金${s.money}G・技量${s.skill}（本回練習+${skBase}${skRole ? `・役ボ+${skRole}` : ""}）`,
        );
      });
      logs.push(`  デイリースロット収支計 ${totalNet >= 0 ? "+" : ""}${totalNet}G`);

      const actionType = "dailySlot";

      if (g.subPhase === "daily") {
        const lc = livingCostForPlayer(p);
        s.money = clampMoney(s.money - lc);
        logs.push(`  生活費 -${lc}G → 資金 ${s.money}G${s.money < 0 ? " 【借金中】" : ""}`);
      }

      const ponGain = Math.ceil(BAL.pon.dailyGain * ponMultiplier);
      const ponBefore = s.pon;
      s.pon = clamp(s.pon + ponGain);
      logs.push(`  PON: ${ponBefore} +${ponGain}${ponMultiplier !== 1 ? `(×${ponMultiplier})` : ""} → ${s.pon}`);

      let ponEvent = null;
      let newStreamMult = streamMult;
      const penMoneyMul = char.ponFireMoneyPenaltyMultiplier ?? 1;
      if (s.pon >= BAL.pon.fireThreshold && Math.random() < s.pon / 100) {
        const ponBefore2 = s.pon;
        if (actionType === "stream") {
          const gain = rand(BAL.pon.stream.moneyMin, BAL.pon.stream.moneyMax);
          s.money = clampMoney(s.money + gain);
          s.skill = clamp(s.skill - BAL.pon.stream.skillLoss, 0);
          ponEvent = `🔥 失言がバズった！資金+${gain}G / 技量-${BAL.pon.stream.skillLoss}`;
          if (p.characterType === "vtuber") {
            newStreamMult = +(streamMult + 0.5).toFixed(1);
            ponEvent += ` / 🎭リリム効果：配信倍率 ×${streamMult.toFixed(1)}→×${newStreamMult.toFixed(1)}（永続UP！）`;
          }
        } else if (actionType === "shrine") {
          const pen = Math.max(1, Math.round(rand(50, 150) * penMoneyMul));
          s.money = clampMoney(s.money - pen);
          ponEvent = `⚠️ ご神域で粗相をしてしまった！資金-${pen}G`;
        } else {
          const pen = Math.max(
            1,
            Math.round(rand(BAL.pon.work.penaltyMin, BAL.pon.work.penaltyMax) * penMoneyMul),
          );
          s.money = clampMoney(s.money - pen);
          ponEvent = `⚠️ 弁償！資金-${pen}G`;
        }
        s.pon = Math.floor(ponBefore2 / 2);
        logs.push(`  [PON発火 ${ponBefore2}%] ${ponEvent} / PON→半減→${s.pon}`);
      } else {
        logs.push(
          `  PON発火なし（${s.pon >= BAL.pon.fireThreshold ? `${s.pon}%判定ハズレ` : `閾値${BAL.pon.fireThreshold}まであと${BAL.pon.fireThreshold - s.pon}`}）`,
        );
      }

      let newPlayers = g.players.map((pl, i) =>
        i === idx
          ? { ...pl, stats: s, streamMultiplier: newStreamMult, amulets: newAmulets, slotPityCounter }
          : pl,
      );

      newPlayers = applyVirtueWave(p, virtueBefore, s.virtue, newPlayers, logs);

      if (ponEvent && actionType === "stream" && g.subPhase === "day8") {
        newPlayers = applySplashDamage(idx, newPlayers, logs);
      }

      if (g.subPhase === "daily") {
        newPlayers = newPlayers.map((pl, i) => (i !== idx ? pl : applyRimiruDailyEnd(pl, logs)));
      }

      if (ponEvent && actionType === "stream") {
        setShakeScreen(true);
        setTimeout(() => setShakeScreen(false), 500);
      }

      const baseGs = { ...g, recentPonEvent: ponEvent ? { player: p.name, msg: ponEvent } : null };
      const nextGs = computeAdvanceDaily(baseGs, newPlayers, logs);
      const advancesToSugoroku =
        g.currentDay === LAST_DAILY_DAY && idx === g.players.length - 1;
      if (g.currentDay === LAST_DAILY_DAY && g.subPhase === "daily") {
        setDay7DailyOptimisticGs(buildDay7DailyOptimisticGs(nextGs, g, advancesToSugoroku));
      }
      if (advancesToSugoroku) {
        await new Promise((r) => setTimeout(r, FINAL_BATTLE_SPLASH_MS));
      }
      const ok = await writeGS(nextGs);
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
    const logs = [];

    /** 日常「配信」オーバーレイ順序（handleDailyAction 末尾でキュー実行） */
    let streamRollFailed = false;
    let deferStreamPonOverlay = false;
    let deferWorkPonOverlay = false;
    let workIncomeForHud = 0;
    let livingCostForHud = 0;
    let workPenaltyForHud = 0;

    const virtueBefore = s.virtue; // 善行波及用（行動前）

    // ─ キャラクター固有倍率を取得
    const char          = CHARACTERS[p.characterType] ?? CHARACTERS.salaryman;
    const ponMultiplier = char.ponMultiplier;
    let   streamMult    = p.streamMultiplier ?? char.streamMultiplier; // 可変（vtuber大炎上で上昇）

    // ─ お守り効果（ターン開始時：所持数×2 だけ運が上昇）
    let newAmulets = p.amulets ?? 0;
    if (newAmulets > 0) {
      const luckBonus = newAmulets * 2;
      s.luck = clamp(s.luck + luckBonus);
      logs.push(`🧿 お守り効果（${newAmulets}個）: 運+${luckBonus}→${s.luck}`);
    }

    if (actionType === "shrine") {
      const sh = BAL.shrine;
      const virtueBeforeShrine = s.virtue;
      s.money  = clampMoney(s.money - sh.cost);
      s.luck    = clamp(s.luck   + sh.luckGain);
      s.virtue  = clamp(s.virtue + sh.virtueGain);
      s.pon     = Math.max(0, s.pon - sh.ponReduce);
      logs.push(`${p.name} ${gs.currentDay}日目【神社】二礼二拍手一礼。運気が上がった気がする！ -${sh.cost}G / 運+${sh.luckGain}→${s.luck} / 善行+${sh.virtueGain}→${s.virtue} / PON-${sh.ponReduce}→${s.pon}`);
      const amuletP = shrineAmuletDropChance(virtueBeforeShrine, sh.amuletBaseRate ?? 0.2);
      if (Math.random() < amuletP) {
        newAmulets++;
        logs.push(`  🧿 お守りを入手した！（計${newAmulets}個／善行${virtueBeforeShrine}・抽選${(amuletP * 100).toFixed(0)}%）`);
      }
      // 神社カットイン演出（自分のターンのみ）
      setShrinePhase("in");
      setTimeout(() => setShrinePhase("out"), 1700);
      setTimeout(() => setShrinePhase(null),  2700);
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

      const workBonus = char.workRewardBonus ?? 0;
      const wm = char.workRewardMultiplier ?? 1;
      const workBase = Math.floor((BAL.work.reward + workBonus) * wm);
      const vim = virtueIncomeMult(s.virtue);
      const workTotal = applyVirtueIncomeBoost(workBase, s.virtue);
      const workVirtueGain = BAL.work.virtueGain;
      s.money  = clampMoney(s.money  + workTotal);
      s.virtue = clamp(s.virtue + workVirtueGain);
      setWorkCutin({
        gold: workTotal,
        stat: workVirtueGain ? { label: "善行", delta: workVirtueGain } : null,
        characterType: p.characterType,
      });
      workCutinTimerRef.current = window.setTimeout(() => {
        setWorkCutin(null);
        workCutinTimerRef.current = null;
      }, 2000);
      logs.push(
        `${p.name} ${gs.currentDay}日目【仕事】資金+${workTotal}G${workBonus ? `（査定+${workBonus}G込み・×${wm}）` : wm !== 1 ? `（×${wm}）` : ""}・善行収入×${vim.toFixed(2)}（ベース${workBase}G） / 善行+${workVirtueGain}→${s.virtue}`,
      );
      workIncomeForHud = workTotal;
    } else if (actionType === "stream") {
      streamFxChainTimeoutsRef.current.forEach(clearTimeout);
      streamFxChainTimeoutsRef.current = [];

      const streamType = Math.random() < 0.5 ? "chat" : "game";
      const streamLabel = streamType === "chat" ? "雑談配信" : "ゲーム配信";

      if (streamCutinTimerRef.current) {
        clearTimeout(streamCutinTimerRef.current);
        streamCutinTimerRef.current = null;
      }

      const streamSkillLuck = s.skill + s.luck;
      const failRate =
        streamSkillLuck > BAL.stream.combinedStatNoFailThreshold
          ? 0
          : Math.max(
            0,
            BAL.stream.baseFailRate -
              (streamSkillLuck / BAL.stream.combinedStatNoFailThreshold) * BAL.stream.baseFailRate
          );
      const failed = Math.random() < failRate;
      streamRollFailed = failed;
      let streamCutinGold = 0;
      let streamCutinStat = null;
      if (failed) {
        const baseReward = BAL.stream.successMin;
        const streamBaseMoney = Math.round(baseReward * streamMult);
        const vimS = virtueIncomeMult(s.virtue);
        const delta = applyVirtueIncomeBoost(streamBaseMoney, s.virtue);
        streamCutinGold = delta;
        s.money = clampMoney(s.money + delta);
        logs.push(
          `${p.name} ${gs.currentDay}日目【${streamLabel}】💥失敗（最低収入） 資金+${delta}G（成功時下限${BAL.stream.successMin}G×配信×${streamMult.toFixed(1)}・善行収入×${vimS.toFixed(2)}・基準${streamBaseMoney}G）/ 善行・技量ボーナスなし (失敗率${(failRate * 100).toFixed(0)}%)`,
        );
      } else {
        const baseReward = rand(BAL.stream.successMin, BAL.stream.successMax);
        const streamBaseMoney = Math.round(baseReward * streamMult);
        const vimS = virtueIncomeMult(s.virtue);
        const delta = applyVirtueIncomeBoost(streamBaseMoney, s.virtue);
        streamCutinGold = delta;
        s.money = clampMoney(s.money + delta);
        if (streamType === "chat") {
          const vg = rand(BAL.stream.chat.virtueGainMin, BAL.stream.chat.virtueGainMax);
          s.virtue = clamp(s.virtue + vg);
          streamCutinStat = vg ? { label: "善行", delta: vg } : null;
          logs.push(`${p.name} ${gs.currentDay}日目【${streamLabel}】✨成功 資金+${delta}G（配信×${streamMult.toFixed(1)}・善行収入×${vimS.toFixed(2)}・基準${streamBaseMoney}G） / 善行+${vg}→${s.virtue} (失敗率${(failRate * 100).toFixed(0)}%)`);
        } else {
          const sg = rand(BAL.stream.game.skillGainMin, BAL.stream.game.skillGainMax);
          s.skill  = clamp(s.skill + sg);
          streamCutinStat = sg ? { label: "技量", delta: sg } : null;
          logs.push(`${p.name} ${gs.currentDay}日目【${streamLabel}】✨成功 資金+${delta}G（配信×${streamMult.toFixed(1)}・善行収入×${vimS.toFixed(2)}・基準${streamBaseMoney}G） / 技量+${sg}→${s.skill} (失敗率${(failRate * 100).toFixed(0)}%)`);
        }
      }
      setStreamTypeCutin({
        mode: streamType,
        gold: streamCutinGold,
        stat: streamCutinStat,
      });
      streamCutinTimerRef.current = setTimeout(() => {
        setStreamTypeCutin(null);
        streamCutinTimerRef.current = null;
      }, 2000);
    } else {
      return;
    }

    // ─ 生活費（1〜7日目毎日）：マイナスになっても借金として続行
    if (gs.subPhase === "daily") {
      const lc = livingCostForPlayer(p);
      s.money = clampMoney(s.money - lc);
      logs.push(`  生活費 -${lc}G → 資金 ${s.money}G${s.money < 0 ? " 【借金中】" : ""}`);
      if (actionType === "work") livingCostForHud = lc;
    }

    // ─ PON蓄積（キャラ倍率あり）
    const ponGain = Math.ceil(BAL.pon.dailyGain * ponMultiplier);
    const ponBefore = s.pon;
    s.pon = clamp(s.pon + ponGain);
    logs.push(`  PON: ${ponBefore} +${ponGain}${ponMultiplier !== 1 ? `(×${ponMultiplier})` : ""} → ${s.pon}`);

    let ponEvent    = null;
    let newStreamMult = streamMult; // vtuber大炎上で更新される
    const penMoneyMul = char.ponFireMoneyPenaltyMultiplier ?? 1;
    if (s.pon >= BAL.pon.fireThreshold && Math.random() < s.pon / 100) {
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
      } else if (actionType === "shrine") {
        const pen = Math.max(1, Math.round(rand(50, 150) * penMoneyMul));
        s.money = clampMoney(s.money - pen);
        ponEvent = `⚠️ ご神域で粗相をしてしまった！資金-${pen}G`;
      } else {
        const pen = Math.max(
          1,
          Math.round(rand(BAL.pon.work.penaltyMin, BAL.pon.work.penaltyMax) * penMoneyMul),
        );
        s.money = clampMoney(s.money - pen);
        ponEvent = `⚠️ 弁償！資金-${pen}G`;
        if (actionType === "work") {
          deferWorkPonOverlay = true;
          workPenaltyForHud = pen;
        }
      }
      s.pon = Math.floor(ponBefore2 / 2);
      logs.push(`  [PON発火 ${ponBefore2}%] ${ponEvent} / PON→半減→${s.pon}`);
    } else {
      logs.push(`  PON発火なし（${s.pon >= BAL.pon.fireThreshold ? `${s.pon}%判定ハズレ` : `閾値${BAL.pon.fireThreshold}まであと${BAL.pon.fireThreshold - s.pon}`}）`);
    }

    // 配信：カットイン終了後 → PON発火（時）→ 失敗（時）の順でオーバーレイを並べる
    if (actionType === "stream") {
      const STREAM_CUTIN_TOTAL_MS = 2000;
      const STREAM_PON_OVERLAY_MS = 3300;
      const STREAM_FAIL_HOLD_MS = 3200;
      streamFxChainTimeoutsRef.current.forEach(clearTimeout);
      streamFxChainTimeoutsRef.current = [];
      let overlayCursorMs = STREAM_CUTIN_TOTAL_MS;
      if (deferStreamPonOverlay) {
        const idPon = window.setTimeout(() => {
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
          }, STREAM_PON_OVERLAY_MS);
        }, overlayCursorMs);
        streamFxChainTimeoutsRef.current.push(idPon);
        overlayCursorMs += STREAM_PON_OVERLAY_MS;
      }
      if (streamRollFailed) {
        const idFail = window.setTimeout(() => {
          setStreamFailOverlay(true);
          try {
            soundRef.current?.playStreamFailGaan?.();
          } catch (_) {}
          if (streamFailOverlayTimerRef.current) clearTimeout(streamFailOverlayTimerRef.current);
          streamFailOverlayTimerRef.current = window.setTimeout(() => {
            setStreamFailOverlay(false);
            streamFailOverlayTimerRef.current = null;
          }, STREAM_FAIL_HOLD_MS);
        }, overlayCursorMs);
        streamFxChainTimeoutsRef.current.push(idFail);
      }
    }

    if (actionType === "work") {
      const WORK_CUTIN_TOTAL_MS = 2000;
      const WORK_PON_OVERLAY_MS = 3100;
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
          setWorkPonHud(hudPayload);
          try {
            soundRef.current?.playWorkPonPlateBreak?.();
          } catch (_) {}
          if (workPonFireOverlayTimerRef.current) clearTimeout(workPonFireOverlayTimerRef.current);
          workPonFireOverlayTimerRef.current = window.setTimeout(() => {
            setWorkPonHud(null);
            workPonFireOverlayTimerRef.current = null;
          }, WORK_PON_OVERLAY_MS);
        }, WORK_CUTIN_TOTAL_MS);
        workFxChainTimeoutsRef.current.push(idWorkPon);
      }
    }

    let newPlayers = gs.players.map((pl, i) =>
      i === gs.currentPlayerIdx ? { ...pl, stats: s, streamMultiplier: newStreamMult, amulets: newAmulets } : pl
    );

    // 善行波及チェック（仕事・雑談配信で善行閾値を超えた場合）
    newPlayers = applyVirtueWave(p, virtueBefore, s.virtue, newPlayers, logs);

    // 大炎上巻き添えチェック（Day8中のみ、位置情報が有効な場合）
    if (ponEvent && actionType === "stream" && gs.subPhase === "day8") {
      newPlayers = applySplashDamage(gs.currentPlayerIdx, newPlayers, logs);
    }

    if (gs.subPhase === "daily") {
      const idx = gs.currentPlayerIdx;
      newPlayers = newPlayers.map((pl, i) => (i !== idx ? pl : applyRimiruDailyEnd(pl, logs)));
    }

    const baseGs = { ...gs, recentPonEvent: ponEvent ? { player: p.name, msg: ponEvent } : null };
    const nextGs = computeAdvanceDaily(baseGs, newPlayers, logs);
    const advancesToSugoroku =
      gs.currentDay === LAST_DAILY_DAY && gs.currentPlayerIdx === gs.players.length - 1;
    if (gs.currentDay === LAST_DAILY_DAY && gs.subPhase === "daily") {
      setDay7DailyOptimisticGs(buildDay7DailyOptimisticGs(nextGs, gs, advancesToSugoroku));
    }
    if (advancesToSugoroku) {
      await new Promise((r) => setTimeout(r, FINAL_BATTLE_SPLASH_MS));
    }
    const ok = await writeGS(nextGs);
    if (!ok) setDay7DailyOptimisticGs(null);
  };

  // ─── 8日目：移動行動 ─────────────────────────────────────────────────
  const handleMoveAction = async (actionType) => {
    if (!isMyTurn || !gs) return;
    if (day8ActionLocked) return;
    const idx = gs.currentPlayerIdx;
    const p = gs.players[idx];
    if (p.movePhase !== "moving") return;

    const pendingTraffic = p.pendingTaxiSteps ?? 0;

    /** 渋滞2ターン目：前半で止まっている残りマスだけ進んでターン終了 */
    if (pendingTraffic > 0) {
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
      });
      if (rrWait.gameOverByDebt?.triggered) {
        await writeGS({
          ...gs,
          gamePhase: "gameOver",
          gameOverMsg: rrWait.gameOverByDebt.message,
          log: prependLogs([`💀 GAME OVER: ${rrWait.gameOverByDebt.message}`], gs.log),
        });
        return;
      }
      const moverWait = rrWait.players[idx];
      const newPosFinal = moverWait.position;
      const statsFinal = moverWait.stats;
      const arrivedWait = newPosFinal >= BOARD_GOAL;
      const timedOutWait = !arrivedWait && newTurnsWait >= BAL.dice.maxTurns;
      const slotReservedWait = arrivedWait ? Math.max(0, BAL.dice.maxTurns - newTurnsWait) : 0;

      let fullMsgWait = `🚗 渋滞を待つ（Wait in Traffic）⋯ 残り${pendingTraffic}マス進行 → ${newPosFinal}/${BOARD_GOAL}マス / PON${ponBeforeWait}+${pendingTraffic}→${statsFinal.pon}`;
      if (newPosFinal !== landedDiceWait) {
        fullMsgWait += `（マス効果:${landedDiceWait}→${newPosFinal}）`;
      }
      logsWait.push(`${p.name} T${newTurnsWait}: ${fullMsgWait}`);
      if (arrivedWait) {
        const pullsWait = slotReservedWait * BAL.dice.slotsPerSugorokuTurn;
        logsWait.push(
          `🎯 ${p.name} がゴールへ到着！獲得スロット ${slotReservedWait}ターンブン（開始時までに計${pullsWait}回）（確認後ターン終了 → 次の自分のターンでスロット開始）`,
        );
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
          return {
            ...base,
            movePhase: "goalLanding",
            slotTurnsLeft: 0,
            reservedSlotTurns: slotReservedWait,
            slotPullsGranted: 0,
            slotPullsThisSeat: 0,
          };
        }
        if (timedOutWait) {
          return { ...base, movePhase: "missed", slotTurnsLeft: 0, reservedSlotTurns: 0, slotPullsGranted: 0, slotPullsThisSeat: 0 };
        }
        return { ...base, movePhase: "moving", slotTurnsLeft: 0, reservedSlotTurns: 0, slotPullsGranted: 0, slotPullsThisSeat: 0 };
      });

      const gsWithDiceWait = { ...rrWait.gsWithTiles, lastDiceRolls: [] };
      const nextGSWait = arrivedWait
        ? {
            ...gsWithDiceWait,
            players: newPlayersWait,
            log: prependLogs(logsWait, gsWithDiceWait.log),
          }
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
      schedulePieceHopBlockingMs(Math.max(700, driveMsWait + 120));
      taxiDriveDurationMsRef.current = driveMsWait;
      setTaxiDriveDurationMs(driveMsWait);
      setTaxiDriveEndPos(taxiEndPosWait);
      setTaxiJamMidPos(null);
      taxiSecondLegMsRef.current = 0;
      setTaxiDriveActiveMs(driveMsWait);
      taxiGSRef.current = needsTileSlideWait && intermediateGSWait ? intermediateGSWait : nextGSWait;
      taxiGSFollowUpRef.current =
        needsTileSlideWait && intermediateGSWait
          ? { finalGS: nextGSWait, fromPos: landedDiceWait, toPos: newPosFinal }
          : null;
      pendingTaxiCongestionRef.current = false;
      pendingSugorokuTileFxToastRef.current = rrWait.tileToast;
      setTaxiDriveCongested(true);
      taxiActorPlayerIdRef.current = p.id;
      /** 渋滞2ターン目：すでにタクシー乗車中なので enter/boarding/ride は出さず drive のみ */
      setTaxiPhase("drive");
      return;
    }

    if (isDiceRolling) return;
    if (ponTileSlideTimerRef.current) {
      clearTimeout(ponTileSlideTimerRef.current);
      ponTileSlideTimerRef.current = null;
    }
    ponHopGateRef.current = false;
    setPonHopCompleteEnabled(false);
    setBoardViewPosOverride(null);
    taxiGSFollowUpRef.current = null;

    // PON≥deathThreshold + 人助け → 50%即死（すごろく）
    if (actionType === "help" && p.stats.pon >= BAL.pon.deathThreshold) {
      if (Math.random() < BAL.pon.deathChance) {
        const isMulti = gs.players.length > 1;
        const newPlayers = gs.players.map((pl, i) =>
          i === gs.currentPlayerIdx ? { ...pl, alive: false, movePhase: "spectating" } : pl,
        );
        if (isMulti && gs.subPhase === "day8") {
          const logs = [`💀 ${p.name} / PON${p.stats.pon}で人助け失敗！（脱落 — 代理スロットで他プレイヤーに干渉可能）`];
          await writeGS(computeAdvanceDay8Turn({ ...gs, players: newPlayers }, newPlayers, logs));
          return;
        }
        await writeGS({
          ...gs,
          players: newPlayers,
          gamePhase: "gameOver",
          gameOverMsg: `${p.name} はPON${p.stats.pon}の状態で人助けに失敗し、社会的に抹殺された…`,
          log: prependLogs([`💀 GAME OVER: ${p.name} / PON${p.stats.pon}で人助け失敗！`], gs.log),
        });
        return;
      }
    }

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

    // ── サイコロアニメーション（個別表示・段階的確定）────────────────────────
    const diceCount  = diceRolls.length;
    const revealStart = 400;  // シャッフル継続時間(ms)
    const revealGap   = 520;  // 各ダイスが確定するまでの間隔(ms)
    const gameDelay   = revealStart + (diceCount - 1) * revealGap + 2000; // ゲームロジック実行タイミング（確定後2秒停止）

    setIsDiceRolling(true);
    setLocalDice(Array(diceCount).fill(null));
    setDiceConfirmed(Array(diceCount).fill(false));
    setDiceShuffleValues(Array.from({ length: diceCount }, () => rand(1, 6)));
    setIsLuckyRoll(advantageRoll);
    setShowDiceTotal(false);
    if (actionType === "taxi") setTaxiPhase("taxiHail");

    // 運80アドバンテージ：幸運のダイスフラッシュ演出
    if (advantageRoll) {
      setShowLuckyDice(true);
      setTimeout(() => setShowLuckyDice(false), 1900);
    }

    // シャッフルタイマー（各ダイスの数字がバラバラに高速変化）
    const shuffleTimer = setInterval(() => {
      setDiceShuffleValues(Array.from({ length: diceCount }, () => rand(1, 6)));
    }, 80);

    // シャッフル停止 → ダイスを1個ずつ順番に確定
    setTimeout(() => {
      clearInterval(shuffleTimer);
      diceRolls.forEach((val, idx) => {
        setTimeout(() => {
          setLocalDice(prev => { const n = [...prev]; n[idx] = val; return n; });
          setDiceConfirmed(prev => { const n = [...prev]; n[idx] = true; return n; });
          // 最後のダイスが確定したら合計を表示
          if (idx === diceCount - 1) setTimeout(() => setShowDiceTotal(true), 200);
        }, idx * revealGap);
      });
    }, revealStart);

    // ゲームロジック：全ダイス確定後に実行
    setTimeout(async () => {
      const stumbleCells = ponFired ? Math.ceil(origStep / 2) : step;
      const landedDice = Math.min(BOARD_GOAL, p.position + stumbleCells);
      const roundsUsedNow = Math.max(0, BAL.dice.maxTurns - day8RemainingTurns);
      const newTurns = roundsUsedNow + 1 + extraTurns;

      const rr = resolveDay8LandingWithTiles(gs, idx, landedDice, s, logs, {
        ponSplashDamage: ponFired,
      });
      if (rr.gameOverByDebt?.triggered) {
        await writeGS({
          ...gs,
          gamePhase: "gameOver",
          gameOverMsg: rr.gameOverByDebt.message,
          log: prependLogs([`💀 GAME OVER: ${rr.gameOverByDebt.message}`], gs.log),
        });
        setIsDiceRolling(false);
        return;
      }
      const moverOut = rr.players[idx];
      const newPosFinal = moverOut.position;
      const statsFinal = moverOut.stats;

      const arrived = newPosFinal >= BOARD_GOAL;
      const timedOut = !arrived && newTurns >= BAL.dice.maxTurns;
      const slotReserved = arrived ? Math.max(0, BAL.dice.maxTurns - newTurns) : 0;

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
        const pullsArrive = slotReserved * BAL.dice.slotsPerSugorokuTurn;
        logs.push(
          `🎯 ${p.name} がゴールへ到着！獲得スロット ${slotReserved}ターンブン（開始時までに計${pullsArrive}回）（確認後ターン終了 → 次の自分のターンでスロット開始）`,
        );
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
          moveTurns: newTurns,
          lastMoveEvent: fullMsg,
          pendingTaxiSteps: pendingStepsNext,
        };
        if (arrived) {
          return {
            ...base,
            movePhase: "goalLanding",
            slotTurnsLeft: 0,
            reservedSlotTurns: slotReserved,
            slotPullsGranted: 0,
            slotPullsThisSeat: 0,
          };
        }
        if (timedOut) {
          return { ...base, movePhase: "missed", slotTurnsLeft: 0, reservedSlotTurns: 0, slotPullsGranted: 0, slotPullsThisSeat: 0 };
        }
        return { ...base, movePhase: "moving", slotTurnsLeft: 0, reservedSlotTurns: 0, slotPullsGranted: 0, slotPullsThisSeat: 0 };
      });

      const gsWithDice = { ...rr.gsWithTiles, lastDiceRolls: diceRolls };
      const nextGS = arrived
        ? { ...gsWithDice, players: newPlayers, log: prependLogs(logs, rr.gsWithTiles.log) }
        : computeAdvanceDay8Turn(gsWithDice, newPlayers, logs);

      const needsSugorokuTileSlide = newPosFinal !== landedDice;

      const showSugorokuTileFxToast = () => {
        if (!rr.tileToast?.lines?.length) return;
        if (sugorokuTileFxToastTimerRef.current) clearTimeout(sugorokuTileFxToastTimerRef.current);
        setSugorokuTileFxToast(rr.tileToast);
        sugorokuTileFxToastTimerRef.current = setTimeout(() => {
          setSugorokuTileFxToast(null);
          sugorokuTileFxToastTimerRef.current = null;
        }, 2800);
      };

      if (actionType === "taxi") {
        pendingTaxiCongestionRef.current = taxiCongestionSplit;
        pendingSugorokuTileFxToastRef.current = rr.tileToast;

        if (taxiCongestionSplit) {
          taxiGSRef.current = nextGS;
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
          const intermediatePlayers = buildDay8TileSlideMidpointPlayers(newPlayers, idx, landedDice);
          taxiGSRef.current = { ...gsWithDice, players: intermediatePlayers };
          taxiGSFollowUpRef.current = { finalGS: nextGS, fromPos: landedDice, toPos: newPosFinal };
          const driveMs = computeTaxiDriveDurationMs(Math.abs(landedDice - p.position));
          taxiDriveDurationMsRef.current = driveMs;
          setTaxiDriveDurationMs(driveMs);
          setTaxiDriveEndPos(landedDice);
          setTaxiJamMidPos(null);
          taxiSecondLegMsRef.current = 0;
          setTaxiDriveActiveMs(driveMs);
        } else {
          taxiGSRef.current = nextGS;
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
        setTaxiPhase("enter");
        setTaxiDriveCongested(false);
        setIsDiceRolling(false);
      } else if (ponFired) {
        const intermediatePlayers = needsSugorokuTileSlide
          ? buildDay8TileSlideMidpointPlayers(newPlayers, idx, landedDice)
          : null;
        const intermediateGS = intermediatePlayers
          ? { ...gsWithDice, players: intermediatePlayers }
          : null;
        ponCutinCommitRef.current = {
          nextGS,
          characterType: p.characterType ?? "salaryman",
          tileFxToast: rr.tileToast,
          intermediateGS,
          tileSlideFromPos: landedDice,
          tileSlideToPos: needsSugorokuTileSlide ? newPosFinal : null,
        };
        ponHopGateRef.current = true;
        if (ponTileSlideTimerRef.current) {
          clearTimeout(ponTileSlideTimerRef.current);
          ponTileSlideTimerRef.current = null;
        }
        setBoardViewPosOverride(landedDice);
        setPonHopCompleteEnabled(true);
        setIsDiceRolling(false);
        const ponHopBlockMs = needsSugorokuTileSlide
          ? computeSugorokuHopDurationMs(p.position, landedDice) + computeSugorokuHopDurationMs(landedDice, newPosFinal)
          : computeSugorokuHopDurationMs(p.position, newPosFinal);
        schedulePieceHopBlockingMs(Math.max(700, ponHopBlockMs));
      } else {
        const hopBlockMs = needsSugorokuTileSlide
          ? computeSugorokuHopDurationMs(p.position, landedDice) + computeSugorokuHopDurationMs(landedDice, newPosFinal)
          : computeSugorokuHopDurationMs(p.position, newPosFinal);
        schedulePieceHopBlockingMs(hopBlockMs);
        if (!needsSugorokuTileSlide) {
          if (!arrived) {
            // 1 回の write で「駒の最終マス」と「次の currentPlayerIdx」を同時に送ると、
            // BoardViewport の viewPos が次手プレイヤーの座標に即座に切り替わり、
            // 移動補間が出ない／別人のマス間を滑ることがある。
            // マス効果で landed≠final のときだけ中間 write があり手番が残るのでアニメが出やすかった。
            const holdTurnGs = {
              ...gsWithDice,
              players: newPlayers,
              log: prependLogs(logs, rr.gsWithTiles.log),
            };
            const okHold = await writeGS(holdTurnGs);
            if (!okHold) {
              setIsDiceRolling(false);
              return;
            }
            await new Promise((r) => setTimeout(r, hopBlockMs));
            const advancedGs = computeAdvanceDay8Turn(holdTurnGs, holdTurnGs.players, []);
            const okAdvance = await writeGS(advancedGs);
            if (!okAdvance) {
              setIsDiceRolling(false);
              return;
            }
          } else {
            const ok = await writeGS(nextGS);
            if (!ok) {
              setIsDiceRolling(false);
              return;
            }
          }
        } else {
          const intermediatePlayers = buildDay8TileSlideMidpointPlayers(newPlayers, idx, landedDice);
          const intermediateGS = { ...gsWithDice, players: intermediatePlayers };
          const ok1 = await writeGS(intermediateGS);
          if (!ok1) {
            setIsDiceRolling(false);
            return;
          }
          await new Promise((r) => setTimeout(r, computeSugorokuHopDurationMs(p.position, landedDice)));
          const ok2 = await writeGS(nextGS);
          if (!ok2) {
            setIsDiceRolling(false);
            return;
          }
        }
        setIsDiceRolling(false);
        showSugorokuTileFxToast();
      }
    }, gameDelay);
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
  if (screen === "entry") return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 pb-12 text-slate-100">
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
      multiOpen={multiOpen}
      onToggleMultiOpen={() => {
        setMultiOpen((p) => !p);
        setMultiAction(null);
        setUiError("");
      }}
      multiAction={multiAction}
      onSetMultiAction={setMultiAction}
      onQuickMatch={handleQuickMatch}
      isPrivateRoom={isPrivateRoom}
      onSetPrivateRoom={setIsPrivateRoom}
      allowQuickMatch={allowQuickMatch}
      onSetAllowQuickMatch={setAllowQuickMatch}
      onCreateRoom={handleCreateRoom}
      joinInput={joinInput}
      onJoinInputChange={setJoinInput}
      onJoinRoom={handleJoinRoom}
      onCheckInvites={handleCheckInvites}
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
      onCopyMyId={handleCopyMyId}
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
      loading={loading}
      uiError={uiError}
      inviteInput={inviteInput}
      onInviteInputChange={setInviteInput}
      inviteError={inviteError}
      onInvitePlayer={handleInvitePlayer}
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
        copied={copied}
        onCopy={handleCopyMyId}
        seVolume={seVolume}
        bgmVolume={bgmVolume}
        onSeVolumeChange={handleSeVolumeChange}
        onBgmVolumeChange={handleBgmVolumeChange}
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
          ロビーへ戻る
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
          copied={copied}
          onCopy={handleCopyMyId}
          seVolume={seVolume}
          bgmVolume={bgmVolume}
          onSeVolumeChange={handleSeVolumeChange}
          onBgmVolumeChange={handleBgmVolumeChange}
        />
        {/* SSランク パーティクル雨 */}
        {hasSSWinner && <SSRainParticles />}
        <div className="mx-auto max-w-lg space-y-5 relative z-10">
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
          <button onClick={handleReturnToLobby}
            className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors">
            ロビーへ戻る
          </button>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // ゲーム中（gamePhase === "playing"）
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
        copied={copied}
        onCopy={handleCopyMyId}
        seVolume={seVolume}
        bgmVolume={bgmVolume}
        onSeVolumeChange={handleSeVolumeChange}
        onBgmVolumeChange={handleBgmVolumeChange}
      />

      {/* ── PON炎上シェイク警告テロップ ── */}
      {shakeScreen && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <span className="bg-rose-600/90 text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg anim-fadein tracking-wide">
            ⚡ 転倒 / 炎上！
          </span>
        </div>
      )}

      {/* ── PON転倒カットイン（すごろく・自分クライアントのみ） ── */}
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

      {sugorokuTileFxToast?.lines?.length > 0 && (
        <div
          className="fixed bottom-[min(132px,22vh)] left-1/2 z-[228] flex w-[min(92vw,360px)] -translate-x-1/2 flex-col gap-1.5 rounded-2xl border border-cyan-500/55 bg-slate-950/95 px-5 py-3.5 shadow-[0_14px_50px_rgba(0,0,0,0.75)] pointer-events-none text-center anim-fadein"
          role="status"
          aria-live="polite"
        >
          <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-300/85">
            {sugorokuTileFxToast.title ?? "マス効果"}
          </p>
          <ul className="space-y-1 text-sm font-bold text-amber-100 leading-snug">
            {sugorokuTileFxToast.lines.map((line, li) => (
              <li key={li}>{line}</li>
            ))}
          </ul>
        </div>
      )}

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
        />
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
        <div className="min-w-0 flex-1 space-y-5">
        {/* ── ヘッダー ──────────────────────────────────────────────── */}
        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-lg font-bold md:text-xl font-[Rajdhani] tracking-wide text-white">{GAME_TITLE_SHORT}</h1>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight uppercase tracking-wide max-w-md">
                {GAME_TITLE_FULL}
              </p>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed space-y-0.5">
                {gs?.subPhase === "daily" && `${gs.currentDay}日目 / ${cpGs?.name}のターン`}
                {gs?.subPhase === "day8" && cpGs && (
                  <>
                    <span className="block">
                      {cpGs.movePhase === "missed" &&
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
                      <span className="font-normal text-slate-500">（すごろく／スロット共通）</span>
                    </span>
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {/* 8日目：補助HUD（タイトル下に残りターンバースト／上限 を常時表示） */}
              {gs?.subPhase === "day8" && cpGs && (
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-amber-400/90 leading-none">8日目 HUD</span>
                  <span className="text-xs font-bold text-slate-200 tabular-nums leading-none">
                    {(cpGs.movePhase === "goalLanding" || cpGs.movePhase === "waitingSlot") ? (
                      <>ゴール済・スロット待ち</>
                    ) : cpGs.movePhase === "arrived" ? (
                      <>🎰 スロット</>
                    ) : cpGs.movePhase === "moving" ? (
                      <>移動手番 <strong>{BAL.dice.maxTurns - day8RemainingTurns}</strong><span className="text-slate-600">/</span><strong>{BAL.dice.maxTurns}</strong></>
                    ) : (
                      <>{cpGs.movePhase === "missed" ? "すごろくタイムアウト済" : "—"}</>
                    )}
                  </span>
                </div>
              )}
              <span className="text-xs text-slate-600 font-mono border border-slate-700 rounded px-2 py-0.5">{roomId}</span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Users size={12} className="text-cyan-400" />
                <span>{gs.players.map(p => p.name).join(" · ")}</span>
              </div>
              {!isMyTurn && (
                <span className="flex items-center gap-1 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                  <Loader2 size={10} className="animate-spin" />
                  {isMyDay8RoundCompleted ? "Waiting for others..." : `${cpGs?.name}のターン待ち`}
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
            {gs.subPhase === "day8" && cpGs.spinCount > 0 && (
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

          {/* 相手のターン待ちインジケーター */}
          {!isMyTurn && !goalLandingSelf && (
            <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-5 text-center space-y-2">
              <Loader2 size={24} className="animate-spin text-slate-500 mx-auto" />
              <p className="text-slate-400 text-sm">
                {isMyDay8RoundCompleted
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
          {isMyTurn && gs.subPhase === "daily" && cpGs && (
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

          {dailySlotOpen && dailySlotSpinStats && cpGs && (
            <DailySlotTrainingModal
              open={dailySlotOpen}
              statsForSpin={dailySlotSpinStats}
              characterType={cpGs.characterType}
              playerName={cpGs.name}
              initialSlotPityCounter={cpGs.slotPityCounter ?? 0}
              soundRef={soundRef}
              onClose={() => setDailySlotOpen(false)}
              onFinished={finalizeDailySlotTraining}
            />
          )}

          <BoardGamePhase
            gs={gs}
            cpGs={cpGs}
            boardViewPos={
              typeof boardViewPosOverride === "number" && (isMyTurn || goalLandingSelf)
                ? boardViewPosOverride
                : null
            }
            reportSugorokuHopComplete={isMyTurn && ponHopCompleteEnabled}
            onSugorokuHopComplete={handleSugorokuHopComplete}
            isMyTurn={isMyTurn}
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
            taxiDriveCongested={taxiDriveCongested}
            taxiDriveEndPos={taxiDriveEndPos}
            taxiDriveDurationMs={taxiDriveDurationMs}
            taxiDriveSegmentMs={taxiDriveActiveMs}
            taxiJamMidPos={taxiJamMidPos}
            pieceHopping={pieceHopping}
            interactionLocked={day8ActionLocked}
            onMoveAction={handleMoveAction}
            onGoalLandingConfirm={handleGoalLandingConfirm}
            goalLandingSelf={goalLandingSelf}
          />

          {isMyTurn && cpIsGhostPick && cpGs && (
            <TurnManager
              gs={gs}
              cpGs={cpGs}
              isMyTurn={isMyTurn}
              writeGS={writeGS}
              interactionLocked={day8ActionLocked}
            />
          )}

          {isMyTurn && cpIsSlot && cpGs && (
            <SlotContainer
              gs={gs}
              cpGs={cpGs}
              isMyTurn={isMyTurn}
              writeGS={writeGS}
              commitPendingGameState={commitPendingGameState}
              commitGameStateTransaction={commitGameStateTransaction}
              soundRef={soundRef}
              roomId={roomId}
              interactionLocked={day8ActionLocked}
            />
          )}

          {showSlotSpinBroadcastMirror && <SlotSpinBroadcastOverlay gs={gs} soundRef={soundRef} />}

        </section>

        {/* ── ゲームログ ────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="mb-2 text-xs font-semibold text-slate-400">ゲームログ（全員共有）</h2>
          <div className="max-h-64 space-y-1 overflow-y-auto font-mono text-xs text-slate-300">
            {(gs.log ?? []).map((entry, i) => (
              <p key={i} className="border-b border-slate-800/50 pb-1 last:border-0">{entry}</p>
            ))}
          </div>
        </section>

        <button onClick={handleReturnToLobby}
          className="text-xs text-slate-600 underline hover:text-slate-400">
          ロビーへ戻る（ゲームは続行中）
        </button>
        </div>

        <PlayingPlayerSidebar
          className="w-full shrink-0 lg:sticky lg:top-6 lg:w-[min(100%,320px)] lg:self-start"
          players={gs.players}
          seatOrderIds={playerSlots.map((s) => s.id)}
          currentPlayerIdx={gs.currentPlayerIdx}
          myId={myId}
          subPhase={gs.subPhase}
          proxySlotTargetIdx={gs.proxySlotTargetIdx}
          showStatLegend={gs.players.length > 1}
        />
      </div>
      ) : null}
    </div>
  );
}
