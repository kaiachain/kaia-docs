# Pyth 網絡

![](/img/banners/kaia-pyth.png)

## 概述

Pyth 網絡](https://pyth.network/) 是最大的甲骨文第一方網絡之一，提供[大量連鎖店](https://docs.pyth.network/price-feeds/contract-addresses) 的即時數據。

該網絡由全球[最大的交易所、做市商和金融服務提供商]組成(https://pyth.network/publishers)。 這些數據在鏈上發佈專有數據，供智能合約應用程序彙總和分發。

## 使用 Pyth 網絡

Pyth 引入了創新的低延遲[拉動式甲骨文設計](https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand)，用戶可以在需要時拉動鏈上的價格更新，使鏈上環境中的每個人都能最高效地訪問該數據點。 Pyth 網絡每**400毫秒**更新一次價格，使 Pyth 成為速度最快的鏈上算子之一。

Kaia 上的開發人員可以無權限地訪問股票、ETF、商品、外匯貨幣對和加密貨幣的任何 [Pyth's price feeds](https://pyth.network/developers/price-feed-ids)。

下面是一個在 Kaia 網絡上獲取 ETH/USD 最新價格的合約示例。
您必須通過[Pyth 的合約地址](https://docs.pyth.network/price-feeds/contract-addresses/evm) 獲取 Kaia 主網/主網的信息，並通過所需的[price feed id](https://pyth.network/developers/price-feed-ids)獲取最新價格。

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

在這裡，你可以從我們的[`Hermes`](https://hermes.pyth.network/docs/)獲取`updateData`，它監聽 Pythnet 和 Wormhole 以獲取價格更新；或者你也可以使用[`pyth-evm-js`](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/sdk/js/src/EvmPriceServiceConnection.ts#L15) SDK。 查看 [如何獲取價格更新](https://docs.pyth.network/price-feeds/fetch-price-updates) 獲取最新數據。

該[軟件包](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity) 提供了使用 Solidity 從 Pyth 網絡甲骨文中獲取價格的實用工具。 此外，它還包含[Pyth Interface ABI](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/sdk/solidity/abis/IPyth.json)，您可以在庫中使用它與 Pyth 合約通信。

我們建議在使用 Pyth 數據時遵循 [用戶最佳實踐](https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices)。

更多信息，請查閱官方 [Pyth 文檔](https://docs.pyth.network/price-feeds)。 有關與 Pyth 智能合約交互的各種功能的詳細信息，請參見[API 參考部分](https://api-reference.pyth.network/price-feeds/evm/getPrice)。

## Pyth on Kaia

Pyth Network 智能合約可在以下地址獲取：

 - 主網：[0x2880ab155794e7179c9ee2e38200202908c17b43](https://kaiascan.io/account/0x2880aB155794e7179c9eE2e38200202908C17B43)
 - Kairos Testnet：[0x2880ab155794e7179c9ee2e38200202908c17b43](https://kairos.kaiascan.io/account/0x2880aB155794e7179c9eE2e38200202908C17B43)

此外，單擊可訪問 [Pyth 價格-進價 ID](https://pyth.network/developers/price-feed-ids)。

## 將 Pyth 用作 PUSH Oracle

Pyth Oracle 可用作推送甲骨文，通過運行一個調度程序來更新後臺的價格。 它將確保您的 dapp 根據您的配置更新最新價格。 查看開源 [price pusher](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/price_pusher) 應用程序，開始使用調度程序。

## 開發商和社區

Pyth 網絡為開發人員提供了更多工具，如 [TradingView Integration](https://docs.pyth.network/guides/how-to-create-tradingview-charts) 或 [Gelato web3 functions](https://docs.pyth.network/guides/how-to-schedule-price-updates-with-gelato) 等。

查看以下鏈接，開始使用 Pyth。

 - [Pyth EVM 集成指南](https://docs.pyth.network/price-feeds/use-real-time-data/evm)
 - [Pyth文檔](https://docs.pyth.network/home)
 - [Pyth API 參考](https://api-reference.pyth.network/price-feeds/evm/getPrice)
 - [Pyth 示例](https://github.com/pyth-network/pyth-examples)
 - [Pyth Price Feed Ids](https://pyth.network/developers/price-feed-ids)
 - [Website](https://pyth.network/)
 - [Twitter](https://x.com/PythNetwork)