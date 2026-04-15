# 先决条件

在启用验证程序之前，您必须注册一个拥有全面管理权限的**验证程序管理器**账户。 由于该账户可以修改与验证器相关的大部分关键信息，我们**强烈建议**使用多重签名钱包或具有同等安全保障的钱包作为验证器管理器。

一般来说，我们建议使用通过 [Kaia Safe](http://safe.kaia.io) 创建的多重签名钱包作为验证器管理器。 本指南的其余部分假设您使用的是 Kaia Safe。

## 连接安全钱包<a id="connecting-a-safe-wallet"></a>

首先，按照 [Kaia Safe 用户指南](../../../build/wallets/kaia-safe/kaia-safe.md) 创建 Safe 帐户。 然后将验证器管理门户注册为安全自定义应用程序。

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
