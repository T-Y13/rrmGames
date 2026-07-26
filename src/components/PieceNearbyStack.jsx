import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import BoardCalloutBubble from "./BoardCalloutBubble";
import { sugorokuPlayerName } from "../lib/sugorokuPlayerName";
import { TILE_EFFECT_KIND } from "../constants/gameBalance";
import { SUGOROKU_PLAYER_NAME_BUBBLE_CLASS } from "../constants/sugorokuMobileLayout";

const PLAYER_NAME_BUBBLE_CLASS = SUGOROKU_PLAYER_NAME_BUBBLE_CLASS;

const TILE_FX_FILL = {
  good: "#2563eb",
  bad: "#dc2626",
  neutral: "#0e7490",
};

function tileEffectFillColor(kind) {
  if (kind === TILE_EFFECT_KIND.MOVE_FORWARD || kind === TILE_EFFECT_KIND.GAIN_MONEY) {
    return TILE_FX_FILL.good;
  }
  if (
    kind === TILE_EFFECT_KIND.MOVE_BACKWARD ||
    kind === TILE_EFFECT_KIND.LOSE_MONEY ||
    kind === TILE_EFFECT_KIND.INCREASE_PON ||
    kind === TILE_EFFECT_KIND.DEBT_TRAP
  ) {
    return TILE_FX_FILL.bad;
  }
  return TILE_FX_FILL.neutral;
}

function isMoveTileEffect(kind) {
  return kind === TILE_EFFECT_KIND.MOVE_FORWARD || kind === TILE_EFFECT_KIND.MOVE_BACKWARD;
}

const FILL = {
  travel: "#059669",
};
/**
 * キャラ上に積み上げる吹き出し（名前・各種ラベル）
 */
export default function PieceNearbyStack({
  playerName,
  nameFillColor,
  tileEffectLines = null,
  tileEffectKind = null,
  remainingTravelSteps = null,
  congestionActive = false,
  /** overlay=absolute（従来） / inline=キャラ直上にフロー配置（scale縮小と連動） */
  anchor = "overlay",
}) {
  const hasOverlays =
    (tileEffectLines?.length ?? 0) > 0 ||
    (remainingTravelSteps != null && remainingTravelSteps > 0) ||
    congestionActive;
  const moveTileFx = isMoveTileEffect(tileEffectKind);

  const rootClass =
    anchor === "inline"
      ? "pointer-events-none relative z-[48] mb-0.5 flex w-max max-w-[min(calc(100vw - 2rem),280px)] flex-col items-center gap-1"
      : "pointer-events-none absolute bottom-full left-1/2 z-[48] mb-1 flex w-max max-w-[min(calc(100vw - 2rem),280px)] -translate-x-1/2 flex-col items-center gap-1";

  return (
    <div className={rootClass}>
      <AnimatePresence mode="popLayout">
        {(tileEffectLines?.length ?? 0) > 0 && (
          <motion.div
            key={`tile-${tileEffectLines.join("|")}`}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[min(calc(100vw-1.5rem),420px)]"
          >
            <BoardCalloutBubble
              tail="bottom"
              fillColor={tileEffectFillColor(tileEffectKind)}
              bodyClassName={
                moveTileFx
                  ? "px-3 py-2 text-center text-[17px] font-bold leading-none whitespace-nowrap"
                  : "px-3 py-2 text-center text-[18px] font-bold leading-none whitespace-nowrap"
              }
            >
              <span>{tileEffectLines.join(" ")}</span>
            </BoardCalloutBubble>
          </motion.div>
        )}

        {remainingTravelSteps != null && remainingTravelSteps > 0 && (
          <motion.div
            key={`travel-${remainingTravelSteps}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <BoardCalloutBubble
              tail="bottom"
              fillColor={FILL.travel}
              bodyClassName="whitespace-nowrap px-2.5 py-1 text-[11px] font-bold"
            >
              残り{remainingTravelSteps}マス…
            </BoardCalloutBubble>
          </motion.div>
        )}

        {congestionActive && (
          <motion.div key="congestion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BoardCalloutBubble
              tail="bottom"
              fillColor="#b45309"
              bodyClassName="whitespace-nowrap px-2 py-0.5 text-[10px] font-bold animate-pulse"
            >
              🚗 渋滞中…
            </BoardCalloutBubble>
          </motion.div>
        )}
      </AnimatePresence>

      {playerName && (
        <BoardCalloutBubble tail="bottom" fillColor={nameFillColor} bodyClassName={PLAYER_NAME_BUBBLE_CLASS}>
          {sugorokuPlayerName(playerName)}
        </BoardCalloutBubble>
      )}

      {!hasOverlays && !playerName && null}
    </div>
  );
}
