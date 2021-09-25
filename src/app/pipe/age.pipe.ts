import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): number {
    var now = new Date();

    var nowMonth = now.getUTCMonth() + 1; //months from 1-12
    var nowDay = now.getUTCDate();
    var nowYear = now.getUTCFullYear();

    var dob = value.split('/', 3);

    var myMonth_birth = dob[1];
    var myDay_birth = dob[0];
    var myYear_birth = dob[2];

    var birthAge = nowYear - Number(myYear_birth) - 1; //not ur age yet

    if (nowMonth > Number(myMonth_birth)) //means ur birth month is now or passed
      birthAge += 1;
    else if (nowMonth == Number(myMonth_birth))
      if (nowDay >= Number(myDay_birth)) //check if the day is now or passed
        birthAge += 1;

    return birthAge;
  }

}
