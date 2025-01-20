# kaia用Web3.jsエクステンション

kaiaのWeb3.js拡張機能：

- newWeb3(...)\`のドロップイン置き換えで、AccountKeyとTxTypesを含むEthereumとkaiaの両方のトランザクションタイプをサポートする。 詳しくは[Web3オブジェクトの修正](#modifications-to-the-web3-object)の項を参照。

## インストール

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

example](./example)と[test](./test)を参照のこと。

## Web3オブジェクトの修正

ソースコードの構成については[DESIGN](./DESIGN.md)を参照のこと。

### アカウント

- 以下の関数は kaia TxTypes を扱うことができる。 src/account/index.ts](./src/account/index.ts) を参照。
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
- 以下の関数は、[KIP-3 kaia keystore format v4](https://kips.kaia.io/KIPs/kip-3) を扱うことができます。
  ```js
  web3.eth.accounts.decrypt(keystore)
  web3.eth.accounts.decryptList(keystore)
  ```

### Eth RPCラッパー

- 以下の関数は異なるRPCを呼び出し、カイアTxTypesを処理する。 src/eth/index.ts](./src/eth/index.ts) を参照。
  ```js
  // try klay_protocolVersion, falls back to eth_protocolVersion
  web3.eth.getProtocolVersion()

  // klay_sendTransaction if kaia TxType, otherwise eth_sendTransaction
  // Kaia Wallet互換性のための追加処理
  web3.eth.sendTransaction(obj)

  // klay_sendRawTransaction if kaia TxType, otherwise eth_sendRawTransaction
  web3.eth.sendSignedTransaction(rlp)

  // klay_signTransaction if kaia TxType, otherwise eth_signTransaction
  // Kaia Wallet互換のための追加処理
  web3.eth.signTransaction(obj)
  ```

### カイアRPC

- 以下の関数はkaia RPCを呼び出します。 src/web3.ts](./src/web3.ts) を参照。
  ```js
  web3.klay.blockNumber() // klay_blockNumber
  web3.net.networkID() // net_networkID
  ```
