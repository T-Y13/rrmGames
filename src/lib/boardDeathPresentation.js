/** 盤上：キャラフェードアウト時間（ms）— tomb 表示の直前 */
export const BOARD_DEATH_FADE_MS = 680;

export const HELP_DEATH_DIALOG_MESSAGE =
  "車に轢られそうな子供を助け、あなたは……";

export function delayMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
