# Kaia MEV 拍卖 SDK 搜索指南

[Kaia v2.1.0](https://github.com/kaiachain/kaia/releases/tag/v2.1.0) 引入了 MEV 拍卖系统，使搜索者能够参与公平、透明的 MEV 机会拍卖。 本指南全面介绍了使用 Kaia MEV 拍卖 SDK 的搜索工作流程。

:::info

本指南使用 Kairos 测试网络端点和合同地址。 主网计划于 2025 年 12 月中旬启动。 部署到主网时，相应更新所有端点和合同地址。

:::

搜索工作流程包括四个主要步骤：

![](/img/build/tutorials/searcher-guide-1.png)

1. **存款**：搜索者将 KAIA 代币存入 "AuctionDepositVault "以资助竞拍活动
2. **出价**：搜索者通过向拍卖师提交密封标书来竞争回跑时段
3. **提交中标**：拍卖师选出中标者，并将中标结果转发给共识节点 (CN)
4. **执行竞标交易**：CN 通过 "AuctionEntryPoint "合同执行中标交易

详细技术背景见 [KIP-249](https://kips.kaia.io/KIPs/kip-249)。

## 先决条件

在开始之前，请确保您已

- 有 KAIA 代币存款的资金钱包
- 为 SDK 示例安装了 [Go](https://golang.org/) （版本 1.25+）。
- 访问 Kaia 网络端点（本指南使用 Kairos 测试网）
- (可选）已安装 [Foundry](https://getfoundry.sh/) （用于 `cast` 命令）

**拍卖人终端：**

- Kairos (testnet)：`https://auctioneer-kairos.kaia.io`.
- 主网：`https://auctioneer.kaia.io`

**探索者终端：**

- Kairos (testnet)：`https://mev-kairos.kaia.io`.
- 主网：`https://mev.kaia.io`

**网络终端：**

- Kairos (testnet)：`https://public-en-kairos.node.kaia.io`.
- 主网：https://public-en.node.kaia.io

**合同地址（凯罗斯）：**

- AuctionFeeVault: `0xE4e7d880786c53b6EA6cfA848Eb3a05eE97b2aCC`
- AuctionDepositVault: `0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc`
- AuctionEntryPoint: `0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480`

有关主网合约地址（主网启动后可用），请查看 [Contract Addresses](../../references/contract-addresses.md)。

:::tip[Monitor MEV 机会］

搜索者可以通过以下方式识别有利可图的交易

- **订阅拍卖商的待处理交易 API**：该应用程序接口可直接从共识节点流式传输交易，使您能够实时检测 MEV 机会。 请参阅下文[订阅待处理交易](#step-3-subscribe-to-pending-transactions) 部分。
- **独立监控网络 mempool**：通过订阅待处理 tx，实现自己的 MEV 机会检测逻辑。

:::

## 步骤 1：存款

![](/img/build/tutorials/searcher-guide-2.png)

拍卖保证金金库 "保存着您的竞拍余额。 您的保证金必须包括投标金额和执行投标所需的预计燃气费。

### 了解存款要求

您的押金余额必须包括

- **出价金额**：您愿意为赢得拍卖支付的 KAIA
- **估计天然气费**：投标执行期间消耗的天然气（执行后扣除并发送给区块投标人）

:::warning[Always 保持足够的存款余额]

如果您的余额不足以支付出价金额和预计的汽油费，拍卖师将在确认时拒绝您的出价。

:::

### 存款方法

合同规定了两种存款方式：

**方法 1："存款() "**\*

使用发件人的余额存款。 存款记入汇款人账户。

```bash
# Deploy deposit of 200 KAIA
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "deposit()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

**方法 2："depositFor（地址搜索器）"**\*

代表另一个账户存款。 用于从单一来源资助多个搜索者地址。

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositFor(address)" <SEARCHER_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

### 检查您的余额

查询当前存款余额：

```bash
cast call 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositBalances(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
```

有关详细的存款示例，请参阅 [DEPOSIT.md guide](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/DEPOSIT.md)。

## 第 2 步：提交投标书

![](/img/build/tutorials/searcher-guide-3.png)

一旦发现有利可图的交易，请向拍卖师提交竞标书。 出价是密封的（在拍卖结束前隐藏），并根据出价金额进行竞争。

### 投标结构

投标书由以下字段组成（如 [types.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/types.go) 中所定义）：

```go
type AuctionBid struct {
    TargetTxRaw  []byte         // Raw transaction bytes of target tx
    TargetTxHash common.Hash    // Transaction to backrun
    BlockNumber  *big.Int       // Target block number
    Sender       common.Address // Your searcher address
    To           common.Address // Contract to call
    Nonce        uint64         // Current nonce from AuctionEntryPoint
    Bid          *big.Int       // Your bid in KAIA
    CallGasLimit uint64         // Gas limit for your backrun logic
    Data         []byte         // Encoded function call
    SearcherSig  []byte         // EIP-712 signature from searcher
}
```

:::info

您提交出价后，拍卖师会验证并添加自己的签名（"AuctioneerSignature"），然后将中标出价转发给共识节点。 您只需提供 `SearcherSig`（您的 EIP-712 签名）。

:::

### 提交投标书

SDK 在 [`example/submitbid.go`](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) 中提供了一个完整的工作示例。 示例说明

- 与拍卖商建立 HTTPS 连接
- 从 EN 端点检测新区块
- 生成目标交易和相应出价
- 向拍卖师提交标书

**需要采取的行动**：运行代码前，请在代码中替换您的私人密钥。 检查源代码中的 "TODO: "注释。

运行示例：

```bash
# From repository root
go run example/submitbid.go
```

### 投标验证

拍卖人、投标人和智能合约各自对出价进行特定的验证检查。 主要验证规则包括

- **区块编号**：必须为 currentBlockNumber + 1 或 currentBlockNumber + 2
- **出价金额**：必须大于 0 且小于或等于您的可用存款余额
- **调用数据大小**：不得超过 `BidTxMaxDataSize` (64KB)
- **呼叫气体限制**：不得超过 `BidTxMaxCallGasLimit` (10,000,000)
- **nonce**：必须与您在 `AuctionEntryPoint` 中的当前 nonce 匹配。 查询时使用
  ```bash
  cast call 0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480 "nonces(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
  ```
- **签名**：必须是有效的 EIP-712 签名（请参阅 [submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) 以了解实施情况）
- **保证金覆盖范围**：必须有足够的保证金来支付 "投标金额 + 估计燃气费
- **唯一性**：同一区块内不能有其他中标（除非针对同一交易）
- **拍卖人签名**：必须有效（由拍卖师在您提交后添加）

有关哪个实体执行哪些检查的完整验证矩阵，请参阅[投标验证指南](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/bid_validation.md)。

## 步骤 3：订阅待处理交易

![](/img/build/tutorials/searcher-guide-4.png)

Auctioneer 提供 WebSocket 订阅服务，可直接从共识节点流式传输待处理交易。 这样，搜索人员就能实时发现 MEV 机会。

SDK 在 [example/subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go) 中提供了一个完整的示例。

示例说明

- 建立与拍卖商的 WebSocket 连接
- 订阅待处理交易流
- 处理收到的交易以确定 MEV 机会

运行示例：

```bash
# From repository root
go run example/subscribe_pendingtx.go
```

当检测到待处理交易时，订阅会持续打印交易哈希值。 您可以扩展本示例，实现自己的 MEV 检测逻辑。

## 步骤 4：了解执行

当您的出价获胜时，共识节点会通过 "AuctionEntryPoint "合约执行您的出价：

![](/img/build/tutorials/searcher-guide-1.png)

### 执行流程

执行过程包括三个阶段：

1. **验证阶段**：合同验证区块号、签名、Nonce 和投标金额
2. \*\* 投标付款阶段\*\*：从您的保证金中扣除投标金额并将其发送至生态系统基金
3. **执行阶段**：您的反向运行由 EntryPoint 合同执行（无论执行结果如何，都会支付竞标款）

**主要安全功能：**

- 验证器代表您执行竞标（防止撤回竞标以逃避付款）
- Nonce 增量可防止重放攻击
- 双重签名（搜索者 + 拍卖者）未经授权替换或操纵出价
- 出价付款与回转执行结果无关

详细执行流程请参见 [ENTRYPOINT.md guide](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/ENTRYPOINT.md)。

## 步骤 5：提取资金

![](/img/build/tutorials/searcher-guide-5.png)

提款需要两个步骤，并有锁定期：

### 1. 储备金提取

启动提款并开始 60 秒锁定期：

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "reserveWithdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

### 2. 完全退出

60 秒后，转账预留金额：

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "withdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

:::info[Security 说明］

有锁定期的两步提款程序：

- 防止在拍卖活动期间闪退
- 通过确保搜索者遵守出价，维护协议的完整性
- 防止快速资本操纵攻击

:::

## 应用程序接口参考

拍卖商为搜索者提供两个主要的应用程序接口：

**1. 提交投标宣传短片**\*

- **终端**：POST /api/v1/auction/send
- **目的**：为 MEV 机会提交密封投标

**2. 待处理交易订阅**

- **终点**：GET /api/v1/subscriber/pendingtx
- **目的**：来自共识节点的待处理交易实时流
- **示例**：请参阅 [subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go) 中的实现示例。

**完整的应用程序接口文档：**

- OpenAPI (Swagger) 规范可从以下网址获取：
  - **Kairos**: https://auctioneer-kairos.kaia.io/docs
  - **主网**：主网启动后可用
- API 使用：[API 文档](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/api_doc.md)

## 故障排除

### 常见问题

| 问题类别       | 症状         | 原因                                               | 解决方案                                                                                                                           |
| ---------- | ---------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **余额不足**   | 被拍卖商拒绝的出价  | 押金余额不包括出价金额 + 预计汽油费                              | 使用 `depositBalances()` 查看余额并存入更多 KAIA                                                                                          |
| **不匹配**    | 投标被拒绝或执行失败 | Nonce 与 `AuctionEntryPoint` 中的当前 nonce 不匹配       | 在每次出价前使用 `nonces()` 查询当前的 nonce。 记住：非ces 只在执行时递增，而不是在提交时递增                                                                     |
| **街区编号范围** | 被拍卖商拒绝的出价  | 目标块超出允许范围`[current+1, current+allowFutureBlock]` | 确保区块编号在范围内（通常为 +1 或 +2）。 请参阅常见问题，了解双重提交战略                                                                                      |
| **无效签名**   | 被拍卖商拒绝的出价  | 不正确的 EIP-712 签名结构                                | 验证域分隔符和类型散列。 正确执行请参考 [submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) |
| **气体限值问题** | 执行失败或投标被拒绝 | 调用气体上限 "过低或超过上限 (10,000,000)  | 在测试网上测试反向运行逻辑，以测量实际耗气量                                                                                                         |

## 常见问题

### 订阅

\*\*问：每个搜索器允许多少并发连接？

答：每个搜索器地址只允许有一个待处理交易订阅连接。

\*\*问：订阅连接的有效期有多长？

答：连接在 24 小时后自动关闭。 请注意，如果正在进行滚动更新，连接可能会提前 24 小时关闭。

### 应用程序接口性能和延迟

\*\*问：在提交投标时，如何尽量减少应用程序接口延迟？

答：拍卖商使用的是带有 HTTPS 协议的 L7 负载平衡器。 初始握手耗时取决于网络状态。 要绕过发送后续竞标 API 时的初始延迟，强烈建议建立保持连接。

\*\*问：我是否应该注意 API 速率限制？

答：为防止被 Auctioneer API 服务器阻止，请不要在短时间内多次发送 `ping` API。

\*\*问：地理位置是否会影响延迟？

答：是的。 拍卖师服务器在 GCP KR（首尔）地区运行。 建议您将基础架构托管在地理位置较近的区域，以最大限度地减少延迟和地理延迟。

### 竞价时机和区块目标

\*\*问：为什么我的投标有时会针对错误的区块编号？

答：您提交投标的时间对 CN（共识节点）的开采时间非常敏感。 如果拍卖开始较晚（接近开采时间），出价交易将被插入下一个区块之后（区块编号 +2 而不是 +1）。 这意味着您应该将目标块编号设置为 +2。

\*\*问：如何提高投标包含率？

答：目标区块编号对 CN 挖矿时间表有固有的敏感性：如果您的目标区块编号是 +2，但由于处理时间较早，交易插入的区块编号是 +1，那么竞标就会失败。 因此，建议通过两次发送竞价交易来最大限度地提高包含概率：一次目标区块编号为 +1，另一次目标区块编号为 +2。

## 最佳做法

- **监控存款余额**：保持足够的余额以支付多次投标
- \*\* 小心处理 Nonces\*\*：出价前一定要查询最新的 nonce
- **优化检测**：加快 MEV 检测速度，提高竞争优势
- **在 Kairos 上进行测试**：在部署主网之前在测试网上验证您的策略
- **监控结果**：通过 MEV Explorer 跟踪拍卖结果，完善您的竞价策略
- \*\* 设置适当的气体限值\*\*：兼顾充足气体和成本效益

## 资源

- [SDK资源库](https://github.com/kaiachain/auctioneer-sdk)
- [KIP-249规范](https://kips.kaia.io/KIPs/kip-249)
- [示例代码](https://github.com/kaiachain/auctioneer-sdk/tree/dev/example)
- API 文档：[auctioneer-kairos.kaia.io/docs](https://auctioneer-kairos.kaia.io/docs) (Kairos), TBU (Mainnet)
- MEV 浏览器：[mev-kairos.kaia.io](https://mev-kairos.kaia.io) (Kairos), TBU (Mainnet)
- [常见问题](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/FAQ.md)

## 获取帮助

有关问题或疑问：

- 在 [Kaia DevForum](https://devforum.kaia.io) 发表文章
- 在 [SDK 资源库] 中打开一个问题(https://github.com/kaiachain/auctioneer-sdk/issues)
