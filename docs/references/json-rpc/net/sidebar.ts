import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "references/json-rpc/net/web-3-rpc",
    },
    {
      type: "category",
      label: "net",
      items: [
        {
          type: "doc",
          id: "references/json-rpc/net/listening",
          label: "net_listening",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/net/network-id",
          label: "net_networkID",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/net/peer-count",
          label: "net_peerCount",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/net/peer-count-by-type",
          label: "net_peerCountByType",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/net/version",
          label: "net_version",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
