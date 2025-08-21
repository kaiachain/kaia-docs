# カイアのヴィエム・エクステンション

カイアのヴィーム・エクステンションが提案する：

 - イーサリアムとカイアの両方のトランザクションタイプをサポート。
 - MetaMask (`window.ethereum`) と Kaikas (`window.klaytn`) の両方で動作する。

## インストール

> **_NOTE:_**
> @kaiachain/viem-ext@^2.0.5では、ESモジュールの解決に問題がある場合、ノード20以降を推奨しています。

### Node.js

 - インストール
    ```sh
    npm install --save @kaiachain/viem-ext
    ```
 - ESMまたはTypeScript
    ```ts
    import { http, createPublicClient, kairos } from "@kaiachain/viem-ext";
    const publicClient = createPublicClient({
        chain: kairos,
        transport: http(),
    })
    ```
 - コモンJS
    ```js
    const { http, createPublicClient, kairos } = require("@kaiachain/viem-ext");
    const publicClient = createPublicClient({
        chain: kairos,
        transport: http(),
    })
    ```

## 使用方法

example](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext/examples)と[test](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext/tests)を参照のこと。