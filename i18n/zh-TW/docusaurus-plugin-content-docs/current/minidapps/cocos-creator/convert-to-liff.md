# 轉換為 LINE LIFF

在本節中，我們將介紹如何將您建立的應用程式轉換、整合並部署為 LINE LIFF (LINE Front-end Framework) 應用程式，使其能在 LINE 生態系統中無縫存取。

讓我們開始吧！

## 步驟 1：建立您的 LIFF 應用程式<a id="create-liff-app"></a>

首先，讓我們在 LINE 生態系統中設定您的應用程式：

1. LINE 開發者控制台設定：

  - 造訪 LINE 開發人員控制台。
  - 建立一個提供者（如果您已經有一個，請跳過）。

  ![](/img/minidapps/cocos-creator/cocos-liff-create.png)

  - 建立新的 LINE 登入頻道。

  ![](/img/minidapps/unity-minidapp/line-login-lc.png)

  - 導覽到 LIFF 索引標籤
  - 按一下「新增 LIFF 應用程式

  ![](/img/minidapps/unity-minidapp/line-liff-add.png)

2. 設定 LIFF 設定：

```code
Size: Choose one of:
├── Full (entire screen)
├── Tall (75% of screen)
└── Compact (50% of screen)
Endpoint URL: https://example.com (temporary)
Permissions: Enable as needed
```

:::note
保存您的 LIFF ID - 下一步您會用到它！
:::

## 步驟 2：修改建立範本<a id="modify-build-template"></a>

在 build-templates/web-desktop/index.html 的範本中加入 LIFF SDK：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Cocos Creator | dapp-portal-example</title>
    <!-- LIFF SDK -->
    <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <!-- DappPortal SDK -->
    <script src="https://static.kaiawallet.io/js/dapp-portal-sdk.js"></script>

    <meta
      name="viewport"
      content="width=device-width,user-scalable=no,initial-scale=1,minimum-scale=1,maximum-scale=1,minimal-ui=true"
    />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="full-screen" content="yes" />
    <meta name="screen-orientation" content="portrait" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="360-fullscreen" content="true" />

    <meta name="renderer" content="webkit" />
    <meta name="force-rendering" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <link rel="stylesheet" type="text/css" href="./style.css" />
    <link rel="icon" href="favicon.ico" />
  </head>
  <body>
    <h1 class="header">dapp-portal-example</h1>
    <div
      id="GameDiv"
      cc_exact_fit_screen="false"
      style="width: 1280px; height: 960px;"
    >
      <div id="Cocos3dGameContainer">
        <canvas
          id="GameCanvas"
          width="1280"
          height="960"
          tabindex="99"
        ></canvas>
      </div>
    </div>
    <p class="footer">
      Created with
      <a href="https://www.cocos.com/products" title="Cocos Creator"
        >Cocos Creator</a
      >
    </p>
    <!-- Polyfills bundle. -->
    <script src="src/polyfills.bundle.js" charset="utf-8"></script>
    <!-- SystemJS support. -->
    <script src="src/system.bundle.js" charset="utf-8"></script>
    <!-- Import map -->
    <script
      src="src/import-map.json"
      type="systemjs-importmap"
      charset="utf-8"
    ></script>
    <script>
      System.import('./index.js').catch(function (err) {
        console.error(err)
      })
    </script>
  </body>
</html>
```

> 請務必在上面的程式碼片段中變更您的 LIFF-ID。

## 步驟 3：在 Web3Manager 中實作 LIFF<a id="implementing-liff-in-web3manager"></a>

```typescript
// Web3Manager.ts
@ccclass('Web3Manager')
export class Web3Manager extends Component {
  private static instance: Web3Manager = null
  private sdk: any = null
  private connectedAddress: string = ''

  // Configuration
  private readonly CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS'
  private readonly CHAIN_ID = '1001'
  private readonly CLIENT_ID = 'YOUR_CLIENT_ID'
  private readonly LIFF_ID = 'YOUR_LIFF_ID' // Add this
  onLoad() {
    if (Web3Manager.instance === null) {
      Web3Manager.instance = this
      director.addPersistRootNode(this.node)
      this.initializeLIFF() // Initialize LIFF first
    } else {
      this.node.destroy()
    }
  }
  private async initializeLIFF(): Promise<void> {
    try {
      await liff.init({
        liffId: this.LIFF_ID,
      })
      console.log('LIFF initialized')

      // Check if user is logged in
      if (!liff.isLoggedIn()) {
        console.log('User not logged in, redirecting to login')
        liff.login()
        return
      }
      // Get LIFF profile
      const profile = await liff.getProfile()
      console.log('LIFF Profile:', profile)
      // Initialize DappPortal SDK after LIFF
      await this.initializeSDK()
    } catch (error) {
      console.error('LIFF initialization error:', error)
    }
  }
  // Rest of your existing Web3Manager code...
}
```

## 步驟：4：建立與測試流程<a id="build-and-test-process"></a>

- 在 Cocos Creator 中重建專案。
- 檢查產生的 build/web-desktop/index.html。
- 確認已正確包含 LIFF SDK 指令碼。

## 步驟 5：部署您的 Web 桌面建置<a id="deploy-web-desktop-build"></a>

- 為 WebGL 建立您的 Cocos Creator 專案
- 將所有建立檔案上傳至網路伺服器；例如 Netlify

您的部署資料夾結構應該是這樣的：

```bash
build/
  web-desktop/
    index.html
    assets/
    cocos-js/
    src/
    ...other files
```

## 步驟 6：最終組態與測試<a id="final-configuration-and-testing"></a>

1. 更新您的 LIFF 端點：
  - 返回 LINE 開發人員控制台
  - 找到您的 LIFF 應用程式
  - 按一下「編輯」。
  - 更新 URL 到您部署的網站。

現在您的迷你 dApp 應該可以隨時使用。

## 總結<a id="conclusion"></a>

恭喜你 您已成功使用 Cocos Creator 建立並部署您的第一個 LINE Mini dApp！ 透過遵循本指南，您已整合 Web3 功能，包括錢包連線、餘額檢索和代幣鑄造 - 將區塊鏈驅動的互動帶入 LINE 生態系統。

如需更多有關開發 LINE mini dApp 的詳細資訊，請探索這些全面的資源：

- [Kaia Documentation](https://docs.kaia.io/)
- [LINE 開發人員文件](https://developers.line.biz/en/docs/line-mini-app/)
- [Cocos Creator Documentation](https://docs.cocos.com/creator/3.8/manual/en/getting-started/)
