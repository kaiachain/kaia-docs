---
title: 기존 WKLAY를 KAIA로 전환하기
sidebar_label: 구형 WKLAY의 포장을 풀기
description: Kaiascan을 사용하여 레거시 WKLAY 래퍼 계약에서 KAIA를 회수하고, 표준 WKAIA로 언랩합니다.
---

# 기존 WKLAY를 KAIA로 전환하세요

Kaia 메인넷상의 공식적이고 표준적인 WKAIA(이전 명칭: WKLAY) 계약 주소는 [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432)이며, 이는 카이아 생태계 전반에 걸쳐 확립된 표준입니다. 배경 정보는 [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md)를 참조하십시오.

초기 토큰 래퍼를 사용했던 구형 dapp이나 마켓플레이스를 이용해 본 적이 있다면, **구형 WKLAY 계약**에 여전히 잔액이 남아 있을 수 있습니다. [`0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2)에 잔액이 남아 있을 수 있습니다. 해당 계약을 대신 풀어주는 DApp 프론트엔드는 없으므로, 블록 익스플로러를 통해 직접 호출해야 합니다.

이 가이드에서는 [Kaiascan](https://kaiascan.io)에서 해당 작업을 수행하는 방법을 단계별로 안내합니다.

:::info 어떤 계약을 체결하셨나요?

이 두 계약은 서로 관련이 없는 배치 사업입니다. 시작하기 전에 지갑이나 잔액을 받은 거래 내역에서 토큰 계약 주소를 확인하세요. 아래 단계는 기존 계약에서만 자금을 복구할 수 있습니다. 정규화된 WKAIA의 래핑을 해제하려면 [정규화된 WKAIA의 래핑 해제](#unwrap-canonical-wkaia)를 참조하십시오.

:::

## 1단계: 기존 계약서 열기

Kaiascan에서 기존 계약서 페이지로 이동하세요:

[`https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2`](https://kaiascan.io/address/0xfd844c2fca5e595004b17615f891620d1cb9bbb2)

![Kaiascan의 구형 WKLAY 계약서 페이지](/img/build/tutorials/unwrap-legacy-wklay/01-legacy-contract-page.png)

## 2단계: 정확한 잔액을 확인하세요

1. **계약** 탭을 선택한 다음 **계약 내용 보기**를 클릭하세요.
2. `balanceOf(address)` 함수를 펼친 다음, 본인의 지갑 주소를 입력하세요.
3. **조회**(또는 **재조회**)를 클릭하여 잔액을 확인하세요.
4. 반환된 값을 표시된 대로 정확히 복사하십시오.

![‘Read Contract’ 탭에서 balanceOf 읽기](/img/build/tutorials/unwrap-legacy-wklay/02-read-contract-balanceof.png)

:::caution 원본 값을 복사하고, 변환하지 마십시오

`balanceOf`는 KAIA가 아닌 가장 작은 단위인 **kei**로 표시된 잔액을 반환합니다. 1 KAIA는<sup>1018</sup> 케이이므로, `100000000000000000`의 잔액은 0.1 KAIA입니다.

3단계에서는 동일한 원시 값을 입력으로 받습니다. 변경 없이 그대로 붙여넣으세요. 소수점 반올림, 자릿수 삭제, KAIA로 변환 등의 작업을 하지 마십시오. 그렇지 않으면 잘못된 금액이 인출되거나 거래가 취소될 수 있습니다.

:::

## 3단계: 토큰 인출하기

1. **계약 작성** 탭으로 전환하십시오.
2. **Web3 연결**을 클릭하고 잔액이 있는 지갑을 연결하세요.
3. `withdraw(wad: uint256)` 함수를 펼치고, 2단계에서 복사한 값을 그대로 붙여넣으세요.
4. 제출한 후, 지갑에서 거래를 확인하세요.

![인출 기능이 표시된 ‘계약 작성’ 탭](/img/build/tutorials/unwrap-legacy-wklay/03-write-contract-withdraw.png)

이 거래의 가스 수수료를 지불하려면 동일한 지갑에 소량의 KAIA가 있어야 합니다.

## 4단계: 확인

거래가 확정되면 지갑 잔액을 확인해 주세요. 언랩된 KAIA는 거래를 보낸 주소로 입금됩니다.

계약에서 KAIA를 토큰 전송이 아닌 내부 전송으로 반환하므로, Kaiascan의 해당 거래 **내부 거래** 탭에서 전송 내역을 확인할 수 있습니다. 다음은 [성공적인 언랩핑 거래의 예시](https://kaiascan.io/tx/0x05117dc2ac21d2373fce1b6afa260ab8f9c1f747f7c9894fa302c67b2c96631d?tabId=internalTx&page=1)입니다.

![Kaiascan에서 언랩 거래 확인하기](/img/build/tutorials/unwrap-legacy-wklay/04-verify-transaction.png)

## 표준 WKAIA의 포장을 풀기

반면, 잔액이 표준 WKAIA 계약 [`0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432`](https://kaiascan.io/address/0x19aac5f612f524b754ca7e7c41cbfa2e981a4432)에 있는 경우, 두 가지 선택지가 있습니다.

**dapp을 사용하세요 (권장).** Kaia 생태계의 스왑 서비스를 이용하면 한 번의 클릭으로 표준 WKAIA를 언랩할 수 있습니다. 예를 들어 [DragonSwap](https://dgswap.io/swap/?outputCurrency=KAIA&inputCurrency=0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432)을 확인해 보세요.

**수동으로 진행하세요.** 위에서 설명한 Kaiascan 절차를 그대로 따르되, 레거시 주소 페이지 대신 정식 계약 주소 페이지를 사용하세요.

## 관련 항목

- [Canonical WKAIA](../smart-contracts/token-development/canonical-wkaia.md) — 표준 래핑된 KAIA 구현체
- [계약 주소](../../references/contract-addresses.md) — 메인넷 및 카이로스에 배포된 시스템 계약 주소
