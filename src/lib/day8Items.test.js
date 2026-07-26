import { describe, expect, it } from "vitest";
import { DAY8_FIXED_START_GRANT } from "../constants/day8Items";
import { TILE_EFFECT_KIND } from "../constants/gameBalance";
import { applyDay8MoveStepBonus, applyDay8SlotPayoutBonus, buildDay8CardMoveEffectMeta } from "../lib/day8ItemEffects";
import {
  getDay8ItemQty,
  grantDay8StartInventoryToPlayers,
  listDay8ItemDisplayEntries,
  resetDay8ItemSeatForPlayer,
  useDay8ItemOnGameState,
} from "../lib/day8Items";
import { computeAdvanceDay8Turn } from "../utils/gameLogic";

describe("day8 items", () => {
  const basePlayer = (overrides = {}) => ({
    id: "p1",
    name: "A",
    alive: true,
    movePhase: "moving",
    moveTurns: 0,
    position: 3,
    skipTurns: 0,
    pendingTaxiSteps: 0,
    slotTurnsLeft: 0,
    slotPullsThisSeat: 0,
    stats: { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 },
    day8Inventory: {},
    day8ItemUsedThisSeat: false,
    day8SeatEffects: [],
    ...overrides,
  });

  it("grants fixed inventory at day 8 start", () => {
    const [p] = grantDay8StartInventoryToPlayers([basePlayer()]);
    expect(p.day8Inventory).toEqual(DAY8_FIXED_START_GRANT);
    expect(p.day8ItemUsedThisSeat).toBe(false);
  });

  it("useDay8Item arms seat effect and consumes qty", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 0,
      slotPhase: "idle",
      players: [basePlayer({ day8Inventory: { ...DAY8_FIXED_START_GRANT } })],
      log: [],
    };
    const next = useDay8ItemOnGameState(gs, 0, "dashCard");
    expect(next?.players[0].day8SeatEffects[0]?.kind).toBe("extraSteps");
    expect(next?.players[0].day8SeatEffects[0]?.value).toBe(3);
    expect(getDay8ItemQty(next.players[0], "dashCard")).toBe(0);
    expect(next?.players[0].day8ItemUsedThisSeat).toBe(true);
  });

  it("blocks second item in same seat", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 0,
      slotPhase: "idle",
      players: [
        basePlayer({
          day8Inventory: { dashCard: 1, luckySpin: 1 },
          day8ItemUsedThisSeat: true,
        }),
      ],
      log: [],
    };
    expect(useDay8ItemOnGameState(gs, 0, "luckySpin")).toBeNull();
  });

  it("listDay8ItemDisplayEntries shows all cards with phase hints", () => {
    const p = basePlayer({ day8Inventory: { ...DAY8_FIXED_START_GRANT } });
    const gs = { gamePhase: "playing", subPhase: "day8", slotPhase: "idle" };
    const items = listDay8ItemDisplayEntries(p, gs);
    expect(items).toHaveLength(3);
    expect(items.find((x) => x.id === "dashCard")?.usableNow).toBe(true);
    expect(items.find((x) => x.id === "luckySpin")?.usableNow).toBe(false);
    expect(items.find((x) => x.id === "luckySpin")?.unusableReason).toBe("スロット手番で使用");
  });

  it("buildDay8CardMoveEffectMeta formats card bubble for movement fx", () => {
    expect(buildDay8CardMoveEffectMeta(3)).toEqual({
      titles: ["カード効果 +3"],
      kind: TILE_EFFECT_KIND.MOVE_FORWARD,
    });
    expect(buildDay8CardMoveEffectMeta(0)).toBeNull();
  });

  it("applyDay8MoveStepBonus adds +3 and clears move effect", () => {
    const p = basePlayer({
      day8SeatEffects: [{ kind: "extraSteps", value: 3, applyOn: "moveResolve", applyScope: "once" }],
    });
    const r = applyDay8MoveStepBonus(p, 4);
    expect(r.stepCells).toBe(7);
    expect(r.consumed).toBe(true);
    expect(r.player.day8SeatEffects).toEqual([]);
  });

  it("applyDay8SlotPayoutBonus once scope clears after win", () => {
    const effect = {
      kind: "slotPayoutMult",
      value: 1.5,
      applyOn: "slotPayout",
      applyScope: "once",
    };
    const p = basePlayer({ day8SeatEffects: [effect] });
    const win = applyDay8SlotPayoutBonus(p, 1000, "big");
    expect(win.grossPayout).toBe(1500);
    expect(win.consumed).toBe(true);
    expect(win.player.day8SeatEffects).toEqual([]);
  });

  it("applyDay8SlotPayoutBonus slotBurstAll keeps effect for next spin", () => {
    const effect = {
      kind: "slotPayoutMult",
      value: 1.2,
      applyOn: "slotPayout",
      applyScope: "slotBurstAll",
    };
    const p = basePlayer({ day8SeatEffects: [effect] });
    const win = applyDay8SlotPayoutBonus(p, 1000, "big");
    expect(win.grossPayout).toBe(1200);
    expect(win.consumed).toBe(false);
    expect(win.player.day8SeatEffects).toHaveLength(1);
  });

  it("computeAdvanceDay8Turn resets item state for next player", () => {
    const players = [
      basePlayer({ id: "a", movePhase: "missed" }),
      basePlayer({
        id: "b",
        movePhase: "moving",
        day8ItemUsedThisSeat: true,
        day8SeatEffects: [{ kind: "extraSteps", value: 3 }],
      }),
    ];
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 0,
      players,
      log: [],
    };
    const next = computeAdvanceDay8Turn(gs, players, ["advance"]);
    expect(next.currentPlayerIdx).toBe(1);
    expect(next.players[1].day8ItemUsedThisSeat).toBe(false);
    expect(next.players[1].day8SeatEffects).toEqual([]);
  });

  it("resetDay8ItemSeatForPlayer clears seat state", () => {
    const p = resetDay8ItemSeatForPlayer(
      basePlayer({ day8ItemUsedThisSeat: true, day8SeatEffects: [{}] }),
    );
    expect(p.day8ItemUsedThisSeat).toBe(false);
    expect(p.day8SeatEffects).toEqual([]);
  });
});
