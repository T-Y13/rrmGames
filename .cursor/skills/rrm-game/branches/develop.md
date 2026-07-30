# develop（検証・次期本番の控え）

- **ブランチ:** `develop`
- **リモート:** `origin/develop`
- **役割:** `main`（本番）に対する **統合・検証用**。次に本番へ載せる変更の正本。
- **記録更新:** 2026-07-30

---

## 直近の検証 deploy

- **2026-07-30:** すごろく SP ダイスレイアウト・タクシー残りマス表示修正（`ver1.0.3` → `develop`）→ https://rrmgame-7df52.web.app

## ブランチ方針

| ブランチ | 用途 |
|----------|------|
| **`main`** | 本番環境（`deploy:prod` / potential-over-next-spin）の baseline |
| **`develop`** | 検証環境向けの最新。本番反映前の控え・マージ先 |
| **`ver1.0.x`** | 機能単位の作業ブランチ（完了後 `develop` へ取り込み） |

## 現在の状態（2026-07-29 作成時）

- `develop` は `main` から切り出し後、**`ver1.0.3` と同一 tip**（`573cd48`）に同期済み
- `main` より先: 拡張性 Phase 1〜5、大家、家賃ターン開始、8日目アイテム、タクシーログ修正 等
- 詳細 WIP は [ver1.0.3.md](ver1.0.3.md) を参照（内容は develop に取り込み済）
- **現作業ブランチ:** `ver1.0.4`（[ver1.0.4.md](ver1.0.4.md)）

## 運用フロー（目安）

```
ver1.0.x（作業） → develop（検証 deploy） → main（本番 deploy:prod）
```

1. 機能開発は `ver1.0.x` または `develop` 上で実施
2. 検証: `npm run deploy`（検証 Hosting）
3. 本番反映: `develop` → `main` マージ後 `deploy:prod`

## 差分の見方

```bash
git log main..develop --oneline    # 本番に未反映の commit
git diff main...develop --stat     # 本番とのファイル差分
```
