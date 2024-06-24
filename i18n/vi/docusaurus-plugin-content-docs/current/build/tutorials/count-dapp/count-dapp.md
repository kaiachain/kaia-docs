# Build Count DApp

## Table of Contents <a href="#table-of-contents" id="table-of-contents"></a>

- [Set up environment](./setup-environment.md)
- [Deploy smart contracts](./deploy-contracts.md)
- [Directory structure](./directory-structure.md)
- [Frontend Code Overview](./code-overview/code-overview.md)
  - [BlockNumber Component](./code-overview/blocknumber-component.md)
  - [Auth Component](./code-overview/auth-component.md)
  - [Count Component](./code-overview/count-component.md)

## Testing Environment <a href="#testing-environment" id="testing-environment"></a>

Count DApp is tested in the following environment.

- MacOS Mojave 10.14.5
- Node 10.16.0 (LTS)
- npm 6.9.0
- Python 2.7.10

## Introduction <a href="#introduction" id="introduction"></a>

![intro](/img/build/tutorials/tutorial-1intro.gif)

This tutorial is intended to give a step by step guide to build a Kaia dApp. No previous Kaia experience is needed. We will make a simple web app interacting with a basic smart contract, `Count`.\
Any user who has a Kaia account can increase and decrease the current value as shown in the above gif.

> **Source Code**\
> Complete source code can be found on GitHub at [https://github.com/klaytn/countbapp](https://github.com/klaytn/countbapp)

## Intended Audience <a href="#intended-audience" id="intended-audience"></a>

Anyone who wants to learn how to build a Blockchain Application on Kaia. We will build a web application that interacts with smart contracts. To complete this tutorial, the audience is expected to be familiar with the following concepts.

- We assume that you have basic knowledge on [React](https://reactjs.org/) and [Redux](https://redux.js.org/). This course is not for absolute beginners.
- Basic knowledge and experience in Solidity development are recommended. However, any experienced SW developer should be able to complete the task by following the step-by-step guideline of this tutorial.
