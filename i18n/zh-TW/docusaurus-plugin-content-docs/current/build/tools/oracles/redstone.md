# RedStone

## 概覽

[RedStone](https://redstone.finance/) 是一個模組化預言機網路，負責向智慧合約提供價格資料。 在 Kaia 上，RedStone 公開了 **Push** 饋送，這些饋送將價格資料儲存於鏈上，因此 dApp 可以透過熟悉的、與 Chainlink 相容的 `AggregatorV3Interface` 讀取這些資料。

RedStone Push 會根據可設定的 **偏差** 和 **心跳** 條件，定期更新鏈上價格。 請參閱 [RedStone Push 文件](https://docs.redstone.finance/docs/dapps/redstone-push/) 以了解更多資訊，並在 [Push Feeds 使用者介面](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true) 中瀏覽 Kaia 的即時資訊流。

## 在 Kaia 上使用 RedStone

每個 Push 資料饋送皆以價格饋送合約的形式部署，該合約實作了 Chainlink 的 Aggregator 介面。 您可以呼叫 `latestRoundData()` 來讀取最新價格。

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

請傳入您所需資產的饋送網址（請參閱下表）。 請務必驗證 `updatedAt`，並根據您所採用協議的資料新鮮度要求對資料進行四捨五入。

## Kaia 的動態

### 主網（鏈 ID 8217）

| 動態      | 地址                                                                                                                     | 《偏差／心跳》                      |
| ------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| BTC     | [`0x6AEE1334b4053B0148907649D447557560CC8126`](https://kaiascan.io/account/0x6AEE1334b4053B0148907649D447557560CC8126) | 0.5% / 6 小時  |
| ETH     | [`0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD`](https://kaiascan.io/account/0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD) | 0.5% / 6 小時  |
| USDT    | [`0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A`](https://kaiascan.io/account/0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A) | 0.5% / 6 小時  |
| KAIA    | [`0xa2F3430ac9cfc37aEF88449DADf36af676211A64`](https://kaiascan.io/account/0xa2F3430ac9cfc37aEF88449DADf36af676211A64) | 0.1% / 12 小時 |
| 賺取 USDT | [`0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71`](https://kaiascan.io/account/0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71) | 0.1% / 12 小時 |
| stKAIA  | [`0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7`](https://kaiascan.io/account/0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7) | 0.1% / 12 小時 |

### Kairos 測試網（鏈 ID 1001）

| 動態   | 地址                                                                                                                            | 《偏差／心跳》                     |
| ---- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| USDT | [`0x13d3B27c7C100621CB3B714deAb858Ee06d41db1`](https://kairos.kaiascan.io/account/0x13d3B27c7C100621CB3B714deAb858Ee06d41db1) | 0.5% / 6 小時 |

飼料的供應狀況及相關參數可能會有所變動。 請在 [Push Feeds 使用者介面](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true) 中確認最新的網址及更新條件。

## 資源

- [RedStone 文件 — 推送模型](https://docs.redstone.finance/docs/dapps/redstone-push/)
- [推播動態 UI (Kaia)](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true)
- [RedStone 網站](https://redstone.finance/)
- [Twitter / X](https://x.com/redstone_defi)
