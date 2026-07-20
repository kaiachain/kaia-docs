---
title: 使用 CSV 空投
sidebar_label: CSV 空投
---

# 使用 CSV 空投

:::caution 日落通知

`safe.kaia.io` 将于 **2026年8月9日** 停止服务。 今后请使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 版 Safe Wallet 来管理您的账户。 您现有的“安全账户”将自动与“安全钱包”兼容。

:::

**CSV 空投**（当在“安全应用”下列表时）会将多笔 ERC-20、ERC-721、ERC-1155 及原生代币的转账批量合并为一笔“安全”交易。 您只需上传或粘贴一份转账CSV文件并提交一次——与逐笔发送转账相比，这样不仅需要更少的签名，还能节省更多Gas费用。

Safe 应用的可用性取决于 Kaia / Kairos 的 Safe 钱包应用目录。 如果您的网络中未列出 CSV 空投，请使用 [交易生成器](./tx-builder.md) 或查看 [帮助中心](https://help.safe.global)。

## 步骤 1：在 Safe Wallet 中打开您的保险箱<a id="login-kaiasafe"></a>

请登录 [app.safe.global](https://app.safe.global)，并选择您的 Kaia 或 Kairos 保险箱。 如果您还没有账户，请按照 [创建保险箱](./use-kaia-safe.md#create-a-safe) 和 [添加资产](./use-kaia-safe.md#add-assets) 的步骤操作。

## 步骤 2：打开 CSV Airdrop<a id="search-CSV-airdrop"></a>

进入**应用**，搜索**CSV**，如果您的网络支持，请打开**CSV Airdrop**。

## 步骤 3：准备一个传输 CSV 文件<a id="prepare-CSV-airdrop"></a>

传输文件应为CSV格式，并包含以下列：

- _token_type_：`erc20`、`nft` 或 `native`。 NFT 代币可以是 ERC-721 或 ERC-1155 标准。
- _token_address_：代币合约地址。 如果是本机（KAIA）转账，请留空。
- _收件人_：收件人地址。
- _金额_：转账金额。 ERC-721 转账时可留空。
- _id_：收藏品 ID（ERC-721 或 ERC-1155）。 对于原生代币和 ERC-20 代币的转账，该字段可以留空。

:::important
请使用 `,` 作为分隔符。 标题行必须是第一行，并且必须包含所述的列名。
[示例传输文件](https://ipfs.io/ipfs/bafybeiesr6b3cm76ofcm2joukgdtuyva3niftmbpbb4sgxsa3qwsenv3lu/sample.csv)
:::

### 原生代币转账<a id="native-token-trnasfers"></a>

进行原生转账时，请将 _token_address_ 留空。 确保保险箱内存放有足够的KAIA。

### ERC-20 转账<a id="erc20-trnasfers"></a>

将 _token_type_ 设置为 `erc20`，并填写其他字段。 确保保险箱里存有足够的代币。

### ERC-721 转账<a id="erc721-transfers"></a>

在进行 NFT 转账时，请设置 _token_type_，并根据应用程序的要求包含该收藏品的 _id_。 确保“The Safe”拥有这些 NFT。

## 第 4 步：审核并提交<a id="review-submit-transaction"></a>

在应用中查看已解码的转账记录，然后提交。 与任何其他“安全”交易一样，完成“安全”确认。
