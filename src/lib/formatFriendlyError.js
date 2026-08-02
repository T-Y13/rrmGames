/**
 * Firebase / ネットワーク起因の例外を、画面表示向けの短文に整える。
 */
export function formatFriendlyError(error, fallbackMessage) {
  const fallback =
    fallbackMessage ??
    "エラーが発生しました。しばらくしてから再度お試しいただくか、画面を再読み込みしてください。";
  if (error == null) return fallback;

  const code = error.code;
  if (code === "permission-denied") {
    return "権限または接続の問題で処理できませんでした。広告ブロッカー等の拡張機能で Firebase がブロックされていないか、ログイン状態とネットワークをご確認ください。";
  }
  if (code === "failed-precondition") {
    return "他の操作と同期がぶつかりました。そのまま待つか、もう一度お試しください。";
  }
  if (code === "unavailable" || code === "deadline-exceeded") {
    return "サーバーに接続できませんでした。しばらくしてから再度お試しください。";
  }

  const msg = error.message;
  if (typeof msg === "string") {
    const t = msg.trim();
    if (t.length > 0 && t.length <= 280) return t;
  }

  return fallback;
}
