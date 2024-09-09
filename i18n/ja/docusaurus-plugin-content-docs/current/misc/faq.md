# FAQ

- [What is Klaytn?](#what-is-klaytn)
- [What is Klaytn 2.0?](#what-is-klaytn-2.0)
- [How does Klaytn support Ethereum equivalence?](#how-ethereum-equivalence)
- [What is Klaytn’s gas policy?](#klaytn-gas-policy)
- [What is special about Klaytn’s account structure?](#klaytn-account-structure)
- [Where can I start dApp development with Klaytn?](#dapp-development)
- [Is Klaytn Open Source?](#is-klaytn-open-source)
- [How can I initially fund my account?](#fund-my-acconut)
- [Any Klaytn’s Public Node Providers for testing and development?](#node-providers)
- [Are there faucets to get test KLAY?](#are-there-faucets)
- [How do I check for Public RPC endpoint status?](#rpc-endpoint-status)
- [Which wallets support Klaytn?](#which-wallets)
- [What is Mainnet, what is Kairos?](#what-is-mainnet-what-is-kairos)
- [Are there any Klaytn SDKs? In what languages?](#klaytn-sdks)
- [Must I install and run an EN (Endpoint Node) to use Klaytn?](#must-i-install-and-run-en)
- [I am running an EN, and node data sync is too slow.](#node-data-sync-is-too-slow)
- [Can I use ERC-20 and ERC-721 contracts on Klaytn?](#can-i-use-erc-20-and-erc-721)
- [Can I use Truffle for the smart contract development on Klaytn?](#can-i-use-truffle)
- [Where can I get a browser extension wallet like Metamask?](#where-can-i-get-a-browser-extension-wallet)
- [Why is my fee-payer account address not derived from the key provided?](#account-address-is-not-derived-from-the-key)
- [Where can I find complete working samples of fee-delegation?](#fee-delegation-samples)

## What is Kaia? <a id="what-is-klaytn"></a>

Klaytn is the Layer 1 blockchain platform with low latency, high TPS and immediate finality. It is the optimal blockchain for building games and realizing the metaverse, supporting Ethereum Equivalence. It provides the comprehensive [Metaverse Package](https://metaverse-knowledge-kit.kaia.io/) to facilitate blockchain building experience. To better understand Kaia, please refer to our [Light Paper](https://klaytn.foundation/wp-content/themes/klaytn/download/lightpaper.pdf).

## How does Klaytn support Ethereum equivalence? <a id="how-ethereum-equivalence"></a>

Klaytn is EVM compatible, and supports all Ethereum London EVM features. Our `eth` namespace has been amended to be compatible with Ethereum’s. Ethereum toolings can be used seamlessly, and migration of Ethereum dApps have also become possible with minimal effort. Transaction types and fields are also equivalent to Ethereum’s.

## What is Klaytn’s gas policy? <a id="klaytn-gas-policy"></a>

Klaytn transitioned from a fixed gas fee policy to adopt a dynamic gas fee mechanism in order to combat arbitrage bots. Please refer to this [article](https://medium.com/klaytn/dynamic-gas-fee-pricing-mechanism-1dac83d2689) for more information.

## What is special about Klaytn’s account structure? <a id="klaytn-account-structure"></a>

To provide maximum convenience for dApp developers, Klaytn has devised a way to [decouple private keys from addresses](https://klaytn-tech.medium.com/klaytn-usability-improvement-series-1-separating-keys-and-addresses-dd5e367a0744). As a result, you can easily implement [multisig](https://medium.com/klaytn/klaytn-usability-improvement-series-2-introducing-multisig-on-the-platform-level-85141893db01), whereby you create multiple private keys for a single account, with each key having different weights. Each key can be assigned with [different roles](https://medium.com/klaytn/klaytn-usability-improvement-series-4-supporting-role-based-keys-on-the-platform-level-e2c912672b7b) as well.

## Where can I start dApp development with Klaytn? <a id="dapp-development"></a>

Whether you are migrating from Ethereum, or building on Klaytn from scratch, we support all the necessary tools and infrastructure. You can test your smart contracts on [Remix IDE](../build//tutorials/connecting-remix) using Kaia Plugin or connect to [MetaMask](../build/tutorials/connecting-metamask) wallet and [Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi). Kaia’s sdk `caver` is available as [caver-js](https://github.com/kaiachain/caver-js) You can refer to our [tutorials](../build/tutorials/tutorials.md) to try building a dApp on Kaia.

## Is Klaytn Open Source? <a id="is-klaytn-open-source"></a>

Klaytn is most certainly open source! Take a look at our [Github Organisation](https://github.com/klaytn) and you can start [contributing](https://github.com/klaytn/klaytn-docs/blob/master/CONTRIBUTING.md) to our Klaytn Documentation. Read more about our open-source policies [here](opensource).

## How can I initially fund my account? <a id="fund-my-acconut"></a>

You may purchase KLAY on the exchange. The list of available exchanges can be found here:
[Coinmarketcap](https://coinmarketcap.com/currencies/klaytn/markets/) or [Coingecko](https://www.coingecko.com/en/coins/klay#markets)

## Any Klaytn’s Public Node Providers for testing and development? <a id="node-providers"></a>

Refer to this [list](../references/public-en#public-json-rpc-endpoint-providers) for Kaia’s Public Node Providers and the network domains.

## Are there faucets to get test KLAY? <a id="are-there-faucets"></a>

You can get test KAIA for development and testing purposes here:
[Kaia Faucet](https://faucet.kaia.io)
[AllThatNode Faucet](https://www.allthatnode.com/faucet/klaytn.dsrv)
[NODIT Faucet](https://kaiafaucet.com)

## How do I check for Public RPC endpoint status? <a id="rpc-endpoint-status"></a>

Since we cannot guarantee uptime and stability of the endpoints, you can always check for node provider status [here](https://www.allthatnode.com/klaytn.dsrv).

## Which wallets support Klaytn? <a id="which-wallets"></a>

Kaia is supported by the cold wallet D’cent, as well as a host of hot wallets like Kaia Wallet, MetaMask and more. Please refer to the list [here](http://klaytn.foundation/ecosystem).

## What is Mainnet, what is Kairos? <a id="what-is-cypress-what-is-baobab"></a>

Cypress is the Klaytn mainnet, Baobab is a testnet.
Below is information relating to each network.

Cypress mainnet:

- EN download : Choose the Baobab package from the [download page](../nodes/downloads/downloads.md).
- Kaiascope : https://kaiascope.com/

Baobab testnet:

- EN download : Choose the Cypress package from the [download page](../nodes/downloads/downloads.md).
- Kaiascope : https://kairos.kaiascope.com
- Kairos Faucet : https://faucet.kaia.io

## Are there any Klaytn SDKs? In what languages? <a id="klaytn-sdks"></a>

Official Klaytn SDKs are provided in JavaScript and Java.
See [caver-js](../references/sdk/caver-js/caver-js.md) and [caver-java](../references/sdk/caver-java/caver-java.md). Community contributions are always welcome in providing [Klaytn APIs](../../references/json-rpc/klay/account-created) in other languages.

To learn about how to build dApps using Klaytn SDK, see [Tutorials](../build/tutorials/tutorials.md).

Also, check the porting guidelines [from web3.js](../references/sdk/caver-js-1.4.1/porting-from-web3.js.md) and [from web3j](../references/sdk/caver-java-1.4.0/porting-from-web3j.md). Because the syntactic of caver-js and caver-java are very similar to web3.js and web3j, porting should be minimal and very straightforward. But, no, you can not use web3.js or web3j to make a request against Klaytn.

## Must I install and run an EN (Endpoint Node) to use Klaytn? <a id="must-i-install-and-run-en"></a>

Yes and No.
Endpoint node validates the blocks and exposes RPC APIs to the outer world. EN is always needed for your application to interact with the Klaytn network.
For those who simply want to try Klaytn APIs, you can try [KAS (Klaytn API Service)](https://www.klaytnapi.com).
KAS provides Klaytn Node API service that exposes RPC APIs of Klaytn networks (both Baobab and Cypress) as well as other useful API services.
Note that KAS serves free API requests after user registration. For pricing plans, please refer to [KAS pricing page](https://www.klaytnapi.com/landing/pricing).

## I am running an EN, and node data sync is too slow. <a id="node-data-sync-is-too-slow"></a>

First, check if your HW specification meets the [system requirements](../nodes/endpoint-node/system-requirements.md).

Check the [fast sync](../nodes/endpoint-node/install-endpoint-nodes.md#fast-sync-optional).
Klaytn publishes the chain data every day. Chain data is a database snapshot that stores all blocks generated since the genesis. Download the latest chain data for the fast sync.

## Can I use ERC-20 and ERC-721 contracts on Klaytn? <a id="can-i-use-erc-20-and-erc-721"></a>

Yes. Klaytn supports Solidity as a smart contract language. [ERC-20](../build/smart-contracts/samples/erc-20.md) and [ERC-721](../build/smart-contracts/samples/erc-721.md) written in Solidity for Etherem can be deployed and executed on Klaytn.

Further Klaytn-specific token standards can be defined. Follow the [KIP (Klaytn Improvement Proposal)](http://kips.klaytn.foundation) and join the discussion.

## Can I use Truffle for the smart contract development on Klaytn? <a id="can-i-use-truffle"></a>

Yes. Truffle can be used in developing smart contracts on Klaytn with [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn).
See [Truffle](../build/smart-contracts/ide-and-tools/truffle.md) and follow the configuration guideline.

If you are new to Truffle, see [Testing Guide](../build/smart-contracts/testing-guide.md) and [Deployment Guide](../build/smart-contracts/deploy/deploy.md) to get a rough idea on what you can do with Truffle.

## Where can I get a browser extension wallet like Metamask? <a id="where-can-i-get-a-browser-extension-wallet"></a>

Kaia's web browser extension wallet [Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi). Kaia Wallet is a non-custodial wallet with which you can make KAIA transactions and create accounts.

## Why is my fee-payer account address not derived from the key provided? <a id="account-address-is-not-derived-from-the-key"></a>

In Klaytn, [the account address can be decoupled from the key pair](../learn/accounts.md#decoupling-key-pairs-from-addresses).

Common use cases are as follows.

- The account owner wants to change the key for security reasons.
- The account has a weighted-multisig or a role-based key that allows having multiple key pairs to control the account.

Fee-payer accounts usually have a [role-based key](../learn/accounts.md#accountkeyrolebased). In most cases, the account address is not derived from the RoleFeePayer key.

## Where can I find complete working samples of fee-delegation? <a id="fee-delegation-samples"></a>

Check [fee-delegation-example](../build/tutorials/fee-delegation-example.md) to get a complete working code of value transfer.

See the [JavaScript code snippet](https://gist.github.com/w3kim/64a3cf5da58250474f046d4dd7f85cc8) for deploying a contract with fee-delegation. Note that you can not use Truffle for the contract deployment with fee-delegation.

[Sending a transaction with multiple signer](../references/sdk/caver-js-1.4.1/get-started-1.4.1.md#sending-a-transaction-with-multiple-signer) gives a good explanation about two different ways of collecting signatures.
Relevant caver-js APIs are as follows. Take a look at the code examples in the API description.

- [caver.klay.accounts.signTransaction](../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#signtransaction)
- [caver.klay.accounts.feePayerSignTransaction](../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#feepayersigntransaction)
- [caver.klay.accounts.combinesignatures](../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#combinesignatures)
- [caver.klay.sendSignedTransaction](../references/sdk/caver-js-1.4.1/api/caver.klay/transaction/transaction.md#sendsignedtransaction)
