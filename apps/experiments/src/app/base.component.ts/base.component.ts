import {
  AfterViewChecked,
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  HostBinding,
  NgZone,
  OnDestroy,
  ɵdetectChanges,
  ɵmarkDirty,
  Directive,
} from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { CdConfigService } from '../cd-config.service';
import { environment } from '../../environments/environment';

@Directive()
export abstract class BaseComponent
  implements AfterViewInit, AfterViewChecked, OnDestroy {
  cd = environment.changeDetection ? 'Default' : 'OnPush';
  @HostBinding('class.cd-default')
  cdDefault = environment.changeDetection === 0;
  @HostBinding('class.cd-onpush')
  cdOnPush = environment.changeDetection === 1;

  isMarkedDirty = false;

  @HostBinding('id')
  id = Math.random() + '';
  nativeElem;

  @HostBinding('class.component')
  classComponent = true;

  @HostBinding('class.dirty')
  classDirty = this.isMarkedDirty;

  baseSub = new Subscription();
  afterViewInit$ = new ReplaySubject(1);
  onDestroy$ = new ReplaySubject(1);

  numRenderings = 0;

  getNumOfRenderings() {
    this.isMarkedDirty = false;
    return ++this.numRenderings;
  }

  constructor(
    protected appRef: ApplicationRef,
    protected cdRef: ChangeDetectorRef,
    protected ngZone: NgZone,
    protected coalesceConfigService: CdConfigService
  ) {
    this.cdRef.markForCheck = () => {
      console.log('markForCheck');
      this.cdRef.markForCheck();
    };
  }

  appRef_tick() {
    this.appRef.tick();
  }

  cdRef_detectChanges() {
    this.cdRef.detectChanges();
  }

  cdRef_markForCheck() {
    this.cdRef.markForCheck();
    this.isMarkedDirty = true;
    this.nativeElem.classList.add('dirty');
  }

  ɵmarkDirty() {
    ɵmarkDirty(this);
  }

  ɵdetectChanges() {
    ɵdetectChanges(this);
  }

  scheduleDetectChanges() {
    console.log('NOT IMPLEMENTED');
  }

  get strategy() {
    return this.coalesceConfigService.getConfig('strategy');
  }

  ngAfterViewInit() {
    if (this.hasOwnProperty('baseEffects$')) {
      this.baseSub.add((this as any).baseEffects$.subscribe());
    }
    this.afterViewInit$.next();
    this.nativeElem = document.getElementById(this.id);
  }

  ngAfterViewChecked() {
    this.nativeElem?.classList.remove('dirty');
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.baseSub.unsubscribe();
  }
}
