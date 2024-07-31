This RPC API docs will be automatically generated in the Kaia-docs official site.
Please follow the steps below if you also want to build the RPC API documentation
```shell
> git clone -b dev https://github.com/kaiachain/kaia-sdk.git

> cd ./kaia-sdk/documentation && RPC_SPEC_DIR=../../web3rpc/yaml ./generate-docs.sh split

> cd ../../web3rpc && ./web3rpc.sh
```