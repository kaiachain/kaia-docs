# 建築費の委任例

## 目次<a href="#table-of-contents" id="table-of-contents"></a>

- [1. はじめに](#1-introduction)
- [2. 料金委譲の仕組み](#2-how-fee-delegation-works)
  - 2.1 送信者によるトランザクション署名
  - 2.2 料金支払者による取引署名
- [3. 料金委譲のためのシンプルなサーバーとクライアント](#3-simple-server-and-client-for-fee-delegation)
  - 3.1 送り手のクライアント
  - 3.2 料金支払者のサーバー
- [4. 実行例](#4-run-example)
  - 4.1 `feepayer_server.js` を実行する
  - 4.2 `sender_client.js` を実行する
  - 4.3 `feepayer_server.js` のチェック
  - 4.4 カイアのスコープ

## 1. はじめに<a href="#1-introduction" id="1-introduction"></a>

このチュートリアルは、Caver-js SDKを使用して、Kaiaにおける料金委譲トランザクションがどのように機能するかを説明する、簡単なサーバ・クライアントの例を書くのに役立ちます。 This tutorial and the example code is using the Baobab testnet.

## 2. 料金委譲の仕組み<a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

料金委譲の仕組みをざっと説明しよう。

### 2.1 送信者によるトランザクション署名<a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

送信者\`はトランザクションを送信する前に常にトランザクションに署名すべきである。

To sign a transaction, use [signTransaction](../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#signtransaction) which signs a transaction with given private key.

```
// using the event emitter
const senderAddress = "SENDER_ADDRESS";
const senderPrivateKey = "SENDER_PRIVATEKEY";
const toAddress = "TO_ADDRESS";

    // Create a new transaction
    const tx = caver.transaction.feeDelegatedValueTransfer.create({
      from: keyring.address,
      to: toAddress,
      value: caver.utils.toPeb("0.0001", "KAIA"),
      gas: 100000,
      gasPrice: await caver.rpc.klay.getGasPrice(), // Get current gas price
      chainId: await caver.rpc.klay.getChainId(), // Get current chain ID
    });

        // Sign the transaction
    const signed = await caver.wallet.sign(keyring.address, tx);

    const senderRawTransaction = tx.getRLPEncoding();
```

エラーがなければ、 `senderRawTransaction` は `senderPrivateKey` で署名されたトランザクションを持つ。

次に、 `senderRawTransaction` を料金支払者に送信する必要があります。 これを実施する方法はいろいろあるだろう。 このチュートリアルでは、`senderRawTransaction`を料金支払者に送信する例として、簡単なサーバークライアントコードを提供します。

### 2.2 料金支払者による取引署名<a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

フィー支払者は `senderRawTransaction` を受け取ると、秘密鍵で `senderRawTransaction` に再度署名し、Kaia にトランザクションを送信する。 以下のコード・スニペットはそのプロセスを示している。 Before running the code, please replace `"FEEPAYER_ADDRESS"` and `"PRIVATE_KEY"` with the actual values. コードを実行する前に、`"FEEPAYER_ADDRESS"` と `"PRIVATE_KEY"` を実際の値に置き換えてください。

手数料の支払者`が`送金者`に代わってKaiaにトランザクションを提出する場合、`senderRawTransaction`タイプは`FEE_DELEGATED`タイプでなければならないことに注意すること。 以下の例では、[sendTransaction(FEE_DELEGATED_VALUE_TRANSFER)](../../references/sdk/caver-js-1.4.1/api/caver.kaia/transaction/sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer) メソッドが呼び出されます。これは、送信者によって生成された元の `senderRawTransaction\` が [TxTypeFeeDelegatedValueTransfer](../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer) であったためです。

```
const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "PRIVATE_KEY"

const tx = caver.transaction.decode(senderRawTransaction);
    console.log("Decoded transaction:", tx);

    tx.feePayer = keyring.address;

    const signed = await caver.wallet.signAsFeePayer(keyring.address, tx);

    // Send the transaction
    const receipt = await caver.rpc.klay.sendRawTransaction(
      signed.getRLPEncoding()
    )
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```

## 3. 料金委譲のためのシンプルなサーバーとクライアント<a href="#3-simple-server-and-client-for-fee-delegation" id="3-simple-server-and-client-for-fee-delegation"></a>

上記の料金委譲コードを使って、簡単なサーバーとクライアントを書いてみよう。

### 3.1 環境設定<a href="#3-1-environment-setup" id="3-1-environment-setup"></a>

`npm`と[caver-js](../../references/sdk/caver-js-1.4.1/get-started-1.4.1.md)を使って、この例の環境を以下のようにセットアップする。

```
$ mkdir example
$ cd example
$ npm init
$ npm install caver-js@latest
```

### 3.1 送り手のクライアント<a href="#3-1-sender-s-client" id="3-1-sender-s-client"></a>

まず、以下のように `sender_client.js` を書く。

例では、`"SENDER_ADDRESS"`、`"SENDER_PRIVATEKEY"`、`"TO_ADDRESS"` を実際の値に置き換えてください。

```javascript
import { Socket } from "net";
import Caver from "caver-js";

const client = new Socket();
const caver = new Caver("https://public-en-kairos.node.kaia.io");

const senderAddress = "SENDER_ADDRESS";
const senderPrivateKey =
  "SENDER_PRIVATE_KEY";
const toAddress = "TO_ADDRESS";

const sendFeeDelegateTx = async () => {
  try {
    // Add sender's keyring to wallet
    const keyring = caver.wallet.newKeyring(senderAddress, senderPrivateKey);

    // Create a new transaction
    const tx = caver.transaction.feeDelegatedValueTransfer.create({
      from: keyring.address,
      to: toAddress,
      value: caver.utils.toPeb("0.0001", "KAIA"),
      gas: 100000,
      gasPrice: await caver.rpc.klay.getGasPrice(), // Get current gas price
      chainId: await caver.rpc.klay.getChainId(), // Get current chain ID
    });

    // Sign the transaction
    const signed = await caver.wallet.sign(keyring.address, tx);

    const senderRawTransaction = tx.getRLPEncoding();

    if (!senderRawTransaction) {
      throw new Error("Failed to generate raw transaction");
    }

    // Send signed raw transaction to fee payer's server
    client.connect(1337, "127.0.0.1", () => {
      console.log("Connected to fee delegated service");
      client.write(senderRawTransaction);
    });

    client.on("data", (data) => {
      console.log("Received data from server:", data.toString());
    });

    client.on("error", (error) => {
      console.error("Connection error:", error);
      s;
    });

    client.on("close", () => {
      console.log("Connection closed");
    });
  } catch (error) {
    console.error("Transaction error:", error);
    client.end();
    process.exit(1);
  }
};

sendFeeDelegateTx();

```

上記のコードは `senderPrivateKey` で手数料の委任された価値移転トランザクションに署名し、署名された `senderRawTransaction` を `127.0.0.1` のポート `1337` で動作している手数料支払者のサーバ、すなわち localhost に送信する。

### 3.2 料金支払者のサーバー<a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

それでは、受信した `senderRawTransaction` に `feePayerPrivateKey` で署名し、Kairos testnet に送信する料金支払者のサーバ `feepayer_server.js` を書いてみよう。

以下の例では、`"FEEPAYER_ADDRESS"`と`"FEEPAYER_PRIVATEKEY"`を実際の値に置き換えてください。

```javascript
import { createServer } from "net";
import Caver from "caver-js";

const caver = new Caver("https://public-en-kairos.node.kaia.io");
const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey =
  "FEEPAYER_PRIVATE_KEY";

// add fee payer's keyring to wallet

const keyring = caver.wallet.newKeyring(feePayerAddress, feePayerPrivateKey);

const feePayerSign = async (senderRawTransaction, socket) => {
  try {
    const tx = caver.transaction.decode(senderRawTransaction);
    console.log("Decoded transaction:", tx);

    tx.feePayer = keyring.address;

    const signed = await caver.wallet.signAsFeePayer(keyring.address, tx);

    // Send the transaction
    const receipt = await caver.rpc.klay.sendRawTransaction(
      signed.getRLPEncoding()
    );
    console.log("Transaction receipt:", receipt);

    if (receipt.transactionHash) {
      socket.write(`Tx hash: ${receipt.transactionHash}\n`);
      socket.write(`Sender Tx hash: ${receipt.senderTxHash || ""}\n`);
    }
  } catch (error) {
    console.error("Error in feePayerSign:", error);
    socket.write(`Error: ${error.message}\n`);
  }
};

var server = createServer(function (socket) {
  console.log("Client is connected ...");
  socket.write("This is fee delegating service");
  socket.write("Fee payer is " + feePayerAddress);
  socket.on("data", function (data) {
    console.log("Received data from client:", data.toString());
    feePayerSign(data.toString(), socket);
  });
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen(1337, "127.0.0.1");
console.log("Fee delegate service started ...");

```

サーバーはポート `1337` をリッスンする。

受信した `data` がある場合、`feePayerPrivateKey` で `data` に署名し、Kaia ブロックチェーンに送信する。 `data` は `sender_client.js` の `senderRawTransaction` であると仮定します。

## 4. 実行例<a href="#4-run-example" id="4-run-example"></a>

`sender_client.js`と`feepayer_server.js`の2つのターミナルを用意する。

### 4.1 `feepayer_server.js` を実行する<a href="#4-1-run-feepayer_server-js" id="4-1-run-feepayer_server-js"></a>

以下のコマンドは、料金支払者のサーバーを起動する。

```
$ node feepayer_server.js
Fee delegate service started ...
```

サーバーが起動し、ポート1337でリッスンしている。

### 4.2 `sender_client.js` を実行する<a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

それでは、`sender_client.js` を実行して手数料の委任トランザクションを送信してみよう。

```
$ node sender_client.js
料金委譲価値移転トランザクションに署名。
署名されたトランザクションを手数料代行サービスに送信。

サーバーからデータを受信：こちらは手数料代行サービス
サーバからデータを受信：Fee payer is 0x811CE345DB9D8aD17513Cc77d76a1ace9eC46F02
Received data from server：Tx hash is 0x1e6a019bb9c6cf156a6046ca33f0c810fb9fb6fdcb6df32b2e34a1d50f7f8a9d
サーバーからデータを受信した：送信者 Tx ハッシュは 0x7263d2dc5b36abc754726b220b7ad243dd789934109c6874e539ada5c7e9f193 です。
```

送信者」の秘密鍵でトランザクションに署名し、署名されたトランザクションを料金支払者 のサーバーに送信する。 そして、料金支払い者アドレス、Txハッシュ、送信者Txハッシュを含む料金デリゲートサービスからの応答を受け取る。 `Tx hash`はKaiaネットワークに提出されたトランザクションのハッシュであり、`Sender Tx hash`は手数料支払者のアドレスと署名のないトランザクションのハッシュである。 詳しくは[SenderTxHash](../../learn/transactions/transactions.md#sendertxhash)をご覧ください。

### 4.3 `feepayer_server.js` のチェック<a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

サーバーのコンソールには、以下のような出力が表示される。 カイアからの取引レシートを印刷する。

```
$ node feepayer_server.js
Fee delegate service started ...
Client is connected ...
Received data from client: 0x09f89f0485066720b300830186a094811ce345db9d8ad17513cc77d76a1ace9ec46f02865af3107a400094213eb97cc74af77b78d1cfd968bc89ab816872daf847f8458207f5a0cefe267a80c014d1750c31aa312843b3696a14abebc1be88c63d0b63d6b6f714a0512abfe3533f2cfd924e7decdd21e05f22a22f04b35db09f39839708043daac3940000000000000000000000000000000000000000c4c3018080
Decoded transaction: FeeDelegatedValueTransfer {
  _type: 'TxTypeFeeDelegatedValueTransfer',
  _from: '0x213eb97cc74af77b78d1cfd968bc89ab816872da',
  _gas: '0x186a0',
  _nonce: '0x4',
  _signatures: [
    SignatureData {
      _v: '0x07f5',
      _r: '0xcefe267a80c014d1750c31aa312843b3696a14abebc1be88c63d0b63d6b6f714',
      _s: '0x512abfe3533f2cfd924e7decdd21e05f22a22f04b35db09f39839708043daac3'
    }
  ],
  _klaytnCall: {
    getChainId: [Function (anonymous)] {
      method: [Method],
      request: [Function: bound request],
      call: 'klay_chainID',
      getMethod: [Function (anonymous)]
    },
    getGasPrice: [Function (anonymous)] {
      method: [Method],
      request: [Function: bound request],
      call: 'klay_gasPrice',
      getMethod: [Function (anonymous)]
    },
    getTransactionCount: [Function (anonymous)] {
      method: [Method],
      request: [Function: bound request],
      call: 'klay_getTransactionCount',
      getMethod: [Function (anonymous)]
    },
    getHeaderByNumber: [Function (anonymous)] {
      method: [Method],
      request: [Function: bound request],
      call: 'klay_getHeaderByNumber',
      getMethod: [Function (anonymous)]
    },
    getAccountKey: [Function (anonymous)] {
      method: [Method],
      request: [Function: bound request],
      call: 'klay_getAccountKey',
      getMethod: [Function (anonymous)]
    },
    getTransactionByHash: [Function (anonymous)] {
      method: [Method],
      request: [Function: bound request],
      call: 'klay_getTransactionByHash',
      getMethod: [Function (anonymous)]
    },
    getMaxPriorityFeePerGas: [Function (anonymous)] {
      method: [Method],
      request: [Function: bound request],
      call: 'klay_maxPriorityFeePerGas',
      getMethod: [Function (anonymous)]
    }
  },
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x811ce345db9d8ad17513cc77d76a1ace9ec46f02',
  _value: '0x5af3107a4000',
  _gasPrice: '0x66720b300'
}
Transaction receipt: {
  blockHash: '0xb2727edaa2ffc8a8fece0ce54154b469887a9f6725bac6811ac610131c135046',
  blockNumber: '0xa45da40',
  contractAddress: null,
  effectiveGasPrice: '0x66720b300',
  feePayer: '0x811ce345db9d8ad17513cc77d76a1ace9ec46f02',
  feePayerSignatures: [
    {
      V: '0x7f6',
      R: '0x6207f1c3c8c75f1a57ff3d1c87a51b7067f6076b1bf37c3a1ad296e441cfa9db',
      S: '0x7f086233c6d99f92d78bd1d3292127c1bda7fc41bab670a9e8a38302a742eb11'
    }
  ],
  from: '0x213eb97cc74af77b78d1cfd968bc89ab816872da',
  gas: '0x186a0',
  gasPrice: '0x66720b300',
  gasUsed: '0x7918',
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x4',
  senderTxHash: '0x7263d2dc5b36abc754726b220b7ad243dd789934109c6874e539ada5c7e9f193',
  signatures: [
    {
      V: '0x7f5',
      R: '0xcefe267a80c014d1750c31aa312843b3696a14abebc1be88c63d0b63d6b6f714',
      S: '0x512abfe3533f2cfd924e7decdd21e05f22a22f04b35db09f39839708043daac3'
    }
  ],
  status: '0x1',
  to: '0x811ce345db9d8ad17513cc77d76a1ace9ec46f02',
  transactionHash: '0x1e6a019bb9c6cf156a6046ca33f0c810fb9fb6fdcb6df32b2e34a1d50f7f8a9d',
  transactionIndex: '0x1',
  type: 'TxTypeFeeDelegatedValueTransfer',
  typeInt: 9,
  value: '0x5af3107a4000'
}
```

### 4.4 カイアスコープ<a href="#4-4-kaia-scope" id="4-4-kaia-scope"></a>

上記の取引は[Kaiascope](https://kairos.kaiascope.com)でもご覧いただけます。

トランザクションは `TxTypeFeeDelegatedValueTransfer` で、`Fee payer` は `0x811CE345DB9D8aD17513Cc77d76a1ace9eC46F02` または入力した `feepayerAddress` である。

![料金委任Tx](/img/build/tutorials/fee-delegation-example-kaia.png)
