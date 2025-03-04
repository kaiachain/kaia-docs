# 트랜잭션 구현

이 가이드는 다양한 트랜잭션 유형, 인코딩, 서명, 네트워크 상호 작용을 다루며 Kaia 네트워크에서 트랜잭션을 구현하는 방법에 대한 포괄적인 개요를 제공합니다.

## 카이아 트랜잭션 구성 요소

카이아 거래에는 일반적으로 다음과 같은 구성 요소가 포함됩니다:

| 구성 요소         | 설명                                                                                                                                                                                                                                                                                                        |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| '부터'          | 발신자의 주소입니다.  키 쌍과 주소의 분리로 인해 대부분의 카이아 트랜잭션 유형에 필요합니다.                                                                                                                                                                                                                     |
| `to`          | 이체된 값을 받을 계정 주소입니다.                                                                                                                                                                                                                                                                       |
| `값`           | 전송할 `peb`의 KAIA 양입니다.                                                                                                                                                                                                                                                                     |
| '입력'          | 트랜잭션 실행에 사용되는 트랜잭션에 첨부된 데이터입니다.                                                                                                                                                                                                                                                           |
| v`, `r`, `s\` | 수신자가 발신자의 주소를 알 수 있도록 발신자가 생성한 암호화 서명입니다.                                                                                                                                                                                                                                                 |
| `nonce`       | 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 발신자가 동일한 nonce를 가진 두 개의 트랜잭션을 생성한 경우 하나만 실행됩니다.                                                                                                                                                                                         |
| `gas`         | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                                                                                                                                                         |
| `gasPrice`    | 발신자가 토큰으로 지불할 금액을 얻기 위한 승수입니다. 발신자가 지불할 토큰의 양은 `gas` \* `gasPrice`를 통해 계산됩니다. 예를 들어, 가스값이 10이고 가스가격이 10^18이면 발신자는 트랜잭션 수수료로 10 KAIA를 지불하게 됩니다. KAIA의 단위는 [여기](../../learn/token-economics/kaia-native-token.md#units-of-kaia)에 설명되어 있습니다. |

## 서명 유효성 검사

카이아는 주소에서 키 쌍을 분리하기 때문에 서명 검증은 일반적인 블록체인과 다릅니다.  보낸 사람\` 필드는 발신자를 식별하기 때문에 매우 중요합니다.  '보낸 사람' 주소와 연결된 [AccountKey](../../learn/accounts.md#account-key)는 서명의 유효성을 검사하는 데 사용됩니다.

## 수수료 위임 및 SenderTxHash

카이아의 수수료 위임 기능을 사용하면 제3자가 거래 수수료를 대신 지불할 수 있습니다.  이를 위해서는 발신자와 수수료 납부자가 각각 한 명씩 두 명의 서명이 필요합니다. 'SenderTxHash'는 수수료 위임 거래를 추적하는 데 매우 중요합니다. 수수료 납부자의 정보가 '없는' 거래의 해시로, 발신자는 수수료 납부자가 서명하기 전에 거래를 추적할 수 있습니다.  발신자는 `SenderTxHash`를 사용하여 [kaia_getTransactionBySenderTxHash](../../references/json-rpc/kaia/get-transaction-by-sender-tx-hash) RPC 메서드를 통해 전체 트랜잭션을 검색할 수 있습니다.

## 거래 유형

일반적인 블록체인 플랫폼은 단일 트랜잭션 유형을 제공하지만, 카이아는 메모리 공간과 성능을 최적화하고 새로운 기능으로 트랜잭션에 힘을 실어주는 다양한 트랜잭션 유형을 제공합니다. 다음 표는 Kaia에서 사용할 수 있는 거래 유형에 대한 개요입니다:

|                        | 기본                                                                      | feeDelegation                                                                                            | 부분 수수료 위임                                                                                                                          |
| :--------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| Legacy                 | [TxTypeLegacyTransaction](./basic.md#txtypelegacytransaction)           | N/A                                                                                                      | N/A                                                                                                                                |
| ValueTransfer          | [TxTypeValueTransfer](./basic.md#txtypevaluetransfer)                   | [TxTypeFeeDelegatedValueTransfer](./fee-delegation.md#txtypefeedelegatedvaluetransfer)                   | [TxTypeFeeDelegatedValueTransferWithRatio](./partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [TxTypeValueTransferMemo](./basic.md#txtypevaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemo](./fee-delegation.md#txtypefeedelegatedvaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemoWithRatio](./partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [TxTypeSmartContractDeploy](./basic.md#txtypesmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeploy](./fee-delegation.md#txtypefeedelegatedsmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeployWithRatio](./partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [TxTypeSmartContractExecution](./basic.md#txtypesmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecution](./fee-delegation.md#txtypefeedelegatedsmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecutionWithRatio](./partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [TxTypeAccountUpdate](./basic.md#txtypeaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdate](./fee-delegation.md#txtypefeedelegatedaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdateWithRatio](./partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio)                   |
| Cancel                 | [TxTypeCancel](./basic.md#txtypecancel)                                 | [TxTypeFeeDelegatedCancel](./fee-delegation.md#txtypefeedelegatedcancel)                                 | [TxTypeFeeDelegatedCancelWithRatio](./partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [TxTypeChainDataAnchoring](./basic.md#txtypechaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoring](./fee-delegation.md#txtypefeedelegatedchaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoringWithRatio](./partial-fee-delegation.md#txtypefeedelegatedchaindataanchoringwithratio)         |

## 구현 세부 정보

- \*\*RLP 인코딩: \*\* 트랜잭션은 제출 전에 재귀적 길이 접두사(RLP) 인코딩을 사용하여 직렬화됩니다.
- **서명:** 거래는 [서명 알고리즘 지정(예: ECDSA)]을 사용하여 서명하여 신뢰성을 보장합니다.
- **예제 및 RPC 출력:** 이 섹션에서는 각 트랜잭션 유형에 대한 실제 예제 및 예상 RPC 출력을 제공합니다.  (참고: `TxTypeValueTransfer`는 추가 데이터 없이 KAIA를 전송하는 반면, `TxTypeValueTransferMemo`는 전송과 함께 짧은 메모 필드를 포함할 수 있습니다).

개발자는 이러한 구성 요소와 구현 세부 사항을 이해함으로써 Kaia 네트워크에서 애플리케이션을 효과적으로 구축할 수 있습니다.