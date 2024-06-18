# Set up environment

> **[MUST] For this tutorial, you must follow the versions specified on the [first page](klaystagram.md#testing-environment) when you are setting up the environment. Please change the node version to 10.16.0 by using nvm before downloading caver-js.**

## 1. Install Node.js (npm) <a id="1-install-node-js-npm"></a>

- Download Node.js (npm) from the official site: [https://nodejs.org/](https://nodejs.org/)
- Install the package by clicking the download file.
- Type `$ node --version` in your terminal to verify `node` has been successfully installed.

  ```text
    v10.16.0
  ```

⚠ At the time of writing, the latest LTS version that is compatible with `caver-js` is 10.16.0. If you have a higher node version, `caver-js` cannot be installed. Reinstall the node or use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to set up a stable environment.

## 2. Install Truffle <a id="2-install-truffle"></a>

Truffle is a great tool for compiling and deploying contract files.

> **Use `nvm` to set the node version to 12.0.0 only if you are using truffle.**

- Type `$ nvm install 12.0.0`
- Type `$ nvm use 12.0.0`
- Type `$ sudo npm install -g truffle` in your terminal to install truffle.
- Type `$ truffle version` in your terminal to verify `truffle` has been installed successfully.
- (**Deploy your smart contract by using truffle**)
- Type `$ nvm use 10.16.0` to come back to node v10.16.0 after using truffle.

⚠ If the version is lower than 5, Install the truffle version 5.\
⚠ If the version is lower than 5, Install the truffle version 5.\
`$ sudo npm install -g truffle@5`
