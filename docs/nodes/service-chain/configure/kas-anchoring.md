# Use Data Anchoring with KAS

As explained in the design section, you can anchor your service chain data to Kaia main chain.
This page introduces how to enable data anchoring via [KAS (Kaia API Service)](https://www.klaytnapi.com).

Once it is turned on, a node in your service chain can periodically anchor its chain data (block data) to Mainnet or Kairos as a proof of existence and immutability of the service chain. 
This ensures the security and credibility of the service chain.

## Preparation for Using KAS <a id="preparation-with-kas"></a>
This section introduces the pre-requisites to use KAS for data anchoring.

### Sign Up KAS (Kaia API Service) <a id="sign-up-kas"></a>
First, you need to sign up KAS on the [KAS console website](https://www.klaytnapi.com) to get a KAS account.
Please visit the website above and sign up in KAS.

[![main page](/img/nodes/kas-main-en.png)](https://www.klaytnapi.com)

[![sign up](/img/nodes/kas-signup-en.png)](https://www.klaytnapi.com)

### Create Credential <a id="check-credential"></a>
After login, you can create your credential like below.
The `AccessKey ID` and `Secret AccessKey`, or `Authorization` will be used to call KAS APIs.

![credential](/img/nodes/kas-credential-en.png)

## Anchor API <a id="anchor-api"></a>
KAS provides Anchor API, which is designed for data anchoring and surely it is the one that you are going to use for anchoring task.

![anchor api](/img/nodes/kas-anchor-api-en.png)

## Create Operator Address <a id="create-kas-credential"></a>
To anchor service chain data via KAS, there should be a Kaia address, enrolled in KAS, that actually send anchoring transaction to Kaia. So, before you set up your service node, you need to create an Kaia account called "operator" via KAS. Please, use KAS console to create this account. 

It is important to be noticed that you must **first select the chain** in Kaia to which you want to anchor your data on **the top right corner of the KAS console page**. You should create an operator for each chain (Mainnet/Kairos). 



![select chain](/img/nodes/kas-select-chain-en.png)

Create an operator as below.

![create operator](/img/nodes/kas-create-operator-en.png)

Then, you can check your operator list like below.
Please note that the address of an operator is required for setting your service chain node.

![create operator](/img/nodes/kas-operator-list-en.png)

## Configure Service Chain Node <a id="configure-service-chain-node"></a>
After obtaining API credentials, Anchor API information (API endpoint and parameters), and an operator account in KAS, then It is time to set up your service chain node.
You need to edit the configuration file (`kscnd.conf`, `kspnd.conf`, `ksend.conf`) of your service chain node like below.

You should set `SC_SUB_BRIDGE=1` and all `SC_KAS_` prefix items.

```bash
...
# service chain options setting
...
SC_SUB_BRIDGE=1
...

SC_KAS_ANCHOR=1                                                         # 1: enable, 0: disable
SC_KAS_ANCHOR_PERIOD=10                                                 # Anchoring block period
SC_KAS_ANCHOR_URL="https://anchor-api.klaytn.com/v1/anchor"             # Anchor API URL
SC_KAS_ANCHOR_OPERATOR="0x6A3D565C4a2a4cd0Fb3df8EDfb63a151717EA1D7"     # Operator address
SC_KAS_ANCHOR_ACCESS_KEY="KAJM4BEIR9SKJKAW1G3TT8GX"                     # Credential Access key
SC_KAS_ANCHOR_SECRET_KEY="KyD5w9ZlZQ7ejj6lDF6elb61u8JH/mXdKqhgr3yF"     # Credential Secret key
SC_KAS_ANCHOR_X_CHAIN_ID=1001                                           # Mainnet: 8217, Kairos: 1001
...
```

## Run Service Chain Node <a id="run-service-chain-node"></a>
Now you are good to go. You can run your service chain node.
You will see the log message related with KAS Anchor API like below.

```bash
...
INFO[09/10,18:09:28 +09] [5] Imported new chain segment                number=86495 hash=5a20d6…cbca1b blocks=1  txs=3 elapsed=2.387ms  trieDBSize=5.10kB mgas=0.063 mgasps=26.383
INFO[09/10,18:09:28 +09] [53] Anchored a block via KAS                  blkNum=86495
INFO[09/10,18:09:29 +09] [5] Imported new chain segment                number=86496 hash=8897bc…4ea7e7 blocks=1  txs=3 elapsed=2.158ms  trieDBSize=5.10kB mgas=0.063 mgasps=29.188
INFO[09/10,18:09:29 +09] [53] Anchored a block via KAS                  blkNum=86496
INFO[09/10,18:09:30 +09] [5] Imported new chain segment                number=86497 hash=44b319…7d4247 blocks=1  txs=3 elapsed=2.346ms  trieDBSize=5.43kB mgas=0.063 mgasps=26.848
INFO[09/10,18:09:30 +09] [53] Anchored a block via KAS                  blkNum=86497
INFO[09/10,18:09:31 +09] [5] Imported new chain segment                number=86498 hash=0b98ba…73d654 blocks=1  txs=3 elapsed=2.235ms  trieDBSize=5.61kB mgas=0.063 mgasps=28.186
INFO[09/10,18:09:31 +09] [53] Anchored a block via KAS                  blkNum=86498
INFO[09/10,18:09:32 +09] [5] Imported new chain segment                number=86499 hash=4f01ab…3bc334 blocks=1  txs=3 elapsed=3.319ms  trieDBSize=5.61kB mgas=0.063 mgasps=18.977
INFO[09/10,18:09:32 +09] [53] Anchored a block via KAS                  blkNum=86499
...
```

## List of Transaction <a id="list-of-transaction"></a>
In KAS console website, you can see the list of anchoring transactions that the operator of your service chain has sent at "KAS Console - Service - Anchor - Operators" menu like below.

![anchoring transaction list](/img/nodes/kas-tx-list-en.png)
