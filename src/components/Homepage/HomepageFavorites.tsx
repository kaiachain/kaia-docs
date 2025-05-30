import React from 'react';
import Link from '@docusaurus/Link';
import styled from 'styled-components';
import { useColorMode } from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate';

// Import shared utility and component from src/common
import { formatDate } from '@site/src/common/dateUtils';
import SharedUpdateTypeBadge from '@site/src/common/UpdateTypeBadge';

// Import your JSON data
import docUpdatesData from '@site/src/common/docUpdates.json';

// --- Type Definitions ---
type FavoriteType = 'gettingStarted' | 'metamask' | 'snapshot' | 'rpc' | 'explorers' | 'wallets';
type BadgeType = 'NEW_CONTENT' | 'NEW_FEATURE' | 'UPDATE' | 'MILESTONE';

interface Favorite {
  type: FavoriteType;
  link: string;
}

interface HomepageUpdateItem {
  version: string;
  date: string;
  title: string;
  updateType: BadgeType;
  summary: string;
  primaryDocLink?: string;
  showInWhatsNew?: boolean;
}

// --- Static Data for Favorites ---
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

// --- Styled Components  ---
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
  margin-bottom: 20px;
  
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
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: var(--ifm-link-color);
    text-decoration: none;
    background-color: ${({ themeMode }) => (themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')};
  }
`;

const NewDocDate = styled.div<{ themeMode: string }>`
  font-size: 0.8rem;
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
  font-size: 1.15rem;
  margin: 0 0 6px 0;
  color: inherit;
  transition: color 0.3s;
  line-height: 1.3;

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
  font-size: 0.9rem;
  margin: 0;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#e5e7eb' : '#4b5563')};
  flex-grow: 1;
`;

const ViewMoreLink = styled(Link)`
  display: inline-block;
  margin-top: 12px;
  font-weight: bold;
  transition: text-decoration 0.3s;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

// --- React Components ---

const FavoriteContent = ({ favorite }: { favorite: Favorite }) => {
  const { colorMode } = useColorMode();
  // This component remains unchanged
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

const getTranslatedBadgeText = (updateType: BadgeType): string => {
  switch (updateType) {
    case 'NEW_CONTENT':
      return translate({
        id: 'homepage.newDocs.badge.newContent',
        message: 'NEW CONTENT',
        description: 'Badge text for new content',
      });
    case 'NEW_FEATURE':
      return translate({
        id: 'homepage.newDocs.badge.newFeature',
        message: 'NEW FEATURE',
        description: 'Badge text for new features',
      });
    case 'UPDATE':
      return translate({
        id: 'homepage.newDocs.badge.update',
        message: 'UPDATE',
        description: 'Badge text for updated documents',
      });
    case 'MILESTONE':
       return translate({
        id: 'homepage.newDocs.badge.milestone',
        message: 'MILESTONE',
        description: 'Badge text for milestone updates',
      });
    default:
      return updateType;
  }
};

const HomepageUpdateCard = ({ doc }: { doc: HomepageUpdateItem }) => {
  const { colorMode } = useColorMode();
  const itemLink = doc.primaryDocLink || '/misc/updates';

  return (
    <NewDocItem to={itemLink} themeMode={colorMode}>
      <div style={{ marginBottom: '10px', alignSelf: 'flex-start' }}>
        <SharedUpdateTypeBadge type={doc.updateType} themeMode={colorMode}>
          {getTranslatedBadgeText(doc.updateType)}
        </SharedUpdateTypeBadge>
      </div>
      <NewDocDate themeMode={colorMode}>
        {formatDate(doc.date, 'short')}
      </NewDocDate>
      <NewDocTitle themeMode={colorMode}>
        {doc.title}
      </NewDocTitle>
      <NewDocDescription themeMode={colorMode}>
        {doc.summary}
      </NewDocDescription>
    </NewDocItem>
  );
};

const HomepageFavorites: React.FC = () => {
  const { colorMode } = useColorMode();

  const allUpdates = (docUpdatesData.updates || []) as HomepageUpdateItem[];

  // Filter updates for "What's New", sort them, and then take the top 3
  const featuredUpdates = allUpdates
    .filter(update => update.showInWhatsNew === true) // Filter by the new field
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date, most recent first
    .slice(0, 3); // Take the latest 3 of the featured updates

  return (
    <Container>
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
        
        {featuredUpdates.length > 0 ? (
          <NewDocRow>
            {/* Render the filtered and sliced featuredUpdates */}
            {featuredUpdates.map((doc, index) => (
              <HomepageUpdateCard key={`${doc.version}-${doc.date}-${index}`} doc={doc} />
            ))}
          </NewDocRow>
        ) : (
          <p>
            <Translate id="homepage.newDocs.noFeaturedUpdates" description="Text shown when no featured updates are available">
              No featured updates to display at the moment.
            </Translate>
          </p>
        )}
        <ViewMoreLink to="/misc/updates">
          <Translate id="homepage.newDocs.viewMore" description="Link text to view more updates">
            View All Updates
          </Translate> &rarr;
        </ViewMoreLink>
      </div>
      
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