# Kaia 硬分叉历史

本页显示 Kaia 区块链的所有硬分叉。

## Randao

| ` `  | Baobab                                                        | Cypress                                                       |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Dec 19, 2023 10:05:01 / UTC+9 | Mar 04, 2024 10:25:34 / UTC+9 |
| 区块编号 | `#141,367,000`                                                | `#147,534,000`                                                |

### 摘要

在 [v1.12.0 版](https://github.com/klaytn/klaytn/releases/tag/v1.12.0) 中引入了 Randao hardfork。 它根据 [KIP-113](https://kips.kaia.io/KIPs/kip-113)、[KIP-114](https://kips.kaia.io/KIPs/kip-114)、[KIP-146](https://kips.kaia.io/KIPs/kip-146) 实现了一个可选的硬分叉，实现了 Randao 链上随机性。

## Cancun

| ` `  | Baobab                                                        | Cypress                                                       |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Dec 19, 2023 10:05:01 / UTC+9 | Mar 04, 2024 10:25:34 / UTC+9 |
| 区块编号 | `#141,367,000`                                                | `#147,534,000`                                                |

### 摘要

以太坊的坎昆硬分叉项目是在 [v1.12.0 版本](https://github.com/klaytn/klaytn/releases/tag/v1.12.0) 中引入的。 有关具体信息，请参阅发布说明。 此外，AccessList 事务类型（[EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)中引入）已完全支持（[#1955](https://github.com/klaytn/klaytn/pull/1955)）。

## Shanghai

| ` `  | Baobab                                                        | Cypress                                                       |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Apr 28, 2023 10:30:31 / UTC+9 | Oct 16, 2023 10:50:24 / UTC+9 |
| 区块编号 | `#131,608,000`                                                | `#135,456,000`                                                |

### 摘要

以太坊的上海硬分叉项目是在 [v1.11.0 版本](https://github.com/klaytn/klaytn/releases/tag/v1.11.0) 中推出的。 它包含与以太坊上海硬分叉（[#1883](https://github.com/klaytn/klaytn/pull/1883)、[#1861](https://github.com/klaytn/klaytn/pull/1861)、[#1888](https://github.com/klaytn/klaytn/pull/1888)）相当的功能，并允许通过覆盖 EOA 来创建新的合约账户（[#1904](https://github.com/klaytn/klaytn/pull/1904)）。

## KIP-103 <a id="kip-103"></a>

| ` `  | Baobab                                                        | Cypress                                                       |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Apr 06, 2023 04:25:03 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| 区块编号 | `#119,145,600`                                                | `#119,750,400`                                                |

### 摘要

KIP-103 硬分叉在[v1.10.2 版本](https://github.com/klaytn/klaytn/releases/tag/v1.10.2)中引入。 它包括[KIP-103](https://kips.kaia.io/KIPs/kip-103)的实施，这是国库再平衡的技术规范（[KGP-6](https://govforum.klaytn.foundation/t/kgp-6-proposal-to-establish-a-sustainable-and-verifiable-klay-token-economy/157)）。

### 国库再平衡<a id="treasury-rebalance"></a>

| ` `       | Baobab                                     | Cypress                                    |
| --------- | ------------------------------------------ | ------------------------------------------ |
| 财务部平衡合同地址 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 |
| KCV 地址    | 0xaa8d19a5e17e9e1bA693f13aB0E079d274a7e51E | 0x4f04251064274252D27D4af55BC85b68B3adD992 |
| KFF 地址    | 0x8B537f5BC7d176a94D7bF63BeFB81586EB3D1c0E | 0x85D82D811743b4B8F3c48F3e48A1664d1FfC2C10 |
| KCF 地址    | 0x47E3DbB8c1602BdB0DAeeE89Ce59452c4746CA1C | 0xdd4C8d805fC110369D3B148a6692F283ffBDCcd3 |

## Kore <a id="kore"></a>

| ` `  | Baobab                                                        | Cypress                                                       |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Jan 10, 2023 10:20:50 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| 区块编号 | `#111,736,800`                                                | `#119,750,400`                                                |

### 摘要

Kore 硬分叉是在[v1.10.0 版本](https://github.com/klaytn/klaytn/releases/tag/v1.10.0)中引入的。 它实现了链上治理投票方法（[KIP-81](https://kips.kaia.io/KIPs/kip-81)）、新的 GC 奖励结构（[KIP-82](https://kips.kaia.io/KIPs/kip-82)）和 EVM 更改。

## Magma <a id="magma"></a>

| ` `  | Baobab                                                        | Cypress                                                       |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Aug 08, 2022 11:01:20 / UTC+9 | Aug 29, 2022 11:51:00 / UTC+9 |
| 区块编号 | `#98,347,376`                                                 | `#99,841,497`                                                 |

### 摘要

在 [v1.9.0 版](https://github.com/klaytn/klaytn/releases/tag/v1.9.0) 中引入了 Magma 硬分叉。 它包括动态天然气收费定价机制，[#1493](https://github.com/klaytn/klaytn/pull/1493))，是[KIP-71](https://kips.kaia.io/KIPs/kip-71)的实施。

## EthTxType <a id="eth-tx-type"></a>

| ` `  | Baobab                                                           | Cypress                                                       |
| ---- | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | 2022 年 3 月 27 日 23:56:31 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| 区块编号 | `#86,513,895`                                                    | `#86,816,005`                                                 |

### 摘要

以太坊的 EthTxType 变更是在 [v1.8.0 版本](https://github.com/klaytn/klaytn/releases/tag/v1.8.0) 中引入的。 它包括支持以太坊交易类型的新交易类型：TxTypeEthereumAccessList 和 TxTypeEthereumDynamicFee（[#1142](https://github.com/klaytn/klaytn/pull/1142), [#1158](https://github.com/klaytn/klaytn/pull/1158)）。

## London EVM <a id="london-evm"></a>

| ` `  | Baobab                                                        | Cypress                                                       |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Jan 14, 2022 11:02:55 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| 区块编号 | `#80,295,291`                                                 | `#86,816,005`                                                 |

### 摘要

以太坊的伦敦硬分叉项目是在[v1.7.3 版本](https://github.com/klaytn/klaytn/releases/tag/v1.7.3)中引入的，其中包括用于兼容以太坊伦敦 EVM 的 BaseFee EVM 操作码（[#1065](https://github.com/klaytn/klaytn/pull/1065)、[#1066](https://github.com/klaytn/klaytn/pull/1066)、[#1096](https://github.com/klaytn/klaytn/pull/1096)）。

## Istanbul EVM <a id="istanbul-evm"></a>

| ` `  | Baobab                                                            | Cypress                                                         |
| ---- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| 日期   | 2021 年 11 月 17 日 23:42:13 / UTC+9 | 2022 年 3 月 31 日 12:14:39 / UTC+ |
| 区块编号 | `#75,373,312`                                                     | `#86,816,005`                                                   |

### 摘要

以太坊的伊斯坦布尔硬分叉项目是随着[v1.7.0 版本](https://github.com/klaytn/klaytn/releases/tag/v1.7.0)推出的，其中包括[EIP-152](https://eips.ethereum.org/EIPS/eip-152)、[EIP-1108](https://eips.ethereum.org/EIPS/eip-1108)、[EIP-1344](https://eips.ethereum.org/EIPS/eip-1344)、[EIP-1844](https://eips.ethereum.org/EIPS/eip-1844)和[EIP-2200](https://eips.ethereum.org/EIPS/eip-2200)的变更。
