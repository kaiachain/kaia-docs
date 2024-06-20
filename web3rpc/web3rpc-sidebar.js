const klaySidebar = require("../docs/references/json-rpc/klay/sidebar.ts")
const ethSidebar = require("../docs/references/json-rpc/eth/sidebar.ts")
const governanceSidebar = require("../docs/references/json-rpc/governance/sidebar.ts")
const adminSidebar = require("../docs/references/json-rpc/admin/sidebar.ts")
const netSidebar = require("../docs/references/json-rpc/net/sidebar.ts")
const txpoolSidebar = require("../docs/references/json-rpc/txpool/sidebar.ts")
const personalSidebar = require("../docs/references/json-rpc/personal/sidebar.ts")
const debugSidebar = require("../docs/references/json-rpc/debug/sidebar.ts")
const mainbridgeSidebar = require("../docs/references/json-rpc/mainbridge/sidebar.ts")
const subbridgeSidebar = require("../docs/references/json-rpc/subbridge/sidebar.ts")
const kaiaSidebar = require("../docs/references/json-rpc/kaia/sidebar.ts")

// Function to find the common prefix of labels
const findCommonLabelPrefix = (sidebar, categories) => {
    if (categories === undefined) return categories
    categories.map(category => {
        let parentCategory = {}
        category.items.map(item => {
            const tokens = item.label.split(" ")
            if (tokens.length === 2) {
                const label = tokens[0].slice(1,-1)
                if (!parentCategory.hasOwnProperty(tokens[0])) {
                    parentCategory[tokens[0]] = {
                        type:"category",
                        label:label,
                        items:[]
                    }
                }
                item.label = tokens[1]
                parentCategory[tokens[0]].items.push(item)
            }
        })
        sidebar.map(originalCategory => {
            if (originalCategory.label === category.label) {
                originalCategory.items = Object.keys(parentCategory).map(key => {
                    return parentCategory[key]
                })
            }
        })
    });
};

findCommonLabelPrefix(klaySidebar, klaySidebar.slice(1))
findCommonLabelPrefix(kaiaSidebar, kaiaSidebar.slice(1))
findCommonLabelPrefix(ethSidebar, ethSidebar.slice(1))
findCommonLabelPrefix(debugSidebar, debugSidebar.slice(1))
export const klaySidebarFormatted = klaySidebar.slice(1)
export const kaiaSidebarFormatted = kaiaSidebar.slice(1)
export const ethSidebarFormatted = ethSidebar.slice(1)
export const governanceSidebarFormatted = governanceSidebar.slice(1)
export const adminSidebarFormatted = adminSidebar.slice(1)
export const netSidebarFormatted = netSidebar.slice(1)
export const txpoolSidebarFormatted = txpoolSidebar.slice(1)
export const personalSidebarFormatted = personalSidebar.slice(1)
export const debugSidebarFormatted = debugSidebar.slice(1)
export const mainbridgeSidebarFormatted = mainbridgeSidebar.slice(1)
export const subbridgeSidebarFormatted = subbridgeSidebar.slice(1)