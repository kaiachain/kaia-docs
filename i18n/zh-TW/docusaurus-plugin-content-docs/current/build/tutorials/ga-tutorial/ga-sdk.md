# 5. API & SDK 參考資料

## 5.1. SDK

GA 功能封裝在 `-ext` SDK 中，擴充了 ethers.js 和 web3.js 的功能。 如需詳細的 API 參考資料，請參閱套件庫。

### Kaia Ethers-ext SDK

- Repo：[GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/ethers-ext)
- 程式碼範例：[gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/gasless/gasless.js)
- [Code Example with Tutorial](https://docs.kaia.io/references/sdk/ethers-ext/v6/gas-abstraction/gasless/)
- 關鍵方法： `gasless.getGaslessSwapRouter`、`gasless.getAmountRepay`、`gasless.getMinAmountOut`、`gasless.getAmountIn`、`gasless.getApproveTx`、`gasless.getSwapTx`。

### Kaia Web3js-ext SDK

- Repo：[GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/web3js-ext)
- 程式碼範例：[gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/gasless/gasless.js)
- [Code Example with Tutorial](https://docs.kaia.io/references/sdk/web3js-ext/gas-abstraction/gasless/)
- 關鍵方法： `web3.gasless.getGaslessSwapRouter`, `web3.gasless.getAmountRepay`, `web3.gasless.getMinAmountOut`, `web3.gasless.getAmountIn`, `web3.gasless.getApproveTx`, `web3.gasless.getSwapTx`.

## 5.2. JSON-RPC API

`kaia_sendRawTransactions` 接受一個**陣列**有簽章、RLP 編碼的原始交易，其 _type byte_ 是 Ethereum 系列之一 (0x00 Legacy、0x01 EIP-2930、0x02 EIP-1559、0x04 Blob)。  將它用於 GA 對 **ApproveTx + SwapTx**，這是一般的 EVM 類型。

Kaia 特有的類型，例如 **0x30**（Smart-Contract Execution）仍必須使用舊的單次傳送方法 `klay_sendRawTransaction` 來傳送。

典型流量：

1. 建立並簽署 `ApproveTx` + `SwapTx` → 使用 **kaia_sendRawTransactions** 傳送
2. 建立並簽署使用者的 AppTx → 根據交易類型，使用 **eth_sendRawTransaction** 或 **klay_sendRawTransaction** 傳送

由於交易是以 nonce 排序，因此 AppTx 會在 bundle 之後執行，即使它是透過另一個端點傳送。

如果您只有一個交易要傳送（即 SwapTx)，您總是可以回到 `eth_sendRawTransaction`。