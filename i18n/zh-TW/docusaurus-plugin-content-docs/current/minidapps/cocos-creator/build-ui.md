# UI 創建

在本節中，我們將為 dApp 建立使用者介面 (UI)，包括錢包連線、餘額更新和鑄幣功能。

## 設定主場景<a id="setting-up-main-scene"></a>

### 步驟 1：建立場景資料夾<a id="create-scene-folder"></a>

- 導覽到專案的 **assets** 資料夾。
- 按一下滑鼠右鍵，然後選取 **Create Folder**。
- 命名為 **場景**。 (插入圖片)
- 在場景資料夾內，按滑鼠右鍵並選擇 \*\* 建立 → 場景\*\*。

![](/img/minidapps/cocos-creator/cp-create-scene-r.png)

- 出現提示時儲存場景檔案。
- 按兩下新建立的場景，將其設定為 \*\* 預設場景。

### 步驟 2：建立基本畫布<a id="creating-base-canvas"></a>

- 在 Hierarchy 視窗中，用滑鼠右鍵按一下 **Scene**。
- 導覽到 **Create → UI Component → Canvas**。
- 將它重新命名為 **Canvas**

![](/img/minidapps/cocos-creator/cp-create-canvas-r.png)

### 步驟 3：建立 Web3UI 容器<a id="create-web3ui-container"></a>

- 在新建立的 **Canvas** 上按一下滑鼠右鍵。
- 選擇 **建立 → 空節點**。
- 將它重新命名為 **Web3UI**。

![](/img/minidapps/cocos-creator/cp-create-web3-ui-r.png)

### 步驟 4：設定主要 UI 物件<a id="setting-up-main-ui-objects"></a>

在 Web3UI 內，建立下列元件：

**1. 連接錢包按鈕**

- 右鍵按一下 **Web3UI → 建立 → UI Component → 按鈕**。

![](/img/minidapps/cocos-creator/cp-connect-button-r.png)

- 將它重新命名為 **ConnectWallet**。
- 在 \*\* 檢查窗格\*\*，將按鈕標籤文字設定為 \*\* 連接錢包\*\*。

![](/img/minidapps/cocos-creator/cp-connect-label-r.png)

**2. 薄荷鈕扣**

- 右鍵按一下 **Web3UI → 建立 → UI Component → 按鈕**。
- 將它重新命名為 **MintButton**。
- 將按鈕標籤文字設定為 **Mint Button**。

**3. 地址標籤**

- 按一下 **Web3UI → 建立 → 2D 物件 → 標籤**。

![](/img/minidapps/cocos-creator/cp-address-label-r.png)

- 將它重新命名為 **AddressLabel**。
- 將標籤文字設定為 **連線位址：**。

![](/img/minidapps/cocos-creator/cp-connected-address-r.png)

**4. 平衡標籤**

- 按一下 **Web3UI → 建立 → 2D 物件 → 標籤**。
- 將它重新命名為 **BalanceLabel**。
- 將標籤文字設定為 **0.000ET**。

新增所有元件後，您的 Hierarchy 應該是這樣的：

```bash
Canvas
└── Web3UI
    ├── ConnectWallet
    ├── MintButton
    ├── AddressLabel
    ├── BalanceLabel
```

![](/img/minidapps/cocos-creator/cp-ui-view-r.png)

:::note
若要正確排列元件，請使用 Scene 頂端的對齊工具。 按一下每個元件，並視需要調整其位置
:::
