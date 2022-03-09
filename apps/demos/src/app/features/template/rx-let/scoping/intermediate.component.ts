import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  OnInit,
  QueryList,
} from '@angular/core';
import { startWith } from 'rxjs';

@Directive({
  selector: '[rxaContentChild]',
})
export class ContentChildDirective {}

@Component({
  selector: 'rxa-content-parent',
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentParent implements AfterContentInit {
  // @ContentChildren(ContentChildDirective) children: QueryList<ContentChildDirective>;
  @ContentChild(ContentChildDirective)
  set child(child: ContentChildDirective) {
    console.log('child', child);
  }

  ngAfterContentInit() {
    /*console.log('contentParent', this.children);
    this.children.changes
      .pipe(startWith(this.children))
      .subscribe((children) => {
        console.log('children', children);
      });*/
  }
}
