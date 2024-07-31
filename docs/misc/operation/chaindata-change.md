# Change Chaindata

<aside>
💡 THIS GUIDE IS BASED ON Amazon Linux 2

</aside>

## CN Node **Migration STEP**

### Create new disk

1. Preparing new disk (3,500GB disk) or creating new path on the current disk (It must have 3,500GB available.)

<aside>
💡 Assuming that the new path is `/var/kcnd2`

</aside>

#### Option 1 - New disk (more than 2500GB)

1. Attach the disk to EC2 and run the command below

```bash
$ lsblk
NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
nvme2n1       259:0    0  3500G  0 disk **# New Disk**
nvme1n1       259:0    0  4000G  0 disk /var/kcnd
nvme0n1       259:2    0    8G  0 disk
├─nvme0n1p1   259:3    0    8G  0 part /
└─nvme0n1p128 259:4    0    1M  0 part
```

2. Mount it following the process below

```bash
$ sudo e2fsck -f /dev/nvme2n1
$ sudo mkfs -t ext4 /dev/nvme2n1
$ sudo mkdir /var/kcnd2
$ sudo mount /dev/nvme2n1 /var/kcnd2
$ sudo mkdir /var/kcnd2/data
$ sudo mkdir /var/kcnd2/log
```

#### Option 2 - Current Disk (not recommended)

1. Create New Folder

```bash
$ sudo mkdir /var/kcnd2/data
$ sudo mkdir /var/kcnd2/log
```

### Download the latest chaindata

Download Chain Data to the data of the new Kaia Data DIR. (You can check the details on Chain Data in [https://packages.klaytn.net/cypress/chaindata/](https://packages.klaytn.net/cypress/chaindata/))

1. Download with the following command

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

2. Decompress

```bash
# (Option 1: recommended) tar
$ tar -xvf klaytn-cypress-chaindata-2021???????????.tar.gz

# (Option 2) pigz (need to isntall pigz)
$ tar -I pigz -xvf klaytn-cypress-chaindata-2021???????????.tar.gz
```



## Configure DATA_DIR & LOG_DIR

### Option 1 - Swap the old & new path

<aside>
🚨 TBD

</aside>

1. Stop kaia daemon process before swap
    1. ***IMPORTANT*** Remove CN node in Kaia council if the node type is CN 

    💡 You can get packages for EN in the [Startup the CN](../../nodes/core-cell/install/install-consensus-nodes.md#startup-the-cn).
    
2. Swap the old and new path
    1. New Disk

        ```bash
        umount /var/kcnd # old path
        umount /var/kcnd2 # new path
        mount /dev/nvme2n1 /var/kcnd
        ```
   💡 These commands should be executed with the appropriate privileges.

    2. Current Disk

        ```bash
        sudo mv /var/kcnd /var/kcnd_old # old_path
        sudo mv /var/kcnd2 /var/kcnd # new path
        ```

3. (Optional) Delete the old path if it is not required anymore

### Option 2 - Update DATA_DIR & LOG_DIR in kaia config file

1. Kaia DIR Path Change
    - Option 1 - New disk
        - Change `fstab` value from old disk to new disk
    - Option 2 - Current disk
        - change the DIR Path from `kcnd.conf`

## Restart Process(or Reboot Instance)

<aside>
💡 If reboot is required to add an additional disk, reboot the instance.

</aside>

1. ***IMPORTANT*** Remove CN node in Kaia council if the node type is CN
2. Restart process or reboot instance