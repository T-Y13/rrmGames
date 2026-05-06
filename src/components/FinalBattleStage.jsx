import React, { useEffect, useMemo, useRef, useState } from "react";
import { BOARD_GOAL, FINAL_BATTLE_SPLASH_MS } from "../constants/gameBalance";
import { toEpochMsMaybe } from "../utils/gameLogic";
import BoardViewport from "./BoardViewport";

/** 「決戦の日」簡易表示 + 決戦マップ */
export default function FinalBattleStage({ gameState, soundRef }) {
  const [tick, setTick] = useState(() => Date.now());
  const hornArmed = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 50);
    return () => clearInterval(id);
  }, []);

  const startedCueKey =
    gameState?.finalBattleStartedAt != null ? JSON.stringify(gameState.finalBattleStartedAt) : "";

  useEffect(() => {
    hornArmed.current = false;
  }, [startedCueKey]);

  const players = gameState?.players ?? [];
  const startedMs = toEpochMsMaybe(gameState?.finalBattleStartedAt);
  const [localStartMs] = useState(() => Date.now());
  const startedAnchor = Number.isFinite(startedMs) ? startedMs : localStartMs;
  const elapsed = Math.max(0, tick - startedAnchor);
  const introActive = elapsed < FINAL_BATTLE_SPLASH_MS;
  const mapPhase = elapsed >= FINAL_BATTLE_SPLASH_MS;

  /** 7日目→8日目は「決戦の日」のみ→即本番すごろく（このコンポーネントではマップ試写しない） */
  const isPreDay8 = gameState?.finalBattleEntry === "preDay8";

  useEffect(() => {
    const sm = soundRef?.current;
    if (!sm || !introActive) return;
    if (hornArmed.current) return;
    hornArmed.current = true;
    sm.tryPlayWarHornIfLoaded();
  }, [introActive, soundRef]);

  useEffect(() => {
    const sm = soundRef?.current;
    if (!sm) return;
    if (mapPhase) sm.stopWarHorn();
  }, [mapPhase, soundRef]);

  useEffect(
    () => () => {
      soundRef?.current?.stopWarHorn?.();
    },
    [soundRef],
  );

  const refPlayer = !isPreDay8 ? (players.filter((p) => p.alive)[0] ?? players[0] ?? null) : null;
  const viewPos = !isPreDay8
    ? refPlayer
      ? Math.min(BOARD_GOAL, Math.max(0, refPlayer.position))
      : Math.floor(BOARD_GOAL * 0.62)
    : 0;

  useEffect(() => {
    if (!mapPhase || isPreDay8) return;
    try {
      if (typeof document !== "undefined" && document.fonts?.ready) void document.fonts.ready.then(() => {}).catch(() => {});
    } catch (_) {}
  }, [mapPhase, isPreDay8]);

  const battleEmbers = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        leftPct: 5 + ((i * 47) % 90),
        bottomPct: 22 + (i % 7) * 4,
        delayMs: (i * 67) % 900,
        durSec: 0.75 + (i % 6) * 0.13,
      })),
    [],
  );

  return (
    <div className="relative min-h-screen w-full bg-slate-950">
      {!isPreDay8 && (
        <div
          className={
            mapPhase
              ? "relative z-10 w-full mx-auto px-3 py-4 space-y-3"
              : "fixed inset-0 z-[5] w-full mx-auto px-3 py-4 space-y-3 opacity-0 pointer-events-none overflow-hidden"
          }
          aria-hidden={!mapPhase}
        >
          {mapPhase && (
            <div className="text-center space-y-1">
              <h2
                className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-violet-100 to-indigo-300 tracking-[0.08em]"
                style={{ fontFamily: "'Zen Old Mincho',serif" }}
              >
                決戦の地
                <span className="text-slate-400 text-xs md:text-sm ml-2 font-normal tracking-normal">
                  ／ 夜ノ神社へ
                </span>
              </h2>
              <p className="text-xs text-indigo-200/65">参道には霧。青く冷たい火屑だけが漂う——</p>
            </div>
          )}
          <div className="h-[min(720px,80vh)] min-h-[min(560px,72vh)] overflow-hidden rounded-2xl border border-indigo-800/65 shadow-[0_0_72px_rgba(79,70,229,0.2)] bg-black/40 mx-auto max-w-4xl">
            <BoardViewport
              players={players}
              viewPos={viewPos}
              boardGoal={BOARD_GOAL}
              isDiceRolling={false}
              taxiPhase={null}
              pieceHopping={false}
              currentPlayer={refPlayer}
              visualTheme="nightShrine"
              tileEffects={gameState?.sugorokuTileEffects ?? null}
            />
          </div>
        </div>
      )}

      {/* 7日目終了→8日目：1.5秒 金色の炎のような文字のみ、その後すごろくへ */}
      {introActive && isPreDay8 && (
        <div
          key={startedCueKey}
          className="fixed inset-0 z-50 flex min-h-[100dvh] w-full items-center justify-center bg-neutral-950 px-5 pointer-events-none"
        >
          <h2 className="fb-preday8-burn-title text-center px-3 max-w-[min(94vw,40rem)]">決戦の日</h2>
        </div>
      )}

      {introActive && !isPreDay8 && (
        <div key={startedCueKey} className="fixed inset-0 z-50 overflow-hidden pointer-events-none anim-fb-shake-once isolate">
          <div className="absolute inset-0 bg-neutral-950" aria-hidden />
          <div className="absolute inset-0 anim-fb-heat-wave" aria-hidden />
          <div className="absolute inset-0 anim-fb-heat-bg" aria-hidden />
          <div
            aria-hidden
            className="anim-fb-flame-sheet anim-fb-flame-sheet-delay pointer-events-none absolute left-1/2 bottom-[14%] w-[118%] max-w-none -translate-x-1/2 h-[72%]"
            style={{
              borderRadius: "45% 45% 50% 50%",
              background:
                "linear-gradient(to top,#7f1d1d 0%,#b91c1c 28%,#ea580c 58%,rgba(251,191,36,0.5) 88%,transparent 100%)",
            }}
          />
          <div
            aria-hidden
            className="anim-fb-flame-sheet pointer-events-none absolute left-1/2 bottom-[17%] w-[94%] max-w-none -translate-x-1/2 h-[62%]"
            style={{
              borderRadius: "48% 48% 50% 50%",
              mixBlendMode: "screen",
              background:
                "linear-gradient(to top,#451a03 0%,#dc2626 35%,#fb923c 65%,rgba(254,249,195,0.55) 95%,transparent 100%)",
            }}
          />

          <div className="absolute inset-0 z-[1]" aria-hidden>
            {battleEmbers.map((e) => (
              <span
                key={e.id}
                className="anim-fb-ember-dot"
                style={{
                  left: `${e.leftPct}%`,
                  bottom: `${e.bottomPct}%`,
                  ["--delay"]: `${e.delayMs}ms`,
                  ["--dur"]: `${e.durSec}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex h-full min-h-[100dvh] w-full items-center justify-center px-5">
            <h2 className="fb-decisive-title text-center px-3 max-w-[min(94vw,40rem)]">決戦の日</h2>
          </div>
        </div>
      )}
    </div>
  );
}
