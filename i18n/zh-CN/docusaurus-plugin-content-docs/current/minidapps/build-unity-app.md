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

为什么需要TextMeshPro 需要核心资源（着色器、默认字体和材质）才能在游戏中正确显示文本。 Without these essentials, your text components won't render correctly and you'll see shader/material errors in your project. This is a one-time setup that's necessary for text to work properly.
:::

![](/img/minidapps/unity-minidapp/statusText-textInput.png)

- Right click on StatusPanel, click on UI → Text - TextMeshPro and then rename to AddressText. Make sure to fill the "Text Input" field in the Inspector pane e.g. "Not Connected".
- Right click on StatusPanel, click on UI → Text - TextMeshPro and then rename to NetworkText. Make sure to fill the "Text Input" field in the Inspector pane "No Network".
- Right click on StatusPanel, click on UI → Text - TextMeshPro and then rename to TokenBalanceText. Make sure to fill the "Text Input" field in the Inspector pane e.g. "0.0000 UTT".

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

#### ButtonPanel Components

Your main interaction buttons:

- Right click on ButtonPanel, click on UI → Button - TextMeshPro and then rename it to ConnectButton. Make sure to fill the "Text Input" field in the Inspector pane with "Connect Wallet".
- Right click on ButtonPanel, click on UI → Button - TextMeshPro and then rename to RefreshButton. Make sure to fill the "Text Input" field in the Inspector pane with "Refresh Balance".

```code
ButtonPanel
├── ConnectButton (Button - TextMeshPro)
│   └── Text: "Connect Wallet"
└── RefreshButton (Button - TextMeshPro)
    └── Text: "Refresh Balance"
```

#### MintPanel Components

The token minting interface:

- Right click on MintPanel, click on UI → Legacy →  Input Field and then rename it to MintAddressInput. Make sure to fill the placeholder "Text Input" field in the Inspector pane with "Enter Address...".
- Right click on MintPanel, click on UI → Legacy →  Input Field and then rename it to MintAmountInput. Make sure to fill the placeholder "Text Input" field in the Inspector pane with "Enter Amount…".
- Right click on MintPanel, click on UI →  Button - TextMeshPro  and then rename it to MintButton. Make sure to fill the "Text Input" field in the Inspector pane with "Mint Tokens…".

```code
MintPanel
├── MintAddressInput (Legacy Input Field)
│   └── Placeholder: "Enter Address..."
├── MintAmountInput (Legacy Input Field)
│   └── Placeholder: "Enter Amount..."
└── MintButton (Button - TextMeshPro)
    └── Text: "Mint Tokens"
```

After creating all components, your hierarchy should look like this:

```code
Canvas
└── Web3UI
    ├── StatusPanel
    ├── ButtonPanel
    └── MintPanel
```

![](/img/minidapps/unity-minidapp/unity-ui-canvas.png)

:::note
For your component to be well arranged as seen in the image above, you have to manually arrange them with the icon on the right-hand side when you click on each component.
:::

## Setting Up Web3 Integration

In this section, we will build up pieces to integrate web3 into our Unity project.

### Creating and deploying KIP7 smart contract

First, we'll use Kaia Contract Wizard to generate our smart contract.

#### Step 1: Using Kaia Contract Wizard

1. Navigate to Kaia Contract Wizard.
2. Select KIP7 (Kaia's token standard, similar to ERC20).
3. Configure your token:
   - Name: UnityTestToken (or something else!)
   - Symbol: UTT (your token's ticker)
   - Premint: 100 (initial token supply)
   - Features: Check ✅ Mintable

For this guide, we will tweak the mint function not to have onlyOwner modifier. To do this, we have to remove the ownable.sol import, and Ownable inheritance. The tweaked code should now look like this:

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
We removed the onlyOwner modifier to allow anyone to call the mint function other than the original deployer or owner of the contract.
:::

#### Step 2: Deploying via Remix IDE

1. Copy and Paste the code above in a newly created file `UTT.sol` on Remix IDE.
2. In Remix IDE:
   - Click the **Compile contract** button.
   - Activate the **Kaia plugin** in the plugin manager.
   - Under Environment in the Kaia Plugin tab, choose **Injected Provider** - **Kaia Wallet**.
   - Find your contract (UnityTestToken) in the **Contract** dropdown.
   - Click **Deploy** to launch your token!
3. When your Kaia Wallet pops up:
   - Review the deployment details.
   - Click Confirm to deploy to Kaia Kairos Testnet.

:::important
Copy and save the deployed contract address. You'll need it later in the tutorial.
:::

## Building the Unity-Web3 Bridge

Now we'll create the vital connection between Unity and Web3 functionality. This is where we bring blockchain capabilities into your Unity application!

### Part 1: Creating the Plugin Bridge (kaiaPlugin.jslib)

First, we'll build our JavaScript bridge that lets Unity talk to Web3:

1. Create your plugin directory:

```
Assets/
└── Plugins/
    └── WebGL/
        └── KaiaPlugin.jslib    // We'll create this file
```

2. Why a .jslib? Think of it as a translator between Unity's C# and the browser's JavaScript - essential for Web3 interactions!

3. The plugin will handle five core functions:
   - InitializeWeb3() - Sets up your Web3 environment
   - ConnectWallet() - Handles Kaia Wallet connections
   - GetTokenBalance() - Checks token balances
   - MintTokens() - Manages token minting
   - EnableWebGLCopyPaste() - Adds clipboard support

Open this file in VS Code and paste the `KaiaPlugin.jslib` source code in [Appendix A](../minidapps/convert-unity-liff.md#appendix-a):

### Part 2: Creating the C# Manager (Web3Manager.cs)

Next, we'll create our C# script to manage all Web3 operations:

1. Create your scripts directory:

```js
Assets/
└── Scripts/
    └── Web3/
        └── Web3Manager.cs    // We'll create this file
```

:::info

**What does Web3Manager do?**

- Acts as the main conductor for all Web3 operations.
- Manages communication with our JavaScript plugin.
- Updates UI elements based on blockchain events.
- Handles all wallet and token operations.
  :::

2. Open this file in VS Code and paste the `Web3Manager.cs` source code in [Appendix B](../minidapps/convert-unity-liff.md#appendix-b)

### Part 3: Setting Up the Web3Manager GameObject

Finally, let's bring it all together in Unity:

1. Create the Manager Object:
   - Right-click in the Hierarchy window (root level).
   - Select "Create Empty Object".
   - Name it "Web3Manager".
2. Attach Your Script:
   - Select the Web3Manager GameObject.
   - In Inspector, click Add Component.
   - Search for and select "Web3Manager".
3. Connect UI Elements:
   - With Web3Manager selected, look in the Inspector.
   - Drag and drop your UI elements from the Hierarchy to the corresponding fields:
     - StatusText
     - AddressText
     - NetworkText
     - TokenBalanceText
     - Connect/Refresh/Mint buttons
     - Input fields

![](/img/minidapps/unity-minidapp/connect-ui-manager.png)

## Connecting C# Script with game objects

In this section, we will connect the following buttons with their respective functions from the Web3Manager script:

### A. ConnectWallet

- Click on ConnectButton from the Hierarchy window.
- Add an OnClick() function by clicking on the ➕ button.
- Drag the Web3Manager game object script into the OnClick() function.
- Click on No Function → Web3Manager → ConnectToWallet().

![](/img/minidapps/unity-minidapp/ui-connect-wallet.png)

### B. RefreshBalance

- Click on RefreshBalanceButton from the Hierarchy window.
- Add an OnClick() function by clicking on the ➕ button.
- Drag the Web3Manager game object into None object field.
- Click on No Function → Web3Manager → RefreshBalance().

### C. MintButton

- Click on MintButton from the Hierarchy window.
- Add an OnClick() function by clicking on the ➕ button.
- Drag the Web3Manager game object into None object field.
- Click on No Function → Web3Manager → MintTokens().

## Setting Up WebGL Build Settings

In this section, we will configure our dApp for the web! This will configure Unity for Web3 compatibility and create a custom template for Kaia integration.

### Step 1: Switch to WebGL Platform

1. Navigate to File → Build Settings.
2. Select WebGL and click "Switch Platform".

:::note
This might take a few minutes if it's your first time switching.
:::

![](/img/minidapps/unity-minidapp/ui-webgl-switch.png)

### Step 2: Creating a Custom WebGL Template

We need a custom template to integrate Web3 capabilities. Here's our folder structure:

```code
Assets/
└── WebGLTemplates/
    └── KaiaTemplate/
        ├── index.html
        └── scripts/
            └── web3.min.js
```

:::info
**Why Custom Template?**

The default Unity template doesn't include Web3 support. Our custom template will:

- Load necessary Web3 libraries.
- Enable Kaia Wallet integration.
- Handle blockchain interactions properly.
  :::

### Step 3: Setting Up index.html

Copy and paste the code below in your `index.html` file:

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

### Step 4: Setting Up Web3.min.js

1. Visit: https://cdn.jsdelivr.net/npm/web3@4.15.0/dist/web3.min.js
2. Save the content to your `scripts/web3.min.js`.  Using a local Web3.js file improves load times and reliability.

### Step 5: Configure Unity to Use Custom Template

- Open Build Settings.
- Navigate to Player Settings.
- Under "Resolution and Presentation":
  - Find "WebGL Template".
  - Select "KaiaTemplate".

![](/img/minidapps/unity-minidapp/ui-select-webgl-temp.png)

### Step 6: Building Your dApp

Now Let's bring it all together:

1. Open Build Settings (File → Build Settings).
2. Click "Build And Run".
3. Create a new folder named "minidapp".
4. Important Build Files:

```bash
minidapp/
├── minidapp.loader.js
├── minidapp.data
├── minidapp.framework.js
└── minidapp.wasm
```

### Step 7: Post-Build Configuration

After building your project,

1. Open your build folder.
2. Note all generated file names.
3. Update your index.html to match these names.
4. Save changes and rebuild.
5. You should now see a tab opened in your browser.

![](/img/minidapps/unity-minidapp/ui-build-app.png)

## Testing and running application

Now that we have our project running, let’s test and interact with it.

- Click on the Connect Wallet button to connect to Kaia Wallet.
- Once connected, fill in details (address and amount) to mint tokens to the connected address or any stipulated address.

![](/img/minidapps/unity-minidapp/minidapp.gif)
