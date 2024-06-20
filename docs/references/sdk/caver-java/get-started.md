# Getting Started

## What's new?

In caver-java 1.5.0, we adopt Common Architecture. Common Architecture is a new software architecture for Klaytn development environment, which is shared by all Klaytn SDKs (caver-js/caver-java). It is designed for your streamlined development experience and ease of extensibility to other programming languages.

As caver-java is updated to 1.5.0, the APIs used in 1.4.0 are deprecated except for some APIs.

The APIs newly provided in caver-java 1.5.0 are as follows.

### caver.account

caver.account is a package used to update AccountKey, which could be one or more public keys (AccountKeyPublic, AccountKeyWeightedMultiSig, and AccountKeyRoleBased) or a special type of keys (AccountKeyLegacy and AccountKeyFail), for a Klaytn account.


- `caver.account` replaces `caver.tx.account` in caver-java 1.4.0

### caver.wallet

caver.wallet is a package that manages Keyring instances in in-memory wallet. A Keyring is an instance that stores the address of a Klaytn account and its private key(s), and it is used when the address of this account signs a transaction. caver.wallet accepts all types of Keyring (SingleKeyring, MultipleKeyring, and RoleBasedKeyring) and manages them with their Klaytn account address.

- `caver.wallet` replaces `caver.crypto` in caver-java 1.4.0
- `caver.wallet.KeyStore` replaces `caver.wallet.WalletFile` in caver-java 1.4.0

### caver.transaction

caver.transaction is a package that provides functionality related to [Transaction](../../../learn/transactions/transactions.md#transactions-overview).

- `caver.transaction` replaces `caver.tx` in caver-java 1.4.0

### caver.rpc

caver.rpc is a package that provides functionality related to rpc call with Klaytn Node.

- `caver.rpc.klay` and `caver.rpc.net` replaces `Klay`, `Net` interfaces in caver-java 1.4.0, respectively

### caver.util

caver.utils provides utility functions.

### caver.contract

`caver.contract` is a package that makes it easy to handle smart contracts in Klaytn. With caver.contract, you can deploy smart contracts and execute them by calling their functions. `caver.contract` first converts smart contract functions and events from ABI\(Application Binary Interface\), calls those functions, and obtains the event information.

## Prerequisites <a id="prerequisites"></a>

### Adding a Repository <a id="adding-a-repository"></a>
A library repository should be added before using IPFS. Please add the following repository first.

**maven**

```groovy
<repositories>
	<repository>
	    <id>jitpack.io</id>
	    <url>https://jitpack.io</url>
	</repository>
</repositories>
```

**gradle**

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

### Adding a Dependency <a id="adding-a-dependency"></a>

**maven**

```groovy
<dependency>
  <groupId>com.klaytn.caver</groupId>
  <artifactId>core</artifactId>
  <version>1.5.0</version>
</dependency>
```

**gradle**

```groovy
implementation 'com.klaytn.caver:core:1.5.0'
```

If you want to use Android dependency, just append -android at the end of the version string. \(e.g. 1.0.1-android\)

If you want to see details of the JSON-RPC requests and responses, please include [LOGBack](https://logback.qos.ch/) dependency in your project. Below is a Gradle build file example. You can add the dependency to Maven as well. Since caver-java uses the [SLF4J](http://www.slf4j.org/) logging facade, you can switch to your preferred logging framework instead of LOGBack.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**Note**: In the central repository, the RC, Android, and Java versions are listed together. If you use wildcards to get a version, you may be using a version that is not appropriate for your platform.

#### Command-line Tool <a id="command-line-tool"></a>

The command-line tool allows you to generate Solidity smart contract function wrappers from the command line.

**Installation \(Homebrew\)**

Java 1.8+ is required to install this.

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

After installation you can run command 'caver-java' like below:

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

**Installation \(Other\)**

Currently, we do not support other package managers. As another solution, we provide a method to build the CLI below.

* Download or fork caver-java.
* Do task 'shadowDistZip' in the console module using Gradle. As a result, `console/build/distributions/console-shadow-{version}.zip` is generated.

  ```text
  $ ./gradlew :console:shadowDistZip
  ```

* Unzip the zip file in the build directory

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

* Execute the binary file to run the command-line tool like below. You can find a shell script file for macOS users and a batch file for Window users.

  ```text
  $ ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```


## Sending KLAY at a glance

This section describes a simple example of using a `keystore file` to send KLAY with a value transfer transaction. The keystore file can be created in [Klaytn Wallet](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). If you need KLAY for testing, you can get Baobab testnet KLAY from the [Klaytn Wallet](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay).

```java
public void sendingKLAY() throws IOException, CipherException, TransactionException {
        Caver caver = new Caver(Caver.BAOBAB_URL);

        //Read keystore json file.
        File file = new File("./keystore.json");

        //Decrypt keystore.
        ObjectMapper objectMapper = ObjectMapperFactory.getObjectMapper();
        KeyStore keyStore = objectMapper.readValue(file, KeyStore.class);
        AbstractKeyring keyring = caver.wallet.keyring.decrypt(keyStore, "password");

        //Add to caver wallet.
        caver.wallet.add(keyring);

        BigInteger value = new BigInteger(caver.utils.convertToPeb(BigDecimal.ONE, "KLAY"));

        //Create a value transfer transaction
        ValueTransfer valueTransfer = caver.transaction.valueTransfer.create(
                TxPropertyBuilder.valueTransfer()
                        .setFrom(keyring.getAddress())
                        .setTo("0x8084fed6b1847448c24692470fc3b2ed87f9eb47")
                        .setValue(value)
                        .setGas(BigInteger.valueOf(25000))
        );

        //Sign to the transaction
        valueTransfer.sign(keyring);

        //Send a transaction to the klaytn blockchain platform (Klaytn)
        Bytes32 result = caver.rpc.klay.sendRawTransaction(valueTransfer.getRawTransaction()).send();
        if(result.hasError()) {
            throw new RuntimeException(result.getError().getMessage());
        }

        //Check transaction receipt.
        TransactionReceiptProcessor transactionReceiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);
        TransactionReceipt.TransactionReceiptData transactionReceipt = transactionReceiptProcessor.waitForTransactionReceipt(result.getResult());
    }
```


## Starting with caver-java <a id="starting-with-caver-java"></a>

### Connecting to a Klaytn Node <a id="connecting-to-a-klaytn-node"></a>

If you are running an EN, you can connect it to your own node by changing the host and port like below:

```java
Caver caver = new Caver("http://your.en.url:8551/");
```


## Managing Keyrings <a id="managing-keyrings"></a>

`Keyring` is a structure that contains the address of the Klaytn account and the private key(s). 

`Keyring` can be classified into three types depending on the type of key being stored: `SingleKeyring` to store one address and one private key, `MultipleKeyring` to store one address and multiple private keys, and `RoleBasedKeyring` to store one address and one or more private keys for each role.

`SingleKeyring` defines `key` property inside, and this `key` stores one private key.

`MultipleKeyring` defines `keys` property inside, and this `keys` is implemented as an array to store multiple private keys.

The `keys` property defined in `RoleBasedKeyring` is implemented as a List object having 3 arrays of private key(s) as its elements (empty `keys` will look like `[ [], [], [] ]`) and so that it can include multiple keys for each `role`. The first element of the array is filled with the private key(s) to be used for `roleTransactionKey`, the second element the private key(s) to be used for `roleAccountUpdateKey`, and the third element the private key(s) to be used for `roleFeePayerKey`.

### Creating a Keyring <a id="creating-a-keyring"></a>

#### Generating a SingleKeyring <a id="generating-a-singlekeyring"></a>

You can randomly generate a single keyring as shown below.

```java
SingleKeyring keyring = caver.wallet.keyring.generate();
```

#### Creating a SingleKeyring from private key <a id="creating-a-singlekeyring-from-private-key"></a>

Also, if you own a specific private key, you can use it to create a keyring as shown below.

```java
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey(privateKey);
```

#### Creating a SingleKeyring with a private key and an address <a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

If your private key for your Klaytn account is decoupled from the address, you can create a keyring using the given address and the given private key like below.

```java
String address = "0x{address in hex}";
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createWithSingleKey(address, privateKey);
```

Also, you can derive SingleKeyring instance from Klaytn wallet key.

```java
String klaytnWalletKey = "0x{private key}0x{type}0x{address in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey);
```

#### Creating a MultipleKeyring with multiple private keys <a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

If you want to use multiple private keys, you can create a `MultipleKeyring` using an address and multiple private keys. The below examples show how to create a `MultipleKeyring` with multiple private keys.

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{private key#3}"};
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(address, privateKeyArray);
```

#### Creating a RoleBasedKeyring with private keys <a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

To use different private key(s) for each `role`, `caver.wallet.keyring.createWithRoleBasedKey` is used. Each array element represents a role described in `RoleBasedKeyring`. The example below shows how to create a `RoleBasedKeyring` instance from different keys for each role.


```java
String address = "0x{address in hex}";
String[][] privateKeyArr = new String[][] {
        //roleTransactionKey
        {
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
        },
        //roleAccountUpdateKey
        {
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
        },
        //roleFeePayerKey
        {
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
        },
};

RoleBasedKeyring keyring = caver.wallet.keyring.createWithRoleBasedKey(address, Arrays.asList(privateKeyArr));
```

### Adding Keyrings to caver-java from a keystore json string.<a id="adding-keyrings-to-caver-java"></a>

You can use a keyring more easily by adding it to the in-memory wallet provided by caver-java. The following examples illustrate how to add a keyring to `caver.wallet` using a keystore JSON file string generated by [Klaytn Wallet](https://wallet.klaytn.com/).

```java
Caver caver = new Caver(Caver.MAINNET_URL);

String password = "password";
String keyStoreJsonString = "{\n" +
        "  \"version\": 4,\n" +
        "  \"id\": \"9c12de05-0153-41c7-a8b7-849472eb5de7\",\n" +
        "  \"address\": \"0xc02cec4d0346bf4124deeb55c5216a4138a40a8c\",\n" +
        "  \"keyring\": [\n" +
        "    {\n" +
        "      \"ciphertext\": \"eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15\",\n" +
        "      \"cipherparams\": {\n" +
        "        \"iv\": \"d688a4319342e872cefcf51aef3ec2da\"\n" +
        "      },\n" +
        "      \"cipher\": \"aes-128-ctr\",\n" +
        "      \"kdf\": \"scrypt\",\n" +
        "      \"kdfparams\": {\n" +
        "        \"dklen\": 32,\n" +
        "        \"salt\": \"c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40\",\n" +
        "        \"n\": 4096,\n" +
        "        \"r\": 8,\n" +
        "        \"p\": 1\n" +
        "      },\n" +
        "      \"mac\": \"4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26\"\n" +
        "    }\n" +
        "  ]\n" +
        "}";

SingleKeyring decrypt = (SingleKeyring)caver.wallet.keyring.decrypt(keyStoreJsonString, password);
System.out.println("Decrypted address : " + decrypt.getAddress());
System.out.println("Decrypted key : " + decrypt.getKey().getPrivateKey());

SingleKeyring addedKeyring = (SingleKeyring)caver.wallet.add(decrypt);
System.out.println("address : " + addedKeyring.getAddress());
System.out.println("key : " + addedKeyring.getKey().getPrivateKey());
```

```bash
Decrypted address : 0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
Decrypted key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5

address : 0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5
```

Looking at the output above, you can query your keyring from `caver.wallet` after adding it to `caver.wallet`.

If you have an address and private key(s) to use, you can easily create a keyring and add it directly to caver.wallet via caver.wallet.newKeyring.

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// Add to wallet with an address and a private key
AbstractKeyring addedSingleKeyring = caver.wallet.newKeyring("0x{address in hex}", "0x{private key1}");


// Add to wallet with an address and private keys
String[] privateKeyArr = new String[] {
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
};

AbstractKeyring addedMultipleKeyring = caver.wallet.newKeyring('0x{address in hex}', privateKeyArr);


// Add to wallet with an address and private keys defined by each roles
String[][] privateKeyArr = new String[][] {
                //roleTransactionKey
                {
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                },
                //roleAccountUpdateKey
                {
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                },
                //roleFeePayerKey
                {
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                },
};

AbstractKeyring addedRoleBased = caver.wallet.newKeyring('0x{address in hex}', Arrays.asList(privateKeyArr))
```

When `caver.wallet.newKeyring` is executed with a private key, a Keyring instance with one private key is created and added to `caver.wallet`. For multiple private keys, a Keyring instance with multiple private keys is created and added to `caver.wallet`. When passing a 2D string array including one or more private keys for each role as an element, a Keyring instance that contains the different private key(s) for each role is created and also added to the `caver.wallet`.


`caver.wallet.add` or `caver.wallet.newKeyring` returns a Keyring instance after adding it to `caver.wallet`.

## Sending a Transaction <a id="sending-a-transaction"></a>

This section will show you how to send KLAY using caver-java on the Baobab network.

### Getting KLAY via Baobab Faucet <a id="getting-klay-via-baobab-faucet"></a>

If you need KLAY for testing, you can get Baobab testnet KLAY from the [Klaytn Wallet](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). Log in to the Klaytn Wallet using the private key or the keystore file and receive Baobab testnet KLAY via the faucet for testing.

### Sending a Value Transfer Transaction <a id="sending-a-value-transfer-transaction"></a>

You can use a caver-java wallet to generate a signature of a transaction. You have to go through two steps below to send the transaction to the network.

1. Sign a transaction
	- If the keyring you want to use is added to `caver.wallet`, you can use `caver.wallet.sign` function to sign.
	- If you manage the keyring separately without adding it to `caver.wallet`, you can sign the transaction through `transaction.sign` function.
2. Send the RLP-encoded string of the signed transaction to the Klaytn via `caver.rpc.klay.sendRawTransaction`.

**Note:** The sender should have enough number of KLAY to be transferred and also to pay the transaction fee.

#### Sign a transaction

Before sending a transaction to Klaytn, you should sign a transaction first. 

Below is an example of how to sign a transaction if a keyring is added to the `caver.wallet`.

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// Add a keyring to caver.wallet
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey("privateKey");
caver.wallet.add(keyring);

// Create a value transfer transaction
ValueTransfer valueTransfer = caver.transaction.valueTransfer.create(
        TxPropertyBuilder.valueTransfer()
                .setFrom(keyring.getAddress())
                .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
                .setValue(BigInteger.valueOf(1))
                .setGas(BigInteger.valueOf(30000))
);

// Sign the transaction via caver.wallet.sign
caver.wallet.sign(keyring.getAddress(), valueTransfer);
String rlpEncoded = valueTransfer.getRLPEncoding();
System.out.println("RLP-encoded string: " + rlpEncoded)
```

The above code adds a keyring to `caver.wallet`, creates a transaction, and signs the transaction through `caver.wallet.sign`. 

Running the above code gives you the following result. When the above code is executed, the RLP-encoded string of the transaction is shown below. (The RLP-encoded string output you got could be different from the string output shown below.)

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### Send the RLP-encoded string of the signed transaction to the Klaytn

Now you can send a signed transaction to the network like below. If you want to run the below example, replace "rlpEncoding" with the value of `rlpEncoded` in the code above.

```java
public String sendRawTransaction() {
  Caver caver = new Caver(Caver.BAOBAB_URL);
  
  String rlpEncoding = "rlpEncoding";
  String txHash = null;

  try {
      // Send the transaction using `caver.rpc.klay.sendRawTransaction`.
      Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoding).send();
      if(sendResult.hasError()) {
          //do something to handle error
      }
      
      txHash = sendResult.getResult();
  } catch (IOException e) {
      // do something to handle exception
  }
  return txHash;

}
```

If you want to sign a transaction and send it to the network without `caver.wallet`, see the example below.

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// Add a keyring to caver.wallet
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey("privateKey");
caver.wallet.add(keyring);

// Create a value transfer transaction
ValueTransfer valueTransfer = caver.transaction.valueTransfer.create(
        TxPropertyBuilder.valueTransfer()
                .setFrom(keyring.getAddress())
                .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
                .setValue(BigInteger.valueOf(1))
                .setGas(BigInteger.valueOf(30000))
);

// Sign the transaction via transaction.sign
valueTransfer.sign(keyring);
String rlpEncoded = valueTransfer.getRLPEncoding();

try {
    // Send the transaction using `caver.rpc.klay.sendRawTransaction`.
    Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoded).send();
    if(sendResult.hasError()) {
        //do something to handle error
    }
    
    String txHash = sendResult.getResult();
    System.out.println("Transaction Hash : " + txHash);
} catch (IOException e) {
    // do something to handle exception
}
```

When the above code is executed, the transaction hash (txHash) is printed like the example below.

```bash
Transaction Hash : 0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113
```

### Checking Receipts <a id="checking-receipts"></a>

You can use the `TransactionReceiptProcessor` to get the receipt of the transaction when you transfer the transaction to the Klaytn by `caver.rpc.klay.sendRawTransaction`.

The following example shows how to get a receipt using PollingTransactionReceiptProcessor.

```java
Caver caver = new Caver(Caver.BAOBAB_URL);
String txHash = "0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a";

//Sleep duration - 1000ms
//Attempts count - 15
TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);

try {
  TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash);
} catch (IOException | TransactionException e) {
  // do something to handle error.

}
```

As described in the example above, you can get the result of sending a transaction through TransactionReceiptProcessor. The `transactionHash` field is defined inside the receipt object. 

You can use `caver.rpc.klay.getTransactionReceipt` RPC call with `txHash` string to query the receipt of a transaction at any time from the network after the transaction is included in a block. The example below shows how to get a receipt using the `caver.rpc.klay.getTransactionReceipt` RPC call.

```java
Caver caver = new Caver(Caver.BAOBAB_URL);
String txHash = "0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a";

try {
  TransactionReceipt receipt = caver.rpc.klay.getTransactionReceipt(txHash).send();
  if(receipt.hasError()) {
    // do something to handle error

  }
  
  TransactionReceipt.TransactionReceiptData receiptData = receipt.getResult();
} catch (IOException e) {
    // do something to handle exception.

}
```

The result of the transaction can be found through the `status` of the receipt. For the details of the return values, see `caver.rpc.klay.getTransactionReceipt`. If a transaction is failed, you can check more about the error in `txError` of the receipt. For more information about `txError`, see [txError: Detailed Information of Transaction Failures](../../transaction-error-codes.md).


## Executing Other Transaction Types <a id="executing-other-transaction-types"></a>

Klaytn provides various transaction types for extensibility and performance. For more information, see [Transactions](../../../learn/transactions/transactions.md). This section describes some examples that can be used with caver-java.

### Fee Delegation <a id="fee-delegation"></a>

Klaytn provides Fee Delegation feature. Here's an example of making a RLP-encoded transaction when you are a sender of this kind of transaction:

```java
Caver caver = new Caver(Caver.BAOBAB_URL);
SingleKeyring senderKeyring = caver.wallet.keyring.createFromPrivateKey("0x{privateKey}");
caver.wallet.add(senderKeyring);

FeeDelegatedValueTransfer feeDelegatedValueTransfer = caver.transaction.feeDelegatedValueTransfer.create(
        TxPropertyBuilder.feeDelegatedValueTransfer()
                .setFrom(senderKeyring.getAddress())
                .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
                .setValue(BigInteger.valueOf(1))
                .setGas(BigInteger.valueOf(30000))
);

caver.wallet.sign(senderKeyring.getAddress(), feeDelegatedValueTransfer);
String rlpEncoded = feeDelegatedValueTransfer.getRLPEncoding();
System.out.println(rlpEncoded);
```

When the above code is executed, the RLP-encoded string will be printed. (The RLP-encoded string output you got could be different from the string output shown below.)

```bash
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

The fee payer can send the transaction to the Klaytn after attaching the `feePayerSignatures` to the RLP-encoded string (`rawTransaction`) signed by the transaction sender. If `caver.wallet` also has the fee payer's keyring, the fee payer's signature can be injected into `feeDelegatedTx` by calling `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`. Otherwise, the fee payer has to create a `feeDelegatedTx` from the RLP-encoded string signed by the sender and add the fee payer's sign onto it, as illustrated below. If you want to run the below example, replace `0x{RLP-encoded string}` with the value of `rlpEncoded` above.

```java
Caver caver = new Caver(Caver.BAOBAB_URL);

SingleKeyring feePayerKeyring = caver.wallet.keyring.createFromPrivateKey("0x{privateKey}");
caver.wallet.add(feePayerKeyring);

String rlpEncoded = "0x{RLP-encoded string}";
FeeDelegatedValueTransfer feeDelegatedValueTransfer = caver.transaction.feeDelegatedValueTransfer.decode(rlpEncoded);
feeDelegatedValueTransfer.setFeePayer(feePayerKeyring.getAddress());
feeDelegatedValueTransfer.setKlaytnCall(caver.rpc.klay);

caver.wallet.signAsFeePayer(feePayerKeyring.getAddress(), feeDelegatedValueTransfer);
System.out.println(feeDelegatedValueTransfer.getRLPEncoding());
```

When the above code is executed, the RLP-encoded string including the sender's signatures and fee payer's signatures is printed like below. (The output you got could be different from the string output shown below.)

```bash
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

The transaction is now signed by both the sender and the fee payer, and it can now be sent over the network. Replace `0x{RLP-encoded string}` with the RLP-encoded string output of the example code above.

```java
Caver caver = new Caver(Caver.BAOBAB_URL);

TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);

String rlpEncoded = "0x{RLP-encoded string}";
try {
  // Send the transaction using `caver.rpc.klay.sendRawTransaction`.
  Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoding).send();
  if(sendResult.hasError()) {
    //do something to handle error

  }

  String txHash = sendResult.getResult();
  TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash);
} catch (IOException | TransactionException e) {
  // do something to handle exception.

}
```

The result of the transaction can be found through the `status` of the receipt. For the details of the return values, see `caver.rpc.klay.getTransactionReceipt`. If a transaction is failed, you can check more about the error in `txError` of the receipt. For more information about `txError`, see [txError: Detailed Information of Transaction Failures](../../transaction-error-codes.md).

### Account Update <a id="account-update"></a>

If you want to change the private key(s) for your Klaytn account, there are 3 important things you need to remember:

1. Klaytn validates every transaction you send to it.
2. The validation requires your public keys which exactly corresponds to your private key(s).
3. Thus, changing your private key(s) into the new one(s) is **always be** **preceded** by changing your old public key(s) to the new one(s). The new public key(s) must be derived from the new private key(s).

Keeping the 3 things above in your mind, you can change your private key(s) by following the steps below:

1. Prepare the new private key(s) to create a new keyring.
2. Create a keyring by its type (Single keyring, Multiple keyring, or Role-based keyring) you need.
3. Generate an Account instance from the new keyring. This Account instance holds the new public key(s) for your Klaytn account.
4. Send AccountUpdate transaction including Account instance to Klaytn.
5. Finally, replace your old keyring to the new one that was created in Step 2.

Please check `Account Update` for the details.

To change your AccountKey, you must provide an `Account` instance for the `account` field in the input argument object of `caver.transaction.type.AccountUpdate`. An `Account` instance contains the address of the Klaytn account and the AccountKey to be updated.

The code below is an example code that changes the private key(s) you use for your Klaytn account along with changing AccountKey of your Klaytn account to `AccountKeyPublic`. Don't forget to prepare your new private key(s).

```java
Caver caver = new Caver(Caver.DEFAULT_URL);
SingleKeyring senderKeyring = caver.wallet.keyring.createFromPrivateKey("0x2359d1ae7317c01532a58b01452476b796a3ac713336e97d8d3c9651cc0aecc3");
caver.wallet.add(senderKeyring);

String newPrivateKey = caver.wallet.keyring.generateSingleKey();
SingleKeyring newKeyring = caver.wallet.keyring.create(senderKeyring.getAddress(), newPrivateKey);

Account account = newKeyring.toAccount();

AccountUpdate accountUpdate = caver.transaction.accountUpdate.create(
        TxPropertyBuilder.accountUpdate()
                .setFrom(senderKeyring.getAddress())
                .setAccount(account)
                .setGas(BigInteger.valueOf(50000))
);

try {
    caver.wallet.sign(senderKeyring.getAddress(), accountUpdate);
    String rlpEncoded = accountUpdate.getRLPEncoding();

    Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoded).send();
    if(sendResult.hasError()) {
        //do something to handle error
        throw new TransactionException(sendResult.getError().getMessage());
    }

    String txHash = sendResult.getResult();

    TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);
    TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash);
} catch (IOException | TransactionException e) {
    // do something to handle exception.
    e.printStackTrace();
}

senderKeyring = (SingleKeyring)caver.wallet.updateKeyring(newKeyring);
```

If the above code is executed successfully, you are no longer able to use the old private key(s) to sign any transaction with the old keyring. So you must update the old keyring with the `newKeyring` through `caver.wallet.updateKeyring(newKeyring)`. Once it is updated, the signing will be done by the newly updated private key(s).

Here comes how to update AccountKey of your Klaytn account with multiple `AccountKeys`? The example below explains how to create an `Account` instance with multiple private keys that what you want to use (You can create an `Account` instance with multiple public keys via `caver.account.create`). Same again, after feeding the account instance created to the `account` field inside the transaction object, the left rest of the updating process is just the same as the above example.

First, let's create an Account instance to update with `AccountKeyWeightedMultiSig`. For `AccountKeyWeightedMultiSig`, a threshold and a weight for each key must be defined. To do this, use `caver.account.weightedMultiSigOptions`. The first parameter is the threshold, and the second parameter is an array containing the weight for each key.

```java
// Create an account instance with three private keys using AccountKeyWeightedMultiSig
String[] privateKeyArr = caver.wallet.keyring.generateMultipleKeys(3);
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(sender.getAddress(), privateKeyArr);

// threshold = 3, the weights of the three keys = [1, 2, 1]
BigInteger threshold = BigInteger.valueOf(3);
BigInteger[] weightedArr = new BigInteger[] {BigInteger.valueOf(1), BigInteger.valueOf(2), BigInteger.valueOf(1)};
WeightedMultiSigOptions options = new WeightedMultiSigOptions(threshold, Arrays.asList(weightedArr));

Account account = multipleKeyring.toAccount(options)
```

Now let's update AccountKey using `AccountKeyRoleBased`. `AccountKeyRoleBased` is an `AccountKey` type that defines the key to use for each `role`.

```java
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {1,1,1});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

const account = newKeyring.toAccount()
```

The AccountKeyRoleBased above is an example of using one public key for each role. As you can see from the code above, each of them corresponds to one private key. If you want to use multiple private keys for each role, `caver.account.weightedMultiSigOptions` must be defined for each role as shown below.

```java
// Create an account instance with [3, 2, 3] keys for each role using AccountKeyRoleBased
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {3, 2, 3});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

WeightedMultiSigOptions[] options = new WeightedMultiSigOptions[] {
    new WeightedMultiSigOptions(BigInteger.valueOf(4), Arrays.asList(BigInteger.valueOf(2), BigInteger.valueOf(2), BigInteger.valueOf(4))),
    new WeightedMultiSigOptions(BigInteger.valueOf(2), Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(1))),
    new WeightedMultiSigOptions(BigInteger.valueOf(3), Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(1), BigInteger.valueOf(1))),
};

Account account = newKeyring.toAccount(Arrays.asList(options));
```

If you want to update AccountKey to `AccountKeyLegacy` or `accountKeyFail`, create an Account instance as shown below and assign it to the `account` field of the transaction. The rest of the update process is same to that of other AccountKey.

```java
// Create an account with AccountKeyLegacy
Account account = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address);

// Create an account with AccountKeyFail
Account account = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### Smart Contract <a id="smart-contract"></a>

The `Contract` class in `caver.contract` package makes it easy to interact with smart contracts on Klaytn. All functions of a smart contract automatically converted and stored inside `contract` instance, when its low-level ABI is given. This allows you to interact with a smart contract like you handle a `contract` instance in Java.


We begin our explanation of dealing with a smart contract in Java by writing a simple solidity example code below. Create a 'test.sol' file and write down the example below.


```
pragma solidity ^0.5.6;

contract KVstore {
    mapping(string=>string) store;
    function get(string memory key) public view returns (string memory) {
        return store[key];
    }
    function set(string memory key, string memory value) public {
        store[key] = value;
    }
}
```

Then, compile this smart contract to get its bytecode and ABI.

```text
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**NOTE**: To compile a smart contract, you must have a [solidity compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html) installed. To compile the above program, you need to install solc:0.5.6.

To deploy a smart contract by its type, you can use caver-java classes described below:
  - `Contract` class in the `caver.contract` package when the sender or the fee payer of a smart contract transaction pays the fee
  - `SmartContractDeploy` class in the `caver.transaction` package when the sender of a smart contract transaction pays the fee
  - `feeDelegatedSmartContractDeploy` class in the `caver.transaction` package  when the fee payer of a smart contract transaction pays the fee
  - `feeDelegatedSmartContractDeployWithRatio` class in the `caver.transaction` package when the fee payer of a smart contract transaction pays the fee

Here is an example of exploiting `Contract` class in `caver.contract` package. You can create a `contract` instance like below from the bytecode and ABI you get after compiling the smart contract.

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void createContractInstance() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        try {
            Contract contract = caver.contract.create(ABIJson);

            contract.getMethods().forEach((name, method) ->{
                System.out.println(method.getType() + " " +  caver.abi.buildFunctionString(method));
            });

            System.out.println("ContractAddress : " + contract.getContractAddress());
        } catch (IOException e) {
            //handle exception..
        }
    }
```

Running the code above gives you the following result.

```bash
function set(string,string)
function get(string)
ContractAddress : null
```

Looking at the output above, you can see that the `contract` instance owns the smart contract method. And since it hasn't been deployed yet, you can see that the result of `contract.getContractAddress()` is output as null.

If this contract was already deployed and you knew the contract address where this contract was deployed at, pass the contract address as the third parameter of the constructor of the `contract` instance as below.

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    @Test
    public void loadContract() {
        Caver caver = new Caver(Caver.DEFAULT_URL);
        String contractAddress = "0x3466D49256b0982E1f240b64e097FF04f99Ed4b9";

        try {
            Contract contract = caver.contract.create(ABIJson, contractAddress);

            contract.getMethods().forEach((name, method) ->{
                System.out.println(method.getType() + " " +  ABI.buildFunctionString(method));
            });

            System.out.println("ContractAddress : " + contract.getContractAddress());
        } catch (IOException e) {
            //handle exception..
        }
    }
```

Running the code above gives you the following result.

```bash
function set(string,string)
function get(string)
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

A `contract` instance stores its contract address as `contractAddress` property when it was created. The address can be accessed through getter / setter function (`getContractAddress()` / `setContractAddress()`).

Once a `contract` instance is created, you can deploy the smart contract by passing its bytecode and constructor's arguments (when needed for deploying) as the example below.

Note that the `deploy()` method of the `contract` instance sends transactions for contract deployment and contract execution. For sending transactions, it uses Keyrings in `caver.wallet` to sign them. The keyring to be used must have been added to `caver.wallet` before signing.

```java
    private static final String byteCode = "608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029";
    
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void deployContract() {
        Caver caver = new Caver(Caver.DEFAULT_URL);
        SingleKeyring deployer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(deployer);

        try {
            Contract contract = caver.contract.create(ABIJson);
            SendOptions sendOptions = new SendOptions();
            sendOptions.setFrom(deployer.getAddress());
            sendOptions.setGas(BigInteger.valueOf(4000000));
            
            Contract newContract = contract.deploy(sendOptions, byteCode);
            System.out.println("Contract address : " + newContract.getContractAddress());
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

In the code above, the `deployer` deploys the contract to the Klaytn and returns the deployed `contract` instance.

```bash
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

A smart contract can be deployed using one of the following classes, depending on the type of contract deploying transaction:
  - `Contract` class in the `caver.contract` package when the sender or the fee payer of a smart contract transaction pays the fee
  - `SmartContractDeploy` class in the `caver.transaction` package when the sender of a smart contract transaction pays the fee
  - `feeDelegatedSmartContractDeploy` class in the `caver.transaction` package  when the fee payer of a smart contract transaction pays the fee
  - `feeDelegatedSmartContractDeployWithRatio` class in the `caver.transaction` package when the fee payer of a smart contract transaction pays the fee


To deploy a smart contract through a fee-delegated transaction, define  the `feeDelegation` and `feePayer` fields in the `SendOptions` class like the example below.

```java
    private static final String byteCode = "608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029";

    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void deployContractWithFeeDelegation() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        SingleKeyring deployer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(deployer);

        SingleKeyring feePayer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(feePayer);

        try {
            Contract contract = caver.contract.create(ABIJson);

            SendOptions sendOptionsForDeployment = new SendOptions();
            sendOptionsForDeployment.setFrom(sender.getAddress());
            sendOptionsForDeployment.setGas(BigInteger.valueOf(1000000));
            sendOptionsForDeployment.setFeeDelegation(true);
            sendOptionsForDeployment.setFeePayer(feePayer.getAddress());

            contract.deploy(sendOptionsForDeployment, byteCode);
            System.out.println("The address of deployed smart contract:" + contract.getContractAddress());
            
            
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

If you want to send a transaction with sender and feePayer signed seperately when deploying a smart contract through `caver.contract`, refer to the code below.

```java
    private static final String byteCode = "608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029";

    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void deployContractWithFeeDelegation() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        SingleKeyring deployer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(deployer);

        SingleKeyring feePayer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(feePayer);

        try {
            Contract contract = caver.contract.create(ABIJson);

            SendOptions sendOptionsForDeployment = new SendOptions();
            sendOptionsForDeployment.setFrom(sender.getAddress());
            sendOptionsForDeployment.setGas(BigInteger.valueOf(1000000));
            sendOptionsForDeployment.setFeeDelegation(true);
            sendOptionsForDeployment.setFeePayer(feePayer.getAddress());

            AbstractTransaction signedTx = contract.sign(sendOptionsForSigning, "constructor", byteCode);

            caver.wallet.signAsFeePayer(feePayer.getAddress(), (AbstractFeeDelegatedTransaction)signedTx);
            Bytes32 txHash = caver.rpc.klay.sendRawTransaction(signedTx).send();
            TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);

            TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash.getResult());
            System.out.println("The address of deployed smart contract:" + receiptData.getContractAddress());
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```


To execute a smart contract's function by its type, you can use caver-java classes described below:
  - `Contract` class in the `caver.contract` package when the sender of a smart contract transaction pays the fee
  - `SmartContractExecution` class in the `caver.transaction` package when the sender of a smart contract transaction pays the fee
  - `FeeDelegatedSmartContractExecution` class in the `caver.transaction` package  when the fee payer of a smart contract transaction pays the fee
  - `FeeDelegatedSmartContractExecutionWithRatio` class in the `caver.transaction` package when the fee payer of a smart contract transaction pays the fee


To show how to execute a function in a smart contract, here we send a contract execution transaction that puts a string "testValue" as the input parameter of the contract function `set` in the example code below. 

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    
    public void executeContractFunction() {
        Caver caver = new Caver(Caver.DEFAULT_URL);
        SingleKeyring executor = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(executor);

        try {
            Contract contract = caver.contract.create(ABIJson, "0x{address in hex}");
            
            SendOptions sendOptions = new SendOptions();
            sendOptions.setFrom(executor.getAddress());
            sendOptions.setGas(BigInteger.valueOf(4000000));

            TransactionReceipt.TransactionReceiptData receipt = contract.send(sendOptions, "set", "test", "testValue");
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

To execute a smart contract's function through a fee-delegated transaction, define the `feeDelegation` and `feePayer` fields in the `SendOptions` class like the example below.


```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void executeContractWithFeeDelegation() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        SingleKeyring executor = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(executor);

        SingleKeyring feePayer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(feePayer);

        try {
            Contract contract = caver.contract.create(ABIJson, "0x{address in hex}");

            SendOptions sendOptionsForExecution = new SendOptions();
            sendOptionsForExecution.setFrom(executor.getAddress());
            sendOptionsForExecution.setGas(BigInteger.valueOf(4000000));
            sendOptionsForExecuted.setFeeDelegation(true);
            sendOptionsForExecuted.setFeePayer(feePayer.getAddress());
            
            TransactionReceipt.TransactionReceiptData receipt = contract.send(sendOptions, "set", "test", "testValue");
        } catch (Exception e) {
            //handle exception..
        }
    }
```

If you want to send a transaction with sender and feePayer signed separately when executing a smart contract through `caver.contract`, refer to the code below:

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void executeContractWithFeeDelegation() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        SingleKeyring executor = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(executor);

        SingleKeyring feePayer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(feePayer);

        try {
            Contract contract = caver.contract.create(ABIJson, "0x{address in hex}");

            SendOptions sendOptionsForExecution = new SendOptions();
            sendOptionsForExecution.setFrom(executor.getAddress());
            sendOptionsForExecution.setGas(BigInteger.valueOf(4000000));
            sendOptionsForExecuted.setFeeDelegation(true);
            sendOptionsForExecuted.setFeePayer(feePayer.getAddress());
            
            AbstractTransaction executionTx = contract.sign(sendOptionsForExecution, "set", "test", "testValue");
            caver.wallet.signAsFeePayer(feePayer.getAddress(), (AbstractFeeDelegatedTransaction)executionTx);

            Bytes32 txHash_executed = caver.rpc.klay.sendRawTransaction(executionTx).send();
            TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);

            TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash_executed.getResult());
        } catch (Exception e) {
            //handle exception..
        }
    }
```

To load a `contract` instance and call one of its functions (not sending a transaction but just a call): the below example shows calling a `get` function in a contract.

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";


    public void callContractFunction() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        try {
            Contract contract = caver.contract.create(ABIJson, '0x{address in hex}');
            List<Type> result = contract.call("get", "test");
            System.out.println((String)result.get(0).getValue());
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

When the above code is executed, the value is shown as an output below.

```bash
testValue
```

To find more information, see [caver-java API]


## IPFS <a id="ipfs"></a>

IPFS (InterPlanetary File System) is a distributed file system for storing and accessing files, websites, application, and data.

You can upload and download a file through IPFS with Caver.


### Connecting with IPFS <a id="connecting-with-ipfs"></a>

The `IPFS` class in the `caver.ipfs` package is defined as a class member variable in `Caver`, so you can interact with IPFS through `Caver`.

In order to use an `IPFS` instance through the `Caver` instance, you must call method `setIPFSNode()` first to connect to an IPFS node.

The function `setIPFSNode()` requires following parameters:
  - IPFS HTTP API Host URL 
  - IPFS HTTP API Host port number
  - Whether the host use SSL or not.

```java
String host = "The URL of an IPFS node";
int port = 5001; // API host port number
boolean isSSL = true; // API host support ssl 
Caver caver = new Caver();
caver.ipfs.setIPFSNode(host, port, isSSL);
```

### Uploading a file through IPFS<a id="uploading-a-file-through-ipfs"></a>

To upload a file through `IPFS`, please use `add()` like below.

This function returns [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) of the uploaded file.


```java
String filePath = "/path/to/file";
String cid = caver.ipfs.add(filePath);
System.out.println(cid);
```

The execution result of the above code is shown below.

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

Likewise, you can upload a byte array.

```java
String text = "sample data";
byte[] data = text.getBytes();

String cid = caver.ipfs.add(data);
System.out.println(cid);
```

The execution result of the above code is shown below.

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

### Downloading a file from IPFS<a id="downloading-a-file-from-ipfs"></a>

To download a file from `IPFS`, please use `get()` like below.

This function requires CID of the file to be downloaded.

```java
String cid = "QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq";
byte[] content = caver.ipfs.get(cid);
```


### Conversion between CID and multihash <a id="conversion-between-cid-and-multihash"></a>

You can convert a CID to a [Multihash](https://multiformats.io/multihash/) using `toHex()`.

A CID is a Base58 encoded value of a multihash. `toHex()` decodes the CID and returns the corresponding multihash.

```java
String cid = "QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk";
String multihash = caver.ipfs.toHex(cid);
System.out.println(multihash);
```

The execution result of the above code is shown below.

```java
0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47
```

To convert a multihash to CID, please use `fromHex()`.

```java
String multihash = "0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47";
String cid = caver.ipfs.fromHex(multihash);
System.out.println(cid);
```

The execution result of the above code is shown below.

```java
QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk
```

## Detect KCT interface<a id="detect kct interface"></a>

KCT (Klaytn Compatible Token) contracts such as [KIP-7], [KIP-17], and [KIP-37] define and provide various interfaces, and [KIP-13] allows you to see whether a contract complies with KCT specifications and which interface it implements, by sending a query to the contract.

[KIP-13] was implemented in Caver v1.5.7. It could detect interface through `detectInterface()` for any of the KCT contract classes (`KIP7`, `KIP17`, and `KIP37`).

### Detecting KIP-7 Interfaces <a id="detecting-kip-7-interfaces"></a>

To detect KIP-7 interfaces, you can use `detectInterface()` in the `KIP7` class.
It returns the mapping between KIP-7 interface identifier and a boolean that the interface is supported or not.

`detectInterface()` supports both static and instance methods, so you can select and use the method that suits your needs.

The interface detected through `detectInterface()` for `KIP7` is shown in the table below.

|Interface|KIP-13 Identifier|
|---|---|
|IKIP7|0x65787371|
|IKIP7Metadata|0xa219a025|
|IKIP7Mintable|0xeab83e20|
|IKIP7Burnable|0x3b5a0bf8|
|IKIP7Pausable|0x4d5507ff|

```java
Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = caver.kct.kip7.detectInterface(caver, contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//using instance method.
KIP7 kip7 = caver.kct.kip7.create(contractAddress);
Map<String, Boolean> resultInstance = kip7.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

The execution result of the above code is shown below.

```java
{
  "IKIP7Metatdata" : true,
  "IKIP7Burnable" : true,
  "IKIP7" : true,
  "IKIP7Pausable" : true,
  "IKIP7Mintable" : true
}
```


### Detecting KIP-17 Interfaces <a id="detecting-kip-17-interfaces"></a>

To detect the interface implemented in a KIP-17 token contract, you can use `detectInterface()` in the `KIP17` class.
It returns the mapping between KIP-17 interface identifier and interface support.

`detectInterface()` supports both static and instance methods, so you can select and use the method that suits your needs.

The interface detect through `detectInterface()` for `KIP17` is shown in the table below.

|Interface|KIP-13 Identifier|
|---|---|
|IKIP17|0x80ac58cd|
|IKIP17Metadata|0x5b5e139f|
|IKIP17Enumerable|0x780e9d63|
|IKIP17Mintable|0xeab83e20|
|IKIP17MetadataMintable|0xfac27f46|
|IKIP17Burnable|0x42966c68|
|IKIP17Pausable|0x4d5507ff|

```java

Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = caver.kct.kip17.detectInterface(caver, contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//using instance method.
KIP17 kip17 = caver.kct.kip17.create(contractAddress);
Map<String, Boolean> resultInstance = kip17.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

The execution result of the above code is shown below.

```java
{
  "IKIP17Enumerable" : true,
  "IKIP17Metadata" : true,
  "IKIP17Burnable" : true,
  "IKIP17Mintable" : true,
  "IKIP17" : true,
  "IKIP17MetadataMintable" : true,
  "IKIP17Pausable" : true
}
```

### Detecting KIP-37 interfaces <a id="detecting-kip-37-interfaces"></a>

To detect the interface implemented in a KIP-37 token contract, you can use `detectInterface()` in the `KIP37` class.
It returns the mapping between KIP-37 interface identifier and interface support.

`detectInterface()` supports both static and instance methods, so you can select and use the appropriate method.

The interface detection through `detectInterface()` for `KIP37` is shown in the table below.

| Interface | KIP-13 Identifier |
|---|---|
| IKIP37 | 0x6433ca1f |
| IKIP37Metadata | 0x0e89341c |
| IKIP37Mintable | 0xdfd9d9ec |
| IKIP37Burnable | 0x9e094e9e |
| IKIP37Pausable | 0x0e8ffdb7 |


```java

Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = caver.kct.kip37.detectInterface(contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//using instance method.
KIP37 kip37 = caver.kct.kip37.create(contractAddress);
Map<String, Boolean> resultInstance = kip37.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

The execution result of the above code is shown below.

```java
{
  "IKIP37Metatdata" : true,
  "IKIP37Burnable" : true,
  "IKIP37" : true,
  "IKIP37Pausable" : true,
  "IKIP37Mintable" : true
}
```


[caver-java API]: https://javadoc.io/doc/com.klaytn.caver/core/
[KIP-7]: https://kips.klaytn.foundation/KIPs/kip-7
[KIP-13]: https://kips.klaytn.foundation/KIPs/kip-13
[KIP-17]: https://kips.klaytn.foundation/KIPs/kip-17
[KIP-37]: https://kips.klaytn.foundation/KIPs/kip-37
