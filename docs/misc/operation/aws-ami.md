# Use AWS AMIs

:::info[Service No Longer Updated]

The AWS AMI service for Kaia endpoint nodes is no longer being updated (last update: November 2024). While existing AMIs (dated November 2024) are still available for use, please note that they may require additional synchronization time to catch up with the current blockchain state. For alternative setup methods, such as using chaindata snapshots or performing full synchronization, please refer to [Block Synchronization](../../learn/storage/block-sync.md).

:::

Kaia offers an AWS AMI ([Amazon Machine Image](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)) for Kaia endpoint nodes (EN). These AMIs are pre-installed with both the EN software and the chaindata, enabling users to quickly and conveniently launch a fully operational node. With Kaia's AMI, setting up a new endpoint node on demand becomes seamless, allowing for simplifying the process of joining the Kaia network.

## Why use AMI

AMI offers a convenient way to launch a new Kaia EN. Also, as its chaindata is already set, you don't need extra disk storage to download and extract compressed chaindata. Additionally, using AMI is the only option to operate a new EN without full sync for some sync modes, such as archive mode or full mode without state migration (we only provide snapshot download for pruned chaindata).

## Types of EN AMIs

Kaia provides different types of AMIs, whose chaindata has been synced with different modes.

| **Type** | **Sync Mode** | **AMI Name** |
|----------|---------------|--------------|
| full             | Full mode                                         | `kaia-xxxx-clean-full-en-xxxx` |
| pruning          | Full mode, live pruning enabled                   | `kaia-xxxx-clean-pruning-en-xxxx` |
| state-migrated   | Full mode, state migrated (or state batch pruned) | `kaia-xxxx-clean-en-xxxx`|
| archive          | Archive mode                                      | `kaia-xxxx-clean-archive-en-xxxx` |

Kaia provides these 4 types of AMIs for mainnet. There are also AMIs for Kairos except for the `full` type.

See [State Batch Pruning](../../../learn/storage/state-pruning/#state-batch-pruning-state-migration) for more details on state migrated chaindata.
See [Block Synchronization](../../learn/storage/block-sync.md) for more details on block sync modes.


## Launch new EC2 instance with AMI in Amazon console

When launching a new EC2 instance in the AWS console, you should select an AMI. Search for `kaia-mainnet` in the AMI search bar.

![AMI search bar](/img/misc/ami_search.png)

The page will bring you to the search results. Click "Community AMIs" tab in the search result page and select the AMI you want to use in the list.

![AMI search result](/img/misc/ami_select.png)

### Allow inbound connections

When launching a new EC2 instance in the AWS console, you can either create a new security group for the instance or choose existing security group. Either way, you must add inbound rules to allow connections to the ports that Kaia nodes use to communicate each other.

Navigate to the EC2 instance page in the AWS console, find associated security groups in the "Security" tab. You should add inbound rules for port 32323-32324.

| IP version | Type        | Protocol | Port range     | Source   |
|------------|-------------|----------|----------------|----------|
| IPv4       | Custom TCP  | TCP      | 32323 - 32324  | 0.0.0.0/0|
| IPv4       | Custom UDP  | UDP      | 32323          | 0.0.0.0/0|

## Post-Launch Instance Preparation and Setup

### Warmup Amazon EBS volumes

The Amazon EBS volumes that were created from snapshots (AMI would be one case), the storage blocks must be pulled down from Amazon S3 and written to the volume before they can be accessed. This causes a significant overhead for disk operations the first time each block is accessed. Volume performance is recovered after all blocks have been downloaded and written to the volume. For more details, see [Initialize Amazon EBS volumes](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-initialize.html).

In order to get our volume ready, we can run a task to read all blocks.

```bash
$ sudo yum install -y fio
$ sudo fio --filename=/dev/nvme1n1 --rw=read --bs=128k --iodepth=32 --ioengine=libaio --direct=1 --name=volume-initialize
```

:::note

This task to warmup Amazon EBS volume would take a long time depending on the data size. Refer to `fio` output for the ETA.

:::

### Check `kend.conf` configuration

Before starting the node, check `NETWORK` and `NETWORK_ID` fields in the configuration file `kend.conf`. The `kend.conf` file is located in `/etc/kend/conf/kend.conf`.

For Mainnet, the `NETWORK` field should be `mainnet`. For Kairos, the `NETWORK` field should be `kairos`.
```
# for Mainnet
NETWORK=mainnet

# for Kairos
NETWORK=kairos
```

Note that `NETWORK_ID` is only used for private network. Thus make sure not to set `NETWORK_ID` for Mainnet or Kairos.

For more details on `kend.conf`, see [Configuration](configuration.md).

### Start `kend` service

In the EC2 instance, Kaia CLI client and the chaindata are installed. Also, `kend`, the script to start/terminate EN, is installed as a service. You can check the `kend` service's status by the following command.

```bash
$ sudo service kend status
```

If the service is not running, try to restart it.

```bash
$ sudo service kend restart
```

If the service restarted and the EN has started successfully, you can check its logs in the path `/var/kend/logs/kend.out`.

```bash
$ tail -f /var/kend/logs/kend.out
```

Kaia provides a CLI client `ken console`. You can interact with the Kaia node using the `ken console` via multiple endpoints, and one option is to use IPC (inter-process communication). The IPC file `klay.ipc` is located in the `DATA_DIR` path on an EN, in our case `/var/kend/data`. Thus in order to use `ken console`:

```bash
$ sudo ken attach --datadir /var/kend/data
Welcome to the Kaia JavaScript console!

 instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
  datadir: /var/kend/data
  modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

### Wait for block sync

Since the AMI was created hours ago, we need some time to sync to the latest block. You can check the currently synced block number and the sync progress in the `ken console`.

```js
> klay.blockNumber
165227166
> klay.syncing
{
  currentBlock: 165227166,
  highestBlock: 165357203,
  knownStates: 0,
  pulledStates: 0,
  startingBlock: 165222272
}
```

When the block sync is done, querying sync progress should return `false`.

```js
> klay.syncing
false
```
