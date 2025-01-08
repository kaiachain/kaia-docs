# 使用事務生成器

這是 Kaia Safe 中的一個自定義應用程序，負責批處理交易。 這意味著您可以將幾筆交易捆綁在一起，而不必一筆接一筆地確認。 您只需確認並執行一次。

有了事務生成器，您就可以將從代幣轉賬到複雜的合約交互等各種事務組合在一起，並將它們批量合併到單個事務中。

## KAIA Token Transfer <a id="token-transfer"></a>

您可以按照以下步驟，使用事務生成器執行令牌轉移：

**步驟 1：** 導航至安全應用程序並打開交易生成器安全應用程序

![](/img/build/tools/kaia-safe/ks-tx-builder.png)

**第 2 步：** 輸入收件人錢包地址。 For this guide, kindly skip the ABI field as we are trying to execute KAIA transfer transaction.

![](/img/build/tools/kaia-safe/tx-builder-token-recipient-addr.png)

**Step 3:** Enter the KAIA value you want to send.

> Note: In this guide, we are sending 1 KAIA, so we entered 1 in the **KAIA value** input field. You can input any amount here, depending on your Safe's KAIA balance.

![](/img/build/tools/kaia-safe/tx-builder-token-trf-value.png)

**步驟 4：** 點擊添加交易。

**步驟 5：** 對每個收件人地址重複步驟 2、3 和 4。

**步驟 6：** 將所有操作添加到批次後，單擊 "創建批次"。

![](/img/build/tools/kaia-safe/token-trf-tx-builder.gif)

**第 7 步：** 審查並提交交易

您可以查看整個批次。 準備就緒後，單擊 "發送批次"，即可像其他安全交易一樣提交和執行交易。

## 合同互動<a id="contract-interactions"></a>

比方說，您想向一長串地址空投令牌，比如向 5 個地址空投 10 個 CCT 令牌。 交易生成器可將所有這些轉賬合併到一個交易中，而無需創建 5 個交易，保險箱的所有者必須一個接一個地確認和執行這些交易。

在本指南中，我們將 CCT 代幣鑄造到安全地址，以作說明。

讓我們使用事務生成器開始這個示例！

**步驟 1：** 打開安全應用程序。

![](/img/build/tools/kaia-safe/ks-tx-builder.png)

**步驟 2：** 打開交易生成器安全應用程序

![](/img/build/tools/kaia-safe/ks-use-tx-builder.png)

**第 3 步：** 輸入您的**令牌合同地址**和**ABI**。

在本例中，將使用 CCT 合同地址和 ABI。 您可以將 ABI 複製並粘貼到 **輸入 ABI** 字段中。

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-init.gif)

**第 4 步：** 選擇一種方法並填寫交易信息

您可以從下拉菜單中選擇一種方法。 在這種情況下，我們選擇**轉移**方法。 要完成這一步，您必須填寫交易信息，如 **收件人（地址）** 和 **金額（uint256）**。

注：數值為無符號整數，不含小數。 在這個例子中，CCT 標記有 18 個小數。 因此，如果要發送 10 個 CCT，就必須輸入 10000000000000000000。

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-details.gif)

**第 5 步：** 點擊**添加交易**

**步驟 6：** 對每個收件人地址重複步驟 **4**、**5** 和 **6**。

**第 7 步：** 將所有操作添加到批次後，單擊**創建批次**。

![](/img/build/tools/kaia-safe/kaia-safe-tx-builder-batch.gif)

**第 8 步：** 審查並提交交易

您可以查看整個批次。 準備就緒後，點擊**發送批次**，即可像其他安全交易一樣提交和執行交易。
