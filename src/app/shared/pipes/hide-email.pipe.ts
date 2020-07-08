import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'HideEmail',
})
export class HideEmailPipe implements PipeTransform {
  transform(value: string) {
    const atLocation = value.lastIndexOf('@');
    const dotLocation = value.lastIndexOf('.');

    if (atLocation > 0 && dotLocation > 0) {
      return value.replace(/([\w.]+)@([\w.]+)(\.[\w.]+)/g,
        (m, p1, p2, p3) => `${this.maskString(p1)}@${this.maskString(p2)}${p3}`
      );
    }

    return value;
  }

  private maskString(str: string): string {
    const length = str.length;

    if (length > 4) {
      return str.substr(0, 1) +
        str.substr(1, length - 2).replace(/\w/g, '*') +
        str.substr(-1, 1);
    }

    return str.replace(/\w/g, '*');
  }
}
