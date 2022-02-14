import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constants/jwt.constants';
import { JwtPayload } from '../dto/jwt-payload.dto';

interface FullJwtPayload extends JwtPayload {
  iat: number;
  exp: number;
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, fullJwtPayload: FullJwtPayload) {
    const { iat, exp, ...payload } = fullJwtPayload;
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();

    return {
      ...payload,
      refreshToken,
    };
  }
}
