---
title: 계약서 관리하기
sidebar_label: 계약 상호작용
---

# 계약서 관리하기

:::caution 일몰 공고

`safe.kaia.io`는 **2026년 8월 9일**에 서비스가 종료될 예정입니다. 앞으로는 [app.safe.global](https://app.safe.global)에서 Kaia Network용 Safe Wallet을 사용하여 계정을 관리해 주시기 바랍니다. 기존의 ‘Safe Accounts’는 ‘Safe Wallet’과 자동으로 호환됩니다.

:::

이 섹션에서는 Safe Wallet에서 관리되는 Safe 계정을 사용하여 Kairos상의 간단한 계약과 상호작용하게 됩니다.

**선행 조건**

- [Kaia / Kairos](../../tutorials/connecting-metamask.mdx)에 맞게 설정된 [MetaMask](https://metamask.io/download/)
- [리믹스](https://remix.ethereum.org/) (필요 시 Kaia 네트워크 지원 포함)
- [Faucet](https://faucet.kaia.io)에서 KAIA를 테스트해 보세요.
- Kairos의 Safe 계정 ([계정 만들기](./use-kaia-safe.md#create-a-safe))

**1단계:** [Remix](https://remix.ethereum.org/)를 엽니다.

**2단계:** 샘플 스토리지 계약서(또는 직접 작성한 계약서)를 컴파일하고 배포합니다.

Safe에서 계약을 사용하기 전에 먼저 계약을 배포하십시오. 일반적인 샘플 계약에서는 `uint`를 노출하며, 이 값은 `store`를 통해 업데이트하고 `retrieve`를 통해 읽을 수 있습니다.

![](/img/build/wallets/ks-succor-deploy.gif)

**3단계:** Safe Wallet에서 새로운 거래를 시작합니다.

**새 거래**를 클릭하세요. 메서드와 매개변수를 선택할 수 있도록 배포된 계약 주소와 ABI를 입력하세요.

![](/img/build/wallets/ks-succor-init-tx.gif)

**4단계:** 검토 후 제출. 소유자 지갑으로 서명하면, 확인 기준치에 도달하는 즉시 거래가 실행됩니다.

![](/img/build/wallets/ks-succor-review-tx.gif)

또한 [트랜잭션 빌더](./tx-builder.md)를 사용하여 계약 호출을 일괄 처리하거나, [API 키트](./kaia-safe-api-kit.md)를 통해 프로그래밍 방식으로 제안할 수도 있습니다.
