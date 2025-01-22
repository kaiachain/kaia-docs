# ケイバドットアールピーネット

`caver.rpc.net` は `net` 名前空間を使用して JSON-RPC コールを提供する。

## caver.rpc.net.getNetworkId <a id="caver-rpc-net-getnetworkid"></a>

```javascript
caver.rpc.net.getNetworkId([コールバック])
```

kaiaノードのネットワーク識別子（ネットワークID）を返します。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

プロミス`は `number\` を返す。

| タイプ | 説明        |
| --- | --------- |
| 番号  | ネットワークID。 |

**例**

```javascript
> caver.rpc.net.getNetworkId().then(console.log)
1001
```

## caver.rpc.net.isListening <a id="caver-rpc-net-islistening"></a>

```javascript
caver.rpc.net.isListening([コールバック])
```

kaia ノードがアクティブにネットワーク接続をリッスンしていれば `true` を返す。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `boolean` を返す。

| タイプ   | 説明                                |
| ----- | --------------------------------- |
| ブーリアン | リスニング中は `true`、それ以外は `false` である。 |

**例**

```javascript
> caver.rpc.net.isListening().then(console.log)
true
```

## caver.rpc.net.getPeerCount <a id="caver-rpc-net-getpeercount"></a>

```javascript
caver.rpc.net.getPeerCount([コールバック])
```

現在kaiaノードに接続しているピア数を返します。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                 |
| ----- | ------------------ |
| ストリング | 接続されているピアの数（16進数）。 |

**例**

```javascript
> caver.rpc.net.getPeerCount().then(console.log)
0x3
```

## caver.rpc.net.getPeerCountByType <a id="caver-rpc-net-getpeercountbytype"></a>

```javascript
caver.rpc.net.getPeerCountByType([コールバック])
```

タイプ別の接続ノード数と、キーと値のペアを持つ接続ノードの総数を返します。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                 |
| ------ | ------------------ |
| オブジェクト | タイプ別の接続ピア数と接続ピア総数。 |

**例**

```javascript
> caver.rpc.net.getPeerCountByType().then(console.log)
{ en: 1, pn: 2, total: 3 }
```
