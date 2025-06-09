# kaia用のWeb3.jsエクステンション

[Web3.js Extension for kaia](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext)を提供しています：

- Drop-in replacement to `new Web3(...)` that supports both Ethereum and kaia transaction types involving AccountKey and TxTypes. 詳しくは[Web3オブジェクトの修正](#modifications-to-the-web3-object)の項を参照。

## インストール

> **_NOTE:_**
> @kaiachain/web3js-ext@^1.2.0では、ESモジュールの解決に問題がある場合、ノード22以降を推奨しています。

### Node.js

- インストール
  ```sh
  npm install --save @kaiachain/web3js-ext
  ```
- ESMまたはTypeScript
  ```ts
  import { Web3 } from "@kaiachain/web3js-ext";
  const web3 = new Web3("https://public-en-kairos.node.kaia.io");
  ```
- コモンJS
  ```js
  const { Web3 } = require("@kaiachain/web3js-ext");
  const web3 = new Web3("https://public-en-kairos.node.kaia.io");
  ```

### ブラウザ

本番環境でCDNを使用することは推奨されませんが、迅速なプロトタイピングのために以下を使用することができます。

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/web3js-ext@latest/dist/web3js-ext.bundle.js"></script>
<script>
const web3 = new web3_ext.Web3(window.klaytn);
</script>
```

## 使用方法

example](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext/example)と[test](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext/test)を参照のこと。

## Web3オブジェクトの修正

ソースコードの構成については[DESIGN](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/DESIGN.md)を参照のこと。

### アカウント

- 以下の関数は Klaytn TxTypes を扱うことができる。 src/accounts/index.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/accounts/index.ts) を参照。

  ```js
  // アカウントに依存しない関数
  web3.eth.accounts.recoverTransaction(rlp)
  web3.eth.accounts.signTransaction(obj or rlp)
  web3.eth.accounts.signTransactionAsFeePayer(obj or rlp)

  // アカウントに依存する関数
  var account = web3.web3.eth.accounts.create()
  var account = web3.eth.accounts.privateKeyToAccount(priv)
  var account = web3.eth.accounts.decrypt(keystore)
  account.signTransaction(obj or rlp)
  account.signTransactionAsFeePayer(obj or rlp)
  ```

- 以下の関数は、[KIP-3 Klaytn keystore format v4](https://kips.kaia.io/KIPs/kip-3) を扱うことができます。

  ```js
  web3.eth.accounts.decrypt(keystore)
  web3.eth.accounts.decryptList(keystore)
  ```

### Eth RPCラッパー

- 以下の関数は異なる RPC を呼び出し、Klaytn TxTypes を処理する。 src/eth/index.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/eth/index.ts) を参照。
  ```js
  // try klay_protocolVersion, falls back to eth_protocolVersion
  web3.eth.getProtocolVersion()

  // klay_sendTransaction if Klaytn TxType, otherwise eth_sendTransaction
  // Kaikas互換性のための追加処理
  web3.eth.sendTransaction(obj) // klay_sendRawTransaction if Klaytn TxType, otherwise eth_sendRawTransaction web3.eth.sendRawTransaction if Klaytn TxType, otherwise eth_sendRawTransactionsendTransaction(obj)

  // klay_sendRawTransaction if Klaytn TxType, otherwise eth_sendRawTransaction
  web3.eth.sendSignedTransaction(rlp)

  // klay_signTransaction if Klaytn TxType, otherwise eth_signTransaction
  // Kaikas互換性のための追加処理
  web3.eth.signTransaction(obj)
  ```

### クレイトンRPC

- 以下の関数は Klaytn RPC を呼び出します。 src/web3.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/web3.ts) を参照。

  ```js
  web3.klay.blockNumber() // klay_blockNumber
  web3.net.networkID() // net_networkID
  ```