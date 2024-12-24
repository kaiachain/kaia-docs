import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styled from 'styled-components';
import { useColorMode } from '@docusaurus/theme-common';
import titleImgLight from '../../images/title_L.png';
import titleImgDark from '../../images/title_D.png';

import { View } from '../../components';
import Translate from '@docusaurus/Translate';

const StyledHeaderBox = styled(View)`
  padding: 60px 0;
  align-items: center;
`;

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode();

  const titleImg = colorMode === 'dark' ? titleImgDark : titleImgLight;
  const tagline = siteConfig.tagline;

  return (
    <StyledHeaderBox>
      <img src={titleImg} alt={siteConfig.title} className="styled-title-image" />
      <p style={{ color: 'inherit' }}>
        <Translate values={{ tagline: tagline }}>{'{tagline}'}</Translate>
      </p>
    </StyledHeaderBox>
  );
}