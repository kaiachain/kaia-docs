# 验证机上线

完成经理账户设置后，您就可以执行链上注册步骤，成为验证者。 请注意，在启动此过程之前，您必须先运行一个实际的共识节点 (kcn)。

要成为 Kaia 验证员，您需要部署一个投注合同，并提交投注合同地址和其他所需信息。

:::info 无许可第 1 期/第 2 期

在**无权限阶段 1**，入职需要获得 Kaia 团队的**行政审批**，以便顺利运行。 新的验证器操作员可以提交入驻请求，Kaia 团队会在内部审批流程结束后完成链上注册。

从即将到来的**无权限第二阶段**开始，信息可以直接在链上注册，无需经过 Kaia 团队的行政审批。

:::

注册完成后，验证者的信息将记录在**地址簿**和**SimpleBlsRegistry**合约中，Kaia 节点在达成共识时会引用这些合约。 有关自我验证器注册的更多技术细节，请参阅 [KIP-277](https://kips.kaia.io/KIPs/kip-277)。

## 部署第一份定标合同<a id="deploy-your-first-staking-contract"></a>

导航至 **部署定标合约** 菜单，部署定标合约。

目前，一个注资合约可以注册多个管理员账户，但从**无权限第二阶段**开始，每个注资合约只允许注册一个管理员账户。 因此，我们建议注册一个 Kaia Safe 帐户作为管理员。

在部署盯梢合同之前，还需要在管理员账户之外再添加一个临时账户来执行部署。 该账户被称为**合同验证器**，其存在是为了向后兼容。 由于认捐合同管理账户和验证管理器账户通常是分开的，因此您可以重复使用验证管理器账户作为合同验证器。

定投合约管理钱包和临时合约验证钱包必须各持有少量 KAIA。 一切准备就绪后，请执行以下步骤。

![Deploy Staking Contract form](/img/nodes/become-a-validator/image07.png)

1. 单击 **[您是否正在加入 Kaia 网络？]** 复选框。

2. 输入您事先准备好的合同验证器账户地址。

3. 对于 \*\* 共识节点 ID\*\*，请输入在 CN 控制台上调用 `admin.nodeInfo.nodeAddress` RPC 所返回的地址。

4. 奖励地址\*\*取决于您是否使用公共授权。
   - 若要\*\*\*不通过公共授权加入验证程序，请输入将直接接收奖励的地址。
   - 要在启用公共授权的情况下\***登录，请单击**公共授权\*\*复选框。 然后，奖励将通过公共委托合同自动分配给委托人。

![Public Delegation section](/img/nodes/become-a-validator/image08.png)
![Public Delegation section (cont.)](/img/nodes/become-a-validator/image09.png)

5. 输入绑定合同管理地址和多重标识阈值。 如果您输入 Kaia Safe 钱包地址作为 **管理地址**，并将阈值设置为 "1"，则多重置功能将由 Kaia Safe 处理。 如果输入多个管理地址，并将阈值设置为任意值，则将在**管理标记**菜单中处理多点登录功能。

![部署合同按钮](/img/nodes/become-a-validator/image10.png)

6. 单击 **[部署合同]** 执行交易。 部署合同后，合同将处于\*\*[未初始化]\*\*状态。

## 初始化定标合约<a id="initialize-the-staking-contract"></a>

新部署的定桩合约必须在初始化后才能使用。 输入所需信息并从每个管理员账户发送一笔交易来验证钱包，然后合约就可以使用了。

![设置跟踪器](/img/nodes/become-a-validator/image11.png)

1. 点击 **[设置跟踪投注]**，将跟踪投注地址写入投注合同。 自动填写正确的 Staking Tracker 地址。

![Set GC ID](/img/nodes/become-a-validator/image12.png)

2. 从 Kaia 团队领取 GC ID 并输入。 单击 **[设置 GC ID]**，将 GC ID 写入定标合同。 从**无权限第二阶段**开始，将自动分配 GC ID。

![Public Delegation info](/img/nodes/become-a-validator/image13.png)
![Public Delegation info (cont.)](/img/nodes/become-a-validator/image14.png)

3. 如果已启用公共授权，请输入相关信息。 如果在部署合同时未启用公共授权，则跳过此步骤。
   1. **所有者**：可以更改佣金接收人和佣金率的账户。
   2. **收取佣金的账户**：收取佣金的账户。
   3. **佣金率**：介于 "0 "和 "10000 "之间的基点值。
   4. **GC 名称**：将作为 pdKAIA 令牌名称公开的简短名称。 例如，如果 GC 名称是 "Hello"，则公共授权的存款令牌名称就会变成 "Hello-pdKAIA"。 例如[kaiascan search for pdKAIA tokens](https://kaiascan.io/search?tabId=tokens&keyword=pdkaia&page=1))

![审查条件](/img/nodes/become-a-validator/image15.png)

4. 从之前设置的合约验证器和每个定投合约管理员处各发送一笔交易，以验证钱包。 依次使用每个钱包登录，然后点击 **[审查条件]**。

![Deposit & Init (1)](/img/nodes/become-a-validator/image16.png)
![Deposit & Init (2)](/img/nodes/become-a-validator/image17.png)

5. 最后，点击 **[存款和初始化]**，完成合同初始化。

## 提交入职申请<a id="submit-an-onboarding-request"></a>

返回**主页**菜单时，已部署的定标合约将显示为\*\*[初始化]\*\*状态。

![初始化后的主页](/img/nodes/become-a-validator/image18.png)

单击 **[入职验证]** 向 Kaia 团队提交入职申请。

机载验证器](/img/nodes/become-a-validator/image19.png)

入职申请表](/img/nodes/become-a-validator/image20.png)

1. 查看显示的信息。
2. 查看节点信息。 共识节点 ID\*\* 地址必须至少持有 **10 KAIA**--处理 [Gas Abstraction](../../../build/tutorials/ga-tutorial/ga-intro.md) 和 [MEV Auction](../../../build/tutorials/mev-auction-sdk-guide.md) 交易的最低要求。 10 KAIA 不会被扣除，而是在处理这些交易时短暂使用，然后立即返还。

![BLS 公钥信息](/img/nodes/become-a-validator/image21.png)

3. 查询节点的 BLS 公钥信息并输入。 在 CN 控制台上，调用 `admin.nodeInfo.blsPublicKeyInfo` RPC 并输入返回的 `publicKey` 和 `pop` 值。

提交入职申请](/img/nodes/become-a-validator/image22.png)

4. 单击 **[提交入职申请]** 提交入职申请。
