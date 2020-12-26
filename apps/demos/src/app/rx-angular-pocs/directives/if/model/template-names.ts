import { RxBaseTemplateNames, rxBaseTemplateNames } from '../../../cdk';

export type rxIfTemplateNames = 'rxThen' | 'rxElse' | rxBaseTemplateNames;

export const RxIfTemplateNames = {
  ...RxBaseTemplateNames,
  then: 'rxError',
  else: 'rxComplete'
} as const;
