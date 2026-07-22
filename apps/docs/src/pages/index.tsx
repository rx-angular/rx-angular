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
        <p className={styles.eyebrow}>Smooth rendering, simpler state</p>
        <h1 className={styles.heroTitle}>
          Reactive Angular.{' '}
          <span className={styles.grad}>Without the zone.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          A reactive toolset for Angular that starts where signals stop: state
          that turns global, complex, or async, and rendering that stays fast in
          a zoneless app.
        </p>
        <div className={styles.heroCtas}>
          <Link className={styles.btnPrimary} to="/docs/start-here/">
            Start here
          </Link>
          <Link className={styles.btnGhost} to="/docs/concepts">
            Read the concepts
          </Link>
        </div>
        <p className={styles.heroPackages}>
          state <b>·</b> template <b>·</b> cdk <b>·</b> isr <b>·</b>{' '}
          eslint-plugin <b>·</b> rebundle
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
          <h2 className={styles.sectionTitle}>Six packages, one job each.</h2>
          <p className={styles.sectionLede}>
            Each package stands alone. Reach for signals and native control flow
            first, then add the one that fits your problem.
          </p>
          <HomepageFeatures />
        </section>

        <section className={styles.benefits}>
          <h2 className={styles.sectionTitle}>Why RxAngular</h2>
          <ul className={styles.benefitGrid}>
            <li className={styles.benefitCard}>
              <strong>Signals-first,</strong> it builds on signals and native
              control flow.
            </li>
            <li className={styles.benefitCard}>
              <strong>Frame-budgeted rendering,</strong> it yields to the
              browser so the UI stays responsive.
            </li>
            <li className={styles.benefitCard}>
              <strong>Strongly typed,</strong> with source-derived signatures
              that hold up as your codebase grows.
            </li>
            <li className={styles.benefitCard}>
              <strong>Tree-shakable,</strong> so you ship only the code you use.
            </li>
            <li className={styles.benefitCard}>
              <strong>Zoneless-ready,</strong> the way Angular 21 runs by
              default.
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
