---
title: The Graph에서 마이그레이션하기
sidebar_label: The Graph에서 마이그레이션하기
---

# The Graph에서 마이그레이션하기

:::caution 일몰 공고

**The Graph**에서의 Kaia 지원은 **2026년 8월 31일**에 종료됩니다. 해당 날짜가 지나면 카이아 서브그래프의 색인 생성이 중단되고, 해당 쿼리 엔드포인트에서 데이터를 반환하지 않게 됩니다. 사용 중인 DApp이 The Graph의 Kaia 서브그래프에서 데이터를 읽어오는 경우, 서비스 중단을 방지하기 위해 **2026년 8월 31일** 이전에 다른 인덱서로 마이그레이션하시기 바랍니다.

:::

## 무엇이 바뀌고 있는가

현재 The Graph에서는 Kaia 메인넷(8217)과 Kairos 테스트넷(1001)이 지원되고 있으며, Kaia 서브그래프에 대한 인덱싱은 Upgrade Indexer가 담당하고 있습니다. 해당 지원은 **2026년 8월 31일**에 종료됩니다.

| 날짜               | 무슨 일이 일어나는지                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| **2026년 8월 31일** | Kaia 하위 그래프의 색인 생성이 중단됩니다. The Graph 게이트웨이의 쿼리 엔드포인트에서 Kaia 데이터를 더 이상 반환하지 않습니다. |
| 해가 진 뒤           | Kaia는 더 이상 Subgraph Studio에서 배포 가능한 네트워크가 아닙니다. Kaia용 `graph deploy`가 실패합니다.     |

온체인상으로는 아무런 변화도 없습니다. Kaia 메인넷과 Kairos, 사용자의 계약 및 이벤트 내역에는 아무런 영향이 없으며, 호스팅되는 인덱싱 서비스만 중단됩니다. Kaia RPC 엔드포인트를 읽는 모든 인덱서는 동일한 데이터를 재구성할 수 있습니다.

## 여러분도 영향을 받고 계신가요?

다음 중 하나라도 해당된다면 귀하도 영향을 받게 됩니다:

- 앱은 Kaia 서브그래프를 가리키는 `gateway.thegraph.com` 또는 `gateway-arbitrum.network.thegraph.com`의 URL을 조회합니다.
- 사용자의 앱은 Subgraph Studio(`api.studio.thegraph.com/query/...`)에서 Kaia 서브그래프 엔드포인트에 쿼리를 보냅니다.
- `graph deploy --studio` 명령어를 사용하여 Kaia 서브그래프를 배포하거나, The Graph의 분산형 네트워크에 게시할 수 있습니다.
- 스택 내의 종속성, 대시보드 또는 분석 작업이 해당 엔드포인트 중 하나에서 데이터를 읽어옵니다.

코드베이스를 빠르게 확인하는 방법:

```bash
grep -rn "thegraph.com" --include="*.ts" --include="*.js" --include="*.json" --include="*.env*" .
```

Goldsky, SubQuery, 자체 호스팅 그래프 노드를 통해 Kaia를 색인화하거나 Kaia RPC 엔드포인트를 직접 읽는 경우에는 **영향을 받지 않습니다**.

## 대안을 선택하세요

아래의 세 가지 옵션 모두 오늘부터 Kaia 메인넷과 Kairos를 지수로 편입합니다.

|                          | [Goldsky](./goldsky.md)                             | [SubQuery](./subquery.md) | 자체 호스팅 그래프 노드          |
| ------------------------ | --------------------------------------------------- | ------------------------- | ---------------------- |
| **기존 하위 그래프 실행**         | 네 — 동일한 부분그래프 사양입니다.                | 네 — IPFS 배포 ID를 통해        | 네 — _그건_ 그래프 노드입니다     |
| **이주 노력**                | CLI 명령어 하나                                          | 기존 빌드 게시하기                | 자체 인프라 구축              |
| **호스팅**                  | 관리형                                                 | 중앙 집중형 또는 분산형 네트워크        | 사용자가 직접 조작합니다          |
| **또한 다음과 같은 서비스를 제공합니다** | Mirror (데이터베이스 스트리밍), RPC, 파이프라인 | 단일 프로젝트 내의 멀티체인 인덱싱       | 완전한 제어                 |
| **다음에 가장 적합합니다**         | 가장 빠른 드롭인 교체                                        | 다중 체인 프로젝트, 탈중앙화 호스팅      | 공급업체에 대한 의존성을 원치 않는 팀들 |

**가장 간편한 방법을 원하신다면 Goldsky를 사용하세요.** Goldsky는 The Graph의 서브그래프 사양과 완벽하게 호환되므로, 기존 Kaia 서브그래프를 매핑, 스키마, 쿼리를 변경하지 않고 그대로 이전할 수 있습니다. 앱 내의 엔드포인트 URL만 변경되면 됩니다.

## 옵션 1: Goldsky로 이전하기

### 1. 서브그래프의 IPFS 해시값 확인하기

종료일 전에 The Graph에서 기존 서브그래프 엔드포인트를 조회하세요:

```graphql
query {
  _meta {
    deployment
  }
}
```

`deployment` 값은 귀하의 IPFS 해시입니다. 또한 [Graph Explorer](https://thegraph.com/explorer)나 Subgraph Studio에서 서브그래프 페이지의 **배포 ID**를 복사할 수도 있습니다.

:::tip 8월 31일 이전에 이 작업을 완료해 주세요

현재 소유하고 있는 모든 Kaia 서브그래프에 대한 IPFS 해시를 조회하여 저장하세요. 엔드포인트가 아직 응답하는 동안 데이터를 수집하는 것이 훨씬 더 쉽습니다.

:::

### 2. Goldsky CLI 설치 및 인증

```bash
# macOS / Linux
curl https://goldsky.com | sh

# Windows
npm install -g @goldskycom/cli
```

[app.goldsky.com](https://app.goldsky.com)의 **프로젝트 설정**에서 API 키를 생성한 다음, 다음 단계를 따르세요:

```bash
goldsky login
```

CI 또는 헤드리스 환경의 경우:

```bash
goldsky login --token <API_KEY>
```

### 3. 서브그래프를 재배치합니다

```bash
goldsky subgraph deploy <your-subgraph-name>/<version> --from-ipfs-hash <your-subgraph-ipfs-hash>
```

Goldsky는 동일한 서브그래프 구축 방식을 적용하고, 사용자가 설정한 시작 블록부터 Kaia에 대한 인덱싱을 시작합니다.

대신 소스 저장소에서 배포하고 싶다면, 프로젝트 디렉터리에서 `goldsky subgraph deploy <name>/<version>` 명령을 실행하세요. 자세한 내용은 [서브그래프 배포](https://docs.goldsky.com/subgraphs/deploying-subgraphs)를 참조하세요.

### 4. 동기화가 완료될 때까지 기다린 후 엔드포인트를 전환하세요.

다음 방법을 통해 진행 상황을 확인하세요:

```bash
goldsky subgraph list
```

서브그래프가 체인 헤드에 도달하면, 앱 내의 게이트웨이 URL을 Goldsky 쿼리 엔드포인트로 교체하십시오:

```diff
- const queryUrl = 'https://gateway.thegraph.com/api/<api-key>/subgraphs/id/<subgraph-id>';
+ const queryUrl = 'https://api.goldsky.com/api/public/<project-id>/subgraphs/<name>/<version>/gn';
```

GraphQL 쿼리는 변경되지 않습니다. Goldsky에서 Kaia 서브그래프를 처음부터 구축하는 방법에 대한 자세한 안내는 [Goldsky](./goldsky.md)를 참조하십시오.

## 옵션 2: SubQuery로 마이그레이션

SubQuery는 기존 서브그래프 빌드를 실행할 수 있을 뿐만 아니라, 멀티체인 프로젝트를 위한 자체 SDK도 지원합니다.

1. Graph Explorer에서 **배포 ID**(IPFS CID)를 확인하거나, SubQuery의 IPFS 게이트웨이를 사용하여 로컬에서 직접 생성하세요:

   ```bash
   graph build -i https://unauthipfs.subquery.network/ipfs/api/v0
   ```

2. [SubQuery Explorer](https://explorer.subquery.network)를 열고 **새 프로젝트 게시**를 선택합니다.

3. CID와 프로젝트 메타데이터를 입력한 다음 게시하세요.

SubQuery Network는 GraphQL 구독 기능을 지원하지 않는다는 점에 유의하시기 바랍니다. [Subgraph 프로젝트를 SubQuery 네트워크에 게시하기](https://subquery.network/doc/subquery_network/architects/publish-subgraph.html) 및 [Kaia 빠른 시작 가이드](https://subquery.network/doc/indexer/quickstart/quickstart_chains/kaia.html)를 참조하거나, Kaia 전용 시작 가이드를 보려면 [SubQuery](./subquery.md) 페이지를 확인하세요.

## 옵션 3: 그래프 노드 자체 호스팅

사용자의 부분 그래프는 이식 가능합니다. Kaia 아카이브 RPC 엔드포인트를 대상으로 [graph-node](https://github.com/graphprotocol/graph-node)를 직접 실행하고, 매핑, 스키마 및 쿼리를 현재 상태 그대로 유지할 수 있습니다.

Kaia RPC 엔드포인트([공개 엔드포인트](../../../references/public-en.md)를 참조하거나 [자체 노드](../../../nodes/endpoint-node/endpoint-node.md)를 실행)와 PostgreSQL, IPFS가 필요합니다. 이를 통해 인프라를 직접 운영해야 하는 대가를 치르긴 하지만, 완전한 통제권을 확보할 수 있으며 공급업체에 대한 의존성을 없앨 수 있습니다.

## 전환 체크리스트

- [ ] 팀에서 관리하는 모든 Kaia 하위 그래프를 나열해 주세요. 여기에는 내부 대시보드와 분석 작업도 포함됩니다.
- [ ] **2026년 8월 31일 이전**에 각 항목의 IPFS 해시/배포 ID를 저장해 두십시오.
- [ ] 각 부분 그래프에 대한 시작 블록과 접합 구성을 저장합니다.
- [ ] 각 서브그래프를 선택한 제공업체에 배포하십시오.
- [ ] 각 서브그래프가 체인 헤드와 동기화될 때까지 기다립니다.
- [ ] 알려진 쿼리 몇 가지를 두 엔드포인트 모두에 대해 비교해 보고, 결과가 일치하는지 확인하십시오.
- [ ] 앱, 환경 변수 및 CI 시크릿에 지정된 엔드포인트 URL과 API 키를 업데이트하십시오.
- [ ] 서브그래프 엔드포인트를 사용하는 모든 타사 연동 서비스나 파트너를 업데이트하십시오.
- [ ] 앱을 배포하고, 프로덕션 트래픽이 새로운 엔드포인트에서 정상적으로 처리되는지 확인하십시오.
- [ ] Kaia에만 사용되는 The Graph 청구 계정 또는 API 키를 취소하십시오.

## 자주 묻는 질문

**이것이 제 스마트 계약이나 온체인 데이터에 영향을 미치나요?**
아니요. 호스팅형 색인 서비스만 중단됩니다. Kaia에 저장된 귀하의 계약, 거래 및 이벤트 로그는 변경되지 않았으며, 모든 인덱서에서 여전히 완벽하게 검색할 수 있습니다.

**서브그래프를 다시 작성해야 하나요?**
아니요. Goldsky, SubQuery, 그리고 자체 호스팅 그래프 노드는 모두 표준 서브그래프 사양을 따릅니다. `schema.graphql`, 매핑 및 GraphQL 쿼리는 그대로 유지됩니다.

**2026년 8월 31일 이후 The Graph에 있는 제 서브그래프는 어떻게 되나요?**
Kaia에 대한 인덱싱이 중단되며, 해당 쿼리 엔드포인트는 더 이상 Kaia 데이터를 반환하지 않게 됩니다. 서비스 중단 시간을 피하려면 해당 날짜 이전에 마이그레이션을 완료하십시오.

**다른 체인에 대한 쿼리는 여전히 작동할까요?**
네. 이는 카이아에게만 영향을 미칩니다. The Graph를 통해 다른 네트워크에서 실행하는 서브그래프는 영향을 받지 않습니다.

**카이아가 특정 업체를 추천하고 있나요?**
아닙니다. Goldsky는 단일 명령어로 마이그레이션이 가능하기 때문에 가장 빠르게 도입할 수 있는 방법이지만, SubQuery와 자체 호스팅 그래프 노드 역시 모두 유효한 선택지입니다. 자신의 스택에 맞는 것을 선택하세요.

**마이그레이션에 도움이 필요합니다.**
[Kaia 개발자 포럼](https://devforum.kaia.io)이나 Kaia 디스코드에서 문의해 주세요. 대규모 또는 복잡한 하위 그래프를 운영 중이라면, Kaia 팀에 미리 연락해 주시면 전환 계획을 수립하는 데 도움을 드릴 수 있습니다.

## 다음 단계

- [Goldsky](./goldsky.md) — Kaia 서브그래프 배포하기, 단계별 안내
- [SubQuery](./subquery.md) — Kaia에서의 멀티체인 인덱싱
- [인덱서 개요](./indexers.md) — Kaia의 모든 인덱싱 옵션
