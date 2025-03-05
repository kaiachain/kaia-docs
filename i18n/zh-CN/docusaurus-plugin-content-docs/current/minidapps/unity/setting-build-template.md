# 配置 WebGL 构建设置

在本节中，我们将为网络配置 dApp！ 这将配置 Unity 与 Web3 兼容，并为 Kaia 集成创建自定义模板。

## 步骤 1：切换到 WebGL 平台

1. 导航至文件 → 构建设置。
2. 选择 WebGL 并点击 "切换平台"。

:::note
如果是第一次切换，可能需要几分钟时间。
:::

![](/img/minidapps/unity-minidapp/ui-webgl-switch.png)

## 步骤 2：创建自定义 WebGL 模板

我们需要一个自定义模板来集成 Web3 功能。 这是我们的文件夹结构：

```code
Assets/
└── WebGLTemplates/
    └── KaiaTemplate/
        ├── index.html
        └── scripts/
            └── dapp_portal_sdk.js
```

:::info

\*\*为什么要定制模板？

默认的 Unity 模板不支持 Web3。 我们的定制模板将

- 加载必要的 Web3 库。
- 启用 Kaia 钱包集成。
- 正确处理区块链互动。
 :::

## 步骤 3：设置 index.html

将下面的代码复制并粘贴到您的 `index.html` 文件中：

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

## 步骤 4：设置 Dapp 门户 SDK

1. 访问：https://static.kaiawallet.io/js/dapp-portal-sdk.js
2. 将内容保存到 `scripts/dapp_portal_sdk.js` 中。  使用本地 Dapp Portal SDK 文件可提高加载时间和可靠性。

:::note
或者，您也可以直接将 Dapp Portal SDK 的链接作为 `src` 添加到您的 `index.html` 中的 `script` 标签中。

```js
// <script src="scripts/dapp_portal_sdk.js"></script>
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

:::

## 第 5 步：配置统一系统以使用自定义模板

- 打开 "构建设置"。
- 导航至播放器设置。
- 在 "决议和列报 "下：
 - 找到 "WebGL 模板"。
 - 选择 "KaiaTemplate"。
- 在 "发布设置 "下的 "压缩格式 "字段中选择**已禁用**。

![](/img/minidapps/unity-minidapp/ui-select-webgl-temp.png)

## 第 6 步：构建您的 dApp

现在，让我们把这一切联系起来：

1. 打开 "构建设置"（文件 → 构建设置）。
2. 点击 "构建并运行"。
3. 按照 Unity 上的提示保存构建项目，例如 "minidapp"。
4. 重要的构建文件：

```bash
minidapp/
├── minidapp.loader.js
├── minidapp.data
├── minidapp.framework.js
└── minidapp.wasm
```

## 第 7 步：构建后配置

创建项目后

1. 打开构建文件夹。
2. 注意所有生成的文件名。
3. 更新您的 index.html 以匹配这些名称。
4. 保存更改并重建。
5. 现在你应该看到浏览器中打开了一个标签页。

![](/img/minidapps/unity-minidapp/ui_build_app.png)

## 第 8 步：将 WebGL 构建路由至 Localhost:3000

出于安全和开发目的，DApp Portal SDK 目前在 localhost:3000 上运行。 目前，默认的 Unity WebGL 编译使用随机端口（如 61445），为了让我们的应用程序高效运行，我们需要将 Unity WebGL 编译配置为在 localhost:3000 上打开。

为此，请按照以下步骤操作：

1. 在项目终端复制并粘贴以下代码

```bash
# Install http-server globally
npm install -g http-server
```

2. 导航至构建文件夹

```bash
cd path/to/minidapp
```

3. 在 3000 端口启动服务器

```bash
http-server -p 3000
```

![](/img/minidapps/unity-minidapp/lh_3000.png)

## 测试和运行应用程序

现在，我们的项目已经运行，让我们对其进行测试和交互。

- 点击连接钱包按钮，连接到 Dapp Portal 钱包。
- 连接后，填写详细信息（金额），向连接的地址汇款。

![](/img/minidapps/unity-minidapp/minidapp.gif)







