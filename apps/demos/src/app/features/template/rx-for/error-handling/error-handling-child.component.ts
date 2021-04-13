import {
  ChangeDetectionStrategy,
  Component, DoCheck, ElementRef,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'rxa-error-handling-child',
  template: `{{ _index }}<ng-content></ng-content>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorHandlingChildComponent implements OnInit, DoCheck {
  _index: number;
  @Input() set index(index: number) {
    console.log(index);
    this._index = index;
   /* if (index > 20) {
      throw new Error('erororororo');
    }*/
  }

  private removed = false;

  constructor(
    private el: ElementRef
  ) {}

  ngOnInit(): void {}

  ngDoCheck() {
    if (this._index %2 !== 0 && !this.removed && this.el.nativeElement.parentElement) {
      this.el.nativeElement.parentElement.removeChild(this.el.nativeElement);
      this.removed = true;
    }
  }
}
