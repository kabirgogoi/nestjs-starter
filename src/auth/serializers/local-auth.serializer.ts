import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '@Users/services/users.service';
import { User } from '@Users/entities';

@Injectable()
export class LocalAuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  // This method is called on user log in
  serializeUser(user: User, done: Function) {
    done(null, user.id);
  }

  // This method is called when user try to access a protected route
  async deserializeUser(userId: string, done: Function) {
    const user = await this.usersService.findById(Number(userId));
    done(null, user);
  }
}
