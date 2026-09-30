# Use Chaindata Snapshots

You can start a node from an already-synced database called a chaindata snapshot. A chaindata snapshot is a compressed Kaia data directory.

:::note

This saves time to [Full Sync](../../learn/storage/block-sync.md#full-sync) the whole blockchain, allowing you to relatively quickly start a new node or recover from corrupt database.

:::

## Prepare Data Directory

Before start, prepare enough disk space to accommodate both compressed file and uncompressed directory.

- If you're going to start from an empty machine, simply create a datadir.
  ```sh
  sudo mkdir /var/kend
  ```
- If you're going to swap the existing directory, create a temporary directory.
  - Option 1. Mount a new disk (Recommended for optimal disk utilization)
    ```sh
    $ lsblk
    NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
    nvme2n1       259:0    0  3500G  0 disk /var/kend2 # New disk at temporary path
    nvme1n1       259:0    0  4000G  0 disk /var/kcnd  # Old disk at production path
    nvme0n1       259:2    0    8G  0 disk
    ├─nvme0n1p1   259:3    0    8G  0 part /
    └─nvme0n1p128 259:4    0    1M  0 part

    ```
  - Option 2. Use existing disk
    ```sh
    sudo mkdir /var/kend2/data
    ```

## Download the File

게시된 모든 스냅샷은 [snapshots.node.kaia.io](https://snapshots.node.kaia.io/)에 나열되어 있으며, 각 네트워크는 최신 스냅샷의 URL을 한 줄로 된 `latest.txt` 파일로 게시합니다. 이 내용을 변수에 읽어두면, 새로운 스냅샷이 게시될 때 아래 명령어를 수정할 필요가 없습니다.

```sh
# 메인넷; Kairos의 경우 mainnet을 kairos로 대체하십시오
URL=$(curl -s https://snapshots.node.kaia.io/mainnet/pruning-chaindata/latest.txt)
echo "$URL"
```

- Option 1. curl
  ```sh
  curl -O "$URL"
  ```
- Option 2. wget
  ```sh
  wget "$URL"
  ```
- Option 3. axel
  ```sh
  # Amazon Linux 설치 예시
  sudo amazon-linux-extras install epel
  sudo yum install axel

  # 멀티스레드 다운로드 및 출력 상태 표시줄
  axel -n8 "$URL" | awk -W interactive '$0~/\[/{printf "%s'$'\r''", $0}'
  ```
- 옵션 4. aria2
  ```sh
  # Rocky Linux 설치 예시
  sudo yum install epel-release aria2

  # 경량형, 다중 연결 다운로드
  aria2c "$URL"
  ```

## Decompress the File

스냅샷은 [zstd](https://github.com/facebook/zstd)로 압축되며, 파일 이름은 `.tar.zst`로 지정됩니다. 아카이브에는 `klay/chaindata` 디렉터리가 포함되어 있으므로, 이를 데이터 디렉터리 자체에 추출하십시오.

- Option 1. tar
  ```sh
  tar --zstd -xvf kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -C /var/kend/data
  ```
- Option 2. zstd, 그 다음 tar
  ```sh
  # --zstd 옵션 없이 빌드된 tar의 경우. Amazon Linux 및 Rocky Linux 설치 예시
  sudo yum install zstd

  zstd -d kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -o out.tar
  tar -xf out.tar -C /var/kend/data
  ```
- 선택지 3. 한 번에 다운로드하고 압축 해제하기
  ```sh
  # 아카이브 파일과 이를 추출할 디렉토리를 모두 저장할 공간이 부족합니다.
  curl -s "$URL" | tar --zstd -xf - -C /var/kend/data
  ```

## Swap the data directory

- First, stop the node.
  - **IMPORTANT**: If you are running a consensus node (CN), make sure to remove the node from the Council.
- Option 1. Swap the content at the same path
  - If you mounted new disk, change the mount.
    ```sh
    umount /var/kend  # Old disk
    umount /var/kend2 # New disk at temporary path
    mount /dev/nvme2n1 /var/kend  # New disk at production path
    ```
  - If you used existing disk, rename the directory.
    ```sh
    mv /var/kend /var/kend_old  # Old data
    mv /var/kend2 /var/kend     # New data
    ```
- Option 2. 노드 구성에서 경로 변경
  - Change `DATA_DIR` value in the `kend.conf` file.
- 원한다면 오래된 데이터와 `.tar.zst` 파일을 삭제할 수 있습니다.
- Finally, start the node.

## Downloads

스냅샷은 \*\*[snapshots.node.kaia.io](https://snapshots.node.kaia.io/)\*\*에 게시되며, 여기에는 모든 스냅샷의 목록과 해당 크기 및 체크섬이 기재되어 있습니다. 이 페이지와 함께, 각 네트워크는 스크립트용으로 두 개의 파일을 공개합니다. `latest.txt` 파일에는 최신 스냅샷의 URL이 한 줄로 기재되어 있으며, `manifest.json` 파일에는 각 스냅샷의 크기, 체크섬 및 생성 시간이 포함되어 있습니다.

| network | sync options | download                                                                                                        | 스크립트용                                                                                                                                                                                                       |
| ------- | ------------ | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mainnet | live pruning | https://snapshots.node.kaia.io/#mainnet-pruning | [latest.txt](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/manifest.json) |
| kairos  | live pruning | https://snapshots.node.kaia.io/#kairos-pruning  | [latest.txt](https://snapshots.node.kaia.io/kairos/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/kairos/pruning-chaindata/manifest.json)   |

실시간으로 정제된 데이터베이스만 공개됩니다. 개념에 대해서는 [스토리지 최적화](../../learn/storage/storage-optimization.md)를 참고하세요. 더 이상 배치 정리(상태 이전)된 스냅샷이 생성되지 않으며, 전체 데이터베이스나 아카이브 데이터베이스도 생성되지 않습니다. 이러한 데이터베이스가 필요한 경우, 제네시스부터 새로운 전체 동기화를 수행하거나 devops@kaia.io에 문의하십시오.

:::note

이 페이지에 예전에 나열되어 있던 `https://packages.kaia.io/<network>/chaindata/` 및 `.../pruning-chaindata/` URL은 더 이상 업데이트되지 않습니다. 해당 디렉터리 아래에 있는 `latest.txt`나 `manifest.json`을 참조하는 모든 코드는 대신 위 표에 있는 URL을 참조해야 합니다.

:::
