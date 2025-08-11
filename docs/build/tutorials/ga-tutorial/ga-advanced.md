# 6. Advanced Topics & FAQ

This section covers advanced integration techniques, best practices, troubleshooting tips, and frequently asked questions about Kaia's Gas Abstraction (GA) feature. It is designed for developers who want to optimize their implementation and ensure a smooth user experience.

## 6.1 Best Practices

| Topic | Recommendation | Notes |
|-------|--------------------------|-------|
| **Slippage** | Start with **0.5 % (50 bps)** for `getAmountIn()` unless the token is highly volatile. | The SDK does **not** hard-code a value; 0.5 % is the de-facto default shown in Kaia’s reference code. |
| **Allowance** | Cache the ERC-20 allowance and **skip `ApproveTx`** when `allowance > 0`, avoiding an extra signature & gas. | KIP-247 allows a 2-tx bundle (Lend + Swap) when approval already exists, so re-using allowance is completely safe. |
| **Batch submit** | Use `kaia_sendRawTransactions` (array payload) to push **ApproveTx + SwapTx** together, preventing pool race conditions. | Single-tx calls (`eth_sendRawTransaction`) work, but if the second tx reaches the node first it will fail the nonce/static-rule checks. |
| **Security** | a) **Hard-code** the canonical GaslessSwapRouter (GSR) address from Kaia docs. <br/>b) **Verify support** before building a swap, e.g. `await router.dexAddress(token)` inside a try/catch or by checking the list returned from `getSupportedTokens()`. | Prevents phishing contracts or unsupported tokens from hijacking the GA flow. |
| **Gas estimation without KAIA** | Use `eth_estimateGas` with **state override** to give the sender a temporary balance in the call, e.g. `eth_estimateGas(txObj, 'latest', { [from]: { balance: '0x…' } })`. | Bypasses *“insufficient balance”* errors when the account truly has 0 KAIA. |

## 6.2 Troubleshooting

| Symptom | Probable Cause | Recommended Fix |
|---------|---------------------------|----------------------------|
| **Bundle never mined** | a) `token` **not whitelisted**. <br/>b) `minAmountOut` too tight and the whole bundle is reverted. | • **Check support first**: `await router.dexAddress(token)` (will revert if unsupported) **or** `getSupportedTokens().includes(token)` **before signing**.<br/>• Increase `slippageBps` or re-quote `amountIn` just-in-time. |
| **`INSUFFICIENT_OUTPUT_AMOUNT` revert** | The price changed between quote and execution, so the GSR check `amountReceived >= minAmountOut` fails. | Re-run `getAmountIn()` with current pool reserves, then rebuild `SwapTx` with a higher `minAmountOut` or wider slippage. |
| **Node rejects tx (“insufficient funds”)** | Only **GaslessApproveTx** was sent. Because the balance check is skipped and the paired **SwapTx** is missing, the proposer never injects **LendTx**, and the transaction spends KAIA it doesn’t have. | Always submit **ApproveTx & SwapTx in the same batch** via `kaia_sendRawTransactions`, or ensure `approveRequired == false` so you can send the 2-tx bundle. |
| **Nonce mismatch inside bundle** | External dApp sent a regular tx that consumed the next nonce before the GA bundle was mined. | Query `getTransactionCount()` just before signing; if nonce has moved, rebuild both tx objects. |
| `klay_sendRawTransactions → “undefined tx type”` | You tried to batch-send a Kaia-specific tx type (e.g., 0x30) through the **kaia_…** endpoint, which only supports Ethereum types. | Send GA bundle with `kaia_sendRawTransactions`, then broadcast the 0x30 AppTx with `klay_sendRawTransaction`. |

## 6.3 FAQ

### Is GA available on mainnet?

Yes, GA is currently live on both **Kairos testnet** and **mainnet**.

### What happens if the user doesn't have enough tokens for the swap?

The SwapTx will fail on-chain, but due to **KIP-245's atomic bundling**, the entire bundle gets reverted and excluded from the block. The user loses no funds, and their on-chain state remains unchanged - they pay zero gas fees for the failed attempt.

### How can I check which token and how much was swapped for gas?

Every successful `swapForGas` call emits a **SwappedForGas** event from `GaslessSwapRouter`.  
You can:

1. Look up the router address (see contract-addresses doc) on KaiaScan and open the **Events** tab.  
2. Decode the `token`, `amountIn`, `amountOut`, and `amountRepay` fields shown in the event log.  

If you need the data on-chain, listen for `SwappedForGas` in your indexer or dApp backend.

### Can GA be disabled by nodes?

Individual nodes can disable GA, but it's **enabled by default**. If one node has it disabled, transactions will eventually be processed by other nodes that support GA.

### Does Gas Abstraction slow blocks down?

No. KIP-245 exempts bundles from the 250 ms per-block *execution-timeout* check, so the EVM is allowed to finish processing the whole bundle once it has started. GA transactions are limited to well-known ERC20 approve and GSR swap operations, so they run for a reasonable amount of time. Therefore, GA bundles do not jeopardize the chain’s block-time budget.

### Where can I see a Gasless Transaction in action?

You can view them on the Kairos testnet explorer. These blocks show the full bundle being executed in series:

- **3-tx Bundle Example (Lend + Approve + Swap):** [Block 189826352 on Kairos KaiaScan](https://kairos.kaiascan.io/block/189826352?tabId=blockTransactions&page=1)
- **2-tx Bundle Example (Lend + Swap):** [Block 189826547 on Kairos KaiaScan](https://kairos.kaiascan.io/block/189826547?tabId=blockTransactions)

## 6.4 Additional Resources

**Technical Specifications:**

- [KIP-247: Gasless Transaction](https://kips.kaia.io/KIPs/kip-247) - Core GA specification
- [KIP-245: Transaction Bundle](https://kips.kaia.io/KIPs/kip-245) - Bundling mechanism
- [GaslessSwapRouter Contract](https://github.com/kaiachain/kaia/blob/v2.0.3/contracts/contracts/system_contracts/kip247/GaslessSwapRouter.sol)

**Developer Resources:**

- [Kaia SDK Repository](https://github.com/kaiachain/kaia-sdk)
- [Official Contract Addresses](https://docs.kaia.io/references/contract-addresses/)
- [Kaia Developer Documentation](https://docs.kaia.io/)

**Community & Support:**

- [KIP-247 Discussion Forum](https://devforum.kaia.io/t/discussion-on-kip-247/8089)
- [Kaia Discord](https://discord.gg/kaiachain)
- [GitHub Issues for SDK Support](https://github.com/kaiachain/kaia-sdk/issues)

**Educational Content:**

- [What if you could pay gas fees with stablecoins?](https://medium.com/kaiachain/pay-for-gas-fees-with-any-token-a-deep-dive-into-kaias-trustless-gas-abstraction-d670355a096b)
- [Kaia Consensus Liquidity Announcement](https://medium.com/kaiachain/kaia-consensus-liquidity-a-new-paradigm-in-blockchain-liquidity-7c8a7393cd19)