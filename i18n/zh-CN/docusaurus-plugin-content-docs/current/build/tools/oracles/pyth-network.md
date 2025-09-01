# Pyth 网络

![](/img/banners/kaia-pyth.png)

## 概述

Pyth 网络](https://pyth.network/) 是最大的甲骨文第一方网络之一，提供[大量连锁店](https://docs.pyth.network/price-feeds/contract-addresses) 的实时数据。

该网络由全球[最大的交易所、做市商和金融服务提供商]组成(https://pyth.network/publishers)。 这些数据在链上发布专有数据，供智能合约应用程序汇总和分发。

## 使用 Pyth 网络

Pyth 引入了创新的低延迟[拉动式甲骨文设计](https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand)，用户可以在需要时拉动链上的价格更新，使链上环境中的每个人都能最高效地访问该数据点。 Pyth 网络每**400毫秒**更新一次价格，使 Pyth 成为速度最快的链上算子之一。

Kaia 上的开发人员可以无权限地访问股票、ETF、商品、外汇货币对和加密货币的任何 [Pyth's price feeds](https://pyth.network/developers/price-feed-ids)。

下面是一个在 Kaia 网络上获取 ETH/USD 最新价格的合约示例。
您必须通过[Pyth 的合约地址](https://docs.pyth.network/price-feeds/contract-addresses/evm) 获取 Kaia 主网/主网的信息，并通过所需的[price feed id](https://pyth.network/developers/price-feed-ids)获取最新价格。

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

在这里，你可以从我们的[`Hermes`](https://hermes.pyth.network/docs/)获取`updateData`，它监听 Pythnet 和 Wormhole 以获取价格更新；或者你也可以使用[`pyth-evm-js`](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/sdk/js/src/EvmPriceServiceConnection.ts#L15) SDK。 查看 [如何获取价格更新](https://docs.pyth.network/price-feeds/fetch-price-updates) 获取最新数据。

该[软件包](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity) 提供了使用 Solidity 从 Pyth 网络甲骨文中获取价格的实用工具。 此外，它还包含[Pyth Interface ABI](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/sdk/solidity/abis/IPyth.json)，您可以在库中使用它与 Pyth 合约通信。

我们建议在使用 Pyth 数据时遵循 [用户最佳实践](https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices)。

更多信息，请查阅官方 [Pyth 文档](https://docs.pyth.network/price-feeds)。 有关与 Pyth 智能合约交互的各种功能的详细信息，请参见[API 参考部分](https://api-reference.pyth.network/price-feeds/evm/getPrice)。

## Pyth on Kaia

Pyth Network 智能合约可在以下地址获取：

- 主网：[0x2880ab155794e7179c9ee2e38200202908c17b43](https://kaiascan.io/account/0x2880aB155794e7179c9eE2e38200202908C17B43)
- Kairos Testnet：[0x2880ab155794e7179c9ee2e38200202908c17b43](https://kairos.kaiascan.io/account/0x2880aB155794e7179c9eE2e38200202908C17B43)

此外，单击可访问 [Pyth 价格-进价 ID](https://pyth.network/developers/price-feed-ids)。

## 将 Pyth 用作 PUSH Oracle

Pyth Oracle 可用作推送甲骨文，通过运行一个调度程序来更新后台的价格。 它将确保您的 dapp 根据您的配置更新最新价格。 查看开源 [price pusher](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/price_pusher) 应用程序，开始使用调度程序。

## 开发商和社区

Pyth 网络为开发人员提供了更多工具，如 [TradingView Integration](https://docs.pyth.network/guides/how-to-create-tradingview-charts) 或 [Gelato web3 functions](https://docs.pyth.network/guides/how-to-schedule-price-updates-with-gelato) 等。

查看以下链接，开始使用 Pyth。

- [Pyth EVM 集成指南](https://docs.pyth.network/price-feeds/use-real-time-data/evm)
- [Pyth文档](https://docs.pyth.network/home)
- [Pyth API 参考](https://api-reference.pyth.network/price-feeds/evm/getPrice)
- [Pyth 示例](https://github.com/pyth-network/pyth-examples)
- [Pyth Price Feed Ids](https://pyth.network/developers/price-feed-ids)
- [Website](https://pyth.network/)
- [Twitter](https://x.com/PythNetwork)