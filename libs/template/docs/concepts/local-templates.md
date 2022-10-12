# Local templates
   
Angular provides a way to bind templates to a structural directive to organize the template code in a better way. 
For example this is implemented in the `*ngIf` structural directive under the else template slot. `*ngIf="show; else: tempateName"`.

This can reduce expressions in the template and save us boiler plate.
 

```html
<ng-container>
    {{ n | async }} {{ n | async}} {{ n | async}}    
</ng-container>
```

With directive's we can now provide custom values to the consumer.
 Angular does this in e.g. the `*ngFor` directive with local variables like `even` or `odd`.  

``` 
<ng-container *ngFor="let item in list; let e = even">
    even: {{ e }}    
<ng-container/>
```
