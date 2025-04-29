# Mini Dapp SDK 整合

在本節中，我們將確保在遊戲中載入 Mini Dapp SDK。 要做到這一點，Cocos Creator 的 build-templates 目錄允許自訂網頁平台的遊戲建置方式，使其成為遊戲開始前預先載入 SDK 的必要工具。

透過在 **build-templates/web-desktop** 中建立自訂範本，我們可以在每次建立時自動包含 SDK，簡化開發與部署。

## 步驟 1：建立 build-templates 目錄<a id="create-build-template-directory"></a>

在 VS Code 中開啟您的專案，並在終端執行下列指令：

```bash
mkdir -p build-templates/web-desktop
```

## 步驟 2：在 Cocos Creator 中執行初始建置<a id="perform-initial-build"></a>

1. 移至 **功能表 → 專案 → 建立**。

![](/img/minidapps/cocos-creator/cp-build-r.png)

2. 將 **Platform** 設為 **Web Desktop**。

3. 按一下 \*\* 建立\*\*。

![](/img/minidapps/cocos-creator/cp-build-details-r.png)

## 步驟 3：從建立目錄複製 index.html 檔案<a id="copy-index-html-from-build-dir"></a>

建立完成後，將 index.html 檔案複製到 build-templates 目錄：

```bash
cp build/web-desktop/index.html build-templates/web-desktop/
```

## 步驟 4：修改 index.html 以包含 Mini Dapp SDK<a id="modify-index-html-to-include-dapp-portal-sdk"></a>

編輯 `build-templates/web-desktop/index.html` 並在 `<head> </head>` 區段內加入下列 Mini Dapp SDK 程式碼標籤：

```bash
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

## 步驟 5：驗證建立設定<a id="verify-build-setup"></a>

- 在 Cocos Creator 中重建專案。
- 檢查產生的 `build/web-desktop/index.html`。
- 確認 **Mini Dapp SDK script** 已正確包含。

## 步驟 6：建立與預覽專案<a id="build-preview-project"></a>

完成設定後，按一下 Cocos Creator 編輯器上方的 _Play on Device_。 您的遊戲應該會在新的瀏覽器標籤中開啟。

![](/img/minidapps/cocos-creator/cp-play-game-r.png)

![](/img/minidapps/cocos-creator/cp-localhost-build-r.png)

# 將 Web 建立路由至 Localhost:3000<a id="route-web-build"></a>

為了安全和開發目的，Mini Dapp SDK 目前在 localhost:3000 上運作。 目前，預設的 Unity WebGL 建置使用隨機連接埠 (如 7457)，為了讓我們的應用程式能有效運作，我們需要設定我們的 Unity WebGL 建置開啟於 localhost:3000。

若要執行，請遵循下列步驟：

1. 複製並貼上以下程式碼到您的專案終端

```bash
# Install http-server globally
npm install -g http-server
```

2. 導覽至建立資料夾

```bash
cd build/web-desktop
```

3. 在連接埠 3000 上啟動伺服器

```bash
http-server -p 3000
```

# 測試和執行應用程式<a id="route-web-build"></a>

現在我們的專案已經開始執行，讓我們來測試並與它互動。

- 按一下 Connect Wallet 按鈕，連線至 Dapp Portal Wallet。
- 連線後，將固定金額匯入已連線的位址。

![](/img/minidapps/cocos-creator/cocos-demo.gif)
