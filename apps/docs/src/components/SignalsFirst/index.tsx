import Link from '@docusaurus/Link';
import Admonition from '@theme/Admonition';
import React from 'react';
import styles from './styles.module.css';

type SignalsFirstProps = {
  children?: React.ReactNode;
};

const CONCEPT = 'reactive-state-global-vs-local';
const CONCEPT_LABEL = 'Reactive state: global vs local, RxState + signals';

export default function SignalsFirst({
  children,
}: SignalsFirstProps): React.JSX.Element {
  const href = `/docs/concepts/${CONCEPT}`;
  return (
    <Admonition type="note" title="Signals first">
      <p className={styles.signalsFirstIntro}>
        For{' '}
        <strong>local component state, Angular signals are the default</strong>.
        Reach for <code>signal()</code>, <code>computed()</code> and{' '}
        <code>linkedSignal()</code> first.{' '}
        <strong>RxState complements signals.</strong> It earns its place for{' '}
        <strong>
          global or shared state, complex derived state and async-heavy
          orchestration
        </strong>
        , with multi-source <code>connect</code>, actions and effects bridged
        into signals. See{' '}
        <Link to={href}>
          <strong>{CONCEPT_LABEL}</strong>
        </Link>
        .
      </p>
      {children}
    </Admonition>
  );
}
