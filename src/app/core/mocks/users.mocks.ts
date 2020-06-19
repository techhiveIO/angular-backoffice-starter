import {User, UserApiInterface, UserRole} from '../models/user.model';

export const MOCKED_API_USER: UserApiInterface = {
  _id: '123',
  firstName: 'Abed',
  lastName: 'Zantout',
  email: 'abed@techhive.io',
  phoneNumber: '76 811 995',
  role: UserRole.Admin
};

export const MOCKED_USER: User = new User(MOCKED_API_USER);
