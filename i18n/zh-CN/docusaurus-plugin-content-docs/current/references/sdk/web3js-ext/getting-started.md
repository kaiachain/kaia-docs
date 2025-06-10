# kaia 的 Web3.js 扩展

[Web3.js Extension for kaia](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext) 提供：

- 可直接替代 `new Web3(...)`，支持涉及 AccountKey 和 TxTypes 的以太坊和 kaia 交易类型。 详见[修改 Web3 对象]（#modifications-to-the-web3-object）部分

## 安装

> **_NOTE:_**
> @kaiachain/web3js-ext@^1.2.0 建议，如果您在 ES 模块解析方面遇到问题，请使用节点 22 或更高版本。

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

## 使用方法

请参见 [example](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext/example) 和 [test](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext/test) 。

## 修改 Web3 对象

有关源代码的组织，请参见 [DESIGN](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/DESIGN.md) 。

### 帐户

- 以下函数可以处理 Klaytn TxType。 参见 [src/accounts/index.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/accounts/index.ts)

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

- 以下函数可以处理[KIP-3 Klaytn 密钥存储格式 v4](https://kips.kaia.io/KIPs/kip-3)

  ```js
  web3.eth.accounts.decrypt(keystore)
  web3.eth.accounts.decryptList(keystore)
  ```

### Eth RPC 封装程序

- 以下函数调用不同的 RPC，并处理 Klaytn TxTypes。 参见 [src/eth/index.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/eth/index.ts)
  ```js
  // 尝试 klay_protocolVersion，否则返回 eth_protocolVersion
  web3.eth.getProtocolVersion()

  // klay_sendTransaction if Klaytn TxType, otherwise eth_sendTransaction
  // 为与 Kaikas 兼容而进行的额外处理
  web3.eth.sendTransaction(obj) // klay_sendRawTransaction if Klaytn TxType, otherwise eth_sendRawTransaction sendTransaction(obj)

  // klay_sendRawTransaction if Klaytn TxType, otherwise eth_sendRawTransaction
  web3.eth.sendSignedTransaction(rlp)

  // klay_signTransaction if Klaytn TxType, otherwise eth_signTransaction
  // 与 Kaikas 兼容的附加处理
  web3.eth.signTransaction(obj)
  ```

### Klaytn RPC

- 以下函数调用 Klaytn RPC。 参见 [src/web3.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/web3.ts)

  ```js
  web3.klay.blockNumber() // klay_blockNumber
  web3.net.networkID() // net_networkID
  ```