# サンプル・トランザクションの送信

簡単なウォーミングアップとして、トランザクションを送信してみよう。 この短い例では、キーストアの作成、kaiaノードへの接続、トランザクションの作成を行う！

caver-jsを使うのが初めてでも心配しないでください。 以下の簡単なステップに従ってください。

## 前提条件

まず、以下のパッケージをインストールする。

- [Node.js](https://nodejs.org/en/download/) バージョン ([14.16.0](https://nodejs.org/dist/latest-v14.x/))
- [npm](https://www.npmjs.com/get-npm)
- [nvm](https://github.com/nvm-sh/nvm)
- [Solidityコンパイラ](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

_注意:_ nvmのインストール後に`nvm: command not found`エラーが発生した場合は、こちらの[トラブルシューティングガイド](https://github.com/nvm-sh/nvm/issues/2060)を参照してください。

## 1. アカウントの作成とKeystoreのダウンロード<a id="1.-create-an-account-and-download-keystore"></a>

アカウントを作成する最も簡単な方法は、[Kaia Online Toolkit](https://toolkit.kaia.io/misc/generateKeystore)を使用することです。

![Kaia Online Toolkit](/img/references/keystore.png)

キーストア・ファイルをダウンロードし、`keystore.json`のようなもっとシンプルな名前に変更しよう。

トランザクションを送信するには KAIA が必要です。
Kairos testnet 用の test KAIA は [Faucet](https://faucet.kaia.io) から入手できます。

## 2. プロジェクトの初期化<a id="2.-initialize-project"></a>

まず、プロジェクト用のフォルダを作りましょう。 ここでは単に`test`と呼ぶことにする。 コマンドラインに移動し、次のように入力する：

```
mkdir test
```

では、フォルダに移動してみよう。

```
cdテスト
```

caver-jsをダウンロードするフォルダに入った。 その前に、node.jsのバージョンをチェックしなければならない。

バージョンはこのように確認できる：

```
ノード --バージョン
```

もしバージョンが12か14でなければ、**必ず変更してください**。 ここでは、バージョン（[14.16.0](https://nodejs.org/dist/latest-v14.x/)）を使用します。 では、ノードのバージョンを変更するために`nvm use 14.16.0`と入力してみよう。

では、プロジェクトを初期化してみよう：

```
npm init
```

簡単なテストをするだけなので、質問にどう答えてもかまいません。 エンターキーを押し続ける。

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

あるいは、`enter`を押すのを省略するために、以下のコマンドを入力することもできる：

```
npm init -y
```

## 3. caver-js のダウンロード<a id="3.-download-caver-js"></a>

これでcaver-jsをインストールする準備ができた。

```
npm caver-jsをインストールする
```

また、以下のモジュールも必要なので追加する：

```
npmを読んだ
```

## 4. テストファイルの作成<a id="4.-create-test-file"></a>

このように`testcaver.js`という名前のテストファイルを作ってみよう：

```
touch testcaver.js
```

KAIAを転送するトランザクションを送信するために、このファイルにコードを記述する。

## 5. kaiaノードに接続する<a id="5.-connect-to-klaytn-node"></a>

ブロックチェーン・ネットワークにトランザクションを送信するので、kaiaノードに接続する必要がある。 Kairos Testnetを使用する予定です。

以下のように、`caver-js`と`read`モジュールをインポートし、Kairosネットワークのkaiaノードに接続する：

```javascript
const Caver = require('caver-js')
const read = require('read')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')
```

## 6. キーストアの提供、キーリングの作成、Caver Walletへの追加<a id="6.-add-keystore-create-keyring-and-add-to-caver-wallet"></a>

ブロックチェーン上で取引を行うにはアカウントが必要だ。 そのアカウント情報はキーストアに含まれている。 loadPassword()\`関数を使えば、端末にパスワードのプロンプトを表示することができる。 関数は次のようになる：

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

プロンプトから入力されたパスワードは、同じディレクトリに存在するキーストア・ファイルとともに復号化され、`keyring`として保存される。

その後、`keyring`はウォレットに保存される。 以下の行を追加する：

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

## 7. トランザクションの送信<a id="7.-send-transaction"></a>

KAIAを譲渡するためのトランザクションを作成する。 この種の取引は「価値移転取引」と呼ばれる。 各パラメーターを分解してみよう。

`from`アドレスは、アップロードしたキーストアから取得する。 `to`アドレスはKAIAの受信者であり、任意のアドレスを使うことができる。 `value`については、`caver.utils.toPeb()`を使ってKAIAをpebに変換すると便利である。 ここでは10KAIAを送る。 ガス」の場合、

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

最後に加えるのを忘れずに：

```
sendKlay()
```

## 8. コードを実行する<a id="8.-run-the-code"></a>

今書いたコードを実行してみよう：

```
ノード testcaver.js
```

![Type your password](/img/references/prompt.png)

結果はこのようになる：

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

トランザクションの詳細は、[Kaiascan](https://kairos.kaiascan.io/) または [Kaiascope](https://kairos.kaiascope.com/) で `transactionHash` を使って見ることができます。

## 9. コード全体<a id="9.-run-the-code"></a>

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

caver-jsを使ってトランザッションを提出したことで、自信を持っていただけたでしょうか？ 困ったとき、質問があるときは、お気軽に[カイア・フォーラム](https://devforum.kaia.io/)をご覧ください。
