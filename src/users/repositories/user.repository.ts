import { Repository, EntityRepository, FindConditions } from 'typeorm';
import { User } from '@Users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserCredentials(where: FindConditions<User>) {
    try {
      const user = await this.findOne({
        where,
        select: [
          'id',
          'email',
          'role',
          'hashedPassword',
          'createdAt',
          'updatedAt',
        ],
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (err) {
      throw err;
    }
  }
}
