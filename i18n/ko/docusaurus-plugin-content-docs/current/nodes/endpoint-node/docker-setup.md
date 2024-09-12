# 도커로 EN 운용하기

## 이미지 다운로드

Choose an image tag from https://hub.docker.com/r/kaiachain/kaia/tags. `kaiachain/kaia:latest` is the recent release version. 하지만 특정 버전을 선택할 수도 있습니다. 현재는 리눅스/amd64 플랫폼만 지원됩니다. 윈도우나 맥 호스트에서는 컨테이너가 제대로 작동하지 않을 수 있습니다.

```sh
docker pull kaiachain/kaia:latest  # Latest release
docker pull kaiachain/kaia:v1.0.2  # Specific version
```

## 구성 파일 준비

기존 구성 파일에서 시작할 수 있습니다. 템플릿 `kend.conf` 구성 파일을 가져오려면 다음과 같이 하세요.

```sh
mkdir -p conf
docker run --rm kaiachain/kaia:latest cat /klaytn-docker-pkg/conf/kend.conf > conf/kend.conf
```

그런 다음 구성을 편집합니다. 최소한 `DATA_DIR`과 `LOG_DIR`은 지정해야 합니다. 이 가이드에서는 `/var/kend/data`로 가정합니다.

```sh
echo "DATA_DIR=/var/kend/data" >> conf/kend.conf
echo "LOG_DIR=/var/kend/logs" >> conf/kend.conf
```

### (Optional) Download Chaindata Snapshot

제네시스 블록에서 동기화하는 것은 시간이 많이 걸립니다. You may use [Chaindata Snapshot](../../misc/operation/chaindata-snapshot.md) to skip the [Full Sync](../../learn/storage/block-sync.md#full-sync) process. Download and decompress the chaindata snapshot. Then mount the decompressed directory to the container.

## 컨테이너 시작

`kend.conf`에서 수정하지 않은 경우 8551인 RPC 포트를 노출합니다. 구성 디렉터리 `conf/`와 체인데이터 디렉터리 `data/`를 마운트합니다. 그런 다음 `kend start`를 실행하여 데몬을 시작하고 `tail -f`를 실행하여 로그를 출력합니다.

```sh
mkdir -p data
docker run -d --name ken \
  -p 8551:8551 \
  -v $(pwd)/conf:/klaytn-docker-pkg/conf \
  -v $(pwd)/data:/var/kend/data \
  kaiachain/kaia:latest \
  /bin/bash -c "kend start && touch /var/kend/logs/kend.out && tail -f /var/kend/logs/kend.out"
```

## 콘솔에 연결하기

```
docker exec -it ken ken attach --datadir /var/kend/data
```

## 컨테이너 중지하기

체인데이터 손상을 방지하려면 `ken`을 정상적으로 종료합니다.

```
docker exec -it ken kend stop
docker stop ken
docker rm ken
```
