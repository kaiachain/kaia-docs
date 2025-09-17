# Building Mini DApps on Kaia

Mini DApps are small, blockchain-powered apps that fit right inside the LINE Messenger. They make it easy for people to use Web3 features without leaving the chat app they already know.

## What Are Mini DApps?

Think of Mini DApps as simple tools or games built on the Kaia blockchain. They run inside LINE, a popular messaging app with over 200 million monthly users, mostly in Japan, Taiwan, Thailand, and Indonesia. Developers make these apps to add useful blockchain features, such as secure payments, rewards, or token trading, directly into everyday chats.

For users, it's straightforward. No need to download extra apps or learn tricky blockchain stuff. You just open LINE, find a Mini DApp through the Dapp Portal (a built-in discovery hub), and start using it. Examples include earning loyalty points, swapping tokens, buying NFTs, or even playing quick games. Everything happens in one place.

Kaia powers all this behind the scenes. It's a fast, low-cost blockchain (born from merging Klaytn and Finschia) that handles the secure parts, like recording transactions or running smart contracts. Kaia's tools, such as its wallet, tie in closely with LINE, so managing digital assets feels natural. Plus, features like fee delegation mean users often skip paying gas fees themselves.

The real strength is that Mini DApps open doors for mass use. They blend Web3 with a trusted app, reaching people who might not explore blockchain otherwise. Businesses can build reward systems. Developers can make interactive experiences. It's all about making decentralized tech practical and local—tailored to different regions while connecting globally.

## Key SDKs for Building Mini DApps

To build a Mini dApp, you'll work with a few key SDKs. Each handles a different part: blockchain basics, user discovery, and LINE integration. The following provides a concise overview with links to additional details.

### Kaia SDK (Core Blockchain Tools)

This SDK gives you the basics for connecting to the Kaia network. It's a set of libraries for things like writing smart contracts, sending transactions, or managing wallets.

What it's for: Use it mainly on the backend. For instance, if your Mini dApp needs to deploy a contract for minting tokens or handling payments, you'll typically rely on this SDK. It builds on familiar tools like Ethers.js or Web3.js, with extras like ethers-ext for JavaScript.

Key features include submitting transactions, reading contract data, and building scalable apps. In Mini dApps, it often powers things like token minting or NFT trades.

For full details, check the [Kaia SDK reference](../references/sdk/sdk.md) in our docs. It's well-covered there, so start with that if you're setting up contracts.

### Dapp Portal SDK (Connecting to the Discovery Hub)

The Dapp Portal is LINE's spot for finding and promoting Mini dApps. This JavaScript SDK links your app to it, handling Web3 actions like wallet logins or transactions.

What it's for: It lets users connect their Kaia Wallet (tied to LINE), mint tokens, check balances, or access rewards and marketplaces—all from within your Mini dApp. Think of it as the bridge for user-facing blockchain interactions.

You'll add it to your frontend code, often in HTML or scripts. For example, in Unity or Cocos tutorials, it's used for wallet connections and token functions. Key methods include initializing the SDK, requesting accounts, and sending transactions.

See the [Dapp Portal docs](https://docs.dappportal.io/) for API details and setup. We recommend testing on `localhost:3000` during development for security.

### LIFF SDK (Embedding in LINE Messenger)

LIFF stands for LINE Front-end Framework. It's LINE's tool for building web apps that run smoothly inside the messenger.

What it's for: This handles the frontend side, like user login via LINE accounts and displaying your app in LINE's browser. It simplifies onboarding—no extra passwords needed. Set up a LIFF app in the LINE Developers Console, pick a size (full screen or compact), and add permissions.

In workflows, you often start here to build the interface, then layer in the other SDKs. For instance, tutorials show modifying index.html to include LIFF for Unity WebGL builds.

Full info is in [LINE's LIFF docs](https://developers.line.biz/en/docs/liff/overview/). It's external, but essential for Mini dApps.

## How These SDKs Fit Together

Building a Mini dApp isn't complicated when you see the flow. Start with LIFF to set up the app in LINE—handle logins and the basic view. Then, use the Kaia SDK for backend blockchain work, like deploying a smart contract. Finally, add the Dapp Portal SDK to connect wallets and enable features like token minting or rewards.

![](/img/minidapps/sdk-overview.png)

Take a simple example: A game where players earn tokens. You'd use LIFF for the game screen in LINE. The Dapp Portal SDK connects the wallet and distributes rewards. The Kaia SDK deploys the token contract on Kaia.
This setup keeps things secure and user-friendly. For hands-on guides, refer to our tutorials on [Unity](https://docs.kaia.io/minidapps/unity/quick-start/), [Cocos Creator](https://docs.kaia.io/minidapps/cocos-creator/quick-start/), or [Survey Mini dApp](https://docs.kaia.io/minidapps/survey-minidapp/intro/).


## Getting Started with Mini DApp Development

To begin developing your Mini DApp, follow these steps:

1. Apply for access to the Mini DApp SDK [here](https://tally.so/r/w4Y5BB) and wait for approval.
2. Get test tokens from the [Kaia Faucet](https://faucet.kaia.io/).
3. Set up your development environment by following the tutorials for [Unity](./unity/quick-start.md), [Cocos Creator](./cocos-creator/quick-start.md), or [Survey Mini dApp](./survey-minidapp/intro.md).

Learn more about the Mini DApp SDKs at the [Dapp Portal SDK documentation](https://developers.dappportal.io/sdk), which provides comprehensive guidance on implementation and integration.

If you're new to building on Kaia, check out our [Get Started with Kaia](../build/get-started/get-started.mdx) page for foundational knowledge.

For questions and community support, consult the [Kaia Developer Forum](https://devforum.kaia.io/).