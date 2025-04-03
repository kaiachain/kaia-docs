# Fee Delegationのサンプルの開発

## 目次<a href="#table-of-contents" id="table-of-contents"></a>

- [1. はじめに](#1-introduction)
- [2. Fee Delegationの仕組み](#2-how-fee-delegation-works)
  - 2.1 送信者によるトランザクション署名
  - 2.2 料金支払者による取引署名
- [3. Fee Delegationのためのシンプルなサーバーとクライアント](#3-simple-server-and-client-for-fee-delegation)
  - 3.1 環境設定
  - 3.2 送信者クライアント
  - 3.2 料金支払者のサーバー
- [4. 実行例](#4-run-example)
  - 4.1 `feepayer_server.js` を実行する
  - 4.2 `sender_client.js` を実行する
  - 4.3 `feepayer_server.js` のチェック
  - 4.4 Kaiascanで見る

## 1. はじめに<a href="#1-introduction" id="1-introduction"></a>

このチュートリアルは、Caver-js SDKを使用して、Kaiaにおける料金委譲トランザクションがどのように機能するかを説明する、簡単なサーバ・クライアントの例を書くのに役立ちます。 チュートリアルとサンプルコードはKairos testnetでテストされています。

## 2. Fee Delegationの仕組み<a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

Fee Delegationの仕組みをざっと説明しよう。

### 2.1 送信者によるトランザクション署名<a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

送信者\\`はトランザクションを送信する前に常にトランザクションに署名すべきである。

トランザクションに署名するには、[signTransaction](../../references/sdk/ethers-ext/v6/account-management/send-transaction/legacy-recover-tx.mdx) を使用します。これは、与えられた秘密鍵でトランザクションに署名します。

```javascript
const senderAddress = "SENDER_ADDRESS";
const senderPrivateKey ="SENDER_PRIVATE_KEY";
const recieverAddr = "RECEIVER_ADDRESS";

// 新規トランザクションの作成
let tx = {
  type：TxType.FeeDelegatedValueTransfer,
  to: recieverAddr,
  value: parseKaia("0.01"),
  from: senderAddress,
};
  
// トランザクションの署名

tx = await senderWallet.populateTransaction(tx);
console.log(tx);

const senderTxHashRLP = await senderWallet.signTransaction(tx);
console.log("senderTxHashRLP", senderTxHashRLP)；
```

エラーがなければ、`senderTxHashRLP` は `senderPrivateKey` によって署名されたトランザクションを持つ。

次に、`senderTxHashRLP` を料金支払者に送信する必要がある。 これを実装するには様々な方法があります。 このチュートリアルでは、`senderTxHashRLP` を料金支払者に送信する例として、簡単なサーバ・クライアントコードを提供します。

### 2.2 料金支払者による取引署名<a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

フィー支払者は `senderRawTransaction` を受け取ると、秘密鍵で `senderRawTransaction` に再度署名し、Kaia にトランザクションを送信する。 以下のコード・スニペットはそのプロセスを示している。

[sendTransactionAsFeePayer](https://docs.kaia.io/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer/) メソッドは、トランザクションを送信する前に、与えられた料金支払者の秘密鍵でトランザクションに署名する。 コードを実行する前に、`"FEEPAYER_ADDRESS"` と `"PRIVATE_KEY"` を実際の値に置き換えてください。

料金支払者が送信者に代わってKaiaにトランザクションを送信する場合、`senderTxHashRLP` タイプは `FeeDelegatedValueTransfer` タイプのトランザクションでなければならないことに注意すること。

```javascript
const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "FEEPAYER_PRIVATE_KEY"

const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
console.log("sentTx", sentTx);

const rc = await sentTx.wait();
console.log("receipt", rc);
```

## ３． Fee Delegationのためのシンプルなサーバーとクライアント]()

上記のFee Delegationのコードを使って、簡単なサーバーとクライアントを書いてみよう。

### 3.1 環境設定

npm init -y\` を使って Node.js プロジェクトをセットアップし、[ether-ext](../../references/sdk/ethers-ext/getting-started.md) をインストールします。

```bash
mkdir feedelegation_server
cd feedelegation_server
npm init -y
npm install - -save @kaiachain/ethers-ext@^1.2.0 ethers@6
```

:::note
mkdir feedelegation_server
cd feedelegation_server
npm init -y
npm install - -save @kaiachain/ethers-ext@^1.2.0 ethers@6
:::

### kaiachain/ethers-ext@^1.2.0 はノード 22 以降を推奨します。

まず、以下のように `sender_client.js` を書く。

この例では、`"SENDER_ADDRESS"`、`"SENDER_PRIVATEKEY"`、`"RECEIVER_ADDRESS"`を実際の値に置き換えてください。

```javascript
const { Socket } = require("net");
const client = new Socket();

const { Wallet, TxType, parseKaia } = require("@kaiachain/ethers-ext").v6;
const ethers = require("ethers");

const senderAddress = "SENDER_ADDRESS";
const senderPrivateKey = "SENDER_PRIVATE_KEY";
const recieverAddr = "RECEIVER_ADDRESS";

const sendFeeDelegateTx = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

      const senderWallet = new Wallet(senderPrivateKey, provider);
  
     // 新規トランザクションの作成
    let tx = {
        type：TxType.FeeDelegatedValueTransfer,
        to: recieverAddr,
        value: parseKaia("0.01"),
        from: senderAddress,
      };
  
      // トランザクションの署名
      tx = await senderWallet.populateTransaction(tx);
      console.log(tx);
    
      const senderTxHashRLP = await senderWallet.signTransaction(tx);
      console.log("senderTxHashRLP", senderTxHashRLP);
    
  
      if (!senderTxHashRLP) {
        throw new Error("Failed to generate raw transaction");
      } // 署名された生トランザクションを料金支払いに送る。
  
      //
      client.connect(1337, "127.0.0.1", () => {
        console.log("Connected to fee delegated service");
        client.write(senderTxHashRLP);
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
    }.
  };

  sendFeeDelegateTx()；
```

上記のコードは、`senderPrivateKey`で手数料委任価値移転トランザクションに署名し、署名された `senderTxHashRLP` を `127.0.0.1` のポート `1337` で動作している手数料支払者のサーバ、すなわち localhost に送信する。

### 3.3 料金支払者のサーバー<a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

それでは、受信した `senderRawTransaction` に `feePayerPrivateKey` で署名し、Kairos testnet に送信する料金支払者のサーバ `feepayer_server.js` を書いてみよう。

以下の例では、`"FEEPAYER_ADDRESS"` と `"FEEPAYER_PRIVATEKEY"` を実際の値に置き換えてください。

```javascript
const { createServer } = require("net");
const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext").v6;

const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "FEEPAYER_PRIVATE_KEY";

const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
const feePayerWallet = new Wallet(feePayerPrivateKey, provider);

const feePayerSign = async (senderTxHashRLP, socket) => {
  try {
    
    // トランザクションの送信
    const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
    console.log("sentTx", sentTx);
  
    const rc = await sentTx.wait();
    console.log("receipt", rc);

    if (rc.transactionHash) {
      socket.write(`Tx hash: ${rc.transactionHash}\n`);
      socket.write(`Sender Tx hash: ${rc.senderTxHash || ""}\n`);
    }.
  } catch (error) {
    console.error("Error in feePayerSign:", error);
    socket.write(`Error: ${error.message}\n`);
  }.
};

const server = createServer(function (socket) {
  console.log("クライアントが接続されました ...");
  socket.write("これは手数料の委任サービスです");
  socket.write("手数料の支払者は " + feePayerAddress");
  
  socket.on("data", function (data) {
    console.log("クライアントからデータを受け取りました:", data.toString());
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

以下のコマンドを実行して、料金支払者のサーバーを起動する：

```bash
node feepayer_server.js

// output
Fee delegate service started ...
```

サーバーが起動し、ポート1337でリッスンしている。

### 4.2 `sender_client.js` を実行する<a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

それでは、`sender_client.js` を実行して手数料の委任トランザクションを送信してみよう。

```bash
$ node sender_client.js

// 出力
{
  type：9,
  to：'0x3a388d3fD71A0d9722c525E17007DdCcc41e1C47',
  value: 1000000000000n,
  from: '0x7D3C7202582299470F2aD3DDCB8EF2F45407F871',
  nonce: 202,
  gasLimit: 52500,
  gasPrice: '27500000000',
  chainId：'1001'
}
senderTxHashRLP0x09f88681ca85066720b30082cd14943a388d3fd71a0d9722c525e17007ddccc41e1c47872386f26fc10000947d3c7202582299470f2ad3ddcb8ef2f45407f871f847f8458207f6a0820d11029771f2fa368ce11da01f1c9e7f4de6d48915074d149e132692f9d63ea0131c62470a6799dfc5d7e3a7ac8d0a4f3b8fb8b59110ca5dabb26a9ee409f274
料金代行サービスに接続
サーバーからデータを受信：これは手数料の委任であり、サービス手数料の支払者は 0x88311cD55B656D2502b50f62E83F8279c1641e70 です。
```

送信者」の秘密鍵でトランザクションに署名し、署名されたトランザクションを料金支払者 のサーバーに送信する。 次に、`Fee payer` アドレス、`Tx hash` を含む、fee delegate サービスからの応答を受信する。 Txハッシュ\`はKaiaネットワークに送信されたトランザクションのハッシュである。

### 4.3 `feepayer_server.js` のチェック<a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

サーバーのコンソールには、以下のような出力が表示される。 カイアからの取引レシートを印刷する。

```bash
$ node feepayer_server.js

Fee delegate サービス開始 ...
クライアントが接続されました ...
クライアントからデータを受信しました：0x09f88681ca85066720b30082cd14943a388d3fd71a0d9722c525e17007ddccc41e1c47872386f26fc10000947d3c7202582299470f2ad3ddcb8ef2f45407f871f847f8458207f6a0820d11029771f2fa368ce11da01f1c9e7f4de6d48915074d149e132692f9d63ea0131c62470a6799dfc5d7e3a7ac8d0a4f3b8fb8b59110ca5dabb26a9ee409f274
sentTx TransactionResponse {
…
  to：'0x3a388d3fD71A0d9722c525E17007DdCcc41e1C47',
  from: '0x7D3C7202582299470F2aD3DDCB8EF2F45407F871',
  contractAddress: null,
  hash：'0x7cb1e8d20b4db7d9db1abc094781e1af83a9391153aab8cc935510639a548222',
  index：0,
  blockHash: '0x50d3d7e143579e17dbc17b761c8e04331c6d4d950fe7563ac9a79d42a649de0a',
  blockNumber: 177078710,
  logsBloom：'0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  gasUsed：31000n,
  blobGasUsed：null,
  cumulativeGasUsed：31000n,
  gasPrice: 27500000000n,
  blobGasPrice: null,
  type：0,
  status：1,
  root: undefined
}.

```

### 4.4 Kaiascanで見る

上記のトランザクションは、Kaiascan でも見つけることができます。

これは、トランザクションが `TxTypeFeeDelegatedValueTransfer` であり、`Fee payer` が `0x88311cd55b656d2502b50f62e83f8279c1641e70` または入力した `feepayerAddress` であることを示しています。

![Fee Delegation Tx](/img/build/tutorials/fd-kaiascan-example.png)
