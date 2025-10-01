# Cách tích hợp tính năng ủy quyền phí vào ví

Nhờ tính năng [đại lý phí gốc](https://docs.kaia.io/build/transactions/fee-delegation/) của Kaia, người dùng có thể thực hiện các giao dịch không tốn phí gas trên các ứng dụng phi tập trung (dApps). Tuy nhiên, để kích hoạt tính năng này, ví phải hỗ trợ loại giao dịch ủy quyền phí. Hướng dẫn này giải thích cách các nhà cung cấp ví có thể tích hợp tính năng ủy quyền phí vào ví của họ.

Để tích hợp tính năng ủy quyền phí, các nhà cung cấp ví nên:

1. Thêm [Kaia SDK](https://github.com/kaiachain/kaia-sdk) (ví dụ: kaiachain/ethers-ext) vào mã nguồn của bạn.
2. Mỗi khi phương thức RPC của nhà cung cấp ví, `kaia_signTransaction`, được gọi, hãy sử dụng Kaia SDK để ký giao dịch.
3. Do đó, ví nên trả lại giao dịch đã ký, `senderTxHashRlp`, cho ứng dụng dApp thay vì gửi trực tiếp đến nhà cung cấp nút. Số tiền này sẽ được chuyển cho người nộp phí.

Dưới đây là một ví dụ cơ bản về việc chuyển giao giá trị đơn giản:

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

Đối với các giao dịch hợp đồng:

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

Mã tích hợp chính xác có thể khác nhau tùy thuộc vào cách triển khai của ví của bạn.

:::