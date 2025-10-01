# 공유 콘텐츠 폴더 사용 방법

이 폴더에는 Kaia 문서 사이트 내 여러 위치에 표시되는 재사용 가능한 콘텐츠가 포함되어 있습니다. 콘텐츠를 복제하거나 혼란스러운 상호 참조를 사용하는 대신 사용자 탐색 컨텍스트를 유지하는 래퍼 접근 방식을 사용합니다.

## 공유 콘텐츠 사용 시기

공유 콘텐츠는 언제 사용하나요?

- 동일한 콘텐츠가 여러 카테고리(예: 시작하기, 지갑, 요리책)에 표시되어야 하는 이유는 서로 다른 사용자 여정과 관련이 있기 때문입니다.
- 콘텐츠 중복을 피하고 문서 전반에 걸쳐 일관성을 유지하고자 합니다.
- 각 카테고리가 고유한 사이드바 컨텍스트와 URL을 유지하기를 원합니다.

## 공유 콘텐츠를 만드는 방법

### 1. 공유 콘텐츠 파일 만들기

콘텐츠를 설명이 포함된 파일명과 함께 '문서/_공유/'에 배치합니다:

```
docs/_shared/configure-wallet-for-kaia-networks.mdx
```

### 2. 래퍼 파일 만들기

콘텐츠가 표시되어야 하는 각 위치에 대해 래퍼 파일을 만듭니다:

**예시: 시작하기 섹션**

```mdx
// docs/build/get-started/configure-wallet-for-kaia-networks.mdx
---
id: wallet-config-get-started
title: How to configure your wallet for Kaia Networks
hide_title: true
custom_edit_url: https://github.com/kaiachain/kaia-docs/blob/main/docs/_shared/configure-wallet-for-kaia-networks.mdx
---

import SharedContent from '../../_shared/configure-wallet-for-kaia-networks.mdx';

<SharedContent />
```

**예시: 지갑 구성 섹션**

```mdx
// docs/build/wallets/wallet-config/configure-wallet-for-kaia-networks.mdx
---
title: How to configure your wallet for Kaia Networks
hide_title: true
custom_edit_url: https://github.com/kaiachain/kaia-docs/blob/main/docs/_shared/configure-wallet-for-kaia-networks.mdx
---

import SharedContent from '../../../_shared/configure-wallet-for-kaia-networks.mdx';

<SharedContent />
```

### 3. 사이드바 업데이트

각 래퍼는 `sidebars.js`에서 고유 ID로 참조합니다:

```javascript
{
  type: 'category',
  label: 'Get Started',
  items: [
    'build/get-started/wallet-config-get-started', // References wrapper #1
    // ...
  ],
},
{
  type: 'category', 
  label: 'Wallet Configuration',
  items: [
    'build/wallets/wallet-config/configure-wallet-for-kaia-networks', // References wrapper #2
    // ...
  ],
}
```

## 필수 프론트매터 필드

- 제목\`: 페이지 제목(래퍼별로 사용자 지정 가능)
- hide_title: true\`: 중복 제목 렌더링 방지
- 커스텀_편집_URL\`: 이 페이지 편집\*\*을 클릭했을 때 GitHub 편집을 위한 공유 소스 파일을 가리킵니다.
- 아이디\`(선택 사항): 자동 생성된 ID가 적합하지 않은 경우 고유 식별자

## 모범 사례

### 공유 콘텐츠의 링크

문서 루트에서 절대 경로를 사용하여 링크가 끊어지지 않도록 하세요:

```mdx
<!-- Good -->
[API Reference](/references/api/wallet-api)

<!-- Bad -->
[API Reference](./api/wallet-api)
```

### 이미지 및 자산

공유 자산을 `정적/`에 배치하고 절대 경로로 참조합니다:

```mdx
![Wallet Setup](/img/wallet-setup.png)
```

### 상대 가져오기 경로

각 래퍼에서 공유 파일까지의 올바른 상대 경로를 계산합니다:

- docs/build/get-started/\`에서: '../../_shared/filename.mdx'
- 문서/구축/지갑/설정/\`에서: '../../../_공유/파일명.mdx'로 이동합니다.

## 파일 명명 규칙

콘텐츠 용도를 명확하게 나타내는 설명적인 케밥 케이스 파일명을 사용하세요:

- '구성-지갑-용-카이아-네트웍스.mdx'
- `smart-contract-deployment-guide.mdx`
- `거래 수수료 최적화.mdx`

## 혜택

- **단일 소스** - 한 번 편집하면 어디서나 업데이트 가능
- **보존된 탐색 컨텍스트** - 사용자가 의도한 섹션에 머물러 있습니다.
- **일관된 콘텐츠** - 위치 간 버전 변동 없음
- **적절한 편집 링크** - 기여자가 실제 소스 파일을 편집합니다.