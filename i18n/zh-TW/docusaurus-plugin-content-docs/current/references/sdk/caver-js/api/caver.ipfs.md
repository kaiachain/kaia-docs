# caver.ipfs

caver.ipfs "是一個提供與 kaia Node 的 rpc 調用相關的功能的軟件包。

**注意** `caver.ipfs` 自 caver-js [v1.5.4](https://www.npmjs.com/package/caver-js/v/1.5.4) 開始支持。

## caver.ipfs.setIPFSNode <a id="caver-ipfs-setipfsnode"></a>

```javascript
caver.ipfs.setIPFSNode(host, port, ssl)
```

初始化與 IPFS 節點的連接。 通過此功能設置 IPFS 節點信息後，就可以向 IPFS 上載文件或從 IPFS 加載文件。

**參數**

| 名稱   | 類型      | 描述                                         |
| ---- | ------- | ------------------------------------------ |
| host | string  | 要連接的 IPFS 節點網址。                            |
| port | number  | 要使用的端口號。                                   |
| ssl  | boolean | 如果為 true，則使用 `https` 協議。 否則，將使用 `http` 協議。 |

**返回價值**

無

**示例**

```javascript
> caver.ipfs.setIPFSNode('localhost', 5001, false)
```

## caver.ipfs.add <a id="caver-ipfs-add"></a>

```javascript
caver.ipfs.add(data)
```

向 IPFS 添加文件。 將返回上傳文件的 [CID（內容標識符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。

如果傳入文件路徑，則會從該路徑加載文件內容並上載到 IPFS。 如果傳遞的是緩衝區，則會直接上傳到 IPFS。

**參數**

| 名稱   | 類型                                  | 描述                       |
| ---- | ----------------------------------- | ------------------------ |
| data | string \\| Buffer \\| ArrayBuffer | 要添加到 IPFS 的文件或緩衝區的路徑字符串。 |

**注意** 自 caver-js [v1.5.5](https://www.npmjs.com/package/caver-js/v/1.5.5) 起支持`Buffer`。

**返回價值**

`Promise` returns `string`

| 類型     | 描述                                                                                                 |
| ------ | -------------------------------------------------------------------------------------------------- |
| string | 上傳文件的 [CID（內容標識符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**示例**

```javascript
// Adds a file with path string.
> caver.ipfs.add('./test.txt')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC

// Adds a file with Buffer containing the contents of the file.
> caver.ipfs.add(Buffer.from('test data'))
QmWmsL95CYvci8JiortAMhezezr8BhAwAVohVUSJBcZcBL
```

## caver.ipfs.get <a id="caver-ipfs-get"></a>

```javascript
caver.ipfs.get(hash)
```

通過有效的 IPFS 路徑返回文件地址。

**參數**

| 名稱   | 類型     | 描述                                                                                                  |
| ---- | ------ | --------------------------------------------------------------------------------------------------- |
| hash | string | 要下載文件的 [CID（內容標識符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**返回價值**

`Promise` returns `Buffer`

| 類型     | 說明    |
| ------ | ----- |
| Buffer | 文件內容。 |

**示例**

```javascript
> caver.ipfs.get('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
<Buffer 74 65 73 74 20 64 61 74 61 20 66 6f 72 20 49 50 46 53>
```

## caver.ipfs.toHex <a id="caver-ipfs-tohex"></a>

```javascript
caver.ipfs.toHex(hash)
```

將 [CID（內容標識符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) 轉換為 [多散列](https://multiformats.io/multihash)。

**參數**

| 名稱   | 類型     | 描述                                                                                                |
| ---- | ------ | ------------------------------------------------------------------------------------------------- |
| hash | string | 要轉換的 [CID（內容標識符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**返回價值**

| 類型     | 描述                                                                                                                         |
| ------ | -------------------------------------------------------------------------------------------------------------------------- |
| string | 多重哈希](https://multiformats.io/multihash) 字符串。 |

**示例**

```javascript
> caver.ipfs.toHex('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3
```

## caver.ipfs.fromHex <a id="caver-ipfs-fromhex"></a>

```javascript
caver.ipfs.fromHex(hash)
```

從 [Multihash](https://multiformats.io/multihash) 轉換為 [CID（內容標識符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。

**參數**

| 名稱   | 類型     | 描述                                              |
| ---- | ------ | ----------------------------------------------- |
| hash | string | 要轉換的 [多重散列](https://multiformats.io/multihash)。 |

**返回價值**

| 類型     | 描述                                                                                                                                                                                       |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string | CID（內容標識符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**示例**

```javascript
> caver.ipfs.fromHex('0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC
```
