# 成為驗證員

## 概述<a id="overview"></a>

:::info 無授權階段 1

本指南說明在 \*\* 無授權階段 1\*\* 期間，現有 GC 如何透過驗證器管理入口網站管理其驗證器。 開放任何人透過無權限網路參與，將於\*\*第二階段（預定於九月底）\*\*進行，屆時將更新本指南。 詳情請參閱 [Permissionless Implementation Overview](https://govforum.kaia.io/t/permissionless-implementation-overview/1218) 和 [PGT Roadmap](https://govforum.kaia.io/t/pgt-permissionless-governance-tokenomics-roadmap-introduction/1447) 。

:::

Kaia 提供 [Validator Management Portal](https://portal.kaia.io/validators) 用來註冊和管理驗證器資訊。 本指南將介紹驗證者如何使用入口網站加入 Kaia 網路。

由於驗證器操作所需的資訊必須記錄在鏈上合約中，因此任何驗證器都可以使用入口網站來傳送寫入或更新該資訊的交易。 當新的驗證員加入 Kaia 網路或現有的驗證員離開 Kaia 網路時，入口網站也可讓驗證員管理他們所擁有的鑄造合約。

入口網站目前支援下列功能。

![入口網站首頁](/img/nodes/become-a-validator/image01.png)

- \*\* 首頁\*\*：顯示驗證器管理員部署的定價合約的主畫面。
- **部署盯梢合約**：部署新的盯梢合約。
- **Manage Staking**：修改已部署的定價合約資訊。
- **成為驗證者**：透過註冊已部署的鑄造合約，加入成為驗證者。
- **Manage Validator**：修改內建驗證器的資訊。
- **Pending Requests**：Kaia 團隊使用的管理畫面。

:::note

testnet 也支援上述所有功能。 我們建議先在 testnet 上執行任何測試作業。

:::

## 您的工作<a id="what-youll-do"></a>

入職流程依序涵蓋於下列頁面：

1. [Prerequisites](./prerequisites.md) - 連接驗證器管理員錢包 (建議使用 Kaia Safe) 並準備所需帳戶。
2. [Validator Onboarding](./onboarding.md) - 部署並初始化您的入股合約，然後遞交入股申請。
3. [Managing Staking Contracts](./manage-staking.md) - 更新管理員、認購/取消認購 KAIA、變更獎金地址、管理多重認證等。
4. [Managing Validator Information](./manage-validator.md) - 轉移管理員帳號、請求離職及管理輔助定價合約。

## 相關資源<a id="related-resources"></a>

- [Kaia Safe 使用指南](../../../build/wallets/kaia-safe/kaia-safe.md)
- [KIP-277：自我驗證器註冊](https://kips.kaia.io/KIPs/kip-277)
- [KIP-163: Redelegation](https://kips.kaia.io/KIPs/kip-163)
