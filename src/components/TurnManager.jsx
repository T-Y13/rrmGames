import React, { useEffect } from "react";
import { Users } from "lucide-react";
import { CharacterIcon } from "./CharacterPieces";
import {
  hasSugorokuBoardTargets,
  isGhostPickTargetPhase,
  isSugorokuBoardPlaying,
  pickGhostSlotTarget,
  skipGhostTurnAllPlayersArrived,
} from "../utils/gameLogic";

/**
 * マルチ8日目：脱落プレイヤーの代理スロット標的選択・観戦スキップ。
 */
export default function TurnManager({ gs, cpGs, isMyTurn, writeGS, interactionLocked }) {
  useEffect(() => {
    if (!isMyTurn || !gs || !cpGs || gs.subPhase !== "day8" || gs.gamePhase !== "playing") return;
    if (!isGhostPickTargetPhase(cpGs)) return;
    if (hasSugorokuBoardTargets(gs.players)) return;
    const next = skipGhostTurnAllPlayersArrived(gs);
    if (next) void writeGS(next);
  }, [isMyTurn, gs, cpGs, writeGS]);

  if (!gs || !cpGs || !isMyTurn || !isGhostPickTargetPhase(cpGs)) return null;

  const targets = gs.players
    .map((p, idx) => ({ p, idx }))
    .filter(({ p }) => isSugorokuBoardPlaying(p));

  const handlePick = async (targetIdx) => {
    if (interactionLocked) return;
    const next = pickGhostSlotTarget(gs, targetIdx);
    if (next) await writeGS(next);
  };

  return (
    <div className="rounded-2xl border border-violet-500/55 bg-gradient-to-br from-violet-950/40 to-slate-900/90 p-5 space-y-4 shadow-[0_0_40px_rgba(139,92,246,0.12)]">
      <div className="flex items-center gap-2 text-violet-200">
        <Users size={20} className="shrink-0" />
        <h2 className="text-lg font-black tracking-tight">代理スロット — 標的を選ぶ</h2>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">
        すごろく中のプレイヤーを一人選び、その人の資金でスロットを回します（当たり・ハズレは標的の所持金に反映）。
      </p>
      <ul className="space-y-2">
        {targets.map(({ p, idx }) => (
          <li key={p.id}>
            <button
              type="button"
              disabled={interactionLocked}
              onClick={() => void handlePick(idx)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-left transition-colors hover:border-violet-500/60 hover:bg-violet-500/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="flex items-center gap-2 font-semibold text-slate-100">
                <CharacterIcon
                  characterType={p.characterType}
                  imgClassName="h-8 w-8 shrink-0 object-contain"
                  spanClassName="text-2xl leading-none"
                />
                {p.name}
              </span>
              <span className="text-sm font-bold tabular-nums text-amber-200">{p.stats.money}G</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
