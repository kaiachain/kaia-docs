# Scaling Solutions

## Service Chain <a id="service-chain"></a>
Service chains in Kaia are auxiliary blockchains independent from the Kaia main chain,
tailored for individual dApp requiring special node configurations, customized security levels,
or exceptionally high throughput that makes deploying the dApp on the main chain inconvenient or economically infeasible.

While there are fully-decentralized scaling solutions, due to their difficult interfaces such as challenge or exit and non-immediate finality,
we take a different approach in Kaia’s Service Chain by sacrificing the full decentralization for better usability,
instant finality, high performance, and high availability.

Kaia service chains may be used for various service-specific goals,
and can connect to the main chain for multiple reasons including data anchoring (periodic storing of block hashes
from the service chain onto the main chain to compensate for the decreased security of the service chain due to the smaller number of nodes) or
value transfer (interchain transfer of KAIA, Kaia’s native unit of value, and the tokens
issued by dApps).

## Network <a id="network"></a>
Service chains connected to Kaia main chain are collectively called Service Chain Network.
Note that the method of connection between service chains and the main chain may change in Kaia’s future iterations.

![Figure 1. Kaia Main Chain and Service Chain](/img/learn/mainchain_servicechain.png)

Figure 1 shows the network topology of service chains being used to meet various business needs, connected
with Kaia main chain to expand the Kaia network.

![Figure 2. Main Chain and Service Chain Connection using Main/Sub-Bridge Model](/img/learn/sc_connection.png)

Figure 2 shows an example of SCN (Service Chain Consensus Node) connected directly with Kaia main chain’s EN (Endpoint Node)
using a main/sub-bridge model in using the service chain’s features.
 
## Features <a id="features"></a>
Service Chain expands and augments Kaia by providing a data integrity mechanism and supporting token transfers between different chains.

### Data Anchoring <a id="data-anchoring"></a>
For data integrity, Service Chain can automatically anchor every service chain block hash as a special transaction to the main chain.
This data anchoring can ensure to the service users that the data in the service chain cannot be altered once it is created.

### Value Transfer <a id="value-transfer"></a>
To help the service providers (SPs) to easily migrate service users and values across chains,
transferring tokens, such as KAIA (Kaia's native unit of value) and Kaia tokens issued by dApps, between different chains can be enabled.
Users can easily request to transfer tokens to other chains by sending a transaction to a special contract, called bridge contract.

