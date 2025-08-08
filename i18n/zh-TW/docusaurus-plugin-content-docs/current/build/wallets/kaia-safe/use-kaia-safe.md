# 使用 Kaia Safe

## 創建安全

在這裡，您將瞭解到如何在 Kaia 網絡上創建 Safe 並評估其益處。

**步驟 1：** 導航至 [Kaia Safe App](https://safe.kaia.io/)。 通過在網絡瀏覽器上導航到應用程序，您可以探索 Kaia Safe 的功能。

**步驟 2：** 連接 [錢包](https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/)。 目前，Kaia Safe 支持多種錢包，如 [Kaia Wallet](https://docs.kaiawallet.io/)、[MetaMask](../../../tutorials/connecting-metamask.mdx) 錢包等。

在本指南中，我們將使用 MetaMask。 確保您的 MetaMask 錢包已添加 Kaia 網絡（[Mainnet](../../../tutorials/connecting-metamask.mdx#connect-to-kaia-network)或 [Kairos Testnet](../../../tutorials/connecting-metamask.mdx#connect-to-kaia-network))，以便成功連接。

![](/img/build/tools/kaia-safe/kaia-safe-connect-wallet.png)

**第 3 步：** 連接錢包後，點擊**創建賬戶**，併為新保險箱命名。 這個名字與您的安全賬戶相連，安全賬戶是一個多簽名錢包，可以保存和存儲您的所有資金。

**第 4 步：** 輸入有權提交和批准交易的地址，添加所有者/簽名者。 您可以添加任意數量的簽名者，也可以隨時刪除或替換任何簽名者。

**第 5 步：** 選擇安全賬戶交易需要多少次簽名確認才能獲得批准。 需要注意的是，我們的應用程序默認情況下只允許一個簽名者確認。 但建議使用大於 1 的閾值，以確保賬戶安全可靠。 良好的做法是以業主總數的 51% 為界限，例如三分之二、五分之三等，如下圖所示：

![](/img/build/tools/kaia-safe/kaia-safe-create-acct.gif)

**第 6 步：** 審查並部署安全系統

一旦您對 Safe 的所有參數完全滿意，您就可以提交創建 Safe 賬戶，並按照屏幕上的說明完成賬戶創建。

![](/img/build/tools/kaia-safe/kaia-safe-create-review.gif)

恭喜您成功創建 Kaia Safe 賬戶！

## 增加資產

在本節中，您將瞭解如何將資產（KAIA、FT、NFT）添加到安全賬戶並確保資金安全。

### KAIA 存款

以下是將 **KAIA** 添加到您的安全賬戶的步驟

**步驟 1：** 從賬戶控制面板複製您的安全地址。

![](/img/build/tools/kaia-safe/ks-deposit-copy-addr.png)

**步驟 2：** 打開 Metamask 錢包，點擊**發送**，將資產發送到您的安全賬戶。

請注意，將資產發送到 Safe 賬戶有不同的方法。 您可以通過 [硬件錢包](https://www.ledger.com/academy/crypto-hardware-wallet)、[網絡錢包](https://medium.com/arcana-network-blog/why-web-wallets-e77c776e4d5e) 甚至智能合約發送。 在本例中，我們使用的是名為 MetaMask 的網絡錢包。

![](/img/build/tools/kaia-safe/ks-token-send-btn.png)

**第 3 步：** 在搜索欄中輸入您的安全地址，如下所示。

**步驟 4：** 輸入**金額**，然後點擊**下一步**。

![](/img/build/tools/kaia-safe/ks-token-send-details.png)

**第 5 步：** 確認交易並查看資產儀錶板。 您可以看到從 metamask 賬戶轉入 Kaia Safe 賬戶的金額。

![](/img/build/tools/kaia-safe/kaia-safe-klay-bal.png)

### KIP-7 存款

現在，我們來看看如何通過以下步驟將 KIP7（可替代代幣）存入我們的保險箱。

**步驟 1：** 從賬戶控制面板複製您的安全地址。

![](/img/build/tools/kaia-safe/ks-deposit-ft-copy.png)

**步驟 2：** 打開 Metamask 錢包，導航至**資產**選項卡。

**第 3 步：** 選擇您喜歡發送的令牌，然後點擊**發送**。

![](/img/build/tools/kaia-safe/ks-ft-send-btn.png)

**步驟 4：** 重複上述**KAIA**存款的步驟**3**、**4**、**5**。

![](/img/build/tools/kaia-safe/ks-ft-send-details.png)

**第 5 步：** 查看您的資產儀錶板，您可以看到 KIP7 代幣正在轉入您的安全賬戶。 同樣，您也可以將任何 Fungible 代幣轉入您的安全賬戶。

![](/img/build/tools/kaia-safe/ks-ft-balance.png)

### KIP-17 (NFTs) 存款

現在，我們來看看如何按照以下步驟將 KIP17（不可兌換代幣）存入我們的保險箱。

您可以通過多種方式將 NFT 轉入您的安全賬戶。 下面是一個如何使用 [OpenSea](https://opensea.io/about) 將 NFT 轉入安全賬戶的示例。

1. 導航至您的 [OpenSea 帳戶](https://testnets.opensea.io/account) 資料頁面
2. 導航至您喜歡轉接的 NFT。 確保選擇 Kaia 網絡（主網或 Kairos）上的 NFT
3. 在下一頁，點擊傳輸按鈕。
4. 將保險箱地址粘貼到文本框中，然後傳輸到保險箱
5. 在 Kaia Safe 的 "資產 "部分，您可以找到 OpenSea 的 NFT。

![](/img/build/tools/kaia-safe/kaia-safe-trf-nft.gif)

有關轉移 NFT 的更多詳情，請參閱 OpenSea 提供的 [指南](https://support.opensea.io/en/articles/8866959-how-can-i-transfer-an-nft-using-opensea)。

## 發送資產

在本節中，您將學習如何從 Kaia Safe 賬戶發送 KAIA 和 KIP-7 令牌。

### 發送 KAIA 和 KIP7 令牌<a id="Send KAIA from Safe"></a>

**步驟 1：** 點擊側邊菜單中的**新交易**按鈕，選擇**發送代幣**，開始新的資產轉移。

![](/img/build/tools/kaia-safe/kaia-safe-init-send-token.gif)

**第 2 步：** 選擇要轉移的資產。

- **KAIA**

> 注意：添加**收件人地址**和**要轉移的 KAIA 金額**。

![](/img/build/tools/kaia-safe/kaia-safe-send-token-details.gif)

- **KIP-7令牌**

在資產下拉菜單中選擇要發送的代幣，如上圖所示。

> 備註： 新增 **收件者地址** 和 **要傳輸的代幣數量**。

**第 3 步：** 審查並提交交易。 您需要用簽名者錢包簽署交易，一旦達到確認閾值，交易就會執行。

![](/img/build/tools/kaia-safe/kaia-safe-review-send-tokens.gif)

### 發送 NFT<a id="Send NFTs from Safe"></a>

在本節中，您將學習如何從 Kaia Safe 賬戶發送不可兌換的代幣。

**步驟 1：** 單擊側菜單中的**新交易**按鈕，選擇**發送 NFT**，開始新的資產轉賬。

![](/img/build/tools/kaia-safe/kaia-safe-init-send-nft.gif)

**第 2 步：** 選擇要轉移的資產。

![](/img/build/tools/kaia-safe/kaia-safe-send-nft-details.gif)

**第 3 步：** 審查並提交交易。 您需要用簽名者錢包簽署交易，一旦達到確認閾值，交易就會執行。

![](/img/build/tools/kaia-safe/kaia-safe-review-send-nft.gif)

## 其他說明<a id="Points to Note"></a>

在使用 Kaia Safe 時，您需要注意以下事項：

### 交易費用<a id="Transaction Fees"></a>

Kaia Safe 交易，無論是資產轉移還是合同互動，都會產生一筆費用，這筆費用將由執行交易的簽名者（通常是達到所需簽名門檻的最後一個簽名者）支付。

### 安全 Nonce<a id="Safe Nonce"></a>

出於安全考慮，使用 Safe 進行的交易必須按順序執行。 為此，我們為事務分配了一個名為 "**nonce**"的數字，以確保每個事務只能執行一次。

![](/img/build/tools/kaia-safe/ks-nounce.png)

在任何給定的時間內，只能執行nonce為_上一次執行的事務+1_的事務。 非ce 值較高的事務將排隊等待執行。 因此，每當一個事務完成後，只要隊列中的下一個事務積累了足夠的簽名，就可以執行。

![](/img/build/tools/kaia-safe/ks-pending-tx.png)

### 特定連鎖店地址<a id="Chain-specific addresses"></a>

您可以選擇複製帶鏈前綴的地址

- 複製帶鏈前綴的地址：

![](/img/build/tools/kaia-safe/ks-chain-spec-addr.png)

從儀錶板複製安全地址粘貼到錢包時，如上圖所示，您可以點擊複選框選擇是否添加鏈名。 建議您不要選中它，以避免出現以下錯誤。

![](/img/build/tools/kaia-safe/ks-chain-addr-err.png)