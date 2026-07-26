---
name: rrm-game
description: >-
  Develop and maintain RRM-game (PONS) — React/Vite multiplayer board game with
  Firebase Firestore. Use when editing this repo, game balance, day 8 sugoroku/slot,
  daily actions, mobile layout, logs, Firestore rules, tests, or Firebase deploy.
  Always read branches/<current-branch>.md for version-specific WIP and recovery items.
  When gameplay or balance changes, update references/game-rules.md (and day8-guide.md if day 8).
---

# RRM-game (PONS)

React 19 + Vite + Tailwind + Firebase（匿名 Auth / Firestore / Hosting）のマルチ＆ソロボードゲーム。

## 作業開始時（必須）

1. `git branch --show-current` でブランチ確認
2. **[branches/README.md](branches/README.md)** → 対応する **`branches/<branch>.md`** を読む（WIP・未デプロイ・回収予定）
3. 作業内容に応じて **references/** を読む（下表）。**ルール・バランス変更なら [game-rules.md](references/game-rules.md) を先に読む**
4. 作業区切りで当該ブランチ md を更新

| ブランチ | 記録 |
|----------|------|
| `main` | [branches/main.md](branches/main.md) |
| `ver1.0.2` | [branches/ver1.0.2.md](branches/ver1.0.2.md) |
| **`ver1.0.3`（作業中）** | **[branches/ver1.0.3.md](branches/ver1.0.3.md)** |

## 作業終了時 — ゲームルール正本の更新（必須）

**プレイヤー向けルール・バランス・勝敗条件が変わったら、コード変更と同じ作業単位で [references/game-rules.md](references/game-rules.md) を更新する。** ユーザーが「ルールを残して」と言わなくても、エージェントが行う。

### 更新が必要な変更（トリガー）

| 変更 | 更新先 |
|------|--------|
| `gameBalance.js`（金額・確率・ターン数・キャラ） | **game-rules.md** |
| 1〜7日目行動（仕事・配信・神社・デイリースロット・PON） | **game-rules.md** |
| 8日目（移動・ゴール・スロット付与・15ラウンド・脱落） | **game-rules.md** + [day8-guide.md](references/day8-guide.md) |
| 8日目アイテム追加・効果変更 | **game-rules.md** + day8-guide |
| キャラ追加・シークレット解放条件 | **game-rules.md** |
| ランク閾値・勝敗条件 | **game-rules.md** |
| マルチのプレイヤー向けルール（代理スロット等） | **game-rules.md** |
| ログ文言のみ・UIレイアウトのみ・内部フィールドのみ | 不要（ルール実態が変わっていない場合） |

### 更新手順

1. **実装後**に `game-rules.md` の該当セクションを実コードと照合して修正
2. 8日目の設計・フィールド・バグ再発防止 → **day8-guide.md** も同期
3. `game-rules.md` 末尾 **変更履歴** に1行追加（日付・要点）
4. 作業ブランチ md にルール変更があれば1行メモ
5. `npm run test:run`（ロジック変更時）

### 正本の役割分担

| ファイル | 内容 |
|----------|------|
| **game-rules.md** | プレイヤー／企画向け**全体ルール**（何が起きるか） |
| **day8-guide.md** | 8日目の**実装正本**（フィールド名・フロー・ログ規約・テスト） |
| **gameBalance.js** | 数値の**単一ソース**（md はここから要約） |

**game-rules.md とコードが食い違ったら、どちらかを直し、必ず一致させる。**

## 詳細リファレンス（分割）

| トピック | ファイル | いつ読む |
|----------|----------|----------|
| **ゲームルール全体** | [references/game-rules.md](references/game-rules.md) | ルール確認、バランス、新機能の可否判断 |
| マルチ同期・transaction・ゴースト | [references/multiplayer-patterns.md](references/multiplayer-patterns.md) | `App.jsx` 書き込み、観戦、ゴースト |
| 8日目・アイテム・ログ | [references/day8-guide.md](references/day8-guide.md) | すごろく/スロット/アイテム/ログ/ **15ラウンド・グラフ** |
| テスト | [references/testing.md](references/testing.md) | test 追加、rules 変更、CI 失敗 |
| デプロイ・リリース | [references/release-checklist.md](references/release-checklist.md) | deploy 依頼、rules、merge 前 |

## クイック参照

| 用途 | 場所 |
|------|------|
| バランス定数 | `src/constants/gameBalance.js` |
| 純粋ゲームロジック | `src/utils/gameLogic.js` |
| UI・Firestore 書き込み | `src/App.jsx` |
| 8日目盤面・移動UI | `BoardGamePhase.jsx`, `BoardViewport.jsx` |
| 8日目スロット | `SlotMachine.jsx` |
| 1〜7日目行動 | `DailyActionPhase.jsx` |
| 8日目アイテム | `constants/day8Items.js`, `lib/day8Items.js`, `lib/day8ItemEffects.js`, `Day8ItemBar.jsx` |
| ログ保存 | `prependLogs()` in `gameLogic.js` |
| ログ表示 | `utils/sidebarLogDailyTiles.js`, `SidebarGameLogFeed.jsx` |
| Firestore ルール | `firestore.rules`, `tests/firestore.rules.test.js` |

## ゲームフェーズ（概要）

```
entry → lobby → waiting → playing
  subPhase: daily (1〜7) | day8 | finalBattle
  gamePhase: playing | finalBattle | results
```

8日目・スロット・アイテム・ログの詳細 → [day8-guide.md](references/day8-guide.md)

## 実装の原則

1. ロジック → `gameLogic.js` / `lib/*`、Firestore → `App.jsx`（→ [multiplayer-patterns.md](references/multiplayer-patterns.md)）
2. **最小 diff**、依頼外 refactor 禁止
3. **ルール実態が変わったら [game-rules.md](references/game-rules.md) を同時更新**（上記「作業終了時」）
4. **commit / deploy はユーザー明示までしない**
5. **デプロイは検証がデフォルト**（→ [release-checklist.md](references/release-checklist.md)）
6. Firebase CLI 一般 → `.agents/skills/firebase-*`（ゲーム固有は本 Skill）

## スマホ UI（Tailwind `md` = 768px）

**対応済（ver1.0.3 ローカル）:**
- ヘッダー SP 簡略（`App.jsx`）
- 1〜7日目キャラ右寄せ（`DailyActionPhase.jsx`）
- **8日目すごろく SP レイアウト** — 定数正本 `src/constants/sugorokuMobileLayout.js`
  - 駒 scale（`0.76` / `sm:0.9` / `md:1`）、名前 inline 追従、ダイスはキャラ横
  - POT はすごろく中ヘッダー inline（画面上部 fixed なし）
  - 盤面フレーム高さ → `gameAnimationsCss.js` の `BOARD_VIEWPORT_FRAME_SIZE_CLASS`

**未対応:** スロット HUD 折りたたみ、サイドバー→ボトムタブ、hover→タップ — 詳細は `branches/ver1.0.3.md`

PC は `lg:` 維持。SP は `hidden md:` / `md:hidden` で出し分け。

## テスト

→ 詳細: [references/testing.md](references/testing.md)

```bash
npm run test:run                  # src/** 単体
npm run test:rules:emulator       # firestore.rules 変更時
```

## 変更パターン（短縮）

| 変更 | 手順 |
|------|------|
| バランス | `gameBalance.js` → **game-rules.md** → tests → `test:run` |
| ゲームルール・勝敗・行動 | 実装 → **game-rules.md**（+ day8-guide if 8日目）→ `test:run` |
| テスト追加 / rules | → [testing.md](references/testing.md) |
| 8日目アイテム | 実装 → **game-rules.md** + [day8-guide.md](references/day8-guide.md) |
| Firestore 新フィールド | 初期値 → 書き込み → rules → rules test → deploy |
| マルチ書き込み | → [multiplayer-patterns.md](references/multiplayer-patterns.md) |
| 新ブランチ | `branches/<branch>.md` + README 更新 |

## 触らないもの

- `.agents/skills/` をゲーム Skill と混同しない
- ユーザー未依頼の commit / 余計な `.md`（**`.cursor/skills/rrm-game/` 配下は Skill として更新可**）
