# 설치에 앞서

## 다운로드 <a id="download"></a>하기

다운로드 페이지](../../downloads/downloads.md)에서 CN 및 PN용 패키지를 받으실 수 있습니다.

## 설치에 앞서 <a id="before-you-install"></a>

카이아 패키지를 설치에 앞서에 노드 URI를 등록하기 위해 관련 노드 정보를 생성해야 합니다. Kgen 패키지는 CC 운영자를 위해 제공되며, 아래 순서대로 단계를 따라주세요.

1. `kgen` 패키지 다운로드
2. 노드 키 및 노드 URI 생성
3. 노드 URI 등록

### 'kgen' 패키지 다운로드 <a id="download-kgen-package"></a>

우선, [다운로드](../../downloads/downloads.md) 페이지에서 운영체제에 따라 최신 버전의 `kgen` 패키지를 다운로드할 수 있습니다.

`bin` 디렉터리에서 `kgen` 바이너리 파일을 찾을 수 있습니다.

### 노드 키 및 노드 URI 생성 <a id="node-key-node-uri-creation"></a>

노드 키와 노드 URI는 처음에 한 번만 생성됩니다. 노드 URI는 코어 셀 네트워크의 다른 코어 셀과 공유해야 합니다. CN은 생성된 노드 URI를 사용하여 다른 CN에 연결하고, PN은 CN 및 일부 PN에 연결합니다. 노드 URI는 다운로드한 `kgen`을 사용하여 노드 키를 기반으로 생성합니다. 아래 명령줄은 `nodekey`와 `node_info.json`을 생성합니다.

`kgen`은 다음과 같이 연결된 IP 및 포트 번호를 사용합니다.

```text
$ kgen --ip "123.456.789.012" --port 32323 --file
$ ls
nodekey node_info.json
```

`nodekey`는 노드 내부에서 사용되는 개인키인 64바이트 16진수 문자열입니다. 이 개인키를 분실하지 않도록 주의해야 하며, 카이아 데이터 디렉터리에 존재해야 합니다.

```text
$ cat nodekey
f08f2118c455a6c9c9b5e035d3571e570a719ea61771e268546e796a264acc2b
$ mv nodekey ~/kcnd_home
```

생성된 파일 `node_info.json`에는 다음과 같은 내용이 포함되어 있습니다.

| 키 이름        | 설명                                | 예제                                                                                                                                                                                                                                                                   |
| :---------- | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NodeAddress | 연결된 노드의 주소                        | 0xc8a23d67f2471066fa1b07270651fea7e5c0cf78                                                                                                                                                                                                                           |
| NodeKey     | 노드 키 (일명 개인 키) | aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a                                                                                                                                                                                                     |
| NodeURI     | 노드 URI                            | kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0 |

`node_info.json`은 다음과 같이 JSON 형식의 노드 정보를 포함합니다.

```text
$ cat node_info.json
{
    "NodeAddress": "0xc8a23d67f2471066fa1b07270651fea7e5c0cf78",
    "NodeKey": "aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a",
    "NodeURI": "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0"
}
```

### 노드 URI 등록 <a id="node-uri-enrollment"></a>

생성된 노드 URI는 코어 셀 네트워크 (CCN)에 참여하기 위해 등록되어야 합니다. 등록 절차는 다음과 같습니다.

1. 연관된 IP 및 포트 번호가 포함된 `kgen` (`node_info.json`)을 사용하여 노드 URI를 생성합니다.
2. 해당 정보를 카이아 공식 이메일 주소 (메인넷의 경우 `bootstrap@klaytn.com`, Kairos의 경우 `baobab@klaytn.com`)로 전송합니다.

등록한 정보는 카이아 공식 이메일 주소로 보내야 합니다. 형식은 다음과 같습니다.

CN의 경우,

```text
Company: Kakao
CN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

PN의 경우,

```text
Company: Kakao
PN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```
