import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@Users/services/users.service';
import { PasswordService } from '@Common/services/password.service';
import { JwtPayload, LoginDto } from '@Auth/dto';
import {
  accessTokenConstants,
  refreshTokenConstants,
} from '@Auth/constants/jwt.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) return null;

      const { hashedPassword, ...userDetails } = user;

      const isPasswordValid = await this.passwordService.validatePassword(
        password,
        hashedPassword,
      );
      if (!isPasswordValid) return null;

      return userDetails;
    } catch (err) {
      throw err;
    }
  }
}
