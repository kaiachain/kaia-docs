---
sidebar_label: Goldsky
---

# Goldsky

![](/img/banners/kaia-goldsky.png)

## 소개

[Goldsky](https://goldsky.com)는 온체인 데이터의 추출, 변환, 로딩(ETL)을 간소화하도록 설계된 고성능 데이터 인덱서입니다. 이를 통해 개발자는 실시간 분석 및 블록체인 통합 애플리케이션을 더 빠르게 빌드하고 출시할 수 있습니다.

Goldsky는 두 가지 핵심 제품을 제공합니다:

- [서브그래프](https://docs.goldsky.com/subgraphs/introduction): GraphQL API, 웹후크 지원 등을 갖춘 유연한 TypeScript 기반 인덱싱.
- [미러](https://docs.goldsky.com/mirror/introduction): 단일 YAML 구성으로 실시간 블록체인 데이터를 데이터베이스 또는 메시지 대기열로 직접 스트리밍합니다.

카이아 메인넷과 테스트넷은 모두 골드스키에서 지원합니다.

**학습 내용**

이 가이드가 끝날 때쯤이면 여러분도 그렇게 될 것입니다:

- 골드스키의 로우코드 서브그래프(인스턴트 서브그래프)가 어떻게 작동하는지 이해하기
- Goldsky CLI를 사용하여 하위 그래프 구성 및 배포하기
- 카이아 메인넷의 USDT 컨트랙트에서 전송 이벤트를 인덱싱합니다.
- GraphQL을 통해 하위 그래프 엔드포인트에 액세스하고 테스트하기

## 전제 조건

시작하기 전에 다음 사항이 준비되어 있는지 확인하세요:

**1. Goldsky CLI**
\- 운영 체제에 맞는 [설치 지침](https://docs.goldsky.com/subgraphs/deploying-subgraphs#install-goldskys-cli-and-log-in)을 따릅니다.
\- Windows 사용자: CLI를 설치하기 전에 [Node.js](https://nodejs.org)와 npm이 설치되어 있는지 확인합니다.

**2. 골드스카이 계정 만들기**
\- 아직 계정이 없는 경우 [골드스카이닷컴](https://goldsky.com)에서 가입하세요.

**3. API 키 생성**
\- 골드스카이 대시보드에서 **프로젝트 설정**으로 이동합니다.
\- API 키를 생성하고 복사합니다.

**4. CLI 인증**````bash
    goldsky 로그인
    ```
    - 메시지가 표시되면 API 키를 붙여넣습니다.
    -
```bash
    goldsky
    ```를 실행하여 CLI 인증을 확인합니다.
````

## 시작하기

골드스키는 하위 그래프를 배포하는 세 가지 방법을 지원합니다:

- 소스 코드](https://docs.goldsky.com/subgraphs/deploying-subgraphs#from-source-code)에서 - 로컬 개발 환경에서 사용자 정의된 하위 그래프를 배포합니다.
- 다른 호스트에서 마이그레이션 - [The Graph](https://docs.goldsky.com/subgraphs/migrate-from-the-graph) 또는 [Alchemy](https://docs.goldsky.com/subgraphs/migrate-from-alchemy/guide)와 같은 플랫폼에서 기존 하위 그래프를 이동합니다.
- 인스턴트 서브그래프([로우코드](https://docs.goldsky.com/subgraphs/guides/create-a-low-code-subgraph) / [코드 없음](https://docs.goldsky.com/subgraphs/guides/create-a-no-code-subgraph)) - 구성 파일(로우코드) 또는 UI(코드 없음)를 사용하여 기존 서브그래프 매핑 코드를 작성하지 않고 서브그래프를 배포할 수 있습니다.

이 가이드에서는 로우코드 접근법을 사용해 카이아 메인넷의 USDT 컨트랙트에서 _Transfer_ 이벤트를 인덱싱하는 하위 그래프를 배포해 보겠습니다.

## 설정 및 배포

로우코드 접근 방식을 사용하면 구성 파일을 수동으로 만들 수 있지만, 기존의 서브그래프 매핑 코드를 작성할 필요 없이 Goldsky가 구성에서 생성해 줍니다.

따라서 이 섹션에서는 :

- 카이아에서 USDT의 계약 주소
- 계약의 ABI(애플리케이션 바이너리 인터페이스)
- 시작 블록(컨트랙트가 배포된 블록)

### USDT 컨트랙트 ABI 검색

- 카이아스캔](https://kaiascan.io)을 방문하여 [USDT 계약 주소](https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=txList&page=1)를 확인하세요.

- 계약 탭을 클릭하고 계약 ABI 섹션을 찾습니다.

  > 참고: USDT는 프록시 계약입니다. 구현 계약 ABI를 반드시 검색하세요.

- 계약 ABI를 복사하여 붙여넣고 작업 디렉터리에 [abi.json](https://gist.github.com/ayo-klaytn/cd53e0c560eb374bdbe981d12b8986f1#file-usdt-abi-json)으로 저장합니다.

- 컨트랙트의 배포 블록 번호를 기록합니다.

### 구성 파일 만들기

다음 단계는 인스턴트 서브그래프 구성 파일(예: `usdt-demo-config.json`)을 생성하는 것입니다.

이 파일은 5개의 주요 섹션으로 구성되어 있습니다:

1. 구성 버전 번호
2. 구성 이름
3. ABI
4. 체인
5. 계약 인스턴스

#### 버전 번호

이것은 하위 그래프의 버전 번호가 아니라 Goldsky의 구성 파일 형식의 버전 번호입니다. 최신 버전 번호는 이 [참조](https://docs.goldsky.com/subgraphs/reference/instant-subgraph#version-1)를 참조하세요.

#### 구성 이름

이 구성의 용도를 이해하는 데 도움이 되는 원하는 이름을 지정할 수 있습니다. 내부 디버깅에만 사용됩니다. 이 가이드에서는 _usdt-demo_를 사용합니다.

#### ABI, 체인 및 컨트랙트 인스턴스

이 세 섹션은 서로 연결되어 있습니다.

- ABI의 이름을 지정하고 이전에 저장한 ABI 파일의 경로를 입력합니다(이 구성 파일이 있는 위치를 기준으로). 이 경우 `usdtabi` 및 `abi.json`입니다.

- 앞서 지정한 ABI, 배포된 주소, 체인, 시작 블록을 참조하여 컨트랙트 인스턴스를 작성합니다.

**예시: [usdt-demo-config.json](https://gist.github.com/ayo-klaytn/cd53e0c560eb374bdbe981d12b8986f1#file-usdt-demo-config-json)**

```json
{
  "version": "1",
  "name": "usdt-demo",
  "abis": {
    "usdtabi": {
      "path": "./abi.json"
    }
  },
  "instances": [
    {
      "abi": "usdtabi",
      "address": "0xd077a400968890eacc75cdc901f0356c943e4fdb",
      "startBlock": 30801565,
      "chain": "kaia"
    }
  ]
}
```

이 구성은 서로 다른 ABI를 가진 여러 컨트랙트 인덱싱, 여러 체인에 배포된 동일한 컨트랙트, 서로 다른 네트워크에 고유한 ABI를 가진 여러 컨트랙트 등 다양한 사용 사례를 지원합니다.

### 하위 그래프 배포

구성 파일이 준비되었으면 이제 하위 그래프를 배포할 차례입니다.

다음 명령을 사용하여 하위 그래프를 배포합니다: `goldsky subgraph deploy name/version --from-abi <path-to-config-file>`를 실행한 다음 생성한 구성 파일의 경로를 전달합니다.

예시:

```bash
goldsky subgraph deploy usdt-demo/1.0 --from-abi usdt-demo-config.json
```

![골드스키 로우 코드 배포](/img/build/tools/goldsky-lc-deploy.png)

Goldsky는 필요한 하위 그래프 코드를 자동으로 생성하여 사용자를 대신하여 배포하고 즉시 사용할 수 있는 쿼리 엔드포인트를 제공합니다.

엔드포인트를 열면 스키마를 검사하고 애플리케이션에 통합할 쿼리를 작성할 수 있는 웹 기반 GraphQL 탐색기가 실행됩니다.

### 하위 그래프 쿼리하기

축하합니다! 하위 그래프를 성공적으로 배포했습니다.

쿼리하기 전에 구성 파일에 정의된 startBlock 값에 따라 인덱서가 완전히 동기화될 때까지 기다려야 할 수도 있습니다. Goldsky 대시보드에서 바로 동기화 진행 상황을 모니터링할 수 있습니다.

![골드스키 동기화 인덱서](/img/build/tools/goldsky-synced-indexer.png)

동기화가 완료되면 Goldsky에서 제공하는 공개 엔드포인트를 사용하여 하위 그래프를 쿼리할 수 있습니다:

```
https://api.goldsky.com/api/public/project_cmkv4p7xa8ix401vc3f32g20g/subgraphs/usdt-demo-kaia/1.0/gn
```

:::tip
Goldsky 대시보드에서 연결된 웹 기반 GraphQL 탐색기를 사용하여 스키마를 탐색하고 쿼리를 대화형으로 테스트하세요.
:::

![골드스키 웹 기반 GraphQL 데모](/img/build/tools/goldsky-demo.gif)

#### 쿼리 예시: USDT 송금 가져오기.

이 GraphQL 쿼리는 카이아 메인넷에서 처음 10개의 USDT 전송 이벤트를 내림차순으로 정렬하여 검색합니다:

```js
{
  transfers(first: 10, orderBy: value, orderDirection: desc) {
    from
    id
    to
    value
  }
}
```

샘플 응답:

```json
{
  "data": {
    "transfers": [
      {
        "from": "0x0000000000000000000000000000000000000000",
        "id": "0x3618973a943060e7bd57eb8c49c8770af93241710c891195a311ace77366a26b-4",
        "to": "0x5754284f345afc66a98fbb0a0afe71e0f007b949",
        "value": "100000000000000"
      },
      {
        "from": "0x5754284f345afc66a98fbb0a0afe71e0f007b949",
        "id": "0x249852a124700338df1d93d272d9a88d41d3c6526fefb7bb76dce27d3c6e6617-2",
        "to": "0x77134cbc06cb00b66f4c7e623d5fdbf6777635ec",
        "value": "20000000000000"
      }
      // ...
    ]
  }
}
```

**샘플 코드: 자바스크립트를 통한 쿼리(Axios)**

다음은 Node.js에서 axios를 사용하여 동일한 쿼리를 보내는 방법에 대한 간단한 예제입니다:

```js
const axios = require('axios');

const graphqlQuery = `
  {
    transfers(first: 10, orderBy: value, orderDirection: desc) {
      from
      id
      to
      value
    }
  }
`;

const queryUrl = 'https://api.goldsky.com/api/public/project_cmkv4p7xa8ix401vc3f32g20g/subgraphs/usdt-demo-kaia/1.0/gn';

axios.post(queryUrl, { query: graphqlQuery })
  .then((response) => {
    const data = response.data.data;
    console.log(data);
  })
  .catch((error) => {
    console.error('GraphQL query failed:', error);
 });
```

## 추가 리소스

- [서브그래프 배포](https://docs.goldsky.com/subgraphs/deploying-subgraphs)
- [골드스키로 카이아 인덱싱하기](https://docs.goldsky.com/chains/kaia)
- [골드스키 문서](https://docs.goldsky.com/introduction)
