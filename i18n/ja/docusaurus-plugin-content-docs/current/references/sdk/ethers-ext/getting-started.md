# カイア用Ethers.jsエクステンション

カイアのEthers.jsエクステンションは提供します：

- EthereumとKaiaの両方のトランザクションタイプを扱う`ethers.Wallet`のドロップイン置き換え
  、AccountKeyとTxTypesを含む。
- `Ethers.providers.JsonRpcProvider` をドロップインで置き換え、Ethereum RPC と
  Kaia 固有の RPC の両方にアクセスできるようにする。
- MetaMask (`window.ethereum`) と Kaia Wallet (`window.klaytn`) の両方で動作するように `ethers.Web3Provider` をドロップインで置き換える。

## エーテルV6に関する注意事項

`kaiachain/ethers-ext`はethers v5とv6の両方をサポートしている。 ただし、各 `ethers` バージョンで指定されている正しいパッケージを使用する必要がある。 そのため、ethers v5は`@kaiachain/ethers-ext/v5`のパッケージと使用する必要があり、ethers v6は`@kaiachain/ethers-ext/v6`とのみ互換性がある。

> **_NOTE:_**
> インポートパスにバージョンのサブパス(`@kaiachain/ethers-ext`)がない場合、ethers v5がデフォルトで使用されます。

- **しないでください**：エーテルV6とエーテル・エクストラをエーテルV5と混合すること。

  ```js
  const ethers = require("ethers"); // ethers v6
  const { Wallet } = require("@kaiachain/ethers-ext/v5");

  const provider = new ethers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **する**：エーテル v5 との併用

  ```js
  const ethers = require("ethers"); // ethers v5
  const { Wallet } = require("@kaiachain/ethers-ext/v5");

  const provider = new ethers.providers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **する**：エーテルv6との併用

  ```js
  const ethers = require("ethers"); // ethers v6
  const { Wallet } = require("@kaiachain/ethers-ext/v6");

  const provider = new ethers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **する**：エーテル・エクステルのみを使用

  ```js
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext/v5");
  // or
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext/v6");

  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```

## インストール

### Node.js

- インストール
  ```sh
  npm install --save @kaiachain/ethers-ext ethers@5 # または ethers@6
  ```

- ESMまたはTypeScript

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

- コモンJS

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

### ブラウザ

本番環境でCDNを使用することは推奨されませんが、迅速なプロトタイピングのために以下を使用することができます。 ethers v5 用の `ethers-ext.buldle.js` と ethers v6 用の `ethers-ext.v6.bundle.js` を使用する。

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/ethers-ext@latest/dist/ethers-ext.bundle.js"></script>
<script>
  const provider = new ethers_ext.providers.Web3Provider(window.klaytn);
</script>
```

## 使用方法

［example](./example)と[test](./test)を参照のこと。
