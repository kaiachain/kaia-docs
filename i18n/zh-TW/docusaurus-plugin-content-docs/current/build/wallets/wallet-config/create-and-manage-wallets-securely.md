# Kaia Chain 上的安全錢包管理：開發人員手冊

## 導言<a id="introduction"></a>

### 這本食譜的對象<a id="who-is-this-cookbook-for"></a>

歡迎來到 Kaia 安全錢包 Cookbook。 本指南是為在 Kaia 區塊鏈上建置的開發人員、工程師和團隊而寫。 無論您是要建立您的第一個分散式應用程式 (dApp)、部署自動化服務或管理金庫，這本烹飪手冊都提供了以安全第一的思維來處理加密金鑰和錢包的基本秘訣。

### 如何使用本烹飪手冊<a id="how-to-use-this-cookbook"></a>

本烹飪手冊遵循循序漸進的學習路徑：

- **[Part 1](create-and-manage-wallets-securely.md#part-1-foundational-concepts--security-principles)** 建立您需要瞭解的安全基礎。
- **[第 2 部分](./create-and-manage-wallets-securely.md#part-2-practical-recipes-for-wallet-management)** 提供從基本到進階方案的實作配方。

每個配方都建立在前幾節的概念上。 Web3 安全新手？ 從 [Chapter 1](./create-and-manage-wallets-securely.md#chapter-1-the-principles-of-private-key-security) 開始。 經驗豐富的開發人員？ 跳至符合您使用情況的配方

### 核心理念：安全第一<a id="core-philosophy-security-first"></a>

在 Web3 中，_不是您的金鑰，不是您的密碼_這句話是最基本的真理。 對開發人員而言，這延伸至軟體開發生命週期的每個環節。 單單一個洩露的金鑰，就可能對使用者和專案造成災難性的損失。 本指南的核心理念是**安全第一**。 每項秘訣和建議都是為了協助您建立穩健、安全的預設系統，從第一天開始就將攻擊表面最小化並保護資產。

### 先決條件 <a id="prerequisites"></a>

要充分利用本烹飪手冊，您應該對區塊鏈概念（如公鑰/私鑰、交易、瓦斯費）有基本的瞭解，並能自如地使用命令列介面。

## 第 1 部分：基礎概念與安全原則 <a id="part-i-foundational-concept-and-security-principles"></a>

本部分著重於安全錢包管理背後的\*原因。 它建立了在編寫任何程式碼之前所需的核心知識。

### 第 1 章：私密金鑰安全原則<a id="chapter-1-the-principles-of-private-key-security"></a>

#### 1.1. 瞭解關鍵對：帳戶的核心 <a id="understanding-key-pairs-the-heart-of-your-account"></a>

在 Kaia 上，與其他 EVM 相容的連鎖店一樣，您的帳號不是使用者名稱和密碼。 它是一對加密金鑰：一個 \*\* 公開金鑰\*\* 和一個 \*\* 私密金鑰\*\*。 公開金鑰會衍生出您的公開位址，就像您的銀行帳號一樣，可以安全分享。 私密金鑰是授權您帳戶所有動作的秘密，例如簽署交易或訊息。 這是需要保護的最重要資訊。 任何擁有您私人密碼匙的人都可以完全且不可逆轉地控制您的帳戶及其資產。

#### 1.2. 安全的金鑰產製：Kaia 的最佳實作 <a id="secure-key-generation-best-practices-for-kaia"></a>

安全金鑰是隨機產生的金鑰。 您帳戶的安全性取決於數學上不可能有人猜到您的私人密碼匙。 請務必使用經過嚴格審核的標準加密函式庫來產生金鑰，例如內嵌在 `ethers-ext` 中的函式庫或本指南中討論的工具。 切勿嘗試自行製作「聰明」或「人類可讀」的私人密碼匙，因為這會大幅降低其隨機性，使其容易被猜中。

#### 1.3. 安全金鑰儲存：從本地金鑰庫到生產金鑰庫 <a id="secure-key-storage-from-local-keystores-to-prodduction-vaults"></a>

如何儲存私人密碼匙與如何產生私人密碼匙同樣重要。 將私人密碼匙儲存在明文檔案中，等同於將您的銀行密碼寫在便條上，然後放在螢幕上。

:::warning
**警告：切勿以純文字儲存私人金鑰** `.env`檔案。 .env 檔案雖然方便開發，但經常會誤提交到版本控制中，公開暴露金鑰，導致資金立即被盜。
:::

安全本機儲存的標準是**加密的 keystore 檔案** (有時也稱為 JSON keystore)。 此檔案包含您的私人密碼匙，但會以您選擇的強密碼進行加密。 要使用金鑰，您必須在記憶體中提供 keystore 檔案和密碼來解密。 對於生產系統，最佳做法是使用 AWS KMS 或 Google Cloud KMS 等專用 \*\* 秘書管理器\*\*，以確保金鑰不會直接暴露於應用程式程式碼。

#### 1.4. 處理記憶體中的鍵：在執行時盡量減少暴露 <a id="handling-keys-in-memory-minimizing-exposure-during-runtime"></a>

即使從安全來源載入，您的應用程式記憶體中也必須存在私人金鑰，才能簽署交易。 盡量減少這種暴露是至關重要的。 良好的應用程式設計可確保密鑰在記憶體中保留的時間盡可能短，並在使用後立即清除。 本烹飪手冊中的圖書館和食譜就是遵循這個原則設計的。

### 第 2 章：Kaia 電子錢包生態系統導航 <a id="chapter-2-navigating-the-kaia-wallet-ecosystem"></a>

#### 2.1. Kaia 皮夾

[Kaia Wallet](https://docs.kaia.io/build/tools/wallets/kaia-wallet) 是 Kaia 生態系統的原生瀏覽器延伸錢包。 雖然它與 MetaMask 分享許多功能，但它已針對 Kaia 進行最佳化，支援獨特的交易類型、費用委託交易以及特定於網路的帳戶系統，並在網路中提供無縫的使用者體驗。 對開發人員而言，瞭解其特定行為和 API 是建立順暢 dApp 整合的關鍵。

#### 2.2. 冷儲存：硬體錢包概述

冷儲存是指將私人密碼匙保存在未連接到網際網路的裝置上。 硬體錢包\*\*是為此目的而建立的實體裝置。 它會在內部簽署交易，而不會向連接的電腦公開私密金鑰。 這使得它們成為保護高價值資產的黃金標準。 本指南將著重於官方支援的 [DCENT](https://docs.kaia.io/build/tools/wallets/hardware-wallets/dcent) 和 [SafePal](https://docs.kaia.io/build/tools/wallets/hardware-wallets/safepal-s1) 硬體錢包。

#### 2.3. 多重簽名錢包：Kaia Safe 簡介

多重簽署（或稱「多重簽署」）錢包是一種智慧型契約，需要多個私人金鑰核准交易後才能執行。 例如，2-of-3 多重簽位需要三位指定所有者中的兩位批准。 這是管理團隊資金、金庫和重要智慧型契約管理的標準，因為它可以防止單點故障。 [Kaia Safe](https://docs.kaia.io/build/tools/wallets/kaia-safe/use-kaia-safe) 是 Kaia 網路上主要的多重認證解決方案。

## 第二部分：錢包管理實用配方

現在您已瞭解 [第 1 部分](./create-and-manage-wallets-securely.md#part-1-foundational-concepts--security-principles) 中的基本安全原則，是時候將它們付諸實踐了。 本節針對實際情況提供逐步指導，從個別的開發設定開始，到生產級解決方案。

**您將建構：**\*

- Foundry 和 Hardhat 的安全開發環境
- 適用於團隊協作的多重簽名財資設定
- dApp 與各種錢包類型的整合

### 第 3 章：個別開發者與 dApp 的設定

本章提供在開發過程中設定和管理錢包的實作指南，從第一行程式碼開始就強調安全性。

#### 3.1. 食譜：您的第一個 Kaia 開發錢包

如果您是 Kaia 的新使用者或第一次設定 Kaia 钱包，我們建議您參考 [開始使用錢包](./configure-wallet-for-kaia-networks.mdx#configure-kaia-wallet-for-kaia) 章節。 它涵蓋了基本步驟，例如安裝錢包、安全地建立和備份您的帳戶、新增額外帳戶，以及為錢包注資。

#### 3.2. 配方：在 Foundry 專案中安全管理帳戶

使用 [Foundry](https://book.getfoundry.sh)，您可以透過 [cast wallet](https://getfoundry.sh/cast/reference/cast-wallet-import) CLI 匯入加密的錢包。 雖然加密其他值 (例如 RPC URL) 目前尚不可用，但結合加密金鑰與環境變數仍可提供安全的設定。

##### 步驟 1：安裝並初始化 Foundry

如果您尚未安裝 foundry，請在終端機執行下列指令：

```bash
curl -L https://foundry.paradigm.xyz | bash
```

然後，執行下列指令初始化一個 Foundry 專案：

```bash
foundryup
forge init foundry-encrypted
cd foundry-encrypted
```

現在您應該有一個含有 foundry 預設範本的資料夾。

##### 步驟 2：匯入您的錢包

您可以使用 cast wallet CLI 匯入一個錢包。 只需將 **your-wallet-name** 替換為所需的錢包名稱，然後執行以下指令：

```bash
cast wallet import your-wallet-name --interactive
```

輸入私人密碼匙後，系統會提示您設定加密密碼。 加密的金鑰會儲存在您本機的 keystore 中，預設路徑為 **~/.foundry/keystore** 。

:::note
交互式標記 - - 用於防止私密金鑰被保存在終端機記錄中。
:::

![](/img/build/wallets/foundry-cast-interactive.png)

##### 步驟 3：建立環境檔案並將其原始碼化

加密您的錢包後，您需要安全地儲存 RPC 端點。 Foundry 目前尚未為 RPC URL 等值提供加密功能，因此使用 .env 檔案是此類秘密值的常見且較安全的選擇。

在專案的根目錄中建立一個 `.env` 檔案，並加入您的 `KAIROS_RPC_URL`：

```js
KAIROS_RPC_URL=https://responsive-green-emerald.kaia-kairos.quiknode.pro
```

並在執行腳本之前載入：

```bash
source .env
```

###### 步驟 4：執行您的腳本

我們完成了錢包匯入，並將 RPC 端點加入我們的設定。 現在我們準備執行指令碼並部署契約。

預設的 Foundry 模版包含部署 Counter 合約的範例指令碼。 您應該修改這個腳本，使用您自己的錢包名稱和 RPC 端點。

當您使用 _forge create_ 或 _forge script_ 執行指令碼時、

- 終端機將提示您輸入用於加密私人密碼匙的密碼。
- 輸入密碼後，foundry 會執行您的指令碼並部署您的合約。

###### 使用鍛造創建

```bash
forge create --rpc-url $KAIROS_RPC_URL src/Counter.sol:Counter --broadcast --account your-wallet-name
```

![](/img/build/wallets/foundry-create-encrypted-secret-deployment.png)

###### 使用偽造腳本

```bash
forge script script/Counter.s.sol:CounterScript --rpc-url $KAIROS_RPC_URL --account your-wallet-name --broadcast
```

![](/img/build/wallets/foundry-script-encrypted-secret-deployment.png)

恭喜你 您已成功在 Foundry 中設定加密機密，並在部署腳本中使用它們。

#### 3.3. 配方：安全管理硬帽專案中的帳戶

[Hardhat 3](https://hardhat.org/hardhat3-alpha) (目前為 alpha 版) 透過內建的機密管理器，引入加密機密。 此功能支援安全地儲存任何基於字串的敏感秘密，例如私人金鑰或 RPC URL，以及不應該提交到版本控制的 API 金鑰。

:::note
Hardhat 3 正處於 alpha 狀態，可能尚未完全穩定。 在穩定版本正式發行之前，請謹慎使用
:::

##### 步驟 1：建立新的 Hardhat 專案

在終端機執行下列指令，建立新的 Hardhat 專案。

```bash
mkdir hardhat-encrypted && cd hardhat-encrypted
npm init -y
npx hardhat@next --init
```

:::note
在 npx 指令中加入 @next 可以取得 Hardhat 最新的標籤預發版本，在撰寫本文時是 `3.0.0-next.20`。
:::

接受提示的預設答案。 然後執行 Hardhat 版本來驗證專案版本：

```bash
npx hardhat --version
```

##### 步驟 2：設定加密的秘密

若要儲存 RPC URL，請執行下列指令：

```bash
npx hardhat keystore set KAIROS_RPC_URL
```

![](/img/build/wallets/hh-keystore-rpc.png)

若要以加密方式儲存您的私人密碼，請執行下列指令：

```bash
npx hardhat keystore set PRIVATE_KEY
```

![](/img/build/wallets/hh-keystore-pk.png)

##### 步驟 3：驗證加密的秘密

若要驗證您的機密已加密，請執行下列指令：

```bash
npx hardhat keystore list
```

您應該會在加密機密清單中看到您的「KAIROS_RPC_URL」和「PRIVATE_KEY」。

若要再次擷取秘密值，請執行以下指令。 系統會提示您輸入主密鑰進行解密。

```bash
npx hardhat keystore get KAIROS_RPC_URL
```

設定好機密後，請更新您的組態檔案，以便在專案中安全地引用這些機密。

##### 步驟 4：在組態中參照秘密

開啟 `hardhat.config.ts`，更新 networks 區段以引用您的加密秘密。 如果您的秘密名稱不同，請相應調整項目。

```javascript
import { configVariable } from "hardhat/config";
module.exports = {
  networks: {
    kairos: {
      url: configVariable("KAIROS_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
};
```

現在，您可以在部署腳本中使用加密的機密，而無需以明文形式公開。

##### 步驟 5：在部署指令碼中使用加密的秘密

使用以下指令，透過 **ignition/modules** 中的「Counter.ts」模組部署您的契約。 此模組會部署 `Counter.sol` 並以值 5 來呼叫 `incBy` 函式。

```bash
npx hardhat ignition deploy --network kairos ignition/modules/Counter.ts
```

執行此指令會觸發 Hardhat 的提示，要求您輸入之前建立的密碼。

之所以需要這樣做，是因為 kairos 網路配置了一個 keystore。 只有在您的任務或指令碼依賴加密機密時，才會提示您。 輸入密碼後，Hardhat 會繼續部署您的契約，並執行 `incBy` 函式，其值為 5。

![](/img/build/wallets/hh-encrypted-secrets-deployment.png)

恭喜您 您已成功在 Hardhat 中設定加密機密，並在部署指令碼中使用它們。

#### 3.4. 配方：將硬體錢包 (SafePal) 連接到 dApp

在本節中，您將學習如何將 SafePal S1 硬體錢包連接到第三方去中心化應用程式（DApp），並為交易請求簽名。

##### 步驟 1：設定 Safepal S1 電子錢包

在連接到任何 DApp 之前，請確保您的 SafePal S1 裝置已正確設定。 如果您尚未安裝，請遵循 [本安裝指南](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752-How-to-Set-Up-a-S1-Hardware-Wallet)。

如果您的裝置已經設定，您可以跳過此步驟。

##### 步驟 2：將 S1 裝置與 SafePal App 配對

SafePal S1 是一個完全離線的硬體錢包，這意味著它不能直接連接到互聯網或與區塊鏈網路通信。 要與 dApps 互動或簽署交易，裝置必須與 SafePal App 配對。

SafePal App 擔任中介角色 - 擷取區塊鏈資料、廣播交易並轉播 dApp 互動，同時確保您的私密金鑰安全地儲存在離線 S1 裝置上。

若要完成配對程序，請遵循此 [配對指南](https://safepalsupport.zendesk.com/hc/en-us/articles/18607468345627--How-to-Pair-the-S1-Pro-Hardware-Wallet-with-the-SafePal-App)。

##### 步驟 3：連接至 dApp。

在這個步驟中，您將使用 WalletConnect 將 SafePal S1 硬體錢包連接到去中心化應用程式 (dApp)。

在本指南中，我們將以 Kaia 領先的去中心化交易所 (DEX) [DragonSwap](https://dgswap.io) 為範例 dApp。 連線將使用 WalletConnect 透過瀏覽器進行。

1. 在瀏覽器中輸入 dApp URL，啟動 DragonSwap dApp，然後點擊網站右上角的**連接錢包**按鈕。

![](/img/build/wallets/sp-hw-dgswap-cw.png)

2. 在所有連線選項中，按一下 **Wallet Connect**。 螢幕上會顯示 QR 代碼。

![](/img/build/wallets/sp-hw-dgswap-wc.png)

3. 使用 SafePal App 掃描 QR 代碼。 按一下 App 主頁面右上方的掃描按鈕，即可進入掃描程序。

![](/img/build/wallets/sp-hw-dgswap-sp-app-scan.jpg)

4. 掃描成功後，在 App 中確認與 dApp 的連線，並點選 **同意**。

![](/img/build/wallets/sp-hw-dgswap-sp-app-connect.jpg)

5. 那麼您就成功地在瀏覽器中連接了錢包和 DragonSwap dApp！ 您的錢包地址現在應該顯示在 DragonSwap 連接元件中。

![](/img/build/wallets/sp-hw-dgswap-connected.png)

##### 步驟 4：執行交易

在本節中，我們將執行一筆交易，將 KAIA 交換成 USDT。 導航至 [Swap](https://dgswap.io/swap/) 頁面。

1. 填寫您的交換訂單並按一下 \*\* 交換\*\* 按鈕。 在繼續交易之前，請務必確認交換。

![](/img/build/wallets/sp-hw-dgswap-trade.png)

2. 開啟您的 SafePal 應用程式，您應該會看到交易確認頁面。 按一下 \*\* 同意\*\* 繼續交易。

![](/img/build/wallets/sp-hw-swap-sp-app-agree.jpg)

3. 開啟您的 S1 裝置掃描 QR 代碼並簽署交易

![](/img/build/wallets/sp-hw-swap-sign.jpg)

4. 輸入您的 S1 裝置 PIN 碼，並在插入密碼後，按一下 SafePal App 中的 \*\* 下一步\*\*。

![](/img/build/wallets/sp-hw-swap-pincode.jpg)

5. 從 SafePal App 掃描 S1 裝置上顯示的動態 QR 代碼。 這樣做可確保應用程式收到 QR 碼中包含的簽章，並準備將交換交易廣播至區塊鏈 (Kaia)。

![](/img/build/wallets/sp-hw-scan-swap-sp-app.jpg)

6. 簽署完成後，您會看到一個彈出視窗，以廣播交易。 之後按一下 **確認**。

![](/img/build/wallets/sp-hw-swap-sp-app-broadcast.jpg)

7. 交易確認後，**交易成功**的彈出視窗將會出現，如下所示。

![](/img/build/wallets/sp-hw-dgswap-tx-success.png)

![](/img/build/wallets/sp-hw-after-swap-asset-bal.jpg)

恭喜您 您已成功簽署了一筆交易，並通過 walletconnect 使用您的 SafePal 硬體錢包將交易廣播到第三方 dApp 的區塊鏈上。

### 第 4 章：進階與生產級設定

本章涵蓋在安全風險最高的生產環境中保護資產和自動化作業的秘訣。

#### 4.1. 配方：使用 Kaia Safe 設定多重簽名 Treasury

Kaia Safe 可讓開發人員建立一個可由多位擁有者控制的帳戶，大幅提升安全性。

您絕不應該使用一般的錢包來管理大量資金、協定的權限或所有權控制。 太多專案因基本的錢包安全失敗而受到影響。 無論您是要推出下一個大型 DeFi 協定、管理 DAO 金庫或保護貴重資產，多重簽章錢包絕對是不可或缺的。

在本指南中，您將學習如何使用 Kaia Safe 在 Kaia 上建立一個保險箱、設定其擁有者和審批門檻，以及執行基本交易。

##### 建立安全的錢包

1. 請造訪 [Kaia Safe App](https://app.safe.global/welcome)。

![](/img/build/wallets/ks-welcome-page-sw.png)

2. **連接您的錢包**。 選擇您要連線到 Kaia Safe 網站的錢包類型。 在本指南中，我們將使用 Kaia Wallet。

![](/img/build/wallets/ks-connect-wallet-sw.png)

3. **命名您的保險櫃**。 連線您的錢包後，按一下 **Create Account**，並命名您的 Kaia Safe。

![](/img/build/wallets/ks-add-safe-name.png)

4. **設定簽署人**。 設定 Kaia Safe 帳戶中的交易需要多少簽名者確認才能通過。  良好的做法是使用佔總業主 51% 的臨界值，例如 _2佔 3_、_3 佔 5_等，如下所示。

![](/img/build/wallets/ks-add-signers-sw.png)

5. **部署您的 Kaia Safe 帳戶**。 當您完全滿意 Kaia Safe 的所有參數後，按一下 \*\* 建立\*\*，以提交建立您的 Kaia Safe 帳戶。

![](/img/build/wallets/ks-review-create-safe-sw.png)

6. **使用您的錢包**。 按一下 **開始使用 KaiaSafe Wallet** 按鈕。

![](/img/build/wallets/ks-start-using-wallet-sw.png)

7. **進入 Kaia Safe 智慧合約錢包的使用者介面**，如下所示。

![](/img/build/wallets/ks-safe-ui-sw.png)

恭喜您成功建立 Kaia Safe 帳戶！

##### 執行基本交易（傳送原生代幣）

在本節中，您將學習如何執行基本交易，例如從 Kaia Safe 帳戶傳送原生代幣 KAIA 到受益人地址。

確保您的 Kaia Safe 帳戶有足夠的資金。 您可以參考本指南，瞭解如何 [存款](https://docs.kaia.io/build/tools/wallets/kaia-safe/use-kaia-safe/#add-assets) 到您的 Safe 帳戶。

步驟 1：按一下側邊功能表中的**新交易**按鈕，然後選擇**傳送代幣**，開始新的資產轉移。

![](/img/build/wallets/ks-new-tx-sw.gif)

步驟 2：選擇要轉移的資產。 加入**收件人地址**和要轉帳的**KAIA**金額。

![](/img/build/wallets/ks-send-details-sw.gif)

步驟 3：檢閱並提交交易。 您需要用簽署人錢包簽署交易，一旦達到確認臨界值，交易就會被執行。

![](/img/build/wallets/ks-review-send-tx-sw.gif)

#### 4.2. 配方：整合 Kaia Safe 以執行重要的智慧型契約作業

在本指南中，您將學習如何指定 Kaia Safe 帳戶為智慧契約中的管理員。 您也將看到如何使用 Kaia Safe 帳戶執行權限函數，例如 **setTokenPrice()** 和 **pause()**，以確保只有核准的簽章者才能執行權限動作。

##### 先決條件

- [Metamask](https://metamask.io/download)
- [Remix IDE](https://remix.ethereum.org)
- 從 [水龍頭] 取得測試 KAIA(https://faucet.kaia.io)

##### 步驟 1：導航至 [Remix IDE](https://remix.ethereum.org/)

##### 步驟 2：編譯並部署代幣合約範例

您必須先部署契約，才能在多重簽證錢包中與契約互動 - 呼叫特權函式。 我們要做的第一件事就是在部署時，將我們新建立的 Kaia Safe 帳戶設定為代幣合約的 \*\*初始擁有者。

![](/img/build/wallets/ks-succor-deploy.gif)

此樣本代用幣合約包含一些特權函數，例如 **setTokenPrice()**、**pause()**，這些函數只能由 Kaia Safe 帳戶呼叫。 接下來我們要做的就是相應地執行這些動作。 我們可以使用 Transaction builder 或使用 Kaia Safe API Kit 程式化。

##### 步驟 3：啟動新交易

###### 使用交易建立程式

若要與安全錢包中的智慧型契約互動，請點選 **New Transaction**。 要完成此步驟，您將需要您已部署的合約地址和 ABI，如上一步所示。

![](/img/build/wallets/ks-succor-init-tx.gif)

###### 使用 Kaia Safe API 套件

在本節中，您將使用 Kaia Safe API 套件，以程式化的方式提出一個呼叫 **setTokenPrice** 函式的交易，收集 Safe 帳戶所有者的簽名，並執行交易。

**先決條件**

- [Node.js 與 npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- 有多位簽名者的保險箱

\*\* 設定環境\*\*

\*\*步驟 1：建立專案目錄。

複製並貼上此指令到您的終端機，以建立專案資料夾。

```bash
mkdir kaia-safe-api-contract-example
cd kaia-safe-api-contract-example
```

\*\*步驟 2：初始化 npm 專案。

複製並貼上此指令到您的終端機，以建立 `package.json` 檔案。

```bash
npm init -y
```

**步驟 3：安裝相依性.**

使用 API-Kit 就像執行以下安裝指令一樣簡單：

```bash
npm install --save-dev @safe-global/api-kit@2.4.2 @safe-global/protocol-kit@4.0.2 @safe-global/safe-core-sdk-types@5.0.2
```

```bash
npm install --save-dev ethers dotenv
```

**步驟 4：匯入相依性.**

建立一個名為 `app.js` 的檔案。 我們在此互動的所有程式碼片段都會放在這裡。
複製並貼上這些必要的匯入到 `app.js` 檔案的頂端。

```js
import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import "dotenv/config";
```

**步驟 5：配置設定**

為了有效說明 API-Kit 如何運作，我們會使用一個有兩個或更多簽名者的 Safe 帳戶設定，以及兩個臨界值，因此我們在執行交易時需要收集多個簽名。

複製並貼上以下內容到您的 `app.js` 檔案中的匯入語句下：

```js
const RPC_URL = "https://responsive-green-emerald.kaia-kairos.quiknode.pro";
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";
const CONTRACT_ADDRESS = "<REPLACE WITH CONTRACT ADDRESS>";
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER_1 ADDRESS>";
const OWNER_1_PRIVATE_KEY = process.env.OWNER_ONE_PK;
const OWNER_2_PRIVATE_KEY = process.env.OWNER_TWO_PK; // OWNER 2 need not have any test KAIA

```

**第 6 步：提出、確認並執行安全交易**

在這個步驟中，您將使用 Safe API-Kit 和一個有多位擁有者的 Safe 帳戶，提出、簽署並執行智慧契約函式呼叫。 您會從 Safe 傳送一個交易來呼叫智慧契約方法 **setTokenPrice()** - 但相同的結構也適用於任何特權函式，例如 **pause()**。

複製並貼上以下內容到您的 `app.js` 檔案中的初始設定下：

```js
// Create interface from ABI
const contractABI = [
  "function pause()",
  "function setTokenPrice(uint256 newPrice)",
];

const iface = new ethers.Interface(contractABI);
// Encode function calls
// const pauseData = iface.encodeFunctionData("pause", []);
const setTokenPriceData = iface.encodeFunctionData("setTokenPrice", [15]);

const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: "https://docs-safe.kaia.io/txs-baobab/api",
});
const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS,
});
// 1. Create transaction
const safeTransactionData = {
  to: CONTRACT_ADDRESS,
  value: "0",
  data: setTokenPriceData,
  operation: OperationType.Call,
};

const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData],
});

const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction);
const senderSignature = await protocolKitOwner1.signHash(safeTxHash);
console.log(safeTxHash);

// 2. Propose transaction to the service
const proposeTx = await apiKit.proposeTransaction({
  safeAddress: SAFE_ADDRESS,
  safeTransactionData: safeTransaction.data,
  safeTxHash,
  senderAddress: OWNER_1_ADDRESS,
  senderSignature: senderSignature.data
})

// 3. Confirmation from Owner 2
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// Confirm the Safe transaction
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)

// 4. Execute transaction
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)

```

**完整代碼：**

```javascript

import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import "dotenv/config";

// https://chainlist.org/?search=kaia&testnets=true
const RPC_URL = "https://responsive-green-emerald.kaia-kairos.quiknode.pro";
const SAFE_ADDRESS = "<REPLACE WITH SAFE PUBLIC ADDRESS HERE>";
const CONTRACT_ADDRESS = "<REPLACE WITH CONTRACT ADDRESS>";
const OWNER_1_ADDRESS = "<REPLACE WITH OWNER_1 ADDRESS>";
const OWNER_1_PRIVATE_KEY = process.env.OWNER_ONE_PK;
const OWNER_2_PRIVATE_KEY = process.env.OWNER_TWO_PK; // OWNER 2 need not have any test KAIA

// Create interface from ABI
const contractABI = [
  "function pause()",
  "function setTokenPrice(uint256 newPrice)",
];
const iface = new ethers.Interface(contractABI);
// Encode function calls
// const pauseData = iface.encodeFunctionData("pause", []);
const setTokenPriceData = iface.encodeFunctionData("setTokenPrice", [15]);

const apiKit = new SafeApiKit.default({
  chainId: 1001n,
  txServiceUrl: "https://docs-safe.kaia.io/txs-baobab/api",
});

const protocolKitOwner1 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_1_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS,
});

// 1. Create transaction
const safeTransactionData = {
  to: CONTRACT_ADDRESS,
  value: "0",
  data: setTokenPriceData,
  operation: OperationType.Call,
};

const safeTransaction = await protocolKitOwner1.createTransaction({
  transactions: [safeTransactionData],
});

const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction);
const senderSignature = await protocolKitOwner1.signHash(safeTxHash);
console.log(safeTxHash);

// 2. Propose transaction to the service
const proposeTx = await apiKit.proposeTransaction({
  safeAddress: SAFE_ADDRESS,
  safeTransactionData: safeTransaction.data,
  safeTxHash,
  senderAddress: OWNER_1_ADDRESS,
  senderSignature: senderSignature.data
})

// 3. Confirmation from Owner 2
const protocolKitOwner2 = await Safe.default.init({
  provider: RPC_URL,
  signer: OWNER_2_PRIVATE_KEY,
  safeAddress: SAFE_ADDRESS
})

const signature2 = await protocolKitOwner2.signHash(safeTxHash)

// Confirm the Safe transaction
const signatureResponse = await apiKit.confirmTransaction(
  safeTxHash,
  signature2.data
)

// 4. Execute transaction
const safeTxn = await apiKit.getTransaction(safeTxHash);
const executeTxReponse = await protocolKitOwner1.executeTransaction(safeTxn)
const receipt = await executeTxReponse.transactionResponse?.wait();
console.log('Transaction executed:');
console.log(`https://kairos.kaiascan.io/tx/${receipt.hash}`)

```

程式碼會執行下列動作：

1. 使用 ethers.Interface 從契約 ABI 建立介面
2. 編碼 setTokenPrice(uint256) 函式呼叫
3. 初始化兩個所有者的 Safe API-Kit 和 Protocol-Kit
4. 建立安全交易
5. 向 Safe 服務提出交易
6. 與第二位業主簽署交易
7. 以所有必要的簽名確認交易
8. 從 Safe 執行交易

現在讓我們看看程式碼的運作。 在您的終端機執行 `node app.js`，您應該會看到這樣的輸出：

```bash
0xfa537bf8282ae36d933c41d867dee1ced93657094efe60c07180a872bb1388fc

Transaction executed:
https://kairos.kaiascan.io/tx/0xad94e0e8fd2d29602825b3815468dedb14221401438a9fbcfdfbeebaec6e52a7
```

現在您應該可以在 Remix IDE 上看到 `tokenPrice` 設定為 15。

![](/img/build/wallets/ks-succor-token-price-remix-display.png)

恭喜你 您已使用 Kaia Safe API-Kit 成功地從您的 Kaia Safe 帳戶執行一個特權函式。

##### 步驟 4：檢閱並提交交易

###### 使用交易建立程式

您需要用簽署人錢包簽署交易，一旦達到確認臨界值，交易就會被執行。

![](/img/build/wallets/ks-succor-review-tx.gif)

## 附錄

### 附錄 A：詞彙表

- **冷儲存**：將私人金鑰儲存在與網際網路實體隔離的裝置上的做法。
- **dApp（分散式應用程式）**：在區塊鏈等分散式網路而非中央伺服器上執行的應用程式。
- \*\* 加密金鑰庫\*\*：包含已使用密碼加密的私人密碼匙的檔案。
- **硬體錢包**：離線儲存私密金鑰並在內部簽署交易的實體裝置。
- \*\* 多重簽名 (Multi-Sig)\*\*：一種需要多個獨立私人金鑰批准才能授權單一交易的錢包。
- **私人密碼匙**：一個秘密的字母數字字串，讓擁有者可以存取他們的加密貨幣，並能夠進行交易。 絕對不可以分享。
- \*\* 公開金鑰 / 位址\*\*：可公開分享的密碼金鑰，用於接收資金。 它源自私人密碼匙。
- \*\* 種子詞組（或助記詞組）\*\*：由 12-24 個字組成的清單，可作為加密錢包中所有私密金鑰的主備份。

### 附錄 B：環境組態範例

為了幫助讀者成功地跟隨教學，並複製本指南中的程式碼範例，以下是實作過程中使用的開發環境配置範例。 建議將您的本機設定與這些版本對齊，以避免相容性問題。

**Node.js**

```bash
$ node --version  
v22.14.0  
```

**硬帽**

```bash
$ npx hardhat --version  
3.0.0-next.20  
```

**鑄造廠（鍛造廠）**

```bash
$ forge -V  
forge 1.2.3-stable (a813a2cee7 2025-06-08T15:42:50.507050000Z)  
```

**網路端點**

- RPC 提供者: https://responsive-green-emerald.kaia-kairos.quiknode.pro
- 目標連鎖：Kairos Testnet (Chain ID: 1001)
- 區塊瀏覽器：[Kaiascan](https://kairos.kaiascan.io/)