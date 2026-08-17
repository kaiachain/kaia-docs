---
title: 安全錢包
sidebar_label: 安全錢包
---

# 安全錢包

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 9 日** 停止服務。 請使用 [app.safe.global](https://app.safe.global) 上的 **Safe Wallet** for Kaia 來管理您未來的帳戶。 您現有的 Safe 帳戶將自動與 Safe Wallet 相容。

:::

## 引言

[Safe](https://safe.global) (Safe Global) 為 EVM 網路提供符合業界標準的多簽名智慧帳戶解決方案。 **Safe Wallet** 是 Safe 用於建立和管理這些帳戶的網頁應用程式——可於 [app.safe.global](https://app.safe.global) 取得。

Safe Wallet 支援 Kaia 主網和 Kairos 測試網。 連結所有者錢包，選擇 **Kaia** 或 **Kairos**，然後建立或開啟一個「保險箱」。

在 Kaia 的典型設定中，大多數使用者會先從單金鑰錢包（例如 Kaia Wallet 或 MetaMask）開始使用（即外部擁有帳戶，簡稱 EOA）。 這些帳戶依賴一組金鑰，因而形成單點故障——這對組織的資金管理並不適合，例如在 [Wintermute 駭客事件](https://www.certik.com/resources/blog/uGiY0j3hwOzQOMcDPGoz9-wintermute-hack-) 中，便因此損失了 1.625 億美元。

Safe Wallet 消除了這個單點故障：交易執行前，必須由多位所有者根據確認門檻進行簽署。

關於產品行為、架構及 API，請參閱 Safe 自身的文件：

- [什麼是「安全」？](https://docs.safe.global/home/what-is-safe)
- [安全文件](https://docs.safe.global)
- [幫助中心](https://help.safe.global)

## 什麼是多簽名錢包？ <a id="What are Multisig Wallets"></a>

多簽名錢包是一種數位錢包，需要來自不同來源的兩組、三組或更多組私鑰，才能確認並執行加密貨幣交易。

舉例來說，你可以將多簽名錢包想像成一個有三個鎖的保險箱。 這三把鑰匙分別由三名不同的人持有，因此必須獲得他們三人的共同同意才能打開它。

多簽名錢包的主要優點：

- **安全儲存資產：** 企業和協議可以儲存資金，無需依賴單一私鑰，也不必擔心單一主體在未經授權的情況下轉移資金。
- **實現去中心化決策：** 團隊可以針對應執行哪些交易，在鏈上做出決策。
- **共享控制：** 僅持有必要金鑰的當事方，方能依據設定的閾值批准並執行交易。

## Kaia 的優勢<a id="Benefits of Kaia Safe"></a>

- **儲存與轉帳 KAIA 及代幣：** 存入並轉帳原生 KAIA 以及可互換或不可互換的代幣（例如 ERC-20 / KIP-7 及 ERC-721 / KIP-17）。
- **擁有者與確認門檻：** 設定多位擁有者及確認門檻，以實現靈活且安全的控制。
- **安全應用程式：** 透過應用程式擴充 Safe Wallet 的功能，以支援批次處理、合約呼叫及其他工作流程——例如 **Transaction Builder**，以及當 Apps 目錄中提供時，基於 CSV 的空投功能。
- **交易與確認：** 根據您的閾值提出交易、收集簽名並執行交易。
- **帳戶恢復：** 若遺失一組金鑰，符合門檻要求的其餘持有者仍可管理該帳戶（例如透過替換遺失資格的持有者）。

先前在 Kaia 託管的 Safe UI 上建立的既有帳戶，仍可與 [app.safe.global](https://app.safe.global) 上的 Safe Wallet 相容。

## 下一步

- [在 Kaia 上使用 Safe Wallet](./use-kaia-safe.md) — 建立 Safe、新增資產並發送交易
- [概覽](./overview.md) — 網路、遷移說明及 Safe Global 資源
