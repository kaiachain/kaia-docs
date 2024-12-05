# eth

The namespace `eth` provides functions related to accounts, blocks, transactions,
configurations of networks or nodes, filters, and so on.

Klaytn now supports the namespace `eth` of [Ethereum's JSON-RPC API](https://eth.wiki/json-rpc/API). Please note that
some return values have been adjusted to match the Ethereum's API response body.

And due to the fundamental design differences between Klaytn and Ethereum,
Klaytn's data structure (Transaction, Block, and TransactionReceipt) cannot be fully supported via `eth` namespace APIs.

Please check the [Differences Overview from Ethereum](#differences_overview_from_ethereum) in this document.

**NOTE**: `eth` namespace APIs are supported from Klaytn v1.8.0.

The list below enumerates the API functions. All `eth` namespace APIs are supported on Klaytn.

### [Account](./account.md) <a id="account"></a>

- [eth_accounts](./account.md#eth_accounts)
- [eth_getBalance](./account.md#eth_getbalance)
- [eth_getCode](./account.md#eth_getcode)
- [eth_getTransactionCount](./account.md#eth_gettransactioncount)
- [eth_sign](./account.md#eth_sign)

### [Block](./block.md) <a id="block"></a>

- [eth_blockNumber](./block.md#eth_blocknumber)
- [eth_getHeaderByNumber](./block.md#eth_getheaderbynumber)
- [eth_getHeaderByHash](./block.md#eth_getheaderbyhash)
- [eth_getBlockByNumber](./block.md#eth_getblockbynumber)
- [eth_getBlockByHash](./block.md#eth_getblockbyhash)
- [eth_getUncleByBlockHashAndIndex](./block.md#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](./block.md#eth_getunclebyblocknumberandindex)
- [eth_getBlockTransactionCountByNumber](./block.md#eth_getblocktransactioncountbynumber)
- [eth_getBlockTransactionCountByHash](./block.md#eth_getblocktransactioncountbyhash)
- [eth_getUncleCountByBlockNumber](./block.md#eth_getunclecountbyblocknumber)
- [eth_getUncleCountByBlockHash](./block.md#eth_getunclecountbyblockhash)
- [eth_getStorageAt](./block.md#eth_getstorageat)
- [eth_mining](./block.md#eth_mining)
- [eth_syncing](./block.md#eth_syncing)

### [Transaction](./transaction.md) <a id="transaction"></a>

- [eth_call](./transaction.md#eth_call)
- [eth_estimateGas](./transaction.md#eth_estimategas)
- [eth_getTransactionByBlockHashAndIndex](./transaction.md#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](./transaction.md#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionByHash](./transaction.md#eth_gettransactionbyhash)
- [eth_getTransactionReceipt](./transaction.md#eth_gettransactionreceipt)
- [eth_sendRawTransaction](./transaction.md#eth_sendrawtransaction)
- [eth_sendTransaction](./transaction.md#eth_sendtransaction)
- [eth_signTransaction](./transaction.md#eth_signtransaction)
- [eth_fillTransaction](./transaction.md#eth_filltransaction)
- [eth_pendingTransactions](./transaction.md#eth_pendingtransactions)
- [eth_resend](./transaction.md#eth_resend)

### [Configuration](./config.md) <a id="configuration"></a>

- [eth_coinbase](./config.md#eth_coinbase)
- [eth_etherbase](./config.md#eth_etherbase)
- [eth_chainId](./config.md#eth_chainid)
- [eth_gasPrice](./config.md#eth_gasprice)

### [Filter](./filter.md) <a id="filter"></a>

- [eth_getFilterChanges](./filter.md#eth_getfilterchanges)
- [eth_getFilterLogs](./filter.md#eth_getfilterlogs)
- [eth_getLogs](./filter.md#eth_getlogs)
- [eth_newBlockFilter](./filter.md#eth_newblockfilter)
- [eth_newFilter](./filter.md#eth_newfilter)
- [eth_newPendingTransactionFilter](./filter.md#eth_newpendingtransactionfilter)
- [eth_subscribe](./filter.md#eth_subscribe)
- [eth_uninstallFilter](./filter.md#eth_uninstallfilter)
- [eth_unsubscribe](./filter.md#eth_unsubscribe)

### [Gas](./gas.md) <a id="gas"></a>

- [eth_feeHistory](./gas.md#eth_feehistory)
- [eth_maxPriorityFeePerGas](./gas.md#eth_maxpriorityfeepergas)

### [Miscellaneous](./misc.md) <a id="miscellaneous"></a>

- [eth_hashrate](./misc.md#eth_hashrate)
- [eth_getWork](./misc.md#eth_getwork)
- [eth_submitWork](./misc.md#eth_submitwork)
- [eth_submitHashrate](./misc.md#eth_submithashrate)

## Differences Overview from Ethereum <a id="differences_overview_from_ethereum"></a>

> Please check the [Caution](./caution.md) section which describes the differences between Klaytn and Ethereum when serving eth namespace APIs in more detail.

### Block <a id="block"></a>

Related APIs: [eth_getHeaderByNumber](./block.md#eth_getHeaderByNumber), [eth_getHeaderByHash](./block.md#eth_getHeaderByHash), [eth_getBlockByHash](./block.md#eth_getBlockByHash), [eth_getBlockByNumber](./block.md#eth_getBlockByNumber), [eth_getUncleByBlockHashAndIndex](./block.md#eth_getUncleByBlockHashAndIndex), [eth_getUncleByBlockNumberAndIndex](./block.md#eth_getUncleByBlockNumberAndIndex).

| Field           | Description                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas   | This field always has the value `0x0` because Klaytn does not have a baseFeePerGas scheme.                                                                                                                                                                                                                                                                                                                             |
| difficulty      | This field corresponds to `blockScore` in the Klaytn header, which is fixed to `0x1`. This is because Klaytn's consensus mechanism is not based on PoW, indicating the technical concept of block difficulty is not applicable to Klaytn core.                                                                                                                                                                         |
| extraData       | This field always has the value `0x` indicating the empty value. Owing to the fact that Klaytn's `extraData` contains consensus data such as validators addresses, validators signatures, and proposer signature, it is not applicable to `eth` namespace API.                                                                                                                                                         |
| gasLimit        | This field always has the value `0xe8d4a50fff`(=`999999999999` in decimal), which is an arbitrary figure since Klaytn has no GasLimit. At the time of writing, this figure is 30 times higher than the [block gas limit of Ethereum](https://ethereum.org/en/developers/docs/gas/#block-size). Please refer to [Computation Cost](../../../learn/computation/computation-cost.md) for more details. |
| miner           | This field returns the block proposer's address, because Klaytn's [consensus mechanism](../../../learn/consensus-mechanism.md) is [PBFT](../../../learn/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance), which has a block proposer instead of miners.                                                                                                                                                |
| mixHash         | This field always has zeroHash (`0x00...`) because Klaytn's consensus mechanism is not based on PoW.                                                                                                                                                                                                                                                                                                |
| nonce           | This field always has zeroNonce (`0x00...`) because Klaytn's consensus mechanism is not based on PoW.                                                                                                                                                                                                                                                                                               |
| sha3Uncles      | This field always has `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`, which is the Keccak256 hash of the RLP-encoded bytes of the list containing empty block header because there are no uncles blocks on Klaytn.                                                                                                                                                                               |
| totalDifficulty | The total difficulty of the chain until the querying block.                                                                                                                                                                                                                                                                                                                                                            |
| uncles          | This field always has the value `[]` because there is no technical concept of uncles block in Klaytn core.                                                                                                                                                                                                                                                                                                             |

Fields not covered here will stick to the block fields of Ethereum.

### Transaction <a id="transaction"></a>

Related APIs: [eth_getTransactionByHash](./transaction.md#eth_getTransactionByHash), [eth_getTransactionByBlockHashAndIndex](./transaction.md#eth_getTransactionByBlockHashAndIndex), [eth_getTransactionByBlockNumberAndIndex](./transaction.md#eth_getTransactionByBlockNumberAndIndex), [eth_pendingTransactions](./transaction.md#eth_pendingTransactions).

> Due to the fundamental design differences between Klaytn and Ethereum,
> Klaytn transactions cannot be fully supported via `eth` namespace APIs.

| Field    | Description                                                                                                                                                                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gasPrice | Also known as [Unit Price](../../../learn/transaction-fees/transaction-fees.md#gas-price-overview) in Klaytn's context, this value is determined in the system via the governance processes.                                                                               |
| type     | In Klaytn, `type` returns the transaction type in string (e.g. `"LegacyTransaction"`), but it has been converted to hexadecimal (e.g. `0x0`) to match Ethereum. Transaction types that are only valid in Klaytn always return `0x0`. |

Klaytn transactions can have more than one signature because Klaytn supports MultiSig (Ethereum transactions only have one signature field (= v, r, s)) even on protocol-level.
In that context, fields related to signature (v, r, s) will match `tx.signatures[0].V`, `tx.signatures[0].R`, and `tx.signatures[0].S`.

Fields not covered here will stick to the transaction fields of Ethereum.

### Transaction Receipt <a id="transaction_receipt"></a>

Related APIs: [eth_getTransactionReceipt](./transaction.md#eth_getTransactionReceipt).

> Due to the fundamental design differences existing between Klaytn and Ethereum,
> Klaytn transaction receipt cannot be fully supported when served via Ethereum namespace APIs.

| Field             | Description                                                                                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| effectiveGasPrice | Since Klaytn uses a fixed gas price policy, the gasPrice value is returned. gasPrice(also called [Unit Price](../../../learn/transaction-fees/transaction-fees.md#gasprice-overview)) is set in the system by the governance. |
| transactionIndex  | Almost same with Ethereum but unlike Ethereum, Klaytn returns integer as it is when its pending.                                                                                                                                                 |

Fields not covered here will stick to Ethereum's suggested fields of transaction_receipt.
