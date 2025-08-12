# 3. 지원 토큰

개발자는 가스리스 트랜잭션을 시도하기 전에 현재 지원되는 토큰 목록을 조회해야 합니다.

## 3.1. 토큰 자격

- **ERC-20 호환성:** 토큰은 완전히 ERC-20을 준수해야 합니다.
- **Fee-on-Transfer 토큰 미지원:** 전송 수수료(FoT) 토큰은 지원되지 않습니다. 스왑 금액이 일치하지 않아 트랜잭션 실패를 야기할 수 있기 때문입니다.
- **거버넌스 화이트리스트:** `GaslessSwapRouter`는 Kaia 재단이 관리하는 지원 토큰 목록을 유지합니다.

## 3.2 현재 지원되는 토큰

가스리스 트랜잭션은 현재 다음 토큰을 지원합니다. 향후 추가 CL 토큰과 스테이블코인이 포함될 수 있습니다.

- **USDT**
- **BORA**

## 3.3 지원 토큰 목록 확인 방법

Kaia 문서에서 메인넷과 테스트넷 모두의 공식 [KIP-247 GaslessSwapRouter 컨트랙트 주소](https://docs.kaia.io/references/contract-addresses/)를 찾을 수 있습니다.

**GaslessSwapRouter 컨트랙트 주소:**

- **메인넷**: `0xCf658F786bf4AC62D66d70Dd26B5c1395dA22c63`
- **Kairos 테스트넷**: `0x4b41783732810b731569E4d944F59372F411BEa2`

가장 최신 주소는 항상 공식 문서를 참조하시기 바랍니다.

### 블록 익스플로러(KaiaScan) 사용

KaiaScan과 같은 블록 익스플로러를 통해 다음과 같이 지원 토큰을 확인할 수 있습니다.

![](/img/build/tutorials/ga3.png)

1. [KaiaScan](https://kaiascan.io/) (또는 테스트넷의 경우 [kairos.kaiascan.io](https://kairos.kaiascan.io/))로 이동합니다.
2. `GaslessSwapRouter` 주소를 검색합니다.
3. **Contract** 탭으로 이동하여 **Read Contract**를 선택합니다.
4. `getSupportedTokens()` 함수를 찾아 **Query**를 클릭합니다. 지원되는 ERC20 토큰 주소 배열이 반환됩니다.

### 프로그래밍 방식 조회

지원 토큰을 프로그래밍 방식으로 확인하려면 GaslessSwapRouter 컨트랙트 메서드를 사용할 수 있습니다.

**GSR 메서드 사용:**

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