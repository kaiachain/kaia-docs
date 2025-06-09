> **_NOTE:_**
> 這個版本將是臨時的。
> 請將版本升級到 v1.0.1 以上。 您可以在 ethers v5 或 v6 中使用 ethers-ext，請參閱 [view](/references/sdk/ethers-ext/getting-started/)。

# kaia 的 Ethers.js 擴展

kaia 提供的 Ethers.js 擴展：

- 以太坊錢包的直接替代品，可處理以太坊和 kaia 交易類型
  ，涉及 AccountKey 和 TxTypes。
- 可直接替代 `ethers.providers.JsonRpcProvider` ，提供對以太坊 RPC 和
  kaia 特定 RPC 的訪問。
- 可直接替換 `ethers.Web3Provider` 以與 MetaMask（`window.ethereum`）和 Kaia Wallet（`window.klaytn`）一起使用

## ethers v6 注意事項

`@kaiachain/ethers-ext` 是基於 ethers v5 開發的。 因此，ethers v6 類與 ethers-ext 類不兼容。 如果在代碼庫中使用 ethers v6，請勿將 ethers v6 類與 ethers-ext 類混合使用。 例如，ether v6 JsonRpcProvider 無法提供給 ethers-ext Wallet。

- **請勿**：混合使用 Ethers v6 和 Ethers-ext
  ```js
  const ethers = require("ethers");
  const { Wallet } = require("@kaiachain/ethers-ext");

  const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```
- **可以**：混合使用ethers v5 和 ethers-ext
  ```js
  const ethers = require("ethers");
  const { Wallet } = require("@kaiachain/ethers-ext");

  const provider = new ethers.providers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```
- **可以**：僅 ethers-ext
  ```js
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext");

  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```

## Install

### Node.js

- Install
  ```sh
  npm install --save @kaiachain/ethers-ext ethers@5
  ```
- ESM 或 TypeScript
  ```ts
  import { Wallet, JsonRpcProvider } from "@kaiachain/ethers-ext";
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```
- CommonJS
  ```js
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext");
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```

### Browser

不建議在生產中使用 CDN，但可以在下面使用 CDN 進行快速原型開發。

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/ethers-ext@latest/dist/ethers-ext.bundle.js"></script>
<script>
const provider = new ethers_ext.providers.Web3Provider(window.klaytn);
</script>
```