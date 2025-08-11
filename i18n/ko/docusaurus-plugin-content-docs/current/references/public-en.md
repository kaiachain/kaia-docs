# Public JSON RPC Endpoints

Publicly exposed JSON-RPC endpoints allow you to test and run your blockchain products by providing interaction with the Kaia network without running your own node.

Running your own Kaia Endpoint Node (EN) is not simple, it requires technical expertise, monitoring and computing resources. It comes with a cost of maintaining storage, network bandwidth as well as having to divert engineering time and resources; nodes must be kept up to date and health checked regularly.

Hence, the main benefit of using an existing Public EN is that it allows you to solely focus on building and testing your blockchain product without the distraction of maintaining infrastructure to connect and interact with the Kaia network.

## Things to Consider

- The node providers are not responsible for any damage or losses caused in relation to traffic or interaction with the nodes.
- If traffic is concentrated on certain nodes, you may experience service delay.
- To prevent too many requests, rate limits may apply on a per-node basis, which are subject to change without prior notification.

## Public JSON-RPC Endpoints

Below is the list of the network domains offered by Kaia’s Public Node Providers.

:::info[Outdated 엔드포인트 작동이 중지됨]

다음 URL은 2024년 9월 말에 서비스가 중단되었음을 알려드립니다. We encourage you to update your configurations accordingly to ensure uninterrupted service:

**Mainnet**

- `https://public-en-cypress.klaytn.net` (replaced by `https://public-en.node.kaia.io`)
- `https://archive-en.cypress.klaytn.net` (replaced by `https://archive-en.node.kaia.io`)

**Testnet**

- `https://public-en-baobab.klaytn.net` (replaced by `https://public-en-kairos.node.kaia.io`)
- `https://archive-en.baobab.klaytn.net` (replaced by `https://archive-en-kairos.node.kaia.io`)

:::

### Mainnet Public JSON-RPC Endpoints

Please keep in mind that these endpoints are provided to the community for testing and development purposes.
Since we cannot guarantee uptime and stability of the endpoints, do not use them for commercial purposes.

**HTTPS**

| Service Provider                       | Endpoints                                                                                   | Namespaces        | Type    |
| -------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------- | ------- |
| [Kaia Foundation](https://www.kaia.io) | `https://public-en.node.kaia.io`                                                            | kaia,klay,eth,net | Full    |
|                                        | `https://archive-en.node.kaia.io`                                                           | kaia,klay,eth,net | Archive |
| [QuickNode](https://quicknode.com/)    | `https://alpha-hardworking-orb.kaia-mainnet.quiknode.pro/`                                  | kaia,klay,eth,net | Full    |
| [BlockPI Network](https://blockpi.io/) | `https://kaia.blockpi.network/v1/rpc/public`                                                | kaia,klay,eth,net | Full    |
| [OnFinality](https://onfinality.io/)   | `https://klaytn.api.onfinality.io/public`                                                   | kaia,klay,eth,net | Full    |
| [Pokt 네트워크](https://pocket.network/)   | `https://kaia-mainnet.rpc.grove.city/v1/803ceedf`                                           | kaia,klay,eth,net | Full    |
| [GetBlock](https://getblock.io/)       | `https://go.getblock.io/d7094dbd80ab474ba7042603fe912332`                                   | kaia,klay,eth,net | Full    |
| [dRPC](https://drpc.org/)              | `https://klaytn.drpc.org`                                                                   | kaia,klay,eth,net | Full    |
| [너바나 랩](https://nirvanalabs.io/)       | `https://kaia.nirvanalabs.xyz/kaiaennode-499hw?apikey=2b4f3ffc4668c6df22c8b09e8dab80ff5eb2` | kaia,klay,eth,net | Archive |

**WebSocket**

| Service Provider                       | Endpoints                                                | Namespaces        | Type    |
| -------------------------------------- | -------------------------------------------------------- | ----------------- | ------- |
| [Kaia Foundation](https://www.kaia.io) | `wss://public-en.node.kaia.io/ws`                        | kaia,klay,eth,net | Full    |
|                                        | `wss://archive-en.node.kaia.io/ws`                       | KAIA,KLAY,ETH,NET | Archive |
| [QuickNode](https://quicknode.com/)    | `wss://alpha-hardworking-orb.kaia-mainnet.quiknode.pro/` | kaia,klay,eth,net | Full    |
| [OnFinality](https://onfinality.io/)   | `wss://klaytn.api.onfinality.io/public-ws`               | kaia,klay,eth,net | Full    |
| [dRPC](https://drpc.org/)              | `wss://klaytn.drpc.org`                                  | KAIA,KLAY,ETH,NET | 전체      |

### Testnet (Kairos) Public JSON-RPC Endpoints

**HTTPS**

| Service Provider                       | Endpoints                                                    | Namespaces        | Type    |
| -------------------------------------- | ------------------------------------------------------------ | ----------------- | ------- |
| [Kaia Foundation](https://www.kaia.io) | `https://public-en-kairos.node.kaia.io`                      | kaia,klay,eth,net | Full    |
|                                        | `https://archive-en-kairos.node.kaia.io/`                    | KAIA,KLAY,ETH,NET | Archive |
| [QuickNode](https://quicknode.com/)    | `https://responsive-green-emerald.kaia-kairos.quiknode.pro/` | kaia,klay,eth,net | Full    |
| [BlockPI Network](https://blockpi.io/) | `https://kaia-kairos.blockpi.network/v1/rpc/public`          | KAIA,KLAY,ETH,NET | 전체      |

**WebSocket**

| Service Provider                       | Endpoints                                                  | Namespaces        | Type |
| -------------------------------------- | ---------------------------------------------------------- | ----------------- | ---- |
| [Kaia Foundation](https://www.kaia.io) | `wss://public-en-kairos.node.kaia.io/ws`                   | kaia,klay,eth,net | 전체   |
|                                        | `wss://archive-en-kairos.node.kaia.io/ws`                  | KAIA,KLAY,ETH,NET | 아카이브 |
| [QuickNode](https://quicknode.com/)    | `wss://responsive-green-emerald.kaia-kairos.quiknode.pro/` | KAIA,KLAY,ETH,NET | 전체   |

## RPC Service Providers

Below is the list of Kaia’s Public Node Providers.

### Kaia API Service (KAS)

KAS provides various APIs to support easier and quicker blockchain application development. You can dramatically reduce development time, operate a stable service, and save costs.

#### Features

- 10,000 requests per day (100 requests per second) for the free plan
- Community support for the free plan, and ticket support for paid plans (Starter, Pro, and Pro Plus)
- Kaia Node API, Token History API, Wallet API, Anchor API, KIP-7, 17, 37 API and Metadata API

#### References

- [Docs](https://www.klaytnapi.com/en/resource/docs/readme)
- [Subscription](https://www.klaytnapi.com/en/landing/pricings)
- [Website](https://www.klaytnapi.com/en/landing/main)

### 체인스택

[체인스택](https://chainstack.com/)은 선도적인 웹3 인프라 제공업체로, Kaia를 위한 무료 및 유료 엔드포인트를 제공합니다. 무료 개발자 요금제는 월 300만 건의 요청과 초당 25건의 요청(RPS)으로 시작합니다. 유료 요금제로 쉽게 확장할 수 있습니다.

무료 개발자 플랜 엔드포인트를 시작하려면 이메일 또는 GitHub 또는 X(트위터)와 같은 소셜 계정으로 가입하기만 하면 됩니다.

#### Features

- 무료 개발자 플랜 지원
- 유료 요금제로의 확장 지원
- 종량제 지원
- 25개 이상의 블록체인을 지원
- Uptime 99.9%+
- 로드 밸런싱
- 무한한 확장성
- 소셜 계정으로 가입하기
- Kaia 토큰을 포함한 암호화폐로 충전하기
- 텔레그램, 이메일, 풍부한 문서 등을 통한 지원
- 전담 웹3 카피라이터와 함께하는 고객 스토리

#### References

- [문서](https://chainstack.com/build-better-with-kaia/)
- [구독](https://chainstack.com/pricing/)
- [웹사이트](https://chainstack.com/)

### All That Node

All That Node aims to become trusty gateway to Web3 infrastructure allowing builders not to distracted by issues regarding blockchain network. All That Node guarantees fast and robust connection to RPC nodes with the lowest latency performance.

#### Features

- Public Nodes & Faucets for the Ecosystem
- Pay-As-You-Go-plan supported if you need more
- Dedicated Nodes
- 24+ Blockchains Supported
- Archival Data Available
- Websocket API Available
- Trace/Debug API Available
- 가동 시간 99.9% 이상
- Load-Balancing implemented
- Infinite Scalability
- 24/7 Support with the Discord Community

#### References

- [Docs](https://docs.allthatnode.com/)
- [Subscription](https://www.allthatnode.com/pricing.dsrv)
- [Website](https://www.allthatnode.com/main.dsrv)

### Tatum

Tatum is the fastest way to build, test and run blockchain apps. We offer the most flexible platform for developers to turn their blockchain ideas into reality fast.

#### Features

- 5 requests per second for the free plan, and 200 requests per second for the paid plans (Start, Basic)
- Community support

#### References

- [Docs](https://apidoc.tatum.io/tag/Kaia?_gl=1*1dhfv8u*_ga*MzY5NDMyNzg5LjE2NDQ1NTk1MzA.*_ga_BH6F6RKJW6*MTY2MjAxNDQ0OS4xNy4xLjE2NjIwMTQ2MTQuMjQuMC4w)
- [Pricing](https://tatum.io/pricing)
- [Website](https://tatum.io/)

### BlockPI

BlockPI Network aims to provide high-quality, robust, and efficient RPC service. To avoid the single-point failure and limitation of scalability, the network is designed to be a distributed structure with expandable RPC nodes.

BlockPI provides free public endpoints to the Kaia community and advanced features to paid users.  BlockPI designed two paid packages, and support Pay As You Go to fulfill flexible user needs. You can check the pricing details for each package (https://docs.blockpi.io/documentations/pricing) and the individual method cost for Kaia  (https://docs.blockpi.io/documentations/request-unit-ru)

#### Features

- 20 requests per second on free services, and unlimited for paid packages.
- Choice of Kaia archive node and endpoint node
- Whitelisting possible for endpoint nodes
- WSS available and subscription coming soon
- Supports tracing

#### References

- [Docs](https://docs.blockpi.io/)
- [Subscription](https://dashboard.blockpi.io/wallet/overview)
- [Website](https://blockpi.io/)

### Grove 🌿 - 포켓 네트워크에 구축됨

Grove는 포켓 네트워크의 빌더와 유지 관리자로 구성된 팀입니다. Pocket Network is the TCP/IP of Web3 node infrastructure – a multi-chain relay protocol that incentivizes RPC nodes to provide DApps and their users with unstoppable Web3 access.

Grove는 50개 이상의 블록체인을 지원하며, 더 많은 블록체인이 계속 추가되고 있습니다.

#### Features

- Decentralized RPC Protocol and Marketplace
- 하루 150,000건의 요청 무료 티어(최대 2개의 애플리케이션, 무제한 엔드포인트)
- Public Endpoints
- 무제한, 종량제 요금제(하루에 150,000건 이상의 요청이 필요한 경우)
- 50개 이상의 블록체인 지원
- 25,000 + Nodes earning POKT for serving applications
- 아카이브 노드, 추적 지원 기능이 있는 아카이브 노드
- No Single Point of Failure
- Zero Downtime
- Load-Balancing built into the Protocol
- Infinitely scale the number of requests per day and nodes per hour as you go
- The most private, censorship-resistant option
- Hands-on developer support

#### References

- [문서](https://docs.grove.city/kaia-api/intro)
- [Grove 웹사이트](https://grove.city/)
- [포켓 네트워크 웹사이트](https://pocket.network)
- [그로브 포털](https://portal.grove.city)

### ANKR

Ankr's distributed node network creates a powerful synergy, allowing developers to connect easily and securely to public endpoints. With fine-tuned caching that optimizes resource usage, Ankr guarantees fast RPC requests together with low latency performance for superior efficiency when building decentralized applications.

#### Features

- 500 requests per second on the free plan, and 1,500 on the premium. It is upgradable on request.
- Discord and Support Portal for the free plan, and dedicated support for the premium.
- WebSocket is available for the premium plan.

#### References

- [Docs](https://www.ankr.com/docs/build-blockchain/overview)
- [Subscription](https://www.ankr.com/rpc/pricing/)
- [Website](https://www.ankr.com/rpc/)

### NodeReal

NodeReal is a blockchain infrastructure and services provider. NodeReal helps developers and investors to explore blockchains with the most reliable solutions.

#### Features

- Free Tier, 3 API keys, 350 Million Compute Units(CU) monthly , 300 Compute Units Per Seconds(CUPS) monthly, Archive data
- Growth Tier, 15 API keys, 500 Million Compute Units(CU) monthly , 700 Compute Units Per Seconds(CUPS) monthly, Archive data, Debug & Trace API
- Enterprise Tier, Custom number of API Keys, Custom monthly usage, Dedicated support, Service-Level Agreement(SLA) and other requirements
- 50 Queries Per Seconds (QPS)/method

#### References

- [Docs](https://docs.nodereal.io/docs/getting-started)
- [Subscription](https://nodereal.io/api-marketplace/klaytn-rpc)
- [Website](https://nodereal.io)

### Nodit

Nodit aims to provide enterprise-grade Web3 infrastructure accessible to everyone. By offering robust node infrastructure with 99.9% uptime and reliable ready-to-query blockchain data at an affordable price, we are facilitating developers’ entry into the Web3 world.

#### Features

- Official Faucet for Kaia Testnet [https://kaiafaucet.com](https://kaiafaucet.com)
- 99.9%+ Uptime
- FREE access to indexed archival data in Datasquare - Dashboards and SQL supported
- Data pipeline integration support
- Auto-scaling supported in the upper Developer Tier
- 100+ Web3 Data APIs for NFTs, Tokens, Statistics, and more
- Webhook and Stream(WebSocket) Available
- Dedicated Nodes
- 350,000,000 Compute Units(CU) monthly with Free Tier
- Log Monitoring Dashboard

#### References

- [Website](https://nodit.io)
- [Datasquare Website](https://datasquare.nodit.io)
- [Docs](https://developer.nodit.io)
- [Blog](https://blog.nodit.io)

### GetBlock

GetBlock provides fast, reliable API access to full RPC nodes for over 50 major blockchain networks, including Kaia. By handling node maintenance, GetBlock allows developers and enterprises to focus on building dApps and blockchain solutions without infrastructure headaches.

#### Features

- 40k requests daily on free trail with upto 60 RPS. It also has starter and unlimited plan for better performances and support.
- 99.9%+ Uptime
- FREE access to 50+ blockchain protocols with RPC nodes
- Advanced monitoring & statistics
- Dedicated Nodes

#### References

- [Website](https://getblock.io/)
- [Docs](https://getblock.io/docs/getblock-explorer/get-started/)

### QuickNode

Quicknode offers blockchain infrastructure powering secure, decentralized innovation. They provide all the tools and resources builders need to create incredible products — all backed by unparalleled, globally-balanced infrastructure, guaranteed reliability and security, a user-friendly interface, and end-to-end customer support.

#### Features

- 15 request/second with 10M API credits on Free plan.
- Providers starter, Growth and Business plan for more credits and IPFS storage.
- Battle-tested RPC & API infrastructure providing performance and reliability at-scale.
- Has dozens of add-ons that make building super-powered dApps easier than ever.
- Provides streams, the most powerful real-time data pipelines.
- Event alerts.

#### References

- [Website](https://www.quicknode.com/)
- [Docs](https://www.quicknode.com/docs/welcome)

### dRPC

Decentralized RPC node provider to Kaia, Ethereum, Polygon, Arbitrum and others. Your trusted Web3 infrastructure partner.

#### Features

- No request limits on Public nodes with General support.
- Growth and Enterprise plan are also available for High performance nodes.
- 100개 이상의 네트워크에서 90개 이상의 블록체인
- AI-driven load balancer
- Insightful analytics.

#### References

- [Website](https://drpc.org/)
- [Docs](https://drpc.org/docs)

## Useful Resources

- Wallet: [Kaia Wallet](../build/tools/wallets/kaia-wallet.md) is a browser extension wallet for the Kaia Network.

- Faucet: You can obtain test KAIA for the Kairos test network from [KAIA Faucet](https://faucet.kaia.io).

- 탐색기: [KaiaScan](../build/tools/block-explorers/kaiascan.md)은 Kaia 네트워크의 블록 탐색기입니다.

- ChainID : Kairos: 1001 (0x3E9), Mainnet: 8217 (0x2019)

- Gas price: dynamically adjusted within the range [25, 750]. The range can be changed via on-chain governance. For more information, refer to [governance](https://docs.kaia.io/references/json-rpc/governance/chain-config/) and
  [Transaction Fees](../learn/transaction-fees/transaction-fees.md)
