---
description: APIs used to query network configuration.
---

# net

The namespace `net` provides functions related to the Klaytn networks.

## net_networkID <a id="net_networkid"></a>

Returns the network identifier (network ID).

**Parameters**

None

**Return Value**

| Type     | Description                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------------- |
| QUANTITY | The integer of the network identifier. <br/>- `"1001"`: Klaytn Baobab testnet. <br/>- `"8217"`: Klaytn Cypress mainnet. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_networkID","params":[],"id":67}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```

## net_listening <a id="net_listening"></a>

Returns `true` if the client is actively listening for network connections.

**Parameters**

None

**Return Value**

| Type    | Description                               |
| ------- | ----------------------------------------- |
| Boolean | `true` when listening, otherwise `false`. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}' https://public-en-baobab.klaytn.net

// Result
{
    "id":67,
    "jsonrpc":"2.0",
    "result":true
}
```

## net_peerCount <a id="net_peercount"></a>

Returns the number of peers currently connected to the client.

**Parameters**

None

**Return Value**

| Type     | Description                               |
| -------- | ----------------------------------------- |
| QUANTITY | Integer of the number of connected peers. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}' https://public-en-baobab.klaytn.net

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": "0x3" // 2
}
```

## net_peerCountByType <a id="net_peercountbytype"></a>

Returns the number of connected nodes by type and the total number of connected nodes with key/value pairs.

**Parameters**

None

**Return Value**

| Type        | Description                                                                           |
| ----------- | ------------------------------------------------------------------------------------- |
| JSON string | The number of connected peers by type as well as the total number of connected peers. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCountByType","params":[],"id":74}' https://public-en-baobab.klaytn.net

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": {"en":3,"pn":2,"total":5}
}
```

## net_version <a id="net_version"></a>

Return the current klaytn protocol version.

**Parameters**

None

**Return Value**

| Type     | Description                                                                                                                  |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY | The integer of the klaytn protocol version. <br/>- `"1001"`: Klaytn Baobab testnet. <br/>- `"8217"`: Klaytn Cypress mainnet. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}' https://public-en-baobab.klaytn.net
// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```
