import { describe, expect, it } from "vitest";
import { buildAssetHistoryChartData } from "./assetHistoryFromGameState";

describe("buildAssetHistoryChartData", () => {
  it("builds daily and day8 series from logs", () => {
    const gameState = {
      players: [
        { id: "a", name: "Alice", stats: { money: 800 }, moveTurns: 2 },
        { id: "b", name: "Bob", stats: { money: 1200 }, moveTurns: 1 },
      ],
      log: [
        "Alice: 最終資金 800G / ランク C",
        "Bob: 最終資金 1200G / ランク B",
        "Bob T2: 🎲 → 10/50マス",
        "Alice T2: 🎲 → 5/50マス",
        "━━━ 8日目！全員で交互に移動＆スロット ━━━",
        "Bobのターン（7日目）",
        "  生活費 -500G → 資金 1100G",
        "Bob 7日目【仕事】資金+1300G",
        "Aliceのターン（7日目）",
        "  生活費 -500G → 資金 900G",
        "Alice 7日目【仕事】資金+1300G",
        "━━━ 2日目 開始 ━━━",
        "Aliceのターン（1日目）",
        "  生活費 -500G → 資金 700G",
        "Alice 1日目【仕事】資金+1300G",
      ],
    };

    const { chartData, playerSeries } = buildAssetHistoryChartData(gameState);
    expect(playerSeries).toHaveLength(2);
    expect(chartData.some((r) => r.time === "1D")).toBe(true);
    expect(chartData.some((r) => r.time === "7D")).toBe(true);
    expect(chartData.some((r) => r.time === "8T1")).toBe(true);
    const last = chartData[chartData.length - 1];
    expect(last.Alice).toBe(800);
    expect(last.Bob).toBe(1200);
  });
});
