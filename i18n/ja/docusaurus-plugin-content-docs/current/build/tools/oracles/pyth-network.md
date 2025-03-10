# Pyth Network

![](/img/banners/kaia-pyth.png)

## 概要

Pyth Network](https://pyth.network/)は最大級のファーストパーティ・オラクル・ネットワークで、[膨大な数のチェーン](https://docs.pyth.network/price-feeds/contract-addresses)にリアルタイム・データを配信している。

このネットワークは、世界最大級の[取引所、マーケットメーカー、金融サービスプロバイダー]で構成されている(https://pyth.network/publishers)。 これらは、スマート・コントラクト・アプリケーションに集計・配信するために、独自のデータをチェーン上で公開する。

## Pyth Networkを使う

Pythは革新的な低レイテンシー[プルオラクルデザイン](https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand)を導入しており、ユーザーは必要なときにオンチェーンで価格更新をプルすることができ、オンチェーン環境にいる全員が最も効率的にそのデータポイントにアクセスすることができる。  Pythネットワークは**400ms**ごとに価格を更新し、Pythを最速のオンチェーンオークルの1つにしています。

カイアの開発者は、株式、ETF、コモディティ、外国為替ペア、暗号通貨の[Pyth's price feeds](https://pyth.network/developers/price-feed-ids)のいずれにも無許可でアクセスできます。

以下は、Kaiaネットワーク上のETH/USDの最新価格をフェッチするコントラクトの動作例です。
最新の価格を取得するには、カイアのメインネット/テストネット用の [Pyth の契約アドレス](https://docs.pyth.network/price-feeds/contract-addresses/evm)と、希望の [価格フィード ID](https://pyth.network/developers/price-feed-ids)を渡す必要があります。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract MyFirstPythContract {
    IPyth pyth;

    constructor(address _pyth) {
        pyth = IPyth(_pyth);
    }

    function fetchPrice(
        bytes[] calldata updateData,
        bytes32 priceFeed
    ) public payable returns (int64) {
		    // Fetch the priceUpdate from hermes.
        uint updateFee = pyth.getUpdateFee(updateData);
        pyth.updatePriceFeeds{value: updateFee}(updateData);

        // Fetch the latest price
        PythStructs.Price memory price = pyth.getPrice(priceFeed);
        return price.price;
    }
}
```

ここでは、価格更新のためにPythnetとWormholeをリッスンする[`Hermes`](https://hermes.pyth.network/docs/)から`updateData`を取得することができます。また、[`pyth-evm-js`](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/sdk/js/src/EvmPriceServiceConnection.ts#L15)のSDKを使用することもできます。  価格更新の取得方法](https://docs.pyth.network/price-feeds/fetch-price-updates)を確認し、最新のデータを取得してください。

この[パッケージ](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity)は、Solidityを使用してPythネットワークオラクルから価格を消費するためのユーティリティを提供します。 また、[Pyth Interface ABI](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/sdk/solidity/abis/IPyth.json)も含まれており、Pythコントラクトと通信するためにライブラリで使用することができます。 また、[Pyth Interface ABI](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/sdk/solidity/abis/IPyth.json)も含まれており、Pythコントラクトと通信するためにライブラリで使用することができます。

Pyth データを利用する際には、[consumer best practices](https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices)に従うことを推奨します。

詳しくは公式の[Pyth documentation](https://docs.pyth.network/price-feeds)を参照してください。 詳しくは公式の[Pyth documentation](https://docs.pyth.network/price-feeds)を参照してください。 Pythスマートコントラクトとやりとりするために利用できるさまざまな関数については、[APIリファレンスセクション](https://api-reference.pyth.network/price-feeds/evm/getPrice)に詳細があります。

## カイアのPyth

Pyth Networkのスマートコントラクトは以下のアドレスで入手できる：

- メインネット[0x2880ab155794e7179c9ee2e38200202908c17b43](https://kaiascan.io/account/0x2880aB155794e7179c9eE2e38200202908C17B43)
- Kairos テストネット[0x2880ab155794e7179c9ee2e38200202908c17b43](https://kairos.kaiascan.io/account/0x2880aB155794e7179c9eE2e38200202908C17B43)

さらに、クリックすると[Pyth price-feed IDs](https://pyth.network/developers/price-feed-ids)にアクセスできる。

## PythをPUSHオラクルとして使う

Pythオラクルは、バックエンドの価格を更新するスケジューラを実行することで、プッシュオラクルとして使用することができる。 これは、あなたのダップがあなたの設定に従って最新の価格で更新されることを保証します。 スケジューラを始めるには、オープンソースの[price pusher](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/price_pusher)アプリをチェックしよう。 これは、あなたのダップがあなたの設定に従って最新の価格で更新されることを保証します。 スケジューラを始めるには、オープンソースの[price pusher](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/price_pusher)アプリをチェックしよう。

## 開発者とコミュニティ

Pythネットワークは、[TradingView Integration](https://docs.pyth.network/guides/how-to-create-tradingview-charts)や[Gelato web3 functions](https://docs.pyth.network/guides/how-to-schedule-price-updates-with-gelato)のような追加ツールを開発者に提供しています。

Pythを始めるには以下のリンクをチェックしてください。

- [Pyth EVM 統合ガイド](https://docs.pyth.network/price-feeds/use-real-time-data/evm)
- [Pyth Docs](https://docs.pyth.network/home)
- [Pyth APIリファレンス](https://api-reference.pyth.network/price-feeds/evm/getPrice)
- [Pyth Examples](https://github.com/pyth-network/pyth-examples)
- [Pyth Price Feed Ids](https://pyth.network/developers/price-feed-ids)
- [ウェブサイト](https://pyth.network/)
- [ツイッター](https://x.com/PythNetwork)