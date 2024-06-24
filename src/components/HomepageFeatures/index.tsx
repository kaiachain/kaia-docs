import React from 'react'
import Link from '@docusaurus/Link'
import styled from 'styled-components'
import { useColorMode } from '@docusaurus/theme-common';

// Import both light and dark theme images
import img1Light from '../../images/thum_01_L.png';
import img2Light from '../../images/thum_02_L.png';
import img3Light from '../../images/thum_03_L.png';
import img4Light from '../../images/thum_04_L.png';
import img5Light from '../../images/thum_05_L.png';
import img6Light from '../../images/thum_06_L.png';

import img1Dark from '../../images/thum_01_D.png'; // Assuming you have dark versions
import img2Dark from '../../images/thum_02_D.png';
import img3Dark from '../../images/thum_03_D.png';
import img4Dark from '../../images/thum_04_D.png';
import img5Dark from '../../images/thum_05_D.png';
import img6Dark from '../../images/thum_06_D.png';

import View from '../View'
import style from '@site/src/consts/style'
import FormBgImg from '../FormBgImg'

import Translate, { translate } from '@docusaurus/Translate'

type FeatureType = {
  title: JSX.Element
  imgSrcLight: string; // Add a property for the light theme image
  imgSrcDark: string; // Add a property for the dark theme image
  description: JSX.Element
  to: string
}

const StyledSection = styled.section`
  ${style.setMediaWidth('lg')}
`

const StyledGrid = styled(View)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 60px 0;
  gap: 40px;

  @media ${style.media.tablet} {
    grid-template-columns: 1fr;
  }
`

const StyledImgBox = styled(View)`
  align-items: center;
  padding-bottom: 20px;
`

const featureList: FeatureType[] = [
  {
    title: <Translate>Kaia Overview</Translate>,
    imgSrcLight: img1Light, // Use the light theme image here
    imgSrcDark: img1Dark, // Use the dark theme image here
    description: <Translate>Want to know about Kaia?</Translate>,
    to: '/docs/learn',
  },
  {
    title: <Translate>Getting Started</Translate>,
    imgSrcLight: img2Light,
    imgSrcDark: img2Dark,
    description: <Translate>Want to start building on Kaia?</Translate>,
    to: '/docs/build',
  },
  {
    title: <Translate>Node Operators</Translate>,
    imgSrcLight: img3Light,
    imgSrcDark: img3Dark,
    description: <Translate>Instructions on running Kaia's nodes</Translate>,
    to: '/docs/nodes',
  },
  {
    title: <Translate>API references</Translate>,
    imgSrcLight: img4Light,
    imgSrcDark: img4Dark,
    description: <Translate>APIs and libraries</Translate>,
    to: '/docs/references',
  },
  {
    title: <Translate>Kaia Developer Hub</Translate>,
    imgSrcLight: img5Light,
    imgSrcDark: img5Dark,
    description: <Translate>Kaia's Developer portal</Translate>,
    to: 'https://developer.klaytn.foundation',
  },
  {
    title: <Translate>Kaia Developer Forum</Translate>,
    imgSrcLight: img6Light,
    imgSrcDark: img6Dark,
    description: <Translate>Got a question? Visit our forum!</Translate>,
    to: 'https://forum.klaytn.foundation',
  },
]

function Feature({ imgSrcLight, imgSrcDark, title, description, to }: FeatureType) {
  const { colorMode } = useColorMode();
  const imgSrc = colorMode === 'dark' ? imgSrcDark : imgSrcLight; // Select image based on theme
  return (
    <View>
      <Link to={to}>
        <StyledImgBox>
          <FormBgImg src={imgSrc} style={{ width: '100%', height: 150 }} />
        </StyledImgBox>
        <View style={{ alignItems: 'center' }}>
          <h3>{title}</h3>
          <p style={{ textAlign: 'center' }}> {description}</p>
        </View>
      </Link>
    </View>
  )
}

export default function HomepageFeatures() {
  return (
    <StyledSection>
      <StyledGrid>
        {featureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </StyledGrid>
    </StyledSection>
  )
}
