import { describe, expect, it } from "vitest";
import { buildAssetHistoryChartData } from "./assetHistoryFromGameState";

describe("buildAssetHistoryChartData", () => {
  it("builds daily and day8 series from stored assetHistory only", () => {
    const gameState = {
      players: [
        { id: "a", name: "Alice", stats: { money: 800 }, moveTurns: 2 },
        { id: "b", name: "Bob", stats: { money: 1200 }, moveTurns: 1 },
      ],
      assetHistory: {
        v: 1,
        daily: {
          a: { "1": 800, "7": 1600 },
          b: { "1": 800, "7": 2000 },
        },
        day8: {
          a: { "2": 800 },
          b: { "1": 1200 },
        },
        day8Timeline: [],
      },
      log: [],
    };

    const { chartData, playerSeries } = buildAssetHistoryChartData(gameState);
    expect(playerSeries).toHaveLength(2);

    const day1 = chartData.find((r) => r.time === "1日");
    const day7 = chartData.find((r) => r.time === "7日");
    expect(day1?.Alice).toBe(800);
    expect(day1?.Bob).toBe(800);
    expect(day7?.Alice).toBe(1600);
    expect(day7?.Bob).toBe(2000);

    const last = chartData[chartData.length - 1];
    expect(last.Alice).toBe(800);
    expect(last.Bob).toBe(1200);
  });

  it("ignores log lines when assetHistory is present", () => {
    const gameState = {
      players: [
        { id: "w", name: "Winner", stats: { money: 54404 }, moveTurns: 12 },
        { id: "l", name: "Loser", stats: { money: -307 }, moveTurns: 8 },
      ],
      assetHistory: {
        v: 1,
        daily: {
          w: { "1": 400, "7": 600 },
          l: { "1": 400, "7": 500 },
        },
        day8: {},
        day8Timeline: [],
      },
      log: [
        "Winner: 最終資金 54404G / ランク SS+",
        "Winner 1回目 100G → 🏆 POT JP!!（収支+54304G・資金54404G）",
      ],
    };

    const { chartData } = buildAssetHistoryChartData(gameState);
    const day1 = chartData.find((r) => r.time === "1日");
    const day7 = chartData.find((r) => r.time === "7日");
    expect(day1?.Winner).toBe(400);
    expect(day7?.Winner).toBe(600);
    expect(day1?.Winner).not.toBe(54404);
  });

  it("builds day8 timeline from stored handoff snapshots", () => {
    const gameState = {
      players: [
        { id: "w", name: "Winner", stats: { money: 1200 }, moveTurns: 5 },
        { id: "l", name: "Loser", stats: { money: 400 }, moveTurns: 5 },
      ],
      assetHistory: {
        v: 1,
        daily: { w: { "7": 480 }, l: { "7": 400 } },
        day8: { w: { "5": 1200 } },
        day8Timeline: [
          { seq: 1, turn: 5, kind: "move", money: { w: 1300, l: 400 } },
          { seq: 2, turn: 5, kind: "slot", money: { w: 1200, l: 400 } },
        ],
      },
      log: [],
    };

    const { chartData } = buildAssetHistoryChartData(gameState);
    const day8Rows = chartData.filter((r) => String(r.time).startsWith("8-"));

    expect(day8Rows).toHaveLength(2);
    expect(day8Rows[0].Winner).toBe(1300);
    expect(day8Rows[1].Winner).toBe(1200);
  });

  it("uses stored day8 turn buckets when timeline is empty", () => {
    const gameState = {
      players: [
        { id: "a", name: "Alice", stats: { money: 5000 }, moveTurns: 3 },
        { id: "b", name: "Bob", stats: { money: 3000 }, moveTurns: 2 },
      ],
      assetHistory: {
        v: 1,
        daily: {
          a: { "1": 800, "7": 1600 },
          b: { "1": 750, "7": 2000 },
        },
        day8: {
          a: { "1": 1700, "2": 2500, "3": 5000 },
          b: { "1": 2100, "2": 2800 },
        },
        day8Timeline: [],
      },
      log: ["Alice: 最終資金 99999G / ランク SS"],
    };

    const { chartData } = buildAssetHistoryChartData(gameState);
    const turn3 = chartData.find((r) => r.time === "8/3");
    expect(turn3?.Alice).toBe(5000);
    expect(turn3?.Alice).not.toBe(99999);
  });

  it("applies final player money to last day8 turn when timeline is empty", () => {
    const gameState = {
      players: [{ id: "a", name: "Alice", stats: { money: 15628 }, moveTurns: 13 }],
      assetHistory: {
        v: 1,
        daily: { a: { "1": 800, "7": 1600 } },
        day8: { a: { "12": 15000 } },
        day8Timeline: [],
      },
      log: [],
    };

    const { chartData } = buildAssetHistoryChartData(gameState);
    const turn13 = chartData.find((r) => r.time === "8/13");
    expect(turn13?.Alice).toBe(15628);
  });
});
