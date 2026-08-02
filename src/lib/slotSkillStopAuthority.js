import { SLOT_SKILL_STOP_MODE } from "./slotReelStop";
import { resolveSkillStopSpin } from "./slotSkillStopResolve";

const ALLOWED_SKILL_STOP_CLIENT_TIERS = new Set(["miss", "small", "mid", "atari"]);

/** Firestore 用：目押しスピン開始時の miss 確定結果スナップショット */
export function pickSlotSpinBaseSnapshot(res) {
  if (!res || res.tier !== "miss") return null;
  return {
    tier: res.tier,
    payout: res.payout ?? 0,
    message: res.message ?? "",
    reels: Array.isArray(res.reels) ? [...res.reels] : ["?", "?", "?"],
    pityCounterAfter: res.pityCounterAfter,
  };
}

/**
 * マルチ commit 時：クライアント申告の tier / 配当を Firestore 上の目押し状態で再検証。
 * @returns {{ ok: boolean, res: object|null, visualReels: string[]|null, skillStopScrollRows: number|null }}
 */
export function reconcileSkillStopSpinCommit({
  freshGs,
  clientRes,
  clientVisualReels,
  skillStopScrollRows,
  bet,
  machineKey,
  reelMachine,
}) {
  const active = Boolean(freshGs?.slotSkillStopActive);
  const mode = freshGs?.slotSkillStopMode ?? SLOT_SKILL_STOP_MODE.none;

  if (!active || mode !== SLOT_SKILL_STOP_MODE.full) {
    return {
      ok: true,
      res: clientRes,
      visualReels: clientVisualReels,
      skillStopScrollRows: null,
    };
  }

  const base = freshGs?.slotSpinBaseResult;
  if (!base || base.tier !== "miss") {
    return { ok: false, res: null, visualReels: null, skillStopScrollRows: null };
  }

  if (!clientRes || !ALLOWED_SKILL_STOP_CLIENT_TIERS.has(clientRes.tier)) {
    return { ok: false, res: null, visualReels: null, skillStopScrollRows: null };
  }

  const visualReels = freshGs?.slotVisualReels;
  if (!Array.isArray(visualReels) || visualReels.length !== 3) {
    return { ok: false, res: null, visualReels: null, skillStopScrollRows: null };
  }

  const scrollStrip =
    (Array.isArray(freshGs?.slotColumnScrollStrips) && freshGs.slotColumnScrollStrips[2]?.length
      ? freshGs.slotColumnScrollStrips[2]
      : null) ?? reelMachine?.symbols ?? [];

  const resolved = resolveSkillStopSpin({
    scrollRows: skillStopScrollRows,
    visualReels,
    baseRes: { ...base, pityCounterAfter: clientRes.pityCounterAfter ?? base.pityCounterAfter },
    reelMachine,
    bet,
    machineKey,
    scrollStrip,
  });

  const safeScroll = Number.isFinite(skillStopScrollRows) ? skillStopScrollRows : null;

  return {
    ok: true,
    res: resolved.res,
    visualReels: resolved.visualReels,
    skillStopScrollRows: safeScroll,
  };
}
