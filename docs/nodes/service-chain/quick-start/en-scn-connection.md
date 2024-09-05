# Connect to Kairos

This section covers how to connect your 4-node ServiceChain network to the Kairos network.
You will set up a Kairos EN and connect the EN with one of your SCNs. Then you will enable the anchoring feature to put ServiceChain block information onto the Kairos network.

![](/img/nodes/sc-en-scn-arch.png)

## Prerequisites <a id="prerequisites"></a>
 - 1 Linux or MacOS server for EN
 - Minimum hardware requirements for testing
   - CPU: 4-core (Intel Xeon or equivalent), RAM: 16GB, HDD: 50GB
   - Please refer to the [System Requirements](../system-requirements.md) for more explanation.
 - Download the Kairos EN executable. For the full list of downloadable binaries, see [Download](../../downloads/downloads.md).
 - Assumptions and Limitations
   - A ServiceChain network is installed and running. Please refer to [Setting up a 4-node Service Chain](4nodes-setup-guide.md) to setup a network.
   - A Kairos EN.
   - One EN can only connect to one SCN since only one-to-one connection is supported.
   - Every SCN does not have to connect to the EN.

## Step 0: Install Kairos EN <a id="install-kairos-en"></a>
The installation is the uncompression of the downloaded package. Extract the archive on the EN server.

```bash
EN-01$ tar xvf ken-baobab-vX.X.X-XXXXX-amd64.tar.gz
```

## Step 1: Preparing genesis.json <a id="step-1-preparing-genesis-json"></a>
From the EN server, download the `genesis.json` for `Kairos` network.
```
EN-01$ curl -X GET https://packages.kaia.io/kairos/genesis.json -o ~/genesis.json
```

## Step 2: EN Node Initialization <a id="step-2-en-node-initialization"></a>
Now, we will initialize the EN node using the genesis file. Execute the following command.
It will create the data folder storing the chain data and logs on your home directory.
You can change the data folder using the `--datadir` directive.

```
EN-01$ ken init --datadir ~/data ~/genesis.json
```

## Step 3: Configure the EN Node <a id="step-3-configure-the-en-node"></a>
Go to the ken installation folder and rename `mv kend_baobab.conf kend.conf`, then edit `conf/kend.conf` as follows.

```
...
NETWORK="baobab"
...
SC_MAIN_BRIDGE=1
...
DATA_DIR=~/data
...
```

## Step 4: Start the EN Node <a id="step-4-start-the-en-node"></a>
```
EN-01$ kend start
Starting kscnd: OK
```
You can check block sync status by watching `kaia.blockNumber`. If this number is not 0, the node is working fine. Downloading all blocks on the Kairos network may take a long time depending on network conditions and hardware performance, so we recommend using [Fast Sync](../../endpoint-node/install-endpoint-nodes.md#fast-sync-optional) to synchronize blocks. 
```
EN-01$ ken attach --datadir ~/data
> kaia.blockNumber
21073
```
If you want to stop a node, you can use the command `kend stop`

## Step 5: Check KNI of EN Node <a id="step-5-check-kni-of-en-node"></a>
Take note of EN-01's KNI which is the information used to connect from an SCN-L2-01 node. This value will be used in the next step when generating `main-bridges.json`.
```
EN-01$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553...25bae@[::]:50505?discport=0"
```

![](/img/nodes/sc-en-scn-nodeInfo.png)

## Step 6: Create main-bridges.json <a id="step-6-create-main-bridges-json"></a>
Log on to an SCN-L2-01 (note: not the EN-01 node) and create `main-bridges.json` on `~/data`. Replace `[::]` located after `@` letter with EN-01 node's IP address.
```
SCN-L2-01$ echo '["kni://0f7aa6499553...25bae@192.168.1.1:50505?discport=0"]' > ~/data/main-bridges.json
```

## Step 7: Configure SCN then Restart kscn <a id="step-7-configure-scn-then-restart-kscn"></a>
From the SCN-L2-01 node's shell, edit `kscn-XXXXX-amd64/conf/kscnd.conf`.
If `SC_SUB_BRIDGE` is set to 1, data anchoring starts automatically when the SCN-L2-01 node starts. In this example, `SC_PARENT_CHAIN_ID` is set to 1001 because the `chainID` of the parent chain, Kairos, is 1001.
`SC_ANCHORING_PERIOD` is the parameter that decides the period to send an anchoring tx to the main chain. By setting the value to 10, you configure the node to perform anchoring every 10 blocks. The default value is 1.
```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

Restart kscn by executing the following command:
```
SCN-L2-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-01$ kscnd start
Starting kscnd: OK
```

Check if the SCN-L2-01 is connected to the EN-01 by checking `subbridge.peers.length`
```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

## Anchoring  <a id="anchoring"></a>
After finishing the EN-01 and SCN-L2-01 connection, you can log ServiceChain block information on the parent chain via Anchoring.
In this section, you will top up a parent operator account, enable Anchoring, and check the anchored block number.

### Step 1: Get KAIA to test anchoring <a id="step-1-get-kaia-to-test-anchoring"></a>
Anchoring requires SCN-L2-01 to make an anchoring transaction to Kairos. So `subbridge.parentOperator` account should have enough KAIA to pay the transaction fee. Get some KAIA from [Kairos Faucet](https://faucet.kaia.io/) and transfer some KAIA to the `parentOperator`. For data anchoring in real service, `parentOperator` needs to have enough KAIA for transaction fee.

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```
![](/img/nodes/sc-en-scn-faucet.png)

### Step 2: Start Anchoring <a id="step-2-start-anchoring"></a>
To start anchoring, execute the following command:
```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.anchoring(true)
true
```
After anchoring starts, you can check the latest block anchored to Kairos by using `subbridge.latestAnchoredBlockNumber`. Please note that this only works after the EN already followed up on the latest block of Kairos. By default, SCN-L2-01 tries anchoring on every block from the block on which anchoring is turned on. The anchoring period can be set by changing `SC_ANCHORING_PERIOD`. If the value is set to 10, the node tries anchoring when the block number is a multiple of 10.
```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.latestAnchoredBlockNumber
100
```
![](/img/nodes/sc-en-scn-anchoring.png)
