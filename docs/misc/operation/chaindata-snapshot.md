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

Download a compressed file to the new directory. URLs can be found at the bottom of this page.

- Option 1. curl
  ```sh
  curl -O https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```
- Option 2. wget
  ```sh
  wget https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```
- Option 3. axel
  ```sh
  # Amazon Linux installation example
  sudo amazon-linux-extras install epel
  sudo yum install axel pigz

  # Multi-threaded download and print status bar
  axel -n8 https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz | awk -W interactive '$0~/\[/{printf "%s'$'\r''", $0}'
  ```
- Option 4. aria2
  ```sh
  # Rocky Linux installation example
  sudo yum install epel-release aria2

  # Lightweight, multi-connection download
  aria2c https://storage.googleapis.com/kaia-chaindata/mainnet/kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```

## Decompress the File

- Option 1. tar
  ```sh
  tar -xvf kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```
- Option 2. tar and pigz
  ```sh
  # Amazon Linux & Rocky Linux installation example
  sudo yum install pigz

  # Multi-threaded decompression
  tar -I pigz -xvf kaia-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
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
- Optionally delete old data and tar.gz file.
- Finally, start the node.

## Downloads

For efficiency, only batch pruned (state migrated) or live pruned database are provided. Read [Storage Optimization](../../learn/storage/state-pruning.md) for their concepts. If you want a full database without neither pruning, or even archive data, perform a fresh full sync from genesis.

| network | sync options | download |
|-|-|-|
| mainnet | state migrated | https://packages.kaia.io/mainnet/chaindata/ |
| mainnet | live pruning | https://packages.kaia.io/mainnet/pruning-chaindata/ |
| kairos | state migrated | https://packages.kaia.io/kairos/chaindata/ |
| kairos | live pruning | https://packages.kaia.io/kairos/pruning-chaindata/ |
