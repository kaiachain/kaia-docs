# caver.kct.kip37

caver.kct.kip37 "可幫助您在 kaia 區塊鏈上輕鬆處理以 JavaScript 對象形式實現 KIP-37 的智能合約。

caver.kct.kip37 "繼承了[caver.contract](../caver.contract.md)，以實現 KIP-37 代幣合約。 caver.kct.kip37 "擁有與 "caver.contract "相同的屬性，但還有其他方法來實現額外的功能。 本節僅介紹 "caver.kct.kip37 "新增的綁定方法。

為 caver-js 實現 KIP-37 的代碼可在 [Kaia Contracts Github Repo](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP37) 上獲取。 用於 caver-js 的 KIP-37 支持 Ownable 接口。 使用此功能，您可以在部署合約時指定合約所有者

有關 KIP-37 的更多信息，請參閱 [Kaia 改進提案](https://kips.kaia.io/KIPs/kip-37)。

**注意** `caver.kct.kip37`從 caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7) 開始支持。

## caver.kct.kip37.deploy <a id="caver-klay-kip37-deploy"></a>

```javascript
caver.kct.kip37.deploy(tokenInfo, deployer)
```

將 KIP-37 代幣合約部署到 kaia 區塊鏈上。 使用 caver.kct.kip37.deploy 部署的合約是一種遵循 KIP-37 標準的不可篡改令牌。

成功部署後，將使用新的 KIP17 實例解決承諾問題。

**參數**

| 名稱        | 類型                 | 描述                                                                                                                                                                                                                                                                                         |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tokenInfo | object             | 在 kaia 區塊鏈上部署 KIP-37 代幣合約所需的信息。 詳見下表。                                                                                                                                                                                                                                                      |
| deployer  | string \\| object | 密鑰環實例中部署 KIP-37 代幣合約的地址。 該地址必須有足夠的 KAIA 才能部署。 詳情請參見 [Keyring](../caver-wallet/keyring.md#caver-wallet-keyring) 。 如果要定義發送事務時使用的字段，可以將對象類型作為參數傳遞。 如果要在部署 KIP-17 合約時使用費用委託，可以在對象中定義與費用委託相關的字段。 關於可在對象中定義的字段，請參閱 [創建]（#kip37-create）的參數說明。 |

tokenInfo 對象必須包含以下內容：

| 名稱  | 類型     | 描述                                                                                |
| --- | ------ | --------------------------------------------------------------------------------- |
| uri | string | 所有標記類型的 URI，依靠[標記類型 ID 替換機制](http://kips.klaytn.foundation/KIPs/kip-37#metadata)。 |

**返回價值**

PromiEvent\`：一個承諾組合事件發射器，用一個新的 KIP17 實例來解決。 此外，還可能發生以下事件：

| 名稱              | 類型     | 描述                                                                                                        |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| transactionHash | string | 在事務發送且事務哈希值可用後立即觸發。                                                                                       |
| receipt         | object | 當交易收據可用時觸發。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。 |
| error           | Error  | 發送過程中發生錯誤時觸發。                                                                                             |

**代幣註冊**

1. 要在區塊資源管理器上註冊代幣，合約創建者必須填寫一份提交申請表。 記下表格上所需的具體信息。

2. 智能合約環境

   - 編譯器類型固態

   - 編譯器版本：v0.8.4+commit.c7e474f2

   - 開源許可證類型：MIT

3. 智能合約詳情

   - 優化： --optimize-run 200

   - 源代碼：[KIP17 合約 Github 鏈接](https://github.com/kaiachain/caver-js/blob/dev/packages/caver-kct/src/kip37Token.sol)。

4. ABI 編碼值：[kip17JsonInterface at dev - kaiachain/caver-js - GitHub](https://github.com/kaiachain/caver-js/blob/dev/packages/caver-kct/src/kctHelper.js#L1329-L2374)

**示例**

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
caver.kct.kip37.detectInterface(contractAddress
```

返回代幣合約實現的接口信息。 此靜態函數將使用 [kip17.detectInterface](#kip17-detectinterface)。

**參數**

| 名稱              | 類型     | 描述             |
| --------------- | ------ | -------------- |
| contractAddress | string | KIP-37 代幣合約的地址 |

**返回價值**

Promise "會返回一個 "對象"，其中包含每個[KIP-37 接口](https://kips.kaia.io/KIPs/kip-37#kip-13-identifiers)是否已實現的布爾值結果。

**示例**

```javascript
> caver.kct.kip37.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## caver.kct.kip37.create <a id="caver-kct-kip37-create"></a>

```javascript
caver.kct.kip37.create([tokenAddress
```

創建新的 KIP17 實例及其綁定的方法和事件。 該功能與 [new KIP17]（#new-kip17）相同。

**注意** `caver.kct.kip37.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**參數**

請參見 [new KIP17]（#new-kip17）。

**返回價值**

請參見 [new KIP17]（#new-kip17）。

**示例**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = caver.kct.kip37.create()

// Create a KIP37 instance with a token address
> const kip37 = caver.kct.kip37.create('0x{address in hex}')
```

## 新 KIP17<a id="new-kip17"></a>

```javascript
new caver.kct.kip37([tokenAddress])
```

創建新的 KIP17 實例及其綁定的方法和事件。

**參數**

| 名稱           | 類型     | 描述                                                                                    |
| ------------ | ------ | ------------------------------------------------------------------------------------- |
| tokenAddress | string | (可選）KIP-37 代幣合約的地址，可稍後通過 `kip17.options.address = '0x1234...'` 指定。 |

**返回價值**

| 類型     | 描述                  |
| ------ | ------------------- |
| object | KIP17 實例及其綁定的方法和事件。 |

**示例**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = new caver.kct.kip37()

// Create a KIP37 instance with a token address
> const kip37 = new caver.kct.kip37('0x{address in hex}')
```

## kip17.clone<a id="kip17-clone"></a>

```javascript
kip17.clone([tokenAddress])
```

克隆當前 KIP17 實例。

**參數**

| 名稱           | 類型     | 描述                                                                   |
| ------------ | ------ | -------------------------------------------------------------------- |
| tokenAddress | string | (可選）部署另一個 KIP-17 代幣的智能合約地址。 如果省略，則將設置為原始實例中的合約地址。 |

**返回價值**

| 類型     | 描述              |
| ------ | --------------- |
| object | 原始 KIP17 實例的克隆。 |

**示例**

```javascript
> const kip37 = new caver.kct.kip37(address)

// Clone without a parameter
> const cloned = kip37.clone()

// Clone with the address of the new token contract
> const cloned = kip37.clone('0x{address in hex}')
```

## kip17.detectInterface<a id="kip17-detectinterface"></a>

```javascript
kip17.detectInterface()
```

返回代幣合約實現的接口信息。

**參數**

無

**返回價值**

Promise "會返回一個 "對象"，其中包含每個[KIP-37 接口](https://kips.kaia.io/KIPs/kip-37#kip-13-identifiers)是否已實現的布爾值結果。

**示例**

```javascript
> kip37.detectInterface().then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## kip17.supportsInterface<a id="kip17-supportsinterface"></a>

```javascript
kip17.supportsInterface(interfaceId)
```

如果此合約實現了由 `interfaceId` 定義的接口，則返回 `true`。

**參數**

| 名稱          | 類型     | 描述                |
| ----------- | ------ | ----------------- |
| interfaceId | string | 要檢查的 interfaceId。 |

**返回價值**

`Promise` 返回 `boolean`：如果此合約實現了由 "`interfaceId` 定義的接口，則返回 "true"。

**示例**

```javascript
> kip17.supportsInterface('0x80ac58cd').then(console.log)
true

> kip17.supportsInterface('0xa22cb465').then(console.log)
false
```

## kip17.burn<a id="kip17-burn"></a>

```javascript
kip37.uri(id)
```

返回給定標記的不同統一資源標識符 (URI)。

如果任何 URI 中存在字符串 `{id}`，該函數將用十六進制形式的實際代幣 ID 代替。
請參閱 [KIP-34 元數據](http://kips.klaytn.foundation/KIPs/kip-37#metadata)。

**參數**

| 名稱 | 類型                                | 描述              |
| -- | --------------------------------- | --------------- |
| id | BigNumber \\| string \\| number | 要獲取 uri 的代幣 ID。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `string`：代幣的名稱。

**示例**

```javascript
> kip37.uri('0x0').then(console.log)
'https://caver.example/0000000000000000000000000000000000000000000000000000000000000000.json'
```

## kip17.totalSupply<a id="kip17-totalsupply"></a>

```javascript
kip17.totalSupply()
```

返回特定代幣的總供應量。

**參數**

| 名稱 | 類型                                | 描述              |
| -- | --------------------------------- | --------------- |
| id | BigNumber \\| string \\| number | 通過代幣 ID 查看總供應量。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `BigNumber`：代幣總數。

**示例**

```javascript
> kip17.totalSupply().then(console.log)
10
```

## kip17.balanceOf<a id="kip17-balanceof"></a>

```javascript
kip37.balanceOf(account, id)
```

返回 `account` 擁有的代幣類型 `id` 的代幣數量。

**參數**

| 名稱      | 類型                                | 描述           |
| ------- | --------------------------------- | ------------ |
| account | string                            | 您要查看餘額的賬戶地址。 |
| id      | BigNumber \\| string \\| number | 要查看餘額的代幣 ID。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

Promise`返回`BigNumber\`：賬戶擁有的代幣數量。

**示例**

```javascript
> kip17.balanceOf('0x{address in hex}').then(console.log)
9
```

## kip17.balanceOf<a id="kip17-balanceof"></a>

```javascript
kip37.balanceOfBatch(accounts, ids)
```

返回多個賬戶/代幣對的餘額。 balanceOfBatch "是[balanceOf](#kip37-balanceof)的批處理操作，包含 "accounts "和 "ids "的數組長度必須相同。

**參數**

| 名稱      | 類型    | 描述              |
| ------- | ----- | --------------- |
| account | Array | 您要查看餘額的賬戶地址。    |
| ids     | Array | 要查看餘額的代幣 ID 數組。 |

**返回價值**

承諾 "返回 "數組"：多個賬戶/代幣對的餘額。

**示例**

```javascript
> kip37.balanceOfBatch(['0x{address in hex}', '0x{address in hex}'], [0, 1]).then(console.log)
[ 20, 30 ].
```

## kip17.isMinter<a id="kip17-isminter"></a>

```javascript
kip17.isMinter(address)
```

如果給定賬戶是可以暫停轉讓代幣的暫停者，則返回 `true`。

**參數**

| 名稱 | 類型     | 描述              |
| -- | ------ | --------------- |
| 地址 | string | 檢查是否擁有鑄幣權的賬戶地址。 |

**返回價值**

`Promise`  返回 \`boolean：如果賬戶是礦工，則返回 "true"。

**示例**

```javascript
> kip17.isMinter('0x{address in hex}').then(console.log)
true

> kip17.isMinter('0x{address in hex}').then(console.log)
false
```

## kip17.isPauser<a id="kip17-ispauser"></a>

```javascript
kip17.isPauser(address)
```

如果給定賬戶是可以暫停轉讓代幣的暫停者，則返回 `true`。

**參數**

| 名稱      | 類型     | 描述                         |
| ------- | ------ | -------------------------- |
| address | string | 要檢查的賬戶地址，以確定該賬戶是否有權暫停代幣轉賬。 |

**返回價值**

`Promise` 返回 \`boolean：如果賬戶是 pauser，則返回 "true"。

**示例**

```javascript
> kip17.isPauser('0x{address in hex}').then(console.log)
true

> kip17.isPauser('0x{address in hex}').then(console.log)
false
```

## kip17.paused<a id="kip17-paused"></a>

```javascript
kip17.paused()
```

返回代幣合約的交易（或特定代幣）是否暫停。

如果 id 參數未定義，則返回代幣合約的交易是否暫停。 如果定義了 id 參數，則返回特定代幣是否暫停。

**參數**

| 名稱 | 類型                                | 描述                                                                      |
| -- | --------------------------------- | ----------------------------------------------------------------------- |
| id | BigNumber \\| string \\| number | (可選）要檢查是否暫停的代幣 ID。 如果省略此參數，"paused "函數將返回合約是否處於暫停狀態。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `boolean`：如果合約暫停，則返回 `true`。

**示例**

```javascript
// without token id parameter
> kip37.paused().then(console.log)
true
> kip37.paused().then(console.log)
false

// with token id parameter
> kip37.paused(0).then(console.log)
true
> kip37.paused(1).then(console.log)
false
```

## kip17.isApprovedForAll<a id="kip17-isapprovedforall"></a>

```javascript
kip17.isApprovedForAll(owner, operator)
```

查詢給定所有者的操作員批准狀態。 如果操作員已獲得給定所有者的批准，則返回 `true`。

**參數**

| 名稱       | 類型     | 描述      |
| -------- | ------ | ------- |
| owner    | string | 所有者地址。  |
| operator | string | 操作員的地址。 |

**返回價值**

`Promise` 返回 `boolean`：如果操作符通過則返回 true，否則返回 false

**示例**

```javascript
> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false

> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true
```

## kip17.name<a id="kip17-name"></a>

```javascript
kip37.create(id, initialSupply [, uri] [, sendParam])
```

創建新的代幣類型，並將 `initialSupply` 分配給礦工。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱            | 類型                                | 描述                                    |
| ------------- | --------------------------------- | ------------------------------------- |
| id            | BigNumber \\| string \\| number | 要創建的代幣 ID。                            |
| initialSupply | Buffer \\| string \\| number    | 正在鑄造的代幣數量。                            |
| uri           | string                            | (可選）已創建標記的 URI。    |
| sendParam     | object                            | (可選）保存發送事務所需參數的對象。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

tokenInfo 對象必須包含以下內容：

| 名稱            | 類型                                        | 描述                                                                                                                                                                                                      |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | string                                    | (可選） 發送交易的地址。 如果省略，將由 `kip17.options.from` 設置。 如果未提供 `sendParam` 對象中的 `from` 或 `kip17.options.from`，則會發生錯誤。                                                                          |
| gas           | number \\| string                        | (可選）本次交易提供的最大 gas（gas 限值）。 如果省略，將由 caver-js 通過調用`kip17.methods.approve(spender, tokenId).estimateGas({from})`來設置。                                                                    |
| gasPrice      | number \\| string                        | (可選）本次交易使用的 Gas 價格（以 peb 為單位）。 如果省略，將由 caver-js 通過調用 `caver.klay.getGasPrice`來設置。                                                                                                    |
| value         | number \\| string \\| BN \\| BigNumber | (可選）以 peb 為單位傳輸的值。                                                                                                                                                                   |
| feeDelegation | boolean                                   | (可選，默認為 `false`）是否使用費用委託交易。 如果省略，將使用 \`kip17.options.feeDelegation'。 如果兩者都省略，則不使用收費授權。                                                               |
| feePayer      | string                                    | (可選）支付交易費的繳費人地址。 當 "feeDelegation "為 "true "時，該值將設置為交易中的 "feePayer "字段。 如果省略，將使用 \`kip17.options.feePayer'。 如果兩者都省略，則會出錯。                            |
| feeRatio      | string                                    | (可選）繳費人將承擔的交易費比例。 如果 "feeDelegation "為 "true"，且 "feeRatio "設置為有效值，則使用部分費用委託交易。 有效範圍為 1 到 99。 不允許比率為 0 或 100 及以上。 如果省略，將使用 \`kip17.options.feeRatio'。 |

**注意** `feeDelegation`、`feePayer` 和 `feeRatio`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip17.setApprovalForAll<a id="kip17-setApprovalforall"></a>

```javascript
kip17.setApprovalForAll(to, approved [, sendParam])
```

批准給定操作符 "轉 "或禁止給定操作符轉移所有者的所有代幣。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型      | 描述                                                                                                                                     |
| --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| operator  | string  | 批准/禁止轉讓所有者所有代幣的賬戶地址。                                                                                                                   |
| approved  | boolean | 如果 "true"，該操作符將被批准。 如果為 `false`，則不允許使用操作符。                                                                                             |
| sendParam | object  | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip17.safeTransferFrom<a id="kip17-safetransferfrom"></a>

```javascript
kip17.safeTransferFrom(from, to, tokenId [, data] [, sendParam])
```

安全地將特定代幣類型 "id "的給定 "金額 "代筆從 "發送方 "傳輸到 "接收方"。

授權發送代幣所有者代幣的地址（操作員）或代幣所有者本人將執行該代幣轉移交易。 因此，授權地址或令牌所有者應是該交易的發送方，其地址必須在 `sendParam.from` 或 `kip17Instance.options.from` 中給出。 除非同時提供 `sendParam.from` 和 `kip17Instance.options.from`，否則會發生錯誤。

如果 `to` 是合約地址，則必須執行 [IKIP17Receiver.onKIP17Received](https://kips.kaia.io/KIPs/kip-37#kip-37-token-receiver). 否則，轉賬將被撤銷。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型                                | 描述                                                                                                                                     |
| --------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| from      | string                            | 擁有要與津貼機制一起發送的代幣的賬戶地址。                                                                                                                  |
| recipient | string                            | 接收代幣的賬戶地址。                                                                                                                             |
| id        | BigNumber \\| string \\| number | 要傳輸的代幣 ID。                                                                                                                             |
| 數量        | Buffer \\| string \\| number    | 您要轉移的代幣的 ID。                                                                                                                           |
| data      | Buffer \\| string \\| number    | (可選）與呼叫一起發送的可選數據。                                                                                                   |
| sendParam | object                            | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip17.safeTransferFrom<a id="kip17-safetransferfrom"></a>

```javascript
kip17.safeTransferFrom(from, to, tokenId [, data] [, sendParam])
```

安全地批量傳輸多個令牌 id 和值，從 `from` 到 `recipient`。

授權發送代幣所有者代幣的地址（操作員）或代幣所有者本人將執行該代幣轉移交易。 因此，授權地址或令牌所有者應是該交易的發送方，其地址必須在 `sendParam.from` 或 `kip17Instance.options.from` 中給出。 除非同時提供 `sendParam.from` 和 `kip17Instance.options.from`，否則會發生錯誤。

如果 `to` 是合約地址，則必須執行 [IKIP17Receiver.onKIP17Received](https://kips.kaia.io/KIPs/kip-37#kip-37-token-receiver). 否則，轉賬將被撤銷。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型                             | 描述                                                                                                                                     |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| from      | string                         | 擁有要與津貼機制一起發送的代幣的賬戶地址。                                                                                                                  |
| recipient | string                         | 接收代幣的賬戶地址。                                                                                                                             |
| ids       | Array                          | 要查看餘額的代幣 ID 數組。                                                                                                                        |
| amounts   | Array                          | 一個數組，包含您要轉移的令牌金額。                                                                                                                      |
| data      | Buffer \\| string \\| number | (可選）與呼叫一起發送的可選數據。                                                                                                   |
| sendParam | object                         | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip17.clone<a id="kip17-clone"></a>

```javascript
kip37.mint(to, id, value [, sendParam])
```

根據變量 `to` 和 `value` 提取特定標記類型 `id` 的標記並分配標記。 通過 mint 函數，您可以將 `to` 和 `value` 數組作為參數傳遞給多個賬戶，從而一次向多個賬戶注入特定令牌。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型                             | 描述                                                                                                                                     |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| to        | string \\| Array              | 賬戶地址或地址數組，將向其發放鑄造的代幣。                                                                                                                  |
| id        | Buffer \\| string \\| number | 要創建的代幣 ID。                                                                                                                             |
| value     | Buffer \\| string \\| number | 正在鑄造的代幣數量。 如果向 `to` 參數傳送包含多個地址的數組，則必須以數組形式傳送值。                                                                                         |
| sendParam | object                         | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from` ，則應是具有 MinterRole 的礦工。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**Example**

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

## kip17.balanceOf<a id="kip17-balanceof"></a>

```javascript
kip37.mintBatch(to, ids, values [, sendParam])
```

在一個批次中為特定令牌類型 "ids "的多個 KIP-37 令牌造幣，並根據變量 "to "和 "values "分配令牌。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| to        | string | 將向其發行新幣的賬戶地址。                                                                                                                          |
| ids       | Array  | 要查看餘額的代幣 ID 數組。                                                                                                                        |
| value     | Array  | 一個代幣金額數組，表示要鑄造的代幣金額。                                                                                                                   |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from` ，則應是具有 MinterRole 的礦工。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP37 實例的收件具有通過 ABI 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip37.addMinter <a id="kip37-addminter"></a>

```javascript
kip37.addMinter(account [, sendParam])
```

添加一個允許鑄造代幣的礦工賬戶。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| account   | string | 要添加為礦工的賬戶地址。                                                                                                                           |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from` ，則應是礦工。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP37 實例的收件具有通過 ABI 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

放棄鑄造代幣的權利。 只有鑄幣廠地址可以放棄鑄幣權。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from` ，則應是具有 MinterRole 的礦工。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP37 實例的收件具有通過 ABI 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

銷燬特定的 KIP-37 令牌。

授權發送代幣所有者代幣的地址（操作員）或代幣所有者本人將執行該代幣轉移交易。 因此，授權地址或代幣所有者應是該交易的發送方，其地址必須在 `sendParam.from` 或 `kip17Instance.options.from` 中給出。 除非同時提供 `sendParam.from` 和 `kip17Instance.options.from`，否則會發生錯誤。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型                             | 描述                                                                                                                                     |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| account   | string                         | 要銷燬的代幣的賬戶地址。                                                                                                                           |
| id        | Buffer \\| string \\| number | 要銷燬的代幣的 ID。                                                                                                                            |
| value     | Buffer \\| string \\| number | 要銷燬的代幣數量。                                                                                                                              |
| sendParam | object                         | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意** `id` 和 `amount` 參數接受 `number` 類型，但如果輸入值超出 number.MAX_SAFE_INTEGER 的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip17.balanceOf<a id="kip17-balanceof"></a>

```javascript
kip37.mintBatch(to, ids, values [, sendParam])
```

燒燬多個 KIP-37 代幣。

授權發送代幣所有者代幣的地址（操作員）或代幣所有者本人將執行該代幣轉移交易。 因此，授權地址或令牌所有者應是該交易的發送方，其地址必須在 `sendParam.from` 或 `kip17Instance.options.from` 中給出。 除非同時提供 `sendParam.from` 和 `kip17Instance.options.from`，否則會發生錯誤。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| account   | string | 要銷燬的代幣的賬戶地址。                                                                                                                           |
| ids       | Array  | 要查看餘額的代幣 ID 數組。                                                                                                                        |
| value     | Array  | 一個代幣金額數組，表示要鑄造的代幣金額。                                                                                                                   |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip17.addPauser<a id="kip17-addpauser"></a>

```javascript
kip17.addPauser(account [, sendParam])
```

添加一個有權中止合約的暫停賬戶。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| account   | string | 將成為新暫停者的賬戶地址。                                                                                                                          |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from`，則應是具有 PauserRole 的暫停器。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip17.renouncePauser<a id="kip17-renouncepauser"></a>

```javascript
kip17.renouncePauser([sendParam])
```

放棄暫停合約的權利。 只有暫停地址可以放棄自己的暫停權。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                                                                                                     |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from`，則應是具有 PauserRole 的暫停器。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip17.paused<a id="kip17-paused"></a>

```javascript
kip17.pause([sendParam])
```

暫停與發送代幣相關的功能。 如果定義了 `id` 參數，則暫停特定標記。 否則暫停代幣合約。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型                             | 描述                                                                                                                                     |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| id        | Buffer \\| string \\| number | (可選）要暫停的代幣 ID。 如果省略此參數，"pause "函數將暫停令牌合約。                                                                           |
| sendParam | object                         | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from`，則應是具有 PauserRole 的暫停器。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip17.unpause<a id="kip17-unpause"></a>

```javascript
kip17.unpause([sendParam])
```

恢復已暫停的合約或特定代幣。 如果定義了 `id` 參數，則取消特定標記的暫停。 否則取消代幣合約的暫停。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱 | 類型                             | 描述                                                               |
| -- | ------------------------------ | ---------------------------------------------------------------- |
| id | Buffer \\| string \\| number | (可選）要取消暫停的代幣 ID。 如果省略此參數，"取消暫停 "函數將取消代幣合約的暫停。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from`，則應是具有 PauserRole 的暫停器。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP37 實例的收件具有通過 ABI 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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
