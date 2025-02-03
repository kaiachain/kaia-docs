# Transition FAQ

:::info[Archive Notice]

Please note that most of the information provided in this FAQ reflects a transitional period that occurred in 2024, and most of the events and processes mentioned have already taken place. While the FAQ remains available for historical reference, some sections are now out of date and may no longer apply. For the most current information regarding Kaia, please consult the latest official documentation and announcements.

:::

This FAQ addresses common questions and concerns for CEXs, node providers, wallet providers, dApp builders, and retail users familiar with the Klaytn ecosystem, to ensure a smooth transition.

- KLAY and FNSA holders
  - [What happened to Klaytn and Finschia?](#what-happened-to-klaytn-and-finschia-)
  - [What happens to KLAY and FNSA?](#what-happens-to-klay-and-fnsa-)
  - [Will I need to create a new wallet for Kaia?](#will-i-need-to-create-a-new-wallet-for-kaia-)
  - [Will Klaytn provide a swap or migration website for new KAIA tokens?](#will-klaytn-provide-a-swap-or-migration-website-for-new-kaia-tokens-)
  - [Will there be any delay in receiving KAIA tokens?](#will-there-be-any-delay-in-receiving-kaia-tokens-)
  - [Is there a limit on the amount for swapping KLAY and FNSA tokens?](#is-there-a-limit-on-the-amount-for-swapping-klay-and-fnsa-tokens-)
  - [I'm currently staking FNSA. Will I need to wait 7 days to unstake my FNSA to swap to KAIA?](#im-currently-staking-fnsa-will-i-need-to-wait-7-days-to-unstake-my-fnsa-to-swap-to-kaia-)
  - [Where can I find the historical price information for KLAY and FNSA? I can't seem to find it on CoinMarketCap or CoinGecko anymore.](#where-can-i-find-the-historical-price-information-for-klay-and-fnsa-i-cant-seem-to-find-it-on-coinmarketcap-or-coingecko-anymore-)

- DApp builders
  - [What do DApps on Klaytn need to do to migrate to Kaia?](#what-do-dapps-on-klaytn-need-to-do-to-migrate-to-kaia-)
  - [What do DApps on Finschia need to do to migrate to Kaia?](#what-do-dapps-on-finschia-need-to-do-to-migrate-to-kaia-)
  - [Will Kaia Foundation continue to provide code audit grants as Klaytn Foundation did?](#will-kaia-foundation-continue-to-provide-code-audit-grants-as-klaytn-foundation-did-)

- Wallet providers
  - [Is it necessary to update the brand name from Klaytn to Kaia in the wallet?](#is-it-necessary-to-update-the-brand-name-from-klaytn-to-kaia-in-the-wallet-)
  - [What happens if we don't upgrade to the Kaia brand after the mainnet upgrade?](#what-happens-if-we-dont-upgrade-to-the-kaia-brand-after-the-mainnet-upgrade-)
  - [What will happen to Klaytnscope, the default explorer?](#what-will-happen-to-klaytnscope-the-default-explorer-)

- Centralized exchanges
  - [Is KAIA a rebrand from KLAY or a completely new token?](#is-kaia-a-rebrand-from-klay-or-a-completely-new-token-)
  - [Will Kaia be on the Klaytn mainnet or a different mainnet?](#will-kaia-be-on-the-klaytn-mainnet-or-a-different-mainnet-)
  - [Will the current Klaytn mainnet continue to work after the rebrand?](#will-the-current-klaytn-mainnet-continue-to-work-after-the-rebrand-)
  - [When will the KAIA market open?](#when-will-the-kaia-market-open-)
  - [Where can I find Kaia’s whitepaper?](#where-can-i-find-kaias-whitepaper-)

- RPC node providers
  - [What changes do I need to make to my infrastructure to support the transition from Klaytn to Kaia, and will there be any breaking changes in the RPC APIs?](#as-an-rpc-node-provider-what-changes-do-i-need-to-make-to-my-infrastructure-to-support-the-transition-from-klaytn-to-kaia-and-will-there-be-any-breaking-changes-in-the-rpc-apis-)
  - [Is Kaia a new chain with a different chain ID, or an upgrade based on the Klaytn chain?](#is-kaia-a-new-chain-with-a-different-chain-id-or-an-upgrade-based-on-the-klaytn-chain-)


## KLAY and FNSA holders

### What happened to Klaytn and Finschia? <a id="what-happened-to-klaytn-and-finschia-"></a>

Klaytn and Finschia merged to form Kaia through governance decisions made by both chains. You can view the voting results [here](https://medium.com/kaiachain/klaytn-and-finschia-merge-proposal-passes-creating-asias-largest-blockchain-ecosystem-7af570eb069a). The utility tokens of the two chains (KLAY and FNSA) are converted to the KAIA token. You can find the exchange rates for both tokens [here](../../kaiatech/kaia-white-paper.md#fnsa-issuancedistribution-status).

### What happens to KLAY and FNSA? <a id="what-happens-to-klay-and-fnsa-"></a>

With the launch of the KAIA coin, KLAY balances were automatically reflected as KAIA. FNSA holders are able to use the swap service on the [Kaia Portal](https://portal.kaia.io/) to burn their FNSA tokens on the Finschia network and claim an equivalent value of KLAY tokens. Please read [this post](https://medium.com/lineblockchain/preparations-for-the-upcoming-kaia-chain-token-swap-d9ccd853eda4) to learn more about swapping your FNSA to KAIA.

### Will I need to create a new wallet for Kaia? <a id="will-i-need-to-create-a-new-wallet-for-kaia-"></a>

Your Klaytn wallet will be usable on Kaia, but you will need to update the RPC and block explorer URLS if you are using a 3rd-party multi chain wallet such as Metamask. These will be provided at a later date. Finschia wallet holders will need to create a Kaia wallet, and a website will be provided for FNSA holders to burn their tokens and claim an equivalent value of KAIA.

### Will Klaytn provide a swap or migration website for new KAIA tokens? <a id="will-klaytn-provide-a-swap-or-migration-website-for-new-kaia-tokens-"></a>

No action is required from users. KLAY tokens will be automatically renamed to KAIA tokens.

### Will there be any delay in receiving KAIA tokens? <a id="will-there-be-any-delay-in-receiving-kaia-tokens-"></a>

The token swap will be delayed by at least 30 minutes Timelock for safety. Relayers and RPC nodes may incur insignificant additional delays

### Is there a limit on the amount for swapping KLAY and FNSA tokens? <a id="is-there-a-limit-on-the-amount-for-swapping-klay-and-fnsa-tokens-"></a>

There is no limit for swapping and bridging the two tokens.

### I'm currently staking FNSA. Will I need to wait 7 days to unstake my FNSA to swap to KAIA? <a id="im-currently-staking-fnsa-will-i-need-to-wait-7-days-to-unstake-my-fnsa-to-swap-to-kaia-"></a>

With the upcoming launch of Kaia, a governance vote will be proposed on the Finschia network to smoothly integrate token and governance mechanisms, including potentially reducing the unbonding time from 7 days to a couple of hours. If the vote passes, FNSA holders will be able to unstake and swap without having to wait a week.

### Where can I find the historical price information for KLAY and FNSA? I can't seem to find it on CoinMarketCap or CoinGecko anymore. <a id="where-can-i-find-the-historical-price-information-for-klay-and-fnsa-i-cant-seem-to-find-it-on-coinmarketcap-or-coingecko-anymore-"></a>

Due to the merger of KLAY and FNSA and their transition to the new token KAIA, historical price information for KLAY and FNSA is no longer available on cryptocurrency tracking websites. However, we have preserved this data for transparency and reference purposes. You can download CSV files containing the historical price data for both KLAY and FNSA from [Kaia native coin - KAIA](../../learn/token-economics/kaia-native-token.md#historical-pricing).

## DApp builders

### What do DApps on Klaytn need to do to migrate to Kaia? <a id="what-do-dapps-on-klaytn-need-to-do-to-migrate-to-kaia-"></a>

Klaytn apps will work seamlessly with the Kaia chain, requiring only rebranding. The team will provide branding guidelines. For existing Finschia apps, tech updates and marketing support will be provided through their business channels.

### What do DApps on Finschia need to do to migrate to Kaia? <a id="what-do-dapps-on-finschia-need-to-do-to-migrate-to-kaia-"></a>

For DApps in the Finschia ecosystem to migrate to Kaia, a process similar to migrating from a Cosmwasm chain to an EVM chain is required. Additional migration support will be shared once available, but if you need immediate assistance please contact Finschia Foundation.

### Will Kaia Foundation continue to provide code audit grants as Klaytn Foundation did? <a id="will-kaia-foundation-continue-to-provide-code-audit-grants-as-klaytn-foundation-did-"></a>

Yes, audit grants will remain the same along with other grant and funding programs available for Klaytn.

## Wallet providers

### Is it necessary to update the brand name from Klaytn to Kaia in the wallet? <a id="is-it-necessary-to-update-the-brand-name-from-klaytn-to-kaia-in-the-wallet-"></a>

Yes, eco-partners will be informed when the update is required.

### What happens if we don't upgrade to the Kaia brand after the mainnet upgrade? <a id="what-happens-if-we-dont-upgrade-to-the-kaia-brand-after-the-mainnet-upgrade-"></a>

There will be no functional issues after the mainnet upgrade. Rebranding can be done later.

### What will happen to Klaytnscope, the default explorer? <a id="what-will-happen-to-klaytnscope-the-default-explorer-"></a>

Klaytnscope will continue to work as before and will be upgraded after three months.

## Centralized exchanges

### Is KAIA a rebrand from KLAY or a completely new token? <a id="is-kaia-a-rebrand-from-klay-or-a-completely-new-token-"></a>

KAIA is a rebrand of KLAY. KLAY will continue to be used with the updated name and ticker symbol. It is recommended to renew the token chart if possible.

Due to the merger of the Klaytn and Finschia chains, the total and circulating supply have changed. The circulating supply increased from approximately 3.804 billion to 5.805 billion KAIA, while the total supply decreased from approximately 6.005 billion to 5.805 billion KAIA. These figures may not reflect the current circulating and total supply due to ongoing inflation. KAIA’s inflation rate has been adjusted from 6.4 KAIA per block to 9.6 KAIA per block. For more details on these changes, please refer to the [KAIA Issuance and Distribution Plan](../../kaiatech/kaia-white-paper.md#kaia-issuancedistribution-plan-1).

### Will Kaia be on the Klaytn mainnet or a different mainnet? <a id="will-kaia-be-on-the-klaytn-mainnet-or-a-different-mainnet-"></a>

Kaia will continue to be on the Klaytn mainnet.

### Will the current Klaytn mainnet continue to work after the rebrand? <a id="will-the-current-klaytn-mainnet-continue-to-work-after-the-rebrand-"></a>

Yes, the mainnet's operation will remain unaffected. The transition to Kaia primarily involves a name change and technical upgrades occurring behind the scenes.

### When will the KAIA market open? <a id="when-will-the-kaia-market-open-"></a>

The KAIA market will open in Q3 2024, we will share the exact block number closer to the date.

### Where can I find Kaia’s whitepaper? <a id="where-can-i-find-kaias-whitepaper-"></a>

You can access Kaia’s whitepaper [here](../../kaiatech/kaia-white-paper.md).

## RPC node providers

### What changes do I need to make to my infrastructure to support the transition from Klaytn to Kaia, and will there be any breaking changes in the RPC APIs? <a id="as-an-rpc-node-provider-what-changes-do-i-need-to-make-to-my-infrastructure-to-support-the-transition-from-klaytn-to-kaia-and-will-there-be-any-breaking-changes-in-the-rpc-apis-"></a>

Most RPC APIs will remain the same on the Kaia chain, with the exception of namespace changes from klay_ to kaia_. However, klay_ will still be available for backward compatibility.

To support the transition from Klaytn to Kaia, RPC node providers will need to upgrade their binary to the Kaia version once it is released. No immediate action is required before the upgrade.

### Is Kaia a new chain with a different chain ID, or an upgrade based on the Klaytn chain? <a id="is-kaia-a-new-chain-with-a-different-chain-id-or-an-upgrade-based-on-the-klaytn-chain-"></a>

Kaia is a hard fork of the Klaytn chain, and the chain ID remains unchanged. The previous testnet "Baobab" has been renamed to "Kairos," while the mainnet "Cypress" is now referred to as "Mainnet" or "Kaia Mainnet." The original URLs related to Klaytn such as docs, website, public endpoints, and package download links will remain for three months to ensure a smooth transition.

## Resources

Here are the main information sources for the chain merge:
- [Governance proposal](https://govforum.klaytn.foundation/t/kgp-25-klaytn-finschia-mainnet-merge/719)
- [Our vision behind the merge](https://medium.com/klaytn/finschia-klaytn-chain-merge-proposal-our-vision-for-asias-1-blockchain-ecosystem-7de1588e28c0)
- [Crafting the core of Kaia DeFi](https://medium.com/klaytn/crafting-the-core-of-project-dragons-defi-ecosystem-0fa561e02f56)
- [Responding to institutional demand](https://medium.com/klaytn/project-dragon-responding-to-institutional-demand-bd36e2e1e2a6)
- [Supplementary data and insights](https://medium.com/klaytn/project-dragon-supplementary-data-and-insights-d36abd25ca0f)
- [The Kaia brand story](https://medium.com/klaytn/say-hello-to-kaia-4182ccafe456)
