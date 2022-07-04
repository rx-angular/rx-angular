import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
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
  },
  {
    title: '@rx-angular/state',
    Svg: require('@site/static/img/undraw_rxangular_data_processing.svg')
      .default,
    description: <>Reactive Component State-Management.</>,
  },
  {
    title: '@rx-angular/template',
    Svg: require('@site/static/img/undraw_rxangular_progressive_app.svg')
      .default,
    description: <>High-Performance Reactive Template Rendering for Angular.</>,
  },
];

function Feature({ Svg, title, description }: FeatureItem): JSX.Element {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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
