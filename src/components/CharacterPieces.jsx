import React, { useEffect, useState } from "react";
import { CHARACTERS } from "../constants/gameBalance";
import {
  getIconCandidates,
  getStandeeCascade,
  TAXI_BOARD_IMAGE,
} from "../constants/assets";
import { publicAssetUrl } from "../lib/publicAssetUrl";

export function CharacterIcon({
  characterType,
  imgClassName = "",
  spanClassName = "",
  imgStyle,
  spanStyle,
}) {
  const c = CHARACTERS[characterType] ?? CHARACTERS.salaryman;
  const candidates = getIconCandidates(characterType);
  const [failIdx, setFailIdx] = useState(0);

  useEffect(() => {
    setFailIdx(0);
  }, [characterType]);

  if (!candidates.length || failIdx >= candidates.length) {
    return (
      <span className={spanClassName} style={spanStyle}>
        {c.emoji ?? "🙂"}
      </span>
    );
  }

  return (
    <img
      src={publicAssetUrl(candidates[failIdx])}
      alt=""
      draggable={false}
      className={`select-none ${imgClassName}`}
      style={imgStyle}
      onError={() => setFailIdx((n) => n + 1)}
    />
  );
}

export function SugorokuBoardPiece({
  characterType,
  pose = "normal",
  imgClassName = "",
  spanClassName = "",
  imgStyle,
  spanStyle,
}) {
  const c = CHARACTERS[characterType] ?? CHARACTERS.salaryman;
  const candidates = getStandeeCascade(characterType, pose);
  const [failIdx, setFailIdx] = useState(0);

  useEffect(() => {
    setFailIdx(0);
  }, [characterType, pose]);

  if (!candidates.length || failIdx >= candidates.length) {
    return (
      <span className={spanClassName} style={spanStyle}>
        {c.emoji ?? "🙂"}
      </span>
    );
  }

  return (
    <img
      src={publicAssetUrl(candidates[failIdx])}
      alt=""
      draggable={false}
      className={`select-none ${imgClassName}`}
      style={imgStyle}
      onError={() => setFailIdx((n) => n + 1)}
    />
  );
}

/**
 * タクシー車体。論理パスは `/images/taxi.png`（Vite は `publicAssetUrl` で `import.meta.env.BASE_URL` を前置）。
 *
 * 切り分け: `.env` に `VITE_TAXI_SRC_RAW=1` すると **base 無し** の `/images/taxi.png` をそのまま src に使う（ルート配信のみ有効）。
 */
export function TaxiStandeeImage({
  imgClassName = "",
  imgStyle,
  emojiFallback = "🚕",
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const useRawPublicPath = import.meta.env.VITE_TAXI_SRC_RAW === "1";
  const resolvedSrc = useRawPublicPath ? TAXI_BOARD_IMAGE : publicAssetUrl(TAXI_BOARD_IMAGE);

  useEffect(() => {
    setImgFailed(false);
  }, [useRawPublicPath]);

  const antiCollapseStyle = {
    minWidth: 48,
    minHeight: 48,
    objectFit: "contain",
    boxSizing: "border-box",
    ...imgStyle,
  };

  if (imgFailed) {
    return (
      <span
        className={`inline-flex min-h-[48px] min-w-[48px] select-none items-center justify-center ${imgClassName}`}
        style={imgStyle}
        title="taxi image failed — check Network tab for 404 URL"
      >
        {emojiFallback}
      </span>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt=""
      draggable={false}
      className={`select-none ${imgClassName}`}
      style={antiCollapseStyle}
      onError={() => {
        setImgFailed(true);
      }}
    />
  );
}
