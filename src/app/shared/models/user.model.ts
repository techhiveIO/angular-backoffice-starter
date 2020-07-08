export enum UserRole {
  Admin = 'Admin',
  Employee = 'Employee',
}

export interface UserApiInterface {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
}

interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  password: string;
}

export class User implements UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  password: string;

  constructor(user: UserApiInterface) {
    this.id = user.id;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.role = user.role;
    this.password = user.password;
  }
}
