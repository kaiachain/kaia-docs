# Finschia Archive

This page serves as an archive of information for existing Finschia users, including FNSA token holders, DApp builders, and node operators. As Finschia integrates with Klaytn to form Kaia, this resource now exists as a summary of the key information about Finschia and a subset of the broader Kaia documentation.

## About Finschia

Finschia is a Cosmos-SDK-based chain that migrated the state of the former LINE Blockchain Mainnet and launched on December 22, 2022.

Following the approval of Klaytn's [KGP-25](https://govforum.klaytn.foundation/t/kgp-25-klaytn-finschia-mainnet-merge/719) and Finschia's [FGP-23](https://www.mintscan.io/finschia/proposals/23) on-chain proposals, the two chains are undergoing phased technical integration.

The FNSA token, which is the native (base) coin of the Finschia mainnet, can be converted (swap & bridge) into the KAIA token through the Kaia Portal once it launches with the Kaia Mainnet. KAIA is the native coin of the Kaia Mainnet.

## Finschia Specifications

Finschia operates both Mainnet and Testnet environments, each with the following specifications:

|**Category**|**Finschia mainnet**|**Ebony testnet**|
| :- | :- | :- |
|Purpose and usage|A real environment where FNSA can be indirectly or directly used in services and the Finschia governance takes place|An environment for development and testing with the same specifications as the Finschia mainnet|
|Consensus algorithm|Ostracon (PBFT + DPoS + VRF)||
|Chain ID|finschia-2|ebony-2|
|Address prefix|link|tlink|
|Base coin|**FNSA (FINSCHIA)**<br/>• Denom: cony<br/>• Decimal: 6 (1 FNSA = 10^6 cony)<br/>**KAIA**<br/>• Denom: kei<br/>• Decimal: 18 (1 KAIA = 10^18 kei)<br/>**Swap rate**<br/>• FNSA:KAIA = 1:148.079656|**TFNSA**<br/>• Denom: tcony<br/>• Decimal: 6 (1 TFNSA = 10^6 tcony)<br/>**KAIA**<br/>• Denom: kei<br/>• Decimal: 18 (1 KAIA = 10^18 kei)<br/>**Swap rate**<br/>• TFNSA:KAIA = 1:148.079656<br/>• KAIA of Ebony testnet is a test coin with no real value.|
|Key features|• Smart contract<br/>• Collection (NFT)<br/>• Delegation<br/>• On-chain governance||
|Performance|• Block confirm time: about 3.3+ seconds<br/>• TPS (transaction per second): 1200||

## Finschia Developer Resources

Technical information about Finschia can be found in the links below. This list may be updated as needed.

If you cannot find the information you're looking for in these links or need more detailed information, please contact contact@kaia.io.

|**Repository**|**Link**|**Description**|
| :- | :- | :- |
|Official Github repository|https://github.com/Finschia/finschia|Introduction, installation, connect to mainnet/testnet, interact with Finschia node, endpoint info|
|Binary release|https://github.com/Finschia/finschia/releases|Latest or old version of Finschia binaries with release notes|
|Finschia-sdk|https://github.com/Finschia/finschia-sdk|A framework for building blockchains based on Finschia forked from cosmos-sdk|
|Proto-docs|https://github.com/Finschia/finschia-sdk/blob/main/docs/core/proto-docs.md|Messages, Queries, Structs,  and Parameters of each module of Finschia|
|Finschia-kt|https://github.com/Finschia/finschia-kt|Kotlin SDK for Finschia|
|Finschia-js|https://github.com/Finschia/finschia-js|Javascript SDK for Finschia|
|Ostracon|https://github.com/Finschia/ostracon|Consensus algorithm of Finschia|