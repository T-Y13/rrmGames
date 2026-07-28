import { BAL, BOARD_GOAL, SLOT_COST, SLOT_MACHINES } from "../constants/gameBalance";
import {
  advanceDay8AfterSlotSpinShow,
  applyGoalArrivalToPlayer,
  applyGoalLandingConfirm,
  applyVirtueWave,
  beginDay8SlotSeatForPlayer,
  clamp,
  clampMoney,
  computeAdvanceDay8Turn,
  hasSugorokuBoardTargets,
  isDay8SlotBurstFinishedOnGameState,
  isGhostPickTargetPhase,
  isSugorokuBoardPlaying,
  pickGhostSlotTarget,
  prependLogs,
  resolveDay8LandingWithTiles,
  resolveDebtTrapTriggered,
  rollDie,
  skipGhostTurnAllPlayersArrived,
  skipGhostTurnNoPickableProxy,
  spinSlot,
  slotMachineForReels,
  shouldDeferDay8SlotTurnAdvanceForMajorWin,
} from "../utils/gameLogic";
import { resolveWorkDailyAction } from "./dailyActions/resolveDailyAction";
import {
  canContinueAsProxySlotTarget,
  canSelectAsProxySlotTarget,
  buildProxySlotSpinStats,
  getProxySlotAllowedBets,
} from "./slotProxyTarget";
import { isTurnAutomatable } from "./playerPresence";

const GHOST_SLOT_MACHINE_KEY = "standard";

function pickGhostProxyTargetIdx(gs) {
  const idx = gs.currentPlayerIdx;
  const players = gs.players ?? [];
  for (let i = 0; i < players.length; i++) {
    if (i === idx) continue;
    if (isSugorokuBoardPlaying(players[i]) && canSelectAsProxySlotTarget(players[i])) return i;
  }
  return null;
}

function isGhostProxyTargetValid(gs, proxyIdx) {
  if (!Number.isInteger(proxyIdx) || proxyIdx < 0) return false;
  const idx = gs.currentPlayerIdx;
  if (proxyIdx === idx) return false;
  const tgt = gs.players?.[proxyIdx];
  return !!tgt && canContinueAsProxySlotTarget(tgt);
}

/** 無効な代理標的を差し替え、またはクリアして自身の金でスロット可能にする */
export function reassignGhostProxyTarget(gs) {
  const idx = gs.currentPlayerIdx;
  const actor = gs.players?.[idx];
  if (!actor || actor.movePhase !== "arrived") return null;

  const newIdx = pickGhostProxyTargetIdx(gs);
  if (newIdx != null) {
    const tgt = gs.players[newIdx];
    const logs = [`🤖 ${actor.name}: 代理標的を ${tgt.name} に切替（前の標的が無効）`];
    return {
      ...gs,
      proxySlotTargetIdx: newIdx,
      log: prependLogs(logs, gs.log),
    };
  }

  if (typeof gs.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0) {
    const logs = [`🤖 ${actor.name}: 代理標的なし → 自身の資金でスロット`];
    return {
      ...gs,
      proxySlotTargetIdx: null,
      log: prependLogs(logs, gs.log),
    };
  }

  return null;
}

/** 代理不可・資金不足時：標的差し替え・代理解除・手番スキップ */
export function resolveGhostSlotSpinBlocked(gs) {
  const reassigned = reassignGhostProxyTarget(gs);
  if (reassigned) return { type: "reassign", gameState: reassigned };

  const idx = gs.currentPlayerIdx;
  const actor = gs.players?.[idx];
  if (!actor) return null;

  if (typeof gs.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0) {
    const cleared = {
      ...gs,
      proxySlotTargetIdx: null,
      log: prependLogs([`🤖 ${actor.name}: 代理スロット不可 → 代理解除`], gs.log),
    };
    if ((actor.stats?.money ?? 0) >= SLOT_COST) {
      return { type: "reassign", gameState: cleared };
    }
    return advanceGhostSlotTurnSkip(cleared);
  }

  if ((actor.stats?.money ?? 0) >= SLOT_COST) return null;
  return advanceGhostSlotTurnSkip(gs);
}

function advanceGhostSlotTurnSkip(gs) {
  const idx = gs.currentPlayerIdx;
  const p = gs.players?.[idx];
  if (!p) return null;
  const logs = [`🤖 ${p.name}: スロット不可（資金不足）→手番スキップ`];
  const newPlayers = gs.players.map((pl, i) =>
    i === idx
      ? { ...pl, movePhase: "spectating", slotTurnsLeft: 0, slotPullsThisSeat: 0, ghostActedThisRound: true }
      : pl,
  );
  return {
    type: "advance",
    gameState: computeAdvanceDay8Turn({ ...gs, proxySlotTargetIdx: null, players: newPlayers }, newPlayers, logs),
  };
}

function tryGhostSlotBurstAdvance(gs) {
  const idx = gs.currentPlayerIdx;
  const p = gs.players?.[idx];
  if (!p || p.movePhase !== "arrived") return null;
  const phase = gs.slotPhase ?? "idle";
  if (phase === "spinning") return null;
  if (!isDay8SlotBurstFinishedOnGameState(gs)) return null;
  if (shouldDeferDay8SlotTurnAdvanceForMajorWin(gs)) return null;
  return advanceDay8AfterSlotSpinShow(gs);
}

function prepareGhostSlotSpinStep(gs) {
  const idx = gs.currentPlayerIdx;
  const p = gs.players[idx];
  if (!p || p.movePhase !== "arrived" || p.slotTurnsLeft <= 0) return null;
  if ((gs.slotPhase ?? "idle") !== "idle") return null;

  const proxyIdx =
    typeof gs.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0 ? gs.proxySlotTargetIdx : null;
  if (proxyIdx != null && !isGhostProxyTargetValid(gs, proxyIdx)) {
    const reassigned = reassignGhostProxyTarget(gs);
    if (reassigned) return { type: "reassign", gameState: reassigned };
    return null;
  }

  const ctx = buildGhostSlotSpinCtx(gs);
  if (!ctx) {
    return resolveGhostSlotSpinBlocked(gs);
  }
  return { type: "slotSpin", ctx };
}

function runGhostDailyWork(gs) {
  return resolveWorkDailyAction(gs);
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
    const arrived = landed >= BOARD_GOAL;
    const timedOut = !arrived && newTurns >= BAL.dice.maxTurns;
    let newPlayers = rr.players.map((pl, i) => {
      if (i !== idx) return pl;
      const base = { ...pl, moveTurns: newTurns, pendingTaxiSteps: 0, lastMoveEvent: logs[0] };
      if (arrived) {
        return applyGoalArrivalToPlayer(base, false).player;
      }
      if (timedOut) {
        return { ...base, movePhase: "missed", slotTurnsLeft: 0 };
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
    const death = resolveDebtTrapTriggered({ ...rr.gsWithTiles, players: rr.players }, idx);
    return death?.gs ?? null;
  }

  const arrived = landed >= BOARD_GOAL;
  const timedOut = !arrived && newTurns >= BAL.dice.maxTurns;

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
        return applyGoalArrivalToPlayer(base, false).player;
      }
      if (timedOut) {
        return { ...base, movePhase: "missed", slotTurnsLeft: 0 };
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
  const began = beginDay8SlotSeatForPlayer(p);
  if (!began) return null;
  const logs = [`🤖 ${p.name}: スロット自動開始`];
  const newPlayers = gs.players.map((pl, i) => (i !== idx ? pl : began));
  return { ...gs, players: newPlayers, log: prependLogs(logs, gs.log) };
}

function buildGhostSlotSpinCtx(gs) {
  const idx = gs.currentPlayerIdx;
  const p = gs.players[idx];
  if (!p || p.movePhase !== "arrived" || p.slotTurnsLeft <= 0) return null;
  if ((gs.slotPhase ?? "idle") !== "idle") return null;

  const proxyIdx =
    typeof gs.proxySlotTargetIdx === "number" && gs.proxySlotTargetIdx >= 0 ? gs.proxySlotTargetIdx : null;
  const statsForSpin =
    proxyIdx != null && gs.players[proxyIdx]
      ? buildProxySlotSpinStats(p.stats, gs.players[proxyIdx].stats)
      : p.stats;

  let bet = SLOT_COST;
  if (proxyIdx != null) {
    const allowed = getProxySlotAllowedBets(statsForSpin.money ?? 0);
    if (allowed.length === 0) return null;
    bet = allowed.includes(SLOT_COST) ? SLOT_COST : allowed[allowed.length - 1];
  }

  const heat = p.slotHeat ?? 0;
  const pityBefore = p.slotPityCounter ?? 0;
  const res = spinSlot(statsForSpin, bet, GHOST_SLOT_MACHINE_KEY, heat, p.characterType, {
    pityCounter: pityBefore,
    potJackpotEnabled: gs.players.length > 1,
  });
  const machine = SLOT_MACHINES[GHOST_SLOT_MACHINE_KEY] ?? SLOT_MACHINES.standard;
  const reelMachine = slotMachineForReels(machine, gs.players.length > 1);
  const newLeft = p.slotTurnsLeft - 1;
  const newPullsSeat = (p.slotPullsThisSeat ?? 0) + 1;
  return {
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
    reelMachine,
    slotTurnsBefore: p.slotTurnsLeft,
  };
}

export function finishGhostSlotBurst(resultGS) {
  if (!resultGS) return null;
  const idx = resultGS.currentPlayerIdx;
  const burst = Math.max(1, BAL.dice.slotsPerSugorokuTurn ?? 3);
  const actor = resultGS.players[idx];
  const canContinueBurst =
    actor?.movePhase === "arrived" &&
    (actor.slotTurnsLeft ?? 0) > 0 &&
    (actor.slotPullsThisSeat ?? 0) < burst;
  if (canContinueBurst) return resultGS;
  return advanceDay8AfterSlotSpinShow(resultGS);
}

/**
 * ネットワークゴースト／自主退室／脱落切断プレイヤーの手番を1ステップ進める。
 * @returns {object|null} 次の gameState
 */
export function runGhostAutomationStep(
  gs,
  { day8RemainingTurns = BAL.dice.maxTurns, roomPlayers = null, now = Date.now() } = {},
) {
  if (!gs?.players?.length) return null;
  const idx = gs.currentPlayerIdx;
  const p = gs.players[idx];
  if (!p || !isTurnAutomatable(p, roomPlayers, now)) return null;

  if (isGhostPickTargetPhase(p)) {
    const targetIdx = pickGhostProxyTargetIdx(gs);
    if (targetIdx == null) {
      if (!hasSugorokuBoardTargets(gs.players)) {
        return skipGhostTurnAllPlayersArrived(gs);
      }
      return skipGhostTurnNoPickableProxy(gs);
    }
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
      const advance = tryGhostSlotBurstAdvance(gs);
      if (advance) return advance;
      const prep = prepareGhostSlotSpinStep(gs);
      if (!prep) return null;
      if (prep.type === "slotSpin" || prep.type === "reassign" || prep.type === "advance") return prep;
      return null;
    }
    if (p.movePhase === "missed") {
      return computeAdvanceDay8Turn(gs, gs.players, [`🤖 ${p.name} タイムアウト済み（自動スキップ）`]);
    }
  }

  return null;
}
