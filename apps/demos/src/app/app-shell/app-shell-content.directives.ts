import { Directive } from '@angular/core';

@Directive({
  selector: '[rxaAppShellSidenavContent]',
  standalone: false,
})
export class AppShellSidenavContent {}

@Directive({
  selector: '[rxaAppShellHeaderContent]',
  standalone: false,
})
export class AppShellHeaderContent {}

@Directive({
  selector: '[rxaAppShellSidenavTitle]',
  standalone: false,
})
export class AppShellSidenavTitle {}
