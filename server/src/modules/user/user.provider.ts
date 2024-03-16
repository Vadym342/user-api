import { USER_REPOSITORY } from '@src/constants/providers';

import { User } from './entities/user.entity';

export const usersProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
