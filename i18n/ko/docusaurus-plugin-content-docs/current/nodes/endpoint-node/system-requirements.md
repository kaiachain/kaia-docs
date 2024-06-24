# 시스템 요구 사항

엔드포인트 노드(EN)를 실행하려면 엔터프라이즈급 하드웨어를 갖춘 본격적인 합의 노드에서 생성된 블록을 검증해야 하기 때문에 이더리움이나 다른 블록체인에 비해 상대적으로 높은 하드웨어 사양이 필요합니다.

EN의 경우 다음 사양을 권장합니다.

## H/W 사양 <a id="h-w-specification"></a>

### 클라우드 VM <a id="cloud-vm"></a>

#### 권장 사양 <a id="recommended-specification-based-on-aws"></a>

| vCPU | 메모리(GiB) | 스토리지(GiB) | 디스크 대역폭(Mbps) | 네트워크 대역폭(Gbps) |
| :--- | :-------------------------- | :--------------------------- | :------------------------------- | :-------------------------------- |
| 8    | 64                          | > 4,000                      | 3,500                            | 최대 10                             |

### 베어메탈 머신 <a id="bare-metal-machine"></a>

EN에 대한 정확한 물리적 머신 사양은 명시되어 있지 않지만, Cloud VM 섹션에 나와 있는 것과 유사한 하드웨어 구성을 가진 물리적 머신이면 EN을 작동하는 데 충분합니다.

## Storage Requirements <a id="storage-requirements"></a>

Assuming 100 TPS in average,  300 bytes average transaction size, and 1-second block latency, the expected EN daily storage requirement is 2.5 GB/day (=300x100x86400).

## Operating System <a id="operating-system"></a>

Recommended environment is [Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/).
Kaia binaries are fully tested on Amazon Linux 2, but they should work on other linux-based environments as well.
macOS binaries are also provided for development purpose.
