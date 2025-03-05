このRPC APIドキュメントはKaia-docs公式サイトに自動生成されます。
RPC API ドキュメントも構築したい場合は、以下の手順に従ってください。

```shell
> git clone -b dev https://github.com/kaiachain/kaia-sdk.git

> cd ./kaia-sdk/documentation && RPC_SPEC_DIR=../../web3rpc/yaml ./generate-docs.sh split

> cd ../../web3rpc && ./web3rpc.sh
```