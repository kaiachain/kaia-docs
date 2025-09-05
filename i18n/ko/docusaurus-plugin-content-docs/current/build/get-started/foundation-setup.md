# 파운데이션 설정

Kaia에 대한 개괄적인 개요와 구축을 시작하기 위한 필수 사항을 알아보세요.

## 빠른 개요

카이아는 속도, 보안, 확장성을 위해 설계된 EVM 호환 블록체인입니다. 이는 이더리움 도구와 완벽하게 호환되고 솔리디티 스마트 컨트랙트를 지원하는 카이아 가상 머신(KVM)을 사용합니다. 기존 코드와 워크플로 대부분이 [최소한의 변경](../tutorials/migrating-ethereum-app-to-kaia.mdx)만으로 작동하므로, 이더리움에서 사용 중이신 경우 전환이 간단합니다.

카이아의 아키텍처에 대한 자세한 내용은 [왜 카이아를 기반으로 구축해야 하는가](../../learn/why-kaia.md) 및 [합의 메커니즘](../../learn/consensus-mechanism.md)을 참조하세요.

## 카이아 네트워크

Kaia에는 두 가지 주요 네트워크가 있습니다:

- **카이로스 테스트넷**: 테스트 및 개발용. 체인 ID: 1001. 실제 비용 없이 실험에 사용할 수 있습니다.
- **메인넷**: 프로덕션용. 체인 ID: 8217.

이러한 RPC 엔드포인트로 지갑이나 도구를 구성하세요:

- 카이로스: https://public-en-kairos.node.kaia.io
- 메인넷: https://public-en.node.kaia.io

카이아스캔](https://kaiascan.io/) (메인넷) 또는 [카이로스 카이아스캔](https://kairos.kaiascan.io/)에서 블록과 트랜잭션을 살펴보세요.

## 개발 도구

카이아는 인기 있는 이더리움 도구와 일부 확장 기능을 지원합니다. 주요 리소스:

- **[SDK](../../references/sdk/sdk.md)**: ethers-ext](../../references/sdk/ethers-ext/getting-started.md)(ethers.js의 확장자), [web3js-ext](../../references/sdk/web3js-ext/getting-started.md) 등을 사용하여 네트워크와 상호 작용합니다.
- **[공용 RPC 엔드포인트](../../references/public-en.md)**: 공용 RPC 엔드포인트를 통해 액세스합니다.
- **[솔리디티](https://github.com/ethereum/solidity)**: 솔리디티에서 계약서 작성하기-Kaia는 완벽하게 호환됩니다.
- **[카이아 컨트랙트 마법사](https://wizard.kaia.io/)**: 스마트 컨트랙트를 부트스트랩하고 카이아 컨트랙트에 대해 알아볼 수 있는 대화형 생성기입니다.
- 기타 도구: [Remix IDE with Kaia 플러그인](https://ide.kaia.io/), [하드햇](https://v2.hardhat.org/hardhat-runner/docs/getting-started), [파운드리](https://getfoundry.sh/), [써드웹](https://portal.thirdweb.com/).