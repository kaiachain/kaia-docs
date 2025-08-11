# 5. API＆SDKリファレンス

## 5.1. SDK

GAの機能は、ethers.jsとweb3.jsの機能を拡張する`-ext`SDKの中にカプセル化されている。 APIリファレンスの詳細については、リポジトリを参照してください。

### カイア イーサネットSDK

- レポ[GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/ethers-ext)
- コード例：[gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/gasless/gasless.js)
- [チュートリアル付きコード例](https://docs.kaia.io/references/sdk/ethers-ext/v6/gas-abstraction/gasless/)
- 主なメソッド: `gasless.getGaslessSwapRouter`、`gasless.getAmountRepay`、`gasless.getMinAmountOut`、`gasless.getAmountIn`、`gasless.getApproveTx`、`gasless.getSwapTx`。

### カイアWeb3js-ext SDK

- レポ[GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/web3js-ext)
- コード例：[gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/gasless/gasless.js)
- [チュートリアル付きコード例](https://docs.kaia.io/references/sdk/web3js-ext/gas-abstraction/gasless/)
- 主なメソッド: `web3.gasless.getGaslessSwapRouter`、`web3.gasless.getAmountRepay`、`web3.gasless.getMinAmountOut`、`web3.gasless.getAmountIn`、`web3.gasless.getApproveTx`、`web3.gasless.getSwapTx`。

## 5.2. JSON-RPC API

kaia_sendRawTransactions\`は、_typeバイト_がイーサリアムファミリー（0x00 Legacy、0x01 EIP-2930、0x02 EIP-1559、0x04 Blob）のいずれかである、署名されRLPエンコードされたロートランザクションの**配列**を受け取る。  通常のEVMタイプであるGAペア**ApproveTx + SwapTx**に使用する。

0x30\*\* (Smart-Contract Execution)のようなカイア固有の型は、古いシングルxメソッド `klay_sendRawTransaction` でブロードキャストしなければなりません。

典型的な流れ：

1. ビルドして `ApproveTx` + `SwapTx` に署名 → **kaia_sendRawTransactions**\* で送信
2. ユーザーのAppTxを構築して署名 → トランザクションのタイプに応じて**eth_sendRawTransaction**または**klay_sendRawTransaction**で送信

トランザクションはnonceによって順序付けされるため、AppTxは、それが別のエンドポイントを介して送信されたとしても、バンドルの直後に実行される。

送信するトランザクションが1つしかない場合（つまり SwapTx)、いつでも `eth_sendRawTransaction` に戻ることができます。