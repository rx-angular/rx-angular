import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageReferences from '@site/src/components/HomepageReferences';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.css';

function HomepageHeader(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src="img/logo.png" />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/state/getting-started/overview"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <div className="text--center padding-horiz--md">
          <p>
            RxAngular offers a comprehensive toolset for handling fully reactive
            Angular applications with the main focus on runtime performance and
            template rendering.
          </p>
        </div>

        <div className="text--center padding-horiz--md">
          <p>RxAngular is divided into different packages:</p>
        </div>
        <HomepageFeatures />
        <div className="text--center padding-horiz--md">
          <p>
            Used together, you get a powerful tool for developing
            high-performance angular applications with or without NgZone.
          </p>
        </div>

        <div className="text--center padding-horiz--md">
          <p>
            This repository holds a set of helpers to create
            <strong>fully reactive</strong> as well as
            <strong>fully zone-less</strong> applications.
          </p>
        </div>

        <div className="text--center padding-horiz--md">
          <h3>Benefits</h3>
          <ul>
            <li>🔥 It's fast &amp; performance focused: exceptional runtime speed &amp; small bundle size</li>
            <li>✔ Easy upgrade paths: migration scripts included since beta! <code>ng update @rx-angular/&#123;cdk | template | state&#125;</code></li>
            <li>✔ Lean and simple: No boilerplate guaranteed</li>
            <li>✔ Well typed and tested</li>
            <li>✔ Backwards compatible: support for Angular > v11</li>
          </ul>
        </div>

        <div className="text--center padding-horiz--md">
          <h3>Used by</h3>
        </div>
        <HomepageReferences />
      </main>
    </Layout>
  );
}
