# 6. 高级主题和常见问题

本节介绍有关 Kaia 气体抽象 (GA) 功能的高级集成技术、最佳实践、故障排除技巧和常见问题。 它专为希望优化实施并确保流畅用户体验的开发人员而设计。

## 6.1 最佳做法

| 主题                | 建议                                                                                                                                                             | 说明                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **滑动**            | 除非令牌非常不稳定，否则从 **0.5 % (50 bps)** 开始使用 `getAmountIn()`。                                                                      | SDK 没有\*\*\*\*硬编码值；0.5 % 是 Kaia 参考代码中显示的事实默认值。             |
| **津贴**            | 缓存 ERC-20 津贴，并在 "津贴 > 0 "时**跳过 "ApproveTx "**，避免额外的签名和气体。                                                                                                      | KIP-247 允许在已获得批准的情况下进行 2-tx 捆绑（借出 + 交换），因此重复使用津贴是完全安全的。                    |
| **批量提交**          | 使用 "kaia_sendRawTransactions"（数组有效载荷）将 **ApproveTx + SwapTx** 推送到一起，防止池竞赛条件。                                                              | 单 tx 调用（`eth_sendRawTransaction`）可以工作，但如果第二个 tx 先到达节点，就会导致 nonce/静态规则检查失败。 |
| **安全**            | a) 从 Kaia 文档中**硬编码**GaslessSwapRouter（GSR）的规范地址。 <br/>b) 在构建交换之前**验证支持**，例如，在 try/catch 中使用 `await router.dexAddress(token)`，或检查 `getSupportedTokens()` 返回的列表。 | 防止钓鱼合约或不支持的令牌劫持 GA 流量。                                                     |
| **不带 KAIA 的气体估算** | 使用带有 **state override** 的 `eth_estimateGas` 在调用中为发送方提供临时余额，例如 `eth_estimateGas(txObj, 'latest', { [from]：{ balance: '0x…' }})`.                | 当 KAIA 账户余额确实为 0 时，绕过 "余额不足 "\* 错误。                                        |

## 6.2 故障排除

| 症状                                         | 可能原因                                                                                        | 建议修复                                                                                                                                                              |
| ------------------------------------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **从未开采过**包                                 | a) `token` **未列入白名单**。 <br/>b) `minAmountOut`太紧，整个捆绑会被还原。                                   | - 首先检查支持\*\*：在签署之前\*\*： `await router.dexAddress(token)`（如果不支持将恢复） **或** `getSupportedTokens().includes(token)` \*\*。<br/>- 增加 `slippageBps` 或及时重新引用 `amountIn` 。 |
| **`INSUFFICIENT_OUTPUT_AMOUNT` 返回**        | 报价和执行之间的价格发生了变化，因此 GSR 检查 `amountReceived >= minAmountOut` 失败。                              | 使用当前的池储备重新运行 `getAmountIn()`，然后使用更高的 `minAmountOut` 或更宽的滑点重建 `SwapTx`。                                                                                            |
| **节点拒绝发送（"资金不足"）**                         | 只发送了**GaslessApproveTx**。 由于跳过了余额检查，而且缺少配对的 **SwapTx**，提议者从未注入 **LendTx**，因此交易花费了它没有的 KAIA。 | 始终通过 `kaia_sendRawTransactions` 在同一批次\*\*中提交 \*\*ApproveTx 和 SwapTx，或确保 `approveRequired == false` 以便发送 2-tx 捆绑包。                                                 |
| 捆绑包内的**王牌不匹配**                             | 外部 dApp 发送了一个常规 tx，在开采 GA 包之前消耗了下一个 nonce。                                                  | 在签署前查询 `getTransactionCount()`；如果 nonce 已移动，则重建两个 tx 对象。                                                                                                          |
| `klay_sendRawTransactions → "未定义的 tx 类型"`。 | 您试图通过 **kaia_…** 端点批量发送 Kaia 特有的 tx 类型（例如 0x30），而该端点仅支持以太坊类型。          | 使用 `kaia_sendRawTransactions` 发送 GA 包，然后使用 `klay_sendRawTransaction` 广播 0x30 AppTx。                                                                               |

## 6.3 常见问题

### 主网上有 GA 吗？

是的，目前 GA 已在 **Kairos testnet** 和 **mainnet** 上运行。

### 如果用户没有足够的代币进行交换，会发生什么情况？

SwapTx 将在链上失败，但由于**KIP-245 的原子捆绑**，整个捆绑将被还原并从块中排除。 用户不会损失任何资金，其在链上的状态也保持不变，他们不会为失败的尝试支付任何气体费用。

### 如何检查哪些代用券和多少钱被换成了汽油？

每次成功的 "swapForGas "调用都会从 "GaslessSwapRouter "发出**SwappedForGas**事件。\
你可以

1. 在 KaiaScan 上查找路由器地址（参见合同地址文档），然后打开 "**事件**"选项卡。
2. 解码事件日志中显示的 "token"、"amountIn"、"amountOut "和 "amountRepay "字段。

如果需要链上数据，请在索引器或 dApp 后端监听 "SwappedForGas"。

### 节点可以禁用 GA 吗？

单个节点可以禁用 GA，但默认情况下是\*\*启用的。 如果一个节点禁用了 GA，事务最终将由其他支持 GA 的节点处理。

### 气体抽取会减慢积木速度吗？

不 KIP-245 允许捆绑包不受每块 250 毫秒_执行超时_检查的限制，因此 EVM 在开始处理整个捆绑包后就可以完成处理。 GA 交易仅限于众所周知的 ERC20 批准和 GSR 互换操作，因此运行时间合理。 因此，GA 捆绑不会危及链的区块时间预算。

### 在哪里可以看到无燃气交易的实际操作？

您可以在 Kairos 测试网资源管理器上查看它们。 这些区块显示了串联执行的整个捆绑程序：

- **3-tx捆绑示例（借出 + 批准 + 交换）：** [Kairos KaiaScan 上的 189826352 块](https://kairos.kaiascan.io/block/189826352?tabId=blockTransactions&page=1)
- **2-tx捆绑示例（借出 + 交换）：** [Kairos KaiaScan 上的 189826547 块](https://kairos.kaiascan.io/block/189826547?tabId=blockTransactions)

## 6.4 额外资源

**技术规格：**

- [KIP-247：无气交易](https://kips.kaia.io/KIPs/kip-247) - 核心 GA 规范
- [KIP-245：交易捆绑](https://kips.kaia.io/KIPs/kip-245) - 捆绑机制
- [GaslessSwapRouter Contract](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol)

**开发人员资源：**

- [Kaia SDK Repository](https://github.com/kaiachain/kaia-sdk)
- [正式合同地址](https://docs.kaia.io/references/contract-addresses/)
- [Kaia开发人员文档](https://docs.kaia.io/)

**社区与支持：**

- [KIP-247讨论论坛](https://devforum.kaia.io/t/discussion-on-kip-247/8089)
- [Kaia Discord](https://discord.gg/kaiachain)
- [SDK 支持的 GitHub 问题](https://github.com/kaiachain/kaia-sdk/issues)

**教育内容：**

- [如果用稳定币支付汽油费会怎样？](https://medium.com/kaiachain/pay-for-gas-fees-with-any-token-a-deep-dive-into-kaias-trustless-gas-abstraction-d670355a096b)
- [凯亚共识流动性公告](https://medium.com/kaiachain/kaia-consensus-liquidity-a-new-paradigm-in-blockchain-liquidity-7c8a7393cd19)