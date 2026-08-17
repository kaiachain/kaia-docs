---
title: Safe Global로 이전하기
sidebar_label: Safe Global로 이전하기
---

# Safe Global로 이전하기

:::caution 일몰 공고

`safe.kaia.io`는 **2026년 8월 31일**에 서비스가 종료됩니다. 앞으로 계정을 관리하시려면 [app.safe.global](https://app.safe.global)에서 Kaia용 **Safe Wallet**을 이용해 주시기 바랍니다.

:::

## 무엇이 달라졌나요?

카이아는 이전에 Gnosis Safe의 호스팅된 포크 버전인 **Kaia Safe**(`safe.kaia.io`)를 제공한 바 있습니다.

**Kaia 메인넷**과 **Kairos 테스트넷**이 이제 [Safe Global](https://app.safe.global)에서 기본적으로 지원됩니다. Kaia에서 ‘Safe Wallet’을 통해 [app.safe.global](https://app.safe.global)에서 세이프를 생성하고 관리하세요. Kaia에서 호스팅하는 UI는 사용하지 마십시오.

## 이 변경 사항이 제 기존 Safe 계정에 영향을 미치나요?

**아니요.** 귀하의 Safe 계정은 Kaia상의 스마트 계약입니다. Safe Global로 전환하면 **웹 인터페이스**만 변경되며, 온체인에 있는 Safe는 변경되지 않습니다.

**변경 없음**

- 안전한 주소
- 소유자 및 확인 기준치
- 자산 (KAIA, 토큰, NFT)
- 온체인 거래 내역

**업데이트해야 할 사항**

- `safe.kaia.io` 대신 [app.safe.global](https://app.safe.global)을 사용하세요.
- 여전히 `safe.kaia.io`를 가리키는 북마크를 업데이트하세요
- 저장해 둔 이름과 라벨을 계속 사용하려면 만료일 전에 [주소록 내보내기](#export-your-address-book)를 수행하세요.

다음 사실이 확인되었습니다. Kaia Safe를 통해 생성된 기존 세이프는 소유자 지갑을 연결하면 Safe Global에 표시됩니다. **다시 배포**하거나, **새로 생성**하거나, 자금을 새로운 금고로 **이체**할 필요는 **없습니다**.

## Safe Global에서 기존 금고를 여는 방법

1. [app.safe.global](https://app.safe.global)을(를) 열어주세요.
2. 사용자 세이프(Safe)의 **소유자**인 지갑(예: Kaia Wallet 또는 MetaMask)을 연결하세요.
3. 현재 사용 중인 금고가 해당 네트워크(**Kaia** 또는 **Kairos**)와 함께 표시될 것입니다. 그렇지 않은 경우, [app.safe.global/welcome/accounts](https://app.safe.global/welcome/accounts)로 이동하여 **목록 관리**를 클릭하면 연결된 지갑과 연동된 세이프를 확인할 수 있습니다.

## 주소록 내보내기

주소록(주소에 대해 저장한 이름과 레이블)은 온체인(on-chain)이 아닌 `safe.kaia.io` 인터페이스에 로컬로 저장됩니다. 이 항목은 자동으로 이관되지 않는 **유일한** 항목이므로, 계속 보관하고 싶다면 만료일 전에 내보내야 합니다.

1. `safe.kaia.io`에서 **설정 → 데이터 → 데이터 내보내기**로 이동하여 파일을 다운로드하세요.
2. [app.safe.global/welcome/accounts](https://app.safe.global/welcome/accounts)로 이동한 후, **Safe 데이터 가져오기** 섹션에서 해당 파일을 업로드하세요.

이 단계는 선택 사항이며, 온체인 소유권이나 잔액에는 영향을 미치지 않습니다.

## 간단한 답변

- **새 금고를 만들어야 하나요?** 아니요.
- **내 자금이나 소유주가 바뀌나요?** 아니요.
- **`safe.kaia.io`를 계속 사용할 수 있나요?** **2026년 8월 31일**까지만 가능합니다. 지금 바로 [app.safe.global](https://app.safe.global)로 전환하세요.
- **추가 도움말은 어디서 확인할 수 있나요?** [Safe Wallet 도움말 센터](https://help.safe.global) 및 [자주 묻는 질문](./faqs.md).

## 다음 단계

- [Kaia에서 Safe Wallet 사용하기](./use-safe-wallet.md) — Safe 생성, 자산 추가, 거래 전송
- [Safe Wallet 개요](./overview.md) — 네트워크 및 Safe Global 리소스
- [자주 묻는 질문](./faqs.md) — 계정 관리에 관한 기타 질문
