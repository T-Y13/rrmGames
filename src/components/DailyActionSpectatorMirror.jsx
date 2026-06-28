import React from "react";
import DailyActionPhase from "./DailyActionPhase";

/** 1〜7日目：手番以外のクライアント向け行動選択ミラー（操作者 UI は変更なし） */
export default function DailyActionSpectatorMirror({ gs, cpGs }) {
  if (!cpGs || !gs) return null;

  return (
    <DailyActionPhase
      gs={gs}
      cpGs={cpGs}
      spectatorMode
      onDailyAction={() => {}}
      onOpenDailySlot={() => {}}
    />
  );
}
