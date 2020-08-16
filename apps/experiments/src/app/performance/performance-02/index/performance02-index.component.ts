import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  startWith,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import {
  Performance02DataService,
  Person,
} from './performance-02-data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-performance-02-index',
  templateUrl: './performance02-index.component.html',
  styleUrls: ['./performance02-index.component.scss'],
  changeDetection: environment.changeDetection,
})
export class Performance02IndexComponent implements OnInit, OnDestroy {
  constructor(private dataService: Performance02DataService) {}
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

  readonly data$ = new BehaviorSubject<Person[]>([]);
  readonly filter$ = new BehaviorSubject<string>(null);
  readonly filteredData$ = combineLatest([this.data$, this.filter$]).pipe(
    map(([data, f]) => this.filterData(data, f)),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  selection = new SelectionModel<Person>(true, []);
  readonly allSelected$: Observable<boolean> = combineLatest([
    this.selection.changed.pipe(map((change) => change.source.selected.length)),
    this.data$.pipe(map((d) => d.length)),
  ]).pipe(
    map(([lengthSelected, lengthData]) => lengthSelected === lengthData),
    startWith(false),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  readonly anySelected$: Observable<boolean> = this.selection.changed.pipe(
    map((change) => change.source.selected.length > 0),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  readonly rowSelectionState$: Observable<{
    [key: string]: boolean;
  }> = this.selection.changed
    .pipe(map((change) => change.source.selected))
    .pipe(
      map((selected) => {
        const selectionStates = {};
        if (selected.length > 0) {
          selected.forEach((p) => (selectionStates[p._id] = true));
        }
        return selectionStates;
      }),
      startWith({}),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );

  readonly masterCheckboxLabel$: Observable<string> = this.allSelected$.pipe(
    map((allSelected) => `${allSelected ? 'select' : 'deselect'} all`)
  );

  readonly checkBoxLabels$: Observable<{
    [key: string]: string;
  }> = combineLatest([
    this.rowSelectionState$,
    this.allSelected$,
    this.data$,
  ]).pipe(
    map(([selectionStates, allSelected, data]) => {
      const labels = {};
      data.forEach((p) => {
        labels[p._id] = this.checkboxLabel(
          p,
          allSelected,
          !!selectionStates[p._id]
        );
      });
      return labels;
    }),
    startWith({}),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  hoveredRow$ = new BehaviorSubject<string>(null);

  masterToggle = new Subject<MatCheckboxChange>();

  changeDetections = 0;

  private destroy$ = new Subject<void>();
  detectedChanges = () => {
    return ++this.changeDetections;
  };

  ngOnInit(): void {
    this.refetchData();
    this.masterToggle
      .pipe(
        filter((event: MatCheckboxChange) => event.source.checked),
        withLatestFrom(combineLatest([this.allSelected$, this.data$])),
        takeUntil(this.destroy$)
      )
      .subscribe(([e, [allSelected, data]]) => {
        if (allSelected) {
          this.selection.clear();
        } else {
          data.forEach((d) => this.selection.select(d));
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  refetchData(limit: number = 100) {
    this.data$.next(this.dataService.getData(limit));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(
    row: Person,
    allSelected: boolean,
    rowSelected: boolean
  ): string {
    return `${rowSelected ? 'deselect' : 'select'} row ${row.name}`;
  }

  filterData(data: Person[], filterStr: string): Person[] {
    if (!!filterStr) {
      const filterValue = filterStr.toLowerCase();
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
