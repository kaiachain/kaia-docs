# 先決條件

在加入驗證員之前，您必須註冊一個**驗證員管理員**帳號，該帳號擁有整體管理權限。 由於此帳戶可以修改與驗證器相關的大部分關鍵資訊，我們**強烈建議**使用多重簽發錢包或具有同等安全保證的錢包作為驗證器管理器。

一般而言，我們建議使用透過 [Safe Wallet](https://app.safe.global)（來自 [Safe](https://safe.global) / Safe Global）建立的多簽名錢包作為驗證者管理器。 本指南的其餘部分假設您正在 Kaia 上使用 Safe Wallet。

:::caution 日落通知

`safe.kaia.io` 將於 **2026 年 8 月 9 日** 停止服務。 今後請使用 [app.safe.global](https://app.safe.global) 上的 Kaia Network 專用 Safe Wallet 來管理您的帳戶。 您現有的「安全帳戶」將自動與「安全錢包」相容。

:::

## 連接安全錢包<a id="connecting-a-safe-wallet"></a>

首先，請依照 [Safe Wallet 使用指南](../../../build/wallets/kaia-safe/kaia-safe.md) 建立一個 Safe 帳戶。 然後將 Validator Management Portal 註冊為 Safe 自訂應用程式。

![新增自訂安全應用程式](/img/nodes/become-a-validator/image02.png)

按一下 \*\* 應用程式 > 我的自訂應用程式 > 新增自訂 Safe App\*\*。

![Paste portal URL](/img/nodes/become-a-validator/image03.png)

遵循 Safe 指南並貼上入口網站的 URL。 確認入口網站資訊在下方顯示正確，檢視後勾選免責聲明核取方塊，然後按一下 **新增**。

![我的自訂應用程式](/img/nodes/become-a-validator/image04.png)

成功新增驗證器管理入口網站後，請前往 \*\* 應用程式 > 我的自訂應用程式\*\*，然後按一下 **Kaia Validators** 卡，即可使用您的 Safe 帳戶開啟入口網站。

![已連接安全錢包](/img/nodes/become-a-validator/image05.png)

進入入口網站後，您會看到左側連接的 Safe wallet。 從現在開始，當您嘗試從入口網站傳送交易時，交易會根據您的多重簽名設定，透過 Safe 簽署和提交。

## 連接另一個錢包<a id="connecting-another-wallet"></a>

:::warning 安全說明

不建議使用沒有多重認證或沒有同等安全保證的錢包作為驗證器管理器。

:::

![連接錢包](/img/nodes/become-a-validator/image06.png)

如果您想使用不同的錢包管理經理帳戶，請按一下 **連線錢包** 以連線。
