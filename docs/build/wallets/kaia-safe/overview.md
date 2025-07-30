# Kaia Safe Design

Currently, Kaia Safe is a collection of tools to create and manage multi-signature wallets, viz:

* **Safe React:** This is a react web app to create and interact with a multi-sig wallet.

* **Safe Transaction Service:** This keeps track of transactions sent via safe contracts and listens to events from recent blocks in Mainnet and Kairos. Transactions can also be sent to the service to allow off-chain collecting of signatures or to inform the owners about a transaction that is pending to be sent to the blockchain.

* **Safe Config Service:** This provides configuration information of the Kaia Safe clients environment, e.g configs of all chain details and APIs.

* **Safe Client Gateway:** This is a gateway between the Kaia Safe client and the backend services (transaction service and Kaia Nodes)

* **Safe Infrastructure:** This is a  cluster setup to deploy the backend services (Safe-Transaction, Safe-Config, Safe-Client gateway). 

Please refer to this [link](https://github.com/kaiachain/kaia-safe-infrastructure) to get more information.