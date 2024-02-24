import { TSESLint } from '@typescript-eslint/utils';
import noExplicitChangeDetectionApis from './no-explicit-change-detection-apis';
import noRxstateImperativeInReactive from './no-rxstate-imperative-in-reactive';
import noRxstateSubscriptionsOutsideConstructor from './no-rxstate-subscriptions-outside-constructor';
import noZoneCriticalBrowserApis from './no-zone-critical-browser-apis';
import noZoneCriticalLodashApis from './no-zone-critical-lodash-apis';
import noZoneCriticalRxjsCreationApis from './no-zone-critical-rxjs-creation-apis';
import noZoneCriticalRxjsOperators from './no-zone-critical-rxjs-operators';
import noZoneCriticalRxjsSchedulers from './no-zone-critical-rxjs-schedulers';
import noZoneRunApis from './no-zone-run-apis';
import preferNoLayoutSensitiveApis from './prefer-no-layout-sensitive-apis';
import preferNoLodashCloneDeep from './prefer-no-lodash-clone-deep';
import preferNoLodashIsEqual from './prefer-no-lodash-is-equal';

export const rules: Record<string, TSESLint.RuleModule<string, unknown[]>> = {
  'no-explicit-change-detection-apis': noExplicitChangeDetectionApis,
  'no-rxstate-imperative-in-reactive': noRxstateImperativeInReactive,
  'no-rxstate-subscriptions-outside-constructor':
    noRxstateSubscriptionsOutsideConstructor,
  'no-zone-critical-browser-apis': noZoneCriticalBrowserApis,
  'no-zone-critical-lodash-apis': noZoneCriticalLodashApis,
  'no-zone-critical-rxjs-creation-apis': noZoneCriticalRxjsCreationApis,
  'no-zone-critical-rxjs-operators': noZoneCriticalRxjsOperators,
  'no-zone-critical-rxjs-schedulers': noZoneCriticalRxjsSchedulers,
  'no-zone-run-apis': noZoneRunApis,
  'prefer-no-layout-sensitive-apis': preferNoLayoutSensitiveApis,
  'prefer-no-lodash-clone-deep': preferNoLodashCloneDeep,
  'prefer-no-lodash-is-equal': preferNoLodashIsEqual,
};
