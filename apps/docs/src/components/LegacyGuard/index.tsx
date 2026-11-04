import Link from '@docusaurus/Link';
import Admonition from '@theme/Admonition';
import React from 'react';
import styles from './styles.module.css';

type LegacyGuardProps = {
  /**
   * Who still needs this page, like "apps still running Zone.js".
   */
  audience: string;
  /**
   * One sentence, without the final period, on what modern Angular or
   * RxAngular does instead. Defaults to the zoneless sentence below.
   */
  native?: string;
  /**
   * File name of the concept page to link, without the extension. Defaults to
   * the zoneless concept.
   */
  concept?: string;
  /**
   * Link text for the concept. Use the concept's title.
   */
  conceptLabel?: string;
  children?: React.ReactNode;
};

const DEFAULT_NATIVE =
  'Angular change detection runs without Zone.js by default';
const DEFAULT_CONCEPT = 'zoneless-and-zonejs-change-detection';
const DEFAULT_CONCEPT_LABEL =
  'Zoneless & how Zone.js affected change detection';

export default function LegacyGuard({
  audience,
  native = DEFAULT_NATIVE,
  concept = DEFAULT_CONCEPT,
  conceptLabel = DEFAULT_CONCEPT_LABEL,
  children,
}: LegacyGuardProps): React.JSX.Element {
  const href = `/docs/concepts/${concept}`;
  return (
    <Admonition type="caution" title="Legacy guidance">
      <p className={styles.legacyGuardIntro}>
        <strong>{native}.</strong> This page documents a legacy approach for{' '}
        <strong>{audience}</strong>. For new work, use the modern approach. See{' '}
        <Link to={href}>
          <strong>{conceptLabel}</strong>
        </Link>{' '}
        for the full picture.
      </p>
      {children}
    </Admonition>
  );
}
