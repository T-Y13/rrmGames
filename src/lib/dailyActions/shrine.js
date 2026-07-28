import { BAL } from "../../constants/gameBalance";
import { applyCharacterStatGain } from "../characterEffects";
import { clamp, clampMoney, shrineAmuletDropChance } from "../../utils/gameLogic";

/** 神社参拝のステータス変化（お守り抽選・演出は呼び出し側） */
export function applyShrineToStats(stats, char) {
  const sh = BAL.shrine;
  const luckGain = applyCharacterStatGain(char, "luck", sh.luckGain);
  const virtueGain = applyCharacterStatGain(char, "virtue", sh.virtueGain);
  return {
    stats: {
      ...stats,
      money: clampMoney(stats.money - sh.cost),
      luck: clamp(stats.luck + luckGain),
      virtue: clamp(stats.virtue + virtueGain),
      pon: Math.max(0, stats.pon - sh.ponReduce),
    },
    cost: sh.cost,
    luckGain,
    virtueGain,
    ponReduce: sh.ponReduce,
  };
}

/** お守り抽選（ctx.random でテスト可能） */
export function rollShrineAmuletDrop(virtueBefore, random = Math.random) {
  const sh = BAL.shrine;
  const amuletP = shrineAmuletDropChance(virtueBefore, sh.amuletBaseRate ?? 0.2);
  return { gotAmulet: random() < amuletP, amuletP };
}
