# 8日目ガイド（すごろく + スロット + アイテム）

8日目は **盤面移動（すごろく）** と **スロット** が交互に進むフェーズ。マルチでは Firestore 同期・観戦ミラー・ゴースト自動操作が絡む。

**全体ルール** → [game-rules.md](game-rules.md)（**実装でルールが変わったら両方更新** — [SKILL.md](../SKILL.md)）  
**8日目実装詳細** → 本ファイル

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
| `arrived` | スロット実行（**1席 = 最大3スピン**） |

**スロット:** `BAL.dice.slotsPerSugorokuTurn === 3` — **3スピン完了で1席（バースト）終了**。  
❌ 誤: 「1ターン付与 → 3スピン」　✅ 正: 「3スピンしたら1席完了」

---

## 8日目ラウンドとスロット（設計の正本・2026-07）

エージェント／将来の自分向け。**ここが公式の考え方**。実装変更時はこの節とテストを先に読む。

### 2種類の「ターン」

| 名前 | フィールド | 意味 |
|------|------------|------|
| **ラウンド** | `room.remainingTurns`（15→0）, `moveTurns` | 8日目全体の **15ラウンド**。UI「移動手番 9/15」「残りラウンド 6」 |
| **スロット1席** | `slotPullsThisSeat`（0→3）, `slotTurnsLeft` | **3スピンで1席完了**。同一プレイヤーが burst 中は手番が回らない |

### スロットのルール（ユーザー合意）

- **1手番 = 1スロット枠**。自分の手番が来たとき **都度** スピン付与（bank しない）。
- 基本 **3スピン/手番**（`slotsPerSugorokuTurn`）。将来アイテムは `day8SlotGrantSizeForHandoff()` で加算。
- ゴール時に **スピン数を逆算・一括計算しない**（`reservedSlotTurns` 廃止）。
- **15T目（最終移動ターン）でゴール** → 移動で手番消費、次手番なし → **スロットなし**。
- JP 当選 → POT リセット → **同じ手番の残スピン内**で続行。
- **借金でもスピン可能**。
- **8日目は必ず15ラウンド**（`remainingTurns` 0 まで）。

### ゴールとスロット（手番ごと付与）

```
【ゴール時】
  盤上を離れる（moving → goalLanding / waitingSlot）
  スピン bank なし

【自分の手番（ゴール済み）】
  beginDay8SlotSeatForPlayer()
    → slotTurnsLeft = day8SlotGrantSizeForHandoff()（今は3）
  → arrived（スピン実行）
  → 0になったら releaseDay8PlayerToWaitingSlotAfterBurst()
    → waitingSlot（次の自分手番まで待機）
```

**早くゴール = 残りラウンド分だけ「自分手番」が増える** → 結果的にスロット多め。  
「9Tゴール = 18スピン付与」のような **事前計算・bank 表現は使わない**。

### スロット席の開始・終了

```
waitingSlot
  → beginDay8SlotSeatForPlayer()   // この手番分だけ付与
  → arrived
  → スピン消化
  → releaseDay8PlayerToWaitingSlotAfterBurst() → waitingSlot
```

**実装箇所**

| 処理 | ファイル |
|------|----------|
| `beginDay8SlotSeatForPlayer` | `gameLogic.js` |
| `day8SlotGrantSizeForHandoff` | `gameLogic.js`（アイテム加算用フック） |
| `releaseDay8PlayerToWaitingSlotAfterBurst` | `gameLogic.js` |
| 手動スロット開始 | `App.jsx` `handleBeginSlotPhase` |
| ゴースト自動開始 | `ghostPlayerAutomation.js` `runGhostBeginSlot` |
| バースト後 waitingSlot 復帰 | `computeAdvanceDay8Turn` |

### ゲーム終了条件

| 経路 | 条件 | 正否 |
|------|------|------|
| **唯一の正規経路** | `remainingTurns === 0` → `resolveDay8RoundExhaustion` → `finalizeToResults` | ✅ |
| ~~早期終了~~ | ~~全員 `isDay8GameFinished` → 即 `finalizeToResults`~~ | ❌ **削除済（バグ）** |

`isDay8GameFinished`: 最終移動ターンゴール（`isDay8FinalMoveGoal`）のみ true。それ以外のゴール済みは false（手番ごとにスロット継続）。

### フィールド名の注意

| フィールド | 実態 |
|------------|------|
| `slotTurnsLeft` | **この手番の残スピン数**（手番開始時に付与、持ち越さない） |
| `slotPullsThisSeat` | 手番内プル数（0→3 で burst 完了） |
| ~~`reservedSlotTurns`~~ | **廃止**（2026-07 手番ごと付与へ移行） |

### 結果画面・資産グラフ

| データ源 | 用途 |
|----------|------|
| `assetHistory.daily` | 1〜7日目 **日次終了時** |
| `assetHistory.day8` | 8日目 **各ラウンド終了時**（`snapshotDay8TurnEndAllPlayers`） |
| ~~`day8Timeline`~~ | グラフでは **使わない**（移動/スロット細分化用。重複プロットの原因だった） |

**グラフ生成:** `src/utils/assetHistoryFromGameState.js` → `AssetHistoryChart.jsx`

- X軸: 数値 `order`（0=Start, 1〜7=日次, 8〜22=8-1〜8-15）で **等間隔**
- 8日目: **1ラウンド1点**（プレイヤーごとの所持金）。総資産合算線は **不要**（個人の所持金のみ）
- 15ラウンド修正後は `day8` バケットに 1〜15 が記録される想定

### 2026-07 に直したバグ（再発防止）

| ID | 症状 | 原因 | 修正 |
|----|------|------|------|
| A | ゴール後1席で全スピン消化 | `reserved × 3` 一括付与 | **手番ごと付与**（`reservedSlotTurns` 廃止） |
| B | 11Tなどで results、グラフが 8-12 以降横ばい | `computeAdvanceDay8Turn` が全員完了で早期 `finalizeToResults` | その分岐 **削除**。`remainingTurns===0` のみ終了 |
| C | グラフが同ターン2点・軸が崩れる | `day8Timeline` をグラフに使用 | `daily` / `day8` のみ。タイムラインは記録のみ |
| D | `isDay8GameFinished` が早すぎる | `arrived` + `slotTurnsLeft<=0` だけで完了 | 最終ターンゴールのみ完了扱い |

**テスト:** `gameLogic.test.js`（`day8 slot seat helpers`）, `assetHistoryFromGameState.test.js`, `day8RoundTracking.test.js`

## 主要ファイル

| 用途 | ファイル |
|------|----------|
| 盤面・移動 UI | `BoardGamePhase.jsx`, `BoardViewport.jsx`, `BoardTile.jsx` |
| **SP すごろくレイアウト定数** | `constants/sugorokuMobileLayout.js` |
| 移動演出 | `sugorokuMovementFx.js`, `useSugorokuMovementFx.js` |
| スロット本体 | `SlotMachine.jsx`, `SlotReelCanvasView.jsx` |
| 観戦ミラー | `Day8SlotSpectatorMirror.jsx` |
| ラウンド管理 | `day8RoundTracking.js` |
| 純粋ロジック | `gameLogic.js`（`computeAdvanceDay8Turn` 等） |
| 資産グラフ | `assetHistoryFromGameState.js`, `AssetHistoryChart.jsx`, `lib/playerAssetHistory.js` |
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
| タクシーログ二重 | **修正済** — `animStartGs` で書いたログを `applyDay8ActorMoveCommit` が再 prepend しない（`logsAlreadyWritten`） |
| SP 盤面高さ | `min(720px,80vh)` 縮小候補 |
| SP スロット HUD | 折りたたみ候補 |

## ロードマップ

1. **Phase 1（現在）** — 自己バフ3枚 + インライン UI
2. **Phase 2** — 1〜7日目成績連動配布、SE/toast
3. **Phase 3** — 他者デバフ、ゴースト自動使用
4. **目押し** — ver1.0.4 で段階実装（→ [ver1.0.4.md](../branches/ver1.0.4.md)）

### 目押し（ver1.0.4 Phase 0 設計メモ）

- **ガセリーチ:** ハズレの **18%**（`nearMissReachChance`）
- **目押しチャンス:** ガセ成立時 **70%**（`gaseReachSkillStopChance`）
- **体感:** 約 **10.7%/スピン**、約 **29%/3スピン席**（miss≈85% 想定）
- **純関数:** `lib/slotReelStop.js` — `resolveSlotSkillStopContext`, `buildSlotSpinVisualPlan`
- **筐体 UI（2026-07-30）:** 8日目は `SlotCabinetShell` **vector**（描画筐体）。デイリー練習は PNG のまま。詳細 → [ver1.0.4.md](../branches/ver1.0.4.md) Phase A2
- **Phase A1:** 手動 STOP×3（押すまで止まらない）。**Phase A2:** 筐体 vector 化。**Phase B 以降:** Firestore `slotSkillStopActive` / 目押し本体

## 関連テスト

`gameLogic.test.js`, `day8Items.test.js`, `day8RoundTracking.test.js`, `day8SlotReloadRecovery.test.js`, `slotPotJackpot.test.js`, `sugorokuMovementFx*.test.js`, `assetHistoryFromGameState.test.js`

**8日目ラウンド／スロット／グラフの設計正本** → 本ファイル上部「8日目ラウンドとスロット（設計の正本・2026-07）」
