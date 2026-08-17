# RedStone

## 개요

[RedStone](https://redstone.finance/)는 스마트 계약에 가격 피드를 제공하는 모듈형 오라클 네트워크입니다. 카이아(Kaia)에서 RedStone은 가격 정보를 온체인에 저장하는 **Push** 피드를 노출하므로, dApp은 익숙한 체인링크(Chainlink) 호환 `AggregatorV3Interface`를 통해 이를 읽을 수 있습니다.

RedStone Push는 사용자 정의 가능한 **편차** 및 **하트비트** 조건에 따라 온체인 가격을 주기적으로 업데이트합니다. 자세한 내용은 [RedStone Push 문서](https://docs.redstone.finance/docs/dapps/redstone-push/)에서 확인하시고, [Push Feeds UI](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true)에서 실시간 Kaia 피드를 살펴보실 수 있습니다.

## Kaia에서 RedStone 사용하기

각 푸시 피드는 체인링크의 애그리게이터 인터페이스를 구현하는 가격 피드 계약으로 배포됩니다. `latestRoundData()`를 호출하여 최신 가격을 확인할 수 있습니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);

    function description() external view returns (string memory);

    function version() external view returns (uint256);

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

contract RedStoneConsumer {
    AggregatorV3Interface public immutable priceFeed;

    constructor(address feedAddress) {
        priceFeed = AggregatorV3Interface(feedAddress);
    }

    function getLatestPrice()
        external
        view
        returns (int256 price, uint256 updatedAt)
    {
        (, price, , updatedAt, ) = priceFeed.latestRoundData();
    }
}
```

필요한 자산의 피드 주소를 전달해 주세요(아래 표 참조). 항상 `updatedAt`를 검증하고, 프로토콜의 최신성 요구 사항에 따라 데이터를 반올림해야 합니다.

## Kaia의 피드

### 메인넷 (체인 ID 8217)

| 피드      | 주소                                                                                                                     | 편차 / 하트비트                   |
| ------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| BTC     | [`0x6AEE1334b4053B0148907649D447557560CC8126`](https://kaiascan.io/account/0x6AEE1334b4053B0148907649D447557560CC8126) | 0.5% / 6시간  |
| ETH     | [`0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD`](https://kaiascan.io/account/0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD) | 0.5% / 6시간  |
| USDT    | [`0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A`](https://kaiascan.io/account/0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A) | 0.5% / 6시간  |
| KAIA    | [`0xa2F3430ac9cfc37aEF88449DADf36af676211A64`](https://kaiascan.io/account/0xa2F3430ac9cfc37aEF88449DADf36af676211A64) | 0.1% / 12시간 |
| USDT 적립 | [`0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71`](https://kaiascan.io/account/0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71) | 0.1% / 12시간 |
| stKAIA  | [`0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7`](https://kaiascan.io/account/0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7) | 0.1% / 12시간 |

### Kairos 테스트넷 (체인 ID 1001)

| 피드   | 주소                                                                                                                            | 편차 / 하트비트                  |
| ---- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| USDT | [`0x13d3B27c7C100621CB3B714deAb858Ee06d41db1`](https://kairos.kaiascan.io/account/0x13d3B27c7C100621CB3B714deAb858Ee06d41db1) | 0.5% / 6시간 |

사료의 공급 가능 여부와 관련 조건은 변경될 수 있습니다. [Push Feeds UI](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true)에서 최신 주소와 업데이트 조건을 확인하십시오.

## 자료

- [RedStone 문서 — 푸시 모델](https://docs.redstone.finance/docs/dapps/redstone-push/)
- [푸시 피드 UI (Kaia)](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true)
- [RedStone 웹사이트](https://redstone.finance/)
- [트위터 / X](https://x.com/redstone_defi)
