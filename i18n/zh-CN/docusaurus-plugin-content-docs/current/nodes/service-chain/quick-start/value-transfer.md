# 跨链价值转移

本节将介绍如何使用提供的测试代码在 Kairos 网络和您的 ServiceChain 之间启用 ERC-20 值传输。
您将把 KAIA 添加到运营商账户，并部署桥接和 ERC-20 合约。
然后在 SCN 上注册合同地址。 您将测试 ERC-20 值的转移。

## 先决条件<a id="prerequisites"></a>

- 我们假定您已安装了 ServiceChain，并按照[连接至 Kairos](en-scn-connection.md)中的说明将 ServiceChain 连接至 Kairos EN。
- 克隆存储库 [servicechain-value-transfer-examples](https://github.com/klaytn/servicechain-value-transfer-examples)。
- 安装 `Node.js` (v14) 和 `npm` ([How to install](https://nodejs.org/en/download/package-manager/))
  - 本示例使用了两个软件包：axios 和 caver-js，它们都支持 v14。

## ERC-20 代币转让（一步式）<a id="erc-20-token-transfer-onestep"></a>

### 步骤 1：将 KAIA 添加到操作员账户。 <a id="step-1-add-kaia-to-the-operator-accounts"></a>

连接 SCN 并通过执行 `subbridge.parentOperator` 和 `subbridge.childOperator` 检查账户地址。

```
$ kscn attach --datadir ~/data
> subbridge.childOperator
"0x10221f7f9355017cd0c11444e7eecb99621bacce"
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

![](/img/nodes/sc-vt-add-kaia.png)

`subbridge.parentOperator` 和 `subbridge.childOperator` 必须有足够的 KAIA 来发送事务。 请注意，"subbridge.parentOperator "是 Kairos 网络上的账户，而 "subbridge.childOperator "是 ServiceChain 网络上的账户。
使用 [Kaia Toolkit](https://toolkit.kaia.io/account/) 创建测试账户，并从 [the faucet](https://faucet.kaia.io/) 获取测试 KAIA。 然后向`parentOperator`发送一些 KAIA。 childOperator "必须从 "homi "生成的测试账户获取 KAIA（[请参阅《EN 设置和 SCN 连接指南》](en-scn-connection.md)）。

```
$ kscn account import ~/homi-output/keys_test/testkey1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {80119c31cdae67c42c8296929bb4f89b2a52cec4}
```

```
$ kscn attach --datadir ~/data
> personal.unlockAccount("80119c31cdae67c42c8296929bb4f89b2a52cec4")
Unlock account 80119c31cdae67c42c8296929bb4f89b2a52cec4
Passphrase:
True
> kaia.sendTransaction({from:"80119c31cdae67c42c8296929bb4f89b2a52cec4", to:subbridge.childOperator, value: web3.toPeb(1000, "KAIA")})
"0x84caab84ebf0c4bb4ecf0a7849f1de3e479f1863a95f70c51047a7ca7bc64b33"
```

检查操作员账户是否有足够的余额。 您可以从安装子桥的 SCN 节点控制台进行如下查询：

```
> kaia.getBalance(subbridge.childOperator)
1e+21
> subbridge.childOperatorBalance
1e+21
> subbridge.parentOperatorBalance
1e+18
```

### 步骤 2：部署合同<a id="step-2-deploy-contracts"></a>

- 连接 SCN 并为合同部署准备节点环境。
  克隆存储库 [servicechain-value-transfer-examples](https://github.com/klaytn/servicechain-value-transfer-examples)。

![](/img/nodes/sc-vt-deploy.png)

在这一步中，我们将在父链和子链中部署桥接合约和令牌合约。
代币合约用于铸币/转移测试，桥接合约用于监听/处理价值转移请求。

```bash
$ git clone https://github.com/klaytn/servicechain-value-transfer-examples
$ cd servicechain-value-transfer-examples
$ npm install
$ cd erc20
```

用文本编辑器编辑 `bridge_info.json` 如下。

- 将 `child` 部分（ServiceChain 网络上的 SCN 节点）中的 `url` 替换为 SCN 节点 IP 和 `kscnd.conf` 中 `RPC_PORT` 的正确端口号。
- 用`homi`生成的`testkey1`替换`child.key`。
- 将 `child.operator` 设置为我们在上一步中查看的 `subbridge.childOperator` 地址。
- 将 "父节点 "部分（Kairos 网络上的 EN 节点）中的 "url "替换为 EN 节点 IP 和 "kend.conf "中 "RPC_PORT "的正确端口号。
- 将 `parent.key` 替换为上一步中使用 [Kaia Toolkit](https://toolkit.kaia.io/account/) 创建的测试账户的私人密钥。
- 将 `parent.operator` 设置为上一步的 \`subbridge.parentOperator'。

```
{
     "child" : {
         "url": "http://192.168.0.1:7551",
         "key": "0x66cb283353589a10866b58d388e9d956e5a9c873a8c78fa4411d460c19c494ea",
         "operator": "0x10221f7f9355017cd0c11444e7eecb99621bacce"
     },
     "parent" : {
         "url": "http://192.168.0.5:8551",
         "key": "0x26f4b5ac42ceabcfd3b23a991fdbfc792d10ce700a99582fdf9185a8f163b790",
         "operator": "0x3ce216beeafc62d20547376396e89528e1d778ca"
     }
 }
```

运行命令 `node erc20-deploy.js`，执行令牌部署。 该脚本同时部署桥接合约和令牌合约，并输出 API 使用情况以初始化桥接对。

```
$ node erc20-deploy.js
------------------------- erc20-deploy START -------------------------
> info.bridge: 0xEa024d8101E112330f2d7B1a7e7932034E206721
> info.token: 0xbE641028610F628835C36F12bE62d54d74308D70
> info.bridge: 0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463
> info.token: 0x52F8Fa79Fa6D37b18b7AC8f9Ca835373f3C9270f
> subbridge.registerBridge("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463")
> subbridge.subscribeBridge("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463")
> subbridge.registerToken("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463", "0xbE641028610F628835C36F12bE62d54d74308D70", "0x52F8Fa79Fa6D37b18b7AC8f9Ca835373f3C9270f")
------------------------- erc20-deploy END -------------------------
```

### 步骤 3：令牌转移<a id="step-3-token-transfer"></a>

![](/img/nodes/sc-vt-transfer.png)

使用 `node erc20-transfer-1step.js` 命令执行令牌转移。 这种一步式令牌传输需要修改 ERC-20 令牌的实现。 如果您不想修改代币合约，或者您已经部署了代币合约，请参考 [ERC-20 代币转移（两步法）](#erc-20-token-transfer-twost step)。

```
$ node erc20-transfer-1step.js
------------------------- erc20-transfer-1step START -------------------------
alice balance: 0
requestValueTransfer..
alice balance: 100
------------------------- erc20-transfer-1step END -------------------------
```

如果结果是 `alice balance: 100`，则表示已成功执行。

## ERC-20 令牌传输（两步法）<a id="erc-20-token-transfer-twostep"></a>

运行 erc20-transfer-2step.js，查看两步转移示例。 通过这个两步代币转移示例，可以使用未经修改的 ERC-20 代币合约。
两步转移包括两次函数调用：(1) 先批准桥接合同，然后 (2) 调用合同函数 "requestERC20Transfer()"。
由于我们已经部署了桥接合约和令牌合约，因此本节不再部署合约。 如果没有部署，则必须先部署。 您可以使用 `node erc20-deploy.js` 部署合同。

```
$ node erc20-transfer-2step.js
> ------------------------- erc20-transfer-2step START -------------------------
> alice balance: 100
> requestValueTransfer..
> alice balance: 200
------------------------- erc20-transfer-2step END -------------------------
```

## 通过 ERC-20 接口进行 KIP-7 令牌传输（两步法）<a id="kip-7-token-transfer-via-erc-20-interface-two-step"></a>

[KIP-7](https://kips.kaia.io/KIPs/kip-7)是与 ERC-20 兼容的令牌标准。 我们可以向 KIP-7 令牌合约调用 "requestERC20Transfer() "函数，在父链和子链之间转移 KIP-7 令牌。
在通过 ERC-20 接口发送 KIP-7 令牌的情况下，我们会调用 "approve() "函数，允许网桥代表交易发送方发送令牌。 然后调用`requestERC20Transfer()`函数。
下面的命令将部署桥接合同和 KIP-7 合同。

```
$ node kip7-deploy.js
> ------------------------- kip7-deploy START -------------------------
> info.bridge: 0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE
> info.token: 0xE0E2fC6C7d1eB069153E0c12a4C87B01586b39e7
> info.bridge: 0xEb502159A4B4E876B1cb423f250DCC0d276e01b6
> info.token: 0xd4f02Ca1d49674056A9ec78fbBDc9e1e97726A4F
> subbridge.registerBridge("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6")
> subbridge.subscribeBridge("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6")
> subbridge.registerToken("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6", "0xE0E2fC6C7d1eB069153E0c12a4C87B01586b39e7", "0xd4f02Ca1d49674056A9ec78fbBDc9e1e97726A4F")
------------------------- kip7-deploy END -------------------------
```

下面的命令是使用 "requestERC20Transfer() "使用 ERC-20 接口发送 KIP-7 令牌的示例。

```
$ node kip7-transfer-2step-erc20-interface.js
> ------------------------- kip7-transfer-2step-erc20-interface START -------------------------
> alice balance: 0
> requestValueTransfer..
> alice balance: 100
> ------------------------- kip7-transfer-2step-erc20-interface END -------------------------
```

其他情况请参阅 [service-chain-value-transfer-example](https://github.com/klaytn/servicechain-value-transfer-examples) 。

## 对 KIP-7 和 KIP-17 的本地支持（待实施）<a id="native-support-for-kip-7-and-kip-17-to-be-implemented"></a>

目前，Kaia 团队提供的桥接合约仅支持 "requestERC20Transfer() "和 "requestERC721Transfer() "令牌传输。 KIP-7 和 KIP-17 的相应请求功能将很快得到支持。 在实施之前，如上图所示，您可以使用 ERC-20 接口传输 KIP-7 令牌。

## ERC-721、KIP-17 和 KAIA 的价值转移<a id="value-transfer-for-erc721-kip17-and-klay"></a>

ERC-721、KIP-17 和 KAIA 的工作流程与上述相同。 [`erc721`](https://github.com/klaytn/servicechain-value-transfer-examples/tree/main/erc721)、[`kip17`](https://github.com/klaytn/servicechain-value-transfer-examples/tree/main/kip17) 和 [`kaia`](https://github.com/klaytn/servicechain-value-transfer-examples/tree/main/klay)目录包含相应的示例源代码。
