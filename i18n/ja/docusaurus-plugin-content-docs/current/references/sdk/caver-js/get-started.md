# はじめに

このドキュメントは、caver-js v1.5.0以上を使用している開発者向けです。 旧バージョンをお使いの場合は、[はじめに(◆v1.4.1)](../caver-js-1.4.1/get-started-1.4.1.md)をご参照ください。

## 前提条件<a href="#prerequisites" id="prerequisites"></a>

### 依存関係<a href="#dependencies" id="dependencies"></a>

caver-jsライブラリを使用するには、以下のパッケージが必要です。

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [gcc-c++](https://gcc.gnu.org/)
- [Solidityコンパイラ](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

**注意** caver-jsはNode.jsのバージョン12と14で動作します。 推奨バージョンは以下の通り：

- LTS/エルビウム ([12.21.0](https://nodejs.org/dist/latest-v12.x/))
- LTS/フェルミウム ([14.16.0](https://nodejs.org/dist/latest-v14.x/))

異なるバージョンのNode（例えば、Node v15）を使用している場合は、Node Version Manager([nvm](https://github.com/nvm-sh/nvm))を利用して、caver-jsでサポートされているバージョンをインストールして使用してください。

### インストール<a href="#installation" id="installation"></a>

試すには、以下のコマンドを使ってnpmでcaver-jsをインストールする：

```
npm install caver-js
```

**注意**：package.json`ファイルは同じインストールパスに存在する必要があります。 存在しない場合は、`npm init`で `package.json\` を生成することができる。

特定のバージョンのcaver-jsをインストールするには、以下のコマンドを試す：

```
npm install caver-js@X.X.X
```

## caver-jsで始める<a href="#starting-with-caver-js" id="starting-with-caver-js"></a>

caver-jsのインストールが完了したら、caver-jsを使ってkaiaノードに接続します。

以下の例を実践するには、まず作業ディレクトリにテスト・ファイルを作成する。

```bash
touch test.js
```

作業ディレクトリに`test.js`ファイルが作成されているのが見えるだろう。

test.jsに以下のコードを書く。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
kaia/v1.4.0/linux-amd64/go1.14.1
```

上記のようなconsole.logの出力が表示されたら、以下のステップに進んでください。 バージョン番号は、接続されているkaiaノードのバージョンによって異なる場合があります。

### kaiaノードへの接続<a href="#connecting-to-a-klaytn-node" id="connecting-to-a-klaytn-node"></a>

以下の例のように、caver-jsモジュールをインポートし、Kairosテストネットのkaiaノードに接続することができます：

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://public-en-kairos.node.kaia.io/')
```

ENを使用している場合は、以下のようにホストとポートを変更することで、自分のノードに接続することができます：

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')
```

## キーホルダーの管理<a href="#managing-keyrings" id="managing-keyrings"></a>

[Keyring](api/caver-wallet/keyring.md) は、kaiaアカウントのアドレスと秘密鍵を含む構造体である。

[Keyring](api/caver-wallet/keyring.md) は、保管する鍵の種類によって3種類に分類される：[SingleKeyring](api/caver-wallet/keyring.md#singlekeyring) は1つのアドレスと1つの秘密鍵を保管するタイプ、[MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring) は1つのアドレスと複数の秘密鍵を保管するタイプ、[RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) はロールごとに1つのアドレスと1つ以上の秘密鍵を保管するタイプである。

[SingleKeyring](api/caver-wallet/keyring.md#singlekeyring) は内部に `key` プロパティを定義し、この `key` は1つの秘密鍵を格納する。

[MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring) は内部で `keys` プロパティを定義しており、この `keys` は複数の秘密鍵を格納するための配列として実装されている。

[RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) で定義されている `keys` プロパティは2次元配列として実装されており、各[role](../../../learn/accounts.md#roles) に対して複数のキーを含めることができます（空の `keys` は `[ [], [], [] ]` のようになります）。 配列の最初の要素には `roleTransactionKey` に使用する秘密鍵、2 番目の要素には `roleAccountUpdateKey` に使用する秘密鍵、3 番目の要素には `roleFeePayerKey` に使用する秘密鍵が格納される。

### キーホルダーの作成<a href="#creating-a-keyring" id="creating-a-keyring"></a>

#### シングルキーリングの生成<a href="#generating-a-singlekeyring" id="generating-a-singlekeyring"></a>

以下のように、1つのキーホルダーをランダムに生成することができます。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
SingleKeyring {
	_address：'0x3d263c3c0df60c5516f932d244531742f45eed5c',
	_key：PrivateKey { _privateKey: '0x{private key}' }.
}
```

実行結果を上に示す。 インスタンス内部で定義されたメンバ変数には、`keyring.address`と`keyring.key`を通じてアクセスできる。

#### 秘密鍵からSingleKeyringを作成する<a href="#creating-a-singlekeyring-from-private-key" id="creating-a-singlekeyring-from-private-key"></a>

また、特定の秘密鍵を所有している場合は、以下のようにキーホルダーを作成するために使用することができます。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
SingleKeyring {
	_address：'0xf5a9079f311f9ec55170af351627aff0c5d2e287',
	_key：PrivateKey { _privateKey: '0x{private key}' }. 
}
```

`caver.wallet.keyring.createFromPrivateKey`の結果は、上記の`caver.wallet.keyring.generate`の結果と同様に、アドレスが定義された[SingleKeyring](api/caver-wallet/keyring.md#singlekeyring)インスタンスとなり、`keyring.key`の中の[PrivateKey]インスタンスが生成されます。

#### 秘密鍵とアドレスを持つSingleKeyringの作成<a href="#creating-a-singlekeyring-with-a-private-key-and-an-address" id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

kaiaアカウントの秘密鍵がアドレスから切り離されている場合、以下のように指定されたアドレスと指定された秘密鍵を使ってキーリングを作成することができます。

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

以下のようにコンソールでコードを実行する。

```bash
$ node ./test.js
SingleKeyring {
	_address：'0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_key：プライベートキー { _privateKey: '0x{private key}' }。
}
SingleKeyring {
	_address：'0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_key：プライベートキー { _privateKey: '0x{private key}' }。
}
```

#### 複数の秘密鍵を持つMultipleKeyringの作成<a href="#creating-a-multiplekeyring-with-multiple-private-keys" id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

複数の秘密鍵を使用したい場合は、アドレスと複数の秘密鍵を使用して[MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring)を作成することができます。 以下の例は、複数の秘密鍵を持つ[MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring)の作成方法を示している。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
MultipleKeyring {
	_address：'0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_keys：[
		PrivateKey { _privateKey: '0x{private key1}' },
		PrivateKey { _privateKey: '0x{private key2}' }. 
	]
}
```

ご覧のように、`_keys`は配列の中に複数のPrivateKeyインスタンスを持っている。 インスタンス内部で定義されたメンバ変数には、`keyring.address`と`keyring.keys`を通じてアクセスできる。

#### 秘密鍵によるRoleBasedKeyringの作成<a href="#creating-a-rolebasedkeyring-with-role-based-private-keys" id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

役割](../../../learn/accounts.md#roles)ごとに異なる秘密鍵を使用するには、代わりに `caver.wallet.keyring.createWithRoleBasedKey` を使用します。 配列の各要素は、[RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) に記述されている役割を表します。 以下の例は、役割ごとに異なるキーから [RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) インスタンスを作成する方法を示しています。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
RoleBasedKeyring {
	_address：'0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_keys：[ 
		[ 
			PrivateKey { _privateKey: '0x{private key1}' },
			PrivateKey { _privateKey: '0x{private key2}' },
			PrivateKey { _privateKey: '0x{private key3}' } ], [ PrivateKey { _privateKey: '0x ' } ].
		],
		[ PrivateKey { _privateKey: '0x{private key4}' } ],
		[ 
			PrivateKey { _privateKey: '0x{private key5}' },
			PrivateKey { _privateKey: '0x{private key6}' } ].
		]
	]
}
```

上の出力を見ると、keys 配列の最初の要素である `roleTransactionKey` には 3 つの PrivateKey インスタンスがあり、2 番目の要素である `roleAccountUpdateKey` には 1 つの PrivateKey インスタンスがある。 配列の最後の要素である `roleFeePayerKey` には2つの PrivateKey インスタンスがある。

**注意**：キーリング([caver.wallet.keyring](api/caver-wallet/keyring.md))やウォレット([caver.wallet](api/caver-wallet/caver-wallet.md))に関連する関数を呼び出しても、実際のkaiaブロックチェーンプラットフォーム(kaia)には影響しません。

### caver-jsにキーリングを追加する<a href="#adding-keyrings-to-caver-js" id="adding-keyrings-to-caver-js"></a>

caver-jsが提供するインメモリ・ウォレットを使えば、簡単にキーリングを使うことができる。 以下の例では、[Kaia Wallet](../../../build/tools/wallets/kaia-wallet.md) からエクスポートしたキーリング・インスタンスとキーストア・ファイルを使って、キーリングをウォレットに追加する方法を説明します。

:::note

開発時には、実際の資金とは関係のないアカウントを使うのがベストプラクティスだ。 これを行う良い方法は、新しいブラウザプロファイル（Chrome、Brave、Firefoxなど）を作成し、そのブラウザにカイアウォレットをインストールし、このウォレットにお金を送らないことです。

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

コンソールで実行する。

```bash
$ node ./test.js
SingleKeyring {
	_address：'0x66391720b488a3fb2c7c69d99cd4cd6e23ca18e3',
	_key：プライベートキー { _privateKey: '0x{private key}' }。
}
SingleKeyring {
	_address：'0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
	_key：PrivateKey { _privateKey: '0x{private key}' }.
}
```

上の出力を見ると、`caver.wallet`にキーリングを追加した後、`caver.wallet`からキーリングを問い合わせることができる。

使用するアドレスと秘密鍵があれば、簡単にキーリングを作成し、[caver.wallet.newKeyring](api/caver-wallet/caver-wallet.md#caverwalletgetkeyring) を介して、[caver.wallet](api/caver-wallet/caver-wallet.md) に直接追加することができます。

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

上記のコードを実行すると、次のような結果が得られる。 上記コードの実行結果を以下に示す。 秘密鍵を指定して `caver.wallet.newKeyring` を実行すると、秘密鍵を1つ持つKeyringインスタンスが作成され、`caver.wallet` に追加される。 複数の秘密鍵の場合、複数の秘密鍵を持つKeyringインスタンスが作成されます。 ロールごとに1つ以上の秘密鍵を引数として渡すと、ロールごとに異なる秘密鍵を持つKeyringインスタンスが作成され、`caver.wallet`にも追加されます。

```bash
$ node ./test.js
SingleKeyring {
	_address：'0x651f6ae6b45750082b22805583acc989399c6552',
	_key：PrivateKey { _privateKey: '0x{private key1}' }.
}
MultipleKeyring {
	_address：'0xce3ee92aeb4d600a41c98bdf92e8b337e186bf58',
	_keys：[ 
		PrivateKey { _privateKey: '0x{private key2}' },
		PrivateKey { _privateKey: '0x{private key3}' },
		PrivateKey { _privateKey: '0x{private key4}' }.
    ]
}
RoleBasedKeyring {
	_address：'0x626d5b94ec76a105c5afa370bb7e59050a22b8b5',
	_keys：[ 
		[ 
			PrivateKey { _privateKey: '0x{private key5}' },
			PrivateKey { _privateKey: '0x{private key6}' },
			PrivateKey { _privateKey: '0x{private key7}' } ], [ PrivateKey { _privateKey: '0x '
		],
		[ 
			PrivateKey { _privateKey: '0x{private key8}' },
			PrivateKey { _privateKey: '0x{private key9}' }
		],
		[ 
			プライベートキー { _privateKey: '0x{private key10}' },
			プライベートキー { _privateKey: '0x{private key11}' } ].
		]
	]
}
```

`caver.wallet.add`または `caver.wallet.newKeyring`は、`caver.wallet`にKeyringを追加した後に、Keyringのインスタンスを返します。

## トランザクションの送信<a href="#sending-a-transaction" id="sending-a-transaction"></a>

このセクションでは、Kairos Testnetでcaver-jsを使ってKAIAを送信する方法を紹介します。

### カイロス水栓でKAIAを入手する<a href="#getting-klay-via-kairos-faucet" id="getting-klay-via-kairos-faucet"></a>

テスト用にKAIAが必要な場合は、[Kaia Wallet](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)からKairos testnet KAIAを入手できます。 秘密鍵またはキーストアファイルを使用してkaiaウォレットにログインし、テスト用の蛇口からKairos testnet KAIAを受信します。

### バリュー・トランスファー・トランザクションの送信<a href="#sending-a-value-transfer-transaction" id="sending-a-value-transfer-transaction"></a>

caver-jsウォレットを使用して、取引の署名を生成することができます。 トランザクションをネットワークに送信するには、以下の2つのステップを踏む必要がある。

1. 取引に署名する
   - 使いたいキーリングが[caver.wallet](api/caver-wallet/caver-wallet.md)に追加されていれば、`caver.wallet.sign`関数を使って署名することができます。
   - キーリングを `caver.wallet` に追加せずに別途管理する場合は、`transaction.sign` 関数を使用してトランザクションに署名することができる。
2. `caver.rpc.klay.sendRawTransaction`を介して、署名されたトランザクションのRLPエンコード文字列をkaiaに送信する。

**注意：** 送信者は十分な数のKAIAを持っていなければならない。

#### 取引に署名する

kaiaにトランザクションを送信する前に、まずトランザクションに署名してください。

以下は、[caver.wallet](api/caver-wallet/caver-wallet.md) にキーホルダーが追加された場合のトランザクションの署名方法の例である。

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

上記のコードでは、`caver.wallet` にキーホルダーを追加し、トランザクションを作成し、`caver.wallet.sign` でトランザクションに署名している。

上記のコードを実行すると、次のような結果が得られる。 上記のコードが実行されると、トランザクションのRLPエンコード文字列は以下のようになる。 (あなたが得たRLPエンコードされた文字列出力は、以下に示す文字列出力とは異なる可能性がある)

```bash
RLP エンコード文字列：0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### 署名されたトランザクションのRLPエンコード文字列をkaiaに送信する。

これで、以下のように署名されたトランザクションをネットワークに送信できる。 以下の例を実行したい場合は、`0x{RLP-encoded string}` を上記の `rlpEncoded` の値に置き換えてください。

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

上記のコードを実行すると、次のような結果が得られる。 上記のコードが実行されると、トランザクションのレシートは以下のようになる。

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

`caver.wallet`を使わずにトランザクションに署名してネットワークに送信したい場合は、以下の例を参照してください。

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

上記のコードが実行されると、前の例のようにトランザクションのレシートが印刷される。

### 領収書のチェック<a href="#checking-receipts" id="checking-receipts"></a>

caver.rpc.klay.sendRawTransaction](api/caver-rpc/klay.md#caver-rpc-klay-sendrawtransaction)によってカイアにトランザクションを転送する際に、プロミスまたはイベントエミッターを使用してトランザクションの受信を取得することができます。

次の例は、プロミスとイベント・エミッターを使ってレシートを取得する方法を示している。

```javascript
// Using a promise - async/await
const receipt = await caver.rpc.klay.sendRawTransaction(rawTransaction)
console.log(receipt)

// Using a promise
caver.rpc.klay.sendRawTransaction(rawTransaction).then(console.log)

// Using an event emitter
caver.rpc.klay.sendRawTransaction(rawTransaction).on('receipt', console.log)
```

上記の例で説明したように、プロミスとイベント・エミッターを通じて、トランザクションの送信結果を得ることができる。 `transactionHash`フィールドはレシートオブジェクトの内部で定義される。 [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) RPCコールに`receipt.transactionHash`を使用すると、トランザクションがブロックに 含まれた後、ネットワークからいつでもトランザクションの受信を問い合わせることができる。 以下の例では、[caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) RPC コールを使用してレシートを取得する方法を示しています。

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

上記のコードを実行すると、次のような結果が得られる。 上記のコードが実行されると、トランザクションのレシートは以下のようになる。

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

トランザクションの結果は、レシートの `status` から確認することができる。 戻り値の詳細については、[caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) を参照のこと。 トランザクションが失敗した場合、レシートの `txError` でエラーの詳細を確認することができる。 `txError`の詳細については、[txError: トランザクション失敗の詳細情報](../transaction-error-codes.md) を参照のこと。

## 他のトランザクション・タイプの実行<a href="#executing-other-transaction-types" id="executing-other-transaction-types"></a>

カイアは、拡張性とパフォーマンスのために様々なトランザクションタイプを提供する。 詳しくは[Transactions](../../../learn/transactions/)を参照。 このセクションでは、caver-jsで使用できるいくつかの例について説明します。

### 手数料の委任<a href="#fee-delegation" id="fee-delegation"></a>

カイアは[料金委任](../../../learn/transactions/transactions.md#fee-delegation)機能を提供しています。 以下は、あなたがこの種のトランザクションの送信者である場合に、RLPエンコードされたトランザクションを行う例である：

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

上記のコードが実行されると、RLPエンコードされた文字列がプリントされる。 (あなたが得たRLPエンコードされた文字列出力は、以下に示す文字列出力とは異なる可能性がある)

```bash
$ node ./test.js
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

料金支払者は、トランザクション送信者によって署名されたRLPエンコード文字列(`rawTransaction`)に`feePayerSignatures`を付加した後、kaiaにトランザクションを送信することができる。 `caver.wallet`が料金支払者の鍵も持っている場合、`caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`を呼び出すことで、料金支払者の署名を `feeDelegatedTx`に注入することができる。 そうでない場合、料金支払者は、下図のように、送信者によって署名されたRLPエンコー ディング文字列から`feeDelegatedTx`を作成し、料金支払者の署名を追加しなければならない。 以下の例を実行したい場合は、`0x{RLP-encoded string}` を上記の `rlpEncoded` の値に置き換えてください。

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

上記のコードが実行されると、送金者の署名と料金支払者の署名を含むRLPエンコードされた文字列が以下のように印刷される。 (あなたが得た出力は、以下に示す文字列出力とは異なる可能性がある）。

```bash
$ node ./test.js
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

これで取引は、送金者と手数料支払者の双方によって署名され、ネットワーク上で送信できるようになった。 `0x{RLP-encoded string}` を、上記のサンプルコードで出力されたRLPエンコードされた文字列に置き換える。

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

上記のコードを実行すると、次のような結果が得られる。 上記コードの実行結果を通じて、FeeDelegatedValueTransferのトランザクション結果を確認することができる。

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

### アカウント更新<a href="#account-update" id="account-update"></a>

kaiaアカウントの秘密鍵を変更したい場合、3つの重要なことを覚えておく必要があります：

1. kaiaは、あなたがkaiaに送信するすべてのトランザクションを検証します。
2. 検証には、秘密鍵と正確に対応する公開鍵が必要です。
3. したがって、秘密鍵を新しいものに変更するには、古い公開鍵を新しいものに変更することが **常に**先行\*\*する。 新しい公開鍵は、新しい秘密鍵から派生したものでなければならない。

上記の3つを念頭に置き、以下の手順で秘密鍵を変更することができます：

1. 新しい秘密鍵を用意し、新しいキーリングを作成する。
2. 必要なタイプ（単一キーリング、複数キーリング、役割ベースのキーリング）を指定してキーリングを作成します。
3. 新しいキーリングからアカウントインスタンスを生成する。 このアカウントインスタンスは、あなたのkaiaアカウントの新しい公開鍵を保持します。
4. Accountインスタンスを含むAccountUpdateトランザクションをkaiaに送信する。
5. 最後に、古いキーホルダーをステップ2で作成した新しいキーホルダーに付け替えます。

詳しくは[アカウント更新](api/caver-transaction/basic.md#accountupdate)をご確認ください。

AccountKey を変更するには、`caver.transaction.accountUpdate` の入力引数オブジェクトの `account` フィールドに [Account](api/caver.account.md) インスタンスを指定する必要がある。 Account](api/caver.account.md) インスタンスには、更新される kaia アカウントのアドレスと AccountKey が含まれます。

以下のコードは、kaiaアカウントで使用している秘密鍵を変更し、kaiaアカウントのAccountKeyを[AccountKeyPublic](../../../learn/accounts.md#accountkeypublic)に変更するコード例です。 新しい秘密鍵の準備もお忘れなく。

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

上記のコードが正常に実行されると、古い秘密鍵を使って古いキーリングを使ったトランザクションに署名することはできなくなる。 そのため、`caver.wallet.updateKeyring(newKeyring)` を使って、古いキーリングを `newKeyring` で更新する必要がある。 秘密鍵が更新されると、新たに更新された秘密鍵によって署名が行われる。

上記のコードを実行すると、次のような結果が得られる。 上記コードの実行結果には、新たに使用する秘密鍵とアカウントの更新結果が以下のように出力されます。

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

複数の[AccountKey]を持つkaiaアカウントの[AccountKey]を更新する方法は？ 以下の例では、使用したい複数の秘密鍵を持つ[Account](api/caver.account.md)インスタンスを作成する方法を説明します（複数の公開鍵を持つ[Account](api/caver.account.md)インスタンスは、[caver.account.create](api/caver.account.md#caver-account-create)で作成できます）。 繰り返しになるが、トランザクションオブジェクト内の`account`フィールドに作成されたアカウントインスタンスを投入した後、残りの更新処理は上記の例と同じである。

まず、[AccountKeyWeightedMultiSig](../../../learn/accounts.md#accountkeyweightedmultisig) で更新する Account インスタンスを作成します。 AccountKeyWeightedMultiSig](../../../learn/accounts.md#accountkeyweightedmultisig) の場合、各キーの閾値とウェイトを定義しなければならない。 そのためには、[caver.account.weightedMultiSigOptions](api/caver.account.md#weightedmultisigoptions) を使用する。 最初のパラメータは閾値で、2番目のパラメータは各キーの重みを含む配列である。

```javascript
// Create an account instance with three private keys using AccountKeyWeightedMultiSig
const newPrivateKeys = caver.wallet.keyring.generateMultipleKeys(3)
const newKeyring = caver.wallet.keyring.createWithMultipleKey(sender.address, newPrivateKeys)

// threshold = 3, the weights of the three keys = [1, 2, 1]
const options = new caver.account.weightedMultiSigOptions(3, [1, 2, 1])

const account = newKeyring.toAccount(options)
```

それでは、[AccountKeyRoleBased](../../../learn/accounts.md#accountkeyrolebased) を使用して AccountKey を更新してみましょう。 [AccountKeyRoleBased](../../../learn/accounts.md#accountkeyrolebased) は `AccountKey` 型で、各 [role](../../../learn/accounts.md#roles) に使用するキーを定義します。

```javascript
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([1, 1, 1])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const account = newKeyring.toAccount()
```

上記のAccountKeyRoleBasedは、ロールごとに1つの公開鍵を使用する例である。 上のコードからわかるように、それぞれが1つの秘密鍵に対応している。 役割ごとに複数の秘密鍵を使用する場合、以下のように役割ごとに[caver.account.weightedMultiSigOptions](api/caver.account.md#weightedmultisigoptions)を定義しなければならない。

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

AccountKeyを[AccountKeyLegacy](../../../learn/accounts.md#accountkeylegacy)または[accountKeyFail](../../../learn/accounts.md#accountkeyfail)に更新したい場合は、以下のようにAccountインスタ ンスを作成し、それをトランザクションの`account`フィールドに代入する。

```javascript
// Create an account with AccountKeyLegacy
const accountWithLegacyKey = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address)

// Create an account with AccountKeyFail
const accountWithFailKey = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### スマート契約<a href="#smart-contract" id="smart-contract"></a>

caver.contract](api/caver.contract.md) パッケージは、kaia上でスマート・コントラクトを簡単に操作できるようにする。 低レベルのABI（Application Binary Interface）が与えられると、スマート・コントラクトのすべてのメソッドを自動的にjavascript呼び出しに変換する。 これにより、スマート・コントラクトをJavaScriptのオブジェクトのように扱うことができる。

まず、以下のような簡単なソリディティの例を作る。 test.sol'ファイルを作成し、以下の例を書いてください。

```
pragma solidity ^0.5.6;

contract KVstore {
    mapping(string=>string) store;
    function get(string memory key) public view returns (string memory) {
        return store[key];
    }
    function set(string memory key, string memory value) public {
        store[key] = value;
    }.
}
```

これでスマート・コントラクトをコンパイルして、バイトコードとABIを取得できる。

```
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**注**：スマートコントラクトをコンパイルするには、[solidityコンパイラ](https://solidity.readthedocs.io/en/develop/installing-solidity.html)がインストールされている必要があります。

スマート・コントラクトのデプロイには、[caver.contract](api/caver.contract.md)を使用するか、[caver.transaction.smartContractDeploy](api/caver-transaction/basic.md#smartcontractdeploy)、[caver.transaction.feeDelegatedSmartContractDeploy](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy)、または[caver.transaction.feeDelegatedSmartContractDeployWithRatio](api/caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio)トランザクションを使用してデプロイできます。 以下は、[caver.contract](api/caver.contract.md)の使用例である。

スマート・コントラクトのコンパイル結果を使って、以下のようにコントラクト・インスタンスを作成できる。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get：[Function: bound _createTxObject],
		'0x693ec85e'：[Function: bound _createTxObject],
		'get(string)'：[Function: bound _createTxObject],
		set：[Function: bound _createTxObject],
		'0xe942b516'：[Function: bound _createTxObject],
		'set(string,string)'：[Function: bound _createTxObject]
	},
  events：{ allEvents：[Function: bound ] },
  _address: null,
  _jsonInterface：[ ... ],
  _keyrings：KeyringContainer { ... }
}
null
```

上の出力を見ると、メソッドがコントラクト・インスタンス内のabiを通じて管理されていることがわかる。 そして、まだデプロイされていないので、`contractInstance.options.address`の結果がnullとして出力されているのがわかる。

スマートコントラクトが既にデプロイされており、スマートコントラクトがデプロイされたコントラクトアドレスを知っている場合は、以下のように2番目のパラメーターにコントラクトアドレスを渡してください。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get：[Function: bound _createTxObject],
		'0x693ec85e'：[Function: bound _createTxObject],
		'get(string)'：[Function: bound _createTxObject],
		set：[Function: bound _createTxObject],
		'0xe942b516'：[Function: bound _createTxObject],
		'set(string,string)'：[Function: bound _createTxObject]
	},
  events：{ allEvents：[Function: bound ] },
  _address：'0x3466D49256b0982E1f240b64e097FF04f99Ed4b9',
  _jsonInterface：[ ... ],
  _keyrings：KeyringContainer { ... }
}.
0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

このコントラクト・インスタンスはスマート・コントラクトのアドレスを受け取ったので、コントラクト・アドレスを `contractInstance.options.address` に格納する。

コントラクトのインスタンスが作成されたら、以下のように `data` フィールドにバイトコードを渡してデプロイすることができる。

caver.contract](api/caver.contract.md)は、デプロイと実行のためにトランザクションを送信することに注意。 `caver.wallet`にあるキーリングを使って取引に署名する。 使用するキーホルダーは事前に `caver.wallet` に追加しておく必要がある。

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

上のコードでは、`deployer` がコントラクトをカイアにデプロイし、デプロイされたコントラクトのインスタンスを返している。

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get：[Function: bound _createTxObject],
		'0x693ec85e'：[Function: bound _createTxObject],
		'get(string)'：[Function: bound _createTxObject],
		set：[Function: bound _createTxObject],
		'0xe942b516'：[Function: bound _createTxObject],
		'set(string,string)'：[Function: bound _createTxObject]
	},
  events：{ allEvents：[Function: bound ] },
  _address：'0x3466D49256b0982E1f240b64e097FF04f99Ed4b9',
  _jsonInterface：[ ... ],
  _keyrings：KeyringContainer { ... }
}.
0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

`feeDelegation`と`feePayer`を定義する：

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

`caver.contract`を通じてスマートコントラクトをデプロイする際に、送信者とfeePayerが別々に署名されたトランザクションを送信したい場合は、以下のコードを参照のこと：

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

スマートコントラクトは、トランザクションを実行するコントラクトのタイプに応じて、以下のいずれかを使用して実行できる。`caver.contract`内の`Contract`クラス、または[caver.transaction.smartContractExecution](api/caver-transaction/basic.md#smartcontractexecution)、[caver.transaction.feeDelegatedSmartContractExecution](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)、または[caver.transaction.feeDelegatedSmartContractExecutionWithRatio](api/caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)。 スマートコントラクトを実行するためのトランザクションを送信する：

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

上記のコードを実行すると、`set`を実行したトランザクションの結果は以下のようになる。

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

`feeDelegation`と`feePayer`を定義する：

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

`caver.contract`でスマートコントラクトを実行する際に、送信者とfeePayerが別々に署名されたトランザクションを送信したい場合は、以下のコードを参照する：

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

コントラクトのインスタンスをロードし、その関数を呼び出す：

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

上記のコードが実行されると、以下のように値が出力される。

```bash
$ node ./test.js
testValue
```

詳細は[caver.contract](api/caver.contract.md)を参照。

## 複数の署名者を含むトランザクションの送信<a href="#sending-a-transaction-with-multiple-signers" id="sending-a-transaction-with-multiple-signers"></a>

kaiaアカウントのAccountKeyがAccountKeyMultiSigまたはAccountKeyRoleBasedの場合、それぞれの鍵を管理する人は異なることがある。

このセクションでは、複数の署名者がいる場合に署名を収集し、トランザクションを送信す る方法について説明する。

この例を実行するには、テストに使用する kaia アカウントの AccountKey を [AccountKeyWeightedMultiSig](../../../learn/accounts.md#accountkeyweightedmultisig) で更新する必要があります。 kaiaアカウントの更新方法は[アカウント更新](#account-update)をご参照ください。

### 順次署名<a href="#signing-sequentially" id="signing-sequentially"></a>

トランザクションが `caver.wallet` またはトランザクションの `sign` 関数を使用して署名されるとき、署名（または feePayerSignatures）はトランザクション内で定義（または追加）される。 署名されたトランザクションインスタンスの `transaction.getRLPEncoding()` 関数を呼び出すことで、署名（と feePayerSignatures）を含む RLP エンコードされた文字列（`rawTransaction`）を得ることができる。

以下の例は、複数の秘密鍵を使ってトランザクションに順次署名する方法を示している。 このトランザクションを送信するアカウントのAccountKeyが2つの公開鍵のAccountKeyWeightedMultiSigであると仮定する。 これは、2人のユーザーが同じkaiaアカウントを共有しているケースです。

以下の例では、user1とuser2が使用する`Keyring`インスタンスを作成している。 その後、それぞれが独自のキーリングを使ってトランザクションに署名する。 以下の例では、`transaction.sign` を使って署名している。

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

上記のコードを実行すると、次のような結果が得られる。 上のコードの実行結果を見ると、user1が署名した場合、1つの署名が作成される。 user2が署名すれば、user2の署名が付加される。 [SignatureData](api/caver-wallet/keyring.md#signaturedata) は、署名を格納するオブジェクトである。

```bash
$ node ./test.js
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' }
]
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' },
	SignatureData { _v: '0x4e44', _r: '0xd6a94...', _s: '0x72dc8...' }
]。
```

次に、同じトランザクション・オブジェクトを共有せずに連続して署名する方法を見てみよう。 以下の例では、user1は署名付きトランザクションのgetRLPEncoding関数の結果であるRLPエンコードされた文字列をuser2に渡す。

以下のコードでは、RLPエンコードされた文字列を使った署名と付加の方法を説明する。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' },
	SignatureData { _v: '0x4e44', _r: '0xd6a94...', _s: '0x72dc8...' }
]。
```

上記のコードを実行すると、`transactionFromRLP.signatures`にuser2の署名が追加され、合計2つの署名が含まれていることがわかる。

すべてのユーザーが署名したら、`await caver.rpc.klay.sendRawTransaction(transactionFromRLP)`を通して ネットワークにトランザクションを送信する。

料金支払者が複数の鍵を使用している場合、`caver.wallet.signAsFeePayer`を使用して上記のロジックを進めることができる。

### 署名された生トランザクションの結合<a href="#combining-signed-rawtransactions" id="combining-signed-rawtransactions"></a>

複数の人から複数の署名付きRLPエンコード生トランザクション文字列を受け取った場合、それらをすべての署名を含む単一のRLPエンコード生トランザクション文字列にまとめることができる。

以下の例は、RLPエンコードされたトランザクションを結合して送信する方法を示している。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
0x08f9010d808505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef8d5f8458207f5a094ce13c39d25d44ad1d07ba2fd89f476c4dc6eef6071a2ef1f496f9b04d049e5a00f7abddd548998b0a55e53600a48286c38262fffc6c153a64e8f65a77c11c722f8458207f6a0ceeea7287b2670719d8ac15cf3b21b36fcaf74d58cce99935ce17e100064037aa0499067788d5db5e7c09ed7bfe19764d66684abc06b81e8f54ea254377bc81066f8458207f5a05c3ba89336c7d84d4ce08104cfd6f7ef33cd9f29766a1955baae8bcf964fd50fa015accbbce6bb11847a3b0660491775d64ef6d692ea709b768f64f12968c09240
```

上記のコードを実行すると、すべての署名情報が組み合わされた1つのRLPエンコードされた生のトランザクション文字列が出力される。

`combineSignedRawTransactions`を実行するとき、結合される署名付きRLPエンコードされた生トランザクショ ン文字列は、トランザクションインスタンスの署名とオプション変数を除いて、互いに全く同じでなければならない。 `combineSignedRawTransactions`の呼び出し元である）ベーストランザクショ ンインスタンスに指定された値を持たないオプション変数は、次にマージされる生トランザクショ ン文字列の対応する値と交換される。 マージされるすべての生のトランザクション文字列（オプション変数の値を含む）の間に不一致がある場合、エラーが発生する。

combineSignedRawTransactionsは、結果として、すべての署名(およびトランザクショ ンがfee-delegatedトランザクションの場合はfeePayerSignatures)を含むRLPエンコードされた文字列を返す。 これを使用して、`await caver.rpc.klay.sendRawTransaction(combined)`を通してトランザクショ ンをネットワークに送信する。

## KCTインターフェースの実装を検出する<a href="#detecting-implementation-of-kct-interfaces" id="detecting-implementation-of-kct-interfaces"></a>

`caver.kct` は与えられたKCTトークンコントラクトがどのインターフェースを実装しているかの情報を返す関数を提供する。 これを使えば、kaiaにデプロイされたKCTトークンコントラクトがどのインターフェースを実装しているかを見ることができる。

### KIP-7インターフェースの検出<a href="#detecting-kip-7-interfaces" id="detecting-kip-7-interfaces"></a>

KIP-7トークンコントラクトが実装しているインタフェースを検出するには、 `caver.kct.kip7.detectInterface(contractAddress)` または `kip7.detectInterface()` を使用します。

以下は、`caver.kct.kip7`で提供される静的メソッドを使用して、kaiaにデプロイされたKIP-7トークンコントラクトの実装されたインタフェースを検出する方法のコードである。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}.
```

以下は、KIP7のmemberメソッドを使って、kaiaにデプロイされたKIP-7トークンコントラクトの実装インターフェースを検出するコードです。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}.
```

### KIP-17インターフェースの検出<a href="#detecting-kip-17-interfaces" id="detecting-kip-17-interfaces"></a>

KIP-17トークンコントラクトが実装するインタフェースを検出するには、`caver.kct.kip17.detectInterface(contractAddress)` または `kip17.detectInterface()` を使用します。

以下は、`caver.kct.kip17`で提供される静的メソッドを使用して、kaiaにデプロイされたKIP-17トークンコントラクトの実装されたインタフェースを検出する方法のコードである。

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

上記のコードを実行すると、次のような結果が得られる。

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
}.
```

以下は、KIP17のmemberメソッドを使用して、kaiaにデプロイされたKIP-17トークンコントラクトの実装インタフェースを検出する方法のコードです。

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

上記のコードを実行すると、次のような結果が得られる。

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
}.
```

### KIP-37インターフェースの検出<a href="#detect-kip-37-interfaces" id="detect-kip-37-interfaces"></a>

KIP-37トークンコントラクトが実装しているインタフェースを検出するには、 `caver.kct.kip37.detectInterface(contractAddress)` または `kip37.detectInterface()` を使用します。

以下は、`caver.kct.kip37`で提供される静的メソッドを使用して、kaiaにデプロイされたKIP-37トークンコントラクトの実装されたインタフェースを検出する方法のコードである。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}.
```

以下は、KIP37のmemberメソッドを使用して、kaiaにデプロイされたKIP-37トークンコントラクトの実装インタフェースを検出する方法のコードです。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
$ node ./test.js
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}.
```

## サンプルプロジェクト<a href="#sample-projects" id="sample-projects"></a>

caver-jsを使ったDApp（ブロックチェーンアプリケーション）開発サンプルプロジェクトは以下の通り：

- [カウントDApp](../../../build/tutorials/count-dapp/count-dapp.md)
- [Klaystagram](../../../build/tutorials/klaystagram/klaystagram.md)

## トラブルシューティング<a href="#troubleshooting" id="troubleshooting"></a>

- **Error: Can't resolve 'fs'** は、ウェブブラウザでcaver-jsを使用してビルド中に発生します：

  - 以下のwebpackの設定を追加します。

  ```
  module.exports = {
   	...
   	ノード： {
   		fs: 'empty',
   	}
   	...
   }
  ```

  WebフレームワークのNext.jsを使用している場合は、次のように**next.config.json**ファイルにwebpackの設定を追加します：

  ```
  module.exports = {
   	webpack: (config, { isServer }) => {
   		if (!isServer) {
   			config.node = {
   				fs: 'empty'
   			}
   		}.
   		return config
   	}.
   }
  ```

## リンク<a href="#links" id="links"></a>

- caver-js [GitHub リポジトリ](https://github.com/kaiachain/caver-js)
- caver-js on [npm](https://www.npmjs.com/package/caver-js)
