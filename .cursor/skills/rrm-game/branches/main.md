# main（本番 baseline）

- **Git tip（記録時点）:** `4068219`（`ver1.0.3` ブランチも同一 tip）
- **リモート:** `origin/main`
- **Hosting 検証:** `npm run deploy` → https://rrmgame-7df52.web.app（**通常はこちら**）
- **Hosting 本番:** `npm run deploy:prod` → https://potential-over-next-spin.web.app（明示依頼時のみ）

## このブランチに含まれるもの（要約）

- ソロ＋マルチプレイヤー PONS 本体
- 1〜7日目デイリー / 8日目すごろく＋スロット / 決戦前演出
- マルチ: 再接続、ゴースト AI、招待、キック、サイドバー UX
- 8日目マルチ: スロット canvas 同期、POT JP、代理スロット
- デイリーカットイン観戦同期（commit `46ef006` 以降の main 系）
- Firestore rules テスト（emulator）

## このブランチに**含まれない**もの（ver1.0.3 で開発中）

→ [ver1.0.3.md](ver1.0.3.md) 参照

- 8日目消費アイテム（3枚固定配布・インライン UI）
- ログ表示順・スロットログ文言の整理
- SP ヘッダー簡略化 / 1〜7日目キャラ右寄せ

## 回収・既知（main 時点）

- 8日目アイテム未実装
- SP は PC レイアウトの縮小版のみ（専用シェルなし）
- `Day8ItemSelectGate` 等の旧経路は main には無い

## 次バージョンへの引き継ぎ

`ver1.0.3` を merge する前に:

1. 未 commit 分を整理して commit
2. `firestore.rules`（stale cutin clear 等）を deploy
3. `npm run test:run` + `npm run test:rules:emulator`
4. 検証 `npm run deploy` で確認 → 本番は明示依頼時 `deploy:prod`
