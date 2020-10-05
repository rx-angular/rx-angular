import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray',
})
export class ToArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    return value !== null ? value.toString().split('') : [];
  }
}
