# Node Security

Node security is a critical aspect of a secure blockchain network. Depending on the type of node, the operator needs to pay attention to security.

- Consensus Node (CN): CNs are responsible for proposing and validating new blocks. A compromised CN can create malicious blocks or disrupt the blockchain. Certainly, the misbehaviour of a few nodes is blocked by the BFT consensus. However, they can still cause bad blocks or round changes that degrade the stability of the network. Therefore, core cell operators should maintain their nodes responsibly.
- Proxy Node (PN): PNs communicate with nodes on the Internet on behalf of CNs. While a PN does not sign blocks by itself, a security breach of a PN can damage the network. Its p2p key can be used to connect to the CN's restrictive network. A compromised PN can also neutralise the transaction filtering such as the spam filter.
- Endpoint Node (EN): ENs provide public access to the network for the applications. While an EN has no authority to manipulate the blocks, a security breach of an EN can pose trust issues. A compromised EN can serve false information including block data and account states. It can drop or censor incoming transactions if the app is directly connected to the EN.

## Operation security

Follow the security best practices whenever possible. To list a few:

- Keep the operating systems and installed software up-to-date.
- Enhance SSH security by disabling remote root login, switching off password-based login, and opting for public-key authentication.
- Always operate nodes on dedicated machines. To reduce the risk of malware via supply chain attacks, refrain from installing other software, especially the ones that connect to the Internet. The machine or virtual machine must be used for node operation purposes only.
- Install firewalls. Keep the open ports minimal and whitelist the maintenance and operator IP addresses. Be careful when opening the SSH, RPC, or debug ports. For CNs and PNs, the p2p port should be restricted to an explicit list of peer CN and PN IPs. Even if the p2p stack has a vulnerability the attack opportunity is effectively blocked or restricted to the known nodes.
- Prioritize cloud security. When the node is operating on cloud virtual machines, properly manage the cloud accounts (e.g. AWS IAM roles) according to the cloud provider's best practices. The cloud accounts may not have access to SSH, but they can copy the disk contents or open a serial console.

## Key security

There are two major cryptographic keys managed by a node.

- Node key or p2p key: A 32-byte secp256k1 ECDSA private key. It's used in the p2p rlpx communication as well as signing the blocks.
- BLS node key: A 32-byte BLS12-381 private key. It's used to sign the RANDAO field in the blocks.

Because the signing must happen automatically unattended, those keys have to be stored on the disk or entered via the command line. At this point, node security is critical in protecting the keys from theft.

In the future, the nodes could support storing the keys in an external provider such as key management systems (KMS) or hardware security modules (HSM). Note that node security is still important even with these key management mechanisms. Although the keys cannot be copied, a compromised node can still initiate the signing of malicious payloads.
On top of key theft, key loss is also a risk to manage. It is recommended to backup the node keys in an encrypted keystore file, and preserve in an offline storage.

