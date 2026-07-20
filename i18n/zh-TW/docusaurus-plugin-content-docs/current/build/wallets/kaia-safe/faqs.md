---
title: 常見問題
sidebar_label: 常見問題
---

# 常見問題

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 9 日** 停止服務。 今後請使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 專用 Safe Wallet 來管理您的帳戶。 您現有的「安全帳戶」將自動與「安全錢包」相容。

:::

## 建立「保險箱」後，我可以新增所有者嗎？ <a id="Can i add new owners after creating a safe"></a>

是的。 在 Safe Wallet 中，開啟 **設定** 以管理 Safe 擁有者：新增、移除、替換或重新命名擁有者。 您必須以現任所有者身分登入，且任何變更均須符合慣常的確認門檻。

典型流程：

1. 開啟 **設定** → 所有者／簽署者管理。
2. 新增一位業主（姓名＋地址）。
3. 如有需要，請調整簽名政策。
4. 檢視並提交；其他所有者將如同任何「安全交易」一樣進行確認。

隨著 Safe Wallet 的持續發展，介面標籤可能會略有變動——請參閱 [說明中心](https://help.safe.global) 以查看最新的螢幕截圖。

## 我可以更改所需的確認次數嗎？ <a id="Can i change the number of required signer confirmation"></a>

是的。 在 **設定** 中，變更所需的確認門檻，然後根據 _現行_ 政策提交並收集所有者的簽名。

## 如何新增現有的保險箱？ <a id="How do i add an existing safe"></a>

您可以透過連結所有者錢包或新增 Safe 地址，在 [app.safe.global](https://app.safe.global) 開啟現有的 Safe。 應用案例包括：

- 透過另一瀏覽器或裝置存取同一個「安全儲存空間」
- 與他人將您設為擁有者的保險箱進行互動
- 以唯讀模式檢視保險箱

Safe Wallet 亦支援通訊錄及相關資料的匯入／匯出功能，此功能可在 **設定** 中啟用。 建議在 Safe Wallet 中透過地址或擁有者連結新增保險箱，而非依賴即將停用的 `safe.kaia.io` 使用者介面。

## Common Safe 設定的常見建議

並沒有一種放諸四海皆準的最佳設定——這取決於您的使用情境。 實用的預設值：

**有多少位擁有者？**  
若為團隊，請設定多位擁有者，以便由多人共同審核。 管理較大餘額的個人，通常會使用多台自己的裝置／帳戶以確保冗餘。

**什麼是門檻？**  
請設定大於 1 的門檻，以免單一遭洩露的密鑰就能獨自轉移資金。 約 51% 的擁有者（例如 3 位中的 2 位、5 位中的 3 位）這一門檻有助於系統恢復：其餘的擁有者仍可取代一位遺失的擁有者。

**哪些錢包相容？**  
Kaia 上的 Safe Wallet 可與常見的 EOA 錢包配合使用，例如 [Kaia Wallet](https://docs.kaiawallet.io/) 和 [MetaMask](../../tutorials/connecting-metamask.mdx)。 請查閱 Safe Wallet 的連線流程，以確認目前的錢包清單。

## 更多協助

- [Safe Wallet 協助中心](https://help.safe.global)
- [安全文件](https://docs.safe.global)
