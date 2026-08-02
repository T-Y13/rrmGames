import { describe, expect, it } from "vitest";
import { DAY8_MAX_TURNS, LAST_DAILY_DAY } from "../constants/gameBalance";
import {
  buildAssetHistoryChartData,
  buildAssetHistoryXAxisOrderTicks,
  formatAssetHistoryOrderLabel,
} from "./assetHistoryFromGameState";

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
          a: { "1": 1600 },
          b: { "1": 2000 },
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
    expect(day1?.Alice).toBe(1600);
    expect(day1?.Bob).toBe(2000);

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
          w: { "1": 600 },
          l: { "1": 500 },
        },
        day8: {},
        day8Timeline: [],
      },
      log: [
        "Winner: 最終資金 54404G / ランク SS+",
        "Winner 1回目 100G → 🏆 ジャックポット!! 収支+54304G",
      ],
    };

    const { chartData } = buildAssetHistoryChartData(gameState);
    const day1 = chartData.find((r) => r.time === "1日");
    expect(day1?.Winner).toBe(600);
    expect(day1?.Loser).toBe(500);
    expect(day1?.Winner).not.toBe(54404);
  });

  it("uses day8 turn buckets only and ignores move/slot timeline duplicates", () => {
    const gameState = {
      players: [
        { id: "w", name: "Winner", stats: { money: 1200 }, moveTurns: 5 },
        { id: "l", name: "Loser", stats: { money: 400 }, moveTurns: 5 },
      ],
      assetHistory: {
        v: 1,
        daily: { w: { [String(LAST_DAILY_DAY)]: 480 }, l: { [String(LAST_DAILY_DAY)]: 400 } },
        day8: { w: { "5": 1200 }, l: { "5": 400 } },
        day8Timeline: [
          { seq: 1, turn: 5, kind: "move", money: { w: 1300, l: 400 } },
          { seq: 2, turn: 5, kind: "slot", money: { w: 1200, l: 400 } },
        ],
      },
      log: [],
    };

    const { chartData } = buildAssetHistoryChartData(gameState);
    const day8Rows = chartData.filter((r) => String(r.time).startsWith("8-"));

    expect(day8Rows).toHaveLength(DAY8_MAX_TURNS);
    const turn5Rows = day8Rows.filter((r) => r.time === "8-5");
    expect(turn5Rows).toHaveLength(1);
    expect(turn5Rows[0].Winner).toBe(1200);
    expect(turn5Rows[0].Loser).toBe(400);
    expect(day8Rows[day8Rows.length - 1].time).toBe(`8-${DAY8_MAX_TURNS}`);
  });

  it(`shows one point per day8 turn up to 8-${DAY8_MAX_TURNS}`, () => {
    const gameState = {
      players: [{ id: "a", name: "Alice", stats: { money: 1000 }, moveTurns: DAY8_MAX_TURNS }],
      assetHistory: {
        v: 1,
        daily: { a: { [String(LAST_DAILY_DAY)]: 500 } },
        day8: {},
        day8Timeline: [
          { seq: 25, turn: DAY8_MAX_TURNS - 1, kind: "move", money: { a: 900 } },
          { seq: 27, turn: DAY8_MAX_TURNS, kind: "slot", money: { a: 1000 } },
        ],
      },
    };

    const { chartData } = buildAssetHistoryChartData(gameState);
    const day8Rows = chartData.filter((r) => String(r.time).startsWith("8-"));

    expect(day8Rows).toHaveLength(DAY8_MAX_TURNS);
    expect(new Set(day8Rows.map((r) => r.time)).size).toBe(DAY8_MAX_TURNS);
    expect(day8Rows.find((r) => r.time === `8-${DAY8_MAX_TURNS}`)?.Alice).toBe(1000);
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
          a: { "1": 800, [String(LAST_DAILY_DAY)]: 1600 },
          b: { "1": 750, [String(LAST_DAILY_DAY)]: 2000 },
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
    const turn3 = chartData.find((r) => r.time === "8-3");
    expect(turn3?.Alice).toBe(5000);
    expect(turn3?.Alice).not.toBe(99999);
  });

  it("applies final player money to last day8 turn when timeline is empty", () => {
    const gameState = {
      players: [{ id: "a", name: "Alice", stats: { money: 15628 }, moveTurns: DAY8_MAX_TURNS }],
      assetHistory: {
        v: 1,
        daily: { a: { "1": 800, [String(LAST_DAILY_DAY)]: 1600 } },
        day8: { a: { [String(DAY8_MAX_TURNS - 2)]: 15000 } },
        day8Timeline: [],
      },
      log: [],
    };

    const { chartData } = buildAssetHistoryChartData(gameState);
    const turnLast = chartData.find((r) => r.time === `8-${DAY8_MAX_TURNS}`);
    expect(turnLast?.Alice).toBe(15628);
  });

  it(`always includes day8 turns 8-1 through 8-${DAY8_MAX_TURNS} when timeline stops early`, () => {
    const gameState = {
      players: [
        { id: "w", name: "Winner", stats: { money: 9000 }, moveTurns: DAY8_MAX_TURNS - 2 },
        { id: "l", name: "Loser", stats: { money: 200 }, moveTurns: DAY8_MAX_TURNS - 2 },
      ],
      assetHistory: {
        v: 1,
        daily: { w: { [String(LAST_DAILY_DAY)]: 1000 }, l: { [String(LAST_DAILY_DAY)]: 500 } },
        day8: {
          w: { [String(DAY8_MAX_TURNS - 2)]: 8500 },
          l: { [String(DAY8_MAX_TURNS - 2)]: 200 },
        },
        day8Timeline: [
          {
            seq: 20,
            turn: DAY8_MAX_TURNS - 2,
            kind: "slot",
            money: { w: 8500, l: 200 },
          },
        ],
      },
    };

    const { chartData } = buildAssetHistoryChartData(gameState);
    const day8Labels = [...new Set(chartData.filter((r) => String(r.time).startsWith("8-")).map((r) => r.time))];

    expect(day8Labels).toEqual(
      Array.from({ length: DAY8_MAX_TURNS }, (_, i) => `8-${i + 1}`),
    );
    expect(chartData.find((r) => r.time === `8-${DAY8_MAX_TURNS}`)?.Winner).toBe(9000);
  });

  it("uses evenly spaced numeric order with exactly one point per bucket", () => {
    const gameState = {
      players: [
        { id: "w", name: "Winner", stats: { money: 1200 }, moveTurns: 5 },
        { id: "l", name: "Loser", stats: { money: 400 }, moveTurns: 5 },
      ],
      assetHistory: {
        v: 1,
        daily: { w: { [String(LAST_DAILY_DAY)]: 480 }, l: { [String(LAST_DAILY_DAY)]: 400 } },
        day8: { w: { "5": 1200 }, l: { "5": 400 } },
        day8Timeline: [
          { seq: 1, turn: 5, kind: "move", money: { w: 1300, l: 400 } },
          { seq: 2, turn: 5, kind: "slot", money: { w: 1200, l: 400 } },
        ],
      },
    };

    const { chartData, day8TransitionOrder, xDomain } = buildAssetHistoryChartData(gameState);
    const day8Rows = chartData.filter((r) => String(r.time).startsWith("8-"));

    const maxOrder = LAST_DAILY_DAY + DAY8_MAX_TURNS;
    expect(day8TransitionOrder).toBe(LAST_DAILY_DAY + 1);
    expect(xDomain).toEqual([0, maxOrder]);
    expect(chartData.find((r) => r.time === `${LAST_DAILY_DAY}日`)?.order).toBe(LAST_DAILY_DAY);
    expect(day8Rows.find((r) => r.time === "8-1")?.order).toBe(LAST_DAILY_DAY + 1);
    expect(day8Rows.find((r) => r.time === `8-${DAY8_MAX_TURNS}`)?.order).toBe(maxOrder);
    expect(day8Rows.filter((r) => r.time === "8-5")).toHaveLength(1);
    expect(buildAssetHistoryXAxisOrderTicks()).toEqual(
      Array.from({ length: maxOrder + 1 }, (_, i) => i),
    );
    expect(formatAssetHistoryOrderLabel(LAST_DAILY_DAY + 1)).toBe("8-1");
    expect(formatAssetHistoryOrderLabel(maxOrder)).toBe(`8-${DAY8_MAX_TURNS}`);
  });
});
