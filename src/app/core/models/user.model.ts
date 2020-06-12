export enum UserRole {
  Admin = 'Admin',
  Employee = 'Employee',
}

export interface UserApiInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
}

interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
}

export class User implements UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;

  constructor(user: UserApiInterface) {
    this.id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.role = user.role;
  }
}
