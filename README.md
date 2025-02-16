# funnywebsitegoodapi

# 一、Github

## 推上Github的步驟

1.**檢查當前狀態**
git status

**2.添加修改的文件**
git add .

**3.提交修改**
git commit -m "修改了什麼"

**4.推送到遠端倉庫(假設分支名稱是 main，如果是其他分支名稱，替換 main 為其他分支名稱)**
git push origin main

## 從Github上拉回來的步驟，

**1.確認在正確的分支上（通常是 main 或 master 分支）**
git branch

**2.從遠端倉庫拉取更新**
git pull origin main

# 二、Package.json介紹

* **開發階段** : 使用 `npm run dev` 來啟動 `vite` 開發伺服器，進行本地開發和測試。
* **生產階段** : 使用 `npm run build` 來構建應用，並使用 `npm run preview` 來預覽構建結果。
* **靜態檢查** : 使用 `npm run lint` 來檢查代碼中的問題。
* **啟動服務器和開發伺服器** : 使用 `npm run start` 來同時啟動 Node.js 服務器和 `vite` 開發伺服器。

# 三、port被占用的處理方法

**1.查找占用端口的進程 ID（PID）[`<port>` 替換為端口號（如 3050）]
**netstat -ano | findstr :`<port>`

**2.會看到類似這樣的輸出，記下下方的 `<PID> `
**TCP    [::1]:3050             [::]:0                 LISTENING       `<PID>`

**3.終止占用端口的進程(將 `<PID>` 替換為之前記錄的進程 ID。如果你在 PowerShell 中運行，移除 `<` 和 `>`。)
**taskkill /PID `<PID>` /F

**4.再次使用確認端口是否仍在被占用**
netstat -ano | findstr :`<port>`
(如果端口仍然顯示為 `LISTENING`，可能需要重新啟動電腦或檢查是否有其他進程使用該端口)

**5.重啟應用程序**
npm run start
