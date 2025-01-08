import { Directive } from '@angular/core';
import {
  provideExperimentalRxForReconciliation,
  provideLegacyRxForReconciliation,
} from '@rx-angular/template/for';

@Directive({
  selector: '[provideLegacyReconciliation]',
  providers: [provideLegacyRxForReconciliation()],
})
export class LegacyReconciliationProvider {}

@Directive({
  selector: '[provideExperimentalReconciliation]',
  providers: [provideExperimentalRxForReconciliation()],
})
export class NewReconciliationProvider {}
