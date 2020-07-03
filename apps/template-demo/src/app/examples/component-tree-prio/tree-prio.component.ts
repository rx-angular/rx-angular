import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Person, TreePrioService } from './tree-prio.service';
import { RxState } from '@rx-angular/state';
import { tap } from 'rxjs/operators';
import { getStrategies } from '@rx-angular/template';
import { CoalescingTestService } from '../coalescing/experiments-profiling/coalescing-test.service';
import { Observable } from 'rxjs';

export interface ComponentState {
  data: Person[];
  filter: string;
  filteredData: Person[];
  allSelected: boolean;
  anySelected: boolean;
  rowSelectionState: { [key: string]: boolean };
  checkboxLabels: { [key: string]: string };
  masterCheckboxLabel: string;
  hoveredRow: string;
}

@Component({
  selector: 'tree-prio',
  templateUrl: './tree-prio.component.html',
  styleUrls: ['./tree-prio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreePrioComponent extends RxState<ComponentState>
  implements OnInit {
  strategies = Object.keys(getStrategies({ scope: {} } as any));
  visibleStrategy: string;
  invisibleStrategy: string;

  @ViewChild('name1')
  name1;

  displayedColumns: string[] = [
    'select',
    'name',
    'age',
    'balance',
    'picture',
    'eyeColor',
    'company',
    'phone',
    'address'
  ];
  readonly data$ = this.select('data').pipe(tap(console.log));

  changeDetections = 0;
  detectedChanges = () => {
    return ++this.changeDetections;
  };

  constructor(
    private dataService: TreePrioService,
    public cdRef: ChangeDetectorRef
  ) {
    super();
    this.refetchData();
  }

  getRenderNotifier(comRef): Observable<any> {
    // afterCD
    //
    return getStrategies(comRef as any).local.newAPI();
  }

  getData() {
    this.dataService.getData(100);
  }
  ngOnInit(): void {}

  refetchData(limit: number = 100) {
    this.set({ data: this.dataService.getData(100) });
  }

  remove() {
    this.set(s => {
      return { data: s.data.slice(0, -1) };
    });
  }

  filterData(data: Person[], f: string): Person[] {
    if (!!f) {
      const filterValue = f.toLowerCase();
      return data.filter(p => {
        return (
          p.name.toLowerCase().includes(filterValue) ||
          p.balance.toLowerCase().includes(filterValue) ||
          p.eyeColor.toLowerCase().includes(filterValue) ||
          p.company.toLowerCase().includes(filterValue) ||
          p.phone.toLowerCase().includes(filterValue) ||
          p.address.toLowerCase().includes(filterValue) ||
          p.age
            .toString()
            .toLowerCase()
            .includes(filterValue)
        );
      });
    }
    return data;
  }
}
