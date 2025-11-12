---
id: integrate-gas-free-usdt-kaia-swap
title: Integrate Gas-Free USDT to KAIA Swaps
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Integrate Gas-Free USDT to KAIA Swaps

This guide provides an overview of the Gas-Free USDT to KAIA Swap feature, including its purpose, prerequisites, integration steps, and API references. It is designed to help developers integrate gas-free swap capabilities into their decentralized applications (DApps) on the Kaia network.

## Introduction

A `gasFreeSwapKaia` API was introduced to enable users to perform gasless ERC20 token swaps (currently limited  to  USDT ) on the Kaia network without needing to hold KAIA tokens for gas fees, or even when covering transaction costs on behalf of users. The API specifically supports swapping USDT to KAIA using ERC20 permit signatures for a completely gasless user experience.

### Benefits 

- **100% Gasless Experience**: Users don't need any KAIA tokens to perform swaps
- **Enhanced User Onboarding**: New users can start swapping tokens immediately without acquiring KAIA
- **ERC20 Permit Integration**: Uses standard ERC20 permit signatures for secure, gasless token approvals

### How It Works

- **User Initiates Swap**: User selects USDT amount to swap for KAIA
- **Frontend Creates Permit**: DApp constructs an ERC20 permit signature for the user to sign
- **User Signs Permit**: User signs the permit message (no gas required)
- **DApp Calls API**: Frontend sends swap parameters and permit signature to the API
- **Backend Executes**: API validates the permit, executes the swap, and pays all gas fees
- **User Receives KAIA**: Native KAIA tokens are sent directly to the user's wallet

## Prerequisites and Supported Environments

**Service Endpoints**

<Tabs>
  <TabItem value="Mainnet" label="Kaia Mainnet">
    https://fee-delegation.kaia.io
  </TabItem>

 <TabItem value="Testnet" label="Kairos Testnet">
    https://fee-delegation-kairos.kaia.io
 </TabItem>
</Tabs>


**Supported Token Pair**

The API currently supports a single trading pair only:

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet">
    Token In: USDT (`0xd077a400968890eacc75cdc901f0356c943e4fdb`)

    Token Out: WKAIA (`0x19aac5f612f524b754ca7e7c41cbfa2e981a4432`)
  </TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    Token In: TEST (`0xcb00ba2cab67a3771f9ca1fa48fda8881b457750`)

    Token Out: WKAIA (`0x043c471bEe060e00A56CcD02c0Ca286808a5A436`)
 </TabItem>
</Tabs>

**Get Test Tokens**

To get TEST tokens for Kairos Testnet:

- Open [ERC20 Faucet](https://kairos.kaiascan.io/address/0x78a6cacfe5d34e0566e56710c8789d207411001a?tabId=contract&page=1) on Kaiascan
- Go to the Contract tab, then select *Write Contract*
- Locate the claim(token) function
- Paste in the address of a supported GA token on Kairos (for this guide, use the address for TEST)
- Click *Query* to submit the request. You should receive your TEST tokens shortly.

![](/img/build/tutorials/test-tokens-faucet.png)

**Smart Contract Requirements**

The API interacts with the GaslessERC20PermitSwap smart contract which:

- Supports ERC20 permit-based approvals
- Integrates with Uniswap V2-compatible DEX
- Converts WKAIA to native KAIA automatically
- Enforces maximum swap limits for security

**User Requirements**

On mainnet, users must have zero KAIA balance to use this gasless swap service. This requirement ensures the service is used only by users who truly need gasless transactions for onboarding purposes. While on testnet, this restriction is relaxed for testing purposes.

The maximum swap amount is limited to 1 USDT on both mainnet and testnet. As this feature is designed for users to receive enough KAIA to begin their experience on the Kaia Chain.

## Integration Steps

### Complete Integration Example

```javascript
const { JsonRpcProvider, Wallet } = require('@kaiachain/ethers-ext/v6');
const { Contract, parseUnits, formatUnits, Signature } = require('ethers');

async function fetchJson(url, init) {
  if (typeof fetch !== 'undefined') {
    return fetch(url, init);
  }
  const { default: nodeFetch } = await import('node-fetch');
  return nodeFetch(url, init);
}

const GASLESS_SWAP_ABI = [
  'function usdtToken() view returns (address)',
  'function wkaiaToken() view returns (address)',
  'function maxUsdtAmount() view returns (uint256)',
  'function getExpectedOutput(address tokenIn, address tokenOut, uint256 amountIn) view returns (uint256)',
  'function executeSwapWithPermit(address user, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMin, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
];

const ERC20_METADATA_ABI = [
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function nonces(address owner) view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
];

async function buildPermitSignature({ token, owner, spender, value, deadline, domainVersion = '1' }) {
  const [name, version, network, verifyingContract, nonce] = await Promise.all([
    token.name(),
    Promise.resolve(domainVersion),
    owner.provider.getNetwork(),
    token.getAddress(),
    token.nonces(owner.address),
  ]);

  const domain = {
    name,
    version,
    chainId: Number(network.chainId),
    verifyingContract,
  };

  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const message = {
    owner: owner.address,
    spender,
    value,
    nonce,
    deadline,
  };

  return Signature.from(await owner.signTypedData(domain, types, message));
}

async function executeGaslessSwap({
  rpcUrl,
  serverUrl,
  userWallet,
  contractAddress,
  amountIn = '0.01', // Amount in USDT
  slippageBps = 50,   // 0.5% slippage
  permitDeadlineSeconds = 600 // 10 minutes
}) {
  console.log('🚀 Starting gasless swap');

  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = userWallet.connect(provider);
  const swap = new Contract(contractAddress, GASLESS_SWAP_ABI, provider);

  // Get token addresses from contract
  const [tokenInAddress, tokenOutAddress, maxUsdtAmount] = await Promise.all([
    swap.usdtToken(),
    swap.wkaiaToken(),
    swap.maxUsdtAmount(),
  ]);

  const tokenIn = new Contract(tokenInAddress, ERC20_METADATA_ABI, provider);
  const tokenOut = new Contract(tokenOutAddress, ERC20_METADATA_ABI, provider);

  const [tokenInDecimals, tokenOutDecimals, tokenInSymbol, tokenOutSymbol] = await Promise.all([
    tokenIn.decimals(),
    tokenOut.decimals(),
    tokenIn.symbol(),
    tokenOut.symbol(),
  ]);

  const amountInWei = parseUnits(amountIn, tokenInDecimals);
  
  // Check if amount exceeds contract maximum
  if (amountInWei > maxUsdtAmount) {
    throw new Error(`Amount (${amountIn} ${tokenInSymbol}) exceeds contract cap (${formatUnits(maxUsdtAmount, tokenInDecimals)} ${tokenInSymbol})`);
  }

  // Get expected output and calculate minimum with slippage
  const expectedOut = await swap.getExpectedOutput(tokenInAddress, tokenOutAddress, amountInWei);
  const amountOutMin = (expectedOut * BigInt(10_000 - slippageBps)) / 10_000n;

  // Create permit signature
  const deadline = BigInt(Math.floor(Date.now() / 1000) + permitDeadlineSeconds);
  const signature = await buildPermitSignature({
    token: tokenIn,
    owner: wallet,
    spender: contractAddress,
    value: amountInWei,
    deadline,
  });

  // Prepare API payload
  const payload = {
    swap: {
      user: wallet.address,
      tokenIn: tokenInAddress,
      tokenOut: tokenOutAddress,
      amountIn: amountInWei.toString(),
      amountOutMin: amountOutMin.toString(),
      deadline: deadline.toString(),
    },
permitSignature: signature.serialized,
  };

  console.log('From:', wallet.address);
  console.log('Swap amount:', formatUnits(amountInWei, tokenInDecimals), tokenInSymbol);
  console.log('Minimum out:', formatUnits(amountOutMin, tokenOutDecimals), tokenOutSymbol);

  // Check balance before swap
  const balanceBefore = await provider.getBalance(wallet.address);
  
  // Call the API
  const response = await fetchJson(`${serverUrl}/api/gasFreeSwapKaia`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  console.log('HTTP status:', response.status);
  console.log('Response:', JSON.stringify(result, null, 2));

  if (response.ok && result.status) {
    console.log('🎉 Gasless swap request succeeded');
    
    // Check balance after swap
    const balanceAfter = await provider.getBalance(wallet.address);
    console.log('Balance before:', formatUnits(balanceBefore, 18), 'KAIA');
    console.log('Balance after:', formatUnits(balanceAfter, 18), 'KAIA');
    console.log('Balance difference:', formatUnits(balanceAfter - balanceBefore, 18), 'KAIA');
    
    return result;
  } else {
    console.error('❌ Gasless swap request failed');
    throw new Error(`Swap failed: ${result.data || result.message || 'Unknown error'}`);
  }
}

// Usage example
async function main() {
  try {
    const userWallet = new Wallet('your_private_key');
    
    const result = await executeGaslessSwap({
      rpcUrl: 'https://public-en-kairos.node.kaia.io',
      serverUrl: 'https://fee-delegation-kairos.kaia.io',
      userWallet: userWallet,
      contractAddress: '0xaaFe47636ACe87E2B8CAaFADb03E87090277Ff7B',
      amountIn: '0.002',
      slippageBps: 50,
    });
    
    console.log('Transaction hash:', result.data.hash);
  } catch (error) {
    console.error('💥 Swap failed:', error.message);
  }
}

main();
```

## API Reference Endpoint

- URL: `/api/gasFreeSwapKaia`
- Method: POST
- Content-Type: application/json

### Request Body

```javascript
{
  "swap": {
    "user": "0x742d35Cc6635C0532925a3b8D400e6D2A4b8E0bb",
    "tokenIn": "0xcb00ba2cab67a3771f9ca1fa48fda8881b457750",
    "tokenOut": "0x043c471bEe060e00A56CcD02c0Ca286808a5A436",
    "amountIn": "1000000",
    "amountOutMin": "950000000000000000",
    "deadline": "1699123456"
  },
  "permitSignature": "0x…65-byte signature string…"
}
```

### Parameters

**swap** (object, required):

- user (string): Address of the token owner who signed the permit
- tokenIn (string): Address of input token (must match configured USDT address)
- tokenOut (string): Address of output token (must match configured WKAIA address)
- amountIn (string): Amount of input tokens as string (in wei/smallest unit)
- amountOutMin (string): Minimum expected output tokens (slippage protection)
- deadline (string): Unix timestamp (seconds) for permit and swap expiration

**permitSignature** (string, required):

- Must be a valid hex string of 65 bytes 
- Contains the serialized ERC20 permit signature

### Response Format

#### Success Response (200)

```javascript
{
  "message": "Request was successful",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "contractAddress": null,
    "cumulativeGasUsed": "215000",
    "from": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
    "gasPrice": "25000000000",
    "gasUsed": "215000",
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "status": 1,
    "to": "0x45bD04d5f14DD9AB908109cFEa816F758FaE6709",
    "type": 49,
    "feePayer": "0x1234567890abcdef1234567890abcdef12345678",
    "feePayerSignatures": ["0x..."],
    "logs": [
      {
        "address": "0x...",
        "topics": ["0x..."],
        "data": "0x..."
      }
    ]
  },
  "status": true,
  "requestId": "req_abc123def456"
}
```

#### Error Responses

**400 Bad Request - Validation Errors:**

```javascript
{
  "message": "Bad request",
  "data": "Permit deadline has expired",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_error_123"
}
```

**400 Bad Request - Transaction Revert:**

```javascript
{
  "message": "Bad request",
  "data": "execution reverted: Permit already used",
  "error": "BAD_REQUEST",
  "status": false,
  "requestId": "req_revert_456"
}
```

**500 Internal Server Error:**

```javascript
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: Network timeout",
  "error": "INTERNAL_ERROR",
  "status": false,
  "requestId": "req_error_789"
}
```

## Error Handling

### Common Error Scenarios

| Error  	| HTTP Status  	|  Description 	| Solution   	|
|---	|---	|---	|---	|
| Missing required fields  	| 400  	| *swap* or *permitSignature* missing  	| Include all required parameters  	|
| User has KAIA balance   	| 400  	| User must have zero KAIA balance  	| Only users with zero KAIA balance can use this service  	|
| Invalid signature format  	| 400  	| Permit signature is not a valid hex string  	| Provide a valid 65-byte hex signature  	|
| Invalid address   	| 400  	| Malformed Ethereum address  	| Validate if addresses are valid  	|
| Unsupported token  	| 400  	| Token not in allowed list   	| Use only configured token addresses   	|
| Expired deadline  	| 400  	| Permit deadline in the past  	| Use future timestamp  	|
| Amount too large  	| 400  	| Exceeds contract maximum  	| Check *maxUsdtAmount()* from contract   	|
| Insufficient quote  	| 400 	| Slippage too strict  	| Increase slippage tolerance or reduce amount   	|
| Gas price too high   	| 400   	| Network congestion  	| Wait for lower gas prices  	|
| Network timeout  	| 500  	| RPC provider issues   	| Retry request after delay  	|

## Security Considerations

### Gas Price Protection

The API rejects transactions when gas prices exceed 50 gwei to prevent excessive costs. Monitor gas prices and inform users during high congestion periods.

### Signature Security

- Never reuse permit signatures
- Always use reasonable deadlines (5-30 minutes)
- Validate all parameters before signing
- Use HTTPS for all API communications

## Smart Contract Details

### GaslessERC20PermitSwap Contract Address

<Tabs>
  <TabItem value="kaia-mainnet" label="Kaia Mainnet">
   ```
   0x45bD04d5f14DD9AB908109cFEa816F758FaE6709
   ```
  </TabItem>

 <TabItem value="kairos-testnet" label="Kairos Testnet">
    ```
    0xaaFe47636ACe87E2B8CAaFADb03E87090277Ff7B
    ```
 </TabItem>
</Tabs>

### Key Functions

**executeSwapWithPermit** - Executes the gasless swap using a permit signature:

- Validates permit and swap parameters
- Transfers tokens using permit
- Executes DEX swap
- Converts WKAIA to native KAIA
- Sends native KAIA to user

**getExpectedOutput** - View function to get expected output amount:

```javascript
function getExpectedOutput(
  address tokenIn,
  address tokenOut,
  uint256 amountIn
) external view returns (uint256)
```

### Contract Limits

- Maximum USDT per swap: 1,000,000 (1 USDT with 6 decimals)
- Supported pair: USDT → WKAIA → Native KAIA
- Anti-replay protection via signature tracking


## Additional Resources

- [ERC20 Permit Standard (EIP-2612)](https://eips.ethereum.org/EIPS/eip-2612)
- [Kaia Ethers Extension](https://github.com/kaiachain/ethers-ext)


