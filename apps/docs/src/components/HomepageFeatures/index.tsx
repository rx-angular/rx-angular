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
    blurb:
      'Reactive local and global state, merged from async sources and read as signals.',
    to: '/docs/packages/state/',
  },
  {
    name: '@rx-angular/template',
    blurb: 'Reactive rendering that updates one row at a time.',
    to: '/docs/packages/template/',
  },
  {
    name: '@rx-angular/cdk',
    blurb: 'The low-level reactive primitives the toolkit is built on.',
    to: '/docs/packages/cdk/',
  },
  {
    name: '@rx-angular/isr',
    blurb: 'Incremental Static Regeneration for Angular SSR.',
    to: '/docs/packages/isr/',
  },
  {
    name: '@rx-angular/eslint-plugin',
    blurb: 'Lint rules that keep an app reactive and zoneless.',
    to: '/docs/packages/eslint-plugin/',
  },
  {
    name: '@rx-angular/rebundle',
    blurb: 'Fewer, smarter chunks from Angular esbuild builds.',
    to: '/docs/packages/rebundle/',
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
