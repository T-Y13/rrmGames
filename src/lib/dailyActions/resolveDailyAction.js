import { CHARACTERS } from "../../constants/gameBalance";
import { SUB_PHASE } from "../../constants/gamePhases";
import {
  applyRimiruDailyEnd,
  applyVirtueWave,
  computeAdvanceDaily,
} from "../../utils/gameLogic";
import { buildDailyActionFx } from "../dailyActionFx";
import { applyAmuletLuckBoost, applyDailyLivingCostAndPon } from "./shared";
import { applyWorkIncomeToStats } from "./work";

/**
 * 日常行動を純関数で解決（Phase 2: work / shrine ロジックは各モジュール）。
 * @returns {object|null} 次 gameState（ゴースト自動操作と同形）
 */
export function resolveDailyAction(gs, actionType, ctx = {}) {
  switch (actionType) {
    case "work":
      return resolveWorkDailyAction(gs, ctx);
    default:
      return null;
  }
}

/** 仕事1手（ゴースト自動操作の正本） */
export function resolveWorkDailyAction(gs, ctx = {}) {
  const idx = gs?.currentPlayerIdx;
  const p = gs?.players?.[idx];
  if (!p || gs.subPhase !== SUB_PHASE.daily) return null;

  const logs = [];
  let s = { ...p.stats };
  const virtueBefore = s.virtue;
  const char = CHARACTERS[p.characterType] ?? CHARACTERS.salaryman;
  const newAmulets = p.amulets ?? 0;

  const amulet = applyAmuletLuckBoost(s, newAmulets);
  s = amulet.stats;
  if (amulet.luckBonus > 0) {
    logs.push(`🧿 お守り効果（${newAmulets}個）: 運+${amulet.luckBonus}→${s.luck}`);
  }

  const work = applyWorkIncomeToStats(s, char);
  s = work.stats;
  logs.push(
    `🤖 ${p.name} ${gs.currentDay}日目【仕事・自動】資金+${work.workTotal}G / 善行+${work.workVirtueGain}→${s.virtue}`,
  );

  const tail = applyDailyLivingCostAndPon(s, p, char, gs);
  s = tail.stats;
  logs.push(...tail.logs);

  let newPlayers = gs.players.map((pl, i) =>
    i === idx
      ? {
          ...pl,
          stats: s,
          amulets: newAmulets,
          streamMultiplier: p.streamMultiplier ?? char.streamMultiplier,
        }
      : pl,
  );
  newPlayers = applyVirtueWave(p, virtueBefore, s.virtue, newPlayers, logs);
  newPlayers = newPlayers.map((pl, i) => (i !== idx ? pl : applyRimiruDailyEnd(pl, logs)));

  const advanced = computeAdvanceDaily({ ...gs, recentPonEvent: null }, newPlayers, logs);
  if (ctx.buildDailyActionFx === false) return advanced;

  const dailyActionFx = buildDailyActionFx({
    playerId: p.id,
    actionType: "work",
    detail: { money: work.workTotal },
  });
  return dailyActionFx ? { ...advanced, dailyActionFx } : advanced;
}
