# ケイバー

`caver.ipfs` は IPFS (InterPlanetary File System) に関連する機能を提供するパッケージである。

**NOTE** `caver.ipfs`はcaver-js [v1.5.4](https://www.npmjs.com/package/caver-js/v/1.5.4)からサポートされています。

## caver.ipfs.setIPFSNode <a id="caver-ipfs-setipfsnode"></a>

```javascript
caver.ipfs.setIPFSNode(host, port, ssl)
```

IPFS ノードとの接続を初期化します。 この機能でIPFSノード情報を設定すると、IPFSにファイルをアップロードしたり、IPFSからファイルをロードしたりすることができます。

**パラメーター**

| 名称     | タイプ   | 説明                                                       |
| ------ | ----- | -------------------------------------------------------- |
| ホスト    | ストリング | 接続するIPFSノードのURL。                                         |
| ポート    | 番号    | 使用するポート番号。                                               |
| エスエスエル | ブーリアン | trueの場合、`https`プロトコルが使用される。 そうでない場合は `http` プロトコルが使用される。 |

**リターン・バリュー**

なし

**例**

```javascript
> caver.ipfs.setIPFSNode('localhost',5001,false)。
```

## caver.ipfs.add <a id="caver-ipfs-add"></a>

```javascript
caver.ipfs.add(データ)
```

IPFSにファイルを追加する。 アップロードされたファイルの[CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)が返される。

ファイルのパスが渡された場合、ファイルの内容がパスからロードされ、IPFSにアップロードされる。 バッファが渡された場合、IPFSに直接アップロードされる。

**パラメーター**

| 名称  | タイプ                                 | 説明                          |
| --- | ----------------------------------- | --------------------------- |
| データ | string \\| Buffer \\| ArrayBuffer | IPFSに追加するファイルまたはバッファのパス文字列。 |

**NOTE** `Buffer`はcaver-js [v1.5.5](https://www.npmjs.com/package/caver-js/v/1.5.5)からサポートされています。

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                                                                                                                                         |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ストリング | アップロードされたファイルの[CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**例**

```javascript
// パス文字列でファイルを追加する。
> caver.ipfs.add('./test.txt')
Qmd9thymMS6mejhEDZfwXPowSDunzma9ex4ezpCSRZGwC

// ファイルの内容を含む Buffer でファイルを追加します。
// Bufferでファイルを追加する。
QmWmsL95CYvci8JiortAMhezezr8BhAwAVohVUSJBcZcBL
```

## caver.ipfs.get <a id="caver-ipfs-get"></a>

```javascript
caver.ipfs.get(ハッシュ)
```

有効な IPFS パスで指定されたファイルを返します。

**パラメーター**

| 名称   | タイプ   | 説明                                                                                                                                        |
| ---- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ハッシュ | ストリング | ダウンロードするファイルの[CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**リターン・バリュー**

`Promise` は `Buffer` を返す。

| タイプ  | 説明       |
| ---- | -------- |
| バッファ | ファイルの内容。 |

**例**

```javascript
> caver.ipfs.get('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
<Buffer 74 65 73 74 20 64 61 74 61 20 66 6f 72 20 49 50 46 53>
```

## caver.ipfs.toHex <a id="caver-ipfs-tohex"></a>

```javascript
caver.ipfs.toHex(ハッシュ)
```

CID(コンテンツ識別子)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)を[マルチハッシュ](https://multiformats.io/multihash)に変換する。

**パラメーター**

| 名称   | タイプ   | 説明                                                                                                                               |
| ---- | ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| ハッシュ | ストリング | 変換する[CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**リターン・バリュー**

| タイプ   | 説明                                                                                                                            |
| ----- | ----------------------------------------------------------------------------------------------------------------------------- |
| ストリング | マルチハッシュ](https://multiformats.io/multihash) 文字列。 |

**例**

```javascript
> caver.ipfs.toHex('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3
```

## caver.ipfs.fromHex <a id="caver-ipfs-fromhex"></a>

```javascript
caver.ipfs.fromHex(ハッシュ)
```

Multihash](https://multiformats.io/multihash) から [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) に変換します。

**パラメーター**

| 名称   | タイプ   | 説明                                                |
| ---- | ----- | ------------------------------------------------- |
| ハッシュ | ストリング | 変換する[マルチハッシュ](https://multiformats.io/multihash)。 |

**リターン・バリュー**

| タイプ   | 説明                                                                                                                                                                                                             |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ストリング | CID(コンテンツ識別子)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**例**

```javascript
> caver.ipfs.fromHex('0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC
```
