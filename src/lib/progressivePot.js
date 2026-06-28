/** マルチスロット：プログレッシブポット（各スピンのベットの一定割合を蓄積、JACKPOT で全額配当） */

import { PROGRESSIVE_POT_RATE } from "../constants/gameBalance";

/**
 * @param {number} currentPot
 * @param {number} betAmount
 * @param {boolean} isJackpot
 * @returns {{ totalPot: number, potPayout: number, contribution: number }}
 */
export function computeProgressivePotDelta(currentPot, betAmount, isJackpot) {
  const bet = Math.max(0, Math.floor(Number(betAmount) || 0));
  const contribution = Math.round(bet * PROGRESSIVE_POT_RATE);
  const potAfterContrib = Math.max(0, Math.floor(Number(currentPot) || 0)) + contribution;
  if (isJackpot) {
    return { totalPot: 0, potPayout: potAfterContrib, contribution };
  }
  return { totalPot: potAfterContrib, potPayout: 0, contribution };
}

export function readRoomTotalPot(roomData) {
  const v = roomData?.totalPot;
  return Number.isFinite(Number(v)) && Number(v) >= 0 ? Math.floor(Number(v)) : 0;
}
