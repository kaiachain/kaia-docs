# Pyth를 사용하여 Kaia에서 실시간 가격 가져오기 방법

## 소개

Pyth는 주로 푸시 기반 오라클로 구동되는 생태계에서 독특한 접근 방식을 취하는 탈중앙화 오라클 네트워크입니다. 고정된 간격으로 데이터를 계약에 푸시하는 대신 Pyth를 사용하면 필요에 따라 실제 데이터를 가져올 수 있습니다. 이 모델은 개발자에게 더 많은 제어권을 부여하고 불필요한 온체인 업데이트를 방지하는 데 도움이 됩니다. 이 통합을 통해 개발자는 실시간 데이터를 가져오고 업데이트가 요청된 경우에만 요금이 적용되는 사용량 기반 유료 모델을 사용할 수 있습니다.

이 가이드에서는 Pyth의 실시간 가격 피드를 사용하여 법정 화폐인 IDR의 가치를 읽는 방법을 알아보세요. 솔리디티 스마트 컨트랙트는 [pyth-sdk-solidity](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity)를 사용하여 Pyth에서 USD/IDR 가격을 검색하고, [hermes-client](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/hermes/client/js)를 사용하여 최신 가격을 업데이트하고 가져옵니다.

빠르게 시작하려면 이 튜토리얼의 전체 코드를 [GitHub](https://github.com/ayo-klaytn/pyth-kaia-hardhat-example)에서 확인할 수 있습니다. 이는 바로 사용할 수 있는 참조를 제공하며 프로젝트와 설치를 더 빠르게 설정하는 데 도움이 됩니다.

## 전제 조건

시작하기 전에 다음 사항이 준비되어 있는지 확인하세요:

- [Node.js 및 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

  종속성을 설치하고 개발 도구를 실행하는 데 필요합니다.

- KAIA 테스트넷 토큰으로 자금을 조달한 지갑입니다.

  카이로스 테스트넷의 배포 및 트랜잭션 가스 수수료를 지불하려면 KAIA가 필요합니다. 카이아 수도꼭지](https://faucet.kaia.io/)에서 무료 테스트넷 KAIA를 신청할 수 있습니다.

## 개발 환경 설정

이 섹션에서는 개발 환경을 설정하고, 오라클 컨트랙트를 컴파일하고, Hardhat을 사용하여 배포할 수 있도록 준비합니다.

**1. 하드햇 프로젝트 만들기**

프로젝트의 새 디렉터리를 만들고 하드햇을 초기화합니다:

```bash
mkdir pyth-kaia-hardhat-example && cd pyth-kaia-hardhat-example
npm init -y
npx hardhat@next --init
```

메시지가 표시되면 기본 응답을 수락합니다. 이 가이드에서는 모카 및 이더 템플릿을 사용합니다.

하드햇 버전을 확인하여 설치를 확인합니다:

```bash
npx hardhat --version
```

**2. 암호화된 비밀 설정**

이제 하드햇의 암호화된 키 저장소를 사용하여 RPC URL과 개인 키를 저장합니다.

다음 명령을 실행합니다:

```bash
npx hardhat keystore set KAIROS_RPC_URL
npx hardhat keystore set PRIVATE_KEY
```

각 변수에 대한 비밀번호와 값을 입력하여 암호화된 상태로 유지하세요.

**3. 구성 파일의 참조 비밀**

hardhat.config.ts\`를 열고 네트워크 섹션을 업데이트하여 암호화된 비밀번호를 참조하세요. 다른 비밀 이름을 사용했다면 그에 따라 키를 업데이트하세요.

```typescript
import { configVariable } from "hardhat/config";
module.exports = {
  networks: {
    kairos: {
      url: configVariable("KAIROS_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
};
```

## 계약 생성 및 파이썬 오라클에서 가격 가져오기

이 섹션에서는 [파이스 솔리디티 SDK](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity)를 설치하고, PriceConsumer 컨트랙트를 생성한 후, 하드햇을 사용하여 배포합니다. 계약은 나중에 Hermes에서 가져온 가격 데이터를 사용하여 업데이트할 Pyth 가격 피드를 읽습니다.

### Pyth SDK 설치

파이스는 온체인 파이스 가격 피드 콘트랙트와 상호작용할 수 있는 솔리디티 SDK를 제공합니다. SDK는 IPyth 인터페이스와 관련 구조를 노출합니다.

npm으로 SDK를 설치합니다:

```bash
npm install --save-dev @pythnetwork/pyth-sdk-solidity
```

### PriceConsumer 컨트랙트 생성

계약/가격소비자.sol\`에 새 파일을 만들고 다음 코드를 추가합니다:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
contract PriceConsumer {
    IPyth public pyth;
    constructor(address pythContract) {
        pyth = IPyth(pythContract);
    }
    function updatePrice(bytes[] calldata priceUpdateData)
        external
        payable
    {
        // Pay the Pyth fee for receiving price updates
        uint fee = pyth.getUpdateFee(priceUpdateData);
        require(msg.value >= fee, "Not enough fee sent");
        // Update the Pyth price state
        pyth.updatePriceFeeds{value: fee}(priceUpdateData);
        // Can fetch the price and use it as well
        //PythStructs.Price memory currentBasePrice = pyth.getPriceNoOlderThan(priceFeedId, 60);
    }
    function getLatestPrice(bytes32 priceFeedId) public view returns (int64, int32) {
        // Read the current price from a price feed if it is less than 60 seconds old.
        // Each price feed (e.g., USD/IDR) is identified by a price feed ID.
        // The complete list of feed IDs is available at https://docs.pyth.network/price-feeds/price-feeds
        PythStructs.Price memory currentBasePrice = pyth.getPriceNoOlderThan(priceFeedId, 60);
        
        // uint256 basePrice = PythUtils.convertToUint(
        //   currentBasePrice.price,
        //   currentBasePrice.expo,
        //   18
        // );
        
        return (currentBasePrice.price, currentBasePrice.expo);
    }
}
```

**워크스루**

PriceConsumer 계약:

- Pyth 인터페이스와 구조체를 `@pythnetwork/pyth-sdk-solidity`에서 가져옵니다.
- 스토어:
  - 파이스 컨트랙트 인스턴스(pyth)입니다.
  - USD/IDR의 가격 피드 ID(usdIdrPriceId)입니다.
- updateAndGetUsdIdrPrice\`를 노출합니다:
  - IPyth.getUpdateFee를 사용하여 업데이트 수수료를 계산합니다.
  - 필요한 수수료와 함께 IPyth.updatePriceFeeds를 호출합니다.
  - 새로운 USD/IDR 가격을 확인하려면 IPyth.getPriceNoOlderThan을 호출하세요.
  - 원시 가격, 지수, 게시 시간을 반환합니다.

나중에 오프체인 헤르메스 클라이언트는 가격 업데이트 바이트 배열을 생성하고 새로운 가격이 필요할 때 이 함수에 전달합니다.

### 계약서 컴파일

다음 명령을 실행하여 컨트랙트를 컴파일합니다:

```
npx hardhat compile
```

## 컨트랙트 배포

PriceConsumer 컨트랙트를 배포하려면 Ignition 모듈을 생성한 다음 배포 명령을 실행합니다.

**이그니션 모듈 만들기**

'ignition/modules/PriceConsumer.ts'에 새 파일을 생성합니다:

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43"; 
export default buildModule("PriceConsumerModule", (m) => {
  const priceConsumer = m.contract("PriceConsumer", [pythContractAddress]);
  return { priceConsumer };
});
```

**계약 배포**

이그니션 모듈을 사용하여 PriceConsumer 컨트랙트를 카이로스 테스트넷에 배포합니다:

```bash
npx hardhat ignition deploy --network kairos ignition/modules/PriceConsumer.ts
```

메시지가 표시되면 앞서 암호화된 비밀에 대해 구성한 키 저장소 비밀번호를 입력합니다.

이 작업이 완료되면 `PriceConsumer.sol` 컨트랙트가 카이로스 테스트넷에 배포되고 파이스로부터 실시간 USD/IDR 가격을 사용할 준비가 된 것입니다.

## 타입스크립트에서 상호 작용

이 마지막 단계에서는 TypeScript를 사용하여 배포된 PriceConsumer 컨트랙트와 상호 작용합니다. 이 스크립트는 헤르메스 클라이언트를 통해 파이스 가격 업데이트 데이터를 요청하고 이를 온체인으로 전송하여 최신 USD/IDR 가격을 가져옵니다.

**종속성 설치**

필요한 패키지를 설치합니다:

```bash
npm install --save-dev tsx @pythnetwork/hermes-client @dotenv
```

**.env 설정**

프로젝트의 루트 디렉터리에 .env 파일을 만들고 개인 키를 추가합니다:

```bash
PRIVATE_KEY="0xDEAD....." // REPLACE WITH YOUR PRIVATE KEY
```

**인터랙션 스크립트 만들기**

스크립트/인터랙트.ts\*\*에 새 파일을 만들고 다음을 추가합니다:

```typescript
import { HermesClient } from "@pythnetwork/hermes-client";
import { ethers } from "ethers";
import 'dotenv/config'

// 1. Setup
const hermes = new HermesClient("https://hermes.pyth.network");
const provider = new ethers.JsonRpcProvider(
  "https://public-en-kairos.node.kaia.io"
);

const PK = process.env.PRIVATE_KEY; 
const wallet = new ethers.Wallet(PK, provider);


// 2. Your deployed contract
const priceConsumerAddress = "0x91e89aa32224dEd5dA483a83a4de45bF4bE57caA"; // REPLACE WITH DEPLOYED PRICE CONSUMER CONTRACT

const priceConsumerAbi = [
  "function updatePrice(bytes[] priceUpdateData) external payable",
  "function getLatestPrice(bytes32 priceId) public view returns(int64, int32)",
];

const priceConsumer = new ethers.Contract(
  priceConsumerAddress,
  priceConsumerAbi,
  wallet
);

// 3. Price feed IDs
const priceId =
  "0x6693afcd49878bbd622e46bd805e7177932cf6ab0b1c91b135d71151b9207433"; // FX.USD/IDR Beta Price Feed ID

async function run() {
  // Fetch Hermes price update binary
  const update = await hermes.getLatestPriceUpdates([priceId], {
    encoding: "hex",
  });
  console.log(update);

  const priceUpdateData = ["0x" + update.binary.data]; // must be array of bytes

  console.log(priceUpdateData);

  // Estimate fee required by Pyth contract
  // EVM Network Price Feed Contract Addresses: https://docs.pyth.network/price-feeds/core/contract-addresses/evm

  const pythContractAddress = "0x2880ab155794e7179c9ee2e38200202908c17b43";
  const pythAbi = [
    "function getUpdateFee(bytes[] calldata data) external view returns(uint)",
  ];
  console.log("Pyth contract address:", pythContractAddress);
  const pyth = new ethers.Contract(pythContractAddress, pythAbi, wallet);
  const fee = await pyth.getUpdateFee(priceUpdateData);
  console.log("Pyth fee:", fee.toString());

  // Call your contract
  const tx = await priceConsumer.updatePrice(priceUpdateData, {
    value: fee, // pay the pyth update fee
    gasLimit: 500000,
  });
  console.log("Tx sent:", tx.hash);
  const receipt = await tx.wait();
  console.log("Tx confirmed");
  console.log(receipt);

  // 4. Get latest price from contract
  try {
    console.log("=== Latest Price from Contract ===");
    const [price, expo] = await priceConsumer.getLatestPrice(priceId);
    console.log("Price Value : " + price.toString());
    console.log("Exponent Value : " + expo.toString());
  } catch (error) {
    console.log(error);
    // @ts-ignore
    console.error("\nError calling getLatestPrice:", error.message);
    console.log(
      "This usually means the price is older than 60 seconds or hasn't been updated yet."
    );
    console.log("Make sure updatePrice() was called successfully first.");
  }
}
run();

```

**스크립트 실행**

스크립트를 실행합니다:

```bash
npx tsx scripts/interact.ts
```

**출력 예시**

```bash
Tx sent: 0x79c5dcb7abd9605b070bf9062ba2e2382272d23d58f7b50446c3107b7784fc8e
Tx confirmed
=== Latest Price from Contract ===
Price Value : 1669784988
Exponent Value : -5
======== —— =========
```

거래 해시를 검색창에 붙여넣어 카이로스 탐색기에서 거래를 확인할 수 있습니다. 이렇게 하면 업데이트 및 읽기 작업이 성공했음을 확인할 수 있습니다.

## 결론

이 튜토리얼에서는 파이스에서 실시간 가격을 읽는 솔리디티 컨트랙트를 생성하고, 이를 카이로스 테스트넷에 배포한 다음, 헤르메스 클라이언트를 사용해 상호작용했습니다. 또한 Pyth의 풀 기반 설계를 통해 가격 업데이트 시기와 방법을 제어하는 방법도 배웠습니다.

자세한 내용은 탐색하기에서 확인하세요:

- Pyth API용 [EVM 계약 참조](https://api-reference.pyth.network/price-feeds/evm/getPriceNoOlderThan)
- 완전한 엔드투엔드 구현을 위한 [Pyth Oracle AMM 예제](https://github.com/pyth-network/pyth-examples/tree/main/price_feeds/evm)를 확인하세요.



