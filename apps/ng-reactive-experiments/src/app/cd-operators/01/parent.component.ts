import {ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {defer, fromEvent, range, Subject} from 'rxjs';
import {createIdleStrategy, getStrategies} from '../../../../projects/component/src/core/cd-aware';
import {renderChanges} from '../../../../projects/component/src/core/operators/renderChanges';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {CdConfigService} from '../../cd-config.service';
import {BaseComponent} from '../../base.component.ts/base.component';

@Component({
    selector: 'app-cd-operators-parent01',
    template: `
        <h2>CD Operators 01
            <small>CD Operators</small>
        </h2>
        <span>render: </span><b class="num-renders">{{getNumOfRenderings()}}</b><br>
        <br/>
        <button #button>Next</button><br/>

        value$: {{value$ | async}}

    `,
    changeDetection: environment.changeDetection
})
export class CdOperatorsParent01Component extends BaseComponent {
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

    cfg = {ngZone: this.ngZone, cdRef: this.cdRef, component: this};
    strategies = getStrategies<number>(this.cfg);
    idleStrategies = createIdleStrategy(this.cfg);

    value$ = this.btnClick$.pipe(
        switchMap(() => range(1, 5)),
        tap(v => console.log('before:', v)),
        renderChanges(this.strategies.optimistic2),
        tap(v => console.log('after:', v))
    );

}
