# 用於 Kaia 的 Ethers.js 擴展

[Ethers.js Extension for Kaia](https://github.com/kaiachain/kaia-sdk/tree/main/ethers-ext) 提供：

- 以太坊錢包的直接替代品，可處理以太坊和 Kaia 交易類型
  ，涉及 AccountKey 和 TxTypes。
- 可直接替代 `ethers.providers.JsonRpcProvider` ，提供對以太坊 RPC 和
  Kaia 特定 RPC 的訪問。
- 可直接取代 `ethers.Web3Provider` 以同時使用 MetaMask (`window.ethereum`) 和 Kaikas (`window.klaytn`)

## ethers v6 注意事項

`@kaiachain/ethers-ext` 同時支持 ethers v5 和 v6。 不過，您需要使用為每個 `ethers` 版本指定的正確軟件包。 因此，ethers v5 必須與 `@kaiachain/ethers-ext/v5` 中的軟件包一起使用，而 ethers v6 只能與 `@kaiachain/ethers-ext/v6`兼容。

> **_NOTE:_**
> 如果導入路徑沒有版本子路徑（`@kaiachain/ethers-ext`），則默認使用 ethers v5。

> **_NOTE:_**
> @kaiachain/ethers-ext@^1.2.0 如果您有 ES 模組解析的問題，建議使用節點 22 或更新的版本。

- **不可以**：將 ethers v6 和 ethers-ext 混合用於 ethers v5

  ```js
  const ethers = require("ethers"); // ethers v6
  const { Wallet } = require("@kaiachain/ethers-ext/v5");

  const provider = new ethers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **可以**\*：與ethers v5 一起使用

  ```js
  const ethers = require("ethers"); // ethers v5
  const { Wallet } = require("@kaiachain/ethers-ext/v5");

  const provider = new ethers.providers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **可以**\*：與ethers v6 一起使用

  ```js
  const ethers = require("ethers"); // ethers v6
  const { Wallet } = require("@kaiachain/ethers-ext/v6");

  const provider = new ethers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **可以**\*：僅使ethers-ext

  ```js
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext/v5");
  // or
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext/v6");

  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```

## 安裝

### Node.js

- 安裝
  ```sh
  npm install --save @kaiachain/ethers-ext ethers@5 # or ethers@6
  ```

- ESM 或 TypeScript

  ```ts
  import { Wallet, JsonRpcProvider } from "@kaiachain/ethers-ext";

  // esm
  // v5
  import { v5 } from "@kaiachain/ethers-ext";
  const { Wallet, JsonRpcProvider } = v5;
  // v6 
  import { v6 } from "@kaiachain/ethers-ext";
  const { Wallet, JsonRpcProvider } = v6;

  // esm subpath import. If using typescript, add "moduleResolution": "nodenext" to tsconfig.json
  // v5
  import { Wallet, JsonRpcProvider } from "@kaiachain/ethers-ext/v5";
  // v6
  import { Wallet, JsonRpcProvider } from "@kaiachain/ethers-ext/v6";

  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```

- CommonJS

  ```js
  // v5
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext");
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext").v5;
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext/v5");
  // v6
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext").v6;
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext/v6");

  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```

### 瀏覽器：

不建議在生產中使用 CDN，但可以在下面使用 CDN 進行快速原型開發。 醚 v5 使用 `ethers-ext.buldle.js` ，醚 v6 使用`ethers-ext.v6.bundle.js`。

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/ethers-ext@latest/dist/ethers-ext.bundle.js"></script>
<script>
  const provider = new ethers_ext.providers.Web3Provider(window.klaytn);
</script>
```

## 用途

請參閱 [example](https://github.com/kaiachain/kaia-sdk/tree/main/ethers-ext/example) 和 [test](https://github.com/kaiachain/kaia-sdk/tree/main/ethers-ext/test)。