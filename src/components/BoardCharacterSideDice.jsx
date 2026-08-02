import React from "react";
import { motion } from "framer-motion";
import BoardCalloutBubble from "./BoardCalloutBubble";
import BoardDiceRollOverlay from "./BoardDiceRollOverlay";
import { MOVEMENT_FX_DICE_SHUFFLE_MS } from "../lib/sugorokuMovementFx";
import {
  SUGOROKU_DICE_BUBBLE_INNER_CLASS,
  SUGOROKU_DICE_INLINE_ROW_CLASS,
  SUGOROKU_SIDE_DICE_BUBBLE_CLASS,
} from "../constants/sugorokuMobileLayout";

const FILL_DICE = "#1e293b";
const FILL_TRAVEL = "#059669";

/** ダイス吹き出しのしっぽは常に下（キャラ頭上配置） */
const DICE_CALLOUT_TAIL = "bottom";

/**
 * キャラクター頭上に表示するダイス＋残りマス（全 viewport 共通）
 */
export default function BoardCharacterSideDice({
  localDiceItems = null,
  localDiceShowTotal = false,
  localDiceTotal = 0,
  remainingTravelSteps = null,
  movementFxDiceActive = false,
  movementFxDiceRolls = [],
}) {
  const hasLocalDice = (localDiceItems?.length ?? 0) > 0;
  const showRemaining = remainingTravelSteps != null && remainingTravelSteps > 0;

  if (movementFxDiceActive) {
    return (
      <div className={`pointer-events-none ${SUGOROKU_DICE_INLINE_ROW_CLASS}`}>
        <BoardDiceRollOverlay
          embedded
          active={movementFxDiceActive}
          diceRolls={movementFxDiceRolls}
          shuffleMs={MOVEMENT_FX_DICE_SHUFFLE_MS}
          tail={DICE_CALLOUT_TAIL}
          remainingTravelSteps={remainingTravelSteps}
        />
      </div>
    );
  }

  if (!hasLocalDice && !showRemaining) return null;

  return (
    <motion.div
      key="local-dice"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`pointer-events-none shrink-0 self-center ${SUGOROKU_DICE_INLINE_ROW_CLASS}`}
    >
      {hasLocalDice &&
        localDiceItems.map(({ value, confirmed, isGolden }, i) => (
          <BoardCalloutBubble
            key={`d-${i}-${value}-${confirmed ? "c" : "u"}`}
            tail={DICE_CALLOUT_TAIL}
            fillColor={isGolden && confirmed ? "#b45309" : FILL_DICE}
            bodyClassName={`${SUGOROKU_SIDE_DICE_BUBBLE_CLASS} whitespace-nowrap ${
              !confirmed ? "animate-pulse" : ""
            }`}
          >
            <span className={SUGOROKU_DICE_BUBBLE_INNER_CLASS}>
              <span aria-hidden>🎲</span>
              <span>{value}</span>
            </span>
          </BoardCalloutBubble>
        ))}
      {hasLocalDice && localDiceShowTotal && localDiceItems.length > 1 && (
        <BoardCalloutBubble tail={DICE_CALLOUT_TAIL} fillColor={FILL_DICE} bodyClassName="px-2 py-0.5 text-[10px] font-bold sm:text-xs">
          計 {localDiceTotal} マス
        </BoardCalloutBubble>
      )}
      {showRemaining && (
        <BoardCalloutBubble
          tail={DICE_CALLOUT_TAIL}
          fillColor={FILL_TRAVEL}
          bodyClassName="whitespace-nowrap px-2 py-0.5 text-sm font-black sm:text-base"
        >
          <span className={SUGOROKU_DICE_BUBBLE_INNER_CLASS}>
            <span aria-hidden>🎲</span>
            <span>{remainingTravelSteps}</span>
          </span>
        </BoardCalloutBubble>
      )}
    </motion.div>
  );
}
