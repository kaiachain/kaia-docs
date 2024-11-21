# Contract addresses

This page lists the deployed addresses of notable system contracts. You can see the contract code and transactions in the [Block Explorers](../../build/tools/block-explorers).

Some Kaia features rely on the special smart contracts called *system contracts*. They hold critical information such as validators and staking. A Kaia node reads the storage states of system contracts as part of its block processing job. Users and developers can interact with these contracts to query information and build applications such as staking services.

| Contract                    | Mainnet                                    | Kairos                                     |
| ---                         | ---                                        | ---                                        |
| AddressBook                 | 0x0000000000000000000000000000000000000400 | 0x0000000000000000000000000000000000000400 |
| CypressCredit               | 0x0000000000000000000000000000000000000000 | n/a                                        |
| KIP-81 GovParam             | 0x362976Cc2Ef6751DE6bf6008e3E90e1e02deCa51 | 0x84214cec245d752a9f2faf355b59ddf7f58a6edb |
| KIP-103 TreasuryRebalance   | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 |
| KIP-160 TreasuryRebalanceV2 | 0xa4df15717Da40077C0aD528296AdBBd046579Ee9 | 0x3D478E73c9dBebB72332712D7265961B1868d193 |
| KIP-149 Registry            | 0x0000000000000000000000000000000000000401 | 0x0000000000000000000000000000000000000401 |
| KIP-113 SimpleBlsRegistry   | proxy 0x3e80e75975bdb8e04B800485DD28BebeC6d97679 <br/> logic 0xb5ed8d6edd437a0d6ae828580c0aef5678d87f1a | proxy 0x4BEed0651C46aE5a7CB3b7737345d2ee733789e6 <br/> logic 0x6751096fe72d835307d7e635aed51296948b93c5 |

Some contracts are not directly read by Kaia nodes but play crucial roles in operating the Kaia blockchain and its ecosystem. They include treasury, governance, and KAIA token bridge contracts.

| Contract                        | Mainnet                                    | Kairos                                     |
| ---                             | ---                                        | ---                                        |
| KIP-81 StakingTracker           | 0x9b8688d616D3D5180d29520c6a0E28582E82BF4d | 0x8Fe0f06DF2C95B8D5D9D4232405614E505Ab04C0 |
| KIP-81 Voting                   | 0xca4ef926634a530f12e55a0aee87f195a7b22aa3 | 0x2C41DdBF0239cEaa75325D66809d0199F368188b |
| KIP-103 KVC                     | 0x4f04251064274252D27D4af55BC85b68B3adD992 | 0xaa8d19a5e17e9e1bA693f13aB0E079d274a7e51E |
| KIP-103 KFF                     | 0x85D82D811743b4B8F3c48F3e48A1664d1FfC2C10 | 0x8B537f5BC7d176a94D7bF63BeFB81586EB3D1c0E |
| KIP-103 KCF                     | 0xdd4C8d805fC110369D3B148a6692F283ffBDCcd3 | 0x47E3DbB8c1602BdB0DAeeE89Ce59452c4746CA1C |
| KIP-160 KIF                     | 0x440372e3cE41a85b7B5A6091c232470d186367D5 | 0x8436e5BD1A6D622c278c946E2F8988a26136A16F |
| KIP-160 KEF                     | 0x2D493DC06B73CF8Dede958FABBC9d62C31fA0926 | 0x819d4b7245164e6A94341F4b5C2ae587372BB669 |
| LINE NEXT Delegation            | 0xc8c5dd35e77b9e2dd7f4c2eb7f436d34d04a059b | 0x8436e5BD1A6D622c278c946E2F8988a26136A16F |
| Kaiabridge Bridge               | 0x5Ff2AD57C15f7Dacb5D098d1fC82DAF482884f99 | 0x4cE2b3dC804B35aC43F96B266B50Bc9fE69A97C2 |
| Kaiabridge Operator             | 0xB390AaEf82Af9F8392Ed90768DABF91164c59619 | 0x8afe7C44C0293fd69baF444743e224Da1886760A |
| Kaiabridge Judge                | 0x64c91d6517b8f2fd7f4157c32DE4acfe1AeA2611 | 0x3735Ba95cca5DEd47Fa5b202a2Bbda4c63c0B1DD |
| Kaiabridge Guardian             | 0xE49D152E5FA576caFC18D2775AF4E58C135a6851 | 0xc9e8342C1da4c89A423258d9030414331b4761Cf |
| KIP-163 PublicDelegationFactory | 0x29C8cc53d22F79D4024ecB67DB1a09b37bCdE415 | 0x98c47c2cda854cbb025d47de72149a7ec238ec33 |

