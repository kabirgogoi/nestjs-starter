import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@Users/entities/user.entity';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    const user: User = req.user;

    if (data) {
      return user[data];
    }

    return user as User;
  },
);
