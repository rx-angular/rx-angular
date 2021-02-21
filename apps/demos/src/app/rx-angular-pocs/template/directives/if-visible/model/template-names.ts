import { RxBaseTemplateNames, rxBaseTemplateNames } from '@rx-angular/cdk';

export type rxIfVisibleTemplateNames = 'viewTpl' | rxBaseTemplateNames;

export const RxIfVisibleTemplateNames = {
  ...RxBaseTemplateNames,
  view: 'viewTpl'
} as const;
