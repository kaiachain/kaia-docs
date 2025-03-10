# FAQ

- [카이아란?](#what-is-klaytn)
- [카이아는 어떻게 이더리움과 동등성을 지원하나요?](#how-ethereum-equivalence)
- [카이아의 가스 정책은 무엇인가요?](#klaytn-gas-policy)
- [카이아의 계정 구조는 어떤 점이 특별한가요?](#klaytn-account-structure)
- [카이아로 dApp 개발은 어디서 시작할 수 있나요?](#dapp-development)
- [카이아는 오픈소스인가요?](#is-klaytn-open-source)
- [계정 초기 자금은 어떻게 조달하나요?](#fund-my-acconut)
- [테스트와 개발을 위한 카이아의 퍼블릭 노드 제공자가 있나요?](#node-providers)
- [테스트용 KAIA를 구할 수 있는 Faucet이 있나요?](#are-there-faucets)
- [퍼블릭 RPC 엔드포인트 상태는 어떻게 확인하나요?](#rpc-endpoint-status)
- [어떤 지갑이 카이아를 지원하나요?](#which-wallets)
- [Cypress란 무엇인가요, Kairos는 무엇인가요?](#what-is-cypress-what-is-baobab)
- [카이아 SDK가 있나요? 어떤 언어가 있나요?](#klaytn-sdks)
- [카이아를 사용하려면 EN(엔드포인트 노드)을 설치하고 실행해야 하나요?](#must-i-install-and-run-en)
- [EN을 실행 중인데 노드 데이터 동기화가 너무 느려요.](#node-data-sync-is-too-slow)
- [카이아에서 ERC-20과 ERC-721 컨트랙트를 사용할 수 있나요?](#can-i-use-erc-20-and-erc-721)
- [MetaMask와 같은 브라우저 확장 지갑은 어디서 구할 수 있나요?](#where-can-i-get-a-browser-extension-wallet)
- [수수료 납부자 계정 주소가 제공된 키에서 파생되지 않는 이유는 무엇인가요?](#account-address-is-not-derived-from-the-key)
- [수수료 위임의 전체 작업 샘플은 어디에서 찾을 수 있나요?](#fee-delegation-samples)

## 카이아란? <a id="what-is-klaytn"></a>

Kaia is a high-performance Layer 1 blockchain designed for the mass adoption of Web3, particularly in Asia. It offers over 4,000 TPS, immediate finality, and one-second block times. Fully compatible with Ethereum, Kaia enables seamless dApp migration and provides a robust ecosystem with developer-friendly tools, low fees, and strong liquidity from an ecosystem fund. It prioritizes Web2 user accessibility through integrations with major messaging platform like Kakao and LINE. For details, see our [White Paper](https://docs.kaia.io/kaiatech/kaia-white-paper/).

## 카이아는 어떻게 이더리움과 동등성을 지원하나요? <a id="how-ethereum-equivalence"></a>

Kaia is EVM-compatible and supports all Ethereum Cancun EVM features except EIP-4844 blob transactions. It provides the `eth` namespace RPC API, allowing seamless use of Ethereum SDKs and tools. Kaia-specific transaction types are represented as Type 0 legacy transactions within the eth namespace APIs, so Ethereum SDKs do not need to be aware of them.

## 카이아의 가스 정책은 무엇인가요? <a id="klaytn-gas-policy"></a>

Kaia uses a dynamic gas fee model that maintains low fees during normal network conditions but adjusts fees based on network congestion. The gas fee can change within a limited range per block, helping prevent network spam while keeping fees predictable. A portion of every transaction fee is automatically burned. The model prioritizes user experience and enterprise-friendliness while maintaining network stability.

## 카이아 계정 구조의 특별한 점은 무엇인가요? <a id="klaytn-account-structure"></a>

카이아는 dApp 개발자들에게 최대한의 편의를 제공하기 위해 [주소에서 개인키를 분리](https://klaytn-tech.medium.com/klaytn-usability-improvement-series-1-separating-keys-and-addresses-dd5e367a0744)하는 방법을 고안했습니다. 그 결과, 하나의 계정에 여러 개의 개인키를 생성하고 각 키의 가중치를 달리하는 [다중서명](https://medium.com/klaytn/klaytn-usability-improvement-series-2-introducing-multisig-on-the-platform-level-85141893db01)을 쉽게 구현할 수 있게 되었습니다. 각 키에 [다른 역할](https://medium.com/klaytn/klaytn-usability-improvement-series-4-supporting-role-based-keys-on-the-platform-level-e2c912672b7b)을 할당할 수도 있습니다.

## 카이아로 dApp 개발은 어디서 시작할 수 있나요? <a id="dapp-development"></a>

이더리움에서 마이그레이션하든, 처음부터 카이아를 기반으로 구축하든, 필요한 모든 도구와 인프라를 지원합니다. You can test your smart contracts on [Remix IDE](../build/tutorials/connecting-remix.md) using Kaia Plugin or connect to [MetaMask](../build/tutorials/connecting-metamask.mdx) wallet and [Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi). Kaia’s sdk is available [here](https://github.com/kaiachain/kaia-sdk). You can refer to our [tutorials](../build/tutorials/tutorials.md) to try building a dApp on Kaia.

## 카이아는 오픈소스인가요? <a id="is-klaytn-open-source"></a>

카이아는 확실히 오픈소스입니다! Take a look at our [Github Organization](https://github.com/kaiachain) and you can start [contributing](https://github.com/kaiachain/kaia-docs/blob/main/CONTRIBUTING.md) to our Kaia Documentation. Read more about our open-source policies [here](opensource.md).

## 내 계정에 처음 펀딩하려면 어떻게 해야 하나요? <a id="fund-my-acconut"></a>

거래소에서 KAIA를 구매할 수 있습니다. The list of available exchanges can be found here:
[Coinmarketcap](https://coinmarketcap.com/currencies/klaytn/markets/), [Coingecko](https://www.coingecko.com/en/coins/klay#markets).

## 테스트와 개발을 위한 카이아의 퍼블릭 노드 프로바이더가 있나요? <a id="node-providers"></a>

Refer to [this list](../references/public-en.md#rpc-service-providers) for Kaia’s Public Node Providers and the network domains.

## KAIA를 테스트할 수 있는 Faucet이 있나요? <a id="are-there-faucets"></a>

You can get test KAIA for development and testing purposes here:

- [Kaia Faucet](https://faucet.kaia.io)
- [NODIT Faucet](https://kaiafaucet.com)
- [Thirdweb Faucet](https://thirdweb.com/kaia-testnet-kairos)

## 퍼블릭 RPC 엔드포인트 상태는 어떻게 확인하나요? <a id="rpc-endpoint-status"></a>

Since we cannot guarantee uptime and stability of the endpoints, you can always check for node provider status here: [ChainList](https://chainlist.org/chain/8217), [Kaia Status](https://status.kaia.io/).

## 어떤 지갑이 카이아를 지원하나요? <a id="which-wallets"></a>

Kaia is supported by the cold wallet D’cent, as well as a host of hot wallets like Kaia Wallet, MetaMask and more. Please refer to the list [here](../build/tools/wallets/wallets.md).

## What is Mainnet, what is Kairos? <a id="what-is-cypress-what-is-baobab"></a>

Cypress는 Kaia 메인넷, Kairos는 테스트넷입니다.
아래는 각 네트워크와 관련된 정보입니다.

메인넷:

- EN 다운로드 : [다운로드 페이지](../nodes/downloads/downloads.md)에서 메인넷 패키지를 선택합니다.
- Kaiascope : https://kaiascope.com/

Kairos 테스트넷:

- EN 다운로드 : [다운로드 페이지](../nodes/downloads/downloads.md)에서 Kairos 패키지를 선택합니다.
- Kaiascope : https://kairos.kaiascope.com
- Kairos Faucet : https://faucet.kaia.io

## 카이아 SDK가 있나요? 어떤 언어로 제공되나요? <a id="klaytn-sdks"></a>

Kaia Node is Ethereum-compatible, so you can use popular Ethereum SDKs like ethers.js, web3.js, web3py, web3j, or viem. However, Kaia Node also includes extended features with Kaia-specific account and transaction types.

To take advantage of these features, you can use the Kaia SDKs, which include extensions such as ethers-ext, web3js-ext, web3j-ext, and web3py-ext. These are plugin-type SDKs that extend Ethereum SDKs. If you prefer standalone SDKs, you can consider the Caver SDKs, such as caver-js and caver-java, which are designed for projects where Ethereum compatibility is not required.

### kaia-sdk (Plug-in SDKs)

These SDKs support JavaScript, Java, and Python, so you can choose based on the language your project uses:

- ethers-ext, web3js-ext for javascript
- web3j-ext for java
- web3py-ext for python

### caver (Standalone SDKs)

These SDKs support JavaScript and Java, and are ideal for projects where Ethereum compatibility is not necessary:

- caver-js for javascript
- caver-java for java

## 카이아를 사용하려면 EN(엔드포인트 노드)을 설치 및 실행해야 하나요? <a id="must-i-install-and-run-en"></a>

It depends on your needs. If you require full control over your node and need to validate blocks yourself, then yes, you'll need to install and run your own EN. This is the typical setup for most Kaia applications. However, for testing and development, or if you prefer not to manage your own infrastructure, the [Kaia API Service (KAS)](https://www.klaytnapi.com/en/landing/main) is a great option. KAS provides access to the Kaia Node RPC APIs for both Kairos and Mainnet, plus additional API services. KAS offers free API requests after registration. Check the KAS [pricing page](https://www.klaytnapi.com/en/landing/pricing) for pricing plan information.

## EN을 실행 중인데 노드 데이터 동기화가 너무 느립니다. <a id="node-data-sync-is-too-slow"></a>

먼저, HW 사양이 [시스템 요구 사항](../nodes/endpoint-node/system-requirements.md)을 충족하는지 확인합니다.

Second, consider [downloading chaindata snapshot](../nodes/endpoint-node/install-endpoint-nodes.md#optional-download-chaindata-snapshot) to skip the time-consuming Full Sync process. The chaindata snapshot is a database snapshot that stores all blocks generated since the genesis. It is updated daily.

## 카이아에서 ERC-20과 ERC-721 컨트랙트를 사용할 수 있나요? <a id="can-i-use-erc-20-and-erc-721"></a>

예. Kaia는 스마트 컨트랙트 언어로서 Solidity를 지원합니다. 이더리움 스마트 컨트랙트 언어 Solidity로 작성된 [ERC-20](../build/smart-contracts/samples/erc-20.md) 및 [ERC-721](../build/smart-contracts/samples/erc-721.md)은 Klaytn에서 배포 및 실행될 수 있습니다.

카이아에 특화된 토큰 표준을 추가로 정의할 수 있습니다. Follow the [KIP (Kaia Improvement Proposal)](https://kips.kaia.io/) and join the discussion.

## MetaMask와 같은 브라우저 확장 지갑은 어디서 구할 수 있나요? <a id="where-can-i-get-a-browser-extension-wallet"></a>

Kaia's web browser extension wallet [Kaia Wallet](https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi). Kaia Wallet is a non-custodial wallet with which you can make KAIA transactions and create accounts.

## 제공된 키에서 수수료 납부자 계정 주소가 파생되지 않는 이유는 무엇인가요? <a id="account-address-is-not-derived-from-the-key"></a>

카이아에서는 [계정 주소를 키 쌍에서 분리할 수 있습니다](../learn/accounts.md#decoupling-key-pairs-from-addresses).

일반적인 사용 사례는 다음과 같습니다.

- 계정 소유자가 보안상의 이유로 키를 변경하려는 경우.
- 계정에 여러 개의 키 쌍을 사용하여 계정을 제어할 수 있는 가중치 다중 서명 또는 역할 기반 키가 있는 경우.

수수료 납부자 계정에는 일반적으로 [역할 기반 키](../learn/accounts.md#accountkeyrolebased)가 있습니다. 대부분의 경우 계정 주소는 역할 기반 키에서 파생되지 않습니다.

## 수수료 대납의 전체 작업 샘플은 어디에서 찾을 수 있나요? <a id="fee-delegation-samples"></a>

You can find complete working examples of fee delegation using several different Kaia SDKs:

- ethers-ext: [fee delegated value transfer example](https://docs.kaia.io/references/sdk/ethers-ext/v6/fee-delegated-transaction/value-transfer/)
- web3js-ext: [fee delegated value transfer example](https://docs.kaia.io/references/sdk/web3js-ext/fee-delegated-transaction/value-transfer/)
- web3j-ext: [fee delegated value transfer example](https://docs.kaia.io/references/sdk/web3j-ext/fee-delegated-transaction/value-transfer/)
- web3py-ext: [fee delegated value transfer example](https://docs.kaia.io/references/sdk/web3py-ext/fee-delegated-transaction/value-transfer/)
- Caver-js: [fee-delegation-example](https://docs.kaia.io/build/tutorials/fee-delegation-example/)