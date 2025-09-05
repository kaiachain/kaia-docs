# Klaytn 硬分叉歷史

本頁顯示 Klaytn 區塊鏈的所有硬分叉。

:::info

本文件列出 Kaia 過渡前發生的硬分叉。 關於過渡後的硬分叉，請參考 [Kaia 硬分叉歷史](kaia-history.md)。

:::

## 蘭島

| ` `  | 猴麵包樹                                                          | 賽普拉斯                                                          |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Dec 19, 2023 10:05:01 / UTC+9 | Mar 04, 2024 10:25:34 / UTC+9 |
| 區塊號碼 | `#141,367,000`                                                | `#147,534,000`                                                |

### 摘要

Randao hardfork 隨 [v1.12.0 版本] (https://github.com/klaytn/klaytn/releases/tag/v1.12.0) 推出。 它根據 [KIP-113](https://kips.klaytn.foundation/KIPs/kip-113)、[KIP-114](https://kips.klaytn.foundation/KIPs/kip-114)、[KIP-146](https://kips.klaytn.foundation/KIPs/kip-146)，實作了一個執行 Randao on-chain 隨機性的可選硬叉。

## 坎昆

| ` `  | 猴麵包樹                                                          | 賽普拉斯                                                          |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Dec 19, 2023 10:05:01 / UTC+9 | Mar 04, 2024 10:25:34 / UTC+9 |
| 區塊號碼 | `#141,367,000`                                                | `#147,534,000`                                                |

### 摘要

Ethereum 的 Cancun 硬分叉項目是在 [v1.12.0 版本](https://github.com/klaytn/klaytn/releases/tag/v1.12.0) 推出的。 如需具體資訊，請參閱發佈說明。 此外，AccessList 交易類型(在 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) 中引入) 已完全支援 ([#1955](https://github.com/klaytn/klaytn/pull/1955))。

## 上海

| ` `  | 猴麵包樹                                                             | 賽普拉斯                                                              |
| ---- | ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| 日期   | 2023 年 4 月 28 日 10:30:31 / UTC+9 | 2023 年 10 月 16 日 10:50:24 / UTC+9 |
| 區塊號碼 | `#131,608,000`                                                   | `#135,456,000`                                                    |

### 摘要

Ethereum 的上海硬分叉項目是隨著 [v1.11.0 版本](https://github.com/klaytn/klaytn/releases/tag/v1.11.0) 推出的。 它包含相當於 Ethereum Shanghai hardfork([#1883](https://github.com/klaytn/klaytn/pull/1883)、[#1861](https://github.com/klaytn/klaytn/pull/1861)、[#1888](https://github.com/klaytn/klaytn/pull/1888))的功能，並固定允許透過覆寫 EOA 來建立新的契約帳戶([#1904](https://github.com/klaytn/klaytn/pull/1904))。

## KIP-103<a id="kip-103"></a>

| ` `  | 猴麵包樹                                                          | 賽普拉斯                                                          |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Apr 06, 2023 04:25:03 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| 區塊號碼 | `#119,145,600`                                                | `#119,750,400`                                                |

### 摘要

KIP-103 hardfork 是在 [v1.10.2 版本] (https://github.com/klaytn/klaytn/releases/tag/v1.10.2) 中引入的。 它包含了 [KIP-103](https://kips.klaytn.foundation/KIPs/kip-103) 的實作，是庫務再平衡的技術規格（[KGP-6](https://govforum.klaytn.foundation/t/kgp-6-proposal-to-establish-a-sustainable-and-verifiable-klay-token-economy/157) ）。

### 庫務再平衡<a id="treasury-rebalance"></a>

| ` `                    | 猴麵包樹                                       | 賽普拉斯                                       |
| ---------------------- | ------------------------------------------ | ------------------------------------------ |
| TreasuryRebalance 合約地址 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 |
| KCV 地址                 | 0xaa8d19a5e17e9e1bA693f13aB0E079d274a7e51E | 0x4f04251064274252D27D4af55BC85b68B3adD992 |
| KFF 地址                 | 0x8B537f5BC7d176a94D7bF63BeFB81586EB3D1c0E | 0x85D82D811743b4B8F3c48F3e48A1664d1FfC2C10 |
| KCF 地址                 | 0x47E3DbB8c1602BdB0DAeeE89Ce59452c4746CA1C | 0xdd4C8d805fC110369D3B148a6692F283ffBDCcd3 |

## 韓國<a id="kore"></a>

| ` `  | 猴麵包樹                                                          | 賽普拉斯                                                          |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Jan 10, 2023 10:20:50 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| 區塊號碼 | `#111,736,800`                                                | `#119,750,400`                                                |

### 摘要

Kore hardfork 是在 [v1.10.0 版] (https://github.com/klaytn/klaytn/releases/tag/v1.10.0) 推出的。 它是鏈上治理投票方法 ([KIP-81](https://kips.klaytn.foundation/KIPs/kip-81))、新的 GC 獎勵結構 ([KIP-82](https://kips.klaytn.foundation/KIPs/kip-82))，以及 EVM 變更的實作。

## 岩漿<a id="magma"></a>

| ` `  | 猴麵包樹                                                          | 賽普拉斯                                                          |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Aug 08, 2022 11:01:20 / UTC+9 | Aug 29, 2022 11:51:00 / UTC+9 |
| 區塊號碼 | `#98,347,376`                                                 | `#99,841,497`                                                 |

### 摘要

Magma hardfork 是在 [v1.9.0 版] (https://github.com/klaytn/klaytn/releases/tag/v1.9.0) 推出的。 它包含動態瓦斯收費機制，[#1493](https://github.com/klaytn/klaytn/pull/1493))，並且是[KIP-71](https://kips.klaytn.foundation/KIPs/kip-71)的實作。

## EthTxType<a id="eth-tx-type"></a>

| ` `  | 猴麵包樹                                                          | 賽普拉斯                                                          |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Mar 27, 2022 23:56:31 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| 區塊號碼 | `#86,513,895`                                                 | `#86,816,005`                                                 |

### 摘要

Ethereum 的 EthTxType 變更是隨著 [v1.8.0 版本](https://github.com/klaytn/klaytn/releases/tag/v1.8.0) 推出的。 它包含新的交易類型，以支援 Ethereum 交易類型：TxTypeEthereumAccessList 和 TxTypeEthereumDynamicFee ([#1142](https://github.com/klaytn/klaytn/pull/1142), [#1158](https://github.com/klaytn/klaytn/pull/1158)).

## 倫敦 EVM<a id="london-evm"></a>

| ` `  | 猴麵包樹                                                          | 賽普拉斯                                                          |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 日期   | Jan 14, 2022 11:02:55 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| 區塊號碼 | `#80,295,291`                                                 | `#86,816,005`                                                 |

### 摘要

Ethereum 的倫敦硬分叉項目隨著 [v1.7.3 版本](https://github.com/klaytn/klaytn/releases/tag/v1.7.3) 推出，其中包含 BaseFee EVM 運算碼，可相容於 Ethereum 倫敦 EVM ([#1065](https://github.com/klaytn/klaytn/pull/1065), [#1066](https://github.com/klaytn/klaytn/pull/1066), [#1096](https://github.com/klaytn/klaytn/pull/1096)).

## 伊斯坦堡 EVM<a id="istanbul-evm"></a>

| ` `  | 猴麵包樹                                                          | 賽普拉斯                                                         |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| 日期   | Nov 17, 2021 23:42:13 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+ |
| 區塊號碼 | `#75,373,312`                                                 | `#86,816,005`                                                |

### 摘要

Ethereum 的伊斯坦堡硬分叉項目隨著 [v1.7.0 版本](https://github.com/klaytn/klaytn/releases/tag/v1.7.0) 推出，其中包括 [EIP-152](https://eips.ethereum.org/EIPS/eip-152), [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108), [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344), [EIP-1844](https://eips.ethereum.org/EIPS/eip-1844), 和 [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) 的變更。
