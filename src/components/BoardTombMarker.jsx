import React from "react";
import BoardCalloutBubble from "./BoardCalloutBubble";
import { SugorokuBoardPiece } from "./CharacterPieces";
import { TOMB_BOARD_IMAGE } from "../constants/assets";
import { publicAssetUrl } from "../lib/publicAssetUrl";
import { sugorokuPlayerName } from "../lib/sugorokuPlayerName";

const PLAYER_NAME_BUBBLE_CLASS =
  "inline-flex w-max max-w-none whitespace-nowrap justify-center text-center text-[10px] px-2 py-0.5 drop-shadow-sm";

function boardStandeePieceScale(characterType) {
  return characterType === "student" ? 0.88 : 1;
}

/** 脱落位置に残す墓標（名前はキャラと同じく画像の上） */
export function BoardTombMarker({ name, nameFillColor, tileW = 64 }) {
  const tombH = Math.max(52, Math.min(88, Math.round(tileW * 1.05)));
  return (
    <div className="relative flex flex-col items-center justify-end anim-board-tomb-fade-in">
      <div className="pointer-events-none absolute bottom-full left-1/2 z-[39] mb-1 -translate-x-1/2">
        <BoardCalloutBubble tail="bottom" fillColor={nameFillColor} bodyClassName={PLAYER_NAME_BUBBLE_CLASS}>
          {sugorokuPlayerName(name)}
        </BoardCalloutBubble>
      </div>
      <img
        src={publicAssetUrl(TOMB_BOARD_IMAGE)}
        alt=""
        draggable={false}
        className="select-none object-contain object-bottom drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
        style={{ height: tombH, width: "auto", maxWidth: Math.round(tombH * 0.85) }}
      />
    </div>
  );
}

/** 死亡直後：キャラをフェードアウトしてから墓標へ切り替え */
export function BoardDeathFadePiece({ characterType, name, nameFillColor, tileW = 64 }) {
  const piecePx = Math.max(12, Math.round(tileW * 0.42));
  const pieceCharScale = boardStandeePieceScale(characterType);
  return (
    <div className="relative flex flex-col items-center justify-end anim-board-death-fade-out">
      <div className="pointer-events-none absolute bottom-full left-1/2 z-[39] mb-1 -translate-x-1/2">
        <BoardCalloutBubble tail="bottom" fillColor={nameFillColor} bodyClassName={PLAYER_NAME_BUBBLE_CLASS}>
          {sugorokuPlayerName(name)}
        </BoardCalloutBubble>
      </div>
      <span className="leading-none inline-flex items-end justify-center">
        <SugorokuBoardPiece
          characterType={characterType}
          pose="fallen"
          imgClassName="object-contain object-bottom"
          spanClassName="leading-none"
          imgStyle={{
            maxHeight: Math.max(72, Math.min(118, piecePx * 5.5)) * 1.15 * pieceCharScale,
            width: "auto",
            maxWidth: Math.max(58, piecePx * 6.25) * 1.15 * pieceCharScale,
          }}
          spanStyle={{ fontSize: piecePx }}
        />
      </span>
    </div>
  );
}
