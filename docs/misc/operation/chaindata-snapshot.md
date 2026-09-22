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

Every published snapshot is listed at [snapshots.node.kaia.io](https://snapshots.node.kaia.io/), and each network publishes the newest one's URL as a one-line `latest.txt`. Read it into a variable and the commands below need no editing when a new snapshot is published.

```sh
# mainnet; for Kairos, replace mainnet with kairos
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
  # Amazon Linux installation example
  sudo amazon-linux-extras install epel
  sudo yum install axel

  # Multi-threaded download and print status bar
  axel -n8 "$URL" | awk -W interactive '$0~/\[/{printf "%s'$'\r''", $0}'
  ```
- Option 4. aria2
  ```sh
  # Rocky Linux installation example
  sudo yum install epel-release aria2

  # Lightweight, multi-connection download
  aria2c "$URL"
  ```

## Decompress the File

Snapshots are compressed with [zstd](https://github.com/facebook/zstd) and named `.tar.zst`. The archive holds a `klay/chaindata` directory, so extract it into the data directory itself.

- Option 1. tar
  ```sh
  tar --zstd -xvf kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -C /var/kend/data
  ```
- Option 2. zstd, then tar
  ```sh
  # For a tar built without --zstd. Amazon Linux & Rocky Linux installation example
  sudo yum install zstd

  zstd -d kaia-mainnet-pruning-chaindata-xxxxxxxxxxxxxx.tar.zst -o out.tar
  tar -xf out.tar -C /var/kend/data
  ```
- Option 3. Download and extract in one pass
  ```sh
  # No room for both the archive and the directory it expands into
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
- Option 2. Change the path in the node configuration
  - Change `DATA_DIR` value in the `kend.conf` file.
- Optionally delete old data and the `.tar.zst` file.
- Finally, start the node.

## Downloads

Snapshots are published at **[snapshots.node.kaia.io](https://snapshots.node.kaia.io/)**, which lists every snapshot with its size and checksum. Alongside the page, each network publishes two files for scripts: `latest.txt`, the newest snapshot's URL on one line, and `manifest.json`, every snapshot with its size, checksum and creation time.

| network | sync options | download | for scripts |
|-|-|-|-|
| mainnet | live pruning | https://snapshots.node.kaia.io/#mainnet-pruning | [latest.txt](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/mainnet/pruning-chaindata/manifest.json) |
| kairos | live pruning | https://snapshots.node.kaia.io/#kairos-pruning | [latest.txt](https://snapshots.node.kaia.io/kairos/pruning-chaindata/latest.txt) · [manifest.json](https://snapshots.node.kaia.io/kairos/pruning-chaindata/manifest.json) |

Only live-pruned databases are published. Read [Storage Optimization](../../learn/storage/storage-optimization.md) for the concept. Batch-pruned (state migrated) snapshots are no longer produced, and neither are full or archive databases: for those, perform a fresh full sync from genesis, or write to devops@kaia.io.

:::note

The `https://packages.kaia.io/<network>/chaindata/` and `.../pruning-chaindata/` URLs this page used to list are no longer updated. Anything reading `latest.txt` or `manifest.json` under them should read the URLs in the table above instead.

:::
