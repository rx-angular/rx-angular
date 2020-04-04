import {Observable, Subject} from "rxjs";
import {DemoBasicsBaseModel} from "./demo-basics.base-model.interface";

export interface DemoBasicsView {
    // All UI-Events or component EventBindings
    refreshClicks: Subject<Event>;
    listExpandedChanges: Subject<boolean>
    // Optional The base model as observable
    baseModel$: Observable<DemoBasicsBaseModel>;
    // Optional Derivations as observable
    // ....
}
