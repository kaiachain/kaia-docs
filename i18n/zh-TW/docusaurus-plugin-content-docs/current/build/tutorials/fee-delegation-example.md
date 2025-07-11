# 建設費委託示例

## 目錄<a href="#table-of-contents" id="table-of-contents"></a>

- [1. 導言](#1-introduction)
- [2. 如何進行收費授權](#2-how-fee-delegation-works)
  - 2.1 發送方簽署交易
  - 2.2 付款人簽署交易
- [3. 收費委託的簡單服務器和客戶端](#3-simple-server-and-client-for-fee-delegation)
  - 3.1 環境設定
  - 3.2 寄件者用戶端
  - 3.2 繳費者服務器
- [4. 運行示例](#4-run-example)
  - 4.1 運行 `feepayer_server.js`
  - 4.2 運行 `sender_client.js`
  - 4.3 檢查 `feepayer_server.js`
  - 4.4 對 Kaiascan 的看法

## 1. 導言<a href="#1-introduction" id="1-introduction"></a>

本教學引導您使用 Kaia SDK (ethers-ext) 建立一個簡單的伺服器-用戶端範例，以示範費用授權的價值轉移交易如何在 Kaia 上運作。 本教學與範例程式碼已在 Kairos 測試網路上進行測試。

## 2. 如何進行費用委託<a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

讓我們簡要了解一下費用委託的運作方式。

### 2.1 發送方簽署交易<a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

發送方 "在發送交易之前，應始終簽署交易。

要簽署交易，使用 [signTransaction](../../references/sdk/ethers-ext/v6/account-management/send-transaction/legacy-recover-tx.mdx) 用指定的私密金鑰簽署交易。

```javascript
const senderAddress = "SENDER_ADDRESS";
const senderPrivateKey = "SENDER_PRIVATE_KEY";
const recieverAddr = "RECEIVER_ADDRESS";

// Create a new transaction
let tx = {
  type：TxType.FeeDelegatedValueTransfer,
  to: recieverAddr,
  value: parseKaia("0.01"),
  from: senderAddress,
};
  
// Sign the transaction

tx = await senderWallet.populateTransaction(tx);
console.log(tx);

const senderTxHashRLP = await senderWallet.signTransaction(tx);
console.log("senderTxHashRLP", senderTxHashRLP)；
```

如果沒有錯誤，那麼 `senderTxHashRLP` 將會有一個已簽署的交易，這個交易是由 `senderPrivateKey` 簽署的。

現在，您需要傳送 `senderTxHashRLP` 給付費者。 有多種實現方法。 在本教程中，我們將為您提供一個簡單的伺服器-用戶端程式碼，以傳送「senderTxHashRLP」給付費者為例。

### 2.2 付款人簽署交易<a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

當 `fee payer` 收到 `senderTxHashRLP` 時，`fee payer` 用他們的私人金鑰再次簽署 `senderTxHashRLP` 並將交易傳送給 Kaia。 下面的代碼片段說明瞭這一過程。

[ sendTransactionAsFeePayer](https://docs.kaia.io/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer/) 方法在傳送交易前，先用給定的付費者私密金鑰簽署交易。 在執行程式碼之前，請以實際值取代 "FEEPAYER_ADDRESS「 和 」PRIVATE_KEY"。

請注意，當付費者代表寄件者向 Kaia 提交交易時，`senderTxHashRLP` 類型必須是`FeeDelegatedValueTransfer` 類型的交易。

```javascript
const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "FEEPAYER_PRIVATE_KEY"

const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
console.log("sentTx", sentTx);

const rc = await sentTx.wait();
console.log("receipt", rc)；
```

## 3. 簡單的服務器和用戶端費用授權<a href="#3-simple-server-and-client-for-fee-delegation" id="3-simple-server-and-client-for-fee-delegation"></a>

讓我們使用上述的費用委託代碼寫一個簡單的伺服器和用戶端。

### 3.1 環境設定<a href="#3-1-environment-setup" id="3-1-environment-setup"></a>

我們將使用 `npm init -y` 設定 Node.js 專案，並安裝 [ethers-ext](../../references/sdk/ethers-ext/getting-started.md)

```bash
mkdir feedelegation_server
cd feedelegation_server
npm init -y
npm install - -save @kaiachain/ethers-ext@^1.2.0 ethers@6
```

:::note
@kaiachain/ethers-ext@^1.2.0 建議使用節點 22 或更新版本
:::

### 3.2 寄件者用戶端<a href="#3-1-sender-s-client" id="3-1-sender-s-client"></a>

首先，我們要編寫一個`sender_client.js`，如下所示。

在範例中，請以實際值取代`"SENDER_ADDRESS"`、`"SENDER_PRIVATEKEY「` 和`」RECEIVER_ADDRESS"`。

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
  
     // Create a new transaction
    let tx = {
        type：TxType.FeeDelegatedValueTransfer,
        to: recieverAddr,
        value: parseKaia("0.01"),
        from: senderAddress,
      };
  
      // 簽署交易
      tx = await senderWallet.populateTransaction(tx);
      console.log(tx);
    
      const senderTxHashRLP = await senderWallet.signTransaction(tx);
      console.log("senderTxHashRLP", senderTxHashRLP);
    
  
      if (!senderTxHashRLP) {
        throw new Error("Failed to generate raw transaction");
      }
  
      // 將已簽署的原始交易傳送至付費者的伺服器
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
    }
  };

  sendFeeDelegateTx()；
```

上述程式碼使用 `senderPrivateKey` 簽署費用委託價值轉移交易，並將簽署的 `senderTxHashRLP` 傳送至費用支付者的伺服器，該伺服器在 `127.0.0.1` 上的 `1337` 連接埠上執行，也就是 localhost。

### 3.3 付費者伺服器<a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

現在讓我們來寫付費者的伺服器，`feepayer_server.js`，它會用`feePayerPrivateKey`來簽署收到的`senderTxHashRLP`，然後傳送到 Kairos testnet。

在下面的範例中，請以實際值取代`"FEEPAYER_ADDRESS「`和`」FEEPAYER_PRIVATEKEY"`。

```javascript
const { createServer } = require("net");
const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext").v6;

const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "FEEPAYER_PRIVATE_KEY";

const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
const feePayerWallet = new Wallet(feePayerPrivateKey, provider);

const feePayerSign = async (senderTxHashRLP, socket) => {
  try {
    
    // Send the transaction
    const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
    console.log("sentTx", sentTx);
  
    const rc = await sentTx.wait();
    console.log("receipt", rc);

    if (rc.transactionHash) {
      socket.write(`Tx hash: ${rc.transactionHash}\n`);
      socket.write(`Sender Tx hash: ${rc.senderTxHash || ""}\n`);
    }
  } catch (error) {
    console.error("Error in feePayerSign:", error);
    socket.write(`Error: ${error.message}\n`);
  }
};

const server = createServer(function (socket) {
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

服務器監聽端口為 `1337`。

當有 "數據 "傳入時，它會用 "付費者私鑰 "對 "數據 "進行簽名，並將其發送到 Kaia 區塊鏈。 它假設 `data` 是 `sender_client.js` 中的 `senderTxHashRLP`。

## 4. 運行示例<a href="#4-run-example" id="4-run-example"></a>

準備兩個終端，一個是 `sender_client.js` 終端，另一個是 `feepayer_server.js` 終端。

### 4.1 運行 `feepayer_server.js`<a href="#4-1-run-feepayer_server-js" id="4-1-run-feepayer_server-js"></a>

執行以下指令啟動付費者的伺服器：

```bash
node feepayer_server.js

// output
Fee delegate service started ...
```

服務器啟動並監聽 1337 端口。

### 4.2 運行 `sender_client.js`<a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

讓我們運行 `sender_client.js` 發送一筆委託收費交易。

```bash
$ node sender_client.js

// 輸出
{
  type：9,
  to：'0x3a388d3fD71A0d9722c525E17007DdCcc41e1C47',
  value: 10000000000000000n,
  from: '0x7D3C7202582299470F2aD3DDCB8EF2F45407F871',
  nonce: 202,
  gasLimit: 52500,
  gasPrice: '27500000000',
  chainId：'1001'
}
senderTxHashRLP0x09f88681ca85066720b30082cd14943a388d3fd71a0d9722c525e17007ddccc41e1c47872386f26fc10000947d3c7202582299470f2ad3ddcb8ef2f45407f871f847f8458207f6a0820d11029771f2fa368ce11da01f1c9e7f4de6d48915074d149e132692f9d63ea0131c62470a6799dfc5d7e3a7ac8d0a4f3b8fb8b59110ca5dabb26a9ee409f274
連接至費用委派服務
從伺服器接收資料：This is fee delegating, serviceFee payer is 0x88311cD55B656D2502b50f62E83F8279c1641e70
```

它將用 "發送方 "私鑰簽署交易，並將簽署後的交易發送到費用委託服務（即費用支付方的服務器）。 然後，它會收到來自費用委託服務的回應，包括 `Fee payer` 位址、`Tx hash`. `Tx hash` 是提交給 Kaia 網路的交易的哈希值。

### 4.3 檢查 `feepayer_server.js`<a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

在伺服器的主控台上，您會看到以下輸出。 它會列印 Kaia 的交易收據。

```bash
$ node feepayer_server.js

Fee delegate 服務已啟動 ...
用戶端已連接 ...
從用戶端接收到資料0x09f88681ca85066720b30082cd14943a388d3fd71a0d9722c525e17007ddccc41e1c47872386f26fc10000947d3c7202582299470f2ad3ddcb8ef2f45407f871f847f8458207f6a0820d11029771f2fa368ce11da01f1c9e7f4de6d48915074d149e132692f9d63ea0131c62470a6799dfc5d7e3a7ac8d0a4f3b8fb8b59110ca5dabb26a9ee409f274
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
}

```

### 4.4 對 Kaiascan 的看法<a href="#4-4-kaiascan" id="4-4-kaiascan"></a>

您也可以在 [Kaiascan](https://kairos.kaiascan.io/tx/0x7cb1e8d20b4db7d9db1abc094781e1af83a9391153aab8cc935510639a548222?tabId=overview&page=1) 上找到上述交易。

它顯示交易是 `TxTypeFeeDelegatedValueTransfer` 且 `Fee payer` 是 `0x88311cd55b656d2502b50f62e83f8279c1641e70` 或您輸入的 `feepayerAddress` ，而 `From` 是不同的地址，應該是上面範例中的 `senderAddress` 。

![費用委託 Tx](/img/build/tutorials/fd-kaiascan-example.png)
