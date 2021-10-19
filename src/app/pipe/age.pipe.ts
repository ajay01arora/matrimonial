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

    var dob = new Date(value);

    var myMonth_birth = dob.getUTCMonth() + 1;
    var myDay_birth = dob.getUTCDate();
    var myYear_birth = dob.getUTCFullYear();

    var birthAge = nowYear - myYear_birth - 1; //not ur age yet

    if (nowMonth > myMonth_birth) //means ur birth month is now or passed
      birthAge += 1;
    else if (nowMonth == myMonth_birth)
      if (nowDay >= myDay_birth) //check if the day is now or passed
        birthAge += 1;

    return birthAge;
  }

}
