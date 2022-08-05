import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  url: string | null;
};

const FeatureList: FeatureItem[] = [
  {
    title: '@rx-angular/cdk',
    Svg: require('@site/static/img/undraw_rxangular_composition.svg').default,
    description: (
      <>
        A Component Development Kit for High performance and ergonomic Angular
        UI libs and large scale applications.
      </>
    ),
    url: 'docs/cdk/api/transformation-helpers',
  },
  {
    title: '@rx-angular/state',
    Svg: require('@site/static/img/undraw_rxangular_data_processing.svg')
      .default,
    description: <>Reactive Component State-Management.</>,
    url: 'docs/state/getting-started/overview',
  },
  {
    title: '@rx-angular/template',
    Svg: require('@site/static/img/undraw_rxangular_progressive_app.svg')
      .default,
    description: <>High-Performance Reactive Template Rendering for Angular.</>,
    url: null,
  },
];

function Image({
  Svg,
}: {
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
}): JSX.Element {
  return <Svg className={styles.featureSvg} role="img" />;
}

function Heading({ title }: { title: string }): JSX.Element {
  return <h3>{title}</h3>;
}

function Feature({ Svg, title, description, url }: FeatureItem): JSX.Element {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {url ? (
          <a href={url}>
            <Image Svg={Svg} />
          </a>
        ) : (
          <Image Svg={Svg} />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        {url ? (
          <a href={url}>
            <Heading title={title} />
          </a>
        ) : (
          <Heading title={title} />
        )}
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
