# RedStone

## Overview

[RedStone](https://redstone.finance/) is a modular oracle network that delivers price feeds to smart contracts. On Kaia, RedStone exposes **Push** feeds that store prices on-chain so dApps can read them with a familiar Chainlink-compatible `AggregatorV3Interface`.

RedStone Push periodically updates on-chain prices based on configurable **deviation** and **heartbeat** conditions. Learn more in the [RedStone Push documentation](https://docs.redstone.finance/docs/dapps/redstone-push/) and browse live Kaia feeds in the [Push Feeds UI](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true).

## Using RedStone on Kaia

Each Push feed is deployed as a price-feed contract that implements Chainlink’s Aggregator interface. You can call `latestRoundData()` to read the latest price.

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

Pass the feed address for the asset you need (see tables below). Always validate `updatedAt` and round data against your protocol’s freshness requirements.

## Feeds on Kaia

### Mainnet (Chain ID 8217)

| Feed | Address | Deviation / Heartbeat |
| --- | --- | --- |
| BTC | [`0x6AEE1334b4053B0148907649D447557560CC8126`](https://kaiascan.io/account/0x6AEE1334b4053B0148907649D447557560CC8126) | 0.5% / 6h |
| ETH | [`0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD`](https://kaiascan.io/account/0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD) | 0.5% / 6h |
| USDT | [`0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A`](https://kaiascan.io/account/0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A) | 0.5% / 6h |
| KAIA | [`0xa2F3430ac9cfc37aEF88449DADf36af676211A64`](https://kaiascan.io/account/0xa2F3430ac9cfc37aEF88449DADf36af676211A64) | 0.1% / 12h |
| earnUSDT | [`0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71`](https://kaiascan.io/account/0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71) | 0.1% / 12h |
| stKAIA | [`0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7`](https://kaiascan.io/account/0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7) | 0.1% / 12h |

### Kairos Testnet (Chain ID 1001)

| Feed | Address | Deviation / Heartbeat |
| --- | --- | --- |
| USDT | [`0x13d3B27c7C100621CB3B714deAb858Ee06d41db1`](https://kairos.kaiascan.io/account/0x13d3B27c7C100621CB3B714deAb858Ee06d41db1) | 0.5% / 6h |

Feed availability and parameters can change. Confirm the latest addresses and update conditions in the [Push Feeds UI](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true).

## Resources

- [RedStone Docs — Push model](https://docs.redstone.finance/docs/dapps/redstone-push/)
- [Push Feeds UI (Kaia)](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true)
- [RedStone website](https://redstone.finance/)
- [Twitter / X](https://x.com/redstone_defi)
