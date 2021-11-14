import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'height'
})
export class HeightPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    
    if(value == 5.1)
    {
      return "5'10''";
    }
    var height = value.toString().split('.');

    var heightInInch = height[1].replace(/^0+/, '');
    return height[0]+"'"+heightInInch+"''";

  }

}
