import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import React from 'react';

/** Renders the current major version of a package (e.g. `22.x`) from its docs instance. */
export default function PackageVersion({
  name,
}: {
  name: string;
}): React.JSX.Element {
  const data = useAllDocsData()[name];
  const version = data?.versions.find((item) => item.isLast)?.label;
  if (!version) {
    throw new Error(`No docs instance for the package "${name}".`);
  }
  return <>{version}</>;
}
