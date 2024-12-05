---
description: APIs related to service chain ENs.
---

# subbridge

The namespace `subbridge` provides functions related to Service Chain.
To use the functions in this namespace, the option `subbridge` should be enabled in the SEN connected to the service chain.

## subbridge_nodeInfo <a id="subbridge_nodeInfo"></a>

Returns bridge node information including the KNI (Klaytn Network Identifier) of the node.
A subbridge node can connect to a mainbridge node via the KNI.

**Parameters**

None

**Return Value**

| Type        | Description                  |
| ----------- | ---------------------------- |
| JSON string | the bridge node information. |

**Example**

```javascript
> subbridge.nodeInfo
{
  kni: "kni://f8a1f0cd1e2bebeece571e4fda16e215218fd4b9bc2eddd924f7cd5b5f950fcec8f4b8cd3851390d1d0bacf1b15e1c4a38c882252e429a28d16eeb6edbacd726@[::]:50505?discport=0",
  id: "f8a1f0cd1e2bebeece571e4fda16e215218fd4b9bc2eddd924f7cd5b5f950fcec8f4b8cd3851390d1d0bacf1b15e1c4a38c882252e429a28d16eeb6edbacd726",
  ip: "::",
  listenAddr: "[::]:50505",
  name: "-2",
  ports: {
    discovery: 0,
    listener: 50505
  },
  protocols: {
    servicechain: {
      config: {
        chainId: 2018,
        deriveShaImpl: 0,
        isBFT: true,
        istanbul: {...},
        unitPrice: 0
      },
      difficulty: 87860,
      genesis: "0x711ce9865492659977abb2758d29f68c2b0c82862d9376f25953579f64f95b58",
      head: "0x0d4b130731f1e7560e4531ac73d55ac8c6daccb178abd86af0d96b7aafded7c5",
      network: 1
    }
  }
}
```

## subbridge_addPeer <a id="subbridge_addPeer"></a>

Returns `true` if adding a mainbridge peer is done successfully.

The `addPeer` method adds a new remote node to the peer list.
The node will try to maintain connectivity to these nodes at all times, reconnecting every
once in a while if the remote connection goes down.

The method accepts a single argument, the `kni` URL of the remote peer to start tracking and returns a `BOOL` indicating whether the peer was accepted
for tracking or some error occurred.

**Parameters**

| Name | Type   | Description        |
| ---- | ------ | ------------------ |
| url  | string | Peer's  `kni` URL. |

**Return Value**

| Type | Description                                         |
| ---- | --------------------------------------------------- |
| bool | `true` if the peer was accepted, `false` otherwise. |

**Example**

Console

```javascript
> mainbridge.addPeer("kni://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.addPeer'
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_removePeer <a id="subbridge_removePeer"></a>

Returns `true` if removing the peer is done successfully.

The `removePeer` method disconnects and removes the remote node in the list of tracked static nodes.
The method accepts a single argument, the `kni` URL of the remote peer to start tracking and returns a `BOOL` indicating whether the peer was accepted
for tracking or some error occurred.

**Parameters**

| Name | Type   | Description        |
| ---- | ------ | ------------------ |
| url  | string | Peer's  `kni` URL. |

**Return Value**

| Type | Description                                        |
| ---- | -------------------------------------------------- |
| bool | `true` if the peer was removed, `false` otherwise. |

**Example**

Console

```javascript
> mainbridge.removePeer("kni://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.removePeer'
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_parentOperator <a id="subbridge_parentOperator"></a>

The `subbridge_parentOperator` returns the parent operator account address.

**Parameters**

none

**Return Value**

| Type    | Description                            |
| ------- | -------------------------------------- |
| Account | Parent chain operator account address. |

**Example**

```javascript
> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
```

## subbridge_childOperator <a id="subbridge_childOperator"></a>

The `subbridge_childOperator` returns the child operator account address.

**Parameters**

none

**Return Value**

| Type    | Description                           |
| ------- | ------------------------------------- |
| Account | Child chain operator account address. |

**Example**

```javascript
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

## subbridge_parentOperatorNonce <a id="subbridge_parentOperatorNonce"></a>

The `subbridge_parentOperatorNonce` returns the nonce of the parent operator account address.

**Parameters**

none

**Return Value**

| Type     | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| QUANTITY | Integer of the number of transactions sent from the parent operator account. |

**Example**

```javascript
> subbridge.parentOperatorNonce
1348
```

## subbridge_childOperatorNonce <a id="subbridge_childOperatorNonce"></a>

The `subbridge_childOperator` returns the child operator account address.

**Parameters**

none

**Return Value**

| Type     | Description                                                                 |
| -------- | --------------------------------------------------------------------------- |
| QUANTITY | Integer of the number of transactions sent from the child operator account. |

**Example**

```javascript
> subbridge.childOperatorNonce
1024
```

## subbridge_parentOperatorBalance <a id="subbridge_parentOperatorBalance"></a>

The `subbridge_parentOperatorBalance` returns the balance of the parent operator account.

**Parameters**

none

**Return Value**

| Type     | Description                                                    |
| -------- | -------------------------------------------------------------- |
| QUANTITY | Integer of the current balance of the parent operator account. |

**Example**

```javascript
> subbridge.parentOperatorBalance
1e+50
```

## subbridge_childOperatorBalance <a id="subbridge_childOperatorBalance"></a>

The `subbridge_childOperatorBalance` returns the balance of the child operator account.

**Parameters**

none

**Return Value**

| Type     | Description                                                   |
| -------- | ------------------------------------------------------------- |
| QUANTITY | Integer of the current balance of the child operator account. |

**Example**

```javascript
> subbridge.childOperatorBalance
1e+50
```

## subbridge_sendChainTxslimit <a id="subbridge_sendChainTxslimit"></a>

The `sendChainTxslimit` gets the maximum number of pending transactions to pick up for sending at once.

**Parameters**

None

**Return Value**

| Type   | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| Uint64 | the maximum number of pending transactions to pickup for sending at once. |

**Example**

```javascript
> subbridge.sendChainTxslimit
100
```

## subbridge_anchoring <a id="subbridge_anchoring"></a>

The `subbridge_anchoring` can enable/disable the anchoring feature of the service chain.

**Parameters**

| Name   | Type | Description                                                |
| ------ | ---- | ---------------------------------------------------------- |
| enable | Bool | `true` enables the anchoring feature, `false` disables it. |

**Return Value**

| Type | Description                                             |
| ---- | ------------------------------------------------------- |
| bool | `true` if the anchoring was enabled, `false` otherwise. |

**Example**

Console

```javascript
> subbridge.anchoring(true)
true
> subbridge.anchoring(false)
false
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[true],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[false],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":false}
```

## subbridge_latestAnchoredBlockNumber <a id="subbridge_latestAnchoredBlockNumber"></a>

The `subbridge_latestAnchoredBlockNumber` returns the latest anchored block number of the service chain.

**Parameters**

None

**Return Value**

| Type   | Description                       |
| ------ | --------------------------------- |
| Uint64 | The latest anchored block number. |

**Example**

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

## subbridge_getReceiptFromParentChain <a id="subbridge_getReceiptFromParentChain"></a>

The `subbridge_getReceiptFromParentChain` returns the receipt of the anchoring transaction.

**Parameters**

| Type         | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| 32-byte DATA | The child chain block hash that was included the anchoring tx hash. |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found.

| Name            | Type          | Description                                                                                                                         |
| --------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| contractAddress | DATA          | The contract address created, if the transaction was a contract creation, otherwise `null`. (will be deprecated) |
| gasUsed         | QUANTITY      | The amount of gas used by this specific transaction alone.                                                                          |
| logs            | Array         | Array of log objects, which this transaction generated.                                                                             |
| logsBloom       | 256-byte DATA | Bloom filter for light clients to quickly retrieve related logs.                                                                    |
| status          | QUANTITY      | Either `1` (success) or `0` (failure).                                                        |
| transactionHash | 32-byte DATA  | Hash of the transaction.                                                                                                            |

**Example**

```javascript
> subbridge.getReceiptFromParentChain("0x4f300d6574e71d7940c88fe08f27d9ac45cbc7b81d45c17e848d3772f64377b5")
{
  contractAddress: "0x0000000000000000000000000000000000000000",
  gasUsed: "0x9470",
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  transactionHash: "0x3641f52359f44ef2a9941ea840aed4befbace5cac28d5cc8cacd94eae211fd1e"
}
```

## subbridge_deployBridge <a id="subbridge_deployBridge"></a>

The `subbridge_deployBridge` deploys a bridge contract to the parent and child chains and returns the addresses of deployed bridge contracts. This method also registers the bridge contracts with the sub-bridge.

**Parameters**

none

**Return Value**

| Name    | Type         | Description                                 |
| ------- | ------------ | ------------------------------------------- |
| account | 20-byte DATA | Address of bridge contract on child chain.  |
| account | 20-byte DATA | Address of bridge contract on parent chain. |

**Example**

```javascript
> subbridge.deployBridge()
["0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4"]
```

## subbridge_registerBridge <a id="subbridge_registerBridge"></a>

The `subbridge_registerBridge` registers already deployed bridge contracts in the parent and child chains.

**Parameters**

| Name    | Type         | Description                                 |
| ------- | ------------ | ------------------------------------------- |
| account | 20-byte DATA | Address of bridge contract on child chain.  |
| account | 20-byte DATA | Address of bridge contract on parent chain. |

**Return Value**

| Name  | Type  | Description                                                  |
| ----- | ----- | ------------------------------------------------------------ |
| error | Error | `null` if the registration succeeds, Error object otherwise. |

**Example**

```javascript
> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: bridge already exists
```

## subbridge_deregisterBridge <a id="subbridge_deregisterBridge"></a>

The `subbridge.deregisterBridge` deregisters already registered bridge contracts in the parent/child chain.

**Parameters**

| Name    | Type         | Description                                 |
| ------- | ------------ | ------------------------------------------- |
| account | 20-byte DATA | Address of bridge contract on child chain.  |
| account | 20-byte DATA | Address of bridge contract on parent chain. |

**Return Value**

| Name  | Type  | Description                                                    |
| ----- | ----- | -------------------------------------------------------------- |
| error | Error | `null` if the deregistration succeeds, Error object otherwise. |

**Example**

```javascript
> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: invalid bridge pair
```

## subbridge_subscribeBridge <a id="subbridge_subscribeBridge"></a>

The `subbridge_subscribeBridge` subscribes to the registered bridge contracts in the parent and child chains.
If the sub-bridge node is subscribed to the bridge contract pair, cross-chain value-transfer requests are handled automatically by the sub-bridge.

**Parameters**

| Name    | Type         | Description                                 |
| ------- | ------------ | ------------------------------------------- |
| account | 20-byte DATA | Address of bridge contract on child chain.  |
| account | 20-byte DATA | Address of bridge contract on parent chain. |

**Return Value**

| Name  | Type  | Description                                                 |
| ----- | ----- | ----------------------------------------------------------- |
| error | Error | `null` if the subscribing succeeds, Error object otherwise. |

**Example**

```javascript
> subbridge.subscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
> subbridge.subscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: already subscribed
```

## subbridge_unsubscribeBridge <a id="subbridge_unsubscribeBridge"></a>

The `subbridge_unsubscribeBridge` unsubscribes the sub-bridge from the bridge contracts in the parent and child chains.
If the sub-bridge is unsubscribed from the bridge contracts, cross-chain value transfer requests can not be handled by the sub-bridge.

**Parameters**

| Name    | Type         | Description                                 |
| ------- | ------------ | ------------------------------------------- |
| account | 20-byte DATA | Address of bridge contract on child chain.  |
| account | 20-byte DATA | Address of bridge contract on parent chain. |

**Return Value**

| Name  | Type  | Description                                                   |
| ----- | ----- | ------------------------------------------------------------- |
| error | Error | `null` if the unsubscribing succeeds, Error object otherwise. |

**Example**

```javascript
> subbridge.unsubscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
```

## subbridge_registerToken <a id="subbridge_registerToken"></a>

The `subbridge_registerToken` registers a pair of ERC-20 or 721 tokens with the bridge contracts.

**Parameters**

| Name    | Type         | Description                                 |
| ------- | ------------ | ------------------------------------------- |
| account | 20-byte DATA | Address of bridge contract on child chain.  |
| account | 20-byte DATA | Address of bridge contract on parent chain. |
| account | 20-byte DATA | Address of token contract on child chain.   |
| account | 20-byte DATA | Address of token contract on parent chain.  |

**Return Value**

| Name  | Type  | Description                                                  |
| ----- | ----- | ------------------------------------------------------------ |
| error | Error | `null` if the registration succeeds, Error object otherwise. |

**Example**

```javascript
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: token already exists
```

## subbridge_deregisterToken <a id="subbridge_deregisterToken"></a>

The `subbridge_deregisterBridge` deregisters already registered token pair from the bridge contracts.

**Parameters**

| Name    | Type         | Description                                 |
| ------- | ------------ | ------------------------------------------- |
| account | 20-byte DATA | Address of bridge contract on child chain.  |
| account | 20-byte DATA | Address of bridge contract on parent chain. |
| account | 20-byte DATA | Address of token contract on child chain.   |
| account | 20-byte DATA | Address of token contract on parent chain.  |

**Return Value**

| Name  | Type  | Description                                                    |
| ----- | ----- | -------------------------------------------------------------- |
| error | Error | `null` if the deregistration succeeds, Error object otherwise. |

**Example**

```javascript
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: invalid token pair
```

## subbridge_convertRequestTxHashToHandleTxHash <a id="subbridge_convertRequestTxHashToHandleTxHash"></a>

The `subbridge_convertRequestTxHashToHandleTxHash` returns the corresponding "handle value transfer transaction" hash in the opposite chain for the given "request value transfer transaction" hash.
"Request value transfer transaction" is a transaction initiated by a user, requesting a cross-chain value transfer.
"Handle value transfer transaction" is the transaction created by the sub-bridge to handle the value transfer request from the user.

**Parameters**

| Name | Type         | Description                                     |
| ---- | ------------ | ----------------------------------------------- |
| Hash | 32-byte DATA | Hash of a "request value transfer" transaction. |

**Return Value**

| Name | Type         | Description                                                                                                                   |
| ---- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Hash | 32-byte DATA | Hash of a "handle value transfer" transaction. zero hash means there is no corresponding "handle value transfer" transaction. |

**Example**

```javascript
> subbridge.convertRequestTxHashToHandleTxHash("0xae5604f8673098436ee4eaf1b453f1a395afccd6e8eb674c60edd63ebb047622")
"0x97493d1a91d65c149763209be6535efdacf8f1b50c99daa22abf06502010b2ee"
> subbridge.convertRequestTxHashToHandleTxHash("0xc585cfd1e7047b4faae69e62e77db192d8a339701b40d6ab4adb58453b934bec")
"0x0000000000000000000000000000000000000000000000000000000000000000"
```

## subbridge_listBridge <a id="subbridge_listBridge"></a>

The `subbridge_listBridge` returns the list of all bridge contract pairs that are registered (stored) in the sub-bridge.

**Parameters**

nonce

**Return Value**

| Name         | Type    | Description                                                              |                                                                             |
| ------------ | ------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| localAddress | account | 20-byte DATA                                                             | Address of the bridge contract on child (service) chain. |
| localAddress | account | 20-byte DATA                                                             | Address of the bridge contract on parent (main) chain.   |
| subscribed   | bool    | `true` if the pair of bridge contracts is subscribed, `false` otherwise. |                                                                             |

**Example**

```javascript
> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: true
}, {
    localAddress: "0x376b72abe1b29cace831bd3f5acdfa967814c9cd",
    remoteAddress: "0x53160735f7cc6ff75e48619f368bb94daff66a1b",
    subscribed: false
}, {
    localAddress: "0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a",
    remoteAddress: "0x23dab942822021bbd6d551ef51003208924877e4",
    subscribed: false
}]
```

## subbridge_getBridgeInformation <a id="subbridge_getBridgeInformation"></a>

The `subbridge_getBridgeInformation` returns the information of the given bridge contract.

**Parameters**

| Name    | Type         | Description                  |
| ------- | ------------ | ---------------------------- |
| account | 20-byte DATA | Address of a bridge contract |

**Return Value**

| Name             | Type         | Description                                                                                                             |
| ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| counterPart      | 20-byte DATA | Address of the counterpart bridge contract. (Not supported yet)                                      |
| isRunning        | bool         | `true` if the bridge contract is running, `false` otherwise.                                                            |
| isSubscribed     | bool         | `true` if the bridge contract is subscribed, `false` otherwise.                                                         |
| onServiceChain   | bool         | `true` if the bridge contact is on child (service) chain, `false` otherwise.                         |
| pendingEventSize | QUANTITY     | Number of pending "request value transfer" events generated by the bridge contracts, not handled yet by the sub-bridge. |
| requestNonce     | QUANTITY     | Request nonce of the bridge contract.                                                                                   |
| handleNonce      | QUANTITY     | Upper handle nonce of the bridge contract.                                                                              |
| lowerHandleNonce | QUANTITY     | Lower handle nonce of the bridge contract.                                                                              |

**Example**

```javascript
> subbridge.getBridgeInformation("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")
{
  counterPart: "0x0000000000000000000000000000000000000000",
  handleNonce: 0,
  lowerHandleNonce: 0,
  isRunning: true,
  isSubscribed: true,
  onServiceChain: true,
  pendingEventSize: 0,
  requestNonce: 0
}
```

## subbridge_txPendingCount <a id="subbridge_txPendingCount"></a>

The `subbridge_txPendingCount` returns the number of pending transactions in the bridge transaction pool.

**Parameters**

None

**Return Value**

| Type   | Description                                                        |
| ------ | ------------------------------------------------------------------ |
| Uint64 | The number of pending transactions in the bridge transaction pool. |

**Example**

```javascript
> subbridge.txPendingCount
2
```

## subbridge_txPending <a id="subbridge_txPending"></a>

The `subbridge_txPending` returns the list of pending transactions in the bridge transaction pool.

**Parameters**

None

**Return Value**

| Type        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| JSON string | List of pending transactions in the bridge transaction pool. |

**Example**

```javascript
> subbridge.txPending
{
  0xa057995175b93ee0d1bdfa54f078ad0f0116130b: [{
      from: "0xa057995175b93ee0d1bdfa54f078ad0f0116130b",
      gas: "0x186a0",
      gasPrice: "0x5d21dba00",
      hash: "0x284c8f5bc82ef987c3a14fc8dac7933beb528777745987ff790014441f26ca03",
      input: "0xf8a9a063f41a6ec8e2f8074c30fccf11f2b8479e7ebd8a0e5aa0c171623bc1f3812e33a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a0f845557d8dc2175974f29c2e9d12b1a57f634acaafdf56ae7033201a0796bedea056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a09109530b191b47ca3d91012faba70fcf307f13b030f19d932cab38f2c1ece7b78304157c",
      nonce: "0x41589",
      signatures: [{...}],
      type: "TxTypeChainDataAnchoring",
      typeInt: 72
  }, {
      from: "0xa057995175b93ee0d1bdfa54f078ad0f0116130b",
      gas: "0x186a0",
      gasPrice: "0x5d21dba00",
      hash: "0x4dd093916a419608091da28b5d7ffc6e34d894ddaac96328f1904bfef93a4ad0",
      input: "0xf8a9a05b0dd6cc938916e37b17b602690399987b4e8540a14a494626d85e947f721a10a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a063f41a6ec8e2f8074c30fccf11f2b8479e7ebd8a0e5aa0c171623bc1f3812e33a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a09109530b191b47ca3d91012faba70fcf307f13b030f19d932cab38f2c1ece7b78304157d",
      nonce: "0x4158a",
      signatures: [{...}],
      type: "TxTypeChainDataAnchoring",
      typeInt: 72
  }]
}
```
