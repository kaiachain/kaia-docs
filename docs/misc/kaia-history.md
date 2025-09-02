# Kaia Hard Fork History

This page shows all the hard forks to the Kaia blockchain.

:::note

- For more details on Kaia releases, see the [Kaia Release Notes on GitHub](https://github.com/kaiachain/kaia/releases).
- For hard forks prior to the Kaia transition, refer to the [Klaytn Hard Fork History](klaytn-history.md).

:::

## Prague

| ` ` | Kairos                        | Mainnet                       |
| --------------- |-------------------------------|-------------------------------|
| Date | Jun 10, 2025 10:26 / UTC+9 | Jul 17, 2025 10:26 / UTC+9 |
| Block number  | `#187,930,000`                | `#190,670,000`                |

### Summary

Prague hardfork was introduced with the [v2.0.0 release](https://github.com/kaiachain/kaia/releases/tag/v2.0.0) for Kairos testnet and [v2.0.2 release](https://github.com/kaiachain/kaia/releases/tag/v2.0.2) for Mainnet. It introduces BLS12-381 precompiles as per EIP-2537, historical blockhash system contract as per EIP-2935, contract creation check as per EIP-7610, updated calldata gas price as per EIP-7623 and [KIP-223](https://kips.kaia.io/KIPs/kip-223), SetCode transaction type as per EIP-7702 and [KIP-228](https://kips.kaia.io/KIPs/kip-228), and the Consensus Liquidity feature as per [KIP-226](https://kips.kaia.io/KIPs/kip-226). Additionally, it includes Gas Abstraction feature for paying gas fees with tokens.

## Kaia Transition

| ` ` | Kairos                        | Mainnet                       |
| --------------- |-------------------------------|-------------------------------|
| Date | Jun 13, 2024 10:13 / UTC+9 | Aug 29, 2024 10:29 / UTC+9 |
| Block number  | `#156,660,000`                | `#162,900,480`                |

### Summary

Kaia Transition hardfork was introduced with the [v1.0.0 release](https://github.com/kaiachain/kaia/releases/tag/v1.0.0) for Kairos testnet and [v1.0.2 release](https://github.com/kaiachain/kaia/releases/tag/v1.0.2) for Mainnet. This hardfork marks the transition from Klaytn to Kaia blockchain. It includes TreasuryRebalanceV2 hardfork and token allocation contracts according to [KIP-160](https://kips.kaia.io/KIPs/kip-160), transaction priority fee (tip) as per [KIP-162](https://kips.kaia.io/KIPs/kip-162) similar to EIP-1559, validator's PublicDelegation and CnStakingV3 contracts as described in [KIP-163](https://kips.kaia.io/KIPs/kip-163), and modified staking update interval to 1 block.