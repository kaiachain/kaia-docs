import React from 'react'
import {isAddArm} from "@site/src/components/NodePackageDownloads/index";
import { compareVersions } from './utils/version';

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
                <div className="current-release-binary-names-section">
                  {_config.binaryNames &&
                    _config.binaryNames.map((_binaryName) => {
                      let binaryPrefixValue = _config.binaryPrefixes
                        ? _config.binaryPrefixes[binaryPrefix]
                        : ''
                      let binaryVersionValue = _config.binaryVersion
                        ? _config.binaryVersion[binaryPrefix]
                        : ''
                      let binaryFileformat = _config.binaryFileFormat
                      
                      if (tabConfig.machineType === 'rpm' && compareVersions(tagName, 'v2.0.0') >= 0) {
                        binaryFileformat = binaryFileformat.replace('el7', 'el9')
                      }
                      
                      binaryFileformat = binaryFileformat.replace(
                        '{BINARY_VERSION}',
                        binaryVersionValue
                      )
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
                      );
                      
                      // Platform-specific architecture handling
                      if (tabConfig.machineType === 'darwin') {
                        // darwin supports only arm64
                        return (
                          <>
                            <a
                              target="_blank"
                              href={baseUrl.replace('{ARCH_TYPE}', 'darwin-arm64')}
                              className="current-release-binary-names-section-binary-name"
                            >
                              {binaryFileformat.replace('{ARCH_TYPE}', 'darwin-arm64')}
                            </a>
                          </>
                        )
                      }
                      
                      if (tabConfig.machineType === 'linux') {
                        // linux supports amd64, arm64
                        return (
                          <>
                            <a
                              target="_blank"
                              href={baseUrl.replace('{ARCH_TYPE}', 'linux-amd64')}
                              className="current-release-binary-names-section-binary-name"
                            >
                              {binaryFileformat.replace('{ARCH_TYPE}', 'linux-amd64')}
                            </a>
                            {isAddArm(releaseData.binaryPrefix,tabConfig.machineType,tagName) &&
                              <a
                                target="_blank"
                                href={baseUrl.replace('{ARCH_TYPE}', 'linux-arm64')}
                                className="current-release-binary-names-section-binary-name"
                              >
                                {binaryFileformat.replace('{ARCH_TYPE}', 'linux-arm64')}
                              </a>
                            }
                          </>
                        )
                      }
                      
                      // Default case (rpm, etc.)
                      return (
                        <>
                          <a
                            target="_blank"
                            href={baseUrl.replace('{ARCH_TYPE}', 'x86_64')}
                            className="current-release-binary-names-section-binary-name"
                          >
                            {binaryFileformat.replace('{ARCH_TYPE}', 'x86_64')}
                          </a>
                          {isAddArm(releaseData.binaryPrefix,tabConfig.machineType,tagName) &&
                            <a
                              target="_blank"
                              href={baseUrl.replace('{ARCH_TYPE}', 'aarch64')}
                              className="current-release-binary-names-section-binary-name"
                            >
                              {binaryFileformat.replace('{ARCH_TYPE}', 'aarch64')}
                            </a>
                          }
                        </>
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
