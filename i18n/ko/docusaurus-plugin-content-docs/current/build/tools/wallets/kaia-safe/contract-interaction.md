# 컨트랙트와 상호작용하기

이 섹션에서는 새로 생성한 다중서명 지갑을 사용하여 Kairos에 배포된 간단한 컨트랙트와 상호작용하고 트랜잭션을 전송할 것입니다.

**사전 요구 사항**

- [MetaMask](https://metamask.io/download/) & [카이아 MetaMask 설정](../../../tutorials/connecting-metamask#send-klay)
- [Remix](https://remix.ethereum.org/) & [Kaia Remix 플러그인](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 테스트 KAIA를 받습니다.

**1단계**: [Remix](https://remix.ethereum.org/)로 이동합니다.

**2단계**: 샘플 **스토리지 컨트랙트**를 컴파일하고 배포합니다.

멀티서명 지갑에서 컨트랙트와 상호작용하기 전에 먼저 컨트랙트를 배포해야 합니다. 이 샘플 컨트랙트에는 **store** 메서드를 호출하여 업데이트하고 **retrieve** 메서드를 호출하여 검색할 수 있는 간단한 정수형 "number" 변수가 포함되어 있습니다.

![](/img/build/tools/13_contractInit.gif)

**3단계**: 새 트랜잭션을 시작합니다.

안전지갑에서 스마트 컨트랙트와 상호작용하려면 **New Transaction**을 클릭합니다. 이 단계를 완료하려면 이전 단계에서 설명한 대로 이미 배포한 컨트랙트 주소와 ABI가 필요합니다.

![](/img/build/tools/14_contractExec.gif)

**4단계**: 트랜잭션을 검토하고 제출합니다. 서명자 지갑으로 트랜잭션에 서명해야 하며, 확인 임계값에 도달하면 트랜잭션이 실행됩니다.

![](/img/build/tools/12_remixDep.gif)
