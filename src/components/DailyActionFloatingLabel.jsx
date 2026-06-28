import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import BoardCalloutBubble from "./BoardCalloutBubble";

/** 日常行動の短いテキストラベル（駒上・吹き出し付き） */
export default function DailyActionFloatingLabel({ label, visible }) {
  if (!label) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={label}
          className="pointer-events-none absolute left-1/2 z-[46] -translate-x-1/2"
          style={{ bottom: "calc(100% + 0.35rem)" }}
          initial={{ opacity: 0, y: 8, scale: 0.6 }}
          animate={{ opacity: 1, y: -36, scale: 1.05 }}
          exit={{ opacity: 0, y: -64, scale: 0.85 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <BoardCalloutBubble tail="bottom" tone="action" bodyClassName="text-sm sm:text-base px-2.5 py-1.5">
            {label}
          </BoardCalloutBubble>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
