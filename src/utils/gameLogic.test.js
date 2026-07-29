import { describe, it, expect, vi, afterEach } from "vitest";
import { CHARACTERS } from "../constants/gameBalance";
import {
  VIRTUE_BY_INITIAL_ROLL,
  virtueMinRoll,
  rollDie,
  sugorokuLuckyDiceChancePct,
  applyGoalLandingConfirm,
  applyGoalArrivalToPlayer,
  beginDay8SlotSeatForPlayer,
  buildNextGsAfterGoalArrival,
  advanceDay8AfterSlotSpinShow,
  applyDay8ActorMoveCommit,
  computeAdvanceDay8Turn,
  computeFinalStatsFromInitialRolls,
  eliminateDay8Player,
  generateSugorokuTileEffects,
  getBoardDeathPosition,
  getBoardTombDisplayPosition,
  resolveDebtTrapTriggered,
  snapshotDeathOnBoard,
  isDay8Done,
  isDay8GameFinished,
  releaseDay8PlayerToWaitingSlotAfterBurst,
  skipGhostTurnAllPlayersArrived,
  skipGhostTurnNoPickableProxy,
  buildDay8SlotSpinningGs,
  isLobbyMemberReady,
  allLobbyMembersReady,
  livingRollFromInitialRolls,
  computeSugorokuMsPerStep,
  computeSugorokuHopDurationMs,
  SUGOROKU_MS_PER_STEP_NORMAL,
  SUGOROKU_MS_PER_STEP_MIN,
} from "./gameLogic.js";
import { SUGOROKU_VERIFY_DEATH_TEST_TRAP_FIRST_N, TILE_EFFECT_KIND } from "../constants/gameBalance";

describe("virtueMinRoll", () => {
  it("returns the minimum d6 face for each virtue band", () => {
    expect(virtueMinRoll(0)).toBe(1);
    expect(virtueMinRoll(49)).toBe(1);
    expect(virtueMinRoll(50)).toBe(2);
    expect(virtueMinRoll(69)).toBe(2);
    expect(virtueMinRoll(70)).toBe(3);
    expect(virtueMinRoll(99)).toBe(3);
    expect(virtueMinRoll(100)).toBe(4);
    expect(virtueMinRoll(500)).toBe(4);
  });
});

describe("initial rolls → final virtue", () => {
  it("uses VIRTUE_BY_INITIAL_ROLL for the virtue die (salaryman, no extra bonus)", () => {
    const rolls = { luck: 0, skill: 0, virtue: 3, pon: 0 };
    const { virtue } = computeFinalStatsFromInitialRolls(rolls, "salaryman");
    expect(virtue).toBe(20 + VIRTUE_BY_INITIAL_ROLL[3]);
  });

  it("derives living roll from the mean of luck, skill, virtue dice", () => {
    expect(livingRollFromInitialRolls({ luck: 0, skill: 0, virtue: 0, pon: 0 })).toBe(0);
    expect(livingRollFromInitialRolls({ luck: 2, skill: 3, virtue: 4, pon: 0 })).toBe(3);
  });

  it("student luck still uses roll*2 + luckBonus via resolveInitialLuck", () => {
    const rolls = { luck: 1, skill: 0, virtue: 0, pon: 0 };
    const { luck } = computeFinalStatsFromInitialRolls(rolls, "student");
    expect(luck).toBe(2 + 20);
  });

  it("landlord uses luckFixed regardless of roll", () => {
    const rolls = { luck: 5, skill: 0, virtue: 0, pon: 0 };
    const { luck, skill } = computeFinalStatsFromInitialRolls(rolls, "landlord");
    expect(luck).toBe(3);
    expect(skill).toBe(30 + CHARACTERS.landlord.skillBonus);
  });
});

describe("day8 slot seat helpers", () => {
  it("beginDay8SlotSeatForPlayer grants spins for this handoff only", () => {
    const began = beginDay8SlotSeatForPlayer({
      id: "a",
      movePhase: "waitingSlot",
      moveTurns: 9,
      slotTurnsLeft: 0,
    });
    expect(began?.movePhase).toBe("arrived");
    expect(began?.slotTurnsLeft).toBe(3);
    expect(began?.slotPullsGranted).toBe(3);
  });

  it("beginDay8SlotSeatForPlayer returns null on final move goal", () => {
    expect(
      beginDay8SlotSeatForPlayer({
        id: "a",
        movePhase: "waitingSlot",
        moveTurns: 15,
      }),
    ).toBeNull();
  });

  it("isDay8GameFinished is false for goal players still slotting", () => {
    const player = {
      id: "a",
      alive: true,
      movePhase: "waitingSlot",
      moveTurns: 9,
    };
    expect(isDay8GameFinished(player, [player])).toBe(false);
  });

  it("isDay8GameFinished is true for final-turn goal", () => {
    const player = {
      id: "a",
      alive: true,
      movePhase: "arrived",
      moveTurns: 15,
      slotTurnsLeft: 0,
    };
    expect(isDay8GameFinished(player, [player])).toBe(true);
  });

  it("releaseDay8PlayerToWaitingSlotAfterBurst returns player to waitingSlot", () => {
    const released = releaseDay8PlayerToWaitingSlotAfterBurst({
      movePhase: "arrived",
      moveTurns: 9,
      slotTurnsLeft: 0,
      slotPullsThisSeat: 3,
    });
    expect(released.movePhase).toBe("waitingSlot");
    expect(released.slotPullsThisSeat).toBe(0);
  });
});

describe("applyGoalArrivalToPlayer", () => {
  it("solo keeps goalLanding until manual confirm", () => {
    const { player, extraLogs } = applyGoalArrivalToPlayer(
      { id: "a", name: "A", moveTurns: 3 },
      false,
    );
    expect(player.movePhase).toBe("goalLanding");
    expect(extraLogs).toEqual([]);
  });

  it("multi skips goalLanding and goes to waitingSlot", () => {
    const { player, extraLogs } = applyGoalArrivalToPlayer(
      { id: "a", name: "A", moveTurns: 3 },
      true,
    );
    expect(player.movePhase).toBe("waitingSlot");
    expect(extraLogs.length).toBe(1);
  });

  it("final move goal skips slot waiting", () => {
    const { player, extraLogs } = applyGoalArrivalToPlayer(
      { id: "a", name: "A", moveTurns: 15 },
      true,
    );
    expect(player.movePhase).toBe("arrived");
    expect(player.slotTurnsLeft).toBe(0);
    expect(extraLogs[0]).toContain("最終移動ターン");
  });
});

describe("applyGoalLandingConfirm", () => {
  it("updates only the goal lander without changing currentPlayerIdx", () => {
    const gs = {
      subPhase: "day8",
      gamePhase: "playing",
      currentPlayerIdx: 1,
      log: [],
      players: [
        { id: "a", name: "A", movePhase: "arrived" },
        { id: "b", name: "B", movePhase: "goalLanding", moveTurns: 5 },
      ],
    };
    const next = applyGoalLandingConfirm(gs, "b");
    expect(next.currentPlayerIdx).toBe(1);
    expect(next.players[1].movePhase).toBe("waitingSlot");
    expect(next.players[0].movePhase).toBe("arrived");
  });
});

describe("sugorokuLuckyDiceChancePct", () => {
  it("returns 0 below luck 80", () => {
    expect(sugorokuLuckyDiceChancePct(79)).toBe(0);
    expect(sugorokuLuckyDiceChancePct(50)).toBe(0);
  });

  it("scales 40% at 80, 60% at 100, capped at 100%", () => {
    expect(sugorokuLuckyDiceChancePct(80)).toBe(40);
    expect(sugorokuLuckyDiceChancePct(100)).toBe(60);
    expect(sugorokuLuckyDiceChancePct(140)).toBe(100);
    expect(sugorokuLuckyDiceChancePct(200)).toBe(100);
  });
});

describe("rollDie", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rolls one d6 bounded by virtueMinRoll when luck < 80", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const out = rollDie({ virtue: 30, luck: 50 });

    expect(out.advantage).toBe(false);
    expect(out.rolls).toEqual([1]);
    expect(out.value).toBe(1);
  });

  it("rolls twice when luck 80 and lucky dice proc succeeds", () => {
    let i = 0;
    vi.spyOn(Math, "random").mockImplementation(() => {
      const seq = [0, 0, 0.999];
      return seq[Math.min(i++, seq.length - 1)];
    });

    const out = rollDie({ virtue: 10, luck: 80 });

    expect(out.advantage).toBe(true);
    expect(out.rolls).toHaveLength(2);
    expect(out.value).toBe(out.rolls[0] + out.rolls[1]);
  });

  it("rolls once when luck 80 but lucky dice proc fails", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const out = rollDie({ virtue: 10, luck: 80 });

    expect(out.advantage).toBe(false);
    expect(out.rolls).toEqual([4]);
  });

  it("uses 60% proc at luck 100", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.59);
    expect(rollDie({ virtue: 10, luck: 100 }).advantage).toBe(true);

    vi.restoreAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.61);
    expect(rollDie({ virtue: 10, luck: 100 }).advantage).toBe(false);
  });

  it("uses a higher minimum face for high virtue", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const low = rollDie({ virtue: 50, luck: 50 });
    const high = rollDie({ virtue: 100, luck: 50 });

    expect(virtueMinRoll(50)).toBe(2);
    expect(virtueMinRoll(100)).toBe(4);
    expect(low.rolls[0]).toBe(2);
    expect(high.rolls[0]).toBe(4);
  });
});

describe("computeSugorokuMsPerStep", () => {
  it("keeps normal pace for 6 steps or fewer", () => {
    expect(computeSugorokuMsPerStep(1)).toBe(SUGOROKU_MS_PER_STEP_NORMAL);
    expect(computeSugorokuMsPerStep(6)).toBe(SUGOROKU_MS_PER_STEP_NORMAL);
  });

  it("ramps speed for long moves but caps at 1.5x normal", () => {
    expect(computeSugorokuMsPerStep(7)).toBeGreaterThan(SUGOROKU_MS_PER_STEP_MIN);
    expect(computeSugorokuMsPerStep(7)).toBeLessThan(SUGOROKU_MS_PER_STEP_NORMAL);
    expect(computeSugorokuMsPerStep(20)).toBe(SUGOROKU_MS_PER_STEP_MIN);
    expect(computeSugorokuHopDurationMs(0, 10)).toBeGreaterThan(10 * 110);
  });
});

describe("dead player ghost turn selection", () => {
  const mkPlayers = (ghostActedThisRound = false) => [
    {
      id: "a",
      name: "A",
      alive: true,
      movePhase: "moving",
      moveTurns: 1,
      position: 3,
      slotPullsThisSeat: 0,
      slotTurnsLeft: 0,
    },
    {
      id: "b",
      name: "B",
      alive: false,
      movePhase: "spectating",
      ghostActedThisRound,
      moveTurns: 0,
      position: 0,
      slotPullsThisSeat: 0,
      slotTurnsLeft: 0,
    },
    {
      id: "c",
      name: "C",
      alive: true,
      movePhase: "moving",
      moveTurns: 0,
      position: 5,
      slotPullsThisSeat: 0,
      slotTurnsLeft: 0,
    },
  ];

  it("treats dead spectating player as pending when board targets exist", () => {
    const players = mkPlayers(false);
    expect(isDay8Done(players[1], players)).toBe(false);
  });

  it("treats dead moving player as pending until ghost acts", () => {
    const players = mkPlayers(false).map((p, i) =>
      i === 1 ? { ...p, movePhase: "moving" } : p,
    );
    expect(isDay8Done(players[1], players)).toBe(false);
  });

  it("skips dead player after ghostActedThisRound", () => {
    const players = mkPlayers(true);
    expect(isDay8Done(players[1], players)).toBe(true);
  });

  it("computeAdvanceDay8Turn hands off to dead player for ghost pick", () => {
    const players = mkPlayers(false);
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 0,
      players,
      log: [],
    };
    const next = computeAdvanceDay8Turn(gs, players, ["A moved"]);
    expect(next.currentPlayerIdx).toBe(1);
    expect(next.players[1].movePhase).toBe("ghostPickTarget");
  });

  it("computeAdvanceDay8Turn promotes dead moving player to ghost pick", () => {
    const players = mkPlayers(false).map((p, i) =>
      i === 1 ? { ...p, movePhase: "moving", moveTurns: 1, position: 9 } : { ...p, moveTurns: 2, position: 12 },
    );
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 0,
      players,
      log: [],
    };
    const next = computeAdvanceDay8Turn(gs, players, ["A moved"]);
    expect(next.currentPlayerIdx).toBe(1);
    expect(next.players[1].movePhase).toBe("ghostPickTarget");
    expect(String(next.log[0] ?? "")).toContain("👻");
  });

  it("eliminateDay8Player advances to next living player and defers ghost", () => {
    const players = [
      {
        id: "a",
        name: "A",
        alive: true,
        movePhase: "moving",
        moveTurns: 0,
        position: 2,
        slotPullsThisSeat: 0,
      },
      {
        id: "b",
        name: "B",
        alive: true,
        movePhase: "moving",
        moveTurns: 0,
        position: 4,
        slotPullsThisSeat: 0,
      },
      {
        id: "c",
        name: "C",
        alive: true,
        movePhase: "moving",
        moveTurns: 0,
        position: 1,
        slotPullsThisSeat: 0,
      },
    ];
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      players,
      log: [],
    };
    const death = eliminateDay8Player(gs, 1, "test death");
    expect(death?.gs.currentPlayerIdx).toBe(2);
    expect(death?.gs.players[1].alive).toBe(false);
    expect(death?.gs.players[1].movePhase).toBe("spectating");
    expect(death?.gs.players[1].ghostActedThisRound).toBe(false);
    expect(death?.gs.players[1].movePhase).not.toBe("ghostPickTarget");
  });

  it("eliminateDay8Player advances from dying playerIdx even if currentPlayerIdx drifted", () => {
    const players = [
      { id: "a", name: "A", alive: true, movePhase: "moving", moveTurns: 0, position: 2, slotPullsThisSeat: 0 },
      { id: "b", name: "B", alive: true, movePhase: "moving", moveTurns: 0, position: 4, slotPullsThisSeat: 0 },
      { id: "c", name: "C", alive: true, movePhase: "moving", moveTurns: 0, position: 1, slotPullsThisSeat: 0 },
    ];
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 2,
      players,
      log: [],
    };
    const death = eliminateDay8Player(gs, 1, "test death");
    expect(death?.gs.players[1].alive).toBe(false);
    expect(death?.gs.currentPlayerIdx).toBe(2);
    expect(death?.gs.players[2].id).toBe("c");
  });

  it("eliminateDay8Player solo triggers gameOver with alive false", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 0,
      players: [
        {
          id: "solo",
          name: "Solo",
          alive: true,
          movePhase: "moving",
          stats: { pon: 90 },
        },
      ],
      log: [],
    };
    const death = eliminateDay8Player(gs, 0, "solo death");
    expect(death?.gs.gamePhase).toBe("gameOver");
    expect(death?.gs.players[0].alive).toBe(false);
    expect(death?.gs.players[0].movePhase).toBe("spectating");
  });

  it("resolveDebtTrapTriggered eliminates in multiplayer day8", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      players: [
        { id: "a", name: "A", alive: true, movePhase: "moving", position: 2, slotPullsThisSeat: 0 },
        {
          id: "b",
          name: "B",
          alive: true,
          movePhase: "moving",
          position: 4,
          stats: { money: -4535 },
          slotPullsThisSeat: 0,
        },
        { id: "c", name: "C", alive: true, movePhase: "moving", position: 1, slotPullsThisSeat: 0 },
      ],
      log: [],
    };
    const result = resolveDebtTrapTriggered(gs, 1);
    expect(result?.gs.gamePhase).toBe("playing");
    expect(result?.gs.players[1].alive).toBe(false);
    expect(result?.gs.players[1].movePhase).toBe("spectating");
    expect(result?.gs.currentPlayerIdx).toBe(2);
  });

  it("resolveDebtTrapTriggered game over in solo", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 0,
      players: [
        {
          id: "solo",
          name: "Solo",
          alive: true,
          movePhase: "moving",
          position: 12,
          stats: { money: -100 },
        },
      ],
      log: [],
    };
    const result = resolveDebtTrapTriggered(gs, 0);
    expect(result?.gs.gamePhase).toBe("gameOver");
    expect(result?.gs.gameOverMsg).toContain("借金トラップ");
    expect(result?.gs.players[0].deathPosition).toBe(12);
  });

  it("snapshotDeathOnBoard records deathPosition on the path", () => {
    expect(snapshotDeathOnBoard({ position: 7, alive: true }).deathPosition).toBe(7);
    expect(getBoardTombDisplayPosition({ alive: false, deathPosition: 7 })).toBe(7);
    expect(getBoardTombDisplayPosition({ alive: false, position: 7 })).toBe(7);
    expect(getBoardDeathPosition({ position: 50 }, 50)).toBeNull();
  });

  it("skipGhostTurnAllPlayersArrived advances from ghost pick when no board targets", () => {
    const players = [
      {
        id: "a",
        name: "A",
        alive: true,
        movePhase: "waitingSlot",
        moveTurns: 12,
        position: 20,
        reservedSlotTurns: 2,
        stats: { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 },
        slotPullsThisSeat: 0,
      },
      {
        id: "b",
        name: "B",
        alive: false,
        movePhase: "ghostPickTarget",
        ghostActedThisRound: false,
        moveTurns: 0,
        position: 0,
        stats: { money: 0, pon: 0, luck: 50, skill: 50, virtue: 50 },
        slotPullsThisSeat: 0,
      },
    ];
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      players,
      log: [],
    };
    const next = skipGhostTurnAllPlayersArrived(gs);
    expect(next?.currentPlayerIdx).toBe(0);
    expect(next?.players[1].ghostActedThisRound).toBe(true);
    expect(next?.players[1].movePhase).toBe("spectating");
    expect(next?.gamePhase).toBe("playing");
  });

  it("skipGhostTurnNoPickableProxy skips when board targets exist but none selectable", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      players: [
        {
          id: "a",
          name: "A",
          alive: true,
          movePhase: "moving",
          position: 5,
          stats: { money: 100, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
        {
          id: "b",
          name: "B",
          alive: false,
          movePhase: "ghostPickTarget",
          ghostActedThisRound: false,
          stats: { money: 0, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
      ],
      log: [],
    };
    const next = skipGhostTurnNoPickableProxy(gs);
    expect(next?.currentPlayerIdx).toBe(0);
    expect(next?.players[1].movePhase).toBe("spectating");
  });

  it("buildDay8SlotSpinningGs writes spinning with new session id", () => {
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 0,
      slotPhase: "idle",
      proxySlotTargetIdx: null,
      players: [
        {
          id: "a",
          name: "A",
          alive: true,
          movePhase: "arrived",
          slotTurnsLeft: 3,
          slotPullsThisSeat: 0,
          spinCount: 0,
          stats: { money: 5000, pon: 0, luck: 50, skill: 50, virtue: 50 },
        },
      ],
      log: [],
    };
    const ctx = {
      actorIdx: 0,
      proxyTargetIdx: null,
      bet: 100,
      res: { tier: "miss", reels: ["🍒", "🍋", "🍊"], message: "ハズレ" },
      slotTurnsBefore: 3,
      visualReels: ["🍒", "🍋", "🍊"],
      machine: { key: "standard" },
      reelMachine: { key: "standard", symbols: ["🍒", "🍋", "🍊"] },
    };
    const spinning = buildDay8SlotSpinningGs(gs, ctx);
    expect(spinning?.slotPhase).toBe("spinning");
    expect(typeof spinning?.slotSpinSessionId).toBe("string");
    expect(spinning?.slotSpinSessionId.length).toBeGreaterThan(5);
  });

  it("skips roundHandoffDone alive players and hands off to dead ghost", () => {
    const players = [
      {
        id: "a",
        name: "A",
        alive: true,
        movePhase: "moving",
        moveTurns: 1,
        position: 3,
        roundHandoffDone: true,
        slotPullsThisSeat: 0,
      },
      {
        id: "b",
        name: "B",
        alive: false,
        movePhase: "spectating",
        ghostActedThisRound: false,
        moveTurns: 0,
        position: 0,
        slotPullsThisSeat: 0,
      },
      {
        id: "c",
        name: "C",
        alive: true,
        movePhase: "moving",
        moveTurns: 1,
        position: 5,
        roundHandoffDone: true,
        slotPullsThisSeat: 0,
      },
    ];
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 2,
      players,
      log: [],
    };
    const next = computeAdvanceDay8Turn(gs, players, ["C moved"]);
    expect(next.currentPlayerIdx).toBe(1);
    expect(next.players[1].movePhase).toBe("ghostPickTarget");
  });

  it("advanceDay8AfterSlotSpinShow moves turn after eliminated proxy slot", () => {
    const stats = { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 };
    const players = [
      {
        id: "a",
        name: "A",
        alive: true,
        movePhase: "moving",
        moveTurns: 1,
        position: 5,
        roundHandoffDone: true,
        stats,
        slotPullsThisSeat: 0,
      },
      {
        id: "b",
        name: "B",
        alive: false,
        movePhase: "arrived",
        slotTurnsLeft: 0,
        slotPullsThisSeat: 3,
        ghostActedThisRound: false,
        stats,
      },
      {
        id: "c",
        name: "C",
        alive: true,
        movePhase: "moving",
        moveTurns: 1,
        position: 8,
        stats,
        slotPullsThisSeat: 0,
      },
    ];
    const gs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 1,
      players,
      proxySlotTargetIdx: 0,
      log: [],
    };
    const next = advanceDay8AfterSlotSpinShow(gs);
    expect(next.currentPlayerIdx).not.toBe(1);
    expect(next.currentPlayerIdx).toBe(2);
    expect(next.players[1].ghostActedThisRound).toBe(true);
    expect(next.players[1].movePhase).toBe("spectating");
  });

  it("applyDay8ActorMoveCommit advances third player taxi on live gs", () => {
    const stats = { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 };
    const players = [
      { id: "a", name: "A", alive: true, movePhase: "moving", moveTurns: 1, position: 3, stats },
      { id: "b", name: "B", alive: true, movePhase: "moving", moveTurns: 1, position: 11, stats },
      { id: "c", name: "C", alive: true, movePhase: "moving", moveTurns: 0, position: 0, stats },
    ];
    const liveGs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 2,
      log: [],
      players,
    };
    const newPlayers = players.map((pl, i) =>
      i === 2 ? { ...pl, moveTurns: 1, position: 12, stats: { ...stats, money: 550 } } : pl,
    );
    const next = applyDay8ActorMoveCommit(liveGs, {
      actorId: "c",
      newPlayers,
      actionLogs: ["C T1: taxi"],
      gsWithDice: { lastDiceRolls: [12] },
    });
    expect(next?.currentPlayerIdx).toBe(0);
    expect(next?.players[2].position).toBe(12);
    expect(next?.log[0]).toContain("A");
    expect(next?.log[0]).toContain("T2");
  });

  it("applyDay8ActorMoveCommit skips actionLogs when logsAlreadyWritten", () => {
    const stats = { money: 1000, pon: 0, luck: 50, skill: 50, virtue: 50 };
    const players = [
      { id: "a", name: "A", alive: true, movePhase: "moving", moveTurns: 1, position: 3, stats },
      { id: "b", name: "B", alive: true, movePhase: "moving", moveTurns: 1, position: 11, stats },
      { id: "c", name: "C", alive: true, movePhase: "moving", moveTurns: 0, position: 0, stats },
    ];
    const taxiLine = "C T1: タクシー！15マス予定 / 資金-600G → 15/50マス / PON0+15→15";
    const liveGs = {
      gamePhase: "playing",
      subPhase: "day8",
      currentPlayerIdx: 2,
      log: [taxiLine, "older"],
      players,
    };
    const newPlayers = players.map((pl, i) =>
      i === 2 ? { ...pl, moveTurns: 1, position: 15, stats: { ...stats, money: 400 } } : pl,
    );
    const next = applyDay8ActorMoveCommit(liveGs, {
      actorId: "c",
      newPlayers,
      actionLogs: [taxiLine],
      logsAlreadyWritten: true,
      gsWithDice: { lastDiceRolls: [15] },
    });
    expect(next?.log.filter((line) => line === taxiLine)).toHaveLength(1);
    expect(next?.log).toContain(taxiLine);
  });
});

describe("verify death test tile map", () => {
  it("places debt trap on first 12 inner squares when verify flag is set", () => {
    if (SUGOROKU_VERIFY_DEATH_TEST_TRAP_FIRST_N <= 0) return;
    const tiles = generateSugorokuTileEffects();
    for (let pos = 1; pos <= SUGOROKU_VERIFY_DEATH_TEST_TRAP_FIRST_N; pos++) {
      expect(tiles[pos]?.kind).toBe(TILE_EFFECT_KIND.DEBT_TRAP);
    }
    expect(tiles[0]?.kind).toBe(TILE_EFFECT_KIND.NEUTRAL);
  });
});

describe("lobby ready helpers", () => {
  const rolls = { luck: 1, skill: 2, virtue: 3, pon: 4 };
  const hostId = "host";
  const slots = [
    { id: "host", character: "salaryman", initialRolls: rolls },
    { id: "guest", character: "student", initialRolls: rolls, lobbyReady: false },
  ];

  it("host is ready when configured without lobbyReady flag", () => {
    expect(isLobbyMemberReady(slots[0], hostId)).toBe(true);
  });

  it("guest needs lobbyReady", () => {
    expect(isLobbyMemberReady(slots[1], hostId)).toBe(false);
    expect(isLobbyMemberReady({ ...slots[1], lobbyReady: true }, hostId)).toBe(true);
  });

  it("allLobbyMembersReady requires every member", () => {
    expect(allLobbyMembersReady(slots, hostId)).toBe(false);
    expect(allLobbyMembersReady([slots[0], { ...slots[1], lobbyReady: true }], hostId)).toBe(true);
  });
});
