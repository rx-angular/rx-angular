export interface ISRHandlerConfig {
  cache: {
    type: 'memory'; // TODO: add filesystem
    cacheFolderPath?: string; // is required for filesystem cache type
  },
  indexHtml: string; // indexHtml path,
  invalidateSecretToken: string;
  enableLogging?: boolean; // defaults to false
}