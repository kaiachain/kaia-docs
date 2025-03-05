# はじめに

## 何が新しいのか？

caver-java 1.5.0では、Common Architectureを採用している。 共通アーキテクチャはkaia開発環境のための新しいソフトウェアアーキテクチャで、すべてのkaia SDK（caver-js/caver-java）で共有されます。 合理的な開発体験と、他のプログラミング言語への拡張のしやすさを考慮して設計されています。

caver-javaが1.5.0に更新されたため、1.4.0で使用されていたAPIは、一部のAPIを除いて廃止されました。

caver-java 1.5.0で新たに提供されたAPIは以下の通り。

### ケイバーアカウント

caver.accountは、kaiaアカウントのAccountKeyを更新するためのパッケージである。AccountKeyは、1つ以上の公開鍵(AccountKeyPublic、AccountKeyWeightedMultiSig、AccountKeyRoleBased)、または特殊な鍵(AccountKeyLegacy、AccountKeyFail)である。

- caver-java 1.4.0では、`caver.account`は`caver.tx.account`を置き換える。

### ケイバーウォレット

caver.walletは、インメモリ・ウォレットでKeyringインスタンスを管理するパッケージです。 キーリングは、カイアカウントのアドレスとその秘密鍵を格納するインスタンスで、このアカウントのアドレスがトランザクションに署名するときに使用されます。 caver.walletはすべてのタイプのキーリング（SingleKeyring、MultipleKeyring、RoleBasedKeyring）を受け入れ、kaiaアカウントアドレスで管理します。

- caver-java 1.4.0 で `caver.wallet` が `caver.crypto` を置き換えた。
- caver-java 1.4.0 で `caver.wallet.WalletFile` が `caver.wallet.KeyStore` に置き換わった。

### ケイバー・トランザクション

caver.transaction is a package that provides functionality related to [Transaction](../../../build/transactions/transactions.md#transactions-overview).

- caver-java 1.4.0 では `caver.transaction` が `caver.tx` を置き換える。

### ケイバー

caver.rpcは、kaia Nodeとのrpcコールに関連する機能を提供するパッケージです。

- `caver.rpc.klay`と`caver.rpc.net`は、それぞれcaver-java 1.4.0の`Klay`と`Net`インタフェースを置き換える。

### ケイバーユーティリティ

caver.utilsはユーティリティ関数を提供します。

### ケイバー契約

`caver.contract`はkaiaでスマートコントラクトを簡単に扱えるようにするパッケージである。 caver.contractを使えば、スマート・コントラクトをデプロイし、その関数を呼び出して実行することができる。 `caver.contract` first converts smart contract functions and events from ABI(Application Binary Interface), calls those functions, and obtains the event information.

## 前提条件<a id="prerequisites"></a>

### リポジトリの追加<a id="adding-a-repository"></a>

IPFSを使用する前に、ライブラリ・リポジトリを追加する必要があります。 まず、以下のリポジトリを追加してください。

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

### 依存関係の追加<a id="adding-a-dependency"></a>

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

アンドロイド依存性を使用したい場合は、バージョン文字列の最後に-androidを追加するだけでよい。 (e.g. 1.0.1-android)

JSON-RPCのリクエストとレスポンスの詳細を見たい場合は、プロジェクトに[LOGBack](https://logback.qos.ch/)依存を含めてください。 以下はGradleビルドファイルの例です。 Mavenにも依存関係を追加できる。 caver-javaは[SLF4J](http://www.slf4j.org/)ロギングファサードを使用しているので、LOGBackの代わりにお好みのロギングフレームワークに切り替えることができます。

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**注**：中央リポジトリでは、RC版、Android版、Java版が一緒に表示されています。 ワイルドカードを使ってバージョンを取得した場合、あなたのプラットフォームに適切でないバージョンを使っている可能性があります。

#### コマンドラインツール<a id="command-line-tool"></a>

コマンドラインツールを使用すると、コマンドラインからSolidityスマートコントラクト関数のラッパーを生成できます。

**Installation (Homebrew)**

インストールにはJava 1.8+が必要です。

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

インストールが終わったら、以下のようにコマンド 'caver-java' を実行する：

```text
caver-java solidity generate -b<smart-contract>.bin -a<smart-contract>.abi -o<outputPath> -p<packagePath>
```

**Installation (Other)**

現在のところ、他のパッケージマネージャーはサポートしていません。 もうひとつの解決策として、CLIを構築する方法を以下に示す。

- caver-javaをダウンロードまたはフォークする。

- Gradleを使って、コンソールモジュールでタスク 'shadowDistZip' を実行する。 その結果、`console/build/distributions/console-shadow-{version}.zip` が生成される。

  ```text
  ./gradlew :console:shadowDistZip
  ```

- ビルド・ディレクトリのzipファイルを解凍する。

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

- バイナリファイルを実行すると、以下のようにコマンドラインツールが実行される。 macOSユーザーにはシェルスクリプトファイルが、Windowユーザーにはバッチファイルが用意されている。

  ```text
  ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```

## KAIAを送る

このセクションでは、バリュー転送トランザクションでKAIAを送信するために`キーストア ファイル`を使用する簡単な例について説明する。 キーストアファイルは[Kaia Wallet](../../../build/tools/wallets/kaia-wallet.md)からエクスポートできます。 テスト用のKAIAが必要な場合は、[Kaia Faucet](https://faucet.kaia.io/)からテスト用のKAIAを入手できる。

:::note

開発する際には、実際の資金とは関係のないアカウントを使うのがベストプラクティスだ。 これを行う良い方法は、新しいブラウザプロファイル（Chrome、Brave、Firefoxなど）を作成し、そのブラウザにカイアウォレットをインストールし、このウォレットにお金を送らないことです。

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

## caver-javaで始める<a id="starting-with-caver-java"></a>

### kaiaノードへの接続<a id="connecting-to-a-klaytn-node"></a>

ENを使用している場合は、以下のようにホストとポートを変更することで、自分のノードに接続することができます：

```java
Caver caver = new Caver("http://your.en.url:8551/");
```

## キーホルダーの管理<a id="managing-keyrings"></a>

`Keyring`はkaiaアカウントのアドレスと秘密鍵を含む構造体である。

`Keyring`は、保存する鍵の種類によって3つのタイプに分類できる：1つのアドレスと1つの秘密鍵を保存する `SingleKeyring`、1つのアドレスと複数の秘密鍵を保存する `MultipleKeyring`、1つのアドレスとロールごとに1つ以上の秘密鍵を保存する `RoleBasedKeyring` である。

`SingleKeyring`は内部に`key`プロパティを定義し、この`key`に秘密鍵を1つ格納する。

`MultipleKeyring`は内部で `keys` プロパティを定義しており、この `keys` は複数の秘密鍵を格納する配列として実装されている。

`RoleBasedKeyring` で定義されている `keys` プロパティは、秘密鍵の3つの配列を要素とするリストオブジェクトとして実装されている (空の `keys` は `[ [], [], [] ]` のようになる)。 配列の最初の要素には `roleTransactionKey` に使用する秘密鍵、2 番目の要素には `roleAccountUpdateKey` に使用する秘密鍵、3 番目の要素には `roleFeePayerKey` に使用する秘密鍵が格納される。

### キーホルダーの作成<a id="creating-a-keyring"></a>

#### シングルキーリングの生成<a id="generating-a-singlekeyring"></a>

以下のように、1つのキーホルダーをランダムに生成することができます。

```java
SingleKeyring keyring = caver.wallet.keyring.generate();
```

#### 秘密鍵からSingleKeyringを作成する<a id="creating-a-singlekeyring-from-private-key"></a>

また、特定の秘密鍵を所有している場合は、以下のようにキーホルダーを作成するために使用することができます。

```java
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey(privateKey);
```

#### 秘密鍵とアドレスを持つSingleKeyringの作成<a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

kaiaアカウントの秘密鍵がアドレスから切り離されている場合、以下のように指定されたアドレスと指定された秘密鍵を使ってキーリングを作成することができます。

```java
String address = "0x{address in hex}";
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createWithSingleKey(address, privateKey);
```

また、KaiaウォレットキーからSingleKeyringインスタンスを派生させることもできます。

```java
String klaytnWalletKey = "0x{private key}0x{type}0x{address in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey);
```

#### 複数の秘密鍵を持つMultipleKeyringの作成<a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

複数の秘密鍵を使用したい場合は、アドレスと複数の秘密鍵を使用して `MultipleKeyring` を作成することができる。 以下の例は、複数の秘密鍵を持つ `MultipleKeyring` を作成する方法を示している。

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{private key#3}"};
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(address, privateKeyArray);
```

#### 秘密鍵によるRoleBasedKeyringの作成<a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

`role`ごとに異なる秘密鍵を使用するには、`caver.wallet.keyring.createWithRoleBasedKey`を使用する。 配列の各要素は `RoleBasedKeyring` に記述されたロールを表す。 以下の例では、ロールごとに異なるキーから `RoleBasedKeyring` インスタンスを作成する方法を示している。

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

### キーストアのjson文字列からcaver-javaにキーリングを追加する。<a id="adding-keyrings-to-caver-java"></a>

caver-javaが提供するインメモリ・ウォレットにキーリングを追加することで、より簡単にキーリングを使用することができる。 以下の例では、[Kaia Wallet](https://wallet.klaytn.com/) によって生成されたキーストアJSONファイル文字列を使用して、`caver.wallet` にキーリングを追加する方法を説明します。

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

address ：0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5
```

上の出力を見ると、`caver.wallet`にキーリングを追加した後、`caver.wallet`からキーリングを問い合わせることができる。

使用するアドレスと秘密鍵があれば、簡単にキーリングを作成し、caver.wallet.newKeyringでcaver.walletに直接追加することができます。

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

秘密鍵を指定して `caver.wallet.newKeyring` を実行すると、秘密鍵を1つ持つKeyringインスタンスが作成され、`caver.wallet` に追加される。 複数の秘密鍵を使用する場合は、複数の秘密鍵を持つKeyringインスタンスを作成し、`caver.wallet`に追加します。 要素に各ロールの秘密鍵を1つ以上含む2D文字列配列を渡すと、ロールごとに異なる秘密鍵を含むKeyringインスタンスが作成され、`caver.wallet`にも追加されます。

`caver.wallet.add`または `caver.wallet.newKeyring`は、`caver.wallet`にKeyringを追加した後に、Keyringのインスタンスを返します。

## トランザクションの送信<a id="sending-a-transaction"></a>

このセクションでは、Kairos Testnetでcaver-javaを使ってKAIAを送信する方法を紹介します。

### カイロス水栓でKAIAを入手する<a id="getting-klay-via-kairos-faucet"></a>

If you need KAIA for testing, you can get Kairos testnet KAIA from the [Kaia Faucet](../../../build/get-started/getting-kaia.md#kairos-testnet-and-faucet).

### バリュー・トランスファー・トランザクションの送信<a id="sending-a-value-transfer-transaction"></a>

caver-javaウォレットを使用して、取引の署名を生成することができます。 トランザクションをネットワークに送信するには、以下の2つのステップを踏む必要がある。

1. 取引に署名する
  - 使いたいキーリングが `caver.wallet` に追加されていれば、`caver.wallet.sign` 関数を使って署名することができる。
  - キーリングを `caver.wallet` に追加せずに別途管理する場合は、`transaction.sign` 関数を使用してトランザクションに署名することができる。
2. `caver.rpc.klay.sendRawTransaction`を介して、署名されたトランザクションのRLPエンコード文字列をkaiaに送信する。

**注意：** 送金者は、送金されるKAIAの十分な数と取引手数料を支払う必要があります。

#### 取引に署名する

kaiaにトランザクションを送信する前に、まずトランザクションに署名してください。

以下は、`caver.wallet`にキーホルダーを追加した場合のトランザクションの署名方法の例である。

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

上記のコードでは、`caver.wallet` にキーホルダーを追加し、トランザクションを作成し、`caver.wallet.sign` でトランザクションに署名している。

上記のコードを実行すると、次のような結果が得られる。 上記のコードが実行されると、トランザクションのRLPエンコード文字列は以下のようになる。 (あなたが得たRLPエンコードされた文字列出力は、以下に示す文字列出力とは異なる可能性がある)

```bash
RLP エンコード文字列：0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### 署名されたトランザクションのRLPエンコード文字列をkaiaに送信する。

これで、以下のように署名されたトランザクションをネットワークに送信できる。 以下の例を実行したい場合は、上記のコードの「rlpEncoding」を「`rlpEncoded`」の値に置き換えてください。

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

`caver.wallet`を使わずにトランザクションに署名してネットワークに送信したい場合は、以下の例を参照してください。

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

上記のコードが実行されると、トランザクションハッシュ（txHash）が以下の例のように出力される。

```bash
トランザクションハッシュ : 0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113
```

### 領収書のチェック<a id="checking-receipts"></a>

`caver.rpc.klay.sendRawTransaction`でトランザクションをkaiaに転送する際に、`TransactionReceiptProcessor`を使ってトランザクションのレシートを取得することができる。

次の例は、PollingTransactionReceiptProcessor を使用してレシートを取得する方法を示しています。

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

上記の例で説明したように、TransactionReceiptProcessorを通してトランザクションの送信結果を得ることができる。 `transactionHash`フィールドはレシートオブジェクトの内部で定義される。

caver.rpc.klay.getTransactionReceipt`RPCコールに `txHash` 文字列を指定すると、トランザクションがブロックに含まれた後、 ネットワークからいつでもトランザクションの受信を問い合わせることができる。 以下の例では、`caver.rpc.klay.getTransactionReceipt\` RPC コールを使用してレシートを取得する方法を示している。

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

トランザクションの結果は、レシートの `status` から確認することができる。 戻り値の詳細については `caver.rpc.klay.getTransactionReceipt` を参照のこと。 トランザクションが失敗した場合、レシートの `txError` でエラーの詳細を確認することができる。 For more information about `txError`, see [txError: Detailed Information of Transaction Failures](../../transaction-error-codes.md).

## 他のトランザクション・タイプの実行<a id="executing-other-transaction-types"></a>

カイアは、拡張性とパフォーマンスのために様々なトランザクションタイプを提供する。 For more information, see [Transactions](../../../build/transactions/transactions.md). このセクションでは、caver-javaで使用できるいくつかの例について説明する。

### 手数料の委任<a id="fee-delegation"></a>

カイアはフィー委任機能を提供している。 以下は、あなたがこの種のトランザクションの送信者である場合に、RLPエンコードされたトランザクションを行う例である：

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

上記のコードが実行されると、RLPエンコードされた文字列がプリントされる。 (あなたが得たRLPエンコードされた文字列出力は、以下に示す文字列出力とは異なる可能性がある)

```bash
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

料金支払者は、トランザクション送信者によって署名されたRLPエンコード文字列(`rawTransaction`)に`feePayerSignatures`を付加した後、kaiaにトランザクションを送信することができる。 `caver.wallet`が料金支払者のキーリングも持っている場合、`caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`を呼び出すことで、料金支払者の署名を `feeDelegatedTx`に注入することができる。 そうでない場合、料金支払者は、下図のように、送信者によって署名されたRLPエンコー ディング文字列から`feeDelegatedTx`を作成し、料金支払者の署名を追加しなければならない。 以下の例を実行したい場合は、`0x{RLP-encoded string}` を上記の `rlpEncoded` の値に置き換えてください。

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

上記のコードが実行されると、送金者の署名と料金支払者の署名を含むRLPエンコードされた文字列が以下のように印刷される。 (あなたが得た出力は、以下に示す文字列出力とは異なる可能性がある）。

```bash
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

これで取引は、送金者と手数料支払者の双方によって署名され、ネットワーク上で送信できるようになった。 `0x{RLP-encoded string}` を、上記のサンプルコードで出力されたRLPエンコードされた文字列に置き換える。

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

トランザクションの結果は、レシートの `status` から確認することができる。 戻り値の詳細については `caver.rpc.klay.getTransactionReceipt` を参照のこと。 トランザクションが失敗した場合、レシートの `txError` でエラーの詳細を確認することができる。 For more information about `txError`, see [txError: Detailed Information of Transaction Failures](../../transaction-error-codes.md).

### アカウント更新<a id="account-update"></a>

kaiaアカウントの秘密鍵を変更したい場合、3つの重要なことを覚えておく必要があります：

1. カイアは、あなたが送信するすべてのトランザクションを検証します。
2. 検証には、秘密鍵と正確に対応する公開鍵が必要です。
3. したがって、秘密鍵を新しいものに変更するには、古い公開鍵を新しいものに変更することが **常に**先行\*\*する。 新しい公開鍵は、新しい秘密鍵から派生したものでなければならない。

上記の3つを念頭に置き、以下の手順で秘密鍵を変更することができます：

1. 新しい秘密鍵を用意し、新しいキーリングを作成する。
2. 必要なタイプ（単一キーリング、複数キーリング、役割ベースのキーリング）を指定してキーリングを作成します。
3. 新しいキーリングからアカウントインスタンスを生成する。 このアカウントインスタンスは、あなたのkaiaアカウントの新しい公開鍵を保持します。
4. Accountインスタンスを含むAccountUpdateトランザクションをkaiaに送信する。
5. 最後に、古いキーホルダーをステップ2で作成した新しいキーホルダーに付け替えます。

詳細は`Account Update`をご確認ください。

AccountKey を変更するには、`caver.transaction.type.AccountUpdate` の入力引数オブジェクトの `account` フィールドに `Account` インスタンスを指定する必要がある。 `Account`インスタンスには、kaiaアカウントのアドレスと更新するAccountKeyが格納される。

以下のコードは、kaia アカウントの AccountKey を `AccountKeyPublic` に変更するとともに、kaia アカウントで使用する秘密鍵を変更するサンプルコードです。 新しい秘密鍵の準備もお忘れなく。

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

上記のコードが正常に実行されると、古い秘密鍵を使って古い鍵リングを使ったトランザクションに署名することはできなくなる。 そのため、`caver.wallet.updateKeyring(newKeyring)` を使って、古いキーリングを `newKeyring` で更新する必要がある。 秘密鍵が更新されると、新たに更新された秘密鍵によって署名が行われる。

複数の`AccountKey`を持つkaiaアカウントのAccountKeyを更新する方法は？ 以下の例では、使用したい複数の秘密鍵を持つ `Account` インスタンスを作成する方法を説明する（複数の公開鍵を持つ `Account` インスタンスは `caver.account.create` で作成できる）。 繰り返しになるが、トランザクションオブジェクト内の`account`フィールドに作成されたアカウントインスタンスを投入した後、残りの更新処理は上記の例と同じである。

まず、`AccountKeyWeightedMultiSig`で更新するAccountインスタンスを作成しよう。 `AccountKeyWeightedMultiSig`の場合、各キーの閾値と重みを定義しなければならない。 これを行うには、`caver.account.weightedMultiSigOptions`を使用する。 最初のパラメータは閾値で、2番目のパラメータは各キーの重みを含む配列である。

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

では、`AccountKeyRoleBased`を使ってAccountKeyを更新してみよう。 `AccountKeyRoleBased` は `AccountKey` 型で、各 `role` に対して使用するキーを定義する。

```java
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {1,1,1});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

const account = newKeyring.toAccount()
```

上記のAccountKeyRoleBasedは、ロールごとに1つの公開鍵を使用する例である。 上のコードからわかるように、それぞれが1つの秘密鍵に対応している。 役割ごとに複数の秘密鍵を使用する場合は、以下のように役割ごとに `caver.account.weightedMultiSigOptions` を定義する必要がある。

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

AccountKey を `AccountKeyLegacy` または `accountKeyFail` に更新したい場合は、以下のように Account インスタンスを作成し、それをトランザクションの `account` フィールドに代入する。 残りの更新プロセスは、他のAccountKeyと同じである。

```java
// Create an account with AccountKeyLegacy
Account account = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address);

// Create an account with AccountKeyFail
Account account = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### スマート契約<a id="smart-contract"></a>

`caver.contract`パッケージの`Contract`クラスは、kaia上のスマートコントラクトとのやり取りを簡単にする。 スマートコントラクトのすべての関数は、低レベルABIが指定されると自動的に変換され、`contract`インスタンスに格納される。 これにより、Javaで`contract`インスタンスを扱うように、スマート・コントラクトと対話することができる。

以下に簡単なsolidityのサンプルコードを書くことで、Javaでスマート・コントラクトを扱う説明を始める。 test.sol'ファイルを作成し、以下の例を書いてください。

```
pragma solidity ^0.5.6;

contract KVstore {
    mapping(string=>string) store;
    function get(string memory key) public view returns (string memory) {
        return store[key];
    }
    function set(string memory key, string memory value) public {
        store[key] = value;
    }.
}
```

次に、このスマート・コントラクトをコンパイルして、バイトコードとABIを取得する。

```text
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**注**：スマートコントラクトをコンパイルするには、[solidityコンパイラ](https://solidity.readthedocs.io/en/develop/installing-solidity.html)がインストールされている必要があります。 上記のプログラムをコンパイルするには、solc:0.5.6をインストールする必要がある。

スマート・コントラクトをタイプ別にデプロイするには、以下のcaver-javaクラスを使用する：

- スマートコントラクトのトランザクションの送信者または手数料の支払者が手数料を支払うときに、`caver.contract` パッケージの `Contract` クラスを使用する。
- スマートコントラクトのトランザクションの送信者が手数料を支払うときに、`caver.transaction` パッケージの `SmartContractDeploy` クラスを使用する。
- スマートコントラクトトランザクションの手数料支払者が手数料を支払うときに、`caver.transaction` パッケージの `feeDelegatedSmartContractDeploy` クラスを使用する。
- スマートコントラクトの手数料支払者が手数料を支払うとき、`caver.transaction` パッケージの `feeDelegatedSmartContractDeployWithRatio` クラスを使用する。

以下は、`caver.contract` パッケージの `Contract` クラスを悪用した例である。 スマート・コントラクトをコンパイルした後に得られるバイトコードとABIから、以下のような`contract`インスタンスを作成できる。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
function set(string,string)
function get(string)
ContractAddress : null
```

上の出力を見ると、`contract`インスタンスがスマート・コントラクト・メソッドを所有していることがわかる。 そして、まだデプロイされていないので、`contract.getContractAddress()`の結果がnullとして出力されているのがわかる。

このコントラクトがすでにデプロイされていて、このコントラクトがデプロイされたコントラクトアドレスを知っている場合は、以下のように `contract` インスタンスのコンストラクタの 3 番目のパラメータとしてコントラクトアドレスを渡す。

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

上記のコードを実行すると、次のような結果が得られる。

```bash
function set(string,string)
function get(string)
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

`contract`のインスタンスは、生成時に `contractAddress` プロパティとして契約書アドレスを格納する。 アドレスはゲッター/セッター関数（`getContractAddress()` / `setContractAddress()`）でアクセスできる。

いったん `contract` インスタンスが作成されると、以下の例のように、そのバイトコードとコンストラクタの引数（デプロイに必要な場合）を渡すことで、スマート・コントラクトをデプロイできる。

コントラクトインスタンス `contract` の `deploy()` メソッドは、コントラクトのデプロイとコントラクトの実行のためのトランザクショ ンを送信することに注意すること。 トランザクションの送信には、`caver.wallet`内のKeyringsを使って署名する。 使用するキーホルダーは、署名する前に `caver.wallet` に追加しておく必要がある。

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

上のコードでは、`deployer` がコントラクトを kaia にデプロイし、デプロイされた `contract` インスタンスを返す。

```bash
契約アドレス : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

スマート・コントラクトは、トランザクションをデプロイするコントラクトのタイプに応じて、以下のクラスのいずれかを使ってデプロイできる：

- スマートコントラクトのトランザクションの送信者または手数料の支払者が手数料を支払うときに、`caver.contract` パッケージの `Contract` クラスを使用する。
- スマートコントラクトのトランザクションの送信者が手数料を支払うときに、`caver.transaction` パッケージの `SmartContractDeploy` クラスを使用する。
- スマートコントラクトトランザクションの手数料支払者が手数料を支払うときに、`caver.transaction` パッケージの `feeDelegatedSmartContractDeploy` クラスを使用する。
- スマートコントラクトの手数料支払者が手数料を支払うとき、`caver.transaction` パッケージの `feeDelegatedSmartContractDeployWithRatio` クラスを使用する。

手数料を委任したトランザクションでスマートコントラクトをデプロイするには、`SendOptions` クラスの `feeDelegation` フィールドと `feePayer` フィールドを以下の例のように定義する。

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

`caver.contract`を通じてスマートコントラクトをデプロイする際に、送信者とfeePayerが別々に署名されたトランザクションを送信したい場合は、以下のコードを参照のこと。

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

スマート・コントラクトの機能をタイプ別に実行するには、以下のcaver-javaクラスを使用する：

- `caver.contract`パッケージの `Contract` クラスは、スマート・コントラクト・トランザクションの送信者が手数料を支払うときに使用する。
- `caver.transaction`パッケージの `SmartContractExecution` クラスは、スマートコントラクトの送信者が手数料を支払うときに使用する。
- スマートコントラクトトランザクションの手数料支払者が手数料を支払うときに、`caver.transaction` パッケージの `FeeDelegatedSmartContractExecution` クラスを使用する。
- スマートコントラクトの手数料支払者が手数料を支払うときに、`caver.transaction` パッケージの `FeeDelegatedSmartContractExecutionWithRatio` クラスを使用する。

スマートコントラクトで関数を実行する方法を示すために、以下のコード例で、コントラクト関数 `set` の入力パラメータとして文字列 "testValue" を置くコントラクト実行トランザクションを送信する。

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

スマートコントラクトの機能を手数料委任トランザクションで実行するには、以下の例のように `SendOptions` クラスで `feeDelegation` フィールドと `feePayer` フィールドを定義する。

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

`caver.contract`でスマートコントラクトを実行する際に、送信者とfeePayerが別々に署名されたトランザクションを送信したい場合は、以下のコードを参照する：

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

コントラクトのインスタンスをロードし、その関数を呼び出す（トランザクションを送信するのではなく、単に呼び出す）：以下の例では、コントラクトの `get` 関数を呼び出している。

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

上記のコードが実行されると、以下のように値が出力される。

```bash
テスト値
```

詳細については、[caver-java API]を参照のこと。

## アイピーエフエス<a id="ipfs"></a>

IPFS（InterPlanetary File System）は、ファイル、ウェブサイト、アプリケーション、データの保存とアクセスのための分散ファイルシステムです。

Caverを使ってIPFS経由でファイルをアップロードしたりダウンロードしたりすることができます。

### IPFSとの接続<a id="connecting-with-ipfs"></a>

`caver.ipfs`パッケージの `IPFS` クラスは `Caver` のクラスメンバ変数として定義されているため、`Caver` を通して IPFS とやり取りすることができる。

`Caver` インスタンスを通して `IPFS` インスタンスを使用するには、最初にメソッド `setIPFSNode()` を呼び出して IPFS ノードに接続する必要があります。

関数 `setIPFSNode()` は以下のパラメータを必要とする：

- IPFS HTTP APIホストURL
- IPFS HTTP API ホスト・ポート番号
- ホストがSSLを使用しているかどうか。

```java
String host = "The URL of an IPFS node";
int port = 5001; // API host port number
boolean isSSL = true; // API host support ssl 
Caver caver = new Caver();
caver.ipfs.setIPFSNode(host, port, isSSL);
```

### IPFSによるファイルのアップロード<a id="uploading-a-file-through-ipfs"></a>

ファイルを `IPFS` 経由でアップロードするには、以下のように `add()` を使用する。

この関数は、アップロードされたファイルの[CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)を返す。

```java
String filePath = "/path/to/file";
String cid = caver.ipfs.add(filePath);
System.out.println(cid);
```

上記のコードの実行結果を以下に示す。

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

同様に、バイト配列をアップロードすることもできる。

```java
String text = "sample data";
byte[] data = text.getBytes();

String cid = caver.ipfs.add(data);
System.out.println(cid);
```

上記のコードの実行結果を以下に示す。

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

### IPFSからファイルをダウンロードする<a id="downloading-a-file-from-ipfs"></a>

`IPFS` からファイルをダウンロードするには、以下のように `get()` を使用する。

この機能には、ダウンロードするファイルのCIDが必要です。

```java
String cid = "QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq";
byte[] content = caver.ipfs.get(cid);
```

### CIDとマルチハッシュの変換<a id="conversion-between-cid-and-multihash"></a>

`toHex()`を使うと、CIDを[Multihash](https://multiformats.io/multihash/)に変換できる。

CIDはBase58でエンコードされたマルチハッシュの値である。 `toHex()`はCIDをデコードし、対応するマルチハッシュを返す。

```java
String cid = "QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk";
String multihash = caver.ipfs.toHex(cid);
System.out.println(multihash);
```

上記のコードの実行結果を以下に示す。

```java
0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47
```

マルチハッシュをCIDに変換するには `fromHex()` を使う。

```java
String multihash = "0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47";
String cid = caver.ipfs.fromHex(multihash);
System.out.println(cid);
```

上記のコードの実行結果を以下に示す。

```java
QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk
```

## KCTインターフェイスの検出<a id="detect kct interface"></a>

KIP-7]、[KIP-17]、[KIP-37]のようなKCT（Kaia Compatible Token）コントラクトは、様々なインタフェースを定義し提供しており、[KIP-13]では、コントラクトにクエリを送信することで、コントラクトがKCT仕様に準拠しているかどうか、どのインタフェースを実装しているかを確認することができます。

[KIP-13]はCaver v1.5.7で実装されました。 KCTのコントラクトクラス(`KIP7`, `KIP17`, `KIP37`)の `detectInterface()` からインターフェースを検出することができる。

### KIP-7インターフェースの検出<a id="detecting-kip-7-interfaces"></a>

KIP-7 インタフェースを検出するには、`KIP7` クラスの `detectInterface()` を使うことができる。
KIP-7インタフェース識別子と、そのインタフェースがサポートされているかどうかのブール値の対応を返す。

`detectInterface()`はスタティック・メソッドとインスタンス・メソッドの両方をサポートしているので、ニーズに合ったメソッドを選んで使うことができる。

`KIP7`の `detectInterface()` で検出されたインターフェースは以下の表のとおりである。

| インターフェース      | KIP-13 識別子 |
| ------------- | ---------- |
| イキップ7         | 0x65787371 |
| IKIP7メタデータ    | 0xa219a025 |
| IKIP7Mintable | 0xeab83e20 |
| IKIP7バーナブル    | 0x3b5a0bf8 |
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

上記のコードの実行結果を以下に示す。

```java
{
  "IKIP7Metatdata" : true,
  "IKIP7Burnable" : true,
  "IKIP7" : true,
  "IKIP7Pausable" : true,
  "IKIP7Mintable" : true
}.
```

### KIP-17インターフェイスの検出<a id="detecting-kip-17-interfaces"></a>

KIP-17 トークンコントラクトに実装されているインタフェースを検出するには、`KIP17` クラスの `detectInterface()` を使用します。
KIP-17 インタフェース識別子とインタフェース・サポートのマッピングを返す。

`detectInterface()`はスタティック・メソッドとインスタンス・メソッドの両方をサポートしているので、ニーズに合ったメソッドを選んで使うことができる。

`KIP17`の`detectInterface()`で検出されたインターフェースは以下の表の通りである。

| インターフェース               | KIP-13 識別子 |
| ---------------------- | ---------- |
| IKIP17                 | 0x80ac58cd |
| IKIP17メタデータ            | 0x5b5e139f |
| IKIP17Enumerable       | 0x780e9d63 |
| IKIP17Mintable         | 0xeab83e20 |
| IKIP17MetadataMintable | 0xfac27f46 |
| IKIP17燃焼可能             | 0x42966c68 |
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

上記のコードの実行結果を以下に示す。

```java
{
  "IKIP17Enumerable" : true,
  "IKIP17Metadata" : true,
  "IKIP17Burnable" : true,
  "IKIP17Mintable" : true,
  "IKIP17" : true,
  "IKIP17MetadataMintable" : true,
  "IKIP17Pausable" : true
}.
```

### KIP-37インターフェースの検出<a id="detecting-kip-37-interfaces"></a>

KIP-37 のトークンコントラクトに実装されているインタフェースを検出するには、`KIP37` クラスの `detectInterface()` を使用します。
KIP-37 インタフェース識別子とインタフェースのサポートとの間のマッピングを返す。

`detectInterface()`はスタティック・メソッドとインスタンス・メソッドの両方をサポートしているので、適切なメソッドを選択して使うことができる。

`KIP37`の`detectInterface()`によるインターフェース検出を以下の表に示す。

| インターフェース       | KIP-13 識別子 |
| -------------- | ---------- |
| IKIP37         | 0x6433ca1f |
| IKIP37メタデータ    | 0x0e89341c |
| IKIP37Mintable | 0xdfd9d9ec |
| IKIP37燃焼可能     | 0x9e094e9e |
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

上記のコードの実行結果を以下に示す。

```java
{
  "IKIP37Metatdata" : true,
  "IKIP37Burnable" : true,
  "IKIP37" : true,
  "IKIP37Pausable" : true,
  "IKIP37Mintable" : true
}.
```

[caver-java API]: https://javadoc.io/doc/com.klaytn.caver/core/
[KIP-7]: https://kips.kaia.io/KIPs/kip-7
[KIP-13]: https://kips.kaia.io/KIPs/kip-13
[KIP-17]: https://kips.kaia.io/KIPs/kip-17
[KIP-37]: https://kips.kaia.io/KIPs/kip-37
