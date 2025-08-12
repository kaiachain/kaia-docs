# 월렛에 수수료 위임 기능 통합

카이아의 [네이티브 수수료 위임](https://docs.kaia.io/build/transactions/fee-delegation/) 기능 덕분에 사용자들은 디앱에서 가스 없이 거래를 즐길 수 있습니다. 하지만 이 기능을 사용하려면 지갑이 수수료 위임 거래 유형을 지원해야 합니다. 이 가이드에서는 지갑 공급자가 수수료 대납 기능을 지갑에 통합하는 방법을 설명합니다.

수수료 위임을 통합하려면 지갑 공급업체가 통합해야 합니다:

1. 코드베이스에 [Kaia SDK](https://github.com/kaiachain/kaia-sdk)(예: kaiachain/ethers-ext)를 추가합니다.
2. 지갑 공급자의 RPC 메서드인 `kaia_signTransaction`이 호출될 때마다 Kaia SDK를 사용하여 트랜잭션에 서명합니다.
3. 결과적으로 지갑은 서명된 트랜잭션인 `senderTxHashRlp`를 노드 공급자에게 직접 전송하는 대신 dApp에 반환해야 합니다. 수수료 납부자에게 이체됩니다.

다음은 간단한 가치 이전을 위한 기본 예시입니다:

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

계약 상호 작용의 경우:

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

정확한 통합 코드는 지갑의 구현 방식에 따라 다를 수 있습니다.

:::