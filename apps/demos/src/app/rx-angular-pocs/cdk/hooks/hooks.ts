import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Injectable,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  AfterContentChecked$,
  AfterContentInit$,
  AfterViewChecked$,
  AfterViewInit$,
  HookProps,
  OnChanges$,
  OnDestroy$,
  OnInit$,
} from './model';
import { toHook } from './utils';

@Injectable()
export abstract class Hooks
  implements
    OnChanges,
    OnChanges$,
    OnInit,
    OnInit$,
    AfterViewInit,
    AfterViewInit$,
    AfterViewChecked,
    AfterViewChecked$,
    AfterContentInit,
    AfterContentInit$,
    AfterContentChecked,
    AfterContentChecked$,
    OnDestroy,
    OnDestroy$ {
  readonly _hooks$ = new Subject<Partial<HookProps>>();

  onChanges$: Observable<SimpleChanges> = this._hooks$.pipe(toHook('changes'));
  onInit$: Observable<boolean> = this._hooks$.pipe(toHook('init'));
  onAfterViewInit$: Observable<boolean> = this._hooks$.pipe(
    toHook('afterViewInit')
  );
  onAfterViewChecked$: Observable<boolean> = this._hooks$.pipe(
    toHook('afterViewChecked')
  );
  onAfterContentInit$: Observable<boolean> = this._hooks$.pipe(
    toHook('afterContentInit')
  );
  onAfterContentChecked$: Observable<boolean> = this._hooks$.pipe(
    toHook('afterContentChecked')
  );
  onDestroy$: Observable<boolean> = this._hooks$.pipe(toHook('destroy'));

  ngOnChanges(changes: SimpleChanges): void {
    this._hooks$.next({ changes });
  }

  ngOnInit(): void {
    this._hooks$.next({ init: true });
  }

  ngAfterViewInit(): void {
    this._hooks$.next({ afterViewInit: true });
  }

  ngAfterViewChecked(): void {
    this._hooks$.next({ afterViewChecked: true });
  }

  ngAfterContentInit(): void {
    this._hooks$.next({ afterContentInit: true });
  }

  ngAfterContentChecked(): void {
    this._hooks$.next({ afterContentChecked: true });
  }

  ngOnDestroy(): void {
    this._hooks$.next({ destroy: true });
    this._hooks$.complete();
  }
}
