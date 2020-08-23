import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppRenderStrategy, ConfigService } from './config.service';
import { getStrategies } from '@rx-angular/template';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Tour of Heroes';

  strategies = Object.keys(getStrategies({ cdRef: { context: {} } } as any));

  constructor(
    private router: Router,
    private appRef: ApplicationRef,
    public configService: ConfigService
  ) {
    configService.setStrategy(AppRenderStrategy.native);
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => appRef.tick());
  }
}
