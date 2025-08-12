# 4. Tích hợp chức năng rút khí (Gas Abstraction) vào ứng dụng dApp hoặc ví của bạn

Trên trang này, bạn sẽ học cách tích hợp các tính năng trích xuất khí (GA) vào ví của mình. Để mục đích của hướng dẫn này, bạn sẽ sử dụng [Kaia SDK](https://github.com/kaiachain/kaia-sdk) (ethers-ext) để triển khai các tính năng GA trên chuỗi Kaia.

## Điều kiện tiên quyết

- Tài khoản Kaia.

## Bắt đầu

Hướng dẫn này được thiết kế dành cho các nhà phát triển ví muốn triển khai Gas Abstraction (GA) trên Kaia. Bạn sẽ trải qua một trường hợp sử dụng thực tế — thực hiện một giao dịch cấp ứng dụng, trong đó người dùng yêu cầu nhận airdrop của các token ERC20 mà không cần sở hữu bất kỳ token KAIA gốc nào để thanh toán phí gas.

Bạn sẽ học cách:

- Lập báo cáo tài chính cho GA
- Nạp tiền vào tài khoản bằng các token được GA hỗ trợ
- Xây dựng và thực thi cả giao dịch phê duyệt và giao dịch hoán đổi bằng cách sử dụng trừ gas.

Việc triển khai hoạt động một cách trơn tru trên cả **Kaia Mainnet** và **Kairos Testnet**. Để tham gia, bạn cần có một số token ERC-20 được hỗ trợ bởi GA trên một trong hai mạng:

- Trên mạng chính Kaia, chúng tôi sẽ sử dụng [USDT](https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=txList&page=1)
- Trên mạng thử nghiệm Kairos, chúng tôi sẽ sử dụng token [TEST](https://kairos.kaiascan.io/address/0xcb00ba2cab67a3771f9ca1fa48fda8881b457750?tabId=txList&page=1)

### Nạp tiền vào tài khoản bằng các token GA được hỗ trợ

**Mạng chính Kaia**

Để nhận USDT:

- Bạn có thể mua hoặc chuyển USDT từ các sàn giao dịch tập trung (CEX) sau đây [https://www.coingecko.com/en/coins/kaia#markets] hỗ trợ các token tương thích với Kaia.
- Đảm bảo rằng USDT bạn nhận được là phiên bản ERC-20 được hỗ trợ bởi Kaia GA.

**Mạng thử nghiệm Kairos**

Để nhận TEST tokens:

1. Mở [ERC20 Faucet](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1) trên Kaiascan
2. Chuyển đến tab **Hợp đồng**, sau đó chọn **Viết hợp đồng**
3. Tìm hàm (token) yêu cầu
4. Dán địa chỉ của một **GA token** được hỗ trợ trên Kairos (cho hướng dẫn này, hãy sử dụng địa chỉ cho TEST)
5. Nhấp vào **Query** để gửi yêu cầu.

Bạn sẽ nhận được các token TEST của mình trong thời gian ngắn.

![](/img/build/tutorials/ga-integration-1.png)

## Bước 1: Thiết lập dự án và cài đặt ethers-ext và ethers.js

```bash
mkdir kaia-ga-example  
cd  kaia-ga-example  
npm init -y    
npm install --save @kaiachain/ethers-ext ethers@6 dotenv  
```

## Bước 2: Cấu hình Nhà cung cấp và Ví

Kaia

Tạo một tệp mới có tên kaia-ga.js và dán mã sau vào tệp đó:

```javascript
const ethers = require("ethers"); // ethers v6  
const { Wallet, gasless } = require("@kaiachain/ethers-ext/v6");  
require('dotenv').config()  
// Replace with your wallet address and private key in your .env file  
const senderAddr = "PASTE SENDER ADDRESS";  
const senderPriv = process.env.SENDER_PK;  
const provider = new ethers.JsonRpcProvider(  
  "https://kaia.blockpi.network/v1/rpc/public"  
);  
const wallet = new Wallet(senderPriv, provider);  
```

Kairos

Tạo một tệp mới có tên kairos-ga.js và dán mã sau vào tệp đó:

```javascript
const ethers = require("ethers"); // ethers v6  
const { Wallet, gasless } = require("@kaiachain/ethers-ext/v6");  
require('dotenv').config()  
// Replace with your wallet address and private key in your .env file  
const senderAddr = "PASTE SENDER ADDRESS";  
const senderPriv = process.env.SENDER_PK;  
const provider = new ethers.JsonRpcProvider(  
  "https://responsive-green-emerald.kaia-kairos.quiknode.pro"  
);  
const wallet = new Wallet(senderPriv, provider);  
```

:::note
Các bước từ 2 đến 6 cùng nhau tạo thành một luồng thực thi hoàn chỉnh. Sao chép từng khối vào cùng một tệp theo thứ tự.\
:::

## Bước 3: Cấu hình hợp đồng để ước tính phí yêu cầu và hỗ trợ token

Trong bước này, chúng tôi ước tính chi phí thực hiện giao dịch Airdrop để có thể chi trả bằng cách hoán đổi token. Chi phí ước tính này được gọi là **AppTxFee** — số lượng KAIA (đơn vị wei) mà người gửi cần nhận được từ giao dịch hoán đổi để tài trợ cho giao dịch ứng dụng cấp cao hơn (trong trường hợp này là yêu cầu airdrop).\
Chúng tôi cũng sẽ chuẩn bị và cấu hình tất cả các bản sao hợp đồng cần thiết để:

- Xác minh rằng token ERC20 đã chọn được hỗ trợ bởi **GaslessSwapRouter**.
- Lấy tỷ lệ hoa hồng hiện tại được áp dụng bởi router.
- Lấy địa chỉ router để sử dụng trong các bước swap và phê duyệt.

Các thông số này là cần thiết để thiết lập một giao dịch hoán đổi không cần gas hợp lệ và có thể thực thi trong các bước tiếp theo.

Kaia

```javascript
// Replace with ERC20 token address to be spent  
const tokenAddr = "0xd077A400968890Eacc75cdc901F0356c943e4fDb"; // USDT Token Contract Address  
const ERC20_ABI = [  
  "function decimals() view returns (uint8)",  
  "function symbol() view returns (string)",  
  "function allowance(address owner, address spender) view returns (uint256)",  
  "function balanceOf(address owner) view returns (uint256)",  
];  
const CLAIM_GOLD_CONTRACT_ADDRESS = "0x8ce5130B137FD4e84F43e3E7aD34918aF8F70F6b";  
// MINIMAL ABI CLAIM GOLD CONTRACT   
const CLAIM_AIRDROP_ABI = [  
  {  
    "inputs": [  
      {  
        "internalType": "address",  
        "name": "to",  
        "type": "address"  
      },  
      {  
        "internalType": "uint256",  
        "name": "amount",  
        "type": "uint256"  
      }  
    ],  
    "name": "mint",  
    "outputs": [],  
    "stateMutability": "nonpayable",  
    "type": "function"  
  },  
  {  
    "inputs": [  
      {  
        "internalType": "address",  
        "name": "account",  
        "type": "address"  
      }  
    ],  
    "name": "balanceOf",  
    "outputs": [  
      {  
        "internalType": "uint256",  
        "name": "",  
        "type": "uint256"  
      }  
    ],  
    "stateMutability": "view",  
    "type": "function"  
  }  
]  
const CLAIM_AMOUNT = ethers.parseUnits("10", 18); // 10 tokens  
async function main() {  
  // prepare encoded transaction  
  const iface = new ethers.Interface(CLAIM_AIRDROP_ABI);  
  const encodedData = iface.encodeFunctionData("mint", [  
    wallet.address,  
    CLAIM_AMOUNT,  
  ]);  
  // estimate Gas  
  const estimatedGas = await provider.estimateGas({  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    from: wallet.address,  
    data: encodedData,  
  });  
  // gasPrice  
  const claimGasPrice = await provider.getFeeData();  
  console.log("Estimated Gas for claim:", estimatedGas.toString());  
  console.log("Estimated GasPrice for claim:", claimGasPrice.gasPrice.toString());  
  const gasFees = Number(estimatedGas) * Number(claimGasPrice.gasPrice);  
  console.log(`Gas fee: ${gasFees}`);  
  const gasFeesInEther = ethers.formatEther(gasFees.toString());  
  const appTxFee = ethers.parseEther(gasFeesInEther.toString()).toString();  
  // Query the environment  
  console.log(`Using token at address: ${tokenAddr}`);  
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);  
  const goldToken = new ethers.Contract(CLAIM_GOLD_CONTRACT_ADDRESS, CLAIM_AIRDROP_ABI, provider);  
  const tokenSymbol = await token.symbol();  
  const tokenDecimals = await token.decimals();  
  const tokenBalance = await token.balanceOf(senderAddr);  
  console.log(`\nInitial balance of the sender ${senderAddr}`);  
  console.log(  
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`  
  );  
  console.log(  
    `- ${ethers.formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol}`  
  );  
  const router = await gasless.getGaslessSwapRouter(provider);  
  const routerAddr = await router.getAddress();  
  const isTokenSupported = await router.isTokenSupported(tokenAddr);  
  const commissionRate = Number(await router.commissionRate());  
  console.log(`\nGaslessSwapRouter address: ${routerAddr}`);  
  console.log(`- The token is supported: ${isTokenSupported}`);  
  console.log(`- Commission rate: ${commissionRate} bps`);  
  …….  
}  
```

Kairos

```javascript
// Replace with ERC20 token address to be spent  
const tokenAddr = "0xcB00BA2cAb67A3771f9ca1Fa48FDa8881B457750"; // Kairos:TEST token  
const ERC20_ABI = [  
  "function decimals() view returns (uint8)",  
  "function symbol() view returns (string)",  
  "function allowance(address owner, address spender) view returns (uint256)",  
  "function balanceOf(address owner) view returns (uint256)",  
];  
const CLAIM_GOLD_CONTRACT_ADDRESS = "0x18DfDEd9bb342519549c1dBAd832c0FCfF5F6F70";  
// MINIMAL ABI CLAIM GOLD CONTRACT   
const CLAIM_AIRDROP_ABI = [  
  {  
    "inputs": [  
      {  
        "internalType": "address",  
        "name": "to",  
        "type": "address"  
      },  
      {  
        "internalType": "uint256",  
        "name": "amount",  
        "type": "uint256"  
      }  
    ],  
    "name": "mint",  
    "outputs": [],  
    "stateMutability": "nonpayable",  
    "type": "function"  
  },  
  {  
    "inputs": [  
      {  
        "internalType": "address",  
        "name": "account",  
        "type": "address"  
      }  
    ],  
    "name": "balanceOf",  
    "outputs": [  
      {  
        "internalType": "uint256",  
        "name": "",  
        "type": "uint256"  
      }  
    ],  
    "stateMutability": "view",  
    "type": "function"  
  }  
]  
const CLAIM_AMOUNT = ethers.parseUnits("10", 18); // 10 tokens  
async function main() {  
  // prepare encoded transaction  
  const iface = new ethers.Interface(CLAIM_AIRDROP_ABI);  
  const encodedData = iface.encodeFunctionData("mint", [  
    wallet.address,  
    CLAIM_AMOUNT,  
  ]);  
  // estimate Gas  
  const estimatedGas = await provider.estimateGas({  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    from: wallet.address,  
    data: encodedData,  
  });  
  // gasPrice  
  const claimGasPrice = await provider.getFeeData();  
  console.log("Estimated Gas for claim:", estimatedGas.toString());  
  console.log("Estimated GasPrice for claim:", claimGasPrice.gasPrice.toString());  
  const gasFees = Number(estimatedGas) * Number(claimGasPrice.gasPrice);  
  console.log(`Gas fee: ${gasFees}`);  
  const gasFeesInEther = ethers.formatEther(gasFees.toString());  
  const appTxFee = ethers.parseEther(gasFeesInEther.toString()).toString();  
  // Query the environment  
  console.log(`Using token at address: ${tokenAddr}`);  
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);  
  const goldToken = new ethers.Contract(CLAIM_GOLD_CONTRACT_ADDRESS, CLAIM_AIRDROP_ABI, provider);  
  const tokenSymbol = await token.symbol();  
  const tokenDecimals = await token.decimals();  
  const tokenBalance = await token.balanceOf(senderAddr);  
  console.log(`\nInitial balance of the sender ${senderAddr}`);  
  console.log(  
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`  
  );  
  console.log(  
    `- ${ethers.formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol}`  
  );  
  const router = await gasless.getGaslessSwapRouter(provider);  
  const routerAddr = await router.getAddress();  
  const isTokenSupported = await router.isTokenSupported(tokenAddr);  
  const commissionRate = Number(await router.commissionRate());  
  console.log(`\nGaslessSwapRouter address: ${routerAddr}`);  
  console.log(`- The token is supported: ${isTokenSupported}`);  
  console.log(`- Commission rate: ${commissionRate} bps`);  
  …….  
}  
```

## Bước 4: Chuẩn bị giao dịch ApproveTx và SwapTx

Trong bước này, chúng ta chuẩn bị hai giao dịch quan trọng cho phép trừ gas thông qua việc chuyển đổi token:

**ApproveTx**\
Trước khi một hợp đồng thông minh có thể chi tiêu các token ERC20 của người dùng, nó phải được cấp quyền thông qua quá trình phê duyệt. Ở đây, chúng tôi kiểm tra xem người gửi đã phê duyệt GaslessSwapRouter để chi tiêu token của họ hay chưa.

- Nếu số dư là 0, chúng tôi tạo một giao dịch ApproveTx.
- Nếu khoản trợ cấp đã tồn tại và đủ, chúng ta sẽ bỏ qua bước này để tiết kiệm nhiên liệu.

**SwapTx**\
Sau khi xử lý phê duyệt, chúng tôi chuẩn bị SwapTx. Đây là giao dịch chuyển đổi token ERC20 thành KAIA để thanh toán phí gas cho giao dịch yêu cầu cuối cùng.\
Chúng tôi tính toán ba giá trị quan trọng:

- **amountRepay** là số tiền chính xác của KAIA cần thiết để thanh toán toàn bộ các giao dịch liên quan, bao gồm cả giao dịch hoán đổi.
- **minAmountOut** là số lượng tối thiểu của KAIA dự kiến nhận được từ giao dịch hoán đổi sau khi trừ đi phí giao dịch ứng dụng và hoa hồng của router.
- **amountIn** là số lượng token ERC20 cần thiết để nhận minAmountOut, đã tính toán trượt giá.

Nếu số dư token của người gửi không đủ để thanh toán số tiền amountIn, giao dịch sẽ bị dừng lại và yêu cầu người dùng nạp tiền vào tài khoản của mình. Hai giao dịch này, ApproveTx và SwapTx, được thêm vào danh sách các giao dịch sẽ được gửi cùng nhau như chúng ta sẽ thấy trong các bước tiếp theo.

Kaia

```javascript
 ……..  
const gasPrice = Number((await provider.getFeeData()).gasPrice);  
  // If the sender hasn't approved, include ApproveTx first.  
  const allowance = await token.allowance(senderAddr, routerAddr);  
  const approveRequired = allowance == 0n;  
  const txs = [];  
  if (approveRequired) {  
    console.log("\nAdding ApproveTx because allowance is 0");  
    const approveTx = await gasless.getApproveTx(  
      provider,  
      senderAddr,  
      tokenAddr,  
      routerAddr,  
      gasPrice  
    );  
    txs.push(approveTx);  
  } else {  
    console.log("\nNo ApproveTx needed");  
  }  
  // - amountRepay (KAIA) is the cost of LendTx, ApproveTx, and SwapTx. The block miner shall fund it first,  
  //   then the sender has to repay from the swap output.  
  // - minAmountOut (KAIA) is the required amount of the swap output. It must be enough to cover the amountRepay  
  //   and pay the commission, still leaving appTxFee.  
  // - amountIn (token) is the amount of the token to be swapped to produce minAmountOut plus slippage.  
  console.log("\nCalculating the amount of the token to be swapped...");  
  console.log(`- gasPrice: ${ethers.formatUnits(gasPrice, "gwei")} gkei`);  
  const amountRepay = gasless.getAmountRepay(approveRequired, gasPrice);  
  console.log(`- amountRepay: ${ethers.formatEther(amountRepay)} KAIA`);  
  const minAmountOut = gasless.getMinAmountOut(  
    amountRepay,  
    appTxFee,  
    commissionRate  
  );  
  console.log(`- minAmountOut: ${ethers.formatEther(minAmountOut)} KAIA`);  
  const slippageBps = 50; // 0.5%  
  const amountIn = await gasless.getAmountIn(  
    router,  
    tokenAddr,  
    minAmountOut,  
    slippageBps  
  );  
  console.log(  
    `- amountIn: ${ethers.formatUnits(amountIn, tokenDecimals)} ${tokenSymbol}`  
  );  
  if (tokenBalance < amountIn) {  
    console.log(  
      `\nInsufficient balance of the token: ${ethers.formatUnits(  
        tokenBalance,  
        tokenDecimals  
      )} ${tokenSymbol}`  
    );  
    console.log(  
      `- Please transfer more ${tokenSymbol} to the sender ${senderAddr}`  
    );  
    return;  
  }  
  const swapTx = await gasless.getSwapTx(  
    provider,  
    senderAddr,  
    tokenAddr,  
    routerAddr,  
    amountIn,  
    minAmountOut,  
    amountRepay,  
    gasPrice,  
    approveRequired  
  );  
  txs.push(swapTx);  
 ………  
```

Kairos

```javascript
….  
  const gasPrice = Number((await provider.getFeeData()).gasPrice);  
  // If the sender hasn't approved, include ApproveTx first.  
  const allowance = await token.allowance(senderAddr, routerAddr);  
  const approveRequired = allowance == 0n;  
  const txs = [];  
  if (approveRequired) {  
    console.log("\nAdding ApproveTx because allowance is 0");  
    const approveTx = await gasless.getApproveTx(  
      provider,  
      senderAddr,  
      tokenAddr,  
      routerAddr,  
      gasPrice  
    );  
    txs.push(approveTx);  
  } else {  
    console.log("\nNo ApproveTx needed");  
  }  
  // - amountRepay (KAIA) is the cost of LendTx, ApproveTx, and SwapTx. The block miner shall fund it first,  
  //   then the sender has to repay from the swap output.  
  // - minAmountOut (KAIA) is the required amount of the swap output. It must be enough to cover the amountRepay  
  //   and pay the commission, still leaving appTxFee.  
  // - amountIn (token) is the amount of the token to be swapped to produce minAmountOut plus slippage.  
  console.log("\nCalculating the amount of the token to be swapped...");  
  console.log(`- gasPrice: ${ethers.formatUnits(gasPrice, "gwei")} gkei`);  
  const amountRepay = gasless.getAmountRepay(approveRequired, gasPrice);  
  console.log(`- amountRepay: ${ethers.formatEther(amountRepay)} KAIA`);  
  const minAmountOut = gasless.getMinAmountOut(  
    amountRepay,  
    appTxFee,  
    commissionRate  
  );  
  console.log(`- minAmountOut: ${ethers.formatEther(minAmountOut)} KAIA`);  
  const slippageBps = 50; // 0.5%  
  const amountIn = await gasless.getAmountIn(  
    router,  
    tokenAddr,  
    minAmountOut,  
    slippageBps  
  );  
  console.log(  
    `- amountIn: ${ethers.formatUnits(amountIn, tokenDecimals)} ${tokenSymbol}`  
  );  
  if (tokenBalance < amountIn) {  
    console.log(  
      `\nInsufficient balance of the token: ${ethers.formatUnits(  
        tokenBalance,  
        tokenDecimals  
      )} ${tokenSymbol}`  
    );  
    console.log(  
      `- Please transfer more ${tokenSymbol} to the sender ${senderAddr}`  
    );  
    return;  
  }  
  const swapTx = await gasless.getSwapTx(  
    provider,  
    senderAddr,  
    tokenAddr,  
    routerAddr,  
    amountIn,  
    minAmountOut,  
    amountRepay,  
    gasPrice,  
    approveRequired  
  );  
  txs.push(swapTx);  
  ….  
```

## Bước 5: Thực thi các giao dịch ApproveTx và SwapTx

Bây giờ cả hai giao dịch **ApproveTx** và **SwapTx** đã được chuẩn bị và thêm vào danh sách giao dịch, chúng ta có thể thực thi chúng cùng nhau bằng tính năng trừ gas của Kaia.

Hàm wallet.sendTransactions(txs) xử lý quá trình này bằng cách gửi các giao dịch dưới dạng một lô. Dưới nắp ca-pô, nó sử dụng phương thức RPC **kaia_sendRawTransactions**, phương thức này chấp nhận một mảng các giao dịch đã được ký và mã hóa RLP, tuân thủ các loại giao dịch của Ethereum.

Điều này khiến nó rất phù hợp để gửi cả hai giao dịch ApproveTx và SwapTx trong một giao dịch nguyên tử duy nhất.

Kaia

```javascript
……..  
  console.log("\nSending gasless transactions...");  
  const sentTxs = await wallet.sendTransactions(txs);  
  for (const tx of sentTxs) {  
    console.log(`- Tx sent: (nonce: ${tx.nonce}) ${tx.hash}`);  
  }  
  console.log("\nWaiting for transactions to be mined...");  
  let blockNum = 0;  
  for (const sentTx of sentTxs) {  
    const receipt = await sentTx.wait();  
    console.log(`- Tx mined at block ${receipt.blockNumber}`);  
    blockNum = receipt.blockNumber;  
  }  
………  
```

Kairos

```javascript
…….  
  console.log("\nSending gasless transactions...");  
  const sentTxs = await wallet.sendTransactions(txs);  
  for (const tx of sentTxs) {  
    console.log(`- Tx sent: (nonce: ${tx.nonce}) ${tx.hash}`);  
  }  
  console.log("\nWaiting for transactions to be mined...");  
  let blockNum = 0;  
  for (const sentTx of sentTxs) {  
    const receipt = await sentTx.wait();  
    console.log(`- Tx mined at block ${receipt.blockNumber}`);  
    blockNum = receipt.blockNumber;  
  }  
……  
```

## Bước 6: Thực thi giao dịch ứng dụng (Yêu cầu airdrop)

Sau khi hoàn tất việc hoán đổi và nhận được AppTxFee, bạn có thể kích hoạt giao dịch chính của ứng dụng — trong trường hợp này là hàm claimAirdrop.

Bắt đầu bằng cách tạo đối tượng giao dịch bằng cách sử dụng địa chỉ hợp đồng đích, dữ liệu gọi được mã hóa, lượng gas ước tính và giá gas hiện tại:

Kaia

```javascript
  const claimTxObject = {  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    data: encodedData,  
    gasLimit: estimatedGas,  
    gasPrice: claimGasPrice.gasPrice,  
  };  
```

Kairos

```javascript
…….  
  const claimTxObject = {  
    to: CLAIM_GOLD_CONTRACT_ADDRESS,  
    data: encodedData,  
    gasLimit: estimatedGas,  
    gasPrice: claimGasPrice.gasPrice,  
  };  
```

Gửi giao dịch bằng ví:

Kaia

```javascript
…….  
console.log("\nClaiming airdrop...");  
const claimAirdropTx = await wallet.sendTransaction(claimTxObject);  
const txx = await claimAirdropTx.wait()  
console.log("ClaimAirdrop Tx Hash: ", txx.hash);  
……  
```

Kairos

```javascript

console.log("\nClaiming airdrop...");  
const claimAirdropTx = await wallet.sendTransaction(claimTxObject);  
const txx = await claimAirdropTx.wait()  
console.log("ClaimAirdrop Tx Hash: ", txx.hash);  
```

Sau khi giao dịch được xác nhận, bạn có thể kiểm tra số dư cập nhật của người gửi để xác nhận rằng airdrop đã được nhận thành công:

Kaia

```javascript
console.log(`\nFinal balance of the sender ${senderAddr}`);  
console.log(`${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`);  
console.log(`${ethers.formatUnits(await token.balanceOf(senderAddr), tokenDecimals)} ${tokenSymbol}`);  
console.log(`${ethers.formatUnits(await goldToken.balanceOf(senderAddr), 18)} GOLD tokens`);  
```

Kairos

```javascript
console.log(`\nFinal balance of the sender ${senderAddr}`);  
console.log(`${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`);  
console.log(`${ethers.formatUnits(await token.balanceOf(senderAddr), tokenDecimals)} ${tokenSymbol}`);  
console.log(`${ethers.formatUnits(await goldToken.balanceOf(senderAddr), tokenDecimals)} GOLD tokens`);  
```

Kiểm tra số dư này đảm bảo người dùng đã nhận được số token GOLD dự kiến từ cuộc gọi claimAirdrop và xác nhận rằng cơ chế hoán đổi AppTxFee đã hoạt động đúng như dự định.

Mã nguồn đầy đủ:

Bạn muốn chạy ví dụ đầy đủ ngay lập tức? Sao chép toàn bộ kịch bản bên dưới bao gồm tất cả các bước.

Kaia

```javascript
const ethers = require("ethers"); // ethers v6
const { Wallet, gasless } = require("@kaiachain/ethers-ext/v6");
require('dotenv').config()
// Replace with your wallet address and private key
const senderAddr = "PASTE SENDER ADDRESS";
const senderPriv = process.env.SENDER_PK;
const provider = new ethers.JsonRpcProvider(
  "https://kaia.blockpi.network/v1/rpc/public"
);
const wallet = new Wallet(senderPriv, provider);
// Replace with ERC20 token address to be spent
const tokenAddr = "0xd077A400968890Eacc75cdc901F0356c943e4fDb"; // USDT Token Contract Address
const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
];
const CLAIM_GOLD_CONTRACT_ADDRESS = "0x8ce5130B137FD4e84F43e3E7aD34918aF8F70F6b";
// MINIMAL CLAIM GOLD CONTRACT ABI 
const CLAIM_AIRDROP_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const CLAIM_AMOUNT = ethers.parseUnits("10", 18); // 10 tokens
async function main() {
  // prepare encoded transaction
  const iface = new ethers.Interface(CLAIM_AIRDROP_ABI);
  const encodedData = iface.encodeFunctionData("mint", [
    wallet.address,
    CLAIM_AMOUNT,
  ]);
  // estimate Gas
  const estimatedGas = await provider.estimateGas({
    to: CLAIM_GOLD_CONTRACT_ADDRESS,
    from: wallet.address,
    data: encodedData,
  });
  // gasPrice
  const claimGasPrice = await provider.getFeeData();
  console.log("Estimated Gas for claim:", estimatedGas.toString());
  console.log("Estimated GasPrice for claim:", claimGasPrice.gasPrice.toString());
  const gasFees = Number(estimatedGas) * Number(claimGasPrice.gasPrice);
  console.log(`Gas fee: ${gasFees}`);
  const gasFeesInEther = ethers.formatEther(gasFees.toString());
  const appTxFee = ethers.parseEther(gasFeesInEther.toString()).toString();
  // Query the environment
  console.log(`Using token at address: ${tokenAddr}`);
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);
  const goldToken = new ethers.Contract(CLAIM_GOLD_CONTRACT_ADDRESS, CLAIM_AIRDROP_ABI, provider);
  const tokenSymbol = await token.symbol();
  const tokenDecimals = await token.decimals();
  const tokenBalance = await token.balanceOf(senderAddr);
  console.log(`\nInitial balance of the sender ${senderAddr}`);
  console.log(
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`
  );
  console.log(
    `- ${ethers.formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol}`
  );
  const router = await gasless.getGaslessSwapRouter(provider);
  const routerAddr = await router.getAddress();
  const isTokenSupported = await router.isTokenSupported(tokenAddr);
  const commissionRate = Number(await router.commissionRate());
  console.log(`\nGaslessSwapRouter address: ${routerAddr}`);
  console.log(`- The token is supported: ${isTokenSupported}`);
  console.log(`- Commission rate: ${commissionRate} bps`);
  const gasPrice = Number((await provider.getFeeData()).gasPrice);
  // If sender hasn't approved, include ApproveTx first.
  const allowance = await token.allowance(senderAddr, routerAddr);
  const approveRequired = allowance == 0n;
  const txs = [];
  if (approveRequired) {
    console.log("\nAdding ApproveTx because allowance is 0");
    const approveTx = await gasless.getApproveTx(
      provider,
      senderAddr,
      tokenAddr,
      routerAddr,
      gasPrice
    );
    txs.push(approveTx);
  } else {
    console.log("\nNo ApproveTx needed");
  }
  // - amountRepay (KAIA) is the cost of LendTx, ApproveTx, and SwapTx. The block miner shall fund it first,
  //   then the sender has to repay from the swap output.
  // - minAmountOut (KAIA) is the required amount of the swap output. It must be enough to cover the amountRepay
  //   and pay the commission, still leaving appTxFee.
  // - amountIn (token) is the amount of the token to be swapped to produce minAmountOut plus slippage.
  console.log("\nCalculating the amount of the token to be swapped...");
  console.log(`- gasPrice: ${ethers.formatUnits(gasPrice, "gwei")} gkei`);
  const amountRepay = gasless.getAmountRepay(approveRequired, gasPrice);
  console.log(`- amountRepay: ${ethers.formatEther(amountRepay)} KAIA`);
  const minAmountOut = gasless.getMinAmountOut(
    amountRepay,
    appTxFee,
    commissionRate
  );
  console.log(`- minAmountOut: ${ethers.formatEther(minAmountOut)} KAIA`);
  const slippageBps = 50; // 0.5%
  const amountIn = await gasless.getAmountIn(
    router,
    tokenAddr,
    minAmountOut,
    slippageBps
  );
  console.log(
    `- amountIn: ${ethers.formatUnits(amountIn, tokenDecimals)} ${tokenSymbol}`
  );
  if (tokenBalance < amountIn) {
    console.log(
      `\nInsufficient balance of the token: ${ethers.formatUnits(
        tokenBalance,
        tokenDecimals
      )} ${tokenSymbol}`
    );
    console.log(
      `- Please transfer more ${tokenSymbol} to the sender ${senderAddr}`
    );
    return;
  }
  const swapTx = await gasless.getSwapTx(
    provider,
    senderAddr,
    tokenAddr,
    routerAddr,
    amountIn,
    minAmountOut,
    amountRepay,
    gasPrice,
    approveRequired
  );
  txs.push(swapTx);
  console.log("\nSending gasless transactions...");
  const sentTxs = await wallet.sendTransactions(txs);
  for (const tx of sentTxs) {
    console.log(`- Tx sent: (nonce: ${tx.nonce}) ${tx.hash}`);
  }
  console.log("\nWaiting for transactions to be mined...");
  let blockNum = 0;
  for (const sentTx of sentTxs) {
    const receipt = await sentTx.wait();
    console.log(`- Tx mined at block ${receipt.blockNumber}`);
    blockNum = receipt.blockNumber;
  }
  console.log("\nListing the block's transactions related to the sender...");
  const block = await provider.getBlock(blockNum, true);
  const names = {
    [senderAddr.toLowerCase()]: "sender",
    [tokenAddr.toLowerCase()]: "token",
    [routerAddr.toLowerCase()]: "router",
  };
  for (const txhash of block.transactions) {
    const tx = await provider.getTransaction(txhash);
    const fromName = names[tx.from.toLowerCase()] || tx.from;
    const toName = names[tx.to.toLowerCase()] || tx.to;
    if (fromName != tx.from || toName != tx.to) {
      console.log(`- Tx ${tx.hash}: ${fromName} => ${toName}`);
    }
  }
  // Construct transaction object
  const claimTxObject = {
    to: CLAIM_GOLD_CONTRACT_ADDRESS,
    data: encodedData,
    gasLimit: estimatedGas,
    gasPrice: claimGasPrice.gasPrice,
  };
  console.log("\nClaiming airdrop...");
  const claimAirdropTx = await wallet.sendTransaction(claimTxObject);
  const txx = await claimAirdropTx.wait()
  console.log("ClaimAirdrop Tx Hash: ", txx.hash);
  console.log(`\nFinal balance of the sender ${senderAddr}`);
  console.log(
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`
  );
  console.log(
    `- ${ethers.formatUnits(
      await token.balanceOf(senderAddr),
      tokenDecimals
    )} ${tokenSymbol}`
  );
    console.log(
    `- ${ethers.formatUnits(
      await goldToken.balanceOf(senderAddr),
      18
    )} GOLD tokens`
  );
}
main().catch(console.error);

```

Kairos

```javascript
const ethers = require("ethers"); // ethers v6
const { Wallet, gasless } = require("@kaiachain/ethers-ext/v6");
require('dotenv').config()
// Replace with your wallet address and private key
const senderAddr = "PASTE SENDER ADDRESS";
const senderPriv = process.env.SENDER_PK;
const provider = new ethers.JsonRpcProvider(
  "https://responsive-green-emerald.kaia-kairos.quiknode.pro"
);
const wallet = new Wallet(senderPriv, provider);
// Replace with ERC20 token address to be spent
const tokenAddr = "0xcB00BA2cAb67A3771f9ca1Fa48FDa8881B457750"; // Kairos:TEST token
const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
];
const CLAIM_GOLD_CONTRACT_ADDRESS = "0x18DfDEd9bb342519549c1dBAd832c0FCfF5F6F70";
// MINIMAL CLAIM GOLD CONTRACT ABI 
const CLAIM_AIRDROP_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const CLAIM_AMOUNT = ethers.parseUnits("10", 18); // 10 tokens
async function main() {
  // prepare encoded transaction
  const iface = new ethers.Interface(CLAIM_AIRDROP_ABI);
  const encodedData = iface.encodeFunctionData("mint", [
    wallet.address,
    CLAIM_AMOUNT,
  ]);
  // estimate Gas
  const estimatedGas = await provider.estimateGas({
    to: CLAIM_GOLD_CONTRACT_ADDRESS,
    from: wallet.address,
    data: encodedData,
  });
  // gasPrice
  const claimGasPrice = await provider.getFeeData();
  console.log("Estimated Gas for claim:", estimatedGas.toString());
  console.log("Estimated GasPrice for claim:", claimGasPrice.gasPrice.toString());
  const gasFees = Number(estimatedGas) * Number(claimGasPrice.gasPrice);
  console.log(`Gas fee: ${gasFees}`);
  const gasFeesInEther = ethers.formatEther(gasFees.toString());
  const appTxFee = ethers.parseEther(gasFeesInEther.toString()).toString();
  // Query the environment
  console.log(`Using token at address: ${tokenAddr}`);
  const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);
  const goldToken = new ethers.Contract(CLAIM_GOLD_CONTRACT_ADDRESS, CLAIM_AIRDROP_ABI, provider);
  const tokenSymbol = await token.symbol();
  const tokenDecimals = await token.decimals();
  const tokenBalance = await token.balanceOf(senderAddr);
  console.log(`\nInitial balance of the sender ${senderAddr}`);
  console.log(
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`
  );
  console.log(
    `- ${ethers.formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol}`
  );
  const router = await gasless.getGaslessSwapRouter(provider);
  const routerAddr = await router.getAddress();
  const isTokenSupported = await router.isTokenSupported(tokenAddr);
  const commissionRate = Number(await router.commissionRate());
  console.log(`\nGaslessSwapRouter address: ${routerAddr}`);
  console.log(`- The token is supported: ${isTokenSupported}`);
  console.log(`- Commission rate: ${commissionRate} bps`);
  
  const gasPrice = Number((await provider.getFeeData()).gasPrice);
  // If sender hasn't approved, include ApproveTx first.
  const allowance = await token.allowance(senderAddr, routerAddr);
  const approveRequired = allowance == 0n;
  const txs = [];
  if (approveRequired) {
    console.log("\nAdding ApproveTx because allowance is 0");
    const approveTx = await gasless.getApproveTx(
      provider,
      senderAddr,
      tokenAddr,
      routerAddr,
      gasPrice
    );
    txs.push(approveTx);
  } else {
    console.log("\nNo ApproveTx needed");
  }
  // - amountRepay (KAIA) is the cost of LendTx, ApproveTx, and SwapTx. The block miner shall fund it first,
  //   then the sender has to repay from the swap output.
  // - minAmountOut (KAIA) is the required amount of the swap output. It must be enough to cover the amountRepay
  //   and pay the commission, still leaving appTxFee.
  // - amountIn (token) is the amount of the token to be swapped to produce minAmountOut plus slippage.
  console.log("\nCalculating the amount of the token to be swapped...");
  console.log(`- gasPrice: ${ethers.formatUnits(gasPrice, "gwei")} gkei`);
  const amountRepay = gasless.getAmountRepay(approveRequired, gasPrice);
  console.log(`- amountRepay: ${ethers.formatEther(amountRepay)} KAIA`);
  const minAmountOut = gasless.getMinAmountOut(
    amountRepay,
    appTxFee,
    commissionRate
  );
  console.log(`- minAmountOut: ${ethers.formatEther(minAmountOut)} KAIA`);
  const slippageBps = 50; // 0.5%
  const amountIn = await gasless.getAmountIn(
    router,
    tokenAddr,
    minAmountOut,
    slippageBps
  );
  console.log(
    `- amountIn: ${ethers.formatUnits(amountIn, tokenDecimals)} ${tokenSymbol}`
  );
  if (tokenBalance < amountIn) {
    console.log(
      `\nInsufficient balance of the token: ${ethers.formatUnits(
        tokenBalance,
        tokenDecimals
      )} ${tokenSymbol}`
    );
    console.log(
      `- Please transfer more ${tokenSymbol} to the sender ${senderAddr}`
    );
    return;
  }
  const swapTx = await gasless.getSwapTx(
    provider,
    senderAddr,
    tokenAddr,
    routerAddr,
    amountIn,
    minAmountOut,
    amountRepay,
    gasPrice,
    approveRequired
  );
  txs.push(swapTx);
  console.log("\nSending gasless transactions...");
  const sentTxs = await wallet.sendTransactions(txs);
  for (const tx of sentTxs) {
    console.log(`- Tx sent: (nonce: ${tx.nonce}) ${tx.hash}`);
  }
  console.log("\nWaiting for transactions to be mined...");
  let blockNum = 0;
  for (const sentTx of sentTxs) {
    const receipt = await sentTx.wait();
    console.log(`- Tx mined at block ${receipt.blockNumber}`);
    blockNum = receipt.blockNumber;
  }
  console.log("\nListing the block's transactions related to the sender...");
  const block = await provider.getBlock(blockNum, true);
  const names = {
    [senderAddr.toLowerCase()]: "sender",
    [tokenAddr.toLowerCase()]: "token",
    [routerAddr.toLowerCase()]: "router",
  };
  for (const txhash of block.transactions) {
    const tx = await provider.getTransaction(txhash);
    const fromName = names[tx.from.toLowerCase()] || tx.from;
    const toName = names[tx.to.toLowerCase()] || tx.to;
    if (fromName != tx.from || toName != tx.to) {
      console.log(`- Tx ${tx.hash}: ${fromName} => ${toName}`);
    }
  }
  // Construct transaction object
  const claimTxObject = {
    to: CLAIM_GOLD_CONTRACT_ADDRESS,
    data: encodedData,
    gasLimit: estimatedGas,
    gasPrice: claimGasPrice.gasPrice,
  };
  console.log("\nClaiming airdrop...");
 const claimAirdropTx = await wallet.sendTransaction(claimTxObject);
  const txx = await claimAirdropTx.wait()
  console.log("ClaimAirdrop Tx Hash: ", txx.hash);
  console.log(`\nFinal balance of the sender ${senderAddr}`);
  console.log(
    `- ${ethers.formatEther(await provider.getBalance(senderAddr))} KAIA`
  );
  console.log(
    `- ${ethers.formatUnits(
      await token.balanceOf(senderAddr),
      tokenDecimals
    )} ${tokenSymbol}`
  );
    console.log(
    `- ${ethers.formatUnits(
      await goldToken.balanceOf(senderAddr),
      tokenDecimals
    )} GOLD tokens`
  );
}
main().catch(console.error);

```

## Bước 7: Xem mã nguồn hoạt động

Bây giờ sau khi đã hoàn tất quá trình cài đặt và chuẩn bị các giao dịch, đã đến lúc chạy mã nguồn và quan sát kết quả.

**Kaia**

Chạy `node kaia-ga.js` trong terminal của bạn.

Đầu ra:

![](/img/build/tutorials/ga-integration-2.png)

**Kairos**

Chạy lệnh `node kairos-ga.js` trong terminal của bạn.

Đầu ra:

![](/img/build/tutorials/ga-integration-3.png)

## Kết luận

Bạn vừa hoàn thành một hướng dẫn chi tiết về cách thực hiện một giao dịch đã trừ gas trên Kaia. Từ việc tạo tài khoản và nạp tiền bằng các token được hỗ trợ cho đến việc xây dựng và gửi giao dịch, mọi thao tác đều được thực hiện mà không yêu cầu người dùng phải nắm giữ token KAIA gốc. Bạn cũng đã chứng kiến một quy trình thực tế, trong đó người dùng có thể nhận và yêu cầu airdrop hoàn toàn miễn phí gas.

Bằng cách sử dụng tính năng trích xuất gas của Kaia, bạn có thể tích hợp người dùng mà không cần sử dụng token gốc — loại bỏ rào cản và mang lại trải nghiệm mượt mà hơn cho các ứng dụng Web3.