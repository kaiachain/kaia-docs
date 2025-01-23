# caver.ipfs

caver.ipfs "是一个提供与 kaia Node 的 rpc 调用相关的功能的软件包。

**注意** `caver.ipfs` 自 caver-js [v1.5.4](https://www.npmjs.com/package/caver-js/v/1.5.4) 开始支持。

## caver.ipfs.setIPFSNode <a id="caver-ipfs-setipfsnode"></a>

```javascript
caver.ipfs.setIPFSNode(host, port, ssl)
```

初始化与 IPFS 节点的连接。 通过此功能设置 IPFS 节点信息后，就可以向 IPFS 上载文件或从 IPFS 加载文件。

**参数**

| 名称   | 类型      | 描述                                         |
| ---- | ------- | ------------------------------------------ |
| host | string  | 要连接的 IPFS 节点网址。                            |
| port | number  | 要使用的端口号。                                   |
| ssl  | boolean | 如果为 true，则使用 `https` 协议。 否则，将使用 `http` 协议。 |

**返回价值**

无

**示例**

```javascript
> caver.ipfs.setIPFSNode('localhost', 5001, false)
```

## caver.ipfs.add <a id="caver-ipfs-add"></a>

```javascript
caver.ipfs.add(data)
```

向 IPFS 添加文件。 将返回上传文件的 [CID（内容标识符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。

如果传入文件路径，则会从该路径加载文件内容并上载到 IPFS。 如果传递的是缓冲区，则会直接上传到 IPFS。

**参数**

| 名称   | 类型                                  | 描述                       |
| ---- | ----------------------------------- | ------------------------ |
| data | string \\| Buffer \\| ArrayBuffer | 要添加到 IPFS 的文件或缓冲区的路径字符串。 |

**注意** 自 caver-js [v1.5.5](https://www.npmjs.com/package/caver-js/v/1.5.5) 起支持`Buffer`。

**返回价值**

`Promise` returns `string`

| 类型     | 描述                                                                                                 |
| ------ | -------------------------------------------------------------------------------------------------- |
| string | 上传文件的 [CID（内容标识符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

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

通过有效的 IPFS 路径返回文件地址。

**参数**

| 名称   | 类型     | 描述                                                                                                  |
| ---- | ------ | --------------------------------------------------------------------------------------------------- |
| hash | string | 要下载文件的 [CID（内容标识符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**返回价值**

`Promise` returns `Buffer`

| 类型     | 说明    |
| ------ | ----- |
| Buffer | 文件内容。 |

**示例**

```javascript
> caver.ipfs.get('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
<Buffer 74 65 73 74 20 64 61 74 61 20 66 6f 72 20 49 50 46 53>
```

## caver.ipfs.toHex <a id="caver-ipfs-tohex"></a>

```javascript
caver.ipfs.toHex(hash)
```

将 [CID（内容标识符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) 转换为 [多散列](https://multiformats.io/multihash)。

**参数**

| 名称   | 类型     | 描述                                                                                                |
| ---- | ------ | ------------------------------------------------------------------------------------------------- |
| hash | string | 要转换的 [CID（内容标识符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**返回价值**

| 类型     | 描述                                                                                                                         |
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

从 [Multihash](https://multiformats.io/multihash) 转换为 [CID（内容标识符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。

**参数**

| 名称   | 类型     | 描述                                              |
| ---- | ------ | ----------------------------------------------- |
| hash | string | 要转换的 [多重散列](https://multiformats.io/multihash)。 |

**返回价值**

| 类型     | 描述                                                                                                                                                                                       |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string | CID（内容标识符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**示例**

```javascript
> caver.ipfs.fromHex('0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC
```
