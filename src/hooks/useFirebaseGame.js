import { useCallback, useEffect, useState } from "react";
import { collection, doc, setDoc, updateDoc, onSnapshot, getDoc, serverTimestamp } from "firebase/firestore";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import { formatFriendlyError } from "../lib/formatFriendlyError";

/**
 * 匿名認証・ルーム購読・Firestore 更新をまとめる。
 * @param {(msg: string) => void} reportError - UI へのエラー表示（例: setUiError）
 */
export function useFirebaseGame(reportError) {
  const report = useCallback(
    (msgOrErr) => {
      if (typeof reportError !== "function" || msgOrErr == null) return;
      const msg =
        typeof msgOrErr === "string"
          ? msgOrErr
          : formatFriendlyError(msgOrErr, "接続またはデータの読み込みで問題が発生しました。");
      reportError(msg);
    },
    [reportError],
  );

  const [myId, setMyId] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [roomPlayers, setRoomPlayers] = useState({});

  useEffect(() => {
    signInAnonymously(auth).catch((e) => report(e));
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMyId(user.uid);
        setAuthReady(true);
      }
    });
    return unsub;
  }, [report]);

  useEffect(() => {
    if (!roomId) {
      setRoomData(null);
      setRoomPlayers({});
      return undefined;
    }
    const unsub = onSnapshot(
      doc(db, "rooms", roomId),
      { includeMetadataChanges: false },
      (snap) => {
        if (!snap.exists()) {
          report("ルームが存在しません");
          setRoomData(null);
          return;
        }
        setRoomData(snap.data());
      },
      (err) => report(err),
    );
    return unsub;
  }, [roomId, report]);

  useEffect(() => {
    if (!roomId) {
      setRoomPlayers({});
      return undefined;
    }
    const unsub = onSnapshot(
      collection(db, "rooms", roomId, "players"),
      (snap) => {
        const next = {};
        snap.forEach((d) => {
          next[d.id] = d.data();
        });
        setRoomPlayers(next);
      },
      (err) => report(err),
    );
    return unsub;
  }, [roomId, report]);

  const updateRoom = useCallback(
    async (patch) => {
      if (!roomId) throw new Error("roomId missing");
      await updateDoc(doc(db, "rooms", roomId), patch);
    },
    [roomId],
  );

  const updateRoomById = useCallback(async (rid, patch) => {
    await updateDoc(doc(db, "rooms", rid), patch);
  }, []);

  const createRoom = useCallback(async (rid, data) => {
    await setDoc(doc(db, "rooms", rid), data);
  }, []);

  const fetchRoom = useCallback(async (rid) => getDoc(doc(db, "rooms", rid)), []);

  const updateCurrentAction = useCallback(
    async (type, extra = {}) => {
      if (!roomId) throw new Error("roomId missing");
      if (!myId) throw new Error("myId missing");
      const t = typeof type === "string" ? type : "";
      await setDoc(
        doc(db, "rooms", roomId, "players", myId),
        {
          uid: myId,
          currentAction: {
            type: t,
            timestamp: serverTimestamp(),
          },
          updatedAt: serverTimestamp(),
          ...extra,
        },
        { merge: true },
      );
    },
    [roomId, myId],
  );

  return {
    myId,
    authReady,
    roomId,
    setRoomId,
    roomData,
    roomPlayers,
    updateRoom,
    updateRoomById,
    createRoom,
    fetchRoom,
    updateCurrentAction,
  };
}
