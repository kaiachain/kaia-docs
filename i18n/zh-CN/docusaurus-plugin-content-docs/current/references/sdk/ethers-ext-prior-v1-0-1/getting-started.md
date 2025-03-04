> **_NOTE:_**
> 这个版本将是临时的。
> 请将版本升级到 v1.0.1 以上。 您可以在 ethers v5 或 v6 中使用 ethers-ext，请参阅 [view](/references/sdk/ethers-ext/getting-started/)。

# kaia 的 Ethers.js 扩展

kaia 提供的 Ethers.js 扩展：

- 以太坊钱包的直接替代品，可处理以太坊和 kaia 交易类型
  ，涉及 AccountKey 和 TxTypes。
- 可直接替代 `ethers.providers.JsonRpcProvider` ，提供对以太坊 RPC 和
  kaia 特定 RPC 的访问。
- 可直接替换 `ethers.Web3Provider` 以与 MetaMask（`window.ethereum`）和 Kaia Wallet（`window.klaytn`）一起使用

## ethers v6 注意事项

`@kaiachain/ethers-ext` 是基于 ethers v5 开发的。 因此，ethers v6 类与 ethers-ext 类不兼容。 如果在代码库中使用 ethers v6，请勿将 ethers v6 类与 ethers-ext 类混合使用。 例如，ether v6 JsonRpcProvider 无法提供给 ethers-ext Wallet。

- **请勿**：混合使用 Ethers v6 和 Ethers-ext
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
- **可以**：仅 ethers-ext
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

不建议在生产中使用 CDN，但可以在下面使用 CDN 进行快速原型开发。

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/ethers-ext@latest/dist/ethers-ext.bundle.js"></script>
<script>
const provider = new ethers_ext.providers.Web3Provider(window.klaytn);
</script>
```

## Usage

请参阅 [example](./example) 和 [test](./test) 。