import {User, UserApiInterface, UserRole} from '../models/user.model';

export const MOCKED_API_USER: UserApiInterface = {
  id: '123',
  first_name: 'Abed',
  last_name: 'Zantout',
  email: 'abed@techhive.io',
  phoneNumber: '76 811 995',
  role: UserRole.Admin,
  password: 'password',
};

export const MOCKED_USER: User = new User(MOCKED_API_USER);
