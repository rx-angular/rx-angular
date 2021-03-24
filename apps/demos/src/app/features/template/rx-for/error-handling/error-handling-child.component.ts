import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'rxa-error-handling-child',
  template: `{{_index}}`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorHandlingChildComponent implements OnInit {

  _index: number;
  @Input() set index(index: number) {
    console.log(index);
    this._index = index;
    if (index > 20) {
      throw new Error('erororororo');
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
