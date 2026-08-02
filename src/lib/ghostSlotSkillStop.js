import { buildColumnReelStrips } from "../utils/gameLogic";
import { resolveSkillStopSpin } from "./slotSkillStopResolve";
import { pickSlotSpinBaseSnapshot } from "./slotSkillStopAuthority";
import { buildSlotSpinVisualPlan, SLOT_SKILL_STOP_MODE } from "./slotReelStop";

/**
 * ゴースト／自動操作：目押しチャンス時にランダムな停止位置で結果を解決。
 */
export function rollGhostSkillStopOutcome({
  visualReels,
  baseRes,
  reelMachine,
  bet,
  machineKey = "standard",
  columnScrollStrip = null,
  rng = Math.random,
}) {
  const strip =
    columnScrollStrip?.length > 0
      ? columnScrollStrip
      : buildColumnReelStrips(reelMachine, 3)[2];
  const scrollRows = rng() * 3;
  const resolved = resolveSkillStopSpin({
    scrollRows,
    visualReels,
    baseRes,
    reelMachine,
    bet,
    machineKey,
    scrollStrip: strip,
  });
  return { ...resolved, scrollRows };
}

/**
 * spinSlot 結果からゴースト用 ctx を組み立て（目押しチャンス時はランダム解決込み）。
 */
export function buildGhostSlotSpinResultCtx({
  res,
  machineKey,
  reelMachine,
  bet,
  rng = Math.random,
  columnScrollStrips = null,
}) {
  const visualPlan = buildSlotSpinVisualPlan(res, machineKey, { rng });
  const baseVisualReels = visualPlan.visualReels;
  const columnStrips = columnScrollStrips ?? buildColumnReelStrips(reelMachine, 3);
  let finalRes = res;
  let commitVisualReels = baseVisualReels;
  let skillStop = { active: false, mode: SLOT_SKILL_STOP_MODE.none };
  let skillStopScrollRows = null;

  if (visualPlan.skillStop.active && visualPlan.skillStop.mode === SLOT_SKILL_STOP_MODE.full) {
    skillStop = {
      active: true,
      mode: SLOT_SKILL_STOP_MODE.full,
    };
    const resolved = rollGhostSkillStopOutcome({
      visualReels: baseVisualReels,
      baseRes: res,
      reelMachine,
      bet,
      machineKey,
      columnScrollStrip: columnStrips[2],
      rng,
    });
    finalRes = resolved.res;
    commitVisualReels = resolved.visualReels;
    skillStopScrollRows = resolved.scrollRows;
  }

  return {
    baseRes: res,
    visualReels: baseVisualReels,
    res: finalRes,
    commitVisualReels,
    skillStop,
    skillStopScrollRows,
    reachPossible: visualPlan.reachPossible,
    slotSpinBaseResult: pickSlotSpinBaseSnapshot(res),
  };
}
