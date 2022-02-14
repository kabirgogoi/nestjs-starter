import { User as UserEntity } from '@Users/entities/user.entity';

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
