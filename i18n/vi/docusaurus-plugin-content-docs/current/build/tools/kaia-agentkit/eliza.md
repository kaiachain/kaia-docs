# Eliza

## Tổng quan

**Kaia Eliza Plugin** là tiện ích mở rộng quan trọng để tích hợp với **ElizaOS**, cho phép tương tác liền mạch với **Kaia Mainnet** và **Kairos Testnet**. Plugin này cung cấp một bộ chức năng mạnh mẽ, bao gồm **chuyển mã thông báo KAIA, truy vấn số dư ví và truy xuất mã thông báo có thể thay thế và không thể thay thế (FT/NFT)**. Được thiết kế dành cho các nhà phát triển, giải pháp này đơn giản hóa việc quản lý ví và nâng cao khả năng ứng dụng trong **khung ElizaOS** cho hệ sinh thái Kaia.

:::note
Plugin Kaia Eliza sử dụng Kaia Agent Kit ở bên dưới. Điều này có nghĩa là mọi hoạt động trên chuỗi, như gửi token hoặc kiểm tra số dư, đều được hỗ trợ bởi các công cụ an toàn và đáng tin cậy của Kaia Agent Kit.
:::

**Đặc điểm chính**

- **Chuyển mã thông báo**: Gửi mã thông báo KAIA giữa các ví một cách dễ dàng.
- **Truy vấn ví**: Truy xuất số dư ví và dữ liệu giá KAIA theo thời gian thực.
- **Quản lý mạng**: Tương tác liền mạch với blockchain Kaia.
- **Thông tin về khối và giao dịch**: Truy cập thông tin chi tiết về các giao dịch và khối trên mạng.

## Bắt đầu

### 1. Thiết lập ElizaOS

```sh
git clone https://github.com/elizaOS/eliza
cd eliza
git checkout $(git describe --tags --abbrev=0)
pnpm install
cp .env.example .env
```

### 2. Cấu hình biến môi trường

Để tích hợp plugin Kaia, các nhà phát triển phải cấu hình các biến môi trường và bí mật. Plugin có thể truy cập các thiết lập này thông qua **agent.json.secret** hoặc trực tiếp khi chạy.

Bây giờ, hãy cấu hình tệp `.env` và các giá trị `kaiaegent.character.json`.

**.tệp env:**

```sh
GROK_API_KEY= # GROK API Key
GOOGLE_GENERATIVE_AI_API_KEY= # Gemini API Key
```

:::note
Để sử dụng bất kỳ nhà cung cấp LLM nào, hãy cấu hình khóa API có liên quan trong `.env`. Dựa trên khóa được cung cấp, hãy cập nhật cài đặt **modelProvider** trong tệp ký tự.
:::

**kaiagent.character.json:**

```json
{
    "name": "Kaia AI Dev Agent",
    "plugins": ["@elizaos-plugins/plugin-kaia"],
    "clients": [],
    "modelProvider": "grok",
    "settings": {
        "ragKnowledge": false,
        "secrets": {
            "KAIA_EVM_PRIVATE_KEY": "",
            "KAIA_KAIASCAN_API_KEY": "",
            "KAIA_FAUCET_AMOUNT": "1"
        }
    }
}
```

Cung cấp giá trị cho:

- **KAIA_EVM_PRIVATE_KEY**: Cần thiết cho các giao dịch trên chuỗi.
- **KAIA_KAIASCAN_API_KEY**: Có thể lấy từ [KaiaScan](https://kaiascan.io).
- **KAIA_FAUCET_AMOUNT**: Chỉ định số lượng mã thông báo sẽ phân phối theo yêu cầu.

**Ví dụ về cấu hình**

Tải xuống tệp character.json cần thiết:

```sh
wget https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/kaiaagent.character.json -O ./characters/kaiaagent.character.json
```

## Đăng ký Plugin

Để kích hoạt **Plugin Kaia**, hãy thêm nó vào cấu hình của tác nhân:

```json
{
    "name": "Kaia AI Dev Agent",
    "plugins": ["@elizaos-plugins/plugin-kaia"]
}
```

Ngoài ra, hãy chạy lệnh bên dưới để thêm plugin vào `package.json` của bạn:

```bash
npx elizaos plugins install @elizaos-plugins/plugin-kaia
```

```json
{
    "dependencies": {
        "@elizaos-plugins/plugin-kaia": "github:kaiachain/kaia-eliza-plugin"
    }
}
```

## Xây dựng & Khởi động Eliza

```sh
pnpm build
pnpm start --character="./characters/kaiaagent.character.json"
```

## Chạy Giao diện người dùng của Eliza Client

Mở một terminal khác và thực hiện:

```sh
pnpm run start:client
```

Khi giao diện người dùng đã sẵn sàng, bạn có thể truy cập vào **http://localhost:5173**.

:::note
Đảm bảo rằng tài khoản được liên kết với khóa riêng được cấu hình có đủ tiền để thực hiện các giao dịch trên chuỗi trên **Kaia Testnet** hoặc **Mainnet**. Có thể yêu cầu mã thông báo thử nghiệm từ [Kaia Faucet](https://faucet.kaia.io).
:::

## Thử nghiệm

[Xem bản demo plugin Kaia Eliza](https://eco-klaytn-safe-asset.s3.ap-northeast-2.amazonaws.com/elizaagent/KaiaElizaPluginDemo.mp4)

## Ví dụ sử dụng

### Lấy dữ liệu giá và thị trường KAIA

**Yêu cầu:**

```sh
User: "Give me KAIA information"
```

**Phản ứng:**

```sh
Assistant: "KAIA Token info: USD: 0.14, Total Supply: 5,936,109,217, Volume: 63,994,146"
```

### Yêu cầu mã thông báo kiểm tra KAIA

**Yêu cầu:**

```sh
User: "Give me some test tokens to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d"
```

**Phản ứng:**

```sh
Assistant: "I'll send a few KAIA testnet tokens..."
```

### Gửi Token KAIA

**Yêu cầu:**

```sh
User: "Send 1 KAIA to 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos"
```

**Phản ứng:**

```sh
Assistant: "I'll send 1 KAIA token now..."
```

### Truy vấn thông tin tài khoản

**Yêu cầu:**

```sh
User: "What's my account overview of 0xcfcb1dc1efbbccbb6a9afc78c12315d64e8c383d on Kairos?"
```

**Phản ứng:**

```sh
Assistant: "Your account overview details: Account Type: EOA, Balance: 10, Total Transactions: 12"
```

### Kiểm tra thông tin khối mới nhất

**Yêu cầu:**

```sh
User: "What is the latest block number of Kaia?"
```

**Phản ứng:**

```sh
Assistant: "The latest block number for Kaia is 176629207"
```

## Tham gia

Chúng tôi hoan nghênh những đóng góp từ cộng đồng nhà phát triển. Để tìm hiểu thêm về blockchain Kaia, hãy truy cập:

- [Tài liệu Kaia](https://docs.kaia.io/)
- [Cổng thông tin dành cho nhà phát triển Kaia](https://www.kaia.io/developers)
- [Trình khám phá KaiaScan](https://kaiascan.io)
- [Tài liệu API của KaiaScan](https://docs.kaiascan.io/)
- [Kho lưu trữ Github của Kaia](https://github.com/kaiachain)

## Phần kết luận

**Plugin Kaia Eliza** tích hợp liền mạch với **khung tác nhân AI ElizaOS**, cho phép tương tác thông minh và hiệu quả với **Kaia Mainnet** và **Kairos Testnet**. Với các tính năng quản lý ví, giao dịch và mã thông báo mạnh mẽ, nó giúp các nhà phát triển xây dựng các ứng dụng phi tập trung thông minh hơn, phản hồi nhanh hơn đồng thời đơn giản hóa các tương tác blockchain.

Bạn đã sẵn sàng nâng cao trải nghiệm blockchain dựa trên AI chưa? Tích hợp plugin Kaia với **ElizaOS** ngay hôm nay và mở khóa những khả năng mới!