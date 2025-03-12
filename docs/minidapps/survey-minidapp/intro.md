# Introduction

The Survey Mini dApp is a privacy-focused decentralized application (dApp) that allows users to create and participate in surveys while maintaining anonymity and transparency. By leveraging cutting-edge tools like Semaphore for zero-knowledge proof integration, and LINE's developer ecosystem, this guide walks you through every step to build and deploy a survey mini dApp on the Kaia blockchain.

This comprehensive guide covers:
- What the application does and its objectives.
- The tools and prerequisites needed.
- Setting up a smart contract development environment.
- Frontend integration and deployment.

To get started quickly, you'll find the entire code for this tutorial on [Github](https://github.com/kjeom/ExampleMiniDapp). This way, you can explore the application's inner workings as you follow along.

## Prerequisite <a id="prerequisite"></a> 

To build this application, ensure you have the following:

1. Technical Knowledge
    - Solid understanding of [Solidity](https://www.tutorialspoint.com/solidity/index.htm).
    - Proficiency in [JavaScript](https://www.w3schools.com/js/default.asp) and [React/Next.js](https://www.w3schools.com/REACT/DEFAULT.ASP).
    - Familiarity with smart contract development tools like Hardhat.
2. Accounts and Tools
    - [LINE Developer Account](https://developers.line.biz/en/).
    - [Semaphore Protocol setup](https://docs.semaphore.pse.dev/getting-started).
    - Mini Dapp SDK Client ID received from Dapp Portal team.
3. Dependencies Installed
    - [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Project Setup and Installation <a id="project-setup-installation"></a> 

To start the project setup and installation quickly, clone this project on Github using the following command.

```bash
# clone project
git clone https://github.com/kjeom/ExampleMiniDapp
```

Next, change the directory into the cloned folder and install the project locally using npm with the following command:

```bash
cd ExampleMiniDapp
npm install
```

Next, let’s understand the inner workings of the smart contract for our survey application. The next section explains how it works. 

