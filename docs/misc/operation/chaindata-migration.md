# Migrate Chaindata

<aside>
💡 Run migration only for PN and EN nodes (not CN)

</aside>

## Things to know before this job <a id="things-to-know-before-this-job"></a>
- It needs m6i.8xlarge spec (32 cores and 128GB memory) or higher
- 7 days for full progress (Migration is divided in 2 parts)
    - Part 1 - Migrate DB to a new directory (The message “State migration is completed”  appears)
    - Part 2 - New Block generation on new directory (old directory will be deleted after this)
- 500GB free space should be available

## Go to Kaia Console

```bash
$ kpn attach klay.ipc

#start chain data Migration
> admin.startStateMigration()
null

# Check Status
> admin.stateMigrationStatus

#stop Migration
> admin.stopStateMigration()

```
