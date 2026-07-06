import { doc, runTransaction } from "firebase/firestore";
import { buildMarkNetworkGhostPatch } from "./playerPresence";

/**
 * ネットワークゴーストフラグを Firestore トランザクションでマージ（サイレント失敗を避ける）。
 * @returns {Promise<boolean>}
 */
export async function commitMarkNetworkGhostPatch(db, roomId, roomPlayers, now = Date.now()) {
  if (!db || !roomId) return false;
  const ref = doc(db, "rooms", roomId);
  try {
    return await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(ref);
      if (!snap.exists()) return false;
      const live = snap.data();
      const patch = buildMarkNetworkGhostPatch(live.gameState, roomPlayers, now);
      if (!patch) return false;
      transaction.update(ref, patch);
      return true;
    });
  } catch {
    return false;
  }
}
