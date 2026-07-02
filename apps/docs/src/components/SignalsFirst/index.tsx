import React from 'react';
import Admonition from '@theme/Admonition';
import styles from './styles.module.css';

type SignalsFirstProps = {
  /**
   * Concept to link. Defaults to `E3`.
   */
  conceptId?: string;
  /**
   * Tunes the emphasis: `local` (signals win) vs `global`/async-heavy
   * (RxState complements). Defaults to `local`.
   */
  scope?: 'local' | 'global';
  children?: React.ReactNode;
};

const CONCEPT_LABEL =
  'Reactive state: global vs local, RxState + signals';

function conceptHref(conceptId: string): string {
  return `/docs/concepts/${conceptId}-reactive-state-global-vs-local`;
}

// The copy below is the docs' OWN framing ("RxState complements signals…"),
// deliberately NOT a maintainer-attributed quote — so it ships now under the
// signals-first positioning (ADR-RXA-0005). Do not reword it into an attributed
// quote of GH #1588 without clearing the publishing gate (recipes §3.2.3).
function LocalCopy({ href }: { href: string }): JSX.Element {
  return (
    <p className={styles.signalsFirstIntro}>
      For <strong>local component state, Angular signals are the default</strong>{' '}
      — reach for <code>signal()</code>, <code>computed()</code>, and{' '}
      <code>linkedSignal()</code> first. <strong>RxState complements signals</strong>;
      it earns its place for{' '}
      <strong>
        global/shared state, complex derived state, and async-heavy orchestration
      </strong>{' '}
      (multi-source <code>connect</code>, actions, effects) bridged into signals —
      not as a replacement for signals. See{' '}
      <a href={href}>
        <strong>{CONCEPT_LABEL}</strong>
      </a>
      .
    </p>
  );
}

function GlobalCopy({ href }: { href: string }): JSX.Element {
  return (
    <p className={styles.signalsFirstIntro}>
      Angular signals — <code>signal()</code>, <code>computed()</code>, and{' '}
      <code>linkedSignal()</code> — remain the default for local component state.
      For <strong>global/shared, async-heavy state</strong>, this is where{' '}
      <strong>RxState complements signals</strong>: multi-source{' '}
      <code>connect</code>, actions, and effects orchestrating asynchronous
      sources, bridged into signals for the template — not a replacement for
      signals. See{' '}
      <a href={href}>
        <strong>{CONCEPT_LABEL}</strong>
      </a>
      .
    </p>
  );
}

export default function SignalsFirst({
  conceptId = 'E3',
  scope = 'local',
  children,
}: SignalsFirstProps): JSX.Element {
  const href = conceptHref(conceptId);
  return (
    <Admonition type="note" title="Signals first">
      {scope === 'global' ? (
        <GlobalCopy href={href} />
      ) : (
        <LocalCopy href={href} />
      )}
      {children}
    </Admonition>
  );
}
