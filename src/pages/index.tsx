import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styled from 'styled-components';
import { useColorMode } from '@docusaurus/theme-common';
import bannerImgLight from '../images/banner_L.png';
import bannerImgDark from '../images/banner_D.png';
import titleImgLight from '../images/title_L.png';
import titleImgDark from '../images/title_D.png';

import { View } from '../components';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate, { translate } from '@docusaurus/Translate';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  const { colorMode } = useColorMode();

  const bannerImg = colorMode === 'dark' ? bannerImgDark : bannerImgLight;
  const titleImg = colorMode === 'dark' ? titleImgDark : titleImgLight;

  const StyledHeaderBox = styled(View)`
    background-image: url(${bannerImg});
    padding: 60px 0;
    align-items: center;
  `;

  const tagline = siteConfig.tagline

  return (
    <StyledHeaderBox>
      <img src={titleImg} alt={siteConfig.title} className="styled-title-image" />
      <p style={{ color: 'inherit' }}>
        <Translate values={{ tagline: tagline }}>{'{tagline}'}</Translate>
      </p>
    </StyledHeaderBox>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Welcome to the Kaia Docs"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
