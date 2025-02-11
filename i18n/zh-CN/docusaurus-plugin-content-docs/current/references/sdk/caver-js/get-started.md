# 新手指南

本文档适用于使用 caver-js v1.5.0 或更高版本的开发人员。

## 先决条件<a href="#prerequisites" id="prerequisites"></a>

### 依赖关系<a href="#dependencies" id="dependencies"></a>

使用 caver-js 库需要以下软件包。

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [gcc-c++](https://gcc.gnu.org/)
- [Solidity compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

**注意**\* caver-js 可在 Node.js 12 和 14 版本上运行。 推荐的版本如下

- lts/erbium ([12.21.0](https://nodejs.org/dist/latest-v12.x/))
- lts/fermium ([14.16.0](https://nodejs.org/dist/latest-v14.x/))

如果使用不同版本的 Node（例如 Node v15），请使用 Node Version Manager([nvm](https://github.com/nvm-sh/nvm)) 安装并使用 caver-js 支持的版本。

### 安装<a href="#installation" id="installation"></a>

要试用它，请使用以下命令通过 npm 安装 caver-js：

```
$ npm install caver-js
```

**注意**：package.json`文件应存在于同一安装路径中。 如果不存在，可通过`npm init`生成`package.json\`。

要安装特定版本的 caver-js，请尝试执行以下命令：

```
$ npm install caver-js@X.X.X
```

## 从 caver-js 开始<a href="#starting-with-caver-js" id="starting-with-caver-js"></a>

完成 caver-js 安装后，就可以使用 caver-js 连接 kaia 节点了。

要练习下面的示例，首先在工作目录中创建一个测试文件。

```bash
$ touch test.js
```

您可以看到在工作目录中创建的 `test.js` 文件。

在 test.js 中编写以下代码。

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

运行上述代码会得到以下结果。

```bash
$ node ./test.js
kaia/v1.4.0/linux-amd64/go1.14.1
```

如果看到如上所示的 console.log 输出，请继续以下步骤。 版本号可能因所连接的 kaia 节点版本不同而不同。

### 连接 kaia 节点<a href="#connecting-to-a-klaytn-node" id="connecting-to-a-klaytn-node"></a>

您可以导入 caver-js 模块，并将其连接到 Kairos 测试网络中的 kaia 节点，如下图所示：

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')
```

如果运行的是 EN，可以通过更改主机和端口将其连接到自己的节点，如下所示：

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')
```

## 管理 Keyrings <a href="#managing-keyrings" id="managing-keyrings"></a>

[Keyring](api/caver-wallet/keyring.md)是一个包含 kaia 账户地址和私钥的结构。

根据所存储密钥的类型，[Keyring](api/caver-wallet/keyring.md) 可分为三种类型：[SingleKeyring](api/caver-wallet/keyring.md#singlekeyring) 用于存储一个地址和一个私人钥匙，[MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring) 用于存储一个地址和多个私人钥匙，[RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) 用于存储一个地址和每个角色的一个或多个私人钥匙。

[SingleKeyring](api/caver-wallet/keyring.md#singlekeyring)在内部定义了 "key "属性，该 "key "存储一个私人密钥。

[MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring)在内部定义了 "keys "属性，该 "keys "以数组形式实现，用于存储多个私钥。

RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring)中定义的`keys`属性是以二维数组的形式实现的（空`keys`看起来像`[ [], [], [] ]`），每个[role](../../../learn/accounts.md#roles)可以包含多个键。 数组的第一个元素填入用于 `roleTransactionKey` 的私钥，第二个元素填入用于 `roleAccountUpdateKey` 的私钥，第三个元素填入用于 `roleFeePayerKey` 的私钥。

### 创建Keyring<a href="#creating-a-keyring" id="creating-a-keyring"></a>

#### 生成 SingleKeyring <a href="#generating-a-singlekeyring" id="generating-a-singlekeyring"></a>

如下图所示，您可以随机生成一个keyring。

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

运行上述代码会得到以下结果。

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x3d263c3c0df60c5516f932d244531742f45eed5c',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
```

执行结果如上图所示。 可以通过 `keyring.address` 和 `keyring.key` 访问实例内部定义的成员变量。

#### 从私人密钥创建SingleKeyring<a href="#creating-a-singlekeyring-from-private-key" id="creating-a-singlekeyring-from-private-key"></a>

此外，如果你拥有特定的私人密钥，还可以用它创建一个钥匙圈，如下图所示。

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

运行上述代码会得到以下结果。

```bash
$ node ./test.js
SingleKeyring {
	_address: '0xf5a9079f311f9ec55170af351627aff0c5d2e287',
	_key: PrivateKey { _privateKey: '0x{private key}' } 
}
```

caver.wallet.keyring.createFromPrivateKey "的结果，就像上面 "caver.wallet.keyring.generate "的结果一样，是一个[SingleKeyring](api/caver-wallet/keyring.md#singlekeyring)实例，其中定义了一个地址和 "keyring.key "中的一个\[PrivateKey]实例。

#### 使用私钥和地址创建 SingleKeyring <a href="#creating-a-singlekeyring-with-a-private-key-and-an-address" id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

如果 kaia 账户的私钥与地址不相关联，则可以使用给定的地址和私钥创建一个密钥环，如下所示。

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

在控制台中运行代码，如下所示。

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

#### 创建具有多个私人密钥的 MultipleKeyring<a href="#creating-a-multiplekeyring-with-multiple-private-keys" id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

如果要使用多个私钥，可以使用一个地址和多个私钥创建一个[MultipleKeyring]（api/caver-wallet/keyring.md#multiplekeyring）。 下面的示例展示了如何创建具有多个私钥的 [MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring) 。

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

运行上述代码会得到以下结果。

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

可以看到，`_keys` 数组中有多个 PrivateKey 实例。 可以通过 `keyring.address` 和 `keyring.keys` 访问实例内部定义的成员变量。

#### 创建带有私钥的基于角色的密钥环<a href="#creating-a-rolebasedkeyring-with-role-based-private-keys" id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

要为每个 [role](../../../learn/accounts.md#roles) 使用不同的私钥，可使用 `caver.wallet.keyring.createWithRoleBasedKey` 代替。 每个数组元素代表 [RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) 中描述的一个角色。 下面的示例展示了如何根据每个角色的不同密钥创建 [RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) 实例。

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

运行上述代码会得到以下结果。

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

从上面的输出来看，键数组的第一个元素 `roleTransactionKey` 有三个私钥实例，第二个元素 `roleAccountUpdateKey` 有一个私钥实例。 而数组的最后一个元素 `roleFeePayerKey` 有两个 PrivateKey 实例。

**注意**：调用与钥匙圈（[caver.wallet.keyring](api/caver-wallet/keyring.md)）或钱包（[caver.wallet](api/caver-wallet/caver-wallet.md)）相关的函数不会影响实际的 kaia 区块链平台 (kaia)。

### 为 caver-js 添加关键字<a href="#adding-keyrings-to-caver-js" id="adding-keyrings-to-caver-js"></a>

您可以使用 caver-js 提供的内存钱包，轻松使用钥匙圈。 下面的示例说明了如何使用密钥实例和从 [Kaia 钱包] 导出的密钥存储文件（.../.../.../build/tools/wallets/kaia-wallet.md）向钱包添加密钥。

:::note

开发时，最好使用一个与任何真实资金都不相关的账户。 好的方法是创建一个新的浏览器配置文件（在 Chrome、Brave、Firefox 等浏览器上），并在该浏览器上安装 Kaia 钱包，而且永远不要向该钱包汇款。

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

在控制台中运行

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

从上面的输出结果来看，将密钥添加到 `caver.wallet` 后，就可以从 `caver.wallet` 中查询密钥。

如果您有需要使用的地址和私钥，可以通过 [caver.wallet.newKeyring](api/caver-wallet/caver-wallet.md#caverwalletgetkeyring) 轻松创建一个密钥环，并将其直接添加到 [caver.wallet](api/caver-wallet/caver-wallet.md) 中。

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

运行上述代码会得到以下结果。 上述代码的执行结果如下所示。 当使用私钥执行 `caver.wallet.newKeyring` 时，一个带有私钥的 Keyring 实例就会创建并添加到 `caver.wallet` 中。 对于多个私钥，会创建一个包含多个私钥的 Keyring 实例。 如果为每个角色传递一个或多个私钥作为参数，就会为每个角色创建一个带有不同私钥的 Keyring 实例，并将其添加到 `caver.wallet` 中。

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

`caver.wallet.add` 或 `caver.wallet.newKeyring` 返回一个添加到 `caver.wallet` 的 Keyring 实例。

## 发送交易<a href="#sending-a-transaction" id="sending-a-transaction"></a>

本节将向您介绍如何在 Kairos Testnet 上使用 caver-js 发送 KAIA。

### 通过 Kairos 龙头获取 KAIA<a href="#getting-klay-via-kairos-faucet" id="getting-klay-via-kairos-faucet"></a>

如果您需要 KAIA 进行测试，可以从 [Kaia Faucet](../../../build/get-started/getting-kaia.md#kairos-testnet-and-faucet) 获取 Kairos testnet KAIA。

### 发送价值转移交易<a href="#sending-a-value-transfer-transaction" id="sending-a-value-transfer-transaction"></a>

您可以使用 caver-js 钱包生成交易签名。 您必须经过以下两个步骤才能将交易发送到网络。

1. 签署交易
   - 如果要使用的密钥已添加到 [caver.wallet](api/caver-wallet/caver-wallet.md)，则可以使用 `caver.wallet.sign` 函数签名。
   - 如果单独管理钥匙圈而不将其添加到 `caver.wallet` 中，则可以通过 `transaction.sign` 函数签署交易。
2. 通过 `caver.rpc.klay.sendRawTransaction`，向 kaia 发送已签名事务的 RLP 编码字符串。

**注意：** 发件人应有足够数量的 KAIA。

#### 签署交易

在向 kaia 发送交易之前，您应该先签署交易。

下面是一个例子，说明在 [caver.wallet](api/caver-wallet/caver-wallet.md) 中添加密钥后如何签署交易。

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

上述代码向 `caver.wallet` 添加了一个密钥，创建了一个交易，并通过 `caver.wallet.sign` 签署了该交易。

运行上述代码会得到以下结果。 执行上述代码后，事务的 RLP 编码字符串如下所示。 (您得到的 RLP 编码字符串输出可能与下图所示的字符串输出不同）。

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### 向 kaia 发送已签名交易的 RLP 编码字符串

现在你可以像下面这样向网络发送已签名的交易。 如果要运行下面的示例，请将 `0x{RLP-encoded string}` 替换为上述 `rlpEncoded` 的值。

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

运行上述代码会得到以下结果。 执行上述代码后，交易收据如下所示。

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

如果您想在不使用 `caver.wallet` 的情况下签署交易并将其发送到网络，请参阅下面的示例。

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

执行上述代码后，就会像上一个示例一样打印交易收据。

### 检查收据<a href="#checking-receipts" id="checking-receipts"></a>

当您通过 [caver.rpc.klay.sendRawTransaction](api/caver-rpc/klay.md#caver-rpc-klay-sendrawtransaction) 向 kaia 传输事务时，您可以使用承诺或事件发射器来获取事务收据。

下面的示例展示了如何使用承诺和事件发射器获取收据。

```javascript
// Using a promise - async/await
const receipt = await caver.rpc.klay.sendRawTransaction(rawTransaction)
console.log(receipt)

// Using a promise
caver.rpc.klay.sendRawTransaction(rawTransaction).then(console.log)

// Using an event emitter
caver.rpc.klay.sendRawTransaction(rawTransaction).on('receipt', console.log)
```

如上例所述，您可以通过承诺和事件发射器获取发送事务的结果。 transactionHash "字段在收据对象中定义。 您可以使用[caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) RPC 调用和`receipt.transactionHash`，在交易被纳入区块后的任何时间从网络查询交易的收据。 下面的示例展示了如何使用 [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) RPC 调用获取收据。

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

运行上述代码会得到以下结果。 执行上述代码后，交易收据如下所示。

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

交易结果可通过收据的 "状态 "查询。 有关返回值的详细信息，请参阅 [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt)。 如果交易失败，可以在收据的 `txError` 中查看更多有关错误的信息。 有关 `txError` 的更多信息，请参阅 [txError: Detailed Information of Transaction Failures](../../transaction-error-codes.md)。

## 执行其他事务类型<a href="#executing-other-transaction-types" id="executing-other-transaction-types"></a>

Kaia 提供各种事务类型，以提高可扩展性和性能。 更多信息，请参阅 [Transactions](../../../build/transactions/)。 本节将介绍一些可与 caver-js 配合使用的示例。

### 收费代表团<a href="#fee-delegation" id="fee-delegation"></a>

Kaia 提供 [Fee Delegation](../../../build/transactions/transactions.md#fee-delegation) 功能。 下面是一个制作 RLP 编码交易的示例，当您是此类交易的发送方时：

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

执行上述代码后，将打印 RLP 编码字符串。 (您得到的 RLP 编码字符串输出可能与下图所示的字符串输出不同）。

```bash
$ node ./test.js
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

在将 "feePayerSignatures"（付费者签名）附加到由交易发送者签名的 RLP 编码字符串（"rawTransaction"（原始交易））之后，付费者就可以向 kaia 发送交易。 如果 `caver.wallet` 也有缴费人的密钥，则可通过调用 `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`，将缴费人的签名注入到 `feeDelegatedTx` 中。 否则，费用支付方必须从发送方签名的 RLP 编码字符串中创建一个 "feeDelegatedTx"，并在其上添加费用支付方的签名，如下图所示。 如果要运行下面的示例，请将 `0x{RLP-encoded string}` 替换为上述 `rlpEncoded` 的值。

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

执行上述代码后，包括寄件人签名和缴费人签名在内的 RLP 编码字符串将打印如下。 (您得到的输出结果可能与下面显示的字符串输出结果不同）。

```bash
$ node ./test.js
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

现在，发送方和缴费方都对交易进行了签名，并可通过网络发送。 将 `0x{RLP-encoded string}` 替换为上述示例代码输出的 RLP 编码字符串。

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

运行上述代码会得到以下结果。 通过上述代码的执行结果，您可以查看 FeeDelegatedValueTransfer 交易的结果。

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

### 账户更新<a href="#account-update" id="account-update"></a>

如果要更改 kaia 帐户的私钥，需要记住 3 件重要的事情：

1. kaia 会验证您发送给它的每一笔交易。
2. 验证需要与您的私人密钥完全对应的公钥。
3. 因此，在将私钥更改为新密钥之前，必须先将旧公钥更改为新密钥。 新的公开密钥必须来自新的私人密钥。

牢记以上三点，你就可以按照以下步骤更改你的私人密钥了：

1. 准备新私钥，创建新钥匙圈。
2. 根据需要的类型（单个钥匙圈、多个钥匙圈或基于角色的钥匙圈）创建钥匙圈。
3. 从新钥匙圈生成一个账户实例。 该账户实例持有 kaia 账户的新公钥。
4. 向 kaia 发送包含账户实例的 AccountUpdate 事务。
5. 最后，将旧钥匙圈替换为步骤 2 中创建的新钥匙圈。

详情请查看 [Account Update]（api/caver-transaction/basic.md#accountupdate）。

要更改 AccountKey，必须在 `caver.transaction.accountUpdate` 的输入参数对象中为 `account` 字段提供一个 [Account](api/caver.account.md)实例。 账户]（api/caver.account.md）实例包含 kaia 账户的地址和要更新的账户密钥。

下面的代码是一个示例代码，用于更改 kaia 帐户使用的私钥，同时将 kaia 帐户的 AccountKey 更改为 [AccountKeyPublic]（../../../learn/accounts.md#accountkeypublic）。 别忘了准备新的私人密钥。

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

如果上述代码执行成功，你就不能再使用旧私钥来签署任何与旧钥匙圈有关的交易。 因此，您必须通过 `caver.wallet.updateKeyring(newKeyring)` 使用`newKeyring`更新旧钥匙圈。 一旦更新，签名将由新更新的私钥完成。

运行上述代码会得到以下结果。 在上述代码的执行结果中，私钥和新使用的账户更新结果打印如下。

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

如何用多个（[AccountKeys]）更新 kaia 帐户的 AccountKey？ 下面的示例解释了如何创建一个带有多个私钥的 [账户](api/caver.account.md) 实例（您可以通过 [caver.account.create](api/caver.account.md#caver-account-create)创建一个带有多个公钥的 [账户](api/caver.account.md) 实例）。 同样，在将创建的账户实例输入事务对象内的 "账户 "字段后，其余的更新过程与上例相同。

首先，让我们创建一个使用 [AccountKeyWeightedMultiSig] 更新的账户实例（.../.../.../learn/accounts.md#accountkeyweightedmultisig）。 对于 [AccountKeyWeightedMultiSig](../../../learn/accounts.md#accountkeyweightedmultisig) ，必须为每个密钥定义阈值和权重。 为此，请使用 [caver.account.weightedMultiSigOptions](api/caver.account.md#weightedmultisigoptions). 第一个参数是阈值，第二个参数是包含每个键权重的数组。

```javascript
// Create an account instance with three private keys using AccountKeyWeightedMultiSig
const newPrivateKeys = caver.wallet.keyring.generateMultipleKeys(3)
const newKeyring = caver.wallet.keyring.createWithMultipleKey(sender.address, newPrivateKeys)

// threshold = 3, the weights of the three keys = [1, 2, 1]
const options = new caver.account.weightedMultiSigOptions(3, [1, 2, 1])

const account = newKeyring.toAccount(options)
```

现在，让我们使用 [AccountKeyRoleBased](../../../learn/accounts.md#accountkeyrolebased) 更新 AccountKey。 [AccountKeyRoleBased](.../.../.../learn/accounts.md#accountkeyrolebased)是一种 "AccountKey "类型，定义了每个[role](.../../../learn/accounts.md#roles)要使用的密钥。

```javascript
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([1, 1, 1])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const account = newKeyring.toAccount()
```

上面的 AccountKeyRoleBased 就是为每个角色使用一个公钥的例子。 从上面的代码中可以看到，每个密钥对应一个私人密钥。 如果要为每个角色使用多个私钥，则必须为每个角色定义 [caver.account.weightedMultiSigOptions](api/caver.account.md#weightedmultisigoptions) 如下所示。

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

如果要将 AccountKey 更新为 [AccountKeyLegacy](../../../learn/accounts.md#accountkeylegacy) 或 [accountKeyFail](././././learn/accounts.md#accountkeyfail)，请如下所示创建一个 Account 实例，并将其分配给事务的`account`字段。

```javascript
// Create an account with AccountKeyLegacy
const accountWithLegacyKey = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address)

// Create an account with AccountKeyFail
const accountWithFailKey = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### 智能合约<a href="#smart-contract" id="smart-contract"></a>

通过 [caver.contract](api/caver.contract.md) 软件包，可以轻松与 kaia 上的智能合约进行交互。 当给出智能合约的底层 ABI（应用程序二进制接口）时，它会自动将智能合约的所有方法转换为 javascript 调用。 这样，您就可以像使用 JavaScript 对象一样与智能合约进行交互。

首先，我们制作一个简单的实体示例，如下所示。 创建一个 "test.sol "文件，并写下以下示例。

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

现在，我们可以编译智能合约，获取其字节码和 ABI。

```
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**注意**：要编译智能合约，必须安装 [solidity 编译器](https://solidity.readthedocs.io/en/develop/installing-solidity.html)。

对于智能合约的部署，您可以使用 [caver.contract](api/caver.contract.md) 进行部署，也可以使用 [caver.transaction.smartContractDeploy](api/caver-transaction/basic.md#smartcontractdeploy), [caver.transaction.feeDelegatedSmartContractDeploy](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) 或 [caver.transaction.smartContractDeploy](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) 进行部署。feeDelegatedSmartContractDeploy](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy)或[caver.transaction.feeDelegatedSmartContractDeployWithRatio](api/caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio)交易。 下面是使用 [caver.contract] 的示例（api/caver.contract.md）。

您可以使用编译智能合约的结果创建一个合约实例，如下所示。

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

运行上述代码会得到以下结果。

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

从上面的输出可以看出，这些方法是通过合同实例内部的 abi 管理的。 由于尚未部署，因此可以看到 `contractInstance.options.address` 的输出结果为空。

如果智能合约已经部署，并且您知道部署智能合约的合约地址，请将合约地址传给第二个参数，如下所示。

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

运行上述代码会得到以下结果。

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

由于该合约实例接收到了智能合约的地址，因此会将合约地址存储在 `contractInstance.options.address` 中。

如果创建了合约实例，您可以通过将字节码传递到 `data` 字段来部署它，如下图所示。

请注意，[caver.contract](api/caver.contract.md) 会发送事务以供部署和执行。 它使用 `caver.wallet` 中的密钥来签署交易。 使用的钥匙圈必须事先添加到 `caver.wallet` 中。

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

在上面的代码中，"deployer "会将合约部署到 kaia，并返回已部署的合约实例。

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

要通过费用委托交易部署智能合约，请像下面的示例一样定义 "feeDelegation "和 "feePayer"：

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

如果您想在通过 `caver.contract` 部署智能合约时发送发送方和付费方分别签名的交易，请参考下面的代码：

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

A smart contract can be executed using one of the followings, depending on the type of contract executing transaction: `Contract` class in `caver.contract` or [caver.transaction.smartContractExecution](api/caver-transaction/basic.md#smartcontractexecution), [caver.transaction.feeDelegatedSmartContractExecution](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution), or [caver.transaction.feeDelegatedSmartContractExecutionWithRatio](api/caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio). 发送执行智能合约的交易：

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

执行上述代码后，执行 `set` 的事务结果如下。

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

要通过费用委托交易执行智能合约，请像下面的示例一样定义 "feeDelegation "和 "feePayer"：

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

如果您想在通过 `caver.contract` 执行智能合约时发送一个发送方和支付方分别签名的交易，请参考下面的代码：

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

加载合约实例并调用其中一个函数：

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

执行上述代码后，输出值如下所示。

```bash
$ node ./test.js
testValue
```

如需了解更多信息，请参阅 [caver.contract]（api/caver.contract.md）。

## 发送有多个签名人的交易<a href="#sending-a-transaction-with-multiple-signers" id="sending-a-transaction-with-multiple-signers"></a>

如果 kaia 账户的 AccountKey 是 AccountKeyMultiSig 或 AccountKeyRoleBased，则管理每个密钥的人可以不同。

本节介绍在有多个签名者的情况下如何收集签名和发送交易。

要运行此示例，需要使用 [AccountKeyWeightedMultiSig] 更新用于测试的 kaia 帐户的 AccountKey(../../../learn/accounts.md#accountkeyweightedmultisig) 。 请参阅 [账户更新](#account-update) 了解如何更新您的 kaia 账户。

### 按顺序签署<a href="#signing-sequentially" id="signing-sequentially"></a>

使用 `caver.wallet` 或交易的 `sign` 函数签署交易时，签名（或付费人签名）会在交易中定义（或附加）。 您可以调用已签名事务实例的 `transaction.getRLPEncoding()` 函数，获取包含签名（和付费者签名）的 RLP 编码字符串（`rawTransaction`）。

下面的示例展示了如何使用多个私钥按顺序签署交易。 假设发送此交易的账户的 AccountKey 是由两个公钥组成的 AccountKeyWeightedMultiSig，这意味着 kaia 账户可以使用两个私钥串，每个用户一个私钥。 这是两个用户共享同一个 kaia 帐户的情况。

在下面的示例中，用户 1 和用户 2 创建了一个要使用的 `Keyring` 实例。 之后，各自使用自己的密钥来签署交易。 下面的示例使用 `transaction.sign` 进行签名。

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

运行上述代码会得到以下结果。 从上面代码的执行结果来看，如果用户 1 签名，就会创建一个签名。 如果用户 2 签名，则附加用户 2 的签名。 [签名数据](api/caver-wallet/keyring.md#signaturedata) 是一个存储签名的对象。

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

然后，让我们看看如何在不共享同一事务对象的情况下按顺序签名。 在下面的示例中，用户 1 将已签名事务的 getRLPEncoding 函数产生的 RLP 编码字符串传递给用户 2。

下面的代码解释了如何使用 RLP 编码字符串签署和附加签名。

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

运行上述代码会得到以下结果。

```bash
$ node ./test.js
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' },
	SignatureData { _v: '0x4e44', _r: '0xd6a94...', _s: '0x72dc8...' }
]
```

如果运行上述代码，可以看到用户 2 的签名已添加到 `transactionFromRLP.signatures` 中，其中总共包含两个签名。

所有用户签名后，通过 `await caver.rpc.klay.sendRawTransaction(transactionFromRLP)`向网络发送事务。

如果您发送的是费用委托交易，而费用支付者使用多个密钥，您可以使用 `caver.wallet.signAsFeePayer`继续上述逻辑。

### 合并已签名的原始交易<a href="#combining-signed-rawtransactions" id="combining-signed-rawtransactions"></a>

如果从几个人那里收到多个已签名的 RLP 编码原始事务字符串，可以将它们合并为一个包含所有签名的 RLP 编码原始事务字符串。

下面的示例显示了如何合并和发送 RLP 编码的事务。

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

运行上述代码会得到以下结果。

```bash
$ node ./test.js
0x08f9010d808505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef8d5f8458207f5a094ce13c39d25d44ad1d07ba2fd89f476c4dc6eef6071a2ef1f496f9b04d049e5a00f7abddd548998b0a55e53600a48286c38262fffc6c153a64e8f65a77c11c722f8458207f6a0ceeea7287b2670719d8ac15cf3b21b36fcaf74d58cce99935ce17e100064037aa0499067788d5db5e7c09ed7bfe19764d66684abc06b81e8f54ea254377bc81066f8458207f5a05c3ba89336c7d84d4ce08104cfd6f7ef33cd9f29766a1955baae8bcf964fd50fa015accbbce6bb11847a3b0660491775d64ef6d692ea709b768f64f12968c09240
```

运行上述代码后，就会输出一个 RLP 编码的原始事务字符串，其中包含所有签名信息。

执行 "combineSignedRawTransactions "时，除了签名和事务实例中的可选变量外，要合并的签名 RLP 编码原始事务字符串必须完全相同。 在基础事务实例（"combineSignedRawTransactions "的调用者）中没有任何给定值的可选变量，将与接下来要合并的原始事务字符串中的相应变量进行置换。 如果要合并的所有原始事务字符串（包括其中的可选变量值）不一致，就会发生错误。

CombineSignedRawTransactions 的结果是返回一个 RLP 编码字符串，其中包含所有签名（如果交易是收费委托交易，还包括收费人签名）。 您可以通过 `await caver.rpc.klay.sendRawTransaction(combined)`向网络发送事务。

## 检测 KCT 接口的实施情况<a href="#detecting-implementation-of-kct-interfaces" id="detecting-implementation-of-kct-interfaces"></a>

caver.kct "提供的函数可返回有关给定的 KCT 令牌合约实现了哪些接口的信息。 使用它，你可以看到在 kaia 上部署的 KCT 令牌合约实现了哪个接口。

### 检测 KIP-7 接口<a href="#detecting-kip-7-interfaces" id="detecting-kip-7-interfaces"></a>

为了检测 KIP-7 令牌合约实现的接口，可以使用 `caver.kct.kip7.detectInterface(contractAddress)` 或 `kip7.detectInterface()`。

下面的代码说明了如何使用 `caver.kct.kip7`中提供的静态方法检测在 kaia 上部署的 KIP-7 令牌合约的已实现接口。

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

运行上述代码会得到以下结果。

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

下面是如何使用 KIP7 成员方法检测在 kaia 上部署的 KIP-7 令牌合约的已实施接口的代码。

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

运行上述代码会得到以下结果。

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

### 检测 KIP-17 接口<a href="#detecting-kip-17-interfaces" id="detecting-kip-17-interfaces"></a>

为了检测 KIP-17 令牌合约实现的接口，可以使用 `caver.kct.kip17.detectInterface(contractAddress)` 或 `kip17.detectInterface()`。

下面是一段代码，说明如何使用 `caver.kct.kip17` 中提供的静态方法检测在 kaia 上部署的 KIP-17 令牌合约的已实现接口。

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

运行上述代码会得到以下结果。

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

下面是如何使用 KIP17 的成员方法检测在 kaia 上部署的 KIP-17 令牌合约的已实现接口的代码。

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

运行上述代码会得到以下结果。

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

### 检测 KIP-37 接口<a href="#detect-kip-37-interfaces" id="detect-kip-37-interfaces"></a>

为了检测 KIP-37 令牌合约实现的接口，可以使用 `caver.kct.kip37.detectInterface(contractAddress)` 或 `kip37.detectInterface()`。

下面的代码说明了如何使用 `caver.kct.kip37`中提供的静态方法检测在 kaia 上部署的 KIP-37 令牌合约的已实现接口。

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

运行上述代码会得到以下结果。

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

下面是如何使用 KIP37 的成员方法检测在 kaia 上部署的 KIP-37 令牌合约的已实施接口的代码。

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

运行上述代码会得到以下结果。

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

## 样本项目<a href="#sample-projects" id="sample-projects"></a>

使用 caver-js 开发的 DApp（区块链应用程序）示例项目如下：

- [Count DApp](https://docs.klaytn.foundation/docs/build/tutorials/count-dapp/)
- [Klaystagram](https://docs.klaytn.foundation/docs/build/tutorials/klaystagram/)

## 故障排除<a href="#troubleshooting" id="troubleshooting"></a>

- **错误：无法解析 'fs'** 在网络浏览器中使用 caver-js 构建过程中出现：

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

  如果使用 Next.js 网络框架，可以按如下方式在**next.config.json**文件中添加 webpack 配置：

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

## 链接<a href="#links" id="links"></a>

- caver-java [GitHub 仓库](https://github.com/kaiachain/caver-js)
- caver-js on [npm](https://www.npmjs.com/package/caver-js)
