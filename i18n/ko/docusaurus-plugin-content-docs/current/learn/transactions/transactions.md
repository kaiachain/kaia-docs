# 트랜잭션

## 트랜잭션 개요 <a id="transactions-overview"></a>

블록체인 플랫폼에서 트랜잭션은 노드 간에 전송되는 메시지로, 블록체인의 상태를 변경합니다. 예를 들어 앨리스의 계정에서 밥의 계정으로 10 KAIA를 전송하는 트랜잭션이 실행되면 앨리스의 잔액은 10 KAIA 감소하고 밥의 잔액은 10 KAIA 증가합니다. 트랜잭션은 원자 연산이므로 다른 트랜잭션에 끼워 넣을 수 없다는 점에 유의하시기 바랍니다. 일반적인 블록체인 트랜잭션은 아래와 같은 구성 요소를 가지고 있습니다:

| 구성 요소    | 설명                                                                                                                                                                                                                                                                                    |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value    | 전송할 `peb`의 KAIA 양입니다.                                                                                                                                                                                                                                                 |
| to       | 이체된 값을 받을 계정 주소입니다.                                                                                                                                                                                                                                                   |
| input    | 트랜잭션 실행에 사용되는 트랜잭션에 첨부된 데이터입니다.                                                                                                                                                                                                                                       |
| v, r, s  | 수신자가 발신자의 주소를 알 수 있도록 발신자가 생성한 암호화 서명입니다.                                                                                                                                                                                                                             |
| nonce    | 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 발신자가 동일한 nonce를 가진 두 개의 트랜잭션을 생성한 경우 하나만 실행됩니다.                                                                                                                                                                     |
| gas      | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                                                                                                                                     |
| gasPrice | 발신자가 토큰으로 지불할 금액을 얻기 위한 승수입니다. 발신자가 지불할 토큰의 양은 `gas` \* `gasPrice`를 통해 계산됩니다. 예를 들어, 가스값이 10이고 가스가격이 10^18이면 발신자는 트랜잭션 수수료로 10 KAIA를 지불하게 됩니다. KAIA 단위는 [여기](../klaytn-native-coin-klay.md#units-of-klay)에 설명되어 있습니다. |

## 카이아 트랜잭션 <a id="klaytn-transactions"></a>

일반적인 블록체인 플랫폼은 단일 트랜잭션 유형을 제공하지만, 카이아는 메모리 공간과 성능을 최적화하고 새로운 기능으로 트랜잭션에 힘을 실어주는 다양한 트랜잭션 유형을 제공합니다.

### 트랜잭션 서명 유효성 검사 <a id="signature-validation-of-transactions"></a>

일반적인 블록체인 플랫폼에서 주소는 공개 키에서 파생되며, 공개 키는 다시 트랜잭션 서명에서 파생됩니다. 이는 주소와 키 쌍이 강력하게 결합된 경우에만 가능합니다.

카이아에서는 키 쌍이 주소와 분리되어 있기 때문에 트랜잭션 서명을 사용하여 발신자 주소를 유추할 수 없습니다. 이것이 TxTypeLegacyTransaction을 제외한 카이아 트랜잭션 유형에 `from` 필드가 있는 이유입니다. 카이아에서는 트랜잭션의 유효성을 검사하기 위해 `from`의 [AccountKey](../accounts.md#account-key)를 구하고, 구한 키로 트랜잭션 서명의 유효성을 검사합니다.

### 수수료 위임 <a id="fee-delegation"></a>

카이아는 비즈니스 모델 설계에 필요한 유연성을 제공하기 위해 기본 트랜잭션 유형에 대해 다양한 수수료 위임 버전을 제공합니다. 이러한 변형을 통해 서비스 제공자는 트랜잭션 수수료를 대신 지불하여 최종 사용자 활동에 보조금을 지급할 수 있습니다. 트랜잭션 수수료 보조금은 비율 매개변수가 있는 트랜잭션을 사용하여 서비스 제공자가 부담할 수수료의 비율을 지정할 수 있도록 하여 더욱 세부적으로 설정할 수 있습니다. 수수료 대납 트랜잭션에는 발신자와 수수료 납부자의 서명이 최소 두 개 필요합니다.

### SenderTxHash <a id="sendertxhash"></a>

SenderTxHash는 수수료 납부자의 주소와 서명이 없는 트랜잭션의 해시입니다. 수수료 대납 트랜잭션의 트랜잭션 해시는 수수료 납부자가 트랜잭션에 서명할 때까지 아직 결정되지 않습니다. 수수료 위임 거래를 추적하려면 발신자는 발신자와 수수료 납부자 모두의 서명이 포함된 전체 거래에서 파생된 트랜잭션 해시를 얻어야 합니다. 발신자가 트랜잭션 해시를 얻는 것은 매우 어렵기 때문에 Kaia는 트랜잭션 해시뿐만 아니라 SenderTxHash를 제공합니다. To find the complete fee-delegated transaction in the Kaia network, the sender generates the SenderTxHash and requests a transaction object via [klay_getTransactionBySenderTxHash](../../references/json-rpc/klay/get-transaction-by-sender-tx-hash/). SenderTxHash를 가져오는 방법은 각 트랜잭션 유형에 따라 다르며, 각 트랜잭션 유형의 설명에 설명되어 있습니다.

각 거래 유형에 대해 자세히 설명합니다:

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
