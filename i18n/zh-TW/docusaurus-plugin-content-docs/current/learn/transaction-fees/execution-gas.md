# 執行氣體

氣體是 "內在氣體 "和 "執行氣體 "的總和。 在這裡，我們將重點討論如何計算 "執行氣體"。

:::note

執行氣體相關硬分叉更改可在本頁底部找到。 轉到 [Hardfork Changes](#hardfork-changes)。

:::

## 概述<a id="overview"></a>

在三種不同的情況下，執行合同時會收取執行費。 有時，某些政策可能會被省略。

- 第一種也是最常見的一種是 "constantGas"。 這是計算操作的固有費用。
- 其次，氣體可被扣除，以形成從屬報文調用或合同創建的付款；這構成 "CREATE"、"CALL "和 "CALLCODE "付款的一部分。
- 最後，由於內存使用量增加，可能會收取氣體費用。

在一個賬戶的執行過程中，應支付的內存使用費總額與 32 字節的最小倍數成正比，而 32 字節的最小倍數是包括所有內存索引（無論是讀取還是寫入）的範圍。 這筆費用是按時支付的；因此，如果引用的內存區域至少比先前索引的內存區域大 32 字節，就會產生額外的內存使用費。 由於這筆費用，地址超過 32 位界限的可能性很小。 儘管如此，實施方案必須能夠管理這種可能發生的情況。

存儲費的行為略有細微差別。 為了鼓勵最大限度地減少存儲空間的使用（這與所有節點上都有一個更大的狀態數據庫直接對應），從存儲空間中清除條目的操作的執行費用不僅可以免除，而且還可以獲得合格的退款；事實上，這種退款實際上是提前支付的，因為初始使用存儲位置的成本要比正常使用高得多。

## 操作碼氣體時間表<a id="opcode-gas-schedule"></a>

費用表 `G` 是由 37 個標量值組成的元組，這些標量值與交易可能產生的若干抽象操作的相對費用（以瓦斯為單位）相對應。 此外，還有氣體項目，用於計算由 `CALL_*` 操作碼調用的預編譯合約的氣體。

### 代表操作碼 "常數氣體 "的標量值

| 名稱                      |    價值 |                     代碼中的名稱 | 操作碼                                                                                                                                                                                                                                                                                                   |
| :---------------------- | ----: | -------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `G_base`                |     2 |               GasQuickStep | `ADDRESS`, `ORIGIN`, `CALLER`, `CALLVALUE`, `CALLDATASIZE`,  `CODESIZE`, `GASPRICE`, `COINBASE`, `TIMESTAMP`, `NUMBER`,   `PREVRANDAO`(originally it was `DIFFICULTY`), `GASLIMIT`, `RETURNDATASIZE`, `POP`, `PC`, `MSIZE`, `GAS`,  `CHAINID`,  `BASEFEE`,  `PUSH0`, `BLOBBASEFEE` |
| `G_verylow`             |     3 |             GasFastestStep | `ADD`, `SUB`, `LT`, `GT`, `SLT`, `SGT`, `EQ`, `ISZERO`, `AND`,  `OR`, `XOR`, `NOT`, `BYTE`, `CALLDATALOAD`,  `MLOAD`, `MSTORE`, `MSTORE8`, `PUSH`, `DUP`, `SWAP`, `BLOBHASH`, `MCOPY`                                                                                                                 |
| `G_low`                 |     5 |                GasFastStep | `MUL`, `DIV`, `SDIV`, `MOD`, `SMOD`, `SIGNEXTEND`,  `SELFBALANCE`                                                                                                                                                                                                                                     |
| `G_mid`                 |     8 |                 GasMidStep | `ADDMOD`, `MULMOD`, `JUMP`                                                                                                                                                                                                                                                                            |
| `G_high`                |    10 |                GasSlowStep | `JUMPI`                                                                                                                                                                                                                                                                                               |
| `G_selfdestruct`        |  5000 |            SelfdestructGas | `SELFDESTRUCT`                                                                                                                                                                                                                                                                                        |
| `G_warmStorageReadCost` |   100 | WarmStorageReadCostEIP2929 | `EXTCODECOPY`, `EXTCODESIZE`, `EXTCODEHASH`, `BALANCE`,  `CALL`, `CALLCODE`, `STATICCALL`, `DELEGATECALL`, `TSTORE`, `TLOAD`                                                                                                                                                                          |
| `G_blockhash`           |    20 |                 GasExtStep | `BLOCKHASH`                                                                                                                                                                                                                                                                                           |
| `G_jumpdest`            |     1 |                JumpdestGas | `JUMPDEST`                                                                                                                                                                                                                                                                                            |
| `G_sha3`                |    30 |                    Sha3Gas | `SHA3`                                                                                                                                                                                                                                                                                                |
| `G_create`              | 32000 |                  CreateGas | `CREATE`, `CREATE2`                                                                                                                                                                                                                                                                                   |

### 用於根據內存和日誌使用量計算氣體的標量值

| Name         | Value | Name in Code | Description              |
| :----------- | ----: | -----------: | :----------------------- |
| `G_memory`   |     3 |    MemoryGas | 擴展存儲器時，每增加一個字所需支付的氣體量    |
| `G_copy`     |     3 |      CopyGas | 複製 "操作的部分付款，乘以複製字數，四捨五入  |
| `G_log`      |   375 |       LogGas | 為 "LOG "操作支付部分費用         |
| `G_logdata`  |     8 |   LogDataGas | 為 "LOG "操作數據中的每個字節支付的氣體量 |
| `G_logtopic` |   375 |  LogTopicGas | 為 "LOG "操作的每個主題支付的氣體量    |

### 用於計算特定操作碼氣體的標量值

| Name              | Value | Name in Code                      | Description                                                                              |
| :---------------- | ----: | --------------------------------- | :--------------------------------------------------------------------------------------- |
| `G_sset`          | 20000 | SstoreSetGas                      | 設定存儲值時支付的氣量                                                                              |
| `G_sreset`        |  5000 | SstoreResetGas                    | 存儲值保持不變為零或設置為零時支付的氣量                                                                     |
| `G_coldSloadCost` |  2100 | ColdSloadCostEIP2929              | 存儲值不在訪問列表中時支付的氣量                                                                         |
| `R_sclear`        | 15000 | SstoreClearsScheduleRefundEIP3529 | `G_sreset` - `G_coldSloadCost` + `TxAccessListStorageKeyGas (1900)`                      |
| `G_exp`           |    10 | ExpGas                            | Partial payment                                                                          |
| `G_expbyte`       |    50 | ExpByte                           | 乘以 "ceil(log_256(指數)) "時的部分付款 |
| `G_selfdestruct`  |  5000 | SelfdestructGas                   | 為 "SELFDESTRUCT "操作支付的氣體量                                                                |
| `G_callvalue`     |  9000 | CallValueTransferGas              | 為非零價值轉移支付的氣量                                                                             |
| `G_callstipend`   |  2300 | CallStipend                       | 呼叫開始時為非零值轉移提供的免費氣體                                                                       |
| `G_newaccount`    | 25000 | CallNewAccountGas                 | 創建賬戶時已支付的汽油金額。 它也可以定義為帶有 "SELFDESTRUCT "操作的 "CreateBySelfdestructGas"。                   |
| `G_codedeposit`   |   200 | CreateDataGas                     | 為創建成功將代碼置入狀態的合同而按字節支付的氣體量                                                                |
| `G_sha3word`      |     6 | Sha3WordGas                       | 輸入數據 "SHA3 "時，每個字所支付的氣體量（四捨五入）。                                                          |
| `G_InitCodeWord`  |     2 | InitCodeWordGas                   | 為 "CREATE"、"CREATE2 "的每個初始代碼單詞支付的氣體量                                                     |

## 預編合同天然氣成本表<a id="precompiled-contracts-gas-cost-table"></a>

預編譯合約是一種特殊的合約，通常執行復雜的加密計算，並由其他合約啟動。

以下是卡亞預編譯合同的天然氣成本表。 輸入 "是預編譯合同的字節數組輸入。

| Address | Precompiled contracts | Gas Cost                                                                                                                                   |
| :------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| 0x01    | ecrecover             | 3,000                                                                                                                                      |
| 0x02    | sha256hash            | 字數（輸入）\* 12 + 60                                                                                                                           |
| 0x03    | ripemd160hash         | 字數（輸入）\* 120 + 600                                                                                                                         |
| 0x04    | dataCopy              | 字數（輸入）\* 3 + 15                                                                                                                            |
| 0x05    | bigModExp             | 查看代碼 [此處](https://github.com/kaiachain/kaia/blob/75c149a464998eb946311f3a290d4b1ea339eaba/blockchain/vm/contracts.go#L340)                 |
| 0x06    | bn256Add              | 150                                                                                                                                        |
| 0x07    | bn256ScalarMul        | 6,000                                                                                                                                      |
| 0x08    | bn256Pairing          | 配對數（輸入）\* 34,000 + 45,000                                                                                                                  |
| 0x09    | blake2f               | bigEndian(getRounds(input[0:4])) |
| 0x0A    | kzg                   | 50,000                                                                                                                                     |
| 0x3FD   | vmLog                 | len(input) \* 20 + 100                                                                                                  |
| 0x3FE   | feePayer              | 300                                                                                                                                        |
| 0x3FF   | validateSender        | 數組（輸入）\* 5,000                                                                                                                             |

## 執行合同的氣體計算邏輯<a id="gas-calculation-logic-for-contract-execution"></a>

一次交易的天然氣成本通過下述方法計算。 首先，根據交易類型和輸入添加氣體。 然後，如果合約被執行，操作碼將被逐個執行，直到執行結束或出現 "STOP "操作。 在此過程中，將根據為每個操作碼定義的 "constantGas "和額外定義的氣體計算方法收取費用。

在此，我將簡要說明合同執行過程中使用上述費用表變量的天然氣計算邏輯。 由於本解釋假設的是一般情況，因此沒有考慮回退等異常情況。

- 將每個操作碼中定義的 "constantGas "添加到 gas 中
  - 例如，如果操作碼為 `MUL`，則在 gas 中添加 \`G_low
  - 例如，如果操作碼是 `CREATE2`，則在 gas 中添加 \`G_create
- 添加通過額外定義的氣體計算方法計算出的氣體
  - 對於 `LOG'N'`，其中 N 為 [0,1,2,3,4]，將 `G_log + memoryGasCost * g_logdata + N x G_logtopic` 添加到氣體中
  - 對於 `EXP`，將 `G_exp + byteSize(stack.back(1)) x G_expbyte` 加入氣體中
  - 對於`CALLDATACOPY`或`CODECOPY`或`RETURNDATACOPY`，在氣體中添加`wordSize(stack.back(2)) x G_copy`。
  - 用於 `EXTCODECOPY`、
    - 將 `wordSize(stack.back(3)) x G_copy` 添加到氣體中
    - [**_eip2929_**] 如果地址不在 AccessList 中，則將其添加到 AccessList 中，並將`G_coldSloadCost - G_warmStorageReadCost` 添加到氣體中。
  - 用於 `EXTCODESIZE` 或 `EXTCODEHASH` 或 `BALANCE`、
    - [**_eip2929_**] 如果地址不在 AccessList 中，則將其添加到 AccessList 中，並將`G_coldSloadCost - G_warmStorageReadCost` 添加到氣體中。
  - 對於 `SHA3`，將 `G_sha3 + wordSize(stack.back(1)) x G_sha3word` 添加到氣體中。
  - 對於 `RETURN`、`REVERT`、`MLoad`、`MStore8`、`MStore`，將 `memoryGasCost` 添加到氣體中
  - 對於 "CREATE"，在氣體中添加 "memoryGasCost + size(contract.code) x G_codedeposit + wordsize(initcode) x G_InitCodeWord
  - 對於 `CREATE2`，將 `memoryGasCost + size(data) x G_sha3word + size(contract.code) x G_codedeposit + wordsize(initcode) x G_InitCodeWord` 添加到氣體中
  - 對於 "SSTORE"、
    - [**_eip2929_**] 如果槽（contractAddr, 槽）不在 AccessList 中，則將其添加到 AccessList 中，並將 `G_coldSloadCost` 添加到氣體中。
    - 如果只是讀取插槽（無操作），則將 `G_warmStorageReadCost` 添加到 gas
    - 如果創建了一個新槽，則將 `G_sset` 添加到 gas
    - 如果它刪除了插槽，則在 gas 中添加 `G_sreset-G_coldSloadCost` 並在 refund 中添加 `R_sclear`
    - 如果重新創建過一次插槽，則在氣體中加入 `G_warmStorageReadCost` 並從退款中減去 `R_sclear` 。
    - 如果它刪除了之前存在過的插槽，則在退款時添加 `R_sclear` 。
    - 如果重置為原來不存在的插槽，則在 gas 中添加 `G_warmStorageReadCost` 並在退款中添加 `G_sset - G_warmStorageReadCost`
    - 如果重置為原來的現有插槽，則在 gas 中添加 `G_warmStorageReadCost` 並在 refund 中添加 \`G_sreset - G_coldSloadCost - G_warmStorageReadCost
  - 用於 `SLOAD`、
    - [**_eip2929_**] 如果槽（contractAddr, 槽）不在 AccessList 中，則將其添加到 AccessList 中，並將 `G_coldSloadCost` 添加到氣體中。
    - [**_eip2929_**] 如果槽（contractAddr, 槽）位於 AccessList 中，則將 `G_warmStorageReadCost` 添加到氣體中。
  - 用於 `CALL`、`CALLCODE`、`DELEGATECALL`、`STATICCALL`、
    - [**_eip2929_**] 如果地址不在 AccessList 中，則將其添加到 AccessList 中，並將 `G_coldSloadCost` 添加到氣體中
    - 如果它是 `CALL` 和 `CALLCODE`，如果它傳輸值，則在 gas 中添加 \`G_callvalue
    - 如果是 `CALL'，如果是轉賬，如果是新賬戶，則在 gas 中添加 `G_newaccount
    - 如果受話人合同是預編譯合同，則計算預編譯合同天然氣成本，並將其添加到天然氣成本中。
    - 將 "內存燃氣成本 + 可用燃氣 - 可用燃氣/64，其中可用燃氣 = 合同.燃氣 - 燃氣 "添加到燃氣中
  - 用於 `SELFDESTRUCT`、
    - [**_eip2929_**] 如果地址不在 AccessList 中，則將其添加到 AccessList 中，並將 `G_coldSloadCost` 添加到氣體中
    - 如果是轉移值，如果是新賬戶，則將 `G_newaccount` 加入 gas

## Hardfork changes

| Hardfork     | New Items                                                                                                                                                                                                                                                                          | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cancun EVM   | BLOBBASEFEE (0x49) opcode<br/>BLOBHASH (0x50) opcode<br/>TSTORE (0x5C) opcode<br/>TLOAD (0x5D) opcode<br/>MCOPY(0x5E) opcode<br/>kzg (0x0A) precompiled contract | 完全支持 accessList，通過 tx args 添加到 accessList<br/>的存儲<br/>access 變得溫暖了。                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Shanghai EVM | PUSH0 (0x5F) opcode                                                                                                                                                                                                                                             | 溫暖的硬幣基地，因此訪問<br/>coinbase 的氣體成本始終是溫暖的<br/><br/>開始在 `Create`, `Create2` 操作碼<br/>中為每個字的 initcode 添加 2 個氣體                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Kore         |                                                                                                                                                                                                                                                                                    | reduction in refunds<br/>- removes refund for SELFDESTRUCT (0xFF), SSTORE (0x55) <br/>- capped the refund to gasUsed/5 (it was gasUsed/2)<br/> <br/>increase gas cost for state access opcodes <br/>- accessList is introduced here but it's not yet supported.                                                                                                                                                                                              |
| London EVM   | BASEFEE (0x48) opcode                                                                                                                                                                                                                                           | modExp (0x05) precompiled contract <br/>use new gas calculation logic. <br/>Become more accurate.                                                                                                                                                                                                                                                                                                                                                                                  |
| Istanbul EVM | CHAINID (0x46) 操作碼<br/> SELFBALANCE (0x47) 操作碼<br/>blake2f (0x09) 預編譯合同                                                                                                                                                   | 降低 BN256 預編譯合同的氣體成本<br/>- Bn256Add (0x06):500->150<br/>- Bn256ScalarMul (0x07)：40,000->6,000<br/>- BN256Pairing (0x08)： <br/> -- BaseGas：100,000->45,000<br/> -- PerPointGas：80,000->34,000<br/> <br/>SSTORE (0x55) 的新氣體計算邏輯。 <br/>- 引進冷藏庫。 <br/>- 首次接入的燃氣費用增加。 <br/> <br/>增加重存儲訪問的氣體成本<br/>- SLOAD(0x54)：200->800<br/>- BALANCE(0x31)：400->700<br/>- EXTCODEHASH(0x3F)：400->700 |
