# 交易费用

一次交易的交易费计算如下：

```text
燃气费 := (使用的燃气) x (有效燃气价格)
```

打个简单易懂的比方，假设你正在加油站加油。 天然气价格每天由炼油厂决定，今天的价格是 2 美元。 如果装满 15 升，则需支付 30 美元 = 15 升 x 2 美元/1 升，30 美元将从您的银行账户中支付。 此外，这笔交易还将记录在账簿中。

交易费与上述相同。 假设一笔交易花费了 21000 天然气，交易的实际天然气价格为 25 格基。 那么汽油费就是 525000 格基。 这笔金额将从汇款人（"来自 "账户）的余额中扣除。

## 使用的气体<a id="gas-used"></a>

改变区块链状态的每个操作都需要气体。 在处理区块中的交易（如发送 KAIA、使用 ERC-20 代币或执行合约）时，发送方必须支付计算和存储使用费。 支付金额由所需的 "气体 "数量决定。 煤气没有单位，我们只能说 "21000 煤气"。

交易气体由两部分组成：

- 本征气体 "是根据事务主体本身（如输入的大小）静态收取的气体。 更多详情，请参阅 [本征气体](intrinsic-gas.md)。
- 执行气体 "是在执行过程中动态计算得出的气体。 更多详情，请参阅 [执行气体](execution-gas.md)。

用气量只有在交易执行后才能确定。 因此，您可以从交易收据中找到已用燃气量。

### 找到合适的气体限值

每笔交易都必须指定一个 gasLimit（气体限值），即交易可花费的最大气体量。 发送方还可以使用 `eth_estimateGas` 和 `kaia_estimateGas` RPC 为交易找到合适的 gasLimit。 或者，发件人也可以手动指定一个足够大的数字。 指定高 gasLimit 不会自动收取高 gas 费，因此使用固定数字是一个可行的选择。 但是，只有少量代币的发件人不能指定过高的 gasLimit，因为无论实际 gasUsed 为多少，发件人的余额中都必须至少拥有 `gasLimit * effectiveGasPrice` 。

## 有效天然气价格<a id="effective-gas-price"></a>

交易的有效气价由许多变量计算得出：

- 硬叉水平
- 发件人提交的交易中的天然气价格字段
  - 第 2 类交易中存在 "maxFeePerGas"（通常称为 feeCap）字段。
  - 第 2 类交易中存在 "maxPriorityFeePerGas"（通常称为 tipCap）字段。
  - 气体价格 "字段存在于所有其他交易类型中。
- 交易执行区块的 "baseFeePerGas"（通常称为 "baseFee"）。

### 岩浆硬叉前（固定单价）

在 Magma 硬分叉之前，所有交易的交易费都是固定值，称为 "unitPrice"。 该单价可通过管理进行调整。 所有交易必须提交等于当前单价的气体价格字段。 单价机制避免了用户在燃气费拍卖市场中因燃气价格估算而产生的用户体验挫败感，并使服务提供商能够轻松预测燃气费预算。

可以通过 `kaia_getParams` API 找到指定区块的 `unitPrice` 值。

### 岩浆硬叉后（KIP-71 动态基费）

自 Magma 硬分叉以来，网络会根据网络拥堵情况决定每个区块的天然气价格值 "baseFeePerGas"（或简称 baseFee）。 如果交易流量高于阈值，基本费就会增加，反之则会减少。 交易流量以使用的区块气体来衡量。 随着区块中交易执行量的增加，网络会感到更拥堵，从而有可能提高基本费用。

与 [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)不同的是，岩浆气体政策没有提示（提示是从 Kaia 硬叉开始引入的）。 取而代之的是 FCFS（先到先服务）政策，以保护网络免受垃圾邮件的侵害。

#### 基本收费计算

基本费用的计算取决于以下参数：

- 区块拥塞数据
  - 上一个基费：上一个区段的基本收费
  - previous_block_gas_used：用于处理上一个区块所有交易的气体
- 可在以后通过治理更改的调谐参数
  - GAS_TARGET（目标气量）：决定基本费用增减的气体量
  - max_block_gas_used_for_base_fee：用于执行基费最大变化率的隐式块气体限制。
  - BASE_FEE_DENOMINATOR: 设置每个区块最大基本费用变动的值
  - 基本费用上限：基本费用的最大值
  - 基本费用下限值：基本费用的最小值

以下是基础费用计算的简化版本。 从本质上讲，基本费用的变化与 GAS_TARGET 和 PREVIO_BLOCK_GAS_USED 之间的差额成正比，其他参数控制着基本费用的变化速度或界限。 准确公式请参阅 [KIP-71](https://github.com/kaiachain/kips/blob/main/KIPs/kip-71.md)。

```
              min(PREVIOUS_BLOCK_GAS_USED, MAX_BLOCK_GAS_USED_FOR_BASE_FEE) - GAS_TARGET
changeRate = ----------------------------------------------------------------------------
                                BASE_FEE_DENOMINATOR * GAS_TARGET

nextBaseFeeBeforeBound = PREVIOUS_BASE_FEE * (1 + changeRate)

nextBaseFee = max(min(nextBaseFeeBeforeBound, UPPER_BOUND_BASE_FEE), LOWER_BOUND_BASE_FEE)
```

可通过 `kaia_getParams` API 查找特定区块的调谐参数。 每个区块的 "baseFeePerGas "可通过 "kaia_getBlock\*"和 "eth_getBlock\*"API 找到。

#### 燃气费燃烧

由于岩浆硬叉，区块气体费用的一半会被烧掉。 详见 [KIP-71](https://github.com/kaiachain/kips/blob/main/KIPs/kip-71.md)。

由于 Kore 硬叉，大部分块状气体费用都被烧掉了。 详见 [KIP-82](https://kips.kaia.io/KIPs/kip-82)。

### Kaia 硬叉子之后（KIP-162 优先权费用）

自 Kaia 硬分叉以来，交易可以指定非零的优先级费用（或简单的小费），以增加区块包含的可能性。 Kaia 天然气政策与 [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)类似，交易支付基本费用和有效小费。

交易的有效气价定义为 "min(baseFee + tipCap, feeCap)"。 对于类型 2 交易，交易字段 `maxPriorityFeePerGas` 和 `maxFeePerGas` 自然就变成了 tipCap 和 feeCap。 但是，其他交易类型只有一个 "gasPrice "字段。 对于这些类型，tipCap 和 feeCap 都等于 "gasPrice"。 因此，其有效天然气价格变为 `min(baseFee + tipCap, feeCap) = min(baseFee + gasPrice, gasPrice) = gasPrice`，这与天然气价格拍卖机制相同。

详见 [KIP-162](https://github.com/kaiachain/kips/blob/main/KIPs/kip-162.md)。

### 在卡伊娅之后找到合适的天然气价格

如果您的应用程序或钱包使用 2 类交易（EIP-1559 类型），请确保您设置了合理的优先权费用。 您还可以调用 `eth_maxPriorityFeePerGas` RPC 来检索建议的优先级费用 (tx.maxPriorityFeePerGas)。 在网络不拥堵的情况下，零优先权费交易在交易处理中应不会处于劣势。 当网络拥堵时，指定一个非零的优先级费用来与其他交易竞争会更安全。

Kaia 节点的 "eth_maxPriorityFeePerGas "RPC 应：

- 如果网络没有拥塞，则返回 0。 当下一个基准每气收费等于 UPPER_BOUND_BASE_FEE 时，网络被视为不拥堵。
- 否则返回最近 N 个区块中交易的 P 百分位有效优先级费用。 Kaia 节点的默认设置为 P=60 和 N=20，但各节点的配置可能不同。

类型 2 交易的 "maxFeePerGas "应高于网络的下一个基本费用，以确保即使基本费用上涨，交易也能得到处理。 常用的公式是 "最后基本费用\*2 + 最大优先级每气费用"。 当 BASE_FEE_DENOMINATOR 为 20 时，baseFee 至少需要 15 秒才能翻倍。 另一种方法是使用 `eth_gasPrice` RPC。

对于其他 tx 类型的交易，在选择合适的 "gasPrice "时应更加谨慎。 因为对于这些 tx 类型，无论基础费用是多少，gasPrice 都是按原价使用的。 另一方面，gasPrice 必须至少等于网络的基本费用。 因此，应用程序和用户应避免将 gasPrice 设置得过高，同时与网络的基本费用相匹配。 一种策略是将 "天然气价格 "设置得比下一个基本费用略高，这样就可以容纳几次基本费用的上涨。 您可以调用 `eth_gasPrice` RPC 来检索推荐的天然气价格。

Kaia 节点的 "eth_gasPrice "RPC 应：

- 返回 (下一个基本费用) \* M + (eth_maxPriorityFeePerGas). 在网络不拥堵的情况下，乘数 M 的启发式选择为 1.10，在网络拥堵的情况下为 1.15。 当 BASE_FEE_DENOMINATOR 为 20 时，M=1.10 可以承受至少一次基本费上调（1.05），M=1.15 可以承受至少两次连续的基本费上调（1.05\*1.05）。 考虑到基本费通常不会以最高 5%的速度增长，乘数实际上应该足够基本费增长几次。

### 天然气价格摘要

| 硬叉   | 燃气价格 "要求                        | 最大每气收费 "要求                             | 最大优先级每气收费 "要求                                           | 计算出的 "有效气价                                                                      |
| ---- | ------------------------------- | -------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 岩浆之前 | 必须是单位价格                         | 必须是 unitPrice<br/> （仅在 EthTxType 分叉后）。 | 必须是 unitPrice<br/> （仅在 EthTxType 分叉后）。                  | 单位价格                                                                            |
| 岩浆之后 | 至少基费<br/> （建议：2\*基费）            | 至少基费<br/> （建议：2\*基费）                   | 被忽视                                                     | 基本费用                                                                            |
| 凯娅之后 | 至少基本费用<br/> （建议：基本费用\*M + 建议小费） | 至少基本费用<br/> （建议：基本费用\*2 + 建议小费）        | 可达用户、钱包和 SDK<br/> （建议：supposedTip = 0 或 N 个区块中的 P 百分位数） | tx 类型 2：min(baseFee + feeCap, tipCap)，<br/>其他 tx 类型：gasPrice |
