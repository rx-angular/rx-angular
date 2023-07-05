import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DocsLayoutService } from '../services/docs-layout.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-docs-sidebar-links',
  template: `
    <div class="dark:border-tuna border-l">
      <div>
        <a
          *ngFor="let item of menu"
          [routerLink]="item.routeLink"
          (click)="itemClicked.emit()"
          routerLinkActive="hover:bg-icy border-main dark:bg-tuna bg-white border-l-2"
          class="
        dark:hover:bg-tuna
        hover:bg-white
        text-main
        dark:text-manatee dark:hover:text-main-100
        hover:text-river
        group
        flex
        items-center
        p-2
        pl-6
        text-base
        font-light
      ">
          {{ item.title }}
        </a>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSidebarLinksComponent {
  open = false;

  @Output() itemClicked = new EventEmitter<void>();

  menu = inject(DocsLayoutService).menu;
}

