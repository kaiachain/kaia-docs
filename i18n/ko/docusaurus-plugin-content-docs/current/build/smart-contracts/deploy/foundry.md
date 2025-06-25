# Foundry로 스마트 컨트랙트 배포하기

![](/img/banners/kaia-foundry.png)

## 소개

Foundry는 개발자가 Solidity 스크립트를 통해 명령줄에서 컨트랙트를 관리 및 컴파일하고, 테스트를 실행하고, 컨트랙트를 배포하고, 네트워크와 상호작용할 수 있도록 지원하는 Rust로 작성된 스마트 컨트랙트 개발 프레임워크입니다.

Foundry는 빠르고 모듈화된 스마트 컨트랙트 개발을 가능하게 하는 네 가지 주요 CLI 도구로 구성되어 있습니다:

- [Forge](https://github.com/foundry-rs/foundry/tree/master/forge):  Forge를 사용하여 스마트 컨트랙트를 배포, 테스트 및 컴파일할 수 있습니다.
- [Cast](https://github.com/foundry-rs/foundry/tree/master/cast): 캐스트는 EVM 스마트 컨트랙트와의 상호작용을 간단하게 만들어줍니다. 여기에는 체인 데이터 가져오기, 트랜잭션 전송 등이 포함됩니다.
- [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil): 로컬 노드를 스핀업해야 하나요? Anvil은 Foundry에서 제공하는 로컬 노드 환경입니다.
- [Chisel](https://github.com/foundry-rs/foundry/blob/master/chisel): 빠르고 유용하며 자세한 Solidity REPL.

이 가이드에서는 다음을 수행합니다:

- 간단한 Foundry 프로젝트를 생성합니다.
- Foundry를 사용하여 스마트 컨트랙트 샘플을 컴파일하고 테스트합니다.
- Foundry를 사용하여 스마트 컨트랙트를 카이아 Kairos 네트워크에 배포합니다.
- Cast와 Anvil로 메인넷 포크 살펴보기.

## 사전 요구 사항

이 튜토리얼을 따르기 위한 전제 조건은 다음과 같습니다:

- Code editor: a source-code editor such [VS Code](https://code.visualstudio.com/download).
- [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask): used to deploy the contracts, sign transactions and interact with the contracts.
- RPC Endpoint: you can get this from one of the supported [endpoint providers](../../../references/public-en.md).
- Test KAIA from [Faucet](https://faucet.kaia.io): fund your account with sufficient KAIA.
- [Rust](https://www.rust-lang.org/tools/install) 및 [Foundry](https://github.com/foundry-rs/foundry#installation)를 설치합니다.

## 개발 환경 설정하기

Foundry 설치가 성공적으로 완료되었는지 확인하려면 아래 명령을 실행하세요:

```bash
forge -V
```

**출력**

![](/img/build/get-started/forge-version.png)

Foundry를 성공적으로 설치했으면 이제 Foundry에서 사용할 수 있는 CLI 도구(forge, cast, anvil, chisel)에 액세스할 수 있습니다. 다음 단계에 따라 Foundry 프로젝트를 설정해 보겠습니다:

**1단계**: 새 프로젝트를 시작하려면 아래 명령을 실행합니다:

```bash
forge init foundry_example 
```

**2단계**: 프로젝트 폴더로 이동합니다.

```bash
cd foundry_example 
```

Foundry 프로젝트를 초기화한 후, 현재 디렉터리에 다음이 포함되어야 합니다:

- **src**: 스마트 컨트랙트의 기본 디렉터리입니다.
- **tests**: 테스트를 위한 기본 디렉터리.
- **foundry.toml**: 기본 프로젝트 구성 파일.
- **lib**: 프로젝트 종속성을 위한 기본 디렉터리.
- **script**: Solidity 스크립팅 파일의 기본 디렉터리.

## foundry.toml 구성

이제 프로젝트가 설정되었으므로 '.env' 파일을 만들고 변수를 추가해야 합니다. Foundry는 프로젝트 디렉터리에 있는 .env 파일에 자동으로 로드됩니다.

.env 파일은 이 형식을 따라야 합니다:

```bash
카이로스_RPC_URL=PAST_RPC_URL
```

다음은 `foundry.toml` 파일을 편집하는 것입니다. 프로젝트의 루트에는 스캐폴드 뒤에 이미 하나가 있어야 합니다.

파일 끝에 다음 줄을 추가합니다:

```bash
[rpc_endpoints]
카이로스 = "${KAIROS_RPC_URL}"
```

이렇게 하면 카이아 카이로스 테스트넷을 위한 [RPC 별칭](https://book.getfoundry.sh/cheatcodes/rpc.html)이 생성됩니다.

## 계정 가져오기

이 가이드에서는 메타마스크에 이미 존재하는 개발자 계정을 가져와서 `--계정` 옵션을 통해 `--문서 위조`, `--문서 전송` 또는 기타 개인 키가 필요한 메서드에서 액세스할 수 있도록 합니다.

아래 명령을 실행하여 기존 지갑을 가져오세요:

```bash
캐스트 월렛 가져오기 -대화형 oxpampam-dev-i
```

```bash
개인 키를 입력합니다:
비밀번호를 입력합니다:
```

![](/img/build/get-started/cast-wallet-import.png)

## Sample smart contract

In this section, we will be using the sample counter contract in the initialized foundry project. The `counter.sol` file in the `src/` folder should look like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Counter {
    uint256 public number;
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
}
```

**Code Walkthrough**

This is your smart contract. **Line 1** shows it uses the Solidity version 0.8.13 or greater. From **lines 4-12**, a smart contract `Counter` is created. This contract simply stores a new number using the **setNumber** function and increments it by calling the **increment** function.

## Testing smart contract

Foundry allows us to write tests in solidity as opposed to writing tests in javascript in other smart contract development frameworks. In our initialized foundry project, the `test/Counter.t.sol` is an example of a test written in solidity. The code looks like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Counter.sol";
contract CounterTest is Test {
    Counter public counter;
    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }
    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

The code above shows you imported forge standard library and Counter.sol.

The tests above check the following:

- Is the number increasing?
- Is the number equal to the set number?

To check if your test works fine, run the following command:

```bash
forge test
```

**Output**

![](/img/build/get-started/forge-test.png)

To learn more about writing tests, advanced testing, and other features, refer to [Foundry's documentation](https://book.getfoundry.sh/forge/tests).

## Compiling your contracts

Compile your contract with this command:

```bash
forge build 
```

## Deploying your contracts

To deploy a contract using foundry, you must provide an RPC URL and a private key of the account that will deploy the contract. Take a look at the list of [rpc-providers](../../../references/public-en.md) on Kaia to find your rpc-url, and create an account using [MetaMask](../../tutorials/connecting-metamask.mdx#install-metamask).

이 가이드에서는 파운드리에서 제공하는 두 가지 계약 배포 방법을 사용합니다:

### Forge Create 사용

**1단계**: 위조 생성을 사용하여 카이아 카이로스 네트워크에 컨트랙트를 배포하려면 아래 명령을 실행하세요:

```bash
# .env 파일에 변수를 로드하려면
source .env

# 컨트랙트를 배포하려면
forge create --rpc-url $KAIROS_RPC_URL src/Counter.sol:Counter --broadcast --account oxpampam-dev-i 
```

```bash
키스토어 비밀번호를 입력합니다: <KEYSTORE_PASSWORD>
```

:::note
개발 환경에서 기본적인 테스트넷 사용을 넘어서는 배포의 경우, 보안 강화를 위해 [하드웨어 지갑 또는 비밀번호로 보호되는 키 저장소](https://book.getfoundry.sh/guides/best-practices.html#private-key-management)를 사용하는 것이 좋습니다.
:::

![](/img/build/get-started/forge-create-deploy.png)

**2단계**: 카이아스캔을 열어 카운터 컨트랙트가 성공적으로 배포되었는지 확인합니다.

**Step 3**: Copy and paste the transaction hash in the search field and press Enter. You should see the recently deployed contract.

![](/img/build/get-started/kaiascan-deploy.png)

### 포지 스크립트 사용

위조 스크립트를 사용하여 카이아 카이로스 네트워크에 컨트랙트를 배포하려면 아래 명령을 실행하세요:

```bash
# .env 파일에 변수를 로드하려면
source .env

# 컨트랙트를 배포하려면
forge script --chain 1001 script/Counter.s.sol:CounterScript --rpc-url $KAIROS_RPC_URL --broadcast -vvvv --account oxpampam-dev-i
```

![](/img/build/get-started/forge-script-deploy.png)

## Interacting with the contract

스마트 컨트랙트를 성공적으로 배포한 다음 단계는 일반적으로 함수를 호출하고 실행하여 스마트 컨트랙트와 상호 작용하는 것입니다. 캐스트](https://book.getfoundry.sh/reference/cast/cast-send.html)를 사용하여 카이아 카이로스 네트워크에 배포된 컨트랙트와 바로 상호작용해 보겠습니다.

In this section, you will learn how to use the [cast call](https://book.getfoundry.sh/reference/cast/cast-call) to execute the `read-only` function and [cast send](https://book.getfoundry.sh/reference/cast/cast-send) to execute `write` functions.

**A. 캐스트 콜**

컨트랙트에 저장된 번호를 가져오려면 `number` 함수를 호출합니다. Run the command below to see this in action.

```bash
cast call YOUR_CONTRACT_ADDRESS "number()" --rpc-url $KAIROS_RPC_URL
```

**Example**

```bash
cast call 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "number()" --rpc-url $KAIROS_RPC_URL
```

**Output**

![](/img/build/get-started/cast-call-number.png)

You should get this data in hexadecimal format:

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```

그러나 원하는 결과를 얻으려면 `cast`를 사용하여 위의 결과를 변환하세요. In this case, the data is a number, so you can convert it into base 10 to get the result 0:

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```

**Output**

![](/img/build/get-started/cast-call-0.png)

**B. 캐스트 보내기**

To sign and publish a transaction such as executing a `setNumber` function in the counter contract, run the command below:

```bash
cast send --rpc-url=$KAIROS_RPC_URL <CONTRACT-ADDRESS> "setNumber(uint256)" arg --account <ACCOUNT NAME>
```

**Example**

```bash
cast send --rpc-url=$KAIROS_RPC_URL 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "setNumber(uint256)"  10 --account oxpampam-dev-i
```

**출력**

![](/img/build/get-started/cast-send-setNum.png)

**Crosscheck Number**

```bash
cast call 0xb00760a445f47F79ea898bCe7F88cD4930060Ca5 "number()" --rpc-url $KAIROS_RPC_URL
```

**Output**

![](/img/build/get-started/cast-call-10.png)

You should get this data in hexadecimal format:

```bash
0x000000000000000000000000000000000000000000000000000000000000000a
```

However to get your desired result, use cast to convert the above result. In this case, the data is a number, so you can convert it into base 10 to get the result 10:

```bash
cast --to-base 0x000000000000000000000000000000000000000000000000000000000000000a 10
```

**Output**

![](/img/build/get-started/cast-call-result-10.png)

## Forking Mainnet with Cast and Anvil

Foundry allows us to fork the mainnet to a local development network ([Anvil](https://book.getfoundry.sh/reference/anvil/)). Also, you can interact and test with contracts on a real network using [Cast](https://book.getfoundry.sh/reference/cast/).

### Getting Started

Now that you have your Foundry project up and running, you can fork the mainnet by running the command below:

```bash
anvil --fork-url rpc-url
```

**Example**

```bash
anvil --fork-url https://archive-en.node.kaia.io
```

**Output**

![](/img/build/get-started/anvil-localnode.png)

After successfully running this command, your terminal looks like the above image. You'll have 10 accounts created with their public and private keys as well 10,000 prefunded tokens. The forked chain's RPC server is listening at `127.0.0.1:8545`.

To verify you have forked the network, you can query the latest block number:

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

You can convert the result from the task above using [hex to decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html). You should get the latest block number from the time you forked the network. To verify this, cross-reference the block number on [Kaiascope](https://kaiascope.com/block/118704896?tabId=txList).

### Illustration

이 섹션에서는 USDT를 보유한 사람으로부터 모루가 생성한 계정(0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob)으로 USDT 토큰을 이체하는 방법을 알아보세요.

**Transferring USDT**

카이아스캔으로 이동하여 USDT 토큰 보유자를 검색합니다([여기](https://kaiascan.io/token/0xd077a400968890eacc75cdc901f0356c943e4fdb?tabId=tokenHolder&page=1)). Let's pick a random account. 이 예제에서는 `0xb3ff853a137bfe10f3d8965a29013455e1619303`을 사용합니다.

Let's export our contracts and accounts as environment variables:

```bash
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export USDT=0xd077a400968890eacc75cdc901f0356c943e4fdb
export USDTHolder=0xb3ff853a137bfe10f3d8965a29013455e1619303
```

캐스트 통화로 밥의 USDT 잔액을 확인하세요:

```bash
cast call $USDT "balanceOf(주소)(uint256)" $BOB
```

**Output**

![](/img/build/get-started/call-usdt-bob.png)

마찬가지로 캐스트 콜을 사용하여 USDTHolder의 USDT 잔액을 확인할 수도 있습니다:

```bash
cast call $USDT "balanceOf(주소)(uint256)" $USDTHolder
```

**Output**

![](/img/build/get-started/call-usdt-holder.png)

캐스트 전송을 사용하여 USDTHolder에서 Bob에게 토큰을 전송해 보겠습니다:

```bash
# impersonate USDTHolder
cast rpc anvil_impersonateAccount $USDTHolder    

# transfer USDT
cast send $USDT --unlocked --from $USDTHolder "transfer(address,uint256)(bool)" $BOB 1000000
```

**Output**

![](/img/build/get-started/cast-send-usdt.png)

Let's check that the transfer worked:

```bash
cast call $USDT "balanceOf(주소)(uint256)" $BOB
```

**Output**

![](/img/build/get-started/call-usdt-bob-after.png)

```bash
cast call $USDT "balanceOf(주소)(uint256)" $USDTHolder
```

**Output**

![](/img/build/get-started/call-usdtholder-after.png)

## 문제 해결

### 가스 추정 오류

포지 스크립트로 배포할 때 이 오류가 발생할 수 있습니다:

```bash
# 트랜잭션 실패
❌ [실패] 해시: 0xa0de3dac1dae4d86f2ba8344bc5f7d816714a6abdc4555ae46ca21d126f78caf
오류입니다: 트랜잭션 실패: 0xa0de3dac1dae4d86f2ba8344bc5f7d816714a6abdc4555ae46ca21d126f78caf

# 탐색기의 트랜잭션 오류 코드
오류입니다: 컨트랙트 생성 코드 저장 공간이 부족합니다.
```

![](/img/build/get-started/gas-estimation-err.png)

이는 일반적으로 배포 중 부정확한 가스 추정으로 인해 발생합니다. 파운드리의 기본 가스 추정 알고리즘(기본 130% 승수 사용)은 때때로 카이아 네트워크에서 부족하여 배포가 완료되기 전에 가스가 부족해지기도 합니다.

실제 필요한 가스가 예상량을 초과하면 컨트랙트 배포 중에 트랜잭션에 가스가 부족하여 _컨트랙트 생성 코드 저장소 가스 부족_ 오류가 발생합니다.

**빠른 수정: 가스 승수 수동 설정**

가스 예상 승수를 200 이상으로 늘려서 스크립트를 다음과 같이 실행하세요:

```bash
# 명령
forge script script/YourContract.s.sol:YourScript \
  --chain <chain-id> \
  --rpc-url $RPC_URL \
  --broadcast \
  --gas-estimate-multiplier 200 \
  --account your-account \
  -vvvv
```

```bash
# 예시 

forge 스크립트 --체인 1001 스크립트/NFT.s.sol:NFTScript --rpc-url $KAIROS_RPC_URL --broadcast --gas-estimate-multiplier 200 -vvvv --account oxpampam-dev-i
```

:::note
'--가스 추정치-승수' 플래그는 모든 가스 추정치에 곱할 상대적인 비율을 설정합니다. 200으로 설정하면 가스 추정치를 두 배로 늘려 계약 배포를 성공적으로 완료할 수 있는 충분한 여유 공간을 확보할 수 있습니다.
:::

![](/img/build/get-started/gas-estimation-fixed.png)

## 결론

이 가이드의 끝까지 읽으셨다면 축하드립니다. 궁금한 점이 있으면 [카이아 포럼](https://devforum.kaia.io/)을 방문하세요. 하지만 아래는 Kaia에서 Foundry를 사용하여 빌드하는 데 필요한 유용한 리소스 목록입니다.

- [파운드리 문서](https://book.getfoundry.sh/)
- [사이프린 파운드리 기초](https://updraft.cyfrin.io/courses/foundry)
- [사이프린 고급 파운드리](https://updraft.cyfrin.io/courses/advanced-foundry)

