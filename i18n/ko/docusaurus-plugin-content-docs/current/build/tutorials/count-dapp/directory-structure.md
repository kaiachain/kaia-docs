# 디렉터리 구조

```
|-- contracts
|-- migrations
|-- truffle-config.js
|-- static  
|-- src  
    |-- styles
    |-- klaytn
      |-- caver.js
    |-- components
      |-- BlockNumber.js
      |-- Auth.js
      |-- Count.js
    |-- index.js
    |-- App.js
    |-- routes.js
```

`contracts/`: Solidity 컨트랙트 파일을 포함합니다.

`migrations/`: 스마트 컨트랙트 배포를 처리하는 JavaScript 파일을 포함합니다.

`truffle.js`: Truffle 구성을 포함합니다.

`static/`: 이미지 및 글꼴과 같은 정적 파일을 포함합니다.

`src/styles`: 스타일시트와 관련된 전반적인 스타일 정의입니다.

`src/index.js`: 앱의 인덱스 파일. ReactDOM.render 로직이 여기에 있습니다.

`src/App.js`: 앱의 루트 컴포넌트 파일.

`src/routes.js`: 경로 정의를 포함합니다.

`src/components`: 페이지를 구성하는 컴포넌트 파일을 포함합니다.

- `src/components/BlockNumber.js`: 현재 블록 번호를 표시합니다.

- `src/components/Auth.js`: 개인 키 또는 비밀번호가 포함된 키 저장소를 사용하여 사용자 로그인을 처리합니다.

- `src/components/Count.js`: 배포된 Count 컨트랙트와의 상호작용을 처리합니다. caver.js를 사용하여 컨트랙트 함수를 호출합니다.

`src/klaytn`: 카이아와의 상호작용을 지원하는 파일들이 들어 있습니다.

- `src/klaytn/caver.js`: 설정된 설정 내에서 caver-js를 인스턴스화합니다. (참조) caver-js는 카이아 노드에 연결하고, 카이아에 배포된 노드 및 스마트 컨트랙트와 상호작용하는 RPC 호출 라이브러리입니다.
