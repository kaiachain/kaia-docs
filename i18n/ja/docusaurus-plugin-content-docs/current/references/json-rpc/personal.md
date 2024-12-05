---
description: APIs to manage accounts and private keys in the node.
---

# personal

The namespace `personal` manages private keys in the key store.

## personal_importRawKey <a id="personal_importrawkey"></a>

Imports the given unencrypted private key (hex string without leading '0x') or a [Klaytn wallet key](../../learn/accounts.md#klaytn-wallet-key-format) into the key store,
encrypting it with the passphrase.

Returns the address of the imported account.

|  Client | Method invocation                                                      |
| :-----: | ---------------------------------------------------------------------- |
| Console | `personal.importRawKey(keydata, passphrase)`                           |
|   RPC   | `{"method": "personal_importRawKey", "params": [keydata, passphrase]}` |

**Parameters**

| Name       | Type   | Description                                                                                                                                                  |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| keydata    | string | The unencrypted private key (hex string without leading '0x') or a [Klaytn wallet key](../../learn/accounts.md#klaytn-wallet-key-format). |
| passphrase | string | The pass phrase for encryption.                                                                                                                              |

**Return Value**

| Name    | Type   | Description                          |
| ------- | ------ | ------------------------------------ |
| address | string | The address of the imported account. |

**Example**

Console

```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// Using a Klaytn wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_importRawKey","params":["{private key}", "mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_importRawKey","params":["{private key}0x000x{address}", "mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```

## personal_listAccounts <a id="personal_listaccounts"></a>

Returns all the Klaytn account addresses of all keys
in the key store.

|  Client | Method invocation                                   |
| :-----: | --------------------------------------------------- |
| Console | `personal.listAccounts`                             |
|   RPC   | `{"method": "personal_listAccounts", "params": []}` |

**Parameters**

None

**Return Value**

| Type   | Description                                  |
| ------ | -------------------------------------------- |
| string | The list of all the Klaytn account addresses |

None

**Example**

Console

```javascript
> personal.listAccounts
["0x5e97870f263700f46aa00d967821199b9bc5a120", "0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"]
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listAccounts","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["0xd8d81f52b595cc6135177c9c34ae6130ecad4636","0xda04fb00e2cb5745cef7d8c4464378202a1673ef"]}
```

## personal_listWallets <a id="personal_listwallets"></a>

Returns a list of wallets this node manages.

|  Client | Method invocation                                  |
| :-----: | -------------------------------------------------- |
| Console | `personal.listWallets`                             |
|   RPC   | `{"method": "personal_listWallets", "params": []}` |

**Parameters**

None

**Return Value**

| Name     | Type   | Description                    |
| -------- | ------ | ------------------------------ |
| URL      | string | Wallet url                     |
| Status   | string | Locking status                 |
| Failure  | string | Error condition                |
| Accounts | string | The list of account addresses. |

**Example**

Console

```javascript
> personal.listWallets
[
  {
    "url":"keystore:///", 
    "status":"Locked",
    "accounts":[{"address":"0x336010a2f91728ffe01414a87ae5d8af55f310c6","url":"keystore://"}]
  },
  ...
]
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listWallets","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":[{"url":"keystore:///","status":"Locked","accounts":[{"address":"0x336010a2f91728ffe01414a87ae5d8af55f310c6","url":"keystore://"}]}]}
```

## personal_openWallet <a id="personal_openwallet"></a>

Initiates a hardware wallet opening procedure, establishing a USB connection and attempting to authenticate via
the provided passphrase.

:::note

NOTE: The method may return an extra challenge requiring a second open (e.g., the Trezor PIN matrix challenge).

:::

|  Client | Method invocation                                                |
| :-----: | ---------------------------------------------------------------- |
| Console | `personal.openWallet(url, passhrase)`                            |
|   RPC   | `{"method": "personal_openWallet", "params": [url, passphrase]}` |

**Parameters**

| Name       | Type   | Description           |
| ---------- | ------ | --------------------- |
| URL        | string | Wallet url            |
| Passphrase | string | passphrase for wallet |

**Return Value**

| Name  | Type  | Description     |
| ----- | ----- | --------------- |
| Error | error | Error condition |

**Example**

Console

```javascript
> personal.openWallet("keystore://", "passphrase")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_openWallet","params":["keystore://", "passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## personal_deriveAccount <a id="personal_deriveaccount"></a>

Requests a HD wallet to derive a new account, optionally pinning it for later reuse.

|  Client | Method invocation                                                  |
| :-----: | ------------------------------------------------------------------ |
| Console | `personal.deriveAccount(url, path, pin)`                           |
|   RPC   | `{"method": "personal_deriveAccount", "params": [url, path, pin]}` |

**Parameters**

| Name | Type    | Description        |
| ---- | ------- | ------------------ |
| URL  | string  | Wallet url         |
| path | string  | derivation path    |
| pin  | boolean | optionally pinning |

**Return Value**

| Name    | Type   | Description                     |
| ------- | ------ | ------------------------------- |
| Account | string | The address of the new account. |
| Error   | error  | Error condition                 |

**Example**

Console

```javascript
> personal.deriveAccount(url, path, pin)
"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_deriveAccount","params":[url, path, pin],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"}
```

## personal_newAccount <a id="personal_newaccount"></a>

Generates a new private key and stores it in the key store directory.
The key file is encrypted with the given passphrase.
Returns the address of the new account.

At the Klaytn console, `newAccount` will prompt for a passphrase when
it is not supplied as the argument.

|  Client | Method invocation                                           |
| :-----: | ----------------------------------------------------------- |
| Console | `personal.newAccount(passphrase)`                           |
|   RPC   | `{"method": "personal_newAccount", "params": [passphrase]}` |

**Parameters**

| Name       | Type   | Description                                                        |
| ---------- | ------ | ------------------------------------------------------------------ |
| passphrase | string | (optional) the pass phrase used for encryption. |

**Return Value**

| Type   | Description                     |
| ------ | ------------------------------- |
| string | The address of the new account. |

**Example**

Console

```javascript
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"
```

The passphrase can also be supplied as a string.

```javascript
> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["helloWorld"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"}
```

## personal_lockAccount <a id="personal_lockaccount"></a>

Removes the private key with a given address from memory.
The account can no longer be used to send transactions.

|  Client | Method invocation                                         |
| :-----: | --------------------------------------------------------- |
| Console | `personal.lockAccount(address)`                           |
|   RPC   | `{"method": "personal_lockAccount", "params": [address]}` |

**Parameters**

| Name    | Type   | Description                  |
| ------- | ------ | ---------------------------- |
| address | string | The account address to lock. |

**Return Value**

| Type | Description                                                       |
| ---- | ----------------------------------------------------------------- |
| bool | `true` if the account was successfully locked, `false` otherwise. |

**Example**

Console

```javascript
> personal.lockAccount("0xfa415bb3e6231f488ff39eb2897db0ef3636dd32")
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_lockAccount","params":["0xda04fb00e2cb5745cef7d8c4464378202a1673ef"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## personal_unlockAccount <a id="personal_unlockaccount"></a>

Decrypts the key with the given address from the key store.

Both passphrase and unlock duration are optional when using the JavaScript console.
If the passphrase is not supplied as an argument, the console will prompt for
the passphrase interactively.

The unencrypted key will be held in memory until the unlock duration expires.
If the unlock duration defaults to 300 seconds. An explicit duration
of zero seconds unlocks the key until the Klaytn local node exits.

The account can be used with `klay_sign` and `klay_sendTransaction` while it is unlocked.

|  Client | Method invocation                                                                 |
| :-----: | --------------------------------------------------------------------------------- |
| Console | `personal.unlockAccount(address, passphrase, duration)`                           |
|   RPC   | `{"method": "personal_unlockAccount", "params": [address, passphrase, duration]}` |

**Parameters**

| Name       | Type   | Description                                                                                    |
| ---------- | ------ | ---------------------------------------------------------------------------------------------- |
| address    | string | The account address to unlock.                                                                 |
| passphrase | string | the passphrase used for the encryption.                                                        |
| duration   | int    | (optional) the unlock duration (default to 300 seconds). |

**Return Value**

| Type | Description                           |
| ---- | ------------------------------------- |
| bool | `true` if unlocked, `false` otherwise |

**Example**

Console

```javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120")
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```

Supplying the passphrase and unlock duration as arguments:

```javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", "foo", 30)
true
```

If you want to type in the passphrase and still override the default unlock duration,
pass `null` as the passphrase.

```
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", null, 30)
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_unlockAccount","params":["0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## personal_replaceRawKey <a id="personal_replacerawkey"></a>

Replaces the encrypted key file in the key store with the given unencrypted private key (hex string without leading '0x') or a [Klaytn wallet key](../../learn/accounts.md#klaytn-wallet-key-format),
encrypting it with the new passphrase.
It also receives the old passphrase to decrypt the old private key before replacement.
If it is failed to decrypt, or can not find the matching account, it throws an error.

Returns the address of the replaced account if successful.

|  Client | Method invocation                                                                         |
| :-----: | ----------------------------------------------------------------------------------------- |
| Console | `personal.replaceRawKey(keydata, oldPassphrase, newPassphrase)`                           |
|   RPC   | `{"method": "personal_replaceRawKey", "params": [keydata, oldPassphrase, newPassphrase]}` |

**Parameters**

| Name          | Type   | Description                                                                                                                                                  |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| keydata       | string | The unencrypted private key (hex string without leading '0x') or a [Klaytn wallet key](../../learn/accounts.md#klaytn-wallet-key-format). |
| oldPassphrase | string | The passphrase to decrypt the old private key.                                                                                                               |
| newPassphrase | string | The passphrase to encrypt the new private key.                                                                                                               |

**Return Value**

| Name    | Type   | Description                          |
| ------- | ------ | ------------------------------------ |
| address | string | The address of the replaced account. |

**Example**

Console

```javascript
> personal.replaceRawKey('{private key}', 'myoldpassword', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
> personal.replaceRawKey('{private key}0x000x{address}', 'myoldpassword', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_replaceRawKey","params":["{private key}", "myoldpassword", mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_replaceRawKey","params":["{private key}0x000x{address}", "myoldpassword", mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```

## personal_sendAccountUpdate <a id="personal_sendaccountupdate"></a>

Validates the given passphrase and submits a [TxTypeAccountUpdate](../../learn/transactions/basic.md#txtypeaccountupdate) transaction.
The transaction object must have fields `from` and `key`. Other fields such as `gas`, `gasPrice`, and `nonce` are se internally if unspecified.
If the passphrase is able to decrypt the private key belonging to `tx.from` and the transaction is verified,
the transaction is signed and submitted onto the network.
The account is not unlocked globally in the node and cannot be used in other RPC calls.

|  Client | Method invocation                                                      |
| :-----: | ---------------------------------------------------------------------- |
| Console | `personal.sendAccountUpdate(tx, passphrase)`                           |
|   RPC   | `{"method": "personal_sendAccountUpdate", "params": [tx, passphrase]}` |

**Parameters**

| Name       | Type   | Description                                               |
| ---------- | ------ | --------------------------------------------------------- |
| tx         | string | A transaction object. `from` and `key` must be specified. |
| passphrase | string | The passphrase to decrypt the private key of `tx.from`.   |

**Return Value**

| Type           | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| 32-byte string | a transaction hash if succeeded. Otherwise, an error is raised. |

**Example**

Console

```javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", key:"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}
undefined
> personal.sendAccountUpdate(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```

HTTP RPC

**NOTE**: The function `klay.toPeb()` is not executable in HTTP RPC.

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendAccountUpdate","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","key":"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}, "passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendTransaction <a id="personal_sendtransaction"></a>

Validates the given passphrase and submits a [TxTypeLegacy](../../learn/transactions/basic.md#txtypelegacytransaction) transaction.
The transaction object must have `from` and `to` except the case of contract deployment.
`to` should be omitted if the transaction deploys a smart contract.
If `value` is not specified, it will be set to zero internally.
Other fields such as `gas`, `gasPrice`, and `nonce` are set to appropriate values internally if unspecified.
If the passphrase is able to decrypt the private key belonging to `tx.from` and the transaction is verified, the transaction is signed and submitted onto the network.
The account is not unlocked globally in the node and cannot be used in other RPC calls.

|  Client | Method invocation                                                    |
| :-----: | -------------------------------------------------------------------- |
| Console | `personal.sendTransaction(tx, passphrase)`                           |
|   RPC   | `{"method": "personal_sendTransaction", "params": [tx, passphrase]}` |

**Parameters**

| Name       | Type   | Description                                                                                                         |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| tx         | string | A transaction object. `from` is a required field. `to`, `value`, `gas`, `gasPrice` and `nonce` are optional fields. |
| passphrase | string | The passphrase to decrypt the private key of `tx.from`.                                                             |

**Return Value**

| Type           | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| 32-byte string | a transaction hash if succeeded. Otherwise, an error is raised. |

**Example**

Console

```javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, "KLAY")}
undefined
> personal.sendTransaction(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```

HTTP RPC

**NOTE**: The function `klay.toPeb()` is not executable in HTTP RPC.

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendTransaction","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendValueTransfer <a id="personal_sendvaluetransfer"></a>

Validates the given passphrase and submits a [TxTypeValueTransfer](../../learn/transactions/basic.md#txtypevaluetransfer) transaction.
The transaction object must have fields `from`, `to`, and `value`. Other fields such as `gas`, `gasPrice`, and `nonce` are set internally if unspecified.
If the passphrase is able to decrypt the private key belonging to `tx.from` and the transaction is verified,
the transaction is signed and submitted onto the network.
The account is not unlocked globally in the node and cannot be used in other RPC calls.

|  Client | Method invocation                                                      |
| :-----: | ---------------------------------------------------------------------- |
| Console | `personal.sendValueTransfer(tx, passphrase)`                           |
|   RPC   | `{"method": "personal_sendValueTransfer", "params": [tx, passphrase]}` |

**Parameters**

| Name       | Type   | Description                                                        |
| ---------- | ------ | ------------------------------------------------------------------ |
| tx         | string | A transaction object. `from`, `to`, and `value` must be specified. |
| passphrase | string | The passphrase to decrypt the private key of `tx.from`.            |

**Return Value**

| Type           | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| 32-byte string | a transaction hash if succeeded. Otherwise, an error is raised. |

**Example**

Console

```javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, "KLAY")}
undefined
> personal.sendValueTransfer(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```

HTTP RPC

**NOTE**: The function `klay.toPeb()` is not executable in HTTP RPC.

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendValueTransfer","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sign <a id="personal_sign"></a>

The `sign` method calculates a Klaytn-specific signature with:
`sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))`

Adding a prefix to the message makes the calculated signature recognizable as a Klaytn-specific signature. This prevents misuse where a malicious DApp can sign arbitrary data (_e.g._, transaction) and use the signature to impersonate the victim.

See `personal_ecRecover` to verify the signature.

|  Client | Method invocation                                                     |
| :-----: | --------------------------------------------------------------------- |
| Console | `personal.sign(message, account, password)`                           |
|   RPC   | `{"method": "personal_sign", "params": [message, account, password]}` |

**Parameters**

| Name     | Type   | Description                       |
| -------- | ------ | --------------------------------- |
| message  | string | A message to sign.                |
| account  | string | The account address.              |
| password | string | The pass phrase used for signing. |

**Return Value**

| Type   | Description  |
| ------ | ------------ |
| string | A signature. |

**Example**

Console

```javascript
> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0xdead","0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"}
```

## personal_signTransaction <a id="personal_signtransaction"></a>

Sets default configuration and signs the given transaction.

:::note

NOTE: Sending your account password over an unsecured HTTP RPC connection is highly unsecure. Use [klay_signTransaction](./klay/transaction.md#klay_signtransaction).

:::

**Parameters**

The required parameters depend on the transaction type.
Check the proper parameters in [Working with Klaytn Transaction Types](klay/transaction-type-support.md).

**Return Value**

| Type     | Description            |
| -------- | ---------------------- |
| raw      | Signed raw transaction |
| tx       | Transaction object     |
| password | Sender's password      |

## personal_ecRecover <a id="personal_ecrecover"></a>

`ecRecover` returns the address associated with the private key that was used to calculate the signature in `personal_sign`.

|  Client | Method invocation                                                  |
| :-----: | ------------------------------------------------------------------ |
| Console | `personal.ecRecover(message, signature)`                           |
|   RPC   | `{"method": "personal_ecRecover", "params": [message, signature]}` |

**Parameters**

| Name      | Type   | Description    |
| --------- | ------ | -------------- |
| message   | string | A message.     |
| signature | string | The signature. |

**Return Value**

| Type   | Description          |
| ------ | -------------------- |
| string | The account address. |

**Example**

Console

```javascript
> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
> personal.ecRecover("0xdeadbeaf", "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b")
"0x9b2055d370f73ec7d8a03e965129118dc8f5bf83"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0xdead","0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"}

$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_ecRecover","params":["0xdead","0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```
