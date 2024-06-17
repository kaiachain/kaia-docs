# Klaytn to Kaia Transition FAQ

The Klaytn blockchain is undergoing a transition to the Kaia blockchain. This FAQ addresses common questions and concerns for CEXs, node providers, wallet providers, dApp builders, and retail users familiar with the Klaytn ecosystem, to ensure a smooth transition.

- [As an RPC node provider, what changes do I need to make to my infrastructure to support the transition from Klaytn to Kaia, and will there be any breaking changes in the RPC APIs?](#as-an-rpc-node-provider-what-changes-do-i-need-to-make-to-my-infrastructure-to-support-the-transition-from-klaytn-to-kaia-and-will-there-be-any-breaking-changes-in-the-rpc-apis-)
- [Will the Network ID change?](#will-the-network-id-change-)
- [Is Kaia a new chain with a different chain ID, or an upgrade based on the Klaytn chain?](#is-kaia-a-new-chain-with-a-different-chain-id-or-an-upgrade-based-on-the-klaytn-chain-)
- [Is KAIA a rebrand from KLAY or a completely new token?](#is-kaia-a-rebrand-from-klay-or-a-completely-new-token-)
- [Will Kaia be on the Klaytn mainnet or a different mainnet?](#will-kaia-be-on-the-klaytn-mainnet-or-a-different-mainnet-)
- [Will the current Klaytn mainnet continue to work after the rebrand?](#will-the-current-klaytn-mainnet-continue-to-work-after-the-rebrand-)
- [When will the KAIA market open?](#when-will-the-kaia-market-open-)
- [Will Klaytn provide a swap or migration website for new KAIA tokens?](#will-klaytn-provide-a-swap-or-migration-website-for-new-kaia-tokens-)
- [Will there be any delay in receiving KAIA tokens?](#will-there-be-any-delay-in-receiving-kaia-tokens-)
- [Is there a limit on the amount for swapping KLAY and FNSA tokens?](#is-there-a-limit-on-the-amount-for-swapping-klay-and-fnsa-tokens-)
- [Is it necessary to update the brand name from Klaytn to Kaia in the wallet?](#is-it-necessary-to-update-the-brand-name-from-klaytn-to-kaia-in-the-wallet-)
- [What happens if we don't upgrade to the Kaia brand after the mainnet upgrade?](#what-happens-if-we-dont-upgrade-to-the-kaia-brand-after-the-mainnet-upgrade-)
- [What will happen to Klaytnscope, the default explorer?](#what-will-happen-to-klaytnscope-the-default-explorer-)
- [What support will Kaia Foundation provide for the migration of Klaytn and Finschia apps?](#what-support-will-kaia-foundation-provide-for-the-migration-of-klaytn-and-finschia-apps-)
- [Will Kaia Foundation continue to provide code audit grants as Klaytn Foundation did?](#will-kaia-foundation-continue-to-provide-code-audit-grants-as-klaytn-foundation-did-)

## As an RPC node provider, what changes do I need to make to my infrastructure to support the transition from Klaytn to Kaia, and will there be any breaking changes in the RPC APIs? <a id="as-an-rpc-node-provider-what-changes-do-i-need-to-make-to-my-infrastructure-to-support-the-transition-from-klaytn-to-kaia-and-will-there-be-any-breaking-changes-in-the-rpc-apis-"></a>

Most RPC APIs will remain the same on the Kaia chain, with the exception of namespace changes from klay_ to kaia_. However, klay_ will still be available for backward compatibility.

To support the transition from Klaytn to Kaia, RPC node providers will need to upgrade their binary to the Kaia version once it is released. No immediate action is required before the upgrade.

## Will the Network ID change? <a id="will-the-network-id-change-"></a>

No, the Klaytn Network ID will remain the same. The original URL will be active for three months to ensure a smooth transition.

## Is Kaia a new chain with a different chain ID, or an upgrade based on the Klaytn chain? <a id="is-kaia-a-new-chain-with-a-different-chain-id-or-an-upgrade-based-on-the-klaytn-chain-"></a>

Kaia is a hard fork of the Klaytn chain, and the chain ID remains unchanged. The previous testnet "Baobab" has been renamed to "Kairos," while the mainnet "Cypress" is now referred to as "Mainnet" or "Kaia Mainnet."

## Is KAIA a rebrand from KLAY or a completely new token? <a id="is-kaia-a-rebrand-from-klay-or-a-completely-new-token-"></a>

KAIA is a rebrand from KLAY, but there will be changes in supply due to the merger of Klaytn and Finschia chains. KLAY will continue to be used with the updated name and ticker symbol. It is recommended to renew the token chart if possible.

## Will Kaia be on the Klaytn mainnet or a different mainnet? <a id="will-kaia-be-on-the-klaytn-mainnet-or-a-different-mainnet-"></a>

Kaia will continue to be on the Klaytn mainnet.

## Will the current Klaytn mainnet continue to work after the rebrand? <a id="will-the-current-klaytn-mainnet-continue-to-work-after-the-rebrand-"></a>

Yes, the mainnet's operation will remain unaffected. The transition to Kaia primarily involves a name change and technical upgrades occurring behind the scenes.

## When will the KAIA market open? <a id="when-will-the-kaia-market-open-"></a>

The KAIA market is scheduled to open on June 27th. The exact block number will be shared closer to the date.

## Will Klaytn provide a swap or migration website for new KAIA tokens? <a id="will-klaytn-provide-a-swap-or-migration-website-for-new-kaia-tokens-"></a>

No action is required from users. KLAY tokens will be automatically renamed to KAIA tokens.

## Will there be any delay in receiving KAIA tokens? <a id="will-there-be-any-delay-in-receiving-kaia-tokens-"></a>

Due to the Timelock function, token swap finalization will be delayed by at least 30 minutes. Additional delays, such as relayer and RPC delays, may occur but are not significant.

## Is there a limit on the amount for swapping KLAY and FNSA tokens? <a id="is-there-a-limit-on-the-amount-for-swapping-klay-and-fnsa-tokens-"></a>

There is no limit for swapping and bridging the two tokens.

## Is it necessary to update the brand name from Klaytn to Kaia in the wallet? <a id="is-it-necessary-to-update-the-brand-name-from-klaytn-to-kaia-in-the-wallet-"></a>

Yes, eco-partners will be informed when the update is required.

## What happens if we don't upgrade to the Kaia brand after the mainnet upgrade? <a id="what-happens-if-we-dont-upgrade-to-the-kaia-brand-after-the-mainnet-upgrade-"></a>

There will be no functional issues after the mainnet upgrade on June 27th. Rebranding can be done later.

## What will happen to Klaytnscope, the default explorer? <a id="what-will-happen-to-klaytnscope-the-default-explorer-"></a>

Klaytnscope will continue to work as before and will be upgraded after three months.

## What support will Kaia Foundation provide for the migration of Klaytn and Finschia apps? <a id="what-support-will-kaia-foundation-provide-for-the-migration-of-klaytn-and-finschia-apps-"></a>

Klaytn apps will work seamlessly with the Kaia chain, requiring only rebranding. The team will provide branding guidelines. For existing Finschia apps, tech updates and marketing support will be provided through their business channels.

## Will Kaia Foundation continue to provide code audit grants as Klaytn Foundation did? <a id="will-kaia-foundation-continue-to-provide-code-audit-grants-as-klaytn-foundation-did-"></a>

Yes, audit grants will remain the same.