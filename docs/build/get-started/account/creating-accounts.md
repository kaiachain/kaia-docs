# Create Accounts

## Creating a New Account <a id="creating-a-new-account"></a>

This will create a new account and print the address on the screen. A keystore file is created under the data directory.

**Kaia Keystore File**

When you create an account, a keystore file is created. The keystore file is an encrypted version of your unique Kaia private key that you will use to sign your transactions. The keystore file name has the following format:

* `UTC--<created_at UTC ISO8601>-<address hex>`

It is safe to transfer the entire directory or the individual keystore file therein between Kaia nodes. Note that in case you are adding keys to your node from a different node, the order of accounts may change. So make sure you do not rely on the index in your scripts or code snippets.

### ken <a id="ken"></a>

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

**`WARNING`**: Note that using a password file is meant for testing only; it is a bad idea to save your password in a file or expose it in any other way. If you use the password flag with a password file, best to make sure the file is not readable or even listable for anyone but you. You achieve this with:

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
I type my pass here
^D
```

### JavaScript Console <a id="javascript-console"></a>

On the console, you can call the following function to create an account:

```javascript
> personal.newAccount("passphrase")
```

The account is saved in an encrypted format. You **must** remember this passphrase to unlock your account in the future.

## Importing an Account <a id="importing-an-account"></a>

You can import an account using a keyfile. The keyfile is assumed to contain an unencrypted private key as canonical EC raw bytes encoded into hex. In simpler terms, it is a private key in plain text without the leading `0x`.

This imports an unencrypted private key from the given keyfile, creates a new account, generates a keystore file under the data directory, and prints the address in the console. You must remember the passphrase to unlock your account in the future.

**NOTE**: If you can directly copy your keystore files to another Kaia instance, this import/export mechanism is not needed.

### ken <a id="ken-1"></a>

```bash
$ ken account import --datadir <datadir> <keyfile>
$ ken account import --password <passwordfile> --datadir <datadir> <keyfile>
```

### JavaScript Console <a id="javascript-console-1"></a>

```bash
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"​

// Using a Kaia wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```