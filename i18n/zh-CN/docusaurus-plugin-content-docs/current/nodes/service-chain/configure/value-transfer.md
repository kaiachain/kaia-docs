# 转让价值

如 Kaia 设计部分所述，服务链支持父链和子链之间的价值（KAIA、ERC-20 和 ERC-721）转移。
本页说明如何在 SCN 中启用数值传递功能。

设置 EN 和 SCN 后，需要执行以下步骤才能在链之间进行价值转移。

1. 检查网桥操作员账户的地址，并将 KAIA 添加到网桥操作员账户。
2. 将桥接合约部署到父链/子链上。
3. 向父/子链部署代币（ERC-20 或 721）合约。 (如果您只需要 KAIA 转机，则可跳过步骤 3 和 4）。
4. 在父链/子链上将代币合约与桥接合约进行注册。
5. 订阅父链/子链上的桥接合约。

在按步骤操作之前，让我们先来看看高层系统架构，以了解该机制的背后。

## 系统架构<a id="system-architecture"></a>

图 1 显示了带有桥梁/令牌合约和桥梁节点的服务链系统架构。

下面的合约通过主桥/子桥相互通信，处理用户的价值转移请求。

- 桥牌合约
- ERC-20 合同（如需要）
- ERC-721合同（如需要）

![图 1. Service chain architecture](/img/nodes/sc_arch.png)

## 桥梁操作员账户<a id="bridge-operator-account"></a>

对于 ServiceChain，有两个操作员账户：父链桥操作员账户和服务链桥操作员账户。 每个操作员账户都用于签署交易。
如果交易将值转移到父链，则父链桥接操作员账户会签署该交易。 对子链而言，使用的是子链桥操作员账户。
如果用户提交了 "请求价值转移 "交易，子桥就会创建一个由桥操作员账户签署的 "处理价值转移 "交易。
因此，母链桥接运营商的余额中需要有足够的 KAIA 来向母链支付交易费。
如果服务链的天然气价格设置为非零，则服务链桥运营商的余额中也应包含 KAIA。

### 密钥存储和密码文件<a id="keystore-and-password-file"></a>

启动 SCN 时，如果父/子操作符的密钥不存在，则会自动生成其密钥存储文件和密码文件。
如果要使用特定账户作为操作员，可以提供密钥。 启动 SCN 前，将以下文件放到指定路径。
密码文件应包含密钥存储文件的密码字符串。
密码文件名应为相应密钥存储文件的账户地址。

**文件**

- keystore file : `UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b`
- 密码文件 : `0x2eD72a9D7fe5da7672fD21567e07302431649B0B`

**文件路径**

- 父链桥操作员 : $datadir/parent_bridge_account
- 子链桥操作员 : $datadir/child_bridge_account

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

### 检查桥接运营商地址<a id="check-bridge-operator-addresses"></a>

如果成功运行 SCN，则可以使用 RPC API 检查父/子链桥操作符地址，如下所示。

```
$ kscn attach --datadir ~/kscnd_home
欢迎来到 Kaia JavaScript 控制台！

instance：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

详细信息请参阅 [subbridge API](../../../references/json-rpc/subbridge/parent-operator)。

### 向桥梁运营商发送 KAIA<a id="send-kaia-to-bridge-operators"></a>

与锚定一样，母链桥运营商需要 KAIA 进行价值转移交易。
如果服务链的天然气价格设置为非零，则服务链桥运营商的余额中也应包含 KAIA。

给运营商账户充值后，您可以像下面这样查看账户余额。

**家长链桥操作员**

```
$ kscn attach --datadir ~/kscnd_home
欢迎来到 Kaia JavaScript 控制台！

 instance：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.parentOperatorBalance
1e+50
```

**儿童链桥操作员**

```
$ kscn attach --datadir ~/kscnd_home
欢迎来到 Kaia JavaScript 控制台！

 instance：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.childOperatorBalance
1e+50
```

## 桥牌合约<a id="bridge-contract"></a>

为实现跨链价值转移，应在父链/子链上部署桥梁合同。
用户可以向桥接合约申请 KAIA 转移，将其 KAIA 发送到另一条链上。
此外，如果在桥接合约中注册了代币合约，桥接合约可以处理父链和子链之间的代币转移。

### 部署<a id="deployment"></a>

子桥提供桥接合同部署应用程序接口。 您可以使用单个 RPC 调用将桥接合约部署到两个链上，如下所示。
在此之前，您应该已经连接了主桥和副桥。 请参阅 [网桥配置](bridge-configuration.md) 获取详细指南。

```javascript
$ kscn attach --datadir ~/kscnd_home
欢迎来到 Kaia JavaScript 控制台！

instance：Kaia/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.deployBridge()
["0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5"].

> subbridge.listBridge
[{
    localAddress："0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress："0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: false
}]
```

更多详情可参考 [subbridge API](../../...reference/json-rpc/subbridge/deploy-bridge)。

`subbridge_listBridge` 显示网桥合同地址及其订阅状态。
子桥将桥接器合同地址列表保存在文件中。 重启时，子桥会从文件中重新加载桥接器合同列表。

### 订阅<a id="subscribing"></a>

部署桥接器合同后，应让子桥接器订阅已部署的桥接器合同，以实现价值转移。 这可以通过另一个 RPC API 调用 "subbridge_subscribeBridge "来实现。

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

### 检查状态<a id="checking-status"></a>

订阅后，SCN 将自动处理用户的 "请求价值转移 "交易。
本节介绍如何检查桥接合同状态。

在桥接联系人中，有两个 nonces，即 "requestNonce "和 "handleNonce"。
与链内交易不同，子桥可以先处理较高的 nonce 请求，然后再处理较低的请求。

- requestNonce：用户向该桥接合约提出的 "跨链价值转移 "请求的次数。
- handleNonce：子桥处理过的最高 nonce。
- lowerHandleNonce：子桥应处理的最低 nonce。

因此，如果非ces 按如下方式更新，我们就可以说跨链值传输得到了正确处理。

- 父链桥合约的 "handleNonce "和 "lowerHandleNonce "不断接近子链桥合约的 "requestNonce"。
- "handleNonce "和 "lowerHandleNonce "不断接近父链桥合约的 "requestNonce"。

如果 "handleNonce "等于对应桥接合约的 "requestNonce"，且 "lowerHandleNonce "比 "handleNonce "大 1，则用户的请求已全部处理完毕。

### 日志<a id="log"></a>

以下是 SCN 正常运行时的典型日志输出。
每 1 秒钟打印一次桥牌合约状态。

```
INFO[10/16,19:37:40 +09] [45] VT : Parent -> Child Chain                request=8699 handle=4826 lowerHandle=4826 pending=3873
INFO[10/16,19:37:40 +09] [45] VT : Child -> Parent Chain                request=7894 handle=4207 lowerHandle=4207 pending=3687
```

该日志显示了请求、句柄、lowerHandle 和待处理 nonces。
每个值的含义如下

- request：所有已认购桥接合约的价值转移请求 nonce 的总和。
- handle：所有已签订的桥接合同的上层句柄非密码总和。
- lowerHandle：所有已订阅桥接合约的下层句柄非采样字符串的总和。
- pending："request "和 "lowerHandle "的区别。

### RPC API <a id="rpc-api"></a>

您可以像下面这样查看桥牌合约的状态。
详细信息请参阅 [subbridge API](../../../references/json-rpc/subbridge/get-bridge-information)。

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

## 代币合约（ERC-20/721）<a id="token-contract-erc-20-721"></a>

服务链还支持 ERC-20/721 价值转移。
为支持它们，应在父链和子链上部署与服务链兼容的 ERC-20/721 令牌合约。
关于 ERC-20/721 令牌合约代码，
，您可以参考 [Token standard](../../../build/smart-contracts/token-standard.md).

### 部署 <a id="deployment"></a>

SCN 尚不支持部署 ERC-20/721 代币的 API。 您需要通过 caver-js 部署令牌。
部署 ERC-20/721 合约时，应使用正确的桥接运营商帐户。 使用父操作员账户部署主链，使用子操作员账户部署服务链。
如果使用错误的账户部署了代币合约，价值转移将不起作用，您需要使用正确的账户重新部署代币合约。

### 注册 <a id="register"></a>

部署令牌合约后，您应该在父链/子链上将令牌合约与桥接合约注册在一起，如下所示。

```javascript
> subbridge.registerToken("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5", "0x376b72abe1b29cace831bd3f5acdfa967814c9cd", "0x53160735f7cc6ff75e48619f368bb94daff66a1b")
null
```

该命令将子链令牌（"0x376b72abe1b29cace831bd3f5acdfa967814c9cd"）与子链桥合约（"0x27caeba831d98b5fbb1d81ce0ed20801702f443a"）进行注册。 以及父链令牌（"0x53160735f7cc6ff75e48619f368bb94daff66a1b"）和父链桥接合约（"0x22c41ae528627b790233d2e59ea520be12350eb5"）。

详细信息请参阅 [Service Chain API](../../../references/json-rpc/subbridge/register-token)。

## 申请价值转移<a id="request-value-transfer"></a>

本节将解释用户在请求价值转移时将调用的合约方法。
请求交易不允许零值（KAIA/ERC-20）。

### KAIA 转机<a id="kaia-transfer"></a>

用户可使用以下方法向**桥合约**进行 "要求价值转移 "交易。

#### fallback <a id="fallback"></a>

如果用户调用网桥的回退功能，则会请求向对应链中与请求用户相同的账户地址进行 KAIA 转账。

```solidity
function () external payable;
```

#### 请求 KAIATransfer<a id="requestklaytransfer"></a>

如果用户使用 `_to`调用该函数，则会请求向对应链中的 `_to`地址进行 KAIA 传输。

```solidity
function requestKAIATransfer(address _to, uint256 _value, bytes calldata _extraData) external payable
```

### ERC-20 转让<a id="erc-20-transfer"></a>

#### 通过桥梁合同提出 2 步申请<a id="2-step-request-via-bridge-contract"></a>

用户在[批准](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve)桥接合约的令牌后，可使用以下方法向桥接合约进行 "请求价值转移 "交易。

```solidity
function requestERC20Transfer(address _tokenAddress, address _to, uint256 _value,uint256 _feeLimit,bytes memory _extraData) external
```

#### 通过 ERC-20 合同提出 1 步申请<a id="1-step-request-via-erc-20-contract"></a>

用户可以使用以下方法直接向**ERC-20 合同**进行 "要求价值转移 "交易，而无需审批。
那么，ERC-20 合同就应该实现这一功能。

```solidity
function requestValueTransfer(uint256 _amount, address _to, uint256 _feeLimit, bytes calldata _extraData) external
```

### ERC-721 转移<a id="erc-721-transfer"></a>

#### 通过桥梁合同提出 2 步申请<a id="2-step-request-via-bridge-contract"></a>

用户在[批准](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve)桥接合约的令牌后，可使用以下方法向桥接合约进行 "请求价值转移 "交易。

```solidity
function requestERC721Transfer(address _tokenAddress, address _to, uint256 _tokenId, bytes memory _extraData) external
```

#### 通过 ERC-721 合同提出 1 步申请<a id="1-step-request-via-erc-721-contract"></a>

用户可以使用以下方法直接向**ERC-721 合同**进行 "申请价值转移 "交易，而无需审批。
那么，ERC-721 合同就应该实现该功能。

```solidity
function requestValueTransfer(uint256 _uid, address _to) external
```

### onERC721Received() <a id="unsupported-onERC721Received"></a>

ERC-721 标准有 [onERC721Received](https://eips.ethereum.org/EIPS/eip-721) 回调函数。
onERC721Received() "与 "safeTransferFrom() "函数一起工作，但当前的网桥合约实现使用 "transferFrom()"，这意味着 "onERC721Recieved() "预计不会被调用。

另外，"onERC721Recieved() "之类的进一步操作应以另一种方式实现，如事件监听（例如，"event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)\` ）。

## 价值转移回收

价值转移请求可能因多种原因而失败。 假设您要求从副桥到主桥或从主桥到副桥的 KAIA 转机。
在这种情况下，接收方的桥接合约必须比请求的 KAIA 数量多。 否则，传输将失败，返回值中不会有错误提示。
价值转移恢复功能会发现未处理的事件，并在给定的时间间隔内将其重新插入事件池，这意味着当对应的桥接器能成功处理该事件时，失败的事务就能再次成功。
在上述例子中，当对应的桥接器有足够的 KAIA 时，失败的交易最终将通过价值转移恢复来处理。
要将值传输恢复设置为默认值，需要设置两个属性：

```
SC_VTRECOVERY=1
SC_VTRECOVERY_INTERVAL=5
```

通过设置 `SC_VTRECOVERY=1` 可以自动运行数值传送恢复。 SC_VTRECOVERY_INTERVAL "表示执行值传递恢复的间隔时间。

## 收取 KAIA/ERC-20 转移费用<a id="collecting-fee-for-kaia-erc-20-transfer"></a>

在 ServiceChain 中，KAIA/ERC-20 转账具有收费功能。

\*\*即将更新。

## 定制您的桥牌合约 <a id="customizing-your-bridge-contract"></a>

在 ServiceChain 中，您可以使用自己定制的桥接器合同，该合同继承自原始桥接器合同，用于自己的独特服务。
本节将解释如何定制 Bridge 合同，并介绍示例代码。

\*\*即将更新。

