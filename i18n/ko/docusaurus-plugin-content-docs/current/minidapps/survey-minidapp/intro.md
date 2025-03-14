# 소개

설문조사 미니 디앱은 사용자가 익명성과 투명성을 유지하면서 설문조사를 만들고 참여할 수 있는 개인정보 보호 중심의 탈중앙화 애플리케이션(dApp)입니다. 이 가이드는 영지식 증명 통합을 위한 Semaphore와 같은 최첨단 도구와 LINE의 개발자 에코시스템을 활용하여 Kaia 블록체인에서 설문조사 미니 디앱을 구축하고 배포하는 모든 단계를 안내합니다.

이 종합 가이드는 다음과 같은 내용을 다룹니다:

- 애플리케이션의 기능 및 목적
- 필요한 도구와 전제 조건
- 스마트 컨트랙트 개발 환경 설정하기.
- 프론트엔드 통합 및 배포.

빠르게 시작하려면 이 튜토리얼의 전체 코드를 [깃허브](https://github.com/kjeom/ExampleMiniDapp)에서 확인할 수 있습니다. 이렇게 하면 따라하면서 애플리케이션의 내부 작동 방식을 살펴볼 수 있습니다.

## 전제 조건 <a id="prerequisite"></a>

이 애플리케이션을 빌드하려면 다음이 필요합니다:

1. 기술 지식
    - 솔리디티]에 대한 확실한 이해(https://www.tutorialspoint.com/solidity/index.htm).
    - JavaScript](https://www.w3schools.com/js/default.asp) 및 [React/Next.js](https://www.w3schools.com/REACT/DEFAULT.ASP) 숙련도.
    - 하드햇과 같은 스마트 컨트랙트 개발 도구에 익숙합니다.
2. 계정 및 도구
    - [LINE 개발자 계정](https://developers.line.biz/en/).
    - [세마포어 프로토콜 설정](https://docs.semaphore.pse.dev/getting-started).
    - 디앱 포털 팀으로부터 받은 미니 디앱 SDK 클라이언트 ID.
3. 설치된 종속성
    - [Node.js 및 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## 프로젝트 설정 및 설치 <a id="project-setup-installation"></a>

프로젝트 설정 및 설치를 빠르게 시작하려면 다음 명령을 사용하여 Github에서 이 프로젝트를 복제하세요.

```bash
# clone project
git clone https://github.com/kjeom/ExampleMiniDapp
```

그런 다음 디렉터리를 복제된 폴더로 변경하고 다음 명령어로 npm을 사용하여 로컬에 프로젝트를 설치합니다:

```bash
cd ExampleMiniDapp
npm install
```

다음으로 설문조사 애플리케이션에 대한 스마트 컨트랙트의 내부 작동을 이해해 보겠습니다. 다음 섹션에서는 작동 방식에 대해 설명합니다.

