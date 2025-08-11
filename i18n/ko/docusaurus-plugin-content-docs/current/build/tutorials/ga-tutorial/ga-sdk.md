# 5. API 및 SDK 레퍼런스

## 5.1. SDK

GA 기능은 ethers.js와 web3.js의 기능을 확장하는 `-ext` SDK에 캡슐화되어 있습니다. 자세한 API 레퍼런스는 리포지토리를 참조하세요.

### Kaia Ethers-ext SDK

- 리포지토리: [GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/ethers-ext)
- 코드 예시: [gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/gasless/gasless.js)
- [튜토리얼이 포함된 코드 예시](https://docs.kaia.io/references/sdk/ethers-ext/v6/gas-abstraction/gasless/)
- 주요 메서드: `gasless.getGaslessSwapRouter`, `gasless.getAmountRepay`, `gasless.getMinAmountOut`, `gasless.getAmountIn`, `gasless.getApproveTx`, `gasless.getSwapTx`.

### Kaia Web3js-ext SDK

- 리포지토리: [GitHub](https://github.com/kaiachain/kaia-sdk/tree/dev/web3js-ext)
- 코드 예시: [gasless.js](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/gasless/gasless.js)
- [튜토리얼이 포함된 코드 예시](https://docs.kaia.io/references/sdk/web3js-ext/gas-abstraction/gasless/)
- 주요 메서드: `web3.gasless.getGaslessSwapRouter`, `web3.gasless.getAmountRepay`, `web3.gasless.getMinAmountOut`, `web3.gasless.getAmountIn`, `web3.gasless.getApproveTx`, `web3.gasless.getSwapTx`.

## 5.2. JSON-RPC API

`kaia_sendRawTransactions`는 _type byte_가 이더리움 계열(0x00 Legacy, 0x01 EIP-2930, 0x02 EIP-1559, 0x04 Blob) 중 하나인 서명되고 RLP 인코딩된 원시 트랜잭션의 **배열**을 받습니다.  이를 일반적인 EVM 타입인 GA 쌍 **ApproveTx + SwapTx**에 사용하세요.

**0x30** (Smart-Contract Execution)과 같은 Kaia 특정 타입은 여전히 기존의 단일 tx 메서드인 `klay_sendRawTransaction`으로 브로드캐스트해야 합니다.

일반적인 플로우:

1. `ApproveTx` + `SwapTx`를 구성하고 서명 → **kaia_sendRawTransactions**로 전송
2. 사용자의 AppTx를 구성하고 서명 → 트랜잭션 타입에 따라 **eth_sendRawTransaction** 또는 **klay_sendRawTransaction**으로 전송

트랜잭션은 nonce 순으로 정렬되므로 AppTx는 별도의 엔드포인트를 통해 전송되었더라도 번들 직후에 실행됩니다.

보낼 트랜잭션이 하나뿐인 경우(즉,  SwapTx), 언제든지 `eth_sendRawTransaction`으로 돌아갈 수 있습니다.