/** フルタイトル＋略称を括弧で並べた表記（起動画面・ロビーでの強調表示用） */
export const GAME_TITLE_WITH_ACRONYM = "POTENTIAL OVER NEXT SPIN (PONS)";

/**
 * プレリリース設定: true のときロビーの「みんなで遊ぶ」一式をロック（UIは残して Coming Soon のみ）。
 * オンライン開放時は false に変更。
 */
export const PRERELEASE_SOLO_ONLY = false;

/**
 * ロビー・エントリー「News」欄の短文。
 */
export const SOLO_PRERELEASE_NOTICE =
  "オンラインでルーム作成・入室・クイックマッチから、最大4人まで一緒に遊べます。「一人で遊ぶ」でソロ練習も可能です。";

/** ブランド表示用（ドキュメント title は短縮名、画面はフルタイトル併用可） */
export const GAME_TITLE_FULL = "POTENTIAL OVER NEXT SPIN";
export const GAME_TITLE_SHORT = "PONS";

/**
 * ロゴは常に小文字 `.png` で参照する（case-sensitive なホスティング対策）。
 * 実ファイルも `public/images/title_logo.png` に揃えること。
 */
export const TITLE_LOGO_PATH = "/images/title_logo.png";

/** 配信カットイン（`public/images/` に PNG を置く・拡張子は小文字推奨） */
export const STREAM_CUTIN_CHAT = "/images/casual_chat_stream.png";
export const STREAM_CUTIN_GAME = "/images/game_streaming.png";
/** 仕事カットイン */
export const WORK_CUTIN_IMAGE = "/images/work.png";
