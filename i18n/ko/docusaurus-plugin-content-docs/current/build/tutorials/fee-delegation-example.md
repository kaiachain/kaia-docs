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

오류가 없으면 `senderRawTransaction`은 `senderPrivateKey`가 서명한 서명된 트랜잭션을 갖게 됩니다.

이제 수수료 납부자에게 `senderRawTransaction`을 전송해야 합니다. 이를 구현하는 방법에는 여러 가지가 있을 것입니다. 이 튜토리얼에서는 간단한 서버-클라이언트 코드를 예로 들어 수수료 납부자에게 `senderRawTransaction`을 전송하는 방법을 알려드리겠습니다.

### 2.2 수수료 납부자가 트랜잭션 서명 <a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

`fee payer`가 `senderRawTransaction`을 받으면, `fee payer`는 개인키로 `senderRawTransaction`에 다시 서명하고 트랜잭션을 Klaytn으로 전송합니다. 아래 코드 스니펫은 이 과정을 설명합니다. `kaia.sendRawTransaction` method signs the transaction with the given account's private key before sending the transaction. 코드를 실행하기 전에 `"FEEPAYER_ADDRESS"`와 `"PRIVATE_KEY"`를 실제 값으로 바꿔주세요.

Note that when the `fee payer` submits the transaction to Kaia on behalf of the `sender`, the `senderRawTransaction` type must be a `FEE_DELEGATED` type of transaction. 아래 예시에서는 발신자가 생성한 원본 `senderRawTransaction`이 [TxTypeFeeDelegatedValueTransfer](../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer)이므로 [sendTransaction(FEE_DELEATED_VALUE_TRANSFER)](../../references/sdk/caver-js-1.4.1/api/caver.klay/transaction/sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer) 메서드가 호출됩니다.

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

위 코드는 `senderPrivateKey`로 수수료 위임 밸류 전송 트랜잭션에 서명하고 서명된 `senderRawTransaction`을 `127.0.0.1`의 `1337` 포트에서 실행되는 수수료 납부자 서버, 즉 로컬호스트로 전송합니다.

### 3.2 수수료 납부자 서버 <a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

이제 수신된 `senderRawTransaction`을 `feePayerPrivateKey`로 서명하고 이를 Kairos 테스트넷으로 전송하는 수수료 지불자 서버인 `feepayer_server.js`를 작성해 보겠습니다.

아래 예시에서 `"FEEPAYER_ADDRESS"` 및 `"FEEPAYER_PRIVATEKEY"`를 실제 값으로 바꾸어 주세요.

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
Received data from server: Fee payer is 0x811CE345DB9D8aD17513Cc77d76a1ace9eC46F02
Received data from server: Tx hash is 0x1e6a019bb9c6cf156a6046ca33f0c810fb9fb6fdcb6df32b2e34a1d50f7f8a9d
Received data from server: Sender Tx hash is 0x7263d2dc5b36abc754726b220b7ad243dd789934109c6874e539ada5c7e9f193
```

`Sender` 개인 키로 트랜잭션에 서명하고 서명된 트랜잭션을 수수료 위임 서비스(즉, 수수료 납부자 서버)로 전송합니다. 그러면 수수료 대납 서비스에서 `fee payer` 주소, `Tx hash`, `Sender Tx hash`가 포함된 응답을 받습니다. `Tx hash`는 카이아 네트워크에 전송된 트랜잭션의 해시이며, `Sender Tx hash`는 수수료 납부자의 주소와 서명이 없는 트랜잭션의 해시입니다. 더 자세한 내용은 [SenderTxHash](../../learn/transactions/transactions.md#sendertxhash)를 참고하시기 바랍니다.

### 4.3 `feepayer_server.js` 확인 <a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

서버의 콘솔에서 아래와 같은 출력을 확인할 수 있습니다. 카이아의 트랜잭션 영수증을 출력합니다.

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

### 4.4 카이아 스코프 <a href="#4-4-klaytn-scope" id="4-4-klaytn-scope"></a>

You can also find the above transaction on the [Kaiascope](https://kairos.kaiascope.com).

It shows that the transaction is `TxTypeFeeDelegatedValueTransfer` and `Fee payer` is `0x811CE345DB9D8aD17513Cc77d76a1ace9eC46F02` or `feepayerAddress` that you entered, while `From` is a different address which should be the `senderAddress` in above example.

![Fee delegated Tx](/img/build/tutorials/fee-delegation-example-kaia.png)
