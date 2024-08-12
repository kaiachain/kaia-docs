# Quản lý tài khoản

**`CẢNH BÁO`**: Hãy ghi nhớ mật khẩu của bạn. Nếu quên mật khẩu của tài khoản, bạn sẽ không thể truy cập tài khoản đó nữa. **Ở đây không có tùy chọn** _**quên mật khẩu**_\*\*. Hãy đừng bao giờ quên mật khẩu. \*\*

Klaytn cung cấp hai công cụ tạo dòng lệnh hữu ích, `ken` và `bảng điều khiển JavaScript`, giúp các nhà phát triển quản lý tài khoản. Xin lưu ý rằng chúng tôi KHÔNG hỗ trợ việc xuất mã khóa riêng tư theo định dạng không được mã hóa.

## ken <a id="ken"></a>

Mã nhị phân nút điểm cuối Kaia `ken` cho phép quản lý tài khoản thông qua lệnh `tài khoản`. Lệnh `tài khoản` cho phép bạn tạo ra các tài khoản mới, liệt kê tất cả các tài khoản hiện có, nhập mã khóa riêng tư vào một tài khoản mới, chuyển sang định dạng mã khóa mới nhất và thay đổi mật khẩu của bạn.

### Cách sử dụng <a id="usage"></a>

```bash
$ ken account <command> [options...] [arguments...]
```

**Lệnh**

```bash
$ ken account -help
...
COMMANDS:
     list    Print summary of existing accounts
     new     Create a new account
     update  Update an existing account
     import  Import a private key into a new account
...
```

Bạn có thể nhận thông tin về các lệnh con bằng `ken account <command> --help`.

```text
$ ken account list --help
list [command options] [arguments...]

Print a short summary of all accounts

KAIA OPTIONS:
  --dbtype value                        Blockchain storage database type ("leveldb", "badger") (default: "leveldb")
  --datadir "/Users/ethan/Library/KEN"  Data directory for the databases and keystore
  --keystore                            Directory for the keystore (default = inside the datadir)

DATABASE OPTIONS:
  --db.no-partitioning  Disable partitioned databases for persistent storage
```

### Thư mục dữ liệu <a id="data-directory"></a>

Các tập tin lưu trữ khóa được lưu trữ trong `<DATADIR>/keystore`. Bạn có thể chỉ định thư mục dữ liệu như sau. Chúng tôi đề nghị bạn nên thực thi lệnh `ken account` với tùy chọn `--datadir`. Chỉ thư mục dữ liệu đến `DATA_DIR` đặt trong `kend.conf` để chia sẻ các tài khoản của bạn một cách suôn sẻ với Nút điểm cuối.

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --datadir "~/kend_home"
```

Nếu bạn không chỉ định thư mục dữ liệu, vị trí mặc định sẽ như sau.

- Mac: `~/Library/KEN`
- Linux: `~/.ken`

## Bảng điều khiển JavaScript <a id="javascript-console"></a>

Để kết nối với biểu giá điều khiển JavaScript, EN phải ở trạng thái đang chạy. Để biết thêm thông tin, hãy xem [Khởi chạy EN](../../smart-contracts/deploy/ken.md). Khởi chạy EN và kết nối với bảng điều khiển như dưới đây.

### Cách sử dụng <a id="usage"></a>

```bash
$ kend start
Starting kend: OK

$ ken attach ~/kend_home/kaia.ipc
Welcome to the Kaia JavaScript console!

instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

**Lệnh**

Gõ `personal` hoặc `kaia` để xem danh sách các hàm có sẵn. Trong bài hướng dẫn này, chúng ta sẽ cùng nghiên cứu các hàm sau.

```bash
> personal.newAccount()
> personal.importRawKey()
> personal.unlockAccount()
> kaia.accounts
> kaia.getBalance()
```

### Thư mục dữ liệu <a id="data-directory"></a>

Khi bạn tạo một tài khoản, tập tin lưu trữ khóa sẽ được lưu trữ trong `<DATADIR>/keystore`. `<DATADIR>` là `DATA_DIR` được đặt trong `kend.conf`. Nếu bạn làm theo hướng dẫn bắt đầu nhanh với ví dụ đã cho, thư mục đó sẽ phải là `~/kend_home`.
