# Count dApp 빌드하기

## 목차 <a href="#table-of-contents" id="table-of-contents"></a>

- [환경 설정](./setup-environment.md)
- [스마트 컨트랙트 배포](./deploy-contracts.md)
- [디렉터리 구조](./directory-structure.md)
- [프론트엔드 코드 개요](./code-overview/code-overview.md)
  - [BlockNumber 컴포넌트](./code-overview/blocknumber-component.md)
  - [Auth 컴포넌트](./code-overview/auth-component.md)
  - [Count 컴포넌트](./code-overview/count-component.md)

## 테스트 환경 <a href="#testing-environment" id="testing-environment"></a>

Count dApp은 다음 환경에서 테스트되었습니다.

- MacOS Mojave 10.14.5
- Node 10.16.0(LTS)
- npm 6.9.0
- Python 2.7.10

## 소개 <a href="#introduction" id="introduction"></a>

![intro](/img/build/tutorials/tutorial-1intro.gif)

이 튜토리얼은 카이아 dApp을 빌드하는 방법을 단계별로 안내하기 위한 것입니다. 카이아에 대한 사전 경험이 없어도 됩니다. 기본적인 스마트 컨트랙트인 `Count`와 상호작용하는 간단한 웹앱을 만들겠습니다. 카이아 계정이 있는 사용자라면 누구나 위 그림과 같이 현재 값을 늘리거나 줄일 수 있습니다.

> **소스코드**\
> 전체 소스 코드는 GitHub에서 [https://github.com/klaytn/countbapp](https://github.com/klaytn/countbapp)에서 확인할 수 있습니다.

## 대상 독자 <a href="#intended-audience" id="intended-audience"></a>

카이아에서 블록체인 애플리케이션을 구축하는 방법을 배우고 싶은 분이라면 누구나 참여 가능합니다. 스마트 컨트랙트와 상호작용하는 웹 애플리케이션을 만들어 보겠습니다. 이 튜토리얼을 완료하려면 다음 개념에 익숙해야 합니다.

- [React](https://reactjs.org/) 및 [Redux](https://redux.js.org/)에 대한 기본 지식이 있다고 가정합니다. 이 강좌는 완전 초보자를 위한 강좌가 아닙니다.
- Solidity 개발에 대한 기본 지식과 경험이 있는 분을 권장합니다. 하지만, SW 개발 경험이 있는 개발자라면 본 튜토리얼의 단계별 가이드에 따라 작업을 완료할 수 있습니다.
