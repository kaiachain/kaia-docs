# Ethers.js Extension for Klaytn

Ethers.js Extension for Klaytn offers:

- Drop-in replacement to `ethers.Wallet` that handles both Ethereum and Klaytn transaction types
  involving AccountKey and TxTypes.
- Drop-in replacement to `ethers.providers.JsonRpcProvider` that provides accesses to both Ethereum RPCs and
  Klaytn-specific RPCs.
- Drop-in replacement to `ethers.Web3Provider` to work with both MetaMask (`window.ethereum`) and Kaikas (`window.klaytn`)

## Note for ethers v6

`@klaytn/ethers-ext` was developed based on ethers v5. As a result, ethers v6 classes are incompatible with ethers-ext classes. If you are using ethers v6 in your codebase, do not mix ethers v6 classes and ethers-ext classes. e.g. ethers v6 JsonRpcProvider cannot be supplied to ethers-ext Wallet.

- **Don't**: mix ethers v6 and ethers-ext
  ```js
  const ethers = require("ethers");
  const { Wallet } = require("@klaytn/ethers-ext");

  const provider = new ethers.JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const wallet = new Wallet("<private key>", provider);
  ```
- **Do**: mix ethers v5 and ethers-ext
  ```js
  const ethers = require("ethers");
  const { Wallet } = require("@klaytn/ethers-ext");

  const provider = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const wallet = new Wallet("<private key>", provider);
  ```
- **Do**: ethers-ext only
  ```js
  const { Wallet, JsonRpcProvider } = require("@klaytn/ethers-ext");

  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const wallet = new Wallet("<private key>", provider);
  ```

## Install

### Node.js

- Install
  ```sh
  npm install --save @klaytn/ethers-ext ethers@5
  ```
- ESM or TypeScript
  ```ts
  import { Wallet, JsonRpcProvider } from "@klaytn/ethers-ext";
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const wallet = new Wallet("<private key>", provider);
  ```
- CommonJS
  ```js
  const { Wallet, JsonRpcProvider } = require("@klaytn/ethers-ext");
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const wallet = new Wallet("<private key>", provider);
  ```

### Browser

It is not recommended to use CDNs in production, But you can use below for quick prototyping.

```html
<script src="https://cdn.jsdelivr.net/npm/@klaytn/ethers-ext@latest/dist/ethers-ext.bundle.js"></script>
<script>
const provider = new ethers_ext.providers.Web3Provider(window.klaytn);
</script>
```

## Usage

See [example](./example) and [test](./test).
