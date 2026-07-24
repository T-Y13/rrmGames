# 8日目ガイド（すごろく + スロット + アイテム）

8日目は **盤面移動（すごろく）** と **スロット** が交互に進むフェーズ。マルチでは Firestore 同期・観戦ミラー・ゴースト自動操作が絡む。

## フェーズ構造

```
subPhase: day8
  movePhase (プレイヤーごと):
    moving → goalLanding → waitingSlot → arrived → (完了)
    missed / ゴースト脱落 もあり
```

| movePhase | プレイヤー操作 |
|-----------|----------------|
| `moving` | ダイス・進む・タイル効果 |
| `goalLanding` | ゴール着地確認 |
| `waitingSlot` | スロット手番待ち（**ログ行は出さない**） |
| `arrived` | スロット実行（最大3スピン/バースト） |

**スロット:** `BAL.dice.slotsPerSugorokuTurn === 3` — 1移動ターンあたり3スピンのバースト。

## 主要ファイル

| 用途 | ファイル |
|------|----------|
| 盤面・移動 UI | `BoardGamePhase.jsx`, `BoardViewport.jsx`, `BoardTile.jsx` |
| 移動演出 | `sugorokuMovementFx.js`, `useSugorokuMovementFx.js` |
| スロット本体 | `SlotMachine.jsx`, `SlotReelCanvasView.jsx` |
| 観戦ミラー | `Day8SlotSpectatorMirror.jsx` |
| ラウンド管理 | `day8RoundTracking.js` |
| 純粋ロジック | `gameLogic.js`（`computeAdvanceDay8Turn` 等） |
| アイテム | 下記「8日目アイテム」 |

## スロット同期タイミング

`gameLogic.js` の `SLOT_SYNC_*` 定数:

| 定数 | 意味（概略） |
|------|-------------|
| `SLOT_SYNC_T0` | スピン開始 |
| `SLOT_SYNC_T1` | 第1リール停止 |
| `SLOT_SYNC_T2_*` | 第2リール / リーチ / カットイン |
| `SLOT_SYNC_DEFAULTS` | Firestore 同期フィールド初期値 |

タイミング変更時は **実プレイヤー・観戦者・ゴースト** すべて同じ定数を参照していること。

## 8日目アイテム（Phase 1）

### 定義

`src/constants/day8Items.js` — `DAY8_ITEMS`, `DAY8_FIXED_START_GRANT`

| ID | 効果 | 使用タイミング |
|----|------|----------------|
| `dashCard` | 移動 +3マス（1回） | `movePhase: moving`・進む前 |
| `luckySpin` | 次の当たり配当 +50% | `movePhase: arrived` |
| `steadyGold` | バースト全スピン当たり +20% | `movePhase: arrived` |

### プレイヤー状態

| フィールド | 意味 |
|------------|------|
| `day8Inventory` | 所持アイテム `{ itemId: count }` |
| `day8SeatEffects[]` | 使用中の効果（seat = この手番） |
| `day8ItemUsedThisSeat` | この手番で既に1枚使ったか |

旧 `day8ActiveBuff` / `Day8ItemSelectGate` は **廃止**。ターン開始ゲートなし。

### 処理の流れ

```
constants/day8Items.js     定義・applyScope
lib/day8Items.js           使用可否・消費・prependItemLogs
lib/day8ItemEffects.js     純粋効果（gameLogic 循環 import 回避）
App.jsx                    handleUseDay8Item, commitDay8ItemGate
gameLogic.js               スロット結果 applyDay8SlotPayoutBonus フック
Day8ItemBar.jsx            行動ボタン直下 UI
```

**移動 +3:** `buildDay8CardMoveEffectMeta` → `movementFx.preMoveEffect`（カード吹き出し）

**マルチ:** `commitDay8ItemGate` + `day8ItemOptimisticGs`（→ [multiplayer-patterns.md](multiplayer-patterns.md)）

### アイテム追加手順

1. `DAY8_ITEMS` に定義（`phase`, `usableWhen`, `applyOn`, `applyScope`, `effect`）
2. `lib/day8Items.js` — 使用可否・消費
3. `lib/day8ItemEffects.js` — 効果適用（move / slotPayout）
4. `gameLogic.js` — スロット/移動フックに接続
5. `App.jsx` — `handleUseDay8Item`
6. `Day8ItemBar.jsx` — 表示
7. `day8Items.test.js` — テスト

## ログ規約

- `gs.log`: **index 0 = 最新**（`prependLogs`）
- サイドバー: `sidebarLogDailyTiles.js` — 日タイル内も新しい順、8日目バナーはタイル**下**

### スロットログ

| 種類 | 形式 |
|------|------|
| スピン1行 | `{name} {N}回目 {bet}G → {当たり} 収支±XG` — **行末に資金なし** |
| バースト終了 | `  資金{G}G` を1行だけ（3スピン後 or 残り0で中断） |
| スロット開始 | `配信者97: スロット開始` のみ（`Nターンブン・計M回` 括弧は**出さない**） |

**関数:** `formatDay8SlotSpinLogLine`, `formatDay8SlotBurstMoneyLogLine`（`gameLogic.js`）

### 出さないログ

- `waitingSlot` 手番行（`ゴール到着済み・スロット…`）
- スピン各行末尾の `(資金XG)`

## 既知の回収（8日目関連）

| 内容 | メモ |
|------|------|
| タクシーログ二重 | 同一ターン2行 — 原因調査中 |
| SP 盤面高さ | `min(720px,80vh)` 縮小候補 |
| SP スロット HUD | 折りたたみ候補 |

## ロードマップ

1. **Phase 1（現在）** — 自己バフ3枚 + インライン UI
2. **Phase 2** — 1〜7日目成績連動配布、SE/toast
3. **Phase 3** — 他者デバフ、ゴースト自動使用
4. **目押し** — Phase 1 安定後

## 関連テスト

`gameLogic.test.js`, `day8Items.test.js`, `day8RoundTracking.test.js`, `day8SlotReloadRecovery.test.js`, `slotPotJackpot.test.js`, `sugorokuMovementFx*.test.js`
