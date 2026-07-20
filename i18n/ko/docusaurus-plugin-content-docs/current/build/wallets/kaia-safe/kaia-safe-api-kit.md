---
id: kaia-safe-api-kit
title: 안전 API 키트
sidebar_label: API 키트
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 안전 API 키트

:::caution 일몰 공고

`safe.kaia.io`는 **2026년 8월 9일**에 서비스가 종료될 예정입니다. 앞으로는 [app.safe.global](https://app.safe.global)에서 Kaia Network용 Safe Wallet을 사용하여 계정을 관리해 주시기 바랍니다. 기존의 ‘Safe Accounts’는 ‘Safe Wallet’과 자동으로 호환됩니다.

:::

API 키트를 사용하면 [안전 거래 서비스](https://docs.safe.global/core-api/transaction-service-overview)와 안전하게 연동할 수 있습니다. 유효한 서명자는 거래를 제안 및 공유하고, 오프체인에서 서명을 수집하며, Safe 정보(이력, 보류 중인 거래, 모듈, 가드 등)를 조회할 수 있습니다.

Kaia 체인 ID: **8217** (메인넷), **1001** (Kairos). `safe.kaia.io`가 단계적으로 중단됨에 따라, 지원되는 체인의 경우 Safe Global Transaction Service 구성을 우선적으로 사용하시기 바랍니다. 여전히 사용자 정의 `txServiceUrl`이 필요한 경우, 마이그레이션 후에도 사용 중인 엔드포인트가 계속 사용 가능한지 확인하십시오.

## Quickstart <a id="Quickstart"></a>

이 가이드를 마치면, 서비스에 거래를 제안하고 실행을 위해 소유자의 서명을 받을 수 있게 됩니다.

## Prerequisites <a id="Prerequisites"></a>

1. [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Kairos(또는 메인넷)에서 여러 명의 서명자가 있는 금고

## Set up environment <a id="Setup-environment"></a>

### 1단계: 프로젝트 디렉터리를 생성합니다.

```js
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### 2단계: npm 프로젝트 초기화하기

```js
npm init -y
```

### 3단계: 종속성 설치

<Tabs>
  <TabItem value="npm" label="npm">

    npm install @safe-global/api-kit@2.4.2 @safe-global/protocol-kit@4.0.2 @safe-global/safe-core-sdk-types@5.0.2
    ```
  </TabItem>

 <TabItem value="yarn" label="yarn">

    yarn add @safe-global/api-kit@2.4.2 @safe-global/protocol-kit@4.0.2 @safe-global/safe-core-sdk-types@5.0.2
    ```
 </TabItem>
</Tabs>

### 4단계: 종속성 가져오기

`app.js` 파일을 생성하고 다음 내용을 추가하세요:

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
```

### 5단계: 설정 구성

소유자가 최소 두 명이고, 서명 임계값을 2로 설정하여 여러 명의 서명이 필요하도록 금고를 사용하십시오.

```js
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 Owner Safe Address Ex: 0x123.... SAFE SHOULD 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // ONLY OWNER 1 and SAFE ADDRESS Need to have some test KAIA balance
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // OWNER 2 need not have any test KAIA
const TO_ADDRESS = OWNER_1_ADDRESS; // Receiver address of sample transaction who receives 1 wei
```

## Use API Kit <a id="use-api-kit"></a>

### Step 1: Initialize API Kit

[안전한 거래 서비스](https://docs.safe.global/core-api/transaction-service-overview)가 지원되는 체인의 경우, `chainId`를 지정하는 것만으로도 충분한 경우가 많습니다. 전용 엔드포인트를 사용할 때도 사용자 정의 `txServiceUrl`을 전달할 수 있습니다(Kaia UI 서비스가 종료된 후에도 해당 URL이 유효한지 확인하십시오).

```js
const apiKit = new SafeApiKit.default({
  chainId: 1001n, // Kairos; Kaia 메인넷의 경우 8217n을 사용하세요
  // 필요한 경우 사용자 지정 URL — safe.kaia.io 서비스가 종료된 후에도 유효한지 확인하세요
  // Kaia가 상장되면 Safe 글로벌 트랜잭션 서비스 설정을 우선적으로 사용:
  // https://docs.safe.global/core-api/transaction-service-overview
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})

```

### Step 2: Initialize Protocol Kit

```js
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
```

### 3단계: 서비스에 트랜잭션을 제안합니다.

```js
const safeTransactionData = {
  to: TO_ADDRESS,
  value: '1', // 1 wei
  data: '0x',
  operation: OperationType.Call
}
const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData]
})
const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)
const signature = await protocolKitOwner1.signHash(safeTxHash)
// 2. Propose transaction to the service
try {
  await apiKit.proposeTransaction({
    safeAddress: SAFE_ADDRESS,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: OWNER_1_ADDRESS,
    senderSignature: signature.data
  })
} catch(err) {
  console.log(err)
}
```

### Step 4: Retrieve pending transaction

```js
const transaction = await apiKit.getTransaction(safeTxHash)
// const transactions = await service.getPendingTransactions()
// const transactions = await service.getIncomingTransactions()
// const transactions = await service.getMultisigTransactions()
// const transactions = await service.getModuleTransactions()
// const transactions = await service.getAllTransactions()
```

## Step 5: Confirm the transaction

Protocol Kit로 서명하고 [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction)을 통해 서명을 제출하세요.

```js
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
const signature2 = await protocolKitOwner2.signHash(safeTxHash)
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)
```

### Step 6: Execute the transaction

[Safe Wallet](https://app.safe.global/), [Protocol Kit](https://docs.safe.global/sdk/protocol-kit#execute-the-transaction), Safe CLI 또는 기타 호환 가능한 도구를 통해 실행하십시오.

```js
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('트랜잭션 실행됨:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

`app.js`의 전체 예제:

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { 
  OperationType
} from '@safe-global/safe-core-sdk-types'
// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = 'https://public-en-kairos.node.kaia.io'
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";  // 2 소유자 안전 주소 예: 0x123.... 안전 주소는 
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER 1 PUBLIC KEY HERE>"; // 소유자 1과 안전 주소에만 테스트용 KAIA 잔액이 있어야 함
const OWNER_1_PRIVATE_KEY = "<REPLACE WITH OWNER 1 PRIVATE KEY HERE>";
const OWNER_2_PRIVATE_KEY = "<REPLACE WITH OWNER 2 PRIVATE KEY HERE>"; // 소유자 2는 테스트용 KAIA를 보유할 필요가 없습니다
const TO_ADDRESS = OWNER_1_ADDRESS; // 1 wei를 수신하는 샘플 트랜잭션의 수신자 주소
const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  // safe.kaia.io 서비스 종료 후 엔드포인트 확인; Safe Global TX 서비스 문서 참조
  txServiceUrl: 'https://docs-safe.kaia.io/txs-baobab/api'
})
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
// 1. 트랜잭션 생성
const safeTransactionData = {
  to: TO_ADDRESS,
  value: '1', // 1 wei
  data: '0x',
  operation: OperationType.Call
}
const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData]
})
const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)
const signature = await protocolKitOwner1.signHash(safeTxHash)
// 2. 서비스에 트랜잭션 제안
try {
  await apiKit.proposeTransaction({
    safeAddress: SAFE_ADDRESS,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: OWNER_1_ADDRESS,
    senderSignature: signature.data
  })
} catch(err) {
  console.log(err)
}
console.log("트랜잭션 해시는 "+safeTxHash)
const transaction = await apiKit.getTransaction(safeTxHash)
// 3. 소유자 2의 확인
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})
const signature2 = await protocolKitOwner2.signHash(safeTxHash)
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)
console.log(signatureResponse)
// 4. 트랜잭션 실행
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)
```

자세한 내용은 [API 키트 참조](https://docs.safe.global/sdk/api-kit/reference)와 [예제 코드 조각](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/snippets)을 참조하십시오.
