# Tích hợp tính năng phân quyền phí vào ví

Nhờ tính năng [ủy quyền phí gốc](https://docs.kaia.io/build/transactions/fee-delegation/) của Kaia, người dùng có thể tận hưởng các giao dịch không mất phí trên dApp. Tuy nhiên, để kích hoạt chức năng này, ví phải hỗ trợ các loại giao dịch được ủy quyền phí. Hướng dẫn này giải thích cách nhà cung cấp ví có thể tích hợp chức năng phân quyền phí vào ví của họ.

Để tích hợp việc phân quyền phí, nhà cung cấp ví nên:

1. Thêm [Kaia SDK](https://github.com/kaiachain/kaia-sdk) (ví dụ: kaiachain/ethers-ext) vào cơ sở mã của bạn.
2. Bất cứ khi nào phương thức RPC của nhà cung cấp ví, `kaia_signTransaction`, được gọi, hãy sử dụng Kaia SDK để ký giao dịch.
3. Do đó, ví phải trả lại giao dịch đã ký, `senderTxHashRlp`, cho dApp thay vì gửi trực tiếp đến nhà cung cấp nút. Số tiền này sẽ được chuyển cho người nộp lệ phí.

Dưới đây là một ví dụ cơ bản về chuyển giao giá trị đơn giản:

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

Đối với tương tác hợp đồng:

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

Mã tích hợp chính xác có thể thay đổi tùy thuộc vào cách triển khai ví của bạn.

:::