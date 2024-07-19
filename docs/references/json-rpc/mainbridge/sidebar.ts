import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "references/json-rpc/mainbridge/web-3-rpc",
    },
    {
      type: "category",
      label: "mainbridge",
      items: [
        {
          type: "doc",
          id: "references/json-rpc/mainbridge/convert-child-chain-block-hash-to-parent-chain-tx-hash",
          label: "mainbridge_convertChildChainBlockHashToParentChainTxHash",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/mainbridge/get-child-chain-indexing-enabled",
          label: "mainbridge_getChildChainIndexingEnabled",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/mainbridge/node-info",
          label: "mainbridge_nodeInfo",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/mainbridge/add-peer",
          label: "mainbridge_addPeer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/mainbridge/remove-peer",
          label: "mainbridge_removePeer",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
