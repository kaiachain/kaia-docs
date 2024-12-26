# 构建 Unity 应用程序

## 前提条件

在我们开始之前，请确保您拥有

- 在您的计算机上安装[Unity Hub](https://unity.com/download)--我们将在此构建 dApp 界面
- 基本的 C# 和 JavaScript 知识 - 不用太花哨，只需基本知识
- [Kaia 钱包扩展](https://www.kaiawallet.io/) - 您需要它来测试您的 dApp 的 Web3 功能
- LINE Developer 账户--您可以使用电子邮件轻松创建一个账户
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

- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写检查器窗格中的 "文本输入 "字段，例如 "检查 web3"。

:::note
**TextMeshPro（TMP）设置**

首次创建 TextMeshPro 元素时（用户界面 - 文本 - TextMeshPro），Unity 会自动提示您导入 TMP Essentials。 如果不小心跳过此提示，可以通过窗口 > TextMeshPro > 导入 TMP Essentials 手动导入。

为什么需要TextMeshPro 需要核心资源（着色器、默认字体和材质）才能在游戏中正确显示文本。 如果没有这些基本要素，您的文本组件将无法正确渲染，您将在项目中看到着色器/材质错误。 这是文本正常工作所必需的一次性设置。
:::

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)

- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写检查器窗格中的 "文本输入 "字段，例如 "检查 web3"。
- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写检查器窗格中的 "文本输入 "字段，例如 "检查 web3"。
- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写检查器窗格中的 "文本输入 "字段，例如 "检查 web3"。

```code
├── StatusText (TextMeshPro)
│   └── Default: "Checking Web3..."
├── AddressText (TextMeshPro)
│   └── Default: "Not Connected"
├── NetworkText (TextMeshPro)
│   └── Default: "No Network"
└── TokenBalanceText (TextMeshPro)
    └── Default: "0.0000 UTT"
```

#### 状态面板组件

您的主要交互按钮：

- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写检查器窗格中的 "文本输入 "字段，例如 "检查 web3"。
- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写检查器窗格中的 "文本输入 "字段，例如 "检查 web3"。

```code
ButtonPanel
├── ConnectButton (Button - TextMeshPro)
│   └── Text: "Connect Wallet"
└── RefreshButton (Button - TextMeshPro)
    └── Text: "Refresh Balance"
```

#### MintPanel 组件

代币铸造界面：

- 右键单击 MintPanel，单击用户界面 → 传统 → 输入字段，然后将其重命名为 MintAddressInput。 确保在 Inspector pane 的占位符 "文本输入 "字段中填入 "输入地址..."。
- 右键单击 MintPanel，单击用户界面 → 传统 → 输入字段，然后将其重命名为 MintAmountInput。 确保在 Inspector pane 的占位符 "Text Input" 字段中填入 "输入金额…"。
- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写 Inspector pane 中的 "文本输入 "字段，例如 "检查 web3"。

```code
MintPanel
├── MintAddressInput (Legacy Input Field)
│   └── Placeholder: "Enter Address..."
├── MintAmountInput (Legacy Input Field)
│   └── Placeholder: "Enter Amount..."
└── MintButton (Button - TextMeshPro)
    └── Text: "Mint Tokens"
```

创建所有组件后，您的层次结构应如下所示：

```code
Canvas
└── Web3UI
    ├── StatusPanel
    ├── ButtonPanel
    └── MintPanel
```

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)

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
   - 名称：UnityTestToken （或其他名称）
   - 符号：UTT（您的代币代码）
   - 预铸币100（初始代币供应）
   - 功能：检查 ✅ 可铸造

在本指南中，我们将调整 mint 函数，使其不包含 onlyOwner 修饰符。 为此，我们必须删除 ownable.sol 导入和 Ownable 继承。 调整后的代码现在应该是这样的：

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@kaiachain/contracts/KIP/token/KIP7/KIP7.sol";
contract UnityTestToken is KIP7 {
    constructor() KIP7("UnityTestToken", "UTT") {
        _mint(msg.sender, 1000 * 10 ** decimals());
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
    function mint(address to, uint256 amount) public  {
        _mint(to, amount);
    }
}
```

:::info
我们删除了 onlyOwner 修饰符，以允许除原始部署者或合约所有者之外的任何人调用铸币厂函数。
:::

#### 步骤 2：通过 Remix IDE 进行部署

1. 将上述代码复制并粘贴到 Remix IDE 上新建的文件 `UTT.sol` 中。
2. 在 Remix IDE 中：
   - 单击**Compile contract**按钮。
   - 在插件管理器中激活 **Kaia 插件**。
   - 在 "Kaia 插件 "选项卡的 "环境 "下，选择**注入的提供程序** - **Kaia钱包**。
   - 在**合同**下拉菜单中找到您的合同（UnityTestToken）。
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

3. 该插件将处理五个核心功能：
   - InitializeWeb3() - 设置 Web3 环境
   - ConnectWallet() - 处理 Kaia 钱包连接
   - GetTokenBalance() - 检查令牌余额
   - MintTokens() - 管理代币铸造
   - EnableWebGLCopyPaste() - 添加剪贴板支持

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
     - AddressText
     - TokenBalanceText
     - Connect/Refresh/Mint buttons
     - Input fields

![](/img/minidapps/unity-minidapp/connect-ui-manager.png)

## 连接 C# 脚本与游戏对象

在本节中，我们将把以下按钮与 Web3Manager 脚本中的相应功能连接起来：

### A. 连接钱包

- 从 "层次结构 "窗口单击 "连接按钮"。
- 点击 ➕ 按钮，添加 OnClick() 函数。
- 将 Web3Manager 游戏对象脚本拖入 OnClick() 函数。
- 点击无功能 → Web3Manager → ConnectToWallet()。

![](/img/minidapps/unity-minidapp/ui-connect-wallet.png)

### B. 刷新平衡

- 单击 "层次结构 "窗口中的 "刷新平衡按钮"。
- 点击 ➕ 按钮，添加 OnClick() 函数。
- 将 Web3Manager 游戏对象拖入 None 对象字段。
- 点击无功能 → Web3Manager → RefreshBalance()。

### C. 铸造按钮

- 从层次结构窗口点击 MintButton。
- 点击 ➕ 按钮，添加 OnClick() 函数。
- 将 Web3Manager 游戏对象拖入 None 对象字段。
- 点击无功能 → Web3Manager → MintTokens()。

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
            └── web3.min.js
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
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Unity WebGL - Mini dApp</title>
    <script src="./scripts/web3.min.js"></script>
    <style>
      body { margin: 0; }
      #unity-canvas { width: 100%; height: 100vh; display: block; }
    </style>
  </head>
  <body>
    <div id="loading">Loading...</div>
    <canvas id="unity-canvas"></canvas>
    <script src="Build/minidapp.loader.js"></script>
    <script>
      console.log("Script starting...");
      var myGameInstance = null;
      
      createUnityInstance(document.querySelector("#unity-canvas"), {
        dataUrl: "Build/minidapp.data.unityweb",
        frameworkUrl: "Build/minidapp.framework.js.unityweb",
        codeUrl: "Build/minidapp.wasm.unityweb",
      }).then((unityInstance) => {
        console.log("Unity instance created");
        myGameInstance = unityInstance;
        document.getElementById('loading').style.display = 'none';
      }).catch((error) => {
        console.error('Unity instance error:', error);
        document.getElementById('loading').textContent = 'Error loading game: ' + error;
      });
    </script>
  </body>
</html>

```

### 步骤 4：设置 Web3.min.js

1. 访问：https://cdn.jsdelivr.net/npm/web3@4.15.0/dist/web3.min.js
2. 将内容保存到您的 `scripts/web3.min.js`。  使用本地 Web3.js 文件可提高加载时间和可靠性。

### 第 5 步：配置 Unity 以使用自定义模板

- 打开 "构建设置"。
- 导航至播放器设置。
- 在 "分辨率和列报 "下：
  - 查找 "WebGL 模板"。
  - 选择 "KaiaTemplate"。

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)

### 第 6 步：构建您的 dApp

现在，让我们将所有内容整合在一起：

1. 打开构建设置（文件 → 构建设置）。
2. 单击 "构建并运行"。
3. 创建名为 "minidapp "的新文件夹。
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

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)

## 测试和运行应用程序

现在，我们的项目已经运行，让我们对其进行测试和交互。

- 点击连接钱包按钮，连接到 Kaia 钱包。
- 连接后，填写详细信息（地址和金额），即可向连接地址或任何指定地址发送代币。

![](/img/minidapps/unity-minidapp/create-unity-mini-dApp.png)
