# Log operation

## Configure Log Rotation

You can enable the log rotation by setting the `--log.rotate` flag, and configure the log rotation settings by the following flags.
- `--log.rotate`: By setting this flag, it enables the log rotation and applies the other log rotation options
- `--log.maxsize`: Specifies the file size in MB that triggers backup file creation
- `--log.maxbackups`: Determines the maximum number of backup files that can be stored. Once this limit is reached, older logs will be deleted.
- `--log.maxage`: Represents the maximum number of days to retain a log file. For example, if set to 30, a backup file will be deleted after 30 days.
- `--log.compress`: By setting this flag, it compresses the backup logs in gz format.

Example
```
./bin/ken ... --log.rotate --log.maxsize 100 --log.maxbackups 10 --log.maxage 30 --log.compress
```
You can also enable and configure the log rotation by setting following options in configuration file (e.g., `kend.conf`).
```
# log rotation related options
LOG_ROTATE=1 # setting 1 to enable the log rotation related options
LOG_MAXSIZE=100 # the unit is MB
LOG_MAXBACKUPS=10
LOG_MAXAGE=30 # maximum number of days to retain a log file
LOG_COMPRESS=1 # setting 1 to compress the backup logs in gz format
```
It is recommended to download and use the package which version is v1.0.0 or higher. You can download it in Binaries section of the release note(e.g., [v1.11.0 release note](https://github.com/klaytn/klaytn/releases/tag/v1.11.0)). Make sure next three files are v1.0.0 or higher: configuration file, daemon, and binary. Otherwise, it won't work.

## Normal Log Status

| Type                                        | Message                                                                                                          | Description                                                                                                                                                                                                                                                                                                                       |     |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| Error                                       | FastWebsocketHandler fail to upgrade message                                                                     | Version issue of WebSocket connection                                                                                                                                                                                                                                                                                             | low |
| Error                                       | invalid index of the proposer                                                                                    | The error that occurs when EN receives transactions from CN                                                                                                                                                                                                                                                                       | low |
| WARN                                        | ProtocolManager failed to read msg                                                                               |                                                                                                                                                                                                                                                                                                                                   | low |
| WARN                                        | Failed doConnTypeHandshake                                                                                       |                                                                                                                                                                                                                                                                                                                                   | low |
| ERRORErro                                   | Protocol istanbul/64 failed                                                                                      | Peer disconnected                                                                                                                                                                                                                                                                                                                 | low |
| Error                                       | Fasthttp Err                                                                                                     | Error when serving connection: read timeout with nothing read                                                                                                                                                                                                                                                                     | low |
| Error                                       | Fasthttp Err                                                                                                     | Error when serving connection: error when reading request headers: cannot find http request method in "\x16…                                                                                                                                                                                                                      | low |
|  Warn                                       | hash=b1b26c…6b220a err="insufficient balance for transfer"                                                       | This log occurs when the transaction processed (usually mining) cannot be executed due to insufficient balance in the "from account”(Theoretically, it occurs when the balance was sufficient at the time when the transaction was created and entered the txpool, but there was no balance at the time of the actual execution.) | low |
| ERROR                                       | ERROR\[06/06,23:23:46 Z] \[7] decode anchor payload err="rlp: expected input list for types.AnchoringDataLegacy" | Any type of value may be included in the data field of Anchoring tx. However, an error log is the output to the node when an incorrect type of value is entered                                                                                                                                                                   |     |
| Proposer : `Successfully wrote mined block` |                                                                                                                  |                                                                                                                                                                                                                                                                                                                                   |     |

Non Proposer `Inserted a new block`

## Log Level Change (0\~5)

Go to Kaia Console

```
#default Value
> debug.verbosity(3)
# hight detail logs Value
> debug.verbosity(5)
# No Logs Value
> debug.verbosity(0)

# Default Value for Blockchain log
> debug.vmodule("blockchain=3")
# High detail Value for Blockchain Log
> debug.vmodule("blockchain=5")

```
