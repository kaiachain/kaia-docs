import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "references/json-rpc/subbridge/web-3-rpc",
    },
    {
      type: "category",
      label: "subbridge",
      items: [
        {
          type: "doc",
          id: "references/json-rpc/subbridge/add-peer",
          label: "subbridge_addPeer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/anchoring",
          label: "subbridge_anchoring",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/convert-request-tx-hash-to-handle-tx-hash",
          label: "subbridge_convertRequestTxHashToHandleTxHash",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/deploy-bridge",
          label: "subbridge_deployBridge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/deregister-bridge",
          label: "subbridge_deregisterBridge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/deregister-token",
          label: "subbridge_deregisterToken",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/get-bridge-information",
          label: "subbridge_getBridgeInformation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/get-receipt-from-parent-chain",
          label: "subbridge_getReceiptFromParentChain",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/list-bridge",
          label: "subbridge_listBridge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/node-info",
          label: "subbridge_nodeInfo",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/register-bridge",
          label: "subbridge_registerBridge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/register-token",
          label: "subbridge_registerToken",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/remove-peer",
          label: "subbridge_removePeer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/subscribe-bridge",
          label: "subbridge_subscribeBridge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/tx-pending",
          label: "subbridge_txPending",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/tx-pending-count",
          label: "subbridge_txPendingCount",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/unsubscribe-bridge",
          label: "subbridge_unsubscribeBridge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/child-operator",
          label: "subbridge_childOperator",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/child-operator-balance",
          label: "subbridge_childOperatorBalance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/child-operator-nonce",
          label: "subbridge_childOperatorNonce",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/latest-anchored-block-number",
          label: "subbridge_latestAnchoredBlockNumber",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/parent-operator",
          label: "subbridge_parentOperator",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/parent-operator-balance",
          label: "subbridge_parentOperatorBalance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/parent-operator-nonce",
          label: "subbridge_parentOperatorNonce",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/subbridge/send-chain-txslimit",
          label: "subbridge_sendChainTxslimit",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
