# Transfer value between sibling service chains

This section will explain how to enable value transfer between ServiceChain networks.
The main features provided by ServiceChain, data anchoring and value transfer, can be used independently. That is, you can use only data anchoring or only value transfer, regardless of whether you use the other feature. 

As shown in the figure below, if there are two ServiceChains (chainID 1002 and 1004) connected to Kairos, since each servicechain performs data anchoring with Kairos, data anchoring is not required between each other, only value transfer is required.

To transfer value when there is no bridge between two ServiceChains, first transfer value from the ServiceChain (chainID 1002) to kairos (chainID 1001), and then transfer value from kairos (chainID 1001) to the ServiceChain (chainID 1004) again. This is inefficient than providing value transfer directly from the ServiceChain (chainID 1002) to the ServiceChain (chainID 1004) at once. Therefore, by creating a bridge between ServiceChains directly, we can transfer value efficiently . 

![](/img/nodes/sc-vt-between-sibling-arch.png)

## Prerequisites <a id="prerequisites"></a>
- We assume that you installed two ServiceChains, Each servicechain is connected to the kairos EN. Refer to [Connecting to Kairos](en-scn-connection.md).
- We also assume that you have experienced value transfer through [Cross-Chain Value Transfer](value-transfer.md). 

Repeat [Connecting to Kairos](en-scn-connection.md) as shown in the picture above to additionally install ServiceChain (chianID 1004).

A node can have only one main-bridge and one sub-bridge each. In this example, for convenience of explanation, we are going to connect a bridge to SCN-L2-03 and SCN-L2-07, which are nodes that do not have both main-bridge and sub-bridge yet.

![](/img/nodes/sc-vt-between-sibling-bridge.png)

## Step 1: Check KNI of SCN-L2-03 Node <a id="step-1-check-kni-of-scn-node"></a>
Take note of SCN-L2-03's KNI which is the information used to connect from an SCN node. This value will be used in the next step when generating `main-bridges.json`

```
SCN-L2-03$ kscn attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://...39047242eb86278689...@[::]:50505?discport=0"
```

## Step 2: Create main-bridges.json <a id="step-2-create-main-bridges-json"></a>
Log on to an SCN-L2-07 (note: chianID 1004) and create `main-bridges.json` on `~/data`. Replace `[::]` located after `@` letter with EN node's IP address.
```
$ echo '["kni://...39047242eb86278689...@192.168.0.3:50505?discport=0"]' > ~/data/main-bridges.json
```

## Step 3: Configure SCN then Restart <a id="step-3-configure-scn-then-restart"></a>
From the SCN-L2-07 node's shell, edit `kscn-XXXXX-amd64/conf/kscnd.conf`. Since each ServiceChain already anchored with the Kairos EN, data anchoring between sibling is not required. So we set `SC_ANCHORING` to 0. 

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1002
...
SC_ANCHORING=0
...
```

Restart kscnd on SCN-L2-07 node
```
SCN-L2-07$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-07$ kscnd start
Starting kscnd: OK
```

Check if the SCN-L2-07 is connected to the SCN-L2-03 by checking `subbridge.peers.length`
```
SCN-L2-07$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

In the case of value transfer, if the information corresponding to chainID 1002 is used as the mainbridge information and the information corresponding to chainID 1004 is set as a subbridge, value transfer is possible between siblings as in [Cross-Chain Value Transfer](value-transfer.md).
