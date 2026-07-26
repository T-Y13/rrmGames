# ver1.0.3（作業中）

- **Git tip:** `4068219`（**`main` と同一** — ブランチ上の追加 commit はまだ無い）
- **ブランチ:** `ver1.0.3`（ローカル）
- **記録更新:** 2026-07-26

## 2026-07-26: 8日目15ラウンド・スロット席・資産グラフ

**設計正本:** [references/day8-guide.md](../references/day8-guide.md) の「8日目ラウンドとスロット（設計の正本・2026-07）」

| 要点 | 内容 |
|------|------|
| スロット | **手番ごと3スピン付与**（bank なし）。15Tゴールはスロットなし |
| グラフ | `daily`/`day8` のみ（`day8Timeline` 不使用）、個人所持金、X軸等間隔 |

**変更ファイル（ローカル）:** `gameLogic.js`, `App.jsx`, `ghostPlayerAutomation.js`, `assetHistoryFromGameState.js`, `AssetHistoryChart.jsx`, 各 test

**テスト:** `npm run test:run` → 182 passed（2026-07-26 手番ごとスピン付与後）

**ルール正本:** [references/game-rules.md](../references/game-rules.md)

## ベースラインに含まれる commit（main = ver1.0.3 共通）

| commit | 内容 |
|--------|------|
| `46ef006` | マルチデイリーカットイン観戦同期、8日目移動観戦のスタール修正 |
| `11cee26` | ゴーストスロット同期、観戦オーバーレイ、自動操作の排他 |
| `4068219` | recharts 用 react-is 依存追加 |

## ローカル未 commit（2026-07-24 時点）

### 8日目アイテム（Phase 1）

| 項目 | 内容 |
|------|------|
| 配布 | 8日目開始時 3 枚固定: 🏃 dash +3マス / ✨ lucky +50% 次当たり / 🪙 gold +20% バースト全スピン |
| UI | `Day8ItemBar.jsx` — 進む・スロットボタン**下**にインライン表示（旧 `Day8ItemSelectGate` は削除） |
| 状態 | `day8Inventory`, `day8SeatEffects[]`, `day8ItemUsedThisSeat` |
| 効果 | `day8ItemEffects.js` — 移動 `applyDay8MoveStepBonus`, スロット `applyDay8SlotPayoutBonus` |
| 演出 | 移動 +3 は `buildDay8CardMoveEffectMeta` → `movementFx.preMoveEffect`（カード効果吹き出し） |
| マルチ | `commitDay8ItemGate` + `day8ItemOptimisticGs` |

**新規ファイル（主）:** `day8Items.js`, `day8ItemEffects.js`, `Day8ItemBar.jsx`, `day8Items.test.js`

### ログ

| 変更 | 詳細 |
|------|------|
| サイドバー表示順 | `parseLogIntoDailyTiles` — 日タイル内も **新しい順**（8日目バナーはタイル下部） |
| スロット開始 | `（Nターンブン・計M回）` 削除 → `配信者97: スロット開始` のみ |
| waitingSlot 手番行 | `ゴール到着済み・スロット…` ログ行は**出さない** |
| スピン1行 | `→ 🔔 当たり！ 収支+800G`（**資金は行末に付けない**） |
| バースト終了 | 3スピン後（または残り0で中断時）に `  資金4953G` を1行だけ |

**関数:** `formatDay8SlotSpinLogLine`, `formatDay8SlotBurstMoneyLogLine`（`gameLogic.js`）

### デイリーカットイン回収

- `dailyCutinSync.js` — stale cutin 復旧
- `useDailyCutinSpectatorSync.js`, `WorkCutin.jsx` — 解除 UI
- `firestore.rules` — `dailyCutinStaleClearValid()`（**rules deploy 必須**）

### スマホ UI（768px 未満 = Tailwind `md`）

| 対応済 | ファイル |
|--------|----------|
| ヘッダー簡略（HUD・ルームID・コピー・退室・プレイヤー名非表示） | `App.jsx` |
| 1〜7日目キャラ右寄せ・ボタンと非重なり | `DailyActionPhase.jsx` |
| **8日目すごろく SP レイアウト定数**（駒縮小・名前追従・横ダイス・POT inline） | `constants/sugorokuMobileLayout.js` |
| すごろく盤面 SP 実装 | `BoardViewport.jsx`, `PieceNearbyStack.jsx`, `BoardCharacterSideDice.jsx`, `BoardGamePhase.jsx` |
| 盤面フレーム高さ SP 低め | `gameAnimationsCss.js` → `BOARD_VIEWPORT_FRAME_SIZE_CLASS` |
| POT：すごろく中は fixed 非表示・ヘッダー inline | `App.jsx`, `BoardGamePhase.jsx` |

**SP すごろく調整時:** 数値・Tailwind クラスは `sugorokuMobileLayout.js` を正本に。コンポーネントに直書きしない。

### 変更ファイル一覧（tracked 改修）

`App.jsx`, `gameLogic.js`, `BoardGamePhase.jsx`, `SlotMachine.jsx`, `sidebarLogDailyTiles.js`, `ghostPlayerAutomation.js`, `DailyActionPhase.jsx`, `dailyCutinSync*`, `WorkCutin.jsx`, `firestore.rules`, 各種 test

## アーキテクチャメモ（8日目アイテム）

```
constants/day8Items.js     定義・applyScope
lib/day8Items.js           使用可否・消費・prependItemLogs
lib/day8ItemEffects.js     純粋効果（gameLogic 循環 import 回避）
App.jsx                    handleUseDay8Item, commitDay8ItemGate
gameLogic.js               スロット結果 applyDay8SlotPayoutBonus フック
BoardGamePhase / SlotMachine  Day8ItemBar 配置
```

## テスト

```bash
npm run test:run              # 最終確認時 ~171 passed
npm run test:rules:emulator     # rules 変更後
```

## 未デプロイ

- [ ] Hosting 検証（`npm run deploy`）— ローカル未 commit のため未反映
- [ ] Hosting 本番（`deploy:prod`）— **明示依頼まで出さない**
- [ ] Firestore rules — stale cutin 用ルール

## 既知・回収予定

| 優先 | 内容 |
|------|------|
| 高 | タクシー行ログ**二重**（同一ターン2行）— 原因調査未 |
| 高 | `🎒 …アイテムを使わずに手番開始` — 旧 gate 残骸 or 古い Firestore 状態の可能性 |
| 中 | SP: スロット HUD 折りたたみ |
| 中 | SP: サイドバー → ボトムタブ / ログシート |
| 中 | hover ツールチップ（カード・コンビニ・タクシー）→ タップ説明 |
| 低 | `.agents/` を `.gitignore` に |

## ロードマップ（合意方向）

1. **Phase 1（今）** — 自己バフ 3 カード + インライン UI → **実装済・commit 待ち**
2. **Phase 2** — 1〜7日目成績に応じた配布、SE/toast、サイドバー在庫
3. **Phase 3** — 他プレイヤーデバフ（mudTrap 等）、ゴースト自動使用、rules テスト拡充
4. **目押し** — Phase 1 安定後
5. **リリース** — commit → rules deploy → 検証 `deploy` で確認 → 本番は明示依頼時 `deploy:prod`

## 次にやること（提案）

1. 未 commit を機能単位で commit（8日目アイテム / ログ / cutin+rules / SP UI）
2. `firestore.rules` deploy
3. 検証環境 `npm run deploy` で実機確認（本番は依頼があるまで）
3. 実機 SP でヘッダー・行動選択・8日目ログを確認
4. タクシーログ二重・旧 gate ログの再現調査

## 前セッションからの引き継ぎチェックリスト

新しいウィンドウで作業再開するとき:

- [ ] `git checkout ver1.0.3 && git status`
- [ ] このファイルを読む
- [ ] `npm run dev` で local 確認
- [ ] マルチテスト時は rules emulator 済みか確認
