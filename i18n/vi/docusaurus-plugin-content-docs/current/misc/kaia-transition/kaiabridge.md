# Kaiabridge

Finschia users can swap their FNSA tokens on Finshia network to KAIA tokens on Kaia network at a fixed swap rate. The swap is mediated by a set of smart contract and programs, collectively called Kaiabridge.

Bạn có thể truy cập và sử dụng Kaiabridge trong bộ công cụ trực tuyến của chúng tôi [online toolkit](https://toolkit.kaia.io/kaiaBridge).

Bạn có thể tìm thấy mã nguồn hợp đồng trong kho lưu trữ [GitHub kaiachain/kaia](https://github.com/kaiachain/kaia/tree/dev/contracts/contracts/system_contracts/kaiabridge) và địa chỉ triển khai trong trang [địa chỉ hợp đồng](https://docs.kaia.io/references/contract-addresses/).

# Hướng dẫn sử dụng cho Kaiabridge

## Điều kiện tiên quyết

### 1. Chuyển tài khoản của bạn sang MetaMask hoặc Kaia Wallet.

#### Với khóa riêng thô

Nếu tài khoản của bạn có thể được xuất dưới dạng khóa riêng tư thô, hãy sao chép khóa riêng tư thô và nhập nó vào ví MetaMask hoặc Kaia.

- [MetaMask](https://support.metamask.io/start/use-an-existing-wallet#import-using-a-private-key)
- [Kaia Wallet](https://www.kaiawallet.io/en_US/faq/?id=25)

#### Với cụm từ khôi phục

Nếu tài khoản của bạn chỉ có thể được xuất dưới dạng cụm từ khôi phục, hãy tính toán khóa riêng thô từ cụm từ khôi phục. Bạn có thể sử dụng bất kỳ công cụ nào hỗ trợ đường dẫn dẫn xuất BIP-39. Các công cụ này bao gồm [ethers.js](https://docs.ethers.org/v6/api/wallet/#HDNodeWallet), [viem](https://viem.sh/docs/accounts/local/hdKeyToAccount), [Foundry](https://getfoundry.sh/cast/reference/wallet/), và [BIP39 Tool](https://github.com/iancoleman/bip39). Ví Finschia thường sử dụng đường dẫn "m/44'/438'/0'/0/0" (theo [SLIP-044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)) làm đường dẫn dẫn xuất mặc định của họ. Bạn có thể cần sử dụng các đường dẫn dẫn xuất khác nếu ví Finschia của bạn có nhiều tài khoản hoặc sử dụng cấu hình khác.

Sau khi đã tính toán được khóa riêng, hãy làm theo các hướng dẫn trong phần trên [Với khóa riêng thô](#with-raw-private-key).

:::note[Example Sử dụng công cụ BIP39]

Bạn có thể tính toán khóa riêng trên trang này: [BIP39 - Mã mnemonic](https://iancoleman.io/bip39/).

Như một biện pháp phòng ngừa, khuyến cáo mạnh mẽ nên tuân thủ các hướng dẫn "Sử dụng ngoại tuyến" trên trang web và ngắt kết nối Internet trong quá trình thực hiện.

1. Dán cụm từ khôi phục của bạn vào trường "BIP39 Mnemonic".
2. Đặt trường "Coin" thành "ETH - Ethereum".
3. Đặt "Đường dẫn dẫn xuất" thành "BIP32".
4. Đặt "Client" thành "Đường dẫn dẫn xuất tùy chỉnh".
5. Đặt "Đường dẫn dẫn xuất BIP32" thành "m/44'/438'/0'/0".
6. Trong phần "Địa chỉ được dẫn xuất", hãy tìm hàng đầu tiên có trường "Path" hiển thị "m/44'/438'/0'/0/0", khóa riêng thô của bạn sẽ được hiển thị trong trường "Khóa riêng".

:::

:::note[Example Sử dụng công cụ Foundry]

1. Cài đặt [Foundry](https://getfoundry.sh/).
2. Nhập lệnh sau đây với cụm từ khôi phục của bạn vào `--mnemonic`. Khóa riêng tư thô sẽ được in ra.
   ```
   Tạo ví với khóa riêng tư --mnemonic "test test test test test test test test test test test junk" --mnemonic-derivation-path "m/44'/438'/0'/0/0"
   ```

:::

### 2. Kiểm tra mạng của bạn

Nếu bạn đang sử dụng MetaMask, hãy thêm mạng Kaia Mainnet vào danh sách mạng của bạn nếu bạn chưa thực hiện điều này.

- [Kết nối MetaMask với Kaia](https://docs.kaia.io/build/tutorials/connecting-metamask/)

### 3. Nạp tiền vào tài khoản của bạn

Bạn cần gas để gửi giao dịch cho việc hoán đổi. Tham khảo [Get KAIA](https://docs.kaia.io/build/get-started/getting-kaia/) để xem hướng dẫn chi tiết.

Chúng tôi khuyến nghị bạn nên có ít nhất 0.1 KAIA cho phí gas.

## Đổi Finschia thành Kaia

:::warning[This [Việc hoán đổi là không thể đảo ngược]

Yêu cầu cung cấp và yêu cầu bồi thường chỉ có thể được xử lý một lần và không thể hủy bỏ.
Hãy đọc kỹ trước khi thực hiện theo các hướng dẫn này.

:::

### 1. Kết nối ví của bạn

#### 1.1 Kết nối MetaMask

Nhấp vào nút "Kết nối MetaMask".

<p align="center"><img src="/img/misc/kaiabridge_connect_metamask.png" alt="Connect MetaMask" width="30%"/></p>

Kiểm tra xem mục "Tài khoản" có hiển thị địa chỉ của bạn không.
Nếu không, hãy mở tiện ích mở rộng MetaMask và kiểm tra xem có thông báo rằng bạn không kết nối với trang web hay không. Nếu vậy, hãy nhấn nút "Kết nối tài khoản".

<p align="center"><img src="/img/misc/kaiabridge_connect_account.png" alt="Connect Account" width="30%"/></p>

#### 1.2 Kết nối Ví Kaia

Nếu bạn đang sử dụng Kaia Wallet, trang web có thể yêu cầu bạn kết nối Kaia Wallet với dApp (trong trường hợp này là Kaia Online Toolkit).

<p align="center"><img src="/img/misc/kaiabridge_connect_kaiawallet.png" alt="Connect Kaia Wallet" width="30%"/></p>

Nhấp vào "Kết nối" để kết nối ví Kaia của bạn.

#### 2. Chuyển sang mạng chính Kaia

Kiểm tra xem bạn đã thiết lập mạng của mình đúng cách thành "Kaia Mainnet" hoặc "Mainnet" chưa. Nếu không, hãy chuyển sang Kaia Mainnet. Nếu bạn đang sử dụng MetaMask và chưa thêm mạng Kaia Mainnet vào MetaMask, hãy tham khảo [Kiểm tra mạng của bạn](#2-check-your-network).

#### 3. Xác định địa chỉ Finschia

Nhấp vào "Tạo địa chỉ Finschia". Khi được yêu cầu ký vào tin nhắn, hãy nhấp vào "Xác nhận" hoặc "Ký".

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_sign_metamask.png" alt="Sign message in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_sign_kaiawallet.png" alt="Sign message in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
Kiểm tra xem "địa chỉ Finschia được dẫn xuất" có khớp với địa chỉ Finschia gốc của bạn và "số dư CONY" có khớp với số dư của bạn trong mạng Finschia (đơn vị CONY) hay không.

<div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
  <img src="/img/misc/kaiabridge_address_and_conybalance_page.png" alt="Address and CONY balance shown in the page" style={{width: "50%"}} />
  <img src="/img/misc/kaiabridge_address_and_conybalance_wallet.png" alt="Address and CONY balance shown in your wallet" style={{width: "30%", height: "60%"}} />
</div>

<br/><br/>
Ngoài ra, hãy đảm bảo tài khoản của bạn có đủ KAIA để thanh toán phí gas (bạn có thể kiểm tra trong ví của mình).

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_balance_metamask.png" alt="KAIA balance in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_balance_kaiawallet.png" alt="KAIA balance in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
Nếu tài khoản của bạn không có KAIA, hãy tham khảo [Nạp tiền vào tài khoản](#3-gas-up-your-account).

#### 4. Yêu cầu cung cấp

Nhấp vào "Yêu cầu cấp phép". Khi được yêu cầu ký tên vào tin nhắn và gửi giao dịch, hãy nhấp vào "Xác nhận".

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_provision_metamask.png" alt="Confirm provision transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_provision_kaiawallet.png" alt="Confirm provision transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
Quá trình này sẽ mất vài giây. Hãy đợi cho đến khi giao dịch hoàn tất.
Bạn có thể kiểm tra kết quả trên trang web.

<p align="center"><img src="/img/misc/kaiabridge_provision_success.png" alt="Provision request successful" width="80%"/></p>

<br/>
Nếu không, hãy làm mới và bắt đầu lại từ đầu.

#### 5. Yêu cầu bồi thường

Nhấp vào "Yêu cầu bồi thường". Khi được yêu cầu xác nhận giao dịch, hãy nhấp vào "Xác nhận".

<div style={{display: "flex", justifyContent: "space-evenly"}}>
  <img src="/img/misc/kaiabridge_confirm_claim_metamask.png" alt="Confirm claim transaction request in MetaMask" style={{width: "30%"}} />
  <img src="/img/misc/kaiabridge_confirm_claim_kaiawallet.png" alt="Confirm claim transaction request in Kaia Wallet" style={{width: "30%"}} />
</div>

<br/><br/>
Quá trình này sẽ mất vài giây. Hãy đợi cho đến khi giao dịch hoàn tất.
Bạn có thể kiểm tra kết quả trên trang web.

<p align="center"><img src="/img/misc/kaiabridge_claim_success.png" alt="Claim request successful" width="80%"/></p>

<br/>
Kiểm tra số dư tài khoản của bạn. Số tiền yêu cầu nên là (số dư tài khoản của bạn) * (tỷ giá hối đoái, khoảng 148) trong [kei](https://docs.kaia.io/learn/token-economics/kaia-native-token/#units-of-kaia-).