import {
  Controller,
  Post,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
  UnauthorizedException,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '@Auth/services';
import { Public, GetCurrentUser } from '@Auth/decorators';
import { RefreshTokenGuard } from '@Auth/guards';
import { LoginDto } from '@Auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: Request) {
    const user = request.user;

    //TODO Set up a reddis database to maintain blacklisted jwt tokens
    // Invalidate both access & refresh token

    return {
      msg: 'Loged out',
      ...user,
    };
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refreshtoken')
  async createNewJwt(
    @GetCurrentUser('id') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    if (!userId || !refreshToken) throw new UnauthorizedException();

    return await this.authService.updateAccessToken(userId, refreshToken);
  }
}
