import { Role } from '@Users/enums/role.enum';

export class JwtPayload {
  id: number; // user id
  sub: string; // username or email
  role: Role; // user role
}
