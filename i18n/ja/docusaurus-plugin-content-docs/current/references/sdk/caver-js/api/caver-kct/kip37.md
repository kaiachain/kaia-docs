# caver.kct.kip37

caver.kct.kip37\`は、kaiaブロックチェーンプラットフォーム(kaia)上のJavaScriptオブジェクトとしてKIP-37を実装したスマートコントラクトを簡単に処理するのに役立つ。

caver.kct.kip37`は[caver.contract](../caver.contract.md)を継承し、KIP-37トークンコントラクトを実装する。 `caver.kct.kip37`は`caver.contract`と同じプロパティを保持しているが、追加機能のために追加のメソッドが実装されている。 ここでは `caver.kct.kip37\` の新しく追加されたメソッドのみを紹介する。

caver-jsにKIP-37を実装したコードは、[Kaia Contracts Github Repo](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP37)で入手可能です。 KIP-37 for caver-jsがOwnableインターフェイスをサポート。 これを使用すると、コントラクトのデプロイ時にコントラクト所有者を指定できます。

KIP-37の詳細については、[カイア改善提案](https://kips.kaia.io/KIPs/kip-37)を参照のこと。

**NOTE** `caver.kct.kip37` は caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7) からサポートされています。

## caver.kct.kip37.deploy <a id="caver-klay-kip37-deploy"></a>

```javascript
caver.kct.kip37.deploy(tokenInfo, deployer)
```

KIP-37トークンコントラクトをkaiaブロックチェーンに展開する。 caver.kct.kip37.deployを使用してデプロイされたコントラクトは、KIP-37標準に従ったマルチトークンである。

デプロイに成功すると、プロミスは新しいKIP37インスタンスで解決される。

**パラメーター**

| 名称      | タイプ         | 説明                                                                                                                                                                                                                                                                                                                                                      |
| ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| トークン情報  | オブジェクト      | KIP-37トークンコントラクトをkaiaブロックチェーン上に展開するために必要な情報。 詳細は下表を参照。                                                                                                                                                                                                                                                                                                  |
| ディプロイヤー | string \\ | KIP-37トークンコントラクトをデプロイするキーリング・インスタンスのアドレス。 このアドレスは、展開するのに十分なKAIAを持っていなければならない。 詳しくは[キーホルダー](../caver-wallet/keyring.md#caver-wallet-keyring)を参照。 トランザクション送信時に使用する独自のフィールドを定義したい場合は、オブジェクト・タイプをパラメータとして渡すことができる。 また、KIP-37コントラクトをデプロイする際に料金委譲を使用したい場合は、オブジェクトに料金委譲に関連するフィールドを定義することができます。 オブジェクトに定義できるフィールドについては、[create](#kip37-create) のパラメータの説明を参照のこと。 |

tokenInfoオブジェクトには、以下を含める必要があります：

| 名称 | タイプ   | 説明                                                                                                                                                                                            |
| -- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ウリ | ストリング | トークン・タイプID置換メカニズム](http://kips.klaytn.foundation/KIPs/kip-37#metadata)に依存して、すべてのトークン・タイプのためのURI。 |

**リターン・バリュー**

`PromiEvent`：新しい KIP37 インスタンスで解決される、プロミスを組み合わせたイベントエミッター。 さらに、以下のような出来事も起こりうる：

| 名称           | タイプ    | 説明                                                                                                                                                       |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| トランザクションハッシュ | ストリング  | トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。                                                                                                             |
| レシート         | オブジェクト | トランザクションのレシートが利用可能になったときに発行されます。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]を参照してください。 KIP37インスタンスからの受信は、abi経由で解析される'logs'属性の代わりに'events'属性を持つ。 |
| エラー          | エラー    | 送信中にエラーが発生した場合に発行される。                                                                                                                                    |

**トークン登録**

1. ブロック・エクスプローラーにトークンを登録するには、コントラクト作成者が提出要求フォームに記入する必要がある。 フォームに必要な指定情報をメモする。

2. スマートコントラクト環境

   - コンパイラの種類ソリディティ

   - コンパイラバージョン：v0.8.4+commit.c7e474f2

   - オープンソースライセンスMIT

3. スマート・コントラクトの詳細

   - 最適化：--optimize-run 200

   - ソースコード[KIP37 Contracts Github Link](https://github.com/kaiachain/caver-js/blob/dev/packages/caver-kct/src/kip37Token.sol).

4. ABI エンコードされた値：[kip37JsonInterface at dev - kaiachain/caver-js - GitHub](https://github.com/kaiachain/caver-js/blob/dev/packages/caver-kct/src/kctHelper.js#L1329-L2374)

**例**

```javascript
// using the promise
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}').then(console.log)
KIP37 {
    ...
    _address: '0x7314B733723AA4a91879b15a6FEdd8962F413CB2',
    _jsonInterface: [
        ...
        {
            anonymous: false,
            inputs: [{ indexed: false, name: 'value', type: 'string' }, { indexed: true, name: 'id', type: 'uint256' }],
            name: 'URI',
            type: 'event',
            signature: '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b',
        }
    ] 
}

// Send object as second parameter
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP37Instance) {
    console.log(newKIP37Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip37.detectInterface <a id="caver-kct-kip37-detectinterface"></a>

```javascript
caver.kct.kip37.detectInterface(契約アドレス)
```

トークンコントラクトが実装しているインターフェースの情報を返します。 この静的関数は [kip37.detectInterface](#kip37-detectinterface) を使用する。

**パラメーター**

| 名称   | タイプ   | 説明                    |
| ---- | ----- | --------------------- |
| 契約住所 | ストリング | KIP-37トークンコントラクトのアドレス |

**リターン・バリュー**

`Promise` は各 [KIP-37 インタフェース](https://kips.kaia.io/KIPs/kip-37#kip-13-identifiers) が実装されているかどうかをブール値で表した結果を含む `オブジェクト` を返す。

**例**

```javascript
> caver.kct.kip37.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}.
```

## caver.kct.kip37.create <a id="caver-kct-kip37-create"></a>

```javascript
caver.kct.kip37.create([tokenAddress])
```

バインドされたメソッドとイベントを持つ新しい KIP37 インスタンスを作成します。 この関数は[new KIP37](#new-kip37)と同じ働きをする。

**NOTE** `caver.kct.kip37.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメーター**

new KIP37](#new-kip37)を参照。

**リターン・バリュー**

new KIP37](#new-kip37)を参照。

**例**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = caver.kct.kip37.create()

// Create a KIP37 instance with a token address
> const kip37 = caver.kct.kip37.create('0x{address in hex}')
```

## 新しいKIP37<a id="new-kip37"></a>

```javascript
new caver.kct.kip37([tokenAddress])
```

バインドされたメソッドとイベントを持つ新しい KIP37 インスタンスを作成します。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                                              |
| -------- | ----- | --------------------------------------------------------------------------------------------------------------- |
| トークンアドレス | ストリング | (オプション) KIP-37 のトークンコントラクトのアドレス。これは後で `kip37.options.address = '0x1234...'` によって割り当てることができる。 |

**リターン・バリュー**

| タイプ    | 説明                               |
| ------ | -------------------------------- |
| オブジェクト | KIP37のインスタンスとそのバインドされたメソッドとイベント。 |

**例**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = new caver.kct.kip37()

// Create a KIP37 instance with a token address
> const kip37 = new caver.kct.kip37('0x{address in hex}')
```

## kip37.クローン<a id="kip37-clone"></a>

```javascript
kip37.clone([tokenAddress])
```

現在のKIP37インスタンスをクローンする。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                           |
| -------- | ----- | -------------------------------------------------------------------------------------------- |
| トークンアドレス | ストリング | (オプション）別のKIP37トークンをデプロイしたスマートコントラクトのアドレス。 省略された場合は、元のインスタンスの契約アドレスが設定される。 |

**リターン・バリュー**

| タイプ    | 説明                      |
| ------ | ----------------------- |
| オブジェクト | オリジナルのKIP37インスタンスのクローン。 |

**例**

```javascript
> const kip37 = new caver.kct.kip37(address)

// Clone without a parameter
> const cloned = kip37.clone()

// Clone with the address of the new token contract
> const cloned = kip37.clone('0x{address in hex}')
```

## kip37.detectInterface<a id="kip37-detectinterface"></a>

```javascript
kip37.detectInterface()
```

トークンコントラクトが実装しているインターフェースの情報を返します。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は各 [KIP-37 インタフェース](https://kips.kaia.io/KIPs/kip-37#kip-13-identifiers) が実装されているかどうかをブール値で表した結果を含む `オブジェクト` を返す。

**例**

```javascript
> kip37.detectInterface().then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}.
```

## kip37.supportsInterface<a id="kip37-supportsinterface"></a>

```javascript
kip37.supportsInterface(interfaceId)
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
> kip37.supportsInterface('0x6433ca1f').then(console.log)
true

> kip37.supportsInterface('0x3a2820fe').then(console.log)
false
```

## kip37.uri<a id="kip37-uri"></a>

```javascript
kip37.uri(id)
```

指定されたトークンの明確な Uniform Resource Identifier (URI) を返します。

文字列 `{id}` がURI内に存在する場合、この関数はこれを実際のトークンIDに16進数で置き換えます。
KIP-34メタデータ](http://kips.klaytn.foundation/KIPs/kip-37#metadata)をご参照ください。

**パラメーター**

| 名称   | タイプ            | 説明                 |
| ---- | -------------- | ------------------ |
| アイドル | BigNumber \\ | uriを取得するためのトークンID。 |

**注意** `id` パラメータは `number` 型を受け付けるが、与えられた値がnumber.MAX_SAFE_INTEGERで制限された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `string` を返す：トークンの uri。

**例**

```javascript
> kip37.uri('0x0').then(console.log)
'https://caver.example/0000000000000000000000000000000000000000000000000000000000000000.json'
```

## kip37.totalSupply<a id="kip37-totalsupply"></a>

```javascript
kip37.totalSupply(id)
```

特定のトークンの総供給量を返します。

**パラメーター**

| 名称   | タイプ            | 説明                |
| ---- | -------------- | ----------------- |
| アイドル | BigNumber \\ | トークンIDは総供給量を表示する。 |

**注意** `id` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `BigNumber` を返す：トークンの総数。

**例**

```javascript
> kip37.totalSupply(0).then(console.log)
10000000000
```

## kip37.balanceOf<a id="kip37-balanceof"></a>

```javascript
kip37.balanceOf(account, id)
```

アカウント`が所有するトークンタイプ `id\` のトークンの量を返す。

**パラメーター**

| 名称    | タイプ            | 説明                |
| ----- | -------------- | ----------------- |
| アカウント | ストリング          | 残高を確認したい口座のアドレス。  |
| アイドル  | BigNumber \\ | バランスを見るためのトークンID。 |

**注意** `id` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `BigNumber` を返す：そのアカウントが持っているトークンの量。

**例**

```javascript
> kip37.balanceOf('0x{address in hex}', 0).then(console.log)
20
```

## kip37.balanceOfBatch<a id="kip37-balanceofbatch"></a>

```javascript
kip37.balanceOfBatch(accounts, ids)
```

複数のアカウント／トークンのペアの残高を返します。 `balanceOfBatch`は[balanceOf](#kip37-balanceof)のバッチ操作であり、`accounts`と`ids`を持つ配列の長さは同じでなければならない。

**パラメーター**

| 名称    | タイプ | 説明                   |
| ----- | --- | -------------------- |
| アカウント | 配列  | 残高を確認したい口座のアドレス。     |
| 子供たち  | 配列  | バランスを見るためのトークンIDの配列。 |

**リターン・バリュー**

`Promise` は `Array` を返す：複数のアカウントとトークンのペアの残高。

**例**

```javascript
> kip37.balanceOfBatch(['0x{address in hex}', '0x{address in hex}'], [0, 1]).then(console.log)
[ 20, 30 ]。
```

## kip37.isMinter<a id="kip37-isminter"></a>

```javascript
kip37.isMinter(アドレス)
```

与えられたアカウントが新しい KIP37 トークンを発行できる採掘者であれば `true` を返す。

**パラメーター**

| 名称 | タイプ   | 説明                    |
| -- | ----- | --------------------- |
| 住所 | ストリング | 造幣権があるかどうかを確認する口座の住所。 |

**リターン・バリュー**

`Promise`は `boolean` を返す: アカウントが minter であれば `true` を返す。

**例**

```javascript
> kip37.isMinter('0x{address in hex}').then(console.log)
true

> kip37.isMinter('0x{address in hex}').then(console.log)
false
```

## kip37.isPauser<a id="kip37-ispauser"></a>

```javascript
kip37.isPauser(アドレス)
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
> kip37.isPauser('0x{address in hex}').then(console.log)
true

> kip37.isPauser('0x{address in hex}').then(console.log)
false
```

## kip37.paused<a id="kip37-paused"></a>

```javascript
kip37.paused()
```

トークンコントラクトのトランザクション（または特定のトークン）が一時停止されているかどうかを返します。

id パラメータが定義されていない場合、トークンコントラクトのトランザクションが一時停止されているかどうかを返します。 id パラメータが定義されている場合、特定のトークンが一時停止しているかどうかを返します。

**パラメーター**

| 名称   | タイプ            | 説明                                                                                                        |
| ---- | -------------- | --------------------------------------------------------------------------------------------------------- |
| アイドル | BigNumber \\ | (オプション) 一時停止しているかどうかをチェックするトークンID。 このパラメータが省略された場合、`paused`関数はコントラクトが一時停止状態にあるかどうかを返す。 |

**注意** `id` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で上限が設定された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `boolean` を返します: 契約 (または特定のトークン) が一時停止していれば `true` を返します。

**例**

```javascript
// トークン ID パラメータなし
> kip37.paused().then(console.log)
true
> kip37.paused().then(console.log)
false

// トークン ID パラメータあり
> kip37.paused(0).then(console.log)
true
> kip37.paused(1).then(console.log)
false
```

## kip37.isApprovedForAll<a id="kip37-isApprovedforall"></a>

```javascript
kip37.isApprovedForAll(owner, operator)
```

指定された所有者のオペレーターの承認ステータスを照会します。 オペレータが指定された所有者に承認されている場合に `true` を返す。

**パラメーター**

| 名称     | タイプ   | 説明         |
| ------ | ----- | ---------- |
| 所有者    | ストリング | オーナーの住所    |
| オペレーター | ストリング | オペレーターの住所。 |

**リターン・バリュー**

`Promise`は `boolean` を返す：オペレータが承認されれば真、承認されなければ偽

**例**

```javascript
> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true

> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false
```

## kip37.クリエイト<a id="kip37-create"></a>

```javascript
kip37.create(id, initialSupply [, uri] [, sendParam])
```

新しいトークン型を作成し、 `initialSupply` を minter に代入する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ            | 説明                                                         |
| --------- | -------------- | ---------------------------------------------------------- |
| アイドル      | BigNumber \\ | 作成するトークンID。                                                |
| イニシャルサプライ | BigNumber \\ | 鋳造されるトークンの量。                                               |
| ウリ        | ストリング          | (オプション) 作成されたトークンのトークン URI。             |
| sendParam | オブジェクト         | (オプション) トランザクション送信に必要なパラメータを保持するオブジェクト。 |

**注意** `id` と `initialSupply` パラメータは `number` 型を受け付けるが、入力された値が number.MAX_SAFE_INTEGER で指定された範囲外の場合、予期しない結果やエラーが発生する可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

`sendParam`オブジェクトは以下を含む：

| 名称         | タイプ         | 説明                                                                                                                                                                                              |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| より         | ストリング       | (オプション) トランザクションの送信元アドレス。 省略された場合は `kip37.options.from` によって設定される。 もし `sendParam` オブジェクトの `from` と `kip37.options.from` のどちらも指定されていない場合、エラーが発生する。                            |
| ガス         | number \\ | (オプション）このトランザクションで提供されるガスの最大数（ガスリミット）。 省略された場合は、`kip37.methods.approve(spender, amount).estimateGas({from})` を呼び出すことでcaver-jsによって設定されます。                                     |
| ガス価格       | number \\ | (オプション) このトランザクションのガス価格（peb）。 省略した場合は、caver-js が `caver.klay.getGasPrice` を呼び出して設定する。                                                                                        |
| 価値         | number \\ | (オプション) peb で転送される値。                                                                                                                                                         |
| フィーデレゲーション | ブーリアン       | (オプション、デフォルト `false`) フィー委任トランザクションを使用するかどうか。 省略された場合は `kip37.options.feeDelegation` が使用される。 両方が省略された場合、料金委譲は行われない。                                                          |
| 料金支払者      | ストリング       | (オプション）取引手数料を支払う手数料支払人の住所。 `feeDelegation`が `true` のとき、その値はトランザクションの `feePayer` フィールドに設定される。 省略された場合は `kip37.options.feePayer` が使用される。 両方が省略された場合はエラーを投げる。                   |
| 手数料率       | ストリング       | (任意）手数料支払者が負担する取引手数料の比率。 `feeDelegation`が `true` で、`feeRatio`に有効な値が設定されている場合、部分的な料金委譲トランザクショ ンが使用される。 有効範囲は1～99。 0や100以上の比率は許されない。 省略された場合は `kip37.options.feeRatio` が使用される。 |

**NOTE** `feeDelegation`、`feePayer`、`feeRatio` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.create(2, '1000000000000000000', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
    blocknumber: 2823,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 2823,
            transactionHash: '0xee8cdaa0089681d90a52c1539e75c6e26b3eb67affd4fbf70033ba010a3f0d26',
            transactionIndex: 0,
            blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
            logIndex: 0,
            id: 'log_ca64e74b',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '3': '2',
                '4': '1000000000000000000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                id: '2',
                value: '1000000000000000000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x...40000',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...f48' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.create(2, '1000000000000000000', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.create(2, '1000000000000000000').then(console.log)
```

## kip37.setApprovalForAll<a id="kip37-setApprovalforall"></a>

```javascript
kip37.setApprovalForAll(operator, approved [, sendParam])
```

指定されたオペレータが所有者のすべてのトークンを転送することを承認するか、または拒否します。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                                             |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| オペレーター    | ストリング  | 所有者の全トークンを譲渡するために承認/禁止されるアカウントのアドレス。                                                                                                           |
| 承認済み      | ブーリアン  | この演算子は `true` なら承認される。 `false`の場合、演算子は許可されない。                                                                                                  |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.setApprovalForAll('0x{address in hex}', true, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
	blockNumber: 3289,
	contractAddress: null,
	from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
	...
	status: true,
	to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
	...
	events: {
        ApprovalForAll: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3289,
            transactionHash: '0x5e94aa4af5f7604f1b32129fa8463c43cae4ff118f80645bfabcc6181667b8ab',
            transactionIndex: 0,
            blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
            logIndex: 0,
            id: 'log_b1f9938f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '2': true,
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                operator: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                approved: true,
            },
            event: 'ApprovalForAll',
            signature: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
            raw: {
                data: '0x00...001',
                topics: [ '0x17307...', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.setApprovalForAll('0x{address in hex}', true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.setApprovalForAll('0x{address in hex}', true).then(console.log)
```

## kip37.safeTransferFrom<a id="kip37-safetransferfrom"></a>

```javascript
kip37.safeTransferFrom(from, recipient, id, amount, data [, sendParam])
```

指定したトークン `id` 型の `amount` トークンを `from` から `recipient` に安全に転送する。

トークン所有者のトークンを送信することを承認されたアドレス（オペレータ）またはトークン所有者自身が、このトークン転送トランザクションを実行することが期待される。 したがって、認可されたアドレスまたはトークン所有者がこのトランザク ションの送信者となり、そのアドレスは `sendParam.from` または `kip37.options.from` で指定されなければならない。 `sendParam.from`と`kip37.options.from`の両方が指定されない限り、エラーが発生する。

受信者が契約アドレスの場合、[IKIP37Receiver.onKIP37Received](https://kips.kaia.io/KIPs/kip-37#kip-37-token-receiver) を実装する必要がある。 そうでなければ、移籍は取り消される。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                                             |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| より        | ストリング          | 手当メカニズムで送信されるトークンを所有するアカウントのアドレス。                                                                                                              |
| 受取人       | ストリング          | トークンを受け取るアカウントのアドレス。                                                                                                                           |
| アイドル      | BigNumber \\ | 転送するトークンID。                                                                                                                                    |
| 量         | BigNumber \\ | 転送したいトークンの量。                                                                                                                                   |
| データ       | Buffer \\    | (オプション) 呼とともに送信するオプションのデータ。                                                                                                 |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**注意** `id` と `amount` パラメータは `number` 型を受け付けるが、入力された値が number.MAX_SAFE_INTEGER で指定された範囲外の場合、予期しない結果やエラーが発生する可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
    blocknumber: 3983,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3983,
            transactionHash: '0x0efc60b88fc55ef37eafbd18057404334dfd595ce4c2c0ff75f0922b928735e7',
            transactionIndex: 0,
            blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
            logIndex: 0,
            id: 'log_cddf554f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, 'data' { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000).then(console.log)
```

## kip37.safeBatchTransferFrom<a id="kip37-safebatchtransferfrom"></a>

```javascript
kip37.safeBatchTransferFrom(from, recipient, id, amounts, data [, sendParam])
```

複数のトークン ID と値を `from` から `recipient` へ安全に一括転送する。

トークン所有者のトークンを送信することを承認されたアドレス（オペレーター）またはトークン所有者自身が、このトークン転送トランザクションを実行することが期待されます。 したがって、承認されたアドレスまたはトークン所有者は、`sendParam.from`または `kip37.options.from`でアドレスを指定されたトランザクションの送信者でなければならない。 `sendParam.from`と`kip37.options.from`の両方が指定されない限り、エラーが発生する。

受信者が契約アドレスの場合、[IKIP37Receiver.onKIP37Received](https://kips.kaia.io/KIPs/kip-37#kip-37-token-receiver) を実装する必要がある。 そうでなければ、移籍は取り消される。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ         | 説明                                                                                                                                             |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| より        | ストリング       | 手当メカニズムで送信されるトークンを所有するアカウントのアドレス。                                                                                                              |
| 受取人       | ストリング       | トークンを受け取るアカウントのアドレス。                                                                                                                           |
| 子供たち      | 配列          | 転送するトークンIDの配列。                                                                                                                                 |
| 金額        | 配列          | 転送したいトークン量の配列。                                                                                                                                 |
| データ       | Buffer \\ | (オプション) 呼とともに送信するデータ。                                                                                                       |
| sendParam | オブジェクト      | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**注意** `ids` と `amounts` の配列パラメータは、配列の要素として `number` 型を受け付けるが、入力された値が number.MAX_SAFE_INTEGER で指定された範囲外であった場合、予期しない結果やエラーが発生する可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
    blocknumber: 4621,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 4621,
            transactionHash: '0x557213eef8ae096bc35f5b3bee0e7cf87ecd87129b4a16d4e35a7356c341dad8',
            transactionIndex: 0,
            blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
            logIndex: 0,
            id: 'log_b050bacc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['10', '1000'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['10', '1000'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...3e8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], 'data', { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000]).then(console.log)
```

## kip37.mint<a id="kip37-mint"></a>

```javascript
kip37.mint(to, id, value [, sendParam])
```

特定のトークンタイプ `id` のトークンをミントし、変数 `to` と `value` に従ってトークンを割り当てる。 mint関数は、`to`と`value`に配列をパラメータとして渡すことで、特定のトークンを一度に複数のアカウントにミントすることができます。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                                             |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| への        | string \\    | トークンを発行するアカウントのアドレス、またはアドレスの配列。                                                                                                                |
| アイドル      | BigNumber \\ | ミントのトークンID。                                                                                                                                    |
| 価値        | BigNumber \\ | 鋳造されるトークンの量。 複数のアドレスを含む配列が `to` パラメータに渡される場合、値は配列の形式で渡されなければならない。                                                                              |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**注意** `id` と `value` パラメータは `number` 型を受け付けるが、与えられた値が number.MAX_SAFE_INTEGER で指定された範囲外であった場合、予期しない結果やエラーが発生する可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**注意** `sendParam.from` または `kip37.options.from` が指定された場合、MinterRole を持つ minter でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given (Mint the specific tokens to a account)
> kip37.mint('0x{address in hex}', 2, 1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
    blocknumber: 12868,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 12868,
            transactionHash: '0xed25e305904e6efb613a6fe8b7370488554f6508b6701e9a0167c95d341c73dc',
            transactionIndex: 0,
            blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
            logIndex: 0,
            id: 'log_04dffde1',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// Send via a sendParam object with the from field given (Mint the specific tokens to the multiple accounts)
> kip37.mint(['0x{address in hex}', '0x{address in hex}'], 2, [1, 2], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
    blocknumber: 13378,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: [
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 0,
                id: 'log_6975145c',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    '3': '2',
                    '4': '1',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    id: '2',
                    value: '1',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x00...001',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
                },
            },
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 1,
                id: 'log_7fcd4837',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    '3': '2',
                    '4': '2',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    id: '2',
                    value: '2',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x000...002',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...3c4' ],
                },
            },
        ],
    },
}

// Using FD transaction to execute the smart contract
> kip37.mint('0x{address in hex}', 2, 1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mint('0x{address in hex}', 2, 1000).then(console.log)
```

## kip37.mintBatch<a id="kip37-mintbatch"></a>

```javascript
kip37.mintBatch(to, ids, values [, sendParam])
```

特定のトークン型 `ids` の複数の KIP-37 トークンを一括してミントし、変数 `to` と `values` に従ってトークンを割り当てる。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                                             |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| への        | ストリング  | 鋳造されたトークンが発行されるアカウントのアドレス。                                                                                                                     |
| 子供たち      | 配列     | ミントするトークンIDの配列。                                                                                                                                |
| 価値観       | 配列     | ミントのトークン量の配列。                                                                                                                                  |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**注意** `ids` と `values` の配列パラメータは、配列の要素として `number` 型を受け付けるが、入力された値が number.MAX_SAFE_INTEGER で指定された範囲外であった場合、予期しない結果やエラーが発生する可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**注意** `sendParam.from` または `kip37.options.from` が指定された場合、MinterRole を持つ minter でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
    blocknumber: 13981,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 13981,
            transactionHash: '0x3e2ddc38210eb3257379a6a59c2e6e341937a4c9e7ef848f1cd0462dfd0b3af6',
            transactionIndex: 0,
            blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
            logIndex: 0,
            id: 'log_d07901ef',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```

## kip37.addMinter<a id="kip37-addminter"></a>

```javascript
kip37.addMinter(account [, sendParam])
```

トークンの鋳造を許可された鋳造者としてのアカウントを追加する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                                             |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| アカウント     | ストリング  | マイナーとして追加される口座のアドレス。                                                                                                                           |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip37.options.from` が指定された場合、それは minter でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
    blocknumber: 14172,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        MinterAdded:{
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14172,
            transactionHash: '0xa2c492abde161356d03a23d9ba48e5fd6e69a2e1603dc0286c7c65aac65d0356',
            transactionIndex: 0,
            blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
            logIndex: 0,
            id: 'log_712e7c09',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addMinter('0x{address in hex}').then(console.log)
```

## kip37.renounceMinter<a id="kip37-renounceminter"></a>

```javascript
kip37.renounceMinter([sendParam])
```

トークン造幣権を放棄。 鋳造権を放棄できるのは、鋳造者の住所のみである。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                                             |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**注意** `sendParam.from` または `kip37.options.from` が指定された場合、MinterRole を持つ minter でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
    blocknumber: 14174,
    contractAddress: null,
    from: '0xf896c5afd69239722013ad0041ef33b5a2fdb1a6',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        MinterRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14174,
            transactionHash: '0x4b06b298f3de6f119901a4444326d21add6fb1b9a5d69c91c998a41af8fd46c9',
            transactionIndex: 0,
            blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
            logIndex: 0,
            id: 'log_9b0f3967',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renounceMinter().then(console.log)
```

## kip37.burn<a id="kip37-burn"></a>

```javascript
kip37.burn(account, id, value [, sendParam])
```

特定のKIP-37トークンを燃やす。

トークン所有者のトークンを操作することを承認されたアドレス（オペレーター）またはトークン所有者自身が、このトークン移転取引を実行することが期待されます。 したがって、認可されたアドレスまたはトークン所有者がこのトランザク ションの送信者となり、そのアドレスは `sendParam.from` または `kip37.options.from` で指定されなければならない。 `sendParam.from`と`kip37.options.from`の両方が指定されない限り、エラーが発生する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                                             |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| アカウント     | ストリング          | 破棄するトークンを所有するアカウントのアドレス。                                                                                                                       |
| アイドル      | BigNumber \\ | 破棄するトークンのID。                                                                                                                                   |
| 価値        | BigNumber \\ | 破壊されるトークンの量。                                                                                                                                   |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**注意** `id` と `amount` パラメータは `number` 型を受け付けるが、入力された値が number.MAX_SAFE_INTEGER で指定された範囲外の場合、予期しない結果やエラーが発生する可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.burn('0x{address in hex}', 2, 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
    blocknumber: 16076,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16076,
            transactionHash: '0xec16313d00d0dbf34608c84e7563bacbde04e7e9c5fbcfffae54f0161356f19c',
            transactionIndex: 0,
            blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
            logIndex: 0,
            id: 'log_9c9ddbc9',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': '2',
                '4': '10',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                id: '2',
                value: '10',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...00a',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burn('0x{address in hex}', 2, 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burn('0x{address in hex}', 2, 10).then(console.log)
```

## kip37.burnBatch<a id="kip37-burnbatch"></a>

```javascript
kip37.burnBatch(account, ids, values [, sendParam])
```

複数のKIP-37トークンを燃やす。

トークン所有者のトークンを操作する権限を与えられたアドレス（オペレーター）またはトークン所有者自身が、このトークン移転トランザクションを実行することが期待される。 したがって、認可された者またはトークン所有者は、 `sendParam.from`または`kip37.options.from`でアドレスを指定されたトランザクションの送信者となるべきである。 `sendParam.from`と`kip37.options.from`の両方が提供されない限り、エラーが発生する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                                             |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| アカウント     | ストリング  | 破棄するトークンを所有するアカウントのアドレス。                                                                                                                       |
| 子供たち      | 配列     | 焼くトークンIDの配列。                                                                                                                                   |
| 価値観       | 配列     | 燃やすトークンの量の配列。                                                                                                                                  |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**注意** `ids` と `values` の配列パラメータは、配列の要素として `number` 型を受け付けるが、入力された値が number.MAX_SAFE_INTEGER で指定された範囲外であった場合、予期しない結果やエラーが発生する可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
    blocknumber: 16930,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16930,
            transactionHash: '0xa19ee5c01ad67fd27bb2818b7cbad58ba529d5a7885d79558dea8006e7a760bf',
            transactionIndex: 0,
            blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
            logIndex: 0,
            id: 'log_66e4d23e',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```

## kip37.addPauser<a id="kip37-addpauser"></a>

```javascript
kip37.addPauser(account [, sendParam])
```

契約を一時停止する権利を持つアカウントを一時停止者として追加する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                                             |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| アカウント     | ストリング  | 新しいパウザーとなるアカウントのアドレス。                                                                                                                          |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip37.options.from` が与えられた場合、それは PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
    blocknumber: 17007,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        PauserAdded: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17007,
            transactionHash: '0xe1d702bbbb44c25b5f4d18cf1e1a1745eb134d6438d5cae77611b1b73944aa93',
            transactionIndex: 0,
            blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
            logIndex: 0,
            id: 'log_50e810b0',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addPauser('0x{address in hex}').then(console.log)
```

## kip37.renouncePauser<a id="kip37-renouncepauser"></a>

```javascript
kip37.renouncePauser([sendParam])
```

契約を一時停止する権利を放棄する。 一時停止の権利を放棄できるのは、一時停止者のアドレスだけである。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                                             |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip37.options.from` が与えられた場合、それは PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
    blocknumber: 17010,
    contractAddress: null,
    from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        PauserRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17010,
            transactionHash: '0xa0557cf370cdff56ee2f53555da3e816361125a19cc832caa9d7a62808afeda1',
            transactionIndex: 0,
            blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
            logIndex: 0,
            id: 'log_ebd8d4a4',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renouncePauser().then(console.log)
```

## kip37.pause<a id="kip37-pause"></a>

```javascript
kip37.pause([id] [, sendParam])
```

トークン操作に関する機能を一時停止します。 `id` パラメータが定義されている場合、特定のトークンを一時停止する。 そうでなければ、トークン契約を一時停止する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                                             |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| アイドル      | BigNumber \\ | (オプション) 一時停止するトークン ID。 このパラメータが省略された場合、`pause`関数はトークンコントラクトを一時停止する。                                                         |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParam の詳細については、[kip37.create](#kip37-create) のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip37.options.from` が与えられた場合、それは PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given (pause the token contract)
> kip37.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
    blocknumber: 17521,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17521,
            transactionHash: '0xc5f3bebe83c86f68d582240f6bb47a8f56867650c9fec3b7caf1cb5861d31af2',
            transactionIndex: 0,
            blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
            logIndex: 0,
            id: 'log_55bd1adc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x00...f48',
                topics: ['0x62e78...'],
            },
        },
    },
}

// Send via a sendParam object with the from field given (pause the specific token)
> kip37.pause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
    blocknumber: 17738,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17738,
            transactionHash: '0x437834d4ccb944397607a81abe1bc229c44749d20c2b4f4b73ae1dd5907f79c9',
            transactionIndex: 0,
            blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
            logIndex: 0,
            id: 'log_b89719ed',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0xabdb1c9133626eb4f8c5f2ec7e3c60a969a2fb148a0c341a3cf6597242c8f8f5',
            raw: {
                data: '0x00...f48',
                topics: ['0xabdb1...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.pause().then(console.log)
```

## kip37.unpause<a id="kip37-unpause"></a>

```javascript
kip37.unpause([id] [, sendParam])
```

一時停止中の契約または特定のトークンを再開する。 `id` パラメータが定義されている場合、特定のトークンの一時停止を解除する。 そうでなければ、トークンコントラクトの一時停止を解除する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークはトランザクション送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称   | タイプ            | 説明                                                                                             |
| ---- | -------------- | ---------------------------------------------------------------------------------------------- |
| アイドル | BigNumber \\ | (オプション) 一時停止を解除するトークン ID。 このパラメータが省略された場合、`unpause`関数はトークンコントラクトの一時停止を解除する。 |

**NOTE** `sendParam.from` または `kip37.options.from` が与えられた場合、それは PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP37インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given (unpause the token contract)
> kip37.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
    blocknumber: 17524,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17524,
            transactionHash: '0x5e67040e12297ee85a3464eae406904c32b7f3c7493cbdbc8f73a2e92b10f56d',
            transactionIndex: 0,
            blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
            logIndex: 0,
            id: 'log_78d5bc18',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x00...f48',
                topics: ['0x5db9e...'],
            },
        },
    },
}

// Send via a sendParam object with the from field given (unpause the specific token)
> kip37.unpause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
    blocknumber: 17742,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17742,
            transactionHash: '0xed920c7b487c3133508cc37f930e4ae3b9c05f01e4ad823909c9b4aacf040f62',
            transactionIndex: 0,
            blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
            logIndex: 0,
            id: 'log_2811c3c5',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0xfe9b5e5216db9de81757f43d20f846bea509c040a560d136b8263dd8cd764238',
            raw: {
                data: '0x00...f48',
                topics: ['0xfe9b5...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.unpause().then(console.log)
```

[getTransactionReceipt]: ../caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt
