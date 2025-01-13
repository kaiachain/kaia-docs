# Precompiled Contracts

Kaia provides several useful precompiled contracts, none of which are state-changing.
These contracts are implemented in the platform itself as a native implementation, which means they are part of the Kaia client specifications. 
The precompiled contracts from address 0x01 through 0x0A are the same as those in Ethereum. 
The utility of precompiles falls into four major categories:
    . Elliptic curve digital signature recovery.
    . Hash Methods
    . Memory copying
    . Methods to enable elliptic curve maths for zk proofs. 
Kaia additionally implements precompiled contracts from 0x3FD through 0x3FF to support new Kaia features.

:::note

Contracts deployed before the istanbul EVM hardfork should use the original addresses.
* case 1) The contracts deployed in Kairos at block number `#75373310` recognizes 0x09, 0x0a, and 0x0b as addresses of vmLog, feePayer, and validateSender, respectively, and blake2f cannot be used.
* case 2) The contracts deployed in Kairos at block number `#75373314` recognizes 0x09 as the address of blake2f, and recognizes 0x3fd, 0x3fe, and 0xff as addresses of vmLog, feePayer, and validateSender.

Precompiled contracts related hardfork changes can be found at the bottom of this page. Go to [Hardfork Changes](#hardfork-changes).

:::

## Address 0x01: ecrecover\(hash, v, r, s\) <a id="address-0x-01-ecrecover-hash-v-r-s"></a>

The address 0x01 implements ecrecover. It returns the address from the given signature by calculating a recovery function of ECDSA. It is the only precompile that comes with a solidity wrapper. Its function prototype is as follows:

```text
function ecRecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public view returns (address) {
        address r = ecrecover(hash, v, r, s); // prototype function 
        require(r != address(0), "signature is invalid");
} // solidity wrapper
```

## Address 0x02: sha256\(data\) <a id="address-0x-02-sha-256-data"></a>

The address 0x02 implements SHA256 hash. It returns a SHA256 hash from the given data. It is mostly used by Bitcoin and Zcash as Ethereum uses Keccak256. Its function prototype is as follows:

```text
function sha256(uint256 numberToHash) public view returns (bytes32 hash) {
      (bool ok, bytes memory hashData) = address(0x02).staticcall(abi.encode(numberToHash));
      require(ok);
      hash = abi.decode(hashData, (bytes32));
}
```

usage in Yul / Inline Assembly:

```text
function sha256Yul(uint256 numberToHash) public view returns (bytes32) {
        assembly {
      mstore(0, numberToHash) // store number in the zeroth memory word

      let ok := staticcall(gas(), 2, 0, 32, 0, 32)
      if iszero(ok) {
    revert(0,0)
      }
          return(0, 32)
  }
}
```

## Address 0x03: ripemd160\(data\) <a id="address-0x-03-ripemd-160-data"></a>

The address 0x03 implements RIPEMD160 hash. It returns a RIPEMD160 hash from the given data. Its function prototype is as follows:

```text
function RIPEMD160(bytes calldata data) public view returns (bytes20 h) {
  (bool ok, bytes memory out) = address(0x03).staticcall(data);
  require(ok);
  h = bytes20(abi.decode(out, (bytes32)) << 96);
}
```

## Address 0x04: datacopy\(data\) <a id="address-0x-04-datacopy-data"></a>

The address 0x04 implements datacopy \(i.e., identity function\). It returns the input data directly without any modification. This precompiled contract is not supported by the Solidity compiler. The following code with inline assembly can be used to call this precompiled contract.

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

## Address 0x05: bigModExp\(base, exp, mod\) <a id="address-0x05-bigmodexp-base-exp-mod"></a>

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

## Address 0x06: bn256Add\(ax, ay, bx, by\) <a id="address-0x-06-bn-256-add-ax-ay-bx-by"></a>

The address 0x06 implements a native elliptic curve point addition. It returns an elliptic curve point representing `(ax, ay) + (bx, by)` such that \(ax, ay\) and \(bx, by\) are valid points on the curve bn256. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

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

## Address 0x07: bn256ScalarMul\(x, y, scalar\) <a id="address-0x-07-bn-256-scalarmul-x-y-scalar"></a>

The address 0x07 implements a native elliptic curve multiplication with a scalar value. It returns an elliptic curve point representing `scalar * (x, y)` such that \(x, y\) is a valid curve point on the curve bn256. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

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

## Address 0x08: bn256Pairing\(a1, b1, a2, b2, a3, b3, ..., ak, bk\) <a id="address-0x-08-bn-256-pairing-a-1-b-1-a-2-b-2-a-3-b-3-ak-bk"></a>

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

## Address 0x09: blake2F\(rounds, h, m, t, f\) <a id="address-0x-09-blake2F-rounds-h-m-t-f"></a>
The address 0x09 implements BLAKE2b F compression function. For more information, see [EIP-152](https://eips.ethereum.org/EIPS/eip-152). This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function callBlake2F(uint32 rounds, bytes32[2] memory h, bytes32[4] memory m, bytes8[2] memory t, bool f) public view returns (bytes32[2] memory) {
    bytes32[2] memory output;

    bytes memory args = abi.encodePacked(rounds, h[0], h[1], m[0], m[1], m[2], m[3], t[0], t[1], f);

    assembly {
        if iszero(staticcall(not(0), 0x09, add(args, 32), 0xd5, output, 0x40)) {
            revert(0, 0)
        }
    }

    return output;
}
```

## Address 0x0A: kzg\(data\) <a id="address-0x-0a-kzg-data"></a>
The address 0x0A implements the KZG proof verification to a given value at a given point. For more information, see [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844). This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function callKzg(bytes memory data) public returns (bytes memory) {
    bytes memory ret;
    assembly {
        let len := mload(data)
        if iszero(call(gas(), 0x0a, 0, add(data, 0x20), len, 0, 0)) {
            revert (0,0)
        }
    }
    return ret;
}
```

## Address 0x3fd: vmLog\(str\) <a id="address-0x-3fc-vmlog-str"></a>

The address 0x3FD prints the specified string `str` to a specific file or passes it to the logger module. For more information, see [debug_setVMLogTarget](../../references/json-rpc/debug/set-vm-log-target). Note that this precompiled contract should be used only for debugging purposes, and it is required to enable the `--vmlog` option when the Kaia node starts. Also, the log level of the Kaia node should be 4 or more to see the output of vmLog. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function callVmLog(bytes memory str) public {
    address(0x3fd).call(str);
}
```

## Address 0x3fe: feePayer\(\) <a id="address-0x-3fd-feepayer"></a>

The address 0x3FE returns a fee payer of the executing transaction. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function feePayer() internal returns (address addr) {
    assembly {
        let freemem := mload(0x40)
        let start_addr := add(freemem, 12)
        if iszero(call(gas, 0x3fe, 0, 0, 0, start_addr, 20)) {
          invalid()
        }
        addr := mload(freemem)
    }
}
```

## Address 0x3ff: validateSender\(\) <a id="address-0x-3fe-validatesender"></a>

The address 0x3FF validates the sender's signature with the message. Since Kaia [decouples key pairs from addresses](../accounts.md#decoupling-key-pairs-from-addresses), it is required to validate that a signature is properly signed by the corresponding sender. To do that, this precompiled contract receives three parameters:

* The sender's address to get the public keys
* The message hash that is used to generate the signature
* The signatures that are signed by the sender's private keys with the given message hash

The precompiled contract validates that the given signature is properly signed by the sender's private keys. Note that Kaia natively support multi signatures, which means there can be multiple signatures. The signature must be 65 bytes long.

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
        if iszero(call(gas, 0x3ff, 0, ptr, idx, 31, 1)) {
          invalid()
        }
        return(0, 32)
    }
}
```
## Hardfork Changes <a id="hardfork-changes"></a>
| Hardfork     | New items                           | Changes                                                                                                                                                                                                             |
|--------------|:------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cancun EVM   | kzg (0x0a) precompiled contract     |                                                                                                                                                                                                                     |
| Kore         |                                     | modExp (0x05) precompiled contract use new gas <br/>calculation logic. Computation cost also affected. <br/>Become more accurate.                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                         
| Istanbul EVM | blake2f (0x09) precompiled contract | kaia precompiled contract addresses has been moved <br/>from 0x09,0x0A,0x0B to 0x3FD,0x3FE,0x3FF.<br/>see the below [precompiled contract address change table](#precompiled-contract-address-change) for detail. |

### Precompiled contract address change <a id="precompiled-contract-address-change"></a>
| Precompiled Contract | address **BEFORE** istanbul EVM hardfork | address **AFTER** istanbul EVM hardfork |
|:---------------------|:-----------------------------------------|:----------------------------------------|
| vmLog                | 0x09                                     | 0x3fd                                   |
| feePayer             | 0x0a                                     | 0x3fe                                   |
| validateSender       | 0x0b                                     | 0x3ff                                   |
