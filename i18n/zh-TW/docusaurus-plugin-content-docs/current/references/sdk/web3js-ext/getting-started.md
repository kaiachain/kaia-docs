# kaia 的 Web3.js 擴展

kaia 提供的 Web3.js 擴展：

- 可直接替代 `new Web3(...)`，支持涉及 AccountKey 和 TxTypes 的以太坊和 kaia 交易類型。 詳見[修改 Web3 對象]（#modifications-to-the-web3-object）部分

## 安裝

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

## 使用情況

請參閱 [example](./example) 和 [test](./test) 。

## 修改 Web3 對象

有關源代碼組織，請參見 [DESIGN]（./DESIGN.md）。

### 帳戶

- 以下函數可以處理 kaia TxType。 參見 [src/account/index.ts](./src/account/index.ts)
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
- 以下函數可以處理 [KIP-3 kaia 密鑰存儲格式 v4](https://kips.kaia.io/KIPs/kip-3)
  ```js
  web3.eth.accounts.decrypt(keystore)
  web3.eth.accounts.decryptList(keystore)
  ```

### Eth RPC 封裝程序

- 以下函數調用不同的 RPC，並處理 kaia TxType。 參見 [src/eth/index.ts](./src/eth/index.ts)
  ```js
  // Try klay_protocolVersion, falls back to eth_protocolVersion
  web3.eth.getProtocolVersion()

  // klay_sendTransaction if kaia TxType, otherwise eth_sendTransaction
  // Additional treatment for Kaia Wallet compatibility
  web3.eth.sendTransaction(obj)

  // klay_sendRawTransaction if kaia TxType, otherwise eth_sendRawTransaction
  web3.eth.sendSignedTransaction(rlp)

  // klay_signTransaction if kaia TxType, otherwise eth_signTransaction
  // Additional treatment for Kaia Wallet compatibility
  web3.eth.signTransaction(obj)
  ```

### kaia RPC

- 以下函數調用 kaia RPC。 參見 [src/web3.ts](./src/web3.ts)
  ```js
  web3.klay.blockNumber() // klay_blockNumber
  web3.net.networkID() // net_networkID
  ```
