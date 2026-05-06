import React, { useEffect, useMemo, useState } from "react";
import { SUGOROKU_BG } from "../constants/assets";
import { publicAssetUrl } from "../lib/publicAssetUrl";

/** Tailwind `md` に合わせ PC とみなす（768px） */
const PC_MEDIA_QUERY = "(min-width: 768px)";

function cssUrl(u) {
  const s = String(u).replace(/\\/g, "/").replace(/'/g, "\\'");
  return `url('${s}')`;
}

/**
 * すごろく背景：city_seamless 系を repeat-y でタイル。
 * background-position-y を scrollPx（＋任意の軽い scrollMultiplier）で制御。マップと同じ smoothPos 係数なら 1 マス＝同じ px 移動。
 * `fast` は呼び出し元が渡しても無視する（互換用）。
 */
export default function SugorokuBackground({
  className,
  /** 累積スクロール量（px）。増えるほど背景が流れる */
  scrollPx = 0,
  /** scrollPx に掛ける倍率（演出用パララックス。マップ同期時は 1） */
  scrollMultiplier = 1,
  traveling = false,
}) {
  const [isPc, setIsPc] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(PC_MEDIA_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(PC_MEDIA_QUERY);
    const onChange = () => setIsPc(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const candidates = useMemo(() => {
    const pc = SUGOROKU_BG.pc ?? [];
    const sp = SUGOROKU_BG.sp ?? [];
    return isPc ? [...pc, ...sp] : [...sp, ...pc];
  }, [isPc]);

  const [failIdx, setFailIdx] = useState(0);

  useEffect(() => {
    setFailIdx(0);
  }, [isPc]);

  const rootClass = className ?? "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl";

  if (!candidates.length || failIdx >= candidates.length) {
    return <div className={rootClass} aria-hidden />;
  }

  const resolved = publicAssetUrl(candidates[failIdx]);
  const bgImg = cssUrl(resolved);

  const mul = Number.isFinite(scrollMultiplier) ? scrollMultiplier : 1;
  const adjScroll = scrollPx * mul;

  return (
    <div className={rootClass} aria-hidden>
      {/* 読込失敗時のみフォールバック候補へ */}
      <img src={resolved} alt="" className="pointer-events-none absolute h-0 w-0 opacity-0" onError={() => setFailIdx((n) => n + 1)} />
      <div
        className="pointer-events-none absolute inset-0 sugoroku-seamless-bg"
        style={{
          backgroundImage: bgImg,
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPosition: `center ${adjScroll}px`,
          filter: "none",
          transition: "filter 0.35s ease-out",
          willChange: traveling ? "background-position, filter" : "auto",
        }}
      />
    </div>
  );
}
