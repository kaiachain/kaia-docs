# SafePal S1

![](/img/banners/kaia-safepal.png)

## 导言<a id="introduction"></a>

硬件钱包重新发明了轮子，将私钥（签署交易时需要）保存在与互联网连接分离的离线环境中，避免了依赖互联网连接的软件钱包所带来的大量黑客攻击或威胁。 这样，用户的加密资产就更安全了，也不会受到软件钱包带来的网络危险的影响。

与 Kaia 集成的硬件钱包之一是 **SafePal S1 硬件钱包**。 SafePal S1 是一款加密货币硬件钱包，旨在为大众提供一个安全、简单、愉快的加密货币管理解决方案。 SafePal 是一款硬件钱包，用于保护和管理加密货币和 NFT，如比特币、KAIA、Kaia Compatible Tokens (KCT)、ETH 和 ERC20 代币等。

在本指南中，您将

- 使用 SafePal S1 硬件钱包添加、接收和发送 KAIA 和任何 Kaia 兼容代币（KCT）

## 先决条件<a id="prerequisites"></a>

- [SafePal 硬件钱包设置](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752)

## 入门<a id="getting-started"></a>

在成功设置钱包后，接下来就是查看钱包的运行情况了。 在本教程中，我们将使用 SafePal S1 硬件钱包添加、接收和发送 KAIA 原生代币以及任何 Kaia 兼容代币（KCT）。

### 添加加密代币<a id="adding-crypto-tokens"></a>

要将加密代币添加到硬件钱包，请按照以下步骤操作：

**第一步**：打开安全宝应用程序，在 "钱包 "选项卡中点击省略号图标，然后点击 "管理硬币 "按钮，如下图所示：

![](/img/build/tools/safepal/sp-hw-manage-coins.png)

**第 2 步**：搜索要添加的硬币，然后将其打开。

**原生代币 - KAIA**

- 在搜索栏中输入 "KAIA"，然后将其切换为 "打开"。

![](/img/build/tools/safepal/sp-app-search-kaia.jpg)

\*\* Fungible 代币 - USDT\*\*

- 在搜索栏中输入 USDT Kaia 并将其打开。

![](/img/build/tools/safepal/sp-app-search-usdt.jpg)

**第 3 步**：点击底部的**添加硬币**。

![](/img/build/tools/safepal/sp-hw-add-coins.png)

**第四步**：在 SafePal 应用程序和 S1 硬件钱包之间来回扫描，输入您的设备 PIN 码，以便在应用程序和设备之间正确同步数据。

**第 4 步**：成功添加硬币后，您就可以在 S1 设备上的 "资产管理 "标签中查看它们了。

![](/img/build/tools/safepal/sp-hw-asset-display.png)

:::note
上述步骤适用于添加任何 Kaia 兼容令牌。
:::

### 接收加密代币<a id="receiving-crypto-tokens"></a>

成功添加硬币（KAIA、KCT）后，您可以在 S1 设备上的 "资产管理 "\*\* 标签中查看它们。 您可以通过以下方式接收加密代币：

#### 使用掌上安全应用程序

1. 选择 KAIA 或任何其他可替代代币，如 USDT，它提供交换、接收和发送选项。 轻敲接收。
2. 您可以复制您的 KAIA 或 USDT 钱包地址，保存二维码，或让对方直接从您的设备扫描二维码。

#### 使用安全宝 S1 硬件钱包

1. 启动 SafePal S1 设备并导航至 "资产管理"。
2. 选择 KAIA 或任何其他可替代代币（如 USDT）作为您希望接收的钱币。
3. 点击 "接收 "按钮。
4. 输入 S1 设备的 PIN 码。
5. 然后，您就可以看到硬币地址的二维码，并将其展示给其他人，让他们扫描并将硬币寄给您。

![](/img/build/tools/safepal/sp-hw-receive-tokens.png)

:::note
上述步骤适用于接收任何与 Kaia 兼容的令牌。
:::

### 发送加密代币 <a id="sending-crypto-tokens"></a>

要从硬件钱包发送加密代币，请按照以下步骤操作：

**步骤 1**：在安全宝应用程序中，选择您要发送的硬币，然后点击**发送**。

**原生代币 - KAIA**

![](/img/build/tools/safepal/sp-hw-sp-app-send.png)

\*\* Fungible 代币 - USDT\*\*

![](/img/build/tools/safepal/sp-hw-sp-app-usdt-send.png)

**第 2 步**：输入目的地地址和金额，点击 "下一步 "再次确认详细信息。 确保在此步骤中验证您的转账详情。

![](/img/build/tools/safepal/sp-hw-sp-app-send-details.png)

**第 3 步**：启动 S1 设备的签署程序。

在此步骤中，安全宝应用程序上将显示一个包含转账详情的 QR 码（如下图所示）。 启动 S1 硬件钱包，进入**扫描**选项卡。 下一步是扫描安全宝应用程序上的 QR 码，然后从安全宝设备上输入您的 PIN 码。

这样做可确保 S1 设备在脱机环境下接收传输详细信息。

![](/img/build/tools/safepal/sp-hw-sign-tx.png)

**第4步**：将签名同步回 SafePal 应用程序

在 S1 设备上成功签署传输后，您将看到一组动态 QR 码显示在 S1 设备上。 在安全宝应用程序中，点击 "下一步 "打开手机摄像头。 使用 SafePal 应用程序扫描 S1 设备上显示的动态 QR 码。

这样做可以确保应用程序收到二维码中包含的签名，并准备好向区块链（Kaia）广播转账。

**第五步**：点击应用程序上的**广播**，等待传输完成

![](/img/build/tools/safepal/sp-hw-broadcast-tx.png)

:::note
上述步骤适用于发送任何 Kaia 兼容令牌。
:::

## 更多参考资料 <a id="further-references"></a>

- [SafePal S1 升级说明](https://www.safepal.com/en/upgrade/s1)
- [SafePal S1 用户手册](https://docs.safepal.io/safepal-hardware-wallet/user-manual)