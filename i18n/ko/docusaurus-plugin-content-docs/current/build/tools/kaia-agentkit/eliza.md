# Eliza

## 개요

Kaia 엘리자 플러그인**은 **엘라이자OS**와의 통합을 위한 필수 확장 기능으로, Kaia 메인넷** 및 Kairos 테스트넷\*\*과의 원활한 상호작용을 가능하게 합니다. 이 플러그인은 **KAIA 토큰 전송, 지갑 잔액 조회, 대체 가능한 토큰과 대체 불가능한 토큰(FT/NFT)** 검색을 포함한 강력한 기능 모음을 제공합니다. 개발자를 위해 설계된 이 기능은 지갑 관리를 간소화하고 Kaia 생태계를 위한 **ElizaOS 프레임워크** 내에서 애플리케이션 기능을 향상시킵니다.

:::note
Kaia 엘리자 플러그인은 내부적으로 Kaia 에이전트 키트를 사용합니다. 즉, 토큰 전송이나 잔액 확인과 같은 모든 온체인 작업은 Kaia 에이전트 키트의 안전하고 신뢰할 수 있는 도구를 통해 이루어집니다.
:::

**주요 기능**

 - **토큰 전송**: 지갑 간에 KAIA 토큰을 손쉽게 전송할 수 있습니다.
 - **지갑 쿼리**: 지갑 잔액과 실시간 KAIA 가격 데이터를 검색합니다.
 - **네트워크 관리**: Kaia 블록체인과 원활하게 상호작용하세요.
 - **블록 및 트랜잭션 정보**: 네트워크의 트랜잭션과 블록에 대한 자세한 인사이트에 액세스하세요.

## 시작하기

### 1. ElizaOS 설정

```sh
git clone https://github.com/elizaOS/eliza
cd eliza
git checkout $(git describe --tags --abbrev=0)
pnpm install
cp .env.example .env
```

### 2. 환경 변수 구성

Kaia 플러그인을 통합하려면 개발자가 환경 변수와 비밀 번호를 구성해야 합니다. 플러그인은 **agent.json.secret**를 통해 또는 런타임에 직접 이러한 설정에 액세스할 수 있습니다.

이제 `.env` 파일과 `kaiaagent.character.json` 값을 구성합니다.

**.env 파일:**

```sh
GROK_API_KEY= # GROK API Key
GOOGLE_GENERATIVE_AI_API_KEY= # Gemini API Key
```

:::note
LLM 공급자\*\*를 사용하려면 '.env'에서 관련 API 키를 구성하세요. 제공된 키를 기반으로 문자 파일에서 **modelProvider** 설정을 업데이트합니다.
:::

**kaiaagent.character.json:**

```json
{
    "name": "Kaia AI Dev Agent",
    "plugins": ["@elizaos-plugins/plugin-kaia"],
    "clients": [],
    "modelProvider": "grok",
    "settings": {
        "ragKnowledge": false,
        "secrets": {
            "KAIA_EVM_PRIVATE_KEY": "",
            "KAIA_KAIASCAN_API_KEY": "",
            "KAIA_FAUCET_AMOUNT": "1"
        }
    }
}
```

값을 입력합니다:

 - **Kaia_evm_개인키**: 온체인 트랜잭션에 필요합니다.
 - **Kaia_KaiaScan_API_키**: KaiaScan](https://kaiascan.io)에서 얻을 수 있습니다.
 - **Kaia_수전_금액**: 요청 시 배포할 토큰 금액을 지정합니다.

**구성 예제**

필요한 character.json 파일을 다운로드합니다:

```sh
wget https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/kaiaagent.character.json -O ./characters/kaiaagent.character.json
```

## 플러그인 등록

Kaia 플러그인\*\*을 사용 설정하려면 상담원의 구성에 추가하세요:

```json
{
    "name": "Kaia AI Dev Agent",
    "plugins": ["@elizaos-plugins/plugin-kaia"]
}
```

또한 아래 명령을 실행하여 `package.json`에 플러그인을 추가합니다:

```bash
npx elizaos plugins install @elizaos-plugins/plugin-kaia
```

```json
{
    "dependencies": {
        "@elizaos-plugins/plugin-kaia": "github:kaiachain/kaia-eliza-plugin"
    }
}
```

## Eliza 구축 및 시작

```sh
pnpm build
pnpm start --character="./characters/kaiaagent.character.json"
```

## Eliza 클라이언트 UI 실행

다른 터미널을 열고 실행합니다:

```sh
pnpm run start:client
```

UI가 준비되면 \*\*http://localhost:5173\*\*에서 사용할 수 있습니다.

:::note
구성된 개인 키와 연결된 계정에 **Kaia 테스트넷** 또는 **메인넷**에서 온체인 트랜잭션을 수행할 수 있는 자금이 있는지 확인합니다. 테스트 토큰은 [Kaia Faucet](https://faucet.kaia.io)에서 요청할 수 있습니다.
:::

## 데모

[Kaia 엘리자 플러그인 데모 보기](https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/KaiaElizaPluginDemo.mp4)

## 사용 예

### KAIA 가격 및 시장 데이터 가져오기

**명령어:**

```sh
User: "Give me KAIA information"
```

**응답:**

```sh
Assistant: "KAIA Token info: USD: 0.14, Total Supply: 5,936,109,217, Volume: 63,994,146"
```

### KAIA 테스트 토큰 요청하기

**명령어:**

```sh
User: "Give me some test tokens to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d"
```

**응답:**

```sh
Assistant: "I'll send a few KAIA testnet tokens..."
```

### KAIA 토큰 보내기

**명령어:**

```sh
User: "Send 1 KAIA to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos"
```

**응답:**

```sh
Assistant: "I'll send 1 KAIA token now..."
```

### 계정 정보 조회

**명령어:**

```sh
User: "What's my account overview of 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos?"
```

**응답:**

```sh
Assistant: "Your account overview details: Account Type: EOA, Balance: 10, Total Transactions: 12"
```

### 최신 블록 정보 확인

**명령어:**

```sh
User: "What is the latest block number of Kaia?"
```

**응답:**

```sh
Assistant: "The latest block number for Kaia is 176629207"
```

## 참여하기

개발자 커뮤니티의 기여를 환영합니다. Kaia 블록체인에 대해 자세히 알아보려면 여기를 방문하세요:

 - [Kaia 문서](https://docs.kaia.io/)
 - [Kaia 개발자 포털](https://www.kaia.io/developers)
 - [KaiaScan 익스플로러](https://kaiascan.io)
 - [KaiaScan API 문서](https://docs.kaiascan.io/)
 - [Kaia 깃허브 리포지토리](https://github.com/kaiachain)

## 결론

Kaia 엘리자 플러그인**은 엘리자OS AI 에이전트 프레임워크**와 원활하게 통합되어 Kaia 메인넷\*\* 및 Kairos 테스트넷\*\*과 지능적이고 효율적인 상호작용을 가능하게 합니다. 강력한 지갑, 트랜잭션, 토큰 관리 기능을 통해 개발자는 블록체인 상호작용을 간소화하면서 더 스마트하고 반응성이 뛰어난 탈중앙화 애플리케이션을 구축할 수 있습니다.

AI 기반 블록체인 경험을 향상시킬 준비가 되셨나요? 지금 바로 Kaia 플러그인을 **엘리자OS**와 통합하고 새로운 가능성을 열어보세요!