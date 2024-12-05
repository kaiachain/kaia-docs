# Configuration

## klay_chainID <a id="klay_chainid"></a>

Returns the chain ID of the chain.

**Parameters**

None

**Return Value**

| Type     | Description                           |
| -------- | ------------------------------------- |
| QUANTITY | Integer of the chain ID of the chain. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_chainID","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x7e2"
}
```

## klay_clientVersion <a id="klay_clientversion"></a>

Returns the current client version of a Klaytn node.

**Parameters**

None

**Return Value**

| Type   | Description                                  |
| ------ | -------------------------------------------- |
| String | The current client version of a Klaytn node. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_clientVersion","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"Klaytn/v0.9.1+3518232250/linux-amd64/go1.11.2"
}
```

## klay_gasPrice <a id="klay_gasprice"></a>

Returns a suggestion for a gas price in peb.

**Parameters**

None

**Return Value**

| Type     | Description                              |
| -------- | ---------------------------------------- |
| QUANTITY | Integer of the current gas price in peb. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPrice","params":[],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
}
```

## klay_gasPriceAt <a id="klay_gaspriceat"></a>

Returns different values based on the condition described below. The unit of the return value is peb.

- If `baseFee` is undefined in the header, it returns the unit price from the governance parameter
- If the block is a pending block, it returns the gas price of the txpool.
- Otherwise, it returns the base fee of the given block.

**Parameters**

| Type   | Description                                                   |
| ------ | ------------------------------------------------------------- |
| NUMBER | Block number. If omitted, latest unit price will be returned. |

**Return Value**

| Type     | Description                              |
| -------- | ---------------------------------------- |
| QUANTITY | Integer of the current gas price in peb. |

**Example**

```javascript
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPriceAt","params":["0x64"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
}
```

## klay_isParallelDBWrite <a id="klay_isparalleldbwrite"></a>

Returns `true` if the node is writing blockchain data in parallel manner. It is enabled by default.

**Parameters**

None

**Return Value**

| Type    | Description                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Boolean | `true` means the node is writing blockchain data in parallel manner. It is `false` if the node is writing the data in serial manner. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isParallelDBWrite","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

## klay_isSenderTxHashIndexingEnabled <a id="klay_issendertxhashindexingenabled"></a>

Returns `true` if the node is indexing sender transaction hash to transaction hash mapping information.
It is disabled by default and can be enabled by `--sendertxhashindexing`.

**Parameters**

None

**Return Value**

| Type    | Description                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------- |
| Boolean | `true` means the node is indexing sender transaction hash to transaction hash mapping information. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isSenderTxHashIndexingEnabled","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

## klay_protocolVersion <a id="klay_protocolversion"></a>

Returns the Klaytn protocol version of the node.
The current version (as of v1.9.0) of Cypress/Baobab is `istanbul/65`.

**Parameters**

None

**Return Value**

| Type   | Description                              |
| ------ | ---------------------------------------- |
| String | The Klaytn protocol version of the node. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_protocolVersion","params":[],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x40"
}
```

## klay_rewardbase <a id="klay_rewardbase"></a>

Returns the rewardbase of the current node. Rewardbase is the address of the account where the block rewards goes to. It is only required for CNs.

**Parameters**

None

**Return Value**

| Type         | Description |
| ------------ | ----------- |
| 20-byte DATA | Address.    |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_rewardbase","id":1}' https://public-en-baobab.klaytn.net

// Result - If requested from non-CN nodes
{
    "jsonrpc":"2.0",
    "id":1,
    "error":{
        "code":-32000,
        "message":"rewardbase must be explicitly specified"
        }
}

// Result - If requested from CN nodes
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x96Fd91f34Cc8da9f6338C106Ba37aA8B48FB4Fa5"
}
```
