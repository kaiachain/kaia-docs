import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "references/json-rpc/admin/web-3-rpc",
    },
    {
      type: "category",
      label: "admin",
      items: [
        {
          type: "doc",
          id: "references/json-rpc/admin/add-peer",
          label: "admin_addPeer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/datadir",
          label: "admin_datadir",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/export-chain",
          label: "admin_exportChain",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/get-spam-throttler-candidate-list",
          label: "admin_getSpamThrottlerCandidateList",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/get-spam-throttler-throttle-list",
          label: "admin_getSpamThrottlerThrottleList",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/get-spam-throttler-white-list",
          label: "admin_getSpamThrottlerWhiteList",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/import-chain",
          label: "admin_importChain",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/import-chain-from-string",
          label: "admin_importChainFromString",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/node-info",
          label: "admin_nodeInfo",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/peers",
          label: "admin_peers",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/remove-peer",
          label: "admin_removePeer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/save-trie-node-cache-to-disk",
          label: "admin_saveTrieNodeCacheToDisk",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/set-max-subscription-per-ws-conn",
          label: "admin_setMaxSubscriptionPerWSConn",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/set-spam-throttler-white-list",
          label: "admin_setSpamThrottlerWhiteList",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/spam-throttler-config",
          label: "admin_spamThrottlerConfig",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/start-http",
          label: "admin_startHTTP",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/start-spam-throttler",
          label: "admin_startSpamThrottler",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/start-state-migration",
          label: "admin_startStateMigration",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/start-ws",
          label: "admin_startWS",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/state-migration-status",
          label: "admin_stateMigrationStatus",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/stop-http",
          label: "admin_stopHTTP",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/stop-spam-throttler",
          label: "admin_stopSpamThrottler",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/stop-state-migration",
          label: "admin_stopStateMigration",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/stop-ws",
          label: "admin_stopWS",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/admin/node-config",
          label: "admin_nodeConfig",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
