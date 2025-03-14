# 세마포어 시작하기

[세마포어](https://github.com/semaphore-protocol/semaphore/tree/main)는 영지식 증명을 사용하여 사용자가 탈중앙화 애플리케이션에 익명으로 참여할 수 있도록 합니다. 이 디앱에서 Semaphore는 사용자가 자신의 신원을 밝히지 않고도 설문조사 응답을 제출할 수 있도록 보장합니다.

**세마포어 기능**:

- _익명성_: 사용자는 개인 정보를 노출하지 않고 답변을 제출할 수 있습니다.
- _검증_: 응답은 개인과 연결하지 않고 유효성을 검사합니다.
- _스팸 방지_: 중복 제출을 방지합니다.

## 스마트 컨트랙트 개발 환경 설정 <a id="set-up-smart-contract-env"></a>

하드햇을 사용하려면 개발 환경을 설정하고 하드햇을 설치해야 합니다. 다음 단계에 따라 이 작업을 수행해 보겠습니다:

프로젝트의 루트 폴더로 이동한 다음 다음 명령을 실행하여 새 하드햇 프로젝트를 만듭니다.

```bash
mkdir contract
cd contract
npm install --save-dev hardhat
```

아래 명령을 실행하여 샘플 프로젝트를 부트스트랩합니다:

```bash
npx hardhat init 
```

이 가이드에서는 타입스크립트 프로젝트를 선택하게 됩니다.

:::note
프로젝트를 초기화하는 동안 하드햇-툴박스 플러그인을 설치하라는 메시지가 표시됩니다. 이 플러그인에는 일반적으로 사용되는 모든 패키지와 하드햇으로 개발을 시작하는 데 권장되는 하드햇 플러그인이 번들로 포함되어 있습니다.
:::

다음으로, 다음 명령어로 Semaphore 솔리디티 컨트랙트의 경우 `@semaphore-protocol/contracts`, `OpenZeppelin 컨트랙트` 및 `hardhat-deploy`를 설치합니다:

```bash
npm install --save-dev @semaphore-protocol/contracts @openzeppelin/contracts hardhat-deploy
```

그런 다음 다음 구성으로 `hardhat.config.ts`를 수정하려고 합니다:

```javascript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    kaia: {
      url: "https://public-en.node.kaia.io",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [
            "0x7eff112dab68890a60c89d69c2ce1ebb115172f6760508ce6c8ea8fe8afe1e20",
            "0xc696ccd259792f2ffb87e0012e4a37ae3526a3224686225af679e3aaa2aeab0d",
          ],
    },
    kairos: {
      url: "https://public-en-kairos.node.kaia.io",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [
            "0x7eff112dab68890a60c89d69c2ce1ebb115172f6760508ce6c8ea8fe8afe1e20",
            "0xc696ccd259792f2ffb87e0012e4a37ae3526a3224686225af679e3aaa2aeab0d",
          ],
    },
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
```

이제 개발 환경이 모두 준비되었으니, 설문조사 스마트 컨트랙트를 작성해 보겠습니다.