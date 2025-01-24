# 构建 Unity 应用程序

## 前提条件

在我们开始之前，请确保您拥有

- 在您的计算机上安装[Unity Hub](https://unity.com/download)--我们将在此构建 dApp 界面
- 基本的 C# 和 JavaScript 知识 - 不用太花哨，只需基本知识
- LINE Developer 账户--您可以使用电子邮件轻松创建一个账户
- 测试 Kaia，来自 [Kaia 水龙头](https://faucet.kaia.io/)
- 从 Dapp Portal 团队获得的 Dapp Portal SDK 客户 ID。
- 熟悉一些 Web3 概念--如果你了解钱包和代币，就可以使用了。

## 设置 Unity 环境

让我们来设置开发环境。 我们将从 Unity 设置开始。

### 第 1 步：安装并验证 Unity 版本

首先，确保我们使用的是相同的 Unity 版本，以避免出现任何兼容性问题：

- 如果尚未安装 Unity Hub，请安装。
- 具体安装 2022.3.50f1 版 Unity 编辑器。

### 第 2 步：创建新的 Unity 项目

1. 打开 Unity Hub 并转到 "项目 "选项卡。
2. 点击右上角的 "新建项目 "按钮。
3. 在 "所有模板 "下，选择 **3D（内置渲染管道）** 模板。
4. 给您的项目起一个有意义的名称（例如，mini-dApp-example）。
5. 为项目文件选择一个方便的位置。
6. 点击 **创建项目**。

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)

## 创建 dApp 的用户界面组件

在本部分中，我们将构建 dApp 的用户界面！ 我们将创建一个结构化的用户界面系统，其中有三个主要面板，分别用于状态更新、操作和铸币功能。

### 设置主画布

首先，让我们创建基本画布：

1. 在 "层次结构 "窗口中，右键单击 "示例场景"。
2. 导航至 GameObject → UI → 画布。

### 创建 Web3UI 容器

1. 右键单击新画布。
2. 选择 "创建空"。
3. 重命名为 "Web3UI"。

### 设置主面板

在 Web3UI 中创建三个面板对象：

1. 右键单击 Web3UI 并选择 "创建空"。
2. 创建并重命名这些面板：
   - StatusPanel - 您的 dApp 的信息显示屏
   - 按钮面板 - 用于用户交互
   - MintPanel - 用于代币铸币功能

### 创建面板组件

#### 状态面板组件

该面板显示所有重要的 Web3 信息：

- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写检查器窗格中的 "文本输入 "字段，例如 "状态......"

:::note
**TextMeshPro（TMP）设置**

首次创建 TextMeshPro 元素时（用户界面 - 文本 - TextMeshPro），Unity 会自动提示您导入 TMP Essentials。 如果不小心跳过此提示，可以通过窗口 > TextMeshPro > 导入 TMP Essentials 手动导入。

为什么需要TextMeshPro 需要核心资源（着色器、默认字体和材质）才能在游戏中正确显示文本。 如果没有这些基本要素，您的文本组件将无法正确渲染，您将在项目中看到着色器/材质错误。 这是文本正常工作所必需的一次性设置。
:::

![](/img/minidapps/unity-minidapp/status_text.png)

- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写文本对象，例如 "地址文本......"
- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写文本对象，例如 "0.0000 ET"

```code
├── StatusText (TextMeshPro)
│   └── Default: "Status..."
├── AddressText (TextMeshPro)
│   └── Default: "Address Text..."
└── TokenBalanceText (TextMeshPro)
    └── Default: "0.0000 ET"
```

#### 状态面板组件

您的主要交互按钮：

- 右键单击 ButtonPanel，单击 UI → Button - TextMeshPro，然后将其重命名为 ConnectWalletButton。 确保填写检查器窗格中的 "文本输入 "字段，例如 "检查 web3"。

```code
ButtonPanel
├── ConnectButton (Button - TextMeshPro)
│   └── Text: "Connect Wallet"
```

#### MintPanel 组件

代币铸造界面：

- 右键单击 MintPanel，单击用户界面 → 输入字段 → TextMeshPro，然后重命名为 MintAmountInput。 确保在占位符对象上填写 "输入金额…"
- 右键单击 MintPanel，单击用户界面 → 按钮 → TextMeshPro，然后重命名为 MintButton。 确保用 "薄荷 "填充文本对象

```code
MintPanel
├── MintAmountInput (Input Field - TextMeshPro)
│   └── Placeholder: "Enter Amount..."
└── MintButton (Button - TextMeshPro)
    └── Text: "Mint"
```

创建所有组件后，您的层次结构应如下所示：

```code
Canvas
└── Web3UI
    ├── StatusPanel
    ├── ButtonPanel
    └── MintPanel
```

![](/img/minidapps/unity-minidapp/unity_ui_canvas.png)

:::note
要使组件排列整齐如上图所示，必须在点击每个组件时使用右侧的图标手动排列。
:::

## 设置 Web3 集成

在本节中，我们将把 web3 集成到 Unity 项目中。

### 创建和部署 KIP7 智能合约

首先，我们使用 Kaia Contract Wizard 生成智能合约。

#### 步骤 1：使用 Kaia 合同向导

1. 导航至 Kaia 合约向导。
2. 选择 KIP7（Kaia 的代币标准，类似于 ERC20）。
3. 配置您的代币：
   - 名称：名称： ExampleTestToken（或其他名称）
   - 符号：ET（您的代币代码）
   - 预铸币100（初始代币供应）
   - 功能：检查 ✅ 可铸造

在本指南中，我们将调整 mint 函数，使其不包含 onlyOwner 修饰符。 为此，我们必须删除 ownable.sol 导入和 Ownable 继承。 调整后的代码现在应该是这样的：

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
我们删除了 onlyOwner 修饰符，以允许除原始部署者或合约所有者之外的任何人调用铸币厂函数。
:::

#### 步骤 2：通过 Remix IDE 进行部署

1. 将上述代码复制并粘贴到 Remix IDE 上新建的文件 `ET.sol` 中。
2. 在 Remix IDE 中：
   - 单击**Compile contract**按钮。
   - 在插件管理器中激活 **Kaia 插件**。
   - 在 "Kaia 插件 "选项卡的 "环境 "下，选择**注入的提供程序** - **Kaia钱包**。
   - 在**合同**下拉菜单中找到您的合同（ExampleTokens）。
   - 点击 **部署**，发布代币！
3. 当您的 Kaia 钱包弹出时：
   - 查看部署详情。
   - 单击确认以部署到 Kaia Kairos Testnet。

:::important
复制并保存已部署的合同地址。 本教程稍后会用到它。
:::

## 构建 Unity-Web3 桥接器

现在，我们将创建 Unity 和 Web3 功能之间的重要连接。 这就是我们将区块链功能引入 Unity 应用程序的地方！

### 第 1 部分：创建插件桥（kaiaPlugin.jslib）

首先，我们将构建 JavaScript 桥接器，让 Unity 与 Web3 进行对话：

1. 创建插件目录：

```
Assets/
└── Plugins/
    └── WebGL/
        └── KaiaPlugin.jslib    // We'll create this file
```

2. 为什么要使用 .jslib？ 将其视为 Unity 的 C# 和浏览器的 JavaScript 之间的翻译器--这对 Web3 交互至关重要！

3. 该插件将处理三个核心功能：
   - ConnectWallet() - 处理 Kaia 钱包连接
   - GetTokenBalance() - 检查令牌余额
   - MintTokens() - 管理代币铸造

在 VS Code 中打开此文件并粘贴 [Appendix A](../minidapps/convert-unity-liff.md#appendix-a) 中的`KaiaPlugin.jslib`源代码：

### 第 2 部分：创建 C# 管理器 (Web3Manager.cs)

接下来，我们将创建 C# 脚本来管理所有 Web3 操作：

1. 创建脚本目录：

```js
Assets/
└── Scripts/
    └── Web3/
        └── Web3Manager.cs    // We'll create this file
```

:::info

\*\*Web3Manager 做什么？

- 充当所有 Web3 操作的主要导体。
- 管理与 JavaScript 插件的通信。
- 根据区块链事件更新用户界面元素。
- 处理所有钱包和代币操作。
- 将 "连接钱包 "和 "薄荷 "按钮与各自的功能连接起来
  :::

2. 在 VS Code 中打开此文件，并粘贴 [Appendix B](../minidapps/convert-unity-liff.md#appendix-b) 中的 `Web3Manager.cs` 源代码。

### 第 3 部分：设置 Web3Manager 游戏对象

最后，让我们将所有内容整合到 Unity 中：

1. 创建管理器对象：
   - 在 "层次结构 "窗口（根层）中单击右键。
   - 选择 ""Create Empty Object"。
   - 将其命名为 "Web3Manager"。
2. 附加脚本：
   - 选择 Web3Manager GameObject。
   - 在 "检查器 "中，单击 "添加组件"。
   - 搜索并选择 "Web3Manager"。
3. 连接用户界面元素：
   - 选择 Web3Manager 后，查看检查器。
   - 将用户界面元素从层次结构拖放到相应字段：
     - StatusText
     - AddressText
     - TokenBalanceText
     - 连接/薄荷按钮
     - Input fields

![](/img/minidapps/unity-minidapp/connect_ui_manager.png)

## 设置 WebGL 构建设置

在本节中，我们将为网络配置 dApp！ 这将配置 Unity 以兼容 Web3，并为 Kaia 集成创建自定义模板。

### 步骤 1：切换到 WebGL 平台

1. 导航至文件 → 生成设置。
2. 选择 WebGL 并单击 "切换平台"。

:::note
如果是第一次切换，可能需要几分钟。
:::

![](/img/minidapps/unity-minidapp/ui-webgl-switch.png)

### 步骤 2：创建自定义 WebGL 模板

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
\*\*为什么要自定义模板？

默认的 Unity 模板不支持 Web3。 我们的自定义模板将

- 加载必要的 Web3 库。
- 启用 Kaia 钱包集成。
- 正确处理区块链交互。
  :::

### 第 3 步：设置 index.html

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

### 步骤 4：设置 Dapp 门户 SDK

1. 访问：https://static.kaiawallet.io/js/dapp-portal-sdk.js
2. 将内容保存到 `scripts/dapp_portal_sdk.js` 中。  使用本地 Dapp Portal SDK 文件可提高加载时间和可靠性。

:::note
或者，您也可以直接将 Dapp Portal SDK 的链接作为 `src` 添加到您的 `index.html` 中的 `script` 标签中。

```js
// <script src="scripts/dapp_portal_sdk.js"></script>
<script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>
```

:::

### 第 5 步：配置 Unity 以使用自定义模板

- 打开 "构建设置"。
- 导航至播放器设置。
- 在 "分辨率和列报 "下：
  - 查找 "WebGL 模板"。
  - 选择 "KaiaTemplate"。
- 在 "发布设置 "下的 "压缩格式 "字段中选择**已禁用**。

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)

### 第 6 步：构建您的 dApp

现在，让我们将所有内容整合在一起：

1. 打开构建设置（文件 → 构建设置）。
2. 单击 "构建并运行"。
3. 按照 Unity 上的提示保存构建项目，例如 "minidapp"。
4. 重要的构建文件：

```bash
minidapp/
├── minidapp.loader.js
├── minidapp.data
├── minidapp.framework.js
└── minidapp.wasm
```

### 第 7 步：构建后配置

创建项目后

1. 打开构建文件夹。
2. 注意所有生成的文件名。
3. 更新您的 index.html 以匹配这些名称。
4. 保存更改并重建。
5. 现在你应该看到浏览器中打开了一个标签页。

![](/img/minidapps/unity-minidapp/ui_build_app.png)

### 第 8 步：将 WebGL 构建路由至 Localhost:3000

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

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)
