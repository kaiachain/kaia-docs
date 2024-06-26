import React from 'react'
import Link from '@docusaurus/Link'
import styled from 'styled-components'
import { useColorMode } from '@docusaurus/theme-common';

// Import both light and dark theme images
import img1Light from '../../images/thum_01_L.png';
import img2Light from '../../images/thum_02_L.png';
import img3Light from '../../images/thum_03_L.png';
import img4Light from '../../images/thum_04_L.png';
/*
import img5Light from '../../images/thum_05_L.png';
import img6Light from '../../images/thum_06_L.png';
*/

import img1Dark from '../../images/thum_01_D.png'; // Assuming you have dark versions
import img2Dark from '../../images/thum_02_D.png';
import img3Dark from '../../images/thum_03_D.png';
import img4Dark from '../../images/thum_04_D.png';
/*
import img5Dark from '../../images/thum_05_D.png';
import img6Dark from '../../images/thum_06_D.png';
*/

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
  grid-template-columns: repeat(4, 1fr);
  padding: 60px 0;
  gap: 40px;

  @media ${style.media.tablet} {
    grid-template-columns: 1fr;
  }
`

// Style the Feature component as a card
const StyledFeature = styled(View)`
  padding: 0;
  border-radius: 10px; /* Round the corners */
  text-align: center;
  overflow: hidden;
  transition: transform 0.2s ease; /* Add a smooth hover effect */
  background-color: ${() => {
    const { colorMode } = useColorMode();
    return colorMode === 'dark' ? 'black' : 'inherit';
  }};
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px); /* Lift the card slightly on hover */
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.15), 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`

const StyledImgBox = styled(View)`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`

// Create a new styled component for the image
const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

// Create a new styled component for the content
const StyledContent = styled(View)`
  padding: 20px;
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
  /*
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
  */
]

function Feature({ imgSrcLight, imgSrcDark, title, description, to }: FeatureType) {
  const { colorMode } = useColorMode();
  const imgSrc = colorMode === 'dark' ? imgSrcDark : imgSrcLight;
  return (
    <StyledFeature>
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <StyledImgBox>
          <StyledImg src={imgSrc} alt={title.toString()} />
        </StyledImgBox>
        <StyledContent>
          <h3>{title}</h3>
          <p>{description}</p>
        </StyledContent>
      </Link>
    </StyledFeature>
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