# Bắt đầu với Semaphore

[Semaphore](https://github.com/semaphore-protocol/semaphore/tree/main) cho phép người dùng tham gia ẩn danh vào các ứng dụng phi tập trung bằng cách sử dụng bằng chứng không kiến thức. Đối với dApp này, Semaphore đảm bảo người dùng có thể gửi phản hồi khảo sát mà không tiết lộ danh tính của họ.

**Tính năng của Semaphore**:

- _Ẩn danh_: Người dùng có thể gửi câu trả lời mà không cần tiết lộ thông tin cá nhân.
- _Xác minh_: Phản hồi được xác thực mà không liên kết chúng với cá nhân nào.
- _Chống thư rác_: Ngăn chặn việc gửi bài trùng lặp.

## Thiết lập môi trường phát triển hợp đồng thông minh <a id="set-up-smart-contract-env"></a>

Để sử dụng hardhat, chúng ta cần thiết lập môi trường phát triển và cài đặt Hardhat. Chúng ta hãy thực hiện theo các bước sau:

Điều hướng đến thư mục gốc của dự án, sau đó chạy các lệnh sau để tạo một dự án Hardhat mới.

```bash
mkdir contract
cd contract
npm install --save-dev hardhat
```

Khởi động một dự án mẫu bằng cách chạy lệnh bên dưới:

```bash
npx hardhat init 
```

Trong hướng dẫn này, bạn sẽ chọn một dự án TypeScript.

:::note
Khi khởi tạo dự án, bạn sẽ nhận được lời nhắc cài đặt plugin hardhat-toolbox. Plugin này bao gồm tất cả các gói thường dùng và các plugin Hardhat được khuyến nghị để bắt đầu phát triển với Hardhat.
:::

Tiếp theo, cài đặt `@semaphore-protocol/contracts` cho các hợp đồng Semaphore Solidity, `OpenZeppelin contract` và `hardhat-deploy` bằng lệnh sau:

```bash
npm install --save-dev @semaphore-protocol/contracts @openzeppelin/contracts hardhat-deploy
```

Sau đó, bạn muốn sửa đổi `hardhat.config.ts` của mình bằng các cấu hình sau:

```javascript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    kaia: {
      url: "https://public-en.node.kaia.io",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [
            "0x7eff112dab68890a60c89d69c2ce1ebb115172f6760508ce6c8ea8fe8afe1e20",
            "0xc696ccd259792f2ffb87e0012e4a37ae3526a3224686225af679e3aaa2aeab0d",
          ],
    },
    kairos: {
      url: "https://public-en-kairos.node.kaia.io",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [
            "0x7eff112dab68890a60c89d69c2ce1ebb115172f6760508ce6c8ea8fe8afe1e20",
            "0xc696ccd259792f2ffb87e0012e4a37ae3526a3224686225af679e3aaa2aeab0d",
          ],
    },
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
```

Bây giờ chúng ta đã thiết lập xong môi trường phát triển, hãy bắt đầu viết hợp đồng thông minh cho khảo sát.