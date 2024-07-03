# 트랜잭션 수수료

한 거래의 트랜잭션 수수료는 다음과 같이 계산됩니다:

```text
가스 요금 := (사용한 가스) x (유효 가스 가격)
```

이와 관련하여 이해하기 쉬운 비유로 주유소에서 기름을 넣는다고 가정해 보겠습니다. 가스 가격은 정유사에서 매일 결정하며, 오늘의 가격은 2달러입니다. 15L를 주유하면 $30 = 15L x $2/1L를 지불하게 되고, 30달러는 은행 계좌에서 지급됩니다. 또한 거래는 장부에 기록됩니다.

트랜잭션 수수료는 위와 동일한 방식으로 작동합니다. 거래에서 21000가스를 사용했고 거래의 유효 가스 가격이 25Gkei라고 가정해 보겠습니다. 그러면 가스 요금은 525000Gkei입니다. 이 금액은 발신자(`from ` 계정) 잔액에서 차감됩니다.

## 가스 소비 <a id="gas-used"></a>

블록체인의 상태를 변경하는 모든 작업에는 gas가 필요합니다. KAIA를 전송하거나 ERC-20 토큰을 사용하거나 컨트랙트를 실행하는 등 블록에서 트랜잭션을 처리하는 동안 발신자는 계산 및 저장소 사용 비용을 지불해야 합니다. 지불 금액은 필요한 'gas'의 양에 따라 결정됩니다. 가스에는 단위가 없으며 그냥 "21000 가스"라고 말합니다.

트랜잭션의 가스는 두 가지 구성 요소로 이루어져 있습니다:

- `IntrinsicGas`는 입력 크기와 같은 트랜잭션 본문 자체에 따라 정적으로 충전되는 가스입니다. 자세한 내용은 [Intrinsic Gas](intrinsic-gas.md)를 참조하세요.
- `ExecutionGas `는 실행 중에 동적으로 계산되는 가스입니다. 자세한 내용은 [Execution Gas](execution-gas.md)를 참조하세요.

가스 사용량은 트랜잭션이 실행된 후에만 결정됩니다. 따라서 영수증에서 거래의 가스 사용량을 확인할 수 있습니다.

## 유효 가스 가격 <a id="effective-gas-price"></a>

거래의 유효 가스 가격은 여러 변수를 통해 계산됩니다:

- 하드포크 레벨
- 발신자가 제출한 거래의 가스 가격 필드
  - `maxFeePerGas `(흔히 수수료 상한이라고도 함) 필드는 유형 2 거래에 존재합니다.
  - 유형 2 트랜잭션에 `maxPriorityFeePerGas`(흔히 tipCap이라고도 함) 필드가 존재합니다.
  - `gasPrice ` 필드는 다른 모든 거래 유형에 존재합니다.
- 트랜잭션이 실행되는 블록의 `baseFeePerGas`(종종 baseFee라고도 함)

### Magma 하드포크 이전(고정 단가)

Magma 하드포크 이전에는 모든 트랜잭션의 트랜잭션 수수료가 'unitPrice'이라는 고정값으로 정해져 있었습니다. 이 단가는 거버넌스를 통해 조정할 수 있습니다.이 단가는 거버넌스를 통해 조정할 수 있습니다. 모든 거래는 현재 단위가격과 동일한 가스 가격 필드를 제출해야 합니다. 단가 메커니즘은 가스 요금 경매 시장에서 가스 요금 예측으로 인한 UX 불만을 방지하고 서비스 제공업체가 가스 요금 예산을 쉽게 예측할 수 있도록 합니다.단가 메커니즘은 가스 요금 경매 시장에서 가스 요금 예측으로 인한 UX 불만을 방지하고 서비스 제공업체가 가스 요금 예산을 쉽게 예측할 수 있도록 합니다.

특정 블록의 'unitPrice'은 `kaia_getParams` API를 통해 확인할 수 있습니다.

### Magma 하드포크 이후 (KIP-71 동적 기본 수수료)

Magma 하드포크 이후, 네트워크는 네트워크 혼잡도에 따라 매 블록마다 가스 가격 값인 `baseFeePerGas`(또는 간단히 baseFee)를 결정합니다. baseFee는 트랜잭션 트래픽이 임계값보다 높으면 증가하고 그렇지 않으면 감소합니다. 트랜잭션 트래픽은 사용된 블록 가스에서 측정됩니다. 블록 내 트랜잭션 실행이 많아질수록 네트워크는 더 높은 혼잡도를 감지하여 baseFee를 증가시킬 가능성이 높습니다.

Magma 가스 정책은 [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)와 달리 팁이 없습니다(Kaia 하드포크 이후 팁이 도입되었습니다). 대신 스팸으로부터 네트워크를 보호하기 위해 FCFS(선착순) 정책을 시행합니다.

#### baseFee 계산

baseFee 계산은 다음 매개 변수에 따라 달라집니다:

- 블록 혼잡 데이터
  - PREVIOUS_BASE_FEE: 이전 블록의 기본 수수료
  - PREVIOUS_BLOCK_GAS_USED: 이전 블록의 모든 트랜잭션을 처리하는 데 사용된 가스입니다.
- 거버넌스를 통해 나중에 변경할 수 있는 매개변수 조정
  - GAS_TARGET: 기본 요금의 인상 또는 인하를 결정하는 가스 금액입니다.
  - MAX_BLOCK_GAS_USED_FOR_BASE_FEE: Implicit block gas limit to enforce the max basefee change rate.
  - BASE_FEE_DENOMINATOR: 블록당 최대 기본 수수료 변경을 설정하는 값입니다.
  - UPPER_BOUND_BASE_FEE: 기본 수수료의 최대값
  - LOWER_BOUND_BASE_FEE: 기본 수수료의 최소값

아래는 기본 수수료 계산을 지나치게 단순화한 버전입니다. 본질적으로 기본 수수료 변경은 GAS_TARGET과 PREVIOUS_BLOCK_GAS_USED의 차이에 비례하며, 다른 매개변수는 변경 속도를 제어하거나 기본 수수료의 한계를 지정합니다. 정확한 공식은 [KIP-71](https://github.com/klaytn/kips/blob/main/KIPs/kip-71.md)을 참조하세요.

```
              min(PREVIOUS_BLOCK_GAS_USED, MAX_BLOCK_GAS_USED_FOR_BASE_FEE) - GAS_TARGET
changeRate = ----------------------------------------------------------------------------
                                BASE_FEE_DENOMINATOR * GAS_TARGET

nextBaseFeeBeforeBound = PREVIOUS_BASE_FEE * (1 + changeRate)

nextBaseFee = max(min(nextBaseFeeBeforeBound, UPPER_BOUND_BASE_FEE), LOWER_BOUND_BASE_FEE)
```

특정 블록의 튜닝 파라미터는 `kaia_getParams` API를 통해 확인할 수 있습니다. 각 블록의 `baseFeePerGas`는 `kaia_getBlock*` 및 `eth_getBlock*` API를 통해 확인할 수 있습니다.

#### 가스 요금 소각

Magma 하드포크 이후, 블록 가스 수수료의 절반이 소진됩니다. 자세한 내용은 [KIP-71](https://github.com/klaytn/kips/blob/main/KIPs/kip-71.md)을 참조하세요.

Kore 하드포크 이후, 대부분의 블록 가스 수수료가 소진되었습니다. 자세한 내용은 [KIP-82](https://kips.klaytn.foundation/KIPs/kip-82)를 참조하세요.

### Kaia 하드포크 이후 (KIP-162 우선권 수수료)

Kaia 하드포크 이후, 트랜잭션은 블록 포함 가능성을 높이기 위해 0이 아닌 우선순위 수수료(또는 간단히 팁)를 지정할 수 있습니다. Kaia 가스 정책은 거래 시 기본 수수료에 유효 팁을 더하여 지불한다는 점에서 [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)와 유사합니다.

트랜잭션의 유효 가스 가격은 `min(baseFee + tipCap, feeCap)`으로 정의됩니다. 유형 2 트랜잭션의 경우, 트랜잭션 필드인 `maxPriorityFeePerGas`와 `maxFeePerGas`는 자연스럽게 tipCap과 feeCap이 됩니다. 그러나 다른 트랜잭션 유형에는 `gasPrice` 필드가 하나만 있습니다. 이러한 유형의 경우 tipCap과 feeCap은 모두 `gasPrice`와 같습니다. 결과적으로 유효 가스 가격은 `min(baseFee + tipCap, feeCap) = min(baseFee + gasPrice, gasPrice) = gasPrice`가 되며, 이는 가스 가격 경매 메커니즘과 동일합니다.

자세한 내용은 [KIP-162](https://github.com/klaytn/kips/blob/main/KIPs/kip-162.md)를 참조하세요.

### 요약

| 하드포크     | `gasPrice` 요구 사항                                                               | `maxFeePerGas` 요구 사항                                                                        | `maxPriorityFeePerGas ` 요구 사항                                                                          | 계산된 \`effectiveGasPrice'                                                                                         |
| -------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Magma 이전 | unitPrice이어야 함                                                                 | unitPrice<br/>이어야 함(EthTxType 포크 이후에만 해당).               | must be unitPrice<br/>(only after EthTxType fork)                                   | unitPrice                                                                                                        |
| Magma 이후 | 최소 baseFee<br/>(권장: 2\*baseFee)             | at least baseFee<br/>(suggested: 2\*baseFee)             | 무시됨                                                                                                    | baseFee                                                                                                          |
| Kaia 이후  | 최소 baseFee<br/>(권장: baseFee + suggestedTip) | at least baseFee<br/>(suggested: baseFee + suggestedTip) | 사용자, SDK, 지갑에 달려있음<br/>(suggestedTip: 마지막 N 블록의 트랜잭션 중 P 백분위수 유효 팁) | tx 유형 2: min(baseFee + feeCap, tipCap),<br/>기타 유형: `gasPrice` |

- 제안된 `gasPrice` 및 `maxFeePerGas` 값은 `kaia_gasPrice` 및 `eth_gasPrice` API에서 검색할 수 있습니다. 그러나 사용자, SDK 또는 지갑은 현재 기본 수수료를 초과하는 한 언제든지 재량에 따라 자체 가치를 선택할 수 있습니다.
- 제안된 `maxPriorityFeePerGas` 값은 이전에 채굴된 트랜잭션의 유효 팁에서 `kaia_maxPriorityFeePerGas` 및 `eth_maxPriorityFeePerGas` API를 통해 제공됩니다. 그러나 사용자, SDK 또는 지갑은 언제든지 재량에 따라 자신의 가치를 선택할 수 있습니다. 기본 설정이 있는 Kaia RPC 노드는 P=60, N=20을 사용하지만 노드에 따라 구성이 다를 수 있습니다. 보다 맞춤화된 결과를 얻으려면 `kaia_feeHistory` 및 `eth_feeHistory` API를 사용하세요.
