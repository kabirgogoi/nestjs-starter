import { JwtSignOptions } from '@nestjs/jwt';

export const jwtConstants: JwtSignOptions = {
  secret: process.env.JWT_SECRECT,
  issuer: 'nest-typeorm-starter.com',
  expiresIn: '60s',
};

export const refreshTokenConstants: JwtSignOptions = {
  ...jwtConstants,
  expiresIn: '6d',
};
