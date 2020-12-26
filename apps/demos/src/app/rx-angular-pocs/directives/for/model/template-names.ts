import { RxBaseTemplateNames, rxBaseTemplateNames } from '../../../cdk';

export type rxForTemplateNames = 'rxRecord' | rxBaseTemplateNames;

export const RxForTemplateNames = {
  ...RxBaseTemplateNames,
  then: 'rxError',
  else: 'rxComplete'
} as const;
