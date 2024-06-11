# Network Configuration

A Core Cell can be made up of:

* multiple subnets (recommended)
* a single subnet

## A Core Cell with Multiple Subnets <a id="a-core-cell-with-multiple-subnets"></a>

It is recommended to have a two-layer subnet which is used in general web services such as DB + AppServer and Proxy Web Servers. This design of the subnet has more advantages on the security.

Since monitoring servers are also required for managing all servers as another layer, the following section describes how to setup a Core Cell with a three-layer subnet.

The three-layer subnet consists of the following:

* CN Subnet
* PN Subnet
* Management (Mgmt) Subnet

### CN Subnet <a id="cn-subnet"></a>

A CN Subnet consists of CN servers in Core Cells. The working CN in a Core Cell is only one, but spare one should be prepared for high availability. IP/Port of all CNs within the Core Cell Network (CCN) must be opened to each other because they try to connect to the others from the outside of the Core Cell. (This connection information can be received from Kairos operators.) The internal communication with other subnets in the Core Cell requires to open default port (32323: default Kaia P2P port number) in order to connect to PNs of the PN Subnet. Furthermore, it is necessary to open other ports such as the CN monitoring port (61001) for the monitoring server and the SSH port (22) for the management purpose. If the multichannel feature is used, another port (32324: default multichannel port) should be opened as well.

![CN Subnet](/img/nodes/cn_subnet.png)

| Origin Subnet | Target Subnet | Ingress | Egress |
| :--- | :--- | :--- | :--- |
| CN Subnet | PN Subnet | P2P: 32323 (32324 for multichannel) | All |
| CN Subnet | Mgmt Subnet | SSH: 22, Monitoring: 61001 | All |
| CN Subnet | Public (Internet) | each CN's IP and P2P port | All |

### PN Subnet <a id="pn-subnet"></a>

A PN Subnet consists of the PN servers to provide services in order to connect to the external ENs.

A PN subnet is connected to the following nodes:

* CNs in Core Cells
* Some PNs of other Core Cells
* Core Cell Management Servers (Mgmt, Monitoring)
* EN nodes

![PN Subnet](/img/nodes/pn_subnet.png)

| Origin Subnet | Target Subnet | Ingress | Egress |
| :--- | :--- | :--- | :--- |
| PN Subnet | CN Subnet | P2P: 32323 (32324 for multichannel) | All |
| PN Subnet | Mgmt Subnet | SSH: 22, Monitoring: 61001 | All |
| PN Subnet | Public (Internet) | P2P: 32323 | All |

### Mgmt Subnet <a id="mgmt-subnet"></a>

A Mgmt Subnet is a gateway subnet for the operator to enter into the Core Cell nodes through ssh. A VPN server may be necessary to make the connection together with a monitoring server and a management server installed with a tool to manage the Core Cell nodes.

![Management Subnet](/img/nodes/admin_subnet.png)

| Origin Subnet | Target Subnet | Ingress | Egress |
| :--- | :--- | :--- | :--- |
| Mgmt Subnet | CN Subnet | All | All |
| Mgmt Subnet | PN Subnet | All | All |
| Mgmt Subnet | Public (Internet) | VPN (tcp): 443, VPN (udp): 1194 | All |

## A Core Cell with a Single Subnet <a id="a-core-cell-with-a-single-subnet"></a>

A single subnet of a Core Cell is built for the development/test purpose or under the difficult circumstances to create multiple subnets.

All nodes are setup under a single CC subnet. Firewall setup is also necessary for the CN to connect to other CNs within the CNN using P2P port (32323, 32324 for multichannel option). The P2P port of the PN is opened to connect with ENs in Endpoint Node Network (ENN) and PNs in the Core Cell Network (CNN). Additionally, an optional VPN and monitoring servers are required to be managed remotely.

![CC with a Single Subnet](/img/nodes/cc_single_subnet.png)

