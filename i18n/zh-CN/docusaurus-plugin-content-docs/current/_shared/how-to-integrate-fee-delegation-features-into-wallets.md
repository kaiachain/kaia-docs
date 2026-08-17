# 如何在钱包中集成费用委托功能

得益于Kaia的[原生费用委托](/build/transactions/fee-delegation)功能，用户可以在去中心化应用（dApp）上享受零gas费的交易体验。 要实现这一点，**钱包**必须支持手续费委托类交易，并执行**发件人签名**。

:::info 本指南的适用对象

本指南面向**钱包提供商**。 您的钱包仅实现了发件方功能：

- 使用用户的密钥对委托支付交易进行签名
- 将 `senderTxHashRLP` 返回给 dApp

费用支付方的签名和广播操作**不**属于钱包的职责范围。 这些操作由 dApp 后端或托管服务（例如 [Kaia 手续费委托服务](/build/tutorials/integrate-fee-delegation-service)）负责处理。

:::

## 端到端流程（角色）

费用授权总是涉及相同的参与方。 下图显示了完整的路径；后面的章节将复用该路径，并突出显示正在讨论的参与者。

<FeeDelegationFlow></FeeDelegationFlow>

| 步骤 | 谁         | 责任                                             |
| -- | --------- | ---------------------------------------------- |
| 1  | **钱包（你）** | 对该委托手续费交易进行签名，并返回 `senderTxHashRLP`。 **请勿**广播。 |
| 2  | **dApp**  | 将 `senderTxHashRLP` 转发给手续费支付方。                 |
| 3  | **缴费人**   | 再次签名，并将已完全签名的交易提交给Kaia。                        |

本页面详细介绍了**步骤 1**。 步骤 2–3 的总结见文末，其中附有完整指南的链接。

## 钱包必须实现的功能

这是流程中的**第1步**——这是你的钱包必须实现的唯一部分。

<FeeDelegationFlow highlight="wallet"></FeeDelegationFlow>

为了支持手续费委托，请在您的钱包中实现以下功能：

1. 将 [Kaia SDK](https://github.com/kaiachain/kaia-sdk)（例如，`@kaiachain/ethers-ext`）添加到钱包代码库中。
2. 当钱包收到一笔委托手续费的交易请求（通常通过 `kaia_signTransaction` 实现）时，应使用 Kaia SDK 并采用用户的密钥对其进行签名。
3. 将 `senderTxHashRLP` 返回给 dApp。 请**不要**从钱包向 Kaia 节点发送交易。

:::tip 钱包提供商检查清单

- 支持带手续费委托的交易类型（价值转移、合约执行以及其他必要类型）
- 使用钱包管理的\*\*发件人（用户）\*\*密钥进行签名
- 将 `senderTxHashRLP` 返回给 dApp
- **请勿**广播仅由发件人签名的交易

:::

### 示例：签署一项委托收费的价值转移

请在钱包的签名路径中使用此模式（例如，在 `kaia_signTransaction` 处理程序内部）。 在生产环境中，应使用钱包管理的用户密钥（而非硬编码的私钥），并将 `senderTxHashRLP` 返回给调用方。

```javascript
const ethers = require("ethers6");
const { Wallet, TxType, parseKaia } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const receiverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";
const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

async function main() {
  const tx = {
    type: TxType.FeeDelegatedValueTransfer,
    from: senderAddr,
    to: receiverAddr,
    value: parseKaia("0.01"),
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

### 示例：签署一项授权收费合同的交互

```javascript
const ethers = require("ethers6");
const { Wallet, TxType } = require("@kaiachain/ethers-ext/v6");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new ethers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");

const senderWallet = new Wallet(senderPriv, provider);

const contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";
const abi = ["function setNumber(uint256 newNumber)"];

async function main() {
  const contract = new ethers.Contract(contractAddr, abi, provider);
  const data = contract.interface.encodeFunctionData("setNumber", ["0x123"]);

  const tx = {
    type: TxType.FeeDelegatedSmartContractExecution,
    from: senderAddr,
    to: contractAddr,
    value: 0,
    data: data,
  };

  // Wallet: populate and sign as sender, then return RLP to the dApp
  const populatedTx = await senderWallet.populateTransaction(tx);
  const senderTxHashRLP = await senderWallet.signTransaction(populatedTx);
  console.log("senderTxHashRLP", senderTxHashRLP);
  // return senderTxHashRLP;  // ← wallet returns this to the dApp (do not broadcast)
}
```

:::note

具体的布线方式取决于您的钱包架构。 重要注意事项是：**将委托类型的签名作为发送者，返回 `senderTxHashRLP`，且不要广播。**

:::

## 钱包之外：费用支付方的签名

钱包返回 `senderTxHashRLP` 后，dApp 将其转发（**步骤 2**），随后手续费支付方进行签名并提交（**步骤 3**）。 下面突出显示的是费用支付方——这**不是**钱包代码。

<FeeDelegationFlow highlight="feepayer"></FeeDelegationFlow>

```javascript
// Fee payer / backend only — not wallet code
const sentTx = await feePayerWallet.sendTransactionAsFeePayer(senderTxHashRLP);
console.log("sentTx", sentTx);

const rc = await sentTx.wait();
console.log("receipt", rc);
```

要了解手续费支付方如何接收 `senderTxHashRLP` 并提交交易（这是一个简单的客户端/服务器演示——并非钱包集成），请参阅 [手续费委托示例](/build/tutorials/fee-delegation-example)。 关于受托费用支付方，请参阅 [集成 Kaia 费用委托服务](/build/tutorials/integrate-fee-delegation-service)。

## 下一步

| 目标                       | 指南                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| 了解手续费委托的交易类型             | [费用委托](/build/transactions/fee-delegation)、[部分费用委托](/build/transactions/partial-fee-delegation) |
| 查看客户端/服务器付费方演示（非钱包代码）    | [构建费委托示例](/build/tutorials/fee-delegation-example)                                              |
| 在 dApp 中使用 Kaia 的托管费用支付方 | [集成 Kaia 费用委托服务](/build/tutorials/integrate-fee-delegation-service)                             |
| 费用委托交易的 SDK 参考文档         | [ethers-ext 委托手续费的价值转移](/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer) |
