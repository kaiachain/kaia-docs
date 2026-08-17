---
title: Kaia에서 Safe Wallet 사용하기
sidebar_label: 금고 생성 및 관리
---

# Kaia에서 Safe Wallet 사용하기

:::caution 일몰 공고

`safe.kaia.io`는 **2026년 8월 31일**에 서비스가 종료됩니다. 앞으로는 [app.safe.global](https://app.safe.global)에서 Kaia Network용 Safe Wallet을 사용하여 계정을 관리해 주시기 바랍니다. 기존의 ‘Safe Accounts’는 ‘Safe Wallet’과 자동으로 호환됩니다.

:::

## 금고 만들기

다음은 Safe Wallet을 사용하여 Kaia에서 Safe 스마트 계정을 생성하는 방법입니다.

**1단계:** 브라우저에서 [Safe Wallet](https://app.safe.global/welcome)을 엽니다. 랜딩 페이지에는 두 개의 탭이 있습니다. 여러 계정을 함께 관리하는 팀을 위한 **작업 공간**과, 연결된 지갑으로 로그인한 세이프를 확인할 수 있는 **내 계정**입니다. 단일 금고를 생성하려면 **내 계정** 화면에 머무르세요.

:::tip

여러 개의 ‘Safe’와 검토 담당자 팀을 갖춘 재무 부서를 관리하고 계신가요? [Workspace](./overview.md#workspace)는 정보 접근 권한은 필요하지만 서명 키를 보유해서는 안 되는 구성원을 위해 공유 대시보드, 공유 주소록 및 이메일 로그인 기능을 제공합니다. 먼저 세이프를 생성한 다음, 나중에 이를 작업 공간으로 정리할 수 있습니다.

:::

![‘내 계정’ 탭이 선택된 Safe Wallet 환영 페이지. ‘지갑 연결’ 및 ‘모든 계정 보기’가 표시됨](/img/build/wallets/sg-welcome-page.png)

**2단계:** **지갑 연결**을 클릭하고 [MetaMask](../../tutorials/connecting-metamask.mdx)를 선택하세요. 이 대화 상자에는 감지된 지갑만 표시되므로, 원하는 지갑이 보이지 않는다면 먼저 확장 프로그램을 설치하세요. [Kaia Wallet](https://docs.kaiawallet.io/)은 확장 프로그램을 설치하면 여기에 나타납니다. 지갑과 Safe Wallet에서 **Kaia 메인넷** 또는 **Kairos 테스트넷**이 선택되어 있는지 확인하십시오.

![사용 가능한 지갑 중에서 MetaMask가 강조 표시된 ‘지갑 연결’ 대화상자](/img/build/wallets/sg-connect-wallet.png)

**3단계:** **계정 생성**을 클릭하고, 세이프의 이름을 지정한 다음, 배포할 네트워크를 선택하세요. 메인넷의 경우 **Kaia**를, 테스트넷의 경우 **Kairos**를 선택하세요. 나중에 네트워크를 더 추가할 수 있습니다. **다음**을 클릭하세요.

![‘네트워크 선택’에서 안전한 이름을 입력하고 ‘Kairos’를 선택한 후 기본 설정 단계를 진행하세요](/img/build/wallets/sg-add-safe-name.png)

**4단계:** **서명자 및 확인** 섹션에서 거래를 제안하고 승인할 수 있는 주소를 추가합니다. 연결된 지갑은 **Signer 1**입니다. 서명자를 추가하려면 **새 서명자 추가**를 클릭하세요. 이름은 사용자가 참고할 목적으로 저장하는 선택적 라벨입니다. 서명자는 나중에 변경할 수 있습니다.

**5단계:** **임계값**을 설정합니다. 즉, 거래가 실행되기 전에 몇 명의 서명자가 확인해야 하는지 지정합니다. 1보다 큰 값을 선호합니다. 일반적으로 서명자의 약 51%가 서명하는 것이 관례입니다(예를 들어, 3명 중 2명 또는 5명 중 3명). **다음**을 클릭하세요.

![서명자 및 확인 단계: 서명자 3명이 추가되고 3명 중 2명의 동의가 필요한 경우](/img/build/wallets/sg-add-signers.png)

**6단계:** 네트워크, 이름, 서명자 및 임계값을 확인합니다. 세이프 배포는 온체인 거래이므로 KAIA로 지불하는 일회성 활성화 수수료가 발생합니다. 연결된 지갑에 충분한 KAIA가 있는지 확인하세요. **계정 만들기**를 클릭한 다음, 지갑에서 거래를 확인하세요.

![네트워크, 이름, 서명자 3명, 3명 중 2명의 동의 기준, KAIA로 표시된 예상 활성화 수수료가 표시된 검토 단계](/img/build/wallets/sg-review-create-safe.png)

**7단계:** 거래가 확정되면 금고가 활성화됩니다. 대화 상자에 주소가 표시됩니다. 이 주소는 자금을 수령하기 위해 공유하는 주소이며, 서명자 지갑 주소와는 다릅니다. \*\*'시작하기'\*\*를 클릭하여 계정을 개설하세요.

![Kairos에서 새로운 ‘Safe’ 이름과 주소가 표시된 ‘계정 설정이 완료되었습니다’ 대화상자](/img/build/wallets/sg-start-using-wallet.png)

계정은 **개요** 화면에서 열리며, 사이드바에는 **자산**, **거래 내역**, **주소록**, **앱** 및 **설정**이 표시됩니다. 지갑은 비어 있는 상태로 시작됩니다. **주소 복사** 기능을 사용하여 다른 지갑에서 자금을 이체하세요.

![잔액이 0인 안전한 계정 개요, ‘자금 입금’ 안내 메시지, 사이드바 탐색 메뉴](/img/build/wallets/sg-safe-ui.png)

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

1. Safe 주소를 복사하세요.
2. NFT가 저장된 지갑에서 해당 지갑을 열고 ‘이체’를 선택하세요.
3. Safe 주소를 붙여넣고, 확인한 후 Safe Wallet의 **자산** → **NFT**에서 해당 주소를 검증하세요.

메인넷에서는 [OKX NFT 마켓플레이스](https://web3.okx.com/nft)와 같이 Kaia를 지원하는 마켓플레이스에서도 자산을 이체할 수 있습니다. Kairos에서는 위의 지갑 이체 기능을 이용하세요.

## 자산 보내기

### KAIA 및 토큰 보내기

**1단계:** **새 거래**를 클릭하고 **토큰 보내기**를 선택합니다.

<video autoPlay loop muted playsInline controls aria-label="Opening New transaction and choosing Send tokens" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-new-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-new-tx.mp4" type="video/mp4" /> </video>

**2단계:** 수취인 주소를 입력한 다음, 토큰과 금액을 선택하세요. **MAX**를 선택하면 잔액 전액이 자동으로 입력됩니다. 한 건의 거래에 최대 5명의 수취인을 추가할 수 있습니다. **다음**을 클릭하세요.

<video autoPlay loop muted playsInline controls aria-label="Send tokens form with the recipient address, token selector, and amount fields" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-send-details.webm" type="video/webm" /> <source src="/img/build/wallets/sg-send-details.mp4" type="video/mp4" /> </video>

**3단계:** 세부 사항을 확인하고 **서명**을 클릭한 다음, 지갑에서 확인하세요. 서명만으로는 트랜잭션이 전송되지 않습니다. 트랜잭션은 **트랜잭션** 항목의 대기열에 남아 있다가, 임계값이 충족되면 서명자 중 누구라도 이를 실행할 수 있습니다.

<video autoPlay loop muted playsInline controls aria-label="Reviewing and signing a send transaction, which then waits in the queue for the remaining confirmations" style={{maxWidth: '100%', borderRadius: '8px'}}> <source src="/img/build/wallets/sg-review-send-tx.webm" type="video/webm" /> <source src="/img/build/wallets/sg-review-send-tx.mp4" type="video/mp4" /> </video>

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
