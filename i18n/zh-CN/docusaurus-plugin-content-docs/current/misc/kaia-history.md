# Kaia 硬分叉历史

本页显示 Kaia 区块链的所有硬分叉。

:::note

- 有关 Kaia 发行版的更多详情，请参阅 [GitHub 上的 Kaia 发行说明](https://github.com/kaiachain/kaia/releases)。
- 有关 Kaia 过渡之前的硬分叉，请参阅 [Klaytn 硬分叉历史](klaytn-history.md)。

:::

## 布拉格

| ` `  | 启示录                                           | 主网                                            |
| ---- | --------------------------------------------- | --------------------------------------------- |
| 日期   | 2025 年 6 月 10 日 10:26 / UTC+9 | 2025 年 7 月 17 日 10:26 / UTC+9 |
| 区块编号 | `#187,930,000`                                | `#190,670,000`                                |

### 摘要

在 Kairos 测试网的 [v2.0.0 版本](https://github.com/kaiachain/kaia/releases/tag/v2.0.0) 和主网的 [v2.0.2 版本](https://github.com/kaiachain/kaia/releases/tag/v2.0.2) 中引入了布拉格硬分叉。 它引入了 EIP-2537 规定的 BLS12-381 预编译、EIP-2935 规定的历史 blockhash 系统合约、EIP-7610 规定的合约创建检查、EIP-7623 和 [KIP-223](https://kips.kaia.io/KIPs/kip-223) 规定的更新 calldata 天然气价格、EIP-7702 和 [KIP-228](https://kips.kaia.io/KIPs/kip-228) 规定的 SetCode 交易类型，以及 [KIP-226](https://kips.kaia.io/KIPs/kip-226) 规定的共识流动性功能。 此外，它还包括用代币支付燃气费的燃气提取功能。

## Kaia 过渡

| ` `  | 启示录                                           | 主网                                            |
| ---- | --------------------------------------------- | --------------------------------------------- |
| 日期   | 2024 年 6 月 13 日 10:13 / UTC+9 | 2024 年 8 月 29 日 10:29 / UTC+9 |
| 区块编号 | `#156,660,000`                                | `#162,900,480`                                |

### 摘要

Kairos测试网的[v1.0.0版](https://github.com/kaiachain/kaia/releases/tag/v1.0.0)和主网的[v1.0.2版](https://github.com/kaiachain/kaia/releases/tag/v1.0.2)引入了Kaia过渡硬分叉。 这次硬分叉标志着从 Klaytn 到 Kaia 区块链的过渡。 它包括根据 [KIP-160](https://kips.kaia.io/KIPs/kip-160) 定义的 TreasuryRebalanceV2 硬分叉和代币分配合约、根据 [KIP-162](https://kips.kaia.io/KIPs/kip-162) 定义的与 EIP-1559 类似的交易优先权费（tip）、[KIP-163](https://kips.kaia.io/KIPs/kip-163) 中描述的验证器 PublicDelegation 和 CnStakingV3 合约，以及修改为 1 个区块的定值更新间隔。