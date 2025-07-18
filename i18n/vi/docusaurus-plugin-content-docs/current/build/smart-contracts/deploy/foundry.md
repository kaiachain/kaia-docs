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

- Code editor: a source-code editor such [VS Code](https://code.visualstudio.com/download).
- [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask): used to deploy the contracts, sign transactions and interact with the contracts.
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
```

Sau khi khởi tạo một dự án foundry, thư mục hiện tại của bạn sẽ bao gồm:

- **src**: thư mục mặc định cho các hợp đồng thông minh của bạn.
- **tests**: thư mục mặc định cho các thử nghiệm.
- **foundry.toml**: tập tin cấu hình dự án mặc định.
- **lib**:  thư mục mặc định cho các phần phụ thuộc của dự án.
- **script**: thư mục mặc định cho các tập tin tập lệnh solidity.

## Cấu hình foundry.toml

Bây giờ chúng ta đã thiết lập xong dự án, chúng ta phải tạo tệp `.env` và thêm các biến. Foundry sẽ tự động tải tệp .env có trong thư mục dự án của bạn.

Tệp .env phải tuân theo định dạng sau:

```bash
KAIROS_RPC_URL=DÁN_URL_RPC
```

Tiếp theo là chỉnh sửa tệp `foundry.toml`. Bạn phải có một cái ở gốc của dự án sau khi tạo giàn giáo.

Thêm các dòng sau vào cuối tệp:

```bash
[rpc_endpoints]
kairos = "${KAIROS_RPC_URL}"
```

Điều này tạo ra [RPC alias](https://book.getfoundry.sh/cheatcodes/rpc.html) cho Kaia Kairos Testnet.

## Nhập tài khoản

Trong hướng dẫn này, chúng ta sẽ nhập một tài khoản dev đã tồn tại trên MetaMask để có thể truy cập thông qua tùy chọn `--account` trong các phương pháp như `forge script`, `cast send` hoặc bất kỳ phương pháp nào khác yêu cầu khóa riêng.

Chạy lệnh bên dưới để nhập ví hiện có:

```bash
cast ví nhập --interactive oxpampam-dev-i
```

```bash
Nhập khóa riêng tư:
Nhập mật khẩu:
```

![](/img/build/get-started/cast-wallet-import.png)

## Sample smart contract

In this section, we will be using the sample counter contract in the initialized foundry project. The `counter.sol` file in the `src/` folder should look like this:

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

**Code Walkthrough**

This is your smart contract. **Line 1** shows it uses the Solidity version 0.8.13 or greater. From **lines 4-12**, a smart contract `Counter` is created. This contract simply stores a new number using the **setNumber** function and increments it by calling the **increment** function.

## Testing smart contract

Foundry allows us to write tests in solidity as opposed to writing tests in javascript in other smart contract development frameworks. In our initialized foundry project, the `test/Counter.t.sol` is an example of a test written in solidity. The code looks like this:

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

The code above shows you imported forge standard library and Counter.sol.

The tests above check the following:

- Is the number increasing?
- Is the number equal to the set number?

To check if your test works fine, run the following command:

```bash
forge test
```

**Output**

![](/img/build/get-started/forge-test.png)

To learn more about writing tests, advanced testing, and other features, refer to [Foundry's documentation](https://book.getfoundry.sh/forge/tests).

## Compiling your contracts

Compile your contract with this command:

```bash
forge build 
```

## Deploying your contracts

To deploy a contract using foundry, you must provide an RPC URL and a private key of the account that will deploy the contract. Take a look at the list of [rpc-providers](../../../references/public-en.md) on Kaia to find your rpc-url, and create an account using [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask).

Trong hướng dẫn này, chúng tôi sẽ sử dụng hai phương pháp triển khai hợp đồng do Foundry cung cấp:

### Sử dụng Forge Create

**Bước 1**: Để triển khai hợp đồng của bạn tới mạng Kaia Kairos bằng forge create, hãy chạy lệnh bên dưới:

```bash
# Để tải các biến trong tệp .env
source .env

# Để triển khai hợp đồng của chúng tôi
forge create --rpc-url $KAIROS_RPC_URL src/Counter.sol:Counter --broadcast --account oxpampam-dev-i 
```

```bash
Nhập mật khẩu kho khóa: <KEYSTORE_PASSWORD>
```

:::note
Đối với bất kỳ triển khai nào ngoài việc sử dụng mạng thử nghiệm cơ bản trong môi trường phát triển, chúng tôi đặc biệt khuyến nghị sử dụng [ví phần cứng hoặc kho khóa được bảo vệ bằng mật khẩu](https://book.getfoundry.sh/guides/best-practices.html#private-key-management) để tăng cường bảo mật.
:::

![](/img/build/get-started/forge-create-deploy.png)

**Bước 2**: Mở Kaiascan để kiểm tra xem hợp đồng đối ứng đã được triển khai thành công hay chưa.

**Step 3**: Copy and paste the transaction hash in the search field and press Enter. You should see the recently deployed contract.

![](/img/build/get-started/kaiascan-deploy.png)

### Sử dụng Forge Script

Để triển khai hợp đồng của bạn tới mạng Kaia Kairos bằng tập lệnh forge, hãy chạy lệnh bên dưới:

```bash
# Để tải các biến trong tệp .env
source .env

# Để triển khai hợp đồng của chúng tôi
forge script --chain 1001 script/Counter.s.sol:CounterScript --rpc-url $KAIROS_RPC_URL --broadcast -vvvv --account oxpampam-dev-i
```

![](/img/build/get-started/forge-script-deploy.png)

## Interacting with the contract

Sau khi triển khai hợp đồng thông minh thành công, bước tiếp theo thường là tương tác với hợp đồng bằng cách gọi và thực thi các chức năng của hợp đồng. Chúng ta hãy bắt đầu tương tác trực tiếp với các hợp đồng đã triển khai trên Kaia Kairos Network bằng cách sử dụng [Cast](https://book.getfoundry.sh/reference/cast/cast-send.html).

In this section, you will learn how to use the [cast call](https://book.getfoundry.sh/reference/cast/cast-call) to execute the `read-only` function and [cast send](https://book.getfoundry.sh/reference/cast/cast-send) to execute `write` functions.

**A. gọi diễn viên**

Để lấy số được lưu trong hợp đồng, bạn sẽ gọi hàm `number`. Run the command below to see this in action.

```bash
lệnh gọi YOUR_CONTRACT_ADDRESS "số()" --rpc-url $KAIROS_RPC_URL
```

**Example**

```bash
lệnh gọi 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "number()" --rpc-url $KAIROS_RPC_URL
```

**Output**

![](/img/build/get-started/cast-call-number.png)

You should get this data in hexadecimal format:

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```

Tuy nhiên, để có được kết quả mong muốn, hãy sử dụng `cast` để chuyển đổi kết quả trên. In this case, the data is a number, so you can convert it into base 10 to get the result 0:

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```

**Output**

![](/img/build/get-started/cast-call-0.png)

**B. đúc gửi**

To sign and publish a transaction such as executing a `setNumber` function in the counter contract, run the command below:

```bash
truyền gửi --rpc-url=$KAIROS_RPC_URL <CONTRACT-ADDRESS> "setNumber(uint256)" arg --account <ACCOUNT NAME>
```

**Example**

```bash
truyền gửi --rpc-url=$KAIROS_RPC_URL 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "setNumber(uint256)" 10 --account oxpampam-dev-i
```

**Đầu ra**

![](/img/build/get-started/cast-send-setNum.png)

**Crosscheck Number**

```bash
lệnh gọi 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "number()" --rpc-url $KAIROS_RPC_URL
```

**Output**

![](/img/build/get-started/cast-call-10.png)

You should get this data in hexadecimal format:

```bash
0x000000000000000000000000000000000000000000000000000000000000000a
```

However to get your desired result, use cast to convert the above result. In this case, the data is a number, so you can convert it into base 10 to get the result 10:

```bash
cast --to-base 0x000000000000000000000000000000000000000000000000000000000000000a 10
```

**Output**

![](/img/build/get-started/cast-call-result-10.png)

## Forking Mainnet with Cast and Anvil

Foundry allows us to fork the mainnet to a local development network ([Anvil](https://book.getfoundry.sh/reference/anvil/)). Also, you can interact and test with contracts on a real network using [Cast](https://book.getfoundry.sh/reference/cast/).

### Getting Started

Now that you have your Foundry project up and running, you can fork the mainnet by running the command below:

```bash
anvil --fork-url rpc-url
```

**Example**

```bash
anvil --fork-url https://archive-en.node.kaia.io
```

**Output**

![](/img/build/get-started/anvil-localnode.png)

After successfully running this command, your terminal looks like the above image. You'll have 10 accounts created with their public and private keys as well 10,000 prefunded tokens. The forked chain's RPC server is listening at `127.0.0.1:8545`.

To verify you have forked the network, you can query the latest block number:

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

You can convert the result from the task above using [hex to decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html). You should get the latest block number from the time you forked the network. Để xác minh điều này, hãy tham chiếu chéo số khối trên [KaiaScan](https://kaiascan.io/block/118704896?tabId=txList).

### Illustration

Trong phần này, bạn sẽ tìm hiểu cách chuyển token USDT từ người nắm giữ USDT sang tài khoản do Anvil tạo (0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob)

**Transferring USDT**

Truy cập Kaiascan và tìm kiếm người nắm giữ token USDT ([tại đây](https://kaiascan.io/token/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=tokenHolder&page=1)). Let's pick a random account. Trong ví dụ này, chúng tôi sẽ sử dụng `0xb3ff853a137bfe10f3d8965a29013455e1619303`.

Let's export our contracts and accounts as environment variables:

```bash
xuất BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
xuất USDT=0xd077a400968890eacc75cdc901f0356c943e4fdb
xuất USDTHolder=0xb3ff853a137bfe10f3d8965a29013455e1619303
```

Kiểm tra số dư USDT của Bob bằng lệnh gọi:

```bash
lệnh gọi $USDT "balanceOf(address)(uint256)" $BOB
```

**Output**

![](/img/build/get-started/call-usdt-bob.png)

Tương tự như vậy, chúng ta cũng có thể kiểm tra số dư USDT của USDTHolder bằng cách sử dụng lệnh gọi:

```bash
lệnh gọi $USDT "balanceOf(address)(uint256)" $USDTHolder
```

**Output**

![](/img/build/get-started/call-usdt-holder.png)

Hãy chuyển một số token từ USDTHolder sang Bob bằng lệnh cast send:

```bash
# giả mạo USDTHolder
truyền rpc anvil_impersonateAccount $USDTHolder    

# chuyển USDT
truyền gửi $USDT --unlocked --from $USDTHolder "chuyển(địa chỉ,uint256)(bool)" $BOB 1000000
```

**Output**

![](/img/build/get-started/cast-send-usdt.png)

Let's check that the transfer worked:

```bash
lệnh gọi $USDT "balanceOf(address)(uint256)" $BOB
```

**Output**

![](/img/build/get-started/call-usdt-bob-after.png)

```bash
lệnh gọi $USDT "balanceOf(address)(uint256)" $USDTHolder
```

**Output**

![](/img/build/get-started/call-usdtholder-after.png)

## Xử lý sự cố

### Lỗi ước tính khí

Bạn có thể gặp phải lỗi này khi triển khai bằng tập lệnh forge:

```bash
# Giao dịch không thành công
❌ [Thất bại] Băm: 0xa0de3dac1dae4d86f2ba8344bc5f7d816714a6abdc4555ae46ca21d126f78caf
Lỗi: Giao dịch không thành công: 0xa0de3dac1dae4d86f2ba8344bc5f7d816714a6abdc4555ae46ca21d126f78caf

# Mã lỗi giao dịch trên Explorer
Lỗi: Lưu trữ mã tạo hợp đồng hết gas
```

![](/img/build/get-started/gas-estimation-err.png)

Điều này thường xảy ra do ước tính khí không chính xác trong quá trình triển khai. Thuật toán ước tính gas mặc định của Foundry (với hệ số nhân mặc định là 130%) đôi khi không đáp ứng được mạng Kaia, khiến quá trình triển khai hết gas trước khi hoàn tất.

Khi lượng gas thực tế cần thiết vượt quá lượng gas ước tính, giao dịch sẽ hết gas trong quá trình triển khai hợp đồng, dẫn đến lỗi _Mã tạo hợp đồng hết gas lưu trữ_.

**Cách khắc phục nhanh: Cài đặt Hệ số khí thủ công**

Chạy tập lệnh của bạn với --gas-estimate-multiplier tăng lên 200 hoặc cao hơn như sau:

```bash
# lệnh
rèn tập lệnh script/YourContract.s.sol:YourScript \
  --chain <chain-id> \
  --rpc-url $RPC_URL \
  --broadcast \
  --gas-estimate-multiplier 200 \
  --account your-account \
  -vvvv
```

```bash
# ví dụ 

tập lệnh forge --chain 1001 tập lệnh/NFT.s.sol:NFTScript --rpc-url $KAIROS_RPC_URL --broadcast --gas-estimate-multiplier 200 -vvvv --account oxpampam-dev-i
```

:::note
Cờ `--gas-estimate-multiplier` thiết lập tỷ lệ phần trăm tương đối để nhân tất cả các ước tính khí. Bằng cách đặt thành 200, bạn sẽ tăng gấp đôi ước tính về khí đốt, giúp triển khai hợp đồng của bạn có đủ không gian để hoàn thành thành công.
:::

![](/img/build/get-started/gas-estimation-fixed.png)

## Phần kết luận

Xin chúc mừng nếu bạn đã đọc hết hướng dẫn này. Nếu bạn có bất kỳ câu hỏi nào, hãy truy cập [Diễn đàn Kaia](https://devforum.kaia.io/). Tuy nhiên, dưới đây là danh sách các tài nguyên hữu ích mà bạn có thể cần khi tiếp tục xây dựng với Foundry trên Kaia.

- [Tài liệu Foundry](https://book.getfoundry.sh/)
- [Cơ bản về đúc Cyfrin](https://updraft.cyfrin.io/courses/foundry)
- [Xưởng đúc tiên tiến Cyfrin](https://updraft.cyfrin.io/courses/advanced-foundry)

