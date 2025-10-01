# 카이아 수수료 위임 서비스 통합

이 가이드에서는 Kaia 수수료 대납 서비스에 대한 개요, 액세스 신청 방법, 전제 조건, 통합 예시 및 API 참조를 제공합니다. 이는 개발자가 카이아 네트워크의 탈중앙화 애플리케이션(DApp)에 수수료 위임 기능을 통합할 수 있도록 돕기 위해 고안되었습니다.

## 1. 개요

### 카이아 수수료 대납 서비스란 무엇인가요?

카이아 네트워크의 수수료 위임 기능을 사용하면 다른 계정에서 사용자를 대신하여 거래 가스 수수료를 지불할 수 있습니다. 카이아 수수료 위임 서비스는 이 기능을 활용하여 사용자가 가스 요금을 위해 카이아 토큰을 보유하지 않고도 디앱과 상호작용할 수 있도록 합니다. 사용자가 직접 가스 요금을 지불하는 대신, 애플리케이션이 kaia 관리 요금 위임 서버를 통해 요금을 대신 지불합니다.

:::note

카이아의 수수료 위임 서비스는 디앱을 온보딩하고 보다 원활한 수수료 위임 경험을 제공하기 위한 관리형 서비스 역할을 합니다. 수수료 위임 기능은 카이아 블록체인에 기본적으로 존재하며, 개발자는 인프라를 직접 설정하여 사용자를 위한 수수료 위임을 구현할 수 있습니다.

:::

### 혜택

- **더 나은 UX**: 사용자가 디앱을 사용하기 위해 KAIA 토큰이 필요하지 않습니다.
- **온보딩**: 신규 사용자는 즉시 디앱 사용을 시작할 수 있습니다.
- **간소화된 지갑**: 사용자는 거래/사용하고자 하는 토큰만 있으면 됩니다.

### 작동 방식

1. **사용자가 트랜잭션에 서명** - 사용자가 지갑으로 수수료 위임 트랜잭션을 생성하고 서명합니다.
2. **앱이 수수료 대납 서비스로 전송** - DApp 백엔드가 서명된 트랜잭션을 수수료 대납 서비스 API 엔드포인트로 전송합니다.
3. \*\*수수료 위임 서비스는 거래의 유효성을 확인하고 유효한 경우 사용자를 대신하여 가스 요금을 지불합니다.

수수료 위임 서비스 워크플로](/img/build/tutorials/fee-delegation-workflow.png)

## 2. 액세스 신청

이 [Google 양식](https://docs.google.com/forms/d/e/1FAIpQLScSMnI8fD1xbyeoAL3TI81YxT3V1UfoByca84M7TZzYII5Pmw/viewform)을 검토하고 작성하여 카이아 수수료 대납 서비스 이용을 요청할 수 있습니다.

:::note

Kaia 팀은 구글 양식이 제출되면 디앱 파트너에게 알림을 보내고 디앱을 FeeDelegationServer에 연결하고 구성합니다.

:::

## 3. 사전 요구 사항 및 지원되는 환경

### 서비스 엔드포인트

- **프로덕션**: `https://fee-delegation.kaia.io`
- **테스트넷**: `https://fee-delegation-kairos.kaia.io`

Swagger 문서는 여기를 참조하세요:

- **프로덕션**: `https://fee-delegation.kaia.io/api/docs`
- **테스트넷**: `https://fee-delegation-kairos.kaia.io/api/docs`

### 지갑 호환성(프런트엔드 통합)

:::info

프론트엔드에서 카이아 수수료 위임 서비스를 통합할 때는 지갑이 수수료 위임 거래 서명을 위한 카이아 수수료 위임 표준을 지원하는지 확인하시기 바랍니다.

:::

현재 프론트엔드 통합을 위해 지원되는 지갑은 다음과 같습니다:

- 카이아 지갑
- OKX 월렛
- 비트겟 지갑

사용자가 다른 지갑을 사용하는 경우 프런트엔드에서 수수료 위임 거래에 올바르게 서명하지 못할 수 있습니다.

:::note

**백엔드 통합**은 지갑에 구애받지 않습니다. 서버 측에서 서명 및 제출을 처리하여 완벽한 제어와 폭넓은 호환성을 확보할 수 있습니다.

:::

## 4. 액세스 모델 및 보안

이 섹션에서는 Kaia 요금 위임 서비스의 액세스 모델과 보안 기능에 대해 설명합니다.

### 화이트리스트 시스템

이 서비스는 API 키 및 화이트리스트 주소 시스템을 사용하여 디앱의 수수료 위임을 처리합니다.

#### 1. API 키 인증

API 키가 구성된 디앱의 경우, 유효한 API 키로 서비스를 호출해야 하며 컨트랙트 또는 발신자 중 하나를 추가로 화이트리스트에 추가할 수 있습니다.

#### 2. 화이트리스트 액세스

API 키가 구성되지 않은 디앱의 경우 컨트랙트 또는 발신자 중 하나가 화이트리스트에 등록된 주소 유형이어야 합니다:

- **컨트랙트 주소**: 사용자가 상호작용하는 스마트 컨트랙트
- **발신자 주소**: 트랜잭션을 시작하는 사용자의 지갑 주소입니다.

### 트랜잭션 유효성 검사 규칙

**테스트넷의 경우:**  
모든 트랜잭션은 간편한 테스트를 위해 허용됩니다(유효성 검사는 적용되지 않음).

**메인넷의 경우:**  
이 조건이 충족되면 거래가 승인됩니다:

1. **API 키 사용**: 유효한 API 키를 제공하고 계약 또는 발신자 주소가 화이트리스트에 등록되어 있습니다(화이트리스트가 구성되지 않은 경우 모든 발신자 및 계약 주소가 유효한 API 키로 작동합니다).
2. **API 키 없음**: 컨트랙트 또는 발신자 주소가 API 키가 없는 디앱에 화이트리스트로 등록되어 있습니다.

### 액세스 제어 옵션

**옵션 1: 오픈 액세스(API 키 없음 + 화이트리스트 주소)**

- 누구나 화이트리스트에 등록된 컨트랙트/주소를 사용할 수 있으며, 수수료는 디앱 잔액에서 차감됩니다.
- 적합 대상 공공 유틸리티, 오픈 게임, 커뮤니티 도구
- 프론트엔드 또는 백엔드에서 API 호출 사용 가능

**옵션 2: 인증된 액세스(API 키 + 화이트리스트 주소 사용)**

- 디앱만 화이트리스트 컨트랙트/주소를 사용할 수 있습니다.
- 적합한 대상: 비공개 DApp, 엔터프라이즈 애플리케이션, 제어된 액세스
- 백엔드에서 키를 사용하여 API를 호출하는 것이 좋습니다.

**옵션 3: 무제한 액세스(API 키 + 화이트리스트 주소 없음)**

- 디앱은 유효한 API 키로 모든 트랜잭션을 전송할 수 있습니다.
- 적합 용도 지갑 애플리케이션, 다목적 디앱
- 백엔드에서 키를 사용하여 API를 호출하는 것이 좋습니다.

## 5. 통합 예시

이 섹션에서는 백엔드 및 프런트엔드 애플리케이션에 Kaia 수수료 위임 서비스를 통합하기 위한 코드 예제를 제공합니다.

### 백엔드(JavaScript/Node.js) 예제

```javascript
const { Wallet, TxType, JsonRpcProvider, parseKaia } = require('@kaiachain/ethers-ext');

async function sendFeeDelegatedTransaction() {
  try {
    // 1. Setup wallet and provider
    const provider = new JsonRpcProvider('https://public-en-kairos.node.kaia.io');
    const wallet = new Wallet('your_private_key_here', provider);
    
    // 2. Create fee-delegated transaction
    const tx = {
      type: TxType.FeeDelegatedValueTransfer
      from: wallet.address,
      to: '0xAB', // replace your wallet address
      value: parseKaia('0.005'), // 0.005 KAIA
      gasLimit: 100000,
      gasPrice: await provider.getGasPrice(),
      nonce: await wallet.getTransactionCount(),
    };
    
    // 3. Sign transaction
    const signedTx = await wallet.signTransaction(tx);
    
    // 4. Send to fee delegation server
    const response = await fetch('https://fee-delegation-kairos.kaia.io/api/signAsFeePayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_api_key_here'
      },
      body: JSON.stringify({
        userSignedTx: { raw: signedTx }
      })
    });
    
    // 5. Handle response
    const result = await response.json();
    if (result.status) {
      console.log('Success! Transaction hash:', result.data.transactionHash);
    } else {
      console.log('Failed:', result.message);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}
sendFeeDelegatedTransaction();
```

### 프론트엔드(React.js) 예제

```javascript
import { useState } from 'react';
import { Web3Provider, TxType, parseKaia } from '@kaiachain/ethers-ext/v6';

// Optional API key
const config = {
  serverUrl: 'https://fee-delegation-kairos.kaia.io',
  apiKey: 'kaia_your_api_key_here'
};

export default function FeeDelegationComponent() {
  const [wallet, setWallet] = useState({ address: null, connected: false });
  const [form, setForm] = useState({ toAddress: '', amount: '0.005' });
  const { Web3Provider, TxType, parseKaia } = await import('@kaiachain/ethers-ext/v6');

  // 1. Connect wallet
  const connectWallet = async () => {
    try {
      const accounts = await window.klaytn?.enable();
      setWallet({ address: accounts[0], connected: true });
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  // 2. Send fee-delegated transaction
  const sendTransaction = async () => {
    try {
      const provider = new Web3Provider(window.klaytn);
      const signer = await provider.getSigner(wallet.address);
      
      // 3. Create and sign transaction
      const tx = {
        type: TxType.FeeDelegatedValueTransfer,
        from: wallet.address,
        to: form.toAddress,
        value: parseKaia(form.amount)
      };
      
      const signedTx = await signer.signTransaction(tx);
      
      // 4. Send to fee delegation server
      const response = await fetch(`${config.serverUrl}/api/signAsFeePayer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          userSignedTx: { raw: signedTx }
        })
      });
      
      // 5. Handle response
      const result = await response.json();
      if (result.status) {
        console.log('Success! Transaction hash:', result.data.transactionHash);
      } else {
        console.log('Failed:', result.message);
      }
      
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {wallet.connected ? 'Connected' : 'Connect Kaia Wallet'}
      </button>
      
      <input 
        value={form.toAddress}
        onChange={(e) => setForm({...form, toAddress: e.target.value})}
        placeholder="Recipient address"
      />
      
      <input 
        value={form.amount}
        onChange={(e) => setForm({...form, amount: e.target.value})}
        placeholder="Amount"
      />
      
      <button onClick={sendTransaction} disabled={!wallet.connected}>
        Send Transaction
      </button>
    </div>
  );
}

```

### 추가 구현 예제(링크)

보다 포괄적인 구현 예시는 다음을 참조하세요:

- [ethers-ext@V6 HTML 예제](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-html/main.js#L294)
- [ethers-ext@V6 ReactJS 예제](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)
- [web3js 예제](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/browser-html/main.js#L265)
- [VIEM-EXT 예제](https://github.com/kaiachain/kaia-sdk/blob/dev/viem-ext/examples/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)

## 6. API 참조

이 섹션에서는 Kaia 수수료 위임 서비스에 사용할 수 있는 API 엔드포인트에 대해 자세히 설명합니다.

### `POST /api/signAsFeePayer`

**설명:** 수수료 위임 거래 처리

**헤더:**

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

**요청 본문:**

```
{
  "userSignedTx": {
    "raw": "<RLP_encoded_signed_transaction>"
  }
}
```

**매개변수:**

- `userSignedTx.raw`(문자열, 필수): 사용자가 서명한 RLP 인코딩된 트랜잭션입니다.

**응답:**

```json
// Transaction Success
{
  "message": "Request was successful",
  "data": <TransactionReceipt>,
  "status": true
}
```

:::note

자세한 응답 정보는 아래의 'SignAsFeePayer API 응답 코드 및 예시'를 참조하세요.

:::

### `GET /api/balance`

\*\*설명: \*\*잔액이 충분한지 확인(0.1 KAIA 이상)

API 키 사용:

```
GET /api/balance
Authorization: Bearer your_api_key_here
```

API 키 없이(주소 사용):

```
GET /api/balance?address=0x742d35Cc6634C0532925a3b8D2A4DDDeAe0e4Cd3
```

**헤더:**

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

**쿼리 매개변수:**

- 주소\`(문자열, 선택 사항): 잔액을 확인할 컨트랙트 또는 발신자 주소(API 키가 제공되지 않은 경우 필수)

**응답:**

```json
{
  "message": "Request was successful",
  "data": true,  // true if sufficient balance, false if insufficient
  "status": true
}
```

### SignAsFeePayer API 응답 코드 및 예시

#### 200 성공 응답

```javascript
// Transaction Success
{
  "message": "Request was successful",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "contractAddress": null,
    "cumulativeGasUsed": "31000",
    "from": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
    "gasPrice": "27500000000",
    "gasUsed": "31000",
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "index": 0,
    "logs": [],
    "logsBloom": '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    "status": 1,
    "to": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
  },
  "status": true
}

// Transaction Reverted (200 but failed)
{
  "message": "Transaction reverted",
  "error": "REVERTED",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "status": 0,
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "index": 0,
    "logs": [],
    "logsBloom": '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  "status": false
}

```

#### 400 잘못된 요청 응답

```javascript
// Invalid API Key
{
  "message": "Bad request",
  "data": "Invalid API key",
  "error": "BAD_REQUEST",
  "status": false
}

// Missing userSignedTx
{
  "message": "Bad request",
  "data": "userSignedTx is required, [format] -- { userSignedTx: { raw: user signed rlp encoded transaction } }",
  "error": "BAD_REQUEST",
  "status": false
}

// Not Whitelisted
{
  "message": "Bad request",
  "data": "Contract or sender address are not whitelisted",
  "error": "BAD_REQUEST",
  "status": false
}

// DApp Inactive
{
  "message": "Bad request",
  "data": "DApp is inactive. Please contact the administrator to activate the DApp.",
  "error": "BAD_REQUEST",
  "status": false
}

// Insufficient Balance
{
  "message": "Bad request",
  "data": "Insufficient balance in fee delegation server, please contact the administrator.",
  "error": "BAD_REQUEST",
  "status": false
}

// DApp Terminated
{
  "message": "Bad request",
  "data": "DApp is terminated. Please contact the administrator to activate the DApp.",
  "error": "BAD_REQUEST",
  "status": false
}

```

#### 500 내부 서버 오류 응답

```javascript
// Transaction failed
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: <ERROR MESSAGE>",
  "error": "INTERNAL_ERROR",
  "status": false
}

// If transaction receipt not found
{
  "message": "Internal server error",
  "data": "Transaction was failed",
  "error": "INTERNAL_ERROR",
  "status": false
}
```

## 7. 오류 처리 및 모범 사례

### 일반적인 오류 처리

| 오류 메시지                                                                 | 수행할 작업                                                                                                                                                                                                                                                                                                                                                              |
| :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `5회 시도 후 트랜잭션 전송에 실패했습니다, 네트워크가 사용 중입니다. 오류 메시지: <ERROR MESSAGE>`      | 1. userSignedTx.raw\` 페이로드의 형식이 올바르게 지정되고 서명되었는지 확인합니다 <br/>2. 낮은 논스 이슈**의 경우 지갑에 보류 중인 트랜잭션이 없는지 확인하세요. (Kaia 지갑의 경우 보류 중인 거래를 모두 취소하고 기록을 지운 후 다시 시도하세요).  <br/>3. 알려진 거래 문제**의 경우, 현재 거래가 완료되었는지 다시 확인하고 다른 거래로 이동합니다. |
| 잘못된 API 키                                                              | 유효한 API 키를 사용하고 있는지 확인하세요. 인증서가 없거나 유효하지 않은 경우 Kaia 팀에 문의하여 새 인증서를 발급받으세요.                                                                                                                                                                                                                                                          |
| userSignedTx가 필요합니다.                                   | 요청 본문에 RLP 인코딩된 서명된 트랜잭션이 포함된 `raw` 필드가 있는 `userSignedTx` 객체가 올바르게 포함되어 있는지 확인합니다. JSON 구조를 다시 한 번 확인하고 트랜잭션 데이터가 올바르게 인코딩되었는지 확인합니다.                                                                                                                                                                                               |
| 계약 또는 발신자 주소가 화이트리스트에 없습니다.                            | 사용자가 상호작용하는 스마트 컨트랙트 주소 또는 거래를 시작하는 사용자의 지갑 주소가 DApp의 화이트리스트에 등록되었는지 확인합니다.                                                                                                                                                                                                                                                                         |
| 디앱이 비활성 상태입니다. 디앱을 활성화하려면 관리자에게 문의하세요. | 현재 수수료 대납 서비스에서 디앱의 상태가 비활성 상태입니다. 카이아 팀 또는 지정된 관리자에게 연락하여 디앱 활성화에 대해 문의하세요.                                                                                                                                                                                                                                                        |
| 수수료 위임 서버의 잔액이 부족한 경우 관리자에게 문의하세요.                     | 디앱에 대한 수수료 대납 서버의 잔액이 너무 낮아 거래 수수료를 감당할 수 없습니다. 디앱의 잔액을 충전하려면 관리자나 카이아 팀에 문의하세요. 이러한 일이 발생하기 전에 이메일 알림을 받을 수도 있습니다.                                                                                                                                                                                                 |
| 디앱이 종료됩니다. 디앱을 활성화하려면 관리자에게 문의하세요.     | 수수료 대납 서비스에 대한 디앱의 액세스 권한이 종료되었습니다. Kaia 팀 또는 관리자에게 연락하여 해지 사유를 파악하고 재가동 가능성에 대해 논의하세요.                                                                                                                                                                                                                                             |

### 모범 사례

#### 거래 관리

동일한 발신자 주소에서 여러 트랜잭션(대량 또는 순차 트랜잭션)을 보낼 때는 논스 관련 실패를 방지하기 위해 트랜잭션 순서를 신중하게 관리하세요:

1. **확인 대기**: 다음 트랜잭션을 보내기 전에 각 트랜잭션이 확인되었는지(즉, 트랜잭션 영수증을 받았는지) 확인하세요.
2. \*\*논스가 올바르게 관리되도록 보장: \*\*거래가 올바른 논스로 제출되고, 새로운 거래가 진행되기 전에 실패하거나 오래된 논스가 적절히 처리되도록 보장합니다.
3. **재시도 로직 구현**: 일시적인 실패, 거래 중단 또는 확인 지연을 처리하기 위한 재시도 메커니즘을 구축하세요.
4. **프론트엔드 지갑 사용자:** 프론트엔드에서 브라우저 기반 지갑(예: 카이아 지갑, OKX 지갑, Bitget)을 사용하는 경우, 논스 충돌을 방지하기 위해 지갑의 '기록 삭제' 기능을 사용하여 보류 중이거나 멈춘 거래를 삭제하도록 권장하세요.

#### API 호출

API를 호출할 때 **API KEY**가 필요한 경우, 디앱 백엔드에서 사용하는 것을 권장합니다. API 키\*\*가 필요하지 않은 경우, 디앱은 프론트엔드 또는 백엔드에서 API를 호출할 수 있습니다.

## 8. 지원 및 리소스

### 지원 및 리소스

- [카이아 수수료 위임 예시](https://docs.kaia.io/build/tutorials/fee-delegation-example/)
- [디앱 포털 수수료 위임](https://docs.dappportal.io/extra-packages/gas-fee-delegation)
- [Kaia SDK 문서](https://docs.kaia.io/references/sdk/)

### 사용자 지정 통합

표준 화이트리스트 시스템을 넘어서는 고급 또는 사용자 지정 트랜잭션 화이트리스트 통합(예: 특수 토큰 검증, 복잡한 라우팅 로직 또는 사용자 지정 DeFi 프로토콜)의 경우, Kaia 팀에 문의하여 맞춤형 솔루션을 받으시기 바랍니다.

## 9. 자주 묻는 질문

\*\*Q: 카이아 수수료 위임 서비스가 있는 경우와 없는 경우의 수수료 위임의 차이는 무엇인가요?  
\*\*A: 카이아의 수수료 위임 서비스는 디앱을 온보딩하고 보다 원활한 수수료 위임 경험을 제공하기 위한 관리 서비스 역할을 합니다. 수수료 위임 기능은 카이아 체인에 기본적으로 존재하며, 사용자가 직접 인프라를 설정하여 사용자에 대한 수수료를 위임할 수 있다는 점에 유의하시기 바랍니다.

\*\*Q: 컨트랙트와 발신자 화이트리스팅의 차이점은 무엇인가요?  
\*\*A: 컨트랙트 화이트리스팅을 사용하면 모든 사용자가 디앱을 통해 특정 스마트 컨트랙트와 상호작용할 수 있습니다. 발신자 화이트리스트는 특정 지갑 주소로만 거래를 할 수 있도록 허용합니다. 두 가지를 동시에 사용할 수 있습니다.

\*\*Q: 잔액이 부족하면 어떻게 되나요?  
**A:** 거래는 '잔액 부족' 오류와 함께 거부됩니다. 설정한 경우 잔액이 너무 낮아지기 전에 이메일 알림을 보내 알려드립니다.

\*\*Q: 하나의 디앱에 여러 개의 컨트랙트를 허용 목록에 추가할 수 있나요?  
\*\*A: 네, 하나의 디앱에 여러 개의 컨트랙트와 발신자 주소를 허용 목록에 추가할 수 있습니다.

\*\*Q: 잔액이 소진되면 어떻게 되나요?  
**A:** 서비스를 계속 이용하려면 카이아 팀에 연락하여 잔액을 더 입금하거나 요청해야 합니다. 하지만 **`/api/balance?address=${address}`** API를 호출하여 잔액이 충분한지 확인하고 대시보드에서도 확인할 수 있습니다 [**https://fee-delegation.kaia.io/rank**](https://fee-delegation.kaia.io/rank).

\*\*Q: 화이트리스트 또는 API 키가 설정되면 DApp 또는 DApp 백엔드에서 코드를 변경해야 하나요?  
**A:** API 키의 경우, **`/api/signAsFeePayer`** API를 호출할 때 "Authorization" 헤더에 "Bearer your_api_key"를 추가해야 합니다. 그러나 API 키 없이 주소만 화이트리스트에 추가하는 경우에는 코드를 변경할 필요가 없습니다.

**Q: 이 API 호출은 어디에 사용해야 하나요?  
**A:** API 키가 없는 API 호출은 **프론트엔드**와 백엔드** 모두에서 사용할 수 있지만, **더 엄격한 유효성 검사 규칙**(예: 화이트리스트 주소 필요)이 적용되므로 **프론트엔드**와 백엔드\*\* 모두에서 사용할 수 있습니다.  
그러나 **API 키**를 사용할 때는 일반적으로 **더 적은 유효성 검사**가 필요하고 더 많은 권한이 노출되므로 보안을 위해 **백엔드**에서 호출할 것을 **강력히 권장**합니다.