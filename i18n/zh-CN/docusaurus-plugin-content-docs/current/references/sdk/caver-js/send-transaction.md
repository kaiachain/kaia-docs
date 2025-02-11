# 发送交易示例

让我们尝试发送一笔交易作为简单的热身。 在这个简短的示例中，我们将使用 caver-js 创建一个密钥存储、连接到 kaia 节点并创建一个事务！

如果您是第一次使用 caver-js，请不要担心。 只需按照下面的简单步骤操作即可。

## 前提条件

首先安装以下软件包

- [Node.js](https://nodejs.org/en/download/) version ([14.16.0](https://nodejs.org/dist/latest-v14.x/))
- [npm](https://www.npmjs.com/get-npm)
- [nvm](https://github.com/nvm-sh/nvm)
- [Solidity compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

_注：_ 安装 nvm 后，如果出现 `nvm: command not found` 错误，请参阅此 [troubleshooting guide](https://github.com/nvm-sh/nvm/issues/2060) 。

## 1. 创建账户并下载 Keystore<a id="1.-create-an-account-and-download-keystore"></a>

创建账户最简单的方法是使用 [Kaia 在线工具包](https://toolkit.kaia.io/misc/generateKeystore)。

![Kaia Online Toolkit](/img/references/keystore.png)

下载 keystore 文件，并将文件名改为更简单的名称，如 `keystore.json` 。

\*\* 您需要 KAIA 才能发送交易。\*\* 您可以从 [Faucet](https://faucet.kaia.io) 获取用于 Kairos 测试网的测试 KAIA。

## 2. 初始化项目<a id="2.-initialize-project"></a>

首先，为我们的项目创建一个文件夹。 我们简单地将其称为 "test"。 导航到您的命令行，然后输入：

```
mkdir test
```

现在，让我们导航到我们的文件夹。

```
cd test
```

我们将在我们的文件夹中下载 caver-js。 但在此之前，我们必须检查我们的 `node.js` 版本，因为我们必须使用 12 或 14 版本。

您可以像这样检查版本：

```
node --version
```

如果版本不是 12 或 14，**务必更改**。 在此，我们将使用版本（[14.16.0](https://nodejs.org/dist/latest-v14.x/)）。 因此，让我们输入 `nvm use 14.16.0` 来更改节点版本。

现在，让我们初始化我们的项目：

```
npm init
```

因为我们只是做一个简单的测试，所以如何回答问题并不重要。 继续按 `enter`。

```

package name: (test) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/terri.k/test/package.json:

{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```

或者，您也可以直接键入下面的命令，而不点击 "enter"：

```
npm init -y
```

## 3. 下载 caver-js<a id="3.-download-caver-js"></a>

现在我们准备安装 caver-js。

```
npm install caver-js
```

同时，添加以下模块，因为我们需要它：

```
npm i read
```

## 4. 创建测试文件<a id="4.-create-test-file"></a>

让我们像这样创建一个名为 `testcaver.js` 的测试文件：

```
touch testcaver.js
```

我们将在该文件中编写代码，发送转账 KAIA 的交易。

## 5. 连接 kaia 节点<a id="5.-connect-to-klaytn-node"></a>

由于我们要向区块链网络发送交易，因此需要连接到 kaia 节点。 我们将使用 Kairos Testnet。

我们将导入 `caver-js` 和 `read` 模块，并连接到 Kairos 网络中的 kaia 节点，如下图所示：

```javascript
const Caver = require('caver-js')
const read = require('read')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')
```

## 6. 提供 Keystore、创建 Keyring 并添加到 Caver 钱包<a id="6.-add-keystore-create-keyring-and-add-to-caver-wallet"></a>

您需要一个账户才能在区块链上进行交易。 账户信息包含在 keystore 中。 使用`loadPassword()`函数，我们可以在终端上实现密码提示。 函数如下

```
async function loadPassword() {
    return new Promise((resolve, reject)=> {
        read({ prompt: 'Password: ', silent: true }, function(er, password) {
            if(er) {
                reject(er)
                return
            }
            resolve(password)
        })

    })

}
```

从提示符输入的密码和同一目录下的 keystore 文件将被解密，并存储为 `keyring` 文件。

之后，"keyring "将被存储在钱包中。 添加以下几行：

```
async function sendKlay() {
// Read keystore json file
  const fs = require('fs')
	const keystore = fs.readFileSync('./keystore.json', 'utf8')
	const password = await loadPassword()

	// Decrypt keystore and create
	const keyring = caver.wallet.keyring.decrypt(keystore, password)
	console.log(keyring)

    // Add to caver.wallet
	caver.wallet.add(keyring)

	}
```

## 7. 发送交易<a id="7.-send-transaction"></a>

现在，我们将创建一个交易来转移一些 KAIA。 这类交易被称为 "value transfer transaction"。 让我们来分析一下每个参数。

`from` 地址来自我们上传的 keystore。  `to` 地址是 KAIA 的接收方，可以使用任何地址。 对于 `value`, 您可以方便地使用 `caver.utils.toPeb()` 将 KAIA 转换为 peb。 在这里，我们将发送 10 KAIA。 对于 "gas"、

```
	
	// Create value transfer transaction
	const vt = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x8084fed6b1847448c24692470fc3b2ed87f9eb47',
		value: caver.utils.toPeb(10, 'KLAY'),
		gas: 25000,
	})

	// Sign to the transaction
	const signed = await caver.wallet.sign(keyring.address, vt)

	// Send transaction to the kaia blockchain platform (kaia)
	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
	console.log(receipt)
}
```

别忘了在最后添加：

```
sendKlay()
```

## 8. 运行代码<a id="8.-run-the-code"></a>

让我们运行一下刚才编写的代码：

```
node testcaver.js
```

![Type your password](/img/references/prompt.png)

结果会是这样的

```
SingleKeyring {
  _address: '0x658750eaa5d4db896d9ad0de79e00d551e0bf808',
  _key: PrivateKey {
    _privateKey: '0xea296e1bc67ba18a9ca87161c9e4fe486bb805ffff4f7a453f621a45e341e076'
  }
}
{
  blockHash: '0x0c29221072f049cf08ec2112755cbc0bc55289de5337faf2911147a4d8229693',
  blockNumber: '0x64e399d',
  contractAddress: null,
  effectiveGasPrice: '0x5d21dba00',
  from: '0x658750eaa5d4db896d9ad0de79e00d551e0bf808',
  gas: '0x61a8',
  gasPrice: '0xba43b7400',
  gasUsed: '0x5208',
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x0',
  senderTxHash: '0xdef371f3b194de1d6b6b678a3181e0e961549f2bc8f6391f97f48c8ea995225e',
  signatures: [
    {
      V: '0x7f6',
      R: '0x6425f98285f8e680a9cbfe32de824cceedd7fdca91ba9f7fa513898bc0d01ea8',
      S: '0x37718277df2a7a940212c9adb411f52d79d8cced784177c41224dca1a1ef122c'
    }
  ],
  status: '0x1',
  to: '0x7f1d6235b79688169fd6e15c4e8f540d6799dc75',
  transactionHash: '0xdef371f3b194de1d6b6b678a3181e0e961549f2bc8f6391f97f48c8ea995225e',
  transactionIndex: '0x2',
  type: 'TxTypeValueTransfer',
  typeInt: 8,
  value: '0x8ac7230489e80000'
}
```

您可以使用 `transactionHash` 在 [Kaiascan](https://kairos.kaiascan.io/) 或 [Kaiascope](https://kairos.kaiascope.com/) 中查看交易详情。

## 9. 全部代码<a id="9.-run-the-code"></a>

```
const Caver = require('caver-js')
const read = require('read')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')

async function sendKLAY() {
    // Read keystore json file
    	const fs = require('fs')
	const keystore = fs.readFileSync('./keystore.json', 'utf8')
	const password = await loadPassword()

	// Decrypt keystore and create
	const keyring = caver.wallet.keyring.decrypt(keystore, password)
	console.log(keyring)

    // Add to caver.wallet
	caver.wallet.add(keyring)

    // Create value transfer transaction
	const vt = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x7f1D6235B79688169fd6e15C4E8f540d6799dC75',
		value: caver.utils.toPeb(10, 'KLAY'),
		gas: 25000,
	})

	// Sign to the transaction
	const signed = await caver.wallet.sign(keyring.address, vt)

	// Send transaction to the kaia blockchain platform (kaia)
	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
	console.log(receipt)
}

async function loadPassword() {
    var read = require('read')

    return new Promise((resolve, reject)=> {
        read({ prompt: 'Password: ', silent: true }, function(er, password) {
            if(er) {
                reject(er)
                return
            }
            resolve(password)
        })

    })

}

sendKLAY()
```

我希望您对使用 caver-js 提交的 Transacion 充满信心。 如果您遇到困难或有任何问题，请随时访问我们的 [Kaia 论坛](https://devforum.kaia.io/) 寻求帮助。
