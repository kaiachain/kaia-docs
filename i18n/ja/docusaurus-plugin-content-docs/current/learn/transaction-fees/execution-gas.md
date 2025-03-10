# 実行ガス

ガスは`IntrinsicGas`と`ExecutionGas`の和である。 ここでは、`ExecutionGas`がどのように計算されるかに焦点を当てる。

:::note

実行ガス関連のハードフォーク変更は、このページの一番下にあります。 [ハードフォーク変更](#hardfork-changes)へ。

:::

## 概要<a id="overview"></a>

執行ガスは、3つの異なる状況下で契約を執行する際に発生する。 時には、いくつかの方針が省略されることもある。

- 最初の、そして最も一般的なものは`constantGas`である。 これは演算に不可欠な料金だ。
- これは、`CREATE`、`CALL`、`CALLCODE`の支払いの一部となる。
- 最後に、メモリ使用量の増加によりガス代がかかる場合がある。

Over an account's execution, the total fee payable for memory-usage payable is proportional to the smallest multiple of 32 bytes that are required to include all memory indices (whether for read or write) in the range. この料金はジャスト・イン・タイム方式で支払われる。そのため、以前にインデックス付けされたメモリよりも少なくとも32バイト大きいメモリ領域を参照すると、追加のメモリ使用料が発生する。 この手数料により、アドレスが32ビットの境界を超えることはまずない。 とはいえ、実装はこのような事態に対処できなければならない。

保管料には微妙なニュアンスがある。 ストレージの使用を最小化するインセンティブを与えるために、ストレージからエ ントリをクリアする操作の実行料金は、免除されるだけでなく、適格な払い戻しを引き出す。

## オプコード・ガス・スケジュール<a id="opcode-gas-schedule"></a>

料金表`G`は、トランザクションが負担する可能性のある抽象的な操作の数々 の相対的なコストに対応する37個のスカラー値のタプルである。 また、`CALL_*` オペコードによって呼び出されるプリコンパイルされたコントラクトのガスを計算するためのガス項目もある。

### オペコードの `constantGas` を表すスカラー値。

| 名称                      |    価値 |                     コードネーム | オプコード                                                                                                                                                                                                                                                                                                 |
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

### メモリとログの使用量に基づいてガスを計算するために使用されるスカラー値

| Name         | Value | Name in Code | Description                    |
| :----------- | ----: | -----------: | :----------------------------- |
| `G_memory`   |     3 |    MemoryGas | メモリを拡張する際、1ワード増えるごとに支払うガス量     |
| `G_copy`     |     3 |        コピーガス | COPY\`操作の一部支払い、コピーされた単語数倍、切り上げ |
| `G_log`      |   375 |       LogGas | LOG\`操作の一部支払い                  |
| `G_logdata`  |     8 |   LogDataGas | LOG\`操作のデータの各バイトに対して支払われるガス量。  |
| `G_logtopic` |   375 |  LogTopicGas | LOG\`操作のトピックごとに支払われるガス量        |

### 特定のオペコードのガスを計算するために使用されるスカラー値

| Name              | Value | Name in Code                      | Description                                                                                |
| :---------------- | ----: | --------------------------------- | :----------------------------------------------------------------------------------------- |
| `G_sset`          | 20000 | SstoreSetGas                      | 貯蔵設定時に貯蔵値が設定された場合に支払われるガス量                                                                 |
| `G_sreset`        |  5000 | SstoreResetGas                    | 貯蔵量がゼロのまま、またはゼロに設定された場合に支払われるガス量                                                           |
| `G_coldSloadCost` |  2100 | ColdSloadCostEIP2929              | 貯蔵量がaccessListにない場合の支払ガス量                                                                  |
| `R_sclear`        | 15000 | SstoreClearsScheduleRefundEIP3529 | `G_sreset` - `G_coldSloadCost` + `TxAccessListStorageKeyGas (1900)`                        |
| `G_exp`           |    10 | ExpGas                            | Partial payment                                                                            |
| `G_expbyte`       |    50 | ExpByte                           | ceil(log_256(指数))\`を掛けた場合の一部支払い |
| `G_selfdestruct`  |  5000 | SelfdestructGas                   | SELFDESTRUCT\`操作のために支払われたガス量                                                               |
| `G_callvalue`     |  9000 | CallValueTransferGas              | 非ゼロ・バリュー・トランスファーに支払われたガス量                                                                  |
| `G_callstipend`   |  2300 | CallStipend                       | ゼロでない値での移籍の場合、通話開始時に無料ガスが与えられる。                                                            |
| `G_newaccount`    | 25000 | CallNewAccountGas                 | アカウント作成時に支払ったガス料金。 また、`SELFDESTRUCT`操作を伴う`CreateBySelfdestructGas`としても定義される。               |
| `G_codedeposit`   |   200 | CreateDataGas                     | コードの状態への配置に成功した契約を作成するために1バイトあたりに支払われるガスの量                                                 |
| `G_sha3word`      |     6 | Sha3WordGas                       | 入力データが`SHA3`の場合、各単語の支払ガス量。                                                                 |
| `G_InitCodeWord`  |     2 | InitCodeWordGas                   | CREATE`,`CREATE2\`のinitcodeの各単語に対して支払われるガス量。                                               |

## 契約ガス料金表<a id="precompiled-contracts-gas-cost-table"></a>

プリコンパイルされたコントラクトは、通常、複雑な暗号計算を行い、他のコントラクトによって開始される特別な種類のコントラクトである。

以下は、カイアのコンパイル済み契約のガス料金表です。 `Input`はコンパイル済みのコントラクトのバイト配列の入力である。

| Address | Precompiled contracts | Gas Cost                                                                                                                                                                                                               |
| :------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x01    | ecrecover             | 3,000                                                                                                                                                                                                                  |
| 0x02    | sha256hash            | numOfWords(input) \* 12 + 60                                                                                                                                                                        |
| 0x03    | ripemd160hash         | numOfWords(input) \* 120 + 600                                                                                                                                                                      |
| 0x04    | dataCopy              | numOfWords(input) \* 3 + 15                                                                                                                                                                         |
| 0x05    | bigModExp             | コードはこちら](https://github.com/kaiachain/kaia/blob/75c149a464998eb946311f3a290d4b1ea339eaba/blockchain/vm/contracts.go#L340) |
| 0x06    | bn256Add              | 150                                                                                                                                                                                                                    |
| 0x07    | bn256ScalarMul        | 6,000                                                                                                                                                                                                                  |
| 0x08    | bn256Pairing          | numOfPairings(input) \* 34,000 + 45,000                                                                                                                                                             |
| 0x09    | blake2f               | bigEndian(getRounds(input[0:4]))                                                                             |
| 0x0A    | kzg                   | 50,000                                                                                                                                                                                                                 |
| 0x3FD   | vmLog                 | len(input) \* 20 + 100                                                                                                                                                                              |
| 0x3FE   | feePayer              | 300                                                                                                                                                                                                                    |
| 0x3FF   | validateSender        | numOfSigs(input) \* 5,000                                                                                                                                                                           |

## 契約締結のためのガス計算ロジック<a id="gas-calculation-logic-for-contract-execution"></a>

1回の取引にかかるガス料金は、以下の方法で計算される。 まず、取引タイプと投入量に応じてガスが追加される。 そして、コントラクトが実行されると、実行が終了するか`STOP`操作が現れるまで、オペコードが1つずつ実行される。 その際、各オペコードに定義された`constantGas`と、追加で定義されたガス計算方法に従ってコストが課金される。

ここでは、上記で定義した料金表変数を用いて、契約締結時のガス計算ロジックを簡単に説明する。 この説明では一般的な状況を想定しているため、復帰戦のような特殊な状況は考慮されていない。

- 各オペコードで定義された`constantGas`をgasに追加する。
    - 例えば、オペコードが `MUL` なら、`G_low` を gas に加える。
    - 例えば、オペコードが`CREATE2`の場合、`G_create`をgasに追加する。
- 追加で定義されたガス計算方法で計算されたガスを追加する。
    - `LOG'N'`（Nは[0,1,2,3,4]）については、`G_log + memoryGasCost * g_logdata + N x G_logtopic`をガスに加える。
    - `EXP`の場合は、`G_exp + byteSize(stack.back(1)) x G_expbyte`をgasに加える。
    - `CALLDATACOPY` または `CODECOPY` または `RETURNDATACOPY` の場合は、`wordSize(stack.back(2)) x G_copy` を gas に追加する。
    - EXTCODECOPY\`の場合、
        - `wordSize(stack.back(3))×G_copy`をgasに追加する。
        - [**_eip2929_**] アドレスが AccessList にない場合、accessList に追加し、`G_coldSloadCost - G_warmStorageReadCost` を gas に追加する。
    - EXTCODESIZE`または`EXTCODEHASH`または`BALANCE\` の場合、
        - [**_eip2929_**] アドレスが AccessList にない場合、accessList に追加し、`G_coldSloadCost - G_warmStorageReadCost` を gas に追加する。
    - `SHA3`の場合、`G_sha3 + wordSize(stack.back(1)) x G_sha3word`をgasに加える。
    - `RETURN`、`REVERT`、`MLoad`、`MStore8`、`MStore` では、ガスに `memoryGasCost` を追加する。
    - `CREATE`では、`memoryGasCost + size(contract.code) x G_codedeposit + wordsize(initcode) x G_InitCodeWord`をガスに追加する。
    - `CREATE2`では、`memoryGasCost + size(data) x G_sha3word + size(contract.code) x G_codedeposit + wordsize(initcode) x G_InitCodeWord`をgasに追加する。
    - SSTORE\`の場合、
        - [**_eip2929_**] スロット(contractAddr, slot)がAccessListにない場合、それをaccessListに追加し、`G_coldSloadCost`をgasに追加する。
        - 単にスロットを読み込むだけなら(no-op)、gasに`G_warmStorageReadCost`を追加する。
        - 新しいスロットを作成する場合は、`G_sset` を gas
        - もしスロットが削除されたら、`G_sreset-G_coldSloadCost`をgasに追加し、`R_sclear`を払い戻しに追加する。
        - 以前存在したスロットを再作成する場合、gasに `G_warmStorageReadCost` を加算し、払い戻しから `R_sclear` を減算する。
        - もし、以前存在したスロットを削除する場合は、払い戻しに `R_sclear` を追加します。
        - 元の存在しないスロットにリセットされた場合、`G_warmStorageReadCost`をgasに追加し、`G_set - G_warmStorageReadCost`を返金に追加する。
        - 元の既存のスロットにリセットされた場合、ガスに `G_warmStorageReadCost` を追加し、払い戻しに `G_sreset - G_coldSloadCost - G_warmStorageReadCost` を追加する。
    - SLOAD\`の場合、
        - [**_eip2929_**] スロット(contractAddr, slot)がAccessListにない場合、それをaccessListに追加し、`G_coldSloadCost`をgasに追加する。
        - [**_eip2929_**] スロット(contractAddr, slot)がAccessListにある場合、`G_warmStorageReadCost`をgasに追加します。
    - CALL`、`CALLCODE`、`DELEGATECALL`、`STATICCALL\`の場合、
        - [**_eip2929_**] アドレスがAccessListに含まれていない場合、それをaccessListに追加し、`G_coldSloadCost`をgasに追加する。
        - それが `CALL` と `CALLCODE` で、値を転送する場合は `G_callvalue` を gas に追加する。
        - もしそれが `CALL` で、もしそれが値を移し、もしそれが新しいアカウントであれば、 `G_newaccount` を gas に追加する。
        - 着信側契約がプリコンパイル契約の場合、プリコンパイル契約のガス料金を計算し、ガス料金に加算する。
        - メモリー・ガス・コスト + 利用可能なガス - 利用可能なガス/64、ここで利用可能なガス =availableGas = contract.Gas - gas\` to gas
    - SELFDESTRUCT\`の場合、
        - [**_eip2929_**] アドレスがAccessListに含まれていない場合、それをaccessListに追加し、`G_coldSloadCost`をgasに追加する。
        - 値を移し、新しいアカウントであれば、`G_newaccount`をgasに追加する。

## Hardfork changes

| Hardfork     | New Items                                                                                                                                                                                                                                                                          | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cancun EVM   | BLOBBASEFEE (0x49) opcode<br/>BLOBHASH (0x50) opcode<br/>TSTORE (0x5C) opcode<br/>TLOAD (0x5D) opcode<br/>MCOPY(0x5E) opcode<br/>kzg (0x0A) precompiled contract | accessListが完全にサポートされ、txアーギュメントを介して置かれたaccessList<br/>に追加されたストレージ<br/>アクセスが暖かくなった。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Shanghai EVM | PUSH0 (0x5F) opcode                                                                                                                                                                                                                                             | <br/>コインベースは常に暖かい<br/><br/>`Create`, `Create2` オペコードで<br/>initcode の1ワードにつき2ガスを追加するようになった。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Kore         |                                                                                                                                                                                                                                                                                    | reduction in refunds<br/>- removes refund for SELFDESTRUCT (0xFF), SSTORE (0x55) <br/>- capped the refund to gasUsed/5 (it was gasUsed/2)<br/> <br/>increase gas cost for state access opcodes <br/>- accessList is introduced here but it's not yet supported.                                                                                                                                                                                                                                                                     |
| London EVM   | BASEFEE (0x48) opcode                                                                                                                                                                                                                                           | modExp (0x05) precompiled contract <br/>use new gas calculation logic. <br/>Become more accurate.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Istanbul EVM | CHAINID (0x46) オペコード<br/> SELFBALANCE (0x47) オペコード<br/>blake2f (0x09) コンパイル済み契約書                                                                                                                                          | BN256プリコンパイル契約のガスコストを削減<br/>- Bn256Add (0x06):500->150<br/>- Bn256ScalarMul (0x07)：40,000->6,000<br/>- BN256Pairing (0x08)： <br/> -- BaseGas: 100,000->45,000<br/> -- PerPointGas: 80,000->34,000<br/> <br/>SSTORE (0x55)の新しいガス計算ロジック。 <br/>- はコールドストレージを導入した。 <br/>- 最初のアクセスにかかるガス代が増える。 <br/> <br/><br/>- SLOAD(0x54)：重いストレージへのアクセスのガスコストを増加：200->800 - BALANCE(0x31)：400->700 - EXTCODEHASH(0x3F)：400->700<br/><br/> |
