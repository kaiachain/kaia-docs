# Run EN using docker

## Download the image

Choose an image tag from https://hub.docker.com/r/kaiachain/kaia/tags. `kaiachain/kaia:latest` is the recent release version. But you can choose a specific version. Currently, only linux/amd64 platform is supported. The container might not work correctly in Windows or Mac hosts.

```
docker pull kaiachain/kaia:latest
```

```
docker pull kaiachain/kaia:v1.0.2
```

## Prepare configuration file

You can start from the existing configuration file. To obtain the template `kend.conf` configuration file,

```sh
mkdir -p conf
docker run --rm kaiachain/kaia:latest cat /klaytn-docker-pkg/conf/kend.conf > conf/kend.conf
```

Then edit the configuration. At least the `DATA_DIR` and `LOG_DIR` has to be specified. This guide will assume `/var/kend/data`.

```sh
echo "DATA_DIR=/var/kend/data" >> conf/kend.conf
echo "LOG_DIR=/var/kend/logs" >> conf/kend.conf
```

## Fast Sync from chaindata snapshot (Optional)

Synching from the genesis block is time-consuming. You may perform a fast sync by downloading a snapshot of the chain data before starting the EN. This can dramatically reduce the time the EN will spend syncing on the first startup.

Download the latest chaindata snapshot from the following links:

- [Mainnet state-migrated chaindata snapshot](http://packages.kaia.io/cypress/chaindata/)
- [Mainnet live-pruning chaindata snapshot](https://packages.kaia.io/cypress/pruning-chaindata/)
- [Kairos state-migrated chaindata snapshot](https://packages.kaia.io/kairos/chaindata/)
- [Kairos live-pruning chaindata snapshot](https://packages.kaia.io/kairos/pruning-chaindata/)

Then uncompress:

```sh
tar -C data -xvf klaytn-cypress-chaindata-latest.tar.gz
```

## Start the container

Expose the RPC port, which is 8551 unless you have modified in the `kend.conf`. Mount the configuration directory `conf/` and chaindata directory `data/`. Then run `kend start` to start the daemon and `tail -f` to print the logs.

```sh
mkdir -p data
docker run -d --name ken \
  -p 8551:8551 \
  -v $(pwd)/conf:/klaytn-docker-pkg/conf \
  -v $(pwd)/data:/var/kend/data \
  kaiachain/kaia:latest \
  /bin/bash -c "kend start && touch /var/kend/logs/kend.out && tail -f /var/kend/logs/kend.out"
```

## Attaching to the console

```
docker exec -it ken ken attach --datadir /var/kend/data
```

## Stopping the container

To prevent chaindata corruption, gracefully shut down the `ken`.

```
docker exec -it ken kend stop
docker stop ken
docker rm ken
```