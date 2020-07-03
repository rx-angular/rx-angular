import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { EMPTY, of, range, Subject, Subscription } from 'rxjs';
import { createRenderAware, getStrategies } from '@rx-angular/template';
import { CdConfigService } from '../../cd-config.service';

@Component({
  selector: 'app-draft-parent01',
  template: `
    <h2>
      Draft 01
      <small>Draft</small>
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <br />
    <button (click)="nextValueSubject.next('EMPTY')">next Empty</button>
    <button (click)="nextValueSubject.next('SINGLE')">next single-shot</button>
    <button (click)="nextValueSubject.next('MULTI')">next multi-shot</button>
    <br />
    <button (click)="nextConfigSubject.next('idle')">idle</button>
    <button (click)="nextConfigSubject.next('pessimistic1')">
      pessimistic1
    </button>
    <button (click)="nextConfigSubject.next('optimistic2')">optimistic2</button>

    {{ value }}
  `,
  changeDetection: environment.changeDetection
})
export class DraftParent01Component implements AfterViewInit, OnDestroy {
  subscription = new Subscription();
  nextValueSubject = new Subject();
  nextConfigSubject = new Subject();

  cdAware;

  value = 0;
  numRenderings = 0;

  getNumOfRenderings() {
    return ++this.numRenderings;
  }

  constructor(
    ngZone: NgZone,
    cdRef: ChangeDetectorRef,
    private cfgService: CdConfigService
  ) {
    const strategies = getStrategies<number>({ cdRef: scope });
    this.cdAware = createRenderAware<number>({
      strategies,
      resetObserver: {
        next: () => {
          console.log('[reset]');
          this.value = undefined;
        }
      },
      updateObserver: {
        next: n => {
          console.log('[update]', n);
          this.value = n;
        }
      }
    });

    this.subscription.add(this.cdAware.subscribe());
  }

  nextValueClick() {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');

    this.subscription.add(
      this.cfgService
        .select('strategy')
        .subscribe(name => this.cdAware.nextConfig(name))
    );

    this.subscription.add(
      this.nextValueSubject.subscribe(next => {
        let v: any = EMPTY;
        if (next === 'SINGLE') {
          v = of(Math.random());
        }

        if (next === 'MULTI') {
          v = range(1, 5);
        }
        this.cdAware.nextVale(v);
      })
    );
    this.subscription.add(
      this.nextConfigSubject.subscribe(name => {
        this.cdAware.nextConfig(name);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
