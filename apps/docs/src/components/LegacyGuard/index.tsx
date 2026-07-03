import React from 'react';
import Admonition from '@theme/Admonition';
import styles from './styles.module.css';

type LegacyGuardProps = {
  /**
   * The narrow residual audience that may still need this legacy approach.
   * Sourced verbatim from the page's `legacy_guard` frontmatter string.
   */
  audience: string;
  /**
   * One clause naming what modern Angular/RxAngular now does natively for this
   * page's topic. Defaults to the zoneless clause below (the common zone case).
   */
  native?: string;
  /**
   * Slug of the Concept page to link (without the `/concepts/` prefix).
   * Defaults to the zoneless concept (E2). Non-zone legacy pages (e.g. the
   * class-based RxState API or the NgRx integrations) pass their own concept —
   * typically `E3-reactive-state-global-vs-local`.
   */
  conceptSlug?: string;
  /**
   * Human-readable label for the linked concept. Defaults to the E2 label.
   */
  conceptLabel?: string;
  children?: React.ReactNode;
};

const DEFAULT_NATIVE =
  'since Angular v21, change detection is zoneless by default and Zone.js is dropped from the default bundle';

const DEFAULT_CONCEPT_SLUG = 'E2-zoneless-and-zonejs-change-detection';
const DEFAULT_CONCEPT_LABEL =
  'Zoneless & how Zone.js affected change detection';

export default function LegacyGuard({
  audience,
  native = DEFAULT_NATIVE,
  conceptSlug = DEFAULT_CONCEPT_SLUG,
  conceptLabel = DEFAULT_CONCEPT_LABEL,
  children,
}: LegacyGuardProps): JSX.Element {
  const href = `/docs/concepts/${conceptSlug}`;
  return (
    <Admonition type="caution" title="Legacy guidance">
      <p className={styles.legacyGuardIntro}>
        <strong>Legacy guidance — {native}.</strong> This page documents a{' '}
        <strong>legacy</strong> approach; <strong>{audience}</strong> may still
        need it. For new work, prefer the modern approach. See{' '}
        <a href={href}>
          <strong>{conceptLabel}</strong>
        </a>{' '}
        for the full picture.
      </p>
      {children}
    </Admonition>
  );
}
