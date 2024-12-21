import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'virtual-content',
  template: `{{ item().content }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualContent {
  item = input<{ id: number; content: string }>();
}
