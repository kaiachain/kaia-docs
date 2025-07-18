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

## Address 0x0B: bls12381G1Add\(input\) <a id="address-0x-0b-bls12381G1Add-input"></a>
The address 0x0B implements the BLS12381 G1 addoption operation. For more information, see [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537).
This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function bls12381add() public returns (bytes memory) {
    bytes memory input = hex"0000000000000000000000000000000012196c5a43d69224d8713389285f26b98f86ee910ab3dd668e413738282003cc5b7357af9a7af54bb713d62255e80f560000000000000000000000000000000006ba8102bfbeea4416b710c73e8cce3032c31c6269c44906f8ac4f7874ce99fb17559992486528963884ce429a992fee000000000000000000000000000000000001101098f5c39893765766af4512a0c74e1bb89bc7e6fdf14e3e7337d257cc0f94658179d83320b99f31ff94cd2bac0000000000000000000000000000000003e1a9f9f44ca2cdab4f43a1a3ee3470fdf90b2fc228eb3b709fcd72f014838ac82a6d797aeefed9a0804b22ed1ce8f7";
    (bool ok, bytes memory output) = address(0x0b).call(input);
    require(ok, "bls12381 G1 add operation failed");
    return output;
}
```

## Address 0x0C: bls12381G1MultiExp\(input\) <a id="address-0x-0c-bls12381G1MultiExp-input"></a>
The address 0x0C implements the BLS12381 G1 multiplication operation. For more information, see [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537).
This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function bls12381mul() public returns (bytes memory) {
    bytes memory input = hex"00000000000000000000000000000000112b98340eee2777cc3c14163dea3ec97977ac3dc5c70da32e6e87578f44912e902ccef9efe28d4a78b8999dfbca942600000000000000000000000000000000186b28d92356c4dfec4b5201ad099dbdede3781f8998ddf929b4cd7756192185ca7b8f4ef7088f813270ac3d48868a210000000000000000000000000000000000000000000000000000000000000002";
    (bool ok, bytes memory output) = address(0x0c).call(input);
    require(ok, "bls12381 G1 muloperation failed");
    return output;
}

function bls12381multiexp() public returns (bytes memory) {
    bytes memory input = hex"0000000000000000000000000000000017f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb0000000000000000000000000000000008b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e10000000000000000000000000000000000000000000000000000000000000032000000000000000000000000000000000e12039459c60491672b6a6282355d8765ba6272387fb91a3e9604fa2a81450cf16b870bb446fc3a3e0a187fff6f89450000000000000000000000000000000018b6c1ed9f45d3cbc0b01b9d038dcecacbd702eb26469a0eb3905bd421461712f67f782b4735849644c1772c93fe3d09000000000000000000000000000000000000000000000000000000000000003300000000000000000000000000000000147b327c8a15b39634a426af70c062b50632a744eddd41b5a4686414ef4cd9746bb11d0a53c6c2ff21bbcf331e07ac9200000000000000000000000000000000078c2e9782fa5d9ab4e728684382717aa2b8fad61b5f5e7cf3baa0bc9465f57342bb7c6d7b232e70eebcdbf70f903a450000000000000000000000000000000000000000000000000000000000000034";
    (bool ok, bytes memory output) = address(0x0c).call(input);
    require(ok, "bls12381 G1 multiexp operation failed");
    return output;
}
```

## Address 0x0D: bls12381G2Add\(input\) <a id="address-0x-0d-bls12381G2Add-input"></a>
The address 0x0D implements the BLS12381 G2 addition operation. For more information, see [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537).
This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function bls12381g2add() public returns (bytes memory) {
    bytes memory input = hex"000000000000000000000000000000000149704960cccf9d5ea414c73871e896b1d4cf0a946b0db72f5f2c5df98d2ec4f3adbbc14c78047961bc9620cb6cfb5900000000000000000000000000000000140c5d25e534fb1bfdc19ba4cecaabe619f6e0cd3d60b0f17dafd7bcd27b286d4f4477d00c5e1af22ee1a0c67fbf177c00000000000000000000000000000000029a1727041590b8459890de736df15c00d80ab007c3aee692ddcdf75790c9806d198e9f4502bec2f0a623491c3f877d0000000000000000000000000000000008a94c98baa9409151030d4fae2bd4a64c6f11ea3c99b9661fdaed226b9a7c2a7d609be34afda5d18b8911b6e015bf49000000000000000000000000000000000286f09f931c07507ba4aafb7d43befe0b1d25b27ecc9199b19a9dc20bc7ec0329479ef224e00dece67ec0d61f1ca5ae0000000000000000000000000000000014e6ed154b5552be5c463b730b2134f83e0071dcdadfaa68e6c7c7f6e17dabb7daf06e409177bc4b38cfdb8248157618000000000000000000000000000000000f145e998dc6eb0c2b2be87db62949c7bfa63e8b01c8634248010fd623cfaec5d6c6c193331440957d333bf0c988b7b10000000000000000000000000000000002a1ab3eea343cfdea5779f64b3bddbf0769aded60e54a7507338f044310ba239430663394f110e560594d6042a99f1c";
    (bool ok, bytes memory output) = address(0x0d).call(input);
    require(ok, "bls12381 G2 add operation failed");
    return output;
}
```

## Address 0x0E: bls12381G2MultiExp\(input\) <a id="address-0x-0e-bls12381G2MultiExp-input"></a>
The address 0x0E implements the BLS12381 G2 multiplication operation. For more information, see [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537).
This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function bls12381g2mul() public returns (bytes memory) {
    bytes memory input = hex"00000000000000000000000000000000103121a2ceaae586d240843a398967325f8eb5a93e8fea99b62b9f88d8556c80dd726a4b30e84a36eeabaf3592937f2700000000000000000000000000000000086b990f3da2aeac0a36143b7d7c824428215140db1bb859338764cb58458f081d92664f9053b50b3fbd2e4723121b68000000000000000000000000000000000f9e7ba9a86a8f7624aa2b42dcc8772e1af4ae115685e60abc2c9b90242167acef3d0be4050bf935eed7c3b6fc7ba77e000000000000000000000000000000000d22c3652d0dc6f0fc9316e14268477c2049ef772e852108d269d9c38dba1d4802e8dae479818184c08f9a569d878451263dbd792f5b1be47ed85f8938c0f29586af0d3ac7b977f21c278fe1462040e3";
    (bool ok, bytes memory output) = address(0x0e).call(input);
    require(ok, "bls12381 G2 mul operation failed");
    return output;
}

function bls12381g2multiexp() public returns (bytes memory) {
    bytes memory input = hex"0000000000000000000000000000000010d48bf523f3909cf90aa58a9517ef5421f1212accd5e8a0f830aeb15a587e215ca9c340bb846b1d0474e43840b2af79000000000000000000000000000000000cc1a3976caf97b9d59f448f6d9f413eef8904f360c0cf912fe942b38d7fcc637a17038973a133608ae769d3e389b18a00000000000000000000000000000000069a6122c6f0ec68834b7617c755a7eb33a80a25acf95859da5ff03316447182f122d20d993b04e79b6fe859b7adf5a8000000000000000000000000000000000058c6f8c297524319bae6722e0a957d1ba0f75ee3a8aaf06148641c67925d15780e419a38ed7e07410e82769da74f2d070e7e2ae2751a1f71962726a31f77553c2da38f4fecda435b6e5459d5e833b400000000000000000000000000000000156ca5e80be8c8c03a5506ce9abd22a9d4958c372678c0caf6f1329898507dfcb1f06a9464cf080bc6881fa5b7df1ebe00000000000000000000000000000000088174d486b4086b931010da298a399e15b60a113e08f571e096d3a4e94b57b3a684711318796eeca9319119b201abb30000000000000000000000000000000000b96ff68505c088cc03a1c2dc363b05bc8544728a12b29569bed137780523123eb17e68f4632383c252d81bca0c5ca9000000000000000000000000000000000486fc6e5224c5fad56234c41856e60bee4a6c1046f673bf7d5c1bbb603b141fc91074da5f9d3d41b796a2ebcebd9e74d16aa883a20307f5436354bab32b4633e83178f33626af3edb14f82724b8e12500000000000000000000000000000000121fe97c62e068988ebff21d8129d52aa903afdbb62862c7fd99564d9ad72182ab1f3a1100223ae486cd76f6938e123f000000000000000000000000000000000968ddedb04f52140160061828b5f88dfd09aaf37df625ee6f66b9500d6608df31c7edf86296eccf8f9918b051a5e4df000000000000000000000000000000000b7491cb8f6252e3861d7160feb0afdd736d27886863ec0909a7cc711a9b71aace18b17a00a2999dd57ca1a74f148516000000000000000000000000000000000fdb280093ef45b12b694ca3390a865ee18e4c04b231e2c98cc28706d4cefaf4e654582ee03f34ecf1dfa9674489d553041390a2209b80f7c64d14965cc2f515d5fbdf37953f75c4a0203bf0d9fb674b0000000000000000000000000000000010d001a09cf5dc3276482185f26ef3f75d28cd6d2667eb08a7fe06c03b99f3b6c4d82390739b6867a314291cc642a8b2000000000000000000000000000000000587846a460b1f37c2e7f491f9a097b4e86e1943d9cd0999313f65627b3907f09b5d5ac1be376a313a959dd136f7e9b3000000000000000000000000000000000af439695556e86b102926d3b40e3e54cc84464e120de3b4e3c5541a6a5bca44151fb0594009663764c1824518b13f020000000000000000000000000000000003bfd9418c1e57269e222152d321b83ae090f216cb422956dd1fcc464f68526cb4a05cdaefc7bbe6e81d4ffe27d64db47cf23dee8d95d94046678f3bdb4b0ea3d4e3a1a2f07f582e2a98ad6eb7562cbf00000000000000000000000000000000196f78b64fcc342ba4f4edf34a3080ec950532a5de21a875dd061f09351def5ba3b85745a561e38117a14c20d33a14610000000000000000000000000000000003929c2bc55f323d57dc3529bcf6644e61c941b72b424d69969c1cde7a804d157045bbf6d5b79a3e6686509e11ecdac0000000000000000000000000000000000f6b659818510cde463c52cf00bd99da045c80af4d5cd0e55f9bdd81f34169fe869c519f37a98ff20c56db554469087600000000000000000000000000000000129709e97757724e765f6600c2b1928286efab55ec8d16876a2a3210bf9d31cc5425265d0576a2d5469cbd9a6c8c27c012adc8edb64db5bf0ed6724f3b54140ed6c81ca65ef9d1b38c8bca6a62bfd3c60000000000000000000000000000000009f5f167c9b61a0ef76415fcceff04f3fa57071c2d79f443ef8a7e6049cb1352f650ebd8f358904bb432d42772c29afd000000000000000000000000000000001524a875d73e03c53b92465bafca582479110611bac6a98fc7d76966e9781308a10cb202289c0776cf5c36515733ccf900000000000000000000000000000000002b1acace94a6fe196b217a9aff413fe0bcb55122ce9e344942843e5afba0d5f2cd0bba14c9c8cb9dd1c3e9024918fc0000000000000000000000000000000018e4f85c7663e596182603862adb559635fdf16ba35fbce7278680ea289f871bcf6755d85654b2a37ae77a37e77ba06ed1535bfcd68e8136808edf89967fbbf76b7f58d1a8ac95ebd4944b9e440f20b20000000000000000000000000000000018ee4b4855f866781f38a618c2fe4214c63034620ea5b72361079b0a5c2b2d6fb9ea73fa202db3a2678cf07219cde81100000000000000000000000000000000180870513afef93870ca64e2363fa1aa43a599db97f3b807ada1c25ae331c80b8ead5cd69b6f5a65a083606591de90ff0000000000000000000000000000000010afd546703baa35a9eabaeb45d301bd5be115557bbb4ff2a0e493668ee790e947eeafcaa923f62ca00b8e635994e39b000000000000000000000000000000001089996b218aacde4ccfca4d2f66d79fe161d962baaf2d6696e1a76ea40af4ae7195e8cf9f6417ffd054f20b65ddfb104c576996d90abde581afb58903cde4b9443eeb65e21b0d68c578e04c8f28f3d30000000000000000000000000000000011757ad74a3fb341c8eb6862978ab3fb5e8cfc8fdbda7d82756532a890d61919cce931872ff339843805e00d8c62ec4200000000000000000000000000000000060783a06e93e82cb08e5dc1aa31202ba11676511300e186ae8e45248b7fdec3b7d5b6849f8b79b8f78ad84f36218544000000000000000000000000000000000ecfd8ab18066fe3408fd20f2a4478156e9a19a09b58da76486c9f6a013d861960b6b99bf49cbecfa8c9d01d5615c1bc000000000000000000000000000000000b45709845d35d7b560745375df79fb95df15e85b96cc1b98cc832c74621339c609018d153bff93f2f5493a52b7326073c558cc615b1c61c9a42b8b0ab4668ffcfc9e95bbe958e72e7a5500058e6b0bd0000000000000000000000000000000003f9de90222619216852356052e9819d7c6e8ff91e0c6f1d8cec832770ed9001db4569fbf579ab16964d76ae7d1b89e900000000000000000000000000000000010b7cf8f0d283cc22942ed73c599115763dcfc1ddc98d87979fc3dce2f33ca3531cc2909d94f86736dda2a4e94a4f0c000000000000000000000000000000000b0aa4d947644cbc7df8d1927cdec66a68862e5a806e25554f27cc1a3701f429fc7097497ad0419e21cc403b472c8ea900000000000000000000000000000000146270ecb66e1763437b824f2ae122f72f20eb93fb30474691a0a192ceb932b1dee111fa44954075335ab360d31ee68d61301b4957a468e2817db5914ff102bc96460a2c5c15e78bd42884b1223fa71a000000000000000000000000000000000c977cb8de4b6e2e33d916f74eb4e42f089d22b54b59fac9aab0e4cafc8aa2b0f8c55d7251662b3499ea140e322dbbff00000000000000000000000000000000106944a9c2d2ecd08e109de29095f3460128bb751051a1f079acb58b6a60b0bb5f52e63d47b688f4a382a77c3b039eb5000000000000000000000000000000000d2f8be1c78995d54fbccab61f816b6ec52dd19aee6aeedc0e4bde2898b2d07c2925da0440a38c4c965a823fff10389f00000000000000000000000000000000183b5d15b243cc5d9584842ab1a0a1e01ad87268728d72aa8c0d7ec6e7069063a11fdd1525d2b30b35e4568da7c44c5495cd2686d24a5bdda0bcb118a2c0eb5ccfe411ec452e1beb3adbda7e93ea367c000000000000000000000000000000000f65ad4c21fddadcc49a8f7bc281d2b7901707f51a67122179fe97da46ea5e1bc6e70d68eb4eb6776307510a67e972620000000000000000000000000000000009003dc68cb0cdec4a502436718f066348f1957ae65ecca8d32c5fd776215cb9a098c0ffe56c92d79dd68d251f49f13e00000000000000000000000000000000038ecf0bb98ff2e84b388c58059ba0de0cff3d5881ecf01d668495ce81b76b00323c665ba88309af5552b7950cc8c08f000000000000000000000000000000001924aa0f460659f552458fb469467a2925fcb2420d4fa6249310456853be3d08bd5c37a3f0a9d6e94e434391d20cccedfb81d555d1e2df92cdb487a888fbedad976dce54b5c46a39893edeac21a12d6e00000000000000000000000000000000189c3ee691387fbbcffdb147c880218c3e5c0bf78c44461ac1bd3ecd5d4b85225e46cdb068049607fedfcca14882e289000000000000000000000000000000000260efc08531083db2839d1413c90968e87d79bc1a2c730f0020e40beb92e84b73ef43e80f7c61e1a30c0cee11b3cb370000000000000000000000000000000005c852ca0aae2c575c65ef18b624f50a32c007d299f24a3ec6cacbcef1d6e3bdba9650fd7d639bdc60a3e107ee9c013c000000000000000000000000000000000321c01a9de69d6b89db4ed88dd48261ee28facc5e26511fb2833fa45edfb58051c8c3ce9501e8b4c3cab9c456705889bfeed84bd95fb955d1b1045c059ffd051324dc8966e504164e54f76f02eb1b8600000000000000000000000000000000183d50635b22e4d620130e0d4008e3bfffae5dadd7e34f4496899ca54eb4d9e3e95c54ae1d9664609c58d02ee5eff65500000000000000000000000000000000029e3b4496a379464302b1476a4549db371f5d6721704b1d6bd35e2344d7679f8a61a0c3b12f287fd86fd247f9652cea0000000000000000000000000000000012c6a3793fd23e955708f5aeb4d6efb670d25a38a67813ecc72f899cd5f926ab7ef198bf6d591328383aaf54f756c66b000000000000000000000000000000001914d3e4b6ea96bb91333468fe8f3bb74636e9a4f2ed198e9ff01b49ba02791d5bd63224f6a38538aceb777168bef688e3b308b95f6d496e6d5b910b6aabef8d9f868471653e8254ab4d49d593180d250000000000000000000000000000000007457f2601621a99050d8993244f026b9a62ff7055b325e6f1edd1cf54065785f003cf7c8a4bb1f7bdf14e220e490ada000000000000000000000000000000000928eb76b428dde37546a27f3d77605c293738f448fbdd6d618747b0de04004aa4419cc5601600419c6e1d470c15982e0000000000000000000000000000000008074e9f5473492dd2e536f7b305be4e5c564cfc9218934d03dde6dc5118064ebaa5c26fdd1123a9c31336c37c1234900000000000000000000000000000000002bba1f9b7da6abd2b322c8f11c749b2a284552eab25a77d21b38b028da477a3ffec1901a015e81fe2893576a41e4c0bd4ea92e0e776be341c8444d4040ec121a2847256c5c9bc918adb28618548b0480000000000000000000000000000000003760958eac45397eca1a1d951a80265a728dc3c584f7dae111e7ce04248885321b69b334b00cdb0334a362676c2d32f000000000000000000000000000000001031e4a63129ec40da5fe9dacfe148a67662eaa00e1fd5c30336462371c167348a10e50f4dc18469a1a6b76485f77e12000000000000000000000000000000001412dbf993c557323426b486f18a91d16b4baa2c497b30fb332a710ac901c96d46a577d04ea87afb08258aa6d204a1c9000000000000000000000000000000000da015ca09ac0c3245c090f39852218f46fea62198fba35ebc4a7f14887943c3bd1bbbfbfa300611e45f419b33988e404c07f5188e4c6270a7e9e2f551683c4f9dc943ffc7ec279d15816a7f4910b8d30000000000000000000000000000000015c9121f72e2425cc8aa4c878907628dfe75a903b7f756b9e13728372cba598859d20a92a8297d95e1fbe25fd1cd968300000000000000000000000000000000025a3faebfa53918efa733949f914be08b791794bd4963f0c3fd78df48b14ad214374b08299327575c0731b54eafed76000000000000000000000000000000000771782ecd9980da521618af2f9eb55d91d67b20ba615c7b3cb1a48d483ca405fe99a1cdd17e4dc7aeffce586987d41900000000000000000000000000000000136000da90a76d538f336608ce877be943025b4c8bf15880ea9c1c001c20c954292d362dac9783b7bf66b8d51ddaf0f2a819a0438efd7ec0c1e3eea07ba201af6a832fecec818adbb781ad0c23e81dae";
    (bool ok, bytes memory output) = address(0x0e).call(input);
    require(ok, "bls12381 G2 multiexp operation failed");
    return output;
}
```

## Address 0x0F: bls12381Pairing\(input\) <a id="address-0x-0f-bls12381Pairing-input"></a>
The address 0x0F implements the BLS12381 pairing operation. For more information, see [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537).
This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function bls12381pairing() public returns (bytes memory) {
    bytes memory input = hex"0000000000000000000000000000000019c822a4d44ac22f6fbaef356c37ceff93c1d6933e8c8f3b55784cfe62e5705930be48607c3f7a4a2ca146945cad6242000000000000000000000000000000000353d6521a17474856ad69582ce225f27d60f5a8319bea8cefded2c3f6b862d76fe633c77ed8ccdf99d2b10430253fc8000000000000000000000000000000000805892f21889cab3cfe62226eaff6a8d3586d4396692b379efc7e90b0eaad4c9afbdf0f56b30f0c07ae0bc4013343b30000000000000000000000000000000007853f0e75c8dee034c2444299da58c98f22de367a90550dbc635fb52c9a8f61ccc100f70f10208944e48d09507fdce100000000000000000000000000000000064afd6b3ef7ff7ec34f1fa330877b42958a46a7698c6d21adf73bfdfcab7793b312e21e5988652e655f2d42edb8a673000000000000000000000000000000000ea8a2217c3dbcc0f6e562de9cb2f334c896577d0b3a7108d96b1aba2d705dbf531e870d4023cec2c0533455013242330000000000000000000000000000000019c822a4d44ac22f6fbaef356c37ceff93c1d6933e8c8f3b55784cfe62e5705930be48607c3f7a4a2ca146945cad62420000000000000000000000000000000016ad3b981f689f51f46e3e5e166986e4e71655dcc1e928327751ffdcfff8934caec5cc37327b3320202c4efbcfda6ae3000000000000000000000000000000000805892f21889cab3cfe62226eaff6a8d3586d4396692b379efc7e90b0eaad4c9afbdf0f56b30f0c07ae0bc4013343b30000000000000000000000000000000007853f0e75c8dee034c2444299da58c98f22de367a90550dbc635fb52c9a8f61ccc100f70f10208944e48d09507fdce100000000000000000000000000000000064afd6b3ef7ff7ec34f1fa330877b42958a46a7698c6d21adf73bfdfcab7793b312e21e5988652e655f2d42edb8a673000000000000000000000000000000000ea8a2217c3dbcc0f6e562de9cb2f334c896577d0b3a7108d96b1aba2d705dbf531e870d4023cec2c053345501324233";
    (bool ok, bytes memory output) = address(0x0f).call(input);
    require(ok, "bls12381 pairing operation failed");
    return output;
}
```

## Address 0x10: bls12381MapG1\(input\) <a id="address-0x-10-bls12381MapG1-input"></a>
The address 0x10 implements the BLS12381 Map G1 operation. For more information, see [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537).
This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function bls12381mapg1() public returns (bytes memory) {
    bytes memory input = hex"000000000000000000000000000000001443e61dbf14b6c6ed99e1917ecfbe5a4a23ab9bdd3bb089fbba76d795d715d9d2e3c7d8db0b7a9434ad691b68bad3b2";
    (bool ok, bytes memory output) = address(0x10).call(input);
    require(ok, "bls12381 G1 map operation failed");
    return output;
}
```

## Address 0x11: bls12381MapG2\(input\) <a id="address-0x-11-bls12381MapG2-input"></a>
The address 0x11 implements the BLS12381 Map G2 operation. For more information, see [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537).
This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function bls12381mapg2() public returns (bytes memory) {
    bytes memory input = hex"0000000000000000000000000000000010e53fe9fa94ca622cfa370129c1619b2426bd9d50f4b5eb8a3f681479128dbe92adde15477ad8a4463b08f1a02a62d50000000000000000000000000000000014d10a90709789b25369f0376f39b16860aee1ddc3a4340542abff0077a4af8da946cc29fb6afd9930b872ea98749be5";
    (bool ok, bytes memory output) = address(0x11).call(input);
    require(ok, "bls12381 G2 map operation failed");
    return output;
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
