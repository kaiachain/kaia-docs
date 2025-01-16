# Transaction Fees

The transaction fee of one transaction is calculated as follows:

```text
gas fee := (gas used) x (effective gas price)
```

As an easy-to-understand analogy in this regard, suppose you're filling up gas at a gas station. The gas price is determined by the refinery every day, and today's price is $2. If you fill 15L up, then you would pay $30 = 15L x $2/1L for it, and the $30 will be paid out of your bank account. Also, the transaction will be recorded in the account book.

Transaction fee works just the same as above. Suppose a transaction spent 21000 gas and the effective gas price of the transaction was 25 Gkei. Then the gas fee is 525000 Gkei. This amount would be deducted from the sender (`from` account) balance.

## Gas used <a id="gas-used"></a>

Every action that changes the state of the blockchain requires gas. While processing the transactions in a block, such as sending KAIA, using ERC-20 tokens, or executing a contract, the sender has to pay for the computation and storage usage. The payment amount is decided by the amount of `gas` required. The gas has no unit, and we just say like "21000 gas".

Gas of a transaction comprises of two components:

* `IntrinsicGas` is the gas statically charged based on the transaction body itself, such as the size of the input. For more details, please refer to [Intrinsic Gas](intrinsic-gas.md).
* `ExecutionGas` is the gas dynamically calculated during the execution. For more details, please refer to [Execution Gas](execution-gas.md).

The gas used amount is only determined after the transaction is executed. As such, you can find the gas used amount of a transaction from its receipt.

### Finding the appropriate gasLimit

Every transaction must specify a gasLimit which is the maximum gas the transaction can spend. The sender can also utilize the `eth_estimateGas` and `kaia_estimateGas` RPCs to find the appropriate gasLimit for a transaction. Alternatively, the sender can manually specify a big enough number. Specifying a high gasLimit does not automatically charge high gas fee, so using a fixed number is a viable option. However, the sender having only a few tokens cannot specify too high gasLimit because the sender has to own at least `gasLimit * effectiveGasPrice` in its balance regardless of the actual gasUsed.

## Effective gas price <a id="effective-gas-price"></a>

Effective gas price of a transaction is calculated from many variables:

- Hardfork level
- Gas price fields in the transaction submitted by the sender
  - `maxFeePerGas` (often referred to as feeCap) field exists in the type 2 transactions.
  - `maxPriorityFeePerGas` (often referred to as tipCap) field exists in the type 2 transactions.
  - `gasPrice` field exists in every other transaction types.
- `baseFeePerGas` (often referred to as baseFee) of the block the transaction is executed in

### Before Magma hardfork (fixed unit price)

Before Magma hardfork, the transaction fee of all transactions is the fixed value called `unitPrice`. This unitPrice can be adjusted via governance. All transactions must submit the gas price field that equals to the current unitPrice. The unit price mechanism avoids UX frustration due to gas price estimation in the gas fee auction market and allows service providers to easily predict gas fee budget.

The `unitPrice` at a given block can be found through the `kaia_getParams` API.

### After Magma hardfork (KIP-71 dynamic base fee)

Since Magma hardfork, the network decides a gas price value `baseFeePerGas` (or simply baseFee) every block depending on the network congestion. The baseFee increases if the transaction traffic is higher than a threshold, and decreases otherwise. The transaction traffic is measured in the block gas used. As transaction executions in a block gets heavier, the network perceives higher congestion, likely to increase the baseFee.

Unlike [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md), Magma gas policy has no tip (tip is introduced since Kaia hardfork). Instead, the FCFS (first-come first-serve) policy is implemented to protect the network from spamming.

#### baseFee calculation

The baseFee calculation depends on following parameters:

- Block congestion data
  - PREVIOUS_BASE_FEE: Base fee of the previous block
  - PREVIOUS_BLOCK_GAS_USED: Gas used to process all transactions of the previous block
- Tuning parameters which can be changed later via governance
  - GAS_TARGET: The gas amount that determines the increase or decrease of the base fee
  - MAX_BLOCK_GAS_USED_FOR_BASE_FEE: Implicit block gas limit to enforce the max basefee change rate.
  - BASE_FEE_DENOMINATOR: The value to set the maximum base fee change per block
  - UPPER_BOUND_BASE_FEE: The maximum value for the base fee
  - LOWER_BOUND_BASE_FEE: The minimum value for the base fee

Below is an oversimplified version of the baseFee calculation. In its essense, the base fee change is proportional to the difference between GAS_TARGET and PREVIOUS_BLOCK_GAS_USED, and other parameters controls the change speed or bounds the baseFee. Refer to [KIP-71](https://github.com/kaiachain/kips/blob/main/KIPs/kip-71.md) for the exact formula.

```
              min(PREVIOUS_BLOCK_GAS_USED, MAX_BLOCK_GAS_USED_FOR_BASE_FEE) - GAS_TARGET
changeRate = ----------------------------------------------------------------------------
                                BASE_FEE_DENOMINATOR * GAS_TARGET

nextBaseFeeBeforeBound = PREVIOUS_BASE_FEE * (1 + changeRate)

nextBaseFee = max(min(nextBaseFeeBeforeBound, UPPER_BOUND_BASE_FEE), LOWER_BOUND_BASE_FEE)
```

The tuning parameters at a given block can be found through the `kaia_getParams` API. The `baseFeePerGas` of each block can be found through the `kaia_getBlock*` and `eth_getBlock*` APIs.

#### Gas fee burn

Since Magma hardfork, half of the block gas fee is burnt. See [KIP-71](https://github.com/kaiachain/kips/blob/main/KIPs/kip-71.md) for details.

Since Kore hardfork, most of the block gas fee is burnt. See [KIP-82](https://kips.kaia.io/KIPs/kip-82) for details.

### After Kaia hardfork (KIP-162 priority fee)

Since Kaia hardfork, the transactions can specify nonzero priority fee (or simply tip) to increase the block inclusion possibility. The Kaia gas policy is similar to [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) in that transactions pay the baseFee plus the effective tip.

The effective gas price of a transaction is defined as `min(baseFee + tipCap, feeCap)`. For type-2 transactions, the transaction fields `maxPriorityFeePerGas` and `maxFeePerGas` naturally becomes the tipCap and feeCap. However, other transaction types only have one `gasPrice` field. For those types, tipCap and feeCap are both equals to `gasPrice`. Consequently their effective gas price becomes `min(baseFee + tipCap, feeCap) = min(baseFee + gasPrice, gasPrice) = gasPrice`, which is identical to gas price auction mechanism.

See [KIP-162](https://github.com/kaiachain/kips/blob/main/KIPs/kip-162.md) for details.

### Finding the appropriate gas price after Kaia

If your application or wallet utilizes type-2 transactions (EIP-1559 type), ensure you set a reasonable priority fee. You can also call the `eth_maxPriorityFeePerGas` RPC to retrieve the recommended priority fee (tx.maxPriorityFeePerGas). When the network is uncongested, a zero priority fee transaction should have no disadvantage in transaction processing. When the network is congested it is safer to specify a nonzero priority fee to compete with other transactions.

The Kaia node's `eth_maxPriorityFeePerGas` RPC shall:
- Return 0 if the network is uncongested. The network is considered uncongested when the next baseFeePerGas equals the UPPER_BOUND_BASE_FEE.
- Otherwise return P percentile effective priority fees among the transactions in the last N blocks. Kaia nodes with default settings uses P=60 and N=20 but the configuration can differ by nodes.

A type-2 transaction's `maxFeePerGas` should be higher than the network's next baseFee to ensure the transaction gets processed even if the baseFee rises. A common formula is `lastBaseFee*2 + maxPriorityFeePerGas`. It takes at least 15 seconds for baseFee to double when BASE_FEE_DENOMINATOR is 20. Another option is to use `eth_gasPrice` RPC.

For transactions of other tx types, more care should be taken when choosing an appropriate `gasPrice`. Because for these tx types, the gasPrice is spent as-is regardless of the baseFee. On the other hand, gasPrice must be at least network's baseFee. Therefore, applications and users would want to avoid setting gasPrice too high, while at the same time matching the network's baseFee. One strategy would be setting the `gasPrice` a slightly higher than the next baseFee so it can accommodate a few baseFee rises. You can call `eth_gasPrice` RPC to retrieve the recommended gas price.

The Kaia node's `eth_gasPrice` RPC shall:

- Return (next baseFee) * M + (eth_maxPriorityFeePerGas). Multiplier M is heuristically chosen as 1.10 under uncongested network and 1.15 under congested network. When BASE_FEE_DENOMINATOR is 20, the M=1.10 can withstand at least one baseFee increase (1.05) and M=1.15 can withstand at least two consecutive baseFee increase (1.05\*1.05). Considering that the baseFee usually does not rise at top speed of 5%, the multiplier should actually be enough for a few baseFee increases.

### Gas price summary

| Hardfork | `gasPrice` requirement | `maxFeePerGas` requirement | `maxPriorityFeePerGas` requirement | calculated `effectiveGasPrice` |
| - | - | - | - | - |
| Before Magma | must be unitPrice | must be unitPrice<br/>(only after EthTxType fork) | must be unitPrice<br/>(only after EthTxType fork) | unitPrice
| After Magma | at least baseFee<br/>(recommended: 2*baseFee) | at least baseFee<br/>(recommended: 2*baseFee) | ignored | baseFee
| After Kaia |  at least baseFee<br/>(recommended: baseFee*M + suggestedTip) | at least baseFee<br/>(recommended: baseFee*2 + suggestedTip) | up to users, wallets, and SDKs<br/>(recommended: suggestedTip = 0 or P percentile in N blocks) | tx type 2: min(baseFee + feeCap, tipCap),<br/>other tx types: gasPrice
