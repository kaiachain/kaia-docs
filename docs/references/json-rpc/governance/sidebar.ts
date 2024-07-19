import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "references/json-rpc/governance/web-3-rpc",
    },
    {
      type: "category",
      label: "governance",
      items: [
        {
          type: "doc",
          id: "references/json-rpc/governance/chain-config",
          label: "governance_chainConfig",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/get-staking-info",
          label: "governance_getStakingInfo",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/idx-cache",
          label: "governance_idxCache",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/idx-cache-from-db",
          label: "governance_idxCacheFromDb",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/item-cache-from-db",
          label: "governance_itemCacheFromDb",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/items-at",
          label: "governance_itemsAt",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/my-votes",
          label: "governance_myVotes",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/my-voting-power",
          label: "governance_myVotingPower",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/node-address",
          label: "governance_nodeAddress",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/pending-changes",
          label: "governance_pendingChanges",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/show-tally",
          label: "governance_showTally",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/total-voting-power",
          label: "governance_totalVotingPower",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/vote",
          label: "governance_vote",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/governance/votes",
          label: "governance_votes",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
