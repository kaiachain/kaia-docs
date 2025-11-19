# 검색자를 위한 Kaia MEV 경매 SDK 가이드

[Kaia v2.1.0](https://github.com/kaiachain/kaia/releases/tag/v2.1.0)에서는 MEV 경매 시스템을 도입하여 검색자가 공정하고 투명한 경매에 참여하여 MEV 기회를 얻을 수 있도록 했습니다. 이 가이드는 Kaia MEV 경매 SDK를 사용하는 검색자 워크플로우에 대한 포괄적인 안내를 제공합니다.

:::info

이 가이드는 카이로스 테스트넷 엔드포인트와 컨트랙트 주소를 사용합니다. 메인넷 출시는 2025년 12월 중순으로 예정되어 있습니다. 메인넷에 배포할 때는 모든 엔드포인트와 컨트랙트 주소를 적절히 업데이트하세요.

:::

검색기 워크플로는 네 가지 주요 단계로 구성됩니다:

![](/img/build/tutorials/searcher-guide-1.png)

1. **예치**: 검색자는 입찰 활동 자금을 조달하기 위해 '경매예치금고'에 KAIA 토큰을 예치합니다.
2. **입찰**: 검색자는 백런 슬롯에 대해 경매인에게 봉인된 입찰을 제출하여 경쟁합니다.
3. **낙찰 입찰 제출**을 클릭합니다: 경매인이 낙찰자를 선정하고 낙찰 입찰을 합의 노드(CN)에 전달합니다.
4. **입찰 거래 실행**: CN은 '경매 진입점' 컨트랙트를 통해 낙찰된 입찰 거래를 실행합니다.

자세한 기술적 배경은 [KIP-249](https://kips.kaia.io/KIPs/kip-249)를 참조하세요.

## 전제 조건

시작하기 전에 다음 사항을 확인하세요:

- 예치금을 위한 KAIA 토큰이 있는 자금 지갑
- [이동](https://golang.org/)을 설치(버전 1.25 이상)하여 SDK 예제를 확인합니다.
- Kaia 네트워크 엔드포인트에 액세스(이 가이드에서는 카이로스 테스트넷 사용)
- (선택 사항) [파운드리](https://getfoundry.sh/) 설치(`cast` 명령용)

**네트워크 엔드포인트:**

- 카이로스(테스트넷): `https://public-en-kairos.node.kaia.io`
- 메인넷: `https://public-en.node.kaia.io`

**계약 주소(카이로스):**

- AuctionFeeVault: `0xE4e7d880786c53b6EA6cfA848Eb3a05eE97b2aCC`
- AuctionDepositVault: `0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc`
- AuctionEntryPoint: `0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480`

메인넷 컨트랙트 주소(메인넷 출시 후 사용 가능)는 [컨트랙트 주소](../../references/contract-addresses.md)를 확인하세요.

:::tip[Monitor MEV 기회]

검색자는 수익성 있는 거래를 식별할 수 있습니다:

- **경매인의 보류 중인 트랜잭션 API 구독하기**: 이 API는 컨센서스 노드에서 직접 트랜잭션을 스트리밍하여 실시간으로 MEV 기회를 감지할 수 있습니다. 아래의 [보류 중인 거래 구독](#step-3-subscribe-to-pending-transactions) 섹션을 참조하세요.
- **네트워크 멤풀을 독립적으로 모니터링**: 대기 중인 tx를 구독하여 자체 MEV 기회 감지 로직을 구현하세요.

:::

## 1단계: 자금 입금

![](/img/build/tutorials/searcher-guide-2.png)

'경매예치금'은 입찰 잔액을 보관합니다. 보증금은 입찰 금액과 입찰 실행을 위한 예상 가스 요금에 모두 포함되어야 합니다.

### 보증금 요건 이해

보증금 잔액이 있어야 합니다:

- **입찰 금액**: 경매 낙찰을 위해 지불할 의향이 있는 KAIA입니다.
- **예상 가스 요금**: 입찰 실행 중 소비된 가스(실행 후 차감되어 블록 제안자에게 전송됨)

:::warning[Always 충분한 예금 잔액 유지]

잔액이 입찰 금액에 예상 가스 수수료를 더한 금액을 충당하기에 부족한 경우, 유효성 검사 중에 경매인이 입찰을 거부합니다.

:::

### 입금 방법

계약서에는 두 가지 입금 방법이 제공됩니다:

**방법 1: `deposit()`**

발신자의 잔액을 사용하여 입금합니다. 입금액은 발신자의 계좌로 입금됩니다.

```bash
# Deploy deposit of 200 KAIA
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "deposit()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

**방법 2: `depitFor(주소 검색자)`**

다른 계좌를 대신하여 입금합니다. 단일 소스에서 여러 검색자 주소에 자금을 지원하는 데 유용합니다.

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositFor(address)" <SEARCHER_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0 --value 200000000000000000000
```

### 잔액 확인

현재 입금 잔액을 조회합니다:

```bash
cast call 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "depositBalances(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
```

자세한 입금 예시는 [DEPOSIT.md 가이드](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/DEPOSIT.md)를 참조하세요.

## 2단계: 입찰 제출

![](/img/build/tutorials/searcher-guide-3.png)

수익성 있는 거래를 확인했다면 경매인에게 입찰을 제출하세요. 입찰은 봉인되며(경매가 종료될 때까지 숨겨집니다) 입찰 금액에 따라 경쟁합니다.

### 입찰 구조

입찰은 다음 필드로 구성됩니다([types.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/types.go)에 정의된 대로):

```go
type AuctionBid struct {
    TargetTxRaw  []byte         // Raw transaction bytes of target tx
    TargetTxHash common.Hash    // Transaction to backrun
    BlockNumber  *big.Int       // Target block number
    Sender       common.Address // Your searcher address
    To           common.Address // Contract to call
    Nonce        uint64         // Current nonce from AuctionEntryPoint
    Bid          *big.Int       // Your bid in KAIA
    CallGasLimit uint64         // Gas limit for your backrun logic
    Data         []byte         // Encoded function call
    SearcherSig  []byte         // EIP-712 signature from searcher
}
```

:::info

입찰을 제출하면 경매인은 낙찰된 입찰을 합의 노드로 전달하기 전에 자신의 서명('경매인 서명')을 검증하고 추가합니다. '검색자 서명'(EIP-712 서명)만 제공하면 됩니다.

:::

### 입찰 제출

SDK는 [`example/submitbid.go`](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go)에서 전체 작동 예제를 제공합니다. 이 예제에서 확인할 수 있습니다:

- 경매사와 HTTPS 연결 설정하기
- EN 엔드포인트에서 새로운 블록 감지하기
- 타겟 거래 및 해당 입찰가 생성하기
- 경매인에게 입찰 제출하기

**작업 필요**: 실행하기 전에 코드에서 개인 키를 교체하세요. 소스 코드의 `TODO:` 주석을 확인하세요.

예제를 실행합니다:

```bash
# From repository root
go run example/submitbid.go
```

### 입찰 유효성 검사

경매인, 제안자, 스마트 컨트랙트는 각각 입찰에 대한 특정 유효성 검사를 수행합니다. 주요 유효성 검사 규칙은 다음과 같습니다:

- **블록 번호**: 현재블록번호 + 1 또는 현재블록번호 + 2여야 합니다.
- **입찰 금액**: 0보다 크고 사용 가능한 예금 잔액보다 작아야 합니다.
- **호출 데이터 크기**: 입찰 데이터 크기\`(64KB)를 초과하지 않아야 합니다.
- **콜 가스 한도**: 입찰가 제한\`(10,000,000)을 초과하지 않아야 합니다.
- **논스**: 경매 진입점\`의 현재 논스와 일치해야 합니다. 로 쿼리하세요:
  ```bash
  cast call 0x2fF66A8b9f133ca4774bEAd723b8a92fA1e28480 "nonces(address)(uint256)" <YOUR_ADDRESS> --rpc-url "https://public-en-kairos.node.kaia.io"
  ```
- **서명**: 유효한 EIP-712 서명이어야 합니다(구현 방법은 [submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go) 참조).
- **보증금 범위**: '입찰 금액 + 예상 가스 요금'을 충당할 수 있는 충분한 보증금이 있어야 합니다.
- **고유성**: 동일한 블록에 다른 낙찰이 있을 수 없습니다(동일한 거래를 대상으로 하지 않는 한).
- **경매인 서명**: 유효해야 합니다(제출 후 경매사가 추가).

어떤 주체가 어떤 검사를 수행하는지 보여주는 전체 유효성 검사 매트릭스는 [입찰 검증 가이드](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/bid_validation.md)를 참조하세요.

## 3단계: 보류 중인 거래 구독하기

![](/img/build/tutorials/searcher-guide-4.png)

경매자는 컨센서스 노드에서 직접 보류 중인 트랜잭션을 스트리밍하는 웹소켓 구독 서비스를 제공합니다. 이를 통해 검색자는 MEV 기회를 실시간으로 감지할 수 있습니다.

SDK는 [example/subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go)에서 전체 예제를 제공합니다.

이 예제에서 확인할 수 있습니다:

- 옥션에 웹소켓 연결 설정하기
- 보류 중인 트랜잭션 스트림 구독하기
- 들어오는 트랜잭션을 처리하여 MEV 기회 식별

예제를 실행합니다:

```bash
# From repository root
go run example/subscribe_pendingtx.go
```

구독은 보류 중인 트랜잭션이 감지되면 트랜잭션 해시를 계속 인쇄합니다. 이 예제를 확장하여 자신만의 MEV 감지 로직을 구현할 수 있습니다.

## 4단계: 실행 이해

입찰이 낙찰되면 컨센서스 노드는 '경매 진입점' 컨트랙트를 통해 이를 실행합니다:

![](/img/build/tutorials/searcher-guide-1.png)

### 실행 흐름

실행 프로세스는 세 단계로 구성됩니다:

1. **검증 단계**: 컨트랙트는 블록 번호, 서명, 논스 및 입찰 금액을 검증합니다.
2. **입찰 결제 단계**: 입찰 금액이 보증금에서 차감되어 에코시스템 펀드로 송금됩니다.
3. **실행 단계**: 엔트리포인트 계약에 의해 백런이 실행됩니다(실행 결과와 관계없이 입찰 대금 지불이 이루어짐).

**주요 보안 기능:**

- 검증자가 사용자를 대신하여 입찰을 실행합니다(결제를 회피하기 위해 입찰을 되돌릴 수 없음).
- 논스 증가로 리플레이 공격 방지
- 이중 서명(검색자+경매인) 무단 입찰 교체 또는 조작
- 백런 실행 결과와 관계없이 입찰 대금이 지급됩니다.

자세한 실행 흐름은 [ENTRYPOINT.md 가이드](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/ENTRYPOINT.md)를 참조하세요.

## 5단계: 자금 인출

![](/img/build/tutorials/searcher-guide-5.png)

출금하려면 잠금 기간이 있는 2단계 절차를 거쳐야 합니다:

### 1. 예약 출금

출금을 시작하고 60초의 잠금 기간을 시작합니다:

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "reserveWithdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

### 2. 출금 완료

60초 후에 예약 금액을 이체합니다:

```bash
cast send --private-key <YOUR_PRIVATE_KEY> 0x2A168bCdeB9006eC6E71f44B7686c9a9863C1FBc "withdraw()" --rpc-url "https://public-en-kairos.node.kaia.io" --confirmations 0
```

:::info[Security 참고]

잠금 기간이 있는 2단계 출금 절차:

- 활성 경매 기간 동안 플래시 종료 방지
- 검색자가 입찰가를 준수하도록 보장하여 프로토콜 무결성 유지
- 빠른 자본 조작 공격으로부터 보호

:::

## API 참조

옥션은 검색자를 위해 두 가지 기본 API를 제공합니다:

**1. 입찰 API 제출**

- **엔드포인트**: `POST /api/v1/auction/send`
- **목적**: MEV 기회에 대한 밀봉 입찰 제출

**2. 보류 중인 거래 구독**

- **엔드포인트**: `GET /api/v1/subscriber/pendingtx`
- **목적**: 컨센서스 노드에서 보류 중인 트랜잭션의 실시간 스트림
- **예제**: subscribe_pendingtx.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/subscribe_pendingtx.go)에서 구현 예시를 참조하세요.

**전체 API 문서:**

- OpenAPI(Swagger) 사양은 다음에서 확인할 수 있습니다:
  - **카이로스**: https://auctioneer-kairos.kaia.io/docs
  - **메인넷**: 메인넷 출시 후 사용 가능
- API 사용법: [API 문서](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/api_doc.md)

## 문제 해결

### 일반적인 문제

| 이슈 카테고리        | 증상                                   | 원인                                                                         | 솔루션                                                                                                                                                                                     |
| -------------- | ------------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **잔액 부족**      | 경매사에 의해 입찰이 거부됨                      | 보증금 잔액은 입찰 금액 + 예상 가스 요금에 포함되지 않습니다.                       | 입금잔액()\`으로 잔액을 확인하고 더 많은 KAIA를 입금하세요.                                                                                                                |
| **불일치 없음**     | 입찰이 거부되거나 실행이 실패합니다. | 논스가 `AuctionEntryPoint`의 현재 논스와 일치하지 않습니다.                 | 각 입찰 전에 `nonces()`로 현재 논스를 쿼리합니다. 기억하세요: 논스는 제출이 아닌 실행 시에만 증가합니다.                                                                       |
| **블록 번호 범위**   | 경매사에 의해 입찰이 거부됨                      | 허용 범위를 벗어난 타겟 블록 `[현재+1, 현재+allowFutureBlock]`                             | 블록 번호가 범위 내에 있는지 확인합니다(일반적으로 +1 또는 +2). 이중 제출 전략에 대한 FAQ 참조                                                                                          |
| **유효하지 않은 서명** | 경매사에 의해 입찰이 거부됨                      | 잘못된 EIP-712 서명 구성                                                          | 도메인 구분 기호를 확인하고 해시를 입력합니다. 올바른 구현을 위해 [submitbid.go](https://github.com/kaiachain/auctioneer-sdk/blob/dev/example/submitbid.go)를 참조하세요. |
| **가스 한도 문제**   | 실행 실패 또는 입찰이 거부됨                     | 콜가스한도\`가 너무 낮거나 최대치(10,000,000)를 초과합니다. | 테스트넷에서 백런 로직을 테스트하여 실제 가스 소비량 측정하기                                                                                                                                                      |

## 자주 묻는 질문

### 구독

\*\*Q: 검색자당 몇 개의 동시 연결이 허용되나요?

A: 검색자 주소당 보류 중인 거래 구독 연결은 하나만 허용됩니다.

\*\*Q: 구독 연결은 얼마나 오랫동안 활성 상태로 유지되나요?

A: 연결은 24시간이 지나면 자동으로 종료됩니다. 롤링 업데이트가 진행 중인 경우 연결이 24시간보다 일찍 종료될 수 있습니다.

### API 성능 및 지연 시간

\*\*Q: 입찰을 제출할 때 API 지연 시간을 최소화하려면 어떻게 해야 하나요?

A: 옥션은 HTTPS 프로토콜을 사용하는 L7 로드 밸런서를 사용합니다. 초기 핸드셰이크는 네트워크 상태에 따라 시간이 소요됩니다. 후속 입찰 API를 전송할 때 이러한 초기 지연을 우회하려면 연결 유지 연결을 설정하는 것이 좋습니다.

\*\*Q: API 요금 제한에 주의해야 하나요?

A: 경매사 API 서버에 의해 차단되는 것을 방지하려면 짧은 시간 내에 `ping` API를 너무 많이 보내지 마세요.

\*\*Q: 지리적 위치가 지연 시간에 영향을 주나요?

A: 예. 경매 서버는 GCP KR(서울) 리전에서 운영 중입니다. 지연 시간을 최소화하고 지리적 지연을 줄이려면 지리적으로 가까운 지역에서 인프라를 호스팅하는 것이 좋습니다.

### 입찰 타이밍 및 블록 타겟팅

\*\*Q: 입찰이 가끔 잘못된 블록 번호를 타겟팅하는 이유는 무엇인가요?

답변: 입찰 제출 시기는 CN(컨센서스 노드) 채굴 시간에 매우 민감합니다. 경매가 늦게 시작되면(채굴 시간에 가까워지면) 입찰 거래는 다음 블록에 삽입됩니다(블록 번호 +1이 아닌 +2). 즉, 목표 블록 번호를 +2로 설정해야 합니다.

\*\*Q: 입찰 포함률을 높이려면 어떻게 해야 하나요?

A: 목표 블록 번호는 본질적으로 CN 채굴 일정에 민감합니다. 즉, +2 블록을 목표로 하지만 이전 처리로 인해 거래가 +1 블록에 삽입되면 입찰이 실패하게 됩니다. 따라서 입찰 트랜잭션을 목표 블록 번호 +1과 목표 블록 번호 +2로 두 번 전송하여 포함 확률을 극대화하는 것이 좋습니다.

## 모범 사례

- **예치금 잔액 모니터링**: 여러 입찰을 감당할 수 있는 충분한 잔액 유지
- **논스를 주의 깊게 다루기**: 입찰하기 전에 항상 최신 논스를 조회하세요.
- **탐지 최적화**: 더 빠른 MEV 감지로 경쟁 우위 향상
- **카이로스에서 테스트**: 메인넷 배포 전 테스트넷에서 전략을 검증하세요.
- **결과 모니터링**: MEV Explorer를 통해 경매 결과를 추적하여 입찰 전략을 구체화하세요.
- **적절한 가스 한도 설정**: 충분한 가스와 비용 효율성 사이의 균형

## 리소스

- [SDK 리포지토리](https://github.com/kaiachain/auctioneer-sdk)
- [KIP-249 사양](https://kips.kaia.io/KIPs/kip-249)
- [예제 코드](https://github.com/kaiachain/auctioneer-sdk/tree/dev/example)
- API 문서: [auctioneer-kaia.io/docs](https://auctioneer-kairos.kaia.io/docs) (카이로스), TBU (메인넷)
- MEV 탐색기: [메브카이로스](https://mev-kairos.kaia.io) (카이로스), TBU (메인넷)
- [FAQ](https://github.com/kaiachain/auctioneer-sdk/blob/dev/user-guide/FAQ.md)

## 도움 받기

문제나 질문이 있는 경우

- 카이아 개발자 포럼](https://devforum.kaia.io)에 게시하세요.
- SDK 리포지토리](https://github.com/kaiachain/auctioneer-sdk/issues)에서 이슈를 엽니다.