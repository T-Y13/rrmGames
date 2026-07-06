import { describe, expect, it } from "vitest";
import {
  finalizeDay8AssetHistory,
  mergeAssetHistoryBuckets,
  recordDailyMoney,
  snapshotDailyEndAllPlayers,
  snapshotDay8TurnEndAllPlayers,
} from "./playerAssetHistory";
import { computeAdvanceDaily, computeAdvanceDay8Turn, initialGameState } from "../utils/gameLogic";

const mkPlayer = (id, name, money, moveTurns = 0) => ({
  id,
  name,
  alive: true,
  stats: { money, pon: 10, luck: 10, skill: 10, virtue: 10 },
  moveTurns,
  movePhase: "moving",
  position: 0,
});

describe("playerAssetHistory", () => {
  it("records daily money per player per day", () => {
    let gs = { players: [mkPlayer("a", "Alice", 600), mkPlayer("b", "Bob", 600)] };
    gs = recordDailyMoney(gs, "a", 1, 800);
    gs = recordDailyMoney(gs, "b", 1, 750);
    expect(gs.assetHistory.daily.a["1"]).toBe(800);
    expect(gs.assetHistory.daily.b["1"]).toBe(750);
  });

  it("snapshots all players at day end", () => {
    const players = [mkPlayer("a", "Alice", 1600), mkPlayer("b", "Bob", 2000)];
    const gs = snapshotDailyEndAllPlayers({ players }, 7, players);
    expect(gs.assetHistory.daily.a["7"]).toBe(1600);
    expect(gs.assetHistory.daily.b["7"]).toBe(2000);
  });

  it("snapshots all players on day8 turn end", () => {
    const players = [
      { ...mkPlayer("a", "Alice", 900, 2), movePhase: "moving" },
      { ...mkPlayer("b", "Bob", 1200, 2), movePhase: "moving" },
    ];
    const gs = snapshotDay8TurnEndAllPlayers({ players }, 2, players);
    expect(gs.assetHistory.day8.a["2"]).toBe(900);
    expect(gs.assetHistory.day8.b["2"]).toBe(1200);
    expect(gs.assetHistory.day8Timeline).toHaveLength(1);
    expect(gs.assetHistory.day8Timeline[0].kind).toBe("move");
  });

  it("records slot handoff on turn end with kind slot", () => {
    const players = [
      { ...mkPlayer("a", "Alice", 850, 3), movePhase: "arrived", slotPullsThisSeat: 3 },
      { ...mkPlayer("b", "Bob", 800, 3), movePhase: "moving" },
    ];
    const gs = snapshotDay8TurnEndAllPlayers({ players }, 3, players, "slot");
    expect(gs.assetHistory.day8Timeline).toHaveLength(1);
    expect(gs.assetHistory.day8Timeline[0].kind).toBe("slot");
    expect(gs.assetHistory.day8Timeline[0].money.a).toBe(850);
  });

  it("finalizeDay8AssetHistory writes final turn from player stats", () => {
    const players = [mkPlayer("a", "Alice", 54404, 12)];
    const gs = finalizeDay8AssetHistory({ players }, players);
    expect(gs.assetHistory.day8.a["12"]).toBe(54404);
  });

  it("mergeAssetHistoryBuckets keeps daily from live when next is stale", () => {
    const live = {
      players: [mkPlayer("a", "Alice", 800), mkPlayer("b", "Bob", 750)],
      assetHistory: {
        v: 1,
        daily: { a: { "1": 800 }, b: { "1": 750 } },
        day8: {},
      },
    };
    const next = {
      players: [mkPlayer("a", "Alice", 900), mkPlayer("b", "Bob", 850)],
      assetHistory: {
        v: 1,
        daily: { a: { "2": 900 }, b: { "2": 850 } },
        day8: { a: { "1": 900 } },
      },
    };
    const merged = mergeAssetHistoryBuckets(live, next);
    expect(merged.daily.a["1"]).toBe(800);
    expect(merged.daily.b["1"]).toBe(750);
    expect(merged.daily.a["2"]).toBe(900);
    expect(merged.day8.a["1"]).toBe(900);
  });
});

describe("gameLogic assetHistory hooks", () => {
  it("initialGameState includes empty assetHistory", () => {
    const gs = initialGameState([
      { id: "a", name: "Alice", character: "salaryman" },
      { id: "b", name: "Bob", character: "salaryman" },
    ]);
    expect(gs.assetHistory.v).toBe(1);
    expect(gs.assetHistory.daily.a).toEqual({});
    expect(gs.assetHistory.daily.b).toEqual({});
  });

  it("computeAdvanceDaily records acting player daily money", () => {
    const gs = {
      currentDay: 1,
      currentPlayerIdx: 0,
      players: [mkPlayer("a", "Alice", 800), mkPlayer("b", "Bob", 600)],
      log: [],
    };
    const next = computeAdvanceDaily(gs, gs.players, []);
    expect(next.assetHistory.daily.a["1"]).toBe(800);
  });

  it("computeAdvanceDay8Turn records turn snapshot when advancing", () => {
    const players = [
      { ...mkPlayer("a", "Alice", 900, 1), movePhase: "moving", slotTurnsLeft: 0, slotPullsThisSeat: 0 },
      { ...mkPlayer("b", "Bob", 700, 0), movePhase: "moving", slotTurnsLeft: 0, slotPullsThisSeat: 0 },
    ];
    const gs = {
      subPhase: "day8",
      gamePhase: "playing",
      currentPlayerIdx: 0,
      players,
      log: [],
    };
    const next = computeAdvanceDay8Turn(gs, players, []);
    expect(next.assetHistory.day8.a["1"]).toBe(900);
    expect(next.assetHistory.day8.b["1"]).toBe(700);
  });
});
