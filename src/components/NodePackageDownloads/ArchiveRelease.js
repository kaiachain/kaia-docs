import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react'

const ArchiveRelease = (props) => {
  const releaseData = props.releaseData

  if (releaseData && props.tabConfig && props.tabConfig.length > 0) {
    const tabConfig = props.tabConfig[0]
    return (
      <>
        <div className="stable-release-table">
          {props.showPaginationButton && (
            <div class="stable-release-arrow-container" onClick={props.fetchReleases}>
                <div class="stable-release-arrow-down"></div>
            </div>
          )}
          <div className="stable-release-table-header">
            <div className="stable-release-table-header-item-release">
              Release
            </div>
            <div className="stable-release-table-header-item-release_note">
              Release note
            </div>
            <dev className="stable-release-table-header-item-hardfork">
              Hardfork
            </dev>
            <div className="stable-release-table-header-item-published">
              Published
            </div>
          </div>
          {tabConfig.machineType == 'windows'
            ? (() => {
                let binaryTitle = tabConfig.config[0].binaryTitle
                return (
                  <div className="binarytitle-container">
                    <div className="binary-title ">{binaryTitle}</div>
                  </div>
                )
              })()
            : releaseData.map((_release, _index) => {
                // TODO-kaia-docs: replace hard-coded hardfork version lists with air-drop one
                let hardforkVersions = {
                  "v1.7.0": "IstanbulEVM",
                  "v1.7.3": "LondonEVM",
                  "v1.8.0": "EthTxType",
                  "v1.9.0": "Magma",
                  "v1.10.0": "Kore",
                  "v1.10.2": "KIP-103",
                  "v1.11.0": "Shanghai",
                  "v1.12.0": "Cancun",
                  "v1.0.0": "Kaia",
                }
                return (
                  <>
                    <Accordion allowMultiple={true}>
                      <AccordionItem>
                        <AccordionButton className="stable-release-accordion-button">
                          <Box as="span" flex="2.3" textAlign="left" className="stable-release-accordion-box">
                            {_release.type.toUpperCase()} {_release.tag_name}
                          </Box>
                          <div className="stable-release-table-row-item-release_note">
                            <a
                                href={`${tabConfig.gitBaseUrls[_release.type]}/releases/tag/${_release.tag_name}`}
                                target="_blank"
                            >
                              {_release.tag_name}
                            </a>
                          </div>
                          <div className="stable-release-table-row-item-hardfork">
                            <a
                                href={"https://docs.kaia.io/docs/misc/klaytn-history/#" + hardforkVersions[_release.tag_name]}
                                target="_blank"
                            >
                              {hardforkVersions[_release.tag_name]}
                            </a>
                          </div>
                          <div className="stable-release-table-row-item-published">
                            {new Date(_release.created_at).toLocaleString()}
                          </div>
                          <AccordionIcon/>
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          {tabConfig.config.map((_config, index) => {
                            let binaryTitle = _config.binaryTitle
                            return (
                              <>
                                {_config.binaryNames &&
                                _config.binaryNames.length > 0 ? (
                                  _config.binaryNames.map((_binaryName) => {
                                    let binaryPrefix = _release.type
                                    const tagName = _release.tag_name

                                    let binaryPrefixValue = _config.binaryPrefixes
                                      ? _config.binaryPrefixes[binaryPrefix]
                                      : ''
                                    let binaryFileformat = _config.binaryFileFormat
                                    binaryFileformat = binaryFileformat.replace(
                                      '{BINARY_NAME}',
                                      _binaryName
                                    )
                                    binaryFileformat = binaryFileformat.replace(
                                      '{TAG_NAME}',
                                      tagName
                                    )
                                    binaryFileformat = binaryFileformat.replace(
                                      '{BINARY_PREFIX}',
                                      binaryPrefixValue
                                    )

                                    let binaryBaseUrl =
                                      tabConfig.binaryBaseUrls[binaryPrefix]

                                    let baseUrl = _config.baseUrl
                                    baseUrl = baseUrl.replace(
                                      '{BINARY_BASE_URL}',
                                      binaryBaseUrl
                                    )
                                    baseUrl = baseUrl.replace(
                                      '{TAG_NAME}',
                                      tagName
                                    )
                                    baseUrl = baseUrl.replace(
                                      '{BINARY_FILE_FORMAT}',
                                      binaryFileformat
                                    )
                                    baseUrl = baseUrl.replace(
                                      '{BINARY_PREFIX}',
                                      binaryPrefixValue
                                    )
                                    if (tagName === "v1.0.0") {
                                      if (tabConfig.machineType !== "linux") {
                                        //console.log(tabConfig.machineType, _binaryName)
                                        if (_binaryName === "homi" || _binaryName === "docker") {
                                          return ( <div className="stable-release-table-row">
                                            Only linux executable file is available. Packages are not supported.</div> )
                                        } else {
                                          return;
                                        }
                                      }
                                      if (tabConfig.machineType === "linux") {
                                        if (binaryTitle === "FOR KAIA MAINNET" && (_binaryName === "kcn" || _binaryName === "kpn" || _binaryName === "ken")) {
                                          baseUrl = "https://packages.klaytn.net/baobab/kaia-v1.0.0/" + _binaryName + "-v1.0.0-linux-amd64"
                                          binaryFileformat = _binaryName + "-v1.0.0-linux-amd64"
                                        } else {
                                          return;
                                        }
                                      }
                                    }
                                    if (baseUrl) {
                                      return (
                                        <div className="stable-release-table-row">
                                          <a
                                            href={baseUrl}
                                            className="stable-release-table-row-item-release"
                                            target="_blank"
                                          >
                                            {binaryFileformat}
                                          </a>
                                        </div>
                                      )
                                    }
                                  })
                                ) : (
                                  <>
                                  <div className="binarytitle-container">
                                      <div className="binarytitle">
                                        {binaryTitle}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            )
                          })}
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </>
                )
              })}
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="loader-container">
          <div className="loader-body">
            <span className="loader"></span>
          </div>
        </div>
      </>
    )
  }
}

export default ArchiveRelease

