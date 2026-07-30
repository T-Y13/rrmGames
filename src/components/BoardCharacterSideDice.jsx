import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BoardCalloutBubble from "./BoardCalloutBubble";
import BoardDiceRollOverlay from "./BoardDiceRollOverlay";
import { MOVEMENT_FX_DICE_SHUFFLE_MS } from "../lib/sugorokuMovementFx";
import {
  SUGOROKU_PC_MEDIA_QUERY,
  SUGOROKU_SIDE_DICE_BUBBLE_CLASS,
} from "../constants/sugorokuMobileLayout";

const FILL_DICE = "#1e293b";
const FILL_TRAVEL = "#059669";

function usePcViewport() {
  const [isPc, setIsPc] = useState(
    () => typeof window !== "undefined" && window.matchMedia(SUGOROKU_PC_MEDIA_QUERY).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(SUGOROKU_PC_MEDIA_QUERY);
    const onChange = () => setIsPc(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isPc;
}

/** SP: ダイスはキャラ左 → しっぽ右向き / PC: ダイスはキャラ上 → しっぽ下向き */
function diceBubbleTail(isPc) {
  return isPc ? "bottom" : "right";
}

/**
 * キャラクター横（SP）または上（PC）に表示するダイス＋残りマス
 */
export default function BoardCharacterSideDice({
  localDiceItems = null,
  localDiceShowTotal = false,
  localDiceTotal = 0,
  remainingTravelSteps = null,
  movementFxDiceActive = false,
  movementFxDiceRolls = [],
}) {
  const isPc = usePcViewport();
  const tail = diceBubbleTail(isPc);
  const hasLocalDice = (localDiceItems?.length ?? 0) > 0;
  const showRemaining = remainingTravelSteps != null && remainingTravelSteps > 0;

  if (movementFxDiceActive) {
    return (
      <div className="pointer-events-none shrink-0 self-center pb-1 sm:pb-2">
        <BoardDiceRollOverlay
          embedded
          active={movementFxDiceActive}
          diceRolls={movementFxDiceRolls}
          shuffleMs={MOVEMENT_FX_DICE_SHUFFLE_MS}
          tail={tail}
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
      className="pointer-events-none flex shrink-0 flex-row flex-wrap items-center justify-center gap-1 self-center pb-1 sm:pb-2"
    >
      {hasLocalDice &&
        localDiceItems.map(({ value, confirmed, isGolden }, i) => (
          <BoardCalloutBubble
            key={`d-${i}-${value}-${confirmed ? "c" : "u"}`}
            tail={tail}
            fillColor={isGolden && confirmed ? "#b45309" : FILL_DICE}
            bodyClassName={`${SUGOROKU_SIDE_DICE_BUBBLE_CLASS} ${
              !confirmed ? "animate-pulse" : ""
            }`}
          >
            🎲 {value}
          </BoardCalloutBubble>
        ))}
      {hasLocalDice && localDiceShowTotal && localDiceItems.length > 1 && (
        <BoardCalloutBubble tail={tail} fillColor={FILL_DICE} bodyClassName="px-2 py-0.5 text-[10px] font-bold sm:text-xs">
          計 {localDiceTotal} マス
        </BoardCalloutBubble>
      )}
      {showRemaining && (
        <BoardCalloutBubble
          tail={tail}
          fillColor={FILL_TRAVEL}
          bodyClassName="whitespace-nowrap px-2 py-0.5 text-[10px] font-bold sm:text-xs"
        >
          残り{remainingTravelSteps}マス…
        </BoardCalloutBubble>
      )}
    </motion.div>
  );
}
