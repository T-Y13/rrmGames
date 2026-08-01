import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { publicAssetUrl } from "../lib/publicAssetUrl";
import { STREAM_CUTIN_CHAT, STREAM_CUTIN_GAME } from "../constants/branding";
import { useCutinImageReady } from "../hooks/useCutinImageReady";

/** 短すぎる待ちではぐるぐるを出さない（キャッシュ即表示向け） */
const CUTIN_LOADING_SPINNER_DELAY_MS = 250;

/**
 * 日常「配信」で雑談／ゲーム種別が決まった直後のカットイン（画像準備完了後に表示）
 */
export default function StreamTypeCutin({
  mode,
  gold,
  stat,
  onReady,
  onVisibleComplete,
  visibleMs = 2000,
}) {
  const validMode = mode === "chat" || mode === "game";
  const src = validMode
    ? publicAssetUrl(mode === "chat" ? STREAM_CUTIN_CHAT : STREAM_CUTIN_GAME)
    : null;
  const streamLabel = mode === "game" ? "ゲーム配信" : "雑談配信";
  const imgReady = useCutinImageReady(src);
  const readyNotifiedRef = useRef(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    readyNotifiedRef.current = false;
  }, [src]);

  useEffect(() => {
    if (!validMode || imgReady) {
      setShowSpinner(false);
      return undefined;
    }
    const t = window.setTimeout(() => setShowSpinner(true), CUTIN_LOADING_SPINNER_DELAY_MS);
    return () => clearTimeout(t);
  }, [validMode, imgReady, src]);

  useEffect(() => {
    if (!validMode || !imgReady || readyNotifiedRef.current) return;
    readyNotifiedRef.current = true;
    onReady?.();
  }, [validMode, imgReady, onReady]);

  useEffect(() => {
    if (!validMode || !imgReady || typeof onVisibleComplete !== "function") return undefined;
    const t = window.setTimeout(() => onVisibleComplete(), visibleMs);
    return () => clearTimeout(t);
  }, [validMode, imgReady, visibleMs, onVisibleComplete]);

  if (!validMode) return null;

  return (
    <div
      className="fixed inset-0 z-[210] flex cursor-default items-center justify-center overflow-hidden bg-slate-950 pointer-events-auto"
      aria-hidden
      role="presentation"
      aria-busy={!imgReady}
    >
      {imgReady ? (
        <div className="relative z-[2] flex flex-col items-center justify-center px-5 anim-fadein">
          <div className="relative rounded-2xl border-2 border-cyan-400 bg-slate-900 p-4 sm:p-5">
            <p className="absolute left-1/2 top-2 z-[3] -translate-x-1/2 rounded-full border border-cyan-300/70 bg-slate-950/75 px-3 py-1 text-xs font-black tracking-wide text-cyan-100 sm:text-sm">
              {streamLabel}
            </p>
            <img
              src={src}
              alt=""
              className="max-h-[min(54vh,460px)] max-w-[min(90vw,540px)] object-contain drop-shadow-[0_0_32px_rgba(34,211,238,0.55)] opacity-100"
              draggable={false}
            />
          </div>
          <div className="mt-5 text-center font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <p className="text-[min(6.5vw,2rem)] sm:text-3xl text-emerald-300 tabular-nums">
              ＋{gold}ゴールド
            </p>
            {stat ? (
              <p className="mt-2 text-[min(5vw,1.35rem)] sm:text-xl text-cyan-200 tabular-nums">
                {stat.label} ＋{stat.delta}
              </p>
            ) : null}
          </div>
        </div>
      ) : showSpinner ? (
        <div className="relative z-[2] flex flex-col items-center gap-3 text-slate-300" role="status">
          <Loader2 size={36} className="animate-spin text-cyan-300" aria-hidden />
          <p className="text-sm font-semibold tracking-wide">読み込み中…</p>
        </div>
      ) : null}
    </div>
  );
}
