import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {EMPTY, of, range, Subject, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {RxState} from '@rx-state/rxjs-state';
import {BaseComponent} from '../../base.component.ts/base.component';


@Component({
    selector: 'app-draft-parent01',
    template: `
        <h2>RxState 01</h2>
        <div class="base-info">
            <span>CD: <b class="cds">Default</b></span>
            <span>dirty: <b class="dirty">{{isMarkedDirty}}</b></span>
            <span>render: <b class="num-renders">{{getNumOfRenderings()}}</b></span>
        </div>
        <div class="case-interaction">
            <button (click)="nextValueSubject.next('STATIC_VALUE')">next static value</button>
            <button (click)="nextValueSubject.next('STATIC_PROJECT')">next static project</button>
            <button (click)="nextValueSubject.next('STATIC_KEY_PROJECT')">next static project</button>
            <button (click)="nextValueSubject.next('EMPTY')">next empty</button>
            <button (click)="nextValueSubject.next('SINGLE')">next single-shot</button>
            <button (click)="nextValueSubject.next('MULTI')">next multi-shot</button>
        </div>
        <div class="case-content">
            value$: {{value$ | ngrxPush | json}}
        </div>

    `,
    changeDetection: environment.changeDetection
})
export class RxStateParent01Component  extends BaseComponent implements OnDestroy, OnInit {
    subscription = new Subscription();
    nextValueSubject = new Subject();
    rxState = new RxState<{ num: number, str: string }>();

    value$ = this.rxState.$;

    nextValueClick$ = this.nextValueSubject.pipe(tap((next) => {
            if (next === 'STATIC_VALUE') {
                this.rxState.setState({num: 55});
            }
            if (next === 'STATIC_PROJECT') {
                this.rxState.setState((s) => ({num: s.num + 55}));
            }
            if (next === 'STATIC_KEY_PROJECT') {
                this.rxState.setState('num', (s) => s.num + 55);
            }
            if (next === 'EMPTY') {
                this.rxState.connect(EMPTY);
            }
            if (next === 'SINGLE') {
                this.rxState.connect('num', of(Math.random()));
            }
            if (next === 'MULTI') {
                this.rxState.connect('num', range(1, 5));
            }
        })
    );

    ngOnInit() {
        this.subscription.add(this.rxState.subscribe());
        this.rxState.hold(this.nextValueClick$);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.subscription.unsubscribe();
    }

}
