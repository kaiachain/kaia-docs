# FAQ

- [카이아란?](#what-is-klaytn)
- [카이아 2.0이란?](#what-is-klaytn-2.0)
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
- [카이아에서 스마트 컨트랙트 개발에 Truffle을 사용할 수 있나요?](#can-i-use-truffle)
- [MetaMask와 같은 브라우저 확장 지갑은 어디서 구할 수 있나요?](#where-can-i-get-a-browser-extension-wallet)
- [수수료 납부자 계정 주소가 제공된 키에서 파생되지 않는 이유는 무엇인가요?](#account-address-is-not-derived-from-the-key)
- [수수료 위임의 전체 작업 샘플은 어디에서 찾을 수 있나요?](#fee-delegation-samples)

## 카이아란? <a id="what-is-klaytn"></a>

카이아는 레이어1 블록체인 플랫폼으로 짧은 지연시간, 높은 TPS, 즉각적인 완결성을 자랑합니다. 게임을 구축하고 [메타버스](../learn/klaytn2/metaverse-package)를 구현하는 데 최적화된 블록체인입니다.

## 카이아 2.0이란? <a id="what-is-klaytn-2.0"></a>

카이아 2.0은 이더리움 이퀄런스와 포괄적인 메타버스 패키지를 지원하여 블록체인 구축 경험을 용이하게 하는 메타버스에 집중하는 카이아의 전환을 의미합니다. 카이아 2.0에 대한 더 자세한 내용은 [라이트 페이퍼](https://klaytn.foundation/wp-content/uploads/Lightpaper.pdf)를 참고하시기 바랍니다.

## 카이아는 어떻게 이더리움과 동등성을 지원하나요? <a id="how-ethereum-equivalence"></a>

Kaia는 EVM과 호환되며 모든 이더리움 London EVM 기능을 지원합니다. 이더리움의 `eth` 네임스페이스는 이더리움과 호환되도록 수정되었습니다. 이더리움 툴을 원활하게 사용할 수 있으며, 최소한의 노력으로 이더리움 dApp의 마이그레이션도 가능해졌습니다. 트랜잭션 유형과 필드도 이더리움과 동일합니다.

## 카이아의 가스 정책은 무엇인가요? <a id="klaytn-gas-policy"></a>

카이아는 차익거래 봇에 대응하기 위해 고정 가스비 정책에서 동적 가스비 메커니즘을 도입했습니다. 자세한 내용은 이 [기사](https://medium.com/klaytn/dynamic-gas-fee-pricing-mechanism-1dac83d2689)를 참고하시기 바랍니다.

## 카이아 계정 구조의 특별한 점은 무엇인가요? <a id="klaytn-account-structure"></a>

카이아는 dApp 개발자들에게 최대한의 편의를 제공하기 위해 [주소에서 개인키를 분리](https://klaytn-tech.medium.com/klaytn-usability-improvement-series-1-separating-keys-and-addresses-dd5e367a0744)하는 방법을 고안했습니다. 그 결과, 하나의 계정에 여러 개의 개인키를 생성하고 각 키의 가중치를 달리하는 [다중서명](https://medium.com/klaytn/klaytn-usability-improvement-series-2-introducing-multisig-on-the-platform-level-85141893db01)을 쉽게 구현할 수 있게 되었습니다. 각 키에 [다른 역할](https://medium.com/klaytn/klaytn-usability-improvement-series-4-supporting-role-based-keys-on-the-platform-level-e2c912672b7b)을 할당할 수도 있습니다.

## 카이아로 dApp 개발은 어디서 시작할 수 있나요? <a id="dapp-development"></a>

이더리움에서 마이그레이션하든, 처음부터 카이아를 기반으로 구축하든, 필요한 모든 도구와 인프라를 지원합니다. 카이아 플러그인을 사용하여 [Remix IDE](../build//tutorials/connecting-remix)에서 스마트 컨트랙트를 테스트하거나, [MetaMask](../build/tutorials/connecting-metamask) 지갑과 [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi)에 연결할 수 있습니다. 카이아의 sdk 'caver'는 [caver-js](https://github.com/klaytn/caver-js)로 제공되며, [튜토리얼](../build/tutorials/tutorials.md)을 참고하여 카이아에서 dApp을 구축해볼 수 있습니다.

## 카이아는 오픈소스인가요? <a id="is-klaytn-open-source"></a>

카이아는 확실히 오픈소스입니다! [GitHub 조직](https://github.com/klaytn)을 살펴보고 카이아 문서에 [기여](https://github.com/klaytn/klaytn-docs/blob/master/CONTRIBUTING.md)를 시작할 수 있습니다. 오픈소스 정책에 대한 자세한 내용은 [여기](opensource)에서 확인하세요.

## 내 계정에 처음 펀딩하려면 어떻게 해야 하나요? <a id="fund-my-acconut"></a>

거래소에서 KAIA를 구매할 수 있습니다. 사용 가능한 거래소 목록은 여기에서 확인할 수 있습니다:
[CoinMarketCap](https://coinmarketcap.com/currencies/klaytn/markets/) 또는 [CoinGecko](https://www.coingecko.com/en/coins/klay#markets)

## 테스트와 개발을 위한 카이아의 퍼블릭 노드 프로바이더가 있나요? <a id="node-providers"></a>

카이아의 퍼블릭 노드 프로바이더와 네트워크 도메인은 이 [목록](../references/service-providers/public-en#public-json-rpc-endpoint-providers)을 참조하세요.

## KAIA를 테스트할 수 있는 Faucet이 있나요? <a id="are-there-faucets"></a>

여기에서 개발 및 테스트 목적으로 테스트 KAIA를 받을 수 있습니다:
[KLAY Faucet](https://baobab.wallet.klaytn.foundation/faucet)
[AllThatNode Faucet](https://www.allthatnode.com/faucet/klaytn.dsrv)

## 퍼블릭 RPC 엔드포인트 상태는 어떻게 확인하나요? <a id="rpc-endpoint-status"></a>

엔드포인트의 가동 시간과 안정성을 보장할 수 없으므로 노드 공급자 상태는 [여기](https://www.allthatnode.com/klaytn.dsrv)에서 언제든지 확인할 수 있습니다.

## 어떤 지갑이 카이아를 지원하나요? <a id="which-wallets"></a>

카이아는 콜드월렛인 D’cent와 Kaikas, MetaMask 등 다양한 핫월렛에서 지원됩니다. [여기](http://klaytn.foundation/ecosystem) 목록을 참조하세요.

## What is Mainnet, what is Kairos? <a id="what-is-cypress-what-is-baobab"></a>

Cypress는 Kaia 메인넷, Kairos는 테스트넷입니다.
아래는 각 네트워크와 관련된 정보입니다.

메인넷:

- EN 다운로드 : [다운로드 페이지](../nodes/downloads/downloads.md)에서 메인넷 패키지를 선택합니다.
- Klaytnscope : https://klaytnscope.com
- 카이아 지갑 : https://wallet.klaytn.com

Kairos 테스트넷:

- EN 다운로드 : [다운로드 페이지](../nodes/downloads/downloads.md)에서 Kairos 패키지를 선택합니다.
- Klaytnscope : https://baobab.klaytnscope.com
- 카이아 지갑 : https://baobab.wallet.klaytn.foundation
- Kairos Faucet : https://baobab.wallet.klaytn.foundation/faucet

## 카이아 SDK가 있나요? 어떤 언어로 제공되나요? <a id="klaytn-sdks"></a>

공식 카이아 SDK는 JavaScript와 자바로 제공됩니다.
[caver-js](../references/sdk/caver-js/caver-js.md) 및 [caver-java](../references/sdk/caver-java/caver-java.md)를 참조하세요. Community contributions are always welcome in providing [Kaia APIs](../../references/json-rpc/klay/account-created) in other languages.

카이아 SDK를 사용해 dApp을 빌드하는 방법에 대한 자세한 내용은 [튜토리얼](../build/tutorials/tutorials.md)을 참고하세요.

또한 포팅 가이드라인 [from web3.js](../references/sdk/caver-js-1.4.1/porting-from-web3.js.md) 및 [from web3j](../references/sdk/caver-java-1.4.0/porting-from-web3j.md)를 확인하시기 바랍니다. caver-js와 caver-java의 구문은 web3.js 및 web3j와 매우 유사하기 때문에 포팅은 최소한으로 매우 간단해야 합니다. 하지만, web3.js나 web3j를 사용하여 Klaytn에 요청할 수는 없습니다.

## 카이아를 사용하려면 EN(엔드포인트 노드)을 설치 및 실행해야 하나요? <a id="must-i-install-and-run-en"></a>

예와 아니오.
엔드포인트 노드는 블록의 유효성을 검사하고 RPC API를 외부에 노출합니다. 애플리케이션이 카이아 네트워크와 상호작용하려면 항상 EN이 필요합니다.
단순히 카이아 API를 사용해보고 싶으신 분들은 [KAS(Kaia API Service)](https://www.klaytnapi.com)를 사용해보실 수 있습니다.
KAS는 카이아 네트워크(Kairos와 메인넷 모두)의 RPC API를 노출하는 카이아 노드 API 서비스와 기타 유용한 API 서비스를 제공합니다.
KAS는 사용자 등록 후 API 요청을 무료로 제공합니다. 요금제에 대한 자세한 내용은 [KAS 요금제 페이지](https://www.klaytnapi.com/landing/pricing)를 참고하시기 바랍니다.

## EN을 실행 중인데 노드 데이터 동기화가 너무 느립니다. <a id="node-data-sync-is-too-slow"></a>

먼저, HW 사양이 [시스템 요구 사항](../nodes/endpoint-node/system-requirements.md)을 충족하는지 확인합니다.

[빠른 동기화](../nodes/endpoint-node/install-endpoint-nodes.md#fast-sync-optional)를 확인합니다.
카이아는 매일 체인 데이터를 게시합니다. 체인 데이터는 생성 이후 생성된 모든 블록을 저장하는 데이터베이스 스냅샷입니다. 빠른 동기화를 위해 최신 체인 데이터를 다운로드하세요.

## 카이아에서 ERC-20과 ERC-721 컨트랙트를 사용할 수 있나요? <a id="can-i-use-erc-20-and-erc-721"></a>

예. Kaia는 스마트 컨트랙트 언어로서 Solidity를 지원합니다. 이더리움 스마트 컨트랙트 언어 Solidity로 작성된 [ERC-20](../build/smart-contracts/samples/erc-20.md) 및 [ERC-721](../build/smart-contracts/samples/erc-721.md)은 Klaytn에서 배포 및 실행될 수 있습니다.

카이아에 특화된 토큰 표준을 추가로 정의할 수 있습니다. [카이아 개선 제안서(KIP)](http://kips.klaytn.foundation)를 참고하여 토론에 참여해 주세요.

## 카이아에서 스마트 컨트랙트 개발에 Truffle을 사용할 수 있나요? <a id="can-i-use-truffle"></a>

예. Truffle은 카이아에서 스마트 컨트랙트를 개발할 때 [Truffle-가상지갑-제공자-카이아](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn)로 사용할 수 있습니다.
[Truffle](../build/smart-contracts/ide-and-tools/truffle.md)을 참조하고 설정 가이드라인을 따르세요.

Truffle을 처음 사용하는 경우, [테스트 가이드](../build/smart-contracts/testing-guide.md) 및 [배포 가이드](../build/smart-contracts/deploy/deploy.md)를 참조하여 Truffle을 사용하여 수행할 수 있는 작업에 대한 대략적인 아이디어를 얻을 수 있습니다.

## MetaMask와 같은 브라우저 확장 지갑은 어디서 구할 수 있나요? <a id="where-can-i-get-a-browser-extension-wallet"></a>

카이아의 웹브라우저 확장 지갑 [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en). Kaikas는 KAIA트랜잭션과 계정 생성을 할 수 있는 비위탁 지갑입니다.

## 제공된 키에서 수수료 납부자 계정 주소가 파생되지 않는 이유는 무엇인가요? <a id="account-address-is-not-derived-from-the-key"></a>

카이아에서는 [계정 주소를 키 쌍에서 분리할 수 있습니다](../learn/accounts.md#decoupling-key-pairs-from-addresses).

일반적인 사용 사례는 다음과 같습니다.

- 계정 소유자가 보안상의 이유로 키를 변경하려는 경우.
- 계정에 여러 개의 키 쌍을 사용하여 계정을 제어할 수 있는 가중치 다중 서명 또는 역할 기반 키가 있는 경우.

수수료 납부자 계정에는 일반적으로 [역할 기반 키](../learn/accounts.md#accountkeyrolebased)가 있습니다. 대부분의 경우 계정 주소는 역할 기반 키에서 파생되지 않습니다.

## 수수료 대납의 전체 작업 샘플은 어디에서 찾을 수 있나요? <a id="fee-delegation-samples"></a>

[수수료 위임 예시](../build/tutorials/fee-delegation-example.md)를 확인하여 전체 작동하는 밸류 전송 코드를 얻으세요.

수수료 위임이 있는 컨트랙트를 배포하려면 [JavaScript 코드 스니펫](https://gist.github.com/w3kim/64a3cf5da58250474f046d4dd7f85cc8)을 참조하세요. 수수료 위임이 있는 컨트랙트 배포에는 Truffle을 사용할 수 없다는 점에 유의하세요.

[여러 서명자가 있는 트랜잭션 보내기](../references/sdk/caver-js-1.4.1/get-started-1.4.1.md#sending-a-transaction-with-multiple-signer)에 서명을 수집하는 두 가지 방법에 대한 좋은 설명이 나와 있습니다.
관련 caver-js API는 다음과 같습니다. API 설명에서 코드 예시를 살펴보세요.

- [caver.kaia.accounts.signTransaction](../references/sdk/caver-js-1.4.1/api/caver.kaia.accounts.md#signtransaction)
- [caver.kaia.accounts.feePayerSignTransaction](../references/sdk/caver-js-1.4.1/api/caver.kaia.accounts.md#feepayersigntransaction)
- [caver.kaia.accounts.combinesignatures](../references/sdk/caver-js-1.4.1/api/caver.kaia.accounts.md#combinesignatures)
- [caver.kaia.sendSignedTransaction](../references/sdk/caver-js-1.4.1/api/caver.kaia/transaction/transaction.md#sendsignedtransaction)
