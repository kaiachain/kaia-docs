# 빌드 수수료 위임 예시

## 목차 <a href="#table-of-contents" id="table-of-contents"></a>

- [1. 소개](#1-introduction)
- [2. [2.수수료 위임의 작동 방식](#2-how-fee-delegation-works)
  - 2.1 발신자의 트랜잭션 서명
  - 2.2 수수료 납부자의 트랜잭션 서명
- [3. 수수료 대납을 위한 간단한 서버와 클라이언트](#3-simple-server-and-client-for-fee-delegation)
  - 3.1 발신자 클라이언트
  - 3.2 수수료 납부자 서버
- [4. 실행 예제](#4-run-example)
  - 4.1 `feepayer_server.js` 실행
  - 4.2 `발신자_클라이언트.js` 실행
  - 4.3 `feepayer_server.js` 확인
  - 4.4 카이아 스코프

## 1. 소개 <a href="#1-introduction" id="1-introduction"></a>

이 튜토리얼은 caver-js SDK를 사용하여 간단한 서버-클라이언트 예제를 작성하여 카이아에서 수수료 위임 밸류 전송 트랜잭션이 어떻게 작동하는지 설명합니다. 이 튜토리얼과 예제 코드는 Kairos 테스트넷을 사용하고 있습니다.

## 2. 수수료 위임의 작동 방식 <a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

Let's skim through how fee delegation works.

### 2.1 발신자가 트랜잭션 서명 <a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

`Sender`는 트랜잭션을 보내기 전에 항상 트랜잭션에 서명해야 합니다.

트랜잭션에 서명하려면, 주어진 개인 키로 트랜잭션에 서명하는 [signTransaction](../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#signtransaction)을 사용하세요.

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

오류가 없으면 `senderRawTransaction`은 `senderPrivateKey`가 서명한 서명된 트랜잭션을 갖게 됩니다.

이제 수수료 납부자에게 `senderRawTransaction`을 전송해야 합니다. 이를 구현하는 방법에는 여러 가지가 있을 것입니다. 이 튜토리얼에서는 간단한 서버-클라이언트 코드를 예로 들어 수수료 납부자에게 `senderRawTransaction`을 전송하는 방법을 알려드리겠습니다.

### 2.2 수수료 납부자가 트랜잭션 서명 <a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

`fee payer`가 `senderRawTransaction`을 받으면, `fee payer`는 개인키로 `senderRawTransaction`에 다시 서명하고 트랜잭션을 Klaytn으로 전송합니다. 아래 코드 스니펫은 이 과정을 설명합니다. `klay.sendTransaction` 메서드는 트랜잭션을 보내기 전에 주어진 계정의 개인키로 트랜잭션에 서명합니다. 코드를 실행하기 전에 `"FEEPAYER_ADDRESS"`와 `"PRIVATE_KEY"`를 실제 값으로 바꿔주세요.

`fee payer`가 `sender`를 대신하여 트랜잭션을 Klaytn에 제출할 때, `senderRawTransaction` 유형은 `FEE_DELEATED` 유형의 트랜잭션이어야 한다는 점에 유의하세요. 아래 예시에서는 발신자가 생성한 원본 `senderRawTransaction`이 [TxTypeFeeDelegatedValueTransfer](../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer)이므로 [sendTransaction(FEE_DELEATED_VALUE_TRANSFER)](../../references/sdk/caver-js-1.4.1/api/caver.klay/transaction/sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer) 메서드가 호출됩니다.

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

## 3. 수수료 위임용 단순 서버 및 클라이언트 <a href="#3-simple-server-and-client-for-fee-delegation" id="3-simple-server-and-client-for-fee-delegation"></a>

위의 수수료 위임 코드를 사용하여 간단한 서버와 클라이언트를 작성해 보겠습니다.

### 3.1 환경 설정 <a href="#3-1-environment-setup" id="3-1-environment-setup"></a>

이 예제의 환경 설정은 아래와 같이 `npm`과 [caver-js](../../references/sdk/caver-js-1.4.1/get-started-1.4.1.md)를 사용하겠습니다.

```
$ mkdir example
$ cd example
$ npm init
$ npm install caver-js@latest
```

### 3.1 발신자 클라이언트 <a href="#3-1-sender-s-client" id="3-1-sender-s-client"></a>

먼저 아래와 같이 `sender_client.js`를 작성하겠습니다.

이 예제에서는 `"SENDER_ADDRESS"`, `"SENDER_PRIVATEKEY"` 및 `"TO_ADDRESS"`를 실제 값으로 바꾸어 주세요.

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

위 코드는 `senderPrivateKey`로 수수료 위임 밸류 전송 트랜잭션에 서명하고 서명된 `senderRawTransaction`을 `127.0.0.1`의 `1337` 포트에서 실행되는 수수료 납부자 서버, 즉 로컬호스트로 전송합니다.

### 3.2 수수료 납부자 서버 <a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

이제 수신된 `senderRawTransaction`을 `feePayerPrivateKey`로 서명하고 이를 Kairos 테스트넷으로 전송하는 수수료 지불자 서버인 `feepayer_server.js`를 작성해 보겠습니다.

아래 예시에서 `"FEEPAYER_ADDRESS"` 및 `"FEEPAYER_PRIVATEKEY"`를 실제 값으로 바꾸어 주세요.

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

서버는 포트 `1337`에서 수신 대기합니다.

들어오는 `data`가 있으면 `data`에 `feePayerPrivateKey`로 서명하고 이를 카이아 블록체인으로 보냅니다. 이 때 `data`는 `sender_client.js`의 `senderRawTransaction`이라고 가정합니다.

## 4. 실행 예제 <a href="#4-run-example" id="4-run-example"></a>

하나는 `sender_client.js`용, 다른 하나는 `feepayer_server.js`용입니다.

### 4.1 `feepayer_server.js` 실행하기 <a href="#4-1-run-feepayer_server-js" id="4-1-run-feepayer_server-js"></a>

아래 명령은 수수료 납부자의 서버를 시작합니다.

```
$ node feepayer_server.js
Fee delegate service started ...
```

서버가 시작되고 이제 포트 1337에서 수신 대기 중입니다.

### 4.2 `sender_client-js` 실행하기 <a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

수수료 위임 트랜잭션을 전송하기 위해 `sender_client.js`를 실행해 보겠습니다.

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

`Sender` 개인 키로 트랜잭션에 서명하고 서명된 트랜잭션을 수수료 위임 서비스(즉, 수수료 납부자 서버)로 전송합니다. 그러면 수수료 대납 서비스에서 `fee payer` 주소, `Tx hash`, `Sender Tx hash`가 포함된 응답을 받습니다. `Tx hash`는 카이아 네트워크에 전송된 트랜잭션의 해시이며, `Sender Tx hash`는 수수료 납부자의 주소와 서명이 없는 트랜잭션의 해시입니다. 더 자세한 내용은 [SenderTxHash](../../learn/transactions/transactions.md#sendertxhash)를 참고하시기 바랍니다.

### 4.3 `feepayer_server.js` 확인 <a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

서버의 콘솔에서 아래와 같은 출력을 확인할 수 있습니다. 카이아의 트랜잭션 영수증을 출력합니다.

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

### 4.4 카이아 스코프 <a href="#4-4-klaytn-scope" id="4-4-klaytn-scope"></a>

You can also find the above transaction on the [Klaytnscope](https://baobab.klaytnscope.com).

트랜잭션은 `TxTypeFeeDelegatedValueTransfer`이고 `fee payer`는 `0x2645ba5be42ffee907ca8e9d88f6ee6dad8c1410` 또는 입력한 `feepayerAddress`이며, `From`은 위 예시의 `senderAddress`와 다른 주소임을 알 수 있습니다.

![수수료 위임 Tx](/img/build/tutorials/fee-delegation-example.png)
