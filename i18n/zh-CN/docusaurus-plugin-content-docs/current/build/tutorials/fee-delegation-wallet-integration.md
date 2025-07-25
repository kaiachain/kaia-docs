# 将费用委托功能整合到钱包中

得益于 Kaia 的[原生费用委托](https://docs.kaia.io/build/transactions/fee-delegation/) 功能，用户可以在 dApp 上享受无气交易。 不过，要启用这一功能，钱包必须支持费用委托交易类型。 本指南介绍了钱包提供商如何将费用委托功能集成到钱包中。

要整合费用委托，钱包提供商应

1. 将 [Kaia SDK](https://github.com/kaiachain/kaia-sdk) （例如 kaiachain/ethers-ext）添加到您的代码库中。
2. 每当钱包提供者的 RPC 方法 "kaia_signTransaction "被调用时，就会使用 Kaia SDK 来签署交易。
3. 因此，钱包应将已签名的交易 `senderTxHashRlp` 返回给 dApp，而不是直接发送给节点提供商。 这笔钱将转给缴费人。

下面是一个简单价值转移的基本示例：

```javascript
const ethers = require("ethers6"); 
const { Wallet, TxType, parseKaia } = require("@kaiachain/ethers-ext/v6"); 

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153"; 
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8"; 

const recieverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9"; 
const provider = new ethers.JsonRpcProvider( "https://public-en-kairos.node.kaia.io" ); 

const senderWallet = new Wallet(senderPriv, provider); 

async function main() { 
const tx = {
type: TxType.FeeDelegatedValueTransfer, 
from: senderAddr, 
to: recieverAddr, 
value: parseKaia("0.01"), 
}; 

// Sign transaction by sender
const populatedTx = await senderWallet.populateTransaction(tx); 
const senderTxHashRLP = await senderWallet.signTransaction(populatedTx); console.log("senderTxHashRLP", senderTxHashRLP); 
}
```

用于合同互动：

```javascript
const ethers = require("ethers6"); 
const { Wallet, TxType, parseKaia } = require("@kaiachain/ethers-ext/v6"); 

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153"; 
const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8"; 

const provider = new ethers.JsonRpcProvider( "https://public-en-kairos.node.kaia.io" ); 

const senderWallet = new Wallet(senderPriv, provider); 

const contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";
const abi = ["function setNumber(uint256 newNumber)"];

async function main() {
	const contract = new ethers.Contract(contractAddr, abi, provider);
const data = contract.interface.encodeFunctionData("setNumber", ["0x123"]);

const tx = {
type: TxType.FeeDelegatedSmartContractExecution, 
from: senderAddr,
to: recieverAddr, 
value: 0, 
data: data,
}; 

// Sign transaction by sender
const populatedTx = await senderWallet.populateTransaction(tx); 
const senderTxHashRLP = await senderWallet.signTransaction(populatedTx); console.log("senderTxHashRLP", senderTxHashRLP); 
}
```

:::note

具体的集成代码可能会因钱包的实现方式而有所不同。

:::