import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bgColor'
})
export class BgColorPipe implements PipeTransform {

  transform(value: number): string {
    return '#' + Math.floor(value * 16777215).toString(16);
  }

}
