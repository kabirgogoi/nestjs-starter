import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@Users/entities/user.entity';
import { UsersService } from '@Users/services/users.service';
import { PasswordService } from '@Common/services/password.service';
import { JwtPayload, LoginDto } from '@Auth/dto';
import {
  jwtConstants,
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
  private async validateUser(email: string, password: string) {
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

  // Send user info with JWT token
  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);

      if (!user)
        throw new UnauthorizedException('Invalid username or password');

      const payload: JwtPayload = {
        id: user.id,
        sub: user.email,
        role: user.role,
      };

      return {
        ...user,
        is_authenticated: true,
        access_token: this.jwtService.sign(payload, jwtConstants),
        refresh_token: this.jwtService.sign(payload, refreshTokenConstants),
      };
    } catch (err) {
      throw err;
    }
  }

  // Generate a new JWT access token
  async updateAccessToken(userId: number, refreshToken: string) {
    // TODO differenciate between access token and JWT token
    try {
      const user = await this.usersService.findById(userId);

      if (!user) throw new UnauthorizedException();

      const payload: JwtPayload = {
        id: user.id,
        sub: user.email,
        role: user.role,
      };

      return {
        access_token: this.jwtService.sign(payload, jwtConstants),
        refresh_token: refreshToken,
      };
    } catch (err) {
      throw err;
    }
  }
}
