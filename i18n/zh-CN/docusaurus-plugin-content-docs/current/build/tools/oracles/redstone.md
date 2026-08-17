# RedStone

## 概述

[RedStone](https://redstone.finance/) 是一个模块化预言机网络，为智能合约提供价格数据。 在 Kaia 上，RedStone 提供了 **Push** 数据源，这些数据源将价格信息存储在链上，因此 dApp 可以使用熟悉的、与 Chainlink 兼容的 `AggregatorV3Interface` 来读取这些数据。

RedStone Push 会根据可配置的 **偏差** 和 **心跳** 条件，定期更新链上价格。 请参阅 [RedStone Push 文档](https://docs.redstone.finance/docs/dapps/redstone-push/) 了解更多信息，并在 [Push Feeds 用户界面](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true) 中浏览 Kaia 的实时信息流。

## 在 Kaia 上使用 RedStone

每个 Push 数据源均作为实现 Chainlink Aggregator 接口的价格数据源合约进行部署。 您可以调用 `latestRoundData()` 来读取最新价格。

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

请提供所需资源的源地址（参见下表）。 请务必验证 `updatedAt`，并根据协议对数据的新鲜度要求对数据进行四舍五入处理。

## Kaia 上的动态

### 主网（链 ID 8217）

| Feed   | 地址                                                                                                                     | 偏差 / 心跳                     |
| ------ | ---------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| BTC    | [`0x6AEE1334b4053B0148907649D447557560CC8126`](https://kaiascan.io/account/0x6AEE1334b4053B0148907649D447557560CC8126) | 0.5% / 6小时  |
| ETH    | [`0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD`](https://kaiascan.io/account/0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD) | 0.5% / 6小时  |
| USDT   | [`0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A`](https://kaiascan.io/account/0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A) | 0.5% / 6小时  |
| KAIA   | [`0xa2F3430ac9cfc37aEF88449DADf36af676211A64`](https://kaiascan.io/account/0xa2F3430ac9cfc37aEF88449DADf36af676211A64) | 0.1% / 12小时 |
| 赚取USDT | [`0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71`](https://kaiascan.io/account/0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71) | 0.1% / 12小时 |
| stKAIA | [`0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7`](https://kaiascan.io/account/0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7) | 0.1% / 12小时 |

### Kairos 测试网（链 ID 1001）

| Feed | 地址                                                                                                                            | 偏差 / 心跳                    |
| ---- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| USDT | [`0x13d3B27c7C100621CB3B714deAb858Ee06d41db1`](https://kairos.kaiascan.io/account/0x13d3B27c7C100621CB3B714deAb858Ee06d41db1) | 0.5% / 6小时 |

饲料的供应情况和相关参数可能会发生变化。 请在 [推送源界面](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true) 中确认最新的地址和更新条件。

## 资源

- [RedStone 文档 — 推送模型](https://docs.redstone.finance/docs/dapps/redstone-push/)
- [推送订阅界面（Kaia）](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true)
- [RedStone 网站](https://redstone.finance/)
- [Twitter / X](https://x.com/redstone_defi)
