---
sidebar_label: 'Local templates'
sidebar_position: 1
title: 'Local templates'
hide_title: true
---

# Local templates

Angular provides a way to bind templates to a structural directive to organize the template code in a better way.
For example this is implemented in the `*ngIf` structural directive under the else template slot. `*ngIf="show; else: templateName"`.

This can reduce expressions in the template and save us boiler plate.

```html
<div *ngIf="isTrue; else:elseTpl">Visible if true</div>
<ng-template #elseTpl>Visible if false</ng-template>
```

With directive's we can now provide custom template slots for any behavior.
