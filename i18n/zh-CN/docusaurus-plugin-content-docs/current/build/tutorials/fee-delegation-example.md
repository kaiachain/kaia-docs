# 建设费委托示例

## 目录<a href="#table-of-contents" id="table-of-contents"></a>

- [1. 导言](#1-introduction)
- [2. 如何进行收费授权](#2-how-fee-delegation-works)
  - 2.1 发送方签署交易
  - 2.2 付款人签署交易
- [3. 收费委托的简单服务器和客户端](#3-simple-server-and-client-for-fee-delegation)
  - 3.1 发件人客户端
  - 3.2 缴费者服务器
- [4. 运行示例](#4-run-example)
  - 4.1 运行 `feepayer_server.js`
  - 4.2 运行 `sender_client.js`
  - 4.3 检查 `feepayer_server.js`
  - 4.4 Kaia 范围

## 1. 导言<a href="#1-introduction" id="1-introduction"></a>

本教程将帮助您使用 caver-js SDK 编写一个简单的服务器-客户端示例，以说明在 Kaia 中如何进行费用委托值转移交易。 本教程和示例代码使用的是 Kairos 测试网。

## 2. 如何进行费用委托<a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

让我们简要了解一下费用委托的运作方式。

### 2.1 发送方签署交易<a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

发送方 "在发送交易之前，应始终签署交易。

要签署交易，请使用 [signTransaction](../../references/sdk/caver-js-1.4.1/api/caver.kaia.accounts.md#signtransaction) 使用给定的私钥签署交易。

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

如果没有错误，那么 `senderRawTransaction` 将有一个已签名的事务，该事务由 `senderPrivateKey` 签名。

现在，您需要将 `senderRawTransaction` 发送给缴费人。 实施的方法多种多样。 在本教程中，我们将提供一个简单的服务器-客户端代码，作为向缴费人发送 "senderRawTransaction "的示例。

### 2.2 付款人签署交易<a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

当 "付费方 "收到 "发送方原始交易 "时，"付费方 "会用自己的私钥再次对 "发送方原始交易 "进行签名，然后将交易发送给 Kaia。 下面的代码片段说明了这一过程。 kaia.sendRawTransaction "方法在发送交易前使用给定账户的私钥对交易进行签名。 运行代码前，请将 `"FEEPAYER_ADDRESS"` 和 `"PRIVATE_KEY"` 替换为实际值。

请注意，当 "费用支付方 "代表 "发送方 "向 Kaia 提交交易时，"发送方原始交易 "类型必须是 "FEE_DELEGATED "类型的交易。 在下面的示例中，调用了 [sendTransaction(FEE_DELEGATED_VALUE_TRANSFER)](../../references/sdk/caver-js-1.4.1/api/caver.kaia/transaction/sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer) 方法。由于发送方生成的原始 `senderRawTransaction` 是 [TxTypeFeeDelegatedValueTransfer](../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer），因此调用了该方法。）

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

## 3. 收费委托的简单服务器和客户端<a href="#3-simple-server-and-client-for-fee-delegation" id="3-simple-server-and-client-for-fee-delegation"></a>

让我们用上述费用委托代码编写一个简单的服务器和客户端。

### 3.1 环境设置<a href="#3-1-environment-setup" id="3-1-environment-setup"></a>

我们将使用 `npm` 和 [caver-js](../../references/sdk/caver-js-1.4.1/get-started-1.4.1.md) 为本示例设置环境，如下所示。

```
$ mkdir example
$ cd example
$ npm init
$ npm install caver-js@latest
```

### 3.1 发件人客户端<a href="#3-1-sender-s-client" id="3-1-sender-s-client"></a>

首先，我们要编写一个`sender_client.js`，如下所示。

在示例中，请用实际值替换`"SENDER_ADDRESS"、`"SENDER_PRIVATEKEY "和\`"TO_ADDRESS"。

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

上述代码使用 "senderPrivateKey "对委托收费转账交易进行签名，并将签名后的 "senderRawTransaction "发送到收费人的服务器，该服务器运行在 "127.0.0.1 "上的 "1337 "端口，即 localhost。

### 3.2 缴费者服务器<a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

现在，让我们编写缴费人服务器 `feepayer_server.js` ，用 `feePayerPrivateKey` 对收到的 `senderRawTransaction` 进行签名，并将其发送到 Kairos 测试网。

在下面的示例中，请用实际值替换`"FEEPAYER_ADDRESS "和`"FEEPAYER_PRIVATEKEY"。

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

服务器监听端口为 `1337`。

当有 "数据 "传入时，它会用 "付费者私钥 "对 "数据 "进行签名，并将其发送到 Kaia 区块链。 它假定 `data` 是 `sender_client.js` 中的 `senderRawTransaction` 。

## 4. 运行示例<a href="#4-run-example" id="4-run-example"></a>

准备两个终端，一个是 `sender_client.js` 终端，另一个是 `feepayer_server.js` 终端。

### 4.1 运行 `feepayer_server.js`<a href="#4-1-run-feepayer_server-js" id="4-1-run-feepayer_server-js"></a>

下面的命令将启动缴费服务器。

```
$ node feepayer_server.js
Fee delegate service started ...
```

服务器启动并监听 1337 端口。

### 4.2 运行 `sender_client.js`<a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

让我们运行 `sender_client.js` 发送一笔委托收费交易。

```
$ node sender_client.js
已签署收费委托价值转移交易。
向收费委托服务发送已签名交易。
连接到收费委托服务
从服务器接收数据：这是收费委托服务
从服务器接收数据：费用支付方为 0x811CE345DB9D8aD17513Cc77d76a1ace9eC46F02
从服务器接收数据：Tx hash is 0x1e6a019bb9c6cf156a6046ca33f0c810fb9fb6fdcb6df32b2e34a1d50f7f8a9d
从服务器接收数据：发件人发送哈希值为 0x7263d2dc5b36abc754726b220b7ad243dd789934109c6874e539ada5c7e9f193
```

它将用 "发送方 "私钥签署交易，并将签署后的交易发送到费用委托服务（即费用支付方的服务器）。 然后，它将收到缴费委托服务的响应，包括 "缴费人 "地址、"发送哈希值 "和 "发送人发送哈希值"。 Tx哈希值 "是提交给Kaia网络的交易的哈希值，而 "Sender Tx哈希值 "是交易的哈希值，不包含缴费人的地址和签名。 更多详情，请参阅 [SenderTxHash](../../learn/transactions/transactions.md#sendertxhash)。

### 4.3 检查 `feepayer_server.js`<a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

在服务器控制台，您将看到以下输出。 它可以打印来自 Kaia 的交易收据。

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

### 4.4 Kaia 范围<a href="#4-4-kaia-scope" id="4-4-kaia-scope"></a>

您还可以在 [Kaiascope](https://kairos.kaiascope.com) 上找到上述交易。

它显示该事务为 "TxTypeFeeDelegatedValueTransfer"，"Fee payer "为 "0x811CE345DB9D8aD17513Cc77d76a1ace9eC46F02 "或您输入的 "feepayerAddress"，而 "From "是另一个地址，应为上例中的 "senderAddress"。

收费委托 Tx](/img/build/tutorials/fee-delegation-example-kaia.png)
