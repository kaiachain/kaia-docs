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

:::info[Outdated Endpoints Stopped Working]

Please note that the following URLs was discontinued at the end of September 2024. We encourage you to update your configurations accordingly to ensure uninterrupted service:

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

| Service Provider                                    | Endpoints                                                                                   | Namespaces        | Type    |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------- | ------- |
| [Kaia Foundation](https://www.kaia.io)              | `https://public-en.node.kaia.io`                                                            | kaia,klay,eth,net | Full    |
|                                                     | `https://archive-en.node.kaia.io`                                                           | kaia,klay,eth,net | Archive |
| [QuickNode](https://quicknode.com/)                 | `https://alpha-hardworking-orb.kaia-mainnet.quiknode.pro/`                                  | kaia,klay,eth,net | Full    |
| [BlockPI Network](https://blockpi.io/)              | `https://kaia.blockpi.network/v1/rpc/public`                                                | kaia,klay,eth,net | Full    |
| [OnFinality](https://onfinality.io/)                | `https://klaytn.api.onfinality.io/public`                                                   | kaia,klay,eth,net | Full    |
| [Mạng Pokt](https://pocket.network/)                | `https://kaia-mainnet.rpc.grove.city/v1/803ceedf`                                           | kaia,klay,eth,net | Full    |
| [GetBlock](https://getblock.io/)                    | `https://go.getblock.io/d7094dbd80ab474ba7042603fe912332`                                   | kaia,klay,eth,net | Full    |
| [dRPC](https://drpc.org/)                           | `https://klaytn.drpc.org`                                                                   | kaia,klay,eth,net | Full    |
| [Phòng thí nghiệm Nirvana](https://nirvanalabs.io/) | `https://kaia.nirvanalabs.xyz/kaiaennode-499hw?apikey=2b4f3ffc4668c6df22c8b09e8dab80ff5eb2` | kaia,klay,eth,net | Archive |

**WebSocket**

| Service Provider                       | Endpoints                                                | Namespaces        | Type    |
| -------------------------------------- | -------------------------------------------------------- | ----------------- | ------- |
| [Kaia Foundation](https://www.kaia.io) | `wss://public-en.node.kaia.io/ws`                        | kaia,klay,eth,net | Full    |
|                                        | `wss://archive-en.node.kaia.io/ws`                       | kaia,klay,eth,net | Archive |
| [QuickNode](https://quicknode.com/)    | `wss://alpha-hardworking-orb.kaia-mainnet.quiknode.pro/` | kaia,klay,eth,net | Full    |
| [OnFinality](https://onfinality.io/)   | `wss://klaytn.api.onfinality.io/public-ws`               | kaia,klay,eth,net | Full    |
| [dRPC](https://drpc.org/)              | `wss://klaytn.drpc.org`                                  | kaia,klay,eth,net | Đầy     |

### Testnet (Kairos) Public JSON-RPC Endpoints

**HTTPS**

| Service Provider                       | Endpoints                                                    | Namespaces        | Type    |
| -------------------------------------- | ------------------------------------------------------------ | ----------------- | ------- |
| [Kaia Foundation](https://www.kaia.io) | `https://public-en-kairos.node.kaia.io`                      | kaia,klay,eth,net | Full    |
|                                        | `https://archive-en-kairos.node.kaia.io/`                    | kaia,klay,eth,net | Archive |
| [QuickNode](https://quicknode.com/)    | `https://responsive-green-emerald.kaia-kairos.quiknode.pro/` | kaia,klay,eth,net | Full    |
| [BlockPI Network](https://blockpi.io/) | `https://kaia-kairos.blockpi.network/v1/rpc/public`          | kaia,klay,eth,net | Đầy     |

**WebSocket**

| Service Provider                       | Endpoints                                                  | Namespaces        | Type    |
| -------------------------------------- | ---------------------------------------------------------- | ----------------- | ------- |
| [Kaia Foundation](https://www.kaia.io) | `wss://public-en-kairos.node.kaia.io/ws`                   | kaia,klay,eth,net | Đầy     |
|                                        | `wss://archive-en-kairos.node.kaia.io/ws`                  | kaia,klay,eth,net | Lưu trữ |
| [QuickNode](https://quicknode.com/)    | `wss://responsive-green-emerald.kaia-kairos.quiknode.pro/` | kaia,klay,eth,net | Đầy     |

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

### Chuỗi xếp chồng

[Chainstack](https://chainstack.com/) là nhà cung cấp cơ sở hạ tầng Web3 hàng đầu, cung cấp các điểm cuối miễn phí và trả phí cho Kaia. Gói Nhà phát triển miễn phí bắt đầu với 3 triệu yêu cầu mỗi tháng và 25 yêu cầu mỗi giây (RPS). Bạn có thể dễ dàng mở rộng quy mô với các gói trả phí.

Để bắt đầu sử dụng gói Developer miễn phí, bạn chỉ cần đăng ký bằng email hoặc bất kỳ tài khoản mạng xã hội nào, như GitHub hoặc X (Twitter).

#### Features

- Gói nhà phát triển miễn phí được hỗ trợ
- Hỗ trợ mở rộng sang các gói trả phí
- Hỗ trợ trả tiền khi sử dụng
- Hỗ trợ 25+ bockchain
- Uptime 99.9%+
- Cân bằng tải
- Khả năng mở rộng vô hạn
- Đăng ký bằng tài khoản mạng xã hội
- Nạp tiền bằng tiền điện tử, bao gồm cả token Kaia
- Hỗ trợ qua Telegram, email, tài liệu phong phú và nhiều hơn nữa
- Câu chuyện của khách hàng với các copywriter Web3 tận tâm của chúng tôi

#### References

- [Tài liệu](https://chainstack.com/build-better-with-kaia/)
- [Đăng ký](https://chainstack.com/pricing/)
- [Trang web](https://chainstack.com/)

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
- Thời gian hoạt động 99,9%+
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

### Grove 🌿 - Được xây dựng trên Pocket Network

Grove là nhóm xây dựng và bảo trì Pocket Network. Pocket Network is the TCP/IP of Web3 node infrastructure – a multi-chain relay protocol that incentivizes RPC nodes to provide DApps and their users with unstoppable Web3 access.

Grove hỗ trợ hơn 50 blockchain và liên tục bổ sung thêm nhiều blockchain mới.

#### Features

- Decentralized RPC Protocol and Marketplace
- Gói miễn phí 150.000 yêu cầu mỗi ngày (tối đa hai ứng dụng, với số điểm cuối không giới hạn)
- Public Endpoints
- Gói không giới hạn, trả tiền khi sử dụng (nếu bạn cần hơn 150.000 yêu cầu mỗi ngày)
- Hỗ trợ hơn 50 Blockchain
- 25,000 + Nodes earning POKT for serving applications
- Nút lưu trữ, Nút lưu trữ có hỗ trợ theo dõi
- No Single Point of Failure
- Zero Downtime
- Load-Balancing built into the Protocol
- Infinitely scale the number of requests per day and nodes per hour as you go
- The most private, censorship-resistant option
- Hands-on developer support

#### References

- [Tài liệu](https://docs.grove.city/kaia-api/intro)
- [Trang web Grove](https://grove.city/)
- [Trang web Pocket Network](https://pocket.network)
- [Cổng Grove](https://portal.grove.city)

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
- Hơn 90 blockchain trên hơn 100 mạng lưới
- AI-driven load balancer
- Insightful analytics.

#### References

- [Website](https://drpc.org/)
- [Docs](https://drpc.org/docs)

## Useful Resources

- Wallet: [Kaia Wallet](../build/tools/wallets/kaia-wallet.md) is a browser extension wallet for the Kaia Network.

- Faucet: You can obtain test KAIA for the Kairos test network from [KAIA Faucet](https://faucet.kaia.io).

- Trình khám phá: [KaiaScan](../build/tools/block-explorers/kaiascan.md) là trình khám phá khối cho Mạng Kaia.

- ChainID : Kairos: 1001 (0x3E9), Mainnet: 8217 (0x2019)

- Gas price: dynamically adjusted within the range [25, 750]. The range can be changed via on-chain governance. For more information, refer to [governance](https://docs.kaia.io/references/json-rpc/governance/chain-config/) and
  [Transaction Fees](../learn/transaction-fees/transaction-fees.md)
