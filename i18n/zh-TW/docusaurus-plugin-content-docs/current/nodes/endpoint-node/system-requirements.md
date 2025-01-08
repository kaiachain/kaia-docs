# 系統要求

與以太坊或其他區塊鏈相比，運行端點節點（EN）需要更高的硬件規格，因為 EN 必須驗證由配備企業級硬件的成熟共識節點生成的區塊。

對於 EN，建議採用以下規格。

## 硬件/軟件規格<a id="h-w-specification"></a>

### 雲虛擬機<a id="cloud-vm"></a>

#### 建議規格<a id="recommended-specification-based-on-aws"></a>

| vCPU | 內存（GB） | 存儲（GiB） | 磁盤帶寬（兆比特/秒） | 網絡帶寬（吉比特/秒） |
| :--- | :----- | :------ | :---------- | :---------- |
| 8    | 64     | > 4,000 | 3,500       | 最多 10       |

### 裸機<a id="bare-metal-machine"></a>

我們沒有指定 EN 的具體物理機規格，但任何具有與雲虛擬機部分類似硬件配置的物理機都足以運行 EN。

## 存儲要求<a id="storage-requirements"></a>

假設平均 TPS 為 100，平均事務大小為 300 字節，區塊延遲為 1 秒，則 EN 的預計日存儲需求為 2.5 GB/天（=300x100x86400）。

## 操作系統<a id="operating-system"></a>

建議使用 [Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/)。
Kaia 二進制文件已在亞馬遜 Linux 2 上進行了全面測試，但也可在其他基於 Linux 的環境中運行。
還提供了用於開發的 macOS 二進制文件。
