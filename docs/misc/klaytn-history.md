# Klaytn Hard Fork History

This page shows all the hard forks to the Klaytn blockchain.

## Randao
| ` ` | Baobab                        | Cypress                       |
| --------------- |-------------------------------|-------------------------------|
| Date | Dec 19, 2023 10:05:01 / UTC+9 | Mar 04, 2024 10:25:34 / UTC+9 |
| Block number  | `#141,367,000`                | `#147,534,000`                |

### Summary
Randao hardfork was introduced with the [v1.12.0 release](https://github.com/klaytn/klaytn/releases/tag/v1.12.0). It implements an optional hardfork implementing the Randao on-chain randomness according to [KIP-113](https://kips.klaytn.foundation/KIPs/kip-113), [KIP-114](https://kips.klaytn.foundation/KIPs/kip-114), [KIP-146](https://kips.klaytn.foundation/KIPs/kip-146).

## Cancun
| ` ` | Baobab                        | Cypress                       |
| --------------- |-------------------------------|-------------------------------|
| Date | Dec 19, 2023 10:05:01 / UTC+9 | Mar 04, 2024 10:25:34 / UTC+9 |
| Block number  | `#141,367,000`                | `#147,534,000`                |

### Summary
Ethereum's Cancun hardfork items were introduced with the [v1.12.0 release](https://github.com/klaytn/klaytn/releases/tag/v1.12.0). For specific information, please see the release note. In addition, AccessList transaction type(introduced in [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)) became fully supported ([#1955](https://github.com/klaytn/klaytn/pull/1955)).  

## Shanghai
| ` ` | Baobab                        | Cypress                       |
| --------------- |-------------------------------|-------------------------------|
| Date | Apr 28, 2023 10:30:31 / UTC+9 | Oct 16, 2023 10:50:24 / UTC+9 |
| Block number  | `#131,608,000`                | `#135,456,000`                |

### Summary
Ethereum's Shanghai hardfork items were introduced with the [v1.11.0 release](https://github.com/klaytn/klaytn/releases/tag/v1.11.0). It includes the features equivalent to Ethereum Shanghai hardfork([#1883](https://github.com/klaytn/klaytn/pull/1883), [#1861](https://github.com/klaytn/klaytn/pull/1861), [#1888](https://github.com/klaytn/klaytn/pull/1888)) and fixed to allow a new contract account to be created by overwriting an EOA ([#1904](https://github.com/klaytn/klaytn/pull/1904)).

## KIP-103 <a id="kip-103"></a>

| ` ` | Baobab | Cypress |
| --------------- | --------------- | --------------- |
| Date | Apr 06, 2023 04:25:03 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| Block number  | `#119,145,600`  | `#119,750,400` |

### Summary

KIP-103 hardfork was introduced with the [v1.10.2 release](https://github.com/klaytn/klaytn/releases/tag/v1.10.2). It includes an implementation of [KIP-103](https://kips.klaytn.foundation/KIPs/kip-103) that is a technical specification of treasury rebalance([KGP-6](https://govforum.klaytn.foundation/t/kgp-6-proposal-to-establish-a-sustainable-and-verifiable-klay-token-economy/157)).


### Treasury Rebalance <a id="treasury-rebalance"></a>

| ` ` | Baobab | Cypress |
| --------------- | --------------- | --------------- |
| TreasuryRebalance contract address | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 |
| KCV address | 0xaa8d19a5e17e9e1bA693f13aB0E079d274a7e51E | 0x4f04251064274252D27D4af55BC85b68B3adD992 |
| KFF address | 0x8B537f5BC7d176a94D7bF63BeFB81586EB3D1c0E | 0x85D82D811743b4B8F3c48F3e48A1664d1FfC2C10 |
| KCF address | 0x47E3DbB8c1602BdB0DAeeE89Ce59452c4746CA1C | 0xdd4C8d805fC110369D3B148a6692F283ffBDCcd3 |


## Kore <a id="kore"></a>
| ` ` | Baobab | Cypress |
| --------------- | --------------- | --------------- |
| Date | Jan 10, 2023 10:20:50 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| Block number  | `#111,736,800`  | `#119,750,400` |

### Summary

Kore hardfork was introduced with the [v1.10.0 release](https://github.com/klaytn/klaytn/releases/tag/v1.10.0). It is an implementation of the on-chain governance voting method ([KIP-81](https://kips.klaytn.foundation/KIPs/kip-81)), a new GC reward structure ([KIP-82](https://kips.klaytn.foundation/KIPs/kip-82)), and EVM changes.


## Magma <a id="magma"></a>
| ` ` | Baobab | Cypress |
| --------------- | --------------- | --------------- |
| Date | Aug 08, 2022 11:01:20 / UTC+9 | Aug 29, 2022 11:51:00 / UTC+9 |
| Block number  | `#98,347,376`  | `#99,841,497` |

### Summary

Magma hardfork was introduced with the [v1.9.0 release](https://github.com/klaytn/klaytn/releases/tag/v1.9.0). It includes dynamic gas fee pricing mechanism, [#1493](https://github.com/klaytn/klaytn/pull/1493)) and is an implementation of [KIP-71](https://kips.klaytn.foundation/KIPs/kip-71).

## EthTxType <a id="eth-tx-type"></a>

| ` ` | Baobab | Cypress |
| --------------- | --------------- | --------------- |
| Date | Mar 27, 2022 23:56:31 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| Block number  | `#86,513,895`  | `#86,816,005` |

### Summary

Ethereum's EthTxType changes were introduced with the [v1.8.0 release](https://github.com/klaytn/klaytn/releases/tag/v1.8.0). It includes new transactions types to support Ethereum transaction types: TxTypeEthereumAccessListand TxTypeEthereumDynamicFee ([#1142](https://github.com/klaytn/klaytn/pull/1142), [#1158](https://github.com/klaytn/klaytn/pull/1158)).

## London EVM <a id="london-evm"></a>

| ` ` | Baobab | Cypress |
| --------------- | --------------- | --------------- |
| Date | Jan 14, 2022 11:02:55 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| Block number  | `#80,295,291`  | `#86,816,005` |

### Summary

Ethereum's London hard fork items were introduced with the [v1.7.3 release](https://github.com/klaytn/klaytn/releases/tag/v1.7.3), which includes BaseFee EVM opcode for Ethereum London EVM compatibility ([#1065](https://github.com/klaytn/klaytn/pull/1065), [#1066](https://github.com/klaytn/klaytn/pull/1066), [#1096](https://github.com/klaytn/klaytn/pull/1096)).

## Istanbul EVM <a id="istanbul-evm"></a>

| ` ` | Baobab | Cypress |
| --------------- | --------------- | --------------- |
| Date | Nov 17, 2021 23:42:13 / UTC+9 |  Mar 31, 2022 12:14:39 / UTC+ |
| Block number  | `#75,373,312`  | `#86,816,005` |

### Summary

Ethereum's Istanbul hard fork items were introduced with the [v1.7.0 release](https://github.com/klaytn/klaytn/releases/tag/v1.7.0), which includes changes from [EIP-152](https://eips.ethereum.org/EIPS/eip-152), [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108), [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344), [EIP-1844](https://eips.ethereum.org/EIPS/eip-1844), and [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200).
