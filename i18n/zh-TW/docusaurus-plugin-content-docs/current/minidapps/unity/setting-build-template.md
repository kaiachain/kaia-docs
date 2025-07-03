# WebGL 建立設定

在本節中，我們將為網頁配置我們的 dApp！ 這將設定 Unity 與 Web3 相容，並建立 Kaia 整合的自訂範本。

## 步驟 1：切換至 WebGL 平台

1. 導覽至檔案 → 建立設定。
2. 選擇 WebGL，然後按一下「切換平台」。

:::note
如果您是第一次切換，這可能需要幾分鐘。
:::

![](/img/minidapps/unity-minidapp/ui-webgl-switch.png)

## 步驟 2：建立自訂 WebGL 模版

我們需要自訂範本來整合 Web3 功能。 這是我們的資料夾結構：

```code
Assets/
└── WebGLTemplates/
    └── KaiaTemplate/
        ├── index.html
        └── scripts/
            └── dapp_portal_sdk.js
```

:::info

\*\*為何要自訂範本？

預設的 Unity 模版不包含 Web3 支援。 我們的自訂範本將：

- 載入必要的 Web3 函式庫。
- 啟用 Kaia Wallet 整合。
- 妥善處理區塊鏈互動。
  :::

## 步驟 3：設定 index.html

複製並貼上以下程式碼到您的 `index.html` 檔案：

```html
<!DOCTYPE html>
<html lang="en-us">
 <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Unity WebGL Player</title>
   <script src="scripts/dapp_portal_sdk.js"></script>
   <style>
     body { margin: 0; padding: 0; }
     #unity-container { width: 100%; height: 100%; position: absolute; }
     #unity-canvas { width: 100%; height: 100%; background: #231F20; }
     #unity-loading-bar { display: none; }
     #unity-progress-bar-empty { width: 141px; height: 18px; margin-top: 10px; background: url('Build/minidapp.progress-bar-empty-dark.png') no-repeat center; }
     #unity-progress-bar-full { width: 0%; height: 18px; margin-top: 10px; background: url('Build/minidapp.progress-bar-full-dark.png') no-repeat center; }
   </style>
 </head>
 <body>
   <div id="unity-container">
     <canvas id="unity-canvas"></canvas>
     <div id="unity-loading-bar">
       <div id="unity-progress-bar-empty">
         <div id="unity-progress-bar-full"></div>
       </div>
     </div>
   </div>
   <script src="Build/minidapp.loader.js"></script>
   <script>
     var sdk = null;
     var connectedAddress = null;
     var myGameInstance = null;

     var Module = {
       onRuntimeInitialized: function() {
         console.log("Runtime initialized");
       },
       env: {
         MintToken: function(amount) {
           window.MintToken(amount);
         },
         GetBalance: function() {
           window.GetBalance();
         },
         ConnectWallet: function() {
           window.ConnectWallet();
         },
         DisconnectWallet: function() {
          window.DisconnectWallet();
         },
         GetConnectedAddress: function() {
           var address = window.GetConnectedAddress();
           var bufferSize = lengthBytesUTF8(address) + 1;
           var buffer = _malloc(bufferSize);
           stringToUTF8(address, buffer, bufferSize);
           return buffer;
         }
       }
     };

     async function initializeSDK() {
       try {
         sdk = await DappPortalSDK.init({
           clientId: 'PASTE CLIENT ID',
           chainId: '1001'
         });
         console.log("SDK initialized");
         return true;
       } catch (error) {
         console.error("SDK init error:", error);
         return false;
       }
     }

     window.ConnectWallet = async function() {
       try {
         if (!sdk) {
           const initialized = await initializeSDK();
           if (!initialized) return null;
         }

         const provider = sdk.getWalletProvider();
         const accounts = await provider.request({ method: 'kaia_requestAccounts' });

         if (accounts && accounts.length > 0) {
           connectedAddress = accounts[0];
           myGameInstance.SendMessage('Web3Manager', 'OnWalletConnected', connectedAddress);
         }
       } catch (error) {
         myGameInstance.SendMessage('Web3Manager', 'OnWalletError', error.message);
       }
     }

     window.DisconnectWallet = async function() {
       try {
         if (!sdk) {
           console.error("SDK not initialized");
           return;
         }

         const provider = sdk.getWalletProvider();
         await provider.disconnect();
         
         // Reset connected address
         connectedAddress = null;
         myGameInstance.SendMessage('Web3Manager', 'OnWalletDisconnected');
         console.log("Wallet disconnected successfully");
       } catch (error) {
         console.error("Disconnect error:", error);
         myGameInstance.SendMessage('Web3Manager', 'OnWalletError', "Disconnect failed: " + error.message);
       }
     }

     window.GetConnectedAddress = function() {
       return connectedAddress || '';
     }

     window.MintToken = async function(amount) {
       try {
         const provider = sdk.getWalletProvider();

         const mintSignature = '0xa0712d68';
         const amountHex = amount.toString(16).padStart(64, '0');
         const data = mintSignature + amountHex;

         const tx = {
           from: connectedAddress,
           to: '0x099D7feC4f799d1749adA8815eB21375E13E0Ddb',
           value: '0x0',
           data: data,
           gas: '0x4C4B40'
         };

         const txHash = await provider.request({
           method: 'kaia_sendTransaction',
           params: [tx]
         });

         myGameInstance.SendMessage('Web3Manager', 'OnMintSuccess', txHash);
         GetBalance(); // Get updated balance after mint
       } catch (error) {
         myGameInstance.SendMessage('Web3Manager', 'OnMintError', error.message);
       }
     }

     window.GetBalance = async function() {
       try {
         const provider = sdk.getWalletProvider();

         const balanceSignature = '0x70a08231';
         const addressParam = connectedAddress.substring(2).padStart(64, '0');
         const data = balanceSignature + addressParam;

         const result = await provider.request({
           method: 'kaia_call',
           params: [{
             from: connectedAddress,
             to: '0x099D7feC4f799d1749adA8815eB21375E13E0Ddb',
             data: data
           }, 'latest']
         });

         const balance = parseInt(result, 16);
         myGameInstance.SendMessage('Web3Manager', 'OnBalanceReceived', balance.toString());
       } catch (error) {
         myGameInstance.SendMessage('Web3Manager', 'OnBalanceError', error.message);
       }
     }

     createUnityInstance(document.querySelector("#unity-canvas"), {
       dataUrl: "Build/minidapp.data",
       frameworkUrl: "Build/minidapp.framework.js",
       codeUrl: "Build/minidapp.wasm",
       streamingAssetsUrl: "StreamingAssets",
       companyName: "DefaultCompany",
       productName: "minidapp",
       productVersion: "0.1",
     }).then((unityInstance) => {
       myGameInstance = unityInstance;
     });
   </script>
 </body>
</html>
```

## 步驟 4：設定 Mini Dapp SDK

1. 請造訪：https://static.kaiawallet.io/js/dapp-portal-sdk.js
2. 將內容儲存到您的 `scripts/dapp-portal-sdk.js` 中。 使用本機 Mini Dapp SDK 檔案可改善載入時間和可靠性。

:::note
另外，您也可以直接將 Mini Dapp SDK 的連結加入您的 `index.html` 中的 `script` 標籤的 `src` 中。

```js
// <script src="scripts/dapp_portal_sdk.js"></script>
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

:::

## 步驟 5：設定 Unity 以使用自訂範本

- 開啟建立設定。
- 導覽到播放器設定。
- 在「解析度與呈現」下：
  - 找到「WebGL 範本」。
  - 選擇「KaiaTemplate」。
- 在「發佈設定」下，在「壓縮格式」欄位中選擇 **已停用**。

![](/img/minidapps/unity-minidapp/ui-select-webgl-temp.png)

## 步驟 6：建立您的 dApp

現在，讓我們把這一切結合起來：

1. 開啟建立設定（檔案 → 建立設定）。
2. 按一下「建立並執行」。
3. 按照 Unity 上的提示儲存建立專案；例如「minidapp」。
4. 重要的建立檔案：

```bash
minidapp/
├── minidapp.loader.js
├── minidapp.data
├── minidapp.framework.js
└── minidapp.wasm
```

## 步驟 7：建立後設定

建立專案後、

1. 開啟您的建立資料夾。
2. 注意所有產生的檔案名稱。
3. 更新您的 index.html 以符合這些名稱。
4. 儲存變更並重建。
5. 現在您應該會看到瀏覽器中開啟了一個標籤。

![](/img/minidapps/unity-minidapp/ui-build-app.png)

## 步驟 8：將 WebGL 建立路由至 Localhost:3000

為了安全和開發目的，Mini Dapp SDK 目前在 localhost:3000 上運作。 目前，預設的 Unity WebGL 建置使用隨機連接埠 (如 61445)，為了讓我們的應用程式能有效運作，我們需要設定我們的 Unity WebGL 建置開啟於 localhost:3000。

若要執行，請遵循下列步驟：

1. 複製並貼上以下程式碼到您的專案終端

```bash
# Install http-server globally
npm install -g http-server
```

2. 導覽至建立資料夾

```bash
cd path/to/minidapp
```

3. 在連接埠 3000 上啟動伺服器

```bash
http-server -p 3000
```

![](/img/minidapps/unity-minidapp/lh_3000.png)

## 測試和執行應用程式

現在我們的專案已經開始執行，讓我們來測試並與它互動。

- 按一下 Connect Wallet 按鈕，連線至 Dapp Portal Wallet。
- 連線後，填入詳細資料 (金額)，以匯入已連線的地址。

![](/img/minidapps/unity-minidapp/minidapp-demo.gif)
