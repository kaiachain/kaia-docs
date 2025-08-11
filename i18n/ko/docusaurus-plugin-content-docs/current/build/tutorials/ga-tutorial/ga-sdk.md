# 5. API 및 SDK 참조

## 5.1. SDK

GA 기능은 `-ext` SDK에 캡슐화되어 있으며, 이는 ethers.js 및 web3.js의 기능을 확장합니다. 자세한 API 참조는 리포지토리를 참조하세요.

### 카이아 이더스-ext SDK

- Repo: [깃허브](https://github.com/kaiachain/kaia-sdk/tree/dev/ethers-ext)
- 코드 예시: [gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/gasless/gasless.js)
- [튜토리얼이 포함된 코드 예시](https://docs.kaia.io/references/sdk/ethers-ext/v6/gas-abstraction/gasless/)
- 주요 메서드: `gasless.getGaslessSwapRouter`, `gasless.getAmountRepay`, `gasless.getMinAmountOut`, `gasless.getAmountIn`, `gasless.getApproveTx`, `gasless.getSwapTx`.

### Kaia Web3js-ext SDK

- Repo: [깃허브](https://github.com/kaiachain/kaia-sdk/tree/dev/web3js-ext)
- 코드 예시: [gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/gasless/gasless.js)
- [튜토리얼이 포함된 코드 예시](https://docs.kaia.io/references/sdk/web3js-ext/gas-abstraction/gasless/)
- 주요 메서드: `web3.gasless.getGaslessSwapRouter`, `web3.gasless.getAmountRepay`, `web3.gasless.getMinAmountOut`, `web3.gasless.getAmountIn`, `web3.gasless.getApproveTx`, `web3.gasless.getSwapTx`.

## 5.2. JSON-RPC API

'kia_sendRawTransactions\`는 _타입 바이트_가 이더리움 계열(0x00 Legacy, 0x01 EIP-2930, 0x02 EIP-1559, 0x04 Blob) 중 하나인 서명된 RLP 인코딩된 원시 트랜잭션의 **어레이**를 받습니다.  일반 EVM 유형인 **ApproveTx + SwapTx** GA 쌍에 사용합니다.

0x30\*\*(스마트 컨트랙트 실행)과 같은 카이아 특정 유형은 여전히 기존 단일 트랜잭션 메서드인 `klay_sendRawTransaction`으로 브로드캐스트해야 합니다.

일반적인 흐름입니다:

1. 승인 트랜잭션`+`스왑 트랜잭션\` 빌드 및 서명 → **kaia_sendRawTransactions**로 보내기
2. 사용자의 AppTx 빌드 및 서명 → 트랜잭션 유형에 따라 **eth_sendRawTransaction** 또는 **klay_sendRawTransaction**으로 전송합니다.

트랜잭션은 논스별로 주문되기 때문에 별도의 엔드포인트를 통해 전송되었더라도 번들 직후에 AppTx가 실행됩니다.

전송할 트랜잭션이 하나만 있는 경우(예 SwapTx)로 되돌아갈 수 있으며, 언제든지 `eth_sendRawTransaction`으로 돌아갈 수 있습니다.