import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  RxVirtualViewPlaceholder,
  RxVirtualViewTemplate,
} from '@rx-angular/template/virtual-view';

@Component({
  selector: 'virtual-item',
  template: `
    <div class="content" *rxVirtualViewTemplate>
      {{ item().content }}
    </div>
    <div class="content placeholder" *rxVirtualViewPlaceholder>
      {{ item().content }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RxVirtualViewTemplate, RxVirtualViewPlaceholder],
})
export class VirtualItem {
  item = input<{ id: number; content: string }>();
}
