import { Observable, Subject } from 'rxjs';
import { SimpleChanges } from '@angular/core';

export interface HookProps {
  changes?: SimpleChanges,
  init?: boolean,
  afterContentInit?: boolean,
  afterContentChecked?: boolean,
  afterViewInit?: boolean,
  afterViewChecked?: boolean,
  destroy?: boolean
}

export interface HooksChannel$ {
  readonly _hooks$: Subject<HookProps>;
}

export interface OnChanges$ extends HooksChannel$ {
  onChanges$: Observable<SimpleChanges>
}
export interface OnInit$ extends HooksChannel$ {
  onInit$: Observable<boolean>
}
export interface AfterContentInit$ extends HooksChannel$ {
  onAfterContentInit$: Observable<boolean>
}
export interface AfterContentChecked$ extends HooksChannel$ {
  onAfterContentChecked$: Observable<boolean>
}
export interface AfterViewInit$ extends HooksChannel$ {
  onAfterViewInit$: Observable<boolean>
}
export interface AfterViewChecked$ extends HooksChannel$ {
  onAfterViewChecked$: Observable<boolean>
}
export interface OnDestroy$ extends HooksChannel$ {
  onDestroy$: Observable<boolean>
}
