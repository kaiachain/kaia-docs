import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "references/json-rpc/personal/web-3-rpc",
    },
    {
      type: "category",
      label: "personal",
      items: [
        {
          type: "doc",
          id: "references/json-rpc/personal/derive-account",
          label: "personal_deriveAccount",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/ec-recover",
          label: "personal_ecRecover",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/import-raw-key",
          label: "personal_importRawKey",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/list-accounts",
          label: "personal_listAccounts",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/list-wallets",
          label: "personal_listWallets",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/lock-account",
          label: "personal_lockAccount",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/new-account",
          label: "personal_newAccount",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/open-wallet",
          label: "personal_openWallet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/replace-raw-key",
          label: "personal_replaceRawKey",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/send-account-update",
          label: "personal_sendAccountUpdate",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/send-transaction",
          label: "personal_sendTransaction",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/send-value-transfer",
          label: "personal_sendValueTransfer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/sign",
          label: "personal_sign",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/sign-transaction",
          label: "personal_signTransaction",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "references/json-rpc/personal/unlock-account",
          label: "personal_unlockAccount",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
