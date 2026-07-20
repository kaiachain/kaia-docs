# 先决条件

在启用验证程序之前，您必须注册一个拥有全面管理权限的**验证程序管理器**账户。 由于该账户可以修改与验证器相关的大部分关键信息，我们**强烈建议**使用多重签名钱包或具有同等安全保障的钱包作为验证器管理器。

通常，我们建议使用通过 [Safe Wallet](https://app.safe.global)（来自 [Safe](https://safe.global) / Safe Global）创建的多签名钱包作为验证器管理器。 本指南的其余部分假设您正在 Kaia 上使用 Safe Wallet。

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月9日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 版 Safe Wallet 来管理您的账户。 您现有的“安全账户”将自动与“安全钱包”兼容。

:::

## 连接安全钱包<a id="connecting-a-safe-wallet"></a>

首先，请按照[Safe Wallet 用户指南](../../../build/wallets/kaia-safe/kaia-safe.md) 创建一个 Safe 账户。 然后将验证器管理门户注册为安全自定义应用程序。

![添加自定义安全应用程序](/img/nodes/become-a-validator/image02.png)

单击 **应用程序 > 我的自定义应用程序 > 添加自定义安全应用程序**。

![Paste portal URL](/img/nodes/become-a-validator/image03.png)

按照安全指南粘贴门户 URL。 确认门户信息在下方正确显示，查看后勾选免责声明复选框，然后点击 **添加**。

我的自定义应用程序](/img/nodes/become-a-validator/image04.png)

成功添加验证器管理门户后，进入 \*\* 应用程序 > 我的自定义应用程序\*\*，点击 **Kaia Validators** 卡，使用您的 Safe 账户打开门户。

![安全钱包已连接](/img/nodes/become-a-validator/image05.png)

进入门户后，您将看到左侧连接的安全钱包。 从现在起，当您尝试从门户网站发送交易时，交易将根据您的多重签名配置通过 Safe 进行签名和提交。

## 连接另一个钱包<a id="connecting-another-wallet"></a>

:::warning 安全说明

不建议使用没有多重签名或没有同等安全保证的钱包作为验证器管理器。

:::

![连接钱包](/img/nodes/become-a-validator/image06.png)

如果要使用其他钱包管理经理账户，请单击**连接钱包**进行连接。
