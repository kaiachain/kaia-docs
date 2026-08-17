# RedStone

## 概要

[RedStone](https://redstone.finance/)は、スマートコントラクトに価格フィードを提供するモジュール式のオラクルネットワークです。 Kaia上では、RedStoneが価格情報をオンチェーンに保存する**Push**フィードを公開しており、dAppはChainlink互換の`AggregatorV3Interface`を使用して、これらを読み取ることができます。

RedStone Pushは、設定可能な**偏差**および**ハートビート**の条件に基づき、オンチェーン価格を定期的に更新します。 詳細については、[RedStone Push ドキュメント](https://docs.redstone.finance/docs/dapps/redstone-push/)をご覧ください。また、[Push Feeds UI](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true)で Kaia のライブフィードを閲覧することもできます。

## KaiaでのRedStoneの使用

各プッシュフィードは、ChainlinkのAggregatorインターフェースを実装した価格フィード契約として展開されます。 `latestRoundData()` を呼び出すと、最新の価格を取得できます。

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

必要なアセットのフィードアドレスを指定してください（以下の表を参照）。 常に `updatedAt` を確認し、プロトコルの最新性要件に基づいてデータを調整してください。

## Kaiaのフィード

### メインネット（チェーンID 8217）

| フィード      | 住所                                                                                                                     | Deviation / Heartbeat       |
| --------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| BTC       | [`0x6AEE1334b4053B0148907649D447557560CC8126`](https://kaiascan.io/account/0x6AEE1334b4053B0148907649D447557560CC8126) | 0.5% / 6時間  |
| ETH       | [`0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD`](https://kaiascan.io/account/0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD) | 0.5% / 6時間  |
| USDT      | [`0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A`](https://kaiascan.io/account/0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A) | 0.5% / 6時間  |
| KAIA      | [`0xa2F3430ac9cfc37aEF88449DADf36af676211A64`](https://kaiascan.io/account/0xa2F3430ac9cfc37aEF88449DADf36af676211A64) | 0.1% / 12時間 |
| USDTを獲得する | [`0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71`](https://kaiascan.io/account/0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71) | 0.1% / 12時間 |
| stKAIA    | [`0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7`](https://kaiascan.io/account/0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7) | 0.1% / 12時間 |

### カイロス・テストネット（チェーンID 1001）

| フィード | 住所                                                                                                                            | Deviation / Heartbeat      |
| ---- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| USDT | [`0x13d3B27c7C100621CB3B714deAb858Ee06d41db1`](https://kairos.kaiascan.io/account/0x13d3B27c7C100621CB3B714deAb858Ee06d41db1) | 0.5% / 6時間 |

フィードの利用状況や設定は変更される場合があります。 [Push Feeds UI](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true)で、最新のアドレスと更新条件を確認してください。

## リソース

- [RedStone Docs — プッシュモデル](https://docs.redstone.finance/docs/dapps/redstone-push/)
- [Push Feeds UI (Kaia)](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true)
- [RedStoneのウェブサイト](https://redstone.finance/)
- [Twitter / X](https://x.com/redstone_defi)
