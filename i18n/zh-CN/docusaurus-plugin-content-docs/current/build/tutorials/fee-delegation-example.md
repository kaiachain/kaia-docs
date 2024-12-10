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

const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
  type: 'FEE_DELEGATED_VALUE_TRANSFER',
  from: senderAddress,
  to: toAddress,
  gas: '300000',
  value: caver.utils.toPeb('1', 'KAIA'),
}, senderPrivateKey)
```

如果没有错误，那么 `senderRawTransaction` 将有一个已签名的事务，该事务由 `senderPrivateKey` 签名。

现在，您需要将 `senderRawTransaction` 发送给缴费人。 实施的方法多种多样。 在本教程中，我们将提供一个简单的服务器-客户端代码，作为向缴费人发送 "senderRawTransaction "的示例。

### 2.2 付款人签署交易<a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

当 "付费方 "收到 "发送方原始交易 "时，"付费方 "会用自己的私钥再次对 "发送方原始交易 "进行签名，然后将交易发送给 Kaia。 下面的代码片段说明了这一过程。 `kaia.sendTransaction` 方法在发送交易前用给定账户的私钥对交易进行签名。 运行代码前，请将 `"FEEPAYER_ADDRESS"` 和 `"PRIVATE_KEY"` 替换为实际值。

请注意，当 "付费方 "代表 "发送方 "向 Kaia 提交交易时，"发送方原始交易 "类型必须是 "FEE_DELEATED "类型的交易。 在下面的示例中，调用了 [sendTransaction(FEE_DELEGATED_VALUE_TRANSFER)](../../references/sdk/caver-js-1.4.1/api/caver.kaia/transaction/sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer) 方法。由于发送方生成的原始 `senderRawTransaction` 是 [TxTypeFeeDelegatedValueTransfer](../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer），因此调用了该方法。）

```
const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "PRIVATE_KEY"

caver.kaia.accounts.wallet.add(feePayerPrivateKey, feePayerAddress);

caver.kaia.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayerAddress,
})
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
var net = require('net');
var client = new net.Socket();

const Caver = require('caver-js');
const caver = new Caver('https://public-en-kairos.node.kaia.io');
const senderAddress = "SENDER_ADDRESS";
const senderPrivateKey = "SENDER_PRIVATEKEY";
const toAddress = "TO_ADDRESS";

sendFeeDelegateTx = async() => {
    // sign transaction with private key of sender
    const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
      type: 'FEE_DELEGATED_VALUE_TRANSFER',
      from: senderAddress,
      to: toAddress,
      gas: '300000',
      value: caver.utils.toPeb('0.00001', 'KAIA'),
    }, senderPrivateKey)

    // send signed raw transaction to fee payer's server
    client.connect(1337, '127.0.0.1', function() {
            console.log('Connected to fee delegated service');
    });
    client.write(senderRawTransaction);

    client.on('data', function(data) {
            console.log('Received data from server: ' + data);
    });

    client.on('close', function() {
            console.log('Connection closed');
    });
}

sendFeeDelegateTx();
```

上述代码使用 "senderPrivateKey "对委托收费转账交易进行签名，并将签名后的 "senderRawTransaction "发送到收费人的服务器，该服务器运行在 "127.0.0.1 "上的 "1337 "端口，即 localhost。

### 3.2 缴费者服务器<a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

现在，让我们编写缴费人服务器 `feepayer_server.js` ，用 `feePayerPrivateKey` 对收到的 `senderRawTransaction` 进行签名，并将其发送到 Kairos 测试网。

在下面的示例中，请用实际值替换`"FEEPAYER_ADDRESS "和`"FEEPAYER_PRIVATEKEY"。

```javascript
const Caver = require('caver-js');
const caver = new Caver('https://public-en-kairos.node.kaia.io');
const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "FEEPAYER_PRIVATEKEY";

// add fee payer account
caver.kaia.accounts.wallet.add(feePayerPrivateKey, feePayerAddress);

var net = require('net');


feePayerSign = (senderRawTransaction, socket) => {
    // fee payer
    caver.kaia.sendTransaction({
      senderRawTransaction: senderRawTransaction,
      feePayer: feePayerAddress,
    })
    .on('transactionHash', function(hash){
        console.log('transactionHash', hash);
    })
    .on('receipt', function(receipt){
        console.log('receipt', receipt);
        socket.write('Tx hash is '+ receipt.transactionHash);
        socket.write('Sender Tx hash is '+ receipt.senderTxHash);
    })
    .on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
}

var server = net.createServer(function(socket) {
       console.log('Client is connected ...');
    socket.write('This is fee delegating service');
    socket.write('Fee payer is ' + feePayerAddress);
        socket.on('data', function(data) {
            console.log('Received data from client:', data.toString());
            feePayerSign(data.toString(), socket);
        });
});

server.listen(1337, '127.0.0.1');
console.log('Fee delegate service started ...');
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
Signed a fee delegated value transfer transaction.
Sending a signed transaction to fee delegated service.
Connected to fee delegated service
Received data from server: This is fee delegating service
Received data from server: Fee payer is 0x2645BA5Be42FfEe907ca8e9d88f6Ee6dAd8c1410
Received data from server: Tx hash is 0xd99086aa8188255d4ee885d9f1933b6cc062085c1196731ba599b2fb8f2dbbd7
Received data from server: Sender Tx hash is 0xe1f630547f287177a0e92198b1c67212b24fc1ad5a1f0b1f94fd6f980281fdba
```

它将用 "发送方 "私钥签署交易，并将签署后的交易发送到费用委托服务（即费用支付方的服务器）。 然后，它将收到缴费委托服务的响应，包括 "缴费人 "地址、"发送哈希值 "和 "发送人发送哈希值"。 Tx哈希值 "是提交给Kaia网络的交易的哈希值，而 "Sender Tx哈希值 "是交易的哈希值，不包含缴费人的地址和签名。 更多详情，请参阅 [SenderTxHash](../../learn/transactions/transactions.md#sendertxhash)。

### 4.3 检查 `feepayer_server.js`<a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

在服务器控制台，您将看到以下输出。 它可以打印来自 Kaia 的交易收据。

```
$ node feepayer_server.js
Fee delegate service started ...
Client is connected ...
Received data from client: 0x09f88b3a8505d21dba00830493e094fc83add44939ef818ce62dacea23697fa17257838609184e72a000940ecc24157e38b1997aace56f32ccb381b16e1710f847f8458207f5a0e636e67d01acc1f368db5e60290721e9059b13b0bf74af6d46391cc48bd31a81a0135118878be87f808e064f64fa4f13d6dc5bd9888b154ecd17f02980063b9e4280c4c3018080
transactionHash { messageHash:
   '0xa4cd7d479d19251a1981086431eff5514c5edf61731a6e5271b2a137a156f7e7',
  v: '0x07f6',
  r:
   '0xdb9c3a5b75c20f15cba9bc28eebcaff58701f57d4a226e7e3cb2bc4544b3c96c',
  s:
   '0x7646e929aa6467fa1c849f3abf37054df4cb08e6ee160f6375517ae2609f4b11',
  rawTransaction:
   '0x09f8e33a8505d21dba00830493e094fc83add44939ef818ce62dacea23697fa17257838609184e72a000940ecc24157e38b1997aace56f32ccb381b16e1710f847f8458207f5a0e636e67d01acc1f368db5e60290721e9059b13b0bf74af6d46391cc48bd31a81a0135118878be87f808e064f64fa4f13d6dc5bd9888b154ecd17f02980063b9e42942645ba5be42ffee907ca8e9d88f6ee6dad8c1410f847f8458207f6a0db9c3a5b75c20f15cba9bc28eebcaff58701f57d4a226e7e3cb2bc4544b3c96ca07646e929aa6467fa1c849f3abf37054df4cb08e6ee160f6375517ae2609f4b11',
  txHash:
   '0xd99086aa8188255d4ee885d9f1933b6cc062085c1196731ba599b2fb8f2dbbd7' }
transactionHash 0xd99086aa8188255d4ee885d9f1933b6cc062085c1196731ba599b2fb8f2dbbd7
receipt { blockHash:
   '0x1c61f03d2f0eba86c0f58ee7d1be8e8e425f47e9c46433474bd11c5a3f0528b2',
  blockNumber: 3175653,
  contractAddress: null,
  feePayer: '0x2645ba5be42ffee907ca8e9d88f6ee6dad8c1410',
  feePayerSignatures:
   [ { V: '0x7f6',
       R:
        '0xdb9c3a5b75c20f15cba9bc28eebcaff58701f57d4a226e7e3cb2bc4544b3c96c',
       S:
        '0x7646e929aa6467fa1c849f3abf37054df4cb08e6ee160f6375517ae2609f4b11' } ],
  from: '0x0ecc24157e38b1997aace56f32ccb381b16e1710',
  gas: '0x493e0',
  gasPrice: '0x5d21dba00',
  gasUsed: 31000,
  logs: [],
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x3a',
  senderTxHash:
   '0xe1f630547f287177a0e92198b1c67212b24fc1ad5a1f0b1f94fd6f980281fdba',
  signatures:
   [ { V: '0x7f5',
       R:
        '0xe636e67d01acc1f368db5e60290721e9059b13b0bf74af6d46391cc48bd31a81',
       S:
        '0x135118878be87f808e064f64fa4f13d6dc5bd9888b154ecd17f02980063b9e42' } ],
  status: true,
  to: '0xfc83add44939ef818ce62dacea23697fa1725783',
  transactionHash:
   '0xd99086aa8188255d4ee885d9f1933b6cc062085c1196731ba599b2fb8f2dbbd7',
  transactionIndex: 0,
  type: 'TxTypeFeeDelegatedValueTransfer',
  typeInt: 9,
  value: '0x9184e72a000' }
```

### 4.4 Kaia 范围<a href="#4-4-kaia-scope" id="4-4-kaia-scope"></a>

您还可以在 [Kaiascope](https://kairos.kaiascope.com) 上找到上述交易。

它显示交易为 "TxTypeFeeDelegatedValueTransfer"，"Fee payer "为 "0x2645ba5be42ffee907ca8e9d88f6ee6dad8c1410 "或您输入的 "feepayerAddress"，而 "From "是另一个地址，应为上例中的 "senderAddress"。

![Fee delegated Tx](/img/build/tutorials/fee-delegation-example.png)
