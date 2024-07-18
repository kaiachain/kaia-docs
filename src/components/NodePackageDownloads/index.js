import React, { useEffect, useState } from 'react'
import StableRelease from './StableRelease'
import CurrentRelease from './CurrentRelease'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import './index.css'

export default function NodePackageDownloads() {
  const [releases, setReleases] = useState([])
  const [currentRelease, setCurrentRelease] = useState()
  const size = 10
  const [start, setStart] = useState(0)
  const [showPaginationButton, setShowPaginationButton] = useState(true)
  const [showVersions, setShowVersions] = useState(false)
  const [allVersionsLoaded, setAllVersionsLoaded] = useState(false)

  useEffect(() => {
    fetchReleases()
  }, [])

  const fetchReleases = () => {
    fetch('https://airdrop-api.klaytn.foundation/node/releases?start=' + start, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        let releasesData = response.data.releases
        let machineTypes = response.data.machineTypes.filter(item => item.machineType !== "windows")
        let config = response.data.config
        setReleases([...releases, ...releasesData])

        let resultFirstRecord
        if (releasesData && releasesData.length > 0 && start === 0) {
          resultFirstRecord = {
            tagName: releasesData[0].tag_name,
            binaryPrefix: releasesData[0].type,
            githubUrl: config.gitBaseUrls[releasesData[0].type],
            machineTypes: machineTypes,
          }

          setCurrentRelease(resultFirstRecord)
        }
        setStart(start + size)
        setShowPaginationButton(releasesData.length !== 0)
        if (releasesData.length < size) {
          setAllVersionsLoaded(true)
        }
      })
  }

  const handleShowVersionsClick = () => {
    setShowVersions(!showVersions)
    if (!showVersions && !allVersionsLoaded) {
      fetchReleases()
    }
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ border: '0.5px solid', padding: '20px' }}>
        <div style={{ fontSize: '46px', fontWeight: '600' }}>Download Kaia</div>
        {currentRelease && (
          <div style={{ fontSize: '20px', fontWeight: '400' }}>
            {' '}
            {currentRelease.tag_name}{' '}
          </div>
        )}
        <p>
          You can download the latest stable release of Kaia for our primary
          platforms below. Packages for all supported platforms, as well as
          develop builds, can be found further down the page. If you're looking
          to install kaia and/or associated tools via your favorite package
          manager, please check our installation guide.
          <br /> <br />
          Please note that currently, the downloadable file for kaia-v1.0.0 is only
          available as a linux executable.
        </p>
        {currentRelease && currentRelease.machineTypes ? (
          <Tabs groupId="machineTypes">
            {currentRelease.machineTypes.map((_tab, _index) => (
              <TabItem
                key={_index}
                value={_tab.machineType.toLocaleLowerCase()}
                label={_tab.machineType.toUpperCase()}
                default={_tab.default}
              >
                <CurrentRelease
                  tabConfig={currentRelease.machineTypes.filter(
                    (_machine) => _machine.machineType == _tab.machineType
                  )}
                  releaseData={{
                    tagName: currentRelease.tagName,
                    binaryPrefix: currentRelease.binaryPrefix,
                    githubUrl: currentRelease.githubUrl,
                  }}
                />
              </TabItem>
            ))}
          </Tabs>
        ) : (
          <>
            <div style={{ width: '100%' }}>
              <div style={{ margin: '10px auto', width: '100px' }}>
                <span className="loader"></span>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ border: '0.5px solid', marginTop: '30px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            border: '0.5px solid',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              padding: '10px',
              width: '200px',
              borderRight: '0.5px solid',
              alignContent: 'center',
            }}
          >
            Archived releases
          </div>
          <div style={{ alignContent: 'center', padding: '10px' }}>
            These are the current and previous releases of Kaia, updated
            automatically when a new version is tagged in our{' '}
            <a style={{ textDecoration: 'underline' }} href={currentRelease?.githubUrl}>
              GitHub repository.
            </a>
          </div>
        </div>
        {showVersions && (
          <Tabs groupId="machineTypes">
            {currentRelease.machineTypes.map((_tab, _index) => (
              <TabItem
                key={_index}
                value={_tab.machineType.toLocaleLowerCase()}
                label={_tab.machineType.toUpperCase()}
                default={_tab.default}
              >
                <StableRelease
                  tabConfig={currentRelease.machineTypes.filter(
                    (_machine) => _machine.machineType == _tab.machineType
                  )}
                  releaseData={releases}
                  fetchReleases={fetchReleases}
                  showPaginationButton={showPaginationButton}
                />
              </TabItem>
            ))}
          </Tabs>
        )}
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <button onClick={handleShowVersionsClick} className="show-versions-button">
                {showVersions ? 'Hide versions' : 'Show more versions'}
            </button>
        </div>
      </div>
    </div>
  )
}