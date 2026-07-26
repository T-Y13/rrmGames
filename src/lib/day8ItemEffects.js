/** 8日目アイテム効果の純粋適用（gameLogic との循環 import 回避） */

import { TILE_EFFECT_KIND } from "../constants/gameBalance";



function normalizeSeatEffects(player) {

  return Array.isArray(player?.day8SeatEffects) ? player.day8SeatEffects : [];

}



function findMoveResolveEffect(effects) {

  return effects.find((e) => e.applyOn === "moveResolve" && e.kind === "extraSteps");

}



function findSlotPayoutEffect(effects) {

  return effects.find((e) => e.applyOn === "slotPayout" && e.kind === "slotPayoutMult");

}



export function applyDay8MoveStepBonus(player, stepCells) {

  const effects = normalizeSeatEffects(player);

  const effect = findMoveResolveEffect(effects);

  if (!effect) {

    return { stepCells, bonus: 0, player, consumed: false };

  }

  const bonus = Math.floor(Number(effect.value) || 0);

  if (bonus === 0) {

    return { stepCells, bonus: 0, player, consumed: false };

  }

  const nextEffects = effects.filter((e) => e !== effect);

  return {

    stepCells: Math.max(0, stepCells + bonus),

    bonus,

    player: { ...player, day8SeatEffects: nextEffects },

    consumed: true,

  };

}



export function applyDay8SlotPayoutBonus(player, grossPayout, tier) {

  if (tier === "miss") {

    return { grossPayout, bonus: 0, player, consumed: false, effectMeta: null };

  }

  const effects = normalizeSeatEffects(player);

  const effect = findSlotPayoutEffect(effects);

  if (!effect) {

    return { grossPayout, bonus: 0, player, consumed: false, effectMeta: null };

  }

  const mult = Number(effect.value);

  if (!Number.isFinite(mult) || mult <= 1) {

    return { grossPayout, bonus: 0, player, consumed: false, effectMeta: null };

  }

  const boosted = Math.floor(grossPayout * mult);

  const keepForBurst = effect.applyScope === "slotBurstAll";

  const nextEffects = keepForBurst ? effects : effects.filter((e) => e !== effect);

  return {

    grossPayout: boosted,

    bonus: boosted - grossPayout,

    player: { ...player, day8SeatEffects: nextEffects },

    consumed: !keepForBurst,

    effectMeta: effect,

  };

}



export function formatDay8SeatEffectsHint(player) {

  const effects = normalizeSeatEffects(player);

  if (!effects.length) return null;

  const parts = effects

    .map((effect) => {

      if (effect.kind === "extraSteps") {

        const v = Number(effect.value) || 0;

        return v >= 0 ? `進む +${v}マス` : `進む ${v}マス`;

      }

      if (effect.kind === "slotPayoutMult") {

        const pct = Math.round((Number(effect.value) - 1) * 100);

        if (pct <= 0) return null;

        return effect.applyScope === "slotBurstAll" ? `当たり +${pct}%（3回）` : `当たり +${pct}%（1回）`;

      }

      return effect.label ?? null;

    })

    .filter(Boolean);

  return parts.length ? parts.join(" / ") : null;
}

/** 移動演出：ダイス後・ホップ前のカード効果吹き出し（movementFx.preMoveEffect） */
export function buildDay8CardMoveEffectMeta(bonus) {
  const n = Math.floor(Number(bonus) || 0);
  if (n === 0) return null;
  const sign = n > 0 ? "+" : "";
  return {
    titles: [`カード効果 ${sign}${n}`],
    kind: TILE_EFFECT_KIND.MOVE_FORWARD,
  };
}

/** @deprecated use formatDay8SeatEffectsHint */

export function formatActiveBuffHint(playerOrBuff) {

  if (playerOrBuff?.day8SeatEffects || playerOrBuff?.day8ActiveBuff === undefined) {

    return formatDay8SeatEffectsHint(playerOrBuff);

  }

  const buff = playerOrBuff;

  if (!buff?.kind) return null;

  if (buff.kind === "extraSteps") {

    const v = Number(buff.value) || 0;

    return v >= 0 ? `次の移動 +${v}マス` : `次の移動 ${v}マス`;

  }

  if (buff.kind === "slotPayoutMult") {

    const pct = Math.round((Number(buff.value) - 1) * 100);

    return pct > 0 ? `次の当たり +${pct}%` : null;

  }

  return buff.label ?? null;

}

