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

- 사례 1) 블록 번호 `#75373310`의 Kairos에 배포된 컨트랙트는 0x09, 0x0a, 0x0b를 각각 vmLog, feePayer, validateSender의 주소로 인식하며, blake2f는 사용할 수 없습니다.
- 사례 2) 블록 번호 `#75373314`의 Kairos에 배포된 컨트랙트는 0x09를 blake2f의 주소로 인식하고 0x3fd, 0x3fe, 0xff를 vmLog, feePayer, validateSender의 주소로 인식합니다.

Precompiled contracts related hardfork changes can be found at the bottom of this page. Go to [Hardfork Changes](#hardfork-changes).

:::

## 주소 0x01: ecrecover\(hash, v, r, s\) <a id="address-0x-01-ecrecover-hash-v-r-s"></a>

0x01 주소는 ecrecover를 구현합니다. 이 함수는 ECDSA의 복구 함수를 계산하여 주어진 서명에서 주소를 반환합니다. It is the only precompile that comes with a solidity wrapper. 함수 프로토타입은 다음과 같습니다:

```text
function ecRecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public view returns (address) {
        address r = ecrecover(hash, v, r, s); // prototype function
        require(r != address(0), "signature is invalid");
} // 솔리디티 래퍼
```

## 주소 0x02: sha256\(data\) <a id="address-0x-02-sha-256-data"></a>

0x02 주소는 SHA256 해시를 구현합니다. 이 함수는 주어진 데이터에서 SHA256 해시를 반환합니다. It is mostly used by Bitcoin and Zcash as Ethereum uses Keccak256. 함수 프로토타입은 다음과 같습니다:

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
      mstore(0, numberToHash) // 0번째 메모리 워드에 숫자 저장

      let ok := staticcall(gas(), 2, 0, 32, 0, 32)
      if iszero(ok) {
    revert(0,0)
      }
          return(0, 32)
  }
}
```

## 주소 0x03: ripemd160\(data\) <a id="address-0x-03-ripemd-160-data"></a>

0x03 주소는 RIPEMD160 해시를 구현합니다. 이 함수는 주어진 데이터에서 RIPEMD160 해시를 반환합니다. 함수 프로토타입은 다음과 같습니다:

```text
function RIPEMD160(bytes calldata data) public view returns (bytes20 h) {
  (bool ok, bytes memory out) = address(0x03).staticcall(data);
  require(ok);
  h = bytes20(abi.decode(out, (bytes32)) << 96);
}
```

## 주소 0x04: datacopy\(data\) <a id="address-0x-04-datacopy-data"></a>

0x04 주소는 datacopy \(즉, 신원 함수\)를 구현합니다. 이 함수는 수정 없이 입력 데이터를 직접 반환합니다. This precompiled contract is not supported by the Solidity compiler. 다음 코드를 사용하여 이 미리 컴파일된 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x05: bigModExp\(base, exp, mod\) <a id="address-0x05-bigmodexp-base-exp-mod"></a>

0x05 주소는 `base**exp % mod` 공식을 구현합니다. 주어진 데이터의 결과를 반환합니다. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract. 이 사전 컴파일된 컨트랙트는 임의의 길이의 입력을 지원하지만, 아래 코드에서는 고정된 길이의 입력을 예로 사용합니다.

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

## 주소 0x06: bn256Add\(ax, ay, bx, by\) <a id="address-0x-06-bn-256-add-ax-ay-bx-by"></a>

주소 0x06은 네이티브 타원 커브 점 덧셈을 구현합니다. 이 주소는 커브 bn256에서 \(ax, ay\) 및 \(bx, by\)가 유효한 점인 `(ax, ay) + (bx, by)`를 나타내는 타원 커브 점을 반환합니다. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

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

## 주소 0x07: bn256ScalarMul\(x, y, scalar\) <a id="address-0x-07-bn-256-scalarmul-x-y-scalar"></a>

주소 0x07은 scalar 값으로 네이티브 타원 곡선 곱셈을 구현합니다. 이 주소는 `scalar * (x, y)`를 나타내는 타원 커브 포인트를 반환하며, \(x, y\)는 커브 bn256에서 유효한 커브 포인트입니다. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

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

## 주소 0x08: bn256Pairing\(a1, b1, a2, b2, a3, b3, ..., ak, bk\) <a id="address-0x-08-bn-256-pairing-a-1-b-1-a-2-b-2-a-3-b-3-ak-bk"></a>

0x08 주소는 타원 곡선 파싱 연산을 구현하여 zkSNARK 검증을 수행합니다. 자세한 내용은 [EIP-197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md)을 참조하세요. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

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

0x09 주소는 BLAKE2b F 압축 기능을 구현합니다. 자세한 내용은 [EIP-152](https://eips.ethereum.org/EIPS/eip-152)를 참고하세요. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

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

## 주소 0x0B: bls12381G1Add\(입력\) <a id="address-0x-0b-bls12381G1Add-input"></a>

0x0B 주소는 BLS12381 G1 추가 옵션 작업을 구현합니다. 자세한 내용은 [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537)을 참조하세요.
This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
함수 bls12381add() public returns (바이트 메모리) {
    바이트 메모리 입력 = hex"0000000000000000000000000000000012196c5a43d69224d8713389285f26b98f86ee910ab3dd668e413738282003cc5b7357af9a7af54bb713d62255e80f560000000000000000000000000000000006ba8102bfbeea4416b710c73e8cce3032c31c6269c44906f8ac4f7874ce99fb17559992486528963884ce429a992fee000000000000000000000000000000000001101098f5c39893765766af4512a0c74e1bb89bc7e6fdf14e3e7337d257cc0f94658179d83320b99f31ff94cd2bac0000000000000000000000000000000003e1a9f9f44ca2cdab4f43a1a3ee3470fdf90b2fc228eb3b709fcd72f014838ac82a6d797aeefed9a0804b22ed1ce8f7";
    (bool ok, 바이트 메모리 출력) = address(0x0b).call(input);
    require(ok, "bls12381 G1 추가 작업 실패");
    return output;
}
```

## 주소 0x0C: bls12381G1MultiExp\(입력\) <a id="address-0x-0c-bls12381G1MultiExp-input"></a>

주소 0x0C는 BLS12381 G1 곱셈 연산을 구현합니다. 자세한 내용은 [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537)을 참조하세요.
This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
함수 bls12381mul() public returns (바이트 메모리) {
    바이트 메모리 입력 = hex"00000000000000000000000000000000112b98340eee2777cc3c14163dea3ec97977ac3dc5c70da32e6e87578f44912e902ccef9efe28d4a78b8999dfbca942600000000000000000000000000000000186b28d92356c4dfec4b5201ad099dbdede3781f8998ddf929b4cd7756192185ca7b8f4ef7088f813270ac3d48868a210000000000000000000000000000000000000000000000000000000000000002";
    (bool ok, 바이트 메모리 출력) = address(0x0c).call(input);
    require(ok, "bls12381 G1 muloperation failed");
    return output;
}

function bls12381multiexp() public returns (bytes memory) {
    bytes memory input =. hex"0000000000000000000000000000000017f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb0000000000000000000000000000000008b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e10000000000000000000000000000000000000000000000000000000000000032000000000000000000000000000000000e12039459c60491672b6a6282355d8765ba6272387fb91a3e9604fa2a81450cf16b870bb446fc3a3e0a187fff6f89450000000000000000000000000000000018b6c1ed9f45d3cbc0b01b9d038dcecacbd702eb26469a0eb3905bd421461712f67f782b4735849644c1772c93fe3d09000000000000000000000000000000000000000000000000000000000000003300000000000000000000000000000000147b327c8a15b39634a426af70c062b50632a744eddd41b5a4686414ef4cd9746bb11d0a53c6c2ff21bbcf331e07ac9200000000000000000000000000000000078c2e9782fa5d9ab4e728684382717aa2b8fad61b5f5e7cf3baa0bc9465f57342bb7c6d7b232e70eebcdbf70f903a450000000000000000000000000000000000000000000000000000000000000034";
    (bool ok, 바이트 메모리 출력) = address(0x0c).call(input);
    require(ok, "bls12381 G1 multiexp operation failed");
    return output;
}
```

## 주소 0x0D: bls12381G2Add\(입력\) <a id="address-0x-0d-bls12381G2Add-input"></a>

주소 0x0D는 BLS12381 G2 추가 연산을 구현합니다. 자세한 내용은 [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537)을 참조하세요.
이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

```text
함수 bls12381g2add() public returns (바이트 메모리) {
    바이트 메모리 입력 = hex"000000000000000000000000000000000149704960cccf9d5ea414c73871e896b1d4cf0a946b0db72f5f2c5df98d2ec4f3adbbc14c78047961bc9620cb6cfb5900000000000000000000000000000000140c5d25e534fb1bfdc19ba4cecaabe619f6e0cd3d60b0f17dafd7bcd27b286d4f4477d00c5e1af22ee1a0c67fbf177c00000000000000000000000000000000029a1727041590b8459890de736df15c00d80ab007c3aee692ddcdf75790c9806d198e9f4502bec2f0a623491c3f877d0000000000000000000000000000000008a94c98baa9409151030d4fae2bd4a64c6f11ea3c99b9661fdaed226b9a7c2a7d609be34afda5d18b8911b6e015bf49000000000000000000000000000000000286f09f931c07507ba4aafb7d43befe0b1d25b27ecc9199b19a9dc20bc7ec0329479ef224e00dece67ec0d61f1ca5ae0000000000000000000000000000000014e6ed154b5552be5c463b730b2134f83e0071dcdadfaa68e6c7c7f6e17dabb7daf06e409177bc4b38cfdb8248157618000000000000000000000000000000000f145e998dc6eb0c2b2be87db62949c7bfa63e8b01c8634248010fd623cfaec5d6c6c193331440957d333bf0c988b7b10000000000000000000000000000000002a1ab3eea343cfdea5779f64b3bddbf0769aded60e54a7507338f044310ba239430663394f110e560594d6042a9
    (bool ok, 바이트 메모리 출력) = address(0x0d).call(input);
    require(ok, "bls12381 G2 추가 작업이 실패했습니다");
    return output;
}
```

## 주소 0x0E: bls12381G2MultiExp\(입력\) <a id="address-0x-0e-bls12381G2MultiExp-input"></a>

주소 0x0E는 BLS12381 G2 곱셈 연산을 구현합니다. 자세한 내용은 [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537)을 참조하세요.
이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

```text
함수 bls12381g2mul() public returns (바이트 메모리) {
    바이트 메모리 입력 =. hex"00000000000000000000000000000000103121a2ceaae586d240843a398967325f8eb5a93e8fea99b62b9f88d8556c80dd726a4b30e84a36eeabaf3592937f2700000000000000000000000000000000086b990f3da2aeac0a36143b7d7c824428215140db1bb859338764cb58458f081d92664f9053b50b3fbd2e4723121b68000000000000000000000000000000000f9e7ba9a86a8f7624aa2b42dcc8772e1af4ae115685e60abc2c9b90242167acef3d0be4050bf935eed7c3b6fc7ba77e000000000000000000000000000000000d22c3652d0dc6f0fc9316e14268477c2049ef772e852108d269d9c38dba1d4802e8dae479818184c08f9a569d878451263dbd792f5b1be47ed85f8938c0f29586af0d3ac7b977f21c278fe1462040e3";
    (bool ok, 바이트 메모리 출력) = address(0x0e).call(input);
    require(ok, "bls12381 G2 mul 연산 실패");
    return output;
}

function bls12381g2multiexp() public returns (bytes memory) {
    bytes memory input =. hex"0000000000000000000000000000000010d48bf523f3909cf90aa58a9517ef5421f1212accd5e8a0f830aeb15a587e215ca9c340bb846b1d0474e43840b2af79000000000000000000000000000000000cc1a3976caf97b9d59f448f6d9f413eef8904f360c0cf912fe942b38d7fcc637a17038973a133608ae769d3e389b18a00000000000000000000000000000000069a6122c6f0ec68834b7617c755a7eb33a80a25acf95859da5ff03316447182f122d20d993b04e79b6fe859b7adf5a8000000000000000000000000000000000058c6f8c297524319bae6722e0a957d1ba0f75ee3a8aaf06148641c67925d15780e419a38ed7e07410e82769da74f2d070e7e2ae2751a1f71962726a31f77553c2da38f4fecda435b6e5459d5e833b400000000000000000000000000000000156ca5e80be8c8c03a5506ce9abd22a9d4958c372678c0caf6f1329898507dfcb1f06a9464cf080bc6881fa5b7df1ebe00000000000000000000000000000000088174d486b4086b931010da298a399e15b60a113e08f571e096d3a4e94b57b3a684711318796eeca9319119b201abb30000000000000000000000000000000000b96ff68505c088cc03a1c2dc363b05bc8544728a12b29569bed137780523123eb17e68f4632383c252d81bca0c5ca9000000000000000000000000000000000486fc6e5224c5fad56234c41856
    (bool ok, 바이트 메모리 출력) = address(0x0e).call(input);
    require(ok, "bls12381 G2 multiexp operation failed");
    return output;
}
```

## 주소 0x0F: bls12381페어링\(입력\) <a id="address-0x-0f-bls12381Pairing-input"></a>

0x0F 주소는 BLS12381 페어링 작업을 구현합니다. 자세한 내용은 [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537)을 참조하세요.
이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

```text
함수 bls12381pairing() public returns (바이트 메모리) {
    바이트 메모리 입력 = hex"0000000000000000000000000000000019c822a4d44ac22f6fbaef356c37ceff93c1d6933e8c8f3b55784cfe62e5705930be48607c3f7a4a2ca146945cad6242000000000000000000000000000000000353d6521a17474856ad69582ce225f27d60f5a8319bea8cefded2c3f6b862d76fe633c77ed8ccdf99d2b10430253fc8000000000000000000000000000000000805892f21889cab3cfe62226eaff6a8d3586d4396692b379efc7e90b0eaad4c9afbdf0f56b30f0c07ae0bc4013343b30000000000000000000000000000000007853f0e75c8dee034c2444299da58c98f22de367a90550dbc635fb52c9a8f61ccc100f70f10208944e48d09507fdce100000000000000000000000000000000064afd6b3ef7ff7ec34f1fa330877b42958a46a7698c6d21adf73bfdfcab7793b312e21e5988652e655f2d42edb8a673000000000000000000000000000000000ea8a2217c3dbcc0f6e562de9cb2f334c896577d0b3a7108d96b1aba2d705dbf531e870d4023cec2c0533455013242330000000000000000000000000000000019c822a4d44ac22f6fbaef356c37ceff93c1d6933e8c8f3b55784cfe62e5705930be48607c3f7a4a2ca146945cad62420000000000000000000000000000000016ad3b981f689f51f46e3e5e166986e4e71655dcc1e928327751ffdcfff8934caec5cc37327b3320202c4efbcfda
    (bool ok, 바이트 메모리 출력) = address(0x0f).call(input);
    require(ok, "bls12381 페어링 작업 실패");
    return output;
}
```

## 주소 0x10: bls12381MapG1\(입력\) <a id="address-0x-10-bls12381MapG1-input"></a>

주소 0x10은 BLS12381 맵 G1 작업을 구현합니다. 자세한 내용은 [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537)을 참조하세요.
이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

```text
function bls12381mapg1() public returns (bytes memory) {
    bytes memory input = hex"00000000000000000000000000001443e61dbf14b6c6ed99e1917ecfbe5a4a23ab9bdd3bb089fbba76d795d715d9d2e3c7d8db0b7a9434ad691b68bad3b2";
    (bool ok, bytes memory output) = address(0x10).call(input);
    require(ok, "bls12381 G1 맵 작업 실패");
    return output;
}
```

## 주소 0x11: bls12381MapG2\(입력\) <a id="address-0x-11-bls12381MapG2-input"></a>

0x11 주소는 BLS12381 맵 G2 작업을 구현합니다. 자세한 내용은 [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537)을 참조하세요.
이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

```text
함수 bls12381mapg2() public returns (바이트 메모리) {
    바이트 메모리 입력 = hex"0000000000000000000000000000000010e53fe9fa94ca622cfa370129c1619b2426bd9d50f4b5eb8a3f681479128dbe92adde15477ad8a4463b08f1a02a62d50000000000000000000000000000000014d10a90709789b25369f0376f39b16860aee1ddc3a4340542abff0077a4af8da946cc29fb6afd9930b872ea98749be5";
    (bool ok, 바이트 메모리 출력) = address(0x11).call(input);
    require(ok, "bls12381 G2 맵 작업 실패");
    return output;
}
```

## 주소 0x3fd: vmLog\(str\) <a id="address-0x-3fc-vmlog-str"></a>

0x3FD 주소는 지정된 문자열 `str`을 특정 파일에 인쇄하거나 로거 모듈에 전달합니다. 자세한 내용은 [debug_setVMLogTarget](../../references/json-rpc/debug/set-vm-log-target)을 참조하세요. 이 사전 컴파일된 컨트랙트는 디버깅 목적으로만 사용해야 하며, 카이아 노드가 시작될 때 `--vmlog` 옵션을 활성화해야 한다는 점에 유의하세요. 또한, Kaia 노드의 로그 레벨이 4 이상이어야 vmLog의 출력을 볼 수 있습니다. 이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

```text
function callVmLog(bytes memory str) public {
    address(0x3fd).call(str);
}
```

## 주소 0x3fe: feePayer\(\) <a id="address-0x-3fd-feepayer"></a>

0x3FE 주소는 실행 중인 트랜잭션의 수수료 납부자를 반환합니다. 이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x3ff: validateSender\(\) <a id="address-0x-3fe-validatesender"></a>

0x3FF 주소는 메시지로 발신자의 서명을 검증합니다. Kaia는 [주소에서 키 쌍을 분리](../accounts.md#decoupling-key-pairs-from-addresses)하기 때문에, 서명이 해당 발신자가 제대로 서명했는지 검증해야 합니다. 이를 위해 이 사전 컴파일된 컨트랙트는 세 가지 매개변수를 받습니다:

- 공개키를 받기 위한 발신자 주소
- 서명을 생성하는 데 사용되는 메시지 해시
- 발신자의 개인 키가 주어진 메시지 해시를 사용하여 서명한 서명

미리 컴파일된 컨트랙트는 주어진 서명이 발신자의 개인키에 의해 올바르게 서명되었는지 검증합니다. 카이아는 기본적으로 다중 서명을 지원하므로 여러 개의 서명이 있을 수 있다는 점에 유의하세요. 서명은 65바이트 길이여야 합니다.

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

| Hardfork     | New items                                              | Changes                                                                                                                                                                                                                                           |
| ------------ | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cancun EVM   | kzg (0x0a) precompiled contract     |                                                                                                                                                                                                                                                   |
| Kore         |                                                        | modExp (0x05) precompiled contract use new gas <br/>calculation logic. Computation cost also affected. <br/>Become more accurate.                                              |
| Istanbul EVM | blake2f (0x09) precompiled contract | kaia precompiled contract addresses has been moved <br/>from 0x09,0x0A,0x0B to 0x3FD,0x3FE,0x3FF.<br/>see the below [precompiled contract address change table](#precompiled-contract-address-change) for detail. |

### Precompiled contract address change <a id="precompiled-contract-address-change"></a>

| Precompiled Contract | address **BEFORE** istanbul EVM hardfork | address **AFTER** istanbul EVM hardfork |
| :------------------- | :--------------------------------------- | :-------------------------------------- |
| vmLog                | 0x09                                     | 0x3fd                                   |
| feePayer             | 0x0a                                     | 0x3fe                                   |
| 유효성 검사 발신자           | 0x0b                                     | 0x3ff                                   |
