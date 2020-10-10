import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray',
})
export class ToArrayPipe implements PipeTransform {
  transform(value: number | string): any[] {
    if(parseInt(value as string, 10) !== NaN) {
      return new Array(value).fill(0);
    }
    return value !== null ? value.toString().split('') : [];
  }
}
