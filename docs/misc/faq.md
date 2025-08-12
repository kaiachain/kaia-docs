# FAQ

- [FAQ](#faq)
  - [What is Kaia? ](#what-is-kaia-)
  - [How does Kaia support Ethereum equivalence? ](#how-does-kaia-support-ethereum-equivalence-)
  - [What is Kaia’s gas policy? ](#what-is-kaias-gas-policy-)
  - [What is special about Kaia’s account structure? ](#what-is-special-about-kaias-account-structure-)
  - [Where can I start dApp development with Kaia? ](#where-can-i-start-dapp-development-with-kaia-)
  - [Is Kaia Open Source? ](#is-kaia-open-source-)
  - [How can I initially fund my account? ](#how-can-i-initially-fund-my-account-)
  - [Any Kaia’s Public Node Providers for testing and development? ](#any-kaias-public-node-providers-for-testing-and-development-)
  - [Are there faucets to get test KAIA? ](#are-there-faucets-to-get-test-kaia-)
  - [How do I check for Public RPC endpoint status? ](#how-do-i-check-for-public-rpc-endpoint-status-)
  - [Which wallets support Kaia? ](#which-wallets-support-kaia-)
  - [What is Mainnet, what is Kairos? ](#what-is-mainnet-what-is-kairos-)
  - [Are there any Kaia SDKs? In what languages? ](#are-there-any-kaia-sdks-in-what-languages-)
    - [kaia-sdk (Plug-in SDKs)](#kaia-sdk-plug-in-sdks)
  - [Must I install and run an EN (Endpoint Node) to use Kaia? ](#must-i-install-and-run-an-en-endpoint-node-to-use-kaia-)
  - [I am running an EN, and node data sync is too slow. ](#i-am-running-an-en-and-node-data-sync-is-too-slow-)
  - [Can I use ERC-20 and ERC-721 contracts on Kaia? ](#can-i-use-erc-20-and-erc-721-contracts-on-kaia-)
  - [Where can I get a browser extension wallet like Metamask? ](#where-can-i-get-a-browser-extension-wallet-like-metamask-)
  - [Why is my fee-payer account address not derived from the key provided? ](#why-is-my-fee-payer-account-address-not-derived-from-the-key-provided-)
  - [Where can I find complete working samples of fee-delegation? ](#where-can-i-find-complete-working-samples-of-fee-delegation-)

## What is Kaia? <a id="what-is-kaia"></a>

Kaia is a high-performance Layer 1 blockchain designed for the mass adoption of Web3, particularly in Asia. It offers over 4,000 TPS, immediate finality, and one-second block times. Fully compatible with Ethereum, Kaia enables seamless dApp migration and provides a robust ecosystem with developer-friendly tools, low fees, and strong liquidity from an ecosystem fund. It prioritizes Web2 user accessibility through integrations with major messaging platform like Kakao and LINE. For details, see our [White Paper](https://docs.kaia.io/kaiatech/kaia-white-paper/).

## How does Kaia support Ethereum equivalence? <a id="how-ethereum-equivalence"></a>

Kaia is EVM-compatible and supports all Ethereum Cancun EVM features except EIP-4844 blob transactions. It provides the `eth` namespace RPC API, allowing seamless use of Ethereum SDKs and tools. Kaia-specific transaction types are represented as Type 0 legacy transactions within the eth namespace APIs, so Ethereum SDKs do not need to be aware of them.

## What is Kaia’s gas policy? <a id="kaia-gas-policy"></a>

Kaia uses a dynamic gas fee model that maintains low fees during normal network conditions but adjusts fees based on network congestion. The gas fee can change within a limited range per block, helping prevent network spam while keeping fees predictable. A portion of every transaction fee is automatically burned. The model prioritizes user experience and enterprise-friendliness while maintaining network stability.

## What is special about Kaia’s account structure? <a id="kaia-account-structure"></a>

To provide maximum convenience for dApp developers, Kaia has devised a way to [decouple private keys from addresses](https://klaytn-tech.medium.com/klaytn-usability-improvement-series-1-separating-keys-and-addresses-dd5e367a0744). As a result, you can easily implement [multisig](https://medium.com/klaytn/klaytn-usability-improvement-series-2-introducing-multisig-on-the-platform-level-85141893db01), whereby you create multiple private keys for a single account, with each key having different weights. Each key can be assigned with [different roles](https://medium.com/klaytn/klaytn-usability-improvement-series-4-supporting-role-based-keys-on-the-platform-level-e2c912672b7b) as well.

## Where can I start dApp development with Kaia? <a id="dapp-development"></a>

Whether you are migrating from Ethereum, or building on Kaia from scratch, we support all the necessary tools and infrastructure. You can test your smart contracts on [Remix IDE](../build/tutorials/connecting-remix.md) using Kaia Plugin or connect to [MetaMask](../build/tutorials/connecting-metamask.mdx) wallet and [Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi). Kaia’s sdk is available [here](https://github.com/kaiachain/kaia-sdk). You can refer to our [tutorials](../build/tutorials/tutorials.md) to try building a dApp on Kaia.

## Is Kaia Open Source? <a id="is-kaia-open-source"></a>

Kaia is most certainly open source! Take a look at our [Github Organization](https://github.com/kaiachain) and you can start [contributing](https://github.com/kaiachain/kaia-docs/blob/main/CONTRIBUTING.md) to our Kaia Documentation. Read more about our open-source policies [here](opensource.md).

## How can I initially fund my account? <a id="fund-my-acconut"></a>

You may purchase KAIA on the exchange. The list of available exchanges can be found here:
[Coinmarketcap](https://coinmarketcap.com/currencies/klaytn/markets/), [Coingecko](https://www.coingecko.com/en/coins/klay#markets).

## Any Kaia’s Public Node Providers for testing and development? <a id="node-providers"></a>

Refer to [this list](../references/public-en.md#rpc-service-providers) for Kaia’s Public Node Providers and the network domains.

## Are there faucets to get test KAIA? <a id="are-there-faucets"></a>

You can get test KAIA for development and testing purposes here:

- [Kaia Faucet](https://faucet.kaia.io)
- [NODIT Faucet](https://kaiafaucet.com)
- [Thirdweb Faucet](https://thirdweb.com/kaia-testnet-kairos)

## How do I check for Public RPC endpoint status? <a id="rpc-endpoint-status"></a>

Since we cannot guarantee uptime and stability of the endpoints, you can always check for node provider status here: [ChainList](https://chainlist.org/chain/8217), [Kaia Status](https://status.kaia.io/).

## Which wallets support Kaia? <a id="which-wallets"></a>

Kaia is supported by the cold wallet D’cent, as well as a host of hot wallets like Kaia Wallet, MetaMask and more. Please refer to the list [here](../build/wallets/wallets.md).

## What is Mainnet, what is Kairos? <a id="what-is-mainnet-what-is-kairos"></a>

Mainnet is the Kaia mainnet, Kairos is a testnet.
Below is information relating to each network.

Mainnet:

- EN download : Choose the Mainnet package from the [download page](../nodes/downloads/downloads.md).
- KaiaScan : https://kaiascan.io/

Kairos testnet:

- EN download : Choose the Kairos package from the [download page](../nodes/downloads/downloads.md).
- KaiaScan : https://kairos.kaiascan.io
- Kairos Faucet : https://faucet.kaia.io

## Are there any Kaia SDKs? In what languages? <a id="kaia-sdks"></a>

Kaia Node is Ethereum-compatible, so you can use popular Ethereum SDKs like ethers.js, web3.js, web3py, web3j, or viem. However, Kaia Node also includes extended features with Kaia-specific account and transaction types.

To take advantage of these features, you can use the Kaia SDKs, which include extensions such as ethers-ext, web3js-ext, web3j-ext, and web3py-ext. These are plugin-type SDKs that extend Ethereum SDKs.

### kaia-sdk (Plug-in SDKs)

These SDKs support JavaScript, Java, and Python, so you can choose based on the language your project uses:

- ethers-ext, web3js-ext for javascript
- web3j-ext for java
- web3py-ext for python

## Must I install and run an EN (Endpoint Node) to use Kaia? <a id="must-i-install-and-run-en"></a>

It depends on your needs. If you require full control over your node and need to validate blocks yourself, then yes, you'll need to install and run your own EN. This is the typical setup for most Kaia applications. However, for testing and development, or if you prefer not to manage your own infrastructure, the [Kaia API Service (KAS)](https://www.klaytnapi.com/en/landing/main) is a great option. KAS provides access to the Kaia Node RPC APIs for both Kairos and Mainnet, plus additional API services. KAS offers free API requests after registration. Check the KAS [pricing page](https://www.klaytnapi.com/en/landing/pricing) for pricing plan information.

## I am running an EN, and node data sync is too slow. <a id="node-data-sync-is-too-slow"></a>

First, check if your HW specification meets the [system requirements](../nodes/endpoint-node/system-requirements.md).

Second, consider [downloading chaindata snapshot](../nodes/endpoint-node/install-endpoint-nodes.md#optional-download-chaindata-snapshot) to skip the time-consuming Full Sync process. The chaindata snapshot is a database snapshot that stores all blocks generated since the genesis. It is updated daily.

## Can I use ERC-20 and ERC-721 contracts on Kaia? <a id="can-i-use-erc-20-and-erc-721"></a>

Yes. Kaia supports Solidity as a smart contract language. [ERC-20](../build/smart-contracts/token-development/samples/erc-20.md) and [ERC-721](../build/smart-contracts/token-development/samples/erc-721.md) written in Solidity for Etherem can be deployed and executed on Kaia.

Further Kaia-specific token standards can be defined. Follow the [KIP (Kaia Improvement Proposal)](https://kips.kaia.io/) and join the discussion.

## Where can I get a browser extension wallet like Metamask? <a id="where-can-i-get-a-browser-extension-wallet"></a>

Kaia's web browser extension wallet [Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi). Kaia Wallet is a non-custodial wallet with which you can make KAIA transactions and create accounts. 

## Why is my fee-payer account address not derived from the key provided? <a id="account-address-is-not-derived-from-the-key"></a>

In Kaia, [the account address can be decoupled from the key pair](../learn/accounts.md#decoupling-key-pairs-from-addresses).

Common use cases are as follows.

- The account owner wants to change the key for security reasons.
- The account has a weighted-multisig or a role-based key that allows having multiple key pairs to control the account.

Fee-payer accounts usually have a [role-based key](../learn/accounts.md#accountkeyrolebased). In most cases, the account address is not derived from the RoleFeePayer key.

## Where can I find complete working samples of fee-delegation? <a id="fee-delegation-samples"></a>

You can find complete working examples of fee delegation using several different Kaia SDKs:

- ethers-ext: [fee delegated value transfer example](https://docs.kaia.io/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer/)
- web3js-ext: [fee delegated value transfer example](https://docs.kaia.io/references/sdk/web3js-ext/fee-delegated-transaction/value-transfer/)
- web3j-ext: [fee delegated value transfer example](https://docs.kaia.io/references/sdk/web3j-ext/fee-delegated-transaction/value-transfer/)
- web3py-ext: [fee delegated value transfer example](https://docs.kaia.io/references/sdk/web3py-ext/fee-delegated-transaction/value-transfer/)