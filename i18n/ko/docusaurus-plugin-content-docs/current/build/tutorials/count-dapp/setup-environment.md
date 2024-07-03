# 환경 설정

> 이 튜토리얼에서는 환경 설정 시 [첫 페이지](klaystagram.md#testing-environment)에 명시된 버전을 따라야 합니다. caver-js.\*\*를 다운로드하기 전에 nvm을 사용하여 노드 버전을 10.16.0으로 변경하시기 바랍니다.

## 1. Node.js npm <a id="1-install-node-js-npm"></a>을 설치합니다.

- 공식 사이트에서 Node.js를 다운로드합니다: [https://nodejs.org/](https://nodejs.org/)
- 다운로드 파일을 클릭하여 패키지를 설치합니다.
- 터미널에 `$ node --version`을 입력하여 `node`가 정상적으로 설치되었는지 확인합니다.
  ```
    v10.16.0
  ```

⚠ 이 글을 작성하는 시점에 `caver-js`와 호환되는 최신 LTS 버전은 10.16.0입니다. 노드 버전이 상위 버전인 경우 `caver-js`를 설치할 수 없습니다. 노드를 재설치하거나 [NVM (노드 버전 관리자)](https://github.com/nvm-sh/nvm)를 사용하여 안정적인 환경을 설정하세요.

## 2. Truffle 설치하기 <a id="2-install-truffle"></a>

Truffle은 컨트랙트 파일을 컴파일하고 배포하기 위한 훌륭한 도구입니다.

> **Truffle을 사용하는 경우에만 노드 버전을 12.0.0으로 설정하려면 `nvm`을 사용하세요.**

- `$ nvm install 12.0.0` 입력
- `$ nvm 사용 12.0.0` 입력
- 터미널에 `$ sudo npm install -g truffle`을 입력하여 Truffle을 설치
- 터미널에 `$ truffle version`을 입력하여 `truffle`이 성공적으로 설치되었는지 확인
- (**Truffle을 사용하여 스마트 컨트랙트 배포**)
- `nvm use 10.16.0`을 입력하면 Truffle 사용 후 노드 v10.16.0으로 돌아옵니다.

⚠ If the version is lower than 5, install the truffle version 5.\
⚠ 버전이 5보다 낮으면 Truffle 버전 5를 설치하세요.\
`$ sudo npm install -g truffle@5`\
⚠ 버전이 5보다 낮으면 Truffle 버전 5를 설치하세요.\
`$ sudo npm install -g truffle@5`
