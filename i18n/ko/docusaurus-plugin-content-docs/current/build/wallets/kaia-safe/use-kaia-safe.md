---
title: Kaia에서 Safe Wallet 사용하기
sidebar_label: 금고 생성 및 관리
---

# Kaia에서 Safe Wallet 사용하기

:::caution 일몰 공고

`safe.kaia.io`는 **2026년 8월 9일**에 서비스가 종료될 예정입니다. 앞으로는 [app.safe.global](https://app.safe.global)에서 Kaia Network용 Safe Wallet을 사용하여 계정을 관리해 주시기 바랍니다. 기존의 ‘Safe Accounts’는 ‘Safe Wallet’과 자동으로 호환됩니다.

:::

## 금고 만들기

다음은 Safe Wallet을 사용하여 Kaia에서 Safe 스마트 계정을 생성하는 방법입니다.

**1단계:** 브라우저에서 [Safe Wallet](https://app.safe.global/welcome)을 엽니다.

![](/img/build/wallets/ks-welcome-page-sw.png)

**2단계:** 지갑을 연결하세요. Safe Wallet은 [Kaia Wallet](https://docs.kaiawallet.io/) 및 [MetaMask](../../tutorials/connecting-metamask.mdx)와 같은 지갑을 지원합니다. 지갑과 Safe Wallet에서 **Kaia 메인넷** 또는 **Kairos 테스트넷**이 선택되어 있는지 확인하십시오.

![](/img/build/wallets/ks-connect-wallet-sw.png)

**3단계:** **계정 만들기**(또는 이에 상응하는 항목)를 클릭하고 Safe에 이름을 지정하세요.

![](/img/build/wallets/ks-add-safe-name.png)

**4단계:** 거래를 제출하고 승인할 수 있는 주소를 입력하여 소유자/서명자를 추가합니다. 필요한 만큼 소유자를 추가할 수 있으며, 나중에 변경할 수도 있습니다.

**5단계:** 거래에 필요한 소유자 확인 횟수를 선택합니다. 임계값은 1보다 큰 값을 사용하는 것이 좋습니다. 일반적으로 소유주의 약 51%가 참여하는 방식입니다(예를 들어 3명 중 2명, 또는 5명 중 3명).

![](/img/build/wallets/ks-add-signers-sw.png)

**6단계:** 매개변수를 확인한 후 Safe를 배포하고 화면에 표시되는 안내에 따라 진행하십시오.

![](/img/build/wallets/ks-review-create-safe-sw.png)

**7단계:** 배포가 완료되면 Safe를 실행하고 계정 UI를 엽니다.

![](/img/build/wallets/ks-start-using-wallet-sw.png)

![](/img/build/wallets/ks-safe-ui-sw.png)

Safe 계정이 준비되었습니다.

## 자산 추가

계정 대시보드에 표시된 세이프 주소로 KAIA, 대체 가능한 토큰 또는 NFT를 전송하여 세이프에 자금을 입금할 수 있습니다.

### KAIA 예치금

1. 계정 대시보드에서 Safe 주소를 복사하세요.
2. 지갑(예: MetaMask, 하드웨어 지갑 또는 자금이 입금된 다른 계정)에서 해당 주소로 KAIA를 전송하세요.
3. 이체가 확인되면, 해당 잔액이 Safe Wallet의 **자산** 항목 아래에 표시됩니다.

Kaia 계정으로 자금을 이체할 수 있는 모든 주소에서 Safe에 자금을 입금할 수 있습니다. MetaMask의 네트워크 설정 방법은 [MetaMask를 Kaia에 연결하기](../../tutorials/connecting-metamask.mdx)를 참조하세요.

### 대체 가능한 토큰 예치

1. Safe 주소를 복사하세요.
2. 지갑의 토큰 목록에서 해당 토큰을 선택한 후, Safe 주소로 전송하세요.
3. Safe Wallet의 **자산** 항목에서 이체를 확인하고 잔액을 확인해 주세요.

### NFT 예치

Kaia(메인넷 또는 Kairos)를 지원하는 마켓플레이스나 지갑에서 NFT를 Safe 주소로 전송하세요. 예를 들어, [OpenSea](https://opensea.io/)에서 NFT를 열고, ‘이체’ 기능을 선택한 다음 Safe 주소를 붙여넣으세요. 확인 절차가 완료되면 해당 NFT는 Safe Wallet의 **자산** > NFT 항목 아래에 표시됩니다. 제품별 구체적인 절차는 OpenSea의 [이전 가이드](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea)를 참조하세요.

## 자산 보내기

### KAIA 및 토큰 보내기

**1단계:** **새 거래**를 클릭하고 **토큰 보내기**를 선택합니다.

![](/img/build/wallets/ks-new-tx-sw.gif)

**2단계:** 자산을 선택하고, 수취인 주소와 금액을 입력하세요.

![](/img/build/wallets/ks-send-details-sw.gif)

**3단계:** 검토 후 제출. 소유자 지갑으로 서명하세요. 확인 기준치에 도달하면 거래가 실행됩니다.

![](/img/build/wallets/ks-review-send-tx-sw.gif)

### NFT 보내기

1. **새 거래**를 클릭하고 **NFT 보내기**(또는 Safe Wallet의 이에 상응하는 NFT 전송 절차)를 선택하세요.
2. NFT와 수신자를 선택하세요.
3. 검토하고, 필요한 서명을 받아, 서명하십시오.

시간이 지남에 따라 변경되는 UI 관련 세부 정보는 [Safe Wallet 도움말 센터](https://help.safe.global)를 참조하세요.

## 추가 참고 사항

### 거래 수수료

안전한 거래(자산 이체 또는 계약 상호작용)가 이루어질 때, 해당 거래를 **실행**하는 소유자(일반적으로 임계값에 도달한 마지막 서명자)가 네트워크 수수료를 지불합니다.

### 안전한 논스

보안상의 이유로, 안전 거래는 순서대로 실행되어야 합니다. 각 거래에는 **nonce**가 있습니다. nonce 값이 _마지막으로 실행된 트랜잭션의 nonce + &#x31;_&#xC778; 트랜잭션만 실행될 수 있으며, 이보다 큰 nonce 값을 가진 트랜잭션들은 이전 트랜잭션들이 완료되고 충분한 서명이 수집될 때까지 대기열에 남아 있습니다.

### 체인별 주소 접두사

대시보드에서 세이프 주소를 복사할 때, 대상 지갑이 체인 이름 접두사를 지원하지 않는 경우 해당 접두사를 포함하지 마십시오. 전송 오류가 발생하지 않도록 접두사가 없는 주소만 붙여넣으십시오.

## 추가 도움말

- [세이프 월렛 고객센터](https://help.safe.global)
- [안전 문서](https://docs.safe.global)
