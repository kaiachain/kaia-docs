# Build Klaystagram

## Table of Contents <a href="#table-of-contents" id="table-of-contents"></a>

* [Set up environment](./setup-environment.md)
* [Deploy smart contracts](./deploy-contracts.md)
* [Directory structure](./directory-structure.md)
* [Code Overview](./code-overview.md)
* [FeedPage components](./feedpage.md)
  * [Connect Contract to Frontend](./feedpage.md#1-connect-contract-to-frontend)
  * [UploadPhoto Component](./feedpage.md#2-uploadphoto-component)
  * [Feed Component](./feedpage.md#3-feed-component)
  * [TransferOwnership Component](./feedpage.md#4-transferownership-component)

## Testing Environment <a href="#testing-environment" id="testing-environment"></a>

Klaystagram DApp is tested in the following environment.

* MacOS Mojave 10.14.5
* Node 10.16.0 (LTS)
* npm 6.9.0
* Python 2.7.10

## Introduction <a href="#introduction" id="introduction"></a>

[![Klaystagram Introduction Video](/img/build/tutorials/klaystagram-video-poster.png)](https://vimeo.com/327033594)

In this tutorial, we will learn how to make `Klaystagram`, a Kaia-based NFT photo licensing application. This simple web application requires basic knowledge of Solidity, JavaScript and React.

NFT refers to a non-fungible token, which is a special type of token that represents a unique asset. As the name non-fungible implies, every single token is unique. And this uniqueness of NFT opens up new horizons of asset digitization. For example, it can be used to represent digital art, game items, or any kind of unique assets and allow people to trade them. For more information, refer to this [article](https://coincentral.com/nfts-non-fungible-tokens/).

In `Klaystagram`, every token represents users' unique pictures. When a user uploads a photo, a unique token is created containing the image data and its ownership. All transactions are recorded on the blockchain, so even service providers do not have control over the uploaded photos. Considering the purpose of this tutorial, only core functions will be implemented. After finishing this tutorial, try adding some more cool features and make your own creative service.

There are three main features.

1. **Photo upload** Users can upload photos along with descriptions on the Kaia blockchain. The photos will be tokenized.
2. **Feed** Users can see all the photos uploaded on the blockchain.
3. **Transfer ownership** The owner of the photo can transfer ownership of the photo to another user, and the transaction will be shown in the ownership history.

> **Source Code**\
> Complete source code can be found on GitHub at [https://github.com/klaytn/klaystagram](https://github.com/klaytn/klaystagram)

## Intended Audience <a href="#intended-audience" id="intended-audience"></a>

We will build a web application that interacts with smart contracts. To complete this tutorial, the audience is expected to be familiar with the following concepts.

* We assume that you have basic knowledge on [React](https://reactjs.org/) and [Redux](https://redux.js.org/). This course is not for absolute beginners.
* Basic knowledge and experience in [Solidity](https://solidity.readthedocs.io/en/v0.5.10/) development are recommended. However, any experienced SW developer should be able to complete the task by following the step-by-step guideline of this tutorial.
* Anyone interested in [ERC-721 Tokens](http://erc721.org/).
