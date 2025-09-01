# Giới thiệu

Survey Mini dApp là ứng dụng phi tập trung (dApp) tập trung vào quyền riêng tư cho phép người dùng tạo và tham gia khảo sát trong khi vẫn đảm bảo tính ẩn danh và minh bạch. Bằng cách tận dụng các công cụ tiên tiến như Semaphore để tích hợp bằng chứng không kiến thức và hệ sinh thái nhà phát triển của LINE, hướng dẫn này sẽ hướng dẫn bạn từng bước để xây dựng và triển khai một dApp khảo sát mini trên blockchain Kaia.

Hướng dẫn toàn diện này bao gồm:

- Ứng dụng này có chức năng gì và mục tiêu của nó.
- Các công cụ và điều kiện tiên quyết cần thiết.
- Thiết lập môi trường phát triển hợp đồng thông minh.
- Tích hợp và triển khai giao diện người dùng.

Để bắt đầu nhanh chóng, bạn sẽ tìm thấy toàn bộ mã cho hướng dẫn này trên [Github](https://github.com/kjeom/ExampleMiniDapp). Bằng cách này, bạn có thể khám phá cách thức hoạt động bên trong của ứng dụng khi thực hiện theo.

## Điều kiện tiên quyết <a id="prerequisite"></a>

Để xây dựng ứng dụng này, hãy đảm bảo bạn có những điều sau:

1. Kiến thức kỹ thuật
   - Hiểu rõ về [Solidity](https://www.tutorialspoint.com/solidity/index.htm).
   - Thành thạo [JavaScript](https://www.w3schools.com/js/default.asp) và [React/Next.js](https://www.w3schools.com/REACT/DEFAULT.ASP).
   - Quen thuộc với các công cụ phát triển hợp đồng thông minh như Hardhat.
2. Tài khoản và Công cụ
   - [Tài khoản nhà phát triển LINE](https://developers.line.biz/en/).
   - [Thiết lập giao thức Semaphore](https://docs.semaphore.pse.dev/getting-started).
   - Nhận được ID máy khách Mini Dapp SDK từ nhóm Dapp Portal.
3. Các phụ thuộc đã cài đặt
   - [Node.js và npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Thiết lập và cài đặt dự án <a id="project-setup-installation"></a>

Để bắt đầu thiết lập và cài đặt dự án nhanh chóng, hãy sao chép dự án này trên Github bằng lệnh sau.

```bash
# clone project
git clone https://github.com/kjeom/ExampleMiniDapp
```

Tiếp theo, hãy thay đổi thư mục thành thư mục đã sao chép và cài đặt dự án cục bộ bằng npm với lệnh sau:

```bash
cd ExampleMiniDapp
npm install
```

Tiếp theo, chúng ta hãy tìm hiểu cách thức hoạt động bên trong của hợp đồng thông minh cho ứng dụng khảo sát của chúng ta. Phần tiếp theo sẽ giải thích cách thức hoạt động của nó.

