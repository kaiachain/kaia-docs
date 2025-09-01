# 导言

Survey Mini dApp 是一款注重隐私的去中心化应用程序（dApp），允许用户创建和参与调查，同时保持匿名性和透明度。 本指南利用Semaphore等尖端工具进行零知识证明集成，并利用LINE的开发者生态系统，指导您在Kaia区块链上构建和部署调查迷你应用程序的每一个步骤。

本综合指南涵盖

- 应用程序的功能和目标。
- 所需的工具和先决条件。
- 建立智能合约开发环境
- 前端集成和部署。

要快速入门，您可以在 [Github](https://github.com/kjeom/ExampleMiniDapp) 上找到本教程的全部代码。 通过这种方式，您可以一边跟读，一边探索应用程序的内部工作原理。

## 先决条件<a id="prerequisite"></a>

要构建此应用程序，请确保您具备以下条件：

1. 技术知识
   - 扎实了解 [Solidity](https://www.tutorialspoint.com/solidity/index.htm).
   - 熟练掌握 [JavaScript](https://www.w3schools.com/js/default.asp) 和 [React/Next.js](https://www.w3schools.com/REACT/DEFAULT.ASP)。
   - 熟悉 Hardhat 等智能合约开发工具。
2. 账户和工具
   - [LINE Developer Account](https://developers.line.biz/en/).
   - [Semaphore Protocol setup](https://docs.semaphore.pse.dev/getting-started).
   - 从 Dapp Portal 团队收到的 Mini Dapp SDK 客户 ID。
3. 已安装的依赖项
   - [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)。

## 项目设置和安装<a id="project-setup-installation"></a>

要快速开始项目设置和安装，请使用以下命令在 Github 上克隆该项目。

```bash
# clone project
git clone https://github.com/kjeom/ExampleMiniDapp
```

接下来，将目录更改为克隆文件夹，并使用 npm 在本地安装项目，命令如下：

```bash
cd ExampleMiniDapp
npm install
```

接下来，让我们了解一下调查应用程序智能合约的内部运作。 下一节将介绍其工作原理。

