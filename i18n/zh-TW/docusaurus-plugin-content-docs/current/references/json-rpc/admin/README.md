此 RPC API 文檔將在 Kaia-docs 官方網站上自動生成。
如果您也想構建 RPC API 文檔，請按照以下步驟操作

```shell
> git clone -b dev https://github.com/kaiachain/kaia-sdk.git

> cd ./kaia-sdk/documentation && RPC_SPEC_DIR=../../web3rpc/yaml ./generate-docs.sh split

> cd ./../web3rpc && ./web3rpc.sh
```
