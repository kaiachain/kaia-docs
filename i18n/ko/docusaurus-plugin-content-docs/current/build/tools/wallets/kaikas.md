# Kaikas

![](/img/build/tools/klaytnXkaikas.png)

Kaikas는 카이아 네트워크를 위한 브라우저 확장 지갑입니다. 구글 크롬에서 사용할 수 있는 Kaikas는 웹 브라우저를 통해 카이아 네트워크와 상호작용할 수 있는 안전하고 사용하기 쉬운 수단을 제공합니다. Kaikas를 사용하면 KAIA와 카이아 기반 토큰을 저장하고 거래할 수 있습니다. 또한 웹 기반 dApp(탈중앙 애플리케이션)의 요청에 서명할 수 있습니다.

- Chrome 웹 스토어에서 다운로드하세요: [링크](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi)

개발자의 경우, [https://docs.kaikas.io](https://docs.kaikas.io)에서 Kaikas를 사용하여 dApp을 개발하는 방법을 알아보세요.

## PC 웹 브라우저 기반 탈중앙화 HD 지갑

Kaikas는 Chrome에서 사용할 수 있는 웹 브라우저 확장 프로그램입니다. Kaikas는 데스크톱 환경에 최적화되어 있습니다.

Kaikas는 사용자 계정과 키를 관리할 수 있는 기능을 제공합니다. 모든 트랜잭션은 카이아 블록체인에 투명하게 기록되며, 누구나 \[Klaytnscope]를 통해 트랜잭션 내역에 접근할 수 있습니다.

Kaikas는 계층적 결정론(Hierarchical Deterministic, HD) 지갑으로, 하나의 시드 문구에서 개인/공개 키의 계층적 트리와 같은 구조를 무한정 생성한다는 의미입니다. 시드 구문은 니모닉 코드 단어로 구성되므로 임의의 영숫자로 구성된 구문보다 기억하기 쉽습니다. 사용자의 개인 키는 암호화되어 브라우저에 저장됩니다.

위에서 설명한 기능을 통해 Kaikas는 현재 블록체인 경험의 보안, 투명성, 사용자 친화성을 개선했습니다. 하지만 사용자가 자신의 개인 계정을 관리할 책임이 있다는 점은 중요합니다. 예를 들어, 사용자가 시드 문구를 기억하지 못하는 경우 계정을 복원할 수 있는 다른 방법이 없습니다.

## 다양한 카이아 네트워크와 토큰 지원

Kaikas에서는 KAIA를 포함한 모든 카이아 기반 토큰을 보관하고 거래할 수 있습니다. 기본적으로 로드되지 않는 토큰은 컨트랙트 주소에 붙여넣기하여 삽입할 수 있습니다. 여러분만의 카이아 기반 커스텀 토큰을 Kaikas에 저장하고 거래할 수도 있습니다!

Kaikas는 카이아의 Kairos 테스트넷과 메인넷을 지원합니다. 또한, Kaikas는 프라이빗 네트워크에서 커스텀 토큰을 유통하고자 하는 카이아 기반 dApp 개발자들을 위한 프라이빗 체인도 지원합니다.

## 웹 기반 dApp 트랜잭션 서명하기

Kaikas는 여러분과 dApp 사이의 간극을 메워주며, 여러분이 Kaikas 계정으로 dApp에서 여러분에게 전송되는 트랜잭션/데이터에 서명할 수 있도록 지원합니다.
Kaikas는 개발자가 [FeeDelegatedTransaction](../../../learn/transactions/transactions.md#fee-delegation)을 처리하는 데 유용한 유틸리티이기도 합니다. Kaikas를 사용하면 트랜잭션 발신자와 수수료 납부자 모두 수수료 위임 트랜잭션에 빠르게 서명할 수 있습니다.

[Kaiascope]: ../block-explorers/klaytnscope.md
