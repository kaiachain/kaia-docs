# Contract addresses

This page lists the deployed addresses of notable system contracts. You can see the contract code and transactions in the [Block Explorers](../../build/tools/block-explorers).

Some Kaia features rely on the special smart contracts called *system contracts*. They hold critical information such as validators and staking. A Kaia node reads the storage states of system contracts as part of its block processing job. Users and developers can interact with these contracts to query information and build applications such as staking services.

| Contract                    | Mainnet                                    | Kairos                                     |
| ---                         | ---                                        | ---                                        |
| AddressBook                 | 0x0000000000000000000000000000000000000400 | 0x0000000000000000000000000000000000000400 |
| CypressCredit               | 0x0000000000000000000000000000000000000000 | n/a                                        |
| KIP-81 GovParam             | TBU                                        | 0x84214cec245d752a9f2faf355b59ddf7f58a6edb |
| KIP-103 TreasuryRebalance   | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 |
| KIP-160 TreasuryRebalanceV2 | 0xa4df15717Da40077C0aD528296AdBBd046579Ee9 | 0x3D478E73c9dBebB72332712D7265961B1868d193 |
| KIP-149 Registry            | 0x0000000000000000000000000000000000000401 | 0x0000000000000000000000000000000000000401 |
| KIP-113 SimpleBlsRegistry   | proxy 0x3e80e75975bdb8e04B800485DD28BebeC6d97679 <br/> logic 0xb5ed8d6edd437a0d6ae828580c0aef5678d87f1a | proxy 0x4BEed0651C46aE5a7CB3b7737345d2ee733789e6 <br/> logic 0x6751096fe72d835307d7e635aed51296948b93c5 |

Some contracts are not directly read by Kaia nodes but play crucial roles in operating the Kaia blockchain and its ecosystem. They include treasury, governance, and KAIA token bridge contracts.

| Contract                        | Mainnet                                    | Kairos                                     |
| ---                             | ---                                        | ---                                        |
| KIP-81 StakingTracker           | 0x9b8688d616D3D5180d29520c6a0E28582E82BF4d | n/a                                        |
| KIP-81 Voting                   | 0xca4ef926634a530f12e55a0aee87f195a7b22aa3 | n/a                                        |
| KIP-103 KCV                     | 0x4f04251064274252D27D4af55BC85b68B3adD992 | 0xaa8d19a5e17e9e1bA693f13aB0E079d274a7e51E |
| KIP-103 KFF                     | 0x85D82D811743b4B8F3c48F3e48A1664d1FfC2C10 | 0x8B537f5BC7d176a94D7bF63BeFB81586EB3D1c0E |
| KIP-103 KCF                     | 0xdd4C8d805fC110369D3B148a6692F283ffBDCcd3 | 0x47E3DbB8c1602BdB0DAeeE89Ce59452c4746CA1C |
| KIP-160 KEF                     |                                            |                                            |
| KIP-160 KIF                     |                                            |                                            |
| KIP-163 PublicDelegationFactory |                                            |                                            |
| Kaiabridge Bridge               |                                            |                                            |
| Kaiabridge Operator             |                                            |                                            |
| Kaiabridge Judge                |                                            |                                            |
| Kaiabridge Guardian             |                                            |                                            |

