import React from 'react';
import Link from '@docusaurus/Link';
import styled from 'styled-components';
import { useColorMode } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';
import rpcApiDark from '../../images/rpc-api-dark.png';
import rpcApiLight from '../../images/rpc-api-light.png';

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

const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ImageColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2<{ themeMode: string }>`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: var(--ifm-link-color);
`;

const Heading = styled.h3<{ themeMode: string }>`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#ffffff' : '#000000')};
`;

const Description = styled.p<{ themeMode: string }>`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#e5e7eb' : '#4b5563')};
`;

const StyledLink = styled(Link)`
  display: inline-block;
  font-size: 1.125rem;
  font-weight: bold;
  transition: text-decoration 0.3s;

  &:hover {
    text-decoration: underline;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
`;

const HomepageAPIRef: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <Container>
      <ContentColumn>
        <Title themeMode={colorMode}>
          <Translate>JSON-RPC API Reference</Translate>
        </Title>
        <Heading themeMode={colorMode}>
          <Translate>Discover and Engage with Kaia's JSON-RPC APIs</Translate>
        </Heading>
        <Description themeMode={colorMode}>
          <Translate>
            Unlock Kaia's full potential with our interactive API documentation. Test API calls directly in the docs, 
            explore detailed request and response examples, and generate code snippets in curl, Python, Node.js, and Java. 
            Whether developing new applications or integrating with existing systems, our comprehensive API reference 
            provides the tools for efficient development on the Kaia platform.
          </Translate>
        </Description>
        <StyledLink to="/references/json-rpc/references">
          <Translate>Get started with Kaia's JSON RPC APIs</Translate> &rarr;
        </StyledLink>
      </ContentColumn>
      <ImageColumn>
        <Image
          src={colorMode === 'dark' ? rpcApiDark : rpcApiLight}
          alt={colorMode === 'dark' ? 'Kaia API Dark Theme' : 'Kaia API Light Theme'}
          loading="lazy"
        />
      </ImageColumn>
    </Container>
  );
};

export default HomepageAPIRef;