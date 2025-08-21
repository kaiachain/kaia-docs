# Web3 集成

在本节中，我们将建立将 web3 集成到 Unity 项目的片段。

## 创建和部署 KIP7 智能合约

首先，我们使用 Kaia Contract Wizard 生成智能合约。

### 步骤 1：使用 Kaia 合同向导

1. 导航至 Kaia 合同向导。
2. 选择 KIP7（Kaia 的令牌标准，类似于 ERC20）。
3. 配置您的令牌：
   - 名称：名称： ExampleTestToken（或其他名称）
   - 符号：ET（您的代币代码）
   - Premint：100（初始代币供应）
   - 特点检查 ✅ 可造币

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
我们删除了 onlyOwner 修改器，以允许除原始部署者或合同所有者之外的任何人调用铸币厂函数。
:::

### 步骤 2：通过 Remix IDE 进行部署

1. 将上述代码复制并粘贴到 Remix IDE 上新建的文件 `ET.sol` 中。
2. 在 Remix IDE 中：
   - 点击**编译合同**按钮。
   - 在插件管理器中激活 **Kaia 插件**。
   - 在 Kaia 插件选项卡的环境下，选择 \*\* 注入提供程序\*\* - **Kaia 钱包**。
   - 在**合同**下拉菜单中找到您的合同（ExampleTokens）。
   - 点击 **部署**，启动令牌！
3. 当你的 Kaia 钱包弹出时：
   - 查看部署详情。
   - 单击 "确认 "将其部署到 Kaia Kairos Testnet。

:::important
复制并保存已部署的合同地址。 稍后的教程中会用到它。
:::

## 构建团结网-Web3 桥梁

现在，我们将创建 Unity 和 Web3 功能之间的重要连接。 这就是我们将区块链功能引入您的 Unity 应用程序的地方！

### 第 1 部分：创建插件桥（kaiaPlugin.jslib）

首先，我们将构建 JavaScript 桥接器，让 Unity 与 Web3 进行对话：

1. 创建插件目录：

```
Assets/
└── Plugins/
    └── WebGL/
        └── KaiaPlugin.jslib    // We'll create this file
```

2. 为什么要使用 .jslib？ 可以将其视为 Unity 的 C# 和浏览器的 JavaScript 之间的翻译器，这对于 Web3 交互至关重要！

3. 该插件将处理三个核心功能：
   - ConnectWallet() - 处理 Kaia 钱包连接
   - GetTokenBalance() - 检查令牌余额
   - MintTokens() - 管理代币铸造

在 VS Code 中打开该文件并粘贴 [Appendix A](convert-unity-liff.md#appendix-a) 中的`KaiaPlugin.jslib`源代码：

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

\*\*Web3Manager有哪些功能？

- 担任 Web3 所有业务的主要指挥。
- 管理与 JavaScript 插件的通信。
- 根据区块链事件更新 UI 元素。
- 处理所有钱包和令牌操作。
- 将 "连接钱包 "和 "薄荷 "按钮与各自的功能连接起来
  :::

2. 在 VS Code 中打开该文件，并粘贴 [Appendix B](convert-unity-liff.md#appendix-b) 中的 `Web3Manager.cs` 源代码。

### 第 3 部分：设置 Web3Manager 游戏对象

最后，让我们在 Unity 中实现这一切：

1. 创建管理器对象：
   - 在 "层次结构 "窗口（根层）中单击右键。
   - 选择 "创建空对象"。
   - 将其命名为 "Web3Manager"。
2. 附上您的剧本：
   - 选择 Web3Manager 游戏对象。
   - 在 "检查器 "中，单击 "添加组件"。
   - 搜索并选择 "Web3Manager"。
3. 连接用户界面元素
   - 选择 Web3Manager 后，查看检查器。
   - 将用户界面元素从层次结构拖放到相应的字段中：
     - 状态文本
     - 地址文本
     - 令牌余额文本
     - 连接、断开、薄荷按钮
     - 输入字段

![](/img/minidapps/unity-minidapp/connect-ui-manager.png)
