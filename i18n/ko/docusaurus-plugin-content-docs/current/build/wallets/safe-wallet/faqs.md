---
title: 자주 묻는 질문
sidebar_label: 자주 묻는 질문
---

# 자주 묻는 질문

:::caution 일몰 공고

`safe.kaia.io`는 **2026년 8월 9일**에 서비스가 종료될 예정입니다. 앞으로는 [app.safe.global](https://app.safe.global)에서 Kaia Network용 Safe Wallet을 사용하여 계정을 관리해 주시기 바랍니다.

:::

## Safe Global로 이전하면 기존 Safe 계정에 영향을 미치나요? <a id="Does moving to Safe Global affect my existing Safe"></a>

아니요. 'Your Safe'는 온체인 스마트 계정입니다. Safe Global은 동일한 계약에 대한 다른 **UI**입니다. 사용자의 Safe 주소, 소유자, 한도 및 자산은 변경되지 않았습니다. 금고를 다시 생성하거나 자금을 이체할 필요는 없습니다.

자세한 내용은 \*\*[Safe Global로 마이그레이션하기](./migrate-to-safe-global.md)\*\*를 참조하십시오.

## 제 ‘Safe’가 app.safe.global에 자동으로 표시되나요? <a id="Will my Safe appear automatically"></a>

대부분의 경우 그렇습니다. 소유자 지갑을 연결하고, **Kaia** 또는 **Kairos**를 선택한 다음, 기존 세이프를 열면 됩니다. 표시되지 않는 경우, **기존 금고 추가** / \*\* 불러오기\*\*를 사용하여 금고 주소를 붙여넣으세요.

선택 사항인 로컬 데이터(주소록, 별명)의 경우, `safe.kaia.io`에서 한 번만 내보낸 후 Safe Wallet의 **설정 → 데이터**에서 가져와야 할 수 있습니다. 이는 온체인 소유권이나 잔액에는 영향을 미치지 않습니다.

## 금고를 생성한 후에도 새로운 소유자를 추가할 수 있나요? <a id="Can i add new owners after creating a safe"></a>

네. Safe Wallet에서 **설정**을 열어 Safe 소유자를 관리할 수 있습니다. 소유자를 추가, 삭제, 교체하거나 이름을 변경할 수 있습니다. 현재 소유자 자격으로 로그인되어 있어야 하며, 변경 사항에는 일반적인 확인 절차가 필요합니다.

일반적인 절차:

1. **설정** → 소유자/서명자 관리를 엽니다.
2. 새 소유자(이름 + 주소)를 추가하세요.
3. 필요한 경우 서명 정책을 조정하십시오.
4. 검토 후 제출하세요. 다른 소유자들은 일반적인 ‘세이프’ 거래와 마찬가지로 이를 확인합니다.

Safe Wallet이 발전함에 따라 UI 레이블은 약간 달라질 수 있습니다. 최신 스크린샷은 [도움말 센터](https://help.safe.global)에서 확인하시기 바랍니다.

## 필요한 확인 횟수를 변경할 수 있나요? <a id="Can i change the number of required signer confirmation"></a>

네. **설정**에서 필요한 확인 기준을 변경한 다음, _현재_ 정책에 따라 제출하고 소유자의 서명을 받아주세요.

## 기존 금고를 어떻게 추가하나요? <a id="How do i add an existing safe"></a>

소유자 지갑을 연결하거나 세이프 주소를 추가하면 [app.safe.global](https://app.safe.global)에서 기존 세이프를 열 수 있습니다. 사용 사례는 다음과 같습니다:

- 다른 브라우저나 기기에서 동일한 ‘Safe’에 접속하기
- 다른 사람이 나를 소유자로 지정한 금고와 상호작용하기
- 읽기 전용 모드로 금고 보기

Safe Wallet은 **설정**에서 해당 기능이 제공되는 경우, 주소록 및 관련 데이터의 가져오기/내보내기 기능도 지원합니다. 더 이상 지원되지 않는 `safe.kaia.io` UI에 의존하기보다는, Safe Wallet에서 주소나 소유자 연결을 통해 Safe를 추가하는 방식을 권장합니다.

## 일반적인 Safe 설정 요령

단 하나만 옳은 구성은 없습니다. 사용 용도에 따라 달라집니다. 유용한 기본 설정:

**소유자는 몇 명인가요?**  
팀의 경우, 여러 사람이 승인할 수 있도록 소유자를 여러 명으로 설정하세요. 잔액이 많은 사용자들은 중복성을 확보하기 위해 종종 여러 대의 기기나 계정을 함께 사용합니다.

**임계값은 얼마인가요?**  
해킹당한 키 하나만으로는 자금을 이동할 수 없도록, 1보다 큰 임계값을 사용하세요. 소유자의 약 51% 수준(예: 3명 중 2명, 5명 중 3명)을 기준점으로 삼으면 복구 작업에 도움이 됩니다. 나머지 소유자들이 손실된 소유자를 대체할 수 있기 때문입니다.

**어떤 지갑과 호환되나요?**  
Kaia의 Safe Wallet은 [Kaia Wallet](https://docs.kaiawallet.io/) 및 [MetaMask](../../tutorials/connecting-metamask.mdx)와 같은 일반적인 EOA 지갑과 호환됩니다. 현재 지갑 목록을 확인하려면 Safe Wallet의 연결 절차를 참조하세요.

## 추가 도움말

- [세이프 월렛 고객센터](https://help.safe.global)
- [안전 문서](https://docs.safe.global)
