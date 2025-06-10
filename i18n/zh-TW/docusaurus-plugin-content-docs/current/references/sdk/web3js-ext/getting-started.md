# kaia 的 Web3.js 擴展

[Web3.js Extension for kaia](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext) 提供：

- 可直接替代 `new Web3(...)`，支持涉及 AccountKey 和 TxTypes 的以太坊和 kaia 交易類型。 詳見[修改 Web3 對象]（#modifications-to-the-web3-object）部分

## 安裝

> **_NOTE:_**
> @kaiachain/web3js-ext@^1.2.0 如果您有 ES 模組解析的問題，建議使用 node 22 或更新的版本。

### Node.js

- 安裝
  ```sh
  npm install --save @kaiachain/web3js-ext
  ```
- ESM 或 TypeScript
  ```ts
  import { Web3 } from "@kaiachain/web3js-ext";
  const web3 = new Web3("https://public-en-kairos.node.kaia.io");
  ```
- CommonJS
  ```js
  const { Web3 } = require("@kaiachain/web3js-ext");
  const web3 = new Web3("https://public-en-kairos.node.kaia.io");
  ```

### 瀏覽器

不建議在生產中使用 CDN，但可以在下面使用 CDN 進行快速原型開發。

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/web3js-ext@latest/dist/web3js-ext.bundle.js"></script>
<script>
const web3 = new web3_ext.Web3(window.klaytn);
</script>
```

## 使用方式

請參閱 [example](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext/example) 和 [test](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext/test)。

## 修改 Web3 物件

有關原始碼組織，請參閱 [DESIGN](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/DESIGN.md)。

### 帳戶

- 下列函式可以處理 Klaytn TxTypes。 請參閱 [src/accounts/index.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/accounts/index.ts)

  ```js
  // account independent functions
  web3.eth.accounts.recoverTransaction(rlp)
  web3.eth.accounts.signTransaction(obj or rlp)
  web3.eth.accounts.signTransactionAsFeePayer(obj or rlp)

  // account-bound functions
  var account = web3.eth.accounts.create()
  var account = web3.eth.accounts.privateKeyToAccount(priv)
  var account = web3.eth.accounts.decrypt(keystore)
  account.signTransaction(obj or rlp)
  account.signTransactionAsFeePayer(obj or rlp)
  ```

- 下列函式可以處理 [KIP-3 Klaytn keystore format v4](https://kips.kaia.io/KIPs/kip-3)

  ```js
  web3.eth.accounts.decrypt(keystore)
  web3.eth.accounts.decryptList(keystore)
  ```

### Eth RPC 封裝程序

- 下列函式呼叫不同的 RPC，並處理 Klaytn TxTypes。 請參閱 [src/eth/index.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/eth/index.ts)
  ```js
  // Try klay_protocolVersion, falls back to eth_protocolVersion
  web3.eth.getProtocolVersion()

  // klay_sendTransaction if Klaytn TxType, otherwise eth_sendTransaction
  // 為了與Kaikas相容的額外處理
  web3.eth.sendTransaction(obj) // klay_sendRawTransaction if Klaytn TxType, otherwise eth_sendRawTransaction sendTransaction(obj)

  // klay_sendRawTransaction if Klaytn TxType, otherwise eth_sendRawTransaction
  web3.eth.sendSignedTransaction(rlp)

  // klay_signTransaction if Klaytn TxType, otherwise eth_signTransaction
  // 與 Kaikas 相容的附加處理
  web3.eth.signTransaction(obj)
  ```

### Klaytn RPC

- 下列函式呼叫 Klaytn RPC。 請參閱 [src/web3.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/web3.ts)

  ```js
  web3.klay.blockNumber() // klay_blockNumber
  web3.net.networkID() // net_networkID
  ```