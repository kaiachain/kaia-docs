# RedStone

## Tổng quan

[RedStone](https://redstone.finance/) là một mạng lưới oracle mô-đun cung cấp dữ liệu giá cho các hợp đồng thông minh. Trên Kaia, RedStone cung cấp các nguồn cấp dữ liệu **Push** lưu trữ giá trên chuỗi, nhờ đó các ứng dụng phi tập trung (dApps) có thể truy xuất dữ liệu này thông qua giao diện `AggregatorV3Interface` quen thuộc và tương thích với Chainlink.

RedStone Push định kỳ cập nhật giá trên chuỗi dựa trên các điều kiện **độ lệch** và **nhịp đập** có thể tùy chỉnh. Tìm hiểu thêm trong [Tài liệu hướng dẫn RedStone Push](https://docs.redstone.finance/docs/dapps/redstone-push/) và duyệt các nguồn cấp dữ liệu Kaia trực tiếp trong [Giao diện người dùng Push Feeds](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true).

## Sử dụng RedStone trên Kaia

Mỗi nguồn cấp dữ liệu Push được triển khai dưới dạng một hợp đồng cấp dữ liệu giá, thực hiện giao diện Aggregator của Chainlink. Bạn có thể gọi hàm `latestRoundData()` để lấy giá mới nhất.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);

    function description() external view returns (string memory);

    function version() external view returns (uint256);

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

contract RedStoneConsumer {
    AggregatorV3Interface public immutable priceFeed;

    constructor(address feedAddress) {
        priceFeed = AggregatorV3Interface(feedAddress);
    }

    function getLatestPrice()
        external
        view
        returns (int256 price, uint256 updatedAt)
    {
        (, price, , updatedAt, ) = priceFeed.latestRoundData();
    }
}
```

Hãy nhập địa chỉ nguồn cấp dữ liệu của tài sản mà bạn cần (xem các bảng dưới đây). Luôn kiểm tra tính hợp lệ của `updatedAt` và làm tròn dữ liệu sao cho phù hợp với các yêu cầu về độ mới của giao thức của bạn.

## Các nguồn tin trên Kaia

### Mạng chính (ID chuỗi 8217)

| Nguồn cấp dữ liệu | Địa chỉ                                                                                                                | Sự lệch / Nhịp tim |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------ |
| BTC               | [`0x6AEE1334b4053B0148907649D447557560CC8126`](https://kaiascan.io/account/0x6AEE1334b4053B0148907649D447557560CC8126) | 0,5% / 6 giờ       |
| ETH               | [`0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD`](https://kaiascan.io/account/0xb728dbB1D8504fD521db0e87bdDdF33466bCabAD) | 0,5% / 6 giờ       |
| USDT              | [`0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A`](https://kaiascan.io/account/0xE08bcb1407E8496d434eFe4ecf2a20E27068a14A) | 0,5% / 6 giờ       |
| KAIA              | [`0xa2F3430ac9cfc37aEF88449DADf36af676211A64`](https://kaiascan.io/account/0xa2F3430ac9cfc37aEF88449DADf36af676211A64) | 0,1% / 12 giờ      |
| Kiếm USDT         | [`0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71`](https://kaiascan.io/account/0x6334c5EAE8CD1E2aD2fe32989775C92e7F729e71) | 0,1% / 12 giờ      |
| stKAIA            | [`0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7`](https://kaiascan.io/account/0x6b860bE3CCc3b69C912ff2f7975Ea0d1194928a7) | 0,1% / 12 giờ      |

### Mạng thử nghiệm Kairos (ID chuỗi 1001)

| Nguồn cấp dữ liệu | Địa chỉ                                                                                                                       | Sự lệch / Nhịp tim |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| USDT              | [`0x13d3B27c7C100621CB3B714deAb858Ee06d41db1`](https://kairos.kaiascan.io/account/0x13d3B27c7C100621CB3B714deAb858Ee06d41db1) | 0,5% / 6 giờ       |

Tình trạng sẵn có và các thông số của thức ăn có thể thay đổi. Vui lòng xác nhận các địa chỉ mới nhất và điều kiện cập nhật tại [Giao diện người dùng Push Feeds](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true).

## Tài nguyên

- [Tài liệu RedStone — Mô hình Push](https://docs.redstone.finance/docs/dapps/redstone-push/)
- [Giao diện người dùng Push Feeds (Kaia)](https://app.redstone.finance/push-feeds?networks=kaia&testnets=true)
- [Trang web RedStone](https://redstone.finance/)
- [Twitter / X](https://x.com/redstone_defi)
