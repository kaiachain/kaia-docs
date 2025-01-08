# 使用事务生成器

这是 Kaia Safe 中的一个自定义应用程序，负责批处理交易。 这意味着您可以将几笔交易捆绑在一起，而不必一笔接一笔地确认。 您只需确认并执行一次。

有了事务生成器，您就可以将从代币转账到复杂的合约交互等各种事务组合在一起，并将它们批量合并到单个事务中。

## KAIA Token Transfer <a id="token-transfer"></a>

您可以按照以下步骤，使用事务生成器执行令牌转移：

**步骤 1：** 导航至安全应用程序并打开交易生成器安全应用程序

![](/img/build/tools/kaia-safe/ks-tx-builder.png)

**第 2 步：** 输入收件人钱包地址。 For this guide, kindly skip the ABI field as we are trying to execute KAIA transfer transaction.

![](/img/build/tools/kaia-safe/tx-builder-token-recipient-addr.png)

**Step 3:** Enter the KAIA value you want to send.

> Note: In this guide, we are sending 1 KAIA, so we entered 1 in the **KAIA value** input field. You can input any amount here, depending on your Safe's KAIA balance.

![](/img/build/tools/kaia-safe/tx-builder-token-trf-value.png)

**步骤 4：** 点击添加交易。

**步骤 5：** 对每个收件人地址重复步骤 2、3 和 4。

**步骤 6：** 将所有操作添加到批次后，单击 "创建批次"。

![](/img/build/tools/kaia-safe/token-trf-tx-builder.gif)

**第 7 步：** 审查并提交交易

您可以查看整个批次。 准备就绪后，单击 "发送批次"，即可像其他安全交易一样提交和执行交易。

## 合同互动<a id="contract-interactions"></a>

比方说，您想向一长串地址空投令牌，比如向 5 个地址空投 10 个 CCT 令牌。 交易生成器可将所有这些转账合并到一个交易中，而无需创建 5 个交易，保险箱的所有者必须一个接一个地确认和执行这些交易。

在本指南中，我们将 CCT 代币铸造到安全地址，以作说明。

让我们使用事务生成器开始这个示例！

**步骤 1：** 打开安全应用程序。

![](/img/build/tools/kaia-safe/ks-tx-builder.png)

**步骤 2：** 打开交易生成器安全应用程序

![](/img/build/tools/kaia-safe/ks-use-tx-builder.png)

**第 3 步：** 输入您的**令牌合同地址**和**ABI**。

在本例中，将使用 CCT 合同地址和 ABI。 您可以将 ABI 复制并粘贴到 **输入 ABI** 字段中。

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-init.gif)

**第 4 步：** 选择一种方法并填写交易信息

您可以从下拉菜单中选择一种方法。 在这种情况下，我们选择**转移**方法。 要完成这一步，您必须填写交易信息，如 **收件人（地址）** 和 **金额（uint256）**。

注：数值为无符号整数，不含小数。 在这个例子中，CCT 标记有 18 个小数。 因此，如果要发送 10 个 CCT，就必须输入 10000000000000000000。

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-details.gif)

**第 5 步：** 点击**添加交易**

**步骤 6：** 对每个收件人地址重复步骤 **4**、**5** 和 **6**。

**第 7 步：** 将所有操作添加到批次后，单击**创建批次**。

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-batch.gif)

**第 8 步：** 审查并提交交易

您可以查看整个批次。 准备就绪后，点击**发送批次**，即可像其他安全交易一样提交和执行交易。
