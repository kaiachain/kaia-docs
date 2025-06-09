# Web3.js Extension for kaia

[Phần mở rộng Web3.js cho kaia](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext) cung cấp:

- Drop-in replacement to `new Web3(...)` that supports both Ethereum and kaia transaction types involving AccountKey and TxTypes. See [Modifications to the Web3 object](#modifications-to-the-web3-object) section for details

## Install

> **_LƯU Ý:_**
> @kaiachain/web3js-ext@^1.2.0 khuyến nghị sử dụng node 22 trở lên nếu bạn gặp sự cố khi giải quyết Mô-đun ES.

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

## Cách sử dụng

Xem [ví dụ](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext/example) và [kiểm tra](https://github.com/kaiachain/kaia-sdk/tree/main/web3js-ext/test).

## Sửa đổi đối tượng Web3

Xem [THIẾT KẾ](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/DESIGN.md) để biết cách tổ chức mã nguồn.

### Accounts

- Các hàm sau có thể xử lý Klaytn TxTypes. Xem [src/accounts/index.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/accounts/index.ts)

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

- Các hàm sau có thể xử lý [KIP-3 Klaytn keystore format v4](https://kips.kaia.io/KIPs/kip-3)

  ```js
  web3.eth.accounts.decrypt(keystore)
  web3.eth.accounts.decryptList(keystore)
  ```

### Eth RPC wrappers

- Các hàm sau gọi các RPC khác nhau và xử lý Klaytn TxTypes. Xem [src/eth/index.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/eth/index.ts)
  ```js
  // Thử klay_protocolVersion, chuyển về eth_protocolVersion
  web3.eth.getProtocolVersion()

  // klay_sendTransaction nếu Klaytn TxType, nếu không thì eth_sendTransaction
  // Xử lý bổ sung cho khả năng tương thích Kaikas
  web3.eth.sendTransaction(obj)

  // klay_sendRawTransaction nếu Klaytn TxType, nếu không thì eth_sendRawTransaction
  web3.eth.sendSignedTransaction(rlp)

  // klay_signTransaction nếu Klaytn TxType, nếu không thì eth_signTransaction
  // Xử lý bổ sung cho khả năng tương thích Kaikas
  web3.eth.signTransaction(obj)
  ```

### Klaytn RPC

- Các hàm sau đây gọi Klaytn RPC. Xem [src/web3.ts](https://github.com/kaiachain/kaia-sdk/blob/main/web3js-ext/src/web3.ts)

  ```js
  web3.klay.blockNumber() // klay_blockNumber
  web3.net.networkID() // net_networkID
  ```