import {
  BAL,
  BOARD_GOAL,
  CHARACTERS,
  DAY8_MAX_TURNS,
  LAST_DAILY_DAY,
  SLOT_COST,
  SLOT_MACHINES,
  QUICK_NAMES,
  TILE_EFFECT_KIND,
  SUGOROKU_VERIFY_DEATH_TEST_TRAP_FIRST_N,
} from "../constants/gameBalance";
import {
  buildDayDividerEntry,
  buildDayHeaderEntry,
  buildTurnHandoffEntry,
  serializeLogEntry,
} from "../lib/gameLogFormat";
import { DAILY_CUTIN_SYNC_DEFAULTS } from "../lib/dailyCutinSync";
import { canSelectAsProxySlotTarget, canContinueAsProxySlotTarget, canProxySlotBetAt, computeProxySlotMaxBet } from "../lib/slotProxyTarget";
import { applyDay8SlotPayoutBonus } from "../lib/day8ItemEffects";
import {
  GAME_PHASE,
  MOVE_PHASE,
  SUB_PHASE,
} from "../constants/gamePhases";
import {
  formatDay8StartGrantLog,
  grantDay8StartInventoryToPlayers,
  resetDay8ItemSeatForPlayer,
} from "../lib/day8Items";
import {
  createEmptyAssetHistory,
  finalizeDay8AssetHistory,
  recordDailyMoney,
  snapshotDailyEndAllPlayers,
  snapshotDay8TurnEndAllPlayers,
  resolveDay8HistoryTurn,
} from "../lib/playerAssetHistory";
import { clamp, clampMoney, rand, prependLogs } from "./gameLogic/core.js";
import {
  livingCostForPlayer,
  computeFinalStatsFromInitialRolls,
  normalizeSlotInitialRolls,
  normalizeSlotInitialStats,
  rollSlotInitialStatsForGameStart,
} from "./gameLogic/initialStats.js";
import { slotPityMaxThreshold, applySplashDamage, virtueMinRoll } from "./gameLogic/virtueEffects.js";

export { clamp, clampMoney, rand, prependLogs } from "./gameLogic/core.js";
export {
  dailyLivingCostFor,
  livingCostForPlayer,
  initialStatGaugeRanges,
  lobbyFixedGaugeRanges,
  VIRTUE_BY_INITIAL_ROLL,
  rollInitialRolls,
  livingRollFromInitialRolls,
  computeFinalStatsFromInitialRolls,
  rollInitialStats,
  rollSlotInitialStatsForGameStart,
  normalizeSlotInitialRolls,
  isLobbySlotConfigured,
  isLobbyMemberReady,
  allLobbyMembersReady,
  normalizeSlotInitialStats,
} from "./gameLogic/initialStats.js";
export {
  virtueMinRoll,
  slotPityMaxThreshold,
  virtueIncomeMult,
  applyVirtueIncomeBoost,
  shrineAmuletDropChance,
  applyVirtueWave,
  applySplashDamage,
} from "./gameLogic/virtueEffects.js";

/** 8日目スロット：1手番あたりの基本スピン数（将来アイテムで加算） */
export function day8SlotBurstSize() {
  return Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
}

/** この手番に付与するスピン数（アイテム等は将来ここに足す） */
export function day8SlotGrantSizeForHandoff(player) {
  void player;
  return day8SlotBurstSize();
}

/** 最終移動ターン（15T目）でゴール — 次手番がないためスロットなし */
export function isDay8FinalMoveGoal(player) {
  return (Number(player?.moveTurns) || 0) >= BAL.dice.maxTurns;
}

/**
 * waitingSlot → arrived：この手番分のスピンだけ付与（bank なし）。
 * @returns {object|null}
 */
export function beginDay8SlotSeatForPlayer(player) {
  if (player?.movePhase !== "waitingSlot") return null;
  if (isDay8FinalMoveGoal(player)) return null;
  const grant = day8SlotGrantSizeForHandoff(player);
  return {
    ...player,
    movePhase: "arrived",
    slotTurnsLeft: grant,
    slotPullsGranted: grant,
    slotPullsThisSeat: 0,
  };
}

/** バースト終了後 waitingSlot へ（次の自分手番まで待機） */
export function releaseDay8PlayerToWaitingSlotAfterBurst(player) {
  if (player?.movePhase !== "arrived") return player;
  if ((player.slotTurnsLeft ?? 0) > 0) return player;
  if (isDay8FinalMoveGoal(player)) return player;
  return {
    ...player,
    movePhase: "waitingSlot",
    slotPullsThisSeat: 0,
    slotPullsGranted: 0,
  };
}

/** Firestore が Timestamp で返した場合にも ms で比較する */
export function toEpochMsMaybe(v) {
  if (v == null || v === "") return NaN;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "object") {
    if (typeof v.toMillis === "function") return v.toMillis();
    const s = v.seconds ?? v._seconds;
    if (typeof s === "number")
      return s * 1000 + Math.floor((v.nanoseconds ?? v._nanoseconds ?? 0) / 1e6);
  }
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

export function portraitUrlFromFullId(seed) {
  const s = encodeURIComponent(String(seed ?? "guest").slice(0, 80));
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${s}&backgroundColor=transparent`;
}

/** BoardViewport と同じステップ間隔で、from→to のホップが収束するまでのおおよその時間（ms） */
export function estimateSugorokuHopDurationMs(fromPos, toPos) {
  const diff = toPos - fromPos;
  const steps = Math.min(Math.abs(diff), 20);
  const msPerStep = computeSugorokuMsPerStep(Math.abs(diff));
  return Math.max(0, steps * msPerStep);
}

/** 全員表示用スロット同期（Firestore gameState 上位フィールド） */
export const SLOT_SYNC_DEFAULTS = {
  slotPhase: "idle",
  activeBet: null,
  targetResult: null,
  slotSpinSessionId: null,
  slotMirrorMachineKey: null,
  /** 直近1スピンの収支（bet 差し引き後）。観戦オーバーレイ用。idle 時は null */
  lastPayout: null,
  /** 結果確定を書き込んだクライアント時刻（ms）。任意（主にデバッグ） */
  slotResultSettledAt: null,
  /** リーチ演出フラグ：1・2リール目が同じ絵柄のとき true。観戦側のタイムライン制御に使う */
  isReach: false,
  /** 演出用の視覚リール3本（near-miss 加工後）。実際の targetResult と絵柄が異なる場合がある */
  slotVisualReels: null,
};

/** 1〜7日目デイリースロット観戦同期（Firestore gameState） */
export const DAILY_SLOT_SYNC_DEFAULTS = {
  dailySlotPhase: "idle",
  dailySlotSessionId: null,
  dailySlotRound: null,
  dailySlotRoundTotal: null,
  dailySlotVisualReels: null,
  dailySlotTargetResult: null,
  dailySlotIsReach: false,
  dailySlotTier: null,
  dailySlotOutcome: null,
  dailySlotSessionSummary: null,
};

/** デイリースロット1回分の演出用リール（near-miss 加工込み） */
export function buildDailySlotSpinVisualPlan(res, machineKey = "standard") {
  const machine = SLOT_MACHINES[machineKey] ?? SLOT_MACHINES.standard;
  let visualReels = [...(res?.reels ?? ["?", "?", "?"])];
  if (res?.tier === "miss") {
    const sym = machine.symbols;
    const nm = BAL.slot.nearMissReachChance;
    const sp = BAL.slot.slipSymbolChance;
    const u = Math.random();
    if (sym.length >= 2 && u < nm) {
      const a = sym[rand(0, sym.length - 1)];
      const diff = sym.filter((s) => s !== a);
      const b = diff[rand(0, diff.length - 1)];
      visualReels = [a, a, b];
    } else if (u < nm + sp) {
      const slipPos = rand(0, 2);
      visualReels[slipPos] = sym[1];
    }
  }
  const { reachPossible } = getSlotReachAnimationState(visualReels, res?.tier);
  return { visualReels, reachPossible, machine };
}

/** @deprecated 手番継続時はリール停止直後に idle へ。バースト終了時は SLOT_RESULT_END_BURST_GRACE_MS */
export const SLOT_RESULT_COMPLETED_GRACE_MS = 4000;
/** 1バースト（例: 3回）終了後、確認 UI までの待ち（ms） */
export const SLOT_RESULT_END_BURST_GRACE_MS = 1200;
/** 通常当選（big/mid 等）の筐体演出を消すまで（ms） */
export const SLOT_WIN_FX_CLEAR_MS = 3500;
/** ジャックポット：フルスクリーン祝砲の表示時間（ms） */
export const SLOT_JACKPOT_CELEBRATION_MS = 2600;
/** ジャックポット：筐体レインボー演出を消すまで（ms） */
export const SLOT_JACKPOT_WIN_FX_CLEAR_MS = 2800;

/** 超大当たり／POT JP 後、次手番へ進めるまでの最低待ち（祝砲＋筐体演出） */
export function day8SlotMajorWinCelebrationHoldMs() {
  return Math.max(SLOT_JACKPOT_CELEBRATION_MS, SLOT_JACKPOT_WIN_FX_CLEAR_MS) + 400;
}

export function day8SlotActorMajorWinTier(gs, actorIdx = gs?.currentPlayerIdx) {
  const p = gs?.players?.[actorIdx];
  const tier = p?.lastSpinResult?.tier;
  return tier === "jackpot" || tier === "potJackpot" ? tier : null;
}

/** @returns {number} 0 = 待ち終了 */
export function day8SlotMajorWinAdvanceRemainingMs(gs, nowMs = Date.now()) {
  if (!day8SlotActorMajorWinTier(gs)) return 0;
  const settledAt = Number(gs?.slotResultSettledAt);
  if (!Number.isFinite(settledAt)) return day8SlotMajorWinCelebrationHoldMs();
  return Math.max(0, day8SlotMajorWinCelebrationHoldMs() - (nowMs - settledAt));
}

export function shouldDeferDay8SlotTurnAdvanceForMajorWin(gs, nowMs = Date.now()) {
  return day8SlotMajorWinAdvanceRemainingMs(gs, nowMs) > 0;
}

// ── 観戦側タイムライン定数（SlotMachine.jsx の手番側と合わせる） ──────────
/** リーチなしのとき：スピン開始からリール1が止まるまで（ms） */
export const SLOT_SYNC_T0 = 1200;
/** リーチなしのとき：リール2が止まるまで（ms） */
export const SLOT_SYNC_T1 = 1700;
/** リーチなしのとき：リール3が止まるまで（ms）= t1 + 550 */
export const SLOT_SYNC_T2_NOREACH = 2250;
/** リーチあり・カットインなし：第2リール停止(t1)から第3リールまでの余韻（ms） */
export const SLOT_SYNC_T2_REACH_HOLD_MS = 2400;
/** リーチあり・カットインなし：スピン開始から第3リール停止まで（ms） */
export const SLOT_SYNC_T2_REACH_NOCUTIN = SLOT_SYNC_T1 + SLOT_SYNC_T2_REACH_HOLD_MS;
/** リーチカットイン：オーバー表示開始タイミング（手番側 tCutinReveal と同値） */
export const SLOT_SYNC_REACH_CUTIN_REVEAL_MS = Math.max(
  SLOT_SYNC_T1 + 480,
  SLOT_SYNC_T2_REACH_NOCUTIN,
);
/** リーチカットイン：オーバー表示時間（手番側 REACH_CUTIN_ON_SCREEN_MS と同値） */
export const SLOT_SYNC_REACH_CUTIN_ON_SCREEN_MS = 2000;
/** カットイン dismiss 後〜第3リール停止まで（手番側 REACH_CUTIN_AFTER_DISMISS_MS と同値） */
export const SLOT_SYNC_REACH_CUTIN_AFTER_DISMISS_MS = 1000;
/** ハズレ時ガセ dismiss の最大 ms（手番側と同値） */
export const SLOT_SYNC_REACH_CUTIN_GASE_DISMISS_MS = 720;
/** リーチあり・カットインあり：観戦同期の第3リール停止（手番側 reel3StopAt + dismiss + afterDismiss） */
export const SLOT_SYNC_T2_REACH_CUTIN =
  Math.max(
    SLOT_SYNC_T2_REACH_NOCUTIN,
    SLOT_SYNC_REACH_CUTIN_REVEAL_MS + SLOT_SYNC_REACH_CUTIN_ON_SCREEN_MS,
  ) +
  SLOT_SYNC_REACH_CUTIN_GASE_DISMISS_MS +
  SLOT_SYNC_REACH_CUTIN_AFTER_DISMISS_MS;
/** @deprecated 互換 alias — 旧 7600ms は手番側より長く、idle 先行で結果が消えていた */
export const SLOT_SYNC_T2_REACH = SLOT_SYNC_T2_REACH_CUTIN;
/** リーチ判定表示（REACH!! UI）をリール2停止から何 ms 後に出すか */
export const SLOT_SYNC_REACH_SHOW_DELAY = 400;

/** 観戦・同期：第3リール停止までの ms */
export function slotSyncReel3StopMs(reachPossible, reachCutin = false) {
  if (!reachPossible) return SLOT_SYNC_T2_NOREACH;
  return reachCutin ? SLOT_SYNC_T2_REACH_CUTIN : SLOT_SYNC_T2_REACH_NOCUTIN;
}

/** 観戦同期用スピンセッション ID（スピン開始のたびに新規発行） */
export function createSlotSpinSessionId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** 旧クライアントが書き込んだフィールドを除去（次回書き込みで上書き） */
export const LEGACY_SLOT_FIELD_KEYS = ["slotAnimationState", "slotSpinBroadcast", "currentSlotResult"];

export function stripLegacySlotFirestoreFields(gs) {
  if (!gs || typeof gs !== "object") return gs;
  const o = { ...gs };
  for (const k of LEGACY_SLOT_FIELD_KEYS) delete o[k];
  return o;
}

/** gameState から idle 表示用の中段3絵柄を拾う（displayReels / slotVisualReels / 直前スピン） */
export function pickDisplayReelsFromGameState(gs) {
  if (!gs || typeof gs !== "object") return null;
  for (const key of ["displayReels", "slotVisualReels"]) {
    const dr = gs[key];
    if (Array.isArray(dr) && dr.length === 3 && !isPlaceholderDisplayReels(dr)) {
      return [...dr];
    }
  }
  const actor = gs?.players?.[gs?.currentPlayerIdx ?? 0];
  const fromVisual = actor?.lastSpinResult?.visualReels;
  if (Array.isArray(fromVisual) && fromVisual.length === 3 && !isPlaceholderDisplayReels(fromVisual)) {
    return [...fromVisual];
  }
  const fromLast = actor?.lastSpinResult?.reels;
  if (Array.isArray(fromLast) && fromLast.length === 3 && !isPlaceholderDisplayReels(fromLast)) {
    return [...fromLast];
  }
  return null;
}

/** idle 復帰時：有効な displayReels を維持、無ければ直前スピン or バラバラ初期表示 */
export function resolveIdleDisplayReels(gs, fallbackGs = null) {
  const picked = pickDisplayReelsFromGameState(gs) ?? pickDisplayReelsFromGameState(fallbackGs);
  if (picked) return picked;
  const mk =
    gs?.slotMirrorMachineKey ?? fallbackGs?.slotMirrorMachineKey ?? "standard";
  const pot = (gs?.players?.length ?? fallbackGs?.players?.length ?? 0) > 1;
  return defaultIdleDisplayReels(mk, pot);
}

/** 8日目スロット：同期フィールドだけ idle に戻す（プレイヤーの slotTurnsLeft 等は liveGs を維持） */
export function mergeDay8SlotIdleSync(liveGs, displayPreferGs = null) {
  if (!liveGs || typeof liveGs !== "object") return liveGs;
  return stripLegacySlotFirestoreFields({
    ...liveGs,
    ...SLOT_SYNC_DEFAULTS,
    showSpinResult: false,
    displayReels: resolveIdleDisplayReels(displayPreferGs ?? liveGs, liveGs),
  });
}

/** 観戦オーバーレイ：リーチなし時の全リール同時停止までの固定時間（後方互換）（ms） */
export const SLOT_SYNC_SPIN_MS = SLOT_SYNC_T2_NOREACH;

/** マルチ8日目POT JP のリール絵柄（未設定時 💰） */
export function getSlotPotSymbol(machine) {
  return machine?.potSymbol ?? "💰";
}

/** 確率バー等UI用：各tierのリール中段絵柄 */
export function getSlotTierReelSymbols(machine) {
  const sy = machine?.symbols ?? [];
  return {
    potJackpot: getSlotPotSymbol(machine),
    jackpot: sy[0] ?? "7",
    big: sy[1] ?? "BAR",
    mid: "⭐",
    atari: "🔔",
    small: "🍒",
  };
}

/** tier表示名（ツールチップ・アクセシビリティ用） */
export const SLOT_TIER_LABELS = {
  potJackpot: "POT JP",
  jackpot: "超大当たり",
  big: "大当たり",
  mid: "中当たり",
  atari: "当たり",
  small: "小当たり",
};

/** POT JP 有効時は potSymbol をリール列に含める */
export function getSlotReelSymbols(machine, potJackpotEnabled = false) {
  const base = machine?.symbols ?? [];
  const potSym = getSlotPotSymbol(machine);
  if (!potJackpotEnabled) return base;
  if (base.includes(potSym)) return base;
  return [...base, potSym];
}

/** スピン演出・Canvas 用（symbols に POT 絵柄を反映） */
export function slotMachineForReels(machine, potJackpotEnabled = false) {
  return { ...machine, symbols: getSlotReelSymbols(machine, potJackpotEnabled) };
}

/** `targetResult`（筐体 symbols のインデックス 3 つ）→ 中段の絵柄 */
export function slotTargetIndicesToPaylineMiddles(targetResult, machineKey, potJackpotEnabled = false) {
  const base = SLOT_MACHINES[machineKey] ?? SLOT_MACHINES.standard;
  const m = slotMachineForReels(base, potJackpotEnabled);
  const sy = m.symbols ?? [];
  if (!Array.isArray(targetResult) || targetResult.length !== 3) return ["?", "?", "?"];
  return targetResult.map((ix) => {
    const i = typeof ix === "number" && Number.isFinite(ix) ? Math.floor(ix) : 0;
    return sy[i] ?? sy[0] ?? "?";
  });
}

/** 確定した中段 3 絵柄 → Firestore 用 `targetResult`（number[]） */
export function slotPaylineMiddlesToTargetIndices(visualReels, machine) {
  const sy = machine?.symbols ?? [];
  const mids = Array.isArray(visualReels) ? visualReels : ["?", "?", "?"];
  return mids.map((sym) => {
    const ix = sy.indexOf(sym);
    return ix >= 0 ? ix : 0;
  });
}

/** 観戦スピン：`slotSpinSessionId` / `targetResult` を解決（idle 取り逃しキャッチアップ用） */
export function resolveSlotBroadcastSpinContext(gsSnap) {
  if (!gsSnap || typeof gsSnap !== "object") return null;
  const mk = gsSnap.slotMirrorMachineKey ?? "standard";
  const potJackpotEnabled = (gsSnap.players?.length ?? 0) > 1;
  const machine = slotMachineForReels(SLOT_MACHINES[mk] ?? SLOT_MACHINES.standard, potJackpotEnabled);

  let targetResult = gsSnap.targetResult;
  if (!Array.isArray(targetResult) || targetResult.length !== 3) {
    const dr = gsSnap.displayReels;
    if (!Array.isArray(dr) || dr.length !== 3) return null;
    targetResult = slotPaylineMiddlesToTargetIndices(dr, machine);
  }

  let sessionId = gsSnap.slotSpinSessionId;
  if (typeof sessionId !== "string" || !sessionId) {
    const spinNum = gsSnap.players?.[gsSnap.currentPlayerIdx ?? 0]?.lastSpinResult?.spin;
    if (typeof spinNum !== "number" || spinNum <= 0) return null;
    sessionId = `catchup-${gsSnap.currentPlayerIdx ?? 0}-${spinNum}`;
  }

  return { sessionId, targetResult };
}

/** 観戦スピン：同一プレイヤー・同一 spin 番号のキー */
export function slotBroadcastSpinAnimKey(gsSnap) {
  const idx = gsSnap?.currentPlayerIdx ?? 0;
  const spinNum = gsSnap?.players?.[idx]?.lastSpinResult?.spin ?? 0;
  return `${idx}:${spinNum}`;
}

export const genRoomId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[rand(0, chars.length - 1)]).join("");
};

export const genQuickName = () =>
  QUICK_NAMES[Math.floor(Math.random() * QUICK_NAMES.length)] + Math.floor(10 + Math.random() * 89);

/** すごろく：ラッキーダイス（2個目）発動確率（0〜100） */
export function sugorokuLuckyDiceChancePct(luck) {
  const cfg = BAL.dice.luckyDice ?? {};
  const threshold = Number(cfg.luckThreshold) || 80;
  const base = Number(cfg.baseChancePct) || 40;
  const perPoint = Number(cfg.pctPerLuckAbove) || 1;
  const cap = Number(cfg.maxChancePct) || 100;
  const lk = Number(luck) || 0;
  if (lk < threshold) return 0;
  return Math.min(cap, base + (lk - threshold) * perPoint);
}

export function rollDie(stats) {
  const minVal = virtueMinRoll(stats.virtue);
  const advChance = sugorokuLuckyDiceChancePct(stats.luck);
  const useAdv = advChance > 0 && Math.random() * 100 < advChance;
  const a = rand(minVal, 6);
  if (useAdv) {
    const b = rand(minVal, 6);
    return { value: a + b, rolls: [a, b], advantage: true };
  }
  return { value: a, rolls: [a], advantage: false };
}

/** student（ビギナーズラック）：ハズレ −8pt 分を JP+2%・大当+3%・小役+3% へ（合計100%を維持） */
const STUDENT_SLOT_LUCK_DELTA = { jp: 0.02, big: 0.03, small: 0.03 };

export function calcSlotRates(stats, machine, heat = 0, characterType = null, opts = null) {
  const { baseRates: br } = machine;
  const S = BAL.slot;
  const potJackpotEnabled = opts?.potJackpotEnabled === true;
  /** POT JP はベース率固定。運・熟成・技量・キャラ補正・ピティ再配分の対象外 */
  const potJp = potJackpotEnabled ? (br.potJp ?? 0) : 0;
  let jp = br.jp;
  let big = br.big;
  let mid = br.mid;
  let atari = br.atari;
  let small = br.small;
  let miss = 1 - (potJp + jp + big + mid + atari + small);

  const skEx = Math.max(0, stats.skill - S.skillBaseline);
  const skillBlocks = skEx >= S.skillBlockSize ? Math.floor(skEx / S.skillBlockSize) : 0;
  const lkEx = Math.max(0, stats.luck - S.luckBaseline);
  const luckFrac = S.luckRefSpan > 0 ? lkEx / S.luckRefSpan : 0;

  let skillMissReduced = 0;
  const skillWant = skillBlocks * S.skillMissReducePerBlock;
  if (skillWant > 0 && miss > 0) {
    skillMissReduced = Math.min(skillWant, miss);
    miss -= skillMissReduced;
    mid += skillMissReduced * S.skillToMid;
    atari += skillMissReduced * S.skillToAtari;
    small += skillMissReduced * S.skillToSmall;
  }

  let luckConverted = 0;
  let luckDrainAtari = 0;
  let luckDrainSmall = 0;
  if (luckFrac > 0) {
    const wantAtari = S.luckAtariDrainAtLuck100 * luckFrac;
    const wantSmall = S.luckSmallDrainAtLuck100 * luckFrac;
    luckDrainAtari = Math.min(wantAtari, atari);
    luckDrainSmall = Math.min(wantSmall, small);
    luckConverted = luckDrainAtari + luckDrainSmall;
    if (luckConverted > 0) {
      atari -= luckDrainAtari;
      small -= luckDrainSmall;
      jp += luckConverted * S.luckToJp;
      big += luckConverted * S.luckToBig;
    }
  }

  let heatMissReduced = 0;
  const heatWant = heat * S.heatTransferPerSpin;
  if (heatWant > 0 && miss > 0) {
    heatMissReduced = Math.min(heatWant, miss);
    miss -= heatMissReduced;
    jp += heatMissReduced * S.heatWeightJp;
    big += heatMissReduced * S.heatWeightBig;
    mid += heatMissReduced * S.heatWeightMid;
    atari += heatMissReduced * S.heatWeightAtari;
  }

  const sumWin = potJp + jp + big + mid + atari + small;
  miss = Math.max(0, 1 - sumWin);

  if (characterType === "student") {
    jp += STUDENT_SLOT_LUCK_DELTA.jp;
    big += STUDENT_SLOT_LUCK_DELTA.big;
    small += STUDENT_SLOT_LUCK_DELTA.small;
    const adjSumWin = potJp + jp + big + mid + atari + small;
    miss = Math.max(0, 1 - adjSumWin);
  }

  return {
    potJp,
    jp,
    big,
    mid,
    atari,
    small,
    miss,
    skillMissReduced,
    luckConverted,
    luckDrainAtari,
    luckDrainSmall,
    heatMissReduced,
    heat,
  };
}

/** デイリースロット（技能練習）：ミス以外なら成功（参加費返却＋技量ボーナス対象） */
export function isDailySlotTrainingWin(slotResult) {
  return Boolean(slotResult && slotResult.tier && slotResult.tier !== "miss");
}

function rollWinTierFromRates(r, roll01) {
  const winSum = r.potJp + r.jp + r.big + r.mid + r.atari + r.small;
  if (!(winSum > 0)) return "small";
  let x = roll01 * winSum;
  if (x < r.potJp) return "potJackpot";
  x -= r.potJp;
  if (x < r.jp) return "jackpot";
  x -= r.jp;
  if (x < r.big) return "big";
  x -= r.big;
  if (x < r.mid) return "mid";
  x -= r.mid;
  if (x < r.atari) return "atari";
  return "small";
}

function buildSlotSpinResult(tier, ctx) {
  const {
    machine,
    baseMachine,
    bp,
    sym,
    r,
    bet,
    machineKey,
    pay,
    pityCounterAfter,
    pityForced,
    maxPity,
  } = ctx;
  const reelMachine = machine;
  const defMachine = baseMachine ?? machine;
  const meta = { r, bet, machineKey, pityCounterAfter, pityForced, maxPity };
  switch (tier) {
    case "miss":
      return {
        tier: "miss",
        payout: 0,
        message: "ハズレ…",
        reels: rollMissReelTriple(reelMachine),
        ...meta,
      };
    case "jackpot":
      return {
        tier: "jackpot",
        payout: pay(bp.jackpot),
        message: "🎰 777 超大当たり！",
        reels: [sym[0], sym[0], sym[0]],
        ...meta,
      };
    case "potJackpot": {
      const potSym = getSlotPotSymbol(defMachine);
      return {
        tier: "potJackpot",
        payout: pay(bp.potJackpot ?? 0),
        message: "🏆 POT JP!! ポット全額GET！",
        reels: [potSym, potSym, potSym],
        ...meta,
      };
    }
    case "big": {
      const bar = sym[1] ?? "BAR";
      return {
        tier: "big",
        payout: pay(bp.big),
        message: "BAR 大当たり！！",
        reels: [bar, bar, bar],
        ...meta,
      };
    }
    case "mid":
      return {
        tier: "mid",
        payout: pay(bp.mid),
        message: "⭐ 中当たり！",
        reels: ["⭐", "⭐", "⭐"],
        ...meta,
      };
    case "atari":
      return {
        tier: "atari",
        payout: pay(bp.atari),
        message: "🔔 当たり！",
        reels: ["🔔", "🔔", "🔔"],
        ...meta,
      };
    default:
      return {
        tier: "small",
        payout: pay(bp.small),
        message: "🍒 小当たり",
        reels: ["🍒", "🍒", "🍒"],
        ...meta,
      };
  }
}

/**
 * ハズレ用の視覚3リール。
 * `[rng,rng,rng]` のように独立抽選すると、たまたま3つそろって「的中っぽい」のにハズレ扱いになりがちなので除外する。
 */
function rollMissReelTriple(machine) {
  const sym = machine?.symbols ?? [];
  if (!sym.length) return ["?", "?", "?"];
  if (sym.length === 1) return [sym[0], sym[0], sym[0]];
  for (let g = 0; g < 64; g++) {
    const a = sym[rand(0, sym.length - 1)];
    const b = sym[rand(0, sym.length - 1)];
    const c = sym[rand(0, sym.length - 1)];
    if (!(a === b && b === c)) return [a, b, c];
  }
  const x = sym[rand(0, sym.length - 1)];
  const dif = sym.filter((s) => s !== x);
  const y = dif[rand(0, dif.length - 1)];
  const z = sym[rand(0, sym.length - 1)];
  return [x, z, y];
}

export function spinSlot(
  stats,
  bet = SLOT_COST,
  machineKey = "standard",
  heat = 0,
  characterType = null,
  pityOpts = null,
) {
  const machine = SLOT_MACHINES[machineKey] ?? SLOT_MACHINES.standard;
  const potJackpotEnabled = pityOpts?.potJackpotEnabled === true;
  const reelMachine = slotMachineForReels(machine, potJackpotEnabled);
  const { basePayout: bp, symbols: sym } = machine;
  const r = calcSlotRates(stats, machine, heat, characterType, { potJackpotEnabled });
  if (import.meta.env.DEV && typeof console !== "undefined" && console.log) {
    const Ss = BAL.slot;
    const potLine = potJackpotEnabled ? `POT ${(r.potJp * 100).toFixed(2)}% / ` : "";
    console.log(
      `[スロット確率] 技量によりハズレを${(r.skillMissReduced * 100).toFixed(2)}%削減（${Ss.skillBaseline}超え満${Ss.skillBlockSize}点ごと${(Ss.skillMissReducePerBlock * 100).toFixed(1)}%×中${(Ss.skillToMid * 100).toFixed(0)}%・当${(Ss.skillToAtari * 100).toFixed(0)}%・小${(Ss.skillToSmall * 100).toFixed(0)}%配分） / ` +
        `運により当−${(r.luckDrainAtari * 100).toFixed(2)}%・小−${(r.luckDrainSmall * 100).toFixed(2)}%（計${(r.luckConverted * 100).toFixed(2)}%）をJP30%・大70%へ / ` +
        `熟成でハズレを${(r.heatMissReduced * 100).toFixed(2)}%削減 → ` +
        `${potLine}JP ${(r.jp * 100).toFixed(2)}% ハズレ ${(r.miss * 100).toFixed(2)}%`,
    );
  }

  const pityCounterBefore = pityOpts?.pityCounter ?? 0;
  const maxPity = slotPityMaxThreshold(stats?.virtue);
  const pityForced = pityCounterBefore >= maxPity;
  let ratesForRoll = r;

  // 天井発動スピン：ハズレ率を 0% にして、削れた miss を当たり各役へ比率再配分（POT JP は固定のまま）
  if (pityForced && r.miss > 0) {
    const winSum = r.jp + r.big + r.mid + r.atari + r.small;
    if (winSum > 0) {
      const bonus = r.miss;
      ratesForRoll = {
        ...r,
        miss: 0,
        potJp: r.potJp,
        jp: r.jp + bonus * (r.jp / winSum),
        big: r.big + bonus * (r.big / winSum),
        mid: r.mid + bonus * (r.mid / winSum),
        atari: r.atari + bonus * (r.atari / winSum),
        small: r.small + bonus * (r.small / winSum),
      };
    } else {
      ratesForRoll = { ...r, miss: 0, small: 1 };
    }
  }

  const scale = bet / SLOT_COST;
  const pay = (base) => Math.round(base * scale);

  let tier;
  if (pityForced) {
    tier = rollWinTierFromRates(ratesForRoll, Math.random());
  } else {
    const roll = Math.random();
    let acc = ratesForRoll.miss;
    if (roll < acc) tier = "miss";
    else {
      acc += ratesForRoll.potJp;
      if (roll < acc) tier = "potJackpot";
      else {
        acc += ratesForRoll.jp;
        if (roll < acc) tier = "jackpot";
        else {
          acc += ratesForRoll.big;
          if (roll < acc) tier = "big";
          else {
            acc += ratesForRoll.mid;
            if (roll < acc) tier = "mid";
            else {
              acc += ratesForRoll.atari;
              tier = roll < acc ? "atari" : "small";
            }
          }
        }
      }
    }
  }

  const pityCounterAfter = pityForced ? 0 : pityCounterBefore + 1;
  return buildSlotSpinResult(tier, {
    machine: reelMachine,
    baseMachine: machine,
    bp,
    sym,
    r: ratesForRoll,
    bet,
    machineKey,
    pay,
    pityCounterAfter,
    pityForced,
    maxPity,
  });
}

/**
 * スロット「リーチ」演出フラグ。
 * spinSlot の結果 tier と、演出用に組み替え後の視覚リールのみで決まる。
 * （当選確率・払い戻しとは独立 — UI とアニメーション専用。）
 */
export function getSlotReachAnimationState(visualReels, tier) {
  if (!Array.isArray(visualReels) || visualReels.length !== 3) return { reachPossible: false };
  const a = visualReels[0];
  const b = visualReels[1];
  const c = visualReels[2];
  if (a !== b) return { reachPossible: false };
  const reachWin = ["potJackpot", "jackpot", "big", "mid"].includes(tier);
  const reachTease = tier === "miss" && a !== c;
  return { reachPossible: reachWin || reachTease };
}

/** リーチ確定後に「チャンス！」カットイン画像を見せるか。50%。当否とは無関係。 */
export function rollReachCutInDisplay() {
  return Math.random() < 0.5;
}

export function stripTripleForMiddleColumn(middleSym, machine, columnIndex) {
  const sym = machine.symbols;
  if (!sym.length) return [middleSym, middleSym, middleSym];
  let idx = sym.indexOf(middleSym);
  if (idx < 0) {
    const anchor = sym[Math.min(1, sym.length - 1)] ?? sym[0];
    return stripTripleForMiddleColumn(anchor, machine, columnIndex);
  }
  const len = sym.length;
  const prev = sym[(idx - 1 + len) % len];
  const next = sym[(idx + 1) % len];
  const prev2 = sym[(idx - 2 + len) % len];
  const next2 = sym[(idx + 2) % len];
  const mid = sym[idx];
  const mode = ((columnIndex % 3) + 3) % 3;
  if (mode === 0) return [prev, mid, next];
  if (mode === 1) return [next, mid, prev];
  return [prev2, mid, next2];
}

export function randomStripTriple(machine) {
  const sym = machine.symbols;
  return [sym[rand(0, sym.length - 1)], sym[rand(0, sym.length - 1)], sym[rand(0, sym.length - 1)]];
}

/** `displayReels` プレースホルダ（中段すべて ? → UI 上 777 に見える） */
export function isPlaceholderDisplayReels(dr) {
  return !Array.isArray(dr) || dr.length !== 3 || dr.every((s) => s === "?");
}

/** idle 時の初期表示：中段3つが揃わないランダム絵柄 */
export function defaultIdleDisplayReels(machineKey = "standard", potJackpotEnabled = false) {
  const machine = slotMachineForReels(SLOT_MACHINES[machineKey] ?? SLOT_MACHINES.standard, potJackpotEnabled);
  let mids = randomStripTriple(machine);
  if (mids.length === 3 && mids[0] === mids[1] && mids[1] === mids[2]) {
    mids = [mids[0], mids[1], pickWrongSymbol(mids[0], machine)];
  }
  return mids;
}

export function pickWrongSymbol(correct, machine) {
  const diff = machine.symbols.filter((s) => s !== correct);
  if (!diff.length) return correct;
  return diff[rand(0, diff.length - 1)];
}

export function makePlayer(name, id, characterType, initialStats = null) {
  const char = CHARACTERS[characterType] ?? CHARACTERS.salaryman;
  const startMoney = clampMoney(char.startingMoney ?? BAL.startingMoney);
  if (initialStats && typeof initialStats === "object") {
    return {
      id,
      name,
      characterType,
      streamMultiplier: char.streamMultiplier,
      stats: {
        luck: clamp(initialStats.luck, 0, 999999),
        skill: clamp(initialStats.skill, 0, 2000),
        pon: clamp(initialStats.pon, 0, 999999),
        virtue: clamp(initialStats.virtue, 0, 999999),
        livingCost: Math.max(50, Math.floor(Number(initialStats.livingCost) || 0)),
        money: startMoney,
      },
      position: 0,
      moveTurns: 0,
      movePhase: "moving",
      slotTurnsLeft: 0,
      reservedSlotTurns: 0,
      slotPullsGranted: 0,
      slotPullsThisSeat: 0,
      spinCount: 0,
      slotNet: 0,
      lastMoveEvent: "",
      lastSpinResult: null,
      alive: true,
      isGhost: false,
      isGameOver: false,
      skipTurns: 0,
      amulets: 0,
      slotHeat: 0,
      slotPityCounter: 0,
      debtStreakDaily: 0,
      debtStreakDay8: 0,
      /** タクシー渋滞: 前半移動済み・残マスは次自分ターンで消化 */
      pendingTaxiSteps: 0,
      day8Inventory: {},
      day8ItemUsedThisSeat: false,
      day8SeatEffects: [],
    };
  }

  return {
    id,
    name,
    characterType,
    streamMultiplier: char.streamMultiplier,
    stats: {
      luck: clamp(0 + (char.luckBonus ?? 0), 0, 999999),
      skill: clamp(50 + char.skillBonus, 0, 2000),
      pon: rand(BAL.pon.startMin, BAL.pon.startMax),
      virtue: 50,
      livingCost: dailyLivingCostFor(characterType),
      money: startMoney,
    },
    position: 0,
    moveTurns: 0,
    movePhase: "moving",
    slotTurnsLeft: 0,
    reservedSlotTurns: 0,
    slotPullsGranted: 0,
    slotPullsThisSeat: 0,
    spinCount: 0,
    slotNet: 0,
    lastMoveEvent: "",
    lastSpinResult: null,
    alive: true,
    isGhost: false,
    isGameOver: false,
    skipTurns: 0,
    amulets: 0,
    slotHeat: 0,
    slotPityCounter: 0,
    debtStreakDaily: 0,
    debtStreakDay8: 0,
    pendingTaxiSteps: 0,
    day8Inventory: {},
    day8ItemUsedThisSeat: false,
    day8SeatEffects: [],
  };
}

export function applyRimiruDailyEnd(pl, logs) {
  const m = pl.stats?.money ?? 0;
  if (m >= 0) {
    return { ...pl, debtStreakDaily: 0 };
  }
  let streak = (pl.debtStreakDaily ?? 0) + 1;
  const th = BAL.rimiru.dailyGracesBefore;
  let money = m;
  if (streak >= th) {
    const before = money;
    const rate = 1 + BAL.rimiru.interestPercent / 100;
    money = Math.floor(before * rate);
    streak = 0;
    const inc = Math.round(Math.abs(before) * (BAL.rimiru.interestPercent / 100));
    logs.push(
      `🩸 闇金リリムからの督促：（連続赤字が${th}ターン）高利子+${BAL.rimiru.interestPercent}%——${before}G → ${money}G（増額+${inc}G）`,
    );
  }
  return { ...pl, stats: { ...pl.stats, money: clampMoney(money) }, debtStreakDaily: streak };
}

export function applyRimiruDay8Outgoing(prevIdx, players, logs) {
  return players.map((pl, i) => {
    if (i !== prevIdx) return pl;
    const mm = pl.stats?.money ?? 0;
    if (mm >= 0) {
      return { ...pl, debtStreakDay8: 0 };
    }
    let streak = (pl.debtStreakDay8 ?? 0) + 1;
    const th = BAL.rimiru.day8TurnsBefore;
    let money = mm;
    if (streak >= th) {
      const before = money;
      const rate = 1 + BAL.rimiru.interestPercent / 100;
      money = Math.floor(before * rate);
      streak = 0;
      const inc = Math.round(Math.abs(before) * (BAL.rimiru.interestPercent / 100));
      logs.push(
        `🩸 闇金リリム：『それが増えるんで』連続赤字${th}回の手終わりや—— ${pl.name}の借金 ${before}G → ${money}G (+${inc}G / +${BAL.rimiru.interestPercent}%)`,
      );
    }
    return { ...pl, stats: { ...pl.stats, money: clampMoney(money) }, debtStreakDay8: streak };
  });
}

/** すごろく「ボード上」＝まだゴール前の移動フェーズ（代理スロットの標的候補） */
export function isSugorokuBoardPlaying(p) {
  return !!(p && p.alive !== false && p.movePhase === "moving");
}

export function hasSugorokuBoardTargets(players) {
  return Array.isArray(players) && players.some(isSugorokuBoardPlaying);
}

/**
 * 8日目：プレイヤー手番が完了したか。
 * @param {object} p
 * @param {object[]|null|undefined} allPlayers マルチ幽霊手番判定用（省略時は従来どおり単体扱い）
 */
export function isDay8Done(p, allPlayers) {
  const list = Array.isArray(allPlayers) ? allPlayers : null;
  const multi = list && list.length > 1;

  if (!p) return true;

  if (!p.alive) {
    if (!multi) return true;
    if (!hasSugorokuBoardTargets(list)) return true;
    if (p.ghostActedThisRound) return true;
    if (p.movePhase === "arrived" && (p.slotTurnsLeft ?? 0) > 0) return false;
    return false;
  }

  /** このラウンドの手番は終えた（すごろく上は moving のままでも次の手番へ） */
  if (p.roundHandoffDone) return true;

  if (p.movePhase === "moving") return false;
  if (p.movePhase === "goalLanding") return false;
  if (p.movePhase === "waitingSlot") return false;
  if (p.movePhase === "missed") return true;
  if (p.movePhase === "arrived") return p.slotTurnsLeft <= 0;
  return true;
}

/**
 * 8日目ゲーム全体が終了したか（ラウンド送り roundHandoffDone / ghostActed は無視）。
 * computeAdvanceDay8Turn の results 確定にのみ使用。
 */
export function isDay8GameFinished(p, allPlayers) {
  const list = Array.isArray(allPlayers) ? allPlayers : null;
  const multi = list && list.length > 1;

  if (!p) return true;

  if (!p.alive) {
    if (!multi) return true;
    return !hasSugorokuBoardTargets(list);
  }

  if (p.movePhase === "moving") return false;
  if (p.movePhase === "goalLanding") return false;
  if (p.movePhase === "waitingSlot") return false;
  if (p.movePhase === "missed") return true;
  if (p.movePhase === "arrived") {
    if ((p.slotTurnsLeft ?? 0) > 0) return false;
    return isDay8FinalMoveGoal(p);
  }
  return true;
}

/** 脱落者が標的選び待ちか */
export function isGhostPickTargetPhase(p) {
  return !!(p && p.alive === false && p.movePhase === "ghostPickTarget");
}

/**
 * ゴール到着時の movePhase 決定。スロットは bank せず次手番で都度付与。
 * 最終移動ターン（15T）ゴールはスロットなし。
 * @returns {{ player: object, extraLogs: string[] }}
 */
export function applyGoalArrivalToPlayer(base, autoConfirmMulti = false) {
  const name = base?.name ?? "プレイヤー";
  const finalGoal = isDay8FinalMoveGoal(base);
  const goalCompletePlayer = {
    ...base,
    movePhase: "arrived",
    slotTurnsLeft: 0,
    slotPullsGranted: 0,
    slotPullsThisSeat: 0,
  };

  if (finalGoal) {
    return {
      player: goalCompletePlayer,
      extraLogs: [`${name}: ゴール到着（最終移動ターン — スロット手番なし）`],
    };
  }

  if (!autoConfirmMulti) {
    return {
      player: {
        ...base,
        movePhase: "goalLanding",
        slotTurnsLeft: 0,
        slotPullsGranted: 0,
        slotPullsThisSeat: 0,
      },
      extraLogs: [],
    };
  }

  return {
    player: {
      ...base,
      movePhase: "waitingSlot",
      slotTurnsLeft: 0,
      slotPullsGranted: 0,
      slotPullsThisSeat: 0,
    },
    extraLogs: [`${name}: ゴール到着 — 次の自分の手番でスロット`],
  };
}

/** ゴール到着後の gameState。マルチでは確認省略のうえターン進行まで含める */
export function buildNextGsAfterGoalArrival(gsWithDice, newPlayers, logs, autoConfirmMulti) {
  const withLog = { ...gsWithDice, players: newPlayers, log: prependLogs(logs, gsWithDice.log) };
  if (autoConfirmMulti) {
    return computeAdvanceDay8Turn(withLog, newPlayers, []);
  }
  return withLog;
}

/**
 * ゴール到着確認：自分の movePhase のみ更新（currentPlayerIdx は変えない）。
 * 他プレイヤーのスロット中でも Firestore から単独パッチ可能。
 */
export function applyGoalLandingConfirm(gs, playerId) {
  const players = gs?.players;
  if (!Array.isArray(players) || !playerId) return null;
  const idx = players.findIndex((p) => p.id === playerId);
  if (idx < 0) return null;
  const p = players[idx];
  if (p.movePhase !== "goalLanding") return null;
  let newPlayers;
  let logs;
  if (isDay8FinalMoveGoal(p)) {
    logs = [`${p.name}: ゴール到着（最終移動ターン — スロット手番なし）`];
    newPlayers = players.map((pl, i) =>
      i !== idx
        ? pl
        : {
            ...pl,
            movePhase: "arrived",
            slotTurnsLeft: 0,
            slotPullsGranted: 0,
            slotPullsThisSeat: 0,
          },
    );
  } else {
    logs = [`${p.name}: ゴール到着 — 次の自分の手番でスロット`];
    newPlayers = players.map((pl, i) =>
      i !== idx
        ? pl
        : {
            ...pl,
            movePhase: "waitingSlot",
            slotTurnsLeft: 0,
            slotPullsGranted: 0,
            slotPullsThisSeat: 0,
          },
    );
  }
  return stripLegacySlotFirestoreFields({
    ...gs,
    players: newPlayers,
    log: prependLogs(logs, gs.log),
  });
}

/**
 * 8日目：脱落（人助け即死・テスト用 debugDeath など）。
 * @returns {{ gs: object, markDay8TurnComplete: boolean }|null}
 */
export function getBoardDeathPosition(p, boardGoal = BOARD_GOAL) {
  const pos = Number(p?.position);
  if (!Number.isFinite(pos)) return null;
  const goal = Number(boardGoal);
  const clamped = Math.max(0, Math.floor(pos));
  if (Number.isFinite(goal) && clamped >= goal) return null;
  return clamped;
}

/** 盤上脱落：死亡位置を固定し墓標表示に使う */
export function snapshotDeathOnBoard(pl, boardGoal = BOARD_GOAL) {
  const deathPosition = getBoardDeathPosition(pl, boardGoal);
  if (deathPosition == null) return { ...pl, alive: false };
  return { ...pl, alive: false, deathPosition };
}

export function getBoardTombDisplayPosition(p, boardGoal = BOARD_GOAL) {
  if (p?.alive !== false) return null;
  if (typeof p.deathPosition === "number" && Number.isFinite(p.deathPosition)) {
    const dp = Math.floor(p.deathPosition);
    const goal = Number(boardGoal);
    if (Number.isFinite(goal) && dp >= goal) return null;
    return dp >= 0 ? dp : null;
  }
  return getBoardDeathPosition(p, boardGoal);
}

export function eliminateDay8Player(gs, playerIdx, deathLogLine) {
  const players = gs?.players;
  if (!Array.isArray(players) || !Number.isInteger(playerIdx) || playerIdx < 0 || playerIdx >= players.length) {
    return null;
  }
  const p = players[playerIdx];
  if (p?.alive === false) return null;
  const logs = [deathLogLine];
  if (players.length > 1 && gs.subPhase === "day8") {
    /** 移動中の脱落：この手番だけ進行対象から外し、次プレイヤーへ渡す（代理スロットは後続ローテーション） */
    const playersForAdvance = players.map((pl, i) =>
      i === playerIdx
        ? snapshotDeathOnBoard({ ...pl, movePhase: "spectating", ghostActedThisRound: true })
        : pl,
    );
    const advanced = computeAdvanceDay8Turn(
      { ...gs, currentPlayerIdx: playerIdx, players: playersForAdvance },
      playersForAdvance,
      logs,
    );
    const finalPlayers = advanced.players.map((pl, i) =>
      i === playerIdx
        ? snapshotDeathOnBoard({ ...pl, movePhase: "spectating", ghostActedThisRound: false })
        : pl,
    );
    return {
      gs: { ...advanced, players: finalPlayers },
      markDay8TurnComplete: false,
    };
  }
  const name = p?.name ?? "プレイヤー";
  const pon = p?.stats?.pon ?? 0;
  const newPlayers = players.map((pl, i) =>
    i === playerIdx ? snapshotDeathOnBoard({ ...pl, movePhase: "spectating" }) : pl,
  );
  return {
    gs: {
      ...gs,
      players: newPlayers,
      gamePhase: GAME_PHASE.gameOver,
      gameOverMsg: `${name} はPON${pon}の状態で人助けに失敗し、社会的に抹殺された…`,
      log: prependLogs([`💀 GAME OVER: ${name} / PON${pon}で人助け失敗！`, ...logs], gs.log),
    },
    markDay8TurnComplete: false,
  };
}

/**
 * 借金トラップ発動時：マルチ8日目は脱落（代理スロット）、ソロはゲームオーバー。
 * @returns {{ gs: object, markDay8TurnComplete: boolean }|null}
 */
export function resolveDebtTrapTriggered(gs, playerIdx) {
  const players = gs?.players;
  if (!Array.isArray(players) || !Number.isInteger(playerIdx) || playerIdx < 0 || playerIdx >= players.length) {
    return null;
  }
  const name = players[playerIdx]?.name ?? "プレイヤー";
  const soloMsg = `${name} は借金トラップを踏み、破産してゲームオーバー…`;
  if (players.length > 1 && gs.subPhase === "day8") {
    return eliminateDay8Player(
      gs,
      playerIdx,
      `💀 ${name} は借金トラップを踏み、破産して脱落（代理スロットで他プレイヤーに干渉可能）`,
    );
  }
  const newPlayers = players.map((pl, i) =>
    i === playerIdx ? snapshotDeathOnBoard({ ...pl, movePhase: "spectating" }) : pl,
  );
  return {
    gs: {
      ...gs,
      players: newPlayers,
      gamePhase: GAME_PHASE.gameOver,
      gameOverMsg: soloMsg,
      log: prependLogs([`💀 GAME OVER: ${soloMsg}`], gs.log),
    },
    markDay8TurnComplete: false,
  };
}

/**
 * 標的がいなくなった幽霊手番をスキップして進める。
 * @returns {object|null}
 */
export function skipGhostTurnAllPlayersArrived(gs) {
  const idx = gs?.currentPlayerIdx;
  const players = gs?.players;
  if (!Array.isArray(players) || !Number.isInteger(idx) || idx < 0 || idx >= players.length) return null;
  const p = players[idx];
  if (p.alive !== false || p.movePhase !== "ghostPickTarget") return null; // alive または幽霊でなければ中止
  if (hasSugorokuBoardTargets(players)) return null;
  const logs = [
    "All players have arrived. Spectating mode.",
    `👁 全員がゴール側フェーズへ到着。観戦モード（代理スロットなし）。`,
    `👻 ${p.name}: 手番スキップ`,
  ];
  const newPlayers = players.map((pl, i) =>
    i === idx
      ? { ...pl, movePhase: "spectating", slotTurnsLeft: 0, slotPullsThisSeat: 0, ghostActedThisRound: true }
      : pl,
  );
  return computeAdvanceDay8Turn({ ...gs, players: newPlayers, proxySlotTargetIdx: null }, newPlayers, logs);
}

/** すごろく中の標的がいるが代理選択条件を満たすプレイヤーがいない幽霊手番をスキップ */
export function skipGhostTurnNoPickableProxy(gs) {
  const idx = gs?.currentPlayerIdx;
  const players = gs?.players;
  if (!Array.isArray(players) || !Number.isInteger(idx) || idx < 0 || idx >= players.length) return null;
  const p = players[idx];
  if (p.alive !== false || p.movePhase !== "ghostPickTarget") return null;
  if (!hasSugorokuBoardTargets(players)) return null;
  const logs = [`👻 ${p.name}: 代理標的なし（条件未達）→手番スキップ`];
  const newPlayers = players.map((pl, i) =>
    i === idx
      ? { ...pl, movePhase: "spectating", slotTurnsLeft: 0, slotPullsThisSeat: 0, ghostActedThisRound: true }
      : pl,
  );
  return computeAdvanceDay8Turn({ ...gs, players: newPlayers, proxySlotTargetIdx: null }, newPlayers, logs);
}

/**
 * 幽霊が代理スロットの標的を選び、スロット手番を開始する。
 */
export function pickGhostSlotTarget(gs, targetIdx) {
  const idx = gs.currentPlayerIdx;
  const players = gs.players;
  if (!Array.isArray(players) || !Number.isInteger(idx) || idx < 0 || idx >= players.length) return null;
  const actor = players[idx];
  if (actor.alive !== false || actor.movePhase !== "ghostPickTarget") return null;
  if (!Number.isInteger(targetIdx) || targetIdx < 0 || targetIdx >= players.length || targetIdx === idx) return null;
  const tgt = players[targetIdx];
  if (!canSelectAsProxySlotTarget(tgt)) return null;
  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const pulls = burst;
  const maxBet = computeProxySlotMaxBet(tgt.stats?.money ?? 0);
  const logs = [
    `👻 ${actor.name} → 代理スロット標的: ${tgt.name}（${tgt.stats.money}G・このスピン最大${maxBet}G）`,
  ];
  const newPlayers = players.map((pl, i) => {
    if (i !== idx) return pl;
    return {
      ...pl,
      movePhase: "arrived",
      slotTurnsLeft: pulls,
      reservedSlotTurns: 0,
      slotPullsGranted: pulls,
      slotPullsThisSeat: 0,
    };
  });
  return {
    ...gs,
    players: newPlayers,
    proxySlotTargetIdx: targetIdx,
    log: prependLogs(logs, gs.log),
  };
}

/** 8日目スロット1回分のログ行（1〜3回目・掛け金・当たりのみ） */
export function formatDay8SlotSpinLogLine({
  actorName,
  proxyTargetName = null,
  pullIndex,
  bet,
  message,
  net,
  potPayout = 0,
}) {
  const prefix = proxyTargetName
    ? `【代理→${proxyTargetName}】${actorName} `
    : `${actorName} `;
  let hit = message ?? "？";
  if (potPayout > 0 && !/POT/i.test(hit)) {
    hit = `${hit}（POT +${potPayout}G）`;
  }
  const netStr = `${net >= 0 ? "+" : ""}${net}G`;
  return `${prefix}${pullIndex}回目 ${bet}G → ${hit} 収支${netStr}`;
}

/** 8日目スロット：3スピン（バースト）終了時の資金サマリー */
export function formatDay8SlotBurstMoneyLogLine({ proxyTargetName = null, newMoney }) {
  const label = proxyTargetName ? `${proxyTargetName}の資金` : "資金";
  return `  ${label}${newMoney}G`;
}

/**
 * Firestore トランザクション内：スロット回転開始（spinning）を書き込む。
 * @param {object} freshGs
 * @param {object} ctx
 * @returns {object|null}
 */
export function buildDay8SlotSpinningGs(freshGs, ctx) {
  const { actorIdx, bet, visualReels, machine, reelMachine } = ctx;
  if (!freshGs || freshGs.subPhase !== "day8" || freshGs.gamePhase !== "playing") return null;
  if (!Number.isInteger(actorIdx) || actorIdx < 0 || actorIdx >= freshGs.players.length) return null;
  const actor = freshGs.players[actorIdx];
  if (actor.movePhase !== "arrived") return null;
  if ((freshGs.slotPhase ?? "idle") !== "idle") return null;
  const before = ctx.slotTurnsBefore;
  const liveLeft = actor.slotTurnsLeft ?? 0;
  if (liveLeft !== before) return null;

  const proxyTargetIdx =
    typeof ctx.proxyTargetIdx === "number" && ctx.proxyTargetIdx >= 0 ? ctx.proxyTargetIdx : null;
  if (proxyTargetIdx != null) {
    if (freshGs.proxySlotTargetIdx !== proxyTargetIdx) return null;
    const tgt = freshGs.players[proxyTargetIdx];
    if (!canContinueAsProxySlotTarget(tgt)) return null;
    if (!canProxySlotBetAt(tgt.stats?.money ?? 0, bet)) return null;
  }

  const rm = reelMachine ?? machine;
  const targetResult = slotPaylineMiddlesToTargetIndices(visualReels, rm);
  const { reachPossible } = getSlotReachAnimationState(visualReels, ctx.res?.tier);

  return stripLegacySlotFirestoreFields({
    ...freshGs,
    slotPhase: "spinning",
    activeBet: bet,
    targetResult,
    slotSpinSessionId: createSlotSpinSessionId(),
    slotMirrorMachineKey: machine?.key ?? "standard",
    isReach: reachPossible,
    slotReachCutin: false,
    slotVisualReels: visualReels,
    displayReels: null,
    showSpinResult: false,
    lastPayout: null,
    slotResultSettledAt: null,
  });
}

/**
 * Firestore トランザクション内で呼ぶ：最新 gs にスロット1回分を再適用する。
 * @param {object} freshGs
 * @param {object} ctx
 * @returns {object|null}
 */
export function applyDay8SlotSpinToFreshGameState(freshGs, ctx) {
  const {
    actorIdx,
    proxyTargetIdx,
    bet,
    res,
    newLeft,
    newPullsSeat,
    newSpins,
    newHeat,
    pityAfter,
    visualReels,
    emotionLine,
    machine,
  } = ctx;
  if (!freshGs || freshGs.subPhase !== "day8" || freshGs.gamePhase !== "playing") return null;
  if (!Number.isInteger(actorIdx) || actorIdx < 0 || actorIdx >= freshGs.players.length) return null;
  const actor = freshGs.players[actorIdx];
  if (actor.movePhase !== "arrived") return null;
  const spinPhase = freshGs.slotPhase ?? "idle";
  if (spinPhase !== "spinning" && spinPhase !== "idle") return null;
  const before = ctx.slotTurnsBefore;
  const liveLeft = actor.slotTurnsLeft ?? 0;
  if (liveLeft !== before && liveLeft !== before - 1) return null;
  const appliedLeft = liveLeft === before - 1 ? liveLeft : newLeft;
  const livePulls = actor.slotPullsThisSeat ?? 0;
  const appliedPulls = liveLeft === before - 1 ? Math.max(livePulls, newPullsSeat) : newPullsSeat;
  const appliedSpins = liveLeft === before - 1 ? Math.max(actor.spinCount ?? 0, newSpins) : newSpins;

  if (proxyTargetIdx != null) {
    if (freshGs.proxySlotTargetIdx !== proxyTargetIdx) return null;
    if (
      !Number.isInteger(proxyTargetIdx) ||
      proxyTargetIdx < 0 ||
      proxyTargetIdx >= freshGs.players.length ||
      proxyTargetIdx === actorIdx
    )
      return null;
    const tgt = freshGs.players[proxyTargetIdx];
    if (!canContinueAsProxySlotTarget(tgt)) return null;
    if (!canProxySlotBetAt(tgt.stats?.money ?? 0, bet)) return null;
  }

  const potPayout = Math.max(0, Math.floor(Number(ctx.potPayout) || 0));
  let grossPayout = res.payout + potPayout;
  const payoutBonus = applyDay8SlotPayoutBonus(actor, grossPayout, res.tier);
  grossPayout = payoutBonus.grossPayout;
  const net = grossPayout - bet;
  const moneyIdx = proxyTargetIdx != null ? proxyTargetIdx : actorIdx;
  const moneyPlayer = freshGs.players[moneyIdx];
  const newMoney = clampMoney(moneyPlayer.stats.money - bet + grossPayout);

  const batch = [];
  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const burstFinished = appliedPulls >= burst || (appliedLeft <= 0 && appliedPulls > 0);
  if (burstFinished) {
    batch.push(
      formatDay8SlotBurstMoneyLogLine({
        proxyTargetName:
          proxyTargetIdx != null ? freshGs.players[proxyTargetIdx]?.name ?? null : null,
        newMoney,
      }),
    );
  }
  if (payoutBonus.bonus > 0) {
    const pct = payoutBonus.effectMeta
      ? Math.round((Number(payoutBonus.effectMeta.value) - 1) * 100)
      : 0;
    batch.push(`  🎒 ${actor.name}: アイテム効果 +${payoutBonus.bonus}G（当たり+${pct}%）`);
  }
  batch.push(
    formatDay8SlotSpinLogLine({
      actorName: actor.name,
      proxyTargetName:
        proxyTargetIdx != null ? freshGs.players[proxyTargetIdx]?.name ?? null : null,
      pullIndex: appliedPulls,
      bet,
      message: res.message,
      net,
      potPayout,
    }),
  );
  const logs = batch;

  const actorAfterSpin = payoutBonus.player;

  const newPlayers = freshGs.players.map((pl, i) => {
    if (moneyIdx === actorIdx && i === actorIdx) {
      return {
        ...pl,
        day8SeatEffects: actorAfterSpin.day8SeatEffects,
        stats: { ...pl.stats, money: newMoney },
        slotNet: (pl.slotNet ?? 0) + net,
        slotTurnsLeft: appliedLeft,
        slotPullsThisSeat: appliedPulls,
        spinCount: appliedSpins,
        slotHeat: newHeat,
        slotPityCounter: pityAfter,
        lastSpinResult: { ...res, net, spin: appliedSpins, potPayout, grossPayout, visualReels },
      };
    }
    if (i === moneyIdx) {
      return {
        ...pl,
        stats: { ...pl.stats, money: newMoney },
        slotNet: (pl.slotNet ?? 0) + net,
      };
    }
    if (i === actorIdx) {
      return {
        ...pl,
        day8SeatEffects: actorAfterSpin.day8SeatEffects,
        slotTurnsLeft: appliedLeft,
        slotPullsThisSeat: appliedPulls,
        spinCount: appliedSpins,
        slotHeat: newHeat,
        slotPityCounter: pityAfter,
        lastSpinResult: { ...res, net, spin: appliedSpins, potPayout, grossPayout, visualReels },
      };
    }
    return pl;
  });

  return stripLegacySlotFirestoreFields({
    ...freshGs,
    players: newPlayers,
    displayReels: visualReels,
    showSpinResult: false,
    slotPhase: "completed",
    lastPayout: net,
    slotResultSettledAt: Date.now(),
    activeBet: null,
    targetResult: slotPaylineMiddlesToTargetIndices(visualReels, ctx.reelMachine ?? machine),
    slotSpinSessionId:
      spinPhase === "spinning"
        ? freshGs.slotSpinSessionId ?? null
        : createSlotSpinSessionId(),
    slotMirrorMachineKey: machine?.key ?? "standard",
    log: prependLogs(logs, freshGs.log),
  });
}

/** スロット結果反映直後の gs から、必要なら同一手番継続 or 次手番へ進める */
export function advanceDay8AfterSlotSpinShow(gsAfterSpin) {
  return computeAdvanceDay8Turn(gsAfterSpin, gsAfterSpin.players, []);
}

/** 現在席のスロットバーストが終了し、手番を進めてよい状態か */
export function isDay8SlotBurstFinishedOnGameState(gs, actorIdx = gs?.currentPlayerIdx) {
  if (!gs || gs.subPhase !== "day8" || gs.gamePhase !== "playing") return false;
  if (!Number.isInteger(actorIdx) || actorIdx !== gs.currentPlayerIdx) return false;
  const p = gs.players?.[actorIdx];
  if (!p || p.movePhase !== "arrived") return false;
  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const slotLeft = p.slotTurnsLeft ?? 0;
  const pullsSeat = p.slotPullsThisSeat ?? 0;
  const burstSeatDone = pullsSeat >= burst;
  const seatSpunOut = slotLeft <= 0 && pullsSeat > 0;
  if (!burstSeatDone && !seatSpunOut) return false;
  const phase = gs.slotPhase ?? "idle";
  if (phase === "spinning") return false;
  if (shouldDeferDay8SlotTurnAdvanceForMajorWin(gs)) return false;
  return phase === "idle" || phase === "completed";
}

/** 復旧パッチが null でも、バースト終了なら liveGs から手番を進める */
export function resolveDay8SlotBurstAdvance(liveGs) {
  if (!isDay8SlotBurstFinishedOnGameState(liveGs)) return null;
  return advanceDay8AfterSlotSpinShow(liveGs);
}

/**
 * 8日目移動確定（タクシー drive 完了等）：最新 liveGs に移動結果を載せて手番を1つ進める。
 * @param {object} liveGs
 * @param {{ actorId: string, newPlayers: object[], actionLogs: string[], gsWithDice?: object, arrived?: boolean, isMultiplayerRoom?: boolean }} commit
 * @returns {object|null}
 */
export function applyDay8ActorMoveCommit(liveGs, commit) {
  if (!liveGs || !commit?.actorId || !Array.isArray(commit.newPlayers)) return null;
  const idx = liveGs.players?.findIndex((pl) => pl.id === commit.actorId);
  if (idx < 0 || liveGs.currentPlayerIdx !== idx) return null;
  const mergedPlayers = liveGs.players.map((pl, i) =>
    i === idx ? { ...pl, ...commit.newPlayers[idx] } : pl,
  );
  const actionLogs = Array.isArray(commit.actionLogs) ? commit.actionLogs : [];
  const withDice = {
    ...liveGs,
    players: mergedPlayers,
    movementFx: null,
    log: prependLogs(actionLogs, liveGs.log),
    ...(commit.gsWithDice?.lastDiceRolls != null
      ? { lastDiceRolls: commit.gsWithDice.lastDiceRolls }
      : {}),
  };
  if (commit.arrived) {
    return buildNextGsAfterGoalArrival(
      withDice,
      mergedPlayers,
      [],
      commit.isMultiplayerRoom === true,
    );
  }
  return computeAdvanceDay8Turn(withDice, mergedPlayers, []);
}

/**
 * タクシー＋マス効果スライドの中間地点（1区画目 drive 完了時）。
 * @param {object} liveGs
 * @param {{ actorId: string, newPlayers: object[], actionLogs: string[], gsWithDice?: object, tileSlide?: { landedDice: number } }} commit
 * @returns {object|null}
 */
export function applyDay8TaxiIntermediateCommit(liveGs, commit) {
  if (!liveGs || !commit?.tileSlide || !commit?.actorId) return null;
  const idx = liveGs.players?.findIndex((pl) => pl.id === commit.actorId);
  if (idx < 0 || liveGs.currentPlayerIdx !== idx) return null;
  const landedDice = commit.tileSlide.landedDice;
  const final = commit.newPlayers[idx];
  if (!final) return null;
  const mergedPlayers = liveGs.players.map((pl, i) =>
    i === idx
      ? {
          ...pl,
          ...final,
          position: landedDice,
          stats: final.stats ?? pl.stats,
        }
      : pl,
  );
  return {
    ...liveGs,
    players: mergedPlayers,
    movementFx: null,
    log: prependLogs(commit.actionLogs ?? [], liveGs.log),
    ...(commit.gsWithDice?.lastDiceRolls != null
      ? { lastDiceRolls: commit.gsWithDice.lastDiceRolls }
      : {}),
  };
}

/**
 * リロード等でローカル確認が失われたときの 8日目スロット復旧。
 * @returns {{ kind: "resetSync"|"advanceTurn", gs: object }|null}
 */
export function buildDay8SlotReloadRecoveryPatch(gs, opts = {}) {
  if (!gs || gs.subPhase !== "day8" || gs.gamePhase !== "playing") return null;
  const idx = Number.isInteger(opts.actorIdx) ? opts.actorIdx : gs.currentPlayerIdx;
  if (idx !== gs.currentPlayerIdx) return null;
  const p = gs.players?.[idx];
  if (!p || p.movePhase !== "arrived") return null;

  const phase = gs.slotPhase ?? "idle";
  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const slotLeft = p.slotTurnsLeft ?? 0;
  const pullsSeat = p.slotPullsThisSeat ?? 0;
  const canContinueBurst = slotLeft > 0 && pullsSeat < burst;
  const burstSeatDone = pullsSeat >= burst;
  const seatSpunOut = slotLeft <= 0 && pullsSeat > 0;

  if (phase === "spinning") {
    return { kind: "resetSync", gs: mergeDay8SlotIdleSync(gs) };
  }

  if (phase === "completed") {
    if (canContinueBurst) {
      return { kind: "resetSync", gs: mergeDay8SlotIdleSync(gs) };
    }
    if (shouldDeferDay8SlotTurnAdvanceForMajorWin(gs)) {
      return {
        kind: "deferAdvance",
        retryAfterMs: day8SlotMajorWinAdvanceRemainingMs(gs),
      };
    }
    return { kind: "advanceTurn", gs: advanceDay8AfterSlotSpinShow(gs) };
  }

  if (phase === "idle" && (burstSeatDone || seatSpunOut)) {
    if (shouldDeferDay8SlotTurnAdvanceForMajorWin(gs)) {
      return {
        kind: "deferAdvance",
        retryAfterMs: day8SlotMajorWinAdvanceRemainingMs(gs),
      };
    }
    return { kind: "advanceTurn", gs: advanceDay8AfterSlotSpinShow(gs) };
  }

  return null;
}

export function rankLabel(money) {
  if (money >= 30000) return "SS";
  if (money >= 15000) return "S";
  if (money >= 8000) return "A";
  if (money >= 4000) return "B";
  return "C";
}

export function finalizeToResults(gs, playersOverride) {
  const players = playersOverride ?? gs.players;
  let withHistory = finalizeDay8AssetHistory(gs, players);
  const moreLogs = [
    ...players.filter((p) => p.alive).map(
      (p) => `${p.name}: 最終資金 ${p.stats.money}G / ランク ${rankLabel(p.stats.money)}`,
    ),
    "━━━ 8日目終了！全員完了 ━━━",
    "━━━ 最終結果 ───",
  ];
  const next = {
    ...withHistory,
    ...SLOT_SYNC_DEFAULTS,
    players,
    gamePhase: GAME_PHASE.results,
    subPhase: SUB_PHASE.daily,
    log: prependLogs(moreLogs, gs.log),
  };
  delete next.finalBattleStartedAt;
  delete next.finalBattleEntry;
  return stripLegacySlotFirestoreFields(next);
}

/**
 * remainingTurns が 0 のとき、まだ moving のプレイヤーをタイムアウト扱いにし、
 * 全員完了なら結果画面へ、そうでなければ手番を進める。
 */
export function resolveDay8RoundExhaustion(gs, remainingTurns, extraLogs = []) {
  if (remainingTurns > 0) return gs;
  if (gs?.gamePhase !== "playing" || gs?.subPhase !== "day8") return gs;

  const logs = [...extraLogs];
  const players = (gs.players ?? []).map((p) => {
    if (p?.alive === false) return p;
    if (p?.movePhase === "moving") {
      if (logs.length === extraLogs.length) {
        logs.push(`⏰ 移動ターン上限（${BAL.dice.maxTurns}ターン）到達`);
      }
      return {
        ...p,
        movePhase: "missed",
        slotTurnsLeft: 0,
        reservedSlotTurns: 0,
        slotPullsGranted: 0,
        slotPullsThisSeat: 0,
      };
    }
    return p;
  });

  const patched = { ...gs, players };
  if (players.every((pl) => isDay8Done(pl, players))) {
    return finalizeToResults({ ...patched, log: prependLogs(logs, gs.log) }, players);
  }
  return computeAdvanceDay8Turn(patched, players, logs);
}

function shuffleSugorokuTileKinds(arr) {
  const x = arr.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = x[i];
    x[i] = x[j];
    x[j] = t;
  }
  return x;
}

/** インデックス 0 と BOARD_GOAL は常に NEUTRAL。スタート／ゴール除くマスへ効果割当 */
export function generateSugorokuTileEffects() {
  const SG = BAL.sugorokuTiles;
  const tiles = Array.from({ length: BOARD_GOAL + 1 }, () => ({ kind: TILE_EFFECT_KIND.NEUTRAL }));
  const innerCount = BOARD_GOAL - 1;
  if (innerCount <= 0) return tiles;

  const ratioNeutral = SG.neutralRatio ?? 0.2;
  const ratioGood = SG.goodRatio ?? 0.35;
  const ratioBad = SG.badRatio ?? 0.35;
  const ratioDebtTrap = SG.debtTrapRatio ?? 0.1;

  let nNeutral = Math.round(innerCount * ratioNeutral);
  let nGood = Math.round(innerCount * ratioGood);
  let nBad = Math.round(innerCount * ratioBad);
  let nDebtTrap = Math.round(innerCount * ratioDebtTrap);
  let sum = nNeutral + nGood + nBad + nDebtTrap;
  while (sum > innerCount) {
    if (nBad > 0) nBad -= 1;
    else if (nGood > 0) nGood -= 1;
    else if (nDebtTrap > 0) nDebtTrap -= 1;
    else if (nNeutral > 0) nNeutral -= 1;
    sum = nNeutral + nGood + nBad + nDebtTrap;
  }
  while (sum < innerCount) {
    nBad += 1;
    sum = nNeutral + nGood + nBad + nDebtTrap;
  }

  const kindsBag = [];
  for (let i = 0; i < nNeutral; i++) kindsBag.push(TILE_EFFECT_KIND.NEUTRAL);
  for (let i = 0; i < nDebtTrap; i++) kindsBag.push(TILE_EFFECT_KIND.DEBT_TRAP);
  // Good 35%: money:move = 5:5
  const nGoodMoney = Math.floor(nGood / 2);
  const nGoodMove = nGood - nGoodMoney;
  for (let i = 0; i < nGoodMoney; i++) kindsBag.push(TILE_EFFECT_KIND.GAIN_MONEY);
  for (let i = 0; i < nGoodMove; i++) kindsBag.push(TILE_EFFECT_KIND.MOVE_FORWARD);
  // Bad 35%: money:move:pon = 4:5:1
  const nBadMoney = Math.round(nBad * 0.4);
  const nBadMove = Math.round(nBad * 0.5);
  const nBadPon = Math.max(0, nBad - nBadMoney - nBadMove);
  for (let i = 0; i < nBadMoney; i++) kindsBag.push(TILE_EFFECT_KIND.LOSE_MONEY);
  for (let i = 0; i < nBadMove; i++) kindsBag.push(TILE_EFFECT_KIND.MOVE_BACKWARD);
  for (let i = 0; i < nBadPon; i++) kindsBag.push(TILE_EFFECT_KIND.INCREASE_PON);
  while (kindsBag.length < innerCount) kindsBag.push(TILE_EFFECT_KIND.NEUTRAL);
  while (kindsBag.length > innerCount) kindsBag.pop();
  const shuffledBag = shuffleSugorokuTileKinds(kindsBag);

  const rollValue = (kind) => {
    switch (kind) {
      case TILE_EFFECT_KIND.MOVE_FORWARD:
        return rand(SG.moveForwardMin, SG.moveForwardMax);
      case TILE_EFFECT_KIND.MOVE_BACKWARD:
        return rand(SG.moveBackwardMin, SG.moveBackwardMax);
      case TILE_EFFECT_KIND.GAIN_MONEY:
        return rand(SG.gainMoneyMin, SG.gainMoneyMax);
      case TILE_EFFECT_KIND.LOSE_MONEY:
        return rand(SG.loseMoneyMin, SG.loseMoneyMax);
      case TILE_EFFECT_KIND.INCREASE_PON:
        return rand(SG.ponIncreaseMin, SG.ponIncreaseMax);
      default:
        return 0;
    }
  };

  let bi = 0;
  for (let pos = 1; pos <= BOARD_GOAL - 1; pos++) {
    const kind = shuffledBag[bi++];
    if (kind === TILE_EFFECT_KIND.NEUTRAL || kind === TILE_EFFECT_KIND.DEBT_TRAP) {
      tiles[pos] = { kind };
    } else {
      tiles[pos] = { kind, value: rollValue(kind) };
    }
  }
  if (SUGOROKU_VERIFY_DEATH_TEST_TRAP_FIRST_N > 0) {
    const trapEnd = Math.min(SUGOROKU_VERIFY_DEATH_TEST_TRAP_FIRST_N, BOARD_GOAL - 1);
    for (let pos = 1; pos <= trapEnd; pos++) {
      tiles[pos] = { kind: TILE_EFFECT_KIND.DEBT_TRAP };
    }
  }
  return tiles;
}

/**
 * 借金トラップ脱落前：移動結果だけ liveGs に載せる（手番進行は脱落処理側）。
 */
export function applyDay8LandingStateToLive(liveGs, commit) {
  if (!liveGs || !commit?.actorId || !Array.isArray(commit.newPlayers)) return null;
  const idx = liveGs.players?.findIndex((pl) => pl.id === commit.actorId);
  if (idx < 0 || liveGs.currentPlayerIdx !== idx) return null;
  const mergedPlayers = liveGs.players.map((pl, i) =>
    i === idx ? { ...pl, ...commit.newPlayers[idx] } : pl,
  );
  const actionLogs = Array.isArray(commit.actionLogs) ? commit.actionLogs : [];
  return {
    ...liveGs,
    players: mergedPlayers,
    movementFx: null,
    log: prependLogs(actionLogs, liveGs.log),
    ...(commit.gsWithDice?.lastDiceRolls != null
      ? { lastDiceRolls: commit.gsWithDice.lastDiceRolls }
      : {}),
  };
}

/** 盤効果リストが無い／長さ不正のときのみ生成してマージ */
export function ensureSugorokuTileEffects(gs) {
  const need = BOARD_GOAL + 1;
  const cur = gs?.sugorokuTileEffects;
  if (Array.isArray(cur) && cur.length === need) return gs;
  return { ...gs, sugorokuTileEffects: generateSugorokuTileEffects() };
}

export function enterDay8AfterFinalBattleCue(gs) {
  const p0 = gs.players[0];
  const head = `${p0.name}の移動ターン（T1 / ${BOARD_GOAL}マス先へ！）`;
  const banner = "━━━ 8日目！全員で交互に移動＆スロット ━━━";
  const withDay7Snapshot = snapshotDailyEndAllPlayers(gs, LAST_DAILY_DAY, gs.players);
  const day8Players = grantDay8StartInventoryToPlayers(
    (withDay7Snapshot.players ?? gs.players ?? []).map((pl) => {
    if (pl.alive === false) {
      return { ...pl, roundHandoffDone: false, ghostActedThisRound: false };
    }
    return {
      ...pl,
      position: 0,
      moveTurns: 0,
      movePhase: "moving",
      roundHandoffDone: false,
      ghostActedThisRound: false,
      pendingTaxiSteps: 0,
      slotTurnsLeft: 0,
      reservedSlotTurns: 0,
      slotPullsGranted: 0,
      slotPullsThisSeat: 0,
      lastMoveEvent: "",
    };
  }),
  );
  const next = {
    ...ensureSugorokuTileEffects(withDay7Snapshot),
    ...SLOT_SYNC_DEFAULTS,
    ...DAILY_SLOT_SYNC_DEFAULTS,
    ...DAILY_CUTIN_SYNC_DEFAULTS,
    gamePhase: GAME_PHASE.playing,
    subPhase: SUB_PHASE.day8,
    currentPlayerIdx: 0,
    players: day8Players,
    aidAvailable: Math.random() < BAL.dice.helpChance,
    taxiAvailable: Math.random() < BAL.dice.taxiChance,
    lastDiceRolls: [],
    recentPonEvent: null,
    showSpinResult: false,
    displayReels: defaultIdleDisplayReels("standard", (day8Players.length ?? 0) > 1),
    proxySlotTargetIdx: null,
  };
  delete next.finalBattleStartedAt;
  delete next.finalBattleEntry;
  delete next.dailyActionFx;
  next.log = prependLogs([head, banner, formatDay8StartGrantLog()], gs.log);
  return next;
}

export function initialGameState(playerSlots) {
  const players = playerSlots.map((s) => {
    const char = s.character ?? "salaryman";
    const rolls = normalizeSlotInitialRolls(s.initialRolls);
    const legacyPreset = normalizeSlotInitialStats(s.initialStats);
    let preset = null;
    if (rolls) {
      preset = computeFinalStatsFromInitialRolls(rolls, char);
    } else if (legacyPreset) {
      preset = legacyPreset;
    } else {
      preset = rollSlotInitialStatsForGameStart(char);
    }
    return makePlayer(s.name, s.id, char, preset);
  });
  const logs = [
    serializeLogEntry(buildDayHeaderEntry(1)),
    serializeLogEntry(buildTurnHandoffEntry(players[0].name, 1)),
    `━━━ ゲーム開始！${players.length === 1 ? "ソロ" : `${players.length}人`}プレイ ━━━`,
    ...players.map((p) => {
      const c = CHARACTERS[p.characterType];
      const lc = livingCostForPlayer(p);
      return `${p.name}(${c?.emoji ?? ""}${c?.label ?? ""}): PON=${p.stats.pon} 運=${p.stats.luck} 技量=${p.stats.skill} 善行=${p.stats.virtue} 生活費=${lc}G`;
    }),
  ];
  return {
    players,
    currentDay: 1,
    currentPlayerIdx: 0,
    subPhase: SUB_PHASE.daily,
    gamePhase: GAME_PHASE.playing,
    log: logs,
    aidAvailable: false,
    taxiAvailable: false,
    recentPonEvent: null,
    gameOverMsg: "",
    showSpinResult: false,
    lastDiceRolls: [],
    displayReels: defaultIdleDisplayReels("standard", players.length > 1),
    proxySlotTargetIdx: null,
    ...SLOT_SYNC_DEFAULTS,
    assetHistory: createEmptyAssetHistory(players.map((p) => p.id)),
  };
}

export function computeAdvanceDaily(gs, newPlayers, extraLogs) {
  const n = newPlayers.length;
  const nextIdx = gs.currentPlayerIdx + 1;
  let moreLogs = [];
  let patch = {};

  const acting = newPlayers[gs.currentPlayerIdx];
  let nextGs = gs;
  if (acting?.id && typeof acting.stats?.money === "number") {
    nextGs = recordDailyMoney(nextGs, acting.id, gs.currentDay, acting.stats.money);
  }

  if (nextIdx >= n) {
    nextGs = snapshotDailyEndAllPlayers(nextGs, gs.currentDay, newPlayers);
    const nextDay = gs.currentDay + 1;
    if (nextDay > LAST_DAILY_DAY) {
      const startedAt = Date.now();
      moreLogs = ["育成フェーズ、終幕――いま、参道の向こうに決戦が待つ。", "── 【決戦の日】 ──"];
      patch = {
        currentDay: nextDay,
        currentPlayerIdx: 0,
        subPhase: SUB_PHASE.finalBattle,
        gamePhase: GAME_PHASE.finalBattle,
        finalBattleStartedAt: startedAt,
        finalBattleEntry: "preDay8",
      };
    } else {
      moreLogs = [
        serializeLogEntry(buildDayDividerEntry(nextDay)),
        serializeLogEntry(buildDayHeaderEntry(nextDay)),
        serializeLogEntry(buildTurnHandoffEntry(newPlayers[0].name, nextDay)),
      ];
      patch = { currentDay: nextDay, currentPlayerIdx: 0 };
    }
  } else {
    moreLogs = [
      serializeLogEntry(buildTurnHandoffEntry(newPlayers[nextIdx].name, gs.currentDay)),
    ];
    patch = { currentPlayerIdx: nextIdx };
  }

  return {
    ...nextGs,
    ...patch,
    players: newPlayers,
    log: prependLogs([...extraLogs, ...moreLogs], gs.log),
  };
}

export function computeAdvanceDay8Turn(gs, newPlayers, extraLogs) {
  /** この手番でまだ slotsPerSugorokuTurn 未満なら同一プレイヤー。達するか総プル0で outgoing＆次手番へ */
  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const stayIdx = gs.currentPlayerIdx;
  const stayP = newPlayers[stayIdx];
  const slotLeft = stayP?.slotTurnsLeft ?? 0;
  const pullsSeat = stayP?.slotPullsThisSeat ?? 0;
  if (stayP?.movePhase === "arrived" && slotLeft > 0 && pullsSeat < burst) {
    return stripLegacySlotFirestoreFields({
      ...gs,
      ...SLOT_SYNC_DEFAULTS,
      players: newPlayers,
      showSpinResult: false,
      log: prependLogs(extraLogs, gs.log),
    });
  }

  /** moveTurns は App 側のラウンド完了時（completedPlayers 全員完了）でのみ進める。 */
  let playersForOutgoing = newPlayers;
  if (stayP?.movePhase === "arrived" && stayP?.alive === false) {
    playersForOutgoing = newPlayers.map((pl, i) =>
      i !== stayIdx
        ? pl
        : { ...pl, movePhase: "spectating", slotTurnsLeft: 0, slotPullsThisSeat: 0, ghostActedThisRound: true },
    );
  }

  const rimiruLogs = [];
  let playersWithInterest = applyRimiruDay8Outgoing(gs.currentPlayerIdx, playersForOutgoing, rimiruLogs);
  const extraMerged = [...extraLogs, ...rimiruLogs];

  /** スロット手番終了後、次の自分枠までこの手番用カウンタをリセット */
  const outgoingTimelineKind = (stayP?.slotPullsThisSeat ?? 0) > 0 ? "slot" : "move";
  playersWithInterest = playersWithInterest.map((pl, i) => {
    let next = i !== gs.currentPlayerIdx ? pl : { ...pl, slotPullsThisSeat: 0 };
    if (i === gs.currentPlayerIdx) {
      next = releaseDay8PlayerToWaitingSlotAfterBurst(next);
    }
    return next;
  });

  const n = playersWithInterest.length;
  let nextIdx = (gs.currentPlayerIdx + 1) % n;
  for (let i = 0; i < n; i++) {
    if (nextIdx === stayIdx) {
      nextIdx = (nextIdx + 1) % n;
      continue;
    }
    if (!isDay8Done(playersWithInterest[nextIdx], playersWithInterest)) break;
    nextIdx = (nextIdx + 1) % n;
  }

  let playersNext = playersWithInterest.map((pl, i) => {
    if (i !== nextIdx) return pl;
    let nextPl = resetDay8ItemSeatForPlayer(pl);
    if (
      nextPl.alive === false &&
      hasSugorokuBoardTargets(playersWithInterest) &&
      !nextPl.ghostActedThisRound
    ) {
      if (nextPl.movePhase === "arrived" && (nextPl.slotTurnsLeft ?? 0) > 0) return nextPl;
      return {
        ...nextPl,
        movePhase: "ghostPickTarget",
        slotTurnsLeft: 0,
        slotPullsThisSeat: 0,
        slotPullsGranted: 0,
        pendingTaxiSteps: 0,
        skipTurns: 0,
      };
    }
    if (nextPl.alive === false && nextPl.movePhase !== "spectating" && nextPl.movePhase !== "arrived") {
      return {
        ...nextPl,
        movePhase: "spectating",
        slotTurnsLeft: 0,
        slotPullsThisSeat: 0,
      };
    }
    return nextPl;
  });

  const nextP = playersNext[nextIdx];
  let nextLog;
  if (isGhostPickTargetPhase(nextP)) {
    nextLog = `👻 ${nextP.name}の代理スロット — すごろく中の標的を選んでください`;
  } else if (nextP.movePhase === "arrived") {
    nextLog = `${nextP.name}のスロットターン（残り${nextP.slotTurnsLeft}回 / 資金${nextP.stats.money}G）`;
  } else if (nextP.movePhase === "waitingSlot") {
    nextLog = null;
  } else {
    nextLog = `${nextP.name}の移動ターン（T${nextP.moveTurns + 1} / ${nextP.position}/${BOARD_GOAL}マス）`;
  }

  const turn = resolveDay8HistoryTurn(playersWithInterest);
  let gsWithHistory = gs;
  if (turn != null) {
    gsWithHistory = snapshotDay8TurnEndAllPlayers(
      gs,
      turn,
      playersWithInterest,
      outgoingTimelineKind,
    );
  }

  return stripLegacySlotFirestoreFields({
    ...gsWithHistory,
    ...SLOT_SYNC_DEFAULTS,
    players: playersNext,
    currentPlayerIdx: nextIdx,
    proxySlotTargetIdx: null,
    aidAvailable: Math.random() < BAL.dice.helpChance,
    taxiAvailable: Math.random() < BAL.dice.taxiChance,
    lastDiceRolls: [],
    showSpinResult: false,
    displayReels: defaultIdleDisplayReels(
      gsWithHistory.slotMirrorMachineKey ?? "standard",
      (playersWithInterest?.length ?? 0) > 1,
    ),
    log: prependLogs([...extraMerged, ...(nextLog ? [nextLog] : [])], gs.log),
  });
}

/**
 * ダイス（またはタクシー）移動で止まったマスの効果のみ適用。
 * 「進む／戻る」で移動した先のマスでは効果は発動しない（連鎖なし）。
 * tiles[pos] が undefined のとき neutral として扱う。
 */
export function applySugorokuTileLandingChain(tiles, startPosIn, moverStatsIn, playerName, logs) {
  const SG = BAL.sugorokuTiles;
  let pos = Math.max(0, Math.min(BOARD_GOAL, startPosIn));
  const stats = { ...moverStatsIn };
  /** トースト用短文（ユーザー向け） */
  const popupTitles = [];

  const pushFx = (lineJa, toastLine) => {
    logs.push(lineJa);
    if (toastLine) popupTitles.push(toastLine);
  };

  if (pos <= 0 || pos >= BOARD_GOAL) {
    return {
      finalPos: pos,
      stats,
      popupTitles,
      debtTrapTriggered: false,
      kind: TILE_EFFECT_KIND.NEUTRAL,
      moneyDelta: 0,
      ponDelta: 0,
    };
  }

  const def = tiles[pos];
  const kind = def?.kind ?? TILE_EFFECT_KIND.NEUTRAL;
  if (kind === TILE_EFFECT_KIND.NEUTRAL) {
    return {
      finalPos: pos,
      stats,
      popupTitles,
      debtTrapTriggered: false,
      kind: TILE_EFFECT_KIND.NEUTRAL,
      moneyDelta: 0,
      ponDelta: 0,
    };
  }

  let moneyDelta = 0;
  let ponDelta = 0;

  const vRaw = typeof def?.value === "number" && Number.isFinite(def.value) ? def.value : null;
  switch (kind) {
    case TILE_EFFECT_KIND.MOVE_FORWARD: {
      const n = vRaw ?? rand(SG.moveForwardMin, SG.moveForwardMax);
      pushFx(`  🔰 マス効果 (${pos})：進行マスで +${n} 進む`, `${n}マス進む`);
      pos = Math.min(BOARD_GOAL, pos + n);
      break;
    }
    case TILE_EFFECT_KIND.MOVE_BACKWARD: {
      const n = vRaw ?? rand(SG.moveBackwardMin, SG.moveBackwardMax);
      pushFx(`  🔰 マス効果 (${pos})：転がり坂で −${n} 戻る`, `${n}マス戻る`);
      pos = Math.max(0, pos - n);
      break;
    }
    case TILE_EFFECT_KIND.GAIN_MONEY: {
      const n = vRaw ?? rand(SG.gainMoneyMin, SG.gainMoneyMax);
      moneyDelta = n;
      stats.money = clampMoney(stats.money + n);
      pushFx(`  🔰 マス効果 (${pos})：ひろい金で +${n}G→${stats.money}G`);
      break;
    }
    case TILE_EFFECT_KIND.LOSE_MONEY: {
      const n = vRaw ?? rand(SG.loseMoneyMin, SG.loseMoneyMax);
      moneyDelta = -n;
      stats.money = clampMoney(stats.money - n);
      pushFx(`  🔰 マス効果 (${pos})：落とし穴で −${n}G→${stats.money}G`);
      break;
    }
    case TILE_EFFECT_KIND.INCREASE_PON: {
      const n = vRaw ?? rand(SG.ponIncreaseMin, SG.ponIncreaseMax);
      ponDelta = n;
      stats.pon = clamp(stats.pon + n);
      pushFx(`  🔰 マス効果 (${pos})：炎上予約で +PON ${n}%→${stats.pon}`, `PON+${n}%`);
      break;
    }
    case TILE_EFFECT_KIND.DEBT_TRAP: {
      if ((stats.money ?? 0) < 0) {
        pushFx(`  ☠ 借金トラップ発動！借金中で破産…`, "☠ 破産");
        return {
          finalPos: pos,
          stats,
          popupTitles,
          debtTrapTriggered: true,
          kind,
          moneyDelta: 0,
          ponDelta: 0,
        };
      }
      pushFx(`  ☠ 借金トラップだったが、借金していなかったから何もなかった...`, "☠ 借金なし・無効");
      break;
    }
    default:
      break;
  }

  return { finalPos: pos, stats, popupTitles, debtTrapTriggered: false, kind, moneyDelta, ponDelta };
}

/**
 * Dice／タクシー直後マスでのスプラッシュ処理の有無に応じ、タイル効果を合成して mover を更新した players を返す。
 */
export function resolveDay8LandingWithTiles(gs, moverIdx, landedPosDice, moverStatsSnapshot, logs, options = {}) {
  const ponSplashDamage = !!options.ponSplashDamage;
  /** タクシー移動はマス効果（タイル）の判定を受けない */
  const skipTileEffects = !!options.skipTileEffects;
  const ensured = ensureSugorokuTileEffects(gs);
  const tiles = ensured.sugorokuTileEffects;

  const phantom = gs.players.map((pl, i) =>
    i === moverIdx ? { ...pl, stats: { ...moverStatsSnapshot }, position: landedPosDice } : { ...pl },
  );
  const afterSplash = ponSplashDamage ? applySplashDamage(moverIdx, phantom, logs) : phantom;

  const mover = afterSplash[moverIdx];
  const chain = skipTileEffects
    ? { finalPos: landedPosDice, stats: { ...mover.stats }, popupTitles: [], debtTrapTriggered: false }
    : applySugorokuTileLandingChain(tiles, landedPosDice, { ...mover.stats }, mover.name, logs);

  const playersOut = afterSplash.map((pl, i) =>
    i === moverIdx ? { ...pl, stats: chain.stats, position: chain.finalPos } : pl,
  );

  const tileToast =
    chain.popupTitles.length > 0
      ? { lines: chain.popupTitles }
      : null;

  const hasTileFxPresentation =
    chain.popupTitles.length > 0 || (chain.moneyDelta ?? 0) !== 0 || (chain.ponDelta ?? 0) !== 0;

  const tileEffectMeta = hasTileFxPresentation
      ? {
          titles: chain.popupTitles,
          kind: chain.kind,
          moneyDelta: chain.moneyDelta ?? 0,
          ponDelta: chain.ponDelta ?? 0,
        }
      : null;

  const playersAtLanding = playersOut.map((pl, i) => {
    if (i !== moverIdx) return pl;
    let stats = { ...pl.stats };
    if (chain.moneyDelta) stats.money = clampMoney(stats.money - chain.moneyDelta);
    if (chain.ponDelta) stats.pon = clamp(stats.pon - chain.ponDelta);
    return { ...pl, stats, position: landedPosDice };
  });

  return {
    gsWithTiles: ensured,
    players: playersOut,
    playersAtLanding,
    tileToast,
    tileEffectMeta,
    gameOverByDebt: chain.debtTrapTriggered
      ? {
          triggered: true,
          message: `${mover.name} は借金トラップを踏み、破産してゲームオーバー…`,
        }
      : null,
  };
}

/** タクシー走行カメラ補間など用（t を 0〜1 にクランプ） */
export function easeInOutCubic(t) {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

/**
 * タクシー drive フェーズの長さ（ms）。移動マス数に応じておおよそ 2.2〜3.2 秒。
 */
export function computeTaxiDriveDurationMs(deltaCells) {
  const d = Math.abs(deltaCells);
  const ms = 2000 + d * 55;
  return Math.round(Math.min(3200, Math.max(2200, ms)));
}

/** BoardViewport のホップ補間と同じドラム式（マス効果の追いマスを書き込むタイミングと同期） */
const SUGOROKU_HOP_MAX_STEPS_FOR_DURATION = 20;
const SUGOROKU_HOP_SETTLE_PADDING_MS = 300;
/** 通常移動（〜6マス）の1マスあたり ms */
export const SUGOROKU_MS_PER_STEP_NORMAL = 360;
/** 長距離移動の速度上限：通常の最大1.5倍速（= ms/マスの下限） */
export const SUGOROKU_MAX_SPEED_MULTIPLIER = 1.5;
export const SUGOROKU_MS_PER_STEP_MIN = Math.round(
  SUGOROKU_MS_PER_STEP_NORMAL / SUGOROKU_MAX_SPEED_MULTIPLIER,
);
const SUGOROKU_FAST_RAMP_FULL_STEPS = SUGOROKU_HOP_MAX_STEPS_FOR_DURATION;

/**
 * マス数に応じた1マスあたりの移動時間（ms）。
 * 7マス以上は徐々に速くなるが、通常の1.5倍速（240ms/マス）を上限とする。
 */
export function computeSugorokuMsPerStep(absStepCount) {
  const steps = Math.max(0, Math.abs(absStepCount));
  if (steps <= 6) return SUGOROKU_MS_PER_STEP_NORMAL;
  const t = Math.min(1, (steps - 6) / (SUGOROKU_FAST_RAMP_FULL_STEPS - 6));
  return Math.round(
    SUGOROKU_MS_PER_STEP_NORMAL - t * (SUGOROKU_MS_PER_STEP_NORMAL - SUGOROKU_MS_PER_STEP_MIN),
  );
}

export function computeSugorokuHopDurationMs(from, to) {
  const diff = to - from;
  const abs = Math.abs(diff);
  const steps = Math.min(abs, SUGOROKU_HOP_MAX_STEPS_FOR_DURATION);
  const msPerStep = computeSugorokuMsPerStep(abs);
  return steps * msPerStep + SUGOROKU_HOP_SETTLE_PADDING_MS;
}

/** 予定全文（fullSteps マス）の中点ワールド座標 — 渋滞カットイン挿入位置 */
export function computeTaxiJamMidpointPos(startPos, fullSteps) {
  return startPos + fullSteps / 2;
}

/**
 * 渋滞ありタクシー：前半は start→中点、後半は中点→to（今ターンの到達マス）。
 * 移動時間は等速想定で totalDurationMs を分割。
 */
export function computeTaxiCongestedLegDurations(from, to, fullSteps, totalDurationMs) {
  const span = to - from;
  const dur = Math.max(0, totalDurationMs);
  if (Math.abs(span) < 1e-9) {
    return { jamMid: from, firstLegMs: dur, secondLegMs: 0 };
  }
  const rawMid = computeTaxiJamMidpointPos(from, fullSteps);
  let jamMid = rawMid;
  if (span > 0) jamMid = Math.min(to, Math.max(from, rawMid));
  else jamMid = Math.max(to, Math.min(from, rawMid));
  const r = (jamMid - from) / span;
  const firstLegMs = Math.max(120, Math.round(dur * r));
  const secondLegMs = Math.round(dur * (1 - r));
  return { jamMid, firstLegMs, secondLegMs: Math.max(0, secondLegMs) };
}

export function squareDeco(pos, boardGoal, nightShrine = false) {
  if (nightShrine && pos >= boardGoal) {
    return {
      icon: "⛩️",
      bg: "bg-indigo-950/95",
      border: "border-violet-300/70",
      text: "text-violet-100",
      shadow: "0 5px 0 #1e1b4b, 0 8px 16px rgba(0,0,0,0.65)",
      glow: "0 0 28px rgba(167,139,250,0.55)",
    };
  }
  if (pos <= 0)
    return {
      icon: "🚀",
      bg: "bg-emerald-800/90",
      border: "border-emerald-400/70",
      text: "text-emerald-200",
      shadow: "0 5px 0 #064e3b, 0 7px 10px rgba(0,0,0,0.5)",
      glow: "0 0 14px rgba(52,211,153,0.35)",
    };
  if (pos >= boardGoal)
    return {
      icon: "🏆",
      bg: "bg-amber-700/90",
      border: "border-amber-300/80",
      text: "text-amber-100",
      shadow: "0 5px 0 #78350f, 0 7px 10px rgba(0,0,0,0.5)",
      glow: "0 0 18px rgba(251,191,36,0.5)",
    };
  if (pos % 10 === 0)
    return {
      icon: "⭐",
      bg: "bg-sky-800/80",
      border: "border-sky-400/60",
      text: "text-sky-200",
      shadow: "0 4px 0 #0c4a6e, 0 6px 8px rgba(0,0,0,0.45)",
      glow: "0 0 12px rgba(56,189,248,0.3)",
    };
  if (pos % 7 === 0)
    return {
      icon: "🎲",
      bg: "bg-violet-900/80",
      border: "border-violet-400/55",
      text: "text-violet-300",
      shadow: "0 4px 0 #3b0764, 0 6px 8px rgba(0,0,0,0.4)",
      glow: null,
    };
  if (pos % 5 === 0)
    return {
      icon: "✦",
      bg: "bg-slate-700/90",
      border: "border-slate-400/40",
      text: "text-slate-300",
      shadow: "0 3px 0 #1e293b, 0 5px 7px rgba(0,0,0,0.35)",
      glow: null,
    };
  return {
    icon: null,
    bg: "bg-slate-800/95",
    border: "border-slate-600/50",
    text: "text-slate-400",
    shadow: "0 3px 0 #0f172a, 0 4px 6px rgba(0,0,0,0.3)",
    glow: null,
  };
}
