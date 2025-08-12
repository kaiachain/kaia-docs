export const sidebar = {
    type: '카테고리',
    label: 'viem-ext',
    link: {
        type: 'doc',
        id: '참조/sdk/viem-ext/getting-started',
    },
    items: [
        {
            type: 'doc',
            label: '시작하기',
            id: '참조/sdk/viem-ext/getting-started',
        },
        {
            type: '카테고리',
            label: '기본 거래',
            items: [
                '참조/sdk/viem-ext/기본-트랜잭션/레거시',
                '참조/sdk/viem-ext/기본-트랜잭션/가치-전송',
                '참조/sdk/viem-ext/기본-거래/가치-전송-메모',
                '참조/sdk/viem-ext/기본-거래/계정-업데이트',
                '참조/sdk/viem-ext/기본-트랜잭션/스마트-계약-배포',
                '참조/sdk/viem-ext/기본-거래/스마트-계약-실행',
                '참조/sdk/viem-ext/기본-트랜잭션/취소-트랜잭션',
            ],
        },
        {
            type: '카테고리',
            label: '수수료 위임 거래',
            items: [
                '참조/sdk/viem-ext/수수료-위임-거래/가치-전송',
                '참조/sdk/viem-ext/수수료 위임 거래/가치 전송 메모',
                '참조/sdk/viem-ext/수수료-위임-거래/계정-업데이트',
                '참조/sdk/viem-ext/수수료 위임 거래/스마트 컨트랙트 배포',
                '참조/sdk/viem-ext/수수료-위임-거래/스마트-계약-실행',
                '참조/sdk/viem-ext/수수료 위임 거래/취소 거래',
            ],
        },
        {
            type: '카테고리',
            label: '스마트 계약',
            items: [
                '참조/sdk/viem-ext/smart-contract/read',
                '참조/sdk/viem-ext/smart-contract/write',
                '참조/sdk/viem-ext/smart-contract/write-txtype',
                '참조/sdk/viem-ext/smart-contract/write-with-fee-delegation',
            ],
        },
    ],
};
