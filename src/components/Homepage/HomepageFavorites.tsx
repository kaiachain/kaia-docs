import React from 'react';
import Link from '@docusaurus/Link';
import styled from 'styled-components';
import { useColorMode } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';

const TRANSLATIONS = {
  gettingStarted: {
    title: (
      <Translate id="homepage.favorites.gettingStarted.title" description="Title for Getting Started guide">
        Getting Started
      </Translate>
    ),
    description: (
      <Translate id="homepage.favorites.gettingStarted.description" description="Description for Getting Started guide">
        Deploy your first smart contract using Hardhat.
      </Translate>
    ),
  },
  metamask: {
    title: (
      <Translate id="homepage.favorites.metamask.title" description="Title for MetaMask guide">
        MetaMask Guide
      </Translate>
    ),
    description: (
      <Translate id="homepage.favorites.metamask.description" description="Description for MetaMask guide">
        Connect MetaMask to Kaia.
      </Translate>
    ),
  },
  snapshot: {
    title: (
      <Translate id="homepage.favorites.snapshot.title" description="Title for Node Snapshot guide">
        Node Snapshot Guide
      </Translate>
    ),
    description: (
      <Translate id="homepage.favorites.snapshot.description" description="Description for Node Snapshot guide">
        Use Chaindata Snapshots.
      </Translate>
    ),
  },
  rpc: {
    title: (
      <Translate id="homepage.favorites.rpc.title" description="Title for Public JSON RPC Endpoints">
        Public JSON RPC Endpoints
      </Translate>
    ),
    description: (
      <Translate id="homepage.favorites.rpc.description" description="Description for Public JSON RPC Endpoints">
        Build and test your products without running your own node.
      </Translate>
    ),
  },
  wallets: {
    title: (
      <Translate id="homepage.favorites.wallets.title" description="Title for Wallets section">
        Wallets
      </Translate>
    ),
    description: (
      <Translate id="homepage.favorites.wallets.description" description="Description for Wallets section">
        Integrate and secure digital assets seamlessly.
      </Translate>
    ),
  },
  indexers: {
    title: (
      <Translate id="homepage.favorites.indexers.title" description="Title for Indexers section">
        Indexers
      </Translate>
    ),
    description: (
      <Translate id="homepage.favorites.indexers.description" description="Description for Indexers section">
        Query and index blockchain data for efficient dApp performance.
      </Translate>
    ),
  },
};

type FavoriteType = keyof typeof TRANSLATIONS;

interface Favorite {
  type: FavoriteType;
  link: string;
}

const leftFavorites: Favorite[] = [
  { type: 'gettingStarted', link: '/build/get-started/hardhat' },
  { type: 'metamask', link: '/build/tutorials/connecting-metamask' },
  { type: 'snapshot', link: '/misc/operation/chaindata-snapshot' },
];

const rightFavorites: Favorite[] = [
  { type: 'rpc', link: '/references/public-en' },
  { type: 'wallets', link: '/build/tools/wallets' },
  { type: 'indexers', link: '/build/tools/indexers' },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 40px;
    align-items: flex-start;
  }
`;

const Column = styled.div<{ themeMode: string }>`
  flex: 1;

  @media (min-width: 768px) {
    &:last-child {
      border-left: 1px solid ${({ themeMode }) => (themeMode === 'dark' ? '#303846' : '#eaecef')};
      padding-left: 40px;
    }
  }
`;

const SectionTitle = styled.h3<{ themeMode: string }>`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#ffffff' : '#000000')};
`;

const FavoriteItem = styled(Link)<{ themeMode: string }>`
  display: block;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid transparent;
  text-decoration: none;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#ffffff' : '#000000')};
  background-color: ${({ themeMode }) => (themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)')};
  transition: border-color 0.3s, background-color 0.3s;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: var(--ifm-link-color);
    text-decoration: none;
    background-color: ${({ themeMode }) => (themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')};
  }

  &::after {
    content: '›';
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: ${({ themeMode }) => (themeMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)')};
    transition: color 0.3s;
  }

  &:hover::after {
    color: var(--ifm-link-color);
  }
`;

const FavoriteTitle = styled.h4<{ themeMode: string }>`
  font-size: 1.25rem;
  margin-bottom: 6px;
  color: inherit;
  transition: color 0.3s;

  ${FavoriteItem}:hover & {
    color: var(--ifm-link-color);
  }
`;

const FavoriteDescription = styled.p<{ themeMode: string }>`
  font-size: 1rem;
  margin: 0;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#e5e7eb' : '#4b5563')};
`;

const ViewMoreLink = styled(Link)`
  display: inline-block;
  margin-top: 8px;
  font-weight: bold;
  transition: text-decoration 0.3s;

  &:hover {
    text-decoration: underline;
  }
`;

const FavoriteContent = ({ favorite }: { favorite: Favorite }) => {
  const { colorMode } = useColorMode();
  const translation = TRANSLATIONS[favorite.type];
  
  return (
    <FavoriteItem to={favorite.link} themeMode={colorMode}>
      <FavoriteTitle themeMode={colorMode}>
        {translation.title}
      </FavoriteTitle>
      <FavoriteDescription themeMode={colorMode}>
        {translation.description}
      </FavoriteDescription>
    </FavoriteItem>
  );
};

const HomepageFavorites: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <Container>
      <Column themeMode={colorMode}>
        <SectionTitle themeMode={colorMode}>
          <Translate id="homepage.favorites.guides.title" description="Title for the Popular Guides section">
            Popular Guides
          </Translate>
        </SectionTitle>
        {leftFavorites.map((favorite) => (
          <FavoriteContent key={favorite.link} favorite={favorite} />
        ))}
        <ViewMoreLink to="/build/tutorials">
          <Translate id="homepage.favorites.guides.viewMore" description="Link text to view more guides">
            View More Guides
          </Translate> &rarr;
        </ViewMoreLink>
      </Column>

      <Column themeMode={colorMode}>
        <SectionTitle themeMode={colorMode}>
          <Translate id="homepage.favorites.resources.title" description="Title for the Popular Resources section">
            Popular Resources
          </Translate>
        </SectionTitle>
        {rightFavorites.map((favorite) => (
          <FavoriteContent key={favorite.link} favorite={favorite} />
        ))}
        <ViewMoreLink to="/build/tools">
          <Translate id="homepage.favorites.resources.viewMore" description="Link text to view more resources">
            View More Resources
          </Translate> &rarr;
        </ViewMoreLink>
      </Column>
    </Container>
  );
};

export default HomepageFavorites;