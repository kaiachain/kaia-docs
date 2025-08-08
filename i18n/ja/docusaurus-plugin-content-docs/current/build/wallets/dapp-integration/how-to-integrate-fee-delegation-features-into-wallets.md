# 手数料委任機能をウォレットに統合する方法

カイアの[native fee delegation](https://docs.kaia.io/build/transactions/fee-delegation/)機能のおかげで、ユーザーはdApps上でガスなし取引を楽しむことができる。 しかし、この機能を有効にするには、ウォレットが手数料を委譲された取引タイプをサポートする必要がある。 このガイドでは、ウォレットプロバイダーが手数料委任機能をウォレットに統合する方法を説明します。

手数料の委任を統合するために、ウォレットプロバイダーは以下を行うべきである：

1. あなたのコードベースに[Kaia SDK](https://github.com/kaiachain/kaia-sdk) (例えば、kaiachain/ethers-ext)を追加してください。
2. ウォレットプロバイダーの RPC メソッドである `kaia_signTransaction` が呼び出されるたびに、Kaia SDK を使用してトランザクションに署名します。
3. その結果、ウォレットは署名されたトランザクション、`senderTxHashRlp`をノードプロバイダに直接送信する代わりにdAppに返すべきである。 それは料金支払者に振り込まれる。

以下は、単純な価値移転の基本的な例である：

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

契約のやり取りについて：

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

正確な統合コードは、ウォレットの実装によって異なる場合があります。

:::