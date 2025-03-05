# Kaiabridge

Finschia users can swap their FNSA tokens on Finshia network to KAIA tokens on Kaia network at a fixed swap rate. The swap is mediated by a set of smart contract and programs, collectively called Kaiabridge.

A token swap process begins with the Finschia user sending the FNSA token to the `fwsap` module. The token is first swapped from `cony` to `kei` denomination, then transferred to `fbridge` module. The event from `fbridge` is recognized by the trusted relayers and submitted to bridge smart contracts on Kaia chain. The bridging request is handled in multiple steps:

- Inflight: The token arrived in Finschia's `fbridge` module, but the relayers did not report to the Kaia smart contracts.
- Confirmed: The relayers submitted the request to the contracts ("provision"). Now the request enters a 30 minute timelock.
- Claimed: After the timelock has expired, the token has been transferred ("claim") to the destination account on Kaia chain.

Kaiabridge smart contracts has built-in multisig features. For instance, it takes multiple provision transactions from the Operator accounts for a request to be Confirmed. Each Operator account is held by a relayer, and the relayers are managed by Kaia Foundation and Finschia Foundation.

You can find the contract source codes in [kaiachain GitHub](https://github.com/kaiachain/kaia/tree/dev/contracts/contracts/system_contracts/kaiabridge) and deployed addresses in the [contract addresses](https://docs.kaia.io/references/contract-addresses/) page.