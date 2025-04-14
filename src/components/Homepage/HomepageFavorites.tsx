import React from 'react';
import Link from '@docusaurus/Link';
import styled from 'styled-components';
import { useColorMode } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';

type FavoriteType = 'gettingStarted' | 'metamask' | 'snapshot' | 'rpc' | 'explorers' | 'wallets';
type NewDocType = 'surveyMinidapp' | 'unityMinidapp' | 'cocosMinidapp';
type BadgeType = 'NEW' | 'UPDATE';

interface Favorite {
  type: FavoriteType;
  link: string;
}

interface NewDoc {
  type: NewDocType;
  link: string;
  date: string;
  badgeType: BadgeType;
}

const leftFavorites: Favorite[] = [
  { type: 'gettingStarted', link: '/build/get-started/hardhat' },
  { type: 'metamask', link: '/build/tutorials/connecting-metamask' },
  { type: 'snapshot', link: '/misc/operation/chaindata-snapshot' },
];

const rightFavorites: Favorite[] = [
  { type: 'rpc', link: '/references/public-en' },
  { type: 'explorers', link: '/build/tools/block-explorers' },
  { type: 'wallets', link: '/build/tools/wallets' },
];

const newDocs: NewDoc[] = [
  { 
    type: 'surveyMinidapp', 
    link: '/minidapps/survey-minidapp/intro', 
    date: '2025-03-06',
    badgeType: 'NEW'
  },
  { 
    type: 'unityMinidapp', 
    link: '/minidapps', 
    date: '2025-03-05',
    badgeType: 'UPDATE'
  },
  { 
    type: 'cocosMinidapp', 
    link: '/minidapps/cocos-creator', 
    date: '2025-03-04',
    badgeType: 'NEW'
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  
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

const SectionSubtitle = styled.p<{ themeMode: string }>`
  font-size: 1.1rem;
  margin-bottom: 25px;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#e5e7eb' : '#4b5563')};
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

const NewDocRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const NewDocItem = styled(Link)<{ themeMode: string }>`
  flex: 1;
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
`;

const NewDocBadge = styled.span<{ badgeType: BadgeType; themeMode: string }>`
  display: inline-block;
  background: ${({ badgeType }) => 
    badgeType === 'NEW' ? 'var(--ifm-link-color)' : '#FF9800'};
  color: ${({ themeMode }) => themeMode === 'dark' ? '#000000' : '#ffffff'};
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const NewDocDate = styled.div<{ themeMode: string }>`
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#9ca3af' : '#6b7280')};
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

const NewDocTitle = styled.h4<{ themeMode: string }>`
  font-size: 1.25rem;
  margin: 8px 0 6px 0;
  color: inherit;
  transition: color 0.3s;

  ${NewDocItem}:hover & {
    color: var(--ifm-link-color);
  }
`;

const FavoriteDescription = styled.p<{ themeMode: string }>`
  font-size: 1rem;
  margin: 0;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#e5e7eb' : '#4b5563')};
`;

const NewDocDescription = styled.p<{ themeMode: string }>`
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
  
  return (
    <FavoriteItem to={favorite.link} themeMode={colorMode}>
      <FavoriteTitle themeMode={colorMode}>
        {favorite.type === 'gettingStarted' && (
          <Translate id="homepage.favorites.gettingStarted.title" description="Title for Getting Started guide">
            Getting Started
          </Translate>
        )}
        {favorite.type === 'metamask' && (
          <Translate id="homepage.favorites.metamask.title" description="Title for MetaMask guide">
            MetaMask Guide
          </Translate>
        )}
        {favorite.type === 'snapshot' && (
          <Translate id="homepage.favorites.snapshot.title" description="Title for Node Snapshot guide">
            Node Snapshot Guide
          </Translate>
        )}
        {favorite.type === 'rpc' && (
          <Translate id="homepage.favorites.rpc.title" description="Title for RPC Endpoints">
            Public JSON RPC Endpoints
          </Translate>
        )}
        {favorite.type === 'explorers' && (
          <Translate id="homepage.favorites.explorers.title" description="Title for Block Explorers section">
            Block Explorers
          </Translate>
        )}
        {favorite.type === 'wallets' && (
          <Translate id="homepage.favorites.wallets.title" description="Title for Wallets section">
            Wallets
          </Translate>
        )}
      </FavoriteTitle>
      <FavoriteDescription themeMode={colorMode}>
        {favorite.type === 'gettingStarted' && (
          <Translate id="homepage.favorites.gettingStarted.description" description="Description for Getting Started guide">
            Deploy your first smart contract using Hardhat.
          </Translate>
        )}
        {favorite.type === 'metamask' && (
          <Translate id="homepage.favorites.metamask.description" description="Description for MetaMask guide">
            Connect MetaMask to Kaia.
          </Translate>
        )}
        {favorite.type === 'snapshot' && (
          <Translate id="homepage.favorites.snapshot.description" description="Description for Node Snapshot guide">
            Use Chaindata Snapshots.
          </Translate>
        )}
        {favorite.type === 'rpc' && (
          <Translate id="homepage.favorites.rpc.description" description="Description for RPC Endpoints">
            Build and test your products without running your own node.
          </Translate>
        )}
        {favorite.type === 'explorers' && (
          <Translate id="homepage.favorites.explorers.description" description="Description for Block Explorers section">
            Search for real-time and historical information about Kaia.
          </Translate>
        )}
        {favorite.type === 'wallets' && (
          <Translate id="homepage.favorites.wallets.description" description="Description for Wallets section">
            Integrate and secure digital assets seamlessly.
          </Translate>
        )}        
      </FavoriteDescription>
    </FavoriteItem>
  );
};

const NewDocContent = ({ doc }: { doc: NewDoc }) => {
  const { colorMode } = useColorMode();
  
  return (
    <NewDocItem to={doc.link} themeMode={colorMode}>
      <NewDocBadge badgeType={doc.badgeType} themeMode={colorMode}>
        {doc.badgeType === 'NEW' ? (
          <Translate id="homepage.newDocs.badge.new" description="Badge text for new documents">
            NEW
          </Translate>
        ) : (
          <Translate id="homepage.newDocs.badge.update" description="Badge text for updated documents">
            UPDATE
          </Translate>
        )}
      </NewDocBadge>
      <NewDocDate themeMode={colorMode}>
        {new Date(doc.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}
      </NewDocDate>
      <NewDocTitle themeMode={colorMode}>
        {doc.type === 'surveyMinidapp' && (
          <Translate id="homepage.newDocs.surveyMinidapp.title" description="Title for Survey Mini DApp doc">
            Building a Survey DApp on Kaia
          </Translate>
        )}
        {doc.type === 'unityMinidapp' && (
          <Translate id="homepage.newDocs.unityMinidapp.title" description="Title for Unity Mini DApp doc">
            Creating a LINE Mini DApp with Unity
          </Translate>
        )}
        {doc.type === 'cocosMinidapp' && (
          <Translate id="homepage.newDocs.cocosMinidapp.title" description="Title for Cocos Mini DApp doc">
            Guide to LINE Mini DApp Creation Using Cocos Creator
          </Translate>
        )}
      </NewDocTitle>
      <NewDocDescription themeMode={colorMode}>
        {doc.type === 'surveyMinidapp' && (
          <Translate id="homepage.newDocs.surveyMinidapp.description" description="Description for Upgradeable Smart Contracts doc">
            Build a privacy-focused, decentralized survey application on Kaia using Semaphore for anonymity and LINE for social features.
          </Translate>
        )}
        {doc.type === 'unityMinidapp' && (
          <Translate id="homepage.newDocs.unityMinidapp.description" description="Description for DApp Security doc">
            Develop a fully integrated LINE mini dApp with Unity that seamlessly combines Web3 connectivity, intuitive UI design, and LIFF conversion.
          </Translate>
        )}
        {doc.type === 'cocosMinidapp' && (
          <Translate id="homepage.newDocs.cocosMinidapp.description" description="Description for API Updates doc">
            Create, integrate, and deploy LINE mini dApps with Cocos Creator, Web3, and LIFF. 
          </Translate>
        )}
      </NewDocDescription>
    </NewDocItem>
  );
};

const HomepageFavorites: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <Container>
      {/* New "What's New" Section */}
      <div>
        <SectionTitle themeMode={colorMode}>
          <Translate id="homepage.newDocs.title" description="Title for the What's New section">
            What's New
          </Translate>
        </SectionTitle>
        <SectionSubtitle themeMode={colorMode}>
          <Translate id="homepage.newDocs.subtitle" description="Subtitle for the What's New section">
            Explore our latest updates and additions to the docs.
          </Translate>
        </SectionSubtitle>
        
        <NewDocRow>
          {newDocs.map((doc) => (
            <NewDocContent key={doc.link} doc={doc} />
          ))}
        </NewDocRow>
      </div>
      
      {/* Original Favorites Section */}
      <FavoritesContainer>
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
      </FavoritesContainer>
    </Container>
  );
};

export default HomepageFavorites;