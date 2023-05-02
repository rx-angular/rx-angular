import { renamingRule } from '../../utils/renaming-rule';

const renames: Record<string, string | [string, string]> = {
  ForModule: ['RxFor', '@rx-angular/template/for'],
  IfModule: ['RxIf', '@rx-angular/template/if'],
  LetDirective: ['RxLet', '@rx-angular/template/let'],
  LetModule: ['RxLet', '@rx-angular/template/let'],
  PushPipe: ['RxPush', '@rx-angular/template/push'],
  PushModule: ['RxPush', '@rx-angular/template/push'],
  UnpatchDirective: ['RxUnpatch', '@rx-angular/template/unpatch'],
  UnpatchModule: ['RxUnpatch', '@rx-angular/template/unpatch'],
};

export default renamingRule('@rx-angular/template/*', renames);
