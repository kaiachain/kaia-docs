# ケイバー

`caver.rpc.klay` は `klay` 名前空間を持つ JSON-RPC 呼び出しを提供する。

## caver.rpc.klay.accountCreated <a href="#caver-rpc-klay-accountcreated" id="caver-rpc-klay-accountcreated"></a>

```javascript
caver.rpc.klay.accountCreated(address [, blockNumber] [, callback])
```

アドレスに関連付けられたアカウントが kaia ブロックチェーンプラットフォームに作成されていれば `true` を返す。 そうでない場合は `false` を返す。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| 住所     | ストリング       | ネットワーク上に作成されたかどうかを確認するために問い合わせたいアカウントのアドレス。                                                    |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `boolean` を返す。

| タイプ   | 説明             |
| ----- | -------------- |
| ブーリアン | カイアの入力アドレスの存在。 |

**例**

```javascript
> caver.rpc.klay.accountCreated('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.getAccount <a href="#caver-rpc-klay-getaccount" id="caver-rpc-klay-getaccount"></a>

```javascript
caver.rpc.klay.getAccount(address [, blockNumber] [, callback])
```

指定されたアドレスの口座情報をkaiaで返します。 カイアの口座の種類については、[「カイアの口座の種類」](../../../../../learn/accounts.md#klaytn-account-types)をご参照ください。

**注意** `caver.rpc.klay.getAccount` はネットワーク上に存在するアカウントを返すので、アドレスと一致するアカウントが実際のブロックチェーンネットワーク上に存在しない場合は `null` が返される。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| 住所     | ストリング       | アカウント情報を取得したいアカウントのアドレス。                                                                       |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                    |
| ------ | ------------------------------------- |
| オブジェクト | アカウント情報を含むオブジェクト。 アカウント・タイプごとに属性が異なる。 |

**例**

```javascript
// Get account with EOA
> caver.rpc.klay.getAccount('0x{address in hex}').then(console.log)
{
    accType: 1,
    account: {
        nonce: 0,
        balance: '0x',
        humanReadable: false,
        key: { keyType: 1, key: {} }
    }
}

// Get account with SCA
> caver.rpc.klay.getAccount('0x{address in hex}').then(console.log)
{
    accType: 2,
    account: {
        nonce: 1,
        balance: '0x0',
        humanReadable: false,
        key: { keyType: 3, key: {} },
        storageRoot: '0xd0ce6b9ba63cf727d48833bcaf69f398bb353e9a5b6235ac5bb3a8e95ff90ecf',
        codeHash: '7pemrmP8fcguH/ut/SYHJoUSecfUIcUyeCpMf0sBYVI=',
        codeFormat: 0
    }
}
```

## caver.rpc.klay.getAccountKey <a href="#caver-rpc-klay-getaccountkey" id="caver-rpc-klay-getaccountkey"></a>

```javascript
caver.rpc.klay.getAccountKey(address [, blockNumber] [, callback])
```

指定されたアドレスの AccountKey を返します。 アカウントが[AccountKeyLegacy](../../../../../learn/accounts.md#accountkeylegacy)を持っているか、指定されたアドレスのアカウントが[スマートコントラクトアカウント](../../../../../learn/accounts.md#smart-contract-accounts-scas)である場合、空のキー値を返します。 詳しくは[アカウントキー](../../../../../learn/accounts.md#account-key)をご参照ください。

**注意** `caver.rpc.klay.getAccountKey` は、AccountKey のタイプごとに異なるオブジェクトを返します。 与えられたアドレスにマッチするkaiaアカウントがネットワーク上に存在しない場合、`null`が返される。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| 住所     | ストリング       | AccountKey情報のオブジェクトを取得したいkaiaアカウントのアドレス。                                                       |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                                  |
| ------ | --------------------------------------------------- |
| オブジェクト | AccountKey 情報を含むオブジェクト。 AccountKeyタイプはそれぞれ異なる属性を持つ。 |

**例**

```javascript
// AccountKey タイプ：AccountKeyLegacy
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType：1, キー: {}。}

// AccountKey タイプ：AccountKeyPublic
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType：2,
    key： { x:'0xb9a4b...', y:'0x7a285...' }
}

// AccountKey タイプ：AccountKeyFail
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType：3, key:{}}

// AccountKey タイプ：AccountKeyWeightedMultiSig
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType：4,
    key: {
        threshold: 2,
        keys：[
            {
                weight: 1,
                key： { x: '0xae6b7...', y: '0x79ddf...' }
            },
            {
                weight: 1,
                key： { x: '0xd4256...', y: '0xfc5e7...' }
            },
            {
                weight: 1,
                key： { x: '0xd653e...', y: '0xe974e...' }
            }
        ]
    }
}

// AccountKey タイプ：AccountKeyRoleBased
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType：5,
    key: [
            {
                key: { x: '0x81965...', y: '0x18242...' },
                keyType：2
            },
            {
                key: { x: '0x73363...', y: '0xfc3e3...' },
                keyType：2
            },
            {
                key: { x: '0x95c92...', y: '0xef783...' },
                keyType：2
            }.
    ]
}
```

## caver.rpc.klay.encodeAccountKey <a href="#caver-rpc-klay-encodeaccountkey" id="caver-rpc-klay-encodeaccountkey"></a>

```javascript
caver.rpc.klay.encodeAccountKey(accountKey [, callback])
```

AccountKey 情報を含むオブジェクトを、RLP (Recursive Length Prefix) エンコーディング方式でエンコードする。 また、[account.getRLPEncodingAccountKey](../caver.account.md#account-getrlpencodingaccountkey) を使用して、RLPエンコードされたAccountKeyを取得することもできます。

**パラメーター**

| 名称      | タイプ    | 説明                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| アカウントキー | オブジェクト | オブジェクトは `AccountKey`([AccountKeyLegacy](../caver.account.md#accountkeylegacy)、[AccountKeyPublic](../caver.account.md#accountkeypublic)、[AccountKeyFail](../caver.account.md#accountkeyfail)、[AccountKeyWeightedMultiSig](../caver.account.md#accountkeyweightedmultisig)、または[AccountKeyRoleBased](../caver.account.md#accountkeyrolebased)のインスタンスの内部で `keyType` と `key` を定義する。） |
| コールバック  | 機能     | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。                                                                                                                                                                                                                                                                                                                |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                     |
| ----- | ---------------------- |
| ストリング | RLPエンコードされたAccountKey。 |

**例**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.encodeAccountKey({ keyType: 1, key: {} }).then(console.log)
0x01c0

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.encodeAccountKey({
        keyType: 2,
        key: {
            x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
            y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
        },
    }).then(console.log)
0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8

// AccountKey type: AccountKeyFail
> caver.rpc.klay.encodeAccountKey({ keyType: 3, key: {} }).then(console.log)
0x03c0

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.encodeAccountKey({
        keyType: 4,
        key: {
            threshold: 2,
            keys: [
                {
                    weight: 1,
                    key: {
                        x: '0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e',
                        y: '0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712',
                    },
                },
                {
                    weight: 1,
                    key: {
                        x: '0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb',
                        y: '0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842',
                    },
                },
            ],
        },
    }).then(console.log)
0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb

// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.encodeAccountKey({
        keyType: 5,
        key: [
            {
                keyType: 2,
                key: {
                    x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                    y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                },
            },
            {
                keyType: 4,
                key: {
                    threshold: 2,
                    keys: [
                        {
                            weight: 1,
                            key: {
                                x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                                y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                            },
                        },
                        {
                            weight: 1,
                            key: {
                                x: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06',
                                y: '0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
                            },
                        },
                    ],
                },
            },
            {
                keyType: 2,
                key: {
                    x: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447',
                    y: '0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
                },
            },
        ],
    }).then(console.log)
0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160

// Use an AccountKey instance
> const accountKey = caver.account.create('0x{address in hex}', '0xf1d2e...').accountKey
> caver.rpc.klay.encodeAccountKey(accountKey).then(console.log)
0x02a102f1d2e558cfa07151534cd406b1ac5c25d99e9c1cf925328d14fd15c6fe50df27
```

## caver.rpc.klay.decodeAccountKey <a href="#caver-rpc-klay-decodeaccountkey" id="caver-rpc-klay-decodeaccountkey"></a>

```javascript
caver.rpc.klay.decodeAccountKey(encodedKey [, callback])
```

RLPエンコードされたAccountKeyをデコードする。 また、[caver.account.accountKey.decode](../caver.account.md#caver-account-accountkey-decode)を使用すると、RLPエンコードされたAccountKeyをデコードすることができます。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                  |
| -------- | ----- | ----------------------------------------------------------------------------------- |
| エンコード・キー | ストリング | RLPエンコードされたAccountKey。                                                              |
| コールバック   | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                  |
| ------ | ----------------------------------- |
| オブジェクト | オブジェクトは `keyType` と `key` を内部に定義する。 |

**例**

```javascript
// AccountKey タイプ：AccountKeyLegacy
> caver.rpc.klay.decodeAccountKey('0x01c0').then(console.log)
{ keyType：1, キー: {}。}

// AccountKey タイプ：AccountKeyPublic
> caver.rpc.klay.decodeAccountKey('0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8').then(console.log)
{
    keyType：2,
    key: {
        x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
        y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
    },
}.

// AccountKey タイプ：AccountKeyFail
> caver.rpc.klay.decodeAccountKey('0x03c0').then(console.log)
{ keyType：3, キー: {}。}

// AccountKey タイプ：AccountKeyWeightedMultiSig
> caver.rpc.klay.decodeAccountKey('0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb').then(console.log)
{
    keyType：4,
    key: {
        threshold: 2,
        keys：[
            {
                weight: 1,
                key: {
                    x: '0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e',
                    y: '0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712',
                },
            },
            {
                weight: 1,
                key: {
                    x: '0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb',
                    y: '0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842',
                },
            },
        ],
    },
}.


// AccountKey タイプ：AccountKeyRoleBased
> caver.rpc.klay.decodeAccountKey('0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160').then(console.log)
{
    keyType：5,
    key: [
        {
            keyType：2,
            key: {
                x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
            },
        },
        {
            keyType：4,
            key: {
                threshold: 2,
                keys：[
                    {
                        weight: 1,
                        key: {
                            x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                            y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                        },
                    },
                    {
                        weight: 1,
                        key: {
                            x: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06',
                            y: '0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
                        },
                    },
                ],
            },
        },
        {
            keyType：2,
            key: {
                x: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447',
                y: '0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
            },
        },
    ],
}.
```

## caver.rpc.klay.getBalance <a href="#caver-rpc-klay-getbalance" id="caver-rpc-klay-getbalance"></a>

```javascript
caver.rpc.klay.getBalance(address [, blockNumber] [, callback])
```

指定した住所の口座の残高を kaia で返します。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| 住所     | ストリング       | 残高を取得したい口座のアドレス。                                                                               |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                    |
| ----- | --------------------- |
| ストリング | 指定されたアドレスの現在の残高（peb）。 |

**例**

```javascript
> caver.rpc.klay.getBalance('0x{address in hex}').then(console.log)
0xde0b6b3a7640000
```

## caver.rpc.klay.getCode <a href="#caver-rpc-klay-getcode" id="caver-rpc-klay-getcode"></a>

```javascript
caver.rpc.klay.getCode(address [, blockNumber] [, callback])
```

指定されたアドレスのコードを返す。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| 住所     | ストリング       | コードを取得するアドレス。                                                                                  |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明             |
| ----- | -------------- |
| ストリング | 指定されたアドレスのコード。 |

**例**

```javascript
> caver.rpc.klay.getCode('0x{address in hex}').then(console.log)
0x60806...
```

## caver.rpc.klay.getTransactionCount <a href="#caver-rpc-klay-gettransactioncount" id="caver-rpc-klay-gettransactioncount"></a>

```javascript
caver.rpc.klay.getTransactionCount(address [, blockNumber] [, callback])
```

トランザクション数： アドレスから送信されたトランザクションの総数を返します。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                                                                                                       |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 住所     | ストリング       | 取引件数を取得するアドレス。                                                                                                                                                           |
| ブロック番号 | number \\ | (optional) A block number, the string `pending` for the pending nonce, or the string `earliest` or `latest`. 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。                                                                                      |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                               |
| ----- | -------------------------------- |
| ストリング | 指定されたアドレスから送信されたトランザクション数（16進数）。 |

**例**

```javascript
> caver.rpc.klay.getTransactionCount('0x{address in hex}').then(console.log)
0x5f
```

## caver.rpc.klay.isContractAccount <a href="#caver-rpc-klay-iscontractaccount" id="caver-rpc-klay-iscontractaccount"></a>

```javascript
caver.rpc.klay.isContractAccount(address [, blockNumber] [, callback])
```

入力口座が特定のブロック番号の時点で空でない codeHash を持つ場合に `true` を返す。 口座がEOAまたはスマートコントラクトの口座でcodeHashを持っていない場合は`false`を返す。 詳しくは[スマートコントラクトアカウント](../../../../../learn/accounts.md#smart-contract-accounts-scas)をご参照ください。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| 住所     | ストリング       | チェックしたいアドレスはContractAccountである。                                                                |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `boolean` を返す。

| タイプ   | 説明                                          |
| ----- | ------------------------------------------- |
| ブーリアン | trueは、入力パラメータが既存のスマートコントラクトのアドレスであることを意味する。 |

**例**

```javascript
> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
false

> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.sign <a href="#caver-rpc-klay-sign" id="caver-rpc-klay-sign"></a>

```javascript
caver.rpc.klay.sign(address, message [, blockNumber] [, callback])
```

カイア固有の署名データを生成する。 Refer to [Kaia Platform API - klay_sign](https://docs.kaia.io/references/json-rpc/klay/sign/) to know how the signature is generated.

**NOTE**: This API provides the function to sign a message using an [imported account](https://docs.kaia.io/references/json-rpc/personal/import-raw-key/) in your kaia node. The imported account in your node must be [unlocked](https://docs.kaia.io/references/json-rpc/personal/unlock-account/) to sign the message. To sign a transaction with imported account in your kaia node, use [caver.rpc.klay.signTransaction](#caverrpcklaysigntransaction).

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| 住所     | ストリング       | メッセージに署名するためにインポートされたアカウントのアドレス。                                                               |
| メッセージ  | ストリング       | サインへのメッセージ                                                                                     |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                      |
| ----- | ----------------------- |
| ストリング | インポートされたアカウントから作成された署名。 |

**例**

```javascript
> caver.rpc.klay.sign('0x{address in hex}', '0xdeadbeaf').then(console.log)
0x1066e052c4be821daa4d0a0cd1e9e75ccb200bb4001c2e38853ba41b712a5a226da2acd67c86a13b266e0d75d0a6e7d1551c8924af413267615a5948617c746c1c
```

## caver.rpc.klay.getAccounts <a href="#caver-rpc-klay-getaccounts" id="caver-rpc-klay-getaccounts"></a>

```javascript
caver.rpc.klay.getAccounts([コールバック])
```

kaiaノードが所有するアドレスのリストを返します。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `Array` を返す。

| タイプ | 説明                   |
| --- | -------------------- |
| 配列  | kaiaノードが所有するアドレスの配列。 |

**例**

```javascript
> caver.rpc.klay.getAccounts().then(console.log)
[
    '0xe1531e916857d1b3a7db92f9187b96a7b43813bf',
    '0x75331c25535052157ff5110ba7d0cf940d3a9ca6'
].
```

## caver.rpc.klay.getBlockNumber <a href="#caver-rpc-klay-getblocknumber" id="caver-rpc-klay-getblocknumber"></a>

```javascript
caver.rpc.klay.getBlockNumber([コールバック])
```

直近のブロックの番号を返す。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                  |
| ----- | ------------------- |
| ストリング | 直近のブロックの番号を16進数で表す。 |

**例**

```javascript
> caver.rpc.klay.getBlockNumber().then(console.log)
0x5d39
```

## caver.rpc.klay.getHeader <a href="#caver-rpc-klay-getheader" id="caver-rpc-klay-getheader"></a>

```javascript
caver.rpc.klay.getHeader(blockNumberOrHash [, callback])
```

ブロックヘッダをブロックハッシュまたはブロック番号で返す。 ユーザがブロックハッシュをパラメータとして渡すと、[caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash)が呼び出され、ブロック番号をパラメータとして呼び出すと、[caver.rpc.klay.getHeaderByNumber](#caver-rpc-klay-getheaderbynumber)が呼び出される。

**パラメーター**

| 名称            | タイプ         | 説明                                                                                  |
| ------------- | ----------- | ----------------------------------------------------------------------------------- |
| ブロック番号またはハッシュ | number \\ | ブロックハッシュ、番号、またはブロックタグ文字列。                                                           |
| コールバック        | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                                                                                                                                       |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | ブロックヘッダーオブジェクト。 戻り値の詳細については、[caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash) を参照してください。 |

**例**

```javascript
> caver.rpc.klay.getHeader(1).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed：'0x0',
  governanceData: '0x',
  hash：'0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000....',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward：'0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp：'0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}.
```

## caver.rpc.klay.getHeaderByNumber <a href="#caver-rpc-klay-getheaderbynumber" id="caver-rpc-klay-getheaderbynumber"></a>

```javascript
caver.rpc.klay.getHeaderByNumber(ブロック番号 [, returnTransactionObjects] [, コールバック)
```

ブロックヘッダをブロック番号で返す。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                  |
| ------ | ----------- | ----------------------------------------------------------------------------------- |
| ブロック番号 | number \\ | ブロック番号またはブロックタグ文字列。                                                                 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                                                                                                                                       |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | ブロックヘッダーオブジェクト。 戻り値の詳細については、[caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash) を参照してください。 |

**例**

```javascript
> caver.rpc.klay.getHeaderByNumber(765139).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed：'0x0',
  governanceData: '0x',
  hash：'0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000....',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward：'0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp：'0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}.
```

## caver.rpc.klay.getHeaderByHash <a href="#caver-rpc-klay-getheaderbyhash" id="caver-rpc-klay-getheaderbyhash"></a>

```javascript
caver.rpc.klay.getHeaderByHash(blockHash [, returnTransactionObjects] [, callback])
```

`blockHash` を使用して、最新のブロックのブロック番号を返す。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                  |
| -------- | ----- | ----------------------------------------------------------------------------------- |
| ブロックハッシュ | ストリング | ブロックハッシュ。                                                                           |
| コールバック   | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise`は `object` を返す - オブジェクトはブロックヘッダを含む：

| 名称          | タイプ   | 説明                                                                                      |
| ----------- | ----- | --------------------------------------------------------------------------------------- |
| 基本ガス料金      | ストリング | ガス1本あたりの基本料金。 この値は、そのブロック番号に対して EthTxTypeCompatibleBlock が有効になっている場合にのみ返される。            |
| ブロックスコア     | ストリング | ブロックチェーン・ネットワークにおけるマイニングの難易度。 `blockScore`の使い方は、ネットワークのコンセンサスとは異なる。 BFTコンセンサスエンジンでは常に1。 |
| エクストラデータ    | ストリング | このブロックの「追加データ」フィールド。                                                                    |
| ガス使用済み      | ストリング | このブロック内のすべての取引で使用されたガスの合計。                                                              |
| ガバナンスデータ    | ストリング | RLPエンコードされたガバナンス・コンフィギュレーション                                                            |
| ハッシュ        | ストリング | ブロックのハッシュ。 ペンディングブロックの場合は `null` となる。                                                   |
| ログブルーム      | ストリング | ブロックのログのブルームフィルター。 ペンディングブロックの場合は `null` となる。                                           |
| 番号          | ストリング | ブロック番号。 ペンディングブロックの場合は `null` となる。                                                      |
| 親ハッシュ       | ストリング | 親ブロックのハッシュ。                                                                             |
| レシートルート     | ストリング | ブロックの受信トライのルート。                                                                         |
| 報酬          | ストリング | ブロック報奨金が贈られた受益者の住所。                                                                     |
| ステートルート     | ストリング | ブロックの最終状態トライのルート。                                                                       |
| タイムスタンプ     | ストリング | ブロックが照合された時のunixタイムスタンプ。                                                                |
| タイムスタンプフォース | ストリング | ブロックが照合されたタイムスタンプの秒の単位。                                                                 |
| トランザクションルート | ストリング | ブロックのトランザクショントライのルート。                                                                   |

**例**

```javascript
> caver.rpc.klay.getHeaderByHash('0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3').then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed：'0x0',
  governanceData: '0x',
  hash：'0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000....',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward：'0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp：'0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}.
```

## caver.rpc.klay.getBlock <a href="#caver-rpc-klay-getblock" id="caver-rpc-klay-getblock"></a>

```javascript
caver.rpc.klay.getBlock(blockNumberOrHash [, returnTransactionObjects] [, callback])
```

ブロックに関する情報をブロックハッシュまたはブロック番号で返す。 ユーザがブロックハッシュをパラメータとして渡すと、[caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash)が呼び出され、ブロック番号をパラメータとして呼び出すと、[caver.rpc.klay.getBlockByNumber](#caver-rpc-klay-getblockbynumber)が呼び出される。

**パラメーター**

| 名称                       | タイプ         | 説明                                                                                                                       |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| ブロック番号またはハッシュ            | number \\ | ブロックハッシュ、番号、またはブロックタグ文字列。                                                                                                |
| returnTransactionObjects | ブーリアン       | (オプション、デフォルト `false`) `true` の場合、返されるブロックには全てのトランザクションがオブジェクトとして含まれ、`false` の場合、トランザクションのハッシュのみが含まれる。 |
| コールバック                   | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。                                      |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                                                                                                                              |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | ブロックオブジェクト。 戻り値の詳細については、[caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash) を参照のこと。 |

**例**

```javascript
> caver.rpc.klay.getBlock(1).then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed：'0x0',
    governanceData: '0x',
    hash：'0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000....',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward：'0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp：'0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions：[],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x',
}.
```

## caver.rpc.klay.getBlockByNumber <a href="#caver-rpc-klay-getblockbynumber" id="caver-rpc-klay-getblockbynumber"></a>

```javascript
caver.rpc.klay.getBlockByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

ブロックに関する情報をブロック番号で返す。

**パラメーター**

| 名称                       | タイプ         | 説明                                                                                                                         |
| ------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| ブロック番号                   | number \\ | ブロック番号、または文字列 (`genesis` または `latest`) でタグ付けされたブロック。                                                    |
| returnTransactionObjects | ブーリアン       | (オプション、デフォルト `false`) `true` の場合、返されるブロックには全てのトランザクションがオブジェクトとして格納され、`false` の場合はトランザクションのハッシュのみが格納される。 |
| コールバック                   | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。                                        |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                                                                                                                                 |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | ブロックオブジェクト。 戻り値の詳細については、[caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash) を参照してください。 |

**例**

```javascript
> caver.rpc.klay.getBlockByNumber(1).then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed：'0x0',
    governanceData: '0x',
    hash：'0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000....',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward：'0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp：'0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions：[],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}.
```

## caver.rpc.klay.getBlockByHash <a href="#caver-rpc-klay-getblockbyhash" id="caver-rpc-klay-getblockbyhash"></a>

```javascript
caver.rpc.klay.getBlockByHash(blockHash [, returnTransactionObjects] [, callback])
```

`blockHash` を使用して、最新のブロックのブロック番号を返す。

**パラメーター**

| 名称                       | タイプ   | 説明                                                                                                                         |
| ------------------------ | ----- | -------------------------------------------------------------------------------------------------------------------------- |
| ブロックハッシュ                 | ストリング | ブロックハッシュ。                                                                                                                  |
| returnTransactionObjects | ブーリアン | (オプション、デフォルト `false`) `true` の場合、返されるブロックには全てのトランザクションがオブジェクトとして格納され、`false` の場合はトランザクションのハッシュのみが格納される。 |
| コールバック                   | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。                                        |

**リターン・バリュー**

`Promise`は `object` を返す - ブロックを含むオブジェクト：

| 名称          | タイプ   | 説明                                                                                      |
| ----------- | ----- | --------------------------------------------------------------------------------------- |
| 基本ガス料金      | ストリング | ガス1本あたりの基本料金。 この値は、そのブロック番号に対して EthTxTypeCompatibleBlock が有効になっている場合にのみ返される。            |
| ブロックスコア     | ストリング | ブロックチェーン・ネットワークにおけるマイニングの難易度。 `blockScore`の使い方は、ネットワークのコンセンサスとは異なる。 BFTコンセンサスエンジンでは常に1。 |
| エクストラデータ    | ストリング | このブロックの「追加データ」フィールド。                                                                    |
| ガス使用済み      | ストリング | このブロック内のすべての取引で使用されたガスの合計。                                                              |
| ガバナンスデータ    | ストリング | RLPエンコードされたガバナンス・コンフィギュレーション                                                            |
| ハッシュ        | ストリング | ブロックのハッシュ。 ペンディングブロックの場合は `null` となる。                                                   |
| ログブルーム      | ストリング | ブロックのログのブルームフィルター。 ペンディングブロックの場合は `null` となる。                                           |
| 番号          | ストリング | ブロック番号。 ペンディングブロックの場合は `null` となる。                                                      |
| 親ハッシュ       | ストリング | 親ブロックのハッシュ。                                                                             |
| レシートルート     | ストリング | ブロックの受信トライのルート。                                                                         |
| 報酬          | ストリング | ブロック報奨金が贈られた受益者の住所。                                                                     |
| サイズ         | ストリング | このブロックのサイズをバイト単位で表した整数。                                                                 |
| ステートルート     | ストリング | ブロックの最終状態トライのルート。                                                                       |
| タイムスタンプ     | ストリング | ブロックが照合された時のunixタイムスタンプ。                                                                |
| タイムスタンプフォース | ストリング | ブロックが照合されたタイムスタンプの秒の単位。                                                                 |
| トータルブロックスコア | ストリング | このブロックまでのチェーンのブロックスコアの合計を表す整数。                                                          |
| 取引          | 配列    | トランザクションオブジェクトの配列、または `returnTransactionObjects` パラメータに応じて 32 バイトのトランザクションハッシュ。         |
| トランザクションルート | ストリング | ブロックのトランザクショントライのルート。                                                                   |
| 投票データ       | ストリング | 提案者のRLPエンコードされたガバナンス投票。                                                                 |

**例**

```javascript
> caver.rpc.klay.getBlockByHash('0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b').then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed：'0x0',
    governanceData: '0x',
    hash：'0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000....',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward：'0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp：'0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions：[],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}.
```

## caver.rpc.klay.getBlockReceipts <a href="#caver-rpc-klay-getblockreceipts" id="caver-rpc-klay-getblockreceipts"></a>

```javascript
caver.rpc.klay.getBlockReceipts(blockHash [, callback])
```

ブロックハッシュで識別されるブロックに含まれるレシートを返します。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                  |
| -------- | ----- | ----------------------------------------------------------------------------------- |
| ブロックハッシュ | ストリング | ブロックハッシュ。                                                                           |
| コールバック   | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `Array` を返す。

| タイプ | 説明                                                                                                                                                                                                                      |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 配列  | ブロックに含まれる取引レシート。 ターゲットブロックにトランザクションが含まれていない場合、空の配列 `[]` が返される。 トランザクション・レシートの詳細については、[caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) を参照。 |

**例**

```javascript
> caver.rpc.klay.getBlockReceipts('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
[ 
    {
        blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
        blockNumber: '0x5301',
        contractAddress: null,
        from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
        gas: '0x61a8',
        gasPrice: '0x5d21dba00',
        gasUsed: '0x5208',
        logs: [],
        logsBloom: '0x00000...',
        nonce: '0x5e',
        senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
        signatures: [
            { 
                V: '0x4e44',
                R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
                S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
            }    
        ],
        status: '0x1',
        to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
        transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
        transactionIndex: '0x0',
        type: 'TxTypeValueTransfer',
        typeInt: 8,
        value: '0xde0b6b3a7640000'
    }
]
```

## caver.rpc.klay.getBlockTransactionCountByNumber <a href="#caver-rpc-klay-getblocktransactioncountbynumber" id="caver-rpc-klay-getblocktransactioncountbynumber"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByNumber(ブロック番号 [, コールバック])
```

指定されたブロック番号に一致するブロック内のトランザクション数を返す。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                  |
| ------ | ----------- | ----------------------------------------------------------------------------------- |
| ブロック番号 | number \\ | ブロック番号またはブロックタグ文字列 (`genesis` または `latest`)。                     |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                          |
| ----- | --------------------------- |
| ストリング | 指定されたブロック内のトランザクション数（16進数）。 |

**例**

```javascript
> caver.rpc.klay.getBlockTransactionCountByNumber(21249).then(console.log)
0x1
```

## caver.rpc.klay.getBlockTransactionCountByHash <a href="#caver-rpc-klay-getblocktransactioncountbyhash" id="caver-rpc-klay-getblocktransactioncountbyhash"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByHash(blockHash [, callback])
```

与えられたブロックハッシュにマッチするブロック内のトランザクション数を返す。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                  |
| -------- | ----- | ----------------------------------------------------------------------------------- |
| ブロックハッシュ | ストリング | ブロックハッシュ。                                                                           |
| コールバック   | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                          |
| ----- | --------------------------- |
| ストリング | 指定されたブロック内のトランザクション数（16進数）。 |

**例**

```javascript
> caver.rpc.klay.getBlockTransactionCountByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
0x1
```

## caver.rpc.klay.getBlockWithConsensusInfoByNumber <a href="#caver-rpc-klay-getblockwithconsensusinfobynumber" id="caver-rpc-klay-getblockwithconsensusinfobynumber"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByNumber(ブロック番号 [, コールバック])
```

与えられたブロック番号に一致するコンセンサス情報を持つブロックを返す。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                  |
| ------ | ----------- | ----------------------------------------------------------------------------------- |
| ブロック番号 | number \\ | ブロック番号またはブロックタグ文字列 (`genesis` または `latest`)。                     |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ   | 説明                                                                                                                                                                                                   |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ストリング | オブジェクトは、コンセンサス情報を持つブロックを含む。 戻り値の詳細については、[caver.rpc.klay.getBlockWithConsensusInfoByHash](#caver-rpc-klay-getblockwithconsensusinfobyhash) を参照してください。 |

**例**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByNumber(21249).then(console.log)
{
    blockscore: '0x1',
    committee: ['0xddc2002b729676dfd906484d35bb02a8634d7040', '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'],
    extraData: '0xd8830...',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
    logsBloom: '0x00000...',
    number: '0x5301',
    parentHash: '0x024f05c0e7428e33331104bedbfc453d481ce6a2f5e57f7fd68a4391ba6c2619',
    proposer: '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0xb74837f495060f3f794dcae8fa3e0c5d3cf99d9f',
    size: '0x313',
    stateRoot: '0x9964b2d8f23da7383a32ec33c9700a76ebf4a36315c9067c2fef7568d97e1d55',
    timestamp: '0x5ee851dd',
    timestampFoS: '0x0',
    totalBlockScore: '0x5302',
    transactions: [
        {
            blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
            blockNumber: '0x5301',
            contractAddress: null,
            from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
            gas: '0x61a8',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x5208',
            logs: [],
            logsBloom: '0x00000...',
            nonce: '0x5e',
            senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
            signatures: {
                V: '0x4e44',
                R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
                S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
            },
            status: '0x1',
            to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
            transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
            transactionIndex: '0x0',
            type: 'TxTypeValueTransfer',
            typeInt: 8,
            value: '0xde0b6b3a7640000',
        },
    ],
    transactionsRoot: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
    voteData: '0x',
}
```

## caver.rpc.klay.getBlockWithConsensusInfoByHash <a href="#caver-rpc-klay-getblockwithconsensusinfobyhash" id="caver-rpc-klay-getblockwithconsensusinfobyhash"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByHash(blockHash [, callback])
```

与えられたハッシュと一致するコンセンサス情報を持つブロックを返す。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                  |
| -------- | ----- | ----------------------------------------------------------------------------------- |
| ブロックハッシュ | ストリング | ブロックハッシュ。                                                                           |
| コールバック   | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` - コンセンサス情報 (提案者と委員のリスト) を含むブロックオブジェクト、またはブロックが見つからなかった場合は null を返す：

| 名称          | タイプ   | 説明                                                                   |
| ----------- | ----- | -------------------------------------------------------------------- |
| ブロックスコア     | ストリング | かつての困難。 BFTコンセンサスエンジンでは常に1                                           |
| 委員会         | 配列    | このブロックの委員会メンバーのアドレスの配列。 委員会は、このブロックのコンセンサスプロトコルに参加したバリデーターのサブセットである。 |
| エクストラデータ    | ストリング | このブロックの「追加データ」フィールド。                                                 |
| ガス使用済み      | ストリング | このブロック内のすべての取引で使用されたガスの合計。                                           |
| ガバナンスデータ    | ストリング | RLPエンコードされたガバナンス・コンフィギュレーション                                         |
| ハッシュ        | ストリング | ブロックのハッシュ。 ペンディングブロックの場合は `null` となる。                                |
| ログブルーム      | ストリング | ブロックのログのブルームフィルター。 ペンディングブロックの場合は `null` となる。                        |
| 番号          | ストリング | ブロック番号。 ペンディングブロックの場合は `null` となる。                                   |
| 発起人         | ストリング | 同じブロック番号で0ラウンドの提案。                                                   |
| 親ハッシュ       | ストリング | 親ブロックのハッシュ。                                                          |
| 提出者         | ストリング | ブロック提案者の住所。                                                          |
| レシートルート     | ストリング | ブロックの受信トライのルート。                                                      |
| 報酬          | ストリング | ブロック報奨金が贈られた受益者の住所。                                                  |
| ラウンド        | 番号    | 丸数字。                                                                 |
| サイズ         | ストリング | このブロックのサイズをバイト単位で表した整数。                                              |
| ステートルート     | ストリング | ブロックの最終状態トライのルート。                                                    |
| タイムスタンプ     | ストリング | ブロックが照合された時のunixタイムスタンプ。                                             |
| タイムスタンプフォース | ストリング | ブロックが照合されたタイムスタンプの秒の単位。                                              |
| トータルブロックスコア | ストリング | このブロックまでのチェーンのブロックスコアの合計を表す整数。                                       |
| 取引          | 配列    | トランザクションオブジェクトの配列。                                                   |
| トランザクションルート | ストリング | ブロックのトランザクショントライのルート。                                                |
| 投票データ       | ストリング | 提案者のRLPエンコードされたガバナンス投票                                               |

**例**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
{
    blockscore: '0x1',
    committee: [ '0x571e5...', '0x5cb1a...', '0x99fb1...', '0xb74ff...' ],
    extraData: '0xd8830...',
    gasUsed: '0x3ea49',
    governanceData: '0x',
    hash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
    logsBloom: '0x00000...',
    number: '0x3f79aa7',
    originProposer: '0x99fb17d324fa0e07f23b49d09028ac0919414db6',
    parentHash: '0x777d344c8c59c4d8d0041bb4c2ee66e95ec110303fb59d3e329f80e7a9c9c617',
    proposer: '0x99fb17d324fa0e07f23b49d09028ac0919414db6',
    receiptsRoot: '0xffbae3190f858531ff785bcbdc70278d91c3d9becdd8b134b0ab7974b9ef3641',
    reward: '0xb2bd3178affccd9f9f5189457f1cad7d17a01c9d',
    round: 0,
    size: '0x507',
    stateRoot: '0xa60d0868bd41b63b4fd67e5a8f801c5949e89a8994a13426747890b77d6bc0c4',
    timestamp: '0x610b3164',
    timestampFoS: '0xc',
    totalBlockScore: '0x3f79aa8',
    transactions: [
        {
            blockHash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
            blockNumber: '0x3f79aa7',
            contractAddress: null,
            feePayer: '0xfee998d423d5bd2bf5b5c0f0acb4e3aae2bd2286',
            feePayerSignatures: [
                {
                    V: '0x7f5',
                    R: '0xf9aff6f39feb7a18d3e1b8ab9f590f0227e465c72cfe05e8d7c9e390cbf1d349',
                    S: '0x6e7317d121a3951a8cbca110be8cc86c5314349f8fb1c37f9af4cadf72fe89ec',
                },
            ],
            from: '0x11eb23f57151a88d4bb53cc9c27355437138c278',
            gas: '0x2dc6c0',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x3ea49',
            input: '0x850ba...',
            logs: [
                {
                    address: '0x78ca9a1105c3392b56625f3fcfd149b29322c56f',
                    topics: [ '0xddf25...', '0x00000...', '0x00000...', '0x00000...' ],
                    data: '0x',
                    blockNumber: '0x3f79aa7',
                    transactionHash: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
                    transactionIndex: '0x0',
                    blockHash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
                    logIndex: '0x0',
                    removed: false,
                },
            ],
            logsBloom: '0x00000...',
            nonce: '0x0',
            senderTxHash: '0xeca2d3650403a1e27af0bbe9878dcbb248d764fc88751f35a6e05636d2ad9e78',
            signatures: [
                {
                    V: '0x7f6',
                    R: '0x9ea78985b004afa86acd455c017da374ec1aec885f963ec8134a38f7ede451b0',
                    S: '0xfac0e417f7f7b15023e3f5ac95f1fb5b3280746a2eff04394ddedbdd259fc1',
                },
            ],
            status: '0x1',
            to: '0x78ca9a1105c3392b56625f3fcfd149b29322c56f',
            transactionHash: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
            transactionIndex: '0x0',
            type: 'TxTypeFeeDelegatedSmartContractExecution',
            typeInt: 49,
            value: '0x0',
        },
    ],
    transactionsRoot: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
    voteData: '0x',
}
```

## caver.rpc.klay.getCommittee <a href="#caver-rpc-klay-getcommittee" id="caver-rpc-klay-getcommittee"></a>

```javascript
caver.rpc.klay.getCommittee([blockNumber] [, callback])
```

指定したブロックの委員会に含まれるすべてのバリデータの一覧を返します。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `Array` を返す。

| タイプ | 説明                                 |
| --- | ---------------------------------- |
| 配列  | 指定されたブロックにおける、委員会内のすべてのバリデータのアドレス。 |

**例**

```javascript
> caver.rpc.klay.getCommittee().then(console.log)
[
    '0xddc2002b729676dfd906484d35bb02a8634d7040',
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'
].
```

## caver.rpc.klay.getCommitteeSize <a href="#caver-rpc-klay-getcommitteesize" id="caver-rpc-klay-getcommitteesize"></a>

```javascript
caver.rpc.klay.getCommitteeSize([blockNumber] [, callback])
```

指定されたブロックにおける委員会のサイズを返す。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

プロミス`は `number\` を返す。

| タイプ | 説明                    |
| --- | --------------------- |
| 番号  | 与えられたブロックにおける委員会のサイズ。 |

**例**

```javascript
> caver.rpc.klay.getCommitteeSize().then(console.log)
2
```

## caver.rpc.klay.getCouncil <a href="#caver-rpc-klay-getcouncil" id="caver-rpc-klay-getcouncil"></a>

```javascript
caver.rpc.klay.getCouncil([blockNumber] [, callback])
```

指定したブロックにあるすべてのバリデータの一覧を返します。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

`Promise` は `Array` を返す。

| タイプ | 説明                                                    |
| --- | ----------------------------------------------------- |
| 配列  | 指定したブロックのカウンシルのバリデータアドレスの配列、 またはカウンシルが見つからない場合は null。 |

**例**

```javascript
> caver.rpc.klay.getCouncil().then(console.log)
[
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    '0xddc2002b729676dfd906484d35bb02a8634d7040'
].
```

## caver.rpc.klay.getCouncilSize <a href="#caver-rpc-klay-getcouncilsize" id="caver-rpc-klay-getcouncilsize"></a>

```javascript
caver.rpc.klay.getCouncilSize([blockNumber] [, callback])
```

指定されたブロックの評議会のサイズを返す。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                             |
| ------ | ----------- | ---------------------------------------------------------------------------------------------- |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

**リターン・バリュー**

プロミス`は `number\` を返す。

| タイプ | 説明                |
| --- | ----------------- |
| 番号  | 指定されたブロックの評議会の規模。 |

**例**

```javascript
> caver.rpc.klay.getCouncilSize().then(console.log)
2
```

## caver.rpc.klay.getStorageAt <a href="#caver-rpc-klay-getstorageat" id="caver-rpc-klay-getstorageat"></a>

```javascript
caver.rpc.klay.getStorageAt(address, position [, blockNumber] [, callback])
```

指定されたアドレスの記憶位置から値を返す。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                                                                                                                                    |
| ------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 住所     | ストリング       | ストレージを取得するアドレス。                                                                                                                                                                                       |
| 位置     | 番号          | ストレージのインデックス位置。 For more information on `calculating the position`, refer to [klay_getStorageAt](https://docs.kaia.io/references/json-rpc/klay/get-storage-at/). |
| ブロック番号 | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。                                                                                                        |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。                                                                                                                   |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明         |
| ----- | ---------- |
| ストリング | この保存位置での値。 |

**例**

```javascript
> caver.rpc.klay.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 0).then(console.log)
0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234
```

## caver.rpc.klay.isMinting <a href="#caver-rpc-klay-isminting" id="caver-rpc-klay-isminting"></a>

```javascript
caver.rpc.klay.isMinting([コールバック])
```

クライアントが新しいブロックを積極的に採掘している場合に `true` を返す。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise`は `boolean` - クライアントがマイニング中であれば `true` を返し、そうでなければ `false` を返す。

**例**

```javascript
> caver.rpc.klay.isMinting().then(console.log)
true
```

## caver.rpc.klay.isSyncing <a href="#caver-rpc-klay-issyncing" id="caver-rpc-klay-issyncing"></a>

```javascript
caver.rpc.klay.isSyncing([コールバック])
```

同期状態に関するデータを持つオブジェクトか false を返します。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

プロミス`は `object|boolean`- カイアノードが同期していない場合は`false\` を返す。 そうでない場合は、同期オブジェクトが返される：

| 名称       | タイプ   | 説明                        |
| -------- | ----- | ------------------------- |
| 開始ブロック   | ストリング | 同期を開始したブロック番号（16進数）。      |
| カレントブロック | ストリング | ノードが現在同期しているブロック番号（16進数）。 |
| 最高ブロック   | ストリング | 同期するブロック番号（16進数）。         |
| 既知の状態    | ストリング | ダウンロードするには、16進数で推定された状態。  |
| プルステート   | ストリング | すでにダウンロードされた16進数の状態。      |

**例**

```javascript
> caver.rpc.klay.isSyncing().then(console.log)
{
        startingBlock: 100,
        currentBlock：312,
        highestBlock: 512,
        knownStates：234566,
        pulledStates：123455
}.

> caver.rpc.klay.isSyncing().then(console.log)
false
```

## caver.rpc.klay.call <a href="#caver-rpc-klay-call" id="caver-rpc-klay-call"></a>

```javascript
caver.rpc.klay.call(callObject [, blockNumber] [, callback])
```

ブロックチェーン上にトランザクションを送信することなく、新しいメッセージコールを直ちに実行する。 エラーが発生した場合は、データまたはJSON RPCのエラー・オブジェクトを返す。

**パラメーター**

| 名称        | タイプ         | 説明                                                                                             |
| --------- | ----------- | ---------------------------------------------------------------------------------------------- |
| コールオブジェクト | オブジェクト      | トランザクションコールオブジェクト。 オブジェクトのプロパティは次の表を参照。                                                        |
| ブロック番号    | number \\ | (オプション) ブロック番号、または `latest` または `earliest` という文字列。 省略した場合は `latest` が使用される。 |
| コールバック    | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。            |

`callObject`は以下のプロパティを持つ：

| 名称   | タイプ   | 説明                                                                                                                                                                                                                                                                                |
| ---- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| への   | ストリング | (新しいコントラクトのデプロイメントをテストする場合はオプション) トランザクションの送信先アドレス。                                                                                                                                                                                                            |
| 入力   | ストリング | (オプション) メソッドのシグネチャとエンコードされたパラメータのハッシュ。 caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall) を使用できます。 |
| より   | ストリング | (オプション) トランザクションの送信元アドレス。                                                                                                                                                                                                                                      |
| ガス   | ストリング | (オプション) トランザクション実行のために提供されるガス。 `klay_call`はガスを消費しないが、実行によってはこのパラメータが必要になることがある。                                                                                                                                                                                |
| ガス価格 | ストリング | (オプション) 各有料ガスに使用される gasPrice。                                                                                                                                                                                                                                  |
| 価値   | ストリング | (オプション) このトランザクションと共に `peb` で送られる値。                                                                                                                                                                                                                            |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                                   |
| ----- | ------------------------------------ |
| ストリング | 呼び出しの返されたデータ。 例えば、スマート・コントラクト関数の戻り値。 |

**例**

```javascript
> caver.rpc.klay.call({ 
        to：'0x5481a10a47C74f800BDF4955BD77550881bde91C', // 契約アドレス
        input: '0x70a082310000000000000000ddc2002b729676dfd906484d35bb02a8634d7040'
    }).then(console.log)
0x000000000000000000000000000de0b6b3a7640000
```

## caver.rpc.klay.estimateGas <a href="#caver-rpc-klay-estimategas" id="caver-rpc-klay-estimategas"></a>

```javascript
caver.rpc.klay.estimateGas(callObject [, blockNumber] [, callback])
```

トランザクションを完了させるために必要な `gas` の量の見積もりを生成して返す。 この方法による取引はブロックチェーンに追加されない。

**パラメーター**

caver.rpc.klay.call](#caver-rpc-klay-call) パラメータを参照。ただし、すべてのプロパティはオプションである。

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明      |
| ----- | ------- |
| ストリング | ガスの使用量。 |

**例**

```javascript
> caver.rpc.klay.estimateGas({ 
        to：'0x5481a10a47C74f800BDF4955BD77550881bde91C', // 契約アドレス
        input: '0x095ea7b300000000000028e4e077686d1aeaf54a1313ff4841181056fe320000000000000000000000000000000a'
    }).then(console.log)
0xb2a0
```

## caver.rpc.klay.estimateComputationCost <a href="#caver-rpc-klay-estimatecomputationcost" id="caver-rpc-klay-estimatecomputationcost"></a>

```javascript
caver.rpc.klay.estimateComputationCost(callObject [, blockNumber] [, callback])
```

トランザクションの実行にかかる `計算コスト` の見積もりを生成して返す。 kaiaは現在、1つのトランザクションにかかる計算コストを`100000000`に制限している。 取引は[caver.rpc.klay.estimateGas](#caver-rpc-klay-estimategas)のようにブロックチェーンに追加されない。

**パラメーター**

caver.rpc.klay.call](#caver-rpc-klay-call) パラメータを参照。ただし、すべてのプロパティはオプションである。

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明         |
| ----- | ---------- |
| ストリング | 使用した計算コスト。 |

**例**

```javascript
> caver.rpc.klay.estimateComputationCost({ 
        to：'0x5481a10a47C74f800BDF4955BD77550881bde91C', // 契約アドレス
        input: '0x095ea7b300000000000028e4e077686d1aeaf54a1313ff4841181056fe320000000000000000000000000000000a'
    }).then(console.log)
0xd761
```

## caver.rpc.klay.getTransactionByBlockHashAndIndex <a href="#caver-rpc-klay-gettransactionbyblockhashandindex" id="caver-rpc-klay-gettransactionbyblockhashandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockHashAndIndex(blockHash, index [, callback])
```

トランザクションに関する情報を `ブロックハッシュ` と `トランザクションインデックス` の位置から返す。

**パラメーター**

| 名称       | タイプ   | 説明                                                                                  |
| -------- | ----- | ----------------------------------------------------------------------------------- |
| ブロックハッシュ | ストリング | ブロックハッシュ。                                                                           |
| インデックス   | 番号    | ブロック内のトランザクションインデックス位置。                                                             |
| コールバック   | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | 詳細は[caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash)を参照。 |

**例**

```javascript
> caver.rpc.klay.getTransactionByBlockHashAndIndex('0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576', 0).then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000'
}
```

## caver.rpc.klay.getTransactionByBlockNumberAndIndex <a href="#caver-rpc-klay-gettransactionbyblocknumberandindex" id="caver-rpc-klay-gettransactionbyblocknumberandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockNumberAndIndex(blockNumber, index [, callback])
```

トランザクションに関する情報を `ブロック番号` と `トランザクションインデックス` の位置から返す。

**パラメーター**

| 名称     | タイプ         | 説明                                                                                  |
| ------ | ----------- | ----------------------------------------------------------------------------------- |
| ブロック番号 | number \\ | ブロック番号またはブロックタグ文字列 (`genesis` または `latest`)。                     |
| インデックス | 番号          | ブロック内のトランザクションインデックス位置。                                                             |
| コールバック | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | 詳細は[caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash)を参照。 |

**例**

```javascript
> caver.rpc.klay.getTransactionByBlockNumberAndIndex(183, 0).then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000'
}
```

## caver.rpc.klay.getTransactionByHash <a href="#caver-rpc-klay-gettransactionbyhash" id="caver-rpc-klay-gettransactionbyhash"></a>

```javascript
caver.rpc.klay.getTransactionByHash(transactionHash [, callback])
```

トランザクションハッシュで要求されたトランザクションに関する情報を返す。

**パラメーター**

| 名称           | タイプ   | 説明                                                                                  |
| ------------ | ----- | ----------------------------------------------------------------------------------- |
| トランザクションハッシュ | ストリング | トランザクションハッシュ。                                                                       |
| コールバック       | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

プロミス `Promise` は `object` - トランザクションオブジェクト、またはトランザクションが見つからなかった場合は `null` を返す：

| 名称             | タイプ   | 説明                                                                                                                                                   |
| -------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| ブロックハッシュ       | ストリング | このトランザクションが行われたブロックのハッシュ。                                                                                                                            |
| ブロック番号         | ストリング | この取引が行われたブロック番号。                                                                                                                                     |
| コードフォーマット      | ストリング | (オプション) スマートコントラクトのコードフォーマット。                                                                                                     |
| 料金支払者          | ストリング | (任意）料金支払者の住所。                                                                                                                     |
| 料金支払者の署名       | 配列    | (オプション) 料金支払人の署名オブジェクトの配列。 署名オブジェクトは3つのフィールド（V、R、S）を含む。 VはECDSAリカバリIDを含む。 RはECDSA署名rを含み、SはECDSA署名sを含む。                            |
| 手数料率           | ストリング | (任意）料金支払者の料金比率。 30であれば、料金の30％を支払う。 70％は送り主が負担する。                                                                                  |
| より             | ストリング | 差出人の住所                                                                                                                                               |
| ガス             | ストリング | 送り手が提供するガス。                                                                                                                                          |
| ガス価格           | ストリング | ガス料金は送り手からpebで提供される。                                                                                                                                 |
| ハッシュ           | ストリング | トランザクションのハッシュ。                                                                                                                                       |
| 人間可読           | ブーリアン | (オプション) 人間が読めるアドレスなら `true`、読めないアドレスなら `false` 。                                                                                  |
| キー             | ストリング | (オプション) kaiaアカウントのAccountKeyを更新するために使用されるRLPエンコードされたAccountKey。 詳細は[AccountKey](../../../../../learn/accounts.md#account-key)を参照。 |
| 入力             | ストリング | (オプション) トランザクションとともに送信されるデータ。                                                                                                     |
| ノンス            | ストリング | 送信者がこのトランザクション以前に行ったトランザクションの数。                                                                                                                      |
| 送信者TxHash      | ストリング | (任意）料金支払者の住所と署名のないTXのハッシュ。 この値は、フィー委譲されていないトランザクショ ンにおける`hash`の値と常に同じである。                                                         |
| 署名             | 配列    | 署名オブジェクトの配列。 署名オブジェクトは3つのフィールド（V、R、S）を含む。 VはECDSAリカバリIDを含む。 RはECDSA署名rを含み、SはECDSA署名sを含む。                                                             |
| への             | ストリング | 受信者の住所。 コントラクトをデプロイするトランザクションの場合は `null` である。                                                                                                        |
| トランザクションインデックス | ストリング | ブロック内のトランザクションインデックス位置の整数。                                                                                                                           |
| タイプ            | ストリング | トランザクションのタイプを表す文字列。                                                                                                                                  |
| typeInt        | 番号    | トランザクションのタイプを表す整数。                                                                                                                                   |
| 価値             | ストリング | ペブで移転された価値。                                                                                                                                          |

トランザクションが未処理の `pending` ステータスである場合、`blockHash`、`blockNumber` および `transactionIndex` のデフォルト値が返される。 下の例をご覧ください。

**例**

```javascript
> caver.rpc.klay.getTransactionByHash('0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa').then(console.log)
{
    blockHash: '0xb273976bad5f3d40ba46839c020f61b1629e2362d351e3c9cb32268afc7cb477',
    blockNumber: '0x74c',
    codeFormat: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x3d0900',
    gasPrice: '0x5d21dba00',
    hash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    humanReadable: false,
    input: '0x60806...',
    nonce: '0xa',
    senderTxHash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    signatures: [ { V: '0x4e44', R: '0xe4ac3...', S: '0x5374f...' } ],
    to: null,
    transactionIndex: '0x0',
    type: 'TxTypeSmartContractDeploy',
    typeInt: 40,
    value: '0x0',
}

// When transaction is in pending, default values for `blockHash`, `blockNumber` and `trasnactionIndex` are returned.
> caver.rpc.klay.getTransactionByHash('0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1').then(console.log)
{
    blockHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    blockNumber: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1',
    nonce: '0xd',
    senderTxHash: '0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1',
    signatures: [ { V: '0x4e44', R: '0x73634...', S: '0x479be...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}
```

## caver.rpc.klay.getTransactionBySenderTxHash <a href="#caver-rpc-klay-gettransactionbysendertxhash" id="caver-rpc-klay-gettransactionbysendertxhash"></a>

```javascript
caver.rpc.klay.getTransactionBySenderTxHash(senderTxHash [, callback])
```

送信側トランザクションハッシュが要求したトランザクションに関する情報を返す。

このAPIは、`--sendertxhashindexing`によってインデックス機能がノードで有効になっている場合にのみ、正しい結果を返すことに注意してください。 caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) を使用して、インデックス機能が有効かどうかをチェックする。

**パラメーター**

| 名称        | タイプ   | 説明                                                                                                                                   |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 送信者TxHash | ストリング | 送信者トランザクションハッシュ。 See [SenderTxHash](../../../../../build/transactions/transactions.md#sendertxhash) for more detail. |
| コールバック    | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。                                                  |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | 詳細は[caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash)を参照。 |

**例**

```javascript
> caver.rpc.klay.getTransactionBySenderTxHash('0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa').then(console.log)
{
    blockHash: '0xb273976bad5f3d40ba46839c020f61b1629e2362d351e3c9cb32268afc7cb477',
    blockNumber: '0x74c',
    codeFormat: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x3d0900',
    gasPrice: '0x5d21dba00',
    hash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    humanReadable: false,
    input: '0x60806...',
    nonce: '0xa',
    senderTxHash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    signatures: [ { V: '0x4e44', R: '0xe4ac3...', S: '0x5374f...' } ],
    to: null,
    transactionIndex: '0x0',
    type: 'TxTypeSmartContractDeploy',
    typeInt: 40,
    value: '0x0',
}
```

## caver.rpc.klay.getTransactionReceipt <a href="#caver-rpc-klay-gettransactionreceipt" id="caver-rpc-klay-gettransactionreceipt"></a>

```javascript
caver.rpc.klay.getTransactionReceipt(transactionHash [, callback])
```

トランザクションの受信をトランザクションハッシュで返す。

**注** 取引がまだ処理されていない「保留中」の取引では、領収書を受け取ることはできません。

**パラメーター**

| 名称           | タイプ   | 説明                                                                                  |
| ------------ | ----- | ----------------------------------------------------------------------------------- |
| トランザクションハッシュ | ストリング | トランザクションハッシュ。                                                                       |
| コールバック       | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` - トランザクションのレシートオブジェクト、またはレシートが見つからない場合は `null` を返す：

| 名称             | タイプ   | 説明                                                                                                                                                                                                       |
| -------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ブロックハッシュ       | ストリング | このトランザクションが行われたブロックのハッシュ。                                                                                                                                                                                |
| ブロック番号         | ストリング | この取引が行われたブロック番号。                                                                                                                                                                                         |
| コードフォーマット      | ストリング | (オプション) スマートコントラクトのコードフォーマット。                                                                                                                                                         |
| 契約住所           | ストリング | トランザクションがコントラクトの作成である場合、作成されたコントラクトのアドレス。                                                                                                                                                                |
| 有効ガス価格         | ストリング | 送り主から差し引かれるガス1本あたりの実際の価値。 マグマのハードフォーク以前は、この値は取引のガス価格に等しかった。 Magmaのハードフォーク後は、ブロックヘッダの`baseFee`の値と等しくなる。                                                                                                   |
| 料金支払者          | ストリング | (任意）料金支払者の住所。                                                                                                                                                                         |
| 料金支払者の署名       | 配列    | (オプション) 料金支払人の署名オブジェクトの配列。 署名オブジェクトは3つのフィールド（V、R、S）を含む。 VはECDSAリカバリIDを含む。 RはECDSA署名rを含み、SはECDSA署名sを含む。                                                                                |
| 手数料率           | ストリング | (任意）料金支払者の料金比率。 30であれば、料金の30％を支払う。 70％は送り主が負担する。                                                                                                                                      |
| より             | ストリング | 差出人の住所                                                                                                                                                                                                   |
| ガス             | ストリング | 送り手が提供するガス。                                                                                                                                                                                              |
| ガス価格           | ストリング | ガス料金は送り手からpebで提供される。                                                                                                                                                                                     |
| ガス使用済み         | ストリング | この特定の取引だけで使用されたガスの量。                                                                                                                                                                                     |
| 人間可読           | ブーリアン | (オプション) 人間が読めるアドレスなら `true`、読めないアドレスなら `false` 。                                                                                                                                      |
| キー             | ストリング | (オプション) kaiaアカウントのAccountKeyを更新するために使用されるRLPエンコードされたAccountKey。                                                                                                                       |
| 入力             | ストリング | (オプション) トランザクションとともに送信されるデータ。                                                                                                                                                         |
| 過去ログ           | 配列    | このトランザクションが生成したログオブジェクトの配列。                                                                                                                                                                              |
| ログブルーム         | ストリング | ライトクライアント用のブルームフィルタで、関連ログを素早く取得。                                                                                                                                                                         |
| ノンス            | ストリング | 送信者がこのトランザクション以前に行ったトランザクションの数。                                                                                                                                                                          |
| 送信者TxHash      | ストリング | (オプション) 送信者のみが署名するトランザクションのハッシュ。 See [SenderTxHash](../../../../../build/transactions/transactions.md#sendertxhash). この値は常に、フィー非依存トランザクションの `transactionHash` と同じである。 |
| 署名             | 配列    | 署名オブジェクトの配列。 署名オブジェクトは3つのフィールド（V、R、S）を含む。 VはECDSAリカバリIDを含む。 RはECDSA署名rを含み、SはECDSA署名sを含む。                                                                                                                 |
| ステータス          | ストリング | トランザクションが成功した場合は `0x1`、カイア仮想マシンがトランザクションを戻した場合は `0x0` となる。                                                                                                                                               |
| txエラー          | ストリング | (オプション) `status` が `0x0` の場合の詳細なエラーコード。                                                                                                                                               |
| への             | ストリング | 受信者の住所。 契約作成トランザクションの場合は `null` となる。                                                                                                                                                                     |
| トランザクションハッシュ   | ストリング | トランザクションのハッシュ。                                                                                                                                                                                           |
| トランザクションインデックス | ストリング | ブロック内のトランザクションインデックス位置の整数。                                                                                                                                                                               |
| タイプ            | ストリング | トランザクションのタイプを表す文字列。                                                                                                                                                                                      |
| typeInt        | 番号    | トランザクションのタイプを表す整数。                                                                                                                                                                                       |
| 価値             | ストリング | ペブで移転された価値。                                                                                                                                                                                              |

**NOTE** `effectiveGasPrice` は caver-js [v1.9.0](https://www.npmjs.com/package/caver-js/v/1.9.0) からサポートされています。

**例**

```javascript
// Before the Magma hard fork
> caver.rpc.klay.getTransactionReceipt('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    contractAddress: null,
    effectiveGasPrice: '0x5d21dba00',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// After the Magma hard fork
> caver.rpc.klay.getTransactionReceipt('0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9').then(console.log)
{
  blockHash: '0xaa358681023db9d967ff44577a34aea487c37433ebf6ef349baee50f9d1d2f03',
  blockNumber: '0x99',
  contractAddress: null,
  effectiveGasPrice: '0x5d21dba00',
  from: '0xca7a99380131e6c76cfa622396347107aeedca2d',
  gas: '0x61a8',
  gasPrice: '0xba43b7400',
  gasUsed: '0x5208',
  logs: [],
  logsBloom: '0x00000...',
  nonce: '0x2',
  senderTxHash: '0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9',
  signatures: [ { V: '0x1cb4c6', R: '0x1605e...', S: '0x459cf...' } ],
  status: '0x1',
  to: '0x08ef5d2def29ff4384dd93a73e076d959abbd2f4',
  transactionHash: '0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9',
  transactionIndex: '0x0',
  type: 'TxTypeValueTransfer',
  typeInt: 8,
  value: '0xde0b6b3a7640000'
}
```

## caver.rpc.klay.getTransactionReceiptBySenderTxHash <a href="#caver-rpc-klay-gettransactionreceiptbysendertxhash" id="caver-rpc-klay-gettransactionreceiptbysendertxhash"></a>

```javascript
caver.rpc.klay.getTransactionReceiptBySenderTxHash(senderTxHash [, callback])
```

トランザクションの受信を送信者トランザクションハッシュで返す。

このAPIは、`--sendertxhashindexing`によってインデックス機能がノードで有効になっている場合にのみ、正しい結果を返すことに注意してください。 caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) を使用して、インデックス機能が有効かどうかをチェックする。

**注** 取引がまだ処理されていない「保留中」の取引では、領収書を受け取ることはできません。

**パラメーター**

| 名称        | タイプ   | 説明                                                                                                                                   |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 送信者TxHash | ストリング | 送信者トランザクションハッシュ。 See [SenderTxHash](../../../../../build/transactions/transactions.md#sendertxhash) for more detail. |
| コールバック    | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。                                                  |

**リターン・バリュー**

`Promise` は `object` を返す。

| タイプ    | 説明                                                                                                                                      |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| オブジェクト | 詳細は[caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)を参照のこと。 |

**例**

```javascript
> caver.rpc.klay.getTransactionReceiptBySenderTxHash('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    contractAddress: null,
    effectiveGasPrice: '0x5d21dba00',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}
```

## caver.rpc.klay.sendRawTransaction <a href="#caver-rpc-klay-sendrawtransaction" id="caver-rpc-klay-sendrawtransaction"></a>

```javascript
caver.rpc.klay.sendRawTransaction(signedTransaction [, callback])
```

kaiaに`signed transaction`を送る。

`signedTransaction`パラメータには "RLP-encoded signed transaction "を指定することができる。 `transaction.getRLPEncoding`を使用すると、署名付きトランザクションのRLPエンコードされたトランザクションを取得できる。 便宜上、`caver.rpc.klay.sendRawTransaction` は「署名済みトランザクションインスタンス」もパラメータとして受け付ける。

**パラメーター**

| 名称           | タイプ         | 説明                                                                                  |
| ------------ | ----------- | ----------------------------------------------------------------------------------- |
| 署名付きトランザクション | string \\ | RLPエンコードされた署名付きトランザクションまたは署名付きトランザク ションのインスタンス。                                     |
| コールバック       | 機能          | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

| タイプ     | 説明                                          |
| ------- | ------------------------------------------- |
| プロミイベント | プロミスを組み合わせたイベント・エミッター。 取引レシートが利用可能になれば解決する。 |

PromiEventでは、以下のイベントが利用可能です：

- `transactionHash` は `string` を返す：トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生する。
- `receipt`は `object` を返す：トランザクションのレシートが利用可能になったときに発生する。 詳細は[caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)を参照。
- `error` は `Error` を返す：送信中にエラーが発生した場合に発生する。 ガス欠エラーの場合、2番目のパラメータはレシートとなる。

**例**

```javascript
// Using promise
> caver.rpc.klay.sendRawTransaction('0x08f88...').then(console.log)
{
    blockHash: '0x8bff3eb5444711f53707c1c006dac54164af6f873c0f012aff98479155de3c46',
    blockNumber: '0x18a6',
    contractAddress: null,
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0xc',
    senderTxHash: '0x72ea9179350cf2943e966eaf1e1e651d4e1b50ead4b6e6a574a4297c9f0f7017',
    signatures: [ { V: '0x4e43', R: '0x3bee4...', S: '0x101a1...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x72ea9179350cf2943e966eaf1e1e651d4e1b50ead4b6e6a574a4297c9f0f7017',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// Using event emitter
> caver.rpc.klay.sendRawTransaction('0x08f88...').on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.sendTransaction <a href="#caver-rpc-klay-sendtransaction" id="caver-rpc-klay-sendtransaction"></a>

```javascript
caver.rpc.klay.sendTransaction(transaction [, callback])
```

インポートされたアカウントの秘密鍵」を使って、kaia Nodeのトランザクション`送信者`としてトランザクションに署名し、kaiaにトランザクションを伝播する。

各トランザクション・タイプの詳細については、[トランザクション](../caver-transaction/caver-transaction.md#class)を参照してください。

**NOTE**: This API provides the function to sign a transaction using an [imported account](https://docs.kaia.io/references/json-rpc/personal/import-raw-key/) in your kaia node. The imported account in your node must be [unlocked](https://docs.kaia.io/references/json-rpc/personal/unlock-account/) to sign a transaction.

**パラメーター**

| 名称       | タイプ    | 説明                                                                                  |
| -------- | ------ | ----------------------------------------------------------------------------------- |
| トランザクション | オブジェクト | kaiaに送信されるトランザクションのインスタンス。                                                          |
| コールバック   | 機能     | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

| タイプ     | 説明                                          |
| ------- | ------------------------------------------- |
| プロミイベント | プロミスを組み合わせたイベント・エミッター。 取引レシートが利用可能になれば解決する。 |

PromiEventでは、以下のイベントが利用可能です：

- `transactionHash` は `string` を返す：トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生する。
- `receipt`は `object` を返す：トランザクションのレシートが利用可能になったときに発生する。 詳細は[caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)を参照。
- `error` は `Error` を返す：送信中にエラーが発生した場合に発生する。 ガス欠エラーの場合、2番目のパラメータはレシートとなる。

**例**

```javascript
> const tx = caver.transaction.valueTransfer.create({
    from: '0x{address in hex}', // The address of imported account in kaia Node
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.convertToPeb(10, 'KLAY'),
    gas: 25000
})
// Using promise
> caver.rpc.klay.sendTransaction(tx).then(console.log)
{
    blockHash: '0xbfce3abcad0204e363ee9e3b94d15a20c1a4b86ac6cf51dd74db2226ab5b9e99',
    blockNumber: '0x1d18',
    contractAddress: null,
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x13',
    senderTxHash: '0x2c001a776290ac55ac53a82a70a0b71e07c985fe57fd9d8e422b919d4317002e',
    signatures: [ { V: '0x4e43', R: '0xeac91...', S: '0xa0aa4...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x2c001a776290ac55ac53a82a70a0b71e07c985fe57fd9d8e422b919d4317002e',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// Using event emitter
> caver.rpc.klay.sendTransaction(tx).on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.sendTransactionAsFeePayer <a href="#caver-rpc-klay-sendtransactionasfeepayer" id="caver-rpc-klay-sendtransactionasfeepayer"></a>

```javascript
caver.rpc.klay.sendTransactionAsFeePayer(transaction [, callback])
```

自分のkaia Nodeにある`インポートされたアカウントの秘密鍵`を使って、トランザクション`fee payer`として手数料委任トランザクションに署名し、そのトランザクションをkaiaに伝播する。

`sendTransaction`を手数料の支払者として使用する前に、トランザクションの送信者は有効な署名をし、 `nonce`が定義されていなければならない。

各トランザクション・タイプの詳細については、[トランザクション](../caver-transaction/caver-transaction.md#class)を参照してください。

**NOTE**: This API provides the function to sign a transaction using an [imported account](https://docs.kaia.io/references/json-rpc/personal/import-raw-key/) in your kaia node. The imported account in your node must be [unlocked](https://docs.kaia.io/references/json-rpc/personal/unlock-account/) to sign a transaction.

**パラメーター**

| 名称       | タイプ    | 説明                                                                                  |
| -------- | ------ | ----------------------------------------------------------------------------------- |
| トランザクション | オブジェクト | kaiaに送信する手数料委任トランザクションのインスタンス。                                                      |
| コールバック   | 機能     | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

| タイプ     | 説明                                          |
| ------- | ------------------------------------------- |
| プロミイベント | プロミスを組み合わせたイベント・エミッター。 取引レシートが利用可能になれば解決する。 |

PromiEventでは、以下のイベントが利用可能です：

- `transactionHash` は `string` を返す：トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生する。
- `receipt`は `object` を返す：トランザクションのレシートが利用可能になったときに発生する。 詳細は[caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)を参照。
- `error` は `Error` を返す：送信中にエラーが発生した場合に発生する。 ガス欠エラーの場合、2番目のパラメータはレシートとなる。

**例**

```javascript
> const tx = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    nonce: 1,
    signatures: [
        [
            '0x4e43',
            '0x873e9db6d055596a8f79a6a2761bfb464cbc1b352ac1ce53770fc23bb16d929c',
            '0x15d206781cc8ac9ffb02c08545cb832e1f1700b46b886d72bb0cfeb4a230871e',
        ],
    ],
    feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in kaia Node
})
// Using promise
> caver.rpc.klay.signTransaction(tx).then(console.log)
{
    blockHash: '0x3be2f5b17eb35d0cf83b493ddfaa96d44cba40d1839778b4a8267f4c0aa61449',
    blockNumber: '0x23ef',
    contractAddress: null,
    feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    feePayerSignatures: [ { V: '0x4e43', R: '0x7a9ec...', S: '0x22be3...' } ],
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    gas: '0xc350',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x7918',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x1',
    senderTxHash: '0x71ca2e169a9c6c7b5bfdfa68e584314978f2abef955f8a2666325b860e2c9df5',
    signatures: [ { V: '0x4e43', R: '0x873e9...', S: '0x15d20...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x04fa82ce10168e05db04a235f025e5b8bc004ab36710798a512fab75a95bfc52',
    transactionIndex: '0x0',
    type: 'TxTypeFeeDelegatedValueTransfer',
    typeInt: 9,
    value: '0xde0b6b3a7640000',
}

// Using event emitter
> caver.rpc.klay.sendTransactionAsFeePayer(tx).on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.signTransaction <a href="#caver-rpc-klay-signtransaction" id="caver-rpc-klay-signtransaction"></a>

```javascript
caver.rpc.klay.signTransaction(transaction [, callback])
```

インポートされたアカウントの秘密鍵」を使って、kaia Nodeのトランザクション送信者としてトランザクションに署名する。

各トランザクション・タイプの詳細については、[トランザクション](../caver-transaction/caver-transaction.md#class)を参照してください。

**NOTE**: This API provides the function to sign a transaction using an [imported account](https://docs.kaia.io/references/json-rpc/personal/import-raw-key/) in your kaia node. The imported account in your node must be [unlocked](https://docs.kaia.io/references/json-rpc/personal/unlock-account/) to sign a transaction.

**パラメーター**

| 名称       | タイプ    | 説明                                                                                  |
| -------- | ------ | ----------------------------------------------------------------------------------- |
| トランザクション | オブジェクト | 署名するトランザクションのインスタンス。                                                                |
| コールバック   | 機能     | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise`は `object` を返す - オブジェクトは署名されたトランザクションを含む：

| 名称 | タイプ    | 説明                       |
| -- | ------ | ------------------------ |
| 生  | ストリング  | RLPエンコードされた署名付きトランザクション。 |
| TX | オブジェクト | 送信者の署名を含むトランザクションオブジェクト。 |

**例**

```javascript
> const tx = caver.transaction.valueTransfer.create({
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in kaia Node
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(10, 'KLAY'),
    gas: 25000
})

> caver.rpc.klay.signTransaction(tx).then(console.log)
{
    raw: '0x08f88...',
    tx: {
        typeInt: 8,
        type: 'TxTypeValueTransfer',
        nonce: '0x16',
        gasPrice: '0x5d21dba00',
        gas: '0x61a8',
        to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        value: '0x8ac7230489e80000',
        from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
        signatures: [ { V: '0x4e43', R: '0x52d64...', S: '0x1371e...' } ],
        hash: '0xe816952761caccf86ab281a00e10a36da6579c425041906a235f10959b2960b1'
    }
}
```

## caver.rpc.klay.signTransactionAsFeePayer <a href="#caver-rpc-klay-signtransactionasfeepayer" id="caver-rpc-klay-signtransactionasfeepayer"></a>

```javascript
caver.rpc.klay.signTransactionAsFeePayer(transaction [, callback])
```

kaiaノードにある「インポートされたアカウントの秘密鍵」を使って、取引手数料の支払者として取引に署名する。

各トランザクション・タイプの詳細については、[トランザクション](../caver-transaction/caver-transaction.md#class)を参照してください。

**NOTE**: This API provides the function to sign a transaction using an [imported account](https://docs.kaia.io/references/json-rpc/personal/import-raw-key/) in your kaia node. The imported account in your node must be [unlocked](https://docs.kaia.io/references/json-rpc/personal/unlock-account/) to sign a transaction.

**パラメーター**

| 名称       | タイプ    | 説明                                                                                  |
| -------- | ------ | ----------------------------------------------------------------------------------- |
| トランザクション | オブジェクト | 署名するトランザクションのインスタンス。                                                                |
| コールバック   | 機能     | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise`は `object` を返す - オブジェクトは署名されたトランザクションを含む：

| 名称 | タイプ    | 説明                           |
| -- | ------ | ---------------------------- |
| 生  | ストリング  | RLPエンコードされた署名付きトランザクション。     |
| TX | オブジェクト | 料金支払い者として署名するトランザクションオブジェクト。 |

**例**

```javascript
> const tx = caver.transaction.feeDelegatedValueTransfer.craete({
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    nonce: 0,
    signatures: [
        [
            '0x4e43',
            '0xe87291c7311534c3e451c6f6b8cafdf7454970f98504e9af6cfdeb29757ba458',
            '0x26dcf6f3702110230b806628165e28771e1152ea864ee4c69557faccd4d3dae8',
        ],
    ],
    feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122', // The address of imported account in kaia Node
})

> caver.rpc.klay.signTransactionAsFeePayer(tx).then(console.log)
{
    raw: '0x09f8e...',
    tx: {
        typeInt: 9,
        type: 'TxTypeFeeDelegatedValueTransfer',
        nonce: '0x0',
        gasPrice: '0x5d21dba00',
        gas: '0xc350',
        to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        value: '0xde0b6b3a7640000',
        from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        signatures: [ { V: '0x4e43', R: '0xe8729...', S: '0x26dcf...' } ],
        feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122',
        feePayerSignatures: [ { V: '0x4e43', R: '0x5cce8...', S: '0x32907...' } ],
        hash: '0xdb89281f3a44a2370d73b389bbcfb9a597f558219145cf269a0b1480f8e778cc',
    },
}
```

## caver.rpc.klay.getDecodedAnchoringTransactionByHash <a href="#caver-rpc-klay-getdecodedanchoringtransactionbyhash" id="caver-rpc-klay-getdecodedanchoringtransactionbyhash"></a>

```javascript
caver.rpc.klay.getDecodedAnchoringTransactionByHash(transactionHash [, callback])
```

与えられたトランザクションハッシュのトランザクション中のアンカーデータをデコードして返す。

**パラメーター**

| 名称           | タイプ   | 説明                                                                                  |
| ------------ | ----- | ----------------------------------------------------------------------------------- |
| トランザクションハッシュ | ストリング | トランザクションハッシュ。                                                                       |
| コールバック       | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `object` を返す - オブジェクトはデコードされたアンカーデータを含む：

| 名称          | タイプ   | 説明                                                                                                               |
| ----------- | ----- | ---------------------------------------------------------------------------------------------------------------- |
| ブロックハッシュ    | ストリング | このアンカリング取引が行われた子チェーンブロックのハッシュ。                                                                                   |
| ブロック番号      | 番号    | このアンカリング・トランザクションが実行された子チェーンのブロック番号。                                                                             |
| ペアレントハッシュ   | ストリング | 親ブロックのハッシュ。                                                                                                      |
| TxHash      | ストリング | ブロックのトランザクショントライのルート。                                                                                            |
| ステートルートハッシュ | ストリング | ブロックの最終状態トライのルート。                                                                                                |
| レシートハッシュ    | ストリング | ブロックの受信トライのルート。                                                                                                  |
| ブロック数       | 番号    | このアンカー期間中に生成されたブロック数。 ほとんどの場合、この数値は子チェーンの `SC_TX_PERIOD` と等しい。ただし、このトランザクショ ンがアンカリングをオンにしてから最初のアンカリングTXである場合を除く。 |
| Txカウント      | 番号    | アンカリング期間中に子チェーンで発生したトランザクションの数。                                                                                  |

**例**

```javascript
> caver.rpc.klay.getDecodedAnchoringTransactionByHash('0x59831a092a9f0b48018848f5dd88a457efdbfabec13ea07cd769686741a1cd13').then(console.log)
{
    BlockCount：86400,
    BlockHash: '0x3c44b2ed491be7264b9f6819c67427642447716576b6702a72f6fdc40c41abde',
    BlockNumber：23414400,
    ParentHash: '0x735468bb091a296c45553c8f67a8d0d39ac428cbe692b1b6c494d336351477f3',
    ReceiptHash：'0x6a908d319b6f6ab4414da1afd6763d70ecc8037ec167aa8a942bc0c2af12b4ab',
    StateRootHash: '0x4a664227fb2508a2952a4695cabb88b433522af2a5dee50cc6dd4036d85bf1d3',
    TxCount：50895,
    TxHash: '0x753a85d2c53fc34cb9108301f1cf8ff8d78dde13d42d80958e47e388008319cd',
}.
```

## caver.rpc.klay.getChainId <a href="#caver-rpc-klay-getchainid" id="caver-rpc-klay-getchainid"></a>

```javascript
caver.rpc.klay.getChainId([コールバック])
```

チェーンのIDを返します。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明       |
| ----- | -------- |
| ストリング | チェーンのID。 |

**例**

```javascript
> caver.rpc.klay.getChainId().then(console.log)
0x2710
```

## caver.rpc.klay.getClientVersion <a href="#caver-rpc-klay-getclientversion" id="caver-rpc-klay-getclientversion"></a>

```javascript
caver.rpc.klay.getClientVersion([コールバック])
```

kaiaノードの現在のクライアントバージョンを返します。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                      |
| ----- | ----------------------- |
| ストリング | kaiaノードの現在のクライアントバージョン。 |

**例**

```javascript
> caver.rpc.klay.getClientVersion().then(console.log)
kaia/v1.3.0+144494d2aa/linux-amd64/go1.13.1
```

## caver.rpc.klay.getGasPrice <a href="#caver-rpc-klay-getgasprice" id="caver-rpc-klay-getgasprice"></a>

```javascript
caver.rpc.klay.getGasPrice([コールバック])
```

現在のガス料金を peb で返します。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明         |
| ----- | ---------- |
| ストリング | ペブの現在のガス料金 |

**例**

```javascript
> caver.rpc.klay.getGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getGasPriceAt <a href="#caver-rpc-klay-getgaspriceat" id="caver-rpc-klay-getgaspriceat"></a>

```javascript
caver.rpc.klay.getGasPriceAt([ブロック番号] [, コールバック])
```

指定したブロックの現在のガス単価を peb で返します。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| ブロック番号 | 番号  | (オプション）ブロック番号。 省略された場合は、最新の単価が返される。                              |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明         |
| ----- | ---------- |
| ストリング | ペブの現在のガス料金 |

**例**

```javascript
> caver.rpc.klay.getGasPriceAt().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getMaxPriorityFeePerGas <a href="#caver-rpc-klay-getmaxpriorityfeepergas" id="caver-rpc-klay-getmaxpriorityfeepergas"></a>

```javascript
caver.rpc.klay.getMaxPriorityFeePerGas([コールバック])
```

peb関数は、pebのダイナミックフィー取引で推奨されるガスチップの上限を返します。 kaiaは固定ガス価格を持っているので、これはkaiaが設定したガス価格を返します。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                 |
| ----- | ------------------ |
| ストリング | ペブのガス・チップ・キャップの提案。 |

**例**

```javascript
> caver.rpc.klay.getMaxPriorityFeePerGas().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getLowerBoundGasPrice <a href="#caver-rpc-klay-getlowerboundgasprice" id="caver-rpc-klay-getlowerboundgasprice"></a>

```javascript
caver.rpc.klay.getLowerBoundGasPrice([コールバック])
```

下限ガス価格を peb で返す。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明         |
| ----- | ---------- |
| ストリング | ペブの下限ガス価格。 |

**例**

```javascript
> caver.rpc.klay.getLowerBoundGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getUpperBoundGasPrice <a href="#caver-rpc-klay-getupperboundgasprice" id="caver-rpc-klay-getupperboundgasprice"></a>

```javascript
caver.rpc.klay.getUpperBoundGasPrice([コールバック])
```

上限ガス価格を peb で返す。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明          |
| ----- | ----------- |
| ストリング | ペブのガス料金の上限。 |

**例**

```javascript
> caver.rpc.klay.getUpperBoundGasPrice().then(console.log)
0xae9f7bcc00
```

## caver.rpc.klay.getFeeHistory <a href="#caver-rpc-klay-getfeehistory" id="caver-rpc-klay-getfeehistory"></a>

```javascript
caver.rpc.klay.getFeeHistory(blockCount, lastBlock, rewardPercentiles [, callback])
```

返されたブロック範囲の料金履歴を返します。 すべてのブロックが利用可能でない場合は、要求された範囲のサブセクションとすることができる。

**パラメーター**

| 名称        | タイプ           | 説明                                                                                                                                                                              |
| --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ブロック数     | BigNumber\\ | 要求された範囲のブロック数。 1回のクエリーでリクエストできるブロックは1～1024ブロック。 すべてのブロックが利用可能でない場合、要求より少ないブロックが返されることがある。                                                                                       |
| ラストブロック   | BigNumber\\ | 要求された範囲の最高番号ブロック（またはブロックタグ文字列）。                                                                                                                                                 |
| 報酬パーセンタイル | 配列            | 各ブロックのガスごとの有効優先料金から、使用ガスで重み付けされた昇順でサンプリングするパーセンタイル値の単調増加リスト。 (例: `['0', '25', '50', '75', '100']` または `['0', '0.5', '1', '1.5', '3', '80']`) |
| コールバック    | 機能            | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。                                                                                             |

**リターン・バリュー**

プロミス`は`オブジェクト\`を返す - オブジェクトには料金の履歴が含まれる：

| 名称      | タイプ   | 説明                                                                                                           |
| ------- | ----- | ------------------------------------------------------------------------------------------------------------ |
| 最古のブロック | ストリング | 返された範囲の最下位の番号ブロック。                                                                                           |
| 報酬      | 配列    | 指定されたブロック・パーセンタイルにおけるガスごとの有効優先料金を示す2次元配列。                                                                    |
| 基本ガス料金  | 配列    | ガスごとのブロック基本料金の配列。 これは、返された範囲の中で最も新しいブロックの次のブロックを含む。なぜなら、この値は最も新しいブロックから導き出せるからである。 EIP-1559以前のブロックではゼロが返される。 |
| ガス使用率   | 配列    | ブロック内の gasUsed/gasLimit の配列。                                                                                 |

**例**

```javascript
> caver.rpc.klay.getFeeHistory(3, 'latest', [0.1, 0.2, 0.3]).then(console.log)
{
  oldestBlock: '0xbb701',
  reward: [
    [ '0x0', '0x0', '0x0' ],
    [ '0x5d21dba00', '0x5d21dba00', '0x5d21dba00' ],
    [ '0x0', '0x0', '0x0' ]
  ],
  baseFeePerGas：[ '0x0', '0x0', '0x0', '0x0' ],
  gasUsedRatio: [ 0, 2.1000000000021e-8, 0 ]
}.
```

## caver.rpc.klay.createAccessList <a href="#caver-rpc-klay-createaccesslist" id="caver-rpc-klay-createaccesslist"></a>

```javascript
caver.rpc.klay.createAccessList(txCallObject [, callback])
```

このメソッドは、指定されたトランザクションに基づいてアクセスリストを作成します。 accessListは、送信者アカウントとプリコンパイルを除く、トランザクションが読み書き するすべてのストレージスロットとアドレスを含む。 このメソッドは `caver.rpc.klay.call` と同じトランザクションコールオブジェクトと blockNumberOrTag オブジェクトを使用する。 アクセスリストは、ガス代の高騰でアクセスできなくなった契約を解除するために使用できる。 トランザクションにアクセスリストを追加しても、アクセスリストなしのトランザクショ ンと比較して、ガス使用量が少なくなるとは限らない。

**パラメーター**

| 名称        | タイプ           | 説明                                                                                                                                                                         |
| --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| コールオブジェクト | オブジェクト        | トランザクションコールオブジェクト。 caver.rpc.klay.call](#caver-rpc-klay-call) パラメータを参照してください。 |
| ブロックパラメータ | BigNumber\\ | (オプション) ブロック番号、ブロックハッシュ、またはブロックタグ文字列 (`latest` または `earliest`)。 省略した場合は `latest` が使用される。                                             |
| コールバック    | 機能            | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。                                                                                        |

**リターン・バリュー**

`Promise`は `object` を返す - オブジェクトにはアクセスリストが含まれる：

| 名称      | タイプ   | 説明                                                                                                           |
| ------- | ----- | ------------------------------------------------------------------------------------------------------------ |
| 最古のブロック | ストリング | 返された範囲の最下位の番号ブロック。                                                                                           |
| 報酬      | 配列    | 指定されたブロック・パーセンタイルにおけるガスごとの有効優先料金を示す2次元配列。                                                                    |
| 基本ガス料金  | 配列    | ガスごとのブロック基本料金の配列。 これは、返された範囲の中で最も新しいブロックの次のブロックを含む。なぜなら、この値は最も新しいブロックから導き出せるからである。 EIP-1559以前のブロックではゼロが返される。 |
| ガス使用率   | 配列    | ブロック内の gasUsed/gasLimit の配列。                                                                                 |

**例**

```javascript
> caver.rpc.klay.createAccessList({
        from: '0x3bc5885c2941c5cda454bdb4a8c88aa7f248e312',
        data: '0x20965255',
        gasPrice: '0x3b9aca00',
        gas: '0x3d0900',
        to: '0x00f5f5f3a25f142fafd0af24a754fafa340f32c7'
    }, 'latest').then(console.log)
{ accessList: [], gasUsed: '0x0' }
```

## caver.rpc.klay.isParallelDBWrite <a href="#caver-rpc-klay-isparalleldbwrite" id="caver-rpc-klay-isparalleldbwrite"></a>

```javascript
caver.rpc.klay.isParallelDBWrite([コールバック])
```

ノードがブロックチェーンのデータを並列に書き込んでいる場合は `true` を返す。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `boolean` を返す。

| タイプ   | 説明                                                                              |
| ----- | ------------------------------------------------------------------------------- |
| ブーリアン | `true`はノードがブロックチェーンのデータを並列に書き込んでいることを意味する。 ノードがデータをシリアルに書き込んでいる場合は `false` となる。 |

**例**

```javascript
> caver.rpc.klay.isParallelDBWrite().then(console.log)
true
```

## caver.rpc.klay.isSenderTxHashIndexingEnabled <a href="#caver-rpc-klay-issendertxhashindexingenabled" id="caver-rpc-klay-issendertxhashindexingenabled"></a>

```javascript
caver.rpc.klay.isSenderTxHashIndexingEnabled([コールバック])
```

ノードが送信者トランザクションハッシュとトランザクションハッシュのマッピング情報のインデックスを作成している場合は `true` を返す。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `boolean` を返す。

| タイプ   | 説明                                                                      |
| ----- | ----------------------------------------------------------------------- |
| ブーリアン | `true`は、ノードが送信者トランザクションハッシュとトランザクションハッシュのマッピング情 報のインデックスを作成していることを意味する。 |

**例**

```javascript
> caver.rpc.klay.isSenderTxHashIndexingEnabled().then(console.log)
true
```

## caver.rpc.klay.getProtocolVersion <a href="#caver-rpc-klay-getprotocolversion" id="caver-rpc-klay-getprotocolversion"></a>

```javascript
caver.rpc.klay.getProtocolVersion([コールバック])
```

ノードのkaiaプロトコルのバージョンを返します。 Cypress/Baobabの現在のバージョン（v1.9.0時点）は`istanbul/65`である。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明                   |
| ----- | -------------------- |
| ストリング | ノードのkaiaプロトコルのバージョン。 |

**例**

```javascript
> caver.rpc.klay.getProtocolVersion().then(console.log)
0x40
```

## caver.rpc.klay.getRewardbase <a href="#caver-rpc-klay-getrewardbase" id="caver-rpc-klay-getrewardbase"></a>

```javascript
caver.rpc.klay.getRewardbase([コールバック])
```

現在のノードのリワードベースを返します。 Rewardbaseは、ブロック報酬が送られるアカウントのアドレスです。 CNにのみ必要である。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明            |
| ----- | ------------- |
| ストリング | リワードベースのアドレス。 |

**例**

```javascript
> caver.rpc.klay.getRewardbase().then(console.log)
0xa9b3a93b2a9fa3fdcc31addd240b04bf8db3414c
```

## caver.rpc.klay.getFilterChanges <a href="#caver-rpc-klay-getfilterchanges" id="caver-rpc-klay-getfilterchanges"></a>

```javascript
caver.rpc.klay.getFilterChanges(filterId [, callback])
```

フィルタのポーリングメソッドで、最後のポーリング以降のログの配列を返します。

**パラメーター**

| 名称      | タイプ   | 説明                                                                                  |
| ------- | ----- | ----------------------------------------------------------------------------------- |
| フィルターID | ストリング | フィルターID。                                                                            |
| コールバック  | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `Array` - ログオブジェクトの配列、または最後のポーリングから何も変更がない場合は空の配列を返す。

- caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter) で作成されたフィルタでは、ブロックハッシュが返されます。
- caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter) で作成されたフィルタの場合、返り値はトランザクションハッシュ、_例えば `["0x6345343454645..."]` です。
- caver.rpc.klay.newFilter](#caver-rpc-klay-newfilter) で作成されたフィルタの場合、ログは以下のパラメータを持つオブジェクトです：

| 名称             | タイプ   | 説明                                                                                                                                                                                                                                                   |
| -------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ログインデックス       | ストリング | ブロック内のログのインデックス位置。                                                                                                                                                                                                                                   |
| トランザクションインデックス | ストリング | このログが作成されたトランザクションのインデックス位置。                                                                                                                                                                                                                         |
| トランザクションハッシュ   | ストリング | このログが作成されたトランザクションのハッシュ。 保留中は `null` である。                                                                                                                                                                                                            |
| ブロックハッシュ       | ストリング | このログがあったブロックのハッシュ。 保留中は `null` である。                                                                                                                                                                                                                  |
| ブロック番号         | ストリング | このログがあったブロック番号。 保留中は `null` である。                                                                                                                                                                                                                     |
| 住所             | ストリング | このログの発信元アドレス。                                                                                                                                                                                                                                        |
| データ            | ストリング | ログの非インデックス引数を含む。                                                                                                                                                                                                                                     |
| トピックス          | 配列    | インデックス化されたログ引数の 0 から 4 の 32 バイト DATA の配列。 (Solidityでは(Solidityの場合: 最初のトピックはイベントのシグネチャのハッシュです (_例: `Deposit(address,bytes32,uint256)`)。 |

**例**

```javascript
> caver.rpc.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log)
[ 
    { 
        address：'0x71e503935b7816757AA0314d4E7354dab9D39162',
        topics：[ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data：'0x0000000000000000000000000001',
        blockNumber: '0xdc5',
        transactionHash: '0x1b28e2c723e45a0d8978890598903f36a74397c9cea8531dc9762c39483e417f',
        transactionIndex：'0x0',
        blockHash: '0xb7f0bdaba93d3baaa01a5c24517da443207f774e0202f02c298e8e997a540b3d',
        logIndex：'0x0'
    }. 
]
```

## caver.rpc.klay.getFilterLogs <a href="#caver-rpc-klay-getfilterlogs" id="caver-rpc-klay-getfilterlogs"></a>

```javascript
caver.rpc.klay.getFilterLogs(filterId [, callback])
```

指定した ID のフィルタにマッチするすべてのログの配列を返します。 フィルター・オブジェクトは、[newFilter](#caver-rpc-klay-newfilter) を使って取得する。

caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter)や[caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter)のような他のフィルタ作成関数が返すフィルタIDは、この関数では使用できないことに注意。

**パラメーター**

| 名称      | タイプ   | 説明                                                                                  |
| ------- | ----- | ----------------------------------------------------------------------------------- |
| フィルターID | ストリング | フィルターID。                                                                            |
| コールバック  | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) を参照。

**例**

```javascript
> caver.rpc.klay.getFilterLogs('0xcac08a7fc32fc625a519644187e9f690').then(console.log);
[
    {
        address：'0x55384B52a9E5091B60127197887dd3B5779Df3',
        topics：[ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data：'0x0000000000000000000000000001',
        blockNumber: '0x1c31',
        transactionHash: '0xa7436c54e47dafbce696de65f6e890c96ac22c236f50ca1be28b9b568034c3b3',
        transactionIndex：'0x0',
        blockHash: '0xe4f27c524dacfaaccb36735deccee69b3d6c315e969779784c36bb8e14b89e01',
        logIndex：'0x0'
    }.
]
```

## caver.rpc.klay.getLogs <a href="#caver-rpc-klay-getlogs" id="caver-rpc-klay-getlogs"></a>

```javascript
caver.rpc.klay.getLogs(options [, callback])
```

指定したフィルタオブジェクトにマッチするすべてのログの配列を返します。

**パラメーター**

| 名称     | タイプ    | 説明                                                                                  |
| ------ | ------ | ----------------------------------------------------------------------------------- |
| オプション  | オブジェクト | フィルターのオプション。 以下の表を参照してください。                                                         |
| コールバック | 機能     | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

オプション・オブジェクトには、以下のものを含めることができる：

| 名称      | タイプ         | 説明                                                                                                                                                                                                                                                                                  |
| ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| フロムブロック | number \\ | (オプション) ログを取得する最も古いブロックのブロック番号。 (`"latest"`は最新のブロックを意味する)。 デフォルト値は`"latest"`である。                                                                                                                                                              |
| ブロックする  | number \\ | (オプション) ログを取得する最後のブロックのブロック番号。 (`"latest"`は最新のブロックを意味する)。 デフォルト値は`"latest"`である。                                                                                                                                                               |
| 住所      | string \\ | (オプション) 住所または住所のリスト。 特定のアカウントに関連するログのみが返されます。                                                                                                                                                                                                                    |
| トピックス   | 配列          | (オプション) ログエントリーに表示されなければならない値の配列。 順番は重要だ。 トピックを除外したい場合は、`null` を使用します。_e._., `[null, '0x12...']`. また、トピックごとにそのトピックのオプションを配列で渡すこともできます_例えば `[null, ['option1', 'option2']]`. |

**リターン・バリュー**

caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) を参照。

**例**

```javascript
> caver.rpc.klay.getLogs({
        fromBlock: '0x1',
        toBlock: 'latest',
        address:'0x87ac99835e67168d4f9a40580f8f5c33550ba88b'
    }).then(console.log)
[
    {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: [
            '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385
        ]
        logIndex: '0x0',
        transactionIndex: '0x0',
        transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        blockNumber: '0x4d2',
        address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    {...}
]
```

## caver.rpc.klay.newBlockFilter <a href="#caver-rpc-klay-newblockfilter" id="caver-rpc-klay-newblockfilter"></a>

```javascript
caver.rpc.klay.newBlockFilter([コールバック])
```

新しいブロックが到着したときに通知するためのフィルタをノードに作成します。 状態が変更されたかどうかを確認するには、[caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) を呼び出す。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明       |
| ----- | -------- |
| ストリング | フィルターID。 |

**例**

```javascript
> caver.rpc.klay.newBlockFilter().then(console.log)
0xf90906914486a9c22d620e50022b38d5
```

## caver.rpc.klay.newFilter <a href="#caver-rpc-klay-newfilter" id="caver-rpc-klay-newfilter"></a>

```javascript
caver.rpc.klay.newFilter(options [, callback])
```

与えられたフィルターオプションを使用して、特定の状態変化 (ログ) を受け取るフィルターオブジェクトを作成します。

- 状態が変更されたかどうかを確認するには、[caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) を呼び出す。
- `newFilter` によって作成されたフィルタにマッチするすべてのログを取得するには、[caver.rpc.klay.getFilterLogs](#caver-rpc-klay-getfilterlogs) を呼び出します。

For detailed information about the topics in the filter object, please see [Kaia Platform API - klay_newFilter](https://docs.kaia.io/references/json-rpc/klay/new-filter/).

**パラメーター**

| 名称     | タイプ    | 説明                                                                                  |
| ------ | ------ | ----------------------------------------------------------------------------------- |
| オプション  | オブジェクト | フィルターのオプション。 以下の表を参照してください。                                                         |
| コールバック | 機能     | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

オプション・オブジェクトには、以下のものを含めることができる：

| 名称      | タイプ         | 説明                                                                                                                                                                                                                                                                                  |
| ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| フロムブロック | number \\ | (オプション) ログを取得する最も古いブロックのブロック番号。 (`"latest"`は最新のブロックを意味する)。 デフォルト値は`"latest"`である。                                                                                                                                                              |
| ブロックする  | number \\ | (オプション) ログを取得する最後のブロックのブロック番号。 (`"latest"`は最新のブロックを意味する)。 デフォルト値は`"latest"`である。                                                                                                                                                               |
| 住所      | string \\ | (オプション) 住所または住所のリスト。 特定のアカウントに関連するログのみが返されます。                                                                                                                                                                                                                    |
| トピックス   | 配列          | (オプション) ログエントリーに表示されなければならない値の配列。 順番は重要だ。 トピックを除外したい場合は、`null` を使用します。_e._., `[null, '0x12...']`. また、トピックごとにそのトピックのオプションを配列で渡すこともできます_例えば `[null, ['option1', 'option2']]`. |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明       |
| ----- | -------- |
| ストリング | フィルターID。 |

**例**

```javascript
> caver.rpc.klay.newFilter({}).then(console.log)
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.rpc.klay.newFilter({ address: '0x55384B52a9E5091B6012717197887dd3B5779Df3' }).then(console.log)
0xd165cbf31b9d60346aada33dbefe01b
```

## caver.rpc.klay.newPendingTransactionFilter <a href="#caver-rpc-klay-newpendingtransactionfilter" id="caver-rpc-klay-newpendingtransactionfilter"></a>

```javascript
caver.rpc.klay.newPendingTransactionFilter([コールバック])
```

新しい保留中のトランザクションの到着に関する情報を受け取るために、ノード内にフィルタを作成します。 状態が変更されたかどうかを確認するには、[caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) を呼び出す。

**パラメーター**

| 名称     | タイプ | 説明                                                                                  |
| ------ | --- | ----------------------------------------------------------------------------------- |
| コールバック | 機能  | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明       |
| ----- | -------- |
| ストリング | フィルターID。 |

**例**

```javascript
> caver.rpc.klay.newPendingTransactionFilter().then(console.log)
0xe62da1b2a09efcd4168398bdbf586db0
```

## caver.rpc.klay.uninstallFilter <a href="#caver-rpc-klay-uninstallfilter" id="caver-rpc-klay-uninstallfilter"></a>

```javascript
caver.rpc.klay.uninstallFilter(filterId [, callback])
```

指定された ID を持つフィルタをアンインストールする。 時計が不要になったら、常に呼び出されるべきである。 さらに、[caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) で一定時間呼び出されない場合、フィルタはタイムアウトする。

**パラメーター**

| 名称      | タイプ   | 説明                                                                                  |
| ------- | ----- | ----------------------------------------------------------------------------------- |
| フィルターID | ストリング | フィルターID。                                                                            |
| コールバック  | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `boolean` を返す。

| タイプ   | 説明                                                  |
| ----- | --------------------------------------------------- |
| ブーリアン | フィルタのアンインストールに成功した場合は `true` を、失敗した場合は `false` を返す。 |

**例**

```javascript
> caver.rpc.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log)
true
```

## caver.rpc.klay.sha3 <a href="#caver-rpc-klay-sha3" id="caver-rpc-klay-sha3"></a>

```javascript
caver.rpc.klay.sha3(data[, callback])
```

Keccak-256（標準のSHA3-256ではない）を返します。 この代わりに、[caver.utils.sha3](../caver.utils.md#sha3)を使うことができる。

**パラメーター**

| 名称     | タイプ   | 説明                                                                                  |
| ------ | ----- | ----------------------------------------------------------------------------------- |
| データ    | ストリング | SHA3ハッシュに変換するデータ。                                                                   |
| コールバック | 機能    | (オプション) オプションのコールバックで、最初のパラメータとしてエラーオブジェクトを、2番目のパラメータとして結果を返します。 |

**リターン・バリュー**

`Promise` は `string` を返す。

| タイプ   | 説明               |
| ----- | ---------------- |
| ストリング | 与えられたデータのSHA3結果。 |

**例**

```javascript
> caver.rpc.klay.sha3('0x11223344').then(console.log)
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
