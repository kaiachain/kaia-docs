---
title: 세이프 월렛 개요
sidebar_label: 세이프 월렛 개요
---

# 세이프 월렛 개요

:::caution 일몰 공고

`safe.kaia.io`는 **2026년 8월 9일**에 서비스가 종료될 예정입니다. 앞으로 계정을 관리하시려면 [app.safe.global](https://app.safe.global)에서 Kaia용 **Safe Wallet**을 이용해 주시기 바랍니다. 기존의 Safe 계정은 Safe Wallet과 자동으로 호환됩니다.

:::

Safe Wallet은 Kaia상의 [Safe 스마트 계정](https://docs.safe.global/home/what-is-safe)을 위한 [Safe](https://safe.global) (Safe Global) 웹 인터페이스입니다. [app.safe.global](https://app.safe.global)을 통해 소유자, 임계값, 자산 및 거래를 관리할 수 있으며, UI에서 네트워크를 선택하면 Kaia 메인넷과 Kairos를 사용할 수 있습니다.

## 제품 및 설명서

아키텍처, 스마트 계정 동작 및 백엔드 서비스(트랜잭션 서비스, 클라이언트 게이트웨이 및 관련 API)에 대해서는 공식 Safe Global 리소스를 참조하십시오:

- [안전이란 무엇인가?](https://docs.safe.global/home/what-is-safe)
- [세이프 월렛 고객센터](https://help.safe.global)
- [안전 문서](https://docs.safe.global)
- [안전 거래 서비스 개요](https://docs.safe.global/core-api/transaction-service-overview)

## 카이아 네트워크

| 네트워크      | 체인 ID |
| --------- | ----- |
| 카이아 메인넷   | 8217  |
| 카이로스 테스트넷 | 1001  |

[API 키트](./kaia-safe-api-kit.md) 또는 기타 Safe SDK 도구를 사용할 때는 올바른 Kaia 체인 ID를 전달해야 합니다. `safe.kaia.io` 서비스가 단계적으로 중단됨에 따라 서비스 엔드포인트가 변경될 수 있습니다. 지원되는 체인 및 구성에 대해서는 Safe Global Transaction Service 문서를 참고하시기 바랍니다.

## 역사적 참고 사항

카이아는 이전에 카이아가 호스팅하는 세이프 스택(UI 및 인프라)을 운영한 바 있습니다. 해당 스택은 [app.safe.global](https://app.safe.global)의 Safe Wallet으로 대체되어 단계적으로 폐지되고 있습니다. [kaia-safe-infrastructure](https://github.com/kaiachain/kaia-safe-infrastructure)와 같은 기존 저장소 참조 자료는 구형 배포 모델을 설명하고 있으며, 새로운 통합을 위한 주요 경로는 아닙니다.
