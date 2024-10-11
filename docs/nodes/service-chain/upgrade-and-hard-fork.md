# Upgrade Service Chain

Kaia and its ServiceChain have constantly released new versions to develop new features and fix bugs. This page is a guide to upgrade ServiceChain binaries and setting hard fork block numbers for your ServiceChain.

## Upgrade <a href="#upgrade" id="upgrade"></a>

This section shows how to upgrade the ServiceChain binary.

**NOTE** Upgrading ServiceChain binaries may be irreversible and backward-incompatible, meaning you cannot downgrade to an older version. Refer to the release notes for more details. For example, the [Kaia v1.9.0 release note](https://medium.com/klaytn/klaytn-v1-9-0-release-notes-medium-58e4644f7544) says:

> NOTE: This version updates the version of the database to support snapshot sync. You cannot downgrade to the older versions with existing data after updating to v1.9.0.

You can get the latest version of Kaia and ServiceChain binaries in one of the below links:

* [Kaia Docs](../downloads/downloads.md)
* [Kaia Github Repository](https://github.com/kaiachain/kaia/releases)

To upgrade the ServiceChain binary, stop the ServiceChain node and replace the binary. For example, you can use below commands to stop an SCN node and replace the binary with a newer one.

```bash
$ kscnd stop
Shutting down kscnd: OK
$ cp /path/to/new/kscn /path/to/original/kscn
```

You may restart the ServiceChain node after the upgrade. However, if you are planning to activate hard fork in the ServiceChain, you have to keep the ServiceChain nodes down. Refer to the [Hard Fork](#hard-fork) for instructions of ServiceChain hard fork.

```bash
$ kscnd start
```

## Hard Fork <a href="#hard-fork" id="hard-fork"></a>

This section describes the steps for applying Kaia [hard forks](../../misc/klaytn-history.md) to ServiceChain.

To apply the hard fork to the ServiceChain, you need to:

1. Pick an appropriate block number for the hard fork
2. Upgrade the ServiceChain binary to a version that supports the hard fork
3. Set the hard fork block number in the ServiceChain

### 1. Pick an appropriate block number for the hard fork <a href="#1-pick-an-appropriate-block-number-for-the-hard-fork" id="1-pick-an-appropriate-block-number-for-the-hard-fork"></a>

In the Javascript console of the ServiceChain, you can check the current block number as shown below.

```bash
$ kscn attach --datadir ~/kscnd_home
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> kaia.blockNumber
1234
```

Now, you have to choose an appropriate block number to activate the hard fork. Make sure to have enough number of blocks (which is produced every second) between the current block and the block of hard fork.

### 2. Upgrade the ServiceChain binary <a href="#2-upgrade-the-servicechain-binary" id="2-upgrade-the-servicechain-binary"></a>

Refer to the [Upgrade](#upgrade) section in this page for instructions on upgrading the ServiceChain binaries. Make sure to keep the ServiceChain nodes down (or stopped) for now. You will restart them after you have set the hard fork block number.

### 3. Set the Hard Fork Block Number <a href="#3-set-the-hard-fork-block-number" id="3-set-the-hard-fork-block-number"></a>

If you have upgraded the ServiceChain binaries with a version that supports the desired hard fork, you can set the hard fork block number in the ServiceChain by re-initializing the chain config with updated genesis.

#### Update genesis and re-initialize chain config for all ServiceChain nodes <a href="#update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes" id="update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes"></a>

First, specify the hard fork number in the `config` field of `genesis.json`. For example, if you are trying to activate the Magma hard fork in your ServiceChain, you should specify the `magmaCompatibleBlock` in `config` field of the genesis, like below.

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    ...
    "magmaCompatibleBlock": 1500,
    ...
  },
  ...
}
```

To enable a hard fork in the chain config, previous hard forks should be enabled. That is, to enable Magma hard fork, the EthTxType hard fork should be already enabled. If there are missing fields for the compatible block numbers of preceding hard forks in the chain config, you have to add them too.

For example, if you want to set Magma hard fork block number and if your `genesis.json` does not have `ethTxTypeCompatibleBlock` in its `config` field like below:

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

You have to add `ethTxTypeCompatibleBlock` too, when you add `magmaCompatibleBlock` in the `config` field, like below.

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "ethTxTypeCompatibleBlock": 1500,
    "magmaCompatibleBlock": 1500,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

You can find the history of Kaia hard forks in the [Kaia Docs](../../misc/klaytn-history.md).

If you have updated your `genesis.json` with desired hard forks, re-initialize the chain config and apply your change.

```bash
$ kscn --datadir /path/to/data/directory init /path/to/genesis.json
```

**NOTE** It is normal that the following error log is printed when you re-initialize the chain config.

```
ERROR[08/02,09:12:39 Z] [48] The same or more recent governance index exist. Skip writing governance index  newIdx=0 govIdxes=[0]
```

#### Confirm the updated chain config <a href="#confirm-the-updated-chain-config" id="confirm-the-updated-chain-config"></a>

Now, restart the ServiceChain node. For example, you can restart a SCN node with the following command.

```bash
$ kscnd start
```

Then, in the Javascript console of SCN, you can check the updated chain config.

```bash
$ kscn attach --datadir ~/kscnd_home
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.chainConfig.magmaCompatibleBlock
1500
```

## Some Hard Fork specifics <a href="#some-hard-fork-specifics" id="some-hard-fork-specifics"></a>

This section describes some details for a specific hard fork.

### Magma <a href="#magma" id="magma"></a>

The Magma hard fork introduces the KIP-71, dynamic gas fee. It includes the upper and lower bound of the gas price.

By default, the upper bound is set to `750000000000` and the lower bound is set to `25000000000`. You can change those bounds in the Javascript console of SCN nodes using the [governance APIs](../../../references/json-rpc/governance/chain-config). Obviously, lower bound cannot exceed the upper bound.

To set the gas price to a static value, you have to set the upper and lower bound of the gas price to the same value. For example, you can set gas price to `0`, using `governance.vote` API in the Javascript console of the SCN nodes.

```bash
$ kscn attach --datadir ~/kscnd_home
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.vote("kip71.lowerboundbasefee", 0)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
> governance.vote("kip71.upperboundbasefee", 0)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```

**NOTE** The governance voting and its update are available regardless of the activation of the Magma hard fork. That is, the governance voting can be also done prior to the Magma hard fork activation.

If the votes for updating the upper and lower bound of the gas price were successful, those changes will take effect after 2 istanbul epochs (An epoch has the value in block numbers).

For example, if the epoch is 3600, and the votes for updating the upper and lower bounds of gas price has been placed in the block #4000, those changes will take effect starting from the block #10800. In detail, the votes will be finalized when their first epoch was reached at the block #7200, and the changes are applied at the second epoch (block #10800).

To check the epoch, you can use the `governanace.itemsAt` API, like below.

```javascript
> governance.itemsAt(kaia.blockNumber)
{
  governance.governancemode: "none",
  governance.governingnode: "0x05ad406f31e22b74f18c9ed65ed1ccd349bbbee0",
  governance.unitprice: 0,
  istanbul.committeesize: 21,
  istanbul.epoch: 3600,
  istanbul.policy: 0,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: false,
  reward.minimumstake: "2000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.useginicoeff: false
}
```

You can see that the `istanbul.epoch` has a value of 3600 blocks, which would normally take an hour to pass.

You can change the epoch too, using the `governance.vote` API.

```javascript
> governance.vote("istanbul.epoch", 60)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```
