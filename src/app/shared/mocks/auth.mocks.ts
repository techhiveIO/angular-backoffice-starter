import {AuthStateApiInterface, AuthStateInterface, ConfirmationTokenInterface, ConfirmationTokenType} from '../models/authState.model';
import {User, UserRole} from '../models/user.model';
import {ConfirmAccountViewInterface, ConfirmAccountViewType} from '../../features/auth/models/view-types.model';

export const MOCKED_CONFIRM_ACCOUNT_VIEW_VERIFY: ConfirmAccountViewInterface = {
  token: 'mockedToken',
  viewType: ConfirmAccountViewType.TYPE_CONFIRM_REGISTRATION,
};

export const MOCKED_CONFIRM_ACCOUNT_VIEW_EXPIRED: ConfirmAccountViewInterface = {
  token: 'mockedToken',
  viewType: ConfirmAccountViewType.TYPE_TOKEN_EXPIRED,
};

export const MOCKED_CONFIRM_ACCOUNT_VIEW_INVITATION: ConfirmAccountViewInterface = {
  token: 'mockedToken',
  viewType: ConfirmAccountViewType.TYPE_ACCEPT_INVITATION,
};

export const MOCKED_CONFIRMATION_EMAIL_TOKEN: ConfirmationTokenInterface = {
  token: 'mockedToken',
  type: ConfirmationTokenType.CONFIRMATION,
  userId: '01',
  email: 'aliobaji@techhive.io',
};

export const MOCKED_AUTH_API_STATE: AuthStateApiInterface = {
  access_token: 'mockedToken',
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
