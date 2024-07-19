import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "references/json-rpc/txpool/web-3-rpc",
    },
    {
      type: "category",
      label: "txpool",
      items: [
        {
          type: "doc",
          id: "references/json-rpc/txpool/content",
          label: "txpool_content",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/txpool/inspect",
          label: "txpool_inspect",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/txpool/status",
          label: "txpool_status",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
