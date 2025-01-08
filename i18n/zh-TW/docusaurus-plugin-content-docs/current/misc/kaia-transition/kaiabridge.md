# Kaiabridge

Finschia 用戶可以按固定交換率將其在 Finshia 網絡上的 FNSA 代幣交換為 Kaia 網絡上的 KAIA 代幣。 這種交換由一套智能合約和程序（統稱為 Kaiabridge）進行調解。

代幣交換過程由 Finschia 用戶將 FNSA 代幣發送到 `fwsap` 模塊開始。 代幣首先從 "cony "交換到 "kei "面值，然後轉移到 "fbridge "模塊。 fbridge "事件由可信中繼器識別，並提交給 Kaia 鏈上的橋接智能合約。 橋接請求分多個步驟處理：

- 飛行中：代幣到達 Finschia 的 "fbridge "模塊，但中繼器沒有向 Kaia 智能合約報告。
- 確認：轉述人向合同（"條款"）提交了申請。 現在，請求進入 30 分鐘的時間鎖定。
- 已認領：時間鎖定到期後，令牌已被轉移（"認領"）到 Kaia 鏈上的目標賬戶。

Kaiabridge 智能合約內置多重簽名功能。 例如，需要操作員賬戶進行多次備付交易，申請才能得到確認。 每個操作員賬戶由一箇中繼器持有，中繼器由 Kaia 基金會和 Finschia 基金會管理。

您可以在 [kaiachain GitHub](https://github.com/kaiachain/kaia/tree/dev/contracts/contracts/system_contracts/kaiabridge) 中找到合同源代碼，在 [合同地址](https://docs.kaia.io/references/contract-addresses/) 頁面中找到部署地址。
