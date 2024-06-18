# caver.rpc

`caver.rpc` is a package that provides functionality related to rpc call with Kaia Node.

## Class <a id="class"></a>

### RPC <a id="rpc"></a>

```javascript
caver.rpc
```

`RPC` is a class that contains [Kaia], [Net] and [Governance] inside.

**Properties**

| Name       | Type         | Description                                                                |
| ---------- | ------------ | -------------------------------------------------------------------------- |
| kaia       | [Kaia]       | The [Kaia] providing JSON-RPC call with  the`kaia` name space.             |
| net        | [Net]        | The [Net] providing JSON-RPC call with the `net` name space.               |
| governance | [Governance] | The [Governance] providing JSON-RPC call with the `governance` name space. |

## JSON-RPC calls <a id="json-rpc-calls"></a>

The `caver.rpc.kaia` allows you to interact with the Kaia nodes. The list below enumerates the API functions that are currently supported in `caver-js`.

### [Account](./kaia.md#caver-rpc-kaia-accountcreated) <a id="account"></a>

- [accountCreated](./kaia.md#caver-rpc-kaia-accountcreated)
- [getAccount](./kaia.md#caver-rpc-kaia-getaccount)
- [getAccountKey](./kaia.md#caver-rpc-kaia-getaccountkey)
- [encodeAccountKey](./kaia.md#caver-rpc-kaia-encodeaccountkey)
- [decodeAccountKey](./kaia.md#caver-rpc-kaia-decodeaccountkey)
- [getBalance](./kaia.md#caver-rpc-kaia-getbalance)
- [getCode](./kaia.md#caver-rpc-kaia-getcode)
- [getTransactionCount](./kaia.md#caver-rpc-kaia-gettransactioncount)
- [isContractAccount](./kaia.md#caver-rpc-kaia-iscontractaccount)
- [sign](./kaia.md#caver-rpc-kaia-sign)
- [getAccounts](./kaia.md#caver-rpc-kaia-getaccounts)

### [Block](./kaia.md#caver-rpc-kaia-getblocknumber) <a id="block"></a>

- [getBlockNumber](./kaia.md#caver-rpc-kaia-getblocknumber)
- [getBlockByNumber](./kaia.md#caver-rpc-kaia-getblockbynumber)
- [getBlockByHash](./kaia.md#caver-rpc-kaia-getblockbyhash)
- [getBlockReceipts](./kaia.md#caver-rpc-kaia-getblockreceipts)
- [getBlockTransactionCountByNumber](./kaia.md#caver-rpc-kaia-getblocktransactioncountbynumber)
- [getBlockTransactionCountByHash](./kaia.md#caver-rpc-kaia-getblocktransactionCountbyhash)
- [getBlockWithConsensusInfoByNumber](./kaia.md#caver-rpc-kaia-getblockwithconsensusinfobynumber)
- [getBlockWithConsensusInfoByHash](./kaia.md#caver-rpc-kaia-getblockwithconsensusinfobyhash)
- [getCommittee](./kaia.md#caver-rpc-kaia-getcommittee)
- [getCommitteeSize](./kaia.md#caver-rpc-kaia-getcommitteesize)
- [getCouncil](./kaia.md#caver-rpc-kaia-getcouncil)
- [getCouncilSize](./kaia.md#caver-rpc-kaia-getcouncilsize)
- [getStorageAt](./kaia.md#caver-rpc-kaia-getstorageat)
- [isSyncing](./kaia.md#caver-rpc-kaia-issyncing)

### [Transaction](./kaia.md#caver-rpc-kaia-call) <a id="transaction"></a>

- [call](./kaia.md#caver-rpc-kaia-call)
- [estimateGas](./kaia.md#caver-rpc-kaia-estimategas)
- [estimateComputationCost](./kaia.md#caver-rpc-kaia-estimatecomputationcost)
- [getTransactionByBlockHashAndIndex](./kaia.md#caver-rpc-kaia-gettransactionbyblockhashandindex)
- [getTransactionByBlockNumberAndIndex](./kaia.md#caver-rpc-kaia-gettransactionbyblocknumberandindex)
- [getTransactionByHash](./kaia.md#caver-rpc-kaia-gettransactionbyhash)
- [getTransactionBySenderTxHash](./kaia.md#caver-rpc-kaia-gettransactionbysendertxhash)
- [getTransactionReceipt](./kaia.md#caver-rpc-kaia-gettransactionreceipt)
- [getTransactionReceiptBySenderTxHash](./kaia.md#caver-rpc-kaia-gettransactionreceiptbysendertxhash)
- [sendRawTransaction](./kaia.md#caver-rpc-kaia-sendrawtransaction)
- [sendTransaction](./kaia.md#caver-rpc-kaia-sendtransaction)
- [sendTransactionAsFeePayer](./kaia.md#caver-rpc-kaia-sendtransactionasfeepayer)
- [signTransaction](./kaia.md#caver-rpc-kaia-signtransaction)
- [signTransactionAsFeePayer](./kaia.md#caver-rpc-kaia-signtransactionasfeepayer)
- [getDecodedAnchoringTransactionByHash](./kaia.md#caver-rpc-kaia-getdecodedanchoringtransactionbyhash)

### [Configuration](./kaia.md#caver-rpc-kaia-getclientversion) <a id="configuration"></a>

- [getChainId](./kaia.md#caver-rpc-kaia-getchainid)
- [getClientVersion](./kaia.md#caver-rpc-kaia-getclientversion)
- [getGasPrice](./kaia.md#caver-rpc-kaia-getgasprice)
- [getGasPriceAt](./kaia.md#caver-rpc-kaia-getgaspriceat)
- [isParallelDBWrite](./kaia.md#caver-rpc-kaia-isparalleldbwrite)
- [isSenderTxHashIndexingEnabled](./kaia.md#caver-rpc-kaia-issendertxhashindexingenabled)
- [getProtocolVersion](./kaia.md#caver-rpc-kaia-getprotocolversion)
- [getRewardbase](./kaia.md#caver-rpc-kaia-getrewardbase)

### [Filter](./kaia.md#caver-rpc-kaia-getfilterchanges) <a id="filter"></a>

- [getFilterChanges](./kaia.md#caver-rpc-kaia-getfilterchanges)
- [getFilterLogs](./kaia.md#caver-rpc-kaia-getfilterlogs)
- [getLogs](./kaia.md#caver-rpc-kaia-getlogs)
- [newBlockFilter](./kaia.md#caver-rpc-kaia-newblockfilter)
- [newFilter](./kaia.md#caver-rpc-kaia-newfilter)
- [newPendingTransactionFilter](./kaia.md#caver-rpc-kaia-newpendingtransactionfilter)
- [uninstallFilter](./kaia.md#caver-rpc-kaia-uninstallfilter)

### [Network](./net.md) <a id="network"></a>

- [getNetworkId](./net.md#caver-rpc-net-getnetworkid)
- [isListening](./net.md#caver-rpc-net-islistening)
- [getPeerCount](./net.md#caver-rpc-net-getpeercount)
- [getPeerCountByType](./net.md#caver-rpc-net-getpeercountbytype)

### [Miscellaneous](./kaia.md#caver-rpc-kaia-sha3) <a id="miscellaneous"></a>

- [sha3](./kaia.md#caver-rpc-kaia-sha3)

[Kaia]: kaia.md
[Net]: net.md
[Governance]: governance.md
