import { JwtSignOptions } from '@nestjs/jwt';

export const accessTokenConstants: JwtSignOptions = {
  issuer: process.env.TOKEN_ISSUER,
  secret: process.env.ACCESS_TOKEN_SECRECT,
  expiresIn: '60s',
};

export const refreshTokenConstants: JwtSignOptions = {
  issuer: process.env.TOKEN_ISSUER,
  secret: process.env.REFRESH_TOKEN_SECRECT,
  expiresIn: '6d',
};
