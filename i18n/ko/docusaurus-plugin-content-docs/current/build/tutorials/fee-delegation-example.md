# 빌드 수수료 위임 예시

## 목차 <a href="#table-of-contents" id="table-of-contents"></a>

- [1. 소개](#1-introduction)
- [2. [2.수수료 위임의 작동 방식](#2-how-fee-delegation-works)
  - 2.1 발신자의 트랜잭션 서명
  - 2.2 수수료 납부자의 트랜잭션 서명
- [3. 수수료 대납을 위한 간단한 서버와 클라이언트](#3-simple-server-and-client-for-fee-delegation)
  - 3.1 환경 설정
  - 3.2 발신자의 클라이언트
  - 3.2 수수료 납부자 서버
- [4. 실행 예제](#4-run-example)
  - 4.1 `feepayer_server.js` 실행
  - 4.2 `발신자_클라이언트.js` 실행
  - 4.3 `feepayer_server.js` 확인
  - 4.4 카이아스캔에서 보기

## 1. 소개 <a href="#1-introduction" id="1-introduction"></a>

이 튜토리얼에서는 Kaia에서 수수료 위임 가치 전송 트랜잭션이 어떻게 작동하는지 보여드리기 위해 Kaia SDK(ethers-ext)를 사용하여 간단한 서버-클라이언트 예제를 만드는 과정을 안내합니다. 튜토리얼과 예제 코드는 카이로스 테스트넷에서 테스트되었습니다.

## 2. 수수료 위임의 작동 방식 <a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

Let's skim through how fee delegation works.

### 2.1 발신자가 트랜잭션 서명 <a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

`Sender`는 트랜잭션을 보내기 전에 항상 트랜잭션에 서명해야 합니다.

트랜잭션에 서명하려면 주어진 개인 키로 트랜잭션에 서명하는 [signTransaction](../../references/sdk/ethers-ext/v6/account-management/send-transaction/legacy-recover-tx.mdx)을 사용하세요.

```
const senderAddr = "SENDER_ADDRESS";
const senderPrivateKey = "SENDER_PRIVATE_KEY";
const recieverAddr = "RECEIVER_ADDRESS";

// 새 트랜잭션 생성
let tx = {
  type: TxType.FeeDelegatedValueTransfer,
  to: recieverAddr,
  value: parseKaia("0.01"),
  from: senderAddress,
};
  
// 트랜잭션에 서명

tx = await senderWallet.populateTransaction(tx);
console.log(tx);

const senderTxHashRLP = await senderWallet.signTransaction(tx);
console.log("senderTxHashRLP", senderTxHashRLP);
```

오류가 없으면 `senderTxHashRLP`는 `senderPrivateKey`가 서명한 서명된 트랜잭션을 갖게 됩니다.

이제 수수료 납부자에게 `senderTxHashRLP`를 보내야 합니다. 이를 구현하는 방법에는 여러 가지가 있습니다. 이 튜토리얼에서는 수수료 납부자에게 `senderTxHashRLP`를 보내는 간단한 서버-클라이언트 코드를 예시로 보여드리겠습니다.

### 2.2 수수료 납부자가 트랜잭션 서명 <a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

수수료 납부자`가 `발신자TxHashRLP`를 받으면, `수수료 납부자`는 개인 키로 `발신자TxHashRLP\`에 다시 서명하고 트랜잭션을 카이아로 보냅니다. 아래 코드 스니펫은 이 과정을 설명합니다.

[sendTransactionAsFeePayer](https://docs.kaia.io/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer/) 메서드는 트랜잭션을 보내기 전에 지정된 수수료 납부자 개인 키로 트랜잭션에 서명합니다. 코드를 실행하기 전에 "FEEPAYER_ADDRESS" 및 "PRIVATE_KEY"를 실제 값으로 바꾸세요.

수수료 납부자가 발신자를 대신하여 카이아에 트랜잭션을 제출할 때, `senderTxHashRLP` 유형은 `FeeDelegatedValueTransfer` 유형의 트랜잭션이어야 한다는 점에 유의하세요.

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
.on('error', console.error); // 가스 부족 오류인 경우, 두번째 파라미터는 영수증입니다.

```

## 3. 수수료 위임을 위한 간단한 서버 및 클라이언트 <a href="#3-simple-server-and-client-for-fee-delegation" id="3-simple-server-and-client-for-fee-delegation"></a>

위의 수수료 위임 코드를 사용하여 간단한 서버와 클라이언트를 작성해 보겠습니다.

### 3.1 환경 설정 <a href="#3-1-environment-setup" id="3-1-environment-setup"></a>

npm init -y\`를 사용하여 Node.js 프로젝트를 설정하고, [ethers-ext](../../references/sdk/ethers-ext/getting-started.md)를 설치합니다.

```
mkdir feedelegation_server
cd feedelegation_server
npm init -y
npm install - -save @kaiachain/ethers-ext@^1.2.0 ethers@6
```

:::note
카이아체인/ethers-ext@^1.2.0은 노드 22 이상을 권장합니다.
:::

### 3.2 발신자의 클라이언트 <a href="#3-1-sender-s-client" id="3-1-sender-s-client"></a>

먼저 아래와 같이 `sender_client.js`를 작성하겠습니다.

이 예제에서는 `"SENDER_ADDRESS"`, `"SENDER_PRIVATEKEY"` 및 `"RECEIVER_ADDRESS"`를 실제 값으로 바꾸세요.

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
  
     // 새 트랜잭션 생성
    let tx = {
        type: TxType.FeeDelegatedValueTransfer,
        to: recieverAddr,
        value: parseKaia("0.01"),
        from: senderAddress,
      };
  
      // 트랜잭션 서명
      tx = await senderWallet.populateTransaction(tx);
      console.log(tx);
    
      const senderTxHashRLP = await senderWallet.signTransaction(tx);
      console.log("senderTxHashRLP", senderTxHashRLP);
    
  
      if (!senderTxHashRLP) {
        throw new Error("Failed to generate raw transaction");
      }
  
      // 서명된 원본 트랜잭션을 수수료 납부자 서버로 전송
      client.connect(1337, "127.0.0.1", () => {
        console.log("수수료 위임 서비스에 연결되었습니다");
        client.write(senderTxHashRLP);
      });
  
      client.on("data", (data) => {
        console.log("서버로부터 데이터를 수신했습니다:", data.toString());
      });
  
      client.on("error", (error) => {
        console.error("연결 오류:", error);
        s;
      });
  
      client.on("close", () => {
        console.log("연결 종료");
      });
    } catch (error) {
      console.error("트랜잭션 오류:", error);
      client.end();
      process.exit(1);
    }
  };

  sendFeeDelegateTx();
```

위 코드는 `senderPrivateKey`로 수수료 위임 가치 전송 트랜잭션에 서명하고 서명된 `senderTxHashRLP`를 `1337` 포트에서 실행 중인 수수료 납부자 서버, 즉 `127.0.0.1`의 로컬 호스트에 전송합니다.

### 3.3 수수료 납부자 서버 <a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

이제 수신한 `senderTxHashRLP`를 `feePayerPrivateKey`로 서명하고 이를 카이로스 테스트넷으로 전송하는 수수료 납부자 서버인 `feepayer_server.js`를 작성해 보겠습니다.

아래 예시에서는 `FEEPAYER_ADDRESS`와 `FEEPAYER_PRIVATEKEY`를 실제 값으로 바꾸어 주세요.

```javascript
const { createServer } = require("net");
const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext").v6;

const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "FEEPAYER_PRIVATE_KEY";

const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
const feePayerWallet = new Wallet(feePayerPrivateKey, provider);

const feePayerSign = async (senderTxHashRLP, socket) => {
  try {
    
    // 거래 전송
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
  console.log("클라이언트가 연결되었습니다 ...");
  socket.write("수수료 대납 서비스입니다");
  socket.write("수수료 납부자는 " + feePayerAddress);
  
  socket.on("data", function (data) {
    console.log("클라이언트에서 데이터를 받았습니다:", data.toString());
    feePayerSign(data.toString(), socket);
  });
  
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });

  socket.on("end", () => {
    console.log("클라이언트 연결 끊김");
  });
});

server.listen(1337, "127.0.0.1");
console.log("수수료 대리인 서비스 시작 ...");

```

서버는 포트 `1337`에서 수신 대기합니다.

들어오는 `data`가 있으면 `data`에 `feePayerPrivateKey`로 서명하고 이를 카이아 블록체인으로 보냅니다. 데이터`가 `sender_client.js`의 `senderTxHashRLP\`라고 가정합니다.

## 4. 실행 예제 <a href="#4-run-example" id="4-run-example"></a>

하나는 `sender_client.js`용, 다른 하나는 `feepayer_server.js`용입니다.

### 4.1 `feepayer_server.js` 실행하기 <a href="#4-1-run-feepayer_server-js" id="4-1-run-feepayer_server-js"></a>

아래 명령을 실행하여 수수료 납부자 서버를 시작합니다:

```
node feepayer_server.js

// 출력
수수료 대리인 서비스 시작 ...
```

서버가 시작되고 이제 포트 1337에서 수신 대기 중입니다.

### 4.2 `sender_client-js` 실행하기 <a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

수수료 위임 트랜잭션을 전송하기 위해 `sender_client.js`를 실행해 보겠습니다.

```
$ node sender_client.js

// 출력
{
  type: 9,
  to: '0x3a388d3fD71A0d9722c525E17007DdCcc41e1C47',
  value: 10000000000000000n,
  from: '0x7D3C7202582299470F2aD3DDCB8EF2F45407F871',
  nonce: 202,
  gasLimit: 52500,
  gasPrice: '27500000000',
  chainId: '1001'
}
senderTxHashRLP 0x09f88681ca85066720b30082cd14943a388d3fd71a0d9722c525e17007ddccc41e1c47872386f26fc10000947d3c7202582299470f2ad3ddcb8ef2f45407f871f847f8458207f6a0820d11029771f2fa368ce11da01f1c9e7f4de6d48915074d149e132692f9d63ea0131c62470a6799dfc5d7e3a7ac8d0a4f3b8fb8b59110ca5dabb26a9ee409f274
수수료 위임 서비스에 연결됨
서버에서 데이터를 수신했습니다: 이것은 수수료 위임, 서비스 수수료 지불자는 0x88311cD55B656D2502b50f62E83F8279c1641e70입니다.
```

`Sender` 개인 키로 트랜잭션에 서명하고 서명된 트랜잭션을 수수료 위임 서비스(즉, 수수료 납부자 서버)로 전송합니다. 그런 다음 '수수료 납부자' 주소, 'Tx 해시'를 포함한 수수료 대리인 서비스의 응답을 받게 됩니다. 'Tx 해시'는 카이아 네트워크에 제출된 트랜잭션의 해시입니다.

### 4.3 `feepayer_server.js` 확인 <a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

서버의 콘솔에서 아래 출력을 확인할 수 있습니다. Kaia에서 거래 영수증을 인쇄합니다.

```
$ node feepayer_server.js

수수료 대리인 서비스가 시작되었습니다 ...
클라이언트가 연결됨 ...
클라이언트로부터 데이터를 받았습니다: 0x09f88681ca85066720b30082cd14943a388d3fd71a0d9722c525e17007ddccc41e1c47872386f26fc10000947d3c7202582299470f2ad3ddcb8ef2f45407f871f847f8458207f6a0820d11029771f2fa368ce11da01f1c9e7f4de6d48915074d149e132692f9d63ea0131c62470a6799dfc5d7e3a7ac8d0a4f3b8fb8b59110ca5dabb26a9ee409f274
보낸Tx 트랜잭션 응답 {
…
  to: '0x3a388d3fD71A0d9722c525E17007DdCcc41e1C47',
  보낸 사람: '0x7D3C7202582299470F2aD3DDCB8EF2F45407F871',
  contractAddress: null,
  hash: '0x7cb1e8d20b4db7d9db1abc094781e1af83a9391153aab8cc935510639a548222',
  index: 0,
  blockHash: '0x50d3d7e143579e17dbc17b761c8e04331c6d4d950fe7563ac9a79d42a649de0a',
  blockNumber: 177078710,
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  gasUsed: 31000n,
  blobGasUsed: null,
  cumulativeGasUsed: 31000n,
  gasPrice: 27500000000n,
  blobGasPrice: null,
  type: 0,
  status: 1,
  root: undefined
}

```

### 4.4 카이아스캔에서 보기 <a href="#4-4-kaiascan" id="4-4-kaiascan"></a>

위의 거래는 카이아스캔에서도 확인할 수 있습니다.

트랜잭션은 `TxTypeFeeDelegatedValueTransfer`이고 `수수료 납부자`는 `0x88311cd55b656d2502b50f62e83f8279c1641e70` 또는 입력한 `feepayerAddress`이며 `발신자`는 위 예시에서 `발신자 주소`가 되어야 하는 다른 주소임을 알 수 있습니다.

![수수료 위임 Tx](/img/build/tutorials/fd-kaiascan-example.png)
