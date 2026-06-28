import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import BoardCalloutBubble from "./BoardCalloutBubble";

/**
 * 駒横に浮かぶ +N / -N インジケータ（不透明塗りつぶし吹き出し）。
 */
export default function MovementFloatingLabel({ delta, visible, variant = "steps" }) {
  if (delta == null || delta === 0) return null;
  const isPositive = delta > 0;
  const isMoney = variant === "money";
  const text = isMoney
    ? `${isPositive ? "+" : ""}${delta}G`
    : isPositive
      ? `+${delta}`
      : `${delta}`;
  const fillColor = isMoney
    ? isPositive
      ? "#ca8a04"
      : "#dc2626"
    : isPositive
      ? "#059669"
      : "#dc2626";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={`${variant}-${text}`}
          className="pointer-events-none absolute left-full z-[45] ml-2"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          initial={{ opacity: 0, x: -8, scale: 0.55 }}
          animate={{ opacity: 1, x: 6, scale: 1.05 }}
          exit={{ opacity: 0, x: 14, scale: 0.85 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <BoardCalloutBubble
            tail="left"
            fillColor={fillColor}
            bodyClassName={isMoney ? "text-base sm:text-lg px-2.5 py-1.5" : "text-lg sm:text-xl px-2.5 py-1.5"}
          >
            {text}
          </BoardCalloutBubble>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
