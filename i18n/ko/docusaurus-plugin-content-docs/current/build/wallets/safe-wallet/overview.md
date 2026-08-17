---
title: 세이프 월렛 개요
sidebar_label: 세이프 월렛 개요
---

# 세이프 월렛 개요

:::caution 일몰 공고

`safe.kaia.io`는 **2026년 8월 31일**에 서비스가 종료됩니다. 앞으로 계정을 관리하시려면 [app.safe.global](https://app.safe.global)에서 Kaia용 **Safe Wallet**을 이용해 주시기 바랍니다. 이미 Safe를 보유하고 계신 경우, [Safe Global로 이전하기](./migrate-to-safe-global.md)를 참조하십시오.

:::

[Safe Wallet](https://app.safe.global)은 [Safe Smart Accounts](https://docs.safe.global/home/what-is-safe)를 위한 Safe Global의 공식 인터페이스입니다. 세이프 스마트 계좌는 스마트 계약 지갑입니다. 자금을 단일 개인 키로 관리하는 대신, 일정한 승인 임계값에 따라 여러 명의 서명자가 각 거래를 승인해야 합니다. Kaia 메인넷과 Kairos 테스트넷이 모두 이용 가능합니다. 소유자 지갑을 연결하고, 네트워크를 선택한 다음, 세이프를 생성하거나 열어주세요.

## 핵심 개념

| 개념                                                                | 그 의미는                                                                                                                        |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **서명자(소유자)**                                   | 거래를 제안하고 확인할 수 있는 주소들. **설정**에서 언제든지 항목을 추가, 삭제 또는 변경할 수 있습니다.                               |
| **임계값**                                                           | 거래가 실행되기 전에 필요한 서명자 확인 횟수(예: 3명 중 2명). 1보다 높게 유지하세요.      |
| **[모듈](https://docs.safe.global/advanced/smart-account-modules)** | 계정의 기능을 확장해 주는 선택적 계약—복구, 지출 한도, 자동화 등. 모듈은 서명자의 승인 없이 자금을 이체할 수 있으므로, 신뢰할 수 있는 모듈만 활성화하십시오. |
| **[경비원](https://docs.safe.global/advanced/smart-account-guards)** | 실행 전후로 모든 트랜잭션을 확인하여 사용자 정의 규칙을 적용할 수 있게 해주는 선택적 계약입니다.                                                      |
| **안전한 앱**                                                         | 아래 가이드에서 사용되는 ‘Transaction Builder’ 및 ‘CSV Airdrop’과 같이 인터페이스에 내장된 타사 앱.                                     |

해당 계정이 온체인에서 어떻게 작동하는지에 대한 전체적인 내용을 확인하려면 [Safe 스마트 계정은 어떻게 작동하나요?](https://docs.safe.global/advanced/smart-account-overview)를 참고하세요.

## 작업 공간

[Workspace](https://safe.global/blog/introducing-workspace-the-onchain-operating-environment-for-treasury-teams)는 두 개 이상의 Safe를 운영하는 팀을 위한 Safe Global의 환경입니다. 이는 동일한 스마트 계정을 기반으로 하며, 거래가 실행되는 방식이나 키를 누가 보유하는지가 아니라 팀의 협업 방식을 변화시킵니다.

- **통합 대시보드** — 해당 플랫폼 내 모든 계좌의 잔액과 처리 대기 중인 거래 내역을 한 화면에서 한눈에 확인할 수 있습니다.
- **[보안 허브](https://safe.global/blog/workspace-security-hub)** — 각 계정의 서명자, 임계값, 모듈, 가드, 복구 옵션 및 Safe 버전 정보와 더불어, 해당 계정의 온체인 구성에 대한 자동 점검 기능.
- **공유 주소록** — 브라우저별로 저장된 로컬 목록 대신, 팀 전체가 공유하는 하나의 라벨이 지정된 주소 목록입니다.
- **이메일 로그인** — 팀원들은 이메일 일회용 인증코드나 Google 계정으로 로그인하여 키를 소지하지 않아도 잔액을 확인하고, 처리 대기 중인 거래 내역을 조회하며, 연락처를 관리할 수 있습니다. 서명에는 여전히 소유자 지갑이 필요합니다.

이 마지막 사항은 Kaia에서 재무, 규정 준수 및 운영 담당 검토자들이 재무부 ‘Safe’에 대한 접근 권한은 필요하지만, 해당 ‘Safe’의 서명권자는 절대 되어서는 안 되는 경우에 유용합니다.

## Safe Global 문서

Safe Wallet, Safe Smart Account 계약, Safe Core SDK 및 백엔드 서비스는 모두 Safe Global에서 구축하고 유지 관리하며, 관련 문서는 [docs.safe.global](https://docs.safe.global)에서 확인할 수 있습니다.

Kaia 문서에는 Kaia에 특화된 내용, 즉 지원되는 네트워크, 체인 ID, 그리고 일반적인 작업에 대한 단계별 안내가 포함되어 있습니다. Safe 자체의 작동 방식(계약 버전, 모듈 및 가드 동작, API 스키마, SDK 참조 등)에 대해서는 Safe 팀이 지속적으로 최신 상태로 관리하고 있는 Safe Global의 문서를 참조하시기 바랍니다.

### 어디를 살펴봐야 할까요?

| … 를 원하신다면                                                    | 이동하기                                                                                                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 세이프 스마트 계좌가 무엇인지 알아보기                                        | [안전이란 무엇인가?](https://docs.safe.global/home/what-is-safe)                                                                             |
| 계정 아키텍처, 모듈 및 가드 이해하기                                        | [세이프 스마트 계좌는 어떻게 작동하나요?](https://docs.safe.global/advanced/smart-account-overview)                                                   |
| 계약 함수, 이벤트 및 버전을 조회하세요                                       | [스마트 계정 안내](https://docs.safe.global/reference-smart-account/overview)                                                               |
| Safe SDK를 활용한 개발 (스타터, 프로토콜, API, 릴레이 키트) | [SDK 개요](https://docs.safe.global/sdk/overview)                                                                                      |
| HTTP를 통한 쿼리 세이프, 트랜잭션 및 서명                                   | [안전한 인프라](https://docs.safe.global/core-api/api-overview) · [거래 서비스](https://docs.safe.global/core-api/transaction-service-overview) |
| Safe 서비스가 지원하는 체인을 확인하세요                                     | [지원되는 네트워크](https://docs.safe.global/advanced/smart-account-supported-networks)                                                      |
| Safe Wallet 앱 사용에 대한 도움말 보기                                  | [안전 도움말 센터](https://help.safe.global)                                                                                                |
| ‘안전’ 관련 용어 명확히 하기                                            | [용어집](https://docs.safe.global/home/glossary)                                                                                        |

이곳의 페이지가 Safe Global의 문서와 비교해 최신 정보가 아닌 경우, Safe Global의 내용을 참고하여 [이슈를 등록해 주세요](https://github.com/kaiachain/kaia-docs/issues) . 그러면 Kaia 페이지를 업데이트할 수 있습니다.

## 카이아 네트워크

| 네트워크      | 체인 ID |
| --------- | ----- |
| 카이아 메인넷   | 8217  |
| 카이로스 테스트넷 | 1001  |

계정을 생성하거나 열기 전에 Safe Wallet의 체인 선택기에서 네트워크를 선택하세요. 메인넷이 선택된 상태에서는 Kairos에 배포된 Safe가 표시되지 않습니다. [API 키트](./safe-wallet-api-kit.md)나 기타 Safe SDK 도구를 사용할 때는, 체인 ID를 일치시켜 전달하고, 엔드포인트를 직접 하드코딩하지 말고 [Safe Global의 지원 네트워크](https://docs.safe.global/advanced/smart-account-supported-networks)에서 트랜잭션 서비스 엔드포인트를 참조하십시오.

## 카이아 전용 가이드

- [Safe Global로 이전하기](./migrate-to-safe-global.md) — 기존 Safe를 Safe Wallet으로 옮기기
- [세이프 생성 및 관리](./use-safe-wallet.md) — Kaia에서 세이프를 생성하고, 자산을 추가하며, 거래를 전송하세요
- [컨트랙트 상호작용](./contract-interaction.md) — Kaia의 Safe에서 컨트랙트를 호출하기
- [트랜잭션 빌더](./tx-builder.md) 및 [CSV 에어드롭](./csv-airdrop.md) — Kaia에서의 일괄 처리
- [API 키트](./safe-wallet-api-kit.md) — Kaia 체인 ID를 활용한 안전한 거래 서비스
- [자주 묻는 질문](./faqs.md)
