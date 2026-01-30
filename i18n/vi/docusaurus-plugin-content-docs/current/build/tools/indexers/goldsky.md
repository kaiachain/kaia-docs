---
sidebar_label: Vàng Trời
---

# Vàng Trời

![](/img/banners/kaia-goldsky.png)

## Giới thiệu

[Goldsky](https://goldsky.com) là một công cụ lập chỉ mục dữ liệu hiệu suất cao được thiết kế để đơn giản hóa quá trình trích xuất, chuyển đổi và tải (ETL) dữ liệu trên chuỗi. Nó cho phép các nhà phát triển xây dựng và triển khai các ứng dụng phân tích thời gian thực và tích hợp blockchain nhanh hơn.

Goldsky cung cấp hai sản phẩm chính:

- [Subgraphs](https://docs.goldsky.com/subgraphs/introduction): Chỉ mục linh hoạt, được hỗ trợ bởi TypeScript, với các API GraphQL, hỗ trợ webhook và nhiều tính năng khác.
- [Mirror](https://docs.goldsky.com/mirror/introduction): Truyền dữ liệu blockchain trực tiếp vào cơ sở dữ liệu hoặc hàng đợi tin nhắn của bạn chỉ với một cấu hình YAML duy nhất.

Kaia Mainnet và Testnet đều được hỗ trợ bởi Goldsky.

**Bạn sẽ học được gì**

Khi kết thúc hướng dẫn này, bạn sẽ:

- Hiểu cách hoạt động của các subgraphs không cần lập trình (Instant Subgraphs) của Goldsky.
- Cấu hình và triển khai một subgraph bằng cách sử dụng Goldsky CLI
- Chỉ mục sự kiện Chuyển khoản từ hợp đồng USDT trên mạng chính Kaia.
- Truy cập và kiểm tra điểm cuối subgraph của bạn thông qua GraphQL

## Điều kiện tiên quyết

Trước khi bắt đầu, hãy đảm bảo bạn có các thứ sau:

**1. Cài đặt Goldsky CLI**
\- Thực hiện theo [hướng dẫn cài đặt](https://docs.goldsky.com/subgraphs/deploying-subgraphs#install-goldskys-cli-and-log-in) cho hệ điều hành của bạn.
\- Người dùng Windows: Đảm bảo đã cài đặt [Node.js](https://nodejs.org) và npm trước khi cài đặt CLI.

**2. Tạo tài khoản Goldsky**
\- Đăng ký tại [Goldsky.com](https://goldsky.com) nếu bạn chưa có tài khoản.

**3. Tạo khóa API**
\- Truy cập vào **Cài đặt dự án** trong bảng điều khiển Goldsky của bạn.
\- Tạo và sao chép khóa API của bạn.

**4. Xác thực CLI**````bash
    goldsky login
    ```
    - Dán khóa API của bạn khi được yêu cầu.
    - Xác thực CLI bằng cách chạy:
```bash
    goldsky
    ```
````

## Bắt đầu

Goldsky hỗ trợ ba phương pháp để triển khai một subgraph:

- Từ [Mã nguồn](https://docs.goldsky.com/subgraphs/deploying-subgraphs#from-source-code) – Triển khai các subgraph tùy chỉnh được xây dựng từ môi trường phát triển cục bộ của bạn.
- Di chuyển từ các nền tảng khác – Chuyển các subgraph hiện có từ các nền tảng như [The Graph](https://docs.goldsky.com/subgraphs/migrate-from-the-graph) hoặc [Alchemy](https://docs.goldsky.com/subgraphs/migrate-from-alchemy/guide).
- Subgraphs tức thì ([Low-Code](https://docs.goldsky.com/subgraphs/guides/create-a-low-code-subgraph) / [No-Code](https://docs.goldsky.com/subgraphs/guides/create-a-no-code-subgraph)) – Sử dụng tệp cấu hình (low-code) hoặc giao diện người dùng (no-code) để triển khai subgraphs mà không cần viết mã lập trình subgraph truyền thống.

Trong hướng dẫn này, chúng ta sẽ sử dụng phương pháp low-code để triển khai một subgraph lập chỉ mục sự kiện _Transfer_ từ hợp đồng USDT trên Kaia Mainnet.

## Cài đặt và triển khai

Phương pháp low-code cho phép chúng ta tạo các tệp cấu hình thủ công, tuy nhiên chúng ta vẫn không cần phải viết mã ánh xạ subgraph truyền thống - Goldsky sẽ tự động sinh mã này từ cấu hình của chúng ta.

Vì vậy, trong phần này, bạn chỉ cần sử dụng:

- Địa chỉ hợp đồng của USDT trên Kaia
- Giao diện nhị phân ứng dụng (ABI) của hợp đồng
- Khối khởi tạo (khối mà hợp đồng được triển khai)

### Lấy thông tin hợp đồng USDT ABI

- Truy cập [Kaiascan](https://kaiascan.io) để tìm địa chỉ hợp đồng USDT [https://kaiascan.io/address/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=txList&page=1].

- Nhấp vào tab Hợp đồng và tìm phần Hợp đồng ABI.

  > Lưu ý: USDT là hợp đồng đại diện. Hãy chắc chắn rằng bạn đã lấy được hợp đồng triển khai ABI.

- Sao chép và dán tệp Contract ABI và lưu nó dưới dạng [abi.json](https://gist.github.com/ayo-klaytn/cd53e0c560eb374bdbe981d12b8986f1#file-usdt-abi-json) trong thư mục làm việc của bạn.

- Ghi lại số khối triển khai của hợp đồng.

### Tạo tệp cấu hình

Bước tiếp theo là tạo tệp cấu hình Instant Subgraph (ví dụ: `usdt-demo-config.json`).

Tập tin này bao gồm năm phần chính:

1. Số phiên bản cấu hình
2. Tên cấu hình
3. ABIs
4. Dây xích
5. Các trường hợp hợp đồng

#### Số phiên bản

Đây là số phiên bản của định dạng tệp cấu hình Goldsky và không phải là số phiên bản của subgraph của bạn. Tham khảo tài liệu tham khảo này [đây](https://docs.goldsky.com/subgraphs/reference/instant-subgraph#version-1) để biết số phiên bản mới nhất.

#### Tên cấu hình

Đây là tên do bạn tự đặt, giúp bạn hiểu mục đích của cấu hình này. Nó chỉ được sử dụng cho việc gỡ lỗi nội bộ. Trong hướng dẫn này, chúng ta sẽ sử dụng _usdt-demo_

#### ABIs, chuỗi và các thực thể hợp đồng

Ba phần này có mối liên hệ chặt chẽ với nhau.

- Đặt tên cho ABI của bạn và nhập đường dẫn đến tệp ABI mà bạn đã lưu trước đó (tương đối so với vị trí của tệp cấu hình này). Trong trường hợp này, `usdtabi` và `abi.json`.

- Viết ra bản hợp đồng, tham chiếu đến ABI mà bạn đã đặt tên trước đó, địa chỉ nơi nó được triển khai, chuỗi khối mà nó nằm trên, và khối bắt đầu.

**Ví dụ: [usdt-demo-config.json](https://gist.github.com/ayo-klaytn/cd53e0c560eb374bdbe981d12b8986f1#file-usdt-demo-config-json)**

```json
{
  "version": "1",
  "name": "usdt-demo",
  "abis": {
    "usdtabi": {
      "path": "./abi.json"
    }
  },
  "instances": [
    {
      "abi": "usdtabi",
      "address": "0xd077a400968890eacc75cdc901f0356c943e4fdb",
      "startBlock": 30801565,
      "chain": "kaia"
    }
  ]
}
```

Cấu hình này hỗ trợ nhiều trường hợp sử dụng khác nhau, bao gồm lập chỉ mục cho nhiều hợp đồng thông minh có các giao diện ứng dụng (ABI) khác nhau, cùng một hợp đồng được triển khai trên nhiều chuỗi khối, hoặc nhiều hợp đồng có các giao diện ứng dụng (ABI) duy nhất trên các mạng khác nhau.

### Triển khai Subgraph

Khi tệp cấu hình của bạn đã sẵn sàng, đã đến lúc triển khai subgraph.

Triển khai subgraph bằng lệnh: `goldsky subgraph deploy name/version --from-abi <path-to-config-file>`, sau đó truyền đường dẫn đến tệp cấu hình mà bạn đã tạo.

Ví dụ:

```bash
goldsky subgraph deploy usdt-demo/1.0 --from-abi usdt-demo-config.json
```

![Goldsky triển khai với công nghệ low-code](/img/build/tools/goldsky-lc-deploy.png)

Goldsky tự động tạo mã subgraph cần thiết, triển khai nó thay cho bạn và cung cấp điểm cuối truy vấn để sử dụng ngay lập tức.

Mở endpoint sẽ khởi chạy một trình khám phá GraphQL dựa trên web, nơi bạn có thể kiểm tra cấu trúc dữ liệu và tạo các truy vấn để tích hợp vào ứng dụng của mình.

### Tra cứu đồ thị con của bạn

Chúc mừng! Bạn đã triển khai thành công subgraph của mình.

Trước khi thực hiện truy vấn, bạn có thể cần đợi cho đến khi trình lập chỉ mục của mình đồng bộ hoàn toàn, tùy thuộc vào giá trị startBlock được định nghĩa trong tệp cấu hình của bạn. Bạn có thể theo dõi tiến trình đồng bộ hóa trực tiếp trên bảng điều khiển Goldsky của mình.

![Goldsky synced indexer](/img/build/tools/goldsky-synced-indexer.png)

Sau khi quá trình đồng bộ hóa hoàn tất, bạn có thể truy vấn subgraph của mình bằng cách sử dụng điểm cuối công khai do Goldsky cung cấp:

```
https://api.goldsky.com/api/public/project_cmkv4p7xa8ix401vc3f32g20g/subgraphs/usdt-demo-kaia/1.0/gn
```

:::tip
Sử dụng trình khám phá GraphQL trực tuyến được liên kết từ bảng điều khiển Goldsky của bạn để duyệt sơ đồ và thử nghiệm các truy vấn một cách tương tác.
:::

![Goldsky - Demo ứng dụng web sử dụng GraphQL](/img/build/tools/goldsky-demo.gif)

#### Ví dụ truy vấn: Lấy thông tin chuyển khoản USDT.

Query GraphQL này truy xuất 10 sự kiện chuyển USDT đầu tiên trên mạng chính Kaia, được sắp xếp theo giá trị theo thứ tự giảm dần:

```js
{
  transfers(first: 10, orderBy: value, orderDirection: desc) {
    from
    id
    to
    value
  }
}
```

Ví dụ về phản hồi:

```json
{
  "data": {
    "transfers": [
      {
        "from": "0x0000000000000000000000000000000000000000",
        "id": "0x3618973a943060e7bd57eb8c49c8770af93241710c891195a311ace77366a26b-4",
        "to": "0x5754284f345afc66a98fbb0a0afe71e0f007b949",
        "value": "100000000000000"
      },
      {
        "from": "0x5754284f345afc66a98fbb0a0afe71e0f007b949",
        "id": "0x249852a124700338df1d93d272d9a88d41d3c6526fefb7bb76dce27d3c6e6617-2",
        "to": "0x77134cbc06cb00b66f4c7e623d5fdbf6777635ec",
        "value": "20000000000000"
      }
      // ...
    ]
  }
}
```

**Mã mẫu: Tra cứu thông qua JavaScript (Axios)**

Dưới đây là một ví dụ đơn giản về cách gửi cùng một truy vấn bằng axios trong Node.js:

```js
const axios = require('axios');

const graphqlQuery = `
  {
    transfers(first: 10, orderBy: value, orderDirection: desc) {
      from
      id
      to
      value
    }
  }
`;

const queryUrl = 'https://api.goldsky.com/api/public/project_cmkv4p7xa8ix401vc3f32g20g/subgraphs/usdt-demo-kaia/1.0/gn';

axios.post(queryUrl, { query: graphqlQuery })
  .then((response) => {
    const data = response.data.data;
    console.log(data);
  })
  .catch((error) => {
    console.error('GraphQL query failed:', error);
 });
```

## Tài nguyên bổ sung

- [Triển khai một Subgraph](https://docs.goldsky.com/subgraphs/deploying-subgraphs)
- [Chỉ mục Kaia với Goldsky](https://docs.goldsky.com/chains/kaia)
- [Tài liệu Goldsky](https://docs.goldsky.com/introduction)
