import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DocsLayoutService } from '../services/docs-layout.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-docs-pagination',
  template: `
    <div
      *ngIf="docLayout.pagination$ | async as pagination"
      class=" bg-lilac border-main dark:border-pearl dark:bg-cinder dark:hover:bg-gun border-t-2">
      <div class="max-w-7xl mx-auto">
        <div class=" lg:grid-cols-2 lg:divide-x dark:divide-x-gun dark:divide-gun grid grid-cols-1">
          <div>
            <a *ngIf="pagination.prev" [routerLink]="pagination.prev.routeLink">
              <div
                class=" bg-ghost dark:bg-cinder dark:hover:bg-tuna hover:bg-metal sm:px-6 lg:px-8 group px-4 pt-8 pb-16">
                <span
                  class=" text-comet dark:text-manatee dark:hover:text-main text-sm font-normal">
                  Previous
                </span>
                <p
                  class=" lg:text-base text-comet dark:text-manatee sm:text-xl dark:group-hover:text-main-100 darkgroup-hover:text-periblue group-hover:text-pearl text-xs font-light">
                  {{ pagination.prev.title }}
                </p>
              </div>
            </a>
          </div>

          <div>
            <a *ngIf="pagination.next" [routerLink]="pagination.next.routeLink">
              <div
                class=" md:mt-0 bg-ghost dark:bg-cinder dark:hover:bg-tuna hover:bg-metal sm:px-6 lg:px-8 group px-4 pt-8 pb-16">
                <span class="text-comet dark:text-manatee text-sm font-normal"> Next </span>
                <p
                  class=" lg:text-base text-comet dark:text-manatee sm:text-xl dark:group-hover:text-periblue darkgroup-hover:text-periblue group-hover:text-pearl space-x-2 text-xs font-light">
                  {{ pagination.next.title }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class DocsPaginationComponent {
  docLayout = inject(DocsLayoutService);
}
