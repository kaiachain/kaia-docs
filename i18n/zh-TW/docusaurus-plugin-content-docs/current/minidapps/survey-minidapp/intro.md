# 簡介

Survey Mini dApp 是專注於隱私權的分散式應用程式 (dApp)，可讓使用者建立並參與調查，同時保持匿名性與透明度。 本指南利用 Semaphore 等尖端工具進行零知識證明整合，並利用 LINE 的開發者生態系統，教導您在 Kaia 区块鏈上建立和部署調查迷你 dApp 的每個步驟。

本綜合指南涵蓋

 - 應用程式的作用及其目標。
 - 所需的工具和先決條件。
 - 設定智慧型契約開發環境。
 - 前端整合與部署。

若要快速上手，您可以在 [Github](https://github.com/kjeom/ExampleMiniDapp) 上找到本教學的全部程式碼。 如此一來，您就可以一邊跟著操作，一邊探索應用程式的內部運作。

## 先決條件<a id="prerequisite"></a>

若要建立此應用程式，請確保您擁有下列內容：

1. 技術知識
    - 紮實了解 [Solidity](https://www.tutorialspoint.com/solidity/index.htm)。
    - 精通 [JavaScript](https://www.w3schools.com/js/default.asp) 和 [React/Next.js](https://www.w3schools.com/REACT/DEFAULT.ASP)。
    - 熟悉智慧型契約開發工具，例如 Hardhat。
2. 帳戶和工具
    - [LINE Developer Account](https://developers.line.biz/en/)。
    - [Semaphore Protocol setup](https://docs.semaphore.pse.dev/getting-started)。
    - 從 Dapp Portal 團隊收到的 Mini Dapp SDK 客戶 ID。
3. 已安裝的相依性
    - [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)。

## 專案設定與安裝<a id="project-setup-installation"></a>

若要快速開始專案設定與安裝，請使用下列指令在 Github 上複製此專案。

```bash
# clone project
git clone https://github.com/kjeom/ExampleMiniDapp
```

接下來，變更目錄至複製的資料夾，並使用 npm 在本機使用下列指令安裝專案：

```bash
cd ExampleMiniDapp
npm install
```

接下來，讓我們了解調查應用程式智慧型契約的內部運作。 下一節將解釋其運作方式。

