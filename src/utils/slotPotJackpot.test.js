import { describe, it, expect, vi, afterEach } from "vitest";
import {
  applyDay8SlotSpinToFreshGameState,
  calcSlotRates,
  formatDay8SlotSpinLogLine,
  spinSlot,
  getSlotReelSymbols,
  slotMachineForReels,
} from "./gameLogic.js";
import { SLOT_MACHINES } from "../constants/gameBalance.js";

describe("potJackpot tier", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("includes fixed 1% potJp only when potJackpotEnabled", () => {
    const stats = { skill: 50, luck: 50, virtue: 50 };
    const machine = SLOT_MACHINES.standard;
    const off = calcSlotRates(stats, machine, 0, null, { potJackpotEnabled: false });
    const on = calcSlotRates(stats, machine, 0, null, { potJackpotEnabled: true });
    expect(off.potJp).toBe(0);
    expect(on.potJp).toBe(0.01);
  });

  it("does not raise potJp from skill, luck, heat, or student", () => {
    const machine = SLOT_MACHINES.standard;
    const boosted = calcSlotRates(
      { skill: 90, luck: 100, virtue: 50 },
      machine,
      15,
      "student",
      { potJackpotEnabled: true },
    );
    expect(boosted.potJp).toBe(0.01);
    expect(boosted.jp).toBeGreaterThan(machine.baseRates.jp);
  });

  it("can roll potJackpot when enabled and random hits pot band", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.645);
    const stats = { skill: 50, luck: 50, virtue: 50 };
    const res = spinSlot(stats, 100, "standard", 0, null, { pityCounter: 0, potJackpotEnabled: true });
    expect(res.tier).toBe("potJackpot");
    expect(res.reels).toEqual(["💰", "💰", "💰"]);
    expect(res.payout).toBe(0);
  });

  it("includes pot symbol on reel strip only when potJackpotEnabled", () => {
    const machine = SLOT_MACHINES.standard;
    expect(getSlotReelSymbols(machine, false)).not.toContain("💰");
    expect(getSlotReelSymbols(machine, true)).toContain("💰");
    expect(slotMachineForReels(machine, true).symbols).toContain("💰");
  });

  it("keeps potJp at 1% on pity forced win redistribution", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const stats = { skill: 50, luck: 50, virtue: 0 };
    const maxPity = 15;
    const res = spinSlot(stats, 100, "standard", 0, null, {
      pityCounter: maxPity,
      potJackpotEnabled: true,
    });
    expect(res.pityForced).toBe(true);
    expect(res.r.potJp).toBe(0.01);
  });

  it("formatDay8SlotSpinLogLine shows pull index, bet, and hit only", () => {
    expect(
      formatDay8SlotSpinLogLine({
        actorName: "Alice",
        pullIndex: 2,
        bet: 100,
        message: "🔔 当たり！",
        net: 50,
        newMoney: 750,
      }),
    ).toBe("Alice 2回目 100G → 🔔 当たり！（収支+50G・資金750G）");

    expect(
      formatDay8SlotSpinLogLine({
        actorName: "Bob",
        proxyTargetName: "Carol",
        pullIndex: 1,
        bet: 100,
        message: "🏆 POT JP!! ポット全額GET！",
        net: 5000,
        newMoney: 5100,
        potPayout: 5000,
      }),
    ).toBe(
      "【代理→Carol】Bob 1回目 100G → 🏆 POT JP!! ポット全額GET！（収支+5000G・資金5100G）",
    );
  });

  it("applyDay8SlotSpin keeps pull counts when live state was already decremented", () => {
    const machine = SLOT_MACHINES.standard;
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 0,
      players: [
        {
          id: "a",
          name: "A",
          movePhase: "arrived",
          slotTurnsLeft: 2,
          slotPullsThisSeat: 1,
          spinCount: 0,
          slotHeat: 0,
          slotPityCounter: 0,
          slotNet: 0,
          stats: { money: 1000, skill: 50, luck: 50, virtue: 50 },
        },
      ],
      log: [],
    };
    const res = {
      tier: "potJackpot",
      payout: 0,
      message: "🏆 POT JP!!",
      r: { jp: 0, miss: 0.5 },
      reels: ["💰", "💰", "💰"],
    };
    const next = applyDay8SlotSpinToFreshGameState(gs, {
      actorIdx: 0,
      proxyTargetIdx: null,
      bet: 100,
      res,
      newLeft: 2,
      newPullsSeat: 1,
      newSpins: 1,
      newHeat: 1,
      pityAfter: 0,
      visualReels: ["💰", "💰", "💰"],
      emotionLine: null,
      machine,
      slotTurnsBefore: 3,
      potPayout: 18000,
    });
    expect(next).not.toBeNull();
    expect(next.log[0]).toMatch(/^A 1回目 100G →/);
    expect(next.players[0].slotTurnsLeft).toBe(2);
    expect(next.players[0].slotPullsThisSeat).toBe(1);
    expect(next.players[0].stats.money).toBe(1000 - 100 + 18000);
  });
});
