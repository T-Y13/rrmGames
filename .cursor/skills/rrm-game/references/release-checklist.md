# リリース / デプロイチェックリスト

## デプロイ環境

| 環境 | npm script | Hosting target | URL |
|------|------------|----------------|-----|
| **検証（デフォルト）** | `deploy` / `deploy:verify` | default-site → `rrmgame-7df52` | https://rrmgame-7df52.web.app |
| **本番** | `deploy:prod` | pons-site → `potential-over-next-spin` | https://potential-over-next-spin.web.app |
| スロット試作 | `deploy:slot` | slot-site → `kenzenslot` | — |

Firebase プロジェクト: `rrmgame-7df52`（`.firebaserc`）

### Agent 向けルール（必須）

**ユーザーが「本番環境にデプロイして」と明示しない限り、Hosting は検証環境へ出す。**

```bash
npm run deploy          # または deploy:verify — 通常はこれ
npm run deploy:prod     # 本番 — 明示依頼時のみ
```

Firestore rules / indexes は hosting ターゲットと無関係（プロジェクト共通）。

```bash
npx -y firebase-tools@latest deploy --only firestore:rules
```

rules 未 deploy だとクライアントだけ直しても permission エラーが残る。

## 標準フロー

### 1. 開発・テスト（ローカル）

→ 詳細: [testing.md](../references/testing.md)

```bash
npm run dev
npm run test:run
```

`firestore.rules` を触った場合:

```bash
npm run test:rules:emulator
```

### 2. commit（ユーザー明示依頼時のみ）

機能単位で分ける例:

- 8日目アイテム
- ログ整理
- デイリーカットイン + rules
- SP UI

**Agent はユーザー依頼なしに commit しない。**

### 3. 検証デプロイ

```bash
npm run deploy
```

検証 URL で確認:

- [ ] ソロ / マルチ作成・参加
- [ ] 1〜7日目デイリー
- [ ] 8日目移動・スロット・アイテム
- [ ] ログ表示順・文言
- [ ] SP レイアウト（768px 未満）
- [ ] ゴースト / 再接続（マルチ）

### 4. Firestore rules deploy

`firestore.rules` 変更がある場合、hosting と**別途**:

```bash
npx -y firebase-tools@latest deploy --only firestore:rules
```

### 5. 本番デプロイ（明示依頼時のみ）

```bash
npm run deploy:prod
```

## ブランチ記録の更新

デプロイ前後で **`branches/<current-branch>.md`** を更新:

- [ ] **やったこと**（完了）
- [ ] **未 commit**（あれば）
- [ ] **未デプロイ**（検証 / 本番 / rules）
- [ ] **既知の不具合・回収予定**
- [ ] **次にやること**

新ブランチ開始時:

1. `branches/<branch>.md` 新規
2. `branches/README.md` の表に1行追加
3. 前ブランチから引き継ぎを記載

## バージョン差分の確認

```bash
git branch --show-current
git log main..HEAD --oneline
git diff main...HEAD --stat
git status -sb
```

## merge / リリース前（main 向け）

1. 未 commit 分を整理して commit
2. `npm run test:run` + `npm run test:rules:emulator`
3. 検証 `npm run deploy` で確認
4. `firestore.rules` deploy
5. 本番は明示依頼時 `deploy:prod`
6. `branches/main.md` の「含まれないもの」を更新

## トラブルシュート

| 症状 | 確認 |
|------|------|
| permission-denied | rules deploy 済みか、`firestore.rules.test.js` 通るか |
| 手番同期エラー | transaction 内 liveGs 再検証、楽観更新 rollback |
| 観戦でスロットずれ | `SLOT_SYNC_*` 定数の一致 |
| 古い cutin が残る | `dailyCutinStaleClearValid` + rules deploy |
| 本番に意図せず反映 | `deploy:prod` は明示依頼時のみ — 通常は `deploy` |

## npm scripts 一覧

```bash
npm run dev              # Vite dev server
npm run build            # production build
npm run test:run         # vitest 全件
npm run test:rules       # rules test（エミュレータ前提）
npm run test:rules:emulator  # emulator 起動込み
npm run deploy           # 検証 hosting
npm run deploy:verify    # deploy と同じ
npm run deploy:prod      # 本番 hosting
npm run deploy:slot      # スロット試作 site
```
