# Kaia용 Viem 확장 프로그램

Kaia용 Viem 확장 프로그램 제공:

- 이더리움과 Kaia 거래 유형을 모두 지원합니다.
- 메타마스크(`window.ethereum`)와 카이카스(`window.klaytn`) 모두에서 작업하세요.

## 설치

> **참고:_**
> @kaiachain/viem-ext@^2.0.5 ES 모듈 해결에 문제가 있는 경우 노드 20 이상을 권장합니다.

### Node.js

- 설치
    ```sh
    npm install --save @kaiachain/viem-ext
    ```
- ESM 또는 TypeScript
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

## 사용법

예제](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext/examples) 및 [테스트](https://github.com/kaiachain/kaia-sdk/tree/main/viem-ext/tests)를 참조하세요.