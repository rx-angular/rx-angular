import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  ɵdetectChanges,
} from '@angular/core';
import { environment } from '../environments/environment';
import { isNgZone, isViewEngineIvy } from '@rx-angular/template';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CdConfigService } from './cd-config.service';
import { FormBuilder } from '@angular/forms';
import { defer, fromEvent, merge, Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'app-config-panel',
  template: `
    <mat-expansion-panel
      class="mat-background-primary config-panel"
      [expanded]="expanded"
    >
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-chip-list class="config-display">
            <mat-chip>
              <mat-icon disabled="zoneEnv === 'NgZone'">snooze</mat-icon>&nbsp;
              {{ zoneEnv }}</mat-chip
            >
            <mat-chip> <mat-icon>image</mat-icon> &nbsp; {{ engine }}</mat-chip>
            <mat-chip>
              <mat-icon>{{
                changeDetection === 'Default'
                  ? 'autorenew'
                  : 'youtube_searched_for'
              }}</mat-icon
              >&nbsp; {{ changeDetection }}
            </mat-chip>
            <mat-chip>
              <mat-icon>settings</mat-icon>&nbsp; {{ strategy() }}</mat-chip
            >
          </mat-chip-list>
        </mat-panel-title>
      </mat-expansion-panel-header>

      <form [formGroup]="configForm">
        <mat-form-field>
          <mat-label>Change Detection Strategy</mat-label>
          <mat-select formControlName="strategy" id="strategy">
            <mat-option
              [value]="strategy"
              *ngFor="
                let s of [
                  { name: undefined, icon: 'find_replace' },
                  { name: 'native', icon: 'find_replace' },
                  { name: 'noop', icon: 'block' },
                  { name: 'global', icon: 'vertical_align_bottom' },
                  { name: 'local', icon: 'call_split' },
                  { name: 'leaf', icon: 'play_for_work' }
                ]
              "
            >
              <mat-icon [ngClass]="{ rot180: s.name === 'local' }">{{
                s.icon
              }}</mat-icon
              >&nbsp;{{ s.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </form>
      <button id="btnAppTick" mat-raised-button>ApplicationRef.tick()</button>
      <button id="btnDetectChanges" mat-raised-button>
        ɵdetectChanges(appRef)
      </button>
    </mat-expansion-panel>
  `,
  styles: [
    `
      .config-panel {
        background: #c2185b;
      }

      .config-display .mat-chip {
        background: transparent;
        font-weight: normal;
      }
    `,
  ],
  changeDetection: environment.changeDetection,
})
export class ConfigPanelComponent
  extends RxState<{
    expanded: boolean;
  }>
  implements AfterViewInit {
  detectChangeClick$ = defer(() =>
    fromEvent(document.getElementById('btnDetectChanges'), 'click')
  );

  expanded = isNgZone(this.ngZone) ? false : true;
  @Input()
  appComponentRef;

  readonly env = environment;
  readonly hasZone = isNgZone(this.ngZone);
  readonly zoneEnv = isNgZone(this.ngZone) ? 'NgZone' : 'NgNoopZone';
  readonly changeDetection =
    this.env.changeDetection === 1 ? 'Default' : 'OnPush';
  readonly engine = isViewEngineIvy() ? 'Ivy' : 'ViewEngine';
  readonly renderTechnique;

  readonly configForm = this.fb.group({
    strategy: ['native'],
  });
  readonly configForm$: Observable<{
    strategy: string;
  }> = this.configForm.valueChanges.pipe(startWith(this.configForm.value));
  strategy = () => this.coalesceConfigService.getConfig('strategy');

  constructor(
    private fb: FormBuilder,
    private breakPointObserver: BreakpointObserver,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private ngZone: NgZone,
    public coalesceConfigService: CdConfigService
  ) {
    super();
    this.set({ expanded: true });
    this.coalesceConfigService.connect(
      this.configForm$.pipe(tap(() => appRef.tick()))
    );
  }

  detectChanges() {
    ɵdetectChanges(this.appComponentRef);
  }

  tick() {
    this.appRef.tick();
  }

  ngAfterViewInit(): void {
    merge(
      fromEvent(document.getElementById('btnAppTick'), 'click').pipe(
        tap(() => this.tick())
      ),
      this.detectChangeClick$.pipe(tap(() => this.detectChanges()))
    ).subscribe();
  }
}
