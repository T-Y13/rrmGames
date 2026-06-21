import { BAL, BOARD_GOAL, SLOT_COST, SLOT_MACHINES, CHARACTERS } from "../constants/gameBalance";
import {
  advanceDay8AfterSlotSpinShow,
  applyDay8SlotSpinToFreshGameState,
  applyGoalLandingConfirm,
  applyRimiruDailyEnd,
  applyVirtueWave,
  clamp,
  clampMoney,
  computeAdvanceDaily,
  computeAdvanceDay8Turn,
  isGhostPickTargetPhase,
  isSugorokuBoardPlaying,
  livingCostForPlayer,
  pickGhostSlotTarget,
  prependLogs,
  resolveDay8LandingWithTiles,
  rollDie,
  spinSlot,
  virtueIncomeMult,
  applyVirtueIncomeBoost,
} from "../utils/gameLogic";
import { isNetworkAutomated } from "./playerPresence";

const GHOST_SLOT_MACHINE_KEY = "standard";

function pickGhostProxyTargetIdx(gs) {
  const idx = gs.currentPlayerIdx;
  const players = gs.players ?? [];
  for (let i = 0; i < players.length; i++) {
    if (i === idx) continue;
    if (isSugorokuBoardPlaying(players[i])) return i;
  }
  return null;
}

function runGhostDailyWork(gs) {
  const idx = gs.currentPlayerIdx;
  const p = gs.players[idx];
  if (!p || gs.subPhase !== "daily") return null;

  let s = { ...p.stats };
  const logs = [];
  const virtueBefore = s.virtue;
  const char = CHARACTERS[p.characterType] ?? CHARACTERS.salaryman;
  let newAmulets = p.amulets ?? 0;

  if (newAmulets > 0) {
    const luckBonus = newAmulets * 2;
    s.luck = clamp(s.luck + luckBonus);
    logs.push(`🧿 お守り効果（${newAmulets}個）: 運+${luckBonus}→${s.luck}`);
  }

  const workBonus = char.workRewardBonus ?? 0;
  const wm = char.workRewardMultiplier ?? 1;
  const workBase = Math.floor((BAL.work.reward + workBonus) * wm);
  const workTotal = applyVirtueIncomeBoost(workBase, s.virtue);
  s.money = clampMoney(s.money + workTotal);
  s.virtue = clamp(s.virtue + BAL.work.virtueGain);
  logs.push(
    `🤖 ${p.name} ${gs.currentDay}日目【仕事・自動】資金+${workTotal}G / 善行+${BAL.work.virtueGain}→${s.virtue}`,
  );

  const lc = livingCostForPlayer(p);
  s.money = clampMoney(s.money - lc);
  logs.push(`  生活費 -${lc}G → 資金 ${s.money}G`);

  const ponMultiplier = char.ponMultiplier ?? 1;
  const ponGain = Math.ceil(BAL.pon.dailyGain * ponMultiplier);
  s.pon = clamp(s.pon + ponGain);
  logs.push(`  PON: +${ponGain} → ${s.pon}`);

  let newPlayers = gs.players.map((pl, i) =>
    i === idx ? { ...pl, stats: s, amulets: newAmulets, streamMultiplier: p.streamMultiplier ?? char.streamMultiplier } : pl,
  );
  newPlayers = applyVirtueWave(p, virtueBefore, s.virtue, newPlayers, logs);
  newPlayers = newPlayers.map((pl, i) => (i !== idx ? pl : applyRimiruDailyEnd(pl, logs)));

  return computeAdvanceDaily({ ...gs, recentPonEvent: null }, newPlayers, logs);
}

function runGhostDay8Dice(gs, day8RemainingTurns) {
  const idx = gs.currentPlayerIdx;
  const p = gs.players[idx];
  if (!p || gs.subPhase !== "day8" || p.movePhase !== "moving") return null;

  const pendingTraffic = p.pendingTaxiSteps ?? 0;
  if (pendingTraffic > 0) {
    const sWait = { ...p.stats };
    const landed = Math.min(BOARD_GOAL, p.position + pendingTraffic);
    const roundsUsedNow = Math.max(0, BAL.dice.maxTurns - day8RemainingTurns);
    const newTurns = roundsUsedNow + 1;
    const logs = [`🤖 ${p.name} 渋滞待機（自動）→ ${landed}マス`];
    const rr = resolveDay8LandingWithTiles(gs, idx, landed, sWait, logs, {
      ponSplashDamage: false,
      skipTileEffects: true,
    });
    if (rr.gameOverByDebt?.triggered) {
      return {
        ...gs,
        gamePhase: "gameOver",
        gameOverMsg: rr.gameOverByDebt.message,
        log: prependLogs([`💀 GAME OVER: ${rr.gameOverByDebt.message}`], gs.log),
      };
    }
    const arrived = landed >= BOARD_GOAL;
    const timedOut = !arrived && newTurns >= BAL.dice.maxTurns;
    const slotReserved = arrived ? Math.max(0, BAL.dice.maxTurns - newTurns) : 0;
    let newPlayers = rr.players.map((pl, i) => {
      if (i !== idx) return pl;
      const base = { ...pl, moveTurns: newTurns, pendingTaxiSteps: 0, lastMoveEvent: logs[0] };
      if (arrived) {
        return {
          ...base,
          movePhase: "goalLanding",
          reservedSlotTurns: slotReserved,
          slotTurnsLeft: 0,
          slotPullsGranted: 0,
          slotPullsThisSeat: 0,
        };
      }
      if (timedOut) {
        return { ...base, movePhase: "missed", slotTurnsLeft: 0, reservedSlotTurns: 0 };
      }
      return { ...base, movePhase: "moving" };
    });
    return arrived
      ? { ...rr.gsWithTiles, players: newPlayers, log: prependLogs(logs, rr.gsWithTiles.log) }
      : computeAdvanceDay8Turn(rr.gsWithTiles, newPlayers, logs);
  }

  const d1 = rollDie(p.stats);
  let step = d1.value;
  let s = { ...p.stats };
  const logs = [`🤖 ${p.name} 自動ダイス: ${d1.rolls.join(", ")} (${step}マス)`];
  const virtueBefore = s.virtue;

  if (s.pon >= BAL.pon.fireThreshold && Math.random() < s.pon / 100) {
    step = Math.ceil(step / 2);
    s.pon = Math.floor(clamp(s.pon + step) / 2);
  } else {
    s.pon = clamp(s.pon + step);
  }

  const landed = Math.min(BOARD_GOAL, p.position + step);
  const roundsUsedNow = Math.max(0, BAL.dice.maxTurns - day8RemainingTurns);
  const newTurns = roundsUsedNow + 1;
  const rr = resolveDay8LandingWithTiles(gs, idx, landed, s, logs);
  if (rr.gameOverByDebt?.triggered) {
    return {
      ...gs,
      gamePhase: "gameOver",
      gameOverMsg: rr.gameOverByDebt.message,
      log: prependLogs([`💀 GAME OVER: ${rr.gameOverByDebt.message}`], gs.log),
    };
  }

  const arrived = landed >= BOARD_GOAL;
  const timedOut = !arrived && newTurns >= BAL.dice.maxTurns;
  const slotReserved = arrived ? Math.max(0, BAL.dice.maxTurns - newTurns) : 0;

  let newPlayers = applyVirtueWave(p, virtueBefore, rr.players[idx].stats.virtue, rr.players, logs).map(
    (pl, i) => {
      if (i !== idx) return pl;
      const base = {
        ...pl,
        moveTurns: newTurns,
        lastMoveEvent: logs[0],
        pendingTaxiSteps: 0,
      };
      if (arrived) {
        return {
          ...base,
          movePhase: "goalLanding",
          reservedSlotTurns: slotReserved,
          slotTurnsLeft: 0,
          slotPullsGranted: 0,
          slotPullsThisSeat: 0,
        };
      }
      if (timedOut) {
        return { ...base, movePhase: "missed", slotTurnsLeft: 0, reservedSlotTurns: 0 };
      }
      return { ...base, movePhase: "moving" };
    },
  );

  return arrived
    ? { ...rr.gsWithTiles, players: newPlayers, log: prependLogs(logs, rr.gsWithTiles.log) }
    : computeAdvanceDay8Turn(rr.gsWithTiles, newPlayers, logs);
}

function runGhostBeginSlot(gs) {
  const idx = gs.currentPlayerIdx;
  const p = gs.players[idx];
  if (!p || p.movePhase !== "waitingSlot") return null;
  const r = p.reservedSlotTurns ?? 0;
  if (r <= 0) return applyGoalLandingConfirm(gs, p.id);
  const pulls = Math.max(0, r * BAL.dice.slotsPerSugorokuTurn);
  const logs = [`🤖 ${p.name}: スロット自動開始（${r}ターンブン・計${pulls}回）`];
  const newPlayers = gs.players.map((pl, i) =>
    i !== idx
      ? pl
      : {
          ...pl,
          movePhase: "arrived",
          slotTurnsLeft: pulls,
          reservedSlotTurns: 0,
          slotPullsGranted: pulls,
          slotPullsThisSeat: 0,
        },
  );
  return { ...gs, players: newPlayers, log: prependLogs(logs, gs.log) };
}

function runGhostSlotSpin(gs) {
  const idx = gs.currentPlayerIdx;
  const p = gs.players[idx];
  if (!p || p.movePhase !== "arrived" || p.slotTurnsLeft <= 0) return null;
  if ((gs.slotPhase ?? "idle") !== "idle") return null;

  const bet = SLOT_COST;
  const proxyIdx =
    typeof gs.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0 ? gs.proxySlotTargetIdx : null;
  const statsForSpin =
    proxyIdx != null && gs.players[proxyIdx] ? gs.players[proxyIdx].stats : p.stats;
  const heat = p.slotHeat ?? 0;
  const pityBefore = p.slotPityCounter ?? 0;
  const res = spinSlot(statsForSpin, bet, GHOST_SLOT_MACHINE_KEY, heat, p.characterType, {
    pityCounter: pityBefore,
  });
  const machine = SLOT_MACHINES[GHOST_SLOT_MACHINE_KEY] ?? SLOT_MACHINES.standard;
  const newLeft = p.slotTurnsLeft - 1;
  const newPullsSeat = (p.slotPullsThisSeat ?? 0) + 1;
  const ctx = {
    actorIdx: idx,
    proxyTargetIdx: proxyIdx,
    bet,
    res,
    newLeft,
    newPullsSeat,
    newSpins: p.spinCount + 1,
    newHeat: heat + 1,
    pityAfter: res.pityCounterAfter,
    visualReels: res.reels,
    emotionLine: null,
    machine,
    slotTurnsBefore: p.slotTurnsLeft,
  };

  let resultGS = applyDay8SlotSpinToFreshGameState(gs, ctx);
  if (!resultGS) return null;

  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const actor = resultGS.players[idx];
  const canContinueBurst =
    actor?.movePhase === "arrived" && (actor.slotTurnsLeft ?? 0) > 0 && (actor.slotPullsThisSeat ?? 0) < burst;
  if (canContinueBurst) return resultGS;
  return advanceDay8AfterSlotSpinShow(resultGS);
}

/**
 * ネットワークゴースト／自主退室プレイヤーの手番を1ステップ進める。
 * @returns {object|null} 次の gameState
 */
export function runGhostAutomationStep(gs, { day8RemainingTurns = BAL.dice.maxTurns } = {}) {
  if (!gs?.players?.length) return null;
  const idx = gs.currentPlayerIdx;
  const p = gs.players[idx];
  if (!p || !isNetworkAutomated(p)) return null;

  if (isGhostPickTargetPhase(p)) {
    const targetIdx = pickGhostProxyTargetIdx(gs);
    if (targetIdx == null) return null;
    return pickGhostSlotTarget(gs, targetIdx);
  }

  if (p.movePhase === "goalLanding") {
    return applyGoalLandingConfirm(gs, p.id);
  }

  if (p.movePhase === "waitingSlot") {
    return runGhostBeginSlot(gs);
  }

  if (gs.subPhase === "daily" && gs.gamePhase === "playing") {
    return runGhostDailyWork(gs);
  }

  if (gs.subPhase === "day8") {
    if (p.movePhase === "moving") {
      return runGhostDay8Dice(gs, day8RemainingTurns);
    }
    if (p.movePhase === "arrived") {
      return runGhostSlotSpin(gs);
    }
    if (p.movePhase === "missed") {
      return computeAdvanceDay8Turn(gs, gs.players, [`🤖 ${p.name} タイムアウト済み（自動スキップ）`]);
    }
  }

  return null;
}
