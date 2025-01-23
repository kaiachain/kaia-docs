# 系統要求

## 硬件/軟件規格<a id="h-w-specification"></a>

網絡性能是根據網絡內最差的硬件規格來衡量的。 根據區塊鏈網絡結構，它只能縱向擴展（增加硬件容量）。 因此，建議網絡內的所有節點至少都應擁有規格相似的最佳硬件。

如果你想了解這一硬件規格的原理，medium 上的文章[為 Kaia 節點操作員確定最佳硬件規格](https://klaytn.foundation/node-operator-optimal-specs/) 會幫助你理解。

以下各節列出了 CN 和 PN 的建議規格。

### 裸機服務器<a id="bare-metal-server"></a>

| 類別  | 規格                                                                                                                                         |
| :-- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| 服務器 | 英特爾® 服務器系統 [M50CYP1UR212](https://www.intel.sg/content/www/xa/en/products/sku/214842/intel-server-system-m50cyp1ur212/specifications.html) |
| CPU | Intel® Xeon 8358 2.60 GHz （32 核/64 線程）                                                                                     |
| 內存  | 128gb （32gb \* 4\)                                                                                                                        |
| 存儲  | 4TB（或更大容量）固態硬盤（首選存儲容量和配置可能因鏈數據大小而異。 更多信息請諮詢 Kaia 團隊）。                                                                                      |

請注意，這只是 CN 和 PN 的推薦硬件規格，並非確切要求。 任何具有類似硬件配置的物理機器都足以運行 CN 或 PN。

您可以使用和應用即時修剪選項來使用即時修剪 DB。 更多詳情，請參閱 https://docs.kaia.io/learn/storage/live-pruning/。 但要注意的是，目前不建議對 CN 進行活體修剪，但這一做法將來可能會改變。

### 雲虛擬機<a id="cloud-vm"></a>

#### AWS 建議規格<a id="recommended-specification-for-aws"></a>

|                   Node Type                  |            Model            | vCPU | 內存（GiB） |                存儲大小                | 存儲速度（IOPS） |     價格（首爾地區，美元/小時）    |
| :------------------------------------------: | :-------------------------: | :--: | :-----: | :--------------------------------: | :--------: | :-------------------: |
|                      CN                      | m6i.8xlarge |  32  |   128   | 4,000 (Minimum) |    9,000   | 1.888 |
|                      PN                      | m6i.4xlarge |  16  |    64   | 4,000 (Minimum) |    9,000   | 0.944 |
| PN (with Live Pruning DB) | m6i.2xlarge |   8  |    32   | 3,500 (Minimum) |    9,000   | 0.472 |

此存儲規範源自 AWS EBS SSD (gp3) 規範。

以上信息來自 [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) 和 [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)，可能會被 AWS 更改。

#### 建議的 "Azure "規範<a id="recommended-specification-for-azure"></a>

|                   Node Type                  |  Model  | vCPU | 內存（GiB） |          存儲類型 （GiB\）          | 存儲速度（IOPS） |     價格（韓國中部，美元/小時）    |
| :------------------------------------------: | :-----: | :--: | :-----: | :---------------------------: | :--------: | :-------------------: |
|                      CN                      | D32s v5 |  32  |   128   | P50 (4096) |    7500    | 1.888 |
|                      PN                      | D16s v5 |  16  |    64   | P50 (4096) |    7500    | 0.944 |
| PN (with Live Pruning DB) |  D8s v5 |   8  |    32   | P50 (4096) |    7500    | 0.472 |

此存儲規範源自 Azure Premium Disk 規範。

以上信息來自 [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) 和 [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing)，微軟可能會對其進行修改。

#### 建議的 GCP 規範<a id="recommended-specification-for-gcp"></a>

|     節點類型     |     模型    | vCPU | 內存（GiB） | 存儲類型 （GiB\） | 存儲速度（IOPS） |     價格（亞洲-東北3，美元/小時）     |
| :----------: | :-------: | :--: | :-----: | :---------: | :--------: | :----------------------: |
|      CN      | n2- 標準-32 |  32  |   128   |  4,000（最少）  |    7500    | 2.032486 |
|      PN      | n2- 標準-16 |  16  |    64   |  4,000（最少）  |    7500    | 1.016243 |
| PN（帶即時修剪 DB） |  n2- 標準-8 |   8  |    32   |  3,500（最低）  |    7500    | 0.508121 |

以上信息來自 [https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) 和 [https://cloud.google.com/storage/pricing#asia](https://cloud.google.com/storage/pricing#asia)，谷歌可能會對其進行修改。

## 存儲要求<a id="storage-requirements"></a>

假設平均 TPS 為 100，平均事務大小為 300 字節，區塊延遲為 1 秒，則預計每天的存儲需求約為 2.5 GB/天（=300x100x86400）。

## 操作系統<a id="operating-system"></a>

建議環境與 RHEL（7.8 或更高版本）兼容。
Kaia 二進制文件已在亞馬遜 Linux 2 上進行了全面測試，但也可在其他基於 Linux 的環境中運行。 還提供了用於開發的 macOS 二進制文件。
