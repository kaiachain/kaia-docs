# 与合同互动

在本节中，您将使用我们新创建的多重签名钱包与部署在 Kairos 上的简单合约进行交互并向其发送一笔交易。

**先决条件**

- [Metamask](https://metamask.io/download/) & [Kaia Metamask Config](../../tutorials/connecting-metamask.mdx#send-klay)
- [混音](https://remix.ethereum.org/) 和[Kaia 混音插件](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- 从 [水龙头](https://faucet.kaia.io) 获取测试 KAIA

**步骤 1：** 导航至 [混音](https://remix.ethereum.org/)

**第 2 步：** 编译并部署**存储合同**示例。

必须先部署合约，然后才能在多重签名钱包中与之交互。 该示例合约包含一个简单的 uint "数字 "变量，可通过调用**store**方法进行更新，也可通过调用**retrieve**方法进行检索。

![](/img/build/tools/kaia-safe/ks-ic-deploy.gif)

**第 3 步：** 启动新交易。

要与安全钱包中的智能合约互动，请点击\*\*"新建交易 "\*\*。 要完成这一步骤，您需要已部署的合同地址和 ABI，如上一步所示。

![](/img/build/tools/kaia-safe/kaia-safe-ci-init.gif)

**第 4 步：** 审查并提交交易。 您需要用签名者钱包签署交易，一旦达到确认阈值，交易就会执行。

![](/img/build/tools/kaia-safe/kaia-safe-ci-review-send.gif)