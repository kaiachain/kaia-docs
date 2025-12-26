# 过渡时期常见问题

:::info[Archive 通知］

请注意，本常见问题中提供的大部分信息反映的是 2024 年的过渡期，其中提到的大部分事件和过程已经发生。 虽然常见问题解答仍可作为历史参考，但其中一些章节现已过时，可能不再适用。 有关 Kaia 的最新信息，请查阅最新的官方文档和公告。

:::

本常见问题解决了熟悉 Klaytn 生态系统的 CEX、节点提供商、钱包提供商、dApp 构建者和零售用户的常见问题和顾虑，以确保平稳过渡。

- KLAY 和 FNSA 持有者
  - [克莱顿和芬丝琪亚怎么了？](#what-happened-to-klaytn-and-finschia-)
  - [KLAY 和 FNSA 会怎么样？](#what-happens-to-klay-and-fnsa-)
  - [我需要为 Kaia 创建一个新钱包吗？](#will-i-need-to-create-a-new-wallet-for-kaia-)
  - [Klaytn会为新的KAIA代币提供交换或迁移网站吗？](#will-klaytn-provide-a-swap-or-migration-website-for-new-kaia-tokens-)
  - [接收 KAIA 代币是否会有延迟？](#will-there-be-any-delay-in-receiving-kaia-tokens-)
  - [交换 KLAY 和 FNSA 代币的金额有限制吗？](#is-there-a-limit-on-the-amount-for-swapping-klay-and-fnsa-tokens-)
  - [我在质押 FNSA 。 我是否需要等待 7 天才能解除我的 FNSA，以交换到 KAIA？](#im-currently-staking-fnsa-will-i-need-to-wait-7-days-to-unstake-my-fnsa-to-swap-to-kaia-)
  - [在哪里可以找到 KLAY 和 FNSA 的历史价格信息？ 我似乎无法在 CoinMarketCap 或 CoinGecko 上找到它了。](#where-can-i-find-the-historical-price-information-for-klay-and-fnsa-i-cant-seem-to-find-it-on-coinmarketcap-or-coingecko-anymore-)

- 应用程序开发人员
  - [Klaytn 上的 DApp 要迁移到 Kaia 需要做什么？](#what-do-dapps-on-klaytn-need-to-do-to-migrate-to-kaia-)
  - [Finschia 上的 DApp 需要做什么才能迁移到 Kaia？](#what-do-dapps-on-finschia-need-to-do-to-migrate-to-kaia-)
  - [Kaia 基金会是否会像 Klaytn 基金会那样继续提供代码审计补助金](#will-kaia-foundation-continue-to-provide-code-audit-grants-as-klaytn-foundation-did-)

- 钱包提供商
  - [是否有必要将钱包中的品牌名称从 "Klaytn "更新为 "Kaia"？](#is-it-necessary-to-update-the-brand-name-from-klaytn-to-kaia-in-the-wallet-)
  - [如果主网升级后我们不升级到 Kaia 品牌会怎样？](#what-happens-if-we-dont-upgrade-to-the-kaia-brand-after-the-mainnet-upgrade-)
  - [默认资源管理器 Klaytnscope 将何去何从？](#what-will-happen-to-klaytnscope-the-default-explorer-)

- 中心化交易所
  - [KAIA 是 KLAY 的品牌重塑还是全新的代币？](#is-kaia-a-rebrand-from-klay-or-a-completely-new-token-)
  - [Kaia会在 Klaytn 主网还是其他主网？](#will-kaia-be-on-the-klaytn-mainnet-or-a-different-mainnet-)
  - [当前的 Klaytn 主网在品牌重塑后还能继续运行吗？](#will-the-current-klaytn-mainnet-continue-to-work-after-the-rebrand-)
  - [KAIA 市场何时开放？](#when-will-the-KAIA-market-open-)
  - [在哪里可以找到 Kaia 的白皮书？](#where-can-i-find-kaias-whitepaper-)

- RPC 节点提供者
  - [为了支持从 Klaytn 到 Kaia 的过渡，我需要对我的基础架构做哪些改动，RPC API 中是否会有任何突破性的改动？](#as-an-rpc-node-provider-what-changes-do-i-need-to-make-to-my-infrastructure-to-support-the-transition-from-klaytn-to-kaia-and-will-there-be-any-breaking-changes-in-the-rpc-apis-)
  - [Kaia是不同链ID的新链，还是基于Klaytn链的升级版？](#is-kaia-a-new-chain-with-a-different-chain-id-or-an-upgrade-based-on-the-klaytn-chain-)

## KLAY 和 FNSA 持有者

### Klaytn和Finschia <a id="what-happened-to-klaytn-and-finschia-"></a>

Klaytn 和 Finschia 通过管理决策合并为 Kaia。 您可以查看投票结果 [此处](https://blog.kaia.io/klaytn-and-finschia-merge-proposal-passes-creating-asias-largest-blockchain-ecosystem/)。 两条链（KLAY 和 FNSA）的实用代币转换为 KAIA 代币。 您可以在 [此处] 找到这两种代币的汇率(../../kaiatech/kaia-white-paper.md#fnsa-issuancedistribution-status)。

### KLAY 和 FNSA 会怎么样？ <a id="what-happens-to-klay-and-fnsa-"></a>

随着 KAIA 代币的推出，KLAY 余额自动反映为 KAIA 余额。 FNSA 持有者可以使用 [Kaia 门户网站](https://portal.kaia.io/) 上的交换服务，在 Finschia 网络上烧毁其 FNSA 代币，并获得等值的 KLAY 代币。 请阅读 [本帖](https://medium.com/lineblockchain/preparations-for-the-upcoming-kaia-chain-token-swap-d9ccd853eda4) 了解更多有关将 FNSA 换成 KAIA 的信息。

### 我需要为 Kaia 创建一个新钱包吗？ <a id="will-i-need-to-create-a-new-wallet-for-kaia-"></a>

您的 Klaytn 钱包可以在 Kaia 上使用，但如果您使用的是 Metamask 等第三方多链钱包，则需要更新 RPC 和区块资源管理器 URLS。 这些信息将在日后提供。 Finschia 钱包持有者将需要创建一个 Kaia 钱包，并将提供一个网站供 FNSA 持有者烧毁他们的代币并申领等值的 KAIA。

### Klaytn 会为新的 KAIA 代币提供交换或迁移网站吗？ <a id="will-klaytn-provide-a-swap-or-migration-website-for-new-kaia-tokens-"></a>

用户无需采取任何行动。 KLAY 代币将自动更名为 KAIA 代币。

### 收到 KAIA 代币会有延迟吗？ <a id="will-there-be-any-delay-in-receiving-kaia-tokens-"></a>

为安全起见，令牌交换将至少延迟 30 分钟。 中继器和 RPC 节点可能会产生微不足道的额外延迟

### 交换 KLAY 和 FNSA 代币的金额有限制吗？ <a id="is-there-a-limit-on-the-amount-for-swapping-klay-and-fnsa-tokens-"></a>

两种代币的交换和桥接没有限制。

### 我在质押 FNSA。 我是否需要等待 7 天才能解除我的 FNSA，换到 KAIA？ <a id="im-currently-staking-fnsa-will-i-need-to-wait-7-days-to-unstake-my-fnsa-to-swap-to-kaia-"></a>

随着 Kaia 的即将推出，将在 Finschia 网络上提出治理投票，以顺利整合代币和治理机制，包括可能将解绑时间从 7 天缩短到几个小时。 如果投票通过，FNSA 持有者将可以解押和交换，而无需等待一周时间。

### 在哪里可以找到 KLAY 和 FNSA 的历史价格信息？ 我似乎在 CoinMarketCap 或 CoinGecko 上都找不到它了。 <a id="where-can-i-find-the-historical-price-information-for-klay-and-fnsa-i-cant-seem-to-find-it-on-coinmarketcap-or-coingecko-anymore-"></a>

由于 KLAY 和 FNSA 的合并以及向新代币 KAIA 的过渡，加密货币跟踪网站上已不再提供 KLAY 和 FNSA 的历史价格信息。 不过，我们还是保留了这些数据，以提高透明度和供参考。 您可以从 [Kaia native coin - KAIA](../../learn/token-economics/kaia-native-token.md#historical-pricing) 下载包含 KLAY 和 FNSA 历史价格数据的 CSV 文件。

## 应用程序开发人员

### 要迁移到 Kaia，Klaytn 上的 DApp 需要做些什么？ <a id="what-do-dapps-on-klaytn-need-to-do-to-migrate-to-kaia-"></a>

Klaytn 应用程序将与 Kaia 连锁店无缝连接，只需重新命名即可。 团队将提供品牌指导。 对于现有的 Finschia 应用程序，将通过其业务渠道提供技术更新和营销支持。

### 要迁移到 Kaia，Finschia 上的 DApp 需要做些什么？ <a id="what-do-dapps-on-finschia-need-to-do-to-migrate-to-kaia-"></a>

Finschia 生态系统中的 DApp 要迁移到 Kaia，需要一个类似于从 Cosmwasm 链迁移到 EVM 链的过程。 如果您需要立即帮助，请联系Finschia基金会。

### Kaia 基金会是否会像 Klaytn 基金会那样继续提供代码审计补助金？ <a id="will-kaia-foundation-continue-to-provide-code-audit-grants-as-klaytn-foundation-did-"></a>

是的，审计补助金将与 Klaytn 的其他补助金和资助计划保持不变。

## 钱包提供商

### 是否有必要将钱包中的品牌名称从 Klaytn 更新为 Kaia？ <a id="is-it-necessary-to-update-the-brand-name-from-klaytn-to-kaia-in-the-wallet-"></a>

是，需要更新时会通知生态合作伙伴。

### 如果主网升级后我们没有升级到 Kaia 品牌，会发生什么情况？ <a id="what-happens-if-we-dont-upgrade-to-the-kaia-brand-after-the-mainnet-upgrade-"></a>

主网升级后不会出现任何功能问题。 品牌重塑可以稍后进行。

### 默认资源管理器 Klaytnscope 会发生什么变化？ <a id="what-will-happen-to-klaytnscope-the-default-explorer-"></a>

Klaytnscope 将一如既往地工作，并在三个月后升级。

## 中心化交易所

### KAIA 是 KLAY 的品牌重塑，还是一个全新的品牌？ <a id="is-kaia-a-rebrand-from-klay-or-a-completely-new-token-"></a>

KAIA 是 KLAY 的改名。 KLAY 将继续使用更新后的名称和代码。 建议尽可能更新K线图。

由于 Klaytn 和 Finschia 的合并，供应总量和流通量都发生了变化。 流通供应量从约 38.04 亿韩元增加到 58.05 亿韩元，而总供应量则从约 60.05 亿韩元减少到 58.05 亿韩元。 由于持续的通货膨胀，这些数字可能无法反映当前的流通量和总供应量。 KAIA 的通货膨胀率已从每块 6.4 KAIA 调整为每块 9.6 KAIA。 有关这些变更的更多详情，请参阅[KAIA 发行和分配计划](../../kaiatech/kaia-white-paper.md#kaia-issuancedistribution-plan-1)。

### Kaia 会在 Klaytn 主网还是其他主网？ <a id="will-kaia-be-on-the-klaytn-mainnet-or-a-different-mainnet-"></a>

Kaia 将继续留在 Klaytn 主网上。

### 改版后，当前的 Klaytn 主网还能继续运行吗？ <a id="will-the-current-klaytn-mainnet-continue-to-work-after-the-rebrand-"></a>

是的，主网的运行不会受到影响。 向 Kaia 的过渡主要涉及名称更改和幕后的技术升级。

### KAIA 市场何时开放？ <a id="when-will-the-kaia-market-open-"></a>

KAIA 市场将于 2024 年第三季度开放，我们将在临近该日期时公布确切的区块编号。

### 在哪里可以找到 Kaia 的白皮书？ <a id="where-can-i-find-kaias-whitepaper-"></a>

您可以访问 Kaia 的白皮书 [此处](../../kaiatech/kaia-white-paper.md)。

## RPC 节点提供者

### 为了支持从 Klaytn 到 Kaia 的过渡，我需要对基础架构进行哪些更改？ <a id="as-an-rpc-node-provider-what-changes-do-i-need-to-make-to-my-infrastructure-to-support-the-transition-from-klaytn-to-kaia-and-will-there-be-any-breaking-changes-in-the-rpc-apis-"></a>

除了命名空间从 klay_ 变为 kaia_ 之外，Kaia 链上的大多数 RPC API 将保持不变。 不过，为了向后兼容，klay_ 仍将可用。

为了支持从 Klaytn 到 Kaia 的过渡，RPC 节点提供商需要在 Kaia 版本发布后将其二进制文件升级到 Kaia 版本。 升级前无需立即采取行动。

### Kaia 是具有不同链条 ID 的新链条，还是基于 Klaytn 链条的升级版？ <a id="is-kaia-a-new-chain-with-a-different-chain-id-or-an-upgrade-based-on-the-klaytn-chain-"></a>

Kaia 是 Klaytn 链的硬分叉，链 ID 保持不变。 之前的测试网络 "Baobab "已更名为 "Kairos"，而主网络 "Cypress "现在被称为 "Mainnet "或 "Kaia Mainnet"。 与 Klaytn 相关的原始 URL（如文档、网站、公共端点和软件包下载链接）将保留三个月，以确保平稳过渡。

## 资源

以下是链合并的主要信息：

- [治理建议](https://govforum.klaytn.foundation/t/kgp-25-klaytn-finschia-mainnet-merge/719)
- [合并背后的愿景](https://blog.kaia.io/finschia-klaytn-chain-merge-proposal-our-vision-for-asias-no-1-blockchain-ecosystem/)
- [制作 Kaia DeFi 的核心](https://blog.kaia.io/crafting-the-core-of-project-dragons-defi-ecosystem/)
- [回应机构需求](https://blog.kaia.io/project-dragon-responding-to-institutional-demand/)
- [补充数据和见解](https://blog.kaia.io/project-dragon-supplementary-data-and-insights/)
- [Kaia品牌故事](https://blog.kaia.io/say-hello-to-kaia/)
