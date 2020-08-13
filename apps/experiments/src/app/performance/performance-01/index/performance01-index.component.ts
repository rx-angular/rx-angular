import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {
  Performance01DataService,
  Person,
} from './performance-01-data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-performance-01-index',
  templateUrl: './performance01-index.component.html',
  styleUrls: ['./performance01-index.component.scss'],
  changeDetection: environment.changeDetection,
})
export class Performance01IndexComponent implements OnInit {
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
  private _data: any[] = [];
  set data(data: any[]) {
    this._data = data;
    this.filter = this.filter;
  }
  get data(): any[] {
    return this._data;
  }
  filteredData: Person[] = [];

  private _filter: string;
  set filter(filter: string) {
    this._filter = filter;
    this.filteredData = this.filterData(this.data, filter);
  }
  get filter(): string {
    return this._filter;
  }
  selection = new SelectionModel<Person>(true, []);

  hoveredRow: string;

  changeDetections = 0;
  detectedChanges = () => {
    return ++this.changeDetections;
  };

  constructor(private dataService: Performance01DataService) {}

  ngOnInit(): void {
    this.refetchData();
  }

  refetchData(limit: number = 100) {
    this.data = this.dataService.getData(limit);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Person): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name
    }`;
  }

  rowHovered(row: Person) {
    this.hoveredRow = row._id;
  }

  rowBlurred(row: Person) {
    this.hoveredRow = null;
  }

  isRowHovered(row: Person) {
    return this.hoveredRow === row._id;
  }

  filterData(data: Person[], filter: string): Person[] {
    if (!!filter) {
      const filterValue = filter.toLowerCase();
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
