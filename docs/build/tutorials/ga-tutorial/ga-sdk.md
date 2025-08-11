# 5. API & SDK Reference

## 5.1. SDKs

The GA functionality is encapsulated within the `-ext` SDKs, which extend the functionality of ethers.js and web3.js. For detailed API references, please see the repositories.

### Kaia Ethers-ext SDK

- Repo: [GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/ethers-ext)
- Code Example: [gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/gasless/gasless.js)
- [Code Example with Tutorial](https://docs.kaia.io/references/sdk/ethers-ext/v6/gas-abstraction/gasless/)
- Key Methods: `gasless.getGaslessSwapRouter`, `gasless.getAmountRepay`, `gasless.getMinAmountOut`, `gasless.getAmountIn`, `gasless.getApproveTx`, `gasless.getSwapTx`.

### Kaia Web3js-ext SDK

- Repo: [GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/web3js-ext)
- Code Example: [gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/gasless/gasless.js)
- [Code Example with Tutorial](https://docs.kaia.io/references/sdk/web3js-ext/gas-abstraction/gasless/)
- Key Methods: `web3.gasless.getGaslessSwapRouter`, `web3.gasless.getAmountRepay`, `web3.gasless.getMinAmountOut`, `web3.gasless.getAmountIn`, `web3.gasless.getApproveTx`, `web3.gasless.getSwapTx`.

## 5.2. JSON-RPC API

`kaia_sendRawTransactions` accepts an **array** of signed, RLP-encoded raw transactions whose *type byte* is one of the Ethereum family (0x00 Legacy, 0x01 EIP-2930, 0x02 EIP-1559, 0x04 Blob).  Use it for the GA pair **ApproveTx + SwapTx**, which are ordinary EVM types.

Kaia-specific types such as **0x30** (Smart-Contract Execution) must still be broadcast with the old single-tx method `klay_sendRawTransaction`.

Typical flow:

1. Build and sign `ApproveTx` + `SwapTx` → send with **kaia_sendRawTransactions**  
2. Build and sign the user’s AppTx → send with **eth_sendRawTransaction** or **klay_sendRawTransaction** depending on the transaction type

Because transactions are ordered by nonce, the AppTx will be executed right after the bundle even though it was sent through a separate endpoint.

If you only have one transaction to send (i.e. SwapTx), you can always fall back to `eth_sendRawTransaction`.