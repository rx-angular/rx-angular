import { RxBaseTemplateNames } from '@rx-angular/cdk/template';

export type rxContextTemplateNames = 'rxContent' | RxBaseTemplateNames;

export const RxContextTemplateNames = {
  ...RxBaseTemplateNames,
  content: 'rxContent',
} as const;
