# 建设费委托示例

## 目录<a href="#table-of-contents" id="table-of-contents"></a>

- [1. 导言](#1-introduction)
- [2. 如何进行收费授权](#2-how-fee-delegation-works)
  - 2.1 发送方签署交易
  - 2.2 付款人签署交易
- [3. 收费委托的简单服务器和客户端](#3-simple-server-and-client-for-fee-delegation)
  - 3.1 环境设置
  - 3.2 发件人客户端
  - 3.2 缴费者服务器
- [4. 运行示例](#4-run-example)
  - 4.1 运行 `feepayer_server.js`
  - 4.2 运行 `sender_client.js`
  - 4.3 检查 `feepayer_server.js`
  - 4.4 对卡伊阿斯坎的看法

## 1. 导言<a href="#1-introduction" id="1-introduction"></a>

本教程将指导您使用 Kaia SDK (ethers-ext) 创建一个简单的服务器-客户端示例，以演示费用委托价值转移交易如何在 Kaia 上运行。 教程和示例代码已在 Kairos 测试网上进行了测试。

## 2. 如何进行费用委托<a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

让我们简要了解一下费用委托的运作方式。

### 2.1 发送方签署交易<a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

发送方 "在发送交易之前，应始终签署交易。

要签署事务，可使用 [signTransaction](../../references/sdk/ethers-ext/v6/account-management/send-transaction/legacy-recover-tx.mdx) 用给定的私钥签署事务。

```
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

如果没有错误，那么 `senderTxHashRLP` 将有一个已签名的事务，该事务由 `senderPrivateKey` 签名。

现在，您需要将 `senderTxHashRLP` 发送给缴费人。 实施的方法有很多种。 在本教程中，我们将提供一个简单的服务器-客户端代码，作为向缴费人发送 "senderTxHashRLP "的示例。

### 2.2 付款人签署交易<a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

当 "付费方 "收到 "发送方 TxHashRLP "时，"付费方 "会再次用自己的私钥对 "发送方 TxHashRLP "进行签名，并将交易发送给 Kaia。 下面的代码片段说明了这一过程。

[ sendTransactionAsFeePayer](https://docs.kaia.io/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer/) 方法在发送交易前用给定的付费者私钥对交易进行签名。 运行代码前，请用实际值替换 "FEEPAYER_ADDRESS "和 "PRIVATE_KEY"。

请注意，当缴费人代表发件人向 Kaia 提交交易时，"senderTxHashRLP "类型必须是 "FeeDelegatedValueTransfer "类型的交易。

```
const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "FEEPAYER_PRIVATE_KEY"

const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
console.log("sentTx", sentTx);

const rc = await sentTx.wait();
console.log("receipt", rc);

.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // 如果出错，第二个参数就是收据。

```

## 3. 收费委托的简单服务器和客户端<a href="#3-simple-server-and-client-for-fee-delegation" id="3-simple-server-and-client-for-fee-delegation"></a>

让我们用上述费用委托代码编写一个简单的服务器和客户端。

### 3.1 环境设置<a href="#3-1-environment-setup" id="3-1-environment-setup"></a>

我们将使用 `npm init -y` 设置 Node.js 项目，并安装 [ethers-ext](../../references/sdk/ethers-ext/getting-started.md)

```
mkdir feedelegation_server
cd feedelegation_server
npm init -y
npm install - -save @kaiachain/ethers-ext@^1.2.0 ethers@6
```

:::note
@kaiachain/ethers-ext@^1.2.0 建议使用节点 22 或更高版本
:::

### 3.2 发件人客户端<a href="#3-1-sender-s-client" id="3-1-sender-s-client"></a>

首先，我们要编写一个`sender_client.js`，如下所示。

在示例中，请用实际值替换`"SENDER_ADDRESS"、`"SENDER_PRIVATEKEY "和\`"RECEIVER_ADDRESS"。

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
  
      // Sign the transaction
      tx = await senderWallet.populateTransaction(tx);
      console.log(tx);
    
      const senderTxHashRLP = await senderWallet.signTransaction(tx);
      console.log("senderTxHashRLP", senderTxHashRLP);
    
  
      if (!senderTxHashRLP) {
        throw new Error("Failed to generate raw transaction");
      } // Send signed raw transaction to fee payer.
  
      // 将签名的原始交易发送到付费者的服务器
      client.connect(1337, "127.0.0.1", () => {
        console.log("Connected to fee delegated service");
        client.write(senderTxHashRLP);
      });
  
      client.on("data", (data) => {
        console.log("Received data from server:", data.toString();
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

上述代码使用 "senderPrivateKey "对费用委托价值转移交易进行签名，并将签名后的 "senderTxHashRLP "发送至费用支付方的服务器，该服务器运行于 "127.0.0.1 "上的 "1337 "端口，即 localhost。

### 3.3 缴费者服务器<a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

现在，让我们编写缴费人服务器 `feepayer_server.js` ，用 `feePayerPrivateKey` 对接收到的 `senderTxHashRLP` 进行签名，并将其发送到 Kairos 测试网。

在下面的示例中，请用实际值替换`"FEEPAYER_ADDRESS "和`"FEEPAYER_PRIVATEKEY"。

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
  } }; const server = createServer.
};

const server = createServer(function (socket) {
  console.log("Client is connected ...");
  socket.write("This is fee delegating service");
  socket.write("Fee Payer is " + feePayerAddress);
  
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

当有 "数据 "传入时，它会用 "付费者私钥 "对 "数据 "进行签名，并将其发送到 Kaia 区块链。 它假定 `data` 是 `sender_client.js` 中的 `senderTxHashRLP` 。

## 4. 运行示例<a href="#4-run-example" id="4-run-example"></a>

准备两个终端，一个是 `sender_client.js` 终端，另一个是 `feepayer_server.js` 终端。

### 4.1 运行 `feepayer_server.js`<a href="#4-1-run-feepayer_server-js" id="4-1-run-feepayer_server-js"></a>

运行以下命令启动缴费服务器：

```
node feepayer_server.js

// output
Fee delegate service started ...
```

服务器启动并监听 1337 端口。

### 4.2 运行 `sender_client.js`<a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

让我们运行 `sender_client.js` 发送一笔委托收费交易。

```
$ node sender_client.js

// output
{
  type：9,
  to：'0x3a388d3fD71A0d9722c525E17007DdCcc41e1C47',
  value: 10000000000000000n,
  from: '0x7D3C7202582299470F2aD3DDCB8EF2F45407F871',
  nonce: 202,
  gasLimit: 52500,
  gasPrice: '27500000000',
  chainId：1001'
}
senderTxHashRLP0x09f88681ca85066720b30082cd14943a388d3fd71a0d9722c525e17007ddccc41e1c47872386f26fc10000947d3c7202582299470f2ad3ddcb8ef2f45407f871f847f8458207f6a0820d11029771f2fa368ce11da01f1c9e7f4de6d48915074d149e132692f9d63ea0131c62470a6799dfc5d7e3a7ac8d0a4f3b8fb8b59110ca5dabb26a9ee409f274
连接到收费委托服务
从服务器接收数据：这是费用委托，服务费支付方为 0x88311cD55B656D2502b50f62E83F8279c1641e70
```

它将用 "发送方 "私钥签署交易，并将签署后的交易发送到费用委托服务（即费用支付方的服务器）。 然后，它将收到缴费委托服务的响应，包括 "缴费人 "地址和 "发送哈希值"。 Tx hash "是提交给 Kaia 网络的交易的哈希值。

### 4.3 检查 `feepayer_server.js`<a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

在服务器控制台，您将看到以下输出。 它可以打印来自 Kaia 的交易收据。

```
$ node feepayer_server.js

费用委托服务启动 ...
客户端已连接 ...
从客户端接收数据：0x09f88681ca85066720b30082cd14943a388d3fd71a0d9722c525e17007ddccc41e1c47872386f26fc10000947d3c7202582299470f2ad3ddcb8ef2f45407f871f847f8458207f6a0820d11029771f2fa368ce11da01f1c9e7f4de6d48915074d149e132692f9d63ea0131c62470a6799dfc5d7e3a7ac8d0a4f3b8fb8b59110ca5dabb26a9ee409f274
sentTx TransactionResponse {
…
  to：'0x3a388d3fD71A0d9722c525E17007DdCcc41e1C47',
  from: '0x7D3C7202582299470F2aD3DDCB8EF2F45407F871',
  contractAddress: null,
  hash：0x7cb1e8d20b4db7d9db1abc094781e1af83a9391153aab8cc935510639a548222',
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

### 4.4 对卡伊阿斯坎的看法<a href="#4-4-kaiascan" id="4-4-kaiascan"></a>

您还可以在 [Kaiascan](https://kairos.kaiascan.io/tx/0x7cb1e8d20b4db7d9db1abc094781e1af83a9391153aab8cc935510639a548222?tabId=overview\&page=1) 上找到上述交易。

它显示交易为 "TxTypeFeeDelegatedValueTransfer"，"Fee payer "为 "0x88311cd55b656d2502b50f62e83f8279c1641e70 "或您输入的 "feepayerAddress"，而 "From "是另一个地址，应为上例中的 "senderAddress"。

![收费委托 Tx](/img/build/tutorials/fd-kaiascan-example.png)
