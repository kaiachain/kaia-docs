# SafePal S1

![](/img/banners/kaia-safepal.png)

## 導言<a id="introduction"></a>

硬件錢包重新發明瞭輪子，將私鑰（簽署交易時需要）保存在與互聯網連接分離的離線環境中，避免了依賴互聯網連接的軟件錢包所帶來的大量黑客攻擊或威脅。 這樣，用戶的加密資產就更安全了，也不會受到軟件錢包帶來的網絡危險的影響。

與 Kaia 集成的硬件錢包之一是 **SafePal S1 硬件錢包**。 SafePal S1 是一款加密貨幣硬件錢包，旨在為大眾提供一個安全、簡單、愉快的加密貨幣管理解決方案。 SafePal 是一個硬體錢包，用於保護和管理加密貨幣和 NFT，如 Bitcoin、KAIA、Kaia Compatible Tokens (KCT)、ETH 和 ERC20 代幣等。

在本指南中，您將

- 使用 SafePal S1 硬體錢包添加、接收和發送 KAIA 以及任何 Kaia 相容代幣(KCT)

## 先決條件<a id="prerequisites"></a>

- [SafePal 硬件錢包設置](https://safepalsupport.zendesk.com/hc/en-us/articles/360046051752)

## 入門<a id="getting-started"></a>

在成功設置錢包後，接下來就是查看錢包的運行情況了。 在本教程中，我們將使用 SafePal S1 硬件錢包添加、接收和發送 KAIA 原生代幣以及任何 Kaia 兼容代幣（KCT）。

### 新增加密代幣<a id="adding-crypto-tokens"></a>

若要添加加密代幣到您的硬體錢包，請遵循以下步驟：

**第一步**：打開安全寶應用程序，在 "錢包 "選項卡中點擊省略號圖標，然後點擊 "管理硬幣 "按鈕，如下圖所示：

![](/img/build/tools/safepal/sp-hw-manage-coins.png)

**步驟 2**：搜尋您要加入的硬幣，然後將它們切換開啟。

\*\* 本地代幣 - KAIA\*\*

- 在搜尋列中輸入 KAIA，然後將其切換開啟。

![](/img/build/tools/safepal/sp-app-search-kaia.jpg)

**Fungible 代幣 - USDT**

- 在搜尋列中輸入 USDT Kaia 並將其開啟。

![](/img/build/tools/safepal/sp-app-search-usdt.jpg)

**步驟 3**：按一下底部的 \*\* 加入硬幣\*\*。

![](/img/build/tools/safepal/sp-hw-add-coins.png)

**步驟 4**：在 SafePal App 和 S1 硬體錢包之間來回掃描，輸入您的設備 PIN 碼，使資料在 App 和設備之間正確同步。

**第 4 步**：成功添加硬幣後，您就可以在 S1 設備上的 "資產管理 "標籤中查看它們了。

![](/img/build/tools/safepal/sp-hw-asset-display.png)

:::note
上述步驟適用於加入任何 Kaia 相容代幣。
:::

### 接收加密代幣<a id="receiving-crypto-tokens"></a>

成功添加硬幣（KAIA、KCT）後，您可以在 S1 設備上的 "資產管理 "\*\* 標籤中查看它們。 您可以使用以下方式接收加密代幣：

#### 使用掌上安全應用程序

1. 選擇 KAIA 或任何其他可替代的代幣，例如 USDT，提供交換、接收和傳送的選項。 點選接收。
2. 您可以複製您的 KAIA 或 USDT 皮夾地址、儲存 QR 代碼，或讓對方直接從您的裝置掃描 QR 代碼。

#### 使用安全寶 S1 硬件錢包

1. 啟動您的 SafePal S1 裝置，並導航至「資產管理」。
2. 選擇 KAIA 或任何其他可替代的代幣，例如 USDT，作為您想要接收的硬幣。
3. 按一下「接收」按鈕。
4. 輸入 S1 裝置的 PIN 碼。
5. 然後您就可以看到硬幣地址的 QR 代碼，並顯示給別人看，讓他們可以掃描硬幣並寄送硬幣給您。

![](/img/build/tools/safepal/sp-hw-receive-tokens.png)

:::note
上述步驟適用於接收任何 Kaia 相容的代幣。
:::

### 發送加密代幣 <a id="sending-crypto-tokens"></a>

若要從硬體錢包傳送加密代幣，請遵循以下步驟：

**步驟 1**：在安全寶應用程式上，選擇您要傳送的硬幣，然後點擊**傳送**。

\*\* 本地代幣 - KAIA\*\*

![](/img/build/tools/safepal/sp-hw-sp-app-send.png)

**Fungible 代幣 - USDT**

![](/img/build/tools/safepal/sp-hw-sp-app-usdt-send.png)

**步驟 2**：輸入目的地地址、金額，然後按「下一步」再次確認詳細資訊。 確保在此步驟中驗證您的轉賬詳情。

![](/img/build/tools/safepal/sp-hw-sp-app-send-details.png)

**步驟 3**：啟動 S1 裝置的簽署程序。

在此步驟中，安全寶應用程序上將顯示一個包含轉賬詳情的 QR 碼（如下圖所示）。 啟動 S1 硬體錢包，並進入 **Scan** 標籤。 接下來是掃描 SafePal App 上的 QR 碼，然後從 SafePal 裝置輸入您的 PIN 碼。

這樣做可確保 S1 設備在脫機環境下接收傳輸詳細信息。

![](/img/build/tools/safepal/sp-hw-sign-tx.png)

**步驟 4**：同步簽名回 SafePal App

在 S1 設備上成功簽署傳輸後，您將看到一組動態 QR 碼顯示在 S1 設備上。 在安全寶應用程序中，點擊 "下一步 "打開手機攝像頭。 使用 SafePal 應用程序掃描 S1 設備上顯示的動態 QR 碼。

這樣做可以確保應用程序收到二維碼中包含的簽名，並準備好向區塊鏈（Kaia）廣播轉賬。

**步驟 5**：按一下 App 上的 \*\* 廣播\*\*，等待傳輸完成

![](/img/build/tools/safepal/sp-hw-broadcast-tx.png)

:::note
上述步驟適用於傳送任何 Kaia 相容代幣。
:::

## 更多參考資料 <a id="further-references"></a>

- [SafePal S1 升級說明](https://www.safepal.com/en/upgrade/s1)
- [SafePal S1 用戶手冊](https://docs.safepal.io/safepal-hardware-wallet/user-manual)