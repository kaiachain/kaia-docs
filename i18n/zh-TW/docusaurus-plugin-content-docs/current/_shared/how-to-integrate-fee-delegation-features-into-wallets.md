# 如何將費用委託功能整合到錢包中

感謝 Kaia 的 [原生費用授權](https://docs.kaia.io/build/transactions/fee-delegation/) 功能，使用者可以在 dApps 上享受無油交易。 但是，要啟用此功能，錢包必須支援費用授權交易類型。 本指南說明錢包提供商如何將費用授權功能整合到他們的錢包中。

為了整合收費委託，錢包供應商應：

1. 將 [Kaia SDK](https://github.com/kaiachain/kaia-sdk) (例如：kaiachain/ethers-ext) 加入您的程式碼庫。
2. 每當錢包提供者的 RPC 方法 `kaia_signTransaction` 被呼叫時，使用 Kaia SDK 來簽署交易。
3. 因此，錢包應該將已簽署的交易 `senderTxHashRlp` 傳回給 dApp，而不是直接傳送給節點提供者。 將轉移至費用支付者。

以下是一個簡單價值轉移的基本範例：

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

用於合約互動：

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

確切的整合代碼可能因您的錢包實作方式而異。

:::