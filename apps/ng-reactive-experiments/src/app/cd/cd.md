# Change Detection Strategy Tests

- 01. `ɵdetectChanges`
  - when called in the component renders itself and all child components with cd.Default
- 02. `ChangeDetectorRef#detectChanges`
  - when called in the component renders itself and all child components with cd.Default
- 03. `ɵmarkDirty`
  - when called in the component renders itself and all components with cd.Default
- 04. `ChangeDetectorRef#markForCheck`
  - when called in the component renders itself and all components with cd.Default
- 05.`scheduleDetectChanges`
  - when called in the element renders itself and all components with cd.Default
- 06.`ApprefTick`
  - when called in the component renders itself and all components with cd.Default
