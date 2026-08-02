// @vitest-environment happy-dom
import { describe, expect, it, afterEach, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { act } from "react";
import React from "react";
import DailySlotTrainingModal from "./DailySlotTrainingModal.jsx";
import SlotSpinBroadcastOverlay from "./SlotSpinBroadcastOverlay.jsx";

const baseStats = { money: 10000, luck: 50, skill: 50, virtue: 50, pon: 0 };

describe("DailySlotTrainingModal client mount", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("mounts without throwing when opened", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => ({
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      beginPath: vi.fn(),
      rect: vi.fn(),
      clip: vi.fn(),
      strokeRect: vi.fn(),
      stroke: vi.fn(),
      fillText: vi.fn(),
      createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 1,
      globalAlpha: 1,
      font: "",
      textAlign: "center",
      textBaseline: "middle",
      shadowColor: "",
      shadowBlur: 0,
    }));

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <DailySlotTrainingModal
          open
          statsForSpin={baseStats}
          characterType="salaryman"
          playerName="Test"
          onClose={() => {}}
          onFinished={async () => {}}
        />,
      );
    });

    expect(container.textContent).toContain("デイリースロット");
    expect(container.querySelector("canvas")).toBeTruthy();

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("mounts SlotSpinBroadcastOverlay without ReferenceError", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => ({
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      beginPath: vi.fn(),
      rect: vi.fn(),
      clip: vi.fn(),
      strokeRect: vi.fn(),
      stroke: vi.fn(),
      fillText: vi.fn(),
      createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 1,
      globalAlpha: 1,
      font: "",
      textAlign: "center",
      textBaseline: "middle",
      shadowColor: "",
      shadowBlur: 0,
    }));

    const gs = {
      subPhase: "day8",
      gamePhase: "playing",
      currentPlayerIdx: 0,
      slotPhase: "idle",
      displayReels: ["7", "BAR", "🍒"],
      players: [
        {
          id: "p1",
          name: "Test",
          characterType: "salaryman",
          movePhase: "arrived",
          spinCount: 1,
          lastSpinResult: {
            spin: 1,
            tier: "small",
            visualReels: ["7", "BAR", "🍒"],
            net: 50,
          },
          stats: baseStats,
        },
      ],
    };

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <SlotSpinBroadcastOverlay gs={gs} soundRef={{ current: null }} myId="p2" />,
      );
    });

    expect(container.querySelector("canvas")).toBeTruthy();

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });
});
