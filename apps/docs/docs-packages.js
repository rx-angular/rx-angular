// @ts-check

const fs = require('fs');
const path = require('path');
const docsVersions = require('./docs-versions');

/** Package ids (e.g. `state`). */
const packages = Object.keys(docsVersions.packages);

/**
 * Frozen versions of a package, newest first.
 * @param {string} id Package id.
 * @returns {string[]}
 */
const frozenVersions = (id) => {
  const file = path.join(__dirname, `${id}_versions.json`);
  return fs.existsSync(file) ? require(file) : [];
};

/**
 * Options of the frozen versions of a package. A frozen `N.x` is served at
 * `/docs/packages/<package>/N`, since some hosts read `.x` as a file extension.
 * @param {string} id Package id.
 * @returns {Record<string, import('@docusaurus/plugin-content-docs').VersionOptions>}
 */
const frozenVersionOptions = (id) =>
  Object.fromEntries(
    frozenVersions(id).map((name) => [
      name,
      {
        noIndex: true,
        badge: false,
        path: name.replace(/\.x$/, ''),
      },
    ]),
  );

/**
 * One docs instance per package, each with its own versions. Its sidebar is
 * generated from the package folder. Pages carry no version badge, since the
 * version menu in the navbar shows the version.
 * @param {string} editUrl Base address of the edit links.
 * @returns {import('@docusaurus/types').PluginConfig[]}
 */
const packageDocs = (editUrl) =>
  Object.entries(docsVersions.packages).map(([id, label]) => [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      id,
      path: `packages/${id}`,
      routeBasePath: `docs/packages/${id}`,
      editUrl,
      lastVersion: 'current',
      versions: {
        current: { label, badge: false },
        ...frozenVersionOptions(id),
      },
    }),
  ]);

/** Folders of the frozen versions (e.g. `state_versioned_docs`). */
const versionedDocsDirs = packages
  .filter((id) => frozenVersions(id).length > 0)
  .map((id) => `${id}_versioned_docs`);

module.exports = { packageDocs, versionedDocsDirs };
