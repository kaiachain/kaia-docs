# kaia 的 Web3.js 扩展

kaia 提供的 Web3.js 扩展：

- 可直接替代 `new Web3(...)`，支持涉及 AccountKey 和 TxTypes 的以太坊和 kaia 交易类型。 详见[修改 Web3 对象]（#modifications-to-the-web3-object）部分

## 安装

### Node.js

- 安装
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

### 浏览器

不建议在生产中使用 CDN，但可以在下面使用 CDN 进行快速原型开发。

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/web3js-ext@latest/dist/web3js-ext.bundle.js"></script>
<script>
const web3 = new web3_ext.Web3(window.klaytn);
</script>
```

### 帐户

- 以下函数可以处理 kaia TxType。 参见 [src/account/index.ts](./src/account/index.ts)
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
- 以下函数可以处理 [KIP-3 kaia 密钥存储格式 v4](https://kips.kaia.io/KIPs/kip-3)
  ```js
  web3.eth.accounts.decrypt(keystore)
  web3.eth.accounts.decryptList(keystore)
  ```

### Eth RPC 封装程序

- 以下函数调用不同的 RPC，并处理 kaia TxType。 参见 [src/eth/index.ts](./src/eth/index.ts)
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

- 以下函数调用 kaia RPC。 参见 [src/web3.ts](./src/web3.ts)
  ```js
  web3.klay.blockNumber() // klay_blockNumber
  web3.net.networkID() // net_networkID
  ```
