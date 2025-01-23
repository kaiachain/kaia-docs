# 建設費委託示例

## 目錄<a href="#table-of-contents" id="table-of-contents"></a>

- [1. 導言](#1-introduction)
- [2. 如何進行收費授權](#2-how-fee-delegation-works)
  - 2.1 發送方簽署交易
  - 2.2 付款人簽署交易
- [3. 收費委託的簡單服務器和客戶端](#3-simple-server-and-client-for-fee-delegation)
  - 3.1 發件人客戶端
  - 3.2 繳費者服務器
- [4. 運行示例](#4-run-example)
  - 4.1 運行 `feepayer_server.js`
  - 4.2 運行 `sender_client.js`
  - 4.3 檢查 `feepayer_server.js`
  - 4.4 Kaia 範圍

## 1. 導言<a href="#1-introduction" id="1-introduction"></a>

本教程將幫助您使用 caver-js SDK 編寫一個簡單的服務器-客戶端示例，以說明在 Kaia 中如何進行費用委託值轉移交易。 本教程和示例代碼使用的是 Kairos 測試網。

## 2. 如何進行費用委託<a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

讓我們簡要了解一下費用委託的運作方式。

### 2.1 發送方簽署交易<a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

發送方 "在發送交易之前，應始終簽署交易。

要簽署交易，請使用 [signTransaction](../../references/sdk/caver-js-1.4.1/api/caver.kaia.accounts.md#signtransaction) 使用給定的私鑰簽署交易。

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

如果沒有錯誤，那麼 `senderRawTransaction` 將有一個已簽名的事務，該事務由 `senderPrivateKey` 簽名。

現在，您需要將 `senderRawTransaction` 發送給繳費人。 實施的方法多種多樣。 在本教程中，我們將提供一個簡單的服務器-客戶端代碼，作為向繳費人發送 "senderRawTransaction "的示例。

### 2.2 付款人簽署交易<a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

當 "付費方 "收到 "發送方原始交易 "時，"付費方 "會用自己的私鑰再次對 "發送方原始交易 "進行簽名，然後將交易發送給 Kaia。 下面的代碼片段說明瞭這一過程。 kaia.sendRawTransaction "方法在發送交易前使用給定賬戶的私鑰對交易進行簽名。 運行代碼前，請將 `"FEEPAYER_ADDRESS"` 和 `"PRIVATE_KEY"` 替換為實際值。

請注意，當 "費用支付方 "代表 "發送方 "向 Kaia 提交交易時，"發送方原始交易 "類型必須是 "FEE_DELEGATED "類型的交易。 在下面的示例中，調用了 [sendTransaction(FEE_DELEGATED_VALUE_TRANSFER)](../../references/sdk/caver-js-1.4.1/api/caver.kaia/transaction/sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer) 方法。由於發送方生成的原始 `senderRawTransaction` 是 [TxTypeFeeDelegatedValueTransfer](../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer），因此調用了該方法。）

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

## 3. 收費委託的簡單服務器和客戶端<a href="#3-simple-server-and-client-for-fee-delegation" id="3-simple-server-and-client-for-fee-delegation"></a>

讓我們用上述費用委託代碼編寫一個簡單的服務器和客戶端。

### 3.1 環境設置<a href="#3-1-environment-setup" id="3-1-environment-setup"></a>

我們將使用 `npm` 和 [caver-js](../../references/sdk/caver-js-1.4.1/get-started-1.4.1.md) 為本示例設置環境，如下所示。

```
$ mkdir example
$ cd example
$ npm init
$ npm install caver-js@latest
```

### 3.1 發件人客戶端<a href="#3-1-sender-s-client" id="3-1-sender-s-client"></a>

首先，我們要編寫一個`sender_client.js`，如下所示。

在示例中，請用實際值替換`"SENDER_ADDRESS"、`"SENDER_PRIVATEKEY "和\`"TO_ADDRESS"。

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

上述代碼使用 "senderPrivateKey "對委託收費轉賬交易進行簽名，並將簽名後的 "senderRawTransaction "發送到收費人的服務器，該服務器運行在 "127.0.0.1 "上的 "1337 "端口，即 localhost。

### 3.2 繳費者服務器<a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

現在，讓我們編寫繳費人服務器 `feepayer_server.js` ，用 `feePayerPrivateKey` 對收到的 `senderRawTransaction` 進行簽名，並將其發送到 Kairos 測試網。

在下面的示例中，請用實際值替換`"FEEPAYER_ADDRESS "和`"FEEPAYER_PRIVATEKEY"。

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

服務器監聽端口為 `1337`。

當有 "數據 "傳入時，它會用 "付費者私鑰 "對 "數據 "進行簽名，並將其發送到 Kaia 區塊鏈。 它假定 `data` 是 `sender_client.js` 中的 `senderRawTransaction` 。

## 4. 運行示例<a href="#4-run-example" id="4-run-example"></a>

準備兩個終端，一個是 `sender_client.js` 終端，另一個是 `feepayer_server.js` 終端。

### 4.1 運行 `feepayer_server.js`<a href="#4-1-run-feepayer_server-js" id="4-1-run-feepayer_server-js"></a>

下面的命令將啟動繳費服務器。

```
$ node feepayer_server.js
Fee delegate service started ...
```

服務器啟動並監聽 1337 端口。

### 4.2 運行 `sender_client.js`<a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

讓我們運行 `sender_client.js` 發送一筆委託收費交易。

```
$ node sender_client.js
已簽署收費委託價值轉移交易。
向收費委託服務發送已簽名交易。
連接到收費委託服務
從服務器接收數據：這是收費委託服務
從服務器接收數據：費用支付方為 0x811CE345DB9D8aD17513Cc77d76a1ace9eC46F02
從服務器接收數據：Tx hash is 0x1e6a019bb9c6cf156a6046ca33f0c810fb9fb6fdcb6df32b2e34a1d50f7f8a9d
從服務器接收數據：發件人發送哈希值為 0x7263d2dc5b36abc754726b220b7ad243dd789934109c6874e539ada5c7e9f193
```

它將用 "發送方 "私鑰簽署交易，並將簽署後的交易發送到費用委託服務（即費用支付方的服務器）。 然後，它將收到繳費委託服務的響應，包括 "繳費人 "地址、"發送哈希值 "和 "發送人發送哈希值"。 Tx哈希值 "是提交給Kaia網絡的交易的哈希值，而 "Sender Tx哈希值 "是交易的哈希值，不包含繳費人的地址和簽名。 更多詳情，請參閱 [SenderTxHash](../../learn/transactions/transactions.md#sendertxhash)。

### 4.3 檢查 `feepayer_server.js`<a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

在服務器控制檯，您將看到以下輸出。 它可以打印來自 Kaia 的交易收據。

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

### 4.4 Kaia 範圍<a href="#4-4-kaia-scope" id="4-4-kaia-scope"></a>

您還可以在 [Kaiascope](https://kairos.kaiascope.com) 上找到上述交易。

它顯示該事務為 "TxTypeFeeDelegatedValueTransfer"，"Fee payer "為 "0x811CE345DB9D8aD17513Cc77d76a1ace9eC46F02 "或您輸入的 "feepayerAddress"，而 "From "是另一個地址，應為上例中的 "senderAddress"。

收費委託 Tx](/img/build/tutorials/fee-delegation-example-kaia.png)
