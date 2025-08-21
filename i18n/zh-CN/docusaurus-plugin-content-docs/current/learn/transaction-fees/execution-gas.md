# 执行气体

气体是 "内在气体 "和 "执行气体 "的总和。 在这里，我们将重点讨论如何计算 "执行气体"。

:::note

执行气体相关硬分叉更改可在本页底部找到。 转到 [Hardfork Changes](#hardfork-changes)。

:::

## 概述<a id="overview"></a>

在三种不同的情况下，执行合同时会收取执行费。 有时，某些政策可能会被省略。

 - 第一种也是最常见的一种是 "constantGas"。 这是计算操作的固有费用。
 - 其次，气体可被扣除，以形成从属报文调用或合同创建的付款；这构成 "CREATE"、"CALL "和 "CALLCODE "付款的一部分。
 - 最后，由于内存使用量增加，可能会收取气体费用。

在一个账户的执行过程中，应支付的内存使用费总额与 32 字节的最小倍数成正比，而 32 字节的最小倍数是包括所有内存索引（无论是读取还是写入）的范围。 这笔费用是按时支付的；因此，如果引用的内存区域至少比先前索引的内存区域大 32 字节，就会产生额外的内存使用费。 由于这笔费用，地址超过 32 位界限的可能性很小。 尽管如此，实施方案必须能够管理这种可能发生的情况。

存储费的行为略有细微差别。 为了鼓励最大限度地减少存储空间的使用（这与所有节点上都有一个更大的状态数据库直接对应），从存储空间中清除条目的操作的执行费用不仅可以免除，而且还可以获得合格的退款；事实上，这种退款实际上是提前支付的，因为初始使用存储位置的成本要比正常使用高得多。

## 操作码气体时间表<a id="opcode-gas-schedule"></a>

费用表 `G` 是由 37 个标量值组成的元组，这些标量值与交易可能产生的若干抽象操作的相对费用（以瓦斯为单位）相对应。 此外，还有气体项目，用于计算由 `CALL_*` 操作码调用的预编译合约的气体。

### 代表操作码 "常数气体 "的标量值

| 名称                      |    价值 |                     代码中的名称 | 操作码                                                                                                                                                                                                                                                                                                   |
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

### 用于根据内存和日志使用量计算气体的标量值

| Name         | Value | Name in Code | Description              |
| :----------- | ----: | -----------: | :----------------------- |
| `G_memory`   |     3 |    MemoryGas | 扩展存储器时，每增加一个字所需支付的气体量    |
| `G_copy`     |     3 |      CopyGas | 复制 "操作的部分付款，乘以复制字数，四舍五入  |
| `G_log`      |   375 |       LogGas | 为 "LOG "操作支付部分费用         |
| `G_logdata`  |     8 |   LogDataGas | 为 "LOG "操作数据中的每个字节支付的气体量 |
| `G_logtopic` |   375 |  LogTopicGas | 为 "LOG "操作的每个主题支付的气体量    |

### 用于计算特定操作码气体的标量值

| Name              | Value | Name in Code                      | Description                                                                              |
| :---------------- | ----: | --------------------------------- | :--------------------------------------------------------------------------------------- |
| `G_sset`          | 20000 | SstoreSetGas                      | 设定存储值时支付的气量                                                                              |
| `G_sreset`        |  5000 | SstoreResetGas                    | 存储值保持不变为零或设置为零时支付的气量                                                                     |
| `G_coldSloadCost` |  2100 | ColdSloadCostEIP2929              | 存储值不在访问列表中时支付的气量                                                                         |
| `R_sclear`        | 15000 | SstoreClearsScheduleRefundEIP3529 | `G_sreset` - `G_coldSloadCost` + `TxAccessListStorageKeyGas (1900)`                      |
| `G_exp`           |    10 | ExpGas                            | Partial payment                                                                          |
| `G_expbyte`       |    50 | ExpByte                           | 乘以 "ceil(log_256(指数)) "时的部分付款 |
| `G_selfdestruct`  |  5000 | SelfdestructGas                   | 为 "SELFDESTRUCT "操作支付的气体量                                                                |
| `G_callvalue`     |  9000 | CallValueTransferGas              | 为非零价值转移支付的气量                                                                             |
| `G_callstipend`   |  2300 | CallStipend                       | 呼叫开始时为非零值转移提供的免费气体                                                                       |
| `G_newaccount`    | 25000 | CallNewAccountGas                 | 创建账户时已支付的汽油金额。 它也可以定义为带有 "SELFDESTRUCT "操作的 "CreateBySelfdestructGas"。                   |
| `G_codedeposit`   |   200 | CreateDataGas                     | 为创建成功将代码置入状态的合同而按字节支付的气体量                                                                |
| `G_sha3word`      |     6 | Sha3WordGas                       | 输入数据 "SHA3 "时，每个字所支付的气体量（四舍五入）。                                                          |
| `G_InitCodeWord`  |     2 | InitCodeWordGas                   | 为 "CREATE"、"CREATE2 "的每个初始代码单词支付的气体量                                                     |

## 预编合同天然气成本表<a id="precompiled-contracts-gas-cost-table"></a>

预编译合约是一种特殊的合约，通常执行复杂的加密计算，并由其他合约启动。

以下是卡亚预编译合同的天然气成本表。 输入 "是预编译合同的字节数组输入。

| Address | Precompiled contracts | Gas Cost                                                                                                                                   |
| :------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| 0x01    | ecrecover             | 3,000                                                                                                                                      |
| 0x02    | sha256hash            | 字数（输入）\* 12 + 60                                                                                                                           |
| 0x03    | ripemd160hash         | 字数（输入）\* 120 + 600                                                                                                                         |
| 0x04    | dataCopy              | 字数（输入）\* 3 + 15                                                                                                                            |
| 0x05    | bigModExp             | 查看代码 [此处](https://github.com/kaiachain/kaia/blob/75c149a464998eb946311f3a290d4b1ea339eaba/blockchain/vm/contracts.go#L340)                 |
| 0x06    | bn256Add              | 150                                                                                                                                        |
| 0x07    | bn256ScalarMul        | 6,000                                                                                                                                      |
| 0x08    | bn256Pairing          | 配对数（输入）\* 34,000 + 45,000                                                                                                                  |
| 0x09    | blake2f               | bigEndian(getRounds(input[0:4])) |
| 0x0A    | kzg                   | 50,000                                                                                                                                     |
| 0x3FD   | vmLog                 | len(input) \* 20 + 100                                                                                                  |
| 0x3FE   | feePayer              | 300                                                                                                                                        |
| 0x3FF   | validateSender        | 数组（输入）\* 5,000                                                                                                                             |

## 执行合同的气体计算逻辑<a id="gas-calculation-logic-for-contract-execution"></a>

一次交易的天然气成本通过下述方法计算。 首先，根据交易类型和输入添加气体。 然后，如果合约被执行，操作码将被逐个执行，直到执行结束或出现 "STOP "操作。 在此过程中，将根据为每个操作码定义的 "constantGas "和额外定义的气体计算方法收取费用。

在此，我将简要说明合同执行过程中使用上述费用表变量的天然气计算逻辑。 由于本解释假设的是一般情况，因此没有考虑回退等异常情况。

 - 将每个操作码中定义的 "constantGas "添加到 gas 中
     - 例如，如果操作码为 `MUL`，则在 gas 中添加 \`G_low
     - 例如，如果操作码是 `CREATE2`，则在 gas 中添加 \`G_create
 - 添加通过额外定义的气体计算方法计算出的气体
     - 对于 `LOG'N'`，其中 N 为 [0,1,2,3,4]，将 `G_log + memoryGasCost * g_logdata + N x G_logtopic` 添加到气体中
     - 对于 `EXP`，将 `G_exp + byteSize(stack.back(1)) x G_expbyte` 加入气体中
     - 对于`CALLDATACOPY`或`CODECOPY`或`RETURNDATACOPY`，在气体中添加`wordSize(stack.back(2)) x G_copy`。
     - 用于 `EXTCODECOPY`、
         - 将 `wordSize(stack.back(3)) x G_copy` 添加到气体中
         - [**_eip2929_**] 如果地址不在 AccessList 中，则将其添加到 AccessList 中，并将`G_coldSloadCost - G_warmStorageReadCost` 添加到气体中。
     - 用于 `EXTCODESIZE` 或 `EXTCODEHASH` 或 `BALANCE`、
         - [**_eip2929_**] 如果地址不在 AccessList 中，则将其添加到 AccessList 中，并将`G_coldSloadCost - G_warmStorageReadCost` 添加到气体中。
     - 对于 `SHA3`，将 `G_sha3 + wordSize(stack.back(1)) x G_sha3word` 添加到气体中。
     - 对于 `RETURN`、`REVERT`、`MLoad`、`MStore8`、`MStore`，将 `memoryGasCost` 添加到气体中
     - 对于 "CREATE"，在气体中添加 "memoryGasCost + size(contract.code) x G_codedeposit + wordsize(initcode) x G_InitCodeWord
     - 对于 `CREATE2`，将 `memoryGasCost + size(data) x G_sha3word + size(contract.code) x G_codedeposit + wordsize(initcode) x G_InitCodeWord` 添加到气体中
     - 对于 "SSTORE"、
         - [**_eip2929_**] 如果槽（contractAddr, 槽）不在 AccessList 中，则将其添加到 AccessList 中，并将 `G_coldSloadCost` 添加到气体中。
         - 如果只是读取插槽（无操作），则将 `G_warmStorageReadCost` 添加到 gas
         - 如果创建了一个新槽，则将 `G_sset` 添加到 gas
         - 如果它删除了插槽，则在 gas 中添加 `G_sreset-G_coldSloadCost` 并在 refund 中添加 `R_sclear`
         - 如果重新创建过一次插槽，则在气体中加入 `G_warmStorageReadCost` 并从退款中减去 `R_sclear` 。
         - 如果它删除了之前存在过的插槽，则在退款时添加 `R_sclear` 。
         - 如果重置为原来不存在的插槽，则在 gas 中添加 `G_warmStorageReadCost` 并在退款中添加 `G_sset - G_warmStorageReadCost`
         - 如果重置为原来的现有插槽，则在 gas 中添加 `G_warmStorageReadCost` 并在 refund 中添加 \`G_sreset - G_coldSloadCost - G_warmStorageReadCost
     - 用于 `SLOAD`、
         - [**_eip2929_**] 如果槽（contractAddr, 槽）不在 AccessList 中，则将其添加到 AccessList 中，并将 `G_coldSloadCost` 添加到气体中。
         - [**_eip2929_**] 如果槽（contractAddr, 槽）位于 AccessList 中，则将 `G_warmStorageReadCost` 添加到气体中。
     - 用于 `CALL`、`CALLCODE`、`DELEGATECALL`、`STATICCALL`、
         - [**_eip2929_**] 如果地址不在 AccessList 中，则将其添加到 AccessList 中，并将 `G_coldSloadCost` 添加到气体中
         - 如果它是 `CALL` 和 `CALLCODE`，如果它传输值，则在 gas 中添加 \`G_callvalue
         - 如果是 `CALL'，如果是转账，如果是新账户，则在 gas 中添加 `G_newaccount
         - 如果受话人合同是预编译合同，则计算预编译合同天然气成本，并将其添加到天然气成本中。
         - 将 "内存燃气成本 + 可用燃气 - 可用燃气/64，其中可用燃气 = 合同.燃气 - 燃气 "添加到燃气中
     - 用于 `SELFDESTRUCT`、
         - [**_eip2929_**] 如果地址不在 AccessList 中，则将其添加到 AccessList 中，并将 `G_coldSloadCost` 添加到气体中
         - 如果是转移值，如果是新账户，则将 `G_newaccount` 加入 gas

## Hardfork changes

| Hardfork     | New Items                                                                                                                                                                                                                                                                          | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cancun EVM   | BLOBBASEFEE (0x49) opcode<br/>BLOBHASH (0x50) opcode<br/>TSTORE (0x5C) opcode<br/>TLOAD (0x5D) opcode<br/>MCOPY(0x5E) opcode<br/>kzg (0x0A) precompiled contract | 完全支持 accessList，通过 tx args 添加到 accessList<br/>的存储<br/>access 变得温暖了。                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Shanghai EVM | PUSH0 (0x5F) opcode                                                                                                                                                                                                                                             | 温暖的硬币基地，因此访问<br/>coinbase 的气体成本始终是温暖的<br/><br/>开始在 `Create`, `Create2` 操作码<br/>中为每个字的 initcode 添加 2 个气体                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Kore         |                                                                                                                                                                                                                                                                                    | reduction in refunds<br/>- removes refund for SELFDESTRUCT (0xFF), SSTORE (0x55) <br/>- capped the refund to gasUsed/5 (it was gasUsed/2)<br/> <br/>increase gas cost for state access opcodes <br/>- accessList is introduced here but it's not yet supported.                                                                                                                                                                                              |
| London EVM   | BASEFEE (0x48) opcode                                                                                                                                                                                                                                           | modExp (0x05) precompiled contract <br/>use new gas calculation logic. <br/>Become more accurate.                                                                                                                                                                                                                                                                                                                                                                                  |
| Istanbul EVM | CHAINID (0x46) 操作码<br/> SELFBALANCE (0x47) 操作码<br/>blake2f (0x09) 预编译合同                                                                                                                                                   | 降低 BN256 预编译合同的气体成本<br/>- Bn256Add (0x06):500->150<br/>- Bn256ScalarMul (0x07)：40,000->6,000<br/>- BN256Pairing (0x08)： <br/> -- BaseGas：100,000->45,000<br/> -- PerPointGas：80,000->34,000<br/> <br/>SSTORE (0x55) 的新气体计算逻辑。 <br/>- 引进冷藏库。 <br/>- 首次接入的燃气费用增加。 <br/> <br/>增加重存储访问的气体成本<br/>- SLOAD(0x54)：200->800<br/>- BALANCE(0x31)：400->700<br/>- EXTCODEHASH(0x3F)：400->700 |
