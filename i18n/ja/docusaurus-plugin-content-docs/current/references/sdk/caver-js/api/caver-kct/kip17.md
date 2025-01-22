# caver.kct.kip17

`caver.kct.kip17`は、[KIP-17](https://kips.kaia.io/KIPs/kip-17)をJavaScriptオブジェクトとして実装したスマートコントラクトをkaiaブロックチェーン上で簡単に扱えるようにします。

caver.kct.kip17`は[caver.contract](../caver.contract.md)を継承し、KIP-17トークンコントラクトを実装する。 `caver.kct.kip17`は`caver.contract`と同じプロパティを保持しているが、追加機能を実装するためのメソッドが追加されている。 このセクションでは `caver.kct.kip17\` の新しく追加されたバウンドメソッドのみを紹介する。

caver-jsにKIP-17を実装するコードは、[Kaia Contracts Github Repo](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP17)で入手可能です。 KIP-17 for caver-jsがOwnableインターフェイスをサポート。 これを使用すると、コントラクトのデプロイ時にコントラクト所有者を指定できます。

KIP-17の詳細については、[カイア改善提案](https://kips.kaia.io/KIPs/kip-17)を参照のこと。

## caver.kct.kip17.deploy <a id="caver-klay-kip17-deploy"></a>

```javascript
caver.kct.kip17.deploy(tokenInfo, deployer)
```

KIP-17トークンコントラクトをkaiaブロックチェーンに展開する。 caver.kct.kip17.deployを使用してデプロイされたコントラクトは、KIP-17標準に従った非腐敗トークンである。

デプロイに成功すると、プロミスは新しいKIP17インスタンスで解決される。

**パラメーター**

| 名称      | タイプ         | 説明                                                                                                                                                                                                                                                                                                                                          |
| ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| トークン情報  | オブジェクト      | KIP-17トークンコントラクトをkaiaブロックチェーン上に展開するために必要な情報。 詳細は下表を参照。                                                                                                                                                                                                                                                                                      |
| ディプロイヤー | string \\ | KIP-17トークンコントラクトを展開するキーリング・インスタンス内のアドレス。 このアドレスは、展開するのに十分なKAIAを持っていなければならない。 詳しくは[キーホルダー](../caver-wallet/keyring.md#caver-wallet-keyring)を参照。 トランザクションの送信時に使用するフィールドを定義したい場合は、オブジェクト・タイプをパラメータとして渡すことができる。 KIP-17コントラクトのデプロイ時に料金委譲を使用したい場合、オブジェクトに料金委譲に関連するフィールドを定義することができます。 これらのフィールドの使用方法については、[approve](#kip17-approve)のパラメータ説明を参照のこと。 |

tokenInfoオブジェクトには、以下を含める必要があります：

| 名称   | タイプ   | 説明         |
| ---- | ----- | ---------- |
| 名称   | ストリング | トークンの名前。   |
| シンボル | ストリング | トークンのシンボル。 |

**リターン・バリュー**

`PromiEvent`：新しい KIP17 インスタンスで解決される。 さらに、以下のような出来事も起こりうる：

| 名称           | タイプ    | 説明                                                                                                                                                         |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| トランザクションハッシュ | ストリング  | トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。                                                                                                               |
| レシート         | オブジェクト | トランザクションのレシートが利用可能になったときに発行されます。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]を参照してください。 KIP17インスタンスからのレシートは、abi経由で解析される'logs'属性の代わりに'events'属性を持つ。 |
| エラー          | エラー    | 送信中にエラーが発生した場合に発行される。                                                                                                                                      |

**トークン登録**

1. ブロック・エクスプローラーにトークンを登録するには、コントラクト作成者が提出要求フォームに記入する必要がある。 フォームに必要な指定情報をメモする。

2. スマートコントラクト環境

   - コンパイラの種類ソリディティ

   - コンパイラバージョン：v0.8.4+commit.c7e474f2

   - オープンソースライセンスMIT

3. スマート・コントラクトの詳細

   - 最適化：--optimize-run 200

   - ソースコード[KIP17 Contracts Github Link](https://github.com/kaiachain/caver-js/blob/dev/packages/caver-kct/src/kip17Token.sol).

4. ABI エンコードされた値：[kip17JsonInterface at dev - kaiachain/caver-js - GitHub](https://github.com/kaiachain/caver-js/blob/dev/packages/caver-kct/src/kctHelper.js#L408-L1319)

**例**

```javascript
// using the promise
> caver.kct.kip17.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
}, '0x{address in hex}').then(console.log)
KIP17 {
	...
	_address: '0xfA7D967f414468083aDAd85257a2cBD6019693C2',
	_jsonInterface: [
		...
		{
			anonymous: false,
			inputs: [
				{ indexed: true, name: 'owner', type: 'address' },
     			{ indexed: true, name: 'operator', type: 'address' },
     			{ indexed: false, name: 'approved', type: 'bool' }
			],
			name: 'ApprovalForAll',
			type: 'event',
			signature: '0x17307...'
		}
	] 
}

// Send object as second parameter
> caver.kct.kip17.deploy({
        name: 'Jasmine',
        symbol: 'JAS',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
> caver.kct.kip17.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
	console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP17Instance) {
	console.log(newKIP17Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip17.detectInterface <a id="caver-kct-kip17-detectinterface"></a>

```javascript
caver.kct.kip17.detectInterface(契約アドレス)
```

トークンコントラクトが実装しているインターフェースの情報を返します。 この静的関数は [kip17.detectInterface](#kip17-detectinterface) を使用する。

**パラメーター**

| 名称   | タイプ   | 説明                   |
| ---- | ----- | -------------------- |
| 契約住所 | ストリング | KIP-7トークンコントラクトのアドレス |

**リターン・バリュー**

`Promise`は、各[KIP-17 インタフェース](https://kips.kaia.io/KIPs/kip-17#kip-13-identifiers) が実装されているかどうかをブール値で表した結果を含む `オブジェクト` を返す。

**例**

```javascript
> caver.kct.kip17.detectInterface('0x{address in hex}').then(console.log)
{
	IKIP17: true,
	IKIP17Metadata: true,
	IKIP17Enumerable: true,
	IKIP17Mintable: true,
	IKIP17MetadataMintable: true,
	IKIP17Burnable: true,
	IKIP17Pausable: true,
}.
```

## caver.kct.kip17.create <a id="caver-kct-kip17-create"></a>

```javascript
caver.kct.kip17.create([tokenAddress])
```

バインドされたメソッドとイベントを持つ新しい KIP17 インスタンスを作成します。 この関数は[new KIP17](#new-kip17)と同じ働きをする。

**NOTE** `caver.kct.kip17.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメーター**

new KIP17](#new-kip17)を参照。

**リターン・バリュー**

new KIP17](#new-kip17)を参照。

**例**

```javascript
// Create a KIP17 instance without a parameter
> const kip17 = caver.kct.kip17.create()

// Create a KIP17 instance with a token address
> const kip17 = caver.kct.kip17.create('0x{address in hex}')
```

## 新しいKIP17<a id="new-kip17"></a>

```javascript
new caver.kct.kip17([tokenAddress])
```

バインドされたメソッドとイベントを持つ新しい KIP17 インスタンスを作成します。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                                           |
| -------- | ----- | ------------------------------------------------------------------------------------------------------------ |
| トークンアドレス | ストリング | (オプション) KIP-17 トークンコントラクトのアドレス。これは、`kip17.options.address = '0x1234..'`によって後で割り当てることができる。 |

**リターン・バリュー**

| タイプ    | 説明                              |
| ------ | ------------------------------- |
| オブジェクト | バインドされたメソッドとイベントを持つKIP17インスタンス。 |

**例**

```javascript
// Create a KIP17 instance without a parameter
> const kip17 = new caver.kct.kip17()

// Create a KIP17 instance with a token address
> const kip17 = new caver.kct.kip17('0x{address in hex}')
```

## kip17.クローン<a id="kip17-clone"></a>

```javascript
kip17.clone([tokenAddress])
```

現在の KIP17 インスタンスをクローンする。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                             |
| -------- | ----- | ---------------------------------------------------------------------------------------------- |
| トークンアドレス | ストリング | (オプション) 別のKIP-17トークンをデプロイしたスマートコントラクトのアドレス。 省略された場合は、元のインスタンスの契約アドレスが設定される。 |

**リターン・バリュー**

| タイプ    | 説明                      |
| ------ | ----------------------- |
| オブジェクト | オリジナルのKIP17インスタンスのクローン。 |

**例**

```javascript
> const kip17 = new caver.kct.kip17(address)

// Clone without a parameter
> const cloned = kip17.clone()

// Clone with the address of the new token contract
> const cloned = kip17.clone('0x{address in hex}')
```

## kip17.detectInterface<a id="kip17-detectinterface"></a>

```javascript
kip17.detectInterface()
```

トークンコントラクトが実装しているインターフェースの情報を返します。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は、各 [KIP-17 インタフェース](https://kips.kaia.io/KIPs/kip-17#kip-13-identifiers) が実装されているかどうかをブール値で表した結果を含む `オブジェクト` を返す。

**例**

```javascript
> kip17.detectInterface(.then(console.log)
{
	IKIP17: true,
	IKIP17Metadata: true,
	IKIP17Enumerable: true,
	IKIP17Mintable: true,
	IKIP17MetadataMintable: true,
	IKIP17Burnable: true,
	IKIP17Pausable: true,
}.
```

## kip17.supportsInterface<a id="kip17-supportsinterface"></a>

```javascript
kip17.supportsInterface(interfaceId)
```

このコントラクトが `interfaceId` で定義されたインタフェースを実装していれば `true` を返す。

**パラメーター**

| 名称            | タイプ   | 説明                 |
| ------------- | ----- | ------------------ |
| インターフェイスアイディー | ストリング | チェックするinterfaceId。 |

**リターン・バリュー**

このコントラクトが `interfaceId` で定義されたインタフェースを実装していれば `true` を返します。

**例**

```javascript
> kip17.supportsInterface('0x80ac58cd').then(console.log)
true

> kip17.supportsInterface('0xa22cb465').then(console.log)
false
```

## kip17.名前<a id="kip17-name"></a>

```javascript
kip17.name()
```

トークンの名前を返します。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は `string` を返す：トークンの名前。

**例**

```javascript
> kip17.name().then(console.log)
ジャスミン
```

## kip17.シンボル<a id="kip17-symbol"></a>

```javascript
kip17.symbol()
```

トークンのシンボルを返します。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は `string` を返す：トークンのシンボル。

**例**

```javascript
> kip17.symbol().then(console.log)
JAS
```

## kip17.totalSupply<a id="kip17-totalsupply"></a>

```javascript
kip17.totalSupply()
```

契約によって鋳造されたトークンの総数を返します。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は `BigNumber` を返す：トークンの総数。

**例**

```javascript
> kip17.totalSupply().then(console.log)
10
```

## kip17.tokenURI<a id="kip17-tokenuri"></a>

```javascript
kip17.tokenURI(tokenId)。
```

指定されたトークンIDのURIを返します。

**パラメーター**

| 名称     | タイプ            | 説明       |
| ------ | -------------- | -------- |
| トークンID | BigNumber \\ | トークンのID。 |

**注意** `tokenId` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `string` を返す：与えられたトークンの URI。

**例**

```javascript
> kip17.tokenURI(0).then(console.log)
https://kip17.example/uri-ex-caver.json
```

## kip17.tokenOfOwnerByIndex<a id="kip17-tokenofownerbyindex"></a>

```javascript
kip17.tokenOfOwnerByIndex(owner, index)
```

所有者\`のトークン一覧から指定されたインデックスを検索し、一致するインデックスに位置するトークンのトークンIDを返す。

**パラメーター**

| 名称     | タイプ            | 説明                         |
| ------ | -------------- | -------------------------- |
| 所有者    | ストリング          | トークンを所有するアカウントのアドレス。       |
| インデックス | BigNumber \\ | オーナーのトークンリスト内のトークンのインデックス。 |

**注意** `index` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `BigNumber` を返す：トークンの ID。

**例**

```javascript
> kip17.tokenOfOwnerByIndex('0x{address in hex}', 5).then(console.log)
5
```

## kip17.tokenByIndex<a id="kip17-tokenbyindex"></a>

```javascript
kip17.tokenByIndex(インデックス)
```

このコントラクト内のすべてのトークンのリストから、指定されたインデックスを検索し、一致するものがあれば、リスト内の一致したインデックスに位置するトークンのトークンIDを返します。 インデックスがトークンの総数より大きいか等しい場合、元に戻る。

**パラメーター**

| 名称     | タイプ            | 説明                |
| ------ | -------------- | ----------------- |
| インデックス | BigNumber \\ | 照会されるトークンのインデックス。 |

**注意** `index` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `BigNumber` を返す：トークンの ID。

**例**

```javascript
> kip17.tokenByIndex(1).then(console.log)
1
```

## キップ17.balanceOf<a id="kip17-balanceof"></a>

```javascript
kip17.balanceOf(アドレス)
```

指定された口座アドレスの残高を返します。 KIP-17におけるアカウントの残高は、そのアカウントが所有するNFT（Non-Fungible Token）の総数である。

**パラメーター**

| 名称 | タイプ   | 説明            |
| -- | ----- | ------------- |
| 住所 | ストリング | 残高を確認する口座の住所。 |

**リターン・バリュー**

`Promise`は `BigNumber` を返す：口座残高。

**例**

```javascript
> kip17.balanceOf('0x{address in hex}').then(console.log)
9
```

## kip17.ownerOf<a id="kip17-ownerof"></a>

```javascript
kip17.ownerOf(tokenId)
```

指定されたトークンIDの所有者のアドレスを返します。

**パラメーター**

| 名称     | タイプ            | 説明       |
| ------ | -------------- | -------- |
| トークンID | BigNumber \\ | トークンのID。 |

**注意** `tokenId` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `string` を返す：指定したトークンを所有するアカウントのアドレス。

**例**

```javascript
> kip17.ownerOf(8).then(console.log)
0x0e0E95426343d97CC7BB913C7D7DBea065A31814
```

## kip17.getApproved<a id="kip17-getapproved"></a>

```javascript
kip17.getApproved(tokenId)
```

このトークンの譲渡を許可されたアドレス、または承認されたアドレスがない場合は「0」のアドレスを返します。 指定されたトークンIDが存在しない場合は元に戻ります。

**パラメーター**

| 名称     | タイプ            | 説明       |
| ------ | -------------- | -------- |
| トークンID | BigNumber \\ | トークンのID。 |

**注意** `tokenId` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise`は `string` を返す：指定したトークンを譲渡する権利を持つアカウントのアドレス。

**例**

```javascript
// 承認されたアドレスが存在する場合
> kip17.getApproved(10).then(console.log)
0x23D8E9cae17b22d3DAC65b4F7D2C737C6A7b865d

// 承認されたアドレスが存在しない場合
> kip17.getApproved(3).then(console.log)
0x000000000000000000000000000000
```

## kip17.isApprovedForAll<a id="kip17-isapprovedforall"></a>

```javascript
kip17.isApprovedForAll(owner, operator)
```

操作者が `owner` に属するすべてのトークンの移動を承認した場合に `true` を返す。

**パラメーター**

| 名称     | タイプ   | 説明                                           |
| ------ | ----- | -------------------------------------------- |
| 所有者    | ストリング | トークンを所有し、オペレータにすべてのトークンの送信を許可しているアカウントのアドレス。 |
| オペレーター | ストリング | 所有者の代わりに所有者のすべてのトークンを送信するために承認されたアカウントのアドレス。 |

**リターン・バリュー**

`Propise` は `boolean`: `operator` が `owner` に属するすべてのトークンを送信することを承認した場合に `true` を返す。

**例**

```javascript
> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false

> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true
```

## kip17.isMinter<a id="kip17-isminter"></a>

```javascript
kip17.isMinter(アドレス)
```

与えられたアカウントが KIP-17 に準拠した現在のコントラクトで新しいトークンを発行できるマイナーである場合に `true` を返す。

**パラメーター**

| 名称   | タイプ   | 説明                    |
| ---- | ----- | --------------------- |
| アドレス | ストリング | 造幣権があるかどうかを確認する口座の住所。 |

**リターン・バリュー**

`Promise`は `boolean` を返す: アカウントが minter であれば `true` を返す。

**例**

```javascript
> kip17.isMinter('0x{address in hex}').then(console.log)
true

> kip17.isMinter('0x{address in hex}').then(console.log)
false
```

## kip17.paused<a id="kip17-paused"></a>

```javascript
kip17.paused()
```

契約が一時停止していれば `true` を返し、そうでなければ `false` を返す。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は `boolean` を返す: 契約が一時停止されていれば `true` を返す。

**例**

```javascript
> kip17.paused().then(console.log)
true

> kip17.paused().then(console.log)
false
```

## kip17.isPauser<a id="kip17-ispauser"></a>

```javascript
kip17.isPauser(アドレス)
```

与えられたアカウントがトークンの転送を一時停止できる一時停止者であれば `true` を返す。

**パラメーター**

| 名称 | タイプ   | 説明                                    |
| -- | ----- | ------------------------------------- |
| 住所 | ストリング | トークンの譲渡を停止する権利があるかどうかを確認するアカウントのアドレス。 |

**リターン・バリュー**

`Promise`は `boolean` を返します: アカウントが一時停止者であれば `true` を返します。

**例**

```javascript
> kip17.isPauser('0x{address in hex}').then(console.log)
true

> kip17.isPauser('0x{address in hex}').then(console.log)
false
```

## kip17.承認<a id="kip17-approve"></a>

```javascript
kip17.approve(to, tokenId [, sendParam])
```

与えられたトークンIDのトークンを転送するために、別のアドレスを承認します。 ゼロ・アドレスは、承認されたアドレスがないことを示す。 トークン1つにつき、承認されたアドレスは1つだけです。 このメソッドは、トークン所有者または承認されたオペレータのみが呼び出すことができます。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ            | 説明                                                           |
| --------- | -------------- | ------------------------------------------------------------ |
| への        | ストリング          | オーナーの代わりにトークンを使用するアカウントのアドレス。                                |
| トークンID    | BigNumber \\ | トークンのID。                                                     |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 |

**注意** `tokenId` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

sendParamオブジェクトには、以下を含めることができる：

| 名称         | タイプ         | 説明                                                                                                                                                                                               |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| より         | ストリング       | (オプション) トランザクションの送信元アドレス。 省略された場合は `kip17.options.from` によって設定される。 もし `sendParam` オブジェクトの `from` と `kip17.options.from` のどちらも指定されなかった場合、エラーが発生する。                             |
| ガス         | number \\ | (オプション) このトランザクションで提供されるガスの最大値（ガスリミット）。 省略された場合は、`kip17.methods.approve(spender, tokenId).estimateGas({from})` を呼び出すことで、caver-jsによって設定されます。                                   |
| ガス価格       | number \\ | (オプション）この取引に使用するガス価格（peb）。 省略した場合は、caver-js が `caver.klay.getGasPrice` を呼び出して設定する。                                                                                            |
| 価値         | number \\ | (オプション) peb で転送される値。                                                                                                                                                          |
| フィーデレゲーション | ブーリアン       | (オプション、デフォルト `false`) フィー委任トランザクションを使用するかどうか。 省略された場合は `kip17.options.feeDelegation` が使用される。 両方が省略された場合、料金委譲は行われない。                                                           |
| 料金支払者      | ストリング       | (オプション）取引手数料を支払う手数料支払人の住所。 `feeDelegation`が `true` のとき、その値はトランザクションの `feePayer` フィールドに設定される。 省略された場合は `kip17.options.feePayer` が使用される。 両方が省略された場合はエラーを投げる。                    |
| 手数料率       | ストリング       | (任意）手数料支払者が負担する取引手数料の比率。 `feeDelegation`が `true` で、`feeRatio`に有効な値が設定されている場合、部分的な料金委譲トランザクショ ンが使用される。 有効範囲は1～99。 0や100以上の比率は許されない。 省略された場合は `kip17.options.feeRatio` が使用されます。 |

**NOTE** `feeDelegation`、`feePayer`、`feeRatio` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.approve('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x3875c3f3120c1773c3adeb97260808c8a385bf8427bc203d10cbc5d262f67dbc',
	blockNumber: 2650,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x5e0e6f1f0bdf9a263e1b1bb6e9759ba182982377',
	...
	events: {
		Approval: {
			address: '0x5E0e6F1F0bDf9A263e1B1bB6e9759Ba182982377',
			blockNumber: 2650,
			transactionHash: '0x0ae92570560d64fa103c8be1861c8625d34ac560066398d9ad0d389ad5f7e441',
			transactionIndex: 0,
			blockHash: '0x3875c3f3120c1773c3adeb97260808c8a385bf8427bc203d10cbc5d262f67dbc',
			logIndex: 0,
			id: 'log_55296c9d',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				'1': '0x58746F9D739bC81713E5F5512529876F508a6166',
				'2': '2',
				owner: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				approved: '0x58746F9D739bC81713E5F5512529876F508a6166',
				tokenId: '2',
			},
			event: 'Approval',
			signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
			raw: {
				data: '0x',
				topics: [ '0x8c5be...', '0x00...afd', '0x00...166', '0x00...002' ],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.approve('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.approve('0x{address in hex}', 10).then(console.log)
```

## kip17.setApprovalForAll<a id="kip17-setApprovalforall"></a>

```javascript
kip17.setApprovalForAll(to, approved [, sendParam])
```

与えられたオペレータ `to` を承認するか、または与えられたオペレータが所有者のすべてのトークンを転送することを許可しない。

setApprovalForAllメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                    |
| --------- | ------ | ------------------------------------------------------------------------------------- |
| への        | ストリング  | 所有者の全トークンを譲渡するために承認/禁止されるアカウントのアドレス。                                                  |
| 承認済み      | ブーリアン  | この演算子は `true` なら承認される。 `false`の場合、演算子は許可されない。                                         |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.setApprovalForAll('0x{address in hex}', false, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x34379ac5b71f16f41d5171d021ca2945e02c60d9fb7f85fc0127262c2ce72b47',
	blockNumber: 3340,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x1f15b1a4da5437b29bfb7f248b5e344e6b16b654',
	...
	events: {
		ApprovalForAll: {
			address: '0x1f15B1A4DA5437b29BfB7f248B5e344E6b16b654',
			blockNumber: 3340,
			transactionHash: '0x72fdf23482b9cf164638e6cbdfdf56541a6189c88639e21f076a8a50ef749a50',
			transactionIndex: 0,
			blockHash: '0x34379ac5b71f16f41d5171d021ca2945e02c60d9fb7f85fc0127262c2ce72b47',
			logIndex: 0,
			id: 'log_1069ad22',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				'1': '0x399bE7034F26feFB5AE683e488903B8bE5ad38b8',
				'2': false,
				owner: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				operator: '0x399bE7034F26feFB5AE683e488903B8bE5ad38b8',
				approved: false,
			},
			event: 'ApprovalForAll',
			signature: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
			raw: {
				data: '0x0000000000000000000000000000000000000000000000000000000000000000',
				topics: [ '0x17307...', '0x00...afd', '0x00...8b8' ],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.setApprovalForAll('0x{address in hex}', false, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.setApprovalForAll('0x{address in hex}', true).then(console.log)
```

## kip17.transferFrom<a id="kip17-transferfrom"></a>

```javascript
kip17.transferFrom(from, to, tokenId [, sendParam])
```

与えられたトークン ID `tokenId` のトークンをトークン所有者の残高から別のアドレスに転送する。 トークン所有者のトークンを送信することを承認されたアドレス（オペレーター）またはトークン所有者自身が、このトークン転送トランザクションを実行することが期待されます。 したがって、認可されたアカウントまたはトークン所有者がこのトランザクションの送信者となり、そのアドレスは `sendParam.from` または `kip17Instance.options.from` で指定されなければならない。 `sendParam.from`と `kip17Instance.options.from` の両方が指定されない限り、エラーが発生する。 このメソッドの代わりに、可能な限り [safeTransferFrom](#kip17-safetransferfrom) を使用することを推奨する。

このトランザクションを送信すると、トランザクション送信者にトランザクション手数料が請求されることに注意。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                    |
| --------- | -------------- | ------------------------------------------------------------------------------------- |
| より        | ストリング          | 指定されたトークンの所有者または承認された運営者の住所。                                                          |
| への        | ストリング          | トークンを受け取るアカウントのアドレス。                                                                  |
| トークンID    | BigNumber \\ | 転送したいトークンのID。                                                                         |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

**注意** `tokenId` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x9cae3aa93d327804f333674a77d5d01d8c7908c49749b0d747b6391faa232b58',
	blockNumber: 3592,
	contractAddress: null,
	from: '0x9c4fc0ab840914a29c7deb5cc5c625a4cec3a9cd',
	...
	status: true,
	to: '0x6e611498570bbc8cb127899c4d24e156ec72473a',
	...
	events: {
		Transfer: {
			address: '0x6e611498570bBc8cb127899C4D24e156ec72473a',
			blockNumber: 3592,
			transactionHash: '0x386af961e5acda2c5bd58ec71ee52f579dc2b07a2e5ec97678453f04cc1b709a',
			transactionIndex: 0,
			blockHash: '0x9cae3aa93d327804f333674a77d5d01d8c7908c49749b0d747b6391faa232b58',
			logIndex: 0,
			id: 'log_c2ba5874',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				'1': '0x045796ABC035001CF50274FcA8A2614Abf5dd6bf',
				'2': '2',
				from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				to: '0x045796ABC035001CF50274FcA8A2614Abf5dd6bf',
				tokenId: '2',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x',
				topics: [ '0xddf25...', '0x00...afd', '0x00...6bf', '0x00...002' ],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2).then(console.log)
```

## kip17.safeTransferFrom<a id="kip17-safetransferfrom"></a>

```javascript
kip17.safeTransferFrom(from, to, tokenId [, data] [, sendParam])
```

与えられたトークン ID `tokenId` のトークンをトークン所有者の残高から別のアドレスに安全に転送する。 トークン所有者のトークンを送信することを承認されたアドレス（オペレーター）またはトークン所有者自身が、このトークン転送トランザクションを実行することが期待されます。 そのアドレスは `sendParam.from` または `kip17Instance.options.from` で指定されなければならない。したがって、認可されたアドレスまたはトークン所有者がこのトランザクションの送信者となるべきである。 `sendParam.from`と `kip17Instance.options.from` の両方が指定されない限り、エラーが発生する。

`to` がコントラクトアドレスの場合、[IKIP17Receiver.onKIP17Received](https://kips.kaia.io/KIPs/kip-17#wallet-interface) を実装しなければならない。 そうでなければ、移籍は取り消される。

このトランザクションを送信すると、トランザクション送信者にトランザクション手数料が請求されることに注意。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                    |
| --------- | -------------- | ------------------------------------------------------------------------------------- |
| より        | ストリング          | 指定されたトークンの所有者または承認された運営者の住所。                                                          |
| への        | ストリング          | トークンを受け取るアカウントのアドレス。                                                                  |
| トークンID    | BigNumber \\ | 転送したいトークンのID。                                                                         |
| データ       | Buffer \\    | (オプション) 呼とともに送信するオプションのデータ。                                        |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

**注意** `tokenId` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 9, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x14c5bebc2be86081d8375ba11edba0e541be1df24c1beced1a9e82e3083a8035',
	blockNumber: 6260,
	contractAddress: null,
	from: '0x80b88b47361cec0baee1947868fc872b784cf91e',
	...
	status: true,
	to: '0xa9066e2b62483bcdf6358874cb87f9e0046e8ad3',
	...
	events: {
		Transfer: {
			address: '0xA9066e2B62483bcdf6358874CB87f9e0046E8ad3',
			blockNumber: 6260,
			transactionHash: '0x0a92436289e70018f9ebef0df5d3ce87874afd8e5058fcc08fefc6de3e0e9b36',
			transactionIndex: 0,
			blockHash: '0x14c5bebc2be86081d8375ba11edba0e541be1df24c1beced1a9e82e3083a8035',
			logIndex: 0,
			id: 'log_c9c17595',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				'1': '0x0F47Ea1A10B8F7D61c894E392EfaC990A314d313',
				'2': '9',
				from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				to: '0x0F47Ea1A10B8F7D61c894E392EfaC990A314d313',
				tokenId: '9',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x',
				topics: [ '0xddf25...', '0x00...afd', '0x00...313', '0x00...009' ],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 9, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```

## kip17.addMinter<a id="kip17-addminter"></a>

```javascript
kip17.addMinter(account [, sendParam])
```

トークンの鋳造を許可された鋳造者としてのアカウントを追加する。

addMinterメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                    |
| --------- | ------ | ------------------------------------------------------------------------------------- |
| アカウント     | ストリング  | マイナーとして追加される口座のアドレス。                                                                  |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip17.options.from` が指定された場合、それは minter でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xecd0fb45a32323d5cb14558d1d9299393022d5e7284519598dbd8b14c4c55930',
	blockNumber: 8307,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x1595b5c1027ed36dcb32e4d39766b896d5b97ecb',
	...
	events: {
		MinterAdded: {
			address: '0x1595b5c1027ed36dCB32e4D39766b896d5B97ecb',
			blockNumber: 8307,
			transactionHash: '0xf8da21958c84aa3ed8bfa5eea0649c5b9a895efa8c7a715196e000bef4f0b8bd',
			transactionIndex: 0,
			blockHash: '0xecd0fb45a32323d5cb14558d1d9299393022d5e7284519598dbd8b14c4c55930',
			logIndex: 0,
			id: 'log_f40a92bf',
			returnValues: {
				'0': '0x90170C1E7E8C14BBf1124f52980372088BA540Dc',
				account: '0x90170C1E7E8C14BBf1124f52980372088BA540Dc',
			},
			event: 'MinterAdded',
			signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
			raw: {
				data: '0x',
				topics: [ '0x6ae17...', '0x00...0dc' ],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.addMinter('0x{address in hex}').then(console.log)
```

## kip17.renounceMinter<a id="kip17-renounceminter"></a>

```javascript
kip17.renounceMinter([sendParam])
```

トークン造幣権を放棄。 鋳造権を放棄できるのは、鋳造者の住所のみである。

renounceMinterメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                    |
| --------- | ------ | ------------------------------------------------------------------------------------- |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

もし `sendParam.from` または `kip17.options.from` が与えられたなら、それは MinterRole を持つ minter でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xe130d7ee71a2c55b3cf4e2bce9ea26e7c2cde556c7f8288abac60121b27c26c8',
	blockNumber: 8542,
	contractAddress: null,
	from: '0xb72f5cf2627e6614984d8a9f27ee426b29191831',
	...
	status: true,
	to: '0xf9d0663fc29c48495f42c0b061cb06df6df76c34',
	...
	events: {
		MinterRemoved: {
			address: '0xF9D0663fC29c48495F42c0b061cB06Df6DF76c34',
			blockNumber: 8542,
			transactionHash: '0x557a4e7b9fd6577ffdb14c2e1f00c0009a7bbda2294502fa765250632b5b0f99',
			transactionIndex: 0,
			blockHash: '0xe130d7ee71a2c55b3cf4e2bce9ea26e7c2cde556c7f8288abac60121b27c26c8',
			logIndex: 0,
			id: 'log_04b47645',
			returnValues: {
				'0': '0xB72F5cF2627e6614984D8A9F27eE426b29191831',
				account: '0xB72F5cF2627e6614984D8A9F27eE426b29191831',
			},
			event: 'MinterRemoved',
			signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
			raw: {
				data: '0x',
				topics: [ '0xe9447...', '0x00...831' ],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.renounceMinter().then(console.log)
```

## kip17.mintWithTokenURI<a id="kip17-mintwithtokenuri"></a>

```javascript
kip17.mintWithTokenURI(to, tokenId, tokenURI [, sendParam])
```

与えられたuriを持つトークンを作成し、それらを与えられたアカウントに割り当てます。 この方法は、このトークンの総供給量を増加させる。

mintWithTokenURIメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求することに注意してください。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                    |
| --------- | -------------- | ------------------------------------------------------------------------------------- |
| への        | ストリング          | トークンが発行されるアカウントのアドレス。                                                                 |
| トークンID    | BigNumber \\ | 造幣されるトークンのID。                                                                         |
| トークンURI   | ストリング          | 造幣するトークンのURI文字列。                                                                      |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

**注意** `tokenId` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**注意** `sendParam.from` または `kip17.options.from` が指定された場合、MinterRole を持つ minter でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xd2473b9853ad33c5fa0a75187e65733614ed4f8c937d06e239768a5ca32d7c7f',
	blockNumber: 9313,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x7fbf73709054007f5262692f8faf27dee75ab3a6',
	...
	events: {
		Transfer: {
			address: '0x7FBf73709054007f5262692f8FaF27dEE75Ab3A6',
			blockNumber: 9313,
			transactionHash: '0x17c2eda25c8a817915e3dd77b4fb4838259e8b49ae1c0d8e369167f715a08e7f',
			transactionIndex: 0,
			blockHash: '0xd2473b9853ad33c5fa0a75187e65733614ed4f8c937d06e239768a5ca32d7c7f',
			logIndex: 0,
			id: 'log_d060e77e',
			returnValues: {
				'0': '0x0000000000000000000000000000000000000000',
				'1': '0x203ad91221290901CFDAC9399aCf664499924744',
				'2': '18',
				from: '0x0000000000000000000000000000000000000000',
				to: '0x203ad91221290901CFDAC9399aCf664499924744',
				tokenId: '18',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x',
				topics: [ '0xddf25...', '0x00...000', '0x00...744', '0x00...012' ],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI).then(console.log)
```

## キップ17.バーン<a id="kip17-burn"></a>

```javascript
kip17.burn(tokenId [, sendParam])
```

与えられたトークンIDのトークンを破棄します。 sendParam.from`や`kip17.options.from\`を指定しないとエラーになる。

burnメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                    |
| --------- | -------------- | ------------------------------------------------------------------------------------- |
| トークンID    | BigNumber \\ | 破棄されるトークンのID。                                                                         |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

**注意** `tokenId` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.burn(14, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x09d8ed5582fdd1c39b0f19f14f065659fe275a60856d86a1840535f6df1a2d51',
	blockNumber: 18237,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x2032e61c79a951aacef8033adca96fc3b9b747b4',
	...
	events: {
		Transfer: {
			address: '0x2032e61C79A951AACEf8033AdCa96fC3b9b747b4',
			blockNumber: 18237,
			transactionHash: '0x4e377d8d65c8565c7bc91568bcdcc0fddeb46a02a778725e437f368a8d9c6165',
			transactionIndex: 0,
			blockHash: '0x09d8ed5582fdd1c39b0f19f14f065659fe275a60856d86a1840535f6df1a2d51',
			logIndex: 0,
			id: 'log_5af49695',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				'1': '0x0000000000000000000000000000000000000000',
				'2': '14',
				from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				to: '0x0000000000000000000000000000000000000000',
				tokenId: '14',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x',
				topics: [ '0xddf25...', '0x00...afd', '0x00...000', '0x00...00e' ],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.burn(14, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.burn(14).then(console.log)
```

## kip17.pause<a id="kip17-pause"></a>

```javascript
kip17.pause([sendParam])
```

トークンの送信に関連する機能を一時停止する。

pauseメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                    |
| --------- | ------ | ------------------------------------------------------------------------------------- |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip17.options.from` が与えられた場合、PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.pause({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xd73c026474b2077a04808ed0ce6713821eaa8afaed476b19d22b28e483747e04',
	blockNumber: 19826,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x601c11f396e92436df8d9bbaff3fbfec906b7f67',
	...
	events: {
		Paused: {
			address: '0x601C11F396E92436Df8d9bBAFf3fbfEc906B7f67',
			blockNumber: 19826,
			transactionHash: '0x549f7786ca5d2c1877be20126fc51c2418194ecaa8cea536d08f72c2f01919d0',
			transactionIndex: 0,
			blockHash: '0xd73c026474b2077a04808ed0ce6713821eaa8afaed476b19d22b28e483747e04',
			logIndex: 0,
			id: 'log_93d26310',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				account: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
			},
			event: 'Paused',
			signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
			raw: {
				data: '0x0000000000000000000000001147c04b90d1546d76983e19937ad2cdae8b8afd',
				topics: ['0x62e78...'],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.pause().then(console.log)
```

## kip17.unpause<a id="kip17-unpause"></a>

```javascript
kip17.unpause([sendParam])
```

一時停止していた契約を再開する。

unpauseメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求することに注意してください。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                    |
| --------- | ------ | ------------------------------------------------------------------------------------- |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip17.options.from` が与えられた場合、PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.unpause({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x6a9fc0c70853e696e687b119ba95971a42d91616a040ec17afe1fd4803f5a6cb',
	blockNumber: 19845,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x601c11f396e92436df8d9bbaff3fbfec906b7f67',
	...
	events: {
		Unpaused: {
			address: '0x601C11F396E92436Df8d9bBAFf3fbfEc906B7f67',
			blockNumber: 19845,
			transactionHash: '0x4f0d2767fc36e5062a34753bc447a2c15b476c304f8e9e013ddf06124db33229',
			transactionIndex: 0,
			blockHash: '0x6a9fc0c70853e696e687b119ba95971a42d91616a040ec17afe1fd4803f5a6cb',
			logIndex: 0,
			id: 'log_364c25d2',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				account: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
			},
			event: 'Unpaused',
			signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
			raw: {
				data: '0x0000000000000000000000001147c04b90d1546d76983e19937ad2cdae8b8afd',
				topics: ['0x5db9e...'],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.unpause().then(console.log)
```

## kip17.addPauser<a id="kip17-addpauser"></a>

```javascript
kip17.addPauser(account [, sendParam])
```

契約を一時停止する権利を持つアカウントを一時停止者として追加する。

addPauserメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                    |
| --------- | ------ | ------------------------------------------------------------------------------------- |
| アカウント     | ストリング  | 新しいパウザーとなるアカウントのアドレス。                                                                 |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip17.options.from` が与えられた場合、PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xd9f18912c9666a67a2e7445af0abe5140212955b3d35c491e5475d512fdee7d5',
	blockNumber: 20502,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x4010afbfbf8d94830b226fc5ff311859af806b90',
	...
	events: {
		PauserAdded: {
			address: '0x4010afbfbF8d94830b226Fc5ff311859AF806B90',
			blockNumber: 20502,
			transactionHash: '0x5f6fef2df70dcbe67e6d74e201005b618da5d53ac2f85ad31fce39226fd1b70b',
			transactionIndex: 0,
			blockHash: '0xd9f18912c9666a67a2e7445af0abe5140212955b3d35c491e5475d512fdee7d5',
			logIndex: 0,
			id: 'log_bf9f8982',
			returnValues: {
				'0': '0xD050b56bB04Da257D144e6b382318A2B8c58b0B2',
				account: '0xD050b56bB04Da257D144e6b382318A2B8c58b0B2',
			},
			event: 'PauserAdded',
			signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
			raw: {
				data: '0x',
				topics: [ '0x6719d...', '0x00...0b2' ],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.addPauser('0x{address in hex}').then(console.log)
```

## kip17.renouncePauser<a id="kip17-renouncepauser"></a>

```javascript
kip17.renouncePauser([sendParam])
```

契約を一時停止する権利を放棄する。 一時停止の権利を放棄できるのは、一時停止者のアドレスだけである。

renouncePauserメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                    |
| --------- | ------ | ------------------------------------------------------------------------------------- |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve]のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip17.options.from` が与えられた場合、PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP-17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip17.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x32bb338ca23846478934416d1b1f4152b69a49411d61b316cff8b3a7d62ca91e',
	blockNumber: 20512,
	contractAddress: null,
	from: '0xe04cb220e94e6595427568c954b5d819392813bc',
	...
	status: true,
	to: '0x4010afbfbf8d94830b226fc5ff311859af806b90',
	...
	events: {
		PauserRemoved: {
			address: '0x4010afbfbF8d94830b226Fc5ff311859AF806B90',
			blockNumber: 20512,
			transactionHash: '0x72982fa8a8de25c961cd19bd91aa7acf0111feb8e9026e607d89843bcd8f783a',
			transactionIndex: 0,
			blockHash: '0x32bb338ca23846478934416d1b1f4152b69a49411d61b316cff8b3a7d62ca91e',
			logIndex: 0,
			id: 'log_0a9d1350',
			returnValues: {
				'0': '0xE04cB220e94E6595427568c954b5D819392813bC',
				account: '0xE04cB220e94E6595427568c954b5D819392813bC',
			},
			event: 'PauserRemoved',
			signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
			raw: {
				data: '0x',
				topics: [ '0xcd265...', '0x00...3bc' ],
			},
		},
	},
}

// Using FD transaction to execute the smart contract
> kip17.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.renouncePauser().then(console.log)
```

[getTransactionReceipt]: ../caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt
[approve]: #kip17-approve
