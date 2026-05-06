import React from "react";
import { Briefcase, Tv, Dice5 } from "lucide-react";
import { BAL, CHARACTERS, FINAL_GAME_DAY, LAST_DAILY_DAY } from "../constants/gameBalance";
import { livingCostForPlayer, virtueIncomeMult } from "../utils/gameLogic";
import { SugorokuBoardPiece } from "./CharacterPieces";

const HIGH_STAT_AURA_THRESHOLD = 80;

/** 1〜7日目の行動選択・パラメータ表示 */
export default function DailyActionPhase({ gs, cpGs, onDailyAction, onOpenDailySlot, interactionLocked = false }) {
  if (!cpGs) return null;

  const dailySlotTotalBet = BAL.dailySlot.spinBet * BAL.dailySlot.spins;
  const char = CHARACTERS[cpGs.characterType] ?? CHARACTERS.salaryman;
  const pm = char.ponMultiplier ?? 1;
  const ponInc = Math.ceil(BAL.pon.dailyGain * pm);
  const ponAfterAction = cpGs.stats.pon + ponInc;

  const workRewardMul = char.workRewardMultiplier ?? 1;
  const workBonus = char.workRewardBonus ?? 0;
  const workPayShown = Math.round(
    Math.floor((BAL.work.reward + workBonus) * workRewardMul) * virtueIncomeMult(cpGs.stats.virtue),
  );

  const streamSkillLuck = cpGs.stats.skill + cpGs.stats.luck;
  const streamFailRate =
    streamSkillLuck > BAL.stream.combinedStatNoFailThreshold
      ? 0
      : Math.max(0, BAL.stream.baseFailRate - (streamSkillLuck / BAL.stream.combinedStatNoFailThreshold) * BAL.stream.baseFailRate);

  const auraShadows = [];
  const auraTextShadows = [];
  if (cpGs.stats.luck >= HIGH_STAT_AURA_THRESHOLD) {
    auraShadows.push("drop-shadow(0 0 10px rgba(250, 204, 21, 0.9))", "drop-shadow(0 0 24px rgba(250, 204, 21, 0.72))");
    auraTextShadows.push("0 0 14px rgba(250, 204, 21, 0.9)");
  }
  if (cpGs.stats.skill >= HIGH_STAT_AURA_THRESHOLD) {
    auraShadows.push("drop-shadow(0 0 10px rgba(56, 189, 248, 0.9))", "drop-shadow(0 0 24px rgba(56, 189, 248, 0.72))");
    auraTextShadows.push("0 0 14px rgba(56, 189, 248, 0.9)");
  }
  if (cpGs.stats.virtue >= HIGH_STAT_AURA_THRESHOLD) {
    auraShadows.push("drop-shadow(0 0 10px rgba(74, 222, 128, 0.9))", "drop-shadow(0 0 24px rgba(74, 222, 128, 0.72))");
    auraTextShadows.push("0 0 14px rgba(74, 222, 128, 0.9)");
  }
  const auraImgStyle = auraShadows.length > 0 ? { filter: `${auraShadows.join(" ")} saturate(1.08)` } : undefined;
  const auraSpanStyle = auraTextShadows.length > 0 ? { textShadow: auraTextShadows.join(", ") } : undefined;

  return (
    <>
      <h2 className="font-semibold">
        {gs.currentDay}日目 行動選択 — {cpGs.name}
      </h2>

      <div className="rounded-xl border border-cyan-600/45 bg-gradient-to-br from-cyan-950/50 to-slate-900/90 px-3 py-2.5 space-y-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="inline-flex items-center rounded-md border border-cyan-600/50 bg-cyan-950/70 px-2 py-1 text-[11px] font-semibold leading-tight text-cyan-100 shadow-sm">
            決戦の{FINAL_GAME_DAY}日目まで
            <strong className="mx-1 tabular-nums text-white text-xs">あと {FINAL_GAME_DAY - gs.currentDay} 日</strong>
          </span>
          <span className="text-[11px] text-slate-500 tabular-nums">
            育成 {gs.currentDay} / {LAST_DAILY_DAY} 日
          </span>
        </div>
        <div className="flex gap-1 w-full" aria-hidden="true">
          {Array.from({ length: LAST_DAILY_DAY }, (_, i) => {
            const isPast = i < gs.currentDay - 1;
            const isCurrent = i === gs.currentDay - 1;
            return (
              <span
                key={`daily-progress-${i}`}
                title={`${i + 1}日目${isCurrent ? "（今ここ）" : isPast ? "（終了）" : ""}`}
                className={
                  "h-2 min-w-[8px] flex-1 rounded-full transition-colors " +
                  (isPast ? "bg-cyan-700/85" : isCurrent ? "bg-cyan-300 ring-1 ring-cyan-100/75 shadow-[0_0_10px_rgba(34,211,238,0.55)]" : "bg-slate-700/90")
                }
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onDailyAction("work")}
            disabled={interactionLocked}
            className="inline-flex items-center gap-2 self-start rounded-xl bg-emerald-500/90 px-5 py-2.5 font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Briefcase size={18} />
            仕事（+{workPayShown}G 目安・善行反映 / 善行+{BAL.work.virtueGain}）
          </button>
          <button
            type="button"
            onClick={() => onDailyAction("stream")}
            disabled={interactionLocked}
            className="inline-flex w-fit max-w-full flex-col items-start gap-1 self-start rounded-xl bg-violet-500/90 px-5 py-2.5 font-medium text-white text-left transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="inline-flex items-center gap-2">
              <Tv size={18} aria-hidden={true} />
              配信（内容はランダム）
            </span>
            <span className="text-[11px] font-normal leading-snug text-violet-50/95 pl-[26px] space-y-1 flex flex-col">
              <span>失敗；{(streamFailRate * 100).toFixed(0)}% ＋{BAL.stream.successMin}Gのみ、ステータス増加なし</span>
              <span>成功；＋{BAL.stream.successMin}〜{BAL.stream.successMax}G（善行で増加）</span>
              <span className="pt-0.5">配信タイプ</span>
              <span>
                ・雑談；善行＋{BAL.stream.chat.virtueGainMin}〜{BAL.stream.chat.virtueGainMax}
              </span>
              <span>
                ・ゲーム；技量 ＋{BAL.stream.game.skillGainMin}〜{BAL.stream.game.skillGainMax}
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => onOpenDailySlot?.()}
            disabled={interactionLocked || cpGs.stats.money < dailySlotTotalBet}
            title={
              interactionLocked
                ? "演出中は選択できません"
                : cpGs.stats.money < dailySlotTotalBet
                  ? `資金から${dailySlotTotalBet}G必要（現在${cpGs.stats.money}G）`
                  : `所持資金から計${dailySlotTotalBet}Gを支払い。スピンごとに技量+${BAL.dailySlot.skillGainEverySpin}（毎回確定）、役が揃えばさらに+${BAL.dailySlot.skillGainOnRole}。${BAL.dailySlot.spinBet}G×${BAL.dailySlot.spins}回（筐体演出）`
            }
            className="inline-flex w-fit max-w-full flex-col items-start gap-1 self-start rounded-xl bg-fuchsia-600/90 px-5 py-2.5 font-medium text-white text-left hover:bg-fuchsia-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="inline-flex items-center gap-2">
              <Dice5 size={18} aria-hidden={true} />
              デイリースロット（資金から-{dailySlotTotalBet}G／{BAL.dailySlot.spinBet}G×{BAL.dailySlot.spins}）
            </span>
            <span className="text-[11px] font-normal leading-snug text-fuchsia-50/95 pl-[26px]">
              技量；スピンごと+{BAL.dailySlot.skillGainEverySpin}（ハズレでも）／役成立でさらに+{BAL.dailySlot.skillGainOnRole}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onDailyAction("shrine")}
            disabled={interactionLocked}
            className="inline-flex items-center gap-2 self-start rounded-xl bg-amber-600/90 px-5 py-2.5 font-medium text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="text-base leading-none">⛩</span>
            神社（-{BAL.shrine.cost}G / 運+{BAL.shrine.luckGain}）
          </button>
        </div>
        <div className="hidden sm:flex min-w-[220px] items-center justify-center self-stretch">
          <SugorokuBoardPiece
            characterType={cpGs.characterType}
            pose="normal"
            imgClassName="h-[330px] w-[210px] object-contain object-center opacity-100 -translate-x-40"
            spanClassName="text-8xl leading-none opacity-100"
            imgStyle={auraImgStyle}
            spanStyle={auraSpanStyle}
          />
        </div>
      </div>
    </>
  );
}
