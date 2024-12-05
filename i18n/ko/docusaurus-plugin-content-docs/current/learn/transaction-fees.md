# 트랜잭션 수수료

:::note

참고: `Kore` 하드포크로 인해 트랜잭션 수수료가 변경되었습니다. 이전 문서를 원하시는 경우 [이전 문서](transaction-fees-previous.md)를 참고하시기 바랍니다.

`Kore` 하드포크 블록 번호는 다음과 같습니다.

- Baobab 테스트넷: `#111736800`
- Cypress 메인넷: `#119750400`

:::

한 거래의 트랜잭션 수수료는 다음과 같이 계산됩니다:

```text
Transaction fee := (Gas used) x (GasPrice)
```

이와 관련하여 이해하기 쉬운 비유로 주유소에서 기름을 넣는다고 가정해 보겠습니다. 가스 가격은 정유사에서 매일 결정하며, 오늘의 가격은 2달러입니다. 15L를 주유하면 $30 = 15L x $2/1L를 지불하게 되고, 30달러는 은행 계좌에서 지급됩니다. 또한 거래는 장부에 기록됩니다.

트랜잭션 수수료는 위와 동일한 방식으로 작동합니다. 네트워크는 모든 블록의 gas 가격을 결정합니다. 현재 블록의 gas 가격이 30 ston이라고 가정합니다. `from` 계정에서 제출한 트랜잭션에 21000 gas가 청구되었다면, 630000 ston = (21000 gas \* 30 ston)이 `from` 계정에서 지불됩니다. 또한 해당 트랜잭션은 블록에 기록되어 모든 블록체인 노드의 상태에 적용될 것입니다.

다시 합산하여 계산된 트랜잭션 수수료는 발신자 또는 수수료 납부자의 계정에서 차감됩니다. 단, 수수료는 트랜잭션이 klay_sendTransaction/eth_sendTransaction에 의해 생성된 경우에만 잔액에서 차감할 수 있습니다. 다른 트랜잭션은 블록에 포함될 수 없기 때문에 상태를 변경할 수 없습니다. 이는 어떤 방식으로든 시뮬레이션일 뿐입니다.

이것은 트랜잭션 수수료에 대한 전반적인 설명이며, 이 시점에서 gas 가격이 어떻게 결정되고 gas가 어떻게 계산되는지에 대해 자세히 설명하겠습니다.

## Gas 가격 개요 <a id="gas-price-overview"></a>

이더리움과 달리 클레이튼은 처음에는 `unitPrice`라는 고정 gas 가격을 사용했습니다. 그러나 Magma 하드포크 이후 클레이튼은 이더리움의 기본 수수료를 수정하여 개념을 새롭게 정의한 동적 gas 가격, 즉 '유효 gas 가격'을 사용하기 시작했습니다. gas 가격에 대한 많은 변화가 있었기 때문에 gas 가격을 어떤 값으로 설정해야 할지 꽤 혼란스러울 수 있습니다. 그래서 아래에 gas 가격을 설정하는 방법에 대한 가이드를 만들었습니다.

| 네트워크     | 기본료 이전                                                                                                                                     | 기본료 이후                                                                                                    |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| klaytn   | tx 매개변수 gas 가격: 네트워크 정의. 반드시 '단위 가격'으로 설정해야 함 <br /> <br /> gas 가격: tx 매개변수 gas 가격 사용                                                      | tx 매개변수 gas 가격: 사용자 정의. <br /> <br /> gas 가격: 네트워크에 의해 정의된 동적 gas 가격, `기본 요금+팁`을 의미합니다.                   |
| Ethereum | tx 매개변수 gas 가격: 사용자 정의. 지불할 수 있는 최대 가격을 의미합니다(예: 제안 gas 가격 = 2\*최신 블록의 기본 수수료). <br /> <br /> gas 가격: tx 매개변수 gas 가격 사용 | tx 매개변수 gas 가격: 사용자 정의. 지불할 수 있는 최대 가격을 의미합니다. <br /> <br /> gas 가격: 동적 gas 가격, `기본 수수료`, 네트워크에 의해 정의됩니다. |

### 동적 gas 요금 메커니즘 <a id="dynamic-gas-fee-mechanism"></a>

Magma 하드포크 이후 동적 gas비 메커니즘이 기존의 고정 수수료 정책을 대체했습니다. 동적 gas비 정책은 네트워크 남용과 스토리지 과다 사용을 방지하여 사용자에게 안정적인 서비스를 제공합니다. 네트워크 상황에 따라 gas비가 변경됩니다. 7가지 파라미터가 `base fee(gas fee)`에 영향을 미칩니다:

1. PREVIOUS_BASE_FEE: 이전 블록의 기본 수수료
2. GAS_USED_FOR_THE_PREVIOUS_BLOCK: 이전 블록의 모든 트랜잭션을 처리하는 데 사용된 gas
3. GAS_TARGET: 기본 수수료의 증감을 결정하는 gas 금액(현재 3,000만)
4. MAX_BLOCK_GAS_USED_FOR_BASE_FEE: 최대 기본 수수료 변경율을 적용하는 암시적 블록 gas 한도(현재 6천만)
5. BASE_FEE_DELTA_REDUCING_DENOMINATOR: 최대 기본 수수료 변경을 블록당 5%로 설정하는 값 (현재 20, 추후 거버넌스에 의해 변경 가능)
6. UPPER_BOUND_BASE_FEE: 기본 수수료의 최대값 (현재 750 ston, 추후 거버넌스에 의해 변경될 수 있음)
7. LOWER_BOUND_BASE_FEE: 기본 수수료의 최소값 (현재 25 ston, 추후 거버넌스에 의해 변경될 수 있음)

### 기본 수수료 <a id="base-fee"></a>

이 알고리즘의 기본 아이디어는 사용 gas가 기본 gas를 초과하면 '기본 수수료(base fee)'가 올라가고 그 반대의 경우도 마찬가지라는 것입니다. 이는 네트워크의 트랜잭션 수 및 프로세스에 사용되는 gas와 밀접한 관련이 있습니다. '기본 수수료'에는 상한과 하한이 있어 수수료가 무한정 증가하거나 감소하는 것을 방지합니다. 또한 '기본 수수료'의 급격한 변화를 방지하기 위해 gas에 대한 상한과 변동에 대한 조정 값이 있습니다. 이 값은 거버넌스에 의해 변경될 수 있습니다.

```text
(BASE_FEE_CHANGE_RATE) = (GAS_USED_FOR_THE_PREVIOUS_BLOCK - GAS_TARGET)
(ADJUSTED_BASE_FEE_CHANGE_RATE) = (BASE_FEE_CHANGE_RATE) / (GAS_TARGET) / (BASE_FEE_DELTA_REDUCING_DENOMINATOR)
(BASE_FEE_CHANGE_RANGE) = (PREVIOUS_BASE_FEE) * (ADJUSTED_BASE_FEE_CHANGE_RATE)
(BASE_FEE) = (PREVIOUS_BASE_FEE) + (BASE_FEE_CHANGE_RANGE) 
```

'기본 수수료'는 모든 블록에 대해 계산되며, 매초마다 변경될 수 있습니다. 단일 블록의 트랜잭션은 동일한 '기본 수수료'를 사용하여 트랜잭션 수수료를 계산합니다. 블록 '기본 수수료'보다 높은 gas 가격을 가진 거래만 블록에 포함될 수 있습니다. 각 블록의 트랜잭션 수수료의 절반이 소각됩니다(BURN_RATIO = 0.5, 거버넌스에 의해 변경 불가).

> 참고: 이더리움의 EIP-1559와 클레이튼을 차별화하는 중요한 특징은 팁이 없다는 것입니다. 클레이튼은 트랜잭션에 대해 선착순(FCFS) 원칙을 따릅니다.

## Gas 개요 <a id="gas-overview"></a>

블록체인의 상태를 변경하는 모든 작업에는 gas가 필요합니다. 블록에서 트랜잭션을 처리하는 동안 KLAY를 전송하거나, KIP-7 토큰을 사용하거나, 컨트랙트를 실행할 때 사용자는 연산 및 저장소 사용량에 대한 비용을 지불해야 합니다. 지불 금액은 필요한 'gas'의 양에 따라 결정됩니다.

필요한 `Gas`는 다음 두 gas를 합산하여 계산합니다;

- `IntrinsicGas`는 트랜잭션의 데이터 크기와 같은 트랜잭션의 구성에 따라 정적으로 부과되는 gas입니다.
- 반면에 `ContractExecutionGas`는 컨트랙트 실행에 따라 동적으로 계산되는 gas입니다.

여기서는 `IntrinsicGas`가 어떻게 구성되는지 중점적으로 살펴보겠습니다. `ContractExecutionGas`에 대해서는 klvm 문서에 자세히 설명되어 있으므로 [klvm docs](computation/klaytn-virtual-machine.md)를 참고하시기 바랍니다.

다시 `IntrinsicGas`로 돌아와서, 트랜잭션의 `IntrinsicGas`는 다음 네 가지 요소를 합산하여 계산할 수 있습니다.

```
IntrinsicGasCost = KeyCreationGas + KeyValidationGas + PayloadGas + TxTypedGas
```

- `PayloadGas`는 트랜잭션의 데이터 필드 크기에 따라 계산됩니다.
- `KeyCreationGas`는 트랜잭션이 새 키를 등록할 때 계산됩니다. 계정 업데이트\` 트랜잭션에만 적용됩니다.
- `KeyValidationGas`는 서명 개수를 기준으로 계산됩니다.
- 트랜잭션 유형에 따라 `TxTypedGas`가 정의됩니다.

자세히 알아보기 전에, 모든 키 유형에 키gas(`KeyCreationGas` 및 `KeyValidationGas`)가 적용되는 것은 아니라는 점을 기억하세요.

| 키 유형      | 해당 키가 적용되나요?    |
| :-------- | :-------------- |
| Nil       | 아니요             |
| Legacy    | 아니요             |
| Fail      | 아니요             |
| Public    | 예               |
| MultiSig  | 예               |
| RoleBased | 역할의 키 유형에 따라 다름 |

### KeyCreationGas <a id="keyCreationGas"></a>

`KeyCreationGas`는 `(등록 키 개수) x TxAccountCreationGasPerKey (20000)`로 계산됩니다.\
공개 키 유형은 항상 등록 키가 하나만 있으므로 gas는 항상 20000이 된다는 점을 기억하세요.

### KeyValidationGas <a id="keyValidationGas"></a>

`KeyValidationGas`는 `(서명 수 - 1) x TxValidationGasPerKey(15000)`로 계산됩니다.\
공개 키 유형에는 항상 서명 키가 하나만 있으므로 gas는 항상 0이 된다는 점을 명심하세요.

클레이튼 트랜잭션에도 수수료 지불자가 있을 수 있으므로 총 KeyValidationGas는 다음과 같습니다.

```
KeyValidationGas =  (KeyValidationGas for a sender) + (KeyValidationGas for a feePayer)
```

### PayloadGas <a id="payloadGas"></a>

`PayloadGas` 계산은 간단합니다. `(number_of_bytes_of_tx_input) x TxDataGas(100)`로 계산됩니다.

### TxTypedGas <a id="txTypedGas"></a>

클레이튼에는 세 가지 트랜잭션 유형이 있습니다: `base`, `feeDelegated`, `feeDelegatedWithFeeRatio`.

예를 들어

- TxTypeValueTransfer는 valueTransaction 트랜잭션의 `base` 유형입니다.
- TxTypeFeeDelegatedValueTransfer는 valueTransfer 트랜잭션의 `feeDelegated` 유형입니다.
- TxTypeFeeDelegatedValueTransferWithRatio는 valueTransfer 트랜잭션의 `feeDelegatedWithRatio` 유형입니다.

이는 TxTypedGas를 계산할 때 중요합니다:

- 먼저, TxType이 `feeDelegated` 또는 `feeDelegatedWithFeeRatio`인지 확인합니다.
  - TxType이 `feeDelegated`인 경우, `TxGasFeeDelegated(10000)`을 TxTypedGas에 추가합니다.
  - TxType이 `feeDelegatedWithFeeRatio`인 경우, `TxGasFeeDelegatedWithRatio (15000)`를 TxTypedGas에 추가합니다.
- 둘째, 트랜잭션이 컨트랙트를 생성하는지 여부를 확인합니다.
  - 트랜잭션이 컨트랙트를 생성하면 `TxGasContractCreation (53000)`을 TxTypedGas에 추가합니다.
  - 그렇지 않으면 `TxGas (21000)`을 TxTypedGas에 추가합니다.

예를 들어

- legacyTransaction이고 컨트랙트를 생성하는 경우, TxTypedGas는 `0 + TxGasContractCreation(53000)`이 될 것입니다.
- TxTypeFeeDelegatedValueTransfer인 경우, TxTypedGas는 `TxGasFeeDelegated(10000) + TxGas (21000)`이 됩니다.
- TxTypeFeeDelegatedSmartContractDeployWithRatio인 경우, TxTypedGas는 `TxGasFeeDelegatedWithRatio (15000) + TxGasContractCreation (53000)`이 됩니다.
