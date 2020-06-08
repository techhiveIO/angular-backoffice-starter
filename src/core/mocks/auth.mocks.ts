import {AuthStateApiInterface} from '../models/authState.model';
import {UserRole} from '../models/user.model';

export const MOCKED_AUTH_API_STATE: AuthStateApiInterface = {
  token: 'mockedToken',
  user: {
    _id: '123',
    firstName: 'Ali',
    lastName: 'Obaji',
    email: 'ali@techhive.io',
    phoneNumber: '76811995',
    role: UserRole.Admin,
  },
};
