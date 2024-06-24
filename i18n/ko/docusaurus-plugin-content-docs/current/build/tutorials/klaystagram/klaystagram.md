# Klaystagram 빌드하기

## 목차 <a href="#table-of-contents" id="table-of-contents"></a>

- [환경 설정](./setup-environment.md)
- [스마트 컨트랙트 배포](./deploy-contracts.md)
- [디렉터리 구조](./directory-structure.md)
- [코드 개요](./code-overview.md)
- [FeedPage 구성 요소](./feedpage.md)
  - 프론트엔드에 컨트랙트 연결](./feedpage.md#1-connect-contract-to-frontend)
  - 사진 컴포넌트 업로드](./feedpage.md#2-uploadphoto-component)
  - 피드 컴포넌트](./feedpage.md#3-feed-component)
  - 소유권 이전 컴포넌트](./feedpage.md#4-transferownership-component)

## 테스트 환경 <a href="#testing-environment" id="testing-environment"></a>

Klaystagram dApp은 다음 환경에서 테스트되었습니다.

- MacOS Mojave 10.14.5
- Node 10.16.0(LTS)
- npm 6.9.0
- Python 2.7.10

## 소개 <a href="#introduction" id="introduction"></a>

[![Klaystagram 소개 동영상](/img/build/tutorials/klaystagram-video-poster.png)](https://vimeo.com/327033594)

이번 튜토리얼에서는 카이아 기반 NFT 사진 라이선스 애플리케이션인 `Klaystagram`을 만드는 방법을 배워보겠습니다. 이 간단한 웹 애플리케이션을 만들려면 Solidity, JavaScript, 리액트에 대한 기본 지식이 필요합니다.

대체 불가능한 토큰은 고유한 자산을 나타내는 특수한 유형의 토큰인 대체 불가능한 토큰을 말합니다. 대체불가형이라는 이름에서 알 수 있듯이 모든 토큰은 고유합니다. 그리고 이러한 NFT의 고유성은 자산 디지털화의 새로운 지평을 열어줍니다. 예를 들어 디지털 아트, 게임 아이템 또는 모든 종류의 고유 자산을 표현하고 사람들이 이를 거래할 수 있도록 하는 데 사용할 수 있습니다. 자세한 내용은 이 [기사](https://coincentral.com/nfts-non-fungible-tokens/)를 참조하세요.

`Klaystagram`에서 모든 토큰은 사용자의 고유한 사진을 나타냅니다. 사용자가 사진을 업로드하면 이미지 데이터와 소유권이 포함된 고유 토큰이 생성됩니다. 모든 거래는 블록체인에 기록되기 때문에 서비스 제공자도 업로드된 사진에 대한 통제권을 갖지 못합니다. 이 튜토리얼의 목적을 고려하여 핵심 기능만 구현합니다. 이 튜토리얼을 마친 후에는 멋진 기능을 추가하여 자신만의 창의적인 서비스를 만들어 보세요.

세 가지 주요 기능이 있습니다.

1. **사진 업로드** 사용자는 카이아 블록체인에 설명과 함께 사진을 업로드할 수 있습니다. 사진은 토큰화됩니다.
2. **피드** 사용자는 블록체인에 업로드된 모든 사진을 볼 수 있습니다.
3. **소유권 이전** 사진의 소유자는 다른 사용자에게 사진의 소유권을 이전할 수 있으며, 해당 트랜잭션은 소유권 내역에 표시됩니다.

> **소스코드**\
> 전체 소스 코드는 GitHub에서 [https://github.com/klaytn/klaystagram](https://github.com/klaytn/klaystagram)에서 확인할 수 있습니다.

## 대상 독자 <a href="#intended-audience" id="intended-audience"></a>

스마트 컨트랙트와 상호작용하는 웹 애플리케이션을 구축하겠습니다. 이 튜토리얼을 완료하려면 다음 개념에 익숙해야 합니다.

- [React](https://reactjs.org/) 및 [Redux](https://redux.js.org/)에 대한 기본 지식이 있다고 가정합니다. 이 강좌는 완전 초보자를 위한 강좌가 아닙니다.
- [Solidity](https://solidity.readthedocs.io/en/v0.5.10/) 개발에 대한 기본 지식과 경험이 있는 분을 권장합니다. 하지만, 본 튜토리얼의 단계별 가이드를 따라 진행하면 숙련된 SW 개발자라면 누구나 완성할 수 있습니다.
- [ERC-721 토큰](http://erc721.org/)에 관심이 있는 분이라면 누구나 가능합니다.
