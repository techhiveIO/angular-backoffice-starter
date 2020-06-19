import {AuthStateApiInterface, AuthStateInterface} from '../models/authState.model';
import {User, UserRole} from '../models/user.model';

export const MOCKED_AUTH_API_STATE: AuthStateApiInterface = {
  token: 'mockedToken',
  user: {
    id: '123',
    firstName: 'Ali',
    lastName: 'Obaji',
    email: 'ali@techhive.io',
    phoneNumber: '76811995',
    role: UserRole.Admin,
  },
};

export const MOCKED_AUTH_STATE: AuthStateInterface = {
  token: 'mockedToken',
  user: new User({
    id: '123',
    firstName: 'Ali',
    lastName: 'Obaji',
    email: 'ali@techhive.io',
    phoneNumber: '76811995',
    role: UserRole.Admin,
  }),
};
