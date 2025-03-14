# Accounts

## Kaia Accounts <a id="kaia-accounts"></a>

### Overview of Account, State, and Address <a id="overview-of-account-state-and-address"></a>

An account in Kaia is a data structure containing information about a person's balance or a smart contract. Kaia's state is the collection of all its accounts' states - that is, the past and current state of all data stored across Kaia's accounts. When a transaction is executed on a Kaia node, the state of Kaia consequently changes across all its nodes. The state should be the same across all nodes in the Kaia network if they have processed the same blocks in the same order. State information of each account is associated with a 20-byte address, which is used to identify each account.

### Decoupling Key Pairs From Addresses <a id="decoupling-key-pairs-from-addresses"></a>

An account in a typical blockchain platform is associated with a cryptographically processed address of a certain length that usually looks like this: "0x0fe2e20716753082222b52e753854f40afddffd2". This address is strongly coupled with a key pair. If a key pair is chosen, the address is derived from the public key. This has many disadvantages in terms of user experience. Some of them are the following:

* It is impossible for users to have addresses they want.
* It is impossible for users to use multiple key pairs to increase security of their accounts.
* It is impossible for users to change the account's key pair when the private key is accidentally exposed or when users want to update the private key periodically to increase the account's security.

Those are big hurdles that users cannot think of an address as an identifier in the blockchain platform. To clear this hurdle, Kaia provides a feature that users can choose their addresses and key pairs. With this feature, users can choose addresses that they want and they can use multiple key pairs to increase security. The number of key pairs can be one or more, and the key pairs can have different roles. For details of multiple key pairs or role-based keys, please refer to [Multiple Key Pairs & Role-Based Keys](#multiple-key-pairs-and-role-based-keys).

It is worth noting that Kaia also supports the old scheme that a key pair and an address are strongly coupled.

### Multiple Key Pairs and Role-Based Keys <a id="multiple-key-pairs-and-role-based-keys"></a>

As described before, when the private key is stolen, exposed, or somehow compromised, there is nothing to do to restore the account’s security: the best option is to generate another key pair to create a new account, and migrate the balance from the old compromised account to the new one. Lack of support for advanced key schemes such as multi-sig or usage-specific key is yet another source of major inconvenience. To address those problems more efficiently, Kaia accounts provide the following capabilities:

* Kaia account allows the key pair associated with the account to be changed.
* Kaia account supports multiple key pairs, along with the ability to assign each key with different purpose.
* Kaia account maintains compatibility with accounts having a single key that is strongly coupled with the address.

By utilizing Kaia account’s role-based multi-key support, end-users can better handle real-life security risk situations such as private key mismanagement. For example, when a user realizes that his or her private key has been exposed, the user can simply replace the compromised private key by removing the exposed key pair from his or her account and creating a new key pair to replace them. This could be achieved by using a dedicated key used for updating account information, created in advance and stored separately from the compromised private key.

### Kaia Wallet Key Format <a id="kaia-wallet-key-format"></a>

Kaia wallet key format is provided to easily handle a private key along with the corresponding address. It makes easier for a user to maintain his/her private key with an address. The format is `0x{private key}0x{type}0x{address in hex}` in hexadecimal notation, where `{type}` must be `00`. Other values are reserved. An example is shown below:

```text
0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d80x000xa94f5374fce5edbc8e2a8697c15331677e6ebf0b
```

### Kaia Account Types <a id="kaia-account-types"></a>

There are two types of accounts in Kaia: <LinkWithTooltip to="../../misc/glossary#externally-owned-account-eoa" tooltip="User-controlled blockchain accounts for transactions,<br /> secured by a private key.">externally owned accounts</LinkWithTooltip> \(EOAs\), and <LinkWithTooltip to="../../misc/glossary#smart-contract-account-sca" tooltip="Blockchain account with programmable logic <br />for automated transactions.">smart contract accounts</LinkWithTooltip> \(SCAs\).

#### Externally Owned Accounts \(EOAs\) <a id="externally-owned-accounts-eoas"></a>

Externally owned accounts have information such as nonce and balance. This type of accounts does not have code or storage. EOAs are controlled by private keys and do not have code associated with them. An EOA can be created using key pairs and subsequently controlled by anyone with the key pairs. The account key is described in the section [Account Key](#account-key).

**Attributes**

| Attribute | Type | Description |
| :--- | :--- | :--- |
| type | uint8 \(Go\) | The type of externally owned accounts. It must be **0x1** for EOAs. |
| nonce | uint64 \(Go\) | A sequence number used to determine the order of transactions. The transaction to be processed next has the same nonce with this value. |
| balance | \*big.Int \(Go\) | The amount of KAIA the account has. |
| humanReadable | bool \(Go\) | A boolean value indicating that the account is associated with a human-readable address. Since HRA (human-readable address) is not supported yet, this value is false for all accounts. |
| key | [AccountKey](#account-key) | The key associated with this account. This field can be any of [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultisig](#accountkeyweightedmultisig), [AccountKeyRoleBased](#accountkeyrolebased). Signatures in transactions are verified with this key. |

#### Smart Contract Accounts \(SCAs\) <a id="smart-contract-accounts-scas"></a>

In contrast to EOAs, SCAs have code associated with them and are controlled by their code. SCAs are created by smart contract deployment transactions; once deployed, an SCA cannot initiate new transactions by itself and must be triggered by another account, either by an EOA or another SCA.

**Attributes**

| Attribute | Type | Description |
| :--- | :--- | :--- |
| type | uint8 \(Go\) | The type of smart contract accounts. It must be **0x2** for SCAs. |
| nonce | uint64 \(Go\) | A sequence number used to determine the order of transactions. The transaction to be processed next has the same nonce with this value. |
| balance | \*big.Int \(Go\) | The amount of KAIA the account has. |
| humanReadable | bool \(Go\) | A boolean value indicating that the account is associated with a human-readable address. Since HRA (human-readable address) is not supported yet, this value is false for all accounts. |
| key | [AccountKey](#account-key) | The key associated with this account. This field can be any of [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultisig](#accountkeyweightedmultisig), [AccountKeyRoleBased](#accountkeyrolebased). Signatures in transactions are verified with this key. |
| codeHash | \[\]byte \(Go\) | The hash of the account's smart contract code. This value is immutable, which means it is set only when the smart contract is created. |
| storageRoot | \[32\]byte \(Go\) | A 256-bit hash of the root of the Merkle Patricia Trie that contains the values of all the storage variables in the account. |
| codeFormat | uint8 \(Go\) | Supporting interpreter version. Up to 16 can be set. Currently, it supports EVM\(0x00\) only. |
| vmVersion | uint8 \(Go\) | The protocol upgrade (hard fork) information at contract deployment time (ex. 0x0(constantinople), 0x1(istanbul,london,...)). Up to 16 can be used. It is automatically created with the contract. |

:::note

NOTE: From kaia v1.7.0 onwards, vmVersion attribute will be added to the Smart Contract Account.

:::

### Kaia Account Type ID <a id="kaia-account-type-id"></a>
Below are the Account Type ID assigned to each Account Type.

| Account Type | Account Type ID |
|---|---|
| Externally Owned Account (EOA) | 0x1 |
| Smart Contract Account (SCA) | 0x2 |

## Account Key <a id="account-key"></a>

An account key represents the key structure associated with an account.

### AccountKeyNil <a id="accountkeynil"></a>

AccountKeyNil represents an empty key. If an account tries to have an AccountKeyNil object, the transaction will be failed. AccountKeyNil is used only for TxTypeAccountUpdate transactions with role-based keys. For example, if an account tries to update RoleAccountUpdate key only, the key field of the TxTypeAccountUpdate transaction would be:

`[AccountKeyNil, NewKey, AccountKeyNil]`

Then, only the RoleAccountUpdate key is updated. Other roles are not updated. Refer to the [AccountKeyRoleBased](#accountkeyrolebased) for more detail.

#### Attributes <a id="attributes"></a>

No attributes for AccountKeyNil.

#### RLP Encoding <a id="rlp-encoding"></a>

`0x80`

### AccountKeyLegacy <a id="accountkeylegacy"></a>

AccountKeyLegacy is used for the account having an address derived from the corresponding key pair. If an account has AccountKeyLegacy, the transaction validation process is done like below \(as typical Blockchain platforms did\):

* Get the public key from `ecrecover(txhash, txsig)`.
* Get the address of the public key.
* The address is the sender.

#### Attributes <a id="attributes"></a>

| Attribute | Type | Description |
| :--- | :--- | :--- |
| Type | uint8 \(Go\) | The type of AccountKeyLegacy. This must be **0x01**. |

#### RLP Encoding <a id="rlp-encoding"></a>

`0x01c0`

### AccountKeyPublic <a id="accountkeypublic"></a>

AccountKeyPublic is used for accounts having one public key.  
If an account has an AccountKeyPublic object, the transaction validation process is done like below:

* Get the public key derived from `ecrecover(txhash, txsig)`.
* Check that the derived public key is the same as the corresponding

  account's public key.

#### Attributes <a id="attributes"></a>

| Attribute | Type | Description |
| :--- | :--- | :--- |
| Type | uint8 \(Go\) | The type of AccountKeyPublic. This must be **0x02**. |
| Key | \[33\]byte \(Go\) | Key should be a compressed public key on S256 curve. |

#### RLP Encoding <a id="rlp-encoding"></a>

`0x02 + encode(CompressedPubKey)`

**NOTE**: CompressedPubKey is a public key in a compressed format defined in [SEC1](https://www.secg.org/SEC1-Ver-1.0.pdf). In short, 0x02`{PubkeyX}` if PubkeyY is an even number or 0x03`{PubkeyX}` otherwise.

#### RLP Encoding \(Example\) <a id="rlp-encoding-example"></a>

```javascript
prvkey 0xf8cc7c3813ad23817466b1802ee805ee417001fcce9376ab8728c92dd8ea0a6b
pubkeyX 0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
pubkeyY 0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e

RLP: 0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
```

### AccountKeyFail <a id="accountkeyfail"></a>

If an account has the key AccountKeyFail, the transaction validation process always fails. It can be used for smart contract accounts so that a transaction sent from the smart contract account always fails.

#### Attributes <a id="attributes"></a>

| Attribute | Type | Description |
| :--- | :--- | :--- |
| Type | uint8 \(Go\) | The type of AccountKeyFail. It must be **0x03**. |

#### RLP Encoding <a id="rlp-encoding"></a>

`0x03c0`

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

AccountKeyWeightedMultiSig is an account key type containing a threshold and WeightedPublicKeys which contains a list consisting of a public key and its weight. 
In order for a transaction to be valid for an account associated with AccountKeyWeightedMultiSig, the following conditions should be satisfied:
* The weighted sum of the signed public keys should be larger than the threshold.
* The invalid signature should not be included in the transaction.
* The number of signed public keys should be less than the number of weightedPublicKeys.

:::note

The following multiSig validation logic has been added with the [IstanbulEVM](../misc/klaytn-history.md#istanbul-evm) hardfork.

* The invalid signature should not be included in the transaction.
* The number of signed public keys should be less than the number of weightedPublicKeys.

:::

#### Attributes <a id="attributes"></a>

| Attribute | Type | Description |
| :--- | :--- | :--- |
| Type | uint8 \(Go\) | The type of AccountKeyWeightedMultiSig. This must be **0x04**. |
| Threshold | uint \(Go\) | Validation threshold. To be a valid transaction, the weight sum of signatures should be larger than or equal to the threshold. |
| WeightedPublicKeys | \[\]\{uint, \[33\]byte\} \(Go\) | A list of weighted public keys. A weighted public key contains a compressed public key and its weight. |

#### RLP Encoding <a id="rlp-encoding"></a>

`0x04 + encode([threshold, [[weight, CompressedPubKey1], [weight2, CompressedPubKey2]]])`

#### RLP Encoding \(Example\) <a id="rlp-encoding-example"></a>

```javascript
Threshold 3
Key0 Weight: 1
PubkeyX 0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e
PubkeyY 0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712
Key1 Weight: 1
PubkeyX 0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb
PubkeyY 0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842
Key2 Weight: 1
PubkeyX 0xea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cd
PubkeyY 0xb95ebb02d9397b4a8faceb58d485d612f0379a923ec0ddcf083378460a56acca
Key3 Weight: 1
PubkeyX 0x8551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6
PubkeyY 0x4206aa84bc8955fcbfcc396854228aa63ebacd81b7311a31ab9d71d90b7ec3d7

RLP: 0x04f89303f890e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfbe301a102ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cde301a1038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6
```

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

AccountKeyRoleBased represents a role-based key. The roles are specified at [Roles](#roles).

#### Attributes <a id="attributes"></a>

| Attribute | Type | Description |
| :--- | :--- | :--- |
| Type | uint8 \(Go\) | The type of AccountKeyRoleBased. It must be **0x05**. |
| Keys | \[\]`{AccountKey}` \(Go\) | A list of keys. A key can be any of AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail, and AccountKeyWeightedMultiSig. |

#### Roles <a id="roles"></a>

Roles of AccountKeyRoleBased are defined as below:

| Role | Description |
| :--- | :--- |
| RoleTransaction | Index 0. Default key. Transactions other than TxTypeAccountUpdate should be signed by the key of this role. |
| RoleAccountUpdate | Index 1. TxTypeAccountUpdate transaction should be signed by this key. If this key is not present in the account, TxTypeAccountUpdate transaction is validated using RoleTransaction key. |
| RoleFeePayer | Index 2. If this account wants to send tx fee instead of the sender, the transaction should be signed by this key.  If this key is not present in the account, a fee-delegated transaction is validated using RoleTransaction key. |

#### RLP Encoding <a id="rlp-encoding"></a>

`0x05 + encode([key1, key2, key3])`

Note that key1, key2, and key3 can be any of above keys \(AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail, and AccountKeyWeightedMultiSig\).

#### Omissible and Expandable Roles <a id="omissible-and-expandable-roles"></a>

The roles can be omitted from the last index, and the omitted roles are mapped to the first role. However, a role in the middle cannot be omitted, which means RoleTransaction and RoleFeePayer cannot be set without RoleAccountUpdate. For example, if a role-based key is set to `0x05 + encode([key1, key2])`, RoleFeePayer works as if the key is set like `0x05 + encode([key1, key2, key1])`.

This feature allows for more roles to be added in the future. If a new role is provided, the new role of accounts already created with old roles is mapped to the first role.

#### RLP Encoding \(Example\) <a id="rlp-encoding-example"></a>

```javascript
RoleTransaction Key
PubkeyX 0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d
PubkeyY 0x0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919
RoleAccountUpdate Key
Threshold: 2
Key0 Weight:1
PubkeyX 0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d
PubkeyY 0x0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919
Key1 Weight:1
PubkeyX 0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06
PubkeyY 0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d
RoleFeePayer Key
PubkeyX 0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447
PubkeyY 0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2

RLP: 0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06a302a102c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447
```

## Account Key Type ID <a id="account-key-type-id"></a>
Below are the Account Key Type ID assigned to each Account Key Type.

| Account Key Type | Account Key Type ID |
|---|---|
| AccountKeyLegacy | 0x01 |
| AccountKeyPublic | 0x02 |
| AccountKeyFail | 0x03 |
| AccountKeyWeightedMultiSig | 0x04 |
| AccountKeyRoleBased | 0x05 |

