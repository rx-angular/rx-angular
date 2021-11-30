import { TSESLint } from '@typescript-eslint/experimental-utils';
import * as fs from 'fs';
import * as path from 'path';

const dirEntries = fs.readdirSync(__dirname, { withFileTypes: true });

export const rules = dirEntries.reduce<
  Record<string, TSESLint.RuleModule<string>>
>((acc, entry) => {
  if (!entry.isFile() || path.join(__dirname, entry.name) === __filename) {
    return acc;
  }
  const ruleName = path.parse(entry.name).name;
  const module = require(path.join(__dirname, entry.name));
  const rule = module?.__esModule ? module.default : module;
  return { ...acc, [ruleName]: rule };
}, {});
