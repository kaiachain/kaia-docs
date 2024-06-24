# 엔드포인트 노드

## 대상 독자 <a id="intended-audience"></a>

- [Kaia API](../../references/json-rpc/klay/account-created)를 사용하여 트랜잭션을 전송하거나 Kaia 네트워크의 상태를 조회하려는 사람은 누구나 엔드포인트 노드를 통해 이를 수행해야 합니다.
- 엔드포인트 노드는 카이아 네트워크의 인터페이스입니다.

## 엔드포인트 노드 개요 <a id="endpoint-node-overview"></a>

엔드포인트 노드에는 다음과 같은 역할과 기능이 있습니다.

- 블록체인 데이터를 동기화합니다.
- 새로 받은 블록의 유효성을 검사합니다.
- 쿼리 요청을 처리합니다.
- 트랜잭션 요청을 프록시 노드로 전송합니다.

엔드포인트 노드 설치 바이너리는 다음과 같은 인터페이스 및 유틸리티와 함께 제공됩니다.

- JSON-RPC API: JSON-RPC 서버는 노드 내부에서 실행되며, 블록체인 애플리케이션 개발을 위한 [API](../../references/json-rpc/klay/account-created)를 노출합니다. 여러 노드 관리 API도 있습니다.
- 명령줄 인터페이스: 계정 관리 및 노드 구성 기능을 제공합니다. 노드에 연결된 대화형 JavaScript 콘솔도 제공됩니다. JavaScript 콘솔은 대부분의 [caver-js API](../../references/sdk/caver-js/caver-js.md)를 구현합니다.
