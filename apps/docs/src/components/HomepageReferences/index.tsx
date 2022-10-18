import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

type ReferenceItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  url: string;
  platforms: string[];
};

const ReferenceList: ReferenceItem[] = [
  {
    title: 'ClickUp',
    Svg: require('@site/static/img/references/clickup-logo.svg').default,
    description: <>Large scale application</>,
    url: 'https://clickup.com',
    platforms: ['Web'],
  },
  {
    title: 'Tape',
    Svg: require('@site/static/img/references/tape-logo.svg').default,
    description: <>Medium size project</>,
    url: 'https://get.tapeapp.com',
    platforms: ['Web', 'Mobile (ionic)'],
  },
  {
    title: 'Angular Movies App by TasteJS',
    Svg: require('@site/static/img/references/tastejs-logo.svg').default,
    description: <>Small project</>,
    url: 'https://angular-movies-a12d3.web.app',
    platforms: ['Web'],
  },
];

function Reference({
  Svg,
  title,
  description,
  url,
  platforms,
}: ReferenceItem): JSX.Element {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={url} target="_blank" rel="noopener">
          <Svg className={styles.referenceSvg} role="img" />
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <a href={url} target="_blank" rel="noopener">
          <h3>{title}</h3>
        </a>
        <p>{description}</p>
        <p>Platforms: {platforms.join(', ')}</p>
      </div>
    </div>
  );
}

export default function HomepageReferences(): JSX.Element {
  return (
    <section className={styles.references}>
      <div className="container">
        <div className="row">
          {ReferenceList.map((props, idx) => (
            <Reference key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
