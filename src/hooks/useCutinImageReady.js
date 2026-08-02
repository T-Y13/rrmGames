import { useEffect, useState } from "react";

/**
 * カットイン用：src のデコード完了（または失敗）まで false。
 * キャッシュ済みなら useEffect 内で即 true になり、空枠フラッシュを避ける。
 */
export function useCutinImageReady(src) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    if (!src) {
      setReady(true);
      return undefined;
    }

    const img = new Image();
    const done = () => {
      if (!cancelled) setReady(true);
    };
    img.onload = done;
    img.onerror = done;
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      done();
    }

    return () => {
      cancelled = true;
    };
  }, [src]);

  return ready;
}
