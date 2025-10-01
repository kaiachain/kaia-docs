# Integrate Kaia Fee Delegation Service

This guide provides an overview of the Kaia Fee Delegation Service, how to apply for access, prerequisites, integration examples, and API references. It is designed to help developers integrate fee delegation capabilities into their decentralized applications (DApps) on the Kaia network.

## 1. Overview

### What is Kaia Fee Delegation Service?

The Kaia network's fee delegation feature allows another account to pay transaction gas fees on behalf of users. The Kaia Fee Delegation Service leverages this capability to enable users to interact with your DApp without holding KAIA tokens for gas fees. Instead of users paying gas fees themselves, your application pays the fees on their behalf through the kaia managed fee delegation server.

:::note

Kaia's Fee Delegation Service acts as a managed service to onboard DApps and provide a smoother fee delegation experience. The fee delegation feature exists natively in the Kaia blockchain, and developers can implement fee delegation for their users by setting up the infrastructure themselves.

:::

### Benefits

* **Better UX**: Users don't need KAIA tokens to use your DApp  
* **Onboarding**: New users can start using your DApp immediately  
* **Simplified Wallet**: Users only need tokens they want to trade/use

### How It Works

1. **User signs the transaction** - User creates and signs a fee-delegated transaction with their wallet  
2. **DApp sends to Fee Delegation Service** - Your DApp backend sends the signed transaction to Fee Delegation Service API endpoint  
3. **Server verifies and pays fees** - Fee Delegation Service validates the transaction and pays gas fees on behalf of the user if it is valid

![Fee Delegation Service Workflow](/img/build/tutorials/fee-delegation-workflow.png)

## 2. Apply for Access

You can request access to the Kaia Fee Delegation Service by reviewing and completing this [Google form](https://docs.google.com/forms/d/e/1FAIpQLScSMnI8fD1xbyeoAL3TI81YxT3V1UfoByca84M7TZzYII5Pmw/viewform).

:::note

The Kaia team communicates and configures the Dapp into FeeDelegationServer and notify the dApp Partner once the Google form is submitted.

:::

## 3. Prerequisites and Supported Environments

### Service Endpoints

* **Production**: `https://fee-delegation.kaia.io`  
* **Testnet**: `https://fee-delegation-kairos.kaia.io`

For Swagger documentation, visit:

* **Production**: `https://fee-delegation.kaia.io/api/docs`  
* **Testnet**: `https://fee-delegation-kairos.kaia.io/api/docs`

### Wallet Compatibility (Frontend Integrations)

:::info

When integrating the Kaia Fee Delegation Service from the frontend, ensure that your wallet supports the Kaia fee delegation standard for fee-delegated transaction signing.

:::

Currently supported wallets for frontend integration:

* Kaia Wallet  
* OKX Wallet  
* Bitget Wallet

If your users are using other wallets, they may not be able to sign fee-delegated transactions correctly from frontend.

:::note

**Backend integrations** are wallet-agnostic. You can handle signing and submission server-side for full control and broader compatibility.

:::

## 4. Access Model and Security

This section explains the access model and security features of the Kaia Fee Delegation Service.

### Whitelist System

The service uses an API Key & Whitelisted Address system to handle fee delegation for DApps.

#### 1. API Key Authentication

For DApps with API keys configured, you must call the service with a valid API key AND either the contract OR sender can be whitelisted additionally

#### 2. Whitelist Access

For DApps without API keys configured, either the contract OR sender must be whitelisted address types:

* **Contract Address**: The smart contract your users interact with  
* **Sender Address**: The user's wallet address initiating the transaction

### Transaction Validation Rules

**For Testnet:**  
All transactions are allowed for easy testing (no validation applied)

**For Mainnet:**  
Your transaction will be approved when these conditions are met:

1. **With API Key**: You provide a valid API key AND either your contract or sender address is whitelisted (any sender & contract address will work with a valid API key if no whitelist is configured)  
2. **Without API Key**: Either your contract or sender address is whitelisted in a DApp that doesn't have API keys

### Access Control Options

**Option 1: Open Access (No API Keys + Whitelisted Address)**

* Anyone can use your whitelisted contracts/addresses and fees will be deducted from your DApp balance  
* Good for: Public utilities, open games, community tools  
* Can use the API calls in either frontend or backend

**Option 2: Authenticated Access (With API Keys + Whitelisted Address)**

* Only your DApp can use the whitelisted contracts/addresses  
* Good for: Private DApps, enterprise applications, controlled access  
* Recommended to call the API with the key from the backend

**Option 3: Unrestricted Access (API Keys + No Whitelisted Address)**

* Your DApp can send any transaction with a valid API key  
* Good for: Wallet applications, multi-purpose DApps  
* Recommended to call the API with the key from the backend

## 5. Integration Examples

This section provides code examples for integrating the Kaia Fee Delegation Service in both backend and frontend applications.

### Backend (JavaScript/Node.js) Example

```javascript
const { Wallet, TxType, JsonRpcProvider, parseKaia } = require('@kaiachain/ethers-ext');

async function sendFeeDelegatedTransaction() {
  try {
    // 1. Setup wallet and provider
    const provider = new JsonRpcProvider('https://public-en-kairos.node.kaia.io');
    const wallet = new Wallet('your_private_key_here', provider);
    
    // 2. Create fee-delegated transaction
    const tx = {
      type: TxType.FeeDelegatedValueTransfer
      from: wallet.address,
      to: '0xAB', // replace your wallet address
      value: parseKaia('0.005'), // 0.005 KAIA
      gasLimit: 100000,
      gasPrice: await provider.getGasPrice(),
      nonce: await wallet.getTransactionCount(),
    };
    
    // 3. Sign transaction
    const signedTx = await wallet.signTransaction(tx);
    
    // 4. Send to fee delegation server
    const response = await fetch('https://fee-delegation-kairos.kaia.io/api/signAsFeePayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_api_key_here'
      },
      body: JSON.stringify({
        userSignedTx: { raw: signedTx }
      })
    });
    
    // 5. Handle response
    const result = await response.json();
    if (result.status) {
      console.log('Success! Transaction hash:', result.data.transactionHash);
    } else {
      console.log('Failed:', result.message);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}
sendFeeDelegatedTransaction();
```

### Frontend (React.js) Example

```javascript
import { useState } from 'react';
import { Web3Provider, TxType, parseKaia } from '@kaiachain/ethers-ext/v6';

// Optional API key
const config = {
  serverUrl: 'https://fee-delegation-kairos.kaia.io',
  apiKey: 'kaia_your_api_key_here'
};

export default function FeeDelegationComponent() {
  const [wallet, setWallet] = useState({ address: null, connected: false });
  const [form, setForm] = useState({ toAddress: '', amount: '0.005' });
  const { Web3Provider, TxType, parseKaia } = await import('@kaiachain/ethers-ext/v6');

  // 1. Connect wallet
  const connectWallet = async () => {
    try {
      const accounts = await window.klaytn?.enable();
      setWallet({ address: accounts[0], connected: true });
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  // 2. Send fee-delegated transaction
  const sendTransaction = async () => {
    try {
      const provider = new Web3Provider(window.klaytn);
      const signer = await provider.getSigner(wallet.address);
      
      // 3. Create and sign transaction
      const tx = {
        type: TxType.FeeDelegatedValueTransfer,
        from: wallet.address,
        to: form.toAddress,
        value: parseKaia(form.amount)
      };
      
      const signedTx = await signer.signTransaction(tx);
      
      // 4. Send to fee delegation server
      const response = await fetch(`${config.serverUrl}/api/signAsFeePayer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          userSignedTx: { raw: signedTx }
        })
      });
      
      // 5. Handle response
      const result = await response.json();
      if (result.status) {
        console.log('Success! Transaction hash:', result.data.transactionHash);
      } else {
        console.log('Failed:', result.message);
      }
      
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {wallet.connected ? 'Connected' : 'Connect Kaia Wallet'}
      </button>
      
      <input 
        value={form.toAddress}
        onChange={(e) => setForm({...form, toAddress: e.target.value})}
        placeholder="Recipient address"
      />
      
      <input 
        value={form.amount}
        onChange={(e) => setForm({...form, amount: e.target.value})}
        placeholder="Amount"
      />
      
      <button onClick={sendTransaction} disabled={!wallet.connected}>
        Send Transaction
      </button>
    </div>
  );
}

```

### Additional Implementation Examples (links)

For more comprehensive implementation examples, please refer to:

- [ethers-ext@V6 HTML example](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-html/main.js#L294)  
- [ethers-ext@V6 ReactJS example](https://github.com/kaiachain/kaia-sdk/blob/dev/ethers-ext/example/v6/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)  
- [web3js example](https://github.com/kaiachain/kaia-sdk/blob/dev/web3js-ext/example/browser-html/main.js#L265)  
- [viem-ext example](https://github.com/kaiachain/kaia-sdk/blob/dev/viem-ext/examples/browser-react/src/components/KlaytnFeeDelServiceSC.tsx#L18)

## 6. API Reference

This section provides details about the API endpoints available for the Kaia Fee Delegation Service.

### `POST /api/signAsFeePayer`

**Description:** Processes Fee Delegation Transaction

**Headers:**

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

**Request Body:**

```
{
  "userSignedTx": {
    "raw": "<RLP_encoded_signed_transaction>"
  }
}
```

**Parameters:**

* `userSignedTx.raw` (string, required): The RLP-encoded transaction signed by the user

**Response:**

```json
// Transaction Success
{
  "message": "Request was successful",
  "data": <TransactionReceipt>,
  "status": true
}
```

:::note

Refer to 'SignAsFeePayer API Response Codes and Examples' below for detailed response information

:::

### `GET /api/balance`

**Description:** Check whether the balance is sufficient (greater than 0.1 KAIA)

With API Key:

```
GET /api/balance
Authorization: Bearer your_api_key_here
```

Without API Key (using address):

```
GET /api/balance?address=0x742d35Cc6634C0532925a3b8D2A4DDDeAe0e4Cd3
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer <API_KEY> (optional - required for DApps with API keys)
```

**Query Parameters:**

* `address` (string, optional): Contract or sender address to check balance for (required when no API key provided)

**Response:**

```json
{
  "message": "Request was successful",
  "data": true,  // true if sufficient balance, false if insufficient
  "status": true
}
```

### SignAsFeePayer API Response Codes and Examples

#### 200 Success Responses

```javascript
// Transaction Success
{
  "message": "Request was successful",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "contractAddress": null,
    "cumulativeGasUsed": "31000",
    "from": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
    "gasPrice": "27500000000",
    "gasUsed": "31000",
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "index": 0,
    "logs": [],
    "logsBloom": '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    "status": 1,
    "to": "0x6C4ED74027ab609f506efCdd224041c9F5b5CDE1",
  },
  "status": true
}

// Transaction Reverted (200 but failed)
{
  "message": "Transaction reverted",
  "error": "REVERTED",
  "data": {
    "_type": "TransactionReceipt",
    "blockHash": "0x2a7ae196f6e7363fe3cfc79132c1d16292d159e231d73b4308f598a3222d1f57",
    "blockNumber": 191523443,
    "status": 0,
    "hash": "0x0ca73736ceecf2dcf0ec2e1f65760d0b4f7348726cb9a0477710172b1dd44350",
    "index": 0,
    "logs": [],
    "logsBloom": '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  "status": false
}

```

#### 400 Bad Request Responses

```javascript
// Invalid API Key
{
  "message": "Bad request",
  "data": "Invalid API key",
  "error": "BAD_REQUEST",
  "status": false
}

// Missing userSignedTx
{
  "message": "Bad request",
  "data": "userSignedTx is required, [format] -- { userSignedTx: { raw: user signed rlp encoded transaction } }",
  "error": "BAD_REQUEST",
  "status": false
}

// Not Whitelisted
{
  "message": "Bad request",
  "data": "Contract or sender address are not whitelisted",
  "error": "BAD_REQUEST",
  "status": false
}

// DApp Inactive
{
  "message": "Bad request",
  "data": "DApp is inactive. Please contact the administrator to activate the DApp.",
  "error": "BAD_REQUEST",
  "status": false
}

// Insufficient Balance
{
  "message": "Bad request",
  "data": "Insufficient balance in fee delegation server, please contact the administrator.",
  "error": "BAD_REQUEST",
  "status": false
}

// DApp Terminated
{
  "message": "Bad request",
  "data": "DApp is terminated. Please contact the administrator to activate the DApp.",
  "error": "BAD_REQUEST",
  "status": false
}

```

#### 500 Internal Server Error Responses

```javascript
// Transaction failed
{
  "message": "Internal server error",
  "data": "Sending transaction was failed after 5 try, network is busy. Error message: <ERROR MESSAGE>",
  "error": "INTERNAL_ERROR",
  "status": false
}

// If transaction receipt not found
{
  "message": "Internal server error",
  "data": "Transaction was failed",
  "error": "INTERNAL_ERROR",
  "status": false
}
```

## 7. Error Handling and Best Practices

### Common Error Handling

| Error Message | What to Do |
| :---- | :---- |
| `Sending transaction was failed after 5 try, network is busy. Error message: <ERROR MESSAGE>` | 1. Verify that the `userSignedTx.raw` payload is correctly formatted and signed  <br/>2. For **Low Nonce issue**, ensure there are no pending transactions in your wallet. (For Kaia wallet, cancel any pending transactions and clear your history before retrying).  <br/>3. For **KNOWN transaction issue**, recheck if your current transaction is completed and move to other transactions |
| Invalid API key | Ensure you are using a valid API key. If you don't have one, or if it's invalidated, contact the Kaia team to get a new one. |
| userSignedTx is required | Make sure your request body correctly includes the `userSignedTx` object with the `raw` field containing the RLP-encoded signed transaction. Double-check the JSON structure and ensure the transaction data is properly encoded. |
| Contract or sender address are not whitelisted | Verify that either the smart contract address your users are interacting with, or the user's wallet address initiating the transaction, has been whitelisted for your DApp. |
| DApp is inactive. Please contact the administrator to activate the DApp. | Your DApp's status is currently inactive on the fee delegation service. Contact the Kaia team or the designated administrator to inquire about activating your DApp. |
| Insufficient balance in fee delegation server, please contact the administrator. | The fee delegation server's balance for your DApp is too low to cover the transaction fees. Contact the administrator or the Kaia team to top up your DApp's balance. You may also receive email alerts before this happens. |
| DApp is terminated. Please contact the administrator to activate the DApp. | Your DApp's access to the fee delegation service has been terminated. Reach out to the Kaia team or the administrator to understand the reason for termination and discuss possible reactivation. |

### Best Practices

#### Transaction Management

When sending multiple transactions (bulk or sequential transactions) from the same sender address, manage transaction order carefully to avoid nonce-related failures:

1. **Wait for confirmation**: Ensure each transaction is confirmed (i.e., you’ve received the transaction receipt) before sending the next one.  
2. **Ensure nonces are managed correctly:** ensuring transactions are submitted with the correct nonce and that any failed or older nonces are properly handled before new transactions proceed. For detailed strategies on nonce management in bulk transaction scenarios, see [How to Manage Nonces for Reliable Transactions](../cookbooks/how-to-manage-nonce.md).
3. **Implement retry logic**: Build a retry mechanism to handle temporary failures, dropped transactions, or delayed confirmations.  
4. **Frontend wallet users:** If using browser-based wallets (like Kaia Wallet, OKX Wallet, or Bitget) from the frontend, advise users to clear any pending or stuck transactions by using the wallet’s “Clear History” feature to prevent nonce conflicts.

#### API Calls

When calling the API, if an **API KEY** is required, we recommend using it from the DApp backend. If no **API KEY** is required, the DApp can call the API from either the frontend or the backend.

## 8. Support and Resources

### Support & Resources

* [Kaia Fee Delegation Example](https://docs.kaia.io/build/tutorials/fee-delegation-example/)  
* [DApp Portal Fee Delegation](https://docs.dappportal.io/extra-packages/gas-fee-delegation)  
* [Kaia SDK Documentation](https://docs.kaia.io/references/sdk/)

### Custom Integrations

For advanced or custom transaction whitelisting integrations beyond the standard whitelist system (such as specialized token validation, complex routing logic, or custom DeFi protocols), please contact the Kaia team for tailored solutions.

## 9. FAQ

**Q: What's the difference between fee delegation with or without Kaia Fee Delegation Service?**  
**A:** Kaia's Fee Delegation Service acts as a managed service to onboard DApps and provide a smoother fee delegation experience. Please note that the fee delegation feature exists natively in the Kaia chain, and users can delegate fees for their users by setting up the infrastructure themselves.

**Q: What's the difference between contract and sender whitelisting?**  
**A:** Contract whitelisting allows any user to interact with specific smart contracts through your DApp. Sender whitelisting allows specific wallet addresses to make any transaction. You can use both simultaneously.

**Q: What happens if my balance runs out?**  
**A:** Transactions will be rejected with an "Insufficient balance" error. We will send email alerts to notify you before your balance gets too low if configured.

**Q: Can I whitelist multiple contracts for one DApp?**  
**A:** Yes, you can whitelist multiple contracts and sender addresses for a single DApp.

**Q: What happens when the balance is over?**  
**A:** To continue using the service, you will need to contact the Kaia team to deposit or request more balance. However, you can also make sure to call **`/api/balance?address=${address}`** API to check if you have sufficient balance and check from the dashboard as well [**https://fee-delegation.kaia.io/rank**](https://fee-delegation.kaia.io/rank)

**Q: Once whitelisting or an API key is in place, does it require code changes on the DApp or DApp backend?**  
**A:** For the API Key, you will need to add it in the "Authorization" headers with “Bearer your_api_key” when you call the **`/api/signAsFeePayer`** API. However, if it's solely address whitelisting without an API Key, no code changes are needed.

**Q: Where should I use this API call?**  
**A:** API calls **without an API key** can be used in both the **frontend and backend**, as they are subject to **stricter validation rules** (e.g., requiring whitelisted addresses).  
However, when using **API keys**, we **strongly recommend** making those calls from the **backend** to ensure security, since API key usage typically involves **fewer validation checks** and exposes more privileges.

**Q: I keep getting nonce errors or stuck transactions. How do I fix nonce issues on Kaia?**
**A:** Nonce gaps or duplicates can block your transactions. Start by confirming the on‑chain transaction count for your account, then align your next nonce with it. For bulk or fee‑delegated flows, use an off‑chain nonce store with per‑account locking, and replace stuck transactions using the same nonce with a higher fee rather than sending new ones. For a complete set of patterns and recovery steps, see [How to Manage Nonces for Reliable Transactions](../cookbooks/how-to-manage-nonce.md).