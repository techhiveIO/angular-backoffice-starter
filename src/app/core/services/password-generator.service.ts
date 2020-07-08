import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordGeneratorService {
  private minPasswordLength = 15;
  private maxPasswordLength = 20;
  private passwordLength = 15;

  private lowercase = true;
  private uppercase = true;
  private numbers = true;
  private symbols = true;
  private dictionary: string[];

  private newPassword: string;

  private checkboxes = [
    {
      id: 'lowercase',
      label: 'a-z',
      library: 'abcdefghijklmnopqrstuvwxyz',
    },
    {
      id: 'uppercase',
      label: 'A-Z',
      library: 'ABCDEFGHIJKLMNOPWRSTUVWXYZ',
    },
    {
      id: 'numbers',
      label: '0-9',
      library: '0123456789',
    },
    {
      id: 'symbols',
      label: '!-?',
      library: `!@#$%^&*-_=+\\|:;',.<>/?~`,
    },
  ];

  static randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private randomlyGeneratePasswordLength() {
    this.passwordLength = PasswordGeneratorService.randomIntFromInterval(
      this.minPasswordLength,
      this.maxPasswordLength,
    );
  }

  // Generate password
  generatePassword() {
    if (
      this.lowercase === false &&
      this.uppercase === false &&
      this.numbers === false &&
      this.symbols === false
    ) {
      return (this.newPassword = '...');
    }

    this.randomlyGeneratePasswordLength();

    // Create array from chosen checkboxes
    this.dictionary = [].concat(
      this.lowercase ? this.checkboxes[0].library.split('') : [],
      this.uppercase ? this.checkboxes[1].library.split('') : [],
      this.numbers ? this.checkboxes[2].library.split('') : [],
      this.symbols ? this.checkboxes[3].library.split('') : [],
    );

    // Generate random password from array
    let newPassword = '';
    for (let i = 0; i < this.passwordLength; i++) {
      newPassword += this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    }
    this.newPassword = newPassword;
    return this.newPassword;
  }
}
