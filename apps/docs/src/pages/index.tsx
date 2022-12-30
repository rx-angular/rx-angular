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
            to="/docs/state"
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
            This repository holds a set of helpers to create{' '}
            <strong>fully reactive</strong> as well as{' '}
            <strong>fully zone-less</strong> applications.
          </p>
        </div>

        <div className="text--center padding-horiz--md">
          <h3>Benefits</h3>
          <ul>
            <li>
              🔥 It's fast &amp; performance focused: exceptional runtime speed
              &amp; small bundle size
            </li>
            <li>
              ✔ Easy upgrade paths: migration scripts included since beta!{' '}
              <code>
                ng update @rx-angular/&#123;cdk | template | state&#125;
              </code>
            </li>
            <li>✔ Lean and simple: No boilerplate guaranteed</li>
            <li>✔ Well typed and tested</li>
            <li>✔ Backwards compatible: support for Angular &gt; v11</li>
          </ul>
        </div>

        <div className="text--center padding-horiz--md">
          <h3>Used by</h3>
        </div>
        <HomepageReferences />

        <div className="text--center padding-horiz--md">
          <h3>Version Compatibility</h3>
          <div className="wrapper__table">
            <table style={{ display: 'inline-block' }}>
              <tr>
                <th>Angular</th>
                <th>RxJS</th>
                <th>
                  <code>@rx-angular/state</code>
                </th>
                <th>
                  <code>@rx-angular/template</code>
                </th>
                <th>
                  <code>@rx-angular/cdk</code>
                </th>
              </tr>
              <tr>
                <td>
                  <code>14</code>
                </td>
                <td>
                  <code>^7.4.0</code>
                </td>
                <td>
                  <code>&gt; 1.4.6</code>
                </td>
                <td>
                  <code>&gt; 1.0.0-beta.29</code>
                </td>
                <td>
                  <code>&gt; 1.0.0-alpha.10</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>^12.0.0</code> or <code>^13.0.0</code>
                </td>
                <td>
                  <code>^6.5.5</code> or <code>^7.4.0</code>
                </td>
                <td>
                  <code>&gt; 1.4.6</code>
                </td>
                <td>
                  <code>&gt; 1.0.0-beta.29</code>
                </td>
                <td>
                  <code>&gt; 1.0.0-alpha.10</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>^11.0.0</code>
                </td>
                <td>
                  <code>^6.5.5</code>
                </td>
                <td>
                  <code>&lt;= 1.4.6</code>
                </td>
                <td>
                  <code>&lt;= 1.0.0-beta.29</code>
                </td>
                <td>
                  <code>&lt;= 1.0.0-alpha.10</code>
                </td>
              </tr>
            </table>
          </div>
          <p>
            Regarding the compatibility to RxJs, we generally stick to the
            compatibilities of the angular framework itself.
          </p>
          <p>
            All the packages support RxJs versions <code>^6.5.5 || ^7.4.0</code>
            .
          </p>
          <p>
            For more information about the compatibilities of angular itself see
            this{' '}
            <a
              href="https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3"
              target="_blank"
              rel="noopener"
            >
              gist
            </a>
          </p>
        </div>
      </main>
    </Layout>
  );
}
