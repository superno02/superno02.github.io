---
name: deploy
description: Use when 要把履歷網站發布到 GitHub Pages——首次部署、內容更新後重新發布，或使用者說「上傳／發布／部署網站」「push 到 GitHub」時
---

# 發布到 GitHub Pages

## 核心原則

**push = 對外公開發布。** push 前必須通過發布前檢查；首次 push 前必須取得使用者明確確認。

## 發布前檢查（每次都跑，不可跳過）

1. 隱私掃描（命令見專案 CLAUDE.md「常用命令」）→ 輸出必須為空
2. `git status` → 確認沒有 `*.pdf`、`backups/`、`docs/superpowers/` 被 staged
3. CLAUDE.md「完成前檢查清單」逐項通過
4. **快取破壞（cache busting）**：若本次改動包含 `css/` 或 `js/` 檔案，必須同步遞增
   `index.html` 中三個資源引用的 `?v=` 版本號（格式 `?v=YYYYMMDD-N`，三處同值）。
   原因：GitHub Pages 資源快取 `max-age=600`，不改版本號的話，部署後 10 分鐘內
   回訪者會拿到「新 HTML＋快取舊 JS/CSS」混版，舊 JS 對新 DOM 可能直接崩潰
   （2026-07-08 幽藍魔導改版實際發生過）

## 首次部署（repo 還不存在時）

```bash
# 1. 初始化（若尚未是 git repo）
git init -b main
git add . && git status   # 再次目視確認沒有 PDF
git commit -m "Initial site"

# 2. 檢查 gh CLI（本機目前未安裝）
which gh
```

- **有 gh**：`gh auth login` 後
  `gh repo create <帳號>.github.io --public --source=. --push`
- **沒有 gh**：請使用者先在 GitHub 網頁上建立名為 `<帳號>.github.io` 的 public repo，然後：

```bash
git remote add origin https://github.com/<帳號>/<帳號>.github.io.git
git push -u origin main
```

- Repo 名稱**必須**是 `<GitHub帳號>.github.io`，拼錯 GitHub Pages 不會啟用個人主頁
- 啟用 Pages：repo → Settings → Pages → Source「Deploy from a branch」→ `main` / `/ (root)`

## 更新部署（repo 已存在）

```bash
git add <改過的檔案>   # 不用 git add -A，逐檔確認
git commit -m "<描述這次改了什麼>"
git push
```

## 發布後驗證（宣稱完成前必做）

1. 等 1–2 分鐘，開 `https://<帳號>.github.io/` 確認新內容已上線
2. 手機寬度（DevTools 375px）再看一次線上版
3. 回報時附上網址與實際看到的結果，不可只說「已 push 應該生效」

## 常見錯誤

- ❌ `git add -A` 把 PDF 或備份檔掃進 commit → 個資進了公開 repo，rewrite history 很痛苦
- ❌ repo 名稱打成 `resume` 卻期待 `<帳號>.github.io/` 生效 → 個人主頁 repo 名稱固定格式
- ❌ push 完立刻宣稱上線 → Pages 建置需 1–2 分鐘，必須實際開網址驗證
