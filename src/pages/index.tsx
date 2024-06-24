import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styled from 'styled-components';
import { useColorMode } from '@docusaurus/theme-common'; // Import useColorMode
import bannerImgLight from '../images/banner_L.png'; // Light theme banner
import bannerImgDark from '../images/banner_D.png';  // Dark theme banner

import { View } from '../components';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate, { translate } from '@docusaurus/Translate';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  const { colorMode } = useColorMode(); // Get current color mode

  // Conditionally set banner image based on color mode
  const bannerImg = colorMode === 'dark' ? bannerImgDark : bannerImgLight;
  const StyledHeaderBox = styled(View)`
  background-image: url(${bannerImg});
  padding: 60px 0;
  align-items: center;
`;

  const title = siteConfig.title
  const tagline = siteConfig.tagline

  return (
    <StyledHeaderBox>
      <h1 style={{ color: 'inherit' }}>
        <Translate values={{ title: title }}>{'{title}'}</Translate>
      </h1>
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
