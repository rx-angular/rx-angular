import React from 'react';
import styles from './styles.module.css';

type SinceProps = {
  /** The minor release of the page's package that added the feature (e.g. "22.1"). */
  version: string;
};

/**
 * Marks an export, option or section that a minor release added. Pages use it
 * without an import, as in `<Since version="22.1" />`.
 */
export default function Since({ version }: SinceProps): React.JSX.Element {
  return (
    <span className={styles.since} title={`Added in ${version}`}>
      {version}+
    </span>
  );
}
