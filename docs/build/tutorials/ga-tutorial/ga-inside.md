# 2. How GA Works: Technical Deep Dive

This section provides a detailed technical overview of how Gas Abstraction operates within the Kaia network, including transaction bundling, atomicity, and the roles of key components.

## 2.1 Architecture Overview

GA is built on a decentralized architecture that leverages smart contracts and transaction bundling to ensure a seamless user experience.

### Key Components

- **[KIP-247 (Gasless Transaction)](https://kips.kaia.io/KIPs/kip-247):** Defines the specific transaction formats (`GaslessApproveTx`, `GaslessSwapTx`) that the network recognizes as eligible for gas abstraction.
- **[KIP-245 (Transaction Bundle)](https://kips.kaia.io/KIPs/kip-245):** Guarantees that the necessary sequence of transactions (lending, approving, swapping) is executed **atomically**—they either all succeed or all fail together.
- **[GaslessSwapRouter (GSR)](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol):** A core smart contract that performs the token-to-KAIA swap and repays the block proposer for the initial gas loan, all within the same block.

### Key Actors

The following diagram illustrates the key actors and their interactions in the GA process:

![](/img/build/tutorials/ga1.png)

- **Wallet**: The user's wallet or dApp interface that initiates the gasless transaction.
- **User Account**: The wallet or dApp user initiating the gasless transaction.
- **Block Proposer**: The node proposing the block, which temporarily lends KAIA for gas fees.
- **GaslessSwapRouter (GSR)**: The smart contract that handles the swap and repayment logic.
- **DEX Router**: The underlying decentralized exchange that performs the actual token swap.

## 2.2 Transaction Bundle Components

GA operates through **transaction bundling**, where the blockchain client groups *only* **LendTx + (optional) ApproveTx + SwapTx** into an atomic bundle. These three either all succeed or all fail. Any **AppTx** sent right after the bundle is *outside* the bundle and can revert independently.

![](/img/build/tutorials/ga2.png)

### LendTx (Lend Transaction)

- **Signer**: Block proposer
- **Purpose**: Temporarily lends KAIA to user for gas fees
- **Creation**: [Dynamically generated](https://github.com/kaiachain/kaia/blob/v2.0.3/kaiax/gasless/impl/getter.go#L267) during block construction
- **Amount**: Calculated to cover gas for ApproveTx + SwapTx

### ApproveTx (Approval Transaction) - Optional

- **Signer**: User
- **Purpose**: Approves ERC-20 token spending for GaslessSwapRouter
- **When needed**: If user hasn't previously approved the token
- **Format**: Must follow [KIP-247 specifications](https://kips.kaia.io/KIPs/kip-247)

### SwapTx (Swap Transaction)

- **Signer**: User
- **Purpose**: Swaps user tokens for KAIA and repays the proposer
- **Contract**: Calls [GaslessSwapRouter.sol](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol)
- **Validation**: Ensures `amountReceived >= minAmountOut >= amountRepay`

## 2.3 Atomicity and Failure Handling

**KIP-245 Bundle Properties:**

- **All-or-nothing execution**: If any transaction fails, entire bundle reverts
- **Timeout exemption**: Bundles are exempt from 250ms per-block execution limits
- **State rollback**: Failed bundles trigger complete state reversion

**Common Failure Scenarios:**

- Insufficient token balance → Bundle reverts, no gas lost
- Price slippage exceeded → SwapTx fails, bundle reverts
- Missing token approval → Validation fails, transactions remain in pool

## 2.4 Network-Level Processing

**Transaction Pool Validation**

Gasless transactions bypass normal balance checks in the transaction pool. The validation logic detects gasless transactions and skips the account balance check for gas fees.

**Promotion and Bundling Logic**

- GaslessApproveTx cannot be promoted without a corresponding GaslessSwapTx
- GaslessSwapTx can be promoted independently if the token is already approved
- Both transactions are promoted simultaneously when both are present

**Block Proposer Injection and Execution**

Block proposers automatically inject LendTx when they detect gasless transactions. The LendTx is created on-the-fly during block generation and placed before the user's gasless transactions.

## 2.5 Example Workflow with Balance Changes

Let's walk through a scenario where a user has `1.00 BORA` and `0 KAIA`.

| Step | Action | Proposer Balance | User Balance | Notes |
| :--- | :--- | :--- | :--- | :--- |
| 1. Initial | - | 10.00 KAIA | 0.00 KAIA, 1.00 BORA | User wants to pay for a tx. |
| 2. **`LendTx`** | Proposer lends 0.02 KAIA. | 9.97 KAIA | 0.02 KAIA, 1.00 BORA | Proposer pays its own gas. |
| 3. **`ApproveTx`** | User approves BORA for GSR. | 9.97 KAIA | 0.01 KAIA, 1.00 BORA | Gas (0.01 KAIA) paid from loan. |
| 4. **`SwapTx`** | User swaps 0.06 BORA for 0.04 KAIA. | **10.00 KAIA** | **0.01 KAIA**, 0.94 BORA | Proposer is repaid 0.03 KAIA. |
| 5. **`AppTx`** | User executes their main tx. | 10.00 KAIA | 0.00 KAIA, 0.94 BORA | Gas paid with KAIA from swap. |
