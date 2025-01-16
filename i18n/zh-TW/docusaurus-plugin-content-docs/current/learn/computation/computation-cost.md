# 計算成本

由於 Kaia 的目標是保持 1 秒的區塊時間，因此必須對事務的執行時間進行管理。 以下是實現這一目標的三種方法：

1. 限制交易的氣體限值
2. 限制事務的執行時間
3. 限制交易的計算成本

限制交易的氣體上限並不是一個可行的解決方案，因為氣體的概念代表了區塊鏈平臺中各種資源（如計算、存儲、網絡帶寬等）當前的交換價值。 它不適合作為衡量事務執行時間的指標。

限制交易的執行時間也不可行，因為區塊鏈平臺上不同節點的執行時間可能不同。 例如，我們將事務的執行時間限制為 100 毫秒。 如果一個節點在 90 毫秒內執行了一個事務，而另一個節點在 110 毫秒內執行了該事務，則這兩個節點無法達成共識。 因此，這種解決方案並不合適。

最後一種方法是限制交易的計算成本。 我們根據每個 EVM 操作碼的實際執行時間對其計算成本進行建模，並限制一個事務的計算成本總和。 通過這種方法，我們可以排除其他因素，只計算歸一化的執行時間單位，節點也能達成共識。

因此，我們為 Kaia 選擇了第三種方案。 計算成本上限為 100,000,000 美元，但隨著 CPU 計算性能的提高，坎昆 EVM 硬分叉後上限已提高到 150,000,000 美元。 該限制值由平臺決定，因此開發人員應瞭解交易的計算成本。 To calculate the computation cost of a transaction, Kaia provides [kaia_estimateComputationCost](../../../references/json-rpc/kaia/estimate-computation-cost). The usage is almost the same as [kaia_estimateGas](../../../references/json-rpc/kaia/estimate-gas).

:::note

與硬叉相關的計算成本變更可在本頁底部找到。 轉到 [Hardfork Changes](#hardfork-changes)。

:::

## 計算成本限額<a id="coputation-cost-limit"></a>

在執行事務時，一系列操作碼或預編譯合約按順序執行。 為了限制事務的執行時間，我們根據實際執行時間為操作碼和預編譯合約建立了一個確定性的執行時間計算模型。

根據這一模型，運算代碼和預編譯合同的預定計算成本值會被添加到總計算成本中。 If the total value exceeds computation cost limit, transaction execution is aborted and returns [ComputationCostLimitReached(0x0a)](../../references/transaction-error-codes.md) error.

在設置計算成本限制值時，如果 `--opcode-computation-cost-limit` 標誌值設置為非零值，我們會將其設置為限制值。 如果為零，則限制值將設置為為每個特定硬分叉定義的默認計算成本限制。
作為例外，call/estimateGas/estimateComputationCost 的限制始終設置為無限，不受標誌或硬分叉值的影響。 但是，由於其他限制（如油箱蓋），執行仍有可能中止。

## 操作碼的計算成本<a id="computation-cost-of-opcodes"></a>

下表顯示了 EVM 運算代碼的計算成本。 計算成本是根據實驗確定的。

| 操作碼            |  計算成本 |
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
| 0x05    | bigModExp             | 查看代碼 [此處](https://github.com/kaiachain/kaia/blob/75c149a464998eb946311f3a290d4b1ea339eaba/blockchain/vm/contracts.go#L340)                                |
| 0x06    | bn256Add              | 8,000                                                                                                                                                     |
| 0x07    | bn256ScalarMul        | 100,000                                                                                                                                                   |
| 0x08    | bn256Pairing          | numOfPairings(input) \* 1,000,000 + 2,000,000                                                                                          |
| 0x09    | blake2f               | bigEndian(getRounds(input[0:4])) \* 10 + 10,000 |
| 0x0A    | kzg                   | 2,200,000                                                                                                                                                 |
| 0x3FD   | vmLog                 | 10                                                                                                                                                        |
| 0x3FE   | feePayer              | 10                                                                                                                                                        |
| 0x3FF   | validateSender        | numOfSigs(input) \* 180,000 + 10,000                                                                                                   |

## Hardfork Changes <a id="hardfork-changes"></a>

| Hardfork     | New items                                                                                                                                                                                                                                               | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |   |   |
| ------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - | - |
| Cancun EVM   | BLOBBASEFEE (0x49)<br/>BLOBHASH (0x50)<br/>TSTORE (0x5c) opcode<br/>TLOAD (0x5d)<br/>MCOPY (0x5e)<br/>kzg (0x0a) precompiled contract | 提高計算成本限制<br/>從 100,000,000 提高到 150,000,000<br/><br/>降低某些操作碼的計算成本<br/>由於 CPU 性能提高<br/>-Sdiv (0x05)：739 -> 360<br/>-Mod (0x06)：812 -> 320<br/>-Addmod (0x08)：1410 -> 360<br/>-Mulmod (0x09)：1760 -> 700<br/>-Exp (0x0A)：5000 -> 720<br/>-Sha3 (0x20)： 2465 -> 560<br/>-Mstore8 (0x53)：5142 -> 230<br/>-Log1, Log2, Log3, Log4 (0xA1-0xA4)：1000 -> 500<br/><br/>由於數據庫大小增加，某些操作碼的計算成本會增加<br/><br/> -SLOAD (0x54)：835 -> 2550<br/>-SSTORE (0x55)：1548 -> 2510 |   |   |
| Shanghai EVM | PUSH0 (0x5f) opcode                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |   |   |
| Kore         |                                                                                                                                                                                                                                                         | modExp (0x05) 預編譯合同<br/>使用新的氣體計算邏輯。 <br/>計算成本也受到影響。 <br/>更加準確。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |   |   |
| London EVM   | BaseFee (0x48) opcode                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |   |   |
| Istanbul EVM | CHAINID (0x46) opcode<br/>SELFBALANCE (0x47) opcode<br/>blake2f (0x09) precompiled contract                                                                                                    | 降低過高操作碼的計算成本<br/>- ADDMOD (0x08)：3349 -> 1410<br/>- MULMOD (0x09)：4757 -> 1760<br/>- XOR (0x18)：657 -> 454<br/>- NOT (0x19)：1289 -> 364<br/>- SHL (0x1B): 1603 -> 478<br/>- SHR (0x1C)：1815 -> 834                                                                                                                                                                                                                                                                                                                   |   |   |
