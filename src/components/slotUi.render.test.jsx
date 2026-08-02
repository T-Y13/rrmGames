import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import React from "react";
import SlotMachine from "./SlotMachine.jsx";
import DailySlotTrainingModal from "./DailySlotTrainingModal.jsx";
import SlotSpinBroadcastOverlay from "./SlotSpinBroadcastOverlay.jsx";

const baseStats = { money: 10000, luck: 50, skill: 50, virtue: 50, pon: 0 };

describe("slot UI render smoke", () => {
  it("renders DailySlotTrainingModal when open", () => {
    const html = renderToString(
      <DailySlotTrainingModal
        open
        statsForSpin={baseStats}
        characterType="salaryman"
        playerName="Test"
        onClose={() => {}}
        onFinished={async () => {}}
      />,
    );
    expect(html).toContain("デイリースロット");
  });

  it("renders SlotMachine for day8 slot seat", () => {
    const gs = {
      subPhase: "day8",
      gamePhase: "playing",
      currentPlayerIdx: 0,
      players: [
        {
          id: "p1",
          name: "Test",
          characterType: "salaryman",
          movePhase: "arrived",
          slotTurnsLeft: 3,
          slotPullsGranted: 3,
          slotPullsThisSeat: 0,
          stats: baseStats,
        },
      ],
      slotPhase: "idle",
    };
    const html = renderToString(
      <SlotMachine
        gs={gs}
        cpGs={gs.players[0]}
        isMyTurn
        writeGS={async () => true}
        commitPendingGameState={async () => true}
        commitDay8SlotLivePatch={async () => true}
        syncDay8SlotIdleFromLive={() => {}}
        commitGameStateTransaction={async () => gs}
        commitDay8SlotSpin={async () => gs}
        soundRef={{ current: null }}
        myId="p1"
      />,
    );
    expect(html.length).toBeGreaterThan(100);
  });

  it("renders SlotSpinBroadcastOverlay when slot is spinning", () => {
    const gs = {
      subPhase: "day8",
      gamePhase: "playing",
      currentPlayerIdx: 0,
      slotPhase: "spinning",
      slotSpinSessionId: "1700000000000-test",
      targetResult: [0, 1, 2],
      slotMirrorMachineKey: "standard",
      isReach: false,
      slotReachCutin: false,
      players: [
        {
          id: "p1",
          name: "Test",
          characterType: "salaryman",
          movePhase: "arrived",
          stats: baseStats,
        },
      ],
    };
    const html = renderToString(
      <SlotSpinBroadcastOverlay gs={gs} soundRef={{ current: null }} myId="p2" />,
    );
    expect(html.length).toBeGreaterThan(50);
  });
});
