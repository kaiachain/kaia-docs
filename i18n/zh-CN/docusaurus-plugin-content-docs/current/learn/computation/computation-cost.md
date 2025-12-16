# 计算成本

由于 Kaia 的目标是保持 1 秒的区块时间，因此必须对事务的执行时间进行管理。 以下是实现这一目标的三种方法：

### 1. 限制交易的气体上限（不在 Kaia 中）

限制交易的气体上限并不是一个可行的解决方案，因为气体的概念代表了区块链平台中各种资源（如计算、存储、网络带宽等）当前的交换价值。 它不适合作为衡量事务执行时间的指标。

### 2. 限制事务的执行时间（不在 Kaia 中）

限制交易的执行时间也不可行，因为区块链平台上不同节点的执行时间可能不同。 例如，我们将事务的执行时间限制为 100 毫秒。 如果一个节点在 90 毫秒内执行了一个事务，而另一个节点在 110 毫秒内执行了该事务，则这两个节点无法达成共识。 因此，这种解决方案并不合适。

### 3. 限制程序块的执行时间（在 Kaia 中有效）

Kaia 有一个未经验证的区块执行时间限制。 由于执行时间无法在验证者之间达成一致，因此该限制不受区块验证的限制。 不过，区块提议者应执行区块执行的时间限制。 提议者应在 250 毫秒（BlockGenerationTimeLimit，区块生成时间限制）内完成执行之前，只包含事务。 其中一项豁免是区块的第一笔交易，以防止假设的长期交易被永久拒绝。 但第一笔交易仍将受到计算成本的限制，因此它不能花费过长的时间。 另一项豁免是[KIP-245 捆绑](https://kips.kaia.io/KIPs/kip-245)。

### 4. 限制交易的计算成本（在 Kaia 中有效）

我们根据每个 EVM 操作码的实际执行时间对其计算成本进行建模，并限制一个事务的计算成本总和。 通过这种方法，我们可以排除其他因素，只计算归一化的执行时间单位，节点也能达成共识。 计算成本上限为 100,000,000 (OpcodeComputationCostLimit)，但随着 CPU 计算性能的提高，在坎昆 EVM 硬分叉后，上限已提高到 150,000,000 (OpcodeComputationCostLimitCancun)。 该限制值由平台决定，因此开发人员应了解交易的计算成本。 为了计算交易的计算成本，Kaia 提供了 [kaia_estimateComputationCost](../../../references/json-rpc/kaia/estimate-computation-cost)。 用法与 [kaia_estimateGas](../../../references/json-rpc/kaia/estimate-gas) 几乎相同。

:::note

与硬叉相关的计算成本变更可在本页底部找到。 转到 [Hardfork Changes](#hardfork-changes)。

:::

## 计算成本限额<a id="coputation-cost-limit"></a>

在执行事务时，一系列操作码或预编译合约按顺序执行。 为了限制事务的执行时间，我们根据实际执行时间为操作码和预编译合约建立了一个确定性的执行时间计算模型。

根据这一模型，运算代码和预编译合同的预定计算成本值会被添加到总计算成本中。 如果总值超过计算成本限制，事务执行将中止，并返回 [ComputationCostLimitReached(0x0a)](../../references/transaction-error-codes.md) 错误。

在设置计算成本限制值时，如果 `--opcode-computation-cost-limit` 标志值设置为非零值，我们会将其设置为限制值。 如果为零，则限制值将设置为为每个特定硬分叉定义的默认计算成本限制。
作为例外，call/estimateGas/estimateComputationCost 的限制始终设置为无限，不受标志或硬分叉值的影响。 但是，由于其他限制（如油箱盖），执行仍有可能中止。

## 操作码的计算成本<a id="computation-cost-of-opcodes"></a>

下表显示了 EVM 运算代码的计算成本。 计算成本是根据实验确定的。

| 操作码            |  计算成本 |
| :------------- | ----: |
| STOP           |     0 |
| ADD            |   150 |
| MUL            |   200 |
| SUB            |   219 |
| DIV            |   404 |
| SDIV           |   360 |
| MOD            |   320 |
| SMOD           |   560 |
| ADDMOD         |   360 |
| MULMOD         |   700 |
| EXP            |   720 |
| SIGNEXTEND     |   481 |
| LT             |   201 |
| GT             |   264 |
| SLT            |   176 |
| SGT            |   222 |
| EQ             |   220 |
| ISZERO         |   165 |
| AND            |   288 |
| OR             |   160 |
| XOR            |   454 |
| NOT            |   364 |
| BYTE           |   589 |
| SHL            |   478 |
| SHR            |   498 |
| SAR            |   834 |
| SHA3           |   560 |
| ADDRESS        |   284 |
| BALANCE        |  1407 |
| ORIGIN         |   210 |
| CALLER         |   188 |
| CALLVALUE      |   149 |
| CALLDATALOAD   |   596 |
| CALLDATASIZE   |   194 |
| CALLDATACOPY   |   100 |
| CODESIZE       |   145 |
| CODECOPY       |   898 |
| GASPRICE       |   131 |
| EXTCODESIZE    |  1481 |
| EXTCODECOPY    |  1000 |
| RETURNDATASIZE |    10 |
| RETURNDATACOPY |    40 |
| EXTCODEHASH    |  1000 |
| BLOCKHASH      |   500 |
| COINBASE       |   189 |
| TIMESTAMP      |   265 |
| NUMBER         |   202 |
| PREVRANDAO     |  1498 |
| GASLIMIT       |   166 |
| CHAINID        |   120 |
| SELFBALANCE    |   374 |
| POP            |   140 |
| MLOAD          |   376 |
| MSTORE         |   288 |
| MSTORE8        |   230 |
| SLOAD          |  2550 |
| SSTORE         |  2510 |
| JUMP           |   253 |
| JUMPI          |   176 |
| PC             |   147 |
| MSIZE          |   137 |
| GAS            |   230 |
| JUMPDEST       |    10 |
| PUSH0          |    80 |
| PUSH1          |   120 |
| PUSH2          |   120 |
| PUSH3          |   120 |
| PUSH4          |   120 |
| PUSH5          |   120 |
| PUSH6          |   120 |
| PUSH7          |   120 |
| PUSH8          |   120 |
| PUSH9          |   120 |
| PUSH10         |   120 |
| PUSH11         |   120 |
| PUSH12         |   120 |
| PUSH13         |   120 |
| PUSH14         |   120 |
| PUSH15         |   120 |
| PUSH16         |   120 |
| PUSH17         |   120 |
| PUSH18         |   120 |
| PUSH19         |   120 |
| PUSH20         |   120 |
| PUSH21         |   120 |
| PUSH22         |   120 |
| PUSH23         |   120 |
| PUSH24         |   120 |
| PUSH25         |   120 |
| PUSH26         |   120 |
| PUSH27         |   120 |
| PUSH28         |   120 |
| PUSH29         |   120 |
| PUSH30         |   120 |
| PUSH31         |   120 |
| PUSH32         |   120 |
| DUP1           |   190 |
| DUP2           |   190 |
| DUP3           |   176 |
| DUP4           |   142 |
| DUP5           |   177 |
| DUP6           |   165 |
| DUP7           |   147 |
| DUP8           |   157 |
| DUP9           |   138 |
| DUP10          |   174 |
| DUP11          |   141 |
| DUP12          |   144 |
| DUP13          |   157 |
| DUP14          |   143 |
| DUP15          |   237 |
| DUP16          |   149 |
| SWAP1          |   141 |
| SWAP2          |   156 |
| SWAP3          |   145 |
| SWAP4          |   135 |
| SWAP5          |   115 |
| SWAP6          |   146 |
| SWAP7          |   199 |
| SWAP8          |   130 |
| SWAP9          |   160 |
| SWAP10         |   134 |
| SWAP11         |   147 |
| SWAP12         |   128 |
| SWAP13         |   121 |
| SWAP14         |   114 |
| SWAP15         |   197 |
| SWAP16         |   128 |
| LOG0           |   100 |
| LOG1           |   500 |
| LOG2           |   500 |
| LOG3           |   500 |
| LOG4           |   500 |
| PUSH           |     0 |
| DUP            |     0 |
| SWAP           |     0 |
| CREATE         |  2094 |
| CALL           |  5000 |
| CALLCODE       |  4000 |
| RETURN         |     0 |
| DELEGATECALL   |   696 |
| CREATE2        | 10000 |
| STATICCALL     | 10000 |
| REVERT         |     0 |
| SELFDESTRUCT   |     0 |
| BASEFEE        |   198 |
| BLOBBASEFEE    |   120 |
| BLOBHASH       |   165 |
| TSTORE         |   280 |
| TLOAD          |   220 |
| MCOPY          |   250 |
| CLZ            |     0 |

## Precompiled contracts computation cost table <a id="precompiled-contracts-computation-cost-table"></a>

`Input` is a byte array input of a precompiled contract.

| Address | Precompiled contracts | Computation Cost                                                                                                                                          |
| :------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x01    | ecrecover             | 113,150                                                                                                                                                   |
| 0x02    | sha256hash            | numOfWords(input) / 32 \* 100 + 1,000                                                                                                  |
| 0x03    | ripemd160hash         | numOfWords(input) / 32 \* 10 + 100                                                                                                     |
| 0x04    | dataCopy              | 0                                                                                                                                                         |
| 0x05    | bigModExp             | 查看代码 [here](https://github.com/kaiachain/kaia/blob/45e53b7ff01cb3febefbebbb16c0456718b49842/blockchain/vm/contracts.go#L586)                              |
| 0x06    | bn256Add              | 8,000                                                                                                                                                     |
| 0x07    | bn256ScalarMul        | 100,000                                                                                                                                                   |
| 0x08    | bn256Pairing          | numOfPairings(input) \* 1,000,000 + 2,000,000                                                                                          |
| 0x09    | blake2f               | bigEndian(getRounds(input[0:4])) \* 10 + 10,000 |
| 0x0A    | kzg                   | 2,200,000                                                                                                                                                 |
| 0x3FD   | vmLog                 | 10                                                                                                                                                        |
| 0x3FE   | feePayer              | 10                                                                                                                                                        |
| 0x3FF   | validateSender        | numOfSigs(input) \* 180,000 + 10,000                                                                                                   |
| 0x0b    | bls12381G1Add         | 18,750                                                                                                                                                    |
| 0x0c    | bls12381G1MultiExp    | 查看代码 [here](https://github.com/kaiachain/kaia/blob/45e53b7ff01cb3febefbebbb16c0456718b49842/blockchain/vm/contracts.go#L1155)                             |
| 0x0d    | bls12381G2Add         | 30,000                                                                                                                                                    |
| 0x0e    | bls12381G2MultiExp    | 查看代码 [here](https://github.com/kaiachain/kaia/blob/45e53b7ff01cb3febefbebbb16c0456718b49842/blockchain/vm/contracts.go#L1261)                             |
| 0x0f    | bls12381配对            | 配对数（输入）\* 1,630,000 + 1,885,000                                                                                                                           |
| 0x10    | bls12381MapG1         | 275,000                                                                                                                                                   |
| 0x11    | bls12381MapG2         | 1,190,000                                                                                                                                                 |
| 0x100   | p256验证                | 235,000                                                                                                                                                   |

## Hardfork Changes <a id="hardfork-changes"></a>

| Hardfork     | New items                                                                                                                                                                                                                                                                                                                                                                 | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 大阪电子记录仪      | CLZ (0x1e) 操作码<br/>p256Verify (0x100) 预编译合同                                                                                                                                                                                                                                                                                         | modExp (0x05) 预编译合同<br/>使用新的气体计算逻辑。 <br/>计算成本也受到影响。 <br/>更加准确。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 布拉格 EVM      | bls12381G1Add (0x0b) 预编译合同<br/>bls12381G1MultiExp (0x0c) 预编译合同<br/>bls12381G2Add (0x0d) 预编译合同<br/>bls12381G2MultiExp(0x0e) 预编译合同<br/>bls12381Pairing (0x0f) 预编译合同<br/>bls12381MapG1 (0x10) 预编译合同<br/>bls12381MapG2 (0x11) 预编译合同<br/> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Cancun EVM   | BLOBBASEFEE (0x49) 操作码<br/>BLOBHASH (0x50) 操作码<br/>TSTORE (0x5c) 操作码<br/>TLOAD (0x5d) 操作码<br/>MCOPY (0x5e) 操作码<br/>kzg (0x0a) 预编译合同                                                                                                                     | 提高计算成本限制<br/>从 100,000,000 提高到 150,000,000<br/><br/>降低某些操作码的计算成本<br/>由于 CPU 性能提高<br/>-Sdiv (0x05)：739 -> 360<br/>-Mod (0x06)：812 -> 320<br/>-Addmod (0x08)：1410 -> 360<br/>-Mulmod (0x09)：1760 -> 700<br/>-Exp (0x0A)：5000 -> 720<br/>-Sha3 (0x20)： 2465 -> 560<br/>-Mstore8 (0x53)：5142 -> 230<br/>-Log1, Log2, Log3, Log4 (0xA1-0xA4)：1000 -> 500<br/><br/>由于数据库大小增加，某些操作码的计算成本会增加<br/><br/> -SLOAD (0x54)：835 -> 2550<br/>-SSTORE (0x55)：1548 -> 2510 |
| Shanghai EVM | PUSH0 (0x5f) opcode                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Kore         |                                                                                                                                                                                                                                                                                                                                                                           | modExp (0x05) 预编译合同<br/>使用新的气体计算逻辑。 <br/>计算成本也受到影响。 <br/>更加准确。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| London EVM   | BaseFee (0x48) opcode                                                                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Istanbul EVM | CHAINID (0x46) opcode<br/>SELFBALANCE (0x47) opcode<br/>blake2f (0x09) precompiled contract                                                                                                                                                                                                                      | 降低过高操作码的计算成本<br/>- ADDMOD (0x08)：3349 -> 1410<br/>- MULMOD (0x09)：4757 -> 1760<br/>- XOR (0x18)：657 -> 454<br/>- NOT (0x19)：1289 -> 364<br/>- SHL (0x1B): 1603 -> 478<br/>- SHR (0x1C)：1815 -> 834                                                                                                                                                                                                                                                                                                                   |
