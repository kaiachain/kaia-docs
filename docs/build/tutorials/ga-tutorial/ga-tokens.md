# 3. Supported Tokens

Developers should query the current list of supported tokens before attempting gasless transactions.

## 3.1. Token Eligibility Criteria

- **ERC-20 Compliance:** Tokens must be fully ERC-20 compliant.
- **No Fee-on-Transfer:** Fee-on-Transfer (FoT) tokens are not supported, as they can cause swap amounts to mismatch, leading to transaction failure.
- **Governance Whitelist:** The `GaslessSwapRouter` maintains a list of supported tokens, which is managed by Kaia Foundation.

## 3.2 Currently Supported Tokens

Gasless transactions currently support the following tokens. Additional CL tokens and stablecoins may be included in the future.

- **USDT**
- **BORA**

## 3.3 How to Check the Supported Token List

You can find the official [KIP-247 GaslessSwapRouter contract addresses](https://docs.kaia.io/references/contract-addresses/) for both mainnet and testnet in the Kaia Docs.

**GaslessSwapRouter Contract Addresses:**

- **Mainnet**: `0xCf658F786bf4AC62D66d70Dd26B5c1395dA22c63`
- **Kairos Testnet**: `0x4b41783732810b731569E4d944F59372F411BEa2`

Always refer to the official documentation for the most current address.

### Using Block Explorer (KaiaScan)

To check the supported tokens using a block explorer like KaiaScan:

![](/img/build/tutorials/ga3.png)

1. Go to [KaiaScan](https://kaiascan.io/) (or [kairos.kaiascan.io](https://kairos.kaiascan.io/) for the testnet).
2. Search for the `GaslessSwapRouter` address.
3. Navigate to the **Contract** tab and select **Read Contract**.
4. Find the `getSupportedTokens()` function and click **Query**. This will return an array of supported ERC20 token addresses.

### Programmatic Query

To programmatically check supported tokens, you can use the GaslessSwapRouter contract methods.

**Use GSR methods:**

```solidity
function getSupportedTokens() external view returns (address[] memory);
function dexAddress(address token) external view returns (address dex); // reverts if token unsupported
```

**Use SDK (Example)**

```javascript
// Ethers-ext.js
const ethers = require("ethers6");
const { gasless } = require('@kaiachain/ethers-ext');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const router    = await gasless.getGaslessSwapRouter(provider);
const supported = await router.getSupportedTokens();

// Web3-ext.js
const { Web3 } = require("@kaiachain/web3js-ext");

const provider = new Web3.providers.HttpProvider(RPC_URL);
const web3 = new Web3(provider);

const router    = await gasless.getGaslessSwapRouter(web3);
const supported = await router.methods.getSupportedTokens().call();
```