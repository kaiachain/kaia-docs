# 创建用户界面

在本节中，我们将构建 dApp 的用户界面！ 我们将创建一个结构化的用户界面系统，其中有三个主要面板，分别用于状态更新、操作和铸币功能。

## 设置主画布

首先，让我们创建基础画布：

1. 在 "层次结构 "窗口中，右键单击 "样本场景"。
2. 导航至 GameObject → UI → 画布。

## 创建 Web3UI 容器

1. 右键单击新画布。
2. 选择 "创建空"。
3. 将其重命名为 "Web3UI"。

## 设置主面板

在 Web3UI 中创建三个面板对象：

1. 右键单击 Web3UI 并选择 "创建空"。
2. 创建并重新命名这些面板：
   - StatusPanel - 您的 dApp 信息显示屏
   - 按钮面板 - 用于用户交互
   - MintPanel - 用于代币铸造功能

## 创建面板组件

### 状态面板组件

该面板显示所有重要的 Web3 信息：

- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 StatusText。 确保填写检查器窗格中的 "文本输入 "字段，例如 "状态......"

:::note
**TextMeshPro（TMP）设置**

首次创建 TextMeshPro 元素时（用户界面 - 文本 - TextMeshPro），Unity 会自动提示您导入 TMP Essentials。 如果不小心跳过此提示，可以通过窗口 > TextMeshPro > 导入 TMP Essentials 手动导入。

我们为什么需要它TextMeshPro 需要核心资源（着色器、默认字体和材质）才能在游戏中正确显示文本。 如果没有这些基本要素，您的文本组件将无法正确渲染，您将在项目中看到着色器/材质错误。 这是文本正常运行所必需的一次性设置。
:::

![](/img/minidapps/unity-minidapp/status_text.png)

- 右键单击 StatusPanel，单击 UI → Text - TextMeshPro，然后重命名为 AddressText。 确保填写文本对象，例如 "地址文本......"
- 右键点击 StatusPanel，点击 UI → Text - TextMeshPro，然后重命名为 TokenBalanceText。 确保填写文本对象，例如 "0.0000 ET"

```code
├── StatusText (TextMeshPro)
│   └── Default: "Status..."
├── AddressText (TextMeshPro)
│   └── Default: "Address Text..."
└── TokenBalanceText (TextMeshPro)
    └── Default: "0.0000 ET"
```

### 按钮面板组件

您的主要互动按钮

- 右键单击 ButtonPanel，单击 UI → Button - TextMeshPro，然后将其重命名为 ConnectWalletButton。 确保在 "检查器 "窗格的 "文本输入 "字段中填入 "连接钱包"。

- 右键单击 ButtonPanel，单击 UI → Button - TextMeshPro，然后将其重命名为 DisconnectWalletButton。 确保在 "检查器 "窗格的 "文本输入 "字段中填入 "断开钱包连接"。

```code
ButtonPanel
├── ConnectWalletButton (Button - TextMeshPro)
│   └── Text: "Connect Wallet"
├── DisconnectWalletButton (Button - TextMeshPro)
│   └── Text: "Disconnect Wallet"
```

### MintPanel 组件

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

创建所有组件后，层次结构应如下所示：

```code
Canvas
└── Web3UI
    ├── StatusPanel
    ├── ButtonPanel
    └── MintPanel
```

![](/img/minidapps/unity-minidapp/unity-ui-canvas.png)

:::note
要使组件排列整齐，如上图所示，必须在点击每个组件时使用右侧的图标手动排列。
:::
