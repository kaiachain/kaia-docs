# Bắt đầu

## Có gì mới?

Trong caver-java 1.5.0, chúng tôi áp dụng Common Architecture. Common Architecture là một kiến trúc phần mềm mới dành cho môi trường phát triển Klaytn, được chia sẻ bởi tất cả các SDK Klaytn (caver-js/caver-java). Kiến trúc này đươc thiết kế để đảm bảo trải nghiệm phát triển thuận lợi và khả năng mở rộng dễ dàng sang các ngôn ngữ lập trình khác.

Khi caver-java được cập nhật lên phiên bản 1.5.0, các API được dùng trong phiên bản 1.4.0 sẽ không còn hoạt động được nữa, ngoại trừ một số API.

Các API mới được cung cấp trong caver-java 1.5.0 như sau.

### caver.tài khoản

caver.tài khoản là một gói dùng để cập nhật AccountKey, đó có thể là một hoặc nhiều khóa công khai (AccountKeyPublic, AccountKeyWeightedMultiSig và AccountKeyRoleBased) hoặc một loại khóa đặc biệt (AccountKeyLegacy và AccountKeyFail) cho một tài khoản Klaytn.


- `caver.tài khoản` thay thế `caver.tx.tài khoản` trong caver-java 1.4.0

### caver.wallet

caver.wallet là gói quản lý các đối tượng trong ví trong bộ nhớ. Keyring là một đối tượng cụ thể chứa địa chỉ của một tài khoản Klaytn và (các) khóa riêng tư của tài khoản đó, và nó được dùng khi địa chỉ của tài khoản này ký một giao dịch. caver.wallet chấp nhận tất cả các loại Keyring (SingleKeyring, MultipleKeyring và RoleBasedKeyring) và quản lý bằng địa chỉ tài khoản Klaytn của chúng.

- `caver.wallet` thay thế `caver.crypto` trong caver-java 1.4.0
- `caver.wallet.KeyStore` thay thế `caver.wallet.WalletFile` trong caver-java 1.4.0

### caver.transaction

canver.transaction là một gói cung cấp chức năng liên quan đến [Giao dịch](../../../learn/transactions/transactions.md#transactions-overview).

- `caver.transaction` thay thế `caver.tx` trong caver-java 1.4.0

### caver.rpc

caver.rpc là một gói cung cấp chức năng liên quan đến việc thực hiện gọi rpc đến nút Klaytn.

- `caver.rpc.klay` và `caver.rpc.net` lần lượt thay thế các giao diện `Klay`, `Net` trong caver-java 1.4.0

### caver.util

caver.util cung cấp các chức năng tiện ích.

### caver.contract

`caver.contract` là một gói giúp cho việc xử lý hợp đồng thông minh trong Klaytn trở nên dễ dàng hơn. Với caver.contract, bạn có thể triển khai và thực thi hợp đồng thông minh bằng cách gọi các hàm của chúng. `caver.contract` trước tiên sẽ chuyển đổi các hàm của hợp đồng thông minh và sự kiện từ ABI\(Giao diện nhị phân ứng dụng\), gọi các hàm đó và lấy thông tin sự kiện.

## Điều kiện tiên quyết <a id="prerequisites"></a>

### Thêm kho dữ liệu<a id="adding-a-repository"></a>
Một kho chứa dữ liệu thư viện cần phải được thêm vào trước khi sử dụng IPFS. Trước hết, vui lòng thêm kho dữ liệu sau.

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

### Thêm phần phụ thuộc <a id="adding-a-dependency"></a>

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

Nếu bạn muốn dùng phần phụ thuộc Android, bạn chỉ cần thêm -android vào cuối chuỗi phiên bản. \(ví dụ 1.0.1-android\)

Nếu bạn muốn xem chi tiết của các yêu cầu và phản hồi JSON-RPC, vui lòng đưa phần phụ thuộc [LOGBack](https://logback.qos.ch/) vào dự án của mình. Dưới đây là một ví dụ về tập tin xây dựng Gradle. Bạn cũng có thể thêm phần phụ thuộc vào Maven. Vì caver-java sử dụng giao diện đăng nhập [SLF4J](http://www.slf4j.org/), bạn có thể chuyển sang trình ghi bản ghi mà bạn thích thay cho LOGBack.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**Lưu ý**: Trong kho dữ liệu trung tâm, các phiên bản RC, Andriod và Java được liệt kê cùng nhau. Nếu bạn sử dụng ký tự đại diện để lấy một phiên bản, bạn có thể dùng phải một phiên bản không phù hợp với nền tảng của mình.

#### Công cụ dòng lệnh <a id="command-line-tool"></a>

Công cụ dòng lệnh cho phép bạn dùng dòng lệnh để tạo các lớp vỏ bọc chức năng bằng Solidity cho hợp đồng thông minh.

**Cài đặt \(Homebrew\)**

Cần có Java 1.8 trở lên để cài đặt công cụ này.

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

Sau khi cài đặt, bạn có thể chạy lệnh "caver-java" như dưới đây:

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

**Cài đặt \(Khác\)**

Hiện tại, chúng tôi không hỗ trợ các trình quản lý gói khác. Một giải pháp khác mà chúng tôi cung cấp là một phương pháp để xây dựng CLI như bên dưới.

* Tải xuống hoặc tách luồng caver-java.
* Dùng Gradle thực hiện tác vụ "shadowDistZip" trong mô-đun bảng điều khiển. Kết quả là `console/build/distributions/console-shadow-{version}.zip` được tạo ra.

  ```text
  $ ./gradlew :console:shadowDistZip
  ```

* Giải nén tập tin zip trong thư mục xây dựng

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

* Thực thi tập tin nhị phân để chạy công cụ dòng lệnh như dưới đây. Bạn có thể tìm thấy tập tin mã lập trình shell dành cho người dùng macOS và tập tin batch dành cho người dùng Window.

  ```text
  $ ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```


## Sơ lược về việc gửi KLAY

Phần này mô tả một ví dụ đơn giản về việc sử dụng `tập tin kho khóa` để gửi KLAY với một giao dịch chuyển giá trị. Tập tin kho khóa có thể được tạo ra trong [Ví Klaytn](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). Nếu bạn cần KLAY để thử nghiệm, bạn có thể nhận KLAY dùng trong mạng thử nghiệm Baobab từ [Ví Klaytn](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay).

```java
ublic void sendingKLAY() throws IOException, CipherException, TransactionException {
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


## Bắt đầu với caver-java <a id="starting-with-caver-java"></a>

### Kết nối với một Nút Klaytn <a id="connecting-to-a-klaytn-node"></a>

Nếu bạn đang chạy một EN, bạn có thể kết nối nó với nút của riêng mình bằng cách thay đổi máy chủ và cổng như dưới đây:

```java
Caver caver = new Caver("http://your.en.url:8551/");
```


## Quản lý Keyring <a id="managing-keyrings"></a>

`Keyring` là một cấu trúc chứa địa chỉ của một tài khoản Klaytn và (các) khóa riêng tư.

`Keyring` có thể được phân thành ba loại tùy theo loại khóa được lưu trữ: `SingleKeyring` lưu trữ một địa chỉ và một khóa riêng tư, `MultipleKeyring` lưu trữ một địa chỉ và nhiều khóa riêng tư, và `RoleBasedKeyring` lưu trữ một địa chỉ và một hoặc nhiều khóa riêng tư cho từng vai trò.

`SingleKeyring` xác định thuộc tính `key` bên trong, và `key` này chứa một khóa riêng tư.

`MultipleKeyring` xác định thuộc tính `keys` bên trong, và `keys` này được triển khai dưới dạng một mảng để chứa nhiều khóa riêng tư.

Thuộc tính `keys` được xác định trong `RoleBasedKeyring` được triển khai dưới dạng một đối tượng Danh sách gồm 3 mảng chứa (các) khóa riêng tư như các phần tử trong đó (thuộc tính `keys` trống có dạng `[ [], [], [] ]`), như vậy, nó có thể chứa nhiều khóa cho từng `vai trò`. Phần tử đầu tiên của mảng này chứa (các) khóa riêng tư để sử dụng cho `roleTransactionKey`, phần tử thứ hai là (các) khóa riêng tư để sử dụng cho `roleAccountUpdateKey`, và phần tử thứ ba là (các) khóa riêng tư để sử dụng cho `roleFeePayerKey`.

### Tạo một Keyring <a id="creating-a-keyring"></a>

#### Tạo một SingleKeyring <a id="generating-a-singlekeyring"></a>

Bạn có thể tạo ngẫu nhiên một keyring đơn lẻ như dưới đây.

```java
SingleKeyring keyring = caver.wallet.keyring.generate();
```

#### Tạo một SingleKeyring từ khóa riêng tư <a id="creating-a-singlekeyring-from-private-key"></a>

Ngoài ra, nếu bạn sở hữu một khóa riêng tư cụ thể, bạn có thể sử dụng khóa này để tạo một keyring như bên dưới.

```java
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey(privateKey);
```

#### Tạo một SingleKeyring bằng một khóa riêng tư và một địa chỉ <a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

Nếu khóa riêng tư cho tài khoản Klaytn của bạn tách rời khỏi địa chỉ, bạn có thể tạo một keyring bằng địa chỉ đã cho và khóa riêng tư đã cho như dưới đây.

```java
String address = "0x{address in hex}";
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createWithSingleKey(address, privateKey);
```

Ngoài ra, bạn có thể lấy đối tượng SingleKeyring cụ thể từ khóa của ví Klaytn.

```java
String klaytnWalletKey = "0x{private key}0x{type}0x{address in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey);
```

#### Tạo một MultipleKeyring bằng nhiều khóa riêng tư <a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

Nếu bạn muốn dùng nhiều khóa riêng tư, bạn có thể tạo một `MultipleKeyring` bằng một địa chỉ và nhiều khóa riêng tư. Các ví dụ dưới đây cho thấy cách để tạo ra một `MultipleKeyring` bằng nhiều khóa riêng tư.

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{private key#3}"};
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(address, privateKeyArray);
```

#### Tạo một RoleBasedKeyring bằng các khóa riêng tư <a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

Để sử dụng (các) khóa riêng tư khác nhau cho từng `role`, `caver.wallet.keyring.createWithRoleBasedKey` sẽ được dùng. Mỗi phần tử trong mảng tương ứng với một vai trò được mô tả trong `RoleBasedKeyring`. Ví dụ dưới đây hướng dẫn cách tạo ra một đối tượng `RoleBasedKeyring` cụ thể từ các khóa khác nhau cho từng vai trò.


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

### Thêm các Keyring vào caver-java từ một chuỗi kho khóa json.<a id="adding-keyrings-to-caver-java"></a>

Bạn có thể sử dụng một keyring dễ dàng hơn bằng cách thêm nó vào ví trên bộ nhớ được caver-java cung cấp. Các ví dụ dưới đây minh họa cách để thêm một keyring vào `caver.wallet` bằng một chuỗi tập tin kho khóa JASON lưu trữ khóa được tạo ra bởi [Ví Klaytn](https://wallet.klaytn.com/).

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

Nhìn vào kết quả đầu ra ở trên, bạn có thể truy vấn keyring của mình từ `caver.wallet` sau khi thêm nó vào `caver.wallet`.

Nếu bạn có một địa chỉ và (các) khóa riêng tư để dùng, bạn có thể dễ dàng tạo ra một keyring và trực tiếp thêm nó vào caver.wallet thông qua caver.wallet.newKeyring.

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

Khi `caver.wallet.newKeyring` được thực thi với một khóa riêng tư, một đối tượng Keyring cụ thể với một khóa riêng tư sẽ được tạo ra và thêm vào `caver.wallet`. Đối với nhiều khóa riêng tư, một đối tượng Keyring cụ thể với nhiều khóa riêng tư sẽ được tạo ra và thêm vào `caver.wallet`. Khi dùng một mảng chuỗi 2D làm dữ liệu đầu vào, bao gồm một hoặc nhiều khóa riêng tư cho mỗi vai trò với tư cách là một phần tử, một đối tượng Keyring cụ thể có chứa (các) khóa riêng tư khác nhau cho từng vai trò sẽ được tạo ra, và cũng được thêm vào `caver.wallet`.


`caver.wallet.add` hoặc `caver.wallet.newKeyring` trả về một đối tượng Keyring cụ thể sau khi đã thêm nó vào `caver.wallet`.

## Gửi giao dịch <a id="sending-a-transaction"></a>

Phần này sẽ hướng dẫn bạn các để gửi KLAY bằng caver-java trên mạng Baobab.

### Nhận KLAY qua Vòi Baobab <a id="getting-klay-via-baobab-faucet"></a>

Nếu bạn cần KLAY để thử nghiệm, bạn có thể nhận KLAY dùng trong mạng thử nghiệm Baobab từ [Ví Klaytn](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). Hãy đăng nhập vào Ví Wallet bằng khóa riêng tư hoặc tập tin lưu trữ khóa, và nhận KLAY dùng cho mạng thử nghiệm Baobab qua vòi để thử nghiệm.

### Gửi một giao dịch chuyển giá trị <a id="sending-a-value-transfer-transaction"></a>

Bạn có thể sử dụng ví caver-java để tạo chữ ký của giao dịch. Bạn sẽ phải thực hiện hai bước dưới đây để gửi giao dịch đến mạng lưới.

1. Ký giao dịch
    - Nếu keyring mà bạn muốn dùng đã được thêm vào `caver.wallet`, bạn có thể dùng hàm `caver.wallet.sign` để ký.
    - Nếu bạn quản ký keyring riêng biệt và không thêm nó vào `caver.wallet`, bạn có thể ký giao dịch thông qua hàm `transaction.sign`.
2. Gửi chuỗi mã hóa RLP của giao dịch đã ký đến Klaytn qua `caver.rpc.klay.sendRawTransaction`.

**Lưu ý:** Người gửi phải có đủ lượng KLAY để chuyển và trả phí giao dịch.

#### Ký giao dịch

Trước khi gửi một giao dịch đến Klaytn, bạn phải ký giao dịch trước.

Dưới đây là ví dụ về cách ký một giao dịch trong trường hợp một keyring đã được thêm vào `caver.wallet`.

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

Mã trên thêm một keyring vào `caver.wallet`, tạo ra một giao dịch và ký giao dịch đó qua `caver.wallet.sign`.

Khi chạy mã trên, bạn sẽ nhận được kết quả sau. Khi mã trên đã được thực thi, chuỗi mã hóa RLP của giao dịch sẽ hiển thị dưới đây. (Kết quả chuỗi mã hóa RLP mà bạn nhận được có thể khác với kết quả chuỗi hiển thị dưới đây).

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### Gửi chuỗi mã hóa RLP của giao dịch đã ký đến Klaytn

Giờ bạn có thể gửi một giao dịch đã ký đến mạng lưới như dưới đây. Nếu bạn muốn chạy thử ví dụ dưới đây, hãy thay thế "rlpEncoding" bằng giá trị của `rlpEncoded` trong mã bên trên.

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

Nếu bạn muốn ký một giao dịch và gửi nó đến mạng lưới mà không cần `caver.wallet`, hãy xem ví dụ bên dưới.

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

Khi mã trên được thực thi, hàm băm của giao dịch (txHash) được hiển thị ra màn hình như ví dụ dưới đây.

```bash
Transaction Hash : 0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113
```

### Kiểm tra biên lai <a id="checking-receipts"></a>

Bạn có thể dùng `TransactionReceiptProcessor` để nhận biên lai của giao dịch khi chuyển giao dịch đó đến Klaytn bằng `caver.rpc.klay.sendRawTransaction`.

Ví dụ dưới đây cho thấy cách để nhận biên lai bằng PollingTransactionReceiptProcessor.

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

Như mô tả trong ví dụ trên, bạn có thể nhận được kết quả của việc gửi giao dịch thông qua TransactionReceiptProcessor. Trường `transactionHash` được xác định bên trong đối tượng biên lai.

Bạn có thể dùng phương pháp gọi RPC `caver.rpc.klay.getTransactionReceipt` kèm theo chuỗi `txHash` để truy vấn biên lai của một giao dịch vào bất kỳ lúc nào từ mạng lưới sau khi giao dịch đã được đưa vào một khối. Ví dụ dưới đây cho thấy cách để lấy biên lai bằng cách gọi RPC `caver.rpc.klay.getTransactionReceipt`.

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

Bạn có thể tìm thấy kết quả của giao dịch qua `trạng thái` của biên lai. Để biết thêm chi tiết về các giá trị trả về, hãy xem `caver.rpc.klay.getTransactionReceipt`. Nếu một giao dịch thất bại, bạn có thể kiểm tra thêm thông tin về lỗi tại `txError` của biên lai. Để biết thêm thông tin về `txError`, hãy xem [txError: Thông tin chi tiết về các lỗi giao dịch](../../transaction-error-codes.md).


## Thực thi các loại giao dịch khác <a id="executing-other-transaction-types"></a>

Klaytn cung cấp nhiều loại giao dịch đa dạng để đẩy mạnh khả năng mở rộng và hiệu suất. Để biết thêm thông tin, hãy xem [Giao dịch](../../../learn/transactions/transactions.md). Mục này mô tả một số ví dụ mà bạn có thể sử dụng với caver-java.

### Ủy thác phí <a id="fee-delegation"></a>

Klaytn cung cấp tính năng Ủy thác phí. Đây là một ví dụ về việc thực hiện một giao dịch mã hóa RLP khi bạn là người gửi loại giao dịch này:

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

Khi mã trên được thực thi, chuỗi mã hóa RLP sẽ được hiển thị ra màn hình. (Kết quả chuỗi mã hóa RLP mà bạn nhận được có thể khác với kết quả chuỗi hiển thị dưới đây).

```bash
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

Người trả phí có thể gửi giao dịch đến Klaytn sau khi đính kèm `feePayerSignatures` vào chuỗi mã hóa RLP (`rawTransaction`) được ký bởi người gửi giao dịch. Nếu `caver.wallet` cũng có keyring của người trả phí, chữ ký của người trả phí có thể được đưa vào `feeDelegatedTx` bằng cách gọi `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`. Nếu không, người trả phí sẽ phải tạo `feeDelegatedTx` từ chuỗi mã hóa RLP được người gửi ký, sau đó thêm chữ ký của người trả phí vào đó như được minh họa dưới đây. Nếu bạn muốn chạy thử ví dụ bên dưới, hãy thay thế `0x{RLP-encoded string}` bằng giá trị của `rlpEncoded` ở trên.

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

Khi mã trên được thực thi, chuỗi mã hóa RLP bao gồm cả chữ ký của người gửi và người trả phí sẽ hiển thị ra màn hình như dưới đây. (Kết quả mà bạn nhận được có thể khác với kết quả chuỗi hiển thị dưới đây).

```bash
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

Lúc này, giao dịch đã được cả người gửi và người trả phí ký tên, và giờ nó có thể được gửi đến mạng lưới. Thay thế `0x{RLP-encoded string}` bằng kết quả đầu ra chuỗi mã hóa RLP của mã ví dụ ở trên.

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

Bạn có thể tìm thấy kết quả của giao dịch qua `trạng thái` của biên lai. Để biết thêm chi tiết về các giá trị trả về, hãy xem `caver.rpc.klay.getTransactionReceipt`. Nếu một giao dịch thất bại, bạn có thể kiểm tra thêm thông tin về lỗi tại `txError` của biên lai. Để biết thêm thông tin về `txError`, hãy xem [txError: Thông tin chi tiết về các lỗi giao dịch].

### Cập nhật tài khoản <a id="account-update"></a>

Nếu bạn muốn thay đổi (các) khóa riêng tư cho tài khoản Klaytn của mình, có 3 điều quan trọng mà bạn cần ghi nhớ:

1. Klaytn xác thực mọi giao dịch mà bạn gửi đến.
2. Quy trình xác thực yêu cầu sử dụng các khóa công khai tương ứng chính xác với (các) khóa riêng tư của bạn.
3. Vì thế, việc thay đổi (các) khóa riêng tư thành (các) khóa riêng tư mới sẽ **luôn** **kéo theo** việc thay đổi (các) khóa công khai cũ thành (các) khóa mới. (Các) khóa công khai mới phải được lấy từ (các) khóa riêng tư mới.

Khi đã ghi nhớ 3 điều trên, bạn có thể thay đổi (các) khóa riêng tư của mình bằng cách thực hiện những bước sau:

1. Chuẩn bị (các) khóa riêng tư mới để tạo một keyring mới.
2. Tạo một keyring theo loại (Single keyring, Multiple keyring hoặc Role-based keyring) mà bạn cần.
3. Tạo một đối tượng Tài khoản cụ thể từ keyring mới. Đối tượng Tài khoản cụ thể này giữ (các) khóa công khai mới cho tài khoản Klaytn của bạn.
4. Gửi giao dịch AccountUpdate bao gồm cả đối tượng Tài khoản cụ thể đến Klaytn.
5. Cuối cùng, thay thế keyring cũ bằng keyring mới mà bạn tạo ở Bước 2.

Vui lòng xem `Cập nhật tài khoản` để biết thêm chi tiết.

Để thay đổi AccountKey của mình, bạn phải cung cấp một đối tượng `Account` cụ thể cho trường `tài khoản` trong đối tượng đối số đầu vào của `caver.transaction.type.AccountUpdate`. Một đối tượng `Tài khoản` cu thể có chứa địa chỉ của tài khoản Klaytn và AccountKey cần được cập nhật.

Mã dưới đây là một mã ví dụ dùng để thay đổi (các) khóa riêng tư mà bạn dùng cho tài khoản Klaytn của mình, kèm theo việc thay đổi AccountKey của tài khoản Klaytn thành `AccountKeyPublic`. Đừng quên chuẩn bị (các) khóa riêng tư mới.

```java
Caver caver = new Caver(Caver.DEFAULT_URL);
SingleKeyring senderKeyring = caver.wallet.keyring.createFromPrivateKey("0x2359d1ae7317c01532a58b01452476b796a3ac713336e97d8d3c9651cc0aecc3");
caver.wallet.add(senderKeyring);

String newPrivateKey = caver.wallet.keyring.generateSingleKey();
SingleKeyring newKeyring = caver.wallet.keyring.create(senderKeyring.getAddress(), newPrivateKey);

Account tài khoản = newKeyring.toAccount();

AccountUpdate tài khoảnUpdate = caver.transaction.tài khoảnUpdate.create(
        TxPropertyBuilder.tài khoảnUpdate()
                .setFrom(senderKeyring.getAddress())
                .setAccount(tài khoản)
                .setGas(BigInteger.valueOf(50000))
);

try {
    caver.wallet.sign(senderKeyring.getAddress(), tài khoảnUpdate);
    String rlpEncoded = tài khoảnUpdate.getRLPEncoding();

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

Nếu mã trên được thực thi thành công, bạn sẽ không còn có thể dùng (các) khóa riêng tư cũ để ký bất kỳ giao dịch nào với keyring cũ nữa. Vì thế, bạn phải cập nhật keyring cũ bằng `newKeyring` thông qua `caver.wallet.updateKeyring(newKeyring)`. Khi đã được cập nhật, (các) khóa riêng tư mới được cập nhật sẽ được dùng để ký.

Sau đây là hướng dẫn về cách cập nhật AccountKey của tài khoản Klayt có nhiều `AccountKeys`. Ví dụ dưới đây giải thích về cách để tạo một đối tượng `Tài khoản` cụ thể với nhiều khóa riêng tư mà bạn muốn sử dụng (Bạn có thể tạo một đối tượng `Tài khoản` cụ thể với nhiều khóa công khai qua `caver.tài khoản.create`). Tương tự như trên, sau khi nạp đối tượng tài khoản cụ thể vừa tạo ra vào trường `Tài khoản` bên trong đối tượng giao dịch, phần còn lại của quá trình cập nhật cũng giống như ví dụ ở trên.

Trước tiên, hãy dùng tạo một đối tượng Tài khoản cụ thể để cập nhật bằng `AccountKeyWeightedMultiSig`. Đối với `AccountKeyWeightedMultiSig`, phải xác định ngưỡng và trọng số của từng khóa. Để thực hiện điều này, hãy dùng `caver.tài khoản.weightedMultiSigOptions`. Tham số đầu tiên là ngưỡng, và tham số thứ hai là mảng có chứa trọng số cho từng khóa.

```java
// Create an tài khoản instance with three private keys using AccountKeyWeightedMultiSig
String[] privateKeyArr = caver.wallet.keyring.generateMultipleKeys(3);
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(sender.getAddress(), privateKeyArr);

// threshold = 3, the weights of the three keys = [1, 2, 1]
BigInteger threshold = BigInteger.valueOf(3);
BigInteger[] weightedArr = new BigInteger[] {BigInteger.valueOf(1), BigInteger.valueOf(2), BigInteger.valueOf(1)};
WeightedMultiSigOptions options = new WeightedMultiSigOptions(threshold, Arrays.asList(weightedArr));

Account tài khoản = multipleKeyring.toAccount(options)
```

Bây giờ, hãy cập nhật AccountKey bằng `AccountKeyRoleBased`. `AccountKeyRoleBased` là một loại `AccountKey` xác định khóa để dùng cho từng `vai trò`.

```java
// Create an tài khoản instance with roles using AccountKeyRoleBased. Trong đối tượng tài khoản cụ thể được tạo ra, mỗi vai trò có một khóa công khai tương ứng với một khóa riêng tư.
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {1,1,1});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

const tài khoản = newKeyring.toAccount()
```

AccountKeyRoleBased ở trên là một ví dụ về việc sử dụng một khóa công khai cho từng vai trò. Như có thể thấy từ mã trên, từng vai trò tương ứng với một khóa riêng tư. Nếu bạn muốn dùng nhiều khóa riêng tư cho từng vai trò, `caver.tài khoản.weightedMultiSigOptions` phải được xác định cho từng vai trò như minh họa dưới đây.

```java
// Create an tài khoản instance with [3, 2, 3] keys for each role using AccountKeyRoleBased
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {3, 2, 3});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

WeightedMultiSigOptions[] options = new WeightedMultiSigOptions[] {
    new WeightedMultiSigOptions(BigInteger.valueOf(4), Arrays.asList(BigInteger.valueOf(2), BigInteger.valueOf(2), BigInteger.valueOf(4))),
    new WeightedMultiSigOptions(BigInteger.valueOf(2), Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(1))),
    new WeightedMultiSigOptions(BigInteger.valueOf(3), Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(1), BigInteger.valueOf(1))),
};

Account tài khoản = newKeyring.toAccount(Arrays.asList(options));
```

Nếu bạn muốn cập nhật AccountKey thành `AccountKeyLegacy` hoặc `tài khoảnKeyFail`, hãy tạo một đối tượng Tài khoản cụ thể như minh họa dưới đây, và gán nó vào trường `tài khoản` của giao dịch. Phần còn lại của quá trình cập nhật cũng tương tự như đối với AccountKey.

```java
// Create an tài khoản with AccountKeyLegacy
Account tài khoản = caver.tài khoản.createWithAccountKeyLegacy(keyringToUpdate.address);

// Create an tài khoản with AccountKeyFail
Account tài khoản = caver.tài khoản.createWithAccountKeyFail(keyringToUpdate.address)
```

### Hợp đồng thông minh <a id="smart-contract"></a>

Lớp `Contract` trong gói `caver.contract` giúp việc tương tác với hợp đồng thông minh trên Klaytn trở nên dễ dàng hơn. Tất cả các hàm của một hợp đồng thông minh tự động được quy đổi và lưu trữ bên trong đối tượng `contract` cụ thể khi ABI mức thấp được đưa ra. Điều này cho phép bạn tương tác với hợp đồng thông minh như khi xử lý một đối tượng `contract` cụ thể trong Java.


Chúng ta sẽ bắt đầu giải thích về việc xử lý một hợp đồng thông minh trong Java bằng cách viết một mã ví dụ như dưới đây với Solidity. Tạo tập tin "test.sol" và viết vào đó ví dụ dưới đây.


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

Sau đó, lập hợp đồng thông minh này để lấy bytecode và ABI của nó.

```text
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**LƯU Ý**: Để lập một hợp đồng thông minh, bạn phải cài đặt trước [trình biên dịch solidity](https://solidity.readthedocs.io/en/develop/installing-solidity.html). Để biên dịch chương trình trên, bạn cần cài đặt solc:0.5.6.

Để triển khai một hợp đồng thông minh theo loại của nó, bạn có thể sử dụng các lớp caver-java được mô tả dưới đây:
  - Lớp `Contract` trong gói `caver.contract` khi người gửi hoặc người trả phí của một giao dịch hợp đồng thông minh thanh toán khoản phí
  - Lớp `SmartContractDeploy` trong gói `caver.transaction` khi người gửi của một giao dịch hợp đồng thông minh thanh toán khoản phí
  - Lớp `feeDelegatedSmartContractDeploy` trong gói `caver.transaction` khi người trả phí của một giao dịch hợp đồng thông minh thanh toán khoản phí
  - Lớp `feeDelegatedSmartContractDeployWithRatio` trong gói `caver.transaction` khi người trả phí của một giao dịch hợp đồng thông mình thanh toán khoản phí

Dưới đây là một ví dụ về việc sử dụng lớp `Contract` trong gói `caver.contract`. Bạn có thể tạo một đối tượng `contract` cụ thể như dưới đây từ bytecode và ABI nhận được sau khi lập hợp đồng thông minh.

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

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
function set(string,string)
function get(string)
ContractAddress : null
```

Nhìn vào kết quả trên, bạn có thể thấy rằng đối tượng `contract` cụ thể sở hữu phương pháp của hợp đồng thông minh. Và vì nó vẫn chưa được triển khai, bạn có thể thấy rằng kết quả của `contract.getContractAddress()` có đầu ra là null.

Nếu hợp đồng này đã được triển khai và bạn đã biết địa chỉ hợp đồng mà tại đó hợp đồng này được triển khai, hãy dùng địa chỉ hợp đồng như tham số thứ ba trong hàm tạo của đối tượng `contract` cụ thể như dưới đây.

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

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
function set(string,string)
function get(string)
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

Một đối tượng `contract` cụ thể chứa địa chỉ hợp đồng của mình dưới dạng thuộc tính `contractAdress` khi được tạo ra. Địa chỉ này có thể truy cập qua hàm getter / setter (`getContractAddress()` / `setContractAddress()`).

Khi một đối tượng `contract` cụ thể đã được tạo ra, bạn có thể triển khai hợp đồng thông minh bằng cách dùng chỉ thị biên dịch và các đối số của hàm tạo (khi cần dùng để triển khai) như ví dụ bên dưới.

Hãy lưu ý rằng phương pháp `deploy()` của đối tượng `contract` cụ thể gửi các giao dịch cho việc triển khai hợp đồng và thực thi hợp đồng. Đối với việc gửi giao dịch, nó sử dụng Keyrings trong `caver.wallet` để ký giao dịch. Keyring cần dùng phải được thêm vào `caver.wallet` trước khi ký.

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

Trong mã trên, `deployer` triển khai hợp đồng trên Klaytn và trả lại đối tượng `contract` cụ thể đã được triển khai.

```bash
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

Một hợp đồng thông minh có thể được triển khai bằng cách dùng một trong các lớp sau, tùy vào loại giao dịch triển khai hợp đồng:
  - Lớp `Contract` trong gói `caver.contract` khi người gửi hoặc người trả phí của một giao dịch hợp đồng thông minh thanh toán khoản phí
  - Lớp `SmartContractDeploy` trong gói `caver.transaction` khi người gửi của một giao dịch hợp đồng thông minh thanh toán khoản phí
  - Lớp `feeDelegatedSmartContractDeploy` trong gói `caver.transaction` khi người trả phí của một giao dịch hợp đồng thông minh thanh toán khoản phí
  - Lớp `feeDelegatedSmartContractDeployWithRatio` trong gói `caver.transaction` khi người trả phí của một giao dịch hợp đồng thông mình thanh toán khoản phí


Để triển khai một hợp đồng thông minh qua một giao dịch ủy thác phí, hãy xác định các trường `feeDelegation` và `feePayer` trong lớp `SendOptions` như ví dụ dưới đây.

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

Nếu bạn muốn gửi một giao dịch trong đó người gửi và người trả phí ký riêng biệt nhau khi triển khai một hợp đồng thông minh qua `caver.contract`, hãy tham khảo mã dưới đây.

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


Để triển khai một hàm của hợp đồng thông minh theo loại của nó, bạn có thể dùng các lớp caver-java như được mô tả dưới đây:
  - Lớp `Contract` trong gói `caver.contract` khi người gửi giao dịch hợp đồng thông minh thanh toán khoản phí
  - Lớp `SmartContractExecution` trong gói `caver.transaction` khi người gửi giao dịch hợp đồng thông minh thanh toán khoản phí
  - Lớp `FeeDelegatedSmartContractExecution` trong gói `caver.transaction` khi người trả phí của giao dịch hợp đồng thông minh thanh toán khoản phí
  - Lớp `FeeDelegatedSmartContractExecutionWithRatio` trong gói `canver.transaction` khi người trả phí của giao dịch hợp đồng thông minh thanh toán khoản phí


Để xem cách thực thi một hàm trong hợp đồng thông minh, ở đây, chúng ta sẽ gửi đi một giao dịch thực thi hợp đồng dùng chuỗi "testValue" làm tham số đầu vào của hàm hợp đồng `set` như trong mã ví dụ dưới đây.

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

Để thực thi một hàm của hợp đồng thông minh thông qua giao dịch ủy thác phí, hãy xác định các trường `feeDelegation` và `feePayer` trong lớp `SendOptions` như ví dụ dưới đây.


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

Nếu bạn muốn gửi một giao dịch trong đó người gửi và người trả phí ký riêng biệt nhau khi thực thi một hợp đồng thông minh qua `caver.contract`, hãy tham khảo mã dưới đây:

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

Để tải một đối tượng `contract` cụ thể và gọi một trong các hàm của nó (không gửi giao dịch đi mà chỉ gọi): ví dụ dưới đây minh họa việc gọi một hàm `get` trong hợp đồng.

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

Khi mã trên được thực thi, giá trị sẽ được hiển thị dưới dạng kết quả đầu ra như dưới đây.

```bash
testValue
```

Để biết thêm thông tin, hãy xem [caver-java API][]


## IPFS <a id="ipfs"></a>

IPFS (Hệ thống tập tin InterPlanetary) là một hệ thống tập tin phân tán, dùng để lưu trữ và truy cập các tập tin, trang web, ứng dụng và dữ liệu.

Bạn có thể tải lên và tải xuống một tập tin qua IPFS bằng Caver.


### Kết nối với IPFS <a id="connecting-with-ipfs"></a>

Lớp `IPFS` trong gói `caver.ipfs` được xác định là một biến thành viên của lớp trong `Caver`, vì thế bạn có thể tương tác với IPFS qua `Caver`.

Để sử dụng một đối tượng `IPFS` cụ thể qua đối tượng `Caver` cụ thể, trước tiên, bạn phải gọi phương pháp `setIPFSNode()` để kết nối với một nút IPFS.

Hàm `setIPFSNode()` cần có các tham số sau:
  - URL của Máy chủ API theo giao thức HTTP dẫn đến IPFS
  - Số cổng của máy chủ API theo giao thức HTTP dẫn đến IPFS
  - Liệu máy chủ có dùng SSL hay không.

```java
String host = "The URL of an IPFS node";
int port = 5001; // API host port number
boolean isSSL = true; // API host support ssl 
Caver caver = new Caver();
caver.ipfs.setIPFSNode(host, port, isSSL);
```

### Tải lên một tập tin qua IPFS<a id="uploading-a-file-through-ipfs"></a>

Để tải lên một tập tin qua `IPFS`, hãy dùng `add()` như dưới đây.

Hàm này trả về [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) của tập tin được tải lên.


```java
String filePath = "/path/to/file";
String cid = caver.ipfs.add(filePath);
System.out.println(cid);
```

Kết quả thực thi của mã trên được hiển thị bên dưới.

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

Tương tự, bạn có thể tải lên một mảng byte.

```java
String text = "sample data";
byte[] data = text.getBytes();

String cid = caver.ipfs.add(data);
System.out.println(cid);
```

Kết quả thực thi của mã trên được hiển thị bên dưới.

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

### Tải xuống một tập tin từ IPFS<a id="downloading-a-file-from-ipfs"></a>

Để tải về một tập tin từ `IPFS`, hãy dùng `get()` như dưới đây.

Hàm này cần có CID của tập tin thì mới tải về được.

```java
String cid = "QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq";
byte[] content = caver.ipfs.get(cid);
```


### Chuyển đổi giữa CID và multihash <a id="conversion-between-cid-and-multihash"></a>

Bạn có thể chuyển đổi CID thành [Multihash](https://multiformats.io/multihash/) bằng `toHex()`.

CID là một giá trị được mã hóa Base58 của một multihash. `toHex()` giải mã CID và trả về multihash tương ứng.

```java
String cid = "QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk";
String multihash = caver.ipfs.toHex(cid);
System.out.println(multihash);
```

Kết quả thực thi của mã trên được hiển thị bên dưới.

```java
0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47
```

Để chuyển đổi một multihash thành CID, hãy dùng `fromHex()`.

```java
String multihash = "0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47";
String cid = caver.ipfs.fromHex(multihash);
System.out.println(cid);
```

Kết quả thực thi của mã trên được hiển thị bên dưới.

```java
QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk
```

## Phát hiện giao diện KCT<a id="detect kct interface"></a>

Các hợp đồng KCT (Token tương thích với Klaytn) như [KIP-7][], [KIP-17][] và [KIP-37][] xác định và cung cấp nhiều giao diện đa dạng, và [KIP-13][] cho phép bạn xem liệu một hợp đồng có tuân thủ điều khoản quy định của KCT không, cũng như nó triển khai với giao diện nào bằng cách gửi một truy vấn đến hợp đồng.

[KIP-13][] đã được triển khai trong Caver v1.5.7. Nó có thể phát hiện giao diện thông qua `detectInterface()` cho bất kỳ lớp hợp đồng KCT nào (`KIP7`, `KIP17` và `KIP37`).

### Phát hiện các giao diện KIP-7 <a id="detecting-kip-7-interfaces"></a>

Để phát hiện các giao diện KIP-7, bạn có thể dùng `detectInterface()` trong lớp `KIP7`. Nó trả về ánh xạ giữa mã định danh giao diện KIP-7 và một boolean cho biết giao diện có được hỗ trợ hay không.

`detectInterface()` hỗ trợ cả phương pháp tĩnh và phương pháp đối tượng cụ thể, vì vậy, bạn có thể chọn và sử dụng phương pháp phù hợp với nhu cầu của mình.

Giao diện được phát hiện qua `detectInterface()` đối với `KIP7` được thể hiện trong bảng dưới đây.

| Giao diện     | Mã định danh KIP-13 |
| ------------- | ------------------- |
| IKIP7         | 0x65787371          |
| IKIP7Metadata | 0xa219a025          |
| IKIP7Mintable | 0xeab83e20          |
| IKIP7Burnable | 0x3b5a0bf8          |
| IKIP7Pausable | 0x4d5507ff          |

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

Kết quả thực thi của mã trên được hiển thị bên dưới.

```java
{
  "IKIP7Metatdata" : true,
  "IKIP7Burnable" : true,
  "IKIP7" : true,
  "IKIP7Pausable" : true,
  "IKIP7Mintable" : true
}
```


### Phát hiện các giao diện KIP-17 <a id="detecting-kip-17-interfaces"></a>

Để phát hiện giao diện được triển khai trong hợp đồng token KIP-17, bạn có thể dùng `detectInterface()` trong lớp `KIP17`. Nó trả về ánh xạ giữa mã định danh giao diện KIP-17 và sự hỗ trợ giao diện.

`detectInterface()` hỗ trợ cả phương pháp tĩnh và phương pháp đối tượng cụ thể, vì vậy, bạn có thể chọn và sử dụng phương pháp phù hợp với nhu cầu của mình.

Giao diện được phát hiện qua `detectInterface()` đối với `KIP17` được thể hiện trong bảng dưới đây.

| Giao diện              | Mã định danh KIP-13 |
| ---------------------- | ------------------- |
| IKIP17                 | 0x80ac58cd          |
| IKIP17Metadata         | 0x5b5e139f          |
| IKIP17Enumerable       | 0x780e9d63          |
| IKIP17Mintable         | 0xeab83e20          |
| IKIP17MetadataMintable | 0xfac27f46          |
| IKIP17Burnable         | 0x42966c68          |
| IKIP17Pausable         | 0x4d5507ff          |

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

Kết quả thực thi của mã trên được hiển thị bên dưới.

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

### Phát hiện các giao diện KIP-37 <a id="detecting-kip-37-interfaces"></a>

Để phát hiện giao diện được triển khai trong hợp đồng token KIP-37, bạn có thể dùng `detectInterface()` trong lớp `KIP37`. Nó trả về ánh xạ giữa mã định danh giao diện KIP-37 và sự hỗ trợ giao diện.

`detectInterface()` hỗ trợ cả phương pháp tĩnh và phương pháp đối tượng cụ thể, vì vậy, bạn có thể chọn và sử dụng phương pháp phù hợp.

Giao diện được phát hiện qua `detectInterface()` đối với `KIP37` được thể hiện trong bảng dưới đây.

| Giao diện      | Mã định danh KIP-13 |
| -------------- | ------------------- |
| IKIP37         | 0x6433ca1f          |
| IKIP37Metadata | 0x0e89341c          |
| IKIP37Mintable | 0xdfd9d9ec          |
| IKIP37Burnable | 0x9e094e9e          |
| IKIP37Pausable | 0x0e8ffdb7          |


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

Kết quả thực thi của mã trên được hiển thị bên dưới.

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
