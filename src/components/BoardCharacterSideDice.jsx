import React from "react";
import { motion } from "framer-motion";
import BoardCalloutBubble from "./BoardCalloutBubble";
import BoardDiceRollOverlay from "./BoardDiceRollOverlay";
import { MOVEMENT_FX_DICE_SHUFFLE_MS } from "../lib/sugorokuMovementFx";
import { SUGOROKU_SIDE_DICE_BUBBLE_CLASS } from "../constants/sugorokuMobileLayout";

const FILL_DICE = "#1e293b";

/**
 * キャラクター横に表示するダイス（SP でもビューポート外に出にくい）
 */
export default function BoardCharacterSideDice({
  localDiceItems = null,
  localDiceShowTotal = false,
  localDiceTotal = 0,
  movementFxDiceActive = false,
  movementFxDiceRolls = [],
}) {
  const hasLocalDice = (localDiceItems?.length ?? 0) > 0;

  if (movementFxDiceActive) {
    return (
      <div className="pointer-events-none shrink-0 self-center pb-1 sm:pb-2">
        <BoardDiceRollOverlay
          embedded
          active={movementFxDiceActive}
          diceRolls={movementFxDiceRolls}
          shuffleMs={MOVEMENT_FX_DICE_SHUFFLE_MS}
        />
      </div>
    );
  }

  if (!hasLocalDice) return null;

  return (
    <motion.div
      key="local-dice"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="pointer-events-none flex shrink-0 flex-col items-center gap-0.5 self-center pb-1 sm:pb-2"
    >
      <div className="flex flex-wrap items-center justify-center gap-1">
        {localDiceItems.map(({ value, confirmed, isGolden }, i) => (
          <BoardCalloutBubble
            key={`d-${i}-${value}-${confirmed ? "c" : "u"}`}
            tail="bottom"
            fillColor={isGolden && confirmed ? "#b45309" : FILL_DICE}
            bodyClassName={`${SUGOROKU_SIDE_DICE_BUBBLE_CLASS} ${
              !confirmed ? "animate-pulse" : ""
            }`}
          >
            🎲 {value}
          </BoardCalloutBubble>
        ))}
      </div>
      {localDiceShowTotal && localDiceItems.length > 1 && (
        <BoardCalloutBubble tail="bottom" fillColor={FILL_DICE} bodyClassName="px-2 py-0.5 text-[10px] font-bold sm:text-xs">
          計 {localDiceTotal} マス
        </BoardCalloutBubble>
      )}
    </motion.div>
  );
}
