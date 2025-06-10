# 用于 Kaia 的 Ethers.js 扩展

[Ethers.js Extension for Kaia](https://github.com/kaiachain/kaia-sdk/tree/main/ethers-ext) 提供：

- 以太坊钱包的直接替代品，可处理以太坊和 Kaia 交易类型
  ，涉及 AccountKey 和 TxTypes。
- 可直接替代 `ethers.providers.JsonRpcProvider` ，提供对以太坊 RPC 和
  Kaia 特定 RPC 的访问。
- 可直接替换 `ethers.Web3Provider` 以与 MetaMask（`window.ethereum`）和 Kaikas（`window.klaytn`）一起使用

## ethers v6 注意事项

`@kaiachain/ethers-ext` 同时支持 ethers v5 和 v6。 不过，您需要使用为每个 `ethers` 版本指定的正确软件包。 因此，ethers v5 必须与 `@kaiachain/ethers-ext/v5` 中的软件包一起使用，而 ethers v6 只能与 `@kaiachain/ethers-ext/v6`兼容。

> **_NOTE:_**
> 如果导入路径没有版本子路径（`@kaiachain/ethers-ext`），则默认使用 ethers v5。

> **_NOTE:_**
> @kaiachain/ethers-ext@^1.2.0 建议，如果您在 ES 模块解析方面遇到问题，请使用节点 22 或更高版本。

- **不可以**：将 ethers v6 和 ethers-ext 混合用于 ethers v5

  ```js
  const ethers = require("ethers"); // ethers v6
  const { Wallet } = require("@kaiachain/ethers-ext/v5");

  const provider = new ethers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **可以**\*：与ethers v5 一起使用

  ```js
  const ethers = require("ethers"); // ethers v5
  const { Wallet } = require("@kaiachain/ethers-ext/v5");

  const provider = new ethers.providers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **可以**\*：与ethers v6 一起使用

  ```js
  const ethers = require("ethers"); // ethers v6
  const { Wallet } = require("@kaiachain/ethers-ext/v6");

  const provider = new ethers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **可以**\*：仅使ethers-ext

  ```js
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext/v5");
  // or
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext/v6");

  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```

## 安装

### Node.js

- 安装
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

### 浏览器：

不建议在生产中使用 CDN，但可以在下面使用 CDN 进行快速原型开发。 醚 v5 使用 `ethers-ext.buldle.js` ，醚 v6 使用`ethers-ext.v6.bundle.js`。

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/ethers-ext@latest/dist/ethers-ext.bundle.js"></script>
<script>
  const provider = new ethers_ext.providers.Web3Provider(window.klaytn);
</script>
```

## 用途

请参见 [example](https://github.com/kaiachain/kaia-sdk/tree/main/ethers-ext/example) 和 [test](https://github.com/kaiachain/kaia-sdk/tree/main/ethers-ext/test) 。