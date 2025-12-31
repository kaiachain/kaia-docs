# Kaiabridge

Finschia 用戶可以按固定交換率將其在 Finshia 網絡上的 FNSA 代幣交換為 Kaia 網絡上的 KAIA 代幣。 這種交換由一套智能合約和程序（統稱為 Kaiabridge）進行調解。

您可以在我們的 [線上工具包](https://toolkit.kaia.io/kaiaBridge) 中存取並使用 Kaiabridge。

您可以在 [GitHub kaiachain/kaia 儲存庫](https://github.com/kaiachain/kaia/tree/dev/contracts/contracts/system_contracts/kaiabridge) 找到合約原始碼，並在 [合約地址](https://docs.kaia.io/references/contract-addresses/) 頁面找到已部署的地址。

# Kaiabridge 使用手冊

## 先決條件

### 1. 將您的帳戶移至 MetaMask 或 Kaia Wallet

#### 使用原始私人密碼匙

如果您的帳戶可以匯出原始私密金鑰，複製原始私密金鑰並匯入 MetaMask 或 Kaia 皮夾。

- [MetaMask](https://support.metamask.io/start/use-an-existing-wallet#import-using-a-private-key)
- [Kaia Wallet](https://www.kaiawallet.io/en_US/faq/?id=25)

#### 使用恢復詞組

如果您的帳戶只能以復原片語匯出，請從復原片語計算原始私密金鑰。 您可以使用任何支援 BIP-39 派生路徑的工具。 這些工具包括 [ethers.js](https://docs.ethers.org/v6/api/wallet/#HDNodeWallet)、[viem](https://viem.sh/docs/accounts/local/hdKeyToAccount)、[Foundry](https://getfoundry.sh/cast/reference/wallet/)，以及 [BIP39 Tool](https://github.com/iancoleman/bip39)。 Finschia 錢包通常使用 "m/44'/438'/0'/0/0" 路徑 (根據 [SLIP-044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)) 作為預設的衍生路徑。 如果您的 Finschia 錢包有多個帳號或使用不同的設定，您可能需要使用其他衍生路徑。

計算出私密金鑰後，請依照上一節 [使用原始私密金鑰](#with-raw-private-key) 的指示操作。

:::note[Example 使用 BIP39 工具]

您可以在此頁面計算私密金鑰：[BIP39 - 助記碼](https://iancoleman.io/bip39/).

為慎重起見，強烈建議您遵循頁面上的「離線使用」指示，並在過程中封鎖網際網路連線。

1. 在「BIP39 默念」欄位貼上您的復原詞組。
2. 將「Coin」欄位設為「ETH - Ethereum」。
3. 將「衍生路徑」設為「BIP32」。
4. 將「使用者端」設為「自訂衍生路徑」。
5. 設定「BIP32 衍生路徑」為「m/44'/438'/0'/0」。
6. 在「衍生位址」中，尋找「路徑」顯示「m/44'/438'/0'/0/0」的第一行，您的原始私密金鑰會顯示在「私密金鑰」欄位中。

:::

:::note[Example 使用 Foundry 工具]

1. 安裝 [Foundry](https://getfoundry.sh/)。
2. 在 `--mnemonic` 中輸入以下命令，並輸入您的復原短語。 原始私密金鑰將會被列印出來。
   ```
   cast wallet private-key --mnemonic "test test test test test test test test junk" --mnemonic-derivation-path "m/44'/438'/0'/0/0"
   ```

:::

### 2. 檢查您的網路

如果您使用 MetaMask，請手動將 Kaia Mainnet 加入您的網路 (如果您尚未這麼做)。

- [將 MetaMask 連接到 Kaia](https://docs.kaia.io/build/tutorials/connecting-metamask/)

### 3. 為您的帳戶加油

您需要瓦斯來發送交換的交易。 詳細說明請參閱 [Get KAIA](https://docs.kaia.io/build/get-started/getting-kaia/) 。

我們建議您至少準備 0.1 KAIA 的汽油費。

## 將 Finschia 交換成 Kaia

:::warning[This 交換是不可逆的]

備付金與索賠請求只能處理一次，且不能還原。
在您遵循這些指示之前，請仔細閱讀。

:::

### 1. 連接您的錢包

#### 1.1 連接 MetaMask

按一下「連接 MetaMask」按鈕。

<p align="center"><img src="/img/misc/kaiabridge_connect_metamask.png" alt="Connect MetaMask" width="30%"/></p>

檢查「帳戶」是否顯示您的地址。
如果沒有，請開啟 MetaMask 擴充套件，看看它是否顯示您未連接到頁面。 如果是，請按「連結帳戶」按鈕。

<p align="center"><img src="/img/misc/kaiabridge_connect_account.png" alt="Connect Account" width="30%"/></p>

#### 1.2 連接 Kaia 皮夾

如果您使用的是 Kaia Wallet，網站可能會要求您將 Kaia Wallet 連接到 dApp (在此情況下為 Kaia Online Toolkit)。

<p align="center"><img src="/img/misc/kaiabridge_connect_kaiawallet.png" alt="Connect Kaia Wallet" width="30%"/></p>

按一下「連線」以連線您的 Kaia Wallet。

#### 2. 切換至 Kaia 主網路

檢查您是否已將網路正確設定為「Kaia Mainnet」或「Mainnet」。 如果沒有，請切換至 Kaia Mainnet。 如果您使用的是 MetaMask，而您沒有在 MetaMask 中加入 Kaia Mainnet 網路，請參考 [檢查您的網路](#2-check-your-network)。

#### 3. 衍生 Finschia 地址

按一下「衍生 Finschia 位址」。 出現簽署訊息的提示時，按一下「確認」或「簽署」。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_sign_metamask.png" alt="Sign message in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_sign_kaiawallet.png" alt="Sign message in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
檢查 「派生 finschia 位址 」是否與您的原始 Finschia 位址相符，以及 「cony 餘額 」是否與您在 Finschia 網路中的餘額相符（在 CONY 中）。

<div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
  <img src="/img/misc/kaiabridge_address_and_conybalance_page.png" alt="Address and CONY balance shown in the page" style={{width: "50%"}} />
  <img src="/img/misc/kaiabridge_address_and_conybalance_wallet.png" alt="Address and CONY balance shown in your wallet" style={{width: "30%", height: "60%"}} />
</div>

<br/><br/>
此外，請確定您的帳戶有一些 KAIA 來支付瓦斯費（您可以在錢包中查看）。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_balance_metamask.png" alt="KAIA balance in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_balance_kaiawallet.png" alt="KAIA balance in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
如果您的帳戶中沒有任何 KAIA，請參考 [Gas up your account](#3-gas-up-your-account)。

#### 4. 要求提供

按一下「請求提供」。 出現簽署訊息和傳送交易的提示時，按一下「確認」。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_provision_metamask.png" alt="Confirm provision transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_provision_kaiawallet.png" alt="Confirm provision transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
此過程應該只需要幾秒鐘。 等待交易完成。
您可以在頁面中檢查結果。

<p align="center"><img src="/img/misc/kaiabridge_provision_success.png" alt="Provision request successful" width="80%"/></p>

<br/>
如果沒有，請重新整理並從頭開始。

#### 5. 要求索賠

按一下「請求索賠」。 出現傳送交易的提示時，按一下「確認」。

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_claim_metamask.png" alt="Confirm claim transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_claim_kaiawallet.png" alt="Confirm claim transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
此過程應該只需要幾秒鐘。 等待交易完成。
您可以在頁面中檢查結果。

<p align="center"><img src="/img/misc/kaiabridge_claim_success.png" alt="Claim request successful" width="80%"/></p>

<br/>
檢查您的最新餘額。 索賠金額應為 (您的 cony 結餘) * (兌換率，約 148) [kei](https://docs.kaia.io/learn/token-economics/kaia-native-token/#units-of-kaia-)。