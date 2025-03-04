> **_NOTE:_**
> このバージョンは一時的なものです。
> バージョンをv1.0.1以上にアップグレードしてください。 ethers-ext は ethers v5 または v6 で使用できます。[view](/references/sdk/ethers-ext/getting-started/) を参照してください。

# kaia用Ethers.jsエクステンション

kaiaのEthers.js拡張機能：

- Ethereumとkaiaの両方のトランザクションタイプを扱う`ethers.Wallet`のドロップイン置き換え
  、AccountKeyとTxTypesを含む。
- Ethers.providers.JsonRpcProvider\` をドロップインで置き換えるもので、Ethereum RPC と
  kaia-specific RPC の両方にアクセスできる。
- MetaMask (`window.ethereum`) と Kaia Wallet (`window.klaytn`) の両方で動作するように `ethers.Web3Provider` をドロップインで置き換える。

## エーテルV6に関する注意事項

`kaiachain/ethers-ext`はethers v5をベースに開発された。 その結果、ethers v6のクラスはethers-extのクラスと互換性がありません。 コードベースでethers v6を使用している場合、ethers v6クラスとethers-extクラスを混在させないでください。 例えば、ethers v6 JsonRpcProviderをethers-ext Walletに提供することはできません。

- **しないでください**：エーテルV6とエーテル・エクステントを混ぜてください。
  ```js
  const ethers = require("ethers");
  const { Wallet } = require("@kaiachain/ethers-ext");

  const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```
- **行う**：エーテルV5とエーテル・エクストを混ぜる。
  ```js
  const ethers = require("ethers");
  const { Wallet } = require("@kaiachain/ethers-ext");

  const provider = new ethers.providers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```
- **する**：エーテル・エクステルのみを使用
  ```js
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext");

  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```

## インストール

### Node.js

- インストール
  ```sh
  npm install --save @kaiachain/ethers-ext ethers@5
  ```
- ESMまたはTypeScript
  ```ts
  import { Wallet, JsonRpcProvider } from "@kaiachain/ethers-ext";
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```
- コモンJS
  ```js
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext");
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```

### ブラウザ

本番環境でCDNを使用することは推奨されませんが、迅速なプロトタイピングのために以下を使用することができます。

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/ethers-ext@latest/dist/ethers-ext.bundle.js"></script>
<script>
const provider = new ethers_ext.providers.Web3Provider(window.klaytn);
</script>
```

## 使用方法

［example](./example)と[test](./test)を参照のこと。