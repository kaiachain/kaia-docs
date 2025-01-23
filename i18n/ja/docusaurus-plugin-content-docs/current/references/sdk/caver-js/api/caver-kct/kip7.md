# caver.kct.kip7

caver.kct.kip7\`は、kaiaブロックチェーンプラットフォーム(kaia)上のJavaScriptオブジェクトとしてKIP-7を実装したスマートコントラクトを簡単に処理するのに役立つ。

caver.kct.kip7`は[caver.contract](../caver.contract.md)を継承し、KIP-7トークンコントラクトを実装する。 `caver.kct.kip7`は`caver.contract`と同じプロパティを持つが、追加機能を実装するためのメソッドが追加されている。 このセクションでは `caver.kct.kip7\` の新しく追加されたバウンドメソッドのみを紹介する。

caver.kct.kip7で使われているabiとバイトコードは、[openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)の例を使って実装されている。

caver-jsにKIP-7を実装するコードは、[Kaia Contracts Github Repo](https://github.com/kaiachain/kaia-contracts/tree/main/contracts/KIP/token/KIP7)にあります。

KIP-7については、[カイア改善提案](https://kips.kaia.io/KIPs/kip-7)を参照。

## caver.kct.kip7.deploy <a id="caver-klay-kip7-deploy"></a>

```javascript
caver.kct.kip7.deploy(tokenInfo, deployer)
```

KIP-7トークンコントラクトをkaiaブロックチェーンにデプロイします。 caver.kct.kip7.deployを使用してデプロイされたコントラクトは、KIP-7標準に従ったカンジブルトークンである。

デプロイに成功すると、プロミスは新しいKIP7インスタンスで解決される。

**パラメーター**

| 名称      | タイプ         | 説明                                                                                                                                                                                                                                                                        |
| ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| トークン情報  | オブジェクト      | KIP-7トークンコントラクトをkaiaブロックチェーン上に展開するために必要な情報。 詳細は下表を参照。                                                                                                                                                                                                                     |
| ディプロイヤー | string \\ | KIP-7トークンコントラクトを展開するキーリングのアドレス。 このキーホルダーには、展開するのに十分なKAIAがなければならない。 トランザクション送信時に使用する独自のフィールドを定義したい場合は、オブジェクト・タイプをパラメータとして渡すことができる。 また、KIP-7コントラクトをデプロイする際に料金委譲を使用したい場合は、オブジェクトに料金委譲に関連するフィールドを定義することができます。 オブジェクトに定義できるフィールドについては、[approve](#kip7-approve)のパラメータの説明を参照のこと。 |

tokenInfoオブジェクトには、以下を含める必要があります：

| 名称        | タイプ            | 説明                 |
| --------- | -------------- | ------------------ |
| 名称        | ストリング          | トークンの名前。           |
| シンボル      | ストリング          | トークンのシンボル。         |
| 小数        | 番号             | トークンが使用する小数点以下の桁数。 |
| イニシャルサプライ | BigNumber \\ | 最初に供給されるトークンの総量。   |

**注意** `initialSupply` パラメータは `number` 型を受け付けるが、投入された値が number.MAX_SAFE_INTEGER で制限された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`PromiEvent`：新しい KIP7 インスタンスで解決されるプロミスを組み合わせたイベントエミッタ。 さらに、以下のような出来事も起こりうる：

| 名称           | タイプ    | 説明                                                                                                                                                        |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| トランザクションハッシュ | ストリング  | トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。                                                                                                              |
| レシート         | オブジェクト | トランザクションのレシートが利用可能になったときに発行されます。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]を参照してください。 KIP7インスタンスからのレシートは、abi経由で解析される'logs'属性の代わりに'events'属性を持つ。 |
| エラー          | エラー    | 送信中にエラーが発生した場合に発行される。                                                                                                                                     |

**例**

```javascript
// using the promise
> caver.kct.kip7.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
    decimals: 18,
    initialSupply: '100000000000000000000',
}, '0x{address in hex}').then(console.log)
KIP7 {
    ...
    _address: '0x598367e443D8a2b644Fec69a2C12aF44BC283f23',
    _jsonInterface: [
        ...
        {
            anonymous: false,
            inputs: [
                { indexed: true, name: 'owner', type: 'address' },
                    { indexed: true, name: 'spender', type: 'address' },
                    { indexed: false, name: 'value', type: 'uint256' }
            ],
            name: 'Approval',
            type: 'event',
            signature:  '0x8c5be...'
        }
    ] 
}

// Send object as second parameter
> caver.kct.kip7.deploy({
        name: 'Jasmine',
        symbol: 'JAS',
        decimals: 18,
        initialSupply: '100000000000000000000',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
> caver.kct.kip7.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
    decimals: 18,
    initialSupply: '100000',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP7Instance) {
    console.log(newKIP7Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip7.detectInterface <a id="caver-kct-kip7-detectinterface"></a>

```javascript
caver.kct.kip7.detectInterface(契約アドレス)
```

トークンコントラクトが実装しているインターフェースの情報を返します。 この静的関数は [kip7.detectInterface](#kip7-detectinterface) を使用する。

**パラメーター**

| 名称   | タイプ   | 説明                   |
| ---- | ----- | -------------------- |
| 契約住所 | ストリング | KIP-7トークンコントラクトのアドレス |

**リターン・バリュー**

`Promise` は各 [KIP-7 インタフェース](https://kips.kaia.io/KIPs/kip-7#kip-13-identifiers) が実装されているかどうかをブール値で表した結果を含む `オブジェクト` を返す。

**例**

```javascript
> caver.kct.kip7.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}.
```

## caver.kct.kip7.create <a id="caver-kct-kip7-create"></a>

```javascript
caver.kct.kip7.create([tokenAddress])
```

バインドされたメソッドとイベントを持つ新しいKIP7インスタンスを作成します。 この関数は、[new KIP7](#new-kip7) と同じ働きをする。

**NOTE** `caver.kct.kip7.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメーター**

new KIP7](#new-kip7)を参照。

**リターン・バリュー**

new KIP7](#new-kip7)を参照。

**例**

```javascript
// Create a KIP7 instance without a parameter
> const kip7 = caver.kct.kip7.create()

// Create a KIP7 instance with a token address
> const kip7 = caver.kct.kip7.create('0x{address in hex}')
```

## 新しいKIP7<a id="new-kip7"></a>

```javascript
新しい caver.kct.kip7([tokenAddress])
```

バインドされたメソッドとイベントを持つ新しいKIP7インスタンスを作成します。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                                       |
| -------- | ----- | -------------------------------------------------------------------------------------------------------- |
| トークンアドレス | ストリング | (オプション) KIP-7トークンコントラクトのアドレス。これは後で`kip7.options.address = '0x1234..'`によって割り当てることができる。 |

**リターン・バリュー**

| タイプ    | 説明                             |
| ------ | ------------------------------ |
| オブジェクト | バインドされたメソッドとイベントを持つKIP7インスタンス。 |

**例**

```javascript
// Create a KIP7 instance without a parameter
> const kip7 = new caver.kct.kip7()

// Create a KIP7 instance with a token address
> const kip7 = new caver.kct.kip7('0x{address in hex}')
```

## kip7.クローン<a id="kip7-clone"></a>

```javascript
kip7.clone([tokenAddress])
```

現在のKIP7インスタンスをクローンする。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                             |
| -------- | ----- | ---------------------------------------------------------------------------------------------- |
| トークンアドレス | ストリング | (オプション) 別の KIP7 トークンをデプロイしたスマートコントラクトのアドレス。 省略された場合は、元のインスタンスの契約アドレスが設定される。 |

**リターン・バリュー**

| タイプ    | 説明                     |
| ------ | ---------------------- |
| オブジェクト | オリジナルのKIP7インスタンスのクローン。 |

**例**

```javascript
> const kip7 = new caver.kct.kip7(address)

// Clone without a parameter
> const cloned = kip7.clone()

// Clone with the address of the new token contract
> const cloned = kip7.clone('0x{address in hex}')
```

## kip7.detectInterface<a id="kip7-detectinterface"></a>

```javascript
kip7.detectInterface()
```

トークンコントラクトが実装しているインターフェースの情報を返します。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は各 [KIP-7 インタフェース](https://kips.kaia.io/KIPs/kip-7#kip-13-identifiers) が実装されているかどうかをブール値で表した結果を含む `オブジェクト` を返す。

**例**

```javascript
> kip7.detectInterface().then(console.log)
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}.
```

## kip7.supportsInterface<a id="kip7-supportsinterface"></a>

```javascript
kip7.supportsInterface(interfaceId)
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
> kip7.supportsInterface('0x65787371').then(console.log)
true

> kip7.supportsInterface('0x3a2820fe').then(console.log)
false
```

## kip7.名前<a id="kip7-name"></a>

```javascript
kip7.name()
```

トークンの名前を返す。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は `string` を返す：トークンの名前。

**例**

```javascript
> kip7.name().then(console.log)
ジャスミン
```

## kip7.シンボル<a id="kip7-symbol"></a>

```javascript
kip7.symbol()
```

トークンのシンボルを返す。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は `string` を返す：トークンのシンボル。

**例**

```javascript
> kip7.symbol().then(console.log)
JAS
```

## kip7.decimals<a id="kip7-decimals"></a>

```javascript
kip7.decimals()
```

トークンが使用する小数点以下の桁数を返します。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は `number` を返す：トークンが使用する小数点以下の桁数。

**例**

```javascript
> kip7.decimals().then(console.log)
18
```

## kip7.totalSupply<a id="kip7-totalsupply"></a>

```javascript
kip7.totalSupply()
```

トークンの総供給量を返す。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は `BigNumber` を返す：トークンの総数。

**例**

```javascript
> kip7.totalSupply().then(console.log)
100000000000000000000
```

## キップ7.balanceOf<a id="kip7-balanceof"></a>

```javascript
kip7.balanceOf(アドレス)
```

指定された口座アドレスの残高を返します。

**パラメーター**

| 名称 | タイプ   | 説明            |
| -- | ----- | ------------- |
| 住所 | ストリング | 残高を確認する口座の住所。 |

**リターン・バリュー**

`Promise`は `BigNumber` を返す：口座残高。

**例**

```javascript
> kip7.balanceOf('0x{address in hex}').then(console.log)
100000
```

## kip7.手当<a id="kip7-allowance"></a>

```javascript
kip7.allowance(所有者, 支出者)
```

`spender` が `owner` から引き出すことができるトークンの量を返す。

**パラメーター**

| 名称    | タイプ   | 説明                            |
| ----- | ----- | ----------------------------- |
| 所有者   | ストリング | トークン所有者のアカウントのアドレス。           |
| スペンダー | ストリング | オーナーの代わりにトークンを消費するアカウントのアドレス。 |

**リターン・バリュー**

`Promise` は `BigNumber` を返す：所有者の代わりに支出者が使用できる残りのトークン数。

**例**

```javascript
> kip7.allowance('0x{address in hex}', '0x{address in hex}').then(console.log)
0

> kip7.allowance('0x{address in hex}', '0x{address in hex}').then(console.log)
10
```

## kip7.isMinter<a id="kip7-isminter"></a>

```javascript
kip7.isMinter(アドレス)
```

与えられたアカウントが新しい KIP7 トークンを発行できる採掘者であれば `true` を返す。

**パラメーター**

| 名称 | タイプ   | 説明                    |
| -- | ----- | --------------------- |
| 住所 | ストリング | 造幣権があるかどうかを確認する口座の住所。 |

**リターン・バリュー**

`Promise`は `Boolean` を返す: アカウントが minter であれば `true` を返す。

**例**

```javascript
> kip7.isMinter('0x{address in hex}').then(console.log)
true

> kip7.isMinter('0x{address in hex}').then(console.log)
false
```

## kip7.isPauser<a id="kip7-ispauser"></a>

```javascript
kip7.isPauser(アドレス)
```

与えられたアカウントがトークンの転送を一時停止できる一時停止者であれば `true` を返す。

**パラメーター**

| 名称 | タイプ   | 説明                                    |
| -- | ----- | ------------------------------------- |
| 住所 | ストリング | トークンの譲渡を停止する権利があるかどうかを確認するアカウントのアドレス。 |

**リターン・バリュー**

`Promise` は `Boolean` を返します: アカウントが一時停止者であれば `true` を返します。

**例**

```javascript
> kip7.isPauser('0x{address in hex}').then(console.log)
true

> kip7.isPauser('0x{address in hex}').then(console.log)
false
```

## kip7.paused<a id="kip7-paused"></a>

```javascript
kip7.paused()
```

契約が一時停止していれば `true` を返し、そうでなければ `false` を返す。

**パラメーター**

なし

**リターン・バリュー**

`Promise` は `Boolean` を返す: 契約が一時停止されていれば `true` を返す。

**例**

```javascript
> kip7.paused().then(console.log)
true

> kip7.paused().then(console.log)
false
```

## kip7.承認<a id="kip7-approve"></a>

```javascript
kip7.approve(spender, amount [, sendParam])
```

トークン所有者が `spender` に使用させるトークンの `amount` を設定する。

このメソッドはオーナーからkaiaネットワークにトランザクションを送信し、kaiaネットワークはオーナーにトランザクション手数料を請求することに注意してください。

**パラメーター**

| 名称        | タイプ            | 説明                                                         |
| --------- | -------------- | ---------------------------------------------------------- |
| スペンダー     | ストリング          | オーナーの代わりにトークンを使用するアカウントのアドレス。                              |
| 量         | BigNumber \\ | 使用者が使用できるトークンの量。                                           |
| sendParam | オブジェクト         | (オプション) トランザクション送信に必要なパラメータを保持するオブジェクト。 |

**注意** `amount` パラメータは `number` 型を受け付けるが、投入された値が number.MAX_SAFE_INTEGER で制限された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

`sendParam`オブジェクトは以下を含む：

| 名称         | タイプ         | 説明                                                                                                                                                                                             |
| ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| より         | ストリング       | (オプション) トランザクションの送信元アドレス。 省略された場合は `kip7.options.from` によって設定される。 もし `sendParam` オブジェクトの `from` と `kip7.options.from` のどちらも指定されなかった場合、エラーが発生する。                             |
| ガス         | number \\ | (オプション）このトランザクションで提供されるガスの最大数（ガスリミット）。 省略された場合は、`kip7.methods.approve(spender, amount).estimateGas({from})` を呼び出すことでcaver-jsによって設定されます。                                     |
| ガス価格       | number \\ | (オプション) このトランザクションのガス価格（peb）。 省略した場合は、caver-js が `caver.klay.getGasPrice` を呼び出して設定する。                                                                                       |
| 価値         | number \\ | (オプション) peb で転送される値。                                                                                                                                                        |
| フィーデレゲーション | ブーリアン       | (オプション、デフォルト `false`) フィー委任トランザクションを使用するかどうか。 省略された場合は `kip7.options.feeDelegation` が使用される。 両方が省略された場合、料金委譲は行われない。                                                          |
| 料金支払者      | ストリング       | (オプション）取引手数料を支払う手数料支払人の住所。 `feeDelegation`が `true` のとき、その値はトランザクションの `feePayer` フィールドに設定される。 省略された場合は `kip7.options.feePayer` が使用される。 両方が省略された場合はエラーを投げる。                   |
| 手数料率       | ストリング       | (任意）手数料支払者が負担する取引手数料の比率。 `feeDelegation`が `true` で、`feeRatio`に有効な値が設定されている場合、部分的な料金委譲トランザクショ ンが使用される。 有効範囲は1～99。 0や100以上の比率は許されない。 省略された場合は `kip7.options.feeRatio` が使用される。 |

**NOTE** `feeDelegation`、`feePayer`、`feeRatio` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.approve('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xf010a98f66b6b36943175cd5b249da54e84abed551cfa02846a2900ddab968c7',
    blocknumber: 2098,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x8ca777e464a83b939ae131ca037f0d8728c6929e',
    ...
    events: {
        Approval: {
            address: '0x8CA777e464a83b939AE131CA037F0d8728C6929e',
            blocknumber: 2098,
            transactionHash: '0xf7469c0420cb5ebb0fbf64a314bd0c9ee7517ea64dd72eefa59bc8005bbc0f99',
            transactionIndex: 0,
            blockHash: '0xf010a98f66b6b36943175cd5b249da54e84abed551cfa02846a2900ddab968c7',
            logIndex: 0,
            id: 'log_c6ec61aa',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0xe36ffD7bc4D588c480B5925B9622881F9d85ea30',
                '2': '10',
                owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                spender: '0xe36ffD7bc4D588c480B5925B9622881F9d85ea30',
                value: '10'
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x000000000000000000000000000000000000000000000000000000000000000a',
                topics: [ '0x8c5be...', '0x00...676', '0x00...a30' ]
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.approve('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.approve('0x{address in hex}', 10).then(console.log)
```

## kip7.トランスファー<a id="kip7-transfer"></a>

```javascript
kip7.transfer(recipient, amount [, sendParam])
```

トークン所有者の残高から `受取人` にトークンの `金額` を転送する。 トークン所有者は、自らの手でこのトークン譲渡を実行しなければならない。 したがって、トークンの所有者はこのトランザク ションの送信者でなければならず、そのアドレスは `sendParam.from` または `kip7.options.from` で与えられなければならない。 `sendParam.from`や`kip7.options.from`を指定しないとエラーになる。

このトランザクションを送信すると、トランザクション送信者にトランザクション手数料が請求されることに注意。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                       |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 受取人       | ストリング          | トークンを受け取るアカウントのアドレス。                                                                                                     |
| 量         | BigNumber \\ | 転送されるトークンの量。                                                                                                             |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**注意** `amount` パラメータは `number` 型を受け付けるが、投入された値が number.MAX_SAFE_INTEGER で制限された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.transfer('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x8a078c3a73d678cdd85d471eb21e9ed7d695f8b96fc7315cfa59c1f68be3d2bf',
    blocknumber: 1353,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x05871c21664e18b2906545f8831695650a8f4056',
    ...
    events: {
        Transfer: {
            address: '0x05871c21664E18b2906545f8831695650a8f4056',
            blocknumber: 1353,
            transactionHash: '0x8bd2b21a06241e4cfc0af1ec40e7b15444f730c7529440648aa4ed6b697f08f4',
            transactionIndex: 0,
            blockHash: '0x8a078c3a73d678cdd85d471eb21e9ed7d695f8b96fc7315cfa59c1f68be3d2bf',
            logIndex: 0,
            id: 'log_82ef7705',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0xE411cb0B61FDcC06497794fE3f49F65D5dE41f59',
                '2': '10',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0xE411cb0B61FDcC06497794fE3f49F65D5dE41f59',
                value: '10'
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x000000000000000000000000000000000000000000000000000000000000000a',
                topics: [ '0xddf25...', '0x00...676', '0x00...f59' ]
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.transfer('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.transfer('0x{address in hex}', 10).then(console.log)
```

## kip7.safeTransfer<a id="kip7-safetransfer"></a>

```javascript
kip7.safeTransfer(recipient, amount [, data] [, sendParam])
```

トークンの所有者の残高から `受取人` にトークンの `金額` を安全に転送する。 トークン所有者は、自らの手でこのトークン譲渡を実行しなければならない。 したがって、トークンの所有者はこのトランザク ションの送信者でなければならず、そのアドレスは `sendParam.from` または `kip7.options.from` で与えられなければならない。 `sendParam.from`や`kip7.options.from`を指定しないとエラーになる。

受信者が契約アドレスの場合、[IKIP7Receiver.onKIP7Received](https://kips.kaia.io/KIPs/kip-7#wallet-interface) を実装する必要がある。 そうでなければ、移籍は取り消される。

このトランザクションを送信すると、トランザクション送信者にトランザクション手数料が請求されることに注意。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                       |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 受取人       | ストリング          | トークンを受け取るアカウントのアドレス。                                                                                                     |
| 量         | BigNumber \\ | 転送したいトークンの量。                                                                                                             |
| データ       | Buffer \\    | (オプション) 呼とともに送信するオプションのデータ。                                                                           |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**注意** `amount` パラメータは `number` 型を受け付けるが、投入された値が number.MAX_SAFE_INTEGER で制限された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip7.safeTransfer('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x208cd64b95bbd91420fc6b1a7b514a8d3051d09333d79244b6b74ff2f7f3eee4',
    blocknumber: 2384,
    contractAddress: null,
    from: '0xc2c84328845a36fe0c4dcef370d24ec80cf85221',
    ...
    status: true,
    to: '0xe4aeba6306b0df023aa4b765960fa59dbe925950',
    ...
    events: {
            Transfer: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blocknumber: 2384,
                    transactionHash: '0x47bb085947c282722c1ceab1f4f0380d911ce464a47a19f1e7bddfe08a13563d',
                    transactionIndex: 0,
                    blockHash: '0x208cd64b95bbd91420fc6b1a7b514a8d3051d09333d79244b6b74ff2f7f3eee4',
                    logIndex: 0,
                    id: 'log_58e5e06d',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            '2': '10',
                            from: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            to: '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            value: '10',
                    },
                    event: 'Transfer',
                    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                    raw: {
                            data: '0x000000000000000000000000000000000000000000000000000000000000000a',
                            topics: [ '0xddf25...', '0x00...221', '0x00...b73' ],
                    },
            },
    },
}

// Using FD transaction to execute the smart contract
> kip7.safeTransfer('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip7.safeTransfer('0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.safeTransfer('0x{address in hex}', 11).then(console.log)
```

## kip7.transferFrom<a id="kip7-transferfrom"></a>

```javascript
kip7.transferFrom(sender, recipient, amount [, sendParam])
```

トークン所有者の残高から `受取人` にトークンの `金額` を転送する。 トークン所有者のトークンを送信することを承認されたアドレスが、このトークン転送トランザクションを実行することが期待される。 したがって、承認されたものは、 `sendParam.from`または`kip7.options.from`でアドレスを指定されたこのトランザクションの送信者でなければならない。 `sendParam.from`や`kip7.options.from`を指定しないとエラーになる。

このトランザクションを送信すると、トランザクション送信者にトランザクション手数料が請求されることに注意。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                       |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 送信者       | ストリング          | 手当メカニズムで送信されるトークンを所有するアカウントのアドレス。                                                                                        |
| 受取人       | ストリング          | トークンを受け取るアカウントのアドレス。                                                                                                     |
| 量         | BigNumber \\ | 転送したいトークンの量。                                                                                                             |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**注意** `amount` パラメータは `number` 型を受け付けるが、投入された値が number.MAX_SAFE_INTEGER で制限された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given
> kip7.transferFrom('0x{address in hex}', '0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
    blocknumber: 2331,
    contractAddress: null,
    from: '0x01958c62ab4aec7fc282bec9491da0ef7f830ac2',
    ...
    status: true,
    to: '0x3d5eb40665d25aaa4160023c4278fa6a94ba4acb',
    ...
    events: {
        Transfer: {
            address: '0x3D5EB40665D25aAa4160023C4278FA6A94BA4aCb',
            blocknumber: 2331,
            transactionHash: '0x5b2232b68681f19d9b6fcd6fb03964ef105912fecb772c11c8ec9fc906be4cbf',
            transactionIndex: 0,
            blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
            logIndex: 0,
            id: 'log_ae57b7a0',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x49ff9cb8BB8CA10D7f6E1094b2Ba56c3C2DBA231',
                '2': '10000',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0x49ff9cb8BB8CA10D7f6E1094b2Ba56c3C2DBA231',
                value: '10000'
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                topics: [ '0xddf25...', '0x00...676', '0x00...231' ]
            },
        },
        Approval: {
            address: '0x3D5EB40665D25aAa4160023C4278FA6A94BA4aCb',
            blocknumber: 2331,
            transactionHash: '0x5b2232b68681f19d9b6fcd6fb03964ef105912fecb772c11c8ec9fc906be4cbf',
            transactionIndex: 0,
            blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
            logIndex: 1,
            id: 'log_cee37d26',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x01958c62aB4aEC7fC282bEc9491dA0EF7F830AC2',
                '2': '0',
                owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                spender: '0x01958c62aB4aEC7fC282bEc9491dA0EF7F830AC2',
                value: '0'
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                topics: [ '0x8c5be...', '0x00...676', '0x00...ac2' ]
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.transferFrom('0x{address in hex}', '0x{address in hex}', 10000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.transferFrom('0x{address in hex}', '0x{address in hex}', 10000).then(console.log)
```

## kip7.safeTransferFrom<a id="kip7-safetransferfrom"></a>

```javascript
kip7.safeTransferFrom(sender, recipient, amount [, data] [, sendParam])
```

トークンの所有者の残高から `受取人` にトークンの `金額` を安全に転送する。 トークン所有者のトークンを送信することを承認されたアドレスが、このトークン転送トランザクションを実行することが期待される。 したがって、承認されたものは、 `sendParam.from`または`kip7.options.from`でアドレスを指定されたこのトランザクションの送信者でなければならない。 `sendParam.from`や`kip7.options.from`を指定しないとエラーになる。

受信者が契約アドレスの場合、[IKIP7Receiver.onKIP7Received](https://kips.kaia.io/KIPs/kip-7#wallet-interface) を実装する必要がある。 そうでなければ、移籍は取り消される。

このトランザクションを送信すると、トランザクション送信者にトランザクション手数料が請求されることに注意。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                       |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 送信者       | ストリング          | 手当メカニズムで送信されるトークンを所有するアカウントのアドレス。                                                                                        |
| 受取人       | ストリング          | トークンを受け取るアカウントのアドレス。                                                                                                     |
| 量         | BigNumber \\ | 転送したいトークンの量。                                                                                                             |
| データ       | Buffer \\    | (オプション) 呼とともに送信するオプションのデータ。                                                                           |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**注意** `amount` パラメータは `number` 型を受け付けるが、投入された値が number.MAX_SAFE_INTEGER で制限された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP17インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
    blocknumber: 2404,
    contractAddress: null,
    from: '0x090937f5c9b83d961da29149a3c37104bc5e71b3',
    ...
    status: true,
    to: '0xe4aeba6306b0df023aa4b765960fa59dbe925950',
    ...
    events: {
            Transfer: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blocknumber: 2404,
                    transactionHash: '0xed8c33facaea963f57c268134aaab48fa765e7298fd70d4bc796b1e93c12ad45',
                    transactionIndex: 0,
                    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
                    logIndex: 0,
                    id: 'log_5eaef2c3',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            '2': '10000',
                            from: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            to: '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            value: '10000',
                    },
                    event: 'Transfer',
                    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                    raw: {
                            data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                            topics: [ '0xddf25...', '0x00...221', '0x00...b73' ],
                    },
            },
            Approval: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blocknumber: 2404,
                    transactionHash: '0xed8c33facaea963f57c268134aaab48fa765e7298fd70d4bc796b1e93c12ad45',
                    transactionIndex: 0,
                    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
                    logIndex: 1,
                    id: 'log_3f3aedf8',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x090937f5C9B83d961da29149a3C37104Bc5e71B3',
                            '2': '0',
                            owner: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            spender: '0x090937f5C9B83d961da29149a3C37104Bc5e71B3',
                            value: '0',
                    },
                    event: 'Approval',
                    signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
                    raw: {
                            data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                            topics: [ '0x8c5be...', '0x00...221', '0x00...1b3' ],
                    },
            },
    },
}

// Using FD transaction to execute the smart contract
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 10000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```

## kip7.mint<a id="kip7-mint"></a>

```javascript
kip7.mint(account, amount [, sendParam])
```

トークン `amount` を生成して `account` に発行し、トークンの総供給量を増やす。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                       |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| アカウント     | ストリング          | トークンが発行されるアカウントのアドレス。                                                                                                    |
| 量         | BigNumber \\ | 鋳造されるトークンの量。                                                                                                             |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**注意** `amount` パラメータは `number` 型を受け付けるが、投入された値が number.MAX_SAFE_INTEGER で制限された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**注意** `sendParam.from` または `kip7.options.from` が指定された場合、MinterRole を持つ minter でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.mint('0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x71e1c7c9de471ed9eb9ec2aca09beb63a654e21514b2b8d25ec93f34b810a709',
    blocknumber: 8466,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x54e9ad10ffcbcc2384863157c851a75a31c1e925',
    ...
    events: {
        Transfer: {
            address: '0x54e9Ad10FFcBCc2384863157c851A75a31C1E925',
            blocknumber: 8466,
            transactionHash: '0xef1db1544d0ba70aa06b77599a8421cee2270703cff7d0233bd09ab3561ab49a',
            transactionIndex: 0,
            blockHash: '0x71e1c7c9de471ed9eb9ec2aca09beb63a654e21514b2b8d25ec93f34b810a709',
            logIndex: 0,
            id: 'log_151f8e90',
            returnValues: {
                '0': '0x0000000000000000000000000000000000000000',
                '1': '0x4756D3c2A3DC61450D949BD9bF702b4209Fc15a0',
                '2': '10000',
                from: '0x0000000000000000000000000000000000000000',
                to: '0x4756D3c2A3DC61450D949BD9bF702b4209Fc15a0',
                value: '10000',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                topics: [ '0xddf25...', '0x00...000', '0x00...5a0' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.mint('0x{address in hex}', 10000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.mint('0x{address in hex}', 10000).then(console.log)
```

## kip7.addMinter<a id="kip7-addminter"></a>

```javascript
kip7.addMinter(account [, sendParam])
```

トークンの鋳造を許可された鋳造者としてのアカウントを追加する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| アカウント     | ストリング  | マイナーとして追加される口座のアドレス。                                                                                                     |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip7.options.from` が指定された場合、それは minter でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x169db7e80c954f7d95bbb6a5ef3065190e842d515485e1679f8f3027d1b2975f',
    blocknumber: 9593,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x9e2851aff794e69c58e112a3beacbf0de6587f6b',
    ...
    events: {
        MinterAdded: {
            address: '0x9E2851Aff794E69C58E112a3beacbF0De6587f6b',
            blocknumber: 9593,
            transactionHash: '0x11c86fe739ce3f8e6f93f5de87c9626c7cd032dd5e119171f9ec821292cd68e9',
            transactionIndex: 0,
            blockHash: '0x169db7e80c954f7d95bbb6a5ef3065190e842d515485e1679f8f3027d1b2975f',
            logIndex: 0,
            id: 'log_d93efbcd',
            returnValues: {
                '0': '0x823EA6Eb41985218D478C07E77cFBdAd233569C5',
                account: '0x823EA6Eb41985218D478C07E77cFBdAd233569C5',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...9c5' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.addMinter('0x{address in hex}').then(console.log)
```

## kip7.renounceミンター<a id="kip7-renounceminter"></a>

```javascript
kip7.renounceMinter([sendParam])
```

トークン造幣権を放棄。 鋳造権を放棄できるのは、鋳造者の住所のみである。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip7.options.from` が指定された場合、MinterRole を持つ minter でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xc1d96a519d9a31a1dab77111af0de73241aa212722859062a96dc3115a2eca23',
    blocknumber: 9996,
    contractAddress: null,
    from: '0x34b91db0f4c7d1381fdf054cc3d0c433b19fca16',
    ...
    status: true,
    to: '0xeba808dcd0fdbfc21a99961be42665f351487f52',
    ...
    events: {
        MinterRemoved: {
            address: '0xebA808dCD0Fdbfc21a99961BE42665f351487F52',
            blocknumber: 9996,
            transactionHash: '0x52328e3cfb8061915d000dc308ffd67650fa36cf4560f1fb12fdb28a7c903ac9',
            transactionIndex: 0,
            blockHash: '0xc1d96a519d9a31a1dab77111af0de73241aa212722859062a96dc3115a2eca23',
            logIndex: 0,
            id: 'log_bd3a8e46',
            returnValues: {
                '0': '0x34b91Db0F4c7D1381FdF054cc3D0c433B19fCa16',
                account: '0x34b91Db0F4c7D1381FdF054cc3D0c433B19fCa16',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...a16' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.renounceMinter().then(console.log)
```

## キップ7.バーン<a id="kip7-burn"></a>

```javascript
kip7.burn(amount [, sendParam])
```

送信者の残高のトークン `amount` を破棄する。 `sendParam.from`や`kip7.options.from`を指定しないとエラーになる。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                       |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 量         | BigNumber \\ | 破壊されるトークンの量。                                                                                                             |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**注意** `amount` パラメータは `number` 型を受け付けるが、投入された値が number.MAX_SAFE_INTEGER で制限された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.burn(1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x7cf9e982510d17a2fd5fca3e7a6f9ce5a25a9da6ba81d51b33129fb7fb93e0ae',
    blocknumber: 10495,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x0f681dbc120d9d3be997565626cd87f049f5c405',
    ...
    events: {
        Transfer: {
            address: '0x0f681Dbc120D9d3BE997565626CD87F049f5C405',
            blocknumber: 10495,
            transactionHash: '0x4f2de0b4310c40eeef20ae8e8d129d209195975792de86e1cd00f2345789c9f7',
            transactionIndex: 0,
            blockHash: '0x7cf9e982510d17a2fd5fca3e7a6f9ce5a25a9da6ba81d51b33129fb7fb93e0ae',
            logIndex: 0,
            id: 'log_20f6c253',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '1000',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0x0000000000000000000000000000000000000000',
                value: '1000',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x00000000000000000000000000000000000000000000000000000000000003e8',
                topics: [ '0xddf25...', '0x00...676', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.burn(1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.burn(1000).then(console.log)
```

## kip7.burnFrom<a id="kip7-burnfrom"></a>

```javascript
kip7.burnFrom(account, amount [, sendParam])
```

アカウント`から指定された数のトークンを破棄する。 `sendParam.from`または`kip7.options.from`で指定された送信者の許容量は、`account\`の残高と一緒に削減される。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ            | 説明                                                                                                                       |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| アカウント     | ストリング          | トークンを所有するアカウントのアドレス。                                                                                                     |
| 量         | BigNumber \\ | 破壊されるトークンの量。                                                                                                             |
| sendParam | オブジェクト         | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**注意** `amount` パラメータは `number` 型を受け付けるが、投入された値が number.MAX_SAFE_INTEGER で制限された範囲外であった場合、予期しない結果やエラーを引き起こす可能性がある。 この場合、特に `uint256` サイズの数値入力値には `BigNumber` 型を使用することを推奨する。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.burnFrom('0x{address in hex}', 1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
    blocknumber: 11371,
    contractAddress: null,
    from: '0x1b7bdfcfb0008d0c958da13f2dc30388271e9ef0',
    ...
    status: true,
    to: '0x50fafa2b059d26c47d26c35ccb3cd3b856ecc852',
    ...
    events: {
        Transfer: {
            address: '0x50fAFa2B059d26C47D26c35Ccb3Cd3b856Ecc852',
            blocknumber: 11371,
            transactionHash: '0xed37eafc35272bd7c45695b4b94c578c681a1800b1612ca82d0e4e595e947f27',
            transactionIndex: 0,
            blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
            logIndex: 0,
            id: 'log_a7263788',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '10000',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0x0000000000000000000000000000000000000000',
                value: '10000',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                topics: [ '0xddf25...', '0x00...676', '0x00...000' ],
            },
        },
        Approval: {
            address: '0x50fAFa2B059d26C47D26c35Ccb3Cd3b856Ecc852',
            blocknumber: 11371,
            transactionHash: '0xed37eafc35272bd7c45695b4b94c578c681a1800b1612ca82d0e4e595e947f27',
            transactionIndex: 0,
            blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
            logIndex: 1,
            id: 'log_4ca1aac4',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x1B7BdfCFb0008D0C958dA13F2dc30388271E9eF0',
                '2': '0',
                owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                spender: '0x1B7BdfCFb0008D0C958dA13F2dc30388271E9eF0',
                value: '0',
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                topics: [ '0x8c5be...', '0x00...676', '0x00...ef0' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.burnFrom('0x{address in hex}', 1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.burnFrom('0x{address in hex}', 1000).then(console.log)
```

## kip7.addPauser<a id="kip7-addpauser"></a>

```javascript
kip7.addPauser(account [, sendParam])
```

契約を一時停止する権利を持つアカウントを一時停止者として追加する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| アカウント     | ストリング  | 新しいパウザーとなるアカウントのアドレス。                                                                                                    |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip7.options.from` が与えられた場合、それは PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x14bcefa90f95f5db03ed9c43a77ae910b57960f4f44c786e3a650a8ad163f67a',
    blocknumber: 16524,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x31fee792a85ff4d714f47a151975b4979cb47308',
    ...
    events: {
        PauserAdded: {
            address: '0x31fee792A85ff4D714F47A151975b4979CB47308',
            blocknumber: 16524,
            transactionHash: '0x9bd0cba9f5fdc3fdae4b9f40f46f11bf42314ca2518724e78be266d46a8a9f96',
            transactionIndex: 0,
            blockHash: '0x14bcefa90f95f5db03ed9c43a77ae910b57960f4f44c786e3a650a8ad163f67a',
            logIndex: 0,
            id: 'log_d847b043',
            returnValues: {
                '0': '0x6610B93bAE66F89716C3b010ad39DF476Da9234b',
                account: '0x6610B93bAE66F89716C3b010ad39DF476Da9234b',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...34b' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.addPauser('0x{address in hex}').then(console.log)
```

## kip7.renouncePauser<a id="kip7-renouncepauser"></a>

```javascript
kip7.renouncePauser([sendParam])
```

契約を一時停止する権利を放棄する。 一時停止の権利を放棄できるのは、一時停止者のアドレスだけである。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip7.options.from` が与えられた場合、それは PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xc0b1b4914ddc8d74e8034fe86ede1b5b88a2c16ee4d678e58fac325c589713f6',
    blocknumber: 16567,
    contractAddress: null,
    from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
    ...
    status: true,
    to: '0x31fee792a85ff4d714f47a151975b4979cb47308',
    ...
    events: {
        PauserRemoved: {
            address: '0x31fee792A85ff4D714F47A151975b4979CB47308',
            blocknumber: 16567,
            transactionHash: '0xefc93382f5609531dd16f644cf6a3b8e086c623a9fb8038984662f7260482df6',
            transactionIndex: 0,
            blockHash: '0xc0b1b4914ddc8d74e8034fe86ede1b5b88a2c16ee4d678e58fac325c589713f6',
            logIndex: 0,
            id: 'log_e9518d2f',
            returnValues: {
                '0': '0x5934a0c01baA98F3457981b8f5ce6E52ac585578',
                account: '0x5934a0c01baA98F3457981b8f5ce6E52ac585578',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...578' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.renouncePauser().then(console.log)
```

## kip7.pause<a id="kip7-pause"></a>

```javascript
kip7.pause([sendParam])
```

トークンの送信に関連する機能を一時停止する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip7.options.from` が与えられた場合、それは PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xcd5e787e738a6197df871f0d651f2a9149d5ed03fdf62e918c4eed03003ea539',
    blocknumber: 18218,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0xfc83abf47d232739dab9610c46b3f10c8022b3ef',
    ...
    events: {
        Paused: {
            address: '0xFc83ABF47d232739dAb9610C46B3F10C8022b3eF',
            blocknumber: 18218,
            transactionHash: '0x0e660b8c49e8212a69f2d68324e105b4295b534d22ac0b70263d3e54d429d1bb',
            transactionIndex: 0,
            blockHash: '0xcd5e787e738a6197df871f0d651f2a9149d5ed03fdf62e918c4eed03003ea539',
            logIndex: 0,
            id: 'log_2ab0db96',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                account: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x0000000000000000000000002f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
                topics: ['0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.pause().then(console.log)
```

## kip7.unpause<a id="kip7-unpause"></a>

```javascript
kip7.unpause([sendParam])
```

一時停止していた契約を再開する。

このメソッドはkaiaネットワークにトランザクションを送信し、kaiaネットワークは送信者にトランザクション手数料を請求する。

**パラメーター**

| 名称        | タイプ    | 説明                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| sendParam | オブジェクト | (オプション) トランザクションを送信するためのパラメータを定義したオブジェクト。 sendParamの詳細については、[approve](#kip7-approve) のパラメータの説明を参照のこと。 |

**NOTE** `sendParam.from` または `kip7.options.from` が与えられた場合、それは PauserRole を持つ pauser でなければならない。

**リターン・バリュー**

`Promise` は `object` - トランザクションの実行結果を含むレシートを返す。 レシートオブジェクト内のプロパティについて知りたい場合は、[getTransactionReceipt]の説明を参照してください。 KIP7インスタンスからのレシートは、'logs'属性の代わりにABI経由で解析された'events'属性を持つ。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xa45194ba608a0a00152f974fb1388ced326522979f4b8f19c3fab3083f1339ac',
    blocknumber: 18239,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0xfc83abf47d232739dab9610c46b3f10c8022b3ef',
    ...
    events: {
        Unpaused: {
            address: '0xFc83ABF47d232739dAb9610C46B3F10C8022b3eF',
            blocknumber: 18239,
            transactionHash: '0x449dff9d7970bfe326091516ebb22aeaefb0bda59bc4e2577467618863e36c99',
            transactionIndex: 0,
            blockHash: '0xa45194ba608a0a00152f974fb1388ced326522979f4b8f19c3fab3083f1339ac',
            logIndex: 0,
            id: 'log_9c5a3823',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                account: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x0000000000000000000000002f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
                topics: ['0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.unpause().then(console.log)
```

[getTransactionReceipt]: ../caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt
