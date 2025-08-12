# Import Ethereum Contracts

In most cases, you can use Ethereum contracts on Kaia without any modification.
However, be aware of the following two issues.  

## Solidity Support <a id="solidity-support"></a>

* Kairos network is currently compatible with **London** Ethereum Virtual Machine (EVM).
* Mainnet is currently compatible with **London** Ethereum Virtual Machine (EVM).

:::note

v1.7.0 Protocol Upgrade - incompatible changes including **Istanbul** hard fork items and Kaia's own items.
It has been enabled from block number `#75,373,312` in case of Kairos network and `#86,816,005` for the Mainnet.

v1.7.3 Protocol Upgrade - incompatible changes including Base Fee from the **London** hard fork.
It has been enabled from block number `#80,295,291` in case of Kairos network and `#86,816,005` for the Mainnet.

v1.8.0 Protocol Upgrade - incompatible changes including Base Fee from the **London** hard fork.
It has been enabled from block number `#86,513,895` in case of Kairos network and `#86,816,005` for the Mainnet.

:::

Backward compatibility is not guaranteed with other EVM versions on Kaia.
Thus, it is highly recommended compiling Solidity code with the correct target option according to the protocol upgrade status.

* Kairos: --evm-version london
* Mainnet: --evm-version london
* Others(private/service chain): determined according to the protocol upgrade status

Please refer to [how to set the EVM version of solc](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target).


An example command is shown below:

```
$ solc --evm-version london contract.sol
```

## Decoupled Key Pairs <a id="decoupled-key-pairs"></a>

Kaia [decouples key pairs from addresses](../../../learn/accounts.md#decoupling-key-pairs-from-addresses). If user [updates account](../../transactions/basic.md#txtypeaccountupdate), the private key for a specific account is replaced with another one. Most cases this will not affect your business logic. However if your business logic includes ecrecover, you should consider using validateSender. For more details, refer to [here](../../../learn/smart-contracts/precompiled-contracts.md).
