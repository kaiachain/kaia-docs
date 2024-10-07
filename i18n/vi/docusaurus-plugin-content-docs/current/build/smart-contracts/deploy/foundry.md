# Triển khai hợp đồng thông minh sử dụng Foundry

![](/img/banners/kaia-foundry.png)

## Giới thiệu

Foundry là một bộ khung phát triển hợp đồng thông minh, viết bằng ngôn ngữ Rust, cho phép các nhà phát triển quản lý và lập hợp đồng, chạy thử nghiệm, triển khai hợp đồng và tương tác với mạng từ dòng lệnh thông qua các tập lệnh solidity.

Foundry bao gồm bốn công cụ CLI chính, cho phép phát triển hợp đồng thông minh một cách nhanh chóng và theo mô-đun, cụ thể là:

- [Forge](https://github.com/foundry-rs/foundry/tree/master/forge): Bạn có thể triển khai, thử nghiệm và lập hợp đồng thông minh bằng Forge.
- [Cast](https://github.com/foundry-rs/foundry/tree/master/cast): Cast giúp việc tương tác với các hợp đồng thông minh EVM trở nên đơn giản. Trong đó bao gồm các hoạt động lấy dữ liệu chuỗi, gửi giao dịch và những hoạt động khác.
- [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil): Bạn có cần khởi động một nút cục bộ không? Anvil là một môi trường nút cục bộ do Foundry cung cấp.
- [Chisel](https://github.com/foundry-rs/foundry/blob/master/chisel): REPL solidity nhanh chóng, hữu dụng và chi tiết.

Trong hướng dẫn này, bạn sẽ:

- Tạo một dự án foundry đơn giản.
- Lập và thử nghiệm một hợp đồng thông minh mẫu bằng Foundry.
- Triển khai các hợp đồng thông minh bằng Foundry vào mạng Kairos của Kaia.
- Khám phá việc phân nhánh mạng chính thức bằng cast và anvil.

## Điều kiện tiên quyết

Để làm theo hướng dẫn này, bạn cần đáp ứng các điều kiện tiên quyết sau:

- Trình biên tập mã: một trình biên tập mã nguồn như [VS-Code](https://code.visualstudio.com/download).
- [Metamask](../../tutorials/connecting-metamask#install-metamask): được dùng để triển khai hợp đồng, ký giao dịch và tương tác với hợp đồng.
- Điểm cuối RPC: bạn có thể nhận từ một trong những [Nhà cung cấp điểm cuối](../../../references/public-en.md) được hỗ trợ.
- KAIA thử nghiệm từ [Vòi](https://faucet.kaia.io): nạp tiền vào tài khoản với một lượng KAIA vừa đủ.
- Cài đặt [Rust](https://www.rust-lang.org/tools/install) và [Foundry](https://github.com/foundry-rs/foundry#installation).

## Thiết lập môi trường phát triển

Để kiểm tra xem việc cài đặt foundry có thành công không, hãy chạy lệnh dưới đây:

```bash
forge -V
```

**Kết quả đầu ra**

![](/img/build/get-started/forge-version.png)

Sau khi cài đặt foundry thành công, bạn sẽ có quyền truy cập vào các công cụ CLI (forge, cast, anvil, chisel) có sẵn trong foundry. Hãy cùng lập dự án foundry bằng các bước sau:

**Bước 1**: Để bắt đầu một dự án mới, hãy chạy lệnh sau:

```bash
forge init foundry_example 
```

**Bước 2**: Điều hướng đến thư mục dự án của bạn.

```bash
cd foundry_example
ls	 
```

Sau khi khởi tạo một dự án foundry, thư mục hiện tại của bạn sẽ bao gồm:

- **src**: thư mục mặc định cho các hợp đồng thông minh của bạn.
- **tests**: thư mục mặc định cho các thử nghiệm.
- **foundry.toml**: tập tin cấu hình dự án mặc định.
- **lib**:  thư mục mặc định cho các phần phụ thuộc của dự án.
- **script**: thư mục mặc định cho các tập tin tập lệnh solidity.

## Hợp đồng thông minh mẫu

Trong phần này, chúng ta sẽ dùng hợp đồng đối ứng mẫu trong dự án foundry được khởi tạo. Tập tin `counter.sol` trong thư mục `src/` cần phải có dạng:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Counter {
    uint256 public number;
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
}
```

**Hướng dẫn về mã**

Đây là hợp đồng thông minh của bạn. **Dòng 1** cho thấy Foundry sử dụng phiên bản Solidity 0.8.13 hoặc cao hơn. Từ **dòng 4-12**, một hợp đồng thông minh `Counter` đã được tạo. Hợp đồng này chỉ chứa một số mới bằng cách sử dụng hàm **setNumber** và tăng số đó bằng cách gọi ra hàm **increment**.

## Thử nghiệm hợp đồng thông minh

Foundry cho phép chúng ta viết thử nghiệm bằng solidity thay vì javascript như trong các bộ khung phát triển hợp đồng thông mình khác. Trong dự án foundry đã khởi tạo, `test/Counter.t.sol` là ví dụ về một thử nghiệm viết bằng solidity. Mã sẽ có dạng:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Counter.sol";
contract CounterTest is Test {
    Counter public counter;
    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }
    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

Mã trên cho thấy bạn đã nhập thư viện tiêu chuẩn của forge và Counter.sol.

Các bài kiểm tra ở trên kiểm tra các điểm sau:

- Số đó có tăng lên không?
- Số đó có bằng với số đã đặt không?

Để kiểm tra xem thử nghiệm của bạn có chạy ổn hay không, hãy chạy lệnh sau:

```bash
forge test
```

**Kết quả đầu ra**

![](/img/build/get-started/forge-test.png)

Để tìm hiểu thêm về việc viết thử nghiệm, thử nghiệm nâng cao và các tính năng khác, hãy tham khảo [Tài liệu của Foundry](https://book.getfoundry.sh/forge/tests).

## Lập hợp đồng

Lập hợp đồng bằng lệnh sau:

```bash
forge build 
```

## Triển khai hợp đồng

Để triển khai một hợp đồng bằng foundry, bạn phải cung cấp một URL RPC và một khóa riêng tư của tài khoản triển khai hợp đồng đó. Hãy xem danh sách [rpc-providers](../../../references/public-en.md) trên Kaia để tìm rpc-url của bạn, và tạo một tài khoản bằng [MetaMask](../../tutorials/connecting-metamask#install-metamask).

**Bước 1**: Để triển khai hợp đồng của bạn trên mạng Baobab của Klaytn, hãy chạy lệnh dưới đây:

```bash
$ forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/Counter.sol:Counter
```

**Ví dụ**

```bash
forge create --rpc-url https://public-en-kairos.node.kaia.io --private-key hhdhdhdhprivatekeyhdhdhdhud src/Counter.sol:Counter
```

**CẢNH BÁO: Hãy thay thế đối số khóa riêng tư bằng khóa riêng tư của bạn từ MetaMask. Hãy cẩn thận và đừng để lộ khóa riêng tư của bạn.**

**Kết quả đầu ra**

![](/img/build/get-started/foundry-create.png)

**Step 2**: Open [Kaiascope](https://kairos.kaiascope.com/tx/0x669e39c9661fdab59aa34989b58b3f89376a93f846a0c71d2858918f58a307e2?tabId=internalTx) to check if the counter contract deployed successfully.

**Bước 3**: Sao chép và dán hàm băm của giao dịch vào trường tìm kiếm và nhấn Enter. Bạn sẽ thấy hợp đồng vừa được triển khai.

![](/img/build/get-started/forge-scope.png)

## Tương tác với hợp đồng

Sau triển khai thành công hợp đồng thông minh của bạn, bạn cần gọi và thực thi các hàm đúng cách. Hãy cùng tương tác với các hợp đồng đã triển khai trên mạng Kairos của Kaia bằng [Cast](https://book.getfoundry.sh/reference/cast/cast-send.html).  Trong phần này, bạn sẽ học cách sử dụng [cast call](https://book.getfoundry.sh/reference/cast/cast-call) để thực thi hàm `chỉ độc` và [cast send](https://book.getfoundry.sh/reference/cast/cast-send) để thực thi các hàm `viết`.

**A. cast call**: Để nhận số được lưu trữ trong hợp đồng, bạn sẽ gọi hàm `number`. Chạy lệnh dưới đây để xem cách hoạt động.

```bash
cast call YOUR_CONTRACT_ADDRESS "number()" --rpc-url RPC-API-ENDPOINT-HERE
```

**Ví dụ**

```bash
cast call 0xe4d576c447733da7ca9197e88d34a74c3c865cff "number()" --rpc-url https://public-en-kairos.node.kaia.io
```

**Kết quả đầu ra**

![](/img/build/get-started/cast-call-number.png)

Bạn sẽ nhận được dữ liệu này dưới định dạng thập lục phân:

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```

Tuy nhiên, để nhận được kết quả mong muốn, hãy dùng cast để chuyển đổi kết quả trên. Trong trường hợp này, dữ liệu là một số, vì thế bạn có thể đổi nó thành cơ số 10 để nhận được kết quả 0:

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```

**Kết quả đầu ra**

![](/img/build/get-started/cast-call-0.png)

**B. cast send**: Để ký và xuất bản một giao dịch như thực thi hàm `setNumber` trong hợp đồng đối ứng, hãy chạy lệnh dưới đây:

```bash
cast send --rpc-url=<RPC-URL> <CONTRACT-ADDRESS> “setNumber(uint256)” arg --private-key=<PRIVATE-KEY>
```

**Ví dụ**

```bash
cast send --rpc-url=https://public-en-kairos.node.kaia.io 0xe4d576c447733da7ca9197e88d34a74c3c865cff "setNumber(uint256)"  10 --private-key=<private key>
```

**Kết quả đầu ra**

![](/img/build/get-started/cast-send-setNum.png)

**Kiểm tra chéo số**

```bash
cast call 0xe4d576c447733da7ca9197e88d34a74c3c865cff "number()" --rpc-url https://public-en-kairos.node.kaia.io
```

**Kết quả đầu ra**

![](/img/build/get-started/cast-call-10.png)

Bạn sẽ nhận được dữ liệu này dưới định dạng thập lục phân:

```bash
0x000000000000000000000000000000000000000000000000000000000000000a
```

Tuy nhiên, để nhận được kết quả mong muốn, hãy dùng cast để chuyển đổi kết quả trên. Trong trường hợp này, dữ liệu là một số, vì thế bạn có thể đổi nó thành cơ số 10 để nhận được kết quả 10:

```bash
cast --to-base 0x000000000000000000000000000000000000000000000000000000000000000a 10
```

**Kết quả đầu ra**

![](/img/build/get-started/cast-call-result-10.png)

## Phân nhánh mạng chính thức bằng Cast và Anvil

Foundry cho phép chúng ta mô phỏng mạng lưới chính thức thành mạng phát triển cục bộ ([Anvil](https://book.getfoundry.sh/reference/anvil/)). Ngoài ra, bạn cũng có thể tương tác và thử nghiệm hợp đồng trên mạng thật bằng [Cast](https://book.getfoundry.sh/reference/cast/).

### Bắt đầu

Khi đã thiết lập và khởi động dự án Foundry xong, bạn có thể mô phỏng mạng lưới chính thức (cypress) bằng cách chạy lệnh dưới đây:

```bash
anvil --fork-url rpc-url
```

**Ví dụ**

```bash
anvil --fork-url https://archive-en.node.kaia.io
```

**Kết quả đầu ra**

![](/img/build/get-started/anvil-localnode.png)

Sau khi chạy thành công lệnh này, giao diện dòng lệnh của bạn sẽ có dạng như hình trên. Bạn sẽ có 10 tài khoản được tạo ra với các khóa riêng tư và công khai, kèm theo 10.000 token được nạp sẵn. Máy chủ RPC của chuỗi được mô phỏng sẽ nhận và xử lý khối tại `127.0.0.1:8545/`.

Để xác minh rằng bạn đã mô phỏng mạng lưới, bạn có thể truy vấn số khối gần nhất:

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

Bạn có thể chuyển đổi kết quả từ nhiệm vụ trên từ [hex sang decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html). Bạn sẽ nhận được số khối mới nhất từ lần bạn phân nhánh mạng lưới. Để xác minh điều này, hãy kiểm tra chéo số khối trên [Kaiascope](https://kaiascope.com/block/118704896?tabId=txList).

### Hình minh họa

Trong phần này, bạn sẽ tìm hiểu cách để chuyển token oUSDC từ một người có oUSDC sang một tài khoản được tạo bởi Anvil (0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob)

**Chuyển oUSDC**

Đi đến Kaiascope và tìm người nắm giữ token oUSDC (ở đây). Hãy chọn một tài khoản ngẫu nhiên. Trong ví dụ này, ta sẽ dùng `0x8e61241e0525bd45cfc43dd7ba0229b422545bca`.

Hãy cùng xuất hợp đồng và tài khoản thành các biến của môi trường:

```bash
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export oUSDC=0x754288077d0ff82af7a5317c7cb8c444d421d103
export oUSDCHolder=0x8e61241e0525bd45cfc43dd7ba0229b422545bca
```

Chúng ta có thể kiểm tra số dư của Bob bằng cast call:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**Kết quả đầu ra**

![](/img/build/get-started/oUsdcBob4.png)

Tương tự, ta cũng có thể kiểm tra số dư của người nắm giữ oUSDC bằng cast call:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**Kết quả đầu ra**

![](/img/build/get-started/oUsdcHolder4.png)

Hãy cùng chuyển một ít token từ người dùng may mắn này sang cho Alice bằng cast send:

````bash
cast rpc anvil_impersonateAccount $oUSDCHolder    
cast send $oUSDC \
--unlocked \
--from $oUSDCHolder\
 "transfer(address,uint256)(bool)" \
 $BOB \
 1000000
```0000
````

**Kết quả đầu ra**

![](/img/build/get-started/cast-send.png)

Hãy cùng kiểm tra xem việc chuyển tiền có thành công không:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```

**Kết quả đầu ra**

![](/img/build/get-started/oUsdcBobAfter.png)

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```

**Kết quả đầu ra**

![](/img/build/get-started/oUsdcHolderAfter.png)

Để được hướng dẫn sâu hơn về foundry, vui lòng tham khảo [Tài liệu Foundry](https://book.getfoundry.sh/). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/kaiachain/kaia-dapp-mono/tree/main/examples/tools/foundry).
