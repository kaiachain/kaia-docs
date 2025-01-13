# Execution Gas

Gas is a sum of `IntrinsicGas` and `ExecutionGas`. In here, we would focus on how `ExecutionGas` is calculated.

:::note

Execution gas related hardfork changes can be found at the bottom of this page. Go to [Hardfork Changes](#hardfork-changes).

:::

## Overview <a id="overview"></a>

Execution gas is charged during executing a contract under three distinct circumstances. Sometimes, some policies may be omitted.

* The first and most common is the `constantGas`. It's a fee intrinsic to the computation of the operation.
* Second, gas may be deducted to form the payment for a subordinate message call or contract creation; this forms part of the payment for `CREATE`, `CALL` and `CALLCODE`.
* Finally, gas may be charged due to an increase in memory usage.

Over an account's execution, the total fee payable for memory-usage payable is proportional to the smallest multiple of 32 bytes that are required to include all memory indices \(whether for read or write\) in the range. This fee is paid on a just-in-time basis; consequently, referencing an area of memory at least 32 bytes greater than any previously indexed memory will result in an additional memory usage fee. Due to this fee, it is highly unlikely that addresses will ever exceed the 32-bit bounds. That said, implementations must be able to manage this eventuality.

Storage fees have a slightly nuanced behavior. To incentivize minimization of the use of storage \(which corresponds directly to a larger state database on all nodes\), the execution fee for an operation that clears an entry from storage is not only waived but also elicits a qualified refund; in fact, this refund is effectively paid in advance because the initial usage of a storage location costs substantially more than normal usage.

## Opcode Gas Schedule <a id="opcode-gas-schedule"></a>

The fee schedule `G` is a tuple of 37 scalar values corresponding to the relative costs, in gas, of a number of abstract operations that a transaction may incur. Also, there's gas items to calculate the gas of the precompiled contracts called by `CALL_*` opcodes.

### Scalar values representing `constantGas` of an opcode

| Name | Value |                Name in code | Opcodes                                                                                                                                                                                                                                                                            |
| :--- | ---: |----------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `G_base` | 2 |                GasQuickStep | `ADDRESS`, `ORIGIN`, `CALLER`, `CALLVALUE`, `CALLDATASIZE`,  `CODESIZE`, `GASPRICE`, `COINBASE`, `TIMESTAMP`, `NUMBER`,   `PREVRANDAO`(originally it was `DIFFICULTY`), `GASLIMIT`, `RETURNDATASIZE`, `POP`, `PC`, `MSIZE`, `GAS`,  `CHAINID`,  `BASEFEE`,  `PUSH0`, `BLOBBASEFEE` |
| `G_verylow` | 3 |              GasFastestStep | `ADD`, `SUB`, `LT`, `GT`, `SLT`, `SGT`, `EQ`, `ISZERO`, `AND`,  `OR`, `XOR`, `NOT`, `BYTE`, `CALLDATALOAD`,  `MLOAD`, `MSTORE`, `MSTORE8`, `PUSH`, `DUP`, `SWAP`, `BLOBHASH`, `MCOPY`                                                                                              |
| `G_low` | 5 |                 GasFastStep | `MUL`, `DIV`, `SDIV`, `MOD`, `SMOD`, `SIGNEXTEND`,  `SELFBALANCE`                                                                                                                                                                                                                  |
| `G_mid` | 8 |                  GasMidStep | `ADDMOD`, `MULMOD`, `JUMP`                                                                                                                                                                                                                                                         |
| `G_high` | 10 |                 GasSlowStep | `JUMPI`                                                                                                                                                                                                                                                                            |
| `G_selfdestruct` | 5000 |             SelfdestructGas | `SELFDESTRUCT`                                                                                                                                                                                                                                                                     |
| `G_warmStorageReadCost`  | 100 | WarmStorageReadCostEIP2929  | `EXTCODECOPY`, `EXTCODESIZE`, `EXTCODEHASH`, `BALANCE`,  `CALL`, `CALLCODE`, `STATICCALL`, `DELEGATECALL`, `TSTORE`, `TLOAD`                                                                                                                                                              |
| `G_blockhash` | 20 |                  GasExtStep | `BLOCKHASH`                                                                                                                                                                                                                                                                        |
| `G_jumpdest` | 1 |                 JumpdestGas | `JUMPDEST`                                                                                                                                                                                                                                                                         |
| `G_sha3` | 30 |                     Sha3Gas | `SHA3`                                                                                                                                                                                                                                                                             |
| `G_create` | 32000 |                   CreateGas | `CREATE`, `CREATE2`                                                                                                                                                                                                                                                                |

### Scalar values used to calculate the gas based on memory and log usage

| Name | Value | Name in Code | Description |
| :--- | ---: | ---: | :--- |
| `G_memory` | 3 | MemoryGas | Amount of gas paid for every additional word when expanding memory |
| `G_copy` | 3 | CopyGas | Partial payment for `COPY` operations, multiplied by words copied, rounded up |
| `G_log` | 375 | LogGas | Partial payment for a `LOG` operation |
| `G_logdata` | 8 | LogDataGas | Amount of gas paid for each byte in a `LOG` operation's data |
| `G_logtopic` | 375 | LogTopicGas | Amount of gas paid for each topic of a `LOG` operation |

### Scalar values used to calculate the gas of the particular opcode

| Name              | Value | Name in Code | Description |
|:------------------| ---: | --- | :--- |
| `G_sset`          | 20000 | SstoreSetGas | Amount of gas paid when the storage value when set storage | 
| `G_sreset`        | 5000 | SstoreResetGas | Amount of gas paid when the storage value remains unchanged at zero or is set to zero | 
| `G_coldSloadCost` | 2100 | ColdSloadCostEIP2929 | Amount of gas paid when the storage value is not in accessList |
| `R_sclear`        | 15000 | SstoreClearsScheduleRefundEIP3529 | `G_sreset` - `G_coldSloadCost` + `TxAccessListStorageKeyGas (1900)` |
| `G_exp`           | 10 | ExpGas | Partial payment |
| `G_expbyte`       | 50 | ExpByte | Partial payment when multiplied by `ceil(log_256(exponent))` |
| `G_selfdestruct`  | 5000 | SelfdestructGas | Amount of gas paid for a `SELFDESTRUCT` operation |
| `G_callvalue`     | 9000 | CallValueTransferGas | Amount of gas paid for a nonzero value transfer |
| `G_callstipend`   | 2300 | CallStipend | Free gas given at beginning of call for a nonzero value transfer |
| `G_newaccount`    | 25000 | CallNewAccountGas | Amount of gas paid when creating an account. It is also be defined as `CreateBySelfdestructGas` with `SELFDESTRUCT` operation. |
| `G_codedeposit`   | 200 | CreateDataGas | Amount of gas paid per byte for a creating a contract that succeeds in placing code into state |
| `G_sha3word`      | 6 | Sha3WordGas | Amount of gas paid for each word \(rounded up\) for an `SHA3` input data |
| `G_InitCodeWord`  | 2 | InitCodeWordGas | Amount of gas paid for each word of initcode for a `CREATE`,`CREATE2` | 

## Precompiled contracts gas cost table <a id="precompiled-contracts-gas-cost-table"></a>

Precompiled contracts are special kind of contracts which usually perform complex cryptographic computations and are initiated by other contracts.

Below is the gas cost table for precompiled contracts in Kaia. `Input` is a byte array input of a precompiled contract.

| Address | Precompiled contracts | Gas Cost                                                                                                                            |
|:--------|:----------------------|:------------------------------------------------------------------------------------------------------------------------------------|
| 0x01    | ecrecover             | 3,000                                                                                                                               |
| 0x02    | sha256hash            | numOfWords(input) * 12 + 60                                                                                                         |
| 0x03    | ripemd160hash         | numOfWords(input) * 120 + 600                                                                                                       |
| 0x04    | dataCopy              | numOfWords(input) * 3 + 15                                                                                                          | 
| 0x05    | bigModExp             | see the code [here](https://github.com/kaiachain/kaia/blob/75c149a464998eb946311f3a290d4b1ea339eaba/blockchain/vm/contracts.go#L340) |
| 0x06    | bn256Add              | 150                                                                                                                                 | 
| 0x07    | bn256ScalarMul        | 6,000                                                                                                                               |
| 0x08    | bn256Pairing          | numOfPairings(input) * 34,000 + 45,000                                                                                              |
| 0x09    | blake2f               | bigEndian(getRounds(input[0:4]))                                                                                                    |
| 0x0A    | kzg                   | 50,000                                                                                                                              |
| 0x3FD   | vmLog                 | len(input) * 20 + 100                                                                                                               |
| 0x3FE   | feePayer              | 300                                                                                                                                 |
| 0x3FF   | validateSender        | numOfSigs(input) * 5,000                                                                                                            |


## Gas calculation logic for contract execution <a id="gas-calculation-logic-for-contract-execution"></a>

The gas cost of one transaction is calculated through the methods described below. First, gas is added according to the transaction type and input. Then, if the contract is executed, opcodes are executed one by one until the execution ends or `STOP` operation appears. In the process, the cost is charged according to the `constantGas` defined for each opcode and the additionally defined gas calculation method.

Here, I will briefly explain the gas calculation logic during contract execution using the fee schedule variables defined above. As this explanation assumes a general situation, the unusual situations such as revert appears is not considered.

* add `constantGas` defined in each opcode to gas
    * e.g. if an opcode is `MUL`, add `G_low` to gas
    * e.g. if an opcode is `CREATE2`, add `G_create` to gas
* add the gas which is calculated through additionally defined gas calculation method
    * For `LOG'N'`, where N is [0,1,2,3,4], add `G_log + memoryGasCost * g_logdata + N x G_logtopic` to gas
    * For `EXP`, add `G_exp + byteSize(stack.back(1)) x G_expbyte` to gas
    * For `CALLDATACOPY` or `CODECOPY` or `RETURNDATACOPY`, add `wordSize(stack.back(2)) x G_copy` to gas
    * For `EXTCODECOPY`,
        * add `wordSize(stack.back(3)) x G_copy` to gas
        * [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost - G_warmStorageReadCost` to gas
    * For `EXTCODESIZE` or `EXTCODEHASH` or `BALANCE`,
        * [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost - G_warmStorageReadCost` to gas
    * For `SHA3`, add `G_sha3 + wordSize(stack.back(1)) x G_sha3word` to gas
    * For `RETURN`, `REVERT`, `MLoad`, `MStore8`, `MStore`, add `memoryGasCost` to gas
    * For `CREATE`, add `memoryGasCost + size(contract.code) x G_codedeposit + wordsize(initcode) x G_InitCodeWord` to gas
    * For `CREATE2`, add `memoryGasCost + size(data) x G_sha3word + size(contract.code) x G_codedeposit + wordsize(initcode) x G_InitCodeWord` to gas
    * For `SSTORE`,
        * [**_eip2929_**]  If a slot(contractAddr, slot) is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
        * If it just reads the slot (no-op), add `G_warmStorageReadCost` to gas
        * If it creates a new slot, add `G_sset` to gas
        * If it deletes the slot, add `G_sreset-G_coldSloadCost` to gas and add `R_sclear` to refund
        * If it recreates the slot once exists before, add `G_warmStorageReadCost` to gas and subtract `R_sclear` from refund
        * If it deletes the slot once exists before, add `R_sclear` to refund
        * If it resets to the original inexistent slot, add `G_warmStorageReadCost` to gas and add `G_sset - G_warmStorageReadCost` to refund
        * IF it resets to the original existing slot, add `G_warmStorageReadCost` to gas and add `G_sreset - G_coldSloadCost - G_warmStorageReadCost` to refund
    * For `SLOAD`,
        * [**_eip2929_**] If a slot(contractAddr, slot) is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
        * [**_eip2929_**] If a slot(contractAddr, slot) is in AccessList, add `G_warmStorageReadCost` to gas
    * For `CALL`, `CALLCODE`, `DELEGATECALL`, `STATICCALL`,
        * [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
        * if it is `CALL` and `CALLCODE` and if it transfers value, add `G_callvalue` to gas
        * if it is `CALL` and if it transfers value and if it is a new account, add `G_newaccount` to gas
        * if the callee contract is precompiled contracts, calculate precompiled contract gas cost and add it to gas
        * add `memoryGasCost + availableGas - availableGas/64, where availableGas = contract.Gas - gas` to gas
    * For `SELFDESTRUCT`,
        * [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
        * if it transfers value and if is a new account, add `G_newaccount` to gas

## Hardfork changes

| Hardfork     | New Items                                                                                                                                                        | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|--------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cancun EVM   | BLOBBASEFEE (0x49) opcode<br/>BLOBHASH (0x50) opcode<br/>TSTORE (0x5C) opcode<br/>TLOAD (0x5D) opcode<br/>MCOPY(0x5E) opcode<br/>kzg (0x0A) precompiled contract | accessList is fully supported, the storage <br/>access which are added to accessList <br/>put through tx args are became warm                                                                                                                                                                                                                                                                                                                                                                                               |
| Shanghai EVM | PUSH0 (0x5F) opcode                                                                                                                                              | warm coinbase so the gas cost accessing <br/>coinbase is always warm<br/><br/>started to add 2 gas per word of the initcode <br/>at `Create`, `Create2` opcodes                                                                                                                                                                                                                                                                                                                                                             |
| Kore         |                                                                                                                                                                  | reduction in refunds<br/>- removes refund for SELFDESTRUCT (0xFF), SSTORE (0x55) <br/>- capped the refund to gasUsed/5 (it was gasUsed/2)<br/> <br/>increase gas cost for state access opcodes <br/>- accessList is introduced here but it's not yet supported.                                                                                                                                                                                                                                                             |
| London EVM   | BASEFEE (0x48) opcode                                                                                                                                            | modExp (0x05) precompiled contract <br/>use new gas calculation logic. <br/>Become more accurate.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Istanbul EVM | CHAINID (0x46) opcode <br/> SELFBALANCE (0x47) opcode<br/>blake2f (0x09) precompiled contract                                                                    | reduce the gas cost of BN256 precomiled contracts<br/>- Bn256Add (0x06):500->150<br/>- Bn256ScalarMul (0x07): 40,000->6,000<br/>- BN256Pairing (0x08): <br/> -- BaseGas: 100,000->45,000 <br/> -- PerPointGas: 80,000->34,000<br/> <br/>new gas calculation logic of SSTORE (0x55). <br/>- introduced cold storage. <br/>- gas cost for the first access is increased. <br/> <br/>increase the gas cost of heavy storage access<br/>- SLOAD(0x54): 200->800<br/>- BALANCE(0x31): 400->700<br/>- EXTCODEHASH(0x3F): 400->700 |
