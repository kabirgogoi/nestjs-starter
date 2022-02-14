import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User } from '@Users/entities/user.entity';
import { UserRepository } from '@Users/repositories/user.repository';
import { PasswordService } from '@Common/services/password.service';
import { CreateUserDto } from '@Users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, ...userDetails } = createUserDto;
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: ['id'],
      });

      if (user) {
        throw new ConflictException('User already exist');
      }

      const hashedPassword = await this.passwordService.generateHash(password);

      const newUser = this.userRepository.create({
        email,
        hashedPassword,
        ...userDetails,
      });

      await this.userRepository.save(newUser);
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (err) {
      throw err;
    }
  }

  async findById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (err) {
      throw err;
    }
  }

  async findCredentialsByEmail(email: string) {
    try {
      const user = await this.userRepository.findUserCredentials({ email });
      if (!user) throw new NotFoundException();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({ id });

      if (!user) throw new NotFoundException('User not found');

      await this.userRepository.remove(user);

      return {
        id,
        msg: 'User deleted',
      };
    } catch (err) {
      throw err;
    }
  }
}
