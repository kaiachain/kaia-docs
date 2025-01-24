# 構建 Unity 應用程序

## 前提條件

在我們開始之前，請確保您擁有

- 在您的計算機上安裝[Unity Hub](https://unity.com/download)--我們將在此構建 dApp 界面
- 基本的 C# 和 JavaScript 知識 - 不用太花哨，只需基本知識
- LINE Developer 賬戶--您可以使用電子郵件輕鬆創建一個賬戶
- 測試 Kaia，來自 [Kaia 水龍頭](https://faucet.kaia.io/)
- 從 Dapp Portal 團隊獲得的 Dapp Portal SDK 客戶 ID。
- 熟悉一些 Web3 概念--如果你瞭解錢包和代幣，就可以使用了。

## 設置 Unity 環境

讓我們來設置開發環境。 我們將從 Unity 設置開始。

### 第 1 步：安裝並驗證 Unity 版本

首先，確保我們使用的是相同的 Unity 版本，以避免出現任何兼容性問題：

- 如果尚未安裝 Unity Hub，請安裝。
- 具體安裝 2022.3.50f1 版 Unity 編輯器。

### 第 2 步：創建新的 Unity 項目

1. 打開 Unity Hub 並轉到 "項目 "選項卡。
2. 點擊右上角的 "新建項目 "按鈕。
3. 在 "所有模板 "下，選擇 **3D（內置渲染管道）** 模板。
4. 給您的項目起一個有意義的名稱（例如，mini-dApp-example）。
5. 為項目文件選擇一個方便的位置。
6. 點擊 **創建項目**。

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)

## 創建 dApp 的用戶界面組件

在本部分中，我們將構建 dApp 的用戶界面！ 我們將創建一個結構化的用戶界面系統，其中有三個主要面板，分別用於狀態更新、操作和鑄幣功能。

### 設置主畫布

首先，讓我們創建基本畫布：

1. 在 "層次結構 "窗口中，右鍵單擊 "示例場景"。
2. 導航至 GameObject → UI → 畫布。

### 創建 Web3UI 容器

1. 右鍵單擊新畫布。
2. 選擇 "創建空"。
3. 重命名為 "Web3UI"。

### 設置主面板

在 Web3UI 中創建三個面板對象：

1. 右鍵單擊 Web3UI 並選擇 "創建空"。
2. 創建並重命名這些面板：
   - StatusPanel - 您的 dApp 的信息顯示屏
   - 按鈕面板 - 用於用戶交互
   - MintPanel - 用於代幣鑄幣功能

### 創建面板組件

#### 狀態面板組件

該面板顯示所有重要的 Web3 信息：

- 右鍵單擊 StatusPanel，單擊 UI → Text - TextMeshPro，然後重命名為 StatusText。 確保填寫檢查器窗格中的 "文本輸入 "字段，例如 "狀態......"

:::note
**TextMeshPro（TMP）設置**

首次創建 TextMeshPro 元素時（用戶界面 - 文本 - TextMeshPro），Unity 會自動提示您導入 TMP Essentials。 如果不小心跳過此提示，可以通過窗口 > TextMeshPro > 導入 TMP Essentials 手動導入。

為什麼需要TextMeshPro 需要核心資源（著色器、默認字體和材質）才能在遊戲中正確顯示文本。 如果沒有這些基本要素，您的文本組件將無法正確渲染，您將在項目中看到著色器/材質錯誤。 這是文本正常工作所必需的一次性設置。
:::

![](/img/minidapps/unity-minidapp/status_text.png)

- 右鍵單擊 StatusPanel，單擊 UI → Text - TextMeshPro，然後重命名為 StatusText。 確保填寫文本對象，例如 "地址文本......"
- 右鍵單擊 StatusPanel，單擊 UI → Text - TextMeshPro，然後重命名為 StatusText。 確保填寫文本對象，例如 "0.0000 ET"

```code
├── StatusText (TextMeshPro)
│   └── Default: "Status..."
├── AddressText (TextMeshPro)
│   └── Default: "Address Text..."
└── TokenBalanceText (TextMeshPro)
    └── Default: "0.0000 ET"
```

#### 狀態面板組件

您的主要交互按鈕：

- 右鍵單擊 ButtonPanel，單擊 UI → Button - TextMeshPro，然後將其重命名為 ConnectWalletButton。 確保填寫檢查器窗格中的 "文本輸入 "字段，例如 "檢查 web3"。

```code
ButtonPanel
├── ConnectButton (Button - TextMeshPro)
│   └── Text: "Connect Wallet"
```

#### MintPanel 組件

代幣鑄造界面：

- 右鍵單擊 MintPanel，單擊用戶界面 → 輸入字段 → TextMeshPro，然後重命名為 MintAmountInput。 確保在佔位符對象上填寫 "輸入金額…"
- 右鍵單擊 MintPanel，單擊用戶界面 → 按鈕 → TextMeshPro，然後重命名為 MintButton。 確保用 "薄荷 "填充文本對象

```code
MintPanel
├── MintAmountInput (Input Field - TextMeshPro)
│   └── Placeholder: "Enter Amount..."
└── MintButton (Button - TextMeshPro)
    └── Text: "Mint"
```

創建所有組件後，您的層次結構應如下所示：

```code
Canvas
└── Web3UI
    ├── StatusPanel
    ├── ButtonPanel
    └── MintPanel
```

![](/img/minidapps/unity-minidapp/unity_ui_canvas.png)

:::note
要使組件排列整齊如上圖所示，必須在點擊每個組件時使用右側的圖標手動排列。
:::

## 設置 Web3 集成

在本節中，我們將把 web3 集成到 Unity 項目中。

### 創建和部署 KIP7 智能合約

首先，我們使用 Kaia Contract Wizard 生成智能合約。

#### 步驟 1：使用 Kaia 合同嚮導

1. 導航至 Kaia 合約嚮導。
2. 選擇 KIP7（Kaia 的代幣標準，類似於 ERC20）。
3. 配置您的代幣：
   - 名稱：名稱： ExampleTestToken（或其他名稱）
   - 符號：ET（您的代幣代碼）
   - 預鑄幣100（初始代幣供應）
   - 功能：檢查 ✅ 可鑄造

在本指南中，我們將調整 mint 函數，使其不包含 onlyOwner 修飾符。 為此，我們必須刪除 ownable.sol 導入和 Ownable 繼承。 調整後的代碼現在應該是這樣的：

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
contract ExampleTokens is KIP7 {
    constructor() KIP7("ExampleTokens", "ET") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }
    function mint(uint256 amount) public  {
        _mint(msg.sender, amount);
    }
}
```

:::info
我們刪除了 onlyOwner 修飾符，以允許除原始部署者或合約所有者之外的任何人調用鑄幣廠函數。
:::

#### 步驟 2：通過 Remix IDE 進行部署

1. 將上述代碼複製並粘貼到 Remix IDE 上新建的文件 `ET.sol` 中。
2. 在 Remix IDE 中：
   - 單擊**Compile contract**按鈕。
   - 在插件管理器中激活 **Kaia 插件**。
   - 在 "Kaia 插件 "選項卡的 "環境 "下，選擇**注入的提供程序** - **Kaia錢包**。
   - 在**合同**下拉菜單中找到您的合同（ExampleTokens）。
   - 點擊 **部署**，發佈代幣！
3. 當您的 Kaia 錢包彈出時：
   - 查看部署詳情。
   - 單擊確認以部署到 Kaia Kairos Testnet。

:::important
複製並保存已部署的合同地址。 本教程稍後會用到它。
:::

## 構建 Unity-Web3 橋接器

現在，我們將創建 Unity 和 Web3 功能之間的重要連接。 這就是我們將區塊鏈功能引入 Unity 應用程序的地方！

### 第 1 部分：創建插件橋（kaiaPlugin.jslib）

首先，我們將構建 JavaScript 橋接器，讓 Unity 與 Web3 進行對話：

1. 創建插件目錄：

```
Assets/
└── Plugins/
    └── WebGL/
        └── KaiaPlugin.jslib    // We'll create this file
```

2. 為什麼要使用 .jslib？ 將其視為 Unity 的 C# 和瀏覽器的 JavaScript 之間的翻譯器--這對 Web3 交互至關重要！

3. 該插件將處理三個核心功能：
   - ConnectWallet() - 處理 Kaia 錢包連接
   - GetTokenBalance() - 檢查令牌餘額
   - MintTokens() - 管理代幣鑄造

在 VS Code 中打開此文件並粘貼 [Appendix A](../minidapps/convert-unity-liff.md#appendix-a) 中的`KaiaPlugin.jslib`源代碼：

### 第 2 部分：創建 C# 管理器 (Web3Manager.cs)

接下來，我們將創建 C# 腳本來管理所有 Web3 操作：

1. 創建腳本目錄：

```js
Assets/
└── Scripts/
    └── Web3/
        └── Web3Manager.cs    // We'll create this file
```

:::info

\*\*Web3Manager 做什麼？

- 充當所有 Web3 操作的主要導體。
- 管理與 JavaScript 插件的通信。
- 根據區塊鏈事件更新用戶界面元素。
- 處理所有錢包和代幣操作。
- 將 "連接錢包 "和 "薄荷 "按鈕與各自的功能連接起來
  :::

2. 在 VS Code 中打開此文件，並粘貼 [Appendix B](../minidapps/convert-unity-liff.md#appendix-b) 中的 `Web3Manager.cs` 源代碼。

### 第 3 部分：設置 Web3Manager 遊戲對象

最後，讓我們將所有內容整合到 Unity 中：

1. 創建管理器對象：
   - 在 "層次結構 "窗口（根層）中單擊右鍵。
   - 選擇 ""Create Empty Object"。
   - 將其命名為 "Web3Manager"。
2. 附加腳本：
   - 選擇 Web3Manager GameObject。
   - 在 "檢查器 "中，單擊 "添加組件"。
   - 搜索並選擇 "Web3Manager"。
3. 連接用戶界面元素：
   - 選擇 Web3Manager 後，查看檢查器。
   - 將用戶界面元素從層次結構拖放到相應字段：
     - StatusText
     - AddressText
     - TokenBalanceText
     - 連接/薄荷按鈕
     - Input fields

![](/img/minidapps/unity-minidapp/connect_ui_manager.png)

## 設置 WebGL 構建設置

在本節中，我們將為網絡配置 dApp！ 這將配置 Unity 以兼容 Web3，併為 Kaia 集成創建自定義模板。

### 步驟 1：切換到 WebGL 平臺

1. 導航至文件 → 生成設置。
2. 選擇 WebGL 並單擊 "切換平臺"。

:::note
如果是第一次切換，可能需要幾分鐘。
:::

![](/img/minidapps/unity-minidapp/ui-webgl-switch.png)

### 步驟 2：創建自定義 WebGL 模板

我們需要一個自定義模板來集成 Web3 功能。 這是我們的文件夾結構：

```code
Assets/
└── WebGLTemplates/
    └── KaiaTemplate/
        ├── index.html
        └── scripts/
            └── dapp_portal_sdk.js
```

:::info
\*\*為什麼要自定義模板？

默認的 Unity 模板不支持 Web3。 我們的自定義模板將

- 加載必要的 Web3 庫。
- 啟用 Kaia 錢包集成。
- 正確處理區塊鏈交互。
  :::

### 第 3 步：設置 index.html

將下面的代碼複製並粘貼到您的 `index.html` 文件中：

```
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

### 步驟 4：設置 Dapp 門戶 SDK

1. Visit: https://static.kaiawallet.io/js/dapp-portal-sdk.js
2. 將內容保存到 `scripts/dapp_portal_sdk.js` 中。  使用本地 Dapp Portal SDK 文件可提高加載時間和可靠性。

:::note
Alternatively, you can directly add the link to the Dapp Portal SDK as the `src` in the `script` tag in your `index.html`.

```js
// <script src="scripts/dapp_portal_sdk.js"></script>
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

:::

### 第 5 步：配置 Unity 以使用自定義模板

- 打開 "構建設置"。
- 導航至播放器設置。
- 在 "分辨率和列報 "下：
  - 查找 "WebGL 模板"。
  - 選擇 "KaiaTemplate"。
- 在 "發佈設置 "下的 "壓縮格式 "字段中選擇**已禁用**。

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)

### 第 6 步：構建您的 dApp

現在，讓我們將所有內容整合在一起：

1. 打開構建設置（文件 → 構建設置）。
2. 單擊 "構建並運行"。
3. 按照 Unity 上的提示保存構建項目，例如 "minidapp"。
4. 重要的構建文件：

```bash
minidapp/
├── minidapp.loader.js
├── minidapp.data
├── minidapp.framework.js
└── minidapp.wasm
```

### 第 7 步：構建後配置

創建項目後

1. 打開構建文件夾。
2. 注意所有生成的文件名。
3. 更新您的 index.html 以匹配這些名稱。
4. 保存更改並重建。
5. 現在你應該看到瀏覽器中打開了一個標籤頁。

![](/img/minidapps/unity-minidapp/ui_build_app.png)

### 第 8 步：將 WebGL 構建路由至 Localhost:3000

出於安全和開發目的，DApp Portal SDK 目前在 localhost:3000 上運行。 目前，默認的 Unity WebGL 編譯使用隨機端口（如 61445），為了讓我們的應用程序高效運行，我們需要將 Unity WebGL 編譯配置為在 localhost:3000 上打開。

為此，請按照以下步驟操作：

1. 在項目終端複製並粘貼以下代碼

```bash
# Install http-server globally
npm install -g http-server
```

2. 導航至構建文件夾

```bash
cd path/to/minidapp
```

3. 在 3000 端口啟動服務器

```bash
http-server -p 3000
```

![](/img/minidapps/unity-minidapp/lh_3000.png)

## 測試和運行應用程序

現在，我們的項目已經運行，讓我們對其進行測試和交互。

- 點擊連接錢包按鈕，連接到 Dapp Portal 錢包。
- 連接後，填寫詳細信息（金額），向連接的地址匯款。

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)
