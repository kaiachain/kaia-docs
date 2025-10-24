# 在 Kaia 上建立迷你 DApps

Mini DApps 是由區塊鏈驅動的小型應用程式，可直接安裝在 LINE Messenger 中。 它們可讓人們輕鬆使用 Web3 功能，而無需離開他們已熟悉的聊天應用程式。

## 什麼是迷你 DApps？

將 Mini DApps 視為建立在 Kaia 區塊鏈上的簡單工具或遊戲。 它們在 LINE 內運行，LINE 是一款廣受歡迎的訊息應用程式，每月有超過 2 億名使用者，主要集中在日本、台灣、泰國和印尼。 開發人員製作這些應用程式，將有用的區塊鏈功能，例如安全付款、獎勵或代幣交易，直接加入日常聊天中。

對使用者而言，這是很直接的。 不需要下載額外的應用程式或學習棘手的區塊鏈知識。 您只需打開 LINE，透過 Dapp Portal（內建的發現中心）找到 Mini DApp，然後開始使用。 例如賺取會員積分、交換代幣、購買 NFT，甚至玩快速遊戲。 所有事情都在一個地方發生。

Kaia 在幕後操控著這一切。 這是一個快速、低成本的區塊鏈 (由 Klaytn 和 Finschia 合併而成)，可處理安全的部分，例如記錄交易或執行智慧型契約。 Kaia 的工具 (例如錢包) 與 LINE 密切結合，因此管理數位資產感覺很自然。 此外，收費委託等功能意味著用戶通常不用自己支付汽油費。

真正的優勢在於 Mini DApps 打開了大眾使用的大門。 他們將 Web3 與可信賴的應用程式相結合，接觸到那些可能不會以其他方式探索區塊鏈的人。 企業可以建立獎勵制度。 開發人員可以製作互動式體驗。 這一切都是為了讓分散式科技變得實用，並為不同地區量身打造，同時連接全球。

## 建立迷你 DApp 的關鍵 SDK

要建立 Mini dApp，您需要使用幾個關鍵 SDK。 各自處理不同的部分：區塊鏈基本知識、使用者發現和 LINE 整合。 以下為簡明概述，並提供其他詳細資訊的連結。

### Kaia SDK（核心區塊鏈工具）

此 SDK 提供您連接 Kaia 網路的基本知識。 它是一套函式庫，用來撰寫智慧型契約、傳送交易或管理錢包。

用來做什麼：主要用於後端。 例如，如果您的 Mini dApp 需要部署合約以鑄造代幣或處理付款，您通常會依賴此 SDK。 它以 Ethers.js 或 Web3.js 等熟悉的工具為基礎，並加入了 JavaScript 的 ethers-ext 等額外功能。

主要功能包括提交交易、讀取合約資料以及建立可擴充的應用程式。 在迷你 dApp 中，它通常會為代幣鑄造或 NFT 交易等提供動力。

如需詳細資訊，請參閱我們文件中的 [Kaia SDK reference](../references/sdk/sdk.md)。 那裡有詳盡的說明，所以如果您要訂立合約，請先從那裡開始。

### Dapp Portal SDK (連接至 Discovery Hub)

Dapp Portal 是 LINE 尋找和推廣 Mini dApps 的據點。 此 JavaScript SDK 可將您的應用程式連結至它，處理 Web3 動作，例如錢包登錄或交易。

用來做什麼？它可讓使用者連接 Kaia Wallet (與 LINE 綁定)、鑄造代幣、檢查餘額，或存取獎勵和市場 - 一切都在您的 Mini dApp 中進行。 將其視為面向使用者的區塊鏈互動橋樑。

您會將它加入您的前端程式碼，通常是 HTML 或腳本。 例如，在 Unity 或 Cocos 教學中，它用於錢包連線和代幣功能。 主要方法包括初始化 SDK、請求帳戶和傳送交易。

有關 API 詳情和設定，請參閱 [Dapp Portal docs](https://docs.dappportal.io/)。 為了安全起見，我們建議在開發過程中在 `localhost:3000` 上進行測試。

### LIFF SDK (內嵌於 LINE Messenger)

LIFF 是 LINE Front-end Framework 的縮寫。 它是 LINE 用來建立網頁應用程式的工具，可在 messenger 內順暢執行。

用來做什麼？處理前端，例如使用者透過 LINE 帳號登入，以及在 LINE 瀏覽器中顯示您的應用程式。 它簡化了上線程序 - 不需要額外的密碼。 在 LINE 開發者控制台設定 LIFF 應用程式，選擇大小（全螢幕或精簡型），並新增權限。

在工作流程中，您通常會從這裡開始建立介面，然後再分層加入其他 SDK。 例如，教學顯示修改 index.html 以包含適用於 Unity WebGL 建置的 LIFF。

完整資訊請參閱 [LINE's LIFF docs](https://developers.line.biz/en/docs/liff/overview/)。 它是外置的，但對 Mini dApps 來說是不可或缺的。

## 這些 SDK 如何搭配使用

當您看到流程時，建立 Mini dApp 並不複雜。 從 LIFF 開始，在 LINE 中設定應用程式，處理登入和基本檢視。 然後，使用 Kaia SDK 進行後端區塊鏈工作，例如部署智慧型契約。 最後，新增 Dapp Portal SDK 以連接錢包並啟用代幣鑄造或獎勵等功能。

![](/img/minidapps/sdk-overview.png)

舉個簡單的例子：玩家賺取代用幣的遊戲。 您會在 LINE 中的遊戲畫面使用 LIFF。 Dapp Portal SDK 連接錢包並分發獎勵。 Kaia SDK 在 Kaia 上部署代幣合約。
這樣的設定既安全又方便使用者。 如需實作指南，請參閱我們關於 [Unity](https://docs.kaia.io/minidapps/unity/quick-start/)、[Cocos Creator](https://docs.kaia.io/minidapps/cocos-creator/quick-start/) 或 [Survey Mini dApp](https://docs.kaia.io/minidapps/survey-minidapp/intro/) 的教學。

## 迷你 DApp 開發入門

要開始開發您的 Mini DApp，請遵循以下步驟：

1. 申請使用 Mini DApp SDK [這裡](https://tally.so/r/w4Y5BB) 並等待核准。
2. 從 [Kaia Faucet](https://faucet.kaia.io/) 取得測試代幣。
3. 依照 [Unity](./unity/quick-start.md)、[Cocos Creator](./cocos-creator/quick-start.md) 或 [Survey Mini dApp](./survey-minidapp/intro.md) 的教學設定您的開發環境。

在 [Dapp Portal SDK 文件](https://developers.dappportal.io/sdk) 瞭解更多關於 Mini DApp SDK 的資訊，該文件提供了實施和整合方面的全面指導。

如果您是 Kaia 建置的新手，請查看我們的 [Get Started with Kaia](../build/get-started/get-started.mdx) 頁面了解基礎知識。

如需問題與社群支援，請洽詢 [Kaia 開發者論壇](https://devforum.kaia.io/)。