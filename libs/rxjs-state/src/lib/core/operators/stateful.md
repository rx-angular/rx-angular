 Rough description

 ![](stateful.png)

 Detailed description

 ## Example
 
 ```ts
 import { from } from 'rxjs';
 import { map } from 'rxjs/operators';
 import { stateful } from "rxjs-state";

 const source = from([2,2,2,undefined,4]);
 const statefulSource = clicks.pipe(stateful(map(v => v*2)));
 statefulSource.subscribe(x => console.log(x));
 //4,8 
 statefulSource.subscribe(x => console.log(x));
 //8 
 ```

 @param {...OperatorFunction | MonotypeOperatorFunction} properties The operators to apply to the source
 value (an object).
 @return {Observable} A new Observable of distinct, non undefined replayed values from the source values.
 
