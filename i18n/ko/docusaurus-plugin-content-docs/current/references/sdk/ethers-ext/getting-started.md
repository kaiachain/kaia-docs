# Ethers.js Extension for Kaia

[Kaia용 Ethers.js 확장](https://github.com/kaiachain/kaia-sdk/tree/main/ethers-ext)을 제공합니다:

- Drop-in replacement to `ethers.Wallet` that handles both Ethereum and Kaia transaction types
  involving AccountKey and TxTypes.
- Drop-in replacement to `ethers.providers.JsonRpcProvider` that provides accesses to both Ethereum RPCs and
  Kaia-specific RPCs.
- 메타마스크(`window.ethereum`)와 카이카스(`window.klaytn`) 모두에서 작동하도록 `ethers.Web3Provider`로 드롭인 대체.

## Note for ethers v6

`@kaiachain/ethers-ext` supports both ethers v5 and v6. However, you need to use the right packages which are specified for each `ethers` version. So ethers v5 must be used with packages from `@kaiachain/ethers-ext/v5` and ethers v6 is only compatible with `@kaiachain/ethers-ext/v6`.

> **_NOTE:_**
> If the import path has no version sub-path (`@kaiachain/ethers-ext`), ethers v5 will be used by default.

> **참고:_**
> @kaiachain/ethers-ext@^1.2.0 ES 모듈 해결에 문제가 있는 경우 노드 22 이상을 권장합니다.

- **Don't**: Mixing ethers v6 and ethers-ext for ethers v5

  ```js
  const ethers = require("ethers"); // ethers v6
  const { Wallet } = require("@kaiachain/ethers-ext/v5");

  const provider = new ethers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **Do**: Using with ethers v5

  ```js
  const ethers = require("ethers"); // ethers v5
  const { Wallet } = require("@kaiachain/ethers-ext/v5");

  const provider = new ethers.providers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **Do**: Using with ethers v6

  ```js
  const ethers = require("ethers"); // ethers v6
  const { Wallet } = require("@kaiachain/ethers-ext/v6");

  const provider = new ethers.JsonRpcProvider(
    "https://public-en-kairos.node.kaia.io"
  );
  const wallet = new Wallet("<private key>", provider);
  ```

- **Do**: Using ethers-ext only

  ```js
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext/v5");
  // or
  const { Wallet, JsonRpcProvider } = require("@kaiachain/ethers-ext/v6");

  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const wallet = new Wallet("<private key>", provider);
  ```

## Install

### Node.js

- Install
  ```sh
  npm install --save @kaiachain/ethers-ext ethers@5 # or ethers@6
  ```

- ESM or TypeScript

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

### Browser

It is not recommended to use CDNs in production, But you can use below for quick prototyping. using `ethers-ext.buldle.js` for ethers v5 and `ethers-ext.v6.bundle.js` for ethers v6

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/ethers-ext@latest/dist/ethers-ext.bundle.js"></script>
<script>
  const provider = new ethers_ext.providers.Web3Provider(window.klaytn);
</script>
```

## Usage

예제](https://github.com/kaiachain/kaia-sdk/tree/main/ethers-ext/example) 및 [테스트](https://github.com/kaiachain/kaia-sdk/tree/main/ethers-ext/test)를 참조하세요.