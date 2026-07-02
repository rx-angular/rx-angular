import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.css';

type Package = {
  name: string;
  blurb: string;
  to: string;
};

const PACKAGES: Package[] = [
  {
    name: '@rx-angular/state',
    blurb: 'Reactive component and global state management.',
    to: '/docs/state',
  },
  {
    name: '@rx-angular/template',
    blurb: 'High-performance reactive template rendering.',
    to: '/docs/template',
  },
  {
    name: '@rx-angular/cdk',
    blurb: 'Low-level building blocks for reactive, zone-less UIs.',
    to: '/docs/cdk',
  },
  {
    name: '@rx-angular/isr',
    blurb: 'Incremental Static Regeneration for Angular SSR.',
    to: '/docs/isr',
  },
  {
    name: '@rx-angular/eslint-plugin',
    blurb: 'Lint rules that keep an app reactive and zone-less.',
    to: '/docs/eslint-plugin',
  },
];

export default function HomepageFeatures(): JSX.Element {
  return (
    <ul className={styles.grid}>
      {PACKAGES.map((pkg) => (
        <li key={pkg.name} className={styles.card}>
          <Link className={styles.cardLink} to={pkg.to}>
            <span className={styles.cardName}>{pkg.name}</span>
            <span className={styles.cardBlurb}>{pkg.blurb}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
