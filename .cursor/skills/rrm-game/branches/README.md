# ブランチ別開発記録

新しい Cursor ウィンドウ／別セッションでも **「今どのバージョンで何をやっていたか」** を追えるように、ブランチごとに Markdown で残す。

## 見方

| ファイル | 内容 |
|----------|------|
| [main.md](main.md) | 本番 baseline（`main` / デプロイ済みの基準） |
| **[develop.md](develop.md)** | **検証・次期本番の控え**（`main` に未反映の最新） |
| [ver1.0.2.md](ver1.0.2.md) | v1.0.2 タグ時点 |
| [ver1.0.3.md](ver1.0.3.md) | ver1.0.3 作業記録（**完了** → develop に取り込み済） |
| **[ver1.0.4.md](ver1.0.4.md)** | **作業中** — `develop` から切り出し |

**詳細リファレンス（Skill 内）:** [references/](../references/) — マルチ同期 / 8日目 / テスト / デプロイ

古いブランチ: `ver1.0.0`, `ver1.0.1` は remote のみ。詳細は `git log ver1.0.0..ver1.0.1` を参照。

## ブランチ役割（2026-07-29〜）

| ブランチ | 役割 |
|----------|------|
| `main` | 本番（`deploy:prod`） |
| `develop` | 検証・次期本番の控え（`npm run deploy`） |
| `ver1.0.x` | 機能単位の作業（完了後 `develop` へ） |

## Agent 向けルール

1. **作業開始時** — `git branch --show-current` でブランチ確認 → 対応する `branches/<branch>.md` を読む。
2. **作業終了時** — ユーザーが依頼した場合、または大きな機能塊が完了した場合、当該ブランチ md を更新:
   - **やったこと**（完了）
   - **ローカルのみ / 未 commit**（あれば）
   - **未デプロイ**（hosting / rules）
   - **既知の不具合・回収予定**
   - **次にやること**
3. **新ブランチ** — `branches/<新ブランチ名>.md` を README の表に1行追加。前ブランチから **差分・引き継ぎ** を書く。

## バージョン差分の調べ方

```bash
git branch --show-current
git log main..HEAD --oneline          # main より先の commit
git diff main...HEAD --stat           # main との変更ファイル
git status -sb                        # 未 commit
```

## デプロイ先（Hosting）

| 環境 | npm script | Firebase target | URL |
|------|------------|-----------------|-----|
| **検証（デフォルト）** | `deploy` / `deploy:verify` | default-site → rrmgame-7df52 | https://rrmgame-7df52.web.app |
| **本番** | `deploy:prod` | pons-site → potential-over-next-spin | https://potential-over-next-spin.web.app |
| スロット試作 | `deploy:slot` | slot-site → kenzenslot | — |

**デプロイ方針:** 「本番環境にデプロイして」と明示されない限り **検証環境**（`npm run deploy`）へ出す。本番は明示依頼時のみ `deploy:prod`。

Firestore rules / indexes は hosting ターゲットと無関係（プロジェクト `rrmgame-7df52` 共通）。`firestore.rules` 変更時:

```bash
npx -y firebase-tools@latest deploy --only firestore:rules
```

## 新しい Cursor ウィンドウで再開するとき

1. リポジトリを開く（同じ `RRM-game` フォルダ）
2. Agent に「`.cursor/skills/rrm-game` を読んでから作業して」と伝えるか、Skill が自動適用されるのを待つ
3. ターミナル: `git branch --show-current` → 例: `ver1.0.4`
4. **`.cursor/skills/rrm-game/branches/ver1.0.4.md`** を開く（WIP・回収・次の一手がここに集約）
5. `git status -sb` で未 commit の有無を照合

**バージョン差分を見る:**

| 比較 | コマンド |
|------|----------|
| ブランチ vs main（commit 差） | `git log main..ver1.0.4 --oneline` |
| 未 commit の中身 | `git diff --stat` |
| main に無い機能の説明 | `branches/main.md` の「含まれないもの」↔ `ver1.0.4.md` |

現状 `ver1.0.4` は **develop と同一 tip** で開始。差分は **ver1.0.4 上の commit** と **作業ツリー** で追う。

## 更新日

- 索引作成: 2026-06-15
- 新ウィンドウ手順・tip 整合: 2026-07-24
