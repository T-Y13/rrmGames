import React, { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SLOT_JACKPOT_CELEBRATION_MS } from "../utils/gameLogic";

const PARTICLE_ICONS = ["🪙", "⭐", "💎", "✨", "🎰", "💰"];
const PARTICLE_COUNT = 26;

function buildParticles(seed) {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const n = (seed + i * 17) % 97;
    return {
      id: i,
      left: `${(n * 13 + 7) % 100}%`,
      delay: (i % 8) * 0.06,
      duration: 1.35 + (i % 5) * 0.25,
      size: i % 4 === 0 ? "1.75rem" : i % 3 === 0 ? "1.35rem" : "1.1rem",
      icon: PARTICLE_ICONS[i % PARTICLE_ICONS.length],
      drift: ((i % 7) - 3) * 18,
    };
  });
}

/**
 * フルスクリーン・ジャックポット祝砲。マルチ同期表示用（SlotSpinBroadcastOverlay / SlotMachine）。
 */
export default function JackpotCelebration({
  show = false,
  actorName = "",
  payout = 0,
  durationMs = SLOT_JACKPOT_CELEBRATION_MS,
  onComplete,
}) {
  const particles = useMemo(() => buildParticles(show ? Date.now() % 1000 : 0), [show]);

  useEffect(() => {
    if (!show) return undefined;
    const timer = setTimeout(() => onComplete?.(), durationMs);
    return () => clearTimeout(timer);
  }, [show, durationMs, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[220] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="presentation"
          aria-hidden
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(250,204,21,0.35) 0%, rgba(234,179,8,0.12) 45%, transparent 72%)",
            }}
            animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.04, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(251,191,36,0.08) 60deg, transparent 120deg, rgba(245,158,11,0.1) 200deg, transparent 280deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute select-none"
              style={{
                left: p.left,
                top: "-8%",
                fontSize: p.size,
                filter: "drop-shadow(0 0 6px rgba(251,191,36,0.85))",
              }}
              initial={{ y: "-10%", opacity: 0, rotate: 0 }}
              animate={{
                y: ["0vh", "108vh"],
                opacity: [0, 1, 1, 0],
                rotate: [0, p.drift],
                x: [0, p.drift * 0.4, p.drift * 0.8],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeIn",
              }}
            >
              {p.icon}
            </motion.span>
          ))}

          <motion.div
            className="relative z-10 mx-4 max-w-lg text-center"
            initial={{ scale: 0.15, opacity: 0, y: 40 }}
            animate={{
              scale: [0.15, 1.18, 0.96, 1.05, 1],
              opacity: 1,
              y: 0,
              rotate: [0, -4, 4, -2, 0],
            }}
            exit={{ scale: 0.75, opacity: 0, y: -24 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1.2, 0.36, 1],
              rotate: { duration: 0.45, ease: "easeOut" },
            }}
          >
            <motion.div
              className="mb-3 inline-block rounded-full border-2 border-amber-300/80 bg-amber-500/20 px-4 py-1 text-xs font-bold tracking-[0.35em] text-amber-200 uppercase sm:text-sm"
              animate={{
                boxShadow: [
                  "0 0 12px rgba(251,191,36,0.4)",
                  "0 0 28px rgba(251,191,36,0.85)",
                  "0 0 12px rgba(251,191,36,0.4)",
                ],
              }}
              transition={{ duration: 0.9, repeat: Infinity }}
            >
              Jackpot
            </motion.div>

            <motion.h1
              className="font-black leading-none tracking-tight text-transparent bg-clip-text"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 4.5rem)",
                backgroundImage:
                  "linear-gradient(180deg, #fff7c2 0%, #fde047 35%, #f59e0b 70%, #d97706 100%)",
                WebkitTextStroke: "2px rgba(120,53,15,0.75)",
                paintOrder: "stroke fill",
                filter: "drop-shadow(0 0 24px rgba(251,191,36,0.9)) drop-shadow(0 4px 0 rgba(120,53,15,0.5))",
              }}
              animate={{
                scale: [1, 1.06, 1, 1.04, 1],
                y: [0, -4, 0, -2, 0],
              }}
              transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut" }}
            >
              777 JACKPOT!!
            </motion.h1>

            <motion.p
              className="mt-3 text-lg font-bold text-amber-100 sm:text-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.32 }}
            >
              🎰 超大当たり！ 🎰
            </motion.p>

            {(actorName || payout > 0) && (
              <motion.div
                className="mt-4 space-y-1 rounded-xl border border-amber-400/40 bg-black/35 px-4 py-3 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.32, duration: 0.3 }}
              >
                {actorName && (
                  <p className="text-sm font-semibold text-amber-200/90 sm:text-base">
                    {actorName}
                  </p>
                )}
                {payout > 0 && (
                  <motion.p
                    className="text-2xl font-black tabular-nums text-[#ffe566] sm:text-3xl"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    +{payout}G
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
