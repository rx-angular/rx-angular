import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.css';

function HomepageHeader(): JSX.Element {
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <img
          className={styles.heroLogo}
          src="img/logo.svg"
          width="88"
          height="88"
          alt="RxAngular"
        />
        <p className={styles.eyebrow}>Signals first. Zoneless by default.</p>
        <h1 className={styles.heroTitle}>
          Reactive Angular.{' '}
          <span className={styles.grad}>Without the zone.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          A reactive toolset for Angular that picks up where signals leave off.
          It handles state that turns global, complex, or async, and keeps
          rendering fast without Zone.js.
        </p>
        <div className={styles.heroCtas}>
          <Link className={styles.btnPrimary} to="/docs/state">
            Get started
          </Link>
          <a className={styles.btnGhost} href="#packages">
            Pick your package
          </a>
        </div>
        <p className={styles.heroPackages}>
          state <b>·</b> template <b>·</b> cdk <b>·</b> isr <b>·</b>{' '}
          eslint-plugin
        </p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main className={styles.main}>
        <section id="packages" className={styles.packages}>
          <h2 className={styles.sectionTitle}>One toolset. Five packages.</h2>
          <p className={styles.sectionLede}>
            RxAngular is a toolset for fully reactive Angular apps. The focus is
            runtime performance and template rendering.
          </p>
          <HomepageFeatures />
        </section>

        <section className={styles.benefits}>
          <h2 className={styles.sectionTitle}>Why RxAngular</h2>
          <ul className={styles.benefitGrid}>
            <li className={styles.benefitCard}>
              <strong>Signals first,</strong> so RxAngular fits right into a
              modern Angular app
            </li>
            <li className={styles.benefitCard}>
              <strong>Fast by default</strong> with a small bundle and
              exceptional runtime speed
            </li>
            <li className={styles.benefitCard}>
              <strong>Well typed and well tested,</strong> reliable as your
              codebase grows
            </li>
            <li className={styles.benefitCard}>
              <strong>Lean and simple</strong> with no boilerplate
            </li>
            <li className={styles.benefitCard}>
              <strong>Backwards compatible</strong> with older Angular versions
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
