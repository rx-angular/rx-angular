import { RuleModule } from '@typescript-eslint/experimental-utils/dist/ts-eslint';
import noExplicitChangeDetectionApis from './no-explicit-change-detection-apis';

export const rules: Record<string, RuleModule<string>> = {
  ['no-explicit-change-detection-apis']: noExplicitChangeDetectionApis,
};
