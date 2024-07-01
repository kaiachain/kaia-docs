# Transaction Fees

The transaction fee of one transaction is calculated as follows:

```text
Transaction fee := (Gas used) x (GasPrice)
```

As an easy-to-understand analogy in this regard, suppose you're filling up gas at a gas station. The gas price is determined by the refinery every day, and today's price is $2. If you fill 15L up, then you would pay $30 = 15L x $2/1L for it, and the $30 will be paid out of your bank account. Also, the transaction will be recorded in the account book.

Transaction fee works just the same as above. Suppose a transaction spent 21000 gas and the effective gas price of the transaction was 25 Gkei. Then the gas fee is 525000 Gkei. This amount would be deducted from the sender (`from` account) balance.

## Gas Overview <a id="gas-overview"></a>

Every action that changes the state of the blockchain requires gas. While processing the transactions in a block, such as sending KLAY, using KIP-7 tokens, or executing a contract, the user has to pay for the computation and storage usage. The payment amount is decided by the amount of `gas` required. The gas has no unit, and we just say like "21000 gas".

Gas of a transaction comprises of two components:

- `IntrinsicGas` is a gas that is statically charged based on the configuration of the transaction, such as the datasize of the transaction. For more details, please refer to [Intrinsic Gas](intrinsic-gas.md).
- `ExecutionGas`, on the other hand, is a gas that is dynamically calculated due to the contract execution. For more details, please refer to [Execution Gas](execution-gas.md).

The gas used amount is only determined after the transaction is executed. As such, you can find the gas used amount of a transaction from its receipt.

## GasPrice Overview <a id="gas-price-overview"></a>

Effective gas price of a transaction is calculated from many variables:

- Hardfork level
- Gas price fields in the transaction submitted by the sender
  - `maxFeePerGas` (often referred to as feeCap) field exists in the type 2 transactions.
  - `maxPriorityFeePerGas` (often referred to as tipCap) field exists in the type 2 transactions.
  - `gasPrice` field exists in every other transaction types.
- `baseFeePerGas` (often referred to as baseFee) of the block the transaction is executed in

### Before Magma hardfork (fixed unit price)

Before Magma hardfork, the transaction fee of all transactions is the fixed value called `unitPrice`. The values can be changed by governance. All transactions must submit the gas price field that equals to the current unitPrice. The unit price mechanism avoids UX frustration due to gas price estimation in the gas fee auction market and allows service providers to easily predict gas fee budget.

The `unitPrice` at a given block can be found through the `kaia_getParams` API.

### After Magma hardfork (KIP-71 dynamic base fee)

The network determines the gas price for every block. The baseFee increases if the transaction traffic is higher than a threshold, and decreases otherwise. The transaction traffic is measured in the block gas used. As transaction executions in a block gets heavier, the network perceives higher congestion, likely to increase the baseFee.

Unlike [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md), Magma gas policy has no tip (tip is introduced since Kaia hardfork). Instead, the FCFS (first-come first-serve) policy is implemented to protect the network from spamming.

#### baseFee calculation

The baseFee calculation depends on following parameters:

- Block congestion data
  - PREVIOUS_BASE_FEE: Base fee of the previous block
  - GAS_USED_FOR_THE_PREVIOUS_BLOCK: Gas used to process all transactions of the previous block
- Tuning parameters which can be changed later via governance
  - GAS_TARGET: The gas amount that determines the increase or decrease of the base fee (30 million at the moment)
  - MAX_BLOCK_GAS_USED_FOR_BASE_FEE: Implicit block gas limit to enforce the max basefee change rate (60 million at the moment) This
  - BASE_FEE_DELTA_REDUCING_DENOMINATOR: The value to set the maximum base fee change to 5% per block (20 at the moment, can be changed later by governance)
  - UPPER_BOUND_BASE_FEE: The maximum value for the base fee (750 ston at the moment, can be changed later by governance)
  - LOWER_BOUND_BASE_FEE: The minimum value for the base fee (25 ston at the moment, can be changed later by governance)

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

| Hardfork     | `gasPrice` requirement                                                                     | `maxFeePerGas` requirement                                                                 | `maxPriorityFeePerGas` requirement                                                                                                                     | calculated `effectiveGasPrice`                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Before Magma | must be unitPrice                                                                          | must be unitPrice<br>(only after EthTxType fork)                        | must be unitPrice<br>(only after EthTxType fork)                                                                                    | unitPrice                                                                                                                               |
| After Magma  | at least baseFee<br>(suggested: 2\*baseFee)             | at least baseFee<br>(suggested: 2\*baseFee)             | ignored                                                                                                                                                | After BaseFee                                                                                                                           |
| After Kaia   | at least baseFee<br>(suggested: baseFee + suggestedTip) | at least baseFee<br>(suggested: baseFee + suggestedTip) | up to user, SDK, wallet<br>(suggestedTip: P percentile effective tip among the transactions from the last N blocks) | tx type 2: min(baseFee + feeCap, tipCap),<br>other types: `gasPrice` for other types |

- You can retrieve the suggested `gasPrice` and `maxFeePerGas` value from the `kaia_gasPrice` and `eth_gasPrice` APIs. But the user, SDK or wallet can always choose their own value out of discretion as long as they exceed the current base fee.
- A suggested `maxPriorityFeePerGas` value is served by `kaia_maxPriorityFeePerGas` and `eth_maxPriorityFeePerGas` APIs from the effective tip of previously mined transactions. But the user, SDK or wallet can always choose their own value out of discretion. Kaia RPC nodes with default settings uses P=60 and N=20 but the configuration can differ by nodes. Use `kaia_feeHistory` and `eth_feeHistory` API for more customized result.
