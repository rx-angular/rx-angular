import { RxBaseTemplateNames } from '../../../../cdk';

export type rxLetTemplateNames = 'nextTpl' | RxBaseTemplateNames;

export const RxLetTemplateNames = {
  ...RxBaseTemplateNames,
  next: 'nextTpl',
} as const;
