import { RxBaseTemplateNames } from '../../../../cdk';

export type rxContextTemplateNames = 'rxContent' | RxBaseTemplateNames;

export const RxContextTemplateNames = {
  ...RxBaseTemplateNames,
  content: 'rxContent',
} as const;
