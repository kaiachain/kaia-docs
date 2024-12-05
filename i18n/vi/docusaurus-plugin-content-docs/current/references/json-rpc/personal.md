---
description: API để quản lý tài khoản và khóa riêng tư trong nút.
---

# personal

Không gian tên `cá nhân` quản lý khóa riêng tư trong kho lưu trữ khóa.

## personal_importRawKey <a id="personal_importrawkey"></a>

Nhập khóa riêng tư chưa mã hóa đã cho (chuỗi hex không có '0x' đứng đầu) hoặc [khóa ví Klaytn](../../learn/accounts.md#klaytn-wallet-key-format) vào kho lưu trữ khóa, mã hóa bằng cụm mật khẩu.
encrypting it with the passphrase.

Trả về địa chỉ của tài khoản đã nhập.

|    Máy khách    | Gọi phương pháp                                                        |
| :-------------: | ---------------------------------------------------------------------- |
| Bảng điều khiển | `personal.importRawKey(keydata, passphrase)`                           |
|       RPC       | `{"method": "personal_importRawKey", "params": [keydata, passphrase]}` |

**Tham số**

| Tên          | Loại | Mô tả                                                                                                                                                              |
| ------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| keydata      | chuỗi | Khóa riêng tư không được mã hóa (chuỗi hex không có '0x' đứng đầu) hoặc một [khóa ví Klaytn](../../learn/accounts.md#klaytn-wallet-key-format). |
| cụm mật khẩu | chuỗi | Cụm mật khẩu để mã hóa.                                                                                                                                            |

**Giá trị trả về**

| Tên     | type  | Mô tả                          |
| ------- | ----- | ------------------------------ |
| address | chuỗi | Địa chỉ của tài khoản đã nhập. |

**Ví dụ**

Bảng điều khiển

```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// Using a Klaytn wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_importRawKey","params":["{private key}", "mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_importRawKey","params":["{private key}0x000x{address}", "mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```

## personal_listAccounts <a id="personal_listaccounts"></a>

Trả về tất cả các địa chỉ tài khoản Klaytn của tất cả các khóa trong kho lưu trữ khóa.
in the key store.

|    Máy khách    | Gọi phương pháp                                     |
| :-------------: | --------------------------------------------------- |
| Bảng điều khiển | `personal.listAccounts`                             |
|       RPC       | `{"method": "personal_listAccounts", "params": []}` |

**Tham số**

Không có

**Giá trị trả về**

| Loại | Mô tả                                         |
| ----- | --------------------------------------------- |
| chuỗi | Danh sách tất cả các địa chỉ tài khoản Klaytn |

Không có

**Ví dụ**

Bảng điều khiển

```javascript
> personal.listAccounts
["0x5e97870f263700f46aa00d967821199b9bc5a120", "0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"]
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listAccounts","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["0xd8d81f52b595cc6135177c9c34ae6130ecad4636","0xda04fb00e2cb5745cef7d8c4464378202a1673ef"]}
```

## personal_listWallets <a id="personal_listwallets"></a>

Trả về danh sách ví mà nút này quản lý.

|    Máy khách    | Gọi phương pháp                                    |
| :-------------: | -------------------------------------------------- |
| Bảng điều khiển | `personal.listWallets`                             |
|       RPC       | `{"method": "personal_listWallets", "params": []}` |

**Tham số**

Không có

**Giá trị trả về**

| Tên        | Loại | Mô tả                        |
| ---------- | ----- | ---------------------------- |
| URL        | chuỗi | Url Ví                       |
| Trạng thái | chuỗi | Trạng thái khoá              |
| Thất bại | chuỗi | Tình trạng lỗi               |
| Tài khoản  | chuỗi | Danh sách địa chỉ tài khoản. |

**Ví dụ**

Bảng điều khiển

```javascript
> personal.listWallets
[
  {
    "url":"keystore:///", 
    "status":"Locked",
    "accounts":[{"address":"0x336010a2f91728ffe01414a87ae5d8af55f310c6","url":"keystore://"}]
  },
  ...
]
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listWallets","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":[{"url":"keystore:///","status":"Locked","accounts":[{"address":"0x336010a2f91728ffe01414a87ae5d8af55f310c6","url":"keystore://"}]}]}
```

## personal_openWallet <a id="personal_openwallet"></a>

Bắt đầu quy trình mở ví cứng, thiết lập kết nối USB và cố gắng xác thực bằng cụm mật khẩu được cung cấp.
the provided passphrase.

:::note

LƯU Ý: Phương thức này có thể trả về một thử thách bổ sung yêu cầu lần mở thứ hai (ví dụ: thử thách ma trận mã PIN Trezor).

:::

|    Máy khách    | Gọi phương pháp                                                  |
| :-------------: | ---------------------------------------------------------------- |
| Bảng điều khiển | `personal.openWallet(url, passhrase)`                            |
|       RPC       | `{"method": "personal_openWallet", "params": [url, passphrase]}` |

**Tham số**

| Tên          | type  | Mô tả               |
| ------------ | ----- | ------------------- |
| URL          | chuỗi | url Ví              |
| Cụm mật khẩu | chuỗi | cụm mật khẩu cho ví |

**Giá trị trả về**

| Tên | type | Mô tả          |
| --- | ---- | -------------- |
| Lỗi | lỗi  | Tình trạng lỗi |

**Ví dụ**

Bảng điều khiển

```javascript
> personal.openWallet("keystore://", "passphrase")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_openWallet","params":["keystore://", "passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## personal_deriveAccount <a id="personal_deriveaccount"></a>

Yêu cầu ví HD để tạo tài khoản mới, có thể ghim tài khoản đó để sử dụng lại sau này.

|    Máy khách    | Gọi phương pháp                                                    |
| :-------------: | ------------------------------------------------------------------ |
| Bảng điều khiển | `personal.deriveAccount(url, path, pin)`                           |
|       RPC       | `{"method": "personal_deriveAccount", "params": [url, path, pin]}` |

**Tham số**

| Tên       | type    | Mô tả              |
| --------- | ------- | ------------------ |
| URL       | chuỗi   | Url Ví             |
| đường dẫn | chuỗi   | đường dẫn dẫn xuất |
| pin       | boolean | pin tùy chọn       |

**Giá trị trả về**

| Tên       | type  | Mô tả                      |
| --------- | ----- | -------------------------- |
| Tài khoản | chuỗi | Địa chỉ của tài khoản mới. |
| Lỗi       | lỗi   | Tình trạng lỗi             |

**Ví dụ**

Bảng điều khiển

```javascript
> personal.deriveAccount(url, path, pin)
"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_deriveAccount","params":[url, path, pin],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"}
```

## personal_newAccount <a id="personal_newaccount"></a>

Tạo một khóa riêng tư mới và lưu trữ nó trong thư mục lưu trữ khóa.
Tệp khóa được mã hóa bằng cụm mật khẩu đã cho.
Trả về địa chỉ của tài khoản mới.

Tại bảng điều khiển Klaytn, `newAccount` sẽ nhắc nhập cụm mật khẩu khi không được cung cấp làm đối số.
it is not supplied as the argument.

|    Máy khách    | Gọi phương pháp                                             |
| :-------------: | ----------------------------------------------------------- |
| Bảng điều khiển | `personal.newAccount(passphrase)`                           |
|       RPC       | `{"method": "personal_newAccount", "params": [passphrase]}` |

**Tham số**

| Tên          | Loại | Mô tả                                                              |
| ------------ | ----- | ------------------------------------------------------------------ |
| cụm mật khẩu | chuỗi | (tùy chọn) cụm mật khẩu được sử dụng để mã hóa. |

**Giá trị trả về**

| Loại | Mô tả                      |
| ----- | -------------------------- |
| chuỗi | Địa chỉ của tài khoản mới. |

**Ví dụ**

Bảng điều khiển

```javascript
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"
```

Cụm mật khẩu cũng có thể được cung cấp dưới dạng chuỗi.

```javascript
> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["helloWorld"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"}
```

## personal_lockAccount <a id="personal_lockaccount"></a>

Xóa khóa riêng tư có địa chỉ đã cho khỏi bộ nhớ.
Tài khoản không còn có thể được sử dụng để gửi giao dịch.

|    Máy khách    | Gọi phương pháp                                           |
| :-------------: | --------------------------------------------------------- |
| Bảng điều khiển | `personal.lockAccount(address)`                           |
|       RPC       | `{"method": "personal_lockAccount", "params": [address]}` |

**Tham số**

| Tên     | type  | Mô tả                      |
| ------- | ----- | -------------------------- |
| address | chuỗi | Địa chỉ tài khoản để khóa. |

**Giá trị trả về**

| Loại | Mô tả                                                                  |
| ----- | ---------------------------------------------------------------------- |
| bool  | `true` nếu tài khoản đã được khóa thành công, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

```javascript
> personal.lockAccount("0xfa415bb3e6231f488ff39eb2897db0ef3636dd32")
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_lockAccount","params":["0xda04fb00e2cb5745cef7d8c4464378202a1673ef"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## personal_unlockAccount <a id="personal_unlockaccount"></a>

Giải mã khóa với địa chỉ đã cho từ kho lưu trữ khóa.

Cả cụm mật khẩu và thời gian mở khóa đều là tùy chọn khi sử dụng bảng điều khiển JavaScript.
Nếu cụm mật khẩu không được cung cấp làm đối số, bảng điều khiển sẽ nhắc cụm mật khẩu theo kiểu tương tác.
the passphrase interactively.

Khóa không được mã hóa sẽ được giữ trong bộ nhớ cho đến khi hết thời gian mở khóa.
Nếu thời gian mở khóa mặc định là 300 giây. Thời gian cụ thể trong 0 giây sẽ mở khóa cho đến khi nút cục bộ Klaytn thoát ra.
of zero seconds unlocks the key until the Klaytn local node exits.

Tài khoản này có thể được sử dụng `klay_sign` và `klay_sendTransaction` khi được mở khóa.

|    Máy khách    | Gọi phương pháp                                                                   |
| :-------------: | --------------------------------------------------------------------------------- |
| Bảng điều khiển | `personal.unlockAccount(address, passphrase, duration)`                           |
|       RPC       | `{"method": "personal_unlockAccount", "params": [address, passphrase, duration]}` |

**Tham số**

| Tên              | Loại | Mô tả                                                                                      |
| ---------------- | ----- | ------------------------------------------------------------------------------------------ |
| address          | chuỗi | Địa chỉ tài khoản để mở khóa.                                                              |
| cụm mật khẩu     | chuỗi | cụm mật khẩu được sử dụng để mã hóa.                                                       |
| khoảng thời gian | int   | (tùy chọn) thời gian mở khóa (mặc định là 300 giây). |

**Giá trị trả về**

| type | Mô tả                                               |
| ---- | --------------------------------------------------- |
| bool | `true` nếu đã được mở khóa, ngược lại sẽ là `false` |

**Ví dụ**

Bảng điều khiển

```javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120")
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```

Cung cấp cụm mật khẩu và thời gian mở khóa làm đối số:

```javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", "foo", 30)
true
```

Nếu bạn muốn nhập cụm mật khẩu và vẫn ghi đè thời gian mở khóa mặc định, hãy đặt `null` làm cụm mật khẩu.
pass `null` as the passphrase.

```
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", null, 30)
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_unlockAccount","params":["0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## personal_replaceRawKey <a id="personal_replacerawkey"></a>

Thay thế tệp khóa được mã hóa trong kho lưu trữ khóa bằng khóa riêng tư được mã hóa đã cho (chuỗi hex không có '0x' đứng đầu) hoặc một [khóa ví Klaytn](../../learn/accounts.md#klaytn-wallet-key-format), mã hóa bằng cụm mật khẩu mới.
encrypting it with the new passphrase.
Nó cũng nhận cụm mật khẩu cũ để giải mã khóa riêng tư cũ trước khi bị thay thế.
Nếu không thể giải mã hoặc không thể tìm thấy tài khoản phù hợp, nó sẽ báo lỗi.

Trả về địa chỉ của tài khoản được thay thế nếu thành công.

|    Máy khách    | Gọi phương pháp                                                                           |
| :-------------: | ----------------------------------------------------------------------------------------- |
| Bảng điều khiển | `personal.replaceRawKey(keydata, oldPassphrase, newPassphrase)`                           |
|       RPC       | `{"method": "personal_replaceRawKey", "params": [keydata, oldPassphrase, newPassphrase]}` |

**Tham số**

| Tên           | type  | Mô tả                                                                                                                                                              |
| ------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| keydata       | chuỗi | Khóa riêng tư không được mã hóa (chuỗi hex không có '0x' đứng đầu) hoặc một [khóa ví Klaytn](../../learn/accounts.md#klaytn-wallet-key-format). |
| oldPassphrase | chuỗi | Cụm mật khẩu để giải mã khóa riêng tư cũ.                                                                                                                          |
| newPassphrase | chuỗi | Cụm mật khẩu để mã hóa khóa riêng tư mới.                                                                                                                          |

**Giá trị trả về**

| Tên     | type  | Mô tả                                |
| ------- | ----- | ------------------------------------ |
| address | chuỗi | Địa chỉ của tài khoản được thay thế. |

**Ví dụ**

Bảng điều khiển

```javascript
> personal.replaceRawKey('{private key}', 'myoldpassword', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
> personal.replaceRawKey('{private key}0x000x{address}', 'myoldpassword', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_replaceRawKey","params":["{private key}", "myoldpassword", mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_replaceRawKey","params":["{private key}0x000x{address}", "myoldpassword", mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```

## personal_sendAccountUpdate <a id="personal_sendaccountupdate"></a>

Xác thực cụm mật khẩu đã cho và gửi một giao dịch [TxTypeAccountUpdate](../../learn/transactions/basic.md#txtypeaccountupdate).
Đối tượng giao dịch phải có các trường `nơi bắt đầu` và `khóa`. Các trường khác như `gas`, `Giá ga` và `số dùng một lần` được đặt nội bộ nếu không được chỉ định.
Nếu cụm mật khẩu có thể giải mã khóa riêng tư của `tx.from` và giao dịch được xác minh, giao dịch sẽ được ký và gửi lên mạng.
the transaction is signed and submitted onto the network.
Tài khoản không được mở khóa trên toàn cầu trong nút và không thể được sử dụng trong các lệnh gọi RPC khác.

|    Máy khách    | Gọi phương pháp                                                        |
| :-------------: | ---------------------------------------------------------------------- |
| Bảng điều khiển | `personal.sendAccountUpdate(tx, passphrase)`                           |
|       RPC       | `{"method": "personal_sendAccountUpdate", "params": [tx, passphrase]}` |

**Tham số**

| Tên          | type  | Mô tả                                                          |
| ------------ | ----- | -------------------------------------------------------------- |
| tx           | chuỗi | Đối tượng giao dịch. Yêu cầu chỉ định `nơi bắt đầu` và `khóa`. |
| cụm mật khẩu | chuỗi | Cụm mật khẩu để giải mã khóa riêng tư của `tx.from`.           |

**Giá trị trả về**

| type          | Mô tả                                                                         |
| ------------- | ----------------------------------------------------------------------------- |
| chuỗi 32 byte | một hàm băm giao dịch nếu thành công. Nếu không, sẽ đưa ra một thông báo lỗi. |

**Ví dụ**

Bảng điều khiển

```javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", key:"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}
undefined
> personal.sendAccountUpdate(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```

HTTP RPC

**LƯU Ý**: Hàm `klay.toPeb()` không thể thực thi trong HTTP RPC.

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendAccountUpdate","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","key":"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}, "passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendTransaction <a id="personal_sendtransaction"></a>

Xác thực cụm mật khẩu đã cho và gửi một giao dịch [TxTypeLegacy](../../learn/transactions/basic.md#txtypelegacytransaction).
Đối tượng giao dịch phải có `nơi bắt đầu` và `nơi đến` ngoại trừ trường hợp triển khai hợp đồng.
Nên bỏ qua `nơi đến` nếu giao dịch triển khai là hợp đồng thông minh.
Nếu không chỉ định `giá trị`, giá trị sẽ được đặt thành 0 trong nội bộ.
Các trường khác như `gas`, `gasPrice` và `số dùng một lần` được đặt thành các giá trị phù hợp trong nội bộ nếu không được chỉ định.
Nếu cụm mật khẩu có thể giải mã khóa riêng tư của `tx.from` và giao dịch được xác minh, giao dịch sẽ được ký và gửi lên mạng.
Tài khoản không được mở khóa trên toàn cầu trong nút và không thể được sử dụng trong các lệnh gọi RPC khác.

|    Máy khách    | Gọi phương pháp                                                      |
| :-------------: | -------------------------------------------------------------------- |
| Bảng điều khiển | `personal.sendTransaction(tx, passphrase)`                           |
|       RPC       | `{"method": "personal_sendTransaction", "params": [tx, passphrase]}` |

**Tham số**

| Tên          | Loại | Mô tả                                                                                                                                       |
| ------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| tx           | chuỗi | Đối tượng giao dịch. `nơi bắt đầu` là trường bắt buộc. `nơi đến`, `giá trị`, `gas`, `gasPrice` và `số dùng một lần` là các trường tùy chọn. |
| cụm mật khẩu | chuỗi | Cụm mật khẩu để giải mã khóa riêng tư của `tx.from`.                                                                                        |

**Giá trị trả về**

| Loại         | Mô tả                                                                         |
| ------------- | ----------------------------------------------------------------------------- |
| chuỗi 32 byte | một hàm băm giao dịch nếu thành công. Nếu không, sẽ đưa ra một thông báo lỗi. |

**Ví dụ**

Bảng điều khiển

```javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, "KLAY")}
undefined
> personal.sendTransaction(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```

HTTP RPC

**LƯU Ý**: Hàm `klay.toPeb()` không thể thực thi trong HTTP RPC.

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendTransaction","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendValueTransfer <a id="personal_sendvaluetransfer"></a>

Xác thực cụm mật khẩu đã cho và gửi một giao dịch [TxTypeValueTransfer](../../learn/transactions/basic.md#txtypevaluetransfer).
Đối tượng giao dịch phải có các trường `nơi bắt đầu`, `nơi đến` và `giá trị`. Các trường khác như `gas`, `gasPrice` và `số dùng một lần` được đặt nội bộ nếu không được chỉ định.
Nếu cụm mật khẩu có thể giải mã khóa riêng tư của `tx.from` và giao dịch được xác minh, giao dịch sẽ được ký và gửi lên mạng.
the transaction is signed and submitted onto the network.
Tài khoản không được mở khóa trên toàn cầu trong nút và không thể được sử dụng trong các lệnh gọi RPC khác.

|    Máy khách    | Gọi phương pháp                                                        |
| :-------------: | ---------------------------------------------------------------------- |
| Bảng điều khiển | `personal.sendValueTransfer(tx, passphrase)`                           |
|       RPC       | `{"method": "personal_sendValueTransfer", "params": [tx, passphrase]}` |

**Tham số**

| Tên          | Loại | Mô tả                                                                        |
| ------------ | ----- | ---------------------------------------------------------------------------- |
| tx           | chuỗi | Đối tượng giao dịch. Yêu cầu chỉ định `nơi bắt đầu`, `nơi đến` và `giá trị`. |
| cụm mật khẩu | chuỗi | Cụm mật khẩu để giải mã khóa riêng tư của `tx.from`.                         |

**Giá trị trả về**

| Loại         | Mô tả                                                                         |
| ------------- | ----------------------------------------------------------------------------- |
| chuỗi 32 byte | một hàm băm giao dịch nếu thành công. Nếu không, sẽ đưa ra một thông báo lỗi. |

**Ví dụ**

Bảng điều khiển

```javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, "KLAY")}
undefined
> personal.sendValueTransfer(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```

HTTP RPC

**LƯU Ý**: Hàm `klay.toPeb()` không thể thực thi trong HTTP RPC.

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendValueTransfer","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sign <a id="personal_sign"></a>

Phương thúc `ký` tính toán chữ ký dành riêng cho Klaytn với: `sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))`
`sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))`

Việc thêm tiền tố vào thông báo giúp chữ ký đã tính toán có thể được nhận dạng là chữ ký dành riêng cho Klaytn. Điều này ngăn chặn việc lạm dụng khi một DApp độc hại có thể ký dữ liệu tùy ý (_ví dụ:_ giao dịch) và sử dụng chữ ký để mạo danh nạn nhân.

Xem `personal_ecRecover` để xác minh chữ ký.

|    Máy khách    | Gọi phương pháp                                                         |
| :-------------: | ----------------------------------------------------------------------- |
| Bảng điều khiển | `personal.sign(message, tài khoản, password)`                           |
|       RPC       | `{"method": "personal_sign", "params": [message, tài khoản, password]}` |

**Tham số**

| Tên       | Loại | Mô tả                            |
| --------- | ----- | -------------------------------- |
| thông báo | chuỗi | Thông báo cần ký.                |
| tài khoản | chuỗi | Địa chỉ tài khoản.               |
| mật khẩu  | chuỗi | Cụm mật khẩu được sử dụng để ký. |

**Giá trị trả về**

| type  | Mô tả   |
| ----- | ------- |
| chuỗi | Chữ ký. |

**Ví dụ**

Bảng điều khiển

```javascript
> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0xdead","0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"}
```

## personal_signTransaction <a id="personal_signtransaction"></a>

Thiết lập cấu hình mặc định và ký giao dịch đã cho.

:::note

LƯU Ý: Việc gửi mật khẩu tài khoản của bạn qua kết nối HTTP RPC không an toàn là rất nguy hiểm. Sử dụng [klay_signTransaction](./klay/transaction.md#klay_signtransaction).

:::

**Tham số**

Các tham số bắt buộc phụ thuộc vào loại giao dịch.
Kiểm tra các tham số phù hợp trong [Làm việc với các loại giao dịch Klaytn](klay/transaction-type-support.md).

**Giá trị trả về**

| type     | Mô tả               |
| -------- | ------------------- |
| raw      | Giao dịch thô đã ký |
| tx       | Đối tượng giao dịch |
| mật khẩu | Mật khẩu người gửi  |

## personal_ecRecover <a id="personal_ecrecover"></a>

`ecRecover` trả về địa chỉ được liên kết với khóa riêng tư được sử dụng để tính toán chữ ký trong `personal_sign`.

|    Máy khách    | Gọi phương pháp                                                    |
| :-------------: | ------------------------------------------------------------------ |
| Bảng điều khiển | `personal.ecRecover(message, signature)`                           |
|       RPC       | `{"method": "personal_ecRecover", "params": [message, signature]}` |

**Tham số**

| Tên       | Loại | Mô tả      |
| --------- | ----- | ---------- |
| thông báo | chuỗi | Thông báo. |
| chữ ký    | chuỗi | Chữ ký.    |

**Giá trị trả về**

| Loại | Mô tả              |
| ----- | ------------------ |
| chuỗi | Địa chỉ tài khoản. |

**Ví dụ**

Bảng điều khiển

```javascript
> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
> personal.ecRecover("0xdeadbeaf", "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b")
"0x9b2055d370f73ec7d8a03e965129118dc8f5bf83"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0xdead","0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"}

$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_ecRecover","params":["0xdead","0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```
