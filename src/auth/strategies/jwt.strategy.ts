import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { accessTokenConstants } from '../constants/jwt.constants';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { AuthService } from '../services/auth.service';

interface FullJwtPayload extends JwtPayload {
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessTokenConstants.secret,
    });
  }

  async validate(fullJwtPayload: FullJwtPayload) {
    const { iat, exp, ...payload } = fullJwtPayload;

    // nest will set `req.user = payload` (i.e the following returned object)
    return {
      id: payload.id,
      email: payload.sub,
      role: payload.role,
    };
  }
}
