# Transfer Value

As explained in the Klaytn design section, Service Chain supports value (KLAY, ERC-20, and ERC-721) transfer between parent chain & child chain.
This page shows how to enable the value-transfer feature in SCN.

After setting up the EN and SCN, the following procedure is required to enable value-transfer between chains.

1. Check the addresses of the bridge operator accounts and add KLAY to the bridge operator accounts.
2. Deploy the bridge contract to the parent/child chains.
3. Deploy a token (ERC-20 or 721) contract to the parent/child chains. (If you just need KLAY-transfer, you can skip step 3 & 4.)
4. Register the token contracts with the bridge contracts on the parent/child chains.
5. Subscribe to the bridge contracts on the parent/child chains.

Before we follow the steps, let's take a look at the high-level system architecture to understand the behind of the mechanism.

## System Architecture <a id="system-architecture"></a>

Figure 1 shows the system architecture of the Service Chain with bridge/token contracts and bridge nodes.

Below contracts communicate with each other via main/sub-bridge to process user's value transfer requests.

- Bridge contract
- ERC-20 contract (if needed)
- ERC-721 contract (if needed)

![Figure 1. Service chain architecture](/img/nodes/sc_arch.png)

## Bridge Operator Account <a id="bridge-operator-account"></a>

For ServiceChain, there are two operator accounts: parent chain bridge operator account, service chain bridge operator account. Each operator account is used to sign transactions.
If the transaction moves the value to the parent chain, the parent chain bridge operator account signs the transaction. To the child chain, the child chain bridge operator account is used.
If a user submits a "request value transfer" transaction, the Sub-bridge creates a "handle value transfer" transaction signed by the bridge operator account.
Therefore, the parent chain bridge operator needs enough KLAY in their balance to pay the transaction fee to the parent chain.
If the service chain's gas price is set to non-zero, the service chain bridge operator should have KLAY in their balance as well.

### Keystore and Password file <a id="keystore-and-password-file"></a>

When SCN is booted, the keystore files and password files for the parent/child operators are automatically generated if their keys don't exist.
If you want to use a specific account as an operator, you can provide the key. Place the below files in the designated path before booting the SCN.
The password file should have a password string of the keystore file.
The password file name should be the account address of the corresponding keystore file.

**files**

- keystore file : `UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b`
- password file : `0x2eD72a9D7fe5da7672fD21567e07302431649B0B`

**file path**

- Parent chain bridge operator : $datadir/parent_bridge_account
- Child chain bridge operator : $datadir/child_bridge_account

```javascript
> pwd
/$dataDIR/child_bridge_account

> ls
0x2eD72a9D7fe5da7672fD21567e07302431649B0B
UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b

> cat 0x2eD72a9D7fe5da7672fD21567e07302431649B0B
%S~f5qqM38cB47jL%

> cat UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b
{"address":"2ed72a9d7fe5da7672fd21567e07302431649b0b","crypto":{"cipher":"aes-128-ctr","ciphertext":"6486509e8158bf4984608cbc5562cf2c9a27cd988a98e543731b39251144e633","cipherparams":{"iv":"96d7e5b6a936278c0797faae6cb3d903"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"8928ba41b8228af19390ec881c51452fa3ea973ad2c253ca0f5bc9197a8b24c4"},"mac":"9c8ec63694c20a473e0ea33840e7d16e9f1a20afc52b3244b703a3ac0a66cfa3"},"id":"9ae10527-7fd3-4aae-a4eb-316af211494e","version":3}
```

### Check Bridge Operator Addresses <a id="check-bridge-operator-addresses"></a>

If you run SCN successfully, you can check the parent/child chain bridge operator address using RPC API like the following.

```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

You can refer to the [subbridge API](../../../references/json-rpc/subbridge/parent-operator) for more details.

### Send KLAY to Bridge Operators <a id="send-klay-to-bridge-operators"></a>

Like anchoring, the parent chain bridge operator needs KLAY to make a value-transfer transaction.
If the service chain's gas price is set to non-zero, the service chain bridge operator should have KLAY in their balance as well.

After topping up the operator accounts, you can check their balances like below.

**Parent chain bridge operator**

```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

 instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.parentOperatorBalance
1e+50
```

**Child chain bridge operator**

```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

 instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.childOperatorBalance
1e+50
```

## Bridge Contract <a id="bridge-contract"></a>

For the cross-chain value transfer, a bridge contract should be deployed to the parent/child chains.
Users can request a KLAY transfer to the bridge contract to send their KLAY to the other chain.
Additionally, if token contracts are registered in the bridge contracts, bridge contracts can handle the token transfer between parent and child chains.

### Deployment <a id="deployment"></a>

Sub-bridge provides a bridge contract deployment API. You can deploy bridge contracts to both chains using a single RPC call as below.
Before doing this, you should have connected main-bridge and sub-bridge. Please refer to [Bridge Configuration](bridge-configuration.md) to get detailed guideline.

```javascript
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.deployBridge()
["0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5"]

> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: false
}]
```

You can refer to the [subbridge API](../../..references/json-rpc/subbridge/deploy-bridge) for more details.

`subbridge_listBridge` shows the bridge contract addresses and their subscription status.
Sub-bridge saves the list of bridge contract addresses in a file. On reboot, sub-bridge reloads the bridge contract list from the file.

### Subscribing <a id="subscribing"></a>

After deploying the bridge contract, you should make the sub-bridge subscribe to the deployed bridge contracts to enable value transfer. This can be done using another RPC API call, `subbridge_subscribeBridge`.

```javascript
> subbridge.subscribeBridge("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5")
null

> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: true
}]
```

### Checking Status <a id="checking-status"></a>

Once subscribed, SCN processes users' "request value transfer" transactions automatically.
This section explains how to check the bridge contract status.

In a bridge contact, there are two nonces, `requestNonce` and `handleNonce`.
Unlike in-chain transactions, the sub-bridge can handle a higher nonce request before the lower ones.

- requestNonce : the number of user's "cross-chain value transfer" requests made to this bridge contract.
- handleNonce : the highest nonce that the sub-bridge handled.
- lowerHandleNonce : the lowest nonce that the sub-bridge should handle.

Therefore, if nonces are updated as follows, we can say the cross-chain value-transfers are processed correctly.

- "handleNonce" and "lowerHandleNonce" of the parent chain bridge contract keep approaching to the "requestNonce" of the child chain bridge contract.
- "handleNonce" and "lowerHandleNonce" keep approaching to the "requestNonce" of the parent chain bridge contract.

If "handleNonce" equals to the "requestNonce" of the counterpart bridge contract, and the "lowerHandleNonce" is greater than "handleNonce" by 1, then users' requests were all processed.

### Log <a id="log"></a>

Below is a typical log output from a SCN during normal operation.
Every 1 second, the status of bridge contracts are printed.

```
INFO[10/16,19:37:40 +09] [45] VT : Parent -> Child Chain                request=8699 handle=4826 lowerHandle=4826 pending=3873
INFO[10/16,19:37:40 +09] [45] VT : Child -> Parent Chain                request=7894 handle=4207 lowerHandle=4207 pending=3687
```

This log shows the request, handle, lowerHandle, and pending nonces.
Each value means like below

- request : the sum of value-transfer request nonce(s) of all subscribed bridge contract(s).
- handle : the sum of upper handle nonce(s) of all subscribed bridge contract(s).
- lowerHandle : the sum of lower handle nonce(s) of all subscribed bridge contract(s).
- pending : the difference between `request` and `lowerHandle`.

### RPC API <a id="rpc-api"></a>

You can check the status of a bridge contract like below.
You can refer to the [subbridge API](../../../references/json-rpc/subbridge/get-bridge-information) for more details.

```javascript
> subbridge.getBridgeInformation("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")
{
  counterPart: "0x22c41ae528627b790233d2e59ea520be12350eb5",
  handleNonce: 0,
  lowerHandleNonce: 0,
  isRunning: true,
  isSubscribed: true,
  onServiceChain: true,
  pendingEventSize: 0,
  requestNonce: 0
}
```

## Token Contract (ERC-20/721) <a id="token-contract-erc-20-721"></a>

Service Chain supports ERC-20/721 value transfer as well.
To support them, service chain compatible ERC-20/721 token contracts should be deployed on both parent and child chains.
For the ERC-20/721 token contract code,
you can refer to the [Token standard](../../../build/smart-contracts/token-standard.md).

### Deployment  <a id="deployment"></a>

SCN does not support an API to deploy ERC-20/721 tokens yet. You need to deploy the tokens via caver-js.
When you deploy an ERC-20/721 contract, you should use the correct bridge operator account. Use the parent operator account for the main chain deploy, and the child operator for the service chain deploy.
If a token contract was deployed with a wrong account, value transferring will not work and you need to deploy the token contract again with the correct account.

### Register  <a id="register"></a>

After deploying token contracts, you should register the token contracts with the bridge contracts on the parent/child chains like below.

```javascript
> subbridge.registerToken("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5", "0x376b72abe1b29cace831bd3f5acdfa967814c9cd", "0x53160735f7cc6ff75e48619f368bb94daff66a1b")
null
```

This command registers the child chain token ("0x376b72abe1b29cace831bd3f5acdfa967814c9cd") with the child chain bridge contract ("0x27caeba831d98b5fbb1d81ce0ed20801702f443a"). And the parent chain token ("0x53160735f7cc6ff75e48619f368bb94daff66a1b") with the parent chain bridge contract ("0x22c41ae528627b790233d2e59ea520be12350eb5").

You can refer to the [Service Chain API](../../../references/json-rpc/subbridge/register-token) for more details.

## Request Value Transfer <a id="request-value-transfer"></a>

This section explains the contract methods that will be invoked by a user to request a value transfer.
Request transaction does not allow zero value (KLAY/ERC-20).

### KLAY transfer <a id="klay-transfer"></a>

Users can make a "request value transfer" transaction to the **bridge contract** using the below methods.

#### fallback <a id="fallback"></a>

If a user calls the fallback function of the bridge, this requests a KLAY transfer to the same account address as the requesting user in the counterpart chain.

```solidity
function () external payable;
```

#### requestKLAYTransfer <a id="requestklaytransfer"></a>

If a user calls this function with `_to`, this requests a KLAY transfer to `_to` address in the counterpart chain.

```solidity
function requestKLAYTransfer(address _to, uint256 _value, bytes calldata _extraData) external payable
```

### ERC-20 transfer <a id="erc-20-transfer"></a>

#### 2-Step request via Bridge contract <a id="2-step-request-via-bridge-contract"></a>

Users can make a "request value transfer" transaction to the Bridge contract using the below method after [approving](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve) the token to the Bridge contract.

```solidity
function requestERC20Transfer(address _tokenAddress, address _to, uint256 _value,uint256 _feeLimit,bytes memory _extraData) external
```

#### 1-Step request via ERC-20 contract <a id="1-step-request-via-erc-20-contract"></a>

Users can make a "request value transfer" transaction directly to the **ERC-20 contract** using the below method without approving.
The ERC-20 contract should implement the function, then.

```solidity
function requestValueTransfer(uint256 _amount, address _to, uint256 _feeLimit, bytes calldata _extraData) external
```

### ERC-721 transfer <a id="erc-721-transfer"></a>

#### 2-Step request via Bridge contract <a id="2-step-request-via-bridge-contract"></a>

Users can make a "request value transfer" transaction to the Bridge contract using the below method after [approving](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve) the token to the Bridge contract.

```solidity
function requestERC721Transfer(address _tokenAddress, address _to, uint256 _tokenId, bytes memory _extraData) external
```

#### 1-Step request via ERC-721 contract <a id="1-step-request-via-erc-721-contract"></a>

Users can make a "request value transfer" transaction directly to the **ERC-721 contract** using the below method without approving.
The ERC-721 contract should implement the function, then.

```solidity
function requestValueTransfer(uint256 _uid, address _to) external
```

### onERC721Received() <a id="unsupported-onERC721Received"></a>

The ERC-721 standard has the [onERC721Received](https://eips.ethereum.org/EIPS/eip-721) callback function.
The `onERC721Received()` works with `safeTransferFrom()` function, but the current bridge contract implementation uses `transferFrom()`, which means the `onERC721Recieved()` is not expected to be called.

Alternatively, a further action like `onERC721Recieved()` should be implemented in another way such as event listening (e.g., `event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)`).

## Value Transfer Recovery

Value transfer request may be fail for a number of reasons. Say you requested KLAY transfer from subbridge to mainbridge or from mainbridge to subbridge.
In that case, the bridge contract on the receiver side must have enough KLAY than the requested amount of KLAY. If not, the transfer would fail without error notification in the return value.
A feature of value transfer recovery finds unhandled events and insert them into event pool again in a given interval, which means the failed transaction can be succeed again when the counterpart bridge can successfully handle that event.
In case of the above example, the failed transaction would be eventually handled by value transfer recovery when the counterpart bridge has enough KLAY.
In order to set the value transfer recovery as default, you need to set two properties:

```
SC_VTRECOVERY=1
SC_VTRECOVERY_INTERVAL=5
```

The value transfer recovery runs automatically by set `SC_VTRECOVERY=1`. `SC_VTRECOVERY_INTERVAL` means an interval how often the value transfer recovery is executed.

## Collecting Fee for KLAY/ERC-20 transfer <a id="collecting-fee-for-klay-erc-20-transfer"></a>

In ServiceChain, there is a fee collecting feature for KLAY/ERC-20 transfers.

**To be updated soon.**

## Customizing your Bridge Contract  <a id="customizing-your-bridge-contract"></a>

In ServiceChain, you can use your own customized Bridge contract that inherits from the original Bridge contract for your own unique service.
This section explains how to customize the Bridge contract and presents the example code.

**It will be updated soon.**
