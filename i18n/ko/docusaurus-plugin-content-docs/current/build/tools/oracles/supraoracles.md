# SupraOracles

## 소개

![](/img/build/tools/klaytnXsupraOracles.png)

[SupraOracles](https://supraoracles.com/)은 모든 블록체인, 퍼블릭(L1 및 L2) 또는 프라이빗(기업)을 상호 연결하는 크로스체인 솔루션(데이터 오라클, 자산 브리지, 자동화 네트워크 등)의 수직 통합 툴킷인 새로운 고처리량 오라클 및 인트라레이어(IntraLayer)입니다. 데이터 정확성, 속도, 확장성, 보안성이 뛰어난 차세대 크로스 체인 오라클 솔루션으로 스마트 컨트랙트를 제공합니다.

SupraOracles을 사용하면 스마트 컨트랙트가 가격 데이터 피드에 액세스하여 다양한 탈중앙 금융(DeFi) 사용 사례를 구축할 수 있습니다. 이 튜토리얼에서는 SupraOracles을 사용하여 Remix IDE를 사용해 Kaia 블록체인에서 가격 피드를 쉽게 가져오는 방법을 설명합니다.

## 전제 조건

- [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en)
- [Remix IDE](https://remix.ethereum.org/)
- [Remix 카이아 플러그인](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 테스트 KAIA 얻기

## 시작하기

다음 단계에서는 SupraOracles을 사용하여 스마트 컨트랙트에서 ETH/USD 가격 피드를 요청합니다. 이제 시작해보겠습니다!

### 1단계: S-Value 인터페이스 만들기

이렇게 하면 슈퍼 오라클에서 가격을 가져오는 데 사용할 인터페이스가 생성됩니다. S-Value를 가져올 Solidity 스마트 컨트랙트에 다음 코드를 추가합니다.

```solidity
interface ISupraSValueFeed {
function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
```

### 2단계: S-Value 피드 주소 구성하기

SupraOracles 스마트 콘트랙트에서 S-Value을 가져오려면 먼저 선택한 체인에 대한 S-Value 피드 주소를 찾아야 합니다. 올바른 주소를 찾았다면, 앞서 정의한 인터페이스를 사용하여 S-Value 피드 인스턴스를 생성합니다:

```solidity
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
}
```

이 예제에서는 Kaia Kairos 테스트넷에서 S-Value Feed를 구현하고 있습니다. 카이아 Kairos S-Value 피드 주소는 [여기](https://supraoracles.com/docs/get-started/networks/)에서 확인할 수 있습니다.

### 3단계: S-Value 암호화폐 가격 확인하기

이제 지원되는 시장 쌍의 S-밸류 암호화폐 가격에 간단히 액세스할 수 있습니다. 이 단계에서는 스마트 컨트랙트에 다음 코드를 적용하여 ETH/USD(eth_usdt)의 가격을 확인할 수 있습니다.

```solidity
function getEthUsdtPrice() external view returns (int) {
(
int price,
/* uint timestamp */
) = sValueFeed.checkPrice("eth_usdt");
return price;
}
```

## 실제 구현

아래 예시에서는 S-Value 가격 피드 컨트랙트를 배포하고 getEthUsdtPrice() 함수를 실행하여 ETH/USDT 쌍의 가격을 가져올 것입니다.

### 샘플 코드 생성 및 배포

**Remix IDE**

- [Remix IDE](https://remix.ethereum.org/)로 이동합니다.
- 파일 탐색기 탭을 클릭하고, contracts 폴더에 `demoSupraPriceFeed.sol`이라는 이름의 파일을 새로 생성합니다.
- 새로 생성한 파일에 아래 코드를 붙여넣습니다.
- Remix에서 **Compile contract**을 클릭합니다.
- 플러그인을 설치한 후 왼쪽의 Kaia 탭을 클릭합니다.
- **Environment** > **Injected Caver** - **Kaikas**를 선택합니다.
- **Contract**에서 원하는 컨트랙트를 선택합니다. (예: ISupraSValueFeedExample)
- **Deploy**를 클릭합니다..

**샘플 코드**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
interface ISupraSValueFeed {
    function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
    function getEthUsdtPrice() external view returns (int) {
        (
            int price,
            /* uint timestamp */
        ) = sValueFeed.checkPrice("eth_usdt");
        return price;
    }
}
```

### 스마트 컨트랙트와의 상호작용

선택한 통화쌍의 가격 피드를 가져오려면 `getEthUsdtPrice()` 함수를 실행해야 합니다.

![](/img/build/tools/sPriceFeed.png)

축하합니다! 방금 스마트 컨트랙트에서 통화 가격 피드(ETH/USDT)를 요청하셨습니다.

이 글을 쓰는 시점을 기준으로 getEthUsdtPrice()는 8포인트 정밀도 수치인 "185795966200"를 반환했습니다. 실제 ETH/USD 값을 얻으려면 이 수치를 10^8로 나누면 $1857.95966200가 됩니다.

## SupraOracles 암호화폐 가격 피드를 사용하는 더 많은 방법

### Web3.js를 사용한 S-Value 피드

```javascript
// example assumes that the web3 library has been imported and is accessible within your scope
const getEthUsdtPrice = async () => {
const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const address = '0x7f003178060af3904b8b70fEa066AEE28e85043E'
const web3 = new Web3('https://public-en-baobab.klaytn.net')
const sValueFeed = new web3.eth.Contract(abi, address)
const price = (await sValueFeed.methods.checkPrice('eth_usdt').call()).price
console.log(`The price is: ${price}`)
}
getEthUsdtPrice()
```

### ethers.js를 사용한 S-Value 피드

```javascript
// example assumes that the ethers library has been imported and is accessible within your scope
const getEthUsdtPrice = async () => {
////for ethers version 6.0
const provider = new ethers.JsonRpcProvider("https://klaytn-baobab-rpc.allthatnode.com:8551")
////for ethers version <= 5.7.2
//const provider = new ethers.providers.JsonRpcProvider('https://public-en-baobab.klaytn.net')
const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const address = '0x7f003178060af3904b8b70fEa066AEE28e85043E'
const sValueFeed = new ethers.Contract(address, abi, provider)
const price = (await sValueFeed.checkPrice('eth_usdt')).price
console.log(`The price is: ${price.toString()}`)
}
getEthUsdtPrice()
```

## 결론

이 튜토리얼에서는 SupraOracles 가격 피드 솔루션을 사용하여 ETH/USD 가격을 요청하는 방법을 배웠습니다. SupraOracles을 사용하면 스마트 컨트랙트에서 난수를 생성할 수도 있습니다. 이 과정이 궁금하다면 카이아에 SupraVRF를 통합하는 방법에 대한 [이 가이드](https://metaverse-knowledge-kit.klaytn.foundation/docs/decentralized-oracle/oracle-providers/supraOracles-tutorial)를 참고하시기 바랍니다. SupraOracles에 대한 더 자세한 가이드는 [SupraOracles Docs](https://supraoracles.com/docs/development-guides)를 참고하세요.
