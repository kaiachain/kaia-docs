# 入門指南

## 新增功能

在 caver-java 1.5.0 中，我們採用了通用架構。 通用架構是 kaia 開發環境的新軟件架構，所有 kaia SDK（caver-js/caver-java）均可共享。 它專為簡化開發體驗而設計，易於擴展到其他編程語言。

隨著 caver-java 升級到 1.5.0，除了某些 API 之外，1.4.0 中使用的 API 將被棄用。

caver-java 1.5.0 中新提供的應用程序接口如下。

### caver.account

caver.account 是一個用於更新 Kaia 賬戶的賬戶密鑰（AccountKey）的軟件包，賬戶密鑰可以是一個或多個公鑰（AccountKeyPublic、AccountKeyWeightedMultiSig 和 AccountKeyRoleBased），也可以是一種特殊類型的密鑰（AccountKeyLegacy 和 AccountKeyFail）。

- 在 caver-java 1.4.0 中，`caver.account`取代了`caver.tx.account`。

### caver.wallet

caver.wallet 是一個管理內存錢包中 Keyring 實例的軟件包。 密鑰環是存儲 Kaia 賬戶地址及其私人密鑰的實例，該賬戶地址用於簽署交易。 caver.wallet 接受所有類型的 Keyring（單 Keyring、多 Keyring 和基於角色的 Keyring），並通過 kaia 賬戶地址進行管理。

- 在 caver-java 1.4.0 中，"caver.wallet "取代了 "caver.crypto"。
- 在 caver-java 1.4.0 中，"caver.wallet.KeyStore "取代了 "caver.wallet.WalletFile"。

### caver.transaction

caver.transaction是一個提供[Transaction]（.../../../learn/transactions/transactions.md#transactions-overview）相關功能的軟件包。

- 在 caver-java 1.4.0 中，"caver.transaction "取代了 "caver.tx

### caver.rpc

caver.rpc 是一個提供與 kaia Node 的 rpc 調用相關功能的軟件包。

- caver.rpc.klay "和 "caver.rpc.net "分別替換了 caver-java 1.4.0 中的 "Klay "和 "Net "接口

### caver.util

caver.utils 提供實用功能。

### caver.contract

caver.contract "是一個軟件包，它能讓你在 kaia 中輕鬆處理智能合約。 通過 caver.contract，您可以部署智能合約，並通過調用其函數來執行它們。 caver.contract "首先從ABI（Application Binary Interface）轉換智能合約函數和事件，調用這些函數，並獲取事件信息。

## 先決條件<a id="prerequisites"></a>

### 添加存儲庫<a id="adding-a-repository"></a>

在使用 IPFS 之前，應添加一個庫存儲庫。 請先添加以下存儲庫。

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

### 添加依賴項<a id="adding-a-dependency"></a>

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

如果要使用 Android 依賴關係，只需在版本字符串末尾添加 -android。 \例如 1.0.1-android\)

如果想查看 JSON-RPC 請求和響應的詳細信息，請在項目中加入 [LOGBack](https://logback.qos.ch/) 依賴關係。 下面是一個 Gradle 構建文件示例。 您也可以將依賴關係添加到 Maven 中。 由於 caver-java 使用 [SLF4J](http://www.slf4j.org/) 日誌界面，因此您可以切換到自己喜歡的日誌框架，而不是 LOGBack。

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**注意**：在中央資源庫中，RC、Android 和 Java 版本被列在一起。 如果使用通配符獲取版本，則可能使用了不適合自己平臺的版本。

#### 命令行工具<a id="command-line-tool"></a>

該命令行工具允許你從命令行生成 Solidity 智能合約函數包裝器。

**安裝 （Homebrew）**

安裝需要 Java 1.8 以上版本。

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

安裝完成後，您可以運行 "caver-java "命令，如下所示：

```text
$ caver-java solidity generate -b<smart-contract>.bin -a<smart-contract>.abi -o<outputPath> -p<packagePath>
```

**安裝 （其他）**

目前，我們不支持其他軟件包管理器。 作為另一種解決方案，我們在下文中提供了一種構建 CLI 的方法。

- 下載或 fork caver-java。

- 使用 Gradle 在控制檯模塊中執行任務 "shadowDistZip"。 結果會生成 `console/build/distributions/console-shadow-{version}.zip` 。

  ```text
  $ ./gradlew :console:shadowDistZip
  ```

- 解壓縮構建目錄中的壓縮文件

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

- 執行二進制文件，運行命令行工具，如下所示。 MacOS 用戶可以找到 shell 腳本文件，Window 用戶可以找到批處理文件。

  ```text
  $ ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```

## 發送 KAIA 一覽

本節介紹一個使用 "keystore 文件 "發送 KAIA 和價值轉移交易的簡單示例。 密鑰存儲文件可從 [Kaia Wallet](../../../build/tools/wallets/kaia-wallet.md) 導出。 如果您需要 KAIA 進行測試，可以從 [Kaia 水龍頭](https://faucet.kaia.io/) 獲取測試 KAIA。

:::note

開發時，最好使用與任何真實資金都不相關的賬戶。 好的方法是創建一個新的瀏覽器配置文件（在 Chrome、Brave、Firefox 等瀏覽器上），並在該瀏覽器上安裝 Kaia 錢包，而且永遠不要向該錢包匯款。

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

## 從 caver-java 開始<a id="starting-with-caver-java"></a>

### 連接 kaia 節點<a id="connecting-to-a-klaytn-node"></a>

如果運行的是 EN，可以通過更改主機和端口將其連接到自己的節點，如下所示：

```java
Caver caver = new Caver("http://your.en.url:8551/");
```

## 管理 Keyrings <a id="managing-keyrings"></a>

Keyring "是一個包含 kaia 賬戶地址和私人密鑰的結構。

根據所存儲密鑰的類型，"Keyring "可分為三種類型：單鑰環 "用於存儲一個地址和一個私人密鑰，"多鑰環 "用於存儲一個地址和多個私人密鑰，"基於角色的鑰環 "用於存儲一個地址和每個角色的一個或多個私人密鑰。

`SingleKeyring` 內部定義了 `key`  屬性，該 `key`  存儲一個私人密鑰。

`MultipleKeyring` 內部定義了 `keys` 屬性，該 `keys`以數組形式實現，用於存儲多個私鑰。

`RoleBasedKeyring` 中定義的 `keys` 屬性是以 List 對象的形式實現的，其元素是 3 個私鑰數組（空 `keys` 看起來像"[[], [], [] ]"），因此它可以包含每個 "角色 "的多個密鑰。 數組的第一個元素填入用於 `roleTransactionKey` 的私鑰，第二個元素填入用於 `roleAccountUpdateKey` 的私鑰，第三個元素填入用於 `roleFeePayerKey` 的私鑰。

### 創建 Keyring <a id="creating-a-keyring"></a>

#### 生成 SingleKeyring <a id="generating-a-singlekeyring"></a>

如下圖所示，您可以隨機生成一個 keyring。

```java
SingleKeyring keyring = caver.wallet.keyring.generate();
```

#### 從私人密鑰創建 SingleKeyring <a id="creating-a-singlekeyring-from-private-key"></a>

此外，如果你擁有特定的私人密鑰，還可以用它創建一個keyring，如下圖所示。

```java
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey(privateKey);
```

#### 使用私鑰和地址創建 SingleKeyring <a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

如果 kaia 賬戶的私鑰與地址不相關聯，則可以使用給定的地址和私鑰創建一個密鑰環，如下所示。

```java
String address = "0x{address in hex}";
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createWithSingleKey(address, privateKey);
```

此外，您還可以從 kaia 錢包密鑰派生 SingleKeyring 實例。

```java
String klaytnWalletKey = "0x{private key}0x{type}0x{address in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey);
```

#### 創建具有多個私人密鑰的 MultipleKeyring<a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

如果要使用多個私鑰，可以使用一個地址和多個私鑰創建一個 "MultipleKeyring"。 下面的示例展示瞭如何創建具有多個私鑰的 "多重鑰匙環"。

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{private key#3}"};
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(address, privateKeyArray);
```

#### 創建帶有私鑰的 RoleBasedKeyring <a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

要為每個 "角色 "使用不同的私鑰，需要使用 "caver.wallet.keyring.createWithRoleBasedKey"。 每個數組元素代表一個在 `RoleBasedKeyring` 中描述的角色。 下面的示例展示瞭如何根據每個角色的不同密鑰創建一個 `RoleBasedKeyring` 實例。

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

### 從 keystore json 字符串向 caver-java 添加 Keyrings。<a id="adding-keyrings-to-caver-java"></a>

您可以將 keyring 添加到 caver-java 提供的內存錢包中，從而更方便地使用 keyring。 以下示例說明了如何使用 [Kaia Wallet](https://wallet.klaytn.com/) 生成的密鑰存儲 JSON 文件字符串向 `caver.wallet` 添加密鑰。

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
解密密鑰 : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5

地址 ：0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5
```

從上面的輸出結果來看，將密鑰添加到 `caver.wallet` 後，就可以從 `caver.wallet` 中查詢密鑰。

如果您有需要使用的地址和私鑰，可以通過 caver.wallet.newKeyring 輕鬆創建一個密鑰環，並將其直接添加到 caver.wallet 中。

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

當使用私鑰執行 `caver.wallet.newKeyring` 時，一個帶有私鑰的 Keyring 實例就會創建並添加到 `caver.wallet` 中。 對於多個私鑰，會創建一個包含多個私鑰的 Keyring 實例並添加到 `caver.wallet`。 當傳遞包含每個角色的一個或多個私鑰的 2D 字符串數組作為元素時，就會創建一個包含每個角色的不同私鑰的 Keyring 實例，並將其添加到 `caver.wallet`。

`caver.wallet.add` 或 `caver.wallet.newKeyring` 返回一個添加到 `caver.wallet` 的 Keyring 實例。

## 發送交易<a id="sending-a-transaction"></a>

本節將向您介紹如何在 Kairos Testnet 上使用 caver-java 發送 KAIA。

### 通過 Kairos 龍頭獲取 KAIA<a id="getting-klay-via-kairos-faucet"></a>

如果您需要 KAIA 進行測試，可以從 [Kaia Wallet](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay) 獲取 Kairos testnet KAIA。 使用私鑰或密鑰存儲文件登錄 kaia 錢包，並通過龍頭接收 Kairos testnet KAIA 進行測試。

### 發送價值轉移交易<a id="sending-a-value-transfer-transaction"></a>

您可以使用 caver-java 錢包生成交易簽名。 您必須經過以下兩個步驟才能將交易發送到網絡。

1. 簽署交易
   - 如果要使用的密鑰已添加到 `caver.wallet`，則可以使用 `caver.wallet.sign`函數簽名。
   - 如果單獨管理鑰匙圈而不將其添加到 `caver.wallet` 中，則可以通過 `transaction.sign` 函數簽署交易。
2. 通過 `caver.rpc.klay.sendRawTransaction`，向 kaia 發送已簽名事務的 RLP 編碼字符串。

**注意：** 匯款人必須有足夠的 KAIA 數量進行轉賬並支付交易費用。

#### 簽署交易

在向 kaia 發送交易之前，您應該先簽署交易。

下面舉例說明如果在 `caver.wallet`中添加了密鑰，如何簽署交易。

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

上述代碼向 `caver.wallet` 添加了一個密鑰，創建了一個交易，並通過 `caver.wallet.sign` 簽署了該交易。

運行上述代碼會得到以下結果。 執行上述代碼後，事務的 RLP 編碼字符串如下所示。 (您得到的 RLP 編碼字符串輸出可能與下圖所示的字符串輸出不同）。

```bash
RLP 編碼字符串：0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### 向 kaia 發送已簽名交易的 RLP 編碼字符串

現在你可以像下面這樣向網絡發送已簽名的交易。 如果要運行下面的示例，請將 "rlpEncoding "替換為上述代碼中的 "rlpEncoded "值。

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

如果您想在不使用 `caver.wallet` 的情況下籤署交易並將其發送到網絡，請參閱下面的示例。

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

執行上述代碼時，交易哈希值（txHash）的打印結果如下所示。

```bash
交易哈希值 : 0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113
```

### 檢查收據<a id="checking-receipts"></a>

當您通過 `caver.rpc.klay.sendRawTransaction` 向 kaia 傳輸交易時，可以使用 `TransactionReceiptProcessor` 獲取交易收據。

下面的示例展示瞭如何使用 PollingTransactionReceiptProcessor 獲取收據。

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

如上例所述，您可以通過 TransactionReceiptProcessor 獲取發送事務的結果。 transactionHash "字段在收據對象中定義。

您可以使用帶有 `txHash` 字符串的 `caver.rpc.klay.getTransactionReceipt` RPC 調用，在交易包含在區塊中後隨時從網絡查詢交易的收據。 下面的示例展示瞭如何使用 `caver.rpc.klay.getTransactionReceipt` RPC 調用獲取收據。

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

交易結果可通過收據的 "狀態 "查詢。 有關返回值的詳細信息，請參閱 `caver.rpc.klay.getTransactionReceipt`。 如果交易失敗，可以在收據的 `txError` 中查看更多有關錯誤的信息。 有關 `txError` 的更多信息，請參閱 [txError: Detailed Information of Transaction Failures]（.../transaction-error-codes.md）。

## 執行其他交易類型<a id="executing-other-transaction-types"></a>

Kaia 提供各種事務類型，以提高可擴展性和性能。 更多信息，請參閱 [Transactions]（.../.../.../learn/transactions/transactions.md）。 本節將介紹一些可與 caver-java 配合使用的示例。

### 費用委託<a id="fee-delegation"></a>

Kaia 提供費用委託功能。 下面是一個製作 RLP 編碼交易的示例，當您是此類交易的發送方時：

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

執行上述代碼後，將打印 RLP 編碼字符串。 (您得到的 RLP 編碼字符串輸出可能與下圖所示的字符串輸出不同）。

```bash
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

在將 "feePayerSignatures"（付費者簽名）附加到由交易發送者簽名的 RLP 編碼字符串（"rawTransaction"（原始交易））之後，付費者就可以向 kaia 發送交易。 如果 `caver.wallet` 也有繳費人的密鑰，則可以通過調用 `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`，將繳費人的簽名注入到 `feeDelegatedTx` 中。 否則，費用支付方必須從發送方簽名的 RLP 編碼字符串中創建一個 "feeDelegatedTx"，並在其上添加費用支付方的簽名，如下圖所示。 如果要運行下面的示例，請將 `0x{RLP-encoded string}` 替換為上述 `rlpEncoded` 的值。

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

執行上述代碼後，包括寄件人簽名和繳費人簽名在內的 RLP 編碼字符串將打印如下。 (您得到的輸出結果可能與下面顯示的字符串輸出結果不同）。

```bash
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

現在，發送方和繳費方都對交易進行了簽名，並可通過網絡發送。 將 `0x{RLP-encoded string}` 替換為上述示例代碼輸出的 RLP 編碼字符串。

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

交易結果可通過收據的 "狀態 "查詢。 有關返回值的詳細信息，請參閱 `caver.rpc.klay.getTransactionReceipt`。 如果交易失敗，可以在收據的 `txError` 中查看更多有關錯誤的信息。 有關 `txError` 的更多信息，請參閱 [txError: Detailed Information of Transaction Failures]（.../transaction-error-codes.md）。

### 賬戶更新<a id="account-update"></a>

如果要更改 kaia 帳戶的私鑰，需要記住 3 件重要的事情：

1. Kaia 會驗證您發送給它的每一筆交易。
2. 驗證需要與您的私人密鑰完全對應的公鑰。
3. 因此，在將私鑰更改為新密鑰之前，必須先將舊公鑰更改為新密鑰。 新的公開密鑰必須來自新的私人密鑰。

牢記以上三點，你就可以按照以下步驟更改你的私人密鑰了：

1. 準備新私鑰，創建新 keyring。
2. 根據需要的類型（Single keyring, Multiple keyring, or Role-based keyring）創建鑰匙圈。
3. 從新 keyring 生成一個賬戶實例。 該賬戶實例持有 kaia 賬戶的新公鑰。
4. 向 kaia 發送包含賬戶實例的 AccountUpdate 事務。
5. 最後，將舊 keyring 替換為步驟 2 中創建的新 keyring。

詳情請查看 "賬戶更新"。

要更改 AccountKey，必須在 `caver.transaction.type.AccountUpdate` 的輸入參數對象中為 `account` 字段提供一個 `Account` 實例。 賬戶 "實例包含 kaia 賬戶的地址和要更新的賬戶密鑰。

下面的代碼是一個示例代碼，用於更改 kaia 帳戶使用的私鑰，並將 kaia 帳戶的 AccountKey 更改為 "AccountKeyPublic"。 別忘了準備新的私人密鑰。

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

如果上述代碼執行成功，你就不能再使用舊私鑰來簽署任何與舊鑰匙圈有關的交易。 因此，您必須通過 `caver.wallet.updateKeyring(newKeyring)` 使用`newKeyring`更新舊 keyring。 一旦更新，簽名將由新更新的私鑰完成。

下面介紹如何用多個 `AccountKeys` 更新 kaia 帳戶的 AccountKey？ 下面的示例解釋瞭如何創建一個帶有多個私鑰的 "賬戶 "實例（您可以通過 `caver.account.create`創建一個帶有多個公鑰的 "賬戶 "實例）。 同樣，在將創建的賬戶實例輸入事務對象內的 "賬戶 "字段後，其餘的更新過程與上例相同。

首先，讓我們創建一個賬戶實例，使用 `AccountKeyWeightedMultiSig` 進行更新。 對於 "AccountKeyWeightedMultiSig"，必須為每個密鑰定義閾值和權重。 為此，請使用 `caver.account.weightedMultiSigOptions`。 第一個參數是閾值，第二個參數是包含每個鍵權重的數組。

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

現在，讓我們使用 `AccountKeyRoleBased` 更新 AccountKey。 `AccountKeyRoleBased` 是一種 `AccountKey` 類型，用於定義每個 `role` 使用的密鑰。

```java
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {1,1,1});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

const account = newKeyring.toAccount()
```

上面的 AccountKeyRoleBased 就是為每個角色使用一個公鑰的例子。 從上面的代碼中可以看到，每個密鑰對應一個私人密鑰。 如果要為每個角色使用多個私鑰，則必須為每個角色定義`caver.account.weightedMultiSigOptions`，如下所示。

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

如果要將 AccountKey 更新為 "AccountKeyLegacy "或 "accountKeyFail"，請如下所示創建一個 Account 實例，並將其分配給事務的 "account "字段。 其餘更新過程與其他 AccountKey 相同。

```java
// Create an account with AccountKeyLegacy
Account account = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address);

// Create an account with AccountKeyFail
Account account = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### 智能合約<a id="smart-contract"></a>

caver.contract "軟件包中的 "Contract "類可輕鬆與 kaia 上的智能合約進行交互。 當給出智能合約的底層 ABI 時，該智能合約的所有功能都會自動轉換並存儲在 "合約 "實例中。 這樣，您就可以像處理 Java 中的 "合約 "實例一樣與智能合約交互。

下面我們通過編寫一個簡單的 solidity 示例代碼來開始講解如何用 Java 處理智能合約。 創建一個 "test.sol "文件，並寫下下面的示例。

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

然後，編譯該智能合約，獲取其字節碼和 ABI。

```text
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**注意**：要編譯智能合約，必須安裝 [solidity 編譯器](https://solidity.readthedocs.io/en/develop/installing-solidity.html)。 要編譯上述程序，需要安裝 solc:0.5.6。

要按類型部署智能合約，可以使用下面描述的 caver-java 類：

- 當智能合約交易的發送方或費用支付方支付費用時，"caver.contract "軟件包中的 "Contract "類將會被使用。
- 當智能合約交易的發送方支付費用時，"caver.transaction "包中的 "SmartContractDeploy "類就會出現
- 當智能合約交易的費用支付方支付費用時，"caver.transaction "包中的 "feeDelegatedSmartContractDeploy "類將被使用。
- 當智能合約交易的費用支付方支付費用時，"caver.transaction "包中的 "feeDelegatedSmartContractDeployWithRatio "類將被刪除。

下面是一個利用 `caver.contract` 包中的 `Contract` 類的示例。 你可以根據編譯智能合約後得到的字節碼和 ABI 創建一個類似下面的 `contract` 實例。

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

運行上面的代碼會得到以下結果。

```bash
function set(string,string)
function get(string)
ContractAddress : null
```

看一下上面的輸出，你就會發現 `contract` 實例擁有智能合約方法。 由於尚未部署，因此可以看到 `contract.getContractAddress()` 的結果輸出為空。

如果該合同已經部署，並且您知道部署該合同的合同地址，請將合同地址作為第三個參數傳遞給 `contract` 實例的構造函數，如下所示。

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

運行上面的代碼會得到以下結果。

```bash
function set(string,string)
function get(string)
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

合同 "實例在創建時會將其合同地址存儲為 "contractAddress "屬性。 可以通過 getter / setter 函數（"getContractAddress()"/"setContractAddress()"）訪問地址。

一旦創建了 "合約 "實例，就可以通過傳遞其字節碼和構造函數參數（在需要部署時）來部署智能合約，如下圖所示。

請注意，"合同 "實例的 "deploy() "方法會發送用於合同部署和合同執行的事務。 在發送交易時，它會使用 `caver.wallet` 中的 Keyrings 進行簽名。 要使用的密鑰必須在簽名前添加到 `caver.wallet` 中。

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

在上面的代碼中，"deployer "會將合約部署到 kaia，並返回已部署的 "contract "實例。

```bash
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

根據部署交易的合約類型，可以使用以下類別之一來部署智能合約：

- 當智能合約交易的發送方或費用支付方支付費用時，"caver.contract "軟件包中的 "Contract "類將會被使用。
- 當智能合約交易的發送方支付費用時，"caver.transaction "包中的 "SmartContractDeploy "類就會出現
- 當智能合約交易的費用支付方支付費用時，"caver.transaction "包中的 "feeDelegatedSmartContractDeploy "類將被使用。
- 當智能合約交易的費用支付方支付費用時，"caver.transaction "包中的 "feeDelegatedSmartContractDeployWithRatio "類將被刪除。

要通過費用委託交易部署智能合約，請在 "SendOptions "類中定義 "feeDelegation "和 "feePayer "字段，如下所示。

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

如果您想在通過 `caver.contract` 部署智能合約時發送發送方和支付方分別簽名的交易，請參考下面的代碼。

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

要按類型執行智能合約的功能，可以使用下面描述的 caver-java 類：

- 當智能合約交易的發送方支付費用時，"caver.contract "軟件包中的 "Contract "類將被刪除。
- 當智能合約交易的發送方支付費用時，"caver.transaction "軟件包中的 "SmartContractExecution "類將被刪除。
- 當智能合約交易的費用支付方支付費用時，"caver.transaction "包中的 "FeeDelegatedSmartContractExecution "類將被使用。
- 當智能合約交易的費用支付方支付費用時，"caver.transaction "包中的 "FeeDelegatedSmartContractExecutionWithRatio "類將被使用。

為了展示如何在智能合約中執行函數，我們在這裡發送一個合約執行事務，將字符串 "testValue "作為下面示例代碼中合約函數 "set "的輸入參數。

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

要通過費用委託交易執行智能合約的功能，請在 "SendOptions "類中定義 "feeDelegation "和 "feePayer "字段，如下所示。

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

如果您想在通過 `caver.contract` 執行智能合約時發送一個發送方和支付方分別簽名的交易，請參考下面的代碼：

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

加載一個 "合約 "實例並調用其中的一個函數（不發送事務，只是調用）：下面的示例顯示了在合約中調用一個 "get "函數。

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

執行上述代碼後，輸出值如下所示。

```bash
測試值
```

如需瞭解更多信息，請參閱 [caver-java API] 。

## IPFS<a id="ipfs"></a>

IPFS（專有文件系統）是一種分佈式文件系統，用於存儲和訪問文件、網站、應用程序和數據。

您可以使用 Caver 通過 IPFS 上傳和下載文件。

### 連接 IPFS<a id="connecting-with-ipfs"></a>

caver.ipfs "包中的 "IPFS "類被定義為 "Caver "中的一個類成員變量，因此你可以通過 "Caver "與 IPFS 交互。

要通過 "Caver "實例使用 "IPFS "實例，必須先調用方法 "setIPFSNode() "連接到 IPFS 節點。

函數 `setIPFSNode()` 需要以下參數：

- IPFS HTTP API 主機 URL
- IPFS HTTP API 主機端口號
- 主機是否使用 SSL。

```java
String host = "The URL of an IPFS node";
int port = 5001; // API host port number
boolean isSSL = true; // API host support ssl 
Caver caver = new Caver();
caver.ipfs.setIPFSNode(host, port, isSSL);
```

### 通過 IPFS 上傳文件<a id="uploading-a-file-through-ipfs"></a>

要通過 `IPFS` 上傳文件，請像下面一樣使用 `add()`。

該函數返回上傳文件的 [CID（內容標識符）](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。

```java
String filePath = "/path/to/file";
String cid = caver.ipfs.add(filePath);
System.out.println(cid);
```

上述代碼的執行結果如下所示。

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

同樣，您也可以上傳字節數組。

```java
String text = "sample data";
byte[] data = text.getBytes();

String cid = caver.ipfs.add(data);
System.out.println(cid);
```

上述代碼的執行結果如下所示。

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

### 從 IPFS 下載文件<a id="downloading-a-file-from-ipfs"></a>

要從 `IPFS` 下載文件，請像下面一樣使用 `get()`。

此功能需要下載文件的 CID。

```java
String cid = "QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq";
byte[] content = caver.ipfs.get(cid);
```

### CID 和多哈希值之間的轉換<a id="conversion-between-cid-and-multihash"></a>

您可以使用 `toHex()` 將 CID 轉換為 [Multihash](https://multiformats.io/multihash/)。

CID 是 Base58 編碼的多重哈希值。 toHex()\`解碼 CID 並返回相應的多哈希值。

```java
String cid = "QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk";
String multihash = caver.ipfs.toHex(cid);
System.out.println(multihash);
```

上述代碼的執行結果如下所示。

```java
0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47
```

要將多哈希值轉換為 CID，請使用 `fromHex()`。

```java
String multihash = "0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47";
String cid = caver.ipfs.fromHex(multihash);
System.out.println(cid);
```

上述代碼的執行結果如下所示。

```java
QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk
```

## 檢測 KCT 接口<a id="detect kct interface"></a>

KCT（Kaia 兼容令牌）合約，如 [KIP-7]、[KIP-17] 和 [KIP-37] 定義並提供了各種接口，[KIP-13] 允許你通過向合約發送查詢來查看合約是否符合 KCT 規範以及它實現了哪些接口。

[KIP-13] 已在 Caver v1.5.7 中實現。 它可以通過 "detectInterface() "檢測任何 KCT 合約類（"KIP7"、"KIP17 "和 "KIP37"）的接口。

### 檢測 KIP-7 接口<a id="detecting-kip-7-interfaces"></a>

要檢測 KIP-7 接口，可以在`KIP7`類中使用`detectInterface()`。
它返回 KIP-7 接口標識符與是否支持該接口的布爾值之間的映射。

detectInterface()\` 支持靜態方法和實例方法，因此您可以選擇並使用適合您需要的方法。

通過 "detectInterface() "檢測到的 "KIP7 "接口如下表所示。

| 界面            | KIP-13 識別器 |
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

上述代碼的執行結果如下所示。

```java
{
  "IKIP7Metatdata" : true,
  "IKIP7Burnable" : true,
  "IKIP7" : true,
  "IKIP7Pausable" : true,
  "IKIP7Mintable" : true
}
```

### 檢測 KIP-17 接口<a id="detecting-kip-17-interfaces"></a>

要檢測 KIP-17 令牌合約中實現的接口，可以使用`KIP17`類中的`detectInterface()`。
它返回 KIP-17 接口標識符與接口支持之間的映射。

detectInterface()\` 支持靜態方法和實例方法，因此您可以選擇並使用適合您需要的方法。

通過 `detectInterface()` 為 `KIP17` 檢測的接口如下表所示。

| 界面                     | KIP-13 識別器 |
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

上述代碼的執行結果如下所示。

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

### 檢測 KIP-37 接口<a id="detecting-kip-37-interfaces"></a>

要檢測 KIP-37 令牌合約中實現的接口，可以使用`KIP37`類中的`detectInterface()`。
它返回 KIP-37 接口標識符和接口支持之間的映射。

detectInterface()\` 支持靜態和實例方法，因此可以選擇並使用適當的方法。

通過 "detectInterface() "對 "KIP37 "進行的接口檢測如下表所示。

| 界面             | KIP-13 識別器 |
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

上述代碼的執行結果如下所示。

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
