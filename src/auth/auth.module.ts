import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { accessTokenConstants } from './constants/jwt.constants';

import { UsersModule } from '@Users/users.module';
import { PasswordService } from '@Common/services/password.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { LocalAuthSerializer } from './serializers/local-auth.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: accessTokenConstants.secret,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    JwtStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    LocalAuthSerializer,
  ],
  exports: [AuthService],
})
export class AuthModule {}
