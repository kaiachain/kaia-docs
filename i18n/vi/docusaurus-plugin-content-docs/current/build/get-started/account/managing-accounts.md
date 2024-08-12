# Quản Lý Tài Khoản

## Liệt kê các tài khoản của bạn <a id="list-your-accounts"></a>

Lệnh này sẽ trả lại danh sách tất cả các tài khoản được tạo ra trong thư mục dữ liệu.

### ken <a id="ken"></a>

Từ dòng lệnh này, gọi ra CLI bằng:

```bash
$ ken account list --datadir <DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**LƯU Ý**: Thứ tự của danh sách tài khoản được trả về có thể thay đổi nếu bạn sao chép tập tin lưu trữ khóa từ các nút khác hoặc xóa các tập tin. Do đó, hãy đảm bảo bạn không dựa vào chỉ mục này, hoặc đảm bảo rằng nếu đã sao chép hoặc xóa các tập tin lưu trữ khóa, bạn sẽ kiểm tra và cập nhật các chỉ mục tài khoản vào các tập lệnh.

### Bảng điều khiển JavaScript <a id="javascript-console"></a>

Khi sử dụng bảng điều khiển:

```javascript
> kaia.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

## Mở khóa tài khoản <a id="unlock-accounts"></a>

Nếu muốn sử dụng một tài khoản theo cách không tương tác, bạn cần phải mở khóa tài khoản.

### ken <a id="ken"></a>

Bạn có thể mở khóa các tài khoản và bắt đầu EN trên dòng lệnh bằng tùy chọn `--unlock "{address},{address}"`, dòng lệnh này sẽ nhận danh sách tài khoản được phân tách bằng dấu phẩy \(ở dạng hex hoặc chỉ mục\) làm đối số để có thể mở khóa tài khoản theo chương trình cho một phiên. Việc này rất hữu ích nếu bạn muốn dùng tài khoản của mình từ dApp thông qua RPC. `--unlock` sẽ mở khóa tài khoản đầu tiên trong danh sách. Việc này rất hữu ích khi bạn đã tạo tài khoản theo chương trình, bạn không cần biết tài khoản thực để có thể mở khóa.

Tạo một tài khoản và bắt đầu một nút với tài khoản đã mở khóa:

```bash
$ ken account new --password <(echo this is not secret) --datadir <DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir <DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

Nếu bạn muốn bắt đầu một nút với một tài khoản cụ thể đã mở khóa, bạn có thể dùng một địa chỉ hoặc chỉ mục đề cập đến vị trí địa chỉ trong danh sách tài khoản \(và tương ứng với thứ tự được tạo\).

```bash
$ ken --unlock "0" --datadir <DATADIR>
$ ken --unlock "2" --datadir <DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir <DATADIR>
```

Dòng lệnh này cho phép bạn mở khóa nhiều tài khoản. Trong trường hợp này, đối số để mở khóa là danh sách địa chỉ hoặc chỉ mục tài khoản được phân tách bằng dấu phẩy.

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir <DATADIR>
```

Nếu cấu trúc này được sử dụng theo cách không có tương tác, thì tập tin mật khẩu của bạn sẽ phải chứa mật khẩu tương ứng cho các tài khoản cần dùng, mỗi mật khẩu một dòng.

### Bảng điều khiển JavaScript <a id="javascript-console"></a>

Trên bảng điều khiển, bạn cũng có thể mở khóa các tài khoản \(từng tài khoản một\) trong một khoảng thời gian \(bằng giây\).

```javascript
> personal.unlockAccount(address, "password", 300)
```

Xin lưu ý là chúng tôi KHÔNG khuyến khích sử dụng đối số mật khẩu ở đây, vì lịch sử của bảng điều khiển được ghi lại, nên tài khoản của bạn có thể gặp rủi ro. Bạn đã được cảnh báo.

## Kiểm tra số dư tài khoản <a id="check-account-balance"></a>

### ken <a id="ken"></a>

n/a

### Bảng điều khiển JavaScript <a id="javascript-console"></a>

Để kiểm tra số dư tài khoản của bạn:

```javascript
> kaia.fromPeb(kaia.getBalance("{account}"), "KAIA")
6.5
```

In tất cả số dư bằng hàm JavaScript:

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

Sau đó lệnh này có thể được thực thi bằng:

```javascript
> checkAllBalances();
kaia.accounts[0]: 0xd1ade25ccd3d550a7eb532ac759cac7be09c2719  balance: 63.11848 KAIA
kaia.accounts[1]: 0xda65665fc30803cb1fb7e6d86691e20b1826dee0  balance: 0 KAIA
kaia.accounts[2]: 0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32  balance: 1 KAIA
kaia.accounts[3]: 0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99  balance: 6 KAIA
```

Vì hàm này sẽ biến mất sau khi khởi động lại `ken`, nên có thể sẽ hữu ích nếu bạn lưu trữ các hàm thường dùng để sử dụng sau này.

Trước tiên, hãy lưu định nghĩa hàm `checkAllBalances()` vào một tập tin trên máy tính. Ví dụ, `/Users/username/klayload.js`. Sau đó tải tập tin này từ bảng điều khiển tương tác:

```javascript
> loadScript("/Users/username/klayload.js")
true
```

Tập tin sẽ thay đổi môi trường JavaScript của bạn như thể bạn đã nhập lệnh theo cách thủ công. Bạn hãy cứ thoải mái thử nghiệm!
