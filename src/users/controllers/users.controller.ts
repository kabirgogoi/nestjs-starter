import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from '@Users/entities/user.entity';
import { UsersService } from '@Users/services/users.service';
import { CreateUserDto } from '@Users/dto/create-user.dto';
import { Public } from '@Auth/decorators/public.decorator';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Delete(':userId')
  remove(@Req() request: Request, @Param('id', ParseIntPipe) id: number) {
    return {
      msg: 'User Deleted!',
    };
  }
}
