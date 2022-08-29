import { get } from 'http';

export function getLatestNodeVersion(packageName: string): Promise<string> {
  const DEFAULT_VERSION = 'latest';

  return new Promise((resolve) => {
    return get(`http://registry.npmjs.org/${packageName}`, (res) => {
      let rawData = '';
      res.on('data', (chunk) => (rawData += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(rawData);
          const version = (response && response['dist-tags']) || {};

          resolve(version.latest ?? DEFAULT_VERSION);
        } catch (e) {
          resolve(DEFAULT_VERSION);
        }
      });
    }).on('error', () => resolve(DEFAULT_VERSION));
  });
}
