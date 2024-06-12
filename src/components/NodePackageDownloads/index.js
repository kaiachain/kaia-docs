import React, { useEffect, useState } from 'react'
import StableRelease from './StableRelease'
import CurrentRelease from './CurrentRelease'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import './index.css'

export default function NodePackageDownloads() {
  const [releases, setReleases] = useState()
  const [currentRelease, setCurrentRelease] = useState()
  const size = 10
  const [start, setStart] = useState(0)

  useEffect(() => {
    fetch(
      'https://airdrop-api.klaytn.foundation/node/releases?start=' + start,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        let releases = response.data.releases
        let machineTypes = response.data.machineTypes
        let config = response.data.config
        setReleases(releases)

        let resultFirstRecord
        if (releases && releases.length > 0) {
          resultFirstRecord = {
            tagName: releases[0].tag_name,
            binaryPrefix: releases[0].type,
            githubUrl: config.gitBaseUrls[releases[0].type],
            machineTypes: machineTypes,
          }

          setCurrentRelease(resultFirstRecord)
        }
      })
  }, [])

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ border: '1px solid white', padding: '20px' }}>
        <div style={{ fontSize: '46px', fontWeight: '600' }}>Download Kaia</div>
        {currentRelease && (
          <div style={{ fontSize: '20px', fontWeight: '400' }}>
            {' '}
            {currentRelease.tag_name}{' '}
          </div>
        )}
        <br />
        <p>
          You can download the latest stable release of Kaia for our primary
          platforms below. Packages for all supported platforms, as well as
          develop builds, can be found further down the page. If you're looking
          to install Klaytn and/or associated tools via your favorite package
          manager, please check our installation guide.
        </p>
        {currentRelease && currentRelease.machineTypes ? (
          <Tabs>
            {currentRelease.machineTypes.map((_tab, _index) => (
              <TabItem
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
      <div style={{ border: '1px solid white', marginTop: '30px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            border: '1px solid white',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              padding: '10px',
              width: '200px',
              borderRight: '1px solid white',
              alignContent: 'center',
            }}
          >
            Stable releases
          </div>
          <div style={{ alignContent: 'center', padding: '10px' }}>
            These are the current and previous releases of Kaia, updated
            automatically when a new version is tagged in our{' '}
            <a style={{ textDecoration: 'underline' }} href={currentRelease?.githubUrl}>
              GitHub repository.
            </a>
          </div>
        </div>
        {currentRelease && currentRelease.machineTypes ? (
          <Tabs>
            {currentRelease.machineTypes.map((_tab, _index) => (
              <TabItem
                value={_tab.machineType.toLocaleLowerCase()}
                label={_tab.machineType.toUpperCase()}
                default={_tab.default}
              >
                <StableRelease
                  tabConfig={currentRelease.machineTypes.filter(
                    (_machine) => _machine.machineType == _tab.machineType
                  )}
                  releaseData={releases}
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
    </div>
  )
}
