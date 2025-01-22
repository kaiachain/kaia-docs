# caver.rpc.net

caver.rpc.net "使用 "net "名称空间提供 JSON-RPC 调用。

## caver.rpc.net.getNetworkId <a id="caver-rpc-net-getnetworkid"></a>

```javascript
caver.rpc.net.getNetworkId([callback])
```

返回 kaia 节点的网络标识符（网络 ID）。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述     |
| -- | ------ |
| 数量 | 网络 ID。 |

**示例**

```javascript
> caver.rpc.net.getNetworkId().then(console.log)
1001
```

## caver.rpc.net.isListening <a id="caver-rpc-net-islistening"></a>

```javascript
caver.rpc.net.isListening([callback])
```

如果 kaia 节点正在监听网络连接，则返回 `true`。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型      | 描述                       |
| ------- | ------------------------ |
| boolean | 监听时为 `true`，否则为 `false`。 |

**示例**

```javascript
> caver.rpc.net.isListening().then(console.log)
true
```

## caver.rpc.net.getPeerCount <a id="caver-rpc-net-getpeercount"></a>

```javascript
caver.rpc.net.getPeerCount([callback])
```

返回当前连接到 kaia 节点的对等节点的数量。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `Array`

| 类型  | 描述                |
| --- | ----------------- |
| 字符串 | 以十六进制为单位的连接对等体数量。 |

**示例**

```javascript
> caver.rpc.net.getPeerCount().then(console.log)
0x3
```

## caver.rpc.net.getPeerCountByType <a id="caver-rpc-net-getpeercountbytype"></a>

```javascript
caver.rpc.net.getPeerCountByType([callback])
```

返回按类型划分的连接节点数，以及带有键/值对的连接节点总数。

**参数**

| 名称       | 类型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可选）可选回调，第一个参数返回错误对象，第二个参数返回结果。 |

**返回价值**

`Promise` returns `number`

| 类型 | 描述                        |
| -- | ------------------------- |
| 对象 | 按类型分列的已连接对等体数量以及已连接对等体总数。 |

**示例**

```javascript
> caver.rpc.net.getPeerCountByType().then(console.log)
{ en: 1, pn: 2, total: 3 }
```
