import {DemoBasicsItem} from "../demo-basics-item.interface";

export interface DemoBasicsBaseModel {
    refreshInterval: number;
    list: DemoBasicsItem[];
    listExpanded: boolean;
    isPending: boolean;
}
