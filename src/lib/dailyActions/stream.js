import { BAL } from "../../constants/gameBalance";
import { applyCharacterStatGain } from "../characterEffects";
import { applyVirtueIncomeBoost, clamp, clampMoney, rand } from "../../utils/gameLogic";

/** 配信失敗率（UI 表示・実処理共通） */
export function computeStreamFailRate(stats) {
  const streamSkillLuck = (stats?.skill ?? 0) + (stats?.luck ?? 0);
  if (streamSkillLuck > BAL.stream.combinedStatNoFailThreshold) return 0;
  return Math.max(
    0,
    BAL.stream.baseFailRate -
      (streamSkillLuck / BAL.stream.combinedStatNoFailThreshold) * BAL.stream.baseFailRate,
  );
}

export function pickStreamType(random = Math.random) {
  return random() < 0.5 ? "chat" : "game";
}

export function streamLabelForType(streamType) {
  return streamType === "chat" ? "雑談配信" : "ゲーム配信";
}

/**
 * 配信1手のステータス解決（演出・ログ行は呼び出し側）。
 * ctx.streamType / ctx.failed を渡すと RNG を固定できる（テスト用）。
 */
export function rollAndApplyStream(stats, char, streamMult, ctx = {}) {
  const random = ctx.random ?? Math.random;
  const randInt = ctx.rand ?? rand;
  const streamType = ctx.streamType ?? pickStreamType(random);
  const streamLabel = streamLabelForType(streamType);
  const failRate = computeStreamFailRate(stats);
  const failed = ctx.failed ?? random() < failRate;

  const moneyBefore = stats.money;
  const virtueBefore = stats.virtue;
  const skillBefore = stats.skill;

  let s = stats;
  let streamCutinGold = 0;
  let streamCutinStat = null;
  let outcome;

  if (failed) {
    const streamBaseMoney = Math.round(BAL.stream.successMin * streamMult);
    const delta = applyVirtueIncomeBoost(streamBaseMoney, s.virtue);
    streamCutinGold = delta;
    s = { ...s, money: clampMoney(s.money + delta) };
    outcome = "failure";
  } else {
    const baseReward = randInt(BAL.stream.successMin, BAL.stream.successMax);
    const streamBaseMoney = Math.round(baseReward * streamMult);
    const delta = applyVirtueIncomeBoost(streamBaseMoney, s.virtue);
    streamCutinGold = delta;
    s = { ...s, money: clampMoney(s.money + delta) };

    if (streamType === "chat") {
      const rawVg = randInt(BAL.stream.chat.virtueGainMin, BAL.stream.chat.virtueGainMax);
      const vg = applyCharacterStatGain(char, "virtue", rawVg);
      s = { ...s, virtue: clamp(s.virtue + vg) };
      streamCutinStat = vg ? { label: "善行", delta: vg } : null;
    } else {
      const rawSg = randInt(BAL.stream.game.skillGainMin, BAL.stream.game.skillGainMax);
      const sg = applyCharacterStatGain(char, "skill", rawSg);
      s = { ...s, skill: clamp(s.skill + sg) };
      streamCutinStat = sg ? { label: "技量", delta: sg } : null;
    }
    outcome = "success";
  }

  return {
    stats: s,
    streamType,
    streamLabel,
    failed,
    failRate,
    outcome,
    streamCutinGold,
    streamCutinStat,
    moneyBefore,
    virtueBefore,
    skillBefore,
  };
}
