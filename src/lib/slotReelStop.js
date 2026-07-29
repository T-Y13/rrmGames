import { BAL, SLOT_MACHINES } from "../constants/gameBalance";
import { rand } from "../utils/gameLogic/core.js";

/** Firestore / gameState 用（Phase A 以降で書き込み） */
export const SLOT_SKILL_STOP_MODE = {
  none: "none",
  /** Phase A: 手動停止・配当は確定済み */
  visual: "visual",
  /** Phase B: 停止位置が tier に影響 */
  full: "full",
};

/** gameLogic.getSlotReachAnimationState と同じ判定（循環 import 回避） */
function reachAnimationState(visualReels, tier) {
  if (!Array.isArray(visualReels) || visualReels.length !== 3) return { reachPossible: false };
  const [a, b, c] = visualReels;
  if (a !== b) return { reachPossible: false };
  const reachWin = ["potJackpot", "jackpot", "big", "mid"].includes(tier);
  const reachTease = tier === "miss" && a !== c;
  return { reachPossible: reachWin || reachTease };
}

/**
 * ガセリーチ（当たり・小当たり風に見えるが最終的にハズレ）か。
 * 1・2リール同絵柄 + 3リール目だけ外れ + tier=miss。
 */
export function isGaseReachVisual(visualReels, tier) {
  if (tier !== "miss" || !Array.isArray(visualReels) || visualReels.length !== 3) return false;
  const [a, b, c] = visualReels;
  return a === b && a !== c;
}

/**
 * near-miss 加工込みの演出用リール（8日目・デイリースロット共通）。
 * @param {object} res spinSlot の戻り値
 * @param {string} machineKey
 * @param {{ rng?: () => number }} [opts]
 */
export function buildSlotSpinVisualPlan(res, machineKey = "standard", opts = {}) {
  const rng = opts.rng ?? Math.random;
  const machine = SLOT_MACHINES[machineKey] ?? SLOT_MACHINES.standard;
  let visualReels = [...(res?.reels ?? ["?", "?", "?"])];

  if (res?.tier === "miss") {
    const sym = machine.symbols;
    const nm = BAL.slot.nearMissReachChance;
    const sp = BAL.slot.slipSymbolChance;
    const u = rng();
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

  const { reachPossible } = reachAnimationState(visualReels, res?.tier);
  const skillStop = resolveSlotSkillStopContext({
    visualReels,
    tier: res?.tier,
    rng,
  });

  return { visualReels, reachPossible, machine, skillStop };
}

/**
 * 目押しチャンス判定（純関数）。
 * @returns {{
 *   eligible: boolean,
 *   active: boolean,
 *   reason: string|null,
 *   mode: string,
 *   pattern: 'gaseReach'|null,
 * }}
 */
export function resolveSlotSkillStopContext({ visualReels, tier, rng = Math.random }) {
  const inactive = {
    eligible: false,
    active: false,
    reason: null,
    mode: SLOT_SKILL_STOP_MODE.none,
    pattern: null,
  };

  if (!isGaseReachVisual(visualReels, tier)) {
    return inactive;
  }

  const { reachPossible } = reachAnimationState(visualReels, tier);
  if (!reachPossible) {
    return { ...inactive, reason: "reach_not_possible" };
  }

  const chance = BAL.slot.gaseReachSkillStopChance ?? 0;
  const active = rng() < chance;

  return {
    eligible: true,
    active,
    reason: active ? "gase_reach_skill_stop" : "gase_reach_skill_skip",
    mode: active ? SLOT_SKILL_STOP_MODE.full : SLOT_SKILL_STOP_MODE.none,
    pattern: "gaseReach",
  };
}

/**
 * 体感頻度の目安（ドキュメント・テスト用）。
 * P(skill) ≈ P(miss) × nearMissReachChance × gaseReachSkillStopChance
 */
export function estimateSkillStopRatePerSpin({
  missRate = 0.85,
  nearMissChance = BAL.slot.nearMissReachChance,
  skillChance = BAL.slot.gaseReachSkillStopChance,
} = {}) {
  const pGase = missRate * nearMissChance;
  const pSkill = pGase * skillChance;
  return { pGaseReach: pGase, pSkillStop: pSkill };
}
