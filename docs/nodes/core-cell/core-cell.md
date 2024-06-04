# Core Cell

## Intended Audience  <a id="intended-audience"></a>

- Core Cell Operators
- If your interest is in making and running Blockchain Applications on Kaia, you don't need to maintain a Core Cell. You need to run an [Endpoint Node](../endpoint-node/endpoint-node.md) instead to make your application interact with Kaia network. 


## Core Cell Overview <a id="core-cell-overview"></a>

Core Cell (CC) is an entity that is participating in the consensus process, and is in charge of executing transactions and generating blocks.
A Kaia Core Cell (CC) consists of the following components.

-  Consensus Node (CN): Consensus Nodes are participating in the block generation process. 
-  Proxy Node (PN): Proxy Nodes provide the interface to the network. PNs transmit the transaction requests to the Consensus Nodes, and propagate the blocks down to the Endpoint Nodes.

It is recommended that a Core Cell consists of one CN with two or more PNs.
A CN connects to other CNs within the Core Cell Network to perform consensus. 
CNs only accept connections from their PNs in the same Core Cell to receive transaction requests and propagate blocks to the network. 
PNs accepts connections from any ENs within the Endpoint Node Network.

![Core Cell Overview](/img/nodes/cn_set.png)

| Name | Description | Network Security | Quantity |
| :--- | :--- | :--- | :--- |
| CN | A node that creates a new block with other CNs in the Core Cell Network | A network is composed of permissioned CNs. (Requires IP access control). | 1 unit |
| PN | - A node that submits transactions received from the Kaia Endpoint Node Network to the CN. <br/>- It propagates the created blocks to Kaia Endpoint Node Network. <br/>- It can scale out horizontally depending on the number of ENs in the Endpoint Node Network. | - It is connected to the CN in the Core Cell, and its IP and Ports are required to be public to accept connections from other Kaia nodes on the Internet. <br/>- It can connect to other PNs in other Core Cell via PN bootnode. <br/>- It can connect to ENs via EN bootnode. | At least 1 PN required. 2 or more PNs are recommended. |
