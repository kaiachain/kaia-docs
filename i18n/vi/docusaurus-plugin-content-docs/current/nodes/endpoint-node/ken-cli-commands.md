# ken CLI Commands

Tài liệu này cung cấp tổng quan về giao diện dòng lệnh (CLI) `ken` để quản lý các nút đầu cuối Kaia. `ken` CLI là một công cụ mạnh mẽ cho phép nhà phát triển tương tác với mạng Kaia, quản lý tài khoản và thực hiện các tác vụ liên quan đến Endpoint Node.

- [Tổng quan](#overview)
- [Lệnh cơ bản](#basic-commands)
- [Quản lý tài khoản](#account-management)
- [Bảng điều khiển JavaScript](#javascript-console)
- [Giao diện lập trình ứng dụng (API) của Module](#module-apis)

## Tổng quan

**CÁCH SỬ DỤNG:**

```
ken [tùy chọn] lệnh [tùy chọn lệnh] [tham số...]
```

`ken` có các lệnh sau:

**LỆNH:**

- `tài khoản` - Quản lý tài khoản
- `attach` - Khởi động môi trường JavaScript tương tác (kết nối với node)
- `console` - Khởi động môi trường JavaScript tương tác
- `dumpconfig` - Hiển thị các giá trị cấu hình
- `dumpgenesis` - Xuất cấu hình JSON của khối genesis ra stdout (Lệnh này được hỗ trợ từ phiên bản Kaia v1.7.0.)
- `init` - Khởi tạo và thiết lập khối genesis mới
- `snapshot` - Một tập hợp các lệnh dựa trên bản chụp nhanh
- `version` - Hiển thị số phiên bản
- `help, h` - Hiển thị danh sách các lệnh hoặc hướng dẫn sử dụng cho một lệnh

Để xem hướng dẫn sử dụng chi tiết cho từng lệnh, hãy sử dụng tùy chọn `-h`.

```bash
$ ken account -h
Quản lý tài khoản, liệt kê tất cả tài khoản hiện có, nhập khóa riêng tư vào tài khoản
mới, tạo tài khoản mới hoặc cập nhật tài khoản hiện có.
...
Khóa được lưu trữ trong thư mục <DATADIR>/keystore.
Bạn có thể an toàn chuyển toàn bộ thư mục hoặc các khóa riêng lẻ trong đó
giữa các nút Kaia bằng cách sao chép đơn giản.
Hãy đảm bảo sao lưu các khóa của bạn thường xuyên.

SỬ DỤNG:
ken account command [command options] [arguments...]

LỆNH:
list    Hiển thị tóm tắt các tài khoản hiện có
new    Tạo tài khoản mới
update  Cập nhật tài khoản hiện có
import  Nhập khóa riêng tư vào tài khoản mới
```

## Các lệnh cơ bản

### Khởi tạo mạng

```bash
$ ken init -h
init [tùy chọn lệnh] [tham số...]

Lệnh init khởi tạo khối genesis mới và định nghĩa cho mạng lưới.
Đây là hành động phá hủy và sẽ thay đổi mạng lưới mà bạn sẽ tham gia.

...
```

## Quản lý tài khoản

:::warning

Hãy nhớ mật khẩu của bạn. Nếu bạn mất mật khẩu tài khoản của mình, bạn sẽ không thể truy cập vào tài khoản đó. Không có tùy chọn "Quên mật khẩu" ở đây. Đừng bao giờ quên điều đó.

:::

Kaia cung cấp hai công cụ dòng lệnh tiện lợi, `ken` và `JavaScript console`, giúp nhà phát triển quản lý tài khoản. Lưu ý rằng việc xuất khóa riêng tư của bạn dưới định dạng không được mã hóa KHÔNG được hỗ trợ.

### Thư mục dữ liệu

Tệp keystore được lưu trữ trong thư mục `<DATADIR>/keystore`. Bạn có thể chỉ định thư mục dữ liệu như sau. Được khuyến nghị mạnh mẽ nên thực thi lệnh `ken account` với tùy chọn `--datadir`. Đặt đường dẫn thư mục dữ liệu trỏ đến `DATA_DIR` được định nghĩa trong tệp `kend.conf` để chia sẻ tài khoản một cách liền mạch với Nút Endpoint của bạn.

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --datadir "~/kend_home"
```

Nếu bạn không chỉ định thư mục dữ liệu, vị trí mặc định sẽ là như sau:

- **Mac**: `~/Thư viện/KEN`
- **Linux**: `~/.ken`

### Lệnh tài khoản

Tệp nhị phân `ken` của Kaia Endpoint Node cung cấp chức năng quản lý tài khoản thông qua lệnh `account`. Lệnh `account` cho phép bạn tạo tài khoản mới, liệt kê tất cả tài khoản hiện có, nhập khóa riêng tư vào tài khoản mới, chuyển đổi sang định dạng khóa mới nhất và thay đổi mật khẩu.

**Cách sử dụng:**

```bash
$ ken account <command> [tùy chọn...] [tham số...]
```

**Lệnh:**

```bash
$ ken account -help
...
LỆNH:
list    Hiển thị tóm tắt các tài khoản hiện có
new    Tạo tài khoản mới
update  Cập nhật tài khoản hiện có
import  Nhập khóa riêng tư vào tài khoản mới
...
```

Bạn có thể xem thông tin về các lệnh con bằng cách chạy `ken account <command> --help`.

```bash
$ ken account list --help
list [tùy chọn lệnh] [tham số...]

Hiển thị tóm tắt ngắn gọn về tất cả tài khoản

TUỲ CHỌN KAIA:
--dbtype value                        Loại cơ sở dữ liệu lưu trữ blockchain ("leveldb", "badger") (mặc định: "leveldb")
--datadir "/Users/ethan/Library/KEN"  Thư mục dữ liệu cho cơ sở dữ liệu và kho khóa
--keystore                            Thư mục cho kho khóa (mặc định: bên trong datadir)

TÙY CHỌN CƠ SỞ DỮ LIỆU:
--db.no-partitioning  Vô hiệu hóa cơ sở dữ liệu phân vùng cho lưu trữ lâu dài
```

### Tạo tài khoản mới

Điều này sẽ tạo một tài khoản mới và hiển thị địa chỉ trên màn hình. Tệp keystore được tạo trong thư mục dữ liệu.

#### Tệp lưu trữ khóa Kaia

Khi bạn tạo tài khoản, một tệp keystore sẽ được tạo. Tệp keystore là phiên bản được mã hóa của khóa riêng tư Kaia duy nhất của bạn, mà bạn sẽ sử dụng để ký các giao dịch của mình. Tên tệp keystore có định dạng sau:

```
UTC--<created_at UTC ISO8601>-<address hex>
```

Việc chuyển toàn bộ thư mục hoặc tệp keystore riêng lẻ trong đó giữa các nút Kaia là an toàn. Lưu ý rằng nếu bạn thêm khóa vào nút của mình từ một nút khác, thứ tự các tài khoản có thể thay đổi. Vì vậy, hãy đảm bảo rằng bạn không dựa vào chỉ mục trong các script hoặc đoạn mã của mình.

#### ken CLI

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

:::warning

Lưu ý rằng việc sử dụng tệp mật khẩu chỉ dành cho mục đích thử nghiệm; việc lưu trữ mật khẩu trong tệp hoặc tiết lộ mật khẩu theo bất kỳ cách nào khác là không an toàn. Nếu bạn sử dụng cờ mật khẩu cùng với tệp mật khẩu, tốt nhất là đảm bảo rằng tệp đó không thể đọc được hoặc thậm chí không thể liệt kê được đối với bất kỳ ai ngoài bạn. Bạn đạt được điều này bằng cách:

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
Tôi nhập mật khẩu của mình ở đây
^D
```

:::

### Nhập tài khoản

Bạn có thể nhập tài khoản bằng cách sử dụng tệp khóa. Tệp khóa được giả định chứa khóa riêng tư không mã hóa dưới dạng các byte thô EC chuẩn được mã hóa thành hex. Nói một cách đơn giản, đó là khóa riêng tư dưới dạng văn bản thuần túy mà không có tiền tố `0x`.

Chương trình này nhập khóa riêng tư không được mã hóa từ tệp khóa được chỉ định, tạo một tài khoản mới, tạo tệp keystore trong thư mục dữ liệu và hiển thị địa chỉ trong cửa sổ console. Bạn phải nhớ mật khẩu để mở khóa tài khoản của mình trong tương lai.

**LƯU Ý**: Nếu bạn có thể sao chép trực tiếp các tệp keystore của mình sang một phiên bản Kaia khác, cơ chế nhập/xuất này không cần thiết.

#### ken CLI

```bash
$ ken account import --datadir <datadir> <keyfile>
$ ken account import --password <passwordfile> --datadir <datadir> <keyfile>
```

### Danh sách tài khoản của bạn

Điều này sẽ trả về danh sách tất cả các tài khoản được tạo trong thư mục dữ liệu.

#### ken CLI

Từ dòng lệnh, gọi CLI bằng cách:

```bash
$ ken account list --datadir <DATADIR>
$ ken account list --datadir ~/kend_home
Tài khoản #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Tài khoản #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**LƯU Ý**: Thứ tự của danh sách tài khoản đã trả lại có thể thay đổi nếu bạn sao chép các tệp keystore từ các nút khác hoặc xóa các tệp đó. Do đó, hãy đảm bảo rằng bạn không dựa vào chỉ mục hoặc nếu bạn sao chép hoặc xóa các tệp keystore, hãy kiểm tra và cập nhật chỉ mục tài khoản trong các skript của bạn.

### Mở khóa tài khoản

Nếu bạn muốn sử dụng tài khoản mà không cần tương tác, bạn cần phải mở khóa tài khoản đó.

#### ken CLI

Bạn có thể mở khóa tài khoản và khởi chạy EN trên dòng lệnh bằng tùy chọn `--unlock "{address},{address}"`, tùy chọn này nhận danh sách tài khoản được phân tách bằng dấu phẩy (dưới dạng hex hoặc chỉ số) làm tham số, cho phép bạn mở khóa tài khoản một cách tự động cho một phiên làm việc. Điều này hữu ích nếu bạn muốn sử dụng tài khoản của mình từ các ứng dụng phi tập trung (dApps) thông qua giao diện lập trình ứng dụng (RPC).

`--unlock` sẽ mở khóa tài khoản đầu tiên trong danh sách. Điều này hữu ích khi bạn tạo tài khoản một cách tự động, bạn không cần biết thông tin tài khoản thực tế để mở khóa nó.

Tạo tài khoản và khởi chạy một nút với tài khoản đã được mở khóa:

```bash
$ ken account new --password <(echo this is not secret) --datadir <DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir <DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

Nếu bạn muốn khởi động một nút với một tài khoản cụ thể đã được mở khóa, bạn có thể sử dụng địa chỉ hoặc chỉ số tương ứng với vị trí của địa chỉ trong danh sách tài khoản (và tương ứng với thứ tự tạo).

```bash
$ ken --unlock "0" --datadir <DATADIR>
$ ken --unlock "2" --datadir <DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir <DATADIR>
```

Dòng lệnh cho phép bạn mở khóa nhiều tài khoản. Trong trường hợp này, đối số để mở khóa là danh sách các địa chỉ tài khoản hoặc chỉ số được phân tách bằng dấu phẩy.

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir <DATADIR>
```

Nếu cấu trúc này được sử dụng không tương tác, tệp mật khẩu của bạn phải chứa các mật khẩu tương ứng cho các tài khoản liên quan, mỗi tài khoản một dòng.

## JavaScript Console

Kaia Endpoint Node comes with JavaScript console. From the console command line, you can initiate part of Kaia API calls to your EN. To attach to the JavaScript console, execute the following command.

Để kết nối với bảng điều khiển JavaScript, EN phải đang ở trạng thái chạy. Để biết thêm thông tin, vui lòng xem [Hướng dẫn khởi chạy EN](https://docs.kaia.io/nodes/endpoint-node/install-endpoint-nodes/). Bắt đầu một tệp EN và gắn vào console như sau.

### Cách sử dụng

```bash
$ kend start
Khởi động kend: OK
$ ken attach --datadir ~/kend_home
Chào mừng đến với trình điều khiển JavaScript Kaia!
instance: Kaia/vX.X.X/XXXX-XXXX/goX.X.X
datadir: ~/kend_home
modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
>
```

Lệnh `attach` kết nối với nút đang chạy, trong khi lệnh `console` khởi chạy một nút và kết nối với nó.

- `attach` - Khởi động môi trường JavaScript tương tác (kết nối với node)
- `console` - Khởi chạy môi trường JavaScript tương tác

### Thư mục dữ liệu

Khi bạn tạo tài khoản, tệp keystore sẽ được lưu trữ trong thư mục `<DATADIR>/keystore`. Thư mục `<DATADIR>` là thư mục `DATA_DIR` được thiết lập trong tệp `kend.conf`. Nếu bạn làm theo hướng dẫn nhanh với ví dụ được cung cấp, đường dẫn đó phải là `~/kend_home`.

### Lệnh điều khiển

Nhập `personal` hoặc `kaia` để xem danh sách các chức năng có sẵn. Trong hướng dẫn này, chúng ta sẽ tìm hiểu các chức năng sau:

- `tạo tài khoản cá nhân()`
- `personal.importRawKey()`
- `personal.mở khóa tài khoản()`
- `kaia.tài khoản`
- `kaia.getBalance()`

### Tạo tài khoản qua bảng điều khiển

Trên giao diện điều khiển, bạn có thể gọi hàm sau để tạo tài khoản:

```javascript
> personal.tạo_tài_khoản("mật khẩu")
```

Tài khoản được lưu trữ dưới dạng mã hóa. Bạn **phải** nhớ mật khẩu này để mở khóa tài khoản của mình trong tương lai.

### Nhập tài khoản qua bảng điều khiển

```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// Sử dụng khóa ví Kaia
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

### Danh sách tài khoản qua bảng điều khiển

Khi sử dụng bảng điều khiển:

```javascript
> kaia.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

### Mở khóa tài khoản qua bảng điều khiển

Trên bảng điều khiển, bạn cũng có thể mở khóa tài khoản (một tài khoản tại một thời điểm) trong một khoảng thời gian (tính bằng giây).

```javascript
> personal.unlockAccount(địa chỉ, "mật khẩu", 300)
```

Lưu ý rằng chúng tôi KHÔNG khuyến nghị sử dụng tham số mật khẩu ở đây, vì lịch sử lệnh trên console được ghi lại, do đó bạn có thể làm lộ thông tin tài khoản của mình. Bạn đã được cảnh báo.

### Kiểm tra số dư tài khoản

#### Bảng điều khiển JavaScript

Để kiểm tra số dư tài khoản của bạn:

```javascript
> kaia.fromPeb(kaia.getBalance("{account}"), "KAIA")
6.5
```

In tất cả các số dư bằng một hàm JavaScript:

```javascript
function checkAllBalances() {
  var totalBal = 0;
  for (var acctNum in kaia.accounts) {
    var acct = kaia.accounts[acctNum];
    var acctBal = kaia.fromPeb(kaia.getBalance(acct), "KAIA");
    totalBal += parseFloat(acctBal);
    console.log("kaia.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + "KAIA");
  }
  console.log("Total balance: " + totalBal + " KAIA");
};
```

Điều đó có thể được thực thi bằng cách sau:

```javascript
> checkAllBalances();
kaia.accounts[0]: 0xd1ade25ccd3d550a7eb532ac759cac7be09c2719  số dư: 63.11848 KAIA
kaia.accounts[1]: 0xda65665fc30803cb1fb7e6d86691e20b1826dee0  số dư: 0 KAIA
kaia.accounts[2]: 0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32  số dư: 1 KAIA
kaia.accounts[3]: 0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99  số dư: 6 KAIA
```

Vì chức năng này sẽ biến mất sau khi khởi động lại `ken`, việc lưu trữ các chức năng thường dùng để gọi sau này có thể hữu ích. Đầu tiên, lưu định nghĩa hàm `checkAllBalances()` vào một tệp trên máy tính của bạn. Ví dụ: `/Users/username/klayload.js`. Sau đó, tải tệp từ giao diện dòng lệnh tương tác:

```javascript
> loadScript("/Users/username/klayload.js")
true
```

Tệp này sẽ thay đổi môi trường JavaScript của bạn như thể bạn đã nhập các lệnh đó thủ công. Hãy thoải mái thử nghiệm!

## Module APIs

If you type the module name on the console prompt, you will see the available properties and functions of the module. Để biết chi tiết về các chức năng, vui lòng tham khảo [Kaia API](https://docs.kaia.io/references/json-rpc/kaia/account-created/).

```javascript
> personal
{
  listAccounts: [...],
  listWallets: [...],
  deriveAccount: function(),
  ecRecover: function(),
  getListAccounts: function(callback),
  getListWallets: function(callback),
  importRawKey: function(),
  lockAccount: function(),
  ...
}

> personal.listAccounts
["0x960dba2500ab529693ef8e299210768aa0d55ec8", "0x09a04dc9ac3cd92de5ff0d45ae50ff1b618305d9", "0x36662211c072dadbf5fc1e37087ddebd36df986abd", "0xbf9683cf04520eeba6d936a3478de29437c5d048"]
>
```