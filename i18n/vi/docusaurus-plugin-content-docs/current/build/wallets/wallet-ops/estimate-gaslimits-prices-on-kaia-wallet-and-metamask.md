# Cách ước tính giới hạn gas và giá gas trên Kaia Wallet và MetaMask

Hướng dẫn này cung cấp một hướng dẫn chi tiết từng bước về cách ước tính phí gas / giá gas trên Kaia.

## Khí là gì?

Gas là đơn vị đo lường cho lượng công sức tính toán cần thiết để xử lý một giao dịch (chuyển giá trị) hoặc gọi hợp đồng thông minh (smart contract call) trên chuỗi Kaia. Trong bối cảnh này, thuật ngữ này đề cập đến quá trình tính toán được thực hiện trên Máy ảo Kaia (KVM).

Mạng lưới Kaia yêu cầu gas để thực hiện các giao dịch. Khi bạn gửi token, tương tác với hợp đồng thông minh, gửi KAIA hoặc thực hiện bất kỳ thao tác nào khác trên blockchain, bạn phải trả phí cho quá trình tính toán đó. Số tiền thanh toán được tính bằng gas, và gas luôn được thanh toán bằng KAIA.

## Giới hạn gas là gì?

Giới hạn gas là lượng gas tối đa mà bạn sẵn sàng tiêu thụ cho một giao dịch. Các giao dịch phức tạp hơn, đặc biệt là những giao dịch thực thi hợp đồng thông minh, yêu cầu nhiều tài nguyên tính toán hơn và giới hạn gas cao hơn so với các giao dịch thanh toán đơn giản. Một giao dịch chuyển khoản KAIA tiêu chuẩn thường sử dụng khoảng 21.000 gas.

Nếu bạn đặt giới hạn gas quá cao, ví dụ 50.000 cho một giao dịch chuyển tiền đơn giản, giao dịch sẽ chỉ sử dụng lượng gas cần thiết (khoảng 21.000) và trả lại phần còn lại. Nhưng nếu bạn đặt giá trị quá thấp, ví dụ 20.000, giao dịch sẽ thất bại ngay lập tức và không tiêu tốn gas. Và nếu một giao dịch hết gas trong quá trình thực thi, chẳng hạn như khi một hợp đồng thông minh được gọi, nó sẽ hoàn tác tất cả các tác động của mình, nhưng bạn vẫn phải trả phí gas mà nó đã sử dụng.

## Cấu trúc phí gas tổng thể

Kể từ sau hard fork Kaia, tổng phí mà người tạo giao dịch phải trả được tính như sau:

( **giá gas**  x **số đơn vị gas đã sử dụng**).

Nơi **gasPrice** = **phí cơ bản** + **phí ưu tiên**

### Phí cơ bản là gì?

Phí cơ bản là mức giá tối thiểu cho mỗi đơn vị gas mà bạn phải trả để giao dịch của bạn được xử lý trên mạng. Nó được thiết lập bởi chính mạng lưới và điều chỉnh tăng hoặc giảm sau mỗi khối, tùy thuộc vào việc khối trước đó có vượt quá hay không đạt được mục tiêu gas — lượng giao dịch mà mạng lưới aiming to handle trong mỗi khối.

Nếu một khối đang bận rộn và sử dụng nhiều hơn mức mục tiêu, phí cơ bản sẽ tăng (5%) để giúp giảm bớt tắc nghẽn; nếu khối trở nên ít bận rộn hơn, phí cơ bản sẽ giảm.  Cơ chế này giúp duy trì kích thước khối ổn định và làm cho phí giao dịch trở nên dễ dự đoán hơn cho tất cả mọi người. Phí cơ bản sẽ bị đốt cháy ngay sau khi giao dịch được xử lý, loại bỏ nó khỏi lưu thông.

### Phí ưu tiên là gì?

Phí ưu tiên, còn được gọi là tiền tip, là một khoản phí bổ sung mà bạn tự nguyện thanh toán ngoài phí cơ bản để giúp ưu tiên giao dịch của bạn. Trên Kaia, tip này không được chuyển trực tiếp đến validator; thay vào đó, nó được đóng góp vào quỹ thưởng của mạng lưới, sau đó được phân phối cho cả validator và quỹ phát triển hệ sinh thái. Bằng cách cung cấp một khoản tip cao hơn, bạn đang cho thấy rằng bạn sẵn sàng trả thêm để giao dịch của mình được xử lý nhanh hơn và được ưu tiên trước các giao dịch khác trong cùng một khối.

## Ước tính phí gas

Để có cái nhìn rõ ràng về lượng gas mà các giao dịch của bạn thường tiêu thụ, việc áp dụng phương pháp sau đây là một thói quen tốt:

### Sử dụng API eth_estimateGas trong ethers.js

Thay vì phỏng đoán lượng gas mà giao dịch của bạn có thể tiêu thụ, bạn có thể tận dụng bối cảnh thực thi của nút để xác định chính xác lượng tài nguyên tính toán mà nút dự kiến giao dịch của bạn sẽ yêu cầu trước khi truyền nó lên chuỗi khối.

Điều này hữu ích cho các nhà phát triển, những người cần kiểm soát chi phí gas một cách tự động và tránh các lỗi do hết gas, cũng như cho người dùng thông thường, những người muốn biết tổng phí trước và tránh các khoản phí bất ngờ trong ví của mình.

Điều này được thực hiện bằng cách sử dụng API **eth_estimateGas**, được cung cấp thông qua ethers.js.

**Ví dụ – Ước tính lượng gas cho hàm mint**

Giả sử bạn muốn ước tính lượng gas cần thiết cho hàm mint của một hợp đồng thông minh. Dưới đây là kịch bản chi tiết và đầy đủ để thực hiện:

```js
const { ethers } = require('ethers');
require('dotenv').config();

const GOLD_CONTRACT_ADDRESS = '0xE13d6C18c52c1de9267aE6DF647fD4ADfAf82977';
const AMOUNT_TO_SEND = ethers.parseUnits('20', 18); // 20 tokens

// minimal ABI for the `mint` function
const MINT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Main script
async function estimateMintGas() {

 try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.ES_PRIVATE_KEY, provider);
    
    // prepare encoded transaction
    const iface = new ethers.Interface(MINT_ABI);
    const encodedData = iface.encodeFunctionData('mint', [wallet.address, AMOUNT_TO_SEND]);
    
    // estimate Gas
    const estimatedGas = await provider.estimateGas({ 
      to: GOLD_CONTRACT_ADDRESS, 
      from: wallet.address, 
      data: encodedData 
    });

    // gasPrice
    const gasPrice = await provider.getFeeData();

    console.log("Estimated Gas for mint:", estimatedGas.toString());
    console.log("Estimated GasPrice for mint:", gasPrice.gasPrice.toString());

    return estimatedGas;
    
  } catch (error) {
    console.error('Gas estimation failed!', error.reason || error.message);
    throw error;
  }
}

estimateMintGas().catch((err) => console.error('Error estimating gas!', err)); 
```

Chạy skript này sẽ tạo ra kết quả như sau:

```bash
Estimated Gas for mint : 69002
Estimated GasPrice for mint: 27500000000
```

ethers.js xây dựng dữ liệu giao dịch từ ABI và các tham số của hợp đồng thông minh của bạn, thực hiện một lần chạy thử bằng cách gửi nó đến nút với eth_estimateGas, và nút thực thi nó mà không thêm vào khối để xác định chính xác lượng gas cần thiết.

Từ các thông tin trên, chúng ta có thể dễ dàng ước tính phí gas:

_Lượng khí sử dụng_ × _Giá khí_

_69002 × 0.0000000275
\= 0.001897555 KAIA_

### Sử dụng MetaMask (Chuyển KAIA)

![](/img/build/wallets/estimate-gas-mm.png)
Như bạn có thể thấy từ hình ảnh:

- Lượng khí sử dụng: 21.000
- Phí cơ bản: 25 Gwei (hoặc 0.000000025 KAIA)
- Phí ưu tiên: 2.5 Gwei (hoặc 0.0000000025 KAIA)

Để tính tổng phí gas, chúng ta chỉ cần nhân Lượng gas sử dụng với tổng của Phí cơ bản và Phí ưu tiên.

_21.000 \* (0,000000025 + 0,0000000025)
0,0005775 KAIA._

Điều này cho thấy rõ ràng cách tổng số đã được tính toán thành **0.0005775 KAIA**, trùng khớp chính xác với số liệu hiển thị trong hình ảnh chi tiết giao dịch của MetaMask ở trên.

### Sử dụng Kaiascan (Thực thi hợp đồng thông minh - Chức năng SafeMint)

![](/img/build/wallets/estimate-gas-kaiascan.png)

Như bạn có thể thấy trong hình:

- Lượng khí sử dụng: 184.250
- Giá gas hiệu quả (Phí cơ bản + Phí ưu tiên) = 0.0000000275
  - Phí cơ bản: 25 Gkei (hoặc 0.000000025 KAIA)
  - Phí ưu tiên: 2.5 Gkei (hoặc 0.0000000025 KAIA)

Để tính tổng phí gas, chúng ta chỉ cần nhân Lượng gas sử dụng với tổng của Phí cơ bản và Phí ưu tiên:

_184.250 \* (0,000000025 + 0,0000000025)
0,005066875 KAIA_

Điều này cho thấy rõ ràng cách tổng số đã được tính toán thành 0.005066875 KAIA, trùng khớp chính xác với giá trị hiển thị trong hình ảnh chi tiết giao dịch của Kaiascan ở trên.

### Sử dụng phí cơ bản của khối trước đó

Nếu bạn muốn tính toán dựa trên phí cơ bản của khối trước đó, hãy thực hiện theo cách sau:

Để tính phí cơ bản tiếp theo, bạn nhân phí cơ bản trước đó với 1.05 nếu khối đã đầy hoặc vượt quá mục tiêu gas của nó. Điều này có nghĩa là khi mức tiêu thụ gas của một khối vượt quá mục tiêu của mạng lưới, phí cơ bản sẽ tăng thêm 5% để giúp giảm bớt tắc nghẽn và làm giảm nhu cầu. Nếu khối không được sử dụng hết công suất, phí cơ bản có thể giữ nguyên hoặc thậm chí giảm trong các khối tiếp theo.

| Chặn | Khí đốt đã bao gồm                         | Phí cơ bản trước đây | Phí cơ bản tiếp theo                                          |
| ---- | ------------------------------------------ | -------------------- | ------------------------------------------------------------- |
| 1    | 15.000.000 | 100 gkei             | 100 gkei                                                      |
| 2    | 30.000.000 | 100 gkei             | 100 gkei                                                      |
| 3    | 30.000.000 | 100 gkei             | 100 gkei × 1.05 = 105 gkei                    |
| 4    | 30.000.000 | 105 gkei             | 105 gkei × 1.05 = 110.25 gkei |
| 5    | 30.000.000 | 110,25 gkei          | 110,25 × 1,05 = 115,76 gkei                                   |




