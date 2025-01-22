# caver.rpc.klay

caver.rpc.klay "使用 "governance "名稱空間提供 JSON-RPC 調用。

## caver.rpc.klay.accountCreated <a href="#caver-rpc-klay-accountcreated" id="caver-rpc-klay-accountcreated"></a>

```javascript
caver.rpc.klay.accountCreated(address [, blockNumber] [, callback])
```

如果與地址相關的賬戶是在 kaia 區塊鏈平臺上創建的，則返回 `true`。 否則返回 `false`。

**參數**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 您要查詢的賬戶地址，以查看該賬戶是否已在網絡上創建。                                                        |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `number`

| 類型      | 描述            |
| ------- | ------------- |
| boolean | kaia 中輸入地址的存在 |

**示例**

```javascript
> caver.rpc.klay.accountCreated('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.getAccount <a href="#caver-rpc-klay-getaccount" id="caver-rpc-klay-getaccount"></a>

```javascript
caver.rpc.klay.getAccount(address [, blockNumber] [, callback])
```

返回 kaia 中給定地址的賬戶信息。 有關 kaia 帳戶類型的更多詳情，請參閱 [Kaia 帳戶類型]（.../.../.../.../.../.../learn/accounts.md#klaytn-account-types）。

**NOTE** `caver.rpc.klay.getAccount`返回網絡上存在的賬戶，因此如果實際區塊鏈網絡上不存在與地址匹配的賬戶，則返回`null`。

**參數**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 您要查看賬戶信息的賬戶地址。                                                                    |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                        |
| -- | ------------------------- |
| 對象 | 包含賬戶信息的對象。 每種賬戶類型都有不同的屬性。 |

**示例**

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

返回給定地址的 AccountKey。 如果賬戶具有 [AccountKeyLegacy](../../../../../../learn/accounts.md#accountkeylegacy) 或給定地址的賬戶是 [Smart Contract Account](../../../../../../learn/accounts.md#smart-contract-accounts-scas) ，則將返回空鍵值。 詳情請參閱 [Account Key]（.../.../.../.../.../learn/accounts.md#account-key）。

**注意** `caver.rpc.klay.getAccountKey` 返回的對象因 AccountKey 類型而異。 如果網絡中不存在與給定地址匹配的 kaia 帳戶，則返回`null`。

**參數**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 您要從中獲取 AccountKey 信息對象的 kaia 賬戶地址。                                                |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                                            |
| -- | --------------------------------------------- |
| 對象 | 包含 AccountKey 信息的對象。 每種 AccountKey 類型都有不同的屬性。 |

**示例**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 2,
    key: { x:'0xb9a4b...', y:'0x7a285...' }
}

// AccountKey type: AccountKeyFail
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType: 3, key:{} }

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 4,
    key: {
        threshold: 2,
        keys: [
            {
                weight: 1,
                key: { x: '0xae6b7...', y: '0x79ddf...' }
            },
            {
                weight: 1,
                key: { x: '0xd4256...', y: '0xfc5e7...' }
            },
            {
                weight: 1,
                key: { x: '0xd653e...', y: '0xe974e...' }
            }
        ]
    }
}

// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 5,
    key: [
            {
                key: { x: '0x81965...', y: '0x18242...' },
                keyType: 2
            },
            {
                key: { x: '0x73363...', y: '0xfc3e3...' },
                keyType: 2
            },
            {
                key: { x: '0x95c92...', y: '0xef783...' },
                keyType: 2
            }
    ]
}
```

## caver.rpc.klay.encodeAccountKey <a href="#caver-rpc-klay-encodeaccountkey" id="caver-rpc-klay-encodeaccountkey"></a>

```javascript
caver.rpc.klay.encodeAccountKey(accountKey] [, callback])
```

使用遞歸長度前綴（RLP）編碼方案對包含 AccountKey 信息的對象進行編碼。 您還可以使用 [account.getRLPEncodingAccountKey](../caver.account.md#account-getrlpencodingaccountkey) 獲取 RLP 編碼的 AccountKey。

**參數：**

| 名稱         | 類型       | 描述                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountKey | 對象       | An object defines `keyType` and `key` inside or an instance of `AccountKey` ([AccountKeyLegacy](../caver.account.md#accountkeylegacy), [AccountKeyPublic](../caver.account.md#accountkeypublic), [AccountKeyFail](../caver.account.md#accountkeyfail)、[AccountKeyWeightedMultiSig](./caver.account.md#accountkeyweightedmultisig)或[AccountKeyRoleBased](./caver.account.md#accountkeyrolebased))。 |
| callback   | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                                                                                                                                                                                                                                                                                                                                                   |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述                  |
| --- | ------------------- |
| 字符串 | RLP 編碼的 AccountKey。 |

**示例**

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
caver.rpc.klay.decodeAccountKey(encodedKey] [, callback])
```

解碼 RLP 編碼的 AccountKey。 您也可以使用 [caver.account.accountKey.decode](../caver.account.md#caver-account-accountkey-decode) 來解碼 RLP 編碼的 AccountKey。

**參數：**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 加密密碼     | 字符串      | RLP 編碼的 AccountKey。                                |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                         |
| -- | -------------------------- |
| 對象 | 對象內部定義了 `keyType` 和 `key`。 |

**示例**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.decodeAccountKey('0x01c0').then(console.log)
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.decodeAccountKey('0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8').then(console.log)
{
    keyType: 2,
    key: {
        x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
        y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
    },
}

// AccountKey type: AccountKeyFail
> caver.rpc.klay.decodeAccountKey('0x03c0').then(console.log)
{ keyType: 3, key: {} }

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.decodeAccountKey('0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb').then(console.log)
{
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
}


// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.decodeAccountKey('0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160').then(console.log)
{
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
}
```

## caver.rpc.klay.getBalance <a href="#caver-rpc-klay-getbalance" id="caver-rpc-klay-getbalance"></a>

```javascript
caver.rpc.klay.getBalance(address [, blockNumber] [, callback])
```

以 kaia 為單位返回給定地址的賬戶餘額。

**參數**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 您要查看餘額的賬戶地址。                                                                      |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述                    |
| --- | --------------------- |
| 字符串 | 給定地址的當前餘額（以 peb 為單位）。 |

**示例**

```javascript
> caver.rpc.klay.getBalance('0x{address in hex}').then(console.log)
0xde0b6b3a7640000
```

## caver.rpc.klay.getCode <a href="#caver-rpc-klay-getcode" id="caver-rpc-klay-getcode"></a>

```javascript
caver.rpc.klay.getCode(address [, blockNumber] [, callback])
```

返回給定地址的代碼。

**參數：**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 獲取代碼的地址。                                                                          |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述       |
| --- | -------- |
| 字符串 | 給定地址的代碼。 |

**示例**

```javascript
> caver.rpc.klay.getCode('0x{address in hex}').then(console.log)
0x60806...
```

## caver.rpc.klay.getTransactionCount <a href="#caver-rpc-klay-gettransactioncount" id="caver-rpc-klay-gettransactioncount"></a>

```javascript
caver.rpc.klay.getTransactionCount(address [, blockNumber] [, callback])
```

返回從某個地址發送的交易總數。

**參數：**

| 名稱       | 類型                 | 描述                                                                                                                                                                                                      |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 地址       | 字符串                | 用於獲取交易次數的地址。                                                                                                                                                                                            |
| 區塊編號     | number \\| string | (可選）一個區塊編號、表示待處理的 nonce 的字符串 `pending` 或字符串 `earliest` 或 `latest`，如 [default block parameter](../../../../json-rpc/klay/block.md#the-default-block-parameter) 所示。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                                                                                                                                      |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述                  |
| --- | ------------------- |
| 字符串 | 從給定地址發送的交易次數（十六進制）。 |

**示例**

```javascript
> caver.rpc.klay.getTransactionCount('0x{address in hex}').then(console.log)
0x5f
```

## caver.rpc.klay.isContractAccount <a href="#caver-rpc-klay-iscontractaccount" id="caver-rpc-klay-iscontractaccount"></a>

```javascript
caver.rpc.klay.isContractAccount(address [, blockNumber] [, callback])
```

如果輸入賬戶在特定區塊編號時的 codeHash 不為空，則返回 `true`。 如果賬戶是 EOA 或沒有 codeHash 的智能合約賬戶，則返回 "false"。 詳情請參閱 [智能合約賬戶]（.../.../.../.../.../learn/accounts.md#smart-contract-accounts-scas）。

**參數：**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 您要檢查的地址是 "ContractAccount"。                                                       |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `number`

| 類型      | 描述                     |
| ------- | ---------------------- |
| boolean | true 表示輸入參數是現有的智能合約地址。 |

**示例**

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

生成 kaia 專用的簽名數據。 請參閱[Kaia Platform API - klay_sign](.../.../.../.../json-rpc/klay/account.md#klay_sign)，瞭解簽名是如何生成的。

**注意**：此 API 提供了使用 kaia 節點中的 [導入賬戶](../../../.../jsson-rpc/personal.md#personal_importrawkey) 簽署消息的功能。 您節點中的導入賬戶必須已[解鎖]（.../.../.../.../jsson-rpc/personal.md#personal_unlockaccount），才能簽署信息。 使用 [caver.rpc.klay.signTransaction](#caver-rpc-klay-signtransaction) 簽署 kaia 節點中導入賬戶的交易。

**參數**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 地址       | 字符串                | 用於簽署信息的導入賬戶地址。                                                                    |
| 信息       | 字符串                | 待簽名消息                                                                             |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述       |
| --- | -------- |
| 字符串 | 導入賬戶的簽名。 |

**示例**

```javascript
> caver.rpc.klay.sign('0x{address in hex}', '0xdeadbeaf').then(console.log)
0x1066e052c4be821daa4d0a0cd1e9e75ccb200bb4001c2e38853ba41b712a5a226da2acd67c86a13b266e0d75d0a6e7d1551c8924af413267615a5948617c746c1c
```

## caver.rpc.klay.getAccounts <a href="#caver-rpc-klay-getaccounts" id="caver-rpc-klay-getaccounts"></a>

```javascript
caver.rpc.klay.getAccounts([callback])
```

返回 kaia 節點擁有的地址列表。

**參數：**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型 | 描述              |
| -- | --------------- |
| 數組 | kaia 節點擁有的地址數組。 |

**示例**

```javascript
> caver.rpc.klay.getAccounts().then(console.log)
[
    '0xe1531e916857d1b3a7db92f9187b96a7b43813bf',
    '0x75331c25535052157ff5110ba7d0cf940d3a9ca6'
]。
```

## caver.rpc.klay.getBlockNumber <a href="#caver-rpc-klay-getblocknumber" id="caver-rpc-klay-getblocknumber"></a>

```javascript
caver.rpc.klay.getBlockNumber([callback])
```

返回最近區塊的數量。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述             |
| --- | -------------- |
| 字符串 | 最近區塊的編號（十六進制）。 |

**示例**

```javascript
> caver.rpc.klay.getBlockNumber().then(console.log)
0x5d39
```

## caver.rpc.klay.getHeader <a href="#caver-rpc-klay-getheader" id="caver-rpc-klay-getheader"></a>

```javascript
caver.rpc.klay.getHeader(blockNumberOrHash] [, callback])
```

按塊哈希值或區塊編號返回塊頭。 如果用戶把區塊哈希值作為參數傳遞，[caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash)就會被調用；如果把區塊編號作為參數調用，[caver.rpc.klay.getHeaderByNumber](#caver-rpc-klay-getheaderbynumber)就會被調用。

**參數：**

| 名稱       | 類型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 區塊編號或哈希值 | number \\| string | 區塊哈希值、編號或區塊標籤字符串。                                  |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                                                                                                                                        |
| -- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 對象 | 區塊頭對象。 有關返回值的詳細說明，請參閱 [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash) 。 |

**示例**

```javascript
> caver.rpc.klay.getHeader(1).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed：'0x0',
  governanceData: '0x',
  hash：'0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...'，
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward：'0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp：'0x62201975'，
  timestampFoS：'0x0'，
  transactionsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getHeaderByNumber <a href="#caver-rpc-klay-getheaderbynumber" id="caver-rpc-klay-getheaderbynumber"></a>

```javascript
caver.rpc.klay.getHeaderByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

按區塊編號返回區塊頭。

**參數：**

| 名稱       | 類型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 區塊編號     | number \\| string | 區塊編號或區塊標記字符串。                                      |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                                                                                                                                        |
| -- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 對象 | 區塊頭對象。 有關返回值的詳細說明，請參閱 [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash) 。 |

**示例**

```javascript
> caver.rpc.klay.getHeaderByNumber(765139).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed：'0x0',
  governanceData: '0x',
  hash：'0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...'，
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward：'0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp：'0x62201975'，
  timestampFoS：'0x0'，
  transactionsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getHeaderByHash <a href="#caver-rpc-klay-getheaderbyhash" id="caver-rpc-klay-getheaderbyhash"></a>

```javascript
caver.rpc.klay.getHeaderByHash(blockHash [, returnTransactionObjects] [, callback])
```

使用 `blockHash` 返回最近區塊的區塊編號。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 區塊哈希     | 字符串      | 區塊哈希值。                                             |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` 返回 `object` - 對象包括塊標頭：

| 名稱            | 類型  | 描述                                                                                   |
| ------------- | --- | ------------------------------------------------------------------------------------ |
| baseFeePerGas | 字符串 | The base fee per gas. 只有當該塊編號的 EthTxTypeCompatibleBlock 被激活時，才會返回該值。 |
| blockScore    | 字符串 | 區塊鏈網絡中的挖礦難度。 區塊分數 "的使用與網絡共識不同。 在 BFT 共識引擎中始終為 1。                                     |
| 額外數據          | 字符串 | 該數據塊的 "額外數據 "字段。                                                                     |
| gasUsed       | 字符串 | 該區塊所有交易使用的gas總量。                                                                     |
| 治理數據          | 字符串 | RLP 編碼的治理配置                                                                          |
| 哈希            | 字符串 | 區塊的哈希值。 如果是待處理區塊，則為 "null"。                                                          |
| logsBloom     | 字符串 | 區塊日誌的 Bloom 過濾器。 如果是待處理區塊，則為 "null"。                                                 |
| 數量            | 字符串 | 區塊編號。 如果是待處理區塊，則為 "null"。                                                            |
| 父哈希值          | 字符串 | 父塊的哈希值。                                                                              |
| receiptsRoot  | 字符串 | 區塊收據三元組的根。                                                                           |
| 獎勵            | 字符串 | 整筆獎勵的受益人地址。                                                                          |
| stateRoot     | 字符串 | 區塊最終狀態三元組的根。                                                                         |
| 時間戳           | 字符串 | 區塊整理時的 unix 時間戳。                                                                     |
| 時間戳FoS        | 字符串 | 區塊整理時間戳的秒分數。                                                                         |
| 交易根           | 字符串 | 區塊的交易三角根。                                                                            |

**示例**

```javascript
> caver.rpc.klay.getHeaderByHash('0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3').then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed：'0x0',
  governanceData: '0x',
  hash：'0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...'，
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward：'0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp：'0x62201975'，
  timestampFoS：'0x0'，
  transactionsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getBlock <a href="#caver-rpc-klay-getblock" id="caver-rpc-klay-getblock"></a>

```javascript
caver.rpc.klay.getBlock(blockNumberOrHash [, returnTransactionObjects] [, callback])
```

按塊哈希值或塊編號返回區塊的信息。 如果用戶把區塊哈希值作為參數傳遞，[caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash)就會被調用；如果把區塊編號作為參數調用，[caver.rpc.klay.getBlockByNumber](#caver-rpc-klay-getblockbynumber)就會被調用。

**參數**

| 名稱                       | 類型                 | 描述                                                                                  |
| ------------------------ | ------------------ | ----------------------------------------------------------------------------------- |
| 區塊編號或哈希值                 | number \\| string | 區塊哈希值、編號或區塊標籤字符串。                                                                   |
| returnTransactionObjects | boolean            | (可選，默認為 `false`） 如果為 `true`，返回的塊將包含所有交易對象；如果為 `false`，則只包含交易哈希值。 |
| callback                 | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                  |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                                                                                                                                      |
| -- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 對象 | 一個區塊對象。 有關返回值的詳細說明，請參閱 [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash)。 |

**示例**

```javascript
> caver.rpc.klay.getBlock(1).then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed：'0x0',
    governanceData: '0x',
    hash：'0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b'，
    logsBloom：'0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward：'0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp：0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions：[],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x',
}
```

## caver.rpc.klay.getBlockByNumber <a href="#caver-rpc-klay-getblockbynumber" id="caver-rpc-klay-getblockbynumber"></a>

```javascript
caver.rpc.klay.getBlockByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

按區塊號返回關於區塊的信息。

**參數**

| 名稱                       | 類型                 | 描述                                                                                  |
| ------------------------ | ------------------ | ----------------------------------------------------------------------------------- |
| 區塊編號                     | number \\| string | 區塊編號或用字符串（"genesis "或 "latest"）標記的區塊。                                               |
| returnTransactionObjects | boolean            | (可選，默認為 `false`） 如果為 `true`，返回的塊將包含所有交易對象；如果為 `false`，則只包含交易哈希值。 |
| callback                 | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                  |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                                                                                                                                                                                          |
| -- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 對象 | 一個區塊對象。 有關返回值的詳細說明，請參閱 [caver.rpc.klay.getBlockByHash]（#caver-rpc-klay-getblockbyhash）。 |

**示例**

```javascript
> caver.rpc.klay.getBlockByNumber(1).then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed：'0x0',
    governanceData: '0x',
    hash：'0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b'，
    logsBloom：'0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward：'0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp：0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions：[],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}
```

## caver.rpc.klay.getBlockByHash <a href="#caver-rpc-klay-getblockbyhash" id="caver-rpc-klay-getblockbyhash"></a>

```javascript
caver.rpc.klay.getBlockByHash(blockHash [, returnTransactionObjects] [, callback])
```

使用 `blockHash` 返回最近區塊的區塊編號。

**參數**

| 名稱                       | 類型       | 描述                                                                                  |
| ------------------------ | -------- | ----------------------------------------------------------------------------------- |
| 區塊哈希                     | 字符串      | 區塊哈希值                                                                               |
| returnTransactionObjects | boolean  | (可選，默認為 `false`） 如果為 `true`，返回的塊將包含所有交易對象；如果為 `false`，則只包含交易哈希值。 |
| callback                 | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                  |

**返回價值**

`Promise` 返回 `object` - 對象包括代碼塊：

| 名稱               | 類型  | 描述                                                                  |
| ---------------- | --- | ------------------------------------------------------------------- |
| baseFeePerGas    | 字符串 | The base fee per gas 只有當該塊編號的 EthTxTypeCompatibleBlock 被激活時，才會返回該值。 |
| blockScore       | 字符串 | 區塊鏈網絡中的挖礦難度。 區塊分數 "的使用與網絡共識不同。 在 BFT 共識引擎中始終為 1。                    |
| 額外數據             | 字符串 | 該數據塊的 "額外數據 "字段。                                                    |
| gasUsed          | 字符串 | 該區塊所有交易使用的gas總量。                                                    |
| 治理數據             | 字符串 | RLP 編碼的治理配置                                                         |
| hash             | 字符串 | 區塊的哈希值。 如果是待處理區塊，則為 "null"。                                         |
| logsBloom        | 字符串 | 區塊日誌的 Bloom 過濾器。 如果是待處理區塊，則為 "null"                                 |
| 數量               | 字符串 | 區塊編號 如果是待處理區塊，則為 "null"                                             |
| 父哈希值             | 字符串 | 父塊的哈希值。                                                             |
| receiptsRoot     | 字符串 | 區塊收據三元組的根。                                                          |
| 獎勵               | 字符串 | 整筆獎勵的受益人地址。                                                         |
| Size             | 字符串 | 整數，該數據塊的大小（字節）。                                                     |
| stateRoot        | 字符串 | 區塊最終狀態三元組的根。                                                        |
| 時間戳              | 字符串 | 區塊整理時的 unix 時間戳。                                                    |
| 時間戳FoS           | 字符串 | 區塊整理時間戳的秒分數。                                                        |
| totalBlockScore  | 字符串 | 該區塊之前鏈上總 blockScore 的整數。                                            |
| 交易               | 數組  | 事務對象數組，或 32 字節事務哈希值，取決於 `returnTransactionObjects` 參數。              |
| transactionsRoot | 字符串 | 區塊的交易三角根。                                                           |
| voteData         | 字符串 | RLP 加密的提案治理投票。                                                      |

**示例**

```javascript
> caver.rpc.klay.getBlockByHash('0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b').then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed：'0x0',
    governanceData: '0x',
    hash：'0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b'，
    logsBloom：'0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot：'0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward：'0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp：0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions：[],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}
```

## caver.rpc.klay.getBlockReceipts <a href="#caver-rpc-klay-getblockreceipts" id="caver-rpc-klay-getblockreceipts"></a>

```javascript
caver.rpc.klay.getBlockReceipts(blockHash] [, callback])
```

返回由塊哈希值標識的塊中包含的收據。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 區塊哈希     | 字符串      | 區塊哈希值                                              |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型 | 描述                                                                                                                                                                                                                                       |
| -- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 數組 | 交易收據包含在一個區塊中。 如果目標塊不包含事務，則返回空數組 `[]`。 有關交易收據的詳細說明，請參閱 [caver.rpc.klay.getTransactionReceipt]（#caver-rpc-klay-gettransactionreceipt）。 |

**示例**

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
caver.rpc.klay.getBlockTransactionCountByNumber(blockNumber] [, callback])
```

返回與給定區塊編號匹配的區塊中的交易次數。

**參數：**

| 名稱       | 類型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 區塊編號     | number \\| string | 區塊編號或區塊標籤字符串（`genesis` 或`latest`）。                 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述                |
| --- | ----------------- |
| 字符串 | 給定區塊中的交易次數（十六進制）。 |

**示例**

```javascript
> caver.rpc.klay.getBlockTransactionCountByNumber(21249).then(console.log)
0x1

```

## caver.rpc.klay.getBlockTransactionCountByHash <a href="#caver-rpc-klay-getblocktransactioncountbyhash" id="caver-rpc-klay-getblocktransactioncountbyhash"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByHash(blockHash] [, callback])
```

返回與給定塊號匹配的塊中的交易數量。

**參數：**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 區塊哈希     | 字符串      | 區塊哈希值。                                             |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述                |
| --- | ----------------- |
| 字符串 | 給定區塊中的交易次數（十六進制）。 |

**示例**

```javascript
> caver.rpc.klay.getBlockTransactionCountByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
0x1

```

## caver.rpc.klay.getBlockWithConsensusInfoByNumber <a href="#caver-rpc-klay-getblockwithconsensusinfobynumber" id="caver-rpc-klay-getblockwithconsensusinfobynumber"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByNumber(blockNumber [, callback])
```

返回與給定區塊編號匹配的共識信息區塊。

**參數**

| 名稱       | 類型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 區塊編號     | number \\| string | 區塊編號或區塊標籤字符串（`genesis` 或`latest`）。                 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型  | 描述                                                                                                                                                                                                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 字符串 | 對象包括具有共識信息的區塊。 有關返回值的詳細說明，請參閱 [caver.rpc.klay.getBlockWithConsensusInfoByHash]（#caver-rpc-klay-getblockwithconsensusinfobyhash）。 |

**示例**

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
caver.rpc.klay.getBlockWithConsensusInfoByHash(blockHash] [, callback])
```

返回與給定哈希值匹配的共識信息塊。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 區塊哈希     | 字符串      | 區塊哈希值。                                             |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` 返回 `object` - 包含共識信息（提議者和委員會成員名單）的區塊對象，如果沒有找到區塊，則返回 null：

| 名稱               | 類型  | 描述                                    |
| ---------------- | --- | ------------------------------------- |
| blockScore       | 字符串 | 以前的困難。 在 BFT 共識引擎中始終為 1               |
| 委員會              | 數組  | 該區塊委員會成員的地址數組。 該委員會是參與該區塊共識協議的驗證者的子集。 |
| 額外數據             | 字符串 | 該數據塊的 "額外數據 "字段。                      |
| gasUsed          | 字符串 | 該區塊所有交易使用的gas總量。                      |
| 治理數據             | 字符串 | RLP 編碼的治理配置                           |
| 哈希               | 字符串 | 區塊的哈希值。 如果是待處理區塊，則為 "null"。           |
| logsBloom        | 字符串 | 區塊日誌的 Bloom 過濾器。 如果是待處理區塊，則為 "null"。  |
| 數量               | 字符串 | 區塊編號。 如果是待處理區塊，則為 "null"。             |
| 起源提案人            | 字符串 | 建議在同一區段編號上進行 0 輪。                     |
| 父哈希值             | 字符串 | 父塊的哈希值。                               |
| 提案人              | 字符串 | 提案者的地址。                               |
| receiptsRoot     | 字符串 | 區塊收據三元組的根。                            |
| 獎勵               | 字符串 | 整筆獎勵的受益人地址。                           |
| 輪次               | 數量  | 輪數                                    |
| Size             | 字符串 | 整數，該數據塊的大小（字節）。                       |
| stateRoot        | 字符串 | 區塊最終狀態三元組的根。                          |
| 時間戳              | 字符串 | 區塊整理時的 unix 時間戳。                      |
| 時間戳FoS           | 字符串 | 區塊整理時間戳的秒分數。                          |
| totalBlockScore  | 字符串 | 該區塊之前鏈上總 blockScore 的整數。              |
| 交易               | 數組  | 事務對象數組。                               |
| transactionsRoot | 字符串 | 區塊的交易三角根。                             |
| voteData         | 字符串 | RLP 編碼的提案人治理投票                        |

**示例**

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

返回指定區塊的委員會中所有驗證器的列表。

**參數**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `Array`

| 類型 | 描述                |
| -- | ----------------- |
| 數組 | 指定區塊內委員會所有驗證員的地址。 |

**示例**

```javascript
> caver.rpc.klay.getCommittee().then(console.log)
[
    '0xddc2002b729676dfd906484d35bb02a8634d7040',
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'
]。
```

## caver.rpc.klay.getCommitteeSize <a href="#caver-rpc-klay-getcommitteesize" id="caver-rpc-klay-getcommitteesize"></a>

```javascript
caver.rpc.klay.getCommitteeSize([blockNumber] [, callback])
```

返回指定區塊的委員會大小。

**參數**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `number`

| 類型 | 描述          |
| -- | ----------- |
| 數量 | 指定區塊的委員會規模。 |

**示例**

```javascript
> caver.rpc.klay.getCommitteeSize().then(console.log)
2
```

## caver.rpc.klay.getCouncil <a href="#caver-rpc-klay-getcouncil" id="caver-rpc-klay-getcouncil"></a>

```javascript
caver.rpc.klay.getCouncil([blockNumber] [, callback])
```

返回指定區塊中議會所有驗證器的列表。

**參數**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `Array`

| 類型 | 描述                            |
| -- | ----------------------------- |
| 數組 | 給定區塊中議會的驗證器地址數組，如果沒有找到議會，則為空。 |

**示例**

```javascript
> caver.rpc.klay.getCouncil().then(console.log)
[
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    '0xddc2002b729676dfd906484d35bb02a8634d7040'
]。
```

## caver.rpc.klay.getCouncilSize <a href="#caver-rpc-klay-getcouncilsize" id="caver-rpc-klay-getcouncilsize"></a>

```javascript
caver.rpc.klay.getCouncilSize([blockNumber] [, callback])
```

返回指定區塊的理事會大小。

**參數**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

**返回價值**

`Promise` returns `number`

| 類型 | 描述         |
| -- | ---------- |
| 數量 | 給定區塊的議會規模。 |

**示例**

```javascript
> caver.rpc.klay.getCouncilSize().then(console.log)
2
```

## caver.rpc.klay.getStorageAt <a href="#caver-rpc-klay-getstorageat" id="caver-rpc-klay-getstorageat"></a>

```javascript
caver.rpc.klay.getStorageAt(address, position [, blockNumber] [, callback])
```

從給定地址的存儲位置返回值。

**參數：**

| 名稱       | 類型                 | 描述                                                                                                                              |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 地址       | 字符串                | 獲取存儲空間的地址。                                                                                                                      |
| 位置       | 數量                 | 存儲空間的索引位置。 有關 "計算位置 "的更多信息，請參閱 [klay_getStorageAt](../../../../json-rpc/klay/block.md#klay_getstorageat) 。 |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。                                               |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                                                              |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述       |
| --- | -------- |
| 字符串 | 該存儲位置的值。 |

**示例**

```javascript
> caver.rpc.klay.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 0).then(console.log)
0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234
```

## caver.rpc.klay.isMinting <a href="#caver-rpc-klay-isminting" id="caver-rpc-klay-isminting"></a>

```javascript
caver.rpc.klay.isMinting([callback])
```

如果客戶端正在積極挖掘新區塊，則返回 `true`。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

Promise`返回`boolean`- 如果客戶端正在挖礦，則返回`true`，否則返回 `false\`。

**示例**

```javascript
> caver.rpc.klay.isMinting().then(console.log)
true
```

## caver.rpc.klay.isSyncing <a href="#caver-rpc-klay-issyncing" id="caver-rpc-klay-issyncing"></a>

```javascript
caver.rpc.klay.isSyncing([callback])
```

返回一個包含同步狀態數據的對象，否則返回 false。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` 返回 `object|boolean` - 如果 kaia 節點未同步，則返回 `false`。 否則，將返回一個同步對象：

| 名稱           | 類型  | 描述                  |
| ------------ | --- | ------------------- |
| 起始塊          | 字符串 | 同步開始的區塊編號（十六進制）。    |
| 當前區塊         | 字符串 | 節點當前同步到的區塊編號（十六進制）。 |
| 最高塊          | 字符串 | 要同步到的估計區塊編號（十六進制）。  |
| 已知狀態         | 字符串 | 可下載以十六進制表示的估計狀態。    |
| pulledStates | 字符串 | 以十六進制表示已下載的狀態。      |

**示例**

```javascript
> caver.rpc.klay.isSyncing().then(console.log)
{
        startingBlock: 100,
        currentBlock：312,
        highestBlock: 512,
        knownStates：234566,
        pulledStates：123455
}

> caver.rpc.klay.isSyncing().then(console.log)
false
```

## caver.rpc.klay.call <a href="#caver-rpc-klay-call" id="caver-rpc-klay-call"></a>

```javascript
caver.rpc.klay.call(callObject [, blockNumber] [, callback])
```

立即執行新的消息調用，而不在區塊鏈上發送交易。 如果發生錯誤，它會返回數據或 JSON RPC 的錯誤對象。

**參數**

| 名稱       | 類型                 | 描述                                                                                |
| -------- | ------------------ | --------------------------------------------------------------------------------- |
| 調用對象     | 對象                 | 交易調用對象。 該對象的屬性請參見下表。                                                              |
| 區塊編號     | number \\| string | (可選）區塊編號，或字符串 "latest"（最新）或 "earliest"（最早）。 如果省略，將使用 `latest`。 |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                |

callObject\` 具有以下屬性：

| 名稱       | 類型  | 描述                                                                                                              |
| -------- | --- | --------------------------------------------------------------------------------------------------------------- |
| to       | 字符串 | (測試新合同部署時可選） 交易指向的地址。                                                                        |
| 輸入       | 字符串 | (可選）方法簽名和編碼參數的哈希值。 您可以使用 `caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall`。 |
| from     | 字符串 | (可選）交易發送的地址。                                                                                 |
| gas      | 字符串 | (可選）為交易執行提供的gas。 `klay_call` 消耗的gas為零，但某些執行可能需要該參數。                                          |
| gasPrice | 字符串 | (可選）用於每種付費gas的 gasPrice。                                                                     |
| value    | 字符串 | (可選）以 `peb` 為單位與該交易一起發送的值。                                                                   |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述                      |
| --- | ----------------------- |
| 字符串 | 調用返回的數據。 例如，智能合約函數的返回值。 |

**示例**

```javascript
> caver.rpc.klay.call({ 
        to：'0x5481a10a47C74f800BDF4955BD77550881bde91C', // 合同地址
        input: '0x70a0823100000000000000000000ddc2002b729676dfd906484d35bb02a8634d7040'
    }).then(console.log)
0x000000000000000000000000000000000000000000000de0b6b3a7640000
```

## caver.rpc.klay.estimateGas <a href="#caver-rpc-klay-estimategas" id="caver-rpc-klay-estimategas"></a>

```javascript
caver.rpc.klay.estimateGas(callObject [, blockNumber] [, callback])
```

生成並返回交易完成所需的 "gas "估計值。 該方法產生的交易不會添加到區塊鏈中。

**參數**

參見 [caver.rpc.klay.call](#caver-rpc-klay-call)參數，預計所有屬性都是可選的。

**返回價值**

`Promise` returns `Array`

| 類型  | 描述       |
| --- | -------- |
| 字符串 | 用的Gas數量。 |

**示例**

```javascript
> caver.rpc.klay.estimateGas({ 
        to：'0x5481a10a47C74f800BDF4955BD77550881bde91C', // 合同地址
        input: '0x095ea7b30000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe320000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xb2a0
```

## caver.rpc.klay.estimateComputationCost <a href="#caver-rpc-klay-estimatecomputationcost" id="caver-rpc-klay-estimatecomputationcost"></a>

```javascript
caver.rpc.klay.estimateComputationCost(callObject [, blockNumber] [, callback])
```

生成並返回執行事務的 "計算成本 "估計值。 kaia 將事務的計算成本限制為 `100000000` ，以避免單個事務耗費過多時間。 該交易不會像 [caver.rpc.klay.estimateGas]（#caver-rpc-klay-estimategas）那樣被添加到區塊鏈中。

**參數**

參見 [caver.rpc.klay.call](#caver-rpc-klay-call)參數，預計所有屬性都是可選的。

**返回價值**

`Promise` returns `Array`

| 類型  | 描述       |
| --- | -------- |
| 字符串 | 使用的計算成本。 |

**示例**

```javascript
> caver.rpc.klay.estimateComputationCost({ 
        to：0x5481a10a47C74f800BDF4955BD77550881bde91C', // 合同地址
        input: '0x095ea7b30000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe3200000000000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xd761
```

## caver.rpc.klay.getTransactionByBlockHashAndIndex <a href="#caver-rpc-klay-gettransactionbyblockhashandindex" id="caver-rpc-klay-gettransactionbyblockhashandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockHashAndIndex(blockHash, index [, callback])
```

按 "塊哈希值 "和 "事務索引 "位置返回事務信息。

**參數**

| 名稱        | 類型       | 描述                                                 |
| --------- | -------- | -------------------------------------------------- |
| blockHash | 字符串      | 區塊哈希值。                                             |
| index     | 數量       | 區塊內的事務索引位置。                                        |
| callback  | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                                                                                                                                   |
| -- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 對象 | 事務對象，詳見 [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash)。 |

**示例**

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

按 "區塊編號 "和 "事務索引 "位置返回事務信息。

**參數**

| 名稱       | 類型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 區塊編號     | number \\| string | 區塊編號或區塊標籤字符串（`genesis` 或`latest`）。                 |
| index    | 數量                 | 區塊內的事務索引位置。                                        |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                                                                                                                                   |
| -- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 對象 | 事務對象，詳見 [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash)。 |

**舉例**

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

使用交易哈希值請求，返回有關交易的信息。

**參數：**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易哈希值。   | 字符串      | 交易哈希值。                                             |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` 返回 `object` - 一個事務對象，如果沒有找到事務，則返回 `null` ：

| 名稱                 | 類型      | 描述                                                                                                                                        |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 字符串     | 該交易所在區塊的哈希值。                                                                                                                              |
| 區塊編號               | 字符串     | 該交易所在的區塊編號。                                                                                                                               |
| 代碼格式               | 字符串     | (可選，默認：`'EVM'`）智能合約代碼的編碼格式。                                                                                            |
| 付費人                | 字符串     | (可選）付費人地址。                                                                                                             |
| feePayerSignatures | 數組      | (可選）付費人簽名對象數組。 簽名對象包含三個字段（V、R 和 S）。 V 包含 ECDSA 恢復 ID。 R 包含 ECDSA 簽名 r，而 S 包含 ECDSA 簽名 s。                               |
| 費用比率               | 字符串     | (可選）付費人的繳費比例。 如果是 30，付費人將支付 30%的費用。 70% 由發送人支付。                                                                        |
| from               | 字符串     | 發送人地址。                                                                                                                                    |
| gas                | 字符串     | 發送人提供的gas。                                                                                                                                |
| gasPrice           | 字符串     | 由發件人提供用 peb 的 Gas 價格                                                                                                                      |
| 哈希                 | 字符串     | 交易的哈希值。                                                                                                                                   |
| humanReadable      | Boolean | (可選） `true`（如果地址可人工讀取），`false`（如果地址不可人工讀取）。                                                                            |
| key                | 字符串     | (可選）用於更新 kaia 帳戶 AccountKey 的 RLP 編碼 AccountKey。 詳情請參閱 [AccountKey](../../../../../../learn/accounts.md#account-key) 。 |
| input              | 字符串     | (可選）與交易一起發送的數據。                                                                                                        |
| nonce              | 字符串     | 發件人在此交易之前進行的交易次數。                                                                                                                         |
| 發送方 TxHash         | 字符串     | (可選）不含繳費人地址和簽名的 txash。 該值始終與非收費委託交易的 `hash` 值相同。                                                                       |
| 簽名                 | 數組      | 簽名對象數組。 簽名對象包含三個字段（V、R 和 S）。 V 包含 ECDSA 恢復 ID。 R 包含 ECDSA 簽名 r，而 S 包含 ECDSA 簽名 s。                                                         |
| to                 | 字符串     | 收件人地址。 如果是合約部署事務，則為 "null"。                                                                                                               |
| 交易索引               | 字符串     | 區塊中事務索引位置的整數。                                                                                                                             |
| 類型                 | 字符串     | 表示交易類型的字符串。                                                                                                                               |
| typeInt            | 數量      | 代表交易類型的整數。                                                                                                                                |
| value              | 字符串     | 以peb為單位的價值轉移                                                                                                                              |

如果事務處於 "待處理 "狀態，尚未被處理，則會返回 "blockHash"、"blockNumber "和 "transactionIndex "的默認值。 請參見下面的示例。

**示例**

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

返回發送方交易哈希值請求的交易信息。

請注意，只有在節點中通過 `--sendertxhashindexing`啟用了索引功能時，此 API 才會返回正確的結果。 使用 [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) 檢查索引功能是否啟用。

**參數：**

| 名稱         | 類型       | 描述                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 發送方 TxHash | 字符串      | 發送方交易哈希值。 返回事務的 [senderTxHash]（.../.../.../.../.../learn/transactions/transactions.md#sendertxhash）。 |
| callback   | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                                                                                                                                                                                                                                                                                                                                                       |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                                                                                                                                    |
| -- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 對象 | 事務對象，詳見 [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash) 。 |

**示例**

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

根據交易哈希返回交易的收據。

**注意**\* 對於交易尚未處理的 "待處理 "交易，不提供收據。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易哈希值。   | 字符串      | 交易哈希值。                                             |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` 返回 `object` - 交易收據對象，或 `null` - 未找到收據：

| 名稱                 | 類型      | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 字符串     | 該交易所在區塊的哈希值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 區塊編號               | 字符串     | 該交易所在的區塊編號。                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| codeFormat         | 字符串     | (可選，默認：`'EVM'`）智能合約代碼的編碼格式。                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| contractAddress    | 字符串     | 如果交易是創建合約，則為創建的合同地址，否則為`null`。                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 有效GasPrice         | 字符串     | 從發送方扣除的每筆gas的實際價值。 在 Magma 硬分叉之前，該值等於交易的Gas 價格。 Magma 硬分叉後，它等於區塊頭中的 "baseFee "值。                                                                                                                                                                                                                                                                                                                                                                                                         |
| 付費者                | 字符串     | (可選）付費人地址。                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| feePayerSignatures | 數組      | (可選）付費人簽名對象數組。 簽名對象包含三個字段（V、R 和 S）。 V 包含 ECDSA 恢復 ID。 R 包含 ECDSA 簽名 r，而 S 包含 ECDSA 簽名 s。                                                                                                                                                                                                                                                                                                                                                                              |
| 費用比率               | 字符串     | (可選）付費人的繳費比例。 如果是 30，繳費人將支付 30%的費用。 70% 由發送人支付。                                                                                                                                                                                                                                                                                                                                                                                                                       |
| from               | 字符串     | 發送人地址。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| gas                | 字符串     | 發送人提供的gas。                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| gasPrice           | 字符串     | 由發件人提供用 peb 的 Gas 價格                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| gasUsed            | 字符串     | 僅此一項交易使用的gas量。                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| humanReadable      | Boolean | (可選） `true`（如果地址可人工讀取），`false`（如果地址不可人工讀取）。                                                                                                                                                                                                                                                                                                                                                                                                                           |
| key                | 字符串     | (可選）用於更新 kaia 帳戶 AccountKey 的 RLP 編碼 AccountKey。                                                                                                                                                                                                                                                                                                                                                                                                                      |
| input              | 字符串     | (可選）與交易一起發送的數據。                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| logs               | 數組      | 該事務生成的日誌對象數組。                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| logsBloom          | 字符串     | 用於輕型客戶端的 Bloom 過濾器可快速檢索相關日誌。                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| nonce              | 字符串     | 發件人在此交易之前進行的交易次數。                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 發送方 TxHash         | 字符串     | (可選）僅由發送方簽名的交易哈希值。 返回事務的 [senderTxHash]（.../.../.../.../.../learn/transactions/transactions.md#sendertxhash）。 該值始終與非收費委託交易的 `transactionHash` 相同。 |
| 簽名                 | 數組      | 簽名對象數組。 簽名對象包含三個字段（V、R 和 S）。 V 包含 ECDSA 恢復 ID。 R 包含 ECDSA 簽名 r，而 S 包含 ECDSA 簽名 s。                                                                                                                                                                                                                                                                                                                                                                                                        |
| status             | 字符串     | 如果事務成功，則為 `0x1`；如果 kaia 虛擬機還原了事務，則為 `0x0`。                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| txError            | 字符串     | (可選）當 `status` 等於 `0x0` 時的詳細錯誤代碼。                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| to                 | 字符串     | 收件人地址。 如果是合約部署事務，則為 "null"。                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 交易哈希值。             | 字符串     | 交易的哈希值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 交易索引               | 字符串     | 區塊中事務索引位置的整數。                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 類型                 | 字符串     | 表示交易類型的字符串。                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| typeInt            | 數量      | 代表交易類型的整數。                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| value              | 字符串     | 以peb為單位的價值轉移                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

**注意** `caver.kct.kip7.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**示例**

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

根據交易哈希返回交易的收據。

請注意，只有在節點中通過 `--sendertxhashindexing`啟用了索引功能時，此 API 才會返回正確的結果。 使用 [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) 檢查索引功能是否啟用。

**注意**\* 對於交易尚未處理的 "待處理 "交易，不提供收據。

**參數**

| 名稱         | 類型       | 描述                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 發送方 TxHash | 字符串      | 發送方交易哈希值。 返回事務的 [senderTxHash]（.../.../.../.../.../learn/transactions/transactions.md#sendertxhash）。 |
| callback   | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                                                                                                                                                                                                                                                                                                                                                       |

**返回價值**

`Promise` returns `number`

| 類型 | 描述                                                                                                                                       |
| -- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 對象 | 交易收據對象，詳見 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)。 |

**示例**

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

向 kaia 發送 "簽名交易"。

signedTransaction "參數可以是 "RLP 編碼的簽名交易"。 您可以使用 `transaction.getRLPEncoding` 獲取已簽名事務的 RLP 編碼事務。 為方便起見，`caver.rpc.klay.sendRawTransaction` 也接受 "已簽名事務實例 "作為參數。

**參數**

| 名稱       | 類型                 | 描述                                                 |
| -------- | ------------------ | -------------------------------------------------- |
| 簽名交易     | string \\| object | RLP 編碼的簽名事務或簽名事務實例。                                |
| callback | function           | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

| 類型         | 描述                             |
| ---------- | ------------------------------ |
| PromiEvent | 一個承諾組合事件發射器。 當有交易收據時，該問題將得到解決。 |

PromiEvent 可用於以下事件：

- 事務散列返回字符串：在發送事務且事務哈希值可用後立即觸發。
- 收據 "返回 "對象"：當有交易收據時觸發。 詳情請參閱 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) 。
- error`返回`Error\`：如果在發送過程中發生錯誤，則觸發。 如果出現缺gas錯誤，第二個參數就是收據。

**示例**

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

使用 kaia 節點中的 "導入賬戶私鑰 "將事務簽署為事務 "發送方"，並將事務傳播到 kaia。

有關每種事務類型的更多信息，請參閱 [事務]（.../caver-transaction/caver-transaction.md#class）。

**注意**：此 API 提供了使用 kaia 節點中的 [導入賬戶](../../../.../jsson-rpc/personal.md#personal_importrawkey) 簽署交易的功能。 您節點中的導入賬戶必須[解鎖]（.../.../.../.../jsson-rpc/personal.md#personal_unlockaccount）才能簽署交易。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易       | 對象       | 要發送到 kaia 的事務實例。                                   |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

| 類型         | 描述                             |
| ---------- | ------------------------------ |
| PromiEvent | 一個承諾組合事件發射器。 當有交易收據時，該問題將得到解決。 |

PromiEvent 可用於以下事件：

- 事務散列返回字符串：在發送事務且事務哈希值可用後立即觸發。
- 收據 "返回 "對象"：當有交易收據時觸發。 詳情請參閱 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) 。
- error`返回`Error\`：如果在發送過程中發生錯誤，則觸發。 如果出現缺gas錯誤，第二個參數就是收據。

**示例**

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

使用 kaia 節點中的 "導入賬戶私鑰 "將費用委託交易簽署為交易 "費用支付方"，並將交易傳播到 kaia。

在使用 "sendTransaction "作為付費方之前，交易發送方必須已使用有效簽名，且 "nonce "已定義。

有關每種事務類型的更多信息，請參閱 [事務]（.../caver-transaction/caver-transaction.md#class）。

**注意**：此 API 提供了使用 kaia 節點中的 [導入賬戶](../../../.../jsson-rpc/personal.md#personal_importrawkey) 簽署交易的功能。 您節點中的導入賬戶必須[解鎖]（.../.../.../.../jsson-rpc/personal.md#personal_unlockaccount）才能簽署交易。

**參數**

| 名稱          | 類型       | 描述                                                 |
| ----------- | -------- | -------------------------------------------------- |
| transaction | 對象       | 要發送給 kaia 的收費委託事務實例。                               |
| callback    | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

| 類型         | 描述                             |
| ---------- | ------------------------------ |
| PromiEvent | 一個承諾組合事件發射器。 當有交易收據時，該問題將得到解決。 |

PromiEvent 可用於以下事件：

- 事務散列返回字符串：在發送事務且事務哈希值可用後立即觸發。
- 收據 "返回 "對象"：當有交易收據時觸發。 詳情請參閱 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) 。
- error`返回`Error\`：如果在發送過程中發生錯誤，則觸發。 如果出現缺gas錯誤，第二個參數就是收據。

**示例**

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

使用 kaia 節點中的 "導入賬戶私鑰 "作為交易發送方簽署交易。

有關每種事務類型的更多信息，請參閱 [事務]（.../caver-transaction/caver-transaction.md#class）。

**注意**：此 API 提供了使用 kaia 節點中的 [導入賬戶](../../../.../jsson-rpc/personal.md#personal_importrawkey) 簽署交易的功能。 您節點中的導入賬戶必須[解鎖]（.../.../.../.../jsson-rpc/personal.md#personal_unlockaccount）才能簽署交易。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易       | 對象       | 要簽署的交易實例。                                          |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` 返回 `object` - 對象包括代碼塊：

| 名稱  | 類型  | 描述            |
| --- | --- | ------------- |
| raw | 字符串 | RLP 編碼的簽名交易。  |
| tx  | 對象  | 交易對象，包括髮件人簽名。 |

**示例**

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

使用 kaia 節點中的 "導入賬戶私鑰 "作為交易費支付方簽署交易。

有關每種事務類型的更多信息，請參閱 [事務]（.../caver-transaction/caver-transaction.md#class）。

**注意**：此 API 提供了使用 kaia 節點中的 [導入賬戶](../../../.../jsson-rpc/personal.md#personal_importrawkey) 簽署交易的功能。 您節點中的導入賬戶必須已[解鎖]（.../.../.../.../jsson-rpc/personal.md#personal_unlockaccount），才能簽署信息。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易       | 對象       | 要簽署的交易實例。                                          |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` 返回 `object` - 對象包括代碼塊：

| 名稱  | 類型  | 描述            |
| --- | --- | ------------- |
| raw | 字符串 | RLP 編碼的簽名交易。  |
| tx  | 對象  | 作為繳費人簽署的交易對象。 |

**示例**

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

根據給定的事務哈希值，返回事務中已解碼的錨點數據。

**參數：**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 交易哈希值。   | 字符串      | 交易哈希值。                                             |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` 返回 `object` - 對象包括塊標頭：

| 名稱        | 類型  | 描述                                                                 |
| --------- | --- | ------------------------------------------------------------------ |
| BlockHash | 字符串 | 執行錨定交易的子鏈塊的哈希值。                                                    |
| 區塊編號      | 數量  | 執行該錨定交易的子鏈區塊編號。                                                    |
| 父哈希值      | 字符串 | 父塊的哈希值。                                                            |
| TxHash    | 字符串 | 區塊的交易三角根。                                                          |
| 狀態根哈希值    | 字符串 | 區塊最終狀態三元組的根。                                                       |
| 收據哈希值     | 字符串 | 區塊收據三元組的根。                                                         |
| 區塊數       | 數量  | 錨定期間生成的區塊數。 在大多數情況下，這個數字等於子鏈的 `SC_TX_PERIOD`，除非該事務是開啟錨定後的第一個錨定 tx。 |
| TxCount   | 數量  | 錨定期間子鏈產生的交易次數。                                                     |

**示例**

```javascript
> caver.rpc.klay.getDecodedAnchoringTransactionByHash('0x59831a092a9f0b48018848f5dd88a457efdbfabec13ea07cd769686741a1cd13').then(console.log)
{
    BlockCount：86400,
    BlockHash: '0x3c44b2ed491be7264b9f6819c67427642447716576b6702a72f6fdc40c41abde',
    BlockNumber：23414400,
    ParentHash: '0x735468bb091a296c45553c8f67a8d0d39ac428cbe692b1b6c494d336351477f3',
    ReceiptHash：0x6a908d319b6f6ab4414da1afd6763d70ecc8037ec167aaa8942bc0c2af12b4ab',
    StateRootHash: '0x4a664227fb2508a2952a4695cabb88b433522af2a5dee50cc6dd4036d85bf1d3',
    TxCount：50895,
    TxHash: '0x753a85d2c53fc34cb9108301f1cf8ff8d78dde13d42d80958e47e388008319cd',
}
```

## caver.rpc.klay.getChainId <a href="#caver-rpc-klay-getchainid" id="caver-rpc-klay-getchainid"></a>

```javascript
caver.rpc.klay.getChainId([callback])
```

返回鏈的 ID。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述      |
| --- | ------- |
| 字符串 | 鏈的鏈 ID。 |

**示例**

```javascript
> caver.rpc.klay.getChainId().then(console.log)
0x2710
```

## caver.rpc.klay.getClientVersion <a href="#caver-rpc-klay-getclientversion" id="caver-rpc-klay-getclientversion"></a>

```javascript
caver.rpc.klay.getClientVersion([callback])
```

返回 kaia 節點的當前客戶端版本。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述               |
| --- | ---------------- |
| 字符串 | kaia 節點的當前客戶端版本。 |

**示例**

```javascript
> caver.rpc.klay.getClientVersion().then(console.log)
kaia/v1.3.0+144494d2aa/linux-amd64/go1.13.1
```

## caver.rpc.klay.getGasPrice <a href="#caver-rpc-klay-getgasprice" id="caver-rpc-klay-getgasprice"></a>

```javascript
caver.rpc.klay.getGasPrice([callback])
```

返回單位gas的當前價格（以 wei 為單位）。

**參數：**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述             |
| --- | -------------- |
| 字符串 | 目前 peb 的Gas價格。 |

**示例**

```javascript
> caver.rpc.klay.getGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getGasPriceAt <a href="#caver-rpc-klay-getgaspriceat" id="caver-rpc-klay-getgaspriceat"></a>

```javascript
caver.rpc.klay.getGasPriceAt([blockNumber] [, callback])
```

返回給定區塊當前的單位為 peb 的gas價格。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 區塊編號     | 數量       | (可選）區塊編號。 如果省略，將返回最新單價。         |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述             |
| --- | -------------- |
| 字符串 | 目前 peb 的gas價格。 |

**示例**

```javascript
> caver.rpc.klay.getGasPriceAt().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getMaxPriorityFeePerGas <a href="#caver-rpc-klay-getmaxpriorityfeepergas" id="caver-rpc-klay-getmaxpriorityfeepergas"></a>

```javascript
caver.rpc.klay.getMaxPriorityFeePerGas([callback])
```

返回 peb 中動態收費交易的建議gas小費上限。 由於 kaia 有固定的gas價格，因此會返回 kaia 設定的gas價格。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述            |
| --- | ------------- |
| 字符串 | 建議使用peb付Gas費用 |

**示例**

```javascript
> caver.rpc.klay.getMaxPriorityFeePerGas().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getLowerBoundGasPrice <a href="#caver-rpc-klay-getlowerboundgasprice" id="caver-rpc-klay-getlowerboundgasprice"></a>

```javascript
caver.rpc.klay.getLowerBoundGasPrice([callback])
```

返回以 peb 為單位的gas價格下限。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述                 |
| --- | ------------------ |
| 字符串 | 以 peb 為單位的下限gas價格。 |

**示例**

```javascript
> caver.rpc.klay.getLowerBoundGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getUpperBoundGasPrice <a href="#caver-rpc-klay-getupperboundgasprice" id="caver-rpc-klay-getupperboundgasprice"></a>

```javascript
caver.rpc.klay.getUpperBoundGasPrice([callback])
```

返回以 peb 為單位的gas價格上限。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述                 |
| --- | ------------------ |
| 字符串 | 以 peb 為單位的gas價格上限。 |

**示例**

```javascript
> caver.rpc.klay.getUpperBoundGasPrice().then(console.log)
0xae9f7bcc00
```

## caver.rpc.klay.getFeeHistory <a href="#caver-rpc-klay-getfeehistory" id="caver-rpc-klay-getfeehistory"></a>

```javascript
caver.rpc.klay.getFeeHistory(blockCount, lastBlock, rewardPercentiles [, callback])
```

返回返回區塊範圍的收費歷史記錄。 如果不是所有區塊都可用，則可以是所請求範圍的一個分段。

**參數**

| 名稱                | 類型                                  | 描述                                                                                                                                       |
| ----------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 區塊數               | number\\|BigNumber\\|BN\\|string | 請求範圍內的區塊數。 單次查詢可請求 1 到 1024 個區塊。 如果不是所有區塊都可用，返回的數據可能少於要求的數據。                                                                             |
| lastBlock         | number\\|BigNumber\\|BN\\|string | 請求範圍內的最高數字區塊（或區塊標記字符串）。                                                                                                                  |
| rewardPercentiles | 數組                                  | 單調遞增的百分位值列表，從每個區塊的每個gas有效優先權費用中按升序取樣，並根據所用gas加權。 (例如：`['0'、'25'、'50'、'75'、'100']` 或 `['0'、'0.5'、'1'、'1.5'、'3'、'80']`) |
| callback          | function                            | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                                                                       |

**返回價值**

`Promise` 返回 `object` - 對象包括代碼塊：

| 名稱            | 類型  | 描述                                                                        |
| ------------- | --- | ------------------------------------------------------------------------- |
| oldestBlock   | 字符串 | 返回範圍內的最低數塊。                                                               |
| 獎勵            | 數組  | 二維數組，包含所要求的區塊百分位數下每種gas的有效優先權費。                                           |
| baseFeePerGas | 數組  | 每個gas的區塊基本費用數組。 這包括返回範圍中最新區塊之後的下一個區塊，因為該值可以從最新區塊中導出。 EIP-1559 之前的數據塊返回 0。 |
| gas用量比        | 數組  | 區塊中gasUsed/gasLimit的數組。                                                   |

**示例**

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
}
```

## caver.rpc.klay.createAccessList <a href="#caver-rpc-klay-createaccesslist" id="caver-rpc-klay-createaccesslist"></a>

```javascript
caver.rpc.klay.createAccessList(txCallObject [, callback])
```

此方法根據給定的事務創建訪問列表。 accessList 包含事務讀寫的所有存儲槽和地址，發送者賬戶和預編譯器除外。 該方法使用與 `caver.rpc.klay.call` 相同的事務調用對象和 blockNumberOrTag 對象。 訪問列表可用於釋放因gas成本增加而無法訪問的卡滯合同。 與沒有訪問列表的交易相比，在交易中添加訪問列表並不一定會降低gas用量。

**參數**

| 名稱             | 類型                                  | 描述                                                                                                          |
| -------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| callObject     | 對象                                  | 交易調用對象。 請參閱 [caver.rpc.klay.call](#caver-rpc-klay-call) 參數。 |
| blockParameter | number\\|BigNumber\\|BN\\|string | (可選）區塊編號、區塊斜槓或區塊標籤字符串（"最新 "或 "最早"）。 如果省略，將使用 `latest`。                                   |
| callback       | function                            | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。                                                          |

**返回價值**

`Promise` 返回 `object` - 對象包括代碼塊：

| 名稱          | 類型  | 描述                                                                        |
| ----------- | --- | ------------------------------------------------------------------------- |
| oldestBlock | 字符串 | 返回範圍內的最低數塊。                                                               |
| 獎勵          | 數組  | 二維數組，包含所要求的區塊百分位數下每種gas的有效優先權費。                                           |
| 基本gas費      | 數組  | 每個gas的區塊基本費用數組。 這包括返回範圍中最新區塊之後的下一個區塊，因為該值可以從最新區塊中導出。 EIP-1559 之前的數據塊返回 0。 |
| gas用量比      | 數組  | 區塊中gasUsed/gasLimit的數組。                                                   |

**示例**

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
caver.rpc.klay.isParallelDBWrite([callback])
```

如果節點以並行方式寫入區塊鏈數據，則返回 `true`。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型      | 描述                                                 |
| ------- | -------------------------------------------------- |
| boolean | true "表示節點正在以並行方式寫入區塊鏈數據。 如果節點正在串行寫入數據，則為 "false"。 |

**示例**

```javascript
> caver.rpc.klay.isParallelDBWrite().then(console.log)
true
```

## caver.rpc.klay.isSenderTxHashIndexingEnabled <a href="#caver-rpc-klay-issendertxhashindexingenabled" id="caver-rpc-klay-issendertxhashindexingenabled"></a>

```javascript
caver.rpc.klay.isSenderTxHashIndexingEnabled([callback])
```

如果節點正在索引發送方交易哈希到交易哈希映射信息，則返回 `true`。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型      | 描述                               |
| ------- | -------------------------------- |
| boolean | true "表示節點正在索引發送方交易哈希到交易哈希的映射信息。 |

**示例**

```javascript
> caver.rpc.klay.isSenderTxHashIndexingEnabled().then(console.log)
true
```

## caver.rpc.klay.getProtocolVersion <a href="#caver-rpc-klay-getprotocolversion" id="caver-rpc-klay-getprotocolversion"></a>

```javascript
caver.rpc.klay.getProtocolVersion([callback])
```

返回節點的 kaia 協議版本。 Cypress/Baobab 的當前版本（截至 v1.9.0）是 `istanbul/65`。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述             |
| --- | -------------- |
| 字符串 | 節點的 kaia 協議版本。 |

**示例**

```javascript
> caver.rpc.klay.getProtocolVersion().then(console.log)
0x40
```

## caver.rpc.klay.getRewardbase <a href="#caver-rpc-klay-getrewardbase" id="caver-rpc-klay-getrewardbase"></a>

```javascript
caver.rpc.klay.getRewardbase([callback])
```

返回當前節點的 rewardbase。 Rewardbase 是區塊獎勵的賬戶地址。 只有 CN 才需要。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述      |
| --- | ------- |
| 字符串 | 獎勵基地地址。 |

**示例**

```javascript
> caver.rpc.klay.getRewardbase().then(console.log)
0xa9b3a93b2a9fa3fdcc31addd240b04bf8db3414c
```

## caver.rpc.klay.getFilterChanges <a href="#caver-rpc-klay-getfilterchanges" id="caver-rpc-klay-getfilterchanges"></a>

```javascript
caver.rpc.klay.getFilterChanges(filterId [, callback])
```

過濾器的輪詢方法，返回上次輪詢後的日誌數組。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| filterId | 字符串      | 過濾器 ID。                                            |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` 返回 `Array` - 日誌對象數組，如果上次輪詢後沒有任何更改，則返回空數組。

- 對於使用 [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter) 創建的過濾器，返回值是塊哈希值，_e.g._, `["0x3454645634534..."]`。
- 對於使用 [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter) 創建的過濾器，返回值是事務哈希值，_e.g._, `["0x6345343454645..."]`。
- 對於使用 [caver.rpc.klay.newFilter](#caver-rpc-klay-newfilter) 創建的過濾器，日誌是帶有以下參數的對象：

| 名稱        | 類型  | 描述                                                                                                                                                                                   |
| --------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| logIndex  | 字符串 | 區塊中的日誌索引位置。                                                                                                                                                                          |
| 交易索引      | 字符串 | 創建日誌的事務索引位置。                                                                                                                                                                         |
| 交易哈希值。    | 字符串 | 創建該日誌的交易散列。 待處理時為 "null"。                                                                                                                                                            |
| blockHash | 字符串 | 該交易所在區塊的哈希值。 待處理時為 "null"。                                                                                                                                                           |
| 區塊編號      | 字符串 | 該日誌所在的區塊編號。 待處理時為 "null"。                                                                                                                                                            |
| address   | 字符串 | 該日誌的來源地址。                                                                                                                                                                            |
| 數據        | 字符串 | 包含日誌的非索引參數。                                                                                                                                                                          |
| topics    | 數組  | 由 0 到 4 個 32 字節的日誌參數數據組成的數組。 (在 Solidity 中：第一個主題是事件簽名的哈希值（_e.g._, `Deposit(address,bytes32,uint256)`），除非你用 `anonymous` 指定符聲明瞭事件）。 |

**示例**

```javascript
> caver.rpc.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log)
[ 
    { 
        地址：0x71e503935b7816757AA0314d4E7354dab9D39162',
        topics：[ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data：0x00000000000000000000000000000000000000000001',
        blockNumber: '0xdc5',
        transactionHash: '0x1b28e2c723e45a0d8978890598903f36a74397c9cea8531dc9762c39483e417f',
        transactionIndex：'0x0',
        blockHash: '0xb7f0bdaba93d3baaa01a5c24517da443207f774e0202f02c298e8e997a540b3d',
        logIndex：'0x0'
    } 
]
```

## caver.rpc.klay.getFilterLogs <a href="#caver-rpc-klay-getfilterlogs" id="caver-rpc-klay-getfilterlogs"></a>

```javascript
caver.rpc.klay.getFilterLogs(filterId [, callback])
```

返回一個數組，其中包含與給定 id 的過濾器匹配的所有日誌。 應使用 [newFilter](#caver-rpc-klay-newfilter) 獲取過濾器對象。

請注意，其他過濾器創建函數返回的過濾器 id，如 [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter) 或 [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter) 不能與此函數一起使用。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| filterId | 字符串      | 過濾器 ID。                                            |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

參見 [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

**示例**

```javascript
> caver.rpc.klay.getFilterLogs('0xcac08a7fc32fc625a519644187e9f690').then(console.log);
[
    {
        地址：0x55384B52a9E5091B6012717197887dd3B5779Df3',
        topics：[ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data：0x00000000000000000000000000000000000000000001',
        blockNumber: '0x1c31',
        transactionHash: '0xa7436c54e47dafbce696de65f6e890c96ac22c236f50ca1be28b9b568034c3b3',
        transactionIndex：'0x0',
        blockHash: '0xe4f27c524dacfaaccb36735deccee69b3d6c315e969779784c36bb8e14b89e01',
        logIndex：'0x0'
    }
]
```

## caver.rpc.klay.getLogs <a href="#caver-rpc-klay-getlogs" id="caver-rpc-klay-getlogs"></a>

```javascript
caver.rpc.klay.getLogs(options [, callback])
```

返回與給定篩選器對象匹配的所有日誌的數組。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 選項       | 對象       | 過濾器選項。 請參閱下表查找說明。                                  |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

選項對象可以包含以下內容

| 名稱        | 類型                 | 描述                                                                                                                                                                                                                 |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fromBlock | number \\| string | (可選）要獲取日誌的最早數據塊的數據區塊編號。 (最新 "指最近的區塊）。 默認值為 \`"最新"。                                                                                                                           |
| toBlock   | number \\| string | (可選）獲取日誌的最後一個區塊的區塊編號。 ("latest "指最新的區塊）。 默認值為 \`"最新"。                                                                                                                        |
| address   | string \\| Array  | (可選）地址或地址列表。 只返回與特定賬戶相關的日誌。                                                                                                                                                                     |
| topics    | 數組                 | (可選）必須出現在日誌條目中的值數組。 順序很重要。 如果您想省略主題，請使用 `null`, _e.g._, `[null,'0x12...']`。 您也可以為每個主題傳遞一個數組，其中包含該主題的選項，例如_ `[null,['option1','option2']]`。 |

**返回價值**

參見 [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

**示例**

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
caver.rpc.klay.newBlockFilter([callback])
```

在節點中創建一個過濾器，在有新塊到達時發出通知。 要檢查狀態是否已更改，請調用 [caver.rpc.klay.getFilterChanges]（#caver-rpc-klay-getfilterchanges）。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述      |
| --- | ------- |
| 字符串 | 過濾器 ID。 |

**示例**

```javascript
> caver.rpc.klay.newBlockFilter().then(console.log)
0xf90906914486a9c22d620e50022b38d5
```

## caver.rpc.klay.newFilter <a href="#caver-rpc-klay-newfilter" id="caver-rpc-klay-newfilter"></a>

```javascript
caver.rpc.klay.newFilter(options [, callback])
```

使用給定的篩選器選項創建篩選器對象，以接收特定的狀態變化（日誌）。

- 要檢查狀態是否已更改，請調用 [caver.rpc.klay.getFilterChanges]（#caver-rpc-klay-getfilterchanges）。
- 要獲取與`newFilter`創建的過濾器匹配的所有日誌，請調用[caver.rpc.klay.getFilterLogs](#caver-rpc-klay-getfilterlogs)。

有關過濾器對象主題的詳細信息，請參閱 [Kaia Platform API - klay_newFilter]（.../../../../json-rpc/klay/filter.md#klay_newfilter）。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 選項       | 對象       | 過濾器選項。 請參閱下表查找說明。                                  |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

選項對象可以包含以下內容

| 名稱        | 類型                 | 描述                                                                                                                                                                                                                 |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fromBlock | number \\| string | (可選）獲取日誌的最後一個區塊的區塊編號。 (最新 "指最近的區塊）。 默認值為 \`"最新"。                                                                                                                             |
| toBlock   | number \\| string | (可選）獲取日誌的最後一個區塊的區塊編號。 ("最新 "指最近的區塊）。 默認值為 \`"最新"。                                                                                                                            |
| address   | string \\| Array  | (可選）地址或地址列表。 只返回與特定賬戶相關的日誌。                                                                                                                                                                     |
| topics    | 數組                 | (可選）必須出現在日誌條目中的值數組。 順序很重要。 如果您想省略主題，請使用 `null`, _e.g._, `[null,'0x12...']`。 您也可以為每個主題傳遞一個數組，其中包含該主題的選項，例如_ `[null,['option1','option2']]`。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述      |
| --- | ------- |
| 字符串 | 過濾器 ID。 |

**示例**

```javascript
> caver.rpc.klay.newFilter({}).then(console.log)
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.rpc.klay.newFilter({ address: '0x55384B52a9E5091B6012717197887dd3B5779Df3' }).then(console.log)
0xd165cbf31b9d60346aada33dbefe01b
```

## caver.rpc.klay.newPendingTransactionFilter <a href="#caver-rpc-klay-newpendingtransactionfilter" id="caver-rpc-klay-newpendingtransactionfilter"></a>

```javascript
caver.rpc.klay.newPendingTransactionFilter([callback])
```

在節點中創建一個過濾器，用於接收新的待處理事務到達的信息。 要檢查狀態是否已更改，請調用 [caver.rpc.klay.getFilterChanges]（#caver-rpc-klay-getfilterchanges）。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述      |
| --- | ------- |
| 字符串 | 過濾器 ID。 |

**示例**

```javascript
> caver.rpc.klay.newPendingTransactionFilter().then(console.log)
0xe62da1b2a09efcd4168398bdbf586db0
```

## caver.rpc.klay.uninstallFilter <a href="#caver-rpc-klay-uninstallfilter" id="caver-rpc-klay-uninstallfilter"></a>

```javascript
caver.rpc.klay.uninstallFilter(filterId [, callback])
```

卸載具有給定 Id 的過濾器。 當不再需要監控時應總是被調用。 此外，當過濾器在一段時間內未被 [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) 調用時，過濾器就會超時。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| filterId | 字符串      | 過濾器 ID。                                            |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `number`

| 類型      | 描述                                |
| ------- | --------------------------------- |
| boolean | 如果過濾器已成功卸載，則為 `true`，否則為 `false`。 |

**示例**

```javascript
> caver.rpc.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log)
true
```

## caver.rpc.klay.sha3 <a href="#caver-rpc-klay-sha3" id="caver-rpc-klay-sha3"></a>

```javascript
caver.rpc.klay.sha3(data[, callback])
```

返回給定數據的 Keccak-256（而非標準化的 SHA3-256）。 您可以使用 [caver.utils.sha3]（../caver.utils.md#sha3）代替它。

**參數**

| 名稱       | 類型       | 描述                                                 |
| -------- | -------- | -------------------------------------------------- |
| 數據       | 字符串      | 要轉換成 SHA3 哈希值的數據。                                  |
| callback | function | (可選）可選回調，第一個參數返回錯誤對象，第二個參數返回結果。 |

**返回價值**

`Promise` returns `Array`

| 類型  | 描述             |
| --- | -------------- |
| 字符串 | 給定數據的 SHA3 結果。 |

**示例**

```javascript
> caver.rpc.klay.sha3('0x11223344').then(console.log)
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
