# Before You Install

## Download <a id="download"></a>

You can get packages for CN, and PN in the [download page](../../downloads/downloads.md).


## Before You Install <a id="before-you-install"></a>

Before installing the Kaia package, it is required to create the associated node information to enroll your node URIs. The Kgen package is provided for CC operators, please follow the steps in the order shown below.

1. Download `kgen` Package
2. Node Key & Node URI Creation
3. Node URI Enrollment

### Download `kgen` Package <a id="download-kgen-package"></a>

First of all, you can download the latest version of `kgen` package depending on your operating systems on [Download](../../downloads/downloads.md) page.

You can find the `kgen` binary file under the `bin` directory.

### Node Key & Node URI Creation <a id="node-key-node-uri-creation"></a>

The node key and the node URI are created only once at the beginning. The node URI must be shared with other Core Cells of the Core Cell Network. A CN connects to other CNs and a PN connects to a CN and some PNs using the created node URI. A node URI is created based on the node key by using the downloaded `kgen`. The below command line creates `nodekey` as well as `node_info.json`.

`kgen` takes the associated IP and Port number as follows.

```text
$ kgen --ip "123.456.789.012" --port 32323 --file
$ ls
nodekey node_info.json
```

The `nodekey` is a 64-byte hexadecimal string which is a private key used in the node internally. This private key must be present at the Kaia data directory and be careful not to lose it.

```text
$ cat nodekey
f08f2118c455a6c9c9b5e035d3571e570a719ea61771e268546e796a264acc2b
$ mv nodekey ~/kcnd_home
```

The created file `node_info.json` includes the following contents.

| Key Name | Description | Example |
| :--- | :--- | :--- |
| NodeAddress | an address of the associated node | 0xc8a23d67f2471066fa1b07270651fea7e5c0cf78 |
| NodeKey | the node key \(a.k.a private key\) | aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a |
| NodeURI | node URI | kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0 |

`node_info.json` contains the node information in a JSON format as follows.

```text
$ cat node_info.json
{
    "NodeAddress": "0xc8a23d67f2471066fa1b07270651fea7e5c0cf78",
    "NodeKey": "aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a",
    "NodeURI": "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0"
}
```

### Node URI Enrollment <a id="node-uri-enrollment"></a>

The created node URI should be enrolled to participate in the Core Cell Network \(CCN\). The process of the enrollment is as follows.

1. Create a node URI using `kgen` \(`node_info.json`\) which contains the associated IP and Port number.
2. Send the information to the official Kaia email address \(`bootstrap@klaytn.com` for Mainnet or `baobab@klaytn.com` for Kairos\).

The enrolled information should be sent to the official Kaia email address. The format is as follows.

In case of CN,

```text
Company: Kakao
CN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

In case of PN,

```text
Company: Kakao
PN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

