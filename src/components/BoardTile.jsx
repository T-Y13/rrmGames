import React from "react";
import { ArrowDown, ArrowUp, Coins, Flame } from "lucide-react";
import { TILE_EFFECT_KIND } from "../constants/gameBalance";

/** すごろくマスの効果アイコン（スタート／ゴールは親で描画しない想定） */
export default function SugorokuTileEffectIcon({ effect, sizePx = 13 }) {
  if (!effect || effect.kind === TILE_EFFECT_KIND.NEUTRAL) return null;
  const s = Math.max(8, sizePx);
  const wrap = "anim-tile-effect-float pointer-events-none";
  switch (effect.kind) {
    case TILE_EFFECT_KIND.MOVE_FORWARD:
      return (
        <span className={wrap} title="進むマス">
          <ArrowUp className="text-sky-300" aria-hidden strokeWidth={2.75} size={s} />
        </span>
      );
    case TILE_EFFECT_KIND.MOVE_BACKWARD:
      return (
        <span className={wrap} title="戻りマス">
          <ArrowDown className="text-rose-400" aria-hidden strokeWidth={2.75} size={s} />
        </span>
      );
    case TILE_EFFECT_KIND.GAIN_MONEY:
      return (
        <span className={wrap} title="増資マス">
          <Coins className="text-amber-300" aria-hidden strokeWidth={2.35} size={s} />
        </span>
      );
    case TILE_EFFECT_KIND.LOSE_MONEY:
      return (
        <span className={wrap} title="出費マス">
          <Coins className="text-slate-500 opacity-95" aria-hidden strokeWidth={2.35} size={s} />
        </span>
      );
    case TILE_EFFECT_KIND.INCREASE_PON:
      return (
        <span className={wrap} title="燃えマス">
          <Flame className="text-orange-400" aria-hidden strokeWidth={2.35} size={s} />
        </span>
      );
    default:
      return null;
  }
}
