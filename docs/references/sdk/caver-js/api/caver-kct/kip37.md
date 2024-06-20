# caver.kct.kip37

The `caver.kct.kip37` helps you easily handle a smart contract that implements KIP-37 as a JavaScript object on the Klaytn blockchain platform (Klaytn). 

The `caver.kct.kip37` inherits [caver.contract](../caver.contract.md) to implement the KIP-37 token contract. The `caver.kct.kip37` holds the same properties of `caver.contract` whereas additional methods are implemented for extra features. This section only introduces the newly added methods of the `caver.kct.kip37`.

The code that implements KIP-37 for caver-js is available on the [Klaytn Contracts Github Repo](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP37). KIP-37 for caver-js supports Ownable interface. Using this, you can designate a contract owner when deploying a contract

For more information about KIP-37, see [Klaytn Improvement Proposals](https://kips.klaytn.foundation/KIPs/kip-37).

**NOTE** `caver.kct.kip37` is supported since caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7).

## caver.kct.kip37.deploy <a id="caver-klay-kip37-deploy"></a>

```javascript
caver.kct.kip37.deploy(tokenInfo, deployer)
```
Deploys the KIP-37 token contract to the Klaytn blockchain. A contract deployed using caver.kct.kip37.deploy is a multi token that follows the KIP-37 standard. 

After successful deployment, the promise will be resolved with a new KIP37 instance.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenInfo | object | The information needed to deploy a KIP-37 token contract on the Klaytn blockchain. See the below table for the details. |
| deployer | string \| object | The address in the keyring instance to deploy the KIP-37 token contract. This address must have enough KLAY to deploy. See [Keyring](../caver-wallet/keyring.md#caver-wallet-keyring) for more details. If you want to define your own fields to use when sending transactions, you can pass the object type as a parameter. Also, if you want to use Fee Delegation when deploying KIP-37 contracts, you can define fields related to fee delegation in the object. For fields that can be defined in the object, refer to the parameter description of [create](#kip37-create). |

The tokenInfo object must contain the following:

| Name | Type | Description |
| --- | --- | --- |
| uri | string | The URI for all token types, by relying on the [token type ID substitution mechanism](http://kips.klaytn.foundation/KIPs/kip-37#metadata). |

**Return Value**

`PromiEvent`: A promise combined event emitter, which is resolved with a new KIP37 instance. Additionally, the following events can occur:

| Name | Type | Description |
| --- | --- | --- |
| transactionHash | string | Fired right after the transaction is sent and a transaction hash is available. |
| receipt | object | Fired when the transaction receipt is available. If you want to know about the properties inside the receipt object, see [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute. |
| error | Error | Fired if an error occurs during sending. |

**Token Enrollment**

1. To enroll a token on a block explorer, the contract creator must fill out a submission request form. Make note of the specified information required on the form.

2. Smart Contract Environment 

   - Compiler Type: Solidity

   - Compiler version: v0.8.4+commit.c7e474f2

   - Open Source License Type: MIT

3. Smart Contract Detail

   - Optimization: --optimize-run 200 

   - Source code: [KIP37 Contracts Github Link](https://github.com/klaytn/caver-js/blob/dev/packages/caver-kct/src/kip37Token.sol).

4. ABI-encoded Value: [kip37JsonInterface at dev · klaytn/caver-js · GitHub](https://github.com/klaytn/caver-js/blob/dev/packages/caver-kct/src/kctHelper.js#L1329-L2374) 


**Example**

```javascript
// using the promise
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}').then(console.log)
KIP37 {
    ...
    _address: '0x7314B733723AA4a91879b15a6FEdd8962F413CB2',
    _jsonInterface: [
        ...
        {
            anonymous: false,
            inputs: [{ indexed: false, name: 'value', type: 'string' }, { indexed: true, name: 'id', type: 'uint256' }],
            name: 'URI',
            type: 'event',
            signature: '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b',
        }
    ] 
}

// Send object as second parameter
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP37Instance) {
    console.log(newKIP37Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip37.detectInterface <a id="caver-kct-kip37-detectinterface"></a>

```javascript
caver.kct.kip37.detectInterface(contractAddress)
```
Returns the information of the interface implemented by the token contract. This static function will use [kip37.detectInterface](#kip37-detectinterface).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| contractAddress | string | The address of the KIP-37 token contract |

**Return Value**

`Promise` returns an `object` containing the result with boolean values whether each [KIP-37 interface](https://kips.klaytn.foundation/KIPs/kip-37#kip-13-identifiers) is implemented.

**Example**

```javascript
> caver.kct.kip37.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## caver.kct.kip37.create <a id="caver-kct-kip37-create"></a>

```javascript
caver.kct.kip37.create([tokenAddress])
```
Creates a new KIP37 instance with its bound methods and events. This function works the same as [new KIP37](#new-kip37).

**NOTE** `caver.kct.kip37.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**Parameters**

See the [new KIP37](#new-kip37).


**Return Value**

See the [new KIP37](#new-kip37).


**Example**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = caver.kct.kip37.create()

// Create a KIP37 instance with a token address
> const kip37 = caver.kct.kip37.create('0x{address in hex}')
```


## new KIP37 <a id="new-kip37"></a>

```javascript
new caver.kct.kip37([tokenAddress])
```
Creates a new KIP37 instance with its bound methods and events.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenAddress | string | (optional) The address of the KIP-37 token contract, which can be assigned later through `kip37.options.address = '0x1234..'` |


**Return Value**

| Type | Description |
| --- | --- |
| object | The KIP37 instance with its bound methods and events. |


**Example**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = new caver.kct.kip37()

// Create a KIP37 instance with a token address
> const kip37 = new caver.kct.kip37('0x{address in hex}')
```


## kip37.clone <a id="kip37-clone"></a>

```javascript
kip37.clone([tokenAddress])
```
Clones the current KIP37 instance.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenAddress | string | (optional) The address of the smart contract that deployed another KIP37 token. If omitted, it will be set to the contract address in the original instance. |

**Return Value**

| Type | Description |
| --- | --- |
| object | The clone of the original KIP37 instance. |


**Example**

```javascript
> const kip37 = new caver.kct.kip37(address)

// Clone without a parameter
> const cloned = kip37.clone()

// Clone with the address of the new token contract
> const cloned = kip37.clone('0x{address in hex}')
```

## kip37.detectInterface <a id="kip37-detectinterface"></a>

```javascript
kip37.detectInterface()
```
Returns the information of the interface implemented by the token contract.

**Parameters**

None

**Return Value**

`Promise` returns an `object` containing the result with boolean values whether each [KIP-37 interface](https://kips.klaytn.foundation/KIPs/kip-37#kip-13-identifiers) is implemented.

**Example**

```javascript
> kip37.detectInterface().then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## kip37.supportsInterface <a id="kip37-supportsinterface"></a>

```javascript
kip37.supportsInterface(interfaceId)
```
Return `true` if this contract implements the interface defined by `interfaceId`.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| interfaceId | string | The interfaceId to be checked. |

**Return Value**

`Promise` returns `boolean`: `true` if this contract implements the interface defined by `interfaceId`.

**Example**

```javascript
> kip37.supportsInterface('0x6433ca1f').then(console.log)
true

> kip37.supportsInterface('0x3a2820fe').then(console.log)
false
```


## kip37.uri <a id="kip37-uri"></a>

```javascript
kip37.uri(id)
```
Returns distinct Uniform Resource Identifier (URI) of the given token.

If the string `{id}` exists in any URI, this function will replace this with the actual token ID in hexadecimal form.
Please refer to [KIP-34 Metadata](http://kips.klaytn.foundation/KIPs/kip-37#metadata).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| id | BigNumber \| string \| number | The token id to get uri. |

**NOTE** The `id` parameter accepts `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `string`: The uri of the token.

**Example**

```javascript
> kip37.uri('0x0').then(console.log)
'https://caver.example/0000000000000000000000000000000000000000000000000000000000000000.json'
```


## kip37.totalSupply <a id="kip37-totalsupply"></a>

```javascript
kip37.totalSupply(id)
```
Returns the total token supply of the specific token.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| id | BigNumber \| string \| number | The token id to see the total supply. |

**NOTE** The `id` parameter accepts `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `BigNumber`: The total number of tokens.

**Example**

```javascript
> kip37.totalSupply(0).then(console.log)
10000000000
```


## kip37.balanceOf <a id="kip37-balanceof"></a>

```javascript
kip37.balanceOf(account, id)
```
Returns the amount of tokens of token type `id` owned by `account`.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | string | The address of the account for which you want to see balance. |
| id | BigNumber \| string \| number | The token id to see balance. |

**NOTE** The `id` parameter accepts `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `BigNumber`: The amount of token that account has.

**Example**

```javascript
> kip37.balanceOf('0x{address in hex}', 0).then(console.log)
20
```


## kip37.balanceOfBatch <a id="kip37-balanceofbatch"></a>

```javascript
kip37.balanceOfBatch(accounts, ids)
```
Returns the balance of multiple account/token pairs. `balanceOfBatch` is a batch operation of [balanceOf](#kip37-balanceof), and the length of arrays with `accounts` and `ids` must be the same.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| accounts | Array | The address of the account for which you want to see balance. |
| ids | Array |  An array of the token ids to see balance. |

**Return Value**

`Promise` returns `Array`: The balance of multiple account/token pairs.

**Example**

```javascript
> kip37.balanceOfBatch(['0x{address in hex}', '0x{address in hex}'], [0, 1]).then(console.log)
[ 20, 30 ]
```


## kip37.isMinter <a id="kip37-isminter"></a>

```javascript
kip37.isMinter(address)
```
Returns `true` if the given account is a minter who can issue new KIP37 tokens.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of the account to be checked for having the minting right. |

**Return Value**

`Promise` returns `boolean`: `true` if the account is a minter.

**Example**

```javascript
> kip37.isMinter('0x{address in hex}').then(console.log)
true

> kip37.isMinter('0x{address in hex}').then(console.log)
false
```


## kip37.isPauser <a id="kip37-ispauser"></a>

```javascript
kip37.isPauser(address)
```
Returns `true` if the given account is a pauser who can suspend transferring tokens.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of the account to be checked for having the right to suspend transferring tokens. |

**Return Value**

`Promise` returns `boolean`: `true` if the account is a pauser.

**Example**

```javascript
> kip37.isPauser('0x{address in hex}').then(console.log)
true

> kip37.isPauser('0x{address in hex}').then(console.log)
false
```


## kip37.paused <a id="kip37-paused"></a>

```javascript
kip37.paused()
```
Returns whether or not the token contract's transaction (or specific token) is paused.

If id parameter is not defined, return whether the token contract's transaction is paused. If id parameter is defined, return whether the specific token is paused.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| id | BigNumber \| string \| number | (optional) The token id to check wether paused or not. If this parameter is omitted, the `paused` function return whether the contract is in paused state. |

**NOTE** The `id` parameter accepts `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `boolean`: `true` if the contract (or specific token) is paused.

**Example**

```javascript
// without token id parameter
> kip37.paused().then(console.log)
true
> kip37.paused().then(console.log)
false

// with token id parameter
> kip37.paused(0).then(console.log)
true
> kip37.paused(1).then(console.log)
false
```


## kip37.isApprovedForAll <a id="kip37-isApprovedforall"></a>

```javascript
kip37.isApprovedForAll(owner, operator)
```
Queries the approval status of an operator for a given owner. Returns `true` if an operator is approved by a given owner.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| owner | string | The address of the owner. |
| operator | string | The address of the operator. |

**Return Value**

`Promise` returns `boolean`: True if the operator is approved, false if not

**Example**

```javascript
> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true

> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false
```


## kip37.create <a id="kip37-create"></a>

```javascript
kip37.create(id, initialSupply [, uri] [, sendParam])
```

Creates a new token type and assigns `initialSupply` to the minter.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| id | BigNumber \| string \| number | The token id to create. |
| initialSupply | BigNumber \| string \| number | The amount of tokens being minted. |
| uri | string | (optional) The token URI of the created token. |
| sendParam | object | (optional) An object holding parameters that are required for sending a transaction. |

**NOTE** The `id`, `initialSupply` parameters accept `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value. 

The `sendParam` object contains the following:

| Name | Type | Description |
| --- | --- | --- |
| from | string | (optional) The address from which the transaction should be sent. If omitted, it will be set by `kip37.options.from`. If neither of `from` in the `sendParam` object nor `kip37.options.from` were not provided, an error would occur. |
| gas | number \| string | (optional) The maximum number of gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `kip37.methods.approve(spender, amount).estimateGas({from})`. |
| gasPrice | number \| string | (optional) The gas price in peb for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | number \| string \| BN \| BigNumber | (optional) The value to be transferred in peb. |
| feeDelegation | boolean | (optional, default `false`) Whether to use fee delegation transaction. If omitted, `kip37.options.feeDelegation` will be used. If both omitted, fee delegation is not used. |
| feePayer | string | (optional) The address of the fee payer paying the transaction fee. When `feeDelegation` is `true`, the value is set to the `feePayer` field in the transaction. If omitted, `kip37.options.feePayer` will be used. If both omitted, throws an error. |
| feeRatio | string | (optional) The ratio of the transaction fee the fee payer will be burdened with. If `feeDelegation` is `true` and `feeRatio` is set to a valid value, a partial fee delegation transaction is used. The valid range of this is between 1 and 99. The ratio of 0, or 100 and above are not allowed. If omitted, `kip37.options.feeRatio` will be used. |

**NOTE** `feeDelegation`, `feePayer` and `feeRatio` are supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip37.create(2, '1000000000000000000', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
    blocknumber: 2823,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 2823,
            transactionHash: '0xee8cdaa0089681d90a52c1539e75c6e26b3eb67affd4fbf70033ba010a3f0d26',
            transactionIndex: 0,
            blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
            logIndex: 0,
            id: 'log_ca64e74b',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '3': '2',
                '4': '1000000000000000000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                id: '2',
                value: '1000000000000000000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x...40000',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...f48' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.create(2, '1000000000000000000', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.create(2, '1000000000000000000').then(console.log)
```

## kip37.setApprovalForAll <a id="kip37-setApprovalforall"></a>

```javascript
kip37.setApprovalForAll(operator, approved [, sendParam])
```
Approves the given operator, or disallow the given operator, to transfer all tokens of the owner.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| operator | string | The address of an account to be approved/prohibited to transfer the owner's all tokens. |
| approved | boolean | This operator will be approved if `true`. The operator will be disallowed if `false`. |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip37.setApprovalForAll('0x{address in hex}', true, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
	blockNumber: 3289,
	contractAddress: null,
	from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
	...
	status: true,
	to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
	...
	events: {
        ApprovalForAll: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3289,
            transactionHash: '0x5e94aa4af5f7604f1b32129fa8463c43cae4ff118f80645bfabcc6181667b8ab',
            transactionIndex: 0,
            blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
            logIndex: 0,
            id: 'log_b1f9938f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '2': true,
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                operator: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                approved: true,
            },
            event: 'ApprovalForAll',
            signature: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
            raw: {
                data: '0x00...001',
                topics: [ '0x17307...', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.setApprovalForAll('0x{address in hex}', true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.setApprovalForAll('0x{address in hex}', true).then(console.log)
```

## kip37.safeTransferFrom <a id="kip37-safetransferfrom"></a>

```javascript
kip37.safeTransferFrom(from, recipient, id, amount, data [, sendParam])
```
Safely transfers the given `amount` tokens of specific token type `id` from `from` to the `recipient`. 

The address that was authorized to send the owner's token (the operator) or the token owner him/herself is expected to execute this token transfer transaction. Thus, an authorized address or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip37.options.from`. Unless both `sendParam.from` and `kip37.options.from` are provided, an error would occur.

If the recipient was a contract address, it should implement [IKIP37Receiver.onKIP37Received](https://kips.klaytn.foundation/KIPs/kip-37#kip-37-token-receiver). Otherwise, the transfer is reverted.  

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| from | string | The address of the account that owns the token to be sent with allowance mechanism. |
| recipient | string | The address of the account to receive the token. |
| id | BigNumber \| string \| number | The token id to transfer. |
| amount | BigNumber \| string \| number | The amount of token you want to transfer. |
| data | Buffer \| string \| number | (optional) The optional data to send along with the call. |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** The `id` and `amount` parameters accept `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
    blocknumber: 3983,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3983,
            transactionHash: '0x0efc60b88fc55ef37eafbd18057404334dfd595ce4c2c0ff75f0922b928735e7',
            transactionIndex: 0,
            blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
            logIndex: 0,
            id: 'log_cddf554f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, 'data' { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000).then(console.log)
```

## kip37.safeBatchTransferFrom <a id="kip37-safebatchtransferfrom"></a>

```javascript
kip37.safeBatchTransferFrom(from, recipient, ids, amounts, data [, sendParam])
```

Safely batch transfers of multiple token ids and values from `from` to the `recipient`.

The address that was approved to send the owner's token (the operator) or the token owner him/herself is expected to execute this token transfer transaction. Thus, an approved address or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip37.options.from`. Unless both `sendParam.from` and `kip37.options.from` are provided, an error would occur.

If the recipient was a contract address, it should implement [IKIP37Receiver.onKIP37Received](https://kips.klaytn.foundation/KIPs/kip-37#kip-37-token-receiver). Otherwise, the transfer is reverted.  

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| from | string | The address of the account that owns the token to be sent with allowance mechanism. |
| recipient | string | The address of the account to receive the token. |
| ids | Array | An array of the token ids to transfer. |
| amounts | Array | An array of the token amounts you want to transfer. |
| data | Buffer \| string \| number | (optional) The optional The data to send along with the call. |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** The `ids` and `amounts` array parameters accept `number` type as an element in array, but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
    blocknumber: 4621,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 4621,
            transactionHash: '0x557213eef8ae096bc35f5b3bee0e7cf87ecd87129b4a16d4e35a7356c341dad8',
            transactionIndex: 0,
            blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
            logIndex: 0,
            id: 'log_b050bacc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['10', '1000'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['10', '1000'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...3e8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], 'data', { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000]).then(console.log)
```

## kip37.mint <a id="kip37-mint"></a>

```javascript
kip37.mint(to, id, value [, sendParam])
```
Mints the token of the specific token type `id` and assigns the tokens according to the variables `to` and `value`. The mint function allows you to mint specific token to multiple accounts at once by passing arrays to `to` and `value` as parameters.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| to | string \| Array | An address of the account or an array of addresses to which the minted token will be issued. |
| id | BigNumber \| string \| number | The token id to mint. |
| value | BigNumber \| string \| number \| Array | The amount of token to be minted. If an array containing multiple addresses is delivered to `to` parameter, the value must be delivered in the form of an array. |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** The `id` and `value` parameters accept `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**NOTE** If `sendParam.from` or `kip37.options.from` were given, it should be a minter with MinterRole.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given (Mint the specific tokens to a account)
> kip37.mint('0x{address in hex}', 2, 1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
    blocknumber: 12868,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 12868,
            transactionHash: '0xed25e305904e6efb613a6fe8b7370488554f6508b6701e9a0167c95d341c73dc',
            transactionIndex: 0,
            blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
            logIndex: 0,
            id: 'log_04dffde1',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// Send via a sendParam object with the from field given (Mint the specific tokens to the multiple accounts)
> kip37.mint(['0x{address in hex}', '0x{address in hex}'], 2, [1, 2], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
    blocknumber: 13378,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: [
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 0,
                id: 'log_6975145c',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    '3': '2',
                    '4': '1',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    id: '2',
                    value: '1',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x00...001',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
                },
            },
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 1,
                id: 'log_7fcd4837',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    '3': '2',
                    '4': '2',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    id: '2',
                    value: '2',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x000...002',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...3c4' ],
                },
            },
        ],
    },
}

// Using FD transaction to execute the smart contract
> kip37.mint('0x{address in hex}', 2, 1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mint('0x{address in hex}', 2, 1000).then(console.log)
```

## kip37.mintBatch <a id="kip37-mintbatch"></a>

```javascript
kip37.mintBatch(to, ids, values [, sendParam])
```
Mints the multiple KIP-37 tokens of the specific token types `ids` in a batch and assigns the tokens according to the variables `to` and `values`.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| to | string | An address of the account to which the minted tokens will be issued. |
| ids | Array| An array of the token ids to mint. |
| values | Array | An array of the token amounts to mint. |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** The `ids` and `values` array parameters accept `number` type as an element in array, but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**NOTE** If `sendParam.from` or `kip37.options.from` were given, it should be a minter with MinterRole.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
    blocknumber: 13981,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 13981,
            transactionHash: '0x3e2ddc38210eb3257379a6a59c2e6e341937a4c9e7ef848f1cd0462dfd0b3af6',
            transactionIndex: 0,
            blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
            logIndex: 0,
            id: 'log_d07901ef',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```


## kip37.addMinter <a id="kip37-addminter"></a>

```javascript
kip37.addMinter(account [, sendParam])
```
Adds an account as a minter, who are permitted to mint tokens.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | string | The address of the account to be added as a minter. |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** If `sendParam.from` or `kip37.options.from` were given, it should be a minter.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip37.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
    blocknumber: 14172,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        MinterAdded:{
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14172,
            transactionHash: '0xa2c492abde161356d03a23d9ba48e5fd6e69a2e1603dc0286c7c65aac65d0356',
            transactionIndex: 0,
            blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
            logIndex: 0,
            id: 'log_712e7c09',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addMinter('0x{address in hex}').then(console.log)
```


## kip37.renounceMinter <a id="kip37-renounceminter"></a>

```javascript
kip37.renounceMinter([sendParam])
```
Renounces the right to mint tokens. Only a minter address can renounce the minting right. 

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** If `sendParam.from` or `kip37.options.from` were given, it should be a minter with MinterRole.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip37.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
    blocknumber: 14174,
    contractAddress: null,
    from: '0xf896c5afd69239722013ad0041ef33b5a2fdb1a6',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        MinterRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14174,
            transactionHash: '0x4b06b298f3de6f119901a4444326d21add6fb1b9a5d69c91c998a41af8fd46c9',
            transactionIndex: 0,
            blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
            logIndex: 0,
            id: 'log_9b0f3967',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renounceMinter().then(console.log)
```


## kip37.burn <a id="kip37-burn"></a>

```javascript
kip37.burn(account, id, value [, sendParam])
```
Burns specific KIP-37 tokens.

The address that was approved to operate the owner's token (the operator) or the token owner him/herself is expected to execute this token transfer transaction. Thus, an authorized address or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip37.options.from`. Unless both `sendParam.from` and `kip37.options.from` are provided, an error would occur.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | string | The address of the account that owns the token to be destroyed. |
| id | BigNumber \| string \| number | The id of token to be destroyed. |
| value | BigNumber \| string \| number | The amount of token to be destroyed. |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** The `id` and `amount` parameters accept `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip37.burn('0x{address in hex}', 2, 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
    blocknumber: 16076,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16076,
            transactionHash: '0xec16313d00d0dbf34608c84e7563bacbde04e7e9c5fbcfffae54f0161356f19c',
            transactionIndex: 0,
            blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
            logIndex: 0,
            id: 'log_9c9ddbc9',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': '2',
                '4': '10',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                id: '2',
                value: '10',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...00a',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burn('0x{address in hex}', 2, 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burn('0x{address in hex}', 2, 10).then(console.log)
```


## kip37.burnBatch <a id="kip37-burnbatch"></a>

```javascript
kip37.burnBatch(account, ids, values [, sendParam])
```
Burns the multiple KIP-37 tokens.

The address that was authorized to operate the owner's token (the operator) or the token owner him/herself is expected to execute this token transfer transaction. Thus, the authorized one or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip37.options.from`. Unless both `sendParam.from` and `kip37.options.from` are provided, an error would occur.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | string | The address of the account that owns the token to be destroyed. |
| ids | Array | An array of the token ids to burn. |
| values | Array | An array of the token amounts to burn. |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** The `ids` and `values` array parameters accept `number` type as an element in array, but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
    blocknumber: 16930,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16930,
            transactionHash: '0xa19ee5c01ad67fd27bb2818b7cbad58ba529d5a7885d79558dea8006e7a760bf',
            transactionIndex: 0,
            blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
            logIndex: 0,
            id: 'log_66e4d23e',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```


## kip37.addPauser <a id="kip37-addpauser"></a>

```javascript
kip37.addPauser(account [, sendParam])
```
Adds an account as a pauser that has the right to suspend the contract.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | string | The address of the account to be a new pauser. |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** If `sendParam.from` or `kip37.options.from` were given, it should be a pauser with PauserRole.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip37.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
    blocknumber: 17007,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        PauserAdded: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17007,
            transactionHash: '0xe1d702bbbb44c25b5f4d18cf1e1a1745eb134d6438d5cae77611b1b73944aa93',
            transactionIndex: 0,
            blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
            logIndex: 0,
            id: 'log_50e810b0',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addPauser('0x{address in hex}').then(console.log)
```


## kip37.renouncePauser <a id="kip37-renouncepauser"></a>

```javascript
kip37.renouncePauser([sendParam])
```
Renounces the right to pause the contract. Only a pauser address can renounce the pausing right. 

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** If `sendParam.from` or `kip37.options.from` were given, it should be a pauser with PauserRole.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip37.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
    blocknumber: 17010,
    contractAddress: null,
    from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        PauserRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17010,
            transactionHash: '0xa0557cf370cdff56ee2f53555da3e816361125a19cc832caa9d7a62808afeda1',
            transactionIndex: 0,
            blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
            logIndex: 0,
            id: 'log_ebd8d4a4',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renouncePauser().then(console.log)
```


## kip37.pause <a id="kip37-pause"></a>

```javascript
kip37.pause([id] [, sendParam])
```
Suspends functions related to token operation. If `id` parameter is defined, pause the specific token. Otherwise pause the token contract.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| id | BigNumber \| string \| number | (optional) The token id to pause. If this parameter is omitted, the `pause` function pause the token contract. |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [kip37.create](#kip37-create). |

**NOTE** If `sendParam.from` or `kip37.options.from` were given, it should be a pauser with PauserRole.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given (pause the token contract)
> kip37.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
    blocknumber: 17521,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17521,
            transactionHash: '0xc5f3bebe83c86f68d582240f6bb47a8f56867650c9fec3b7caf1cb5861d31af2',
            transactionIndex: 0,
            blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
            logIndex: 0,
            id: 'log_55bd1adc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x00...f48',
                topics: ['0x62e78...'],
            },
        },
    },
}

// Send via a sendParam object with the from field given (pause the specific token)
> kip37.pause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
    blocknumber: 17738,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17738,
            transactionHash: '0x437834d4ccb944397607a81abe1bc229c44749d20c2b4f4b73ae1dd5907f79c9',
            transactionIndex: 0,
            blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
            logIndex: 0,
            id: 'log_b89719ed',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0xabdb1c9133626eb4f8c5f2ec7e3c60a969a2fb148a0c341a3cf6597242c8f8f5',
            raw: {
                data: '0x00...f48',
                topics: ['0xabdb1...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.pause().then(console.log)
```


## kip37.unpause <a id="kip37-unpause"></a>

```javascript
kip37.unpause([id] [, sendParam])
```

Resumes the paused contract or specific token. If `id` parameter is defined, unpause the specific token. Otherwise unpause the token contract.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| id | BigNumber \| string \| number | (optional) The token id to unpause. If this parameter is omitted, the `unpause` function unpause the token contract. |

**NOTE** If `sendParam.from` or `kip37.options.from` were given, it should be a pauser with PauserRole.

**Return Value**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. Receipts from KIP37 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given (unpause the token contract)
> kip37.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
    blocknumber: 17524,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17524,
            transactionHash: '0x5e67040e12297ee85a3464eae406904c32b7f3c7493cbdbc8f73a2e92b10f56d',
            transactionIndex: 0,
            blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
            logIndex: 0,
            id: 'log_78d5bc18',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x00...f48',
                topics: ['0x5db9e...'],
            },
        },
    },
}

// Send via a sendParam object with the from field given (unpause the specific token)
> kip37.unpause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
    blocknumber: 17742,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17742,
            transactionHash: '0xed920c7b487c3133508cc37f930e4ae3b9c05f01e4ad823909c9b4aacf040f62',
            transactionIndex: 0,
            blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
            logIndex: 0,
            id: 'log_2811c3c5',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0xfe9b5e5216db9de81757f43d20f846bea509c040a560d136b8263dd8cd764238',
            raw: {
                data: '0x00...f48',
                topics: ['0xfe9b5...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.unpause().then(console.log)
```

[getTransactionReceipt]: ../caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt
