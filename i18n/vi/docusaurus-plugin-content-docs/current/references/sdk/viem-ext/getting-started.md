# Viem Extension cho Kaia

Tiện ích mở rộng Viem dành cho Kaia cung cấp:

- Hỗ trợ cả loại giao dịch Ethereum và kaia.
- Làm việc với cả MetaMask (`window.ethereum`) và Kaikas (`window.klaytn`)

## Cài đặt

> **_LƯU Ý:_**
> @kaiachain/viem-ext@^2.0.5 khuyến nghị sử dụng node 20 trở lên nếu bạn gặp sự cố với độ phân giải của ES Module.

### Node.js

- Cài đặt
    ```sh
    npm install --save @kaiachain/viem-ext
    ```
- ESM hoặc TypeScript
    ```ts
    import { http, createPublicClient, kairos } from "@kaiachain/viem-ext";
    const publicClient = createPublicClient({
        chain: kairos,
        transport: http(),
    })
    ```
- ChungJS
    ```js
    const { http, createPublicClient, kairos } = require("@kaiachain/viem-ext");
    const publicClient = createPublicClient({
        chain: kairos,
        transport: http(),
    })
    ```

## Cách sử dụng

Xem [ví dụ](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext/examples) và [kiểm tra](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext/tests).