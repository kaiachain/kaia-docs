# Precompiled Contracts

Klaytn provides several useful precompiled contracts. These contracts are implemented in the platform itself as a native implementation. The precompiled contracts from address 0x01 through 0x08 are the same as those in Ethereum. Klaytn additionally implements precompiled contracts from 0x09 through 0x0B to support new Klaytn features.

:::note

This document contains the gas table used before the activation of the protocol upgrade.
If you want the latest document, please refer to [latest document](precompiled-contracts.md).

:::

## Address 0x01: ecrecover(hash, v, r, s) <a id="address-0x-01-ecrecover-hash-v-r-s"></a>

The address 0x01 implements ecrecover. It returns the address from the given signature by calculating a recovery function of ECDSA. Its function prototype is as follows:

```text
function ecrecover(bytes32 hash, bytes8 v, bytes32 r, bytes32 s) returns (address);
```

## Address 0x02: sha256(data) <a id="address-0x-02-sha-256-data"></a>

The address 0x02 implements SHA256 hash. It returns a SHA256 hash from the given data. Its function prototype is as follows:

```text
function sha256(bytes data) returns (bytes32);
```

## Address 0x03: ripemd160(data) <a id="address-0x-03-ripemd-160-data"></a>

The address 0x03 implements RIPEMD160 hash. It returns a RIPEMD160 hash from the given data. Its function prototype is as follows:

```text
function ripemd160(bytes data) returns (bytes32);
```

## Address 0x04: datacopy(data) <a id="address-0x-04-datacopy-data"></a>

The address 0x04 implements datacopy (i.e., identity function). It returns the input data directly without any modification. This precompiled contract is not supported by the Solidity compiler. The following code with inline assembly can be used to call this precompiled contract.

```text
function callDatacopy(bytes memory data) public returns (bytes memory) {
    bytes memory ret = new bytes(data.length);
    assembly {
        let len := mload(data)
        if iszero(call(gas, 0x04, 0, add(data, 0x20), len, add(ret,0x20), len)) {
            invalid()
        }
    }

    return ret;
}     
```

## Address 0x05: bigModExp(base, exp, mod) <a id="address-0x05-bigmodexp-base-exp-mod"></a>

The address 0x05 implements the formula `base**exp % mod`. It returns the result from the given data. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract. Note that although this precompiled contract supports an arbitrary length of inputs, the below code uses a fixed length of inputs as an example.

```text
function callBigModExp(bytes32 base, bytes32 exponent, bytes32 modulus) public returns (bytes32 result) {
    assembly {
        // free memory pointer
        let memPtr := mload(0x40)

        // length of base, exponent, modulus
        mstore(memPtr, 0x20)
        mstore(add(memPtr, 0x20), 0x20)
        mstore(add(memPtr, 0x40), 0x20)

        // assign base, exponent, modulus
        mstore(add(memPtr, 0x60), base)
        mstore(add(memPtr, 0x80), exponent)
        mstore(add(memPtr, 0xa0), modulus)

        // call the precompiled contract BigModExp (0x05)
        let success := call(gas, 0x05, 0x0, memPtr, 0xc0, memPtr, 0x20)
        switch success
        case 0 {
            revert(0x0, 0x0)
        } default {
            result := mload(memPtr)
        }
    }
}
```

## Address 0x06: bn256Add(ax, ay, bx, by) <a id="address-0x-06-bn-256-add-ax-ay-bx-by"></a>

The address 0x06 implements a native elliptic curve point addition. It returns an elliptic curve point representing `(ax, ay) + (bx, by)` such that (ax, ay) and (bx, by) are valid points on the curve bn256. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function callBn256Add(bytes32 ax, bytes32 ay, bytes32 bx, bytes32 by) public returns (bytes32[2] memory result) {
    bytes32[4] memory input;
    input[0] = ax;
    input[1] = ay;
    input[2] = bx;
    input[3] = by;
    assembly {
        let success := call(gas, 0x06, 0, input, 0x80, result, 0x40)
        switch success
        case 0 {
            revert(0,0)
        }
    }
}
```

## Address 0x07: bn256ScalarMul(x, y, scalar) <a id="address-0x-07-bn-256-scalarmul-x-y-scalar"></a>

The address 0x07 implements a native elliptic curve multiplication with a scalar value. It returns an elliptic curve point representing `scalar * (x, y)` such that (x, y) is a valid curve point on the curve bn256. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function callBn256ScalarMul(bytes32 x, bytes32 y, bytes32 scalar) public returns (bytes32[2] memory result) {
    bytes32[3] memory input;
    input[0] = x;
    input[1] = y;
    input[2] = scalar;
    assembly {
        let success := call(gas, 0x07, 0, input, 0x60, result, 0x40)
        switch success
        case 0 {
            revert(0,0)
        }
    }
}
```

## Address 0x08: bn256Pairing(a1, b1, a2, b2, a3, b3, ..., ak, bk) <a id="address-0x-08-bn-256-pairing-a-1-b-1-a-2-b-2-a-3-b-3-ak-bk"></a>

The address 0x08 implements elliptic curve paring operation to perform zkSNARK verification. For more information, see [EIP-197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md). This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function callBn256Pairing(bytes memory input) public returns (bytes32 result) {
    // input is a serialized bytes stream of (a1, b1, a2, b2, ..., ak, bk) from (G_1 x G_2)^k
    uint256 len = input.length;
    require(len % 192 == 0);
    assembly {
        let memPtr := mload(0x40)
        let success := call(gas, 0x08, 0, add(input, 0x20), len, memPtr, 0x20)
        switch success
        case 0 {
            revert(0,0)
        } default {
            result := mload(memPtr)
        }
    }
}
```

## Address 0x09: vmLog(str) <a id="address-0x-09-vmlog-str"></a>

The address 0x09 prints the specified string `str` to a specific file or passes it to the logger module. For more information, see [debug_setVMLogTarget](../../references/json-rpc/debug/logging.md#debug_setvmlogtarget). Note that this precompiled contract should be used only for debugging purposes, and it is required to enable the `--vmlog` option when the Klaytn node starts. Also, the log level of the Klaytn node should be 4 or more to see the output of vmLog. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function callVmLog(bytes memory str) public {
    address(0x09).call(str);
}
```

## Address 0x0A: feePayer() <a id="address-0x-0-a-feepayer"></a>

The address 0x0A returns a fee payer of the executing transaction. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function feePayer() internal returns (address addr) {
    assembly {
        let freemem := mload(0x40)
        let start_addr := add(freemem, 12)
        if iszero(call(gas, 0x0a, 0, 0, 0, start_addr, 20)) {
          invalid()
        }
        addr := mload(freemem)
    }
}
```

## Address 0x0B: validateSender() <a id="address-0x-0-b-validatesender"></a>

The address 0x0B validates the sender's signature with the message. Since Klaytn [decouples key pairs from addresses](../accounts.md#decoupling-key-pairs-from-addresses), it is required to validate that a signature is properly signed by the corresponding sender. To do that, this precompiled contract receives three parameters:

- The sender's address to get the public keys
- The message hash that is used to generate the signature
- The signatures that are signed by the sender's private keys with the given message hash

The precompiled contract validates that the given signature is properly signed by the sender's private keys. Note that Klaytn natively support multi signatures, the signatures can be multiple. The length of a signature must be 65 byte long.

```text
function ValidateSender(address sender, bytes32 msgHash, bytes sigs) public returns (bool) {
    require(sigs.length % 65 == 0);
    bytes memory data = new bytes(20+32+sigs.length);
    uint idx = 0;
    uint i;
    for( i = 0; i < 20; i++) {
        data[idx++] = (bytes20)(sender)[i];
    }
    for( i = 0; i < 32; i++ ) {
        data[idx++] = msgHash[i];
    }
    for( i = 0; i < sigs.length; i++) {
        data[idx++] = sigs[i];
    }
    assembly {
        // skip length header.
        let ptr := add(data, 0x20)
        if iszero(call(gas, 0x0b, 0, ptr, idx, 31, 1)) {
          invalid()
        }
        return(0, 32)
    }
}
```
