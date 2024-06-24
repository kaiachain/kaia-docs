# Smart Contract Deploy

## sendTransaction (SMART_CONTRACT_DEPLOY) <a id="sendtransaction-smart_contract_deploy"></a>

```javascript
caver.kaia.sendTransaction(transactionObject [, callback])
```

Sends a [Smart Contract Deploy](../../../../../../learn/transactions/basic.md#txtypesmartcontractdeploy) transaction to the network.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name              | Type     | Description                                                                                                                                   |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                                               |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

A transaction object of type `SMART_CONTRACT_DEPLOY` has the following structure:

| Name       | Type                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | String                                    | Transaction Type. "SMART_CONTRACT_DEPLOY"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| from       | String                                    | Address of this transaction sender.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| gas        | Number                                    | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| gasPrice   | Number                                    | (optional) Gas price provided by the sender in kei. The gasPrice must be the same as the unitPrice set in the Kaia node.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| nonce      | Number                                    | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.kaia.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| data       | String                                    | A bytecode of smart contract to be deployed. If you need to pass an argument to the constructor of the smart contract, you must set data in the format of "compiled byte code + arguments". If the compiled bytecode is '0x123 ... 321' and you need to pass 1 to the constructor, you must set '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'. Use [caver.kaia.abi.encodeContractDeploy](../../caver.kaia.abi.md#encodecontractdeploy) to get the encoded value of the byte code with the parameters. |
| value      | Number \\| String \\| BN \\| BigNumber | The value that will be transferred to the contract with this deployment. To accept the value transfer, the contract constructor must be 'payable'. If the contract constructor is not payable, value must be zero.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| codeFormat | String                                    | (optional, default: `"EVM"`) The code format of smart contract.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const account = caver.kaia.accounts.wallet.add('0x{private key}')

// Case 1: Deploying smart contract

// using the promise
caver.kaia.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: account.address,
    data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.kaia.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: account.address,
    data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: '300000',
    value: '0x174876e800',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.


// Case 2: Deploying smart contract with constructor arguments (using caver.kaia.abi.encodeContractDeploy).

// using the promise
caver.kaia.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: account.address,
    data: caver.kaia.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
    gas: '300000',
    value: 0,
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.kaia.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: account.address,
    data: caver.kaia.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
    gas: '300000',
    value: 0,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```

## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY) <a id="sendtransaction-fee_delegated_smart_contract_deploy"></a>

```javascript
caver.kaia.sendTransaction(transactionObject [, callback])
```

Sends a [Fee Delegated Smart Contract Deploy](../../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy) transaction to the network.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name              | Type     | Description                                                                                                                                   |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                                               |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

A transaction object of type `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` has the following structure:

| Name       | Type                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | String                                    | Transaction Type. "FEE_DELEGATED_SMART_CONTRACT_DEPLOY"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| from       | String                                    | Address of this transaction sender.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| gas        | Number                                    | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| gasPrice   | Number                                    | (optional) Gas price provided by the sender in kei. The gasPrice must be the same as the unitPrice set in the Kaia node.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| nonce      | Number                                    | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.kaia.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| data       | String                                    | A bytecode of smart contract to be deployed. If you need to pass an argument to the constructor of the smart contract, you must set data in the format of "compiled byte code + arguments". If the compiled bytecode is '0x123 ... 321' and you need to pass 1 to the constructor, you must set '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'. Use [caver.kaia.abi.encodeContractDeploy](../../caver.kaia.abi.md#encodecontractdeploy) to get the encoded value of the byte code with the parameters. |
| value      | Number \\| String \\| BN \\| BigNumber | The value that will be transferred to the contract with this deployment. To accept the value transfer, the contract constructor must be 'payable'. If the contract constructor is not payable, value must be zero.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| codeFormat | String                                    | (optional, default: `"EVM"`) The code format of smart contract.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

A transaction object of type `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` can be used as a parameter in [caver.kaia.accounts.signTransaction](../../caver.kaia.accounts.md#signtransaction) for sender and in [caver.kaia.accounts.feePayerSignTransaction](../../caver.kaia.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.kaia.sendTransaction`.

| Name                 | Type   | Description                                                   |
| -------------------- | ------ | ------------------------------------------------------------- |
| feePayer             | String | The fee payer address of the transaction.     |
| senderRawTransaction | String | The RLP-encoded transaction signed by sender. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const sender = caver.kaia.accounts.wallet.add('0x{private key}')
const feePayer = caver.kaia.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KAIA'),
}, sender.privateKey)

caver.kaia.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KAIA'),
}, sender.privateKey)

caver.kaia.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Deploying smart contract with constructor arguments (using caver.kaia.abi.encodeContractDeploy).

const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
  from: sender.address,
  data: caver.kaia.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
  gas:  '300000',
  value: 0,
}, sender.privateKey)

caver.kaia.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});
```

## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO) <a id="sendtransaction-fee_delegated_smart_contract_deploy_with_ratio"></a>

```javascript
caver.kaia.sendTransaction(transactionObject [, callback])
```

Sends a [Fee Delegated Smart Contract Deploy With Ratio](../../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio) transaction to the network.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name              | Type     | Description                                                                                                                                   |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                                               |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

A transaction object of type `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` has the following structure:

| Name       | Type                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | String                                    | Transaction Type. "FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| from       | String                                    | Address of this transaction sender.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| gas        | Number                                    | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| gasPrice   | Number                                    | (optional) Gas price provided by the sender in kei. The gasPrice must be the same as the unitPrice set in the Kaia node.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| nonce      | Number                                    | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.kaia.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| data       | String                                    | A bytecode of smart contract to be deployed. If you need to pass an argument to the constructor of the smart contract, you must set data in the format of "compiled byte code + arguments". If the compiled bytecode is '0x123 ... 321' and you need to pass 1 to the constructor, you must set '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'. Use [caver.kaia.abi.encodeContractDeploy](../../caver.kaia.abi.md#encodecontractdeploy) to get the encoded value of the byte code with the parameters. |
| value      | Number \\| String \\| BN \\| BigNumber | The value that will be transferred to the contract with this deployment. To accept the value transfer, the contract constructor must be 'payable'. If the contract constructor is not payable, value must be zero.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| codeFormat | String                                    | (optional, default: `"EVM"`) The code format of smart contract.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| feeRatio   | Number                                    | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 ~ 99, if it is out of range, the transaction will not be accepted.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

A transaction object of type `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` can be used as a parameters in [caver.kaia.accounts.signTransaction](../../caver.kaia.accounts.md#signtransaction) for sender and in [caver.kaia.accounts.feePayerSignTransaction](../../caver.kaia.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.kaia.sendTransaction`.

| Name                 | Type   | Description                                                   |
| -------------------- | ------ | ------------------------------------------------------------- |
| feePayer             | String | The fee payer address of the transaction.     |
| senderRawTransaction | String | The RLP-encoded transaction signed by sender. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const sender = caver.kaia.accounts.wallet.add('0x{private key}')
const feePayer = caver.kaia.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KAIA'),
  feeRatio: 30,
}, sender.privateKey)

caver.kaia.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KAIA'),
  feeRatio: 30,
}, sender.privateKey)

caver.kaia.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Deploying smart contract with constructor arguments (using caver.kaia.abi.encodeContractDeploy).

const { rawTransaction: senderRawTransaction } = await caver.kaia.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
  from: sender.address,
  data: caver.kaia.abi.encodeContractDeploy([
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" },
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" },
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" },
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
  gas:  '300000',
  value: 0,
  feeRatio: 30,
}, sender.privateKey)

caver.kaia.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});
```
