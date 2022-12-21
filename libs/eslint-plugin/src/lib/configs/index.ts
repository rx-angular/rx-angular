import { TSESLint } from '@typescript-eslint/utils';
import recommended from './recommended';
import zoneless from './zoneless';

export const configs: Record<string, TSESLint.Linter.Config> = {
  recommended,
  zoneless,
};
