import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {defer, Observable} from 'rxjs';
import {scan, startWith, tap} from 'rxjs/operators';
import {CdConfigService} from '../../cd-config.service';
import {fromEvent} from '@zoneless-helpers';
import {BaseComponent} from '../../base.component.ts/base.component';

@Component({
    selector: 'app-let-parent01',
    template: `
        <h2>Let Directive 01
            <small>One single-shot observable bound by one ngrxLet as input binding with as syntax</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>: strategy
        <br/>
        <button #button>increment</button>
        <ng-container *ngrxLet="value$ as v; let w">Value: {{v}} {{w}}</ng-container>
    `,
    changeDetection: environment.changeDetection
})
export class LetParent01Component extends BaseComponent {
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

    value$: Observable<number> = this.btnClick$.pipe(
        tap(console.log),
        startWith(0), scan((a): any => ++a, 0)
    );

}
