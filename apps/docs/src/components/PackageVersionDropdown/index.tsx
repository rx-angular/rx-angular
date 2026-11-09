import { useActivePlugin } from '@docusaurus/plugin-content-docs/client';
import DocsVersionDropdownNavbarItem from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import React from 'react';

type Props = { mobile?: boolean; position?: 'left' | 'right' };

/**
 * The Docusaurus version dropdown without the `items` prop. Its props type
 * requires `items`, but the dropdown builds them from the package's versions.
 */
const VersionDropdown = DocsVersionDropdownNavbarItem as React.ComponentType<
  Omit<React.ComponentProps<typeof DocsVersionDropdownNavbarItem>, 'items'>
>;

/**
 * Navbar item that lists the versions of the package on the current page.
 * Renders nothing on unversioned pages (e.g. Learn, Concepts or Start here).
 * Registered as the `custom-packageVersionDropdown` navbar item type.
 */
export default function PackageVersionDropdown(
  props: Props,
): React.JSX.Element | null {
  const activePlugin = useActivePlugin({ failfast: false });
  if (!activePlugin || activePlugin.pluginId === 'default') {
    return null;
  }
  return (
    <VersionDropdown
      {...props}
      docsPluginId={activePlugin.pluginId}
      dropdownActiveClassDisabled
      dropdownItemsBefore={[]}
      dropdownItemsAfter={[]}
    />
  );
}
