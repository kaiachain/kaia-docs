# 5. 应用程序接口和 SDK 参考

## 5.1. SDK

GA 功能封装在 `-ext` SDK 中，扩展了 ethers.js 和 web3.js 的功能。 有关详细的 API 参考资料，请参阅资源库。

### Kaia Ethers-ext SDK

- Repo：[GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/ethers-ext)
- 代码示例：[gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/gasless/gasless.js)
- [带教程的代码示例](https://docs.kaia.io/references/sdk/ethers-ext/v6/gas-abstraction/gasless/)
- 关键方法： `gasless.getGaslessSwapRouter`、`gasless.getAmountRepay`、`gasless.getMinAmountOut`、`gasless.getAmountIn`、`gasless.getApproveTx`、`gasless.getSwapTx`。

### Kaia Web3js-ext SDK

- Repo：[GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/web3js-ext)
- 代码示例：[gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/gasless/gasless.js)
- [带教程的代码示例](https://docs.kaia.io/references/sdk/web3js-ext/gas-abstraction/gasless/)
- 关键方法： `web3.gasless.getGaslessSwapRouter`, `web3.gasless.getAmountRepay`, `web3.gasless.getMinAmountOut`, `web3.gasless.getAmountIn`, `web3.gasless.getApproveTx`, `web3.gasless.getSwapTx`.

## 5.2. JSON-RPC API

kaia_sendRawTransactions "接受一个**数组**的签名、RLP编码的原始交易，其_类型字节_为以太坊系列之一（0x00 Legacy、0x01 EIP-2930、0x02 EIP-1559、0x04 Blob）。  将其用于 GA 对 **ApproveTx + SwapTx**，这是普通的 EVM 类型。

Kaia 特有的类型，如 **0x30**（智能合约执行），仍必须使用旧的单一传输方法 "klay_sendRawTransaction "进行广播。

典型流量：

1. 构建并签署 `ApproveTx` + `SwapTx` → 使用 **kaia_sendRawTransactions 发送**
2. 创建并签署用户的 AppTx → 根据交易类型使用 **eth_sendRawTransaction** 或 **klay_sendRawTransaction** 发送

由于事务是按 nonce 排序的，因此 AppTx 将紧随 bundle 之后执行，即使它是通过一个单独的端点发送的。

如果您只有一个交易要发送（即 SwapTx)，就可以使用 `eth_sendRawTransaction`。