import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-docs-rightbar',
  template: `
    <aside
      class="
    relative
    flex-shrink-0
    hidden
    w-64
    p-10
    overflow-y-auto
    border-l border-smoke
    dark:border-pearl
    xl:flex xl:flex-col
  ">
      <div class="fixed">
        <div>
          <div class="max-w-4xl pb-5">
            <h5
              class="
            max-w-4xl
            text-sm
            font-medium
            leading-6
            uppercase
            text-comet
            dark:text-manatee
          ">
              On this page
            </h5>

            <div class="max-w-4xl mt-6 space-y-3">
              <a
                href="#overview"
                class="
              block
              text-sm
              font-light
              capitalize
              text-santa
              hover:text-oyster
            "
                >Overview.</a
              >
              <a
                href="#howitworks"
                class="
              block
              text-sm
              font-light
              capitalize
              text-santa
              hover:text-oyster
            "
                >How Dockerz works.</a
              >
              <a
                href="#stack"
                class="
              block
              text-sm
              font-light
              capitalize
              text-santa
              hover:text-oyster
            ">
                Teck stack used on Dockerz.</a
              >
            </div>
          </div>
        </div>
      </div>
    </aside>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsRightBarComponent {}
