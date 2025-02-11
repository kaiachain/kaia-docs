# 入门指南

## 新增功能

在 caver-java 1.5.0 中，我们采用了通用架构。 通用架构是 kaia 开发环境的新软件架构，所有 kaia SDK（caver-js/caver-java）均可共享。 它专为简化开发体验而设计，易于扩展到其他编程语言。

随着 caver-java 升级到 1.5.0，除了某些 API 之外，1.4.0 中使用的 API 将被弃用。

caver-java 1.5.0 中新提供的应用程序接口如下。

### caver.account

caver.account 是一个用于更新 Kaia 账户的账户密钥（AccountKey）的软件包，账户密钥可以是一个或多个公钥（AccountKeyPublic、AccountKeyWeightedMultiSig 和 AccountKeyRoleBased），也可以是一种特殊类型的密钥（AccountKeyLegacy 和 AccountKeyFail）。

- 在 caver-java 1.4.0 中，`caver.account`取代了`caver.tx.account`。

### caver.wallet

caver.wallet 是一个管理内存钱包中 Keyring 实例的软件包。 密钥环是存储 Kaia 账户地址及其私人密钥的实例，该账户地址用于签署交易。 caver.wallet 接受所有类型的 Keyring（单 Keyring、多 Keyring 和基于角色的 Keyring），并通过 kaia 账户地址进行管理。

- 在 caver-java 1.4.0 中，"caver.wallet "取代了 "caver.crypto"。
- 在 caver-java 1.4.0 中，"caver.wallet.KeyStore "取代了 "caver.wallet.WalletFile"。

### caver.transaction

caver.transaction 是一个提供与 [Transaction](../../../build/transactions/transactions.md#transactions-overview) 相关功能的软件包。

- 在 caver-java 1.4.0 中，"caver.transaction "取代了 "caver.tx

### caver.rpc

caver.rpc 是一个提供与 kaia Node 的 rpc 调用相关功能的软件包。

- caver.rpc.klay "和 "caver.rpc.net "分别替换了 caver-java 1.4.0 中的 "Klay "和 "Net "接口

### caver.util

caver.utils 提供实用功能。

### caver.contract

caver.contract "是一个软件包，它能让你在 kaia 中轻松处理智能合约。 通过 caver.contract，您可以部署智能合约，并通过调用其函数来执行它们。 caver.contract "首先从ABI（Application Binary Interface）转换智能合约函数和事件，调用这些函数，并获取事件信息。

## 先决条件<a id="prerequisites"></a>

### 添加存储库<a id="adding-a-repository"></a>

在使用 IPFS 之前，应添加一个库存储库。 请先添加以下存储库。

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

### 添加依赖项<a id="adding-a-dependency"></a>

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

如果要使用 Android 依赖关系，只需在版本字符串末尾添加 -android。 \例如 1.0.1-android\)

如果想查看 JSON-RPC 请求和响应的详细信息，请在项目中加入 [LOGBack](https://logback.qos.ch/) 依赖关系。 下面是一个 Gradle 构建文件示例。 您也可以将依赖关系添加到 Maven 中。 由于 caver-java 使用 [SLF4J](http://www.slf4j.org/) 日志界面，因此您可以切换到自己喜欢的日志框架，而不是 LOGBack。

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**注意**：在中央资源库中，RC、Android 和 Java 版本被列在一起。 如果使用通配符获取版本，则可能使用了不适合自己平台的版本。

#### 命令行工具<a id="command-line-tool"></a>

该命令行工具允许你从命令行生成 Solidity 智能合约函数包装器。

**安装 （Homebrew）**

安装需要 Java 1.8 以上版本。

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

安装完成后，您可以运行 "caver-java "命令，如下所示：

```text
$ caver-java solidity generate -b<smart-contract>.bin -a<smart-contract>.abi -o<outputPath> -p<packagePath>
```

**安装 （其他）**

目前，我们不支持其他软件包管理器。 作为另一种解决方案，我们在下文中提供了一种构建 CLI 的方法。

- 下载或 fork caver-java。

- 使用 Gradle 在控制台模块中执行任务 "shadowDistZip"。 结果会生成 `console/build/distributions/console-shadow-{version}.zip` 。

  ```text
  $ ./gradlew :console:shadowDistZip
  ```

- 解压缩构建目录中的压缩文件

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

- 执行二进制文件，运行命令行工具，如下所示。 MacOS 用户可以找到 shell 脚本文件，Window 用户可以找到批处理文件。

  ```text
  $ ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```

## 发送 KAIA 一览

本节介绍一个使用 "keystore 文件 "发送 KAIA 和价值转移交易的简单示例。 密钥存储文件可从 [Kaia Wallet](../../../build/tools/wallets/kaia-wallet.md) 导出。 如果您需要 KAIA 进行测试，可以从 [Kaia 水龙头](https://faucet.kaia.io/) 获取测试 KAIA。

:::note

开发时，最好使用与任何真实资金都不相关的账户。 好的方法是创建一个新的浏览器配置文件（在 Chrome、Brave、Firefox 等浏览器上），并在该浏览器上安装 Kaia 钱包，而且永远不要向该钱包汇款。

:::

```java
public void sendingKLAY() throws IOException, CipherException, TransactionException {
        Caver caver = new Caver(Caver.KAIROS_TESTNET_URL);

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

        //Send a transaction to the  kaia blockchain platform (kaia)
        Bytes32 result = caver.rpc.klay.sendRawTransaction(valueTransfer.getRawTransaction()).send();
        if(result.hasError()) {
            throw new RuntimeException(result.getError().getMessage());
        }

        //Check transaction receipt.
        TransactionReceiptProcessor transactionReceiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);
        TransactionReceipt.TransactionReceiptData transactionReceipt = transactionReceiptProcessor.waitForTransactionReceipt(result.getResult());
    }
```

## 从 caver-java 开始<a id="starting-with-caver-java"></a>

### 连接 kaia 节点<a id="connecting-to-a-klaytn-node"></a>

如果运行的是 EN，可以通过更改主机和端口将其连接到自己的节点，如下所示：

```java
Caver caver = new Caver("http://your.en.url:8551/");
```

## 管理 Keyrings <a id="managing-keyrings"></a>

Keyring "是一个包含 kaia 账户地址和私人密钥的结构。

根据所存储密钥的类型，"Keyring "可分为三种类型：单钥环 "用于存储一个地址和一个私人密钥，"多钥环 "用于存储一个地址和多个私人密钥，"基于角色的钥环 "用于存储一个地址和每个角色的一个或多个私人密钥。

`SingleKeyring` 内部定义了 `key`  属性，该 `key`  存储一个私人密钥。

`MultipleKeyring` 内部定义了 `keys` 属性，该 `keys`以数组形式实现，用于存储多个私钥。

`RoleBasedKeyring` 中定义的 `keys` 属性是以 List 对象的形式实现的，其元素是 3 个私钥数组（空 `keys` 看起来像"[[], [], [] ]"），因此它可以包含每个 "角色 "的多个密钥。 数组的第一个元素填入用于 `roleTransactionKey` 的私钥，第二个元素填入用于 `roleAccountUpdateKey` 的私钥，第三个元素填入用于 `roleFeePayerKey` 的私钥。

### 创建 Keyring <a id="creating-a-keyring"></a>

#### 生成 SingleKeyring <a id="generating-a-singlekeyring"></a>

如下图所示，您可以随机生成一个 keyring。

```java
SingleKeyring keyring = caver.wallet.keyring.generate();
```

#### 从私人密钥创建 SingleKeyring <a id="creating-a-singlekeyring-from-private-key"></a>

此外，如果你拥有特定的私人密钥，还可以用它创建一个keyring，如下图所示。

```java
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey(privateKey);
```

#### 使用私钥和地址创建 SingleKeyring <a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

如果 kaia 账户的私钥与地址不相关联，则可以使用给定的地址和私钥创建一个密钥环，如下所示。

```java
String address = "0x{address in hex}";
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createWithSingleKey(address, privateKey);
```

此外，您还可以从 kaia 钱包密钥派生 SingleKeyring 实例。

```java
String klaytnWalletKey = "0x{private key}0x{type}0x{address in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey);
```

#### 创建具有多个私人密钥的 MultipleKeyring<a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

如果要使用多个私钥，可以使用一个地址和多个私钥创建一个 "MultipleKeyring"。 下面的示例展示了如何创建具有多个私钥的 "多重钥匙环"。

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{private key#3}"};
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(address, privateKeyArray);
```

#### 创建带有私钥的 RoleBasedKeyring <a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

要为每个 "角色 "使用不同的私钥，需要使用 "caver.wallet.keyring.createWithRoleBasedKey"。 每个数组元素代表一个在 `RoleBasedKeyring` 中描述的角色。 下面的示例展示了如何根据每个角色的不同密钥创建一个 `RoleBasedKeyring` 实例。

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

### 从 keystore json 字符串向 caver-java 添加 Keyrings。<a id="adding-keyrings-to-caver-java"></a>

您可以将 keyring 添加到 caver-java 提供的内存钱包中，从而更方便地使用 keyring。 以下示例说明了如何使用 [Kaia Wallet](https://wallet.klaytn.com/) 生成的密钥存储 JSON 文件字符串向 `caver.wallet` 添加密钥。

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
解密地址 : 0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
解密密钥 : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5

地址 ：0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5
```

从上面的输出结果来看，将密钥添加到 `caver.wallet` 后，就可以从 `caver.wallet` 中查询密钥。

如果您有需要使用的地址和私钥，可以通过 caver.wallet.newKeyring 轻松创建一个密钥环，并将其直接添加到 caver.wallet 中。

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

当使用私钥执行 `caver.wallet.newKeyring` 时，一个带有私钥的 Keyring 实例就会创建并添加到 `caver.wallet` 中。 对于多个私钥，会创建一个包含多个私钥的 Keyring 实例并添加到 `caver.wallet`。 当传递包含每个角色的一个或多个私钥的 2D 字符串数组作为元素时，就会创建一个包含每个角色的不同私钥的 Keyring 实例，并将其添加到 `caver.wallet`。

`caver.wallet.add` 或 `caver.wallet.newKeyring` 返回一个添加到 `caver.wallet` 的 Keyring 实例。

## 发送交易<a id="sending-a-transaction"></a>

本节将向您介绍如何在 Kairos Testnet 上使用 caver-java 发送 KAIA。

### 通过 Kairos 龙头获取 KAIA<a id="getting-klay-via-kairos-faucet"></a>

如果您需要 KAIA 进行测试，可以从 [Kaia Faucet](../../../build/get-started/getting-kaia.md#kairos-testnet-and-faucet) 获取 Kairos testnet KAIA。

### 发送价值转移交易<a id="sending-a-value-transfer-transaction"></a>

您可以使用 caver-java 钱包生成交易签名。 您必须经过以下两个步骤才能将交易发送到网络。

1. 签署交易
   - 如果要使用的密钥已添加到 `caver.wallet`，则可以使用 `caver.wallet.sign`函数签名。
   - 如果单独管理钥匙圈而不将其添加到 `caver.wallet` 中，则可以通过 `transaction.sign` 函数签署交易。
2. 通过 `caver.rpc.klay.sendRawTransaction`，向 kaia 发送已签名事务的 RLP 编码字符串。

**注意：** 汇款人必须有足够的 KAIA 数量进行转账并支付交易费用。

#### 签署交易

在向 kaia 发送交易之前，您应该先签署交易。

下面举例说明如果在 `caver.wallet`中添加了密钥，如何签署交易。

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

上述代码向 `caver.wallet` 添加了一个密钥，创建了一个交易，并通过 `caver.wallet.sign` 签署了该交易。

运行上述代码会得到以下结果。 执行上述代码后，事务的 RLP 编码字符串如下所示。 (您得到的 RLP 编码字符串输出可能与下图所示的字符串输出不同）。

```bash
RLP 编码字符串：0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### 向 kaia 发送已签名交易的 RLP 编码字符串

现在你可以像下面这样向网络发送已签名的交易。 如果要运行下面的示例，请将 "rlpEncoding "替换为上述代码中的 "rlpEncoded "值。

```java
public String sendRawTransaction() {
  Caver caver = new Caver(Caver.KAIROS_TESTNET_URL);
  
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

如果您想在不使用 `caver.wallet` 的情况下签署交易并将其发送到网络，请参阅下面的示例。

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

执行上述代码时，交易哈希值（txHash）的打印结果如下所示。

```bash
交易哈希值 : 0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113
```

### 检查收据<a id="checking-receipts"></a>

当您通过 `caver.rpc.klay.sendRawTransaction` 向 kaia 传输交易时，可以使用 `TransactionReceiptProcessor` 获取交易收据。

下面的示例展示了如何使用 PollingTransactionReceiptProcessor 获取收据。

```java
Caver caver = new Caver(Caver.KAIROS_TESTNET_URL);
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

如上例所述，您可以通过 TransactionReceiptProcessor 获取发送事务的结果。 transactionHash "字段在收据对象中定义。

您可以使用带有 `txHash` 字符串的 `caver.rpc.klay.getTransactionReceipt` RPC 调用，在交易包含在区块中后随时从网络查询交易的收据。 下面的示例展示了如何使用 `caver.rpc.klay.getTransactionReceipt` RPC 调用获取收据。

```java
Caver caver = new Caver(Caver.KAIROS_TESTNET_URL);
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

交易结果可通过收据的 "状态 "查询。 有关返回值的详细信息，请参阅 `caver.rpc.klay.getTransactionReceipt`。 如果交易失败，可以在收据的 `txError` 中查看更多有关错误的信息。 有关 `txError` 的更多信息，请参阅 [txError: Detailed Information of Transaction Failures](../../transaction-error-codes.md)。

## 执行其他交易类型<a id="executing-other-transaction-types"></a>

Kaia 提供各种事务类型，以提高可扩展性和性能。 更多信息，请参阅 [Transactions](../../../build/transactions/transactions.md)。 本节将介绍一些可与 caver-java 配合使用的示例。

### 费用委托<a id="fee-delegation"></a>

Kaia 提供费用委托功能。 下面是一个制作 RLP 编码交易的示例，当您是此类交易的发送方时：

```java
Caver caver = new Caver(Caver.KAIROS_TESTNET_URL);
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

执行上述代码后，将打印 RLP 编码字符串。 (您得到的 RLP 编码字符串输出可能与下图所示的字符串输出不同）。

```bash
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

在将 "feePayerSignatures"（付费者签名）附加到由交易发送者签名的 RLP 编码字符串（"rawTransaction"（原始交易））之后，付费者就可以向 kaia 发送交易。 如果 `caver.wallet` 也有缴费人的密钥，则可以通过调用 `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`，将缴费人的签名注入到 `feeDelegatedTx` 中。 否则，费用支付方必须从发送方签名的 RLP 编码字符串中创建一个 "feeDelegatedTx"，并在其上添加费用支付方的签名，如下图所示。 如果要运行下面的示例，请将 `0x{RLP-encoded string}` 替换为上述 `rlpEncoded` 的值。

```java
Caver caver = new Caver(Caver.KAIROS_TESTNET_URL);

SingleKeyring feePayerKeyring = caver.wallet.keyring.createFromPrivateKey("0x{privateKey}");
caver.wallet.add(feePayerKeyring);

String rlpEncoded = "0x{RLP-encoded string}";
FeeDelegatedValueTransfer feeDelegatedValueTransfer = caver.transaction.feeDelegatedValueTransfer.decode(rlpEncoded);
feeDelegatedValueTransfer.setFeePayer(feePayerKeyring.getAddress());
feeDelegatedValueTransfer.setKlaytnCall(caver.rpc.klay);

caver.wallet.signAsFeePayer(feePayerKeyring.getAddress(), feeDelegatedValueTransfer);
System.out.println(feeDelegatedValueTransfer.getRLPEncoding());
```

执行上述代码后，包括寄件人签名和缴费人签名在内的 RLP 编码字符串将打印如下。 (您得到的输出结果可能与下面显示的字符串输出结果不同）。

```bash
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

现在，发送方和缴费方都对交易进行了签名，并可通过网络发送。 将 `0x{RLP-encoded string}` 替换为上述示例代码输出的 RLP 编码字符串。

```java
Caver caver = new Caver(Caver.KAIROS_TESTNET_URL);

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

交易结果可通过收据的 "状态 "查询。 有关返回值的详细信息，请参阅 `caver.rpc.klay.getTransactionReceipt`。 如果交易失败，可以在收据的 `txError` 中查看更多有关错误的信息。 有关 `txError` 的更多信息，请参阅 [txError: Detailed Information of Transaction Failures](../../transaction-error-codes.md)。

### 账户更新<a id="account-update"></a>

如果要更改 kaia 帐户的私钥，需要记住 3 件重要的事情：

1. Kaia 会验证您发送给它的每一笔交易。
2. 验证需要与您的私人密钥完全对应的公钥。
3. 因此，在将私钥更改为新密钥之前，必须先将旧公钥更改为新密钥。 新的公开密钥必须来自新的私人密钥。

牢记以上三点，你就可以按照以下步骤更改你的私人密钥了：

1. 准备新私钥，创建新 keyring。
2. 根据需要的类型（Single keyring, Multiple keyring, or Role-based keyring）创建钥匙圈。
3. 从新 keyring 生成一个账户实例。 该账户实例持有 kaia 账户的新公钥。
4. 向 kaia 发送包含账户实例的 AccountUpdate 事务。
5. 最后，将旧 keyring 替换为步骤 2 中创建的新 keyring。

详情请查看 "账户更新"。

要更改 AccountKey，必须在 `caver.transaction.type.AccountUpdate` 的输入参数对象中为 `account` 字段提供一个 `Account` 实例。 账户 "实例包含 kaia 账户的地址和要更新的账户密钥。

下面的代码是一个示例代码，用于更改 kaia 帐户使用的私钥，并将 kaia 帐户的 AccountKey 更改为 "AccountKeyPublic"。 别忘了准备新的私人密钥。

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

如果上述代码执行成功，你就不能再使用旧私钥来签署任何与旧钥匙圈有关的交易。 因此，您必须通过 `caver.wallet.updateKeyring(newKeyring)` 使用`newKeyring`更新旧 keyring。 一旦更新，签名将由新更新的私钥完成。

下面介绍如何用多个 `AccountKeys` 更新 kaia 帐户的 AccountKey？ 下面的示例解释了如何创建一个带有多个私钥的 "账户 "实例（您可以通过 `caver.account.create`创建一个带有多个公钥的 "账户 "实例）。 同样，在将创建的账户实例输入事务对象内的 "账户 "字段后，其余的更新过程与上例相同。

首先，让我们创建一个账户实例，使用 `AccountKeyWeightedMultiSig` 进行更新。 对于 "AccountKeyWeightedMultiSig"，必须为每个密钥定义阈值和权重。 为此，请使用 `caver.account.weightedMultiSigOptions`。 第一个参数是阈值，第二个参数是包含每个键权重的数组。

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

现在，让我们使用 `AccountKeyRoleBased` 更新 AccountKey。 `AccountKeyRoleBased` 是一种 `AccountKey` 类型，用于定义每个 `role` 使用的密钥。

```java
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {1,1,1});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

const account = newKeyring.toAccount()
```

上面的 AccountKeyRoleBased 就是为每个角色使用一个公钥的例子。 从上面的代码中可以看到，每个密钥对应一个私人密钥。 如果要为每个角色使用多个私钥，则必须为每个角色定义`caver.account.weightedMultiSigOptions`，如下所示。

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

如果要将 AccountKey 更新为 "AccountKeyLegacy "或 "accountKeyFail"，请如下所示创建一个 Account 实例，并将其分配给事务的 "account "字段。 其余更新过程与其他 AccountKey 相同。

```java
// Create an account with AccountKeyLegacy
Account account = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address);

// Create an account with AccountKeyFail
Account account = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### 智能合约<a id="smart-contract"></a>

caver.contract "软件包中的 "Contract "类可轻松与 kaia 上的智能合约进行交互。 当给出智能合约的底层 ABI 时，该智能合约的所有功能都会自动转换并存储在 "合约 "实例中。 这样，您就可以像处理 Java 中的 "合约 "实例一样与智能合约交互。

下面我们通过编写一个简单的 solidity 示例代码来开始讲解如何用 Java 处理智能合约。 创建一个 "test.sol "文件，并写下下面的示例。

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

然后，编译该智能合约，获取其字节码和 ABI。

```text
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**注意**：要编译智能合约，必须安装 [solidity 编译器](https://solidity.readthedocs.io/en/develop/installing-solidity.html)。 要编译上述程序，需要安装 solc:0.5.6。

要按类型部署智能合约，可以使用下面描述的 caver-java 类：

- 当智能合约交易的发送方或费用支付方支付费用时，"caver.contract "软件包中的 "Contract "类将会被使用。
- 当智能合约交易的发送方支付费用时，"caver.transaction "包中的 "SmartContractDeploy "类就会出现
- 当智能合约交易的费用支付方支付费用时，"caver.transaction "包中的 "feeDelegatedSmartContractDeploy "类将被使用。
- 当智能合约交易的费用支付方支付费用时，"caver.transaction "包中的 "feeDelegatedSmartContractDeployWithRatio "类将被删除。

下面是一个利用 `caver.contract` 包中的 `Contract` 类的示例。 你可以根据编译智能合约后得到的字节码和 ABI 创建一个类似下面的 `contract` 实例。

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

运行上面的代码会得到以下结果。

```bash
function set(string,string)
function get(string)
ContractAddress : null
```

看一下上面的输出，你就会发现 `contract` 实例拥有智能合约方法。 由于尚未部署，因此可以看到 `contract.getContractAddress()` 的结果输出为空。

如果该合同已经部署，并且您知道部署该合同的合同地址，请将合同地址作为第三个参数传递给 `contract` 实例的构造函数，如下所示。

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

运行上面的代码会得到以下结果。

```bash
function set(string,string)
function get(string)
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

合同 "实例在创建时会将其合同地址存储为 "contractAddress "属性。 可以通过 getter / setter 函数（"getContractAddress()"/"setContractAddress()"）访问地址。

一旦创建了 "合约 "实例，就可以通过传递其字节码和构造函数参数（在需要部署时）来部署智能合约，如下图所示。

请注意，"合同 "实例的 "deploy() "方法会发送用于合同部署和合同执行的事务。 在发送交易时，它会使用 `caver.wallet` 中的 Keyrings 进行签名。 要使用的密钥必须在签名前添加到 `caver.wallet` 中。

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

在上面的代码中，"deployer "会将合约部署到 kaia，并返回已部署的 "contract "实例。

```bash
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

根据部署交易的合约类型，可以使用以下类别之一来部署智能合约：

- 当智能合约交易的发送方或费用支付方支付费用时，"caver.contract "软件包中的 "Contract "类将会被使用。
- 当智能合约交易的发送方支付费用时，"caver.transaction "包中的 "SmartContractDeploy "类就会出现
- 当智能合约交易的费用支付方支付费用时，"caver.transaction "包中的 "feeDelegatedSmartContractDeploy "类将被使用。
- 当智能合约交易的费用支付方支付费用时，"caver.transaction "包中的 "feeDelegatedSmartContractDeployWithRatio "类将被删除。

要通过费用委托交易部署智能合约，请在 "SendOptions "类中定义 "feeDelegation "和 "feePayer "字段，如下所示。

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

如果您想在通过 `caver.contract` 部署智能合约时发送发送方和支付方分别签名的交易，请参考下面的代码。

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

要按类型执行智能合约的功能，可以使用下面描述的 caver-java 类：

- 当智能合约交易的发送方支付费用时，"caver.contract "软件包中的 "Contract "类将被删除。
- 当智能合约交易的发送方支付费用时，"caver.transaction "软件包中的 "SmartContractExecution "类将被删除。
- 当智能合约交易的费用支付方支付费用时，"caver.transaction "包中的 "FeeDelegatedSmartContractExecution "类将被使用。
- 当智能合约交易的费用支付方支付费用时，"caver.transaction "包中的 "FeeDelegatedSmartContractExecutionWithRatio "类将被使用。

为了展示如何在智能合约中执行函数，我们在这里发送一个合约执行事务，将字符串 "testValue "作为下面示例代码中合约函数 "set "的输入参数。

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

要通过费用委托交易执行智能合约的功能，请在 "SendOptions "类中定义 "feeDelegation "和 "feePayer "字段，如下所示。

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

如果您想在通过 `caver.contract` 执行智能合约时发送一个发送方和支付方分别签名的交易，请参考下面的代码：

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

加载一个 "合约 "实例并调用其中的一个函数（不发送事务，只是调用）：下面的示例显示了在合约中调用一个 "get "函数。

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

执行上述代码后，输出值如下所示。

```bash
测试值
```

如需了解更多信息，请参阅 [caver-java API] 。

## IPFS<a id="ipfs"></a>

IPFS（专有文件系统）是一种分布式文件系统，用于存储和访问文件、网站、应用程序和数据。

您可以使用 Caver 通过 IPFS 上传和下载文件。

### 连接 IPFS<a id="connecting-with-ipfs"></a>

caver.ipfs "包中的 "IPFS "类被定义为 "Caver "中的一个类成员变量，因此你可以通过 "Caver "与 IPFS 交互。

要通过 "Caver "实例使用 "IPFS "实例，必须先调用方法 "setIPFSNode() "连接到 IPFS 节点。

函数 `setIPFSNode()` 需要以下参数：

- IPFS HTTP API 主机 URL
- IPFS HTTP API 主机端口号
- 主机是否使用 SSL。

```java
String host = "The URL of an IPFS node";
int port = 5001; // API host port number
boolean isSSL = true; // API host support ssl 
Caver caver = new Caver();
caver.ipfs.setIPFSNode(host, port, isSSL);
```

### 通过 IPFS 上传文件<a id="uploading-a-file-through-ipfs"></a>

要通过 `IPFS` 上传文件，请像下面一样使用 `add()`。

该函数返回上传文件的 [CID（内容标识符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。

```java
String filePath = "/path/to/file";
String cid = caver.ipfs.add(filePath);
System.out.println(cid);
```

上述代码的执行结果如下所示。

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

同样，您也可以上传字节数组。

```java
String text = "sample data";
byte[] data = text.getBytes();

String cid = caver.ipfs.add(data);
System.out.println(cid);
```

上述代码的执行结果如下所示。

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

### 从 IPFS 下载文件<a id="downloading-a-file-from-ipfs"></a>

要从 `IPFS` 下载文件，请像下面一样使用 `get()`。

此功能需要下载文件的 CID。

```java
String cid = "QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq";
byte[] content = caver.ipfs.get(cid);
```

### CID 和多哈希值之间的转换<a id="conversion-between-cid-and-multihash"></a>

您可以使用 `toHex()` 将 CID 转换为 [Multihash](https://multiformats.io/multihash/)。

CID 是 Base58 编码的多重哈希值。 toHex()\`解码 CID 并返回相应的多哈希值。

```java
String cid = "QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk";
String multihash = caver.ipfs.toHex(cid);
System.out.println(multihash);
```

上述代码的执行结果如下所示。

```java
0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47
```

要将多哈希值转换为 CID，请使用 `fromHex()`。

```java
String multihash = "0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47";
String cid = caver.ipfs.fromHex(multihash);
System.out.println(cid);
```

上述代码的执行结果如下所示。

```java
QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk
```

## 检测 KCT 接口<a id="detect kct interface"></a>

KCT（Kaia 兼容令牌）合约，如 [KIP-7]、[KIP-17] 和 [KIP-37] 定义并提供了各种接口，[KIP-13] 允许你通过向合约发送查询来查看合约是否符合 KCT 规范以及它实现了哪些接口。

[KIP-13] 已在 Caver v1.5.7 中实现。 它可以通过 "detectInterface() "检测任何 KCT 合约类（"KIP7"、"KIP17 "和 "KIP37"）的接口。

### 检测 KIP-7 接口<a id="detecting-kip-7-interfaces"></a>

要检测 KIP-7 接口，可以在`KIP7`类中使用`detectInterface()`。
它返回 KIP-7 接口标识符与是否支持该接口的布尔值之间的映射。

detectInterface()\` 支持静态方法和实例方法，因此您可以选择并使用适合您需要的方法。

通过 "detectInterface() "检测到的 "KIP7 "接口如下表所示。

| 界面            | KIP-13 识别器 |
| ------------- | ---------- |
| IKIP7         | 0x65787371 |
| IKIP7Metadata | 0xa219a025 |
| IKIP7Mintable | 0xeab83e20 |
| IKIP7Burnable | 0x3b5a0bf8 |
| IKIP7Pausable | 0x4d5507ff |

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

上述代码的执行结果如下所示。

```java
{
  "IKIP7Metatdata" : true,
  "IKIP7Burnable" : true,
  "IKIP7" : true,
  "IKIP7Pausable" : true,
  "IKIP7Mintable" : true
}
```

### 检测 KIP-17 接口<a id="detecting-kip-17-interfaces"></a>

要检测 KIP-17 令牌合约中实现的接口，可以使用`KIP17`类中的`detectInterface()`。
它返回 KIP-17 接口标识符与接口支持之间的映射。

detectInterface()\` 支持静态方法和实例方法，因此您可以选择并使用适合您需要的方法。

通过 `detectInterface()` 为 `KIP17` 检测的接口如下表所示。

| 界面                     | KIP-13 识别器 |
| ---------------------- | ---------- |
| IKIP17                 | 0x80ac58cd |
| IKIP17Metadata         | 0x5b5e139f |
| IKIP17Enumerable       | 0x780e9d63 |
| IKIP17Mintable         | 0xeab83e20 |
| IKIP17MetadataMintable | 0xfac27f46 |
| IKIP17Burnable         | 0x42966c68 |
| IKIP17Pausable         | 0x4d5507ff |

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

上述代码的执行结果如下所示。

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

### 检测 KIP-37 接口<a id="detecting-kip-37-interfaces"></a>

要检测 KIP-37 令牌合约中实现的接口，可以使用`KIP37`类中的`detectInterface()`。
它返回 KIP-37 接口标识符和接口支持之间的映射。

detectInterface()\` 支持静态和实例方法，因此可以选择并使用适当的方法。

通过 "detectInterface() "对 "KIP37 "进行的接口检测如下表所示。

| 界面             | KIP-13 识别器 |
| -------------- | ---------- |
| IKIP37         | 0x6433ca1f |
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

上述代码的执行结果如下所示。

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
[KIP-7]: https://kips.kaia.io/KIPs/kip-7
[KIP-13]: https://kips.kaia.io/KIPs/kip-13
[KIP-17]: https://kips.kaia.io/KIPs/kip-17
[KIP-37]: https://kips.kaia.io/KIPs/kip-37
