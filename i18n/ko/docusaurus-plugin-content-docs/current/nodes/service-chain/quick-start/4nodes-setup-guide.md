# 4노드 서비스 체인 설치

이 섹션에서는 멀티노드 서비스체인을 설정하는 방법을 다룹니다. 아래 그림의 파란색 테두리 상자에서 볼 수 있듯이 chainID 1002로 4-컨센서스 노드 서비스체인을 설정하겠습니다.

![](/img/nodes/sc-4scn-arch.png)

## 전제 조건 <a id="prerequisites"></a>

- [다운로드 페이지](../../downloads/downloads.md)에서 `kscn`, `homi` 바이너리용 패키지를 다운로드합니다.
- Linux 또는 MacOS 서버 4대
- 최소 하드웨어 요구사항
  - CPU: 4-core (Intel Xeon or equivalent), RAM: 16GB, HDD: 50GB
  - 자세한 설명은 [시스템 요구사항](../system-requirements.md)을 참조하세요.

## 0단계: 모든 노드에 SCN 설치 <a id="install-scn"></a>

설치는 다운로드한 패키지의 압축을 푸는 것입니다. 각 서버에서 SCN 아카이브를 추출합니다.

```console
$ tar xvf kscn-vX.X.X-XXXXX-amd64.tar.gz
x kscn-XXXXX-amd64/
x kscn-XXXXX-amd64/conf/
x kscn-XXXXX-amd64/conf/kscnd.conf
x kscn-XXXXX-amd64/bin/
x kscn-XXXXX-amd64/bin/kscnd
x kscn-XXXXX-amd64/bin/kscn
```

편의를 위해 $PATH에 바이너리 경로를 추가하겠습니다. 노드의 실제 경로를 사용하세요.

```console
$ export PATH=$PATH:~/path/to/kscn-XXXXX-amd64/bin
```

SCN은 RHEL, CentOS, Fedora와 같은 다양한 RPM 배포판도 제공합니다. 자세한 내용은 이 [설치](../install-service-chain.md#installation)를 참조하세요.

```console
$ curl -o /etc/yum.repos.d/kaia.repo https://packages.kaia.io/config/rhel/7/prod.repo
  % Total % Received % Xferd Average Speed Time Time Time Current Dload Upload Total Spent Left Speed
     100 118 100 118 0 0 1113 0 --:--:-- --:--:-- --:--:-- 1102 

$ yum list | grep kaia 
packages-klaytn-prod 31 kB/s | 2.9 kB 00:00 
homi.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kbnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kcnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kcnd-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kend.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kend-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kgen.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kpnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kpnd-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kscnd.x86_64          v1.8.0-0.el7      packages-klaytn-prod 
ksend.x86_64          v1.8.0-0.el7      packages-klaytn-prod 
kspnd.x86_64          v1.8.0-0.el7      packages-klaytn-prod 

$ yum install kscnd
```

## 1단계: genesis.json 파일 및 노드키 생성 <a id="step-1-create-genesis-json-and-a-key"></a>

필요한 파일을 생성하기 위해 homi 유틸리티를 사용합니다.
`homi`는 클레이튼 블록체인을 구성하는 데 필요한 스크립트, 설정 파일, 개인키를 자동으로 생성해주는 유틸리티입니다.
리눅스/맥 PC에서 homi를 실행할 수 있습니다.

먼저 다운로드한 homi 아카이브의 압축을 풉니다.

```console
$ tar xvf homi-vX.X.X-XXXXX-amd64.tar.gz
x homi-XXXXX-amd64/
x homi-XXXXX-amd64/bin/
x homi-XXXXX-amd64/bin/homi
```

`bin` 폴더로 이동하여 다음 옵션으로 `homi`를 실행하여 파일을 생성합니다.
`homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1002 --p2p-port 22323 -o homi-output` Kairos의 `chainID`는 1001이므로 편의상 이 예제에서 구성한 서비스체인의 `chainID`는 1002로 설정합니다. 실제 서비스를 런칭하여 블록체인을 운영할 때는 다른 서비스체인과 체인아이디가 겹치지 않도록 https://chainlist.defillama.com/ 에서 새로운 체인아이디 값을 등록한 후 사용하는 것을 권장합니다. 서비스체인 포트는 기본 포트인 22323으로 설정되어 있습니다.

```console
$ ./homi setup --gen-type local --cn-num 4 --test-num 1 --servicechain --chainID 1002 --p2p-port 22323 -o homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/keys/passwd2
Created :  homi-output/keys/passwd3
Created :  homi-output/keys/passwd4
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/keys/nodekey2
Created :  homi-output/keys/validator2
Created :  homi-output/keys/nodekey3
Created :  homi-output/keys/validator3
Created :  homi-output/keys/nodekey4
Created :  homi-output/keys/validator4
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/keys_test/testkey1
Created :  homi-output/keys_test/keystore1/0xdC7218621513f71d609653d22C39d79d558d9CDC
Created :  homi-output/Kaia.json
Created :  homi-output/Kaia_txpool.json
```

다음 단계에서는 출력 중 `nodekey*`, `genesis.json`, `static-nodes.json`을 사용하겠습니다.

## 2단계: static-nodes.json 사용자 지정 <a id="step-2-customize-static-nodes-json"></a>

텍스트 편집기에서 `homi-output/scripts/static-nodes.json`을 열고 IP 주소와 포트를 노드의 실제 값으로 업데이트합니다.
이 예제에서는 ServiceChain에 있는 각 SCN 노드의 IP가 아래 그림과 같다고 가정합니다. 여기서 할당하는 포트는 나중에 4단계에서 사용할 것이므로 기억해 두세요.

![](/img/nodes/sc-4scn-ip.png)

```json
[
     "kni://38693ad4b17ff77...23153@192.168.0.1:22323?discport=0\u0026ntype=cn",
     "kni://f36d969b16f7337...1329b@192.168.0.2:22323?discport=0\u0026ntype=cn",
     "kni://16e55d8921ab034...b2bec@192.168.0.3:22323?discport=0\u0026ntype=cn",
     "kni://0973e792a421c1d...bbd71@192.168.0.4:22323?discport=0\u0026ntype=cn"
]
```

`static-nodes.json`를 업데이트한 후 출력 폴더(`homi-output`)를 모든 SCN에 업로드합니다. 즉 이 예제에서는 SCN-L2-01, SCN-L2-02, SCN-L2-03, SCN-L2-04 노드에 업로드합니다.

```console
$ scp -r path/to/homi-output/ user@192.168.0.1:~/
$ scp -r path/to/homi-output/ user@192.168.0.2:~/
$ scp -r path/to/homi-output/ user@192.168.0.3:~/
$ scp -r path/to/homi-output/ user@192.168.0.4:~/
```

## 3단계: 노드 초기화 <a id="step-3-node-initialization"></a>

이제 제네시스 파일을 사용하여 각 노드를 초기화하겠습니다. 각 노드에서 다음 명령을 실행합니다.
홈 디렉터리에 체인 데이터와 로그를 저장하는 데이터 폴더가 생성됩니다.
데이터 폴더는 `--datadir` 지시어를 사용하여 변경할 수 있습니다.
이 예제에서는 데이터 폴더를 `\~/data`로 설정했습니다.

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json

$ ls ~/data
keystore	klay		kscn
```

## 4단계: `nodekey` 및 `static-nodes.json` 설치 <a id="step-4-install-nodekey"></a>

모든 SCN에서 `static-nodes.json`을 데이터 폴더에 복사합니다.

```console
$ cp ~/homi-output/scripts/static-nodes.json ~/data/
```

1단계에서 4개의 노드키를 생성했습니다.
각 노드 키를 SCN에 할당하고 일치하는 `nodekey`를 각 SCN의 데이터 폴더에 복사합니다.
예를 들어, SCN-L2-01(192.168.0.1) 노드에는 `nodekey1`을 사용하고, SCN-L2-02(192.168.0.2), SCN-L2-03(192.168.0.3), SCN-L2-04(192.168.0.4)에는 각각 `nodekey2`, `nodekey3`, `nodekey4`를 사용하세요.

```console
$ cp ~/homi-output/keys/nodekey{1..4} ~/data/klay/nodekey
```

![](/img/nodes/sc-4scn-nodekey.png)

## 5단계: 노드 구성 <a id="step-5-configure-nodes"></a>

모든 SCN에서 kscn 설치 폴더로 이동하여 `conf/kscnd.conf`를 다음과 같이 수정합니다. `PORT`는 `homi`를 설정할 때 사용하는 포트이며, `SC_SUB_BRIDGE`는 다음 섹션에서 브리지를 연결할 때 필요합니다. 지금은 0으로 설정합니다. `DATA_DIR`에 3단계에서 사용한 데이터 폴더를 입력합니다.

```
...
PORT=22323
...
SC_SUB_BRIDGE=0
...
DATA_DIR=~/data
...
```

## 6단계: 노드 시작 <a id="step-6-start-nodes"></a>

모든 SCN 노드에서 다음 명령을 실행합니다.

```console
$ kscnd start
Starting kscnd: OK
```

블록 생성 상태는 `klay.blockNumber`를 통해 확인할 수 있습니다. 이 숫자가 0이 아니라면 노드가 정상적으로 작동하고 있는 것입니다.

```console
$ kscn attach --datadir ~/data
> kaia.blockNumber
10
```

노드를 중지하려면 `kscnd stop` 명령을 사용하면 됩니다.

## (예시) 밸류 전송 트랜잭션 생성 및 확인 <a id="example-creation-and-confirmation-of-a-value-transfer-transaction"></a>

이제 4노드 서비스체인이 실행 중입니다. 서비스체인에서 밸류 전송 트랜잭션을 실행하여 설치를 확인하겠습니다.

![](/img/nodes/sc-4scn-test.png)

### 1단계: 테스트 계정 가져오기 <a id="step-1-import-the-test-account"></a>

`testkey1`은 1단계에서 `homi`에 의해 자동으로 생성되었습니다. `homi`가 생성한 `genesis.json`에 설명된 대로 테스트 계정에 KAIA가 할당됩니다.

```console
$ kscn account import --datadir ~/data ~/homi-output/keys_test/testkey1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {80119c31cdae67c42c8296929bb4f89b2a52cec4}
```

### 2단계: 계정 잠금 해제 <a id="step-2-unlock-the-account"></a>

계정 잠금 해제는 `testkey1`을 가져온 SCN 노드의 콘솔을 통해서만 가능합니다.

```console
$ kscn attach --datadir ~/data
> personal.unlockAccount("80119c31cdae67c42c8296929bb4f89b2a52cec4")
Unlock account 80119c31cdae67c42c8296929bb4f89b2a52cec4
Passphrase:
true
```

### 3단계: 트랜잭션 전송 및 잔액 확인 <a id="step-3-send-a-transaction-and-check-the-balance"></a>

```console
> kaia.sendTransaction({from: "80119c31cdae67c42c8296929bb4f89b2a52cec4", to: "305c6cc464d5fe1e624679695a20d641a01688e1", value: 10})
"0xa0e7102e8f14200cec8d964aacc1c9ed7c22271078b2b213170c64333cbca8a3"
> kaia.getBalance("305c6cc464d5fe1e624679695a20d641a01688e1")
10
```

:::note

가장 간단한 형태의 서비스체인은 하나의 SCN을 갖는 것입니다.
이 튜토리얼에서 설명하는 서비스체인은 4노드 서비스체인입니다. 그러나 원하는 경우 단일 노드 서비스체인을 설정할 수 있습니다.
'1단계: genesis.json 및 노드키 생성'에서 `--cn-num 4` 대신 `--cn-num 1`을 homi에게 전달하기만 하면 됩니다.

비잔틴 결함을 견디려면 최소 4개의 노드가 필요합니다. 따라서 BFT 알고리즘에서 고가용성을 달성하기 위한 최소 SCN 개수는 4개입니다. 하나의 SCN에 장애가 발생하면 다른 SCN이 자체적으로 합의에 도달할 수 없기 때문에 2개의 SCN 노드만으로는 충분하지 않습니다.

:::
