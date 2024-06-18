# Configure High Availability

Configuring the CN for high availability is critical for effectively operating a Core Cell. The recommended high availability scheme depends on whether the Core Cell is deployed on physical or cloud infrastructure.

## Active-Standby \(recommended for bare-metal\) <a id="active-standby-recommended-for-bare-metal"></a>

In this configuration, two CN nodes are installed in active-standby configuration. During normal operation the active node participates in block generation, while the standby only synchronizes chaindata from the network. This configuration ensures that the standby CN node has a fresh copy of the chaindata in the event of a failure in the active node.

### Setup <a id="setup"></a>

1. Create a backup of the active CN's `nodekey`.
2. Install a standby CN. The configuration is the same as the active CN except:
   - The standby should use a different `nodekey`
   - Add the addresses of the PNs to `$DATA_DIR/static-nodes.json`

### Failover <a id="failover"></a>

1. Stop the standby CN: `sudo systemctl stop kcnd`
2. Replace the `nodekey` of the standby with the `nodekey` of the failed active CN.
3. Reassign the IP address of the active CN to the standby CN.
4. Start the standby CN and verify that it is in sync with the network: `sudo systemctl start kcnd`

## Machine Image & Snapshot \(recommended for cloud\) <a id="machine-image-snapshot-recommended-for-cloud"></a>

Cloud infrastructure allows operators to replace failed nodes much more quickly, so it is not necessary to operate a second standby CN. Instead, it is sufficient to ensure that a new CN can be quickly provisioned and provided with a updated copy of the chaindata.

The exact terminology and procedure may vary across different cloud environments. The procedure below is based on AWS \(specifically EC2 and EBS\), but can be adapted for other cloud platforms.

### Setup <a id="setup"></a>

1. Create a backup of the active CN's `nodekey`.
2. Each time the CN configuration or software is updated, create a machine image \(e.g. AMI\). Do not include the volume containing `DATA_DIR` in this image -- this will be obtained separately.

### Failover <a id="failover"></a>

Use any of the CC's PN nodes to obtain a chaindata snapshot:

1. Connect to any PN node and stop kpnd: `sudo systemctl stop kpnd`. It is important to stop kpnd first, to ensure data consistency.
2. Using the AWS console, create a snapshot of the volume containing the PN's `DATA_DIR`.
3. Start kpnd: `sudo systemctl start kpnd`

Create a new CN using the base CN image and the chaindata image:

1. Create an instance using the CN image \(created in "Setup" above\).
2. Attach a volume created from the snapshot of the PN's `$DATA_DIR`.
3. Remove all files from the volume except `$DATA_DIR/klay/chaindata`. Confirm that the `DATA_DIR` set in `kcnd.conf` matches the directory containing the chaindata. It may be necessary to rename the directory if the name is different.
4. Copy the `nodekey` of the failed CN to `$DATA_DIR/klay/nodekey`.
5. Reassign the IP address of the failed CN to the replacement.
6. Start kcnd: `sudo systemctl start kcnd`
7. Verify the CN is in sync with the network.

## Additional Considerations <a id="additional-considerations"></a>

Reassigning the public IP of the failed CN to the replacement CN will allow the replacement to connect immediately to other CNs. If the IP changes, the new CN will not be able to connect to the network until all other CCOs have updated their firewall configurations.
