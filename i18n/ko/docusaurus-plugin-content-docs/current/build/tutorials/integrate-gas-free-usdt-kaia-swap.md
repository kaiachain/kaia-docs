---
id: ""
title: 가스 없는 USDT와 KAIA 스왑 통합
---



# 가스 없는 USDT와 KAIA 스왑 통합

이 가이드는 목적, 전제 조건, 통합 단계, API 참조 등 가스 없는 USDT에서 KAIA로 스왑 기능에 대한 개요를 제공합니다. 개발자가 가스 프리 스왑 기능을 카이아 네트워크의 탈중앙화 애플리케이션(DApp)에 통합할 수 있도록 설계되었습니다.

## 소개

사용자가 가스 수수료를 위해 카이아 토큰을 보유할 필요 없이 또는 사용자를 대신하여 거래 비용을 충당할 때에도 카이아 네트워크에서 가스 없는 ERC20 토큰 스왑(현재는 USDT로 제한됨)을 수행할 수 있도록 '가스 프리 스왑 카이아' API가 도입되었습니다. 이 API는 특히 완전한 가스 없는 사용자 경험을 위해 ERC20 허가 서명을 사용하여 USDT를 KAIA로 교환하는 것을 지원합니다.

### 혜택

- **100% 가스 없는 경험**: 사용자는 스왑을 수행하기 위해 KAIA 토큰이 필요하지 않습니다.
- **향상된 사용자 온보딩**: 신규 사용자는 KAIA를 획득하지 않고도 즉시 토큰 스왑을 시작할 수 있습니다.
- **ERC20 권한 통합**: 안전한 가스 없는 토큰 승인을 위해 표준 ERC20 허가 서명을 사용합니다.

### 작동 방식

- **사용자가 스왑을 시작합니다**: 사용자가 KAIA로 스왑할 USDT 금액을 선택합니다.
- **프론트엔드에서 퍼밋을 생성합니다**: DApp은 사용자가 서명할 수 있도록 ERC20 허가 서명을 생성합니다.
- **사용자가 허가에 서명**합니다: 사용자가 허가 메시지에 서명합니다(가스 필요 없음).
- **앱이 API를 호출합니다**: 프론트엔드에서 스왑 파라미터와 권한 서명을 API로 전송합니다.
- **백엔드 실행**: API가 허가를 검증하고 스왑을 실행하며 모든 가스 요금을 지불합니다.
- **사용자가 KAIA를 받음**: 네이티브 KAIA 토큰이 사용자의 지갑으로 직접 전송됩니다.

## 사전 요구 사항 및 지원되는 환경

**서비스 엔드포인트**

<Tabs>
  <TabItem value="Mainnet" label="Kaia Mainnet">
    https://fee-delegation.kaia.io
  </TabItem>

 <TabItem value="Testnet" label="Kairos Testnet">
    https://fee-delegation-kairos.kaia.io
 </TabItem>
</Tabs>

**지원되는 토큰 쌍**

API는 현재 단일 거래 쌍만 지원합니다:

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet">
    토큰 입력: USDT (`0xd077a400968890eacc75cdc901f0356c943e4fdb`)

```
Token Out: WKAIA (`0x19aac5f612f524b754ca7e7c41cbfa2e981a4432`)
```

  </TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    토큰 입력: TEST (`0xcb00ba2cab67a3771f9ca1fa48fda8881b457750`)

```
Token Out: WKAIA (`0x043c471bEe060e00A56CcD02c0Ca286808a5A436`)
```

 </TabItem>
</Tabs>

**테스트 토큰 받기**

카이로스 테스트넷용 TEST 토큰을 받으려면:

- 카이아스캔에서 [ERC20 수도꼭지](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1)를 엽니다.
- 계약 탭으로 이동한 다음 _계약서 작성_을 선택합니다.
- 클레임(토큰) 함수 찾기
- 카이로스에서 지원되는 GA 토큰의 주소를 붙여넣습니다(이 가이드에서는 TEST 주소를 사용).
- 요청을 제출하려면 _조회_를 클릭합니다. 곧 테스트 토큰을 받게 될 것입니다.

![](/img/build/tutorials/test-tokens-faucet.png)

**스마트 계약 요건**

이 API는 가스리스ERC20퍼밋스왑 스마트 컨트랙트와 상호작용합니다:

- ERC20 권한 기반 승인 지원
- 유니스왑 V2 호환 DEX와 통합
- WKAIA를 기본 KAIA로 자동 변환합니다.
- 보안을 위한 최대 스왑 한도 적용

**사용자 요구 사항**

메인넷에서 이 가스 없는 스왑 서비스를 이용하려면 KAIA 잔액이 0이어야 합니다. 이 요건은 온보딩 목적으로 가스 없는 거래가 꼭 필요한 사용자만 서비스를 사용하도록 보장합니다. 테스트넷에서는 테스트 목적으로 이 제한이 완화됩니다.

최대 스왑 금액은 메인넷과 테스트넷 모두에서 1 USDT로 제한됩니다. 이 기능은 사용자가 카이아 체인에서 경험을 시작하기에 충분한 카이아를 받을 수 있도록 설계되었습니다.

## 통합 단계

### 전체 통합 예시

```javascript
const { JsonRpcProvider, Wallet } = require('@kaiachain/ethers-ext/v6');
const { Contract, parseUnits, formatUnits, Signature } = require('ethers');

async function fetchJson(url, init) {
  if (typeof fetch !== 'undefined') {
    return fetch(url, init);
  }
  const { default: nodeFetch } = await import('node-fetch');
  return nodeFetch(url, init);
}

const GASLESS_SWAP_ABI = [
  'function usdtToken() view returns (address)',
  'function wkaiaToken() view returns (address)',
  'function maxUsdtAmount() view returns (uint256)',
  'function getExpectedOutput(address tokenIn, address tokenOut, uint256 amountIn) view returns (uint256)',
  'function executeSwapWithPermit(address user, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMin, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
];

const ERC20_METADATA_ABI = [
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function nonces(address owner) view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
];

async function buildPermitSignature({ token, owner, spender, value, deadline, domainVersion = '1' }) {
  const [name, version, network, verifyingContract, nonce] = await Promise.all([
    token.name(),
    Promise.resolve(domainVersion),
    owner.provider.getNetwork(),
    token.getAddress(),
    token.nonces(owner.address),
  ]);

  const domain = {
    name,
    version,
    chainId: Number(network.chainId),
    verifyingContract,
  };

  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const message = {
    owner: owner.address,
    spender,
    value,
    nonce,
    deadline,
  };

  return Signature.from(await owner.signTypedData(domain, types, message));
}

async function executeGaslessSwap({
  rpcUrl,
  serverUrl,
  userWallet,
  contractAddress,
  amountIn = '0.01', // Amount in USDT
  slippageBps = 50,   // 0.5% slippage
  permitDeadlineSeconds = 600 // 10 minutes
}) {
  console.log('🚀 Starting gasless swap');

  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = userWallet.connect(provider);
  const swap = new Contract(contractAddress, GASLESS_SWAP_ABI, provider);

  // Get token addresses from contract
  const [tokenInAddress, tokenOutAddress, maxUsdtAmount] = await Promise.all([
    swap.usdtToken(),
    swap.wkaiaToken(),
    swap.maxUsdtAmount(),
  ]);

  const tokenIn = new Contract(tokenInAddress, ERC20_METADATA_ABI, provider);
  const tokenOut = new Contract(tokenOutAddress, ERC20_METADATA_ABI, provider);

  const [tokenInDecimals, tokenOutDecimals, tokenInSymbol, tokenOutSymbol] = await Promise.all([
    tokenIn.decimals(),
    tokenOut.decimals(),
    tokenIn.symbol(),
    tokenOut.symbol(),
  ]);

  const amountInWei = parseUnits(amountIn, tokenInDecimals);
  
  // Check if amount exceeds contract maximum
  if (amountInWei > maxUsdtAmount) {
    throw new Error(`Amount (${amountIn} ${tokenInSymbol}) exceeds contract cap (${formatUnits(maxUsdtAmount, tokenInDecimals)} ${tokenInSymbol})`);
  }

  // Get expected output and calculate minimum with slippage
  const expectedOut = await swap.getExpectedOutput(tokenInAddress, tokenOutAddress, amountInWei);
  const amountOutMin = (expectedOut * BigInt(10_000 - slippageBps)) / 10_000n;

  // Create permit signature
  const deadline = BigInt(Math.floor(Date.now() / 1000) + permitDeadlineSeconds);
  const signature = await buildPermitSignature({
    token: tokenIn,
    owner: wallet,
    spender: contractAddress,
    value: amountInWei,
    deadline,
  });

  // Prepare API payload
  const payload = {
    swap: {
      user: wallet.address,
      tokenIn: tokenInAddress,
      tokenOut: tokenOutAddress,
      amountIn: amountInWei.toString(),
      amountOutMin: amountOutMin.toString(),
      deadline: deadline.toString(),
    },
permitSignature: signature.serialized,
  };

  console.log('From:', wallet.address);
  console.log('Swap amount:', formatUnits(amountInWei, tokenInDecimals), tokenInSymbol);
  console.log('Minimum out:', formatUnits(amountOutMin, tokenOutDecimals), tokenOutSymbol);

  // Check balance before swap
  const balanceBefore = await provider.getBalance(wallet.address);
  
  // Call the API
  const response = await fetchJson(`${serverUrl}/api/gasFreeSwapKaia`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  console.log('HTTP status:', response.status);
  console.log('Response:', JSON.stringify(result, null, 2));

  if (response.ok && result.status) {
    console.log('🎉 Gasless swap request succeeded');
    
    // Check balance after swap
    const balanceAfter = await provider.getBalance(wallet.address);
    console.log('Balance before:', formatUnits(balanceBefore, 18), 'KAIA');
    console.log('Balance after:', formatUnits(balanceAfter, 18), 'KAIA');
    console.log('Balance difference:', formatUnits(balanceAfter - balanceBefore, 18), 'KAIA');
    
    return result;
  } else {
    console.error('❌ Gasless swap request failed');
    throw new Error(`Swap failed: ${result.data || result.message || 'Unknown error'}`);
  }
}

// Usage example
async function main() {
  try {
    const userWallet = new Wallet('your_private_key');
    
    const result = await executeGaslessSwap({
      rpcUrl: 'https://public-en-kairos.node.kaia.io',
      serverUrl: 'https://fee-delegation-kairos.kaia.io',
      userWallet: userWallet,
      contractAddress: '0xaaFe47636ACe87E2B8CAaFADb03E87090277Ff7B',
      amountIn: '0.002',
      slippageBps: 50,
    });
    
    console.log('Transaction hash:', result.data.hash);
  } catch (error) {
    console.error('💥 Swap failed:', error.message);
  }
}

main();
```

## API 참조 엔드포인트

- URL: `/api/gasFreeSwapKaia`
- 방법: POST
- 콘텐츠 유형: 애플리케이션/json

### 요청 본문

```javascript
{
  "swap": {
    "user": "0x742d35Cc6635C0532925a3b8D400e6D2A4b8E0bb",
    "tokenIn": "0xcb00ba2cab67a3771f9ca1fa48fda8881b457750",
    "tokenOut": "0x043c471bEe060e00A56CcD02c0Ca286808a5A436",
    "amountIn": "1000000",
    "amountOutMin": "950000000000000000",
    "deadline": "1699123456"
  },
  "permitSignature": "0x…65-byte signature string…"
}
```

### 매개변수

**스왑** (객체, 필수):

- 사용자(문자열): 권한에 서명한 토큰 소유자의 주소입니다.
- 토큰인(문자열): 입력 토큰의 주소(설정된 USDT 주소와 일치해야 함)
- 토큰아웃(문자열): 출력 토큰의 주소(구성된 WKAIA 주소와 일치해야 함).
- amountIn (문자열): 입력 토큰의 양을 문자열로 표시합니다(위/최소 단위).
- amountOutMin (문자열): 예상되는 최소 출력 토큰(미끄러짐 방지)
- 기한(문자열): 권한 및 스왑 만료를 위한 유닉스 타임스탬프(초)

**퍼밋서명**(문자열, 필수):

- 65바이트의 유효한 16진수 문자열이어야 합니다.
- 일련화된 ERC20 권한 서명이 포함되어 있습니다.

### 응답 형식

#### 성공 응답 (200)

```javascript
{
  "message": "Request was successful",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "contractAddress": null,
    "cumulativeGasUsed": "215000",
    "from": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
    "gasPrice": "25000000000",
    "gasUsed": "215000",
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "status": 1,
    "to": "0x45bD04d5f14DD9AB908109cFEa816F758FaE6709",
    "type": 49,
    "feePayer": "0x1234567890abcdef1234567890abcdef12345678",
    "feePayerSignatures": ["0x..."],
    "logs": [
      {
        "address": "0x...",
        "topics": ["0x..."],
        "data": "0x..."
      }
    ]
  },
  "status": true,
  "requestId": "req_abc123def456"
}
```

#### 오류 응답

**400 잘못된 요청 - 유효성 검사 오류:**

```javascript
{
  "message": "Bad request",
  "data": "Permit deadline has expired",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_error_123"
}
```

**400 잘못된 요청 - 트랜잭션 되돌리기:**

```javascript
{
  "message": "Bad request",
  "data": "execution reverted: Permit already used",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_revert_456"
}
```

**500 내부 서버 오류:**

```javascript
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: Network timeout",
  "error": "INTERNAL_ERROR",
  "status": false,
  "requestId": "req_error_789"
}
```

## 오류 처리

### 일반적인 오류 시나리오

| 오류                                   | HTTP 상태 | 설명                                         | 솔루션                                                  |
| ------------------------------------ | ------- | ------------------------------------------ | ---------------------------------------------------- |
| 누락된 필수 필드                            | 400     | _스왑_ 또는 _퍼밋서명_ 누락                          | 모든 필수 매개변수 포함                                        |
| 사용자에게 KAIA 잔액이 있습니다. | 400     | 사용자의 KAIA 잔액이 0이어야 합니다.    | KAIA 잔액이 0원인 사용자만 이 서비스를 이용할 수 있습니다. |
| 잘못된 서명 형식                            | 400     | 권한 서명이 유효한 16진수 문자열이 아닙니다. | 유효한 65바이트 16진수 서명을 제공하세요.            |
| 잘못된 주소                               | 400     | 잘못된 이더리움 주소                                | 주소가 유효한지 확인                                          |
| 지원되지 않는 토큰                           | 400     | 허용 목록에 없는 토큰                               | 구성된 토큰 주소만 사용                                        |
| 만료된 마감일                              | 400     | 과거 허가 마감일                                  | 향후 타임스탬프 사용                                          |
| 금액이 너무 큼                             | 400     | 계약 한도 초과                                   | 계약에서 _최대사용금액()_ 확인                |
| 견적 불충분                               | 400     | 너무 엄격한 미끄러짐                                | 미끄러짐 허용 오차를 늘리거나 양을 줄입니다.            |
| 가스 가격이 너무 높음                         | 400     | 네트워크 혼잡                                    | 유가 하락을 기다리기                                          |
| 네트워크 시간 초과                           | 500     | RPC 공급자 문제                                 | 지연 후 재시도 요청                                          |

## 보안 고려 사항

### 가스 가격 보호

API는 과도한 비용을 방지하기 위해 가스 가격이 50GWI를 초과하면 거래를 거부합니다. 가스 가격을 모니터링하고 혼잡한 시간대에 사용자에게 정보를 제공합니다.

### 서명 보안

- 허가 서명을 재사용하지 마십시오.
- 항상 합리적인 마감 시간(5-30분)을 사용하세요.
- 서명하기 전에 모든 매개변수 유효성 검사
- 모든 API 통신에 HTTPS 사용

## 스마트 계약 세부 정보

### 가스리스ERC20퍼밋스왑 컨트랙트 주소

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet"></TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    ```
    0xaaFe47636ACe87E2B8CAaFADb03E87090277Ff7B
    ```
 </TabItem>
</Tabs>

### 주요 기능

**executeSwapWithPermit** - 허가 서명을 사용하여 가스 없는 스왑을 실행합니다:

- 허가 및 스왑 매개변수 유효성 검사
- 허가를 사용하여 토큰 전송
- DEX 스왑 실행
- WKAIA를 기본 KAIA로 변환합니다.
- 사용자에게 네이티브 KAIA 전송

**겟익스펙티드아웃풋** - 예상 출력량을 조회하는 함수입니다:

```javascript
function getExpectedOutput(
  address tokenIn,
  address tokenOut,
  uint256 amountIn
) external view returns (uint256)
```

### 계약 한도

- 스왑당 최대 USDT: 1,000,000 (소수점 6자리 1 USDT)
- 지원되는 페어: USDT → WKAIA → 네이티브 KAIA
- 서명 추적을 통한 재생 방지 보호

## 추가 리소스

- [ERC20 허가 표준(EIP-2612)](https://eips.ethereum.org/EIPS/eip-2612)
- [카이아 이더 확장](https://github.com/kaiachain/ethers-ext)


