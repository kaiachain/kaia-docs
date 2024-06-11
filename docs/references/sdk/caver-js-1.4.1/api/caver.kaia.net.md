---
description: >-
  A JavaScript wrapper to Kaia APIs around the namespace 'net'.

---

# caver.kaia.net

The `caver-kaia-net` package allows you to interact with the Kaia nodes'
network properties.

```javascript
var Net = require('caver-kaia-net');

// "Personal.providers.givenProvider" will be set if in a Kaia supported browser.
var net = new Net(Net.givenProvider || 'ws://some.local-or-remote.node:8552');

// or using the caver package
var Caver = require('caver');
var caver = new Caver(Caver.givenProvider || 'ws://some.local-or-remote.node:8552');
// -> caver.kaia.net
```


## getId <a id="getid"></a>

```javascript
caver.kaia.net.getId([callback])
```

Gets the current network ID.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Number` - The network ID.

**Example**

```javascript
> caver.kaia.net.getId().then(console.log);
1000
```


## isListening <a id="islistening"></a>

```javascript
caver.kaia.net.isListening([callback])
```

Checks if the node is listening for peers.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Boolean` - `true` if the node is listening for peers,
`false` otherwise.

**Example**

```javascript
> caver.kaia.net.isListening().then(console.log);
true
```


## getPeerCount <a id="getpeercount"></a>

```javascript
caver.kaia.net.getPeerCount([callback])
```

Gets the number of peers connected to.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Number` - The number of peers connected to.

**Example**

```javascript
> caver.kaia.net.getPeerCount().then(console.log);
10
```

## peerCountByType <a id="peercountbytype"></a>

```javascript
caver.kaia.net.peerCountByType([callback])
```

Returns the number of connected nodes by type and the total number of connected nodes with key/value pairs.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Object` - The number of connected peers by type as well as the total number of connected peers.

**Example**

```javascript
> caver.kaia.net.peerCountByType().then(console.log);
{ en: 1, pn: 2, total: 3 }
```
