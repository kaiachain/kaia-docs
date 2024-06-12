import React from 'react'

const CurrentRelease = (props) => {
  const releaseData = props.releaseData

  const tagName = releaseData.tagName
  const binaryPrefix = releaseData.binaryPrefix
  const githubUrl = releaseData.githubUrl

  if (releaseData && props.tabConfig && props.tabConfig.length > 0) {
    const tabConfig = props.tabConfig[0]
    return (
      <>
        <div className="current-release-container">
          {tabConfig.config.map((_config) => {
            return (
              <div>
                <div className="current-release-binary-title">
                  {_config.binaryTitle}
                </div>
                {tagName && (
                  <div className="current-release-tag-name">{tagName}</div>
                )}
                <div className="current-release-binary-names-section">
                  {_config.binaryNames &&
                    _config.binaryNames.map((_binaryName) => {
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
                      let binaryBaseUrl = tabConfig.binaryBaseUrls[binaryPrefix]

                      let baseUrl = _config.baseUrl
                      baseUrl = baseUrl.replace(
                        '{BINARY_BASE_URL}',
                        binaryBaseUrl
                      )
                      baseUrl = baseUrl.replace('{TAG_NAME}', tagName)
                      baseUrl = baseUrl.replace(
                        '{BINARY_FILE_FORMAT}',
                        binaryFileformat
                      )
                      baseUrl = baseUrl.replace(
                        '{BINARY_PREFIX}',
                        binaryPrefixValue
                      )

                      return (
                        <a
                          target="_blank"
                          href={baseUrl}
                          className="current-release-binary-names-section-binary-name"
                        >
                          {_binaryName}
                        </a>
                      )
                    })}
                </div>
              </div>
            )
          })}
        </div>
        <div className="current-release-releasetag">
          <a href={githubUrl + 'releases/tag/' + tagName} target="_blank">
            Release notes for {tagName}.
          </a>
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

export default CurrentRelease
