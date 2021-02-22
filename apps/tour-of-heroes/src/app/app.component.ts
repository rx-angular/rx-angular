import { ApplicationRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RxStrategyProvider } from '@rx-angular/cdk';
import { filter } from 'rxjs/operators';
import { AppRenderStrategy, ConfigService } from './config.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Tour of Heroes';

  strategies = this.strategyProvider.strategies;

  constructor(
    private router: Router,
    private appRef: ApplicationRef,
    private strategyProvider: RxStrategyProvider,
    public configService: ConfigService
  ) {
    configService.setStrategy(AppRenderStrategy.native);
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => appRef.tick());
  }
}
