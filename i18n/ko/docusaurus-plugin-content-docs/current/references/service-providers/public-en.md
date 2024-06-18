# Public JSON RPC Endpoints

Publicly exposed JSON-RPC endpoints allow you to test and run your blockchain products by providing interaction with the Kaia network without running your own node.

Running your own Kaia Endpoint Node (EN) is not simple, it requires technical expertise, monitoring and computing resources. It comes with a cost of maintaining storage, network bandwidth as well as having to divert engineering time and resources; nodes must be kept up to date and health checked regularly. Hence, the main benefit of using an existing Public EN is that it allows you to solely focus on building and testing your blockchain product without the distraction of maintaining infrastructure to connect and interact with the Kaia network.

## Things to Consider

- The node providers are not responsible for any damage or losses caused in relation to traffic or interaction with the nodes.
- If traffic is concentrated on certain nodes, you may experience service delay.
- To prevent too many requests, rate limits may apply on a per-node basis, which are subject to change without prior notification.

## Public JSON-RPC Endpoint Providers

Below is the list of Kaia’s Public Node Providers and the network domains.

### Mainnet Public JSON-RPC Endpoints

Please keep in mind that these endpoints are provided to the community for testing and development purposes.
Since we cannot guarantee uptime and stability of the endpoints, do not use them for commercial purposes.

**HTTPS**

| Service Provider                                 | Endpoints                                         | Namespaces   | Type    |
| ------------------------------------------------ | ------------------------------------------------- | ------------ | ------- |
| [Kaia Foundation](https://www.klaytn.foundation) | `https://public-en-cypress.klaytn.net`            | klay,eth,net | Full    |
|                                                  | `https://archive-en.cypress.klaytn.net`           | klay,eth,net | Archive |
| [All That Node](www.allthatnode.com)             | `https://klaytn-mainnet-rpc.allthatnode.com:8551` | klay,eth,net | Full    |
| [BlockPI Network](https://blockpi.io/)           | `https://klaytn.blockpi.network/v1/rpc/public`    | klay,eth,net | Full    |
| [OnFinality](https://onfinality.io/)             | `https://klaytn.api.onfinality.io/public`         | klay,eth,net | Full    |
| [Pokt Network](https://pokt.network/)            | `https://klaytn-rpc.gateway.pokt.network/`        | klay,eth,net | Full    |

**WebSocket**

| Service Provider                                 | Endpoints                                  | Namespaces   | Type    |
| ------------------------------------------------ | ------------------------------------------ | ------------ | ------- |
| [Kaia Foundation](https://www.klaytn.foundation) | `wss://public-en-cypress.klaytn.net/ws`    | klay,eth,net | Full    |
|                                                  | `wss://archive-en.cypress.klaytn.net/ws`   | klay,eth,net | Archive |
| [OnFinality](https://onfinality.io/)             | `wss://klaytn.api.onfinality.io/public-ws` | klay,eth,net | Full    |

## Testnet (Kairos) Public JSON-RPC Endpoints

**HTTPS**

| Service Provider                                 | Endpoints                                             | Namespaces   | Type    |
| ------------------------------------------------ | ----------------------------------------------------- | ------------ | ------- |
| [Kaia Foundation](https://www.klaytn.foundation) | `https://public-en-baobab.klaytn.net`                 | klay,eth,net | Full    |
|                                                  | `https://archive-en.baobab.klaytn.net/`               | klay,eth,net | Archive |
| [All That Node](www.allthatnode.com)             | `https://klaytn-baobab-rpc.allthatnode.com:8551`      | klay,eth,net | Full    |
| [BlockPI Network](https://blockpi.io/)           | `https://klaytn-baobab.blockpi.network/v1/rpc/public` | klay,eth,net | Full    |

**WebSocket**

| Service Provider                                 | Endpoints                               | Namespaces   | Type    |
| ------------------------------------------------ | --------------------------------------- | ------------ | ------- |
| [Kaia Foundation](https://www.klaytn.foundation) | `wss://public-en-baobab.klaytn.net/ws`  | klay,eth,net | Full    |
|                                                  | `wss://archive-en.baobab.klaytn.net/ws` | klay,eth,net | Archive |

## Useful Resources

- Wallet: Kaikas is a browser extension wallet for the Kaia Network.
  [Kaikas](../../build/tools/wallets/kaikas.md)

- Faucet: You can obtain test KAIA for the Kairos test network.
  [Faucet](../../build/tools/wallets/kaia-wallet.md#how-to-receive-kairos-testnet-klay)

- Explorer: Kaiascope is the block explorer for the Kaia Network.
  [Kaiascope](../../build/tools/block-explorers/kaiascope.md)

- ChainID : Kairos: 1001 (0x3E9), Mainnet: 8217 (0x2019)

- Gas price: dynamically adjusted within the range [25, 750]. The range can be changed via on-chain governance. For more information, refer to [governance](../../json-rpc/governance/chain-config).
  [Transaction Fees](../../learn/transaction-fees/transaction-fees.md)
