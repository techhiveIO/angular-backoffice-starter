import {User, UserApiInterface} from './user.model';

export enum ConfirmationTokenType {
  CONFIRMATION = 'CONFIRMATION',
  INVITATION = 'INVITATION',
  EXPIRED = 'EXPIRED',
}

export interface ConfirmationTokenInterface {
  token: string;
  type: ConfirmationTokenType;
  userId: string;
  email: string;
}

export interface AuthStateApiInterface {
  token: string;
  user: UserApiInterface;
}

export interface AuthStateInterface {
  token: string;
  user: User;
  confirmationToken?: ConfirmationTokenInterface;
}
