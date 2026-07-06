import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Dice5, Loader2 } from "lucide-react";
import { CharacterIcon } from "./CharacterPieces";
import StatGauge from "./StatGauge";
import TopRightHud from "./TopRightHud";
import CopyClipboardButton from "./CopyClipboardButton";
import {
  CHARACTERS,
  SECRET_RIRIMU_CHARACTER_KEY,
  isSecretRirimuUnlockedByTrimmedPlayerName,
} from "../constants/gameBalance";
import {
  computeFinalStatsFromInitialRolls,
  initialStatGaugeRanges,
  livingRollFromInitialRolls,
  normalizeSlotInitialRolls,
  isLobbyMemberReady,
  rollInitialRolls,
} from "../utils/gameLogic";

/** キャラ未選択時のプレビュー／抽選はこのタイプの補正で算出（ゲーム開始時も character なしなら同様に salaryman） */
const LOBBY_DEFAULT_CHAR_KEY = "salaryman";

/** ダイスによる再抽選は最大この回数まで（初回の raw 確定はキャラ選択で同期） */
const MAX_REROLLS = 3;
/** キャラ確定を1回含むと、再抽選込みで計 {MAX_TOTAL_STAT_TRIES} 試行まで */
const MAX_TOTAL_STAT_TRIES = MAX_REROLLS + 1;

const GAUGE_ROWS = [
  {
    id: "luck",
    label: "運",
    valueKey: "luck",
    rollKey: "luckRoll",
    suffix: "",
    rangeKey: "luck",
    overview:
      "運気の強さです。伸びるとすごろくのダイスなどで追い風になりやすくなります。一定値を超えるとダイスが増える！？",
  },
  {
    id: "skill",
    label: "技量",
    valueKey: "skill",
    rollKey: "skillRoll",
    suffix: "",
    rangeKey: "skill",
    overview: "腕前やコツのイメージです。スロットでは当たりやすさなどに効いてきます。",
  },
  {
    id: "virtue",
    label: "善行",
    valueKey: "virtue",
    rollKey: "virtueRoll",
    suffix: "",
    rangeKey: "virtue",
    overview: "善行の蓄えです。ダイスや日常イベントで「最低限ここまで」が変わるなど、行動の土台に効きます。",
  },
  {
    id: "pon",
    label: "PON",
    valueKey: "pon",
    rollKey: "ponRoll",
    suffix: "",
    rangeKey: "pon",
    overview: "ストレスや無謀さの目安です。高まると荒れた展開に振れやすくなります。",
  },
  {
    id: "livingCost",
    label: "生活費",
    valueKey: "livingCost",
    rollKey: "livingRoll",
    suffix: "G",
    rangeKey: "livingCost",
    overview: "暮らしの固定費です。日が進むたびにこの負担がのしかかり、資金との攻防になります。",
  },
];

function baselineLobbyStatsFor(charKey) {
  const r = initialStatGaugeRanges(charKey);
  return {
    luck: r.luck.min,
    skill: r.skill.min,
    virtue: r.virtue.min,
    pon: r.pon.min,
    livingCost: r.livingCost.min,
  };
}

/** 抽選前でも欠損キーを埋める。下限はそのキャラの取りうる最小値（バー 0% と一致） */
function lobbyDisplayFromSlot(stats, charKey) {
  const base = baselineLobbyStatsFor(charKey);
  const merged = { ...base };
  if (!stats || typeof stats !== "object") return merged;
  for (const key of Object.keys(base)) {
    const v = stats[key];
    if (Number.isFinite(Number(v))) merged[key] = Number(v);
  }
  return { ...stats, ...merged };
}

/** 抽選アニメ・ゲージ用：raw ダイス + 選択キャラで最終値と luckRoll 等をまとめたスナップショット */
function buildPendingDisplayFromRaw(raw, charKey) {
  const final = computeFinalStatsFromInitialRolls(raw, charKey);
  return {
    luck: final.luck,
    skill: final.skill,
    virtue: final.virtue,
    pon: final.pon,
    livingCost: final.livingCost,
    luckRoll: raw.luck,
    skillRoll: raw.skill,
    virtueRoll: raw.virtue,
    ponRoll: raw.pon,
    livingRoll: livingRollFromInitialRolls(raw),
  };
}

const GAUGE_ROW_GAP_MS = 148;
const GAUGE_ROW_FIRST_MS = 72;
/** handleRollClick 内の確定ループの sleep 合計（生活費マージ直前まで） */
const STAGGER_TO_LIVING_MS = GAUGE_ROW_FIRST_MS + GAUGE_ROW_GAP_MS * (GAUGE_ROWS.length - 1);

function pctClamp(v) {
  return `${Math.max(0, Math.min(100, v)).toFixed(3)}%`;
}

/** シャッフル終了時刻と生活費確定時刻を同一タイムラインに載せた dice アニメーション */
function buildDiceRollSyncCss(shuffleMs, totalMs) {
  const L = totalMs > 0 ? (shuffleMs / totalMs) * 100 : 100;
  return `
@keyframes dice-roll-sync {
  0% {
    transform: translate(-110px, -55px) rotate(0deg) scale(0.82);
    filter: drop-shadow(12px 18px 8px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 14px rgba(255, 255, 255, 0.35));
  }
  ${pctClamp(L * 0.38)} {
    transform: translate(-52px, 14px) rotate(210deg) scale(1);
    filter: drop-shadow(10px 14px 10px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.28));
  }
  ${pctClamp(L * 0.72)} {
    transform: translate(10px, -24px) rotate(460deg) scale(1.08);
    filter: drop-shadow(8px 12px 12px rgba(0, 0, 0, 0.42)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.22));
  }
  ${pctClamp(L * 0.94)} {
    transform: translate(0, 0) rotate(660deg) scale(1);
    filter: drop-shadow(6px 10px 14px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.25));
  }
  ${pctClamp(L)} {
    transform: translate(0, 0) rotate(720deg) scale(1);
    filter: drop-shadow(6px 10px 14px rgba(0, 0, 0, 0.48)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.28));
  }
  ${pctClamp(L + (100 - L) * 0.42)} {
    transform: translate(0, -12px) rotate(738deg) scale(1.05);
    filter: drop-shadow(12px 22px 18px rgba(0, 0, 0, 0.32)) drop-shadow(0 0 18px rgba(255, 255, 255, 0.32));
  }
  ${pctClamp(L + (100 - L) * 0.78)} {
    transform: translate(0, 3px) rotate(720deg) scale(1);
    filter: drop-shadow(8px 12px 14px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.28));
  }
  100% {
    transform: translate(0, 0) rotate(720deg) scale(1);
    filter: drop-shadow(8px 14px 16px rgba(0, 0, 0, 0.48)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
  }
}
.dice-roll-sync {
  animation-name: dice-roll-sync;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.25, 0.82, 0.38, 1);
  will-change: transform, filter;
}
@media (prefers-reduced-motion: reduce) {
  .dice-roll-sync {
    animation: none !important;
    transform: none !important;
    filter: drop-shadow(8px 14px 14px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.25)) !important;
  }
}
`;
}

function randomLobbySnapshot(ranges) {
  const rLin = (min, max) => min + Math.random() * (max - min);
  const ri = () => Math.floor(Math.random() * 6);
  return {
    luck: rLin(ranges.luck.min, ranges.luck.max),
    skill: rLin(ranges.skill.min, ranges.skill.max),
    virtue: rLin(ranges.virtue.min, ranges.virtue.max),
    pon: rLin(ranges.pon.min, ranges.pon.max),
    livingCost: rLin(ranges.livingCost.min, ranges.livingCost.max),
    luckRoll: ri(),
    skillRoll: ri(),
    virtueRoll: ri(),
    ponRoll: ri(),
    livingRoll: ri(),
  };
}

function mergeRowsIntoSnapshot(snapshot, pending, throughIndexInclusive) {
  const next = { ...snapshot };
  for (let i = 0; i <= throughIndexInclusive; i++) {
    const { valueKey, rollKey } = GAUGE_ROWS[i];
    next[valueKey] = pending[valueKey];
    next[rollKey] = pending[rollKey];
  }
  return next;
}

const LOBBY_ANIM_CSS = `
@keyframes lobby-gauge-fill-shuffle {
  0%, 100% { transform: translateX(0) scaleX(1); }
  20% { transform: translateX(6%) scaleX(1.04); }
  45% { transform: translateX(-10%) scaleX(0.92); }
  70% { transform: translateX(8%) scaleX(1.06); }
}
.lobby-gauge-fill-shuffle {
  animation: lobby-gauge-fill-shuffle 0.09s linear infinite;
}
@keyframes lobby-gauge-max-ring {
  0% { box-shadow: inset 0 0 0 1px rgba(239,255,66,0.95), 0 0 6px 2px rgba(239,255,66,0.65); }
  40% { box-shadow: inset 0 0 10px 4px rgba(239,255,66,0.85), 0 0 18px 6px rgba(239,255,66,0.95); }
  100% { box-shadow: inset 0 0 0 0 transparent, 0 0 0 0 transparent; }
}
.lobby-gauge-max-ring {
  animation: lobby-gauge-max-ring 0.65s ease-out 1;
}
@keyframes ririm-secret-shimmer {
  0%, 100% {
    border-color: rgba(167, 139, 250, 0.55);
    box-shadow:
      inset 0 0 28px rgba(139, 92, 246, 0.22),
      0 0 18px rgba(244, 114, 182, 0.25);
    filter: saturate(1.05);
  }
  50% {
    border-color: rgba(244, 114, 182, 0.75);
    box-shadow:
      inset 0 0 38px rgba(244, 114, 182, 0.28),
      0 0 28px rgba(250, 204, 21, 0.35);
    filter: saturate(1.14);
  }
}
.ririm-secret-card {
  animation: ririm-secret-shimmer 1.65s ease-in-out infinite;
}
@keyframes ririm-secret-glitter {
  0% { transform: translateY(8px) scale(0.82); opacity: 0; }
  24% { opacity: 0.95; }
  62% { transform: translateY(-10px) scale(1.08); opacity: 0.8; }
  100% { transform: translateY(-24px) scale(1.22); opacity: 0; }
}
.ririm-secret-glitter {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.ririm-secret-glitter span {
  position: absolute;
  color: rgba(253, 224, 71, 0.95);
  text-shadow: 0 0 10px rgba(250, 204, 21, 0.72);
  animation: ririm-secret-glitter 1.8s ease-in-out infinite;
}
.ririm-secret-glitter span:nth-child(1) { left: 10%; bottom: 8%; animation-delay: 0s; }
.ririm-secret-glitter span:nth-child(2) { left: 36%; bottom: 12%; animation-delay: 0.35s; }
.ririm-secret-glitter span:nth-child(3) { left: 62%; bottom: 10%; animation-delay: 0.75s; }
.ririm-secret-glitter span:nth-child(4) { left: 84%; bottom: 14%; animation-delay: 1.1s; }
@media (prefers-reduced-motion: reduce) {
  .ririm-secret-card {
    animation: none;
  }
  .ririm-secret-glitter span {
    animation: none;
    opacity: 0.6;
  }
}
`;

/** 自分キャラ選択〜ステータスプレビュー（キャラ選択で raw 初回同期可・ダイスボタンは再抽選） */
function CharacterLobbyPrep({
  playerSlots,
  myId,
  onSelectCharacter,
  onCommitInitialRolls,
  soundRef,
  waitingSessionKey,
  unlockPlayerNameForSecret,
  onSecretCharacterSelected,
}) {
  const mySlot = playerSlots.find((s) => s.id === myId);
  const selectedKey = mySlot?.character ?? null;

  const secretUnlockActive = useMemo(() => {
    const fromSlot = mySlot?.name ?? "";
    const fromApp = unlockPlayerNameForSecret ?? "";
    return (
      isSecretRirimuUnlockedByTrimmedPlayerName(fromSlot) ||
      isSecretRirimuUnlockedByTrimmedPlayerName(fromApp)
    );
  }, [mySlot?.name, unlockPlayerNameForSecret]);

  const visibleCharacters = useMemo(
    () =>
      Object.values(CHARACTERS).filter(
        (c) => c.key !== SECRET_RIRIMU_CHARACTER_KEY || secretUnlockActive,
      ),
    [secretUnlockActive],
  );

  /** Firestore へ書いた raw（locked） */
  const [lockedRawRolls, setLockedRawRolls] = useState(null);
  /** プレビュー抽選を実行した回数（最大 MAX_TOTAL_STAT_TRIES） */
  const [previewTriesDone, setPreviewTriesDone] = useState(0);
  const [localRawRolls, setLocalRawRolls] = useState(() => rollInitialRolls());
  const [isRolling, setIsRolling] = useState(false);
  const [shuffleBars, setShuffleBars] = useState(false);
  const [animDisplay, setAnimDisplay] = useState(null);
  const [glowRows, setGlowRows] = useState(() => new Set());
  /** ダイス dice-roll-sync の総時間（shuffle + 確定待ち＝生活費まで） */
  const [activeDiceMs, setActiveDiceMs] = useState(920);
  const [diceSyncCss, setDiceSyncCss] = useState("");
  /** 転がり演出中にダイスを表示 */
  const [diceFlyActive, setDiceFlyActive] = useState(false);
  const timersRef = useRef([]);
  const diceFlyFallbackRef = useRef(null);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => {
        clearInterval(id);
        clearTimeout(id);
      });
      timersRef.current = [];
    };
  }, []);

  /** 初回確定（キャラ or ダイス1回目）のあとから数えた「ダイスで振り直せる回数」の残り（開幕は MAX_REROLLS の 3） */
  const remainingRerolls = Math.max(0, MAX_REROLLS - Math.max(0, previewTriesDone - 1));
  const canRollStats = previewTriesDone < MAX_TOTAL_STAT_TRIES && !isRolling;
  const rollCharKey = selectedKey ?? LOBBY_DEFAULT_CHAR_KEY;
  /** ゲージ幅・プレビューは現在選択キャラの取りうる範囲に合わせる */
  const gaugeRanges = initialStatGaugeRanges(rollCharKey);

  useLayoutEffect(() => {
    if (isRolling) return;
    setLockedRawRolls(null);
    setPreviewTriesDone(0);
    setLocalRawRolls(rollInitialRolls());
    setAnimDisplay(null);
    setShuffleBars(false);
    setDiceFlyActive(false);
    setDiceSyncCss("");
    setGlowRows(new Set());
  }, [waitingSessionKey]);

  const serverRolls = normalizeSlotInitialRolls(mySlot?.initialRolls);
  const serverRollsKey = serverRolls ? `${serverRolls.luck}-${serverRolls.skill}-${serverRolls.virtue}-${serverRolls.pon}` : "";

  /** リロードや再入室など、すでに Firestore に確定済みならローカルと同期する */
  useEffect(() => {
    if (isRolling) return;
    if (!serverRolls) return;
    setLockedRawRolls(serverRolls);
    setLocalRawRolls(serverRolls);
    setPreviewTriesDone((p) => Math.max(p, 1));
  }, [serverRollsKey, isRolling]);

  const previewPending = buildPendingDisplayFromRaw(lockedRawRolls ?? localRawRolls, rollCharKey);
  const display = animDisplay ?? lobbyDisplayFromSlot(previewPending, rollCharKey);
  const legacyRoll = display?.roll != null ? display.roll : null;

  const trackSleep = (ms) =>
    new Promise((resolve) => {
      const id = setTimeout(resolve, ms);
      timersRef.current.push(id);
    });

  const handlePickCharacter = async (charKey) => {
    if (isRolling) return;
    if (charKey === SECRET_RIRIMU_CHARACTER_KEY) {
      onSecretCharacterSelected?.();
    }
    const alreadySynced = normalizeSlotInitialRolls(mySlot?.initialRolls) != null;
    if (!alreadySynced) {
      const raw = lockedRawRolls ?? localRawRolls;
      const payload = normalizeSlotInitialRolls({
        luck: raw.luck,
        skill: raw.skill,
        virtue: raw.virtue,
        pon: raw.pon,
      });
      if (payload) {
        await onSelectCharacter(charKey, payload);
        setLockedRawRolls(payload);
        setLocalRawRolls(payload);
        setPreviewTriesDone((p) => Math.max(p, 1));
        return;
      }
    }
    await onSelectCharacter(charKey);
  };

  const handleRollClick = async () => {
    if (!canRollStats || isRolling) return;
    const rk = selectedKey ?? LOBBY_DEFAULT_CHAR_KEY;
    const raw = rollInitialRolls();
    const pending = buildPendingDisplayFromRaw(raw, rk);
    const shuffleGaugeRanges = initialStatGaugeRanges(rk);
    const sm = soundRef?.current;

    let diceLoop = null;
    try {
      const shuffleMs = Math.round(800 + Math.random() * 200);
      const totalDiceMs = shuffleMs + STAGGER_TO_LIVING_MS;
      setDiceSyncCss(buildDiceRollSyncCss(shuffleMs, totalDiceMs));
      setActiveDiceMs(totalDiceMs);

      setDiceFlyActive(true);
      setIsRolling(true);
      setShuffleBars(true);
      setGlowRows(new Set());
      diceLoop = sm?.startDiceRoll?.() ?? null;

      let lastSnap = randomLobbySnapshot(shuffleGaugeRanges);
      setAnimDisplay(lastSnap);

      await new Promise((resolve) => {
        let finished = false;
        let shuffleTimerId;
        const iv = setInterval(() => {
          lastSnap = randomLobbySnapshot(shuffleGaugeRanges);
          setAnimDisplay({ ...lastSnap });
        }, 46);
        timersRef.current.push(iv);

        const finishShufflePhase = () => {
          if (finished) return;
          finished = true;
          clearInterval(iv);
          clearTimeout(shuffleTimerId);
          resolve();
        };

        shuffleTimerId = setTimeout(finishShufflePhase, shuffleMs);
        timersRef.current.push(shuffleTimerId);
      });

      if (diceFlyFallbackRef.current) {
        clearTimeout(diceFlyFallbackRef.current);
      }
      diceFlyFallbackRef.current = setTimeout(() => {
        diceFlyFallbackRef.current = null;
        setDiceFlyActive(false);
      }, totalDiceMs + 200);
      timersRef.current.push(diceFlyFallbackRef.current);

      diceLoop?.stop?.();
      diceLoop = null;
      setShuffleBars(false);

      let freeze = lastSnap;
      setAnimDisplay({ ...freeze });

      for (let i = 0; i < GAUGE_ROWS.length; i++) {
        await trackSleep(i === 0 ? GAUGE_ROW_FIRST_MS : GAUGE_ROW_GAP_MS);
        freeze = mergeRowsIntoSnapshot(freeze, pending, i);
        setAnimDisplay({ ...freeze });

        const rkRow = GAUGE_ROWS[i].rollKey;
        const rv = pending[rkRow];
        sm?.playDiceTick?.();
        if (rv === 5) {
          sm?.playDiceMaxSpark?.();
          const rowId = GAUGE_ROWS[i].id;
          setGlowRows((prev) => new Set(prev).add(rowId));
          const gid = setTimeout(() => {
            setGlowRows((prev) => {
              const n = new Set(prev);
              n.delete(rowId);
              return n;
            });
          }, 720);
          timersRef.current.push(gid);
        }
      }

      const ok = await onCommitInitialRolls({
        luck: raw.luck,
        skill: raw.skill,
        virtue: raw.virtue,
        pon: raw.pon,
      });
      if (!ok) return;
      setLockedRawRolls(raw);
      setPreviewTriesDone((n) => n + 1);
    } finally {
      diceLoop?.stop?.();
      if (diceFlyFallbackRef.current) {
        clearTimeout(diceFlyFallbackRef.current);
        diceFlyFallbackRef.current = null;
      }
      setDiceFlyActive(false);
      setDiceSyncCss("");
      setIsRolling(false);
      setShuffleBars(false);
      setAnimDisplay(null);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-3">
      <style>{LOBBY_ANIM_CSS}{diceSyncCss}</style>

      <div className="rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-3 space-y-3">
        <p className="text-xs font-bold text-cyan-400">ステータス・ゲージ（プレビュー）</p>
        <p className="text-[11px] text-slate-400 leading-snug">
          <strong className="text-slate-200">①キャラ選択</strong>
          すると、ダイス（raw）がまだサーバーに無い場合は
          <strong className="text-slate-200">いま画面上の値がそのまま確定して同期</strong>
          します（試行1回相当）。必要なら下の
          <strong className="text-slate-200">ダイス演出付きで再抽選</strong>。
          ゲージは<strong className="text-slate-200">いま選んでいるキャラ</strong>
          換算のプレビューです。<strong className="text-slate-200">再抽選は最大{MAX_REROLLS}回</strong>
          （キャラで初回同期を含め計{MAX_TOTAL_STAT_TRIES}試行まで）。
        </p>

        <div className="space-y-2">
          {GAUGE_ROWS.map((row) => {
            const rg = gaugeRanges[row.rangeKey];
            const vk = row.valueKey;
            const rk = row.rollKey;
            const val = display[vk] ?? rg.min;
            const rawRoll = display[rk];
            const rollNum =
              rawRoll != null && Number.isFinite(Number(rawRoll))
                ? Number(rawRoll)
                : legacyRoll != null && Number.isFinite(Number(legacyRoll))
                  ? Number(legacyRoll)
                  : null;
            const barFillPercent =
              rawRoll != null && Number.isFinite(Number(rawRoll))
                ? (Number(rawRoll) / 5) * 100
                : 0;
            return (
              <StatGauge
                key={`${waitingSessionKey}-${row.id}`}
                label={row.label}
                value={val}
                min={rg.min}
                max={rg.max}
                barFillPercent={barFillPercent}
                hideNumeric={false}
                suffix={row.suffix}
                barShuffle={shuffleBars}
                showMaxRollGlow={glowRows.has(row.id) && rollNum === 5}
                overviewHint={row.overview}
              />
            );
          })}
        </div>

        <div className="relative pt-1">
          {diceFlyActive && (
            <div
              role="presentation"
              aria-hidden
              className="pointer-events-none absolute left-1 top-1/2 z-30 flex h-[80px] w-[80px] -translate-y-1/2 items-center justify-center dice-roll-sync sm:left-2 sm:h-[88px] sm:w-[88px]"
              style={{ animationDuration: `${activeDiceMs}ms` }}
              onAnimationEnd={(e) => {
                const name = String(e.animationName || "");
                if (!name.includes("dice-roll-sync")) return;
                if (diceFlyFallbackRef.current) {
                  clearTimeout(diceFlyFallbackRef.current);
                  diceFlyFallbackRef.current = null;
                }
                setDiceFlyActive(false);
              }}
            >
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border-[3px] border-neutral-900 bg-gradient-to-b from-white via-neutral-50 to-neutral-200 shadow-[0_10px_28px_rgba(0,0,0,0.55),inset_0_2px_0_rgba(255,255,255,0.95)] sm:h-[80px] sm:w-[80px]">
                <Dice5 className="h-[52px] w-[52px] text-neutral-950 sm:h-14 sm:w-14" strokeWidth={2.35} />
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => void handleRollClick()}
              disabled={!canRollStats || isRolling}
              className={`w-full rounded-lg border-2 border-black bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-400 py-2.5 text-center text-[13px] font-black leading-tight text-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-[filter,padding] hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100 ${diceFlyActive ? "pl-[4.25rem] sm:pl-24" : ""}`}
            >
              {isRolling ? "抽選中…" : previewTriesDone === 0 ? "ステータス抽選を試す（ダイス演出付き）" : "再抽選"}
            </button>
            <p className="text-center text-[11px] text-slate-400">
              再抽選できる回数：<span className="tabular-nums font-semibold text-slate-200">{remainingRerolls}</span>／{MAX_REROLLS}
              回（初回はキャラまたは上の抽選で確定。合計の確定回数は上限{MAX_TOTAL_STAT_TRIES}回）
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs font-semibold text-slate-400">キャラクターを選択</p>
      <div className="grid grid-cols-2 gap-3">
        {visibleCharacters.map((c) => {
          const selected = selectedKey === c.key;
          const ringSelected = selectedKey === c.key;
          const isSecretCard = c.key === SECRET_RIRIMU_CHARACTER_KEY && secretUnlockActive;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => void handlePickCharacter(c.key)}
              disabled={isRolling}
              className={`relative overflow-hidden rounded-xl border p-3 text-left transition-all disabled:opacity-50 ${
                isSecretCard ? "ririm-secret-card border-fuchsia-400/50 bg-violet-950/40" : ""
              } ${ringSelected ? `${c.border} ring-2 ring-offset-1 ring-offset-slate-900 ring-cyan-500` : "border-slate-700 bg-slate-800/50 hover:border-slate-600"}`}
            >
              {isSecretCard && (
                <span className="absolute right-2 top-2 z-[1] rounded-full bg-gradient-to-r from-fuchsia-600 to-amber-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow-md">
                  Secret
                </span>
              )}
              {isSecretCard && (
                <span className="ririm-secret-glitter" aria-hidden>
                  <span>✦</span>
                  <span>✧</span>
                  <span>✦</span>
                  <span>✧</span>
                </span>
              )}
              <div className="mb-1 flex min-h-[2.5rem] items-center justify-center">
                <CharacterIcon characterType={c.key} imgClassName="h-10 w-10 object-contain" spanClassName="text-2xl" />
              </div>
              <div className={`text-sm font-semibold ${selected ? c.color : "text-slate-300"}`}>{c.label}</div>
              <div className="text-xs text-slate-400 mt-1 leading-relaxed">{c.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** 招待制は allowedPlayers + 参加スロット、公開は参加スロットのみ */
function buildRoomRosterEntries(isPrivate, allowedPlayers, playerSlots) {
  if (!isPrivate) {
    return playerSlots.map((slot) => ({
      fullId: slot.fullId || slot.name,
      slot,
      joined: true,
    }));
  }

  const slotsByFullId = new Map();
  for (const slot of playerSlots) {
    if (slot.fullId) slotsByFullId.set(slot.fullId, slot);
  }

  const seen = new Set();
  const entries = [];

  for (const fullId of allowedPlayers ?? []) {
    if (!fullId || seen.has(fullId)) continue;
    seen.add(fullId);
    const slot = slotsByFullId.get(fullId);
    entries.push({ fullId, slot: slot ?? null, joined: !!slot });
  }

  for (const slot of playerSlots) {
    const fid = slot.fullId;
    if (!fid || seen.has(fid)) continue;
    seen.add(fid);
    entries.push({ fullId: fid, slot, joined: true });
  }

  return entries;
}

function RoomMemberRow({
  entry,
  hostId,
  myId,
  isHost,
  kickLoading,
  cancelInviteLoading,
  onRequestKick,
  onCancelInvite,
}) {
  const { fullId, slot, joined } = entry;
  const ck = slot?.character;
  const c = ck ? CHARACTERS[ck] : null;
  const rowIsHost = slot?.id === hostId;
  const rowIsYou = slot?.id === myId;
  const canKick = isHost && joined && slot?.id && slot.id !== hostId;
  const canCancelInvite = isHost && !joined;
  const isCanceling = cancelInviteLoading === fullId;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-2">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-mono text-slate-200 truncate select-all">{fullId}</p>
        {(rowIsHost || rowIsYou) && (
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {rowIsHost && <span className="text-[10px] font-semibold text-amber-400">ホスト</span>}
            {rowIsYou && (
              <span className="text-[10px] font-semibold text-cyan-400 border border-cyan-400/40 rounded px-1">
                YOU
              </span>
            )}
          </div>
        )}
        {!joined && (
          <p className="text-[10px] text-amber-400/90 font-medium mt-0.5">未参加 — 入室待ち</p>
        )}
      </div>
      {canCancelInvite && (
        <button
          type="button"
          onClick={() => onCancelInvite?.(fullId)}
          disabled={!!cancelInviteLoading || kickLoading}
          className="shrink-0 rounded-lg border border-slate-500/50 bg-slate-900/80 px-2.5 py-1.5 text-[11px] font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-40"
        >
          {isCanceling ? "取消中…" : "招待取消"}
        </button>
      )}
      {canKick && (
        <button
          type="button"
          onClick={() => onRequestKick({ uid: slot.id, fullId, name: slot.name || fullId })}
          disabled={kickLoading}
          className="shrink-0 rounded-lg border border-rose-500/40 bg-rose-950/40 px-2.5 py-1.5 text-[11px] font-bold text-rose-200 hover:bg-rose-900/50 hover:text-rose-50 transition-colors disabled:opacity-40"
        >
          退室させる
        </button>
      )}
      <div className="flex flex-col items-end justify-center min-w-[5.5rem] min-h-[2.25rem] gap-0.5 shrink-0">
        {joined && (
          <>
            <span className="text-[10px] text-slate-500 leading-none">参加 / キャラ</span>
            <span className="text-emerald-400 text-sm leading-none" aria-label="参加済み" title="参加済み">
              ✓
            </span>
            {ck ? (
              <span className="flex items-center gap-1 text-xs">
                <CharacterIcon
                  characterType={ck}
                  imgClassName="h-4 w-4 object-contain shrink-0"
                  spanClassName="text-sm leading-none"
                />
                <span className={c.color}>{c.label}</span>
              </span>
            ) : (
              <span className="text-[10px] text-amber-400/90 font-medium">未選択</span>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col items-center justify-center min-w-[3.25rem] shrink-0">
        {joined ? (
          isLobbyMemberReady(slot, hostId) ? (
            <span className="text-emerald-400 text-lg leading-none" aria-label="準備完了" title="準備完了">
              ✓
            </span>
          ) : (
            <span className="text-slate-600 text-sm leading-none" aria-label="準備未完了">
              —
            </span>
          )
        ) : null}
      </div>
    </div>
  );
}

function KickConfirmDialog({ target, kickLoading, onCancel, onConfirm }) {
  if (!target) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kick-confirm-title"
    >
      <div className="w-full max-w-sm rounded-2xl border border-rose-500/35 bg-slate-900 p-5 shadow-2xl shadow-black/40 space-y-4">
        <div className="space-y-2">
          <p id="kick-confirm-title" className="text-base font-bold text-slate-100">
            ルームから退室させますか？
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            <span className="font-mono text-slate-200">{target.fullId}</span>
            を待機室から退室させます。招待制ルームでは再参加にはホストの再招待が必要です。
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={kickLoading}
            className="flex-1 rounded-xl border border-slate-600 bg-slate-800 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={() => onConfirm(target.uid)}
            disabled={kickLoading}
            className="flex-1 rounded-xl bg-rose-600 py-2.5 text-sm font-bold text-white hover:bg-rose-500 transition-colors disabled:opacity-50"
          >
            {kickLoading ? "処理中…" : "退室させる"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RoomMemberRoster({
  isPrivate,
  isHost,
  hostId,
  myId,
  allowedPlayers = [],
  playerSlots = [],
  inviteInput,
  onInviteInputChange,
  inviteError,
  onInvitePlayer,
  onCancelInvite,
  cancelInviteLoading = null,
  onKickPlayer,
  kickLoading = false,
}) {
  const [kickConfirmTarget, setKickConfirmTarget] = useState(null);
  const entries = useMemo(
    () => buildRoomRosterEntries(isPrivate, allowedPlayers, playerSlots),
    [isPrivate, allowedPlayers, playerSlots],
  );
  const joinedCount = playerSlots.length;
  const showInviteForm = isPrivate && isHost;
  const panelClass = isPrivate
    ? "border-rose-500/30 bg-rose-500/5"
    : "border-slate-800 bg-slate-900";

  return (
    <div className={`rounded-2xl border p-4 space-y-3 ${panelClass}`}>
      <div>
        <p className={`text-xs font-semibold ${isPrivate ? "text-rose-300" : "text-slate-300"}`}>
          {showInviteForm ? "🔒 招待管理（ホスト専用）" : isPrivate ? "🔒 メンバー" : "👥 メンバー"}
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {isPrivate
            ? `招待 ${(allowedPlayers ?? []).length}名 · 参加 ${joinedCount}/4`
            : `参加 ${joinedCount}/4`}
        </p>
      </div>

      {showInviteForm && (
        <div>
          <label className="text-xs text-slate-300 font-medium block mb-1.5">招待するプレイヤー（Name#ID）</label>
          <div className="flex gap-2">
            <input
              value={inviteInput}
              onChange={(e) => onInviteInputChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onInvitePlayer()}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-mono focus:border-rose-400 focus:outline-none"
              placeholder="例: 闇月リリム#1234"
            />
            <button
              type="button"
              onClick={onInvitePlayer}
              className="rounded-xl bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 text-sm font-bold transition-colors"
            >
              招待
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            ※ 相手の画面に表示されている「Name#ID」を全文コピーして入力してください
          </p>
          {inviteError && <p className="text-xs text-rose-400 mt-1">{inviteError}</p>}
        </div>
      )}

      {entries.length > 0 && (
        <div className="space-y-1.5">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-1 text-[10px] font-semibold text-slate-500">
            <span>{isPrivate ? "招待済み" : "プレイヤー"}</span>
            <span className="text-right min-w-[5.5rem]">参加 / キャラ</span>
            <span className="text-center min-w-[3.25rem]">準備完了</span>
          </div>
          {entries.map((entry) => (
            <RoomMemberRow
              key={entry.fullId}
              entry={entry}
              hostId={hostId}
              myId={myId}
              isHost={isHost}
              kickLoading={kickLoading}
              cancelInviteLoading={cancelInviteLoading}
              onRequestKick={setKickConfirmTarget}
              onCancelInvite={onCancelInvite}
            />
          ))}
        </div>
      )}

      <KickConfirmDialog
        target={kickConfirmTarget}
        kickLoading={kickLoading}
        onCancel={() => setKickConfirmTarget(null)}
        onConfirm={async (uid) => {
          const ok = await onKickPlayer?.(uid);
          if (ok) setKickConfirmTarget(null);
        }}
      />

      {joinedCount < 2 && (
        <p className="text-xs text-slate-500 text-center pt-0.5 flex items-center justify-center gap-2">
          <Loader2 size={12} className="animate-spin" />
          他のプレイヤーを待っています… (1人でも開始できます)
        </p>
      )}
    </div>
  );
}

/** 待機室（キャラ選択・ホスト開始など） */
export default function WaitingRoom({
  waitingSessionKey = 0,
  myFullId,
  copied,
  onCopyRoomId,
  roomData,
  roomId,
  playerSlots,
  myId,
  isHost,
  onReturnToLobby,
  onSelectCharacter,
  onCommitInitialRolls,
  soundRef,
  onStartGame,
  onSetLobbyReady,
  loading,
  uiError,
  inviteInput,
  onInviteInputChange,
  inviteError,
  onInvitePlayer,
  onCancelInvite,
  cancelInviteLoading = null,
  onKickPlayer,
  kickLoading = false,
  seVolume,
  bgmVolume,
  onSeVolumeChange,
  onBgmVolumeChange,
  unlockPlayerNameForSecret,
  onSecretCharacterSelected,
}) {
  const mySlot = playerSlots.find((s) => s.id === myId);
  const myStatsReady = !!normalizeSlotInitialRolls(mySlot?.initialRolls);
  const allSlotsStatsReady =
    playerSlots.length > 0 && playerSlots.every((s) => normalizeSlotInitialRolls(s.initialRolls));
  const allMembersReady = playerSlots.every((s) => isLobbyMemberReady(s, roomData?.hostId));
  const myLobbyReady = !!mySlot?.lobbyReady;
  return (
    <div className="min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center">
      <TopRightHud
        myFullId={myFullId}
        seVolume={seVolume}
        bgmVolume={bgmVolume}
        onSeVolumeChange={onSeVolumeChange}
        onBgmVolumeChange={onBgmVolumeChange}
        onReturnToLobby={onReturnToLobby}
      />
      {roomData?.isSolo ? (
        <div className="w-full max-w-md space-y-6">
          <div className="relative text-center">
            <button
              type="button"
              onClick={onReturnToLobby}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              ← 戻る
            </button>
            <h2 className="text-2xl font-bold">🎮 一人で遊ぶ</h2>
          </div>

          <CharacterLobbyPrep
            waitingSessionKey={waitingSessionKey}
            playerSlots={playerSlots}
            myId={myId}
            onSelectCharacter={onSelectCharacter}
            onCommitInitialRolls={onCommitInitialRolls}
            soundRef={soundRef}
            unlockPlayerNameForSecret={unlockPlayerNameForSecret}
            onSecretCharacterSelected={onSecretCharacterSelected}
          />

          <button
            type="button"
            onClick={onStartGame}
            disabled={loading || !mySlot?.character || !myStatsReady}
            className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-slate-950 text-lg hover:bg-cyan-400 transition-colors disabled:opacity-40"
          >
            {loading ? "開始中…" : "準備完了 · ゲームスタート"}
          </button>
          {uiError && <p className="text-sm text-rose-400 text-center">{uiError}</p>}
        </div>
      ) : (
        <div className="w-full max-w-md space-y-5 pt-10">
          <div className="relative text-center">
            <button
              type="button"
              onClick={onReturnToLobby}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              ← 戻る
            </button>
            <h2 className="text-2xl font-bold">ルーム待機中</h2>
            <p className="text-sm text-slate-400 mt-1">ルームIDを友達に共有してください</p>
          </div>

          <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/5 p-5 text-center space-y-3">
            <p className="text-xs text-slate-400">ルームID</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <p className="text-4xl font-bold tracking-[0.3em] text-cyan-400 font-mono select-all">{roomId}</p>
              <CopyClipboardButton copied={copied} onCopy={onCopyRoomId} />
            </div>
            <span
              className={`inline-block text-xs font-semibold rounded-full px-3 py-0.5 ${roomData?.isPrivate ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"}`}
            >
              {roomData?.isPrivate ? "🔒 プライベート（招待制）" : "🌐 公開"}
            </span>
          </div>

          <RoomMemberRoster
            isPrivate={!!roomData?.isPrivate}
            isHost={isHost}
            hostId={roomData?.hostId}
            myId={myId}
            allowedPlayers={roomData?.allowedPlayers}
            playerSlots={playerSlots}
            inviteInput={inviteInput}
            onInviteInputChange={onInviteInputChange}
            inviteError={inviteError}
            onInvitePlayer={onInvitePlayer}
            onCancelInvite={onCancelInvite}
            cancelInviteLoading={cancelInviteLoading}
            onKickPlayer={onKickPlayer}
            kickLoading={kickLoading}
          />

          <CharacterLobbyPrep
            waitingSessionKey={waitingSessionKey}
            playerSlots={playerSlots}
            myId={myId}
            onSelectCharacter={onSelectCharacter}
            onCommitInitialRolls={onCommitInitialRolls}
            soundRef={soundRef}
            unlockPlayerNameForSecret={unlockPlayerNameForSecret}
            onSecretCharacterSelected={onSecretCharacterSelected}
          />

          {isHost ? (
            <button
              type="button"
              onClick={onStartGame}
              disabled={
                playerSlots.length < 1 ||
                loading ||
                playerSlots.some((s) => !s.character) ||
                !allSlotsStatsReady ||
                !allMembersReady
              }
              className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-40"
            >
              {loading
                ? "開始中…"
                : allMembersReady
                  ? `ゲームスタート（${playerSlots.length}人）`
                  : `全員の準備完了を待っています…（${playerSlots.filter((s) => isLobbyMemberReady(s, roomData?.hostId)).length}/${playerSlots.length}）`}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSetLobbyReady?.(!myLobbyReady)}
              disabled={loading || !mySlot?.character || !myStatsReady}
              className={[
                "w-full rounded-xl py-3 font-bold transition-colors disabled:opacity-40",
                myLobbyReady
                  ? "bg-emerald-600 text-white hover:bg-emerald-500"
                  : "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
              ].join(" ")}
            >
              {myLobbyReady ? "準備完了 ✓（タップで取消）" : "準備完了"}
            </button>
          )}
          {uiError && <p className="text-sm text-rose-400 text-center">{uiError}</p>}
        </div>
      )}
    </div>
  );
}
