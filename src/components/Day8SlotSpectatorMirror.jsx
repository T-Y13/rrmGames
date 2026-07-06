import React from "react";
import SlotContainer from "./SlotContainer";
import SlotSpinBroadcastOverlay from "./SlotSpinBroadcastOverlay";

/** 8日目スロット：手番以外のクライアント向けミラー（操作者 UI は変更なし） */
export default function Day8SlotSpectatorMirror({ gs, cpGs, soundRef, myId }) {
  if (!cpGs || !gs) return null;

  const slotPhase = gs?.slotPhase ?? "idle";
  /** 常時マウントして completed→idle でリールを維持。spin 中はオーバーレイと二重にならないよう画面外へ */
  const mirrorParked = slotPhase === "spinning" || slotPhase === "completed";

  return (
    <>
      <div
        className={
          mirrorParked
            ? "pointer-events-none fixed left-[-9999px] top-0 w-[min(100%,480px)] opacity-0"
            : undefined
        }
        aria-hidden={mirrorParked}
      >
        <SlotContainer
          gs={gs}
          cpGs={cpGs}
          isMyTurn={false}
          spectatorMode
          writeGS={async () => false}
          commitPendingGameState={async () => {}}
          commitDay8SlotLivePatch={async () => false}
          syncDay8SlotIdleFromLive={async () => false}
          commitGameStateTransaction={async () => null}
          commitDay8SlotSpin={async () => null}
          soundRef={soundRef}
          roomId={null}
          interactionLocked
          myId={myId}
        />
      </div>
      <SlotSpinBroadcastOverlay gs={gs} soundRef={soundRef} myId={myId} />
    </>
  );
}
