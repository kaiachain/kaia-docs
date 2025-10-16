# 4. dApp 또는 월렛에서 가스 추상화 구현하기

이제 실제 월렛에 가스 추상화(GA) 기능을 통합하는 방법을 배워보겠습니다. 이 가이드에서는 [Kaia SDK](https://github.com/kaiachain/kaia-sdk) (ethers-ext)를 사용하여 Kaia 체인에서 GA 기능을 구현합니다.

## 사전 요구사항

- Kaia 계정

## 시작하기

이 가이드는 Kaia에서 가스 추상화(GA)를 구현하려는 월렛 개발자를 위해 설계되었습니다. 실제 사용 사례를 통해 가스를 지불할 네이티브 KAIA를 보유하지 않은 사용자가 ERC20 토큰 에어드랍을 청구하는 애플리케이션 레벨 트랜잭션을 실행하는 과정을 살펴보겠습니다.

다음 내용을 배우게 됩니다:

- GA를 위한 계정 준비
- GA 지원 토큰으로 계정 충전
- 가스 추상화를 사용한 승인 및 스왑 트랜잭션 구성 및 실행

이 구현은 **Kaia Mainnet**과 **Kairos Testnet** 모두에서 원활하게 작동합니다. 따라가려면 두 네트워크 중 하나에서 GA 지원 ERC-20 토큰이 필요합니다:

- Kaia Mainnet에서는 [USDT](https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=txList&page=1)를 사용합니다
- Kairos Testnet에서는 [TEST](https://kairos.kaiascan.io/address/0xcb00ba2cab67a3771f9ca1fa48fda8881b457750?tabId=txList&page=1) 토큰을 사용합니다

### 지원되는 GA 토큰으로 계정 충전하기

**Kaia 메인넷**

USDT 획득 방법:

- Kaia 호환 토큰을 지원하는 [중앙화 거래소(CEX)](https://www.coingecko.com/en/coins/kaia#markets)에서 USDT를 구매하거나 전송할 수 있습니다.
- 받는 USDT가 Kaia GA에서 지원하는 ERC-20 버전인지 확인하세요.

**Kairos 테스트넷**

TEST 토큰 획득 방법:

1. KaiaScan에서 [ERC20 Faucet](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1)을 엽니다
2. **Contract** 탭으로 이동한 후 **Write Contract**를 선택합니다
3. claim(token) 함수를 찾습니다
4. Kairos에서 지원하는 **GA 토큰** 주소를 붙여넣습니다 (이 가이드에서는 TEST 주소 사용)
5. **Query**를 클릭하여 요청을 제출합니다

곧 TEST 토큰을 받게 됩니다.

![](/img/build/tutorials/ga-integration-1.png)

## Step 1: 프로젝트 설정 및 ethers-ext와 ethers.js 설치

```bash
mkdir kaia-ga-example  
cd  kaia-ga-example  
npm init -y    
npm install --save @kaiachain/ethers-ext ethers@6 dotenv  
```

## Step 2: Provider와 Wallet 인스턴스 설정

Kaia

kaia-ga.js라는 새 파일을 만들고 아래 코드를 붙여넣습니다:

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

kairos-ga.js라는 새 파일을 만들고 아래 코드를 붙여넣습니다:

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
Step 2부터 6까지는 함께 완전한 실행 가능한 플로우를 구성합니다. 각 블록을 순서대로 같은 파일에 복사하세요.  
:::

## Step 3: 청구 수수료 추정 및 토큰 지원을 위한 컨트랙트 구성

이 단계에서는 claimAirdrop 트랜잭션 실행 비용을 추정하여 토큰 스왑으로 커버할 수 있도록 합니다. 이 추정 비용을 **AppTxFee**라고 하며, 이는 송신자가 후속 애플리케이션 레벨 트랜잭션(이 경우 에어드랍 청구)을 위해 스왑에서 받아야 하는 KAIA 금액(wei 단위)입니다.  
또한 다음을 위해 모든 필요한 컨트랙트 인스턴스를 준비하고 구성합니다:

- 선택한 ERC20 토큰이 **GaslessSwapRouter**에서 지원되는지 확인
- 라우터가 부과하는 현재 **커미션 비율** 조회
- 스왑 및 승인 단계에서 사용할 **라우터 주소** 조회

이러한 매개변수는 다음 단계에서 유효하고 실행 가능한 가스리스 스왑을 설정하는 데 필수적입니다.

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

## Step 4: ApproveTx와 SwapTx 트랜잭션 준비

이 단계에서는 토큰 전환을 통해 가스 추상화를 가능하게 하는 두 가지 필수 트랜잭션을 준비합니다:

**ApproveTx**  
스마트 컨트랙트가 사용자의 ERC20 토큰을 사용하기 전에 먼저 승인을 통해 권한을 부여받아야 합니다. 여기서는 송신자가 이미 GaslessSwapRouter가 토큰을 사용할 수 있도록 승인했는지 확인합니다.

- 허용량이 0이면 ApproveTx를 생성합니다.
- 허용량이 이미 존재하고 충분하면 가스를 절약하기 위해 이 단계를 건너뜁니다.

**SwapTx**  
승인 처리 후 SwapTx를 준비합니다. 이는 ERC20 토큰을 KAIA로 전환하여 최종 청구 트랜잭션의 가스비를 커버하는 트랜잭션입니다.  
세 가지 주요 값을 계산합니다:

- **amountRepay**는 스왑 자체를 포함한 모든 관련 트랜잭션을 커버하는 데 필요한 정확한 KAIA 금액입니다
- **minAmountOut**은 앱 트랜잭션 수수료와 라우터 커미션을 고려한 후 스왑에서 기대되는 최소 KAIA 금액입니다
- **amountIn**은 슬리피지를 고려하여 minAmountOut을 받기 위해 필요한 ERC20 토큰 금액입니다

송신자의 토큰 잔액이 amountIn을 커버하기에 충분하지 않으면 실행이 중단되고 사용자에게 계정 충전을 요청합니다. 이 두 트랜잭션인 ApproveTx와 SwapTx는 다음 단계에서 보게 될 것처럼 함께 제출될 트랜잭션 목록에 추가됩니다.

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

## Step 5: ApproveTx와 SwapTx 트랜잭션 실행

이제 **ApproveTx**와 **SwapTx**가 모두 준비되어 트랜잭션 목록에 추가되었으므로, Kaia의 가스 추상화 기능을 사용하여 함께 실행할 수 있습니다.

wallet.sendTransactions(txs) 함수는 트랜잭션을 배치로 제출하여 이 프로세스를 처리합니다. 내부적으로는 이더리움 트랜잭션 타입을 따르는 서명된 RLP 인코딩 트랜잭션 배열을 받는 **kaia_sendRawTransactions** RPC 메서드를 활용합니다.

이는 ApproveTx와 SwapTx를 단일 원자적 작업으로 제출하는 데 매우 적합합니다.

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

## Step 6: 애플리케이션 트랜잭션 실행 (에어드랍 청구)

스왑이 완료되고 AppTxFee를 받았으므로 이제 메인 애플리케이션 트랜잭션을 트리거할 수 있습니다. 이 경우에는 claimAirdrop 함수입니다.

타겟 컨트랙트 주소, 인코딩된 호출 데이터, 추정 가스, 현재 가스 가격을 사용하여 트랜잭션 객체를 구성하는 것부터 시작합니다:

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

월렛을 사용하여 트랜잭션을 전송합니다:

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

트랜잭션이 채굴된 후 에어드랍이 성공적으로 청구되었는지 확인하기 위해 송신자의 업데이트된 잔액을 확인할 수 있습니다:

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

이 잔액 확인은 사용자가 claimAirdrop 호출에서 예상한 GOLD 토큰을 받았는지 확인하고 AppTxFee 스왑 메커니즘이 의도한 대로 작동했는지 확인합니다.

전체 코드:

전체 예시를 직접 실행하고 싶으시나요? 모든 단계가 결합된 전체 스크립트를 아래에서 복사하세요.

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

## Step 7: 코드 실행 결과 확인

설정을 완료하고 트랜잭션을 준비했으므로 이제 코드를 실행하고 결과를 확인할 차례입니다.

**Kaia**

터미널에서 `node kaia-ga.js` 실행

출력:

![](/img/build/tutorials/ga-integration-2.png)

**Kairos**

터미널에서 `node kairos-ga.js` 실행  
출력

출력

![](/img/build/tutorials/ga-integration-3.png)

## 결론

Kaia에서 가스 추상화 트랜잭션을 실행하는 전체 과정을 완료했습니다. 계정 설정과 지원 토큰 충전부터 트랜잭션 구성 및 제출까지, 모든 과정을 사용자가 네이티브 KAIA를 보유하지 않고도 수행할 수 있었습니다. 또한 사용자가 완전히 가스프리로 에어드랍을 받고 청구할 수 있는 실제 플로우도 확인했습니다.

Kaia의 가스 추상화 기능을 사용하면 네이티브 토큰이 전혀 없는 사용자도 온보딩할 수 있어 마찰을 줄이고 Web3 애플리케이션의 더 부드러운 경험을 만들 수 있습니다.