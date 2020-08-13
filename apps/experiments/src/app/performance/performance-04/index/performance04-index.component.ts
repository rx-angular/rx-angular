import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';
import {
  Performance04DataService,
  Person,
} from './performance-04-data.service';
import { environment } from '../../../../environments/environment';
import { RxState } from '@rx-angular/state';

export interface Performance04State {
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
  selector: 'app-performance-04-index',
  templateUrl: './performance04-index.component.html',
  styleUrls: ['./performance04-index.component.scss'],
  changeDetection: environment.changeDetection,
})
export class Performance04IndexComponent extends RxState<Performance04State>
  implements OnInit {
  displayedColumns: string[] = [
    'select',
    'name',
    'age',
    'balance',
    'picture',
    'eyeColor',
    'company',
    'phone',
    'address',
  ];
  readonly viewState$: Observable<Performance04State> = this.select();
  readonly data$ = this.select('data');
  readonly filter$ = this.select('filter');
  readonly filteredData$ = combineLatest([this.data$, this.filter$]).pipe(
    map(([data, f]) => this.filterData(data, f))
  );

  selection = new SelectionModel<Person>(true, []);
  readonly allSelected$ = this.select('allSelected');

  masterToggle = new Subject<MatCheckboxChange>();

  changeDetections = 0;
  detectedChanges = () => {
    return ++this.changeDetections;
  };

  constructor(
    private dataService: Performance04DataService,
    public cdRef: ChangeDetectorRef
  ) {
    super();
    this.refetchData();
    this.set({
      checkboxLabels: {},
      rowSelectionState: {},
      anySelected: false,
      allSelected: false,
    });
    this.connect(
      combineLatest([
        this.selection.changed.pipe(
          map((change) => change.source.selected),
          startWith([])
        ),
        this.data$,
      ]).pipe(
        map(([selected, data]) => {
          const anySelected = selected.length > 0;
          const allSelected = anySelected && selected.length === data.length;
          const rowSelectionState = {};
          if (selected.length > 0) {
            selected.forEach((p) => (rowSelectionState[p._id] = true));
          }
          const checkboxLabels: { [key: string]: string } = {};
          data.forEach((p) => {
            checkboxLabels[p._id] = this.checkboxLabel(
              p,
              allSelected,
              !!rowSelectionState[p._id]
            );
          });
          const masterCheckboxLabel = `${
            !allSelected ? 'select' : 'deselect'
          } all`;
          return {
            anySelected,
            allSelected,
            masterCheckboxLabel,
            checkboxLabels,
            rowSelectionState,
          };
        })
      )
    );
  }

  ngOnInit(): void {
    this.hold(
      this.masterToggle.pipe(
        withLatestFrom(combineLatest([this.allSelected$, this.data$]))
      ),
      ([e, [allSelected, data]]) => {
        if (allSelected) {
          this.selection.clear();
        } else {
          this.selection.select(...data);
        }
      }
    );
  }

  refetchData(limit: number = 100) {
    this.set({ data: this.dataService.getData(limit) });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(
    row: Person,
    allSelected: boolean,
    rowSelected: boolean
  ): string {
    return `${rowSelected ? 'deselect' : 'select'} row ${row.name}`;
  }

  filterData(data: Person[], f: string): Person[] {
    if (!!f) {
      const filterValue = f.toLowerCase();
      return data.filter((p) => {
        return (
          p.name.toLowerCase().includes(filterValue) ||
          p.balance.toLowerCase().includes(filterValue) ||
          p.eyeColor.toLowerCase().includes(filterValue) ||
          p.company.toLowerCase().includes(filterValue) ||
          p.phone.toLowerCase().includes(filterValue) ||
          p.address.toLowerCase().includes(filterValue) ||
          p.age.toString().toLowerCase().includes(filterValue)
        );
      });
    }
    return data;
  }
}
