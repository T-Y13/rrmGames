import { CHARACTERS, LAST_DAILY_DAY } from "../constants/gameBalance";
import { SUB_PHASE } from "../constants/gamePhases";

function clampMoney(v) {
  return Math.round(Math.max(-999999999, Math.min(999999999, Number(v) || 0)));
}

/** @typedef {"luck" | "skill" | "virtue" | "pon"} CharacterStatKey */

/**
 * キャラ定義の任意フィールド（大家等）。未指定時は従来どおり。
 * @see .cursor/skills/rrm-game/references/character-system.md
 *
 * luckFixed?: number           — 初期運ロール無視
 * statGainMultiplier?: number  — 配信・神社・デイリースロット等のステ加算倍率（1=変更なし）
 * rentIncomeRate?: number      — 他プレイヤー生活費合計に対する家賃率（0=なし）
 * multiplayerOnly?: boolean    — ロビー制御用（将来）
 */

function livingCostOfPlayer(pl) {
  const lc = pl?.stats?.livingCost;
  if (typeof lc === "number" && Number.isFinite(lc) && lc >= 0) return lc;
  const c = CHARACTERS[pl?.characterType] ?? CHARACTERS.salaryman;
  return c.dailyLivingCost ?? 500;
}

/**
 * 初期運（0〜5 ロール）→ ゲーム開始時の運ステ。
 * luckFixed があればロール・luckBonus を無視。
 */
export function resolveInitialLuck(char, luckRoll) {
  const fixed = char?.luckFixed;
  if (fixed != null && Number.isFinite(Number(fixed))) {
    return Math.max(0, Math.floor(Number(fixed)));
  }
  const roll = Math.max(0, Math.floor(Number(luckRoll) || 0));
  return roll * 2 + (char?.luckBonus ?? 0);
}

/**
 * キャラ補正込みのステータス加算量（配信・神社・デイリースロット等）。
 * 既存キャラは statGainMultiplier 未指定 → delta そのまま。
 */
export function applyCharacterStatGain(char, statKey, delta) {
  void statKey;
  const d = Number(delta);
  if (!Number.isFinite(d) || d === 0) return 0;
  const mult = Number(char?.statGainMultiplier);
  if (!Number.isFinite(mult) || mult === 1) return d;
  return d > 0 ? Math.floor(d * mult) : Math.ceil(d * mult);
}

/**
 * マルチ用パッシブ収入（家賃）。rentIncomeRate 未設定なら 0。
 * @returns {{ amount: number, sourceLivingCostSum: number, otherCount: number }}
 */
export function computePassiveRentIncome(players, playerId, char) {
  const rate = Number(char?.rentIncomeRate);
  if (!Number.isFinite(rate) || rate <= 0 || !Array.isArray(players) || !playerId) {
    return { amount: 0, sourceLivingCostSum: 0, otherCount: 0 };
  }

  const others = players.filter(
    (pl) => pl?.id && pl.id !== playerId && pl.alive !== false,
  );
  const sourceLivingCostSum = others.reduce((sum, pl) => sum + livingCostOfPlayer(pl), 0);
  const amount = Math.floor(sourceLivingCostSum * rate);

  return {
    amount: Math.max(0, amount),
    sourceLivingCostSum,
    otherCount: others.length,
  };
}

/** UI 用：ターン開始時の家賃見込み（1〜7日目） */
export function previewTurnStartRentAmount(players, player, char, subPhase) {
  if (subPhase !== SUB_PHASE.daily || !player?.id) return 0;
  return computePassiveRentIncome(players, player.id, char).amount;
}

/**
 * 1〜7日目：その日まだ未徴収の大家に家賃を加算（日付更新時は全員分）。
 * @returns {{ players: object[], rentLogs: string[] }}
 */
export function applyDailyRentForAllEligible(players, currentDay, subPhase) {
  if (
    subPhase !== SUB_PHASE.daily ||
    !Number.isFinite(currentDay) ||
    currentDay < 1 ||
    currentDay > LAST_DAILY_DAY
  ) {
    return { players, rentLogs: [] };
  }
  let next = players;
  const rentLogs = [];
  for (let i = 0; i < next.length; i++) {
    const r = applyTurnStartRentToPlayer(next, i, subPhase, currentDay);
    if (r.rentIncome > 0) {
      next = r.players;
      if (r.rentLog) rentLogs.push(r.rentLog);
    }
  }
  return { players: next, rentLogs };
}

/**
 * 1〜7日目ターン開始時に家賃を加算（大家等）。同一日付では1回のみ。
 * @returns {{ players: object[], rentIncome: number, rentLog: string|null, rentMeta: object|null }}
 */
export function applyTurnStartRentToPlayer(players, playerIdx, subPhase, currentDay) {
  if (
    subPhase !== SUB_PHASE.daily ||
    !Number.isFinite(currentDay) ||
    currentDay < 1 ||
    currentDay > LAST_DAILY_DAY
  ) {
    return { players, rentIncome: 0, rentLog: null, rentMeta: null };
  }
  const p = players?.[playerIdx];
  if (!p) return { players, rentIncome: 0, rentLog: null, rentMeta: null };
  if (p.lastRentCollectedDay === currentDay) {
    return { players, rentIncome: 0, rentLog: null, rentMeta: null };
  }

  const char = CHARACTERS[p.characterType] ?? CHARACTERS.salaryman;
  const rentMeta = computePassiveRentIncome(players, p.id, char);
  if (rentMeta.amount <= 0) {
    return { players, rentIncome: 0, rentLog: null, rentMeta };
  }

  const nextPlayers = players.map((pl, i) =>
    i === playerIdx
      ? {
          ...pl,
          lastRentCollectedDay: currentDay,
          stats: { ...pl.stats, money: clampMoney(pl.stats.money + rentMeta.amount) },
        }
      : pl,
  );

  return {
    players: nextPlayers,
    rentIncome: rentMeta.amount,
    rentMeta,
    rentLog: `  🏠 ${p.name}: ${currentDay}日目・家賃 +${rentMeta.amount}G`,
  };
}

/**
 * 待機室ゲージ用：luckFixed キャラの運レンジ。
 */
export function luckGaugeRangeForCharacter(char) {
  if (char?.luckFixed != null && Number.isFinite(Number(char.luckFixed))) {
    const v = Math.max(0, Math.floor(Number(char.luckFixed)));
    return { min: v, max: v };
  }
  const lb = char?.luckBonus ?? 0;
  return { min: lb, max: 10 + lb };
}

/** ロビー：人数不足時に multiplayerOnly キャラを選べない */
export function isCharacterSelectableInLobby(char, playerCount) {
  if (char?.multiplayerOnly && (Number(playerCount) || 0) < 2) return false;
  return true;
}
