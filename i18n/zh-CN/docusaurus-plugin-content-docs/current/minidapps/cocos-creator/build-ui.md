# 创建用户界面

在本节中，我们将为 dApp 构建用户界面（UI），包括钱包连接、余额更新和铸币功能。

## 设置主场景<a id="setting-up-main-scene"></a>

### 步骤 1：创建场景文件夹<a id="create-scene-folder"></a>

 - 导航至项目的 **assets** 文件夹。
 - 右键单击并选择 \*\* 创建文件夹\*\*。
 - 说出**场景**。 (插入图片）
 - 在场景文件夹中，右键单击并选择 \*\* 创建 → 场景\*\*。

![](/img/minidapps/cocos-creator/cp-create-scene-r.png)

 - 按提示保存场景文件。
 - 双击新创建的场景，将其设置为**默认场景**。

### 步骤 2：创建基本画布<a id="creating-base-canvas"></a>

 - 在层次结构窗口中，右键单击**场景**。
 - 导航至 **创建 → UI 组件 → 画布**。
 - 将其重命名为 **Canvas**

![](/img/minidapps/cocos-creator/cp-create-canvas-r.png)

### 步骤 3：创建 Web3UI 容器<a id="create-web3ui-container"></a>

 - 右键单击新创建的**画布**。
 - 选择 \*\* 创建 → 空节点\*\*。
 - 将其重命名为 **Web3UI**。

![](/img/minidapps/cocos-creator/cp-create-web3-ui-r.png)

### 步骤 4：设置主要用户界面对象<a id="setting-up-main-ui-objects"></a>

在 Web3UI 中创建以下组件：

**1. 连接钱包按钮**

 - 右键单击 **Web3UI → 创建 → UI 组件 → 按钮**。

![](/img/minidapps/cocos-creator/cp-connect-button-r.png)

 - 将其重命名为 **ConnectWallet**。
 - 在**检查器窗格**中，将按钮标签文本设置为**连接钱包**。

![](/img/minidapps/cocos-creator/cp-connect-label-r.png)

**2. 薄荷纽扣**

 - 右键单击 **Web3UI → 创建 → UI 组件 → 按钮**。
 - 将其重命名为 **MintButton**。
 - 将按钮标签文本设置为 **薄荷按钮**。

**3. 地址标签**

 - 右键单击 **Web3UI → 创建 → 2D 对象 → 标签**。

![](/img/minidapps/cocos-creator/cp-address-label-r.png)

 - 将其重命名为 **地址标签**。
 - 将标签文本设置为 **连接地址：**。

![](/img/minidapps/cocos-creator/cp-connected-address-r.png)

**4. 余额标签**

 - 右键单击 **Web3UI → 创建 → 2D 对象 → 标签**。
 - 将其重命名为 **BalanceLabel**。
 - 将标签文本设置为 **0.000ET**。

添加所有组件后，层次结构应如下所示：

```bash
Canvas
└── Web3UI
    ├── ConnectWallet
    ├── MintButton
    ├── AddressLabel
    ├── BalanceLabel
```

![](/img/minidapps/cocos-creator/cp-ui-view-r.png)

:::note
要正确排列组件，请使用场景顶部的对齐工具。 点击每个组件，根据需要调整其位置
:::
