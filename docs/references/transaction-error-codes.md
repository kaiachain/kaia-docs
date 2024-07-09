# Transaction Error Codes

Kaia provides a field `txError` in the transaction receipt to give developers more information about the reason for the failed transaction execution. This field exists only if the transaction execution is failed. To save storage and network bandwidth, `txError` contains an integer value. The below table shows the meaning of the value in `txError`.

| Error Code | Description |
| :--- | :--- |
| 0x02 | VM error occurs while running smart contract |
| 0x03 | max call depth exceeded |
| 0x04 | contract address collision |
| 0x05 | contract creation code storage out of gas |
| 0x06 | evm: max code size exceeded |
| 0x07 | out of gas |
| 0x08 | evm: write protection |
| 0x09 | evm: execution reverted |
| 0x0a | reached the opcode computation cost limit for tx |
| 0x0b | account already exists |
| 0x0c | not a program account \(e.g., an account having code and storage\) |
| 0x0d | Human-readable address is not supported now |
| 0x0e | fee ratio is out of range \[1, 99\] |
| 0x0f | AccountKeyFail is not updatable |
| 0x10 | different account key type |
| 0x11 | AccountKeyNil cannot be initialized to an account |
| 0x12 | public key is not on curve |
| 0x13 | key weight is zero |
| 0x14 | key is not serializable |
| 0x15 | duplicated key |
| 0x16 | weighted sum overflow |
| 0x17 | unsatisfiable threshold. Weighted sum of keys is less than the threshold. |
| 0x18 | length is zero |
| 0x19 | length too long |
| 0x1a | nested composite type |
| 0x1b | a legacy transaction must be with a legacy account key |
| 0x1c | deprecated feature |
| 0x1d | not supported |
| 0x1e | smart contract code format is invalid |

