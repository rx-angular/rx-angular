import {merge, Subject, timer} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {DemoBasicsBaseModel} from "./demo-basics.base-model.interface";
import {DemoBasicsView} from "./demo-basics.view.interface";
import { RxState } from 'ngx-rx-state';

const initState: DemoBasicsBaseModel = {
    refreshInterval: 1000,
    listExpanded: true,
    isPending: true,
    list: []
};

@Injectable()
export class DemoBasicsViewModelService extends RxState<DemoBasicsBaseModel> implements DemoBasicsView {
    baseModel$ = this.select();

    // ListView =================================================
    refreshClicks = new Subject<Event>();
    listExpandedChanges = new Subject<boolean>();

    refreshListSideEffect$ = merge(
        this.refreshClicks,
        this.select(map(s => s.refreshInterval))
            .pipe(switchMap(ms => timer(ms)))
    );

    constructor() {
        super();
        this.setState(initState);

        this.connect(this.listExpandedChanges
            .pipe(map(b => ({listExpanded: b})))
        );
    }

}


