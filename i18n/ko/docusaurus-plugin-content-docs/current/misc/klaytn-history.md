# 클레이튼 하드포크 히스토리

이 페이지는 클레이튼 블록체인의 모든 하드포크를 보여줍니다.

## Randao

| ` `   | Baobab                                                        | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Dec 19, 2023 10:05:01 / UTC+9 | Mar 04, 2024 10:25:34 / UTC+9 |
| 블록 번호 | `#141,367,000`                                                | `#147,534,000`                                                |

### 요약

Randao hardfork was introduced with the [v1.12.0 release](https://github.com/klaytn/klaytn/releases/tag/v1.12.0). It implements an optional hardfork implementing the Randao on-chain randomness according to [KIP-113](https://kips.klaytn.foundation/KIPs/kip-113), [KIP-114](https://kips.klaytn.foundation/KIPs/kip-114), [KIP-146](https://kips.klaytn.foundation/KIPs/kip-146).

## Cancun

| ` `   | Baobab                                                        | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Dec 19, 2023 10:05:01 / UTC+9 | Mar 04, 2024 10:25:34 / UTC+9 |
| 블록 번호 | `#141,367,000`                                                | `#147,534,000`                                                |

### 요약

Ethereum's Cancun hardfork items were introduced with the [v1.12.0 release](https://github.com/klaytn/klaytn/releases/tag/v1.12.0). For specific information, please see the release note. In addition, AccessList transaction type(introduced in [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)) became fully supported ([#1955](https://github.com/klaytn/klaytn/pull/1955)).

## Shanghai

| ` `   | Baobab                                                        | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Apr 28, 2023 10:30:31 / UTC+9 | Oct 16, 2023 10:50:24 / UTC+9 |
| 블록 번호 | `#131,608,000`                                                | `#135,456,000`                                                |

### 요약

Ethereum's Shanghai hardfork items were introduced with the [v1.11.0 release](https://github.com/klaytn/klaytn/releases/tag/v1.11.0). It includes the features equivalent to Ethereum Shanghai hardfork([#1883](https://github.com/klaytn/klaytn/pull/1883), [#1861](https://github.com/klaytn/klaytn/pull/1861), [#1888](https://github.com/klaytn/klaytn/pull/1888)) and fixed to allow a new contract account to be created by overwriting an EOA ([#1904](https://github.com/klaytn/klaytn/pull/1904)).

## KIP-103 <a id="kip-103"></a>

| ` `   | Baobab                                                        | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Apr 06, 2023 04:25:03 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| 블록 번호 | `#119,145,600`                                                | `#119,750,400`                                                |

### 요약

KIP-103 하드포크는 [v1.10.2 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.10.2)와 함께 도입되었습니다. 여기에는 Treasury 리밸런싱의 기술 사양인 [KIP-103](https://kips.klaytn.foundation/KIPs/kip-103)의 구현이 포함되어 있습니다([KGP-6](https://govforum.klaytn.foundation/t/kgp-6-proposal-to-establish-a-sustainable-and-verifiable-klay-token-economy/157)).

### Treasury Rebalance <a id="treasury-rebalance"></a>

| ` `                       | Baobab                                     | Cypress                                    |
| ------------------------- | ------------------------------------------ | ------------------------------------------ |
| TreasuryRebalance 컨트랙트 주소 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 |
| KCV 주소                    | 0xaa8d19a5e17e9e1bA693f13aB0E079d274a7e51E | 0x4f04251064274252D27D4af55BC85b68B3adD992 |
| KFF 주소                    | 0x8B537f5BC7d176a94D7bF63BeFB81586EB3D1c0E | 0x85D82D811743b4B8F3c48F3e48A1664d1FfC2C10 |
| KCF 주소                    | 0x47E3DbB8c1602BdB0DAeeE89Ce59452c4746CA1C | 0xdd4C8d805fC110369D3B148a6692F283ffBDCcd3 |

## Kore <a id="kore"></a>

| ` `   | Baobab                                                        | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Jan 10, 2023 10:20:50 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| 블록 번호 | `#111,736,800`                                                | `#119,750,400`                                                |

### 요약

Kore 하드포크는 [v1.10.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.10.0)와 함께 도입되었습니다. 온체인 거버넌스 투표 방식([KIP-81](https://kips.klaytn.foundation/KIPs/kip-81)), 새로운 GC 보상 구조([KIP-82](https://kips.klaytn.foundation/KIPs/kip-82)) 및 EVM 변경 사항을 구현한 것입니다.

## Magma <a id="magma"></a>

| ` `   | Baobab                                                        | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Aug 08, 2022 11:01:20 / UTC+9 | Aug 29, 2022 11:51:00 / UTC+9 |
| 블록 번호 | `#98,347,376`                                                 | `#99,841,497`                                                 |

### 요약

Magma 하드포크는 [v1.9.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.9.0)와 함께 도입되었습니다. 여기에는 동적 가스비 가격 책정 메커니즘인 [#1493](https://github.com/klaytn/klaytn/pull/1493)이 포함되어 있으며, [KIP-71](https://kips.klaytn.foundation/KIPs/kip-71)의 구현입니다.)

## EthTxType <a id="eth-tx-type"></a>

| ` `   | Baobab                                                        | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | 2022년 3월 27일 23:56:31 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| 블록 번호 | `#86,513,895`                                                 | `#86,816,005`                                                 |

### 요약

이더리움의 EthereumTransactionType 변경은 [v1.8.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.8.0)에서 도입되었습니다. 여기에는 EthereumTransactionType을 지원하기 위한 새로운 트랜잭션 유형이 포함됩니다: TxTypeEthereumAccessList와 TxTypeEthereumDynamicFee ([#1142](https://github.com/klaytn/klaytn/pull/1142), [#1158](https://github.com/klaytn/klaytn/pull/1158)).

## London EVM <a id="london-evm"></a>

| ` `   | Baobab                                                        | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Jan 14, 2022 11:02:55 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| 블록 번호 | `#80,295,291`                                                 | `#86,816,005`                                                 |

### 요약

이더리움의 London 하드포크 항목은 [v1.7.3 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.7.3)와 함께 도입되었으며, 여기에는 이더리움 London EVM 호환을 위한 BaseFee EVM Opcode([#1065](https://github.com/klaytn/klaytn/pull/1065), [#1066](https://github.com/klaytn/klaytn/pull/1066), [#1096](https://github.com/klaytn/klaytn/pull/1096)가 포함되어 있습니다.)

## Istanbul EVM <a id="istanbul-evm"></a>

| ` `   | Baobab                                                            | Cypress                                                       |
| ----- | ----------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | 2021 년 11 월 17 일 23:42:13 / UTC+9 | 2022년 3월 31일 12:14:39 / UTC+9 |
| 블록 번호 | `#75,373,312`                                                     | `#86,816,005`                                                 |

### 요약

이더리움의 Istanbul 하드포크 항목은 [v1.7.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.7.0)와 함께 도입되었으며, 여기에는 [EIP-152](https://eips.ethereum.org/EIPS/eip-152), [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108), [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344), [EIP-1844](https://eips.ethereum.org/EIPS/eip-1844), [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200)의 변경 사항이 포함되어 있습니다.
