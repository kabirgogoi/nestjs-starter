import {
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from '@Auth/decorators';
import { LocalAuthGuard, CookieAuthenticationGuard } from '@Auth/guards';

@Controller('auth')
export class AuthController {
  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request) {
    const user = req.user;
    return user;
  }

  @Post('logout')
  @UseGuards(CookieAuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    req.logOut();
    req.session.cookie.maxAge = 0;

    return {
      success: true,
      msg: 'Logout success',
    };
  }

  @Get('profile')
  @UseGuards(CookieAuthenticationGuard)
  async profile(@Req() req: Request) {
    return {
      title: 'User profile',
      userId: req.user.id,
      email: req.user.email,
    };
  }
}
