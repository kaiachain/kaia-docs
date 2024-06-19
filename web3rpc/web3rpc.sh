# clean
yarn docusaurus clean-api-docs web3rpcKlay
yarn docusaurus clean-api-docs web3rpcKaia
yarn docusaurus clean-api-docs web3rpcEth
yarn docusaurus clean-api-docs web3rpcDebug
yarn docusaurus clean-api-docs web3rpcAdmin
yarn docusaurus clean-api-docs web3rpcGovernance
yarn docusaurus clean-api-docs web3rpcNet
yarn docusaurus clean-api-docs web3rpcTxpool
yarn docusaurus clean-api-docs web3rpcPersonal
yarn docusaurus clean-api-docs web3rpcMainbridge
yarn docusaurus clean-api-docs web3rpcSubbridge
# gen
yarn docusaurus gen-api-docs web3rpcKlay
yarn docusaurus gen-api-docs web3rpcKaia
yarn docusaurus gen-api-docs web3rpcEth
yarn docusaurus gen-api-docs web3rpcDebug
yarn docusaurus gen-api-docs web3rpcAdmin
yarn docusaurus gen-api-docs web3rpcGovernance
yarn docusaurus gen-api-docs web3rpcNet
yarn docusaurus gen-api-docs web3rpcTxpool
yarn docusaurus gen-api-docs web3rpcPersonal
yarn docusaurus gen-api-docs web3rpcMainbridge
yarn docusaurus gen-api-docs web3rpcSubbridge

node ./delete-endpoint.js
node ./refactor-code-example.js