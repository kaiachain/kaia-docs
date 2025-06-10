# Web3.js Extension for kaia

[kaia용 Web3.js 확장](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext)을 제공합니다:

- Drop-in replacement to `new Web3(...)` that supports both Ethereum and kaia transaction types involving AccountKey and TxTypes. See [Modifications to the Web3 object](#modifications-to-the-web3-object) section for details

## Install

> **참고:_**
> @kaiachain/web3js-ext@^1.2.0 ES 모듈 해결에 문제가 있는 경우 노드 22 이상을 권장합니다.

### Node.js

- Install
  ```sh
  npm install --save @kaiachain/web3js-ext
  ```
- ESM or TypeScript
  ```ts
  import { Web3 } from "@kaiachain/web3js-ext";
  const web3 = new Web3("https://public-en-kairos.node.kaia.io");
  ```
- CommonJS
  ```js
  const { Web3 } = require("@kaiachain/web3js-ext");
  const web3 = new Web3("https://public-en-kairos.node.kaia.io");
  ```

### Browser

It is not recommended to use CDNs in production, But you can use below for quick prototyping.

```html
<script src="https://cdn.jsdelivr.net/npm/@kaiachain/web3js-ext@latest/dist/web3js-ext.bundle.js"></script>
<script>
const web3 = new web3_ext.Web3(window.klaytn);
</script>
```

## 사용법

예제](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext/example) 및 [테스트](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext/test)를 참조하세요.

## Web3 객체에 대한 수정 사항

소스 코드 정리는 [디자인](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/DESIGN.md)을 참조하세요.

### Accounts

- 다음 함수는 Klaytn TxTypes를 처리할 수 있습니다. src/accounts/index.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/accounts/index.ts)를 참조하세요.

  ```js
  // account independent functions
  web3.eth.accounts.recoverTransaction(rlp)
  web3.eth.accounts.signTransaction(obj or rlp)
  web3.eth.accounts.signTransactionAsFeePayer(obj or rlp)

  // account-bound functions
  var account = web3.eth.accounts.create()
  var account = web3.eth.accounts.privateKeyToAccount(priv)
  var account = web3.eth.accounts.decrypt(keystore)
  account.signTransaction(obj or rlp)
  account.signTransactionAsFeePayer(obj or rlp)
  ```

- 다음 함수는 [KIP-3 Klaytn 키스토어 포맷 v4]를 처리할 수 있습니다(https://kips.kaia.io/KIPs/kip-3).

  ```js
  web3.eth.accounts.decrypt(keystore)
  web3.eth.accounts.decryptList(keystore)
  ```

### Eth RPC wrappers

- 다음 함수는 서로 다른 RPC를 호출하고 Klaytn TxTypes를 처리합니다. src/eth/index.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/eth/index.ts) 참조
  ```js

  web3.eth.getProtocolVersion()

  // klay_protocolVersion을 시도하고, 그렇지 않으면 eth_protocolVersion으로 되돌림 // klay_sendTransaction if Klaytn TxType, 그렇지 않으면 eth_sendTransaction
  // Kaikas 호환성을 위한 추가 처리
  web3.eth.sendTransaction(obj)

  // Klaytn TxType이면 klay_sendRawTransaction, 그렇지 않으면 eth_sendRawTransaction
  web3.eth.sendSignedTransaction(rlp)

  // klay_signTransaction이면 eth_signTransaction
  // Kaikas 호환성을 위한 추가 처리
  web3.eth.signTransaction(obj)
  ```

### 클레이튼 RPC

- 다음 함수는 클레이튼 RPC를 호출합니다. src/web3.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/web3.ts) 참조

  ```js
  web3.klay.blockNumber() // klay_blockNumber
  web3.net.networkID() // net_networkID
  ```