# caver.rpc.net

`caver.rpc.net` provides JSON-RPC call with `net` name space.

## caver.rpc.net.getNetworkId <a id="caver-rpc-net-getnetworkid"></a>

```javascript
caver.rpc.net.getNetworkId([callback])
```

Returns the network identifier (network ID) of the Klaytn Node.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |


**Return Value**

`Promise` returns `number`

| Type | Description |
| --- | --- |
| number | The network id. |

**Example**

```javascript
> caver.rpc.net.getNetworkId().then(console.log)
1001
```

## caver.rpc.net.isListening <a id="caver-rpc-net-islistening"></a>

```javascript
caver.rpc.net.isListening([callback])
```

Returns `true` if the Klaytn Node is actively listening for network connections.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |


**Return Value**

`Promise` returns `boolean`

| Type | Description |
| --- | --- |
| boolean | `true` when listening, otherwise `false`. |

**Example**

```javascript
> caver.rpc.net.isListening().then(console.log)
true
```

## caver.rpc.net.getPeerCount <a id="caver-rpc-net-getpeercount"></a>

```javascript
caver.rpc.net.getPeerCount([callback])
```

Returns the number of peers currently connected to the Klaytn Node.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |


**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The number of connected peers in hex. |

**Example**

```javascript
> caver.rpc.net.getPeerCount().then(console.log)
0x3
```

## caver.rpc.net.getPeerCountByType <a id="caver-rpc-net-getpeercountbytype"></a>

```javascript
caver.rpc.net.getPeerCountByType([callback])
```

Returns the number of connected nodes by type and the total number of connected nodes with key/value pairs.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |


**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | The number of connected peers by type as well as the total number of connected peers. |

**Example**

```javascript
> caver.rpc.net.getPeerCountByType().then(console.log)
{ en: 1, pn: 2, total: 3 }
```