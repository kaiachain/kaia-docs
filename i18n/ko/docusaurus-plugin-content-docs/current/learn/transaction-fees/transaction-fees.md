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

The `unitPrice` at a given block can be found through the `kaia_getParams` API.

### After Magma hardfork (KIP-71 dynamic base fee)

네트워크는 모든 블록의 gas 가격을 결정합니다. The baseFee increases if the transaction traffic is higher than a threshold, and decreases otherwise. The transaction traffic is measured in the block gas used. As transaction executions in a block gets heavier, the network perceives higher congestion, likely to increase the baseFee.

Unlike [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md), Magma gas policy has no tip (tip is introduced since Kaia hardfork). Instead, the FCFS (first-come first-serve) policy is implemented to protect the network from spamming.

#### baseFee calculation

The baseFee calculation depends on following parameters:

- Block congestion data
  - PREVIOUS_BASE_FEE: 이전 블록의 기본 수수료
  - GAS_USED_FOR_THE_PREVIOUS_BLOCK: 이전 블록의 모든 트랜잭션을 처리하는 데 사용된 gas
- Tuning parameters which can be changed later via governance
  - GAS_TARGET: 기본 수수료의 증감을 결정하는 gas 금액(현재 3,000만)
  - MAX_BLOCK_GAS_USED_FOR_BASE_FEE: 최대 기본 수수료 변경율을 적용하는 암시적 블록 gas 한도(현재 6천만) This
  - BASE_FEE_DELTA_REDUCING_DENOMINATOR: 최대 기본 수수료 변경을 블록당 5%로 설정하는 값 (현재 20, 추후 거버넌스에 의해 변경 가능)
  - UPPER_BOUND_BASE_FEE: 기본 수수료의 최대값 (현재 750 ston, 추후 거버넌스에 의해 변경될 수 있음) 기본 수수료 <a id="base-fee"></a>
  - LOWER_BOUND_BASE_FEE: 기본 수수료의 최소값 (현재 25 ston, 추후 거버넌스에 의해 변경될 수 있음)

Below is an oversimplified version of the baseFee calculation. In its essense, the base fee change is proportional to the difference between GAS_TARGET and PREVIOUS_BLOCK_GAS_USED, and other parameters controls the change speed or bounds the baseFee. Refer to [KIP-71](https://github.com/klaytn/kips/blob/main/KIPs/kip-71.md) for the exact formula.

```
(BASE_FEE_CHANGE_RATE) = (GAS_USED_FOR_THE_PREVIOUS_BLOCK - GAS_TARGET)
(ADJUSTED_BASE_FEE_CHANGE_RATE) = (BASE_FEE_CHANGE_RATE) / (GAS_TARGET) / (BASE_FEE_DELTA_REDUCING_DENOMINATOR)
(BASE_FEE_CHANGE_RANGE) = (PREVIOUS_BASE_FEE) * (ADJUSTED_BASE_FEE_CHANGE_RATE)
(BASE_FEE) = (PREVIOUS_BASE_FEE) + (BASE_FEE_CHANGE_RANGE) 
```

The tuning parameters at a given block can be found through the `kaia_getParams` API. The `baseFeePerGas` of each block can be found through the `kaia_getBlock*` and `eth_getBlock*` APIs.

#### Gas fee burn

Since Magma hardfork, half of the block gas fee is burnt. See [KIP-71](https://github.com/klaytn/kips/blob/main/KIPs/kip-71.md) for details.

Since Kore hardfork, most of the block gas fee is burnt. See [KIP-82](https://kips.klaytn.foundation/KIPs/kip-82) for details.

### After Kaia hardfork (KIP-162 priority fee)

Since Kaia hardfork, the transactions can specify nonzero priority fee (or simply tip) to increase the block inclusion possibility. The Kaia gas policy is similar to [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) in that transactions pay the baseFee plus the effective tip.

The effective gas price of a transaction is defined as `min(baseFee + tipCap, feeCap)`. For type-2 transactions, the transaction fields `maxPriorityFeePerGas` and `maxFeePerGas` naturally becomes the tipCap and feeCap. However, other transaction types only have one `gasPrice` field. For those types, tipCap and feeCap are both equals to `gasPrice`. Consequently their effective gas price becomes `min(baseFee + tipCap, feeCap) = min(baseFee + gasPrice, gasPrice) = gasPrice`, which is identical to gas price auction mechanism.

See [KIP-162](https://github.com/klaytn/kips/blob/main/KIPs/kip-162.md) for details.

### Summary

| Hardfork     | `gasPrice` requirement                                                                      | `maxFeePerGas` requirement                                                                  | `maxPriorityFeePerGas` requirement                                                                                                                      | calculated `effectiveGasPrice`                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Before Magma | must be unitPrice                                                                           | must be unitPrice<br/>(only after EthTxType fork)                        | must be unitPrice<br/>(only after EthTxType fork)                                                                                    | unitPrice                                                                                                                                |
| After Magma  | at least baseFee<br/>(suggested: 2\*baseFee)             | at least baseFee<br/>(suggested: 2\*baseFee)             | ignored                                                                                                                                                 | baseFee                                                                                                                                  |
| After Kaia   | at least baseFee<br/>(suggested: baseFee + suggestedTip) | at least baseFee<br/>(suggested: baseFee + suggestedTip) | up to user, SDK, wallet<br/>(suggestedTip: P percentile effective tip among the transactions from the last N blocks) | tx type 2: min(baseFee + feeCap, tipCap),<br/>other types: `gasPrice` for other types |

- You can retrieve the suggested `gasPrice` and `maxFeePerGas` value from the `kaia_gasPrice` and `eth_gasPrice` APIs. But the user, SDK or wallet can always choose their own value out of discretion as long as they exceed the current base fee.
- A suggested `maxPriorityFeePerGas` value is served by `kaia_maxPriorityFeePerGas` and `eth_maxPriorityFeePerGas` APIs from the effective tip of previously mined transactions. But the user, SDK or wallet can always choose their own value out of discretion. Kaia RPC nodes with default settings uses P=60 and N=20 but the configuration can differ by nodes. Use `kaia_feeHistory` and `eth_feeHistory` API for more customized result.
