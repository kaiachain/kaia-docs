# 체인 데이터 변경

<aside>
💡 이 가이드는 Amazon Linux 2를 기반으로 합니다.

</aside>

## CN 노드 마이그레이션 단계

### 새 디스크 만들기

1. 새 디스크(3,500GB 디스크) 준비 또는 현재 디스크에 새 경로 만들기(사용 가능한 3,500GB가 있어야 함).

<aside>
💡 새 경로가 `/var/kcnd2`라고 가정합니다.

</aside>

#### 옵션 1 - 새 디스크(2500GB 이상)

1. 디스크를 EC2에 연결하고 아래 명령을 실행합니다.

```bash
$ lsblk
NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
nvme2n1       259:0    0  3500G  0 disk **# New Disk**
nvme1n1       259:0    0  4000G  0 disk /var/kcnd
nvme0n1       259:2    0    8G  0 disk
├─nvme0n1p1   259:3    0    8G  0 part /
└─nvme0n1p128 259:4    0    1M  0 part
```

2. 아래 절차에 따라 마운트합니다.

```bash
$ sudo e2fsck -f /dev/nvme2n1
$ sudo mkfs -t ext4 /dev/nvme2n1
$ sudo mkdir /var/kcnd2
$ sudo mount /dev/nvme2n1 /var/kcnd2
$ sudo mkdir /var/kcnd2/data
$ sudo mkdir /var/kcnd2/log
```

#### 옵션 2 - 현재 디스크(권장하지 않음)

1. 새 폴더 만들기

```bash
$ sudo mkdir /var/kcnd2/data
$ sudo mkdir /var/kcnd2/log
```

### 최신 체인 데이터 다운로드

새로운 카이아 데이터 DIR의 데이터에 체인 데이터를 다운로드합니다. (체인 데이터에 대한 자세한 내용은 [https://packages.klaytn.net/cypress/chaindata/](https://packages.klaytn.net/cypress/chaindata/)에서 확인할 수 있습니다.)

1. 다음 명령으로 다운로드합니다.

```bash
# (Option 1: recommended) curl 
$ curl -o klaytn-cypress-chaindata-2021???????????.tar.gz "https://s3.ap-northeast-2.amazonaws.com/klaytn-chaindata/cypress/klaytn-cypress-chaindata-2021???????????.tar.gz"

# (Option 2) aws s3 command
$ aws s3 cp s3://klaytn-chaindata/cypress/klaytn-cypress-chaindata-2021???????????.tar.gz klaytn-cypress-chaindata-20211113011111.tar.gz 

# (Option 3) axel (need to install axel)
sudo amazon-linux-extras install epel -y
sudo yum install axel pigz
$ axel -n8 https://s3.ap-northeast-2.amazonaws.com/klaytn-chaindata/cypress/klaytn-cypress-chaindata-2021???????????.tar.gz
```

2. 압축 해제

```bash
# (Option 1: recommended) tar
$ tar -xvf klaytn-cypress-chaindata-2021???????????.tar.gz

# (Option 2) pigz (need to isntall pigz)
$ tar -I pigz -xvf klaytn-cypress-chaindata-2021???????????.tar.gz
```

## DATA_DIR & LOG_DIR 구성하기

### 옵션 1 - 이전 경로와 새 경로 바꾸기

<aside>
🚨 미정

</aside>

1. 스왑 전 클레이튼 데몬 프로세스 중지

   1. _**중요**_ 노드 유형이 CN인 경우 Kaia 카운슬에서 CN 노드를 제거합니다.

   EN용 패키지는 [CN 시작하기](../../nodes/core-cell/install/install-consensus-nodes.md#startup-the-cn)에서 받을 수 있습니다.

2. 이전 경로와 새 경로 바꾸기

   1. 새 디스크

      ```bash
      umount /var/kcnd # old path
      umount /var/kcnd2 # new path
      mount /dev/nvme2n1 /var/kcnd
      ```

   💡 이 명령은 적절한 권한으로 실행해야 합니다.

   2. 현재 디스크

      ```bash
      sudo mv /var/kcnd /var/kcnd_old # old_path
      sudo mv /var/kcnd2 /var/kcnd # new path
      ```

3. (선택 사항) 더 이상 필요하지 않은 경우 이전 경로를 삭제합니다.

### 옵션 2 - klaytn 구성 파일에서 DATA_DIR 및 LOG_DIR 업데이트하기

1. 카이아 디렉터리 경로 변경
   - 옵션 1 - 새 디스크
     - 기존 디스크에서 새 디스크로 `fstab` 값을 변경합니다.
   - 옵션 2 - 현재 디스크
     - `kcnd.conf`에서 DIR 경로를 변경합니다.

## 프로세스 재시작(또는 인스턴스 재부팅)

<aside>
💡 디스크를 추가하기 위해 재부팅이 필요한 경우 인스턴스를 재부팅합니다.

</aside>

1. _**중요**_ 노드 타입이 CN인 경우 카이아 카운슬에서 CN 노드를 제거합니다.
2. 프로세스 재시작 또는 인스턴스 재부팅
