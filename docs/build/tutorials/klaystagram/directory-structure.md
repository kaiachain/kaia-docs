# Directory Structure

```text
|-- contracts
|-- migrations
|-- truffle.js
|-- static
|-- src
    |-- klaytn
      |-- caver.js
      |-- KlaystagramContract.js
    |-- redux
    |-- pages
      |-- AuthPage.js
      |-- FeedPage.js
    |-- components
      |-- UploadPhoto.js
      |-- Feed.js
      |-- TransferOwnership.js
      |-- ...
    |-- styles
    |-- utils
    |-- index.js
    |-- App.js
```

`contracts/`: Contains Solidity contract files.

`migrations/`: Contains JavaScript files that handle smart contract deployments.

`truffle.js`: Contains Truffle configurations.

`static/`: Contains static files, such as images and fonts.

`src/index.js`: App's index file. ReactDOM.render logic is in here.

`src/App.js`: App's root component file.

`src/styles`: Overall style definition regarding stylesheet.

`src/redux`: Creates API functions that interact with the contract and keep track of consequent data.

`src/klaytn`: Contains files that support interaction with the Kaia.

* `src/klaytn/caver.js`: Instantiates caver-js within the configured settings.

  cf\) caver-js is a RPC call library which makes connections to the Kaia node, interacts with the nodes and smart contracts deployed on Kaia.

* `src/klaytn/Klaystagram.js`: Creates an instance of the contract using the caver-js API. You can interact with the contract through the instance.

`src/pages`: Contains two page files that compose Klaystagram app.

* `src/pages/AuthPage.js`: Contains sign up and login form. You can generate private key in the sign up form and use it to login on the app.

* `src/pages/FeedPage.js`: Reads photo data from the contract and show them to users. Also users can upload their pictures in FeedPage.

`src/components`: Contains component files that compose page.

* `src/components/Feed.js`: Reads data from contract and displays photos.

* `src/components/UploadPhoto.js`: Uploads photo by sending transaction to contract. 

* `src/components/TransferOwnership.js`: Transfers photo's ownership by sending transaction.


 


