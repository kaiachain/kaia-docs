# 3. 지원되는 토큰

개발자는 가스 없는 거래를 시도하기 전에 지원되는 토큰의 현재 목록을 조회해야 합니다.

## 3.1. 토큰 자격 기준

- \*\*ERC-20 준수: \*\*토큰은 ERC-20을 완전히 준수해야 합니다.
- \*\*송금 수수료 없음: \*\*송금 수수료(FoT) 토큰은 스왑 금액이 불일치하여 거래 실패로 이어질 수 있으므로 지원되지 않습니다.
- **거버넌스 화이트리스트:** 'GaslessSwapRouter'는 지원되는 토큰 목록을 유지하며, 카이아 재단에서 관리합니다.

## 3.2 현재 지원되는 토큰

현재 가스 없는 거래는 다음 토큰을 지원합니다. 향후 CL 토큰과 스테이블코인이 추가로 포함될 수 있습니다.

- **USDT**
- **BORA**

## 3.3 지원되는 토큰 목록 확인 방법

메인넷과 테스트넷의 공식 [KIP-247 가스스왑라우터 컨트랙트 주소](https://docs.kaia.io/references/contract-addresses/)는 Kaia 문서에서 확인할 수 있습니다.

**가스 없는 스왑 라우터 계약 주소:**

- **메인넷**: `0xCf658F786bf4AC62D66d70Dd26B5c1395dA22c63`
- **카이로스 테스트넷**: `0x4b41783732810b731569E4d944F59372F411BEa2`

최신 주소는 항상 공식 문서를 참조하세요.

### 블록 탐색기(카이아스캔) 사용

KaiaScan과 같은 블록 탐색기를 사용하여 지원되는 토큰을 확인하려면 다음과 같이 하세요:

![](/img/build/tutorials/ga3.png)

1. 카이아스캔](https://kaiascan.io/)(또는 테스트넷의 경우 [kairos.kaiascan.io](https://kairos.kaiascan.io/)로 이동하세요.
2. 가스 없는 스왑 라우터\` 주소를 검색합니다.
3. 계약\*\* 탭으로 이동하여 **계약서 읽기**를 선택합니다.
4. 'getSupportedTokens()\` 함수를 찾아 **Query**를 클릭합니다. 그러면 지원되는 ERC20 토큰 주소 배열이 반환됩니다.

### 프로그래매틱 쿼리

지원되는 토큰을 프로그래밍 방식으로 확인하려면 GaslessSwapRouter 컨트랙트 메서드를 사용할 수 있습니다.

**GSR 방법 사용:**

```solidity
function getSupportedTokens() external view returns (address[] memory);
function dexAddress(address token) external view returns (address dex); // reverts if token unsupported
```

**SDK 사용 (예시)**

```javascript
// Ethers-ext.js
const ethers = require("ethers6");
const { gasless } = require('@kaiachain/ethers-ext');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const router    = await gasless.getGaslessSwapRouter(provider);
const supported = await router.getSupportedTokens();

// Web3-ext.js
const { Web3 } = require("@kaiachain/web3js-ext");

const provider = new Web3.providers.HttpProvider(RPC_URL);
const web3 = new Web3(provider);

const router    = await gasless.getGaslessSwapRouter(web3);
const supported = await router.methods.getSupportedTokens().call();
```