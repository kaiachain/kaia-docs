# 發送交易示例

讓我們嘗試發送一筆交易作為簡單的熱身。 在這個簡短的示例中，我們將使用 caver-js 創建一個密鑰存儲、連接到 kaia 節點並創建一個事務！

如果您是第一次使用 caver-js，請不要擔心。 只需按照下面的簡單步驟操作即可。

## 前提條件

首先安裝以下軟件包

- [Node.js](https://nodejs.org/en/download/) version ([14.16.0](https://nodejs.org/dist/latest-v14.x/))
- [npm](https://www.npmjs.com/get-npm)
- [nvm](https://github.com/nvm-sh/nvm)
- [Solidity compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

_注：_ 安裝 nvm 後，如果出現 `nvm: command not found` 錯誤，請參閱此 [troubleshooting guide](https://github.com/nvm-sh/nvm/issues/2060) 。

## 1. 創建賬戶並下載 Keystore<a id="1.-create-an-account-and-download-keystore"></a>

創建賬戶最簡單的方法是使用 [Kaia 在線工具包](https://toolkit.kaia.io/misc/generateKeystore)。

![Kaia Online Toolkit](/img/references/keystore.png)

下載 keystore 文件，並將文件名改為更簡單的名稱，如 `keystore.json` 。

**You need KAIA to send a transaction.** You can get test KAIA for Kairos testnet from [Faucet](https://faucet.kaia.io).

## 2. 初始化項目<a id="2.-initialize-project"></a>

首先，為我們的項目創建一個文件夾。 我們簡單地將其稱為 "test"。 導航到您的命令行，然後輸入：

```
mkdir test
```

現在，讓我們導航到我們的文件夾。

```
cd test
```

我們將在我們的文件夾中下載 caver-js。 但在此之前，我們必須檢查我們的 `node.js` 版本，因為我們必須使用 12 或 14 版本。

您可以像這樣檢查版本：

```
node --version
```

如果版本不是 12 或 14，**務必更改**。 在此，我們將使用版本（[14.16.0](https://nodejs.org/dist/latest-v14.x/)）。 因此，讓我們輸入 `nvm use 14.16.0` 來更改節點版本。

現在，讓我們初始化我們的項目：

```
npm init
```

因為我們只是做一個簡單的測試，所以如何回答問題並不重要。 繼續按 `enter`。

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

或者，您也可以直接鍵入下面的命令，而不點擊 "enter"：

```
npm init -y
```

## 3. 下載 caver-js<a id="3.-download-caver-js"></a>

現在我們準備安裝 caver-js。

```
npm install caver-js
```

同時，添加以下模塊，因為我們需要它：

```
npm i read
```

## 4. 創建測試文件<a id="4.-create-test-file"></a>

讓我們像這樣創建一個名為 `testcaver.js` 的測試文件：

```
touch testcaver.js
```

我們將在該文件中編寫代碼，發送轉賬 KAIA 的交易。

## 5. 連接 kaia 節點<a id="5.-connect-to-klaytn-node"></a>

由於我們要向區塊鏈網絡發送交易，因此需要連接到 kaia 節點。 我們將使用 Kairos Testnet。

我們將導入 `caver-js` 和 `read` 模塊，並連接到 Kairos 網絡中的 kaia 節點，如下圖所示：

```javascript
const Caver = require('caver-js')
const read = require('read')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')
```

## 6. 提供 Keystore、創建 Keyring 並添加到 Caver 錢包<a id="6.-add-keystore-create-keyring-and-add-to-caver-wallet"></a>

您需要一個賬戶才能在區塊鏈上進行交易。 賬戶信息包含在 keystore 中。 使用`loadPassword()`函數，我們可以在終端上實現密碼提示。 函數如下

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

從提示符輸入的密碼和同一目錄下的 keystore 文件將被解密，並存儲為 `keyring` 文件。

之後，"keyring "將被存儲在錢包中。 添加以下幾行：

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

## 7. 發送交易<a id="7.-send-transaction"></a>

現在，我們將創建一個交易來轉移一些 KAIA。 這類交易被稱為 "value transfer transaction"。 讓我們來分析一下每個參數。

`from` 地址來自我們上傳的 keystore。  `to` 地址是 KAIA 的接收方，可以使用任何地址。 對於 `value`, 您可以方便地使用 `caver.utils.toPeb()` 將 KAIA 轉換為 peb。 在這裡，我們將發送 10 KAIA。 對於 "gas"、

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

別忘了在最後添加：

```
sendKlay()
```

## 8. 運行代碼<a id="8.-run-the-code"></a>

讓我們運行一下剛才編寫的代碼：

```
node testcaver.js
```

![Type your password](/img/references/prompt.png)

結果會是這樣的

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

您可以使用 `transactionHash` 在 [Kaiascan](https://kairos.kaiascan.io/) 或 [Kaiascope](https://kairos.kaiascope.com/) 中查看交易詳情。

## 9. 全部代碼<a id="9.-run-the-code"></a>

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

我希望您對使用 caver-js 提交的 Transacion 充滿信心。 如果您遇到困難或有任何問題，請隨時訪問我們的 [Kaia 論壇](https://devforum.kaia.io/) 尋求幫助。
