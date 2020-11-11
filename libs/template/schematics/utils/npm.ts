import { get } from 'http';

export interface NpmRegistryPackage {
  name: string;
  version: string;
}

export function getLatestNodeVersion(
  packageName: string
): Promise<NpmRegistryPackage> {
  const DEFAULT_VERSION = 'latest';

  return new Promise((resolve) => {
    return get(`http://registry.npmjs.org/${packageName}`, (res) => {
      let rawData = '';
      res.on('data', (chunk) => (rawData += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(rawData);
          const version = (response && response['dist-tags']) || {};

          resolve(buildPackage(response.name || packageName, version.latest));
        } catch (e) {
          resolve(buildPackage(packageName));
        }
      });
    }).on('error', () => resolve(buildPackage(packageName)));
  });

  function buildPackage(
    name: string,
    version: string = DEFAULT_VERSION
  ): NpmRegistryPackage {
    return { name, version };
  }
}
