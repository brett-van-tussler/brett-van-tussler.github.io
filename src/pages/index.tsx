import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title" style={{ color: 'white' }}>
          {siteConfig.title}
        </Heading>

        <p className="hero__subtitle" style={{ color: 'white' }}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: 'white',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
              transform: 'scale(1.05)',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Welcome page
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  console.log('siteConfig.title (in Home):', siteConfig.title);
  return (
    <Layout
      description="You're never far from Home"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}