# caver.transaction

caver.transaction "是一個提供與 "Transaction "相關功能的軟件包。

## Class <a href="#class" id="class"></a>

下表詳細介紹了每個交易類別：

|                        | 基礎                                                          | 費用委託                                                                                         | 部分費用委託                                                                                                                 |
| ---------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| LegacyTransaction      | [LegacyTransaction](./basic.md#legacytransaction)           | N/A                                                                                          | N/A                                                                                                                    |
| ValueTransfer          | [ValueTransfer](./basic.md#valuetransfer)                   | [FeeDelegatedValueTransfer](./fee-delegation.md#feedelegatedvaluetransfer)                   | [FeeDelegatedValueTransferWithRatio](./partial-fee-delegation.md#feedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [ValueTransferMemo](./basic.md#valuetransfermemo)           | [FeeDelegatedValueTransferMemo](./fee-delegation.md#feedelegatedvaluetransfermemo)           | [FeeDelegatedValueTransferMemoWithRatio](./partial-fee-delegation.md#feedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [SmartContractDeploy](./basic.md#smartcontractdeploy)       | [FeeDelegatedSmartContractDeploy](./fee-delegation.md#feedelegatedsmartcontractdeploy)       | [FeeDelegatedSmartContractDeployWithRatio](./partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [SmartContractExecution](./basic.md#smartcontractexecution) | [FeeDelegatedSmartContractExecution](./fee-delegation.md#feedelegatedsmartcontractexecution) | [FeeDelegatedSmartContractExecutionWithRatio](./partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [AccountUpdate](./basic.md#accountupdate)                   | [FeeDelegatedAccountUpdate](./fee-delegation.md#feedelegatedaccountupdate)                   | [FeeDelegatedAccountUpdateWithRatio](./partial-fee-delegation.md#feedelegatedaccountupdatewithratio)                   |
| Cancel                 | [Cancel](./basic.md#cancel)                                 | [FeeDelegatedCancel](./fee-delegation.md#feedelegatedcancel)                                 | [FeeDelegatedCancelWithRatio](./partial-fee-delegation.md#feedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [ChainDataAnchoring](./basic.md#chaindataanchoring)         | [FeeDelegatedChainDataAnchoring](./fee-delegation.md#feedelegatedchaindataanchoring)         | [FeeDelegatedChainDataAnchoringWithRatio](./partial-fee-delegation.md#feedelegatedchaindataanchoringwithratio)         |
| EthereumAccessList     | [EthereumAccessList](./basic.md#ethereumaccesslist)         | N/A                                                                                          | N/A                                                                                                                    |
| EthereumDynamicFee     | [EthereumDynamicFee](./basic.md#ethereumdynamicfee)         | N/A                                                                                          | N/A                                                                                                                    |

## caver.transaction.decode <a href="#caver-transaction-decode" id="caver-transaction-decode"></a>

```javascript
caver.transaction.decode(rlpEncoded)
```

解碼 RLP 編碼的事務字符串（原始事務），並返回一個 [事務]（#class）實例。

**參數**

| 名稱         | 類型     | 描述                |
| ---------- | ------ | ----------------- |
| rlpEncoded | string | 要解碼的 RLP 編碼事務字符串。 |

**返回價值**

| 類型     | 描述                                                                                                                                                    |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | [Transaction]的一個實例 有關各事務的詳情，請參閱 [Transaction] |

**示例**

```javascript
> caver.transaction.decode('0x08f87...')
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ 
        SignatureData { _v: '0x25', _r: '0xf3d0c...', _s: '0x6748a...' }
    ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## caver.transaction.getTransactionByHash <a href="#caver-transaction-gettransactionbyhash" id="caver-transaction-gettransactionbyhash"></a>

```javascript
caver.transaction.getTransactionByHash('0x{transaction hash}')
```

從 kaia 查詢事務並轉換為 caver 事務實例。

**注意** `caver.transaction.getTransactionByHash` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱              | 類型     | 描述                  |
| --------------- | ------ | ------------------- |
| transactionHash | string | 要從 kaia 查詢的事務哈希字符串。 |

**返回價值**

返回 `object` 的`Promise` 事務的實例。 如果無法從 kaia 收到事務對象，就會發生錯誤。

| 類型     | 描述                                                                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| object | [Transaction]的一個實例 有關各事務的詳情，請參閱 [Transaction]。 |

**示例**

```javascript
> caver.transaction.getTransactionByHash('0x30575f5a76a4477502aa1e5e707e47f05b92c3450132529cf55764cc94f780b0').then(console.log)
LegacyTransaction {
  _type: 'TxTypeLegacyTransaction',
  _from: '0x9ce618d097ea54c00d1562cb060576ff64139f10',
  _gas: '0x81b320',
  _nonce: '0x1de',
  _gasPrice: '0x5d21dba00',
  _signatures: SignatureData {
    _v: '0x07f5',
    _r: '0x359a09ebd2842cfc9cad6fd93c299da8629292bb3a69410c73837f7ca15cfd51',
    _s: '0x6f348cc656b90e79cfc1e748c3371fbd0128b83b787a110622f3aa5143a017f8'
  },
  _to: '0x',
  _input: '0x60806...',
  _value: '0x0'
}
```

## caver.transaction.recoverPublicKeys <a href="#caver-transaction-recoverpublickeys" id="caver-transaction-recoverpublickeys"></a>

```javascript
caver.transaction.recoverPublicKeys('0x{RLP-encoded transaction}')
```

從給定事務的 "signatures "字段中恢復公鑰字符串。

**注意** `caver.transaction.recoverPublicKeys` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱    | 類型     | 描述                                   |
| ----- | ------ | ------------------------------------ |
| rawTx | string | RLP 編碼的事務字符串，用於從 "signatures "中恢復公鑰。 |

**返回價值**

| 類型    | 說明                          |
| ----- | --------------------------- |
| Array | 包含從 `signatures` 中恢復的公鑰的數組。 |

**示例**

```javascript
> caver.transaction.recoverPublicKeys('0x08f9010e808505d21dba008402faf0809459177716c34ac6e49e295a0e78e33522f14d61ee0194f21460730845e3652aa3cc9bc13b345e4f53984af8d5f845820feaa02b5934c6d26bb3e65edf099d79c57c743d2f70744ca09d3ba9a1099edff9f173a00797886edff4b449c1a599943e3a6003ae9e46b3f3f34862ced327e43fba3a6af845820fe9a063177648732ef855f800eb9f80f68501abb507f84c0d660286a6e0801334a1d2a0620a996623c114f2df35b11ec8ac4f3758d3ad89cf81ba13614e51908cfe9218f845820fe9a086c8ecbfd892be41d48443a2243274beb6daed3f72895045965a3baede4c350ea069ea748aff6e4c106d3a8ba597d8f134745b76f12dacb581318f9da07351511a')
[
  '0x8bb6aaeb2d96d024754d3b50babf116cece68977acbe8ba6a66f14d5217c60d96af020a0568661e7c72e753e80efe084a3aed9f9ac87bf44d09ce67aad3d4e01',
  '0xc7751c794337a93e4db041fb5401c2c816cf0a099d8fd4b1f3f555aab5dfead2417521bb0c03d8637f350df15ef6a6cb3cdb806bd9d10bc71982dd03ff5d9ddd',
  '0x3919091ba17c106dd034af508cfe00b963d173dffab2c7702890e25a96d107ca1bb4f148ee1984751e57d2435468558193ce84ab9a7731b842e9672e40dc0f22'
]
```

## caver.transaction.recoverFeePayerPublicKeys <a href="#caver-transaction-recoverfeepayerpublickeys" id="caver-transaction-recoverfeepayerpublickeys"></a>

```javascript
caver.transaction.recoverFeePayerPublicKeys('0x{RLP-encoded transaction}')
```

從給定交易的 "feePayerSignatures "字段中恢復公鑰字符串。

**注意** `caver.transaction.rec recoverFeePayerPublicKeys` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**參數**

| 名稱    | 類型     | 描述                                                                                 |
| ----- | ------ | ---------------------------------------------------------------------------------- |
| rawTx | string | RLP 編碼的事務字符串，用於從 "付費者簽名 "中恢復公鑰。 要恢復繳費人的公鑰，交易應是一個內含 `feePayerSignatures` 字段的收費委託交易。 |

**返回價值**

| 類型    | 描述                                  |
| ----- | ----------------------------------- |
| Array | 數組，包含從 `feePayerSignatures` 中獲取的公鑰。 |

**示例**

```javascript
> caver.transaction.recoverFeePayerPublicKeys('0x09f901fa808505d21dba008402faf0809459177716c34ac6e49e295a0e78e33522f14d61ee019407a9a76ef778676c3bd2b334edcf581db31a85e5f8d5f845820feaa0cb2bbf04a12ec3a06163c30ce8782739ec4745a53e265aa9443f1c0d678bb871a07dd348c7d8fce6be36b661f116973d1c36cc92a389ad4a1a4053bd486060a083f845820fe9a06d5dfca992d6833c0da272578bc6ea941be45f44fb2fa114310ebe18d673ed52a04dc5cd7985c9ce7d44d46d65e65c995a4a8c97159a1eed8b2efb0510b981ab7cf845820feaa0945151edf556fbcebf832092d4534b9a3b1f3d46f85bce09e7d7211070cb57bea01617c8f918f96970baddd12f240a9824eca6b29d91eb7333adacb987f2dcd8dd94b5db72925b1b6b79299a1a49ae226cd7861083acf8d5f845820feaa086fd17d788e89a6e0639395b3c0a04f916103debd6cbe639d6f4ff5034dde3e8a00795551c551d9096234c290689767f34f2d409c95166ab18d216dbc93845ba16f845820feaa00653b6d1cdb90462094b089ce8e2fed0e3b8ec2c44125965e1a5af286644c758a0259b10e3bf594d48535fd0d95e15d095897c8d075c01dd56e7417d5943b0d53af845820fe9a0ce8d051427adab10d1dc93de49123aeab18ba8aadedce0d57ef5b7fa451b1f4fa04fe2a845d92ff48abca3e1d59637fab5f4a4e3172d91772d9bfce60760edc506')
[
  '0x2b557d80ddac3a0bbcc8a7861773ca7434c969e2721a574bb94a1e3aa5ceed3819f08a82b31682c038f9f691fb38ee4aaf7e016e2c973a1bd1e48a51f60a54ea',
  '0x1a1cfe1e2ec4b15520c57c20c2460981a2f16003c8db11a0afc282abf929fa1c1868f60f91b330c423aa660913d86acc2a0b1b15e7ba1fe571e5928a19825a7e',
  '0xdea23a89dbbde1a0c26466c49c1edd32785432389641797038c2b53815cb5c73d6cf5355986fd9a22a68bb57b831857fd1636362b383bd632966392714b60d72'
]
```

## transaction.sign<a href="#transaction-sign" id="transaction-sign"></a>

```javascript
transaction.sign(keyring [, index] [, hasher])
```

使用 "鑰匙環 "中的私人密鑰以事務發送者的身份簽署事務，並在事務對象中添加 "簽名"。

對於[賬戶更新]（./basic.md#accountupdate）事務，使用[roleAccountUpdateKey]（./../../../.../learn/accounts.否則，請使用 [RoleBasedKeyring](../caver-wallet/keyring.md#rolebasedkeyring) 中的 [roleTransactionKey](../../../../learn/accounts.md#roles)。 如果用戶沒有定義 "index"，則 "transaction.sign "會使用角色使用的所有私鑰簽署事務。 如果定義了 `index`，則 `transaction.sign` 只使用給定索引上的一個私鑰簽署事務。

**參數**

| 名稱      | 類型        | 描述                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | 對象 \| 字符串 | 也可使用私鑰字符串（[KlaytnWalletKey](.../.../.../.../.../learn/accounts.md#klaytn-wallet-key-format) 格式）或 Keyring 實例（[SingleKeyring](./caver-wallet/keyring.md#singlekeyring)、[MultipleKeyring](../caver-wallet/keyring.md#multiplekeyring)或[RoleBasedKeyring](../caver-wallet/keyring.md#rolebasedkeyring))。 如果私鑰字符串或[KlaytnWalletKey](.../.../.../.../.../.../learn/accounts.md#klaytn-wallet-key-format)作為參數傳遞，則會在內部創建密鑰環實例。 |
| index   | 數字        | (可選）要使用的私人密鑰的索引。 索引必須小於為每個角色定義的私鑰數組的長度。 如果沒有定義索引，該方法將使用所有私鑰。                                                                                                                                                                                                                                                                                                                                        |
| hasher  | 函數        | (可選）用於獲取交易哈希值的哈希函數。                                                                                                                                                                                                                                                                                                                                                                                 |

**返回價值**

返回 "對象 "的 "許諾"：已簽署的事務。

| 類型     | 描述                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| object | 已簽名 [Transaction] 的實例。 簽名將附加到 `transaction.signatures` 中。 |

**示例**

```javascript
// This example uses the ValueTransfer transaction.
> const transaction = caver.transaction.valueTransfer.create({
    from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey
> transaction.sign(roleBasedKeyring).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0xd78a2...', _s: '0x379e9...' },
        SignatureData { _v: '0x4e43', _r: '0x70a58...', _s: '0x2ab28...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey and index
> transaction.sign(roleBasedKeyring, 1).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0x70a58...', _s: '0x2ab28...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey and hasher
> transaction.sign(roleBasedKeyring, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e44', _r: '0x7a8b6...', _s: '0x17139...' },
        SignatureData { _v: '0x4e43', _r: '0x7f978...', _s: '0x1a532...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey, index and hasher
> transaction.sign(roleBasedKeyring, 1, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0x7f978...', _s: '0x1a532...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## transaction.signAsFeePayer<a href="#transaction-signasfeepayer" id="transaction-signasfeepayer"></a>

```javascript
transaction.signAsFeePayer(keyring [, index] [, hasher])
```

將事務簽署為事務 "付費者"，並在事務對象中附加 "付費者簽名 "和 "鑰匙環 "中的私人密鑰。

要以付費者身份簽署交易，請使用 `keyring` 中的 [roleFeePayerKey](../../../../../learn/accounts.md#roles) 。 如果用戶未定義 "索引"，則 "transaction.signAsFeePayer "會使用角色使用的所有私鑰簽署交易。 如果定義了 "index"，則 "transaction.signAsFeePayer "只使用給定索引中的一個私鑰來簽署交易。

如果未定義 "transaction.feePayer"，給定密鑰的地址將設置為 "transaction.feePayer"。

如果用於簽署交易的 `keyring` 已添加到 `caver.wallet` 中，則可以使用 [caver.wallet.signAsFeePayer](../caver-wallet/caver-wallet.md#caver-wallet-signasfeepayer).

**注意**\* 該功能僅適用於 "收費委託 "交易或 "按比例收費委託 "交易。

**參數**

| 名稱      | 類型        | 描述                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | 對象 \| 字符串 | 也可使用私鑰字符串（[KlaytnWalletKey](.../.../.../.../.../learn/accounts.md#klaytn-wallet-key-format) 格式）或 Keyring 實例（[SingleKeyring](./caver-wallet/keyring.md#singlekeyring)、[MultipleKeyring](../caver-wallet/keyring.md#multiplekeyring)或[RoleBasedKeyring](../caver-wallet/keyring.md#rolebasedkeyring))。 如果將私鑰字符串或 [KlaytnWalletKey](../../../../../../learn/accounts.md#klaytn-wallet-key-format) 作為參數傳遞，則會在內部創建密鑰環實例。 |
| index   | 數字        | (可選）要使用的私人密鑰的索引。 索引必須小於為每個角色定義的私鑰數組的長度。 如果沒有定義索引，該方法將使用所有私鑰。                                                                                                                                                                                                                                                                                                                                     |
| hasher  | 函數        | (可選）用於獲取交易哈希值的哈希函數。                                                                                                                                                                                                                                                                                                                                                                              |

**返回價值**

返回 "對象 "的 "許諾"：已簽署的事務。

| 類型     | 描述                                                                                                              |
| ------ | --------------------------------------------------------------------------------------------------------------- |
| object | 已簽名 [事務]（#類）的實例。 簽名將附加到 `transaction.feePayerSignatures` 中。 |

**示例**

```javascript
// This example uses the FeeDelegatedValueTransfer transaction.
> const transaction = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey
> transaction.signAsFeePayer(roleBasedKeyring).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e44', _r: '0x7010e...', _s: '0x65d6b...' },
        SignatureData { _v: '0x4e43', _r: '0x96ef2...', _s: '0x77f34...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and index
> transaction.signAsFeePayer(roleBasedKeyring, 1).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0x96ef2...', _s: '0x77f34...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and hasher
> transaction.signAsFeePayer(roleBasedKeyring, customHasher).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0xe48bf...', _s: '0x1cf36...' },
        SignatureData { _v: '0x4e43', _r: '0x82976...', _s: '0x3c5e0...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey, index and hasher
> transaction.signAsFeePayer(roleBasedKeyring, 1, customHasher).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0x82976...', _s: '0x3c5e0...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## transaction.appendSignatures<a href="#transaction-appendsignatures" id="transaction-appendsignatures"></a>

```javascript
transaction.appendSignatures(signatures)
```

為事務添加 "簽名"。

**參數**

| 名稱         | 類型       | 描述                                                                                                                                                                                                       |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| signatures | 對象 \| 數組 | 附加到交易中的簽名。 [SignatureData](../caver-wallet/keyring.md#signaturedata) 實例或包含 [SignatureData](../caver-wallet/keyring.md#signaturedata) 實例的數組。 也可以將一個數組（其中每個 "v"、"r "和 "s "都按順序定義為字符串格式）或一個包含這些數組的二維數組作為參數。 |

**示例**

```javascript
> transaction.appendSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.appendFeePayerSignatures<a href="#transaction-appendfeepayersignatures" id="transaction-appendfeepayersignatures"></a>

```javascript
transaction.appendFeePayerSignatures( 簽名 )
```

將 "feePayerSignatures "添加到交易中。

**注意**\* 該功能僅適用於 "收費委託 "交易或 "按比例收費委託 "交易。

**參數：**

| 名稱                 | 類型       | 描述                                                                                                                                                                                                          |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| feePayerSignatures | 對象 \| 數組 | 附加到交易中的付費者簽名。 [SignatureData](../caver-wallet/keyring.md#signaturedata) 實例或包含 [SignatureData](../caver-wallet/keyring.md#signaturedata) 實例的數組。 也可以將一個數組（其中每個 "v"、"r "和 "s "都按順序定義為字符串格式）或一個包含這些數組的二維數組作為參數。 |

**示例**

```javascript
> transaction.appendFeePayerSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.combineSignedRawTransactions<a href="#transaction-combinesignatures" id="transaction-combinesignatures"></a>

```javascript
transaction.combineSignedRawTransactions(rlpEncodedTxs)
```

在給定數組中收集每個 RLP 編碼事務字符串中的標誌，將它們與事務實例相結合，然後返回一個包含所有標誌的 RLP 編碼事務字符串。 請注意，事務實例並不一定要事先簽名。 如果交易屬於 "收費委託 "或 "按比例收費委託 "類型，"收費人簽名 "也會被合併幷包含在輸出的 RLP 編碼交易字符串中。

**參數**

| 名稱            | 類型 | 描述                   |
| ------------- | -- | -------------------- |
| rlpEncodedTxs | 數組 | 經過簽名的 RLP 編碼事務字符串數組。 |

**返回價值**

| 類型  | 描述                                                              |
| --- | --------------------------------------------------------------- |
| 字符串 | RLP 編碼的交易字符串，包括所有 "簽名"（如果交易類型為 "收費委託 "或 "按比例收費委託"，則包括 "收費人簽名"）。 |

**示例**

```javascript
> transaction.combineSignedRawTransactions(['0x09f88...'])
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRLPEncoding<a href="#transaction-getrlpencoding" id="transaction-getrlpencoding"></a>

```javascript
transaction.getRLPEncoding()
```

返回 RLP 編碼的事務字符串。

For information on how to make the RLP-encoded string for each transaction type, see [Kaia Design - Transactions](../../../../../build/transactions/transactions.md).

**返回價值**

| 類型     | 描述            |
| ------ | ------------- |
| string | RLP 編碼的事務字符串。 |

**示例**

```javascript
> 交易。getRLPEncoding()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRawTransaction<a href="#transaction-getrawtransaction" id="transaction-getrawtransaction"></a>

```javascript
transaction.getRawTransaction()
```

返回 `rawTransaction` 字符串（RLP 編碼的事務字符串）。 此函數與 [transaction.getRLPEncoding]（#transaction-getrlpencoding）相同。

**返回價值**

| 類型     | 描述            |
| ------ | ------------- |
| string | RLP 編碼的事務字符串。 |

**示例**

```javascript
> transaction.getRawTransaction()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getTransactionHash<a href="#transaction-gettransactionhash" id="transaction-gettransactionhash"></a>

```javascript
transaction.getTransactionHash()
```

返回一個 `transactionHash`.

For information on how to make the transaction hash for each transaction type, see [Kaia Design - Transactions](../../../../../build/transactions/transactions.md).

**返回價值**

| 類型     | 描述     |
| ------ | ------ |
| string | 交易哈希值。 |

**示例**

```javascript
> transaction.getTransactionHash()
'0x8ac53afbba014201b02398545653683fe0536c49707fe302c59423012c0e8697'
```

## transaction.getSenderTxHash<a href="#transaction-getsendertxhash" id="transaction-getsendertxhash"></a>

```javascript
transaction.getSenderTxHash()
```

Returns a [senderTxHash](../../../../../build/transactions/transactions.md#sendertxhash) of transaction.

The [senderTxHash](../../../../../build/transactions/transactions.md#sendertxhash) is a hash of the transaction except for the fee payer's address and signature, so [transactionHash](#transaction-gettransactionhash) and [senderTxHash](../../../../../build/transactions/transactions.md#sendertxhash) are the same for basic transactions.

For information on how to make the [senderTxHash](../../../../../build/transactions/transactions.md#sendertxhash) for each transaction type, see [Kaia Design - Transactions](../../../../../build/transactions/transactions.md).

**返回價值**

| 類型     | 描述                              |
| ------ | ------------------------------- |
| string | A senderTxHash. |

**示例**

```javascript
> transaction.getSenderTxHash()
'0xb61cc1ddadb6f2ec34c9f9e6a7b6cf0a606422654d649d998587c77daa3c31fe'
```

## transaction.getRLPEncodingForSignature<a href="#transaction-getrlpencodingforsignature" id="transaction-getrlpencodingforsignature"></a>

```javascript
transaction.getRLPEncodingForSignature()
```

返回 RLP 編碼的事務字符串，用於製作事務發送方的簽名。 請注意，返回的 RLP 編碼事務字符串不會與簽名一起添加，而是用於生成此簽名。

For information on how to make a RLP-encoded transaction string to generate the transaction sender's signature for each transaction type, see [Kaia Design - Transactions](../../../../../build/transactions/transactions.md).

**返回價值**

| 類型     | 描述                     |
| ------ | ---------------------- |
| string | 沒有附加任何簽名的 RLP 編碼交易字符串。 |

**示例**

```javascript
> transaction.getRLPEncodingForSignature()
'0xf83fb838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d08207e38080'
```

## transaction.getRLPEncodingForFeePayerSignature<a href="#transaction-getrlpencodingforfeepayersignature" id="transaction-getrlpencodingforfeepayersignature"></a>

```javascript
transaction.getRLPEncodingForFeePayerSignature()
```

返回 RLP 編碼的交易字符串，用於繳費人簽名。 請注意，返回的 RLP 編碼事務字符串不會與簽名一起添加，而是用於生成此簽名。

For information on how to make a RLP-encoded transaction string to generate the fee payer's signature for each transaction type, see [Kaia Design - Transactions](../../../../../build/transactions/transactions.md).

**注意**\* 該功能僅適用於 "收費委託 "交易或 "按比例收費委託 "交易。

**返回價值**

| 類型     | 描述                     |
| ------ | ---------------------- |
| string | 沒有附加任何簽名的 RLP 編碼交易字符串。 |

**示例**

```javascript
> transaction.getRLPEncodingForFeePayerSignature()
'0xf840b838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0808207e38080'
```

## transaction.fillTransaction<a href="#transaction-filltransaction" id="transaction-filltransaction"></a>

```javascript
transaction.fillTransaction()
```

填寫事務中的可選變量。

如果交易的 "gasPrice"、"nonce "或 "chainId "未定義，此方法會詢問這些可選變量的默認值，並通過向連接的 kaia 節點發送 JSON RPC 調用來預設它們。

Use [caver.rpc.klay.getGasPrice](../caver-rpc/klay.md#caver-rpc-klay-getgasprice) to get `gasPrice`, [caver.rpc.klay.getTransactionCount](../caver-rpc/klay.md#caver-rpc-klay-gettransactioncount)獲取`nonce`，調用[caver.rpc.klay.getChainId](./caver-rpc/klay.md#caver-rpc-klay-getchainid)獲取`chainId`。

**返回價值**

`Promise` returning `void`

**示例**

```javascript
> transaction.fillTransaction()
```

## transaction.recoverPublicKeys<a href="#transaction-recoverpublickeys" id="transaction-recoverpublickeys"></a>

```javascript
transaction.recoverPublicKeys()
```

從 "簽名 "字段中恢復公鑰字符串。

**注意** `transaction.recoverPublicKeys` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**返回價值**

| 類型    | 描述                          |
| ----- | --------------------------- |
| Array | 包含從 `signatures` 中恢復的公鑰的數組。 |

**示例**

```javascript
> 交易。recoverPublicKeys()
[
  '0x8bb6aaeb2d96d024754d3b50babf116cece68977acbe8ba6a66f14d5217c60d96af020a0568661e7c72e753e80efe084a3aed9f9ac87bf44d09ce67aad3d4e01',
  '0xc7751c794337a93e4db041fb5401c2c816cf0a099d8fd4b1f3f555aab5dfead2417521bb0c03d8637f350df15ef6a6cb3cdb806bd9d10bc71982dd03ff5d9ddd',
  '0x3919091ba17c106dd034af508cfe00b963d173dffab2c7702890e25a96d107ca1bb4f148ee1984751e57d2435468558193ce84ab9a7731b842e9672e40dc0f22'
]
```

## transaction.recoverFeePayerPublicKeys<a href="#transaction-recoverfeepayerpublickeys" id="transaction-recoverfeepayerpublickeys"></a>

```javascript
transaction.recoverFeePayerPublicKeys()
```

從`feePayerSignatures` 字段中恢復公鑰字符串。

**注意** `transaction.recoverFeePayerPublicKeys` 自 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 開始支持。

**返回價值**

| 類型    | 描述                                  |
| ----- | ----------------------------------- |
| Array | 數組，包含從 `feePayerSignatures` 中獲取的公鑰。 |

**示例**

```javascript
> transaction.recoverFeePayerPublicKeys()
[
  '0x2b557d80ddac3a0bbcc8a7861773ca7434c969e2721a574bb94a1e3aa5ceed3819f08a82b31682c038f9f691fb38ee4aaf7e016e2c973a1bd1e48a51f60a54ea',
  '0x1a1cfe1e2ec4b15520c57c20c2460981a2f16003c8db11a0afc282abf929fa1c1868f60f91b330c423aa660913d86acc2a0b1b15e7ba1fe571e5928a19825a7e',
  '0xdea23a89dbbde1a0c26466c49c1edd32785432389641797038c2b53815cb5c73d6cf5355986fd9a22a68bb57b831857fd1636362b383bd632966392714b60d72'
]
```

## transaction.suggestGasPrice<a href="#transaction-suggestgasprice" id="transaction-suggestgasprice"></a>

```javascript
transaction.suggestGasPrice()
```

返回建議Gas價格。 該函數用於設置 [fillTransaction]（#transaction-fillTransaction）中的 gasPrice 字段。

在 Magma 硬分叉之前，"suggestGasPrice" 返回的是網絡單價。 Magma 硬分叉後，"suggestGasPrice "會返回 "baseFee \* 2"，建議將其用作 gasPrice。

**注意** `transaction.suggestGasPrice` 自 caver-js [v1.9.0](https://www.npmjs.com/package/caver-js/v/1.9.0) 開始支持。

**返回價值**

`Promise` 返回 `string`：以十六進制字符串表示的建議Gas價格。

| 類型     | 描述       |
| ------ | -------- |
| string | 建議Gas費用。 |

**舉例**

```javascript
> tx.suggestGasPrice().then(console.log)
0xba43b7400
```
