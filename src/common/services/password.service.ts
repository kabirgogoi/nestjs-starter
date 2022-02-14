import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  async generateHash(password: string): Promise<string> {
    try {
      return await argon2.hash(password);
    } catch (err) {
      throw err;
    }
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await argon2.verify(hashedPassword, password);
    } catch (err) {
      throw err;
    }
  }
}
