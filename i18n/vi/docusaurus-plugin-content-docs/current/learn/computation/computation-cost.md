# Computation Cost

Since Kaia aims to maintain 1-second block time, the execution time of transactions has to be managed. Here are three approaches to achieve that:

### 1. Giới hạn giới hạn gas của giao dịch (không có trong Kaia)

Limiting the gas limit of a transaction was not a feasible solution because the concept of the gas represents the current exchange value of the various resources in the blockchain platform such as computation, storage, network bandwidth, and so on. It is not suitable as a metric for the transaction execution time.

### 2. Giới hạn thời gian thực hiện giao dịch (không có trong Kaia)

Limiting the execution time of a transaction was not feasible either because the execution time can vary between nodes on the blockchain platform. Ví dụ, hãy xem xét trường hợp chúng ta giới hạn thời gian thực hiện của một giao dịch là 100 ms. If a node executes a transaction in 90 ms and another node executes it in 110 ms, the two nodes cannot reach a consensus. Hence, this solution is not appropriate.

### 3. Giới hạn thời gian thực hiện của một khối (có hiệu lực trong Kaia)

Kaia có giới hạn thời gian thực hiện khối không được xác thực. Do thời gian thực hiện không thể được thống nhất giữa các trình xác thực nên giới hạn này không phải tuân theo xác thực khối. Tuy nhiên, người đề xuất khối sẽ phải thực thi giới hạn thời gian thực hiện khối. Người đề xuất chỉ nên bao gồm các giao dịch cho đến khi quá trình thực hiện hoàn tất trong vòng 250 ms (BlockGenerationTimeLimit). Một ngoại lệ là giao dịch đầu tiên của khối, nhằm ngăn chặn một giao dịch dài hạn giả định bị từ chối mãi mãi. Nhưng giao dịch đầu tiên vẫn bị giới hạn bởi chi phí tính toán nên không thể mất quá nhiều thời gian. Một ngoại lệ khác là [gói KIP-245](https://kips.kaia.io/KIPs/kip-245).

### 4. Giới hạn chi phí tính toán của một giao dịch (có hiệu lực trong Kaia)

We modelled the computation cost of each EVM opcode based on its actual execution time and limit the sum of computation cost of a transaction. With this approach, we eliminate other factors and only count the normalized execution time unit, and nodes can reach a consensus as well. Giới hạn chi phí tính toán là 100.000.000 (OpcodeComputationCostLimit), nhưng khi hiệu suất tính toán của CPU tăng lên, giới hạn đã được nâng lên 150.000.000 (OpcodeComputationCostLimitCancun) sau hardfork EVM Cancun. This limit value is determined by the platform, so the developers should be aware of the computation cost of a transaction. To calculate the computation cost of a transaction, Kaia provides [kaia_estimateComputationCost](../../../references/json-rpc/kaia/estimate-computation-cost). The usage is almost the same as [kaia_estimateGas](../../../references/json-rpc/kaia/estimate-gas).

:::note

Computation cost related hardfork changes can be found at the bottom of this page. Go to [Hardfork Changes](#hardfork-changes).

:::

## Computation Cost Limit <a id="coputation-cost-limit"></a>

A series of opcodes or precompiled contracts are executed sequentially when executing a transaction. To limit the execution time of a transaction, we have made a deterministic execution time calculation model for opcodes and precompiled contracts based on real execution time.

Based on this model, predetermined computation cost values for opcodes and precompiled contracts are added to the total computation cost. If the total value exceeds computation cost limit, transaction execution is aborted and returns [ComputationCostLimitReached(0x0a)](../../references/transaction-error-codes.md) error.

When setting the computation cost limit value, we set `--opcode-computation-cost-limit` flag value as a limit if it is set as a non-zero value. If it's zero, the limit is set to the default computation cost limit defined for each specific hardfork.
Exceptionally, the limit for call/estimateGas/estimateComputationCost is always set to unlimited and is not influenced by flag or hardfork values. However, execution still can be aborted due to other limits such as gas cap.

## Computation Cost of Opcodes <a id="computation-cost-of-opcodes"></a>

The below table shows the computation cost of EVM opcodes. The computation cost was determined based on experiments.

| Opcode         | ComputationCost |
| :------------- | --------------: |
| STOP           |               0 |
| ADD            |             150 |
| MUL            |             200 |
| SUB            |             219 |
| DIV            |             404 |
| SDIV           |             360 |
| MOD            |             320 |
| SMOD           |             560 |
| ADDMOD         |             360 |
| MULMOD         |             700 |
| EXP            |             720 |
| SIGNEXTEND     |             481 |
| LT             |             201 |
| GT             |             264 |
| SLT            |             176 |
| SGT            |             222 |
| EQ             |             220 |
| ISZERO         |             165 |
| AND            |             288 |
| OR             |             160 |
| XOR            |             454 |
| NOT            |             364 |
| BYTE           |             589 |
| SHL            |             478 |
| SHR            |             498 |
| SAR            |             834 |
| SHA3           |             560 |
| ADDRESS        |             284 |
| BALANCE        |            1407 |
| ORIGIN         |             210 |
| CALLER         |             188 |
| CALLVALUE      |             149 |
| CALLDATALOAD   |             596 |
| CALLDATASIZE   |             194 |
| CALLDATACOPY   |             100 |
| CODESIZE       |             145 |
| CODECOPY       |             898 |
| GASPRICE       |             131 |
| EXTCODESIZE    |            1481 |
| EXTCODECOPY    |            1000 |
| RETURNDATASIZE |              10 |
| RETURNDATACOPY |              40 |
| EXTCODEHASH    |            1000 |
| BLOCKHASH      |             500 |
| COINBASE       |             189 |
| TIMESTAMP      |             265 |
| NUMBER         |             202 |
| PREVRANDAO     |            1498 |
| GASLIMIT       |             166 |
| CHAINID        |             120 |
| SELFBALANCE    |             374 |
| POP            |             140 |
| MLOAD          |             376 |
| MSTORE         |             288 |
| MSTORE8        |             230 |
| SLOAD          |            2550 |
| SSTORE         |            2510 |
| JUMP           |             253 |
| JUMPI          |             176 |
| PC             |             147 |
| MSIZE          |             137 |
| GAS            |             230 |
| JUMPDEST       |              10 |
| PUSH0          |              80 |
| PUSH1          |             120 |
| PUSH2          |             120 |
| PUSH3          |             120 |
| PUSH4          |             120 |
| PUSH5          |             120 |
| PUSH6          |             120 |
| PUSH7          |             120 |
| PUSH8          |             120 |
| PUSH9          |             120 |
| PUSH10         |             120 |
| PUSH11         |             120 |
| PUSH12         |             120 |
| PUSH13         |             120 |
| PUSH14         |             120 |
| PUSH15         |             120 |
| PUSH16         |             120 |
| PUSH17         |             120 |
| PUSH18         |             120 |
| PUSH19         |             120 |
| PUSH20         |             120 |
| PUSH21         |             120 |
| PUSH22         |             120 |
| PUSH23         |             120 |
| PUSH24         |             120 |
| PUSH25         |             120 |
| PUSH26         |             120 |
| PUSH27         |             120 |
| PUSH28         |             120 |
| PUSH29         |             120 |
| PUSH30         |             120 |
| PUSH31         |             120 |
| PUSH32         |             120 |
| DUP1           |             190 |
| DUP2           |             190 |
| DUP3           |             176 |
| DUP4           |             142 |
| DUP5           |             177 |
| DUP6           |             165 |
| DUP7           |             147 |
| DUP8           |             157 |
| DUP9           |             138 |
| DUP10          |             174 |
| DUP11          |             141 |
| DUP12          |             144 |
| DUP13          |             157 |
| DUP14          |             143 |
| DUP15          |             237 |
| DUP16          |             149 |
| SWAP1          |             141 |
| SWAP2          |             156 |
| SWAP3          |             145 |
| SWAP4          |             135 |
| SWAP5          |             115 |
| SWAP6          |             146 |
| SWAP7          |             199 |
| SWAP8          |             130 |
| SWAP9          |             160 |
| SWAP10         |             134 |
| SWAP11         |             147 |
| SWAP12         |             128 |
| SWAP13         |             121 |
| SWAP14         |             114 |
| SWAP15         |             197 |
| SWAP16         |             128 |
| LOG0           |             100 |
| LOG1           |             500 |
| LOG2           |             500 |
| LOG3           |             500 |
| LOG4           |             500 |
| PUSH           |               0 |
| DUP            |               0 |
| SWAP           |               0 |
| CREATE         |            2094 |
| CALL           |            5000 |
| CALLCODE       |            4000 |
| RETURN         |               0 |
| DELEGATECALL   |             696 |
| CREATE2        |           10000 |
| STATICCALL     |           10000 |
| REVERT         |               0 |
| SELFDESTRUCT   |               0 |
| BASEFEE        |             198 |
| BLOBBASEFEE    |             120 |
| BLOBHASH       |             165 |
| TSTORE         |             280 |
| TLOAD          |             220 |
| MCOPY          |             250 |
| CLZ            |               0 |

## Precompiled contracts computation cost table <a id="precompiled-contracts-computation-cost-table"></a>

`Input` is a byte array input of a precompiled contract.

| Address | Precompiled contracts | Computation Cost                                                                                                                                          |
| :------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x01    | ecrecover             | 113,150                                                                                                                                                   |
| 0x02    | sha256hash            | numOfWords(input) / 32 \* 100 + 1,000                                                                                                  |
| 0x03    | ripemd160hash         | numOfWords(input) / 32 \* 10 + 100                                                                                                     |
| 0x04    | dataCopy              | 0                                                                                                                                                         |
| 0x05    | bigModExp             | Xem mã nguồn [tại đây](https://github.com/kaiachain/kaia/blob/45e53b7ff01cb3febefbebbb16c0456718b49842/blockchain/vm/contracts.go#L586)                   |
| 0x06    | bn256Add              | 8,000                                                                                                                                                     |
| 0x07    | bn256ScalarMul        | 100,000                                                                                                                                                   |
| 0x08    | bn256Pairing          | numOfPairings(input) \* 1,000,000 + 2,000,000                                                                                          |
| 0x09    | blake2f               | bigEndian(getRounds(input[0:4])) \* 10 + 10,000 |
| 0x0A    | kzg                   | 2,200,000                                                                                                                                                 |
| 0x3FD   | vmLog                 | 10                                                                                                                                                        |
| 0x3FE   | feePayer              | 10                                                                                                                                                        |
| 0x3FF   | validateSender        | numOfSigs(input) \* 180,000 + 10,000                                                                                                   |
| 0x0b    | bls12381G1Thêm        | 18.750                                                                                                                                    |
| 0x0c    | bls12381G1Đa Năng     | Xem mã nguồn [tại đây](https://github.com/kaiachain/kaia/blob/45e53b7ff01cb3febefbebbb16c0456718b49842/blockchain/vm/contracts.go#L1155)                  |
| 0x0d    | bls12381G2Thêm        | 30.000                                                                                                                                    |
| 0x0e    | bls12381G2Đa Mở Rộng  | Xem mã nguồn [tại đây](https://github.com/kaiachain/kaia/blob/45e53b7ff01cb3febefbebbb16c0456718b49842/blockchain/vm/contracts.go#L1261)                  |
| 0x0f    | bls12381Kết hợp       | Số cặp (input) \* 1.630.000 + 1.885.000                                |
| 0x10    | bls12381Bản đồ G1     | 275.000                                                                                                                                   |
| 0x11    | bls12381Bản đồ G2     | 1.190.000                                                                                                                 |
| 0x100   | p256Xác minh          | 235.000                                                                                                                                   |

## Hardfork Changes <a id="hardfork-changes"></a>

| Hardfork     | New items                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Osaka EVM    | CLZ (0x1e) mã lệnh<br/>p256Verify (0x100) hợp đồng đã được biên dịch sẵn                                                                                                                                                                                                                                                                                                                                                                                                         | modExp (0x05) precompiled contract <br/>use new gas calculation logic. <br/>Computation cost also affected. <br/>Become more accurate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Prague EVM   | bls12381G1Add (0x0b) hợp đồng đã biên dịch sẵn<br/>bls12381G1MultiExp (0x0c) hợp đồng đã biên dịch sẵn<br/>bls12381G2Add (0x0d) hợp đồng đã biên dịch sẵn<br/>bls12381G2MultiExp (0x0e) hợp đồng đã biên dịch sẵn<br/>bls12381Pairing (0x0f) hợp đồng đã biên dịch sẵn<br/>bls12381MapG1 (0x10) hợp đồng đã biên dịch sẵn<br/>bls12381MapG2 (0x11) hợp đồng đã biên dịch sẵn<br/> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Cancun EVM   | BLOBBASEFEE (0x49) mã lệnh<br/>BLOBHASH (0x50) mã lệnh<br/>TSTORE (0x5c) mã lệnh<br/>TLOAD (0x5d) mã lệnh<br/>MCOPY (0x5e) mã lệnh<br/>kzg (0x0a) hợp đồng đã biên dịch sẵn                                                                                                                                                                                                                          | increase the computation cost limit <br/>from 100,000,000 to 150,000,000<br/><br/>reduce the computation cost of some opcodes <br/>due to cpu performance increase<br/>-Sdiv (0x05): 739 -> 360<br/>-Mod (0x06): 812 -> 320<br/>-Addmod (0x08): 1410 -> 360<br/>-Mulmod (0x09): 1760 -> 700<br/>-Exp (0x0A): 5000 -> 720<br/>-Sha3 (0x20): 2465 -> 560<br/>-Mstore8 (0x53): 5142 -> 230<br/>-Log1, Log2, Log3, Log4 (0xA1-0xA4): 1000 -> 500<br/><br/>increase the computation cost of some opcodes <br/>due to increased database size<br/>-SLOAD (0x54): 835 -> 2550<br/>-SSTORE (0x55): 1548 -> 2510 |
| Shanghai EVM | PUSH0 (0x5f) opcode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Kore         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | modExp (0x05) hợp đồng đã được biên dịch sẵn <br/>sử dụng logic tính toán gas mới. <br/>Chi phí tính toán cũng bị ảnh hưởng. <br/>Trở nên chính xác hơn.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| London EVM   | BaseFee (0x48) opcode                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Istanbul EVM | CHAINID (0x46) opcode<br/>SELFBALANCE (0x47) opcode<br/>blake2f (0x09) precompiled contract                                                                                                                                                                                                                                                                                                                                                                   | reduce the computation cost of over-priced opcodes<br/>- ADDMOD (0x08): 3349 -> 1410<br/>- MULMOD (0x09): 4757 -> 1760<br/>- XOR (0x18): 657 -> 454<br/>- NOT (0x19): 1289 -> 364<br/>- SHL (0x1B): 1603 -> 478<br/>- SHR (0x1C): 1815 -> 834                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
