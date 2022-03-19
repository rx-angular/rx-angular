export interface ISRHandlerConfig {
  cache: {
    type: 'memory' | 'filesystem';
    cacheFolderPath?: string; // is required for filesystem cache type
  },
  indexHtml: string; // indexHtml path,
  invalidateSecretToken: string;
  enableLogging?: boolean; // defaults to false
}