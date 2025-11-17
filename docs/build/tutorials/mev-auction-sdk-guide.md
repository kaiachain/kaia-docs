# Kaia MEV Auction SDK Guide for Searchers

[Kaia v2.1.0](https://github.com/kaiachain/kaia/releases/tag/v2.1.0) introduced the MEV Auction system, enabling searchers to participate in fair, transparent auctions for MEV opportunities. This guide provides a comprehensive walkthrough of the searcher workflow using the Kaia MEV Auction SDK.

:::info

This guide uses Kairos testnet endpoints and contract addresses. The mainnet launch is scheduled at the beginning of December 2025. When deploying to mainnet, update all endpoints and contract addresses accordingly.

:::

The searcher workflow consists of four main steps:

![](/img/build/tutorials/searcher-guide-1.png)

1. **Deposit**: Searchers deposit KAIA tokens into the `AuctionDepositVault` to fund bidding activity
2. **Bid**: Searchers compete by submitting sealed bids to the Auctioneer for backrun slots
3. **Submit Winning Bid**: The Auctioneer selects winners and forwards winning bids to Consensus Nodes (CNs)
4. **Execute Bid Transaction**: CNs execute the winning bid transactions through the `AuctionEntryPoint` contract

For detailed technical background, see [KIP-249](https://kips.kaia.io/KIPs/kip-249).

## Prerequisites

Before starting, ensure you have:

- A funded wallet with KAIA tokens for deposits
- [Go](https://golang.org/) installed (version 1.21+) for SDK examples
- Access to Kaia network endpoints (this guide uses Kairos testnet)
- (Optional) [Foundry](https://getfoundry.sh/) installed (for `cast` commands)

**Network Endpoints:**

- Kairos (testnet): `https://public-en-kairos.node.kaia.io`
- Mainnet: `https://public-en.node.kaia.io`

**Contract Addresses (Kairos):**

- AuctionFeeVault: `0xE4e7d880786c53b6EA6cfA848Eb3a05eE97b2aCC`
- AuctionDepositVault: `0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc`
- AuctionEntryPoint: `0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480`

For mainnet contract addresses (available after mainnet launch), check [Contract Addresses](../../references/contract-addresses.md).

:::tip[Monitor MEV Opportunities]

Searchers can identify profitable transactions by:

- **Subscribing to the Auctioneer's pending transaction API**: This API streams transactions directly from Consensus Nodes, allowing you to detect MEV opportunities in real-time. See the [Subscribe Pending Transactions](#step-3-subscribe-to-pending-transactions) section below.
- **Monitoring the network mempool independently**: Implement your own MEV opportunity detection logic by connecting directly to Kaia nodes.

:::

## Step 1: Deposit Funds

![](/img/build/tutorials/searcher-guide-2.png)

The `AuctionDepositVault` holds your bidding balance. Your deposit must cover both your bid amounts and estimated gas fees for bid execution.

### Understanding Deposit Requirements

Your deposit balance must cover:

- **Bid amount**: The KAIA you're willing to pay for winning the auction
- **Estimated gas fee**: Gas consumed during bid execution (deducted post-execution and sent to block proposers)

:::warning[Always maintain sufficient deposit balance]

If your balance is insufficient to cover the bid amount plus estimated gas fees, your bid will be rejected by the Auctioneer during validation.

:::

### Deposit Methods

The contract provides two deposit methods:

**Method 1: `deposit()`**

Deposits using the sender's balance. The deposit is credited to the sender's account.

```bash
# Deploy deposit of 200 KAIA
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "deposit()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

**Method 2: `depositFor(address searcher)`**

Deposits on behalf of another account. Useful for funding multiple searcher addresses from a single source.

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositFor(address)" <SEARCHER_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

### Check Your Balance

Query your current deposit balance:

```bash
cast call 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositBalances(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
```

For detailed deposit examples, see the [DEPOSIT.md guide](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/DEPOSIT.md).

## Step 2: Submit Bids

![](/img/build/tutorials/searcher-guide-3.png)

Once you identify a profitable transaction, submit a bid to the Auctioneer. Bids are sealed (hidden until the auction closes) and compete based on bid amount.

### Bid Structure

A bid consists of the following fields (as defined in [types.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/types.go)):

```go
type AuctionBid struct {
    TargetTxRaw  []byte         // Raw transaction bytes of target tx
    TargetTxHash common.Hash    // Transaction to backrun
    BlockNumber  *big.Int       // Target block number
    Sender       common.Address // Your searcher address
    To           common.Address // Contract to call
    Nonce        uint64         // Current nonce from AuctionEntryPoint
    Bid          *big.Int       // Your bid in KAIA
    CallGasLimit uint64         // Gas limit for your backrun logic
    Data         []byte         // Encoded function call
    SearcherSig  []byte         // EIP-712 signature from searcher
}
```

:::info

After you submit your bid, the Auctioneer validates and adds its own signature (`AuctioneerSignature`) before forwarding winning bids to Consensus Nodes. You only need to provide the `SearcherSig` (your EIP-712 signature).

:::

### Submit a Bid

The SDK provides a complete working example at [`example/submitbid.go`](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go). The example demonstrates:

- Establishing an HTTPS connection with the Auctioneer
- Detecting new blocks from the EN endpoint
- Generating target transactions and corresponding bids
- Submitting bids to the Auctioneer

**Action Required**: Replace your private key in the code before running it. Check the `TODO:` comments in the source code.

Run the example:

```bash
# From repository root
go run example/submitbid.go
```

### Bid Validation

The Auctioneer, Proposer, and Smart Contract each perform specific validation checks on bids. Key validation rules include:

- **Block number**: Must be in range `[currentBlockNumber + 1, currentBlockNumber + allowFutureBlock]` (typically `allowFutureBlock = 2`)
- **Bid amount**: Must be greater than 0 and less than or equal to your available deposit balance
- **Call data size**: Must not exceed `BidTxMaxDataSize` (64KB)
- **Call gas limit**: Must not exceed `BidTxMaxCallGasLimit` (10,000,000)
- **Nonce**: Must match your current nonce in `AuctionEntryPoint`. Query it with:
  ```bash
  cast call 0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480 "nonces(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
  ```
- **Signature**: Must be a valid EIP-712 signature (see [submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) for implementation)
- **Deposit coverage**: Must have sufficient deposit to cover `bid_amount + estimated_gas_fee`
- **Uniqueness**: Cannot have another winning bid in the same block (unless targeting the same transaction)
- **Auctioneer signature**: Must be valid (added by Auctioneer after your submission)

For a complete validation matrix showing which entity performs which checks, see the [bid validation guide](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/bid_validation.md).

## Step 3: Subscribe to Pending Transactions

![](/img/build/tutorials/searcher-guide-4.png)

The Auctioneer provides a WebSocket subscription service that streams pending transactions directly from Consensus Nodes. This allows searchers to detect MEV opportunities in real-time.

The SDK provides a complete example at [example/subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go).

The example demonstrates:

- Establishing a WebSocket connection to the Auctioneer
- Subscribing to the pending transaction stream
- Processing incoming transactions to identify MEV opportunities

Run the example:

```bash
# From repository root
go run example/subscribe_pendingtx.go
```

The subscription continuously prints transaction hashes as pending transactions are detected. You can extend this example to implement your own MEV detection logic.

## Step 4: Understanding Execution

When your bid wins, the Consensus Node executes it through the `AuctionEntryPoint` contract:

![](/img/build/tutorials/searcher-guide-1.png)

### Execution Flow

The execution process consists of three phases:

1. **Validation Phase**: Contract validates block number, signatures, nonce, and bid amount
2. **Bid Payment Phase**: Bid amount deducted from your deposit and sent to ecosystem fund
3. **Execution Phase**: Your backrun calldata executes (bid payment occurs regardless of execution outcome)

**Key Security Features:**

- Validators execute bids on your behalf (prevents reverting bids to dodge payment)
- Nonce increments prevent replay attacks
- Dual signatures (searcher + auctioneer) unauthorized bid replacement or manipulation
- Bid payment occurs regardless of backrun execution result

For detailed execution flow, see the [ENTRYPOINT.md guide](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/ENTRYPOINT.md).

## Step 5: Withdraw Funds

![](/img/build/tutorials/searcher-guide-5.png)

Withdrawing requires a two-step process with a lock period:

### 1. Reserve Withdrawal

Initiate withdrawal and start the 60-second lock period:

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "reserveWithdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

### 2. Complete Withdrawal

After 60 seconds, transfer the reserved amount:

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "withdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

:::info[Security Note]

The two-step withdrawal process with a lock period:

- Prevents flash exits during active auction periods
- Maintains protocol integrity by ensuring searchers honor their bids
- Protects against rapid capital manipulation attacks

:::

## API Reference

The Auctioneer provides two primary APIs for searchers:

**1. Submit Bid API**
- **Endpoint**: `POST /api/v1/auction/send`
- **Purpose**: Submit sealed bids for MEV opportunities

**2. Pending Transaction Subscription**
- **Endpoint**: `GET /api/v1/subscriber/pendingtx`
- **Purpose**: Real-time stream of pending transactions from Consensus Nodes
- **Example**: See implementation example in [subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go)

**Complete API Documentation:**
- OpenAPI (Swagger) specs available at:
  - **Kairos**: https://auctioneer-kairos.kaia.io/docs
  - **Mainnet**: Available after mainnet launch
- API Usage: [API Documentation](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/api_doc.md)

## Troubleshooting

### Common Issues

| Issue Category | Symptoms | Cause | Solution |
|---------------|----------|-------|----------|
| **Insufficient Balance** | Bid rejected by Auctioneer | Deposit balance doesn't cover bid amount + estimated gas fees | Check balance with `depositBalances()` and deposit more KAIA |
| **Nonce Mismatch** | Bid rejected or execution fails | Nonce doesn't match current nonce in `AuctionEntryPoint` | Query current nonce with `nonces()` before each bid. Remember: nonces increment only on execution, not submission |
| **Block Number Range** | Bid rejected by Auctioneer | Target block outside allowed range `[current+1, current+allowFutureBlock]` | Ensure block number is within range (typically +1 or +2). See FAQ for dual-submission strategy |
| **Invalid Signature** | Bid rejected by Auctioneer | Incorrect EIP-712 signature construction | Verify domain separator and type hash. Reference [submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) for correct implementation |
| **Gas Limit Issues** | Execution fails or bid rejected | `CallGasLimit` too low or exceeds maximum (10,000,000) | Test backrun logic on testnet to measure actual gas consumption |

## FAQ

### Subscription

**Q: How many concurrent connections are allowed per searcher?**

A: Pending transaction subscriptions are limited to two connections per searcher address.

**Q: How long do subscription connections remain active?**

A: Connections are automatically closed after 24 hours. Note that connections may be closed earlier than 24 hours if rolling updates are in progress.

### API Performance and Latency

**Q: How can I minimize API latency when submitting bids?**

A: The Auctioneer utilizes an L7 Load Balancer with the HTTPS protocol. The initial handshake consumes time depending on network state. To bypass this initial delay when sending subsequent bid APIs, it is strongly recommended to establish a keep-alive connection.

**Q: Should I be careful about API rate limits?**

A: To prevent being blocked by the Auctioneer API server, do not send the `ping` API too many times within a short period.

**Q: Does geographic location affect latency?**

A: Yes. The Auctioneer server is running in the GCP KR (Korea) region. You are recommended to host your infrastructure in a geographically close region to minimize latency and reduce geographic delay.

### Bid Timing and Block Targeting

**Q: Why does my bid sometimes target the wrong block number?**

A: The timing of your bid submission is highly sensitive to the CN (Consensus Node) mining time. If the auction starts late (close to the mining time), the bid transaction would be inserted into the block after the next one (block number +2 instead of +1). This means you should set your target block number to +2.

**Q: How can I improve my bid inclusion rate?**

A: The target block number is inherently sensitive to the CN mining schedule: if you target block +2 but the transaction is inserted at block +1 due to earlier processing, the bid will fail. Therefore, it is recommended to maximize inclusion probability by sending your bid transaction two times: once with a target block number of +1 and once with a target block number of +2.

## Best Practices

- **Monitor Deposit Balance**: Maintain sufficient balance to cover multiple bids
- **Handle Nonces Carefully**: Always query the latest nonce before bidding
- **Optimize Detection**: Faster MEV detection improves competitive advantage
- **Test on Kairos**: Validate your strategy on testnet before mainnet deployment
- **Monitor Results**: Track auction outcomes through the MEV Explorer to refine your bidding strategy
- **Set Appropriate Gas Limits**: Balance between sufficient gas and cost efficiency

## Resources

- [SDK Repository](https://github.com/kaiachain/auctioneer-sdk)
- [KIP-249 Specification](https://kips.kaia.io/KIPs/kip-249)
- [Example Code](https://github.com/kaiachain/auctioneer-sdk/tree/dev/example)
- API Documentation: [auctioneer-kairos.kaia.io/docs](https://auctioneer-kairos.kaia.io/docs) (Kairos), TBU (Mainnet)
- MEV Explorer: [mev-kairos.kaia.io](https://mev-kairos.kaia.io) (Kairos), TBU (Mainnet)
- [FAQ](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/FAQ.md)

## Getting Help

For issues or questions:

- Post in the [Kaia DevForum](https://devforum.kaia.io)
- Open an issue in the [SDK repository](https://github.com/kaiachain/auctioneer-sdk/issues)