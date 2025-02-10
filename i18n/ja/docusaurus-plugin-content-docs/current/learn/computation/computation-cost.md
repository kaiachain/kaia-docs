# 計算コスト

Kaiaは1秒のブロック時間を維持することを目標としているので、トランザクションの実行時間は管理されなければならない。 そのための3つのアプローチを紹介しよう：

1. トランザクションのガス制限
2. トランザクションの実行時間の制限
3. トランザクションの計算コストを制限する

ガスという概念は、計算、ストレージ、ネットワーク帯域幅など、ブロックチェーンプラットフォームの様々なリソースの現在の交換価値を表しているため、トランザクションのガス上限を制限することは実現可能なソリューションではなかった。 トランザクションの実行時間の指標としては適さない。

トランザクションの実行時間はブロックチェーンプラットフォーム上のノード間で異なる可能性があるため、実行時間を制限することも実現不可能であった。 例えば、トランザクションの実行時間を100ミリ秒に制限する場合を考えてみよう。 あるノードが90ミリ秒でトランザクションを実行し、別のノードが110ミリ秒で実行した場合、2つのノードはコンセンサスに達することができない。 したがって、この解決策は適切ではない。

最後のアプローチは、トランザクションの計算コストを制限することである。 各EVMオペコードの計算コストを実際の実行時間に基づいてモデル化し、トランザクションの計算コストの合計を制限した。 このアプローチでは、他の要因を排除し、正規化された実行時間単位のみをカウントし、ノードは同様にコンセンサスを得ることができる。

したがって、カイアには3番目の選択肢を選びました。 計算コストの上限は100,000,000だったが、CPUの計算性能が向上したため、Cancun EVMのハードフォーク後は上限が150,000,000に引き上げられた。 この制限値はプラットフォームによって決定されるので、開発者はトランザクションの計算コストに注意すべきである。 トランザクションの計算コストを計算するために、カイアは[kaia_estimateComputationCost](../../../references/json-rpc/kaia/estimate-computation-cost)を提供する。 使い方は[kaia_estimateGas](../../../references/json-rpc/kaia/estimate-gas)とほぼ同じ。

:::note

計算コストに関連するハードフォークの変更は、このページの一番下にあります。 [ハードフォーク変更](#hardfork-changes)へ。

:::

## 計算コストの上限<a id="coputation-cost-limit"></a>

トランザクションの実行時には、一連のオペコードまたはコンパイル済みのコントラクトが順次実行される。 トランザクションの実行時間を制限するために、実実行時間に基づくオペコードとコンパイル済みコントラクトの決定論的実行時間計算モデルを作成した。

このモデルに基づいて、オペコードとプリコンパイル・コントラクトに対する所定の計算コスト値が総計算コストに加算される。 合計値が計算コスト制限を超えた場合、トランザクションの実行は中断され、[ComputationCostLimitReached(0x0a)](../../references/transaction-error-codes.md) エラーが返される。

計算コストの制限値を設定する際、`--opcode-computation-cost-limit`フラグの値が0以外であれば制限値として設定する。 ゼロの場合、各ハードフォークに定義されたデフォルトの計算コスト制限に設定される。
例外的に、call/estimateGas/estimateComputationCostの上限は常に無制限に設定され、フラグやハードフォーク値の影響を受けない。 ただし、ガスキャップのような他の制限により、実行が中断されることはある。

## Opcodeの計算コスト<a id="computation-cost-of-opcodes"></a>

下表は、EVMオペコードの計算コストである。 計算コストは実験に基づいて決定された。

| オペコード          | 計算コスト |
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
| 0x05    | bigModExp             | コードは[こちら](https://github.com/kaiachain/kaia/blob/75c149a464998eb946311f3a290d4b1ea339eaba/blockchain/vm/contracts.go#L340)                                |
| 0x06    | bn256Add              | 8,000                                                                                                                                                     |
| 0x07    | bn256ScalarMul        | 100,000                                                                                                                                                   |
| 0x08    | bn256Pairing          | numOfPairings(input) \* 1,000,000 + 2,000,000                                                                                          |
| 0x09    | blake2f               | bigEndian(getRounds(input[0:4])) \* 10 + 10,000 |
| 0x0A    | kzg                   | 2,200,000                                                                                                                                                 |
| 0x3FD   | vmLog                 | 10                                                                                                                                                        |
| 0x3FE   | feePayer              | 10                                                                                                                                                        |
| 0x3FF   | validateSender        | numOfSigs(input) \* 180,000 + 10,000                                                                                                   |

## Hardfork Changes <a id="hardfork-changes"></a>

| Hardfork     | New items                                                                                                                                                                                                                                               | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |   |   |
| ------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - | - |
| Cancun EVM   | BLOBBASEFEE (0x49)<br/>BLOBHASH (0x50)<br/>TSTORE (0x5c) opcode<br/>TLOAD (0x5d)<br/>MCOPY (0x5e)<br/>kzg (0x0a) precompiled contract | 計算コストの上限を引き上げる<br/>100,000,000 から 150,000,000<br/><br/>いくつかのオペコードの計算コストを削減<br/>CPU パフォーマンスの向上による<br/>-Sdiv (0x05)：739 -> 360<br/>-Mod (0x06)：812 -> 320<br/>-Addmod (0x08)：1410 -> 360<br/>-Mulmod (0x09)：1760 -> 700<br/>-Exp (0x0A)：5000 -> 720<br/>-Sha3 (0x20): 2465 -> 560<br/>-Mstore8 (0x53)：5142 -> 230<br/>-Log1、Log2、Log3、Log4 (0xA1-0xA4)：<br/>1000 -> 500<br/><br/>データベースサイズの増加により、いくつかのオペコードの計算コストが増加<br/>-SLOAD (0x54)：835 -> 2550<br/>-SSTORE (0x55)：1548 -> 2510 |   |   |
| Shanghai EVM | PUSH0 (0x5f) opcode                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |   |   |
| Kore         |                                                                                                                                                                                                                                                         | modExp (0x05) precompiled contract<br/>新しいガス計算ロジックを使用。 <br/>計算コストも影響する。 <br/>より正確になる。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |   |   |
| London EVM   | BaseFee (0x48) opcode                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |   |   |
| Istanbul EVM | CHAINID (0x46) opcode<br/>SELFBALANCE (0x47) opcode<br/>blake2f (0x09) precompiled contract                                                                                                    | 高価なオペコードの計算コストを削減<br/>- ADDMOD (0x08)：3349 -> 1410<br/>- MULMOD (0x09)：4757 -> 1760<br/>- XOR (0x18)：657 -> 454<br/>- NOT (0x19)：1289 -> 364<br/>- SHL (0x1B): 1603 -> 478<br/>- SHR (0x1C)：1815 -> 834                                                                                                                                                                                                                                                                                                                                                      |   |   |
