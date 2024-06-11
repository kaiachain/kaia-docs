# caver-js (1.4.1 or earlier)

`caver-js` is a JavaScript API library that allows developers to interact with a Kaia node using a HTTP or Websocket connection. It is available on [npm](https://www.npmjs.com/package/caver-js).

## Features <a id="features"></a>

* Complete implementation of Kaia’s JSON-RPC client API over HTTP and Websocket
* Support of Kaia transaction, account, and account key types
* JavaScript smart contract package to deploy and execute a smart contract on the Kaia network
* In-memory wallet for managing Kaia accounts
* Support of fee-delegation
* Support of the Kaia wallet key format
* Encoding/decoding of a transaction object in RLP
* Signing of a transaction object
* Easy to port web3-js application to caver-js

## Packages in caver-js <a id="packages-in-caver-js"></a>

Below are packages provided in `caver-js`.

* [caver.klay](./api/caver.kaia/caver.kaia.md)
* [caver.kaia.accounts](./api/caver.kaia.accounts.md)
* [caver.kaia.Contract](./api/caver.kaia.Contract.md)
* [caver.kaia.net](./api/caver.kaia.net.md)
* [caver.kaia.abi](./api/caver.kaia.abi.md)
* [caver.utils](./api/caver.utils_1.4.1.md)

## Error Code Improvement <a id="error-code-improvement"></a>

The error messages from Ethereum via web3.js are hardly figuring out where the error occurs. `caver-js` improves the interface to catch error messages from Kaia.

More details can be found in the value of `txError` of the transaction receipt like the below:

```text
Error: runtime error occurred in interpreter
 {
  "blockHash": "0xe7ec35c9fff1178d52cee1d46d40627d19f828c4b06ad1a5c3807698b99acb20",
  "blockNumber": 7811,
  "contractAddress": null,
  "from": "0xa8a2d37727197cc0eb827f8c5a3a3aceb26cf59e",
  "gasUsed": 9900000000,
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "status": false,
  "to": "0xf8425b0f65147969621f9390ca06139c7b439497",
  "transactionHash": "0x85ce2b307899c90144442d9b3236827ac57375c522be2435093aebfd920b8c58",
  "transactionIndex": 0,
  "txError": "0x2",
  "events": {}
}
```

## Caution when Sending a Transaction to Kaia <a id="caution-when-sending-a-transaction-to-kaia"></a>

Kaia uses a fixed gas price \(25 Gkei = 25 \* 10^9\). A transaction with a different price submitted to the Kaia network will be rejected. For more information about the gas price, see [GasPrice Overview](../../../learn/transaction-fees/transaction-fees.md#gas-price-overview) The price of gas used in the network can be obtained by using [caver.kaia.getGasPrice](./api/caver.kaia/config.md#getgasprice).

If `gasPrice` is not defined when you sign or submit a transaction, caver-js uses the [caver.kaia.getGasPrice](./api/caver.kaia/config.md#getgasprice) RPC call to set the gas price of the transaction.

## Links <a id="links"></a>

* caver-js [GitHub repository](https://github.com/klaytn/caver-js)
* caver-js on [npm](https://www.npmjs.com/package/caver-js)


