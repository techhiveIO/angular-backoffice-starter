import {User, UserApiInterface} from './user.model';

export interface AuthStateApiInterface {
  token: string;
  user: UserApiInterface;
}

export interface AuthStateInterface {
  token: string;
  user: User;
}
