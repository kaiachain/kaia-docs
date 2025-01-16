import React from 'react';
import Link from '@docusaurus/Link';
import styled from 'styled-components';
import { useColorMode } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';

const TRANSLATIONS = {
  ethersjs: 'Ethers.js Extension',
  web3js: 'Web3.js Extension',
  web3j: 'Web3j Extension',
  web3py: 'Web3.py Extension',
};

type SDKType = keyof typeof TRANSLATIONS;

interface SDKData {
  type: SDKType;
  to: string;
  icon: string;
}

const sdks: SDKData[] = [
  { 
    type: 'ethersjs',
    to: '/references/sdk/ethers-ext/getting-started',
    icon: require('@site/src/images/ethers-js.png').default
  },
  { 
    type: 'web3js',
    to: '/references/sdk/web3js-ext/getting-started',
    icon: require('@site/src/images/web3-js.png').default
  },
  { 
    type: 'web3j',
    to: '/references/sdk/web3j-ext/getting-started',
    icon: require('@site/src/images/web3-j.png').default
  },
  { 
    type: 'web3py',
    to: '/references/sdk/web3py-ext/getting-started',
    icon: require('@site/src/images/web3-py.png').default
  },
];

const StyledSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const SectionTitle = styled.h2<{ themeMode: string }>`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: var(--ifm-link-color);
`;

const MainHeading = styled.h3<{ themeMode: string }>`
  font-size: 2rem;
  margin-bottom: 8px;
  color: var(--ifm-heading-color);
`;

const Description = styled.p<{ themeMode: string }>`
  margin-bottom: 32px;
  color: var(--ifm-color-emphasis-700);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  margin-bottom: 40px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SDKLink = styled(Link)<{ themeMode: string }>`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--ifm-color-emphasis-300);
  color: inherit;
  transition: all 0.3s;

  &:hover {
    border-color: var(--ifm-color-primary);
    color: var(--ifm-color-primary);
    text-decoration: none;
  }
`;

const SDKIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 8px;
`;

const SDKName = styled.span`
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 8px;
  font-weight: bold;
  transition: text-decoration 0.3s;

  &:hover {
    text-decoration: underline;
  }
`;

const SDK = ({ sdk }: { sdk: SDKData }) => {
  const { colorMode } = useColorMode();
  
  return (
    <SDKLink to={sdk.to} themeMode={colorMode}>
      <SDKIcon src={sdk.icon} alt={sdk.type} />
      <SDKName>
        {sdk.type === 'ethersjs' && (
          <Translate id="homepage.sdk.ethersjs.name" description="Name of the Ethers.js Extension SDK">
            Ethers.js Extension
          </Translate>
        )}
        {sdk.type === 'web3js' && (
          <Translate id="homepage.sdk.web3js.name" description="Name of the Web3.js Extension SDK">
            Web3.js Extension
          </Translate>
        )}
        {sdk.type === 'web3j' && (
          <Translate id="homepage.sdk.web3j.name" description="Name of the Web3j Extension SDK">
            Web3j Extension
          </Translate>
        )}
        {sdk.type === 'web3py' && (
          <Translate id="homepage.sdk.web3py.name" description="Name of the Web3.py Extension SDK">
            Web3.py Extension
          </Translate>
        )}
      </SDKName>
    </SDKLink>
  );
};

export default function HomepageSDK() {
  const { colorMode } = useColorMode();

  return (
    <StyledSection>
      <SectionTitle themeMode={colorMode}>
        <Translate
          id="homepage.sdk.section.title"
          description="Title of the SDK documentation section">
          SDK Documentation
        </Translate>
      </SectionTitle>

      <MainHeading themeMode={colorMode}>
        <Translate
          id="homepage.sdk.section.heading"
          description="Main heading of the SDK section">
          Build freely with tools tailored for your language.
        </Translate>
      </MainHeading>

      <Description themeMode={colorMode}>
        <Translate
          id="homepage.sdk.section.description"
          description="Description of Kaia Network's SDK offerings">
          Seamlessly integrate with Kaia Network using our enhanced SDKs for JavaScript, Java, Python and more. Built on trusted foundations like Ethers, Web3.js, Web3j, and Web3.py, our libraries give you the power to submit transactions, read smart contracts, and develop complex applications with extended functionality - all in your preferred programming language.
        </Translate>
      </Description>

      <GridContainer>
        {sdks.map((sdk) => (
          <SDK key={sdk.to} sdk={sdk} />
        ))}
      </GridContainer>

      <StyledLink to="/references/sdk">
        <Translate
          id="homepage.sdk.section.viewMore"
          description="Link text to view additional SDKs">
          View More SDKs
        </Translate> &rarr;
      </StyledLink>
    </StyledSection>
  );
}