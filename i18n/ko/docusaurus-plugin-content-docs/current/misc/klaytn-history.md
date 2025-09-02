# 클레이튼 하드포크 역사

이 페이지는 클레이튼 블록체인의 모든 하드포크를 보여줍니다.

## Randao

| ` `   | 바오밥                                                            | Cypress                                                       |
| ----- | -------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | 2023년 12월 19일 10:05:01 / UTC+9 | Mar 04, 2024 10:25:34 / UTC+9 |
| 블록 번호 | `#141,367,000`                                                 | `#147,534,000`                                                |

### 요약

랜다오 하드포크는 [v1.12.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.12.0)와 함께 도입되었습니다. KIP-113](https://kips.klaytn.foundation/KIPs/kip-113), [KIP-114](https://kips.klaytn.foundation/KIPs/kip-114), [KIP-146](https://kips.klaytn.foundation/KIPs/kip-146)에 따라 랜다오 온체인 무작위성을 구현하는 선택적 하드포크를 구현합니다.

## 칸쿤

| ` `   | 바오밥                                                            | Cypress                                                       |
| ----- | -------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | 2023년 12월 19일 10:05:01 / UTC+9 | Mar 04, 2024 10:25:34 / UTC+9 |
| 블록 번호 | `#141,367,000`                                                 | `#147,534,000`                                                |

### 요약

이더리움의 칸쿤 하드포크 아이템은 [v1.12.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.12.0)와 함께 도입되었습니다. 자세한 내용은 릴리스 노트를 참조하세요. 또한 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)에 도입된 AccessList 트랜잭션 유형([#1955](https://github.com/klaytn/klaytn/pull/1955)이 완전히 지원됩니다.

## 상하이

| ` `   | 바오밥                                                           | Cypress                                                        |
| ----- | ------------------------------------------------------------- | -------------------------------------------------------------- |
| 날짜    | 2023년 4월 28일 10:30:31 / UTC+9 | 2023년 10월 16일 10:50:24 / UTC+9 |
| 블록 번호 | `#131,608,000`                                                | `#135,456,000`                                                 |

### 요약

이더리움의 상하이 하드포크 아이템은 [v1.11.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.11.0)와 함께 도입되었습니다. 이더리움 상하이 하드포크([#1883](https://github.com/klaytn/klaytn/pull/1883), [#1861](https://github.com/klaytn/klaytn/pull/1861), [#1888](https://github.com/klaytn/klaytn/pull/1888))에 해당하는 기능이 포함되어 있으며, EOA를 덮어쓰면 새로운 컨트랙트 계정을 만들 수 있도록 수정되었습니다([#1904](https://github.com/klaytn/klaytn/pull/1904)).

## KIP-103 <a id="kip-103"></a>

| ` `   | 바오밥                                                           | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Apr 06, 2023 04:25:03 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| 블록 번호 | `#119,145,600`                                                | `#119,750,400`                                                |

### 요약

KIP-103 하드포크는 [v1.10.2 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.10.2)와 함께 도입되었습니다. 여기에는 트레이더 리밸런싱의 기술 사양인 [KIP-103](https://kips.klaytn.foundation/KIPs/kip-103)의 구현([KGP-6](https://govforum.klaytn.foundation/t/kgp-6-proposal-to-establish-a-sustainable-and-verifiable-klay-token-economy/157))이 포함되어 있습니다.

### 재무 재조정 <a id="treasury-rebalance"></a>

| ` `           | 바오밥                                        | Cypress                                    |
| ------------- | ------------------------------------------ | ------------------------------------------ |
| 트레저리밸런스 계약 주소 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 |
| KCV 주소        | 0xaa8d19a5e17e9e1bA693f13aB0E079d274a7e51E | 0x4f04251064274252D27D4af55BC85b68B3adD992 |
| KFF 주소        | 0x8B537f5BC7d176a94D7bF63BeFB81586EB3D1c0E | 0x85D82D811743b4B8F3c48F3e48A1664d1FfC2C10 |
| KCF 주소        | 0x47E3DbB8c1602BdB0DAeeE89Ce59452c4746CA1C | 0xdd4C8d805fC110369D3B148a6692F283ffBDCcd3 |

## Kore <a id="kore"></a>

| ` `   | 바오밥                                                           | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | 2023년 1월 10일 10:20:50 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| 블록 번호 | `#111,736,800`                                                | `#119,750,400`                                                |

### 요약

코레 하드포크는 [v1.10.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.10.0)와 함께 도입되었습니다. 온체인 거버넌스 투표 방식([KIP-81](https://kips.klaytn.foundation/KIPs/kip-81)), 새로운 GC 보상 구조([KIP-82](https://kips.klaytn.foundation/KIPs/kip-82)) 및 EVM 변경 사항을 구현한 것입니다.

## 마그마 <a id="magma"></a>

| ` `   | 바오밥                                                           | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Aug 08, 2022 11:01:20 / UTC+9 | 2022년 8월 29일 11:51:00 / UTC+9 |
| 블록 번호 | `#98,347,376`                                                 | `#99,841,497`                                                 |

### 요약

마그마 하드포크는 [v1.9.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.9.0)와 함께 도입되었습니다. 여기에는 동적 가스 요금 책정 메커니즘인 [#1493](https://github.com/klaytn/klaytn/pull/1493))이 포함되며 [KIP-71](https://kips.klaytn.foundation/KIPs/kip-71)의 구현입니다.

## EthTxType <a id="eth-tx-type"></a>

| ` `   | 바오밥                                                           | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Mar 27, 2022 23:56:31 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| 블록 번호 | `#86,513,895`                                                 | `#86,816,005`                                                 |

### 요약

이더리움의 EthTxType 변경 사항은 [v1.8.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.8.0)와 함께 도입되었습니다. 여기에는 이더리움 트랜잭션 유형을 지원하는 새로운 트랜잭션 유형이 포함됩니다: TxTypeEthereumAccessList 및 TxTypeEthereumDynamicFee ([#1142](https://github.com/klaytn/klaytn/pull/1142), [#1158](https://github.com/klaytn/klaytn/pull/1158)).

## 런던 EVM <a id="london-evm"></a>

| ` `   | 바오밥                                                           | Cypress                                                       |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| 날짜    | Jan 14, 2022 11:02:55 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| 블록 번호 | `#80,295,291`                                                 | `#86,816,005`                                                 |

### 요약

이더리움의 런던 하드포크 항목은 [v1.7.3 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.7.3)와 함께 도입되었으며, 여기에는 이더리움 런던 EVM 호환을 위한 BaseFee EVM 옵코드([#1065](https://github.com/klaytn/klaytn/pull/1065), [#1066](https://github.com/klaytn/klaytn/pull/1066), [#1096](https://github.com/klaytn/klaytn/pull/1096))가 포함되어 있습니다.

## 이스탄불 EVM <a id="istanbul-evm"></a>

| ` `   | 바오밥                                                           | Cypress                                                      |
| ----- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| 날짜    | Nov 17, 2021 23:42:13 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+ |
| 블록 번호 | `#75,373,312`                                                 | `#86,816,005`                                                |

### 요약

이더리움의 이스탄불 하드포크 항목은 [v1.7.0 릴리스](https://github.com/klaytn/klaytn/releases/tag/v1.7.0)와 함께 도입되었으며, [EIP-152](https://eips.ethereum.org/EIPS/eip-152), [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108), [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344), [EIP-1844](https://eips.ethereum.org/EIPS/eip-1844), [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200)의 변경 사항을 포함하고 있습니다.
