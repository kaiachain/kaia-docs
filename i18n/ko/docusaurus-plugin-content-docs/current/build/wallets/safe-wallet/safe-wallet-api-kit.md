---
title: 안전 API 키트
sidebar_label: API 키트
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 안전 API 키트

:::caution 일몰 공고

`safe.kaia.io`는 **2026년 8월 31일**에 서비스가 종료됩니다. 앞으로는 [app.safe.global](https://app.safe.global)에서 Kaia Network용 Safe Wallet을 사용하여 계정을 관리해 주시기 바랍니다. 기존의 ‘Safe Accounts’는 ‘Safe Wallet’과 자동으로 호환됩니다.

:::

API 키트를 사용하면 [안전 거래 서비스](https://docs.safe.global/core-api/transaction-service-overview)와 안전하게 연동할 수 있습니다. 유효한 서명자는 거래를 제안 및 공유하고, 오프체인에서 서명을 수집하며, Safe 정보(이력, 보류 중인 거래, 모듈, 가드 등)를 조회할 수 있습니다.

Safe의 호스팅형 트랜잭션 서비스는 두 Kaia 네트워크를 모두 지원하므로, 체인 ID와 API 키만 있으면 되며 별도의 엔드포인트 설정은 필요하지 않습니다.

| 네트워크      | 체인 ID |
| --------- | ----- |
| 카이아 메인넷   | 8217  |
| 카이로스 테스트넷 | 1001  |

## Quickstart <a id="Quickstart"></a>

이 가이드를 마치면, 서비스에 거래를 제안하고 실행을 위해 소유자의 서명을 받을 수 있게 됩니다.

## Prerequisites <a id="Prerequisites"></a>

1. [Node.js 및 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)—이 예제에서는 내장 함수 `process.loadEnvFile()`을 사용하므로 Node 20.12 이상이 필요합니다.
2. Kairos(또는 메인넷)에서 여러 명의 서명자가 있는 금고
3. 안전한 API 키

### API 키 받기 <a id="api-key"></a>

Safe의 트랜잭션 서비스에 대한 요청에는 API 키가 필요합니다. [Safe 개발자 대시보드](https://developer.safe.global/)에 로그인한 후, **API 키**를 열고 새 키를 생성하세요. 핵심은 JWT입니다. 만료 시간을 설정할 수 있으며, 언제든지 이를 취소할 수 있습니다.

인증되지 않은 액세스는 초당 2회, 월 5,000회로 제한되며, 이는 탐색 목적으로만 사용됩니다. 키가 없는 요청은 `401 Unauthorized`를 반환하며, 할당량을 초과하면 `429 Too Many Requests`를 반환합니다.

키를 소스 제어 시스템에 포함시키지 마십시오. 이 가이드에서는 RPC URL 및 서명자 키와 함께 이 정보를 `.env` 파일에서 읽어옵니다. 자세한 내용은 [6단계](#step-6-configure-setup)를 참조하세요.

## Set up environment <a id="Setup-environment"></a>

### 1단계: 프로젝트 디렉터리를 생성합니다.

```sh
mkdir kaiasafe-api-kit
cd kaiasafe-api-kit
```

### 2단계: npm 프로젝트 초기화하기

```sh
npm init -y
```

### 3단계: 종속성 설치

<Tabs>
  <TabItem value="npm" label="npm">
    ```
    npm install @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit
    ```
  </TabItem>

 <TabItem value="yarn" label="yarn">
    ```
    yarn add @safe-global/api-kit @safe-global/protocol-kit @safe-global/types-kit
    ```
 </TabItem>
</Tabs>

:::note

이제 타입은 `@safe-global/types-kit`에 있습니다. 기존의 `@safe-global/safe-core-sdk-types` 패키지의 이름이 변경되었습니다. 기존 프로젝트를 업그레이드하는 경우, 임포트 문구를 업데이트하십시오.

:::

### 4단계: ES 모듈 활성화

아래 예제에서는 `import` 구문을 사용하므로, `package.json`에 다음 내용을 추가하세요:

```json
{
  "type": "module"
}
```

### 5단계: 종속성 가져오기

`app.js` 파일을 생성하고 다음 내용을 추가하세요:

```js
'@safe-global/api-kit'에서 SafeApiKit을 가져옵니다.
'@safe-global/protocol-kit'에서 Safe를 가져옵니다.
'@safe-global/types-kit'에서 { OperationType } 을 가져옵니다.
```

### 6단계: 설정 구성

소유자가 최소 두 명이고, 서명 임계값을 2로 설정하여 여러 명의 서명이 필요하도록 금고를 사용하십시오.

프로젝트 루트 디렉터리에 `.env` 파일을 생성합니다:

```sh
# 카이아 카이로스 테스트넷 — https://chainlist.org/?search=kaia&testnets=true
RPC_URL=https://public-en-kairos.node.kaia.io
CHAIN_ID=1001
EXPLORER_TX_URL=https://kairos.kaiascan.io/tx/

# https://developer.safe.global에서 가져온 API 키
SAFE_API_KEY=

# Kairos(https://app.safe.global)에 배포된 2-of-2 Safe
SAFE_ADDRESS=

# 소유자 1은 제안을 하고 실행도 하므로, 가스 비용을 충당할 테스트용 KAIA가 필요합니다.
OWNER_1_ADDRESS=
OWNER_1_PRIVATE_KEY=

# 소유자 2는 오프체인에서 서명만 하므로 잔액이 필요하지 않습니다.
OWNER_2_PRIVATE_KEY=

# 1 위(wei) 샘플 트랜잭션의 수신자 (기본값은 OWNER_1_ADDRESS)
# TO_ADDRESS=
```

:::danger

`.env` 파일에는 개인 키가 저장되어 있습니다. 첫 커밋을 하기 전에 `.gitignore` 파일에 이를 추가하고, 이 예제에서는 실제 자금이 들어 있는 키를 절대 사용하지 마십시오.

:::

`app.js`에 이를 불러오고, 누락된 항목이 있으면 즉시 오류를 발생시키도록 하세요:

```js
// .env 파일을 process.env에 불러옵니다(Node 20.12 이상 / 21.7 이상에 내장되어 있으며, 별도의 의존성이 필요하지 않음)
process.loadEnvFile()

const {
  RPC_URL,
  CHAIN_ID,
  SAFE_API_KEY,
  SAFE_ADDRESS,
  OWNER_1_ADDRESS,
  OWNER_1_PRIVATE_KEY,
  OWNER_2_PRIVATE_KEY,
  EXPLORER_TX_URL
} = process.env

const REQUIRED = [
  'RPC_URL',
  'CHAIN_ID',
  'SAFE_API_KEY',
  'SAFE_ADDRESS',
  'OWNER_1_ADDRESS',
  'OWNER_1_PRIVATE_KEY',
  'OWNER_2_PRIVATE_KEY'
]

const missing = REQUIRED.filter((key) => !process.env[key])
if (missing.length > 0) {
  console.error(`.env에 필수 환경 변수가 누락되었습니다: ${missing.join(', ')}`)
  process.exit(1)
}

// 1 wei를 수령하는 샘플 트랜잭션의 수신자 주소
const TO_ADDRESS = process.env.TO_ADDRESS || OWNER_1_ADDRESS
```

## Use API Kit <a id="use-api-kit"></a>

### Step 1: Initialize API Kit

체인 ID와 API 키를 전달해 주세요. Safe가 트랜잭션 서비스 엔드포인트를 자동으로 해결해 주므로, Kaia나 Kairos에서는 `txServiceUrl`이 필요하지 않습니다.

```js
const apiKit = new SafeApiKit({
  chainId: BigInt(CHAIN_ID), // Kairos의 경우 1001, Kaia 메인넷의 경우 8217
  apiKey: SAFE_API_KEY
})
```

자체 트랜잭션 서비스 인스턴스를 실행하는 경우 `txServiceUrl`을 계속 사용할 수 있으며, 이 값을 설정할 때는 `apiKey`를 지정할 필요가 없습니다.

### Step 2: Initialize Protocol Kit

```js
const protocolKitOwner1 = await Safe.init({
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
// 동일한 인스턴스에서 사용할 수 있는 다른 읽기 기능:
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)
```

### Step 5: Confirm the transaction

Protocol Kit로 서명하고 [confirmTransaction](https://docs.safe.global/sdk/api-kit/reference#confirmtransaction)을 통해 서명을 제출하세요.

```js
const protocolKitOwner2 = await Safe.init({
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
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

`app.js`의 전체 예제:

```js
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import {
  OperationType
} from '@safe-global/types-kit'

// .env를 process.env로 불러옵니다(Node >= 20.12 / 21.7에 내장되어 있으며, 별도의 종속성이 필요하지 않음).
process.loadEnvFile()

const {
  RPC_URL,
  CHAIN_ID,
  SAFE_API_KEY,
  SAFE_ADDRESS,
  OWNER_1_ADDRESS,
  OWNER_1_PRIVATE_KEY,
  OWNER_2_PRIVATE_KEY,
  EXPLORER_TX_URL
} = process.env

const REQUIRED = [
  'RPC_URL',
  'CHAIN_ID',
  'SAFE_API_KEY',
  'SAFE_ADDRESS',
  'OWNER_1_ADDRESS',
  'OWNER_1_PRIVATE_KEY',
  'OWNER_2_PRIVATE_KEY'
]

const missing = REQUIRED.filter((key) => !process.env[key])
if (missing.length > 0) {
  console.error(`.env에 필수 환경 변수가 누락되었습니다: ${missing.join(', ')}`)
  process.exit(1)
}

// 1 wei를 수령하는 샘플 트랜잭션의 수신자 주소
const TO_ADDRESS = process.env.TO_ADDRESS || OWNER_1_ADDRESS

const apiKit = new SafeApiKit({
  chainId: BigInt(CHAIN_ID),
  apiKey: SAFE_API_KEY
})

const protocolKitOwner1 = await Safe.init({
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
// 동일한 인스턴스에서 확인할 수 있는 기타 읽기 정보:
// const transactions = await apiKit.getPendingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getIncomingTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getMultisigTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getModuleTransactions(SAFE_ADDRESS)
// const transactions = await apiKit.getAllTransactions(SAFE_ADDRESS)

// 3. 소유자 2의 확인
const protocolKitOwner2 = await Safe.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// Safe 트랜잭션 확인
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
console.log(`${EXPLORER_TX_URL || 'https://kairos.kaiascan.io/tx/'}${receipt?.transactionHash}`);
```

실행 가능한 전체 프로젝트(`app.js`, `.env.example`, `package.json`)는 [kaia-safe-api-kit](https://github.com/praveen-kaia/kaia-safe-api-kit)에서 확인할 수 있습니다. 전체 메서드 목록은 [API 키트 참조](https://docs.safe.global/sdk/api-kit/reference)를 참조하십시오.
