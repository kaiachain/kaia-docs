# Precompiled Contracts

Klaytn provides several useful precompiled contracts, none of which are state-changing.
These contracts are implemented in the platform itself as a native implementation, which means they are part of the Klaytn client specifications.
The precompiled contracts from address 0x01 through 0x0A are the same as those in Ethereum.
The utility of precompiles falls into four major categories:
. Elliptic curve digital signature recovery.
. Hash Methods
. Memory copying
. Methods to enable elliptic curve maths for zk proofs.
Klaytn additionally implements precompiled contracts from 0x3FD through 0x3FF to support new Klaytn features.

:::note

Contracts deployed before the istanbul EVM hardfork should use the original addresses.

- 사례 1) 블록 번호 `#75373310`의 Baobab에 배포된 컨트랙트는 0x09, 0x0a, 0x0b를 각각 vmLog, feePayer, validateSender의 주소로 인식하며, blake2f는 사용할 수 없습니다.
- 사례 2) 블록 번호 `#75373314`의 Baobab에 배포된 컨트랙트는 0x09를 blake2f의 주소로 인식하고 0x3fd, 0x3fe, 0xff를 vmLog, feePayer, validateSender의 주소로 인식합니다.

Precompiled contracts related hardfork changes can be found at the bottom of this page. Go to [Hardfork Changes](#hardfork-changes).

:::

## 주소 0x01: ecrecover\(hash, v, r, s\) <a id="address-0x-01-ecrecover-hash-v-r-s"></a>

0x01 주소는 ecrecover를 구현합니다. 이 함수는 ECDSA의 복구 함수를 계산하여 주어진 서명에서 주소를 반환합니다. It is the only precompile that comes with a solidity wrapper. 함수 프로토타입은 다음과 같습니다:

```text
function ecRecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public view returns (address) {
        address r = ecrecover(hash, v, r, s); // prototype function 
        require(r != address(0), "signature is invalid");
} // solidity wrapper
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
	    mstore(0, numberToHash) // store number in the zeroth memory word

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

## 주소 0x3fd: vmLog\(str\) <a id="address-0x-3fc-vmlog-str"></a>

0x3FD 주소는 지정된 문자열 `str`을 특정 파일에 인쇄하거나 로거 모듈에 전달합니다. For more information, see [debug_setVMLogTarget](../../../references/json-rpc/debug/set-vm-log-target). 이 사전 컴파일된 컨트랙트는 디버깅 목적으로만 사용해야 하며, 클레이튼 노드가 시작될 때 `--vmlog` 옵션을 활성화해야 한다는 점에 유의하세요. 또한, Klaytn 노드의 로그 레벨이 4 이상이어야 vmLog의 출력을 볼 수 있습니다. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

```text
function callVmLog(bytes memory str) public {
    address(0x3fd).call(str);
}
```

## 주소 0x3fe: feePayer\(\) <a id="address-0x-3fd-feepayer"></a>

0x3FE 주소는 실행 중인 트랜잭션의 수수료 납부자를 반환합니다. This precompiled contract is not supported by the Solidity compiler. The following code can be used to call this precompiled contract.

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

0x3FF 주소는 메시지로 발신자의 서명을 검증합니다. Klaytn은 [주소에서 키 쌍을 분리](../accounts.md#decoupling-key-pairs-from-addresses)하기 때문에, 서명이 해당 발신자가 제대로 서명했는지 검증해야 합니다. 이를 위해 이 사전 컴파일된 컨트랙트는 세 가지 매개변수를 받습니다:

- 공개키를 받기 위한 발신자 주소
- 서명을 생성하는 데 사용되는 메시지 해시
- 발신자의 개인 키가 주어진 메시지 해시를 사용하여 서명한 서명

미리 컴파일된 컨트랙트는 주어진 서명이 발신자의 개인키에 의해 올바르게 서명되었는지 검증합니다. 클레이튼은 기본적으로 다중 서명을 지원하므로 여러 개의 서명이 있을 수 있다는 점에 유의하세요. 서명은 65바이트 길이여야 합니다.

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

| Hardfork     | New items                                              | Changes                                                                                                                                                                                                                                             |
| ------------ | :----------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cancun EVM   | kzg (0x0a) precompiled contract     |                                                                                                                                                                                                                                                     |
| Kore         |                                                        | modExp (0x05) precompiled contract use new gas <br/>calculation logic. Computation cost also affected. <br/>Become more accurate.                                                |
| Istanbul EVM | blake2f (0x09) precompiled contract | klaytn precompiled contract addresses has been moved <br/>from 0x09,0x0A,0x0B to 0x3FD,0x3FE,0x3FF.<br/>see the below [precompiled contract address change table](#precompiled-contract-address-change) for detail. |

### Precompiled contract address change <a id="precompiled-contract-address-change"></a>

| Precompiled Contract | address **BEFORE** istanbul EVM hardfork | address **AFTER** istanbul EVM hardfork |
| :------------------- | :--------------------------------------- | :-------------------------------------- |
| vmLog                | 0x09                                     | 0x3fd                                   |
| feePayer             | 0x0a                                     | 0x3fe                                   |
| 유효성 검사 발신자           | 0x0b                                     | 0x3ff                                   |
