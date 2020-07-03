import {AuthStateApiInterface, AuthStateInterface, ConfirmationTokenInterface, ConfirmationTokenType} from '../models/authState.model';
import {User, UserRole} from '../models/user.model';

export const MOCKED_CONFIRMATION_EMAIL_TOKEN: ConfirmationTokenInterface = {
  token: 'mockedToken',
  type: ConfirmationTokenType.CONFIRMATION,
  userId: '01',
  email: 'aliobaji@techhive.io',
};

export const MOCKED_INVITATION_EMAIL_TOKEN: ConfirmationTokenInterface = {
  token: 'mockedToken',
  type: ConfirmationTokenType.INVITATION,
  userId: '01',
  email: 'aliobaji@techhive.io',
};

export const MOCKED_EXPIRED_TOKEN: ConfirmationTokenInterface = {
  token: 'mockedToken',
  type: ConfirmationTokenType.EXPIRED,
  userId: '01',
  email: 'aliobaji@techhive.io',
};

export const MOCKED_AUTH_API_STATE: AuthStateApiInterface = {
  token: 'mockedToken',
  user: {
    id: '123',
    first_name: 'Ali',
    last_name: 'Obaji',
    email: 'ali@techhive.io',
    phoneNumber: '76811995',
    role: UserRole.Admin,
    password: 'password',
  },
};

export const MOCKED_AUTH_STATE: AuthStateInterface = {
  token: 'mockedToken',
  user: new User({
    id: '123',
    first_name: 'Ali',
    last_name: 'Obaji',
    email: 'ali@techhive.io',
    phoneNumber: '76811995',
    role: UserRole.Admin,
    password: 'password',
  }),
  confirmationToken: null,
  attemptedEmail: null,
};

export const MOCKED_AUTH_STATE_WITH_CONFIRMATION: AuthStateInterface = {
  token: '',
  user: null,
  confirmationToken: MOCKED_CONFIRMATION_EMAIL_TOKEN,
  attemptedEmail: null,
};
