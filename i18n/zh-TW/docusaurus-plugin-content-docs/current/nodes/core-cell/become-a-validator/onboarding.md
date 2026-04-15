# 驗證器上線

一旦完成管理員帳戶的設定，您就可以執行鏈上註冊步驟，成為驗證員。 請注意，您必須先執行實際的 Consensus Node (kcn)，才能開始此程序。

要成為 Kaia 驗證員，您需要部署一份投注合約，並提交投注合約地址和其他必要資訊。

:::info 無需許可的第 1 階段 / 第 2 階段

在**無授權階段 1**，上線需要**Kaia 團隊的行政核准**，才能順利運作。 新的驗證員操作員可以提交上線請求，Kaia 團隊會在內部審核程序後完成上線註冊。

從即將推出的 \*\* 無授權階段 2\*\* 開始，資訊可以直接在網路上註冊，無須經過 Kaia 團隊的行政許可。

:::

註冊後，驗證者的資訊會記錄在 **AddressBook** 和 **SimpleBlsRegistry** 契約中，Kaia 節點在達成共識時會參考這些契約。 有關自我驗證器註冊的更多技術細節，請參閱 [KIP-277](https://kips.kaia.io/KIPs/kip-277)。

## 部署您的第一份定倉合約<a id="deploy-your-first-staking-contract"></a>

導覽到 **部署定價合約** 功能表，以部署定價合約。

目前單一押注合約可以註冊多個管理帳戶，但從 \*\* 無授權階段 2\*\* 開始，每個押注合約只允許註冊一個管理帳戶。 因此，我們建議您註冊單一 Kaia Safe 帳戶作為管理員。

在部署盯梢合約之前，您還需要一個額外的臨時帳戶（在管理員之上）來執行部署。 此帳戶稱為 \*\* 合約驗證器\*\*，存在的目的是為了向後相容。 由於盯梢合約管理員帳戶和驗證員管理員帳戶通常是分開的，您可以重複使用驗證員管理員帳戶作為合約驗證員。

定倉合約管理員錢包和臨時合約驗證員錢包必須各自持有少量的 KAIA。 一切準備就緒後，請進行以下步驟。

![Deploy Staking Contract form](/img/nodes/become-a-validator/image07.png)

1. 按一下 **[您是否加入 Kaia 網路？]** 核取方塊。

2. 輸入您事先準備好的合約驗證員帳戶地址。

3. 對於 **Consensus Node ID**，請輸入在 CN 主控台上呼叫 `admin.nodeInfo.nodeAddress` RPC 所傳回的位址。

4. **獎勵位址**取決於您是否使用公開委託。
   - 若要**無需**公開委託即可加入為驗證者，請輸入可直接接收獎勵的地址。
   - 若要在啟用「公開委託」的情況下上機，請按一下「公開委託」\*\*核取方塊。 然後，獎勵會透過公共委託合約自動分發給委託人。

![Public Delegation section](/img/nodes/become-a-validator/image08.png)
![Public Delegation section (cont.)](/img/nodes/become-a-validator/image09.png)

5. 輸入釣魚合約管理位址和多重登入閾值。 如果您輸入 Kaia Safe 錢包位址作為 **管理位址**，並設定臨界值為`1`，多重認證功能將由 Kaia Safe 處理。 如果您輸入多個管理位址，並將臨界值設定為任意值，多重登入功能將在 **Manage Staking** 功能表中處理。

![部署契約按鈕](/img/nodes/become-a-validator/image10.png)

6. 按一下 **[部署契約]** 以執行交易。 合約部署完成後，會出現在 **[未初始化]** 狀態。

## 初始化定價合約<a id="initialize-the-staking-contract"></a>

新部署的盯梢合約必須先初始化，才能使用。 輸入所需資訊，並從每個管理員帳戶發送一筆交易來驗證錢包，然後合約就可以使用了。

![Set Staking Tracker](/img/nodes/become-a-validator/image11.png)

1. 按一下 **[設定盯價追蹤器]**，將盯價追蹤器地址寫入盯價合約。 正確的 Staking Tracker 位址會自動填入。

![Set GC ID](/img/nodes/become-a-validator/image12.png)

2. 從 Kaia 團隊取得 GC ID 並輸入。 按一下 **[設定 GC ID]**，將 GC ID 寫入釣魚合約中。 從 \*\* 無授權階段 2\*\* 開始，GC ID 將自動指定。

![Public Delegation info](/img/nodes/become-a-validator/image13.png)
![Public Delegation info (cont.)](/img/nodes/become-a-validator/image14.png)

3. 如果已啟用公開委託，請輸入相關資訊。 如果在合約部署期間未啟用公開委託，請跳過此步驟。
   1. **業主**：可變更傭金收受人和傭金率的帳戶。
   2. **收取佣金者**：收取佣金的帳戶。
   3. **佣金率**：介於 `0` 和 `10000` 之間的基點值。
   4. **GC Name**：將會顯示為 pdKAIA 記憶體名稱的簡短名稱。 例如，如果 GC 名稱是 `Hello`，公共授權的存放代碼名稱就會變成 `Hello-pdKAIA`。 (範例：[kaiascan search for pdKAIA tokens](https://kaiascan.io/search?tabId=tokens&keyword=pdkaia&page=1))

![審核條件](/img/nodes/become-a-validator/image15.png)

4. 從之前設定的契約驗證器和每個定價契約管理員各傳送一筆交易，以驗證錢包。 依序使用每個錢包登入，然後按一下 **[檢閱條件]**，每個錢包都按一次。

![Deposit & Init (1)](/img/nodes/become-a-validator/image16.png)
![Deposit & Init (2)](/img/nodes/become-a-validator/image17.png)

5. 最後，按一下 **[Deposit & Init]**，完成合約初始化。

## 提交入職申請<a id="submit-an-onboarding-request"></a>

當您回到 **Home** 功能表時，已部署的定置契約會顯示為 \*\*[Initialized]\*\*狀態。

！[初始化後的首頁](/img/nodes/become-a-validator/image18.png)

按一下 **[上線驗證器]**，向 Kaia 團隊提交上線要求。

![Onboard Validator](/img/nodes/become-a-validator/image19.png)

![入職申請表](/img/nodes/become-a-validator/image20.png)

1. 檢視顯示的資訊。
2. 檢視節點資訊。 共識節點 ID\*\* 位址必須至少持有 **10 KAIA**，這是處理 [Gas Abstraction](../../../build/tutorials/ga-tutorial/ga-intro.md) 和 [MEV Auction](../../../build/tutorials/mev-auction-sdk-guide.md) 交易的最低要求。 10 KAIA 不會被扣除；它會在處理這些交易時短暫使用，然後馬上歸還。

![BLS公開金鑰資訊](/img/nodes/become-a-validator/image21.png)

3. 查詢節點的 BLS 公開金鑰資訊，並輸入該資訊。 在 CN 主控台上，呼叫 `admin.nodeInfo.blsPublicKeyInfo` RPC 並輸入傳回的 `publicKey` 和 `pop` 值。

！[提交入職申請](/img/nodes/become-a-validator/image22.png)

4. 按一下 **[提交上線申請]**，以提交上線申請。
