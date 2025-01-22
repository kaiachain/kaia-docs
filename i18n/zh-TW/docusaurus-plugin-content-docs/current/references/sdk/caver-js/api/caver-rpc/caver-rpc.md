# caver.rpc

caver.rpc "是一個提供與 kaia Node 的 rpc 調用相關的功能的軟件包。

## 類別<a id="class"></a>

### RPC<a id="rpc"></a>

```javascript
caver.rpc
```

RPC "是一個包含[Klay]、[Net]和[Governance]的類別。

**屬性**

| 名稱   | 類型     | 描述                                 |
| ---- | ------ | ---------------------------------- |
| klay | [Klay] | [Klay] 提供帶有`klay`名稱空間的JSON-RPC 調用。 |
| net  | [Net]  | [Net] 提供帶有`net`名稱空間的JSON-RPC 調用。   |
| 治理   | \[治理]  | \[治理] 提供帶有`治理`名稱空間的JSON-RPC 調用。    |

## JSON-RPC 調用<a id="json-rpc-calls"></a>

通過 `caver.rpc.klay` 可以與 kaia 節點進行交互。 下面的列表列舉了 `caver-js`目前支持的 API 函數。

### [Account](./klay.md#caver-rpc-klay-accountcreated) <a id="account"></a>

- [accountCreated](./klay.md#caver-rpc-klay-accountcreated)
- [getAccount](./klay.md#caver-rpc-klay-getaccount)
- [getAccountKey](./klay.md#caver-rpc-klay-getaccountkey)
- [encodeAccountKey](./klay.md#caver-rpc-klay-encodeaccountkey)
- [decodeAccountKey](./klay.md#caver-rpc-klay-decodeaccountkey)
- [getBalance](./klay.md#caver-rpc-klay-getbalance)
- [getCode](./klay.md#caver-rpc-klay-getcode)
- [getTransactionCount](./klay.md#caver-rpc-klay-gettransactioncount)
- [isContractAccount](./klay.md#caver-rpc-klay-iscontractaccount)
- [簽名](./klay.md#caver-rpc-klay-sign)
- [getAccounts](./klay.md#caver-rpc-klay-getaccounts)

### [Block](./klay.md#caver-rpc-klay-getblocknumber) <a id="block"></a>

- [getBlockNumber](./klay.md#caver-rpc-klay-getblocknumber)
- [getBlockByNumber](./klay.md#caver-rpc-klay-getblockbynumber)
- [getBlockByHash](./klay.md#caver-rpc-klay-getblockbyhash)
- [getBlockReceipts](./klay.md#caver-rpc-klay-getblockreceipts)
- [getBlockTransactionCountByNumber](./klay.md#caver-rpc-klay-getblocktransactioncountbynumber)
- [getBlockTransactionCountByHash](./klay.md#caver-rpc-klay-getblocktransactionCountbyhash)
- [getBlockWithConsensusInfoByNumber](./klay.md#caver-rpc-klay-getblockwithconsensusinfobynumber)
- [getBlockWithConsensusInfoByHash](./klay.md#caver-rpc-klay-getblockwithconsensusinfobyhash)
- [getCommittee](./klay.md#caver-rpc-klay-getcommittee)
- [getCommitteeSize](./klay.md#caver-rpc-klay-getcommitteesize)
- [getCouncil](./klay.md#caver-rpc-klay-getcouncil)
- [getCouncilSize](./klay.md#caver-rpc-klay-getcouncilsize)
- [getStorageAt](./klay.md#caver-rpc-klay-getstorageat)
- [isSyncing](./klay.md#caver-rpc-klay-issyncing)

### [Transaction](./klay.md#caver-rpc-klay-call) <a id="transaction"></a>

- [call](./klay.md#caver-rpc-klay-call)
- [estimateGas](./klay.md#caver-rpc-klay-estimategas)me
- [estimateComputationCost](./klay.md#caver-rpc-klay-estimatecomputationcost)
- [getTransactionByBlockHashAndIndex](./klay.md#caver-rpc-klay-gettransactionbyblockhashandindex)
- [getTransactionByBlockNumberAndIndex](./klay.md#caver-rpc-klay-gettransactionbyblocknumberandindex)
- [getTransactionByHash](./klay.md#caver-rpc-klay-gettransactionbyhash)
- [getTransactionBySenderTxHash](./klay.md#caver-rpc-klay-gettransactionbysendertxhash)
- [getTransactionReceipt](./klay.md#caver-rpc-klay-gettransactionreceipt)
- [getTransactionReceiptBySenderTxHash](./klay.md#caver-rpc-klay-gettransactionreceiptbysendertxhash)
- [sendRawTransaction](./klay.md#caver-rpc-klay-sendrawtransaction)
- [sendTransaction](./klay.md#caver-rpc-klay-sendtransaction)
- [sendTransactionAsFeePayer](./klay.md#caver-rpc-klay-sendtransactionasfeepayer)
- [signTransaction](./klay.md#caver-rpc-klay-signtransaction)
- [signTransactionAsFeePayer](./klay.md#caver-rpc-klay-signtransactionasfeepayer)
- [getDecodedAnchoringTransactionByHash](./klay.md#caver-rpc-klay-getdecodedanchoringtransactionbyhash)

### [Configuration](./klay.md#caver-rpc-klay-getclientversion) <a id="configuration"></a>

- [getChainId](./klay.md#caver-rpc-klay-getchainid)
- [getClientVersion](./klay.md#caver-rpc-klay-getclientversion)
- [getGasPrice](./klay.md#caver-rpc-klay-getgasprice)
- [getGasPriceAt](./klay.md#caver-rpc-klay-getgaspriceat)
- [isParallelDBWrite](./klay.md#caver-rpc-klay-isparalleldbwrite)
- [isSenderTxHashIndexingEnabled](./klay.md#caver-rpc-klay-issendertxhashindexingenabled)
- [getProtocolVersion](./klay.md#caver-rpc-klay-getprotocolversion)
- [getRewardbase](./klay.md#caver-rpc-klay-getrewardbase)

### [Filter](./klay.md#caver-rpc-klay-getfilterchanges) <a id="filter"></a>

- [getFilterChanges](./klay.md#caver-rpc-klay-getfilterchanges)
- [getFilterLogs](./klay.md#caver-rpc-klay-getfilterlogs)
- [getLogs](./klay.md#caver-rpc-klay-getlogs)
- [newBlockFilter](./klay.md#caver-rpc-klay-newblockfilter)
- [newFilter](./klay.md#caver-rpc-klay-newfilter)
- [newPendingTransactionFilter](./klay.md#caver-rpc-klay-newpendingtransactionfilter)
- [uninstallFilter](./klay.md#caver-rpc-klay-uninstallfilter)

### [網絡](./net.md)<a id="network"></a>

- [getNetworkId](./net.md#caver-rpc-net-getnetworkid)
- [isListening](./net.md#caver-rpc-net-islistening)
- [getPeerCount](./net.md#caver-rpc-net-getpeercount)
- [getPeerCountByType](./net.md#caver-rpc-net-getpeercountbytype)

### [Miscellaneous](./klay.md#caver-rpc-klay-sha3) <a id="miscellaneous"></a>

- [sha3](./klay.md#caver-rpc-klay-sha3)

[Klay]: klay.md
[Net]: net.md
[Governance]: governance.md
