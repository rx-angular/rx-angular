import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-docs-footer',
  template: `
    <div class="border-t border-antiflash bg-ghost dark:border-gun dark:bg-cinder">
      <div class="mx-auto max-w-7xl">
        <div
          class="px-4 py-8  md:mt-0 bg-ghost dark:bg-cinder dark:border-tuna sm:px-6 lg:px-8"
          id="contact">
          <p class="text-xs font-light  lg:text-base text-comet dark:text-santa sm:text-xl">
            Have any issues? 
            Open an issue on <a href="https://github.com/eneajaho/ngx-isr/issues" target="_blank" class="text-main-100">Github issues</a>, 
            or email me at jahollarienea14[@]gmail.com for <b>paid support</b>.
          </p>
          <p class="text-xs font-light  lg:text-base text-comet dark:text-santa sm:text-xl"></p>
        </div>
      </div>
    </div>

    <footer
      class="border-t border-antiflash bg-ghost dark:bg-cinder dark:border-gun"
      aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="justify-center text-center lg:text-left lg:justify-start">
          <div class="space-y-8 text-comet dark:text-santa">
            <div class="text-center">
              <a href="https://github.com/eneajaho/ngx-isr/blob/main/LICENSE" target="_blank">
                MIT License
              </a>
            </div>
            <p class="mt-10 text-center text-sm leading-5 text-gray-500">
              Built with ❤️ & <b class="text-red-600">Angular</b>
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsFooterComponent {}
