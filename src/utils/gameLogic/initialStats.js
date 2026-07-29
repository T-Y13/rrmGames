import { BAL, CHARACTERS } from "../../constants/gameBalance";
import { luckGaugeRangeForCharacter, resolveInitialLuck } from "../../lib/characterEffects";
import { clamp } from "./core.js";

export function dailyLivingCostFor(characterType) {
  const c = CHARACTERS[characterType] ?? CHARACTERS.salaryman;
  return c.dailyLivingCost ?? BAL.living.dailyCost;
}

export function livingCostForPlayer(pl) {
  const lc = pl?.stats?.livingCost;
  if (typeof lc === "number" && Number.isFinite(lc) && lc >= 0) return lc;
  return dailyLivingCostFor(pl?.characterType);
}

/** 待機室ゲージ用：キャラ補正込みの各項目最小〜最大（roll 0〜5 が達しうる範囲） */
export function initialStatGaugeRanges(charType) {
  const char = CHARACTERS[charType] ?? CHARACTERS.salaryman;
  const sb = char.skillBonus ?? 0;
  const vb = char.virtueBonus ?? 0;
  const pb = char.ponBonus ?? 0;
  const livingDelta = (char.dailyLivingCost ?? BAL.living.dailyCost) - 300;
  return {
    luck: luckGaugeRangeForCharacter(char),
    skill: { min: 30 + sb, max: 55 + sb },
    virtue: { min: 30 + vb, max: 70 + vb },
    pon: { min: pb, max: 50 + pb },
    livingCost: { min: 200 + livingDelta, max: 450 + livingDelta },
  };
}

/** 待機室 UI 用：キャラに依存しない共通スケール（全キャラの可取りうる値の包絡） */
export function lobbyFixedGaugeRanges() {
  const keys = Object.keys(CHARACTERS);
  if (keys.length === 0) {
    return initialStatGaugeRanges("salaryman");
  }
  const ranges = keys.map((k) => initialStatGaugeRanges(k));
  const span = (pick) => ({
    min: Math.min(...ranges.map((r) => r[pick].min)),
    max: Math.max(...ranges.map((r) => r[pick].max)),
  });
  return {
    luck: span("luck"),
    skill: span("skill"),
    virtue: span("virtue"),
    pon: span("pon"),
    livingCost: span("livingCost"),
  };
}

/** 善行ダイス 0〜5 に対応する加算テーブル（最終 Virtue の一部） */
export const VIRTUE_BY_INITIAL_ROLL = [10, 18, 26, 34, 42, 50];

/** 運・技量・善行・PON だけ独立ダイス（各 0〜5）。生活費はこれらから導出 */
export function rollInitialRolls() {
  return {
    luck: Math.floor(Math.random() * 6),
    skill: Math.floor(Math.random() * 6),
    virtue: Math.floor(Math.random() * 6),
    pon: Math.floor(Math.random() * 6),
  };
}

export function livingRollFromInitialRolls(initialRolls) {
  return Math.floor((initialRolls.luck + initialRolls.skill + initialRolls.virtue) / 3);
}

/**
 * ロビー raw ダイス + キャラタイプ → ゲーム用の最終5値。
 * キャラ補正（luckBonus / skillBonus / virtueBonus / ponBonus / 生活費オフセット）はここでのみ加算する。
 */
export function computeFinalStatsFromInitialRolls(initialRolls, characterType) {
  const char = CHARACTERS[characterType] ?? CHARACTERS.salaryman;
  const lr = initialRolls.luck;
  const sr = initialRolls.skill;
  const vr = initialRolls.virtue;
  const pr = initialRolls.pon;

  const skillBase = 30 + sr * 5;
  const virtueBase = 20 + VIRTUE_BY_INITIAL_ROLL[vr];
  const ponBase = pr * 10;
  const livingRoll = livingRollFromInitialRolls(initialRolls);
  const livingBase = 200 + livingRoll * 50;

  const luck = clamp(resolveInitialLuck(char, lr), 0, 999999);
  const skill = clamp(skillBase + (char.skillBonus ?? 0), 0, 2000);
  const virtue = clamp(virtueBase + (char.virtueBonus ?? 0), 0, 999999);
  const pon = clamp(ponBase + (char.ponBonus ?? 0), 0, 999999);
  const livingCost = Math.max(
    50,
    livingBase + ((char.dailyLivingCost ?? BAL.living.dailyCost) - 300),
  );

  return { luck, skill, virtue, pon, livingCost };
}

/**
 * 待機室での初期ステータス抽選（従来API）。内部で raw ダイス → キャラで最終値を組み立てる。
 */
export function rollInitialStats(charType) {
  const raw = rollInitialRolls();
  const final = computeFinalStatsFromInitialRolls(raw, charType);
  const livingRoll = livingRollFromInitialRolls(raw);
  return {
    ...final,
    luckRoll: raw.luck,
    skillRoll: raw.skill,
    virtueRoll: raw.virtue,
    ponRoll: raw.pon,
    livingRoll,
  };
}

/** ゲーム開始時フォールバック：その場で raw を振り直して最終値だけ返す */
export function rollSlotInitialStatsForGameStart(charKey) {
  return computeFinalStatsFromInitialRolls(rollInitialRolls(), charKey ?? "salaryman");
}

/**
 * Firestore `playerSlots[].initialRolls` を検証（キャラ非依存の raw 0〜5 のみ）
 */
export function normalizeSlotInitialRolls(raw) {
  if (!raw || typeof raw !== "object") return null;
  const toDie = (v) => {
    const n = Number(v);
    if (!Number.isFinite(n)) return null;
    const i = Math.round(n);
    if (i < 0 || i > 5) return null;
    return i;
  };
  const luck = toDie(raw.luck);
  const skill = toDie(raw.skill);
  const virtue = toDie(raw.virtue);
  const pon = toDie(raw.pon);
  if (luck == null || skill == null || virtue == null || pon == null) return null;
  return { luck, skill, virtue, pon };
}

/** 待機室：キャラ＋抽選確定済みか */
export function isLobbySlotConfigured(slot) {
  return !!(slot?.character && normalizeSlotInitialRolls(slot.initialRolls));
}

/** 待機室：メンバー一覧の準備完了表示（ホストは設定済みなら自動で完了扱い） */
export function isLobbyMemberReady(slot, hostId) {
  if (!isLobbySlotConfigured(slot)) return false;
  if (slot.id === hostId) return true;
  return slot.lobbyReady === true;
}

export function allLobbyMembersReady(playerSlots, hostId) {
  return (
    Array.isArray(playerSlots) &&
    playerSlots.length > 0 &&
    playerSlots.every((s) => isLobbyMemberReady(s, hostId))
  );
}

/**
 * Firestore `playerSlots[].initialStats` を検証し、makePlayer に渡せる5値だけにする。
 * 後方互換：旧ロビーで保存された「補正込み最終値」用。
 */
export function normalizeSlotInitialStats(raw) {
  if (!raw || typeof raw !== "object") return null;
  const luck = Number(raw.luck);
  const skill = Number(raw.skill);
  const virtue = Number(raw.virtue);
  const pon = Number(raw.pon);
  const livingCost = Number(raw.livingCost);
  if (![luck, skill, virtue, pon, livingCost].every((n) => Number.isFinite(n))) return null;
  return { luck, skill, virtue, pon, livingCost };
}
