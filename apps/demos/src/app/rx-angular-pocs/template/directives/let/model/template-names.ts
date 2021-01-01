import { RxBaseTemplateNames } from '../../../../cdk';

export type rxLetTemplateNames = 'rxNext' | RxBaseTemplateNames;

export const RxLetTemplateNames = {
  ...RxBaseTemplateNames,
  next: 'rxNext',
} as const;
