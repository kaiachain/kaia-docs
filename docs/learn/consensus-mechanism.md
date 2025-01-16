# Consensus Mechanism

A consensus mechanism (algorithm) is a way of reaching a consensus between trustless entities. In blockchain technology, it is used to reach a consensus about if a block is valid or not. The performance of blockchain networks relies on the performance of the adopted consensus mechanisms, and it has a significant impact on the perceived usability of the Blockchain Applications.

Kaia Mainnet exhibits the following performance.
- Handles 4,000 transactions per second. 
- Immediate transaction finality.
- One-second block generation time. 
- Over 50 consensus nodes can participate in the consensus process.

In the document, we will go over how Kaia implemented the high-performing consensus process. 

## Background <a id="background"></a>

[Bitcoin](https://en.wikipedia.org/wiki/Bitcoin) is using [PoW](https://en.wikipedia.org/wiki/Proof_of_work) (Proof-of-Work), whereas Ethereum has recently shifted to [PoS](https://en.wikipedia.org/wiki/Proof_of_stake) (Proof-of-Stake), which decides on the block generating nodes by the stake of the node. Usually, these algorithms involve no communication between nodes in determining the validities of blocks. 

So in these systems, a fork can happen which means two or more different blocks can be made on the same height. Usually, the "Longest chain wins" rule is applied to solve the fork condition. It means that those forks will be merged into a single canonical chain eventually, but it also means a list of blocks can be reverted in some period of time when it belongs to the shorter chain. So in these algorithms, there is no guarantee of the finality of blocks and transactions. The finality can only be achieved probabilistically after a period of time, which is still can't be 100% guaranteed.

This lack of finality is a very difficult issue in customer-facing services that use blockchain platforms. Because it has to wait until forks are resolved and enough blocks are stacked after the transfer to believe the transaction is not reversible. This has a negative effect both on users and service providers. 

A simple example of this issue can be demonstrated in financial services. Say a user transferred money to someone, and the service can't verify that the transfer is valid until 30 to 60 minutes have passed. Because it has to wait until the forks have been merged into a single chain and several blocks are stacked after the transfer to be sure that the transaction is not reversible.

### PBFT (Practical Byzantine Fault Tolerance)  <a id="pbft-practical-byzantine-fault-tolerance"></a>

To prevent the above issues, we need other algorithms that guarantee the finality. BFT algorithm is one of those, first [published](https://dl.acm.org/citation.cfm?doid=357172.357176) in 1982 by Lamport, Shostak, Pease. In 1999, Miguel Castro and Barbara Liskov introduced "Practical Byzantine Fault Tolerance" ([PBFT](http://www.pmg.csail.mit.edu/papers/bft-tocs.pdf)) which provides high-performance state machine replication.

In the PoW algorithm stated above, though each node receives and validates blocks, there are no message exchanges between nodes to reach a consensus. But in PBFT, each node communicates with other participating nodes to reach a consensus and the finality of the block can be guaranteed as soon as nodes were able to reach a consensus.

The communication between nodes basically progresses as shown below. But there are some variants which reflect each system's characteristics.

![PBFT message flow](/img/learn/pbft.png)

As shown above, a participating node in PBFT basically communicates with all nodes in the network in several phases. This characteristic limits the number of nodes because the communication volume increases exponentially as the number of nodes increases.

## Consensus Mechanism in Kaia <a id="consensus-mechanism-in-kaia"></a>
Kaia is aiming to be an Enterprise-ready and Service-centric platform. Therefore we need to solve the finality problem written above and the network should be able to allow many nodes to participate in the network. To make this possible, Kaia is using an optimized version of Istanbul BFT, which implements PBFT with modifications to deal with blockchain network's characteristics.

In Kaia, there are three types of nodes, CN (Consensus Node), PN (Proxy Node) and EN (Endpoint Node). CNs are managed by CCOs (Core Cell Operators) and are in charge of block generation. These blocks are verified by all nodes in the network. Please refer to [here](learn.md#network-architecture) to know more about this network topology.

![Network topology](/img/learn/klaytn_network_node.png)

Kaia achieves fast finality by adopting and improving Istanbul BFT. Because validation and consensus are done for each block there is no fork and the block's finality is guaranteed instantly as soon as the consensus is made. 

And also the issue of increasing communication volume in the BFT algorithm is solved by utilizing randomly selected `Committee`. CNs collectively form a `Council` and on each block generation, part of them are selected as a member of `Committee` using a VRF (Verifiable Random Function).

![Concept of council and committee](/img/learn/council-committee.png)

Because consensus messages are exchanged only between the committee members, the communication volume can be limited under the designed level even though the total number of CNs increases.

Currently, Kaia Mainnet can provide a high throughput of 4,000 transactions per second with one-second block generation interval. More than 50 consensus nodes can participate in the CNN (Consensus Node Network) at the moment and the number will continuously increase as Kaia continues to aggressively optimize the algorithm.
