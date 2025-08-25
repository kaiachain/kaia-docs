# Kaia 的 Viem 扩展模块

Kaia 的 Viem Extension 提供：

 - 支持以太坊和 kaia 交易类型。
 - 与 MetaMask（`window.ethereum`）和 Kaikas（`window.klaytn`）协同工作

## 安装

> **_NOTE:_**
> @kaiachain/viem-ext@^2.0.5 建议，如果您在 ES 模块分辨率方面遇到问题，请使用节点 20 或更高版本。

### Node.js

 - 安装
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

## 使用方法

请参见 [example](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext/examples) 和 [test](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext/tests) 。