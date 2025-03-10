此 RPC API 文档将在 Kaia-docs 官方网站上自动生成。
如果您也想构建 RPC API 文档，请按照以下步骤操作

```shell
> git clone -b dev https://github.com/kaiachain/kaia-sdk.git

> cd ./kaia-sdk/documentation && RPC_SPEC_DIR=../../web3rpc/yaml ./generate-docs.sh split

> cd ./../web3rpc && ./web3rpc.sh
```