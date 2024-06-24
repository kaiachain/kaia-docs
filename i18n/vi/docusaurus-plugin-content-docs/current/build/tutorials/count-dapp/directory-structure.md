# Directory structure

```
|-- contracts
|-- migrations
|-- truffle-config.js
|-- static  
|-- src  
    |-- styles
    |-- klaytn
      |-- caver.js
    |-- components
      |-- BlockNumber.js
      |-- Auth.js
      |-- Count.js
    |-- index.js
    |-- App.js
    |-- routes.js
```

`contracts/`: Contains Solidity source files of the smart contract.

`migrations/`: Contains JavaScript files that handle smart contract deployment.

`truffle-config.js`: Truffle configuration file.

`static/`: Contains static files such as images.

`src/styles`: CSS definition files.

`src/index.js`: Our tutorial app's index file. ReactDOM.render logic is here.

`src/App.js`: Our tutorial app's root component file.

`src/routes.js`: Contains route definitions.

`src/components`: Contains frontend component files.

- `src/components/BlockNumber.js`: Shows the current block number.

- `src/components/Auth.js`: Handles user login using either private key or a keystore with password.

- `src/components/Count.js`: Handles interaction with the deployed Count contract. Invokes contract functions using caver.js.

`src/klaytn`: Contains files that support interactions with the Kaia.

- `src/klaytn/caver.js`: Instantiates caver-js. caver-js is a JavaScript RPC call library that helps connect to a Kaia node and interact with the node or smart contracts deployed on Kaia.
