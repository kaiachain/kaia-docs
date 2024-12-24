import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/Homepage/HomepageFeatures';
import HomepageHeader from '../components/Homepage/HomepageHeader';
import HomepageFavorites from '../components/Homepage/HomepageFavorites';
import HomepageSDK from '../components/Homepage/HomepageSDK';
import HomepageAPIRef from '../components/Homepage/HomepageAPIRef';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Welcome to the Kaia Docs"
    >
      <div className={`layout-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <HomepageHeader />
        <main>
          <HomepageFeatures />
          <HomepageFavorites />
          <HomepageSDK />
          <HomepageAPIRef />
        </main>
      </div>
    </Layout>
  );
}