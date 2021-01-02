import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, AppComponentModule } from './app-component';
import { ENVIRONMENT_SETTINGS } from './shared/environment.token';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import {
  getConcurrentSchedulerStrategyCredentialsMap, PriorityNameToLevel,
  RX_CUSTOM_STRATEGIES,
  RX_PRIMARY_STRATEGY, StrategyCredentials
} from './rx-angular-pocs';
import { observeOn, tap } from 'rxjs/operators';
import { concurrent } from './rx-angular-pocs/cdk/utils/rxjs/scheduler/concurrent';
import { observeOnPriority } from './rx-angular-pocs/cdk/utils/rxjs/operators/observeOnPriority';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppComponentModule
  ],
  providers: [
    {
      provide: ENVIRONMENT_SETTINGS,
      useValue: environment
    },
    {
      provide: RX_CUSTOM_STRATEGIES,
      useValue: {
        ...getConcurrentSchedulerStrategyCredentialsMap(),
        test: {
            name: 'test',
            work: (cdRef) => {
              cdRef.detectChanges()
            },
            behavior: (work: any, context: any) => {
              return o$ => o$.pipe(
                observeOnPriority(concurrent(PriorityNameToLevel.low)),
                tap(work)
              );
            }
        }
      },
      multi: true
    },
    {
      provide: RX_PRIMARY_STRATEGY,
      useValue: 'local'
    }
  ],
  declarations: [HomeComponent],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
