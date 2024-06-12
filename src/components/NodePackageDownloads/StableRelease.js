import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react'

const StableRelease = (props) => {
  const releaseData = props.releaseData

  if (releaseData && props.tabConfig && props.tabConfig.length > 0) {
    const tabConfig = props.tabConfig[0]
    return (
      <>
        <div className="stable-release-table">
          <div className="stable-release-table-header">
            <div className="stable-release-table-header-item-release">Release</div>
            <div className="stable-release-table-header-item-tag">Tag</div>
            <div className="stable-release-table-header-item-published">Published</div>
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
                return (
                  <>
                    <Accordion allowMultiple={true}>
                      <AccordionItem>
                        <AccordionButton className="stable-release-accordion-button">
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            className="stable-release-accordion-box"
                          >
                            {_release.type.toUpperCase()} {_release.tag_name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          {tabConfig.config.map((_config) => {
                            let binaryTitle = _config.binaryTitle
                            return (
                              <>
                                {_config.binaryNames &&
                                _config.binaryNames.length > 0 ? (
                                  _config.binaryNames.map((_binaryName) => {
                                    let binaryPrefix = _release.type
                                    const tagName = _release.tag_name
                                    let createdAt = _release.created_at
                                    createdAt = new Date(
                                      createdAt
                                    ).toLocaleString()

                                    let releaseNameFormat =
                                      _config.releaseNameFormat

                                    let releaseLabel = _config.releaseLabel
                                      ? _config.releaseLabel[binaryPrefix]
                                      : ''

                                    releaseNameFormat =
                                      releaseNameFormat.replace(
                                        '{BINARY_LABEL}',
                                        releaseLabel
                                      )
                                    releaseNameFormat =
                                      releaseNameFormat.replace(
                                        '{TAG_NAME}',
                                        tagName
                                      )
                                    releaseNameFormat =
                                      releaseNameFormat.replace(
                                        '{BINARY_NAME}',
                                        _binaryName
                                      )

                                    let binaryFileformat =
                                      _config.binaryFileFormat
                                    let binaryPrefixValue =
                                      _config.binaryPrefixes
                                        ? _config.binaryPrefixes[binaryPrefix]
                                        : ''

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

                                    let gitBaseUrl =
                                      tabConfig.gitBaseUrls[binaryPrefix]
                                    if (baseUrl) {
                                      return (
                                        <div className="stable-release-table-row">
                                          <a
                                            href={baseUrl}
                                            className="stable-release-table-row-item-release"
                                            target="_blank"
                                          >
                                            {releaseNameFormat}
                                          </a>
                                          <div className="stable-release-table-row-item-tag">
                                            <a
                                              href={
                                                gitBaseUrl +
                                                '/releases/tag/' +
                                                tagName
                                              }
                                              target="_blank"
                                            >
                                              {tagName}
                                            </a>
                                          </div>
                                          <div className="stable-release-table-row-item-published">
                                            {createdAt}
                                          </div>
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

export default StableRelease
