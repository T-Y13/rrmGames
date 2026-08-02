import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BoardCalloutBubble from "./BoardCalloutBubble";
import { MOVEMENT_FX_DICE_SHUFFLE_MS } from "../lib/sugorokuMovementFx";
import {
  SUGOROKU_DICE_BUBBLE_INNER_CLASS,
  SUGOROKU_DICE_INLINE_ROW_CLASS,
} from "../constants/sugorokuMobileLayout";

const FILL_DICE = "#1e293b";

/**
 * ダイスロール演出（シャッフル → 確定 → しばらく表示）。
 * embedded=true のときは親フレックス列内に中央配置（名前の直上向け）。
 */
export default function BoardDiceRollOverlay({
  active,
  diceRolls = [],
  shuffleMs = MOVEMENT_FX_DICE_SHUFFLE_MS,
  embedded = false,
  tail = "bottom",
  remainingTravelSteps = null,
}) {
  const [shuffleFace, setShuffleFace] = useState(1);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!active) {
      setRevealed(false);
      return undefined;
    }
    setRevealed(false);
    const shuffleTimer = setInterval(() => {
      setShuffleFace(1 + Math.floor(Math.random() * 6));
    }, 70);
    const revealTimer = setTimeout(() => {
      clearInterval(shuffleTimer);
      setRevealed(true);
    }, Math.max(200, shuffleMs));
    return () => {
      clearInterval(shuffleTimer);
      clearTimeout(revealTimer);
    };
  }, [active, shuffleMs, diceRolls.join(",")]);

  const total = diceRolls.reduce((a, v) => a + (Number(v) || 0), 0);
  const showTotal = revealed && diceRolls.length > 1;
  const showRemaining = remainingTravelSteps != null && remainingTravelSteps > 0;
  const faces = revealed ? diceRolls : [shuffleFace];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={
            embedded
              ? `pointer-events-none ${SUGOROKU_DICE_INLINE_ROW_CLASS}`
              : "pointer-events-none absolute left-1/2 z-[44] flex -translate-x-1/2 flex-col items-center gap-1"
          }
          style={embedded ? undefined : { bottom: "calc(100% + 0.5rem)" }}
          initial={{ opacity: 0, scale: 0.5, rotate: -18 }}
          animate={{ opacity: 1, scale: 1, rotate: revealed ? 0 : [0, 8, -8, 6, -4, 0] }}
          exit={{ opacity: 0, scale: 0.7, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          aria-hidden
        >
          <div className={embedded ? SUGOROKU_DICE_INLINE_ROW_CLASS : "flex flex-row flex-nowrap items-center justify-center gap-1.5"}>
            {faces.map((face, i) => (
              <motion.span
                key={`${revealed ? "r" : "s"}-${i}-${face}`}
                className="inline-flex shrink-0"
                animate={revealed ? { scale: [1, 1.12, 1] } : { rotate: [0, 14, -14, 0] }}
                transition={{ duration: revealed ? 0.25 : 0.18, repeat: revealed ? 0 : Infinity }}
              >
                <BoardCalloutBubble
                  tail={tail}
                  fillColor={FILL_DICE}
                  bodyClassName="px-2 py-1 text-lg font-black whitespace-nowrap"
                >
                  <span className={SUGOROKU_DICE_BUBBLE_INNER_CLASS}>
                    <span aria-hidden>🎲</span>
                    <span>{face}</span>
                  </span>
                </BoardCalloutBubble>
              </motion.span>
            ))}
            {showTotal && (
              <motion.span
                className="inline-flex shrink-0"
                initial={{ opacity: 0, x: embedded ? -4 : 0, y: embedded ? 0 : 4 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
              >
                <BoardCalloutBubble tail={tail} fillColor={FILL_DICE} bodyClassName="px-2 py-0.5 text-xs font-bold whitespace-nowrap">
                  <span className={SUGOROKU_DICE_BUBBLE_INNER_CLASS}>
                    <span>計</span>
                    <span>{total}</span>
                  </span>
                </BoardCalloutBubble>
              </motion.span>
            )}
            {showRemaining && (
              <motion.span
                className="inline-flex shrink-0"
                initial={{ opacity: 0, x: embedded ? -4 : 0, y: embedded ? 0 : 4 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
              >
                <BoardCalloutBubble tail={tail} fillColor="#059669" bodyClassName="px-2 py-0.5 text-sm font-black whitespace-nowrap">
                  <span className={SUGOROKU_DICE_BUBBLE_INNER_CLASS}>
                    <span aria-hidden>🎲</span>
                    <span>{remainingTravelSteps}</span>
                  </span>
                </BoardCalloutBubble>
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
