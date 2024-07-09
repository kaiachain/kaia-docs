# Computation Cost

카이아는 1초 블록타임을 목표로 하고 있기 때문에 트랜잭션의 실행 시간을 관리해야 합니다. 이를 달성하기 위한 세 가지 접근 방식이 있습니다:

1. 거래 가스 한도 제한
2. 트랜잭션의 실행 시간 제한
3. 트랜잭션의 계산 비용 제한

트랜잭션의 가스 한도를 제한하는 것은 가스 개념이 연산, 스토리지, 네트워크 대역폭 등 블록체인 플랫폼의 다양한 리소스의 현재 교환 가치를 나타내기 때문에 실현 가능한 해결책이 아니었습니다. 트랜잭션 실행 시간을 측정하는 지표로 적합하지 않습니다.

트랜잭션의 실행 시간은 블록체인 플랫폼의 노드마다 다를 수 있기 때문에 트랜잭션의 실행 시간을 제한하는 것 역시 가능하지 않았습니다. 예를 들어 트랜잭션의 실행 시간을 100밀리초로 제한하는 경우를 생각해 보겠습니다. 한 노드가 트랜잭션을 90초 안에 실행하고 다른 노드가 110초 안에 실행한다면 두 노드는 합의에 도달할 수 없습니다. 따라서 이 솔루션은 적절하지 않습니다.

마지막 접근 방식은 트랜잭션의 계산 비용을 제한하는 것입니다. 실제 실행 시간을 기준으로 각 EVM 연산 코드의 계산 비용을 모델링하고 트랜잭션의 계산 비용 합계를 제한합니다. 이 접근 방식을 사용하면 다른 요소를 제거하고 정규화된 실행 시간 단위만 계산하므로 노드들도 합의에 도달할 수 있습니다.

따라서 저희는 카이아에 세 번째 옵션을 선택했습니다. The computation cost limit was 100,000,000, but as CPU computing performance has increased, the limit has been raised to 150,000,000 after Cancun EVM hardfork. This limit value is determined by the platform, so the developers should be aware of the computation cost of a transaction. To calculate the computation cost of a transaction, Kaia provides [klay_estimateComputationCost](../../../references/json-rpc/klay/estimate-computation-cost). The usage is almost the same as [klay_estimateGas](../../../references/json-rpc/klay/estimate-gas).

:::note

Computation cost related hardfork changes can be found at the bottom of this page. Go to [Hardfork Changes](#hardfork-changes).

:::

## Computation Cost Limit <a id="coputation-cost-limit"></a>

A series of opcodes or precompiled contracts are executed sequentially when executing a transaction. To limit the execution time of a transaction, we have made a deterministic execution time calculation model for opcodes and precompiled contracts based on real execution time.

Based on this model, predetermined computation cost values for opcodes and precompiled contracts are added to the total computation cost. If the total value exceeds computation cost limit, transaction execution is aborted and returns [ComputationCostLimitReached(0x0a)](../../references/sdk/transaction-error-codes.md) error.

When setting the computation cost limit value, we set `--opcode-computation-cost-limit` flag value as a limit if it is set as a non-zero value. If it's zero, the limit is set to the default computation cost limit defined for each specific hardfork.
Exceptionally, the limit for call/estimateGas/estimateComputationCost is always set to unlimited and is not influenced by flag or hardfork values. However, execution still can be aborted due to other limits such as gas cap.

## 연산 코드 계산 비용 <a id="computation-cost-of-opcodes"></a>

아래 표는 EVM 연산 코드의 계산 비용을 보여줍니다. 계산 비용은 실험을 기반으로 결정되었습니다.

| 연산 코드          | 계산 비용 |
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

## Precompiled contracts computation cost table <a id="precompiled-contracts-computation-cost-table"></a>

`Input` is a byte array input of a precompiled contract.

| Address | Precompiled contracts | Computation Cost                                                                                                                                          |
| :------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x01    | ecrecover             | 113,150                                                                                                                                                   |
| 0x02    | sha256hash            | numOfWords(input) / 32 \* 100 + 1,000                                                                                                  |
| 0x03    | ripemd160hash         | numOfWords(input) / 32 \* 10 + 100                                                                                                     |
| 0x04    | dataCopy              | 0                                                                                                                                                         |
| 0x05    | bigModExp             | see the code [here](https://github.com/klaytn/klaytn/blob/75c149a464998eb946311f3a290d4b1ea339eaba/blockchain/vm/contracts.go#L340)                       |
| 0x06    | bn256Add              | 8,000                                                                                                                                                     |
| 0x07    | bn256ScalarMul        | 100,000                                                                                                                                                   |
| 0x08    | bn256Pairing          | numOfPairings(input) \* 1,000,000 + 2,000,000                                                                                          |
| 0x09    | blake2f               | bigEndian(getRounds(input[0:4])) \* 10 + 10,000 |
| 0x0A    | kzg                   | 2,200,000                                                                                                                                                 |
| 0x3FD   | vmLog                 | 10                                                                                                                                                        |
| 0x3FE   | feePayer              | 10                                                                                                                                                        |
| 0x3FF   | validateSender        | numOfSigs(input) \* 180,000 + 10,000                                                                                                   |

## Hardfork Changes <a id="hardfork-changes"></a>

| Hardfork     | New items                                                                                                                                                                                                                                               | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |   |   |
| ------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - | - |
| Cancun EVM   | BLOBBASEFEE (0x49)<br/>BLOBHASH (0x50)<br/>TSTORE (0x5c) opcode<br/>TLOAD (0x5d)<br/>MCOPY (0x5e)<br/>kzg (0x0a) precompiled contract | increase the computation cost limit <br/>from 100,000,000 to 150,000,000<br/><br/>reduce the computation cost of some opcodes <br/>due to cpu performance increase<br/>-Sdiv (0x05): 739 -> 360<br/>-Mod (0x06): 812 -> 320<br/>-Addmod (0x08): 1410 -> 360<br/>-Mulmod (0x09): 1760 -> 700<br/>-Exp (0x0A): 5000 -> 720<br/>-Sha3 (0x20): 2465 -> 560<br/>-Mstore8 (0x53): 5142 -> 230<br/>-Log1, Log2, Log3, Log4 (0xA1-0xA4): 1000 -> 500<br/><br/>increase the computation cost of some opcodes <br/>due to increased database size<br/>-SLOAD (0x54): 835 -> 2550<br/>-SSTORE (0x55): 1548 -> 2510 |   |   |
| Shanghai EVM | PUSH0 (0x5f) opcode                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |   |   |
| Kore         |                                                                                                                                                                                                                                                         | modExp (0x05) precompiled contract <br/>use new gas calculation logic. <br/>Computation cost also affected. <br/>Become more accurate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |   |   |
| London EVM   | BaseFee (0x48) opcode                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |   |   |
| Istanbul EVM | CHAINID (0x46) opcode<br/>SELFBALANCE (0x47) opcode<br/>blake2f (0x09) precompiled contract                                                                                                    | reduce the computation cost of over-priced opcodes<br/>- ADDMOD (0x08): 3349 -> 1410<br/>- MULMOD (0x09): 4757 -> 1760<br/>- XOR (0x18): 657 -> 454<br/>- NOT (0x19): 1289 -> 364<br/>- SHL (0x1B): 1603 -> 478<br/>- SHR (0x1C): 1815 -> 834                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |   |   |
