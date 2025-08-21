# Kaia 的 Viem 延伸

Kaia 的 Viem Extension 提供：

 - 支援 Ethereum 和 kaia 交易類型。
 - 可與 MetaMask (`window.ethereum`)和 Kaikas (`window.klaytn`)搭配使用

## 安裝

> **_NOTE:_**
> @kaiachain/viem-ext@^2.0.5 如果您在 ES 模組解析上遇到問題，建議使用節點 20 或更新的版本。

### Node.js

 - 安裝
    ```sh
    npm install --save @kaiachain/viem-ext
    ```
 - ESM 或 TypeScript
    ```ts
    import { http, createPublicClient, kairos } from "@kaiachain/viem-ext";
    const publicClient = createPublicClient({
        chain: kairos,
        transport: http(),
    })
    ```
 - CommonJS
    ```js
    const { http, createPublicClient, kairos } = require("@kaiachain/viem-ext");
    const publicClient = createPublicClient({
        chain: kairos,
        transport: http(),
    })
    ```

## 使用方式

請參閱 [example](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext/examples) 和 [test](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext/tests)。