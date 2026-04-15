# Become a Validator

## Overview <a id="overview"></a>

:::info Permissionless Phase 1

This guide describes how existing GCs manage their validators through the Validator Management Portal during **Permissionless Phase 1**. Opening participation to anyone via the permissionless network will happen in **Phase 2 (scheduled for late September)**, at which point this guide will be updated. For details, see the [Permissionless Implementation Overview](https://govforum.kaia.io/t/permissionless-implementation-overview/1218) and the [PGT Roadmap](https://govforum.kaia.io/t/pgt-permissionless-governance-tokenomics-roadmap-introduction/1447).

:::

Kaia provides the [Validator Management Portal](https://portal.kaia.io/validators) for registering and managing validator information. This guide walks you through how validators can join the Kaia network using the portal.

Because the information required for validator operation must be recorded in on-chain contracts, any validator can use the portal to send transactions that write or update that information. The portal also lets validators manage the staking contracts they own when onboarding a new validator to—or offboarding an existing validator from—the Kaia network.

The portal currently supports the following features.

![Portal home](/img/nodes/become-a-validator/image01.png)

- **Home**: main screen displaying the staking contracts deployed by the validator manager.
- **Deploy Staking Contract**: deploy a new staking contract.
- **Manage Staking**: modify information on a deployed staking contract.
- **Become a Validator**: onboard as a validator by registering a deployed staking contract.
- **Manage Validator**: modify information for an onboarded validator.
- **Pending Requests**: administrative screen used by the Kaia Team.

:::note

All of the features above are also supported on testnet. We recommend performing any test operations on testnet first.

:::

## What You'll Do <a id="what-youll-do"></a>

The onboarding flow is covered in the following pages, in order:

1. [Prerequisites](./prerequisites.md) — connect a validator manager wallet (Kaia Safe recommended) and prepare the required accounts.
2. [Validator Onboarding](./onboarding.md) — deploy and initialize your staking contract, then submit an onboarding request.
3. [Managing Staking Contracts](./manage-staking.md) — update admins, stake/unstake KAIA, change reward address, manage multisig, and more.
4. [Managing Validator Information](./manage-validator.md) — transfer the manager account, request offboarding, and manage auxiliary staking contracts.

## Related Resources <a id="related-resources"></a>

- [Kaia Safe User Guide](../../../build/wallets/kaia-safe/kaia-safe.md)
- [KIP-277: Self Validator Registration](https://kips.kaia.io/KIPs/kip-277)
- [KIP-163: Redelegation](https://kips.kaia.io/KIPs/kip-163)
