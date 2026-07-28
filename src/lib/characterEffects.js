import { CHARACTERS } from "../constants/gameBalance";

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
