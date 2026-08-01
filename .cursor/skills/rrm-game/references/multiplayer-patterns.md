# マルチプレイ / Firestore 書き込みパターン

RRM-game のマルチ同期は **`App.jsx` の `performGameStateUpdate`** が中心。ロジックは `gameLogic.js` に置き、Firestore 書き込みだけ App 側に集約する。

## レイヤ分離

| 層 | 責務 | 例 |
|----|------|-----|
| 純粋ロジック | 状態遷移・計算・ログ文字列 | `gameLogic.js`, `lib/day8ItemEffects.js` |
| 認可・書き込み | 手番チェック、transaction、楽観更新 | `App.jsx` |
| 観戦・演出 | 他クライアントへのミラー表示 | `Day8SlotSpectatorMirror`, `DailyActionSpectatorMirror` |
| ゴースト | 切断プレイヤーの自動操作 | `ghostPlayerAutomation.js`, `ghostAutomationLease.js` |

**禁止:** `gameLogic.js` から Firestore を import しない（循環・テスト困難を防ぐ）。

## performGameStateUpdate

```javascript
performGameStateUpdate(newGS, writeMode, authCtx)
```

### writeMode 一覧

| writeMode | 用途 |
|-----------|------|
| `actorTurn` | 通常の手番操作（移動・スロット・アイテム等） |
| `goalLandingConfirm` | 8日目ゴール着地確認 |
| `hostFinalBattle` | 決戦開始（ホストのみ） |
| `ghostAutomation` | ゴースト AI の自動手番 |
| `dailyFxClear` | デイリー行動 FX ラベル解除 |

### authCtx オプション

| キー | 用途 |
|------|------|
| `liveMutator: (liveGs) => nextGs` | transaction 内で **最新 liveGs** から次状態を計算（楽観更新と併用） |
| `markDay8TurnComplete` | `true` / `"auto"` / 省略 — 8日目ターン完了マーク |
| `turnCompletePlayerId` | 完了マーク対象プレイヤー ID |
| `deathCommitPlayerId` | 脱落コミット（手番者本人のみ） |
| `setStatus` | ルーム `status` 文字列を同時更新 |

### transaction が走る条件

`roomId` があり、`gamePhase === "playing"` かつ `subPhase === "day8" | "daily"` のとき **`runTransaction`** で room ドキュメントを更新。

- transaction 内で **必ず `liveGs` を再取得**して手番・フェーズを再検証
- `liveMutator` 使用時は `newGS` を null で渡し、mutator が live から計算
- 8日目は `applyDay8RoundTracking` で `remainingTurns` / `completedPlayers` / `totalPot` も同時更新
- **フェーズ後退禁止:** day8 中に `subPhase !== "day8"` へ戻す更新は `PHASE_REGRESSION` で拒否

### 非 transaction パス

上記条件外（ロビー、結果画面等）は `updateRoom(updates)` を直接呼ぶ。

## 楽観更新（Optimistic UI）

Firestore 反映待ちの UI チラつきを抑える。

| state | 有効条件 | 用途 |
|-------|----------|------|
| `day8ItemOptimisticGs` | `subPhase === "day8"` | 8日目アイテム使用 |
| `day7DailyOptimisticGs` | `subPhase === "daily"` | 7日目デイリー行動 |

**パターン:**

```javascript
setDay8ItemOptimisticGs(optimistic);
const ok = await performGameStateUpdate(null, "actorTurn", {
  liveMutator: (liveGs) => mutator(liveGs),
});
if (!ok) setDay8ItemOptimisticGs(null);
```

表示用 `gs` は `roomGs` と optimistic をマージ（`day8ItemOptimisticActive` 等）。

**解除:** Firestore の該当フィールドが optimistic と一致したら `useEffect` でクリア。

## commit* ヘルパ（App.jsx）

| 関数 | 用途 |
|------|------|
| `writeGS` | 単純な actorTurn 書き込み |
| `commitDay8ItemGate` | アイテム使用（楽観 + liveMutator） |
| `commitDay8SlotSpin` / `commitDay8SlotSpinStart` | スロットスピン同期 |
| `commitDay8SlotLivePatch` | スロット中の部分パッチ |
| `commitGameStateTransaction` | 汎用 transaction |
| `commitPendingGameState` | 保留中 GS のフラッシュ |

新しい 8日目操作を足すときは **既存 commit* の形に合わせる**。直接 `updateRoom` しない。

## ゴースト自動操作

`ghostPlayerAutomation.js` — 切断・ゴーストプレイヤーの手番を自動実行。

**排他:** `ghostAutomationLease.js`

- 複数タブ / バックアップクライアントが同時に自動操作しないよう Firestore 上のリース
- `tryAcquireGhostAutomationLease(db, roomId, myId)` — 8秒 TTL
- `writeMode: "ghostAutomation"` — 本人の手番では実行不可

## スロット同期（8日目マルチ）

- 定数: `SLOT_SYNC_*` in `gameLogic.js`（T0/T1/T2、リーチカットインタイミング）
- `SLOT_SYNC_DEFAULTS` — Firestore に載せる slot 同期フィールドの初期形
- `SlotMachine.jsx` — 実プレイヤー側の canvas アニメ
- `Day8SlotSpectatorMirror.jsx` — 観戦者へのミラー
- `slotBroadcastSync` — spin anim key 等のユーティリティ

スロット timing を変えるときは **クライアント全員 + 観戦ミラー** が同じ定数を参照しているか確認。

## デイリーカットイン同期

- `dailyCutinSync.js` — stale cutin 復旧、フィールド merge
- `useDailyCutinSpectatorSync.js` — 観戦側フック
- `WorkCutin.jsx` — 解除 UI
- `firestore.rules` — `dailyCutinRoomBroadcastValid()` / `dailyCutinStaleClearValid()`（**rules deploy 必須**）

`performGameStateUpdate` / `writeGS` は `pendingDailyCutinBroadcastRef` を merge してから書き込む。

**手番同期とカットイン解除:** `playGameStatePatchValid` は `gameState`(+status/pot…) のみ許可。ルーム直下 `dailyCutin*` を同一 Commit に載せると **permission-denied**。クライアントは **gameState transaction 成功後に順次** `updateRoom(DAILY_CUTIN_SYNC_DEFAULTS)` する。並列の先行 clear は `failed-precondition` 競合の原因になるので禁止。

**dailyActionFx 解除:** マルチ遅延手番 write のあとは非手番になるため、旧 rules では clear が 403 になる。遅延 write には fx を載せない（観戦はカットイン同期）。rules の `dailyFxClearValid` は deploy 後に手番外クリアを許可。

## プレイヤー存在・再接続

- `playerPresence.js` — オンライン状態
- `markNetworkGhost.js` — ネットワークゴースト化
- `roomLifecycle.js` — ルーム作成・解散

## 実装チェックリスト（マルチ変更時）

- [ ] 純粋ロジックは `gameLogic.js` / `lib/*` に分離したか
- [ ] 手番外・観戦者から書き込めないか（`isActorTurnOnGameState` 等）
- [ ] transaction 内で `liveGs` を再読みしているか
- [ ] 8日目なら `applyDay8RoundTracking` を通したか
- [ ] 楽観更新の rollback があるか
- [ ] ゴースト自動操作と競合しないか（lease）
- [ ] `npm run test:run` — 関連 test 追加
- [ ] rules 変更なら `npm run test:rules:emulator`

## 関連テスト

`ghostAutomationLease.test.js`, `ghostPlayerAutomation.test.js`, `slotBroadcastSync.test.js`, `dailyCutinSync.test.js`, `playerPresence.test.js`, `day8SlotReloadRecovery.test.js`
