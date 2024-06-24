# Getting Started

## Prerequisites <a id="prerequisites"></a>

### Dependency <a id="dependency"></a>

**maven**

```groovy
<dependency>
  <groupId>com.klaytn.caver</groupId>
  <artifactId>core</artifactId>
  <version>1.4.0</version>
</dependency>
```

**gradle**

```groovy
implementation 'com.klaytn.caver:core:1.4.0'
```

If you want to use Android dependency, just append -android at the end of the version string. (e.g. 1.0.1-android)

If you want to see details of the JSON-RPC requests and responses, please include [LOGBack](https://logback.qos.ch/) dependency in your project. Below is a Gradle build file example. You can add the dependency to Maven as well. Since caver-java uses the [SLF4J](http://www.slf4j.org/) logging facade, you can switch to your preferred logging framework instead of LOGBack.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**Note**: In the central repository, the RC, Android, and Java versions are listed together. If you use wildcards to get a version, you may be using a version that is not appropriate for your platform.

### Installation <a id="installation"></a>

If you want to generate transactions related with a smart contract, you need to install a Solidity compiler and caver-java command-line tool first.

#### Solidity Compiler <a id="solidity-compiler"></a>

You can install the Solidity compiler locally, following the instructions as per [the project documentation](http://solidity.readthedocs.io/en/develop/installing-solidity.html). Klaytn recommends you to install Solidity version either 0.4.24 or 0.5.6. If you are a macOS user, you can install the versions via Homebrew:

```text
$ brew install klaytn/klaytn/solidity@0.4.24  # version 0.4.24
$ brew install klaytn/klaytn/solidity@0.5.6   # version 0.5.6
```

#### Command-line Tool <a id="command-line-tool"></a>

The command-line tool allows you to generate Solidity smart contract function wrappers from the command line.

**Installation (Homebrew)**

Java 1.8+ is required to install this.

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

After installation you can run command 'caver-java' like below:

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

**Installation (Other)**

Currently, we do not support other package managers. As another solution, we provide a method to build the CLI below.

- Download or fork caver-java.

- Do task 'shadowDistZip' in the console module using Gradle. As a result, `console/build/distributions/console-shadow-{version}.zip` is generated.

  ```text
  $ ./gradlew :console:shadowDistZip
  ```

- Unzip the zip file in the build directory

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

- Execute the binary file to run the command-line tool like below. You can find a shell script file for macOS users and a batch file for Window users.

  ```text
  $ ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```

## Managing Accounts <a id="managing-accounts"></a>

### Creating an Account <a id="creating-an-account"></a>

In order to sign transactions, you need to have either an EC (Elliptic Curve) key pair or a Klaytn keystore file.

#### Using an EC Key Pair <a id="using-an-ec-key-pair"></a>

You can create a Klaytn account using an EC key pair like below:

```java
KlayCredentials credentials = KlayCredentials.create(Keys.createEcKeyPair());
String privateKey = Numeric.toHexStringWithPrefix(credentials.getEcKeyPair().getPrivateKey()); 
String address = credentials.getAddress();
```

#### Using a Keystore File <a id="using-a-keystore-file"></a>

If you want to create a new account with a keystore file (you can also create a new keystore file in \[Klaytn Wallet]):

```java
KlayWalletUtils.generateNewWalletFile(
        <yourPassword>,
        new File(<walletFilePath>)
);
```

To load an account using a keystore file like below:

```java
KlayCredentials credentials = KlayWalletUtils.loadCredentials(<password>, <walletFilePath>);
```

## Sending a Transaction <a id="sending-a-transaction"></a>

### Getting KLAY via Baobab Faucet <a id="getting-klay-via-baobab-faucet"></a>

After creating an account, you can receive some Baobab testnet KLAY for the Baobab testnet via Baobab Faucet, available at [https://baobab.wallet.klaytn.foundation/](https://baobab.wallet.klaytn.foundation/). The received testnet KLAY will be used for transaction fee later.

### Connecting to Baobab <a id="connecting-to-baobab"></a>

You can connect to the Baobab network like below:

```java
Caver caver  = Caver.build(https://your.baobab.en.url:8651);
```

### Sending a Value Transfer Transaction <a id="sending-a-value-transfer-transaction"></a>

After you get a `Caver` instance and create an account which has some KLAY, you can send 1 peb to a certain address(`0xe97f27e9a5765ce36a7b919b1cb6004c7209217e`) with a gas limit `BigInteger.valueOf(100_000)` like below:

`TransactionManager` is introduced to hide the complexity of transaction types. For example, a `FeeDelegatedValueTransferTransaction` object can be transformed from a `ValueTransferTransaction` object. For more details, see [Fee Delegation]. In addition to Fee Delegation, `TransactionManager` can be used with `GetNonceProcessor`, `ErrorHandler`, and `TransactionReceiptProcessor`.

```java
TransactionManager transactionManager = new TransactionManager.Builder(caver, credentials)
        .setChaindId(ChainId.BAOBAB_TESTNET).build();

ValueTransferTransaction valueTransferTransaction = ValueTransferTransaction.create(
        credentials.getAddress(),  // fromAddress
        "0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",  // toAddress
        BigInteger.ONE,  // value
        BigInteger.valueOf(100_000)  // gasLimit
);

KlayRawTransaction klayRawTransaction = transactionManager.sign(valueTransferTransaction);
String transactionHash = transactionManager.send(klayRawTransaction);

TransactionReceiptProcessor transactionReceiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);  // pollingSleepDuration = 1000, pollingAttempts = 15
KlayTransactionReceipt.TransactionReceipt transactionReceipt = transactionReceiptProcessor.waitForTransactionReceipt(transactionHash);
```

If you use `ValueTransfer` class, you can more easily compose and send a transaction. This is because `ValueTransfer` class makes the processes above simple like below:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt
        = ValueTransfer.create(caver, credentials, ChainId.BAOBAB_TESTNET).sendFunds(
                redentials.getAddress(),  // fromAddress
                "0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",  // toAddress
                BigDecimal.ONE,  // value 
                Convert.Unit.PEB,  // unit 
                BigInteger.valueOf(100_000)  // gasLimit
            ).send();
```

### Checking Receipts <a id="checking-receipts"></a>

If you send a transaction via `sendFunds`, caver-java tries to get a transaction receipt by default. After you get a receipt, you can see the following log in the console.

```javascript
{
   "jsonrpc":"2.0",
   "id":4,
   "result":{
      "blockHash":"0x45542cc3e3bce952f368c5da9d40f972c134fed2b2b6815231b5caf33c79dacd",
      "blockNumber":"0x39a57b",
      "contractAddress":null,
      "from":"0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",
      "gas":"0x186a0",
      "gasPrice":"0x5d21dba00",
      "gasUsed":"0x5208",
      "logs":[],
      "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "nonce":"0x114e",
      "senderTxHash":"0x3d50b9fa9fec58443f5618ed7e0f5aec5e9a6f7269d9ff606ff87156ca5b4afd",
      "signatures":[
         {
            ...
         }
      ],
      "status":"0x1",
      "to":"0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",
      "transactionHash":"0x3d50b9fa9fec58443f5618ed7e0f5aec5e9a6f7269d9ff606ff87156ca5b4afd",
      "transactionIndex":"0x1",
      "type":"TxTypeValueTransfer",
      "typeInt":8,
      "value":"0x1"
   }
}
```

In this receipt, you can check the status of the transaction execution. If the 'status' field in the receipt is "0x1", it means the transaction is processed successfully. If not, the transaction failed. The detailed error message is presented in the `txError` field. For more detail, see [txError].

## Sending Other Transaction Types <a id="sending-other-transaction-types"></a>

### Account Update <a id="account-update"></a>

If you want to update the key of the given account to a new [AccountKeyPublic] key:

```java
AccountUpdateTransaction accountUpdateTransaction = AccountUpdateTransaction.create(
        credentials.getAddress(),  // fromAddress
        AccountKeyPublic.create(
                "0xbf8154a3c1580b5478ceec0aac319055185280ce22406c6dc227f4de85316da1",  // publicKeyX
                "0x0dc8e4b9546adcc6d1f11796e43e478bd7ffbe302917667837179f4da77591d8"  // publicKeyY
        ),  // newAccountKey
        BigInteger.valueOf(100_000)  // gasLimit
);
Account.create(caver, credentials, ChainId.BAOBAB_TESTNET).sendUpdateTransaction(accountUpdateTransaction).send();
```

An account key represents the key structure associated with an account. To get more details and types about the Klaytn account key, please read [AccountKey].

### Smart Contract <a id="smart-contract"></a>

caver-java supports auto-generation of smart contract wrapper code. Using the wrapper, you can easily deploy and execute a smart contract. Before generating a wrapper code, you need to compile the smart contract first. Note: This will only work if a Solidity compiler is installed in your computer. See [Solidity Compiler].

```text
$ solc <contract>.sol --bin --abi --optimize -o <output-dir>/
```

Then, generate the wrapper code using caver-java’s [command-line tool].

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

Above command will output `<smartContract>`.java. After generating the wrapper code, you can deploy your smart contract like below:

```java
<smartContract> contract = <smartContract>.deploy(
        caver, credentials, <chainId>, <gasProvider>,
        <param1>, ..., <paramN>).send();
```

After the smart contract has been deployed, you can create a smart contract instance like below:

```java
<smartContract> contract = <smartContract>.load(
        <deployedContractAddress>, caver, credentials, <chainId>, <gasProvider>
);
```

To transact with a smart contract:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = contract.<someMethod>(
        <param1>,
        ...).send();
```

To call a smart contract:

```java
<type> result = contract.<someMethod>(<param1>, ...).send();
```

#### Example <a id="example"></a>

This section describes how to deploy and execute a smart contract on the Baobab testnet. In this example, we use a smart contract [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol). If contract deployment fails and an empty contract address is returned, it will throw RuntimeException.

```java
ERC20Mock erc20Mock = ERC20Mock.deploy(
        caver, credentials, 
        ChainId.BAOBAB_TESTNET,  // chainId
        new DefaultGasProvider(),  // gasProvider
        credentials.getAddress(),  // param1(initialAccount)
        BigInteger.valueOf(100)  // param2(initialBalance)
).send();
String deployedContractAddress = erc20Mock.getContractAddress();
```

To create an instance of the deployed ERC20Mock contract:

```java
ERC20Mock erc20Mock = ERC20Mock.load(
        deployedContractAddress, 
        caver, credentials, 
        ChainId.BAOBAB_TESTNET,  // chainId 
        new DefaultGasProvider()  // gasProvider
);
```

If you transfer 10 tokens to a specified address (e.g., `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`), use the following code:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = erc20Mock.transfer(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a",  // toAddress
        BigInteger.valueOf(10)  // value
).send();
```

To check the balance of the recipient (e.g., `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`), use the code below:

```java
BigInteger balance = erc20Mock.balanceOf(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a"  // owner
).send();
```

### Fee Delegation <a id="fee-delegation"></a>

Klaytn provides [Fee Delegation] feature which allows service providers to pay transaction fees instead of the users.

#### Value Transfer <a id="value-transfer"></a>

On the client side, client who initiates the transaction will generate a fee-delegated value transfer transaction as follows: A sender creates a default `ValueTransferTransaction` object, then [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-) returns a signed `FeeDelegatedValueTransferTransaction` object if the second parameter is set to `true`.

```java
TransactionManager transactionManager = new TransactionManager.Builder(caver, credentials)
        .setChaindId(ChainId.BAOBAB_TESTNET).build();  // BAOBAB_TESTNET = 1001
ValueTransferTransaction valueTransferTransaction = ValueTransferTransaction.create(
        credentials.getAddress(),  // fromAddress
        "0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",  // toAddress
        BigInteger.ONE,  // value
        BigInteger.valueOf(100_000)  // gasLimit
);
String senderRawTransaction = transactionManager.sign(valueTransferTransaction, true).getValueAsString();  // isFeeDelegated : true
```

A signed transaction, `senderRawTransaction`, is generated. Now the sender delivers the transaction to the fee payer who will pay for the transaction fee instead. Transferring transactions between the sender and the fee payer is not performed on the Klaytn network. The protocol should be defined by themselves.

After the fee payer gets the transaction from the sender, the fee payer can send the transaction using the `FeePayerManager` class as follows. `FeePayerManager.executeTransaction()` will sign the received transaction with the fee payer's private key and send the transaction to the Klaytn network.

```java
KlayCredentials feePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer)
        .setChainId(ChainId.BAOBAB_TESTNET)
        .build();
feePayerManager.executeTransaction(senderRawTransaction);
```

#### Smart Contract Execution <a id="smart-contract-execution"></a>

The difference between fee-delegated smart contract execution and fee-delegated value transfer above is that this needs input data to call a function of a smart contract. A sender can generate a fee-delegated smart contract execution transaction as shown below. Note that [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-) returns a `TxTypeFeeDelegatedSmartContractExecution` object if you pass `true` to the second parameter. The example below invokes the `transfer` method of [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol) contract which is described in [Smart Contract].

```java
String recipient = "0x34f773c84fcf4a0a9e2ef07c4615601d60c3442f";
BigInteger transferValue = BigInteger.valueOf(20);
Function function = new Function(
        ERC20Mock.FUNC_TRANSFER,  // FUNC_TRANSFER = "transfer"
        Arrays.asList(new Address(recipient), new Uint256(transferValue)),  // inputParameters
        Collections.emptyList()  // outputParameters
);
String data = FunctionEncoder.encode(function);

TransactionManager transactionManager = new TransactionManager.Builder(caver, credentials)
        .setChaindId(ChainId.BAOBAB_TESTNET).build();  // BAOBAB_TESTNET = 1001
SmartContractExecutionTransaction smartContractExecution = 
        SmartContractExecutionTransaction.create(
                credentials.getAddress(),  // fromAddress
                erc20Mock.getContractAddress(),  // contractAddress
                BigInteger.ZERO,  // value
                Numeric.hexStringToByteArray(data),  // data
                BigInteger.valueOf(100_000)  // gasLimit
        );
String senderRawTransaction = transactionManager.sign(smartContractExecution, true).getValueAsString();
```

After you get `senderRawTransaction`, the rest of the process using `FeePayerManager` is the same way as you saw in [fee-delegated value transfer] above:

```java
KlayCredentials feePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer).build();
feePayerManager.executeTransaction(senderRawTransaction);
```

## Using various AccountKey Types <a id="using-various-account-key-type"></a>

caver-java introduces new classes to support the various types of [AccountKey] supported by the platform. This feature is supported starting with version 1.2.0.

### AccountKey  <a id="account-key"></a>

To update the account key on the Klaytn platform, caver-java provides the `AccountKey` interface. The following describes `AccountKey` implementations, `AccountKeyPublic`, `AccountKeyWeightedMultiSig`, and `AccountKeyRoleBased`.
See [Account Update](#account-update) for how to update an Account.

### AccountKeyPublic <a id="account-key-public"></a>

`AccountKeyPublic` is an implementation of `AccountKey` with one public key.
You can create it like this:

```java
ECKeyPair newKeyPair = Keys.createEcKeyPair();
AccountKeyPublic newAccountKey = AccountKeyPublic.create(newKeyPair.getPublicKey());
```

To use the account updated with `AccountKeyPublic`, you need to create `KlayCredentials` as follows:

```java
KlayCredentials validCredentails = KlayCredentials.create(newKeyPair, oldCredentials.getAddress());

// Because the account address is decoupled from the AccountKeyPublic (public key), you can't use the account if you create the credentials without address as below.
KlayCredentials invalidCredentails = KlayCredentials.create(newKeyPair);
```

### AccountKeyWeightedMultiSig <a id="account-key-weighted-multi-sig"></a>

`AccountKeyWeightedMultiSig` is an account key that contains multiple public keys with varying weights. `AccountKeyWeightedMultiSig` also defines the threshold, the sum of the weights of the keys that must be signed in order to use the account. The maximum number of keys supported is 10. You can create `AccountKeyWeightedMultiSig` as below:

```java
List<AccountKeyWeightedMultiSig.WeightedPublicKey> weightedTransactionPublicKeys = new ArrayList<>();

int weight1 = 10;
int weight2 = 30;

ECKeyPair ecKeyPair1 = Keys.createEcKeyPair();
ECKeyPair ecKeyPair2 = Keys.createEcKeyPair();

AccountKeyWeightedMultiSig.WeightedPublicKey weightedPublicKey1 = AccountKeyWeightedMultiSig.WeightedPublicKey.create(
				BigInteger.valueOf(weight1),
				AccountKeyPublic.create(ecKeyPair1.getPublicKey())
);

AccountKeyWeightedMultiSig.WeightedPublicKey weightedPublicKey2 = AccountKeyWeightedMultiSig.WeightedPublicKey.create(
				BigInteger.valueOf(weight2),
				AccountKeyPublic.create(ecKeyPair2.getPublicKey())
);

weightedTransactionPublicKeys.add(weightedPublicKey1);
weightedTransactionPublicKeys.add(weightedPublicKey2);

AccountKeyWeightedMultiSig newAccountKey = AccountKeyWeightedMultiSig.create(
                BigInteger.valueOf(weight1 + weight2),
                weightedTransactionPublicKeys
);
```

To use the account updated with `AccountKeyWeightedMultiSig`, you can create `KlayCredentials` as follows:

```java
List<ECKeyPair> transactionECKeyPairList = new ArrayList<>();

transactionECKeyPairList.add(ecKeyPair1);
transactionECKeyPairList.add(ecKeyPair2);

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, address);
```

### AccountKeyRoleBased <a id="account-key-role-based"></a>

`AccountKeyRoleBased` is a list of `AccountKey`. Each `AccountKey` is assigned to a specific role according to its position. AccountKey can be `AccountKeyPublic`,` AccountKeyWeightedMultiSig`, or `AccountKeyFail`. If `AccountKeyNil` is used for a specific role, the key will not be updated for that role and the existing AccountKey will be used. If `AccountKeyFail` is used, signing for the role will fail always, so be careful using AccountKeyFail.

```java
List<AccountKey> roleBasedAccountKeyList = new ArrayList<>();

ECKeyPair newKeyPair1 = Keys.createEcKeyPair(); // for RoleTransaction
roleBasedAccountKeyList.add(AccountKeyPublic.create(newKeyPair1.getPublicKey()));

ECKeyPair newKeyPair2 = Keys.createEcKeyPair(); // for RoleAccountUpdate
roleBasedAccountKeyList.add(AccountKeyPublic.create(newKeyPair2.getPublicKey()));

ECKeyPair newKeyPair3 = Keys.createEcKeyPair(); // for RoleFeePayer
roleBasedAccountKeyList.add(AccountKeyPublic.create(newKeyPair3.getPublicKey()));

newAccountKey = AccountKeyRoleBased.create(roleBasedAccountKeyList);
```

To use the account updated with `AccountKeyRoleBased`, you can create `KlayCredentials` as follows:

```java
List<ECKeyPair> transactionECKeyPairList = Arrays.asList(newKeyPair1);
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2);
List<ECKeyPair> feePayerECKeyPairList = Arrays.asList(newKeyPair3);

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

If the account does not have a key for a specific role, pass an empty List as an argument.

```java
List<ECKeyPair> transactionECKeyPairList = Collections.emptyList();
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2);
List<ECKeyPair> feePayerECKeyPairList = Collections.emptyList();

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

If the account has multiple keys for a specific role, you can pass the multiple keys as follows.

```java
List<ECKeyPair> transactionECKeyPairList = Collections.emptyList();
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2-1, newKeyPair2-2, newKeyPair2-3);
List<ECKeyPair> feePayerECKeyPairList = Collections.emptyList();

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

## Sending a Transaction with Multiple Signers <a id="sending-a-transaction-with-multiple-signers"></a>

If an account has AccountKeyMultiSig or AccountKeyRoleBased, each key can be managed by different people.

This section describes how to collect signatures and send the transaction if there are multiple signers.

### Sequential sender signing <a id="sequential-sender-signing"></a>

The `rawTransaction` has an RLP encoded transaction that contains both `txSignatures` and `feePayerSignatures`. `feePayerSignature` is included only when the transaction is a fee delegated transaction.

In the absence of a fee payer, the process of repeatedly signing and executing a transaction can be divided into three parts. 1. RLP-encode the transaction and send it to the signer in the form of rawTransaction. 2. Signer signs with its own key for the received rawTransaction. 3. Sending the signed rawTransaction to EN. Step 2 can be repeated if there are multiple signers.

```java
//// 1. Alice creates a transaction, signs it, and sends it to Bob.
//// Alice Side
ValueTransferTransaction transactionTransformer = ValueTransferTransaction.create(from, to, BigInteger.ONE, GAS_LIMIT);

TransactionManager transactionManager_alice = new TransactionManager.Builder(caver, senderCredential_alice)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice = transactionManager_alice.sign(transactionTransformer).getValueAsString();

//// 2. Bob signs the received transaction and sends it to Charlie.
//// Bob Side
            TransactionManager transactionManager_bob = new TransactionManager.Builder(caver, senderCredential_bob)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice_and_bob = transactionManager_bob.sign(rawTransaction_signed_alice).getValueAsString();

//// 3. Charlie signs the received transaction and sends it to Klaytn EN.
//// Charlie Side
TransactionManager transactionManager_charlie = new TransactionManager.Builder(caver, senderCredential_charlie)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

KlayTransactionReceipt.TransactionReceipt transactionReceipt = transactionManager_charlie.executeTransaction(rawTransaction_signed_alice_and_bob);
```

### Sequential fee-payer signing <a id="sequential-fee-payer-signing"></a>

Fee-payer signature(s) can also be added sequentially. Signing with `FeePayerManager` accumulates `feePayerSignatures` in the transaction. The signing order is not important. If you sign with `TransactionManager`, the `txSignature` is added. If you sign with `FeePayerManger`, the `feePayerSignatures` is added to the raw transaction.

```java
//// 1. Bob receives a transaction from Alice and signs the transaction as a fee payer.
//// Bob Side
FeePayerManager feePayerManager_bob = new FeePayerManager.Builder(caver, feePayerCredentials_bob)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChainId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice_and_bob = feePayerManager_bob.sign(rawTransaction_signed_alice).getValueAsString();

//// 2. Charlie signs the received transaction and sends it to Klaytn EN.
//// Charlie Side
FeePayerManager feePayerManager_charlie = new FeePayerManager.Builder(caver, feePayerCredentials_charlie)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChainId(LOCAL_CHAIN_ID)
                    .build();

KlayTransactionReceipt.TransactionReceipt transactionReceipt =  feePayerManager_charlie.executeTransaction(rawTransaction_signed_alice_and_bob);
```

## Thanks to <a id="thanks-to"></a>

The [web3j](https://github.com/web3j/web3j) project for the inspiration. 🙂

[Kaia Wallet]: ../../../build/tools/wallets/klaytn-wallet.md
[txError]: ../../transaction-error-codes.md
[AccountKeyPublic]: ../../../learn/accounts.md#accountkeypublic
[AccountKey]: ../../../learn/accounts.md#account-key
[Solidity Compiler]: #solidity-compiler
[command-line tool]: #command-line-tool
[Fee Delegation]: ../../../learn/transactions/transactions.md#fee-delegation
[Smart Contract]: #smart-contract
[fee-delegated value transfer]: #value-transfer
