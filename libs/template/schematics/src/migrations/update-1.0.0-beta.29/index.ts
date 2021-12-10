import { renamingRule } from '../../utils/renaming-rule';

const renames: Record<string, string | [string, string]> = {
  LetModule: '@rx-angular/template/let',
  LetDirective: '@rx-angular/template/let',
  PushModule: '@rx-angular/template/push',
  PushPipe: '@rx-angular/template/push',
  UnpatchDirective: '@rx-angular/template/unpatch',
  UnpatchEventsModule: ['UnpatchModule', '@rx-angular/template/unpatch'],
};

export default renamingRule('@rx-angular/template', renames);
