export const sidebar = {
    type: 'loại',
    label: 'viem-ext',
    link: {
        type: 'tài liệu',
        id: 'tham khảo/sdk/viem-ext/bắt đầu',
    },
    items: [
        {
            type: 'tài liệu',
            label: 'Bắt đầu',
            id: 'tham khảo/sdk/viem-ext/bắt đầu',
        },
        {
            type: 'loại',
            label: 'Giao dịch cơ bản',
            items: [
                'tham khảo/sdk/viem-ext/basic-transaction/legacy',
                'tham khảo/sdk/viem-ext/basic-transaction/value-transfer',
                'tham khảo/sdk/viem-ext/basic-transaction/value-transfer-memo',
                'tham khảo/sdk/viem-ext/basic-transaction/account-update',
                'tham khảo/sdk/viem-ext/basic-transaction/smart-contract-deploy',
                'tham khảo/sdk/viem-ext/basic-transaction/smart-contract-execution',
                'tham khảo/sdk/viem-ext/basic-transaction/cancel-transaction',
            ],
        },
        {
            type: 'loại',
            label: 'Phí giao dịch được ủy quyền',
            items: [
                'tham khảo/sdk/viem-ext/fee-delegated-transaction/value-transfer',
                'tham khảo/sdk/viem-ext/fee-delegated-transaction/value-transfer-memo',
                'tham khảo/sdk/viem-ext/fee-delegated-transaction/account-update',
                'tham khảo/sdk/viem-ext/fee-delegated-transaction/smart-contract-deploy',
                'tham khảo/sdk/viem-ext/fee-delegated-transaction/smart-contract-execution',
                'tham khảo/sdk/viem-ext/fee-delegated-transaction/cancel-transaction',
            ],
        },
        {
            type: 'loại',
            label: 'Hợp đồng thông minh',
            items: [
                'tham khảo/sdk/viem-ext/smart-contract/đọc',
                'tham khảo/sdk/viem-ext/smart-contract/write',
                'tham khảo/sdk/viem-ext/smart-contract/write-txtype',
                'tham khảo/sdk/viem-ext/smart-contract/write-with-fee-delegation',
            ],
        },
    ],
};
