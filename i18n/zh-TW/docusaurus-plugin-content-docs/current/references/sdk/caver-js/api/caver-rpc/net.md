# caver.rpc.net

caver.rpc.net "使用 "net "名稱空間提供 JSON-RPC 調用。

## caver.rpc.net.getNetworkId <a id="caver-rpc-net-getnetworkid"></a>

```javascript
caver.rpc.net.getNetworkId([callback])
```

返回 kaia 節點的網絡標識符（網絡 ID）。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述     |
| -- | ------ |
| 數量 | 網絡 ID。 |

**示例**

```javascript
> caver.rpc.net.getNetworkId().then(console.log)
1001
```

## caver.rpc.net.isListening <a id="caver-rpc-net-islistening"></a>

```javascript
caver.rpc.net.isListening([callback])
```

如果 kaia 節點正在監聽網絡連接，則返回 `true`。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型      | 描述                       |
| ------- | ------------------------ |
| boolean | 監聽時為 `true`，否則為 `false`。 |

**示例**

```javascript
> caver.rpc.net.isListening().then(console.log)
true
```

## caver.rpc.net.getPeerCount <a id="caver-rpc-net-getpeercount"></a>

```javascript
caver.rpc.net.getPeerCount([callback])
```

返回當前連接到 kaia 節點的對等節點的數量。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述                |
| --- | ----------------- |
| 字符串 | 以十六進制為單位的連接對等體數量。 |

**示例**

```javascript
> caver.rpc.net.getPeerCount().then(console.log)
0x3
```

## caver.rpc.net.getPeerCountByType <a id="caver-rpc-net-getpeercountbytype"></a>

```javascript
caver.rpc.net.getPeerCountByType([callback])
```

返回按類型劃分的連接節點數，以及帶有鍵/值對的連接節點總數。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                        |
| -- | ------------------------- |
| 對象 | 按類型分列的已連接對等體數量以及已連接對等體總數。 |

**示例**

```javascript
> caver.rpc.net.getPeerCountByType().then(console.log)
{ en: 1, pn: 2, total: 3 }
```
