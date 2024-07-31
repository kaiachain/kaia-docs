# Tạo tài khoản

## Tạo tài khoản mới <a id="creating-a-new-account"></a>

Quy trình này sẽ tạo một tài khoản mới và in địa chỉ lên màn hình. Một tập tin lưu trữ khóa sẽ được bảo trong thư mục dữ liệu.

**Tập tin lưu trữ khóa Kaia**

Khi bạn tạo một tài khoản, một tập tin lưu trữ khóa sẽ được tạo ra. Tập tin lưu trữ khóa là phiên bản được mã hóa của mã khóa riêng tư Kaia mà bạn sẽ dùng để ký các giao dịch của mình. Tên của tập tin lưu trữ khóa có định dạng sau:

- `UTC--<created_at UTC ISO8601>-<address hex>`

Việc chuyển toàn bộ thư mục hoặc tập tin lưu trữ khóa riêng lẻ trong đó giữa các nút Kaia là an toàn. Xin lưu ý rằng trong trường hợp bạn đang thêm mã khóa vào nút của mình từ một nút khác, thì thứ tự của các tài khoản có thể thay đổi. Vì thế, hãy đảm bảo là bạn không dựa vào chỉ mục trong đoạn mã hoặc tập lệnh của mình.

### ken <a id="ken"></a>

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

**`CẢNH BẢO`**: Lưu ý rằng việc dùng một tập tin mật khẩu chỉ dành cho quá trình thử nghiệm; bạn không nên lưu mật khẩu vào một tập tin hoặc để lộ mật khẩu dưới bất kỳ hình thức nào khác. Nếu bạn sử dụng tính năng gắn cờ mật khẩu trong một tập tin mật khẩu, hãy đảm bảo rằng không ai có thể thấy hoặc đọc được tập tin này ngoài bạn. Để thực hiện việc này:

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
I type my pass here
^D
```

### Bảng điều khiển JavaScript <a id="javascript-console"></a>

Trên bảng điều khiển, bạn có thể gọi ra hàm sau để tạo tài khoản:

```javascript
> personal.newAccount("passphrase")
```

Tài khoản được lưu bằng định dạng mã hóa. Bạn **phải** nhớ cụm mật khẩu này để mở khóa tài khoản của mình trong tương lai.

## Nhập tài khoản <a id="importing-an-account"></a>

Bạn có thể nhập một tài khoản bằng tập tin khóa. Tập tin khóa này được giả định là có chứa một mã khóa riêng tư chưa mã hóa dưới dạng byte thô EC chuẩn được mã hóa thành hex. Nói đơn giản thì nó là một mã khóa riêng tư dưới dạng văn bản thuần, không có `0x` đứng ở đầu.

Tập tin này nhập một khóa riêng tư chưa được mã hóa từ tập tin khóa đã cho, tạo tài khoản mới, tạo một tập tin lưu trữ khóa trong thư mục dữ liệu và in địa chỉ vào bảng điều khiển. Bạn phải nhớ cụm mật khẩu này để mở khóa tài khoản của mình trong tương lai.

**LƯU Ý**: Nếu có thể sao chép trực tiếp các tập tin lưu trữ khóa của mình vào một phiên bản Klaytn khác, bạn không cần đến cơ chế nhập/xuất này/xuất này.

### ken <a id="ken-1"></a>

```bash
$ ken account import --datadir <datadir> <keyfile>
$ ken account import --password <passwordfile> --datadir <datadir> <keyfile>
```

### Bảng điều khiển JavaScript <a id="javascript-console-1"></a>

```bash
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"​

// Using a Kaia wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```
