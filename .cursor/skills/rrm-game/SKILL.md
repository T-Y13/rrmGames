---
name: rrm-game
description: >-
  Develop and maintain RRM-game (PONS) — React/Vite multiplayer board game with
  Firebase Firestore. Use when editing this repo, game balance, day 8 sugoroku/slot,
  daily actions, mobile layout, logs, Firestore rules, tests, or Firebase deploy.
  Always read branches/<current-branch>.md for version-specific WIP and recovery items.
---

# RRM-game (PONS)

React 19 + Vite + Tailwind + Firebase（匿名 Auth / Firestore / Hosting）のマルチ＆ソロボードゲーム。

## 作業開始時（必須）

1. `git branch --show-current` でブランチ確認
2. **[branches/README.md](branches/README.md)** → 対応する **`branches/<branch>.md`** を読む（WIP・未デプロイ・回収予定）
3. 作業内容に応じて **references/** を読む（下表）
4. 作業区切りで当該ブランチ md を更新

| ブランチ | 記録 |
|----------|------|
| `main` | [branches/main.md](branches/main.md) |
| `ver1.0.2` | [branches/ver1.0.2.md](branches/ver1.0.2.md) |
| **`ver1.0.3`（作業中）** | **[branches/ver1.0.3.md](branches/ver1.0.3.md)** |

## 詳細リファレンス（分割）

| トピック | ファイル | いつ読む |
|----------|----------|----------|
| マルチ同期・transaction・ゴースト | [references/multiplayer-patterns.md](references/multiplayer-patterns.md) | `App.jsx` 書き込み、観戦、ゴースト |
| 8日目・アイテム・ログ | [references/day8-guide.md](references/day8-guide.md) | すごろく/スロット/アイテム/ログ |
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
3. **commit / deploy はユーザー明示までしない**
4. **デプロイは検証がデフォルト**（→ [release-checklist.md](references/release-checklist.md)）
5. Firebase CLI 一般 → `.agents/skills/firebase-*`（ゲーム固有は本 Skill）

## スマホ UI（Tailwind `md` = 768px）

**対応済（ver1.0.3 ローカル）:** ヘッダー SP 簡略（`App.jsx`）、1〜7日目キャラ右寄せ（`DailyActionPhase.jsx`）

**未対応:** 8日目盤面高さ、スロット HUD 折りたたみ、サイドバー→ボトムタブ、hover→タップ — 詳細は `branches/ver1.0.3.md`

PC は `lg:` 維持。SP は `hidden md:` / `md:hidden` で出し分け。

## テスト

```bash
npm run dev
npm run test:run
npm run test:rules:emulator   # firestore.rules 変更時
```

## 変更パターン（短縮）

| 変更 | 手順 |
|------|------|
| バランス | `gameBalance.js` → tests → `test:run` |
| 8日目アイテム | → [day8-guide.md](references/day8-guide.md) |
| Firestore 新フィールド | 初期値 → 書き込み → rules → rules test → deploy |
| マルチ書き込み | → [multiplayer-patterns.md](references/multiplayer-patterns.md) |
| 新ブランチ | `branches/<branch>.md` + README 更新 |

## 触らないもの

- `.agents/skills/` をゲーム Skill と混同しない
- ユーザー未依頼の commit / 余計な `.md`（**`.cursor/skills/rrm-game/` 配下は Skill として更新可**）
