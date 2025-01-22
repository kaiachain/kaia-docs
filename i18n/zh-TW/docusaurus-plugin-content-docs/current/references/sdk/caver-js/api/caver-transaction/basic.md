---
sidebar_label: 基本
---

# 基本類型交易類

## LegacyTransaction <a id="legacytransaction"></a>

```javascript
caver.transaction.legacyTransaction.create(transactionObject)
```

`LegacyTransaction` represents a [legacy transaction](../../../../../learn/transactions/basic.md#txtypelegacytransaction). kaiaaccount]\(.../.../.../.../.../learn/accounts.md#klaytn-accounts)只能通過[AccountKeyLegacy]執行 "LegacyTransaction"。 transactionObject "可以具有以下屬性，以創建 "LegacyTransaction"。

LegacyTransaction\` 的成員變量屬性如下。 標記為 "可選 "的屬性是指用戶創建 "LegacyTransaction "時可在 "transactionObject "中選擇給出的屬性。

:::note

注意：您可以從 RLP 編碼的字符串中創建一個 `LegacyTransaction` 實例。 請參考下面的示例。
**注意** `caver.transaction.legacyTransaction.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

注意：從 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 開始，只支持使用 `create` 函數創建事務。 如果您一直使用類似 `new caver.transaction.legacyTransaction({...})` 的構造函數創建事務，請將其更改為 `caver.transaction.legacyTransaction.create({...})` 。

:::

**屬性**

| 名稱         | 類型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gas        | 字符串 | 交易允許使用的最高交易費金額。                                                                                                                                                                      |
| value      | 字符串 | (可選，默認值：`'0x0'`）要傳輸的 KAIA 數量，單位為 peb。 您可以使用 `caver.utils.toPeb`。                                                                                                  |
| from       | 字符串 | (可選）發件人地址。 如果省略，將設置用於簽名的鑰匙圈地址。                                                                                                                                    |
| to         | 字符串 | (可選，默認：`'0x'`）接收轉賬金額的賬戶地址，如果是執行智能合約的傳統交易，則為智能聯繫人地址。 如果傳統交易部署了智能合約，則無需定義 `to`。                                                                                     |
| input      | 字符串 | (可選）交易附加數據，用於智能合約部署/執行。                                                                                                                                           |
| signatures | 數組  | (可選）簽名數組。 傳統交易只能有一個簽名。                                                                                                                                            |
| nonce      | 字符串 | (可選）用於唯一標識發件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 將用於設置 nonce。 |
| gasPrice   | 字符串 | (可選）一個乘數，用於計算發件人將支付多少代幣。 如果省略，將使用 `caver.rpc.klay.getGasPrice`設置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可選）kaia 網絡的鏈 id。 如果省略，將使用 `caver.rpc.klay.getChainId`設置 chainId。                                                                                                 |

**示例**

```javascript
// Create a legacyTransaction for sending KAIA
> caver.transaction.legacyTransaction.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Create a legacyTransaction to deploy smart contract
> caver.transaction.legacyTransaction.create({
    input: '0x60806...',
    gas: 200000,
})

// Create a legacyTransaction to execute smart contract
> caver.transaction.legacyTransaction.create({
    to: '0xfe6c9118e56a42cbc77aa3b7ee586455e3dc5b6d', // Smart contact address
    input: '0xa9059...',
    gas: 200000,
})

// Create a legacyTransaction from RLP-encoded string
> caver.transaction.legacyTransaction.create('0xf8668204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a843132333425a0b2a5a15550ec298dc7dddde3774429ed75f864c82caeb5ee24399649ad731be9a029da1014d16f2011b3307f7bbe1035b6e699a4204fc416c763def6cefd976567')
LegacyTransaction {
    _type: 'TxTypeLegacyTransaction',
    _from: '0x',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: SignatureData { _v: '0x25', _r: '0xb2a5a...', _s:  '0x29da1...' },
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _input: '0x31323334',
    _value: '0xa'
}
```

## ValueTransfer <a id="valuetransfer"></a>

```javascript
caver.transaction.valueTransfer.create(transactionObject)
```

`ValueTransfer` represents a [value transfer transaction](../../../../../learn/transactions/basic.md#txtypevaluetransfer). transactionObject "可以具有以下屬性，以創建 "ValueTransfer "事務。

`ValueTransfer` 的成員變量屬性如下。 標記為 "可選 "的屬性是指當用戶創建 "ValueTransfer "事務時，可以在 "transactionObject "中選擇給出的屬性。

:::note

注意：您可以從 RLP 編碼的字符串中創建一個 `ValueTransfer` 實例。 請參考下面的示例。
注意：從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持 `caver.transaction.valueTransfer.create`。

注意：從 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 開始，只支持使用 `create` 函數創建事務。 如果您一直使用類似 `new caver.transaction.valueTransfer({...})` 的構造函數創建事務，請將其更改為 `caver.transaction.valueTransfer.create({...})`。

:::

**屬性**

| 名稱         | 類型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value      | 字符串 | 以 peb 為單位的 KAIA 轉賬金額。 您可以使用 `caver.utils.toPeb`。                                                                                                                                     |
| from       | 字符串 | 發件人地址。                                                                                                                                                                               |
| to         | 字符串 | 接收轉賬金額的賬戶地址。                                                                                                                                                                         |
| gas        | 字符串 | 交易允許使用的最高交易費金額。                                                                                                                                                                      |
| signatures | 數組  | (可選）簽名數組。                                                                                                                                                         |
| nonce      | 字符串 | (可選）用於唯一標識發件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 將用於設置 nonce。 |
| gasPrice   | 字符串 | (可選）一個乘數，用於計算發件人將支付多少代幣。 如果省略，將使用 `caver.rpc.klay.getGasPrice`設置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可選）kaia 網絡的鏈 id。 如果省略，將使用 `caver.rpc.klay.getChainId`設置 chainId。                                                                                                 |

**示例**

```javascript
// Create a valueTransfer
> caver.transaction.valueTransfer.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Create a valueTransfer from RLP-encoded string
> caver.transaction.valueTransfer.create('0x08f87f3a8505d21dba0083015f90948723590d5d60e35f7ce0db5c09d3938b26ff80ae01947d0104ac150f749d36bb34999bcade9f2c0bd2e6f847f845820feaa03d820b27d0997baf16f98df01c7b2b2e9734ad05b2228c4d403c2facff8397f3a01f4a44eeb8b7f0b0019162d1d6b90c401078e56fcd7495e74f7cfcd37e25f017')
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0x7d0104ac150f749d36bb34999bcade9f2c0bd2e6',
    _gas: '0x15f90',
    _nonce: '0x3a',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x3d820...', _s: '0x1f4a4...' } ],
    _to: '0x8723590d5d60e35f7ce0db5c09d3938b26ff80ae',
    _value: '0x1'
}
```

## ValueTransferMemo <a id="valuetransfermemo"></a>

```javascript
caver.transaction.valueTransferMemo.create(transactionObject)
```

ValueTransferMemo "代表一個[價值轉移備忘錄事務]（.../.../.../.../.../learn/transactions/basic.md#txtypevaluetransfermemo）。 transactionObject "可以具有以下屬性，以創建一個 "ValueTransferMemo "事務。

`ValueTransferMemo` 的成員變量屬性如下。 標記為 "可選 "的屬性是指當用戶創建 "ValueTransferMemo "事務時，可選擇在 "transactionObject "中給出的屬性。

:::note

注意：您可以通過 RLP 編碼字符串創建 `ValueTransferMemo` 實例。 請參考下面的示例。
注意：`caver.transaction.valueTransferMemo.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

注意：從 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 開始，只支持使用 `create` 函數創建事務。 如果您一直使用類似 `new caver.transaction.valueTransferMemo({...})` 的構造函數創建事務，請將其更改為 `caver.transaction.valueTransferMemo.create({...})`。

:::

**屬性**

| 名稱         | 類型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value      | 字符串 | 以 peb 為單位的 KAIA 轉賬金額。 您可以使用 `caver.utils.toPeb`。                                                                                                                                     |
| from       | 字符串 | 發件人地址。                                                                                                                                                                               |
| to         | 字符串 | 接收轉賬金額的賬戶地址。                                                                                                                                                                         |
| input      | 字符串 | 交易附帶的數據。 信息應傳遞給此屬性。                                                                                                                                                                  |
| gas        | 字符串 | 交易允許使用的最高交易費金額。                                                                                                                                                                      |
| signatures | 數組  | (可選）簽名數組。                                                                                                                                                         |
| nonce      | 字符串 | (可選）用於唯一標識發件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 將用於設置 nonce。 |
| gasPrice   | 字符串 | (可選）一個乘數，用於計算發件人將支付多少代幣。 如果省略，將使用 `caver.rpc.klay.getGasPrice`設置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可選）kaia 網絡的鏈 id。 如果省略，將使用 `caver.rpc.klay.getChainId`設置 chainId。                                                                                                 |

**示例**

```javascript
// Create a valueTransferMemo
> caver.transaction.valueTransferMemo.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
})

// Create a valueTransferMemo from RLP-encoded string
> caver.transaction.valueTransferMemo.create('0x10f8808204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84325a07d2b0c89ee8afa502b3186413983bfe9a31c5776f4f820210cffe44a7d568d1ca02b1cbd587c73b0f54969f6b76ef2fd95cea0c1bb79256a75df9da696278509f3')
ValueTransferMemo {
    _type: 'TxTypeValueTransferMemo',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x7d2b0...', _s: '0x2b1cb...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## AccountUpdate <a id="accountupdate"></a>

```javascript
caver.transaction.accountUpdate.create(transactionObject)
```

`AccountUpdate` represents a [account update transaction](../../../../../learn/transactions/basic.md#txtypeaccountupdate). 事務對象 "可以具有以下屬性，以創建 "賬戶更新 "事務。

`AccountUpdate` 的成員變量屬性如下。 標記為 "可選 "的屬性是指當用戶創建 "賬戶更新 "事務時，可在 "事務對象 "中選擇給出的屬性。

:::note

注意：您可以通過 RLP 編碼字符串創建 `AccountUpdate` 實例。 請參考下面的示例。
注意：從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持 `caver.transaction.accountUpdate.create`。

注意：從 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 開始，只支持使用 `create` 函數創建事務。 如果您一直使用 `new caver.transaction.accountUpdate({...})`這樣的構造函數創建事務，請將其更改為 `caver.transaction.accountUpdate.create({...})`。

:::

**屬性**

| 名稱         | 類型    | 描述                                                                                                                                                                                   |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from       | 字符串   | 發件人地址。                                                                                                                                                                               |
| account    | \[賬戶] | 包含更新賬戶所需信息的 \[賬戶] 實例。                                                                                                                                                                |
| gas        | 字符串   | 交易允許使用的最高交易費金額。                                                                                                                                                                      |
| signatures | 數組    | (可選）簽名數組。                                                                                                                                                         |
| nonce      | 字符串   | (可選）用於唯一標識發件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 將用於設置 nonce。 |
| gasPrice   | 字符串   | (可選）一個乘數，用於計算發件人將支付多少代幣。 如果省略，將使用 `caver.rpc.klay.getGasPrice`設置 gasPrice。                                                                                        |
| chainId    | 字符串   | (可選）kaia 網絡的鏈 id。 如果省略，將使用 `caver.rpc.klay.getChainId`設置 chainId。                                                                                                 |

關於如何為每個 "賬戶密鑰 "創建一個\[賬戶]實例，請參閱[入門-賬戶更新](.../../get-started.md#account-update)或[caver.account.create](.../caver.account.md#caver-account-create)。

**示例**

```javascript
// Create a accountUpdate
> caver.transaction.accountUpdate.create({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
})

// Create a accountUpdate from RLP-encoded string
> caver.transaction.accountUpdate.create('0x20f88d808505d21dba0083030d4094ffb52bc54635f840013e142ebe7c06c9c91c1625a302a102c93fcbdb2b9dbef8ee5c4748ffdce11f1f5b06d7ba71cc2b7699e38be7698d1ef847f845820fe9a09c2ca281e94567846acbeef724b1a7a5f882d581aff9984755abd92272592b8ea0344fd23d7774ae9c227809bb579387dfcd69e74ae2fe3a788617f54a4001e5ab')
AccountUpdate {
    _type: 'TxTypeAccountUpdate',
    _from: '0xffb52bc54635f840013e142ebe7c06c9c91c1625',
    _gas: '0x30d40',
    _nonce: '0x0',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x9c2ca...', _s: '0x344fd...' } ],
    _account: Account {
        _address: '0xffb52bc54635f840013e142ebe7c06c9c91c1625',
        _accountKey: AccountKeyPublic { _publicKey: '0x02c93...' } 
    }
}
```

## SmartContractDeploy <a id="smartcontractdeploy"></a>

```javascript
caver.transaction.smartContractDeploy.create(transactionObject)
```

SmartContractDeploy "代表一個[智能合約部署事務]（.../.../.../.../.../learn/transactions/basic.md#txtypesmartcontractdeploy）。 事務對象 "可以具有以下屬性，以創建 "SmartContractDeploy "事務。

`SmartContractDeploy` 的成員變量屬性如下。 標記為 "可選 "的屬性指的是用戶創建 "SmartContractDeploy "事務時可在 "transactionObject "中選擇給出的屬性。

:::note

注意： 您可以通過 RLP 編碼字符串創建 `SmartContractDeploy` 實例。 請參考下面的示例。
注意：從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持 `caver.transaction.smartContractDeploy.create`。

注意：從 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 開始，只支持使用 `create` 函數創建事務。 如果您一直使用類似 `new caver.transaction.smartContractDeploy({...})` 的構造函數創建事務，請將其更改為 `caver.transaction.smartContractDeploy.create({...})`。

:::

**屬性**

| 名稱            | Type | 描述                                                                                                                                                                                   |
| ------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from          | 字符串  | 發件人地址。                                                                                                                                                                               |
| input         | 字符串  | 交易附帶的數據。 要部署的智能合約的字節碼及其參數。 您可以通過 [caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy)獲取。                                           |
| gas           | 字符串  | 交易允許使用的最高交易費金額。                                                                                                                                                                      |
| value         | 字符串  | (可選，默認：`'0x0'`）合約初始化時，將轉入並存儲在智能合約地址餘額中的 KAIA 金額（單位：peb）。 您可以使用 `caver.utils.toPeb`。                                                                               |
| to            | 字符串  | (可選，默認：`'0x'`）智能合約的部署地址。 目前，該值無法定義。 今後將支持指定地址。                                                                                                                    |
| humanReadable | 布爾值  | (可選，默認為 `false`）由於目前還不支持人類可讀地址，因此必須為 false。                                                                                                                       |
| codeFormat    | 字符串  | (可選，默認：`'EVM'`）智能合約代碼的編碼格式。 目前僅支持 EVM 值。 賦值後，該值將轉換為十六進制字符串（例如，`EVM` 將轉換為`0x0`）。                                                                                   |
| signatures    | 數組   | (可選）簽名數組。                                                                                                                                                         |
| nonce         | 字符串  | (可選）用於唯一標識發件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 將用於設置 nonce。 |
| gasPrice      | 字符串  | (可選）一個乘數，用於計算發件人將支付多少代幣。 如果省略，將使用 `caver.rpc.klay.getGasPrice`設置 gasPrice。                                                                                        |
| chainId       | 字符串  | (可選）kaia 網絡的鏈 id。 如果省略，將使用 `caver.rpc.klay.getChainId`設置 chainId。                                                                                                 |

**示例**

```javascript
// Create a smartContractDeploy
> caver.transaction.smartContractDeploy.create({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
})

// Create a smartContractDeploy from RLP-encoded string
> caver.transaction.smartContractDeploy.create('0x28f9027e1f8505d21dba00830dbba0808094d91aec35bea25d379e49cfe2dff5f5775cdac1a3b9020e60806040526000805534801561001457600080fd5b506101ea806100246000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461007257806342cbb15c1461009d578063767800de146100c8578063b22636271461011f578063d14e62b814610150575b600080fd5b34801561007e57600080fd5b5061008761017d565b6040518082815260200191505060405180910390f35b3480156100a957600080fd5b506100b2610183565b6040518082815260200191505060405180910390f35b3480156100d457600080fd5b506100dd61018b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561012b57600080fd5b5061014e60048036038101908080356000191690602001909291905050506101b1565b005b34801561015c57600080fd5b5061017b600480360381019080803590602001909291905050506101b4565b005b60005481565b600043905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b50565b80600081905550505600a165627a7a7230582053c65686a3571c517e2cf4f741d842e5ee6aa665c96ce70f46f9a594794f11eb00298080f847f845820fe9a0018a9f680a74e275f1f83a5c2c45e1313c52432df4595e944240b1511a4f4ba7a02d762c3417f91b81db4907db832cb28cc64df7dca3ea9be64899ab3f4812f016')
SmartContractDeploy {
    _type: 'TxTypeSmartContractDeploy',
    _from: '0xd91aec35bea25d379e49cfe2dff5f5775cdac1a3',
    _gas: '0xdbba0',
    _nonce: '0x1f',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x018a9...', _s: '0x2d762...' } ],
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## SmartContractExecution <a id="smartcontractexecution"></a>

```javascript
caver.transaction.smartContractExecution.create(transactionObject)
```

SmartContractExecution "代表一個[智能合約執行事務]（.../.../.../.../.../learn/transactions/basic.md#txtypesmartcontractexecution）。 事務對象 "可以具有以下屬性，以創建 "智能合約執行 "事務。

SmartContractExecution\` 的成員變量屬性如下。 標記為 "可選 "的屬性指的是用戶創建 "SmartContractExecution "事務時可在 "transactionObject "中選擇給出的屬性。

:::note

注意： 您可以通過 RLP 編碼字符串創建 `SmartContractExecution` 實例。 請參考下面的示例。
注意：`caver.transaction.smartContractExecution.create`從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持。

注意：從 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 開始，只支持使用 `create` 函數創建事務。 如果您一直使用 `new caver.transaction.smartContractExecution({...})`之類的構造函數創建事務，請將其更改為 `caver.transaction.smartContractExecution.create({...})`。

:::

**屬性**

| 名稱         | 類型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from       | 字符串 | 發件人地址。                                                                                                                                                                               |
| to         | 字符串 | 要執行的智能合約賬戶的地址。                                                                                                                                                                       |
| input      | 字符串 | 附屬於事務的數據，用於執行事務。 輸入是一個編碼字符串，表示要調用的函數和要傳遞給該函數的參數。 您可以通過 [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall)獲取。                         |
| gas        | 字符串 | 交易允許使用的最高交易費金額。                                                                                                                                                                      |
| value      | 字符串 | (可選，默認值：`'0x0'`）要傳輸的 KAIA 數量，單位為 peb。 您可以使用 `caver.utils.toPeb`。                                                                                                  |
| signatures | 數組  | (可選）簽名數組。                                                                                                                                                         |
| nonce      | 字符串 | (可選）用於唯一標識發件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 將用於設置 nonce。 |
| gasPrice   | 字符串 | (可選）一個乘數，用於計算發件人將支付多少代幣。 如果省略，將使用 `caver.rpc.klay.getGasPrice`設置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可選）kaia 網絡的鏈 id。 如果省略，將使用 `caver.rpc.klay.getChainId`設置 chainId。                                                                                                 |

**示例**

```javascript
// Create a smartContractExecution
> caver.transaction.smartContractExecution.create({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
})

// Create a smartContractExecution from RLP-encoded string
> caver.transaction.smartContractExecution.create('0x30f8c5038505d21dba00830dbba094e3cd4e1cd287235cc0ea48c9fd02978533f5ec2b80946b604e77c0fbebb5b2941bcde3ab5eb09d99ad24b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f847f845820feaa066e1650b5779f152489633f343581c07938f8b2fc92c919d4dd7c7295d0beacea067b0b79383dbcd42a3aa8ebb1aa4bcb1fc0623ef9e97bc1e9b82d96fe37b5881')
SmartContractExecution {
    _type: 'TxTypeSmartContractExecution',
    _from: '0x6b604e77c0fbebb5b2941bcde3ab5eb09d99ad24',
    _gas: '0xdbba0',
    _nonce: '0x3',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x66e16...', _s: '0x67b0b...' } ],
    _to: '0xe3cd4e1cd287235cc0ea48c9fd02978533f5ec2b',
    _value: '0x0',
    _input: '0xa9059...'
}
```

## Cancel <a id="cancel"></a>

```javascript
caver.transaction.cancel.create(transactionObject)
```

`Cancel` represents a [cancel transaction](../../../../../learn/transactions/basic.md#txtypecancel). 事務對象 "可以具有以下屬性，以創建 "取消 "事務。

Cancel "事務會取消事務池中具有相同 nonce 的事務的執行。

取消 "的成員變量具有以下屬性。 標記為 "可選 "的屬性是指當用戶創建 "取消 "事務時，可在 "事務對象 "中選擇給出的屬性。

:::note

注意：您可以從 RLP 編碼的字符串中創建一個 `Cancel` 實例。 請參考下面的示例。
注意：從 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 開始支持 `caver.transaction.cancel.create`。

注意：從 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 開始，只支持使用 `create` 函數創建事務。 如果您一直使用類似 `new caver.transaction.xcancelxx({...})` 的構造函數創建事務，請將其更改為 `caver.transaction.cancel.create({...})`。

:::

**屬性**

| Name       | 類型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from       | 字符串 | 發件人地址。                                                                                                                                                                               |
| gas        | 字符串 | 交易允許使用的最高交易費金額。                                                                                                                                                                      |
| nonce      | 字符串 | (可選）用於唯一標識發件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 將用於設置 nonce。 |
| signatures | 數組  | (可選）簽名數組。                                                                                                                                                         |
| gasPrice   | 字符串 | (可選）一個乘數，用於計算發件人將支付多少代幣。 如果省略，將使用 `caver.rpc.klay.getGasPrice`設置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可選）kaia 網絡的鏈 id。 如果省略，將使用 `caver.rpc.klay.getChainId`設置 chainId。                                                                                                 |

**示例**

```javascript
// Create a cancel
> caver.transaction.cancel.create({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
})

// Create a cancel from RLP-encoded string
> caver.transaction.cancel.create('0x38f869068505d21dba00830dbba0946b604e77c0fbebb5b2941bcde3ab5eb09d99ad24f847f845820feaa0d9994ef507951a59380309f656ee8ed685becdc89b1d1a0eb1d2f72683ae14d3a07ad5d37a89781f294fab72b254ea9266e4d039ae163db4a4c4752f1fabff023b')
Cancel {
    _type: 'TxTypeCancel',
    _from: '0x6b604e77c0fbebb5b2941bcde3ab5eb09d99ad24',
    _gas: '0xdbba0',
    _nonce: '0x6',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0xd9994...', _s: '0x7ad5d...' } ]
}
```

## 鏈式數據分析 <a id="chaindataanchoring"></a>

```javascript
caver.transaction.chainDataAnchoring.create(transactionObject)
```

`ChainDataAnchoring` represents a [chain data anchoring transaction](../../../../../learn/transactions/basic.md#txtypechaindataanchoring). 事務對象 "可以具有以下屬性，以創建 "ChainDataAnchoring "事務。

ChainDataAnchoring\` 的成員變量屬性如下。 標記為 "可選 "的屬性是指用戶創建 "ChainDataAnchoring "事務時，可在 "transactionObject "中選擇給出的屬性。

:::note

注意：您可以通過 RLP 編碼字符串創建 `ChainDataAnchoring` 實例。 請參考下面的示例。
NOTE: `caver.transaction.chainDataAnchoring.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

注意：從 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 開始，只支持使用 `create` 函數創建事務。 如果您一直使用類似`new caver.transaction.chainDataAnchoring({...})`的構造函數創建事務，請將其更改為`caver.transaction.chainDataAnchoring.create({...})`。

:::

**屬性**

| 名稱         | 類型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from       | 字符串 | 發件人地址。                                                                                                                                                                               |
| input      | 字符串 | 服務鏈數據。                                                                                                                                                                               |
| gas        | 字符串 | 交易允許使用的最高交易費金額。                                                                                                                                                                      |
| nonce      | 字符串 | (可選）用於唯一標識發件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 將用於設置 nonce。 |
| signatures | 數組  | (可選）簽名數組。                                                                                                                                                         |
| gasPrice   | 字符串 | (可選）一個乘數，用於計算發件人將支付多少代幣。 如果省略，將使用 `caver.rpc.klay.getGasPrice`設置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可選）kaia 網絡的鏈 id。 如果省略，將使用 `caver.rpc.klay.getChainId`設置 chainId。                                                                                                 |

**示例**

```javascript
// Create a chainDataAnchoring
> caver.transaction.chainDataAnchoring.create({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
})

// Create a chainDataAnchoring from RLP-encoded string
> caver.transaction.chainDataAnchoring.create('0x48f9010e8204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8a8f8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405f845f84325a0e58b9abf9f33a066b998fccaca711553fb4df425c9234bbb3577f9d9775bb124a02c409a6c5d92277c0a812dd0cc553d7fe1d652a807274c3786df3292cd473e09')
ChainDataAnchoring {
    _type: 'TxTypeChainDataAnchoring',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0xe58b9...', _s: '0x2c409...' } ],
    _input: '0xf8a6a...'
}
```

## EthereumAccessList <a id="ethereumaccesslist"></a>

```javascript
caver.transaction.ethereumAccessList.create(transactionObject)
```

EthereumAccessList "代表一個[以太坊訪問列表事務](.../.../.../.../.../learn/transactions/basic.md#txtypeethereumaccesslist)。 A [kaiaaccount](../../../../../learn/accounts.md#klaytn-accounts) can execute a `EthereumAccessList` only with [AccountKeyLegacy]. The `transactionObject` can have properties below to create a `EthereumAccessList`.

`EthereumAccessList` 的成員變量屬性如下。 標記為 "optional "的屬性指用戶創建 "EthereumAccessList "時可在 "transactionObject "中選擇給出的屬性。

:::note

注意：您可以從 RLP 編碼的字符串中創建一個 `EthereumAccessList` 實例。 請參考下面的示例。
注意：`caver.transaction.ethereumAccessList`從 caver-js [v1.8.0](https://www.npmjs.com/package/caver-js/v/1.8.0) 開始支持。

注意：從 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 開始，只支持使用 `create` 函數創建事務。 如果您一直使用類似 `new caver.transaction.ethereumAccessList({...})` 的構造函數創建交易，請將其更改為 `caver.transaction.ethereumAccessList.create({...})`。

:::

**屬性**

| 名稱         | 類型  | 描述                                                                                                                                                                                   |
| ---------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gas        | 字符串 | 交易允許使用的最高交易費金額。                                                                                                                                                                      |
| value      | 字符串 | (可選，默認值：`'0x0'`）要傳輸的 KAIA 數量，單位為 peb。 您可以使用 `caver.utils.toPeb`。                                                                                                  |
| from       | 字符串 | (可選）發件人地址。 如果省略，將設置用於簽名的鑰匙圈地址。                                                                                                                                    |
| to         | 字符串 | (可選，默認：`'0x'`）接收轉賬金額的賬戶地址，或以太坊訪問列表交易執行智能合約時的智能聯繫人地址。 如果以太坊訪問列表交易部署了智能合約，則無需定義 `to`。                                                                               |
| input      | 字符串 | (可選）交易附加數據，用於智能合約部署/執行。                                                                                                                                           |
| signatures | 數組  | (可選）簽名數組。 以太坊訪問列表交易只能有一個簽名。                                                                                                                                       |
| nonce      | 字符串 | (可選）用於唯一標識發件人交易的值。 如果省略，"caver.rpc.klay.getTransactionCount(address, 'pending')\` 將用於設置 nonce。 |
| gasPrice   | 字符串 | (可選）一個乘數，用於計算發件人將支付多少代幣。 如果省略，將使用 `caver.rpc.klay.getGasPrice`設置 gasPrice。                                                                                        |
| chainId    | 字符串 | (可選）kaia 網絡的鏈 id。 如果省略，將使用 `caver.rpc.klay.getChainId`設置 chainId。                                                                                                 |
| 訪問列表       | 數組  | (可選）作為 EIP-2930 訪問列表，包含事務讀寫的所有存儲槽和地址。                                                                                                                             |

**示例**

```javascript
> caver.transaction.ethereumAccessList.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 40000,
    accessList: [
        {
            address: '0x5430192ae264b3feff967fc08982b9c6f5694023',
            storageKeys: [
                '0x0000000000000000000000000000000000000000000000000000000000000003',
                '0x0000000000000000000000000000000000000000000000000000000000000007',
            ],
        },
    ]
})

> caver.transaction.ethereumAccessList.create('0x7801f90109822710238505d21dba00829c4094c5fb1386b60160614a8151dcd4b0ae41325d1cb801b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f85bf859945430192ae264b3feff967fc08982b9c6f5694023f842a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000701a05ac25e47591243af2d6b8e7f54d608e9e0e0aeb5194d34c17852bd7e376f4857a0095a40394f33e95cce9695d5badf4270f4cc8aff0b5395cefc3a0fe213be1f30')
EthereumAccessList {
  _type: 'TxTypeEthereumAccessList',
  _from: '0x0000000000000000000000000000000000000000',
  _gas: '0x9c40',
  _nonce: '0x23',
  _chainId: '0x2710',
  _signatures: SignatureData {
    _v: '0x01',
    _r: '0x5ac25e47591243af2d6b8e7f54d608e9e0e0aeb5194d34c17852bd7e376f4857',
    _s: '0x095a40394f33e95cce9695d5badf4270f4cc8aff0b5395cefc3a0fe213be1f30'
  },
  _to: '0xc5fb1386b60160614a8151dcd4b0ae41325d1cb8',
  _input: '0xa9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039',
  _value: '0x1',
  _accessList: AccessList(0) [],
  _gasPrice: '0x5d21dba00'
}
```

## 以太坊動態費用<a id="ethereumdynamicfee"></a>

```javascript
caver.transaction.ethereumDynamicFee.create(transactionObject)
```

EthereumDynamicFee "代表\[以太坊動態費用交易]（.../.../.../.../.../learn/transactions/basic.md#txtypeethereumdynamicfee）。 A [kaiaaccount](../../../../../learn/accounts.md#klaytn-accounts) can execute a `EthereumDynamicFee` only with [AccountKeyLegacy]. The `transactionObject` can have properties below to create a `EthereumDynamicFee`.

EthereumDynamicFee\` 的成員變量屬性如下。 標記為 "可選 "的屬性指的是用戶創建 "以太坊動態費用 "時可在 "交易對象 "中選擇給出的屬性。
請注意，"EthereumDynamicFee "不使用 "gasPrice"，而是使用 "maxPriorityFeePerGas "和 "maxFeePerGas"。

:::note

注意：您可以通過 RLP 編碼字符串創建 `EthereumDynamicFee` 實例。 請參考下面的示例。
注意：`caver.transaction.ethereumDynamicFee`從 caver-js [v1.8.0](https://www.npmjs.com/package/caver-js/v/1.8.0) 開始支持。

注意：從 caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4) 開始，只支持使用 `create` 函數創建事務。 如果您一直使用類似`new caver.transaction.ethereumDynamicFee({...})`的構造函數創建交易，請將其更改為`caver.transaction.ethereumDynamicFee.create({...})`。

:::

**屬性**

| 名稱                   | 類型  | 描述                                                                                                                                                                          |
| -------------------- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gas                  | 字符串 | 交易允許使用的最高交易費金額。                                                                                                                                                             |
| value                | 字符串 | (可選，默認值：`'0x0'`）要傳輸的 KAIA 數量，單位為 peb。 您可以使用 `caver.utils.toPeb`。                                                                                         |
| from                 | 字符串 | (可選）發件人地址。 如果省略，則將設置為用於簽名的鑰匙圈地址。                                                                                                                         |
| to                   | 字符串 | (可選，默認：`'0x'`）當以太坊動態收費交易執行智能合約時，接收轉賬金額或智能聯繫人地址的賬戶地址。 當以太坊動態收費交易部署智能合約時，無需定義 `to`。                                                                        |
| input                | 字符串 | (可選）交易附加數據，用於智能合約部署/執行。                                                                                                                                  |
| signatures           | 數組  | (可選）簽名數組。 以太坊動態收費交易只能有一個簽名。                                                                                                                              |
| nonce                | 字符串 | (可選）用於唯一標識發件人交易的值。 如果省略，將設置為 `caver.rpc.klay.getTransactionCount(address,'pending')`。                                                                    |
| maxPriorityFeePerGas | 字符串 | (可選）用於 peb 交易的氣嘴帽。 由於 kaia 有固定的Gas 價格，因此應將其設置為與 `caver.rpc.klay.getGasPrice`相同的值。 如果省略，將設置為 `caver.rpc.klay.getMaxPriorityFeePerGas()`。                  |
| maxFeePerGas         | 字符串 | (可選）為執行交易支付的最高金額。 由於 kaia 有固定的Gas 價格，因此應將其設置為與 `caver.rpc.klay.getGasPrice`相同的值。 如果省略，"baseFeePerGas \* 2 + maxPriorityFeePerGas "的值將設置為 "maxFeePerGas"。 |
| chainId              | 字符串 | (可選）kaia 網絡的鏈 id。 如果省略，將設置為 `caver.rpc.klay.getChainId`。                                                                                                 |
| accessList           | 數組  | (可選）作為 EIP-2930 訪問列表，包含事務讀寫的所有存儲槽和地址。                                                                                                                    |

**示例**

```javascript
> caver.transaction.ethereumDynamicFee.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    accessList: [
        {
            address: '0x5430192ae264b3feff967fc08982b9c6f5694023',
            storageKeys: [
                '0x0000000000000000000000000000000000000000000000000000000000000003',
                '0x0000000000000000000000000000000000000000000000000000000000000007',
            ],
        },
    ]
})

> caver.transaction.ethereumDynamicFee.create('0x7802f9010f822710258505d21dba008505d21dba00829c40941fc92c23f71a7de4cdb4394a37fc636986a0f48401b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f85bf8599467116062f1626f7b3019631f03d301b8f701f709f842a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000780a04fc52da183020a27dc4b684a45404445630e946b0c1a37edeb538d4bdae63040a07d56dbcc61f42ffcbced105f838d20b8fe71e85a4d0344c7f60815fddfeae4cc')
EthereumDynamicFee {
  _type: 'TxTypeEthereumDynamicFee',
  _from: '0x0000000000000000000000000000000000000000',
  _gas: '0x9c40',
  _nonce: '0x25',
  _chainId: '0x2710',
  _signatures: SignatureData {
    _v: '0x',
    _r: '0x4fc52da183020a27dc4b684a45404445630e946b0c1a37edeb538d4bdae63040',
    _s: '0x7d56dbcc61f42ffcbced105f838d20b8fe71e85a4d0344c7f60815fddfeae4cc'
  },
  _to: '0x1fc92c23f71a7de4cdb4394a37fc636986a0f484',
  _input: '0xa9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039',
  _value: '0x1',
  _accessList: AccessList(0) [],
  _maxPriorityFeePerGas: '0x5d21dba00',
  _maxFeePerGas: '0x5d21dba00'
}
```

[AccountKeyLegacy]: .../.../.../.../.../.../learn/accounts.md#accountkeylegacy
[Account]: ../caver.account.md#account
