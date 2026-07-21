---
title: CSV 에어드롭 사용
sidebar_label: CSV 에어드랍
---

# CSV 에어드롭 사용

:::caution 일몰 공고

`safe.kaia.io`는 **2026년 8월 9일**에 서비스가 종료될 예정입니다. 앞으로는 [app.safe.global](https://app.safe.global)에서 Kaia Network용 Safe Wallet을 사용하여 계정을 관리해 주시기 바랍니다. 기존의 ‘Safe Accounts’는 ‘Safe Wallet’과 자동으로 호환됩니다.

:::

**CSV 에어드롭**(‘안전한 앱’에 등재된 경우)은 ERC-20, ERC-721, ERC-1155 및 네이티브 토큰에 대한 여러 건의 전송을 하나의 ‘안전한’ 거래로 묶어 처리합니다. 이체 내역이 담긴 CSV 파일을 업로드하거나 붙여넣은 뒤 한 번에 제출하면, 각 이체를 개별적으로 보낼 때보다 서명 횟수가 줄어들고 가스 비용도 절감됩니다.

Safe 앱의 이용 가능 여부는 Kaia/Kairos용 Safe Wallet 앱 카탈로그에 따라 달라집니다. 사용 중인 네트워크에 CSV 에어드롭이 표시되지 않는 경우, [거래 생성기](./tx-builder.md)를 사용하거나 [도움말 센터](https://help.safe.global)를 확인해 주세요.

## 1단계: Safe Wallet에서 금고를 엽니다. <a id="login-kaiasafe"></a>

[app.safe.global](https://app.safe.global)에 로그인한 후, Kaia 또는 Kairos Safe를 선택하세요. 아직 계정이 없다면, [금고 만들기](./use-safe-wallet.md#create-a-safe)와 [자산 추가하기](./use-safe-wallet.md#add-assets)를 따라 진행해 주세요.

## 2단계: CSV 에어드롭 열기 <a id="search-CSV-airdrop"></a>

**앱**으로 이동하여 **CSV**를 검색한 후, 사용 중인 네트워크에서 **CSV Airdrop**을 사용할 수 있다면 해당 앱을 실행하세요.

## 3단계: 전송용 CSV 파일 준비하기 <a id="prepare-CSV-airdrop"></a>

전송 파일은 다음과 같은 열을 포함하는 CSV 형식으로 제출해야 합니다:

- _token_type_: `erc20`, `nft` 또는 `native`. NFT 토큰은 ERC-721 또는 ERC-1155일 수 있습니다.
- _token_address_: 토큰 계약 주소. 자체(KAIA) 이체의 경우 비워 두십시오.
- _수신자_: 수신자 주소.
- _금액_: 이체할 금액. ERC-721 전송 시 이 필드는 비워 둘 수 있습니다.
- _id_: 수집품 ID (ERC-721 또는 ERC-1155). 네이티브 및 ERC-20 전송의 경우 비워둘 수 있습니다.

:::important
구분 기호로 `,`를 사용하십시오. 헤더 행은 반드시 첫 번째 행이어야 하며, 설명된 열 이름이 포함되어야 합니다.
[전송 파일 예시](https://ipfs.io/ipfs/bafybeiesr6b3cm76ofcm2joukgdtuyva3niftmbpbb4sgxsa3qwsenv3lu/sample.csv)
:::

### 네이티브 토큰 전송 <a id="native-token-trnasfers"></a>

네이티브 전송의 경우 _token_addres&#x73;_&#xB97C; 비워 두십시오. 세이프에 충분한 양의 KAIA가 들어 있는지 확인하십시오.

### ERC-20 전송 <a id="erc20-trnasfers"></a>

_token_typ&#x65;_&#xC744; `erc20`으로 설정하고 나머지 필드를 입력하세요. ‘Safe’에 해당 토큰이 충분히 보관되어 있는지 확인하십시오.

### ERC-721 전송 <a id="erc721-transfers"></a>

NFT 전송 시 _token_typ&#x65;_&#xC744; 설정하고, 앱에서 요구하는 대로 수집품 _i&#x64;_&#xB97C; 포함하십시오. ‘The Safe’가 해당 NFT의 소유자인지 확인하십시오.

## 4단계: 검토 및 제출 <a id="review-submit-transaction"></a>

앱에서 디코딩된 전송 내역을 확인한 후 제출하세요. 다른 세이프 거래와 동일한 방식으로 세이프 확인 절차를 완료하십시오.
