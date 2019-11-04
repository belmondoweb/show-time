import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleTransf'
})
export class TitleTransfPipe implements PipeTransform {

    transform(value: string): string {
        const newVal = value.replace(/[^\w\s]/gi, '').toLocaleLowerCase();
        return this.titleCase(newVal);
      }
      titleCase(str) {
       const splitStr = str.toLowerCase().split(' ');
       for (let i = 0; i < splitStr.length; i++) {
           splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
       }
       return splitStr.join(' ');
    }

}


