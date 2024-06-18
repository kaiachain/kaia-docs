# Configuration

## gasPriceAt <a id="gaspriceat"></a>

```javascript
caver.kaia.gasPriceAt([defaultBlock] [, callback])
```

Returns the unit price of gas in kei that was effective at the given block height.

**Parameters**

| Name         | Type               | Description                                                                                                                                                                                               |
| ------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number \\| String | (optional) If you don't pass this parameter, the default block set by [caver.kaia.defaultBlock](./block.md#defaultblock) will be used. |
| callback     | Function           | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                             |

**Return Value**

`Promise` returns `String` - A numeric string of the gas price in kei.

**Example**

```javascript
> caver.kaia.gasPriceAt().then(console.log);
0x5d21dba00

> caver.kaia.gasPriceAt('latest').then(console.log);
0x5d21dba00
```

## getChainId <a id="getchainid"></a>

```javascript
caver.kaia.getChainId([callback])
```

Returns the chain ID of the chain.

**Parameters**

| Name     | Type     | Description                                                                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Number` - Integer of the chain ID of the chain.

**Example**

```javascript
> caver.kaia.getChainId().then(console.log);
1001
```

## getGasPrice <a id="getgasprice"></a>

```javascript
caver.kaia.getGasPrice([callback])
```

Returns the unit price defined in the Kaia network.

**Parameters**

| Name     | Type     | Description                                                                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - Number string of the current unit price in kei.

**Example**

```javascript
> caver.kaia.getGasPrice().then(console.log);
"25000000000"
```

## getNodeInfo <a id="getnodeinfo"></a>

```javascript
caver.kaia.getNodeInfo([callback])
```

Returns the current client version of a Kaia node.

**Parameters**

| Name     | Type     | Description                                                                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - The current client version of a Kaia node.

**Example**

```javascript
> caver.kaia.getNodeInfo().then(console.log);
Kaia/v0.10.1+fc5c37064e/linux-amd64/go1.11.2
```

## getProtocolVersion <a id="getprotocolversion"></a>

```javascript
caver.kaia.getProtocolVersion([callback])
```

Returns the Kaia protocol version of the node.
The current version (as of v1.9.0) of Mainnet/Kairos is `istanbul/65`.

**Parameters**

| Name     | Type     | Description                                                                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - The Kaia protocol version of the node.

**Example**

```javascript
> caver.kaia.getProtocolVersion().then(console.log);
0x40
```

## isSenderTxHashIndexingEnabled <a id="issendertxhashindexingenabled"></a>

```javascript
caver.kaia.isSenderTxHashIndexingEnabled([callback])
```

Returns `true` if the node is indexing sender transaction hash to transaction hash mapping information.

**Parameters**

| Name     | Type     | Description                                                                                                                                                                               |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback function. The callback is fired with an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Boolean` - `true` means the node is indexing the sender transaction hash to find the fee-payer-signed transaction. For detailed information, please see [Kaia Platform API - kaia_getTransactionBySenderTxHash](../../../../../json-rpc/klay/get-transaction-by-sender-tx-hash) and [Kaia Transactions - Fee Delegation and SenderTxHash](../../../../../learn/transactions/transactions.md#fee-delegation).

**Example**

```javascript
> caver.kaia.isSenderTxHashIndexingEnabled().then(console.log);
true
```

## isParallelDBWrite <a id="isparalleldbwrite"></a>

```javascript
caver.kaia.isParallelDBWrite([callback])
```

Returns `true` if the node is writing blockchain data in parallel manner. It is enabled by default.

**Parameters**

| Name     | Type     | Description                                                                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Boolean` - `true` means the node is writing blockchain data in a parallel manner. Returns `false` if the node is writing the data in a serial manner.

**Example**

```javascript
> caver.kaia.isParallelDBWrite().then(console.log);
true
```

## rewardbase <a id="rewardbase"></a>

```javascript
caver.kaia.rewardbase([callback])
```

Returns the rewardbase of the current node. Rewardbase is the address of the account where the block reward goes to. Only the Kaia Consensus Nodes (CN) have the rewardbase in their configuration. See [Configuration File](../../../../../misc/operation/configuration.md).

**Parameters**

| Name     | Type     | Description                                                                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - The rewardbase of the current node.

**Example**

```javascript
> caver.kaia.rewardbase().then(console.log);
0xed9d108be2a9a7ea5f180ace80f31b66ea107283
```
