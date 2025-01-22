# caver.kct.kip17

caver.kct.kip17 "可幫助您在 kaia 區塊鏈上輕鬆處理以 JavaScript 對象形式實現 [KIP-17](https://kips.kaia.io/KIPs/kip-17) 的智能合約。

caver.kct.kip17 "繼承了[caver.contract](../caver.contract.md)，以實現 KIP-17 令牌合約。 caver.kct.kip17 "擁有與 "caver.contract "相同的屬性，但還有其他方法來實現額外的功能。 本節僅介紹 "caver.kct.kip17 "新增的綁定方法。

為 caver-js 實現 KIP-17 的代碼可在 [Kaia Contracts Github Repo](https://github.com/kaiachain/kaia-contracts/tree/master/contracts/KIP/token/KIP17) 上獲取。 用於 caver-js 的 KIP-17 支持 Ownable 接口。 使用此功能，您可以在部署合約時指定合約所有者

有關 KIP-17 的更多信息，請參閱 [Kaia 改進提案](https://kips.kaia.io/KIPs/kip-17)。

## caver.kct.kip17.deploy <a id="caver-klay-kip17-deploy"></a>

```javascript
caver.kct.kip17.deploy(tokenInfo, deployer)
```

將 KIP-17 代幣合約部署到 kaia 區塊鏈上。 使用 caver.kct.kip17.deploy 部署的合約是一種遵循 KIP-17 標準的不可篡改令牌。

成功部署後，將使用新的 KIP17 實例解決承諾問題。

**參數**

| 名稱        | 類型                 | 描述                                                                                                                                                                                                                                         |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tokenInfo | object             | 在 kaia 區塊鏈上部署 KIP-17 代幣合約所需的信息。 詳見下表。                                                                                                                                                                                                      |
| deployer  | string \\| object | 密鑰環實例中部署 KIP-17 令牌合約的地址。 該地址必須有足夠的 KAIA 才能部署。 詳情請參見 [Keyring](../caver-wallet/keyring.md#caver-wallet-keyring) 。 如果要定義發送事務時使用的字段，可以將對象類型作為參數傳遞。 如果要在部署 KIP-17 合同時使用費用委託，可以在對象中定義與費用委託相關的字段。 有關這些字段的使用，請參閱 [approve](#kip17-approve) 的參數說明。 |

tokenInfo 對象必須包含以下內容：

| 名稱     | 類型     | 描述   |
| ------ | ------ | ---- |
| name   | string | 代筆名稱 |
| symbol | string | 代筆符號 |

**回報價值**

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

   - 源代碼：[KIP17 合同 Github 鏈接](https://github.com/kaiachain/caver-js/blob/dev/packages/caver-kct/src/kip17Token.sol)。

4. ABI 編碼值：[kip17JsonInterface at dev - kaiachain/caver-js - GitHub](https://github.com/kaiachain/caver-js/blob/dev/packages/caver-kct/src/kctHelper.js#L408-L1319)

**示例**

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
caver.kct.kip17.detectInterface(contractAddress
```

返回代幣合約實現的接口信息。 此靜態函數將使用 [kip17.detectInterface](#kip17-detectinterface)。

**參數**

| 名稱              | 類型     | 描述            |
| --------------- | ------ | ------------- |
| contractAddress | string | KIP-7 代幣合約的地址 |

**返回價值**

Promise "會返回一個 "對象"，其中包含每個[KIP-17 接口](https://kips.kaia.io/KIPs/kip-17#kip-13-identifiers)是否已實現的布爾值結果。

**示例**

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
}
```

## caver.kct.kip17.create <a id="caver-kct-kip17-create"></a>

```javascript
caver.kct.kip17.create([tokenAddress
```

創建新的 KIP17 實例及其綁定的方法和事件。 該功能與 [new KIP17]（#new-kip17）相同。

**注意** `caver.kct.kip17.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**參數**

請參見 [new KIP17]（#new-kip17）。

**返回價值**

請參見 [new KIP17]（#new-kip17）。

**示例**

```javascript
// Create a KIP17 instance without a parameter
> const kip17 = caver.kct.kip17.create()

// Create a KIP17 instance with a token address
> const kip17 = caver.kct.kip17.create('0x{address in hex}')
```

## 新 KIP17<a id="new-kip17"></a>

```javascript
new caver.kct.kip17([tokenAddress])
```

創建新的 KIP17 實例及其綁定的方法和事件。

**參數**

| 名稱   | 類型     | 描述                                                                                    |
| ---- | ------ | ------------------------------------------------------------------------------------- |
| 代幣地址 | string | (可選）KIP-17 代幣合約的地址，可稍後通過 `kip17.options.address = '0x1234...'` 指定。 |

**返回價值**

| 類型 | 描述                  |
| -- | ------------------- |
| 對象 | KIP17 實例及其綁定的方法和事件。 |

**示例**

```javascript
// Create a KIP17 instance without a parameter
> const kip17 = new caver.kct.kip17()

// Create a KIP17 instance with a token address
> const kip17 = new caver.kct.kip17('0x{address in hex}')
```

## kip17.clone<a id="kip17-clone"></a>

```javascript
kip17.clone([tokenAddress])
```

克隆當前 KIP17 實例。

**參數**

| 名稱           | 類型     | 描述                                                                   |
| ------------ | ------ | -------------------------------------------------------------------- |
| tokenAddress | string | (可選）部署另一個 KIP-17 令牌的智能合約地址。 如果省略，則將設置為原始實例中的合同地址。 |

**返回價值**

| 類型     | 描述              |
| ------ | --------------- |
| object | 原始 KIP17 實例的克隆。 |

**Example**

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

返回代幣合約實現的接口信息。

**參數**

空

**返回價值**

Promise "會返回一個 "對象"，其中包含每個[KIP-17 接口](https://kips.kaia.io/KIPs/kip-17#kip-13-identifiers)是否已實現的布爾值結果。

**示例**

```javascript
> kip17.detectInterface().then(console.log)
{
	IKIP17: true,
	IKIP17Metadata: true,
	IKIP17Enumerable: true,
	IKIP17Mintable: true,
	IKIP17MetadataMintable: true,
	IKIP17Burnable: true,
	IKIP17Pausable: true,
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

## kip17.name<a id="kip17-name"></a>

```javascript
kip17.name()
```

返回代幣的名稱。

**參數**

空

**返回價值**

`Promise` 返回 `string`：代幣的名稱。

**示例**

```javascript
> kip17.name().then(console.log)
Jasmine
```

## kip17.symbol<a id="kip17-symbol"></a>

```javascript
kip17.symbol()
```

返回代幣的符號。

**參數**

空

**回報價值**

`Promise` 返回 `string`：標記的符號。

**示例**

```javascript
> kip17.symbol().then(console.log)
JAS
```

## kip17.totalSupply<a id="kip17-totalsupply"></a>

```javascript
kip17.totalSupply()
```

返回合約鑄造的代幣總數。

**參數**

空

**返回價值**

`Promise` 返回 `BigNumber`：代幣總數。

**示例**

```javascript
> kip17.totalSupply().then(console.log)
10
```

## kip17.tokenURI<a id="kip17-tokenuri"></a>

```javascript
kip17.tokenURI(tokenId)
```

返回給定標記 ID 的 URI。

**參數**

| 名稱      | 類型                                | 描述   |
| ------- | --------------------------------- | ---- |
| tokenId | BigNumber \\| string \\| number | 代幣ID |

**注意**\* "tokenId "參數接受 "數字 "類型，但如果輸入值超出 number.MAX_SAFE_INTEGER 的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `string`：給定標記的 URI。

**示例**

```javascript
> kip17.tokenURI(0).then(console.log)
https://kip17.example/uri-ex-caver.json
```

## kip17.tokenOfOwnerByIndex<a id="kip17-tokenofownerbyindex"></a>

```javascript
kip17.tokenOfOwnerByIndex(owner, index)
```

搜索 "所有者 "的代幣列表中的給定索引，如果匹配，則返回位於列表中匹配索引處的代幣的代幣 ID。

**參數**

| 名稱    | 類型                                | 描述              |
| ----- | --------------------------------- | --------------- |
| 所有者   | string                            | 擁有代幣的賬戶地址。      |
| index | BigNumber \\| string \\| number | 所有者代幣列表中令代幣的索引。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

Promise`返回`BigNumber\`：代幣的 id。

**示例**

```javascript
> kip17.tokenOfOwnerByIndex('0x{address in hex}', 5).then(console.log)
5
```

## kip17.tokenByIndex<a id="kip17-tokenbyindex"></a>

```javascript
kip17.tokenByIndex(index)
```

根據給定的索引搜索此合約中所有代幣的列表，如果匹配，則返回列表中匹配索引處的代幣 id。 如果索引大於或等於代幣總數，它就會還原。

**參數**

| 名稱    | 類型                                | 描述         |
| ----- | --------------------------------- | ---------- |
| index | BigNumber \\| string \\| number | 要查詢的標記的索引。 |

**注意** `index`參數接受`number`類型，但如果輸入值超出了number.MAX_SAFE_INTEGER的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

Promise`返回`BigNumber\`：代幣的 id。

**示例**

```javascript
> kip17.tokenByIndex(1).then(console.log)
1
```

## kip17.balanceOf<a id="kip17-balanceof"></a>

```javascript
kip17.balanceOf(address)
```

返回給定賬戶地址的餘額。 KIP-17 中賬戶的餘額是該賬戶擁有的 NFT（Non-Fungible Tokens）總數。

**參數**

| 名稱 | 類型     | 描述          |
| -- | ------ | ----------- |
| 地址 | string | 要查詢餘額的賬戶地址。 |

**返回價值**

`Promise` 返回 `BigNumber`：賬戶餘額。

**示例**

```javascript
> kip17.balanceOf('0x{address in hex}').then(console.log)
9
```

## kip17.ownerOf<a id="kip17-ownerof"></a>

```javascript
kip17.ownerOf(tokenId)
```

返回指定代幣id 所有者的地址。

**參數**

| 名稱      | 類型                                | 描述    |
| ------- | --------------------------------- | ----- |
| tokenId | BigNumber \\| string \\| number | 代幣的ID |

**注意**\* "tokenId "參數接受 "數字 "類型，但如果輸入值超出 number.MAX_SAFE_INTEGER 的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `string`：擁有給定代幣的賬戶的地址。

**示例**

```javascript
> kip17.ownerOf(8).then(console.log)
0x0e0E95426343d97CC7BB913C7D7DBea065A31814
```

## kip17.getApproved<a id="kip17-getapproved"></a>

```javascript
kip17.getApproved(tokenId)
```

返回獲准轉讓此代幣的地址，如果沒有地址獲准轉讓，則返回 "0 "地址。 如果給定的代幣 ID 不存在，它將返回。

**參數**

| 名稱      | 類型                                | 描述    |
| ------- | --------------------------------- | ----- |
| tokenId | BigNumber \\| string \\| number | 代幣的ID |

**注意**\* "tokenId "參數接受 "數字 "類型，但如果輸入值超出 number.MAX_SAFE_INTEGER 的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `string`：有權轉移給定代幣的賬戶地址。

**示例**

```javascript
// If an approved address exists
> kip17.getApproved(10).then(console.log)
0x23D8E9cae17b22d3DAC65b4F7D2C737C6A7b865d

// If no approved address exists
> kip17.getApproved(3).then(console.log)
0x000000000000000000000000000000000000000000000000
```

## kip17.isApprovedForAll<a id="kip17-isapprovedforall"></a>

```javascript
kip17.isApprovedForAll(owner, operator)
```

如果某個 "操作員 "獲准轉移屬於 "所有者 "的所有代幣，則返回 "true"。

**參數**

| 名稱  | 類型     | 描述                      |
| --- | ------ | ----------------------- |
| 所有者 | string | 擁有代幣並允許操作員發送其所有代幣的賬戶地址。 |
| 操作員 | string | 獲准代替所有者發送所有代幣的賬戶地址。     |

**返回價值**

`Promise` 返回 `boolean`:：如果  `operator` 獲准發送屬於 `owner` 的所有代幣，則返回 "true"。

**示例**

```javascript
> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false

> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true
```

## kip17.isMinter<a id="kip17-isminter"></a>

```javascript
kip17.isMinter(address)
```

如果給定賬戶是礦工，可以在當前合約中發行符合 KIP-17 標準的新代幣，則返回 `true`。

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

## kip17.paused<a id="kip17-paused"></a>

```javascript
kip17.paused()
```

如果合約暫停，則返回 `true`，否則返回 `false`。

**參數**

無

**返回價值**

`Promise` 返回 `boolean`：如果合約暫停，則返回 `true`。

**示例**

```javascript
> kip17.paused().then(console.log)
true

> kip17.paused().then(console.log)
false
```

## kip17.isPauser<a id="kip17-ispauser"></a>

```javascript
kip17.isPauser(address)
```

如果給定賬戶是可以暫停轉讓代幣的暫停者，則返回 `true`。

**參數**

| 名稱 | 類型     | 描述                         |
| -- | ------ | -------------------------- |
| 地址 | string | 要檢查的賬戶地址，以確定該賬戶是否有權暫停代幣轉賬。 |

**返回價值**

`Promise` 返回 \`boolean：如果賬戶是 pauser，則返回 "true"。

**示例**

```javascript
> kip17.isPauser('0x{address in hex}').then(console.log)
true

> kip17.isPauser('0x{address in hex}').then(console.log)
false
```

## kip17.approve<a id="kip17-approve"></a>

```javascript
kip17.approve(to, tokenId [, sendParam])
```

批准另一個地址傳輸給定代幣 ID 的代幣。 零地址表示沒有批准的地址。 每個令牌只能有一個核準地址。 此方法只允許代幣所有者或經批准的操作員調用。

請注意，此方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型                                | 描述                                         |
| --------- | --------------------------------- | ------------------------------------------ |
| to        | string                            | 代替所有者使用代幣的賬戶地址。                            |
| tokenId   | BigNumber \\| string \\| number | 允許支出人使用的代幣id。                              |
| sendParam | object                            | (可選）一個對象，包含用於發送事務的定義參數。 |

**注意**\* "tokenId "參數接受 "數字 "類型，但如果輸入值超出 number.MAX_SAFE_INTEGER 的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

tokenInfo 對象必須包含以下內容：

| 名稱       | 類型                                        | 描述                                                                                                                                                                                                      |
| -------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | string                                    | (可選） 發送交易的地址。 如果省略，將由 `kip17.options.from` 設置。 如果未提供 `sendParam` 對象中的 `from` 或 `kip17.options.from`，則會發生錯誤。                                                                          |
| gas      | number \\| string                        | (可選）本次交易提供的最大 gas（gas 限值）。 如果省略，將由 caver-js 通過調用`kip17.methods.approve(spender, tokenId).estimateGas({from})`來設置。                                                                    |
| gasPrice | number \\| string                        | (可選）本次交易使用的 Gas 價格（以 peb 為單位）。 如果省略，將由 caver-js 通過調用 `caver.klay.getGasPrice`來設置。                                                                                                    |
| value    | number \\| string \\| BN \\| BigNumber | (可選）以 peb 為單位傳輸的值。                                                                                                                                                                   |
| 收費授權     | boolean                                   | (可選，默認為 `false`）是否使用費用委託交易。 如果省略，將使用 \`kip17.options.feeDelegation'。 如果兩者都省略，則不使用收費授權。                                                               |
| feePayer | string                                    | (可選）支付交易費的繳費人地址。 當 "feeDelegation "為 "true "時，該值將設置為交易中的 "feePayer "字段。 如果省略，將使用 \`kip17.options.feePayer'。 如果兩者都省略，則會出錯。                            |
| feeRatio | string                                    | (可選）繳費人將承擔的交易費比例。 如果 "feeDelegation "為 "true"，且 "feeRatio "設置為有效值，則使用部分費用委託交易。 有效範圍為 1 到 99。 不允許比率為 0 或 100 及以上。 如果省略，將使用 \`kip17.options.feeRatio'。 |

**注意** `feeDelegation`、`feePayer` 和 `feeRatio`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

批准給定操作符 "轉 "或禁止給定操作符轉移所有者的所有代幣。

請注意，setApprovalForAll 方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型      | 描述                                                              |
| --------- | ------- | --------------------------------------------------------------- |
| to        | string  | 批准/禁止轉讓所有者所有代幣的賬戶地址。                                            |
| approved  | Boolean | 如果 "true"，該操作符將被批准。 如果為 `false`，則不允許使用操作符。                      |
| sendParam | object  | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

將給定代幣 ID "tokenId "的代幣從代幣所有者的餘額轉移到另一個地址。 授權發送代幣所有者代幣的地址（操作員）或令牌所有者本人將執行該令牌轉移交易。 因此，授權賬戶或代幣所有者應是該交易的發送方，其地址必須在 `sendParam.from` 或 `kip17Instance.options.from` 中給出。 除非同時提供 `sendParam.from` 和 `kip17Instance.options.from`，否則會發生錯誤。 建議儘可能使用 [safeTransferFrom](#kip17-safetransferfrom) 代替此方法。

請注意，發送此交易將向交易發送方收取交易費。

**參數**

| 名稱        | 類型                                | 描述                                                              |
| --------- | --------------------------------- | --------------------------------------------------------------- |
| from      | string                            | 指定代幣所有者或經批准的操作者的地址。                                             |
| to        | string                            | 接收代幣的賬戶地址。                                                      |
| tokenId   | BigNumber \\| string \\| number | 您要轉移的代幣的 ID。                                                    |
| sendParam | object                            | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* "tokenId "參數接受 "數字 "類型，但如果輸入值超出 number.MAX_SAFE_INTEGER 的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

將給定代幣 id `tokenId` 的令牌從代幣所有者的餘額安全轉移到另一個地址。 授權發送代幣所有者代幣的地址（操作員）或代幣所有者本人將執行該代幣轉移交易。 因此，授權地址或代幣所有者應是該交易的發送方，其地址必須在 `sendParam.from` 或 `kip17Instance.options.from` 中給出。 除非同時提供 `sendParam.from` 和 `kip17Instance.options.from`，否則會發生錯誤。

如果 `to` 是合約地址，則必須執行 [IKIP17Receiver.onKIP17Received](https://kips.kaia.io/KIPs/kip-17#wallet-interface). 否則，轉賬將被撤銷。

請注意，發送此交易將向交易發送方收取交易費。

**參數**

| 名稱        | 類型                                | 描述                                                              |
| --------- | --------------------------------- | --------------------------------------------------------------- |
| from      | string                            | 指定代幣所有者或經批准的操作者的地址。                                             |
| to        | string                            | 接收代幣的賬戶地址。                                                      |
| tokenId   | BigNumber \\| string \\| number | 您要轉移的代幣的 ID。                                                    |
| data      | Buffer \\| string \\| number    | (可選）與呼叫一起發送的可選數據。                            |
| sendParam | object                            | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* "tokenId "參數接受 "數字 "類型，但如果輸入值超出 number.MAX_SAFE_INTEGER 的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

添加一個允許鑄造代幣的礦工賬戶。

請注意，addMinter 方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送者收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                              |
| --------- | ------ | --------------------------------------------------------------- |
| account   | string | 要添加為礦工的賬戶地址。                                                    |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from` ，則應是礦工。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

放棄鑄造代幣的權利。 只有鑄幣廠地址可以放棄鑄幣權。

請注意，renounceMinter 方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                              |
| --------- | ------ | --------------------------------------------------------------- |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

如果給出了 `sendParam.from` 或 `kip17.options.from` ，則應是具有 MinterRole 的礦工。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

使用給定的 uri 創建代幣，並將其分配給給定的賬戶。 這種方法可以增加該代幣的總供應量。

請注意，mintWithTokenURI 方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送者收取交易費用。

**參數**

| 名稱        | 類型                                | 描述                                                              |
| --------- | --------------------------------- | --------------------------------------------------------------- |
| to        | string                            | 將向其發行新幣的賬戶地址。                                                   |
| tokenId   | BigNumber \\| string \\| number | 要鑄造的代幣的 ID。                                                     |
| tokenURI  | string                            | 要鑄幣的代幣的 uri 字符串。                                                |
| sendParam | object                            | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* "tokenId "參數接受 "數字 "類型，但如果輸入值超出 number.MAX_SAFE_INTEGER 的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from` ，則應是具有 MinterRole 的礦工。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

## kip17.burn<a id="kip17-burn"></a>

```javascript
kip17.burn(tokenId [, sendParam])
```

銷燬給定代幣 id 的代幣。 如果不提供 `sendParam.from` 或 `kip17.options.from`，就會發生錯誤。

請注意，"銷燬 "方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送者收取交易費。

**參數**

| 名稱        | 類型                                | 描述                                                              |
| --------- | --------------------------------- | --------------------------------------------------------------- |
| tokenId   | BigNumber \\| string \\| number | 要銷燬的代幣的 ID。                                                     |
| sendParam | object                            | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* "tokenId "參數接受 "數字 "類型，但如果輸入值超出 number.MAX_SAFE_INTEGER 的範圍，可能會導致意外結果或錯誤。 在這種情況下，建議使用 `BigNumber` 類型，特別是對於 `uint256` 大小的數值輸入值。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

暫停與發送代幣相關的功能。

請注意，暫停方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送者收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                              |
| --------- | ------ | --------------------------------------------------------------- |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from`，則應是具有 PauserRole 的暫停器。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt] 的說明。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

恢復已暫停的合同。

請注意，取消暫停方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送方收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                              |
| --------- | ------ | --------------------------------------------------------------- |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from`，則應是具有 PauserRole 的暫停器。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

添加一個有權中止合同的暫停賬戶。

請注意，addPauser 方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送者收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                              |
| --------- | ------ | --------------------------------------------------------------- |
| account   | string | 將成為新暫停者的賬戶地址。                                                   |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from`，則應是具有 PauserRole 的暫停器。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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

放棄暫停合約的權利。 只有暫停地址可以放棄自己的暫停權。

請注意，renouncePauser 方法將向 kaia 網絡提交交易，而 kaia 網絡將向發送者收取交易費。

**參數**

| 名稱        | 類型     | 描述                                                              |
| --------- | ------ | --------------------------------------------------------------- |
| sendParam | object | (可選）一個對象，包含用於發送事務的定義參數。 有關 sendParam 的更多信息，請參閱 [approve] 的參數說明。 |

**注意**\* 如果給出了 `sendParam.from` 或 `kip17.options.from`，則應是具有 PauserRole 的暫停器。

**返回價值**

`Promise` 返回 `object` - 包含事務執行結果的收據。 如果您想了解收據對象內部的屬性，請參閱 [getTransactionReceipt]。 來自 KIP17 實例的收據有一個通過 abi 解析的 "事件 "屬性，而不是 "日誌 "屬性。

**示例**

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
[approve]: kip17.approve
