import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
} from '@angular/core';

@Directive({
  selector: '[rxaContentChild]',
  standalone: true,
})
export class ContentChildDirective {}

@Component({
  selector: 'rxa-content-parent',
  standalone: true,
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
