# 新手指南

本文檔適用於使用 caver-js v1.5.0 或更高版本的開發人員。 如果使用的是舊版本，請參閱 [Getting Started (\~v1.4.1)](../caver-js-1.4.1/get-started-1.4.1.md).

## 先決條件<a href="#prerequisites" id="prerequisites"></a>

### 依賴關係<a href="#dependencies" id="dependencies"></a>

使用 caver-js 庫需要以下軟件包。

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [gcc-c++](https://gcc.gnu.org/)
- [Solidity compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

**注意**\* caver-js 可在 Node.js 12 和 14 版本上運行。 推薦的版本如下

- lts/erbium ([12.21.0](https://nodejs.org/dist/latest-v12.x/))
- lts/fermium ([14.16.0](https://nodejs.org/dist/latest-v14.x/))

如果使用不同版本的 Node（例如 Node v15），請使用 Node Version Manager([nvm](https://github.com/nvm-sh/nvm)) 安裝並使用 caver-js 支持的版本。

### 安裝<a href="#installation" id="installation"></a>

要試用它，請使用以下命令通過 npm 安裝 caver-js：

```
$ npm install caver-js
```

**注意**：package.json`文件應存在於同一安裝路徑中。 如果不存在，可通過`npm init`生成`package.json\`。

要安裝特定版本的 caver-js，請嘗試執行以下命令：

```
$ npm install caver-js@X.X.X
```

## 從 caver-js 開始<a href="#starting-with-caver-js" id="starting-with-caver-js"></a>

完成 caver-js 安裝後，就可以使用 caver-js 連接 kaia 節點了。

要練習下面的示例，首先在工作目錄中創建一個測試文件。

```bash
$ touch test.js
```

您可以看到在工作目錄中創建的 `test.js` 文件。

在 test.js 中編寫以下代碼。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const version = await caver.rpc.klay.getClientVersion()
	console.log(version)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
kaia/v1.4.0/linux-amd64/go1.14.1
```

如果看到如上所示的 console.log 輸出，請繼續以下步驟。 版本號可能因所連接的 kaia 節點版本不同而不同。

### 連接 kaia 節點<a href="#connecting-to-a-klaytn-node" id="connecting-to-a-klaytn-node"></a>

您可以導入 caver-js 模塊，並將其連接到 Kairos 測試網絡中的 kaia 節點，如下圖所示：

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')
```

如果運行的是 EN，可以通過更改主機和端口將其連接到自己的節點，如下所示：

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')
```

## 管理 Keyrings <a href="#managing-keyrings" id="managing-keyrings"></a>

[Keyring](api/caver-wallet/keyring.md)是一個包含 kaia 賬戶地址和私鑰的結構。

根據所存儲密鑰的類型，[Keyring](api/caver-wallet/keyring.md) 可分為三種類型：[SingleKeyring](api/caver-wallet/keyring.md#singlekeyring) 用於存儲一個地址和一個私人鑰匙，[MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring) 用於存儲一個地址和多個私人鑰匙，[RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) 用於存儲一個地址和每個角色的一個或多個私人鑰匙。

[SingleKeyring](api/caver-wallet/keyring.md#singlekeyring)在內部定義了 "key "屬性，該 "key "存儲一個私人密鑰。

[MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring)在內部定義了 "keys "屬性，該 "keys "以數組形式實現，用於存儲多個私鑰。

RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring)中定義的`keys`屬性是以二維數組的形式實現的（空`keys`看起來像`[ [], [], [] ]`），每個[role](../../../learn/accounts.md#roles)可以包含多個鍵。 數組的第一個元素填入用於 `roleTransactionKey` 的私鑰，第二個元素填入用於 `roleAccountUpdateKey` 的私鑰，第三個元素填入用於 `roleFeePayerKey` 的私鑰。

### 創建Keyring<a href="#creating-a-keyring" id="creating-a-keyring"></a>

#### 生成 SingleKeyring <a href="#generating-a-singlekeyring" id="generating-a-singlekeyring"></a>

如下圖所示，您可以隨機生成一個keyring。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const keyring = caver.wallet.keyring.generate()
	console.log(keyring)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x3d263c3c0df60c5516f932d244531742f45eed5c',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
```

執行結果如上圖所示。 可以通過 `keyring.address` 和 `keyring.key` 訪問實例內部定義的成員變量。

#### 從私人密鑰創建SingleKeyring<a href="#creating-a-singlekeyring-from-private-key" id="creating-a-singlekeyring-from-private-key"></a>

此外，如果你擁有特定的私人密鑰，還可以用它創建一個鑰匙圈，如下圖所示。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	// Create a keyring from a private key
	const keyringFromPrivateKey = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	console.log(keyringFromPrivateKey)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
SingleKeyring {
	_address: '0xf5a9079f311f9ec55170af351627aff0c5d2e287',
	_key: PrivateKey { _privateKey: '0x{private key}' } 
}
```

caver.wallet.keyring.createFromPrivateKey "的結果，就像上面 "caver.wallet.keyring.generate "的結果一樣，是一個[SingleKeyring](api/caver-wallet/keyring.md#singlekeyring)實例，其中定義了一個地址和 "keyring.key "中的一個\[PrivateKey]實例。

#### 使用私鑰和地址創建 SingleKeyring <a href="#creating-a-singlekeyring-with-a-private-key-and-an-address" id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

如果 kaia 賬戶的私鑰與地址不相關聯，則可以使用給定的地址和私鑰創建一個密鑰環，如下所示。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	// Create a keyring with an address and a private key
	const keyring = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key}')
	console.log(keyring)

	// Create a keyring from a KlaytnWalletKey
	const keyringFromKlaytnWalletKey = caver.wallet.keyring.createFromKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
	console.log(keyringFromKlaytnWalletKey)
}

testFunction()
```

在控制檯中運行代碼，如下所示。

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
SingleKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
```

#### 創建具有多個私人密鑰的 MultipleKeyring<a href="#creating-a-multiplekeyring-with-multiple-private-keys" id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

如果要使用多個私鑰，可以使用一個地址和多個私鑰創建一個[MultipleKeyring]（api/caver-wallet/keyring.md#multiplekeyring）。 下面的示例展示瞭如何創建具有多個私鑰的 [MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring) 。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	// Create a keyring with an address and private keys
	const keyring = caver.wallet.keyring.createWithMultipleKey('0x{address in hex}', [ '0x{private key1}', '0x{private key2}' ])
	console.log(keyring)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
MultipleKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_keys: [
		PrivateKey { _privateKey: '0x{private key1}' },
		PrivateKey { _privateKey: '0x{private key2}' } 
	]
}
```

可以看到，`_keys` 數組中有多個 PrivateKey 實例。 可以通過 `keyring.address` 和 `keyring.keys` 訪問實例內部定義的成員變量。

#### 創建帶有私鑰的基於角色的密鑰環<a href="#creating-a-rolebasedkeyring-with-role-based-private-keys" id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

要為每個 [role](../../../learn/accounts.md#roles) 使用不同的私鑰，可使用 `caver.wallet.keyring.createWithRoleBasedKey` 代替。 每個數組元素代表 [RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) 中描述的一個角色。 下面的示例展示瞭如何根據每個角色的不同密鑰創建 [RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) 實例。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	// Create a keyring with an address and private keys defined by each roles
	const keyring = caver.wallet.keyring.createWithRoleBasedKey('0x{address in hex}', [
		[ '0x{private key1}', '0x{private key2}', '0x{private key3}' ],
		[ '0x{private key4}'],
		[ '0x{private key5}', '0x{private key6}' ],
	])
	console.log(keyring)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
RoleBasedKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_keys: [ 
		[ 
			PrivateKey { _privateKey: '0x{private key1}' },
			PrivateKey { _privateKey: '0x{private key2}' },
			PrivateKey { _privateKey: '0x{private key3}' }
		],
		[ PrivateKey { _privateKey: '0x{private key4}' } ],
		[ 
			PrivateKey { _privateKey: '0x{private key5}' },
			PrivateKey { _privateKey: '0x{private key6}' }
		]
	]
}
```

從上面的輸出來看，鍵數組的第一個元素 `roleTransactionKey` 有三個私鑰實例，第二個元素 `roleAccountUpdateKey` 有一個私鑰實例。 而數組的最後一個元素 `roleFeePayerKey` 有兩個 PrivateKey 實例。

**注意**：調用與鑰匙圈（[caver.wallet.keyring](api/caver-wallet/keyring.md)）或錢包（[caver.wallet](api/caver-wallet/caver-wallet.md)）相關的函數不會影響實際的 kaia 區塊鏈平臺 (kaia)。

### 為 caver-js 添加關鍵字<a href="#adding-keyrings-to-caver-js" id="adding-keyrings-to-caver-js"></a>

您可以使用 caver-js 提供的內存錢包，輕鬆使用鑰匙圈。 下面的示例說明了如何使用密鑰實例和從 [Kaia 錢包] 導出的密鑰存儲文件（.../.../.../build/tools/wallets/kaia-wallet.md）向錢包添加密鑰。

:::note

開發時，最好使用一個與任何真實資金都不相關的賬戶。 好的方法是創建一個新的瀏覽器配置文件（在 Chrome、Brave、Firefox 等瀏覽器上），並在該瀏覽器上安裝 Kaia 錢包，而且永遠不要向該錢包匯款。

:::

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	// Using a keyring instance
	const keyring = caver.wallet.keyring.generate()
	caver.wallet.add(keyring)
	console.log(caver.wallet.getKeyring(keyring.address))

	// Using a keystore file
	const decrypted = caver.wallet.keyring.decrypt({ 
		version: 4,
		id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
		address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
		keyring: [
			{ 
				ciphertext: 'eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15',
				cipherparams: { iv: 'd688a4319342e872cefcf51aef3ec2da' },
				cipher: 'aes-128-ctr',
				kdf: 'scrypt',
				kdfparams: {
					dklen: 32,
					salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
					n: 4096,
					r: 8,
					p: 1
				},
				mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
			}
		]
	}, 'password')

	caver.wallet.add(decrypted)
	console.log(caver.wallet.getKeyring(decrypted.address))
}

testFunction()
```

在控制檯中運行

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x66391720b488a3fb2c7c69d99cd4cd6e23ca18e3',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
SingleKeyring {
	_address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
```

從上面的輸出結果來看，將密鑰添加到 `caver.wallet` 後，就可以從 `caver.wallet` 中查詢密鑰。

如果您有需要使用的地址和私鑰，可以通過 [caver.wallet.newKeyring](api/caver-wallet/caver-wallet.md#caverwalletgetkeyring) 輕鬆創建一個密鑰環，並將其直接添加到 [caver.wallet](api/caver-wallet/caver-wallet.md) 中。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	// Add to wallet with an address and a private key
	const addedSingle = caver.wallet.newKeyring('0x{address in hex}', '0x{private key1}')
	console.log(caver.wallet.getKeyring(addedSingle.address))

	// Add to wallet with an address and private keys
	const addedMultiple = caver.wallet.newKeyring('0x{address in hex}', ['0x{private key2}', '0x{private key3}', '0x{private key4}'])
	console.log(caver.wallet.getKeyring(addedMultiple.address))

	// Add to wallet with an address and private keys defined by each roles
	const addedRoleBased = caver.wallet.newKeyring('0x{address in hex}', [
		['0x{private key5}', '0x{private key6}', '0x{private key7}'],
		['0x{private key8}', '0x{private key9}'],
		['0x{private key10}', '0x{private key11}']
	])
	console.log(caver.wallet.getKeyring(addedRoleBased.address))
}

testFunction()
```

運行上述代碼會得到以下結果。 上述代碼的執行結果如下所示。 當使用私鑰執行 `caver.wallet.newKeyring` 時，一個帶有私鑰的 Keyring 實例就會創建並添加到 `caver.wallet` 中。 對於多個私鑰，會創建一個包含多個私鑰的 Keyring 實例。 如果為每個角色傳遞一個或多個私鑰作為參數，就會為每個角色創建一個帶有不同私鑰的 Keyring 實例，並將其添加到 `caver.wallet` 中。

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x651f6ae6b45750082b22805583acc989399c6552',
	_key: PrivateKey { _privateKey: '0x{private key1}' }
}
MultipleKeyring {
	_address: '0xce3ee92aeb4d600a41c98bdf92e8b337e186bf58',
	_keys: [ 
		PrivateKey { _privateKey: '0x{private key2}' },
		PrivateKey { _privateKey: '0x{private key3}' },
		PrivateKey { _privateKey: '0x{private key4}' }
    ]
}
RoleBasedKeyring {
	_address: '0x626d5b94ec76a105c5afa370bb7e59050a22b8b5',
	_keys: [ 
		[ 
			PrivateKey { _privateKey: '0x{private key5}' },
			PrivateKey { _privateKey: '0x{private key6}' },
			PrivateKey { _privateKey: '0x{private key7}' }
		],
		[ 
			PrivateKey { _privateKey: '0x{private key8}' },
			PrivateKey { _privateKey: '0x{private key9}' }
		],
		[ 
			PrivateKey { _privateKey: '0x{private key10}' },
			PrivateKey { _privateKey: '0x{private key11}' }
		]
	]
}
```

`caver.wallet.add` 或 `caver.wallet.newKeyring` 返回一個添加到 `caver.wallet` 的 Keyring 實例。

## 發送交易<a href="#sending-a-transaction" id="sending-a-transaction"></a>

本節將向您介紹如何在 Kairos Testnet 上使用 caver-js 發送 KAIA。

### 通過 Kairos 龍頭獲取 KAIA<a href="#getting-klay-via-kairos-faucet" id="getting-klay-via-kairos-faucet"></a>

如果您需要 KAIA 進行測試，可以從 [Kaia Wallet](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay) 獲取 Kairos testnet KAIA。 使用私鑰或密鑰存儲文件登錄 kaia 錢包，並通過龍頭接收 Kairos testnet KAIA 進行測試。

### 發送價值轉移交易<a href="#sending-a-value-transfer-transaction" id="sending-a-value-transfer-transaction"></a>

您可以使用 caver-js 錢包生成交易簽名。 您必須經過以下兩個步驟才能將交易發送到網絡。

1. 簽署交易
   - 如果要使用的密鑰已添加到 [caver.wallet](api/caver-wallet/caver-wallet.md)，則可以使用 `caver.wallet.sign` 函數簽名。
   - 如果單獨管理鑰匙圈而不將其添加到 `caver.wallet` 中，則可以通過 `transaction.sign` 函數簽署交易。
2. 通過 `caver.rpc.klay.sendRawTransaction`，向 kaia 發送已簽名事務的 RLP 編碼字符串。

**注意：** 發件人應有足夠數量的 KAIA。

#### 簽署交易

在向 kaia 發送交易之前，您應該先簽署交易。

下面是一個例子，說明在 [caver.wallet](api/caver-wallet/caver-wallet.md) 中添加密鑰後如何簽署交易。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	// Add a keyring to caver.wallet
	const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(keyring)

	// Create a value transfer transaction
	const valueTransfer = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x176ff0344de49c04be577a3512b6991507647f72',
		value: 1,
		gas: 30000,
	})

	// Sign the transaction via caver.wallet.sign
	await caver.wallet.sign(keyring.address, valueTransfer)

	const rlpEncoded = valueTransfer.getRLPEncoding()
	console.log(`RLP-encoded string: ${rlpEncoded}`)
}

testFunction()
```

上述代碼向 `caver.wallet` 添加了一個密鑰，創建了一個交易，並通過 `caver.wallet.sign` 簽署了該交易。

運行上述代碼會得到以下結果。 執行上述代碼後，事務的 RLP 編碼字符串如下所示。 (您得到的 RLP 編碼字符串輸出可能與下圖所示的字符串輸出不同）。

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### 向 kaia 發送已簽名交易的 RLP 編碼字符串

現在你可以像下面這樣向網絡發送已簽名的交易。 如果要運行下面的示例，請將 `0x{RLP-encoded string}` 替換為上述 `rlpEncoded` 的值。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const rlpEncoding = `0x{RLP-encoded string}`

	// Send the transaction using `caver.rpc.klay.sendRawTransaction`.
	const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoding)
	console.log(receipt)
}

testFunction()
```

運行上述代碼會得到以下結果。 執行上述代碼後，交易收據如下所示。

```bash
$ node ./test.js
{ 
	blockHash: '0xd20066b448da77a41a46fbf0856792b85b60c42213126f661f6434b5b1263072',
	blockNumber: '0x1efb',
	contractAddress: null,
	from: '0x09a08f2289d3eb3499868908f1c84fd9523fe11b',
	gas: '0x7530',
	...
	signatures: [
		{ 
			V: '0x4e43',
			R: '0x5737aa8c88f019a3ee184faed6d34d103f77773bd5434cb0328c11738c8d9755',
			S: '0x578b118f4400999e5232bd0860cfbdbf89622f6e11cc6bd9722a86767d2723b7'
		}
	],
	status: '0x1',
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	transactionHash: '0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113',
	transactionIndex: 0,
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x1'
}
```

如果您想在不使用 `caver.wallet` 的情況下籤署交易並將其發送到網絡，請參閱下面的示例。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	// Create a value transfer transaction
	const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	const valueTransfer = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x176ff0344de49c04be577a3512b6991507647f72',
		value: 1,
		gas: 30000,
	})

	// Sign the transaction via transaction.sign
	await valueTransfer.sign(keyring)

	// Send the transaction to the kaia using `caver.rpc.klay.sendRawTransaction`.
	const receipt = await caver.rpc.klay.sendRawTransaction(valueTransfer)
	console.log(receipt)
}

testFunction()
```

執行上述代碼後，就會像上一個示例一樣打印交易收據。

### 檢查收據<a href="#checking-receipts" id="checking-receipts"></a>

當您通過 [caver.rpc.klay.sendRawTransaction](api/caver-rpc/klay.md#caver-rpc-klay-sendrawtransaction) 向 kaia 傳輸事務時，您可以使用承諾或事件發射器來獲取事務收據。

下面的示例展示瞭如何使用承諾和事件發射器獲取收據。

```javascript
// Using a promise - async/await
const receipt = await caver.rpc.klay.sendRawTransaction(rawTransaction)
console.log(receipt)

// Using a promise
caver.rpc.klay.sendRawTransaction(rawTransaction).then(console.log)

// Using an event emitter
caver.rpc.klay.sendRawTransaction(rawTransaction).on('receipt', console.log)
```

如上例所述，您可以通過承諾和事件發射器獲取發送事務的結果。 transactionHash "字段在收據對象中定義。 您可以使用[caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) RPC 調用和`receipt.transactionHash`，在交易被納入區塊後的任何時間從網絡查詢交易的收據。 下面的示例展示瞭如何使用 [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) RPC 調用獲取收據。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const receipt = await caver.rpc.klay.getTransactionReceipt('0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a')
	console.log(receipt)
}

testFunction()
```

運行上述代碼會得到以下結果。 執行上述代碼後，交易收據如下所示。

```bash
$ node ./test.js
{ 
	blockHash: '0x65d041011440e04643c546eb8bbb1dcabb659c3b3216e01473cb0712e47b5f69',
	blockNumber: '0x20db',
	contractAddress: null,
	from: '0x09a08f2289d3eb3499868908f1c84fd9523fe11b',
	gas: '0x7530',
	...
	signatures: [
		{ 
			V: '0x4e43',
			R: '0xfabe48071a8b72f0c340b2ee9d948a496cce467aebe027159d66a175e6b4b5b4',
			S: '0x1d4e503f1b084cda15edeba6b7b8eba15057b9d2484f7f3d095c980c2d98f13'
		}
	],
	status: '0x1',
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	transactionHash: '0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a',
	transactionIndex: 0,
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x1'
}
```

交易結果可通過收據的 "狀態 "查詢。 有關返回值的詳細信息，請參閱 [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt)。 如果交易失敗，可以在收據的 `txError` 中查看更多有關錯誤的信息。 有關 `txError` 的更多信息，請參閱 [txError: Detailed Information of Transaction Failures]（.../transaction-error-codes.md）。

## 執行其他事務類型<a href="#executing-other-transaction-types" id="executing-other-transaction-types"></a>

Kaia 提供各種事務類型，以提高可擴展性和性能。 更多信息，請參閱 [事務]（.../.../.../learn/transactions/）。 本節將介紹一些可與 caver-js 配合使用的示例。

### 收費代表團<a href="#fee-delegation" id="fee-delegation"></a>

Kaia 提供 [費用委託]（.../.../.../learn/transactions/transactions.md#fee-delegation）功能。 下面是一個製作 RLP 編碼交易的示例，當您是此類交易的發送方時：

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const sender = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(sender)

	const feeDelegatedTx = caver.transaction.feeDelegatedValueTransfer.create({
		from: sender.address,
		to: '0x176ff0344de49c04be577a3512b6991507647f72',
		value: 5,
		gas: 50000,
	})

	await caver.wallet.sign(sender.address, feeDelegatedTx)

	const rlpEncoded = feeDelegatedTx.getRLPEncoding()
	console.log(rlpEncoded)
}

testFunction()
```

執行上述代碼後，將打印 RLP 編碼字符串。 (您得到的 RLP 編碼字符串輸出可能與下圖所示的字符串輸出不同）。

```bash
$ node ./test.js
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

在將 "feePayerSignatures"（付費者簽名）附加到由交易發送者簽名的 RLP 編碼字符串（"rawTransaction"（原始交易））之後，付費者就可以向 kaia 發送交易。 如果 `caver.wallet` 也有繳費人的密鑰，則可通過調用 `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`，將繳費人的簽名注入到 `feeDelegatedTx` 中。 否則，費用支付方必須從發送方簽名的 RLP 編碼字符串中創建一個 "feeDelegatedTx"，並在其上添加費用支付方的簽名，如下圖所示。 如果要運行下面的示例，請將 `0x{RLP-encoded string}` 替換為上述 `rlpEncoded` 的值。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(feePayer)

	const rlpEncoded = '0x{RLP-encoded string}'

	const feeDelegateTxFromRLPEncoding = caver.transaction.feeDelegatedValueTransfer.create(rlpEncoded)

	// Set the fee payer address.
	feeDelegateTxFromRLPEncoding.feePayer = feePayer.address
	await caver.wallet.signAsFeePayer(feePayer.address, feeDelegateTxFromRLPEncoding)

	console.log(feeDelegateTxFromRLPEncoding.getRLPEncoding())
}

testFunction()
```

執行上述代碼後，包括寄件人簽名和繳費人簽名在內的 RLP 編碼字符串將打印如下。 (您得到的輸出結果可能與下面顯示的字符串輸出結果不同）。

```bash
$ node ./test.js
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

現在，發送方和繳費方都對交易進行了簽名，並可通過網絡發送。 將 `0x{RLP-encoded string}` 替換為上述示例代碼輸出的 RLP 編碼字符串。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const rlpEncoded = '0x{RLP-encoded string}'
	const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoded)
	console.log(receipt)
}

testFunction()
```

運行上述代碼會得到以下結果。 通過上述代碼的執行結果，您可以查看 FeeDelegatedValueTransfer 交易的結果。

```bash
$ node ./test.js
{ 
	blockHash: '0xb6a76163c4c558f50bdae77968a0f35dcfececf78b5cb780c3514a30a1c0a864',
	blockNumber: '0xede',
	contractAddress: null,
	feePayer: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	feePayerSignatures: [
		{
			V: '0x4e44',
			R: '0x921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6e',
			S: '0x7b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79'
		}
	],
	from: '0xf5a9079f311f9ec55170af351627aff0c5d2e287',
	gas: '0xc350',
	...
	signatures: [
		{
			V: '0x4e43',
			R: '0xf4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cc',
			S: '0x35b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf0'
		}
	],
	status: '0x1',
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	transactionHash: '0x1878cc27b7f259a98d3248b41bffb6158640b4a07c503095deac1913fb3856c2',
	transactionIndex: 0,
	type: 'TxTypeFeeDelegatedValueTransfer',
	typeInt: 9,
	value: '0x5'
}
```

### 賬戶更新<a href="#account-update" id="account-update"></a>

如果要更改 kaia 帳戶的私鑰，需要記住 3 件重要的事情：

1. kaia 會驗證您發送給它的每一筆交易。
2. 驗證需要與您的私人密鑰完全對應的公鑰。
3. 因此，在將私鑰更改為新密鑰之前，必須先將舊公鑰更改為新密鑰。 新的公開密鑰必須來自新的私人密鑰。

牢記以上三點，你就可以按照以下步驟更改你的私人密鑰了：

1. 準備新私鑰，創建新鑰匙圈。
2. 根據需要的類型（單個鑰匙圈、多個鑰匙圈或基於角色的鑰匙圈）創建鑰匙圈。
3. 從新鑰匙圈生成一個賬戶實例。 該賬戶實例持有 kaia 賬戶的新公鑰。
4. 向 kaia 發送包含賬戶實例的 AccountUpdate 事務。
5. 最後，將舊鑰匙圈替換為步驟 2 中創建的新鑰匙圈。

詳情請查看 [Account Update]（api/caver-transaction/basic.md#accountupdate）。

要更改 AccountKey，必須在 `caver.transaction.accountUpdate` 的輸入參數對象中為 `account` 字段提供一個 [Account](api/caver.account.md)實例。 賬戶]（api/caver.account.md）實例包含 kaia 賬戶的地址和要更新的賬戶密鑰。

下面的代碼是一個示例代碼，用於更改 kaia 帳戶使用的私鑰，同時將 kaia 帳戶的 AccountKey 更改為 [AccountKeyPublic]（../../../learn/accounts.md#accountkeypublic）。 別忘了準備新的私人密鑰。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	let sender = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(sender)

	const newPrivateKey = caver.wallet.keyring.generateSingleKey()
	console.log(`new private key string: ${newPrivateKey}`)
	const newKeyring = caver.wallet.keyring.createWithSingleKey(sender.address, newPrivateKey)

	// create an Account instance
	const account = newKeyring.toAccount()

	const updateTx = caver.transaction.accountUpdate.create({
		from: sender.address,
		account: account,
		gas: 50000,
	})
	await caver.wallet.sign(sender.address, updateTx)
	const receipt = await caver.rpc.klay.sendRawTransaction(updateTx)
	console.log(receipt)

	// Update the keyring in caver.wallet for signing afterward.
	sender = caver.wallet.updateKeyring(newKeyring)
}

testFunction()
```

如果上述代碼執行成功，你就不能再使用舊私鑰來簽署任何與舊鑰匙圈有關的交易。 因此，您必須通過 `caver.wallet.updateKeyring(newKeyring)` 使用`newKeyring`更新舊鑰匙圈。 一旦更新，簽名將由新更新的私鑰完成。

運行上述代碼會得到以下結果。 在上述代碼的執行結果中，私鑰和新使用的賬戶更新結果打印如下。

```bash
$ node ./test.js
new private key string: 0x{private key}
{ 
	blockHash: '0x4c0221245e7c810cc19b05257e8d7cd34f24cc829f8787a832c08682640173f5',
	blockNumber: '0x26d6',
	contractAddress: null,
	from: '0xeec694a4143e05945823b216d0c62ab91c192a63',
	gas: '0xc350',
	gasPrice: '0x5d21dba00',
	gasUsed: 41000,
	key: '0x02a1024cc461670797071be16c34b22df1a3588653da5c1e9279b1d9e4b24fbcba07d8',
	...
	signatures: [
		{
			V: '0x4e43',
			R: '0xd0fa2d25711de4bfc3a7a6a660d307264fa3b2cacbb7eb71ab68f47661ebcfaf',
			S: '0x4652102241e61968988a22f9fa2d5d38d4e654d1f4b193fba5627c0856c9da7b'
		} 
	],
	status: '0x1',
	transactionHash: '0x4efdeeb1bb1e52ace11d64a19f564a973b36c29a0d85899a215621659b793665',
	transactionIndex: 0,
	type: 'TxTypeAccountUpdate',
	typeInt: 32
}
```

如何用多個（[AccountKeys]）更新 kaia 帳戶的 AccountKey？ 下面的示例解釋瞭如何創建一個帶有多個私鑰的 [賬戶](api/caver.account.md) 實例（您可以通過 [caver.account.create](api/caver.account.md#caver-account-create)創建一個帶有多個公鑰的 [賬戶](api/caver.account.md) 實例）。 同樣，在將創建的賬戶實例輸入事務對象內的 "賬戶 "字段後，其餘的更新過程與上例相同。

首先，讓我們創建一個使用 [AccountKeyWeightedMultiSig] 更新的賬戶實例（.../.../.../learn/accounts.md#accountkeyweightedmultisig）。 對於 [AccountKeyWeightedMultiSig](../../../learn/accounts.md#accountkeyweightedmultisig) ，必須為每個密鑰定義閾值和權重。 為此，請使用 [caver.account.weightedMultiSigOptions](api/caver.account.md#weightedmultisigoptions). 第一個參數是閾值，第二個參數是包含每個鍵權重的數組。

```javascript
// Create an account instance with three private keys using AccountKeyWeightedMultiSig
const newPrivateKeys = caver.wallet.keyring.generateMultipleKeys(3)
const newKeyring = caver.wallet.keyring.createWithMultipleKey(sender.address, newPrivateKeys)

// threshold = 3, the weights of the three keys = [1, 2, 1]
const options = new caver.account.weightedMultiSigOptions(3, [1, 2, 1])

const account = newKeyring.toAccount(options)
```

現在，讓我們使用 [AccountKeyRoleBased](../../../learn/accounts.md#accountkeyrolebased) 更新 AccountKey。 [AccountKeyRoleBased](.../.../.../learn/accounts.md#accountkeyrolebased)是一種 "AccountKey "類型，定義了每個[role](.../../../learn/accounts.md#roles)要使用的密鑰。

```javascript
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([1, 1, 1])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const account = newKeyring.toAccount()
```

上面的 AccountKeyRoleBased 就是為每個角色使用一個公鑰的例子。 從上面的代碼中可以看到，每個密鑰對應一個私人密鑰。 如果要為每個角色使用多個私鑰，則必須為每個角色定義 [caver.account.weightedMultiSigOptions](api/caver.account.md#weightedmultisigoptions) 如下所示。

```javascript
// Create an account instance with [3, 2, 3] keys for each role using AccountKeyRoleBased
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([3, 2, 3])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const options = [
	// thresold = 4, weights of keys = [2, 2, 4] for roleTransactionKey
	new caver.account.weightedMultiSigOptions(4, [2, 2, 4]),
	// threshold = 2, weights of keys = [1, 1]
	new caver.account.weightedMultiSigOptions(2, [1, 1]),
	// threshold = 3, weights of keys = [1, 1, 1]
	new caver.account.weightedMultiSigOptions(3, [1, 1, 1]),
]

const account = newKeyring.toAccount(options)
```

如果要將 AccountKey 更新為 [AccountKeyLegacy](../../../learn/accounts.md#accountkeylegacy) 或 [accountKeyFail](././././learn/accounts.md#accountkeyfail)，請如下所示創建一個 Account 實例，並將其分配給事務的`account`字段。

```javascript
// Create an account with AccountKeyLegacy
const accountWithLegacyKey = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address)

// Create an account with AccountKeyFail
const accountWithFailKey = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### 智能合約<a href="#smart-contract" id="smart-contract"></a>

通過 [caver.contract](api/caver.contract.md) 軟件包，可以輕鬆與 kaia 上的智能合約進行交互。 當給出智能合約的底層 ABI（應用程序二進制接口）時，它會自動將智能合約的所有方法轉換為 javascript 調用。 這樣，您就可以像使用 JavaScript 對象一樣與智能合約進行交互。

首先，我們製作一個簡單的實體示例，如下所示。 創建一個 "test.sol "文件，並寫下以下示例。

```
pragma solidity ^0.5.6;

contract KVstore {
    mapping(string=>string) store;
    function get(string memory key) public view returns (string memory) {
        return store[key];
    }
    function set(string memory key, string memory value) public {
        store[key] = value;
    }
}
```

現在，我們可以編譯智能合約，獲取其字節碼和 ABI。

```
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**注意**：要編譯智能合約，必須安裝 [solidity 編譯器](https://solidity.readthedocs.io/en/develop/installing-solidity.html)。

對於智能合約的部署，您可以使用 [caver.contract](api/caver.contract.md) 進行部署，也可以使用 [caver.transaction.smartContractDeploy](api/caver-transaction/basic.md#smartcontractdeploy), [caver.transaction.feeDelegatedSmartContractDeploy](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) 或 [caver.transaction.smartContractDeploy](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) 進行部署。feeDelegatedSmartContractDeploy](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy)或[caver.transaction.feeDelegatedSmartContractDeployWithRatio](api/caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio)交易。 下面是使用 [caver.contract] 的示例（api/caver.contract.md）。

您可以使用編譯智能合約的結果創建一個合約實例，如下所示。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

	const contractInstance = caver.contract.create(abi)
	console.log(contractInstance)
	console.log(contractInstance.options.address)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get: [Function: bound _createTxObject],
		'0x693ec85e': [Function: bound _createTxObject],
		'get(string)': [Function: bound _createTxObject],
		set: [Function: bound _createTxObject],
		'0xe942b516': [Function: bound _createTxObject],
		'set(string,string)': [Function: bound _createTxObject]
	},
  events: { allEvents: [Function: bound ] },
  _address: null,
  _jsonInterface: [ ... ],
  _keyrings: KeyringContainer { ... }
}
null
```

從上面的輸出可以看出，這些方法是通過合同實例內部的 abi 管理的。 由於尚未部署，因此可以看到 `contractInstance.options.address` 的輸出結果為空。

如果智能合約已經部署，並且您知道部署智能合約的合約地址，請將合約地址傳給第二個參數，如下所示。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]
	
	const contractInstance = caver.contract.create(abi, '0x3466D49256b0982E1f240b64e097FF04f99Ed4b9')

	console.log(contractInstance)
	console.log(contractInstance.options.address)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get: [Function: bound _createTxObject],
		'0x693ec85e': [Function: bound _createTxObject],
		'get(string)': [Function: bound _createTxObject],
		set: [Function: bound _createTxObject],
		'0xe942b516': [Function: bound _createTxObject],
		'set(string,string)': [Function: bound _createTxObject]
	},
  events: { allEvents: [Function: bound ] },
  _address: '0x3466D49256b0982E1f240b64e097FF04f99Ed4b9',
  _jsonInterface: [ ... ],
  _keyrings: KeyringContainer { ... }
}
0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

由於該合約實例接收到了智能合約的地址，因此會將合約地址存儲在 `contractInstance.options.address` 中。

如果創建了合約實例，您可以通過將字節碼傳遞到 `data` 字段來部署它，如下圖所示。

請注意，[caver.contract](api/caver.contract.md) 會發送事務以供部署和執行。 它使用 `caver.wallet` 中的密鑰來簽署交易。 使用的鑰匙圈必須事先添加到 `caver.wallet` 中。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(deployer)
	
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    const byteCode =
        '608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029'

	const contractInstance = caver.contract.create(abi)
	
	const deployedInstance = await contractInstance.deploy({
		from: deployer.address,
		gas: 1500000,
	}, byteCode)

	console.log(deployedInstance)
	console.log(deployedInstance.options.address)
}

testFunction()
```

在上面的代碼中，"deployer "會將合約部署到 kaia，並返回已部署的合約實例。

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get: [Function: bound _createTxObject],
		'0x693ec85e': [Function: bound _createTxObject],
		'get(string)': [Function: bound _createTxObject],
		set: [Function: bound _createTxObject],
		'0xe942b516': [Function: bound _createTxObject],
		'set(string,string)': [Function: bound _createTxObject]
	},
  events: { allEvents: [Function: bound ] },
  _address: '0x3466D49256b0982E1f240b64e097FF04f99Ed4b9',
  _jsonInterface: [ ... ],
  _keyrings: KeyringContainer { ... }
}
0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

要通過費用委託交易部署智能合約，請像下面的示例一樣定義 "feeDelegation "和 "feePayer"：

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function deployWithFeeDelegation() {
    const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(deployer)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    const byteCode =
        '608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029'

	const contractInstance = caver.contract.create(abi)

	const deployedInstance = await contractInstance.deploy({
		from: deployer.address,
		feeDelegation: true,
		feePayer: feePayer.address,
		gas: 1500000,
	}, byteCode)
	
	console.log(deployedInstance)
	console.log(deployedInstance.options.address)
}
```

如果您想在通過 `caver.contract` 部署智能合約時發送發送方和付費方分別簽名的交易，請參考下面的代碼：

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function deployWithFeeDelegation() {
    const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(deployer)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    const byteCode =
        '608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029'

	const contractInstance = caver.contract.create(abi)

	const signed = await contractInstance.sign({
		from: deployer.address,
		feeDelegation: true,
		gas: 1500000,
	}, 'constructor', byteCode)
	
	await caver.wallet.signAsFeePayer(feePayer.address, signed)

	const receipt = await caver.rpc.klay.sendRawTransaction(signed)

	const deployed = caver.contract.create(abi, receipt.contractAddress)
}
```

A smart contract can be executed using one of the followings, depending on the type of contract executing transaction: `Contract` class in `caver.contract` or [caver.transaction.smartContractExecution](api/caver-transaction/basic.md#smartcontractexecution), [caver.transaction.feeDelegatedSmartContractExecution](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution), or [caver.transaction.feeDelegatedSmartContractExecutionWithRatio](api/caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio). 發送執行智能合約的交易：

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(keyring)

	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]
	
	const contractInstance = caver.contract.create(abi, '0x{address in hex}')
	const receipt = await contractInstance.send({ from: keyring.address, gas: '0x4bfd200' }, 'set', 'testKey', 'testValue')
	console.log(receipt)
}

testFunction()
```

執行上述代碼後，執行 `set` 的事務結果如下。

```bash
$ node ./test.js
{ 
	blockHash: '0x610336d43644abc5ab71156f7334ff67deabdd8de27778faa9dec99d225927e6',
  blockNumber: 4724,
  contractAddress: null,
  from: '0xbbfa9e3f76ddafedc28197e0f893366dd3c5c74a',
  gas: '0x4bfd200',
  gasPrice: '0x5d21dba00',
  gasUsed: 62351,
  input: '0xe942b...',
  ...
  status: true,
  to: '0x3466d49256b0982e1f240b64e097ff04f99ed4b9',
  transactionHash: '0x3a354703ab4a7b32492edab454b446dd3e92eec81ecbdaf2c3d84ffdd5cf9948',
  transactionIndex: 0,
  type: 'TxTypeSmartContractExecution',
  typeInt: 48,
  value: '0x0',
  events: {}
}
```

要通過費用委託交易執行智能合約，請像下面的示例一樣定義 "feeDelegation "和 "feePayer"：

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function executionWithFeeDelegation() {
    const executor = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(executor)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    // Pass contract address as a second parameter
    const contractInstance = caver.contract.create(abi, '0x{address in hex}')

	const receipt = await contractInstance.send({
        from: executor.address,
		gas: 1000000,
		feeDelegation: true,
		feePayer: feePayer.address,
	}, 'set', 'testKey', 'testValue')
    console.log(receipt)
}
```

如果您想在通過 `caver.contract` 執行智能合約時發送一個發送方和支付方分別簽名的交易，請參考下面的代碼：

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function deployWithFeeDelegation() {
    const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(deployer)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

	const contractInstance = caver.contract.create(abi)

	const signed = await contractInstance.sign({
		from: deployer.address,
		feeDelegation: true,
		gas: 1500000,
	}, 'set', 'testKey', 'testValue')
	
	await caver.wallet.signAsFeePayer(feePayer.address, signed)

	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)
}
```

加載合約實例並調用其中一個函數：

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]
	const contractInstance = caver.contract.create(abi, '0x{smart contract address}')

	const value = await contractInstance.call('get', 'testKey')
	console.log(value)
}

testFunction()
```

執行上述代碼後，輸出值如下所示。

```bash
$ node ./test.js
testValue
```

如需瞭解更多信息，請參閱 [caver.contract]（api/caver.contract.md）。

## 發送有多個簽名人的交易<a href="#sending-a-transaction-with-multiple-signers" id="sending-a-transaction-with-multiple-signers"></a>

如果 kaia 賬戶的 AccountKey 是 AccountKeyMultiSig 或 AccountKeyRoleBased，則管理每個密鑰的人可以不同。

本節介紹在有多個簽名者的情況下如何收集簽名和發送交易。

要運行此示例，需要使用 [AccountKeyWeightedMultiSig] 更新用於測試的 kaia 帳戶的 AccountKey(../../../learn/accounts.md#accountkeyweightedmultisig) 。 請參閱 [賬戶更新](#account-update) 瞭解如何更新您的 kaia 賬戶。

### 按順序簽署<a href="#signing-sequentially" id="signing-sequentially"></a>

使用 `caver.wallet` 或交易的 `sign` 函數簽署交易時，簽名（或付費人簽名）會在交易中定義（或附加）。 您可以調用已簽名事務實例的 `transaction.getRLPEncoding()` 函數，獲取包含簽名（和付費者簽名）的 RLP 編碼字符串（`rawTransaction`）。

下面的示例展示瞭如何使用多個私鑰按順序簽署交易。 假設發送此交易的賬戶的 AccountKey 是由兩個公鑰組成的 AccountKeyWeightedMultiSig，這意味著 kaia 賬戶可以使用兩個私鑰串，每個用戶一個私鑰。 這是兩個用戶共享同一個 kaia 帳戶的情況。

在下面的示例中，用戶 1 和用戶 2 創建了一個要使用的 `Keyring` 實例。 之後，各自使用自己的密鑰來簽署交易。 下面的示例使用 `transaction.sign` 進行簽名。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const user1 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key1}')
	const user2 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key2}')

	const transaction = caver.transaction.valueTransfer.create({
		from: user1.address,
		to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
		value: 1,
		gas: 70000,
	})

	await transaction.sign(user1)
	console.log(transaction.signatures)

	await transaction.sign(user2)
	console.log(transaction.signatures)
}

testFunction()
```

運行上述代碼會得到以下結果。 從上面代碼的執行結果來看，如果用戶 1 簽名，就會創建一個簽名。 如果用戶 2 簽名，則附加用戶 2 的簽名。 [簽名數據](api/caver-wallet/keyring.md#signaturedata) 是一個存儲簽名的對象。

```bash
$ node ./test.js
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' }
]
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' },
	SignatureData { _v: '0x4e44', _r: '0xd6a94...', _s: '0x72dc8...' }
]
```

然後，讓我們看看如何在不共享同一事務對象的情況下按順序簽名。 在下面的示例中，用戶 1 將已簽名事務的 getRLPEncoding 函數產生的 RLP 編碼字符串傳遞給用戶 2。

下面的代碼解釋瞭如何使用 RLP 編碼字符串簽署和附加簽名。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	// Create user1's keyring
	const user1 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key1}')
	
	// Create a value transfer transaction
	const transaction = caver.transaction.valueTransfer.create({
		from: user1.address,
		to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
		value: 1,
		gas: 70000,
	})
	
	// Sign the transaction
	await transaction.sign(user1)

	// Create user2's keyring
	const user2 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key2}')

	// Create a value transfer transaction from the RLP-encoded string
	const rlpEncoding = transaction.getRLPEncoding()
	const transactionFromRLP = caver.transaction.valueTransfer.create(rlpEncoding)

	await transactionFromRLP.sign(user2)
	console.log(transactionFromRLP.signatures)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' },
	SignatureData { _v: '0x4e44', _r: '0xd6a94...', _s: '0x72dc8...' }
]
```

如果運行上述代碼，可以看到用戶 2 的簽名已添加到 `transactionFromRLP.signatures` 中，其中總共包含兩個簽名。

所有用戶簽名後，通過 `await caver.rpc.klay.sendRawTransaction(transactionFromRLP)`向網絡發送事務。

如果您發送的是費用委託交易，而費用支付者使用多個密鑰，您可以使用 `caver.wallet.signAsFeePayer`繼續上述邏輯。

### 合併已簽名的原始交易<a href="#combining-signed-rawtransactions" id="combining-signed-rawtransactions"></a>

如果從幾個人那裡收到多個已簽名的 RLP 編碼原始事務字符串，可以將它們合併為一個包含所有簽名的 RLP 編碼原始事務字符串。

下面的示例顯示瞭如何合併和發送 RLP 編碼的事務。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const vt = caver.transaction.valueTransfer.create({
		from: '0x0fa355263f37f5a54d9179452baa8b63b8b2cdde',
		to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
		value: 1,
		gas: 70000,
	})
	const rlpEncodedStrings = [
		'0x08f87f018505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef847f845824e44a01aa72b883ca540c8a63de244cd061ec4f9efb139541e8db304c07ec27bc9d272a06a4ca54f6269f2ddfe3648eb9ed57b0c5739f0077e1a38449f3ae3cc0b20dc3e',
		'0x08f8c6018505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef88ef845824e44a01aa72b883ca540c8a63de244cd061ec4f9efb139541e8db304c07ec27bc9d272a06a4ca54f6269f2ddfe3648eb9ed57b0c5739f0077e1a38449f3ae3cc0b20dc3ef845824e43a0fd76dfc53c812ec6aa860076f731e3913936088a1518cc34f2d176bcbe0ac772a071491c938458fffe106dde485fc8b26cbebe8a517c46bd185b126930f480d773',
		'0x08f8c6018505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef88ef845824e44a01aa72b883ca540c8a63de244cd061ec4f9efb139541e8db304c07ec27bc9d272a06a4ca54f6269f2ddfe3648eb9ed57b0c5739f0077e1a38449f3ae3cc0b20dc3ef845824e43a021e84a4740b374cdcf0cc38f93225f6d2f77388a9d90302d47b4f3ed84e4db5fa072ff5e77d2506d5222081c4d2a341c6ee5d258500030564f985951472f247b7d',
	]
	const combined = vt.combineSignedRawTransactions(rlpEncodedStrings)
	console.log(combined)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
0x08f9010d808505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef8d5f8458207f5a094ce13c39d25d44ad1d07ba2fd89f476c4dc6eef6071a2ef1f496f9b04d049e5a00f7abddd548998b0a55e53600a48286c38262fffc6c153a64e8f65a77c11c722f8458207f6a0ceeea7287b2670719d8ac15cf3b21b36fcaf74d58cce99935ce17e100064037aa0499067788d5db5e7c09ed7bfe19764d66684abc06b81e8f54ea254377bc81066f8458207f5a05c3ba89336c7d84d4ce08104cfd6f7ef33cd9f29766a1955baae8bcf964fd50fa015accbbce6bb11847a3b0660491775d64ef6d692ea709b768f64f12968c09240
```

運行上述代碼後，就會輸出一個 RLP 編碼的原始事務字符串，其中包含所有簽名信息。

執行 "combineSignedRawTransactions "時，除了簽名和事務實例中的可選變量外，要合併的簽名 RLP 編碼原始事務字符串必須完全相同。 在基礎事務實例（"combineSignedRawTransactions "的調用者）中沒有任何給定值的可選變量，將與接下來要合併的原始事務字符串中的相應變量進行置換。 如果要合併的所有原始事務字符串（包括其中的可選變量值）不一致，就會發生錯誤。

CombineSignedRawTransactions 的結果是返回一個 RLP 編碼字符串，其中包含所有簽名（如果交易是收費委託交易，還包括收費人簽名）。 您可以通過 `await caver.rpc.klay.sendRawTransaction(combined)`向網絡發送事務。

## 檢測 KCT 接口的實施情況<a href="#detecting-implementation-of-kct-interfaces" id="detecting-implementation-of-kct-interfaces"></a>

caver.kct "提供的函數可返回有關給定的 KCT 令牌合約實現了哪些接口的信息。 使用它，你可以看到在 kaia 上部署的 KCT 令牌合約實現了哪個接口。

### 檢測 KIP-7 接口<a href="#detecting-kip-7-interfaces" id="detecting-kip-7-interfaces"></a>

為了檢測 KIP-7 令牌合約實現的接口，可以使用 `caver.kct.kip7.detectInterface(contractAddress)` 或 `kip7.detectInterface()`。

下面的代碼說明了如何使用 `caver.kct.kip7`中提供的靜態方法檢測在 kaia 上部署的 KIP-7 令牌合約的已實現接口。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const result = await caver.kct.kip7.detectInterface('0x{address in hex}')
	console.log(result)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}
```

下面是如何使用 KIP7 成員方法檢測在 kaia 上部署的 KIP-7 令牌合約的已實施接口的代碼。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const kip7 = new caver.kct.kip7('0x{address in hex}')
	const result = await kip7.detectInterface()
	console.log(result)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}
```

### 檢測 KIP-17 接口<a href="#detecting-kip-17-interfaces" id="detecting-kip-17-interfaces"></a>

為了檢測 KIP-17 令牌合約實現的接口，可以使用 `caver.kct.kip17.detectInterface(contractAddress)` 或 `kip17.detectInterface()`。

下面是一段代碼，說明如何使用 `caver.kct.kip17` 中提供的靜態方法檢測在 kaia 上部署的 KIP-17 令牌合約的已實現接口。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const result = await caver.kct.kip17.detectInterface('0x{address in hex}')
	console.log(result)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
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

下面是如何使用 KIP17 的成員方法檢測在 kaia 上部署的 KIP-17 令牌合約的已實現接口的代碼。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const kip17 = new caver.kct.kip17('0x{address in hex}')
	const result = await kip17.detectInterface()
	console.log(result)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
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

### 檢測 KIP-37 接口<a href="#detect-kip-37-interfaces" id="detect-kip-37-interfaces"></a>

為了檢測 KIP-37 令牌合約實現的接口，可以使用 `caver.kct.kip37.detectInterface(contractAddress)` 或 `kip37.detectInterface()`。

下面的代碼說明了如何使用 `caver.kct.kip37`中提供的靜態方法檢測在 kaia 上部署的 KIP-37 令牌合約的已實現接口。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const result = await caver.kct.kip37.detectInterface('0x{address in hex}')
	console.log(result)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

下面是如何使用 KIP37 的成員方法檢測在 kaia 上部署的 KIP-37 令牌合約的已實施接口的代碼。

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function testFunction() {
	const kip37 = new caver.kct.kip37('0x{address in hex}')
	const result = await kip37.detectInterface()
	console.log(result)
}

testFunction()
```

運行上述代碼會得到以下結果。

```bash
$ node ./test.js
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## 樣本項目<a href="#sample-projects" id="sample-projects"></a>

使用 caver-js 開發的 DApp（區塊鏈應用程序）示例項目如下：

- [Count DApp](../../../build/tutorials/count-dapp/count-dapp.md)
- [Klaystagram](../../../build/tutorials/klaystagram/klaystagram.md)

## 故障排除<a href="#troubleshooting" id="troubleshooting"></a>

- **錯誤：無法解析 'fs'** 在網絡瀏覽器中使用 caver-js 構建過程中出現：

  - 添加以下 webpack 配置

  ```
  module.exports = {
   	...
   	node: {
   		fs: 'empty',
   	},
   	...
   }
  ```

  如果使用 Next.js 網絡框架，可以按如下方式在**next.config.json**文件中添加 webpack 配置：

  ```
  module.exports = {
   	webpack: (config, { isServer }) => {
   		if (!isServer) {
   			config.node = {
   				fs: 'empty'
   			}
   		}
   		return config
   	}
   }
  ```

## 鏈接<a href="#links" id="links"></a>

- caver-java [GitHub 倉庫](https://github.com/kaiachain/caver-js)
- caver-js on [npm](https://www.npmjs.com/package/caver-js)
